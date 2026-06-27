// BlogDetailPage.jsx — v2.5.0
// Full blog article page.
// Features:
//   - Reading progress bar (scroll %)
//   - Table of Contents (desktop sidebar + mobile accordion)
//   - Like/Dislike, Views, Comment, Report, Share
//   - Related blogs
//   - Breadcrumb
//   - Skeleton loading
//   - SEO meta (per-blog)

import './feed.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft, faEye, faClock, faCalendarDays, faTag, faFolderOpen,
  faShareNodes, faCopy, faCheck, faThumbsUp, faThumbsDown, faBookmark,
  faFlag, faChevronRight, faPenNib,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpReg,
  faThumbsDown as faThumbsDownReg,
  faBookmark as faBookmarkReg,
} from '@fortawesome/free-regular-svg-icons'
import {
  faFacebook, faLinkedin, faWhatsapp, faTelegram, faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

import ReadingProgress from './ReadingProgress.jsx'
import { TocSidebar, TocMobile } from './TableOfContents.jsx'
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
  getBlogBySlug, getRelatedBlogs, incrementBlogViews,
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

// ── Skeleton ──────────────────────────────────────────────────
function BlogDetailSkeleton() {
  return (
    <div className="container-xl py-8 pt-[calc(var(--navbar-h)+2rem)]">
      <div className="sk h-4 w-48 rounded mb-6" />
      <div className="sk w-full rounded-xl mb-6" style={{ aspectRatio: '21/9' }} />
      <div className="blog-detail-layout">
        <div className="space-y-4">
          <div className="sk h-8 w-3/4 rounded" />
          <div className="sk h-5 w-1/2 rounded" />
          <div className="sk h-4 w-full rounded mt-6" />
          <div className="sk h-4 w-11/12 rounded" />
          <div className="sk h-4 w-4/5 rounded" />
          <div className="sk h-4 w-full rounded" />
          <div className="sk h-4 w-3/5 rounded" />
        </div>
        <div className="space-y-3 hidden lg:block">
          <div className="sk h-48 rounded-xl" />
          <div className="sk h-36 rounded-xl" />
        </div>
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
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-colors text-[var(--text-secondary)] hover:text-white"
          style={{ '--hc': color }}
          onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = '' }}
        >
          <FontAwesomeIcon icon={icon} className="text-sm" />
        </a>
      ))}
      <button
        onClick={copyLink}
        title="Copy link"
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-sm" />
      </button>
    </div>
  )
}

// ── Like/Dislike/Save bar ─────────────────────────────────────
function InteractionBar({ blog, onLoginPrompt }) {
  const { user } = useAuth()
  const { addToast } = useToastStore()

  const [likes, setLikes]     = useState(blog.likes_count || 0)
  const [dislikes, setDislikes] = useState(blog.dislikes_count || 0)
  const [userVote, setUserVote] = useState(null)
  const [saved, setSaved]     = useState(false)
  const [voting, setVoting]   = useState(false)
  const [savingB, setSavingB] = useState(false)
  const [views, setViews]     = useState(blog.views_count || 0)

  useEffect(() => {
    if (!blog.id) return
    Promise.all([
      getLikeStats('blog', blog.id),
      user ? getUserLikeStatus('blog', blog.id, user.uid) : Promise.resolve(null),
      user ? getFeedSavedStatus(user.uid, 'blog', blog.id) : Promise.resolve(false),
    ]).then(([stats, vote, sv]) => {
      setLikes(stats.likes || 0)
      setDislikes(stats.dislikes || 0)
      setUserVote(vote)
      setSaved(sv)
    }).catch(() => {})
  }, [blog.id, user])

  const handleVote = async (voteType) => {
    if (!user) { onLoginPrompt(); return }
    if (voting) return
    setVoting(true)
    try {
      const prevVote = userVote
      const newVote  = prevVote === voteType ? null : voteType

      // Optimistic update
      setUserVote(newVote)
      setLikes(l    => l    + (voteType === 'like'    ? (newVote ? 1 : -1) : (prevVote === 'like'    ? -1 : 0)))
      setDislikes(d => d + (voteType === 'dislike' ? (newVote ? 1 : -1) : (prevVote === 'dislike' ? -1 : 0)))

      await toggleLike('blog', blog.id, user.uid, voteType)
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
      await toggleFeedSaved(user.uid, 'blog', blog.id)
      addToast({ type: 'success', title: next ? 'Saved!' : 'Removed', message: next ? 'Blog saved to your list.' : 'Removed from saved.' })
    } catch {
      setSaved(s => !s)
      addToast({ type: 'error', title: 'Error', message: 'Could not update saved status.' })
    } finally {
      setSavingB(false)
    }
  }

  return (
    <div className="feed-interaction-bar">
      {/* Views */}
      <div className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)]">
        <FontAwesomeIcon icon={faEye} />
        <span>{fmt(views)} views</span>
      </div>

      <div className="flex-1" />

      {/* Like */}
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

      {/* Dislike */}
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

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={savingB}
        title={saved ? 'Remove from saved' : 'Save blog'}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all ${
          saved
            ? 'bg-amber-500 text-white border-amber-500'
            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-amber-400 hover:text-amber-400'
        }`}
      >
        <FontAwesomeIcon icon={saved ? faBookmark : faBookmarkReg} />
        <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
      </button>

      {/* Share */}
      <ShareBar url={`${SITE_CONFIG.siteURL}/blogs/${blog.slug}`} title={blog.title} />

      {/* Report */}
      <ReportButton contentType="blog" contentId={blog.id} />
    </div>
  )
}

// ── Related blogs row ─────────────────────────────────────────
function RelatedBlogs({ blogs }) {
  if (!blogs?.length) return null

  return (
    <div className="mt-10">
      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">
        Related Articles
      </h3>
      <div className="related-feed-grid">
        {blogs.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          >
            <Link
              to={`/blogs/${b.slug}`}
              className="block bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent-primary)]/40 hover:shadow-md transition-all no-underline"
            >
              {b.thumbnail_url && (
                <img src={b.thumbnail_url} alt={b.title} className="w-full aspect-video object-cover" loading="lazy" />
              )}
              <div className="p-3.5">
                <p className="text-xs text-[var(--text-tertiary)] mb-1.5">
                  {b.category && <><FontAwesomeIcon icon={faTag} className="mr-1" />{b.category} · </>}
                  <FontAwesomeIcon icon={faClock} className="mr-1" />{b.reading_time || 1} min read
                </p>
                <p className="font-display text-sm font-bold text-[var(--text-primary)] line-clamp-2 leading-snug">{b.title}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
function BlogDetailContent() {
  const { slug }      = useParams()
  const navigate      = useNavigate()
  const { addToast }  = useToastStore()
  const { user }      = useAuth()

  const [blog, setBlog]           = useState(null)
  const [related, setRelated]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [notFound, setNotFound]   = useState(false)

  const articleRef = useRef(null)

  useEffect(() => {
    trackPage('BlogDetail')
    setLoading(true)
    setNotFound(false)

    getBlogBySlug(slug)
      .then(async (data) => {
        if (!data) { setNotFound(true); return }
        setBlog(data)

        // Increment views (fire and forget)
        incrementBlogViews(data.id).catch(() => {})

        // Fetch related
        const rel = await getRelatedBlogs(slug, data.category, data.tags).catch(() => [])
        setRelated(rel)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const onLoginPrompt = useCallback(() => {
    addToast({ type: 'info', title: 'Login required', message: 'Please sign in to interact with this post.' })
    navigate('/login', { state: { from: `/blogs/${slug}` } })
  }, [slug, navigate, addToast])

  if (loading) return <BlogDetailSkeleton />
  if (notFound) return <Navigate to="/404" replace />

  const pageUrl = `${SITE_CONFIG.siteURL}/blogs/${blog.slug}`

  return (
    <>
      <Helmet>
        <title>{buildTitle(blog.seo_title || blog.title)}</title>
        <meta name="description" content={blog.seo_description || blog.short_description || ''} />
        <meta property="og:title" content={blog.seo_title || blog.title} />
        <meta property="og:description" content={blog.seo_description || blog.short_description || ''} />
        <meta property="og:image" content={blog.thumbnail_url || SITE_CONFIG.seo.defaultOGImage} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
        {/* JSON-LD Article */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": blog.title,
          "image": blog.thumbnail_url,
          "datePublished": blog.created_at,
          "dateModified": blog.updated_at,
          "author": { "@type": "Person", "name": "Muhtasim Rahman" },
          "publisher": { "@type": "Person", "name": "Muhtasim Rahman" },
          "description": blog.short_description,
          "url": pageUrl,
        })}</script>
      </Helmet>

      {/* Reading progress bar */}
      <ReadingProgress articleRef={articleRef} />

      <div className="container-xl py-8 pt-[calc(var(--navbar-h)+1.5rem)]">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Feed', href: '/feed' },
            { label: 'Blogs', href: '/feed?type=blog' },
            { label: blog.title },
          ]}
          className="mb-6"
        />

        {/* Cover image */}
        {blog.cover_image_url && (
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="blog-cover"
          />
        )}

        {/* Hero meta card */}
        <div className="blog-hero-card">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="feed-type-badge feed-type-blog">
              <FontAwesomeIcon icon={faPenNib} /> Blog
            </span>
            {blog.pinned && (
              <span className="feed-pinned-badge text-amber-400 text-xs font-semibold">📌 Pinned</span>
            )}
            {blog.category && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                <FontAwesomeIcon icon={faFolderOpen} className="text-[0.65rem]" />
                {blog.category}
              </span>
            )}
            {blog.tags?.map(tag => (
              <span key={tag} className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="blog-hero-title">{blog.title}</h1>

          {/* Short description */}
          {blog.short_description && (
            <p className="text-[var(--text-secondary)] text-base mb-4 leading-relaxed">
              {blog.short_description}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faCalendarDays} />
              {fmtDate(blog.created_at)}
            </span>
            {blog.reading_time && (
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} />
                {blog.reading_time} min read
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faEye} />
              {fmt(blog.views_count)} views
            </span>
          </div>
        </div>

        {/* Content layout */}
        <div className="blog-detail-layout" ref={articleRef}>

          {/* Main content */}
          <div className="blog-detail-main">

            {/* Mobile TOC */}
            <TocMobile articleRef={articleRef} />

            {/* Article body */}
            {blog.content ? (
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <div className="blog-prose">
                <p className="text-[var(--text-tertiary)] italic">No content available.</p>
              </div>
            )}

            {/* Interaction bar */}
            <InteractionBar blog={blog} onLoginPrompt={onLoginPrompt} />

            {/* Comments */}
            <CommentSection contentType="blog" contentId={blog.id} contentSlug={blog.slug} />

            {/* Related blogs */}
            <RelatedBlogs blogs={related} />
          </div>

          {/* Sidebar */}
          <aside className="blog-detail-sidebar">
            <TocSidebar articleRef={articleRef} />

            {/* Quick meta card */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Article Info</p>
              <div className="space-y-2 text-sm">
                {blog.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-tertiary)]">Category</span>
                    <span className="text-[var(--text-primary)] font-medium">{blog.category}</span>
                  </div>
                )}
                {blog.reading_time && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-tertiary)]">Read time</span>
                    <span className="text-[var(--text-primary)] font-medium">{blog.reading_time} min</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Views</span>
                  <span className="text-[var(--text-primary)] font-medium">{fmt(blog.views_count)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Published</span>
                  <span className="text-[var(--text-primary)] font-medium">{fmtDate(blog.created_at)}</span>
                </div>
              </div>

              {blog.tags?.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/feed?type=blog&tag=${encodeURIComponent(tag)}`}
                        className="text-xs px-2 py-0.5 bg-[var(--bg-surface-2)] text-[var(--text-secondary)] rounded-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors no-underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to feed */}
              <Link
                to="/feed?type=blog"
                className="flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline mt-2 no-underline"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                All blogs
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}

export default function BlogDetailPage() {
  return (
    <VisibilityGuard page="blogs" skeleton="detail">
      <BlogDetailContent />
    </VisibilityGuard>
  )
}
