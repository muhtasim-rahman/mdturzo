// ProjectDetail.jsx — v2.4.0
// Full project detail:
//   - Breadcrumb, hero (thumbnail/gradient), meta tags
//   - Content (HTML from TipTap stored in DB)
//   - Actions: Like/Dislike, Views, Share, Report
//   - Comments section
//   - Related projects (same category)
//   - Skeleton loading throughout

import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFilePdf, faLink, faEye,
  faCalendarDays, faTag, faFolderOpen, faArrowLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import Breadcrumb from '../components/shared/Breadcrumb.jsx'
import LikeDislike from '../components/shared/LikeDislike.jsx'
import ShareButtons from '../components/shared/ShareButtons.jsx'
import ReportButton from '../components/shared/ReportButton.jsx'
import CommentSection from '../components/shared/CommentSection.jsx'
import RelatedContent from '../components/shared/RelatedContent.jsx'
import { buildTitle } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { getProjectBySlug, getRelatedProjects, incrementProjectViews } from '../services/supabase.js'
import { SITE_CONFIG } from '../config/site.config.js'

const CAT_COLORS = {
  'Web App': '#3B82F6', 'Utility': '#10B981', 'Education': '#F59E0B',
  'UI Component': '#EC4899', 'Dev Tool': '#A855F7', 'Islamic': '#06B6D4',
  'Tool': '#F97316', 'Portfolio': '#8B5CF6', 'Design': '#F43F5E', 'default': '#64748B',
}

function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatViews(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// ── Skeleton ────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-xl py-10">
      <div className="sk h-4 w-48 rounded mb-8" />
      {/* Hero */}
      <div className="sk h-64 sm:h-80 w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-5">
          <div className="sk h-8 w-2/3 rounded" />
          <div className="sk h-4 w-full rounded" />
          <div className="sk h-4 w-5/6 rounded" />
          <div className="sk h-4 w-4/5 rounded" />
          <div className="mt-6 sk h-64 w-full rounded-xl" />
        </div>
        <div className="space-y-4">
          <div className="sk h-36 w-full rounded-xl" />
          <div className="sk h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// ── Sidebar: meta card ──────────────────────────────────────────
function MetaCard({ project }) {
  const color = CAT_COLORS[project.category] ?? CAT_COLORS.default
  const links = [
    project.live_link    && { href: project.live_link,    icon: faArrowUpRightFromSquare, label: 'Live Preview', primary: true },
    project.github_link  && { href: project.github_link,  icon: faGithub,                label: 'GitHub Repo',  primary: false },
    project.pdf_link     && { href: project.pdf_link,     icon: faFilePdf,               label: 'PDF Preview',  primary: false },
    project.custom_link  && { href: project.custom_link,  icon: faLink,                  label: 'Visit Link',   primary: false },
  ].filter(Boolean)

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      {/* Color top strip */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}70)` }} />

      <div className="p-5 space-y-4">
        {/* Category */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-[10px]" />
            {project.category}
          </span>
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="space-y-2">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  link.primary
                    ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white'
                    : 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}>
                <FontAwesomeIcon icon={link.icon} className="text-sm flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Meta rows */}
        <div className="space-y-2.5 pt-1 border-t border-[var(--border-color)]">
          {project.views_count > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-tertiary)] flex items-center gap-1.5">
                <FontAwesomeIcon icon={faEye} className="text-xs" />
                Views
              </span>
              <span className="text-[var(--text-primary)] font-semibold">{formatViews(project.views_count)}</span>
            </div>
          )}
          {project.created_at && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-tertiary)] flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                Published
              </span>
              <span className="text-[var(--text-primary)] font-medium">{formatDate(project.created_at)}</span>
            </div>
          )}
          {project.updated_at && project.updated_at !== project.created_at && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-tertiary)]">Updated</span>
              <span className="text-[var(--text-primary)] font-medium">{formatDate(project.updated_at)}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="pt-1 border-t border-[var(--border-color)]">
            <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faTag} className="text-[10px]" />
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/projects?q=${encodeURIComponent(tag)}`}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Hero image / gradient ───────────────────────────────────────
function ProjectHero({ project }) {
  const color = CAT_COLORS[project.category] ?? CAT_COLORS.default

  if (project.thumbnail_url) {
    return (
      <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden mb-8">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)]/80 to-transparent" />
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${color}20 0%, ${color}08 50%, transparent 100%)`, border: `1px solid ${color}20` }}>
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
          <FontAwesomeIcon icon={faFolderOpen} className="text-2xl" style={{ color }} />
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
          {project.category}
        </span>
      </div>
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-[0.06]"
        style={{ background: color }} />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-[0.04]"
        style={{ background: color }} />
    </div>
  )
}

// ── Main content ────────────────────────────────────────────────
function ProjectDetailContent() {
  const { slug }           = useParams()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [relatedLoading, setRelatedLoading] = useState(false)

  const load = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const data = await getProjectBySlug(slug)
      setProject(data)
      // Track view
      if (data?.id) incrementProjectViews(data.id).catch(() => {})
      // Track page
      trackPage(`Projects/${data.title || slug}`)
      // Load related
      setRelatedLoading(true)
      getRelatedProjects(slug, data.category, data.tags)
        .then(r => { setRelated(r || []); setRelatedLoading(false) })
        .catch(() => setRelatedLoading(false))
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { load() }, [load])

  if (loading) return <DetailSkeleton />
  if (notFound || !project) return <Navigate to="/projects" replace />

  const seoTitle = project.seo_title || project.title
  const seoDesc  = project.seo_description || project.short_description || SITE_CONFIG.seo.defaultDescription
  const ogImage  = project.thumbnail_url || SITE_CONFIG.seo.defaultOGImage
  const pageUrl  = `${SITE_CONFIG.siteURL}/projects/${slug}`

  return (
    <>
      <Helmet>
        <title>{buildTitle(seoTitle)}</title>
        <meta name="description"       content={seoDesc} />
        <meta property="og:title"      content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image"      content={ogImage} />
        <meta property="og:url"        content={pageUrl} />
        <meta property="og:type"       content="article" />
        <link rel="canonical"          href={pageUrl} />
      </Helmet>

      <div className="container-xl py-10 lg:py-14">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]} />

        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mt-4 mb-6 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        {/* Hero image */}
        <ProjectHero project={project} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 lg:gap-10">

          {/* ── Main column ─────────────────────────────────── */}
          <div className="min-w-0">
            {/* Title + short description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] leading-tight">
                {project.title}
              </h1>
              {project.short_description && (
                <p className="text-[var(--text-secondary)] mt-3 text-base leading-relaxed">
                  {project.short_description}
                </p>
              )}
            </motion.div>

            {/* Action bar */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-[var(--border-color)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}>
              <LikeDislike contentType="project" contentId={project.id} />
              <ShareButtons url={pageUrl} title={project.title} />
              <ReportButton contentType="project" contentId={project.id} />
              {project.views_count > 0 && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                  <FontAwesomeIcon icon={faEye} />
                  {formatViews(project.views_count)} views
                </span>
              )}
            </motion.div>

            {/* Rich content (TipTap HTML) */}
            {project.content && (
              <motion.div
                className="prose-content mt-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                dangerouslySetInnerHTML={{ __html: project.content }} />
            )}

            {/* Comments */}
            <motion.div
              className="mt-12 pt-8 border-t border-[var(--border-color)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}>
              <CommentSection
                contentType="project"
                contentId={project.id}
                contentSlug={project.slug} />
            </motion.div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <div className="lg:sticky lg:top-[calc(var(--navbar-h)+2rem)] self-start space-y-5">
            <MetaCard project={project} />
          </div>
        </div>

        {/* Related projects */}
        <div className="mt-16 pt-8 border-t border-[var(--border-color)]">
          <RelatedContent
            items={related}
            loading={relatedLoading}
            title="Related Projects" />
        </div>
      </div>
    </>
  )
}

export default function ProjectDetail() {
  return (
    <VisibilityGuard page="projects" skeleton="detail">
      <ProjectDetailContent />
    </VisibilityGuard>
  )
}
