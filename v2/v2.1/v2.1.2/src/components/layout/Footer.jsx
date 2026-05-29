// ============================================================
// FOOTER — v2.1.2
// Changes: name → "Md Turzo", no border on social pills (PC),
//   tab social pills with bg+border+radius, 2/3 col hover text only,
//   tab/mobile arrow always visible, contact order: location→card→email,
//   subscribe count same font-size, light mode support,
//   input button inside + only input border, ripple on contact card
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight, faArrowUp, faLocationDot,
  faEnvelope, faPaperPlane, faInbox, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import SITE_CONFIG from '../../config/site.config.js'
import { subscribeEmail, onSubscriberCount } from '../../services/firebase.js'
import { toast } from '../../store/toastStore.js'
import { useRipple, RippleLayer } from '../ui/Ripple.jsx'

const SOCIALS = [
  { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: '@mdturzo999',     cls: '#ef4444' },
  { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'mdturzo999',      cls: '#1877f2' },
  { icon: faXTwitter,  url: SITE_CONFIG.social.twitter,   label: '@mdturzo999',     cls: '#e2e8f0' },
  { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: '@mdturzo999',     cls: '#e4405f' },
  { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'muhtasim-rahman', cls: '#a78bfa' },
  { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'mdturzo999',      cls: '#0a66c2' },
  { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: '@mdturzo16',      cls: '#229ed9' },
  { icon: faTiktok,    url: SITE_CONFIG.social.tiktok,    label: '@mdturzo16',      cls: '#e2e8f0' },
]

const NAV_COL1 = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Feed',     path: '/feed' },
  { label: 'Contact',  path: '/contact' },
  { label: 'Profile',  path: '/profile' },
]

const NAV_COL2 = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Cookies Policy', path: '/cookies-policy' },
  { label: 'Admin Panel',    path: '/admin' },
  { label: '404 Page',       path: '/404' },
  { label: 'Login',          path: '/login' },
  { label: 'Signup',         path: '/signup' },
]

// ── Animated counter ─────────────────────────────────────────
function AnimatedCount({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const startTime = performance.now()
    function tick(now) {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref} className="footer-count-num">
      {count.toLocaleString('en-US')}
    </span>
  )
}

// ── Subscribe button ─────────────────────────────────────────
function SubBtn({ onClick, loading }) {
  const { ripples, createRipple } = useRipple()
  const handle = (e) => { if (loading) return; createRipple(e); onClick() }
  return (
    <button onClick={handle} disabled={loading}
      className="relative overflow-hidden flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold flex-shrink-0 transition-colors disabled:opacity-60">
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      {loading
        ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        : <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
      }
      {loading ? '...' : 'Join'}
    </button>
  )
}

// ── Footer Nav Link ───────────────────────────────────────────
function FooterLink({ label, path }) {
  return (
    <Link to={path}
      className="footer-nav-link group">
      <FontAwesomeIcon icon={faChevronRight}
        className="nav-arrow text-[9px] flex-shrink-0" />
      <span className="nav-label">{label}</span>
    </Link>
  )
}

// ── Back to top ───────────────────────────────────────────────
function BackToTop({ mobile }) {
  const { ripples, createRipple } = useRipple()
  const onClick = (e) => { createRipple(e); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const base = "relative overflow-hidden flex items-center justify-center rounded-full transition-all duration-300 footer-back-top-btn"
  if (mobile) return (
    <button onClick={onClick} className={`${base} w-11 h-11 shadow-lg`} aria-label="Back to top">
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
    </button>
  )
  return (
    <button onClick={onClick} className={`${base} w-10 h-10`} aria-label="Back to top">
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
    </button>
  )
}

// ── Let's Connect Card with ripple ───────────────────────────
function ConnectCard() {
  const { ripples, createRipple } = useRipple()
  return (
    <Link to="/contact" onClick={createRipple}
      className="relative overflow-hidden connect-card group">
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.18)" />
      <div className="connect-card-icon">
        <FontAwesomeIcon icon={faEnvelope} className="text-base" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="connect-card-title group-hover:text-[var(--footer-primary-bright)] transition-colors">Let's Connect</p>
        <p className="connect-card-caption">Open to projects & collaborations</p>
      </div>
      <FontAwesomeIcon icon={faArrowRight} className="connect-card-arrow group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

// ── Footer ────────────────────────────────────────────────────
export function Footer() {
  const [email, setEmail] = useState('')
  const [subCount, setSubCount] = useState(2847)
  const [subscribing, setSubscribing] = useState(false)
  const year = new Date().getFullYear()

  // Live subscriber count from RTDB
  useEffect(() => {
    const unsub = onSubscriberCount((count) => {
      if (count > 0) setSubCount(count)
    })
    return unsub
  }, [])

  const handleSubscribe = async () => {
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) return
    setSubscribing(true)
    try {
      const result = await subscribeEmail(trimmed)
      if (result.duplicate) {
        toast.info('Already subscribed', 'This email is already in the list!')
      } else {
        toast.success('Subscribed!', 'Welcome to the list 🎉')
        setEmail('')
      }
    } catch (e) {
      toast.error('Failed', 'Could not subscribe. Try again.')
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <footer className="site-footer">
      {/* Ambient orbs */}
      <div aria-hidden className="footer-orb footer-orb--left" />
      <div aria-hidden className="footer-orb footer-orb--right" />
      {/* Top gradient line */}
      <div aria-hidden className="footer-top-line" />

      {/* ── Main grid ─────────────────────────────────────── */}
      <div className="footer-container">
        {/* COL 1 — Brand */}
        <div className="footer-col-brand">
          <div>
            {/* Logo */}
            <Link to="/" className="footer-logo-row">
              <div className="footer-logo-img">
                <span>T</span>
                <span className="footer-logo-dot" />
              </div>
              <span className="footer-brand-name">{SITE_CONFIG.navName}</span>
            </Link>

            <p className="footer-desc">{SITE_CONFIG.seo.defaultDescription}</p>
          </div>

          {/* Social pills — desktop */}
          <div className="social-pill-grid">
            {SOCIALS.map(({ icon, url, label, cls }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                className="social-pill group">
                <FontAwesomeIcon icon={icon} style={{ color: cls, fontSize: 13 }} />
                <span className="social-pill-label">{label}</span>
              </a>
            ))}
          </div>

          {/* Social icon-only — mobile */}
          <div className="social-icon-only-row">
            {SOCIALS.map(({ icon, url, label, cls }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="social-icon-circle">
                <FontAwesomeIcon icon={icon} style={{ color: cls, fontSize: 14 }} />
              </a>
            ))}
          </div>
        </div>

        {/* ── NAV WRAPPER (col 2+3) ─────────────────────── */}
        <div className="footer-nav-wrapper">
          <div className="footer-col-nav">
            <h4 className="footer-nav-title">Navigate</h4>
            <div className="footer-nav-underline" />
            <div className="footer-nav-links">
              {NAV_COL1.map(item => <FooterLink key={item.path} {...item} />)}
            </div>
          </div>
          <div className="footer-col-nav">
            <h4 className="footer-nav-title">Resources</h4>
            <div className="footer-nav-underline" />
            <div className="footer-nav-links">
              {NAV_COL2.map(item => <FooterLink key={item.path} {...item} />)}
            </div>
          </div>
        </div>

        {/* COL 4 — Subscribe + Contact */}
        <div className="footer-col-subscribe">
          {/* Subscribe block */}
          <div className="subscribe-block">
            <div className="subscribe-title-row">
              <FontAwesomeIcon icon={faInbox} className="subscribe-icon" />
              <span className="subscribe-title">Stay Connected</span>
            </div>
            <p className="subscribe-muted">
              Drop your email for occasional updates — no spam, just meaningful content.
            </p>
            {/* Input with button inside */}
            <div className="subscribe-input-wrap">
              <input type="email" placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                className="subscribe-input" />
              <SubBtn onClick={handleSubscribe} loading={subscribing} />
            </div>
            <div className="subscriber-count-line">
              <AnimatedCount target={subCount} />
              <span>curious minds already subscribed</span>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Contact category */}
          <div className="contact-category">
            {/* Location — FIRST, above card */}
            <div className="contact-location-line">
              <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
              <span>{SITE_CONFIG.owner.location}</span>
            </div>

            {/* Let's Connect card — compact, clickable */}
            <ConnectCard />

            {/* Email — below card */}
            <a href={`mailto:${SITE_CONFIG.owner.email}`}
              className="contact-email-row">
              <FontAwesomeIcon icon={faPaperPlane} className="email-icon" />
              <span>{SITE_CONFIG.owner.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div className="footer-bottom">
        {/* Mobile scroll-to-top */}
        <div className="footer-top-btn-mobile">
          <BackToTop mobile />
        </div>

        <span className="footer-copyright">
          &copy; {year}{' '}
          <Link to="/" className="footer-copyright-link">{SITE_CONFIG.siteName}</Link>.
          {' '}All rights reserved.
        </span>

        <div className="footer-bottom-right">
          <span className="version-badge">
            <span className="version-dot" />
            {SITE_CONFIG.version}
          </span>
          <div className="footer-top-btn-desktop">
            <BackToTop />
          </div>
        </div>
      </div>

      {/* ── Footer Styles ─────────────────────────────────── */}
      <style>{`
        /* ── CSS Variables (dark default) ── */
        :root,
        [data-theme="dark"] {
          --footer-bg: #0b0f1a;
          --footer-surface: #131a2b;
          --footer-surface2: #1a2332;
          --footer-border: rgba(255,255,255,0.06);
          --footer-border-solid: #1e2a3a;
          --footer-text: #e2e8f0;
          --footer-text2: #94a3b8;
          --footer-text3: #64748b;
          --footer-primary: #3b82f6;
          --footer-primary-bright: #60a5fa;
          --footer-accent: #8b5cf6;
          --footer-orb-opacity: 0.07;
        }

        /* ── Light mode ── */
        [data-theme="light"] {
          --footer-bg: #eef2f7;
          --footer-surface: #dce4ee;
          --footer-surface2: #cdd6e3;
          --footer-border: rgba(0,0,0,0.07);
          --footer-border-solid: #c8d4e2;
          --footer-text: #1e293b;
          --footer-text2: #475569;
          --footer-text3: #64748b;
          --footer-primary: #2563eb;
          --footer-primary-bright: #1d4ed8;
          --footer-accent: #7c3aed;
          --footer-orb-opacity: 0.04;
        }

        /* ── Footer base ── */
        .site-footer {
          background: var(--footer-bg);
          color: var(--footer-text);
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--footer-border-solid);
        }
        .footer-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: var(--footer-orb-opacity);
          pointer-events: none;
          z-index: 0;
        }
        .footer-orb--left  { width:380px; height:380px; background:#3b82f6; top:-120px; left:-80px; }
        .footer-orb--right { width:300px; height:300px; background:#8b5cf6; bottom:-80px; right:-60px; }
        .footer-top-line {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; max-width: 800px; height: 1px; pointer-events: none;
          background: linear-gradient(90deg,transparent,rgba(96,165,250,0.55) 30%,rgba(139,92,246,0.55) 70%,transparent);
        }

        /* ── Grid ── */
        .footer-container {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 64px 28px 0;
          display: grid;
          grid-template-columns: 1.2fr 0.85fr 0.85fr 1.2fr;
          gap: 40px 32px;
          align-items: start;
        }
        .footer-nav-wrapper { display: contents; }

        /* ── Col 1 — Brand ── */
        .footer-col-brand { display:flex; flex-direction:column; gap:18px; }
        .footer-logo-row {
          display: inline-flex; align-items: center; gap: 11px;
          text-decoration: none; margin-bottom: 12px;
        }
        .footer-logo-img {
          position: relative; width:42px; height:42px; border-radius:10px;
          background: linear-gradient(135deg,#6366f1,#3b82f6);
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-weight:700; font-size:19px; flex-shrink:0;
        }
        .footer-logo-dot {
          position:absolute; bottom:-3px; right:-3px;
          width:13px; height:13px; border-radius:50%;
          background:var(--clr-success,#22c55e);
          border:2px solid var(--footer-bg);
        }
        .footer-brand-name {
          font-size:18px; font-weight:700; letter-spacing:-0.3px;
          color:var(--footer-text); white-space:nowrap;
          font-family: var(--font-mono, monospace);
        }
        .footer-desc {
          color:var(--footer-text2); font-size:13.5px; line-height:1.7; max-width:300px;
        }

        /* ── Social pills ── */
        .social-pill-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:4px; }
        .social-pill {
          display:inline-flex; align-items:center; gap:7px; padding:7px 12px;
          border-radius:9999px;
          /* PC: NO border */
          border: none;
          color:var(--footer-text2); text-decoration:none;
          font-size:12px; font-weight:500;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          white-space:nowrap; background:transparent;
        }
        .social-pill-label { color:var(--footer-text2); }
        .social-pill:hover {
          background:var(--footer-primary); color:#fff;
          transform:translateY(-2px); box-shadow:0 6px 16px rgba(59,130,246,0.35);
        }
        .social-pill:hover .social-pill-label { color:#fff; }

        /* Social icon-only (mobile) */
        .social-icon-only-row { display:none; flex-wrap:wrap; gap:8px; margin-top:4px; }
        .social-icon-circle {
          width:38px; height:38px; border-radius:50%;
          background:var(--footer-surface); border:1px solid var(--footer-border-solid);
          display:flex; align-items:center; justify-content:center;
          text-decoration:none; transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .social-icon-circle:hover {
          background:var(--footer-primary); border-color:var(--footer-primary);
          transform:translateY(-3px); box-shadow:0 8px 18px rgba(59,130,246,0.4);
        }

        /* ── Nav cols ── */
        .footer-col-nav { display:flex; flex-direction:column; }
        .footer-nav-title {
          font-size:10px; font-weight:700; text-transform:uppercase;
          letter-spacing:0.14em; color:var(--footer-text3); margin-bottom:8px;
        }
        .footer-nav-underline {
          width:24px; height:1.5px; border-radius:99px;
          background:linear-gradient(90deg,#3b82f6,#8b5cf6); margin-bottom:10px;
        }
        .footer-nav-links { display:flex; flex-direction:column; gap:0; }

        /* ── Nav link: PC — arrow hidden, hover = text color only, no bg ── */
        .footer-nav-link {
          display:inline-flex; align-items:center; gap:0;
          text-decoration:none; color:var(--footer-text2);
          font-size:13.5px; font-weight:500; padding:6px 0;
          transition:color 0.2s; width:fit-content;
          border-radius:0; background:transparent;
        }
        .footer-nav-link .nav-arrow {
          color:var(--footer-primary-bright); opacity:0;
          transform:translateX(-6px); margin-right:0;
          transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink:0;
        }
        .footer-nav-link .nav-label {
          transition:transform 0.2s;
        }
        .footer-nav-link:hover {
          color:var(--footer-primary-bright);
          background:transparent !important;
        }
        .footer-nav-link:hover .nav-arrow {
          opacity:1; transform:translateX(0); margin-right:6px;
        }
        .footer-nav-link:hover .nav-label { transform:translateX(2px); }

        /* ── Col 4 — Subscribe ── */
        .footer-col-subscribe { display:flex; flex-direction:column; gap:16px; }
        .subscribe-block { display:flex; flex-direction:column; gap:10px; }
        .subscribe-title-row { display:flex; align-items:center; gap:8px; }
        .subscribe-icon { color:var(--footer-primary-bright); font-size:16px; }
        .subscribe-title { font-size:15px; font-weight:700; color:var(--footer-text); }
        .subscribe-muted { font-size:12.5px; color:var(--footer-text3); line-height:1.55; }

        .subscribe-input-wrap {
          display:flex; align-items:center;
          background:var(--footer-surface);
          border:1.5px solid var(--footer-border-solid);
          border-radius:9999px; padding:4px;
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .subscribe-input-wrap:focus-within {
          border-color:var(--footer-primary);
          box-shadow:0 0 0 4px rgba(59,130,246,0.12);
        }
        .subscribe-input {
          flex:1; background:transparent; border:none; outline:none;
          color:var(--footer-text); font-size:13.5px;
          padding:8px 4px 8px 14px; min-width:0; font-family:inherit;
        }
        .subscribe-input::placeholder { color:var(--footer-text3); }
        /* Autofill fix */
        .subscribe-input:-webkit-autofill,
        .subscribe-input:-webkit-autofill:focus {
          -webkit-box-shadow:0 0 0 1000px var(--footer-surface) inset !important;
          -webkit-text-fill-color:var(--footer-text) !important;
        }

        .subscriber-count-line {
          display:flex; align-items:center; gap:5px;
          font-size:12.5px; color:var(--footer-text3);
        }
        .footer-count-num {
          font-weight:800; font-size:12.5px;
          background:linear-gradient(135deg,#60a5fa,#a78bfa);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }

        .footer-divider {
          height:1px; background:var(--footer-border-solid);
        }

        /* ── Contact category ── */
        .contact-category { display:flex; flex-direction:column; gap:10px; }
        .contact-location-line {
          display:inline-flex; align-items:center; gap:6px;
          font-size:12px; color:var(--footer-text3);
        }
        .location-icon { color:var(--footer-primary-bright); font-size:12px; }

        /* Let's Connect card */
        .connect-card {
          display:flex; align-items:center; gap:12px;
          padding:12px 14px; border-radius:14px;
          background:var(--footer-surface);
          border:1px solid var(--footer-border-solid);
          text-decoration:none; transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          cursor:pointer;
        }
        .connect-card:hover {
          border-color:var(--footer-primary);
          box-shadow:0 4px 16px rgba(59,130,246,0.15);
          transform:translateY(-2px);
        }
        .connect-card-icon {
          width:36px; height:36px; border-radius:8px;
          background:rgba(59,130,246,0.15); color:var(--footer-primary-bright);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .connect-card-title {
          font-size:13.5px; font-weight:700; color:var(--footer-text);
          line-height:1.3;
        }
        .connect-card-caption {
          font-size:11.5px; color:var(--footer-text3); line-height:1.4;
        }
        .connect-card-arrow { color:var(--footer-text3); font-size:11px; }

        /* Email row */
        .contact-email-row {
          display:inline-flex; align-items:center; gap:8px;
          color:var(--footer-text2); font-size:12.5px;
          text-decoration:none; padding:4px 0;
          transition:color 0.2s;
        }
        .contact-email-row:hover { color:var(--footer-text); }
        .email-icon { color:var(--footer-primary-bright); font-size:13px; }

        /* ── Bottom bar ── */
        .footer-bottom {
          position:relative; z-index:2;
          max-width:1240px; margin:40px auto 0;
          padding:20px 28px;
          border-top:1px solid var(--footer-border-solid);
          display:flex; align-items:center; justify-content:space-between; gap:12px;
        }
        .footer-copyright { font-size:12.5px; color:var(--footer-text3); }
        .footer-copyright-link { color:var(--footer-text2); transition:color 0.2s; }
        .footer-copyright-link:hover { color:var(--footer-text); }
        .footer-bottom-right { display:flex; align-items:center; gap:12px; }

        .version-badge {
          display:inline-flex; align-items:center; gap:5px;
          padding:4px 10px; border-radius:9999px;
          background:var(--footer-surface); border:1px solid var(--footer-border-solid);
          font-size:11px; font-weight:600; color:var(--footer-text2);
          font-family:var(--font-mono,monospace); transition:border-color 0.2s;
        }
        .version-badge:hover { border-color:var(--footer-primary-bright); }
        .version-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; flex-shrink:0; }

        .footer-back-top-btn {
          background:var(--footer-surface); border:1px solid var(--footer-border-solid);
          color:var(--footer-text3);
        }
        .footer-back-top-btn:hover {
          background:var(--footer-primary); border-color:var(--footer-primary); color:#fff;
          box-shadow:0 4px 16px rgba(59,130,246,0.3);
        }

        .footer-top-btn-mobile { display:none; }
        .footer-top-btn-desktop { display:flex; }

        /* ────────────── TABLET (641–991px) ────────────── */
        @media (max-width: 991px) and (min-width: 641px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 28px 24px;
          }
          .footer-col-brand    { grid-row:1; grid-column:1; }
          .footer-col-subscribe{ grid-row:1; grid-column:2; }
          .footer-nav-wrapper  {
            display:flex; flex-direction:row; gap:20px;
            grid-column:1 / -1; grid-row:2;
          }
          .footer-col-nav { flex:1; }

          /* Tablet social pills: bg + border + radius=14px */
          .social-pill {
            background: var(--footer-surface) !important;
            border: 1px solid var(--footer-border-solid) !important;
            border-radius: 14px !important;
          }
          .social-pill:hover {
            background: var(--footer-primary) !important;
            border-color: var(--footer-primary) !important;
          }

          /* Tablet nav: 3-col grid, arrow always visible */
          .footer-nav-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;
          }
          .footer-nav-link { width:fit-content; }
          .footer-nav-link .nav-arrow {
            opacity:1 !important;
            transform:translateX(0) !important;
            margin-right:6px !important;
          }
          .footer-nav-link:hover { background:transparent !important; }
          .footer-nav-link .nav-label { transform:none !important; }
          .footer-nav-link:hover .nav-label { transform:none !important; }
        }

        /* ────────────── MOBILE (<641px) ────────────── */
        @media (max-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 24px 16px;
          }
          .footer-col-brand    { grid-row:1; grid-column:1 / -1; }
          .footer-col-subscribe{ grid-row:2; grid-column:1 / -1; }
          .footer-nav-wrapper  {
            display:flex; flex-direction:row; gap:12px;
            grid-column:1 / -1; grid-row:3;
          }
          .footer-col-nav { flex:1; }

          /* Mobile: icon only for social */
          .social-pill-grid { display:none; }
          .social-icon-only-row { display:flex; }

          /* Mobile nav: 3-col max, arrow always visible */
          .footer-nav-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;
          }
          .footer-nav-link { width:fit-content; font-size:12.5px; }
          .footer-nav-link .nav-arrow {
            opacity:1 !important;
            transform:translateX(0) !important;
            margin-right:5px !important;
          }
          .footer-nav-link:hover { background:transparent !important; }

          /* Mobile bottom bar */
          .footer-bottom { flex-wrap:wrap; padding-top:32px; margin-top:28px; }
          .footer-top-btn-mobile {
            display:block; position:absolute; top:-22px; left:50%; transform:translateX(-50%);
          }
          .footer-top-btn-desktop { display:none; }

          /* Center/justify content */
          .footer-container { text-align:left; }
          .footer-col-brand { align-items:flex-start; }
        }

        /* ────────────── DESKTOP only ────────────── */
        @media (min-width: 992px) {
          .footer-nav-wrapper { display:contents; }
          .social-pill { background:transparent; border:none; }
          .social-icon-only-row { display:none; }
        }
      `}</style>
    </footer>
  )
}
