// PostDetailPage.jsx — v2.5.0
// Video embed post detail page.
// Features:
//   - Video embed (YouTube / Facebook / other)
//   - Like/Dislike, Views, Comment, Report, Share
//   - Related posts
//   - Breadcrumb
//   - Skeleton loading
//   - SEO meta

import './feed.css'
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faEye, faCalendarDays, faTag, faFolderOpen,
  faShareNodes, faCopy, faCheck, faThumbsUp, faThumbsDown, faBookmark,
  faPlay, faVideo, faClock,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg,
  faThumbsDown as faThumbsDownReg,
  faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'
import {
  faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter, faYoutube,
} from '@fortawesome/free-brands-svg-icons'

import Breadcrumb from '../shared/Breadcrumb.jsx'
import CommentSection from '../shared/CommentSection.jsx'
import ReportButton from '../shared/ReportButton.jsx'
import { VisibilityGuard } from '../shared/VisibilityGuard.jsx'
import { buildTitle } from '../../utils/seo.js'
import { trackPage } from '../../services/analytics.js'
import { SITE_CONFIG } from '../../config/site.config.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useToastStore } from '../../store/toastStore.js'
import {
  getPostBySlug, getRelatedPosts, incrementPostViews,
  getLikeStats, getUserLikeStatus, toggleLike,
  getFeedSavedStatus, toggleFeedSaved,
} from '../../services/supabase.js'

// ── Helpers ──────────────────────────────────────────────────
function fmt(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
function fmtDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Convert any video URL to embed URL
function toEmbedUrl(raw, platform) {
  if (!raw) return null

  // YouTube
  const ytMatch = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/|v\/)?)([\w-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`

  // Facebook
  if (platform === 'facebook' || raw.includes('facebook.com')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(raw)}&show_text=false`
  }

  // Already an embed URL
  if (raw.includes('embed') || raw.includes('player')) return raw

  return raw
}

// ── Skeleton ──────────────────────────────────────────────────
function PostDetailSkeleton() {
  return (
    <div className="container-md py-8 pt-[calc(var(--navbar-h)+2rem)]">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk w-full rounded-xl mb-6" style={{ aspectRatio: '16/9' }} />
      <div className="sk h-7 w-3/4 rounded mb-3" />
      <div className="sk h-4 w-1/3 rounded mb-6" />
      <div className="sk h-12 w-full rounded-xl mb-6" />
      <div className="space-y-3">
        <div className="sk h-4 w-full rounded" />
        <div className="sk h-4 w-11/12 rounded" />
        <div className="sk h-4 w-4/5 rounded" />
      </div>
    </div>
  )
}

// ── Share buttons ─────────────────────────────────────────────
function ShareBar({ url, title }) {
  const { addToast } = useToastStore()
  const [copied, setCopied] = useState(false)

  const enc = encodeURIComponent
  const links = [
    { icon: faFacebook,  label: 'Facebook',  href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, color: '#1877f2' },
    { icon: faXTwitter,  label: 'X/Twitter', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, color: '#000' },
    { icon: faLinkedin,  label: 'LinkedIn',  href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, color: '#0a66c2' },
    { icon: faWhatsapp,  label: 'WhatsApp',  href: `https://wa.me/?text=${enc(title + ' ' + url)}`, color: '#25d366' },
    { icon: faTelegram,  label: 'Telegram',  href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`, color: '#0088cc' },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      addToast({ type: 'success', title: 'Copied!', message: 'Link copied to clipboard.' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      addToast({ type: 'error', title: 'Failed', message: 'Could not copy link.' })
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wide mr-1">
        <FontAwesomeIcon icon={faShareNodes} className="mr-1" /> Share
      </span>
      {links.map(({ icon, label, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${label}`}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-all"
          onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
        >
          <FontAwesomeIcon icon={icon} className="text-sm" />
        </a>
      ))}
      <button
        onClick={copyLink}
        title="Copy link"
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-sm" />
      </button>
    </div>
  )
}

// ── Interaction bar ───────────────────────────────────────────
function InteractionBar({ post, onLoginPrompt }) {
  const { user } = useAuth()
  const { addToast } = useToastStore()

  const [likes, setLikes]       = useState(post.likes_count || 0)
  const [dislikes, setDislikes] = useState(post.dislikes_count || 0)
  const [userVote, setUserVote] = useState(null)
  const [saved, setSaved]       = useState(false)
  const [voting, setVoting]     = useState(false)
  const [savingB, setSavingB]   = useState(false)

  useEffect(() => {
    if (!post.id) return
    Promise.all([
      getLikeStats('post', post.id),
      user ? getUserLikeStatus('post', post.id, user.uid) : Promise.resolve(null),
      user ? getFeedSavedStatus(user.uid, 'post', post.id) : Promise.resolve(false),
    ]).then(([stats, vote, sv]) => {
      setLikes(stats.likes || 0)
      setDislikes(stats.dislikes || 0)
      setUserVote(vote)
      setSaved(sv)
    }).catch(() => {})
  }, [post.id, user])

  const handleVote = async (voteType) => {
    if (!user) { onLoginPrompt(); return }
    if (voting) return
    setVoting(true)
    try {
      const prevVote = userVote
      const newVote  = prevVote === voteType ? null : voteType
      setUserVote(newVote)
      setLikes(l    => l    + (voteType === 'like'    ? (newVote ? 1 : -1) : (prevVote === 'like'    ? -1 : 0)))
      setDislikes(d => d + (voteType === 'dislike' ? (newVote ? 1 : -1) : (prevVote === 'dislike' ? -1 : 0)))
      await toggleLike('post', post.id, user.uid, voteType)
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not save vote.' })
    } finally {
      setVoting(false)
    }
  }

  const handleSave = async () => {
    if (!user) { onLoginPrompt(); return }
    if (savingB) return
    setSavingB(true)
    try {
      const next = !saved
      setSaved(next)
      await toggleFeedSaved(user.uid, 'post', post.id)
      addToast({ type: 'success', title: next ? 'Saved!' : 'Removed', message: next ? 'Post saved to your list.' : 'Removed from saved.' })
    } catch {
      setSaved(s => !s)
      addToast({ type: 'error', title: 'Error', message: 'Could not update saved status.' })
    } finally {
      setSavingB(false)
    }
  }

  return (
    <div className="feed-interaction-bar">
      <div className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)]">
        <FontAwesomeIcon icon={faEye} />
        <span>{fmt(post.views_count || 0)} views</span>
      </div>

      <div className="flex-1" />

      <button
        onClick={() => handleVote('like')}
        disabled={voting}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all ${
          userVote === 'like'
            ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
        }`}
      >
        <FontAwesomeIcon icon={userVote === 'like' ? faThumbsUp : faThumbsUpReg} />
        {fmt(likes)}
      </button>

      <button
        onClick={() => handleVote('dislike')}
        disabled={voting}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all ${
          userVote === 'dislike'
            ? 'bg-red-500 text-white border-red-500'
            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-red-400 hover:text-red-400'
        }`}
      >
        <FontAwesomeIcon icon={userVote === 'dislike' ? faThumbsDown : faThumbsDownReg} />
        {fmt(dislikes)}
      </button>

      <button
        onClick={handleSave}
        disabled={savingB}
        title={saved ? 'Remove from saved' : 'Save post'}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all ${
          saved
            ? 'bg-amber-500 text-white border-amber-500'
            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-amber-400 hover:text-amber-400'
        }`}
      >
        <FontAwesomeIcon icon={saved ? faBookmark : faBookmarkReg} />
        <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
      </button>

      <ShareBar url={`${SITE_CONFIG.siteURL}/posts/${post.slug}`} title={post.title} />

      <ReportButton contentType="post" contentId={post.id} />
    </div>
  )
}

// ── Platform badge ────────────────────────────────────────────
const PLATFORM_STYLE = {
  youtube:  { icon: faYoutube,  label: 'YouTube',  color: '#ff0000' },
  facebook: { icon: faFacebook, label: 'Facebook', color: '#1877f2' },
  other:    { icon: faVideo,    label: 'Video',    color: 'var(--accent-primary)' },
}

// ── Related posts ─────────────────────────────────────────────
function RelatedPosts({ posts }) {
  if (!posts?.length) return null
  return (
    <div className="mt-10">
      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">
        Related Videos
      </h3>
      <div className="related-feed-grid">
        {posts.map((p, i) => {
          const ytId = p.embed_url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1]
          const thumb = p.thumbnail_url || (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null)
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <Link
                to={`/posts/${p.slug}`}
                className="block bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-primary)]/40 hover:shadow-md transition-all no-underline"
              >
                <div className="relative aspect-video bg-[var(--bg-surface-2)]">
                  {thumb
                    ? <img src={thumb} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    : <div className="w-full h-full flex items-center justify-center text-3xl text-[var(--text-tertiary)] opacity-30"><FontAwesomeIcon icon={faPlay} /></div>
                  }
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                      <FontAwesomeIcon icon={faPlay} className="text-white text-sm ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="font-display text-sm font-bold text-[var(--text-primary)] line-clamp-2 leading-snug">{p.title}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    <FontAwesomeIcon icon={faEye} className="mr-1" />{fmt(p.views_count)} views
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
function PostDetailContent() {
  const { slug }     = useParams()
  const navigate     = useNavigate()
  const { addToast } = useToastStore()

  const [post, setPost]       = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    trackPage('PostDetail')
    setLoading(true)
    setNotFound(false)

    getPostBySlug(slug)
      .then(async data => {
        if (!data) { setNotFound(true); return }
        setPost(data)
        incrementPostViews(data.id).catch(() => {})
        const rel = await getRelatedPosts(slug, data.category, data.tags).catch(() => [])
        setRelated(rel)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const onLoginPrompt = useCallback(() => {
    addToast({ type: 'info', title: 'Login required', message: 'Please sign in to interact.' })
    navigate('/login', { state: { from: `/posts/${slug}` } })
  }, [slug, navigate, addToast])

  if (loading) return <PostDetailSkeleton />
  if (notFound) return <Navigate to="/404" replace />

  const embedUrl   = toEmbedUrl(post.embed_url, post.platform)
  const platform   = PLATFORM_STYLE[post.platform] || PLATFORM_STYLE.other
  const pageUrl    = `${SITE_CONFIG.siteURL}/posts/${post.slug}`
  const ytId       = post.embed_url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1]
  const thumbUrl   = post.thumbnail_url || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null)

  return (
    <>
      <Helmet>
        <title>{buildTitle(post.seo_title || post.title)}</title>
        <meta name="description" content={post.description || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || ''} />
        <meta property="og:image" content={thumbUrl || SITE_CONFIG.seo.defaultOGImage} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <div className="container-md py-8 pt-[calc(var(--navbar-h)+1.5rem)]">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Feed', href: '/feed' },
            { label: 'Posts', href: '/feed?type=post' },
            { label: post.title },
          ]}
          className="mb-6"
        />

        {/* Video embed */}
        {embedUrl && (
          <div className="post-detail-embed">
            <iframe
              src={embedUrl}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Title + meta */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="feed-type-badge feed-type-post">
              <FontAwesomeIcon icon={faVideo} /> Post
            </span>
            {post.category && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                <FontAwesomeIcon icon={faFolderOpen} className="text-[0.65rem]" />
                {post.category}
              </span>
            )}
            {/* Platform badge */}
            <span
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: platform.color, borderColor: `${platform.color}44`, background: `${platform.color}12` }}
            >
              <FontAwesomeIcon icon={platform.icon} />
              {platform.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl font-extrabold text-[var(--text-primary)] leading-snug mb-3">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)] mb-1">
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faCalendarDays} />
              {fmtDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faEye} />
              {fmt(post.views_count)} views
            </span>
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faThumbsUpReg} />
              {fmt(post.likes_count)} likes
            </span>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Description */}
        {post.description && (
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mt-4 mb-2">
            {post.description}
          </p>
        )}

        {/* Interaction bar */}
        <InteractionBar post={post} onLoginPrompt={onLoginPrompt} />

        {/* Back link */}
        <Link
          to="/feed?type=post"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline mb-6 no-underline"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          All posts
        </Link>

        {/* Comments */}
        <CommentSection contentType="post" contentId={post.id} contentSlug={post.slug} />

        {/* Related posts */}
        <RelatedPosts posts={related} />
      </div>
    </>
  )
}

export default function PostDetailPage() {
  return (
    <VisibilityGuard page="posts" skeleton="detail">
      <PostDetailContent />
    </VisibilityGuard>
  )
}
