// ProjectCard.jsx — v2.4.2
// Redesigned:
//   - Uniform accent-primary theme color (no per-category colors)
//   - Thumbnail: dark/light gradient overlay, category badge always visible
//   - Hover icons (GitHub/Live) appear on hover — top right
//   - Tags in single line below title (overflow hidden)
//   - Card-wide hover effect: scale + shadow + border
//   - Title does NOT change color on hover
//   - Click press effect (active:scale-[0.99])
//   - Beautiful placeholder when no thumbnail
//   - List view completely redesigned

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFolderOpen, faEye, faThumbsUp,
  faArrowRight, faHashtag, faCode
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

function formatCount(n) {
  if (!n || n === 0) return null
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// ── Grid Card ────────────────────────────────────────────────
function GridCard({ p, i }) {
  const views = formatCount(p.views_count)
  const likes = formatCount(p.likes_count)

  return (
    <motion.article
      className="proj-card group relative flex flex-col bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)] cursor-pointer select-none"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35, delay: i * 0.04 }}>

      {/* ── Thumbnail Zone ── */}
      <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          /* Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3
                          bg-gradient-to-br from-[var(--bg-surface-2)] to-[var(--bg-surface-3)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center ring-4 ring-[var(--accent-primary)]/10">
              <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--accent-primary)]" />
            </div>
            {p.category && (
              <span className="text-[11px] font-semibold text-[var(--text-tertiary)] px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)]">
                {p.category}
              </span>
            )}
          </div>
        )}

        {/* Dark gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />
        {/* Light overlay for light mode softening */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />

        {/* Category Badge — always visible top-left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full
                           bg-black/50 text-white backdrop-blur-md border border-white/10 tracking-wide">
            {p.category}
          </span>
        </div>

        {/* Action Icons — appear on hover top-right */}
        <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100
                        transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              title="GitHub"
              className="w-7 h-7 rounded-lg bg-black/55 backdrop-blur-md flex items-center justify-center
                         text-white/80 hover:text-white border border-white/10 transition-all text-xs hover:bg-black/75">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a
              href={p.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              title="Live Preview"
              className="w-7 h-7 rounded-lg bg-black/55 backdrop-blur-md flex items-center justify-center
                         text-white/80 hover:text-white border border-white/10 transition-all text-xs hover:bg-black/75">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">

        {/* Title — no color change on hover */}
        <h3 className="text-sm font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2 mt-0.5">
          {p.title}
        </h3>

        {/* Tags — single line, overflow hidden */}
        {p.tags?.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-hidden h-5">
            <FontAwesomeIcon icon={faHashtag} className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0" />
            <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap min-w-0">
              {p.tags.slice(0, 5).map(tag => (
                <span
                  key={tag}
                  className="text-[9px] font-medium px-2 py-0.5 rounded-md flex-shrink-0
                             bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  {tag}
                </span>
              ))}
              {p.tags.length > 5 && (
                <span className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0 font-medium">
                  +{p.tags.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Short Description */}
        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1 min-h-0">
            {p.short_description}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-[var(--border-color)]/60">
          {/* Stats */}
          <div className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-tertiary)]">
            {views && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faEye} className="opacity-70" />
                {views}
              </span>
            )}
            {likes && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faThumbsUp} className="opacity-70" />
                {likes}
              </span>
            )}
          </div>
          {/* View link hint */}
          <span className="text-[11px] font-semibold flex items-center gap-1 text-[var(--text-tertiary)]
                           group-hover:text-[var(--accent-primary)] transition-colors duration-200">
            Details
            <FontAwesomeIcon icon={faArrowRight} className="text-[9px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Full area clickable link overlay */}
      <Link
        to={`/projects/${p.slug}`}
        className="absolute inset-0 z-[2]"
        aria-label={`View project: ${p.title}`}
      />
    </motion.article>
  )
}

// ── List Card ─────────────────────────────────────────────────
function ListCard({ p, i }) {
  const views = formatCount(p.views_count)
  const likes = formatCount(p.likes_count)

  return (
    <motion.article
      className="proj-list-card group relative flex items-center gap-0 bg-[var(--bg-surface)] rounded-xl
                 overflow-hidden border border-[var(--border-color)] cursor-pointer select-none
                 hover:border-[var(--border-strong)] transition-all duration-200"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3, delay: i * 0.025 }}>

      {/* Thumbnail */}
      <div className="relative w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-2)]">
            <FontAwesomeIcon icon={faFolderOpen} className="text-xl text-[var(--accent-primary)] opacity-25" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-surface)]/40 pointer-events-none" />
      </div>

      {/* Main content area */}
      <div className="flex-1 min-w-0 px-4 py-3 flex flex-col gap-1 justify-center">
        {/* Category label */}
        <span className="text-[9px] font-extrabold text-[var(--accent-primary)] uppercase tracking-widest">
          {p.category}
        </span>
        {/* Title */}
        <h3 className="text-sm font-display font-bold text-[var(--text-primary)] line-clamp-1 leading-tight">
          {p.title}
        </h3>
        {/* Description on larger screens */}
        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed hidden sm:block">
            {p.short_description}
          </p>
        )}
        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap mt-0.5">
            {p.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded-md flex-shrink-0
                           bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                {tag}
              </span>
            ))}
            {p.tags.length > 4 && (
              <span className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0">+{p.tags.length - 4}</span>
            )}
          </div>
        )}
      </div>

      {/* Right: stats + links */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2.5 pr-4 pl-2 z-[3]">
        {/* Icons appear on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              title="GitHub"
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--accent-primary)] hover:text-white
                         flex items-center justify-center text-[var(--text-tertiary)] border border-[var(--border-color)]
                         transition-all text-xs">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a
              href={p.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              title="Live"
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--accent-primary)] hover:text-white
                         flex items-center justify-center text-[var(--text-tertiary)] border border-[var(--border-color)]
                         transition-all text-xs">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-col items-end gap-1 text-[10px] text-[var(--text-tertiary)]">
          {views && (
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEye} className="opacity-70" />
              {views}
            </span>
          )}
          {likes && (
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faThumbsUp} className="opacity-70" />
              {likes}
            </span>
          )}
        </div>
      </div>

      {/* Full overlay link */}
      <Link
        to={`/projects/${p.slug}`}
        className="absolute inset-0 z-[2]"
        aria-label={`View project: ${p.title}`}
      />
    </motion.article>
  )
}

// ── Exported component ────────────────────────────────────────
export default function ProjectCard({ project, index = 0, view = 'grid' }) {
  if (view === 'list') return <ListCard p={project} i={index} />
  return <GridCard p={project} i={index} />
}
