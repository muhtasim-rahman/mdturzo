// ================================================
// js/main.js — App Entry Point
// ================================================
import { mountNavbar } from '../components/navbar.js';
import { mountFooter } from '../components/footer.js';
import { initAuth }    from './auth.js';
import { initRouter }  from './router.js';

(function boot() {
  // 1. Apply saved theme (before render to avoid flash)
  const saved = localStorage.getItem('mdturzo-theme');
  const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute(
    'data-theme',
    (saved === 'light' || (!saved && !prefDark)) ? 'light' : ''
  );

  // 2. Mount shared navbar & footer (into #navbar-root / #footer-root in index.html)
  mountNavbar();
  mountFooter();

  // 3. Firebase Auth listener + global auth button delegation
  initAuth();

  // 4. SPA Router (renders first page into #app)
  initRouter();
})();
