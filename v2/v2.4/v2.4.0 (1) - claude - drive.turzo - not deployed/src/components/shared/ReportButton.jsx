// ============================================================
// ReportButton — v2.4.0
// Report content modal with reason select.
// ============================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { submitReport } from '../../services/supabase.js'

const REASONS = [
  'Inappropriate content',
  'Spam or misleading',
  'Copyright violation',
  'Broken links / outdated info',
  'Other',
]

export function ReportButton({ contentType, contentId }) {
  const user      = useAuthStore(s => s.user)
  const addToast  = useToastStore(s => s.add)

  const [open,    setOpen   ] = useState(false)
  const [reason,  setReason ] = useState('')
  const [desc,    setDesc   ] = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone   ] = useState(false)

  const handleSubmit = async () => {
    if (!user) {
      addToast({ type: 'info', title: 'Login required', message: 'Sign in to report content.' })
      setOpen(false); return
    }
    if (!reason) {
      addToast({ type: 'warning', title: 'Select a reason', message: 'Please choose a reason for reporting.' })
      return
    }
    setLoading(true)
    try {
      await submitReport({
        contentType,
        contentId,
        reporterId: user.uid,
        reason,
        description: desc.trim(),
      })
      setDone(true)
      addToast({ type: 'success', title: 'Report submitted', message: 'Thank you for helping keep the site clean.' })
      setTimeout(() => { setOpen(false); setDone(false); setReason(''); setDesc('') }, 1500)
    } catch (err) {
      addToast({ type: 'error', title: 'Failed', message: err.message || 'Could not submit report.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className="rpt-trigger"
        onClick={() => {
          if (!user) {
            addToast({ type: 'info', title: 'Login required', message: 'Sign in to report content.' })
            return
          }
          setOpen(true)
        }}
        title="Report this project"
      >
        <FontAwesomeIcon icon={faFlag} />
        <span>Report</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="rpt-overlay" onClick={() => setOpen(false)}>
            <motion.div
              className="rpt-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.22 }}
            >
              <div className="rpt-modal-header">
                <span><FontAwesomeIcon icon={faFlag} style={{ color: '#ef4444' }} /> Report Content</span>
                <button className="rpt-close" onClick={() => setOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {done ? (
                <div className="rpt-done">
                  <p>Report submitted. We'll review it shortly.</p>
                </div>
              ) : (
                <div className="rpt-body">
                  <label className="rpt-label">Reason *</label>
                  <div className="rpt-reasons">
                    {REASONS.map(r => (
                      <button
                        key={r}
                        className={`rpt-reason-chip ${reason === r ? 'rpt-reason-active' : ''}`}
                        onClick={() => setReason(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <label className="rpt-label" style={{ marginTop: '1rem' }}>
                    Additional details (optional)
                  </label>
                  <textarea
                    className="rpt-textarea"
                    rows={3}
                    maxLength={300}
                    placeholder="Describe the issue..."
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                  />
                  <span className="rpt-chars">{desc.length}/300</span>

                  <button
                    className="rpt-submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={loading ? faFlag : faPaperPlane} />
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .rpt-trigger {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .45rem .9rem; border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-tertiary);
          font-size: .8rem; font-weight: 600;
          cursor: pointer; transition: all .15s;
        }
        .rpt-trigger:hover {
          border-color: rgba(239,68,68,.4);
          color: #ef4444;
        }

        .rpt-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.6); backdrop-filter: blur(4px);
          z-index: var(--z-modal);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .rpt-modal {
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 16px;
          width: 100%; max-width: 400px;
          box-shadow: 0 24px 64px rgba(0,0,0,.4);
          overflow: hidden;
        }
        .rpt-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.25rem .75rem;
          border-bottom: 1px solid var(--border-color);
          font-size: .9rem; font-weight: 700; color: var(--text-primary);
        }
        .rpt-close {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--bg-surface-2); border: none;
          color: var(--text-secondary); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; transition: background .12s;
        }
        .rpt-close:hover { background: var(--bg-surface-3); }
        .rpt-body { padding: 1rem 1.25rem 1.25rem; }
        .rpt-done { padding: 2rem 1.25rem; text-align: center; color: var(--clr-success); font-weight: 600; }

        .rpt-label {
          display: block; font-size: .78rem; font-weight: 600;
          color: var(--text-secondary); margin-bottom: .5rem;
        }
        .rpt-reasons { display: flex; flex-wrap: wrap; gap: .4rem; }
        .rpt-reason-chip {
          padding: .35rem .75rem; border-radius: 20px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary);
          font-size: .75rem; cursor: pointer; transition: all .12s;
        }
        .rpt-reason-chip:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .rpt-reason-active {
          background: rgba(59,130,246,.12);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .rpt-textarea {
          width: 100%; padding: .6rem .75rem;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          border-radius: 8px; color: var(--text-primary);
          font-size: .82rem; resize: vertical;
          outline: none; transition: border-color .15s;
          font-family: var(--font-body);
        }
        .rpt-textarea:focus { border-color: var(--accent-primary); }
        .rpt-chars {
          display: block; text-align: right;
          font-size: .7rem; color: var(--text-tertiary); margin-bottom: .75rem;
        }
        .rpt-submit {
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          width: 100%; padding: .6rem 1rem;
          border-radius: 8px;
          background: #ef4444; border: none;
          color: white; font-size: .85rem; font-weight: 700;
          cursor: pointer; transition: background .15s;
        }
        .rpt-submit:hover:not(:disabled) { background: #dc2626; }
        .rpt-submit:disabled { opacity: .6; cursor: default; }
      `}</style>
    </>
  )
}
