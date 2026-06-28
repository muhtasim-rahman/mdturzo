// ProjectsSkeletons.jsx — v2.4.0

export function ProjectCardSkeleton() {
  return (
    <div className="psk-card">
      <div className="psk-thumb"/>
      <div className="psk-body">
        <div className="psk-line psk-line--cat"/>
        <div className="psk-line psk-line--title"/>
        <div className="psk-line psk-line--desc"/>
        <div className="psk-line psk-line--desc psk-line--short"/>
        <div className="psk-tags">
          <div className="psk-tag"/><div className="psk-tag"/><div className="psk-tag"/>
        </div>
        <div className="psk-footer">
          <div className="psk-stat"/><div className="psk-stat"/><div className="psk-stat"/>
        </div>
      </div>
      <style>{`
        .psk-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); overflow: hidden; }
        .psk-thumb { height: 200px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: psk-s 1.4s infinite linear; }
        .psk-body { padding: 1rem; display: flex; flex-direction: column; gap: .5rem; }
        .psk-line { height: 13px; border-radius: 6px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: psk-s 1.4s infinite linear; }
        .psk-line--cat   { width: 35%; height: 10px; }
        .psk-line--title { width: 75%; height: 18px; margin-top: 2px; }
        .psk-line--desc  { width: 100%; }
        .psk-line--short { width: 60%; }
        .psk-tags { display: flex; gap: 6px; margin-top: 4px; }
        .psk-tag  { width: 60px; height: 22px; border-radius: 99px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: psk-s 1.4s infinite linear; }
        .psk-footer { display: flex; gap: 10px; margin-top: 6px; }
        .psk-stat { width: 48px; height: 12px; border-radius: 4px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: psk-s 1.4s infinite linear; }
        @keyframes psk-s { to { background-position: -200% 0; } }
      `}</style>
    </div>
  )
}

export function ProjectsGridSkeleton({ count = 9 }) {
  return (
    <div className="pgsk-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i}/>
      ))}
      <style>{`
        .pgsk-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 960px) { .pgsk-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pgsk-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

export function ProjectsListSkeleton({ count = 6 }) {
  return (
    <div className="plsk-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="plsk-row">
          <div className="plsk-thumb"/>
          <div className="plsk-body">
            <div className="plsk-line plsk-line--cat"/>
            <div className="plsk-line plsk-line--title"/>
            <div className="plsk-line plsk-line--desc"/>
            <div className="plsk-tags">
              <div className="plsk-tag"/><div className="plsk-tag"/><div className="plsk-tag"/>
            </div>
          </div>
          <div className="plsk-actions">
            <div className="plsk-btn"/><div className="plsk-btn"/>
          </div>
        </div>
      ))}
      <style>{`
        .plsk-list { display: flex; flex-direction: column; gap: .75rem; }
        .plsk-row { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 1rem; display: flex; gap: 1rem; align-items: center; }
        .plsk-thumb { width: 100px; height: 70px; border-radius: var(--radius-md); flex-shrink: 0;
          background: var(--sk-base); background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: plsk-s 1.4s infinite linear; }
        .plsk-body { flex: 1; display: flex; flex-direction: column; gap: .4rem; min-width: 0; }
        .plsk-line { border-radius: 5px; background: var(--sk-base); background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%); background-size: 200% 100%; animation: plsk-s 1.4s infinite linear; }
        .plsk-line--cat   { width: 30%; height: 10px; }
        .plsk-line--title { width: 55%; height: 18px; }
        .plsk-line--desc  { width: 85%; height: 13px; }
        .plsk-tags { display: flex; gap: 6px; }
        .plsk-tag { width: 52px; height: 20px; border-radius: 99px; background: var(--sk-base); background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%); background-size: 200% 100%; animation: plsk-s 1.4s infinite linear; }
        .plsk-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .plsk-btn { width: 80px; height: 30px; border-radius: 8px; background: var(--sk-base); background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%); background-size: 200% 100%; animation: plsk-s 1.4s infinite linear; }
        @keyframes plsk-s { to { background-position: -200% 0; } }
        @media (max-width: 560px) { .plsk-thumb { display: none; } .plsk-actions { display: none; } }
      `}</style>
    </div>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <div className="pdsk-wrap">
      <div className="pdsk-hero"/>
      <div className="pdsk-content">
        <div className="pdsk-main">
          <div className="pdsk-line pdsk-line--title"/>
          <div className="pdsk-line pdsk-line--sub"/>
          <div className="pdsk-line pdsk-line--full"/>
          <div className="pdsk-line pdsk-line--full"/>
          <div className="pdsk-line pdsk-line--med"/>
          <br/>
          <div className="pdsk-features">
            {[1,2,3,4].map(i=><div key={i} className="pdsk-feature-card"/>)}
          </div>
        </div>
        <div className="pdsk-sidebar">
          <div className="pdsk-sb-card"/>
          <div className="pdsk-sb-card pdsk-sb-card--short"/>
          <div className="pdsk-sb-card"/>
        </div>
      </div>
      <style>{`
        .pdsk-wrap { }
        .pdsk-hero { height: 300px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: pdsk-s 1.4s infinite linear;
          border-radius: var(--radius-2xl); margin-bottom: 2rem; }
        .pdsk-content { display: grid; grid-template-columns: 1fr 300px; gap: 2rem; }
        @media (max-width: 900px) { .pdsk-content { grid-template-columns: 1fr; } .pdsk-sidebar { display: none; } }
        .pdsk-main { display: flex; flex-direction: column; gap: .75rem; }
        .pdsk-line { border-radius: 8px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: pdsk-s 1.4s infinite linear; height: 16px; }
        .pdsk-line--title { width: 50%; height: 32px; }
        .pdsk-line--sub   { width: 35%; height: 16px; }
        .pdsk-line--full  { width: 100%; }
        .pdsk-line--med   { width: 70%; }
        .pdsk-features { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; margin-top: 1rem; }
        .pdsk-feature-card { height: 100px; border-radius: var(--radius-lg); background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: pdsk-s 1.4s infinite linear; }
        .pdsk-sidebar { display: flex; flex-direction: column; gap: 1rem; }
        .pdsk-sb-card { height: 180px; border-radius: var(--radius-xl); background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: pdsk-s 1.4s infinite linear; }
        .pdsk-sb-card--short { height: 120px; }
        @keyframes pdsk-s { to { background-position: -200% 0; } }
      `}</style>
    </div>
  )
}
