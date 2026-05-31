// Projects.jsx — v2.4.0
// Full dynamic projects page:
//   - Grid / List view toggle
//   - Filter by category (from Supabase distinct categories)
//   - Within-page search (title + description + tags)
//   - Skeleton loading everywhere
//   - Pagination (12 per page)
//   - All data from Supabase

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTableCells, faList, faMagnifyingGlass, faXmark, faFilter,
  faChevronLeft, faChevronRight, faFolderOpen, faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import Breadcrumb from '../components/shared/Breadcrumb.jsx'
import { buildTitle } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { getPublishedProjects, getProjectCategories } from '../services/supabase.js'

const PER_PAGE = 12

// ── Category filter pill ───────────────────────────────────────
function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
        active
          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm'
          : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
      }`}>
      {label}
    </button>
  )
}

// ── Skeleton grid (12 cards) ────────────────────────────────────
function SkeletonGrid({ view }) {
  const items = Array.from({ length: 12 }, (_, i) => i)
  return view === 'grid' ? (
    <div className="proj-page-grid">
      {items.map(i => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.04}s` }} />
          <div className="p-4 space-y-3">
            <div className="flex gap-1.5">
              <div className="sk h-5 w-14 rounded-full" />
              <div className="sk h-5 w-18 rounded-full" />
            </div>
            <div className="sk h-5 w-3/4 rounded" />
            <div className="sk h-4 w-full rounded" />
            <div className="sk h-4 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {items.map(i => (
        <div key={i} className="flex gap-0 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden h-24">
          <div className="w-1 flex-shrink-0 sk" />
          <div className="w-28 flex-shrink-0 sk" />
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
      className="flex flex-col items-center justify-center py-24 gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center">
        <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--text-tertiary)]" />
      </div>
      <div className="text-center">
        <p className="text-[var(--text-primary)] font-semibold">
          {hasFilters ? 'No projects match your filters' : 'No projects yet'}
        </p>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">
          {hasFilters ? 'Try adjusting the search or category filter.' : 'Projects will appear here once published.'}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all">
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
        className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {visible.reduce((acc, p, i, arr) => {
        if (i > 0 && arr[i - 1] !== p - 1) {
          acc.push(<span key={`ellipsis-${p}`} className="w-9 h-9 flex items-center justify-center text-[var(--text-tertiary)] text-sm">…</span>)
        }
        acc.push(
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium border transition-all ${
              p === current
                ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
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
        className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">
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
  const [view, setView]                 = useState('grid')        // 'grid' | 'list'
  const [search, setSearch]             = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'All')
  const [page, setPage]                 = useState(1)
  const searchRef                       = useRef(null)
  const topRef                          = useRef(null)

  // Track page view
  useEffect(() => { trackPage('Projects') }, [])

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

  // Filtered + searched list
  const filtered = useMemo(() => {
    let list = allProjects

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

    return list
  }, [allProjects, activeCategory, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1) }, [search, activeCategory])

  // Sync filters to URL
  useEffect(() => {
    const params = {}
    if (search) params.q = search
    if (activeCategory !== 'All') params.cat = activeCategory
    setSearchParams(params, { replace: true })
  }, [search, activeCategory, setSearchParams])

  // Scroll to top of list on page change
  const handlePageChange = useCallback((p) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('All')
    setPage(1)
  }

  const hasFilters = search.trim() || activeCategory !== 'All'

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content="Explore all projects by Muhtasim Rahman — web apps, tools, educational projects, and more." />
      </Helmet>

      <div className="container-xl py-10 lg:py-14" ref={topRef}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Projects' }]} />

        {/* Page header */}
        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
            Projects
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            {loading ? 'Loading…' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''}${hasFilters ? ' found' : ' total'}`}
          </p>
        </div>

        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-1 self-start">
            {[
              { id: 'grid', icon: faTableCells, label: 'Grid' },
              { id: 'list', icon: faList,       label: 'List' },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                title={v.label}
                className={`w-9 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                  view === v.id
                    ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                }`}>
                <FontAwesomeIcon icon={v.icon} />
              </button>
            ))}
          </div>
        </div>

        {/* Category filters */}
        {!loading && categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none">
            <FontAwesomeIcon icon={faFilter} className="text-xs text-[var(--text-tertiary)] flex-shrink-0 ml-0.5" />
            {categories.map(cat => (
              <CategoryPill
                key={cat}
                label={cat}
                active={cat === activeCategory}
                onClick={() => setActiveCategory(cat)} />
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-all ml-2">
                <FontAwesomeIcon icon={faXmark} />
                Clear
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <SkeletonGrid view={view} />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-[var(--text-secondary)]">Failed to load projects.</p>
            <button onClick={() => window.location.reload()}
              className="mt-3 text-sm text-[var(--accent-primary)] hover:underline">
              Try again
            </button>
          </div>
        ) : paged.length === 0 ? (
          <EmptyState hasFilters={!!hasFilters} onClear={clearFilters} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${page}-${activeCategory}-${search}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              {view === 'grid' ? (
                <div className="proj-page-grid">
                  {paged.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} view="grid" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {paged.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} view="list" />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
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
