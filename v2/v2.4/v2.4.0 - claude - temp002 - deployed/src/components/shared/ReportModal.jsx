// ReportModal.jsx — v2.4.0
// Report dialog: 6 reason options + details textarea.
// Used for projects (and future: feed items, comments).

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faXmark, faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { submitReport } from '../../services/supabase.js'
import { useToastStore } from '../../store/toastStore.js'

const REASONS = [
  { id: 'spam',        label: 'Spam or misleading' },
  { id: 'harmful',     label: 'Harmful or dangerous content' },
  { id: 'copyright',   label: 'Copyright infringement' },
  { id: 'hate',        label: 'Hate speech or discrimination' },
  { id: 'privacy',     label: 'Privacy violation' },
  { id: 'other',       label: 'Other reason' },
]

export default function ReportModal({ isOpen, onClose, contentType = 'project', contentId }) {
  const user    = useAuthStore(s => s.user)
  const addToast = useToastStore(s => s.add)

  const [reason,  setReason]  = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const reset = () => { setReason(''); setDetails(''); setDone(false) }

  const handleClose = () => { reset(); onClose() }

  const handleSubmit = async () => {
    if (!reason) return
    setLoading(true)
    try {
      await submitReport({
        contentType,
        contentId,
        userId: user?.uid || null,
        reason,
        details: details.trim() || null,
      })
      setDone(true)
      setTimeout(handleClose, 2200)
    } catch {
      addToast('Could not submit report. Try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="rm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            className="rm-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="rm-header">
              <div className="rm-header-left">
                <div className="rm-icon"><FontAwesomeIcon icon={faFlag}/></div>
                <div>
                  <div className="rm-title">Report content</div>
                  <div className="rm-sub">Your report is anonymous</div>
                </div>
              </div>
              <button className="rm-close" onClick={handleClose} aria-label="Close">
                <FontAwesomeIcon icon={faXmark}/>
              </button>
            </div>

            {done ? (
              <div className="rm-done">
                <FontAwesomeIcon icon={faCircleCheck} className="rm-done-icon"/>
                <div className="rm-done-title">Report submitted</div>
                <div className="rm-done-sub">We'll review it within 24 hours. Thank you.</div>
              </div>
            ) : (
              <div className="rm-body">
                {/* Reason options */}
                <div className="rm-label">What's the issue?</div>
                <div className="rm-reasons">
                  {REASONS.map(r => (
                    <label key={r.id} className={`rm-reason ${reason === r.id ? 'rm-reason--selected' : ''}`}>
                      <input
                        type="radio"
                        name="report-reason"
                        value={r.id}
                        checked={reason === r.id}
                        onChange={() => setReason(r.id)}
                        className="rm-radio"
                      />
                      <span className="rm-reason-dot"/>
                      {r.label}
                    </label>
                  ))}
                </div>

                {/* Details */}
                <div className="rm-label" style={{ marginTop: '1rem' }}>
                  Additional details <span className="rm-optional">(optional)</span>
                </div>
                <textarea
                  className="rm-textarea"
                  placeholder="Describe what you noticed..."
                  maxLength={300}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  rows={3}
                />
                <div className="rm-char">{details.length}/300</div>

                {!user && (
                  <div className="rm-anon-note">
                    <FontAwesomeIcon icon={faTriangleExclamation}/>
                    You're reporting as a guest — logged-in reports are prioritized.
                  </div>
                )}

                {/* Actions */}
                <div className="rm-actions">
                  <button className="rm-btn rm-btn--cancel" onClick={handleClose}>Cancel</button>
                  <button
                    className="rm-btn rm-btn--submit"
                    onClick={handleSubmit}
                    disabled={!reason || loading}
                  >
                    {loading ? 'Submitting…' : 'Submit report'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <style>{`
            .rm-backdrop {
              position: fixed; inset: 0; z-index: 600;
              background: rgba(0,0,0,.65);
              backdrop-filter: blur(4px);
              display: flex; align-items: center; justify-content: center;
              padding: 1rem;
            }
            .rm-dialog {
              background: var(--bg-surface);
              border: 1px solid var(--border-color);
              border-radius: 16px;
              width: 100%; max-width: 420px;
              overflow: hidden;
            }
            .rm-header {
              display: flex; align-items: center; justify-content: space-between;
              padding: 1.25rem 1.25rem 1rem;
              border-bottom: 1px solid var(--border-color);
            }
            .rm-header-left { display: flex; align-items: center; gap: .75rem; }
            .rm-icon {
              width: 36px; height: 36px; border-radius: 10px;
              background: rgba(239,68,68,.12);
              color: #ef4444;
              display: flex; align-items: center; justify-content: center;
              font-size: 15px; flex-shrink: 0;
            }
            .rm-title { font-size: .95rem; font-weight: 600; color: var(--text-primary); }
            .rm-sub   { font-size: .75rem; color: var(--text-tertiary); margin-top: 1px; }
            .rm-close {
              width: 32px; height: 32px; border-radius: 8px;
              border: 1px solid var(--border-color);
              background: transparent; color: var(--text-tertiary);
              display: flex; align-items: center; justify-content: center;
              cursor: pointer; transition: all var(--transition-fast);
            }
            .rm-close:hover { background: var(--bg-surface-2); color: var(--text-primary); }

            .rm-body { padding: 1.25rem; }
            .rm-label { font-size: .8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: .5rem; letter-spacing:.4px; text-transform:uppercase; }
            .rm-optional { font-weight: 400; text-transform: none; color: var(--text-tertiary); letter-spacing:0; }
            .rm-reasons { display: flex; flex-direction: column; gap: 6px; }
            .rm-reason {
              display: flex; align-items: center; gap: .6rem;
              padding: .55rem .75rem;
              border-radius: 9px;
              border: 1px solid var(--border-color);
              background: transparent;
              cursor: pointer;
              font-size: .875rem; color: var(--text-secondary);
              transition: all var(--transition-fast);
            }
            .rm-reason:hover { background: var(--bg-surface-2); color: var(--text-primary); border-color: var(--border-strong); }
            .rm-reason--selected {
              background: rgba(239,68,68,.07);
              border-color: rgba(239,68,68,.45);
              color: var(--text-primary);
            }
            .rm-radio { display: none; }
            .rm-reason-dot {
              width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
              border: 1.5px solid var(--border-strong);
              transition: all var(--transition-fast);
            }
            .rm-reason--selected .rm-reason-dot {
              border-color: #ef4444;
              background: #ef4444;
              box-shadow: 0 0 0 3px rgba(239,68,68,.15);
            }
            .rm-textarea {
              width: 100%;
              background: var(--bg-surface-2);
              border: 1px solid var(--border-color);
              border-radius: 10px;
              padding: .65rem .8rem;
              font-size: .875rem;
              color: var(--text-primary);
              font-family: var(--font-body);
              resize: none; outline: none;
              transition: border-color var(--transition-fast);
              margin-bottom: 4px;
            }
            .rm-textarea:focus { border-color: var(--accent-primary); }
            .rm-char { font-size: .72rem; color: var(--text-tertiary); text-align: right; margin-bottom: .75rem; }
            .rm-anon-note {
              display: flex; align-items: center; gap: .5rem;
              font-size: .8rem; color: var(--text-tertiary);
              background: var(--bg-surface-2);
              border-radius: 8px; padding: .5rem .75rem;
              margin-bottom: .75rem;
            }
            .rm-actions { display: flex; gap: 8px; justify-content: flex-end; }
            .rm-btn {
              padding: .5rem 1rem; border-radius: 8px;
              font-size: .875rem; font-weight: 600;
              cursor: pointer; transition: all var(--transition-fast);
              border: 1px solid;
            }
            .rm-btn--cancel {
              background: transparent;
              border-color: var(--border-color);
              color: var(--text-secondary);
            }
            .rm-btn--cancel:hover { background: var(--bg-surface-2); }
            .rm-btn--submit {
              background: #ef4444;
              border-color: #ef4444;
              color: #fff;
            }
            .rm-btn--submit:hover:not(:disabled) { background: #dc2626; }
            .rm-btn--submit:disabled { opacity: .5; cursor: not-allowed; }
            .rm-done {
              padding: 2.5rem 1.25rem;
              text-align: center;
            }
            .rm-done-icon { font-size: 2.5rem; color: #22c55e; margin-bottom: .75rem; }
            .rm-done-title { font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
            .rm-done-sub { font-size: .85rem; color: var(--text-tertiary); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
