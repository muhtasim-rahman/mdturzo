// RecentProjects.jsx — v2.2.9
// REDESIGN: Minimal, professional project cards
//   * Clean card layout — no thumbnail image area cluttering
//   * Category chip top-left, external action icons top-right
//   * Title prominent, description clipped
//   * Tag pills with accent color
//   * Footer: colored dot label + arrow CTA
//   * Click effect (active:scale) on all cards
//   * Full-card Link overlay for navigation

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faArrowRight, faCode } from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import { SkeletonCard } from '../ui/Skeleton.jsx'

const FALLBACK = [
  { id:'linkivo',  slug:'linkivo',           title:'Linkivo',               short_description:'PWA for intelligent link management with weighted discovery and GSAP animations.',    github_link:null,                                              live_link:null,                                            tags:['PWA','Firebase','GSAP'],   category:'Web App',      accent:'#3B82F6' },
  { id:'qr-prism', slug:'qr-prism',          title:'QR Prism',              short_description:'Feature-rich PWA for QR generation, scanning, and batch processing with cloud storage.', github_link:'https://github.com/muhtasim-rahman/qr-prism',    live_link:'https://muhtasim-rahman.github.io/qr-prism',    tags:['PWA','Firebase','QR'],     category:'Utility',      accent:'#10B981' },
  { id:'ufmt',     slug:'ufmt-ssc26',        title:'FMT Tracker Pro',        short_description:'Merit tracking dashboard for SSC-26 students powered by Google Sheets backend.',        github_link:'https://github.com/muhtasim-rahman/UFMT-SSC26',  live_link:'https://muhtasim-rahman.github.io/UFMT-SSC26/', tags:['Education','Sheets'],      category:'Education',    accent:'#F59E0B' },
  { id:'notif',    slug:'notification-panel',title:'Notification Panel',     short_description:'Plug-and-play notification panel powered by Google Sheets for any website.',            github_link:'https://github.com/muhtasim-rahman/notification-panel', live_link:null,                                       tags:['Component','Open Source'], category:'UI Component', accent:'#EC4899' },
  { id:'exporter', slug:'exporter-pro',      title:'Project Exporter Pro',   short_description:'Universal JS export engine: PNG, JPG, SVG, PDF. Shadow DOM isolated, zero deps.',     github_link:'https://github.com/muhtasim-rahman/exporter-pro',live_link:null,                                            tags:['Library','Shadow DOM'],    category:'Dev Tool',     accent:'#A855F7' },
  { id:'halal',    slug:'halal',             title:'Halal — World of Muslims',short_description:'Interactive Islamic resource covering the Five Pillars of Islam with modal details.',   github_link:'https://github.com/muhtasim-rahman/halal',       live_link:'https://muhtasim-rahman.github.io/halal',       tags:['Islamic','Educational'],  category:'Islamic',      accent:'#06B6D4' },
]

function ProjectCard({ p, i }) {
  const color = p.accent ?? '#64748B'

  return (
    <motion.div
      className="proj-card"
      style={{ '--c': color }}
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.42, delay:i*.065 }}>

      {/* Top bar: category + external links */}
      <div className="proj-card-top">
        <span className="proj-cat-chip">
          <span className="proj-cat-dot" />
          {p.category}
        </span>
        <div className="proj-ext-links">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="proj-ext-btn" aria-label="View on GitHub">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="proj-ext-btn" aria-label="Live preview">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="proj-card-body">
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.short_description}</p>
      </div>

      {/* Tags */}
      {p.tags?.length > 0 && (
        <div className="proj-tags">
          {p.tags.slice(0,4).map(t => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="proj-card-footer">
        <span className="proj-footer-label">
          <FontAwesomeIcon icon={faCode} className="proj-footer-icon" />
          View details
        </span>
        <FontAwesomeIcon icon={faArrowRight} className="proj-footer-arrow" />
      </div>

      {/* Full-card link overlay */}
      <Link to={`/projects/${p.slug}`} className="proj-overlay" aria-label={`Open ${p.title}`} />
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
        /* ── Grid ────────────────────────────────────────── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media(max-width:1023px){ .proj-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:639px){  .proj-grid { grid-template-columns: 1fr; } }
        @media(max-width:639px){ .proj-grid > *:nth-child(n+4){ display:none; } }
        @media(min-width:640px) and (max-width:1023px){ .proj-grid > *:nth-child(n+5){ display:none; } }

        /* ── Card ────────────────────────────────────────── */
        .proj-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          border-radius: 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1.1rem 1.15rem 0;
          transition: border-color .22s ease, box-shadow .22s ease, transform .22s ease;
          overflow: hidden;
          cursor: pointer;
          /* top accent line */
        }
        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--c);
          opacity: 0;
          transition: opacity .22s;
        }
        .proj-card:hover {
          border-color: color-mix(in srgb, var(--c) 40%, transparent);
          box-shadow: 0 6px 28px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.06);
          transform: translateY(-3px);
        }
        .proj-card:hover::before { opacity: 1; }
        .proj-card:active { transform: scale(.97) !important; transition-duration: .1s; }

        /* Full-card link overlay */
        .proj-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
        /* External links above overlay */
        .proj-ext-links { z-index: 2; position: relative; }

        /* ── Top row ─────────────────────────────────────── */
        .proj-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: .6rem;
        }
        .proj-cat-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: .68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .06em;
          color: var(--c);
          background: color-mix(in srgb, var(--c) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
          border-radius: 9999px;
          padding: .22rem .6rem;
        }
        [data-theme="light"] .proj-cat-chip {
          background: color-mix(in srgb, var(--c) 8%, transparent);
        }
        .proj-cat-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c); flex-shrink: 0;
        }
        .proj-ext-links {
          display: flex; gap: .3rem;
        }
        .proj-ext-btn {
          width: 26px; height: 26px;
          border-radius: 7px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-tertiary); font-size: 11px;
          text-decoration: none;
          transition: color .15s, border-color .15s, background .15s;
        }
        .proj-ext-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
          background: var(--accent-light);
        }
        .proj-ext-btn:active { transform: scale(.92); }

        /* ── Body ────────────────────────────────────────── */
        .proj-card-body { display: flex; flex-direction: column; gap: .45rem; margin-bottom: .7rem; }
        .proj-title {
          font-size: .9rem; font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-display);
          line-height: 1.3;
        }
        .proj-desc {
          font-size: .75rem; color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Tags ────────────────────────────────────────── */
        .proj-tags {
          display: flex; flex-wrap: wrap; gap: .3rem;
          margin-bottom: .75rem;
        }
        .proj-tag {
          font-size: .67rem; font-weight: 600;
          padding: .18rem .52rem;
          border-radius: 9999px;
          background: var(--bg-surface-2);
          color: var(--text-tertiary);
          border: 1px solid var(--border-color);
          letter-spacing: .02em;
        }

        /* ── Footer ──────────────────────────────────────── */
        .proj-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: .5rem .15rem .7rem;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
          position: relative; z-index: 2;
          pointer-events: none;
          transition: border-color .22s;
        }
        .proj-card:hover .proj-card-footer { border-color: color-mix(in srgb, var(--c) 25%, transparent); }
        .proj-footer-label {
          display: flex; align-items: center; gap: .4rem;
          font-size: .73rem; font-weight: 600;
          color: var(--text-tertiary);
          transition: color .18s;
        }
        .proj-card:hover .proj-footer-label { color: var(--c); }
        .proj-footer-icon { font-size: 9px; }
        .proj-footer-arrow {
          font-size: .72rem; color: var(--text-tertiary);
          transition: transform .2s, color .18s;
        }
        .proj-card:hover .proj-footer-arrow {
          transform: translateX(3px);
          color: var(--c);
        }
      `}</style>
    </section>
  )
}
