// RecentProjects.jsx — v2.4.6
// Changes:
//   - EmptyPlaceholder replaced with shared NoProjectsPlaceholder
//   - SkeletonGrid unchanged; rest of logic unchanged

import './home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFolderOpen, faStar } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../projects/ProjectCard.jsx'
import NoProjectsPlaceholder from '../shared/ui/NoProjectsPlaceholder.jsx'
import { getFeaturedProjects } from '../../services/supabase.js'

function SectionHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-[var(--accent-light)]">
            <FontAwesomeIcon icon={faStar} className="text-[var(--accent-primary)] text-[10px]" />
          </div>
          <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-widest">Featured Work</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
          Projects I've Built
        </h2>
        <p className="text-[var(--text-secondary)] mt-1.5 text-sm max-w-lg">
          A curated selection of my work — from utility tools to interactive web apps.
        </p>
      </div>
      <Link
        to="/projects"
        className="flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors group self-start sm:self-auto flex-shrink-0">
        All Projects
        <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

function SkeletonGrid({ count }) {
  return (
    <div className="rp-grid">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.06}s` }} />
          <div className="p-4 space-y-2.5">
            <div className="sk h-5 w-3/4 rounded" />
            <div className="flex gap-1.5">
              <div className="sk h-4 w-14 rounded-md" />
              <div className="sk h-4 w-20 rounded-md" />
            </div>
            <div className="sk h-3.5 w-full rounded" />
            <div className="sk h-3.5 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function RecentProjects() {
  const [projects, setProjects]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024)     setVisibleCount(6)
      else if (w >= 640) setVisibleCount(4)
      else               setVisibleCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const load = () => {
    let mounted = true
    setLoading(true)
    getFeaturedProjects()
      .then(data => { if (mounted) { setProjects(data ?? []); setLoading(false) } })
      .catch(() => { if (mounted) { setProjects([]); setLoading(false) } })
    return () => { mounted = false }
  }
  useEffect(load, [])

  const visible = projects.slice(0, visibleCount)

  return (
    <section className="section container-xl">
      <SectionHeader />

      {loading ? (
        <SkeletonGrid count={visibleCount} />
      ) : projects.length === 0 ? (
        <NoProjectsPlaceholder onRetry={load} />
      ) : (
        <>
          <div className="rp-grid">
            {visible.map((p, i) => (
              <ProjectCard key={p.id || p.slug || i} project={p} index={i} view="grid" />
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl
                bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)]
                border border-[var(--border-color)] hover:border-[var(--border-strong)]
                text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                text-sm font-medium transition-all duration-200 group">
              <FontAwesomeIcon icon={faFolderOpen} className="text-[var(--accent-primary)]" />
              View all projects
              <FontAwesomeIcon icon={faArrowRight}
                className="text-xs text-[var(--accent-primary)] transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </>
      )}
    </section>
  )
}
