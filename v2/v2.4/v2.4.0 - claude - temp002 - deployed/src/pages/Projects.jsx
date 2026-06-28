// Projects.jsx — v2.4.0 — Full rebuild
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGrip, faList, faMagnifyingGlass, faXmark,
  faChevronDown, faSliders, faArrowRight, faArrowRotateLeft,
  faLayerGroup, faFire, faClock, faStar, faEye, faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import { ProjectsGridSkeleton, ProjectsListSkeleton } from '../components/skeletons/ProjectsSkeletons.jsx'
import { useProjects } from '../hooks/useProjects.js'
import { buildMeta } from '../utils/seo.js'
import { SITE_CONFIG } from '../config/site.config.js'

const SORT_OPTIONS = [
  { value: 'created_at', label: 'Newest',      icon: faClock },
  { value: 'oldest',     label: 'Oldest',      icon: faClock },
  { value: 'views',      label: 'Most viewed', icon: faEye   },
  { value: 'likes',      label: 'Most liked',  icon: faFire  },
  { value: 'rating',     label: 'Top rated',   icon: faStar  },
]

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = SORT_OPTIONS.find(o => o.value === value) || SORT_OPTIONS[0]
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])
  return (
    <div className="sd-wrap" ref={ref}>
      <button className="sd-btn" onClick={() => setOpen(p=>!p)}>
        <FontAwesomeIcon icon={faSliders}/>
        {current.label}
        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize:'.7rem', opacity:.6, transition:'transform .2s', transform: open?'rotate(180deg)':'none' }}/>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="sd-menu" initial={{ opacity:0, y:-6, scale:.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-6, scale:.97 }} transition={{ duration:.15 }}>
            {SORT_OPTIONS.map(opt => (
              <button key={opt.value} className={`sd-item ${value===opt.value?'sd-item--active':''}`} onClick={() => { onChange(opt.value); setOpen(false) }}>
                <FontAwesomeIcon icon={opt.icon} className="sd-item-icon"/> {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectListCard({ project }) {
  if (!project) return null
  const accent = project.accent_color || project.accent || 'var(--accent-primary)'
  return (
    <motion.div className="pl-row" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:.22 }}>
      {project.thumbnail_url
        ? <div className="pl-thumb" style={{ backgroundImage:`url(${project.thumbnail_url})` }}/>
        : <div className="pl-thumb-ph" style={{ background:`${accent}20` }}><FontAwesomeIcon icon={faLayerGroup} style={{ color:accent, fontSize:'1.4rem' }}/></div>
      }
      <div className="pl-body">
        <div className="pl-meta">
          {project.category && <span className="pl-cat" style={{ color:accent, borderColor:`${accent}40`, background:`${accent}10` }}>{project.category}</span>}
          {project.is_wip && <span className="pl-badge pl-badge--wip">WIP</span>}
          {project.is_ongoing && <span className="pl-badge pl-badge--live">Active</span>}
          {project.is_open_source && <span className="pl-badge pl-badge--oss">Open Source</span>}
        </div>
        <h3 className="pl-title">{project.title}</h3>
        <p className="pl-desc">{project.short_description}</p>
        <div className="pl-footer">
          <div className="pl-tags">{project.tags?.slice(0,5).map(t=><span key={t} className="pl-tag">#{t}</span>)}</div>
          <div className="pl-stats">
            {project.views_count>0 && <span className="pl-stat"><FontAwesomeIcon icon={faEye}/> {project.views_count}</span>}
            {project.likes_count>0 && <span className="pl-stat"><FontAwesomeIcon icon={faFire}/> {project.likes_count}</span>}
            {project.rating_avg>0 && <span className="pl-stat"><FontAwesomeIcon icon={faStar}/> {parseFloat(project.rating_avg).toFixed(1)}</span>}
          </div>
        </div>
      </div>
      <div className="pl-actions">
        <Link to={`/projects/${project.slug}`} className="pl-btn pl-btn--primary">View <FontAwesomeIcon icon={faArrowRight}/></Link>
        {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="pl-btn pl-btn--ghost">GitHub</a>}
        {project.live_link   && <a href={project.live_link}   target="_blank" rel="noopener noreferrer" className="pl-btn pl-btn--ghost">Live</a>}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const {
    projects, categories, totalCount,
    loading, loadingMore, error, hasMore,
    search, setSearch, category, setCategory,
    sortBy, setSortBy, viewMode, setViewMode,
    loadMore, retry, clearFilters, hasActiveFilters,
  } = useProjects()

  const loadMoreRef = useRef(null)
  const meta = buildMeta({
    title: 'Projects',
    description: `Explore ${totalCount||'all'} projects by ${SITE_CONFIG.owner.displayName} — PWAs, web apps, dev tools, and more.`,
    url: `${SITE_CONFIG.siteURL}/projects`,
  })

  useEffect(() => {
    const el = loadMoreRef.current; if (!el) return
    const obs = new IntersectionObserver(ents => { if (ents[0].isIntersecting && hasMore && !loadingMore && !loading) loadMore() }, { threshold:.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [hasMore, loadingMore, loading, loadMore])

  return (
    <VisibilityGuard page="projects">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description}/>
        <link rel="canonical" href={meta.url}/>
        <meta property="og:title" content={meta.title}/>
        <meta property="og:description" content={meta.description}/>
      </Helmet>
      <div className="projects-page">
        <motion.div className="prj-hero" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}>
          <div className="prj-hero-inner">
            <div>
              <div className="prj-eyebrow"><span className="prj-dot"/>Portfolio</div>
              <h1 className="prj-title">Projects</h1>
              <p className="prj-sub">A collection of work spanning web apps, PWAs, developer tools, design, and experiments.{totalCount>0 && <span className="prj-count-pill">{totalCount} projects</span>}</p>
            </div>
            <div className="prj-view-btns">
              <button className={`prj-vbtn ${viewMode==='grid'?'prj-vbtn--on':''}`} onClick={()=>setViewMode('grid')} title="Grid view"><FontAwesomeIcon icon={faGrip}/></button>
              <button className={`prj-vbtn ${viewMode==='list'?'prj-vbtn--on':''}`} onClick={()=>setViewMode('list')} title="List view"><FontAwesomeIcon icon={faList}/></button>
            </div>
          </div>
        </motion.div>

        <div className="prj-container">
          <motion.div className="prj-controls" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4, delay:.1 }}>
            <div className="prj-search-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="prj-si"/>
              <input type="search" className="prj-si-input" placeholder="Search projects, tags, tech…" value={search} onChange={e=>setSearch(e.target.value)} aria-label="Search projects"/>
              {search && <button className="prj-si-clear" onClick={()=>setSearch('')}><FontAwesomeIcon icon={faXmark}/></button>}
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy}/>
          </motion.div>

          {categories.length>0 && (
            <motion.div className="prj-cats" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.4, delay:.15 }}>
              <button className={`prj-cp ${category==='All'?'prj-cp--on':''}`} onClick={()=>setCategory('All')}>All<span className="prj-cc">{totalCount}</span></button>
              {categories.map(c=>(
                <button key={c.category} className={`prj-cp ${category===c.category?'prj-cp--on':''}`} onClick={()=>setCategory(c.category)}>
                  {c.category}<span className="prj-cc">{c.count}</span>
                </button>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div className="prj-fstrip" initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}>
                <span className="prj-fl">Active:</span>
                {category!=='All' && <span className="prj-fc">{category}<button onClick={()=>setCategory('All')}><FontAwesomeIcon icon={faXmark}/></button></span>}
                {search && <span className="prj-fc">"{search}"<button onClick={()=>setSearch('')}><FontAwesomeIcon icon={faXmark}/></button></span>}
                <button className="prj-fca" onClick={clearFilters}><FontAwesomeIcon icon={faArrowRotateLeft}/> Clear all</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="prj-body">
            {loading && (viewMode==='grid' ? <ProjectsGridSkeleton count={9}/> : <ProjectsListSkeleton count={6}/>)}

            {error && !loading && (
              <motion.div className="prj-state" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                <div className="prj-state-icon">⚠</div>
                <h3>Could not load projects</h3>
                <p>Something went wrong. Please try again.</p>
                <button className="prj-state-btn" onClick={retry}><FontAwesomeIcon icon={faArrowRotateLeft}/> Retry</button>
              </motion.div>
            )}

            {!loading && !error && projects.length===0 && (
              <motion.div className="prj-state" initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }}>
                <div className="prj-state-icon prj-state-icon--soft"><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
                <h3>No projects found</h3>
                <p>{hasActiveFilters ? 'Try clearing some filters or using different search terms.' : 'No projects are available right now.'}</p>
                {hasActiveFilters && <button className="prj-state-btn" onClick={clearFilters}><FontAwesomeIcon icon={faArrowRotateLeft}/> Clear filters</button>}
              </motion.div>
            )}

            {!loading && !error && projects.length>0 && viewMode==='grid' && (
              <div className="prj-grid">
                <AnimatePresence initial={false}>
                  {projects.map((p,i)=>(
                    <motion.div key={p.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:.96 }} transition={{ duration:.25, delay:Math.min(i*.04,.3) }}>
                      <ProjectCard p={p}/>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && !error && projects.length>0 && viewMode==='list' && (
              <div className="prj-list">{projects.map(p=><ProjectListCard key={p.id} project={p}/>)}</div>
            )}

            {!loading && hasMore && (
              <div ref={loadMoreRef} className="prj-lm">
                <button className="prj-lm-btn" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? <><FontAwesomeIcon icon={faSpinner} spin/> Loading…</> : 'Load more projects'}
                </button>
              </div>
            )}
            {!loading && !hasMore && projects.length>0 && (
              <div className="prj-end"><span>All {projects.length} project{projects.length!==1?'s':''} shown</span></div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .projects-page { min-height: 80vh; padding-bottom: 4rem; }
        .prj-hero { padding: calc(var(--navbar-h) + 2.5rem) 0 0; background: var(--bg-page); }
        .prj-hero-inner { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad) 2rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .prj-eyebrow { display: inline-flex; align-items: center; gap: .4rem; font-size: .78rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: .5rem; }
        .prj-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-primary); flex-shrink: 0; }
        .prj-title { font-size: clamp(2rem,5vw,2.8rem); font-weight: 800; color: var(--text-primary); letter-spacing: -.03em; margin: 0 0 .6rem; font-family: var(--font-display); }
        .prj-sub { font-size: 1rem; color: var(--text-secondary); max-width: 560px; line-height: 1.6; display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
        .prj-count-pill { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 99px; background: var(--accent-light); color: var(--accent-primary); font-size: .78rem; font-weight: 700; flex-shrink: 0; }
        .prj-view-btns { display: flex; gap: 4px; background: var(--bg-surface-2); border: 1px solid var(--border-color); border-radius: 10px; padding: 4px; align-self: flex-start; margin-top: .25rem; }
        .prj-vbtn { width: 34px; height: 34px; border-radius: 7px; background: transparent; border: none; color: var(--text-tertiary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all var(--transition-fast); }
        .prj-vbtn:hover { color: var(--text-primary); }
        .prj-vbtn--on { background: var(--bg-elevated); color: var(--accent-primary); box-shadow: var(--shadow-sm); }
        .prj-container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); }
        .prj-controls { display: flex; gap: .75rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; }
        .prj-search-box { flex: 1; min-width: 220px; display: flex; align-items: center; gap: .6rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: .55rem .9rem; transition: border-color var(--transition-fast); }
        .prj-search-box:focus-within { border-color: var(--accent-primary); }
        .prj-si { color: var(--text-tertiary); font-size: .85rem; flex-shrink: 0; }
        .prj-si-input { background: transparent; border: none; outline: none; font-size: .9rem; color: var(--text-primary); flex: 1; min-width: 0; font-family: var(--font-body); }
        .prj-si-input::placeholder { color: var(--text-tertiary); }
        .prj-si-clear { background: transparent; border: none; cursor: pointer; color: var(--text-tertiary); padding: 0; font-size: .8rem; flex-shrink: 0; transition: color var(--transition-fast); }
        .prj-si-clear:hover { color: var(--text-primary); }
        .sd-wrap { position: relative; }
        .sd-btn { display: flex; align-items: center; gap: .5rem; padding: .55rem .9rem; border-radius: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); font-size: .88rem; color: var(--text-secondary); cursor: pointer; white-space: nowrap; transition: all var(--transition-fast); }
        .sd-btn:hover { border-color: var(--border-strong); color: var(--text-primary); }
        .sd-menu { position: absolute; right: 0; top: calc(100% + 6px); background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: 12px; min-width: 170px; box-shadow: var(--shadow-lg); overflow: hidden; z-index: 100; }
        .sd-item { display: flex; align-items: center; gap: .6rem; width: 100%; text-align: left; padding: .6rem .9rem; font-size: .875rem; color: var(--text-secondary); background: transparent; border: none; cursor: pointer; transition: all var(--transition-fast); }
        .sd-item:hover { background: var(--bg-surface-2); color: var(--text-primary); }
        .sd-item--active { color: var(--accent-primary); font-weight: 600; background: var(--accent-light); }
        .sd-item-icon { width: 14px; color: var(--text-tertiary); }
        .prj-cats { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem; }
        .prj-cp { display: inline-flex; align-items: center; gap: .4rem; padding: .35rem .8rem; border-radius: 99px; background: transparent; border: 1px solid var(--border-color); font-size: .83rem; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); white-space: nowrap; }
        .prj-cp:hover { border-color: var(--border-strong); color: var(--text-primary); background: var(--bg-surface-2); }
        .prj-cp--on { background: var(--accent-primary); border-color: var(--accent-primary); color: #fff; font-weight: 600; }
        .prj-cp--on .prj-cc { background: rgba(255,255,255,.2); color: #fff; }
        .prj-cc { display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 99px; background: var(--bg-surface-2); color: var(--text-tertiary); font-size: .7rem; font-weight: 700; }
        .prj-fstrip { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem; padding: .55rem .9rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; }
        .prj-fl { font-size: .78rem; color: var(--text-tertiary); font-weight: 600; }
        .prj-fc { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px 2px 10px; border-radius: 99px; background: var(--accent-light); border: 1px solid rgba(37,99,235,.25); color: var(--accent-primary); font-size: .78rem; font-weight: 600; }
        .prj-fc button { background: transparent; border: none; cursor: pointer; color: var(--accent-primary); padding: 0; font-size: .7rem; opacity: .7; }
        .prj-fc button:hover { opacity: 1; }
        .prj-fca { margin-left: auto; display: flex; align-items: center; gap: .35rem; background: transparent; border: none; cursor: pointer; font-size: .78rem; color: var(--text-tertiary); transition: color var(--transition-fast); }
        .prj-fca:hover { color: var(--text-primary); }
        .prj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem; }
        @media (max-width: 980px) { .prj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .prj-grid { grid-template-columns: 1fr; } }
        .prj-list { display: flex; flex-direction: column; gap: .75rem; margin-bottom: 2rem; }
        .pl-row { display: flex; align-items: center; gap: 1rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 1rem; transition: all var(--transition-base); }
        .pl-row:hover { border-color: var(--border-strong); box-shadow: var(--shadow-md); transform: translateY(-1px); }
        .pl-thumb { width: 110px; height: 74px; border-radius: var(--radius-md); flex-shrink: 0; background-size: cover; background-position: center; border: 1px solid var(--border-color); }
        .pl-thumb-ph { width: 110px; height: 74px; border-radius: var(--radius-md); flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); }
        .pl-body { flex: 1; min-width: 0; }
        .pl-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap; }
        .pl-cat { display: inline-block; padding: 1px 7px; border-radius: 99px; font-size: .72rem; font-weight: 600; border: 1px solid; flex-shrink: 0; }
        .pl-badge { font-size: .7rem; padding: 1px 6px; border-radius: 4px; }
        .pl-badge--wip { background: rgba(234,179,8,.12); color: #d97706; border: 1px solid rgba(234,179,8,.3); }
        .pl-badge--live { background: rgba(34,197,94,.1); color: #16a34a; border: 1px solid rgba(34,197,94,.3); }
        .pl-badge--oss { background: rgba(168,85,247,.1); color: #9333ea; border: 1px solid rgba(168,85,247,.3); }
        .pl-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: var(--font-display); }
        .pl-desc { font-size: .83rem; color: var(--text-tertiary); margin: 0 0 .4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pl-footer { display: flex; align-items: center; justify-content: space-between; gap: .5rem; flex-wrap: wrap; }
        .pl-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .pl-tag { font-size: .7rem; color: var(--text-tertiary); }
        .pl-stats { display: flex; align-items: center; gap: .75rem; }
        .pl-stat { display: flex; align-items: center; gap: .3rem; font-size: .75rem; color: var(--text-tertiary); }
        .pl-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .pl-btn { display: flex; align-items: center; justify-content: center; gap: .4rem; padding: .4rem .85rem; border-radius: 8px; font-size: .82rem; font-weight: 600; text-decoration: none; cursor: pointer; transition: all var(--transition-fast); white-space: nowrap; }
        .pl-btn--primary { background: var(--accent-primary); color: #fff; border: 1px solid var(--accent-primary); }
        .pl-btn--primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
        .pl-btn--ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); }
        .pl-btn--ghost:hover { background: var(--bg-surface-2); color: var(--text-primary); }
        @media (max-width: 640px) { .pl-thumb, .pl-thumb-ph, .pl-actions { display: none; } }
        .prj-lm { text-align: center; padding: 1.5rem 0 .5rem; }
        .prj-lm-btn { display: inline-flex; align-items: center; gap: .5rem; padding: .65rem 1.75rem; border-radius: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); font-size: .9rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
        .prj-lm-btn:hover:not(:disabled) { background: var(--bg-surface-2); border-color: var(--border-strong); color: var(--text-primary); }
        .prj-lm-btn:disabled { opacity: .6; cursor: not-allowed; }
        .prj-end { text-align: center; padding: 1.5rem 0; font-size: .82rem; color: var(--text-tertiary); }
        .prj-end span { display: inline-block; padding: .3rem .9rem; border: 1px solid var(--border-color); border-radius: 99px; }
        .prj-state { text-align: center; padding: 4rem 1rem; display: flex; flex-direction: column; align-items: center; gap: .75rem; }
        .prj-state-icon { font-size: 2.5rem; color: var(--clr-warning); }
        .prj-state-icon--soft { width: 64px; height: 64px; border-radius: 50%; background: var(--bg-surface-2); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: var(--text-tertiary); }
        .prj-state h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .prj-state p { font-size: .9rem; color: var(--text-tertiary); max-width: 340px; margin: 0; }
        .prj-state-btn { display: inline-flex; align-items: center; gap: .4rem; padding: .5rem 1.25rem; border-radius: 10px; background: var(--accent-light); color: var(--accent-primary); border: 1px solid rgba(37,99,235,.25); font-size: .875rem; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); }
        .prj-state-btn:hover { background: var(--accent-primary); color: #fff; }
        .prj-body { min-height: 300px; }
      `}</style>
    </VisibilityGuard>
  )
}
