// ================================================
// pages/home.js — Landing Page
// ================================================
import { initHeroCanvas, initTyping, initAOS } from '../js/animations.js';
import { initContactForm }                      from '../js/contact-form.js';
import { onUser }                               from '../js/auth.js';

export function renderPage() {
  return `
    ${hero()}
    ${aboutSection()}
    ${skillsSection()}
    ${projectsSection()}
    ${servicesSection()}
    ${contactSection()}
  `;
}

export function initPage() {
  initHeroCanvas();
  initTyping(document.getElementById('role-text'), [
    'Web Developer', 'UI Designer', 'Frontend Engineer',
    'Freelancer', 'Problem Solver',
  ]);
  initContactForm();
  onUser(updateContactAuth);
  initProjectFilter();
}

/* ── Hero ── */
function hero() {
  return `
<section class="hero" id="home">
  <canvas id="hero-canvas"></canvas>
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>
  <div class="container">

    <!-- Content -->
    <div class="hero-content">
      <div class="hero-greeting">
        <span class="hero-greeting-bar"></span>
        <span class="hero-greeting-txt">// Assalamu Alaikum — Welcome</span>
      </div>

      <h1 class="hero-name">
        <span class="name-line">Muhtasim</span>
        <span class="name-line name-grad">Rahman</span>
      </h1>

      <div class="hero-nick">
        <span class="nick-at">@</span>
        <span class="nick-name">mdturzo999</span>
      </div>

      <div class="hero-role-row">
        <span class="role-pre">I'm a</span>
        <span class="role-txt"><span id="role-text">Web Developer</span><span class="role-cursor"></span></span>
      </div>

      <p class="hero-bio">
        A dedicated student developer from Bangladesh, passionate about building
        user-friendly, visually stunning websites. Focused on quality, clean code,
        and turning ideas into elegant digital experiences — the halal way.
      </p>

      <div class="hero-cta">
        <a href="/projects" class="btn btn-primary"><i class="ri-code-box-line"></i>View Projects</a>
        <a href="/contact" class="btn btn-outline"><i class="ri-mail-send-line"></i>Contact Me</a>
      </div>

      <div class="hero-socials">
        <span class="soc-label">Find me:</span>
        ${[
          ['https://github.com/muhtasim-rahman','ri-github-fill','GitHub'],
          ['https://linkedin.com/in/mdturzo999','ri-linkedin-fill','LinkedIn'],
          ['https://youtube.com/@mdturzo999','ri-youtube-fill','YouTube'],
          ['https://facebook.com/mdturzo999','ri-facebook-fill','Facebook'],
          ['mailto:mdturzo.dev@gmail.com','ri-mail-fill','Email'],
        ].map(([href,icon,lbl]) =>
          `<a href="${href}" class="soc-link" target="_blank" rel="noopener" title="${lbl}" aria-label="${lbl}"><i class="${icon}"></i></a>`
        ).join('')}
      </div>

      <div class="hero-stats">
        <div><div class="stat-val" data-count="4.5" data-suffix="+">4.5+</div><div class="stat-lbl">Years Exp.</div></div>
        <div><div class="stat-val" data-count="16" data-suffix="+">16+</div><div class="stat-lbl">Projects</div></div>
        <div><div class="stat-val" data-count="17" data-suffix="+">17+</div><div class="stat-lbl">Repos</div></div>
      </div>
    </div>

    <!-- Visual -->
    <div class="hero-visual">
      <div class="hero-glow-orb"></div>
      <div class="hero-orbit">
        <div class="tech-float tf-html"><span>🌐</span>HTML5</div>
        <div class="tech-float tf-css"><span>🎨</span>CSS3</div>
        <div class="tech-float tf-js"><span>⚡</span>JavaScript</div>
        <div class="tech-float tf-fire"><span>🔥</span>Firebase</div>
        <div class="tech-float tf-git"><span>🐙</span>GitHub</div>
        <div class="hero-img-frame">
          <img
            src="assets/images/muhtasim.webp"
            alt="Muhtasim Rahman — Turzo"
            class="hero-img"
            loading="eager"
            onerror="this.style.display='none';document.getElementById('hero-fallback').style.display='flex'"
          >
          <div id="hero-fallback" style="display:none;width:100%;height:100%;border-radius:50%;background:var(--grad-accent);align-items:center;justify-content:center;font-family:var(--font-display);font-size:5rem;font-weight:800;color:#06101e;">T</div>
        </div>
      </div>
    </div>
  </div>

  <a href="#about" class="hero-scroll">
    <span class="scroll-text">Scroll</span>
    <div class="scroll-mouse"><div class="scroll-wheel"></div></div>
  </a>
</section>`;
}

/* ── About (condensed) ── */
function aboutSection() {
  return `
<section class="section about-section" id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-img-wrap" data-aos="slide-left">
        <div class="about-img-box">
          <img src="assets/images/muhtasim.webp" alt="Muhtasim Rahman" loading="lazy">
          <div class="about-img-overlay"></div>
        </div>
        <div class="about-accent-box"></div>
        <div class="about-exp-badge">
          <div class="exp-val">4.5+</div>
          <div class="exp-lbl">Years Experience</div>
        </div>
      </div>

      <div class="about-content" data-aos="slide-right">
        <span class="section-label">// about_me</span>
        <h2 class="section-title">Hi, I'm <span>Turzo</span></h2>
        <div class="divider"></div>

        <p class="about-bio">
          My name is Muhtasim Rahman, a student at Saidpur Govt. Science College.
          At 17, I'm actively mastering HTML, CSS, JavaScript, and expanding into Python
          and modern web frameworks. With 4+ years of design experience and 2.5+ years of
          video editing, I blend technical skill with creative vision.
        </p>
        <p class="about-bio">
          I build impactful websites combining functionality with captivating design —
          always following ethical and Halal principles. My goal: professional full-stack
          developer and freelancer.
        </p>

        <ul class="about-list">
          <li><i class="ri-map-pin-2-line"></i><span><strong>Location:</strong> Saidpur, Nilphamari, Bangladesh</span></li>
          <li><i class="ri-graduation-cap-line"></i><span><strong>Education:</strong> SSC-26 Batch, SGSC</span></li>
          <li><i class="ri-mail-line"></i><a href="mailto:mdturzo.dev@gmail.com">mdturzo.dev@gmail.com</a></li>
          <li><i class="ri-github-line"></i><a href="https://github.com/muhtasim-rahman" target="_blank" rel="noopener">github.com/muhtasim-rahman</a></li>
        </ul>

        <div style="display:flex;gap:.85rem;flex-wrap:wrap;margin-top:.25rem">
          <a href="/about" class="btn btn-primary"><i class="ri-user-line"></i>Full Bio</a>
          <a href="https://github.com/muhtasim-rahman" target="_blank" rel="noopener" class="btn btn-outline"><i class="ri-github-line"></i>GitHub</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ── Skills (condensed) ── */
function skillsSection() {
  const bars = [
    { name:'HTML5',emoji:'🌐',pct:85 },
    { name:'CSS3',emoji:'🎨',pct:82 },
    { name:'JavaScript',emoji:'⚡',pct:55 },
    { name:'Git & GitHub',emoji:'🐙',pct:80 },
    { name:'Python',emoji:'🐍',pct:60 },
    { name:'Firebase',emoji:'🔥',pct:50 },
  ];
  const tools = [
    {ico:'📝',lbl:'VS Code'},{ico:'🐙',lbl:'GitHub'},{ico:'🔥',lbl:'Firebase'},
    {ico:'📊',lbl:'Chart.js'},{ico:'📱',lbl:'PWA'},{ico:'🌐',lbl:'Odoo'},
    {ico:'🅱️',lbl:'Bootstrap'},{ico:'📋',lbl:'G.Sheets'},{ico:'🌍',lbl:'G.Pages'},
  ];
  return `
<section class="section skills-section" id="skills">
  <div class="container">
    <div style="margin-bottom:3rem" data-aos>
      <span class="section-label">// my_skills</span>
      <h2 class="section-title">Tech <span>Arsenal</span></h2>
      <div class="divider"></div>
      <p class="section-sub">Technologies I work with, built over years of hands-on practice.</p>
    </div>
    <div class="skills-layout">
      <div class="skill-bars" data-stagger>
        ${bars.map(s => `
          <div class="sb-item">
            <div class="sb-head">
              <span class="sb-name"><span>${s.emoji}</span>${s.name}</span>
              <span class="sb-pct">${s.pct}%</span>
            </div>
            <div class="sb-track"><div class="bar-fill" style="width:${s.pct}%"></div></div>
          </div>`).join('')}
      </div>
      <div class="tools-col" data-aos="slide-right">
        <p class="tools-label">// tools & platforms</p>
        <div class="tools-grid">
          ${tools.map(t => `<div class="tool-badge"><span class="ico">${t.ico}</span><span class="lbl">${t.lbl}</span></div>`).join('')}
        </div>
        <div class="learn-box">
          <p class="learn-box-title">📚 Learning Queue (2026)</p>
          <div class="learn-list">
            ${['SASS / SCSS','Vue.js','Node.js','Express.js','Angular'].map(t =>
              `<div class="learn-item"><div class="learn-dot"></div><span>${t}</span></div>`
            ).join('')}
          </div>
        </div>
        <a href="/skills" class="btn btn-outline" style="align-self:flex-start"><i class="ri-tools-line"></i>Full Skills</a>
      </div>
    </div>
  </div>
</section>`;
}

/* ── Projects (top 6) ── */
const PROJECTS = [
  { icon:'📊', title:'FMT Tracker Pro', year:'2025–2026', cat:'webapp', featured:true,
    desc:'Smart PWA dashboard for SSC-26 batch students to track exam merit positions with real-time charts and offline support.',
    stack:['HTML','CSS','JavaScript','Chart.js','Sheets API','PWA'],
    status:'🔧 Active Beta', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/UFMT-SSC26/', gh:'https://github.com/muhtasim-rahman/UFMT-SSC26' },
  { icon:'🔔', title:'Notification Panel', year:'2024–2025', cat:'tool', featured:true,
    desc:'Plug-and-play dynamic notification widget powered by Google Sheets. Read/unread state, pagination, tab nav.',
    stack:['HTML','CSS','JavaScript','Sheets API','LocalStorage'],
    status:'✅ Complete', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/notification-panel/', gh:'https://github.com/muhtasim-rahman/notification-panel' },
  { icon:'☪️', title:'Halal — World of Muslims', year:'2024', cat:'islamic', featured:false,
    desc:'Islamic web app providing prayer times, Quran content, and resources. 71+ commits — most dedicated project.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/halal', gh:'https://github.com/muhtasim-rahman/halal' },
  { icon:'🏫', title:'SGSC Web Campus', year:'2024', cat:'webapp', featured:false,
    desc:'Institutional website for Saidpur Govt. Science College. Voluntarily built and maintained for the college community.',
    stack:['Odoo','CSS','JavaScript'],
    status:'⚠️ Check Live', sc:'gold',
    demo:'https://sgsc.odoo.com', gh:null },
  { icon:'🛒', title:'Turzo Express', year:'2024', cat:'design', featured:false,
    desc:'E-commerce website UI with product listings, cart design, and fully responsive layout.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/turzo-express', gh:'https://github.com/muhtasim-rahman/turzo-express' },
  { icon:'📦', title:'Odoo Website Assets', year:'2024', cat:'tool', featured:false,
    desc:'CDN-style repo hosting custom CSS/JS for mdturzo.odoo.com — mega nav, share sidebar, custom scrollbar.',
    stack:['CSS','JavaScript','GitHub Pages'],
    status:'🔧 Active', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/odoo-website-assets/mdturzo.odoo.com/', gh:'https://github.com/muhtasim-rahman/odoo-website-assets' },
];

export { PROJECTS };

function projectsSection() {
  return `
<section class="section projects-section" id="projects">
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:2.25rem" data-aos>
      <div>
        <span class="section-label">// my_work</span>
        <h2 class="section-title">Featured <span>Projects</span></h2>
        <div class="divider"></div>
      </div>
      <a href="/projects" class="btn btn-outline">View All <i class="ri-arrow-right-line"></i></a>
    </div>
    <div class="filter-row" id="filter-row">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="webapp">Web App</button>
      <button class="filter-btn" data-filter="tool">Tool</button>
      <button class="filter-btn" data-filter="design">Design</button>
      <button class="filter-btn" data-filter="islamic">Islamic</button>
    </div>
    <div class="proj-grid" id="proj-grid" data-stagger>
      ${PROJECTS.map(projCard).join('')}
    </div>
  </div>
</section>`;
}

export function projCard(p) {
  return `
<div class="proj-card" data-cat="${p.cat}">
  <div class="pc-head">
    <div class="pc-icon">${p.icon}</div>
    <div class="pc-badges">
      <span class="badge badge-${p.sc}">${p.status}</span>
      ${p.featured ? '<span class="badge badge-gold">⭐ Featured</span>' : ''}
    </div>
  </div>
  <div class="pc-body">
    <h3 class="pc-title">${p.title}</h3>
    <p class="pc-year">${p.year}</p>
    <p class="pc-desc">${p.desc}</p>
    <div class="pc-stack">${p.stack.map(t => `<span class="pc-tag">${t}</span>`).join('')}</div>
  </div>
  <div class="pc-foot">
    ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="pc-link"><i class="ri-external-link-line"></i>Live Demo</a>` : ''}
    ${p.gh   ? `<a href="${p.gh}"   target="_blank" rel="noopener" class="pc-link"><i class="ri-github-line"></i>GitHub</a>` : ''}
  </div>
</div>`;
}

/* ── Services (condensed) ── */
function servicesSection() {
  return `
<section class="section services-section" id="services">
  <div class="container">
    <div style="margin-bottom:3rem;text-align:center" data-aos>
      <span class="section-label">// what_i_do</span>
      <h2 class="section-title">My <span>Services</span></h2>
      <div class="divider" style="margin:1rem auto"></div>
      <p class="section-sub" style="margin:0 auto">What I can build and create for you.</p>
    </div>
    <div class="services-grid" data-stagger>
      <div class="svc-card">
        <div class="svc-icon">🌐</div>
        <h3 class="svc-title">Website Development</h3>
        <p class="svc-desc">Responsive, modern websites from scratch — portfolios to full Firebase-powered apps.</p>
        <ul class="svc-list"><li>Responsive for all devices</li><li>Clean, maintainable code</li><li>Firebase backend</li><li>PWA-ready</li></ul>
      </div>
      <div class="svc-card">
        <div class="svc-icon gold">🎨</div>
        <h3 class="svc-title">Graphic Design</h3>
        <p class="svc-desc">4+ years of creative design — logos, banners, thumbnails that make brands stand out.</p>
        <ul class="svc-list"><li>Logo & brand identity</li><li>YouTube thumbnails</li><li>Banners & posters</li><li>Social media graphics</li></ul>
      </div>
      <div class="svc-card">
        <div class="svc-icon">🎬</div>
        <h3 class="svc-title">Video Editing</h3>
        <p class="svc-desc">2.5+ years editing YouTube, Facebook, ads, and short-form content.</p>
        <ul class="svc-list"><li>YouTube & social videos</li><li>Promotional ads</li><li>Reels & short-form</li><li>Color grading</li></ul>
      </div>
      <div class="svc-card">
        <div class="svc-icon gold">📚</div>
        <h3 class="svc-title">eLearning Platform <span class="badge badge-dev" style="margin-left:.4rem;vertical-align:middle">Under Dev</span></h3>
        <p class="svc-desc">Free online courses on web development and programming. Coming soon.</p>
        <ul class="svc-list"><li>Web dev tutorials</li><li>Programming fundamentals</li><li>Project-based learning</li><li>100% free</li></ul>
      </div>
    </div>
    <a href="/services" class="btn btn-primary" style="margin:2.5rem auto 0;display:flex;width:fit-content"><i class="ri-service-line"></i>All Services</a>
  </div>
</section>`;
}

/* ── Contact (condensed) ── */
function contactSection() {
  return `
<section class="section contact-section" id="contact">
  <div class="container">
    <div style="margin-bottom:3rem" data-aos>
      <span class="section-label">// get_in_touch</span>
      <h2 class="section-title">Let's <span>Connect</span></h2>
      <div class="divider"></div>
      <p class="section-sub">Have a project idea? Want to collaborate? Drop me a message.</p>
    </div>
    <div class="contact-layout">
      <div class="contact-info" data-aos="slide-left">
        <p style="font-size:.92rem;color:var(--text-muted);line-height:1.8">
          I'm open to freelance projects, collaborations, and new opportunities.
          All work done with honesty, quality, and Halal ethics. In sha Allah.
        </p>
        <div class="contact-links">
          ${[
            ['mailto:mdturzo.dev@gmail.com','ri-mail-line','Email','mdturzo.dev@gmail.com'],
            ['https://github.com/muhtasim-rahman','ri-github-fill','GitHub','muhtasim-rahman'],
            ['https://linkedin.com/in/mdturzo999','ri-linkedin-fill','LinkedIn','mdturzo999'],
            ['https://facebook.com/mdturzo999','ri-facebook-fill','Facebook','mdturzo999'],
          ].map(([href,ico,lbl,val]) => `
            <a href="${href}" class="clink" target="_blank" rel="noopener">
              <div class="clink-icon"><i class="${ico}"></i></div>
              <div><p class="clink-label">${lbl}</p><p class="clink-val">${val}</p></div>
              <i class="ri-external-link-line clink-arrow"></i>
            </a>`).join('')}
        </div>
      </div>
      ${contactFormHTML()}
    </div>
  </div>
</section>`;
}

export function contactFormHTML() {
  return `
<div class="form-wrap" data-aos="slide-right">
  <h3 class="form-wrap-title">Send a Message</h3>
  <p class="form-wrap-sub">Sign in to send a message securely via Firebase. Your data is safe.</p>

  <div class="auth-gate" id="auth-gate">
    <p class="auth-gate-txt">🔐 Sign in to send a message.<br><small>Stored securely. No spam.</small></p>
    <div class="auth-btns">
      <button class="auth-btn" data-auth-action="google">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="16" alt="Google"> Google
      </button>
      <button class="auth-btn" data-auth-action="github">
        <i class="ri-github-fill"></i> GitHub
      </button>
    </div>
  </div>

  <form id="contact-form" style="display:none" novalidate>
    <div class="form-group">
      <label class="form-label" for="f-name">Your Name</label>
      <input class="form-input" id="f-name" type="text" placeholder="Muhtasim Rahman" required maxlength="100">
    </div>
    <div class="form-group">
      <label class="form-label" for="f-email">Email Address</label>
      <input class="form-input" id="f-email" type="email" placeholder="you@example.com" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="f-msg">Message</label>
      <textarea class="form-textarea" id="f-msg" placeholder="Hi Turzo, I'd like to discuss a project…" required minlength="10" maxlength="2000"></textarea>
    </div>
    <div id="form-status" class="form-status"></div>
    <div class="form-submit-row">
      <button type="submit" class="btn btn-primary" id="form-submit" style="width:100%;justify-content:center">
        <i class="ri-send-plane-fill"></i> Send Message
      </button>
      <p class="form-hint">
        Signed in as <strong id="signed-as"></strong>
        · <button type="button" class="signout-btn" data-auth-action="signout">Sign out</button>
      </p>
    </div>
  </form>
</div>`;
}

/* ── Project filter ── */
export function initProjectFilter() {
  const row  = document.getElementById('filter-row');
  const grid = document.getElementById('proj-grid');
  if (!row || !grid) return;
  row.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    row.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    grid.querySelectorAll('.proj-card').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
}

/* ── Auth-aware contact ── */
export function updateContactAuth(user) {
  const gate   = document.getElementById('auth-gate');
  const form   = document.getElementById('contact-form');
  const nameEl = document.getElementById('signed-as');
  if (!gate || !form) return;
  if (user) {
    gate.style.display = 'none';
    form.style.display = 'block';
    if (nameEl) nameEl.textContent = user.displayName || user.email || 'User';
  } else {
    gate.style.display = 'flex';
    form.style.display = 'none';
  }
}
