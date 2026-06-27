// ============================================================
// DevBanner.jsx — v2.3.6 (new)
// A thin, neutral info strip above the Navbar. Minimal by design --
// no amber/danger colors, just --bg-surface / --border-color /
// --accent-primary so it fits both themes without standing out.
//
// Content is admin-configurable via `site_settings` (so the message
// and progress % can be updated later from an admin panel without a
// redeploy) but ALWAYS has a safe hardcoded fallback if that fetch
// fails or the keys don't exist yet -- this banner must never break.
//
//   site_settings keys (all optional):
//     dev_banner_enabled   boolean  (default: true)
//     dev_banner_text      string   (default: see FALLBACK_TEXT)
//     dev_banner_progress  number 0-100 | null (default: null -- hidden)
//
// Dismiss is stored in localStorage for 3 days (`devbanner_closed_until`).
// ============================================================

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getSiteSettings } from '../../services/supabase.js'

const FALLBACK_TEXT = 'This site is under active development — some features may be incomplete or change without notice.'
const DISMISS_KEY = 'devbanner_closed_until'
const DISMISS_DAYS = 3

function isDismissed() {
  try {
    const until = localStorage.getItem(DISMISS_KEY)
    return until && Date.now() < Number(until)
  } catch { return false }
}

export function DevBanner() {
  const [cfg, setCfg] = useState({ enabled: true, text: FALLBACK_TEXT, progress: null })
  const [closed, setClosed] = useState(isDismissed)

  useEffect(() => {
    getSiteSettings()
      .then(raw => {
        const parse = v => { if (typeof v === 'string') { try { return JSON.parse(v) } catch { return v } } return v }
        const enabled  = parse(raw.dev_banner_enabled)
        const text     = parse(raw.dev_banner_text)
        const progress = parse(raw.dev_banner_progress)
        setCfg({
          enabled: enabled ?? true,
          text: text || FALLBACK_TEXT,
          progress: typeof progress === 'number' ? progress : null,
        })
      })
      .catch(() => { /* keep hardcoded fallback -- banner never breaks */ })
  }, [])

  const handleClose = () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DAYS * 86400000)) } catch {}
    setClosed(true)
  }

  const visible = cfg.enabled && !closed

  return (
    <div className="devb-wrap">
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            key="devbanner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .3, ease: [.16, 1, .3, 1] }}
          >
            <div className="devb-inner">
              <FontAwesomeIcon icon={faCircleInfo} className="devb-icon" />
              <p className="devb-text">{cfg.text}</p>

              {cfg.progress != null && (
                <div className="devb-pill">
                  <div className="devb-pill-track">
                    <div className="devb-pill-fill" style={{ width: `${cfg.progress}%` }} />
                  </div>
                  <span className="devb-pill-pct">{cfg.progress}%</span>
                </div>
              )}

              <button onClick={handleClose} className="devb-close" aria-label="Dismiss for 3 days" type="button">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .devb-wrap { overflow: hidden; background: var(--bg-surface); }
        .devb-wrap:has(.devb-inner) { border-bottom: 1px solid var(--border-color); }
        .devb-inner {
          display: flex; align-items: center; gap: .65rem;
          max-width: 1120px; margin: 0 auto;
          padding: .5rem clamp(1rem, 4vw, 1.75rem);
          font-size: .78rem;
        }
        .devb-icon { color: var(--accent-primary); flex-shrink: 0; font-size: .85rem; }
        .devb-text { color: var(--text-secondary); flex: 1; min-width: 0; line-height: 1.4; }
        .devb-pill { display: flex; align-items: center; gap: .4rem; flex-shrink: 0; }
        .devb-pill-track { width: 64px; height: 4px; border-radius: 99px; background: var(--bg-surface-3); overflow: hidden; }
        .devb-pill-fill { height: 100%; border-radius: 99px; background: var(--accent-primary); }
        .devb-pill-pct { font-size: .68rem; font-weight: 600; color: var(--text-tertiary); }
        .devb-close {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-tertiary);
          transition: background .15s, color .15s;
        }
        .devb-close:hover { background: var(--bg-surface-2); color: var(--text-primary); }
        @media (max-width: 540px) {
          .devb-pill { display: none; }
          .devb-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        }
      `}</style>
    </div>
  )
}

export default DevBanner
