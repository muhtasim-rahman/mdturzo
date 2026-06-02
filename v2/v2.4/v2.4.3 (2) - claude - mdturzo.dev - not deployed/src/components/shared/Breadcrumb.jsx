// Breadcrumb.jsx — v2.4.2
// Fix: last item (project name) now properly truncates with responsive max-width
// and tooltip (title attr) to show full name on hover

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

/**
 * Breadcrumb nav
 * items: [{ label, href? }, ...]
 * Last item has no href (current page) — auto-truncated
 */
export default function Breadcrumb({ items = [] }) {
  const all = [{ label: 'Home', href: '/' }, ...items]

  return (
    <motion.nav
      aria-label="breadcrumb"
      className="breadcrumb-nav overflow-hidden"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <ol className="flex items-center gap-1 flex-nowrap overflow-hidden">
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={i} className={`flex items-center gap-1 ${isLast ? 'min-w-0 overflow-hidden' : 'flex-shrink-0'}`}>
              {i > 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[var(--text-tertiary)] text-[9px] flex-shrink-0"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="bc-link flex items-center gap-1.5 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors text-xs font-medium whitespace-nowrap flex-shrink-0">
                  {i === 0 && <FontAwesomeIcon icon={faHouse} className="text-[10px]" />}
                  {item.label}
                </Link>
              ) : (
                <span
                  title={item.label}
                  className="flex items-center gap-1.5 text-[var(--text-secondary)] text-xs font-semibold truncate min-w-0">
                  {i === 0 && <FontAwesomeIcon icon={faHouse} className="text-[10px] flex-shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
