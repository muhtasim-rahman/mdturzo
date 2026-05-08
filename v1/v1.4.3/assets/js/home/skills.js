// =============================================================================
// HOME / SKILLS — JS — mdturzo.web.app v1.4.1
// Renders skills section with animated progress bars and category tabs.
// =============================================================================

window.SkillsSection = (() => {

  // ── Skills Data ───────────────────────────────────────────────────────────────
  const CATEGORIES = [
    {
      id:    'programming',
      label: 'Programming',
      icon:  'fa-code',
      skills: [
        { name: 'AI & Prompt Eng.',   icon: 'fa-robot',       level: 'Expert',   pct: 90, desc: 'Daily use for coding, design & planning' },
        { name: 'HTML',                icon: 'fa-html5',       level: 'Advanced', pct: 80, desc: 'Semantic, accessible markup' },
        { name: 'CSS',                 icon: 'fa-css3-alt',    level: 'Advanced', pct: 80, desc: 'Responsive layouts, animations' },
        { name: 'Git & GitHub',        icon: 'fa-code-branch', level: 'Advanced', pct: 78, desc: 'Version control, project hosting' },
        { name: 'Python',              icon: 'fa-python',      level: 'Mid',      pct: 55, desc: 'Scripting, learning stage' },
        { name: 'JavaScript',          icon: 'fa-js',          level: 'Mid',      pct: 45, desc: 'Vanilla JS, currently improving' },
        { name: 'Java',                icon: 'fa-java',        level: 'Basic',    pct: 35, desc: 'Basic OOP concepts' },
      ],
    },
    {
      id:    'design',
      label: 'Design',
      icon:  'fa-pen-ruler',
      skills: [
        { name: 'Logo Design',         icon: 'fa-star',         level: 'Advanced', pct: 80, desc: 'Brand identity logos' },
        { name: 'Thumbnail Design',    icon: 'fa-image',        level: 'Advanced', pct: 82, desc: 'YouTube & social thumbnails' },
        { name: 'Banner Design',       icon: 'fa-panorama',     level: 'Advanced', pct: 78, desc: 'Promotional banners' },
        { name: 'Poster Design',       icon: 'fa-signs-post',   level: 'Mid',      pct: 68, desc: 'Event and promo posters' },
        { name: 'Business Card',       icon: 'fa-id-card',      level: 'Mid',      pct: 65, desc: 'Professional card layouts' },
        { name: 'Web UI (HTML/CSS)',   icon: 'fa-display',      level: 'Advanced', pct: 80, desc: 'Custom coded web designs' },
      ],
    },
    {
      id:    'tools',
      label: 'Tools & Platforms',
      icon:  'fa-toolbox',
      skills: [
        { name: 'VS Code',             icon: 'fa-code',            level: 'Advanced', pct: 85, desc: 'Primary code editor' },
        { name: 'Firebase',            icon: 'fa-fire',            level: 'Mid',      pct: 58, desc: 'Auth, DB, Hosting' },
        { name: 'Google Sheets API',   icon: 'fa-table',           level: 'Mid',      pct: 60, desc: 'Used as lightweight backend' },
        { name: 'Browser DevTools',    icon: 'fa-bug',             level: 'Advanced', pct: 75, desc: 'Debugging & profiling' },
        { name: 'Video Editing',       icon: 'fa-film',            level: 'Advanced', pct: 78, desc: '5+ years: YouTube, Reels, Ads' },
        { name: 'GitHub Pages',        icon: 'fa-cloud-arrow-up',  level: 'Advanced', pct: 82, desc: 'Free static hosting' },
        { name: 'Odoo (Website Bldr)', icon: 'fa-globe',           level: 'Advanced', pct: 75, desc: 'Built 2 portfolio sites' },
      ],
    },
  ];

  // Level tag class map
  const LEVEL_CLASS = {
    Expert:   'expert',
    Advanced: 'advanced',
    Mid:      'mid',
    Basic:    'basic',
  };

  // ── Build HTML ───────────────────────────────────────────────────────────────
  const buildCard = (skill, idx) => `
    <article
      class="skill-card"
      style="--pct:${skill.pct}%; --delay:${idx * 60}ms;"
      aria-label="${skill.name} — ${skill.level}"
    >
      <div class="skill-card__header">
        <div class="skill-card__icon-wrap" aria-hidden="true">
          <i class="fa-solid ${skill.icon}"></i>
        </div>
        <span class="skill-card__level skill-card__level--${LEVEL_CLASS[skill.level]}">${skill.level}</span>
      </div>
      <div class="skill-card__name">${skill.name}</div>
      <div class="skill-card__bar-wrap">
        <div class="skill-card__bar-info">
          <span class="skill-card__bar-desc">${skill.desc}</span>
          <span class="skill-card__bar-pct">${skill.pct}%</span>
        </div>
        <div class="skill-card__bar-track" role="progressbar" aria-valuenow="${skill.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${skill.name} proficiency ${skill.pct}%">
          <div class="skill-card__bar-fill"></div>
        </div>
      </div>
    </article>
  `;

  const buildPanel = (cat) => `
    <div class="skills__panel${cat.id === 'programming' ? ' is-active' : ''}" data-panel="${cat.id}" role="tabpanel" aria-labelledby="tab-${cat.id}">
      ${cat.skills.map((s, i) => buildCard(s, i)).join('')}
    </div>
  `;

  const buildTab = (cat) => `
    <button
      class="skills__tab${cat.id === 'programming' ? ' is-active' : ''}"
      data-tab="${cat.id}"
      id="tab-${cat.id}"
      role="tab"
      aria-selected="${cat.id === 'programming' ? 'true' : 'false'}"
      aria-controls="panel-${cat.id}"
    >
      <i class="fa-solid ${cat.icon}" aria-hidden="true"></i>
      ${cat.label}
    </button>
  `;

  const getHTML = () => `
    <section class="skills section" id="skills" aria-labelledby="skills-heading">
      <div class="container">

        <header class="section-header">
          <p class="section-label" aria-hidden="true">What I Know</p>
          <h2 class="section-title" id="skills-heading">My Skills</h2>
          <p class="section-desc">A collection of technologies and tools I have worked with over the years.</p>
        </header>

        <!-- Tabs -->
        <div class="skills__tabs" role="tablist" aria-label="Skill categories">
          ${CATEGORIES.map(buildTab).join('')}
        </div>

        <!-- Panels (rendered inside the grid via display:contents) -->
        <div class="skills__grid" id="skills-grid">
          ${CATEGORIES.map(buildPanel).join('')}
        </div>

        <footer class="skills__footer">
          <p>Always learning and adding new skills to my toolbox.</p>
          <a href="/about" class="btn btn--outline">
            <i class="fa-solid fa-user" aria-hidden="true"></i>
            Full Profile
          </a>
        </footer>

      </div>
    </section>
  `;

  // ── Tab switching ────────────────────────────────────────────────────────────
  const initTabs = () => {
    const tabs   = document.querySelectorAll('.skills__tab');
    const panels = document.querySelectorAll('.skills__panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Update tabs
        tabs.forEach(t => {
          t.classList.toggle('is-active', t.dataset.tab === target);
          t.setAttribute('aria-selected', t.dataset.tab === target ? 'true' : 'false');
        });

        // Update panels
        panels.forEach(p => {
          p.classList.toggle('is-active', p.dataset.panel === target);
        });

        // Re-trigger animations for newly visible cards
        const activePanel = document.querySelector(`.skills__panel[data-panel="${target}"]`);
        if (activePanel) {
          activePanel.querySelectorAll('.skill-card').forEach(card => {
            card.classList.remove('is-visible', 'bar-animated');
          });
          setTimeout(() => animateVisibleCards(), 50);
        }
      });
    });
  };

  // ── Card animations ──────────────────────────────────────────────────────────
  const animateVisibleCards = () => {
    const activePanel = document.querySelector('.skills__panel.is-active');
    if (!activePanel) return;

    const cards = activePanel.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
      Utils.onVisible(card, () => {
        setTimeout(() => {
          card.classList.add('is-visible');
          setTimeout(() => card.classList.add('bar-animated'), 200);
        }, i * 60);
      }, { threshold: 0.1 });
    });
  };

  // ── Init ─────────────────────────────────────────────────────────────────────
  const init = () => {
    if (!document.getElementById('skills')) return;
    initTabs();
    animateVisibleCards();
  };

  return { getHTML, init };
})();
