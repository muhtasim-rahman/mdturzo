// =============================================================================
// HOME / ABOUT-MINI — JS — mdturzo.web.app v1.4.1
// Renders the brief "about me" preview section on the home page.
// =============================================================================

window.AboutMiniSection = (() => {

  const cfg   = window.SITE_CONFIG;
  const owner = cfg.owner;

  // Personal facts to highlight
  const FACTS = [
    { icon: 'fa-map-pin',     title: 'Nilphamari, Bangladesh',   sub: 'Currently located here' },
    { icon: 'fa-graduation-cap', title: 'SSC-26 Batch Student',  sub: 'Saidpur Govt. Science College' },
    { icon: 'fa-heart',       title: 'Islamic Values',           sub: 'Halal income, honesty & discipline' },
    { icon: 'fa-bullseye',    title: 'Goal: CSE Engineer',       sub: 'Full-stack developer & freelancer' },
  ];

  const buildFact = (fact) => `
    <div class="about-mini__fact">
      <div class="about-mini__fact-icon" aria-hidden="true">
        <i class="fa-solid ${fact.icon}"></i>
      </div>
      <div>
        <div class="about-mini__fact-text">${fact.title}</div>
        <div class="about-mini__fact-sub">${fact.sub}</div>
      </div>
    </div>
  `;

  const getHTML = () => `
    <section class="about-mini section" id="about-mini" aria-labelledby="about-mini-heading">
      <div class="container">
        <div class="about-mini__inner">

          <!-- Left visual -->
          <div class="about-mini__visual" aria-hidden="true">
            <div class="about-mini__blob"></div>

            <div class="about-mini__img-wrap">
              <img
                src="/assets/images/hero-back.webp"
                alt="Muhtasim Rahman"
                loading="lazy"
                width="400"
                height="500"
              />
            </div>

            <!-- Floating card: experience -->
            <div class="about-mini__float about-mini__float--top">
              <div class="about-mini__float-icon">
                <i class="fa-solid fa-code" aria-hidden="true"></i>
              </div>
              <div>
                <div class="about-mini__float-title">3+ Years Coding</div>
                <div class="about-mini__float-sub">Web Development</div>
              </div>
            </div>

            <!-- Floating card: design -->
            <div class="about-mini__float about-mini__float--bottom">
              <div class="about-mini__float-icon">
                <i class="fa-solid fa-pen-nib" aria-hidden="true"></i>
              </div>
              <div>
                <div class="about-mini__float-title">6+ Years Design</div>
                <div class="about-mini__float-sub">Graphic & Web Design</div>
              </div>
            </div>
          </div><!-- /.about-mini__visual -->

          <!-- Right content -->
          <div class="about-mini__content">

            <p class="about-mini__greeting">About Me</p>

            <h2 class="about-mini__heading" id="about-mini-heading">
              Passionate about building<br>
              <mark>meaningful digital</mark> things
            </h2>

            <p class="about-mini__text">
              My name is Muhtasim Rahman, known online as <strong>Turzo</strong>.
              I am a self-taught web developer and designer from Nilphamari, Bangladesh.
              From a young age I have been fascinated by how technology works, which led me
              to start learning web development and graphic design on my own through online resources.
            </p>

            <p class="about-mini__text">
              I value discipline, honesty, and producing quality work that speaks for itself.
              Every project I take on, I approach with care and a drive for perfection.
            </p>

            <!-- Quick facts -->
            <div class="about-mini__facts" aria-label="Quick facts about Muhtasim">
              ${FACTS.map(buildFact).join('')}
            </div>

            <!-- CTA -->
            <div class="about-mini__cta">
              <a href="/about" class="btn btn--primary">
                <i class="fa-solid fa-user" aria-hidden="true"></i>
                Learn More About Me
              </a>
              <a href="${cfg.social.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
                <i class="fa-brands fa-github" aria-hidden="true"></i>
                GitHub
              </a>
            </div>

          </div><!-- /.about-mini__content -->

        </div><!-- /.about-mini__inner -->
      </div><!-- /.container -->
    </section>
  `;

  // ── Scroll animations ────────────────────────────────────────────────────────
  const initAnimations = () => {
    const visual  = document.querySelector('.about-mini__visual');
    const content = document.querySelector('.about-mini__content');

    if (visual) {
      Utils.onVisible(visual, () => visual.classList.add('is-visible'), { threshold: 0.15 });
    }
    if (content) {
      Utils.onVisible(content, () => content.classList.add('is-visible'), { threshold: 0.15 });
    }
  };

  // ── Init ─────────────────────────────────────────────────────────────────────
  const init = () => {
    if (!document.getElementById('about-mini')) return;
    initAnimations();
  };

  return { getHTML, init };
})();
