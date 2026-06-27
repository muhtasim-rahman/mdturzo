// RecentProjects.jsx — v2.4.0
// Fully dynamic: Supabase featured projects.
// • is_featured=true + featured_order → sorted top 6/4/3 shown based on count
// • No hardcoded fallback data — if Supabase is empty, section hides gracefully
// • Admin toggles "Featured" in Admin panel → appears here instantly
// • Same card component used on /projects page

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import ProjectCard from '../projects/ProjectCard.jsx'
import { SkeletonCard } from '../ui/Skeleton.jsx'

export default function RecentProjects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const t0 = Date.now()
    getFeaturedProjects()
      .then(data => {
        const delay = Math.max(0, 500 - (Date.now() - t0))
        setTimeout(() => {
          setProjects(data || [])
          setLoading(false)
        }, delay)
      })
      .catch(() => setLoading(false))
  }, [])

  // If not loading and no projects, hide the section entirely
  if (!loading && projects.length === 0) return null

  // Responsive grid: 6→3col, 4→2col, 3→3col — based on count
  const count = loading ? 6 : projects.length
  const gridCols = count >= 5 ? 3 : count === 4 ? 2 : 3
  const skCount  = count >= 5 ? 6 : count === 4 ? 4 : 3

  return (
    <section className="section" id="featured-projects">
      <div className="container-xl">
        {/* Header */}
        <div className="rp-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}>
            <p className="rp-eyebrow">My Work</p>
            <h2 className="rp-title">Featured Projects</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <Link to="/projects" className="rp-see-all">
              All projects
              <FontAwesomeIcon icon={faArrowRight} className="rp-see-all-icon"/>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className={`rp-grid rp-grid--${gridCols}`}>
          {loading
            ? Array.from({ length: skCount }, (_, i) => <SkeletonCard key={i}/>)
            : projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} variant="grid"/>
              ))
          }
        </div>

        {/* Bottom CTA */}
        <motion.div className="rp-bottom"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <Link to="/projects" className="rp-cta-btn">
            View All Projects
            <FontAwesomeIcon icon={faArrowRight} className="rp-cta-arrow"/>
          </Link>
        </motion.div>
      </div>

      <style>{`
        .rp-header {
          display: flex; flex-direction: column;
          gap: .75rem; margin-bottom: 2.5rem;
        }
        @media(min-width:640px) {
          .rp-header {
            flex-direction: row; align-items: flex-end; justify-content: space-between;
          }
        }
        .rp-eyebrow {
          font-size: .72rem; text-transform: uppercase; letter-spacing: .12em;
          font-weight: 700; color: var(--accent-primary); margin-bottom: .4rem;
        }
        .rp-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-family: var(--font-display); font-weight: 800;
          color: var(--text-primary);
        }
        .rp-see-all {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .875rem; font-weight: 600;
          color: var(--text-secondary); text-decoration: none;
          transition: color .18s;
        }
        .rp-see-all:hover { color: var(--accent-primary); }
        .rp-see-all-icon { font-size: .75rem; transition: transform .2s; }
        .rp-see-all:hover .rp-see-all-icon { transform: translateX(3px); }

        .rp-grid {
          display: grid; gap: 1.25rem;
        }
        .rp-grid--3 { grid-template-columns: repeat(3, 1fr); }
        .rp-grid--2 { grid-template-columns: repeat(2, 1fr); }
        @media(max-width:1023px) {
          .rp-grid--3, .rp-grid--2 { grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:639px) {
          .rp-grid--3, .rp-grid--2 { grid-template-columns: 1fr; }
          /* Mobile: show max 3 */
          .rp-grid > *:nth-child(n+4) { display: none; }
        }
        @media(min-width:640px) and (max-width:1023px) {
          /* Tablet: show max 4 */
          .rp-grid > *:nth-child(n+5) { display: none; }
        }

        .rp-bottom {
          display: flex; justify-content: center; margin-top: 2.5rem;
        }
        .rp-cta-btn {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.75rem; border-radius: 12px;
          border: 1px solid var(--border-strong);
          background: var(--bg-surface); color: var(--text-secondary);
          font-size: .875rem; font-weight: 700; text-decoration: none;
          transition: all .2s;
        }
        .rp-cta-btn:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }
        .rp-cta-arrow { font-size: .75rem; transition: transform .2s; }
        .rp-cta-btn:hover .rp-cta-arrow { transform: translateX(3px); }
      `}</style>
    </section>
  )
}
