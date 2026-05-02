// =============================================================================
// HERO — v1.4.2 — Minimal, compact, animated, fully responsive
// =============================================================================

window.HeroSection = (() => {
  const cfg   = window.SITE_CONFIG;
  const owner = cfg.owner;
  const soc   = cfg.social;

  const ROLES = [
    'Web Developer',
    'UI/UX Designer',
    'Graphic Designer',
    'Video Editor',
  ];

  // Skill icons floating around photo
  const SKILL_ICONS = [
    { icon: 'fa-brands fa-html5',  cls: 'html',   size: 'lg', pos: 'tl', dur: '3.8s', delay: '0s',    label: 'HTML5'  },
    { icon: 'fa-brands fa-css3-alt', cls: 'css',  size: 'md', pos: 'tr', dur: '4.2s', delay: '0.5s',  label: 'CSS3'   },
    { icon: 'fa-brands fa-js',     cls: 'js',     size: 'sm', pos: 'br', dur: '3.5s', delay: '1s',    label: 'JS'     },
    { icon: 'fa-brands fa-python', cls: 'python', size: 'md', pos: 'bl', dur: '4.5s', delay: '0.8s',  label: 'Python' },
    { icon: 'fa-solid fa-pen-nib', cls: 'design', size: 'sm', pos: 'ml', dur: '3.2s', delay: '0.3s',  label: 'Design' },
  ];

  const buildSkillIcon = (sk) => `
    <span
      class="hero__skill-icon hero__skill-icon--${sk.size} hero__skill-icon--${sk.cls} hero__skill-icon--pos-${sk.pos}"
      style="--float-dur:${sk.dur};--float-delay:${sk.delay};"
      aria-label="${sk.label}"
      title="${sk.label}"
    >
      <i class="${sk.icon}" aria-hidden="true"></i>
    </span>
  `;

  const getHTML = () => `
    <section class="hero" id="hero" aria-label="Introduction">

      <!-- Backgrounds -->
      <div class="hero__dots"         aria-hidden="true"></div>
      <div class="hero__glow hero__glow--left"  aria-hidden="true"></div>
      <div class="hero__glow hero__glow--right" aria-hidden="true"></div>

      <div class="container">
        <div class="hero__inner">

          <!-- ── Content (left) ──────────────────────────────────────── -->
          <div class="hero__content">

            <!-- Greeting -->
            <div class="hero__greeting hero-fade" style="--delay:50ms">
              <span class="hero__greeting-line" aria-hidden="true"></span>
              Hello, I&thinsp;am
            </div>

            <!-- Name (line-by-line slide-up) -->
            <h1 class="hero__name" aria-label="Muhtasim Rahman">
              <span class="hero__name-line">
                <span class="hero__name-inner" style="--delay:120ms">Muhtasim</span>
              </span>
              <span class="hero__name-line">
                <span class="hero__name-inner hero__name-accent" style="--delay:220ms">Rahman.</span>
              </span>
            </h1>

            <!-- Typing role -->
            <div class="hero__role hero-fade" style="--delay:380ms" aria-label="Current role">
              <span id="hero-typed" class="hero__role-typed" aria-live="polite"></span>
              <span class="hero__cursor" aria-hidden="true">|</span>
            </div>

            <!-- Bio -->
            <p class="hero__bio hero-fade" style="--delay:480ms">
              Self-taught developer from Bangladesh — building clean,
              fast and meaningful digital experiences with care.
            </p>

            <!-- CTA -->
            <div class="hero__cta hero-fade" style="--delay:580ms">
              <a href="/contact" class="btn btn--primary">
                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                Hire Me
              </a>
              <a href="#" class="btn btn--outline" id="hero-cv-btn">
                <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
                Download CV
              </a>
            </div>

            <!-- Socials -->
            <div class="hero__social-strip hero-fade" style="--delay:680ms" aria-label="Social links">
              <a href="${soc.github}"    target="_blank" rel="noopener noreferrer" class="hero__social-link" title="GitHub"    aria-label="GitHub">   <i class="fa-brands fa-github"       aria-hidden="true"></i></a>
              <a href="${soc.linkedin}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" title="LinkedIn"  aria-label="LinkedIn">  <i class="fa-brands fa-linkedin-in"  aria-hidden="true"></i></a>
              <a href="${soc.facebook}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" title="Facebook"  aria-label="Facebook">  <i class="fa-brands fa-facebook-f"   aria-hidden="true"></i></a>
              <a href="${soc.instagram}" target="_blank" rel="noopener noreferrer" class="hero__social-link" title="Instagram" aria-label="Instagram"> <i class="fa-brands fa-instagram"    aria-hidden="true"></i></a>
              <a href="${soc.youtube}"   target="_blank" rel="noopener noreferrer" class="hero__social-link" title="YouTube"   aria-label="YouTube">   <i class="fa-brands fa-youtube"      aria-hidden="true"></i></a>
              <a href="${soc.telegram}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" title="Telegram"  aria-label="Telegram">  <i class="fa-brands fa-telegram"     aria-hidden="true"></i></a>
            </div>

            <!-- Stats -->
            <div class="hero__stats hero-fade" style="--delay:760ms" aria-label="Experience stats">
              <div class="hero__stat">
                <div class="hero__stat-num">
                  <span class="hero__stat-val" data-count="3">3</span>
                  <span class="hero__stat-plus">+</span>
                </div>
                <span class="hero__stat-lbl">Yrs Dev</span>
              </div>
              <div class="hero__stat-sep" aria-hidden="true"></div>
              <div class="hero__stat">
                <div class="hero__stat-num">
                  <span class="hero__stat-val" data-count="6">6</span>
                  <span class="hero__stat-plus">+</span>
                </div>
                <span class="hero__stat-lbl">Yrs Design</span>
              </div>
              <div class="hero__stat-sep" aria-hidden="true"></div>
              <div class="hero__stat">
                <div class="hero__stat-num">
                  <span class="hero__stat-val" data-count="16">16</span>
                  <span class="hero__stat-plus">+</span>
                </div>
                <span class="hero__stat-lbl">Projects</span>
              </div>
            </div>

          </div><!-- /.hero__content -->

          <!-- ── Visual (right) ──────────────────────────────────────── -->
          <div class="hero__visual" aria-hidden="true">

            <!-- Deco ring -->
            <div class="hero__photo-deco"></div>

            <!-- Photo -->
            <div class="hero__photo-frame">
              <img
                src="/assets/images/muhtasim/photo-01.webp"
                alt="Muhtasim Rahman — Developer & Designer"
                class="hero__photo"
                loading="eager"
                width="300"
                height="400"
              />
            </div>

            <!-- Floating skill icons -->
            ${SKILL_ICONS.map(buildSkillIcon).join('')}

          </div><!-- /.hero__visual -->

        </div><!-- /.hero__inner -->
      </div>

      <!-- Scroll hint -->
      <div class="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>

    </section>
  `;

  // ── Typing ────────────────────────────────────────────────────────────────
  const initTyping = () => {
    const el = document.getElementById('hero-typed');
    if (!el) return;
    let ri = 0, ci = 0, del = false;

    const tick = () => {
      const cur = ROLES[ri];
      if (!del) {
        el.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { del = true; return setTimeout(tick, 2000); }
        setTimeout(tick, 75);
      } else {
        el.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; ri = (ri + 1) % ROLES.length; return setTimeout(tick, 300); }
        setTimeout(tick, 38);
      }
    };
    setTimeout(tick, 1000);
  };

  // ── Counter animation ─────────────────────────────────────────────────────
  const initCounters = () => {
    document.querySelectorAll('.hero__stat-val[data-count]').forEach(el => {
      const target = +el.dataset.count;
      Utils.onVisible(el, () => Utils.animateCounter(el, target, 1000));
    });
  };

  // ── CV button ─────────────────────────────────────────────────────────────
  const initCV = () => {
    document.getElementById('hero-cv-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      Utils.showToast('CV download coming soon!', 'info');
    });
  };

  const init = () => {
    if (!document.getElementById('hero')) return;
    initTyping();
    initCounters();
    initCV();
  };

  return { getHTML, init };
})();
