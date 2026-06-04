// DevBanner.jsx — v2.4.5
// Minimal "under development" notice above the navbar.
// Clean, subtle — not dark/alarming.
// Dismiss for 3 days via localStorage. Relative position (never fixed).

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCode } from '@fortawesome/free-solid-svg-icons'
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
      localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_DAYS * 864e5))
    } catch {}
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden dev-banner-root"
        >
          <div className="dev-banner-inner flex items-center justify-center gap-2 px-4 py-[7px] relative">

            {/* Icon */}
            <FontAwesomeIcon
              icon={faCode}
              className="dev-banner-icon text-[10px] flex-shrink-0"
            />

            {/* Text */}
            <span className="dev-banner-text text-[11px] font-medium tracking-tight">
              Site under active development
            </span>

            {/* Progress pill */}
            <span className="dev-banner-pill hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              <span className="dev-banner-dot w-1 h-1 rounded-full inline-block" />
              {PROGRESS}% complete
            </span>

            {/* Close */}
            <button
              onClick={close}
              title="Dismiss for 3 days"
              className="dev-banner-close absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded flex items-center justify-center transition-all"
              aria-label="Close banner"
            >
              <FontAwesomeIcon icon={faXmark} className="text-[9px]" />
            </button>
          </div>

          {/* Thin progress bar */}
          <div className="dev-banner-bar h-[2px] relative overflow-hidden">
            <div
              className="h-full dev-banner-fill relative overflow-hidden"
              style={{ width: `${PROGRESS}%` }}
            >
              <div className="absolute inset-0 dev-banner-shimmer" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
