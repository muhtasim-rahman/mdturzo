// ShareButtons.jsx — v2.4.0
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook, faXTwitter, faLinkedin, faWhatsapp, faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import { faLink, faCheck, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useToastStore } from '../../store/toastStore.js'

const SHARE_PLATFORMS = [
  {
    id: 'facebook', label: 'Facebook', icon: faFacebook, color: '#1877F2',
    getUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'twitter', label: 'X (Twitter)', icon: faXTwitter, color: '#000000',
    getUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'linkedin', label: 'LinkedIn', icon: faLinkedin, color: '#0A66C2',
    getUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'whatsapp', label: 'WhatsApp', icon: faWhatsapp, color: '#25D366',
    getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
  },
  {
    id: 'telegram', label: 'Telegram', icon: faTelegram, color: '#26A5E4',
    getUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
]

export default function ShareButtons({ url, title, className = '' }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const { addToast } = useToastStore()

  const shareUrl  = url   || window.location.href
  const shareTitle= title || document.title

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      addToast({ type: 'success', title: 'Copied!', message: 'Link copied to clipboard.' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      addToast({ type: 'error', title: 'Failed', message: 'Could not copy link.' })
    }
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {})
      return
    }
    setOpen(o => !o)
  }

  return (
    <div className={`share-btns relative ${className}`}>
      {/* Toggle button */}
      <button
        onClick={handleNativeShare}
        className="share-toggle flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all"
        title="Share">
        <FontAwesomeIcon icon={faShareNodes} />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="share-panel absolute right-0 top-10 z-20 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-xl shadow-xl p-3 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ duration: 0.18 }}>

            <p className="text-xs text-[var(--text-tertiary)] mb-2 px-1 font-semibold uppercase tracking-wide">Share via</p>
            <div className="space-y-0.5">
              {SHARE_PLATFORMS.map(p => (
                <a
                  key={p.id}
                  href={p.getUrl(shareUrl, shareTitle)}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-surface-2)] transition-colors text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  <FontAwesomeIcon icon={p.icon} style={{ color: p.color }} className="w-4 flex-shrink-0" />
                  {p.label}
                </a>
              ))}
              <button
                onClick={copyLink}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-surface-2)] transition-colors text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] w-full text-left">
                <FontAwesomeIcon icon={copied ? faCheck : faLink} className={`w-4 flex-shrink-0 ${copied ? 'text-green-400' : ''}`} />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}
    </div>
  )
}
