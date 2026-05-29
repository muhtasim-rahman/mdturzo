// ============================================================
// FOOTER — v2.1.1 Complete Rewrite
// 4 columns: Brand(30%) | Navigate(20%) | Resources(20%) | Subscribe+Contact(30%)
// Social pills: desktop transparent, tablet with bg, mobile icons only
// Subscribe with animated count, contact card, location
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

// ── Animated counter ────────────────────────────────────────
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
    <span ref={ref} className="font-extrabold text-base"
      style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
      {count.toLocaleString('en-US')}
    </span>
  )
}

// ── Subscribe button with ripple ────────────────────────────
function SubBtn({ onClick }) {
  const { ripples, createRipple } = useRipple()
  const handle = (e) => { createRipple(e); onClick() }
  return (
    <button onClick={handle}
      className="relative overflow-hidden flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold flex-shrink-0 transition-colors">
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
      Join
    </button>
  )
}

// ── Nav link with arrow animation ──────────────────────────
function FooterLink({ label, path }) {
  return (
    <Link to={path}
      className="group flex items-center gap-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-1.5 w-fit">
      <FontAwesomeIcon icon={faChevronRight}
        className="text-[9px] text-[var(--accent-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0 mr-0 group-hover:mr-1.5" />
      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{label}</span>
    </Link>
  )
}

// ── Back to top ─────────────────────────────────────────────
function BackToTop({ mobile }) {
  const { ripples, createRipple } = useRipple()
  const onClick = (e) => { createRipple(e); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const base = "relative overflow-hidden flex items-center justify-center rounded-full border border-[var(--footer-border)] text-[var(--footer-text3)] hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-white transition-all duration-300"
  if (mobile) return (
    <button onClick={onClick} className={`${base} w-11 h-11 shadow-lg`}
      style={{ background: 'var(--footer-bg)' }} aria-label="Back to top">
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

// ── Footer ──────────────────────────────────────────────────
export function Footer() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [subCount] = useState(2847)
  const year = new Date().getFullYear()

  const handleSubscribe = () => {
    if (!email || !email.includes('@') || !email.includes('.')) return
    setEmail('')
    // TODO: call worker API
  }

  return (
    <footer style={{ background: 'var(--footer-bg, #0b0f1a)', color: 'var(--footer-text, #e2e8f0)', position:'relative', overflow:'hidden', borderTop:'1px solid var(--footer-border, rgba(255,255,255,0.06))' }}>

      {/* Ambient orbs */}
      <div aria-hidden style={{ position:'absolute', width:380, height:380, borderRadius:'50%', background:'#3b82f6', filter:'blur(100px)', opacity:0.06, top:-120, left:-80, pointerEvents:'none', zIndex:0 }} />
      <div aria-hidden style={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'#8b5cf6', filter:'blur(100px)', opacity:0.06, bottom:-80, right:-60, pointerEvents:'none', zIndex:0 }} />
      {/* Top gradient line */}
      <div aria-hidden style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'70%', maxWidth:800, height:1,
        background:'linear-gradient(90deg,transparent,rgba(96,165,250,0.6) 30%,rgba(139,92,246,0.6) 70%,transparent)', pointerEvents:'none' }} />

      {/* ── Main grid ─────────────────────────────────────── */}
      <div className="relative z-[2] max-w-[1240px] mx-auto px-7 pt-16 pb-0">
        <div className="footer-grid">

          {/* COL 1 — Brand */}
          <div className="footer-col-brand flex flex-col gap-5">
            <div>
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'linear-gradient(135deg,#6366f1,#3b82f6)' }}>
                  <span className="text-white font-bold text-lg">T</span>
                  {/* Green active dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--clr-success)] border-2 border-[var(--footer-bg,#0b0f1a)]" />
                </div>
                <div className="font-mono font-bold text-[18px]">
                  <span style={{ color:'#60a5fa' }}>@</span>
                  <span className="text-white">mdturzo999</span>
                </div>
              </Link>

              <p className="text-[13.5px] leading-[1.75] max-w-[280px]" style={{ color:'#94a3b8' }}>
                {SITE_CONFIG.seo.defaultDescription}
              </p>

              <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#64748b' }}>
                <FontAwesomeIcon icon={faLocationDot} style={{ color: '#60a5fa' }} className="text-xs" />
                <span>{SITE_CONFIG.owner.location}</span>
              </div>
            </div>

            {/* Social pills — desktop/tablet (transparent desktop, bg on tablet) */}
            <div className="social-pill-grid">
              {SOCIALS.map(({ icon, url, label, cls }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                  className="social-pill group">
                  <FontAwesomeIcon icon={icon} style={{ color: cls, fontSize: 13 }} />
                  <span className="text-[12px] font-medium truncate" style={{ color:'#94a3b8' }}>{label}</span>
                </a>
              ))}
            </div>

            {/* Social icon-only — mobile */}
            <div className="social-icon-row">
              {SOCIALS.map(({ icon, url, label, cls }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="social-icon-btn">
                  <FontAwesomeIcon icon={icon} style={{ color: cls, fontSize: 14 }} />
                </a>
              ))}
            </div>
          </div>

          {/* ── NAV WRAPPER (col 2+3 on desktop, full-width on mobile/tablet) ── */}
          <div className="footer-nav-wrapper">
            {/* COL 2 — Navigate */}
            <div className="footer-col-nav">
              <h4 className="footer-nav-title">Navigate</h4>
              <div className="footer-nav-underline" />
              <div className="footer-nav-links">
                {NAV_COL1.map(item => <FooterLink key={item.path} {...item} />)}
              </div>
            </div>

            {/* COL 3 — Resources */}
            <div className="footer-col-nav">
              <h4 className="footer-nav-title">Resources</h4>
              <div className="footer-nav-underline" />
              <div className="footer-nav-links">
                {NAV_COL2.map(item => <FooterLink key={item.path} {...item} />)}
              </div>
            </div>
          </div>

          {/* COL 4 — Subscribe + Contact */}
          <div className="footer-col-subscribe flex flex-col gap-5">
            {/* Subscribe */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faInbox} style={{ color:'#60a5fa', fontSize:16 }} />
                <span className="font-bold text-[15px] text-white">Stay Connected</span>
              </div>
              <p className="text-[12.5px] leading-[1.55]" style={{ color:'#64748b' }}>
                Drop your email for occasional updates — no spam, just meaningful content.
              </p>
              <div className="subscribe-input-wrap">
                <input type="email" placeholder="you@example.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  className="flex-1 bg-transparent outline-none text-[13.5px] text-white min-w-0 py-2.5 pl-4"
                  style={{ '::placeholder': { color:'#475569' } }} />
                <SubBtn onClick={handleSubscribe} />
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color:'#64748b' }}>
                <AnimatedCount target={subCount} />
                <span style={{ fontSize:12 }}>curious minds already subscribed</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background:'var(--footer-border, rgba(255,255,255,0.06))' }} />

            {/* Contact category */}
            <div className="flex flex-col gap-3">
              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs" style={{ color:'#64748b' }}>
                <FontAwesomeIcon icon={faLocationDot} style={{ color:'#60a5fa' }} className="text-xs" />
                <span>{SITE_CONFIG.owner.location}</span>
              </div>

              {/* Let's Connect card */}
              <Link to="/contact"
                className="group flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5"
                style={{ background:'rgba(30,42,58,0.8)', borderColor:'rgba(30,42,58,1)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(30,42,58,1)'}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(59,130,246,0.15)', color:'#60a5fa' }}>
                  <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors leading-tight">Let's Connect</p>
                  <p className="text-[12px] mt-0.5 leading-snug" style={{ color:'#64748b' }}>Open to projects & collaborations</p>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" style={{ color:'#64748b' }} />
              </Link>

              {/* Email outside card */}
              <a href={`mailto:${SITE_CONFIG.owner.email}`}
                className="flex items-center gap-2 text-[13px] transition-colors py-1"
                style={{ color:'#94a3b8' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                <FontAwesomeIcon icon={faPaperPlane} style={{ color:'#60a5fa', fontSize:14 }} />
                <span>{SITE_CONFIG.owner.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="relative z-[2] max-w-[1240px] mx-auto px-7 mt-12 footer-bottom-bar">
        {/* Mobile back-to-top straddling */}
        <div className="footer-top-btn-mobile">
          <BackToTop mobile />
        </div>

        <span className="text-[12.5px]" style={{ color:'#64748b' }}>
          &copy; {year}{' '}
          <Link to="/" className="transition-colors hover:text-white" style={{ color:'#94a3b8' }}>
            {SITE_CONFIG.siteName}
          </Link>
          . All rights reserved.
        </span>

        <div className="flex items-center gap-3">
          <span className="version-badge font-mono text-[11px]">
            <span className="version-dot" />
            {SITE_CONFIG.version}
          </span>
          <div className="footer-top-btn-desktop">
            <BackToTop />
          </div>
        </div>
      </div>

      {/* Footer-specific styles (scoped to this component) */}
      <style>{`
        :root {
          --footer-bg: #0b0f1a;
          --footer-surface: #131a2b;
          --footer-border: rgba(255,255,255,0.06);
          --footer-text: #e2e8f0;
          --footer-text2: #94a3b8;
          --footer-text3: #64748b;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 40px 32px;
          align-items: start;
        }
        .footer-nav-wrapper {
          display: contents;
        }
        /* Subscribe input */
        .subscribe-input-wrap {
          display: flex;
          align-items: center;
          background: #131a2b;
          border: 1.5px solid rgba(255,255,255,0.06);
          border-radius: 9999px;
          padding: 4px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .subscribe-input-wrap:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
        }
        .subscribe-input-wrap input::placeholder { color: #475569; }

        /* Social pills — desktop: transparent, tablet: slight bg */
        .social-pill-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          white-space: nowrap;
          overflow: hidden;
          background: transparent;
        }
        .social-pill:hover {
          background: #3b82f6;
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59,130,246,0.35);
        }
        .social-pill:hover span { color: #fff !important; }

        /* Social icon-only row — hidden on desktop/tablet */
        .social-icon-row { display: none; gap: 6px; flex-wrap: wrap; }
        .social-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: #131a2b; border: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: all 0.25s;
        }
        .social-icon-btn:hover { background: #3b82f6; border-color: #3b82f6; transform: translateY(-3px); box-shadow: 0 8px 18px rgba(59,130,246,0.4); }

        /* Nav column styles */
        .footer-col-nav { display: flex; flex-direction: column; gap: 0; }
        .footer-nav-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #64748b; margin-bottom: 8px; }
        .footer-nav-underline { width: 24px; height: 1.5px; border-radius: 99px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); margin-bottom: 10px; }
        .footer-nav-links { display: flex; flex-direction: column; gap: 0; }

        /* Version badge */
        .version-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 9999px; background: #131a2b; border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; transition: border-color 0.2s; }
        .version-badge:hover { border-color: #60a5fa; }
        .version-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }

        /* Bottom bar */
        .footer-bottom-bar {
          position: relative;
          padding-top: 20px;
          padding-bottom: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .footer-top-btn-mobile { display: none; }
        .footer-top-btn-desktop { display: flex; }

        /* ── TABLET (641–991px) ── */
        @media (max-width: 991px) and (min-width: 641px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 32px 28px;
          }
          .footer-col-brand { grid-row: 1; grid-column: 1; }
          .footer-col-subscribe { grid-row: 1; grid-column: 2; }
          .footer-nav-wrapper {
            display: flex;
            flex-direction: row;
            gap: 24px;
            grid-column: 1 / -1;
            grid-row: 2;
          }
          .footer-col-nav { flex: 1; }
          /* tablet nav: 6 col grid */
          .footer-nav-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
          }
          .footer-nav-links a { justify-content: flex-start; }
          /* Tablet social pills have bg */
          .social-pill { background: #131a2b; }
        }

        /* ── MOBILE (<641px) ── */
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px 0;
          }
          .footer-col-brand { order: 1; }
          .footer-col-subscribe { order: 2; }
          .footer-nav-wrapper { display: flex; flex-direction: column; gap: 24px; order: 3; }
          .footer-nav-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2px;
          }
          .footer-nav-links a { font-size: 12.5px; }
          /* Mobile social: icon only */
          .social-pill-grid { display: none; }
          .social-icon-row { display: flex; }
          /* Mobile bottom bar */
          .footer-top-btn-mobile { display: block; position: absolute; top: -22px; left: 50%; transform: translateX(-50%); }
          .footer-top-btn-desktop { display: none; }
          .footer-bottom-bar { flex-wrap: wrap; padding-top: 30px; margin-top: 36px; }
        }

        /* ── DESKTOP only ── */
        @media (min-width: 992px) {
          .footer-nav-wrapper { display: contents; }
          .social-pill { background: transparent; }
          .social-icon-row { display: none; }
        }
      `}</style>
    </footer>
  )
}
