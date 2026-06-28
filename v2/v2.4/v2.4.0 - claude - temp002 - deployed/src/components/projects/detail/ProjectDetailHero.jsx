// ProjectDetailHero.jsx — v2.4.0
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub, faChevronRight, faArrowUpRightFromSquare,
  faBook, faFigma, faNpm, faYoutube
} from '@fortawesome/free-solid-svg-icons'
import { faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import ShareModal from '../../shared/ShareModal.jsx'
import { SITE_CONFIG } from '../../../config/site.config.js'

const LINK_CONFIGS = [
  { key: 'github_link',  label: 'GitHub',    icon: faGithubBrand, primary: false },
  { key: 'live_link',    label: 'Live Demo', icon: faArrowUpRightFromSquare, primary: true },
  { key: 'docs_link',    label: 'Docs',      icon: faBook,         primary: false },
  { key: 'figma_link',   label: 'Figma',     icon: faFigma,        primary: false },
  { key: 'npm_link',     label: 'npm',       icon: faNpm,          primary: false },
  { key: 'youtube_link', label: 'YouTube',   icon: faYoutube,      primary: false },
]

export default function ProjectDetailHero({ project }) {
  const [shareOpen, setShareOpen] = useState(false)
  if (!project) return null
  const accent = project.accent_color || project.accent || 'var(--accent-primary)'
  const shareUrl = `${SITE_CONFIG.siteURL}/projects/${project.slug}`

  const hasBanner    = !!project.banner_url
  const hasGradient  = !hasBanner && project.gradient_from
  const bannerStyle  = hasBanner
    ? { backgroundImage: `url(${project.banner_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : hasGradient
      ? { background: `linear-gradient(135deg, ${project.gradient_from}, ${project.gradient_to || accent})` }
      : { background: `linear-gradient(135deg, ${accent}22, ${accent}08)` }

  const links = LINK_CONFIGS.filter(l => project[l.key])

  return (
    <div className="pdh-wrap">
      {/* Banner */}
      <motion.div
        className="pdh-banner"
        style={bannerStyle}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {hasBanner && <div className="pdh-banner-overlay"/>}
        <div className="pdh-banner-inner">
          {/* Breadcrumb */}
          <div className="pdh-breadcrumb">
            <Link to="/" className="pdh-bc-link">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} className="pdh-bc-sep"/>
            <Link to="/projects" className="pdh-bc-link">Projects</Link>
            <FontAwesomeIcon icon={faChevronRight} className="pdh-bc-sep"/>
            <span className="pdh-bc-cur">{project.short_name || project.title}</span>
          </div>

          {/* Badges row */}
          <div className="pdh-badges">
            {project.category && (
              <span className="pdh-badge" style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}40` }}>
                {project.category}
              </span>
            )}
            {project.is_wip && <span className="pdh-badge pdh-badge--wip">Work in Progress</span>}
            {project.is_ongoing && <span className="pdh-badge pdh-badge--live">● Active</span>}
            {project.is_open_source && <span className="pdh-badge pdh-badge--oss">Open Source</span>}
            {project.version && <span className="pdh-badge pdh-badge--ver">{project.version}</span>}
          </div>

          {/* Title + tagline */}
          <motion.h1
            className="pdh-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          {project.tagline && (
            <motion.p
              className="pdh-tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              {project.tagline}
            </motion.p>
          )}

          {/* Links row */}
          {links.length > 0 && (
            <motion.div
              className="pdh-links"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {links.map(l => (
                <a
                  key={l.key}
                  href={project[l.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pdh-link ${l.primary ? 'pdh-link--primary' : 'pdh-link--ghost'}`}
                  style={l.primary ? { background: accent, borderColor: accent } : {}}
                >
                  <FontAwesomeIcon icon={l.icon}/> {l.label}
                </a>
              ))}
              <button
                className="pdh-link pdh-link--ghost pdh-share"
                onClick={() => setShareOpen(true)}
                title="Share this project"
              >
                <FontAwesomeIcon icon={faShare}/> Share
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats strip */}
      <div className="pdh-stats">
        {project.views_count > 0 && (
          <div className="pdh-stat"><span className="pdh-stat-n">{project.views_count.toLocaleString()}</span><span className="pdh-stat-l">Views</span></div>
        )}
        {project.likes_count > 0 && (
          <div className="pdh-stat"><span className="pdh-stat-n">{project.likes_count}</span><span className="pdh-stat-l">Likes</span></div>
        )}
        {project.rating_avg > 0 && (
          <div className="pdh-stat">
            <span className="pdh-stat-n">★ {parseFloat(project.rating_avg).toFixed(1)}</span>
            <span className="pdh-stat-l">{project.rating_count} ratings</span>
          </div>
        )}
        {project.comments_count > 0 && (
          <div className="pdh-stat"><span className="pdh-stat-n">{project.comments_count}</span><span className="pdh-stat-l">Comments</span></div>
        )}
        {project.start_date && (
          <div className="pdh-stat">
            <span className="pdh-stat-n">{new Date(project.start_date).getFullYear()}</span>
            <span className="pdh-stat-l">{project.is_ongoing ? 'Present' : (project.end_date ? new Date(project.end_date).getFullYear() : 'Completed')}</span>
          </div>
        )}
        {project.team_size && (
          <div className="pdh-stat"><span className="pdh-stat-n">{project.team_size === 1 ? 'Solo' : project.team_size}</span><span className="pdh-stat-l">{project.role || 'Developer'}</span></div>
        )}
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        title={project.title}
        description={project.short_description}
        thumbnail={project.thumbnail_url || project.og_image_url}
        slug={project.slug}
      />

      <style>{`
        .pdh-wrap { margin-bottom: 2.5rem; }
        .pdh-banner {
          border-radius: var(--radius-2xl); overflow: hidden;
          min-height: 260px; position: relative;
          display: flex; align-items: flex-end;
          margin-bottom: 0;
        }
        .pdh-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.2) 60%, transparent 100%);
        }
        .pdh-banner-inner {
          position: relative; z-index: 1;
          padding: 2rem 2rem 1.75rem;
          width: 100%;
        }
        .pdh-breadcrumb {
          display: flex; align-items: center; gap: .4rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .pdh-bc-link {
          font-size: .8rem; color: rgba(255,255,255,.65);
          text-decoration: none; transition: color var(--transition-fast);
        }
        .pdh-bc-link:hover { color: #fff; }
        .pdh-bc-sep { font-size: .65rem; color: rgba(255,255,255,.4); }
        .pdh-bc-cur { font-size: .8rem; color: rgba(255,255,255,.9); font-weight: 600; }
        .pdh-badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: .75rem; }
        .pdh-badge {
          display: inline-flex; align-items: center;
          padding: 2px 10px; border-radius: 99px;
          font-size: .72rem; font-weight: 700; letter-spacing: .3px;
          border: 1px solid transparent;
        }
        .pdh-badge--wip  { background: rgba(234,179,8,.2); color: #fcd34d; border-color: rgba(234,179,8,.4); }
        .pdh-badge--live { background: rgba(34,197,94,.2); color: #86efac; border-color: rgba(34,197,94,.4); }
        .pdh-badge--oss  { background: rgba(168,85,247,.2); color: #d8b4fe; border-color: rgba(168,85,247,.4); }
        .pdh-badge--ver  { background: rgba(255,255,255,.1); color: rgba(255,255,255,.8); border-color: rgba(255,255,255,.2); font-family: var(--font-mono); }
        .pdh-title {
          font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800;
          color: #fff; line-height: 1.15; letter-spacing: -.03em;
          margin: 0 0 .5rem; font-family: var(--font-display);
          text-shadow: 0 2px 12px rgba(0,0,0,.3);
        }
        .pdh-tagline {
          font-size: 1rem; color: rgba(255,255,255,.78);
          margin: 0 0 1.25rem; max-width: 600px; line-height: 1.5;
        }
        .pdh-links { display: flex; gap: 8px; flex-wrap: wrap; }
        .pdh-link {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .5rem 1rem; border-radius: 10px;
          font-size: .875rem; font-weight: 600;
          text-decoration: none; cursor: pointer;
          transition: all var(--transition-fast);
          border: 1px solid;
          white-space: nowrap;
        }
        .pdh-link--primary { color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,.2); }
        .pdh-link--primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .pdh-link--ghost {
          background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.25);
          color: rgba(255,255,255,.9); backdrop-filter: blur(6px);
        }
        .pdh-link--ghost:hover { background: rgba(255,255,255,.2); color: #fff; }
        .pdh-share { background: rgba(255,255,255,.1) !important; }

        /* Stats strip */
        .pdh-stats {
          display: flex; gap: 0;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-top: none;
          border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
          overflow: hidden;
        }
        .pdh-stat {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; padding: .9rem .5rem;
          border-right: 1px solid var(--border-color);
          min-width: 0;
        }
        .pdh-stat:last-child { border-right: none; }
        .pdh-stat-n { font-size: 1rem; font-weight: 700; color: var(--text-primary); font-family: var(--font-display); }
        .pdh-stat-l { font-size: .72rem; color: var(--text-tertiary); margin-top: 1px; white-space: nowrap; }
        @media (max-width: 600px) {
          .pdh-banner-inner { padding: 1.5rem 1.25rem 1.25rem; }
          .pdh-stats { flex-wrap: wrap; }
          .pdh-stat { min-width: 50%; border-bottom: 1px solid var(--border-color); }
        }
      `}</style>
    </div>
  )
}
