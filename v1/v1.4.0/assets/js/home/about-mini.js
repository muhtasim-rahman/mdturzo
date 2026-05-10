// =============================================================================
// HOME / ABOUT-MINI — Full Implementation v1.4.0
// Short profile intro with key facts and a link to the full about page
// =============================================================================

const AboutMiniSection = (() => {

  const render = () => {
    const owner = window.SITE_CONFIG.owner;
    const age   = owner.age;

    const facts = [
      {
        icon: 'fa-solid fa-location-dot',
        html: `Based in <strong>${owner.location}</strong>`,
      },
      {
        icon: 'fa-solid fa-graduation-cap',
        html: `SSC-26 batch student at <strong>Saidpur Govt. Science College</strong>`,
      },
      {
        icon: 'fa-solid fa-laptop-code',
        html: `<strong>3+ years</strong> of web development & <strong>6+ years</strong> of graphic design`,
      },
      {
        icon: 'fa-solid fa-star-and-crescent',
        html: `Guided by <strong>Islamic principles</strong> — committed to halal, ethical work`,
      },
      {
        icon: 'fa-solid fa-bullseye',
        html: `Dream goal: <strong>CSE Engineer</strong> &amp; full-stack web developer`,
      },
    ];

    return `
      <section class="about-mini" id="about-mini">
        <div class="container">
          <div class="about-mini__inner">

            <!-- Image block -->
            <div class="about-mini__img-block">
              <div class="about-mini__img-frame">
                <div class="about-mini__img-deco" aria-hidden="true"></div>
                <img
                  src="/assets/images/muhtasim/photo-04.webp"
                  alt="${owner.displayName}"
                  class="about-mini__img"
                  loading="lazy"
                />
                <div class="about-mini__exp-badge" aria-label="${age} years old developer">
                  <div class="about-mini__exp-num">${age}</div>
                  <div class="about-mini__exp-lbl">Years Old</div>
                </div>
              </div>
            </div>

            <!-- Content block -->
            <div class="about-mini__content">

              <span class="about-mini__pretitle">
                <i class="fa-solid fa-user"></i>
                About Me
              </span>

              <h2 class="about-mini__title">
                Passionate Developer &amp; Designer from Bangladesh
              </h2>

              <p class="about-mini__bio">
                My name is ${owner.displayName} — known online as
                <strong>Turzo</strong>. From a young age I have been drawn to
                technology and creativity. I self-taught web development through
                online resources and have since built numerous projects spanning
                progressive web apps, institutional websites, and developer tools.
              </p>

              <ul class="about-mini__facts" role="list">
                ${facts.map(f => `
                  <li class="about-mini__fact">
                    <span class="about-mini__fact-icon" aria-hidden="true">
                      <i class="${f.icon}"></i>
                    </span>
                    <span class="about-mini__fact-text">${f.html}</span>
                  </li>
                `).join('')}
              </ul>

              <div class="about-mini__actions">
                <a href="/about" class="btn btn--primary">
                  <i class="fa-solid fa-user-circle"></i>
                  Learn More
                </a>
                <a href="${owner.github}" target="_blank" rel="noopener" class="btn btn--outline">
                  <i class="fa-brands fa-github"></i>
                  GitHub Profile
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>
    `;
  };

  const init = () => {
    // Scroll-reveal for facts
    const facts = document.querySelectorAll('.about-mini__fact');
    if (!facts.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    facts.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateX(-16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  };

  return { render, init };

})();

window.AboutMiniSection = AboutMiniSection;
