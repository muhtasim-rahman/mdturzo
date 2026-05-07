// =============================================================================
// FOOTER — v1.4.2 — Cleaner, fully responsive
// =============================================================================

const Footer = (() => {

  const render = () => {
    const cfg = window.SITE_CONFIG;
    const el  = document.getElementById('footer');
    if (!el) return;

    const mainNav = (cfg.navItems || []).map(link =>
      `<a href="${link.path}" class="footer__link" data-nav-link="${link.path}">
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>${link.label}
       </a>`
    ).join('');

    const legalLinks = [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Cookies Policy', path: '/cookies-policy' },
      { label: 'Contact',        path: '/contact' },
    ].map(link =>
      `<a href="${link.path}" class="footer__link" data-nav-link="${link.path}">
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>${link.label}
       </a>`
    ).join('');

    const socials = [
      { key: 'github',    icon: 'fa-brands fa-github',     label: 'GitHub'    },
      { key: 'linkedin',  icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn'  },
      { key: 'facebook',  icon: 'fa-brands fa-facebook-f',  label: 'Facebook'  },
      { key: 'instagram', icon: 'fa-brands fa-instagram',   label: 'Instagram' },
      { key: 'youtube',   icon: 'fa-brands fa-youtube',     label: 'YouTube'   },
      { key: 'twitter',   icon: 'fa-brands fa-x-twitter',   label: 'X'         },
      { key: 'tiktok',    icon: 'fa-brands fa-tiktok',      label: 'TikTok'    },
      { key: 'telegram',  icon: 'fa-brands fa-telegram',    label: 'Telegram'  },
      { key: 'threads',   icon: 'fa-brands fa-threads',     label: 'Threads'   },
    ].map(({ key, icon, label }) =>
      `<a href="${cfg.social[key]}" target="_blank" rel="noopener noreferrer"
          class="footer__social-link" aria-label="${label}" title="${label}">
         <i class="${icon}" aria-hidden="true"></i>
       </a>`
    ).join('');

    const year = new Date().getFullYear();

    el.innerHTML = `
      <div class="footer__main">
        <div class="container">
          <div class="footer__grid">

            <!-- Brand -->
            <div class="footer__brand">
              <a href="/" class="footer__logo" data-nav-link="/">
                <span class="footer__logo-icon"><i class="fa-solid fa-code" aria-hidden="true"></i></span>
                ${cfg.owner.displayName.split(' ')[0]}<span>.</span>
              </a>
              <p class="footer__desc">
                Web developer &amp; designer from Bangladesh, building clean and
                user-friendly digital experiences.
              </p>
              <div class="footer__social" aria-label="Social media links">
                ${socials}
              </div>
            </div>

            <!-- Explore -->
            <div class="footer__col">
              <h4 class="footer__col-title">Explore</h4>
              <div class="footer__links">${mainNav}</div>
            </div>

            <!-- Info -->
            <div class="footer__col">
              <h4 class="footer__col-title">Info</h4>
              <div class="footer__links">
                ${legalLinks}
                <a href="mailto:${cfg.owner.email}" class="footer__link">
                  <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                  Email me
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="container">
          <div class="footer__bottom-inner">
            <p class="footer__copy">
              &copy; ${year} <a href="/">${cfg.owner.displayName}</a>. All rights reserved.
            </p>
            <div class="footer__bottom-right">
              <span class="footer__version">${cfg.version}</span>
              <button class="footer__scroll-top" id="scroll-top-btn"
                      aria-label="Scroll to top" title="Back to top">
                <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('scroll-top-btn')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const init = () => { render(); };
  return { init };
})();

window.Footer = Footer;
