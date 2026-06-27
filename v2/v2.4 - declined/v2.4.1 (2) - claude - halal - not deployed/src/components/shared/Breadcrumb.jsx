// Breadcrumb.jsx — v2.4.0
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

/**
 * Breadcrumb nav
 * items: [{ label, href? }, ...]
 * Last item has no href (current page)
 */
export default function Breadcrumb({ items = [] }) {
  const all = [{ label: 'Home', href: '/' }, ...items]

  return (
    <motion.nav
      aria-label="breadcrumb"
      className="breadcrumb-nav"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <ol className="flex items-center flex-wrap gap-1">
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[var(--text-tertiary)] text-[10px]"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="bc-link flex items-center gap-1.5 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors text-sm">
                  {i === 0 && <FontAwesomeIcon icon={faHouse} className="text-[11px]" />}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm font-medium truncate max-w-[200px]">
                  {i === 0 && <FontAwesomeIcon icon={faHouse} className="text-[11px]" />}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
