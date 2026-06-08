// BlogCard.jsx — v2.5.2
// LinkedIn-style article card for feed list
// - No thumbnail if no image attached
// - Clickable tags and category → feed search
// - Relative time display
// - First content image used as thumbnail fallback if needed

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faEye, faClock, faThumbsUp, faComment, faTag } from '@fortawesome/free-solid-svg-icons'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

function fmt(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function timeAgo(s) {
  if(!s) return ''
  const d = (Date.now()-new Date(s))/1000
  if(d<60) return 'just now'
  if(d<3600) return `${Math.floor(d/60)}m ago`
  if(d<86400) return `${Math.floor(d/3600)}h ago`
  if(d<604800) return `${Math.floor(d/86400)}d ago`
  if(d<2592000) return `${Math.floor(d/604800)}w ago`
  if(d<31536000) return `${Math.floor(d/2592000)}mo ago`
  return new Date(s).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
}

// Extract first image from HTML content
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

  // Get thumbnail: explicit > first content image > nothing
  const thumbnail = item.thumbnail_url || extractFirstImage(item.content)

  const handleTagClick = (e, tag) => {
    e.preventDefault()
    e.stopPropagation()
    onTagClick?.(tag)
  }

  const handleCategoryClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onTagClick?.(item.category)
  }

  return (
    <motion.a
      href={`/blogs/${item.slug}`}
      onClick={e => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigate(`/blogs/${item.slug}`) } }}
      className="blog-card"
      variants={variants}
      initial="hidden"
      animate="show"
      transition={{ delay: Math.min(index * 0.06, 0.4) }}
      aria-label={`Blog: ${item.title}`}
    >
      {/* Thumbnail — only if image available */}
      {thumbnail && (
        <img src={thumbnail} alt={item.title} className="blog-card-thumb" loading="lazy" />
      )}

      <div className="blog-card-body">
        {/* Eyebrow */}
        <div className="blog-card-eyebrow">
          <span className="blog-card-badge">
            <FontAwesomeIcon icon={faPenNib} /> Blog
          </span>
          {item.pinned && (
            <span className="pinned-badge">
              <FontAwesomeIcon icon={faThumbtack} style={{ fontSize: '0.6rem', marginRight: 3 }} />
              Pinned
            </span>
          )}
          {item.category && (
            <button
              onClick={handleCategoryClick}
              style={{
                fontSize: '0.72rem', color: 'var(--text-tertiary)',
                display: 'flex', alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '' }}
            >
              <FontAwesomeIcon icon={faTag} style={{ fontSize: '0.6rem' }} />
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

        {/* Tags (clickable) */}
        {item.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.625rem' }}>
            {item.tags.slice(0, 4).map(t => (
              <button
                key={t}
                onClick={(e) => handleTagClick(e, t)}
                style={{
                  fontSize: '0.7rem', padding: '0.15rem 0.55rem',
                  background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)', color: 'var(--text-tertiary)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '' }}
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
