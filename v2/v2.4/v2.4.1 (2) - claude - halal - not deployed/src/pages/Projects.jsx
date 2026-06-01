// Projects.jsx — v2.4.1
// Redesigned header, sort dropdown, scrollable category pills,
// responsive pagination: desktop=12, tablet=8, mobile=6

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchParams }         from 'react-router-dom'
import { Helmet }                  from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon }         from '@fortawesome/react-fontawesome'
import {
  faTableCells, faList, faMagnifyingGlass, faXmark,
  faChevronLeft, faChevronRight, faArrowsRotate, faChevronDown,
  faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard }          from '../components/shared/VisibilityGuard.jsx'
import ProjectCard, { NoProjectsPlaceholder } from '../components/projects/ProjectCard.jsx'
import Breadcrumb                   from '../components/shared/Breadcrumb.jsx'
import { buildTitle }               from '../utils/seo.js'
import { trackPage }                from '../services/analytics.js'
import { getPublishedProjects, getProjectCategories } from '../services/supabase.js'

const SORT_OPTIONS = [
  { id: 'latest',  label: 'Latest',      sorter: (a, b) => new Date(b.created_at) - new Date(a.created_at) },
  { id: 'oldest',  label: 'Oldest',      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at) },
  { id: 'liked',   label: 'Most Liked',  sorter: (a, b) => (b.likes_count ?? 0)  - (a.likes_count ?? 0) },
  { id: 'viewed',  label: 'Most Viewed', sorter: (a, b) => (b.views_count ?? 0)  - (a.views_count ?? 0) },
  { id: 'az',      label: 'A → Z',       sorter: (a, b) => a.title.localeCompare(b.title) },
]

function usePerPage() {
  const calc = () => {
    if (typeof window === 'undefined') return 12
    const w = window.innerWidth
    if (w > 1024) return 12
    if (w > 580)  return 8
    return 6
  }
  const [perPage, setPerPage] = useState(calc)
  useEffect(() => {
    const h = () => setPerPage(calc())
    window.addEventListener('resize', h, { passive: true })
    return () => window.removeEventListener('resize', h)
  }, [])
  return perPage
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = SORT_OPTIONS.find(s => s.id === value) ?? SORT_OPTIONS[0]

  useEffect(() => {
    const h = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all whitespace-nowrap">
        <FontAwesomeIcon icon={faBarsStaggered} className="text-xs text-[var(--text-tertiary)]" />
        <span className="hidden sm:inline">{current.label}</span>
        <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] text-[var(--text-tertiary)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-[calc(100%+6px)] right-0 w-40 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-xl z-30 py-1.5 overflow-hidden"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.14 }}>
            {SORT_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => { onChange(opt.id); setOpen(false) }}
                className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                  opt.id === value
                    ? 'text-[var(--accent-primary)] bg-[var(--accent-light)] font-medium'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                }`}>
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CategoryRow({ categories, active, onSelect, hasFilters, onClear }) {
  const rowRef = useRef(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = rowRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = rowRef.current
    el?.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll, { passive: true })
    return () => {
      el?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll, categories])

  const scroll = dir => rowRef.current?.scrollBy({ left: dir * 180, behavior: 'smooth' })

  return (
    <div className="relative flex items-center">
      {canLeft && (
        <button onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 z-10 w-7 h-7 items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          style={{ background: 'linear-gradient(to right, var(--bg-page) 60%, transparent)' }}>
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </button>
      )}

      <div ref={rowRef} className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5"
        style={{ scrollbarWidth: 'none', paddingLeft: canLeft ? '28px' : '0', paddingRight: canRight ? '28px' : '0' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => onSelect(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              cat === active
                ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)]'
            }`}>
            {cat}
          </button>
        ))}
        {hasFilters && (
          <button onClick={onClear}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
            <FontAwesomeIcon icon={faXmark} /> Clear
          </button>
        )}
      </div>

      {canRight && (
        <button onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 z-10 w-7 h-7 items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          style={{ background: 'linear-gradient(to left, var(--bg-page) 60%, transparent)' }}>
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>
      )}
    </div>
  )
}

function SkeletonGrid({ view, count }) {
  const items = Array.from({ length: count }, (_, i) => i)
  if (view === 'list') {
    return (
      <div className="space-y-3">
        {items.map(i => (
          <div key={i} className="flex bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden h-[76px]">
            <div className="w-[3px] sk flex-shrink-0" />
            <div className="w-24 sk flex-shrink-0" style={{ animationDelay: `${i * 0.05}s` }} />
            <div className="flex-1 px-4 py-3 space-y-2">
              <div className="flex gap-1.5"><div className="sk h-4 w-14 rounded-full" /><div className="sk h-4 w-12 rounded-full" /></div>
              <div className="sk h-4 w-1/2 rounded" style={{ animationDelay: `${i * 0.05 + 0.1}s` }} />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="proj-page-grid">
      {items.map(i => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk aspect-video w-full" style={{ animationDelay: `${i * 0.05}s` }} />
          <div className="p-4 space-y-2.5">
            <div className="flex gap-1"><div className="sk h-4 w-14 rounded-full" /><div className="sk h-4 w-16 rounded-full" /></div>
            <div className="sk h-4 w-3/4 rounded" style={{ animationDelay: `${i * 0.05 + 0.06}s` }} />
            <div className="sk h-3 w-full rounded" /><div className="sk h-3 w-2/3 rounded" />
            <div className="sk h-px w-full rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Pagination({ current, total, onChange }) {
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  const visible = pages.filter(p => p === 1 || p === total || Math.abs(p - current) <= 1)
  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button onClick={() => onChange(current - 1)} disabled={current === 1}
        className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-35 disabled:cursor-not-allowed transition-all text-sm">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {visible.reduce((acc, p, i, arr) => {
        if (i > 0 && arr[i-1] !== p - 1)
          acc.push(<span key={`e${p}`} className="w-7 text-center text-[var(--text-tertiary)] text-sm">…</span>)
        acc.push(
          <button key={p} onClick={() => onChange(p)}
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
      <button onClick={() => onChange(current + 1)} disabled={current === total}
        className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] disabled:opacity-35 disabled:cursor-not-allowed transition-all text-sm">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

function ProjectsContent() {
  const [searchParams, setSearchParams]     = useSearchParams()
  const [allProjects, setAllProjects]       = useState([])
  const [categories, setCategories]         = useState([])
  const [loading, setLoading]               = useState(true)
  const [error, setError]                   = useState(false)
  const [view, setView]                     = useState('grid')
  const [search, setSearch]                 = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'All')
  const [sortId, setSortId]                 = useState(searchParams.get('sort') || 'latest')
  const [page, setPage]                     = useState(1)
  const topRef  = useRef(null)
  const perPage = usePerPage()

  useEffect(() => { trackPage('Projects') }, [])

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
      .catch(() => { if (!mounted) return; setError(true); setLoading(false) })
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    let list = [...allProjects]
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.category?.toLowerCase().includes(q)
      )
    }
    const sorter = SORT_OPTIONS.find(s => s.id === sortId)?.sorter
    if (sorter) list.sort(sorter)
    return list
  }, [allProjects, activeCategory, search, sortId])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged      = filtered.slice((page - 1) * perPage, page * perPage)

  useEffect(() => { setPage(1) }, [search, activeCategory, sortId])

  useEffect(() => {
    const p = {}
    if (search)                  p.q    = search
    if (activeCategory !== 'All') p.cat = activeCategory
    if (sortId !== 'latest')     p.sort = sortId
    setSearchParams(p, { replace: true })
  }, [search, activeCategory, sortId, setSearchParams])

  const handlePageChange = useCallback((p) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearFilters = () => { setSearch(''); setActiveCategory('All'); setSortId('latest') }
  const hasFilters   = !!(search.trim() || activeCategory !== 'All' || sortId !== 'latest')

  return (
    <>
      <Helmet>
        <title>{buildTitle('Projects')}</title>
        <meta name="description" content="All projects by Muhtasim Rahman — web apps, tools, educational utilities, and open-source work." />
      </Helmet>

      <div className="container-xl py-10 lg:py-14" ref={topRef}>
        <Breadcrumb items={[{ label: 'Projects' }]} />

        {/* Header */}
        <motion.div className="mt-5 mb-7" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-3xl sm:text-[2.25rem] font-display font-bold text-[var(--text-primary)] leading-tight">Projects</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5">
            {loading ? 'Loading…' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''}${hasFilters ? ' found' : ''}`}
          </p>
        </motion.div>

        {/* Row 1 — search + sort + view */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-xs pointer-events-none" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full h-10 pl-8 pr-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <SortDropdown value={sortId} onChange={setSortId} />
            <div className="flex items-center gap-0.5 h-10 px-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl">
              {[{ id: 'grid', icon: faTableCells, label: 'Grid' }, { id: 'list', icon: faList, label: 'List' }].map(v => (
                <button key={v.id} onClick={() => setView(v.id)} title={v.label}
                  className={`w-9 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                    view === v.id ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}>
                  <FontAwesomeIcon icon={v.icon} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — category pills */}
        {!loading && categories.length > 1 && (
          <div className="mb-7">
            <CategoryRow categories={categories} active={activeCategory} onSelect={setActiveCategory} hasFilters={hasFilters} onClear={clearFilters} />
          </div>
        )}

        {/* Content */}
        {loading ? (
          <SkeletonGrid view={view} count={perPage} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p className="text-sm text-[var(--text-secondary)]">Failed to load projects.</p>
            <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
              <FontAwesomeIcon icon={faArrowsRotate} /> Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div className="flex flex-col items-center justify-center py-20 gap-4 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl text-[var(--text-tertiary)]" />
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] text-sm">No projects match your filters</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">Try adjusting search, category, or sort.</p>
            </div>
            <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all">
              <FontAwesomeIcon icon={faArrowsRotate} className="text-xs" /> Clear filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={`${view}-${page}-${activeCategory}-${search}-${sortId}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {view === 'grid' ? (
                <div className="proj-page-grid">
                  {paged.map((p, i) => <ProjectCard key={p.id} project={p} index={i} view="grid" />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {paged.map((p, i) => <ProjectCard key={p.id} project={p} index={i} view="list" />)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && totalPages > 1 && <Pagination current={page} total={totalPages} onChange={handlePageChange} />}
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
