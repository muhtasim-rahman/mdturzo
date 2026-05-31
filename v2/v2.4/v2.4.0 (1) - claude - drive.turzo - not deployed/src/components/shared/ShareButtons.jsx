// ============================================================
// ShareButtons — v2.4.0
// Share to social platforms + copy link
// ============================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShareNodes, faLink, faCheck, faXmark
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faXTwitter, faLinkedin, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { useToastStore } from '../../store/toastStore.js'

const PLATFORMS = [
  {
    key: 'facebook',
    icon: faFacebook,
    label: 'Facebook',
    color: '#1877F2',
    url: (u, t) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    key: 'twitter',
    icon: faXTwitter,
    label: 'X / Twitter',
    color: '#000000',
    url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    key: 'linkedin',
    icon: faLinkedin,
    label: 'LinkedIn',
    color: '#0A66C2',
    url: (u, t) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  },
  {
    key: 'whatsapp',
    icon: faWhatsapp,
    label: 'WhatsApp',
    color: '#25D366',
    url: (u, t) => `https://api.whatsapp.com/send?text=${encodeURIComponent(`${t} ${u}`)}`,
  },
  {
    key: 'telegram',
    icon: faTelegram,
    label: 'Telegram',
    color: '#2AABEE',
    url: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
]

export function ShareButtons({ title = '', url = '' }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const addToast = useToastStore(s => s.add)
  const shareUrl = url || window.location.href

  const handlePlatform = (platform) => {
    window.open(platform.url(shareUrl, title), '_blank', 'noopener,noreferrer,width=600,height=450')
    setOpen(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      addToast({ type: 'success', title: 'Copied!', message: 'Link copied to clipboard.' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      addToast({ type: 'error', title: 'Error', message: 'Could not copy link.' })
    }
    setOpen(false)
  }

  return (
    <div className="shr-wrap" style={{ position: 'relative' }}>
      <button
        className="shr-trigger"
        onClick={() => setOpen(p => !p)}
        title="Share"
      >
        <FontAwesomeIcon icon={faShareNodes} />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="shr-backdrop" onClick={() => setOpen(false)} />
            <motion.div
              className="shr-dropdown"
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{    opacity: 0, scale: 0.92, y: 6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="shr-header">
                <span>Share this</span>
                <button className="shr-close" onClick={() => setOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="shr-platforms">
                {PLATFORMS.map(p => (
                  <button
                    key={p.key}
                    className="shr-platform-btn"
                    style={{ '--plc': p.color }}
                    onClick={() => handlePlatform(p)}
                    title={p.label}
                  >
                    <FontAwesomeIcon icon={p.icon} style={{ color: p.color }} />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              <div className="shr-copy-row">
                <span className="shr-url">{shareUrl}</span>
                <button className="shr-copy-btn" onClick={handleCopy}>
                  <FontAwesomeIcon icon={copied ? faCheck : faLink} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .shr-wrap { position: relative; display: inline-block; }

        .shr-trigger {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .5rem 1rem; border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary);
          font-size: .8rem; font-weight: 600;
          cursor: pointer; transition: all .15s;
        }
        .shr-trigger:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .shr-backdrop {
          position: fixed; inset: 0; z-index: 90;
        }
        .shr-dropdown {
          position: absolute; bottom: calc(100% + 8px); right: 0;
          width: 240px;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(0,0,0,.35);
          overflow: hidden;
          z-index: 91;
        }
        .shr-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: .75rem 1rem .5rem;
          font-size: .78rem; font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
        }
        .shr-close {
          width: 22px; height: 22px; border-radius: 6px;
          background: var(--bg-surface-2); border: none;
          color: var(--text-tertiary); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
        }
        .shr-platforms {
          display: flex; flex-direction: column; padding: .5rem .5rem;
          gap: 1px;
        }
        .shr-platform-btn {
          display: flex; align-items: center; gap: .7rem;
          padding: .45rem .6rem; border-radius: 8px;
          border: none; background: transparent;
          color: var(--text-secondary);
          font-size: .8rem; font-weight: 500;
          cursor: pointer; text-align: left;
          transition: background .12s, color .12s;
        }
        .shr-platform-btn:hover {
          background: var(--bg-surface-2);
          color: var(--text-primary);
        }
        .shr-platform-btn svg { width: 15px; flex-shrink: 0; }

        .shr-copy-row {
          display: flex; align-items: center; gap: .5rem;
          padding: .5rem .75rem .75rem;
          border-top: 1px solid var(--border-color);
        }
        .shr-url {
          flex: 1; font-size: .7rem;
          color: var(--text-tertiary);
          white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis;
          background: var(--bg-surface-2);
          padding: .3rem .5rem; border-radius: 6px;
        }
        .shr-copy-btn {
          display: flex; align-items: center; gap: .3rem;
          padding: .3rem .65rem; border-radius: 6px;
          background: var(--accent-primary);
          border: none; color: white;
          font-size: .72rem; font-weight: 600;
          cursor: pointer; flex-shrink: 0;
          transition: background .12s;
        }
        .shr-copy-btn:hover { background: var(--clr-primary-600); }
      `}</style>
    </div>
  )
}
