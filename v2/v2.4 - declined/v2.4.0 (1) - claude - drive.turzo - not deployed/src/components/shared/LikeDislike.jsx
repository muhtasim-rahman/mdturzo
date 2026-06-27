// ============================================================
// LikeDislike — v2.4.0
// Like / Dislike buttons with live count.
// Requires auth. Removes vote on second click (toggle).
// ============================================================

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpR, faThumbsDown as faThumbsDownR } from '@fortawesome/free-regular-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { getLikeStats, getUserVote, toggleLike } from '../../services/supabase.js'

export function LikeDislike({ contentType, contentId }) {
  const user    = useAuthStore(s => s.user)
  const addToast = useToastStore(s => s.add)

  const [stats,   setStats  ] = useState({ likes: 0, dislikes: 0 })
  const [myVote,  setMyVote ] = useState(null)   // 'like' | 'dislike' | null
  const [loading, setLoading] = useState(true)
  const [voting,  setVoting ] = useState(false)

  useEffect(() => {
    if (!contentId) return
    let cancelled = false

    async function load() {
      try {
        const [s, v] = await Promise.all([
          getLikeStats(contentType, contentId),
          user ? getUserVote(contentType, contentId, user.uid) : Promise.resolve(null),
        ])
        if (!cancelled) { setStats(s); setMyVote(v) }
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [contentType, contentId, user])

  const handleVote = async (type) => {
    if (!user) {
      addToast({ type: 'info', title: 'Login required', message: 'Sign in to like or dislike.' })
      return
    }
    if (voting) return
    setVoting(true)

    const prevStats  = stats
    const prevVote   = myVote

    // Optimistic update
    const newVote = myVote === type ? null : type
    const newStats = { ...stats }
    if (prevVote === 'like')     newStats.likes    = Math.max(0, newStats.likes    - 1)
    if (prevVote === 'dislike')  newStats.dislikes = Math.max(0, newStats.dislikes - 1)
    if (newVote  === 'like')     newStats.likes    += 1
    if (newVote  === 'dislike')  newStats.dislikes += 1
    setStats(newStats)
    setMyVote(newVote)

    try {
      const fresh = await toggleLike(contentType, contentId, user.uid, type)
      setStats(fresh)
      setMyVote(myVote === type ? null : type)
    } catch (err) {
      setStats(prevStats)
      setMyVote(prevVote)
      addToast({ type: 'error', title: 'Error', message: err.message || 'Action failed.' })
    } finally {
      setVoting(false)
    }
  }

  if (loading) {
    return (
      <div className="lkd-wrap">
        <div className="lkd-btn sk" style={{ width: 80, height: 36, borderRadius: 8 }} />
        <div className="lkd-btn sk" style={{ width: 80, height: 36, borderRadius: 8 }} />
      </div>
    )
  }

  return (
    <div className="lkd-wrap">
      <button
        className={`lkd-btn ${myVote === 'like' ? 'lkd-active-like' : ''}`}
        onClick={() => handleVote('like')}
        disabled={voting}
        title="Like"
      >
        <FontAwesomeIcon icon={myVote === 'like' ? faThumbsUp : faThumbsUpR} />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={stats.likes}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y:  8 }}
            transition={{ duration: 0.18 }}
            className="lkd-count"
          >
            {stats.likes}
          </motion.span>
        </AnimatePresence>
      </button>

      <button
        className={`lkd-btn ${myVote === 'dislike' ? 'lkd-active-dislike' : ''}`}
        onClick={() => handleVote('dislike')}
        disabled={voting}
        title="Dislike"
      >
        <FontAwesomeIcon icon={myVote === 'dislike' ? faThumbsDown : faThumbsDownR} />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={stats.dislikes}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y:  8 }}
            transition={{ duration: 0.18 }}
            className="lkd-count"
          >
            {stats.dislikes}
          </motion.span>
        </AnimatePresence>
      </button>

      <style>{`
        .lkd-wrap {
          display: flex;
          align-items: center;
          gap: .5rem;
        }
        .lkd-btn {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .45rem .9rem;
          border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary);
          font-size: .82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all .15s;
          user-select: none;
          min-width: 68px;
          justify-content: center;
        }
        .lkd-btn:hover:not(:disabled) {
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }
        .lkd-btn:disabled { opacity: .6; cursor: default; }
        .lkd-active-like {
          background: rgba(34,197,94,.12);
          border-color: rgba(34,197,94,.4);
          color: #22c55e;
        }
        .lkd-active-dislike {
          background: rgba(239,68,68,.12);
          border-color: rgba(239,68,68,.4);
          color: #ef4444;
        }
        .lkd-count {
          display: block;
          min-width: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
