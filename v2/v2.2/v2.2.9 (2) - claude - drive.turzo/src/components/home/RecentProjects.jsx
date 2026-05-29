// RecentProjects.jsx — v2.2.9
// CHANGES:
//   • Minimal professional card redesign: no thumbnail, clean layout
//   • Click/active effect on cards
//   • Removed unused useState from ProjectCard
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import { SkeletonCard } from '../ui/Skeleton.jsx'

const FALLBACK = [
  { id:'linkivo',   slug:'linkivo',           title:'Linkivo — Smart Link Manager',  short_description:'PWA for intelligent link management with weighted discovery and GSAP animations.',   thumbnail_url:null, github_link:null,                                      live_link:null,                                          tags:['PWA','Firebase','GSAP'],     category:'Web App',     accent:'#3B82F6' },
  { id:'qr-prism',  slug:'qr-prism',          title:'QR Prism',                      short_description:'Feature-rich PWA for QR generation, scanning, batch processing with cloud storage.',thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/qr-prism',live_link:'https://muhtasim-rahman.github.io/qr-prism',   tags:['PWA','Firebase','QR'],       category:'Utility',     accent:'#10B981' },
  { id:'ufmt',      slug:'ufmt-ssc26',         title:'FMT Tracker Pro — SSC-26',      short_description:'Merit tracking dashboard for SSC-26 students powered by Google Sheets.',             thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/UFMT-SSC26',live_link:'https://muhtasim-rahman.github.io/UFMT-SSC26/',tags:['Education','Sheets'],        category:'Education',   accent:'#F59E0B' },
  { id:'notif',     slug:'notification-panel', title:'Notification Panel',            short_description:'Plug-and-play notification panel powered by Google Sheets for any website.',         thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/notification-panel',live_link:null,                                    tags:['Component','Open Source'],   category:'UI Component',accent:'#EC4899' },
  { id:'exporter',  slug:'exporter-pro',       title:'Project Exporter Pro',          short_description:'JS export engine: PNG, JPG, SVG, PDF with Shadow DOM isolation.',                   thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/exporter-pro',live_link:null,                                         tags:['Library','Shadow DOM'],      category:'Dev Tool',    accent:'#A855F7' },
  { id:'halal',     slug:'halal',              title:'Halal — World of Muslims',      short_description:'Interactive Islamic resource covering the Five Pillars of Islam.',                  thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/halal',      live_link:'https://muhtasim-rahman.github.io/halal',      tags:['Islamic','Educational'],    category:'Islamic',     accent:'#06B6D4' },
]

const CAT_COLORS = {
  'Web App':'#3B82F6','Utility':'#10B981','Education':'#F59E0B',
  'UI Component':'#EC4899','Dev Tool':'#A855F7','Islamic':'#06B6D4','default':'#64748B'
}

function ProjectCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default

  return (
    <motion.div
      className="proj-card group"
      style={{ '--c': color }}
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.42, delay:i*.065 }}>

      {/* Top accent line */}
      <div className="proj-card-accent-line" />

      {/* Content */}
      <div className="proj-card-body">
        {/* Header row: category + external actions */}
        <div className="proj-card-header">
          <span className="proj-cat-badge" style={{'--c':color}}>
            {p.category}
          </span>
          <div className="proj-card-actions">
            {p.github_link && (
              <a href={p.github_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="proj-action-btn"
                aria-label="GitHub repository">
                <FontAwesomeIcon icon={faGithub} className="text-[11px]"/>
              </a>
            )}
            {p.live_link && (
              <a href={p.live_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="proj-action-btn"
                aria-label="Live demo">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]"/>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="proj-card-title">
          {p.title}
        </h3>

        {/* Description */}
        <p className="proj-card-desc">
          {p.short_description}
        </p>

        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="proj-card-tags">
            {p.tags.slice(0,3).map(t => (
              <span key={t} className="proj-tag">{t}</span>
            ))}
            {p.tags.length > 3 && <span className="proj-tag">+{p.tags.length-3}</span>}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="proj-card-footer" style={{'--c':color}}>
        <span className="proj-card-footer-dot" />
        <span className="proj-card-footer-lbl">View details</span>
        <FontAwesomeIcon icon={faArrowRight} className="proj-card-footer-arrow"/>
      </div>

      {/* Full-card link overlay */}
      <Link to={`/projects/${p.slug}`} className="proj-card-overlay" aria-label={`View ${p.title}`}/>
    </motion.div>
  )
}

export default function RecentProjects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading ] = useState(true)

  useEffect(() => {
    getFeaturedProjects()
      .then(d => setProjects(d?.length ? d : FALLBACK))
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section" id="projects-mini">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">My Work</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Featured Projects</h2>
          </motion.div>
          <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group">
              All projects <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
            </Link>
          </motion.div>
        </div>

        <div className="proj-grid">
          {loading
            ? Array.from({length:6},(_,i) => <SkeletonCard key={i}/>)
            : projects.map((p,i) => <ProjectCard key={p.id} p={p} i={i}/>)
          }
        </div>

        <motion.div className="flex justify-center mt-10"
          initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.2}}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all active:scale-[.97] group">
            View All Projects
            <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
          </Link>
        </motion.div>
      </div>

      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media(max-width:1023px){ .proj-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:639px){  .proj-grid { grid-template-columns: 1fr; } }
        @media(max-width:639px){ .proj-grid > *:nth-child(n+4){ display:none; } }
        @media(min-width:640px) and (max-width:1023px){ .proj-grid > *:nth-child(n+5){ display:none; } }

        /* ── Card shell ────────────────────────────── */
        .proj-card {
          position: relative;
          display: flex; flex-direction: column;
          border-radius: 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
          cursor: pointer;
        }
        .proj-card:hover {
          border-color: color-mix(in srgb, var(--c) 50%, transparent);
          box-shadow: 0 8px 28px rgba(0,0,0,.13);
          transform: translateY(-3px);
        }
        .proj-card:active {
          transform: scale(.97) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,.1) !important;
          transition: transform .1s ease, box-shadow .1s ease;
        }

        /* Top accent line */
        .proj-card-accent-line {
          height: 3px;
          background: linear-gradient(90deg, var(--c), color-mix(in srgb, var(--c) 40%, transparent));
          opacity: 0;
          transition: opacity .22s ease;
        }
        .proj-card:hover .proj-card-accent-line { opacity: 1; }

        /* Body */
        .proj-card-body {
          padding: 1.1rem 1.15rem .75rem;
          display: flex; flex-direction: column; gap: .65rem; flex: 1;
        }

        /* Header row */
        .proj-card-header {
          display: flex; align-items: center; justify-content: space-between; gap: .5rem;
        }

        /* Category badge */
        .proj-cat-badge {
          font-size: .65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .07em;
          padding: .22rem .6rem;
          border-radius: 9999px;
          background: color-mix(in srgb, var(--c) 14%, transparent);
          color: var(--c);
          border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
          line-height: 1;
        }

        /* Action buttons (github / live) */
        .proj-card-actions { display: flex; align-items: center; gap: .35rem; z-index: 2; position: relative; }
        .proj-action-btn {
          width: 26px; height: 26px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color .15s, border-color .15s, transform .15s;
        }
        .proj-action-btn:hover { color: var(--text-primary); border-color: var(--c); transform: scale(1.08); }
        .proj-action-btn:active { transform: scale(.9); }

        /* Title */
        .proj-card-title {
          font-size: .92rem; font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        /* Desc */
        .proj-card-desc {
          font-size: .78rem; color: var(--text-secondary);
          line-height: 1.65; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }

        /* Tags */
        .proj-card-tags { display: flex; flex-wrap: wrap; gap: .3rem; }
        .proj-tag {
          font-size: .62rem; font-weight: 600;
          padding: .18rem .5rem; border-radius: 6px;
          background: var(--bg-surface-2);
          color: var(--text-tertiary);
          border: 1px solid var(--border-color);
          line-height: 1.4;
        }

        /* Footer */
        .proj-card-footer {
          display: flex; align-items: center; gap: .45rem;
          padding: .6rem 1.15rem .8rem;
          border-top: 1px solid var(--border-color);
          pointer-events: none;
        }
        .proj-card-footer-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c);
          flex-shrink: 0;
          box-shadow: 0 0 5px color-mix(in srgb, var(--c) 70%, transparent);
        }
        .proj-card-footer-lbl {
          flex: 1;
          font-size: .72rem; font-weight: 600; color: var(--c);
        }
        .proj-card-footer-arrow {
          font-size: .72rem; color: var(--c);
          transition: transform .2s ease;
        }
        .proj-card:hover .proj-card-footer-arrow { transform: translateX(3px); }

        /* Full-card link overlay */
        .proj-card-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
      `}</style>
    </section>
  )
}
