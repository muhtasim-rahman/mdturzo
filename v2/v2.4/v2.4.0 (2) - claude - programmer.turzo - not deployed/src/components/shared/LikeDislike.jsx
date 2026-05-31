// ============================================================
// LikeDislike.jsx — v2.4.0
// Shared like/dislike widget for projects, blogs, posts.
// Auth-aware: shows login prompt if not authenticated.
// Counts are read from Supabase; interactions update optimistically.
// ============================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg } from '@fortawesome/free-regular-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { getUserLikeStatus, toggleLike } from '../../services/supabase.js'

export default function LikeDislike({ contentType, contentId, initialLikes = 0, initialDislikes = 0, size = 'md' }) {
  const { user }   = useAuthStore()
  const { push }   = useToastStore()

  const [likes,    setLikes]    = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userVote, setUserVote] = useState(null) // 'like' | 'dislike' | null
  const [loading,  setLoading]  = useState(false)

  // Load user's current vote
  useEffect(() => {
    if (!user?.uid || !contentId) return
    getUserLikeStatus(contentType, contentId, user.uid)
      .then(type => setUserVote(type))
      .catch(() => {})
  }, [user?.uid, contentType, contentId])

  async function handleVote(type) {
    if (!user) {
      push({ type: 'info', title: 'Login required', message: 'Please log in to like or dislike.' })
      return
    }
    if (loading) return
    setLoading(true)

    // Optimistic update
    const prev = userVote
    if (prev === type) {
      // Remove vote
      setUserVote(null)
      if (type === 'like') setLikes(l => l - 1)
      else setDislikes(d => d - 1)
    } else {
      // Add or switch vote
      setUserVote(type)
      if (prev === 'like') setLikes(l => l - 1)
      if (prev === 'dislike') setDislikes(d => d - 1)
      if (type === 'like') setLikes(l => l + 1)
      else setDislikes(d => d + 1)
    }

    try {
      await toggleLike(contentType, contentId, user.uid, type)
    } catch {
      // Rollback on error
      setUserVote(prev)
      setLikes(initialLikes)
      setDislikes(initialDislikes)
      push({ type: 'error', title: 'Error', message: 'Could not save your vote.' })
    } finally {
      setLoading(false)
    }
  }

  const isLg = size === 'lg'

  return (
    <div className={`ld-wrap ${isLg ? 'ld-lg' : 'ld-md'}`}>
      <motion.button
        className={`ld-btn ld-like ${userVote === 'like' ? 'ld-active' : ''}`}
        onClick={() => handleVote('like')}
        whileTap={{ scale: 0.9 }}
        disabled={loading}
        aria-label="Like">
        <FontAwesomeIcon icon={userVote === 'like' ? faThumbsUp : faThumbsUpReg}/>
        <AnimatePresence mode="popLayout">
          <motion.span key={likes}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}>
            {likes}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <motion.button
        className={`ld-btn ld-dislike ${userVote === 'dislike' ? 'ld-active-dis' : ''}`}
        onClick={() => handleVote('dislike')}
        whileTap={{ scale: 0.9 }}
        disabled={loading}
        aria-label="Dislike">
        <FontAwesomeIcon icon={userVote === 'dislike' ? faThumbsDown : faThumbsDownReg}/>
        <AnimatePresence mode="popLayout">
          <motion.span key={dislikes}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}>
            {dislikes}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <style>{`
        .ld-wrap { display: flex; align-items: center; gap: .5rem; }
        .ld-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .4rem .75rem; border-radius: 9999px;
          border: 1px solid var(--border-strong);
          background: var(--bg-surface-2);
          color: var(--text-secondary);
          font-size: .8rem; font-weight: 600;
          transition: all .18s ease; cursor: pointer;
        }
        .ld-lg .ld-btn { padding: .55rem 1rem; font-size: .875rem; gap: .5rem; }
        .ld-btn:hover { border-color: var(--accent-primary); color: var(--text-primary); background: var(--accent-light); }
        .ld-btn:disabled { opacity: .6; cursor: not-allowed; }
        .ld-like.ld-active { background: rgba(34,197,94,.12); border-color: rgba(34,197,94,.35); color: #22c55e; }
        .ld-dislike.ld-active-dis { background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.28); color: #ef4444; }
      `}</style>
    </div>
  )
}
