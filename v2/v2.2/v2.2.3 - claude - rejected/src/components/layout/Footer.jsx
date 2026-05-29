// ============================================================
// FOOTER — v2.1.3
// Design: footer-v9-claude-deepseek (same to same)
// Changes from v2.1.2:
//   - Complete redesign based on footer-v9 HTML
//   - Stay Connected banner (blue gradient) above footer
//   - New 4-col grid: Brand | Explore | Legal | Get in Touch
//   - Inline SVG social icons (8 icons: GH, LI, X, IG, YT, FB, Threads, TikTok)
//   - Contact column: "Let's Collaborate" card + email card
//   - Bottom bar: copyright + version badge + scroll-to-top
//   - Logo: T-avatar with green active dot (bottom-right)
//   - Status dot: 'active' mode. 4 modes planned: active|busy|away|offline
//     Firebase will control status in a future version.
// Firebase:
//   - onSubscriberCount() reads /subscribers/count from RTDB (real-time)
//   - subscribeEmail() writes to Firebase RTDB + Supabase
//   - Subscriber count animation triggers on viewport entry
// Fonts: Sora + DM Serif Display (Google Fonts, imported in style tag)
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import SITE_CONFIG from '../../config/site.config.js'
import { subscribeEmail, onSubscriberCount } from '../../services/firebase.js'
import { toast } from '../../store/toastStore.js'

// ── Status config (Firebase will control mode later) ────────
// 4 modes: active | busy | away | offline
// Currently always 'active'. Future: fetch from Firebase RTDB /status/mode
const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active',  shadow: 'rgba(34,197,94,0.35)'  },
  busy:    { color: '#ef4444', label: 'Busy',    shadow: 'rgba(239,68,68,0.35)'   },
  away:    { color: '#f59e0b', label: 'Away',    shadow: 'rgba(245,158,11,0.35)'  },
  offline: { color: '#6b7280', label: 'Offline', shadow: 'rgba(107,114,128,0.35)' },
}
const CURRENT_STATUS = 'active' // ← Firebase will override this in future version

// ── Navigation data ──────────────────────────────────────────
const EXPLORE_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Feed',     path: '/feed' },
  { label: 'Contact',  path: '/contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Cookies Policy', path: '/cookies-policy' },
  { label: 'Terms of Use',   path: '/terms' },         // route planned for future
  { label: 'Sitemap',        path: '/sitemap.xml', external: true },
]

// ── Animated counter (triggers on scroll into view) ──────────
function AnimatedCount({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = Math.max(0, target - 300)
    const startTime = performance.now()
    const duration = 1800
    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(start + (target - start) * ease)
      setCount(value)
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <strong ref={ref} id="subCount">{count.toLocaleString()}</strong>
}

// ── Social icon SVGs ─────────────────────────────────────────
const SocialIcon = ({ href, label, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="nf-social-icon" title={label} aria-label={label}>
    <svg viewBox="0 0 24 24">{children}</svg>
  </a>
)

// ── Footer ────────────────────────────────────────────────────
export function Footer() {
  const [email, setEmail]         = useState('')
  const [subCount, setSubCount]   = useState(2847)
  const [subscribing, setSubscribing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [logoSrc, setLogoSrc] = useState('/logo.webp')
  const year = new Date().getFullYear()

  const status = STATUS_CONFIG[CURRENT_STATUS]

  // Live subscriber count from Firebase RTDB
  useEffect(() => {
    const unsub = onSubscriberCount((count) => {
      if (count > 0) setSubCount(count)
    })
    return unsub
  }, [])

  const handleSubscribe = async (e) => {
    e?.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailInvalid(true)
      setTimeout(() => setEmailInvalid(false), 2200)
      return
    }
    setSubscribing(true)
    try {
      const result = await subscribeEmail(trimmed)
      if (result.duplicate) {
        toast.info('Already subscribed', 'This email is already in the list!')
      } else {
        setShowSuccess(true)
        setEmail('')
        setSubCount(c => c + 1)
        setTimeout(() => setShowSuccess(false), 3500)
      }
    } catch {
      toast.error('Failed', 'Could not subscribe. Try again.')
    } finally {
      setSubscribing(false)
    }
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ══ STAY CONNECTED BANNER ══════════════════════════════ */}
      <div className="nf-sc-wrap">
        <div className="nf-sc">
          {/* ── Left: heading ── */}
          <div className="nf-sc-left">
            <h2>Stay <em>Connected</em><br />with My Work</h2>
            <p className="nf-sc-sub">Follow my journey · Get updates on new projects &amp; posts</p>
          </div>

          {/* ── Right: form + count ── */}
          <div className="nf-sc-right">
            {!showSuccess ? (
              <form onSubmit={handleSubscribe} noValidate>
                <div className={`nf-form-wrap ${emailInvalid ? 'nf-form-invalid' : ''}`}>
                  <div className="nf-input-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M2 7l8.5 6.5a2 2 0 002.5 0L22 7"/>
                    </svg>
                  </div>
                  <input
                    id="nf-sub-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (emailInvalid) setEmailInvalid(false) }}
                    required
                    autoComplete="email"
                  />
                  <button type="submit" className="nf-submit-btn" disabled={subscribing}>
                    {subscribing ? (
                      <span className="nf-spinner" />
                    ) : (
                      <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v1H3a1 1 0 000 2h1v1a6 6 0 0012 0v-1h1a1 1 0 000-2h-1V8a6 6 0 00-6-6zm0 2a4 4 0 014 4v2a4 4 0 01-8 0V8a4 4 0 014-4z"/>
                      </svg>
                    )}
                    <span>{subscribing ? '...' : 'Subscribe'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="nf-success-msg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Subscribed! Check your inbox.
              </div>
            )}

            {/* Subscriber count */}
            <p className="nf-count-text">
              <span className="nf-count-dot" aria-hidden />
              <AnimatedCount target={subCount} /> curious minds already subscribed
            </p>
          </div>
        </div>
      </div>

      {/* ══ FOOTER SHELL ════════════════════════════════════════ */}
      <footer className="nf-footer">
        <div className="nf-inner">

          {/* ── MAIN GRID ──────────────────────────────────────── */}
          <div className="nf-main">

            {/* ── Brand column ─────────────────────────────────── */}
            <div className="nf-brand-col">
              <Link to="/" className="nf-logo-row">
                <div className="nf-logo-mark" style={{ position: 'relative' }}>
                  <img
                    src={logoSrc}
                    alt="Muhtasim logo"
                    onError={() => setLogoSrc('/android-chrome-192x192.png')}
                    className="nf-logo-img"
                  />
                  {/* Active dot */}
                  <span
                    className="nf-logo-status-dot"
                    title={status.label}
                    style={{
                      background: status.color,
                      boxShadow: `0 0 0 2px var(--nf-footer-bg), 0 0 0 4px ${status.shadow}`,
                    }}
                  />
                </div>
                <div>
                  <div className="nf-logo-name">{SITE_CONFIG.owner.displayName}</div>
                  <div className="nf-logo-handle">@mdturzo999 · Portfolio</div>
                </div>
              </Link>

              <p className="nf-brand-desc">{SITE_CONFIG.seo.defaultDescription}</p>

              {/* 8 Social icons */}
              <div className="nf-social-row">
                <SocialIcon href={SITE_CONFIG.social.github} label="GitHub">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.linkedin} label="LinkedIn">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.twitter} label="X / Twitter">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.instagram} label="Instagram">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.youtube} label="YouTube">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.facebook} label="Facebook">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.threads} label="Threads">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.tiktok} label="TikTok">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"/>
                </SocialIcon>
              </div>

              {/* Location */}
              <div className="nf-location-row">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                {SITE_CONFIG.owner.location}
              </div>
            </div>

            {/* ── Explore nav ──────────────────────────────────── */}
            <div className="nf-nav-col">
              <div className="nf-nav-col-title">Explore</div>
              <ul className="nf-nav-list">
                {EXPLORE_LINKS.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Legal nav ────────────────────────────────────── */}
            <div className="nf-nav-col">
              <div className="nf-nav-col-title">Legal</div>
              <ul className="nf-nav-list">
                {LEGAL_LINKS.map(({ label, path, external }) => (
                  <li key={path}>
                    {external
                      ? <a href={path} target="_blank" rel="noopener noreferrer">{label}</a>
                      : <Link to={path}>{label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact column ───────────────────────────────── */}
            <div className="nf-contact-col">
              <div className="nf-nav-col-title">Get in Touch</div>

              {/* Contact card */}
              <Link to="/contact" className="nf-contact-card">
                <div className="nf-cc-label">Open for work</div>
                <div className="nf-cc-title">Let's Collaborate</div>
                <div className="nf-cc-sub">Have a project in mind? I'd love to hear about it.</div>
                <span className="nf-cc-arrow">
                  Visit Contact Page
                  <svg viewBox="0 0 20 20">
                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                  </svg>
                </span>
              </Link>

              {/* Email card */}
              <a href={`mailto:${SITE_CONFIG.owner.email}`} className="nf-email-card">
                <div className="nf-email-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <div className="nf-email-label">Email me</div>
                  <div className="nf-email-addr">{SITE_CONFIG.owner.email}</div>
                </div>
              </a>
            </div>
          </div>

          {/* ── Scroll to top on border (mobile only) ────────── */}
          <div className="nf-scroll-border">
            <button onClick={scrollToTop} className="nf-scroll-btn" aria-label="Scroll to top" title="Back to top">
              <svg viewBox="0 0 20 20">
                <path d="M10 4l-6 6h4v6h4v-6h4l-6-6z"/>
              </svg>
            </button>
          </div>

          {/* ── Bottom bar ───────────────────────────────────── */}
          <div className="nf-bottom">
            <p className="nf-copyright">
              © {year} <Link to="/">{SITE_CONFIG.siteName}</Link>. All rights reserved.
            </p>
            <div className="nf-bottom-right">
              <span className="nf-version">{SITE_CONFIG.version}</span>
              <button onClick={scrollToTop} className="nf-scroll-btn nf-desktop-only" aria-label="Scroll to top" title="Back to top">
                <svg viewBox="0 0 20 20">
                  <path d="M10 4l-6 6h4v6h4v-6h4l-6-6z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* ══ STYLES ══════════════════════════════════════════════ */}
      <style>{`
        /* ── Google Fonts ──────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ── CSS Variables ─────────────────────────────────── */
        /* Dark mode (default) */
        :root, [data-theme="dark"] {
          --nf-footer-bg:   #0f172a;
          --nf-surface-1:   #1e293b;
          --nf-surface-2:   #273449;
          --nf-surface-3:   #334155;
          --nf-ink-1:       #f1f5f9;
          --nf-ink-2:       #e2e8f0;
          --nf-ink-3:       #cbd5e1;
          --nf-ink-4:       #94a3b8;
          --nf-blue-600:    #3b82f6;
          --nf-blue-700:    #2563eb;
          --nf-blue-400:    #60a5fa;
          --nf-shadow-hover: 0 4px 20px rgba(59,130,246,.3);
          --nf-shadow-card:  0 1px 3px rgba(0,0,0,.2), 0 4px 16px rgba(0,0,0,.25);
          --nf-shadow-lg:    0 8px 28px rgba(0,0,0,.35);
        }
        /* Light mode */
        [data-theme="light"] {
          --nf-footer-bg:   #edf2f7;
          --nf-surface-1:   #f4f7fb;
          --nf-surface-2:   #e8edf5;
          --nf-surface-3:   #d6dfe8;
          --nf-ink-1:       #0f172a;
          --nf-ink-2:       #1e293b;
          --nf-ink-3:       #475569;
          --nf-ink-4:       #94a3b8;
          --nf-blue-600:    #2563eb;
          --nf-blue-700:    #1d4ed8;
          --nf-blue-400:    #3b82f6;
          --nf-shadow-hover: 0 4px 20px rgba(37,99,235,.18);
          --nf-shadow-card:  0 1px 3px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06);
          --nf-shadow-lg:    0 8px 28px rgba(0,0,0,.18);
        }

        /* ── Base ──────────────────────────────────────────── */
        .nf-footer {
          font-family: 'Sora', var(--font-body, sans-serif);
          background: var(--nf-footer-bg);
          color: var(--nf-ink-1);
          padding: 0 clamp(16px, 4vw, 48px);
          transition: background .35s ease, color .35s ease;
        }
        .nf-inner { max-width: 1280px; margin: 0 auto; }

        /* ══ STAY CONNECTED BANNER ═══════════════════════════ */
        .nf-sc-wrap {
          font-family: 'Sora', var(--font-body, sans-serif);
          padding: 0 clamp(16px, 4vw, 48px);
          margin-bottom: -1px;
          animation: nf-fade-up .55s ease both;
        }
        .nf-sc {
          position: relative;
          overflow: hidden;
          max-width: 1280px;
          margin: 0 auto;
          border-radius: 28px 28px 0 0;
          background: linear-gradient(135deg, var(--nf-blue-700) 0%, var(--nf-blue-600) 60%, #38bdf8 100%);
          padding: clamp(28px, 5vw, 52px) clamp(24px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
        }
        .nf-sc::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }
        .nf-sc::after {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 260px; height: 260px; border-radius: 50%;
          background: rgba(255,255,255,.06);
          pointer-events: none;
        }
        .nf-sc-left { position: relative; z-index: 1; flex: 1 1 280px; min-width: 240px; }
        .nf-sc-left h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.4rem, 3.2vw, 2.3rem);
          color: #fff; line-height: 1.15; margin-bottom: 8px;
        }
        .nf-sc-left h2 em { font-style: italic; opacity: .85; }
        .nf-sc-sub { font-size: .8rem; color: rgba(255,255,255,.65); margin-top: 8px; }

        .nf-sc-right { position: relative; z-index: 1; flex: 0 1 420px; min-width: 260px; display: flex; flex-direction: column; gap: 10px; }

        /* Form */
        .nf-form-wrap {
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 100px; padding: 6px;
          display: flex; align-items: center; gap: 4px;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 2px 12px rgba(0,0,0,.08);
        }
        .nf-form-wrap:focus-within {
          border-color: rgba(255,255,255,.55);
          background: rgba(255,255,255,.18);
          box-shadow: 0 0 0 5px rgba(255,255,255,.07), 0 4px 18px rgba(0,0,0,.12);
        }
        .nf-form-wrap.nf-form-invalid {
          border-color: rgba(248,113,113,.85);
          box-shadow: 0 0 0 5px rgba(239,68,68,.14), 0 4px 18px rgba(0,0,0,.12);
        }
        .nf-input-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #fff;
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .nf-form-wrap:focus-within .nf-input-icon { background: rgba(255,255,255,.28); box-shadow: 0 0 0 3px rgba(255,255,255,.12); }
        .nf-input-icon svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .nf-form-wrap input[type="email"] {
          flex: 1; min-width: 120px; padding: 10px 8px 10px 2px;
          border: none; background: transparent;
          color: #fff; font-family: 'Sora', sans-serif;
          font-size: .88rem; font-weight: 400; outline: none;
          caret-color: #fff; letter-spacing: .01em;
        }
        .nf-form-wrap input[type="email"]::placeholder { color: rgba(255,255,255,.5); font-weight: 300; }
        .nf-form-wrap.nf-form-invalid input[type="email"],
        .nf-form-wrap.nf-form-invalid input[type="email"]::placeholder { color: rgba(255,190,190,.95); }
        .nf-form-wrap input[type="email"]:-webkit-autofill,
        .nf-form-wrap input[type="email"]:-webkit-autofill:hover,
        .nf-form-wrap input[type="email"]:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 9999s ease-in-out 0s;
          caret-color: #fff;
        }
        .nf-submit-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: var(--nf-blue-700);
          font-family: 'Sora', sans-serif; font-size: .85rem; font-weight: 600;
          padding: 11px 20px; border-radius: 100px;
          border: none; cursor: pointer;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          white-space: nowrap; box-shadow: 0 2px 10px rgba(0,0,0,.1);
          flex-shrink: 0; letter-spacing: .01em;
        }
        .nf-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(0,0,0,.18); background: #f8fafc; }
        .nf-submit-btn:active { transform: translateY(0); box-shadow: 0 1px 6px rgba(0,0,0,.12); }
        .nf-form-wrap.nf-form-invalid .nf-submit-btn { color: #dc2626; }
        .nf-submit-btn:disabled { opacity: .7; cursor: default; }
        .nf-submit-btn svg { flex-shrink: 0; width: 15px; height: 15px; }
        .nf-spinner {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid rgba(30,64,175,.3);
          border-top-color: var(--nf-blue-700);
          animation: nf-spin .7s linear infinite; flex-shrink: 0;
        }
        @keyframes nf-spin { to { transform: rotate(360deg); } }

        /* Count text */
        .nf-count-text { font-size: .8rem; color: rgba(255,255,255,.6); font-weight: 400; letter-spacing: .01em; line-height: 1.4; }
        .nf-count-text strong { color: #fff; font-weight: 700; font-size: .85rem; }
        .nf-count-dot {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 0 2px rgba(74,222,128,.35);
          animation: nf-pulse 2s infinite;
          margin-right: 6px; vertical-align: middle; position: relative; top: -1px;
        }
        @keyframes nf-pulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(74,222,128,.35); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,.0); }
        }

        /* Success */
        .nf-success-msg {
          display: flex; align-items: center; gap: 8px;
          color: #fff; font-weight: 600; font-size: .9rem;
          background: rgba(255,255,255,.12); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 100px; padding: 12px 22px; justify-content: center;
          animation: nf-fade-up .35s ease;
        }

        /* ══ FOOTER MAIN GRID ════════════════════════════════ */
        .nf-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.6fr;
          align-items: start;
          gap: 40px 32px;
          padding: 52px 0 44px;
          border-bottom: 1px solid var(--nf-surface-3);
          transition: border-color .35s ease;
        }

        /* ── Brand ─────────────────────────────────────────── */
        .nf-logo-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px; text-decoration: none;
        }
        .nf-logo-mark {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, var(--nf-blue-600), var(--nf-blue-400));
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 4px 14px rgba(37,99,235,.28);
          position: relative;
          overflow: visible;
        }
        .nf-logo-img {
          width: 42px; height: 42px; border-radius: 10px;
          object-fit: cover; border: 1px solid var(--nf-surface-3);
          background: var(--nf-surface-2);
        }
        .nf-logo-status-dot {
          position: absolute; bottom: -4px; right: -4px;
          width: 12px; height: 12px; border-radius: 50%;
          transition: background .3s ease, box-shadow .3s ease;
          cursor: default;
        }
        .nf-logo-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--nf-ink-1); line-height: 1.1; letter-spacing: -.01em; }
        .nf-logo-handle { font-size: .7rem; color: var(--nf-ink-4); font-weight: 400; letter-spacing: .04em; }
        .nf-brand-desc { font-size: .83rem; line-height: 1.7; color: var(--nf-ink-3); margin-bottom: 22px; max-width: 280px; }

        /* Social icons */
        .nf-social-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .nf-social-icon {
          width: 28px; height: 28px; border-radius: 9px;
          background: var(--nf-surface-2); border: 1px solid var(--nf-surface-3);
          display: flex; align-items: center; justify-content: center;
          color: var(--nf-ink-3); text-decoration: none;
          transition: all .28s cubic-bezier(.4,0,.2,1); cursor: pointer;
        }
        .nf-social-icon:hover { background: var(--nf-blue-600); border-color: var(--nf-blue-600); color: #fff; transform: translateY(-2px); box-shadow: var(--nf-shadow-hover); }
        .nf-social-icon:active,
        .nf-nav-list a:active,
        .nf-contact-card:active,
        .nf-email-card:active,
        .nf-submit-btn:active,
        .nf-scroll-btn:active { transform: scale(.96); }
        .nf-social-icon svg { width: 13px; height: 13px; fill: currentColor; }

        /* Location */
        .nf-location-row { display: flex; align-items: center; gap: 7px; font-size: .8rem; color: var(--nf-ink-4); }
        .nf-location-row svg { width: 14px; height: 14px; fill: var(--nf-blue-600); flex-shrink: 0; }

        /* ── Nav cols ──────────────────────────────────────── */
        .nf-nav-col-title { font-size: .68rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--nf-ink-4); margin-bottom: 16px; }
        .nf-nav-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .nf-nav-list a {
          font-size: .845rem; color: var(--nf-ink-3); text-decoration: none;
          font-weight: 400; transition: all .28s cubic-bezier(.4,0,.2,1);
          display: inline-flex; align-items: center; gap: 6px;
        }
        .nf-nav-list a:hover { color: var(--nf-blue-600); padding-left: 4px; }

        /* ── Contact col ───────────────────────────────────── */
        .nf-contact-card {
          background: linear-gradient(135deg, var(--nf-blue-600) 0%, var(--nf-blue-700) 100%);
          border-radius: 14px; padding: 18px 20px; margin-bottom: 10px;
          text-decoration: none; display: block;
          position: relative; overflow: hidden;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 4px 18px rgba(37,99,235,.22);
        }
        .nf-contact-card::before {
          content: ''; position: absolute; top: -30px; right: -30px;
          width: 100px; height: 100px; border-radius: 50%;
          background: rgba(255,255,255,.07);
        }
        .nf-contact-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(37,99,235,.32); }
        .nf-cc-label { font-size: .66rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.65); margin-bottom: 5px; }
        .nf-cc-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .nf-cc-sub { font-size: .75rem; color: rgba(255,255,255,.65); margin-bottom: 12px; }
        .nf-cc-arrow { display: inline-flex; align-items: center; gap: 5px; font-size: .78rem; font-weight: 600; color: #fff; }
        .nf-cc-arrow svg { width: 14px; height: 14px; fill: #fff; transition: transform .28s; }
        .nf-contact-card:hover .nf-cc-arrow svg { transform: translateX(3px); }

        .nf-email-card {
          background: var(--nf-surface-1); border: 1px solid var(--nf-surface-3);
          border-radius: 14px; padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .nf-email-card:hover { border-color: var(--nf-blue-400); background: rgba(59,130,246,.05); box-shadow: 0 2px 12px rgba(37,99,235,.1); }
        .nf-email-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(59,130,246,.1); border: 1px solid rgba(59,130,246,.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .28s;
        }
        .nf-email-card:hover .nf-email-icon { background: var(--nf-blue-600); border-color: var(--nf-blue-600); }
        .nf-email-icon svg { width: 15px; height: 15px; fill: var(--nf-blue-600); transition: fill .28s; }
        .nf-email-card:hover .nf-email-icon svg { fill: #fff; }
        .nf-email-label { font-size: .66rem; font-weight: 600; color: var(--nf-ink-4); letter-spacing: .08em; text-transform: uppercase; }
        .nf-email-addr { font-size: .8rem; font-weight: 500; color: var(--nf-ink-2); }

        /* ══ BOTTOM BAR ══════════════════════════════════════ */
        .nf-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0 22px; gap: 16px; flex-wrap: wrap;
        }
        .nf-copyright { font-size: .78rem; color: var(--nf-ink-4); }
        .nf-copyright a { color: var(--nf-ink-3); font-weight: 500; text-decoration: none; transition: color .2s; }
        .nf-copyright a:hover { color: var(--nf-ink-1); }
        .nf-bottom-right { display: flex; align-items: center; gap: 12px; }
        .nf-version { font-size: .68rem; font-weight: 600; letter-spacing: .06em; background: var(--nf-surface-2); border: 1px solid var(--nf-surface-3); color: var(--nf-ink-4); padding: 3px 10px; border-radius: 100px; }

        /* Scroll to top btn */
        .nf-scroll-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--nf-blue-600); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: all .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 4px 14px rgba(37,99,235,.28); text-decoration: none; flex-shrink: 0;
        }
        .nf-scroll-btn:hover { background: var(--nf-blue-700); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,.38); }
        .nf-scroll-btn svg { width: 16px; height: 16px; fill: #fff; }

        /* Mobile border scroll btn */
        .nf-scroll-border {
          display: none; justify-content: center; position: relative;
          z-index: 5; margin-top: -22px; margin-bottom: 0;
        }
        .nf-scroll-border .nf-scroll-btn {
          width: 44px; height: 44px;
          box-shadow: 0 2px 12px rgba(37,99,235,.25), 0 0 0 4px var(--nf-footer-bg);
        }

        /* ══ RESPONSIVE ══════════════════════════════════════ */

        /* Tablet (≤1024px) */
        @media (max-width: 1024px) {
          .nf-main { grid-template-columns: 1.5fr 1fr 1fr; grid-template-rows: auto auto; }
          .nf-brand-col { grid-column: 1 / -1; }
          .nf-contact-col {
            grid-column: 1 / -1;
            display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch;
          }
          .nf-contact-col .nf-nav-col-title { grid-column: 1 / -1; margin-bottom: 0; }
          .nf-brand-desc { max-width: 100%; }
          .nf-contact-card { margin-bottom: 0; }
          .nf-sc-right { flex: 0 1 380px; }
        }

        /* Small tablet (≤860px) */
        @media (max-width: 860px) {
          .nf-main { grid-template-columns: 1fr 1fr; }
          .nf-brand-col { grid-column: 1 / -1; }
          .nf-contact-col { grid-column: 1 / -1; grid-template-columns: 1fr 1fr; align-items: stretch; }
          .nf-sc-left h2 { font-size: 1.4rem; }
          .nf-sc { gap: 20px; }
          .nf-sc-right { flex: 1 1 100%; min-width: 100%; }
        }

        /* Mobile (≤600px) */
        @media (max-width: 600px) {
          .nf-sc { flex-direction: column; align-items: flex-start; gap: 20px; padding: 28px 24px; }
          .nf-sc-left, .nf-sc-right { flex: 1 1 auto; min-width: 100%; }
          .nf-main { grid-template-columns: 1fr 1fr; padding: 36px 0 32px; gap: 28px 20px; }
          .nf-brand-col { grid-column: 1 / -1; }
          .nf-nav-col { text-align: left; }
          .nf-contact-col { grid-column: 1 / -1; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch; }
          .nf-contact-col .nf-nav-col-title { grid-column: 1 / -1; }
          .nf-contact-card { grid-column: 1 / -1; }
          .nf-email-card { grid-column: 1 / -1; }

          /* Social: 4-col grid */
          .nf-social-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; width: 100%; margin-bottom: 22px; }
          .nf-social-icon { width: 100%; height: 40px; border-radius: 8px; background: transparent; }
          .nf-social-icon:hover { background: rgba(59,130,246,.08); border-color: var(--nf-blue-400); transform: none; box-shadow: none; }
          .nf-social-icon svg { width: 15px; height: 15px; }

          /* Bottom */
          .nf-bottom { text-align: center; padding: 16px 0 20px; flex-direction: column; gap: 10px; align-items: center; }
          .nf-bottom-right { flex-direction: column; gap: 8px; align-items: center; }
          .nf-desktop-only { display: none !important; }
          .nf-scroll-border { display: flex; }

          /* Form: icon-only submit on mobile */
          .nf-form-wrap { padding: 4px; gap: 2px; }
          .nf-submit-btn { width: 38px; height: 38px; padding: 0; border-radius: 50%; min-width: 38px; justify-content: center; }
          .nf-submit-btn span { display: none; }
          .nf-submit-btn svg { margin: 0; width: 15px; height: 15px; }
          .nf-input-icon { width: 34px; height: 34px; }
          .nf-form-wrap input[type="email"] { font-size: .8rem; padding: 8px 4px 8px 2px; }
          .nf-count-text { font-size: .74rem; text-align: center; }
        }

        /* Extra narrow (≤340px) */
        @media (max-width: 340px) {
          .nf-social-row { gap: 4px; }
          .nf-social-icon { height: 30px; border-radius: 6px; }
          .nf-social-icon svg { width: 12px; height: 12px; }
        }

        /* Narrow (≤300px) */
        @media (max-width: 300px) {
          .nf-main { grid-template-columns: 1fr; gap: 26px; }
          .nf-contact-col { grid-template-columns: 1fr; }
        }

        /* Entrance animation */
        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nf-footer, .nf-sc-wrap { animation: nf-fade-up .55s ease both; }
      `}</style>
    </>
  )
}
