// ============================================================
// ProjectDetailSkeleton.jsx — v2.4.8
// Skeleton loading screen for the Project Detail page.
// Matches the 2-col layout (main + sticky sidebar on desktop).
// ============================================================

export default function ProjectDetailSkeleton() {
  return (
    <div className="page-skeleton page-skeleton--proj-detail" aria-hidden="true">
      <div className="container-xl sk-pd-wrapper">
        {/* Breadcrumb */}
        <div className="sk-pd-breadcrumb">
          <div className="sk" style={{height:12, width:160, borderRadius:6}} />
        </div>

        {/* Carousel placeholder */}
        <div className="sk sk-pd-carousel" />

        <div className="sk-pd-body">
          {/* Main column */}
          <div className="sk-pd-main">
            <div className="sk" style={{height:40, width:'80%', borderRadius:8, marginBottom:'.5rem'}} />
            <div className="sk" style={{height:14, width:'60%', borderRadius:6, marginBottom:'.75rem'}} />
            <div className="sk" style={{height:44, borderRadius:10, marginBottom:'1.25rem'}} />
            {/* Content lines */}
            {[100,95,80,100,70,90,85,60].map((w,i) => (
              <div key={i} className="sk" style={{height:14, width:`${w}%`, borderRadius:6, marginBottom:'.5rem'}} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="sk-pd-sidebar">
            <div className="sk sk-pd-sidebar-card" />
            <div className="sk sk-pd-sidebar-card sk-pd-sidebar-card--sm" style={{marginTop:'1rem'}} />
          </div>
        </div>
      </div>

      <style>{`
        .page-skeleton--proj-detail { overflow: hidden; padding-top: var(--navbar-h); }
        .sk-pd-wrapper { padding-top: 1.5rem; padding-bottom: 3rem; }
        .sk-pd-breadcrumb { margin-bottom: 1rem; }
        .sk-pd-carousel { height: 420px; border-radius: 16px; margin-bottom: 2rem; }
        .sk-pd-body { display: flex; gap: 2rem; align-items: flex-start; }
        .sk-pd-main { flex: 1; min-width: 0; }
        .sk-pd-sidebar { flex: 0 0 280px; position: sticky; top: calc(var(--navbar-h) + 1rem); }
        .sk-pd-sidebar-card { height: 360px; border-radius: 14px; }
        .sk-pd-sidebar-card--sm { height: 200px; }

        @media (max-width: 1023px) {
          .sk-pd-body { flex-direction: column; }
          .sk-pd-sidebar { position: static; flex: none; width: 100%; }
          .sk-pd-sidebar-card { height: 200px; }
        }
      `}</style>
    </div>
  )
}
