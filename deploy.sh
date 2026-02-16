#!/bin/bash

# Deployment script for Tet Surprise website
# Run this script to deploy to GitHub Pages

echo "🎊 Deploying Tet Surprise Website to GitHub Pages..."
echo ""

# Remove lock file if it exists
rm -f .git/index.lock 2>/dev/null

# Configure Git
git config user.name "Daniel Vo"
git config user.email "dongan2212@gmail.com"

# Stage all changes
echo "📦 Staging changes..."
git add .

# Create commit
echo "💾 Creating commit..."
git commit -m "✨ Update with LyThao2026.mov and all 56 images

Updates:
- Replaced slideshow with LyThao2026.mov video
- Added complete gallery with all 56 images
- Trilingual support (Vietnamese/English/Korean)
- Autoplay music after password unlock
- Countdown-locked surprise section
- 14 personal videos in video gallery
- Mobile responsive design

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your website will be live at: https://dongan2212.github.io/tet-surprise/"
echo "🔐 Password: lythao2026"
echo ""
echo "⏰ Wait 1-2 minutes for GitHub Pages to update"
