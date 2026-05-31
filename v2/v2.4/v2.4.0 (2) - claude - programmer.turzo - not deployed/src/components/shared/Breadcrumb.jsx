// ============================================================
// Breadcrumb.jsx — v2.4.0
// Simple page breadcrumb: Home > Section > Page
// ============================================================

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {Array<{label: string, href?: string}>} items
 * e.g. [{ label:'Projects', href:'/projects' }, { label:'Linkivo' }]
 */
export default function Breadcrumb({ items = [] }) {
  const crumbs = [{ label: 'Home', href: '/' }, ...items]

  return (
    <motion.nav
      className="bc-nav"
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <ol className="bc-list">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1
          const isHome = idx === 0
          return (
            <li key={idx} className="bc-item">
              {idx > 0 && (
                <FontAwesomeIcon icon={faChevronRight} className="bc-sep" aria-hidden/>
              )}
              {isLast ? (
                <span className="bc-current" aria-current="page">
                  {isHome && <FontAwesomeIcon icon={faHouse} className="bc-home-icon"/>}
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.href} className="bc-link">
                  {isHome && <FontAwesomeIcon icon={faHouse} className="bc-home-icon"/>}
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      <style>{`
        .bc-nav { padding: .6rem 0; }
        .bc-list { display: flex; align-items: center; flex-wrap: wrap; gap: .25rem; list-style: none; margin: 0; padding: 0; }
        .bc-item { display: flex; align-items: center; gap: .25rem; }
        .bc-sep { font-size: .55rem; color: var(--text-tertiary); margin: 0 .1rem; }
        .bc-link {
          font-size: .78rem; font-weight: 500; color: var(--text-secondary);
          text-decoration: none; transition: color .15s; display: flex; align-items: center; gap: .3rem;
        }
        .bc-link:hover { color: var(--accent-primary); }
        .bc-current { font-size: .78rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: .3rem; }
        .bc-home-icon { font-size: .7rem; }
      `}</style>
    </motion.nav>
  )
}
