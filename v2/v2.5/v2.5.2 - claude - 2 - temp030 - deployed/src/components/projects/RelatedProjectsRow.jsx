// RelatedProjectsRow.jsx — v2.4.3
// Horizontal scrollable related projects row
// - Single row on all screen sizes
// - Arrow buttons appear when overflow exists (PC)
// - Touch scroll on mobile/tablet
// - Compact card design
// - "View All Projects" end card

import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft, faChevronRight, faFolderOpen, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

// Compact card for related row
function RelatedCard({ project, idx }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[168px] sm:w-[188px]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}>
      <Link
        to={`/project/${project.slug}`}
        title={project.title}
        className="group block bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

        {/* Thumbnail */}
        <div className="relative h-24 overflow-hidden bg-[var(--bg-surface-2)]">
          {project.thumbnail_url ? (
            <>
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FontAwesomeIcon icon={faFolderOpen} className="text-xl text-[var(--text-tertiary)]" />
            </div>
          )}
          <div className="absolute bottom-1.5 left-1.5">
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide bg-[var(--accent-primary)]/85 text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="px-2.5 py-2">
          <p className="text-[11px] font-bold text-[var(--text-primary)] line-clamp-1 leading-snug">
            {project.title}
          </p>
          {project.short_description && (
            <p className="text-[9px] text-[var(--text-tertiary)] mt-0.5 line-clamp-2 leading-relaxed">
              {project.short_description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// "View all" end card
function ViewAllCard() {
  return (
    <div className="flex-shrink-0 w-[120px] sm:w-[136px] flex items-stretch">
      <Link
        to="/projects"
        className="group flex flex-col items-center justify-center w-full bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 rounded-xl transition-all duration-200 gap-2 p-3 text-center">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] group-hover:bg-[var(--accent-primary)] flex items-center justify-center transition-colors">
          <FontAwesomeIcon icon={faArrowRight} className="text-sm text-[var(--accent-primary)] group-hover:text-white transition-colors" />
        </div>
        <span className="text-[10px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
          All Projects
        </span>
      </Link>
    </div>
  )
}

// Skeleton cards
function SkeletonCards() {
  return Array.from({ length: 4 }, (_, i) => (
    <div key={i} className="flex-shrink-0 w-[168px] rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="sk h-24 w-full" style={{ animationDelay: `${i * 0.06}s` }} />
      <div className="p-2.5 space-y-1.5">
        <div className="sk h-3 w-3/4 rounded" />
        <div className="sk h-2.5 w-full rounded" />
      </div>
    </div>
  ))
}

export default function RelatedProjectsRow({ items = [], loading = false, title = 'You Might Also Like' }) {
  const scrollRef    = useRef(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows, items])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  if (!loading && items.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[var(--accent-light)] flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowRight} className="text-[8px] text-[var(--accent-primary)]" />
          </span>
          {title}
        </h3>

        {/* PC arrow navigation */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all text-xs">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canRight}
            className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all text-xs">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div className="relative">
        {/* Left fade */}
        {canLeft && (
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10 pointer-events-none rounded-l-xl" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-none pb-1 scroll-smooth touch-pan-x">
          {loading ? (
            <SkeletonCards />
          ) : (
            <>
              {items.map((p, i) => (
                <RelatedCard key={p.id || p.slug || i} project={p} idx={i} />
              ))}
              <ViewAllCard />
            </>
          )}
        </div>

        {/* Right fade */}
        {canRight && (
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10 pointer-events-none rounded-r-xl" />
        )}
      </div>

      {/* Mobile arrow hints */}
      {!loading && items.length > 2 && (
        <div className="flex sm:hidden items-center justify-center gap-3 pt-1">
          <button
            onClick={() => scroll(-1)}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <FontAwesomeIcon icon={faChevronLeft} className="text-[9px]" /> Prev
          </button>
          <button
            onClick={() => scroll(1)}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
            Next <FontAwesomeIcon icon={faChevronRight} className="text-[9px]" />
          </button>
        </div>
      )}
    </div>
  )
}
