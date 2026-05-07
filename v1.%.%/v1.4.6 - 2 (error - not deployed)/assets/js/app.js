// =============================================================================
// APP — v1.4.6
// Firebase init, auth state, theme, routing.
// · No spinner — skeleton loading for all pages
// · /index.html → / redirect
// =============================================================================

import { initializeApp }               from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getDatabase }                 from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

// Redirect /index.html → /
if (window.location.pathname === '/index.html') {
  window.history.replaceState(null, '', '/');
}

// ── Firebase Init ────────────────────────────────────────────────────────────
const firebaseApp = initializeApp(SITE_CONFIG.firebase);
const auth        = getAuth(firebaseApp);
const db          = getDatabase(firebaseApp);

window.firebaseApp = firebaseApp;
window.auth        = auth;
window.db          = db;

// ── Theme Manager ────────────────────────────────────────────────────────────
const ThemeManager = (() => {
  const KEY = 'mdturzo_theme';
  const getStored = () => Utils.lsGet(KEY);
  const getSystem = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    Utils.lsSet(KEY, theme);
    document.querySelectorAll('[data-theme-icon]').forEach(i => {
      i.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
    window.Navbar?.updateThemeUI?.(theme);
  };

  const toggle = () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    apply(cur === 'dark' ? 'light' : 'dark');
  };

  const init = () => {
    apply(getStored() || getSystem());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!getStored()) apply(e.matches ? 'dark' : 'light');
    });
  };

  return { init, toggle, apply, current: () => document.documentElement.getAttribute('data-theme') };
})();
window.ThemeManager = ThemeManager;

// ── Auth ─────────────────────────────────────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  window.currentUser = user || null;
  window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
  if (typeof Navbar !== 'undefined') Navbar.updateAuthUI?.(user);
});

// ── App Core ─────────────────────────────────────────────────────────────────
const App = (() => {

  /** Swap #main-content with final page HTML, animate in */
  const renderPage = (html) => {
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = html;
    main.classList.remove('page-exit');
    main.classList.add('page-enter');
    requestAnimationFrame(() => requestAnimationFrame(() => main.classList.remove('page-enter')));
  };

  /** Show skeleton while real content loads */
  const renderSkeleton = (html) => {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = html;
  };

  /** Generic skeleton for pages under construction */
  const renderPlaceholder = (pageName) => {
    // Show a skeleton-style coming-soon page instead of spinner
    renderPage(`
      <section class="placeholder-page">
        <div class="container">
          <div class="placeholder-page__icon">
            <i class="fa-solid fa-wrench"></i>
          </div>
          <h1 class="placeholder-page__title">${pageName}</h1>
          <p class="placeholder-page__text">
            This page is being built. Check back soon.
          </p>
          <a href="/" class="btn btn--primary" data-tooltip="Go back home">
            <i class="fa-solid fa-house"></i> Back to Home
          </a>
        </div>
      </section>
    `);
    Utils.updateMeta({ title: pageName });
  };

  /** Generic page skeleton for non-home routes */
  const showPageSkeleton = () => {
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = `
      <div class="page-sk" style="max-width:var(--container-xl);margin:auto;padding:calc(var(--navbar-h) + 3rem) var(--container-pad) 4rem;">
        <div class="skeleton skeleton--rect" style="width:160px;height:22px;margin-bottom:1.5rem;"></div>
        <div class="skeleton skeleton--title" style="width:55%;margin-bottom:0.75rem;"></div>
        <div class="skeleton skeleton--title" style="width:38%;margin-bottom:2rem;"></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;">
          ${[1,2,3,4,5,6].map(() => `
            <div class="skeleton skeleton--card" style="height:180px;"></div>
          `).join('')}
        </div>
      </div>`;
  };

  return { renderPage, renderSkeleton, renderPlaceholder, showPageSkeleton };
})();
window.App = App;

// ── Routes ───────────────────────────────────────────────────────────────────
Router.register({
  '/': async () => {
    // Skeleton shown by index.html already; just render immediately
    Utils.updateMeta({ title: null, description: SITE_CONFIG.seo.defaultDescription });

    Utils.loadCSS('/assets/css/home/hero.css');
    Utils.loadCSS('/assets/css/home/skills.css');
    Utils.loadCSS('/assets/css/home/about-mini.css');

    try {
      await Promise.all([
        Utils.loadScript('/assets/js/home/hero.js'),
        Utils.loadScript('/assets/js/home/skills.js'),
        Utils.loadScript('/assets/js/home/about-mini.js'),
      ]);
    } catch (err) {
      console.error('[Home] Failed to load scripts:', err);
    }

    const heroHTML      = typeof HeroSection      !== 'undefined' ? HeroSection.getHTML()      : '';
    const skillsHTML    = typeof SkillsSection    !== 'undefined' ? SkillsSection.getHTML()    : '';
    const aboutMiniHTML = typeof AboutMiniSection !== 'undefined' ? AboutMiniSection.getHTML() : '';

    App.renderPage(heroHTML + skillsHTML + aboutMiniHTML);

    if (typeof HeroSection      !== 'undefined') HeroSection.init();
    if (typeof SkillsSection    !== 'undefined') SkillsSection.init();
    if (typeof AboutMiniSection !== 'undefined') AboutMiniSection.init();

    Utils.initLazyImages();
  },

  '/about':          async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('About'),    60); Utils.updateMeta({ title: 'About' }); },
  '/projects':       async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Projects'), 60); Utils.updateMeta({ title: 'Projects' }); },
  '/projects/:slug': async ({ slug }) => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder(`Project — ${slug}`), 60); Utils.updateMeta({ title: slug }); },
  '/blogs':          async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Blogs'),    60); Utils.updateMeta({ title: 'Blogs' }); },
  '/blogs/:slug':    async ({ slug }) => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder(`Blog — ${slug}`), 60); Utils.updateMeta({ title: slug }); },
  '/gallery':        async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Gallery'),  60); Utils.updateMeta({ title: 'Gallery' }); },
  '/gallery/photos': async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Gallery — Photos'), 60); Utils.updateMeta({ title: 'Photos' }); },
  '/gallery/videos': async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Gallery — Videos'), 60); Utils.updateMeta({ title: 'Videos' }); },
  '/contact':        async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Contact'),  60); Utils.updateMeta({ title: 'Contact' }); },
  '/login':          async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Login'),    60); Utils.updateMeta({ title: 'Login' }); },
  '/signup':         async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Sign Up'),  60); Utils.updateMeta({ title: 'Sign Up' }); },

  '/logout': async () => {
    try { await auth.signOut(); } catch {}
    Router.go('/');
  },

  '/profile':        async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Profile'),         60); Utils.updateMeta({ title: 'Profile' }); },
  '/@:username':     async ({ username }) => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder(`@${username}`), 60); Utils.updateMeta({ title: `@${username}` }); },
  '/admin':          async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Admin Dashboard'),  60); Utils.updateMeta({ title: 'Admin' }); },
  '/admin/:tab':     async ({ tab }) => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder(`Admin — ${tab}`), 60); Utils.updateMeta({ title: `Admin ${tab}` }); },
  '/privacy-policy': async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Privacy Policy'),  60); Utils.updateMeta({ title: 'Privacy Policy' }); },
  '/cookies-policy': async () => { App.showPageSkeleton(); setTimeout(() => App.renderPlaceholder('Cookies Policy'),  60); Utils.updateMeta({ title: 'Cookies Policy' }); },

  '*': async () => { window.location.href = '/404.html'; },
});

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Router.init();

  if (SITE_CONFIG.maintenance && !window.location.pathname.startsWith('/admin')) {
    document.getElementById('main-content').innerHTML = `
      <section class="maintenance-page">
        <div class="container">
          <i class="fa-solid fa-gear maintenance-page__icon"></i>
          <h1>Under Maintenance</h1>
          <p>The site is currently being updated. Please check back shortly.</p>
        </div>
      </section>`;
  }
});
