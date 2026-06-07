// BlogCard.jsx — v2.5.1
// LinkedIn-style article card for feed list

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
function fmtDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
}

export default function BlogCard({ item, index = 0 }) {
  const navigate = useNavigate()

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
      {/* Thumbnail */}
      {item.thumbnail_url
        ? <img src={item.thumbnail_url} alt={item.title} className="blog-card-thumb" loading="lazy" />
        : (
          <div className="blog-card-thumb-placeholder">
            <FontAwesomeIcon icon={faPenNib} />
          </div>
        )
      }

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
            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <FontAwesomeIcon icon={faTag} style={{ fontSize: '0.6rem' }} />
              {item.category}
            </span>
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
              <span key={t} style={{
                fontSize: '0.7rem', padding: '0.15rem 0.55rem',
                background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)', color: 'var(--text-tertiary)',
              }}>#{t}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="blog-card-footer">
          <time style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
            {fmtDate(item.created_at)}
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
