// ============================================================
// CommentSection — v2.4.0
// Full comment system: list + submit form
// Login + email verified required
// 10 comments/day per user limit
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments, faPaperPlane, faUser, faLock,
  faEnvelope, faExclamationTriangle, faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { useAuthStore }  from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import {
  getApprovedComments,
  submitComment,
  checkCommentRateLimit,
} from '../../services/supabase.js'
import { formatDistanceToNow } from '../../utils/formatters.js'

const PAGE_SIZE = 5

function Avatar({ user, size = 36 }) {
  if (user?.photo_url) {
    return (
      <img
        src={user.photo_url}
        alt={user.display_name || 'User'}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }
  const initials = (user?.display_name || user?.username || '?')[0].toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'var(--accent-primary)', color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.38,
    }}>
      {initials}
    </div>
  )
}

function CommentItem({ comment, i }) {
  return (
    <motion.div
      className="cmt-item"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: i * 0.04 }}
    >
      <Avatar user={comment.users} size={36} />
      <div className="cmt-item-body">
        <div className="cmt-item-meta">
          <span className="cmt-name">
            {comment.users?.display_name || comment.users?.username || 'Anonymous'}
          </span>
          {comment.users?.username && (
            <span className="cmt-handle">@{comment.users.username}</span>
          )}
          <span className="cmt-time">
            {formatDistanceToNow(comment.created_at)}
          </span>
        </div>
        <p className="cmt-text">{comment.text}</p>
      </div>
    </motion.div>
  )
}

export function CommentSection({ contentType, contentId, contentSlug }) {
  const user     = useAuthStore(s => s.user)
  const authLoading = useAuthStore(s => s.loading)
  const addToast = useToastStore(s => s.add)

  const [comments,  setComments ] = useState([])
  const [loading,   setLoading  ] = useState(true)
  const [text,      setText     ] = useState('')
  const [submitting,setSubmitting] = useState(false)
  const [showAll,   setShowAll  ] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    if (!contentId) return
    let cancelled = false
    async function load() {
      try {
        const data = await getApprovedComments(contentType, contentId)
        if (!cancelled) setComments(data)
      } catch { /* silent */ }
      finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [contentType, contentId])

  const handleSubmit = async () => {
    if (!user) {
      addToast({ type: 'info', title: 'Login required', message: 'Sign in to leave a comment.' }); return
    }
    if (!user.emailVerified) {
      addToast({ type: 'warning', title: 'Verify email', message: 'Please verify your email address to comment.' }); return
    }
    const trimmed = text.trim()
    if (!trimmed) { addToast({ type: 'warning', title: 'Empty', message: 'Write something first.' }); return }
    if (trimmed.length > 1000) { addToast({ type: 'warning', title: 'Too long', message: 'Max 1000 characters.' }); return }

    setSubmitting(true)
    try {
      // Rate limit check
      const limited = await checkCommentRateLimit(user.uid)
      if (limited) {
        addToast({ type: 'warning', title: 'Slow down', message: 'You\'ve reached the 10 comments/day limit. Please wait.' })
        setSubmitting(false); return
      }

      await submitComment({
        contentType,
        contentId,
        contentSlug,
        userId: user.uid,
        text: trimmed,
      })
      setText('')
      addToast({
        type: 'success',
        title: 'Comment submitted',
        message: 'Your comment is pending review and will appear once approved.',
      })
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'Could not submit comment.' })
    } finally {
      setSubmitting(false)
    }
  }

  const visibleComments = showAll ? comments : comments.slice(0, PAGE_SIZE)

  return (
    <section className="cmt-section">
      <div className="cmt-header">
        <FontAwesomeIcon icon={faComments} />
        <h3 className="cmt-title">
          Comments
          {!loading && <span className="cmt-count">{comments.length}</span>}
        </h3>
      </div>

      {/* Submit form */}
      <div className="cmt-form-wrap">
        {authLoading ? null : user ? (
          <div className="cmt-form">
            <Avatar user={{ photo_url: user.photoURL, display_name: user.displayName }} size={36} />
            <div className="cmt-form-right">
              <textarea
                ref={textRef}
                className="cmt-textarea"
                rows={3}
                maxLength={1000}
                placeholder={
                  !user.emailVerified
                    ? 'Please verify your email to comment...'
                    : 'Write a comment...'
                }
                value={text}
                onChange={e => setText(e.target.value)}
                disabled={!user.emailVerified || submitting}
              />
              <div className="cmt-form-footer">
                {!user.emailVerified && (
                  <span className="cmt-verify-note">
                    <FontAwesomeIcon icon={faEnvelope} /> Verify email to comment
                  </span>
                )}
                <span className="cmt-chars">{text.length}/1000</span>
                <button
                  className="cmt-submit-btn"
                  onClick={handleSubmit}
                  disabled={submitting || !user.emailVerified || !text.trim()}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  {submitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cmt-auth-prompt">
            <FontAwesomeIcon icon={faLock} />
            <span>
              <Link to="/login" className="cmt-auth-link">Sign in</Link>
              {' '}to leave a comment
            </span>
          </div>
        )}
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="cmt-loading">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="cmt-skeleton" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="sk" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="sk" style={{ width: '40%', height: 12, borderRadius: 4 }} />
                <div className="sk" style={{ width: '90%', height: 12, borderRadius: 4 }} />
                <div className="sk" style={{ width: '70%', height: 12, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="cmt-empty">
          <FontAwesomeIcon icon={faComments} className="cmt-empty-icon" />
          <p>No comments yet. Be the first!</p>
        </div>
      ) : (
        <>
          <div className="cmt-list">
            <AnimatePresence>
              {visibleComments.map((c, i) => (
                <CommentItem key={c.id} comment={c} i={i} />
              ))}
            </AnimatePresence>
          </div>

          {comments.length > PAGE_SIZE && !showAll && (
            <button className="cmt-show-more" onClick={() => setShowAll(true)}>
              <FontAwesomeIcon icon={faChevronDown} />
              Show {comments.length - PAGE_SIZE} more comments
            </button>
          )}
        </>
      )}

      <style>{`
        .cmt-section {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }
        .cmt-header {
          display: flex; align-items: center; gap: .6rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          font-size: 1rem;
        }
        .cmt-title {
          font-size: 1.1rem; font-weight: 700;
          display: flex; align-items: center; gap: .5rem;
          margin: 0;
        }
        .cmt-count {
          font-size: .78rem; font-weight: 600;
          padding: .15rem .5rem; border-radius: 20px;
          background: var(--bg-surface-2);
          color: var(--text-secondary);
        }

        /* Form */
        .cmt-form-wrap { margin-bottom: 1.5rem; }
        .cmt-form {
          display: flex; gap: .75rem; align-items: flex-start;
        }
        .cmt-form-right { flex: 1; display: flex; flex-direction: column; gap: .4rem; }
        .cmt-textarea {
          width: 100%; padding: .6rem .75rem;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: .85rem; resize: vertical; outline: none;
          font-family: var(--font-body); transition: border-color .15s;
          min-height: 76px;
        }
        .cmt-textarea:focus { border-color: var(--accent-primary); }
        .cmt-textarea:disabled { opacity: .6; cursor: not-allowed; }
        .cmt-form-footer {
          display: flex; align-items: center; gap: .5rem; flex-wrap: wrap;
        }
        .cmt-verify-note {
          flex: 1; font-size: .72rem; color: var(--clr-warning);
          display: flex; align-items: center; gap: .3rem;
        }
        .cmt-chars {
          font-size: .72rem; color: var(--text-tertiary); margin-left: auto;
        }
        .cmt-submit-btn {
          display: flex; align-items: center; gap: .4rem;
          padding: .45rem 1rem; border-radius: 8px;
          background: var(--accent-primary); border: none;
          color: white; font-size: .8rem; font-weight: 700;
          cursor: pointer; transition: background .12s;
        }
        .cmt-submit-btn:hover:not(:disabled) { background: var(--clr-primary-600); }
        .cmt-submit-btn:disabled { opacity: .5; cursor: not-allowed; }

        .cmt-auth-prompt {
          display: flex; align-items: center; gap: .6rem;
          padding: .75rem 1rem; border-radius: 10px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          color: var(--text-secondary); font-size: .85rem;
        }
        .cmt-auth-link {
          color: var(--accent-primary); font-weight: 600; text-decoration: none;
        }
        .cmt-auth-link:hover { text-decoration: underline; }

        /* List */
        .cmt-list { display: flex; flex-direction: column; gap: 1rem; }
        .cmt-item {
          display: flex; gap: .75rem; align-items: flex-start;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .cmt-item:last-child { border-bottom: none; padding-bottom: 0; }
        .cmt-item-body { flex: 1; }
        .cmt-item-meta {
          display: flex; align-items: center; flex-wrap: wrap; gap: .35rem;
          margin-bottom: .3rem;
        }
        .cmt-name { font-size: .85rem; font-weight: 700; color: var(--text-primary); }
        .cmt-handle { font-size: .75rem; color: var(--text-tertiary); }
        .cmt-time { font-size: .72rem; color: var(--text-tertiary); margin-left: auto; }
        .cmt-text { font-size: .85rem; color: var(--text-secondary); line-height: 1.6; white-space: pre-wrap; word-break: break-word; margin: 0; }

        /* Loading */
        .cmt-loading { display: flex; flex-direction: column; gap: 1rem; }
        .cmt-skeleton { display: flex; gap: .75rem; align-items: flex-start; }

        /* Empty */
        .cmt-empty {
          text-align: center; padding: 2rem 1rem;
          color: var(--text-tertiary); font-size: .9rem;
        }
        .cmt-empty-icon { font-size: 2rem; margin-bottom: .5rem; display: block; opacity: .3; }

        /* Show more */
        .cmt-show-more {
          display: flex; align-items: center; justify-content: center; gap: .4rem;
          width: 100%; padding: .65rem 1rem; margin-top: 1rem;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          border-radius: 10px; cursor: pointer;
          color: var(--text-secondary); font-size: .8rem; font-weight: 600;
          transition: all .15s;
        }
        .cmt-show-more:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
      `}</style>
    </section>
  )
}
