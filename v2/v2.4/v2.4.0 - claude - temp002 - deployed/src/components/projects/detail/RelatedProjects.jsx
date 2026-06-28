// RelatedProjects.jsx — v2.4.0
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faLayerGroup } from '@fortawesome/free-solid-svg-icons'

export default function RelatedProjects({ projects = [] }) {
  if (!projects.length) return null
  return (
    <div className="rp-wrap">
      <h3 className="rp-heading">More Projects</h3>
      <div className="rp-grid">
        {projects.map(p => {
          const accent = p.accent_color || p.accent || 'var(--accent-primary)'
          return (
            <Link key={p.id} to={`/projects/${p.slug}`} className="rp-card">
              {p.thumbnail_url
                ? <div className="rp-thumb" style={{ backgroundImage:`url(${p.thumbnail_url})` }}/>
                : <div className="rp-thumb rp-thumb--ph" style={{ background:`${accent}18` }}><FontAwesomeIcon icon={faLayerGroup} style={{ color:accent }}/></div>
              }
              <div className="rp-info">
                <div className="rp-cat" style={{ color:accent }}>{p.category}</div>
                <div className="rp-title">{p.title}</div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="rp-arrow"/>
            </Link>
          )
        })}
      </div>
      <style>{`
        .rp-wrap { margin: 1.5rem 0; }
        .rp-heading { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0 0 .9rem; font-family: var(--font-display); }
        .rp-grid { display: flex; flex-direction: column; gap: 8px; }
        .rp-card { display: flex; align-items: center; gap: .75rem; padding: .7rem; border-radius: 12px; background: var(--bg-surface-2); border: 1px solid var(--border-color); text-decoration: none; transition: all var(--transition-fast); }
        .rp-card:hover { border-color: var(--border-strong); background: var(--bg-surface-3); transform: translateX(3px); }
        .rp-thumb { width: 48px; height: 36px; border-radius: 8px; flex-shrink: 0; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .rp-info { flex: 1; min-width: 0; }
        .rp-cat { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; margin-bottom: 1px; }
        .rp-title { font-size: .83rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rp-arrow { color: var(--text-tertiary); font-size: .75rem; flex-shrink: 0; opacity: 0; transition: opacity var(--transition-fast); }
        .rp-card:hover .rp-arrow { opacity: 1; }
      `}</style>
    </div>
  )
}
