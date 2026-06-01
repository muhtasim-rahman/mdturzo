// Projects.jsx — v2.4.1
// Redesigned Projects page:
//   - Grid / List view toggle
//   - Horizontal scrollable category filters with desktop buttons and touch drag
//   - Advanced sorting: latest, oldest, most liked, most viewed
//   - Within-page search
//   - Responsive layout & pagination page-size (12 PC, 8 Tablet, 6 Mobile)
//   - Skeleton loading & unified empty placeholders

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTableCells, faList, faMagnifyingGlass, faXmark, faFilter,
  faChevronLeft, faChevronRight, faFolderOpen, faArrowsRotate,
  faSort
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import Breadcrumb from '../components/shared/Breadcrumb.jsx'
import { buildTitle } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { getPublishedProjects, getProjectCategories } from '../services/supabase.js'

// ── Category filter pill ───────────────────────────────────────
function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
        active
          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm'
          : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
      }`}>
      {label}
    </button>
  )
}

// ── Skeleton grid ──────────────────────────────────────────────
function SkeletonGrid({ view, count = 12 }) {
  const items = Array.from({ length: count }, (_, i) => i)
  return view === 'grid' ? (
    <div className="proj-page-grid">
      {items.map(i => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)] p-0">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.03}s` }} />
          <div className="p-5 space-y-3">
            <div className="flex gap-1.5">
              <div className="sk h-5 w-14 rounded-md" />
              <div className="sk h-5 w-18 rounded-md" />
            </div>
            <div className="sk h-5 w-3/4 rounded" />
            <div className="sk h-3.5 w-full rounded" />
            <div className="sk h-3.5 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {items.map(i => (
        <div key={i} className="flex gap-0 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden h-24">
          <div className="w-1.5 flex-shrink-0 sk" />
          <div className="w-28 sm:w-40 flex-shrink-0 sk" />
          <div className="flex-1 p-4 space-y-2">
            <div className="sk h-4 w-1/2 rounded" />
            <div className="sk h-3 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Empty state ─────────────────────────────────────────────────
function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center">
        <FontAwesomeIcon icon={faFolderOpen} className="text-xl text-[var(--text-tertiary)]" />
      </div>
      <div className="text-center">
        <p className="text-[var(--text-primary)] font-bold text-base">
          {hasFilters ? 'No projects match your filters' : 'No projects yet'}
        </p>
        <p className="text-xs text-[var(--text-tertiary)] mt-1 max-w-xs mx-auto">
          {hasFilters ? 'Try adjusting the search query, category choice, or sort options.' : 'Projects will appear here once published.'}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all">
          <FontAwesomeIcon icon={faArrowsRotate} />
          Clear filters
        </button>
      )}
    </motion.div>
  )
}

// ── Pagination ──────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  const visible = pages.filter(p => p === 1 || p === total || Math.abs(p - current) <= 1)

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {visible.reduce((acc, p, i, arr) => {
        if (i > 0 && arr[i - 1] !== p - 1) {
          acc.push(<span key={`ellipsis-${p}`} className="w-9 h-9 flex items-center justify-center text-[var(--text-tertiary)] text-xs">…</span>)
        }
        acc.push(
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold border transition-all ${
              p === current
                ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
            }`}>
            {p}
          </button>
        )
        return acc
      }, [])}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

// ── Main page ───────────────────────────────────────────────────
function ProjectsContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProjects, setAllProjects]   = useState([])
  const [categories, setCategories]     = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(false)
  const [view, setView]                 = useState('grid') // 'grid' | 'list'
  
  // Controls state
  const [search, setSearch]             = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'All')
  const [sortBy, setSortBy]             = useState(searchParams.get('sort') || 'latest') // latest, oldest, most_liked, most_viewed
  
  // Page sizing & tracking
  const [pageSize, setPageSize]         = useState(12)
  const [page, setPage]                 = useState(1)

  const searchRef                       = useRef(null)
  const topRef                          = useRef(null)
  const categoryScrollRef               = useRef(null)

  // Track page view
  useEffect(() => { trackPage('Projects') }, [])

  // Dynamic Page Size handler based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setPageSize(12) // PC (3 cols * 4 rows)
      } else if (width >= 640) {
        setPageSize(8)  // Tablet (2 cols * 4 rows)
      } else {
        setPageSize(6)  // Mobile (1 col * 6 rows)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load all projects + categories
  useEffect(() => {
    let mounted = true
    setLoading(true)
    Promise.all([getPublishedProjects(), getProjectCategories()])
      .then(([projects, cats]) => {
        if (!mounted) return
        setAllProjects(projects || [])
        setCategories(['All', ...cats])
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setError(true)
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  // Filtered + searched + sorted list
  const filtered = useMemo(() => {
    let list = [...allProjects]

    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    // Sort application
    if (sortBy === 'latest') {
      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sortBy === 'most_liked') {
      list.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0))
    } else if (sortBy === 'most_viewed') {
      list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
    }

    return list
  }, [allProjects, activeCategory, search, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged      = filtered.slice((page - 1) * pageSize, page * pageSize)

  // Reset page index on search/filter/sort changes
  useEffect(() => { setPage(1) }, [search, activeCategory, sortBy, pageSize])

  // Sync parameters to browser search URL
  useEffect(() => {
    const params = {}
    if (search) params.q = search
    if (activeCategory !== 'All') params.cat = activeCategory
    if (sortBy !== 'latest') params.sort = sortBy
    setSearchParams(params, { replace: true })
  }, [search, activeCategory, sortBy, setSearchParams])

  // Scroll handler for paginator
  const handlePageChange = useCallback((p) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('All')
    setSortBy('latest')
    setPage(1)
  }

  // Categories horizontal navigation buttons for mouse clickers
  const scrollCategories = (direction) => {
    const el = categoryScrollRef.current
    if (!el) return
    const scrollAmount = direction === 'left' ? -200 : 200
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const hasFilters = search.trim() || activeCategory !== 'All' || sortBy !== 'latest'

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content="Explore all projects by Muhtasim Rahman — web apps, tools, educational projects, and more." />
      </Helmet>

      <div className="container-xl py-6 lg:py-10" ref={topRef}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Projects' }]} />

        {/* Minimal header section */}
        <div className="mt-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
            Projects Catalog
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
            {loading ? 'Fetching catalog…' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} available`}
          </p>
        </div>

        {/* Top Controls Action Section */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 items-stretch sm:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-xs pointer-events-none"
            />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, tag, or desc..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] focus:bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] outline-none text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors p-1"
                aria-label="Clear search">
                <FontAwesomeIcon icon={faXmark} className="text-xs" />
              </button>
            )}
          </div>

          {/* Right action bundle (Sort dropdown + View toggle) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            
            {/* Sorting Selector */}
            <div className="relative flex items-center bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-xl px-2.5 py-1.5">
              <FontAwesomeIcon icon={faSort} className="text-[10px] text-[var(--text-tertiary)] mr-2" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[var(--text-secondary)] font-semibold outline-none cursor-pointer pr-1">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="most_liked">Most Liked</option>
                <option value="most_viewed">Most Viewed</option>
              </select>
            </div>

            {/* Grid/List toggles */}
            <div className="flex items-center gap-1 bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-xl p-1">
              {[
                { id: 'grid', icon: faTableCells, label: 'Grid' },
                { id: 'list', icon: faList,       label: 'List' },
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  title={v.label}
                  className={`w-8 h-7 rounded-lg flex items-center justify-center text-xs transition-all ${
                    view === v.id
                      ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}>
                  <FontAwesomeIcon icon={v.icon} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Minimally designed horizontal categories slider */}
        {!loading && categories.length > 1 && (
          <div className="relative flex items-center w-full mb-6 border-b border-[var(--border-color)] pb-3">
            
            {/* Category icon */}
            <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] mr-3 flex-shrink-0 text-xs font-semibold">
              <FontAwesomeIcon icon={faFilter} className="text-[10px]" />
              <span>Filter:</span>
            </div>

            {/* Left navigation clicker */}
            <button
              onClick={() => scrollCategories('left')}
              className="hidden md:flex w-6 h-6 rounded-full bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] items-center justify-center border border-[var(--border-color)] flex-shrink-0 mr-1.5 transition-colors"
              aria-label="Scroll left">
              <FontAwesomeIcon icon={faChevronLeft} className="text-[8px]" />
            </button>

            {/* Categories scroll body */}
            <div
              ref={categoryScrollRef}
              className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5 touch-pan-x">
              {categories.map(cat => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={cat === activeCategory}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>

            {/* Right navigation clicker */}
            <button
              onClick={() => scrollCategories('right')}
              className="hidden md:flex w-6 h-6 rounded-full bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] items-center justify-center border border-[var(--border-color)] flex-shrink-0 ml-1.5 transition-colors"
              aria-label="Scroll right">
              <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
            </button>

            {/* Clear filters badge */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition-all ml-3">
                <FontAwesomeIcon icon={faXmark} />
                Reset
              </button>
            )}
          </div>
        )}

        {/* Body content cards list */}
        {loading ? (
          <SkeletonGrid view={view} count={pageSize} />
        ) : error ? (
          <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-2xl">
            <p className="text-xs text-[var(--text-secondary)]">Failed to retrieve projects list from the database.</p>
            <button onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold rounded-xl transition-all">
              Retry Connection
            </button>
          </div>
        ) : paged.length === 0 ? (
          <EmptyState hasFilters={!!hasFilters} onClear={clearFilters} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${page}-${activeCategory}-${search}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              {view === 'grid' ? (
                <div className="proj-page-grid">
                  {paged.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} view="grid" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3.5">
                  {paged.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} view="list" />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Paginator */}
        {!loading && totalPages > 1 && (
          <Pagination current={page} total={totalPages} onChange={handlePageChange} />
        )}
      </div>
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
