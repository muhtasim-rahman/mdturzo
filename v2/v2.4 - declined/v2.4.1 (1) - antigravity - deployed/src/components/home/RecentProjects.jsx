// RecentProjects.jsx — v2.4.0
// Fully dynamic — reads is_featured=true projects from Supabase
// featured_order determines display order (1–6)
// Static fallback shown if DB has no featured projects yet
// Admin manages via Supabase: set is_featured=true, set featured_order 1–6

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFolderOpen, faStar } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../projects/ProjectCard.jsx'
import { getFeaturedProjects } from '../../services/supabase.js'

// Static fallback — shown if no is_featured projects in Supabase yet
const STATIC_FALLBACK = [
  { id: 'linkivo',   slug: 'linkivo',           title: 'Linkivo — Smart Link Manager',  short_description: 'PWA for intelligent link management with GSAP animations and Firebase backend.',     thumbnail_url: 'https://i.ibb.co.com/tM0hm78r/linkivo.webp', github_link: null,                                                    live_link: null,                                          tags: ['PWA', 'Firebase', 'GSAP'],      category: 'Web App',      is_featured: true, featured_order: 1, views_count: 320, likes_count: 45 },
  { id: 'qr-prism',  slug: 'qr-prism',          title: 'QR Prism',                      short_description: 'Feature-rich PWA: QR generation, scanning, batch processing, cloud storage.',       thumbnail_url: 'https://i.ibb.co.com/ch7JtRKQ/qr-prism.webp', github_link: 'https://github.com/muhtasim-rahman/qr-prism',           live_link: 'https://muhtasim-rahman.github.io/qr-prism',   tags: ['PWA', 'Firebase', 'QR'],        category: 'Utility',      is_featured: true, featured_order: 2, views_count: 280, likes_count: 38 },
  { id: 'ufmt',      slug: 'ufmt-ssc26',         title: 'FMT Tracker Pro — SSC-26',      short_description: 'Smart merit tracking dashboard for SSC-26 students powered by Google Sheets.',     thumbnail_url: 'https://i.ibb.co.com/2YqYxGHz/ufmt-ssc26.webp', github_link: 'https://github.com/muhtasim-rahman/UFMT-SSC26',         live_link: 'https://muhtasim-rahman.github.io/UFMT-SSC26/', tags: ['Education', 'Sheets'],          category: 'Education',    is_featured: true, featured_order: 3, views_count: 512, likes_count: 87 },
  { id: 'notif',     slug: 'notification-panel', title: 'Notification Panel',            short_description: 'Plug-and-play notification panel powered by Google Sheets for any website.',       thumbnail_url: 'https://i.ibb.co.com/cSRDz09h/functional-notification-panel.webp', github_link: 'https://github.com/muhtasim-rahman/notification-panel', live_link: null,                                          tags: ['Component', 'Open Source'],     category: 'UI Component', is_featured: true, featured_order: 4, views_count: 140, likes_count: 18 },
  { id: 'exporter',  slug: 'exporter-pro',       title: 'Project Exporter Pro',          short_description: 'JS export engine: PNG, JPG, SVG, PDF with Shadow DOM isolation. Open source.',   thumbnail_url: 'https://i.ibb.co.com/4wQy7GTc/project-exporter-pro.webp', github_link: 'https://github.com/muhtasim-rahman/exporter-pro',       live_link: null,                                          tags: ['Library', 'Shadow DOM'],        category: 'Dev Tool',     is_featured: true, featured_order: 5, views_count: 195, likes_count: 24 },
  { id: 'halal',     slug: 'halal',              title: 'Halal — World of Muslims',      short_description: 'Interactive Islamic resource covering the Five Pillars of Islam.',                 thumbnail_url: 'https://i.ibb.co.com/qYvbmsTH/halal-islamic.webp', github_link: 'https://github.com/muhtasim-rahman/halal',              live_link: 'https://muhtasim-rahman.github.io/halal',      tags: ['Islamic', 'Educational'],       category: 'Islamic',      is_featured: true, featured_order: 6, views_count: 160, likes_count: 27 },
]

function SectionHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
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

function SkeletonGrid() {
  return (
    <div className="rp-grid">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-color)]">
          <div className="sk h-44 w-full" style={{ animationDelay: `${i * 0.06}s` }} />
          <div className="p-4 space-y-3">
            <div className="flex gap-1.5">
              <div className="sk h-5 w-16 rounded-full" style={{ animationDelay: `${i * 0.06 + 0.04}s` }} />
              <div className="sk h-5 w-20 rounded-full" style={{ animationDelay: `${i * 0.06 + 0.08}s` }} />
            </div>
            <div className="sk h-5 w-3/4 rounded" style={{ animationDelay: `${i * 0.06 + 0.12}s` }} />
            <div className="sk h-4 w-full rounded" style={{ animationDelay: `${i * 0.06 + 0.16}s` }} />
            <div className="sk h-4 w-2/3 rounded" style={{ animationDelay: `${i * 0.06 + 0.2}s` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function RecentProjects() {
  const [projects, setProjects]           = useState([])
  const [loading, setLoading]             = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    getFeaturedProjects()
      .then(data => {
        if (!mounted) return
        if (data && data.length > 0) {
          setProjects(data)
          setUsingFallback(false)
        } else {
          // No is_featured projects in DB yet → use static fallback
          setProjects(STATIC_FALLBACK)
          setUsingFallback(true)
        }
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setProjects(STATIC_FALLBACK)
        setUsingFallback(true)
        setLoading(false)
      })

    return () => { mounted = false }
  }, [])

  if (!loading && projects.length === 0) return null

  return (
    <section className="section container-xl">
      <SectionHeader />

      {loading ? (
        <SkeletonGrid />
      ) : (
        <>
          <div className="rp-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id || i} project={p} index={i} view="grid" />
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
