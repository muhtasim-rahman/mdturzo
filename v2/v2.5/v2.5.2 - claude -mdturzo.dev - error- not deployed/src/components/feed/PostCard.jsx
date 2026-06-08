// PostCard.jsx — v2.5.2 (complete redesign)
// Facebook-style post card: markdown content, reaction popup, three-dot menu,
// proper clickable areas, image preview, time-ago counter.

import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobe, faEllipsis, faComment, faShareNodes,
  faLink, faFlag, faCheck, faThumbsUp,
  faHeart, faFaceGrinSquint, faFaceSurprise, faFaceSadTear, faFaceAngry,
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faBookmark as faBookmarkReg } from '@fortawesome/free-regular-svg-icons'
import { useToastStore } from '../../store/toastStore.js'
import { SITE_CONFIG } from '../../config/site.config.js'
import MediaGrid from './MediaGrid.jsx'

// ── Helpers ────────────────────────────────────────────────────
function fmt(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function timeAgo(s) {
  if (!s) return ''
  const d = (Date.now() - new Date(s)) / 1000
  if (d < 60)     return 'Just now'
  if (d < 3600)   return `${Math.floor(d / 60)}m ago`
  if (d < 86400)  return `${Math.floor(d / 3600)}h ago`
  if (d < 604800) return `${Math.floor(d / 86400)}d ago`
  if (d < 2592000) return `${Math.floor(d / 604800)}w ago`
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Lightweight Markdown renderer ────────────────────────────
// Supports: **bold**, *italic*, __underline__, [link](url), # headings, line breaks
function parseMarkdown(text) {
  if (!text) return []
  const lines = text.split('\n')
  const result = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const h4  = raw.match(/^#### (.+)/)
    const h3  = raw.match(/^### (.+)/)
    const h2  = raw.match(/^## (.+)/)
    const h1  = raw.match(/^# (.+)/)

    if (h1) { result.push({ type: 'h1', text: h1[1] }); continue }
    if (h2) { result.push({ type: 'h2', text: h2[1] }); continue }
    if (h3) { result.push({ type: 'h3', text: h3[1] }); continue }
    if (h4) { result.push({ type: 'h4', text: h4[1] }); continue }

    if (raw.trim() === '') { result.push({ type: 'br' }); continue }
    result.push({ type: 'p', text: raw })
  }
  return result
}

// Inline markdown: **bold**, *italic*, __underline__, [text](url), `code`
function renderInline(text) {
  if (!text) return null
  const parts = []
  let remaining = text
  let key = 0

  const patterns = [
    { regex: /\*\*(.+?)\*\*/,   render: (m) => <strong key={key++}>{m[1]}</strong> },
    { regex: /\*(.+?)\*/,       render: (m) => <em key={key++}>{m[1]}</em> },
    { regex: /__(.+?)__/,       render: (m) => <u key={key++}>{m[1]}</u> },
    { regex: /`(.+?)`/,         render: (m) => <code key={key++} style={{ background:'var(--bg-surface-2)', padding:'1px 5px', borderRadius:4, fontSize:'0.88em', fontFamily:'var(--font-mono)' }}>{m[1]}</code> },
    { regex: /\[(.+?)\]\((.+?)\)/, render: (m) => <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent-primary)', textDecoration:'underline' }}>{m[1]}</a> },
  ]

  // Simple character-by-character pass
  let i = 0
  const chars = []
  while (remaining.length > 0) {
    let matched = false
    for (const { regex, render } of patterns) {
      const m = remaining.match(regex)
      if (m && m.index === 0) {
        if (chars.length) { parts.push(chars.join('')); chars.length = 0 }
        parts.push(render(m))
        remaining = remaining.slice(m[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      chars.push(remaining[0])
      remaining = remaining.slice(1)
    }
    if (i++ > 10000) break // safety
  }
  if (chars.length) parts.push(chars.join(''))
  return parts
}

function MarkdownContent({ text, expanded, maxLines = 4 }) {
  const tokens = parseMarkdown(text)
  if (!tokens.length) return null

  return (
    <div className={`post-markdown ${!expanded ? 'md-clamp' : ''}`}
      style={{ '--clamp-lines': maxLines }}>
      {tokens.map((tok, i) => {
        if (tok.type === 'br') return <div key={i} style={{ height: '0.5em' }} />
        const Tag = tok.type === 'h1' ? 'h2'
                  : tok.type === 'h2' ? 'h3'
                  : tok.type === 'h3' ? 'h4'
                  : tok.type === 'h4' ? 'h5' : 'p'
        const extraStyle = tok.type !== 'p' && tok.type !== 'br' ? {
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontSize: tok.type === 'h1' ? '1.1rem' : tok.type === 'h2' ? '1.05rem' : '1rem',
          margin: '0.4em 0 0.2em',
        } : {}
        return <Tag key={i} style={extraStyle}>{renderInline(tok.text)}</Tag>
      })}
    </div>
  )
}

// ── Reaction popup ─────────────────────────────────────────────
const REACTIONS = [
  { id: 'like',      icon: faThumbsUp,      label: 'Like',    color: '#3b82f6', emoji: '👍' },
  { id: 'love',      icon: faHeart,         label: 'Love',    color: '#ef4444', emoji: '❤️' },
  { id: 'haha',      icon: faFaceGrinSquint,label: 'Haha',    color: '#f59e0b', emoji: '😂' },
  { id: 'wow',       icon: faFaceSurprise,  label: 'Wow',     color: '#8b5cf6', emoji: '😮' },
  { id: 'sad',       icon: faFaceSadTear,   label: 'Sad',     color: '#06b6d4', emoji: '😢' },
  { id: 'angry',     icon: faFaceAngry,     label: 'Angry',   color: '#ef4444', emoji: '😡' },
]

function ReactionPopup({ onSelect, onClose }) {
  return (
    <motion.div
      className="reaction-popup"
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 8 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {REACTIONS.map(r => (
        <button
          key={r.id}
          className="reaction-btn"
          onClick={() => { onSelect(r); onClose() }}
          title={r.label}
        >
          <span className="reaction-emoji">{r.emoji}</span>
          <span className="reaction-label">{r.label}</span>
        </button>
      ))}
    </motion.div>
  )
}

// ── Three-dot menu ─────────────────────────────────────────────
function ThreeDotMenu({ slug, onClose }) {
  const { addToast } = useToastStore()
  const navigate = useNavigate()

  const copyLink = async () => {
    const url = `${window.location.origin}/posts/${slug}`
    try {
      await navigator.clipboard.writeText(url)
      addToast({ type: 'success', title: 'Copied!', message: 'Link copied to clipboard.' })
    } catch {
      addToast({ type: 'error', title: 'Failed', message: 'Could not copy link.' })
    }
    onClose()
  }

  const items = [
    { label: 'Copy link',  icon: faLink, action: copyLink },
    { label: 'Report',     icon: faFlag, action: () => { navigate(`/posts/${slug}?report=1`); onClose() } },
  ]

  return (
    <motion.div
      className="post-menu-panel"
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -6 }}
      transition={{ duration: 0.15 }}
    >
      {items.map(item => (
        <button key={item.label} className="post-menu-item" onClick={item.action}>
          <FontAwesomeIcon icon={item.icon} />
          {item.label}
        </button>
      ))}
    </motion.div>
  )
}

// ── Main PostCard ──────────────────────────────────────────────
const MAX_TEXT_LINES = 4

export default function PostCard({ item, index = 0 }) {
  const navigate = useNavigate()
  const { addToast } = useToastStore()

  const [expanded,   setExpanded]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [hoverLike,  setHoverLike]  = useState(false)
  const [reaction,   setReaction]   = useState(null) // selected reaction
  const [likeCount,  setLikeCount]  = useState(item.likes_count || 0)
  const menuRef   = useRef(null)
  const hoverTimer = useRef(null)

  const text       = item.content || ''
  const mediaItems = item.media_items || []
  const goDetail   = () => navigate(`/posts/${item.slug}`)
  const goProfile  = () => navigate('/about')  // @admin → /about for now
  const goComment  = () => navigate(`/posts/${item.slug}#comments`)

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const h = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [menuOpen])

  // Like hover → show reactions after 0.5s
  const onLikeMouseEnter = () => { hoverTimer.current = setTimeout(() => setHoverLike(true), 500) }
  const onLikeMouseLeave = () => {
    clearTimeout(hoverTimer.current)
    // small delay before hiding so user can reach the popup
    setTimeout(() => setHoverLike(false), 300)
  }

  const handleReaction = (r) => {
    if (reaction?.id === r.id) {
      setReaction(null)
      setLikeCount(c => Math.max(0, c - 1))
    } else {
      if (!reaction) setLikeCount(c => c + 1)
      setReaction(r)
    }
    addToast({ type: 'info', title: 'Login required', message: 'Sign in to react to posts.' })
  }

  const variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.35) } },
  }

  return (
    <motion.div className="post-card" variants={variants} initial="hidden" animate="show">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="post-card-header" style={{ cursor: 'pointer' }} onClick={goDetail}>
        <button
          className="post-avatar"
          onClick={(e) => { e.stopPropagation(); goProfile() }}
          title="View profile"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src="/logo.webp" alt="Muhtasim Rahman" onError={e => { e.currentTarget.style.display = 'none' }} />
        </button>

        <div style={{ flex: 1, cursor: 'pointer' }}>
          <button
            className="post-author-name"
            onClick={(e) => { e.stopPropagation(); goProfile() }}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
          >
            {SITE_CONFIG.owner.displayName}
          </button>
          <div className="post-author-meta">
            <span>Developer</span>
            <span>·</span>
            <span>{timeAgo(item.created_at)}</span>
            <span>·</span>
            <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '0.65rem' }} />
          </div>
        </div>

        {/* Three-dot menu */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            className="post-menu-trigger"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v) }}
            title="More options"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <ThreeDotMenu slug={item.slug} onClose={() => setMenuOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Text content (markdown) ──────────────────────────── */}
      {text && (
        <div className="post-card-text-wrap">
          <MarkdownContent text={text} expanded={expanded} maxLines={MAX_TEXT_LINES} />
          {text.split('\n').length > MAX_TEXT_LINES || text.length > 320 ? (
            <button
              className="post-see-more"
              onClick={(e) => { e.stopPropagation(); setExpanded(v => !v) }}
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          ) : null}
        </div>
      )}

      {/* ── Media grid ──────────────────────────────────────── */}
      {mediaItems.length > 0 && (
        <MediaGrid
          items={mediaItems}
          onItemClick={(i) => navigate(`/posts/${item.slug}`, { state: { mediaIndex: i } })}
        />
      )}

      {/* ── Stats row ───────────────────────────────────────── */}
      {(likeCount > 0 || item.comments_count > 0) && (
        <div className="post-stats-row">
          <div className="post-stats-left">
            {likeCount > 0 && (
              <>
                <div className="react-icons-group">
                  {reaction
                    ? <span style={{ fontSize: '1rem' }}>{reaction.emoji}</span>
                    : <><div className="react-icon" style={{ background: '#3b82f6' }}>👍</div>
                       <div className="react-icon" style={{ background: '#ef4444' }}>❤️</div></>
                  }
                </div>
                <span>{fmt(likeCount)}</span>
              </>
            )}
          </div>
          {item.comments_count > 0 && (
            <button
              className="post-stats-comments"
              onClick={goComment}
            >
              {fmt(item.comments_count)} comments
            </button>
          )}
        </div>
      )}

      {/* ── Divider ─────────────────────────────────────────── */}
      <div style={{ height: 1, background: 'var(--border-color)', margin: '0 1rem' }} />

      {/* ── Action buttons ──────────────────────────────────── */}
      <div className="post-actions-row">
        {/* Like with reaction popup */}
        <div
          className="post-action-like-wrap"
          onMouseEnter={onLikeMouseEnter}
          onMouseLeave={onLikeMouseLeave}
        >
          <AnimatePresence>
            {hoverLike && (
              <ReactionPopup
                onSelect={handleReaction}
                onClose={() => setHoverLike(false)}
              />
            )}
          </AnimatePresence>
          <button
            className={`post-action-btn ${reaction ? 'post-action-btn--active' : ''}`}
            onClick={() => {
              if (!reaction) {
                handleReaction(REACTIONS[0])
              } else {
                setReaction(null)
                setLikeCount(c => Math.max(0, c - 1))
              }
            }}
            style={reaction ? { color: reaction.color } : {}}
          >
            {reaction
              ? <span style={{ fontSize: '1rem' }}>{reaction.emoji}</span>
              : <FontAwesomeIcon icon={faThumbsUpReg} />
            }
            <span>{reaction ? reaction.label : 'Like'}</span>
          </button>
        </div>

        {/* Comment — goes to detail page comment section */}
        <button
          className="post-action-btn"
          onClick={goComment}
        >
          <FontAwesomeIcon icon={faComment} />
          <span>Comment</span>
        </button>

        {/* Share */}
        <button
          className="post-action-btn"
          onClick={async () => {
            const url = `${window.location.origin}/posts/${item.slug}`
            if (navigator.share) {
              try { await navigator.share({ title: item.title || 'Post', url }) } catch {}
            } else {
              await navigator.clipboard.writeText(url).catch(() => {})
              addToast({ type: 'success', title: 'Copied!', message: 'Link copied.' })
            }
          }}
        >
          <FontAwesomeIcon icon={faShareNodes} />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  )
}
