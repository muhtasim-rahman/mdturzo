/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane, faArrowUp, faLocationDot,
  faEnvelope, faArrowRight, faInbox, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin, faXTwitter, faTiktok,
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

const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active',  pulse: true  },
  busy:    { color: '#ef4444', label: 'Busy',    pulse: false },
  away:    { color: '#f59e0b', label: 'Away',    pulse: false },
  offline: { color: '#6b7280', label: 'Offline', pulse: false },
}
const CURRENT_STATUS = 'active'

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
      const progress = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + (target - start) * ease))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <strong ref={ref} className="footer-count-num">{count.toLocaleString()}</strong>
}

function SubBtn({ onClick, loading, isValid }) {
  const { ripples, createRipple } = useRipple()
  const handle = (e) => { if (loading) return; createRipple(e); onClick() }
  return (
    <button onClick={handle} disabled={loading}
      className={`relative overflow-hidden flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm flex-shrink-0 transition-colors disabled:opacity-60 ${
        isValid ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white' : 'bg-red-500/20 border border-red-500/50 text-red-500'
      }`}>
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      {loading
        ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        : <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
      }
      {loading ? '...' : 'Subscribe'}
    </button>
  )
}

function BackToTop({ mobile }) {
  const { ripples, createRipple } = useRipple()
  const onClick = (e) => { createRipple(e); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  if (mobile) return (
    <button onClick={onClick} className="relative overflow-hidden w-11 h-11 rounded-full bg-[var(--accent-primary)] text-white shadow-lg hover:bg-[var(--accent-hover)] transition-colors">
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
    </button>
  )
  return (
    <button onClick={onClick} className="relative overflow-hidden w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-colors shadow-md">
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
    </button>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [subCount, setSubCount] = useState(2847)
  const [subscribing, setSubscribing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const year = new Date().getFullYear()
  const status = STATUS_CONFIG[CURRENT_STATUS]

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
      setEmailError(true)
      setTimeout(() => setEmailError(false), 3000)
      return
    }
    setEmailError(false)
    setSubscribing(true)
    try {
      const result = await subscribeEmail(trimmed)
      if (result.duplicate) {
        toast.info('Already subscribed', 'This email is already in the list!')
      } else {
        setSuccess(true)
        setEmail('')
        setSubCount(c => c + 1)
        setTimeout(() => setSuccess(false), 3500)
      }
    } catch {
      toast.error('Failed', 'Could not subscribe. Try again.')
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <>
      {/* ╔══ STAY CONNECTED BANNER ═══════════════════════════╗ */}
      <div className="px-4 md:px-7 w-full max-w-[1200px] mx-auto mb-[-1px]">
        <div className="relative overflow-hidden rounded-t-[28px] bg-gradient-to-br from-[var(--accent-primary)] via-[#3b82f6] to-[#38bdf8] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 flex-1 min-w-[240px]">
            <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
              Stay <em className="italic opacity-90">Connected</em><br />with My Work
            </h2>
            <p className="text-white/70 text-sm mt-2">Follow my journey · Get updates on new projects &amp; posts</p>
          </div>
          <div className="relative z-10 flex-1 min-w-[260px] max-w-[420px] w-full">
            {!success ? (
              <form onSubmit={handleSubscribe} noValidate>
                <div className={`flex items-center gap-1 p-1.5 rounded-full bg-white/10 backdrop-blur-md border transition-all ${
                  emailError ? 'border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.2)]' : 'border-white/20 focus-within:border-white/60 focus-within:shadow-[0_0_0_5px_rgba(255,255,255,0.1)]'
                }`}>
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faInbox} className="text-white text-sm" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailError(false) }}
                    className={`flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/50 py-2 px-1`}
                    style={{ color: emailError ? '#fca5a5' : 'white' }}
                  />
                  <SubBtn onClick={handleSubscribe} loading={subscribing} isValid={!emailError} />
                </div>
                {emailError && <p className="text-red-300 text-xs mt-1 px-2">Please enter a valid email.</p>}
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-white font-semibold bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 px-6">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                Subscribed! Check your inbox.
              </div>
            )}
            <p className="text-white/70 text-xs mt-3 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1" />
              <AnimatedCount target={subCount} /> curious minds already subscribed
            </p>
          </div>
        </div>
      </div>

      {/* ╔══ FOOTER MAIN ══════════════════════════════════════╗ */}
      <footer className="bg-[var(--footer-bg)] border-t border-[var(--footer-border-solid)] relative">
        <div className="max-w-[1200px] mx-auto px-7 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-10">
            {/* Brand */}
            <div className="space-y-5">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                  <img src="/logo.webp" alt="Logo" className="w-full h-full object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--clr-success)] border-2 border-[var(--footer-bg)] rounded-full" title={status.label} />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{SITE_CONFIG.owner.displayName}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">@mdturzo999 · Portfolio</p>
                </div>
              </Link>
              <p className="text-sm text-[var(--text-secondary)] max-w-xs">{SITE_CONFIG.seo.defaultDescription}</p>
              {/* Social icons */}
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ icon, url, label, cls }) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-white transition-all hover:-translate-y-0.5">
                    <FontAwesomeIcon icon={icon} style={{ color: cls }} className="text-sm" />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                <FontAwesomeIcon icon={faLocationDot} className="text-[var(--accent-primary)]" />
                {SITE_CONFIG.owner.location}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-3">Explore</h4>
              <ul className="space-y-2">
                {EXPLORE_LINKS.map(({ label, path }) => (
                  <li key={path}><Link to={path} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-3">Legal</h4>
              <ul className="space-y-2">
                {LEGAL_LINKS.map(({ label, path, external }) => (
                  <li key={path}>
                    {external
                      ? <a href={path} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">{label}</a>
                      : <Link to={path} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">{label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">Get in Touch</h4>
              <Link to="/contact" className="relative overflow-hidden block p-4 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-hover)] text-white group">
                <RippleLayer ripples={[]} color="rgba(255,255,255,0.2)" />
                <p className="text-xs uppercase tracking-wider text-white/70">Open for work</p>
                <p className="text-lg font-bold mt-0.5">Let's Collaborate</p>
                <p className="text-xs text-white/70 mt-1 mb-2">Have a project in mind? I'd love to hear about it.</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  Visit Contact Page <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a href={`mailto:${SITE_CONFIG.owner.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[var(--accent-primary)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-[var(--text-tertiary)]">Email me</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{SITE_CONFIG.owner.email}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 border-t border-[var(--border-color)] gap-3">
            <p className="text-xs text-[var(--text-tertiary)]">
              &copy; {year} {SITE_CONFIG.siteName}. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-semibold bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-full px-2.5 py-0.5 text-[var(--text-tertiary)]">{SITE_CONFIG.version}</span>
              <BackToTop />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}