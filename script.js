// ============================================================================
// OPTIMIZED SCRIPT.JS - With Lazy Loading & Responsive Images
// ============================================================================

// Configuration
const CONFIG = {
    password: "13142000",
    lunarNewYear: new Date('2026-02-17T00:00:00').getTime(),
    totalImages: 485,
    totalVideos: 41,
    imagesPerPage: 20,
    videosPerPage: 20,
    useWebP: false, // Set to true after running optimize-images.py
    imageSizes: [480, 960, 1440], // Responsive image sizes
};

// State
let state = {
    currentLang: 'vi',
    musicPlaying: false,
    currentImagePage: 1,
    currentVideoPage: 1,
    imagesPerPage: CONFIG.imagesPerPage,
    videosPerPage: CONFIG.videosPerPage,
};

// ============================================================================
// PASSWORD PROTECTION
// ============================================================================

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const error = document.getElementById('password-error');

    if (input === CONFIG.password) {
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
                state.musicPlaying = true;
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
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });
    }
});

// ============================================================================
// LANGUAGE TOGGLE
// ============================================================================

function setLanguage(lang) {
    state.currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('[data-vi]').forEach(el => {
        const translation = el.getAttribute('data-' + lang);
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
}

// ============================================================================
// FALLING PETALS ANIMATION
// ============================================================================

function createPetals() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(petal);
    }
}

// ============================================================================
// COUNTDOWN TIMER
// ============================================================================

function startCountdown() {
    setInterval(() => {
        const now = new Date().getTime();
        const distance = CONFIG.lunarNewYear - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }, 1000);
}

// ============================================================================
// TYPING EFFECT
// ============================================================================

function startTypingEffect() {
    const messages = {
        vi: "Mỗi lần được trò chuyện với em, mình lại thấy vui và thoải mái biết bao. Em không chỉ là người bạn tốt, mà còn là người khiến những ngày bình thường trở nên đặc biệt hơn. 💕",
        en: "Every time we talk, I feel so happy and comfortable. You're not just a good friend, but someone who makes ordinary days feel special. 💕",
        ko: "우리가 이야기할 때마다 나는 너무 행복하고 편안함을 느낍니다. 당신은 좋은 친구일 뿐만 아니라 평범한 날을 특별하게 만드는 사람입니다. 💕"
    };

    let text = messages[state.currentLang];
    let index = 0;
    const element = document.getElementById('typed-message');
    if (!element) return;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    setTimeout(type, 2000);
}

// ============================================================================
// LAZY LOADING IMAGES
// ============================================================================

function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Load image from data-src
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }

                // Load srcset for responsive images
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }

                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.01
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src], video[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// GALLERY GENERATION WITH FOR LOOPS
// ============================================================================

function generateImageSrcSet(imageNum) {
    if (CONFIG.useWebP) {
        // Use optimized WebP images with multiple sizes
        const srcset = CONFIG.imageSizes
            .map(size => `images-optimized/${imageNum}_${size}w.webp ${size}w`)
            .join(', ');
        return {
            src: `images-optimized/${imageNum}_960w.webp`,
            srcset: srcset,
            sizes: '(max-width: 640px) 480px, (max-width: 1024px) 960px, 1440px'
        };
    } else {
        // Fallback to original JPG
        return {
            src: `images/${imageNum}.JPG`,
            srcset: '',
            sizes: ''
        };
    }
}

function renderImageGallery() {
    const grid = document.getElementById('photos-grid');
    const pagination = document.getElementById('photos-pagination');
    if (!grid) return;

    const totalPages = Math.ceil(CONFIG.totalImages / state.imagesPerPage);
    const startIndex = (state.currentImagePage - 1) * state.imagesPerPage + 1;
    const endIndex = Math.min(state.currentImagePage * state.imagesPerPage, CONFIG.totalImages);

    // Clear grid
    grid.innerHTML = '';

    // Generate gallery items using FOR LOOP
    for (let i = startIndex; i <= endIndex; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openModal(`images/${i}.JPG`, 'photo');

        const imgData = generateImageSrcSet(i);

        // Create image with lazy loading
        item.innerHTML = `
            <img
                data-src="${imgData.src}"
                ${imgData.srcset ? `data-srcset="${imgData.srcset}"` : ''}
                ${imgData.sizes ? `sizes="${imgData.sizes}"` : ''}
                alt="Memory ${i}"
                loading="lazy"
                style="opacity: 0; transition: opacity 0.3s;"
                onload="this.style.opacity=1"
            >
            <div class="gallery-caption"
                 data-vi="Khoảnh khắc ${i}"
                 data-en="Moment ${i}"
                 data-ko="순간 ${i}">
                Khoảnh khắc ${i}
            </div>
        `;

        grid.appendChild(item);
    }

    // Setup lazy loading for newly added images
    setupLazyLoading();

    // Render pagination
    renderPaginationButtons(pagination, state.currentImagePage, totalPages, 'image');

    // Update language
    updateGalleryLanguage();
}

function renderVideoGallery() {
    const grid = document.getElementById('videos-grid');
    const pagination = document.getElementById('videos-pagination');
    if (!grid) return;

    const totalPages = Math.ceil(CONFIG.totalVideos / state.videosPerPage);
    const startIndex = (state.currentVideoPage - 1) * state.videosPerPage + 1;
    const endIndex = Math.min(state.currentVideoPage * state.videosPerPage, CONFIG.totalVideos);

    // Clear grid
    grid.innerHTML = '';

    // Generate gallery items using FOR LOOP
    for (let i = startIndex; i <= endIndex; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openModal(`videos/${i}.MP4`, 'video');

        // Create video with lazy loading
        item.innerHTML = `
            <video
                data-src="videos/${i}.MP4"
                muted
                loading="lazy"
                preload="none"
            ></video>
            <div class="gallery-caption"
                 data-vi="Video ${i}"
                 data-en="Video ${i}"
                 data-ko="비디오 ${i}">
                Video ${i}
            </div>
        `;

        grid.appendChild(item);
    }

    // Setup lazy loading for videos
    setupLazyLoading();

    // Render pagination
    renderPaginationButtons(pagination, state.currentVideoPage, totalPages, 'video');

    // Update language
    updateGalleryLanguage();
}

// ============================================================================
// PAGINATION
// ============================================================================

function renderPaginationButtons(container, currentPage, totalPages, type) {
    if (!container) return;
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

    updateGalleryLanguage();
}

function changePage(type, page) {
    if (type === 'image') {
        state.currentImagePage = page;
        renderImageGallery();
    } else {
        state.currentVideoPage = page;
        renderVideoGallery();
    }

    // Scroll to gallery
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateGalleryLanguage() {
    document.querySelectorAll('[data-vi]').forEach(el => {
        const translation = el.getAttribute('data-' + state.currentLang);
        if (translation) {
            if (el.tagName === 'BUTTON') {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
}

// ============================================================================
// GALLERY TABS
// ============================================================================

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    const tabContent = document.getElementById(tab);
    if (tabContent) {
        tabContent.classList.add('active');
    }
}

// ============================================================================
// MODAL
// ============================================================================

function openModal(src, type) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = type === 'photo'
        ? `<img src="${src}" alt="Memory">`
        : `<video src="${src}" controls autoplay></video>`;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================================================
// SURPRISE SECTION
// ============================================================================

function revealSurprise() {
    const now = new Date().getTime();

    // Check if Lunar New Year has passed
    if (now < CONFIG.lunarNewYear) {
        const messages = {
            vi: '🎊 Món quà đặc biệt này sẽ được mở sau khi đếm ngược kết thúc!\n\nHãy kiên nhẫn chờ đợi nhé! 💝',
            en: '🎊 This special gift will be revealed after the countdown ends!\n\nPlease wait patiently! 💝',
            ko: '🎊 이 특별한 선물은 카운트다운이 끝난 후에 공개됩니다!\n\n조금만 기다려 주세요! 💝'
        };
        alert(messages[state.currentLang] || messages.vi);
        return;
    }

    const surpriseContent = document.getElementById('surprise-content');
    const surpriseBtn = document.getElementById('surprise-btn');

    if (surpriseContent) surpriseContent.classList.add('active');
    if (surpriseBtn) surpriseBtn.style.display = 'none';

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

// ============================================================================
// CONFETTI
// ============================================================================

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

    let x = 0, y = 0, rotation = 0, opacity = 1, currentVelocity = velocity;

    function animate() {
        x += Math.sin(angle * Math.PI / 180) * currentVelocity;
        y += currentVelocity;
        rotation += 5;
        opacity -= 0.01;
        currentVelocity *= 0.98;

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

// ============================================================================
// MUSIC PLAYER
// ============================================================================

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    if (!music) return;

    if (state.musicPlaying) {
        music.pause();
        if (toggle) toggle.classList.remove('playing');
        if (icon) icon.textContent = '🎵';
    } else {
        music.play();
        if (toggle) toggle.classList.add('playing');
        if (icon) icon.textContent = '🔊';
    }

    state.musicPlaying = !state.musicPlaying;
}

// ============================================================================
// SMOOTH SCROLL
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Images per page selector
    const imagesPerPageSelect = document.getElementById('images-per-page');
    if (imagesPerPageSelect) {
        imagesPerPageSelect.addEventListener('change', function() {
            state.imagesPerPage = parseInt(this.value);
            state.currentImagePage = 1;
            renderImageGallery();
        });
    }

    // Videos per page selector
    const videosPerPageSelect = document.getElementById('videos-per-page');
    if (videosPerPageSelect) {
        videosPerPageSelect.addEventListener('change', function() {
            state.videosPerPage = parseInt(this.value);
            state.currentVideoPage = 1;
            renderVideoGallery();
        });
    }

    // Initial render of galleries
    renderImageGallery();
    renderVideoGallery();

    // Setup lazy loading
    setupLazyLoading();
});

// Add explode animation for fireworks
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
