// ============================================================
// CommentSection.jsx — v2.4.0
// Shows approved comments + submission form.
// Auth-aware: prompts login if not authenticated.
// Per master prompt: max 10 comments/day per user,
//   comment_auto_approve from site_settings.
// ============================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments, faUser, faPaperPlane, faSpinner,
  faCircleExclamation, faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import { Link }  from 'react-router-dom'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { getApprovedComments, submitComment } from '../../services/supabase.js'
import { SkeletonText, SkeletonCircle } from '../ui/Skeleton.jsx'
import { formatRelativeTime } from '../../utils/formatters.js'

// ── Single Comment ────────────────────────────────────────────
function CommentItem({ comment, index }) {
  const name    = comment.users?.display_name || comment.users?.username || 'Anonymous'
  const avatar  = comment.users?.photo_url
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <motion.div className="cmt-item"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}>
      {/* Avatar */}
      <div className="cmt-avatar">
        {avatar
          ? <img src={avatar} alt={name} className="cmt-avatar-img"/>
          : <span className="cmt-avatar-initials">{initials}</span>
        }
      </div>
      <div className="cmt-body">
        <div className="cmt-header">
          <span className="cmt-name">{name}</span>
          <span className="cmt-time">{formatRelativeTime(comment.created_at)}</span>
        </div>
        <p className="cmt-text">{comment.text}</p>
      </div>
    </motion.div>
  )
}

// ── Comment Skeleton ──────────────────────────────────────────
function CommentSkeleton() {
  return (
    <div className="cmt-item">
      <SkeletonCircle size={38}/>
      <div className="cmt-body" style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
          <div className="sk" style={{ height: 12, width: 80, borderRadius: 6 }}/>
          <div className="sk" style={{ height: 12, width: 60, borderRadius: 6 }}/>
        </div>
        <SkeletonText lines={2}/>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function CommentSection({ contentType, contentId, contentSlug, initialCount = 0 }) {
  const { user }   = useAuthStore()
  const { push }   = useToastStore()

  const [comments,  setComments]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [text,      setText]      = useState('')
  const [sending,   setSending]   = useState(false)
  const [charCount, setCharCount] = useState(0)

  const MAX_CHARS = 1000

  useEffect(() => {
    if (!contentId) return
    setLoading(true)
    getApprovedComments(contentType, contentId)
      .then(data => setComments(data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [contentType, contentId])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return
    if (!text.trim() || text.length > MAX_CHARS) return

    setSending(true)
    try {
      await submitComment({
        contentType, contentId, contentSlug,
        userId: user.uid, text: text.trim(),
      })
      setText('')
      setCharCount(0)
      push({ type: 'success', title: 'Comment submitted', message: 'Your comment is pending review and will appear shortly.' })
    } catch (err) {
      const msg = err?.message?.includes('rate') ? 'Too many comments. Please try again later.' : 'Failed to submit comment.'
      push({ type: 'error', title: 'Error', message: msg })
    } finally {
      setSending(false)
    }
  }

  function handleTextChange(e) {
    const val = e.target.value
    if (val.length <= MAX_CHARS) {
      setText(val)
      setCharCount(val.length)
    }
  }

  return (
    <section className="cmt-section" id="comments">
      <div className="cmt-header-row">
        <h2 className="cmt-section-title">
          <FontAwesomeIcon icon={faComments}/>
          Comments
          {comments.length > 0 && <span className="cmt-count-badge">{comments.length}</span>}
        </h2>
      </div>

      {/* Submission form */}
      <div className="cmt-form-wrap">
        {user ? (
          <form onSubmit={handleSubmit} className="cmt-form">
            <div className="cmt-form-avatar">
              {user.photoURL
                ? <img src={user.photoURL} alt="You" className="cmt-avatar-img"/>
                : <FontAwesomeIcon icon={faUser} style={{ color: 'var(--text-tertiary)', fontSize: '1rem' }}/>
              }
            </div>
            <div className="cmt-form-right">
              <textarea
                className="cmt-textarea"
                value={text}
                onChange={handleTextChange}
                placeholder="Share your thoughts..."
                rows={3}
                maxLength={MAX_CHARS}
                disabled={sending}
                required/>
              <div className="cmt-form-footer">
                <span className={`cmt-char-count ${charCount > MAX_CHARS * 0.9 ? 'cmt-char-warn' : ''}`}>
                  {charCount}/{MAX_CHARS}
                </span>
                <motion.button
                  type="submit"
                  className="cmt-submit-btn"
                  disabled={!text.trim() || sending}
                  whileTap={{ scale: 0.96 }}>
                  {sending
                    ? <FontAwesomeIcon icon={faSpinner} spin/>
                    : <><FontAwesomeIcon icon={faPaperPlane}/> Post comment</>
                  }
                </motion.button>
              </div>
            </div>
          </form>
        ) : (
          <div className="cmt-login-prompt">
            <FontAwesomeIcon icon={faArrowRightToBracket} style={{ fontSize: '1.25rem', color: 'var(--accent-primary)' }}/>
            <div>
              <p className="cmt-login-title">Join the conversation</p>
              <p className="cmt-login-sub">
                <Link to="/login" className="cmt-login-link">Log in</Link>
                {' '}or{' '}
                <Link to="/signup" className="cmt-login-link">sign up</Link>
                {' '}to leave a comment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Comments list */}
      <div className="cmt-list">
        {loading ? (
          [0, 1, 2].map(i => <CommentSkeleton key={i}/>)
        ) : comments.length > 0 ? (
          <AnimatePresence>
            {comments.map((c, i) => <CommentItem key={c.id} comment={c} index={i}/>)}
          </AnimatePresence>
        ) : (
          <div className="cmt-empty">
            <FontAwesomeIcon icon={faComments} style={{ fontSize: '2rem', opacity: .3 }}/>
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      <style>{`
        .cmt-section { margin-top: 3rem; }
        .cmt-header-row { margin-bottom: 1.25rem; }
        .cmt-section-title { display: flex; align-items: center; gap: .6rem; font-size: 1.15rem; font-weight: 700; color: var(--text-primary); }
        .cmt-count-badge { font-size: .7rem; padding: .1rem .45rem; border-radius: 999px; background: var(--accent-light); color: var(--accent-primary); font-weight: 700; }

        .cmt-form-wrap { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 14px; padding: 1rem; margin-bottom: 1.5rem; }
        .cmt-form { display: flex; gap: .75rem; }
        .cmt-form-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--bg-surface-2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .cmt-avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .cmt-form-right { flex: 1; display: flex; flex-direction: column; gap: .6rem; }
        .cmt-textarea {
          width: 100%; resize: vertical; min-height: 72px;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          border-radius: 10px; padding: .65rem .75rem;
          color: var(--text-primary); font-family: var(--font-body); font-size: .875rem;
          line-height: 1.5; outline: none; transition: border-color .18s;
        }
        .cmt-textarea:focus { border-color: var(--accent-primary); }
        .cmt-textarea::placeholder { color: var(--text-tertiary); }
        .cmt-form-footer { display: flex; justify-content: space-between; align-items: center; }
        .cmt-char-count { font-size: .72rem; color: var(--text-tertiary); }
        .cmt-char-warn { color: var(--clr-warning); }
        .cmt-submit-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .45rem 1rem; border-radius: 8px;
          background: var(--accent-primary); color: #fff;
          font-size: .8rem; font-weight: 600; border: none; cursor: pointer;
          transition: all .18s;
        }
        .cmt-submit-btn:hover { background: var(--accent-hover); }
        .cmt-submit-btn:disabled { opacity: .5; cursor: not-allowed; }

        .cmt-login-prompt { display: flex; align-items: center; gap: .75rem; }
        .cmt-login-title { font-size: .875rem; font-weight: 700; color: var(--text-primary); margin-bottom: .2rem; }
        .cmt-login-sub { font-size: .8rem; color: var(--text-secondary); }
        .cmt-login-link { color: var(--accent-primary); font-weight: 600; text-decoration: none; }
        .cmt-login-link:hover { text-decoration: underline; }

        .cmt-list { display: flex; flex-direction: column; gap: .85rem; }
        .cmt-item { display: flex; gap: .75rem; }
        .cmt-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--bg-surface-2); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .cmt-avatar-initials { font-size: .7rem; font-weight: 700; color: var(--accent-primary); }
        .cmt-body { flex: 1; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: .7rem .9rem; }
        .cmt-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: .4rem; flex-wrap: wrap; gap: .25rem; }
        .cmt-name { font-size: .8rem; font-weight: 700; color: var(--text-primary); }
        .cmt-time { font-size: .72rem; color: var(--text-tertiary); }
        .cmt-text { font-size: .85rem; color: var(--text-secondary); line-height: 1.6; white-space: pre-wrap; word-break: break-word; }

        .cmt-empty { display: flex; flex-direction: column; align-items: center; gap: .75rem; padding: 2.5rem; text-align: center; color: var(--text-tertiary); font-size: .875rem; border: 1px dashed var(--border-color); border-radius: 14px; }
      `}</style>
    </section>
  )
}
