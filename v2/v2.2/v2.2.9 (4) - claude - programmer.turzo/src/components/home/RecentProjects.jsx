// RecentProjects.jsx — v2.2.9
// REDESIGN:
//   * Minimal, professional card design — no thumbnail header, clean content-first layout
//   * Click/active effect on every card
//   * Category pill + accent line top-left
//   * Hover: subtle lift + border accent
//   * Footer: accent-colored category dot + "View details" CTA

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faArrowRight, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import { SkeletonCard } from '../ui/Skeleton.jsx'

const FALLBACK = [
  { id:'linkivo',   slug:'linkivo',           title:'Linkivo',                 short_description:'PWA for intelligent link management with weighted discovery, GSAP splash animations, and Firebase backend.',   github_link:null,                                                       live_link:null,                                                     tags:['PWA','Firebase','GSAP'],   category:'Web App',      accent:'#3B82F6' },
  { id:'qr-prism',  slug:'qr-prism',          title:'QR Prism',                short_description:'Feature-rich PWA for QR generation, scanning, and batch processing with cloud storage.',                        github_link:'https://github.com/muhtasim-rahman/qr-prism',             live_link:'https://muhtasim-rahman.github.io/qr-prism',             tags:['PWA','Firebase','QR'],    category:'Utility',      accent:'#10B981' },
  { id:'ufmt',      slug:'ufmt-ssc26',         title:'FMT Tracker Pro',         short_description:'Merit tracking dashboard for SSC-26 students powered by Google Sheets with Chart.js analytics.',                github_link:'https://github.com/muhtasim-rahman/UFMT-SSC26',           live_link:'https://muhtasim-rahman.github.io/UFMT-SSC26/',          tags:['Education','Charts'],    category:'Education',    accent:'#F59E0B' },
  { id:'notif',     slug:'notification-panel', title:'Notification Panel',      short_description:'Plug-and-play dynamic notification component powered by Google Sheets for any website.',                         github_link:'https://github.com/muhtasim-rahman/notification-panel',   live_link:null,                                                     tags:['Component','Open Source'],category:'UI Component', accent:'#EC4899' },
  { id:'exporter',  slug:'exporter-pro',       title:'Project Exporter Pro',    short_description:'Universal JS export engine — PNG, JPG, WebP, SVG, PDF — with Shadow DOM isolation for style encapsulation.',  github_link:'https://github.com/muhtasim-rahman/exporter-pro',         live_link:null,                                                     tags:['Library','Shadow DOM'],  category:'Dev Tool',     accent:'#A855F7' },
  { id:'halal',     slug:'halal',              title:'Halal — World of Muslims', short_description:'Interactive Islamic resource website covering the Five Pillars of Islam with modal details.',                  github_link:'https://github.com/muhtasim-rahman/halal',                live_link:'https://muhtasim-rahman.github.io/halal',                tags:['Islamic','Education'],  category:'Islamic',      accent:'#06B6D4' },
]

const CAT_COLORS = {
  'Web App':'#3B82F6','Utility':'#10B981','Education':'#F59E0B',
  'UI Component':'#EC4899','Dev Tool':'#A855F7','Islamic':'#06B6D4','default':'#64748B'
}

function ProjectCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default

  return (
    <motion.div
      className="pcard group"
      style={{ '--c': color }}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.4, delay:i*.06 }}>

      {/* Accent top border */}
      <div className="pcard-accent" />

      {/* Body */}
      <div className="pcard-body">
        {/* Header row: category pill + external links */}
        <div className="pcard-header">
          <span className="pcard-cat"
            style={{ background:`${color}18`, color, borderColor:`${color}30` }}>
            {p.category}
          </span>
          <div className="pcard-actions">
            {p.github_link && (
              <a href={p.github_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="pcard-action-btn"
                aria-label="View on GitHub">
                <FontAwesomeIcon icon={faGithub}/>
              </a>
            )}
            {p.live_link && (
              <a href={p.live_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="pcard-action-btn"
                aria-label="Live preview">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="pcard-title">{p.title}</h3>

        {/* Description */}
        <p className="pcard-desc">{p.short_description}</p>

        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="pcard-tags">
            {p.tags.slice(0,4).map(t => (
              <span key={t} className="pcard-tag">{t}</span>
            ))}
            {p.tags.length > 4 && <span className="pcard-tag">+{p.tags.length-4}</span>}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pcard-footer">
        <span className="pcard-footer-dot" />
        <span className="pcard-footer-label">{p.category}</span>
        <span className="pcard-footer-cta">
          View details <FontAwesomeIcon icon={faArrowRight} className="pcard-footer-arrow"/>
        </span>
      </div>

      {/* Full-card link overlay */}
      <Link to={`/projects/${p.slug}`} className="pcard-overlay" aria-label={`View ${p.title}`}/>
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

        <div className="pcard-grid">
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
        /* ===================================================
           PROJECT CARDS GRID
           =================================================== */
        .pcard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media(max-width:1023px){ .pcard-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:639px){  .pcard-grid { grid-template-columns: 1fr; } }
        @media(max-width:639px){ .pcard-grid > *:nth-child(n+4){ display:none; } }
        @media(min-width:640px) and (max-width:1023px){ .pcard-grid > *:nth-child(n+5){ display:none; } }

        /* ===================================================
           MINIMAL PROFESSIONAL CARD
           =================================================== */
        .pcard {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          transition:
            border-color .2s ease,
            box-shadow .2s ease,
            transform .2s ease;
        }
        .pcard:hover {
          border-color: color-mix(in srgb, var(--c) 35%, var(--border-color));
          box-shadow: 0 8px 28px rgba(0,0,0,.14), 0 0 0 1px color-mix(in srgb, var(--c) 14%, transparent);
          transform: translateY(-3px);
        }
        /* v2.2.9: click effect */
        .pcard:active {
          transform: scale(.97) translateY(-1px) !important;
          transition: transform .08s ease !important;
        }

        /* Accent top line */
        .pcard-accent {
          height: 3px;
          background: linear-gradient(90deg, var(--c), color-mix(in srgb, var(--c) 40%, transparent));
          flex-shrink: 0;
        }

        /* Card body */
        .pcard-body {
          display: flex;
          flex-direction: column;
          gap: .7rem;
          padding: 1rem 1.1rem .85rem;
          flex: 1;
        }

        /* Header row */
        .pcard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: .5rem;
        }
        .pcard-cat {
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .04em;
          padding: .22rem .6rem;
          border-radius: 999px;
          border: 1px solid;
          text-transform: uppercase;
          line-height: 1.4;
          flex-shrink: 0;
        }
        .pcard-actions {
          display: flex;
          gap: .3rem;
          position: relative;
          z-index: 2;
        }
        .pcard-action-btn {
          width: 26px; height: 26px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: .72rem;
          color: var(--text-tertiary);
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          text-decoration: none;
          transition: color .15s, border-color .15s, background .15s, transform .1s;
        }
        .pcard-action-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
          background: var(--bg-surface-3);
        }
        .pcard-action-btn:active { transform: scale(.9); }

        /* Title */
        .pcard-title {
          font-size: .95rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Description */
        .pcard-desc {
          font-size: .78rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        /* Tags */
        .pcard-tags {
          display: flex;
          flex-wrap: wrap;
          gap: .3rem;
        }
        .pcard-tag {
          font-size: .67rem;
          padding: .15rem .5rem;
          border-radius: 999px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          font-weight: 500;
        }

        /* Footer */
        .pcard-footer {
          display: flex;
          align-items: center;
          gap: .45rem;
          padding: .55rem 1.1rem .65rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          flex-shrink: 0;
        }
        .pcard-footer-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--c);
          box-shadow: 0 0 5px var(--c);
          flex-shrink: 0;
        }
        .pcard-footer-label {
          font-size: .7rem;
          font-weight: 600;
          color: var(--c);
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pcard-footer-cta {
          display: inline-flex;
          align-items: center;
          gap: .3rem;
          font-size: .7rem;
          font-weight: 600;
          color: var(--text-tertiary);
          transition: color .15s;
          position: relative;
          z-index: 2;
          pointer-events: none;
          flex-shrink: 0;
        }
        .pcard:hover .pcard-footer-cta { color: var(--c); }
        .pcard-footer-arrow {
          font-size: .62rem;
          transition: transform .2s ease;
        }
        .pcard:hover .pcard-footer-arrow { transform: translateX(3px); }

        /* Full-card link overlay */
        .pcard-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
        /* External action links above overlay */
        .pcard-actions { z-index: 2; }
      `}</style>
    </section>
  )
}
