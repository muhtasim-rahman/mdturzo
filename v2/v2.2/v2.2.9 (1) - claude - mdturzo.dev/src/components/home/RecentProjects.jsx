// RecentProjects.jsx — v2.2.9
// CHANGES:
//   * Complete card redesign: minimal, professional, clean
//   * Click effect (active:scale) on cards
//   * Cards fully clickable

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faArrowRight, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import { SkeletonCard } from '../ui/Skeleton.jsx'

const FALLBACK = [
  { id:'linkivo',   slug:'linkivo',           title:'Linkivo',                       short_description:'Smart link management PWA with Firebase, GSAP animations, and weighted discovery system.',  thumbnail_url:null, github_link:null,                                      live_link:null,                                          tags:['PWA','Firebase','GSAP'],     category:'Web App',     accent:'#3B82F6' },
  { id:'qr-prism',  slug:'qr-prism',          title:'QR Prism',                      short_description:'Feature-rich PWA for QR generation, scanning, and batch processing with cloud storage.',    thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/qr-prism',live_link:'https://muhtasim-rahman.github.io/qr-prism',   tags:['PWA','Firebase','QR'],       category:'Utility',     accent:'#10B981' },
  { id:'ufmt',      slug:'ufmt-ssc26',         title:'FMT Tracker Pro',               short_description:'Merit tracking dashboard for SSC-26 students powered by Google Sheets backend.',              thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/UFMT-SSC26',live_link:'https://muhtasim-rahman.github.io/UFMT-SSC26/',tags:['Education','Sheets'],        category:'Education',   accent:'#F59E0B' },
  { id:'notif',     slug:'notification-panel', title:'Notification Panel',            short_description:'Plug-and-play notification widget powered by Google Sheets for any website.',                thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/notification-panel',live_link:null,                                    tags:['Component','Open Source'],   category:'UI Component',accent:'#EC4899' },
  { id:'exporter',  slug:'exporter-pro',       title:'Project Exporter Pro',          short_description:'JS export engine for PNG, JPG, SVG, PDF with Shadow DOM isolation.',                         thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/exporter-pro',live_link:null,                                         tags:['Library','Shadow DOM'],      category:'Dev Tool',    accent:'#A855F7' },
  { id:'halal',     slug:'halal',              title:'Halal — World of Muslims',      short_description:'Interactive Islamic resource covering the Five Pillars of Islam with clean UI.',             thumbnail_url:null, github_link:'https://github.com/muhtasim-rahman/halal',      live_link:'https://muhtasim-rahman.github.io/halal',      tags:['Islamic','Educational'],    category:'Islamic',     accent:'#06B6D4' },
]

const CAT_COLORS = {
  'Web App':'#3B82F6','Utility':'#10B981','Education':'#F59E0B',
  'UI Component':'#EC4899','Dev Tool':'#A855F7','Islamic':'#06B6D4','default':'#64748B'
}

function ProjectCard({ p, i }) {
  const color = p.accent ?? CAT_COLORS[p.category] ?? CAT_COLORS.default

  return (
    <motion.div
      className="proj-card"
      style={{ '--c': color }}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.4, delay:i*.055 }}>

      {/* Minimal top accent line */}
      <div className="proj-card-accent" />

      {/* Content */}
      <div className="proj-card-body">
        {/* Header row: icon + category */}
        <div className="proj-card-header">
          <div className="proj-card-icon-wrap">
            {p.thumbnail_url
              ? <img src={p.thumbnail_url} alt={p.title} className="proj-card-thumb" loading="lazy" />
              : <FontAwesomeIcon icon={faFolderOpen} style={{ color, fontSize: 18 }} />
            }
          </div>
          <span className="proj-card-cat" style={{ '--c': color }}>{p.category}</span>
          <div className="proj-card-links">
            {p.github_link && (
              <a href={p.github_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()} className="proj-ext-btn" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {p.live_link && (
              <a href={p.live_link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()} className="proj-ext-btn" aria-label="Live demo">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="proj-card-title">{p.title}</h3>

        {/* Description */}
        <p className="proj-card-desc">{p.short_description}</p>

        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="proj-card-tags">
            {p.tags.slice(0,3).map(t => (
              <span key={t} className="proj-tag">{t}</span>
            ))}
            {p.tags.length > 3 && <span className="proj-tag">+{p.tags.length-3}</span>}
          </div>
        )}

        {/* View arrow */}
        <div className="proj-card-cta">
          <span>View details</span>
          <FontAwesomeIcon icon={faArrowRight} className="proj-cta-arrow" />
        </div>
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
          gap: 1rem;
        }
        @media(max-width:1023px){ .proj-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:639px){  .proj-grid { grid-template-columns: 1fr; } }
        @media(max-width:639px){ .proj-grid > *:nth-child(n+4){ display:none; } }
        @media(min-width:640px) and (max-width:1023px){ .proj-grid > *:nth-child(n+5){ display:none; } }

        /* -- Minimal card design -- */
        .proj-card {
          position: relative;
          border-radius: 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: border-color .2s ease, box-shadow .2s ease, transform .15s ease;
          cursor: pointer;
        }
        .proj-card:hover {
          border-color: color-mix(in srgb, var(--c) 35%, transparent);
          box-shadow: 0 8px 28px rgba(0,0,0,.14);
          transform: translateY(-2px);
        }
        .proj-card:active {
          transform: scale(0.97) translateY(0) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,.1) !important;
          transition: transform .08s ease, box-shadow .08s ease !important;
        }

        /* Top accent line */
        .proj-card-accent {
          height: 3px;
          background: linear-gradient(90deg, var(--c), color-mix(in srgb, var(--c) 40%, transparent));
          opacity: 0;
          transition: opacity .2s ease;
        }
        .proj-card:hover .proj-card-accent { opacity: 1; }

        .proj-card-body {
          padding: 1.1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: .7rem;
          height: 100%;
        }

        /* Header */
        .proj-card-header {
          display: flex;
          align-items: center;
          gap: .6rem;
        }
        .proj-card-icon-wrap {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: color-mix(in srgb, var(--c) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; overflow: hidden;
        }
        .proj-card-thumb {
          width: 100%; height: 100%; object-fit: cover;
        }
        .proj-card-cat {
          font-size: .64rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: var(--c);
          background: color-mix(in srgb, var(--c) 10%, transparent);
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--c) 20%, transparent);
        }
        .proj-card-links {
          margin-left: auto;
          display: flex;
          gap: .35rem;
        }
        .proj-ext-btn {
          width: 26px; height: 26px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          color: var(--text-tertiary);
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          text-decoration: none;
          transition: color .15s, border-color .15s;
          position: relative; z-index: 2;
        }
        .proj-ext-btn:hover { color: var(--text-primary); border-color: var(--border-strong); }

        /* Title */
        .proj-card-title {
          font-size: .9rem;
          font-weight: 700;
          font-family: var(--font-display);
          color: var(--text-primary);
          line-height: 1.35;
          margin: 0;
        }

        /* Description */
        .proj-card-desc {
          font-size: .76rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          margin: 0;
        }

        /* Tags */
        .proj-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .proj-tag {
          font-size: .66rem;
          padding: 2px 7px;
          border-radius: 5px;
          background: var(--bg-surface-2);
          color: var(--text-tertiary);
          border: 1px solid var(--border-color);
          font-family: var(--font-mono);
        }

        /* CTA row */
        .proj-card-cta {
          display: flex;
          align-items: center;
          gap: .35rem;
          font-size: .72rem;
          font-weight: 600;
          color: var(--text-tertiary);
          transition: color .15s;
          padding-top: .2rem;
          border-top: 1px solid var(--border-color);
        }
        .proj-card:hover .proj-card-cta { color: var(--c); }
        .proj-cta-arrow {
          font-size: .62rem;
          transition: transform .2s ease;
        }
        .proj-card:hover .proj-cta-arrow { transform: translateX(3px); }

        /* Full card overlay */
        .proj-card-overlay {
          position: absolute; inset: 0; z-index: 1;
        }
        .proj-card-links, .proj-card-links * { z-index: 2; }
      `}</style>
    </section>
  )
}
