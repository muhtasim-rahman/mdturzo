// =============================================================================
// APP — Global application initializer
// Firebase init, auth state listener, theme, and page routing bootstrap.
// =============================================================================

// ── Firebase SDK Imports (ESM via CDN) ─────────────────────────────────────
import { initializeApp }                      from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged }        from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getDatabase }                        from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

// ── Firebase Init ───────────────────────────────────────────────────────────
const firebaseApp = initializeApp(SITE_CONFIG.firebase);
const auth        = getAuth(firebaseApp);
const db          = getDatabase(firebaseApp);

window.firebaseApp = firebaseApp;
window.auth        = auth;
window.db          = db;

// ── Theme (Dark / Light Mode) ───────────────────────────────────────────────

const ThemeManager = (() => {
  const STORAGE_KEY = 'mdturzo_theme';

  const getStored = () => Utils.lsGet(STORAGE_KEY);
  const getSystem = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    Utils.lsSet(STORAGE_KEY, theme);
    document.querySelectorAll('[data-theme-icon]').forEach(icon => {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
    window.Navbar?.updateThemeUI?.(theme);
  };

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  };

  const init = () => {
    const stored = getStored();
    apply(stored || getSystem());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getStored()) apply(e.matches ? 'dark' : 'light');
    });
  };

  return { init, toggle, apply, current: () => document.documentElement.getAttribute('data-theme') };
})();

window.ThemeManager = ThemeManager;

// ── Auth State ─────────────────────────────────────────────────────────────

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  window.currentUser = user;
  window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
  if (typeof Navbar !== 'undefined' && Navbar.updateAuthUI) {
    Navbar.updateAuthUI(user);
  }
});

// ── CSS Loader ─────────────────────────────────────────────────────────────
// Dynamically inject page-specific CSS files (only once per file)

const loadCSS = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

// ── Main App Render ─────────────────────────────────────────────────────────

const App = (() => {

  const renderPage = (html) => {
    const main = document.getElementById('main-content');
    if (main) {
      main.innerHTML = html;
      main.classList.remove('page-exit');
      main.classList.add('page-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => main.classList.remove('page-enter'));
      });
    }
  };

  const renderSkeleton = (html) => {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = html;
  };

  const renderPlaceholder = (pageName) => {
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
          <a href="/" class="btn btn--primary">
            <i class="fa-solid fa-house"></i> Back to Home
          </a>
        </div>
      </section>
    `);
    Utils.updateMeta({ title: pageName });
  };

  return { renderPage, renderSkeleton, renderPlaceholder };
})();

window.App = App;

// ── Home Page Loader ────────────────────────────────────────────────────────

const loadHomePage = () => {
  // Load home-section CSS
  loadCSS('/assets/css/home/hero.css');
  loadCSS('/assets/css/home/skills.css');
  loadCSS('/assets/css/home/about-mini.css');
  loadCSS('/assets/css/home/stats.css');
  loadCSS('/assets/css/home/services.css');
  loadCSS('/assets/css/home/projects-preview.css');
  loadCSS('/assets/css/home/github-stats.css');
  loadCSS('/assets/css/home/reviews-preview.css');
  loadCSS('/assets/css/home/cta.css');

  // Load home section JS files if not already loaded
  const loadScript = (src) => new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = resolve;
    document.body.appendChild(s);
  });

  return Promise.all([
    loadScript('/assets/js/home/hero.js'),
    loadScript('/assets/js/home/skills.js'),
    loadScript('/assets/js/home/about-mini.js'),
    loadScript('/assets/js/home/stats.js'),
    loadScript('/assets/js/home/services.js'),
    loadScript('/assets/js/home/projects-preview.js'),
    loadScript('/assets/js/home/github-stats.js'),
    loadScript('/assets/js/home/reviews-preview.js'),
    loadScript('/assets/js/home/cta.js'),
  ]).then(() => {
    // Build page HTML by combining all section renders
    const sections = [];

    if (window.HeroSection)         sections.push(window.HeroSection.render());
    if (window.SkillsSection)       sections.push(window.SkillsSection.render());
    if (window.AboutMiniSection)    sections.push(window.AboutMiniSection.render());
    if (window.StatsSection)        sections.push(window.StatsSection?.render?.() || '');
    if (window.ServicesSection)     sections.push(window.ServicesSection?.render?.() || '');
    if (window.ProjectsPreview)     sections.push(window.ProjectsPreview?.render?.() || '');
    if (window.GitHubStatsSection)  sections.push(window.GitHubStatsSection?.render?.() || '');
    if (window.ReviewsPreview)      sections.push(window.ReviewsPreview?.render?.() || '');
    if (window.CTASection)          sections.push(window.CTASection?.render?.() || '');

    App.renderPage(sections.join(''));

    // Init all sections
    if (window.HeroSection)      window.HeroSection.init?.();
    if (window.SkillsSection)    window.SkillsSection.init?.();
    if (window.AboutMiniSection) window.AboutMiniSection.init?.();
    if (window.StatsSection)     window.StatsSection?.init?.();
    if (window.ServicesSection)  window.ServicesSection?.init?.();
    if (window.ProjectsPreview)  window.ProjectsPreview?.init?.();
    if (window.GitHubStatsSection) window.GitHubStatsSection?.init?.();
    if (window.ReviewsPreview)   window.ReviewsPreview?.init?.();
    if (window.CTASection)       window.CTASection?.init?.();
  });
};

// ── Register All Routes ─────────────────────────────────────────────────────

Router.register({
  '/': async () => {
    Utils.updateMeta({
      title:       null,
      description: SITE_CONFIG.seo.defaultDescription,
    });
    // Destroy previous hero typing if any
    window.HeroSection?.destroy?.();
    await loadHomePage();
  },

  '/about': async () => {
    App.renderPlaceholder('About');
    Utils.updateMeta({ title: 'About' });
  },

  '/projects': async () => {
    App.renderPlaceholder('Projects');
    Utils.updateMeta({ title: 'Projects' });
  },

  '/projects/:slug': async ({ slug }) => {
    App.renderPlaceholder(`Project — ${slug}`);
    Utils.updateMeta({ title: slug });
  },

  '/blogs': async () => {
    App.renderPlaceholder('Blogs');
    Utils.updateMeta({ title: 'Blogs' });
  },

  '/blogs/:slug': async ({ slug }) => {
    App.renderPlaceholder(`Blog — ${slug}`);
    Utils.updateMeta({ title: slug });
  },

  '/gallery': async () => {
    App.renderPlaceholder('Gallery');
    Utils.updateMeta({ title: 'Gallery' });
  },

  '/gallery/photos': async () => {
    App.renderPlaceholder('Gallery — Photos');
    Utils.updateMeta({ title: 'Photos' });
  },

  '/gallery/videos': async () => {
    App.renderPlaceholder('Gallery — Videos');
    Utils.updateMeta({ title: 'Videos' });
  },

  '/contact': async () => {
    App.renderPlaceholder('Contact');
    Utils.updateMeta({ title: 'Contact' });
  },

  '/login': async () => {
    App.renderPlaceholder('Login');
    Utils.updateMeta({ title: 'Login' });
  },

  '/signup': async () => {
    App.renderPlaceholder('Sign Up');
    Utils.updateMeta({ title: 'Sign Up' });
  },

  '/logout': async () => {
    try { await auth.signOut(); } catch {}
    Router.go('/');
  },

  '/profile': async () => {
    App.renderPlaceholder('Profile');
    Utils.updateMeta({ title: 'Profile' });
  },

  '/@:username': async ({ username }) => {
    App.renderPlaceholder(`@${username}`);
    Utils.updateMeta({ title: `@${username}` });
  },

  '/admin': async () => {
    App.renderPlaceholder('Admin Dashboard');
    Utils.updateMeta({ title: 'Admin' });
  },

  '/admin/:tab': async ({ tab }) => {
    App.renderPlaceholder(`Admin — ${tab}`);
    Utils.updateMeta({ title: `Admin ${tab}` });
  },

  '/privacy-policy': async () => {
    App.renderPlaceholder('Privacy Policy');
    Utils.updateMeta({ title: 'Privacy Policy' });
  },

  '/cookies-policy': async () => {
    App.renderPlaceholder('Cookies Policy');
    Utils.updateMeta({ title: 'Cookies Policy' });
  },

  // 404 — must be last
  '*': async () => {
    window.location.href = '/404.html';
  },
});

// ── Bootstrap ───────────────────────────────────────────────────────────────

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
      </section>
    `;
  }
});
