// FeedCard.jsx — v2.5.0
// Unified card for both Blogs (type='blog') and Posts (type='post').
// Supports grid + list layouts.
// Props: item (blog/post row), type ('blog'|'post'), view ('grid'|'list'), onClick

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenNib, faVideo, faThumbtack, faEye, faThumbsUp, faComment,
  faClock, faTag, faPlay,
} from '@fortawesome/free-solid-svg-icons'

// ── Helpers ──────────────────────────────────────────────────
function fmt(n) {
  if (!n && n !== 0) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function fmtDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Video thumbnail utils ─────────────────────────────────────
function getYtId(url) {
  const m = url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return m ? m[1] : null
}
function getYtThumb(url) {
  const id = getYtId(url)
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null
}

// ── Thumb image or placeholder ────────────────────────────────
function Thumb({ item, type, className = '' }) {
  const src = item.thumbnail_url || (type === 'post' ? getYtThumb(item.embed_url) : null)

  if (src) {
    return (
      <img
        src={src}
        alt={item.title}
        loading="lazy"
        draggable="false"
        className={`feed-card-thumb ${className}`}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
    )
  }

  return (
    <div className={`feed-card-thumb-placeholder ${className}`}>
      <FontAwesomeIcon
        icon={type === 'post' ? faPlay : faPenNib}
        className="opacity-30"
      />
    </div>
  )
}

// ── Type badge ────────────────────────────────────────────────
function TypeBadge({ type }) {
  return (
    <span className={`feed-type-badge ${type === 'blog' ? 'feed-type-blog' : 'feed-type-post'}`}>
      <FontAwesomeIcon icon={type === 'blog' ? faPenNib : faVideo} />
      {type === 'blog' ? 'Blog' : 'Post'}
    </span>
  )
}

// ── Main card ─────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

export default function FeedCard({ item, type, view = 'grid', index = 0 }) {
  const navigate = useNavigate()
  const href = type === 'blog' ? `/blogs/${item.slug}` : `/posts/${item.slug}`

  const handleClick = (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return
    e.preventDefault()
    navigate(href)
  }

  const isGrid = view === 'grid'

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`feed-card block no-underline ${!isGrid ? 'feed-card-list' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      transition={{ delay: Math.min(index * 0.045, 0.35) }}
      aria-label={`${type === 'blog' ? 'Blog' : 'Post'}: ${item.title}`}
    >
      {/* Thumbnail */}
      <Thumb item={item} type={type} />

      {/* Body */}
      <div className="feed-card-body">
        {/* Meta row */}
        <div className="feed-card-meta">
          <TypeBadge type={type} />
          {item.pinned && (
            <span className="feed-pinned-badge">
              <FontAwesomeIcon icon={faThumbtack} />
              Pinned
            </span>
          )}
          {item.category && (
            <span className="text-[0.7rem] text-[var(--text-tertiary)] flex items-center gap-1">
              <FontAwesomeIcon icon={faTag} className="text-[0.6rem]" />
              {item.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`feed-card-title ${isGrid ? 'lines-2' : 'lines-3'}`}>
          {item.title}
        </h3>

        {/* Description */}
        {item.short_description && (
          <p className="feed-card-desc">{item.short_description}</p>
        )}

        {/* Footer: date + stats */}
        <div className="feed-card-footer">
          <time className="text-[0.72rem] text-[var(--text-tertiary)]">
            {fmtDate(item.created_at)}
          </time>

          <div className="feed-card-stats">
            {(item.reading_time && type === 'blog') && (
              <span title="Reading time">
                <FontAwesomeIcon icon={faClock} />
                {item.reading_time} min
              </span>
            )}
            <span title="Views">
              <FontAwesomeIcon icon={faEye} />
              {fmt(item.views_count)}
            </span>
            <span title="Likes">
              <FontAwesomeIcon icon={faThumbsUp} />
              {fmt(item.likes_count)}
            </span>
            <span title="Comments">
              <FontAwesomeIcon icon={faComment} />
              {fmt(item.comments_count)}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
