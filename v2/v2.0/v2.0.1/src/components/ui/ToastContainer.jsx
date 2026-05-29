// ============================================================
// TOAST CONTAINER — Bottom-right animated toasts
// Uses Framer Motion for slide-in/out
// ============================================================

import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { useToastStore } from '../../store/toastStore.js'

const CONFIG = {
  success: {
    icon:    faCheckCircle,
    color:   'text-emerald-400',
    bg:      'bg-emerald-500/10 border-emerald-500/30',
    bar:     'bg-emerald-400',
  },
  error: {
    icon:    faExclamationCircle,
    color:   'text-red-400',
    bg:      'bg-red-500/10 border-red-500/30',
    bar:     'bg-red-400',
  },
  warning: {
    icon:    faExclamationTriangle,
    color:   'text-amber-400',
    bg:      'bg-amber-500/10 border-amber-500/30',
    bar:     'bg-amber-400',
  },
  info: {
    icon:    faInfoCircle,
    color:   'text-blue-400',
    bg:      'bg-blue-500/10 border-blue-500/30',
    bar:     'bg-blue-400',
  },
}

function ToastItem({ toast }) {
  const { removeToast } = useToastStore()
  const cfg             = CONFIG[toast.type] || CONFIG.info

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0,  scale: 1    }}
      exit={{    opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.15 } }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-md shadow-lg
        pointer-events-auto w-full max-w-sm
        ${cfg.bg}
      `}
    >
      {/* Content */}
      <div className="flex items-start gap-3 p-4">
        <FontAwesomeIcon
          icon={cfg.icon}
          className={`${cfg.color} text-lg flex-shrink-0 mt-0.5`}
        />
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
              {toast.title}
            </p>
          )}
          {toast.message && (
            <p className="text-sm text-[var(--text-secondary)] mt-0.5 leading-snug">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 p-0.5"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xs" />
        </button>
      </div>

      {/* Timer bar — only for auto-dismiss toasts */}
      {toast.duration && (
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 ${cfg.bar}`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div
      id="toast-container"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  )
}
