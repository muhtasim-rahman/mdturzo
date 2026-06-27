// ============================================================
// Projects.jsx — v2.4.0
// Full projects list: search, filter, grid/list toggle.
// All data dynamic from Supabase.
// ============================================================

import { useState, useEffect } from 'react'
import { Link }     from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet }   from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch, faXmark, faBorderAll, faList, faSliders,
  faArrowRight, faFolderOpen, faFilter, faStar,
  faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { useProjects, useFilteredProjects } from '../hooks/useProjects.js'
import ProjectCard  from '../components/projects/ProjectCard.jsx'
import { SkeletonCard } from '../components/ui/Skeleton.jsx'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle } from '../utils/seo.js'
import { trackPage }  from '../services/analytics.js'
import { SITE_CONFIG } from '../config/site.config.js'

// ── Skeleton ──────────────────────────────────────────────────
function ProjectsGridSkeleton({ count = 6 }) {
  return (
    <div className="pj-grid">
      {Array.from({ length: count }, (_, i) => <SkeletonCard key={i}/>)}
    </div>
  )
}

function ProjectsListSkeleton({ count = 5 }) {
  return (
    <div className="pj-list-view">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="pjl-sk">
          <div className="sk pjl-sk-thumb"/>
          <div className="pjl-sk-body">
            <div className="sk" style={{ height: 12, width: '35%', marginBottom: 8, borderRadius: 6 }}/>
            <div className="sk" style={{ height: 18, width: '65%', marginBottom: 10, borderRadius: 6 }}/>
            <div className="sk" style={{ height: 12, width: '90%', marginBottom: 6, borderRadius: 6 }}/>
            <div className="sk" style={{ height: 12, width: '55%', borderRadius: 6 }}/>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────
function ProjectsHero({ total, loading }) {
  return (
    <section className="pj-hero">
      <div className="pj-hero-bg"/>
      <div className="container-xl pj-hero-inner">
        <motion.div className="pj-hero-content"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <span className="pj-hero-eyebrow">
            <span className="pj-eyebrow-dot"/>
            My Work
          </span>
          <h1 className="pj-hero-title">
            All <span className="pj-hero-accent">Projects</span>
          </h1>
          <p className="pj-hero-sub">
            From Progressive Web Apps to developer tools, institutional websites, and design projects — here's everything I've built so far.
          </p>
          <div className="pj-hero-stats">
            <div className="pj-hero-stat">
              <span className="pj-hero-stat-value">
                {loading ? '—' : total || '16+'}
              </span>
              <span className="pj-hero-stat-label">Projects</span>
            </div>
            <div className="pj-hero-stat-div"/>
            <div className="pj-hero-stat">
              <span className="pj-hero-stat-value">3+</span>
              <span className="pj-hero-stat-label">Years Building</span>
            </div>
            <div className="pj-hero-stat-div"/>
            <div className="pj-hero-stat">
              <span className="pj-hero-stat-value">Open</span>
              <span className="pj-hero-stat-label">For Collab</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Active filters ────────────────────────────────────────────
function ActiveFilters({ search, category, tags, onClearSearch, onClearCat, onRemoveTag, onClearAll }) {
  const hasFilters = search || (category && category !== 'All') || tags.length > 0
  if (!hasFilters) return null
  return (
    <div className="pj-active-filters">
      <span className="pj-af-label"><FontAwesomeIcon icon={faFilter}/> Active:</span>
      {search && (
        <button className="pj-af-chip" onClick={onClearSearch}>
          "{search.slice(0, 18)}{search.length > 18 ? '…' : ''}" <FontAwesomeIcon icon={faXmark}/>
        </button>
      )}
      {category && category !== 'All' && (
        <button className="pj-af-chip" onClick={onClearCat}>
          {category} <FontAwesomeIcon icon={faXmark}/>
        </button>
      )}
      {tags.map(t => (
        <button key={t} className="pj-af-chip" onClick={() => onRemoveTag(t)}>
          {t} <FontAwesomeIcon icon={faXmark}/>
        </button>
      ))}
      <button className="pj-af-clear" onClick={onClearAll}>Clear all</button>
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────
function EmptyState({ hasFilters, onClearAll }) {
  return (
    <motion.div className="pj-empty"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="pj-empty-icon"><FontAwesomeIcon icon={faFolderOpen}/></div>
      <h3 className="pj-empty-title">
        {hasFilters ? 'No projects match your filters' : 'No projects yet'}
      </h3>
      <p className="pj-empty-sub">
        {hasFilters
          ? 'Try adjusting or clearing your search and filters.'
          : 'Projects will appear here once published.'}
      </p>
      {hasFilters && (
        <button className="pj-empty-btn" onClick={onClearAll}>
          <FontAwesomeIcon icon={faXmark}/> Clear all filters
        </button>
      )}
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────
const PAGE_SIZE = 9

function ProjectsContent() {
  useEffect(() => { trackPage('Projects') }, [])

  const { allProjects, categories, loading, error } = useProjects()

  // Filters
  const [search,      setSearch]      = useState('')
  const [dSearch,     setDSearch]     = useState('')
  const [category,    setCategory]    = useState('All')
  const [activeTags,  setActiveTags]  = useState([])
  const [sort,        setSort]        = useState('newest')
  const [viewMode,    setViewMode]    = useState('grid')
  const [showMore,    setShowMore]    = useState(PAGE_SIZE)
  const [showTagDrop, setShowTagDrop] = useState(false)

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setDSearch(search), 280)
    return () => clearTimeout(t)
  }, [search])

  // Reset pagination on filter change
  useEffect(() => { setShowMore(PAGE_SIZE) }, [dSearch, category, activeTags, sort])

  const filtered  = useFilteredProjects({ allProjects, search: dSearch, category, tags: activeTags, sort })
  const displayed = filtered.slice(0, showMore)
  const hasMore   = filtered.length > showMore
  const hasFilters = !!(dSearch || (category && category !== 'All') || activeTags.length)

  const allTags = [...new Set(allProjects.flatMap(p => p.tags || []))].sort()

  function clearAll() {
    setSearch(''); setDSearch(''); setCategory('All'); setActiveTags([])
  }

  function toggleTag(tag) {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content={`Explore ${allProjects.length || '16+'} projects by ${SITE_CONFIG.owner.displayName} — web apps, PWAs, tools, and more.`}/>
        <meta property="og:title" content={`Projects | ${SITE_CONFIG.siteName}`}/>
      </Helmet>

      <ProjectsHero total={allProjects.length} loading={loading}/>

      {/* ── Filters bar ─────────────────────────────────────── */}
      <div className="pj-filters-bar">
        <div className="container-xl">
          {/* Row 1: search + sort + view toggle */}
          <div className="pj-fb-row1">
            {/* Search */}
            <div className="pj-search-wrap">
              <FontAwesomeIcon icon={faSearch} className="pj-search-icon"/>
              <input
                type="search" className="pj-search-input"
                placeholder="Search by name, tag, or category…"
                value={search} onChange={e => setSearch(e.target.value)}/>
              {search && (
                <button className="pj-search-clear" onClick={() => setSearch('')}>
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              )}
            </div>

            <div className="pj-fb-right">
              {/* Sort */}
              <select className="pj-sort-sel" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="views">Most viewed</option>
              </select>
              {/* View toggle */}
              <div className="pj-view-toggle">
                <button className={`pj-vt-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')} title="Grid view">
                  <FontAwesomeIcon icon={faBorderAll}/>
                </button>
                <button className={`pj-vt-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')} title="List view">
                  <FontAwesomeIcon icon={faList}/>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: categories + tags */}
          <div className="pj-fb-row2">
            {/* Category pills */}
            <div className="pj-cats-scroll">
              {['All', ...categories].map(cat => (
                <button key={cat}
                  className={`pj-cat-pill ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Tags dropdown */}
            {allTags.length > 0 && (
              <div className="pj-tags-wrap">
                <button className="pj-tags-toggle" onClick={() => setShowTagDrop(o => !o)}>
                  <FontAwesomeIcon icon={faSliders}/>
                  Tags
                  {activeTags.length > 0 && <span className="pj-tags-badge">{activeTags.length}</span>}
                  <FontAwesomeIcon icon={showTagDrop ? faChevronUp : faChevronDown}/>
                </button>
                <AnimatePresence>
                  {showTagDrop && (
                    <motion.div className="pj-tags-drop"
                      initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
                      style={{ transformOrigin: 'top right' }}
                      transition={{ duration: 0.15 }}>
                      {allTags.map(tag => (
                        <button key={tag}
                          className={`pj-tag-item ${activeTags.includes(tag) ? 'active' : ''}`}
                          onClick={() => toggleTag(tag)}>
                          {activeTags.includes(tag) && <FontAwesomeIcon icon={faStar} className="pj-ti-icon"/>}
                          {tag}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Row 3: active filters + result count */}
          <div className="pj-fb-row3">
            <ActiveFilters
              search={dSearch} category={category} tags={activeTags}
              onClearSearch={() => setSearch('')}
              onClearCat={() => setCategory('All')}
              onRemoveTag={t => setActiveTags(prev => prev.filter(x => x !== t))}
              onClearAll={clearAll}/>
            {!loading && (
              <span className="pj-result-count">
                {filtered.length === allProjects.length
                  ? `${allProjects.length} project${allProjects.length !== 1 ? 's' : ''}`
                  : `${filtered.length} / ${allProjects.length}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Projects content ─────────────────────────────────── */}
      <section className="section" id="projects-list">
        <div className="container-xl">
          {loading ? (
            viewMode === 'grid'
              ? <ProjectsGridSkeleton count={6}/>
              : <ProjectsListSkeleton count={5}/>
          ) : error ? (
            <div className="pj-error">
              <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize: '2rem', opacity: .3 }}/>
              <p>Failed to load projects. Please refresh the page.</p>
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState hasFilters={hasFilters} onClearAll={clearAll}/>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                  <motion.div key="grid" className="pj-grid"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {displayed.map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} variant="grid"/>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="list" className="pj-list-view"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {displayed.map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} variant="list"/>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {hasMore && (
                <motion.div className="pj-load-more"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <button className="pj-load-btn" onClick={() => setShowMore(n => n + PAGE_SIZE)}>
                    Load more projects
                    <FontAwesomeIcon icon={faArrowRight} className="pj-load-arrow"/>
                  </button>
                  <span className="pj-load-info">Showing {displayed.length} of {filtered.length}</span>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      {!loading && (
        <section className="section-alt">
          <div className="container-xl pj-cta">
            <div>
              <h2 className="pj-cta-title">Like what you see?</h2>
              <p className="pj-cta-sub">I'm open to freelance projects and collaborations.</p>
            </div>
            <Link to="/contact" className="pj-cta-btn">
              Get in touch <FontAwesomeIcon icon={faArrowRight}/>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export default function Projects() {
  return (
    <VisibilityGuard page="projects" skeleton="grid">
      <ProjectsContent/>
    </VisibilityGuard>
  )
}
