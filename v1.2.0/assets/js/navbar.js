// =============================================================================
// NAVBAR — Basic component for v1.2.0 (full implementation in v1.3.0)
// =============================================================================

const Navbar = (() => {

  const render = () => {
    const cfg = window.SITE_CONFIG;
    const nav = document.getElementById('navbar');
    if (!nav) return;

    // Only show desktop items marked showDesktop
    const desktopLinks = (cfg.navItems || [])
      .filter(item => item.showDesktop)
      .map(item => `
        <a href="${item.path}" class="navbar__link" data-nav-link>
          <i class="fa-solid ${item.icon}"></i>${item.label}
        </a>
      `).join('');

    nav.innerHTML = `
      <div class="navbar__inner">
        <a href="/" class="navbar__logo">
          <i class="fa-solid fa-code"></i>
          ${cfg.owner.displayName.split(' ')[0]}<span>.</span>
        </a>

        <nav class="navbar__nav" aria-label="Main navigation">
          ${desktopLinks}
        </nav>

        <div class="navbar__actions">
          <button class="navbar__icon-btn" id="theme-toggle" aria-label="Toggle dark/light mode" title="Toggle theme">
            <i class="fa-solid fa-moon" data-theme-icon></i>
          </button>
          <button class="navbar__icon-btn" aria-label="Search" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <div id="navbar-auth" class="navbar__icon-btn" aria-label="Account">
            <i class="fa-regular fa-user"></i>
          </div>
        </div>
      </div>
    `;

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      window.ThemeManager?.toggle();
    });
  };

  const updateAuthUI = (user) => {
    const authEl = document.getElementById('navbar-auth');
    if (!authEl) return;
    if (user) {
      authEl.innerHTML = user.photoURL
        ? `<img src="${user.photoURL}" alt="Avatar" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">`
        : `<i class="fa-solid fa-circle-user"></i>`;
      authEl.style.cursor = 'pointer';
      authEl.onclick = () => Router.go('/profile');
    } else {
      authEl.innerHTML = `<i class="fa-regular fa-user"></i>`;
      authEl.onclick = () => Router.go('/login');
    }
  };

  const init = () => {
    render();
  };

  return { init, updateAuthUI };
})();

window.Navbar = Navbar;
