// ProjectCard.jsx — v2.4.4
// Changes:
//   - Light mode: subtle gradient background on card body
//   - Dark mode: accent glow on hover border
//   - Tags: dynamic single-line fit → shows as many as fit → "+N" for remainder
//   - Hover: lifted shadow + accent border glow
//   - No-thumbnail placeholder: gradient background
//   - List view: left bar accent animates on hover

import { useRef, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFolderOpen, faTag, faArrowRight,
  faEye, faThumbsUp, faCode, faGlobe, faBoxArchive
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

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

// Measures how many tags fit in one line, shows remainder as "+N"
function TagRow({ tags }) {
  const wrapRef = useRef(null)
  const [show, setShow] = useState(tags.length)

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el || tags.length === 0) return
    const children = Array.from(el.children)
    const maxRight = el.getBoundingClientRect().right
    let last = 0
    for (let i = 0; i < children.length; i++) {
      const r = children[i].getBoundingClientRect().right
      if (r <= maxRight + 1) last = i + 1
      else break
    }
    setShow(Math.max(1, last))
  }, [tags])

  const remainder = tags.length - show

  return (
    <div ref={wrapRef} className="flex items-center gap-1 overflow-hidden flex-nowrap w-full">
      {tags.map((tag, i) => (
        <span key={tag}
          style={{ display: i < show ? '' : 'none' }}
          className="flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] whitespace-nowrap">
          {tag}
        </span>
      ))}
      {remainder > 0 && (
        <span className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent-primary)] whitespace-nowrap">
          +{remainder}
        </span>
      )}
    </div>
  )
}

// ── Grid Card ─────────────────────────────────────────────────
function GridCard({ p, i }) {
  const catIcon = CAT_ICONS[p.category] ?? CAT_ICONS.default
  const tags    = normalizeTags(p.tags)

  return (
    <motion.article
      className="proj-card group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.38, delay: i * 0.04 }}>

      {/* Light-mode gradient wash on card body */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-100 dark:opacity-0
        bg-gradient-to-br from-white via-[var(--bg-surface)] to-[var(--accent-light)]/50" />

      {/* Hover accent glow border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none
        ring-0 ring-[var(--accent-primary)]/0
        group-hover:ring-1 group-hover:ring-[var(--accent-primary)]/35
        transition-all duration-300" />

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-2)] flex-shrink-0">
        {p.thumbnail_url ? (
          <img src={p.thumbnail_url} alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
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

        {p.thumbnail_url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
        )}

        {/* Category badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider
            bg-[var(--accent-primary)]/90 text-white backdrop-blur-sm shadow-sm">
            {p.category}
          </span>
        </div>

        {/* Hover action icons */}
        <div className="absolute top-3 right-3 flex gap-1.5 z-10
          opacity-0 group-hover:opacity-100 transition-all duration-200
          translate-y-[-6px] group-hover:translate-y-0">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center
                text-white/90 hover:text-white hover:bg-black/90 border border-white/10 transition-all text-xs"
              title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center
                text-white/90 hover:text-white hover:bg-black/90 border border-white/10 transition-all text-xs"
              title="Live Preview">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="relative flex flex-col flex-1 p-4 gap-2.5 z-10">
        <h3 className="text-[15px] font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-1">
          {p.title}
        </h3>

        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 min-w-0">
            <FontAwesomeIcon icon={faTag} className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0" />
            <div className="flex-1 min-w-0 overflow-hidden">
              <TagRow tags={tags} />
            </div>
          </div>
        )}

        {p.short_description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
            {p.short_description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-[var(--border-color)]/60">
          <div className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1"><FontAwesomeIcon icon={faEye} />{formatCount(p.views_count)}</span>
            <span className="flex items-center gap-1"><FontAwesomeIcon icon={faThumbsUp} />{formatCount(p.likes_count)}</span>
          </div>
          <span className="text-[10px] font-semibold flex items-center gap-1
            text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200">
            Details <FontAwesomeIcon icon={faArrowRight} className="text-[8px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <Link to={`/projects/${p.slug}`} title={p.title}
        className="absolute inset-0 z-[1]" aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

// ── List Card ─────────────────────────────────────────────────
function ListCard({ p, i }) {
  const catIcon = CAT_ICONS[p.category] ?? CAT_ICONS.default
  const tags    = normalizeTags(p.tags)

  return (
    <motion.article
      className="proj-card group relative flex items-stretch bg-[var(--bg-surface)] rounded-xl overflow-hidden
        border border-[var(--border-color)] transition-all duration-300 cursor-pointer min-h-[88px]"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.32, delay: i * 0.025 }}>

      {/* Light-mode gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-0
        bg-gradient-to-r from-white/80 via-transparent to-[var(--accent-light)]/30" />

      <div className="relative z-10 flex items-stretch flex-1">
        {/* Accent bar */}
        <div className="w-[3px] flex-shrink-0 bg-[var(--accent-primary)]/25 group-hover:bg-[var(--accent-primary)] transition-colors duration-300" />

        {/* Thumbnail */}
        <div className="relative w-24 sm:w-36 flex-shrink-0 overflow-hidden bg-[var(--bg-surface-2)]">
          {p.thumbnail_url ? (
            <>
              <img src={p.thumbnail_url} alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/15 pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--bg-surface-2)] to-[var(--accent-light)]/20">
              <FontAwesomeIcon icon={catIcon} className="text-2xl text-[var(--text-tertiary)]" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 flex flex-col justify-center px-4 py-3 gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
              bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
              {p.category}
            </span>
          </div>
          <h3 className="text-sm font-display font-bold text-[var(--text-primary)] leading-tight line-clamp-1">{p.title}</h3>
          {tags.length > 0 && (
            <div className="flex items-center gap-1 overflow-hidden flex-nowrap">
              {tags.slice(0, 3).map(tag => (
                <span key={tag} className="flex-shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded
                  bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] whitespace-nowrap">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="flex-shrink-0 text-[9px] font-bold text-[var(--accent-primary)] whitespace-nowrap">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
          {p.short_description && (
            <p className="hidden sm:block text-[11px] text-[var(--text-secondary)] line-clamp-1 leading-relaxed">{p.short_description}</p>
          )}
        </div>

        {/* Right actions */}
        <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2.5 px-3">
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {p.github_link && (
              <a href={p.github_link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--accent-primary)] hover:text-white
                  flex items-center justify-center text-[var(--text-tertiary)] border border-[var(--border-color)] transition-all text-xs">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {p.live_link && (
              <a href={p.live_link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--accent-primary)] hover:text-white
                  flex items-center justify-center text-[var(--text-tertiary)] border border-[var(--border-color)] transition-all text-xs">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-medium text-[var(--text-tertiary)]">
            <span className="flex items-center gap-0.5"><FontAwesomeIcon icon={faEye} />{formatCount(p.views_count)}</span>
            <span className="flex items-center gap-0.5"><FontAwesomeIcon icon={faThumbsUp} />{formatCount(p.likes_count)}</span>
          </div>
          <FontAwesomeIcon icon={faArrowRight}
            className="text-[9px] text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors group-hover:translate-x-0.5 transform duration-200" />
        </div>
      </div>

      <Link to={`/projects/${p.slug}`} title={p.title}
        className="absolute inset-0 z-[1]" aria-label={`View project: ${p.title}`} />
    </motion.article>
  )
}

export default function ProjectCard({ project, index = 0, view = 'grid' }) {
  if (view === 'list') return <ListCard p={project} i={index} />
  return <GridCard p={project} i={index} />
}
