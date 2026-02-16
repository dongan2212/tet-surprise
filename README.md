# 💝 Romantic Tet Website for Ly Thao

A beautiful, romantic single-page website celebrating Vietnamese Lunar New Year (Tết) 2026, dedicated to someone very special.

## 🎨 Features

✅ **Password Protection** - Keep your love private
✅ **Bilingual Support** - Vietnamese & English
✅ **Animated Hero Section** - Falling peach blossoms
✅ **Countdown Timer** - To Lunar New Year 2026
✅ **Romantic Message** - With typing animation effect
✅ **Photo & Video Gallery** - With modal viewer
✅ **30-Second Slideshow** - Automatic photo slideshow
✅ **Surprise Section** - With fireworks & confetti
✅ **Background Music** - Toggle on/off
✅ **Mobile Responsive** - Works on all devices

---

## 🚀 How to Use

1. **Open the website**: Simply double-click `index.html` or open it in a web browser
2. **Enter password**: Default password is `13142000`
3. **Switch language**: Click VI/EN buttons in the top right corner
4. **Explore all sections**: Scroll through or click the "Open My Heart" button

---

## 🔧 Customization Guide

### 1️⃣ Change the Password

Find this line in `index.html` (around line 643):

```javascript
const correctPassword = "13142000"; // Change this to your desired password
```

Change `"13142000"` to your preferred password.

---

### 2️⃣ Edit Romantic Messages

#### Main Message Section
Find the `<!-- Message Section -->` in the HTML (around line 146-194) and edit the text inside the `<p>` tags.

**Vietnamese text** goes in: `data-vi="Your Vietnamese text here"`
**English text** goes in: `data-en="Your English text here"`

#### Typing Effect Message
Find this line (around line 723):

```javascript
const messages = {
    vi: "Your Vietnamese message here...",
    en: "Your English message here..."
};
```

Edit the text inside the quotes.

#### Surprise Message
Find the `<!-- Surprise Section -->` (around line 302) and edit the `surprise-message` paragraph.

---

### 3️⃣ Add Your Own Photos

#### Replace Gallery Photos

Find the `<!-- Gallery Section -->` photos tab (around line 212-245) and replace the image URLs:

```html
<div class="gallery-item" onclick="openModal('YOUR_IMAGE_URL_HERE', 'photo')">
    <img src="YOUR_IMAGE_URL_HERE" alt="Memory 1">
    <div class="gallery-caption" data-vi="Your Vietnamese caption" data-en="Your English caption">Caption</div>
</div>
```

**Option 1: Use Online Images**
- Upload your photos to a service like [Imgur](https://imgur.com) or [ImgBB](https://imgbb.com)
- Copy the direct image URL
- Replace `YOUR_IMAGE_URL_HERE` with your image URL

**Option 2: Use Local Images**
1. Create a folder called `images` next to `index.html`
2. Put your photos in the `images` folder
3. Replace the URL with: `images/your-photo-name.jpg`

Example:
```html
<img src="images/our-first-date.jpg" alt="Our first date">
```

#### Replace Slideshow Photos

Find the `<!-- Slideshow Video Section -->` (around line 286-294) and replace the image URLs:

```html
<img src="YOUR_IMAGE_URL_HERE" class="slideshow-image" alt="Slide 1">
```

**Tip**: Use 5-7 photos for a 30-second slideshow (6 seconds per photo).

---

### 4️⃣ Add Videos

Find the videos tab in the gallery section (around line 250-260):

```html
<div class="gallery-item" onclick="openModal('YOUR_VIDEO_URL_HERE', 'video')">
    <video src="YOUR_VIDEO_URL_HERE" muted></video>
    <div class="gallery-caption" data-vi="Vietnamese caption" data-en="English caption">Caption</div>
</div>
```

**For local videos**:
1. Create a `videos` folder next to `index.html`
2. Put your videos there
3. Use: `videos/your-video-name.mp4`

---

### 5️⃣ Add Background Music

1. Find or download a romantic Tet instrumental song (MP3 format)
2. Rename it to `tet-music.mp3`
3. Place it in the same folder as `index.html`
4. The music player will automatically detect it

**Free music sources**:
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Free Music Archive](https://freemusicarchive.org)
- Vietnamese instrumental Tet music on YouTube (download with a converter)

---

### 6️⃣ Change the Countdown Date

If Lunar New Year 2026 is on a different date, find this line (around line 652):

```javascript
const lunarNewYear = new Date('2026-02-17T00:00:00').getTime();
```

Change the date format: `YYYY-MM-DDTHH:MM:SS`

---

### 7️⃣ Customize Colors

Find the `:root` section at the top of the `<style>` tag (around line 14-19):

```css
:root {
    --deep-red: #A40000;      /* Main red color */
    --gold: #FFD700;          /* Gold accents */
    --peach-pink: #F8BBD0;    /* Peach blossom color */
    --cream: #FFF8E1;         /* Background cream */
    --dark-red: #8B0000;      /* Darker red shade */
}
```

Replace the color codes with your preferred colors. Use [ColorPicker](https://htmlcolorcodes.com/) to find color codes.

---

## 📱 Sharing Your Website

### Option 1: Share Locally
- Zip the entire folder
- Send to your special someone
- They can open `index.html` in their browser

### Option 2: Host Online (Free)
1. **GitHub Pages**:
   - Create a free GitHub account
   - Upload your files to a repository
   - Enable GitHub Pages in settings
   - Share the URL

2. **Netlify**:
   - Go to [Netlify](https://www.netlify.com)
   - Drag and drop your folder
   - Get a free URL instantly

3. **Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Upload your project
   - Get a free URL

---

## 🎁 Pro Tips

### Make It Extra Special:

1. **Record Your Voice**: Record yourself reading the message and add it as background audio
2. **Add More Animations**: The confetti and fireworks only play once - refresh for more!
3. **Create a Video Message**: Record a short video message and add it to the gallery
4. **Write in Your Handwriting**: Take a photo of a handwritten letter and add it as an image
5. **Hidden Easter Eggs**: Add more surprise buttons with different messages throughout the page

### Best Photos to Use:
- First date memories
- Special moments together
- Travel photos
- Candid happy moments
- Sunset/sunrise photos
- Food dates
- Seasonal memories

## 💌 Final Message

This website was created with love and care for Ly Thao. Every element is designed to convey deep emotion and celebrate your special relationship.

**Remember**: The best gift is not the website itself, but the time, thought, and love you put into customizing it for your special person.

Take your time to:
- Choose meaningful photos
- Write heartfelt messages
- Select romantic music
- Test everything before sharing

---

## 📧 Technical Details

- **File**: Single HTML file (no installation needed)
- **Size**: ~50KB (very lightweight)
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Mobile**: Fully responsive
- **No Backend**: Everything runs in the browser
- **Privacy**: No data is collected or sent anywhere

---

## 🌟 Credits

Made with ❤️ for Ly Thao
Tết 2026 - Year of the Horse

**Typography**:
- Playfair Display (headings)
- Poppins (body text)

**Libraries**:
- Confetti.js (for celebration effects)
- Native JavaScript (no jQuery needed)

---

## 📞 Need Help?

If you need help customizing:
1. Read this README carefully
2. Search for the section you want to change
3. Make small changes and test
4. Keep a backup of the original file

**Happy Customizing! 🎊**