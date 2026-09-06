const GAMES = [
  {
    url: "https://www.roblox.com/games/81186128195438/Unseenia",
    role: "Owner & Lead Developer",
    name: "Unseenia",
    icon: "assets/icons/unseenia.png",
    banner: "assets/backgrounds/UnseeniaBanner.png",
  },

  {
    url: "https://www.roblox.com/games/120500302070128/EVERWIND",
    role: "Full-stack Developer",
    name: "Everwind",
    icon: "assets/icons/everwind.png",
    banner: "assets/backgrounds/breadfruit.png",
    discord: "https://discord.gg/everwind"
  },
];

const row = document.getElementById('gamesRow');
GAMES.forEach(entry => {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
 
  const a = document.createElement('a');
  a.href = entry.url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.className = 'game-card';
  // if (entry.name === 'Unseenia') a.classList.add('highlight');
  if (entry.banner) {
  a.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('${entry.banner}')`;
}
  a.innerHTML = `
  <span class="corner tl"></span>
  <span class="corner tr"></span>
  <span class="corner bl"></span>
  <span class="corner br"></span>
    <div class="game-icon">
      <img src="${entry.icon}" alt="${entry.name}" />
    </div>
    <div>
      <p class="game-name">${entry.name}</p>
      <p class="game-role">${entry.role}</p>
    </div>`;
  wrap.appendChild(a);
 
  if (entry.discord) {
    const d = document.createElement('a');
    d.href = entry.discord;
    d.target = '_blank';
    d.rel = 'noopener';
    d.className = 'discord-join-btn';
    d.innerHTML = `<img src="assets/icons/discord_logo.png" style="width:14px;height:14px;object-fit:contain;" alt="" /><span>Join Discord</span>`;
    wrap.appendChild(d);
  }
 
  row.appendChild(wrap);
});

const btns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card[data-tags]');
const clrBtn = document.getElementById('clearBtn');
const empty = document.getElementById('emptyState');
const active = new Set();

function filter() {
  let n = 0;
  cards.forEach(c => {
    const show = active.size === 0 || [...active].some(t => c.dataset.tags.split(',').includes(t));
    c.classList.toggle('is-hidden', !show);
    if (show) n++;
  });
  empty.classList.toggle('visible', n === 0);
  clrBtn.classList.toggle('visible', active.size > 0);
}

btns.forEach(b => b.addEventListener('click', () => {
  active.has(b.dataset.tag) ? active.delete(b.dataset.tag) : active.add(b.dataset.tag);
  b.classList.toggle('active');
  filter();
}));

clrBtn.addEventListener('click', () => {
  active.clear();
  btns.forEach(b => b.classList.remove('active'));
  filter();
});

const viewer = document.getElementById('mediaViewer');
const viewerMedia = document.getElementById('viewerMedia');
let viewerContentMedia = null;
let currentZoom = 1;

function setViewerZoom(val) {
  currentZoom = Math.min(3, Math.max(1, val));
  if (viewerContentMedia) viewerContentMedia.style.transform = `scale(${currentZoom})`;
}

function openViewer(el) {
  if (!viewer || !viewerMedia) return;
  const clone = el.cloneNode(true);
  clone.removeAttribute('style');
  clone.style.maxWidth = '100%';
  clone.style.maxHeight = '100%';
  clone.style.transform = 'scale(1)';
  viewerMedia.innerHTML = '';
  viewerMedia.appendChild(clone);
  viewerContentMedia = clone;
  setViewerZoom(1);
  viewer.classList.add('active');
  viewer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  if (!viewer) return;
  viewer.classList.remove('active');
  viewer.setAttribute('aria-hidden', 'true');
  if (viewerMedia) viewerMedia.innerHTML = '';
  viewerContentMedia = null;
  document.body.style.overflow = '';
  currentZoom = 1;
}

document.querySelectorAll('.card').forEach(card => {
  const media = card.querySelector('.card-media img, .card-media iframe');
  if (!media) return;
  const mediaFrame = card.querySelector('.card-media');
  if (!mediaFrame) return;

  mediaFrame.classList.add('media-clickable');
  mediaFrame.addEventListener('click', () => openViewer(media));
});

viewer?.addEventListener('click', e => {
  if (e.target === viewer || (e.target instanceof Element && (e.target.closest('[data-close]') || e.target.closest('.viewer-close')))) {
    closeViewer();
  }
});

viewer?.addEventListener('wheel', e => {
  e.preventDefault();
  setViewerZoom(currentZoom + (e.deltaY > 0 ? -0.1 : 0.1));
}, { passive: false });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeViewer();
  if (e.key === '+' || e.key === '=') setViewerZoom(currentZoom + 0.2);
  if (e.key === '-') setViewerZoom(currentZoom - 0.2);
});

function spawnStars() {
  const field  = document.querySelector('.star-field');
  const images = ['assets/deco/Star1.png', 'assets/deco/Star2.png'];

  for (let i = 0; i < 7; i++) {
    const star = document.createElement('div');
    const size = 14 + Math.round(Math.random() * 18);
    const floatDistance = 10 + Math.round(Math.random() * 14);
    const duration = 7 + Math.random() * 4;
    const delay = Math.random() * -duration;
    const scaleMin = 0.88 + Math.random() * 0.06;
    const scaleMax = scaleMin + 0.08 + Math.random() * 0.06;

    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.alt = '';

    star.className = 'star';
    star.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*92}%;top:${Math.random()*90}%`;
    star.style.setProperty('--star-duration', `${duration}s`);
    star.style.setProperty('--star-delay', `${delay}s`);
    star.style.setProperty('--star-scale-min', scaleMin);
    star.style.setProperty('--star-scale-max', scaleMax);
    star.style.setProperty('--star-float-distance', `${floatDistance}px`);
    star.style.setProperty('--star-start-rotation', `${Math.random()*360}deg`);
    star.appendChild(img);
    field.appendChild(star);
  }
}

window.addEventListener('load', () => {
  spawnStars();
});