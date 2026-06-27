// ============================================================
// ProjectCard.jsx — v2.4.0
// Reusable card: grid variant (default) + list variant
// Used in: Projects page list, Home featured section
// ============================================================

import { useState } from 'react'
import { Link }     from 'react-router-dom'
import { motion }   from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faArrowRight,
  faFolderOpen,
  faTag,
  faEye,
  faHeart,
  faCalendarAlt,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons'

// ── Color map ─────────────────────────────────────────────────
export const CAT_COLORS = {
  'Web App':      '#3B82F6',
  'Web Application':'#3B82F6',
  'PWA':          '#6366F1',
  'Utility':      '#10B981',
  'Education':    '#F59E0B',
  'Educational':  '#F59E0B',
  'UI Component': '#EC4899',
  'Dev Tool':     '#A855F7',
  'Developer Tool':'#A855F7',
  'Library':      '#8B5CF6',
  'Islamic':      '#06B6D4',
  'Portfolio':    '#0EA5E9',
  'Design':       '#F97316',
  'Institution':  '#14B8A6',
  'default':      '#64748B',
}

export function getAccentColor(project) {
  return project.accent ?? CAT_COLORS[project.category] ?? CAT_COLORS.default
}

// ── Grid Card ─────────────────────────────────────────────────
function GridCard({ p, i, compact }) {
  const color = getAccentColor(p)
  const [hovered, setHovered] = useState(false)

  const formattedDate = p.created_at
    ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null

  return (
    <motion.div
      className="pjc-grid"
      style={{ '--c': color, borderColor: hovered ? color : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.4, delay: i * 0.06 }}>

      {/* Thumbnail */}
      <div className="pjc-thumb">
        {p.thumbnail_url
          ? <img src={p.thumbnail_url} alt={p.title} className="pjc-thumb-img" loading="lazy"/>
          : <div className="pjc-thumb-fallback" style={{ background: `linear-gradient(135deg,${color}20,${color}06)` }}>
              <FontAwesomeIcon icon={faFolderOpen} style={{ color: `${color}60`, fontSize: '2rem' }}/>
            </div>
        }

        {/* Category badge */}
        <span className="pjc-cat-badge" style={{ background: `${color}22`, color, border: `1px solid ${color}35` }}>
          {p.category}
        </span>

        {/* External link icons (hover) */}
        <div className="pjc-ext-links">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} className="pjc-ext-btn" data-tooltip="GitHub">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} className="pjc-ext-btn" data-tooltip="Live">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="pjc-body">
        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="pjc-tags">
            {p.tags.slice(0, 3).map(t => (
              <span key={t} className="pjc-tag">
                <FontAwesomeIcon icon={faTag} className="pjc-tag-icon"/>
                {t}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="pjc-tag">+{p.tags.length - 3}</span>
            )}
          </div>
        )}

        <h3 className="pjc-title">{p.title}</h3>
        <p className="pjc-desc">{p.short_description}</p>

        {/* Stats row */}
        {!compact && (p.views_count > 0 || formattedDate) && (
          <div className="pjc-meta">
            {p.views_count > 0 && (
              <span className="pjc-meta-item">
                <FontAwesomeIcon icon={faEye}/>
                {p.views_count.toLocaleString()}
              </span>
            )}
            {p.likes_count > 0 && (
              <span className="pjc-meta-item">
                <FontAwesomeIcon icon={faHeart}/>
                {p.likes_count}
              </span>
            )}
            {formattedDate && (
              <span className="pjc-meta-item">
                <FontAwesomeIcon icon={faCalendarAlt}/>
                {formattedDate}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pjc-footer" style={{ '--c': color }}>
          <span className="pjc-footer-label">
            <span className="pjc-footer-dot"/>
            {p.category}
          </span>
          <span className="pjc-footer-cta">
            View details
            <FontAwesomeIcon icon={faArrowRight} className="pjc-footer-arrow"/>
          </span>
        </div>
      </div>

      {/* Full-card link overlay */}
      <Link to={`/projects/${p.slug}`} className="pjc-overlay" aria-label={`View ${p.title}`}/>
    </motion.div>
  )
}

// ── List Card ─────────────────────────────────────────────────
function ListCard({ p, i }) {
  const color = getAccentColor(p)

  const formattedDate = p.created_at
    ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null

  return (
    <motion.div
      className="pjc-list"
      style={{ '--c': color }}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.38, delay: i * 0.05 }}>

      {/* Thumbnail */}
      <div className="pjc-list-thumb">
        {p.thumbnail_url
          ? <img src={p.thumbnail_url} alt={p.title} className="pjc-list-thumb-img" loading="lazy"/>
          : <div className="pjc-list-thumb-fallback" style={{ background: `linear-gradient(135deg,${color}20,${color}06)` }}>
              <FontAwesomeIcon icon={faFolderOpen} style={{ color: `${color}55`, fontSize: '1.6rem' }}/>
            </div>
        }
      </div>

      {/* Content */}
      <div className="pjc-list-content">
        <div className="pjc-list-header">
          <div className="pjc-list-meta-row">
            {p.category && (
              <span className="pjc-list-cat" style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
                {p.category}
              </span>
            )}
            {formattedDate && (
              <span className="pjc-list-date">
                <FontAwesomeIcon icon={faCalendarAlt}/> {formattedDate}
              </span>
            )}
          </div>
          <h3 className="pjc-list-title">{p.title}</h3>
          <p className="pjc-list-desc">{p.short_description}</p>
        </div>

        <div className="pjc-list-footer">
          {/* Tags */}
          {p.tags?.length > 0 && (
            <div className="pjc-list-tags">
              {p.tags.slice(0, 4).map(t => (
                <span key={t} className="pjc-tag">{t}</span>
              ))}
              {p.tags.length > 4 && <span className="pjc-tag">+{p.tags.length - 4}</span>}
            </div>
          )}

          <div className="pjc-list-actions">
            {/* Stats */}
            <div className="pjc-list-stats">
              {p.views_count > 0 && <span className="pjc-meta-item"><FontAwesomeIcon icon={faEye}/>{p.views_count}</span>}
              {p.likes_count > 0 && <span className="pjc-meta-item"><FontAwesomeIcon icon={faHeart}/>{p.likes_count}</span>}
            </div>
            {/* External links */}
            <div className="pjc-list-links">
              {p.github_link && (
                <a href={p.github_link} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()} className="pjc-list-link-btn"
                  data-tooltip="GitHub">
                  <FontAwesomeIcon icon={faGithub}/>
                </a>
              )}
              {p.live_link && (
                <a href={p.live_link} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()} className="pjc-list-link-btn"
                  data-tooltip="Live demo">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Left accent line */}
      <div className="pjc-list-accent" style={{ background: color }}/>

      {/* Full card link */}
      <Link to={`/projects/${p.slug}`} className="pjc-overlay" aria-label={`View ${p.title}`}/>
    </motion.div>
  )
}

// ── Export ────────────────────────────────────────────────────
export default function ProjectCard({ project, index = 0, variant = 'grid', compact = false }) {
  if (variant === 'list') return <ListCard p={project} i={index}/>
  return <GridCard p={project} i={index} compact={compact}/>
}
