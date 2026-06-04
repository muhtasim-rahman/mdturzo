// ProjectDetailPage.jsx — v2.4.5
// Updated: imports projects.css, updated LikeDislike/CommentSection to local imports

import './projects.css'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFilePdf, faLink, faEye, faCalendarDays, faTag,
  faFolderOpen, faArrowLeft, faShareNodes, faCopy, faCheck, faEnvelope,
  faCode, faGlobe, faLayerGroup, faServer, faDatabase, faCloud,
  faStar, faCheckCircle, faBolt, faUsers, faBuilding,
  faChevronDown, faChevronUp, faInfoCircle, faHashtag
} from '@fortawesome/free-solid-svg-icons'

import Breadcrumb         from '../shared/Breadcrumb.jsx'
import LikeDislike        from './LikeDislike.jsx'
import CommentSection     from './CommentSection.jsx'
import RelatedProjectsRow from './RelatedProjectsRow.jsx'
import ReportButton       from '../shared/ReportButton.jsx'
import ImagePreviewModal  from './ImagePreviewModal.jsx'
import ProjectCarousel    from './ProjectCarousel.jsx'
import ReviewSection      from './ReviewSection.jsx'
import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import { buildTitle }     from '../../utils/seo.js'
import { trackPage }      from '../../services/analytics.js'
import { getProjectBySlug, getRelatedProjects, incrementProjectViews } from '../../services/supabase.js'
import { SITE_CONFIG }    from '../../config/site.config.js'

function fmt(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function fmtDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
function asArray(v) {
  if (!v) return []
  if (Array.isArray(v)) return v
  if (typeof v === 'string') { try { return JSON.parse(v) } catch { return [] } }
  return []
}

function DetailSkeleton() {
  return (
    <div className="container-xl py-6 lg:py-10">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk h-[260px] sm:h-[320px] w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-5">
          <div className="sk h-8 w-3/4 rounded" />
          <div className="sk h-4 w-1/2 rounded" />
          <div className="sk h-16 w-full rounded-xl" />
          <div className="sk h-28 w-full rounded-xl" />
          <div className="sk h-48 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="sk h-52 w-full rounded-2xl" />
          <div className="sk h-40 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  if (!status) return null
  const M = {
    active:           'text-emerald-500 bg-emerald-500/10 border-emerald-500/25',
    completed:        'text-sky-400 bg-sky-500/10 border-sky-500/25',
    archived:         'text-amber-500 bg-amber-500/10 border-amber-500/25',
    discontinued:     'text-rose-400 bg-rose-500/10 border-rose-500/25',
    beta:             'text-orange-400 bg-orange-500/10 border-orange-500/25',
    'in-development': 'text-violet-400 bg-violet-500/10 border-violet-500/25',
  }
  const cls   = M[status?.toLowerCase()] ?? 'text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] border-[var(--border-color)]'
  const label = status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />{label}
    </span>
  )
}

function ComplexityBadge({ level }) {
  if (!level) return null
  const M = { beginner: [1,'text-emerald-500'], intermediate: [2,'text-amber-500'], advanced: [3,'text-orange-500'], expert: [4,'text-rose-500'] }
  const [count, cls] = M[level?.toLowerCase()] ?? [2,'text-[var(--text-secondary)]']
  return (
    <div className={`flex items-center gap-0.5 ${cls}`}>
      {Array.from({ length: 4 }, (_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} className={`text-[8px] ${i < count ? '' : 'opacity-20'}`} />
      ))}
      <span className="ml-1 text-[9px] font-bold capitalize">{level}</span>
    </div>
  )
}

function TechStackSection({ project }) {
  const groups = [
    { key: 'tech_stack',  label: 'Stack',      icon: faLayerGroup, accent: true  },
    { key: 'languages',   label: 'Languages',  icon: faCode,       accent: false },
    { key: 'frameworks',  label: 'Frameworks', icon: faBolt,       accent: false },
    { key: 'libraries',   label: 'Libraries',  icon: faHashtag,    accent: false },
    { key: 'backend',     label: 'Backend',    icon: faServer,     accent: false, scalar: true },
    { key: 'database',    label: 'Database',   icon: faDatabase,   accent: false, scalar: true },
    { key: 'hosting',     label: 'Hosting',    icon: faCloud,      accent: false, scalar: true },
  ]
  const available = groups.filter(g => {
    const v = project[g.key]
    if (g.scalar) return !!v
    return asArray(v).length > 0
  })
  if (!available.length) return null

  return (
    <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)]">
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2 bg-[var(--bg-surface-2)]/60">
        <div className="w-6 h-6 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon icon={faCode} className="text-[9px] text-[var(--accent-primary)]" />
        </div>
        <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Tech Stack</h3>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {available.map(({ key, label, icon, accent, scalar }) => {
          const items = scalar ? [project[key]] : asArray(project[key])
          return (
            <div key={key} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-2)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <FontAwesomeIcon icon={icon} className="text-[9px] text-[var(--text-tertiary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-1.5">{label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span key={item} className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border whitespace-nowrap ${
                      accent
                        ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]/20'
                        : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border-color)]'
                    }`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KeyFeatures({ features }) {
  const [expanded, setExpanded] = useState(false)
  const items = asArray(features)
  if (!items.length) return null
  const visible = expanded ? items : items.slice(0, 6)
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
        <span className="w-5 h-5 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-[8px] text-[var(--accent-primary)]" />
        </span>
        Key Features
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {visible.map((f, i) => (
          <div key={i} className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <div className="w-4 h-4 rounded bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <FontAwesomeIcon icon={faBolt} className="text-[7px] text-[var(--accent-primary)]" />
            </div>
            <span className="text-xs text-[var(--text-secondary)] leading-snug">{f}</span>
          </div>
        ))}
      </div>
      {items.length > 6 && (
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
          <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="text-[9px]" />
          {expanded ? 'Show less' : `${items.length - 6} more features`}
        </button>
      )}
    </div>
  )
}

function SidebarMeta({ project, compact = false }) {
  const links = [
    project.live_link   && { href: project.live_link,   icon: faArrowUpRightFromSquare, label: 'Live Preview',   primary: true  },
    project.github_link && { href: project.github_link, icon: faGithub,                label: 'GitHub Repo',    primary: false },
    project.pdf_link    && { href: project.pdf_link,    icon: faFilePdf,               label: 'PDF',            primary: false },
    project.custom_link && { href: project.custom_link, icon: faLink,                  label: project.custom_link_label || 'Visit Link', primary: false },
  ].filter(Boolean)

  const meta = [
    project.views_count > 0    && { icon: faEye,          label: 'Views',      value: fmt(project.views_count) },
    project.created_at         && { icon: faCalendarDays, label: 'Published',  value: fmtDate(project.created_at) },
    project.project_timeline   && { icon: faCalendarDays, label: 'Timeline',   value: project.project_timeline },
    project.version            && { icon: faInfoCircle,   label: 'Version',    value: project.version },
    project.platform           && { icon: faGlobe,        label: 'Platform',   value: project.platform },
    project.team_size > 1      && { icon: faUsers,        label: 'Team',       value: `${project.team_size} members` },
    project.role               && { icon: faUsers,        label: 'Role',       value: project.role },
    project.institution        && { icon: faBuilding,     label: 'Institution',value: project.institution },
    project.client             && { icon: faBuilding,     label: 'Client',     value: project.client },
  ].filter(Boolean)

  const tags = asArray(project.tags)

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-hover)] to-transparent" />
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
            <FontAwesomeIcon icon={faFolderOpen} className="text-[8px]" />
            {project.category}
          </span>
          {project.project_status && <StatusBadge status={project.project_status} />}
          {project.complexity_level && <ComplexityBadge level={project.complexity_level} />}
          {project.open_source === true && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/25">
              Open Source
            </span>
          )}
        </div>

        {links.length > 0 && (
          <div className={compact ? 'grid grid-cols-2 gap-1.5' : 'space-y-2'}>
            {links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  l.primary
                    ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-sm'
                    : 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-strong)]'
                }`}>
                <FontAwesomeIcon icon={l.icon} className="text-xs" />
                {l.label}
              </a>
            ))}
          </div>
        )}

        {meta.length > 0 && (
          <div className={`border-t border-[var(--border-color)] pt-3 ${compact ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'space-y-2.5'}`}>
            {meta.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-[var(--text-tertiary)] font-medium flex-shrink-0">
                  <FontAwesomeIcon icon={icon} className="text-[9px]" />
                  {label}
                </span>
                <span className="font-semibold text-[var(--text-secondary)] text-right truncate text-[10px]">{value}</span>
              </div>
            ))}
          </div>
        )}

        {(project.has_pwa || project.has_dark_mode || project.has_responsive) && (
          <div className="border-t border-[var(--border-color)] pt-3 flex flex-wrap gap-1.5">
            {project.has_pwa        === true && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-lg bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">PWA</span>}
            {project.has_dark_mode  === true && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">Dark Mode</span>}
            {project.has_responsive === true && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">Responsive</span>}
          </div>
        )}

        {!compact && tags.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-3">
            <p className="text-[8px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1">
              <FontAwesomeIcon icon={faTag} className="text-[7px]" /> Tags
            </p>
            <div className="flex flex-wrap gap-1">
              {tags.map(tag => (
                <Link key={tag} to={`/projects?q=${encodeURIComponent(tag)}`}
                  className="text-[9px] font-medium px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 hover:text-[var(--accent-primary)] transition-all">
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

function SharePanel({ url, title, description }) {
  const [copied, setCopied] = useState(false)
  const shareText = `${title}${description ? ` — ${description.slice(0, 80)}` : ''}`
  const platforms = [
    { name: 'Facebook', icon: faFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: '#1877F2' },
    { name: 'LinkedIn', icon: faLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: '#0A66C2' },
    { name: 'WhatsApp', icon: faWhatsapp, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}`, color: '#25D366' },
    { name: 'X',        icon: faXTwitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, color: '#000' },
    { name: 'Telegram', icon: faTelegram, href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, color: '#229ED9' },
    { name: 'Email',    icon: faEnvelope, href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + url)}`, color: '#E040FB' },
  ]
  const copy = async () => {
    await navigator.clipboard.writeText(url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/60">
        <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 uppercase tracking-wider">
          <FontAwesomeIcon icon={faShareNodes} className="text-[var(--accent-primary)] text-[9px]" />
          Share
        </h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {platforms.map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
              title={`Share on ${p.name}`}
              className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all">
              <FontAwesomeIcon icon={p.icon} className="text-base" style={{ color: p.color }} />
              <span className="text-[8px] font-semibold text-[var(--text-secondary)]">{p.name}</span>
            </a>
          ))}
        </div>
        <button onClick={copy}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-xs transition-all">
          <span className="text-[var(--text-tertiary)] font-mono text-[9px] truncate">{url.replace('https://', '')}</span>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={`flex-shrink-0 ml-2 text-[10px] ${copied ? 'text-emerald-500' : 'text-[var(--text-tertiary)]'}`} />
        </button>
        {navigator.share && (
          <button onClick={() => navigator.share({ title, url }).catch(() => {})}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-all">
            <FontAwesomeIcon icon={faShareNodes} /> Share via Device
          </button>
        )}
      </div>
    </div>
  )
}

function ProjectDetailContent() {
  const { slug }                            = useParams()
  const [project, setProject]               = useState(null)
  const [related, setRelated]               = useState([])
  const [loading, setLoading]               = useState(true)
  const [notFound, setNotFound]             = useState(false)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [previewOpen, setPreviewOpen]       = useState(false)
  const [previewImages, setPreviewImages]   = useState([])
  const [previewIndex, setPreviewIndex]     = useState(0)
  const contentRef                          = useRef(null)

  const load = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const data = await getProjectBySlug(slug)
      if (!data) { setNotFound(true); return }
      setProject(data)
      incrementProjectViews(data.id).catch(() => {})
      trackPage(`Projects/${data.title || slug}`)
      setRelatedLoading(true)
      getRelatedProjects(slug, data.category, asArray(data.tags), 6)
        .then(r => { setRelated(r || []); setRelatedLoading(false) })
        .catch(() => setRelatedLoading(false))
    } catch { setNotFound(true) }
    finally { setLoading(false) }
  }, [slug])

  useEffect(() => { load() }, [load])

  const handleContentClick = (e) => {
    if (e.target.tagName !== 'IMG' || !contentRef.current) return
    e.preventDefault()
    const imgs = Array.from(contentRef.current.querySelectorAll('img')).map(img => ({ url: img.src, alt: img.alt || project?.title }))
    const idx  = imgs.findIndex(img => img.url === e.target.src)
    setPreviewImages(imgs)
    setPreviewIndex(idx >= 0 ? idx : 0)
    setPreviewOpen(true)
  }

  const handleCarouselImageClick = (slides, idx) => {
    setPreviewImages(slides.map(s => ({ url: s.url, alt: s.caption || project?.title })))
    setPreviewIndex(idx)
    setPreviewOpen(true)
  }

  if (loading) return <DetailSkeleton />
  if (notFound || !project) return <Navigate to="/projects" replace />

  const seoTitle    = project.seo_title || project.title
  const seoDesc     = project.seo_description || project.short_description || ''
  const ogImage     = project.og_image_url || project.thumbnail_url || SITE_CONFIG.seo?.defaultOGImage || ''
  const pageUrl     = `${SITE_CONFIG.siteURL}/projects/${slug}`
  const screenshots = asArray(project.screenshots)
  const tags        = asArray(project.tags)

  return (
    <>
      <Helmet>
        <title>{buildTitle(seoTitle)}</title>
        <meta name="description"         content={seoDesc} />
        <meta property="og:title"        content={seoTitle} />
        <meta property="og:description"  content={seoDesc} />
        <meta property="og:image"        content={ogImage} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url"          content={pageUrl} />
        <meta property="og:type"         content="article" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image"       content={ogImage} />
        <link rel="canonical"            href={pageUrl} />
      </Helmet>

      <div className="container-xl py-6 lg:py-10">
        <Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: project.title }]} />

        <Link to="/projects"
          className="inline-flex items-center gap-1.5 mt-3 mb-6 text-xs font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[10px] transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        <ProjectCarousel
          thumbnail_url={project.thumbnail_url}
          screenshots={screenshots}
          category={project.category}
          onImageClick={handleCarouselImageClick}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_296px] gap-8">

          {/* ── LEFT ── */}
          <div className="min-w-0 space-y-8">
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] leading-tight">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-sm font-semibold text-[var(--accent-primary)] flex items-center gap-2">
                  <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
                  {project.tagline}
                </p>
              )}
              {project.short_description && (
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.short_description}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 py-2.5 px-4 bg-[var(--bg-surface-2)] rounded-xl border border-[var(--border-color)]">
              <LikeDislike contentType="project" contentId={project.id} />
              <div className="hidden sm:block w-px h-5 bg-[var(--border-color)]" />
              <ReportButton contentType="project" contentId={project.id} />
              {project.views_count > 0 && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] font-medium">
                  <FontAwesomeIcon icon={faEye} className="text-[9px]" />
                  {fmt(project.views_count)} views
                </span>
              )}
            </div>

            {/* Mobile sidebar */}
            <div className="block lg:hidden">
              <SidebarMeta project={project} compact={true} />
            </div>

            <TechStackSection project={project} />
            <KeyFeatures features={project.key_features} />

            {project.content && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-[8px] text-[var(--accent-primary)]" />
                  </span>
                  About This Project
                </h3>
                <div
                  ref={contentRef}
                  onClick={handleContentClick}
                  className="prose-content select-text cursor-auto"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
            )}

            {project.notes && (
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border-l-2 border-l-[var(--accent-primary)] border border-[var(--border-color)]">
                <p className="text-[9px] font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <FontAwesomeIcon icon={faInfoCircle} /> Developer Note
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{project.notes}</p>
              </div>
            )}

            {/* Mobile share */}
            <div className="block lg:hidden">
              <SharePanel url={pageUrl} title={project.title} description={project.short_description} />
            </div>

            {/* Reviews */}
            <ReviewSection projectId={project.id} />

            {/* Related */}
            <div className="border-t border-[var(--border-color)] pt-6">
              <RelatedProjectsRow items={related} loading={relatedLoading} />
            </div>

            {/* Comments */}
            <div className="border-t border-[var(--border-color)] pt-6">
              <CommentSection contentType="project" contentId={project.id} contentSlug={project.slug} />
            </div>
          </div>

          {/* ── RIGHT sidebar (PC) ── */}
          <div className="hidden lg:flex flex-col gap-5 self-start lg:sticky lg:top-[calc(var(--navbar-h)+1.5rem)]">
            <SidebarMeta project={project} />
            <SharePanel url={pageUrl} title={project.title} description={project.short_description} />
          </div>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        images={previewImages}
        initialIndex={previewIndex}
        projectName={project.title}
        projectUrl={pageUrl}
      />
    </>
  )
}

export default function ProjectDetailPage() {
  return (
    <VisibilityGuard page="projects" skeleton="detail">
      <ProjectDetailContent />
    </VisibilityGuard>
  )
}
