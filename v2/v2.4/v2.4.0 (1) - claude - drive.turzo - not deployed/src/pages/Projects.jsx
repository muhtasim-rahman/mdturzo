// ============================================================
// Projects.jsx — v2.4.0
// Full projects listing: grid/list toggle, filter, search,
// dynamic from Supabase, skeleton loading, load more
// ============================================================

import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet }    from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch, faXmark, faGrip, faList,
  faTag, faFilter, faFolderOpen,
  faArrowUpRightFromSquare, faEye, faHeart,
  faArrowRight, faTriangleExclamation, faRotateRight,
  faCode, faTimes
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { VisibilityGuard }  from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }       from '../utils/seo.js'
import { trackPage }        from '../services/analytics.js'
import { formatNumber }     from '../utils/formatters.js'
import {
  getPublishedProjects,
  countPublishedProjects,
  getProjectCategories,
} from '../services/supabase.js'

const PAGE_SIZE = 9

// ── Accent color helper ────────────────────────────────────
const CAT_COLORS = {
  'Web App':     '#3B82F6',
  'PWA':         '#6366F1',
  'Utility':     '#10B981',
  'Education':   '#F59E0B',
  'UI Component':'#EC4899',
  'Dev Tool':    '#A855F7',
  'Islamic':     '#06B6D4',
  'Design':      '#F97316',
  'Portfolio':   '#14B8A6',
  'default':     '#64748B',
}

function getAccent(project) {
  return project.accent_color || CAT_COLORS[project.category] || CAT_COLORS.default
}

// ── Skeleton card ──────────────────────────────────────────
function SkeletonProjectCard() {
  return (
    <div className="pj-card" style={{ pointerEvents: 'none' }}>
      <div className="pj-card-thumb sk" />
      <div className="pj-card-body">
        <div className="sk" style={{ width: '45%', height: 12, borderRadius: 4, marginBottom: 8 }} />
        <div className="sk" style={{ width: '80%', height: 16, borderRadius: 4, marginBottom: 6 }} />
        <div className="sk" style={{ width: '90%', height: 12, borderRadius: 4, marginBottom: 4 }} />
        <div className="sk" style={{ width: '65%', height: 12, borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="sk" style={{ width: 52, height: 20, borderRadius: 20 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkeletonProjectRow() {
  return (
    <div className="pj-row" style={{ pointerEvents: 'none' }}>
      <div className="sk" style={{ width: 120, height: 80, borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="sk" style={{ width: '60%', height: 18, borderRadius: 4 }} />
        <div className="sk" style={{ width: '90%', height: 13, borderRadius: 4 }} />
        <div className="sk" style={{ width: '75%', height: 13, borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="sk" style={{ width: 52, height: 20, borderRadius: 20 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Project Card (Grid view) ───────────────────────────────
function ProjectCard({ p, i }) {
  const color = getAccent(p)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="pj-card"
      style={{ '--c': color, borderColor: hovered ? color : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: Math.min(i * 0.06, 0.4) }}
    >
      {/* Thumbnail */}
      <div className="pj-card-thumb">
        {p.thumbnail_url ? (
          <img src={p.thumbnail_url} alt={p.title} loading="lazy"
            className="pj-card-thumb-img" />
        ) : (
          <div className="pj-card-thumb-placeholder"
            style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}>
            <FontAwesomeIcon icon={faFolderOpen} style={{ color: `${color}66`, fontSize: '1.8rem' }} />
          </div>
        )}
        {/* Category badge */}
        <div className="pj-card-cat-badge"
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
          {p.category || 'Project'}
        </div>
        {/* Action links */}
        <div className="pj-card-actions">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} className="pj-card-action-btn" title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} className="pj-card-action-btn" title="Live Demo">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="pj-card-body">
        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="pj-tags">
            {p.tags.slice(0, 3).map(t => (
              <span key={t} className="pj-tag">
                <FontAwesomeIcon icon={faTag} />
                {t}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="pj-tag">+{p.tags.length - 3}</span>
            )}
          </div>
        )}

        <h3 className="pj-card-title">{p.title}</h3>
        <p className="pj-card-desc">{p.short_description}</p>

        {/* Stats */}
        {(p.views_count > 0 || p.likes_count > 0) && (
          <div className="pj-card-stats">
            {p.views_count > 0 && (
              <span><FontAwesomeIcon icon={faEye} /> {formatNumber(p.views_count)}</span>
            )}
            {p.likes_count > 0 && (
              <span><FontAwesomeIcon icon={faHeart} /> {formatNumber(p.likes_count)}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pj-card-footer" style={{ '--c': color }}>
          <span className="pj-card-footer-cat">
            <span className="pj-card-footer-dot" />
            {p.category || 'Project'}
          </span>
          <span className="pj-card-footer-cta">
            View <FontAwesomeIcon icon={faArrowRight} className="group-arrow" />
          </span>
        </div>
      </div>

      {/* Full-card link overlay */}
      <Link to={`/projects/${p.slug}`} className="pj-card-overlay"
        aria-label={`View ${p.title}`} />
    </motion.div>
  )
}

// ── Project Row (List view) ────────────────────────────────
function ProjectRow({ p, i }) {
  const color = getAccent(p)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="pj-row"
      style={{ '--c': color, borderColor: hovered ? color : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, delay: Math.min(i * 0.05, 0.4) }}
    >
      {/* Thumbnail */}
      <div className="pj-row-thumb">
        {p.thumbnail_url ? (
          <img src={p.thumbnail_url} alt={p.title} loading="lazy" className="pj-row-thumb-img" />
        ) : (
          <div className="pj-row-thumb-placeholder"
            style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}>
            <FontAwesomeIcon icon={faFolderOpen} style={{ color: `${color}66` }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pj-row-content">
        <div className="pj-row-meta">
          <span className="pj-row-cat"
            style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
            {p.category || 'Project'}
          </span>
          {p.tags?.slice(0, 2).map(t => (
            <span key={t} className="pj-tag">{t}</span>
          ))}
        </div>

        <h3 className="pj-row-title">{p.title}</h3>
        <p className="pj-row-desc">{p.short_description}</p>

        <div className="pj-row-footer">
          {/* Links */}
          <div className="pj-row-links">
            {p.github_link && (
              <a href={p.github_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()} className="pj-row-link-btn">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
            )}
            {p.live_link && (
              <a href={p.live_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()} className="pj-row-link-btn">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Live
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="pj-card-stats">
            {p.views_count > 0 && (
              <span><FontAwesomeIcon icon={faEye} /> {formatNumber(p.views_count)}</span>
            )}
          </div>

          {/* View btn */}
          <span className="pj-row-view-btn" style={{ color }}>
            View details <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </div>

      {/* Full-row link overlay */}
      <Link to={`/projects/${p.slug}`} className="pj-card-overlay"
        aria-label={`View ${p.title}`} />
    </motion.div>
  )
}

// ── Empty state ────────────────────────────────────────────
function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.div
      className="pj-empty"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FontAwesomeIcon icon={faFolderOpen} className="pj-empty-icon" />
      <h3 className="pj-empty-title">
        {hasFilters ? 'No projects found' : 'No projects yet'}
      </h3>
      <p className="pj-empty-desc">
        {hasFilters
          ? 'Try adjusting your search or filters.'
          : 'Projects will appear here once they\'re added.'
        }
      </p>
      {hasFilters && (
        <button className="pj-empty-clear" onClick={onClear}>
          <FontAwesomeIcon icon={faTimes} /> Clear filters
        </button>
      )}
    </motion.div>
  )
}

// ── Error state ────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="pj-error">
      <FontAwesomeIcon icon={faTriangleExclamation} className="pj-error-icon" />
      <p>Failed to load projects.</p>
      <button className="pj-retry-btn" onClick={onRetry}>
        <FontAwesomeIcon icon={faRotateRight} /> Retry
      </button>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────
function ProjectsContent() {
  const [searchParams, setSearchParams] = useSearchParams()

  // State
  const [view,       setView      ] = useState('grid')       // 'grid' | 'list'
  const [search,     setSearch    ] = useState(searchParams.get('q') || '')
  const [searchInput,setSearchInput] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || '')
  const [categories, setCategories] = useState([])
  const [projects,   setProjects  ] = useState([])
  const [total,      setTotal     ] = useState(0)
  const [offset,     setOffset    ] = useState(0)
  const [loading,    setLoading   ] = useState(true)
  const [loadingMore,setLoadingMore] = useState(false)
  const [error,      setError     ] = useState(null)

  const searchTimer = useRef(null)

  // Track analytics
  useEffect(() => { trackPage('Projects') }, [])

  // Load categories
  useEffect(() => {
    getProjectCategories()
      .then(cats => setCategories(cats))
      .catch(() => {})
  }, [])

  // Load projects whenever filters change
  useEffect(() => {
    setOffset(0)
    loadProjects(0, true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeCategory])

  async function loadProjects(off = 0, reset = false) {
    if (reset) {
      setLoading(true)
      setError(null)
    } else {
      setLoadingMore(true)
    }

    try {
      const [data, count] = await Promise.all([
        getPublishedProjects({
          limit:    PAGE_SIZE,
          offset:   off,
          category: activeCategory || undefined,
          search:   search || undefined,
        }),
        off === 0 ? countPublishedProjects({
          category: activeCategory || undefined,
          search:   search || undefined,
        }) : Promise.resolve(total),
      ])

      if (reset) {
        setProjects(data)
        setTotal(count)
      } else {
        setProjects(prev => [...prev, ...data])
      }
      setOffset(off + data.length)
    } catch (err) {
      setError(err.message || 'Failed to load projects.')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleSearchInput = (val) => {
    setSearchInput(val)
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setSearch(val.trim())
      const params = new URLSearchParams(searchParams)
      if (val.trim()) params.set('q', val.trim()); else params.delete('q')
      setSearchParams(params, { replace: true })
    }, 350)
  }

  const handleCategory = (cat) => {
    const next = activeCategory === cat ? '' : cat
    setActiveCategory(next)
    const params = new URLSearchParams(searchParams)
    if (next) params.set('cat', next); else params.delete('cat')
    setSearchParams(params, { replace: true })
  }

  const clearFilters = () => {
    setSearch(''); setSearchInput(''); setActiveCategory('')
    setSearchParams({}, { replace: true })
  }

  const hasFilters = !!(search || activeCategory)
  const hasMore    = offset < total

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content="Explore all projects by Muhtasim Rahman — web apps, PWAs, tools and more." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pjp-hero">
        <div className="container-xl">
          <motion.div
            className="pjp-hero-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="pjp-hero-badge">
              <FontAwesomeIcon icon={faCode} />
              <span>Portfolio</span>
            </div>
            <h1 className="pjp-hero-title">
              My <span className="pjp-hero-accent">Projects</span>
            </h1>
            <p className="pjp-hero-sub">
              A collection of web apps, tools, and experiments — from PWAs to open-source libraries.
            </p>
            {!loading && (
              <div className="pjp-hero-count">
                <span>{total}</span> project{total !== 1 ? 's' : ''} total
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Filters + Search + Toggle ── */}
      <section className="pjp-controls">
        <div className="container-xl">
          {/* Search bar */}
          <div className="pjp-search-wrap">
            <FontAwesomeIcon icon={faSearch} className="pjp-search-icon" />
            <input
              type="text"
              className="pjp-search-input"
              placeholder="Search projects..."
              value={searchInput}
              onChange={e => handleSearchInput(e.target.value)}
            />
            {searchInput && (
              <button className="pjp-search-clear" onClick={() => { setSearchInput(''); setSearch(''); }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>

          {/* Category chips + View toggle */}
          <div className="pjp-filter-row">
            <div className="pjp-cats">
              <FontAwesomeIcon icon={faFilter} className="pjp-filter-icon" />
              <button
                className={`pjp-cat-chip ${!activeCategory ? 'pjp-cat-active' : ''}`}
                onClick={() => handleCategory('')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`pjp-cat-chip ${activeCategory === cat ? 'pjp-cat-active' : ''}`}
                  onClick={() => handleCategory(cat)}
                  style={activeCategory === cat ? {
                    background: `${CAT_COLORS[cat] || CAT_COLORS.default}22`,
                    borderColor: CAT_COLORS[cat] || CAT_COLORS.default,
                    color:       CAT_COLORS[cat] || CAT_COLORS.default,
                  } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="pjp-view-toggle">
              <button
                className={`pjp-view-btn ${view === 'grid' ? 'pjp-view-active' : ''}`}
                onClick={() => setView('grid')}
                title="Grid view"
              >
                <FontAwesomeIcon icon={faGrip} />
              </button>
              <button
                className={`pjp-view-btn ${view === 'list' ? 'pjp-view-active' : ''}`}
                onClick={() => setView('list')}
                title="List view"
              >
                <FontAwesomeIcon icon={faList} />
              </button>
            </div>
          </div>

          {/* Active filter pills */}
          {hasFilters && (
            <div className="pjp-active-filters">
              {search && (
                <span className="pjp-active-pill">
                  Search: &ldquo;{search}&rdquo;
                  <button onClick={() => { setSearch(''); setSearchInput('') }}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </span>
              )}
              {activeCategory && (
                <span className="pjp-active-pill">
                  {activeCategory}
                  <button onClick={() => handleCategory(activeCategory)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </span>
              )}
              <button className="pjp-clear-all" onClick={clearFilters}>
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Projects List/Grid ── */}
      <section className="pjp-list section">
        <div className="container-xl">
          {/* Result info */}
          {!loading && !error && (
            <p className="pjp-result-info">
              {hasFilters
                ? `${total} result${total !== 1 ? 's' : ''} found`
                : `${total} project${total !== 1 ? 's' : ''}`
              }
            </p>
          )}

          {error ? (
            <ErrorState onRetry={() => loadProjects(0, true)} />
          ) : loading ? (
            view === 'grid' ? (
              <div className="pjp-grid">
                {[...Array(PAGE_SIZE)].map((_, i) => <SkeletonProjectCard key={i} />)}
              </div>
            ) : (
              <div className="pjp-list-col">
                {[...Array(PAGE_SIZE)].map((_, i) => <SkeletonProjectRow key={i} />)}
              </div>
            )
          ) : projects.length === 0 ? (
            <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
          ) : (
            <>
              <AnimatePresence mode="wait">
                {view === 'grid' ? (
                  <motion.div
                    key="grid"
                    className="pjp-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
                    {loadingMore && [...Array(3)].map((_, i) => <SkeletonProjectCard key={`sk-${i}`} />)}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    className="pjp-list-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {projects.map((p, i) => <ProjectRow key={p.id} p={p} i={i} />)}
                    {loadingMore && [...Array(3)].map((_, i) => <SkeletonProjectRow key={`sk-${i}`} />)}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Load more */}
              {hasMore && !loadingMore && (
                <div className="pjp-load-more">
                  <button
                    className="pjp-load-btn"
                    onClick={() => loadProjects(offset)}
                  >
                    Load More Projects
                  </button>
                  <p className="pjp-load-info">
                    Showing {projects.length} of {total}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .pjp-hero {
          padding: calc(var(--navbar-h) + 3rem) 0 2.5rem;
          background: radial-gradient(ellipse 80% 60% at 50% 0%,
            rgba(59,130,246,.07) 0%, transparent 70%);
          border-bottom: 1px solid var(--border-color);
        }
        .pjp-hero-inner { text-align: center; }
        .pjp-hero-badge {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .3rem .9rem; border-radius: 20px;
          background: rgba(59,130,246,.1);
          border: 1px solid rgba(59,130,246,.25);
          color: var(--accent-primary);
          font-size: .75rem; font-weight: 700; letter-spacing: .04em;
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .pjp-hero-title {
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800; font-family: var(--font-display);
          color: var(--text-primary); margin: 0 0 .75rem;
        }
        .pjp-hero-accent { color: var(--accent-primary); }
        .pjp-hero-sub {
          font-size: clamp(.9rem, 2vw, 1.05rem);
          color: var(--text-secondary);
          max-width: 520px; margin: 0 auto .75rem;
        }
        .pjp-hero-count {
          font-size: .82rem; color: var(--text-tertiary); margin-top: .25rem;
        }
        .pjp-hero-count span { color: var(--accent-primary); font-weight: 700; }

        /* ── Controls ── */
        .pjp-controls {
          padding: 1.25rem 0;
          position: sticky; top: var(--navbar-h);
          background: var(--bg-page);
          border-bottom: 1px solid var(--border-color);
          z-index: 30;
          backdrop-filter: blur(12px);
        }
        .pjp-search-wrap {
          position: relative; margin-bottom: .85rem;
        }
        .pjp-search-icon {
          position: absolute; left: .9rem; top: 50%; transform: translateY(-50%);
          color: var(--text-tertiary); font-size: .85rem; pointer-events: none;
        }
        .pjp-search-input {
          width: 100%; padding: .6rem 2.4rem .6rem 2.4rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: .88rem; outline: none;
          transition: border-color .15s;
          font-family: var(--font-body);
        }
        .pjp-search-input::placeholder { color: var(--text-tertiary); }
        .pjp-search-input:focus { border-color: var(--accent-primary); }
        .pjp-search-clear {
          position: absolute; right: .75rem; top: 50%; transform: translateY(-50%);
          width: 22px; height: 22px; border-radius: 6px;
          background: var(--bg-surface-2); border: none;
          color: var(--text-tertiary); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
        }
        .pjp-filter-row {
          display: flex; align-items: center; gap: .75rem; flex-wrap: wrap;
        }
        .pjp-filter-icon { color: var(--text-tertiary); font-size: .8rem; flex-shrink: 0; }
        .pjp-cats {
          display: flex; align-items: center; gap: .4rem;
          flex-wrap: nowrap; overflow-x: auto;
          scrollbar-width: none; flex: 1;
        }
        .pjp-cats::-webkit-scrollbar { display: none; }
        .pjp-cat-chip {
          padding: .3rem .7rem; border-radius: 20px; flex-shrink: 0;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary);
          font-size: .75rem; font-weight: 600; cursor: pointer;
          transition: all .15s; white-space: nowrap;
        }
        .pjp-cat-chip:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .pjp-cat-active {
          background: rgba(59,130,246,.12);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .pjp-view-toggle {
          display: flex; align-items: center; gap: 2px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          border-radius: 8px; padding: 2px;
          flex-shrink: 0;
        }
        .pjp-view-btn {
          padding: .3rem .55rem; border-radius: 6px; border: none;
          background: transparent; color: var(--text-tertiary);
          cursor: pointer; transition: all .15s; font-size: .8rem;
        }
        .pjp-view-active {
          background: var(--bg-surface); color: var(--accent-primary);
          box-shadow: 0 1px 4px rgba(0,0,0,.15);
        }

        .pjp-active-filters {
          display: flex; align-items: center; flex-wrap: wrap; gap: .4rem;
          margin-top: .6rem;
        }
        .pjp-active-pill {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .25rem .6rem; border-radius: 20px;
          background: rgba(59,130,246,.12);
          border: 1px solid rgba(59,130,246,.3);
          color: var(--accent-primary);
          font-size: .72rem; font-weight: 600;
        }
        .pjp-active-pill button {
          background: none; border: none; color: inherit;
          cursor: pointer; padding: 0; display: flex; align-items: center;
          font-size: 10px;
        }
        .pjp-clear-all {
          font-size: .72rem; font-weight: 600; color: var(--text-tertiary);
          background: none; border: none; cursor: pointer; padding: .25rem;
          transition: color .12s;
        }
        .pjp-clear-all:hover { color: var(--clr-error); }

        /* ── List area ── */
        .pjp-list { padding-top: 2rem; }
        .pjp-result-info {
          font-size: .8rem; color: var(--text-tertiary);
          margin-bottom: 1.25rem;
        }

        /* ── Grid layout ── */
        .pjp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media(max-width: 1023px) { .pjp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width: 639px)  { .pjp-grid { grid-template-columns: 1fr; } }

        /* ── List layout ── */
        .pjp-list-col { display: flex; flex-direction: column; gap: 1rem; }

        /* ── Card shared ── */
        .pj-card {
          position: relative; display: flex; flex-direction: column;
          border-radius: 16px; overflow: hidden;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-color);
          transition: border-color .22s, box-shadow .22s, transform .22s;
        }
        .pj-card:hover {
          box-shadow: 0 10px 36px rgba(0,0,0,.2);
          transform: translateY(-3px);
        }
        .pj-card-thumb {
          position: relative; height: 160px;
          background: var(--bg-surface-2); overflow: hidden; flex-shrink: 0;
        }
        .pj-card-thumb-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .5s ease;
        }
        .pj-card:hover .pj-card-thumb-img { transform: scale(1.06); }
        .pj-card-thumb-placeholder {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .pj-card-cat-badge {
          position: absolute; top: 10px; left: 10px;
          padding: .2rem .55rem; border-radius: 20px;
          font-size: .7rem; font-weight: 700;
          backdrop-filter: blur(4px);
        }
        .pj-card-actions {
          position: absolute; top: 10px; right: 10px;
          display: flex; gap: 6px;
          opacity: 0; transition: opacity .2s;
        }
        .pj-card:hover .pj-card-actions { opacity: 1; }
        .pj-card-action-btn {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--bg-surface)/90; backdrop-filter: blur(4px);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem; text-decoration: none;
          transition: color .12s; z-index: 2;
        }
        .pj-card-action-btn:hover { color: var(--text-primary); }

        .pj-card-body {
          display: flex; flex-direction: column; gap: .5rem;
          padding: 1rem; flex: 1;
        }
        .pj-card-title {
          font-size: .92rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.35;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; margin: 0;
        }
        .pj-card-desc {
          font-size: .8rem; color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; flex: 1; margin: 0;
        }
        .pj-card-stats {
          display: flex; align-items: center; gap: .75rem;
          font-size: .72rem; color: var(--text-tertiary);
        }
        .pj-card-stats span { display: flex; align-items: center; gap: .3rem; }

        .pj-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: .5rem .7rem; border-radius: 8px;
          background: color-mix(in srgb, var(--c) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 20%, transparent);
          margin-top: auto;
        }
        .pj-card-footer-cat {
          display: flex; align-items: center; gap: .35rem;
          font-size: .7rem; font-weight: 700; color: var(--c);
        }
        .pj-card-footer-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c); box-shadow: 0 0 4px var(--c);
        }
        .pj-card-footer-cta {
          font-size: .7rem; font-weight: 700; color: var(--c);
          display: flex; align-items: center; gap: .3rem;
          pointer-events: none; z-index: 2;
        }
        .pj-card-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
        /* External action links above overlay */
        .pj-card .pj-card-actions { z-index: 2; }

        /* Tags */
        .pj-tags { display: flex; flex-wrap: wrap; gap: .3rem; }
        .pj-tag {
          display: inline-flex; align-items: center; gap: .25rem;
          font-size: .68rem; padding: .15rem .45rem; border-radius: 20px;
          background: var(--bg-surface-3); color: var(--text-tertiary);
        }
        .pj-tag svg { font-size: .55rem; }

        /* ── Row (list view) ── */
        .pj-row {
          position: relative; display: flex; gap: 1rem; align-items: flex-start;
          padding: 1rem; border-radius: 14px;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-color);
          transition: border-color .22s, box-shadow .22s, transform .22s;
        }
        .pj-row:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,.15);
          transform: translateY(-2px);
        }
        .pj-row-thumb {
          width: 120px; height: 88px; border-radius: 10px;
          overflow: hidden; flex-shrink: 0;
          background: var(--bg-surface-2);
        }
        .pj-row-thumb-img { width: 100%; height: 100%; object-fit: cover; }
        .pj-row-thumb-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
        }
        .pj-row-content { flex: 1; display: flex; flex-direction: column; gap: .4rem; }
        .pj-row-meta { display: flex; align-items: center; flex-wrap: wrap; gap: .35rem; }
        .pj-row-cat {
          padding: .15rem .55rem; border-radius: 20px;
          font-size: .7rem; font-weight: 700;
        }
        .pj-row-title {
          font-size: .95rem; font-weight: 700; color: var(--text-primary); margin: 0;
        }
        .pj-row-desc {
          font-size: .8rem; color: var(--text-secondary); line-height: 1.55; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pj-row-footer {
          display: flex; align-items: center; gap: .75rem; flex-wrap: wrap;
          margin-top: .25rem;
        }
        .pj-row-links { display: flex; gap: .4rem; }
        .pj-row-link-btn {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .25rem .65rem; border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-tertiary); font-size: .72rem; font-weight: 600;
          text-decoration: none; z-index: 2; position: relative;
          transition: color .12s, border-color .12s;
        }
        .pj-row-link-btn:hover { color: var(--accent-primary); border-color: var(--accent-primary); }
        .pj-row-view-btn {
          margin-left: auto; font-size: .75rem; font-weight: 700;
          display: flex; align-items: center; gap: .35rem;
          pointer-events: none;
        }

        @media(max-width: 479px) {
          .pj-row-thumb { width: 80px; height: 64px; }
        }

        /* ── Empty / Error ── */
        .pj-empty {
          text-align: center; padding: 4rem 1rem;
          color: var(--text-tertiary);
        }
        .pj-empty-icon { font-size: 3rem; margin-bottom: .75rem; display: block; opacity: .25; }
        .pj-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text-secondary); margin: 0 0 .4rem; }
        .pj-empty-desc { font-size: .85rem; margin: 0 0 1rem; }
        .pj-empty-clear {
          padding: .45rem 1rem; border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary); font-size: .8rem; cursor: pointer;
          transition: all .12s;
        }
        .pj-empty-clear:hover { border-color: var(--clr-error); color: var(--clr-error); }
        .pj-error { text-align: center; padding: 3rem 1rem; color: var(--text-secondary); }
        .pj-error-icon { font-size: 2.5rem; color: var(--clr-warning); display: block; margin-bottom: .5rem; }
        .pj-retry-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          margin-top: .75rem; padding: .45rem 1rem; border-radius: 8px;
          background: var(--bg-surface-2); border: 1px solid var(--border-strong);
          color: var(--text-secondary); cursor: pointer; font-size: .82rem;
          transition: all .12s;
        }
        .pj-retry-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); }

        /* ── Load more ── */
        .pjp-load-more {
          display: flex; flex-direction: column; align-items: center; gap: .5rem;
          margin-top: 2rem; padding-top: 2rem;
        }
        .pjp-load-btn {
          padding: .65rem 2rem; border-radius: 10px;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-strong);
          color: var(--text-secondary); font-size: .88rem; font-weight: 700;
          cursor: pointer; transition: all .15s;
        }
        .pjp-load-btn:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: rgba(59,130,246,.06);
        }
        .pjp-load-info { font-size: .75rem; color: var(--text-tertiary); }
      `}</style>
    </>
  )
}

export default function Projects() {
  return (
    <VisibilityGuard page="projects" skeleton="grid">
      <ProjectsContent />
    </VisibilityGuard>
  )
}
