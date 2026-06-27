// FeedPage.jsx — v2.5.2
// Major improvements:
//  - Header matches Projects page style
//  - Advanced URL-connected search (title/desc/tags/category/content)
//  - Right sidebar: owner profile data (not hardcoded), expanded tag cloud with show-more
//  - Clickable tags → auto-search in feed
//  - Removed redundant quick-links nav section
//  - Filter/sort improvements

import './feed.css'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper, faPenNib, faVideo, faMagnifyingGlass, faXmark,
  faLocationDot, faLink, faHashtag, faRss,
  faLayerGroup, faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub as faGithubBrand, faFacebook, faLinkedin, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import BlogCard from './BlogCard.jsx'
import PostCard from './PostCard.jsx'
import { SITE_CONFIG } from '../../config/site.config.js'
import { buildTitle } from '../../utils/seo.js'
import { trackPage } from '../../services/analytics.js'
import {
  getPublishedBlogs, getPublishedPosts,
} from '../../services/supabase.js'

const TAGS_PER_ROW = 5
const ROWS_TO_SHOW = 4

// ── Skeletons ─────────────────────────────────────────────────
function BlogCardSk() {
  return (
    <div className="blog-card" style={{ pointerEvents: 'none', cursor: 'default' }}>
      <div className="sk" style={{ width: '100%', aspectRatio: '16/7' }} />
      <div style={{ padding: '1.125rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="sk" style={{ height: 22, width: 52, borderRadius: 99 }} />
          <div className="sk" style={{ height: 22, width: 72, borderRadius: 99 }} />
        </div>
        <div className="sk" style={{ height: 20, width: '80%', borderRadius: 6 }} />
        <div className="sk" style={{ height: 15, width: '100%', borderRadius: 6 }} />
        <div className="sk" style={{ height: 15, width: '65%', borderRadius: 6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="sk" style={{ height: 13, width: 80, borderRadius: 6 }} />
          <div className="sk" style={{ height: 13, width: 110, borderRadius: 6 }} />
        </div>
      </div>
    </div>
  )
}
function PostCardSk() {
  return (
    <div className="post-card" style={{ pointerEvents: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.125rem' }}>
        <div className="sk" style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div className="sk" style={{ height: 14, width: 140, borderRadius: 6 }} />
          <div className="sk" style={{ height: 11, width: 100, borderRadius: 6 }} />
        </div>
      </div>
      <div style={{ padding: '0 1.125rem 0.875rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="sk" style={{ height: 14, width: '100%', borderRadius: 6 }} />
        <div className="sk" style={{ height: 14, width: '85%', borderRadius: 6 }} />
      </div>
      <div className="sk" style={{ width: '100%', aspectRatio: '16/9' }} />
      <div style={{ display: 'flex', borderTop: '1px solid var(--border-color)' }}>
        {[0,1,2].map(i => <div key={i} className="sk" style={{ flex: 1, height: 38, margin: '0.5rem 0.25rem', borderRadius: 8 }} />)}
      </div>
    </div>
  )
}
function FeedSk({ type }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[0,1,2,3].map(i =>
        type === 'post' ? <PostCardSk key={i} /> :
        type === 'blog' ? <BlogCardSk key={i} /> :
        i % 2 === 0     ? <PostCardSk key={i} /> : <BlogCardSk key={i} />
      )}
    </div>
  )
}

// ── Sidebar: Author Profile ───────────────────────────────────
function AuthorCard() {
  const { owner, social, siteURL, siteTagline } = SITE_CONFIG
  const socials = [
    { icon: faGithubBrand, url: social.github,    label: 'GitHub' },
    { icon: faLinkedin,    url: social.linkedin,   label: 'LinkedIn' },
    { icon: faFacebook,    url: social.facebook,   label: 'Facebook' },
    { icon: faInstagram,   url: social.instagram,  label: 'Instagram' },
    { icon: faYoutube,     url: social.youtube,    label: 'YouTube' },
  ]
  return (
    <div className="sidebar-card" style={{ overflow: 'hidden' }}>
      {/* Cover gradient */}
      <div style={{ height: 70, background: 'linear-gradient(135deg, var(--accent-primary) 0%, #818cf8 50%, #06b6d4 100%)', margin: '-1px -1px 0' }} />
      <div style={{ padding: '0 1.25rem 1.25rem', marginTop: -30 }}>
        {/* Avatar */}
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          border: '3px solid var(--bg-surface)',
          overflow: 'hidden', background: 'linear-gradient(135deg, var(--accent-primary), #818cf8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1.375rem', color: '#fff',
        }}>
          <img src="/logo.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none' }} />
        </div>
        {/* Name & tagline */}
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
          {owner.displayName}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: 1 }}>{siteTagline}</p>

        {/* Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.6rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--accent-primary)', fontSize: '0.65rem', width: 12 }} />
            {owner.location}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faLink} style={{ color: 'var(--accent-primary)', fontSize: '0.65rem', width: 12 }} />
            <a href={siteURL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>mdturzo.web.app</a>
          </span>
        </div>

        {/* Social row */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
          {socials.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', fontSize: '0.85rem',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
            >
              <FontAwesomeIcon icon={s.icon} />
            </a>
          ))}
        </div>

        <Link to="/about" style={{
          display: 'block', marginTop: '0.875rem', textAlign: 'center',
          padding: '0.5rem', borderRadius: 'var(--radius-lg)',
          background: 'var(--accent-primary)', color: '#fff',
          fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none',
          transition: 'opacity 0.18s',
        }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '' }}
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}

// ── Sidebar: Tag Cloud ─────────────────────────────────────────
function TagCloud({ allTags, onTagClick }) {
  const [showMore, setShowMore] = useState(false)
  if (!allTags.length) return null

  const maxVisible = TAGS_PER_ROW * ROWS_TO_SHOW
  const maxTotal = TAGS_PER_ROW * 10
  const tagsToShow = showMore ? allTags.slice(0, maxTotal) : allTags.slice(0, maxVisible)
  const hasMore = allTags.length > maxVisible

  return (
    <div className="sidebar-card">
      <div className="sidebar-card-header" style={{ paddingBottom: '0.25rem' }}>
        <FontAwesomeIcon icon={faHashtag} style={{ marginRight: 6, color: 'var(--accent-primary)' }} />
        Popular Tags
      </div>
      <div className="sidebar-card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxHeight: showMore ? 240 : 180, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {tagsToShow.map(tag => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            style={{
              fontSize: '0.73rem', padding: '0.28rem 0.65rem',
              background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'; e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-primary) 40%, transparent)' }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
          >
            #{tag}
          </button>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowMore(v => !v)}
          style={{
            width: '100%', padding: '0.45rem', marginTop: '0.5rem',
            background: 'none', border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)', color: 'var(--text-tertiary)',
            fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.18s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
        >
          <FontAwesomeIcon icon={showMore ? faChevronUp : faChevronDown} />
          {showMore ? 'Show less' : `Show ${Math.min(allTags.length - maxVisible, maxVisible)} more`}
        </button>
      )}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────
function Empty({ q, type }) {
  return (
    <motion.div className="feed-empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--text-tertiary)' }}>
        <FontAwesomeIcon icon={faNewspaper} />
      </div>
      <div>
        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
          {q ? `No results for "${q}"` : `No ${type !== 'all' ? type+'s' : 'content'} yet`}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          {q ? 'Try a different keyword or tag.' : 'Check back soon!'}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main Content ──────────────────────────────────────────────
function FeedContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [type,   setType]   = useState(searchParams.get('type') || 'all')
  const [sort,   setSort]   = useState(searchParams.get('sort') || 'newest')
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [query,  setQuery]  = useState(searchParams.get('q') || '')
  const searchInputRef = useRef(null)

  const [blogs,   setBlogs]   = useState([])
  const [posts,   setPosts]   = useState([])
  const [allTags, setAllTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // Sync URL params
  useEffect(() => {
    const params = {}
    if (type !== 'all') params.type = type
    if (sort !== 'newest') params.sort = sort
    if (query) params.q = query
    setSearchParams(params, { replace: true })
  }, [type, sort, query])

  // External tag/type changes from URL
  useEffect(() => {
    const urlType  = searchParams.get('type') || 'all'
    const urlSort  = searchParams.get('sort') || 'newest'
    const urlQ     = searchParams.get('q') || ''
    setType(urlType); setSort(urlSort); setSearch(urlQ); setQuery(urlQ)
  }, []) // only on mount

  useEffect(() => {
    trackPage('Feed')
    setLoading(true); setError(null)
    Promise.all([getPublishedBlogs(), getPublishedPosts()])
      .then(([b, p]) => {
        setBlogs(b || [])
        setPosts(p || [])
        const tags = [...new Set([...(b||[]), ...(p||[])].flatMap(x => x.tags || []).filter(Boolean))]
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

  const handleTagClick = useCallback((tag) => {
    setSearch(tag)
    setQuery(tag)
    setType('all')
    searchInputRef.current?.focus()
  }, [])

  // Advanced search: score-based relevance
  const items = useMemo(() => {
    let combined = []
    if (type !== 'post') combined.push(...blogs.map(b => ({ ...b, _type: 'blog' })))
    if (type !== 'blog') combined.push(...posts.map(p => ({ ...p, _type: 'post' })))

    if (query) {
      const q = query.toLowerCase()
      combined = combined
        .map(x => {
          let score = 0
          if (x.title?.toLowerCase().includes(q)) score += 10
          if (x.short_description?.toLowerCase().includes(q) || x.description?.toLowerCase().includes(q)) score += 5
          if (x.category?.toLowerCase().includes(q)) score += 4
          if (x.tags?.some(t => t.toLowerCase().includes(q))) score += 3
          if (x.content?.toLowerCase().includes(q)) score += 1
          return { ...x, _score: score }
        })
        .filter(x => x._score > 0)
        .sort((a, b) => b._score - a._score)
    } else {
      if (sort === 'newest')  combined.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
      if (sort === 'oldest')  combined.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
      if (sort === 'popular') combined.sort((a,b) => (b.views_count||0) - (a.views_count||0))
      if (sort === 'trending') combined.sort((a,b) => ((b.likes_count||0) * 2 + (b.views_count||0)) - ((a.likes_count||0) * 2 + (a.views_count||0)))

      // Pinned blogs always first when not searching
      if (type !== 'post') {
        const pinned = combined.filter(x => x._type === 'blog' && x.pinned)
        const rest   = combined.filter(x => !(x._type === 'blog' && x.pinned))
        combined = [...pinned, ...rest]
      }
    }
    return combined
  }, [blogs, posts, type, sort, query])

  const counts = { blog: blogs.length, post: posts.length, all: blogs.length + posts.length }

  return (
    <>
      <Helmet>
        <title>{buildTitle('Feed')}</title>
        <meta name="description" content="Blogs, posts and updates by Muhtasim Rahman." />
      </Helmet>

      {/* ── Page Header (matches Projects page style) ── */}
      <div style={{ paddingTop: 'var(--navbar-h)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-xl" style={{ paddingTop: 'clamp(1.25rem,3.5vw,2rem)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.375rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FontAwesomeIcon icon={faRss} /> Content Hub
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem,3.5vw,2.5rem)', fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
                <span style={{ color: 'var(--text-primary)' }}>My </span>
                <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Feed</span>
              </h1>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {loading ? 'Loading…' : `${counts.blog} article${counts.blog !== 1 ? 's' : ''} · ${counts.post} post${counts.post !== 1 ? 's' : ''}`}
              </p>
            </motion.div>

            {/* Quick type pills in header */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { key: 'all', label: 'All', icon: faLayerGroup },
                { key: 'blog', label: 'Blogs', icon: faPenNib },
                { key: 'post', label: 'Posts', icon: faVideo },
              ].map(({ key, label, icon }) => (
                <button key={key}
                  onClick={() => handleType(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                    border: `1.5px solid ${type === key ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    background: type === key ? 'var(--accent-primary)' : 'var(--bg-surface)',
                    color: type === key ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.18s',
                  }}>
                  <FontAwesomeIcon icon={icon} style={{ fontSize: '0.7rem' }} />
                  {label}
                  {!loading && <span style={{ fontSize: '0.7rem', opacity: 0.75 }}>({counts[key]})</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl" style={{ paddingBlock: '1.5rem' }}>
        <div className="feed-layout">
          {/* ── Main ─────────────────────────────── */}
          <main className="feed-main">
            {/* Search + Sort controls */}
            <div className="feed-controls-row" style={{ marginBottom: '1.25rem' }}>
              <div className="feed-search-wrap" style={{ flex: 1 }}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${type !== 'all' ? type+'s' : 'blogs & posts'}…`}
                  className="feed-search-input"
                />
                {search && (
                  <button onClick={() => { setSearch(''); setQuery('') }}
                    style={{ position:'absolute', right:'0.75rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-tertiary)', padding:0 }}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)} className="feed-sort-select">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Viewed</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            {/* Active query indicator */}
            {query && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.5rem 0.875rem', background: 'color-mix(in srgb, var(--accent-primary) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-primary) 25%, transparent)', borderRadius: 'var(--radius-xl)', marginBottom: '1rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }} />
                Showing results for <strong style={{ color: 'var(--text-primary)' }}>"{query}"</strong>
                <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>
                <button onClick={() => { setSearch(''); setQuery('') }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '0 0.25rem', fontSize: '0.9rem' }}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ padding:'0.875rem 1.125rem', background:'color-mix(in srgb, #ef4444 10%, transparent)', border:'1px solid color-mix(in srgb, #ef4444 30%, transparent)', borderRadius:'var(--radius-xl)', color:'#f87171', fontSize:'0.875rem', marginBottom:'1rem' }}>
                <FontAwesomeIcon icon={faXmark} style={{ marginRight:8 }} />Failed to load: {error}
              </div>
            )}

            {/* Content */}
            {loading ? <FeedSk type={type} />
             : items.length === 0 ? <Empty q={query} type={type} />
             : (
              <AnimatePresence mode="wait">
                <motion.div key={`${type}-${sort}-${query}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map((item, i) =>
                    item._type === 'blog'
                      ? <BlogCard key={`blog-${item.id}`} item={item} index={i} onTagClick={handleTagClick} />
                      : <PostCard key={`post-${item.id}`} item={item} index={i} onTagClick={handleTagClick} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </main>

          {/* ── Sidebar ──────────────────────────── */}
          <aside className="feed-sidebar">
            <AuthorCard />
            {!loading && <TagCloud allTags={allTags} onTagClick={handleTagClick} />}
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
