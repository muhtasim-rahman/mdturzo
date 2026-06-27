// PostDetailPage.jsx — v2.5.2
// Layout: header card → images/video section → markdown content → action bar → comments → related
// Shared image preview modal, carousel for multiple images.
// Fully responsive. Tags clickable → feed search.

import './feed.css'
import { useState, useEffect, useCallback } from 'react'
import { useParams, Navigate, useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faEye, faThumbsUp, faThumbsDown, faBookmark,
  faShareNodes, faCalendarDays, faCopy, faCheck, faGlobe,
  faFolderOpen, faPlay,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg,
  faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import CommentSection from '../shared/CommentSection.jsx'
import ReportButton from '../shared/ReportButton.jsx'
import Breadcrumb from '../shared/Breadcrumb.jsx'
import Carousel from '../shared/Carousel.jsx'
import ImagePreviewModal from '../shared/ImagePreviewModal.jsx'
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

function fmt(n) { if(!n)return'0'; if(n>=1000)return`${(n/1000).toFixed(1)}k`; return String(n) }
function timeAgo(s) {
  if(!s) return ''
  const d = (Date.now()-new Date(s))/1000
  if(d<60) return 'just now'
  if(d<3600) return `${Math.floor(d/60)}m ago`
  if(d<86400) return `${Math.floor(d/3600)}h ago`
  if(d<604800) return `${Math.floor(d/86400)}d ago`
  if(d<2592000) return `${Math.floor(d/604800)}w ago`
  return new Date(s).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})
}

function getYtId(url) { return url?.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1] }
function getYtThumb(url) { const id=getYtId(url); return id?`https://img.youtube.com/vi/${id}/hqdefault.jpg`:null }
function toEmbedUrl(url) {
  if(!url) return null
  const ytId = getYtId(url)
  if(ytId) return `https://www.youtube.com/embed/${ytId}?rel=0&autoplay=1`
  if(url.includes('facebook.com'))
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`
  return url
}

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^### (.+)$/gm,'<h3 style="font-size:1rem;font-weight:700;color:var(--text-primary);margin:1rem 0 0.25rem">$1</h3>')
    .replace(/^## (.+)$/gm,'<h2 style="font-size:1.1rem;font-weight:800;color:var(--text-primary);margin:1.25rem 0 0.375rem">$1</h2>')
    .replace(/^# (.+)$/gm,'<h1 style="font-size:1.2rem;font-weight:900;color:var(--text-primary);margin:1.5rem 0 0.5rem">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/__(.+?)__/g,'<u>$1</u>')
    .replace(/`(.+?)`/g,'<code style="background:var(--bg-surface-2);padding:0 4px;border-radius:4px;font-size:0.9em;font-family:monospace">$1</code>')
    .replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary);text-decoration:underline">$1</a>')
    .replace(/\n\n/g,'</p><p style="margin:0.75em 0">')
    .replace(/\n/g,'<br/>')
}

// Build final media list
function buildMediaList(post) {
  const items = [...(post.media_items || [])]
  if (!items.length && post.embed_url) {
    const ytId = getYtId(post.embed_url)
    items.push({
      type: ytId ? 'youtube' : 'video',
      url: post.embed_url,
      thumbnail: post.thumbnail_url || (ytId ? getYtThumb(post.embed_url) : null),
    })
  }
  return items
}

// Video viewer
function VideoViewer({ item }) {
  const [playing, setPlaying] = useState(false)
  const isYt = item.type==='youtube' || getYtId(item.url)
  const thumb = item.thumbnail || (isYt ? getYtThumb(item.url) : null)
  const embedUrl = toEmbedUrl(item.url)

  if (playing && embedUrl) {
    return (
      <div style={{ background:'#000' }}>
        <iframe src={embedUrl} title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width:'100%', aspectRatio:'16/9', border:'none', display:'block' }} />
      </div>
    )
  }
  return (
    <div style={{ position:'relative', cursor:'pointer', background:'#000' }} onClick={()=>setPlaying(true)}>
      {thumb
        ? <img src={thumb} alt="" style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', opacity:0.75, display:'block' }} />
        : <div style={{ width:'100%', aspectRatio:'16/9', background:'#111' }} />
      }
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(0,0,0,0.72)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }}>
          <FontAwesomeIcon icon={faPlay} style={{ color:'#fff', fontSize:'1.5rem', marginLeft:4 }} />
        </div>
      </div>
      {isYt && (
        <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', background:'#ff0000', color:'#fff', padding:'0.3rem 0.75rem', borderRadius:99, fontSize:'0.78rem', fontWeight:700, display:'flex', alignItems:'center', gap:5 }}>
          <FontAwesomeIcon icon={faYoutube} />YouTube
        </div>
      )}
    </div>
  )
}

// Share buttons
function ShareBar({ url, title }) {
  const { addToast } = useToastStore()
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true); setTimeout(()=>setCopied(false), 2000)
      addToast({ type:'success', title:'Copied!', message:'Link copied.' })
    })
  }
  const enc = encodeURIComponent
  const shares = [
    { icon:faXTwitter,  url:`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,  color:'#1DA1F2' },
    { icon:faFacebook,  url:`https://facebook.com/sharer/sharer.php?u=${enc(url)}`,                color:'#1877F2' },
    { icon:faLinkedin,  url:`https://linkedin.com/shareArticle?mini=true&url=${enc(url)}`,          color:'#0A66C2' },
    { icon:faWhatsapp,  url:`https://wa.me/?text=${enc(title+' '+url)}`,                            color:'#25D366' },
    { icon:faTelegram,  url:`https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,            color:'#2CA5E0' },
  ]
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap' }}>
      {shares.map((s,i) => (
        <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
          style={{ width:36, height:36, borderRadius:10, background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)', textDecoration:'none', transition:'all 0.15s' }}
          onMouseEnter={e=>{e.currentTarget.style.color=s.color;e.currentTarget.style.borderColor=s.color}}
          onMouseLeave={e=>{e.currentTarget.style.color='';e.currentTarget.style.borderColor=''}}>
          <FontAwesomeIcon icon={s.icon} />
        </a>
      ))}
      <button onClick={copy}
        style={{ width:36, height:36, borderRadius:10, background: copied?'color-mix(in srgb, var(--accent-primary) 12%, transparent)':'var(--bg-surface-2)', border:`1px solid ${copied?'var(--accent-primary)':'var(--border-color)'}`, display:'flex', alignItems:'center', justifyContent:'center', color:copied?'var(--accent-primary)':'var(--text-secondary)', cursor:'pointer', transition:'all 0.15s' }}>
        <FontAwesomeIcon icon={copied?faCheck:faCopy} />
      </button>
    </div>
  )
}

// Related posts
function RelatedPosts({ posts }) {
  if (!posts?.length) return null
  return (
    <div style={{ marginTop:'2.5rem' }}>
      <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.125rem', color:'var(--text-primary)', marginBottom:'1rem' }}>
        Related Posts
      </h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap:'0.875rem' }}>
        {posts.map((p,i) => {
          const thumb = p.thumbnail_url || getYtThumb(p.embed_url) || p.media_items?.[0]?.thumbnail || p.media_items?.[0]?.url
          return (
            <motion.div key={p.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}>
              <Link to={`/posts/${p.slug}`}
                style={{ display:'block', background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-xl)', overflow:'hidden', textDecoration:'none', transition:'all 0.18s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='color-mix(in srgb, var(--accent-primary) 40%, transparent)'; e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=''; e.currentTarget.style.transform=''}}>
                {thumb && <img src={thumb} alt={p.title} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', display:'block' }} loading="lazy" />}
                <div style={{ padding:'0.875rem' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.875rem', color:'var(--text-primary)', lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize:'0.75rem', color:'var(--text-tertiary)', marginTop:'0.3rem' }}>{timeAgo(p.created_at)}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Skeleton
function Skeleton() {
  return (
    <div style={{ paddingTop:'var(--navbar-h)' }}>
      <div className="container-xl" style={{ maxWidth:680, paddingBlock:'2rem' }}>
        <div className="sk" style={{ height:4, width:'80px', borderRadius:99, marginBottom:'1.5rem' }} />
        <div className="sk" style={{ width:'100%', aspectRatio:'16/9', borderRadius:'var(--radius-2xl)', marginBottom:'1.5rem' }} />
        <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
          {[80,60,100,90,75].map((w,i) => (
            <div key={i} className="sk" style={{ height:16, width:`${w}%`, borderRadius:6 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Main
function PostDetailContent() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { addToast } = useToastStore()
  const { user } = useAuth()

  const [post,    setPost]    = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound,setNotFound]= useState(false)
  const [likes,   setLikes]   = useState(0)
  const [dislikes,setDislikes]= useState(0)
  const [userVote,setUserVote]= useState(null)
  const [saved,   setSaved]   = useState(false)
  const [busy,    setBusy]    = useState(false)
  const [previewIdx, setPreviewIdx] = useState(null)

  useEffect(() => {
    trackPage('PostDetail'); setLoading(true); setNotFound(false)
    getPostBySlug(slug)
      .then(async data => {
        if (!data) { setNotFound(true); return }
        setPost(data)
        setLikes(data.likes_count||0); setDislikes(data.dislikes_count||0)
        incrementPostViews(data.id, user?.uid || null).catch(()=>{})
        const rel = await getRelatedPosts(slug, data.category, data.tags).catch(()=>[])
        setRelated(rel)
        if (user) {
          const [vote, sv] = await Promise.all([
            getUserLikeStatus('post', data.id, user.uid),
            getFeedSavedStatus(user.uid, 'post', data.id),
          ]).catch(()=>[null,false])
          setUserVote(vote); setSaved(sv||false)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!post || !user) return
    getLikeStats('post', post.id).then(s => { setLikes(s.likes||0); setDislikes(s.dislikes||0) })
    getUserLikeStatus('post', post.id, user.uid).then(v => setUserVote(v))
    getFeedSavedStatus(user.uid, 'post', post.id).then(sv => setSaved(sv||false))
  }, [user, post?.id])

  const onLoginPrompt = useCallback(() => {
    addToast({ type:'info', title:'Login required', message:'Sign in to interact.' })
    navigate('/login', { state:{ from:`/posts/${slug}` } })
  }, [slug, navigate, addToast])

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
    addToast({ type:'success', title:next?'Saved':'Removed', message:next?'Post saved.':'Removed from saved.' })
  }

  const handleTagClick = (tag) => navigate(`/feed?q=${encodeURIComponent(tag)}&type=post`)

  if (loading) return <Skeleton />
  if (notFound) return <Navigate to="/404" replace />

  const pageUrl = `${SITE_CONFIG.siteURL}/posts/${post.slug}`
  const mediaList = buildMediaList(post)
  const imageItems = mediaList.filter(m => m.type==='image')
  const videoItem  = mediaList.find(m => m.type==='youtube'||m.type==='video')
  const hasVideo = !!videoItem
  const ogImage = post.thumbnail_url || getYtThumb(post.embed_url) || imageItems[0]?.url || SITE_CONFIG.seo.defaultOGImage

  const btnStyle = (active, color='var(--accent-primary)') => ({
    display:'flex', alignItems:'center', gap:6, padding:'0.55rem 1rem',
    borderRadius:'var(--radius-xl)', border:`1.5px solid ${active?color:'var(--border-color)'}`,
    background: active?`color-mix(in srgb, ${color} 10%, transparent)`:'var(--bg-surface)',
    color: active?color:'var(--text-secondary)',
    cursor:'pointer', fontSize:'0.8375rem', fontWeight:600, transition:'all 0.18s',
  })

  return (
    <>
      <Helmet>
        <title>{buildTitle(post.title)}</title>
        <meta name="description" content={post.description||post.title||''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <div style={{ paddingTop:'var(--navbar-h)', paddingBottom:'3rem' }}>
        <div className="container-xl" style={{ maxWidth:720 }}>
          <div style={{ paddingTop:'1.5rem' }}>
            <Breadcrumb items={[{label:'Feed',href:'/feed'},{label:'Posts',href:'/feed?type=post'},{label:post.title}]} />

            {/* Author header card */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
              style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-2xl)', padding:'1.25rem 1.5rem', marginBottom:'1.25rem', marginTop:'1rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.875rem' }}>
                <div style={{ width:48, height:48, borderRadius:'50%', overflow:'hidden', background:'linear-gradient(135deg,var(--accent-primary),#818cf8)', flexShrink:0 }}>
                  <img src="/logo.webp" alt="Muhtasim" style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={e=>{e.currentTarget.style.display='none'}} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.9375rem', color:'var(--text-primary)', margin:0 }}>
                    {SITE_CONFIG.owner.displayName}
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'0.78rem', color:'var(--text-tertiary)', marginTop:2, flexWrap:'wrap' }}>
                    <span>{SITE_CONFIG.owner.location}</span>
                    <span>·</span>
                    <span>{timeAgo(post.created_at)}</span>
                    <span>·</span>
                    <FontAwesomeIcon icon={faGlobe} style={{ fontSize:'0.65rem' }} />
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'0.8125rem', color:'var(--text-tertiary)' }}>
                  <FontAwesomeIcon icon={faEye} />
                  <span>{fmt(post.views_count)}</span>
                </div>
              </div>
            </motion.div>

            {/* Video — if exists, shown first (no images) */}
            {hasVideo && (
              <div style={{ borderRadius:'var(--radius-2xl)', overflow:'hidden', marginBottom:'1.25rem', border:'1px solid var(--border-color)' }}>
                <VideoViewer item={videoItem} />
              </div>
            )}

            {/* Images — carousel if multiple, single otherwise */}
            {!hasVideo && imageItems.length > 0 && (
              <div style={{ marginBottom:'1.25rem' }}>
                <Carousel
                  images={imageItems.map(m => ({ url:m.url, caption:m.caption }))}
                  aspectRatio="4/3"
                  maxHeight={480}
                />
              </div>
            )}

            {/* Post title */}
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.25rem,3vw,1.75rem)', fontWeight:900, color:'var(--text-primary)', lineHeight:1.3, marginBottom:'1rem' }}>
              {post.title}
            </h1>

            {/* Content (markdown rendered) */}
            {(post.content || post.description) && (
              <div
                style={{ fontSize:'1rem', lineHeight:1.75, color:'var(--text-secondary)', marginBottom:'1.5rem' }}
                dangerouslySetInnerHTML={{ __html: `<p style="margin:0">${renderMarkdown(post.content||post.description||'')}</p>` }}
              />
            )}

            {/* Tags + category */}
            {(post.category || (post.tags?.length > 0)) && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem', marginBottom:'1.5rem' }}>
                {post.category && (
                  <button onClick={()=>handleTagClick(post.category)}
                    style={{ fontSize:'0.75rem', padding:'0.25rem 0.65rem', background:'color-mix(in srgb, var(--accent-primary) 12%, transparent)', border:'1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)', borderRadius:'var(--radius-full)', color:'var(--accent-primary)', cursor:'pointer', fontWeight:600 }}>
                    <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize:'0.65rem', marginRight:4 }} />
                    {post.category}
                  </button>
                )}
                {post.tags?.map(t => (
                  <button key={t} onClick={()=>handleTagClick(t)}
                    style={{ fontSize:'0.75rem', padding:'0.25rem 0.65rem', background:'var(--bg-surface-2)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-full)', color:'var(--text-tertiary)', cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.color='var(--accent-primary)'}}
                    onMouseLeave={e=>{e.currentTarget.style.color=''}}>
                    #{t}
                  </button>
                ))}
              </div>
            )}

            {/* Interaction bar */}
            <div style={{ padding:'1rem 0', borderTop:'1px solid var(--border-color)', borderBottom:'1px solid var(--border-color)', marginBottom:'2rem' }}>
              {/* Stats */}
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.875rem', fontSize:'0.8125rem', color:'var(--text-tertiary)' }}>
                <span style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <FontAwesomeIcon icon={faEye} />{fmt(post.views_count)} views
                </span>
                <span style={{ marginLeft:'auto' }}>{timeAgo(post.created_at)}</span>
              </div>
              {/* Buttons */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', alignItems:'center' }}>
                <button onClick={()=>vote('like')} disabled={busy} style={btnStyle(userVote==='like','#22c55e')}>
                  <FontAwesomeIcon icon={userVote==='like'?faThumbsUp:faThumbsUpReg} />
                  <span>{fmt(likes)}</span>
                </button>
                <button onClick={()=>vote('dislike')} disabled={busy} style={btnStyle(userVote==='dislike','#ef4444')}>
                  <FontAwesomeIcon icon={userVote==='dislike'?faThumbsDown:faThumbsDownReg} />
                  <span>{fmt(dislikes)}</span>
                </button>
                <button onClick={save} style={btnStyle(saved,'#f59e0b')}>
                  <FontAwesomeIcon icon={saved?faBookmark:faBookmarkReg} />
                  <span>{saved?'Saved':'Save'}</span>
                </button>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginLeft:'auto' }}>
                  <ShareBar url={pageUrl} title={post.title} />
                  <ReportButton contentType="post" contentId={post.id} />
                </div>
              </div>
            </div>

            {/* Comments */}
            <CommentSection contentType="post" contentId={post.id} contentSlug={post.slug} />

            {/* Related */}
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
