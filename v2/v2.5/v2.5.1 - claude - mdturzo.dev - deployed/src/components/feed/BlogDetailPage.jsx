// BlogDetailPage.jsx — v2.5.1 REBUILD
// Clean editorial layout: hero image, breadcrumb, prose content,
// reading progress bar, sticky TOC sidebar, interaction bar, related blogs.

import './feed.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faEye, faClock, faCalendarDays, faTag, faFolderOpen,
  faCopy, faCheck, faThumbsUp, faThumbsDown, faBookmark,
  faChevronDown, faChevronUp, faListUl, faPenNib, faThumbtack,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg, faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import CommentSection from '../shared/CommentSection.jsx'
import ReportButton from '../shared/ReportButton.jsx'
import Breadcrumb from '../shared/Breadcrumb.jsx'
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

// ── Reading Progress ──────────────────────────────────────────
function ReadingProgress({ articleRef }) {
  const [pct, setPct] = useState(0)
  const raf = useRef(null)
  useEffect(() => {
    const update = () => {
      const el = articleRef?.current; if(!el) return
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
    <div className="reading-progress-bar" aria-hidden="true">
      <div className="reading-progress-fill" style={{ width: `${pct}%` }} />
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
    }, { rootMargin: `-${68+16}px 0px -65% 0px`, threshold: 0 })
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
  if (!headings.length) return <p style={{ padding:'0.75rem 1.125rem', fontSize:'0.8rem', color:'var(--text-tertiary)' }}>No headings found.</p>
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
      <div className="toc-header">
        <span><FontAwesomeIcon icon={faListUl} style={{ marginRight:6, color:'var(--accent-primary)' }} />Contents</span>
        <span style={{ fontWeight:'normal', textTransform:'none', letterSpacing:'normal', color:'var(--text-tertiary)' }}>{headings.length}</span>
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
          {active && <span style={{ color:'var(--text-tertiary)', fontWeight:'normal', textTransform:'none', letterSpacing:'normal', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'10rem' }}>— {active.text}</span>}
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

// ── Share bar ─────────────────────────────────────────────────
function ShareBar({ url, title }) {
  const { addToast } = useToastStore()
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const links = [
    { icon: faFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, color: '#1877f2' },
    { icon: faXTwitter, href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, color: '#000' },
    { icon: faLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, color: '#0a66c2' },
    { icon: faWhatsapp, href: `https://wa.me/?text=${enc(title+' '+url)}`, color: '#25d366' },
    { icon: faTelegram, href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`, color: '#0088cc' },
  ]
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); addToast({ type:'success', title:'Copied!', message:'Link copied.' }); setTimeout(()=>setCopied(false), 2000) }
    catch { addToast({ type:'error', title:'Error', message:'Could not copy link.' }) }
  }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', flexWrap:'wrap' }}>
      {links.map(({ icon, href, color }, i) => (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
          className="interact-btn" style={{ padding:'0.4rem 0.6rem' }}
          onMouseEnter={e => { e.currentTarget.style.background=color; e.currentTarget.style.borderColor=color; e.currentTarget.style.color='#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.borderColor=''; e.currentTarget.style.color='' }}>
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
      <button onClick={copy} className="interact-btn" style={{ padding:'0.4rem 0.6rem' }}>
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      </button>
    </div>
  )
}

// ── Interaction bar ───────────────────────────────────────────
function InteractionBar({ blog, onLoginPrompt }) {
  const { user } = useAuth()
  const { addToast } = useToastStore()
  const [likes, setLikes] = useState(blog.likes_count || 0)
  const [dislikes, setDislikes] = useState(blog.dislikes_count || 0)
  const [userVote, setUserVote] = useState(null)
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

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
    addToast({ type:'success', title: next?'Saved':'Removed', message: next?'Blog saved.':'Removed from saved.' })
  }

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.625rem', flexWrap:'wrap', padding:'1rem 0', borderTop:'1px solid var(--border-color)', borderBottom:'1px solid var(--border-color)', margin:'1.75rem 0' }}>
      <span style={{ fontSize:'0.8125rem', color:'var(--text-tertiary)', display:'flex', alignItems:'center', gap:6 }}>
        <FontAwesomeIcon icon={faEye} />{fmt(blog.views_count)} views
      </span>
      <div style={{ flex:1 }} />
      <button onClick={()=>vote('like')} disabled={busy} className={`interact-btn ${userVote==='like'?'active':''}`}>
        <FontAwesomeIcon icon={userVote==='like'?faThumbsUp:faThumbsUpReg} />{fmt(likes)}
      </button>
      <button onClick={()=>vote('dislike')} disabled={busy} className={`interact-btn ${userVote==='dislike'?'active-red':''}`}>
        <FontAwesomeIcon icon={userVote==='dislike'?faThumbsDown:faThumbsDownReg} />{fmt(dislikes)}
      </button>
      <button onClick={save} className={`interact-btn ${saved?'active-amber':''}`}>
        <FontAwesomeIcon icon={saved?faBookmark:faBookmarkReg} />
        <span className="hidden sm:inline">{saved?'Saved':'Save'}</span>
      </button>
      <ShareBar url={`${SITE_CONFIG.siteURL}/blogs/${blog.slug}`} title={blog.title} />
      <ReportButton contentType="blog" contentId={blog.id} />
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
            <Link to={`/blogs/${b.slug}`} style={{ display:'block', background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-xl)', overflow:'hidden', textDecoration:'none', transition:'all 0.18s' }}
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
        <div className="sk" style={{ width:'100%', aspectRatio:'21/8', borderRadius:'var(--radius-2xl)', marginBottom:'2rem' }} />
        <div className="blog-article-layout">
          <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
            <div className="sk" style={{ height:36, width:'75%', borderRadius:8 }} />
            <div className="sk" style={{ height:18, width:'50%', borderRadius:8 }} />
            <div style={{ marginTop:'0.5rem', display:'flex', flexDirection:'column', gap:'0.625rem' }}>
              {[100,90,100,80,100,65,100,88].map((w,i) => (
                <div key={i} className="sk" style={{ height:15, width:`${w}%`, borderRadius:6 }} />
              ))}
            </div>
          </div>
          <div className="blog-article-sidebar" style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <div className="sk" style={{ height:200, borderRadius:'var(--radius-2xl)' }} />
            <div className="sk" style={{ height:120, borderRadius:'var(--radius-2xl)' }} />
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

  const articleRef = useRef(null)

  useEffect(() => {
    trackPage('BlogDetail'); setLoading(true); setNotFound(false)
    getBlogBySlug(slug)
      .then(async data => {
        if (!data) { setNotFound(true); return }
        setBlog(data)
        incrementBlogViews(data.id).catch(() => {})
        const rel = await getRelatedBlogs(slug, data.category, data.tags).catch(() => [])
        setRelated(rel)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const onLoginPrompt = useCallback(() => {
    addToast({ type:'info', title:'Login required', message:'Sign in to interact.' })
    navigate('/login', { state: { from: `/blogs/${slug}` } })
  }, [slug, navigate, addToast])

  if (loading) return <Skeleton />
  if (notFound) return <Navigate to="/404" replace />

  const pageUrl = `${SITE_CONFIG.siteURL}/blogs/${blog.slug}`

  return (
    <>
      <Helmet>
        <title>{buildTitle(blog.seo_title || blog.title)}</title>
        <meta name="description" content={blog.seo_description || blog.short_description || ''} />
        <meta property="og:title" content={blog.seo_title || blog.title} />
        <meta property="og:description" content={blog.seo_description || blog.short_description || ''} />
        <meta property="og:image" content={blog.thumbnail_url || SITE_CONFIG.seo.defaultOGImage} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"Article","headline":blog.title,"image":blog.thumbnail_url,"datePublished":blog.created_at,"dateModified":blog.updated_at,"author":{"@type":"Person","name":"Muhtasim Rahman"},"url":pageUrl })}</script>
      </Helmet>

      <ReadingProgress articleRef={articleRef} />

      <div className="container-xl" style={{ paddingTop:'calc(var(--navbar-h) + 1.5rem)', paddingBottom:'3rem' }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{label:'Feed',href:'/feed'},{label:'Blogs',href:'/feed?type=blog'},{label:blog.title}]} />

        {/* Hero image */}
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
                  <span style={{ fontSize:'0.72rem', color:'var(--text-tertiary)', display:'flex', alignItems:'center', gap:4, background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', padding:'0.2rem 0.6rem', borderRadius:'var(--radius-full)' }}>
                    <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize:'0.65rem' }} />{blog.category}
                  </span>
                )}
                {blog.tags?.map(t => (
                  <span key={t} style={{ fontSize:'0.7rem', color:'var(--text-tertiary)', background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', padding:'0.15rem 0.55rem', borderRadius:'var(--radius-full)' }}>#{t}</span>
                ))}
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
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><FontAwesomeIcon icon={faCalendarDays} />{fmtDate(blog.created_at)}</span>
                {blog.reading_time && <span style={{ display:'flex', alignItems:'center', gap:6 }}><FontAwesomeIcon icon={faClock} />{blog.reading_time} min read</span>}
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><FontAwesomeIcon icon={faEye} />{fmt(blog.views_count)} views</span>
              </div>
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

          {/* Sidebar */}
          <aside className="blog-article-sidebar">
            <TocSidebar articleRef={articleRef} />
            {/* Meta card */}
            <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-2xl)', padding:'1.125rem' }}>
              <p style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-tertiary)', marginBottom:'0.75rem' }}>About this article</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.55rem', fontSize:'0.8125rem' }}>
                {blog.category && (
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ color:'var(--text-tertiary)' }}>Category</span>
                    <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{blog.category}</span>
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
                  <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{new Date(blog.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                </div>
              </div>
              {blog.tags?.length > 0 && (
                <div style={{ marginTop:'0.875rem' }}>
                  <p style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-tertiary)', marginBottom:'0.5rem' }}>Tags</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem' }}>
                    {blog.tags.map(t => (
                      <span key={t} style={{ fontSize:'0.72rem', padding:'0.2rem 0.55rem', background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-full)', color:'var(--text-tertiary)' }}>#{t}</span>
                    ))}
                  </div>
                </div>
              )}
              <Link to="/feed?type=blog" style={{ display:'flex', alignItems:'center', gap:8, marginTop:'1rem', fontSize:'0.8125rem', color:'var(--accent-primary)', textDecoration:'none' }}>
                <FontAwesomeIcon icon={faArrowLeft} />All blogs
              </Link>
            </div>
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
