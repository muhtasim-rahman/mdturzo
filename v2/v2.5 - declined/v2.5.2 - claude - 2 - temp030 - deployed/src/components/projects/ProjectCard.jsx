// ProjectCard.jsx — v2.4.6b
// Fix round:
//   - TagFit: auto-measures container width via ResizeObserver,
//     shows as many tags as fit in ONE line, +N badge for overflow
//   - ListCard: full redesign — clean minimal horizontal layout,
//     action icons (GitHub/Live) fade in at top-right corner on hover,
//     no sliding/jumpy panel, details button stays at bottom-right
//   - Both cards link to canonical /project/:slug

import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFolderOpen, faTag, faArrowRight,
  faEye, faThumbsUp, faCode, faGlobe, faBoxArchive
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// ── Helpers ───────────────────────────────────────────────────
const CAT_ICONS = {
  'Web App': faGlobe, 'PWA': faGlobe, 'Utility': faCode,
  'Education': faBoxArchive, 'UI Component': faCode, 'Dev Tool': faCode,
  'Islamic': faBoxArchive, 'Tool': faCode, 'Portfolio': faBoxArchive,
  'Design': faBoxArchive, 'Learning': faBoxArchive, 'Institutional': faBoxArchive,
  'default': faFolderOpen,
}

function formatCount(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000)      return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

function normalizeTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string') { try { return JSON.parse(tags) } catch { return [] } }
  return []
}

// ── TagFit — auto-fitting single-line tag row ─────────────────
// Renders all tags in a hidden measurement layer, computes how many
// fit in one line given the container width, then renders only those
// with a "+N" overflow badge. Uses ResizeObserver for responsiveness.
const TAG_CLS  = 'flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]'
const BADGE_CLS = 'flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap bg-[var(--accent-light)] text-[var(--accent-primary)]'
const BADGE_W = 34 // reserved pixels for the "+N" badge + gap
const TAG_GAP = 4  // gap-1 in pixels

function TagFit({ tags, maxTags }) {
  const outerRef   = useRef(null)
  const measureRef = useRef(null)
  const [count, setCount] = useState(maxTags ?? tags.length)

  useLayoutEffect(() => {
    if (!outerRef.current || !measureRef.current || !tags.length) return

    const calc = () => {
      const containerW = outerRef.current.clientWidth
      const items = Array.from(measureRef.current.children)
      if (!items.length) return

      let used = 0
      let fits = 0
      const max = maxTags ? Math.min(maxTags, items.length) : items.length

      for (let i = 0; i < max; i++) {
        const w = items[i].offsetWidth + TAG_GAP
        // Reserve badge space if there are more tags after this one
        const hasMore = i < items.length - 1
        const reserve = hasMore ? BADGE_W : 0

        if (used + w + reserve <= containerW) {
          used += w
          fits++
        } else {
          break
        }
      }

      setCount(Math.max(1, fits))
    }

    const frame = requestAnimationFrame(calc)
    const ro = new ResizeObserver(calc)
    ro.observe(outerRef.current)
    return () => { cancelAnimationFrame(frame); ro.disconnect() }
  }, [tags.join('|'), maxTags])

  const visible  = tags.slice(0, count)
  const overflow = tags.length - count

  return (
    <div ref={outerRef} className="relative overflow-hidden min-w-0 flex-1">
      {/* Hidden measurement layer — all tags, never wraps */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center flex-nowrap opacity-0 pointer-events-none"
        style={{ gap: TAG_GAP }}>
        {tags.map(t => <span key={t} className={TAG_CLS}>{t}</span>)}
      </div>

      {/* Visible row */}
      <div className="flex items-center flex-nowrap" style={{ gap: TAG_GAP }}>
        {visible.map(t => <span key={t} className={TAG_CLS}>{t}</span>)}
        {overflow > 0 && <span className={BADGE_CLS}>+{overflow}</span>}
      </div>
    </div>
  )
}

// ── Grid Card ─────────────────────────────────────────────────
function GridCard({ p, i }) {
  const catIcon = CAT_ICONS[p.category] ?? CAT_ICONS.default
  const tags    = normalizeTags(p.tags)

  return (
    <motion.article
      data-click-fx="true"
      className="proj-card group relative flex flex-col rounded-2xl overflow-hidden
        border border-[var(--border-color)] bg-[var(--bg-surface)] cursor-pointer
        transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.38, delay: i * 0.04 }}>

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none
        ring-0 ring-[var(--accent-primary)]/0
        group-hover:ring-1 group-hover:ring-[var(--accent-primary)]/30 transition-all duration-300" />

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <>
            <img src={p.thumbnail_url} alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy" />
            <div className="proj-thumb-overlay absolute inset-0 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3
            bg-gradient-to-br from-[var(--bg-surface-2)] via-[var(--bg-surface-2)] to-[var(--accent-light)]/40">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center
              bg-[var(--accent-light)] border border-[var(--accent-primary)]/20
              group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={catIcon} className="text-xl text-[var(--accent-primary)]" />
            </div>
            <span className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              {p.category || 'Project'}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider
            bg-[var(--accent-primary)]/90 text-white backdrop-blur-sm shadow-sm">
            {p.category}
          </span>
        </div>

        {/* Quick action icons — fade in on hover */}
        <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-10
          opacity-0 group-hover:opacity-100 transition-all duration-200
          translate-y-[-4px] group-hover:translate-y-0">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center
                text-white/90 hover:text-white hover:bg-black/90 border border-white/10 transition-all text-xs">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center
                text-white/90 hover:text-white hover:bg-black/90 border border-white/10 transition-all text-xs">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="proj-card-body relative flex flex-col flex-1 p-4 gap-2.5">

        <h3 className="text-[15px] font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-1">
          {p.title}
        </h3>

        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 min-w-0">
            <FontAwesomeIcon icon={faTag}
              className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0" />
            <TagFit tags={tags} />
          </div>
        )}

        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        {/* Footer */}
        <div className="proj-card-divider flex items-center justify-between pt-2.5 mt-auto border-t">
          <div className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEye} />{formatCount(p.views_count)}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faThumbsUp} />{formatCount(p.likes_count)}
            </span>
          </div>
          <span className="text-[10px] font-semibold flex items-center gap-1
            text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200">
            Details
            <FontAwesomeIcon icon={faArrowRight}
              className="text-[8px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <Link to={`/project/${p.slug}`} title={p.title}
        className="absolute inset-0 z-[1]" aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── List Card — clean minimal horizontal layout ───────────────
// Action icons (GitHub/Live) appear at top-right on hover.
// Details link stays at bottom-right always.
function ListCard({ p, i }) {
  const catIcon = CAT_ICONS[p.category] ?? CAT_ICONS.default
  const tags    = normalizeTags(p.tags)

  return (
    <motion.article
      data-click-fx="true"
      className="proj-card group relative flex rounded-xl overflow-hidden
        bg-[var(--bg-surface)] border border-[var(--border-color)]
        hover:border-[var(--accent-primary)]/30 hover:shadow-sm
        transition-all duration-250 cursor-pointer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3, delay: i * 0.025 }}>

      {/* ── Left thumbnail ─────────────────────────────────── */}
      <div className="relative w-36 sm:w-48 flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
        {p.thumbnail_url ? (
          <img src={p.thumbnail_url} alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center
            bg-gradient-to-br from-[var(--bg-surface-2)] to-[var(--accent-light)]/30">
            <FontAwesomeIcon icon={catIcon} className="text-2xl text-[var(--text-tertiary)]/50" />
          </div>
        )}

        {/* Subtle right-edge fade to blend into content */}
        <div className="absolute inset-y-0 right-0 w-8
          bg-gradient-to-r from-transparent to-[var(--bg-surface)]/60 pointer-events-none" />

        {/* Category label */}
        <span className="absolute bottom-2 left-2 text-[8px] font-bold px-1.5 py-0.5
          rounded uppercase tracking-wider bg-black/55 text-white backdrop-blur-sm">
          {p.category}
        </span>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 px-4 py-3 gap-1.5">

        {/* Title — leave room at top-right for hover icons (pr-16) */}
        <h3 className="text-sm font-display font-bold text-[var(--text-primary)]
          leading-tight line-clamp-1 pr-14">
          {p.title}
        </h3>

        {/* Tags — single line, auto-fit */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1 min-w-0">
            <TagFit tags={tags} />
          </div>
        )}

        {/* Description — hidden on small screens */}
        {p.short_description && (
          <p className="hidden sm:block text-[11px] text-[var(--text-secondary)]
            leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        {/* Stats + Details button */}
        <div className="proj-card-divider flex items-center justify-between border-t pt-2 mt-auto">
          <div className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEye} className="text-[9px]" />{formatCount(p.views_count)}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faThumbsUp} className="text-[9px]" />{formatCount(p.likes_count)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-semibold
            text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors">
            Details
            <FontAwesomeIcon icon={faArrowRight}
              className="text-[8px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* ── Hover: action icons, top-right corner ──────────── */}
      {(p.github_link || p.live_link) && (
        <div className="absolute top-2.5 right-2.5 z-10 flex gap-1.5
          opacity-0 group-hover:opacity-100 translate-y-[-3px] group-hover:translate-y-0
          transition-all duration-200">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-color)]
                flex items-center justify-center text-[10px] text-[var(--text-secondary)]
                hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)]
                transition-all shadow-sm backdrop-blur-sm"
              title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-color)]
                flex items-center justify-center text-[10px] text-[var(--text-secondary)]
                hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)]
                transition-all shadow-sm backdrop-blur-sm"
              title="Live Preview">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      )}

      <Link to={`/project/${p.slug}`} title={p.title}
        className="absolute inset-0 z-[1]" aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── Export ────────────────────────────────────────────────────
export default function ProjectCard({ project, index = 0, view = 'grid' }) {
  if (view === 'list') return <ListCard p={project} i={index} />
  return <GridCard p={project} i={index} />
}
