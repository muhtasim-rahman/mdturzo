// Projects.jsx — v2.4.5
import './projects.css'
// Full redesign:
//   - Gradient heading, minimal redesigned header
//   - Advanced search engine (uses projectSearch.js) — separate engine file
//   - Search bar rebuilt: debounced, keyboard shortcut, Ctrl+K
//   - Category dropdown: rounded corners, light/dark responsive
//   - Whole-card hover effect, no title color change
//   - Home: 6 PC / 4 Tablet / 3 Mobile (handled in RecentProjects)
//   - Projects page: 12 PC / 8 Tablet / 6 Mobile per page

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTableCells, faList, faMagnifyingGlass, faXmark, faFilter,
  faChevronLeft, faChevronRight, faFolderOpen, faArrowsRotate,
  faSort, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import ProjectCard from './ProjectCard.jsx'
import Breadcrumb from '../shared/Breadcrumb.jsx'
import { buildTitle } from '../../utils/seo.js'
import { trackPage } from '../../services/analytics.js'
import { getPublishedProjects, getProjectCategories } from '../../services/supabase.js'
import { searchProjects } from '../../services/projectSearch.js'

// ── Category pill ──────────────────────────────────────────────
function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
        active
          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm'
          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)]'
      }`}>
      {label}
    </button>
  )
}

// ── Skeleton ───────────────────────────────────────────────────
function SkeletonGrid({ view, count = 12 }) {
  const items = Array.from({ length: count }, (_, i) => i)
  return view === 'grid' ? (
    <div className="proj-page-grid">
      {items.map(i => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.03}s` }} />
          <div className="p-4 space-y-2.5">
            <div className="sk h-5 w-3/4 rounded" />
            <div className="flex gap-1.5">
              <div className="sk h-4 w-14 rounded-md" />
              <div className="sk h-4 w-16 rounded-md" />
            </div>
            <div className="sk h-3.5 w-full rounded" />
            <div className="sk h-3.5 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-2.5">
      {items.map(i => (
        <div key={i} className="flex bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden h-[88px]">
          <div className="w-1 flex-shrink-0 sk" />
          <div className="w-24 sm:w-36 flex-shrink-0 sk" />
          <div className="flex-1 p-3 space-y-2">
            <div className="sk h-3.5 w-1/3 rounded" />
            <div className="sk h-4 w-3/5 rounded" />
            <div className="sk h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Empty state ────────────────────────────────────────────────
function EmptyState({ hasFilters, query, onClear }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 gap-4"
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
        {query && (
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            Nothing matched <span className="font-semibold text-[var(--text-secondary)]">"{query}"</span>
          </p>
        )}
        <p className="text-xs text-[var(--text-tertiary)] mt-1 max-w-xs mx-auto">
          {hasFilters
            ? 'Try adjusting your search or filter options.'
            : 'Projects will appear here once published.'}
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
          acc.push(
            <span key={`e-${p}`} className="w-9 h-9 flex items-center justify-center text-[var(--text-tertiary)] text-xs">
              …
            </span>
          )
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

  // Controls
  const [inputValue, setInputValue]         = useState(searchParams.get('q') || '')
  const [search, setSearch]                 = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'All')
  const [sortBy, setSortBy]                 = useState(searchParams.get('sort') || 'latest')

  // Page sizing
  const [pageSize, setPageSize] = useState(12)
  const [page, setPage]         = useState(1)

  // Debounce ref
  const debounceRef     = useRef(null)
  const searchInputRef  = useRef(null)
  const topRef          = useRef(null)
  const categoryScrollRef = useRef(null)

  // Track page
  useEffect(() => { trackPage('Projects') }, [])

  // Keyboard shortcut: Ctrl+K / Cmd+K to focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Dynamic page size based on viewport
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setPageSize(w >= 1024 ? 12 : w >= 640 ? 8 : 6)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Load data
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

  // Debounced search
  const handleInputChange = (e) => {
    const val = e.target.value
    setInputValue(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearch(val)
      setPage(1)
    }, 300)
  }

  const clearSearch = () => {
    setInputValue('')
    setSearch('')
    setPage(1)
    searchInputRef.current?.focus()
  }

  // Advanced filtered + sorted list using projectSearch.js
  const filtered = useMemo(() => {
    let list = [...allProjects]

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory)
    }

    // Advanced search
    if (search.trim()) {
      list = searchProjects(list, search)
      // searchProjects already sorts by relevance, so skip date sort when searching
      return list
    }

    // Sort (only when not searching)
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

  // Reset page on filter changes
  useEffect(() => { setPage(1) }, [search, activeCategory, sortBy, pageSize])

  // Sync URL params
  useEffect(() => {
    const params = {}
    if (search) params.q = search
    if (activeCategory !== 'All') params.cat = activeCategory
    if (sortBy !== 'latest') params.sort = sortBy
    setSearchParams(params, { replace: true })
  }, [search, activeCategory, sortBy, setSearchParams])

  const handlePageChange = useCallback((p) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearFilters = () => {
    setInputValue('')
    setSearch('')
    setActiveCategory('All')
    setSortBy('latest')
    setPage(1)
  }

  const scrollCategories = (dir) => {
    const el = categoryScrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -180 : 180, behavior: 'smooth' })
  }

  const hasFilters = search.trim() || activeCategory !== 'All' || sortBy !== 'latest'

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content="Explore all projects by Muhtasim Rahman — web apps, tools, educational projects, and more." />
      </Helmet>

      <div className="container-xl py-6 lg:py-10" ref={topRef}>
        <Breadcrumb items={[{ label: 'Projects' }]} />

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="mt-5 mb-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-[0.15em] mb-1.5 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faLayerGroup} />
                Portfolio
              </p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                <span className="text-[var(--text-primary)]">My </span>
                <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                  Projects
                </span>
              </h1>
              <p className="text-sm text-[var(--text-tertiary)] mt-1.5">
                {loading
                  ? 'Loading project catalog…'
                  : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} available`}
              </p>
            </div>
          </div>
        </div>

        {/* ── Controls row ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-stretch sm:items-center">

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm group">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-xs pointer-events-none group-focus-within:text-[var(--accent-primary)] transition-colors"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search projects…"
              className="w-full pl-9 pr-24 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/15 outline-none text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {inputValue && (
                <button
                  onClick={clearSearch}
                  className="w-5 h-5 rounded flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-all"
                  aria-label="Clear search">
                  <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
                </button>
              )}
              {!inputValue && (
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[9px] text-[var(--text-tertiary)] font-mono">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">

            {/* Sort dropdown */}
            <div className="relative flex items-center bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 gap-2 hover:border-[var(--border-strong)] transition-colors">
              <FontAwesomeIcon icon={faSort} className="text-[10px] text-[var(--text-tertiary)]" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[var(--text-secondary)] font-semibold outline-none cursor-pointer">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="most_liked">Most Liked</option>
                <option value="most_viewed">Most Viewed</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-0.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-1">
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
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                  }`}>
                  <FontAwesomeIcon icon={v.icon} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Category filter bar ──────────────────────────────── */}
        {!loading && categories.length > 1 && (
          <div className="relative flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border-color)]">

            <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-tertiary)] flex-shrink-0 text-xs font-semibold">
              <FontAwesomeIcon icon={faFilter} className="text-[10px]" />
              <span>Filter:</span>
            </div>

            {/* Left scroll */}
            <button
              onClick={() => scrollCategories('left')}
              className="hidden md:flex w-7 h-7 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] text-[var(--text-secondary)] items-center justify-center border border-[var(--border-color)] flex-shrink-0 transition-colors"
              aria-label="Scroll left">
              <FontAwesomeIcon icon={faChevronLeft} className="text-[9px]" />
            </button>

            {/* Category pills */}
            <div
              ref={categoryScrollRef}
              className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 touch-pan-x">
              {categories.map(cat => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={cat === activeCategory}
                  onClick={() => { setActiveCategory(cat); setPage(1) }}
                />
              ))}
            </div>

            {/* Right scroll */}
            <button
              onClick={() => scrollCategories('right')}
              className="hidden md:flex w-7 h-7 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] text-[var(--text-secondary)] items-center justify-center border border-[var(--border-color)] flex-shrink-0 transition-colors"
              aria-label="Scroll right">
              <FontAwesomeIcon icon={faChevronRight} className="text-[9px]" />
            </button>

            {/* Clear filters badge */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition-all">
                <FontAwesomeIcon icon={faXmark} />
                Reset
              </button>
            )}
          </div>
        )}

        {/* ── Content ─────────────────────────────────────────── */}
        {loading ? (
          <SkeletonGrid view={view} count={pageSize} />
        ) : error ? (
          <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-2xl">
            <FontAwesomeIcon icon={faFolderOpen} className="text-3xl text-[var(--text-tertiary)] mb-3 block" />
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              Failed to load projects
            </p>
            <p className="text-xs text-[var(--text-tertiary)] mt-1 mb-4">
              Could not retrieve projects from the database.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold rounded-xl transition-all">
              Retry
            </button>
          </div>
        ) : paged.length === 0 ? (
          <EmptyState hasFilters={!!hasFilters} query={search} onClear={clearFilters} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${page}-${activeCategory}-${search}-${sortBy}`}
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
                <div className="flex flex-col gap-2.5">
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

export default function ProjectsPage() {
  return (
    <VisibilityGuard page="projects" skeleton="grid">
      <ProjectsContent />
    </VisibilityGuard>
  )
}
