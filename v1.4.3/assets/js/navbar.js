// =============================================================================
// NAVBAR — v1.4.3
// Minimal floating pill, favicon photo in logo, mobile theme toggle
// =============================================================================

const Navbar = (() => {

  let _cfg = null;
  let _drawerOpen = false;
  let _megaOpen = false;

  const render = () => {
    _cfg = window.SITE_CONFIG;
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const desktopLinks = (_cfg.navItems || [])
      .filter(i => i.showDesktop)
      .map(i => `
        <a href="${i.path}" class="navbar__link" data-nav-link="${i.path}">
          <i class="fa-solid ${i.icon}" aria-hidden="true"></i>${i.label}
        </a>
      `).join('');

    const megaItems = (_cfg.navItems || []).map(i => `
      <a href="${i.path}" class="navbar__mega-item" data-nav-link="${i.path}">
        <span class="navbar__mega-item-icon"><i class="fa-solid ${i.icon}" aria-hidden="true"></i></span>
        ${i.label}
      </a>
    `).join('');

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    nav.innerHTML = `
      <div class="navbar__overlay" id="navbar-overlay" role="presentation"></div>

      <aside class="navbar__drawer" id="navbar-drawer" role="navigation" aria-label="Mobile navigation">
        <div class="navbar__drawer-header">
          <a href="/" class="navbar__drawer-logo" data-nav-link="/">
            <img src="/assets/images/favicon/android-chrome-192x192.png"
                 alt="" width="22" height="22"
                 style="border-radius:6px;flex-shrink:0;" />
            ${_cfg.owner.displayName.split(' ')[0]}<span>.</span>
          </a>
          <button class="navbar__drawer-close" id="drawer-close" aria-label="Close menu">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div class="navbar__drawer-body">
          <span class="navbar__drawer-section-label">Navigation</span>
          ${(_cfg.navItems || []).map(i => `
            <a href="${i.path}" class="navbar__drawer-link" data-nav-link="${i.path}">
              <span class="navbar__drawer-link-icon"><i class="fa-solid ${i.icon}" aria-hidden="true"></i></span>
              ${i.label}
            </a>
          `).join('')}
          <div class="navbar__drawer-divider"></div>
          <span class="navbar__drawer-section-label">Account</span>
          <a href="/profile" class="navbar__drawer-link" data-nav-link="/profile">
            <span class="navbar__drawer-link-icon"><i class="fa-regular fa-user" aria-hidden="true"></i></span>
            My Profile
          </a>
          <a href="/login" class="navbar__drawer-link" data-nav-link="/login">
            <span class="navbar__drawer-link-icon"><i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i></span>
            Login
          </a>
        </div>

        <div class="navbar__drawer-footer">
          <div class="navbar__drawer-theme">
            <span class="navbar__drawer-theme-label" id="drawer-theme-label">
              <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}" aria-hidden="true"></i>
              ${isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button class="theme-toggle" id="drawer-theme-toggle" aria-label="Toggle theme">
              <div class="theme-toggle__track">
                <div class="theme-toggle__thumb">
                  <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}" aria-hidden="true"></i>
                </div>
              </div>
            </button>
          </div>
          <div class="navbar__drawer-auth" id="drawer-auth">
            <a href="/login"  class="navbar__drawer-auth-btn navbar__drawer-auth-btn--login">
              <i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i> Login
            </a>
            <a href="/signup" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--signup">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Sign Up
            </a>
          </div>
        </div>
      </aside>

      <!-- Main navbar -->
      <div class="navbar__inner">

        <a href="/" class="navbar__logo" data-nav-link="/">
          <img
            src="/assets/images/favicon/android-chrome-192x192.png"
            alt="${_cfg.owner.displayName} avatar"
            class="navbar__logo-img"
            width="28" height="28"
            loading="eager"
          />
          ${_cfg.owner.displayName.split(' ')[0]}<span>.</span>
        </a>

        <nav class="navbar__nav" aria-label="Main navigation">
          ${desktopLinks}
        </nav>

        <div class="navbar__actions">

          <!-- Desktop: search -->
          <button class="navbar__icon-btn navbar__icon-btn--search" id="navbar-search-btn"
                  aria-label="Search" title="Search">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>

          <!-- Desktop: theme toggle -->
          <button class="theme-toggle navbar__icon-btn--theme" id="navbar-theme-toggle"
                  aria-label="Toggle theme" title="Toggle theme">
            <div class="theme-toggle__track">
              <div class="theme-toggle__thumb">
                <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}" aria-hidden="true"></i>
              </div>
            </div>
          </button>

          <!-- Desktop: auth -->
          <button class="navbar__icon-btn navbar__icon-btn--auth" id="navbar-auth-btn"
                  aria-label="Account" title="Account">
            <i class="fa-regular fa-user" aria-hidden="true"></i>
          </button>

          <!-- Desktop: mega menu -->
          <div class="navbar__mega-wrap">
            <button class="navbar__icon-btn" id="navbar-mega-btn" aria-label="All pages" title="All pages">
              <i class="fa-solid fa-border-all" aria-hidden="true"></i>
            </button>
            <div class="navbar__mega" id="navbar-mega" role="dialog" aria-label="All pages">
              <div class="navbar__mega-header">
                <span class="navbar__mega-title">All Pages</span>
                <button class="navbar__icon-btn" id="mega-close-btn" aria-label="Close"
                        style="width:28px;height:28px;font-size:0.8rem;">
                  <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>
              <div class="navbar__mega-grid">${megaItems}</div>
            </div>
          </div>

          <!-- Mobile: theme toggle -->
          <button class="theme-toggle navbar__mobile-theme" id="navbar-mobile-theme"
                  aria-label="Toggle theme">
            <div class="theme-toggle__track">
              <div class="theme-toggle__thumb">
                <i class="fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}" aria-hidden="true"></i>
              </div>
            </div>
          </button>

          <!-- Hamburger -->
          <button class="navbar__hamburger" id="navbar-hamburger"
                  aria-label="Open menu" aria-expanded="false">
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

  const _bindEvents = () => {
    document.getElementById('navbar-hamburger')?.addEventListener('click', openDrawer);
    document.getElementById('navbar-overlay')?.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);

    document.getElementById('navbar-mega-btn')?.addEventListener('click', (e) => { e.stopPropagation(); toggleMega(); });
    document.getElementById('mega-close-btn')?.addEventListener('click', closeMega);
    document.addEventListener('click', (e) => { if (_megaOpen && !e.target.closest('.navbar__mega-wrap')) closeMega(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDrawer(); closeMega(); } });

    const toggleTheme = () => window.ThemeManager?.toggle();
    document.getElementById('navbar-theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('drawer-theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('navbar-mobile-theme')?.addEventListener('click', toggleTheme);

    document.getElementById('navbar-auth-btn')?.addEventListener('click', () => {
      if (window._currentUser) window.Router?.go('/profile');
      else window.Router?.go('/login');
    });
    document.getElementById('navbar-search-btn')?.addEventListener('click', () => window.GlobalSearch?.open?.());

    document.querySelectorAll('.navbar__drawer-link, .navbar__drawer-logo').forEach(l => l.addEventListener('click', closeDrawer));
    document.querySelectorAll('.navbar__mega-item').forEach(l => l.addEventListener('click', closeMega));
  };

  const _observeScroll = () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const update = () => {
      const scrolled = window.scrollY > 40;
      nav.classList.toggle('navbar--scrolled', scrolled);
      nav.classList.toggle('navbar--top',      !scrolled);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  };

  const _setActiveLinks = () => {
    const path = window.location.pathname;
    document.querySelectorAll('[data-nav-link]').forEach(el => {
      const href = el.getAttribute('data-nav-link') || el.getAttribute('href');
      const isActive = href === path || (path !== '/' && href !== '/' && path.startsWith(href));
      el.classList.toggle('nav-link--active', isActive);
    });
  };

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

  const toggleMega = () => _megaOpen ? closeMega() : openMega();
  const openMega  = () => { _megaOpen = true;  document.getElementById('navbar-mega')?.classList.add('is-open'); };
  const closeMega = () => { _megaOpen = false; document.getElementById('navbar-mega')?.classList.remove('is-open'); };

  const updateThemeUI = (theme) => {
    const isDark = theme === 'dark';
    const icon   = isDark ? 'fa-moon' : 'fa-sun';
    document.querySelectorAll('.theme-toggle__thumb i').forEach(el => { el.className = `fa-solid ${icon}`; });
    const lbl = document.getElementById('drawer-theme-label');
    if (lbl) lbl.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i> ${isDark ? 'Dark Mode' : 'Light Mode'}`;
  };

  const updateAuthUI = (user) => {
    window._currentUser = user || null;
    const btn = document.getElementById('navbar-auth-btn');
    if (!btn) return;
    if (user) {
      btn.innerHTML = user.photoURL
        ? `<img src="${user.photoURL}" alt="Avatar" class="navbar__avatar">`
        : `<i class="fa-solid fa-circle-user" style="font-size:1.3rem;color:var(--accent-primary)" aria-hidden="true"></i>`;
      const da = document.getElementById('drawer-auth');
      if (da) da.innerHTML = `
        <a href="/profile" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--signup">
          <i class="fa-solid fa-user" aria-hidden="true"></i> My Profile
        </a>
        <a href="/logout" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--login">
          <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Logout
        </a>`;
    } else {
      btn.innerHTML = `<i class="fa-regular fa-user" aria-hidden="true"></i>`;
    }
  };

  const init = () => {
    render();
    window.addEventListener('popstate', _setActiveLinks);
  };

  return { init, updateAuthUI, updateThemeUI, openDrawer, closeDrawer, setActiveLinks: _setActiveLinks };
})();

window.Navbar = Navbar;
