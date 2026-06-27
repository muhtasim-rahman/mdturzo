// ReportButton.jsx — v2.4.0
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { submitReport } from '../../services/supabase.js'

const REASONS = [
  'Inappropriate content',
  'Spam or misleading',
  'Offensive language',
  'Copyright violation',
  'Misinformation',
  'Other',
]

export default function ReportButton({ contentType, contentId, className = '', compact = false }) {
  const { user } = useAuthStore()
  const { addToast } = useToastStore()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleOpen = () => {
    if (!user) {
      addToast({ type: 'info', title: 'Login Required', message: 'Please sign in to report content.' })
      return
    }
    setOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reason) { addToast({ type: 'warning', title: 'Select a reason', message: '' }); return }
    setSubmitting(true)
    try {
      await submitReport({
        contentType, contentId,
        reporterId: user.uid,
        reason,
        description: description.trim(),
      })
      setSubmitted(true)
      setTimeout(() => { setOpen(false); setSubmitted(false); setReason(''); setDescription('') }, 1800)
      addToast({ type: 'success', title: 'Reported', message: 'Thank you for reporting. We will review it.' })
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not submit report. Try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[var(--text-tertiary)] hover:text-red-400 hover:bg-red-400/8 border border-[var(--border-color)] hover:border-red-400/30 transition-all ${className}`}
        title="Report">
        <FontAwesomeIcon icon={faFlag} className="text-xs" />
        {!compact && <span>Report</span>}
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />
            <motion.div
              className="relative bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl shadow-2xl p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2 }}>

              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">Report Content</h3>
                  <p className="text-sm text-[var(--text-tertiary)] mt-0.5">Help us keep the community safe</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1 transition-colors">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-3">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-green-400 text-lg" />
                  </div>
                  <p className="text-[var(--text-primary)] font-semibold">Report Submitted</p>
                  <p className="text-sm text-[var(--text-tertiary)] mt-1">Thank you for keeping our community safe.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Reason *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {REASONS.map(r => (
                        <button
                          key={r} type="button"
                          onClick={() => setReason(r)}
                          className={`text-sm px-3 py-2 rounded-lg border text-left transition-all ${
                            reason === r
                              ? 'bg-red-500/15 border-red-500/50 text-red-400'
                              : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                          }`}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Additional details (optional)</label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      maxLength={300}
                      rows={3}
                      placeholder="Provide more context..."
                      className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] outline-none text-sm text-[var(--text-primary)] resize-none transition-colors placeholder:text-[var(--text-tertiary)]" />
                  </div>
                  <button
                    type="submit"
                    disabled={!reason || submitting}
                    className="w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
