#!/usr/bin/env python3
"""
Image Optimization Script
Converts JPG images to WebP format with multiple sizes (480, 960, 1440)
for responsive loading
"""

import os
from PIL import Image
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import sys

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
        img = Image.open(image_path)

        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background

        # Get original dimensions
        original_width, original_height = img.size
        aspect_ratio = original_height / original_width

        # Generate multiple sizes
        for size in SIZES:
            # Skip if original is smaller than target size
            if original_width < size:
                continue

            # Calculate new dimensions
            new_width = size
            new_height = int(size * aspect_ratio)

            # Resize image
            resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

            # Save as WebP
            output_path = os.path.join(output_dir, f"{img_name}_{size}w.webp")
            resized.save(output_path, 'WEBP', quality=QUALITY, method=6)

        # Also save original size as WebP
        output_path = os.path.join(output_dir, f"{img_name}_original.webp")
        img.save(output_path, 'WEBP', quality=QUALITY, method=6)

        print(f"✓ Optimized: {img_name}")
        return True

    except Exception as e:
        print(f"✗ Error processing {image_path}: {e}")
        return False

def main():
    """Main function to process all images"""
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Get all JPG images
    image_files = []
    for ext in ['*.jpg', '*.JPG', '*.jpeg', '*.JPEG', '*.png', '*.PNG']:
        image_files.extend(Path(IMAGES_DIR).glob(ext))

    total = len(image_files)
    print(f"Found {total} images to optimize...")
    print(f"Generating sizes: {', '.join(map(str, SIZES))} pixels wide")
    print(f"WebP quality: {QUALITY}")
    print(f"Parallel workers: {MAX_WORKERS}\n")

    # Process images in parallel
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        results = list(executor.map(
            lambda img: optimize_image(img, OUTPUT_DIR),
            image_files
        ))

    # Summary
    successful = sum(results)
    print(f"\n{'='*50}")
    print(f"Optimization complete!")
    print(f"Successful: {successful}/{total}")
    print(f"Output directory: {OUTPUT_DIR}/")
    print(f"{'='*50}")

    # Calculate space savings
    original_size = sum(f.stat().st_size for f in image_files)
    optimized_size = sum(
        f.stat().st_size
        for f in Path(OUTPUT_DIR).glob('*.webp')
    )

    savings = ((original_size - optimized_size) / original_size) * 100
    print(f"\nOriginal size: {original_size / (1024*1024):.2f} MB")
    print(f"Optimized size: {optimized_size / (1024*1024):.2f} MB")
    print(f"Space saved: {savings:.1f}%")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
        sys.exit(1)
