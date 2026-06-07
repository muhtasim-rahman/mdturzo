// FeedPage.jsx — v2.5.0
// Unified Feed: shows blogs + posts together.
// Features: type filter tabs, category filter, search, sort, grid/list toggle.
// Pinned blogs appear at top when "All" or "Blog" is selected.
// Skeleton loading for all states.

import './feed.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faXmark, faTableCells, faList,
  faNewspaper, faPenNib, faVideo, faSort, faSlidersH, faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import FeedCard from './FeedCard.jsx'
import { buildTitle } from '../../utils/seo.js'
import { trackPage } from '../../services/analytics.js'
import { getPublishedBlogs, getPublishedPosts, getBlogCategories, getPostCategories } from '../../services/supabase.js'

// ── Skeleton ──────────────────────────────────────────────────
function FeedSkeleton({ view }) {
  const items = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div className={view === 'grid' ? 'feed-grid' : 'feed-list'}>
      {items.map(i => (
        <div key={i} className="feed-card-sk">
          {view === 'grid' ? (
            <>
              <div className="sk" style={{ aspectRatio: '16/9', width: '100%' }} />
              <div className="p-4 space-y-2">
                <div className="flex gap-2">
                  <div className="sk h-5 w-12 rounded-full" />
                  <div className="sk h-5 w-16 rounded-full" />
                </div>
                <div className="sk h-5 w-4/5 rounded" />
                <div className="sk h-4 w-full rounded" />
                <div className="sk h-4 w-3/4 rounded" />
                <div className="flex justify-between mt-2">
                  <div className="sk h-3.5 w-20 rounded" />
                  <div className="sk h-3.5 w-24 rounded" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-0">
              <div className="sk flex-shrink-0 rounded-l-xl" style={{ width: 160, minHeight: 120 }} />
              <div className="p-4 flex-1 space-y-2">
                <div className="sk h-5 w-14 rounded-full" />
                <div className="sk h-5 w-4/5 rounded" />
                <div className="sk h-4 w-full rounded" />
                <div className="flex justify-between mt-2">
                  <div className="sk h-3.5 w-20 rounded" />
                  <div className="sk h-3.5 w-24 rounded" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────
function Empty({ query, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center">
        <FontAwesomeIcon icon={faNewspaper} className="text-2xl text-[var(--text-tertiary)]" />
      </div>
      <div>
        <p className="text-[var(--text-primary)] font-semibold">
          {query ? `No results for "${query}"` : `No ${type !== 'all' ? type + 's' : 'posts'} yet`}
        </p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {query ? 'Try a different search term or category.' : 'Check back soon for new content.'}
        </p>
      </div>
    </motion.div>
  )
}

// ── Tab button ────────────────────────────────────────────────
function TypeTab({ label, icon, active, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
        active
          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]'
      }`}
    >
      <FontAwesomeIcon icon={icon} />
      {label}
      {count != null && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
          active ? 'bg-white/20 text-white' : 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)]'
        }`}>
          {count}
        </span>
      )}
    </button>
  )
}

// ── Category pill ─────────────────────────────────────────────
function CatPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
        active
          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)]'
      }`}
    >
      {label}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────
function FeedContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialType = searchParams.get('type') || 'all'   // all | blog | post

  const [type, setType]         = useState(initialType)
  const [view, setView]         = useState('grid')        // grid | list
  const [sort, setSort]         = useState('newest')       // newest | oldest | popular
  const [category, setCategory] = useState('All')
  const [search, setSearch]     = useState('')
  const [query, setQuery]       = useState('')            // debounced search

  const [blogs, setBlogs]   = useState([])
  const [posts, setPosts]   = useState([])
  const [blogCats, setBlogCats] = useState([])
  const [postCats, setPostCats] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // Sync type to URL
  useEffect(() => {
    trackPage('Feed')
    setSearchParams(type !== 'all' ? { type } : {}, { replace: true })
  }, [type])

  // Fetch all data once
  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      getPublishedBlogs(),
      getPublishedPosts(),
      getBlogCategories(),
      getPostCategories(),
    ])
      .then(([b, p, bc, pc]) => {
        setBlogs(b)
        setPosts(p)
        setBlogCats(bc)
        setPostCats(pc)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim().toLowerCase()), 300)
    return () => clearTimeout(t)
  }, [search])

  // Categories available for current type
  const availableCategories = useMemo(() => {
    const cats = type === 'blog' ? blogCats : type === 'post' ? postCats : [...new Set([...blogCats, ...postCats])]
    return ['All', ...cats.filter(Boolean)]
  }, [type, blogCats, postCats])

  // Reset category when type changes
  const handleTypeChange = useCallback((t) => {
    setType(t)
    setCategory('All')
    setSearch('')
  }, [])

  // Combined feed items with type tag
  const items = useMemo(() => {
    let combined = []

    if (type !== 'post') {
      combined.push(...blogs.map(b => ({ ...b, _type: 'blog' })))
    }
    if (type !== 'blog') {
      combined.push(...posts.map(p => ({ ...p, _type: 'post' })))
    }

    // Filter by category
    if (category !== 'All') {
      combined = combined.filter(x => x.category === category)
    }

    // Filter by search query
    if (query) {
      combined = combined.filter(x =>
        x.title?.toLowerCase().includes(query) ||
        x.short_description?.toLowerCase().includes(query) ||
        x.category?.toLowerCase().includes(query) ||
        x.tags?.some(t => t.toLowerCase().includes(query))
      )
    }

    // Sort
    if (sort === 'newest') {
      combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sort === 'oldest') {
      combined.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sort === 'popular') {
      combined.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
    }

    // Pinned blogs always first (when no search)
    if (!query) {
      const pinned = combined.filter(x => x._type === 'blog' && x.pinned)
      const rest   = combined.filter(x => !(x._type === 'blog' && x.pinned))
      return [...pinned, ...rest]
    }

    return combined
  }, [blogs, posts, type, category, query, sort])

  return (
    <>
      <Helmet>
        <title>{buildTitle('Feed')}</title>
        <meta name="description" content="Blogs and posts by Muhtasim Rahman — web development, design, and personal journey." />
      </Helmet>

      {/* ── Banner ── */}
      <div className="feed-page-banner pt-[var(--navbar-h)]">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label mb-3">Thoughts & Content</p>
            <h1 className="font-display text-4xl font-extrabold text-[var(--text-primary)] mb-2">
              Feed
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl">
              Articles, videos and updates — all in one place.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-xl py-8">

        {/* ── Type tabs ── */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <TypeTab
            label="All"
            icon={faNewspaper}
            active={type === 'all'}
            count={!loading ? blogs.length + posts.length : null}
            onClick={() => handleTypeChange('all')}
          />
          <TypeTab
            label="Blogs"
            icon={faPenNib}
            active={type === 'blog'}
            count={!loading ? blogs.length : null}
            onClick={() => handleTypeChange('blog')}
          />
          <TypeTab
            label="Posts"
            icon={faVideo}
            active={type === 'post'}
            count={!loading ? posts.length : null}
            onClick={() => handleTypeChange('post')}
          />
        </div>

        {/* ── Controls row ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${type !== 'all' ? type + 's' : 'feed'}...`}
              className="w-full pl-9 pr-9 py-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto ml-auto sm:ml-0">
            {/* Sort */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faSort}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-xs pointer-events-none"
              />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="feed-select pl-7 text-sm h-10"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="flex items-center border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--bg-surface)]">
              {[['grid', faTableCells], ['list', faList]].map(([v, icon]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                    view === v
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                  title={v === 'grid' ? 'Grid view' : 'List view'}
                >
                  <FontAwesomeIcon icon={icon} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Category pills ── */}
        {!loading && availableCategories.length > 1 && (
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border-color)] overflow-x-auto scrollbar-hide">
            <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0 hidden sm:block">
              <FontAwesomeIcon icon={faFilter} className="mr-1" />
              Filter
            </span>
            {availableCategories.map(cat => (
              <CatPill
                key={cat}
                label={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              />
            ))}
          </div>
        )}

        {/* ── Results info ── */}
        {!loading && (query || category !== 'All') && (
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            {items.length} result{items.length !== 1 ? 's' : ''}
            {query && <> for <strong className="text-[var(--text-primary)]">"{search}"</strong></>}
            {category !== 'All' && <> in <strong className="text-[var(--text-primary)]">{category}</strong></>}
          </p>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-[var(--bg-surface)] border border-red-500/30 rounded-xl text-sm text-red-400 mb-6">
            <FontAwesomeIcon icon={faXmark} />
            Failed to load feed: {error}
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <FeedSkeleton view={view} />
        ) : items.length === 0 ? (
          <Empty query={query} type={type} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${type}-${view}-${sort}-${category}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={view === 'grid' ? 'feed-grid' : 'feed-list'}
            >
              {items.map((item, i) => (
                <FeedCard
                  key={`${item._type}-${item.id}`}
                  item={item}
                  type={item._type}
                  view={view}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  )
}

export default function FeedPage() {
  return (
    <VisibilityGuard page="feed" skeleton="list">
      <FeedContent />
    </VisibilityGuard>
  )
}
