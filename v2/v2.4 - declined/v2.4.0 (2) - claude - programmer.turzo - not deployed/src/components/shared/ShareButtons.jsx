// ============================================================
// ShareButtons.jsx — v2.4.0
// Compact share bar: Facebook, X/Twitter, LinkedIn,
// WhatsApp, Telegram, Copy Link
// ============================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faXTwitter,
  faLinkedinIn,
  faWhatsapp,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import { faLink, faCheck, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useToastStore } from '../../store/toastStore.js'
import { SITE_CONFIG } from '../../config/site.config.js'

function buildShareUrl(platform, url, title) {
  const enc = encodeURIComponent
  const text = enc(`${title} — ${SITE_CONFIG.owner.displayName}`)
  switch (platform) {
    case 'facebook':  return `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`
    case 'twitter':   return `https://twitter.com/intent/tweet?text=${text}&url=${enc(url)}`
    case 'linkedin':  return `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`
    case 'whatsapp':  return `https://wa.me/?text=${text}%20${enc(url)}`
    case 'telegram':  return `https://t.me/share/url?url=${enc(url)}&text=${text}`
    default: return '#'
  }
}

const PLATFORMS = [
  { key: 'facebook',  icon: faFacebook,  label: 'Facebook',  color: '#1877F2' },
  { key: 'twitter',   icon: faXTwitter,  label: 'X / Twitter', color: '#000000' },
  { key: 'linkedin',  icon: faLinkedinIn,label: 'LinkedIn',   color: '#0A66C2' },
  { key: 'whatsapp',  icon: faWhatsapp,  label: 'WhatsApp',  color: '#25D366' },
  { key: 'telegram',  icon: faTelegram,  label: 'Telegram',  color: '#26A5E4' },
]

export default function ShareButtons({ url, title, compact = false }) {
  const { push } = useToastStore()
  const [copied, setCopied] = useState(false)
  const [open, setOpen]     = useState(false)

  const fullUrl = url || window.location.href

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      push({ type: 'success', title: 'Copied!', message: 'Link copied to clipboard.' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      push({ type: 'error', title: 'Error', message: 'Could not copy link.' })
    }
  }

  if (compact) {
    return (
      <div className="shr-compact">
        <button className="shr-toggle" onClick={() => setOpen(o => !o)} aria-label="Share">
          <FontAwesomeIcon icon={faShareNodes}/>
          <span>Share</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div className="shr-popup"
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.16 }}>
              {PLATFORMS.map(pl => (
                <a key={pl.key}
                  href={buildShareUrl(pl.key, fullUrl, title)}
                  target="_blank" rel="noopener noreferrer"
                  className="shr-popup-btn"
                  title={pl.label}
                  style={{ '--sc': pl.color }}>
                  <FontAwesomeIcon icon={pl.icon}/>
                </a>
              ))}
              <button className="shr-popup-btn" onClick={copyLink} title="Copy link" style={{ '--sc': '#64748B' }}>
                <FontAwesomeIcon icon={copied ? faCheck : faLink}/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .shr-compact { position: relative; display: inline-flex; }
          .shr-toggle {
            display: inline-flex; align-items: center; gap: .4rem;
            padding: .4rem .75rem; border-radius: 9999px;
            border: 1px solid var(--border-strong);
            background: var(--bg-surface-2);
            color: var(--text-secondary); font-size: .8rem; font-weight: 600;
            cursor: pointer; transition: all .18s;
          }
          .shr-toggle:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
          .shr-popup {
            position: absolute; bottom: calc(100% + 8px); left: 50%;
            transform: translateX(-50%);
            display: flex; gap: .35rem; align-items: center;
            background: var(--bg-surface); border: 1px solid var(--border-color);
            border-radius: 999px; padding: .4rem .6rem;
            box-shadow: 0 8px 24px rgba(0,0,0,.25); z-index: 50; white-space: nowrap;
          }
          .shr-popup-btn {
            width: 32px; height: 32px; border-radius: 50%; border: none;
            background: color-mix(in srgb, var(--sc) 12%, var(--bg-surface-2));
            color: var(--sc); font-size: .85rem; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all .16s; flex-shrink: 0; text-decoration: none;
          }
          .shr-popup-btn:hover { background: color-mix(in srgb, var(--sc) 22%, var(--bg-surface-2)); transform: translateY(-2px); }
        `}</style>
      </div>
    )
  }

  // Full bar
  return (
    <div className="shr-bar">
      <span className="shr-bar-label">Share</span>
      {PLATFORMS.map(pl => (
        <a key={pl.key}
          href={buildShareUrl(pl.key, fullUrl, title)}
          target="_blank" rel="noopener noreferrer"
          className="shr-bar-btn"
          title={pl.label}
          style={{ '--sc': pl.color }}>
          <FontAwesomeIcon icon={pl.icon}/>
        </a>
      ))}
      <button className="shr-bar-btn shr-copy" onClick={copyLink} title="Copy link"
        style={{ '--sc': copied ? '#22c55e' : '#64748B' }}>
        <FontAwesomeIcon icon={copied ? faCheck : faLink}/>
      </button>

      <style>{`
        .shr-bar { display: flex; align-items: center; gap: .4rem; flex-wrap: wrap; }
        .shr-bar-label { font-size: .75rem; font-weight: 600; color: var(--text-tertiary); margin-right: .2rem; }
        .shr-bar-btn {
          width: 36px; height: 36px; border-radius: 10px; border: none;
          background: color-mix(in srgb, var(--sc) 10%, var(--bg-surface-2));
          border: 1px solid color-mix(in srgb, var(--sc) 20%, var(--border-color));
          color: var(--sc); font-size: .88rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .18s; text-decoration: none;
        }
        .shr-bar-btn:hover { background: color-mix(in srgb, var(--sc) 20%, var(--bg-surface-2)); transform: translateY(-2px); box-shadow: 0 4px 12px color-mix(in srgb, var(--sc) 25%, transparent); }
      `}</style>
    </div>
  )
}
