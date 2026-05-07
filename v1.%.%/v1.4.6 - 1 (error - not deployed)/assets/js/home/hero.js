// =============================================================================
// HERO — v1.4.6
// ============================================================================= 

window.HeroSection = (() => {
  const cfg = window.SITE_CONFIG;
  const soc = cfg.social;
  const ROLES = ['Web Developer','UI/UX Designer','Graphic Designer','Video Editor'];

  const ICONS = [
    { file:'html5',  label:'HTML5',  cls:'html',   dur:'3.9s', del:'0s'    },
    { file:'css3',   label:'CSS3',   cls:'css',    dur:'4.4s', del:'.65s'  },
    { file:'python', label:'Python', cls:'python', dur:'3.6s', del:'1.2s'  },
    { file:'design', label:'Design', cls:'design', dur:'4.1s', del:'.35s'  },
    { file:'vscode', label:'VSCode', cls:'vscode', dur:'3.3s', del:'.95s'  },
  ];

  const PARTICLES = [
    {ch:'★',c:'rgba(59,130,246,V)',  cl:'rgba(37,99,235,V)',  sz:'.65rem'},
    {ch:'✦',c:'rgba(99,102,241,V)', cl:'rgba(79,70,229,V)',   sz:'.55rem'},
    {ch:'✧',c:'rgba(147,197,253,V)',cl:'rgba(96,165,250,V)',  sz:'.5rem' },
    {ch:'♥',c:'rgba(248,113,113,V)',cl:'rgba(239,68,68,V)',   sz:'.52rem'},
    {ch:'♡',c:'rgba(251,146,60,V)', cl:'rgba(249,115,22,V)', sz:'.56rem'},
    {ch:'·',c:'rgba(255,255,255,V)',cl:'rgba(37,99,235,V)',   sz:'.72rem'},
    {ch:'◆',c:'rgba(139,92,246,V)', cl:'rgba(124,58,237,V)', sz:'.45rem'},
    {ch:'✿',c:'rgba(52,211,153,V)', cl:'rgba(16,185,129,V)', sz:'.52rem'},
    {ch:'+',c:'rgba(59,130,246,V)', cl:'rgba(37,99,235,V)',   sz:'.6rem' },
    {ch:'✺',c:'rgba(251,191,36,V)', cl:'rgba(245,158,11,V)', sz:'.5rem' },
    {ch:'⊹',c:'rgba(147,197,253,V)',cl:'rgba(96,165,250,V)',  sz:'.6rem' },
    {ch:'◌',c:'rgba(99,102,241,V)', cl:'rgba(79,70,229,V)',   sz:'.58rem'},
  ];

  const buildParticles = () => {
    const out = [];
    for (let i = 0; i < 46; i++) {
      const pt  = PARTICLES[i % PARTICLES.length];
      const op  = (.28 + Math.random()*.42).toFixed(2);
      const dur = (6 + Math.random()*10).toFixed(1)+'s';
      const del = (Math.random()*18).toFixed(1)+'s';
      const lft = (2 + Math.random()*96).toFixed(1)+'%';
      const px  = ((Math.random()-.5)*80).toFixed(0)+'px';
      const pr  = ((Math.random()-.5)*360).toFixed(0)+'deg';
      out.push(`<span class="hero__particle" aria-hidden="true"
        style="left:${lft};--pd:${dur};--pp:${del};--po:${op};--ps:${pt.sz};--px:${px};--pr:${pr};--pc:${pt.c.replace('V',op)};--pc-l:${pt.cl.replace('V',op)};"
      >${pt.ch}</span>`);
    }
    return out.join('');
  };

  const buildStars = () => {
    const out = [];
    for (let i = 0; i < 50; i++) {
      const sz  = Math.random() < .7 ? 1 : Math.random() < .8 ? 2 : 3;
      const x   = (Math.random()*100).toFixed(1);
      const y   = (Math.random()*100).toFixed(1);
      const dur = (2+Math.random()*5).toFixed(1)+'s';
      const del = (Math.random()*7).toFixed(1)+'s';
      const lo  = (.06+Math.random()*.14).toFixed(2);
      const hi  = (.24+Math.random()*.44).toFixed(2);
      out.push(`<span class="hero__star" aria-hidden="true" style="width:${sz}px;height:${sz}px;left:${x}%;top:${y}%;--dur:${dur};--del:${del};--op-lo:${lo};--op-hi:${hi};"></span>`);
    }
    return out.join('');
  };

  const buildIcon = ic => `
    <div class="hero__icon hero__icon--${ic.cls}" style="--dur:${ic.dur};--del:${ic.del};" title="${ic.label}" aria-label="${ic.label}">
      <img src="/assets/images/icons/${ic.file}.svg" alt="${ic.label}" loading="lazy"/>
    </div>`;

  const getHTML = () => `
    <section class="hero" id="hero" aria-label="Introduction">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__stars" aria-hidden="true">${buildStars()}</div>
      <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--2" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--3" aria-hidden="true"></div>
      <div class="hero__particles" aria-hidden="true">${buildParticles()}</div>

      <div class="hero__inner">

        <!-- Left 3/5 -->
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
            <a href="/contact" class="btn btn--primary" title="Hire Muhtasim for your project">
              <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Hire Me
            </a>
            <a href="#" class="btn btn--outline" id="hero-cv-btn" title="Download CV">
              <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> Download CV
            </a>
          </div>
          <div class="hero__socials hero-up" style="--d:650ms" aria-label="Social links">
            <a href="${soc.github}"    target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="GitHub"    title="GitHub">   <i class="fa-brands fa-github"      aria-hidden="true"></i></a>
            <a href="${soc.linkedin}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="LinkedIn"  title="LinkedIn">  <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="${soc.facebook}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Facebook"  title="Facebook">  <i class="fa-brands fa-facebook-f"  aria-hidden="true"></i></a>
            <a href="${soc.instagram}" target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Instagram" title="Instagram"> <i class="fa-brands fa-instagram"   aria-hidden="true"></i></a>
            <a href="${soc.youtube}"   target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="YouTube"   title="YouTube">   <i class="fa-brands fa-youtube"     aria-hidden="true"></i></a>
            <a href="${soc.telegram}"  target="_blank" rel="noopener noreferrer" class="hero__social-link" aria-label="Telegram"  title="Telegram">  <i class="fa-brands fa-telegram"    aria-hidden="true"></i></a>
          </div>
          <div class="hero__stats hero-up" style="--d:740ms" aria-label="Experience stats">
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

        <!-- Right 2/5 -->
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__photo-scene">
            <div class="hero__photo-glow"></div>
            <div class="hero__photo-wrap">
              <img src="/assets/images/hero.webp" alt="Muhtasim Rahman"
                   class="hero__photo" loading="eager" fetchpriority="high"
                   width="285" height="630"/>
            </div>
            <div class="hero__photo-bottom">
              <div class="hero__photo-hr-dots">
                <span style="--dd:0s"></span>
                <span style="--dd:.4s"></span>
                <span style="--dd:.8s"></span>
              </div>
            </div>
            ${ICONS.map(buildIcon).join('')}
          </div>
        </div>

      </div>

      <button class="hero__scroll" id="hero-scroll-btn" type="button"
              aria-label="Scroll to next section" title="Scroll down">
        <span>Scroll</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
    </section>`;

  const initTyping = () => {
    const el = document.getElementById('hero-typed');
    if (!el) return;
    let ri=0,ci=0,del=false;
    const tick = () => {
      const cur = ROLES[ri];
      if (!del) {
        el.textContent = cur.slice(0,++ci);
        if (ci===cur.length){del=true;return setTimeout(tick,2100);}
        setTimeout(tick,70);
      } else {
        el.textContent = cur.slice(0,--ci);
        if (ci===0){del=false;ri=(ri+1)%ROLES.length;return setTimeout(tick,280);}
        setTimeout(tick,34);
      }
    };
    setTimeout(tick,1050);
  };

  const initCounters = () => {
    document.querySelectorAll('.hero__stat-val[data-count]').forEach(el => {
      Utils.onVisible(el, () => Utils.animateCounter(el, +el.dataset.count, 900));
    });
  };

  const initCV = () => {
    document.getElementById('hero-cv-btn')?.addEventListener('click', e => {
      e.preventDefault();
      Utils.showToast('CV download coming soon!','info');
    });
  };

  const initScroll = () => {
    document.getElementById('hero-scroll-btn')?.addEventListener('click', () => {
      const next = document.getElementById('hero')?.nextElementSibling;
      if (next) next.scrollIntoView({behavior:'smooth',block:'start'});
      else window.scrollBy({top:window.innerHeight*.85,behavior:'smooth'});
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
