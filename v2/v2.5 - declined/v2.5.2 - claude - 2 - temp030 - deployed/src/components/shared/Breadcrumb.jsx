// Breadcrumb.jsx — v2.4.2
// Fix: project name in last crumb now properly truncates with ellipsis
// Required: min-w-0 on li + max-w + truncate on span
// items: [{ label, href? }, ...]

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export default function Breadcrumb({ items = [] }) {
  const all = [{ label: 'Home', href: '/' }, ...items]

  return (
    <motion.nav
      aria-label="breadcrumb"
      className="breadcrumb-nav"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <ol className="flex items-center gap-0.5 overflow-hidden">
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <li
              key={i}
              className={`flex items-center gap-0.5 min-w-0 ${isLast ? 'flex-shrink min-w-0' : 'flex-shrink-0'}`}>
              {i > 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[var(--text-tertiary)] text-[9px] flex-shrink-0 mx-0.5"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="bc-link flex items-center gap-1.5 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors text-xs whitespace-nowrap">
                  {i === 0 && <FontAwesomeIcon icon={faHouse} className="text-[10px]" />}
                  {i !== 0 && item.label}
                </Link>
              ) : (
                <span
                  className="flex items-center gap-1.5 text-[var(--text-secondary)] text-xs font-medium"
                  style={{ minWidth: 0 }}>
                  {i === 0 && <FontAwesomeIcon icon={faHouse} className="text-[10px] flex-shrink-0" />}
                  {/* Last crumb truncates to prevent overflow */}
                  <span
                    className={`${isLast ? 'truncate max-w-[140px] sm:max-w-[220px] md:max-w-[320px]' : 'whitespace-nowrap'}`}
                    title={isLast ? item.label : undefined}>
                    {item.label}
                  </span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
