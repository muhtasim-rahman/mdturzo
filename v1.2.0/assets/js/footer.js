// =============================================================================
// FOOTER — Basic component for v1.2.0 (full implementation in v1.3.0)
// =============================================================================

const Footer = (() => {

  const render = () => {
    const cfg = window.SITE_CONFIG;
    const el  = document.getElementById('footer');
    if (!el) return;

    const navLinks = (cfg.footerLinks || []).slice(0, 4)
      .map(link => `<a href="${link.path}" class="footer__link">${link.label}</a>`)
      .join('');

    const extraLinks = (cfg.footerLinks || []).slice(4)
      .map(link => `<a href="${link.path}" class="footer__link">${link.label}</a>`)
      .join('');

    const socialLinks = [
      { key: 'github',    icon: 'fa-brands fa-github',    label: 'GitHub'    },
      { key: 'linkedin',  icon: 'fa-brands fa-linkedin',  label: 'LinkedIn'  },
      { key: 'facebook',  icon: 'fa-brands fa-facebook-f',label: 'Facebook'  },
      { key: 'instagram', icon: 'fa-brands fa-instagram',  label: 'Instagram' },
      { key: 'youtube',   icon: 'fa-brands fa-youtube',    label: 'YouTube'   },
      { key: 'twitter',   icon: 'fa-brands fa-x-twitter',  label: 'X'         },
      { key: 'tiktok',    icon: 'fa-brands fa-tiktok',     label: 'TikTok'    },
      { key: 'telegram',  icon: 'fa-brands fa-telegram',   label: 'Telegram'  },
      { key: 'threads',   icon: 'fa-brands fa-threads',    label: 'Threads'   },
    ].map(({ key, icon, label }) => `
      <a href="${cfg.social[key]}" target="_blank" rel="noopener noreferrer"
         class="footer__social-link" aria-label="${label}" title="${label}">
        <i class="${icon}"></i>
      </a>
    `).join('');

    el.innerHTML = `
      <div class="container">
        <div class="footer__grid">

          <div class="footer__brand">
            <a href="/" class="footer__logo">
              ${cfg.owner.displayName.split(' ')[0]}<span>.</span>
            </a>
            <p class="footer__desc">
              ${cfg.seo.defaultDescription}
            </p>
            <div class="footer__social" aria-label="Social media links">
              ${socialLinks}
            </div>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">Explore</h4>
            <div class="footer__links">${navLinks}</div>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">More</h4>
            <div class="footer__links">
              ${extraLinks}
              <a href="mailto:${cfg.owner.email}" class="footer__link">
                <i class="fa-solid fa-envelope"></i>${cfg.owner.email}
              </a>
            </div>
          </div>

        </div>

        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; ${cfg.currentYear} ${cfg.owner.displayName}. All rights reserved.
          </p>
          <span class="footer__version">${cfg.version}</span>
          <button class="footer__scroll-top" aria-label="Scroll to top" title="Back to top"
                  onclick="window.scrollTo({top:0,behavior:'smooth'})">
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    `;
  };

  const init = () => { render(); };

  return { init };
})();

window.Footer = Footer;
