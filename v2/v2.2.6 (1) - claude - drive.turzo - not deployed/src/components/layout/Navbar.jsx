// ============================================================
// NAVBAR — v2.2.6
// Bug fixes from v2.2.5:
//   FIX 1: Nav items (top + float) now have click ripple effect (data-click-fx)
//   FIX 2: Floating navbar overflow — nf-inner uses min-width:0 + proper clamp padding
//   FIX 3: Mega nav same glass blur in both fixed and floating modes (already done via .mega-glass)
//          Floating nav mega panel now uses fixed viewport positioning (not constrained to pill width)
//   FIX 4: Floating navbar right icons now rounded-full via CSS class float-nav-right
//   FIX 5: CSS tooltips now work — overflow:visible on .nav-icon-btn (see index.css)
//          RippleLayer wrapped in .nav-ripple-clip to preserve ripple clipping
//   FIX 6: float-nav-right divs get data-nav-right for correct tooltip positioning
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

const FLOAT_THRESHOLD = 450

const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active',  pulse: true  },
  busy:    { color: '#ef4444', label: 'Busy',    pulse: false },
  away:    { color: '#f59e0b', label: 'Away',    pulse: false },
  offline: { color: '#6b7280', label: 'Offline', pulse: false },
}
const CURRENT_STATUS = 'active'

const NAV_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse,    title: 'Go back to the main homepage'      },
  { label: 'About',    path: '/about',    icon: faUser,     title: 'Learn about my journey and skills' },
  { label: 'Projects', path: '/projects', icon: faCode,     title: 'Browse projects I have built'      },
  { label: 'Feed',     path: '/feed',     icon: faRss,      title: 'Read my blogs and latest posts'    },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope, title: 'Send me a message or say hello'    },
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

function StatusDot({ mode = CURRENT_STATUS, size = 'md' }) {
  const s = STATUS_CONFIG[mode] || STATUS_CONFIG.active
  const dim = size === 'sm' ? 'w-2.5 h-2.5 border-[1.5px]' : 'w-3 h-3 border-2'
  return (
    <span
      className={`absolute -bottom-0.5 -right-0.5 ${dim} rounded-full border-[var(--bg-page)] transition-colors`}
      style={{ background: s.color }}
      title={s.label}
      aria-label={`Status: ${s.label}`}
    />
  )
}

function NavLogo({ size = 'md', showName = true, rounded = false, onClick }) {
  const [logoSrc, setLogoSrc] = useState('/logo.webp')
  const logoSize = size === 'sm' ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-base'
  const logoShape = rounded ? 'rounded-full' : 'rounded-[10px]'
  return (
    <Link to="/" onClick={onClick}
      className="flex-shrink-0 flex items-center gap-2.5 select-none group h-9">
      <div className={`relative ${logoSize} ${logoShape} flex items-center justify-center flex-shrink-0 overflow-visible`}>
        <img
          src={logoSrc}
          alt="Muhtasim logo"
          onError={() => setLogoSrc('/android-chrome-192x192.png')}
          className={`${logoSize} ${logoShape} object-cover border border-[var(--border-color)] bg-[var(--bg-surface-2)]`}
        />
        <StatusDot size={size} />
      </div>
      {showName && (
        <div className="flex flex-col leading-none">
          <span className="font-mono font-bold text-[16px] text-[var(--text-primary)] transition-colors leading-none">
            {SITE_CONFIG.navName}
          </span>
          <span className="text-[10px] text-[var(--text-tertiary)] font-mono leading-none mt-[3px]">
            {SITE_CONFIG.seo.twitterHandle}
          </span>
        </div>
      )}
    </Link>
  )
}

// FIX 5: RippleLayer now wrapped in .nav-ripple-clip to clip within button
// without requiring overflow:hidden on the button itself (which blocked tooltips)
function ThemeToggle({ size = 'md', className = '' }) {
  const { toggleTheme, isDark } = useThemeStore()
  const dark = isDark()
  const sz = size === 'sm' ? 'w-8 h-8 text-sm' : ''
  const { ripples, createRipple } = useRipple()
  const handleClick = (e) => { createRipple(e); toggleTheme() }
  return (
    <button onClick={handleClick}
      className={`nav-icon-btn ${sz} ${className}`}
      aria-label="Toggle theme"
      data-tooltip="Toggle theme"
      data-ripple-managed="true">
      <span className="nav-ripple-clip"><RippleLayer ripples={ripples} color="rgba(59,130,246,0.2)" /></span>
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

// FIX 5: RippleLayer in .nav-ripple-clip
function IconBtn({ icon, onClick, label, badge, active, className = '', tooltipSide }) {
  const { ripples, createRipple } = useRipple()
  const handleClick = (e) => { createRipple(e); onClick?.(e) }
  return (
    <button onClick={handleClick}
      className={`nav-icon-btn ${active ? '!bg-[var(--accent-light)] !text-[var(--accent-primary)] !border-[var(--accent-primary)]' : ''} ${className}`}
      aria-label={label}
      data-tooltip={label}
      data-tooltip-side={tooltipSide}
      data-ripple-managed="true">
      <span className="nav-ripple-clip"><RippleLayer ripples={ripples} color="rgba(59,130,246,0.2)" /></span>
      <FontAwesomeIcon icon={icon} />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold leading-none">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )
}

function SignInBtn({ className = '' }) {
  const { ripples, createRipple } = useRipple()
  return (
    <Link to="/login" onClick={createRipple}
      title="Sign in to your account"
      data-ripple-managed="true"
      className={`relative overflow-hidden h-9 flex items-center gap-1.5 px-4 py-0 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors ${className}`}>
      <span className="nav-ripple-clip"><RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" /></span>
      <FontAwesomeIcon icon={faSignIn} className="text-xs" />
      Sign In
    </Link>
  )
}

function NotifPanel({ onClose }) {
  const { notifications, reads, markRead, markAllRead, unreadCount } = useNotificationStore()
  const now = Date.now()
  const visible = notifications.filter(n => n.active && (!n.expires_at || new Date(n.expires_at).getTime() > now))
  return (
    <motion.div variants={dropVariants} initial="hidden" animate="visible" exit="exit"
      className="notif-panel absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]">
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

function UserDrop({ user, profile, isAdmin, avatar, displayName, onClose }) {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try { await signOutUser(); onClose(); navigate('/') }
    catch(e) { toast.error('Logout failed', e.message) }
  }
  return (
    <motion.div variants={dropVariants} initial="hidden" animate="visible" exit="exit"
      className="user-panel absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]">
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

function SocialMarquee({ compact = false }) {
  const trackRef = useRef(null)
  const isPaused = useRef(false)
  const dragRef  = useRef({ active: false, startX: 0, offset: 0, currentOffset: 0 })
  const items = [...SOCIAL_MARQUEE, ...SOCIAL_MARQUEE]

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; isPaused.current = true }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; isPaused.current = false }

  const onMouseDown = (e) => {
    dragRef.current = { ...dragRef.current, active: true, startX: e.pageX, offset: dragRef.current.currentOffset }
    pause(); e.preventDefault()
  }
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return
    const delta = e.pageX - dragRef.current.startX
    dragRef.current.currentOffset = dragRef.current.offset + delta
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dragRef.current.currentOffset}px)`
  }
  const onMouseUp = () => { if (dragRef.current.active) { dragRef.current.active = false; resume() } }

  const onWheel = (e) => {
    e.preventDefault()
    pause()
    dragRef.current.currentOffset = (dragRef.current.currentOffset || 0) - e.deltaY * 0.6
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dragRef.current.currentOffset}px)`
    clearTimeout(dragRef.current.wheelTimer)
    dragRef.current.wheelTimer = setTimeout(resume, 700)
  }

  const onTouchStart = (e) => {
    dragRef.current = { ...dragRef.current, active: true, startX: e.touches[0].pageX, offset: dragRef.current.currentOffset }
    pause()
  }
  const onTouchMove = (e) => {
    if (!dragRef.current.active) return
    const delta = e.touches[0].pageX - dragRef.current.startX
    dragRef.current.currentOffset = dragRef.current.offset + delta
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dragRef.current.currentOffset}px)`
  }
  const onTouchEnd = () => { dragRef.current.active = false; resume() }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp) }
  }, [])

  return (
    <div onMouseEnter={pause} onMouseLeave={resume} onWheel={onWheel}
      style={{ position:'relative', overflow:'hidden', height: compact ? 28 : 34, borderRadius:8,
        maskImage:'linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)',
        WebkitMaskImage:'linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)' }}>
      <div ref={trackRef} onMouseDown={onMouseDown}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        style={{ display:'inline-flex', gap: compact ? 10 : 16, alignItems:'center', height:'100%', whiteSpace:'nowrap',
          animation:'marquee-scroll 22s linear infinite', cursor:'grab', willChange:'transform', touchAction:'pan-x' }}>
        {items.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            onClick={e => { if (dragRef.current.currentOffset !== dragRef.current.offset) e.preventDefault() }}
            className={`inline-flex items-center gap-1.5 ${compact ? 'px-1.5 py-0.5' : 'px-2 py-1'} rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors no-underline flex-shrink-0`}>
            <FontAwesomeIcon icon={s.icon} className={s.cls} style={{fontSize: compact ? 12 : 13}} />
            <span className={compact ? 'text-[11px]' : ''}>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function MegaMenu({ onClose, isLoggedIn }) {
  const location = useLocation()
  const currentUrl = typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.siteURL
  const shareText = `Explore ${SITE_CONFIG.owner.displayName}'s portfolio`
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toast.success('Copied', 'Current page URL copied.')
    } catch {
      toast.error('Copy failed', 'Could not copy this URL.')
    }
  }
  const shareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: SITE_CONFIG.siteName, text: shareText, url: currentUrl })
        return
      }
      copyUrl()
    } catch (error) {
      if (error?.name !== 'AbortError') copyUrl()
    }
  }
  const itemClass = (path) => {
    const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    return `mega-nav-item relative overflow-hidden flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all group ${active ? 'is-mega-active bg-[var(--accent-light)] text-[var(--accent-primary)]' : ''}`
  }
  return (
    <AnimatePresence>
      <motion.div variants={megaVariants} initial="hidden" animate="visible" exit="exit"
        className="mega-panel absolute left-0 right-0 top-full z-[10000]">
        <div className="max-w-[1120px] mx-auto px-4 pt-2">
          <div className="rounded-2xl overflow-hidden mega-glass">
            <div className="h-[1.5px] w-full"
              style={{background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.5) 35%,rgba(59,130,246,0.5) 65%,transparent)'}} />
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
            <div className="mega-footer px-3 py-2 border-t border-[var(--border-color)] flex items-center gap-2">
              <button type="button" onClick={shareNative} className="mega-share-action" aria-label="Share this page" data-tooltip="Share this page">
                <FontAwesomeIcon icon={faShareNodes} className="text-[11px]" />
                <span>Share</span>
              </button>
              <div className="mega-url-field" title={currentUrl}>
                <span>{currentUrl}</span>
                <button type="button" onClick={copyUrl} className="mega-url-copy" aria-label="Copy URL" data-tooltip="Copy URL">
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
              <span className="mega-version-pill">
                Web&nbsp;<strong>{SITE_CONFIG.version}</strong>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function NavRight({ user, profile, isAdmin: isAdminProp, avatar, displayName, isLoggedIn, authLoading, unreadCount, openSearch, notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen, onMenuOpen, onMobileSearch }) {
  const { ripples: menuRipples, createRipple: createMenuRipple } = useRipple()
  return (
    // FIX 6: data-nav-right for correct right-aligned tooltip positioning
    <div className="flex items-center gap-1.5 flex-shrink-0" data-nav-right>
      <IconBtn icon={faSearch} onClick={openSearch} label="Search" className="hidden lg:flex" tooltipSide="right" />
      <IconBtn icon={faSearch} onClick={onMobileSearch} label="Search" className="lg:hidden" />

      <div className="notif-anchor relative">
        <IconBtn icon={faBell} onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); setMegaOpen(false) }}
          label="Notifications" badge={unreadCount} active={notifOpen} tooltipSide="right" />
        <AnimatePresence>{notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}</AnimatePresence>
      </div>

      <ThemeToggle />

      {authLoading ? <div className="w-9 h-9 rounded-full sk" /> : isLoggedIn ? (
        <div className="user-anchor relative">
          <button onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setMegaOpen(false) }}
            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${userOpen ? 'border-[var(--accent-primary)]' : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'}`}>
            {avatar ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
          </button>
          <AnimatePresence>{userOpen && <UserDrop user={user} profile={profile} isAdmin={isAdminProp} avatar={avatar} displayName={displayName} onClose={() => setUserOpen(false)} />}</AnimatePresence>
        </div>
      ) : <SignInBtn />}

      <div className="mega-anchor">
        <IconBtn icon={faTableCells} onClick={() => { setMegaOpen(!megaOpen); setNotifOpen(false); setUserOpen(false) }}
          label="More" active={megaOpen} tooltipSide="right" />
      </div>

      <button onClick={(e) => { createMenuRipple(e); onMenuOpen() }}
        className="lg:hidden nav-icon-btn"
        aria-label="Menu" data-tooltip="Menu" data-ripple-managed="true">
        <span className="nav-ripple-clip"><RippleLayer ripples={menuRipples} color="rgba(59,130,246,0.2)" /></span>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
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
  const [searchQuery,  setSearchQuery ] = useState('')
  const sidebarSearchRef = useRef(null)

  const isHomePage = ['/', '/home'].includes(location.pathname)

  useEffect(() => {
    const onScroll = () => setFloatVisible(window.scrollY > FLOAT_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false); setMegaOpen(false); setUserOpen(false)
    setNotifOpen(false); setSearchQuery('')
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.mega-anchor') && !e.target.closest('.mega-panel')) setMegaOpen(false)
      if (!e.target.closest('.notif-anchor') && !e.target.closest('.notif-panel')) setNotifOpen(false)
      if (!e.target.closest('.user-anchor') && !e.target.closest('.user-panel')) setUserOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleMobileSearch = () => {
    setMobileOpen(true)
    setTimeout(() => {
      sidebarSearchRef.current?.focus()
      sidebarSearchRef.current?.select()
    }, 320)
  }

  const handleDesktopSearch = () => {
    toast.info('Search is coming soon! 🔍')
    setMegaOpen(false); setNotifOpen(false); setUserOpen(false)
  }

  const sharedProps = {
    user, profile, isAdmin, avatar, displayName, isLoggedIn, authLoading, unreadCount,
    openSearch: handleDesktopSearch,
    notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen,
    onMenuOpen: () => setMobileOpen(true),
    onMobileSearch: handleMobileSearch,
  }

  const linkCls = (path) => (active) => {
    const isAct = path === '/' ? location.pathname === '/' : active
    return `top-nav-link ${isAct ? 'active' : ''}`
  }

  return (
    <>
      {/* ╔══ TOP NAVBAR ═══════════════════════════════════════╗ */}
      <nav
        className="relative z-10 w-full"
        style={{
          height: 'var(--navbar-h)',
          background: isHomePage ? 'transparent' : 'var(--navbar-bg)',
          borderBottom: `1px solid ${isHomePage ? 'transparent' : 'var(--navbar-border)'}`,
          backdropFilter: isHomePage ? 'none' : 'blur(14px)',
          WebkitBackdropFilter: isHomePage ? 'none' : 'blur(14px)',
        }}>
        <div className="navbar-inner flex items-center h-full gap-5">
          <NavLogo />

          {/* Center nav — desktop. FIX 1: data-click-fx for ripple effect */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map(link => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'}
                className={({ isActive }) => linkCls(link.path)(isActive)}
                title={link.title}
                data-click-fx="true">
                <FontAwesomeIcon icon={link.icon} className="text-xs opacity-80" />
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex ml-auto">
            <NavRight {...sharedProps} />
          </div>
          <div className="hidden md:flex lg:hidden items-center gap-1.5 ml-auto" data-nav-right>
            {!authLoading && !isLoggedIn && <SignInBtn className="h-8 text-xs px-3 py-0" />}
            <ThemeToggle size="sm" />
            <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
            <button onClick={() => setMobileOpen(true)}
              className="nav-icon-btn" aria-label="Menu" data-tooltip="Menu">
              <span className="nav-ripple-clip" />
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="flex md:hidden items-center gap-1.5 ml-auto" data-nav-right>
            {!authLoading && !isLoggedIn && (
              <Link to="/login"
                className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors"
                aria-label="Sign in" data-tooltip="Sign In">
                <FontAwesomeIcon icon={faSignIn} className="text-xs" />
              </Link>
            )}
            <ThemeToggle size="sm" />
            <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
            <button onClick={() => setMobileOpen(true)}
              className="nav-icon-btn" aria-label="Menu" data-tooltip="Menu">
              <span className="nav-ripple-clip" />
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {megaOpen && <div className="relative"><MegaMenu onClose={() => setMegaOpen(false)} isLoggedIn={isLoggedIn} /></div>}
      </nav>

      {/* ╔══ FLOATING NAVBAR ══════════════════════════════════╗ */}
      <AnimatePresence>
        {floatVisible && (
          <motion.div
            variants={floatVariants} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-3 pt-3 pointer-events-none">
            {/* FIX 2: nf-inner uses min-width:0 on children; content constrained properly */}
            <nav className="float-nav nf-inner relative pointer-events-auto flex items-center gap-3 w-full h-[52px] px-4 rounded-full overflow-visible">
              <NavLogo size="sm" rounded />

              {/* Center nav — FIX 1: data-click-fx for ripple effect */}
              <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5 min-w-0">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/'}
                    className={({ isActive }) => {
                      const isAct = link.path === '/' ? location.pathname === '/' : isActive
                      return `relative overflow-hidden flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium leading-none transition-all float-nav-link ${isAct ? 'float-nav-link-active' : ''}`
                    }}
                    title={link.title}
                    data-click-fx="true">
                    <FontAwesomeIcon icon={link.icon} className="text-xs opacity-80" />
                    <span className="text-[13.5px]">{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {/* Right — desktop. FIX 4+6: float-nav-right class = rounded-full icons; data-nav-right = tooltip positioning */}
              <div className="hidden lg:flex ml-auto float-nav-right" data-nav-right>
                <NavRight {...sharedProps} />
              </div>
              {/* Right — tablet */}
              <div className="hidden md:flex lg:hidden items-center gap-1.5 ml-auto float-nav-right" data-nav-right>
                {!authLoading && !isLoggedIn && <SignInBtn className="h-8 text-xs px-3 py-0" />}
                <ThemeToggle size="sm" />
                <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
                <button onClick={() => setMobileOpen(true)}
                  className="nav-icon-btn" aria-label="Menu" data-tooltip="Menu">
                  <span className="nav-ripple-clip" />
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>
              {/* Right — mobile */}
              <div className="flex md:hidden items-center gap-1.5 ml-auto float-nav-right" data-nav-right>
                {!authLoading && !isLoggedIn && (
                  <Link to="/login"
                    className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors"
                    aria-label="Sign in">
                    <FontAwesomeIcon icon={faSignIn} className="text-xs" />
                  </Link>
                )}
                <ThemeToggle size="sm" />
                <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
                <button onClick={() => setMobileOpen(true)}
                  className="nav-icon-btn" aria-label="Menu" data-tooltip="Menu">
                  <span className="nav-ripple-clip" />
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIX 3: Floating nav mega menu — fixed viewport overlay, NOT constrained to pill width */}
      <AnimatePresence>
        {floatVisible && megaOpen && (
          <motion.div
            key="float-mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', left: 0, right: 0, top: 64, zIndex: 'calc(var(--z-sticky) + 100)' }}>
            <MegaMenu onClose={() => setMegaOpen(false)} isLoggedIn={isLoggedIn} />
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

              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
                <NavLogo size="sm" onClick={() => setMobileOpen(false)} />
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

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

              <div className="px-4 mt-3 flex-shrink-0">
                <div className="sidebar-search-field flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] transition-all">
                  <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-xs flex-shrink-0" />
                  <input
                    ref={sidebarSearchRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Escape') { setSearchQuery(''); sidebarSearchRef.current?.blur() } }}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0"
                  />
                  {searchQuery.length > 0 && (
                    <button onClick={() => setSearchQuery('')} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0">
                      <FontAwesomeIcon icon={faXmark} className="text-xs" />
                    </button>
                  )}
                </div>
              </div>

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
              </div>

              <div className="flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-2.5">
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
                <SocialMarquee compact />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* navbar-inner — max-width 1120px + clamp padding */
        .navbar-inner {
          max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          width: 100%;
        }
        @media (min-width: 1440px) { .navbar-inner { padding-inline: 0; } }

        /* nf-inner — floating navbar same max-width */
        .nf-inner { max-width: 1120px; }

        /* ── Float nav glass ─────────────────────────── */
        .float-nav {
          background: rgba(10,18,40,0.75);
          border: 1px solid rgba(148,163,184,0.14);
          box-shadow: 0 8px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.1);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
        }
        [data-theme="light"] .float-nav {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(203,213,225,0.85);
          box-shadow: 0 6px 24px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
        }

        /* ── Float-nav center links hover/active ─────── */
        .float-nav-link {
          color: rgba(226,232,240,0.75);
          border: 1px solid transparent;
          transition: background .18s ease, border-color .18s ease, color .18s ease;
        }
        .float-nav-link:hover {
          background: rgba(59,130,246,0.10) !important;
          border-color: rgba(59,130,246,0.15) !important;
          color: #f1f5f9 !important;
        }
        .float-nav-link-active {
          background: rgba(59,130,246,0.18) !important;
          border-color: rgba(59,130,246,0.32) !important;
          color: rgba(147,197,253,1) !important;
        }
        [data-theme="light"] .float-nav-link { color: rgba(30,41,59,0.72); }
        [data-theme="light"] .float-nav-link:hover {
          background: rgba(37,99,235,0.10) !important;
          border-color: rgba(37,99,235,0.15) !important;
          color: #0f172a !important;
        }
        [data-theme="light"] .float-nav-link-active {
          background: rgba(37,99,235,0.12) !important;
          border-color: rgba(37,99,235,0.25) !important;
          color: var(--accent-primary) !important;
        }

        /* ── Mega nav item hover ─────────────────────── */
        .mega-nav-item:not(.is-mega-active):hover {
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.12);
        }
        .mega-nav-item { border: 1px solid transparent; transition: background 0.18s ease, border-color 0.18s ease; }
        [data-theme="light"] .mega-nav-item:not(.is-mega-active):hover {
          background: rgba(37,99,235,0.07);
          border-color: rgba(37,99,235,0.12);
        }

        /* ── Float-nav-right: glass overrides ────────── */
        .float-nav-right .nav-icon-btn {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.11) !important;
          color: rgba(226,232,240,0.80) !important;
        }
        .float-nav-right .nav-icon-btn:hover {
          background: rgba(255,255,255,0.14) !important;
          border-color: rgba(255,255,255,0.20) !important;
          color: #f1f5f9 !important;
        }
        [data-theme="light"] .float-nav-right .nav-icon-btn {
          background: rgba(15,23,42,0.05) !important;
          border-color: rgba(15,23,42,0.10) !important;
          color: rgba(30,41,59,0.75) !important;
        }
        [data-theme="light"] .float-nav-right .nav-icon-btn:hover {
          background: rgba(15,23,42,0.09) !important;
          border-color: rgba(15,23,42,0.15) !important;
          color: #0f172a !important;
        }

        /* ── Tooltip — enhanced visibility ──────────── */
        [data-tooltip] { position: relative; }
        [data-tooltip]::after,
        [data-tooltip]::before {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity .16s ease, transform .16s ease;
          z-index: 9999;
        }
        [data-tooltip]::after {
          content: attr(data-tooltip);
          bottom: -38px;
          left: 50%;
          transform: translateX(-50%) translateY(5px) scale(0.93);
          background: rgba(8, 15, 35, .97);
          color: #f1f5f9;
          border: 1px solid rgba(148,163,184,.18);
          box-shadow: 0 6px 20px rgba(0,0,0,.32), 0 2px 6px rgba(0,0,0,.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 11.5px;
          line-height: 1;
          padding: 6px 11px;
          border-radius: 8px;
          white-space: nowrap;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        [data-tooltip]::before {
          content: "";
          bottom: -10px;
          left: 50%;
          width: 7px; height: 7px;
          transform: translateX(-50%) translateY(5px) rotate(45deg);
          background: rgba(8,15,35,.97);
          border-left: 1px solid rgba(148,163,184,.18);
          border-top: 1px solid rgba(148,163,184,.18);
        }
        [data-theme="light"] [data-tooltip]::after {
          background: rgba(15,23,42,.97);
          border-color: rgba(100,116,139,.25);
          box-shadow: 0 6px 20px rgba(15,23,42,.22), 0 2px 6px rgba(15,23,42,.12);
        }
        [data-theme="light"] [data-tooltip]::before {
          background: rgba(15,23,42,.97);
          border-color: rgba(100,116,139,.25);
        }
        [data-tooltip]:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        [data-tooltip]:hover::before {
          opacity: 1;
          transform: translateX(-50%) translateY(0) rotate(45deg);
        }
        /* Right-aligned tooltips for nav-right icons */
        [data-nav-right] [data-tooltip]::after,
        [data-tooltip-side="right"]::after {
          left: auto; right: 0;
          transform: translateY(5px) scale(0.93);
        }
        [data-nav-right] [data-tooltip]::before,
        [data-tooltip-side="right"]::before {
          left: auto; right: 12px;
          transform: translateY(5px) rotate(45deg);
        }
        [data-nav-right] [data-tooltip]:hover::after,
        [data-tooltip-side="right"]:hover::after {
          transform: translateY(0) scale(1);
        }
        [data-nav-right] [data-tooltip]:hover::before,
        [data-tooltip-side="right"]:hover::before {
          transform: translateY(0) rotate(45deg);
        }

        /* ── Sidebar search glow ─────────────────────── */
        .sidebar-search-field { border-color: var(--border-color); }
        .sidebar-search-field:focus-within {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,.18), 0 0 16px rgba(59,130,246,.08) !important;
          background: var(--bg-surface) !important;
        }

        /* ── Mega footer ─────────────────────────────── */
        .mega-footer { display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; }
        .mega-url-copy {
          width: 30px; height: 30px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--text-tertiary); transition: all .2s ease; flex-shrink: 0;
        }
        .mega-url-copy:hover { color: var(--text-primary); background: var(--bg-surface-2); }

        .mega-share-action {
          height: 30px; padding: 0 12px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px; color: #fff;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #6366f1 100%);
          font-size: 11.5px; font-weight: 600; transition: all .22s ease; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(59,130,246,.28); border: none;
        }
        .mega-share-action:hover {
          background: linear-gradient(135deg, var(--accent-hover) 0%, #4f46e5 100%);
          box-shadow: 0 4px 14px rgba(59,130,246,.38); transform: translateY(-1px);
        }
        .mega-url-field {
          height: 30px; min-width: 0; flex: 1;
          display: flex; align-items: center; gap: 4px;
          border: 1px solid var(--border-color); border-radius: 999px;
          background: var(--bg-surface-2); padding: 0 4px 0 12px; overflow: hidden;
        }
        .mega-url-field span {
          min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .mega-version-pill {
          height: 28px; padding: 0 10px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; color: var(--text-tertiary);
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          white-space: nowrap; flex-shrink: 0;
        }
        .mega-version-pill strong { color: var(--text-primary); font-family: var(--font-mono); font-weight: 500; }

        .is-mega-active svg, .is-mega-active span { color: var(--accent-primary) !important; }

        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `}</style>
    </>
  )
}
