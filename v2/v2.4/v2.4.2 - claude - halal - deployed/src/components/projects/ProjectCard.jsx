// ProjectCard.jsx — v2.4.2
// Complete redesign:
//   - Uniform theme (no category-based colors)
//   - Gradient overlay on thumbnail (dark gradient for visibility)
//   - Category badge always visible (top-left on thumbnail)
//   - Hover icons top-right (github, live link)
//   - Tags in ONE horizontal line below title
//   - No title color change on hover
//   - Whole-card hover effect (scale, shadow, border)
//   - Click ripple effect (active:scale)
//   - Beautiful empty placeholder with icon
//   - List view: complete redesign

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFolderOpen, faTag, faArrowRight,
  faEye, faThumbsUp, faCode, faGlobe, faBoxArchive
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// Category icon mapping (used for empty placeholder icon)
const CAT_ICONS = {
  'Web App':      faGlobe,
  'PWA':          faGlobe,
  'Utility':      faCode,
  'Education':    faBoxArchive,
  'UI Component': faCode,
  'Dev Tool':     faCode,
  'Islamic':      faBoxArchive,
  'Tool':         faCode,
  'Portfolio':    faBoxArchive,
  'Design':       faBoxArchive,
  'Learning':     faBoxArchive,
  'Institutional':faBoxArchive,
  'default':      faFolderOpen,
}

function formatCount(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// ── Grid Card ────────────────────────────────────────────────
function GridCard({ p, i }) {
  const catIcon = CAT_ICONS[p.category] ?? CAT_ICONS.default

  return (
    <motion.article
      className="proj-card group relative flex flex-col bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)] transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.38, delay: i * 0.04 }}>

      {/* Thumbnail area */}
      <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Empty placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--bg-surface-2)]">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
              <FontAwesomeIcon icon={catIcon} className="text-xl text-[var(--accent-primary)]" />
            </div>
            <span className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              {p.category || 'Project'}
            </span>
          </div>
        )}

        {/* Fixed dark gradient overlay for text readability */}
        {p.thumbnail_url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        )}

        {/* Category badge — always visible bottom-left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[var(--accent-primary)]/90 text-white backdrop-blur-sm">
            {p.category}
          </span>
        </div>

        {/* Action icons — top-right, appear on hover */}
        <div className="absolute top-3 right-3 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-250 translate-y-[-6px] group-hover:translate-y-0">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center text-white/90 hover:text-white hover:bg-black/90 border border-white/10 transition-all text-xs"
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
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center text-white/90 hover:text-white hover:bg-black/90 border border-white/10 transition-all text-xs"
              title="Live Preview">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">

        {/* Title */}
        <h3 className="text-[15px] font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-1">
          {p.title}
        </h3>

        {/* Tags — single line */}
        {p.tags?.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-hidden flex-nowrap">
            <FontAwesomeIcon icon={faTag} className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0" />
            <div className="flex gap-1 overflow-hidden flex-1 min-w-0">
              {p.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] whitespace-nowrap">
                  {tag}
                </span>
              ))}
              {p.tags.length > 4 && (
                <span className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent-primary)] whitespace-nowrap">
                  +{p.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Short description */}
        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-[var(--border-color)]/60">
          <div className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEye} />
              {formatCount(p.views_count)}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faThumbsUp} />
              {formatCount(p.likes_count)}
            </span>
          </div>

          <span className="text-[10px] font-semibold flex items-center gap-1 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200">
            Details
            <FontAwesomeIcon icon={faArrowRight} className="text-[8px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Full overlay link */}
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
  const catIcon = CAT_ICONS[p.category] ?? CAT_ICONS.default

  return (
    <motion.article
      className="proj-card group relative flex items-stretch bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-color)] transition-all duration-300 cursor-pointer min-h-[88px]"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.32, delay: i * 0.025 }}>

      {/* Left accent bar */}
      <div className="w-1 flex-shrink-0 bg-[var(--accent-primary)]/30 group-hover:bg-[var(--accent-primary)] transition-colors duration-300" />

      {/* Thumbnail */}
      <div className="relative w-24 sm:w-36 flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
        {p.thumbnail_url ? (
          <>
            <img
              src={p.thumbnail_url}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-2)]">
            <FontAwesomeIcon icon={catIcon} className="text-2xl text-[var(--text-tertiary)]" />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center px-4 py-3 gap-1.5">

        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
            {p.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-display font-bold text-[var(--text-primary)] leading-tight line-clamp-1">
          {p.title}
        </h3>

        {/* Tags — single line, truncated */}
        {p.tags?.length > 0 && (
          <div className="flex items-center gap-1 overflow-hidden flex-nowrap">
            {p.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="flex-shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] whitespace-nowrap">
                {tag}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="flex-shrink-0 text-[9px] text-[var(--text-tertiary)] whitespace-nowrap">
                +{p.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Description — only on sm+ */}
        {p.short_description && (
          <p className="hidden sm:block text-[11px] text-[var(--text-secondary)] line-clamp-1 leading-relaxed">
            {p.short_description}
          </p>
        )}
      </div>

      {/* Right: actions + stats */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2.5 px-3 z-10">
        {/* Link icons */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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

        {/* Stats */}
        <div className="flex items-center gap-2 text-[9px] font-medium text-[var(--text-tertiary)]">
          <span className="flex items-center gap-0.5">
            <FontAwesomeIcon icon={faEye} />
            {formatCount(p.views_count)}
          </span>
          <span className="flex items-center gap-0.5">
            <FontAwesomeIcon icon={faThumbsUp} />
            {formatCount(p.likes_count)}
          </span>
        </div>

        {/* Arrow indicator */}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-[9px] text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors group-hover:translate-x-0.5 transform duration-200"
        />
      </div>

      {/* Full overlay link */}
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
