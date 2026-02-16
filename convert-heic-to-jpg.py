#!/usr/bin/env python3
"""
HEIC to JPG Converter
Converts iPhone HEIC images to JPG format
Use this if you can't install pillow-heif or prefer JPG files
"""

import os
from pathlib import Path
import sys

# Try to import HEIC support
try:
    from PIL import Image
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIF_AVAILABLE = True
except ImportError:
    HEIF_AVAILABLE = False

IMAGES_DIR = "images"
QUALITY = 95  # JPG quality (0-100)

def convert_heic_to_jpg(heic_path):
    """Convert a single HEIC file to JPG"""
    try:
        img_name = Path(heic_path).stem
        jpg_path = Path(heic_path).parent / f"{img_name}.JPG"

        # Skip if JPG already exists
        if jpg_path.exists():
            print(f"⊙ Skipped: {img_name}.HEIC (JPG already exists)")
            return False

        # Open and convert
        img = Image.open(heic_path)

        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Save as JPG
        img.save(jpg_path, 'JPEG', quality=QUALITY, optimize=True)

        # Get file sizes
        heic_size = Path(heic_path).stat().st_size
        jpg_size = jpg_path.stat().st_size

        size_change = ((jpg_size - heic_size) / heic_size) * 100

        print(f"✓ Converted: {img_name}.HEIC → {img_name}.JPG ({size_change:+.1f}% size)")

        return True

    except Exception as e:
        print(f"✗ Error converting {heic_path}: {e}")
        return False

def main():
    """Main function"""
    print("=" * 60)
    print("HEIC TO JPG CONVERTER")
    print("=" * 60)
    print()

    # Check if HEIF library is available
    if not HEIF_AVAILABLE:
        print("❌ ERROR: pillow-heif is not installed!")
        print("\nTo convert HEIC files, you need to install pillow-heif:")
        print("\n  pip install pillow-heif --break-system-packages")
        print("\nThen run this script again.")
        sys.exit(1)

    print("✓ HEIC support available\n")

    # Find all HEIC files
    heic_files = []
    for ext in ['*.heic', '*.HEIC', '*.heif', '*.HEIF']:
        heic_files.extend(Path(IMAGES_DIR).glob(ext))

    total = len(heic_files)

    if total == 0:
        print(f"No HEIC files found in {IMAGES_DIR}/")
        sys.exit(0)

    print(f"Found {total} HEIC files to convert")
    print(f"JPG quality: {QUALITY}")
    print(f"Output: Same folder with .JPG extension\n")
    print("=" * 60)

    # Convert each file
    successful = 0
    for heic_file in heic_files:
        if convert_heic_to_jpg(heic_file):
            successful += 1

    # Summary
    print("\n" + "=" * 60)
    print("CONVERSION COMPLETE!")
    print(f"Converted: {successful}/{total}")
    print("=" * 60)

    if successful > 0:
        print("\n💡 What's next?")
        print("  1. Check the converted JPG files")
        print("  2. If they look good, you can delete the HEIC files:")
        print("     rm images/*.heic images/*.HEIC")
        print("  3. Run the optimization script:")
        print("     python3 optimize-images.py")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
        sys.exit(1)
