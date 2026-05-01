// ================================================
// js/router.js — SPA Router (History API)
// Clean /path routing, no hash, Firebase rewrite compatible
// ================================================
import { setActiveLinks } from '../components/navbar.js';
import { initAOS }        from './animations.js';

// ── Lazy page imports ──
const PAGES = {
  '/':         () => import('../pages/home.js'),
  '/about':    () => import('../pages/about.js'),
  '/projects': () => import('../pages/projects.js'),
  '/skills':   () => import('../pages/skills.js'),
  '/services': () => import('../pages/services.js'),
  '/contact':  () => import('../pages/contact.js'),
};

const PAGE_TITLES = {
  '/':         'Muhtasim Rahman — Web Developer & Designer',
  '/about':    'About — Muhtasim Rahman',
  '/projects': 'Projects — Muhtasim Rahman',
  '/skills':   'Skills — Muhtasim Rahman',
  '/services': 'Services — Muhtasim Rahman',
  '/contact':  'Contact — Muhtasim Rahman',
};

const appEl = document.getElementById('app');
let activePath = null;

// ── Normalize path ──
function normPath(raw) {
  let p = (raw || '/').split('?')[0].split('#')[0];
  if (!p.startsWith('/')) p = '/' + p;
  if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

// ── Navigate ──
export async function navigate(rawPath, push = true) {
  const path = normPath(rawPath);
  if (path === activePath) return;
  activePath = path;

  if (push) window.history.pushState({ path }, '', path);
  window.scrollTo({ top: 0, behavior: 'instant' });

  document.title = PAGE_TITLES[path] || PAGE_TITLES['/'];
  setActiveLinks(path);

  // Loading state
  appEl.innerHTML = '<div class="spinner"></div>';

  try {
    const loader = PAGES[path] || PAGES['/'];
    const mod = await loader();

    // Every page module exports renderPage() and optionally initPage()
    appEl.innerHTML = mod.renderPage();

    // Page enter animation
    appEl.classList.remove('page-enter');
    void appEl.offsetWidth;
    appEl.classList.add('page-enter');

    // Run page-specific init
    if (typeof mod.initPage === 'function') mod.initPage();

    // Scroll-reveal animations
    initAOS();
  } catch (err) {
    console.error('[Router]', err);
    appEl.innerHTML = page404();
  }
}

// ── Intercept all local <a> clicks ──
export function initRouter() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (
      href.startsWith('http') || href.startsWith('//') ||
      href.startsWith('mailto:') || href.startsWith('tel:') ||
      href.startsWith('#') ||
      a.hasAttribute('download') ||
      a.getAttribute('target') === '_blank'
    ) return;
    e.preventDefault();
    navigate(href);
    // Close mobile menu
    document.getElementById('nav-mobile')?.classList.remove('open');
    document.getElementById('hamburger')?.classList.remove('open');
  });

  // Browser back/forward
  window.addEventListener('popstate', (e) => {
    navigate(e.state?.path || window.location.pathname, false);
  });

  // Initial render
  navigate(window.location.pathname, false);
}

function page404() {
  return `
    <section class="section" style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;">
      <div class="container">
        <div style="font-size:5.5rem;margin-bottom:1rem;line-height:1">🔍</div>
        <h1 class="section-title">404 — Not Found</h1>
        <p class="section-sub" style="margin:.75rem auto 2rem">The page you're looking for doesn't exist.</p>
        <a href="/" class="btn btn-primary">← Back to Home</a>
      </div>
    </section>
  `;
}
