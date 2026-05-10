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

// ── Register All Routes ─────────────────────────────────────────────────────

Router.register({
  '/': async () => {
    Utils.updateMeta({
      title:       null, // Homepage — just the siteName
      description: SITE_CONFIG.seo.defaultDescription,
    });
    // Home page will be implemented in v1.4.0+
    // For now render a placeholder
    App.renderPlaceholder('Home');
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

  // 404 — must be registered last
  '*': async ({ path } = {}) => {
    window.location.href = '/404.html';
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
