// NoProjectsPlaceholder.jsx — v2.4.6c
// One component. Shown identically in BOTH:
//   - Home page → RecentProjects section
//   - Projects page → project grid area
//
// Layout (centered inside a full-width muted card):
//   icon  →  title  →  description  →  action button
//
// Props:
//   hasFilters  {bool}    — search/filter active (changes copy + button)
//   query       {string}  — current search term (shown in title)
//   onClear     {fn}      — called when "Clear filters" pressed
//   onRetry     {fn}      — called when "Reload" pressed (default: window.location.reload)

import { motion }             from 'framer-motion'
import { Link }               from 'react-router-dom'
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome'
import {
  faFolderOpen, faArrowsRotate, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

// Stagger helper
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function NoProjectsPlaceholder({
  hasFilters = false,
  query      = '',
  onClear,
  onRetry,
}) {
  const isFiltered = hasFilters && !!query
  const Icon = isFiltered ? faMagnifyingGlass : faFolderOpen

  const title = isFiltered
    ? `No results for "${query}"`
    : hasFilters
    ? 'No results found'
    : 'No projects found'

  const description = hasFilters
    ? 'Try a different keyword or reset your filters.'
    : 'Projects will appear here once they\'re published.'

  const handleRetry = onRetry ?? (() => window.location.reload())

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {/* ── Outer card ── */}
      <div
        className="
          w-full flex flex-col items-center justify-center gap-5 text-center
          rounded-2xl px-6 py-14
          bg-[var(--bg-surface-2)]/40
          border border-dashed border-[var(--border-color)]
        "
        style={{ minHeight: 300 }}
      >

        {/* Icon block */}
        <motion.div {...fadeUp(0.06)}>
          <div className="
            relative w-16 h-16 rounded-2xl mx-auto
            bg-[var(--bg-surface)] border border-[var(--border-color)]
            flex items-center justify-center shadow-sm
          ">
            <FontAwesomeIcon
              icon={Icon}
              className="text-2xl text-[var(--text-tertiary)]"
            />
            {/* Decorative dot */}
            <span className="
              absolute -top-1.5 -right-1.5
              w-4 h-4 rounded-full
              bg-[var(--accent-light)] border-2 border-[var(--bg-surface)]
              flex items-center justify-center
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div {...fadeUp(0.13)} className="space-y-2">
          <p className="text-base font-bold text-[var(--text-primary)] leading-snug">
            {title}
          </p>
          <p className="text-sm text-[var(--text-tertiary)] max-w-[260px] mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Action button */}
        <motion.div {...fadeUp(0.2)}>
          {hasFilters && onClear ? (
            <button
              onClick={onClear}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-[var(--bg-surface)] border border-[var(--border-color)]
                hover:border-[var(--border-strong)]
                text-sm font-semibold text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]
                transition-all duration-200 shadow-sm
              "
            >
              <FontAwesomeIcon icon={faArrowsRotate} className="text-xs" />
              Clear filters
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-[var(--bg-surface)] border border-[var(--border-color)]
                hover:border-[var(--border-strong)]
                text-sm font-semibold text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]
                transition-all duration-200 shadow-sm
              "
            >
              <FontAwesomeIcon icon={faArrowsRotate} className="text-xs" />
              Reload page
            </button>
          )}
        </motion.div>

      </div>
    </motion.div>
  )
}
