// CookieBanner.jsx — v2.2.5
// - Fully functional: localStorage key 'mdturzo_cookie_consent'
// - Shows only on '/' and '/home' routes
// - Never re-shows after user accepts or declines
// - enabled prop from site_settings.cookieBanner controls master toggle
// - checkedRef prevents async flicker when enabled loads after mount

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie, faXmark } from '@fortawesome/free-solid-svg-icons'

const STORAGE_KEY = 'mdturzo_cookie_consent'
const HOME_PATHS  = ['/', '/home']

export default function CookieBanner({ enabled = true }) {
  const location   = useLocation()
  const [visible, setVisible] = useState(false)
  const checkedRef = useRef(false)

  useEffect(() => {
    // Only run once, even if enabled changes asynchronously
    if (checkedRef.current) return
    if (!enabled) return
    if (!HOME_PATHS.includes(location.pathname)) return

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      checkedRef.current = true
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
    // Already answered — never show again
    checkedRef.current = true
  }, [enabled, location.pathname])

  // Always hide (and stay hidden) on non-home pages
  if (!HOME_PATHS.includes(location.pathname)) return null

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }
  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-[200]"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
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
