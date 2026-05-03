// =============================================================================
// HERO — v1.4.5
// 3/5-2/5 · rising particles · futuristic bottom bar · all content always shown
// =============================================================================

window.HeroSection = (() => {
  const cfg = window.SITE_CONFIG;
  const soc = cfg.social;

  const ROLES = ['Web Developer','UI/UX Designer','Graphic Designer','Video Editor'];

  const ICONS = [
    { file:'html5',  label:'HTML5',  cls:'html',   dur:'3.9s', del:'0s'   },
    { file:'css3',   label:'CSS3',   cls:'css',    dur:'4.4s', del:'0.65s'},
    { file:'python', label:'Python', cls:'python', dur:'3.6s', del:'1.2s' },
    { file:'vscode', label:'VSCode', cls:'vscode', dur:'3.3s', del:'0.95s'},
    { file:'design', label:'Design', cls:'design', dur:'4.8s', del:'0.35s'},
  ];

  // ── Rising particles (10+ types) ─────────────────────────────────────────
  const PARTICLE_TYPES = [
    { char:'★', color:'rgba(59,130,246,VAL)',  colorL:'rgba(37,99,235,VAL)',  sz:'0.65rem' },
    { char:'✦', color:'rgba(99,102,241,VAL)',  colorL:'rgba(79,70,229,VAL)',  sz:'0.55rem' },
    { char:'✧', color:'rgba(147,197,253,VAL)', colorL:'rgba(96,165,250,VAL)', sz:'0.5rem'  },
    { char:'♥', color:'rgba(248,113,113,VAL)', colorL:'rgba(239,68,68,VAL)',  sz:'0.52rem' },
    { char:'♡', color:'rgba(251,146,60,VAL)',  colorL:'rgba(249,115,22,VAL)', sz:'0.56rem' },
    { char:'·', color:'rgba(255,255,255,VAL)', colorL:'rgba(37,99,235,VAL)',  sz:'0.7rem'  },
    { char:'◆', color:'rgba(139,92,246,VAL)',  colorL:'rgba(124,58,237,VAL)', sz:'0.45rem' },
    { char:'✿', color:'rgba(52,211,153,VAL)',  colorL:'rgba(16,185,129,VAL)', sz:'0.52rem' },
    { char:'+', color:'rgba(59,130,246,VAL)',  colorL:'rgba(37,99,235,VAL)',  sz:'0.6rem'  },
    { char:'✺', color:'rgba(251,191,36,VAL)',  colorL:'rgba(245,158,11,VAL)', sz:'0.5rem'  },
    { char:'⊹', color:'rgba(147,197,253,VAL)', colorL:'rgba(96,165,250,VAL)', sz:'0.6rem'  },
    { char:'◌', color:'rgba(99,102,241,VAL)',  colorL:'rgba(79,70,229,VAL)',  sz:'0.58rem' },
  ];

  const buildParticles = () => {
    const count = 48;
    const out = [];
    for (let i = 0; i < count; i++) {
      const pt   = PARTICLE_TYPES[i % PARTICLE_TYPES.length];
      const op   = (0.28 + Math.random() * 0.45).toFixed(2);
      const dur  = (6 + Math.random() * 10).toFixed(1) + 's';
      const del  = (Math.random() * 16).toFixed(1) + 's';
      const left = (2 + Math.random() * 96).toFixed(1) + '%';
      const px   = ((Math.random() - 0.5) * 80).toFixed(0) + 'px';
      const pr   = ((Math.random() - 0.5) * 360).toFixed(0) + 'deg';
      const c    = pt.color.replace('VAL', op);
      const cl   = pt.colorL.replace('VAL', op);
      out.push(`<span class="hero__particle"
        style="left:${left};--pd:${dur};--pp:${del};--po:${op};--ps:${pt.sz};--px:${px};--pr:${pr};--pc:${c};--pc-l:${cl};"
        aria-hidden="true">${pt.char}</span>`);
    }
    return out.join('');
  };

  // ── Twinkling star particles ──────────────────────────────────────────────
  const buildStars = () => {
    const out = [];
    for (let i = 0; i < 52; i++) {
      const sz   = Math.random() < 0.7 ? 1 : Math.random() < 0.8 ? 2 : 3;
      const x    = (Math.random() * 100).toFixed(1);
      const y    = (Math.random() * 100).toFixed(1);
      const dur  = (2 + Math.random() * 5).toFixed(1) + 's';
      const del  = (Math.random() * 7).toFixed(1) + 's';
      const opLo = (0.06 + Math.random() * 0.14).toFixed(2);
      const opHi = (0.25 + Math.random() * 0.45).toFixed(2);
      out.push(`<span class="hero__star" style="width:${sz}px;height:${sz}px;left:${x}%;top:${y}%;--dur:${dur};--del:${del};--op-lo:${opLo};--op-hi:${opHi};" aria-hidden="true"></span>`);
    }
    return out.join('');
  };

  const buildIcon = (ic) => `
    <div class="hero__icon hero__icon--${ic.cls}"
         style="--dur:${ic.dur};--del:${ic.del};"
         title="${ic.label}" aria-label="${ic.label}">
      <img src="/assets/images/icons/${ic.file}.svg" alt="${ic.label}" loading="lazy"/>
    </div>`;

  const getHTML = () => `
    <section class="hero" id="hero" aria-label="Introduction">

      <!-- Animated background -->
      <div class="hero__bg"      aria-hidden="true"></div>
      <div class="hero__stars"   aria-hidden="true">${buildStars()}</div>
      <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--2" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--3" aria-hidden="true"></div>

      <!-- Rising particles -->
      <div class="hero__particles" aria-hidden="true">${buildParticles()}</div>

      <div class="hero__inner">

        <!-- ── Content (left 3/5) ──────────────────────────── -->
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
              <span class="hero__name-inner hero__name-accent" style="--d:190ms">
                Rahman<span class="hero__name-nick">(Turzo)</span>
              </span>
            </span>
          </h1>

          <div class="hero__role hero-up" style="--d:350ms" aria-live="polite">
            <span id="hero-typed" class="hero__role-typed"></span>
            <span class="hero__cursor" aria-hidden="true">|</span>
          </div>

          <p class="hero__bio hero-up" style="--d:460ms">
            Self-taught developer &amp; designer from Bangladesh —
            building clean, fast and meaningful digital experiences.
          </p>

          <div class="hero__cta hero-up" style="--d:560ms">
            <a href="/contact" class="btn btn--primary">
              <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Hire Me
            </a>
            <a href="#" class="btn btn--outline" id="hero-cv-btn">
              <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> Download CV
            </a>
          </div>

          <div class="hero__socials hero-up" style="--d:660ms" aria-label="Social links">
            <a href="${soc.github}"    target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="GitHub">   <i class="fa-brands fa-github"      aria-hidden="true"></i></a>
            <a href="${soc.linkedin}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="LinkedIn">  <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="${soc.facebook}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Facebook">  <i class="fa-brands fa-facebook-f"  aria-hidden="true"></i></a>
            <a href="${soc.instagram}" target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Instagram"> <i class="fa-brands fa-instagram"   aria-hidden="true"></i></a>
            <a href="${soc.youtube}"   target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="YouTube">   <i class="fa-brands fa-youtube"     aria-hidden="true"></i></a>
            <a href="${soc.telegram}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Telegram">  <i class="fa-brands fa-telegram"    aria-hidden="true"></i></a>
          </div>

          <div class="hero__stats hero-up" style="--d:750ms" aria-label="Stats">
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

        <!-- ── Visual (right 2/5) ──────────────────────────── -->
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__photo-scene">

            <div class="hero__photo-glow"></div>

            <div class="hero__photo-wrap">
              <img
                src="/assets/images/hero.webp"
                alt="Muhtasim Rahman"
                class="hero__photo"
                loading="eager"
                fetchpriority="high"
                width="300"
                height="640"
              />
            </div>

            <!-- Futuristic bottom bar -->
            <div class="hero__photo-bottom" aria-hidden="true">
              <div class="hero__photo-hr-dots">
                <span style="--dd:0s"></span>
                <span style="--dd:0.4s"></span>
                <span style="--dd:0.8s"></span>
              </div>
            </div>

            <!-- Floating icons orbit photo-scene -->
            ${ICONS.map(buildIcon).join('')}

          </div>
        </div>

      </div>

      <!-- Scroll button -->
      <button class="hero__scroll" id="hero-scroll-btn"
              aria-label="Scroll to next section" type="button">
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
        if (ci === cur.length) { del = true; return setTimeout(tick, 2100); }
        setTimeout(tick, 70);
      } else {
        el.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; ri = (ri + 1) % ROLES.length; return setTimeout(tick, 280); }
        setTimeout(tick, 34);
      }
    };
    setTimeout(tick, 1050);
  };

  const initCounters = () => {
    document.querySelectorAll('.hero__stat-val[data-count]').forEach(el => {
      Utils.onVisible(el, () => Utils.animateCounter(el, +el.dataset.count, 900));
    });
  };

  const initCV = () => {
    document.getElementById('hero-cv-btn')?.addEventListener('click', e => {
      e.preventDefault();
      Utils.showToast('CV download coming soon!', 'info');
    });
  };

  const initScroll = () => {
    document.getElementById('hero-scroll-btn')?.addEventListener('click', () => {
      const next = document.getElementById('hero')?.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
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
