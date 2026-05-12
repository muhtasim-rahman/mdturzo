// ============================================================
// NAVBAR — v2.1.3 final
// Fixes vs previous:
//  - Logo: /logo.webp image + status dot + name "Muhtasim"
//  - Alignment: max-w-[1280px] + var(--container-pad) — matches body & footer
//  - Sign In: ultra-compact on mobile (px-2.5 py-1 text-[11px] icon+In)
//  - Sidebar: mobile ≤480px = 100vw | tablet = 360px
//  - Sidebar search: wrapper gets accent border on focus/typing; input has no inner ring
//  - PC search: center-top popup (Ctrl+K or icon click)
//  - Ripple: JS ripple on icon btns; CSS ripple (.nb-rl) on all links/rows
//  - Theme toggle: hidden from mobile topbar → lives in sidebar footer
//  - Mega nav: NO header; footer = share strip + live URL copy + version
//  - Mega nav: active page highlighted; hover → accent text; click ripple
//  - Colors: 100% from CSS vars
// Firebase TODO: /status/presenceMode → CURRENT_STATUS (real-time, future version)
// Search TODO: full search engine with indexed results (future version)
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faUser, faCode, faRss, faEnvelope,
  faSearch, faBell, faMoon, faSun, faBars, faXmark,
  faTableCells, faChevronRight, faAddressCard,
  faShieldHalved, faCookie, faSignIn, faLink, faCopy,
  faRightFromBracket, faGlobe, faFileContract, faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin, faXTwitter, faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import { useAuth }              from '../../hooks/useAuth.js'
import { useThemeStore }        from '../../store/themeStore.js'
import { useNotificationStore } from '../../store/notificationStore.js'
import { useAdmin }             from '../../hooks/useAdmin.js'
import SITE_CONFIG              from '../../config/site.config.js'
import { logout as signOutUser } from '../../services/firebase.js'
import { toast }                from '../../store/toastStore.js'
import { useRipple, RippleLayer } from '../ui/Ripple.jsx'

const LOGO_SRC = '/logo.webp'
const FLOAT_THRESHOLD = 450
const CONTAINER = 'max-w-[1280px] mx-auto px-[var(--container-pad)]'

// Firebase TODO: read /status/presenceMode from RTDB → set CURRENT_STATUS
const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active'  },
  busy:    { color: '#ef4444', label: 'Busy'    },
  away:    { color: '#f59e0b', label: 'Away'    },
  offline: { color: '#6b7280', label: 'Offline' },
}
const CURRENT_STATUS = 'active'

const NAV_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse    },
  { label: 'About',    path: '/about',    icon: faUser     },
  { label: 'Projects', path: '/projects', icon: faCode     },
  { label: 'Feed',     path: '/feed',     icon: faRss      },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope },
]

const MEGA_COLS = [
  {
    label: 'Pages',
    items: [
      { label: 'Home',     path: '/',         icon: faHouse    },
      { label: 'About',    path: '/about',    icon: faUser     },
      { label: 'Projects', path: '/projects', icon: faCode     },
      { label: 'Feed',     path: '/feed',     icon: faRss      },
      { label: 'Contact',  path: '/contact',  icon: faEnvelope },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'My Profile',  path: '/profile', icon: faAddressCard  },
      { label: 'Admin Panel', path: '/admin',   icon: faShieldHalved },
      { label: 'Sign In',     path: '/login',   icon: faSignIn       },
    ],
  },
  {
    label: 'Legal',
    items: [
      { label: 'Privacy Policy', path: '/privacy-policy', icon: faShieldHalved },
      { label: 'Cookies Policy', path: '/cookies-policy', icon: faCookie       },
      { label: 'Terms of Use',   path: '/terms',          icon: faFileContract },
      { label: 'Sitemap',        path: '/sitemap.xml',    icon: faGlobe, external: true },
    ],
  },
]

const SOCIAL_MARQUEE = [
  { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: '@mdturzo999',     cls: 'nb-yt'  },
  { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'mdturzo999',      cls: 'nb-fb'  },
  { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: '@mdturzo999',     cls: 'nb-ig'  },
  { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'muhtasim-rahman', cls: 'nb-gh'  },
  { icon: faXTwitter,  url: SITE_CONFIG.social.twitter,   label: '@mdturzo999',     cls: 'nb-tw'  },
  { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'mdturzo999',      cls: 'nb-li'  },
  { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: '@mdturzo16',      cls: 'nb-tg'  },
  { icon: faTiktok,    url: SITE_CONFIG.social.tiktok,    label: '@mdturzo16',      cls: 'nb-tt'  },
]

// ── Motion variants ───────────────────────────────────────────
const floatVar = {
  hidden:  { y: -80, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { type:'spring', stiffness:320, damping:28 } },
  exit:    { y: -80, opacity: 0, transition: { duration: 0.18 } },
}
const megaVar = {
  hidden:  { opacity:0, y:-10, scaleY:0.96, transformOrigin:'top' },
  visible: { opacity:1, y:0,   scaleY:1,    transition:{duration:0.22,ease:[0.16,1,0.3,1]} },
  exit:    { opacity:0, y:-10, scaleY:0.96, transition:{duration:0.14} },
}
const sbVar = {
  closed: { x:'100%', transition:{type:'tween',duration:0.28,ease:[0.4,0,0.2,1]} },
  open:   { x:'0%',   transition:{type:'tween',duration:0.28,ease:[0.4,0,0.2,1]} },
}
const dropVar = {
  hidden:  { opacity:0, y:-6, scale:0.96, transformOrigin:'top right' },
  visible: { opacity:1, y:0,  scale:1,    transition:{duration:0.18} },
  exit:    { opacity:0, y:-6, scale:0.96, transition:{duration:0.12} },
}
const spVar = {
  hidden:  { opacity:0, y:-16, scale:0.97 },
  visible: { opacity:1, y:0,   scale:1,   transition:{duration:0.2,ease:[0.16,1,0.3,1]} },
  exit:    { opacity:0, y:-16, scale:0.97, transition:{duration:0.14} },
}

// ── Helpers ───────────────────────────────────────────────────
function useRippleClick() {
  const { ripples, createRipple } = useRipple()
  return { ripples, createRipple }
}

function isActivePath(path, location) {
  if (path === '/') return location.pathname === '/'
  return location.pathname.startsWith(path)
}

// ── Logo ──────────────────────────────────────────────────────
function NavLogo({ size = 'md', onClick }) {
  const s = STATUS_CONFIG[CURRENT_STATUS]
  const imgCls = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  return (
    <Link to="/" onClick={onClick} className="nb-logo group">
      <div className={`relative flex-shrink-0 ${imgCls} rounded-xl overflow-hidden border border-[var(--border-color)]`}>
        <img src={LOGO_SRC} alt="Muhtasim" className="w-full h-full object-cover" loading="lazy" />
        <span className="nb-dot" style={{ background: s.color }} title={s.label} aria-label={`Status: ${s.label}`} />
      </div>
      <span className="nb-logo-name group-hover:text-[var(--accent-primary)] transition-colors">Muhtasim</span>
    </Link>
  )
}

// ── Theme Toggle ──────────────────────────────────────────────
function ThemeToggle({ size = 'md' }) {
  const { toggleTheme, isDark } = useThemeStore()
  const { ripples, createRipple } = useRippleClick()
  const dark = isDark()
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  return (
    <button onClick={e => { createRipple(e); toggleTheme() }}
      className={`relative overflow-hidden ${dim} flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors`}
      aria-label="Toggle theme" data-nbt={dark ? 'Light mode' : 'Dark mode'}>
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.2)" />
      <AnimatePresence mode="wait" initial={false}>
        {dark
          ? <motion.span key="sun"  initial={{opacity:0,rotate:-90,scale:0.5}} animate={{opacity:1,rotate:0,scale:1}} exit={{opacity:0,rotate:90,scale:0.5}} transition={{duration:0.18}}>
              <FontAwesomeIcon icon={faSun} className="text-sm" />
            </motion.span>
          : <motion.span key="moon" initial={{opacity:0,rotate:90,scale:0.5}} animate={{opacity:1,rotate:0,scale:1}} exit={{opacity:0,rotate:-90,scale:0.5}} transition={{duration:0.18}}>
              <FontAwesomeIcon icon={faMoon} className="text-sm" />
            </motion.span>
        }
      </AnimatePresence>
    </button>
  )
}

// ── Sidebar Theme Row ─────────────────────────────────────────
function SidebarThemeRow() {
  const { toggleTheme, isDark } = useThemeStore()
  const { ripples, createRipple } = useRippleClick()
  const dark = isDark()
  return (
    <button onClick={e => { createRipple(e); toggleTheme() }}
      className="relative overflow-hidden w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.15)" />
      <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
        <FontAwesomeIcon icon={dark ? faSun : faMoon} className="text-[var(--accent-primary)] text-xs" />
        {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </div>
      <div className={`nb-pill ${dark ? 'nb-pill-on' : ''}`}><span className="nb-pill-knob" /></div>
    </button>
  )
}

// ── IconBtn ───────────────────────────────────────────────────
function IconBtn({ icon, onClick, label, badge, active, size = 'md', className = '' }) {
  const { ripples, createRipple } = useRippleClick()
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  return (
    <button onClick={e => { createRipple(e); onClick?.(e) }}
      className={`relative overflow-hidden ${dim} flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${active ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] !border-[var(--accent-primary)]' : 'bg-[var(--bg-surface-2)]'} ${className}`}
      aria-label={label} data-nbt={label}>
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.2)" />
      <FontAwesomeIcon icon={icon} className="text-sm" />
      {badge > 0 && <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error,#ef4444)] text-white text-[9px] font-bold leading-none">{badge > 9 ? '9+' : badge}</span>}
    </button>
  )
}

// ── Sign In Btn ───────────────────────────────────────────────
function SignInBtn({ mobile = false }) {
  const { ripples, createRipple } = useRippleClick()
  return mobile
    ? <Link to="/login" onClick={createRipple}
        className="relative overflow-hidden flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--accent-primary)] text-white text-[11px] font-semibold hover:bg-[var(--accent-hover)] transition-colors leading-none">
        <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
        <FontAwesomeIcon icon={faSignIn} className="text-[10px]" /><span>In</span>
      </Link>
    : <Link to="/login" onClick={createRipple}
        className="relative overflow-hidden flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors">
        <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
        <FontAwesomeIcon icon={faSignIn} className="text-xs" /> Sign In
      </Link>
}

// ── Mega footer — Share strip ─────────────────────────────────
function MegaFooter() {
  const location = useLocation()
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.siteURL
  const shareText = `Check this out: ${document.title}`

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { toast.error('Copy failed', 'Could not copy URL') }
  }

  const openShare = (platform) => {
    const enc = encodeURIComponent(url)
    const txt = encodeURIComponent(shareText)
    const map = {
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      twitter:   `https://twitter.com/intent/tweet?url=${enc}&text=${txt}`,
      linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`,
      telegram:  `https://t.me/share/url?url=${enc}&text=${txt}`,
    }
    if (platform === 'native' && navigator.share) {
      navigator.share({ title: document.title, url }).catch(() => {})
      return
    }
    if (map[platform]) window.open(map[platform], '_blank', 'width=600,height=400,noopener')
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-t border-[var(--border-color)] flex-wrap">
      {/* Share buttons */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-[var(--text-tertiary)] mr-0.5 font-medium">Share</span>
        {[
          { id:'facebook',  icon: faFacebook,   cls:'text-blue-500'  },
          { id:'twitter',   icon: faXTwitter,   cls:'text-sky-400'   },
          { id:'linkedin',  icon: faLinkedin,   cls:'text-blue-400'  },
          { id:'telegram',  icon: faTelegram,   cls:'text-sky-400'   },
          { id:'native',    icon: faShareNodes, cls:'text-[var(--accent-primary)]' },
        ].map(s => (
          <button key={s.id} onClick={() => openShare(s.id)}
            className="nb-rl w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--bg-surface-2)] transition-colors"
            title={s.id.charAt(0).toUpperCase()+s.id.slice(1)}>
            <FontAwesomeIcon icon={s.icon} className={`${s.cls} text-xs`} />
          </button>
        ))}
      </div>

      {/* Live URL + copy */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1 max-w-[220px]">
        <FontAwesomeIcon icon={faLink} className="text-[var(--text-tertiary)] text-[10px] flex-shrink-0" />
        <span className="text-[11px] text-[var(--text-tertiary)] truncate min-w-0 flex-1 font-mono">{url.replace(/^https?:\/\//, '')}</span>
        <button onClick={copyUrl}
          className="nb-rl w-6 h-6 flex items-center justify-center rounded-md hover:bg-[var(--bg-surface-2)] transition-colors flex-shrink-0"
          title="Copy URL">
          <FontAwesomeIcon icon={copied ? faXmark : faCopy}
            className={`text-[10px] transition-colors ${copied ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)]'}`} />
        </button>
      </div>

      {/* Version */}
      <span className="text-[11px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2 py-0.5 rounded-full flex-shrink-0">
        {SITE_CONFIG.version}
      </span>
    </div>
  )
}

// ── Mega Menu ─────────────────────────────────────────────────
function MegaMenu({ onClose }) {
  const location = useLocation()
  return (
    <AnimatePresence>
      <motion.div variants={megaVar} initial="hidden" animate="visible" exit="exit"
        className="mega-panel absolute left-0 right-0 top-full z-[9998]">
        <div className={`${CONTAINER} pt-2`}>
          <div className="rounded-2xl overflow-hidden"
            style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', boxShadow:'var(--shadow-xl)' }}>
            {/* Top accent */}
            <div className="h-[1.5px]" style={{background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.5) 35%,rgba(59,130,246,0.5) 65%,transparent)'}} />

            {/* 3-col grid */}
            <div className="grid grid-cols-3 divide-x divide-[var(--border-color)] p-2">
              {MEGA_COLS.map(col => (
                <div key={col.label} className="px-3 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-2 px-2">{col.label}</p>
                  <div className="space-y-0.5">
                    {col.items.map(item => {
                      const active = isActivePath(item.path, location)
                      const base = `nb-rl flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors group ${active ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'hover:bg-[var(--bg-surface-2)]'}`
                      return item.external
                        ? <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" onClick={onClose} className={base}>
                            <FontAwesomeIcon icon={item.icon} className={`w-3.5 text-center flex-shrink-0 text-xs ${active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)]'} transition-colors`} />
                            <span className={`text-[13px] font-medium transition-colors ${active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)]'}`}>{item.label}</span>
                          </a>
                        : <Link key={item.path} to={item.path} onClick={onClose} className={base}>
                            <FontAwesomeIcon icon={item.icon} className={`w-3.5 text-center flex-shrink-0 text-xs ${active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)]'} transition-colors`} />
                            <span className={`text-[13px] font-medium transition-colors ${active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)]'}`}>{item.label}</span>
                          </Link>
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Share footer */}
            <MegaFooter />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── PC Search Popup ───────────────────────────────────────────
function SearchPopup({ onClose }) {
  const [q, setQ] = useState('')
  const ref = useRef(null)
  useEffect(() => { setTimeout(() => ref.current?.focus(), 80) }, [])
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9990]" />
      <motion.div variants={spVar} initial="hidden" animate="visible" exit="exit"
        className="fixed top-20 z-[9991] w-full max-w-[580px] px-4"
        style={{ left:'50%', transform:'translateX(-50%)' }}>
        <div className="rounded-2xl overflow-hidden" style={{ background:'var(--bg-surface)', border:'1px solid var(--border-color)', boxShadow:'var(--shadow-xl)' }}>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] flex-shrink-0" />
            <input ref={ref} type="text" value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search pages, projects, posts..."
              className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)]" />
            <kbd className="hidden sm:flex items-center px-2 py-1 rounded bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[10px] text-[var(--text-tertiary)] font-mono">ESC</kbd>
          </div>
          <div className="border-t border-[var(--border-color)] px-4 py-6 text-center">
            <p className="text-sm text-[var(--text-tertiary)]">
              {q ? <>Results for <span className="text-[var(--accent-primary)] font-medium">"{q}"</span> — search engine coming soon.</> : 'Type to search across pages and content.'}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ── Notif Panel ───────────────────────────────────────────────
function NotifPanel({ onClose }) {
  const { notifications=[], reads={}, markRead, markAllRead, unreadCount } = useNotificationStore()
  const now = Date.now()
  const visible = notifications.filter(n => n.active && (!n.expires_at || new Date(n.expires_at)>now))
  return (
    <motion.div variants={dropVar} initial="hidden" animate="visible" exit="exit"
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          Notifications
          {unreadCount>0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[var(--clr-error,#ef4444)] text-white text-[9px] font-bold">{unreadCount}</span>}
        </span>
        {unreadCount>0 && <button onClick={markAllRead} className="text-xs text-[var(--accent-primary)] hover:underline">Mark all read</button>}
      </div>
      <div className="max-h-64 overflow-y-auto">
        {visible.length === 0
          ? <div className="py-8 text-center text-[var(--text-tertiary)] text-sm"><FontAwesomeIcon icon={faBell} className="text-2xl mb-2 opacity-30 block mx-auto" /><p>No notifications</p></div>
          : visible.map(n => (
            <button key={n.id} onClick={() => { markRead(n.id); if(n.link) window.location.href=n.link; onClose() }}
              className={`nb-rl w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${!reads[n.id]?'bg-[var(--accent-light)]':''}`}>
              <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:!reads[n.id]?'var(--accent-primary)':'transparent'}} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{n.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{n.message}</p>
              </div>
            </button>
          ))
        }
      </div>
    </motion.div>
  )
}

// ── User Dropdown ─────────────────────────────────────────────
function UserDrop({ user, profile, isAdmin, avatar, displayName, onClose }) {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try { await signOutUser(); onClose(); navigate('/') }
    catch(e) { toast.error('Logout failed', e.message) }
  }
  return (
    <motion.div variants={dropVar} initial="hidden" animate="visible" exit="exit"
      className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]">
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-color)]">
          {avatar
            ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-xs font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p>
          <p className="text-xs text-[var(--text-tertiary)] truncate">{profile?.username ? `@${profile.username}` : user?.email}</p>
        </div>
      </div>
      <div className="py-1">
        {[
          { to:'/profile', icon:faAddressCard,  label:'My Profile',  cls:'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]' },
          ...(isAdmin ? [{ to:'/admin', icon:faShieldHalved, label:'Admin Panel', cls:'text-[var(--accent-primary)] hover:bg-[var(--accent-light)]' }] : []),
        ].map(i => (
          <Link key={i.to} to={i.to} onClick={onClose}
            className={`nb-rl flex items-center gap-2.5 px-4 py-2.5 text-sm ${i.cls} transition-colors`}>
            <FontAwesomeIcon icon={i.icon} className="w-4 text-center opacity-70" /> {i.label}
          </Link>
        ))}
        <button onClick={handleLogout}
          className="nb-rl w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--clr-error,#ef4444)] hover:bg-red-500/10 transition-colors">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 text-center" /> Sign Out
        </button>
      </div>
    </motion.div>
  )
}

// ── Social Marquee ────────────────────────────────────────────
function SocialMarquee() {
  const trackRef = useRef(null)
  const drag = useRef({ active:false, startX:0, base:0, cur:0 })
  const items = [...SOCIAL_MARQUEE, ...SOCIAL_MARQUEE]
  const pause  = () => { if(trackRef.current) trackRef.current.style.animationPlayState='paused' }
  const resume = () => { if(trackRef.current) trackRef.current.style.animationPlayState='running' }
  const onMD = (e) => { drag.current={active:true,startX:e.pageX,base:drag.current.cur,cur:drag.current.cur}; pause(); e.preventDefault() }
  const onMM = useCallback((e) => {
    if(!drag.current.active) return
    drag.current.cur = drag.current.base+(e.pageX-drag.current.startX)
    if(trackRef.current) trackRef.current.style.transform=`translateX(${drag.current.cur}px)`
  },[])
  const onMU = useCallback(()=>{ if(drag.current.active){ drag.current.active=false; resume() } },[])
  useEffect(() => {
    window.addEventListener('mousemove',onMM); window.addEventListener('mouseup',onMU)
    return () => { window.removeEventListener('mousemove',onMM); window.removeEventListener('mouseup',onMU) }
  },[])
  return (
    <div onMouseEnter={pause} onMouseLeave={resume} className="nb-mq-wrap">
      <div ref={trackRef} onMouseDown={onMD} className="nb-mq-track">
        {items.map((s,i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            onClick={e=>{ if(drag.current.cur!==drag.current.base) e.preventDefault() }}
            className={`nb-mq-item ${s.cls}`}>
            <FontAwesomeIcon icon={s.icon} /><span>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Main Navbar ───────────────────────────────────────────────
export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, isLoggedIn, avatar, displayName, authLoading } = useAuth()
  const { unreadCount, isOpen:notifOpen, setOpen:setNotifOpen } = useNotificationStore()
  const { isAdmin } = useAdmin()

  const [floatOn,    setFloatOn   ] = useState(false)
  const [sideOpen,   setSideOpen  ] = useState(false)
  const [megaOpen,   setMegaOpen  ] = useState(false)
  const [userOpen,   setUserOpen  ] = useState(false)
  const [spOpen,     setSpOpen    ] = useState(false)
  const [searchQ,    setSearchQ   ] = useState('')
  const sbSearchRef = useRef(null)

  // Scroll → float
  useEffect(() => {
    const h = () => setFloatOn(window.scrollY > FLOAT_THRESHOLD)
    window.addEventListener('scroll', h, { passive:true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Reset on nav
  useEffect(() => {
    setSideOpen(false); setMegaOpen(false); setUserOpen(false)
    setNotifOpen(false); setSpOpen(false); setSearchQ('')
  }, [location.pathname])

  // Body lock
  useEffect(() => {
    document.body.style.overflow = (sideOpen||spOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sideOpen, spOpen])

  // Ctrl+K
  useEffect(() => {
    const h = (e) => { if((e.ctrlKey||e.metaKey)&&e.key==='k'){ e.preventDefault(); setSpOpen(true) } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // Click-outside
  useEffect(() => {
    const h = (e) => {
      if(!e.target.closest('.mega-anchor')&&!e.target.closest('.mega-panel')) setMegaOpen(false)
      if(!e.target.closest('.notif-anchor')&&!e.target.closest('.notif-panel')) setNotifOpen(false)
      if(!e.target.closest('.user-anchor')&&!e.target.closest('.user-panel'))   setUserOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleMobileSearch = () => {
    setSideOpen(true)
    setTimeout(() => { sbSearchRef.current?.focus(); sbSearchRef.current?.select() }, 320)
  }

  const isSearching = searchQ.trim().length > 0

  const navLinkCls = (path, isActive) => {
    const act = isActivePath(path, location)
    return `nb-rl flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${act ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'}`
  }

  // Shared right section for desktop
  const DesktopRight = () => (
    <div className="flex items-center gap-1.5 ml-auto">
      <IconBtn icon={faSearch} onClick={() => setSpOpen(true)} label="Search  Ctrl+K" />
      <div className="relative notif-anchor">
        <IconBtn icon={faBell} onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); setMegaOpen(false) }}
          label="Notifications" badge={unreadCount} active={notifOpen} />
        <AnimatePresence>{notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}</AnimatePresence>
      </div>
      <ThemeToggle />
      {authLoading
        ? <div className="w-9 h-9 rounded-full bg-[var(--bg-surface-2)] animate-pulse" />
        : isLoggedIn
          ? <div className="relative user-anchor">
              <button onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setMegaOpen(false) }}
                className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${userOpen?'border-[var(--accent-primary)]':'border-[var(--border-color)] hover:border-[var(--border-strong)]'}`}>
                {avatar
                  ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
              </button>
              <AnimatePresence>{userOpen && <UserDrop user={user} profile={profile} isAdmin={isAdmin} avatar={avatar} displayName={displayName} onClose={() => setUserOpen(false)} />}</AnimatePresence>
            </div>
          : <SignInBtn />
      }
      <div className="mega-anchor">
        <IconBtn icon={faTableCells} onClick={() => { setMegaOpen(!megaOpen); setNotifOpen(false); setUserOpen(false) }}
          label="All pages" active={megaOpen} />
      </div>
    </div>
  )

  return (
    <>
      {/* ══ TOP BAR ═════════════════════════════════════════ */}
      <nav className="relative z-10 w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md"
        style={{ height:'var(--navbar-h)' }}>
        <div className={`flex items-center h-full ${CONTAINER} gap-5`}>
          <NavLogo />
          {/* Desktop nav */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map(l => (
              <NavLink key={l.path} to={l.path} end={l.path==='/'} className={({isActive})=>navLinkCls(l.path,isActive)}>
                <FontAwesomeIcon icon={l.icon} className="text-xs opacity-80" />{l.label}
              </NavLink>
            ))}
          </div>
          {/* Desktop right */}
          <div className="hidden lg:flex"><DesktopRight /></div>
          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-1.5 ml-auto">
            <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" size="sm" />
            <div className="relative notif-anchor">
              <IconBtn icon={faBell} onClick={() => setNotifOpen(!notifOpen)} label="Notifications" badge={unreadCount} active={notifOpen} size="sm" />
              <AnimatePresence>{notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}</AnimatePresence>
            </div>
            {!authLoading && !isLoggedIn && <SignInBtn mobile />}
            <button onClick={() => setSideOpen(true)}
              className="nb-rl w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" aria-label="Menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        {megaOpen && <div className="relative"><MegaMenu onClose={()=>setMegaOpen(false)} /></div>}
      </nav>

      {/* ══ FLOAT NAV ═══════════════════════════════════════ */}
      <AnimatePresence>
        {floatOn && (
          <motion.div variants={floatVar} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-[var(--container-pad)] pt-3 pointer-events-none">
            <nav className="nb-float pointer-events-auto flex items-center gap-4 w-full max-w-[1280px] h-[52px] px-5 rounded-full">
              <NavLogo size="sm" />
              <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
                {NAV_LINKS.map(l => (
                  <NavLink key={l.path} to={l.path} end={l.path==='/'} className={({isActive})=>navLinkCls(l.path,isActive)}>
                    <FontAwesomeIcon icon={l.icon} className="text-xs opacity-80" />
                    <span className="text-[13.5px]">{l.label}</span>
                  </NavLink>
                ))}
              </div>
              <div className="hidden lg:flex"><DesktopRight /></div>
              <div className="flex lg:hidden items-center gap-1.5 ml-auto">
                <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" size="sm" />
                {!authLoading && !isLoggedIn && <SignInBtn mobile />}
                <button onClick={() => setSideOpen(true)}
                  className="nb-rl w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]">
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>
              {megaOpen && <div className="absolute inset-x-0 top-full pt-2"><MegaMenu onClose={()=>setMegaOpen(false)} /></div>}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ PC SEARCH POPUP ═════════════════════════════════ */}
      <AnimatePresence>{spOpen && <SearchPopup onClose={() => setSpOpen(false)} />}</AnimatePresence>

      {/* ══ SIDEBAR ═════════════════════════════════════════ */}
      <AnimatePresence>
        {sideOpen && (
          <>
            <motion.div key="bd" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={() => setSideOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[390] lg:hidden" />

            <motion.aside key="sb" variants={sbVar} initial="closed" animate="open" exit="closed"
              className="nb-sb fixed top-0 right-0 bottom-0 bg-[var(--bg-surface)] border-l border-[var(--border-color)] z-[395] flex flex-col lg:hidden overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
                <NavLogo size="sm" onClick={() => setSideOpen(false)} />
                <button onClick={() => setSideOpen(false)}
                  className="nb-rl w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* User card */}
              {isLoggedIn && !isSearching && (
                <Link to="/profile" onClick={() => setSideOpen(false)}
                  className="nb-rl flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{profile?.username ? `@${profile.username}` : ''}</p>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="text-[var(--text-tertiary)] text-xs" />
                </Link>
              )}

              {/* Search input */}
              <div className="px-4 mt-3 flex-shrink-0">
                <div className={`nb-sb-search flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border transition-all ${isSearching ? 'nb-sb-search-on' : 'border-[var(--border-color)]'}`}>
                  <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-xs flex-shrink-0" />
                  <input ref={sbSearchRef} type="text" placeholder="Search pages..."
                    value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    onKeyDown={e => { if(e.key==='Escape'){ setSearchQ(''); sbSearchRef.current?.blur() } }}
                    className="nb-sb-input flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0" />
                  {searchQ && (
                    <button onClick={() => setSearchQ('')} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0">
                      <FontAwesomeIcon icon={faXmark} className="text-xs" />
                    </button>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto py-3 nb-sb-scroll">
                {isSearching ? (
                  <div className="px-4 py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-lg" />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Results for <span className="text-[var(--accent-primary)]">"{searchQ}"</span></p>
                    <p className="text-xs text-[var(--text-tertiary)] mb-5">Full search engine coming in a future version.</p>
                    <div className="text-left space-y-0.5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] px-2 mb-2">Quick links</p>
                      {NAV_LINKS.map(l => (
                        <NavLink key={l.path} to={l.path} onClick={() => setSideOpen(false)}
                          className="nb-rl flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors">
                          <FontAwesomeIcon icon={l.icon} className="w-4 text-center text-xs text-[var(--text-tertiary)]" />{l.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Navigation</p>
                    {NAV_LINKS.map(l => (
                      <NavLink key={l.path} to={l.path} end={l.path==='/'} onClick={() => setSideOpen(false)}
                        className={({ isActive }) => {
                          const act = isActivePath(l.path, location)
                          return `nb-rl flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${act?'bg-[var(--accent-light)] text-[var(--accent-primary)]':'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'}`
                        }}>
                        <FontAwesomeIcon icon={l.icon} className="w-4 text-center text-xs" />{l.label}
                      </NavLink>
                    ))}
                    <div className="my-3 mx-4 h-px bg-[var(--border-color)]" />
                    <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">More</p>
                    {[
                      { label:'My Profile',     path:'/profile',        icon:faAddressCard  },
                      { label:'Privacy Policy', path:'/privacy-policy', icon:faShieldHalved },
                      { label:'Cookies Policy', path:'/cookies-policy', icon:faCookie       },
                    ].map(i => (
                      <Link key={i.path} to={i.path} onClick={() => setSideOpen(false)}
                        className="nb-rl flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors">
                        <FontAwesomeIcon icon={i.icon} className="w-4 text-center text-xs" />{i.label}
                      </Link>
                    ))}
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setSideOpen(false)}
                        className="nb-rl flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors">
                        <FontAwesomeIcon icon={faShieldHalved} className="w-4 text-center text-xs" /> Admin Panel
                      </Link>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-2.5">
                <SocialMarquee />
                <SidebarThemeRow />
                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setSideOpen(false)}
                      className="nb-rl flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors">Sign In</Link>
                    <Link to="/signup" onClick={() => setSideOpen(false)}
                      className="nb-rl flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">Sign Up</Link>
                  </div>
                ) : (
                  <button onClick={async () => { await signOutUser(); setSideOpen(false); navigate('/') }}
                    className="nb-rl w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-[var(--clr-error,#ef4444)] hover:bg-red-500/10 transition-colors">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 text-xs" /> Sign Out
                  </button>
                )}
                <Link to="/contact" onClick={() => setSideOpen(false)}
                  className="nb-rl flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" /> Contact Me
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ══ STYLES ══════════════════════════════════════════ */}
      <style>{`
        /* Logo */
        .nb-logo { display:flex; align-items:center; gap:10px; text-decoration:none; flex-shrink:0; }
        .nb-logo-name { font-family:var(--font-display); font-weight:700; font-size:1.05rem; color:var(--text-primary); letter-spacing:-.01em; }

        /* Status dot */
        .nb-dot { position:absolute; bottom:-2px; right:-2px; width:12px; height:12px; border-radius:50%; border:2px solid var(--bg-page); pointer-events:none; }
        [data-theme="light"] .nb-dot { border-color:#f8fafc; }

        /* Float nav glass */
        .nb-float {
          background: rgba(2,6,23,0.7);
          border: 1px solid rgba(255,255,255,0.11);
          box-shadow: 0 8px 36px rgba(0,0,0,0.52), 0 2px 10px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08);
          backdrop-filter: blur(28px) saturate(200%) brightness(1.07);
          -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.07);
        }
        [data-theme="light"] .nb-float {
          background: rgba(255,255,255,0.76);
          border: 1px solid rgba(226,232,240,0.85);
          box-shadow: 0 6px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
        }

        /* Sidebar width */
        .nb-sb { width: min(360px,88vw); }
        @media (max-width:480px) { .nb-sb { width:100vw; } }

        /* Sidebar scroll */
        .nb-sb-scroll { scrollbar-width:thin; scrollbar-color:var(--bg-surface-3) transparent; }
        .nb-sb-scroll::-webkit-scrollbar { width:4px; }
        .nb-sb-scroll::-webkit-scrollbar-thumb { background:var(--bg-surface-3); border-radius:4px; }

        /* Sidebar search — focus: accent border, no inner ring */
        .nb-sb-search { border-color:var(--border-color); }
        .nb-sb-search:focus-within, .nb-sb-search-on {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .nb-sb-input { border:none; outline:none; box-shadow:none; }
        .nb-sb-input:focus { outline:none; box-shadow:none; }

        /* Theme pill */
        .nb-pill { width:32px; height:17px; border-radius:100px; background:var(--bg-surface-3); border:1px solid var(--border-strong); position:relative; flex-shrink:0; transition:background .25s; }
        .nb-pill-on { background:var(--accent-primary); border-color:var(--accent-primary); }
        .nb-pill-knob { position:absolute; top:2px; left:2px; width:11px; height:11px; border-radius:50%; background:white; transition:transform .25s cubic-bezier(.4,0,.2,1); }
        .nb-pill-on .nb-pill-knob { transform:translateX(15px); }

        /* CSS ripple — all nav links/rows */
        .nb-rl { position:relative; overflow:hidden; }
        .nb-rl::after { content:''; position:absolute; left:50%; top:50%; width:100%; height:100%; border-radius:inherit; transform:translate(-50%,-50%) scale(0); background:rgba(59,130,246,0.12); opacity:0; pointer-events:none; transition:transform .38s ease-out,opacity .38s ease-out; }
        .nb-rl:active::after { transform:translate(-50%,-50%) scale(2.8); opacity:1; transition:none; }

        /* Tooltips */
        [data-nbt] { position:relative; }
        [data-nbt]::after { content:attr(data-nbt); position:absolute; bottom:-30px; left:50%; transform:translateX(-50%) translateY(4px); background:var(--bg-surface-3); color:var(--text-primary); font-size:11px; font-family:var(--font-body); font-weight:500; padding:5px 10px; border-radius:7px; white-space:nowrap; pointer-events:none; opacity:0; transition:all .18s; z-index:1050; border:1px solid var(--border-color); box-shadow:var(--shadow-sm); }
        [data-nbt]:hover::after { opacity:1; transform:translateX(-50%) translateY(0); }

        /* Social marquee */
        .nb-mq-wrap { position:relative; overflow:hidden; height:32px; border-radius:8px; mask-image:linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%); -webkit-mask-image:linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%); }
        .nb-mq-track { display:inline-flex; gap:10px; align-items:center; height:100%; white-space:nowrap; animation:nb-marquee 22s linear infinite; cursor:grab; will-change:transform; }
        .nb-mq-track:active { cursor:grabbing; }
        .nb-mq-item { display:inline-flex; align-items:center; gap:5px; padding:3px 8px; border-radius:100px; font-size:11px; font-weight:500; color:var(--text-secondary); text-decoration:none; flex-shrink:0; transition:color .2s,background .2s; }
        .nb-mq-item:hover { color:var(--text-primary); background:var(--bg-surface-2); }
        .nb-yt svg,.nb-yt { --mc:#ef4444 } .nb-fb svg,.nb-fb { --mc:#3b82f6 } .nb-ig svg,.nb-ig { --mc:#ec4899 }
        .nb-gh svg,.nb-gh { --mc:#a78bfa } .nb-tw svg,.nb-tw { --mc:#38bdf8 } .nb-li svg,.nb-li { --mc:#60a5fa }
        .nb-tg svg,.nb-tg { --mc:#38bdf8 } .nb-tt svg,.nb-tt { --mc:#f472b6 }
        .nb-mq-item svg { color:var(--mc,currentColor); font-size:12px; }

        @keyframes nb-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes ripple-expand { to{transform:scale(1);opacity:0} }
      `}</style>
    </>
  )
}