// ShareModal.jsx — v2.4.0
// Advanced share popup inspired by YouTube's share panel.
// 8 platforms + copy link + QR code + embed code + native share.

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faLink, faCheck, faCode, faQrcode,
  faShareNodes, faEnvelope, faDownload
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook, faXTwitter, faLinkedin, faWhatsapp,
  faTelegram, faReddit, faPinterest
} from '@fortawesome/free-brands-svg-icons'
import { incrementShareCount } from '../../services/supabase.js'

// ── Platform Configs ──────────────────────────────────────
const PLATFORMS = [
  {
    id: 'facebook', label: 'Facebook',
    icon: faFacebook, color: '#1877f2', bg: 'rgba(24,119,242,.12)',
    href: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    id: 'twitter', label: 'X / Twitter',
    icon: faXTwitter, color: '#000', bg: 'rgba(0,0,0,.1)',
    href: ({ url, title }) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`,
  },
  {
    id: 'linkedin', label: 'LinkedIn',
    icon: faLinkedin, color: '#0a66c2', bg: 'rgba(10,102,194,.12)',
    href: ({ url }) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
  {
    id: 'whatsapp', label: 'WhatsApp',
    icon: faWhatsapp, color: '#25d366', bg: 'rgba(37,211,102,.12)',
    href: ({ url, title }) => `https://wa.me/?text=${encodeURIComponent(title + '\n' + url)}`,
  },
  {
    id: 'telegram', label: 'Telegram',
    icon: faTelegram, color: '#229ed9', bg: 'rgba(34,158,217,.12)',
    href: ({ url, title }) => `https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'reddit', label: 'Reddit',
    icon: faReddit, color: '#ff4500', bg: 'rgba(255,69,0,.12)',
    href: ({ url, title }) => `https://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(title)}`,
  },
  {
    id: 'pinterest', label: 'Pinterest',
    icon: faPinterest, color: '#e60023', bg: 'rgba(230,0,35,.12)',
    href: ({ url, title, thumbnail }) =>
      `https://pinterest.com/pin/create/button/?url=${url}&media=${encodeURIComponent(thumbnail || '')}&description=${encodeURIComponent(title)}`,
  },
  {
    id: 'email', label: 'Email',
    icon: faEnvelope, color: '#64748b', bg: 'rgba(100,116,139,.12)',
    href: ({ url, title, description }) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent((description ? description + '\n\n' : '') + url)}`,
  },
]

// ── Tiny QR code generator (pure JS, no external lib needed) ──
function generateQR(text, size = 160) {
  // We use the Google Charts API as a simple fallback.
  // In a real build you'd bundle qrcode.js. This keeps bundle size 0.
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=000000&bgcolor=ffffff&margin=2`
}

export default function ShareModal({
  isOpen,
  onClose,
  url,
  title       = 'Check this out',
  description = '',
  thumbnail   = '',
  slug        = '',
}) {
  const [copied,     setCopied]     = useState(false)
  const [embedOpen,  setEmbedOpen]  = useState(false)
  const [qrOpen,     setQrOpen]     = useState(false)
  const [embedCopied,setEmbedCopied] = useState(false)
  const [shared,     setShared]     = useState(false)
  const inputRef = useRef(null)
  const hasSharedRef = useRef(false)

  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encodedUrl = encodeURIComponent(fullUrl)
  const embedCode = `<iframe src="${fullUrl}" title="${title}" width="100%" height="500" frameborder="0" allow="fullscreen" loading="lazy"></iframe>`

  // Increment share count once per modal open
  useEffect(() => {
    if (isOpen && slug && !hasSharedRef.current) {
      hasSharedRef.current = true
      incrementShareCount(slug).catch(() => {})
    }
    if (!isOpen) {
      hasSharedRef.current = false
      setCopied(false); setEmbedOpen(false); setQrOpen(false); setEmbedCopied(false); setShared(false)
    }
  }, [isOpen, slug])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      inputRef.current?.select()
    }
  }, [fullUrl])

  const copyEmbed = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setEmbedCopied(true)
      setTimeout(() => setEmbedCopied(false), 2200)
    } catch {}
  }, [embedCode])

  const handlePlatform = useCallback((platform) => {
    const href = platform.href({ url: encodedUrl, title, description, thumbnail })
    window.open(href, '_blank', 'noopener,noreferrer,width=620,height=520')
  }, [encodedUrl, title, description, thumbnail])

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return
    try {
      await navigator.share({ title, text: description, url: fullUrl })
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch {}
  }, [title, description, fullUrl])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="sm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="sm-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="sm-header">
              <FontAwesomeIcon icon={faShareNodes} className="sm-header-icon"/>
              <span className="sm-header-title">Share</span>
              <button className="sm-close" onClick={onClose} aria-label="Close share panel">
                <FontAwesomeIcon icon={faXmark}/>
              </button>
            </div>

            {/* URL bar */}
            <div className="sm-url-row">
              <div className="sm-url-wrap">
                <FontAwesomeIcon icon={faLink} className="sm-url-icon"/>
                <input
                  ref={inputRef}
                  className="sm-url-input"
                  readOnly
                  value={fullUrl}
                  onFocus={e => e.target.select()}
                />
              </div>
              <button className={`sm-copy-btn ${copied ? 'sm-copy-btn--done' : ''}`} onClick={copyLink}>
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="done"
                      initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }}
                      className="sm-copy-inner"
                    >
                      <FontAwesomeIcon icon={faCheck}/> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="copy"
                      initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }}
                      className="sm-copy-inner"
                    >
                      Copy link
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Platform grid */}
            <div className="sm-platforms">
              {PLATFORMS.map(platform => (
                <button
                  key={platform.id}
                  className="sm-platform-btn"
                  onClick={() => handlePlatform(platform)}
                  title={`Share on ${platform.label}`}
                >
                  <span className="sm-platform-icon" style={{ background: platform.bg, color: platform.color }}>
                    <FontAwesomeIcon icon={platform.icon}/>
                  </span>
                  <span className="sm-platform-label">{platform.label}</span>
                </button>
              ))}
            </div>

            {/* Extra actions row */}
            <div className="sm-extras">
              {/* QR Code */}
              <button
                className={`sm-extra-btn ${qrOpen ? 'sm-extra-btn--active' : ''}`}
                onClick={() => { setQrOpen(p => !p); setEmbedOpen(false) }}
              >
                <FontAwesomeIcon icon={faQrcode}/>
                <span>QR Code</span>
              </button>

              {/* Embed */}
              <button
                className={`sm-extra-btn ${embedOpen ? 'sm-extra-btn--active' : ''}`}
                onClick={() => { setEmbedOpen(p => !p); setQrOpen(false) }}
              >
                <FontAwesomeIcon icon={faCode}/>
                <span>Embed</span>
              </button>

              {/* Native share (only if supported) */}
              {typeof navigator !== 'undefined' && navigator.share && (
                <button
                  className={`sm-extra-btn ${shared ? 'sm-extra-btn--done' : ''}`}
                  onClick={handleNativeShare}
                >
                  <FontAwesomeIcon icon={shared ? faCheck : faShareNodes}/>
                  <span>{shared ? 'Shared!' : 'More'}</span>
                </button>
              )}
            </div>

            {/* QR Code panel */}
            <AnimatePresence>
              {qrOpen && (
                <motion.div
                  className="sm-sub-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="sm-qr-wrap">
                    <div className="sm-qr-img-wrap">
                      <img
                        src={generateQR(fullUrl, 160)}
                        alt="QR Code"
                        className="sm-qr-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="sm-qr-info">
                      <div className="sm-qr-title">Scan to open</div>
                      <div className="sm-qr-sub">Point any camera at the QR code to visit this project</div>
                      <a
                        href={generateQR(fullUrl, 400)}
                        download="project-qr.png"
                        className="sm-qr-dl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faDownload}/> Download QR
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Embed panel */}
            <AnimatePresence>
              {embedOpen && (
                <motion.div
                  className="sm-sub-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="sm-embed-wrap">
                    <div className="sm-embed-label">Embed code</div>
                    <div className="sm-embed-code-wrap">
                      <code className="sm-embed-code">{embedCode}</code>
                    </div>
                    <button
                      className={`sm-embed-copy ${embedCopied ? 'sm-embed-copy--done' : ''}`}
                      onClick={copyEmbed}
                    >
                      <FontAwesomeIcon icon={embedCopied ? faCheck : faCode}/>
                      {embedCopied ? 'Copied!' : 'Copy embed code'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <style>{`
            .sm-backdrop {
              position: fixed; inset: 0; z-index: 600;
              background: rgba(0,0,0,.6);
              backdrop-filter: blur(6px);
              display: flex; align-items: flex-end; justify-content: center;
              padding: 0;
            }
            @media (min-width: 540px) {
              .sm-backdrop { align-items: center; padding: 1rem; }
            }
            .sm-panel {
              background: var(--bg-surface);
              border: 1px solid var(--border-color);
              border-radius: 20px 20px 0 0;
              width: 100%; max-width: 500px;
              overflow: hidden;
              box-shadow: 0 -8px 40px rgba(0,0,0,.25);
            }
            @media (min-width: 540px) {
              .sm-panel { border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
            }

            /* Header */
            .sm-header {
              display: flex; align-items: center; gap: .6rem;
              padding: 1.1rem 1.25rem .9rem;
              border-bottom: 1px solid var(--border-color);
            }
            .sm-header-icon { color: var(--text-tertiary); font-size: .9rem; }
            .sm-header-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); flex: 1; }
            .sm-close {
              width: 32px; height: 32px; border-radius: 8px;
              border: 1px solid var(--border-color);
              background: transparent; color: var(--text-tertiary);
              display: flex; align-items: center; justify-content: center;
              cursor: pointer; transition: all var(--transition-fast);
            }
            .sm-close:hover { background: var(--bg-surface-2); color: var(--text-primary); }

            /* URL row */
            .sm-url-row {
              display: flex; align-items: center; gap: 8px;
              padding: .9rem 1.25rem .7rem;
            }
            .sm-url-wrap {
              flex: 1; display: flex; align-items: center; gap: .5rem;
              background: var(--bg-surface-2);
              border: 1px solid var(--border-color);
              border-radius: 10px; padding: .5rem .75rem;
              min-width: 0;
            }
            .sm-url-icon { color: var(--text-tertiary); font-size: .8rem; flex-shrink: 0; }
            .sm-url-input {
              background: transparent; border: none; outline: none;
              font-size: .82rem; color: var(--text-secondary);
              font-family: var(--font-mono);
              white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
              width: 100%; min-width: 0;
            }
            .sm-copy-btn {
              padding: .5rem .9rem; border-radius: 10px;
              background: var(--accent-primary);
              border: none; color: #fff;
              font-size: .83rem; font-weight: 600;
              cursor: pointer; flex-shrink: 0;
              transition: all var(--transition-fast);
              min-width: 90px;
            }
            .sm-copy-btn:hover { background: var(--accent-hover); }
            .sm-copy-btn--done { background: #22c55e; }
            .sm-copy-inner { display: flex; align-items: center; gap: .35rem; justify-content: center; }

            /* Platform grid */
            .sm-platforms {
              display: grid; grid-template-columns: repeat(4, 1fr);
              gap: 6px; padding: .6rem 1.25rem .8rem;
            }
            @media (min-width: 400px) { .sm-platforms { grid-template-columns: repeat(4, 1fr); } }
            .sm-platform-btn {
              display: flex; flex-direction: column; align-items: center; gap: 6px;
              background: transparent; border: 1px solid var(--border-color);
              border-radius: 12px; padding: .7rem .4rem .6rem;
              cursor: pointer;
              transition: all var(--transition-fast);
            }
            .sm-platform-btn:hover {
              background: var(--bg-surface-2);
              border-color: var(--border-strong);
              transform: translateY(-1px);
              box-shadow: var(--shadow-sm);
            }
            .sm-platform-icon {
              width: 38px; height: 38px; border-radius: 10px;
              display: flex; align-items: center; justify-content: center;
              font-size: 1.05rem; flex-shrink: 0;
            }
            .sm-platform-label {
              font-size: .7rem; color: var(--text-tertiary);
              white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
              max-width: 100%; text-align: center;
            }

            /* Extra actions */
            .sm-extras {
              display: flex; gap: 8px;
              padding: 0 1.25rem .9rem;
            }
            .sm-extra-btn {
              flex: 1; display: flex; align-items: center; justify-content: center; gap: .4rem;
              padding: .55rem .75rem;
              background: var(--bg-surface-2);
              border: 1px solid var(--border-color);
              border-radius: 10px;
              font-size: .8rem; color: var(--text-secondary);
              cursor: pointer;
              transition: all var(--transition-fast);
            }
            .sm-extra-btn:hover { background: var(--bg-surface-3); color: var(--text-primary); }
            .sm-extra-btn--active {
              background: var(--accent-light);
              border-color: var(--accent-primary);
              color: var(--accent-primary);
            }
            .sm-extra-btn--done { background: rgba(34,197,94,.1); border-color: #22c55e; color: #22c55e; }

            /* Sub panels */
            .sm-sub-panel { overflow: hidden; border-top: 1px solid var(--border-color); }

            /* QR */
            .sm-qr-wrap {
              display: flex; align-items: center; gap: 1rem;
              padding: 1rem 1.25rem;
            }
            .sm-qr-img-wrap {
              background: #fff; border-radius: 10px; padding: 6px; flex-shrink: 0;
              border: 1px solid var(--border-color);
            }
            .sm-qr-img { width: 100px; height: 100px; display: block; border-radius: 6px; }
            .sm-qr-title { font-size: .9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
            .sm-qr-sub { font-size: .78rem; color: var(--text-tertiary); margin-bottom: .6rem; line-height: 1.4; }
            .sm-qr-dl {
              display: inline-flex; align-items: center; gap: .35rem;
              font-size: .78rem; color: var(--text-accent);
              text-decoration: none;
              transition: opacity var(--transition-fast);
            }
            .sm-qr-dl:hover { opacity: .75; }

            /* Embed */
            .sm-embed-wrap { padding: 1rem 1.25rem; }
            .sm-embed-label { font-size: .75rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .5px; margin-bottom: .5rem; }
            .sm-embed-code-wrap {
              background: var(--bg-surface-2);
              border: 1px solid var(--border-color);
              border-radius: 8px; padding: .65rem .8rem;
              margin-bottom: .6rem; overflow-x: auto;
            }
            .sm-embed-code {
              font-size: .72rem; color: var(--text-secondary);
              font-family: var(--font-mono); white-space: pre-wrap; word-break: break-all;
            }
            .sm-embed-copy {
              display: inline-flex; align-items: center; gap: .4rem;
              padding: .45rem .85rem; border-radius: 8px;
              background: var(--bg-surface-3);
              border: 1px solid var(--border-color);
              font-size: .8rem; color: var(--text-secondary);
              cursor: pointer; transition: all var(--transition-fast);
            }
            .sm-embed-copy:hover { background: var(--bg-elevated); color: var(--text-primary); }
            .sm-embed-copy--done { background: rgba(34,197,94,.1); border-color: #22c55e; color: #22c55e; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
