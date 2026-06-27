// ProjectDetail.jsx — v2.4.1
// Redesigned Project Detail:
//   - Clean premium grid layout
//   - Click-to-preview on any image inside content or hero thumbnail (uses ImagePreviewModal)
//   - Action panel (Like/Dislike, Views, Report, advanced share cards)
//   - PC Right Column: Sticky links, metadata, and custom share panels (5-7 networks)
//   - PC Related Content: Placed under the right sticky column
//   - Mobile/Tablet Related Content: Placed above the comments in the left column
//   - Responsive SEO parameters and meta thumbnail headers

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub, faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFilePdf, faLink, faEye,
  faCalendarDays, faTag, faFolderOpen, faArrowLeft,
  faShareNodes, faCopy, faCheck, faEnvelope, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import Breadcrumb from '../components/shared/Breadcrumb.jsx'
import LikeDislike from '../components/shared/LikeDislike.jsx'
import CommentSection from '../components/shared/CommentSection.jsx'
import RelatedContent from '../components/shared/RelatedContent.jsx'
import ReportButton from '../components/shared/ReportButton.jsx'
import ImagePreviewModal from '../components/shared/ImagePreviewModal.jsx'
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
    <div className="container-xl py-6 lg:py-10">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk h-64 sm:h-80 w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-5">
          <div className="sk h-8 w-2/3 rounded" />
          <div className="sk h-4 w-full rounded" />
          <div className="sk h-4 w-5/6 rounded" />
          <div className="sk h-4 w-4/5 rounded" />
          <div className="mt-6 sk h-64 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="sk h-36 w-full rounded-2xl" />
          <div className="sk h-48 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// ── Advanced Share Panel ─────────────────────────────────────────
function ShareDashboard({ url, title, description }) {
  const [copied, setCopied] = useState(false)
  const shareText = `Check out this amazing project: "${title}" - ${description || ''}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => console.error(err))
  }

  const handleSystemShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: shareText,
        url: url
      }).catch(err => console.warn('System share error:', err))
    } else {
      handleCopy()
    }
  }

  const platforms = [
    { name: 'Facebook', icon: faFacebook, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: faLinkedin, color: '#0A66C2', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', icon: faWhatsapp, color: '#25D366', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}` },
    { name: 'X / Twitter', icon: faXTwitter, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}` },
    { name: 'Telegram', icon: faTelegram, color: '#26A69A', url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}` },
    { name: 'Email', icon: faEnvelope, color: '#E040FB', url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + url)}` }
  ]

  return (
    <div className="p-4 bg-[var(--bg-surface-2)] rounded-2xl border border-[var(--border-color)] space-y-3">
      <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-1.5">
        <FontAwesomeIcon icon={faShareNodes} className="text-[10px]" />
        Share Project
      </h3>
      
      {/* Platform Buttons grid */}
      <div className="grid grid-cols-3 gap-2">
        {platforms.map(p => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${p.name}`}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <FontAwesomeIcon icon={p.icon} className="text-base" style={{ color: p.color }} />
            <span className="text-[9px] font-semibold">{p.name}</span>
          </a>
        ))}
      </div>

      {/* Copy Link + Native Share Buttons */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-3)] text-xs font-semibold text-[var(--text-secondary)] border border-[var(--border-color)] transition-all">
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-green-500" : ""} />
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
        <button
          onClick={handleSystemShare}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-xs font-semibold text-white shadow-sm transition-all">
          <FontAwesomeIcon icon={faShareNodes} />
          <span>Device Share</span>
        </button>
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
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm">
      {/* Color stripe */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />

      <div className="p-5 space-y-4">
        {/* Category badge */}
        <div className="flex items-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
            style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-[10px]" />
            {project.category}
          </span>
        </div>

        {/* Access Links */}
        {links.length > 0 && (
          <div className="space-y-2">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  link.primary
                    ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white'
                    : 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                }`}>
                <FontAwesomeIcon icon={link.icon} className="text-xs" />
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Project Meta Metrics */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
          {project.views_count > 0 && (
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <FontAwesomeIcon icon={faEye} />
                Views
              </span>
              <span className="font-semibold">{formatViews(project.views_count)}</span>
            </div>
          )}
          {project.created_at && (
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <FontAwesomeIcon icon={faCalendarDays} />
                Published
              </span>
              <span className="font-medium">{formatDate(project.created_at)}</span>
            </div>
          )}
          {project.project_timeline && (
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--text-tertiary)]">Timeline</span>
              <span className="font-medium">{project.project_timeline}</span>
            </div>
          )}
          {project.platform && (
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--text-tertiary)]">Platform</span>
              <span className="font-medium">{project.platform}</span>
            </div>
          )}
          {project.complexity_level && (
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--text-tertiary)]">Complexity</span>
              <span className="font-semibold text-[var(--accent-primary)]">{project.complexity_level}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="pt-3 border-t border-[var(--border-color)]">
            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1">
              <FontAwesomeIcon icon={faTag} className="text-[9px]" />
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/projects?q=${encodeURIComponent(tag)}`}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
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

// ── Hero Banner / Gradient ───────────────────────────────────────
function ProjectHero({ project, onHeroClick }) {
  const color = CAT_COLORS[project.category] ?? CAT_COLORS.default

  if (project.thumbnail_url) {
    return (
      <div 
        onClick={onHeroClick}
        className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 cursor-zoom-in group border border-[var(--border-color)] shadow-sm">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-[var(--border-color)] shadow-sm"
      style={{
        background: `linear-gradient(135deg, ${color}12 0%, ${color}04 50%, transparent 100%)`
      }}>
      <div className="text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <FontAwesomeIcon icon={faFolderOpen} className="text-xl" style={{ color }} />
        </div>
        <span
          className="text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider"
          style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
          {project.category}
        </span>
      </div>
    </div>
  )
}

// ── Main Page Component ──────────────────────────────────────────
function ProjectDetailContent() {
  const { slug }           = useParams()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [relatedLoading, setRelatedLoading] = useState(false)

  // Image Preview Modal States
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [previewIndex, setPreviewIndex] = useState(0)

  const contentRef = useRef(null)

  const load = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const data = await getProjectBySlug(slug)
      if (!data) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setProject(data)
      
      // Track views (optimistically increment)
      if (data?.id) incrementProjectViews(data.id).catch(() => {})
      
      // Page track analytics
      trackPage(`Projects/${data.title || slug}`)

      // Retrieve related projects
      setRelatedLoading(true)
      getRelatedProjects(slug, data.category, data.tags, 3)
        .then(r => {
          setRelated(r || [])
          setRelatedLoading(false)
        })
        .catch(() => setRelatedLoading(false))
    } catch (e) {
      console.error(e)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { load() }, [load])

  // Click handler to catch image clicks in TipTap content area
  const handleContentClick = (e) => {
    const target = e.target
    if (target.tagName === 'IMG') {
      e.preventDefault()
      const imagesInContent = Array.from(contentRef.current.querySelectorAll('img')).map(img => ({
        url: img.src,
        alt: img.alt || project?.title || "Project Image"
      }))
      const clickedIndex = imagesInContent.findIndex(img => img.url === target.src)
      
      setPreviewImages(imagesInContent)
      setPreviewIndex(clickedIndex >= 0 ? clickedIndex : 0)
      setPreviewOpen(true)
    }
  }

  // Hero click handler
  const handleHeroClick = () => {
    if (project?.thumbnail_url) {
      setPreviewImages([{ url: project.thumbnail_url, alt: project.title }])
      setPreviewIndex(0)
      setPreviewOpen(true)
    }
  }

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

      <div className="container-xl py-6 lg:py-10">
        
        {/* Navigation Breadcrumbs */}
        <Breadcrumb items={[
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]} />

        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 mt-3 mb-5 text-xs font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[10px] transition-transform group-hover:-translate-x-0.5" />
          Back to Catalog
        </Link>

        {/* Project Thumbnail Image */}
        <ProjectHero project={project} onHeroClick={handleHeroClick} />

        {/* Responsive Grid System Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8">

          {/* Left Column (Content, Likes, Comments, Mobile suggested) */}
          <div className="min-w-0 space-y-8">
            
            {/* Header info */}
            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] leading-tight">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                  {project.tagline}
                </p>
              )}
              {project.short_description && (
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.short_description}
                </p>
              )}
            </div>

            {/* Like/Dislike action row */}
            <div className="flex flex-wrap items-center gap-3 py-4 border-y border-[var(--border-color)]">
              <LikeDislike contentType="project" contentId={project.id} />
              
              <ReportButton contentType="project" contentId={project.id} />
              
              {project.views_count > 0 && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                  <FontAwesomeIcon icon={faEye} />
                  {formatViews(project.views_count)} views
                </span>
              )}
            </div>

            {/* Rich content (HTML tip-tap style content) */}
            {project.content && (
              <div
                ref={contentRef}
                onClick={handleContentClick}
                className="prose-content select-text"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            )}

            {/* Related projects for Mobile & Tablet viewports */}
            <div className="block lg:hidden pt-4 border-t border-[var(--border-color)]">
              <RelatedContent
                items={related}
                loading={relatedLoading}
                title="Suggested Projects"
              />
            </div>

            {/* Comments thread wrapper */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <CommentSection
                contentType="project"
                contentId={project.id}
                contentSlug={project.slug}
              />
            </div>
          </div>

          {/* Right Column (Meta Card, Share Panel, PC Suggested) */}
          <div className="space-y-6 self-start lg:sticky lg:top-[calc(var(--navbar-h)+1.5rem)]">
            
            {/* Meta statistics card */}
            <MetaCard project={project} />

            {/* Share dashboard panel */}
            <ShareDashboard url={pageUrl} title={project.title} description={project.short_description} />

            {/* Suggested projects on Desktop viewports */}
            <div className="hidden lg:block pt-2">
              <RelatedContent
                items={related}
                loading={relatedLoading}
                title="Related Projects"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Image Preview Popup Modal */}
      <ImagePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        images={previewImages}
        initialIndex={previewIndex}
        projectName={project.title}
      />
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
