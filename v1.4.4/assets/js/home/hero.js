// =============================================================================
// HERO — v1.4.4
// photo-scene icon positioning · animated stars · scroll button fix
// =============================================================================

window.HeroSection = (() => {
  const cfg = window.SITE_CONFIG;
  const soc = cfg.social;

  const ROLES = ['Web Developer','UI/UX Designer','Graphic Designer','Video Editor'];

  const ICONS = [
    { file:'html5',  label:'HTML5',  cls:'html',   dur:'3.8s', del:'0s'   },
    { file:'css3',   label:'CSS3',   cls:'css',    dur:'4.3s', del:'0.6s' },
    { file:'python', label:'Python', cls:'python', dur:'3.5s', del:'1.1s' },
    { file:'design', label:'Design', cls:'design', dur:'4.7s', del:'0.3s' },
    { file:'vscode', label:'VSCode', cls:'vscode', dur:'3.2s', del:'0.9s' },
  ];

  const buildIcon = (ic) => `
    <div class="hero__icon hero__icon--${ic.cls}"
         style="--dur:${ic.dur};--del:${ic.del};"
         title="${ic.label}" aria-label="${ic.label}">
      <img src="/assets/images/icons/${ic.file}.svg" alt="${ic.label}" loading="lazy"/>
    </div>`;

  // ── Star particles (CSS-driven) ─────────────────────────────────────────
  const buildStars = () => {
    const stars = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      const size = Math.random() < 0.7 ? 1 : Math.random() < 0.8 ? 2 : 3;
      const x    = Math.random() * 100;
      const y    = Math.random() * 100;
      const dur  = (2.5 + Math.random() * 5).toFixed(1) + 's';
      const del  = (Math.random() * 6).toFixed(1) + 's';
      const opLo = (0.08 + Math.random() * 0.15).toFixed(2);
      const opHi = (0.3 + Math.random() * 0.45).toFixed(2);
      stars.push(
        `<span class="hero__star" style="
          width:${size}px;height:${size}px;
          left:${x}%;top:${y}%;
          --dur:${dur};--del:${del};
          --op-lo:${opLo};--op-hi:${opHi};
        "></span>`
      );
    }
    return stars.join('');
  };

  const getHTML = () => `
    <section class="hero" id="hero" aria-label="Introduction">

      <!-- Animated background layers -->
      <div class="hero__stars" aria-hidden="true">${buildStars()}</div>
      <div class="hero__grid"  aria-hidden="true"></div>
      <div class="hero__scan"  aria-hidden="true"></div>
      <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--2" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--3" aria-hidden="true"></div>

      <div class="hero__inner">

        <!-- ── Content ──────────────────────────────────────────────── -->
        <div class="hero__content">

          <div class="hero__chip hero-up" style="--d:0ms">
            <span class="hero__chip-dot" aria-hidden="true"></span>
            Available for work
          </div>

          <h1 class="hero__name" aria-label="Muhtasim Rahman, Turzo">
            <span class="hero__name-line">
              <span class="hero__name-inner" style="--d:80ms">Muhtasim</span>
            </span>
            <span class="hero__name-line">
              <span class="hero__name-inner hero__name-accent" style="--d:180ms">
                Rahman<span class="hero__name-nick">(Turzo)</span>
              </span>
            </span>
          </h1>

          <div class="hero__role hero-up" style="--d:340ms" aria-live="polite">
            <span id="hero-typed" class="hero__role-typed"></span>
            <span class="hero__cursor" aria-hidden="true">|</span>
          </div>

          <p class="hero__bio hero-up" style="--d:440ms">
            Self-taught developer &amp; designer from Bangladesh —
            building clean, fast and meaningful digital experiences.
          </p>

          <div class="hero__cta hero-up" style="--d:540ms">
            <a href="/contact" class="btn btn--primary">
              <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Hire Me
            </a>
            <a href="#" class="btn btn--outline" id="hero-cv-btn">
              <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> Download CV
            </a>
          </div>

          <div class="hero__socials hero-up" style="--d:640ms" aria-label="Social links">
            <a href="${soc.github}"    target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="GitHub">   <i class="fa-brands fa-github"      aria-hidden="true"></i></a>
            <a href="${soc.linkedin}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="LinkedIn">  <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="${soc.facebook}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Facebook">  <i class="fa-brands fa-facebook-f"  aria-hidden="true"></i></a>
            <a href="${soc.instagram}" target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Instagram"> <i class="fa-brands fa-instagram"   aria-hidden="true"></i></a>
            <a href="${soc.youtube}"   target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="YouTube">   <i class="fa-brands fa-youtube"     aria-hidden="true"></i></a>
            <a href="${soc.telegram}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Telegram">  <i class="fa-brands fa-telegram"    aria-hidden="true"></i></a>
          </div>

          <div class="hero__stats hero-up" style="--d:720ms" aria-label="Experience stats">
            <div class="hero__stat">
              <div class="hero__stat-num">
                <span class="hero__stat-val" data-count="3">3</span><span class="hero__stat-plus">+</span>
              </div>
              <span class="hero__stat-lbl">Yrs Dev</span>
            </div>
            <div class="hero__stat-sep" aria-hidden="true"></div>
            <div class="hero__stat">
              <div class="hero__stat-num">
                <span class="hero__stat-val" data-count="6">6</span><span class="hero__stat-plus">+</span>
              </div>
              <span class="hero__stat-lbl">Yrs Design</span>
            </div>
            <div class="hero__stat-sep" aria-hidden="true"></div>
            <div class="hero__stat">
              <div class="hero__stat-num">
                <span class="hero__stat-val" data-count="16">16</span><span class="hero__stat-plus">+</span>
              </div>
              <span class="hero__stat-lbl">Projects</span>
            </div>
          </div>

        </div>

        <!-- ── Visual ────────────────────────────────────────────────── -->
        <div class="hero__visual" aria-hidden="true">

          <!--
            hero__photo-scene: same dimensions as the photo.
            All icons are positioned relative to THIS — so they orbit
            the actual photo edges, not float in the grid gap.
          -->
          <div class="hero__photo-scene">

            <!-- Glow behind photo -->
            <div class="hero__photo-glow"></div>

            <!-- Photo -->
            <div class="hero__photo-wrap">
              <img
                src="/assets/images/hero.webp"
                alt="Muhtasim Rahman"
                class="hero__photo"
                loading="eager"
                fetchpriority="high"
                width="290"
                height="600"
              />
            </div>

            <!-- Bottom HR transition line -->
            <div class="hero__photo-hr" aria-hidden="true"></div>

            <!-- Floating skill icons — orbit the photo-scene edges -->
            ${ICONS.map(buildIcon).join('')}

          </div>

        </div>

      </div>

      <!-- Scroll button — clickable -->
      <button
        class="hero__scroll"
        id="hero-scroll-btn"
        aria-label="Scroll to next section"
        type="button"
      >
        <span>Scroll</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>

    </section>
  `;

  // ── Typing ──────────────────────────────────────────────────────────────
  const initTyping = () => {
    const el = document.getElementById('hero-typed');
    if (!el) return;
    let ri = 0, ci = 0, del = false;
    const tick = () => {
      const cur = ROLES[ri];
      if (!del) {
        el.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { del = true; return setTimeout(tick, 2000); }
        setTimeout(tick, 72);
      } else {
        el.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; ri = (ri + 1) % ROLES.length; return setTimeout(tick, 300); }
        setTimeout(tick, 36);
      }
    };
    setTimeout(tick, 1100);
  };

  // ── Counters ─────────────────────────────────────────────────────────────
  const initCounters = () => {
    document.querySelectorAll('.hero__stat-val[data-count]').forEach(el => {
      Utils.onVisible(el, () => Utils.animateCounter(el, +el.dataset.count, 900));
    });
  };

  // ── CV button ─────────────────────────────────────────────────────────────
  const initCV = () => {
    document.getElementById('hero-cv-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      Utils.showToast('CV download coming soon!', 'info');
    });
  };

  // ── Scroll button — scrolls to the section immediately after hero ──────
  const initScroll = () => {
    const btn = document.getElementById('hero-scroll-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const heroEl = document.getElementById('hero');
      if (!heroEl) return;
      const nextEl = heroEl.nextElementSibling;
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    });
  };

  const init = () => {
    if (!document.getElementById('hero')) return;
    initTyping();
    initCounters();
    initCV();
    initScroll();
  };

  return { getHTML, init };
})();
