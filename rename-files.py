#!/usr/bin/env python3
"""
Rename all images and videos to sequential numbers
Images: 1.jpg, 2.jpg, 3.png, 4.heic, etc.
Videos: 1.MP4, 2.MP4, etc.
Supports HEIC/HEIF format (iPhone images)
"""

import os
import shutil
from pathlib import Path

def rename_files(folder, extensions):
    """Rename files in folder sequentially"""
    folder_path = Path(folder)

    if not folder_path.exists():
        print(f"❌ Folder not found: {folder}")
        return

    # Get all files with specified extensions (deduplicate by using a set)
    files = set()
    for ext in extensions:
        files.update(folder_path.glob(f"*.{ext}"))
        if ext.upper() != ext:
            files.update(folder_path.glob(f"*.{ext.upper()}"))

    # Convert to list and sort by creation time (oldest first)
    files = sorted(list(files), key=lambda x: x.stat().st_mtime)

    if not files:
        print(f"⚠️  No files found in {folder}")
        return

    print(f"\n📁 Processing {folder}/")
    print(f"   Found {len(files)} files")

    # Create temporary folder for backup
    temp_folder = folder_path / ".backup"
    temp_folder.mkdir(exist_ok=True)

    # First, move all files to temp folder
    for f in files:
        shutil.move(str(f), str(temp_folder / f.name))

    # Now rename from temp folder back to original
    renamed_files = []
    for i, old_file in enumerate(files, 1):
        old_path = temp_folder / old_file.name
        extension = old_file.suffix  # Keeps original case (.jpg, .JPG, .MP4, etc.)
        new_name = f"{i}{extension}"
        new_path = folder_path / new_name

        shutil.move(str(old_path), str(new_path))
        renamed_files.append(new_name)
        print(f"   ✓ {old_file.name} → {new_name}")

    # Remove backup folder
    temp_folder.rmdir()

    print(f"✅ Renamed {len(renamed_files)} files in {folder}/\n")
    return renamed_files

if __name__ == "__main__":
    print("🎨 Renaming Images and Videos")
    print("=" * 50)

    # Rename images (including HEIC/HEIF from iPhone)
    # Note: Script automatically handles uppercase versions
    image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'heif']
    images = rename_files('images', image_extensions)

    # Rename videos
    video_extensions = ['mp4', 'mov', 'avi', 'MP4', 'MOV']
    videos = rename_files('videos', video_extensions)

    print("\n" + "=" * 50)
    print("✨ All files renamed successfully!")
    print(f"📸 Images: {len(images) if images else 0} files")
    print(f"🎬 Videos: {len(videos) if videos else 0} files")
