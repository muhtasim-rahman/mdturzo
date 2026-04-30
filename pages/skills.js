// ================================================
// pages/skills.js
// ================================================
export function renderPage() {
  const tech = [
    { n:'HTML5',              e:'🌐', p:85, note:'Advanced — core of all projects'                  },
    { n:'CSS3 & Responsive',  e:'🎨', p:82, note:'Advanced — layouts, animations, custom props'      },
    { n:'JavaScript (Vanilla)',e:'⚡', p:55, note:'Intermediate — actively improving'                },
    { n:'Git & GitHub',       e:'🐙', p:80, note:'Advanced — version control, GitHub Pages'          },
    { n:'Python',             e:'🐍', p:60, note:'Intermediate — learning stage'                     },
    { n:'Bootstrap',          e:'🅱️', p:70, note:'Intermediate — responsive frameworks'              },
    { n:'Firebase',           e:'🔥', p:50, note:'Beginner–Intermediate — Auth, Realtime DB'         },
    { n:'Java',               e:'☕', p:30, note:'Beginner — basic knowledge'                        },
  ];
  const design = [
    { n:'Logo Design',          e:'🎨', p:90 },
    { n:'Banner & Poster Design',e:'🖼️', p:88 },
    { n:'Thumbnail Design',     e:'📷', p:85 },
    { n:'Video Editing',        e:'🎬', p:75 },
    { n:'Photo Editing',        e:'✨', p:82 },
  ];
  const tools = [
    {ico:'📝',lbl:'VS Code'},{ico:'🐙',lbl:'GitHub'},{ico:'🔥',lbl:'Firebase'},
    {ico:'📊',lbl:'Chart.js'},{ico:'📱',lbl:'PWA'},{ico:'📋',lbl:'G.Sheets'},
    {ico:'🌐',lbl:'Odoo'},{ico:'🅱️',lbl:'Bootstrap'},{ico:'🌍',lbl:'G.Pages'},
  ];

  return `
<div class="page-wrap">
  <section class="section skills-section">
    <div class="container">
      <div style="margin-bottom:3rem" data-aos>
        <span class="section-label">// my_skills</span>
        <h1 class="section-title">Skills & <span>Expertise</span></h1>
        <div class="divider"></div>
        <p class="section-sub">Full breakdown of my technical and creative skill set.</p>
      </div>

      <!-- Technical -->
      <div style="margin-bottom:4rem">
        <p style="font-size:.78rem;font-family:var(--font-code);color:var(--text-muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:2rem">// technical_skills</p>
        <div class="skills-layout">
          <div class="skill-bars" data-stagger>
            ${tech.map(s => `
              <div class="sb-item">
                <div class="sb-head">
                  <span class="sb-name"><span>${s.e}</span>${s.n}</span>
                  <span class="sb-pct">${s.p}%</span>
                </div>
                <div class="sb-track"><div class="bar-fill" style="width:${s.p}%"></div></div>
                <p class="sb-note">${s.note}</p>
              </div>`).join('')}
          </div>
          <div class="tools-col" data-aos="slide-right">
            <p class="tools-label">// tools & platforms</p>
            <div class="tools-grid">
              ${tools.map(t=>`<div class="tool-badge"><span class="ico">${t.ico}</span><span class="lbl">${t.lbl}</span></div>`).join('')}
            </div>
            <div class="learn-box">
              <p class="learn-box-title">📚 Learning Queue (2026)</p>
              <div class="learn-list">
                ${['SASS / SCSS','Vue.js','Node.js','Express.js','Angular'].map(t=>
                  `<div class="learn-item"><div class="learn-dot"></div><span>${t}</span></div>`
                ).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Design -->
      <div style="margin-bottom:4rem" data-aos>
        <p style="font-size:.78rem;font-family:var(--font-code);color:var(--text-muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:2rem">// design & creative</p>
        <div class="skill-bars" style="max-width:580px">
          ${design.map(s => `
            <div class="sb-item">
              <div class="sb-head">
                <span class="sb-name"><span>${s.e}</span>${s.n}</span>
                <span class="sb-pct">${s.p}%</span>
              </div>
              <div class="sb-track"><div class="bar-fill" style="width:${s.p}%"></div></div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Languages -->
      <div data-aos>
        <p style="font-size:.78rem;font-family:var(--font-code);color:var(--text-muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:1.5rem">// languages</p>
        <div style="display:flex;gap:1.25rem;flex-wrap:wrap">
          ${[
            {flag:'🇧🇩',lang:'বাংলা (Bengali)',level:'Native'},
            {flag:'🇬🇧',lang:'English',level:'Advanced'},
            {flag:'🇮🇳',lang:'Hindi',level:'Conversational'},
          ].map(l=>`
            <div class="card" style="flex:1;min-width:160px;text-align:center;padding:1.5rem">
              <div style="font-size:2rem;margin-bottom:.5rem">${l.flag}</div>
              <div style="font-weight:700;font-size:.95rem;margin-bottom:.45rem">${l.lang}</div>
              <span class="badge badge-accent">${l.level}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </section>
</div>`;
}

export function initPage() {}
