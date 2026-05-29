// RecentProjects.jsx — v2.2.7
// FIXES:
//   • Full project card is now clickable (wrapped in Link to project detail)
//   • Title hover: NO color change (color stays constant on card hover)
//   • Card hover: only border color effect (using card's own color)
//   • Card footer redesigned to match card's theme/accent color
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faArrowRight, faFolderOpen, faTag } from '@fortawesome/free-solid-svg-icons'
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
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="proj-card group"
      style={{ '--c': color, borderColor: hovered ? color : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.42, delay:i*.065 }}>

      {/* Thumbnail */}
      <div className="relative h-40 bg-[var(--bg-surface-2)] overflow-hidden flex-shrink-0">
        {p.thumbnail_url
          ? <img src={p.thumbnail_url} alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"/>
          : <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{background:`linear-gradient(135deg,${color}18,${color}06)`}}>
              <FontAwesomeIcon icon={faFolderOpen} className="text-3xl" style={{color:`${color}55`}}/>
              <span className="text-xs text-[var(--text-tertiary)]">{p.category}</span>
            </div>
        }
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{background:`${color}22`,color,border:`1px solid ${color}35`,backdropFilter:'blur(4px)'}}>
            {p.category}
          </span>
        </div>
        {/* External links — stop propagation so they don't navigate to detail */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {p.github_link && (
            <a href={p.github_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-md bg-[var(--bg-surface)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors text-xs">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
          )}
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-md bg-[var(--bg-surface)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors text-xs">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {p.tags.slice(0,3).map(t => (
              <span key={t} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]">
                <FontAwesomeIcon icon={faTag} className="text-[8px]"/>{t}
              </span>
            ))}
            {p.tags.length > 3 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]">+{p.tags.length-3}</span>}
          </div>
        )}

        {/* Title — NO color change on hover per v2.2.7 spec */}
        <h3 className="font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2 text-sm">
          {p.title}
        </h3>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
          {p.short_description}
        </p>

        {/* Footer — v2.2.7: themed with card's accent color */}
        <div className="proj-card-footer" style={{'--c':color}}>
          <span className="proj-card-footer-label">
            <span className="proj-card-footer-dot"/>
            {p.category}
          </span>
          <span className="proj-card-footer-cta">
            View details
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform duration-200 group-hover:translate-x-1"/>
          </span>
        </div>
      </div>

      {/* Full-card link overlay — v2.2.7: entire card navigates to detail */}
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

        /* Card */
        .proj-card {
          position: relative;
          display: flex; flex-direction: column;
          border-radius: 16px; overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          transition: border-color .22s ease, box-shadow .22s ease, transform .22s ease;
        }
        .proj-card:hover {
          box-shadow: 0 10px 36px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.03);
          transform: translateY(-3px);
        }

        /* Full-card link overlay — sits on top of everything except external links */
        .proj-card-overlay {
          position: absolute; inset: 0; z-index: 1;
          /* pointer-events: auto — captures clicks */
        }
        /* External action links above overlay */
        .proj-card .absolute.top-3.right-3 { z-index: 2; }

        /* Footer — themed with card accent color */
        .proj-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: .55rem .75rem;
          border-radius: 10px;
          margin-top: .25rem;
          background: color-mix(in srgb, var(--c) 9%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
        }
        .proj-card-footer-label {
          display: flex; align-items: center; gap: .4rem;
          font-size: .72rem; font-weight: 600;
          color: var(--c);
        }
        .proj-card-footer-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c); flex-shrink: 0;
          box-shadow: 0 0 5px var(--c);
        }
        .proj-card-footer-cta {
          display: flex; align-items: center; gap: .35rem;
          font-size: .72rem; font-weight: 600;
          color: var(--c);
          position: relative; z-index: 2;
          pointer-events: none; /* overlay handles the click */
        }
      `}</style>
    </section>
  )
}
