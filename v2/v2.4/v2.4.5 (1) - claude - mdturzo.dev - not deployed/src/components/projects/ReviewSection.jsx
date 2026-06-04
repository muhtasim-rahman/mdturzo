// ReviewSection.jsx — v2.4.4
// Project reviews: 1-5 star + 500 char message
// - Login gate (Google only for now)
// - One review per user per project
// - "View all reviews" popup with full list
// - Minimal, responsive UI

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as faStarSolid, faXmark, faPaperPlane, faChartBar
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../hooks/useAuth.js'
import { loginWithGoogle } from '../../services/firebase.js'
import {
  getProjectReviews, submitProjectReview, getUserProjectReview
} from '../../services/supabase.js'

// ── Star rating input ────────────────────────────────────────
function StarInput({ value, onChange, size = 'md' }) {
  const [hovered, setHovered] = useState(0)
  const s = size === 'lg' ? 'text-2xl' : 'text-lg'

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className={`${s} transition-transform duration-100 hover:scale-110 active:scale-95`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}>
          <FontAwesomeIcon
            icon={(hovered || value) >= star ? faStarSolid : faStarEmpty}
            className={(hovered || value) >= star ? 'text-amber-400' : 'text-[var(--text-tertiary)]'}
          />
        </button>
      ))}
    </div>
  )
}

// ── Display stars (read-only) ────────────────────────────────
function Stars({ rating, size = 'sm' }) {
  const s = size === 'lg' ? 'text-base' : 'text-xs'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <FontAwesomeIcon key={i} icon={faStarSolid}
          className={`${s} ${i <= rating ? 'text-amber-400' : 'text-[var(--text-tertiary)]/20'}`} />
      ))}
    </div>
  )
}

// ── Review card ──────────────────────────────────────────────
function ReviewCard({ review }) {
  const user = review.users || {}
  const name = user.display_name || 'Anonymous'
  const avatar = user.photo_url
  const date = new Date(review.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  return (
    <div className="flex gap-3 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
      {avatar ? (
        <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-[var(--border-color)]" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/20">
          <span className="text-xs font-bold text-[var(--accent-primary)]">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <span className="text-xs font-bold text-[var(--text-primary)]">{name}</span>
            <span className="text-[9px] text-[var(--text-tertiary)] ml-2">{date}</span>
          </div>
          <Stars rating={review.rating} />
        </div>
        {review.message && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{review.message}</p>
        )}
      </div>
    </div>
  )
}

// ── All reviews popup ────────────────────────────────────────
function ReviewsPopup({ isOpen, onClose, projectId, summary }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOpen || !projectId) return
    setLoading(true)
    getProjectReviews(projectId, 50)
      .then(data => { setReviews(data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [isOpen, projectId])

  if (!isOpen) return null

  const dist = [5,4,3,2,1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }))

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[800] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative w-full sm:max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">All Reviews</h3>
              <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                {summary.count} review{summary.count !== 1 ? 's' : ''} · {summary.avg.toFixed(1)} avg
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors">
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
          </div>

          {/* Summary bar */}
          {reviews.length > 0 && (
            <div className="px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-surface-2)]/40">
              <div className="flex items-center gap-5">
                <div className="text-center flex-shrink-0">
                  <div className="text-3xl font-bold text-[var(--text-primary)]">{summary.avg.toFixed(1)}</div>
                  <Stars rating={Math.round(summary.avg)} size="lg" />
                  <div className="text-[9px] text-[var(--text-tertiary)] mt-1">{summary.count} reviews</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {dist.map(({ star, count }) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold text-[var(--text-tertiary)] w-3">{star}</span>
                      <FontAwesomeIcon icon={faStarSolid} className="text-amber-400 text-[8px]" />
                      <div className="flex-1 h-1.5 bg-[var(--bg-surface-3)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: summary.count > 0 ? `${(count / summary.count) * 100}%` : '0%' }}
                        />
                      </div>
                      <span className="text-[9px] text-[var(--text-tertiary)] w-4 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {loading ? (
              [1,2,3].map(i => (
                <div key={i} className="flex gap-3 p-3.5 rounded-xl border border-[var(--border-color)]">
                  <div className="sk w-9 h-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="sk h-3 w-24 rounded" />
                    <div className="sk h-3 w-full rounded" />
                  </div>
                </div>
              ))
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faStarSolid} className="text-3xl text-[var(--text-tertiary)] mb-3 block" />
                <p className="text-sm font-semibold text-[var(--text-secondary)]">No reviews yet</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">Be the first to review this project!</p>
              </div>
            ) : (
              reviews.map(review => <ReviewCard key={review.id} review={review} />)
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

  const [summary, setSummary]         = useState({ avg: 0, count: 0 })
  const [myReview, setMyReview]       = useState(null)
  const [loading, setLoading]         = useState(true)
  const [showPopup, setShowPopup]     = useState(false)
  const [submitting, setSubmitting]   = useState(false)
  const [success, setSuccess]         = useState(false)
  const [error, setError]             = useState('')
  const [rating, setRating]           = useState(0)
  const [message, setMessage]         = useState('')
  const [signingIn, setSigningIn]     = useState(false)

  useEffect(() => {
    if (!projectId) return
    let mounted = true
    setLoading(true)

    Promise.all([
      getProjectReviews(projectId, 100),
      isLoggedIn && uid ? getUserProjectReview(projectId, uid) : Promise.resolve(null),
    ]).then(([reviews, mine]) => {
      if (!mounted) return
      const count = reviews?.length || 0
      const avg   = count > 0 ? reviews.reduce((a, r) => a + r.rating, 0) / count : 0
      setSummary({ avg, count })
      if (mine) { setMyReview(mine); setRating(mine.rating); setMessage(mine.message || '') }
      setLoading(false)
    }).catch(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [projectId, isLoggedIn, uid])

  const handleGoogleLogin = async () => {
    setSigningIn(true)
    try { await loginWithGoogle() }
    catch { /* user closed popup */ }
    finally { setSigningIn(false) }
  }

  const handleSubmit = async () => {
    if (!rating) { setError('Please select a star rating.'); return }
    if (message.length > 500) { setError('Message must be under 500 characters.'); return }
    setError('')
    setSubmitting(true)
    try {
      await submitProjectReview({ projectId, userId: uid, rating, message })
      setMyReview({ rating, message, created_at: new Date().toISOString() })
      setSuccess(true)
      setSummary(prev => ({
        count: prev.count + (myReview ? 0 : 1),
        avg: myReview
          ? prev.avg  // simplified — in real use, re-fetch
          : (prev.avg * prev.count + rating) / (prev.count + 1),
      }))
    } catch (e) {
      setError(e.message || 'Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--border-color)] p-5 bg-[var(--bg-surface)]">
        <div className="sk h-4 w-32 rounded mb-4" />
        <div className="sk h-10 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-surface)]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-surface-2)]/50">
          <div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <FontAwesomeIcon icon={faStarSolid} className="text-amber-400 text-[10px]" />
              Reviews
            </h3>
            {summary.count > 0 && (
              <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                {summary.avg.toFixed(1)} · {summary.count} review{summary.count !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {summary.count > 0 && (
            <button
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
              <FontAwesomeIcon icon={faChartBar} className="text-[9px]" />
              View all
            </button>
          )}
        </div>

        <div className="p-5">
          {/* Not logged in */}
          {!isLoggedIn ? (
            <div className="text-center py-4">
              <p className="text-xs text-[var(--text-secondary)] mb-3">Sign in to leave a review</p>
              <button
                onClick={handleGoogleLogin}
                disabled={signingIn}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)]
                  border border-[var(--border-color)] hover:border-[var(--border-strong)]
                  text-xs font-bold text-[var(--text-primary)] transition-all disabled:opacity-60">
                <FontAwesomeIcon icon={faGoogle} className="text-[#4285F4]" />
                {signingIn ? 'Signing in…' : 'Sign in with Google'}
              </button>
            </div>
          ) : success || myReview ? (
            /* Already reviewed */
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="w-8 h-8 rounded-full flex-shrink-0 border border-[var(--border-color)]" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">{displayName?.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Your review</span>
                    <Stars rating={rating} />
                  </div>
                  {message && <p className="text-xs text-[var(--text-secondary)]">{message}</p>}
                  <p className="text-[9px] text-[var(--text-tertiary)] mt-1.5">
                    ✓ {success ? 'Review submitted successfully' : 'Already reviewed'} — Thank you!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Review form */
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-[var(--text-tertiary)] mb-2">Your rating</p>
                <StarInput value={rating} onChange={setRating} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-semibold text-[var(--text-tertiary)]">Comment <span className="font-normal">(optional)</span></p>
                  <span className={`text-[9px] font-mono ${message.length > 450 ? 'text-amber-500' : 'text-[var(--text-tertiary)]'}`}>
                    {message.length}/500
                  </span>
                </div>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Share your thoughts about this project…"
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)]
                    focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/15
                    outline-none text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
                    transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-[10px] text-red-500 font-medium">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting || !rating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                  bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white
                  text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                <FontAwesomeIcon icon={faPaperPlane} className="text-[9px]" />
                {submitting ? 'Submitting…' : 'Submit Review'}
              </button>
            </div>
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
