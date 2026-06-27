// ReviewSection.jsx — v2.4.7
// Major rebuild:
//   - 1000-char reviews, direct public (no admin gate)
//   - Sort: latest / oldest / top / 1–5 star filter
//   - Edit / delete via 3-dot menu
//   - Review likes (any user can like a review)
//   - Admin reply (only admin can reply to a review)
//   - Animated star rating display (avg)
//   - "See more" for long messages
//   - View-all popup with distribution chart

import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as faStarSolid, faXmark, faPaperPlane, faChartBar,
  faEllipsisVertical, faPencil, faTrash, faHeart, faChevronDown,
  faChevronUp, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty, faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '../../hooks/useAuth.js'
import { loginWithGoogle } from '../../services/firebase.js'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  getProjectReviews, getUserProjectReview,
  submitProjectReview, deleteProjectReview,
  toggleReviewLike, getUserReviewLikes,
} from '../../services/supabase.js'
import { supabase } from '../../config/supabase.config.js'
import { formatDistanceToNow } from '../../utils/formatters.js'
import { useToastStore } from '../../store/toastStore.js'

const MAX_MSG = 1000
const TRUNCATE_LINES = 4 // lines before "see more"

// ── Helpers ──────────────────────────────────────────────────
function fmtDate(s) {
  try {
    return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return '' }
}

// ── Sub-components ───────────────────────────────────────────

function StarInput({ value, onChange, disabled = false }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star} type="button"
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => !disabled && onChange(star)}
          disabled={disabled}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          className="transition-all duration-150 hover:scale-110 active:scale-90 disabled:cursor-not-allowed">
          <FontAwesomeIcon
            icon={(hovered || value) >= star ? faStarSolid : faStarEmpty}
            className={`text-2xl transition-colors duration-100 ${
              (hovered || value) >= star ? 'text-amber-400 drop-shadow-sm' : 'text-[var(--text-tertiary)]/40'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function StarDisplay({ rating = 0, size = 'sm', animated = false }) {
  const filled = Math.round(rating)
  const cls = size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : 'text-xs'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.span key={i}
          initial={animated ? { scale: 0, opacity: 0 } : false}
          animate={animated ? { scale: 1, opacity: 1 } : false}
          transition={animated ? { delay: i * 0.07, type: 'spring', stiffness: 300, damping: 15 } : undefined}>
          <FontAwesomeIcon
            icon={faStarSolid}
            className={`${cls} ${i <= filled ? 'text-amber-400' : 'text-[var(--text-tertiary)]/20'}`}
          />
        </motion.span>
      ))}
    </div>
  )
}

function AvgRatingDisplay({ avg, count, onViewAll }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/8 to-transparent border border-amber-500/15">
      <div className="text-center flex-shrink-0">
        <div className="text-4xl font-black text-[var(--text-primary)] font-display leading-none">
          {avg.toFixed(1)}
        </div>
        <StarDisplay rating={avg} size="md" animated />
        <p className="text-[10px] text-[var(--text-tertiary)] mt-1 font-medium">
          {count} review{count !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-secondary)] leading-snug mb-3">
          {avg >= 4.5 ? '⭐ Excellent rating from the community!' :
           avg >= 3.5 ? '👍 Well received by the community.' :
           avg >= 2.5 ? '👌 Mixed feedback from the community.' :
                        '📝 Early reviews coming in.'}
        </p>
        {count > 0 && (
          <button onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-500 hover:text-amber-400 transition-colors">
            <FontAwesomeIcon icon={faChartBar} className="text-[9px]" />
            View all reviews
            <FontAwesomeIcon icon={faArrowRight} className="text-[8px]" />
          </button>
        )}
      </div>
    </div>
  )
}

function TruncatedMessage({ text, lines = TRUNCATE_LINES }) {
  const [expanded, setExpanded] = useState(false)
  if (!text) return null
  // approx: 4 lines × ~80 chars
  const threshold = lines * 80
  const needsTrunc = text.length > threshold

  return (
    <div>
      <p className={`text-xs text-[var(--text-secondary)] leading-relaxed ${!expanded && needsTrunc ? 'line-clamp-4' : ''}`}>
        {text}
      </p>
      {needsTrunc && (
        <button onClick={() => setExpanded(!expanded)}
          className="mt-1 text-[10px] font-bold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors flex items-center gap-1">
          {expanded ? (
            <><FontAwesomeIcon icon={faChevronUp} className="text-[8px]" /> Show less</>
          ) : (
            <>... <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" /> See more</>
          )}
        </button>
      )}
    </div>
  )
}

function ThreeDotMenu({ items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-all">
        <FontAwesomeIcon icon={faEllipsisVertical} className="text-xs" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-8 z-50 min-w-[140px] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-lg overflow-hidden">
            {items.map((item, i) => (
              <button key={i} onClick={() => { item.onClick(); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium transition-colors hover:bg-[var(--bg-surface-2)] ${
                  item.danger ? 'text-red-400 hover:text-red-300' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}>
                <FontAwesomeIcon icon={item.icon} className="text-[10px] flex-shrink-0" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ReviewCard({ review, currentUserId, likedIds, onLike, onEdit, onDelete }) {
  const user    = review.users || {}
  const name    = user.display_name || 'Anonymous'
  const avatar  = user.photo_url
  const isOwn   = currentUserId && review.user_id === currentUserId
  const isLiked = likedIds.includes(review.id)

  const menuItems = [
    ...(isOwn ? [
      { icon: faPencil, label: 'Edit',   onClick: () => onEdit(review)   },
      { icon: faTrash,  label: 'Delete', onClick: () => onDelete(review.id), danger: true },
    ] : []),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex gap-3 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-colors">
      {/* Avatar */}
      {avatar ? (
        <img src={avatar} alt={name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-[var(--border-color)]" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/20 flex-shrink-0">
          <span className="text-xs font-bold text-[var(--accent-primary)]">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {user.username ? (
              <Link to={`/@${user.username}`} className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
                {name}
              </Link>
            ) : (
              <span className="text-xs font-bold text-[var(--text-primary)]">{name}</span>
            )}
            <div className="flex items-center gap-2 mt-0.5">
              <StarDisplay rating={review.rating} size="sm" />
              <span className="text-[9px] text-[var(--text-tertiary)]">
                {fmtDate(review.created_at)}
                {review.created_at !== review.updated_at && ' (edited)'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {menuItems.length > 0 && <ThreeDotMenu items={menuItems} />}
          </div>
        </div>

        <div className="mt-2">
          <TruncatedMessage text={review.message} />
        </div>

        {/* Admin reply */}
        {review.admin_reply && (
          <div className="mt-3 pl-3 border-l-2 border-[var(--accent-primary)]/30">
            <p className="text-[9px] font-bold text-[var(--accent-primary)] mb-1">Admin Reply</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{review.admin_reply}</p>
          </div>
        )}

        {/* Like */}
        <div className="flex items-center gap-2 mt-3">
          <button onClick={() => onLike(review.id)}
            className={`flex items-center gap-1.5 text-[10px] font-semibold transition-all px-2 py-1 rounded-lg ${
              isLiked
                ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                : 'text-[var(--text-tertiary)] hover:text-rose-400 hover:bg-rose-500/8 border border-transparent'
            }`}>
            <FontAwesomeIcon icon={isLiked ? faHeart : faHeartEmpty} className="text-[9px]" />
            {review.likes_count > 0 && <span>{review.likes_count}</span>}
            <span>{isLiked ? 'Liked' : 'Helpful'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── All Reviews Popup ────────────────────────────────────────

function ReviewsPopup({ isOpen, onClose, projectId, summary }) {
  const [reviews, setReviews]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [sort, setSort]           = useState('latest')
  const [starFilter, setStarFilter] = useState(null)
  const { uid, isLoggedIn }       = useAuth()
  const [likedIds, setLikedIds]   = useState([])

  const load = useCallback(async () => {
    if (!projectId) return
    setLoading(true)
    const data = await getProjectReviews(projectId, { limit: 200, sort, starFilter }).catch(() => [])
    setReviews(data)
    if (isLoggedIn && uid && data.length) {
      const ids = await getUserReviewLikes(data.map(r => r.id), uid).catch(() => [])
      setLikedIds(ids)
    }
    setLoading(false)
  }, [projectId, sort, starFilter, uid, isLoggedIn])

  useEffect(() => { if (isOpen) load() }, [isOpen, load])

  const handleLike = async (id) => {
    if (!isLoggedIn) return
    const result = await toggleReviewLike(id, uid).catch(() => null)
    if (!result) return
    setLikedIds(prev => result.liked ? [...prev, id] : prev.filter(x => x !== id))
    setReviews(prev => prev.map(r => r.id === id
      ? { ...r, likes_count: r.likes_count + (result.liked ? 1 : -1) }
      : r
    ))
  }

  if (!isOpen) return null

  const dist = [5,4,3,2,1].map(star => ({
    star, count: reviews.filter(r => r.rating === star).length,
  }))

  const SORTS = ['latest', 'oldest', 'top']
  const STARS = [5, 4, 3, 2, 1]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[900] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative w-full sm:max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">All Reviews</h3>
              <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                {summary.count} review{summary.count !== 1 ? 's' : ''} · avg {summary.avg.toFixed(1)}
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors">
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
          </div>

          {/* Summary */}
          {reviews.length > 0 && (
            <div className="px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/40 flex-shrink-0">
              <div className="flex items-center gap-5">
                <div className="text-center flex-shrink-0">
                  <div className="text-3xl font-black text-[var(--text-primary)] font-display">{summary.avg.toFixed(1)}</div>
                  <StarDisplay rating={Math.round(summary.avg)} size="md" animated />
                  <div className="text-[9px] text-[var(--text-tertiary)] mt-1">{summary.count} reviews</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {dist.map(({ star, count }) => (
                    <button key={star} onClick={() => setStarFilter(starFilter === star ? null : star)}
                      className={`w-full flex items-center gap-2 rounded-lg px-1 py-0.5 transition-colors ${
                        starFilter === star ? 'bg-amber-500/10' : 'hover:bg-[var(--bg-surface-3)]'
                      }`}>
                      <span className={`text-[9px] font-semibold w-3 text-right flex-shrink-0 ${starFilter === star ? 'text-amber-400' : 'text-[var(--text-tertiary)]'}`}>{star}</span>
                      <FontAwesomeIcon icon={faStarSolid} className="text-amber-400 text-[8px] flex-shrink-0" />
                      <div className="flex-1 h-1.5 bg-[var(--bg-surface-3)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: summary.count > 0 ? `${(count / summary.count) * 100}%` : '0%' }}
                        />
                      </div>
                      <span className="text-[9px] text-[var(--text-tertiary)] w-4 text-right flex-shrink-0">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sort controls */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/30 flex-shrink-0 flex-wrap">
            <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Sort:</span>
            {SORTS.map(s => (
              <button key={s} onClick={() => setSort(s)}
                className={`text-[9px] font-bold px-2.5 py-1 rounded-lg capitalize transition-all ${
                  sort === s
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}>
                {s}
              </button>
            ))}
            {starFilter && (
              <button onClick={() => setStarFilter(null)}
                className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25 hover:bg-amber-500/25 transition-all">
                ★ {starFilter} only ×
              </button>
            )}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-[var(--border-color)]">
                  <div className="sk w-9 h-9 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="sk h-3 w-28 rounded" />
                    <div className="sk h-3 w-full rounded" />
                    <div className="sk h-3 w-3/4 rounded" />
                  </div>
                </div>
              ))
            ) : reviews.length === 0 ? (
              <div className="text-center py-16">
                <FontAwesomeIcon icon={faStarSolid} className="text-4xl text-[var(--text-tertiary)]/20 mb-3 block" />
                <p className="text-sm font-bold text-[var(--text-secondary)]">No reviews yet</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">Be the first to review this project!</p>
              </div>
            ) : (
              reviews.map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  currentUserId={uid}
                  likedIds={likedIds}
                  onLike={handleLike}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main ReviewSection ───────────────────────────────────────

export default function ReviewSection({ projectId }) {
  const { isLoggedIn, uid, displayName, avatar } = useAuth()
  const { addToast }  = useToastStore()

  const [reviews, setReviews]       = useState([])
  const [myReview, setMyReview]     = useState(null)
  const [loading, setLoading]       = useState(true)
  const [showPopup, setShowPopup]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing]       = useState(false)
  const [rating, setRating]         = useState(0)
  const [message, setMessage]       = useState('')
  const [error, setError]           = useState('')
  const [signingIn, setSigningIn]   = useState(false)
  const [likedIds, setLikedIds]     = useState([])
  const msgRef = useRef(null)

  // Summary derived from reviews list
  const summary = {
    count: reviews.length,
    avg:   reviews.length > 0 ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0,
  }

  const load = useCallback(async () => {
    if (!projectId) return
    setLoading(true)
    const [allReviews, mine] = await Promise.all([
      getProjectReviews(projectId, { limit: 100 }).catch(() => []),
      isLoggedIn && uid ? getUserProjectReview(projectId, uid).catch(() => null) : null,
    ])
    setReviews(allReviews || [])
    if (mine) { setMyReview(mine); setRating(mine.rating); setMessage(mine.message || '') }

    if (isLoggedIn && uid && allReviews?.length) {
      const ids = await getUserReviewLikes(allReviews.map(r => r.id), uid).catch(() => [])
      setLikedIds(ids)
    }
    setLoading(false)
  }, [projectId, isLoggedIn, uid])

  useEffect(() => { load() }, [load])

  // Realtime subscription
  useEffect(() => {
    if (!projectId) return
    const sub = supabase
      .channel(`reviews:${projectId}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'project_reviews',
        filter: `project_id=eq.${projectId}`,
      }, () => { load() })
      .subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [projectId, load])

  const handleGoogleLogin = async () => {
    setSigningIn(true)
    try { await loginWithGoogle() }
    catch { /* user closed popup */ }
    finally { setSigningIn(false) }
  }

  const handleSubmit = async () => {
    if (!rating) { setError('Please select a star rating.'); return }
    if (message.length > MAX_MSG) { setError(`Message must be under ${MAX_MSG} characters.`); return }
    setError('')
    setSubmitting(true)
    try {
      const result = await submitProjectReview({ projectId, userId: uid, rating, message })
      setMyReview(result)
      setEditing(false)
      setReviews(prev => {
        const existing = prev.findIndex(r => r.user_id === uid)
        if (existing >= 0) {
          const updated = [...prev]
          updated[existing] = result
          return updated
        }
        return [result, ...prev]
      })
      addToast({ type: 'success', title: 'Review submitted!', message: 'Thanks for your feedback.' })
    } catch (e) {
      setError(e.message || 'Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete your review?')) return
    try {
      await deleteProjectReview(id, uid)
      setMyReview(null)
      setRating(0)
      setMessage('')
      setReviews(prev => prev.filter(r => r.id !== id))
      addToast({ type: 'info', title: 'Review deleted' })
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete review.' })
    }
  }

  const handleLike = async (id) => {
    if (!isLoggedIn) { addToast({ type: 'info', title: 'Login required', message: 'Sign in to like reviews.' }); return }
    const result = await toggleReviewLike(id, uid).catch(() => null)
    if (!result) return
    setLikedIds(prev => result.liked ? [...prev, id] : prev.filter(x => x !== id))
    setReviews(prev => prev.map(r => r.id === id
      ? { ...r, likes_count: (r.likes_count || 0) + (result.liked ? 1 : -1) }
      : r
    ))
  }

  // Show only 3 non-own reviews in the inline list
  const displayReviews = reviews.filter(r => r.user_id !== uid).slice(0, 3)

  if (loading) return (
    <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)]">
      <div className="px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/50">
        <div className="sk h-4 w-32 rounded" />
      </div>
      <div className="p-5 space-y-3">
        <div className="sk h-16 w-full rounded-xl" />
        <div className="sk h-24 w-full rounded-xl" />
      </div>
    </div>
  )

  return (
    <>
      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
            <FontAwesomeIcon icon={faStarSolid} className="text-amber-400 text-[10px]" />
            Reviews
          </h3>
          {summary.count > 0 && (
            <button onClick={() => setShowPopup(true)}
              className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
              <FontAwesomeIcon icon={faChartBar} className="text-[9px]" />
              View all ({summary.count})
            </button>
          )}
        </div>

        <div className="p-5 space-y-5">
          {/* Avg rating display (when reviews exist) */}
          {summary.count > 0 && (
            <AvgRatingDisplay avg={summary.avg} count={summary.count} onViewAll={() => setShowPopup(true)} />
          )}

          {/* Not logged in */}
          {!isLoggedIn ? (
            <div className="flex flex-col items-center gap-3 py-5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] border-dashed">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <FontAwesomeIcon key={i} icon={faStarEmpty} className="text-xl text-[var(--text-tertiary)]/30" />
                ))}
              </div>
              <p className="text-xs font-semibold text-[var(--text-secondary)]">Sign in to leave a review</p>
              <button onClick={handleGoogleLogin} disabled={signingIn}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-xs font-bold text-[var(--text-primary)] transition-all disabled:opacity-60 shadow-sm">
                <FontAwesomeIcon icon={faGoogle} className="text-[#4285F4]" />
                {signingIn ? 'Signing in…' : 'Continue with Google'}
              </button>
            </div>
          ) : myReview && !editing ? (
            /* Already reviewed — show own review */
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Your Review</p>
                <ThreeDotMenu items={[
                  { icon: faPencil, label: 'Edit',   onClick: () => setEditing(true) },
                  { icon: faTrash,  label: 'Delete', onClick: () => handleDelete(myReview.id), danger: true },
                ]} />
              </div>
              <div className="flex gap-3 p-4 rounded-xl bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="w-9 h-9 rounded-full flex-shrink-0 border border-[var(--border-color)] object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">{displayName?.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[var(--text-primary)]">{displayName}</span>
                    <StarDisplay rating={myReview.rating} size="sm" />
                  </div>
                  {myReview.message && (
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{myReview.message}</p>
                  )}
                  <p className="text-[9px] text-[var(--text-tertiary)] mt-1.5">
                    ✓ Review submitted · {fmtDate(myReview.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Review form (new or editing) */
            <div className="space-y-4">
              {editing && (
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[var(--text-primary)]">Edit your review</p>
                  <button onClick={() => { setEditing(false); setRating(myReview?.rating || 0); setMessage(myReview?.message || '') }}
                    className="text-[10px] font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                    Cancel
                  </button>
                </div>
              )}
              <div>
                <p className="text-[10px] font-semibold text-[var(--text-tertiary)] mb-2">
                  Your rating <span className="text-red-400">*</span>
                </p>
                <StarInput value={rating} onChange={setRating} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-semibold text-[var(--text-tertiary)]">
                    Review <span className="font-normal">(optional)</span>
                  </p>
                  <span className={`text-[9px] font-mono transition-colors ${
                    message.length > MAX_MSG ? 'text-red-500' :
                    message.length > MAX_MSG * 0.9 ? 'text-amber-400' :
                    'text-[var(--text-tertiary)]'
                  }`}>
                    {message.length}/{MAX_MSG}
                  </span>
                </div>
                <textarea
                  ref={msgRef}
                  value={message}
                  onChange={e => { setMessage(e.target.value); setError('') }}
                  maxLength={MAX_MSG + 10}
                  rows={4}
                  placeholder="Share your experience with this project…"
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)]
                    focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/15
                    outline-none text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
                    transition-all resize-none"
                />
              </div>
              {error && <p className="text-[10px] text-red-400 font-medium">{error}</p>}
              <button onClick={handleSubmit} disabled={submitting || !rating || message.length > MAX_MSG}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                <FontAwesomeIcon icon={faPaperPlane} className="text-[9px]" />
                {submitting ? 'Submitting…' : (editing ? 'Update Review' : 'Submit Review')}
              </button>
            </div>
          )}

          {/* Recent reviews (3 non-own) */}
          {displayReviews.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-[var(--border-color)]" />
                <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider flex-shrink-0">
                  Recent Reviews
                </span>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
              </div>
              <AnimatePresence initial={false}>
                {displayReviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    currentUserId={uid}
                    likedIds={likedIds}
                    onLike={handleLike}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </AnimatePresence>
              {summary.count > 3 && (
                <button onClick={() => setShowPopup(true)}
                  className="w-full py-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-strong)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)]">
                  View all {summary.count} reviews
                </button>
              )}
            </div>
          )}

          {summary.count === 0 && !isLoggedIn && (
            <p className="text-center text-xs text-[var(--text-tertiary)] py-2">
              No reviews yet. Be the first!
            </p>
          )}
        </div>
      </div>

      <ReviewsPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        projectId={projectId}
        summary={summary}
      />
    </>
  )
}
