// ============================================================
// HomeSkeleton.jsx — v2.4.8
// Skeleton loading screen for the Home page.
// Matches actual Home layout: Hero + sections.
// ============================================================

export default function HomeSkeleton() {
  return (
    <div className="page-skeleton page-skeleton--home" aria-hidden="true">
      {/* Hero skeleton */}
      <div className="sk-hero">
        <div className="sk-hero__inner container-xl">
          <div className="sk-hero__left">
            <div className="sk sk-hero__eyebrow" />
            <div className="sk sk-hero__title" />
            <div className="sk sk-hero__title sk-hero__title--short" />
            <div className="sk sk-hero__subtitle" />
            <div className="sk sk-hero__subtitle sk-hero__subtitle--short" />
            <div className="sk-hero__btns">
              <div className="sk sk-hero__btn" />
              <div className="sk sk-hero__btn sk-hero__btn--outline" />
            </div>
            <div className="sk-hero__stats">
              {[1,2,3].map(i => <div key={i} className="sk sk-hero__stat" />)}
            </div>
          </div>
          <div className="sk-hero__right">
            <div className="sk sk-hero__img" />
          </div>
        </div>
      </div>

      {/* About mini skeleton */}
      <div className="sk-section">
        <div className="container-xl sk-section__two-col">
          <div className="sk-section__col">
            <div className="sk sk-label" />
            <div className="sk sk-heading" />
            <div className="sk sk-text" />
            <div className="sk sk-text sk-text--short" />
          </div>
          <div className="sk-section__col">
            {[1,2,3,4].map(i => <div key={i} className="sk sk-list-item" />)}
          </div>
        </div>
      </div>

      {/* Recent projects skeleton */}
      <div className="sk-section sk-section--alt">
        <div className="container-xl">
          <div className="sk sk-label sk-center" />
          <div className="sk sk-heading sk-center" />
          <div className="sk-card-grid">
            {[1,2,3].map(i => <div key={i} className="sk sk-proj-card" />)}
          </div>
        </div>
      </div>

      {/* Skills skeleton */}
      <div className="sk-section">
        <div className="container-xl">
          <div className="sk sk-label sk-center" />
          <div className="sk sk-heading sk-center" />
          <div className="sk-tabs">
            {[1,2,3,4].map(i => <div key={i} className="sk sk-tab" />)}
          </div>
          {[1,2,3,4,5].map(i => <div key={i} className="sk sk-skill-bar" />)}
        </div>
      </div>

      <style>{`
        .page-skeleton--home { overflow: hidden; }

        /* Hero */
        .sk-hero {
          min-height: 100vh;
          background: var(--bg-page);
          display: flex; align-items: center;
          padding: 6rem 0 3rem;
        }
        .sk-hero__inner { display: flex; gap: 3rem; align-items: center; flex-wrap: wrap; }
        .sk-hero__left  { flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: .75rem; }
        .sk-hero__right { flex: 0 0 340px; }
        .sk-hero__eyebrow   { height: 14px; width: 180px; border-radius: 6px; }
        .sk-hero__title     { height: 52px; width: 100%; border-radius: 8px; }
        .sk-hero__title--short { width: 65%; }
        .sk-hero__subtitle  { height: 16px; width: 100%; border-radius: 6px; }
        .sk-hero__subtitle--short { width: 75%; }
        .sk-hero__btns { display: flex; gap: .75rem; margin-top: .5rem; }
        .sk-hero__btn   { height: 42px; width: 140px; border-radius: 999px; }
        .sk-hero__btn--outline { width: 120px; }
        .sk-hero__stats { display: flex; gap: 1.5rem; margin-top: .5rem; }
        .sk-hero__stat  { height: 52px; flex: 1; border-radius: 10px; }
        .sk-hero__img   { height: 380px; border-radius: 20px; }

        /* Generic section */
        .sk-section { padding: 5rem 0; }
        .sk-section--alt { background: var(--bg-surface); }
        .sk-section__two-col { display: flex; gap: 3rem; flex-wrap: wrap; }
        .sk-section__col { flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: .65rem; }
        .sk-label    { height: 12px; width: 100px; border-radius: 6px; }
        .sk-heading  { height: 36px; width: 280px; border-radius: 8px; }
        .sk-text     { height: 14px; width: 100%; border-radius: 6px; }
        .sk-text--short { width: 70%; }
        .sk-center   { margin-left: auto; margin-right: auto; }
        .sk-list-item { height: 20px; width: 100%; border-radius: 6px; }

        /* Project cards */
        .sk-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 2rem; }
        .sk-proj-card { height: 320px; border-radius: 14px; }

        /* Skills */
        .sk-tabs { display: flex; gap: .5rem; margin: 1.5rem 0 1rem; }
        .sk-tab  { height: 36px; width: 90px; border-radius: 999px; }
        .sk-skill-bar { height: 18px; width: 100%; border-radius: 6px; margin-bottom: .75rem; }
      `}</style>
    </div>
  )
}
