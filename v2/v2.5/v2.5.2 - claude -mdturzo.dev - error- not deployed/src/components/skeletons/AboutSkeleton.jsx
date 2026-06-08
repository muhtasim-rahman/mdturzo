// ============================================================
// AboutSkeleton.jsx — v2.4.8
// Skeleton loading screen for the About page.
// ============================================================

export default function AboutSkeleton() {
  return (
    <div className="page-skeleton page-skeleton--about" aria-hidden="true">
      {/* Hero */}
      <div className="sk-ab-hero">
        <div className="container-xl sk-ab-hero__inner">
          <div className="sk-ab-hero__left">
            <div className="sk sk-ab-eyebrow" />
            <div className="sk sk-ab-name" />
            <div className="sk sk-ab-name sk-ab-name--short" />
            <div className="sk sk-ab-bio" />
            <div className="sk sk-ab-bio sk-ab-bio--short" />
            <div className="sk-ab-facts">
              {[1,2,3,4].map(i => <div key={i} className="sk sk-ab-fact" />)}
            </div>
          </div>
          <div className="sk-ab-hero__right">
            <div className="sk sk-ab-img" />
          </div>
        </div>
      </div>

      {/* Story section */}
      <div className="sk-section sk-section--alt">
        <div className="container-xl sk-ab-two-col">
          <div style={{flex:1, display:'flex', flexDirection:'column', gap:'.65rem'}}>
            {[1,2,3,4,5].map(i => <div key={i} className="sk" style={{height:14, borderRadius:6}} />)}
          </div>
          <div style={{flex:1, display:'flex', flexDirection:'column', gap:'.65rem'}}>
            {[1,2,3].map(i => <div key={i} className="sk" style={{height:60, borderRadius:10}} />)}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="sk-section">
        <div className="container-xl" style={{display:'flex', flexDirection:'column', gap:'.75rem', alignItems:'center'}}>
          <div className="sk" style={{height:12, width:100, borderRadius:6}} />
          <div className="sk" style={{height:36, width:260, borderRadius:8}} />
          <div className="sk" style={{height:280, width:'100%', maxWidth:640, borderRadius:16, marginTop:'1rem'}} />
        </div>
      </div>

      {/* Skills */}
      <div className="sk-section sk-section--alt">
        <div className="container-xl">
          <div className="sk" style={{height:12, width:100, borderRadius:6, marginBottom:'.5rem'}} />
          <div className="sk" style={{height:36, width:220, borderRadius:8, marginBottom:'1.5rem'}} />
          <div style={{display:'flex', gap:'.5rem', marginBottom:'1.5rem'}}>
            {[1,2,3,4].map(i => <div key={i} className="sk" style={{height:36, width:80, borderRadius:999}} />)}
          </div>
          {[1,2,3,4,5].map(i => <div key={i} className="sk" style={{height:18, borderRadius:6, marginBottom:'.75rem'}} />)}
        </div>
      </div>

      <style>{`
        .page-skeleton--about { overflow: hidden; }
        .sk-ab-hero {
          min-height: 90vh; display: flex; align-items: center;
          background: var(--bg-page); padding: 6rem 0 3rem;
        }
        .sk-ab-hero__inner { display: flex; gap: 3rem; align-items: center; flex-wrap: wrap; }
        .sk-ab-hero__left  { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: .75rem; }
        .sk-ab-hero__right { flex: 0 0 300px; }
        .sk-ab-eyebrow { height: 12px; width: 140px; border-radius: 6px; }
        .sk-ab-name    { height: 48px; width: 100%; border-radius: 8px; }
        .sk-ab-name--short { width: 60%; }
        .sk-ab-bio     { height: 14px; width: 100%; border-radius: 6px; }
        .sk-ab-bio--short { width: 80%; }
        .sk-ab-facts   { display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; margin-top: .5rem; }
        .sk-ab-fact    { height: 48px; border-radius: 10px; }
        .sk-ab-img     { height: 360px; border-radius: 20px; }
        .sk-ab-two-col { display: flex; gap: 3rem; flex-wrap: wrap; }
        .sk-section    { padding: 4rem 0; }
        .sk-section--alt { background: var(--bg-surface); }
      `}</style>
    </div>
  )
}
