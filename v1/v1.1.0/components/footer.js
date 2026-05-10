// ================================================
// components/footer.js — Shared Footer
// ================================================

const SOCIAL_LINKS = [
  { href: 'https://github.com/muhtasim-rahman',  icon: 'ri-github-fill',    label: 'GitHub'    },
  { href: 'https://linkedin.com/in/mdturzo999',  icon: 'ri-linkedin-fill',  label: 'LinkedIn'  },
  { href: 'https://youtube.com/@mdturzo999',     icon: 'ri-youtube-fill',   label: 'YouTube'   },
  { href: 'https://facebook.com/mdturzo999',     icon: 'ri-facebook-fill',  label: 'Facebook'  },
  { href: 'https://instagram.com/mdturzo999',    icon: 'ri-instagram-line', label: 'Instagram' },
  { href: 'https://twitter.com/mdturzo999',      icon: 'ri-twitter-x-line', label: 'Twitter'   },
  { href: 'https://t.me/mdturzo16',              icon: 'ri-telegram-fill',  label: 'Telegram'  },
];

function buildFooter() {
  const year = new Date().getFullYear();
  const socHTML = SOCIAL_LINKS.map(s =>
    `<a href="${s.href}" class="footer-soc" target="_blank" rel="noopener noreferrer" title="${s.label}" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
  ).join('');

  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <a href="/" class="nav-logo" data-nav-link data-href="/" style="display:inline-flex">
              <div class="nav-logo-mark">MT</div>
              <span class="nav-logo-name">md<span class="hi">turzo</span></span>
            </a>
            <p class="footer-brand-desc">
              Student developer &amp; designer from Bangladesh.
              Building clean, modern, Firebase-powered web experiences.
              Halal &amp; ethical work, always.
            </p>
            <div class="footer-socs">${socHTML}</div>
          </div>

          <!-- Navigation -->
          <div>
            <p class="footer-col-title">Navigation</p>
            <div class="footer-col-links">
              <a href="/" data-nav-link data-href="/">Home</a>
              <a href="/about" data-nav-link data-href="/about">About</a>
              <a href="/projects" data-nav-link data-href="/projects">Projects</a>
              <a href="/skills" data-nav-link data-href="/skills">Skills</a>
              <a href="/services" data-nav-link data-href="/services">Services</a>
              <a href="/contact" data-nav-link data-href="/contact">Contact</a>
            </div>
          </div>

          <!-- Projects -->
          <div>
            <p class="footer-col-title">Projects</p>
            <div class="footer-col-links">
              <a href="https://muhtasim-rahman.github.io/UFMT-SSC26/" target="_blank" rel="noopener">FMT Tracker Pro</a>
              <a href="https://muhtasim-rahman.github.io/notification-panel/" target="_blank" rel="noopener">Notification Panel</a>
              <a href="https://muhtasim-rahman.github.io/halal" target="_blank" rel="noopener">Halal App</a>
              <a href="https://muhtasim-rahman.github.io/turzo-express" target="_blank" rel="noopener">Turzo Express</a>
              <a href="https://github.com/muhtasim-rahman" target="_blank" rel="noopener">All on GitHub →</a>
            </div>
          </div>

          <!-- Contact -->
          <div>
            <p class="footer-col-title">Contact</p>
            <div class="footer-col-links">
              <a href="mailto:mdturzo.dev@gmail.com">mdturzo.dev@gmail.com</a>
              <a href="https://mdturzo.odoo.com" target="_blank" rel="noopener">Old Portfolio</a>
              <a href="https://github.com/muhtasim-rahman" target="_blank" rel="noopener">GitHub Profile</a>
              <a href="https://linkedin.com/in/mdturzo999" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://t.me/mdturzo16" target="_blank" rel="noopener">Telegram</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${year} Muhtasim Rahman (Turzo). All rights reserved.</p>
          <p>Made with <span class="footer-heart">❤️</span> in Bangladesh · v1.0.1</p>
        </div>
      </div>
    </footer>
  `;
}

export function mountFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;
  root.innerHTML = buildFooter();
}
