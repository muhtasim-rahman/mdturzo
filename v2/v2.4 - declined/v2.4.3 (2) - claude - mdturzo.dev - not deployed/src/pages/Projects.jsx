// Projects.jsx — v2.4.2
// Changes from v2.4.1:
//   - Advanced search engine via projectSearch.js (all Supabase fields weighted)
//   - Search bar rebuilt — fixed bugs, debounced, clear button always works
//   - Sort dropdown redesigned: rounded, light/dark mode responsive
//   - Page header redesigned: gradient heading text, minimal look
//   - PC: 6 cards/page, Tablet: 4, Mobile: 3 (home-like density on first page)
//   - Category dropdown redesigned with proper rounded corners + theme colors
//   - Search results show from advanced engine not just title/tag

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTableCells, faList, faMagnifyingGlass, faXmark, faFilter,
  faChevronLeft, faChevronRight, faFolderOpen, faArrowsRotate,
  faSort,  faBolt
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import Breadcrumb from '../components/shared/Breadcrumb.jsx'
import { buildTitle } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { getPublishedProjects, getProjectCategories } from '../services/supabase.js'
import { searchProjects } from '../services/projectSearch.js'

// ── Category pill ──────────────────────────────────────────────
function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
        active
          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm'
          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)]'
      }`}>
      {label}
    </button>
  )
}

// ── Sort select dropdown ───────────────────────────────────────
function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-3 py-2 hover:border-[var(--border-strong)] transition-all">
        <FontAwesomeIcon icon={faSort} className="text-[10px] text-[var(--text-tertiary)]" />
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="bg-transparent text-xs text-[var(--text-secondary)] font-semibold outline-none cursor-pointer appearance-none pr-1
                     [color-scheme:light] dark:[color-scheme:dark]"
          style={{ colorScheme: 'var(--scheme, light)' }}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="most_liked">Most Liked</option>
          <option value="most_viewed">Most Viewed</option>
        </select>
        <FontAwesomeIcon icon={faChevronLeft} className="text-[8px] text-[var(--text-tertiary)] rotate-[-90deg]" />
      </div>
    </div>
  )
}

// ── Skeleton grid ──────────────────────────────────────────────
function SkeletonGrid({ view, count = 6 }) {
  const items = Array.from({ length: count }, (_, i) => i)
  return view === 'grid' ? (
    <div className="proj-page-grid">
      {items.map(i => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.04}s` }} />
          <div className="p-4 space-y-2.5">
            <div className="sk h-4 w-3/4 rounded" />
            <div className="flex gap-1.5">
              <div className="sk h-4 w-12 rounded-md" style={{ animationDelay: `${i * 0.04 + 0.04}s` }} />
              <div className="sk h-4 w-16 rounded-md" style={{ animationDelay: `${i * 0.04 + 0.06}s` }} />
            </div>
            <div className="sk h-3 w-full rounded" />
            <div className="sk h-3 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {items.map(i => (
        <div key={i} className="flex gap-0 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden h-24">
          <div className="w-24 sm:w-32 flex-shrink-0 sk" />
          <div className="flex-1 p-4 space-y-2">
            <div className="sk h-3 w-20 rounded" />
            <div className="sk h-4 w-1/2 rounded" />
            <div className="sk h-3 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Empty state ────────────────────────────────────────────────
function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center">
        <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--text-tertiary)]" />
      </div>
      <div className="text-center">
        <p className="text-[var(--text-primary)] font-bold text-base">
          {hasFilters ? 'No results found' : 'No projects yet'}
        </p>
        <p className="text-xs text-[var(--text-tertiary)] mt-1 max-w-xs mx-auto">
          {hasFilters
            ? 'Try different keywords — the search engine checks titles, tags, descriptions, tech stack, and more.'
            : 'Projects will appear here once published.'}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all">
          <FontAwesomeIcon icon={faArrowsRotate} />
          Clear all filters
        </button>
      )}
    </motion.div>
  )
}

// ── Pagination ─────────────────────────────────────────────────
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
          acc.push(<span key={`e-${p}`} className="w-9 h-9 flex items-center justify-center text-[var(--text-tertiary)] text-xs">…</span>)
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

// ── Main page ──────────────────────────────────────────────────
function ProjectsContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProjects, setAllProjects]   = useState([])
  const [categories, setCategories]     = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(false)
  const [view, setView]                 = useState('grid')

  // Debounced search input vs. applied search
  const [searchInput, setSearchInput]         = useState(searchParams.get('q') || '')
  const [appliedSearch, setAppliedSearch]     = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory]   = useState(searchParams.get('cat') || 'All')
  const [sortBy, setSortBy]                   = useState(searchParams.get('sort') || 'latest')
  const [pageSize, setPageSize]               = useState(12)
  const [page, setPage]                       = useState(1)

  const debounceRef     = useRef(null)
  const topRef          = useRef(null)
  const categoryScrollRef = useRef(null)

  useEffect(() => { trackPage('Projects') }, [])

  // Responsive page size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w >= 1024) setPageSize(12)
      else if (w >= 640) setPageSize(8)
      else setPageSize(6)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load data
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(false)
    Promise.all([
      getPublishedProjects(),
      getProjectCategories()
    ])
      .then(([projects, cats]) => {
        if (!mounted) return
        setAllProjects(projects || [])
        setCategories(['All', ...(cats || [])])
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setError(true)
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  // Debounce search input → appliedSearch
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setAppliedSearch(searchInput)
    }, 280)
    return () => clearTimeout(debounceRef.current)
  }, [searchInput])

  // Filtered + searched + sorted list
  const filtered = useMemo(() => {
    let list = [...allProjects]

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory)
    }

    // Advanced search engine
    if (appliedSearch.trim()) {
      list = searchProjects(list, appliedSearch.trim())
      return list // search already sorts by relevance, skip sort below
    }

    // Sort (only when not searching)
    if (sortBy === 'latest')      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    else if (sortBy === 'oldest') list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    else if (sortBy === 'most_liked') list.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0))
    else if (sortBy === 'most_viewed') list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))

    return list
  }, [allProjects, activeCategory, appliedSearch, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged      = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => { setPage(1) }, [appliedSearch, activeCategory, sortBy, pageSize])

  useEffect(() => {
    const params = {}
    if (appliedSearch) params.q = appliedSearch
    if (activeCategory !== 'All') params.cat = activeCategory
    if (sortBy !== 'latest') params.sort = sortBy
    setSearchParams(params, { replace: true })
  }, [appliedSearch, activeCategory, sortBy, setSearchParams])

  const handlePageChange = useCallback((p) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearFilters = () => {
    setSearchInput('')
    setAppliedSearch('')
    setActiveCategory('All')
    setSortBy('latest')
    setPage(1)
  }

  const scrollCategories = (dir) => {
    const el = categoryScrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -180 : 180, behavior: 'smooth' })
  }

  const hasFilters = appliedSearch.trim() || activeCategory !== 'All' || sortBy !== 'latest'
  const isSearching = appliedSearch.trim().length > 0

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content="Explore all projects by Muhtasim Rahman — web apps, tools, educational projects, and more." />
      </Helmet>

      <div className="container-xl py-6 lg:py-10" ref={topRef}>

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Projects' }]} />

        {/* ── Page Header ── */}
        <div className="mt-5 mb-7">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-[var(--accent-light)] flex items-center justify-center">
              <FontAwesomeIcon icon={faBolt} className="text-[var(--accent-primary)] text-[10px]" />
            </div>
            <span className="text-[10px] font-extrabold text-[var(--accent-primary)] uppercase tracking-widest">
              Portfolio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold projects-heading-gradient leading-tight">
            Projects Catalog
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
            {loading
              ? 'Loading catalog…'
              : isSearching
                ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${appliedSearch}"`
                : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} ${activeCategory !== 'All' ? `in ${activeCategory}` : 'available'}`}
          </p>
        </div>

        {/* ── Controls Row ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 items-stretch sm:items-center">

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-xs pointer-events-none"
            />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search titles, tags, tech stack, features…"
              className="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs text-[var(--text-primary)]
                         bg-[var(--bg-surface)] border border-[var(--border-color)]
                         hover:border-[var(--border-strong)] focus:border-[var(--accent-primary)]
                         outline-none placeholder:text-[var(--text-tertiary)] transition-all"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(''); setAppliedSearch('') }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center
                           text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-all"
                aria-label="Clear search">
                <FontAwesomeIcon icon={faXmark} className="text-xs" />
              </button>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Sort (hidden when searching — results sorted by relevance) */}
            {!isSearching && (
              <SortDropdown value={sortBy} onChange={setSortBy} />
            )}

            {/* Search relevance indicator */}
            {isSearching && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--accent-light)] border border-[var(--accent-primary)]/20 text-xs font-semibold text-[var(--accent-primary)]">
                <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
                By relevance
              </div>
            )}

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-1">
              {[
                { id: 'grid', icon: faTableCells, label: 'Grid' },
                { id: 'list', icon: faList, label: 'List' },
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

        {/* ── Category filter row ── */}
        {!loading && categories.length > 1 && (
          <div className="relative flex items-center gap-2 mb-7 pb-3 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] flex-shrink-0 text-xs font-bold">
              <FontAwesomeIcon icon={faFilter} className="text-[9px]" />
            </div>

            <button
              onClick={() => scrollCategories('left')}
              className="hidden md:flex w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] items-center justify-center flex-shrink-0 transition-all"
              aria-label="Scroll categories left">
              <FontAwesomeIcon icon={faChevronLeft} className="text-[8px]" />
            </button>

            <div
              ref={categoryScrollRef}
              className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none touch-pan-x pb-0.5">
              {categories.map(cat => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={cat === activeCategory}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="hidden md:flex w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] items-center justify-center flex-shrink-0 transition-all"
              aria-label="Scroll categories right">
              <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold
                           text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/15
                           border border-red-500/20 transition-all whitespace-nowrap">
                <FontAwesomeIcon icon={faXmark} />
                Reset
              </button>
            )}
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <SkeletonGrid view={view} count={pageSize} />
        ) : error ? (
          <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-2xl">
            <p className="text-xs text-[var(--text-secondary)]">Failed to load projects. Check your connection.</p>
            <button onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold rounded-xl transition-all">
              Retry
            </button>
          </div>
        ) : paged.length === 0 ? (
          <EmptyState hasFilters={!!hasFilters} onClear={clearFilters} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${page}-${activeCategory}-${appliedSearch}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
