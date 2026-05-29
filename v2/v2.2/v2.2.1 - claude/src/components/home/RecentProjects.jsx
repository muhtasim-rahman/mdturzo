// ============================================================
// RecentProjects.jsx — v2.2.0
// Featured projects grid — Supabase, skeleton, fallback
// ============================================================

import { useState, useEffect } from 'react'
import { Link }   from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faArrowRight,
  faFolderOpen, faTag,
} from '@fortawesome/free-solid-svg-icons'
import { getFeaturedProjects } from '../../services/supabase.js'
import { SkeletonCard }        from '../ui/Skeleton.jsx'

// ── Fallback static projects (shown when Supabase is empty/loading fails) ──
const FALLBACK_PROJECTS = [
  {
    id: 'linkivo',
    slug: 'linkivo',
    title: 'Linkivo — Smart Link Manager',
    short_description: 'A PWA for intelligent link management with weighted discovery and GSAP animations.',
    thumbnail_url: null,
    github_link: null,
    live_link: null,
    tags: ['PWA', 'Firebase', 'GSAP', 'Vanilla JS'],
    category: 'Web App',
  },
  {
    id: 'qr-prism',
    slug: 'qr-prism',
    title: 'QR Prism',
    short_description: 'Feature-rich PWA for QR code generation, scanning, batch processing with cloud storage.',
    thumbnail_url: null,
    github_link: 'https://github.com/muhtasim-rahman/qr-prism',
    live_link: 'https://muhtasim-rahman.github.io/qr-prism',
    tags: ['PWA', 'Firebase', 'QR Code', 'SVG'],
    category: 'Utility',
  },
  {
    id: 'ufmt-ssc26',
    slug: 'ufmt-ssc26',
    title: 'FMT Tracker Pro — SSC-26',
    short_description: 'Merit tracking dashboard for SSC-26 students powered by Google Sheets.',
    thumbnail_url: null,
    github_link: 'https://github.com/muhtasim-rahman/UFMT-SSC26',
    live_link: 'https://muhtasim-rahman.github.io/UFMT-SSC26/',
    tags: ['Education', 'Google Sheets', 'PWA', 'Charts'],
    category: 'Education',
  },
  {
    id: 'notification-panel',
    slug: 'notification-panel',
    title: 'Functional Notification Panel',
    short_description: 'Plug-and-play notification panel powered by Google Sheets for any website.',
    thumbnail_url: null,
    github_link: 'https://github.com/muhtasim-rahman/notification-panel',
    live_link: 'https://muhtasim-rahman.github.io/notification-panel/',
    tags: ['Component', 'Google Sheets', 'Open Source'],
    category: 'UI Component',
  },
  {
    id: 'exporter-pro',
    slug: 'exporter-pro',
    title: 'Project Exporter Pro',
    short_description: 'Self-contained JS export engine supporting PNG, JPG, SVG, PDF with Shadow DOM isolation.',
    thumbnail_url: null,
    github_link: 'https://github.com/muhtasim-rahman/exporter-pro',
    live_link: 'https://muhtasim-rahman.github.io/exporter-pro',
    tags: ['Library', 'Shadow DOM', 'Open Source'],
    category: 'Developer Tool',
  },
  {
    id: 'halal',
    slug: 'halal',
    title: 'Halal — The World of Muslims',
    short_description: 'Interactive Islamic resource website covering the Five Pillars of Islam.',
    thumbnail_url: null,
    github_link: 'https://github.com/muhtasim-rahman/halal',
    live_link: 'https://muhtasim-rahman.github.io/halal',
    tags: ['Islamic', 'Educational', 'HTML/CSS'],
    category: 'Islamic',
  },
]

// ── Project Card ───────────────────────────────────────────
const CATEGORY_COLORS = {
  'Web App':       '#3B82F6',
  'Utility':       '#10B981',
  'Education':     '#F59E0B',
  'UI Component':  '#EC4899',
  'Developer Tool':'#A855F7',
  'Islamic':       '#06B6D4',
  'default':       '#64748B',
}

function ProjectCard({ project, index }) {
  const color = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.default

  return (
    <motion.div
      className="card group flex flex-col overflow-hidden
        hover:border-[var(--accent-primary)] transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-[var(--bg-surface-2)] overflow-hidden flex-shrink-0">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500
              group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${color}18, ${color}08)`,
            }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-3xl" style={{ color: `${color}60` }} />
            <span className="text-xs text-[var(--text-tertiary)]">{project.category}</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${color}22`,
              color,
              border: `1px solid ${color}35`,
              backdropFilter: 'blur(4px)',
            }}
          >
            {project.category ?? 'Project'}
          </span>
        </div>

        {/* Links overlay */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100
          transition-opacity duration-200">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-md bg-[var(--bg-surface-2)]/90 backdrop-blur-sm
                flex items-center justify-center text-[var(--text-secondary)]
                hover:text-[var(--text-primary)] border border-[var(--border-color)]
                transition-colors duration-150 text-xs"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-md bg-[var(--bg-surface-2)]/90 backdrop-blur-sm
                flex items-center justify-center text-[var(--text-secondary)]
                hover:text-[var(--text-primary)] border border-[var(--border-color)]
                transition-colors duration-150 text-xs"
              aria-label="Live preview"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full
                  bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]"
              >
                <FontAwesomeIcon icon={faTag} className="text-[8px]" />
                {t}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full
                bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display font-bold text-[var(--text-primary)] leading-tight
          group-hover:text-[var(--accent-primary)] transition-colors duration-200 line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
          {project.short_description}
        </p>

        {/* Footer */}
        <div className="pt-2 border-t border-[var(--border-color)]">
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center justify-between text-xs font-semibold
              text-[var(--text-secondary)] hover:text-[var(--accent-primary)]
              transition-colors duration-200 group/link"
          >
            <span>View details</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[10px] transition-transform duration-200
                group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function RecentProjects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        const data = await getFeaturedProjects()
        if (!cancelled) {
          if (data && data.length > 0) {
            setProjects(data)
            setUsedFallback(false)
          } else {
            // No featured projects in DB yet — use fallback
            setProjects(FALLBACK_PROJECTS)
            setUsedFallback(true)
          }
        }
      } catch {
        if (!cancelled) {
          setProjects(FALLBACK_PROJECTS)
          setUsedFallback(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 500) // min 500ms skeleton

    return () => { cancelled = true; clearTimeout(timer) }
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
              My Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
              Featured Projects
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold
                text-[var(--text-secondary)] hover:text-[var(--accent-primary)]
                transition-colors duration-200 group"
            >
              All projects
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)
            : projects.map((p, i) => (
                <ProjectCard key={p.id ?? p.slug} project={p} index={i} />
              ))
          }
        </div>

        {usedFallback && !loading && (
          <motion.p
            className="text-center text-xs text-[var(--text-tertiary)] mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Showing sample projects. Full project list coming from database soon.
          </motion.p>
        )}
      </div>
    </section>
  )
}
