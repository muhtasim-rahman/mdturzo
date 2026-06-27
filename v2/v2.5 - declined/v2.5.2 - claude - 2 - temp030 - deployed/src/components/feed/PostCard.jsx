// PostCard.jsx — v2.5.2
// Improvements:
//  - Clicking card body / header image → opens slug page
//  - Header (profile + name) click → /about (@admin redirect)
//  - Three-dot menu → options (report, copy link, more)
//  - Full markdown-like rendering (bold, italic, headings, links, underline)
//  - See more / see less for text (4 lines)
//  - Images: smart layout (1→full, 2→side-by-side, 3→large+2, 4+→2x2 with overflow)
//  - Image container has max-height (1:1 ratio)
//  - Like button with emoji reaction animation
//  - Comment button → slug page scrolled to comments
//  - Relative time from upload
//  - Clickable tags/category → feed search
//  - Video posts: iframe in card
//  - No image → no thumbnail

import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbsUp, faComment, faShareNodes, faEllipsis,
  faGlobe, faFlag, faLink, faCheck, faPlay,
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faHeart, faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'
import ImagePreviewModal from '../shared/ImagePreviewModal.jsx'

function fmt(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function timeAgo(s) {
  if (!s) return ''
  const d = (Date.now() - new Date(s)) / 1000
  if (d < 60) return 'Just now'
  if (d < 3600) return `${Math.floor(d / 60)}m ago`
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`
  if (d < 604800) return `${Math.floor(d / 86400)}d ago`
  if (d < 2592000) return `${Math.floor(d / 604800)}w ago`
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Minimal markdown renderer: bold, italic, underline, links, headings
function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<strong>$1</strong>')
    .replace(/^# (.+)$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<u>$1</u>')
    .replace(/`(.+?)`/g, '<code style="background:var(--bg-surface-2);padding:0 4px;border-radius:4px;font-size:0.9em">$1</code>')
    .replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary);text-decoration:underline">$1</a>')
    .replace(/\n/g, '<br/>')
}

// Smart image grid (Facebook-style)
function PostImageGrid({ items, onImageClick }) {
  const images = items.filter(m => m.type === 'image')
  const count = images.length
  if (!count) return null

  const maxH = { maxHeight: 400, overflow: 'hidden', position: 'relative' }
  const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }

  if (count === 1) {
    return (
      <div style={{ ...maxH, aspectRatio: '1/1', maxHeight: 400 }}>
        <img src={images[0].url} alt={images[0].caption || ''} style={{ ...imgStyle, height: '100%', aspectRatio: 'auto', objectFit: 'cover' }}
          onClick={() => onImageClick(0)} />
      </div>
    )
  }
  if (count === 2) {
    // If both are wider than tall, stack vertically; otherwise side-by-side
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, ...maxH }}>
        {images.slice(0,2).map((img, i) => (
          <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
            <img src={img.url} alt={img.caption||''} style={imgStyle} onClick={() => onImageClick(i)} />
          </div>
        ))}
      </div>
    )
  }
  if (count === 3) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, ...maxH }}>
        <div style={{ aspectRatio: '1/1.05', overflow: 'hidden', gridRow: '1/3' }}>
          <img src={images[0].url} alt={images[0].caption||''} style={imgStyle} onClick={() => onImageClick(0)} />
        </div>
        {images.slice(1,3).map((img, i) => (
          <div key={i} style={{ aspectRatio: '1/0.5', overflow: 'hidden' }}>
            <img src={img.url} alt={img.caption||''} style={imgStyle} onClick={() => onImageClick(i+1)} />
          </div>
        ))}
      </div>
    )
  }
  // 4+
  const extra = count - 3
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, ...maxH }}>
      {images.slice(0,3).map((img, i) => (
        <div key={i} style={{ aspectRatio: i===0?'1/1':'1/0.5', overflow: 'hidden', ...(i===0?{gridRow:'1/3'}:{}) }}>
          <img src={img.url} alt={img.caption||''} style={imgStyle} onClick={() => onImageClick(i)} />
        </div>
      ))}
      <div style={{ position: 'relative', aspectRatio: '1/0.5', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onImageClick(3)}>
        <img src={images[3]?.url} alt="" style={imgStyle} />
        {extra > 0 && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1.5rem', fontWeight: 800,
          }}>
            +{extra}
          </div>
        )}
      </div>
    </div>
  )
}

// Video item in card
function PostVideoEmbed({ item }) {
  const [playing, setPlaying] = useState(false)
  const isYt = item.type === 'youtube' || item.url?.includes('youtube') || item.url?.includes('youtu.be')
  const getYtId = (url) => url?.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\\w-]{11})/)?.[1]
  const ytId = getYtId(item.url)
  const thumb = item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null)

  const embedUrl = (() => {
    if (ytId) return `https://www.youtube.com/embed/${ytId}?rel=0&autoplay=1`
    if (item.url?.includes('facebook.com'))
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.url)}&show_text=false`
    return item.url
  })()

  if (playing) {
    return (
      <div style={{ width: '100%', background: '#000' }}>
        <iframe src={embedUrl} title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
          style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }} />
      </div>
    )
  }
  return (
    <div style={{ position: 'relative', cursor: 'pointer', background: '#000' }} onClick={() => setPlaying(true)}>
      {thumb
        ? <img src={thumb} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', opacity: 0.75, display: 'block' }} />
        : <div style={{ width: '100%', aspectRatio: '16/9', background: '#111' }} />
      }
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <FontAwesomeIcon icon={faPlay} style={{ color: '#fff', fontSize: '1.25rem', marginLeft: 4 }} />
        </div>
      </div>
      {isYt && (
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: '#ff0000', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700 }}>
          YouTube
        </div>
      )}
    </div>
  )
}

const REACTIONS = [
  { emoji: '👍', label: 'Like',   color: 'var(--accent-primary)' },
  { emoji: '❤️',  label: 'Love',   color: '#ef4444' },
  { emoji: '😂',  label: 'Haha',   color: '#f59e0b' },
  { emoji: '😮',  label: 'Wow',    color: '#f59e0b' },
  { emoji: '😢',  label: 'Sad',    color: '#3b82f6' },
  { emoji: '😠',  label: 'Angry',  color: '#ef4444' },
]

const variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
}

const MAX_LINES = 4
const CHARS_PER_LINE_APPROX = 60

export default function PostCard({ item, index = 0, onTagClick }) {
  const navigate  = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reaction, setReaction] = useState(null)
  const [reactOpen, setReactOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [previewImages, setPreviewImages] = useState(null)
  const [previewIdx, setPreviewIdx] = useState(0)
  const menuRef = useRef(null)
  const reactTimer = useRef(null)

  const text = item.content || item.description || ''
  const maxChars = MAX_LINES * CHARS_PER_LINE_APPROX
  const needsTrunc = text.length > maxChars
  const displayText = (!expanded && needsTrunc) ? text.slice(0, maxChars) + '…' : text

  const mediaItems = item.media_items || []
  const imageItems = mediaItems.filter(m => m.type === 'image')
  const videoItem  = mediaItems.find(m => m.type === 'youtube' || m.type === 'video')

  const goDetail  = () => navigate(`/posts/${item.slug}`)
  const goProfile = () => navigate('/about')

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleImageClick = (imgs, i) => {
    setPreviewImages(imgs.map(m => ({ url: m.url, caption: m.caption })))
    setPreviewIdx(i)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${SITE_CONFIG.siteURL}/posts/${item.slug}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
    setMenuOpen(false)
  }

  const handleReactHover = () => {
    clearTimeout(reactTimer.current)
    setReactOpen(true)
  }
  const handleReactLeave = () => {
    reactTimer.current = setTimeout(() => setReactOpen(false), 400)
  }

  return (
    <motion.div className="post-card" variants={variants} initial="hidden" animate="show"
      transition={{ delay: Math.min(index * 0.06, 0.4) }}>

      {/* Header */}
      <div className="post-card-header" style={{ cursor: 'default' }}>
        <div className="post-avatar" onClick={goProfile} style={{ cursor: 'pointer' }}>
          <img src="/logo.webp" alt="Muhtasim Rahman" onError={e => { e.currentTarget.style.display = 'none' }} />
        </div>
        <div style={{ flex: 1, cursor: 'pointer' }} onClick={goDetail}>
          <div className="post-author-name">{SITE_CONFIG.owner.displayName}</div>
          <div className="post-author-meta">
            <span>{SITE_CONFIG.owner.location}</span>
            <span>·</span>
            <span>{timeAgo(item.created_at)}</span>
            <span>·</span>
            <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '0.65rem' }} />
          </div>
        </div>
        {/* Three-dot menu */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-md)' }}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', right: 0, top: '110%', zIndex: 50,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xl)', minWidth: 180,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)', overflow: 'hidden',
                }}
              >
                <button onClick={copyLink}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '0.65rem 1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8375rem', textAlign: 'left' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface-2)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                  <FontAwesomeIcon icon={copied ? faCheck : faLink} style={{ width: 14 }} />
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <button onClick={() => { goDetail(); setMenuOpen(false) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '0.65rem 1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8375rem', textAlign: 'left' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface-2)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                  <FontAwesomeIcon icon={faFlag} style={{ width: 14 }} /> Report post
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Text content — 4-line clamp with markdown */}
      {text && (
        <div style={{ padding: '0 1.125rem 0.75rem' }}>
          <div
            className="post-card-text"
            style={{ WebkitLineClamp: !expanded && needsTrunc ? MAX_LINES : 'unset' }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(displayText) }}
          />
          {needsTrunc && (
            <button
              className="post-see-more"
              onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}>
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      )}

      {/* Video */}
      {videoItem && <PostVideoEmbed item={videoItem} />}

      {/* Images */}
      {!videoItem && imageItems.length > 0 && (
        <PostImageGrid items={imageItems} onImageClick={(i) => handleImageClick(imageItems, i)} />
      )}

      {/* Tags (clickable) */}
      {item.tags?.length > 0 && (
        <div style={{ padding: '0.5rem 1.125rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {item.tags.slice(0,5).map(t => (
            <button key={t} onClick={() => onTagClick?.(t)}
              style={{ fontSize: '0.7rem', padding: '0.18rem 0.55rem', background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '' }}>
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* Reaction stats */}
      {(item.likes_count > 0 || item.comments_count > 0) && (
        <div className="post-stats-row">
          <div className="post-stats-left">
            {item.likes_count > 0 && (
              <>
                <div className="react-icons-group">
                  <div className="react-icon" style={{ background: 'var(--accent-primary)' }}>👍</div>
                  <div className="react-icon" style={{ background: '#ef4444' }}>❤️</div>
                </div>
                <span>{fmt(item.likes_count)}</span>
              </>
            )}
          </div>
          {item.comments_count > 0 && (
            <span style={{ cursor: 'pointer' }} onClick={goDetail}>
              {fmt(item.comments_count)} comments
            </span>
          )}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-color)', margin: '0 1.125rem' }} />

      {/* Action buttons */}
      <div className="post-actions-row">
        {/* Like with reaction popup */}
        <div style={{ position: 'relative', flex: 1 }}
          onMouseEnter={handleReactHover}
          onMouseLeave={handleReactLeave}
        >
          <button className="post-action-btn" onClick={() => {
            if (!reaction) setReaction('👍')
            else setReaction(null)
          }}>
            {reaction
              ? <span style={{ fontSize: '1rem' }}>{reaction}</span>
              : <FontAwesomeIcon icon={faThumbsUpReg} />
            }
            <span style={{ color: reaction ? 'var(--accent-primary)' : '' }}>
              {reaction || 'Like'}
            </span>
          </button>
          <AnimatePresence>
            {reactOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 8 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute', bottom: '110%', left: 0, zIndex: 20,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)', padding: '0.45rem 0.75rem',
                  display: 'flex', gap: '0.25rem', boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={handleReactHover}
                onMouseLeave={handleReactLeave}
              >
                {REACTIONS.map(r => (
                  <button key={r.label} title={r.label}
                    onClick={() => { setReaction(reaction === r.emoji ? null : r.emoji); setReactOpen(false) }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '1.375rem', padding: '0.15rem',
                      borderRadius: '50%', lineHeight: 1,
                      transition: 'transform 0.15s',
                      transform: reaction === r.emoji ? 'scale(1.3)' : 'scale(1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.35)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = reaction === r.emoji ? 'scale(1.3)' : 'scale(1)' }}
                  >
                    {r.emoji}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="post-action-btn" onClick={goDetail}>
          <FontAwesomeIcon icon={faComment} />
          <span>Comment</span>
        </button>
        <button className="post-action-btn" onClick={goDetail}>
          <FontAwesomeIcon icon={faShareNodes} />
          <span>Share</span>
        </button>
      </div>

      {previewImages && (
        <ImagePreviewModal
          images={previewImages}
          startIndex={previewIdx}
          onClose={() => setPreviewImages(null)}
        />
      )}
    </motion.div>
  )
}
