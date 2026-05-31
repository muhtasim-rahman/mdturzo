// ProjectCard.jsx — v2.4.0
// Used on: Home (featured), Projects page (grid + list views)
// view: 'grid' | 'list'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFolderOpen, faTag, faArrowRight,
  faEye, faThumbsUp, faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export const CAT_COLORS = {
  'Web App':      '#3B82F6',
  'Utility':      '#10B981',
  'Education':    '#F59E0B',
  'UI Component': '#EC4899',
  'Dev Tool':     '#A855F7',
  'Islamic':      '#06B6D4',
  'Tool':         '#F97316',
  'Portfolio':    '#8B5CF6',
  'Design':       '#F43F5E',
  'default':      '#64748B',
}

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n || 0)
}

// ── Grid Card ────────────────────────────────────────────────
function GridCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="proj-card group relative flex flex-col bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-color)] transition-all duration-250"
      style={{ '--c': color, borderColor: hovered ? `${color}60` : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.38, delay: i * 0.06 }}>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: hovered ? 1 : 0 }}
      />

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url} alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}05 100%)` }}>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
              <FontAwesomeIcon icon={faFolderOpen} className="text-xl" style={{ color: `${color}80` }} />
            </div>
            <span className="text-xs text-[var(--text-tertiary)]">{p.category}</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide backdrop-blur-sm"
            style={{ background: `${color}22`, color, border: `1px solid ${color}35` }}>
            {p.category}
          </span>
        </div>

        {/* External links (hover) */}
        <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-white border border-[var(--border-color)] transition-colors text-sm">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-white border border-[var(--border-color)] transition-colors text-sm">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Tags row */}
        {p.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map(tag => (
              <span key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
                {tag}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="text-[10px] text-[var(--text-tertiary)] self-center">+{p.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors duration-200">
          {p.title}
        </h3>

        {/* Description */}
        {p.short_description && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-2.5 mt-auto border-t"
          style={{ borderColor: `${color}20` }}>
          <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
            {(p.views_count ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faEye} />
                {formatCount(p.views_count)}
              </span>
            )}
            {(p.likes_count ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faThumbsUp} />
                {formatCount(p.likes_count)}
              </span>
            )}
          </div>
          <span className="text-xs font-medium flex items-center gap-1" style={{ color }}>
            Details
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Full card link overlay */}
      <Link
        to={`/projects/${p.slug}`}
        className="absolute inset-0"
        aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── List Card ─────────────────────────────────────────────────
function ListCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default

  return (
    <motion.article
      className="proj-list-card group relative flex items-stretch gap-0 bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: i * 0.05 }}>

      {/* Left accent bar */}
      <div className="w-1 flex-shrink-0 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, ${color}, ${color}40)` }} />

      {/* Thumbnail (small) */}
      <div className="relative w-24 sm:w-36 flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
        {p.thumbnail_url ? (
          <img src={p.thumbnail_url} alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}18, ${color}05)` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-xl" style={{ color: `${color}60` }} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-center flex-1 min-w-0 p-3.5 gap-1.5">
        <div className="flex items-start gap-2 flex-wrap">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0"
            style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
            {p.category}
          </span>
          {p.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-sm sm:text-base font-display font-bold text-[var(--text-primary)] leading-tight line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors">
          {p.title}
        </h3>

        {p.short_description && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-1 leading-relaxed hidden sm:block">
            {p.short_description}
          </p>
        )}
      </div>

      {/* Right: links + stats */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2 pr-4 pl-2">
        <div className="flex gap-1.5">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-white border border-[var(--border-color)] transition-colors text-xs">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-white border border-[var(--border-color)] transition-colors text-xs">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
          {(p.views_count ?? 0) > 0 && (
            <span className="flex items-center gap-0.5">
              <FontAwesomeIcon icon={faEye} />
              {formatCount(p.views_count)}
            </span>
          )}
        </div>
      </div>

      {/* Link overlay */}
      <Link
        to={`/projects/${p.slug}`}
        className="absolute inset-0"
        aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── Exported wrapper ─────────────────────────────────────────
export default function ProjectCard({ project, index = 0, view = 'grid' }) {
  if (view === 'list') return <ListCard p={project} i={index} />
  return <GridCard p={project} i={index} />
}
