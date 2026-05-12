// ============================================================
// NAVBAR — v2.1.3
// Changes from v2.1.2:
//   - Status dot on logo: 4 modes (active|busy|away|offline)
//     · Green dot with 'Active' HTML tooltip on hover
//     · Currently hard-coded to 'active'
//     · FIREBASE NOTE: Future version will read /status/presenceMode
//       from Firebase RTDB to control status in real time
//   - Mega menu: completely redesigned — cleaner 3-col layout,
//     no color-coded cards, icon+text only, branding header at top
//   - Search (mobile/tablet): clicking search icon opens the sidebar
//     and auto-focuses the search input with keyboard activation
//   - Sidebar: real <input> for search, tracks query state;
//     when typing → hides nav sections, shows "Search coming soon"
//     placeholder. Full search engine planned for a future version.
//   - Floating navbar: enhanced glass effect
//   - All navigation data is website-related
//   - Footer ↔ Navbar nav links are always aligned
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faUser, faCode, faRss, faEnvelope,
  faSearch, faBell, faSun, faMoon, faBars, faXmark,
  faTableCells, faChevronRight, faAddressCard,
  faShieldHalved, faCookie, faSignIn, faArrowRight,
  faRightFromBracket, faGlobe, faFileContract, faCopy, faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin, faXTwitter, faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../hooks/useAuth.js'
import { useThemeStore } from '../../store/themeStore.js'
import { useNotificationStore } from '../../store/notificationStore.js'
import { useAdmin } from '../../hooks/useAdmin.js'
import SITE_CONFIG from '../../config/site.config.js'
import { logout as signOutUser } from '../../services/firebase.js'
import { toast } from '../../store/toastStore.js'
import { useRipple, RippleLayer } from '../ui/Ripple.jsx'

// ── Constants ────────────────────────────────────────────────
const FLOAT_THRESHOLD = 450

// ── Status config ─────────────────────────────────────────────
// 4 modes: active | busy | away | offline
// Currently always 'active'.
// FIREBASE TODO: Read from /status/presenceMode in RTDB.
// Store the mode in Zustand or local state once Firebase controls it.
const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active',  pulse: true  },
  busy:    { color: '#ef4444', label: 'Busy',    pulse: false },
  away:    { color: '#f59e0b', label: 'Away',    pulse: false },
  offline: { color: '#6b7280', label: 'Offline', pulse: false },
}
const CURRENT_STATUS = 'active' // ← Firebase will override in future version

// ── Nav links (synced with Footer explore links) ─────────────
const NAV_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse,    title: 'Go back to the main homepage'      },
  { label: 'About',    path: '/about',    icon: faUser,     title: 'Learn about my journey and skills' },
  { label: 'Projects', path: '/projects', icon: faCode,     title: 'Browse projects I have built'      },
  { label: 'Feed',     path: '/feed',     icon: faRss,      title: 'Read my blogs and latest posts'    },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope, title: 'Send me a message or say hello'    },
]

// ── Mega menu columns (redesigned: 3-col, no desc, clean) ────
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
      { label: 'My Profile',  path: '/profile', icon: faAddressCard   },
      { label: 'Admin Panel', path: '/admin',   icon: faShieldHalved  },
      { label: 'Sign In',     path: '/login',   icon: faSignIn        },
      { label: 'Sign Up',     path: '/signup',  icon: faArrowRight    },
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

// ── Social marquee ────────────────────────────────────────────
const SOCIAL_MARQUEE = [
  { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: '@mdturzo999',     cls: 'text-red-500'   },
  { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'mdturzo999',      cls: 'text-blue-500'  },
  { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: '@mdturzo999',     cls: 'text-pink-500'  },
  { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'muhtasim-rahman', cls: 'text-purple-400'},
  { icon: faXTwitter,  url: SITE_CONFIG.social.twitter,   label: '@mdturzo999',     cls: 'text-sky-400'   },
  { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'mdturzo999',      cls: 'text-blue-400'  },
  { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: '@mdturzo16',      cls: 'text-sky-400'   },
  { icon: faTiktok,    url: SITE_CONFIG.social.tiktok,    label: '@mdturzo16',      cls: 'text-pink-400'  },
]

// ── Framer Motion variants ────────────────────────────────────
const floatVariants = {
  hidden:  { y: -80, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } },
  exit:    { y: -80, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}
const megaVariants = {
  hidden:  { opacity: 0, y: -10, scaleY: 0.96, transformOrigin: 'top' },
  visible: { opacity: 1, y: 0,   scaleY: 1,    transition: { duration: 0.22, ease: [0.16,1,0.3,1] } },
  exit:    { opacity: 0, y: -10, scaleY: 0.96, transition: { duration: 0.14 } },
}
const sidebarVariants = {
  closed: { x: '100%', transition: { type: 'tween', duration: 0.28, ease: [0.4,0,0.2,1] } },
  open:   { x: '0%',   transition: { type: 'tween', duration: 0.28, ease: [0.4,0,0.2,1] } },
}
const dropVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.96, transformOrigin: 'top right' },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18 } },
  exit:    { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.12 } },
}

// ── Status Dot ───────────────────────────────────────────────
function StatusDot({ mode = CURRENT_STATUS, size = 'md' }) {
  const s = STATUS_CONFIG[mode] || STATUS_CONFIG.active
  const dim = size === 'sm'
    ? 'w-2.5 h-2.5 border-[1.5px]'
    : 'w-3 h-3 border-2'
  return (
    <span
      className={`absolute -bottom-0.5 -right-0.5 ${dim} rounded-full border-[var(--bg-page)] transition-colors`}
      style={{ background: s.color }}
      title={s.label}
      aria-label={`Status: ${s.label}`}
    />
  )
}

// ── Logo Component ───────────────────────────────────────────
function NavLogo({ size = 'md', showName = true, onClick }) {
  const [logoSrc, setLogoSrc] = useState('/logo.webp')
  const logoSize = size === 'sm' ? 'w-7 h-7 text-sm rounded-full' : 'w-9 h-9 text-base rounded-full'
  return (
    <Link to="/" onClick={onClick}
      className="flex-shrink-0 flex items-center gap-2.5 select-none group">
      <div className={`relative ${logoSize} flex items-center justify-center flex-shrink-0 overflow-visible`}>
        <img
          src={logoSrc}
          alt="Muhtasim logo"
          onError={() => setLogoSrc('/android-chrome-192x192.png')}
          className={`${logoSize} object-cover border border-[var(--border-color)] bg-[var(--bg-surface-2)]`}
        />
        <StatusDot size={size} />
      </div>
      {showName && (
        <span className="font-mono font-bold text-[17px] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          {SITE_CONFIG.navName}
        </span>
      )}
    </Link>
  )
}

// ── Theme Toggle ─────────────────────────────────────────────
function ThemeToggle({ size = 'md', className = '' }) {
  const { toggleTheme, isDark } = useThemeStore()
  const dark = isDark()
  const sz = size === 'sm' ? 'w-8 h-8 text-sm' : 'w-9 h-9 text-base'
  return (
    <button onClick={toggleTheme}
      className={`${sz} relative flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${className}`}
      aria-label="Toggle theme" data-tooltip={dark ? 'Light mode' : 'Dark mode'}>
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span key="sun" initial={{opacity:0,rotate:-90,scale:0.5}} animate={{opacity:1,rotate:0,scale:1}} exit={{opacity:0,rotate:90,scale:0.5}} transition={{duration:0.18}}>
            <FontAwesomeIcon icon={faSun} />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{opacity:0,rotate:90,scale:0.5}} animate={{opacity:1,rotate:0,scale:1}} exit={{opacity:0,rotate:-90,scale:0.5}} transition={{duration:0.18}}>
            <FontAwesomeIcon icon={faMoon} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// ── Icon Button ───────────────────────────────────────────────
function IconBtn({ icon, onClick, label, badge, active, className = '' }) {
  const { ripples, createRipple } = useRipple()
  const handleClick = (e) => { createRipple(e); onClick?.(e) }
  return (
    <button onClick={handleClick}
      className={`relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${active ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]' : 'bg-[var(--bg-surface-2)]'} ${className}`}
      aria-label={label} data-tooltip={label}>
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.2)" />
      <FontAwesomeIcon icon={icon} />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold leading-none">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )
}

// ── Sign In Button ────────────────────────────────────────────
function SignInBtn({ className = '' }) {
  const { ripples, createRipple } = useRipple()
  return (
    <Link to="/login" onClick={createRipple}
      title="Sign in to your account"
      className={`relative overflow-hidden flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors ${className}`}>
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faSignIn} className="text-xs" />
      Sign In
    </Link>
  )
}

// ── Notification Panel ────────────────────────────────────────
function NotifPanel({ onClose }) {
  const { notifications, reads, markRead, markAllRead, unreadCount } = useNotificationStore()
  const now = Date.now()
  const visible = notifications.filter(n => n.active && (!n.expires_at || new Date(n.expires_at).getTime() > now))
  return (
    <motion.div variants={dropVariants} initial="hidden" animate="visible" exit="exit"
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          Notifications
          {unreadCount > 0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold">{unreadCount}</span>}
        </span>
        {unreadCount > 0 && <button onClick={markAllRead} className="text-xs text-[var(--accent-primary)] hover:underline">Mark all read</button>}
      </div>
      <div className="max-h-64 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="py-8 text-center text-[var(--text-tertiary)] text-sm">
            <FontAwesomeIcon icon={faBell} className="text-2xl mb-2 opacity-30" /><p>No notifications</p>
          </div>
        ) : visible.map(n => (
          <button key={n.id} onClick={() => { markRead(n.id); if(n.link) window.location.href = n.link; onClose() }}
            className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${!reads[n.id] ? 'bg-[var(--accent-light)]' : ''}`}>
            <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background: !reads[n.id] ? 'var(--accent-primary)' : 'transparent'}} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">{n.title}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{n.message}</p>
            </div>
          </button>
        ))}
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
    <motion.div variants={dropVariants} initial="hidden" animate="visible" exit="exit"
      className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]">
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-color)]">
          {avatar ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-xs font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p>
          <p className="text-xs text-[var(--text-tertiary)] truncate">{profile?.username ? `@${profile.username}` : user?.email}</p>
        </div>
      </div>
      <div className="py-1">
        <Link to="/profile" onClick={onClose} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors">
          <FontAwesomeIcon icon={faAddressCard} className="w-4 text-center opacity-60" /> My Profile
        </Link>
        {isAdmin && <Link to="/admin" onClick={onClose} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors">
          <FontAwesomeIcon icon={faShieldHalved} className="w-4 text-center" /> Admin Panel
        </Link>}
        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 text-center" /> Sign Out
        </button>
      </div>
    </motion.div>
  )
}

// ── Social Marquee ────────────────────────────────────────────
function SocialMarquee() {
  const trackRef = useRef(null)
  const isPaused = useRef(false)
  const dragRef  = useRef({ active: false, startX: 0, offset: 0, currentOffset: 0 })
  const items = [...SOCIAL_MARQUEE, ...SOCIAL_MARQUEE]

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; isPaused.current = true }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; isPaused.current = false }

  const onMouseDown = (e) => {
    dragRef.current = { active: true, startX: e.pageX, offset: dragRef.current.currentOffset }
    pause(); e.preventDefault()
  }
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return
    const delta = e.pageX - dragRef.current.startX
    dragRef.current.currentOffset = dragRef.current.offset + delta
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dragRef.current.currentOffset}px)`
  }
  const onMouseUp = () => { if (dragRef.current.active) { dragRef.current.active = false; resume() } }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp) }
  }, [])

  return (
    <div onMouseEnter={pause} onMouseLeave={resume}
      style={{ position:'relative', overflow:'hidden', height:34, borderRadius:8,
        maskImage:'linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)',
        WebkitMaskImage:'linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)' }}>
      <div ref={trackRef} onMouseDown={onMouseDown}
        style={{ display:'inline-flex', gap:16, alignItems:'center', height:'100%', whiteSpace:'nowrap',
          animation:'marquee-scroll 22s linear infinite', cursor:'grab', willChange:'transform' }}>
        {items.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            onClick={e => { if (dragRef.current.currentOffset !== dragRef.current.offset) e.preventDefault() }}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors no-underline flex-shrink-0`}>
            <FontAwesomeIcon icon={s.icon} className={s.cls} style={{fontSize:13}} />
            <span>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Mega Menu (redesigned — clean 3-col) ─────────────────────
function MegaMenu({ onClose, isLoggedIn }) {
  const location = useLocation()
  const currentUrl = typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.siteURL
  const shareText = `Explore ${SITE_CONFIG.owner.displayName}'s portfolio`
  const shareLinks = [
    { label: 'Facebook', icon: faFacebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { label: 'X', icon: faXTwitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}` },
    { label: 'LinkedIn', icon: faLinkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
    { label: 'Telegram', icon: faTelegram, url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}` },
  ]
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toast.success('Copied', 'Current page URL copied.')
    } catch {
      toast.error('Copy failed', 'Could not copy this URL.')
    }
  }
  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: SITE_CONFIG.siteName, text: shareText, url: currentUrl })
      return
    }
    copyUrl()
  }
  const itemClass = (path) => {
    const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    return `relative overflow-hidden flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors group ${active ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'hover:bg-[var(--bg-surface-2)]'}`
  }
  return (
    <AnimatePresence>
      <motion.div variants={megaVariants} initial="hidden" animate="visible" exit="exit"
        className="absolute left-0 right-0 top-full z-[9998]">
        <div className="max-w-[1120px] mx-auto px-4 pt-2">
          <div className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xl)',
            }}>
            {/* Top accent line */}
            <div className="h-[1.5px] w-full"
              style={{background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.5) 35%,rgba(59,130,246,0.5) 65%,transparent)'}} />

            {/* 3-column grid */}
            <div className="grid grid-cols-3 divide-x divide-[var(--border-color)] p-2">
              {MEGA_COLS.map((col) => (
                <div key={col.label} className="px-3 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-2 px-2">{col.label}</p>
                  <div className="space-y-0.5">
                    {col.items.map(item => (
                      item.external
                        ? <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer"
                            onClick={onClose}
                            className={itemClass(item.path)}>
                            <FontAwesomeIcon icon={item.icon}
                              className="w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs" />
                            <span className="text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">{item.label}</span>
                          </a>
                        : <Link key={item.path} to={item.path} onClick={onClose}
                            className={itemClass(item.path)}>
                            <FontAwesomeIcon icon={item.icon}
                              className="w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs" />
                            <span className="text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">{item.label}</span>
                          </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer row */}
            <div className="px-4 py-3 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 min-w-0">
                {shareLinks.map(item => (
                  <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="mega-share-btn" aria-label={`Share on ${item.label}`} data-tooltip={item.label}>
                    <FontAwesomeIcon icon={item.icon} />
                  </a>
                ))}
                <button type="button" onClick={shareNative} className="mega-share-btn" aria-label="Share" data-tooltip="Share">
                  <FontAwesomeIcon icon={faShareNodes} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 min-w-0 flex-1 max-w-[420px]">
                <span className="truncate rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] px-3 py-1 text-[11px] text-[var(--text-tertiary)]">{currentUrl}</span>
                <button type="button" onClick={copyUrl} className="mega-share-btn flex-shrink-0" aria-label="Copy URL" data-tooltip="Copy URL">
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2 py-0.5 rounded-full">{SITE_CONFIG.version}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Nav Right Icons ───────────────────────────────────────────
function NavRight({ user, profile, isAdmin: isAdminProp, avatar, displayName, isLoggedIn, authLoading, unreadCount, openSearch, notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen, onMenuOpen, onMobileSearch }) {
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      {/* Desktop search */}
      <IconBtn icon={faSearch} onClick={openSearch} label="Search  Ctrl+K" className="hidden lg:flex" />
      {/* Tablet/mobile search → opens sidebar with focus */}
      <IconBtn icon={faSearch} onClick={onMobileSearch} label="Search" className="lg:hidden" />

      <div className="relative">
        <IconBtn icon={faBell} onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); setMegaOpen(false) }}
          label="Notifications" badge={unreadCount} active={notifOpen} />
        <AnimatePresence>{notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}</AnimatePresence>
      </div>

      <ThemeToggle />

      {authLoading ? <div className="w-9 h-9 rounded-full sk" /> : isLoggedIn ? (
        <div className="relative">
          <button onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setMegaOpen(false) }}
            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${userOpen ? 'border-[var(--accent-primary)]' : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'}`}>
            {avatar ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
          </button>
          <AnimatePresence>{userOpen && <UserDrop user={user} profile={profile} isAdmin={isAdminProp} avatar={avatar} displayName={displayName} onClose={() => setUserOpen(false)} />}</AnimatePresence>
        </div>
      ) : <SignInBtn />}

      <IconBtn icon={faTableCells} onClick={() => { setMegaOpen(!megaOpen); setNotifOpen(false); setUserOpen(false) }}
        label="All pages" active={megaOpen} />

      <button onClick={onMenuOpen}
        className="lg:hidden relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Menu">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  )
}

// ── Main Navbar Export ────────────────────────────────────────
function DesktopSearchPopup({ open, query, setQuery, onClose, inputRef }) {
  if (!open) return null
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[410] hidden lg:block" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <motion.div
        initial={{ opacity: 0, y: -18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.98 }}
        className="desktop-search-pop absolute left-1/2 top-8 w-[min(620px,calc(100vw-48px))] -translate-x-1/2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-xl)] overflow-hidden"
        onMouseDown={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
          <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-sm" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') onClose() }}
            placeholder="Search pages..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
          />
          <button onClick={onClose} className="w-8 h-8 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]">
            <FontAwesomeIcon icon={faXmark} className="text-xs" />
          </button>
        </div>
        <div className="p-5 text-center">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {query ? <>Search for "<span className="text-[var(--accent-primary)]">{query}</span>"</> : 'Search is ready for the next version'}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Full search results will be connected later.</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Navbar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, profile, isLoggedIn, avatar, displayName, authLoading } = useAuth()
  const { unreadCount, isOpen: notifOpen, setOpen: setNotifOpen } = useNotificationStore()
  const { isAdmin } = useAdmin()

  const [floatVisible, setFloatVisible] = useState(false)
  const [mobileOpen,   setMobileOpen  ] = useState(false)
  const [megaOpen,     setMegaOpen    ] = useState(false)
  const [userOpen,     setUserOpen    ] = useState(false)
  // Sidebar search state
  const [searchQuery,  setSearchQuery ] = useState('')
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false)
  const [desktopSearchQuery, setDesktopSearchQuery] = useState('')
  const sidebarSearchRef = useRef(null)
  const desktopSearchRef = useRef(null)

  // Scroll → float nav
  useEffect(() => {
    const onScroll = () => setFloatVisible(window.scrollY > FLOAT_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reset on route change
  useEffect(() => {
    setMobileOpen(false); setMegaOpen(false); setUserOpen(false)
    setNotifOpen(false); setSearchQuery(''); setDesktopSearchOpen(false)
  }, [location.pathname])

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Ctrl+K → search
  useEffect(() => {
    const h = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); handleDesktopSearch() } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    if (!desktopSearchOpen) return
    setTimeout(() => desktopSearchRef.current?.focus(), 80)
  }, [desktopSearchOpen])

  // Click-outside close
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.mega-anchor') && !e.target.closest('.mega-panel')) setMegaOpen(false)
      if (!e.target.closest('.notif-anchor') && !e.target.closest('.notif-panel')) setNotifOpen(false)
      if (!e.target.closest('.user-anchor') && !e.target.closest('.user-panel')) setUserOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Mobile search: open sidebar and focus search input
  const handleMobileSearch = () => {
    setMobileOpen(true)
    setTimeout(() => {
      sidebarSearchRef.current?.focus()
      sidebarSearchRef.current?.select()
    }, 320)
  }

  const handleDesktopSearch = () => {
    setDesktopSearchOpen(true)
    setMegaOpen(false)
    setNotifOpen(false)
    setUserOpen(false)
  }

  const sharedProps = {
    user, profile, isAdmin, avatar, displayName, isLoggedIn, authLoading, unreadCount, openSearch: handleDesktopSearch,
    notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen,
    onMenuOpen: () => setMobileOpen(true),
    onMobileSearch: handleMobileSearch,
  }

  const linkCls = (path) => (active) => {
    const isAct = path === '/' ? location.pathname === '/' : active
    return `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${isAct ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'}`
  }

  // Sidebar search state: nav hidden when typing
  const isSearching = searchQuery.trim().length > 0

  return (
    <>
      {/* ╔══ TOP NAVBAR ═══════════════════════════════════════╗ */}
      <nav className="relative z-10 w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md"
        style={{ height: 'var(--navbar-h)' }}>
        <div className="flex items-center h-full max-w-[1120px] mx-auto px-7 gap-5">
          <NavLogo />

          {/* Center nav — desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map(link => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'}
                className={({ isActive }) => linkCls(link.path)(isActive)}
                title={link.title}>
                <FontAwesomeIcon icon={link.icon} className="text-xs opacity-80" />
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden lg:flex ml-auto">
            <NavRight {...sharedProps} />
          </div>
          {/* Right — mobile */}
          <div className="flex lg:hidden items-center gap-1.5 ml-auto">
            <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
            <ThemeToggle size="sm" />
            {!authLoading && !isLoggedIn && <SignInBtn className="text-xs px-3 py-1.5" />}
            <button onClick={() => setMobileOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]" aria-label="Menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {megaOpen && <div className="relative"><MegaMenu onClose={() => setMegaOpen(false)} isLoggedIn={isLoggedIn} /></div>}
      </nav>

      {/* ╔══ FLOATING NAVBAR — advanced glass effect ══════════╗ */}
      <AnimatePresence>
        {floatVisible && (
          <motion.div
            variants={floatVariants} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-4 pt-3 pointer-events-none">
            <nav className="float-nav relative pointer-events-auto flex items-center gap-4 w-full max-w-[1120px] h-[52px] px-4 rounded-full">
              <NavLogo size="sm" />

              {/* Center nav */}
              <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/'}
                    className={({ isActive }) => linkCls(link.path)(isActive)}
                    title={link.title}>
                    <FontAwesomeIcon icon={link.icon} className="text-xs opacity-80" />
                    <span className="text-[13.5px]">{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {/* Right */}
              <div className="hidden lg:flex ml-auto">
                <NavRight {...sharedProps} />
              </div>
              <div className="flex lg:hidden items-center gap-1.5 ml-auto">
                <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
                <ThemeToggle size="sm" />
                {!authLoading && !isLoggedIn && <SignInBtn />}
                <button onClick={() => setMobileOpen(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]">
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>

              {megaOpen && <div className="absolute inset-x-0 top-full"><MegaMenu onClose={() => setMegaOpen(false)} isLoggedIn={isLoggedIn} /></div>}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ╔══ MOBILE SIDEBAR ════════════════════════════════════╗ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[390] lg:hidden" />
            <motion.aside key="sidebar" variants={sidebarVariants} initial="closed" animate="open" exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[min(340px,88vw)] bg-[var(--bg-surface)] border-l border-[var(--border-color)] z-[395] flex flex-col lg:hidden overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
                <NavLogo size="sm" onClick={() => setMobileOpen(false)} />
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* User card */}
              {isLoggedIn && !isSearching && (
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
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

              {/* Search input
                  On mobile/tablet: clicking search icon opens sidebar and focuses this input.
                  When query is non-empty, nav sections are hidden and results placeholder shows.
                  FUTURE: Full search engine with results will be built in a later version.
              */}
              <div className="px-4 mt-3 flex-shrink-0">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] focus-within:border-[var(--accent-primary)] focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all">
                  <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-xs flex-shrink-0" />
                  <input
                    ref={sidebarSearchRef}
                    type="text"
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Escape') { setSearchQuery(''); sidebarSearchRef.current?.blur() } }}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0">
                      <FontAwesomeIcon icon={faXmark} className="text-xs" />
                    </button>
                  )}
                </div>
              </div>

              {/* Main scrollable area */}
              <div className="flex-1 overflow-y-auto py-3 sidebar-scroll">
                {isSearching ? (
                  /* Search results placeholder — full engine coming in a future version */
                  <div className="px-5 py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-lg" />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Search for "<span className="text-[var(--accent-primary)]">{searchQuery}</span>"</p>
                    <p className="text-xs text-[var(--text-tertiary)]">Full search engine is coming in a future version.</p>
                    <div className="mt-4 space-y-1 text-left">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] px-1 mb-2">Quick links</p>
                      {NAV_LINKS.map(link => (
                        <NavLink key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors">
                          <FontAwesomeIcon icon={link.icon} className="w-4 text-center text-xs text-[var(--text-tertiary)]" />
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Nav links */}
                    <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Navigation</p>
                    {NAV_LINKS.map(link => (
                      <NavLink key={link.path} to={link.path} end={link.path === '/'} onClick={() => setMobileOpen(false)}
                        className={({ isActive }) => {
                          const act = link.path === '/' ? location.pathname === '/' : isActive
                          return `flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${act ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'}`
                        }}>
                        <FontAwesomeIcon icon={link.icon} className="w-4 text-center text-xs" />
                        {link.label}
                      </NavLink>
                    ))}

                    <div className="my-3 mx-4 h-px bg-[var(--border-color)]" />
                    <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">More</p>
                    {[
                      { label: 'My Profile',     path: '/profile',       icon: faAddressCard   },
                      { label: 'Privacy Policy', path: '/privacy-policy', icon: faShieldHalved  },
                      { label: 'Cookies Policy', path: '/cookies-policy', icon: faCookie        },
                    ].map(item => (
                      <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors">
                        <FontAwesomeIcon icon={item.icon} className="w-4 text-center text-xs" />
                        {item.label}
                      </Link>
                    ))}
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors">
                        <FontAwesomeIcon icon={faShieldHalved} className="w-4 text-center text-xs" /> Admin Panel
                      </Link>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar footer */}
              <div className="flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-3">
                <SocialMarquee />
                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors">
                      Sign In
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button onClick={async () => { await signOutUser(); setMobileOpen(false); navigate('/') }}
                    className="w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" /> Sign Out
                  </button>
                )}
                <Link to="/contact" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" /> Contact Me
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Styles ─────────────────────────────────────────────── */}
      <AnimatePresence>
        <DesktopSearchPopup
          open={desktopSearchOpen}
          query={desktopSearchQuery}
          setQuery={setDesktopSearchQuery}
          inputRef={desktopSearchRef}
          onClose={() => { setDesktopSearchOpen(false); setDesktopSearchQuery('') }}
        />
      </AnimatePresence>

      <style>{`
        /* ── Floating navbar: advanced glass effect ─────────── */
        .float-nav {
          background: rgba(5, 8, 22, 0.65);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 10px 40px rgba(0,0,0,0.55),
            0 2px 12px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.09),
            inset 0 0 0 1px rgba(255,255,255,0.03);
          backdrop-filter: blur(28px) saturate(200%) brightness(1.08);
          -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.08);
        }
        [data-theme="light"] .float-nav {
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(226,232,240,0.8);
          box-shadow:
            0 8px 36px rgba(0,0,0,0.09),
            0 2px 10px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(0,0,0,0.03);
          backdrop-filter: blur(28px) saturate(180%) brightness(1.03);
          -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.03);
        }

        /* ── Status dot pulse (active mode only) ─────────────── */
        .status-dot-pulse {
          animation: status-pulse 2.5s ease-in-out infinite;
        }
        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }

        /* ── Tooltip (data-tooltip attr) ─────────────────────── */
        [data-tooltip] { position: relative; }
        [data-tooltip]::after {
          content: attr(data-tooltip);
          position: absolute; bottom: -30px; left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #1a1a2e; color: #fff;
          font-size: 11px; padding: 5px 10px; border-radius: 6px;
          white-space: nowrap; pointer-events: none; opacity: 0;
          transition: all 0.2s; z-index: 1020; font-weight: 500;
        }
        [data-theme="light"] [data-tooltip]::after { background: #1e293b; }
        [data-tooltip]:hover::after { opacity: 1; transform: translateX(-50%) translateY(0); }
        .mega-share-btn {
          width: 30px; height: 30px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--text-secondary); background: var(--bg-surface-2);
          border: 1px solid var(--border-color); transition: all .2s ease;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .mega-share-btn:hover { color: var(--accent-primary); border-color: var(--accent-primary); }
        .mega-share-btn:active,
        a:active,
        button:active { transform: scale(.96); }
        .desktop-search-pop {
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
        }
        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `}</style>
    </>
  )
}
