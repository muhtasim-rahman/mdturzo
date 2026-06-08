// FeedPage.jsx — v2.5.2
// Changes from v2.5.1:
//  - Header matches ProjectsPage style (no full-width gradient banner, simple clean header)
//  - Navbar spacing fixed: single paddingTop: 'var(--navbar-h)' at container level only
//  - Sidebar: real user data, clickable tags (4 rows, expandable, max 10 rows height)
//  - Tags clickable → search bar auto-fill + URL update
//  - Search is URL-connected (q param)
//  - Feed header design matches projects page
//  - Removed nav section, added useful content

import './feed.css'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper, faPenNib, faVideo, faMagnifyingGlass, faXmark,
  faLocationDot, faLink, faHashtag, faRss, faChevronDown, faChevronUp,
  faLayerGroup, faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons'

import { VisibilityGuard }    from '../shared/VisibilityGuard.jsx'
import BlogCard               from './BlogCard.jsx'
import PostCard               from './PostCard.jsx'
import { SITE_CONFIG }        from '../../config/site.config.js'
import { buildTitle }         from '../../utils/seo.js'
import { trackPage }          from '../../services/analytics.js'
import {
  getPublishedBlogs, getPublishedPosts,
} from '../../services/supabase.js'

// ── Skeletons ─────────────────────────────────────────────────
function BlogCardSk() {
  return (
    <div className="blog-card" style={{ pointerEvents: 'none' }}>
      <div className="sk" style={{ width: '100%', aspectRatio: '16/7' }} />
      <div style={{ padding: '1rem 1.125rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div className="sk" style={{ height: 20, width: 52, borderRadius: 99 }} />
          <div className="sk" style={{ height: 20, width: 72, borderRadius: 99 }} />
        </div>
        <div className="sk" style={{ height: 18, width: '75%', borderRadius: 6 }} />
        <div className="sk" style={{ height: 13, width: '100%', borderRadius: 6 }} />
        <div className="sk" style={{ height: 13, width: '55%', borderRadius: 6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <div className="sk" style={{ height: 11, width: 64, borderRadius: 6 }} />
          <div className="sk" style={{ height: 11, width: 110, borderRadius: 6 }} />
        </div>
      </div>
    </div>
  )
}
function PostCardSk() {
  return (
    <div className="post-card" style={{ pointerEvents: 'none' }}>
      <div style={{ display: 'flex', gap: 10, padding: '0.875rem 1rem' }}>
        <div className="sk" style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div className="sk" style={{ height: 13, width: 130, borderRadius: 6 }} />
          <div className="sk" style={{ height: 10, width: 90, borderRadius: 6 }} />
        </div>
      </div>
      <div style={{ padding: '0 1rem 0.875rem', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div className="sk" style={{ height: 13, width: '100%', borderRadius: 6 }} />
        <div className="sk" style={{ height: 13, width: '80%', borderRadius: 6 }} />
      </div>
      <div className="sk" style={{ width: '100%', aspectRatio: '16/9' }} />
      <div style={{ display: 'flex', padding: '0.5rem' }}>
        {[0,1,2].map(i => <div key={i} className="sk" style={{ flex: 1, height: 36, margin: '0 4px', borderRadius: 8 }} />)}
      </div>
    </div>
  )
}

// ── Sidebar: About card (real user data) ─────────────────────
function AboutCard() {
  const { owner, siteTagline, siteURL } = SITE_CONFIG
  return (
    <div className="sidebar-card">
      {/* Cover gradient */}
      <div style={{
        height: 72,
        background: 'linear-gradient(135deg, var(--accent-primary), #818cf8, #10b981)',
        borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
        flexShrink: 0,
      }} />
      <div style={{ padding: '0 1.125rem 1.125rem', marginTop: -32 }}>
        {/* Avatar */}
        <div style={{
          width: 62, height: 62, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), #818cf8)',
          border: '3px solid var(--bg-surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src="/logo.webp"
            alt={owner.displayName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '0.9375rem', color: 'var(--text-primary)', marginTop: '0.625rem',
        }}>
          {owner.displayName}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
          {siteTagline || 'Web Developer & Designer'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.625rem' }}>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--accent-primary)', fontSize: '0.65rem', flexShrink: 0 }} />
            {owner.location || 'Nilphamari, Bangladesh'}
          </span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faLink} style={{ color: 'var(--accent-primary)', fontSize: '0.65rem', flexShrink: 0 }} />
            <a href={siteURL} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              mdturzo.web.app
            </a>
          </span>
        </div>

        <Link
          to="/about"
          style={{
            display: 'block', marginTop: '0.75rem', textAlign: 'center',
            padding: '0.45rem', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700,
            textDecoration: 'none', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--accent-primary)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--accent-primary)'
          }}
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}

// ── Sidebar: Tags (expandable, 4 rows at a time, max ~10 rows) ─
const TAG_ROW_H = 34  // approx height of one row of tags
const ROWS_PER_PAGE = 4

function TagsCard({ allTags, onTagClick }) {
  const [expanded, setExpanded] = useState(false)
  const [page, setPage]         = useState(1) // how many "pages" of 4 rows shown
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(260)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(e => setContainerWidth(e[0].contentRect.width))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  if (!allTags.length) return null

  // Approximate tags per row based on container width
  const avgTagWidth = 72 // px including gap
  const tagsPerRow  = Math.max(1, Math.floor(containerWidth / avgTagWidth))
  const rowsToShow  = page * ROWS_PER_PAGE
  const maxRows     = 10
  const tagsToShow  = Math.min(allTags.length, rowsToShow * tagsPerRow)
  const maxTags     = maxRows * tagsPerRow
  const hasMore     = allTags.length > tagsToShow && page * ROWS_PER_PAGE < maxRows

  return (
    <div className="sidebar-card">
      <div className="sidebar-card-header" style={{ paddingBottom: '0.25rem' }}>
        <FontAwesomeIcon icon={faHashtag} style={{ marginRight: 6, color: 'var(--accent-primary)' }} />
        Trending Tags
      </div>
      <div
        ref={containerRef}
        className="sidebar-card-body"
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.375rem',
          maxHeight: `${maxRows * TAG_ROW_H}px`,
          overflow: 'hidden',
        }}
      >
        {allTags.slice(0, tagsToShow).map(tag => (
          <button
            key={tag}
            className="tag-badge-clickable"
            onClick={() => onTagClick?.(tag)}
            title={`Search #${tag}`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Show more / less */}
      {(hasMore || page > 1) && (
        <div style={{ padding: '0.5rem 1.125rem 0.75rem', borderTop: '1px solid var(--border-color)', marginTop: '0.25rem' }}>
          <button
            onClick={() => {
              if (hasMore) setPage(p => p + 1)
              else setPage(1)
            }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent-primary)', fontSize: '0.78rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4, padding: 0,
            }}
          >
            <FontAwesomeIcon icon={hasMore ? faChevronDown : faChevronUp} style={{ fontSize: '0.65rem' }} />
            {hasMore ? `Show more tags` : 'Show less'}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────
function Empty({ q, type }) {
  return (
    <motion.div className="feed-empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.25rem', color: 'var(--text-tertiary)',
      }}>
        <FontAwesomeIcon icon={faNewspaper} />
      </div>
      <div>
        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
          {q ? `No results for "${q}"` : `No ${type !== 'all' ? type + 's' : 'content'} yet`}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          {q ? 'Try a different keyword or tag.' : 'Check back soon!'}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────
function FeedContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [type,   setType]   = useState(searchParams.get('type') || 'all')
  const [sort,   setSort]   = useState(searchParams.get('sort') || 'newest')
  const [search, setSearch] = useState(searchParams.get('q')    || '')
  const [query,  setQuery]  = useState(searchParams.get('q')    || '')

  const [blogs,   setBlogs]   = useState([])
  const [posts,   setPosts]   = useState([])
  const [allTags, setAllTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const searchInputRef = useRef(null)

  // Track page
  useEffect(() => { trackPage('Feed') }, [])

  // Sync URL params
  useEffect(() => {
    const params = {}
    if (type !== 'all')        params.type = type
    if (sort !== 'newest')     params.sort = sort
    if (query)                 params.q    = query
    setSearchParams(params, { replace: true })
  }, [type, sort, query])

  // Load data
  useEffect(() => {
    setLoading(true); setError(null)
    Promise.all([getPublishedBlogs(), getPublishedPosts()])
      .then(([b, p]) => {
        setBlogs(b || [])
        setPosts(p || [])
        // Aggregate real tags from both tables
        const tags = [...new Set([...(b||[]), ...(p||[])].flatMap(x => x.tags || []).filter(Boolean))]
          .sort((a, z) => a.localeCompare(z))
        setAllTags(tags)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim().toLowerCase()), 280)
    return () => clearTimeout(t)
  }, [search])

  const handleType = useCallback(t => { setType(t); setSearch(''); setQuery('') }, [])

  // Tag click → set search
  const handleTagClick = useCallback((tag) => {
    setSearch(tag)
    setType('all')
    searchInputRef.current?.focus()
  }, [])

  const items = useMemo(() => {
    let combined = []
    if (type !== 'post') combined.push(...blogs.map(b => ({ ...b, _type: 'blog' })))
    if (type !== 'blog') combined.push(...posts.map(p => ({ ...p, _type: 'post' })))

    if (query) {
      combined = combined.filter(x =>
        x.title?.toLowerCase().includes(query) ||
        (x.short_description || x.description || x.content || '').toLowerCase().includes(query) ||
        x.category?.toLowerCase().includes(query) ||
        x.tags?.some(t => t.toLowerCase().includes(query))
      )
    }

    if (sort === 'newest')  combined.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    if (sort === 'oldest')  combined.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
    if (sort === 'popular') combined.sort((a,b) => (b.views_count||0) - (a.views_count||0))

    // Pinned blogs first (only when no search)
    if (!query && type !== 'post') {
      const pinned = combined.filter(x => x._type === 'blog' && x.pinned)
      const rest   = combined.filter(x => !(x._type === 'blog' && x.pinned))
      return [...pinned, ...rest]
    }
    return combined
  }, [blogs, posts, type, sort, query])

  const counts = { blog: blogs.length, post: posts.length, all: blogs.length + posts.length }

  return (
    <>
      <Helmet>
        <title>{buildTitle('Feed')}</title>
        <meta name="description" content="Blogs, posts and updates by Muhtasim Rahman." />
        {query && <meta name="robots" content="noindex" />}
      </Helmet>

      {/* ── Page header — matches ProjectsPage style ─────────── */}
      <div className="container-xl" style={{ paddingTop: 'calc(var(--navbar-h) + 1.5rem)', paddingBottom: '0' }}>
        <motion.div
          style={{ marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p style={{
            fontSize: '0.7rem', fontWeight: 700,
            color: 'var(--accent-primary)', textTransform: 'uppercase',
            letterSpacing: '0.14em', marginBottom: 6,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <FontAwesomeIcon icon={faRss} />
            Content
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 900, color: 'var(--text-primary)',
            lineHeight: 1.15,
          }}>
            My{' '}
            <span style={{
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-hover))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Feed
            </span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: 6 }}>
            {loading
              ? 'Loading content…'
              : `${counts.all} item${counts.all !== 1 ? 's' : ''} · Articles, posts and updates`}
          </p>
        </motion.div>
      </div>

      {/* ── Main layout ──────────────────────────────────────── */}
      <div className="container-xl" style={{ paddingBlock: '0 2rem' }}>
        <div className="feed-layout">

          {/* ── Main feed column ─────────────────────────────── */}
          <main className="feed-main">

            {/* Type filter tabs */}
            <div className="feed-filter-bar">
              {[
                { key: 'all',  label: 'All',   icon: faNewspaper },
                { key: 'blog', label: 'Blogs', icon: faPenNib    },
                { key: 'post', label: 'Posts', icon: faVideo     },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  className={`feed-filter-tab ${type === key ? 'active' : ''}`}
                  onClick={() => handleType(key)}
                >
                  <FontAwesomeIcon icon={icon} />
                  {label}
                  {!loading && <span className="count">{counts[key]}</span>}
                </button>
              ))}
            </div>

            {/* Search + Sort row */}
            <div className="feed-controls-row">
              <div className="feed-search-wrap">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${type !== 'all' ? type + 's' : 'feed'}… or click a tag`}
                  className="feed-search-input"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(''); setQuery('') }}
                    style={{
                      position: 'absolute', right: '0.75rem', top: '50%',
                      transform: 'translateY(-50%)', background: 'none', border: 'none',
                      cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0,
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <FontAwesomeIcon icon={faSortAmountDown} style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }} />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="feed-sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>

            {/* Active search indicator */}
            {query && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem',
                fontSize: '0.8125rem', color: 'var(--text-secondary)',
              }}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'var(--accent-primary)' }} />
                Showing results for <strong style={{ color: 'var(--text-primary)' }}>"{query}"</strong>
                <button
                  onClick={() => { setSearch(''); setQuery('') }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-tertiary)', padding: '0 4px',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div style={{
                padding: '0.875rem 1.125rem',
                background: 'color-mix(in srgb, #ef4444 10%, transparent)',
                border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
                borderRadius: 'var(--radius-xl)', color: '#f87171',
                fontSize: '0.875rem', marginBottom: '1rem',
              }}>
                Failed to load feed: {error}
              </div>
            )}

            {/* Feed list */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[0,1,2,3].map(i => i % 2 === 0
                  ? <PostCardSk key={i} />
                  : <BlogCardSk key={i} />
                )}
              </div>
            ) : items.length === 0 ? (
              <Empty q={query} type={type} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${type}-${sort}-${query}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  {items.map((item, i) =>
                    item._type === 'blog'
                      ? <BlogCard key={`blog-${item.id}`} item={item} index={i} onTagClick={handleTagClick} />
                      : <PostCard key={`post-${item.id}`} item={item} index={i} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </main>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <aside className="feed-sidebar">
            <AboutCard />
            {!loading && <TagsCard allTags={allTags} onTagClick={handleTagClick} />}

            {/* Featured posts quick links */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: 6, color: 'var(--accent-primary)' }} />
                Quick Access
              </div>
              <div className="sidebar-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {[
                  ['All Projects', '/projects'],
                  ['About Me',     '/about'],
                  ['Get in Touch', '/contact'],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    to={href}
                    style={{
                      fontSize: '0.8125rem', color: 'var(--text-secondary)',
                      textDecoration: 'none', padding: '0.3rem 0.25rem',
                      borderRadius: 'var(--radius-sm)', transition: 'color 0.15s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = ''}
                  >
                    → {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Top tags quick filter */}
            {!loading && allTags.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-header">Popular Topics</div>
                <div className="sidebar-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {allTags.slice(0, 6).map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left', padding: '0.3rem 0.25rem',
                        fontSize: '0.8125rem', color: 'var(--text-secondary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        borderRadius: 6, transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = ''}
                    >
                      <span>#{tag}</span>
                      <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '0.65rem', opacity: 0.4 }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
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
