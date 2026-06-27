// BlogDetailPage.jsx — v2.5.2
// Improvements:
//  - Reading progress bar positioned BELOW floating navbar correctly
//  - TOC sidebar redesigned (cleaner, better UX)
//  - Right sidebar: TOC → Blog Info → Share section
//  - Left column has NO share section (moved to sidebar)
//  - Clickable tags → redirect to feed search
//  - Image click in content → shared ImagePreviewModal
//  - If no thumbnail attached: no thumbnail shown (uses first content image as OG meta)
//  - Interaction bar improved design
//  - Relative time display

import './feed.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faEye, faClock, faCalendarDays, faFolderOpen,
  faCheck, faThumbsUp, faThumbsDown, faBookmark,
  faChevronDown, faChevronUp, faListUl, faPenNib, faThumbtack,
  faShareNodes, faCopy, faLink,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg, faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import CommentSection from '../shared/CommentSection.jsx'
import ReportButton from '../shared/ReportButton.jsx'
import Breadcrumb from '../shared/Breadcrumb.jsx'
import ImagePreviewModal from '../shared/ImagePreviewModal.jsx'
import { SITE_CONFIG } from '../../config/site.config.js'
import { buildTitle } from '../../utils/seo.js'
import { trackPage } from '../../services/analytics.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useToastStore } from '../../store/toastStore.js'
import {
  getBlogBySlug, getRelatedBlogs, incrementBlogViews,
  getLikeStats, getUserLikeStatus, toggleLike,
  getFeedSavedStatus, toggleFeedSaved,
} from '../../services/supabase.js'

// ── Utils ─────────────────────────────────────────────────────
function fmt(n) { if(!n)return'0'; if(n>=1000)return`${(n/1000).toFixed(1)}k`; return String(n) }
function fmtDate(s) { if(!s)return''; return new Date(s).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) }
function timeAgo(s) {
  if(!s) return ''
  const d = (Date.now()-new Date(s))/1000
  if(d<60) return 'just now'
  if(d<3600) return `${Math.floor(d/60)}m ago`
  if(d<86400) return `${Math.floor(d/3600)}h ago`
  if(d<604800) return `${Math.floor(d/86400)}d ago`
  if(d<2592000) return `${Math.floor(d/604800)}w ago`
  if(d<31536000) return `${Math.floor(d/2592000)}mo ago`
  return `${Math.floor(d/31536000)}y ago`
}

// Extract first image URL from HTML content
function extractFirstImageFromContent(html) {
  if (!html) return null
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

// ── Reading Progress (below floating navbar) ──────────────────
function ReadingProgress({ articleRef }) {
  const [pct, setPct] = useState(0)
  const [navbarH, setNavbarH] = useState(68)
  const raf = useRef(null)

  useEffect(() => {
    // Detect actual navbar height (accounts for floating navbar)
    const getNavH = () => {
      const floatNav = document.querySelector('.float-nav')
      if (floatNav) {
        const rect = floatNav.getBoundingClientRect()
        return rect.bottom
      }
      const topNav = document.querySelector('nav[style*="var(--navbar-h)"], nav.relative')
      if (topNav) return topNav.getBoundingClientRect().height
      return 68
    }
    const update = () => {
      const el = articleRef?.current; if(!el) return
      const h = getNavH(); setNavbarH(h)
      const { top, height } = el.getBoundingClientRect()
      const total = height - window.innerHeight
      if (total <= 0) { setPct(0); return }
      setPct(Math.min(100, Math.max(0, (-top / total) * 100)))
    }
    const onScroll = () => { if(raf.current) cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if(raf.current) cancelAnimationFrame(raf.current) }
  }, [articleRef])

  if (pct <= 0) return null
  return (
    <div style={{
      position: 'fixed', top: navbarH, left: '50%', transform: 'translateX(-50%)',
      zIndex: 190, pointerEvents: 'none',
      width: 'min(100vw - 2rem, 1120px)',
      height: 3, background: 'color-mix(in srgb, var(--accent-primary) 15%, transparent)',
      borderRadius: '0 0 4px 4px',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #10b981, var(--accent-primary), #818cf8)',
        borderRadius: '0 2px 2px 0',
        transition: 'width 0.08s linear',
      }} />
    </div>
  )
}

// ── Table of Contents ─────────────────────────────────────────
function extractHeadings(el) {
  if (!el) return []
  return Array.from(el.querySelectorAll('h1,h2,h3,h4')).map((node, i) => {
    const id = node.id || `h-${i}`
    if (!node.id) node.id = id
    return { id, text: node.textContent.trim(), level: parseInt(node.tagName[1], 10) }
  })
}

function useToc(articleRef) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const el = articleRef?.current; if(!el) return
    const h = extractHeadings(el); setHeadings(h)
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) setActiveId(e.target.id) })
    }, { rootMargin: `-80px 0px -65% 0px`, threshold: 0 })
    h.forEach(({ id }) => { const n = document.getElementById(id); if(n) obs.observe(n) })
    return () => obs.disconnect()
  }, [articleRef])
  const scrollTo = useCallback((id) => {
    const n = document.getElementById(id); if(!n) return
    window.scrollTo({ top: n.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
    setActiveId(id)
  }, [])
  return { headings, activeId, scrollTo }
}

function TocItems({ headings, activeId, scrollTo }) {
  if (!headings.length) return (
    <p style={{ padding:'0.75rem 1rem', fontSize:'0.8rem', color:'var(--text-tertiary)' }}>No headings found.</p>
  )
  return (
    <ul className="toc-list">
      {headings.map(({ id, text, level }) => (
        <li key={id}>
          <button className={`toc-item ${activeId===id?'active':''}`} data-level={level} onClick={() => scrollTo(id)} title={text}>
            {text}
          </button>
        </li>
      ))}
    </ul>
  )
}

function TocSidebar({ articleRef }) {
  const { headings, activeId, scrollTo } = useToc(articleRef)
  if (!headings.length) return null
  return (
    <div className="toc-card">
      <div className="toc-header" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ display:'flex', alignItems:'center', gap:6 }}>
          <FontAwesomeIcon icon={faListUl} style={{ color:'var(--accent-primary)', fontSize:'0.8rem' }} />
          Table of Contents
        </span>
        <span style={{ fontWeight:'normal', textTransform:'none', letterSpacing:'normal', color:'var(--text-tertiary)', fontSize:'0.75rem' }}>
          {headings.length} sections
        </span>
      </div>
      <TocItems headings={headings} activeId={activeId} scrollTo={scrollTo} />
    </div>
  )
}

function TocMobile({ articleRef }) {
  const { headings, activeId, scrollTo } = useToc(articleRef)
  const [open, setOpen] = useState(false)
  if (!headings.length) return null
  const active = headings.find(h => h.id === activeId)
  return (
    <div className="toc-mobile">
      <button className="toc-mobile-trigger" onClick={() => setOpen(o => !o)}>
        <span style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text-secondary)' }}>
          <FontAwesomeIcon icon={faListUl} style={{ color:'var(--accent-primary)' }} />
          Contents ({headings.length})
          {active && (
            <span style={{ color:'var(--text-tertiary)', fontWeight:'normal', textTransform:'none', letterSpacing:'normal', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'10rem' }}>
              — {active.text}
            </span>
          )}
        </span>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="toc-m" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }} style={{ overflow:'hidden' }}>
            <TocItems headings={headings} activeId={activeId} scrollTo={(id) => { scrollTo(id); setOpen(false) }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Share panel (sidebar) ─────────────────────────────────────
function SharePanel({ url, title }) {
  const { addToast } = useToastStore()
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
      addToast({ type:'success', title:'Copied!', message:'Link copied to clipboard.' })
    })
  }
  const enc = encodeURIComponent
  const shares = [
    { icon: faXTwitter,  label: 'X (Twitter)', color: '#1DA1F2', url: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    { icon: faFacebook,  label: 'Facebook',    color: '#1877F2', url: `https://facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { icon: faLinkedin,  label: 'LinkedIn',    color: '#0A66C2', url: `https://linkedin.com/shareArticle?mini=true&url=${enc(url)}&title=${enc(title)}` },
    { icon: faWhatsapp,  label: 'WhatsApp',    color: '#25D366', url: `https://wa.me/?text=${enc(title+' '+url)}` },
    { icon: faTelegram,  label: 'Telegram',    color: '#2CA5E0', url: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}` },
  ]
  return (
    <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-2xl)', overflow:'hidden' }}>
      <div style={{ padding:'0.875rem 1.125rem', borderBottom:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:8 }}>
        <FontAwesomeIcon icon={faShareNodes} style={{ color:'var(--accent-primary)', fontSize:'0.85rem' }} />
        <span style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-secondary)' }}>Share Article</span>
      </div>
      <div style={{ padding:'0.875rem 1.125rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
        {shares.map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{
              display:'flex', alignItems:'center', gap:10, padding:'0.45rem 0.75rem',
              borderRadius:'var(--radius-lg)', textDecoration:'none',
              color:'var(--text-secondary)', fontSize:'0.8125rem',
              transition:'all 0.15s', border:'1px solid transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface-2)'; e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = 'var(--border-color)' }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = 'transparent' }}
          >
            <FontAwesomeIcon icon={s.icon} style={{ width:16, fontSize:'0.95rem' }} />
            {s.label}
          </a>
        ))}
        <button onClick={copy} style={{
          display:'flex', alignItems:'center', gap:10, padding:'0.45rem 0.75rem',
          borderRadius:'var(--radius-lg)', cursor:'pointer',
          color: copied ? 'var(--accent-primary)' : 'var(--text-secondary)',
          fontSize:'0.8125rem', background: copied ? 'color-mix(in srgb, var(--accent-primary) 10%, transparent)' : 'none',
          border:`1px solid ${copied ? 'color-mix(in srgb, var(--accent-primary) 30%, transparent)' : 'transparent'}`,
          transition:'all 0.15s', width:'100%', textAlign:'left',
        }}>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} style={{ width:16 }} />
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}

// ── Interaction Bar (improved design) ────────────────────────
function InteractionBar({ blog, onLoginPrompt }) {
  const { user } = useAuth()
  const { addToast } = useToastStore()
  const [likes,    setLikes]    = useState(blog.likes_count    || 0)
  const [dislikes, setDislikes] = useState(blog.dislikes_count || 0)
  const [userVote, setUserVote] = useState(null)
  const [saved,    setSaved]    = useState(false)
  const [busy,     setBusy]     = useState(false)

  useEffect(() => {
    if (!blog.id) return
    Promise.all([
      getLikeStats('blog', blog.id),
      user ? getUserLikeStatus('blog', blog.id, user.uid) : null,
      user ? getFeedSavedStatus(user.uid, 'blog', blog.id) : false,
    ]).then(([stats, vote, sv]) => {
      setLikes(stats?.likes || 0); setDislikes(stats?.dislikes || 0)
      setUserVote(vote); setSaved(sv)
    }).catch(() => {})
  }, [blog.id, user])

  const vote = async (vt) => {
    if (!user) { onLoginPrompt(); return }
    if (busy) return; setBusy(true)
    const prev = userVote, next = prev===vt ? null : vt
    setUserVote(next)
    setLikes(l => l + (vt==='like' ? (next?1:-1) : (prev==='like'?-1:0)))
    setDislikes(d => d + (vt==='dislike' ? (next?1:-1) : (prev==='dislike'?-1:0)))
    await toggleLike('blog', blog.id, user.uid, vt).catch(() => {})
    setBusy(false)
  }
  const save = async () => {
    if (!user) { onLoginPrompt(); return }
    const next = !saved; setSaved(next)
    await toggleFeedSaved(user.uid, 'blog', blog.id).catch(() => setSaved(!next))
    addToast({ type:'success', title: next?'Saved':'Removed', message: next?'Article saved.':'Removed from saved.' })
  }

  const btnStyle = (active, color = 'var(--accent-primary)') => ({
    display: 'flex', alignItems: 'center', gap: 6, padding: '0.55rem 1.1rem',
    borderRadius: 'var(--radius-xl)', border: `1.5px solid ${active ? color : 'var(--border-color)'}`,
    background: active ? `color-mix(in srgb, ${color} 10%, transparent)` : 'var(--bg-surface)',
    color: active ? color : 'var(--text-secondary)',
    cursor: 'pointer', fontSize: '0.8375rem', fontWeight: 600,
    transition: 'all 0.18s', outline: 'none',
  })

  return (
    <div style={{ margin:'1.75rem 0', padding:'1rem 0', borderTop:'1px solid var(--border-color)', borderBottom:'1px solid var(--border-color)' }}>
      {/* Stats row */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.875rem', fontSize:'0.8125rem', color:'var(--text-tertiary)' }}>
        <span style={{ display:'flex', alignItems:'center', gap:5 }}>
          <FontAwesomeIcon icon={faEye} />{fmt(blog.views_count)} views
        </span>
        {likes > 0 && (
          <span style={{ display:'flex', alignItems:'center', gap:5 }}>
            <FontAwesomeIcon icon={faThumbsUp} style={{ color:'#22c55e', fontSize:'0.75rem' }} />{fmt(likes)} likes
          </span>
        )}
        <span style={{ marginLeft:'auto', color:'var(--text-tertiary)' }}>
          Posted {timeAgo(blog.created_at)}
        </span>
      </div>
      {/* Actions */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', alignItems:'center' }}>
        <button onClick={() => vote('like')} disabled={busy} style={btnStyle(userVote==='like', '#22c55e')}>
          <FontAwesomeIcon icon={userVote==='like' ? faThumbsUp : faThumbsUpReg} />
          <span>{fmt(likes)}</span>
        </button>
        <button onClick={() => vote('dislike')} disabled={busy} style={btnStyle(userVote==='dislike', '#ef4444')}>
          <FontAwesomeIcon icon={userVote==='dislike' ? faThumbsDown : faThumbsDownReg} />
          <span>{fmt(dislikes)}</span>
        </button>
        <button onClick={save} style={btnStyle(saved, '#f59e0b')}>
          <FontAwesomeIcon icon={saved ? faBookmark : faBookmarkReg} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
        <div style={{ marginLeft:'auto' }}>
          <ReportButton contentType="blog" contentId={blog.id} />
        </div>
      </div>
    </div>
  )
}

// ── Related blogs ─────────────────────────────────────────────
function RelatedBlogs({ blogs }) {
  if (!blogs?.length) return null
  return (
    <div style={{ marginTop:'2.5rem' }}>
      <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.125rem', color:'var(--text-primary)', marginBottom:'1rem' }}>
        Related Articles
      </h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap:'0.875rem' }}>
        {blogs.map((b,i) => (
          <motion.div key={b.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}>
            <Link to={`/blogs/${b.slug}`}
              style={{ display:'block', background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-xl)', overflow:'hidden', textDecoration:'none', transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='color-mix(in srgb, var(--accent-primary) 40%, transparent)'; e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=''; e.currentTarget.style.transform=''}}>
              {b.thumbnail_url && <img src={b.thumbnail_url} alt={b.title} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', display:'block' }} loading="lazy" />}
              <div style={{ padding:'0.875rem' }}>
                <p style={{ fontSize:'0.75rem', color:'var(--text-tertiary)', marginBottom:'0.375rem', display:'flex', alignItems:'center', gap:5 }}>
                  {b.category && <><FontAwesomeIcon icon={faFolderOpen} style={{ fontSize:'0.65rem' }} />{b.category} · </>}
                  <FontAwesomeIcon icon={faClock} style={{ fontSize:'0.65rem' }} />{b.reading_time||1} min
                </p>
                <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.875rem', color:'var(--text-primary)', lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {b.title}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────
function Skeleton() {
  return (
    <div style={{ paddingTop:'var(--navbar-h)' }}>
      <div className="container-xl" style={{ paddingBlock:'2rem' }}>
        <div className="sk" style={{ height:4, width:'80px', borderRadius:99, marginBottom:'1.5rem' }} />
        <div className="blog-article-layout">
          <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
            <div className="sk" style={{ width:'100%', aspectRatio:'21/9', borderRadius:'var(--radius-2xl)', marginBottom:'1rem' }} />
            <div className="sk" style={{ height:36, width:'75%', borderRadius:8 }} />
            <div className="sk" style={{ height:18, width:'50%', borderRadius:8 }} />
            {[100,90,100,80,100,65,100,88].map((w,i) => (
              <div key={i} className="sk" style={{ height:15, width:`${w}%`, borderRadius:6 }} />
            ))}
          </div>
          <div className="blog-article-sidebar" style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <div className="sk" style={{ height:220, borderRadius:'var(--radius-2xl)' }} />
            <div className="sk" style={{ height:140, borderRadius:'var(--radius-2xl)' }} />
            <div className="sk" style={{ height:180, borderRadius:'var(--radius-2xl)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
function BlogDetailContent() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const { addToast } = useToastStore()

  const [blog,    setBlog]    = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound,setNotFound]= useState(false)
  const [previewImages, setPreviewImages] = useState(null)
  const [previewIdx, setPreviewIdx] = useState(0)

  const { user } = useAuth()
  const articleRef = useRef(null)

  useEffect(() => {
    trackPage('BlogDetail'); setLoading(true); setNotFound(false)
    getBlogBySlug(slug)
      .then(async data => {
        if (!data) { setNotFound(true); return }
        setBlog(data)
        incrementBlogViews(data.id, user?.uid || null).catch(() => {})
        const rel = await getRelatedBlogs(slug, data.category, data.tags).catch(() => [])
        setRelated(rel)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  // Make content images clickable for preview
  useEffect(() => {
    if (!articleRef.current) return
    const imgs = articleRef.current.querySelectorAll('.blog-prose img')
    if (!imgs.length) return
    const imageList = Array.from(imgs).map(img => ({ url: img.src, caption: img.alt }))
    imgs.forEach((img, i) => {
      img.style.cursor = 'zoom-in'
      img.style.borderRadius = '8px'
      img.style.transition = 'opacity 0.18s'
      img.addEventListener('click', () => {
        setPreviewImages(imageList)
        setPreviewIdx(i)
      })
    })
    return () => {
      imgs.forEach(img => img.replaceWith(img.cloneNode(true)))
    }
  }, [blog])

  const onLoginPrompt = useCallback(() => {
    addToast({ type:'info', title:'Login required', message:'Sign in to interact.' })
    navigate('/login', { state: { from: `/blogs/${slug}` } })
  }, [slug, navigate, addToast])

  // Tag click → navigate to feed search
  const handleTagClick = (tag) => {
    navigate(`/feed?q=${encodeURIComponent(tag)}&type=blog`)
  }

  if (loading) return <Skeleton />
  if (notFound) return <Navigate to="/404" replace />

  const pageUrl = `${SITE_CONFIG.siteURL}/blogs/${blog.slug}`
  // OG image: thumbnail_url > first content image > default
  const firstContentImage = extractFirstImageFromContent(blog.content)
  const ogImage = blog.thumbnail_url || firstContentImage || SITE_CONFIG.seo.defaultOGImage

  return (
    <>
      <Helmet>
        <title>{buildTitle(blog.seo_title || blog.title)}</title>
        <meta name="description" content={blog.seo_description || blog.short_description || ''} />
        <meta property="og:title" content={blog.seo_title || blog.title} />
        <meta property="og:description" content={blog.seo_description || blog.short_description || ''} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"Article",
          "headline":blog.title,"image":ogImage,
          "datePublished":blog.created_at,"dateModified":blog.updated_at,
          "author":{"@type":"Person","name":"Muhtasim Rahman"},"url":pageUrl
        })}</script>
      </Helmet>

      {/* Reading Progress — positioned below floating navbar dynamically */}
      <ReadingProgress articleRef={articleRef} />

      {/* Image preview modal */}
      {previewImages && (
        <ImagePreviewModal
          images={previewImages}
          startIndex={previewIdx}
          onClose={() => setPreviewImages(null)}
        />
      )}

      <div className="container-xl" style={{ paddingTop:'calc(var(--navbar-h) + 1.5rem)', paddingBottom:'3rem' }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{label:'Feed',href:'/feed'},{label:'Blogs',href:'/feed?type=blog'},{label:blog.title}]} />

        {/* Hero image — only if blog has thumbnail or cover */}
        {(blog.cover_image_url || blog.thumbnail_url) && (
          <div className="blog-detail-hero">
            <img src={blog.cover_image_url || blog.thumbnail_url} alt={blog.title} />
            <div className="blog-detail-hero-overlay" />
          </div>
        )}

        {/* Article layout */}
        <div className="blog-article-layout" ref={articleRef}>
          <div className="blog-article-body">

            {/* Header card */}
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}
              style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-2xl)', padding:'1.75rem 2rem', marginBottom:'2rem' }}>
              {/* Badges */}
              <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'0.5rem', marginBottom:'0.875rem' }}>
                <span className="blog-card-badge"><FontAwesomeIcon icon={faPenNib} /> Blog</span>
                {blog.pinned && <span className="pinned-badge"><FontAwesomeIcon icon={faThumbtack} style={{ fontSize:'0.6rem', marginRight:3 }} />Pinned</span>}
                {blog.category && (
                  <button
                    onClick={() => handleTagClick(blog.category)}
                    style={{ fontSize:'0.72rem', color:'var(--text-tertiary)', display:'flex', alignItems:'center', gap:4, background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', padding:'0.2rem 0.6rem', borderRadius:'var(--radius-full)', cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
                  >
                    <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize:'0.65rem' }} />{blog.category}
                  </button>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.5rem, 3vw, 2.25rem)', fontWeight:900, color:'var(--text-primary)', lineHeight:1.22, marginBottom:'0.75rem' }}>
                {blog.title}
              </h1>

              {/* Description */}
              {blog.short_description && (
                <p style={{ fontSize:'1rem', color:'var(--text-secondary)', lineHeight:1.65, marginBottom:'1rem' }}>{blog.short_description}</p>
              )}

              {/* Meta */}
              <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'1rem', fontSize:'0.8125rem', color:'var(--text-tertiary)' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <FontAwesomeIcon icon={faCalendarDays} />{fmtDate(blog.created_at)}
                </span>
                {blog.reading_time && (
                  <span style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <FontAwesomeIcon icon={faClock} />{blog.reading_time} min read
                  </span>
                )}
                <span style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <FontAwesomeIcon icon={faEye} />{fmt(blog.views_count)} views
                </span>
                <span style={{ marginLeft:'auto', color:'var(--text-tertiary)', fontSize:'0.78rem' }}>
                  {timeAgo(blog.created_at)}
                </span>
              </div>

              {/* Tags (clickable) */}
              {blog.tags?.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem', marginTop:'0.875rem', paddingTop:'0.875rem', borderTop:'1px solid var(--border-color)' }}>
                  {blog.tags.map(t => (
                    <button
                      key={t}
                      onClick={() => handleTagClick(t)}
                      style={{ fontSize:'0.72rem', padding:'0.2rem 0.6rem', background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-full)', color:'var(--text-secondary)', cursor:'pointer', transition:'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'; e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-primary) 40%, transparent)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Mobile TOC */}
            <TocMobile articleRef={articleRef} />

            {/* Prose */}
            {blog.content
              ? <div className="blog-prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
              : <p style={{ color:'var(--text-tertiary)', fontStyle:'italic' }}>No content available.</p>
            }

            {/* Interaction bar */}
            <InteractionBar blog={blog} onLoginPrompt={onLoginPrompt} />

            {/* Comments */}
            <CommentSection contentType="blog" contentId={blog.id} contentSlug={blog.slug} />

            {/* Related */}
            <RelatedBlogs blogs={related} />
          </div>

          {/* Sidebar (right column): TOC → Blog Info → Share */}
          <aside className="blog-article-sidebar">
            <TocSidebar articleRef={articleRef} />

            {/* Blog Info card */}
            <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-2xl)', padding:'1.125rem' }}>
              <p style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-tertiary)', marginBottom:'0.75rem' }}>About this article</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.55rem', fontSize:'0.8125rem' }}>
                {blog.category && (
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ color:'var(--text-tertiary)' }}>Category</span>
                    <button onClick={() => handleTagClick(blog.category)}
                      style={{ color:'var(--accent-primary)', fontWeight:600, background:'none', border:'none', cursor:'pointer', padding:0, fontSize:'inherit' }}>
                      {blog.category}
                    </button>
                  </div>
                )}
                {blog.reading_time && (
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ color:'var(--text-tertiary)' }}>Read time</span>
                    <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{blog.reading_time} min</span>
                  </div>
                )}
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span style={{ color:'var(--text-tertiary)' }}>Views</span>
                  <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{fmt(blog.views_count)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span style={{ color:'var(--text-tertiary)' }}>Published</span>
                  <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{timeAgo(blog.created_at)}</span>
                </div>
              </div>
              {blog.tags?.length > 0 && (
                <div style={{ marginTop:'0.875rem' }}>
                  <p style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-tertiary)', marginBottom:'0.5rem' }}>Tags</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem' }}>
                    {blog.tags.map(t => (
                      <button
                        key={t}
                        onClick={() => handleTagClick(t)}
                        style={{ fontSize:'0.72rem', padding:'0.2rem 0.55rem', background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-full)', color:'var(--text-tertiary)', cursor:'pointer', transition:'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = '' }}
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <Link to="/feed?type=blog" style={{ display:'flex', alignItems:'center', gap:8, marginTop:'1rem', fontSize:'0.8125rem', color:'var(--accent-primary)', textDecoration:'none' }}>
                <FontAwesomeIcon icon={faArrowLeft} />All blogs
              </Link>
            </div>

            {/* Share panel */}
            <SharePanel url={pageUrl} title={blog.title} />
          </aside>
        </div>
      </div>
    </>
  )
}

export default function BlogDetailPage() {
  return (
    <VisibilityGuard page="blogs" skeleton="blog-detail">
      <BlogDetailContent />
    </VisibilityGuard>
  )
}
