// ============================================================
// FOOTER — v2.1.3 final
// Fixes vs previous:
//  - Logo: /logo.webp image + status dot (same as Navbar)
//  - Subscribe section: max-w-[1280px] + var(--container-pad) — aligned with body
//  - Autofill: -webkit-autofill override — no yellow/color background
//  - Email validation: empty/invalid → red border + red caret on form wrapper
//  - Subscribe button icon: paper-plane SVG (→)
//  - Ripple: contact cards + email card + all clickable elements
//  - Colors: CSS vars throughout
// Firebase TODO: onSubscriberCount() reads /subscribers/count from RTDB
// Firebase TODO: /status/presenceMode → CURRENT_STATUS (future version)
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { useRipple, RippleLayer } from '../ui/Ripple.jsx'
import SITE_CONFIG from '../../config/site.config.js'
import { subscribeEmail, onSubscriberCount } from '../../services/firebase.js'
import { toast } from '../../store/toastStore.js'

const LOGO_SRC = '/logo.webp'

// Status (same system as Navbar — Firebase controls in future)
const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active'  },
  busy:    { color: '#ef4444', label: 'Busy'    },
  away:    { color: '#f59e0b', label: 'Away'    },
  offline: { color: '#6b7280', label: 'Offline' },
}
const CURRENT_STATUS = 'active'

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
  { label: 'Terms of Use',   path: '/terms' },
  { label: 'Sitemap',        path: '/sitemap.xml', external: true },
]

// ── Animated subscriber counter ───────────────────────────────
function AnimatedCount({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  useEffect(() => {
    if (!inView) return
    const start = Math.max(0, target - 300)
    const t0 = performance.now()
    const dur = 1800
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1)
      setCount(Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <strong ref={ref}>{count.toLocaleString()}</strong>
}

// ── Social icon (inline SVG) ──────────────────────────────────
const SocialIcon = ({ href, label, children }) => {
  const { ripples, createRipple } = useRipple()
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onClick={createRipple}
      className="nf-si relative overflow-hidden" title={label} aria-label={label}>
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.25)" />
      <svg viewBox="0 0 24 24">{children}</svg>
    </a>
  )
}

// ── Footer ────────────────────────────────────────────────────
export function Footer() {
  const [email,       setEmail      ] = useState('')
  const [emailError,  setEmailError ] = useState(false)
  const [subCount,    setSubCount   ] = useState(2847)
  const [busy,        setBusy       ] = useState(false)
  const [success,     setSuccess    ] = useState(false)
  const year = new Date().getFullYear()
  const status = STATUS_CONFIG[CURRENT_STATUS]

  // Contact card ripple
  const { ripples: ccRipples, createRipple: ccRipple } = useRipple()
  const { ripples: ecRipples, createRipple: ecRipple } = useRipple()
  const { ripples: stRipples, createRipple: stRipple } = useRipple()

  // Firebase RTDB subscriber count
  useEffect(() => {
    const unsub = onSubscriberCount((n) => { if (n > 0) setSubCount(n) })
    return unsub
  }, [])

  const validate = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

  const handleSubscribe = async (e) => {
    e?.preventDefault()
    if (!email.trim() || !validate(email)) {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 2500)
      return
    }
    setEmailError(false)
    setBusy(true)
    try {
      const res = await subscribeEmail(email.trim())
      if (res.duplicate) {
        toast.info('Already subscribed', 'This email is already in the list!')
      } else {
        setSuccess(true)
        setEmail('')
        setSubCount(c => c + 1)
        setTimeout(() => setSuccess(false), 3500)
      }
    } catch {
      toast.error('Failed', 'Could not subscribe. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const scrollTop = (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <>
      {/* ══ STAY CONNECTED — aligned with body ═════════════════ */}
      <div className="nf-sc-outer">
        <div className="nf-sc-inner">
          <div className="nf-sc">
            {/* Left */}
            <div className="nf-sc-left">
              <h2>Stay <em>Connected</em><br />with My Work</h2>
              <p>Follow my journey · Updates on new projects &amp; posts</p>
            </div>

            {/* Right — form */}
            <div className="nf-sc-right">
              {!success ? (
                <form onSubmit={handleSubscribe} noValidate>
                  <div className={`nf-form ${emailError ? 'nf-form-err' : ''}`}>
                    {/* email icon */}
                    <div className="nf-fi" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M2 7l8.5 6.5a2 2 0 002.5 0L22 7"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder={emailError ? 'Enter a valid email…' : 'Enter your email'}
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(false) }}
                      autoComplete="email"
                      required
                      className="nf-email-input"
                    />
                    <button type="submit" className="nf-sub-btn" disabled={busy}>
                      {busy
                        ? <span className="nf-spin" />
                        : <>
                            {/* Paper-plane icon */}
                            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                            <span>Subscribe</span>
                          </>
                      }
                    </button>
                  </div>
                </form>
              ) : (
                <div className="nf-success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Subscribed! Check your inbox.
                </div>
              )}

              {/* Count */}
              <p className="nf-count-row">
                <span className="nf-pulse-dot" />
                <AnimatedCount target={subCount} /> curious minds already subscribed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER SHELL ════════════════════════════════════════ */}
      <footer className="nf-footer">
        <div className="nf-wrap">

          {/* ── 4-col grid ─────────────────────────────────── */}
          <div className="nf-grid">

            {/* Brand */}
            <div className="nf-brand">
              <Link to="/" className="nf-logo-row">
                <div className="nf-logo-box">
                  <img src={LOGO_SRC} alt="Muhtasim" />
                  <span className="nf-logo-dot" style={{ background: status.color }} title={status.label} />
                </div>
                <div>
                  <div className="nf-logo-name">{SITE_CONFIG.owner.displayName}</div>
                  <div className="nf-logo-sub">@mdturzo999 · Portfolio</div>
                </div>
              </Link>
              <p className="nf-desc">{SITE_CONFIG.seo.defaultDescription}</p>

              {/* 8 Social icons */}
              <div className="nf-socials">
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
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.629 2.697 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 011.228.017 10.435 10.435 0 00-.162-1.588c-.2-1.043-.82-1.567-1.845-1.559-.76.006-1.34.359-1.727 1.049l-1.822-.964C8.17 6.387 9.317 5.666 10.7 5.595c1.79-.092 3.303.485 4.043 1.544.571.824.845 2.01.845 3.633v.038c.484.143.926.35 1.32.618 1.07.719 1.818 1.799 2.111 3.027.567 2.364-.099 5.126-2.21 7.17C15.151 23.261 13.434 24 12.186 24z"/>
                </SocialIcon>
                <SocialIcon href={SITE_CONFIG.social.tiktok} label="TikTok">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"/>
                </SocialIcon>
              </div>

              {/* Location */}
              <div className="nf-location">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                {SITE_CONFIG.owner.location}
              </div>
            </div>

            {/* Explore */}
            <div className="nf-col">
              <div className="nf-col-title">Explore</div>
              <ul className="nf-col-list">
                {EXPLORE_LINKS.map(({ label, path }) => (
                  <li key={path}><Link to={path} className="nf-col-link">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="nf-col">
              <div className="nf-col-title">Legal</div>
              <ul className="nf-col-list">
                {LEGAL_LINKS.map(({ label, path, external }) => (
                  <li key={path}>
                    {external
                      ? <a href={path} target="_blank" rel="noopener noreferrer" className="nf-col-link">{label}</a>
                      : <Link to={path} className="nf-col-link">{label}</Link>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="nf-contact">
              <div className="nf-col-title">Get in Touch</div>

              {/* Collaborate card */}
              <Link to="/contact" className="nf-cc relative overflow-hidden" onClick={ccRipple}>
                <RippleLayer ripples={ccRipples} color="rgba(255,255,255,0.2)" />
                <div className="nf-cc-badge">Open for work</div>
                <div className="nf-cc-h">Let's Collaborate</div>
                <div className="nf-cc-sub">Have a project in mind? I'd love to hear about it.</div>
                <span className="nf-cc-cta">
                  Visit Contact Page
                  <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
                </span>
              </Link>

              {/* Email card */}
              <a href={`mailto:${SITE_CONFIG.owner.email}`} className="nf-email relative overflow-hidden" onClick={ecRipple}>
                <RippleLayer ripples={ecRipples} color="rgba(59,130,246,0.15)" />
                <div className="nf-email-ico">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <div className="nf-email-lbl">Email me</div>
                  <div className="nf-email-val">{SITE_CONFIG.owner.email}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Mobile scroll btn */}
          <div className="nf-sb-mobile">
            <button onClick={scrollTop} className="nf-scroll-btn" aria-label="Back to top">
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path d="M10 4l-6 6h4v6h4v-6h4l-6-6z"/></svg>
            </button>
          </div>

          {/* Bottom bar */}
          <div className="nf-bottom">
            <p className="nf-copy">© {year} <Link to="/">{SITE_CONFIG.siteName}</Link>. All rights reserved.</p>
            <div className="nf-bottom-r">
              <span className="nf-ver">{SITE_CONFIG.version}</span>
              <button onClick={e => { stRipple(e); scrollTop(e) }}
                className="nf-scroll-btn relative overflow-hidden nf-desktop-only" aria-label="Back to top">
                <RippleLayer ripples={stRipples} color="rgba(255,255,255,0.25)" />
                <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path d="M10 4l-6 6h4v6h4v-6h4l-6-6z"/></svg>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* ══ STYLES ══════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        /* CSS vars — footer scope */
        .nf-sc-outer, .nf-footer {
          --nf-bg:   var(--bg-page, #020617);
          --nf-s1:   var(--bg-surface, #0f172a);
          --nf-s2:   var(--bg-surface-2, #1e293b);
          --nf-s3:   var(--bg-surface-3, #334155);
          --nf-t1:   var(--text-primary, #f8fafc);
          --nf-t2:   var(--text-secondary, #94a3b8);
          --nf-t3:   var(--text-tertiary, #64748b);
          --nf-b:    var(--border-color, #1e293b);
          --nf-ac:   var(--accent-primary, #3b82f6);
          --nf-ach:  var(--accent-hover, #60a5fa);
          --nf-al:   var(--accent-light, rgba(59,130,246,0.12));
          --nf-err:  var(--clr-error, #ef4444);
          font-family: 'Sora', var(--font-body, sans-serif);
        }

        /* ══ STAY CONNECTED ══ */
        /* Outer: full bleed background (transparent, footer bg handles it) */
        /* Inner: aligns with body content */
        .nf-sc-outer { padding: 0 var(--container-pad); }
        .nf-sc-inner { max-width: 1280px; margin: 0 auto; }
        .nf-sc {
          position: relative; overflow: hidden;
          border-radius: 24px 24px 0 0;
          background: linear-gradient(135deg, var(--clr-primary-700,#1d4ed8) 0%, var(--clr-primary-500,#3b82f6) 60%, #38bdf8 100%);
          padding: clamp(28px,5vw,52px) clamp(24px,5vw,60px);
          display: flex; align-items: center; justify-content: space-between;
          gap: 28px; flex-wrap: wrap;
        }
        .nf-sc::after { content:''; position:absolute; top:-60px; right:-60px; width:260px; height:260px; border-radius:50%; background:rgba(255,255,255,.06); pointer-events:none; }
        .nf-sc-left { flex:1 1 280px; min-width:240px; position:relative; z-index:1; }
        .nf-sc-left h2 { font-family:'DM Serif Display',Georgia,serif; font-size:clamp(1.4rem,3.2vw,2.3rem); color:#fff; line-height:1.15; }
        .nf-sc-left h2 em { font-style:italic; opacity:.85; }
        .nf-sc-left p { font-size:.8rem; color:rgba(255,255,255,.65); margin-top:8px; }
        .nf-sc-right { flex:0 1 420px; min-width:260px; display:flex; flex-direction:column; gap:10px; position:relative; z-index:1; }

        /* Form */
        .nf-form {
          background:rgba(255,255,255,.12); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          border:1.5px solid rgba(255,255,255,.22); border-radius:100px; padding:5px;
          display:flex; align-items:center; gap:4px;
          transition:border-color .25s, box-shadow .25s;
        }
        .nf-form:focus-within { border-color:rgba(255,255,255,.55); box-shadow:0 0 0 4px rgba(255,255,255,.07); }
        .nf-form-err { border-color:var(--nf-err) !important; box-shadow:0 0 0 4px rgba(239,68,68,.15) !important; }
        .nf-form-err .nf-email-input { color: var(--nf-err) !important; caret-color: var(--nf-err); }
        .nf-form-err .nf-email-input::placeholder { color: rgba(239,68,68,.7); }

        .nf-fi { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.18); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#fff; }
        .nf-fi svg { display:block; }

        .nf-email-input {
          flex:1; min-width:100px; padding:10px 4px; border:none; background:transparent;
          color:#fff; font-family:'Sora',sans-serif; font-size:.88rem; outline:none;
          caret-color:#fff; transition:color .2s;
        }
        .nf-email-input::placeholder { color:rgba(255,255,255,.5); }

        /* Prevent Google/browser autofill yellow background */
        .nf-email-input:-webkit-autofill,
        .nf-email-input:-webkit-autofill:hover,
        .nf-email-input:-webkit-autofill:focus,
        .nf-email-input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          -webkit-text-fill-color: #fff !important;
          background-color: transparent !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        .nf-sub-btn {
          display:inline-flex; align-items:center; gap:7px;
          background:#fff; color:var(--clr-primary-700,#1d4ed8);
          font-family:'Sora',sans-serif; font-size:.85rem; font-weight:600;
          padding:11px 18px; border-radius:100px; border:none; cursor:pointer;
          transition:all .25s; white-space:nowrap; flex-shrink:0;
        }
        .nf-sub-btn:hover { transform:translateY(-1px); box-shadow:0 6px 22px rgba(0,0,0,.18); }
        .nf-sub-btn:active { transform:translateY(0); }
        .nf-sub-btn:disabled { opacity:.7; cursor:default; }
        .nf-spin { width:13px; height:13px; border-radius:50%; border:2px solid rgba(30,64,175,.3); border-top-color:var(--clr-primary-700,#1d4ed8); animation:nf-spin .7s linear infinite; flex-shrink:0; }
        @keyframes nf-spin { to{transform:rotate(360deg)} }

        .nf-success { display:flex; align-items:center; gap:8px; color:#fff; font-weight:600; font-size:.9rem; background:rgba(255,255,255,.12); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.22); border-radius:100px; padding:12px 22px; justify-content:center; }
        .nf-count-row { font-size:.8rem; color:rgba(255,255,255,.65); display:flex; align-items:center; gap:7px; }
        .nf-count-row strong { color:#fff; font-weight:700; }
        .nf-pulse-dot { width:7px; height:7px; border-radius:50%; background:#4ade80; animation:nf-pulse 2s infinite; flex-shrink:0; }
        @keyframes nf-pulse { 0%,100%{box-shadow:0 0 0 2px rgba(74,222,128,.35)} 50%{box-shadow:0 0 0 5px rgba(74,222,128,0)} }

        /* ══ FOOTER ══ */
        .nf-footer { background:var(--nf-bg); color:var(--nf-t1); padding:0 var(--container-pad); }
        .nf-wrap { max-width:1280px; margin:0 auto; }

        /* Grid */
        .nf-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.6fr; gap:40px 32px; padding:52px 0 44px; border-bottom:1px solid var(--nf-b); }

        /* Brand */
        .nf-logo-row { display:flex; align-items:center; gap:12px; text-decoration:none; margin-bottom:14px; }
        .nf-logo-box { width:42px; height:42px; border-radius:14px; overflow:hidden; flex-shrink:0; position:relative; border:1px solid var(--nf-b); }
        .nf-logo-box img { width:100%; height:100%; object-fit:cover; display:block; }
        .nf-logo-dot { position:absolute; bottom:-2px; right:-2px; width:13px; height:13px; border-radius:50%; border:2px solid var(--nf-bg); pointer-events:none; }
        .nf-logo-name { font-family:var(--font-display,'Sora',sans-serif); font-weight:700; font-size:1.05rem; color:var(--nf-t1); }
        .nf-logo-sub { font-size:.7rem; color:var(--nf-t3); }
        .nf-desc { font-size:.83rem; line-height:1.7; color:var(--nf-t2); margin-bottom:20px; max-width:280px; }

        /* Social icons */
        .nf-socials { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
        .nf-si { width:30px; height:30px; border-radius:9px; background:var(--nf-s2); border:1px solid var(--nf-s3); display:flex; align-items:center; justify-content:center; color:var(--nf-t2); text-decoration:none; transition:all .25s; }
        .nf-si:hover { background:var(--nf-ac); border-color:var(--nf-ac); color:#fff; transform:translateY(-2px); }
        .nf-si svg { width:13px; height:13px; fill:currentColor; display:block; }

        /* Location */
        .nf-location { display:flex; align-items:center; gap:6px; font-size:.78rem; color:var(--nf-t3); }
        .nf-location svg { fill:var(--nf-ac); flex-shrink:0; }

        /* Nav cols */
        .nf-col-title { font-size:.67rem; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:var(--nf-t3); margin-bottom:16px; }
        .nf-col-list { display:flex; flex-direction:column; gap:10px; list-style:none; }
        .nf-col-link { font-size:.84rem; color:var(--nf-t2); text-decoration:none; transition:all .22s; display:inline-block; }
        .nf-col-link:hover { color:var(--nf-ac); padding-left:4px; }

        /* Contact cards */
        .nf-cc {
          display:block; text-decoration:none;
          background:linear-gradient(135deg, var(--clr-primary-600,#2563eb), var(--clr-primary-700,#1d4ed8));
          border-radius:14px; padding:18px 20px; margin-bottom:10px;
          transition:all .25s; box-shadow:0 4px 18px rgba(37,99,235,.22);
        }
        .nf-cc:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(37,99,235,.32); }
        .nf-cc-badge { font-size:.65rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.65); margin-bottom:5px; }
        .nf-cc-h { font-size:1rem; font-weight:700; color:#fff; margin-bottom:4px; }
        .nf-cc-sub { font-size:.75rem; color:rgba(255,255,255,.65); margin-bottom:12px; }
        .nf-cc-cta { display:inline-flex; align-items:center; gap:5px; font-size:.78rem; font-weight:600; color:#fff; }
        .nf-cc-cta svg { transition:transform .25s; }
        .nf-cc:hover .nf-cc-cta svg { transform:translateX(3px); }

        .nf-email {
          display:flex; align-items:center; gap:12px; text-decoration:none;
          background:var(--nf-s1); border:1px solid var(--nf-b); border-radius:14px; padding:14px 18px;
          transition:all .25s;
        }
        .nf-email:hover { border-color:var(--nf-ac); background:rgba(59,130,246,.05); }
        .nf-email-ico { width:36px; height:36px; border-radius:10px; background:rgba(59,130,246,.1); border:1px solid rgba(59,130,246,.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .25s; color:var(--nf-ac); }
        .nf-email:hover .nf-email-ico { background:var(--nf-ac); border-color:var(--nf-ac); color:#fff; }
        .nf-email-lbl { font-size:.65rem; font-weight:700; color:var(--nf-t3); letter-spacing:.1em; text-transform:uppercase; }
        .nf-email-val { font-size:.8rem; font-weight:500; color:var(--nf-t1); }

        /* Bottom */
        .nf-bottom { display:flex; align-items:center; justify-content:space-between; padding:18px 0 22px; gap:16px; flex-wrap:wrap; }
        .nf-copy { font-size:.78rem; color:var(--nf-t3); }
        .nf-copy a { color:var(--nf-t2); font-weight:500; text-decoration:none; transition:color .2s; }
        .nf-copy a:hover { color:var(--nf-t1); }
        .nf-bottom-r { display:flex; align-items:center; gap:12px; }
        .nf-ver { font-size:.67rem; font-weight:600; letter-spacing:.06em; background:var(--nf-s2); border:1px solid var(--nf-s3); color:var(--nf-t3); padding:3px 10px; border-radius:100px; }
        .nf-scroll-btn { width:40px; height:40px; border-radius:50%; background:var(--nf-ac); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#fff; transition:all .25s; box-shadow:0 4px 14px rgba(37,99,235,.28); }
        .nf-scroll-btn:hover { background:var(--clr-primary-700,#1d4ed8); transform:translateY(-2px); }
        .nf-sb-mobile { display:none; justify-content:center; margin-top:-22px; }
        .nf-sb-mobile .nf-scroll-btn { box-shadow:0 2px 12px rgba(37,99,235,.25), 0 0 0 4px var(--nf-bg); }

        /* ══ RESPONSIVE ══ */
        @media (max-width:1024px) {
          .nf-grid { grid-template-columns:1.5fr 1fr 1fr; }
          .nf-brand { grid-column:1/-1; }
          .nf-contact { grid-column:1/-1; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
          .nf-contact .nf-col-title { grid-column:1/-1; margin-bottom:0; }
          .nf-cc { margin-bottom:0; }
          .nf-desc { max-width:100%; }
        }
        @media (max-width:860px) {
          .nf-grid { grid-template-columns:1fr 1fr; }
          .nf-brand { grid-column:1/-1; }
          .nf-contact { grid-column:1/-1; }
        }
        @media (max-width:600px) {
          .nf-sc { flex-direction:column; padding:28px 20px; gap:18px; }
          .nf-sc-left, .nf-sc-right { flex:1 1 auto; min-width:100%; }
          .nf-grid { grid-template-columns:1fr 1fr; padding:36px 0 30px; gap:24px 16px; }
          .nf-brand { grid-column:1/-1; }
          .nf-contact { grid-column:1/-1; grid-template-columns:1fr 1fr; }
          .nf-contact .nf-cc, .nf-contact .nf-email { grid-column:1/-1; }
          .nf-socials { display:grid; grid-template-columns:repeat(4,1fr); width:100%; gap:6px; }
          .nf-si { width:100%; height:38px; border-radius:8px; }
          .nf-bottom { flex-direction:column; align-items:center; text-align:center; padding:16px 0 18px; }
          .nf-desktop-only { display:none !important; }
          .nf-sb-mobile { display:flex; }
          /* Subscribe: icon-only btn on mobile */
          .nf-sub-btn { width:38px; height:38px; padding:0; border-radius:50%; min-width:38px; justify-content:center; }
          .nf-sub-btn span { display:none; }
          .nf-fi { width:32px; height:32px; }
          .nf-email-input { font-size:.8rem; padding:8px 4px; }
        }
        @media (max-width:300px) {
          .nf-grid { grid-template-columns:1fr; }
          .nf-contact { grid-template-columns:1fr; }
        }
      `}</style>
    </>
  )
}