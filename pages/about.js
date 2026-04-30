// ================================================
// pages/about.js
// ================================================
export function renderPage() {
  const edu = [
    { school:'Saidpur Govt. Science College (SGSC)', year:'2021–2026', cls:'Class 6–10 · SSC-26 Batch' },
    { school:'Lions School & College, Saidpur',       year:'2020',      cls:'Class 6 (briefly)' },
    { school:'Tulshiram Govt. Primary School',         year:'2018–2019', cls:'Class 4–5 · PSC Passed' },
    { school:'St. Geroza School, Saidpur',             year:'2013–2017', cls:'Nursery → Class 3' },
  ];
  return `
<div class="page-wrap">
  <section class="section about-section">
    <div class="container">
      <div style="margin-bottom:3rem" data-aos>
        <span class="section-label">// about_me</span>
        <h1 class="section-title">About <span>Muhtasim</span></h1>
        <div class="divider"></div>
        <p class="section-sub">Student · Developer · Designer · Dreamer</p>
      </div>

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
          <span class="badge badge-accent">🇧🇩 Saidpur, Bangladesh</span>

          <p class="about-bio">
            My name is Muhtasim Rahman, and I am a student at Saidpur Govt. Science College.
            I possess a strong passion for programming and web development. At the age of 17, I am
            actively mastering HTML, CSS, JavaScript, and expanding into Python and modern frameworks
            to prepare for a future in computer science.
          </p>
          <p class="about-bio">
            With over four years of experience in logo, banner, and photo editing, as well as
            specialized skills in video editing, I blend technical expertise with creative flair.
            I develop impactful websites combining functionality with captivating design, while
            adhering to ethical and Halal principles.
          </p>
          <p class="about-bio">
            From childhood I was interested in technical things — originally wanting to be an
            electrical engineer, I later discovered my true passion was in Computer Science and
            web development. I self-learn through online resources, primarily YouTube, and build
            real projects to solidify my understanding.
          </p>

          <h3 style="font-size:1rem;margin-bottom:.9rem">🎓 Education Timeline</h3>
          <div class="edu-timeline">
            ${edu.map(e => `
              <div class="edu-item">
                <div class="edu-dot-col"><div class="edu-dot"></div><div class="edu-line"></div></div>
                <div>
                  <div class="edu-school">${e.school}</div>
                  <div class="edu-year">${e.year}</div>
                  <div class="edu-class">${e.cls}</div>
                </div>
              </div>`).join('')}
          </div>

          <h3 style="font-size:1rem;margin:.9rem 0">🌟 Experience</h3>
          <ul class="about-list">
            <li><i class="ri-code-line"></i><span><strong>Web Development:</strong> 1+ year active development</span></li>
            <li><i class="ri-palette-line"></i><span><strong>Graphic Design:</strong> 4+ years (logos, banners, thumbnails)</span></li>
            <li><i class="ri-film-line"></i><span><strong>Video Editing:</strong> 2.5+ years</span></li>
          </ul>

          <h3 style="font-size:1rem;margin:.9rem 0">🤲 Interests & Values</h3>
          <div style="display:flex;flex-wrap:wrap;gap:.45rem">
            ${['🤲 Prayer','💻 Programming','☪️ Islamic Values','🏏 Cricket','⚽ Football','🏊 Swimming','🚴 Cycling','✈️ Travelling'].map(h =>
              `<span class="badge badge-accent">${h}</span>`
            ).join('')}
          </div>

          <div style="display:flex;gap:.85rem;flex-wrap:wrap;margin-top:1.5rem">
            <a href="/contact" class="btn btn-primary"><i class="ri-mail-send-line"></i>Contact Me</a>
            <a href="https://github.com/muhtasim-rahman" target="_blank" rel="noopener" class="btn btn-outline"><i class="ri-github-line"></i>GitHub</a>
            <a href="https://mdturzo.odoo.com" target="_blank" rel="noopener" class="btn btn-outline"><i class="ri-global-line"></i>Old Portfolio</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`;
}

export function initPage() {}
