// FeedPage.jsx — v2.5.1
// LinkedIn/Facebook hybrid feed: 2-col (main + sidebar), type tabs, search, sort.

import './feed.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper, faPenNib, faVideo, faMagnifyingGlass, faXmark,
  faLocationDot, faLink, faHashtag,
} from '@fortawesome/free-solid-svg-icons'

import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import BlogCard from './BlogCard.jsx'
import PostCard from './PostCard.jsx'
import { SITE_CONFIG } from '../../config/site.config.js'
import { buildTitle } from '../../utils/seo.js'
import { trackPage } from '../../services/analytics.js'
import {
  getPublishedBlogs, getPublishedPosts,
  getBlogCategories, getPostCategories,
} from '../../services/supabase.js'

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
  const items = [0,1,2,3]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map(i =>
        type === 'post' ? <PostCardSk key={i} /> :
        type === 'blog' ? <BlogCardSk key={i} /> :
        i % 2 === 0     ? <PostCardSk key={i} /> : <BlogCardSk key={i} />
      )}
    </div>
  )
}

// ── Sidebar: About ────────────────────────────────────────────
function AboutCard() {
  const { owner } = SITE_CONFIG
  return (
    <div className="sidebar-card">
      <div style={{ height: 64, background: 'linear-gradient(135deg, var(--accent-primary), #818cf8)', borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0' }} />
      <div style={{ padding: '0 1.25rem 1.25rem', marginTop: -28 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), #818cf8)', border: '3px solid var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', color: '#fff', overflow: 'hidden' }}>
          <img src="/logo.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display='none' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text-primary)', marginTop: '0.625rem' }}>{owner.displayName}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>{SITE_CONFIG.siteTagline}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--accent-primary)', fontSize: '0.7rem' }} />
            {owner.location}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faLink} style={{ color: 'var(--accent-primary)', fontSize: '0.7rem' }} />
            <a href={SITE_CONFIG.siteURL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>mdturzo.web.app</a>
          </span>
        </div>
        <Link to="/about" style={{ display: 'block', marginTop: '0.875rem', textAlign: 'center', padding: '0.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none' }}>
          View Profile
        </Link>
      </div>
    </div>
  )
}

// ── Sidebar: Tags ─────────────────────────────────────────────
function TagsCard({ allTags }) {
  if (!allTags.length) return null
  return (
    <div className="sidebar-card">
      <div className="sidebar-card-header" style={{ paddingBottom: '0.25rem' }}>
        <FontAwesomeIcon icon={faHashtag} style={{ marginRight: 6, color: 'var(--accent-primary)' }} />
        Tags
      </div>
      <div className="sidebar-card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {allTags.slice(0,12).map(tag => (
          <span key={tag} style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)' }}>
            #{tag}
          </span>
        ))}
      </div>
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
          {q ? 'Try a different keyword.' : 'Check back soon!'}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────
function FeedContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [type,   setType]   = useState(searchParams.get('type') || 'all')
  const [sort,   setSort]   = useState('newest')
  const [search, setSearch] = useState('')
  const [query,  setQuery]  = useState('')

  const [blogs,   setBlogs]   = useState([])
  const [posts,   setPosts]   = useState([])
  const [allTags, setAllTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    trackPage('Feed')
    setSearchParams(type !== 'all' ? { type } : {}, { replace: true })
  }, [type])

  useEffect(() => {
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

  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim().toLowerCase()), 280)
    return () => clearTimeout(t)
  }, [search])

  const handleType = useCallback(t => { setType(t); setSearch('') }, [])

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
      </Helmet>

      {/* Banner */}
      <div style={{ paddingTop: 'var(--navbar-h)', background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-primary) 7%, transparent), transparent 55%)', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <div className="container-xl" style={{ paddingTop: 'clamp(1.5rem,4vw,2.5rem)' }}>
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}>
            <p className="section-label" style={{ marginBottom:'0.625rem' }}>Thoughts & Content</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.875rem,4vw,2.875rem)', fontWeight:900, color:'var(--text-primary)', lineHeight:1.15, marginBottom:'0.5rem' }}>Feed</h1>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.9375rem', maxWidth:460 }}>Articles, videos and updates — all in one place.</p>
          </motion.div>
        </div>
      </div>

      <div className="container-xl" style={{ paddingBlock: '1.5rem' }}>
        <div className="feed-layout">
          {/* Main */}
          <main className="feed-main">
            {/* Filter tabs */}
            <div className="feed-filter-bar">
              {[
                { key:'all',  label:'All',   icon: faNewspaper },
                { key:'blog', label:'Blogs', icon: faPenNib    },
                { key:'post', label:'Posts', icon: faVideo     },
              ].map(({ key, label, icon }) => (
                <button key={key} className={`feed-filter-tab ${type===key?'active':''}`} onClick={() => handleType(key)}>
                  <FontAwesomeIcon icon={icon} />
                  {label}
                  {!loading && <span className="count">{counts[key]}</span>}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="feed-controls-row">
              <div className="feed-search-wrap">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder={`Search ${type!=='all'?type+'s':'feed'}…`} className="feed-search-input" />
                {search && (
                  <button onClick={()=>setSearch('')} style={{ position:'absolute', right:'0.75rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-tertiary)', padding:0 }}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
              <select value={sort} onChange={e=>setSort(e.target.value)} className="feed-sort-select">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {error && (
              <div style={{ padding:'0.875rem 1.125rem', background:'color-mix(in srgb, #ef4444 10%, transparent)', border:'1px solid color-mix(in srgb, #ef4444 30%, transparent)', borderRadius:'var(--radius-xl)', color:'#f87171', fontSize:'0.875rem', marginBottom:'1rem' }}>
                <FontAwesomeIcon icon={faXmark} style={{ marginRight:8 }} />Failed to load: {error}
              </div>
            )}

            {loading ? <FeedSk type={type} />
             : items.length===0 ? <Empty q={query} type={type} />
             : (
              <AnimatePresence mode="wait">
                <motion.div key={`${type}-${sort}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.15 }}
                  style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  {items.map((item,i) =>
                    item._type==='blog'
                      ? <BlogCard key={`blog-${item.id}`} item={item} index={i} />
                      : <PostCard key={`post-${item.id}`} item={item} index={i} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </main>

          {/* Sidebar */}
          <aside className="feed-sidebar">
            <AboutCard />
            {!loading && <TagsCard allTags={allTags} />}
            <div className="sidebar-card">
              <div className="sidebar-card-header">Quick Links</div>
              <div className="sidebar-card-body" style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                {[['Projects','/projects'],['About','/about'],['Contact','/contact']].map(([l,h]) => (
                  <Link key={h} to={h} style={{ fontSize:'0.8125rem', color:'var(--text-secondary)', textDecoration:'none', padding:'0.3rem 0.25rem', borderRadius:'var(--radius-sm)', transition:'color 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.color='var(--accent-primary)'}}
                    onMouseLeave={e=>{e.currentTarget.style.color=''}}>
                    → {l}
                  </Link>
                ))}
              </div>
            </div>
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
