// ============================================================
// Breadcrumb — v2.4.0
// Reusable breadcrumb for all detail pages
// ============================================================

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

/**
 * <Breadcrumb items={[
 *   { label: 'Projects', to: '/projects' },
 *   { label: 'Linkivo' }
 * ]} />
 */
export function Breadcrumb({ items = [] }) {
  return (
    <motion.nav
      className="bcr-wrap"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      aria-label="Breadcrumb"
    >
      <ol className="bcr-list">
        <li className="bcr-item">
          <Link to="/" className="bcr-link">
            <FontAwesomeIcon icon={faHouse} className="text-[11px]" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="bcr-item">
            <FontAwesomeIcon icon={faChevronRight} className="bcr-sep" />
            {item.to ? (
              <Link to={item.to} className="bcr-link">{item.label}</Link>
            ) : (
              <span className="bcr-current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>

      <style>{`
        .bcr-wrap {
          padding: 0.6rem 0;
          margin-bottom: 1.25rem;
        }
        .bcr-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .bcr-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .bcr-sep {
          font-size: 9px;
          color: var(--text-tertiary);
          margin: 0 0.1rem;
        }
        .bcr-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s;
          white-space: nowrap;
        }
        .bcr-link:hover {
          color: var(--accent-primary);
        }
        .bcr-current {
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
          white-space: nowrap;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </motion.nav>
  )
}
