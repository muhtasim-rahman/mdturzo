// =============================================================================
// NAVBAR — Full Implementation v1.3.0
// Glass morphism on scroll, mega menu, sidebar drawer, animated dark/light toggle
// =============================================================================

const Navbar = (() => {

  let _cfg = null;
  let _drawerOpen = false;
  let _megaOpen = false;

  // ── Build HTML ─────────────────────────────────────────────────────────────

  const render = () => {
    _cfg = window.SITE_CONFIG;
    const nav = document.getElementById('navbar');
    if (!nav) return;

    // Desktop nav: items with showDesktop === true
    const desktopLinks = (_cfg.navItems || [])
      .filter(i => i.showDesktop)
      .map(i => `
        <a href="${i.path}" class="navbar__link" data-nav-link="${i.path}">
          <i class="fa-solid ${i.icon}"></i>${i.label}
        </a>
      `).join('');

    // Mega menu: all nav items in a 2-col grid
    const megaItems = (_cfg.navItems || []).map(i => `
      <a href="${i.path}" class="navbar__mega-item" data-nav-link="${i.path}">
        <span class="navbar__mega-item-icon"><i class="fa-solid ${i.icon}"></i></span>
        ${i.label}
      </a>
    `).join('');

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const isDark = currentTheme === 'dark';

    nav.innerHTML = `
      <!-- Sidebar Overlay -->
      <div class="navbar__overlay" id="navbar-overlay" role="presentation"></div>

      <!-- Sidebar Drawer -->
      <aside class="navbar__drawer" id="navbar-drawer" role="navigation" aria-label="Mobile navigation">
        <div class="navbar__drawer-header">
          <a href="/" class="navbar__drawer-logo" data-nav-link="/">
            ${_cfg.owner.displayName.split(' ')[0]}<span>.</span>
          </a>
          <button class="navbar__drawer-close" id="drawer-close" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="navbar__drawer-body">
          <span class="navbar__drawer-section-label">Navigation</span>
          ${(_cfg.navItems || []).map(i => `
            <a href="${i.path}" class="navbar__drawer-link" data-nav-link="${i.path}">
              <span class="navbar__drawer-link-icon"><i class="fa-solid ${i.icon}"></i></span>
              ${i.label}
            </a>
          `).join('')}

          <div class="navbar__drawer-divider"></div>
          <span class="navbar__drawer-section-label">Account</span>
          <a href="/profile" class="navbar__drawer-link" data-nav-link="/profile">
            <span class="navbar__drawer-link-icon"><i class="fa-regular fa-user"></i></span>
            My Profile
          </a>
          <a href="/login" class="navbar__drawer-link" data-nav-link="/login">
            <span class="navbar__drawer-link-icon"><i class="fa-solid fa-arrow-right-to-bracket"></i></span>
            Login
          </a>
        </div>

        <div class="navbar__drawer-footer">
          <div class="navbar__drawer-theme">
            <span class="navbar__drawer-theme-label">
              <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}"></i>
              ${isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button class="theme-toggle" id="drawer-theme-toggle" aria-label="Toggle theme">
              <div class="theme-toggle__track">
                <div class="theme-toggle__thumb">
                  <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}"></i>
                </div>
              </div>
            </button>
          </div>
          <div class="navbar__drawer-auth" id="drawer-auth">
            <a href="/login" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--login">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
            </a>
            <a href="/signup" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--signup">
              <i class="fa-solid fa-user-plus"></i> Sign Up
            </a>
          </div>
        </div>
      </aside>

      <!-- Main Navbar Inner -->
      <div class="navbar__inner">

        <!-- Logo -->
        <a href="/" class="navbar__logo" data-nav-link="/">
          <span class="navbar__logo-icon"><i class="fa-solid fa-code"></i></span>
          ${_cfg.owner.displayName.split(' ')[0]}<span>.</span>
        </a>

        <!-- Desktop Nav Links -->
        <nav class="navbar__nav" aria-label="Main navigation">
          ${desktopLinks}
        </nav>

        <!-- Actions (right side) -->
        <div class="navbar__actions">

          <!-- Search -->
          <button class="navbar__icon-btn" id="navbar-search-btn" aria-label="Search" title="Search (coming in v1.14.0)">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

          <!-- Notifications -->
          <button class="navbar__icon-btn" id="navbar-notif-btn" aria-label="Notifications" title="Notifications">
            <i class="fa-regular fa-bell"></i>
            <span class="navbar__notif-badge" id="notif-badge" hidden>0</span>
          </button>

          <!-- Theme Toggle -->
          <button class="theme-toggle" id="navbar-theme-toggle" aria-label="Toggle dark/light mode" title="Toggle theme">
            <div class="theme-toggle__track">
              <div class="theme-toggle__thumb">
                <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}"></i>
              </div>
            </div>
          </button>

          <!-- Account -->
          <button class="navbar__icon-btn" id="navbar-auth-btn" aria-label="Account" title="Account">
            <i class="fa-regular fa-user"></i>
          </button>

          <!-- All Items (Mega Menu trigger) — desktop only -->
          <div class="navbar__mega-wrap">
            <button class="navbar__icon-btn" id="navbar-mega-btn" aria-label="All navigation items" title="All pages">
              <i class="fa-solid fa-border-all"></i>
            </button>
            <div class="navbar__mega" id="navbar-mega" role="dialog" aria-label="All pages">
              <div class="navbar__mega-header">
                <span class="navbar__mega-title">All Pages</span>
                <button class="navbar__icon-btn" id="mega-close-btn" aria-label="Close menu" style="width:28px;height:28px;font-size:0.8rem;">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div class="navbar__mega-grid">
                ${megaItems}
              </div>
            </div>
          </div>

          <!-- Hamburger — mobile only -->
          <button class="navbar__hamburger" id="navbar-hamburger" aria-label="Open menu" aria-expanded="false">
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
          </button>

        </div>
      </div>
    `;

    _bindEvents();
    _observeScroll();
    _setActiveLinks();
  };

  // ── Event Binding ──────────────────────────────────────────────────────────

  const _bindEvents = () => {
    // Hamburger → open drawer
    document.getElementById('navbar-hamburger')?.addEventListener('click', openDrawer);
    document.getElementById('navbar-overlay')?.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);

    // Mega menu toggle
    document.getElementById('navbar-mega-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMega();
    });
    document.getElementById('mega-close-btn')?.addEventListener('click', closeMega);

    // Close mega on outside click
    document.addEventListener('click', (e) => {
      if (_megaOpen && !e.target.closest('.navbar__mega-wrap')) closeMega();
    });

    // Escape closes everything
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeDrawer(); closeMega(); }
    });

    // Theme toggles
    const toggleTheme = () => window.ThemeManager?.toggle();
    document.getElementById('navbar-theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('drawer-theme-toggle')?.addEventListener('click', toggleTheme);

    // Auth button
    document.getElementById('navbar-auth-btn')?.addEventListener('click', () => {
      if (window._currentUser) {
        window.Router?.go('/profile');
      } else {
        window.Router?.go('/login');
      }
    });

    // Search placeholder
    document.getElementById('navbar-search-btn')?.addEventListener('click', () => {
      window.GlobalSearch?.open?.();
    });

    // Close drawer when a drawer link is clicked
    document.querySelectorAll('.navbar__drawer-link, .navbar__drawer-logo').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close mega when mega item clicked
    document.querySelectorAll('.navbar__mega-item').forEach(link => {
      link.addEventListener('click', closeMega);
    });
  };

  // ── Scroll: Glass Morphism Effect ─────────────────────────────────────────

  const _observeScroll = () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const update = () => {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle('navbar--scrolled', scrolled);
      nav.classList.toggle('navbar--top', !scrolled);
    };

    update(); // run immediately
    window.addEventListener('scroll', update, { passive: true });
  };

  // ── Active Link Highlighting ───────────────────────────────────────────────

  const _setActiveLinks = () => {
    const path = window.location.pathname;
    document.querySelectorAll('[data-nav-link]').forEach(el => {
      const href = el.getAttribute('data-nav-link') || el.getAttribute('href');
      const isActive = href === path
        || (path !== '/' && href !== '/' && path.startsWith(href));
      el.classList.toggle('nav-link--active', isActive);
    });
  };

  // ── Drawer ─────────────────────────────────────────────────────────────────

  const openDrawer = () => {
    _drawerOpen = true;
    document.getElementById('navbar-drawer')?.classList.add('is-open');
    document.getElementById('navbar-overlay')?.classList.add('is-open');
    document.getElementById('navbar-hamburger')?.classList.add('is-open');
    document.getElementById('navbar-hamburger')?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    _drawerOpen = false;
    document.getElementById('navbar-drawer')?.classList.remove('is-open');
    document.getElementById('navbar-overlay')?.classList.remove('is-open');
    document.getElementById('navbar-hamburger')?.classList.remove('is-open');
    document.getElementById('navbar-hamburger')?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // ── Mega Menu ──────────────────────────────────────────────────────────────

  const toggleMega = () => _megaOpen ? closeMega() : openMega();

  const openMega = () => {
    _megaOpen = true;
    document.getElementById('navbar-mega')?.classList.add('is-open');
  };

  const closeMega = () => {
    _megaOpen = false;
    document.getElementById('navbar-mega')?.classList.remove('is-open');
  };

  // ── Theme Toggle Update (called by ThemeManager) ───────────────────────────

  const updateThemeUI = (theme) => {
    const isDark = theme === 'dark';
    const icon   = isDark ? 'fa-moon' : 'fa-sun';

    // Update all theme toggle thumbs
    document.querySelectorAll('.theme-toggle__thumb i').forEach(el => {
      el.className = `fa-solid ${icon}`;
    });

    // Update drawer label
    const labelEl = document.querySelector('.navbar__drawer-theme-label');
    if (labelEl) {
      labelEl.innerHTML = `<i class="fa-solid ${icon}"></i> ${isDark ? 'Dark Mode' : 'Light Mode'}`;
    }
  };

  // ── Auth UI Update (called from app.js) ───────────────────────────────────

  const updateAuthUI = (user) => {
    window._currentUser = user || null;
    const authBtn = document.getElementById('navbar-auth-btn');
    if (!authBtn) return;

    if (user) {
      if (user.photoURL) {
        authBtn.innerHTML = `<img src="${user.photoURL}" alt="Avatar" class="navbar__avatar">`;
      } else {
        authBtn.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size:1.3rem;color:var(--accent-primary)"></i>`;
      }
      // Update drawer auth section
      const drawerAuth = document.getElementById('drawer-auth');
      if (drawerAuth) {
        drawerAuth.innerHTML = `
          <a href="/profile" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--signup">
            <i class="fa-solid fa-user"></i> My Profile
          </a>
          <a href="/logout" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--login">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </a>
        `;
      }
    } else {
      authBtn.innerHTML = `<i class="fa-regular fa-user"></i>`;
    }
  };

  // ── Public Init ────────────────────────────────────────────────────────────

  const init = () => {
    render();
    // Listen for route changes to update active links
    window.addEventListener('popstate', _setActiveLinks);
  };

  return { init, updateAuthUI, updateThemeUI, openDrawer, closeDrawer, setActiveLinks: _setActiveLinks };

})();

window.Navbar = Navbar;
