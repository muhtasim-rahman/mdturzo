// PostDetailPage.jsx — v2.5.1 REBUILD
// Facebook-style post detail: media viewer (left) + post info+comments (right) on desktop.
// Multiple images/videos with navigation arrows + dot indicators.

import './feed.css'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Navigate, useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft, faChevronRight, faPlay, faGlobe, faArrowLeft,
  faEye, faThumbsUp, faThumbsDown, faBookmark, faShareNodes,
  faCalendarDays, faCopy, faCheck,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg, faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

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
  getPostBySlug, getRelatedPosts, incrementPostViews,
  getLikeStats, getUserLikeStatus, toggleLike,
  getFeedSavedStatus, toggleFeedSaved,
} from '../../services/supabase.js'

// ── Utils ─────────────────────────────────────────────────────
function fmt(n) { if(!n)return'0'; if(n>=1000)return`${(n/1000).toFixed(1)}k`; return String(n) }
function timeAgo(s) {
  if(!s) return ''
  const d = (Date.now()-new Date(s))/1000
  if(d<60) return 'Just now'
  if(d<3600) return `${Math.floor(d/60)}m ago`
  if(d<86400) return `${Math.floor(d/3600)}h ago`
  if(d<604800) return `${Math.floor(d/86400)}d ago`
  return new Date(s).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})
}
function getYtId(url) { return url?.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1] }
function getYtThumb(url) { const id=getYtId(url); return id?`https://img.youtube.com/vi/${id}/hqdefault.jpg`:null }
function toEmbedUrl(url, platform) {
  if (!url) return null
  const ytId = getYtId(url)
  if (ytId) return `https://www.youtube.com/embed/${ytId}?rel=0&autoplay=1`
  if (platform==='facebook'||url.includes('facebook.com'))
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`
  return url
}

// ── Build media list from post ────────────────────────────────
// Merges media_items array + legacy embed_url into one list
function buildMediaList(post) {
  const items = [...(post.media_items || [])]
  if (!items.length && post.embed_url) {
    items.push({
      type: getYtId(post.embed_url) ? 'youtube' : 'video',
      url: post.embed_url,
      platform: post.platform,
      thumbnail: post.thumbnail_url || getYtThumb(post.embed_url),
    })
  }
  return items
}

// ── Media viewer item ─────────────────────────────────────────
function MediaViewerItem({ item, active }) {
  const [playing, setPlaying] = useState(false)
  const isYt = item.type==='youtube' || getYtId(item.url)
  const isVid = item.type==='video' || item.type==='youtube' || isYt
  const thumb = item.thumbnail || (isYt ? getYtThumb(item.url) : null)

  if (!active) return null

  if (isVid) {
    if (playing) {
      const embedUrl = toEmbedUrl(item.url, item.platform)
      return (
        <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <iframe src={embedUrl} title={item.caption||'Video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width:'100%', height:'100%', border:'none', display:'block' }} />
        </div>
      )
    }
    return (
      <div style={{ width:'100%', height:'100%', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', background:'#000', cursor:'pointer' }} onClick={() => setPlaying(true)}>
        {thumb && <img src={thumb} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />}
        <div style={{ position:'relative', zIndex:1, width:72, height:72, borderRadius:'50%', background:'rgba(0,0,0,0.72)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }}>
          <FontAwesomeIcon icon={faPlay} style={{ color:'#fff', fontSize:'1.5rem', marginLeft:4 }} />
        </div>
        {isYt && (
          <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#ff0000', color:'#fff', padding:'0.35rem 0.875rem', borderRadius:99, fontSize:'0.8rem', fontWeight:700, display:'flex', alignItems:'center', gap:6 }}>
            <FontAwesomeIcon icon={faYoutube} />YouTube
          </div>
        )}
      </div>
    )
  }

  // Image
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#000' }}>
      <img src={item.url} alt={item.caption||''} style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain', display:'block' }} />
    </div>
  )
}

// ── Media panel (left) ────────────────────────────────────────
function MediaPanel({ mediaList, idx, setIdx }) {
  const prev = useCallback(() => setIdx(i => (i-1+mediaList.length)%mediaList.length), [mediaList.length, setIdx])
  const next  = useCallback(() => setIdx(i => (i+1)%mediaList.length), [mediaList.length, setIdx])

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key==='ArrowLeft') prev()
      if (e.key==='ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  if (!mediaList.length) {
    return (
      <div className="post-media-panel" style={{ background:'var(--bg-surface-2)', minHeight:280 }}>
        <div style={{ color:'var(--text-tertiary)', textAlign:'center' }}>
          <FontAwesomeIcon icon={faPlay} style={{ fontSize:'3rem', opacity:0.2 }} />
          <p style={{ marginTop:'1rem', fontSize:'0.875rem' }}>No media</p>
        </div>
      </div>
    )
  }

  return (
    <div className="post-media-panel">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
          <MediaViewerItem item={mediaList[idx]} active={true} />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      {mediaList.length > 1 && (
        <>
          <button className="post-media-nav prev" onClick={prev} aria-label="Previous">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="post-media-nav next" onClick={next} aria-label="Next">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          {/* Dots */}
          <div className="post-media-dots">
            {mediaList.map((_,i) => (
              <button key={i} className={`post-media-dot ${i===idx?'active':''}`}
                onClick={() => setIdx(i)} aria-label={`Media ${i+1}`}
                style={{ border:'none', cursor:'pointer', padding:0 }} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Share bar (compact) ───────────────────────────────────────
function ShareBar({ url, title }) {
  const { addToast } = useToastStore()
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const links = [
    { icon:faFacebook, href:`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, color:'#1877f2' },
    { icon:faXTwitter, href:`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, color:'#000' },
    { icon:faWhatsapp, href:`https://wa.me/?text=${enc(title+' '+url)}`, color:'#25d366' },
    { icon:faTelegram, href:`https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`, color:'#0088cc' },
  ]
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); addToast({type:'success',title:'Copied!',message:'Link copied.'}); setTimeout(()=>setCopied(false),2000) }
    catch { addToast({type:'error',title:'Error',message:'Could not copy.'}) }
  }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', flexWrap:'wrap', padding:'0.625rem 0' }}>
      <span style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--text-tertiary)', marginRight:4 }}>
        <FontAwesomeIcon icon={faShareNodes} style={{ marginRight:5 }} />Share
      </span>
      {links.map(({ icon, href, color }, i) => (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="interact-btn" style={{ padding:'0.35rem 0.55rem', fontSize:'0.8rem' }}
          onMouseEnter={e=>{e.currentTarget.style.background=color; e.currentTarget.style.borderColor=color; e.currentTarget.style.color='#fff'}}
          onMouseLeave={e=>{e.currentTarget.style.background=''; e.currentTarget.style.borderColor=''; e.currentTarget.style.color=''}}>
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
      <button onClick={copy} className="interact-btn" style={{ padding:'0.35rem 0.55rem', fontSize:'0.8rem' }}>
        <FontAwesomeIcon icon={copied?faCheck:faCopy} />
      </button>
    </div>
  )
}

// ── Interaction bar ───────────────────────────────────────────
function InteractionBar({ post, onLoginPrompt }) {
  const { user } = useAuth()
  const { addToast } = useToastStore()
  const [likes, setLikes]     = useState(post.likes_count||0)
  const [dislikes,setDislikes]= useState(post.dislikes_count||0)
  const [userVote,setUserVote]= useState(null)
  const [saved,setSaved]      = useState(false)
  const [busy,setBusy]        = useState(false)

  useEffect(() => {
    if (!post.id) return
    Promise.all([
      getLikeStats('post', post.id),
      user ? getUserLikeStatus('post', post.id, user.uid) : null,
      user ? getFeedSavedStatus(user.uid, 'post', post.id) : false,
    ]).then(([stats, vote, sv]) => {
      setLikes(stats?.likes||0); setDislikes(stats?.dislikes||0)
      setUserVote(vote); setSaved(sv)
    }).catch(()=>{})
  }, [post.id, user])

  const vote = async (vt) => {
    if (!user) { onLoginPrompt(); return }
    if (busy) return; setBusy(true)
    const prev=userVote, next=prev===vt?null:vt
    setUserVote(next)
    setLikes(l => l+(vt==='like'?(next?1:-1):(prev==='like'?-1:0)))
    setDislikes(d => d+(vt==='dislike'?(next?1:-1):(prev==='dislike'?-1:0)))
    await toggleLike('post', post.id, user.uid, vt).catch(()=>{})
    setBusy(false)
  }
  const save = async () => {
    if (!user) { onLoginPrompt(); return }
    const next=!saved; setSaved(next)
    await toggleFeedSaved(user.uid, 'post', post.id).catch(()=>setSaved(!next))
    addToast({ type:'success', title:next?'Saved':'Removed', message:next?'Post saved.':'Removed.' })
  }

  return (
    <div className="post-info-actions">
      {/* Stats */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.5rem 1.25rem', fontSize:'0.8125rem', color:'var(--text-tertiary)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
          {likes>0 && <><div style={{ display:'flex' }}><span style={{ width:20,height:20,borderRadius:'50%',background:'var(--accent-primary)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.65rem' }}>👍</span></div><span>{fmt(likes)}</span></>}
        </div>
        <div style={{ display:'flex', gap:'1rem' }}>
          {dislikes>0 && <span>{fmt(dislikes)} dislikes</span>}
        </div>
      </div>
      {/* Divider */}
      <div style={{ height:1, background:'var(--border-color)', margin:'0 1.25rem' }} />
      {/* Action buttons */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', padding:'0.375rem 0.5rem', gap:'0.25rem' }}>
        <button onClick={()=>vote('like')} disabled={busy} className={`post-action-btn ${userVote==='like'?'liked':''}`} style={{ fontSize:'0.8125rem' }}>
          <FontAwesomeIcon icon={userVote==='like'?faThumbsUp:faThumbsUpReg} /><span>Like</span>
        </button>
        <button onClick={()=>vote('dislike')} disabled={busy} className="post-action-btn" style={{ fontSize:'0.8125rem', color:userVote==='dislike'?'#ef4444':'' }}>
          <FontAwesomeIcon icon={userVote==='dislike'?faThumbsDown:faThumbsDownReg} /><span>Dislike</span>
        </button>
        <button onClick={save} className={`post-action-btn ${saved?'liked':''}`} style={{ fontSize:'0.8125rem' }}>
          <FontAwesomeIcon icon={saved?faBookmark:faBookmarkReg} /><span>{saved?'Saved':'Save'}</span>
        </button>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <ReportButton contentType="post" contentId={post.id} compact />
        </div>
      </div>
      {/* Share */}
      <div style={{ padding:'0 1.25rem 0.5rem' }}>
        <ShareBar url={`${SITE_CONFIG.siteURL}/posts/${post.slug}`} title={post.title} />
      </div>
    </div>
  )
}

// ── Related posts row ─────────────────────────────────────────
function RelatedPosts({ posts }) {
  if (!posts?.length) return null
  return (
    <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid var(--border-color)' }}>
      <p style={{ fontSize:'0.8125rem', fontWeight:700, color:'var(--text-secondary)', marginBottom:'0.75rem' }}>More posts</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
        {posts.map(p => {
          const ytId = getYtId(p.embed_url)
          const thumb = p.thumbnail_url || (ytId?`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`:null)
          return (
            <Link key={p.id} to={`/posts/${p.slug}`} style={{ display:'flex', gap:'0.75rem', textDecoration:'none', padding:'0.375rem', borderRadius:'var(--radius-lg)', transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg-surface-2)'}
              onMouseLeave={e=>e.currentTarget.style.background=''}>
              <div style={{ width:72, height:48, borderRadius:'var(--radius-md)', overflow:'hidden', flexShrink:0, background:'var(--bg-surface-2)' }}>
                {thumb && <img src={thumb} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:'0.8125rem', fontWeight:600, color:'var(--text-primary)', lineHeight:1.35, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{p.title}</p>
                <p style={{ fontSize:'0.72rem', color:'var(--text-tertiary)', marginTop:2 }}><FontAwesomeIcon icon={faEye} style={{ marginRight:4 }} />{fmt(p.views_count)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────
function Skeleton() {
  return (
    <div style={{ paddingTop:'var(--navbar-h)' }}>
      <div className="post-detail-layout">
        <div className="post-media-panel" style={{ background:'var(--bg-surface-2)' }}>
          <div className="sk" style={{ width:'80%', height:'60%', borderRadius:'var(--radius-xl)' }} />
        </div>
        <div className="post-info-panel">
          <div style={{ padding:'1.125rem 1.25rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div className="sk" style={{ width:42, height:42, borderRadius:'50%' }} />
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
              <div className="sk" style={{ height:14, width:140, borderRadius:6 }} />
              <div className="sk" style={{ height:11, width:100, borderRadius:6 }} />
            </div>
          </div>
          <div style={{ padding:'0 1.25rem 1rem', display:'flex', flexDirection:'column', gap:8 }}>
            {[100,92,85,60].map((w,i) => <div key={i} className="sk" style={{ height:14, width:`${w}%`, borderRadius:6 }} />)}
          </div>
          <div style={{ height:1, background:'var(--border-color)', margin:'0 1.25rem' }} />
          <div style={{ display:'flex', padding:'0.75rem', gap:'0.5rem' }}>
            {[0,1,2].map(i => <div key={i} className="sk" style={{ flex:1, height:36, borderRadius:'var(--radius-lg)' }} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
function PostDetailContent() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const location    = useLocation()
  const { addToast } = useToastStore()

  const [post,    setPost]    = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound,setNotFound]= useState(false)
  const [mediaIdx, setMediaIdx] = useState(location.state?.mediaIndex || 0)

  useEffect(() => {
    trackPage('PostDetail'); setLoading(true); setNotFound(false)
    getPostBySlug(slug)
      .then(async data => {
        if (!data) { setNotFound(true); return }
        setPost(data)
        incrementPostViews(data.id).catch(()=>{})
        const rel = await getRelatedPosts(slug, data.category, data.tags).catch(()=>[])
        setRelated(rel)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const onLoginPrompt = useCallback(() => {
    addToast({ type:'info', title:'Login required', message:'Sign in to interact.' })
    navigate('/login', { state: { from: `/posts/${slug}` } })
  }, [slug, navigate, addToast])

  if (loading) return <Skeleton />
  if (notFound) return <Navigate to="/404" replace />

  const mediaList = buildMediaList(post)
  const safeIdx   = Math.min(mediaIdx, Math.max(0, mediaList.length-1))
  const curMedia  = mediaList[safeIdx]
  const pageUrl   = `${SITE_CONFIG.siteURL}/posts/${post.slug}`
  const ogImage   = post.thumbnail_url || (curMedia ? (curMedia.thumbnail || getYtThumb(curMedia.url)) : null) || SITE_CONFIG.seo.defaultOGImage

  return (
    <>
      <Helmet>
        <title>{buildTitle(post.title)}</title>
        <meta name="description" content={post.description || post.content || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <div style={{ paddingTop:'var(--navbar-h)' }}>
        <div className="post-detail-layout">

          {/* ── Left: Media panel ── */}
          <MediaPanel mediaList={mediaList} idx={safeIdx} setIdx={setMediaIdx} />

          {/* ── Right: Info panel ── */}
          <div className="post-info-panel">

            {/* Breadcrumb + back */}
            <div className="post-info-header">
              <Breadcrumb items={[{label:'Feed',href:'/feed'},{label:'Posts',href:'/feed?type=post'},{label:post.title}]} />
            </div>

            {/* Author */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.875rem 1.25rem', borderBottom:'1px solid var(--border-color)' }}>
              <div className="post-avatar">
                <img src="/logo.webp" alt="" onError={e=>{e.currentTarget.style.display='none'}} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:'0.9375rem', color:'var(--text-primary)' }}>{SITE_CONFIG.owner.displayName}</p>
                <p className="post-author-meta">
                  <span>{SITE_CONFIG.siteTagline}</span>
                  <span>·</span>
                  <FontAwesomeIcon icon={faCalendarDays} style={{ fontSize:'0.65rem' }} />
                  <span>{timeAgo(post.created_at)}</span>
                  <span>·</span>
                  <FontAwesomeIcon icon={faGlobe} style={{ fontSize:'0.65rem' }} />
                </p>
              </div>
            </div>

            {/* Post content */}
            <div className="post-info-body">
              <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.0625rem', color:'var(--text-primary)', lineHeight:1.3, marginBottom:'0.625rem' }}>
                {post.title}
              </h1>
              {(post.content || post.description) && (
                <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', lineHeight:1.65, whiteSpace:'pre-wrap' }}>
                  {post.content || post.description}
                </p>
              )}
              {/* Tags */}
              {post.tags?.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem', marginTop:'0.75rem' }}>
                  {post.tags.map(t => (
                    <span key={t} style={{ fontSize:'0.72rem', padding:'0.2rem 0.55rem', background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-full)', color:'var(--text-tertiary)' }}>#{t}</span>
                  ))}
                </div>
              )}
              {/* Meta */}
              <div style={{ display:'flex', gap:'1rem', marginTop:'0.875rem', fontSize:'0.78rem', color:'var(--text-tertiary)', flexWrap:'wrap' }}>
                <span>👁 {fmt(post.views_count)} views</span>
                <span>👍 {fmt(post.likes_count)} likes</span>
                {mediaList.length > 1 && (
                  <span>{mediaIdx+1} / {mediaList.length} {mediaList.length===1?'media':'items'}</span>
                )}
              </div>
            </div>

            {/* Interactions */}
            <InteractionBar post={post} onLoginPrompt={onLoginPrompt} />

            {/* Comments */}
            <div className="post-info-comments" style={{ padding:'0.875rem 1.25rem' }}>
              <CommentSection contentType="post" contentId={post.id} contentSlug={post.slug} />
            </div>

            {/* Related posts */}
            <RelatedPosts posts={related} />
          </div>

        </div>
      </div>
    </>
  )
}

export default function PostDetailPage() {
  return (
    <VisibilityGuard page="posts" skeleton="post-detail">
      <PostDetailContent />
    </VisibilityGuard>
  )
}
