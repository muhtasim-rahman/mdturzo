// LikeDislike.jsx — v2.4.0
// Login required to vote. Click same vote removes it.
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg } from '@fortawesome/free-regular-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { getLikeStats, getUserLikeStatus, toggleLike } from '../../services/supabase.js'

export default function LikeDislike({ contentType, contentId, className = '' }) {
  const { user } = useAuthStore()
  const { addToast } = useToastStore()
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userVote, setUserVote] = useState(null)   // 'like' | 'dislike' | null
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)

  useEffect(() => {
    if (!contentId) return
    let mounted = true
    setLoading(true)

    Promise.all([
      getLikeStats(contentType, contentId),
      user ? getUserLikeStatus(contentType, contentId, user.uid) : Promise.resolve(null),
    ])
      .then(([stats, vote]) => {
        if (!mounted) return
        setLikes(stats.likes)
        setDislikes(stats.dislikes)
        setUserVote(vote)
        setLoading(false)
      })
      .catch(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [contentType, contentId, user])

  const handleVote = async (type) => {
    if (!user) {
      addToast({ type: 'info', title: 'Login Required', message: 'Please sign in to like or dislike.' })
      return
    }
    if (voting) return
    setVoting(true)

    const prev = userVote
    // Optimistic update
    setUserVote(prev === type ? null : type)
    if (type === 'like') {
      setLikes(l => prev === 'like' ? l - 1 : l + 1)
      if (prev === 'dislike') setDislikes(d => d - 1)
    } else {
      setDislikes(d => prev === 'dislike' ? d - 1 : d + 1)
      if (prev === 'like') setLikes(l => l - 1)
    }

    try {
      await toggleLike(contentType, contentId, user.uid, type)
    } catch (err) {
      // Revert on error
      setUserVote(prev)
      if (type === 'like') {
        setLikes(l => prev === 'like' ? l + 1 : l - 1)
        if (prev === 'dislike') setDislikes(d => d + 1)
      } else {
        setDislikes(d => prev === 'dislike' ? d + 1 : d - 1)
        if (prev === 'like') setLikes(l => l + 1)
      }
      addToast({ type: 'error', title: 'Error', message: 'Could not register vote.' })
    } finally {
      setVoting(false)
    }
  }

  const total = likes + dislikes
  const likePercent = total > 0 ? Math.round((likes / total) * 100) : 50

  return (
    <div className={`like-dislike flex items-center gap-2 ${className}`}>
      {/* Like */}
      <motion.button
        onClick={() => handleVote('like')}
        disabled={loading || voting}
        whileTap={!loading && !voting ? { scale: 0.88 } : {}}
        className={`ld-btn flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
          userVote === 'like'
            ? 'bg-green-500/15 border-green-500/50 text-green-400'
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-green-500/40 hover:text-green-400 hover:bg-green-500/8'
        } disabled:opacity-60 disabled:cursor-not-allowed`}>
        <FontAwesomeIcon icon={userVote === 'like' ? faThumbsUp : faThumbsUpReg} />
        <AnimatePresence mode="wait">
          <motion.span
            key={likes}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}>
            {loading ? '...' : likes}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Ratio bar */}
      {total > 0 && (
        <div className="ld-bar relative w-16 h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden hidden sm:block">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-green-400"
            initial={{ width: '50%' }}
            animate={{ width: `${likePercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Dislike */}
      <motion.button
        onClick={() => handleVote('dislike')}
        disabled={loading || voting}
        whileTap={!loading && !voting ? { scale: 0.88 } : {}}
        className={`ld-btn flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
          userVote === 'dislike'
            ? 'bg-red-500/15 border-red-500/50 text-red-400'
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/8'
        } disabled:opacity-60 disabled:cursor-not-allowed`}>
        <FontAwesomeIcon icon={userVote === 'dislike' ? faThumbsDown : faThumbsDownReg} />
        <AnimatePresence mode="wait">
          <motion.span
            key={dislikes}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}>
            {loading ? '...' : dislikes}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
