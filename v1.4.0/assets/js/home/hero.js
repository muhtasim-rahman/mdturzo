// =============================================================================
// HOME / HERO — Full Implementation v1.4.0
// Typing animation, stats counter, scroll indicator, image rotation
// =============================================================================

const HeroSection = (() => {

  // Typing effect words
  const TYPED_WORDS = [
    'Web Developer',
    'UI/UX Designer',
    'Student',
    'Problem Solver',
    'Creator',
  ];

  let typingInterval = null;

  // ── Typing Effect ──────────────────────────────────────────────────────────

  const initTyping = (el) => {
    if (!el) return;

    let wordIndex = 0;
    let charIndex  = 0;
    let isDeleting = false;
    const TYPE_SPEED   = 80;
    const DELETE_SPEED = 45;
    const PAUSE_MS     = 1800;

    const tick = () => {
      const word    = TYPED_WORDS[wordIndex];
      const current = word.slice(0, charIndex);
      el.textContent = current;

      if (!isDeleting && charIndex < word.length) {
        charIndex++;
        typingInterval = setTimeout(tick, TYPE_SPEED);
      } else if (!isDeleting && charIndex === word.length) {
        typingInterval = setTimeout(() => { isDeleting = true; tick(); }, PAUSE_MS);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        typingInterval = setTimeout(tick, DELETE_SPEED);
      } else {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % TYPED_WORDS.length;
        typingInterval = setTimeout(tick, 300);
      }
    };

    tick();
  };

  // ── Animated Counter ──────────────────────────────────────────────────────

  const animateCounter = (el, target, suffix = '') => {
    const duration = 1800;
    const start    = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value    = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const initCounters = () => {
    const stats = [
      { selector: '.hero__stat--webdev  .hero__stat-value', target: 3, suffix: '+' },
      { selector: '.hero__stat--design  .hero__stat-value', target: 6, suffix: '+' },
      { selector: '.hero__stat--projects .hero__stat-value', target: 15, suffix: '+' },
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        stats.forEach(({ selector, target, suffix }) => {
          const el = document.querySelector(selector);
          if (el && !el.dataset.counted) {
            el.dataset.counted = '1';
            // Replace inner — the number sits inside a <span>, keep the suffix label
            const numEl = el.querySelector('span') || el;
            animateCounter(numEl, target, suffix);
          }
        });
        observer.disconnect();
      });
    }, { threshold: 0.4 });

    const heroStats = document.querySelector('.hero__stats');
    if (heroStats) observer.observe(heroStats);
  };

  // ── Scroll to next section ────────────────────────────────────────────────

  const initScrollHint = () => {
    const btn = document.querySelector('.hero__scroll');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = document.querySelector('.hero')?.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  };

  // ── Build HTML ────────────────────────────────────────────────────────────

  const render = () => {
    const cfg  = window.SITE_CONFIG;
    const owner = cfg.owner;

    const age = owner.age;
    const imgSrc = '/assets/images/muhtasim/photo-01.webp';

    return `
      <section class="hero" id="hero">

        <!-- Animated Background -->
        <div class="hero__bg" aria-hidden="true">
          <div class="hero__orb hero__orb--1"></div>
          <div class="hero__orb hero__orb--2"></div>
          <div class="hero__orb hero__orb--3"></div>
          <div class="hero__shapes">
            <div class="hero__shape hero__shape--circle"></div>
            <div class="hero__shape hero__shape--dot"></div>
            <div class="hero__shape hero__shape--square"></div>
            <div class="hero__shape hero__shape--dot"></div>
            <div class="hero__shape hero__shape--circle"></div>
            <div class="hero__shape hero__shape--dot"></div>
            <div class="hero__shape hero__shape--square"></div>
            <div class="hero__shape hero__shape--dot"></div>
          </div>
        </div>

        <div class="hero__container">

          <!-- ── Left: Content ── -->
          <div class="hero__content">

            <span class="hero__badge">
              <span class="hero__badge-dot"></span>
              Available for Projects
            </span>

            <p class="hero__greeting">
              <i class="fa-solid fa-hand-wave"></i>&nbsp; Hello, I am
            </p>

            <h1 class="hero__name">
              <span class="hero__name-highlight">${owner.displayName}</span>
            </h1>

            <div class="hero__title-row">
              <span class="hero__title-static">I am a</span>
              <span class="hero__title-typed" id="hero-typed"></span>
              <span class="hero__cursor" aria-hidden="true"></span>
            </div>

            <p class="hero__tagline">
              A passionate web developer and designer from ${owner.location}.
              Building user-friendly, visually stunning websites that transform
              complex ideas into simple, elegant solutions.
            </p>

            <div class="hero__actions">
              <a href="/projects" class="btn btn--primary">
                <i class="fa-solid fa-code"></i>
                View Projects
              </a>
              <a href="#" class="btn btn--outline" id="hero-cv-btn">
                <i class="fa-solid fa-download"></i>
                Download CV
              </a>
            </div>

            <div class="hero__stats">
              <div class="hero__stat hero__stat--webdev">
                <div class="hero__stat-value"><span>3</span>+</div>
                <div class="hero__stat-label">Years Web Dev</div>
              </div>
              <div class="hero__stat-divider" aria-hidden="true"></div>
              <div class="hero__stat hero__stat--design">
                <div class="hero__stat-value"><span>6</span>+</div>
                <div class="hero__stat-label">Years Design</div>
              </div>
              <div class="hero__stat-divider" aria-hidden="true"></div>
              <div class="hero__stat hero__stat--projects">
                <div class="hero__stat-value"><span>15</span>+</div>
                <div class="hero__stat-label">Projects Built</div>
              </div>
            </div>

            <div class="hero__social">
              <span class="hero__social-label">Follow me</span>
              <a href="${cfg.social.github}" target="_blank" rel="noopener" class="hero__social-link" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="${cfg.social.linkedin}" target="_blank" rel="noopener" class="hero__social-link" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="${cfg.social.facebook}" target="_blank" rel="noopener" class="hero__social-link" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="${cfg.social.youtube}" target="_blank" rel="noopener" class="hero__social-link" aria-label="YouTube">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>

          </div>

          <!-- ── Right: Visual ── -->
          <div class="hero__visual">

            <div class="hero__img-wrapper">
              <div class="hero__img-glow"  aria-hidden="true"></div>
              <div class="hero__img-ring"  aria-hidden="true"></div>
              <img
                src="${imgSrc}"
                alt="Muhtasim Rahman — Web Developer"
                class="hero__img"
                loading="eager"
                fetchpriority="high"
              />
              <div class="hero__img-overlay" aria-hidden="true"></div>
            </div>

            <!-- Floating info badges -->
            <div class="hero__float-badge hero__float-badge--left">
              <div class="hero__float-icon"><i class="fa-solid fa-code"></i></div>
              <div class="hero__float-info">
                <span class="hero__float-val">3+ Years</span>
                <span class="hero__float-lbl">Web Dev</span>
              </div>
            </div>

            <div class="hero__float-badge hero__float-badge--right">
              <div class="hero__float-icon"><i class="fa-solid fa-palette"></i></div>
              <div class="hero__float-info">
                <span class="hero__float-val">${age} yrs old</span>
                <span class="hero__float-lbl">Developer</span>
              </div>
            </div>

          </div>

        </div><!-- /.hero__container -->

        <!-- Scroll hint -->
        <button class="hero__scroll" aria-label="Scroll to next section">
          <span>Scroll</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>

      </section>
    `;
  };

  // ── Init ──────────────────────────────────────────────────────────────────

  const init = () => {
    // Start typing effect
    const typedEl = document.getElementById('hero-typed');
    if (typedEl) {
      setTimeout(() => initTyping(typedEl), 800);
    }

    // Animate stat counters when visible
    initCounters();

    // Scroll hint button
    initScrollHint();

    // CV download button — placeholder
    const cvBtn = document.getElementById('hero-cv-btn');
    if (cvBtn) {
      cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Utils.toast('CV download coming soon.', 'info');
      });
    }
  };

  // ── Destroy (cleanup on navigate away) ────────────────────────────────────

  const destroy = () => {
    if (typingInterval) clearTimeout(typingInterval);
    typingInterval = null;
  };

  return { render, init, destroy };

})();

window.HeroSection = HeroSection;
