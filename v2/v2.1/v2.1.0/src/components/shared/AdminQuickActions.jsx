// ============================================================
// ADMIN QUICK ACTIONS — v2.1.0 Full Implementation
// Floating FAB bottom-right, visible only to admins
// Expands to show quick navigation to admin tasks
// ============================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faXmark,
  faPenNib, faCode, faPlay, faBell,
  faFlag, faEye,
} from '@fortawesome/free-solid-svg-icons'
import { useAdmin } from '../../hooks/useAdmin.js'

const ACTIONS = [
  { label: 'Add Blog',          icon: faPenNib,  tab: 'blogs',         color: '#8b5cf6' },
  { label: 'Add Project',       icon: faCode,    tab: 'projects',      color: '#3b82f6' },
  { label: 'Add Post',          icon: faPlay,    tab: 'posts',         color: '#ef4444' },
  { label: 'Add Notification',  icon: faBell,    tab: 'notifications', color: '#f59e0b' },
  { label: 'View Reports',      icon: faFlag,    tab: 'reports',       color: '#ec4899' },
  { label: 'Page Visibility',   icon: faEye,     tab: 'visibility',    color: '#22c55e' },
]

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
  exit:    { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, x: 20, scale: 0.8 },
  visible: { opacity: 1, x: 0,  scale: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } },
  exit:    { opacity: 0, x: 20, scale: 0.8, transition: { duration: 0.15 } },
}

export function AdminQuickActions() {
  const { isAdmin } = useAdmin()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!isAdmin) return null

  return (
    <div className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col items-end gap-2 pointer-events-none">

      {/* Action items */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={containerVariants}
            initial="hidden" animate="visible" exit="exit"
            className="flex flex-col items-end gap-2 pointer-events-auto"
          >
            {ACTIONS.map((action) => (
              <motion.button
                key={action.tab}
                variants={itemVariants}
                onClick={() => { navigate(`/admin/${action.tab}`); setOpen(false) }}
                className="flex items-center gap-2.5 pr-3.5 pl-2.5 py-2 rounded-full shadow-[var(--shadow-lg)] border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] transition-colors"
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: action.color + '22' }}>
                  <FontAwesomeIcon icon={action.icon} style={{ color: action.color }} className="text-xs" />
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB toggle */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white shadow-[0_4px_20px_rgba(59,130,246,0.5)] hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center"
        aria-label="Admin quick actions"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x"
              initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
              <FontAwesomeIcon icon={faXmark} className="text-lg" />
            </motion.span>
          ) : (
            <motion.span key="shield"
              initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }}>
              <FontAwesomeIcon icon={faShieldHalved} className="text-base" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
