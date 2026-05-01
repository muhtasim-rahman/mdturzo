// =============================================================================
// HOME / HERO — JS — mdturzo.web.app v1.4.1
// Renders hero section HTML and initialises all animations.
// =============================================================================

window.HeroSection = (() => {
  const cfg   = window.SITE_CONFIG;
  const owner = cfg.owner;
  const soc   = cfg.social;

  const ROLES = [
    'Web Developer',
    'Graphic Designer',
    'Video Editor',
    'Student & Creator',
  ];

  // ── Build HTML ───────────────────────────────────────────────────────────────
  const getHTML = () => `
    <section class="hero" id="hero" aria-label="Introduction">

      <!-- Background decorations -->
      <div class="hero__bg-grid"   aria-hidden="true"></div>
      <div class="hero__bg-glow"   aria-hidden="true"></div>

      <div class="container">
        <div class="hero__inner">

          <!-- ── Left: Content ──────────────────────────────── -->
          <div class="hero__content">

            <!-- Available tag -->
            <div class="hero__tag hero-animate" style="--delay:0ms">
              <span class="hero__tag-dot" aria-hidden="true"></span>
              Available for opportunities
            </div>

            <!-- Name -->
            <h1 class="hero__name hero-animate" style="--delay:120ms">
              Muhtasim<br>
              <span class="hero__name-accent">Rahman</span>
            </h1>

            <!-- Typing role -->
            <div class="hero__role-wrap hero-animate" style="--delay:240ms" aria-label="Role">
              <span class="hero__role-pre">I&thinsp;am&thinsp;a&thinsp;</span>
              <span class="hero__role-typed" id="hero-typed-text" aria-live="polite"></span>
              <span class="hero__cursor" aria-hidden="true">|</span>
            </div>

            <!-- Bio -->
            <p class="hero__bio hero-animate" style="--delay:360ms">
              A passionate web developer from Bangladesh, building clean and user-friendly digital experiences.
              Self-taught, goal-driven, and always growing.
            </p>

            <!-- Social links -->
            <div class="hero__socials hero-animate" style="--delay:480ms" aria-label="Social links">
              <a href="${soc.github}"    target="_blank" rel="noopener noreferrer" class="hero__social-link" title="GitHub"   aria-label="GitHub">
                <i class="fa-brands fa-github"      aria-hidden="true"></i>
              </a>
              <a href="${soc.linkedin}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" title="LinkedIn" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
              </a>
              <a href="${soc.facebook}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" title="Facebook" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"  aria-hidden="true"></i>
              </a>
              <a href="${soc.instagram}" target="_blank" rel="noopener noreferrer" class="hero__social-link" title="Instagram" aria-label="Instagram">
                <i class="fa-brands fa-instagram"   aria-hidden="true"></i>
              </a>
              <a href="${soc.youtube}"   target="_blank" rel="noopener noreferrer" class="hero__social-link" title="YouTube"  aria-label="YouTube">
                <i class="fa-brands fa-youtube"     aria-hidden="true"></i>
              </a>
              <a href="${soc.telegram}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" title="Telegram" aria-label="Telegram">
                <i class="fa-brands fa-telegram"    aria-hidden="true"></i>
              </a>
            </div>

            <!-- CTA buttons -->
            <div class="hero__cta hero-animate" style="--delay:600ms">
              <a href="/contact" class="btn btn--primary btn--lg">
                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                Hire Me
              </a>
              <a href="#" class="btn btn--outline btn--lg" id="hero-cv-btn" title="Download my CV">
                <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
                Download CV
              </a>
            </div>

            <!-- Stats -->
            <div class="hero__stats hero-animate" style="--delay:720ms" aria-label="Experience stats">
              <div class="hero__stat">
                <div class="hero__stat-num">
                  <span class="hero__stat-val" data-count="3">0</span>
                  <span class="hero__stat-plus">+</span>
                </div>
                <span class="hero__stat-lbl">Years Web Dev</span>
              </div>
              <div class="hero__stat-divider" aria-hidden="true"></div>
              <div class="hero__stat">
                <div class="hero__stat-num">
                  <span class="hero__stat-val" data-count="6">0</span>
                  <span class="hero__stat-plus">+</span>
                </div>
                <span class="hero__stat-lbl">Years Design</span>
              </div>
              <div class="hero__stat-divider" aria-hidden="true"></div>
              <div class="hero__stat">
                <div class="hero__stat-num">
                  <span class="hero__stat-val" data-count="16">0</span>
                  <span class="hero__stat-plus">+</span>
                </div>
                <span class="hero__stat-lbl">Projects Built</span>
              </div>
            </div>

          </div><!-- /.hero__content -->

          <!-- ── Right: Visual ───────────────────────────────── -->
          <div class="hero__visual hero-animate-visual" style="--delay:100ms" aria-hidden="true">
            <div class="hero__photo-ring hero__photo-ring--outer"></div>
            <div class="hero__photo-ring hero__photo-ring--inner"></div>

            <div class="hero__photo-wrap">
              <img
                src="/assets/images/hero.webp"
                alt="Muhtasim Rahman — Web Developer and Designer from Bangladesh"
                class="hero__photo"
                loading="eager"
                width="300"
                height="360"
              />
            </div>

            <!-- Floating badge -->
            <div class="hero__float-badge">
              <span class="hero__float-badge-dot"></span>
              <i class="fa-solid fa-laptop-code" aria-hidden="true"></i>
              <span>Open to Work</span>
            </div>

            <!-- Decorative accent -->
            <div class="hero__deco-square">
              <i class="fa-solid fa-code" aria-hidden="true"></i>
            </div>
          </div><!-- /.hero__visual -->

        </div><!-- /.hero__inner -->
      </div><!-- /.container -->

      <!-- Scroll hint -->
      <div class="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>

    </section>
  `;

  // ── Typing Animation ─────────────────────────────────────────────────────────
  const initTyping = () => {
    const el = document.getElementById('hero-typed-text');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting  = false;

    const tick = () => {
      const current = ROLES[roleIndex];

      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 80);
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting   = false;
          roleIndex  = (roleIndex + 1) % ROLES.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 42);
      }
    };

    setTimeout(tick, 900); // start after entry animations
  };

  // ── Animated Counters ────────────────────────────────────────────────────────
  const initCounters = () => {
    const els = document.querySelectorAll('.hero__stat-val[data-count]');
    els.forEach(el => {
      Utils.onVisible(el, () => {
        const target = parseInt(el.dataset.count, 10);
        Utils.animateCounter(el, target, 1200);
      });
    });
  };

  // ── CV Download ──────────────────────────────────────────────────────────────
  const initCVBtn = () => {
    const btn = document.getElementById('hero-cv-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Utils.showToast('CV download will be available soon.', 'info');
    });
  };

  // ── Init ─────────────────────────────────────────────────────────────────────
  const init = () => {
    if (!document.getElementById('hero')) return;
    initTyping();
    initCounters();
    initCVBtn();
  };

  return { getHTML, init };
})();
