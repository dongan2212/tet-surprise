// Password Protection
const correctPassword = "13142000"; // Change this to your desired password

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const error = document.getElementById('password-error');

    if (input === correctPassword) {
        document.getElementById('password-screen').classList.add('hidden');
        createPetals();
        startCountdown();
        startTypingEffect();

        // Autoplay music after unlocking
        setTimeout(() => {
            const music = document.getElementById('bg-music');
            const toggle = document.getElementById('music-toggle');
            const icon = document.getElementById('music-icon');

            music.play().then(() => {
                musicPlaying = true;
                toggle.classList.add('playing');
                icon.textContent = '🔊';
            }).catch(err => {
                console.log('Autoplay prevented by browser:', err);
            });
        }, 1000);
    } else {
        error.style.display = 'block';
        setTimeout(() => {
            error.style.display = 'none';
        }, 3000);
    }
}

// Press Enter to submit password
document.getElementById('password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

// Language Toggle
let currentLang = 'vi';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('[data-vi]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

// Falling Petals
function createPetals() {
    const hero = document.getElementById('hero');
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(petal);
    }
}

// Countdown Timer
function startCountdown() {
    const lunarNewYear = new Date('2026-02-17T00:00:00').getTime(); // Lunar New Year 2026

    setInterval(() => {
        const now = new Date().getTime();
        const distance = lunarNewYear - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }, 1000);
}

// Typing Effect
function startTypingEffect() {
    const messages = {
        vi: "Mỗi lần nhìn em, anh lại thấy lòng mình tràn ngập yêu thương. Em không chỉ là tình yêu của anh, mà còn là người bạn tri kỷ, là động lực để anh trở nên tốt hơn mỗi ngày. 💕",
        en: "Every time I look at you, my heart overflows with love. You're not just my love, but my best friend, my motivation to become better every day. 💕",
        ko: "당신을 볼 때마다 내 마음은 사랑으로 넘칩니다. 당신은 내 사랑일 뿐만 아니라 내 가장 친한 친구이고 매일 더 나은 사람이 되도록 하는 동기입니다. 💕"
    };

    let text = messages[currentLang];
    let index = 0;
    const element = document.getElementById('typed-message');

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    setTimeout(type, 2000);
}

// Gallery Tabs
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
}

// Modal
function openModal(src, type) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = type === 'photo'
        ? `<img src="${src}" alt="Memory">`
        : `<video src="${src}" controls autoplay></video>`;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Slideshow
let slideshowInterval;
let currentSlide = 0;

function playSlideshow() {
    const slides = document.querySelectorAll('.slideshow-image');

    slideshowInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 6000); // 30 seconds / 5 images = 6 seconds each
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Surprise Section
function revealSurprise() {
    const lunarNewYear = new Date('2026-02-17T00:00:00').getTime();
    const now = new Date().getTime();

    // Check if Lunar New Year has passed
    if (now < lunarNewYear) {
        const messages = {
            vi: '🎊 Món quà đặc biệt này sẽ được mở sau khi đếm ngược kết thúc!\n\nHãy kiên nhẫn chờ đợi nhé! ❤️',
            en: '🎊 This special gift will be revealed after the countdown ends!\n\nPlease wait patiently! ❤️',
            ko: '🎊 이 특별한 선물은 카운트다운이 끝난 후에 공개됩니다!\n\n조금만 기다려 주세요! ❤️'
        };
        alert(messages[currentLang] || messages.vi);
        return;
    }

    document.getElementById('surprise-content').classList.add('active');
    document.getElementById('surprise-btn').style.display = 'none';

    // Fireworks
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createFirework(), i * 100);
    }

    // Confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });
}

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + '%';
    firework.style.top = Math.random() * 100 + '%';
    firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(firework);

    for (let i = 0; i < 12; i++) {
        const particle = firework.cloneNode();
        const angle = (i * 30) * Math.PI / 180;
        const velocity = 100;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;

        particle.style.animation = `explode 1s ease-out forwards`;
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }

    setTimeout(() => firework.remove(), 1000);
}

// Music Player
let musicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');

    if (musicPlaying) {
        music.pause();
        toggle.classList.remove('playing');
        icon.textContent = '🎵';
    } else {
        music.play();
        toggle.classList.add('playing');
        icon.textContent = '🔊';
    }

    musicPlaying = !musicPlaying;
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Simple Confetti Function
function confetti(options) {
    const defaults = {
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }
    };
    const config = { ...defaults, ...options };

    for (let i = 0; i < config.particleCount; i++) {
        createConfettiPiece(config);
    }
}

function createConfettiPiece(config) {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#FF8C42'];
    const confettiPiece = document.createElement('div');

    confettiPiece.style.position = 'fixed';
    confettiPiece.style.width = '10px';
    confettiPiece.style.height = '10px';
    confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiPiece.style.left = (config.origin.x * window.innerWidth) + 'px';
    confettiPiece.style.top = (config.origin.y * window.innerHeight) + 'px';
    confettiPiece.style.zIndex = '10000';
    confettiPiece.style.pointerEvents = 'none';
    confettiPiece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

    document.body.appendChild(confettiPiece);

    const angle = (Math.random() * config.spread) - (config.spread / 2);
    const velocity = Math.random() * 10 + 5;
    const rotate = Math.random() * 360;

    let x = 0;
    let y = 0;
    let rotation = 0;
    let opacity = 1;

    function animate() {
        x += Math.sin(angle * Math.PI / 180) * velocity;
        y += velocity;
        rotation += 5;
        opacity -= 0.01;
        velocity *= 0.98;

        confettiPiece.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        confettiPiece.style.opacity = opacity;

        if (opacity > 0 && y < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            confettiPiece.remove();
        }
    }

    requestAnimationFrame(animate);
}

// Add explode animation
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        to {
            transform: translate(var(--x), var(--y));
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

        // Gallery Pagination System
        const TOTAL_IMAGES = 485;
        const TOTAL_VIDEOS = 41;

let currentImagePage = 1;
let currentVideoPage = 1;
let imagesPerPage = 20;
let videosPerPage = 20;

// Generate image gallery
function renderImageGallery() {
    const grid = document.getElementById('photos-grid');
    const pagination = document.getElementById('photos-pagination');
    
    const totalPages = Math.ceil(TOTAL_IMAGES / imagesPerPage);
    const startIndex = (currentImagePage - 1) * imagesPerPage + 1;
    const endIndex = Math.min(currentImagePage * imagesPerPage, TOTAL_IMAGES);

    // Clear grid
    grid.innerHTML = '';

    // Add images for current page
    for (let i = startIndex; i <= endIndex; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openModal(`images/${i}.JPG`, 'photo');
        
        item.innerHTML = `
            <img src="images/${i}.JPG" alt="Memory ${i}">
            <div class="gallery-caption" data-vi="Khoảnh khắc ${i}" data-en="Moment ${i}" data-ko="순간 ${i}">Khoảnh khắc ${i}</div>
        `;
        
        grid.appendChild(item);
    }

    // Render pagination buttons
    renderPaginationButtons(pagination, currentImagePage, totalPages, 'image');

    // Update language
    updateGalleryLanguage();
}

// Generate video gallery
function renderVideoGallery() {
    const grid = document.getElementById('videos-grid');
    const pagination = document.getElementById('videos-pagination');
    
    const totalPages = Math.ceil(TOTAL_VIDEOS / videosPerPage);
    const startIndex = (currentVideoPage - 1) * videosPerPage + 1;
    const endIndex = Math.min(currentVideoPage * videosPerPage, TOTAL_VIDEOS);

    // Clear grid
    grid.innerHTML = '';

    // Add videos for current page
    for (let i = startIndex; i <= endIndex; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openModal(`videos/${i}.MP4`, 'video');
        
        item.innerHTML = `
            <video src="videos/${i}.MP4" muted></video>
            <div class="gallery-caption" data-vi="Video ${i}" data-en="Video ${i}" data-ko="비디오 ${i}">Video ${i}</div>
        `;
        
        grid.appendChild(item);
    }

    // Render pagination buttons
    renderPaginationButtons(pagination, currentVideoPage, totalPages, 'video');

    // Update language
    updateGalleryLanguage();
}

// Render pagination buttons
function renderPaginationButtons(container, currentPage, totalPages, type) {
    container.innerHTML = '';
    
    if (totalPages <= 1) return;

    const buttonStyle = `
        padding: 0.5rem 1rem;
        margin: 0 0.25rem;
        background: white;
        border: 2px solid var(--peach-pink);
        color: var(--deep-red);
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
    `;

    const activeStyle = `
        ${buttonStyle}
        background: var(--deep-red);
        color: white;
        border-color: var(--deep-red);
    `;

    // Previous button
    if (currentPage > 1) {
        const prev = document.createElement('button');
        prev.style.cssText = buttonStyle;
        prev.innerHTML = '← Trước';
        prev.setAttribute('data-vi', '← Trước');
        prev.setAttribute('data-en', '← Previous');
        prev.setAttribute('data-ko', '← 이전');
        prev.onclick = () => changePage(type, currentPage - 1);
        container.appendChild(prev);
    }

    // Page numbers (show max 5 pages)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.style.cssText = i === currentPage ? activeStyle : buttonStyle;
        btn.textContent = i;
        btn.onclick = () => changePage(type, i);
        container.appendChild(btn);
    }

    // Next button
    if (currentPage < totalPages) {
        const next = document.createElement('button');
        next.style.cssText = buttonStyle;
        next.innerHTML = 'Tiếp →';
        next.setAttribute('data-vi', 'Tiếp →');
        next.setAttribute('data-en', 'Next →');
        next.setAttribute('data-ko', '다음 →');
        next.onclick = () => changePage(type, currentPage + 1);
        container.appendChild(next);
    }

    // Update button language
    updateButtonLanguage(container);
}

// Change page
function changePage(type, page) {
    if (type === 'image') {
        currentImagePage = page;
        renderImageGallery();
    } else {
        currentVideoPage = page;
        renderVideoGallery();
    }
    
    // Scroll to gallery
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Update language for gallery items
function updateGalleryLanguage() {
    document.querySelectorAll('[data-vi]').forEach(el => {
        if (el.getAttribute('data-' + currentLang)) {
            el.textContent = el.getAttribute('data-' + currentLang);
        }
    });
}

// Update button language
function updateButtonLanguage(container) {
    container.querySelectorAll('[data-vi]').forEach(el => {
        if (el.getAttribute('data-' + currentLang)) {
            el.innerHTML = el.getAttribute('data-' + currentLang);
        }
    });
}

// Handle items per page change
document.addEventListener('DOMContentLoaded', function() {
    // Images per page selector
    document.getElementById('images-per-page').addEventListener('change', function() {
        imagesPerPage = parseInt(this.value);
        currentImagePage = 1;
        renderImageGallery();
    });

    // Videos per page selector
    document.getElementById('videos-per-page').addEventListener('change', function() {
        videosPerPage = parseInt(this.value);
        currentVideoPage = 1;
        renderVideoGallery();
    });

    // Initial render
    renderImageGallery();
    renderVideoGallery();
});

    </script>
