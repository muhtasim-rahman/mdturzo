// =============================================================================
// HOME / SKILLS — Full Implementation v1.4.0
// Animated progress bars, star ratings, intersection observer
// =============================================================================

const SkillsSection = (() => {

  // Skill data — from about.md self-ratings, converted to percentages
  const SKILLS = [
    {
      name: 'Artificial Intelligence',
      category: 'Tools & Methods',
      icon: 'fa-solid fa-brain',
      stars: 4.5,
      pct: 90,
    },
    {
      name: 'HTML5',
      category: 'Web Development',
      icon: 'fa-brands fa-html5',
      stars: 4,
      pct: 80,
    },
    {
      name: 'CSS3',
      category: 'Web Development',
      icon: 'fa-brands fa-css3-alt',
      stars: 4,
      pct: 80,
    },
    {
      name: 'JavaScript',
      category: 'Web Development',
      icon: 'fa-brands fa-js',
      stars: 2,
      pct: 40,
    },
    {
      name: 'Python',
      category: 'Programming',
      icon: 'fa-brands fa-python',
      stars: 3,
      pct: 60,
    },
    {
      name: 'Java',
      category: 'Programming',
      icon: 'fa-brands fa-java',
      stars: 2,
      pct: 40,
    },
    {
      name: 'Git & GitHub',
      category: 'Version Control',
      icon: 'fa-brands fa-git-alt',
      stars: 4,
      pct: 80,
    },
    {
      name: 'Graphic Design',
      category: 'Creative',
      icon: 'fa-solid fa-pen-ruler',
      stars: 4,
      pct: 78,
    },
    {
      name: 'Video Editing',
      category: 'Creative',
      icon: 'fa-solid fa-film',
      stars: 3.5,
      pct: 70,
    },
    {
      name: 'Firebase',
      category: 'Backend & Cloud',
      icon: 'fa-solid fa-fire',
      stars: 3,
      pct: 60,
    },
  ];

  // ── Star rating HTML ──────────────────────────────────────────────────────

  const starsHTML = (rating) => {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        html += `<i class="fa-solid fa-star skill-card__star filled"></i>`;
      } else if (i - rating < 1 && i - rating > 0) {
        html += `<i class="fa-solid fa-star-half-stroke skill-card__star half-fill"></i>`;
      } else {
        html += `<i class="fa-regular fa-star skill-card__star"></i>`;
      }
    }
    return html;
  };

  // ── Build card HTML ───────────────────────────────────────────────────────

  const cardHTML = (skill) => `
    <article class="skill-card" data-skill-pct="${skill.pct}">
      <div class="skill-card__top">
        <div class="skill-card__icon-wrap">
          <i class="${skill.icon}"></i>
        </div>
        <div class="skill-card__name-group">
          <span class="skill-card__name">${skill.name}</span>
          <span class="skill-card__category">${skill.category}</span>
        </div>
        <span class="skill-card__pct">${skill.pct}%</span>
      </div>
      <div class="skill-card__bar-wrap">
        <div class="skill-card__bar-track">
          <div class="skill-card__bar-fill" style="width:0%"></div>
        </div>
        <div class="skill-card__stars" aria-label="${skill.stars} out of 5 stars">
          ${starsHTML(skill.stars)}
        </div>
      </div>
    </article>
  `;

  // ── Animate bars when visible ─────────────────────────────────────────────

  const initProgressBars = () => {
    const cards = document.querySelectorAll('.skill-card[data-skill-pct]');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        if (card.dataset.animated) return;
        card.dataset.animated = '1';

        const pct  = parseInt(card.dataset.skillPct, 10);
        const bar  = card.querySelector('.skill-card__bar-fill');
        if (bar) {
          // Small delay for stagger effect
          const delay = Array.from(cards).indexOf(card) * 80;
          setTimeout(() => { bar.style.width = pct + '%'; }, delay);
        }
        observer.unobserve(card);
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const render = () => `
    <section class="skills" id="skills">
      <div class="container">

        <div class="section-header">
          <span class="section-label">
            <i class="fa-solid fa-layer-group"></i>
            My Skills
          </span>
          <h2 class="section-title">Technologies &amp; Tools I Work With</h2>
          <p class="section-desc">
            A self-assessed overview of my current skills. Always learning and improving.
          </p>
        </div>

        <div class="skills__grid">
          ${SKILLS.map(cardHTML).join('')}
        </div>

      </div>
    </section>
  `;

  // ── Init ──────────────────────────────────────────────────────────────────

  const init = () => {
    initProgressBars();
  };

  return { render, init };

})();

window.SkillsSection = SkillsSection;
