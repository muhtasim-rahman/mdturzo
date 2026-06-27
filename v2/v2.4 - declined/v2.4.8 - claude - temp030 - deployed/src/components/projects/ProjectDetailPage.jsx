// ProjectDetailPage.jsx — v2.4.7
// Full redesign:
//   - New responsive layout (desktop 2-col, tablet/mobile 1-col)
//   - Save button in interaction bar
//   - Rebuilt LikeDislike animation
//   - About section uses dangerouslySetInnerHTML with prose-content CSS
//   - Key Features and TechStack redesigned with icons + click-to-search
//   - Sidebar cards redesigned: Card1 (meta+actions), Card2 (share)
//   - Tablet: Card1 after like/dislike, Card2 before related
//   - Mobile: compact single-column
//   - SEO: thumbnail as og:image per project

import './projects.css'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub, faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faFilePdf, faLink, faEye, faCalendarDays, faTag,
  faFolderOpen, faArrowLeft, faShareNodes, faCopy, faCheck, faEnvelope,
  faCode, faGlobe, faLayerGroup, faServer, faDatabase, faCloud,
  faBolt, faCheckCircle, faUsers, faBuilding,
  faInfoCircle, faHashtag, faThumbsUp, faThumbsDown, faBookmark, faFlag,
  faChevronRight, faExternalLink, faStar, faHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg,
  faThumbsDown as faThumbsDownReg,
  faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'

import Breadcrumb         from '../shared/Breadcrumb.jsx'
import CommentSection     from '../shared/CommentSection.jsx'
import RelatedProjectsRow from './RelatedProjectsRow.jsx'
import ReportButton       from '../shared/ReportButton.jsx'
import ImagePreviewModal  from './ImagePreviewModal.jsx'
import ProjectCarousel    from './ProjectCarousel.jsx'
import ReviewSection      from './ReviewSection.jsx'
import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import { buildTitle }     from '../../utils/seo.js'
import { trackPage }      from '../../services/analytics.js'
import {
  getProjectBySlug, getRelatedProjects, incrementProjectViews,
  getLikeStats, getUserLikeStatus, toggleLike,
  getSavedStatus, toggleSaveProject,
} from '../../services/supabase.js'
import { SITE_CONFIG }    from '../../config/site.config.js'
import { useAuth }        from '../../hooks/useAuth.js'
import { useToastStore }  from '../../store/toastStore.js'
import { useNavigate as useNav } from 'react-router-dom'

// ── Util ─────────────────────────────────────────────────────
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

// ── Category colors ──────────────────────────────────────────
const CAT_COLORS = {
  'PWA':         { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/25' },
  'Dev Tool':    { bg: 'bg-sky-500/10',    text: 'text-sky-400',    border: 'border-sky-500/25'    },
  'Education':   { bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/25'},
  'UI Component':{ bg: 'bg-pink-500/10',   text: 'text-pink-400',   border: 'border-pink-500/25'   },
  'Institutional':{ bg: 'bg-amber-500/10', text: 'text-amber-400',  border: 'border-amber-500/25'  },
  'Portfolio':   { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/25'   },
  'Islamic':     { bg: 'bg-teal-500/10',   text: 'text-teal-400',   border: 'border-teal-500/25'   },
  'Design':      { bg: 'bg-rose-500/10',   text: 'text-rose-400',   border: 'border-rose-500/25'   },
  'Learning':    { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/25' },
}
function getCatStyle(cat) {
  return CAT_COLORS[cat] || { bg: 'bg-[var(--bg-surface-2)]', text: 'text-[var(--text-secondary)]', border: 'border-[var(--border-color)]' }
}

// ── Tech icon mapping (simple text badges with icon hints) ───
const TECH_ICONS = {
  'react': '⚛️', 'vue': '🟩', 'angular': '🔴', 'svelte': '🔶',
  'javascript': '🟨', 'typescript': '🔷', 'python': '🐍', 'node': '🟩',
  'firebase': '🔥', 'supabase': '🟢', 'tailwind': '💨', 'vite': '⚡',
  'framer': '🎨', 'gsap': '💫', 'html5': '🌐', 'css3': '🎨',
  'postgresql': '🐘', 'mongodb': '🍃', 'vercel': '▲', 'netlify': '🌐',
}
function getTechIcon(name) {
  const key = name?.toLowerCase()
  for (const [k, v] of Object.entries(TECH_ICONS)) {
    if (key?.includes(k)) return v
  }
  return null
}

// ── Skeleton ─────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-xl py-6 lg:py-10">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk h-[260px] sm:h-[340px] w-full rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-8">
        <div className="space-y-5">
          <div className="sk h-8 w-3/4 rounded" />
          <div className="sk h-4 w-1/2 rounded" />
          <div className="sk h-16 w-full rounded-xl" />
          <div className="sk h-32 w-full rounded-xl" />
          <div className="sk h-48 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="sk h-56 w-full rounded-2xl" />
          <div className="sk h-40 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// ── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  if (!status) return null
  const M = {
    active:           'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    completed:        'text-sky-400 bg-sky-500/10 border-sky-500/25',
    archived:         'text-amber-400 bg-amber-500/10 border-amber-500/25',
    discontinued:     'text-rose-400 bg-rose-500/10 border-rose-500/25',
    beta:             'text-orange-400 bg-orange-500/10 border-orange-500/25',
    'in-development': 'text-violet-400 bg-violet-500/10 border-violet-500/25',
  }
  const cls   = M[status?.toLowerCase()] ?? 'text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] border-[var(--border-color)]'
  const label = status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />{label}
    </span>
  )
}

// ── LikeDislike (rebuilt for detail page) ────────────────────
function InteractionBar({ project, pageUrl }) {
  const { user, isLoggedIn } = useAuth()
  const { addToast }         = useToastStore()
  const navigate             = useNav()

  const [likes, setLikes]       = useState(project.likes_count || 0)
  const [dislikes, setDislikes] = useState(project.dislikes_count || 0)
  const [userVote, setUserVote] = useState(null)
  const [saved, setSaved]       = useState(false)
  const [saving, setSaving]     = useState(false)
  const [voting, setVoting]     = useState(false)
  const [loadingVote, setLoadingVote] = useState(true)

  useEffect(() => {
    let mounted = true
    Promise.all([
      getLikeStats('project', project.id),
      isLoggedIn && user ? getUserLikeStatus('project', project.id, user.uid) : Promise.resolve(null),
      isLoggedIn && user ? getSavedStatus(user.uid, project.id) : Promise.resolve(false),
    ]).then(([stats, vote, isSaved]) => {
      if (!mounted) return
      setLikes(stats.likes)
      setDislikes(stats.dislikes)
      setUserVote(vote)
      setSaved(isSaved)
      setLoadingVote(false)
    }).catch(() => { if (mounted) setLoadingVote(false) })
    return () => { mounted = false }
  }, [project.id, isLoggedIn, user])

  const handleVote = async (type) => {
    if (!isLoggedIn) { addToast({ type: 'info', title: 'Login required', message: 'Sign in to like or dislike.' }); return }
    if (voting) return
    setVoting(true)
    const prev = userVote
    setUserVote(prev === type ? null : type)
    if (type === 'like') {
      setLikes(l => prev === 'like' ? l - 1 : l + 1)
      if (prev === 'dislike') setDislikes(d => d - 1)
    } else {
      setDislikes(d => prev === 'dislike' ? d - 1 : d + 1)
      if (prev === 'like') setLikes(l => l - 1)
    }
    try {
      await toggleLike('project', project.id, user.uid, type)
    } catch {
      setUserVote(prev)
      if (type === 'like') { setLikes(l => prev === 'like' ? l + 1 : l - 1); if (prev === 'dislike') setDislikes(d => d + 1) }
      else { setDislikes(d => prev === 'dislike' ? d + 1 : d - 1); if (prev === 'like') setLikes(l => l + 1) }
      addToast({ type: 'error', title: 'Error', message: 'Could not register vote.' })
    }
    setVoting(false)
  }

  const handleSave = async () => {
    if (!isLoggedIn) { addToast({ type: 'info', title: 'Login required', message: 'Sign in to save projects.' }); return }
    if (saving) return
    setSaving(true)
    try {
      const newVal = await toggleSaveProject(user.uid, project.id)
      setSaved(newVal)
      addToast({ type: 'success', title: newVal ? '✓ Saved!' : 'Removed from saved', message: newVal ? 'Find it in your profile.' : '' })
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not save project.' })
    }
    setSaving(false)
  }

  const total = likes + dislikes
  const likePercent = total > 0 ? Math.round((likes / total) * 100) : 50

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
      {/* Like */}
      <motion.button
        onClick={() => handleVote('like')}
        disabled={loadingVote || voting}
        whileTap={{ scale: 0.88 }}
        className={`interaction-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
          userVote === 'like'
            ? 'bg-emerald-500/12 border-emerald-500/40 text-emerald-400 shadow-sm'
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-emerald-500/35 hover:text-emerald-400 hover:bg-emerald-500/8'
        } disabled:opacity-50 disabled:cursor-not-allowed`}>
        <motion.span
          animate={userVote === 'like' ? { rotate: [0, -15, 5, 0], scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}>
          <FontAwesomeIcon icon={userVote === 'like' ? faThumbsUp : faThumbsUpReg} />
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.span key={likes}
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }} className="tabular-nums">
            {loadingVote ? '—' : likes}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Ratio bar */}
      {total > 0 && (
        <div className="hidden sm:block w-14 h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
          <motion.div className="h-full rounded-full bg-emerald-400"
            initial={{ width: '50%' }} animate={{ width: `${likePercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }} />
        </div>
      )}

      {/* Dislike */}
      <motion.button
        onClick={() => handleVote('dislike')}
        disabled={loadingVote || voting}
        whileTap={{ scale: 0.88 }}
        className={`interaction-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
          userVote === 'dislike'
            ? 'bg-red-500/12 border-red-500/40 text-red-400 shadow-sm'
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-red-500/35 hover:text-red-400 hover:bg-red-500/8'
        } disabled:opacity-50 disabled:cursor-not-allowed`}>
        <motion.span
          animate={userVote === 'dislike' ? { rotate: [0, 15, -5, 0], scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}>
          <FontAwesomeIcon icon={userVote === 'dislike' ? faThumbsDown : faThumbsDownReg} />
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.span key={dislikes}
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }} className="tabular-nums">
            {loadingVote ? '—' : dislikes}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <div className="h-5 w-px bg-[var(--border-color)] mx-0.5" />

      {/* Save */}
      <motion.button onClick={handleSave} disabled={saving} whileTap={{ scale: 0.88 }}
        title={saved ? 'Remove from saved' : 'Save project'}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
          saved
            ? 'bg-[var(--accent-primary)]/12 border-[var(--accent-primary)]/40 text-[var(--accent-primary)]'
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/8'
        } disabled:opacity-50`}>
        <motion.span animate={saved ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.25 }}>
          <FontAwesomeIcon icon={saved ? faBookmark : faBookmarkReg} />
        </motion.span>
        <span className="hidden sm:inline text-xs">{saved ? 'Saved' : 'Save'}</span>
      </motion.button>

      {/* Report */}
      <ReportButton contentType="project" contentId={project.id} compact />

      {/* Views */}
      {project.views_count > 0 && (
        <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] font-semibold">
          <FontAwesomeIcon icon={faEye} className="text-[10px]" />
          {fmt(project.views_count)}
        </span>
      )}
    </div>
  )
}

// ── Key Features ─────────────────────────────────────────────
function KeyFeatures({ features }) {
  const [expanded, setExpanded] = useState(false)
  const items = asArray(features)
  if (!items.length) return null
  const visible = expanded ? items : items.slice(0, 6)
  return (
    <div className="space-y-3">
      <h3 className="section-heading">
        <span className="section-icon">
          <FontAwesomeIcon icon={faCheckCircle} className="text-[9px] text-[var(--accent-primary)]" />
        </span>
        Key Features
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {visible.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-colors group">
            <div className="w-5 h-5 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent-primary)]/15 transition-colors">
              <FontAwesomeIcon icon={faBolt} className="text-[8px] text-[var(--accent-primary)]" />
            </div>
            <span className="text-xs text-[var(--text-secondary)] leading-snug">{f}</span>
          </motion.div>
        ))}
      </div>
      {items.length > 6 && (
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
          <FontAwesomeIcon icon={expanded ? faChevronRight : faChevronRight}
            className={`text-[9px] transition-transform ${expanded ? 'rotate-90' : ''}`} />
          {expanded ? 'Show less' : `${items.length - 6} more features`}
        </button>
      )}
    </div>
  )
}

// ── Tech Stack ───────────────────────────────────────────────
function TechStackSection({ project }) {
  const navigate = useNav()
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

  const searchTech = (term) => {
    navigate(`/projects?q=${encodeURIComponent(term)}`)
  }

  return (
    <div className="space-y-3">
      <h3 className="section-heading">
        <span className="section-icon">
          <FontAwesomeIcon icon={faCode} className="text-[9px] text-[var(--accent-primary)]" />
        </span>
        Tech Stack
      </h3>
      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)] divide-y divide-[var(--border-color)]">
        {available.map(({ key, label, icon, accent, scalar }) => {
          const items = scalar ? [project[key]] : asArray(project[key])
          return (
            <div key={key} className="flex items-start gap-3 px-4 py-3">
              <div className="flex items-center gap-2 w-24 flex-shrink-0 pt-0.5">
                <FontAwesomeIcon icon={icon} className="text-[9px] text-[var(--text-tertiary)]" />
                <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">{label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => {
                  const emoji = getTechIcon(item)
                  return (
                    <button key={item} onClick={() => searchTech(item)}
                      title={`Search for "${item}" projects`}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all hover:scale-[1.03] active:scale-95 cursor-pointer ${
                        accent
                          ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]/40'
                          : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                      }`}>
                      {emoji && <span className="text-[9px]">{emoji}</span>}
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Sidebar Card 1 (Meta + Actions) ─────────────────────────
function SidebarMetaCard({ project, pageUrl, avgRating, reviewCount, onScrollToReviews, compact = false }) {
  const catStyle = getCatStyle(project.category)
  const links = [
    project.live_link   && { href: project.live_link,   icon: faArrowUpRightFromSquare, label: 'Live Preview',   primary: true  },
    project.github_link && { href: project.github_link, icon: faGithub,                label: 'GitHub Repo',    primary: false },
    project.pdf_link    && { href: project.pdf_link,    icon: faFilePdf,               label: 'Download PDF',   primary: false },
    project.custom_link && { href: project.custom_link, icon: faLink,                  label: project.custom_link_label || 'Visit Link', primary: false },
  ].filter(Boolean)

  const meta = [
    project.views_count > 0    && { icon: faEye,          label: 'Views',      value: fmt(project.views_count)         },
    project.created_at         && { icon: faCalendarDays, label: 'Published',  value: fmtDate(project.created_at)      },
    project.project_timeline   && { icon: faCalendarDays, label: 'Timeline',   value: project.project_timeline         },
    project.version            && { icon: faInfoCircle,   label: 'Version',    value: project.version                  },
    project.platform           && { icon: faGlobe,        label: 'Platform',   value: project.platform                 },
    project.team_size > 1      && { icon: faUsers,        label: 'Team',       value: `${project.team_size} members`   },
    project.role               && { icon: faUsers,        label: 'Role',       value: project.role                     },
    project.institution        && { icon: faBuilding,     label: 'Institution',value: project.institution              },
    project.client             && { icon: faBuilding,     label: 'Client',     value: project.client                   },
  ].filter(Boolean)

  const tags = asArray(project.tags)

  return (
    <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)]">
      {/* Top accent strip */}
      <div className="h-0.5 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-hover)]/60 to-transparent" />

      <div className="p-4 space-y-4">
        {/* Category + Status + Complexity */}
        <div className="flex flex-wrap items-center gap-2">
          {[project.category].filter(Boolean).map(cat => {
            const cs = getCatStyle(cat)
            return (
              <span key={cat} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${cs.bg} ${cs.text} ${cs.border}`}>
                <FontAwesomeIcon icon={faFolderOpen} className="text-[8px]" />
                {cat}
              </span>
            )
          })}
          {project.project_status && <StatusBadge status={project.project_status} />}
          {project.open_source === true && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25">
              Open Source
            </span>
          )}
        </div>

        {/* Avg rating click-to-scroll */}
        {reviewCount > 0 && (
          <button onClick={onScrollToReviews}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gradient-to-r from-amber-500/8 to-transparent border border-amber-500/20 hover:border-amber-500/35 transition-all group">
            <div className="text-2xl font-black text-[var(--text-primary)] font-display leading-none flex-shrink-0">
              {avgRating.toFixed(1)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <FontAwesomeIcon key={i} icon={faStar}
                    className={`text-xs ${i <= Math.round(avgRating) ? 'text-amber-400' : 'text-[var(--text-tertiary)]/20'}`} />
                ))}
              </div>
              <p className="text-[9px] text-[var(--text-tertiary)]">{reviewCount} review{reviewCount !== 1 ? 's' : ''} — click to read</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-[9px] text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors" />
          </button>
        )}

        {/* Action links */}
        {links.length > 0 && (
          <div className={compact ? 'grid grid-cols-2 gap-1.5' : 'space-y-2'}>
            {links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                title={l.href}
                className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  l.primary
                    ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-sm'
                    : 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-strong)]'
                }`}>
                <FontAwesomeIcon icon={l.icon} className="text-xs" />
                {l.label}
                {!l.primary && <FontAwesomeIcon icon={faExternalLink} className="text-[8px] opacity-50 ml-auto" />}
              </a>
            ))}
          </div>
        )}

        {/* Meta info */}
        {meta.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-3 space-y-2">
            {meta.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <FontAwesomeIcon icon={icon} className="text-[9px] text-[var(--text-tertiary)] flex-shrink-0 w-3.5 text-center" />
                <span className="text-[var(--text-tertiary)] font-medium flex-shrink-0 w-20">{label}</span>
                <span className="font-semibold text-[var(--text-secondary)] truncate text-[10px]">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Feature flags */}
        {(project.has_pwa || project.has_dark_mode || project.has_responsive) && (
          <div className="border-t border-[var(--border-color)] pt-3 flex flex-wrap gap-1.5">
            {project.has_pwa        && <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">PWA</span>}
            {project.has_dark_mode  && <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">Dark Mode</span>}
            {project.has_responsive && <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]">Responsive</span>}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-3">
            <p className="text-[8px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-1">
              <FontAwesomeIcon icon={faTag} className="text-[7px]" /> Tags
            </p>
            <div className="flex flex-wrap gap-1">
              {tags.map(tag => (
                <Link key={tag} to={`/projects?q=${encodeURIComponent(tag)}`}
                  className="text-[9px] font-medium px-2 py-0.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 hover:text-[var(--accent-primary)] transition-all">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Share Card ────────────────────────────────────────────────
function ShareCard({ url, title, description, compact = false }) {
  const [copied, setCopied] = useState(false)
  const shareText = `${title}${description ? ` — ${description.slice(0, 80)}` : ''}`
  const platforms = [
    { name: 'Facebook', icon: faFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: '#1877F2' },
    { name: 'LinkedIn', icon: faLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: '#0A66C2' },
    { name: 'WhatsApp', icon: faWhatsapp, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}`, color: '#25D366' },
    { name: 'X',        icon: faXTwitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, color: '#e2e8f0' },
    { name: 'Telegram', icon: faTelegram, href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, color: '#229ED9' },
    { name: 'Email',    icon: faEnvelope, href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + url)}`, color: '#E040FB' },
  ]
  const copy = async () => {
    await navigator.clipboard.writeText(url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)]">
      <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/60 flex items-center gap-2">
        <FontAwesomeIcon icon={faShareNodes} className="text-[var(--accent-primary)] text-[9px]" />
        <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Share</h3>
      </div>
      <div className="p-4 space-y-3">
        {/* Icons row */}
        {compact ? (
          /* Tablet: 6 icons in one row */
          <div className="flex items-center justify-between gap-2">
            {platforms.map(p => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" title={`Share on ${p.name}`}
                className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all">
                <FontAwesomeIcon icon={p.icon} className="text-lg" style={{ color: p.color }} />
                <span className="text-[7px] font-semibold text-[var(--text-secondary)] hidden sm:block">{p.name}</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {platforms.map(p => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" title={`Share on ${p.name}`}
                className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all">
                <FontAwesomeIcon icon={p.icon} className="text-base" style={{ color: p.color }} />
                <span className="text-[8px] font-semibold text-[var(--text-secondary)]">{p.name}</span>
              </a>
            ))}
          </div>
        )}

        {/* Tablet: copy field + share button in one row */}
        {compact ? (
          <div className="flex gap-2">
            <button onClick={copy}
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all text-xs">
              <span className="text-[var(--text-tertiary)] font-mono text-[9px] truncate flex-1 text-left">{url.replace('https://', '')}</span>
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={`flex-shrink-0 text-[10px] ${copied ? 'text-emerald-500' : 'text-[var(--text-tertiary)]'}`} />
            </button>
            {typeof navigator !== 'undefined' && navigator.share && (
              <button onClick={() => navigator.share({ title, url }).catch(() => {})}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-all flex-shrink-0">
                <FontAwesomeIcon icon={faShareNodes} className="text-[9px]" />
                Share
              </button>
            )}
          </div>
        ) : (
          <>
            <button onClick={copy}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-xs transition-all">
              <span className="text-[var(--text-tertiary)] font-mono text-[9px] truncate">{url.replace('https://', '')}</span>
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={`flex-shrink-0 ml-2 text-[10px] ${copied ? 'text-emerald-500' : 'text-[var(--text-tertiary)]'}`} />
            </button>
            {typeof navigator !== 'undefined' && navigator.share && (
              <button onClick={() => navigator.share({ title, url }).catch(() => {})}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-all">
                <FontAwesomeIcon icon={faShareNodes} /> Share via Device
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Main page content ─────────────────────────────────────────
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
  const contentRef  = useRef(null)
  const reviewRef   = useRef(null)
  const { addToast } = useToastStore()

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

  const scrollToReviews = () => {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) return <DetailSkeleton />
  if (notFound || !project) return <Navigate to="/projects" replace />

  const seoTitle    = project.seo_title || project.title
  const seoDesc     = project.seo_description || project.short_description || ''
  // Use thumbnail as og:image for per-project sharing
  const ogImage     = project.thumbnail_url || project.og_image_url || SITE_CONFIG.seo?.defaultOGImage || ''
  const pageUrl     = `${SITE_CONFIG.siteURL}/project/${slug}`
  const screenshots = asArray(project.screenshots)
  const tags        = asArray(project.tags)
  const avgRating   = project.avg_rating || 0
  const reviewCount = project.reviews_count || 0

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
        {project.seo_keywords && <meta name="keywords" content={project.seo_keywords} />}
      </Helmet>

      <div className="container-xl py-5 lg:py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: project.title }]} />

        {/* Back link */}
        <Link to="/projects"
          className="inline-flex items-center gap-1.5 mt-3 mb-5 text-xs font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors group">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[10px] transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        {/* ── Carousel (full width) */}
        <ProjectCarousel
          thumbnail_url={project.thumbnail_url}
          screenshots={screenshots}
          category={project.category}
          onImageClick={handleCarouselImageClick}
        />

        {/* ── Two-column grid (desktop) / single-column (tablet/mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] xl:grid-cols-[1fr_304px] gap-6 lg:gap-8">

          {/* ── LEFT COLUMN ─────────────────────────────────── */}
          <div className="min-w-0 space-y-6">

            {/* Title + tagline + short description */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-primary)] leading-tight tracking-tight">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-sm font-bold text-[var(--accent-primary)] flex items-center gap-2">
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

            {/* Interaction bar: like / dislike / save / report / views */}
            <InteractionBar project={project} pageUrl={pageUrl} />

            {/* ── Sidebar Card 1 — tablet only (after interaction bar) */}
            <div className="block lg:hidden">
              <SidebarMetaCard
                project={project}
                pageUrl={pageUrl}
                avgRating={avgRating}
                reviewCount={reviewCount}
                onScrollToReviews={scrollToReviews}
                compact
              />
            </div>

            {/* About This Project */}
            {project.content && (
              <div className="space-y-3">
                <h3 className="section-heading">
                  <span className="section-icon">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-[9px] text-[var(--accent-primary)]" />
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

            {/* Key Features */}
            <KeyFeatures features={project.key_features} />

            {/* Tech Stack */}
            <TechStackSection project={project} />

            {/* Notes */}
            {project.notes && (
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border-l-2 border-l-[var(--accent-primary)] border border-[var(--border-color)]">
                <p className="text-[9px] font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <FontAwesomeIcon icon={faInfoCircle} /> Developer Note
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{project.notes}</p>
              </div>
            )}

            {/* Reviews */}
            <div ref={reviewRef}>
              <ReviewSection projectId={project.id} />
            </div>

            {/* Related Projects */}
            <div className="border-t border-[var(--border-color)] pt-5">
              <RelatedProjectsRow items={related} loading={relatedLoading} />
            </div>

            {/* ── Share Card — tablet (between related and comments) */}
            <div className="block lg:hidden">
              <ShareCard url={pageUrl} title={project.title} description={project.short_description} compact />
            </div>

            {/* Comments */}
            <div className="border-t border-[var(--border-color)] pt-5">
              <CommentSection contentType="project" contentId={project.id} contentSlug={project.slug} />
            </div>
          </div>

          {/* ── RIGHT SIDEBAR (desktop only) ─────────────────── */}
          <aside className="hidden lg:flex flex-col gap-5 proj-detail-sidebar">
            <SidebarMetaCard
              project={project}
              pageUrl={pageUrl}
              avgRating={avgRating}
              reviewCount={reviewCount}
              onScrollToReviews={scrollToReviews}
            />
            <ShareCard url={pageUrl} title={project.title} description={project.short_description} />
          </aside>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        images={previewImages}
        initialIndex={previewIndex}
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
