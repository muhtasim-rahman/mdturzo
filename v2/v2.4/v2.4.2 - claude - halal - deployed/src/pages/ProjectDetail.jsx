// ProjectDetail.jsx — v2.4.2
// Full redesign:
//   - 2-column layout on PC (content | sidebar), responsive tablet/mobile
//   - All Supabase data beautifully displayed
//   - Rich sections: hero, title/tagline/stats, tech stack, key features, content, comments
//   - Breadcrumb: project name truncated properly
//   - Thumbnail used as OG meta image
//   - Enhanced ImagePreviewModal (zoom/pan + new buttons)
//   - Firebase interaction tracking for likes, comments, dislikes

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
  faStar, faCheckCircle, faBolt, faUsers, faBuilding, faTrophy,
  faChevronDown, faChevronUp, faExternalLinkAlt, faInfoCircle, faThumbsUp
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

// ── Helpers ─────────────────────────────────────────────────────
function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
function formatViews(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function formatCount(n) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// ── Page skeleton ───────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-xl py-6 lg:py-10">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk h-[260px] sm:h-[340px] w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-5">
          <div className="sk h-8 w-3/4 rounded" />
          <div className="sk h-4 w-1/2 rounded" />
          <div className="sk h-16 w-full rounded-xl" />
          <div className="sk h-4 w-full rounded" />
          <div className="sk h-4 w-5/6 rounded" />
          <div className="mt-6 sk h-52 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="sk h-40 w-full rounded-2xl" />
          <div className="sk h-52 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// ── Status badge ────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (!status) return null
  const map = {
    'active':       { color: 'text-green-500 bg-green-500/10 border-green-500/25', label: 'Active' },
    'completed':    { color: 'text-blue-400 bg-blue-500/10 border-blue-500/25', label: 'Completed' },
    'archived':     { color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/25', label: 'Archived' },
    'discontinued': { color: 'text-red-400 bg-red-500/10 border-red-500/25', label: 'Discontinued' },
    'beta':         { color: 'text-orange-400 bg-orange-500/10 border-orange-500/25', label: 'Beta' },
    'in-development': { color: 'text-purple-400 bg-purple-500/10 border-purple-500/25', label: 'In Dev' },
  }
  const s = map[status?.toLowerCase()] ?? { color: 'text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] border-[var(--border-color)]', label: status }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${s.color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  )
}

// ── Complexity badge ────────────────────────────────────────────
function ComplexityBadge({ level }) {
  if (!level) return null
  const map = {
    'beginner':     'text-green-500',
    'intermediate': 'text-yellow-500',
    'advanced':     'text-orange-500',
    'expert':       'text-red-500',
  }
  const stars = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }
  const count = stars[level?.toLowerCase()] ?? 2
  return (
    <div className={`flex items-center gap-1 text-xs font-semibold ${map[level?.toLowerCase()] ?? 'text-[var(--text-secondary)]'}`}>
      {Array.from({ length: 4 }, (_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} className={`text-[9px] ${i < count ? '' : 'opacity-25'}`} />
      ))}
      <span className="ml-0.5 capitalize text-[10px]">{level}</span>
    </div>
  )
}

// ── Tech stack pill ─────────────────────────────────────────────
function TechPill({ label, variant = 'default' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold border whitespace-nowrap ${
      variant === 'accent'
        ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]/20'
        : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border-color)]'
    }`}>
      {label}
    </span>
  )
}

// ── Key features section ────────────────────────────────────────
function KeyFeatures({ features }) {
  const [expanded, setExpanded] = useState(false)
  if (!features?.length) return null
  const visible = expanded ? features : features.slice(0, 6)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
        <FontAwesomeIcon icon={faCheckCircle} className="text-[var(--accent-primary)] text-xs" />
        Key Features
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {visible.map((feat, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)]">
            <div className="w-4 h-4 rounded-md bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <FontAwesomeIcon icon={faBolt} className="text-[8px] text-[var(--accent-primary)]" />
            </div>
            <span className="text-xs text-[var(--text-secondary)] leading-snug">{feat}</span>
          </div>
        ))}
      </div>
      {features.length > 6 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
          <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="text-[9px]" />
          {expanded ? 'Show less' : `Show ${features.length - 6} more`}
        </button>
      )}
    </div>
  )
}

// ── Tech stack section ──────────────────────────────────────────
function TechStackSection({ project }) {
  const sections = [
    { icon: faCode, label: 'Languages', items: project.languages },
    { icon: faLayerGroup, label: 'Frameworks', items: project.frameworks },
    { icon: faBolt, label: 'Libraries', items: project.libraries },
    { icon: faServer, label: 'Backend', items: project.backend ? [project.backend] : null },
    { icon: faDatabase, label: 'Database', items: project.database ? [project.database] : null },
    { icon: faCloud, label: 'Hosting', items: project.hosting ? [project.hosting] : null },
    { icon: faLayerGroup, label: 'Tech Stack', items: project.tech_stack },
  ]

  const available = sections.filter(s => s.items?.length > 0)
  if (!available.length) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
        <FontAwesomeIcon icon={faCode} className="text-[var(--accent-primary)] text-xs" />
        Tech Stack
      </h3>
      <div className="space-y-2.5">
        {available.map(({ icon, label, items }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <FontAwesomeIcon icon={icon} className="text-[9px] text-[var(--text-tertiary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-[var(--text-tertiary)] font-bold uppercase tracking-wider mb-1.5">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => (
                  <TechPill key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Share dashboard ─────────────────────────────────────────────
function ShareDashboard({ url, title, description, thumbnailUrl }) {
  const [copied, setCopied] = useState(null) // 'link' | 'title'

  const shareText = `Check out: "${title}"${description ? ` — ${description.slice(0, 80)}` : ''}`

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const platforms = [
    { name: 'Facebook', icon: faFacebook, color: '#1877F2', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: faLinkedin, color: '#0A66C2', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', icon: faWhatsapp, color: '#25D366', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}` },
    { name: 'X',       icon: faXTwitter, color: '#000',    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}` },
    { name: 'Telegram',icon: faTelegram, color: '#229ED9', href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}` },
    { name: 'Email',   icon: faEnvelope, color: '#E040FB', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + url)}` },
  ]

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border-color)]">
        <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
          <FontAwesomeIcon icon={faShareNodes} className="text-[var(--accent-primary)] text-xs" />
          Share Project
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {/* Platform grid */}
        <div className="grid grid-cols-3 gap-2">
          {platforms.map(p => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Share on ${p.name}`}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all gap-1">
              <FontAwesomeIcon icon={p.icon} className="text-base" style={{ color: p.color }} />
              <span className="text-[9px] font-semibold text-[var(--text-secondary)]">{p.name}</span>
            </a>
          ))}
        </div>

        {/* Copy buttons */}
        <div className="space-y-2">
          <button
            onClick={() => copy(url, 'link')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-xs transition-all group">
            <span className="flex items-center gap-2 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] min-w-0">
              <FontAwesomeIcon icon={faLink} className="text-[var(--text-tertiary)] flex-shrink-0" />
              <span className="truncate font-mono text-[9px]">{url.replace('https://', '')}</span>
            </span>
            <FontAwesomeIcon
              icon={copied === 'link' ? faCheck : faCopy}
              className={`flex-shrink-0 ml-2 text-[10px] ${copied === 'link' ? 'text-green-500' : 'text-[var(--text-tertiary)]'}`}
            />
          </button>

          {navigator.share && (
            <button
              onClick={() => navigator.share({ title, text: shareText, url }).catch(() => {})}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all shadow-sm">
              <FontAwesomeIcon icon={faShareNodes} />
              Share via Device
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Sidebar meta card ───────────────────────────────────────────
function SidebarMeta({ project }) {
  const links = [
    project.live_link   && { href: project.live_link,   icon: faArrowUpRightFromSquare, label: 'Live Preview', primary: true },
    project.github_link && { href: project.github_link, icon: faGithub,                label: 'GitHub Repo',  primary: false },
    project.pdf_link    && { href: project.pdf_link,    icon: faFilePdf,               label: 'PDF Preview',  primary: false },
    project.custom_link && { href: project.custom_link, icon: faLink,                  label: project.custom_link_label || 'Visit Link', primary: false },
  ].filter(Boolean)

  const meta = [
    project.views_count > 0 && { icon: faEye, label: 'Views', value: formatViews(project.views_count) },
    project.likes_count > 0 && { icon: faThumbsUp, label: 'Likes', value: formatCount(project.likes_count) },
    project.created_at      && { icon: faCalendarDays, label: 'Published', value: formatDate(project.created_at) },
    project.project_timeline && { icon: faCalendarDays, label: 'Timeline', value: project.project_timeline },
    project.version         && { icon: faInfoCircle,  label: 'Version', value: project.version },
    project.platform        && { icon: faGlobe,       label: 'Platform', value: project.platform },
    project.team_size > 1   && { icon: faUsers,       label: 'Team', value: `${project.team_size} members` },
    project.role            && { icon: faUsers,       label: 'Role', value: project.role },
    project.institution     && { icon: faBuilding,    label: 'Institution', value: project.institution },
    project.client          && { icon: faBuilding,    label: 'Client', value: project.client },
  ].filter(Boolean)

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      {/* Color stripe */}
      <div className="h-0.5 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-hover)] to-transparent" />

      <div className="p-4 space-y-4">
        {/* Category badge + status + complexity */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
            <FontAwesomeIcon icon={faFolderOpen} className="text-[9px]" />
            {project.category}
          </span>
          {project.project_status && <StatusBadge status={project.project_status} />}
          {project.complexity_level && <ComplexityBadge level={project.complexity_level} />}
          {project.open_source && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 border border-green-500/25">
              Open Source
            </span>
          )}
        </div>

        {/* Quick access links */}
        {links.length > 0 && (
          <div className="space-y-2">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  link.primary
                    ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-sm'
                    : 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-strong)]'
                }`}>
                <FontAwesomeIcon icon={link.icon} className="text-xs" />
                {link.label}
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[8px] opacity-60 ml-auto" />
              </a>
            ))}
          </div>
        )}

        {/* Meta stats list */}
        {meta.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-3 space-y-2.5">
            {meta.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 text-[var(--text-tertiary)] font-medium flex-shrink-0">
                  <FontAwesomeIcon icon={icon} className="w-3 text-[9px]" />
                  {label}
                </span>
                <span className="font-semibold text-[var(--text-secondary)] text-right truncate">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Flags */}
        {(project.has_pwa || project.has_dark_mode || project.has_responsive) && (
          <div className="border-t border-[var(--border-color)] pt-3">
            <div className="flex flex-wrap gap-1.5">
              {project.has_pwa && <TechPill label="PWA" variant="accent" />}
              {project.has_dark_mode && <TechPill label="Dark Mode" />}
              {project.has_responsive && <TechPill label="Responsive" />}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-3">
            <p className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1">
              <FontAwesomeIcon icon={faTag} className="text-[8px]" />
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/projects?q=${encodeURIComponent(tag)}`}
                  className="text-[9px] font-medium px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)] transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {project.awards?.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-3">
            <p className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1">
              <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-[8px]" />
              Awards & Recognition
            </p>
            <div className="space-y-1">
              {project.awards.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-[9px] flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Hero / thumbnail ────────────────────────────────────────────
function ProjectHero({ project, onImgClick }) {
  if (project.thumbnail_url) {
    return (
      <div
        onClick={onImgClick}
        className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden mb-8 cursor-zoom-in group border border-[var(--border-color)] shadow-sm">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="eager"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        {/* Category badge on image */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[var(--accent-primary)]/90 text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-semibold px-3 py-1 rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10">
            Click to expand
          </span>
        </div>
      </div>
    )
  }

  // No thumbnail placeholder
  return (
    <div className="relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden mb-8 flex items-center justify-center border border-[var(--border-color)] bg-gradient-to-br from-[var(--accent-primary)]/8 via-[var(--bg-surface-2)] to-[var(--bg-surface-2)]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
          <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--accent-primary)]" />
        </div>
        <span className="text-xs text-[var(--text-tertiary)] font-semibold">{project.category}</span>
      </div>
    </div>
  )
}

// ── External references section ─────────────────────────────────
function ExternalReferences({ refs }) {
  if (!refs?.length) return null
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[var(--accent-primary)] text-xs" />
        References & Resources
      </h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {refs.map((ref, i) => (
          <a
            key={i}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 transition-all group">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[9px] text-[var(--accent-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
                {ref.title || ref.url}
              </p>
              {ref.description && (
                <p className="text-[10px] text-[var(--text-tertiary)] truncate">{ref.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────
function ProjectDetailContent() {
  const { slug } = useParams()
  const [project, setProject]       = useState(null)
  const [related, setRelated]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [relatedLoading, setRelatedLoading] = useState(false)

  const [previewOpen, setPreviewOpen]     = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [previewIndex, setPreviewIndex]   = useState(0)

  const contentRef = useRef(null)

  const load = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const data = await getProjectBySlug(slug)
      if (!data) { setNotFound(true); return }
      setProject(data)
      if (data?.id) incrementProjectViews(data.id).catch(() => {})
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

  // Click on images inside content
  const handleContentClick = (e) => {
    if (e.target.tagName !== 'IMG' || !contentRef.current) return
    e.preventDefault()
    const imgs = Array.from(contentRef.current.querySelectorAll('img')).map(img => ({
      url: img.src, alt: img.alt || project?.title || 'Project Image'
    }))
    const idx = imgs.findIndex(img => img.url === e.target.src)
    setPreviewImages(imgs)
    setPreviewIndex(idx >= 0 ? idx : 0)
    setPreviewOpen(true)
  }

  const handleHeroClick = () => {
    if (!project?.thumbnail_url) return
    setPreviewImages([{ url: project.thumbnail_url, alt: project.title }])
    setPreviewIndex(0)
    setPreviewOpen(true)
  }

  if (loading) return <DetailSkeleton />
  if (notFound || !project) return <Navigate to="/projects" replace />

  const seoTitle = project.seo_title || project.title
  const seoDesc  = project.seo_description || project.short_description || SITE_CONFIG.seo.defaultDescription
  const ogImage  = project.thumbnail_url || project.og_image_url || SITE_CONFIG.seo.defaultOGImage
  const pageUrl  = `${SITE_CONFIG.siteURL}/projects/${slug}`

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: seoDesc,
    image: ogImage,
    url: pageUrl,
    author: { '@type': 'Person', name: SITE_CONFIG.owner?.name || 'Muhtasim Rahman' },
    dateCreated: project.created_at,
    dateModified: project.updated_at || project.created_at,
    applicationCategory: project.category,
    operatingSystem: project.platform || 'Web Browser',
  }

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
        <meta name="twitter:title"        content={seoTitle} />
        <meta name="twitter:description"  content={seoDesc} />
        <meta name="twitter:image"        content={ogImage} />
        <link rel="canonical"             href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container-xl py-6 lg:py-10">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]} />

        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 mt-3 mb-6 text-xs font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[10px] transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        {/* Hero */}
        <ProjectHero project={project} onImgClick={handleHeroClick} />

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] xl:grid-cols-[1fr_310px] gap-8">

          {/* ── Left column ──────────────────────────────────── */}
          <div className="min-w-0 space-y-8">

            {/* Title + tagline + short description */}
            <div className="space-y-3">
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
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.short_description}
                </p>
              )}
            </div>

            {/* Stats + action bar */}
            <div className="flex flex-wrap items-center gap-3 py-3 px-4 bg-[var(--bg-surface-2)] rounded-2xl border border-[var(--border-color)]">
              <LikeDislike contentType="project" contentId={project.id} />
              <div className="w-px h-5 bg-[var(--border-color)] hidden sm:block" />
              <ReportButton contentType="project" contentId={project.id} />
              {project.views_count > 0 && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] font-medium">
                  <FontAwesomeIcon icon={faEye} className="text-[10px]" />
                  {formatViews(project.views_count)} views
                </span>
              )}
            </div>

            {/* Tech stack section */}
            <TechStackSection project={project} />

            {/* Key features */}
            <KeyFeatures features={project.key_features} />

            {/* Rich content */}
            {project.content && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <FontAwesomeIcon icon={faLayerGroup} className="text-[var(--accent-primary)] text-xs" />
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

            {/* External references */}
            <ExternalReferences refs={project.external_references} />

            {/* Notes section (if any) */}
            {project.notes && (
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] border-l-2 border-l-[var(--accent-primary)]">
                <p className="text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Developer Note
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{project.notes}</p>
              </div>
            )}

            {/* Mobile/Tablet related projects */}
            <div className="block lg:hidden border-t border-[var(--border-color)] pt-6">
              <RelatedContent items={related} loading={relatedLoading} title="Related Projects" />
            </div>

            {/* Comments */}
            <div className="border-t border-[var(--border-color)] pt-6">
              <CommentSection
                contentType="project"
                contentId={project.id}
                contentSlug={project.slug}
              />
            </div>
          </div>

          {/* ── Right sidebar ─────────────────────────────────── */}
          <div className="space-y-5 self-start lg:sticky lg:top-[calc(var(--navbar-h)+1.5rem)]">

            {/* Meta card */}
            <SidebarMeta project={project} />

            {/* Share dashboard */}
            <ShareDashboard
              url={pageUrl}
              title={project.title}
              description={project.short_description}
              thumbnailUrl={project.thumbnail_url}
            />

            {/* Desktop related */}
            <div className="hidden lg:block">
              <RelatedContent items={related} loading={relatedLoading} title="Related Projects" />
            </div>
          </div>
        </div>
      </div>

      {/* Image preview modal */}
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
