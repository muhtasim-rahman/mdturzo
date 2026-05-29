// ============================================================
// AboutBreadcrumb.jsx — v2.3.4
// Sticky full-width breadcrumb bar pinned below navbar.
// Shows on all screen sizes. Home > About
// ============================================================

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'

export default function AboutBreadcrumb() {
  return (
    <div className="ab-breadcrumb-bar">
      <div className="ab-breadcrumb-inner">
        <Link to="/" className="ab-bc-item ab-bc-link">
          <FontAwesomeIcon icon={faHouse} className="ab-bc-home-icon" />
          <span>Home</span>
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="ab-bc-chevron" />
        <span className="ab-bc-item ab-bc-current">About</span>
      </div>

      <style>{`
        .ab-breadcrumb-bar {
          position: sticky;
          top: var(--navbar-h, 68px);
          z-index: 40;
          width: 100%;
          height: 36px;
          background: var(--bg-page);
          border-bottom: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
        }
        [data-theme=dark] .ab-breadcrumb-bar {
          background: rgba(2, 6, 23, 0.82);
        }
        [data-theme=light] .ab-breadcrumb-bar {
          background: rgba(248, 250, 252, 0.88);
        }
        .ab-breadcrumb-inner {
          display: flex;
          align-items: center;
          gap: .45rem;
          max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          width: 100%;
        }
        .ab-bc-item {
          display: inline-flex;
          align-items: center;
          gap: .32rem;
          font-size: .72rem;
          font-family: var(--font-mono);
          font-weight: 500;
        }
        .ab-bc-link {
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color .15s;
        }
        .ab-bc-link:hover { color: var(--accent-primary); }
        .ab-bc-home-icon { font-size: .6rem; }
        .ab-bc-chevron {
          font-size: .48rem;
          color: var(--text-tertiary);
          opacity: .5;
        }
        .ab-bc-current {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  )
}
