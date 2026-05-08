// =============================================================================
// NAVBAR — v1.4.6
// · Main #navbar: absolute (scrolls with page, always transparent over hero)
// · Floating #navbar-float: fixed pill, slides in after hero 50% scrolled
// · Creative @mdturzo999 logo · Tooltips · Improved active state
// =============================================================================

const Navbar = (() => {

  let _cfg = null;
  let _drawerOpen = false;
  let _megaOpen   = false;
  let _floatVisible = false;
  let _scrollRAF    = null;

  // ── Logo HTML ──────────────────────────────────────────────────────────────
  const logoHTML = (cls = 'navbar__logo') => `
    <a href="/" class="${cls}" data-nav-link="/" aria-label="Home — Muhtasim Rahman">
      <img
        src="/assets/images/favicon/android-chrome-192x192.png"
        alt="Muhtasim"
        class="navbar__logo-img"
        width="26" height="26"
        loading="eager"
      />
      <span class="navbar__logo-handle">
        <span class="navbar__logo-at">@ </span><span class="navbar__logo-name">mdturzo999</span>
      </span>
    </a>`;

  // ── Build inner HTML (shared by both main + float navbars) ────────────────
  const buildInnerHTML = (wrapClass = 'navbar__inner') => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const themeIcon = isDark ? 'fa-moon' : 'fa-sun';

    const desktopLinks = (_cfg.navItems || [])
      .filter(i => i.showDesktop)
      .map(i => `
        <a href="${i.path}" class="navbar__link" data-nav-link="${i.path}"
           data-tooltip="${i.label}">
          <i class="fa-solid ${i.icon}" aria-hidden="true"></i>${i.label}
        </a>`).join('');

    return `
      <div class="${wrapClass}">
        ${logoHTML()}
        <nav class="navbar__nav" aria-label="Main navigation">${desktopLinks}</nav>
        <div class="navbar__actions">
          <button class="navbar__icon-btn navbar__icon-btn--search" id="${wrapClass}-search"
                  aria-label="Search" data-tooltip="Search" type="button">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
          <button class="theme-toggle navbar__icon-btn--theme" id="${wrapClass}-theme"
                  aria-label="Toggle theme" data-tooltip="Toggle theme" type="button">
            <div class="theme-toggle__track">
              <div class="theme-toggle__thumb">
                <i class="fa-solid ${themeIcon}" aria-hidden="true"></i>
              </div>
            </div>
          </button>
          <button class="navbar__icon-btn navbar__icon-btn--auth" id="${wrapClass}-auth"
                  aria-label="Account" data-tooltip="Account" type="button">
            <i class="fa-regular fa-user" aria-hidden="true"></i>
          </button>
          <div class="navbar__mega-wrap">
            <button class="navbar__icon-btn" id="${wrapClass}-mega"
                    aria-label="All pages" data-tooltip="All pages" type="button">
              <i class="fa-solid fa-border-all" aria-hidden="true"></i>
            </button>
          </div>
          <button class="theme-toggle navbar__mobile-theme" id="${wrapClass}-mob-theme"
                  aria-label="Toggle theme" type="button">
            <div class="theme-toggle__track">
              <div class="theme-toggle__thumb">
                <i class="fa-solid ${themeIcon}" aria-hidden="true"></i>
              </div>
            </div>
          </button>
          <button class="navbar__hamburger" id="${wrapClass}-hamburger"
                  aria-label="Open menu" aria-expanded="false" type="button">
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
            <span class="navbar__hamburger-line"></span>
          </button>
        </div>
      </div>
    `;
  };

  // ── Mega menu HTML ─────────────────────────────────────────────────────────
  const buildMegaHTML = () => {
    const megaItems = (_cfg.navItems || []).map(i => `
      <a href="${i.path}" class="navbar__mega-item" data-nav-link="${i.path}">
        <span class="navbar__mega-item-icon"><i class="fa-solid ${i.icon}" aria-hidden="true"></i></span>
        ${i.label}
      </a>`).join('');
    return `
      <div class="navbar__mega" id="navbar-mega" role="dialog" aria-label="All pages">
        <div class="navbar__mega-header">
          <span class="navbar__mega-title">All Pages</span>
          <button class="navbar__icon-btn" id="mega-close-btn" aria-label="Close"
                  style="width:28px;height:28px;font-size:0.78rem;" type="button">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="navbar__mega-grid">${megaItems}</div>
      </div>`;
  };

  // ── Drawer HTML ────────────────────────────────────────────────────────────
  const buildDrawerHTML = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const themeIcon = isDark ? 'fa-moon' : 'fa-sun';
    const drawerLogo = `
      <a href="/" class="navbar__drawer-logo" data-nav-link="/">
        <img src="/assets/images/favicon/android-chrome-192x192.png"
             alt="" width="20" height="20" style="border-radius:5px;flex-shrink:0;border:1px solid var(--border-color);" />
        <span class="navbar__logo-at" style="color:var(--accent-primary);">@ </span><span class="navbar__logo-name" style="color:var(--text-primary);">mdturzo999</span>
      </a>`;
    const drawerLinks = (_cfg.navItems || []).map(i => `
      <a href="${i.path}" class="navbar__drawer-link" data-nav-link="${i.path}">
        <span class="navbar__drawer-link-icon"><i class="fa-solid ${i.icon}" aria-hidden="true"></i></span>
        ${i.label}
      </a>`).join('');

    return `
      <aside class="navbar__drawer" id="navbar-drawer" role="navigation" aria-label="Mobile navigation">
        <div class="navbar__drawer-header">
          ${drawerLogo}
          <button class="navbar__drawer-close" id="drawer-close" aria-label="Close menu" type="button">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="navbar__drawer-body">
          <span class="navbar__drawer-section-label">Navigation</span>
          ${drawerLinks}
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
              <i class="fa-solid ${themeIcon}" aria-hidden="true"></i>
              ${isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button class="theme-toggle" id="drawer-theme-toggle" aria-label="Toggle theme" type="button">
              <div class="theme-toggle__track">
                <div class="theme-toggle__thumb">
                  <i class="fa-solid ${themeIcon}" aria-hidden="true"></i>
                </div>
              </div>
            </button>
          </div>
          <div class="navbar__drawer-auth">
            <a href="/login"  class="navbar__drawer-auth-btn navbar__drawer-auth-btn--login">
              <i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i> Login
            </a>
            <a href="/signup" class="navbar__drawer-auth-btn navbar__drawer-auth-btn--signup">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Sign Up
            </a>
          </div>
        </div>
      </aside>`;
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const render = () => {
    _cfg = window.SITE_CONFIG;
    const nav = document.getElementById('navbar');
    if (!nav) return;

    // Main navbar (absolute, scrolls with page)
    nav.innerHTML = `
      <div class="navbar__overlay" id="navbar-overlay" role="presentation"></div>
      ${buildMegaHTML()}
      ${buildDrawerHTML()}
      ${buildInnerHTML('navbar__inner')}
    `;

    // Floating pill navbar (fixed, separate element)
    let floatEl = document.getElementById('navbar-float');
    if (!floatEl) {
      floatEl = document.createElement('div');
      floatEl.id = 'navbar-float';
      floatEl.className = 'navbar-float';
      floatEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(floatEl);
    }
    floatEl.innerHTML = buildInnerHTML('navbar-float__inner');

    _bindEvents();
    _initFloatScroll();
    _setActiveLinks();
  };

  // ── Float scroll system ────────────────────────────────────────────────────
  // Main navbar (absolute) scrolls away naturally.
  // Float pill appears when scrollY > heroHeight * 0.5
  const _initFloatScroll = () => {
    const floatEl = document.getElementById('navbar-float');
    if (!floatEl) return;

    const getThreshold = () => {
      const hero = document.getElementById('hero');
      return hero ? hero.offsetHeight * 0.5 : window.innerHeight * 0.5;
    };

    const update = () => {
      const past = window.scrollY > getThreshold();
      if (past === _floatVisible) return;
      _floatVisible = past;
      if (past) {
        floatEl.classList.add('is-visible');
        floatEl.removeAttribute('aria-hidden');
      } else {
        floatEl.classList.remove('is-visible');
        floatEl.setAttribute('aria-hidden', 'true');
      }
    };

    window.addEventListener('scroll', () => {
      if (_scrollRAF) cancelAnimationFrame(_scrollRAF);
      _scrollRAF = requestAnimationFrame(update);
    }, { passive: true });

    update();
  };

  // ── Events ─────────────────────────────────────────────────────────────────
  const _bindEvents = () => {
    // Hamburger
    document.getElementById('navbar__inner-hamburger')?.addEventListener('click', openDrawer);
    document.getElementById('navbar-float__inner-hamburger')?.addEventListener('click', openDrawer);
    document.getElementById('navbar-overlay')?.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);

    // Mega menu (only main navbar has it)
    document.getElementById('navbar__inner-mega')?.addEventListener('click', e => { e.stopPropagation(); toggleMega(); });
    document.getElementById('navbar-float__inner-mega')?.addEventListener('click', e => { e.stopPropagation(); toggleMega(); });
    document.getElementById('mega-close-btn')?.addEventListener('click', closeMega);
    document.addEventListener('click', e => {
      if (_megaOpen && !e.target.closest('.navbar__mega-wrap') && !e.target.closest('#navbar-mega')) closeMega();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeDrawer(); closeMega(); }
    });

    // Theme toggles
    const toggleTheme = () => window.ThemeManager?.toggle();
    ['navbar__inner-theme','navbar__inner-mob-theme',
     'navbar-float__inner-theme','navbar-float__inner-mob-theme',
     'drawer-theme-toggle'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', toggleTheme);
    });

    // Auth
    const goAuth = () => window._currentUser ? window.Router?.go('/profile') : window.Router?.go('/login');
    document.getElementById('navbar__inner-auth')?.addEventListener('click', goAuth);
    document.getElementById('navbar-float__inner-auth')?.addEventListener('click', goAuth);

    // Search
    const openSearch = () => window.GlobalSearch?.open?.();
    document.getElementById('navbar__inner-search')?.addEventListener('click', openSearch);
    document.getElementById('navbar-float__inner-search')?.addEventListener('click', openSearch);

    // Drawer link close
    document.querySelectorAll('.navbar__drawer-link, .navbar__drawer-logo').forEach(l => l.addEventListener('click', closeDrawer));
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
    document.getElementById('navbar__inner-hamburger')?.classList.add('is-open');
    document.getElementById('navbar__inner-hamburger')?.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    _drawerOpen = false;
    document.getElementById('navbar-drawer')?.classList.remove('is-open');
    document.getElementById('navbar-overlay')?.classList.remove('is-open');
    document.getElementById('navbar__inner-hamburger')?.classList.remove('is-open');
    document.getElementById('navbar__inner-hamburger')?.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  };

  const toggleMega = () => _megaOpen ? closeMega() : openMega();
  const openMega   = () => { _megaOpen = true;  document.getElementById('navbar-mega')?.classList.add('is-open'); };
  const closeMega  = () => { _megaOpen = false; document.getElementById('navbar-mega')?.classList.remove('is-open'); };

  const updateThemeUI = (theme) => {
    const isDark = theme === 'dark';
    const icon   = isDark ? 'fa-moon' : 'fa-sun';
    document.querySelectorAll('.theme-toggle__thumb i').forEach(el => { el.className = `fa-solid ${icon}`; });
    const lbl = document.getElementById('drawer-theme-label');
    if (lbl) lbl.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i> ${isDark ? 'Dark Mode' : 'Light Mode'}`;
  };

  const updateAuthUI = (user) => {
    window._currentUser = user || null;
    ['navbar__inner-auth','navbar-float__inner-auth'].forEach(id => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.innerHTML = user?.photoURL
        ? `<img src="${user.photoURL}" alt="Avatar" class="navbar__avatar">`
        : `<i class="fa-regular fa-user" aria-hidden="true"></i>`;
    });
  };

  const init = () => {
    render();
    window.addEventListener('popstate', _setActiveLinks);
  };

  return { init, updateAuthUI, updateThemeUI, openDrawer, closeDrawer, setActiveLinks: _setActiveLinks };
})();

window.Navbar = Navbar;
