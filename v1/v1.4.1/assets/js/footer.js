// =============================================================================
// FOOTER — Full Implementation v1.3.0
// Multi-column layout, social links, scroll-to-top, auto info from site-config
// =============================================================================

const Footer = (() => {

  const render = () => {
    const cfg = window.SITE_CONFIG;
    const el  = document.getElementById('footer');
    if (!el) return;

    // All nav links for "Explore" column
    const mainNav = (cfg.navItems || []).map(link =>
      `<a href="${link.path}" class="footer__link" data-nav-link="${link.path}">
        <i class="fa-solid fa-chevron-right"></i>${link.label}
       </a>`
    ).join('');

    // Legal / extra links
    const legalLinks = [
      { label: 'Privacy Policy',  path: '/privacy-policy' },
      { label: 'Cookies Policy',  path: '/cookies-policy' },
    ].map(link =>
      `<a href="${link.path}" class="footer__link" data-nav-link="${link.path}">
        <i class="fa-solid fa-chevron-right"></i>${link.label}
       </a>`
    ).join('');

    // Social icons (all 9 platforms, Font Awesome brands)
    const socials = [
      { key: 'github',    icon: 'fa-brands fa-github',    label: 'GitHub'    },
      { key: 'linkedin',  icon: 'fa-brands fa-linkedin-in',label: 'LinkedIn'  },
      { key: 'facebook',  icon: 'fa-brands fa-facebook-f', label: 'Facebook'  },
      { key: 'instagram', icon: 'fa-brands fa-instagram',  label: 'Instagram' },
      { key: 'youtube',   icon: 'fa-brands fa-youtube',    label: 'YouTube'   },
      { key: 'twitter',   icon: 'fa-brands fa-x-twitter',  label: 'X'         },
      { key: 'tiktok',    icon: 'fa-brands fa-tiktok',     label: 'TikTok'    },
      { key: 'telegram',  icon: 'fa-brands fa-telegram',   label: 'Telegram'  },
      { key: 'threads',   icon: 'fa-brands fa-threads',    label: 'Threads'   },
    ].map(({ key, icon, label }) =>
      `<a href="${cfg.social[key]}" target="_blank" rel="noopener noreferrer"
          class="footer__social-link" aria-label="${label}" title="${label}">
         <i class="${icon}"></i>
       </a>`
    ).join('');

    el.innerHTML = `
      <div class="footer__top">
        <div class="container">
          <div class="footer__grid">

            <!-- Brand Column -->
            <div class="footer__brand">
              <a href="/" class="footer__logo" data-nav-link="/">
                <span class="footer__logo-icon"><i class="fa-solid fa-code"></i></span>
                ${cfg.owner.displayName.split(' ')[0]}<span>.</span>
              </a>
              <p class="footer__desc">
                ${cfg.seo.defaultDescription}
              </p>
              <div class="footer__social" aria-label="Social media links">
                ${socials}
              </div>
            </div>

            <!-- Explore Column -->
            <div class="footer__col">
              <h4 class="footer__col-title">Explore</h4>
              <div class="footer__links">
                ${mainNav}
              </div>
            </div>

            <!-- Legal Column -->
            <div class="footer__col">
              <h4 class="footer__col-title">Legal</h4>
              <div class="footer__links">
                ${legalLinks}
              </div>
            </div>

            <!-- Contact Column -->
            <div class="footer__col">
              <h4 class="footer__col-title">Contact</h4>
              <div class="footer__links">
                <a href="mailto:${cfg.owner.email}"
                   class="footer__contact-item">
                  <span class="footer__contact-item-icon">
                    <i class="fa-solid fa-envelope"></i>
                  </span>
                  ${cfg.owner.email}
                </a>
                <a href="${cfg.social.github}" target="_blank" rel="noopener noreferrer"
                   class="footer__link">
                  <i class="fa-brands fa-github"></i>
                  github.com/muhtasim-rahman
                </a>
                <a href="${cfg.social.linkedin}" target="_blank" rel="noopener noreferrer"
                   class="footer__link">
                  <i class="fa-brands fa-linkedin-in"></i>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="container">
        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; ${cfg.currentYear}
            <a href="/">${cfg.owner.displayName}</a>.
            All rights reserved.
          </p>
          <div class="footer__bottom-right">
            <span class="footer__version">${cfg.version}</span>
            <button class="footer__scroll-top" id="scroll-top-btn"
                    aria-label="Scroll to top" title="Back to top">
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Scroll-to-top button
    document.getElementById('scroll-top-btn')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const init = () => { render(); };

  return { init };

})();

window.Footer = Footer;
