// ============================================================
// ProjectsSkeleton.jsx — v2.4.8
// Skeleton loading screen for the Projects page.
// ============================================================

export default function ProjectsSkeleton() {
  return (
    <div className="page-skeleton page-skeleton--projects" aria-hidden="true">
      {/* Banner */}
      <div className="sk-proj-banner">
        <div className="container-xl">
          <div className="sk" style={{height:12, width:120, borderRadius:6, marginBottom:'.65rem'}} />
          <div className="sk" style={{height:44, width:300, borderRadius:8, marginBottom:'.5rem'}} />
          <div className="sk" style={{height:14, width:220, borderRadius:6}} />
        </div>
      </div>

      {/* Controls skeleton */}
      <div className="sk-proj-controls container-xl">
        <div className="sk" style={{height:42, flex:1, borderRadius:999}} />
        <div className="sk" style={{height:42, width:160, borderRadius:10}} />
        <div className="sk" style={{height:42, width:80, borderRadius:10}} />
      </div>

      {/* Category pills */}
      <div className="sk-proj-pills container-xl">
        {[80,100,70,120,90,80].map((w,i) => (
          <div key={i} className="sk" style={{height:32, width:w, borderRadius:999}} />
        ))}
      </div>

      {/* Card grid */}
      <div className="sk-proj-grid container-xl">
        {Array.from({length:6}).map((_,i) => (
          <div key={i} className="sk sk-proj-card" />
        ))}
      </div>

      <style>{`
        .page-skeleton--projects { overflow: hidden; padding-top: var(--navbar-h); }
        .sk-proj-banner { padding: 3rem 0 1.5rem; }
        .sk-proj-controls {
          display: flex; gap: .75rem; align-items: center;
          margin-bottom: 1rem; flex-wrap: wrap;
        }
        .sk-proj-pills { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .sk-proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem; margin-bottom: 3rem;
        }
        .sk-proj-card { height: 320px; border-radius: 14px; }
      `}</style>
    </div>
  )
}
