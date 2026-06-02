// ProjectDetail.jsx — v2.4.2
// Complete redesign:
//   - Rich 2-column layout (PC), single column (tablet/mobile)
//   - All Supabase data beautifully presented
//   - Firebase RTDB view/like/comment tracking
//   - Breadcrumb: project name truncated properly
//   - Thumbnail as OG meta image
//   - ImagePreviewModal: scroll zoom + new action buttons
//   - Sections: title, tagline, tags, action buttons, like/dislike/views/report,
//     share panel, main content, related projects, comments

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub, faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFilePdf, faLink, faEye,
  faCalendarDays, faTag, faFolderOpen, faArrowLeft,
  faShareNodes, faCopy, faCheck, faEnvelope,
  faCodeBranch, faLayerGroup, faFlask, faTerminal,
  faListCheck, faPuzzlePiece, faGlobe, faClock,
  faHashtag, faChevronDown, faChevronUp, faCircle,
  faStar, faCode, faUsers, faScaleBalanced,
  faRocket, faBoxOpen, faPlay, faMagnifyingGlassPlus
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
import { trackInteractionView } from '../services/firebase.js'
import { SITE_CONFIG } from '../config/site.config.js'

function fmtDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
function fmtViews(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// ── Complexity badge color ──────────────────────────────────────
const COMPLEXITY_COLOR = {
  Beginner:     'text-green-500 bg-green-500/10 border-green-500/20',
  Intermediate: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  Advanced:     'text-orange-500 bg-orange-500/10 border-orange-500/20',
  Expert:       'text-purple-500 bg-purple-500/10 border-purple-500/20',
}
const STATUS_COLOR = {
  'Active Development': 'text-green-500 bg-green-500/10 border-green-500/20',
  'Completed':          'text-blue-500 bg-blue-500/10 border-blue-500/20',
  'Archived':           'text-gray-500 bg-gray-500/10 border-gray-500/20',
  'Beta':               'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  'Published':          'text-teal-500 bg-teal-500/10 border-teal-500/20',
  'In Development':     'text-orange-500 bg-orange-500/10 border-orange-500/20',
  'Discontinued':       'text-red-500 bg-red-500/10 border-red-500/20',
}

// ── Skeleton ───────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-xl py-6 lg:py-10">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk h-56 sm:h-72 w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-5">
          <div className="sk h-7 w-2/3 rounded" />
          <div className="sk h-4 w-full rounded" />
          <div className="sk h-4 w-5/6 rounded" />
          <div className="sk h-48 w-full rounded-2xl mt-4" />
        </div>
        <div className="space-y-4">
          <div className="sk h-36 w-full rounded-2xl" />
          <div className="sk h-44 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// ── Action link buttons ─────────────────────────────────────────
function ActionLinks({ project }) {
  const links = [
    project.live_link   && { href: project.live_link,   icon: faRocket,                label: 'Live Preview', primary: true },
    project.github_link && { href: project.github_link, icon: faGithub,                label: 'GitHub' },
    project.demo_link   && { href: project.demo_link,   icon: faPlay,                  label: 'Demo' },
    project.pdf_link    && { href: project.pdf_link,    icon: faFilePdf,               label: 'PDF' },
    project.custom_link && { href: project.custom_link, icon: faLink,                  label: 'Visit Link' },
  ].filter(Boolean)

  if (links.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            link.primary
              ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-sm'
              : 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-strong)]'
          }`}>
          <FontAwesomeIcon icon={link.icon} className="text-xs" />
          {link.label}
        </a>
      ))}
    </div>
  )
}

// ── Share panel ─────────────────────────────────────────────────
function SharePanel({ url, title, description, isOpen }) {
  const [copied, setCopied] = useState(false)
  const shareText = `${title} — ${description || ''}`
  const platforms = [
    { n: 'Facebook',  icon: faFacebook,  color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { n: 'WhatsApp',  icon: faWhatsapp,  color: '#25D366', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}` },
    { n: 'Telegram',  icon: faTelegram,  color: '#26A5E4', url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}` },
    { n: 'X/Twitter', icon: faXTwitter,  color: '#000',    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}` },
    { n: 'LinkedIn',  icon: faLinkedin,  color: '#0A66C2', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { n: 'Email',     icon: faEnvelope,  color: '#E040FB', url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + url)}` },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  const handleNativeShare = () => {
    if (navigator.share) navigator.share({ title, text: shareText, url }).catch(() => {})
    else handleCopy()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden">
      <div className="pt-3 pb-1">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
          {platforms.map(p => (
            <a
              key={p.n}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Share on ${p.n}`}
              className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <FontAwesomeIcon icon={p.icon} className="text-base" style={{ color: p.color }} />
              <span className="text-[9px] font-semibold">{p.n}</span>
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] transition-all">
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? 'text-green-500' : ''} />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleNativeShare}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all">
            <FontAwesomeIcon icon={faShareNodes} />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Meta Info Card (right sidebar) ─────────────────────────────
function MetaInfoCard({ project }) {
  const statusClass = STATUS_COLOR[project.development_status] || STATUS_COLOR['Completed'] || 'text-[var(--text-secondary)] bg-[var(--bg-surface-2)] border-[var(--border-color)]'
  const complexityClass = COMPLEXITY_COLOR[project.complexity_level] || 'text-[var(--text-secondary)] bg-[var(--bg-surface-2)] border-[var(--border-color)]'

  const metaRows = [
    project.category         && { icon: faFolderOpen, label: 'Category',   value: project.category },
    project.type             && { icon: faLayerGroup, label: 'Type',        value: project.type },
    project.version          && { icon: faCodeBranch, label: 'Version',     value: project.version },
    project.platform         && { icon: faGlobe,      label: 'Platform',    value: project.platform },
    project.team_size > 1    && { icon: faUsers,      label: 'Team',        value: `${project.team_size} members` },
    project.role             && { icon: faTerminal,   label: 'Role',        value: project.role },
    project.license          && { icon: faScaleBalanced, label: 'License',  value: project.license },
    project.views_count > 0  && { icon: faEye,        label: 'Views',       value: fmtViews(project.views_count) },
    project.created_at       && { icon: faCalendarDays, label: 'Published', value: fmtDate(project.created_at) },
  ].filter(Boolean)

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-primary)]/30" />
      <div className="p-4 space-y-3">

        {/* Status + Complexity badges */}
        <div className="flex flex-wrap gap-2">
          {project.development_status && (
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border tracking-wide ${statusClass}`}>
              <FontAwesomeIcon icon={faCircle} className="text-[7px]" />
              {project.development_status}
            </span>
          )}
          {project.complexity_level && (
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${complexityClass}`}>
              {project.complexity_level}
            </span>
          )}
          {project.is_open_source && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full text-teal-500 bg-teal-500/10 border border-teal-500/20">
              <FontAwesomeIcon icon={faBoxOpen} className="text-[8px]" />
              Open Source
            </span>
          )}
        </div>

        {/* Meta rows */}
        <div className="space-y-1.5 border-t border-[var(--border-color)] pt-3">
          {metaRows.map(({ icon, label, value }) => (
            <div key={label} className="flex items-start justify-between gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[var(--text-tertiary)] flex-shrink-0">
                <FontAwesomeIcon icon={icon} className="text-[10px] w-3" />
                {label}
              </span>
              <span className="font-medium text-[var(--text-secondary)] text-right text-[11px]">{value}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        {(project.project_timeline || project.start_date) && (
          <div className="border-t border-[var(--border-color)] pt-3">
            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faClock} className="text-[10px]" />
              Timeline
            </p>
            {project.project_timeline
              ? <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{project.project_timeline}</p>
              : (
                <p className="text-xs text-[var(--text-secondary)]">
                  {fmtDate(project.start_date)}{project.end_date ? ` → ${fmtDate(project.end_date)}` : ' → Present'}
                </p>
              )
            }
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tech Stack Card ─────────────────────────────────────────────
function TechStackCard({ project }) {
  const hasTech = project.tech_stack && (
    Array.isArray(project.tech_stack)
      ? project.tech_stack.length > 0
      : typeof project.tech_stack === 'object' && Object.keys(project.tech_stack).length > 0
  )
  const hasLangs = project.languages?.length > 0
  const hasDeps  = project.dependencies?.length > 0

  if (!hasTech && !hasLangs && !hasDeps) return null

  const renderTechStack = () => {
    if (!hasTech) return null
    // Array form: simple chips
    if (Array.isArray(project.tech_stack)) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.map(t => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">{t}</span>
          ))}
        </div>
      )
    }
    // Object form: grouped
    return Object.entries(project.tech_stack).map(([category, items]) => (
      <div key={category} className="space-y-1">
        <p className="text-[9px] font-extrabold text-[var(--text-tertiary)] uppercase tracking-widest">{category}</p>
        <div className="flex flex-wrap gap-1">
          {(Array.isArray(items) ? items : [items]).map(t => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">{t}</span>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
        <FontAwesomeIcon icon={faCode} className="text-[var(--accent-primary)] text-xs" />
        Tech Stack
      </p>

      {hasTech && <div className="space-y-2">{renderTechStack()}</div>}

      {hasLangs && (
        <div className="border-t border-[var(--border-color)] pt-3 space-y-1.5">
          <p className="text-[9px] font-extrabold text-[var(--text-tertiary)] uppercase tracking-widest">Languages</p>
          <div className="flex flex-wrap gap-1">
            {project.languages.map(l => (
              <span key={l} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/15">{l}</span>
            ))}
          </div>
        </div>
      )}

      {hasDeps && (
        <div className="border-t border-[var(--border-color)] pt-3 space-y-1.5">
          <p className="text-[9px] font-extrabold text-[var(--text-tertiary)] uppercase tracking-widest">Libraries & Dependencies</p>
          <div className="flex flex-wrap gap-1">
            {project.dependencies.map(d => (
              <span key={d} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">{d}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Key Features Card ───────────────────────────────────────────
function FeaturesCard({ features }) {
  if (!features?.length) return null
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4">
      <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 mb-3">
        <FontAwesomeIcon icon={faListCheck} className="text-[var(--accent-primary)] text-xs" />
        Key Features
      </p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
            <FontAwesomeIcon icon={faCheck} className="text-[var(--accent-primary)] text-[9px] mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Tags sidebar card ───────────────────────────────────────────
function TagsCard({ tags }) {
  if (!tags?.length) return null
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4">
      <p className="text-[10px] font-extrabold text-[var(--text-tertiary)] uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <FontAwesomeIcon icon={faTag} className="text-[9px]" />
        Tags
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <Link
            key={tag}
            to={`/projects?q=${encodeURIComponent(tag)}`}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Notes card ─────────────────────────────────────────────────
function NotesCard({ notes }) {
  if (!notes) return null
  return (
    <div className="bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-2xl p-4">
      <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-[9px]" />
        Notes
      </p>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{notes}</p>
    </div>
  )
}

// ── Thumbnail Hero ──────────────────────────────────────────────
function ProjectHero({ project, onHeroClick }) {
  if (project.thumbnail_url) {
    return (
      <div
        onClick={onHeroClick}
        className="relative w-full h-60 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6 cursor-zoom-in group border border-[var(--border-color)] shadow-sm">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        {/* Expand hint */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="text-[9px]" />
            Click to expand
          </span>
        </div>
        {/* Category chip bottom-left */}
        {project.category && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
              {project.category}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-[var(--border-color)] shadow-sm bg-gradient-to-br from-[var(--bg-surface-2)] to-[var(--bg-surface-3)]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-3 ring-4 ring-[var(--accent-primary)]/10">
          <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--accent-primary)]" />
        </div>
        {project.category && (
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest text-[var(--accent-primary)] bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
            {project.category}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Main ────────────────────────────────────────────────────────
function ProjectDetailContent() {
  const { slug }               = useParams()
  const [project, setProject]  = useState(null)
  const [related, setRelated]  = useState([])
  const [loading, setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  // Image Preview Modal
  const [previewOpen, setPreviewOpen]     = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [previewIndex, setPreviewIndex]   = useState(0)

  const contentRef = useRef(null)

  const load = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const data = await getProjectBySlug(slug)
      if (!data) { setNotFound(true); setLoading(false); return }
      setProject(data)
      if (data?.id) {
        incrementProjectViews(data.id).catch(() => {})
        trackInteractionView('project', data.id).catch(() => {})
      }
      trackPage(`Projects/${data.title || slug}`)
      setRelatedLoading(true)
      getRelatedProjects(slug, data.category, data.tags, 4)
        .then(r => { setRelated(r || []); setRelatedLoading(false) })
        .catch(() => setRelatedLoading(false))
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { load() }, [load])

  // Content image click
  const handleContentClick = (e) => {
    if (e.target.tagName === 'IMG' && contentRef.current) {
      e.preventDefault()
      const imgs = Array.from(contentRef.current.querySelectorAll('img')).map(img => ({ url: img.src, alt: img.alt || project?.title || '' }))
      const idx  = imgs.findIndex(img => img.url === e.target.src)
      setPreviewImages(imgs)
      setPreviewIndex(idx >= 0 ? idx : 0)
      setPreviewOpen(true)
    }
  }

  const handleHeroClick = () => {
    if (project?.thumbnail_url) {
      setPreviewImages([{ url: project.thumbnail_url, alt: project.title }])
      setPreviewIndex(0)
      setPreviewOpen(true)
    }
  }

  if (loading)  return <DetailSkeleton />
  if (notFound || !project) return <Navigate to="/projects" replace />

  const seoTitle  = project.seo_title || project.title
  const seoDesc   = project.seo_description || project.short_description || SITE_CONFIG.seo.defaultDescription
  const ogImage   = project.og_image_url || project.thumbnail_url || SITE_CONFIG.seo.defaultOGImage
  const pageUrl   = `${SITE_CONFIG.siteURL}/projects/${slug}`

  // Truncate breadcrumb label
  const bcLabel = project.title?.length > 38
    ? project.title.substring(0, 36) + '…'
    : project.title

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
        <meta name="twitter:card"         content="summary_large_image" />
        <meta name="twitter:image"        content={ogImage} />
        <meta name="twitter:title"        content={seoTitle} />
        <meta name="twitter:description"  content={seoDesc} />
        {project.seo_keywords?.length > 0 && (
          <meta name="keywords" content={project.seo_keywords.join(', ')} />
        )}
        <link rel="canonical" href={pageUrl} />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: project.title,
          description: seoDesc,
          image: ogImage,
          url: pageUrl,
          author: { '@type': 'Person', name: 'Muhtasim Rahman', url: SITE_CONFIG.siteURL },
          applicationCategory: project.category,
          datePublished: project.published_at || project.created_at,
          dateModified: project.updated_at,
        })}</script>
      </Helmet>

      <div className="container-xl py-6 lg:py-10">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Projects', href: '/projects' },
          { label: bcLabel },
        ]} />

        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 mt-3 mb-5 text-xs font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[10px] transition-transform group-hover:-translate-x-0.5" />
          Back to Catalog
        </Link>

        {/* Hero thumbnail */}
        <ProjectHero project={project} onHeroClick={handleHeroClick} />

        {/* ── 2-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] xl:grid-cols-[1fr_310px] gap-8">

          {/* ════ LEFT COLUMN ════ */}
          <div className="min-w-0 space-y-7">

            {/* Title + Tagline + Short Desc */}
            <div className="space-y-2.5">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] leading-tight">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-sm font-semibold text-[var(--accent-primary)] tracking-wide">
                  "{project.tagline}"
                </p>
              )}
              {project.short_description && (
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.short_description}
                </p>
              )}
            </div>

            {/* Tags row */}
            {project.tags?.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <FontAwesomeIcon icon={faHashtag} className="text-[10px] text-[var(--text-tertiary)] flex-shrink-0" />
                {project.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/projects?q=${encodeURIComponent(tag)}`}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <ActionLinks project={project} />

            {/* Engagement row */}
            <div className="flex flex-wrap items-center gap-3 py-4 border-y border-[var(--border-color)]">
              <LikeDislike contentType="project" contentId={project.id} />
              <ReportButton contentType="project" contentId={project.id} />
              {project.views_count > 0 && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                  <FontAwesomeIcon icon={faEye} />
                  {fmtViews(project.views_count)} views
                </span>
              )}
            </div>

            {/* Share panel toggle */}
            <div>
              <button
                onClick={() => setShareOpen(o => !o)}
                className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <FontAwesomeIcon icon={faShareNodes} className="text-[var(--accent-primary)]" />
                Share this project
                <FontAwesomeIcon icon={shareOpen ? faChevronUp : faChevronDown} className="text-[9px]" />
              </button>
              <AnimatePresence>
                {shareOpen && (
                  <SharePanel url={pageUrl} title={project.title} description={project.short_description} isOpen={shareOpen} />
                )}
              </AnimatePresence>
            </div>

            {/* Detailed description (if separate from content) */}
            {project.detailed_description && !project.content && (
              <div className="prose-content">
                <p className="whitespace-pre-wrap">{project.detailed_description}</p>
              </div>
            )}

            {/* Main HTML content */}
            {project.content && (
              <div
                ref={contentRef}
                onClick={handleContentClick}
                className="prose-content select-text"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            )}

            {/* Notes */}
            {project.notes && (
              <NotesCard notes={project.notes} />
            )}

            {/* Mobile/Tablet: Related projects */}
            <div className="block lg:hidden pt-4 border-t border-[var(--border-color)]">
              <RelatedContent items={related} loading={relatedLoading} title="Related Projects" />
            </div>

            {/* Comments */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <CommentSection contentType="project" contentId={project.id} contentSlug={project.slug} />
            </div>
          </div>

          {/* ════ RIGHT COLUMN (STICKY) ════ */}
          <div className="space-y-4 self-start lg:sticky lg:top-[calc(var(--navbar-h)+1.5rem)]">

            {/* Meta info */}
            <MetaInfoCard project={project} />

            {/* Tech stack */}
            <TechStackCard project={project} />

            {/* Key features */}
            <FeaturesCard features={project.key_features} />

            {/* Tags */}
            <TagsCard tags={project.tags} />

            {/* Desktop related projects */}
            <div className="hidden lg:block">
              <RelatedContent items={related} loading={relatedLoading} title="Related Projects" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
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

export default function ProjectDetail() {
  return (
    <VisibilityGuard page="projects" skeleton="detail">
      <ProjectDetailContent />
    </VisibilityGuard>
  )
}
