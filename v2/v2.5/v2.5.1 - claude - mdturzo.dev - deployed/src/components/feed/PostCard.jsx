// PostCard.jsx — v2.5.1
// Facebook-style social post card with media grid, reactions, actions

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbsUp, faComment, faShareNodes, faEllipsis,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg } from '@fortawesome/free-regular-svg-icons'
import MediaGrid from './MediaGrid.jsx'
import { SITE_CONFIG } from '../../config/site.config.js'

function fmt(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function timeAgo(s) {
  if (!s) return ''
  const diff = (Date.now() - new Date(s)) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const MAX_TEXT = 240

const variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
}

export default function PostCard({ item, index = 0 }) {
  const navigate  = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [mediaIdx, setMediaIdx] = useState(null)

  const text      = item.content || item.description || ''
  const needsTrunc = text.length > MAX_TEXT
  const displayText = (!expanded && needsTrunc) ? text.slice(0, MAX_TEXT) + '…' : text

  const goDetail = () => navigate(`/posts/${item.slug}`)

  const handleMediaClick = (i) => {
    // Navigate to detail with media index
    navigate(`/posts/${item.slug}`, { state: { mediaIndex: i } })
  }

  const mediaItems = item.media_items || []

  return (
    <motion.div
      className="post-card"
      variants={variants}
      initial="hidden"
      animate="show"
      transition={{ delay: Math.min(index * 0.06, 0.4) }}
    >
      {/* Header */}
      <div className="post-card-header">
        <div className="post-avatar">
          <img
            src="/logo.webp"
            alt="Muhtasim Rahman"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <span style={{ display: 'none' }}>M</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="post-author-name">{SITE_CONFIG.owner.displayName}</div>
          <div className="post-author-meta">
            <span>{SITE_CONFIG.owner.location}</span>
            <span>·</span>
            <span>{timeAgo(item.created_at)}</span>
            <span>·</span>
            <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '0.65rem' }} />
          </div>
        </div>
        {/* View post button */}
        <button
          onClick={goDetail}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-tertiary)', padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-md)', fontSize: '0.9rem',
          }}
          title="View post"
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>

      {/* Text content */}
      {text && (
        <>
          <div
            className={`post-card-text ${!expanded && needsTrunc ? 'truncated' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={goDetail}
          >
            {displayText}
          </div>
          {needsTrunc && (
            <button
              className="post-see-more"
              onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
        </>
      )}

      {/* Media grid — clickable to detail */}
      {mediaItems.length > 0 && (
        <div style={{ marginTop: text ? 0 : 0 }}>
          <MediaGrid items={mediaItems} onItemClick={handleMediaClick} />
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
            <span
              style={{ cursor: 'pointer' }}
              onClick={goDetail}
            >
              {fmt(item.comments_count)} comments
            </span>
          )}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-color)', margin: '0 1.125rem' }} />

      {/* Action buttons */}
      <div className="post-actions-row">
        <button className="post-action-btn" onClick={goDetail}>
          <FontAwesomeIcon icon={faThumbsUpReg} />
          <span>Like</span>
        </button>
        <button className="post-action-btn" onClick={goDetail}>
          <FontAwesomeIcon icon={faComment} />
          <span>Comment</span>
        </button>
        <button className="post-action-btn" onClick={goDetail}>
          <FontAwesomeIcon icon={faShareNodes} />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  )
}
