# 🚀 Quick Start Guide - 5 Minutes to Personalize

## ⚡ Essential Changes (Do These First!)

### 1. Change Password (30 seconds)
Open `index.html` and search for:
```javascript
const correctPassword = "lythao2026";
```
Change to your own password!

---

### 2. Add Your Photos (2 minutes)

**Easy Method - Use Online Images:**
1. Upload 5-6 photos to [Imgur.com](https://imgur.com)
2. Copy each image's direct link
3. In `index.html`, find these lines and replace the URLs:

```html
<!-- PHOTO 1 -->
<img src="PASTE_YOUR_IMAGE_LINK_HERE" alt="Memory 1">

<!-- PHOTO 2 -->
<img src="PASTE_YOUR_IMAGE_LINK_HERE" alt="Memory 2">
```

**Better Method - Use Local Photos:**
1. Create folder structure:
```
tet-website/
├── index.html
├── images/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
└── tet-music.mp3
```

2. In `index.html`, replace image URLs with:
```html
<img src="images/photo1.jpg" alt="Memory 1">
<img src="images/photo2.jpg" alt="Memory 2">
```

---

### 3. Edit Main Message (2 minutes)

Search for: `<!-- Message Section -->`

Find this text and replace with your own:
```html
<p data-vi="YOUR VIETNAMESE MESSAGE HERE"
   data-en="YOUR ENGLISH MESSAGE HERE">
   YOUR VIETNAMESE MESSAGE HERE
</p>
```

**Example:**
```html
<p data-vi="Em là tất cả của anh, là lý do anh mỉm cười mỗi ngày."
   data-en="You are my everything, the reason I smile every day.">
   Em là tất cả của anh, là lý do anh mỉm cười mỗi ngày.
</p>
```

---

### 4. Add Background Music (Optional - 1 minute)

1. Download a romantic instrumental song (MP3)
2. Rename it to: `tet-music.mp3`
3. Put it in the same folder as `index.html`
4. Done! The player will auto-detect it

**Where to find free music:**
- YouTube → Search "romantic instrumental" → Use a YouTube to MP3 converter
- [Free Music Archive](https://freemusicarchive.org)

---

## 🎯 That's It!

You're done! Now:
1. Open `index.html` in your browser
2. Test the password
3. Check if all photos show up
4. Make sure the music plays when you click the button

---

## 📦 Sharing the Website

### Method 1: Send as ZIP
1. Zip the entire `tet-website` folder
2. Send via email/messaging app
3. Your special person extracts and opens `index.html`

### Method 2: Host Online (Free & Easy!)
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag your `tet-website` folder
3. Get a free URL like: `https://lythao-tet-2026.netlify.app`
4. Share the link! ✨

---

## 💝 Need More Customization?

Read the full `README.md` for:
- Changing colors
- Adding videos
- Editing the surprise message
- Adjusting countdown date
- Advanced customizations

---

## ⚠️ Common Mistakes

❌ **Don't do this:**
- Don't delete the `data-vi` or `data-en` attributes
- Don't remove the quotation marks
- Don't change file names (keep `index.html` as is)

✅ **Do this:**
- Keep backups of your files
- Test after each change
- Use JPEG/PNG for photos (not HEIC)
- Keep photos under 5MB each for fast loading

---

## 🎊 You're All Set!

The rest is already beautiful and ready to go. Just personalize those 4 things above and you'll have an amazing romantic Tet website! 💕

**Password**: `lythao2026` (don't forget to change it!)

**Preview**: Just open `index.html` in Chrome, Firefox, or Safari.

Good luck! 🌸🧧✨