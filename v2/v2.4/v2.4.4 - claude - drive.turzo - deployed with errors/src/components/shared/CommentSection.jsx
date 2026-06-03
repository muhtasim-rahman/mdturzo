// CommentSection.jsx — v2.4.0
// Login + email verified required
// Max 1000 chars, pending approval, 10/day limit
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faUser, faPaperPlane, faTrash, faFlag,
  faLock, faCircleCheck, faInfoCircle, faClock,
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from '../../utils/formatters.js'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import {
  getApprovedComments, submitComment, deleteOwnComment, getCommentRateLimit,
} from '../../services/supabase.js'

const MAX_CHARS = 1000
const MAX_PER_DAY = 10

function Avatar({ user }) {
  if (user?.photo_url) {
    return <img src={user.photo_url} alt={user.display_name} className="w-9 h-9 rounded-full object-cover" />
  }
  const initials = (user?.display_name || user?.username || '?').charAt(0).toUpperCase()
  return (
    <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-sm font-bold text-[var(--accent-primary)] flex-shrink-0">
      {initials}
    </div>
  )
}

function CommentCard({ comment, currentUserId, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const isOwn = currentUserId && comment.user_id === currentUserId
  const user = comment.users

  const handleDelete = async () => {
    if (!confirm('Delete your comment?')) return
    setDeleting(true)
    await onDelete(comment.id)
  }

  return (
    <motion.div
      className="comment-card flex gap-3 py-4 border-b border-[var(--border-color)] last:border-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}>
      <Avatar user={user} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {user?.display_name || user?.username || 'User'}
          </span>
          {user?.username && (
            <span className="text-xs text-[var(--text-tertiary)]">@{user.username}</span>
          )}
          <span className="text-xs text-[var(--text-tertiary)] ml-auto">
            {formatDistanceToNow(comment.created_at)}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed break-words">
          {comment.text}
        </p>
        {isOwn && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="mt-1.5 text-xs text-[var(--text-tertiary)] hover:text-red-400 transition-colors flex items-center gap-1">
            <FontAwesomeIcon icon={faTrash} />
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function CommentSection({ contentType, contentId, contentSlug, className = '' }) {
  const { user } = useAuthStore()
  const { addToast } = useToastStore()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  const load = useCallback(async () => {
    if (!contentId) return
    setLoading(true)
    try {
      const data = await getApprovedComments(contentType, contentId)
      setComments(data || [])
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [contentType, contentId])

  useEffect(() => { load() }, [load])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      addToast({ type: 'info', title: 'Login Required', message: 'Please sign in to comment.' })
      return
    }
    if (!user.emailVerified) {
      addToast({ type: 'warning', title: 'Email Verification Required', message: 'Please verify your email to comment.' })
      return
    }
    const trimmed = text.trim()
    if (!trimmed) return
    if (trimmed.length > MAX_CHARS) return

    // Check daily rate limit
    const count = await getCommentRateLimit(user.uid, contentId, 24 * 60)
    if (count >= MAX_PER_DAY) {
      setRateLimited(true)
      addToast({ type: 'warning', title: 'Limit Reached', message: `You can post max ${MAX_PER_DAY} comments per day on this content.` })
      return
    }

    setSubmitting(true)
    try {
      await submitComment({
        contentType, contentId, contentSlug,
        userId: user.uid,
        text: trimmed,
      })
      setText('')
      addToast({ type: 'success', title: 'Comment Submitted', message: 'Your comment is pending review and will appear soon.' })
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not submit comment. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await deleteOwnComment(commentId, user.uid)
      setComments(c => c.filter(x => x.id !== commentId))
      addToast({ type: 'success', title: 'Deleted', message: 'Comment deleted.' })
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete comment.' })
    }
  }

  const remaining = MAX_CHARS - text.length
  const isNearLimit = remaining < 100

  return (
    <section className={`comment-section ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
          <FontAwesomeIcon icon={faComment} className="text-[var(--accent-primary)] text-sm" />
        </div>
        <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
          Comments
          {!loading && <span className="text-[var(--text-tertiary)] font-normal text-base ml-2">({comments.length})</span>}
        </h3>
      </div>

      {/* Write comment */}
      <div className="cs-form bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 mb-6">
        {!user ? (
          <div className="flex items-center gap-3 py-2">
            <FontAwesomeIcon icon={faLock} className="text-[var(--text-tertiary)]" />
            <p className="text-sm text-[var(--text-secondary)]">
              <Link to="/login" className="text-[var(--accent-primary)] hover:underline font-medium">Sign in</Link>
              {' '}to join the conversation.
            </p>
          </div>
        ) : !user.emailVerified ? (
          <div className="flex items-center gap-3 py-2">
            <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-400" />
            <p className="text-sm text-[var(--text-secondary)]">
              Please verify your email to comment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-sm font-bold text-[var(--accent-primary)] flex-shrink-0 mt-0.5">
                {user.displayName?.charAt(0)?.toUpperCase() || <FontAwesomeIcon icon={faUser} />}
              </div>
              <div className="flex-1">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  disabled={submitting || rateLimited}
                  maxLength={MAX_CHARS}
                  rows={3}
                  placeholder="Share your thoughts..."
                  className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] outline-none text-sm text-[var(--text-primary)] resize-none transition-colors placeholder:text-[var(--text-tertiary)]" />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-[var(--text-tertiary)] text-xs" />
                    <span className="text-xs text-[var(--text-tertiary)]">Comments are reviewed before appearing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {text.length > 0 && (
                      <span className={`text-xs ${isNearLimit ? 'text-yellow-400' : 'text-[var(--text-tertiary)]'}`}>
                        {remaining}
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={!text.trim() || submitting || rateLimited}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      <FontAwesomeIcon icon={submitting ? faClock : faPaperPlane} className={submitting ? 'animate-spin' : ''} />
                      {submitting ? 'Submitting…' : 'Comment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Pending notice */}
      {user && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/6 border border-blue-500/15 mb-5 text-xs text-blue-300">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 flex-shrink-0" />
          <span>All comments are manually reviewed before appearing. Approved comments show here.</span>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-3 py-4 border-b border-[var(--border-color)]">
              <div className="sk w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="sk h-4 w-32 rounded" />
                <div className="sk h-3 w-full rounded" />
                <div className="sk h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10">
          <FontAwesomeIcon icon={faComment} className="text-3xl text-[var(--text-tertiary)] mb-3 block" />
          <p className="text-[var(--text-secondary)] text-sm">No comments yet. Be the first!</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {comments.map(c => (
            <CommentCard
              key={c.id}
              comment={c}
              currentUserId={user?.uid}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      )}
    </section>
  )
}
