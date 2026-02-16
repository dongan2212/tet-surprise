#!/usr/bin/env python3
"""
Video Optimization Script
Compresses and optimizes video files for web delivery
Reduces file size by 60-80% while maintaining quality
"""

import os
import subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import sys
import json

# Configuration
VIDEOS_DIR = "videos"
OUTPUT_DIR = "videos-optimized"
MAX_WORKERS = 2  # Parallel processing (2 videos at once to avoid overload)

# Video optimization settings
VIDEO_SETTINGS = {
    'codec': 'libx264',           # H.264 codec (best compatibility)
    'preset': 'medium',            # Encoding speed (faster = bigger file, slower = smaller)
    'crf': 28,                     # Quality (18=high, 23=default, 28=good for web, 32=lower)
    'audio_codec': 'aac',          # Audio codec
    'audio_bitrate': '96k',        # Audio bitrate (lower = smaller)
    'max_width': 1280,             # Max width (720p/1080p videos scaled down)
    'fps': 30,                     # Frame rate cap
}

def check_ffmpeg():
    """Check if FFmpeg is installed"""
    try:
        result = subprocess.run(['ffmpeg', '-version'],
                              capture_output=True,
                              text=True,
                              check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def get_video_info(video_path):
    """Get video information using ffprobe"""
    try:
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            str(video_path)
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        info = json.loads(result.stdout)

        # Get video stream
        video_stream = next((s for s in info['streams'] if s['codec_type'] == 'video'), None)

        if video_stream:
            return {
                'width': int(video_stream.get('width', 0)),
                'height': int(video_stream.get('height', 0)),
                'duration': float(info['format'].get('duration', 0)),
                'size': int(info['format'].get('size', 0)),
                'bitrate': int(info['format'].get('bit_rate', 0))
            }
    except Exception as e:
        print(f"  Warning: Could not get info for {video_path}: {e}")

    return None

def optimize_video(video_path, output_dir):
    """Optimize a single video file"""
    try:
        video_name = Path(video_path).stem
        input_ext = Path(video_path).suffix.lower()
        output_path = os.path.join(output_dir, f"{video_name}.mp4")

        # Skip if already optimized
        if os.path.exists(output_path):
            print(f"⊙ Skipped: {video_name} (already exists)")
            return True

        print(f"⏳ Processing: {video_name}...")

        # Get input video info
        info = get_video_info(video_path)
        original_size = info['size'] if info else 0

        # Build FFmpeg command
        cmd = [
            'ffmpeg',
            '-i', str(video_path),
            '-c:v', VIDEO_SETTINGS['codec'],
            '-preset', VIDEO_SETTINGS['preset'],
            '-crf', str(VIDEO_SETTINGS['crf']),
            '-c:a', VIDEO_SETTINGS['audio_codec'],
            '-b:a', VIDEO_SETTINGS['audio_bitrate'],
            '-movflags', '+faststart',  # Enable fast start for web
            '-r', str(VIDEO_SETTINGS['fps']),  # Frame rate
        ]

        # Add scaling if video is too large
        if info and info['width'] > VIDEO_SETTINGS['max_width']:
            scale_filter = f"scale={VIDEO_SETTINGS['max_width']}:-2"
            cmd.extend(['-vf', scale_filter])

        # Remove audio if video has no audio (saves space)
        cmd.extend(['-y', output_path])  # -y to overwrite

        # Run FFmpeg
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout per video
        )

        if result.returncode == 0:
            # Get output size
            output_size = os.path.getsize(output_path)

            if original_size > 0:
                reduction = ((original_size - output_size) / original_size) * 100
                print(f"✓ Optimized: {video_name} ({reduction:.1f}% smaller)")
            else:
                print(f"✓ Optimized: {video_name}")

            return True
        else:
            print(f"✗ Error: {video_name}")
            if result.stderr:
                print(f"  {result.stderr[:200]}")
            return False

    except subprocess.TimeoutExpired:
        print(f"✗ Timeout: {video_name} (took too long)")
        return False
    except Exception as e:
        print(f"✗ Error processing {video_path}: {e}")
        return False

def main():
    """Main function to process all videos"""
    print("=" * 60)
    print("VIDEO OPTIMIZATION SCRIPT")
    print("=" * 60)

    # Check FFmpeg
    if not check_ffmpeg():
        print("\n❌ ERROR: FFmpeg is not installed!")
        print("\nInstall FFmpeg:")
        print("  macOS:   brew install ffmpeg")
        print("  Ubuntu:  sudo apt install ffmpeg")
        print("  Windows: Download from https://ffmpeg.org/download.html")
        sys.exit(1)

    print("✓ FFmpeg is installed\n")

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Get all video files
    video_extensions = ['.mp4', '.MP4', '.mov', '.MOV', '.avi', '.AVI', '.mkv', '.MKV']
    video_files = []

    for ext in video_extensions:
        video_files.extend(Path(VIDEOS_DIR).glob(f'*{ext}'))

    total = len(video_files)

    if total == 0:
        print(f"No videos found in {VIDEOS_DIR}/")
        sys.exit(0)

    print(f"Found {total} videos to optimize\n")
    print("Settings:")
    print(f"  Codec: {VIDEO_SETTINGS['codec']}")
    print(f"  Quality (CRF): {VIDEO_SETTINGS['crf']} (lower = better)")
    print(f"  Max Width: {VIDEO_SETTINGS['max_width']}px")
    print(f"  Frame Rate: {VIDEO_SETTINGS['fps']} fps")
    print(f"  Audio Bitrate: {VIDEO_SETTINGS['audio_bitrate']}")
    print(f"  Workers: {MAX_WORKERS}\n")
    print("=" * 60)

    # Process videos in parallel (but limited to avoid overload)
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        results = list(executor.map(
            lambda video: optimize_video(video, OUTPUT_DIR),
            video_files
        ))

    # Summary
    successful = sum(results)
    print("\n" + "=" * 60)
    print("OPTIMIZATION COMPLETE!")
    print(f"Successful: {successful}/{total}")
    print(f"Output directory: {OUTPUT_DIR}/")
    print("=" * 60)

    # Calculate total space savings
    try:
        original_size = sum(f.stat().st_size for f in video_files)
        optimized_files = list(Path(OUTPUT_DIR).glob('*.mp4'))
        optimized_size = sum(f.stat().st_size for f in optimized_files)

        if original_size > 0:
            savings = ((original_size - optimized_size) / original_size) * 100

            print(f"\n📊 Space Analysis:")
            print(f"  Original: {original_size / (1024*1024):.1f} MB")
            print(f"  Optimized: {optimized_size / (1024*1024):.1f} MB")
            print(f"  Saved: {savings:.1f}% ({(original_size - optimized_size) / (1024*1024):.1f} MB)")
    except Exception as e:
        print(f"\nCould not calculate space savings: {e}")

    print("\n💡 Next Steps:")
    print("  1. Test the optimized videos in your browser")
    print("  2. If quality is good, update script.js:")
    print("     Set: useOptimizedVideos: true")
    print("  3. Refresh your website")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
        sys.exit(1)
