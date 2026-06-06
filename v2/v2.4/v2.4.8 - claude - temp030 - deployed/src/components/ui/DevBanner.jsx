// DevBanner.jsx — v2.4.5
// Minimal "under development" notice above navbar.
// Design: clean, soft, info-style — not danger/warning.
// Dismisses for 3 days via localStorage.
// Separate file — rendered in Layout ABOVE the Navbar wrapper.

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWrench } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'devbanner_closed_until'
const HIDE_DAYS   = 3
const PROGRESS    = 37          // site build progress %

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
      localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_DAYS * 86_400_000))
    } catch {}
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="dev-banner overflow-hidden"
        >
          <div className="dev-banner__inner">
            {/* Icon + text */}
            <div className="dev-banner__body">
              <FontAwesomeIcon icon={faWrench} className="dev-banner__icon" />
              <span className="dev-banner__text">
                <span className="dev-banner__bold">Work in progress</span>
                <span className="dev-banner__sep" />
                <span className="dev-banner__sub">Some pages and features are still being built. Thanks for your patience!</span>
              </span>
            </div>

            {/* Progress pill */}
            <div className="dev-banner__pill" title={`${PROGRESS}% complete`}>
              <span className="dev-banner__pill-track">
                <span className="dev-banner__pill-fill" style={{ width: `${PROGRESS}%` }} />
              </span>
              <span className="dev-banner__pill-label">{PROGRESS}%</span>
            </div>

            {/* Dismiss */}
            <button
              onClick={close}
              className="dev-banner__close"
              aria-label="Dismiss for 3 days"
              title="Dismiss for 3 days"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <style>{`
            .dev-banner {
              background: var(--bg-surface);
              border-bottom: 1px solid var(--border-color);
            }
            [data-theme="dark"] .dev-banner {
              background: rgba(15, 23, 42, 0.95);
              border-bottom-color: rgba(255,255,255,0.06);
            }
            [data-theme="light"] .dev-banner {
              background: #f8fafc;
              border-bottom-color: rgba(0,0,0,0.07);
            }

            .dev-banner__inner {
              max-width: 1120px;
              margin-inline: auto;
              padding-inline: clamp(1rem, 4vw, 1.75rem);
              height: 34px;
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .dev-banner__body {
              flex: 1;
              min-width: 0;
              display: flex;
              align-items: center;
              gap: 7px;
              overflow: hidden;
            }

            .dev-banner__icon {
              font-size: 10px;
              color: var(--accent-primary);
              flex-shrink: 0;
              opacity: 0.75;
            }

            .dev-banner__text {
              display: flex;
              align-items: center;
              gap: 0;
              font-size: 11.5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .dev-banner__bold {
              font-weight: 600;
              color: var(--text-primary);
              font-size: 11.5px;
              flex-shrink: 0;
            }

            .dev-banner__sep {
              display: inline-block;
              width: 1px;
              height: 11px;
              background: var(--border-strong);
              margin: 0 8px;
              flex-shrink: 0;
            }

            .dev-banner__sub {
              color: var(--text-tertiary);
              font-size: 11px;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            /* Progress pill */
            .dev-banner__pill {
              flex-shrink: 0;
              display: flex;
              align-items: center;
              gap: 5px;
              padding: 3px 8px;
              border-radius: 9999px;
              border: 1px solid var(--border-color);
              background: var(--bg-surface-2);
            }

            .dev-banner__pill-track {
              display: block;
              width: 42px;
              height: 4px;
              background: var(--border-strong);
              border-radius: 9999px;
              overflow: hidden;
              flex-shrink: 0;
            }

            .dev-banner__pill-fill {
              display: block;
              height: 100%;
              background: var(--accent-primary);
              border-radius: 9999px;
            }

            .dev-banner__pill-label {
              font-size: 10px;
              font-weight: 600;
              font-family: var(--font-mono);
              color: var(--text-tertiary);
              flex-shrink: 0;
            }

            /* Close button */
            .dev-banner__close {
              flex-shrink: 0;
              width: 22px;
              height: 22px;
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
              color: var(--text-tertiary);
              background: transparent;
              border: none;
              cursor: pointer;
              transition: background 0.15s, color 0.15s;
            }
            .dev-banner__close:hover {
              background: var(--bg-surface-2);
              color: var(--text-secondary);
            }

            /* Hide sub-text on narrow screens */
            @media (max-width: 540px) {
              .dev-banner__sep,
              .dev-banner__sub { display: none; }
              .dev-banner__pill { display: none; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
