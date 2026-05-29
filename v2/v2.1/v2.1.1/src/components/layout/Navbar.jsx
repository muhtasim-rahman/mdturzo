// ============================================================
// NAVBAR — v2.1.1 Complete Rewrite
// Top navbar: position relative (scrolls away naturally)
// Floating navbar: fixed pill, appears at scrollY > 450
// Mega menu: 4-column redesign
// Sidebar: improved with social marquee
// Tooltip: rendered BELOW to avoid viewport overflow
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faUser, faCode, faRss, faEnvelope,
  faSearch, faBell, faSun, faMoon, faBars, faXmark,
  faTableCells, faChevronRight, faAddressCard,
  faShieldHalved, faCookie, faSignIn,
  faRightFromBracket, faGear, faChartPie, faFileContract,
  faNewspaper, faImages, faPlay, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin, faXTwitter, faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../hooks/useAuth.js'
import { useThemeStore } from '../../store/themeStore.js'
import { useNotificationStore } from '../../store/notificationStore.js'
import { useSearchStore } from '../../store/searchStore.js'
import { useAdmin } from '../../hooks/useAdmin.js'
import SITE_CONFIG from '../../config/site.config.js'
import { logout as signOutUser } from '../../services/firebase.js'
import { toast } from '../../store/toastStore.js'
import { useRipple, RippleLayer } from '../ui/Ripple.jsx'

// ── Constants ───────────────────────────────────────────────
const FLOAT_THRESHOLD = 450

const NAV_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse,   desc: 'Welcome to my portfolio'          },
  { label: 'About',    path: '/about',    icon: faUser,    desc: 'My journey and skills'            },
  { label: 'Projects', path: '/projects', icon: faCode,    desc: 'Work I\'ve built'                 },
  { label: 'Feed',     path: '/feed',     icon: faRss,     desc: 'Blogs & posts combined'           },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope,desc: 'Get in touch'                     },
]

const MEGA_COLS = [
  {
    label: 'Portfolio',
    color: '#3b82f6',
    items: [
      { label: 'Home',     path: '/',         icon: faHouse,    desc: 'Back to start'             },
      { label: 'About',    path: '/about',    icon: faUser,     desc: 'My story & skills'         },
      { label: 'Projects', path: '/projects', icon: faCode,     desc: 'Featured work & demos'     },
    ],
  },
  {
    label: 'Content',
    color: '#8b5cf6',
    items: [
      { label: 'Feed',     path: '/feed',     icon: faRss,      desc: 'Blogs & posts'             },
      { label: 'Contact',  path: '/contact',  icon: faEnvelope, desc: 'Send a message'            },
    ],
  },
  {
    label: 'Account',
    color: '#22c55e',
    items: [
      { label: 'Profile',  path: '/profile',  icon: faAddressCard, desc: 'Your account & settings' },
      { label: 'Admin',    path: '/admin',    icon: faShieldHalved,desc: 'Admin dashboard'          },
    ],
  },
  {
    label: 'Legal',
    color: '#f59e0b',
    items: [
      { label: 'Privacy Policy', path: '/privacy-policy', icon: faShieldHalved, desc: 'How we handle data' },
      { label: 'Cookies Policy', path: '/cookies-policy', icon: faCookie,       desc: 'Cookie preferences'  },
    ],
  },
]

const SOCIAL_MARQUEE = [
  { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: '@mdturzo999',    cls: 'text-red-500'  },
  { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'mdturzo999',     cls: 'text-blue-500' },
  { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: '@mdturzo999',    cls: 'text-pink-500' },
  { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'muhtasim-rahman',cls: 'text-purple-400'},
  { icon: faXTwitter,  url: SITE_CONFIG.social.twitter,   label: '@mdturzo999',    cls: 'text-sky-400'  },
  { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'mdturzo999',     cls: 'text-blue-400' },
  { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: '@mdturzo16',     cls: 'text-sky-400'  },
  { icon: faTiktok,    url: SITE_CONFIG.social.tiktok,    label: '@mdturzo16',     cls: 'text-pink-400' },
]

// ── Framer variants ─────────────────────────────────────────
const floatVariants = {
  hidden:  { y: -80, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } },
  exit:    { y: -80, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

const megaVariants = {
  hidden:  { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: 'top' },
  visible: { opacity: 1, y: 0,   scaleY: 1,    transition: { duration: 0.22, ease: [0.16,1,0.3,1] } },
  exit:    { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.14 } },
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

// ── Theme Toggle ────────────────────────────────────────────
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

// ── Icon Button with ripple ─────────────────────────────────
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

// ── Sign In Button with ripple ──────────────────────────────
function SignInBtn({ className = '' }) {
  const { ripples, createRipple } = useRipple()
  return (
    <Link to="/login" onClick={createRipple}
      className={`relative overflow-hidden flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors ${className}`}>
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faSignIn} className="text-xs" />
      Sign In
    </Link>
  )
}

// ── Notification Panel ──────────────────────────────────────
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

// ── User Dropdown ───────────────────────────────────────────
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

// ── Social Marquee (sidebar) ────────────────────────────────
function SocialMarquee() {
  const trackRef = useRef(null)
  const wrapRef  = useRef(null)
  const isPaused = useRef(false)
  const dragRef  = useRef({ active: false, startX: 0, offset: 0, currentOffset: 0 })

  const items = [...SOCIAL_MARQUEE, ...SOCIAL_MARQUEE]

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; isPaused.current = true }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; isPaused.current = false }

  const onMouseDown = (e) => {
    dragRef.current = { active: true, startX: e.pageX, offset: dragRef.current.currentOffset }
    pause()
    e.preventDefault()
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
    <div ref={wrapRef} onMouseEnter={pause} onMouseLeave={resume}
      style={{ position:'relative', overflow:'hidden', height:34, borderRadius:8,
        maskImage:'linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)',
        WebkitMaskImage:'linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)' }}>
      <div ref={trackRef} onMouseDown={onMouseDown}
        style={{ display:'inline-flex', gap:16, alignItems:'center', height:'100%', whiteSpace:'nowrap',
          animation:'marquee-scroll 22s linear infinite', cursor:'grab', willChange:'transform' }}>
        {items.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            onClick={e => { if (dragRef.current.currentOffset !== dragRef.current.offset) e.preventDefault() }}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors no-underline flex-shrink-0">
            <FontAwesomeIcon icon={s.icon} className={s.cls} style={{fontSize:13}} />
            <span>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Mega Menu ───────────────────────────────────────────────
function MegaMenu({ floating, onClose }) {
  return (
    <AnimatePresence>
      <motion.div variants={megaVariants} initial="hidden" animate="visible" exit="exit"
        className={`absolute left-0 right-0 ${floating ? 'top-[calc(100%+8px)]' : 'top-full'} z-[9998]`}>
        <div className="max-w-[1120px] mx-auto px-4">
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden">
            {/* Top gradient strip */}
            <div className="h-0.5 w-full" style={{background:'linear-gradient(90deg,#3b82f6,#8b5cf6,#22c55e,#f59e0b)'}} />
            <div className="grid grid-cols-4 gap-0 p-0">
              {MEGA_COLS.map((col, ci) => (
                <div key={col.label} className={`p-5 ${ci < 3 ? 'border-r border-[var(--border-color)]' : ''}`}>
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{background: col.color}} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">{col.label}</p>
                  </div>
                  <div className="space-y-0.5">
                    {col.items.map(item => (
                      <Link key={item.path} to={item.path} onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-surface-2)] transition-colors group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:scale-105"
                          style={{background: col.color + '18', color: col.color}}>
                          <FontAwesomeIcon icon={item.icon} className="text-xs" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">{item.label}</p>
                          <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Nav Right Icons (shared for both navbars) ───────────────
function NavRight({ floating, user, profile, isAdmin: isAdminProp, avatar, displayName, isLoggedIn, authLoading, unreadCount, openSearch, notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen, onMenuOpen }) {
  const notifRef = useRef(null)
  const userRef  = useRef(null)

  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      {/* Search */}
      <IconBtn icon={faSearch} onClick={openSearch} label="Search  Ctrl+K" />

      {/* Notifications */}
      <div ref={notifRef} className="relative">
        <IconBtn icon={faBell} onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); setMegaOpen(false) }}
          label="Notifications" badge={unreadCount} active={notifOpen} />
        <AnimatePresence>{notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}</AnimatePresence>
      </div>

      {/* Theme */}
      <ThemeToggle />

      {/* User */}
      {authLoading ? <div className="w-9 h-9 rounded-full sk" /> : isLoggedIn ? (
        <div ref={userRef} className="relative">
          <button onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setMegaOpen(false) }}
            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${userOpen ? 'border-[var(--accent-primary)]' : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'}`}>
            {avatar ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
          </button>
          <AnimatePresence>{userOpen && <UserDrop user={user} profile={profile} isAdmin={isAdminProp} avatar={avatar} displayName={displayName} onClose={() => setUserOpen(false)} />}</AnimatePresence>
        </div>
      ) : <SignInBtn />}

      {/* Mega menu */}
      <IconBtn icon={faTableCells} onClick={() => { setMegaOpen(!megaOpen); setNotifOpen(false); setUserOpen(false) }}
        label="All pages" active={megaOpen} />

      {/* Mobile hamburger */}
      <button onClick={onMenuOpen}
        className="lg:hidden relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Menu">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  )
}

// ── Main Navbar Export ──────────────────────────────────────
export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, isLoggedIn, avatar, displayName, authLoading } = useAuth()
  const { unreadCount, isOpen: notifOpen, setOpen: setNotifOpen } = useNotificationStore()
  const { openSearch } = useSearchStore()
  const { isAdmin } = useAdmin()

  const [floatVisible, setFloatVisible] = useState(false)
  const [mobileOpen,   setMobileOpen  ] = useState(false)
  const [megaOpen,     setMegaOpen    ] = useState(false)
  const [userOpen,     setUserOpen    ] = useState(false)

  // Scroll: show floating navbar at 450px
  useEffect(() => {
    const onScroll = () => setFloatVisible(window.scrollY > FLOAT_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false); setMegaOpen(false); setUserOpen(false); setNotifOpen(false)
  }, [location.pathname])

  // Body scroll lock when sidebar open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Ctrl+K → search
  useEffect(() => {
    const h = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch() } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // Close mega/notif/user on outside click
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.mega-anchor') && !e.target.closest('.mega-panel')) setMegaOpen(false)
      if (!e.target.closest('.notif-anchor') && !e.target.closest('.notif-panel')) setNotifOpen(false)
      if (!e.target.closest('.user-anchor') && !e.target.closest('.user-panel')) setUserOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const sharedProps = {
    user, profile, isAdmin, avatar, displayName, isLoggedIn, authLoading, unreadCount, openSearch,
    notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen,
    onMenuOpen: () => setMobileOpen(true),
  }

  // Nav link class helper
  const linkCls = (path) => (active) => {
    const isAct = path === '/' ? location.pathname === '/' : active
    return `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${isAct ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'}`
  }

  return (
    <>
      {/* ╔══ TOP NAVBAR (relative, scrolls away) ══════════════╗ */}
      <nav className="relative z-10 w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md"
        style={{ height: 'var(--navbar-h)' }}>
        <div className="flex items-center h-full max-w-[1120px] mx-auto px-7 gap-5">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center font-mono font-bold text-lg select-none">
            <span className="text-[var(--accent-primary)]">@</span>
            <span className="text-[var(--text-primary)]">mdturzo999</span>
            <motion.span className="inline-block w-2 h-2 rounded-full bg-[var(--clr-success)] ml-2 mb-0.5 flex-shrink-0"
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map(link => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'}
                className={({ isActive }) => linkCls(link.path)(isActive)}
                data-tooltip={link.desc}>
                <FontAwesomeIcon icon={link.icon} className="text-xs opacity-80" />
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden lg:flex ml-auto">
            <NavRight floating={false} {...sharedProps} />
          </div>
          {/* Right — mobile (condensed) */}
          <div className="flex lg:hidden items-center gap-1.5 ml-auto">
            <ThemeToggle size="sm" />
            {!authLoading && !isLoggedIn && <SignInBtn className="text-xs px-3 py-1.5" />}
            <button onClick={() => setMobileOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]" aria-label="Menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* Mega menu for top navbar */}
        {megaOpen && <div className="relative"><MegaMenu floating={false} onClose={() => setMegaOpen(false)} /></div>}
      </nav>

      {/* ╔══ FLOATING NAVBAR (fixed pill, visible after 450px) ═╗ */}
      <AnimatePresence>
        {floatVisible && (
          <motion.div
            variants={floatVariants} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-4 pt-3 pointer-events-none">
            <nav className="relative pointer-events-auto flex items-center gap-4 w-full max-w-[1120px] h-[52px] px-4 rounded-full bg-[var(--navbar-bg)] border border-[var(--navbar-border)] shadow-[var(--navbar-shadow)] backdrop-blur-2xl">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center font-mono font-bold text-[15px] select-none">
                <span className="text-[var(--accent-primary)]">@</span>
                <span className="text-[var(--text-primary)]">mdturzo999</span>
              </Link>

              {/* Center nav */}
              <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/'}
                    className={({ isActive }) => linkCls(link.path)(isActive)}
                    data-tooltip={link.desc}>
                    <FontAwesomeIcon icon={link.icon} className="text-xs opacity-80" />
                    <span className="text-[13.5px]">{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {/* Right */}
              <div className="hidden lg:flex ml-auto">
                <NavRight floating={true} {...sharedProps} />
              </div>
              <div className="flex lg:hidden items-center gap-1.5 ml-auto">
                <ThemeToggle size="sm" />
                {!authLoading && !isLoggedIn && <SignInBtn />}
                <button onClick={() => setMobileOpen(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]">
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>

              {/* Mega menu for floating navbar */}
              {megaOpen && <div className="absolute inset-x-0 top-full"><MegaMenu floating={true} onClose={() => setMegaOpen(false)} /></div>}
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
                <Link to="/" onClick={() => setMobileOpen(false)} className="font-mono font-bold text-base flex items-center">
                  <span className="text-[var(--accent-primary)]">@</span><span className="text-[var(--text-primary)]">mdturzo999</span>
                </Link>
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* User card (if logged in) */}
              {isLoggedIn && (
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

              {/* Search */}
              <div className="px-4 mt-3 flex-shrink-0">
                <button onClick={() => { openSearch(); setMobileOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-tertiary)] hover:border-[var(--accent-primary)] transition-colors text-sm">
                  <FontAwesomeIcon icon={faSearch} className="text-xs" />
                  <span>Search pages...</span>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-3 sidebar-scroll">
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
                  { label: 'My Profile', path: '/profile', icon: faAddressCard },
                  { label: 'Privacy Policy', path: '/privacy-policy', icon: faShieldHalved },
                  { label: 'Cookies Policy', path: '/cookies-policy', icon: faCookie },
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
              </div>

              {/* Footer */}
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
    </>
  )
}
