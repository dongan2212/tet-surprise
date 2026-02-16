#!/usr/bin/env python3
"""
Image Optimization Script
Converts JPG/PNG/HEIC images to WebP format with multiple sizes (480, 960, 1440)
for responsive loading. Supports iPhone HEIC format.
"""

import os
from PIL import Image
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import sys

# Try to import HEIC support
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIC_SUPPORTED = True
except ImportError:
    HEIC_SUPPORTED = False

# Configuration
IMAGES_DIR = "images"
OUTPUT_DIR = "images-optimized"
SIZES = [480, 960, 1440]  # Width in pixels
QUALITY = 85  # WebP quality (0-100)
MAX_WORKERS = 4  # Parallel processing threads

def optimize_image(image_path, output_dir):
    """Convert and resize a single image to WebP with multiple sizes"""
    try:
        img_name = Path(image_path).stem
        ext = Path(image_path).suffix.lower()

        # Check if HEIC and not supported
        if ext in ['.heic', '.heif'] and not HEIC_SUPPORTED:
            print(f"⊙ Skipped: {img_name}{ext} (install pillow-heif to process)")
            return False

        # Open image
        try:
            img = Image.open(image_path)
        except Exception as e:
            print(f"✗ Error opening {img_name}{ext}: {e}")
            return False

        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Get original dimensions
        original_width, original_height = img.size
        aspect_ratio = original_height / original_width

        # Generate multiple sizes
        sizes_created = 0
        upscaled_sizes = []
        for size in SIZES:
            # Calculate new dimensions
            new_width = size
            new_height = int(size * aspect_ratio)

            # Check if we need to upscale
            will_upscale = original_width < size

            # Resize image (will upscale if original is smaller than target size)
            # This ensures all images have consistent sizes for responsive loading
            resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

            # Save as WebP
            output_path = os.path.join(output_dir, f"{img_name}_{size}w.webp")
            resized.save(output_path, 'WEBP', quality=QUALITY, method=6)
            sizes_created += 1
            
            if will_upscale:
                upscaled_sizes.append(size)

        # Also save original size as WebP
        output_path = os.path.join(output_dir, f"{img_name}_original.webp")
        img.save(output_path, 'WEBP', quality=QUALITY, method=6)

        # Show appropriate message
        upscale_note = f" (upscaled: {', '.join(map(str, upscaled_sizes))}w)" if upscaled_sizes else ""
        if ext in ['.heic', '.heif']:
            print(f"✓ Converted: {img_name}{ext} → WebP ({sizes_created + 1} sizes{upscale_note})")
        else:
            print(f"✓ Optimized: {img_name}{ext} ({sizes_created + 1} sizes{upscale_note})")

        return True

    except Exception as e:
        print(f"✗ Error processing {image_path}: {e}")
        return False

def main():
    """Main function to process all images"""
    print("=" * 70)
    print("IMAGE OPTIMIZATION SCRIPT - WITH HEIC SUPPORT")
    print("=" * 70)
    print()

    # Check HEIC support status
    if HEIC_SUPPORTED:
        print("✓ HEIC support enabled (iPhone images supported)")
    else:
        print("⚠ HEIC support not available")
        print("  To process iPhone HEIC images, install:")
        print("  pip install pillow-heif --break-system-packages")
    print()

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Get all image files
    image_files = []
    extensions = ['*.jpg', '*.JPG', '*.jpeg', '*.JPEG', '*.png', '*.PNG']

    # Add HEIC extensions regardless (will skip with warning if not supported)
    extensions.extend(['*.heic', '*.HEIC', '*.heif', '*.HEIF'])

    # Find all images
    for ext in extensions:
        image_files.extend(Path(IMAGES_DIR).glob(ext))

    total = len(image_files)

    if total == 0:
        print(f"No images found in {IMAGES_DIR}/")
        sys.exit(0)

    print(f"Found {total} images to process")

    # Count HEIC files
    heic_count = sum(1 for f in image_files if f.suffix.lower() in ['.heic', '.heif'])
    if heic_count > 0:
        if HEIC_SUPPORTED:
            print(f"  - {heic_count} HEIC files (iPhone images) - will convert")
        else:
            print(f"  - {heic_count} HEIC files - will skip (install pillow-heif)")

    print(f"\nGenerating sizes: {', '.join(map(str, SIZES))} pixels wide")
    print(f"WebP quality: {QUALITY}")
    print(f"Parallel workers: {MAX_WORKERS}\n")
    print("=" * 70)

    # Process images in parallel
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        results = list(executor.map(
            lambda img: optimize_image(img, OUTPUT_DIR),
            image_files
        ))

    # Summary
    successful = sum(results)
    skipped = total - successful

    print("\n" + "=" * 70)
    print("OPTIMIZATION COMPLETE!")
    print(f"Successful: {successful}/{total}")
    if skipped > 0:
        print(f"Skipped: {skipped} (likely HEIC files without pillow-heif)")
    print(f"Output directory: {OUTPUT_DIR}/")
    print("=" * 70)

    # Calculate space savings
    try:
        original_size = sum(f.stat().st_size for f in image_files if f.suffix.lower() not in ['.heic', '.heif'] or HEIC_SUPPORTED)
        optimized_size = sum(
            f.stat().st_size
            for f in Path(OUTPUT_DIR).glob('*.webp')
        )

        if original_size > 0:
            savings = ((original_size - optimized_size) / original_size) * 100

            print(f"\n📊 Space Analysis:")
            print(f"  Original: {original_size / (1024*1024):.2f} MB")
            print(f"  Optimized: {optimized_size / (1024*1024):.2f} MB")
            print(f"  Saved: {savings:.1f}% ({(original_size - optimized_size) / (1024*1024):.1f} MB)")
    except Exception as e:
        print(f"\nNote: Could not calculate exact space savings")

    # Next steps
    print("\n💡 Next Steps:")
    print("  1. Check images in images-optimized/ folder")
    print("  2. If quality is good, update script.js:")
    print("     Set: useWebP: true")
    print("  3. Refresh your website")

    if not HEIC_SUPPORTED and heic_count > 0:
        print("\n📱 To process HEIC files:")
        print("  pip install pillow-heif --break-system-packages")
        print("  Then run this script again")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
        sys.exit(1)
