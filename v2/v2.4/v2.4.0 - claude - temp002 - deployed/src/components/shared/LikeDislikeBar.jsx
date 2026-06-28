// LikeDislikeBar.jsx — v2.4.0
// Like/Dislike toggle buttons for projects (and future content).
// Optimistic UI: count updates instantly, reverts on error.

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg } from '@fortawesome/free-regular-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { toggleProjectLike } from '../../services/supabase.js'
import { useToastStore } from '../../store/toastStore.js'
import { useNavigate, useLocation } from 'react-router-dom'

export default function LikeDislikeBar({
  contentType = 'project',
  contentId,            // slug
  initialLikes    = 0,
  initialDislikes = 0,
  userReaction    = null, // 'like' | 'dislike' | null
  enabled         = true,
  compact         = false,
}) {
  const user      = useAuthStore(s => s.user)
  const addToast  = useToastStore(s => s.add)
  const navigate  = useNavigate()
  const location  = useLocation()

  const [likes,     setLikes]     = useState(initialLikes)
  const [dislikes,  setDislikes]  = useState(initialDislikes)
  const [reaction,  setReaction]  = useState(userReaction)
  const [loading,   setLoading]   = useState(false)

  const handleToggle = useCallback(async (target) => {
    if (!enabled) return
    if (!user) {
      const returnUrl = encodeURIComponent(location.pathname + '#interactions')
      navigate(`/login?redirect=${returnUrl}`)
      return
    }
    if (loading) return

    // Optimistic update
    const prev = { likes, dislikes, reaction }
    let nextLikes = likes, nextDislikes = dislikes, nextReaction = reaction

    if (reaction === target) {
      // toggle off
      if (target === 'like')    nextLikes    = Math.max(0, likes - 1)
      if (target === 'dislike') nextDislikes = Math.max(0, dislikes - 1)
      nextReaction = null
    } else {
      // add or switch
      if (reaction === 'like')    nextLikes    = Math.max(0, likes - 1)
      if (reaction === 'dislike') nextDislikes = Math.max(0, dislikes - 1)
      if (target === 'like')    nextLikes    = nextLikes + 1
      if (target === 'dislike') nextDislikes = nextDislikes + 1
      nextReaction = target
    }

    setLikes(nextLikes); setDislikes(nextDislikes); setReaction(nextReaction)
    setLoading(true)

    try {
      await toggleProjectLike(contentId, user.uid, target)
    } catch {
      // revert
      setLikes(prev.likes); setDislikes(prev.dislikes); setReaction(prev.reaction)
      addToast('Could not save reaction. Try again.', 'error')
    } finally {
      setLoading(false)
    }
  }, [enabled, user, loading, likes, dislikes, reaction, contentId, navigate, location, addToast])

  if (!enabled) return null

  return (
    <div className={`ldb-wrap ${compact ? 'ldb-wrap--compact' : ''}`}>
      <button
        className={`ldb-btn ldb-like ${reaction === 'like' ? 'ldb-active ldb-like--active' : ''}`}
        onClick={() => handleToggle('like')}
        disabled={loading}
        aria-label={`Like (${likes})`}
        title="Like"
      >
        <motion.span
          key={reaction === 'like' ? 'like-filled' : 'like-outline'}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18, ease: 'backOut' }}
        >
          <FontAwesomeIcon icon={reaction === 'like' ? faThumbsUp : faThumbsUpReg}/>
        </motion.span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={likes}
            className="ldb-count"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {likes > 999 ? `${(likes/1000).toFixed(1)}k` : likes}
          </motion.span>
        </AnimatePresence>
      </button>

      <div className="ldb-divider"/>

      <button
        className={`ldb-btn ldb-dislike ${reaction === 'dislike' ? 'ldb-active ldb-dislike--active' : ''}`}
        onClick={() => handleToggle('dislike')}
        disabled={loading}
        aria-label={`Dislike (${dislikes})`}
        title="Dislike"
      >
        <motion.span
          key={reaction === 'dislike' ? 'dislike-filled' : 'dislike-outline'}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18, ease: 'backOut' }}
        >
          <FontAwesomeIcon icon={reaction === 'dislike' ? faThumbsDown : faThumbsDownReg}/>
        </motion.span>
        {!compact && (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={dislikes}
              className="ldb-count"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {dislikes > 999 ? `${(dislikes/1000).toFixed(1)}k` : dislikes}
            </motion.span>
          </AnimatePresence>
        )}
      </button>

      <style>{`
        .ldb-wrap {
          display: inline-flex; align-items: center;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          overflow: hidden; gap: 0;
        }
        .ldb-btn {
          display: flex; align-items: center; gap: .45rem;
          padding: .5rem .9rem;
          background: transparent; border: none;
          color: var(--text-secondary);
          font-size: .9rem; cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .ldb-btn:hover:not(:disabled) { background: var(--bg-surface-3); color: var(--text-primary); }
        .ldb-btn:disabled { cursor: wait; opacity: .7; }
        .ldb-active { color: var(--text-primary) !important; }
        .ldb-like--active { color: var(--accent-primary) !important; background: var(--accent-light) !important; }
        .ldb-dislike--active { color: #ef4444 !important; background: rgba(239,68,68,.08) !important; }
        .ldb-divider { width: 1px; height: 24px; background: var(--border-color); flex-shrink: 0; }
        .ldb-count { font-size: .82rem; font-weight: 600; }
        .ldb-wrap--compact .ldb-btn { padding: .45rem .75rem; font-size: .85rem; }
      `}</style>
    </div>
  )
}
