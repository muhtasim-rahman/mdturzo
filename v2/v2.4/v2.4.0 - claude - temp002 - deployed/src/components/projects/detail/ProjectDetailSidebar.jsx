// ProjectDetailSidebar.jsx — v2.4.0
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub as faGithubBrand, faShare, faFlag,
  faArrowUpRightFromSquare, faCalendar, faUsers, faBriefcase,
  faEye, faTag, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import LikeDislikeBar from '../../shared/LikeDislikeBar.jsx'
import RatingWidget   from '../../shared/RatingWidget.jsx'
import ShareModal     from '../../shared/ShareModal.jsx'
import ReportModal    from '../../shared/ReportModal.jsx'
import { SITE_CONFIG } from '../../../config/site.config.js'

function SideCard({ title, children }) {
  return (
    <div className="pds-card">
      {title && <div className="pds-card-title">{title}</div>}
      {children}
    </div>
  )
}

export default function ProjectDetailSidebar({ project, userReaction, userRating }) {
  const [shareOpen,  setShareOpen]  = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  if (!project) return null
  const accent    = project.accent_color || project.accent || 'var(--accent-primary)'
  const shareUrl  = `${SITE_CONFIG.siteURL}/projects/${project.slug}`

  const links = [
    { href: project.github_link, label: 'GitHub',      icon: faGithub },
    { href: project.live_link,   label: 'Live Demo',   icon: faArrowUpRightFromSquare },
    { href: project.docs_link,   label: 'Docs',        icon: faLayerGroup },
    { href: project.figma_link,  label: 'Figma',       icon: faLayerGroup },
    { href: project.npm_link,    label: 'npm Package', icon: faLayerGroup },
    { href: project.youtube_link,label: 'YouTube',     icon: faLayerGroup },
    { href: project.pdf_link,    label: 'PDF / Report',icon: faLayerGroup },
  ].filter(l => l.href)

  return (
    <aside className="pds-aside">
      {/* Interactions */}
      <SideCard title="Interactions">
        <div className="pds-interactions" id="interactions">
          {project.likes_enabled && (
            <div className="pds-row">
              <span className="pds-row-l">Like / Dislike</span>
              <LikeDislikeBar
                contentType="project" contentId={project.slug}
                initialLikes={project.likes_count} initialDislikes={project.dislikes_count}
                userReaction={userReaction} enabled={project.likes_enabled}
              />
            </div>
          )}
          {project.ratings_enabled && (
            <div className="pds-row pds-row--col">
              <span className="pds-row-l">Your Rating</span>
              <RatingWidget
                projectId={project.id}
                initialAvg={project.rating_avg} initialCount={project.rating_count}
                userRating={userRating} enabled={project.ratings_enabled}
              />
            </div>
          )}
          <div className="pds-action-row">
            <button className="pds-action-btn" onClick={() => setShareOpen(true)}>
              <FontAwesomeIcon icon={faShare}/> Share
            </button>
            {project.report_enabled && (
              <button className="pds-action-btn pds-action-btn--muted" onClick={() => setReportOpen(true)}>
                <FontAwesomeIcon icon={faFlag}/> Report
              </button>
            )}
          </div>
        </div>
      </SideCard>

      {/* Quick stats */}
      <SideCard title="Details">
        <div className="pds-details">
          {project.views_count > 0 && (
            <div className="pds-detail-row">
              <FontAwesomeIcon icon={faEye} className="pds-di"/>
              <span className="pds-dl">Views</span>
              <span className="pds-dv">{project.views_count.toLocaleString()}</span>
            </div>
          )}
          {project.start_date && (
            <div className="pds-detail-row">
              <FontAwesomeIcon icon={faCalendar} className="pds-di"/>
              <span className="pds-dl">Started</span>
              <span className="pds-dv">{new Date(project.start_date).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</span>
            </div>
          )}
          {project.end_date && !project.is_ongoing && (
            <div className="pds-detail-row">
              <FontAwesomeIcon icon={faCalendar} className="pds-di"/>
              <span className="pds-dl">Completed</span>
              <span className="pds-dv">{new Date(project.end_date).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</span>
            </div>
          )}
          {project.team_size && (
            <div className="pds-detail-row">
              <FontAwesomeIcon icon={faUsers} className="pds-di"/>
              <span className="pds-dl">Team</span>
              <span className="pds-dv">{project.team_size === 1 ? 'Solo' : `${project.team_size} people`}</span>
            </div>
          )}
          {project.role && (
            <div className="pds-detail-row">
              <FontAwesomeIcon icon={faBriefcase} className="pds-di"/>
              <span className="pds-dl">Role</span>
              <span className="pds-dv">{project.role}</span>
            </div>
          )}
          {project.license && (
            <div className="pds-detail-row">
              <FontAwesomeIcon icon={faLayerGroup} className="pds-di"/>
              <span className="pds-dl">License</span>
              <span className="pds-dv">{project.license}</span>
            </div>
          )}
        </div>
      </SideCard>

      {/* Links */}
      {links.length > 0 && (
        <SideCard title="Links">
          <div className="pds-links">
            {links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="pds-link">
                <FontAwesomeIcon icon={l.icon} className="pds-link-icon"/>
                {l.label}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="pds-link-ext"/>
              </a>
            ))}
          </div>
        </SideCard>
      )}

      {/* Tags */}
      {project.tags?.length > 0 && (
        <SideCard title="Tags">
          <div className="pds-tags">
            {project.tags.map(t => (
              <Link key={t} to={`/projects?q=${encodeURIComponent(t)}`} className="pds-tag">
                <FontAwesomeIcon icon={faTag}/> {t}
              </Link>
            ))}
          </div>
        </SideCard>
      )}

      <ShareModal isOpen={shareOpen} onClose={()=>setShareOpen(false)} url={shareUrl} title={project.title} description={project.short_description} thumbnail={project.thumbnail_url} slug={project.slug}/>
      <ReportModal isOpen={reportOpen} onClose={()=>setReportOpen(false)} contentType="project" contentId={project.slug}/>

      <style>{`
        .pds-aside { display: flex; flex-direction: column; gap: 1rem; }
        .pds-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 1.1rem; }
        .pds-card-title { font-size: .75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .6px; margin-bottom: .9rem; }
        .pds-interactions { display: flex; flex-direction: column; gap: .9rem; }
        .pds-row { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
        .pds-row--col { flex-direction: column; align-items: flex-start; }
        .pds-row-l { font-size: .82rem; color: var(--text-secondary); font-weight: 500; flex-shrink: 0; }
        .pds-action-row { display: flex; gap: 6px; padding-top: .25rem; border-top: 1px solid var(--border-color); }
        .pds-action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: .4rem; padding: .45rem .75rem; border-radius: 9px; background: var(--bg-surface-2); border: 1px solid var(--border-color); font-size: .82rem; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); font-weight: 600; }
        .pds-action-btn:hover { background: var(--bg-surface-3); color: var(--text-primary); }
        .pds-action-btn--muted:hover { color: #ef4444; border-color: rgba(239,68,68,.3); background: rgba(239,68,68,.06); }
        .pds-details { display: flex; flex-direction: column; gap: 0; }
        .pds-detail-row { display: flex; align-items: center; gap: .6rem; padding: .45rem 0; border-bottom: 1px solid var(--border-color); }
        .pds-detail-row:last-child { border-bottom: none; }
        .pds-di { color: var(--text-tertiary); font-size: .8rem; width: 14px; flex-shrink: 0; }
        .pds-dl { font-size: .82rem; color: var(--text-tertiary); flex: 1; }
        .pds-dv { font-size: .82rem; color: var(--text-primary); font-weight: 600; }
        .pds-links { display: flex; flex-direction: column; gap: 4px; }
        .pds-link { display: flex; align-items: center; gap: .5rem; padding: .5rem .6rem; border-radius: 9px; text-decoration: none; color: var(--text-secondary); font-size: .85rem; transition: all var(--transition-fast); border: 1px solid transparent; }
        .pds-link:hover { background: var(--bg-surface-2); color: var(--text-primary); border-color: var(--border-color); }
        .pds-link-icon { color: var(--text-tertiary); width: 14px; font-size: .8rem; }
        .pds-link-ext { margin-left: auto; font-size: .65rem; color: var(--text-tertiary); opacity: 0; transition: opacity var(--transition-fast); }
        .pds-link:hover .pds-link-ext { opacity: 1; }
        .pds-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .pds-tag { display: inline-flex; align-items: center; gap: .3rem; padding: .25rem .65rem; border-radius: 99px; background: var(--bg-surface-2); border: 1px solid var(--border-color); font-size: .75rem; color: var(--text-tertiary); text-decoration: none; transition: all var(--transition-fast); }
        .pds-tag:hover { color: var(--accent-primary); border-color: var(--accent-primary); background: var(--accent-light); }
      `}</style>
    </aside>
  )
}
