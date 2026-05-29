// ============================================================
// ADMIN QUICK ACTIONS — Floating FAB (admin only)
// Fully implemented in v2.10.0. v2.0.0: placeholder stub.
// ============================================================

import { useState }          from 'react'
import { useNavigate }       from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import {
  faBolt, faPlus, faNewspaper, faBriefcase,
  faVideo, faBell, faFlag, faEye, faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { useAdmin } from '../../hooks/useAdmin.js'

const ACTIONS = [
  { icon: faNewspaper, label: 'Add Blog',        path: '/admin/blogs?action=new' },
  { icon: faBriefcase, label: 'Add Project',      path: '/admin/projects?action=new' },
  { icon: faVideo,     label: 'Add Post',         path: '/admin/posts?action=new' },
  { icon: faBell,      label: 'Add Notification', path: '/admin/notifications?action=new' },
  { icon: faFlag,      label: 'View Reports',     path: '/admin/reports' },
  { icon: faEye,       label: 'Page Visibility',  path: '/admin/visibility' },
]

export function AdminQuickActions() {
  const { isAdmin }    = useAdmin()
  const [open, setOpen] = useState(false)
  const navigate       = useNavigate()

  if (!isAdmin) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Action items */}
      <AnimatePresence>
        {open && ACTIONS.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0,  scale: 1   }}
            exit={{    opacity: 0, x: 20, scale: 0.8 }}
            transition={{ delay: i * 0.05, duration: 0.15 }}
            onClick={() => { navigate(action.path); setOpen(false) }}
            className="flex items-center gap-3 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            data-tooltip={action.label}
          >
            <FontAwesomeIcon icon={action.icon} className="w-4 text-[var(--accent)]" />
            {action.label}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* FAB toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-colors glow"
        title="Admin Quick Actions"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <FontAwesomeIcon icon={open ? faTimes : faBolt} />
        </motion.span>
      </motion.button>
    </div>
  )
}
