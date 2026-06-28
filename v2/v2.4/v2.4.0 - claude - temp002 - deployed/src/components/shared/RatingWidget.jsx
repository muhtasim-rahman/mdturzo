// RatingWidget.jsx — v2.4.0
// 5-star rating widget. Shows distribution on hover, animates on select.
// Auth-gated: redirects to /login?redirect=...#rating if not logged in.

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { upsertProjectRating } from '../../services/supabase.js'
import { useToastStore } from '../../store/toastStore.js'
import { useNavigate, useLocation } from 'react-router-dom'

const LABELS = ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Excellent']

export default function RatingWidget({
  projectId,
  initialAvg       = 0,
  initialCount     = 0,
  userRating       = null,
  enabled          = true,
  distribution     = null, // { 1: n, 2: n, ... } optional
}) {
  const user      = useAuthStore(s => s.user)
  const addToast  = useToastStore(s => s.add)
  const navigate  = useNavigate()
  const location  = useLocation()

  const [hover,    setHover]    = useState(0)
  const [selected, setSelected] = useState(userRating)
  const [avg,      setAvg]      = useState(parseFloat(initialAvg) || 0)
  const [count,    setCount]    = useState(initialCount)
  const [loading,  setLoading]  = useState(false)
  const [showDist, setShowDist] = useState(false)

  const handleRate = useCallback(async (star) => {
    if (!enabled) return
    if (!user) {
      const returnUrl = encodeURIComponent(location.pathname + '#rating')
      navigate(`/login?redirect=${returnUrl}`)
      return
    }
    if (loading || star === selected) return

    const prev = { selected, avg, count }
    // Optimistic update
    const newCount = selected ? count : count + 1
    const newSum   = selected
      ? (avg * count - selected + star)
      : (avg * count + star)
    const newAvg   = parseFloat((newSum / newCount).toFixed(2))
    setSelected(star); setAvg(newAvg); setCount(newCount)
    setLoading(true)

    try {
      await upsertProjectRating(projectId, user.uid, star)
      addToast(`You rated this ${star} ${star === 1 ? 'star' : 'stars'}`, 'success')
    } catch {
      setSelected(prev.selected); setAvg(prev.avg); setCount(prev.count)
      addToast('Could not save rating. Try again.', 'error')
    } finally {
      setLoading(false)
    }
  }, [enabled, user, loading, selected, avg, count, projectId, navigate, location, addToast])

  if (!enabled) return null

  const displayStar = hover || selected || 0
  const maxDist     = distribution ? Math.max(...Object.values(distribution), 1) : 1

  return (
    <div className="rw-wrap" id="rating">
      <div className="rw-header">
        <span className="rw-label">Rate this project</span>
        {count > 0 && (
          <button
            className="rw-dist-toggle"
            onClick={() => setShowDist(p => !p)}
            title="View rating breakdown"
          >
            {avg.toFixed(1)} · {count} {count === 1 ? 'rating' : 'ratings'}
          </button>
        )}
      </div>

      {/* Stars row */}
      <div
        className="rw-stars"
        onMouseLeave={() => setHover(0)}
        role="group"
        aria-label="Rate 1 to 5 stars"
      >
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`rw-star ${star <= displayStar ? 'rw-star--filled' : ''}`}
            onMouseEnter={() => { if (!loading) setHover(star) }}
            onClick={() => handleRate(star)}
            disabled={!enabled || loading}
            aria-label={`Rate ${star} stars`}
            title={LABELS[star]}
          >
            <motion.span
              animate={{
                scale: star <= displayStar ? 1.15 : 1,
                rotate: star <= displayStar && hover === star ? [0, -15, 15, 0] : 0,
              }}
              transition={{ duration: 0.2, ease: 'backOut' }}
            >
              <FontAwesomeIcon
                icon={star <= displayStar ? faStarSolid : faStarReg}
              />
            </motion.span>
          </button>
        ))}
        <AnimatePresence>
          {hover > 0 && (
            <motion.span
              key={hover}
              className="rw-hover-label"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {LABELS[hover]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Your rating badge */}
      {selected && (
        <div className="rw-yours">
          <FontAwesomeIcon icon={faStarSolid} style={{ color: '#f59e0b', fontSize: '.75rem' }}/>
          Your rating: <strong>{selected}</strong>
          <span className="rw-change" onClick={() => !loading && setSelected(null)}>(change)</span>
        </div>
      )}

      {/* Distribution bars */}
      <AnimatePresence>
        {showDist && distribution && (
          <motion.div
            className="rw-dist"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {[5,4,3,2,1].map(s => (
              <div key={s} className="rw-dist-row">
                <span className="rw-dist-label">{s}</span>
                <FontAwesomeIcon icon={faStarSolid} className="rw-dist-star"/>
                <div className="rw-dist-bar-track">
                  <motion.div
                    className="rw-dist-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((distribution[s] || 0) / maxDist) * 100}%` }}
                    transition={{ duration: 0.4, delay: (5 - s) * 0.05 }}
                  />
                </div>
                <span className="rw-dist-count">{distribution[s] || 0}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!user && (
        <div className="rw-login-hint">
          <button
            onClick={() => navigate(`/login?redirect=${encodeURIComponent(location.pathname + '#rating')}`)}
          >
            Sign in to rate
          </button>
        </div>
      )}

      <style>{`
        .rw-wrap { display: flex; flex-direction: column; gap: .5rem; }
        .rw-header { display: flex; align-items: center; justify-content: space-between; }
        .rw-label { font-size: .8rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .5px; }
        .rw-dist-toggle {
          font-size: .78rem; color: var(--text-accent);
          background: transparent; border: none; cursor: pointer; padding: 0;
          transition: opacity var(--transition-fast);
        }
        .rw-dist-toggle:hover { opacity: .75; }

        .rw-stars { display: flex; align-items: center; gap: 2px; }
        .rw-star {
          background: none; border: none; cursor: pointer;
          font-size: 1.6rem; color: var(--border-strong);
          padding: 3px; line-height: 1;
          transition: color var(--transition-fast);
        }
        .rw-star:disabled { cursor: not-allowed; }
        .rw-star--filled { color: #f59e0b; }

        .rw-hover-label {
          margin-left: .5rem;
          font-size: .8rem; font-weight: 600;
          color: #f59e0b;
        }
        .rw-yours {
          display: flex; align-items: center; gap: .3rem;
          font-size: .78rem; color: var(--text-tertiary);
        }
        .rw-yours strong { color: var(--text-primary); }
        .rw-change {
          color: var(--text-accent); cursor: pointer; font-size: .75rem;
          transition: opacity var(--transition-fast);
        }
        .rw-change:hover { opacity: .7; }

        .rw-dist { overflow: hidden; }
        .rw-dist-row { display: flex; align-items: center; gap: 6px; margin: 3px 0; }
        .rw-dist-label { font-size: .75rem; color: var(--text-tertiary); width: 8px; text-align: right; flex-shrink: 0; }
        .rw-dist-star { color: #f59e0b; font-size: .65rem; flex-shrink: 0; }
        .rw-dist-bar-track { flex: 1; height: 6px; background: var(--bg-surface-3); border-radius: 99px; overflow: hidden; }
        .rw-dist-bar-fill { height: 100%; background: #f59e0b; border-radius: 99px; }
        .rw-dist-count { font-size: .72rem; color: var(--text-tertiary); width: 22px; flex-shrink: 0; }

        .rw-login-hint { margin-top: .25rem; }
        .rw-login-hint button {
          font-size: .8rem; color: var(--text-accent);
          background: transparent; border: none; cursor: pointer; padding: 0;
          text-decoration: underline; transition: opacity var(--transition-fast);
        }
        .rw-login-hint button:hover { opacity: .7; }
      `}</style>
    </div>
  )
}
