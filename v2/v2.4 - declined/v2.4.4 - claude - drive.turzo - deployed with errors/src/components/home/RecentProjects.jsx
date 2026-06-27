// RecentProjects.jsx — v2.4.3
// Fixed: getFeaturedProjects now uses correct 49-col schema (no missing-col errors)
// Fixed: Responsive count 6/4/3 (PC/Tablet/Mobile)
// Shows real Supabase data; falls back to static only on network failure

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFolderOpen, faStar } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../projects/ProjectCard.jsx'
import { getFeaturedProjects } from '../../services/supabase.js'

// Minimal static fallback — only used if network completely fails
const STATIC_FALLBACK = [
  { id: 's1', slug: 'linkivo',           title: 'Linkivo — Smart Link Manager',   short_description: 'PWA for intelligent link management with GSAP animations and Firebase backend.',   thumbnail_url: null, github_link: null, live_link: null, tags: ['PWA','Firebase','GSAP'],      category: 'Web App',      is_featured: true, featured_order: 1, views_count: 320, likes_count: 45 },
  { id: 's2', slug: 'qr-prism',          title: 'QR Prism',                        short_description: 'Feature-rich PWA for QR generation, scanning, and batch processing.',             thumbnail_url: null, github_link: null, live_link: null, tags: ['PWA','Firebase','QR'],        category: 'Utility',      is_featured: true, featured_order: 2, views_count: 280, likes_count: 38 },
  { id: 's3', slug: 'ufmt-ssc26',         title: 'FMT Tracker Pro — SSC-26',        short_description: 'Smart merit tracking dashboard for SSC-26 students powered by Google Sheets.',   thumbnail_url: null, github_link: null, live_link: null, tags: ['Education','PWA'],           category: 'Education',    is_featured: true, featured_order: 3, views_count: 512, likes_count: 87 },
  { id: 's4', slug: 'notification-panel', title: 'Notification Panel',              short_description: 'Plug-and-play notification panel powered by Google Sheets.',                     thumbnail_url: null, github_link: null, live_link: null, tags: ['Component','Open Source'],  category: 'UI Component', is_featured: true, featured_order: 4, views_count: 140, likes_count: 18 },
  { id: 's5', slug: 'project-exporter-pro', title: 'Project Exporter Pro',          short_description: 'JS export engine: PNG, JPG, SVG, PDF with Shadow DOM isolation.',                thumbnail_url: null, github_link: null, live_link: null, tags: ['Library','Shadow DOM'],     category: 'Dev Tool',     is_featured: true, featured_order: 5, views_count: 195, likes_count: 24 },
  { id: 's6', slug: 'halal',              title: 'Halal — World of Muslims',        short_description: 'Interactive Islamic educational app covering the Five Pillars of Islam.',         thumbnail_url: null, github_link: null, live_link: null, tags: ['Islamic','Educational'],    category: 'Islamic',      is_featured: true, featured_order: 6, views_count: 160, likes_count: 27 },
]

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
      <Link to="/projects"
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

export default function RecentProjects() {
  const [allProjects, setAllProjects]   = useState([])
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

  useEffect(() => {
    let mounted = true
    setLoading(true)

    getFeaturedProjects()
      .then(data => {
        if (!mounted) return
        setAllProjects(data?.length > 0 ? data : STATIC_FALLBACK)
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setAllProjects(STATIC_FALLBACK)
        setLoading(false)
      })

    return () => { mounted = false }
  }, [])

  if (!loading && allProjects.length === 0) return null

  const visible = allProjects.slice(0, visibleCount)

  return (
    <section className="section container-xl">
      <SectionHeader />

      {loading ? (
        <SkeletonGrid count={visibleCount} />
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
            <Link to="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all duration-200 group">
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
