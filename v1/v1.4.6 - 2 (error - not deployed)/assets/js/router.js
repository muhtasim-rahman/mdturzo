// =============================================================================
// ROUTER — Client-side SPA Router (History API)
// Handles clean URL navigation without full page reloads.
// =============================================================================

const Router = (() => {

  let routes = {};
  let currentPath = null;
  let progressBar = null;

  // ── Progress Bar ────────────────────────────────────────────────────────────

  const createProgressBar = () => {
    progressBar = document.createElement('div');
    progressBar.id = 'nav-progress';
    progressBar.innerHTML = '<div class="nav-progress__bar"></div>';
    document.body.prepend(progressBar);
  };

  const startProgress = () => {
    const bar = progressBar?.querySelector('.nav-progress__bar');
    if (!bar) return;
    progressBar.classList.add('nav-progress--active');
    bar.style.width = '0%';
    let w = 0;
    const interval = setInterval(() => {
      w = Math.min(w + Math.random() * 15, 85);
      bar.style.width = w + '%';
      if (w >= 85) clearInterval(interval);
    }, 150);
    progressBar._interval = interval;
  };

  const finishProgress = () => {
    const bar = progressBar?.querySelector('.nav-progress__bar');
    if (!bar) return;
    clearInterval(progressBar._interval);
    bar.style.width = '100%';
    setTimeout(() => {
      progressBar.classList.remove('nav-progress--active');
      bar.style.width = '0%';
    }, 400);
  };

  // ── Route Matching ──────────────────────────────────────────────────────────

  /**
   * Matches a URL path against registered route patterns.
   * Supports dynamic segments like /projects/:slug
   * Returns { handler, params } or null.
   */
  const matchRoute = (path) => {
    for (const [pattern, handler] of Object.entries(routes)) {
      const paramNames = [];
      const regexStr = pattern
        .replace(/:[^/]+/g, (match) => {
          paramNames.push(match.slice(1));
          return '([^/]+)';
        })
        .replace(/\//g, '\\/');
      const regex = new RegExp(`^${regexStr}$`);
      const match = path.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((name, i) => {
          params[name] = decodeURIComponent(match[i + 1]);
        });
        return { handler, params };
      }
    }
    return null;
  };

  // ── Navigation ──────────────────────────────────────────────────────────────

  const navigate = async (path, pushState = true) => {
    if (path === currentPath) return;
    currentPath = path;

    startProgress();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active nav link
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      const href = link.getAttribute('href') || link.dataset.navLink;
      link.classList.toggle(
        'nav-link--active',
        href === path || (path !== '/' && href !== '/' && path.startsWith(href))
      );
    });

    // Push to browser history
    if (pushState) {
      window.history.pushState({ path }, '', path);
    }

    // Find and execute route handler
    const matched = matchRoute(path);

    if (matched) {
      try {
        await matched.handler(matched.params);
      } catch (err) {
        console.error('[Router] Route handler error:', err);
        await navigate('/404', false);
      }
    } else {
      // No route matched — 404
      const notFound = routes['*'] || routes['/404'];
      if (notFound) {
        await notFound({ path });
      }
    }

    finishProgress();
    Utils.initLazyImages();
  };

  // ── Public API ──────────────────────────────────────────────────────────────

  /** Register a route: pattern → async handler(params) */
  const on = (pattern, handler) => {
    routes[pattern] = handler;
  };

  /** Register multiple routes at once */
  const register = (routeMap) => {
    Object.assign(routes, routeMap);
  };

  /** Navigate programmatically */
  const go = (path) => navigate(path, true);

  /** Replace current history entry */
  const replace = (path) => {
    window.history.replaceState({ path }, '', path);
    navigate(path, false);
  };

  /** Initialize the router */
  const init = () => {
    createProgressBar();

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      navigate(window.location.pathname, false);
    });

    // Intercept all internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      // Only intercept internal links (not external, not anchors, not downloads)
      if (
        href &&
        !href.startsWith('http') &&
        !href.startsWith('//') &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !link.hasAttribute('download') &&
        !link.hasAttribute('target')
      ) {
        e.preventDefault();
        go(href);
      }
    });

    // Load the initial page
    navigate(window.location.pathname, false);
  };

  return { on, register, go, replace, init };

})();

window.Router = Router;
