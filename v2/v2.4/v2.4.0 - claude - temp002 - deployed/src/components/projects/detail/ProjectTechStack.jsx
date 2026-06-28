// ProjectTechStack.jsx — v2.4.0
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

export default function ProjectTechStack({ techStackDetail = [], languages = [], frameworks = [], tools = [], platforms = [] }) {
  const hasDetailed = techStackDetail.length > 0
  const hasBasic    = languages.length || frameworks.length || tools.length || platforms.length

  if (!hasDetailed && !hasBasic) return null

  return (
    <div className="pts-wrap">
      <h3 className="pts-heading"><FontAwesomeIcon icon={faCode}/> Tech Stack</h3>
      {hasDetailed ? (
        <div className="pts-detailed">
          {techStackDetail.map((group, i) => (
            <div key={i} className="pts-group">
              <div className="pts-group-label">{group.category}</div>
              <div className="pts-group-items">
                {(group.items || []).map((item, j) => (
                  <a
                    key={j}
                    href={item.url || undefined}
                    target={item.url ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`pts-item ${item.url ? 'pts-item--link' : ''}`}
                  >
                    {item.icon && <img src={item.icon} alt={item.name} className="pts-item-icon"/>}
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pts-basic">
          {languages.length > 0 && <PillRow label="Languages" items={languages} color="blue"/>}
          {frameworks.length > 0 && <PillRow label="Frameworks" items={frameworks} color="purple"/>}
          {tools.length     > 0 && <PillRow label="Tools"      items={tools}      color="teal"/>}
          {platforms.length > 0 && <PillRow label="Platforms"  items={platforms}  color="orange"/>}
        </div>
      )}
      <style>{`
        .pts-wrap { margin: 1.5rem 0; }
        .pts-heading { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 1rem; display: flex; align-items: center; gap: .5rem; font-family: var(--font-display); }
        .pts-detailed { display: flex; flex-direction: column; gap: 1rem; }
        .pts-group-label { font-size: .75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .6px; margin-bottom: .5rem; }
        .pts-group-items { display: flex; flex-wrap: wrap; gap: 6px; }
        .pts-item { display: inline-flex; align-items: center; gap: .4rem; padding: .3rem .75rem; border-radius: 8px; background: var(--bg-surface-2); border: 1px solid var(--border-color); font-size: .83rem; color: var(--text-secondary); transition: all var(--transition-fast); text-decoration: none; }
        .pts-item--link:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: var(--accent-light); }
        .pts-item-icon { width: 16px; height: 16px; object-fit: contain; border-radius: 3px; }
        .pts-basic { display: flex; flex-direction: column; gap: .75rem; }
        .pts-pr { }
        .pts-pr-l { font-size: .72rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .6px; margin-bottom: .35rem; }
        .pts-pr-pills { display: flex; flex-wrap: wrap; gap: 5px; }
        .pts-pill { display: inline-block; padding: .25rem .65rem; border-radius: 99px; font-size: .78rem; font-weight: 600; border: 1px solid; }
        .pts-pill--blue   { color: var(--clr-blue);   border-color: rgba(59,130,246,.3);   background: rgba(59,130,246,.08); }
        .pts-pill--purple { color: var(--clr-purple); border-color: rgba(168,85,247,.3);  background: rgba(168,85,247,.08); }
        .pts-pill--teal   { color: var(--clr-teal);   border-color: rgba(20,184,166,.3);   background: rgba(20,184,166,.08); }
        .pts-pill--orange { color: var(--clr-orange); border-color: rgba(249,115,22,.3);  background: rgba(249,115,22,.08); }
      `}</style>
    </div>
  )
}

function PillRow({ label, items, color }) {
  return (
    <div className="pts-pr">
      <div className="pts-pr-l">{label}</div>
      <div className="pts-pr-pills">
        {items.map(item => <span key={item} className={`pts-pill pts-pill--${color}`}>{item}</span>)}
      </div>
    </div>
  )
}
