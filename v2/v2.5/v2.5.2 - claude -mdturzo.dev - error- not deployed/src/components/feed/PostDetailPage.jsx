// PostDetailPage.jsx — v2.5.2 (complete redesign)
// Layout: left panel (images/video, sticky on desktop) + right panel (header, text, actions, comments)
// Mobile: stacked. Large screen: side-by-side.

import './feed.css'
import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet }                       from 'react-helmet-async'
import { motion, AnimatePresence }      from 'framer-motion'
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faGlobe, faEllipsis,
  faComment, faShareNodes, faBookmark, faLink, faFlag,
  faThumbsUp, faHeart, faFaceGrinSquint, faFaceSurprise, faFaceSadTear, faFaceAngry,
} from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkReg, faThumbsUp as faThumbsUpReg } from '@fortawesome/free-regular-svg-icons'

import { VisibilityGuard }  from '../shared/VisibilityGuard.jsx'
import CommentSection   from '../shared/CommentSection.jsx'
import ShareButtons         from '../shared/ShareButtons.jsx'
import ImagePreviewModal    from '../shared/ImagePreviewModal.jsx'
import MediaGrid            from './MediaGrid.jsx'
import {
  getPostBySlug,
  getFeedSavedStatus, toggleFeedSaved,
  trackContentView,
}  from '../../services/supabase.js'
import { useAuth }          from '../../hooks/useAuth.js'
import { buildTitle }       from '../../utils/seo.js'
import { collectDeviceInfo as getDeviceHash }    from '../../utils/deviceInfo.js'
import { useToastStore }    from '../../store/toastStore.js'
import { SITE_CONFIG }      from '../../config/site.config.js'

// ── Helpers ────────────────────────────────────────────────────
const fmt = n => !n ? '0' : n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n)
const timeAgo = s => {
  if (!s) return ''
  const d = (Date.now() - new Date(s)) / 1000
  if (d < 60)      return 'Just now'
  if (d < 3600)    return `${Math.floor(d/60)}m ago`
  if (d < 86400)   return `${Math.floor(d/3600)}h ago`
  if (d < 604800)  return `${Math.floor(d/86400)}d ago`
  if (d < 2592000) return `${Math.floor(d/604800)}w ago`
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Inline markdown renderer (same as PostCard) ───────────────
function renderInline(text) {
  if (!text) return null
  const parts = []; let remaining = text; let key = 0
  const patterns = [
    { r: /\*\*(.+?)\*\*/, f: m => <strong key={key++}>{m[1]}</strong> },
    { r: /\*(.+?)\*/,     f: m => <em key={key++}>{m[1]}</em> },
    { r: /__(.+?)__/,     f: m => <u key={key++}>{m[1]}</u> },
    { r: /`(.+?)`/,       f: m => <code key={key++} style={{ background:'var(--bg-surface-2)', padding:'1px 5px', borderRadius:4, fontSize:'0.9em', fontFamily:'var(--font-mono)' }}>{m[1]}</code> },
    { r: /\[(.+?)\]\((.+?)\)/, f: m => <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent-primary)', textDecoration:'underline' }}>{m[1]}</a> },
  ]
  let i = 0
  while (remaining.length > 0 && i++ < 20000) {
    let matched = false
    for (const { r, f } of patterns) {
      const m = remaining.match(r)
      if (m?.index === 0) {
        parts.push(f(m)); remaining = remaining.slice(m[0].length); matched = true; break
      }
    }
    if (!matched) {
      const last = parts[parts.length - 1]
      if (typeof last === 'string') parts[parts.length - 1] += remaining[0]
      else parts.push(remaining[0])
      remaining = remaining.slice(1)
    }
  }
  return parts
}

function parseMarkdown(text) {
  if (!text) return []
  return text.split('\n').map(raw => {
    const h4 = raw.match(/^#### (.+)/); if (h4) return { type:'h4', text:h4[1] }
    const h3 = raw.match(/^### (.+)/);  if (h3) return { type:'h3', text:h3[1] }
    const h2 = raw.match(/^## (.+)/);   if (h2) return { type:'h2', text:h2[1] }
    const h1 = raw.match(/^# (.+)/);    if (h1) return { type:'h1', text:h1[1] }
    if (raw.trim() === '') return { type:'br' }
    return { type:'p', text:raw }
  })
}

function MarkdownBody({ text }) {
  const tokens = parseMarkdown(text)
  return (
    <div style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
      {tokens.map((tok, i) => {
        if (tok.type === 'br') return <div key={i} style={{ height: '0.6em' }} />
        const Tag = tok.type === 'h1' ? 'h2' : tok.type === 'h2' ? 'h3' : tok.type === 'h3' ? 'h4' : tok.type === 'h4' ? 'h5' : 'p'
        const s   = tok.type !== 'p' && tok.type !== 'br' ? {
          fontWeight:700, color:'var(--text-primary)',
          fontSize: tok.type==='h1'?'1.25rem':tok.type==='h2'?'1.125rem':'1rem',
          margin:'0.5em 0 0.25em',
        } : { margin:'0 0 0.25em' }
        return <Tag key={i} style={s}>{renderInline(tok.text)}</Tag>
      })}
    </div>
  )
}

// ── Reactions ─────────────────────────────────────────────────
const REACTIONS = [
  { id:'like',  emoji:'👍', label:'Like',  color:'#3b82f6' },
  { id:'love',  emoji:'❤️', label:'Love',  color:'#ef4444' },
  { id:'haha',  emoji:'😂', label:'Haha',  color:'#f59e0b' },
  { id:'wow',   emoji:'😮', label:'Wow',   color:'#8b5cf6' },
  { id:'sad',   emoji:'😢', label:'Sad',   color:'#06b6d4' },
  { id:'angry', emoji:'😡', label:'Angry', color:'#ef4444' },
]

// ── Action bar ────────────────────────────────────────────────
function ActionBar({ post, saved, onSave }) {
  const { addToast } = useToastStore()
  const [reaction,   setReaction]   = useState(null)
  const [likeCount,  setLikeCount]  = useState(post.likes_count || 0)
  const [hoverLike,  setHoverLike]  = useState(false)
  const hoverTimer = useRef(null)

  const onHoverEnter = () => { hoverTimer.current = setTimeout(() => setHoverLike(true), 500) }
  const onHoverLeave = () => { clearTimeout(hoverTimer.current); setTimeout(() => setHoverLike(false), 280) }

  const handleReaction = r => {
    if (reaction?.id === r.id) { setReaction(null); setLikeCount(c => Math.max(0,c-1)) }
    else { if (!reaction) setLikeCount(c => c+1); setReaction(r) }
    addToast({ type:'info', title:'Login required', message:'Sign in to react to posts.' })
  }

  const share = async () => {
    const url = `${window.location.origin}/posts/${post.slug}`
    if (navigator.share) { try { await navigator.share({ title: post.title || 'Post', url }) } catch {} }
    else { await navigator.clipboard.writeText(url).catch(()=>{}); addToast({ type:'success', title:'Copied!', message:'Link copied.' }) }
  }

  return (
    <div>
      {/* Stats */}
      {(likeCount > 0 || post.comments_count > 0) && (
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'0.5rem 0', fontSize:'0.83rem', color:'var(--text-tertiary)',
          borderBottom:'1px solid var(--border-color)', marginBottom:'0.25rem',
        }}>
          {likeCount > 0 && (
            <span style={{ display:'flex', alignItems:'center', gap:6 }}>
              {reaction ? <span>{reaction.emoji}</span>
                : <><span>👍</span><span>❤️</span></>}
              {fmt(likeCount)}
            </span>
          )}
          {post.comments_count > 0 && (
            <a href="#comments" style={{ color:'var(--text-tertiary)', textDecoration:'none' }}>
              {fmt(post.comments_count)} comments
            </a>
          )}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display:'flex', gap:4, padding:'0.25rem 0' }}>
        {/* Like with reactions */}
        <div style={{ flex:1, position:'relative' }}
          onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
          <AnimatePresence>
            {hoverLike && (
              <motion.div
                className="reaction-popup"
                initial={{ opacity:0, scale:0.8, y:8 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.8, y:8 }}
                transition={{ duration:0.18 }}
              >
                {REACTIONS.map(r => (
                  <button key={r.id} className="reaction-btn" onClick={() => { handleReaction(r); setHoverLike(false) }} title={r.label}>
                    <span className="reaction-emoji">{r.emoji}</span>
                    <span className="reaction-label">{r.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className={`post-action-btn ${reaction ? 'post-action-btn--active' : ''}`}
            style={{ width:'100%', ...(reaction ? {color:reaction.color} : {}) }}
            onClick={() => reaction ? (setReaction(null), setLikeCount(c => Math.max(0,c-1))) : handleReaction(REACTIONS[0])}
          >
            {reaction ? <span>{reaction.emoji}</span> : <FontAwesomeIcon icon={faThumbsUpReg} />}
            <span>{reaction ? reaction.label : 'Like'}</span>
          </button>
        </div>

        {/* Comment */}
        <a href="#comments" style={{ flex:1 }}>
          <button className="post-action-btn" style={{ width:'100%' }}>
            <FontAwesomeIcon icon={faComment} /><span>Comment</span>
          </button>
        </a>

        {/* Save */}
        <button
          className={`post-action-btn ${saved ? 'post-action-btn--active' : ''}`}
          style={{ flex:1 }}
          onClick={onSave}
        >
          <FontAwesomeIcon icon={saved ? faBookmark : faBookmarkReg} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>

        {/* Share */}
        <button className="post-action-btn" style={{ flex:1 }} onClick={share}>
          <FontAwesomeIcon icon={faShareNodes} /><span>Share</span>
        </button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
function PostDetailContent() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const { user }    = useAuth()
  const { addToast } = useToastStore()

  const [post,    setPost]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [saved,   setSaved]   = useState(false)
  const [menuOpen,setMenuOpen] = useState(false)
  const [mediaIdx,setMediaIdx] = useState(0)

  useEffect(() => {
    setLoading(true)
    getPostBySlug(slug)
      .then(d => { if (!d) { setError('Post not found'); return } setPost(d) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!post?.id) return
    const viewerKey = user?.uid || getDeviceHash()
    trackContentView('post', post.id, viewerKey, !!user?.uid)
  }, [post?.id, user?.uid])

  useEffect(() => {
    if (!user?.uid || !post?.id) return
    getFeedSavedStatus(user.uid, 'post', post.id).then(s => setSaved(s?.saved ?? false))
  }, [user?.uid, post?.id])

  const handleSave = async () => {
    if (!user) { navigate('/login'); return }
    const next = !saved; setSaved(next)
    await toggleFeedSaved(user.uid, 'post', post.id).catch(() => setSaved(!next))
  }

  const copyLink = async () => {
    const url = `${window.location.origin}/posts/${slug}`
    await navigator.clipboard.writeText(url).catch(()=>{})
    addToast({ type:'success', title:'Copied!', message:'Link copied.' })
    setMenuOpen(false)
  }

  // Auto-scroll to comments if hash or state says so
  useEffect(() => {
    if (window.location.hash === '#comments') {
      setTimeout(() => {
        document.getElementById('comments')?.scrollIntoView({ behavior:'smooth' })
      }, 400)
    }
  }, [post])

  const canonicalURL = `${SITE_CONFIG.siteURL}/posts/${slug}`
  const mediaItems   = post?.media_items || []
  const imgItems     = mediaItems.filter(i => i.type === 'image' || !i.type?.includes('video'))
  const previewImgs  = imgItems.map(i => ({ url: i.url, alt: i.caption || '' }))

  if (loading) {
    return (
      <div style={{ paddingTop:'var(--navbar-h)' }}>
        <div className="post-detail-layout">
          <div style={{ background:'#000', minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:40, height:40, border:'3px solid var(--accent-primary)', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
          </div>
          <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'0.875rem' }}>
            {[0,1,2,3].map(i => <div key={i} className="sk" style={{ height:18, width:`${90-i*12}%`, borderRadius:8 }} />)}
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div style={{ paddingTop:'calc(var(--navbar-h) + 3rem)', textAlign:'center' }}>
        <p style={{ color:'var(--text-secondary)', marginBottom:16 }}>{error || 'Post not found'}</p>
        <button onClick={() => navigate('/feed')}
          style={{ padding:'0.5rem 1.25rem', borderRadius:99, background:'var(--accent-primary)', color:'#fff', border:'none', cursor:'pointer' }}>
          ← Back to Feed
        </button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{buildTitle(post.title || 'Post')}</title>
        <meta name="description" content={(post.content || '').slice(0, 160)} />
        {imgItems[0] && <meta property="og:image" content={imgItems[0].url} />}
        <meta property="og:url"  content={canonicalURL} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonicalURL} />
      </Helmet>

      <div style={{ paddingTop:'var(--navbar-h)' }}>
        <div className="post-detail-layout">

          {/* ── Left: media panel ───────────────────────────── */}
          <div className="post-detail-media-panel">
            {mediaItems.length > 0 ? (
              <MediaGrid items={mediaItems} inDetail={true} />
            ) : (
              <div style={{
                flex:1, display:'flex', alignItems:'center', justifyContent:'center',
                background:'linear-gradient(135deg, var(--bg-surface), var(--bg-surface-2))',
              }}>
                <div style={{ textAlign:'center', color:'var(--text-tertiary)' }}>
                  <div style={{ fontSize:'3rem', marginBottom:8, opacity:0.3 }}>📝</div>
                  <p style={{ fontSize:'0.8rem' }}>No media</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: info panel ───────────────────────────── */}
          <div className="post-detail-info-panel">
            <div style={{ padding:'1.25rem' }}>

              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  background:'none', border:'none', cursor:'pointer',
                  color:'var(--text-tertiary)', fontSize:'0.8rem', fontWeight:600,
                  marginBottom:'1rem', padding:0, transition:'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Feed
              </button>

              {/* ── Post header (Facebook-style) ───────────── */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', marginBottom:'1rem' }}>
                <button onClick={() => navigate('/about')}
                  style={{ width:44, height:44, borderRadius:'50%', overflow:'hidden', flexShrink:0,
                    background:'linear-gradient(135deg, var(--accent-primary), #818cf8)',
                    border:'none', cursor:'pointer', padding:0 }}>
                  <img src="/logo.webp" alt={SITE_CONFIG.owner.displayName}
                    style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={e => { e.currentTarget.style.display='none' }} />
                </button>

                <div style={{ flex:1, minWidth:0 }}>
                  <button onClick={() => navigate('/about')}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:0, textAlign:'left',
                      fontWeight:700, fontSize:'0.9375rem', color:'var(--text-primary)', transition:'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color='var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color=''}>
                    {SITE_CONFIG.owner.displayName}
                  </button>
                  <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:'0.75rem', color:'var(--text-tertiary)', marginTop:1 }}>
                    <span>{timeAgo(post.created_at)}</span>
                    <span>·</span>
                    <FontAwesomeIcon icon={faGlobe} style={{ fontSize:'0.65rem' }} />
                  </div>
                </div>

                {/* Three-dot menu */}
                <div style={{ position:'relative', flexShrink:0 }}>
                  <button
                    onClick={() => setMenuOpen(v => !v)}
                    style={{ width:34, height:34, borderRadius:'50%', background:'none', border:'none',
                      cursor:'pointer', color:'var(--text-tertiary)', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'1rem', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='var(--bg-surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background='none'}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div className="post-menu-panel"
                        initial={{ opacity:0, scale:0.92, y:-6 }}
                        animate={{ opacity:1, scale:1, y:0 }}
                        exit={{ opacity:0, scale:0.92, y:-6 }}
                        transition={{ duration:0.15 }}>
                        <button className="post-menu-item" onClick={copyLink}>
                          <FontAwesomeIcon icon={faLink} /> Copy link
                        </button>
                        <button className="post-menu-item" onClick={() => { navigate(`/posts/${slug}?report=1`); setMenuOpen(false) }}>
                          <FontAwesomeIcon icon={faFlag} /> Report
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Post text content (markdown) ────────────── */}
              {post.content && (
                <div style={{ marginBottom:'1rem' }}>
                  <MarkdownBody text={post.content} />
                </div>
              )}

              {/* ── Tags ──────────────────────────────────── */}
              {post.tags?.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem', marginBottom:'1rem' }}>
                  {post.tags.map(t => (
                    <Link key={t} to={`/feed?q=${encodeURIComponent(t)}`} className="tag-badge-clickable">
                      #{t}
                    </Link>
                  ))}
                </div>
              )}

              {/* ── Actions ──────────────────────────────── */}
              <div style={{ borderTop:'1px solid var(--border-color)', paddingTop:'0.25rem' }}>
                <ActionBar post={post} saved={saved} onSave={handleSave} />
              </div>

              {/* ── Comments ─────────────────────────────── */}
              <div id="comments" style={{ marginTop:'1.5rem' }}>
                <CommentSection contentType="post" contentId={post.id} autoFocus={window.location.hash==='#comments'} />
              </div>

              {/* ── Related posts ─────────────────────────── */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function PostDetailPage() {
  return (
    <VisibilityGuard page="posts">
      <PostDetailContent />
    </VisibilityGuard>
  )
}
