// ============================================================
// TOAST CONTAINER — v2.1.3
// Compact glass design, bottom-right, max 3, 3sec default
// ============================================================

import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle, faExclamationCircle,
  faExclamationTriangle, faInfoCircle, faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useToastStore } from '../../store/toastStore.js'

const CFG = {
  success: { icon: faCheckCircle,       accent: '#22c55e', glow: 'rgba(34,197,94,0.18)'   },
  error:   { icon: faExclamationCircle, accent: '#ef4444', glow: 'rgba(239,68,68,0.18)'   },
  warning: { icon: faExclamationTriangle,accent:'#f59e0b', glow: 'rgba(245,158,11,0.18)'  },
  info:    { icon: faInfoCircle,        accent: '#3b82f6', glow: 'rgba(59,130,246,0.18)'  },
}

function ToastItem({ t }) {
  const { removeToast } = useToastStore()
  const cfg = CFG[t.type] || CFG.info

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.93 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: 12, scale: 0.93, transition: { duration: 0.16 } }}
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      className="tc-item"
      style={{ '--tc-accent': cfg.accent, '--tc-glow': cfg.glow }}
    >
      {/* glass shell */}
      <div className="tc-shell">
        {/* left accent bar */}
        <span className="tc-bar" />

        {/* icon */}
        <span className="tc-icon">
          <FontAwesomeIcon icon={cfg.icon} />
        </span>

        {/* text */}
        <div className="tc-body">
          {t.title   && <p className="tc-title">{t.title}</p>}
          {t.message && <p className="tc-msg">{t.message}</p>}
        </div>

        {/* close */}
        <button className="tc-close" onClick={() => removeToast(t.id)} aria-label="Dismiss">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* progress bar */}
      {t.duration && (
        <motion.div className="tc-progress"
          initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
          transition={{ duration: t.duration / 1000, ease: 'linear' }}
          style={{ background: cfg.accent }}
        />
      )}

      <style>{`
        .tc-item {
          position: relative;
          width: 300px;
          pointer-events: all;
          filter: drop-shadow(0 4px 16px var(--tc-glow));
        }
        .tc-shell {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px 10px 14px;
          border-radius: 14px;
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.1);
          border-left: 3px solid var(--tc-accent);
          box-shadow: 0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07);
          overflow: hidden;
        }
        [data-theme="light"] .tc-shell {
          background: rgba(255,255,255,0.82);
          border-color: rgba(226,232,240,0.9);
          border-left-color: var(--tc-accent);
          box-shadow: 0 2px 14px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .tc-bar { display: none; } /* handled by border-left on shell */
        .tc-icon {
          font-size: 14px;
          color: var(--tc-accent);
          flex-shrink: 0;
          line-height: 1;
        }
        .tc-body { flex: 1; min-width: 0; }
        .tc-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary, #f8fafc);
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        [data-theme="light"] .tc-title { color: #0f172a; }
        .tc-msg {
          font-size: 11.5px;
          color: var(--text-secondary, #94a3b8);
          margin-top: 1px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        [data-theme="light"] .tc-msg { color: #475569; }
        .tc-close {
          flex-shrink: 0;
          width: 22px; height: 22px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          color: var(--text-tertiary, #64748b);
          background: transparent;
          border: none; cursor: pointer;
          transition: color .15s, background .15s;
        }
        .tc-close:hover { color: var(--text-primary, #f8fafc); background: rgba(255,255,255,0.08); }
        [data-theme="light"] .tc-close:hover { background: rgba(0,0,0,0.06); color: #0f172a; }
        .tc-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 100%;
          transform-origin: left;
          border-radius: 0 0 14px 14px;
          opacity: 0.7;
        }
      `}</style>
    </motion.div>
  )
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  return (
    <>
      <div
        id="toast-container"
        aria-live="polite" aria-atomic="false"
        style={{
          position: 'fixed', bottom: 20, right: 20,
          zIndex: 'var(--z-toast)',
          display: 'flex', flexDirection: 'column-reverse', gap: 8,
          pointerEvents: 'none',
          maxWidth: 300,
        }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => <ToastItem key={t.id} t={t} />)}
        </AnimatePresence>
      </div>
    </>
  )
}