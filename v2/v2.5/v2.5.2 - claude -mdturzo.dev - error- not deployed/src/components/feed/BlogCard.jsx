// BlogCard.jsx — v2.5.2
// Changes:
//  - Auto-extract thumbnail from HTML content if no explicit thumbnail_url
//  - No image? No thumbnail section (clean text-only card)
//  - Clickable tags → feed search
//  - Time ago from upload time (not fixed date)

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faEye, faClock, faThumbsUp, faComment, faThumbtack } from '@fortawesome/free-solid-svg-icons'

function fmt(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// Relative time from created_at
function timeAgo(s) {
  if (!s) return ''
  const d = (Date.now() - new Date(s)) / 1000
  if (d < 60)     return 'Just now'
  if (d < 3600)   return `${Math.floor(d / 60)}m ago`
  if (d < 86400)  return `${Math.floor(d / 3600)}h ago`
  if (d < 604800) return `${Math.floor(d / 86400)}d ago`
  if (d < 2592000) return `${Math.floor(d / 604800)}w ago`
  if (d < 31536000) return `${Math.floor(d / 2592000)}mo ago`
  return `${Math.floor(d / 31536000)}y ago`
}

// Extract first image URL from HTML content
function extractFirstImage(html) {
  if (!html) return null
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return m ? m[1] : null
}

const variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
}

export default function BlogCard({ item, index = 0, onTagClick }) {
  const navigate = useNavigate()

  // Resolve thumbnail: explicit → HTML content → null
  const thumbnail = useMemo(() => {
    if (item.thumbnail_url) return item.thumbnail_url
    return extractFirstImage(item.content)
  }, [item.thumbnail_url, item.content])

  const handleTagClick = (e, tag) => {
    e.preventDefault()
    e.stopPropagation()
    onTagClick?.(tag)
    navigate(`/feed?q=${encodeURIComponent(tag)}`)
  }

  return (
    <motion.a
      href={`/blogs/${item.slug}`}
      onClick={e => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigate(`/blogs/${item.slug}`) } }}
      className="blog-card"
      variants={variants}
      initial="hidden"
      animate="show"
      transition={{ delay: Math.min(index * 0.05, 0.35) }}
      aria-label={`Blog: ${item.title}`}
    >
      {/* Thumbnail — only shown if image exists */}
      {thumbnail && (
        <img src={thumbnail} alt={item.title} className="blog-card-thumb" loading="lazy" />
      )}

      <div className="blog-card-body">
        {/* Eyebrow */}
        <div className="blog-card-eyebrow">
          <span className="blog-card-badge">
            <FontAwesomeIcon icon={faPenNib} style={{ marginRight: 4 }} /> Blog
          </span>
          {item.pinned && (
            <span className="pinned-badge">
              <FontAwesomeIcon icon={faThumbtack} style={{ fontSize: '0.6rem', marginRight: 3 }} />
              Pinned
            </span>
          )}
          {item.category && (
            <button
              className="tag-badge-clickable"
              onClick={(e) => handleTagClick(e, item.category)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              title={`Search "${item.category}"`}
            >
              {item.category}
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="blog-card-title">{item.title}</h3>

        {/* Description */}
        {item.short_description && (
          <p className="blog-card-desc">{item.short_description}</p>
        )}

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.625rem' }}>
            {item.tags.slice(0, 4).map(t => (
              <button
                key={t}
                className="tag-badge-clickable"
                onClick={(e) => handleTagClick(e, t)}
                title={`Search "${t}"`}
              >
                #{t}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="blog-card-footer">
          <time style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
            {timeAgo(item.created_at)}
          </time>
          <div className="blog-card-stats">
            {item.reading_time && (
              <span><FontAwesomeIcon icon={faClock} />{item.reading_time} min</span>
            )}
            <span><FontAwesomeIcon icon={faEye} />{fmt(item.views_count)}</span>
            <span><FontAwesomeIcon icon={faThumbsUp} />{fmt(item.likes_count)}</span>
            <span><FontAwesomeIcon icon={faComment} />{fmt(item.comments_count)}</span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
