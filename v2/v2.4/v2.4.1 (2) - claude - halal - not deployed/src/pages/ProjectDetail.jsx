// ProjectDetail.jsx — v2.4.1
// Full redesign — advanced, responsive, feature-rich:
//   - Redesigned hero (clickable thumbnail)
//   - Title / action bar (like-dislike, views, report)
//   - Two-column layout (PC): left=content+share+comments, right=sticky sidebar
//   - Sidebar: links + meta + related 3 projects (PC)
//   - Mobile/Tablet: related ABOVE comments (single column)
//   - Advanced share section with 7 platforms + pre-filled messages
//   - ImageViewer: click any image in content for fullscreen preview
//   - Proper OG tags using thumbnail_url as og:image
//   - JSON-LD structured data

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, Navigate }  from 'react-router-dom'
import { Helmet }                     from 'react-helmet-async'
import { motion }                     from 'framer-motion'
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome'
import {
  faGithub, faXTwitter, faLinkedin, faWhatsapp, faTelegram, faFacebook,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFilePdf, faLink, faEye,
  faCalendarDays, faTag, faFolderOpen, faArrowLeft,
  faShareNodes, faChevronRight, faClock, faCode,
  faCopy, faCheck, faArrowRight, faExpand,
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard }            from '../components/shared/VisibilityGuard.jsx'
import Breadcrumb                     from '../components/shared/Breadcrumb.jsx'
import LikeDislike                    from '../components/shared/LikeDislike.jsx'
import ShareButtons                   from '../components/shared/ShareButtons.jsx'
import ReportButton                   from '../components/shared/ReportButton.jsx'
import CommentSection                 from '../components/shared/CommentSection.jsx'
import { useImageViewer, ImageViewer, attachImageViewerToDOM } from '../components/shared/ImageViewer.jsx'
import { CAT_COLORS }                 from '../components/projects/ProjectCard.jsx'
import { buildTitle }                 from '../utils/seo.js'
import { formatCount, formatDate }    from '../utils/formatters.js'
import { trackPage }                  from '../services/analytics.js'
import { toast }                      from '../store/toastStore.js'
import { SITE_CONFIG }                from '../config/site.config.js'
import { getProjectBySlug, getRelatedProjects, incrementProjectViews } from '../services/supabase.js'

// ── Share platform definitions ─────────────────────────────────
function buildShareLinks(url, title, desc) {
  const enc = encodeURIComponent
  return [
    {
      id: 'twitter', label: 'Twitter / X', icon: faXTwitter, color: '#1a1a1a',
      href: `https://twitter.com/intent/tweet?text=${enc(`"${title}" by @mdturzo999 🚀\n\n${desc ? desc.slice(0, 80) + '…' : ''}\n`)}&url=${enc(url)}&hashtags=WebDev,JavaScript,OpenSource`,
    },
    {
      id: 'linkedin', label: 'LinkedIn', icon: faLinkedin, color: '#0077B5',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      id: 'whatsapp', label: 'WhatsApp', icon: faWhatsapp, color: '#25D366',
      href: `https://wa.me/?text=${enc(`*${title}*\n\n${desc ? desc.slice(0, 100) + '…\n\n' : ''}🔗 ${url}`)}`,
    },
    {
      id: 'telegram', label: 'Telegram', icon: faTelegram, color: '#229ED9',
      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(`${title}\n${desc ? desc.slice(0, 80) + '…' : ''}`)}`,
    },
    {
      id: 'facebook', label: 'Facebook', icon: faFacebook, color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
  ]
}

// ── Skeleton ────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-xl py-10">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk h-[260px] sm:h-[320px] w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          <div className="sk h-8 w-2/3 rounded" />
          <div className="sk h-4 w-full rounded" /><div className="sk h-4 w-5/6 rounded" />
          <div className="flex gap-2 mt-3"><div className="sk h-8 w-24 rounded-xl" /><div className="sk h-8 w-20 rounded-xl" /></div>
          <div className="sk h-64 w-full rounded-xl mt-4" />
        </div>
        <div className="space-y-3">
          <div className="sk h-44 w-full rounded-xl" /><div className="sk h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// ── Hero ───────────────────────────────────────────────────────
function ProjectHero({ project, onImageClick }) {
  const color = project.accent ?? CAT_COLORS[project.category] ?? CAT_COLORS.default

  if (project.thumbnail_url) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden mb-8 group" style={{ maxHeight: '380px' }}>
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full object-cover"
          style={{ aspectRatio: '16/7', maxHeight: '380px', objectPosition: 'center top' }}
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)]/60 to-transparent" />
        {/* Expand button */}
        <button
          onClick={onImageClick}
          className="absolute bottom-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-white/80 hover:text-white bg-black/40 backdrop-blur-sm border border-white/15 opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
          title="View full image">
          <FontAwesomeIcon icon={faExpand} className="text-sm" />
        </button>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${color}1E 0%, ${color}08 60%, transparent 100%)`, border: `1px solid ${color}22` }}>
      <div className="text-center z-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
          <FontAwesomeIcon icon={faFolderOpen} className="text-2xl" style={{ color }} />
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}>
          {project.category}
        </span>
      </div>
      <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full opacity-[0.05]" style={{ background: color }} />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-[0.04]" style={{ background: color }} />
    </div>
  )
}

// ── Compact related project card ───────────────────────────────
function MiniProjectCard({ project }) {
  const color = project.accent ?? CAT_COLORS[project.category] ?? CAT_COLORS.default
  return (
    <Link to={`/projects/${project.slug}`}
      className="group flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/30 transition-all">
      <div className="relative w-14 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--bg-surface)]"
        style={{ border: `1px solid ${color}20` }}>
        {project.thumbnail_url ? (
          <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `${color}18` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-xs" style={{ color: `${color}80` }} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: `${color}CC` }}>{project.category}</span>
        <p className="text-xs font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors leading-tight mt-0.5">
          {project.title}
        </p>
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0" />
    </Link>
  )
}

// ── Sidebar card ────────────────────────────────────────────────
function SidebarMetaCard({ project, related, relatedLoading }) {
  const color = project.accent ?? CAT_COLORS[project.category] ?? CAT_COLORS.default
  const links = [
    project.live_link   && { href: project.live_link,   icon: faArrowUpRightFromSquare, label: 'Live Preview',  primary: true  },
    project.github_link && { href: project.github_link, icon: faGithub,                label: 'GitHub Repo',   primary: false },
    project.pdf_link    && { href: project.pdf_link,    icon: faFilePdf,               label: 'PDF Preview',   primary: false },
    project.custom_link && { href: project.custom_link, icon: faLink,                  label: 'Visit Link',    primary: false },
  ].filter(Boolean)

  return (
    <div className="space-y-4">
      {/* Meta card */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
        <div className="p-5 space-y-4">
          {/* Category */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}>
            <FontAwesomeIcon icon={faFolderOpen} className="text-[10px]" />
            {project.category}
          </span>

          {/* Links */}
          {links.length > 0 && (
            <div className="space-y-2">
              {links.map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
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
          <div className="space-y-2.5 pt-2 border-t border-[var(--border-color)]">
            {(project.views_count ?? 0) > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-tertiary)] flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faEye} className="text-[10px]" /> Views
                </span>
                <span className="font-semibold text-[var(--text-primary)]">{formatCount(project.views_count)}</span>
              </div>
            )}
            {project.created_at && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-tertiary)] flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-[10px]" /> Published
                </span>
                <span className="font-medium text-[var(--text-primary)]">{formatDate(project.created_at)}</span>
              </div>
            )}
            {project.updated_at && project.updated_at !== project.created_at && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-tertiary)] flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="text-[10px]" /> Updated
                </span>
                <span className="font-medium text-[var(--text-primary)]">{formatDate(project.updated_at)}</span>
              </div>
            )}
            {project.tech_stack?.length > 0 && (
              <div className="flex items-start justify-between text-xs gap-2">
                <span className="text-[var(--text-tertiary)] flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                  <FontAwesomeIcon icon={faCode} className="text-[10px]" /> Stack
                </span>
                <span className="font-medium text-[var(--text-secondary)] text-right leading-relaxed">
                  {project.tech_stack.slice(0, 4).join(', ')}
                  {project.tech_stack.length > 4 && ` +${project.tech_stack.length - 4}`}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="pt-2 border-t border-[var(--border-color)]">
              <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faTag} className="text-[9px]" /> Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <Link key={tag} to={`/projects?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related projects in sidebar (PC only) */}
      {(relatedLoading || related.length > 0) && (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4">
          <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FontAwesomeIcon icon={faArrowRight} className="text-[9px]" /> Related Projects
          </p>
          {relatedLoading ? (
            <div className="space-y-2">
              {[0,1,2].map(i => (
                <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-[var(--bg-surface-2)]">
                  <div className="sk w-14 h-10 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-1.5"><div className="sk h-2.5 w-1/3 rounded" /><div className="sk h-3 w-3/4 rounded" /></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {related.map(r => <MiniProjectCard key={r.slug} project={r} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Advanced share section ─────────────────────────────────────
function AdvancedShareSection({ project, pageUrl }) {
  const [copied, setCopied] = useState(false)
  const platforms = buildShareLinks(pageUrl, project.title, project.short_description)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      toast.success('Copied!', 'Link copied to clipboard')
      setTimeout(() => setCopied(false), 2200)
    } catch {
      toast.error('Failed', 'Could not copy link')
    }
  }

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: project.title, text: project.short_description || '', url: pageUrl })
      } catch {}
    } else {
      copyLink()
    }
  }

  return (
    <div className="mt-10 pt-8 border-t border-[var(--border-color)]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-[var(--accent-light)]">
          <FontAwesomeIcon icon={faShareNodes} className="text-xs text-[var(--accent-primary)]" />
        </div>
        <p className="text-sm font-bold text-[var(--text-primary)]">Share This Project</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map(p => (
          <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: p.color }}>
            <FontAwesomeIcon icon={p.icon} className="text-sm" />
            <span className="hidden sm:inline">{p.label}</span>
          </a>
        ))}

        {/* Copy link */}
        <button onClick={copyLink}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all hover:-translate-y-0.5">
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={`text-sm transition-colors ${copied ? 'text-emerald-400' : ''}`} />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* Native share */}
        <button onClick={nativeShare}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/25 hover:bg-[var(--accent-primary)] hover:text-white transition-all hover:-translate-y-0.5">
          <FontAwesomeIcon icon={faShareNodes} className="text-sm" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  )
}

// ── JSON-LD structured data ────────────────────────────────────
function jsonLd(project, url) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.seo_description || project.short_description || '',
    url,
    image: project.og_image_url || project.thumbnail_url || '',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.owner.displayName,
      url: SITE_CONFIG.siteURL,
    },
    applicationCategory: project.category,
    ...(project.github_link && { codeRepository: project.github_link }),
    ...(project.live_link   && { installUrl: project.live_link }),
    ...(project.created_at  && { datePublished: project.created_at }),
    ...(project.updated_at  && { dateModified: project.updated_at }),
  })
}

// ── Main content ────────────────────────────────────────────────
function ProjectDetailContent() {
  const { slug }                    = useParams()
  const [project, setProject]       = useState(null)
  const [related, setRelated]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const contentRef                  = useRef(null)
  const viewer                      = useImageViewer()

  const load = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const data = await getProjectBySlug(slug)
      setProject(data)
      if (data?.id) incrementProjectViews(data.id).catch(() => {})
      trackPage(`Projects/${data.title || slug}`)
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

  // Attach image viewer to prose content
  useEffect(() => {
    if (!project || !contentRef.current) return
    const cleanup = attachImageViewerToDOM(contentRef, project.title, viewer)
    return cleanup
  }, [project]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading)          return <DetailSkeleton />
  if (notFound || !project) return <Navigate to="/projects" replace />

  const seoTitle = project.seo_title || project.title
  const seoDesc  = project.seo_description || project.short_description || SITE_CONFIG.seo.defaultDescription
  const ogImage  = project.og_image_url || project.thumbnail_url || SITE_CONFIG.seo.defaultOGImage
  const pageUrl  = `${SITE_CONFIG.siteURL}/projects/${slug}`
  const color    = project.accent ?? CAT_COLORS[project.category] ?? CAT_COLORS.default

  return (
    <>
      <Helmet>
        <title>{buildTitle(seoTitle)}</title>
        <meta name="description"          content={seoDesc} />
        <meta property="og:title"         content={seoTitle} />
        <meta property="og:description"   content={seoDesc} />
        <meta property="og:image"         content={ogImage} />
        <meta property="og:image:width"   content="1200" />
        <meta property="og:image:height"  content="630" />
        <meta property="og:url"           content={pageUrl} />
        <meta property="og:type"          content="article" />
        <meta property="og:site_name"     content={SITE_CONFIG.siteName} />
        <meta name="twitter:card"         content="summary_large_image" />
        <meta name="twitter:title"        content={seoTitle} />
        <meta name="twitter:description"  content={seoDesc} />
        <meta name="twitter:image"        content={ogImage} />
        <link rel="canonical"             href={pageUrl} />
        <script type="application/ld+json">{jsonLd(project, pageUrl)}</script>
      </Helmet>

      {/* ImageViewer portal */}
      <ImageViewer {...viewer} />

      <div className="container-xl py-10 lg:py-14">
        {/* Breadcrumb + back */}
        <Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: project.title }]} />
        <Link to="/projects"
          className="inline-flex items-center gap-2 mt-4 mb-6 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        {/* Hero */}
        <ProjectHero
          project={project}
          onImageClick={() => viewer.open(
            [{ url: project.thumbnail_url, alt: project.title }], 0, project.title
          )}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 lg:gap-10">

          {/* ── Left / main column ──────────────────────────── */}
          <div className="min-w-0">
            {/* Title + meta */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Category + tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                  style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}>
                  <FontAwesomeIcon icon={faFolderOpen} className="text-[10px]" />
                  {project.category}
                </span>
                {project.tags?.slice(0, 4).map(tag => (
                  <Link key={tag} to={`/projects?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)] transition-all">
                    {tag}
                  </Link>
                ))}
                {project.tags?.length > 4 && (
                  <span className="text-xs text-[var(--text-tertiary)]">+{project.tags.length - 4}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight">
                {project.title}
              </h1>

              {/* Short description */}
              {project.short_description && (
                <p className="text-[var(--text-secondary)] mt-3 text-base leading-relaxed">
                  {project.short_description}
                </p>
              )}
            </motion.div>

            {/* Action bar */}
            <motion.div
              className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-[var(--border-color)]"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08 }}>
              <LikeDislike contentType="project" contentId={project.id} />
              <div className="flex items-center gap-2 ml-auto">
                {(project.views_count ?? 0) > 0 && (
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
                    <FontAwesomeIcon icon={faEye} className="text-[10px]" />
                    {formatCount(project.views_count)} views
                  </span>
                )}
                <ReportButton contentType="project" contentId={project.id} />
              </div>
            </motion.div>

            {/* Mobile/tablet: sidebar links (visible only < lg) */}
            <div className="lg:hidden mt-6">
              {[
                project.live_link   && { href: project.live_link,   icon: faArrowUpRightFromSquare, label: 'Live Preview', primary: true  },
                project.github_link && { href: project.github_link, icon: faGithub,                label: 'GitHub Repo',  primary: false },
              ].filter(Boolean).map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 mr-2 mb-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    link.primary
                      ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                  }`}>
                  <FontAwesomeIcon icon={link.icon} className="text-sm" />
                  {link.label}
                </a>
              ))}
            </div>

            {/* Rich content (TipTap HTML) */}
            {project.content && (
              <motion.div
                ref={contentRef}
                className="prose-content mt-8"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.12 }}
                dangerouslySetInnerHTML={{ __html: project.content }} />
            )}

            {/* Advanced share section */}
            <AdvancedShareSection project={project} pageUrl={pageUrl} />

            {/* Mobile/tablet: related projects ABOVE comments */}
            {(relatedLoading || related.length > 0) && (
              <div className="lg:hidden mt-10 pt-8 border-t border-[var(--border-color)]">
                <p className="text-sm font-bold text-[var(--text-primary)] mb-4">Related Projects</p>
                {relatedLoading ? (
                  <div className="space-y-2">
                    {[0,1,2].map(i => (
                      <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-[var(--bg-surface-2)]">
                        <div className="sk w-14 h-10 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-1.5"><div className="sk h-2.5 w-1/3 rounded" /><div className="sk h-3 w-3/4 rounded" /></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {related.map(r => <MiniProjectCard key={r.slug} project={r} />)}
                  </div>
                )}
              </div>
            )}

            {/* Comments */}
            <motion.div
              className="mt-10 pt-8 border-t border-[var(--border-color)]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
              <CommentSection contentType="project" contentId={project.id} contentSlug={project.slug} />
            </motion.div>
          </div>

          {/* ── Right sticky sidebar (desktop only) ──────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--navbar-h)+2rem)] space-y-4 self-start">
              <SidebarMetaCard project={project} related={related} relatedLoading={relatedLoading} />
            </div>
          </div>
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
