// =============================================================================
// NAVBAR — v1.4.6
// Inline (scrolls with hero) + separate floating clone fixed navbar
// =============================================================================

const Navbar = (() => {
  let _cfg = null;
  let _drawerOpen = false;
  let _megaOpen   = false;
  let _floatVisible = false;
  let _floatEl      = null;
  let _raf          = null;

  // ── Logo HTML ──────────────────────────────────────────────────────────
  const _logoHTML = (isDrawer = false) => `
    <a href="/" class="${isDrawer ? 'navbar__drawer-logo' : 'navbar__logo'}" data-nav-link="/" aria-label="Home — mdturzo999">
      <img src="/assets/images/favicon/android-chrome-192x192.png"
           alt="Muhtasim Rahman" width="${isDrawer ? 20 : 26}" height="${isDrawer ? 20 : 26}"
           style="border-radius:${isDrawer ? 5 : 6}px;flex-shrink:0;border:1.5px solid rgba(148,163,184,.25);" />
      <span class="navbar__logo-handle">
        <span class="navbar__logo-at">@</span>&thinsp;<span class="navbar__logo-name">mdturzo999</span>
      </span>
    </a>`;

  const _navLinksHTML = (items) => (items || [])
    .filter(i => i.showDesktop)
    .map(i => `<a href="${i.path}" class="navbar__link" data-nav-link="${i.path}" title="${i.label}">
      <i class="fa-solid ${i.icon}" aria-hidden="true"></i>${i.label}
    </a>`).join('');

  const _drawerLinksHTML = (items) => (items || []).map(i => `
    <a href="${i.path}" class="navbar__drawer-link" data-nav-link="${i.path}">
      <span class="navbar__drawer-link-icon"><i class="fa-solid ${i.icon}" aria-hidden="true"></i></span>
      ${i.label}
    </a>`).join('');

  const _megaItemsHTML = (items) => (items || []).map(i => `
    <a href="${i.path}" class="navbar__mega-item" data-nav-link="${i.path}">
      <span class="navbar__mega-item-icon"><i class="fa-solid ${i.icon}" aria-hidden="true"></i></span>
      ${i.label}
    </a>`).join('');

  const _actionsHTML = (isDark) => {
    const icon = isDark ? 'fa-moon' : 'fa-sun';
    const toggleHTML = `
      <button class="theme-toggle" id="__TOGGLE_ID__" aria-label="Toggle dark/light mode" title="Toggle theme">
        <div class="theme-toggle__track">
          <div class="theme-toggle__thumb">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>
          </div>
        </div>
      </button>`;
    return toggleHTML;
  };

  // ── Render inline navbar ────────────────────────────────────────────────
  const render = () => {
    _cfg = window.SITE_CONFIG;
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon   = isDark ? 'fa-moon' : 'fa-sun';

    nav.innerHTML = `
      <div class="navbar__overlay" id="navbar-overlay"></div>

      <aside class="navbar__drawer" id="navbar-drawer" role="navigation" aria-label="Mobile navigation">
        <div class="navbar__drawer-header">
          ${_logoHTML(true)}
          <button class="navbar__drawer-close" id="drawer-close" aria-label="Close menu" title="Close">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="navbar__drawer-body">
          <span class="navbar__drawer-section-label">Navigation</span>
          ${_drawerLinksHTML(_cfg.navItems)}
          <div class="navbar__drawer-divider"></div>
          <span class="navbar__drawer-section-label">Account</span>
          <a href="/profile" class="navbar__drawer-link" data-nav-link="/profile">
            <span class="navbar__drawer-link-icon"><i class="fa-regular fa-user" aria-hidden="true"></i></span>My Profile
          </a>
          <a href="/login" class="navbar__drawer-link" data-nav-link="/login">
            <span class="navbar__drawer-link-icon"><i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i></span>Login
          </a>
        </div>
        <div class="navbar__drawer-footer">
          <div class="navbar__drawer-theme">
            <span class="navbar__drawer-theme-label" id="drawer-theme-label">
              <i class="fa-solid ${icon}" aria-hidden="true"></i> ${isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button class="theme-toggle" id="drawer-theme-toggle" aria-label="Toggle theme">
              <div class="theme-toggle__track"><div class="theme-toggle__thumb"><i class="fa-solid ${icon}" aria-hidden="true"></i></div></div>
            </button>
          </div>
          <div class="navbar__drawer-auth" id="drawer-auth">
            <a href="/login"  class="navbar__drawer-auth-btn navbar__drawer-auth-btn--login"><i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i> Login</a>
            <a href="/signup" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--signup"><i class="fa-solid fa-user-plus" aria-hidden="true"></i> Sign Up</a>
          </div>
        </div>
      </aside>

      <div class="navbar__inner">
        ${_logoHTML()}
        <nav class="navbar__nav" aria-label="Main navigation">${_navLinksHTML(_cfg.navItems)}</nav>
        <div class="navbar__actions">
          <button class="navbar__icon-btn navbar__icon-btn--search" id="navbar-search-btn" aria-label="Search" title="Search"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
          <button class="theme-toggle navbar__icon-btn--theme" id="navbar-theme-toggle" aria-label="Toggle theme" title="Toggle dark/light mode">
            <div class="theme-toggle__track"><div class="theme-toggle__thumb"><i class="fa-solid ${icon}" aria-hidden="true"></i></div></div>
          </button>
          <button class="navbar__icon-btn navbar__icon-btn--auth" id="navbar-auth-btn" aria-label="Account" title="My Account"><i class="fa-regular fa-user" aria-hidden="true"></i></button>
          <div class="navbar__mega-wrap">
            <button class="navbar__icon-btn" id="navbar-mega-btn" aria-label="All pages" title="All pages"><i class="fa-solid fa-border-all" aria-hidden="true"></i></button>
            <div class="navbar__mega" id="navbar-mega">
              <div class="navbar__mega-header">
                <span class="navbar__mega-title">All Pages</span>
                <button class="navbar__icon-btn" id="mega-close-btn" style="width:28px;height:28px;font-size:.78rem;" aria-label="Close" title="Close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
              </div>
              <div class="navbar__mega-grid">${_megaItemsHTML(_cfg.navItems)}</div>
            </div>
          </div>
          <button class="theme-toggle navbar__mobile-theme" id="navbar-mobile-theme" aria-label="Toggle theme" title="Toggle theme">
            <div class="theme-toggle__track"><div class="theme-toggle__thumb"><i class="fa-solid ${icon}" aria-hidden="true"></i></div></div>
          </button>
          <button class="navbar__hamburger" id="navbar-hamburger" aria-label="Open menu" aria-expanded="false" title="Menu">
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
          </button>
        </div>
      </div>`;

    _bindEvents();
    _initFloatNavbar();
    _setActiveLinks();
  };

  // ── Floating navbar ─────────────────────────────────────────────────────
  const _initFloatNavbar = () => {
    // Create the fixed floating navbar element
    _floatEl = document.createElement('div');
    _floatEl.id = 'navbar-float';
    _floatEl.setAttribute('aria-hidden', 'true');

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon   = isDark ? 'fa-moon' : 'fa-sun';

    _floatEl.innerHTML = `
      <div class="navbar__float-inner">
        ${_logoHTML()}
        <nav class="navbar__nav" aria-label="Floating navigation">${_navLinksHTML(_cfg?.navItems)}</nav>
        <div class="navbar__actions">
          <button class="navbar__icon-btn navbar__icon-btn--search" aria-label="Search" title="Search" onclick="document.getElementById('navbar-search-btn')?.click()"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
          <button class="theme-toggle navbar__icon-btn--theme" id="float-theme-toggle" aria-label="Toggle theme" title="Toggle theme">
            <div class="theme-toggle__track"><div class="theme-toggle__thumb"><i class="fa-solid ${icon}" aria-hidden="true"></i></div></div>
          </button>
          <button class="navbar__icon-btn" id="float-auth-btn" aria-label="Account" title="My Account"><i class="fa-regular fa-user" aria-hidden="true"></i></button>
          <button class="theme-toggle navbar__mobile-theme" id="float-mobile-theme" aria-label="Toggle theme" title="Toggle theme">
            <div class="theme-toggle__track"><div class="theme-toggle__thumb"><i class="fa-solid ${icon}" aria-hidden="true"></i></div></div>
          </button>
          <button class="navbar__hamburger" id="float-hamburger" aria-label="Open menu" title="Menu">
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
          </button>
        </div>
      </div>`;

    document.body.appendChild(_floatEl);

    // Wire float buttons
    document.getElementById('float-theme-toggle')?.addEventListener('click', () => window.ThemeManager?.toggle());
    document.getElementById('float-mobile-theme')?.addEventListener('click', () => window.ThemeManager?.toggle());
    document.getElementById('float-hamburger')?.addEventListener('click', openDrawer);
    document.getElementById('float-auth-btn')?.addEventListener('click', () => {
      if (window._currentUser) window.Router?.go('/profile');
      else window.Router?.go('/login');
    });

    // Intercept float nav links via router
    _floatEl.querySelectorAll('[data-nav-link]').forEach(el => {
      el.addEventListener('click', e => {
        const href = el.getAttribute('href') || el.dataset.navLink;
        if (href && !href.startsWith('http')) { e.preventDefault(); window.Router?.go(href); }
      });
    });

    // Scroll observer
    let raf = null;
    const getThreshold = () => {
      const hero = document.getElementById('hero');
      return hero ? hero.offsetHeight * 0.5 : window.innerHeight * 0.5;
    };

    const update = () => {
      const past = window.scrollY > getThreshold();
      if (past && !_floatVisible) {
        _floatVisible = true;
        _floatEl.setAttribute('aria-hidden', 'false');
        _floatEl.classList.remove('nav-float--hidden');
        _floatEl.classList.add('nav-float--visible');
      } else if (!past && _floatVisible) {
        _floatVisible = false;
        _floatEl.setAttribute('aria-hidden', 'true');
        _floatEl.classList.remove('nav-float--visible');
        _floatEl.classList.add('nav-float--hidden');
      }
    };

    window.addEventListener('scroll', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  };

  const _bindEvents = () => {
    document.getElementById('navbar-hamburger')?.addEventListener('click', openDrawer);
    document.getElementById('navbar-overlay')?.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);

    document.getElementById('navbar-mega-btn')?.addEventListener('click', e => { e.stopPropagation(); toggleMega(); });
    document.getElementById('mega-close-btn')?.addEventListener('click', closeMega);
    document.addEventListener('click', e => { if (_megaOpen && !e.target.closest('.navbar__mega-wrap')) closeMega(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeMega(); } });

    const tt = () => window.ThemeManager?.toggle();
    document.getElementById('navbar-theme-toggle')?.addEventListener('click', tt);
    document.getElementById('drawer-theme-toggle')?.addEventListener('click', tt);
    document.getElementById('navbar-mobile-theme')?.addEventListener('click', tt);
    document.getElementById('navbar-auth-btn')?.addEventListener('click', () => {
      if (window._currentUser) window.Router?.go('/profile');
      else window.Router?.go('/login');
    });
    document.getElementById('navbar-search-btn')?.addEventListener('click', () => window.GlobalSearch?.open?.());
    document.querySelectorAll('.navbar__drawer-link,.navbar__drawer-logo').forEach(l => l.addEventListener('click', closeDrawer));
    document.querySelectorAll('.navbar__mega-item').forEach(l => l.addEventListener('click', closeMega));
  };

  const _setActiveLinks = () => {
    const path = window.location.pathname;
    document.querySelectorAll('[data-nav-link]').forEach(el => {
      const href = el.getAttribute('data-nav-link') || el.getAttribute('href');
      const active = href === path || (path !== '/' && href !== '/' && path.startsWith(href));
      el.classList.toggle('nav-link--active', active);
    });
  };

  const openDrawer = () => {
    _drawerOpen = true;
    document.getElementById('navbar-drawer')?.classList.add('is-open');
    document.getElementById('navbar-overlay')?.classList.add('is-open');
    document.getElementById('navbar-hamburger')?.classList.add('is-open');
    document.getElementById('navbar-hamburger')?.setAttribute('aria-expanded','true');
    document.getElementById('float-hamburger')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    _drawerOpen = false;
    document.getElementById('navbar-drawer')?.classList.remove('is-open');
    document.getElementById('navbar-overlay')?.classList.remove('is-open');
    document.getElementById('navbar-hamburger')?.classList.remove('is-open');
    document.getElementById('navbar-hamburger')?.setAttribute('aria-expanded','false');
    document.getElementById('float-hamburger')?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const toggleMega = () => _megaOpen ? closeMega() : openMega();
  const openMega  = () => { _megaOpen=true;  document.getElementById('navbar-mega')?.classList.add('is-open'); };
  const closeMega = () => { _megaOpen=false; document.getElementById('navbar-mega')?.classList.remove('is-open'); };

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
    if (btn) btn.innerHTML = user?.photoURL
      ? `<img src="${user.photoURL}" alt="Avatar" class="navbar__avatar">`
      : `<i class="fa-regular fa-user" aria-hidden="true"></i>`;
  };

  const init = () => {
    render();
    window.addEventListener('popstate', _setActiveLinks);
  };

  return { init, updateAuthUI, updateThemeUI, openDrawer, closeDrawer, setActiveLinks: _setActiveLinks };
})();

window.Navbar = Navbar;
