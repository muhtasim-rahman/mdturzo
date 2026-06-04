// RecentProjects.jsx — v2.4.5
// CHANGES:
//   - Removed STATIC_FALLBACK data entirely
//   - Shows minimal placeholder when no featured projects are available
//   - Imports home.css for .rp-grid

import './home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight, faFolderOpen, faStar,
  faArrowsRotate, faBoxOpen,
} from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../projects/ProjectCard.jsx'
import { getFeaturedProjects } from '../../services/supabase.js'

// ── Section header ─────────────────────────────────────────────
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
        className="flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors group self-start sm:self-auto flex-shrink-0"
      >
        All Projects
        <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

// ── Skeleton grid while loading ────────────────────────────────
function SkeletonGrid({ count }) {
  return (
    <div className="rp-grid">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.06}s` }} />
          <div className="p-4 space-y-2.5">
            <div className="sk h-5 w-3/4 rounded" style={{ animationDelay: `${i * 0.06 + 0.04}s` }} />
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

// ── Empty / error placeholder ──────────────────────────────────
function EmptyPlaceholder({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)]/40">
      <div className="w-12 h-12 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faBoxOpen} className="text-[var(--text-tertiary)] text-xl" />
      </div>
      <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">No projects yet</p>
      <p className="text-xs text-[var(--text-tertiary)] max-w-xs mb-5">
        Featured projects will appear here once they're published.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
      >
        <FontAwesomeIcon icon={faArrowsRotate} className="text-[10px]" />
        Try again
      </button>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function RecentProjects() {
  const [projects, setProjects]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)

  // Responsive count: 6 PC / 4 Tablet / 3 Mobile
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
        <EmptyPlaceholder onRetry={load} />
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
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all duration-200 group"
            >
              <FontAwesomeIcon icon={faFolderOpen} className="text-[var(--accent-primary)]" />
              View all projects
              <FontAwesomeIcon icon={faArrowRight} className="text-xs text-[var(--accent-primary)] transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </>
      )}
    </section>
  )
}
