// RecentProjects.jsx -- v2.3.6
// CHANGES (v2.3.6):
//   * Removed the hardcoded FALLBACK demo-project array entirely. Home page
//     now shows ONLY real, published+featured projects from Supabase.
//     If there are none yet, a clean neutral empty state is shown instead
//     of fake placeholder projects.
//   * ProjectCard extracted to ../projects/ProjectCard.jsx (shared with the
//     Projects page) -- this file just fetches + lays out the grid.
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFolderOpen, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import { SkeletonCard } from '../ui/Skeleton.jsx'
import ProjectCard from '../projects/ProjectCard.jsx'

function EmptyPlaceholder({ failed, onRetry }) {
  return (
    <div className="proj-empty">
      <FontAwesomeIcon icon={faFolderOpen} className="proj-empty-icon"/>
      <p className="proj-empty-title">{failed ? "Couldn't load projects" : 'No featured projects yet'}</p>
      <p className="proj-empty-sub">
        {failed
          ? 'Something went wrong reaching the database.'
          : 'Check back soon -- new work gets added here as it ships.'}
      </p>
      {failed && (
        <button onClick={onRetry} className="proj-empty-retry" type="button">
          <FontAwesomeIcon icon={faRotateRight} className="text-xs"/> Try again
        </button>
      )}
    </div>
  )
}

export default function RecentProjects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading ] = useState(true)
  const [failed,   setFailed  ] = useState(false)

  const fetchProjects = () => {
    setLoading(true)
    setFailed(false)
    getFeaturedProjects()
      .then(d => setProjects(d ?? []))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let mounted = true
    getFeaturedProjects()
      .then(d => { if (mounted) setProjects(d ?? []) })
      .catch(() => { if (mounted) setFailed(true) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
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

        {loading ? (
          <div className="proj-grid">
            {Array.from({length:6},(_,i) => <SkeletonCard key={i}/>)}
          </div>
        ) : (failed || projects.length === 0) ? (
          <EmptyPlaceholder failed={failed} onRetry={fetchProjects}/>
        ) : (
          <div className="proj-grid">
            {projects.map((p,i) => <ProjectCard key={p.id} p={p} i={i}/>)}
          </div>
        )}

        {!loading && !failed && projects.length > 0 && (
          <motion.div className="flex justify-center mt-10"
            initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.2}}>
            <Link to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all active:scale-[.97] group">
              View All Projects
              <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
            </Link>
          </motion.div>
        )}
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

        .proj-empty {
          display: flex; flex-direction: column; align-items: center; gap: .65rem;
          text-align: center;
          padding: 3.5rem 1.5rem;
          border: 1px dashed var(--border-strong);
          border-radius: 16px;
          background: var(--bg-surface-2);
        }
        .proj-empty-icon { font-size: 1.75rem; color: var(--text-tertiary); opacity: .6; }
        .proj-empty-title { font-size: .9rem; font-weight: 700; color: var(--text-primary); }
        .proj-empty-sub { font-size: .8rem; color: var(--text-secondary); max-width: 22rem; }
        .proj-empty-retry {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .78rem; font-weight: 600;
          padding: .45rem .9rem; border-radius: 9999px;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          background: var(--bg-surface);
          margin-top: .25rem;
          transition: border-color .15s, color .15s;
        }
        .proj-empty-retry:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
      `}</style>
    </section>
  )
}
