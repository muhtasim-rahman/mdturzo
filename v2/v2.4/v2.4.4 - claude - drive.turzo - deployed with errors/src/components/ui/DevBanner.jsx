// DevBanner.jsx — v2.4.4
// Yellow "under development" banner above navbar.
// Progress bar at bottom border (37%). Closes for 3 days via localStorage.

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTriangleExclamation, faCode } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'devbanner_closed_until'
const HIDE_DAYS   = 3
const PROGRESS    = 37

export default function DevBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const until = localStorage.getItem(STORAGE_KEY)
      if (!until || Date.now() > Number(until)) setVisible(true)
    } catch { setVisible(true) }
  }, [])

  const close = () => {
    setVisible(false)
    try {
      const until = Date.now() + HIDE_DAYS * 24 * 60 * 60 * 1000
      localStorage.setItem(STORAGE_KEY, String(until))
    } catch {}
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #92400e 0%, #78350f 50%, #92400e 100%)' }}>

          {/* Content */}
          <div className="relative flex items-center justify-center gap-2.5 px-4 py-2 text-amber-100">
            <FontAwesomeIcon icon={faTriangleExclamation}
              className="text-amber-300 text-xs flex-shrink-0 animate-pulse" />

            <div className="text-center leading-snug">
              <span className="text-[11px] sm:text-xs font-bold text-amber-200">
                🚧 This site is currently under active development
              </span>
              <span className="hidden sm:inline text-amber-300/70 mx-2">·</span>
              <span className="block sm:inline text-[10px] text-amber-300/80 font-medium">
                Some features may be incomplete or unstable. Thanks for your patience!
              </span>
            </div>

            <FontAwesomeIcon icon={faCode}
              className="text-amber-400/60 text-xs flex-shrink-0 hidden sm:block" />

            {/* Close */}
            <button
              onClick={close}
              title="Dismiss for 3 days"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-amber-300/70 hover:text-amber-100 hover:bg-amber-900/50 transition-all"
              aria-label="Close banner">
              <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
            </button>
          </div>

          {/* Progress bar at bottom — unique segmented style */}
          <div className="h-[3px] bg-amber-900/60 relative overflow-hidden">
            {/* Filled portion */}
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 relative"
              style={{ width: `${PROGRESS}%` }}>
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
            </div>
            {/* Tick marks */}
            {[25, 50, 75].map(tick => (
              <div
                key={tick}
                className="absolute top-0 bottom-0 w-px bg-amber-900/80"
                style={{ left: `${tick}%` }}
              />
            ))}
            {/* Progress label */}
            <div
              className="absolute top-[-18px] text-[8px] font-bold text-amber-300 -translate-x-1/2 pointer-events-none"
              style={{ left: `${PROGRESS}%` }}>
              {PROGRESS}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
