// ================================================
// components/navbar.js — Shared Navbar
// Injected into every page via mountNavbar()
// ================================================

const NAV_ITEMS = [
  { path: '/',         label: 'Home',     icon: 'ri-home-4-line'      },
  { path: '/about',    label: 'About',    icon: 'ri-user-line'        },
  { path: '/projects', label: 'Projects', icon: 'ri-code-box-line'    },
  { path: '/skills',   label: 'Skills',   icon: 'ri-tools-line'       },
  { path: '/services', label: 'Services', icon: 'ri-service-line'     },
  { path: '/contact',  label: 'Contact',  icon: 'ri-mail-send-line'   },
];

// ── Build navbar HTML ──
function buildNavbar() {
  const linksHTML = NAV_ITEMS.map(i => `
    <li>
      <a href="${i.path}" data-nav-link data-href="${i.path}">
        ${i.label}
      </a>
    </li>
  `).join('');

  const mobileHTML = NAV_ITEMS.map(i => `
    <a href="${i.path}" data-nav-link data-href="${i.path}">
      <i class="${i.icon}"></i>${i.label}
    </a>
  `).join('');

  return `
    <nav class="navbar" id="navbar">
      <div class="container">
        <!-- Logo -->
        <a href="/" class="nav-logo" data-nav-link data-href="/">
          <div class="nav-logo-mark">MT</div>
          <span class="nav-logo-name">md<span class="hi">turzo</span></span>
        </a>

        <!-- Desktop links -->
        <ul class="nav-links">${linksHTML}</ul>

        <!-- Controls -->
        <div class="nav-controls">
          <button class="theme-btn" id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
            <i class="ri-sun-line"></i>
          </button>

          <!-- Shown when signed out -->
          <button class="nav-signin-btn" id="nav-signin-btn" style="display:none">
            <i class="ri-user-line"></i><span>Sign In</span>
          </button>

          <!-- Shown when signed in -->
          <div class="nav-user-pill" id="nav-user-pill" style="display:none">
            <img id="nav-user-img" src="" alt="User">
            <span id="nav-user-name"></span>
            <button data-auth-action="signout" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:0 .1rem;font-size:.82rem">
              <i class="ri-logout-circle-line"></i>
            </button>
          </div>

          <!-- Hamburger -->
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div class="nav-mobile" id="nav-mobile">
      ${mobileHTML}
      <div class="mobile-sep"></div>
      <a href="mailto:mdturzo.dev@gmail.com" target="_blank" rel="noopener">
        <i class="ri-mail-line"></i>mdturzo.dev@gmail.com
      </a>
    </div>
  `;
}

// ── Mount navbar into #navbar-root ──
export function mountNavbar() {
  const root = document.getElementById('navbar-root');
  if (!root) return;
  root.innerHTML = buildNavbar();

  initNavbarScroll();
  initHamburger();
  initThemeToggle();
  setActiveLinks(window.location.pathname);
}

// ── Highlight active link ──
export function setActiveLinks(path) {
  document.querySelectorAll('[data-nav-link]').forEach(el => {
    const href = el.getAttribute('data-href') || el.getAttribute('href');
    el.classList.toggle('active', href === path);
  });
}

// ── Scroll: glass effect ──
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const handler = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// ── Hamburger ──
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const mob = document.getElementById('nav-mobile');
  if (!btn || !mob) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mob.classList.toggle('open');
  });

  // Close when nav link clicked
  mob.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      btn.classList.remove('open');
      mob.classList.remove('open');
    }
  });
}

// ── Theme toggle ──
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? '' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mdturzo-theme', next === 'light' ? 'light' : 'dark');
    btn.innerHTML = next === 'light'
      ? '<i class="ri-moon-line"></i>'
      : '<i class="ri-sun-line"></i>';
  });
  // Sync icon with current theme
  const cur = document.documentElement.getAttribute('data-theme');
  btn.innerHTML = cur === 'light'
    ? '<i class="ri-moon-line"></i>'
    : '<i class="ri-sun-line"></i>';
}

// ── Update auth UI (called from auth.js) ──
export function updateNavAuth(user) {
  const signinBtn = document.getElementById('nav-signin-btn');
  const userPill  = document.getElementById('nav-user-pill');
  const userImg   = document.getElementById('nav-user-img');
  const userName  = document.getElementById('nav-user-name');

  if (!signinBtn || !userPill) return;

  if (user) {
    signinBtn.style.display = 'none';
    userPill.style.display = 'flex';
    if (userImg) userImg.src = user.photoURL || '';
    if (userName) userName.textContent = user.displayName?.split(' ')[0] || 'User';
  } else {
    signinBtn.style.display = 'flex';
    userPill.style.display = 'none';
  }
}
