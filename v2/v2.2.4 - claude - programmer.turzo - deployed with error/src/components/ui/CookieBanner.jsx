// CookieBanner.jsx — v2.2.4
// Fully functional: uses localStorage, shows once globally (via Layout.jsx)
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie, faXmark } from '@fortawesome/free-solid-svg-icons'

const KEY = 'mdturzo_cookie_consent_v1'

export default function CookieBanner({ enabled = true }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    try {
      const stored = localStorage.getItem(KEY)
      if (!stored) {
        const t = setTimeout(() => setVisible(true), 1800)
        return () => clearTimeout(t)
      }
    } catch {}
  }, [enabled])

  function accept() {
    try { localStorage.setItem(KEY, 'accepted') } catch {}
    setVisible(false)
  }
  function decline() {
    try { localStorage.setItem(KEY, 'declined') } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-[9990]"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.32, ease: [0.16,1,0.3,1] }}>
          <div className="rounded-2xl p-5 shadow-[var(--shadow-xl)] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FontAwesomeIcon icon={faCookie} className="text-amber-400 text-base" />
              </div>
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
                      text-xs font-semibold hover:bg-[var(--accent-hover)] active:scale-95 transition-all duration-150">
                    Accept all
                  </button>
                  <button onClick={decline}
                    className="px-4 py-1.5 rounded-lg border border-[var(--border-color)]
                      text-xs font-medium text-[var(--text-secondary)]
                      hover:border-[var(--border-strong)] active:scale-95 transition-all duration-150">
                    Decline
                  </button>
                </div>
              </div>
              <button onClick={decline} aria-label="Close"
                className="w-6 h-6 flex items-center justify-center rounded-full text-[var(--text-tertiary)]
                  hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)]
                  transition-colors duration-150 flex-shrink-0 -mt-0.5">
                <FontAwesomeIcon icon={faXmark} className="text-xs" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
