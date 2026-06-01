import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFolderOpen, faTag, faArrowRight,
  faEye, faThumbsUp
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
      className="proj-card group relative flex flex-col bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ '--c': color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, delay: i * 0.03 }}>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${color}20, ${color}, ${color}20)`,
          opacity: hovered ? 1 : 0.6
        }}
      />

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${color}10 0%, ${color}02 100%)` }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
              <FontAwesomeIcon icon={faFolderOpen} className="text-lg" style={{ color: `${color}90` }} />
            </div>
            <span className="text-[11px] text-[var(--text-tertiary)]">{p.category}</span>
          </div>
        )}

        {/* Minimal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Category Badge on top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md border"
            style={{
              backgroundColor: `${color}15`,
              color: color,
              borderColor: `${color}30`
            }}>
            {p.category}
          </span>
        </div>

        {/* Floating details icon/redirect buttons top right */}
        <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover:translate-y-0">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface)]/95 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:scale-105 border border-[var(--border-color)] transition-all text-xs"
              title="GitHub Repository">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a
              href={p.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface)]/95 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:scale-105 border border-[var(--border-color)] transition-all text-xs"
              title="Live Preview">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        
        {/* Tags Row */}
        {p.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <FontAwesomeIcon icon={faTag} className="text-[10px] text-[var(--text-tertiary)] mr-0.5" />
            {p.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                {tag}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent-primary)]">
                +{p.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors duration-200">
          {p.title}
        </h3>

        {/* Description (Max 2 lines) */}
        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        {/* Card Footer */}
        <div
          className="flex items-center justify-between pt-3 mt-auto border-t border-[var(--border-color)]"
          style={{ borderColor: `${color}15` }}>
          
          {/* Stats Summary */}
          <div className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
              <FontAwesomeIcon icon={faEye} />
              {formatCount(p.views_count)}
            </span>
            <span className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
              <FontAwesomeIcon icon={faThumbsUp} />
              {formatCount(p.likes_count)}
            </span>
          </div>

          {/* Details floating-style button */}
          <span className="text-[11px] font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg text-[var(--text-secondary)] group-hover:text-white bg-[var(--bg-surface-2)] group-hover:bg-[var(--accent-primary)] border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] transition-all duration-300">
            Details
            <FontAwesomeIcon icon={faArrowRight} className="text-[9px] transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {/* Absolute Overlay Link */}
      <Link
        to={`/projects/${p.slug}`}
        className="absolute inset-0 z-[1]"
        aria-label={`View project: ${p.title}`}
      />
    </motion.article>
  )
}

// ── List Card ─────────────────────────────────────────────────
function ListCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="proj-list-card group relative flex items-stretch bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35, delay: i * 0.02 }}>

      {/* Left accent bar */}
      <div
        className="w-1.5 flex-shrink-0 transition-all duration-300"
        style={{
          background: `linear-gradient(180deg, ${color}, ${color}60)`,
          opacity: hovered ? 1 : 0.6
        }}
      />

      {/* Thumbnail (small) */}
      <div className="relative w-28 sm:w-40 flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}10, ${color}02)` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-xl" style={{ color: `${color}60` }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col justify-center flex-1 min-w-0 p-4 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: `${color}15`,
              color: color,
              border: `1px solid ${color}30`
            }}>
            {p.category}
          </span>
          {p.tags?.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">
              {tag}
            </span>
          ))}
          {p.tags?.length > 2 && (
            <span className="text-[9px] text-[var(--text-tertiary)]">+{p.tags.length - 2}</span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-display font-bold text-[var(--text-primary)] leading-tight line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors">
          {p.title}
        </h3>

        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed hidden sm:block">
            {p.short_description}
          </p>
        )}
      </div>

      {/* Right Column: Links + Stats */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-3 pr-4 pl-2 z-10">
        <div className="flex gap-2">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--accent-primary)] hover:text-white flex items-center justify-center text-[var(--text-tertiary)] border border-[var(--border-color)] transition-all text-xs"
              title="GitHub Repo">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a
              href={p.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--accent-primary)] hover:text-white flex items-center justify-center text-[var(--text-tertiary)] border border-[var(--border-color)] transition-all text-xs"
              title="Live Link">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-medium text-[var(--text-tertiary)]">
          <span className="flex items-center gap-0.5">
            <FontAwesomeIcon icon={faEye} />
            {formatCount(p.views_count)}
          </span>
        </div>
      </div>

      {/* Full link overlay */}
      <Link
        to={`/projects/${p.slug}`}
        className="absolute inset-0 z-[1]"
        aria-label={`View project: ${p.title}`}
      />
    </motion.article>
  )
}

// ── Exported wrapper ─────────────────────────────────────────
export default function ProjectCard({ project, index = 0, view = 'grid' }) {
  if (view === 'list') return <ListCard p={project} i={index} />
  return <GridCard p={project} i={index} />
}
