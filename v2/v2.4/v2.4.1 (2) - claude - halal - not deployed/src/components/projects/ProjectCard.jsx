// ProjectCard.jsx — v2.4.1
// Complete redesign — minimal, professional, consistent
// Used on: /projects page (grid + list), home featured section
//
// GridCard layout:
//   [thumbnail with overlays]
//   [tags] [title] [description]
//   [views/likes] [View →]
//
// ListCard layout:
//   [accent bar] [thumb] [meta+title+desc] [links+stats]

import { Link }                 from 'react-router-dom'
import { motion }               from 'framer-motion'
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { faGithub }             from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faEye, faThumbsUp,
  faArrowRight, faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { formatCount } from '../../utils/formatters.js'

// ── Category → accent color map (exported for reuse) ─────────
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
  'PWA':          '#6366F1',
  'Learning':     '#84CC16',
  'Institutional':'#0EA5E9',
  'default':      '#64748B',
}

// ── No-thumbnail placeholder ──────────────────────────────────
function ThumbPlaceholder({ category, color }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
      style={{ background: `linear-gradient(135deg, ${color}1A 0%, ${color}08 100%)` }}>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
        <FontAwesomeIcon icon={faFolderOpen} className="text-lg" style={{ color: `${color}99` }} />
      </div>
      {category && (
        <span className="text-[10px] font-medium" style={{ color: `${color}80` }}>{category}</span>
      )}
    </div>
  )
}

// ── Grid Card ─────────────────────────────────────────────────
function GridCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default

  return (
    <motion.article
      className="group relative flex flex-col bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)] cursor-pointer"
      style={{ transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.35, delay: Math.min(i * 0.055, 0.4) }}
      whileHover={{ y: -4 }}>

      {/* Top accent glow line on hover */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)` }}
      />

      {/* ── Thumbnail ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <ThumbPlaceholder category={p.category} color={color} />
        )}

        {/* Bottom gradient for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent" />

        {/* Category badge — bottom left */}
        <div className="absolute bottom-2.5 left-2.5">
          <span
            className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide text-white"
            style={{
              background:     `${color}D9`,
              backdropFilter: 'blur(6px)',
            }}>
            {p.category}
          </span>
        </div>

        {/* External link buttons — bottom right, revealed on hover */}
        <div className="absolute bottom-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white hover:scale-110 transition-transform text-xs"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
              title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a
              href={p.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white hover:scale-110 transition-transform text-xs"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
              title="Live Preview">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-3.5 gap-2">

        {/* Tags row */}
        {p.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {p.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-[2px] rounded-full bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
                {tag}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span className="text-[10px] text-[var(--text-tertiary)]">
                +{p.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors duration-200">
          {p.title}
        </h3>

        {/* Description */}
        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3 text-[11px] text-[var(--text-tertiary)]">
            {(p.views_count ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faEye} className="text-[9px]" />
                {formatCount(p.views_count)}
              </span>
            )}
            {(p.likes_count ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faThumbsUp} className="text-[9px]" />
                {formatCount(p.likes_count)}
              </span>
            )}
          </div>
          <span
            className="text-[11px] font-semibold flex items-center gap-1 transition-transform group-hover:translate-x-0.5"
            style={{ color }}>
            View
            <FontAwesomeIcon icon={faArrowRight} className="text-[9px]" />
          </span>
        </div>
      </div>

      {/* Full-card invisible link */}
      <Link to={`/projects/${p.slug}`} className="absolute inset-0 z-0" aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── List Card ─────────────────────────────────────────────────
function ListCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default

  return (
    <motion.article
      className="group relative flex items-stretch bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-color)] cursor-pointer"
      style={{ transition: 'border-color 0.2s, transform 0.2s' }}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
      whileHover={{ y: -2 }}>

      {/* Left accent bar */}
      <div
        className="w-[3px] flex-shrink-0 transition-opacity duration-300"
        style={{ background: `linear-gradient(180deg, ${color}, ${color}50)` }}
      />

      {/* Thumbnail */}
      <div className="relative w-[84px] sm:w-[120px] flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}18, ${color}05)` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-base" style={{ color: `${color}70` }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0 px-3.5 py-3 gap-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-bold px-2 py-[2px] rounded-full uppercase tracking-wide text-white"
            style={{ background: `${color}D9` }}>
            {p.category}
          </span>
          {p.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-[2px] rounded bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors duration-200">
          {p.title}
        </h3>
        {p.short_description && (
          <p className="hidden sm:block text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed">
            {p.short_description}
          </p>
        )}
      </div>

      {/* Right: links + stats */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2 pr-4 pl-2 py-3">
        <div className="flex gap-1.5">
          {p.github_link && (
            <a
              href={p.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-6 h-6 rounded-md bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-colors text-xs"
              title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a
              href={p.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-6 h-6 rounded-md bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-colors text-xs"
              title="Live">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
        {((p.views_count ?? 0) > 0 || (p.likes_count ?? 0) > 0) && (
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
            {(p.views_count ?? 0) > 0 && (
              <span className="flex items-center gap-0.5">
                <FontAwesomeIcon icon={faEye} className="text-[9px]" />
                {formatCount(p.views_count)}
              </span>
            )}
          </div>
        )}
      </div>

      <Link to={`/projects/${p.slug}`} className="absolute inset-0 z-0" aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── No projects placeholder ───────────────────────────────────
export function NoProjectsPlaceholder({ message = 'No projects yet' }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: 'var(--bg-surface)',
          border:     '1px dashed var(--border-strong)',
        }}>
        <FontAwesomeIcon icon={faFolderOpen} className="text-3xl text-[var(--text-tertiary)]" />
      </div>
      <div>
        <p className="font-semibold text-[var(--text-secondary)] text-sm">{message}</p>
        <p className="text-xs text-[var(--text-tertiary)] mt-1">Projects will appear here once published.</p>
      </div>
    </div>
  )
}

// ── Default export ────────────────────────────────────────────
export default function ProjectCard({ project, index = 0, view = 'grid' }) {
  if (view === 'list') return <ListCard p={project} i={index} />
  return <GridCard p={project} i={index} />
}
