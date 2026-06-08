// BlogDetailPage.jsx — v2.5.2
// Changes:
//  - Reading progress bar: positioned below floating navbar, same width, rounded
//  - TOC: redesigned card with active section tracking
//  - Right sidebar: TOC + Blog About + Share (like projects page)
//  - Left column: no share section
//  - Header spacing: paddingTop: calc(var(--navbar-h) + ...) — single, no duplicate
//  - Blog images: clickable → shared ImagePreviewModal
//  - Multiple images in blog: carousel layout in detail
//  - No thumbnail shown in header if blog has no image
//  - Action bar: improved design

import './feed.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link }              from 'react-router-dom'
import { Helmet }                                    from 'react-helmet-async'
import { motion, AnimatePresence }                   from 'framer-motion'
import { FontAwesomeIcon }                           from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faEye, faClock, faCalendar,
  faTag, faThumbsUp, faThumbsDown, faBookmark,
  faShare, faComment, faLink, faImage,
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg, faBookmark as faBookmarkReg } from '@fortawesome/free-regular-svg-icons'

import { VisibilityGuard }   from '../shared/VisibilityGuard.jsx'
import ShareButtons          from '../shared/ShareButtons.jsx'
import LikeDislike       from '../shared/LikeDislike.jsx'
import ImagePreviewModal     from '../shared/ImagePreviewModal.jsx'
import CommentSection    from '../shared/CommentSection.jsx'
import {
  getBlogBySlug, incrementBlogViews,
  getFeedSavedStatus, toggleFeedSaved,
  trackContentView,
} from '../../services/supabase.js'
import { useAuth }           from '../../hooks/useAuth.js'
import { buildTitle }        from '../../utils/seo.js'
import { collectDeviceInfo as getDeviceHash }     from '../../utils/deviceInfo.js'
import { SITE_CONFIG }       from '../../config/site.config.js'

// ── Format helpers ────────────────────────────────────────────
const fmt = n => !n ? '0' : n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n)
const timeAgo = s => {
  if (!s) return ''
  const d = (Date.now() - new Date(s)) / 1000
  if (d < 86400) return `${Math.floor(d/3600)}h ago`
  if (d < 604800) return `${Math.floor(d/86400)}d ago`
  return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// ── Extract TOC from HTML ─────────────────────────────────────
function extractTOC(html) {
  if (!html) return []
  const div = document.createElement('div')
  div.innerHTML = html
  const headings = div.querySelectorAll('h1,h2,h3,h4')
  return Array.from(headings).map((h, i) => ({
    id:    `toc-${i}`,
    level: parseInt(h.tagName[1]),
    text:  h.textContent.trim(),
  }))
}

// ── Inject TOC IDs into HTML ──────────────────────────────────
function injectTOCIds(html) {
  if (!html) return html
  let i = 0
  return html.replace(/<(h[1-4])(.*?)>/gi, (_, tag, attrs) => {
    return `<${tag}${attrs} id="toc-${i++}">`
  })
}

// ── Extract all images from HTML for preview ─────────────────
function extractImages(html) {
  if (!html) return []
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?/gi)]
  return matches.map(m => ({ url: m[1], alt: m[2] || '' }))
}

// ── Extract first image from HTML (for OG / no-cover fallback) ─
function extractFirstImage(html) {
  if (!html) return null
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return m ? m[1] : null
}

// ── Reading Progress Bar ──────────────────────────────────────
function ReadingProgressBar({ articleRef }) {
  const [progress, setProgress] = useState(0)
  const [visible,  setVisible]  = useState(false)
  const FLOAT_THRESHOLD = 420

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const scrollY  = window.scrollY
      const elTop    = el.offsetTop
      const elHeight = el.scrollHeight
      const winH     = window.innerHeight
      const scrollable = elHeight - winH
      const started    = Math.max(0, scrollY - elTop)
      const pct        = scrollable > 0 ? Math.min(100, (started / scrollable) * 100) : 0

      setProgress(pct)
      setVisible(scrollY > FLOAT_THRESHOLD)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [articleRef])

  return (
    <div className={`reading-progress-container ${visible ? 'visible' : ''}`}>
      <div className="reading-progress-track">
        <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

// ── TOC Card ──────────────────────────────────────────────────
function TOCCard({ toc }) {
  const [activeId, setActiveId] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: '-15% 0px -75%', threshold: 0 }
    )
    toc.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [toc])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 80
    const top  = el.getBoundingClientRect().top + window.scrollY - navH - 24
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (!toc.length) return null

  return (
    <div className="toc-card">
      <div className="toc-card-header">
        <span>Contents</span>
        <button
          onClick={() => setCollapsed(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-tertiary)', fontSize: '0.75rem', padding: '2px 6px', borderRadius: 6 }}
        >
          {collapsed ? 'Show' : 'Hide'}
        </button>
      </div>
      {!collapsed && (
        <ol className="toc-list">
          {toc.map(h => (
            <button
              key={h.id}
              className={`toc-item ${activeId === h.id ? 'active' : ''}`}
              data-level={h.level}
              onClick={() => scrollTo(h.id)}
              title={h.text}
            >
              {h.text}
            </button>
          ))}
        </ol>
      )}
    </div>
  )
}

// ── Blog About Card (sidebar) ─────────────────────────────────
function BlogAboutCard({ blog }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-2xl)', padding: '1.125rem', overflow: 'hidden',
    }}>
      <p style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        About this article
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {blog.category && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Category</span>
            <span style={{
              color: 'var(--accent-primary)', fontWeight: 600,
              background: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)',
              padding: '1px 10px', borderRadius: 99,
            }}>
              {blog.category}
            </span>
          </div>
        )}
        {blog.reading_time && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Read time</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{blog.reading_time} min</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>Published</span>
          <span style={{ color: 'var(--text-secondary)' }}>{timeAgo(blog.created_at)}</span>
        </div>
        {blog.views_count > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Views</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{fmt(blog.views_count)}</span>
          </div>
        )}
      </div>

      {/* Tags in sidebar */}
      {blog.tags?.length > 0 && (
        <div style={{ marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tags</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {blog.tags.map(t => (
              <Link
                key={t}
                to={`/feed?q=${encodeURIComponent(t)}`}
                className="tag-badge-clickable"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Share Card (sidebar) ──────────────────────────────────────
function ShareCard({ url, title }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-2xl)', padding: '1.125rem',
    }}>
      <p style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.875rem' }}>
        Share this article
      </p>
      <ShareButtons url={url} title={title} />
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
function BlogDetailContent() {
  const { slug }       = useParams()
  const navigate       = useNavigate()
  const { user }       = useAuth()
  const articleRef     = useRef(null)
  const contentRef     = useRef(null)

  const [blog,    setBlog]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [saved,   setSaved]   = useState(false)
  const [toc,     setToc]     = useState([])
  const [imgPreview, setImgPreview] = useState(null) // { images: [], startIndex }
  const [allImages, setAllImages]   = useState([])

  // Load blog
  useEffect(() => {
    setLoading(true); setError(null)
    getBlogBySlug(slug)
      .then(data => {
        if (!data) { setError('Blog not found'); return }
        setBlog(data)
        // Extract TOC
        setToc(extractTOC(data.content))
        // Extract all images for preview
        setAllImages(extractImages(data.content))
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  // Track view with deduplication
  useEffect(() => {
    if (!blog?.id) return
    const viewerKey = user?.uid || getDeviceHash()
    trackContentView('blog', blog.id, viewerKey, !!user?.uid)
  }, [blog?.id, user?.uid])

  // Inject TOC IDs + click-to-preview for images in rendered HTML
  useEffect(() => {
    if (!contentRef.current || !blog?.content) return
    contentRef.current.innerHTML = injectTOCIds(blog.content)

    // Make images clickable
    const imgs = contentRef.current.querySelectorAll('img')
    const allImgs = Array.from(imgs).map(el => ({ url: el.src, alt: el.alt || '' }))
    imgs.forEach((img, i) => {
      img.style.cursor = 'zoom-in'
      img.addEventListener('click', () => {
        setImgPreview({ images: allImgs, startIndex: i })
      })
    })
  }, [blog?.content])

  // Save status
  useEffect(() => {
    if (!user?.uid || !blog?.id) return
    getFeedSavedStatus(user.uid, 'blog', blog.id)
      .then(status => setSaved(status?.saved ?? false))
  }, [user?.uid, blog?.id])

  const handleSave = async () => {
    if (!user) { navigate('/login'); return }
    const next = !saved
    setSaved(next)
    await toggleFeedSaved(user.uid, 'blog', blog.id).catch(() => setSaved(!next))
  }

  const coverImage  = blog?.cover_image_url || blog?.thumbnail_url || extractFirstImage(blog?.content)
  const ogImage     = blog?.og_image || blog?.thumbnail_url || extractFirstImage(blog?.content)
  const canonicalURL = `${SITE_CONFIG.siteURL}/blogs/${slug}`

  if (loading) {
    return (
      <div style={{ paddingTop: 'calc(var(--navbar-h) + 2rem)', paddingBottom: '4rem' }}>
        <div className="container-xl">
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="sk" style={{ height: 24, width: 100, borderRadius: 8 }} />
            <div className="sk" style={{ height: 40, width: '80%', borderRadius: 10 }} />
            <div className="sk" style={{ width: '100%', aspectRatio: '21/9', borderRadius: 16 }} />
            {[1,2,3,4,5].map(i => <div key={i} className="sk" style={{ height: 18, width: `${100-i*8}%`, borderRadius: 8 }} />)}
          </div>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div style={{ paddingTop: 'calc(var(--navbar-h) + 4rem)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
          {error || 'Blog not found'}
        </p>
        <button
          onClick={() => navigate('/feed')}
          style={{ padding: '0.5rem 1.25rem', borderRadius: 99, background: 'var(--accent-primary)', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          ← Back to Feed
        </button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{buildTitle(blog.title)}</title>
        <meta name="description" content={blog.short_description || blog.title} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:title"       content={blog.og_title || blog.title} />
        <meta property="og:description" content={blog.og_description || blog.short_description || blog.title} />
        <meta property="og:url"         content={canonicalURL} />
        <meta property="og:type"        content="article" />
        <link rel="canonical"           href={canonicalURL} />
      </Helmet>

      {/* Reading progress bar (below floating navbar) */}
      <ReadingProgressBar articleRef={articleRef} />

      <div ref={articleRef}>
        {/* ── Header area ────────────────────────────────────── */}
        <div style={{ paddingTop: 'var(--navbar-h)' }}>
          {/* Cover image (only if exists) */}
          {coverImage && (
            <div className="blog-detail-hero" style={{ borderRadius: 0 }}>
              <img
                src={coverImage} alt={blog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="blog-detail-hero-overlay" />
            </div>
          )}
        </div>

        <div className="container-xl" style={{ paddingBlock: '2rem 3rem' }}>
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-tertiary)', fontSize: '0.8125rem', fontWeight: 600,
              marginBottom: '1.5rem', padding: '0.25rem 0',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = ''}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Feed
          </button>

          <div className="blog-detail-layout">
            {/* ── Main content column ─────────────────────────── */}
            <article>
              {/* Eyebrow */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                {blog.category && (
                  <Link to={`/feed?q=${encodeURIComponent(blog.category)}`}
                    style={{
                      fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: 'var(--accent-primary)',
                      background: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--accent-primary) 25%, transparent)',
                      padding: '0.2rem 0.75rem', borderRadius: 99,
                      textDecoration: 'none',
                    }}>
                    {blog.category}
                  </Link>
                )}
                {blog.reading_time && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <FontAwesomeIcon icon={faClock} /> {blog.reading_time} min read
                  </span>
                )}
                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <FontAwesomeIcon icon={faCalendar} /> {timeAgo(blog.created_at)}
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
                lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '0.75rem',
              }}>
                {blog.title}
              </h1>

              {/* Short description */}
              {blog.short_description && (
                <p style={{
                  fontSize: '1.0625rem', color: 'var(--text-secondary)',
                  lineHeight: 1.6, marginBottom: '1.25rem',
                  fontStyle: 'italic',
                }}>
                  {blog.short_description}
                </p>
              )}

              {/* Stats + actions bar */}
              <div className="blog-action-bar">
                <LikeDislike contentType="blog" contentId={blog.id} />
                <div style={{ display: 'flex', gap: 12, marginLeft: 'auto', flexWrap: 'wrap' }}>
                  <span className="blog-action-stat">
                    <FontAwesomeIcon icon={faEye} /> {fmt(blog.views_count)}
                  </span>
                  <span className="blog-action-stat">
                    <FontAwesomeIcon icon={faComment} /> {fmt(blog.comments_count)}
                  </span>
                  <button
                    onClick={handleSave}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: saved ? 'color-mix(in srgb, var(--accent-primary) 10%, transparent)' : 'var(--bg-surface-2)',
                      border: saved ? '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)' : '1px solid var(--border-color)',
                      borderRadius: 99, padding: '0.3rem 0.875rem',
                      color: saved ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.15s',
                    }}
                    title={saved ? 'Unsave' : 'Save article'}
                  >
                    <FontAwesomeIcon icon={saved ? faBookmark : faBookmarkReg} />
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              {/* Tags (below action bar, mobile) */}
              {blog.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
                  {blog.tags.map(t => (
                    <Link key={t} to={`/feed?q=${encodeURIComponent(t)}`} className="tag-badge-clickable">
                      #{t}
                    </Link>
                  ))}
                </div>
              )}

              {/* Blog content HTML */}
              <div
                ref={contentRef}
                className="blog-prose"
                style={{ marginBottom: '2rem' }}
              />

              {/* Comments */}
              <div id="comments" style={{ marginTop: '2.5rem' }}>
                <CommentSection contentType="blog" contentId={blog.id} />
              </div>
            </article>

            {/* ── Right sidebar ─────────────────────────────── */}
            <aside className="blog-detail-sidebar">
              <TOCCard toc={toc} />
              <BlogAboutCard blog={blog} />
              <ShareCard url={canonicalURL} title={blog.title} />
            </aside>
          </div>
        </div>
      </div>

      {/* Image preview modal */}
      {imgPreview && (
        <ImagePreviewModal
          images={imgPreview.images}
          startIndex={imgPreview.startIndex}
          onClose={() => setImgPreview(null)}
        />
      )}
    </>
  )
}

export default function BlogDetailPage() {
  return (
    <VisibilityGuard page="blogs">
      <BlogDetailContent />
    </VisibilityGuard>
  )
}
