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

// Expose globally so other modules can import without re-initializing
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
    // Update toggle icons (legacy [data-theme-icon] pattern)
    document.querySelectorAll('[data-theme-icon]').forEach(icon => {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
    // Notify navbar to update toggle UI
    window.Navbar?.updateThemeUI?.(theme);
  };

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  };

  const init = () => {
    const stored = getStored();
    apply(stored || getSystem());

    // Listen for system theme changes
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

  // Dispatch event so other components can react
  window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));

  // Update navbar UI if navbar component is loaded
  if (typeof Navbar !== 'undefined' && Navbar.updateAuthUI) {
    Navbar.updateAuthUI(user);
  }
});

// ── Main App Render ─────────────────────────────────────────────────────────

const App = (() => {

  /** Render a page component into #main-content */
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

  /** Render skeleton placeholder into #main-content */
  const renderSkeleton = (html) => {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = html;
  };

  /** Generic "coming soon" placeholder for pages under construction */
  // Generic skeleton for pages under construction
  const renderPlaceholder = (pageName) => {
    const skeletonCards = Array(4).fill(0).map(() => `
      <div class="sk-card">
        <div class="sk-block sk-block--title"></div>
        <div class="sk-block sk-block--line"></div>
        <div class="sk-block sk-block--line sk-block--short"></div>
      </div>`).join('');
    renderPage(`
      <section class="section" style="padding-top:var(--space-16);">
        <div class="container">
          <div class="sk-page-header">
            <div class="sk-block sk-block--label"></div>
            <div class="sk-block sk-block--h1"></div>
            <div class="sk-block sk-block--sub"></div>
          </div>
          <div class="sk-grid">${skeletonCards}</div>
          <div class="sk-coming-soon">
            <i class="fa-solid fa-hard-hat" aria-hidden="true"></i>
            <p><strong>${pageName}</strong> is coming soon.</p>
            <a href="/" class="btn btn--outline btn--sm"><i class="fa-solid fa-house" aria-hidden="true"></i> Back to Home</a>
          </div>
        </div>
      </section>
    `);
    Utils.updateMeta({ title: pageName });
  };

  return { renderPage, renderSkeleton, renderPlaceholder };
})();

window.App = App;

// ── Register All Routes ─────────────────────────────────────────────────────

Router.register({
  '/': async () => {
    Utils.updateMeta({
      title:       null,
      description: SITE_CONFIG.seo.defaultDescription,
    });

    // ── Load home page CSS ──────────────────────────────────────────────────
    Utils.loadCSS('/assets/css/home/hero.css');
    Utils.loadCSS('/assets/css/home/skills.css');
    Utils.loadCSS('/assets/css/home/about-mini.css');

    // ── Load home section scripts, then render ──────────────────────────────
    try {
      await Promise.all([
        Utils.loadScript('/assets/js/home/hero.js'),
        Utils.loadScript('/assets/js/home/skills.js'),
        Utils.loadScript('/assets/js/home/about-mini.js'),
      ]);
    } catch (err) {
      console.error('[Home] Failed to load home section scripts:', err);
    }

    // ── Build & render page ─────────────────────────────────────────────────
    const heroHTML       = typeof HeroSection      !== 'undefined' ? HeroSection.getHTML()      : '';
    const skillsHTML     = typeof SkillsSection    !== 'undefined' ? SkillsSection.getHTML()    : '';
    const aboutMiniHTML  = typeof AboutMiniSection !== 'undefined' ? AboutMiniSection.getHTML() : '';

    App.renderPage(heroHTML + skillsHTML + aboutMiniHTML);

    // ── Init section logic after DOM insertion ──────────────────────────────
    if (typeof HeroSection      !== 'undefined') HeroSection.init();
    if (typeof SkillsSection    !== 'undefined') SkillsSection.init();
    if (typeof AboutMiniSection !== 'undefined') AboutMiniSection.init();

    // Lazy-load images
    Utils.initLazyImages();
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
    try {
      await auth.signOut();
    } catch {}
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

  // /index.html redirect → /
  '/index.html': async () => {
    Router.replace('/');
  },

  // 404 — must be registered last
  '*': async ({ path } = {}) => {
    // Render 404 inline without full page reload
    const tryLoad = async () => {
      try {
        const res = await fetch('/404.html');
        const text = await res.text();
        // Extract just the body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const bodyHTML = doc.body.innerHTML;
        const main = document.getElementById('main-content');
        if (main) {
          main.innerHTML = bodyHTML;
          // Re-run any inline scripts from 404
          main.querySelectorAll('script').forEach(s => {
            const ns = document.createElement('script');
            ns.textContent = s.textContent;
            s.parentNode.replaceChild(ns, s);
          });
        }
      } catch {
        App.renderPage(`
          <section class="section" style="min-height:60vh;display:flex;align-items:center;">
            <div class="container" style="text-align:center;">
              <h1 style="font-size:6rem;font-weight:900;color:var(--accent-primary);line-height:1;">404</h1>
              <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Page not found.</p>
              <a href="/" class="btn btn--primary">Go Home</a>
            </div>
          </section>
        `);
      }
    };
    await tryLoad();
  },
});

// ── Bootstrap ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Router.init();

  // Maintenance mode check
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
