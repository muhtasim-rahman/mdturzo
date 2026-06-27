// CookieBanner.jsx — v2.2.5
// Task 3: Fully functional cookie banner.
//   - Only shows on '/' and '/home' — controlled by pathname prop
//   - localStorage key: mdturzo_cookie_consent ('accepted' | 'declined')
//   - checkedRef prevents async flicker when enabled loads after mount
//   - Accept/Decline both save to localStorage immediately and hide forever
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie, faXmark } from '@fortawesome/free-solid-svg-icons'

const KEY = 'mdturzo_cookie_consent'
const HOME_PATHS = ['/', '/home']

export default function CookieBanner({ enabled = true, pathname = '/' }) {
  const [visible, setVisible] = useState(false)
  // checkedRef: once we've made the show/no-show decision, don't re-evaluate
  // even if `enabled` prop changes asynchronously (async Supabase settings load)
  const checkedRef = useRef(false)

  useEffect(() => {
    // Only show on home routes
    if (!HOME_PATHS.includes(pathname)) return
    // Don't re-evaluate if already decided
    if (checkedRef.current) return
    // If enabled is still undefined (loading), wait
    if (enabled === undefined) return

    checkedRef.current = true

    if (!enabled) return

    const stored = localStorage.getItem(KEY)
    if (!stored) {
      // First visit — show after brief delay
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
    // Already answered — never show again
  }, [enabled, pathname])

  function accept() {
    localStorage.setItem(KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-[200]"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}>
          <div className="card p-5 shadow-[var(--shadow-xl)] border border-[var(--border-strong)]">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCookie}
                className="text-amber-400 text-xl flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--text-primary)] mb-1">We use cookies</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  This site uses cookies for analytics and to improve your experience.{' '}
                  <Link to="/cookies-policy" className="text-[var(--accent-primary)] hover:underline">
                    Learn more
                  </Link>
                </p>
                <div className="flex gap-2 mt-3">
                  <button onClick={accept}
                    className="px-4 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white
                      text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors duration-200">
                    Accept
                  </button>
                  <button onClick={decline}
                    className="px-4 py-1.5 rounded-lg border border-[var(--border-color)]
                      text-xs font-medium text-[var(--text-secondary)]
                      hover:border-[var(--border-strong)] transition-colors duration-200">
                    Decline
                  </button>
                </div>
              </div>
              <button onClick={decline} aria-label="Close"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]
                  transition-colors duration-150 flex-shrink-0 -mt-0.5">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
