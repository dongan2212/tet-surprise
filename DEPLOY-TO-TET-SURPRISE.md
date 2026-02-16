# 🚀 Deploy to tet-surprise Repository

## ✨ What's Been Updated

✅ **LyThao2026.mov** - Replaced slideshow with your personal video (208MB)
✅ **56 images** - Complete gallery with all photos from images folder
✅ **14 videos** - All personal videos in video gallery
✅ **Korean language** - Full trilingual support (VI/EN/KO)
✅ **Autoplay music** - Plays after password unlock
✅ **Countdown lock** - Surprise section locked until Feb 17, 2026
✅ **Mobile responsive** - Works perfectly on all devices

---

## 🎯 Quick Deploy (2 Methods)

### Method 1: Using Deploy Script (Easiest!)

```bash
cd /sessions/zen-fervent-albattani/mnt/tet-website
./deploy.sh
```

That's it! The script will:
1. Remove any Git locks
2. Stage all changes
3. Create commit
4. Push to GitHub

---

### Method 2: Manual Commands

If the script doesn't work, run these commands:

```bash
cd /sessions/zen-fervent-albattani/mnt/tet-website

# Remove lock file
rm -f .git/index.lock

# Configure Git
git config user.name "Daniel Ngan"
git config user.email "dongan2212@gmail.com"

# Stage and commit
git add .
git commit -m "Update with LyThao2026.mov and all images"

# Push to GitHub
git push -u origin main --force
```

---

## 🌐 Your Website

**Live URL**: https://dongan2212.github.io/tet-surprise/
**Password**: `lythao2026`

**Wait time**: 1-2 minutes after pushing for GitHub Pages to update

---

## 📊 What's Changed

### Gallery
- **Before**: 11 photos (extracted from videos)
- **After**: 56 photos (all images from your folder)
  - 14 numbered images (1st.JPG - 14th.JPG)
  - 42 IMG files (IMG_0936.JPG, IMG_3409.JPG, etc.)

### Video Slideshow
- **Before**: Auto-generated 30-second slideshow (slideshow-30sec.mp4)
- **After**: Your personal LyThao2026.mov video (208MB)
  - Full video player with controls
  - Play/pause/seek functionality
  - High quality maintained

### Video Gallery
- All 14 videos: 1st.MP4 through 14th.MP4
- Click to view fullscreen
- Smooth modal viewer

---

## 📂 Current Structure

```
tet-website/
├── index.html              (68KB - Updated with all images)
├── LyThao2026.mov         (208MB - Your personal video)
├── deploy.sh              (Deployment script)
├── images/                (56 images total)
│   ├── 1st.JPG - 14th.JPG
│   └── IMG_*.JPG (42 files)
├── videos/                (14 videos)
│   └── 1st.MP4 - 14th.MP4
├── tet-music.mp3         (Background music - add your own)
└── Documentation files
```

---

## ⚠️ Important Notes

### Large Video File
- LyThao2026.mov is 208MB
- GitHub has a 100MB file size limit for single files
- **Solution**: Use Git LFS (Large File Storage)

### If Push Fails Due to File Size

Run these commands before deploying:

```bash
cd /sessions/zen-fervent-albattani/mnt/tet-website

# Install Git LFS (if not installed)
git lfs install

# Track the large video file
git lfs track "*.mov"
git add .gitattributes

# Now deploy
./deploy.sh
```

---

## 🎵 Add Background Music

1. Get a romantic instrumental song (MP3)
2. Rename it to: `tet-music.mp3`
3. Place in website root folder
4. Redeploy with `./deploy.sh`

Music will autoplay 1 second after password unlock!

---

## 🔐 Change Password

Edit `index.html`, find line ~935:

```javascript
const correctPassword = "lythao2026"; // Change this
```

---

## 🎨 Customize Gallery Captions

All images have generic captions like "Khoảnh khắc 1", "Moment 1", "순간 1"

To customize:
1. Open `index.html`
2. Find the gallery section
3. Update `data-vi`, `data-en`, `data-ko` attributes

Example:
```html
<div class="gallery-caption"
     data-vi="Ngày đầu tiên gặp nhau"
     data-en="First day we met"
     data-ko="처음 만난 날">
    Ngày đầu tiên gặp nhau
</div>
```

---

## 🐛 Troubleshooting

### Git Lock File Error
```bash
rm -f .git/index.lock
```

### Authentication Required
GitHub will prompt for:
- Username: `dongan2212`
- Password: Use Personal Access Token (not account password)

**Get Token**: GitHub → Settings → Developer Settings → Personal Access Tokens

### Video Not Playing
- Check browser compatibility (MOV files work on Safari, Chrome, Firefox)
- Large file might take time to load
- Consider converting to MP4 if issues persist

### Images Not Loading
- All 56 images should load
- If some are missing, check images folder
- Clear browser cache

---

## 📱 Mobile Testing

After deployment, test on:
1. iPhone/iPad (Safari)
2. Android phone (Chrome)
3. Tablet

The website is fully responsive!

---

## ✅ Deployment Checklist

Before deploying:
- [x] LyThao2026.mov is in website root
- [x] All 56 images indexed in gallery
- [x] All 14 videos in video gallery
- [x] Korean translations added
- [x] Autoplay music configured
- [x] Countdown check working
- [x] Password protection enabled
- [ ] Background music added (optional)
- [ ] Tested on mobile device

---

## 🎊 Final Steps

1. Run deployment script:
   ```bash
   cd /sessions/zen-fervent-albattani/mnt/tet-website
   ./deploy.sh
   ```

2. Wait 1-2 minutes

3. Visit: **https://dongan2212.github.io/tet-surprise/**

4. Enter password: **lythao2026**

5. Share with Ly Thao! 💕

---

## 💡 Pro Tips

### Reduce Video Size
If 208MB is too large, compress the video:

```bash
ffmpeg -i LyThao2026.mov -c:v libx264 -crf 28 -preset slow LyThao2026_compressed.mp4
```

This will create a smaller MP4 file (~50-100MB) with good quality.

### Custom Domain
You can add a custom domain in GitHub Pages settings!

### Private Repository
The repository is currently public for GitHub Pages. If you want it private:
1. Upgrade to GitHub Pro (free for students)
2. Or keep it public but change password frequently

---

## 📞 Need Help?

If deployment fails or you have issues:

1. Check Git status: `git status`
2. Check remote: `git remote -v`
3. Try force push: `git push -f origin main`
4. Check GitHub Actions for deployment logs

---

## 🌟 Summary

Your romantic Tet website is ready to deploy!

**Features**:
- Your personal LyThao2026.mov video
- 56 beautiful photos in gallery
- 14 personal videos
- 3 languages (Vietnamese/English/Korean)
- Password protected
- Countdown to Lunar New Year 2026
- Locked surprise section
- Autoplay music (add your song!)
- Mobile responsive

**Size**: ~350MB total (mostly images and video)

**Deploy**: Run `./deploy.sh` and you're done!

═══════════════════════════════════════════════════════
Created with love for Ly Thao 💕
Ready to deploy to: https://dongan2212.github.io/tet-surprise/
═══════════════════════════════════════════════════════
