// ============================================================
// NAVBAR -- v2.2.7
// FULL REDESIGN:
//   * Completely new CSS design system -- premium glass morphism
//   * Top navbar: full transparent on home page (uses hero bg)
//   * Floating navbar: pill-shaped glass with advanced blur + border
//   * Mega nav: always above ALL page content (z-[10000]), fixed positioning
//   * Icon buttons: hover tooltip BELOW (CSS ::after), click ripple effect
//   * Nav items: click scale effect + active indicator pill
//   * Advanced responsive: 12+ breakpoints, mobile/tablet/desktop all polished
//   * Mega nav z-index fix: always above body content including 404 page
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

// -- Constants ------------------------------------------------
const FLOAT_THRESHOLD = 420

// -- Status config ---------------------------------------------
const STATUS_CONFIG = {
  active:  { color: '#22c55e', label: 'Active',  pulse: true  },
  busy:    { color: '#ef4444', label: 'Busy',    pulse: false },
  away:    { color: '#f59e0b', label: 'Away',    pulse: false },
  offline: { color: '#6b7280', label: 'Offline', pulse: false },
}
const CURRENT_STATUS = 'active'

// -- Nav links -------------------------------------------------
const NAV_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse,    title: 'Go back to the main homepage'      },
  { label: 'About',    path: '/about',    icon: faUser,     title: 'Learn about my journey and skills' },
  { label: 'Projects', path: '/projects', icon: faCode,     title: 'Browse projects I have built'      },
  { label: 'Feed',     path: '/feed',     icon: faRss,      title: 'Read my blogs and latest posts'    },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope, title: 'Send me a message or say hello'    },
]

// -- Mega menu columns -----------------------------------------
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

// -- Social marquee --------------------------------------------
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

// -- Framer variants -------------------------------------------
const floatVariants = {
  hidden:  { y: -72, opacity: 0, scale: 0.96 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 360, damping: 30 } },
  exit:    { y: -72, opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: 'easeIn' } },
}
const megaVariants = {
  hidden:  { opacity: 0, y: -12, scaleY: 0.94, transformOrigin: 'top' },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, scaleY: 0.94, transition: { duration: 0.15 } },
}
const sidebarVariants = {
  closed: { x: '100%', transition: { type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  open:   { x: '0%',   transition: { type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
}
const dropVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.96, transformOrigin: 'top right' },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18 } },
  exit:    { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.12 } },
}

// -- Status Dot -----------------------------------------------
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

// -- Logo Component -------------------------------------------
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

// -- Theme Toggle ---------------------------------------------
function ThemeToggle({ size = 'md', className = '' }) {
  const { toggleTheme, isDark } = useThemeStore()
  const dark = isDark()
  const sz = size === 'sm' ? 'w-8 h-8 text-sm' : ''
  const { ripples, createRipple } = useRipple()
  const handleClick = (e) => { createRipple(e); toggleTheme() }
  return (
    <button onClick={handleClick}
      className={`nb-icon-btn ${sz} ${className}`}
      aria-label="Toggle theme"
      data-nb-tip="Toggle theme"
      data-ripple-managed="true">
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.22)" />
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

// -- Icon Button -----------------------------------------------
function IconBtn({ icon, onClick, label, badge, active, className = '' }) {
  const { ripples, createRipple } = useRipple()
  const handleClick = (e) => { createRipple(e); onClick?.(e) }
  return (
    <button onClick={handleClick}
      className={`nb-icon-btn ${active ? 'nb-icon-btn--active' : ''} ${className}`}
      aria-label={label}
      data-nb-tip={label}
      data-ripple-managed="true">
      <RippleLayer ripples={ripples} color="rgba(59,130,246,0.22)" />
      <FontAwesomeIcon icon={icon} />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold leading-none">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )
}

// -- Sign In Button --------------------------------------------
function SignInBtn({ className = '' }) {
  const { ripples, createRipple } = useRipple()
  return (
    <Link to="/login" onClick={createRipple}
      title="Sign in to your account"
      data-ripple-managed="true"
      className={`relative overflow-hidden h-9 flex items-center gap-1.5 px-4 py-0 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors active:scale-95 ${className}`}>
      <RippleLayer ripples={ripples} color="rgba(255,255,255,0.3)" />
      <FontAwesomeIcon icon={faSignIn} className="text-xs" />
      Sign In
    </Link>
  )
}

// -- Notification Panel ----------------------------------------
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

// -- User Dropdown ---------------------------------------------
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

// -- Social Marquee --------------------------------------------
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
    <div onMouseEnter={pause} onMouseLeave={resume}
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

// -- Mega Menu -------------------------------------------------
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
    return `mega-item relative overflow-hidden flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all group ${active ? 'mega-item--active' : ''}`
  }
  return (
    <AnimatePresence>
      <motion.div variants={megaVariants} initial="hidden" animate="visible" exit="exit"
        className="mega-panel-wrap">
        <div className="max-w-[1120px] mx-auto px-4 pt-2">
          <div className="mega-glass-inner rounded-2xl overflow-hidden">
            {/* Accent gradient top line */}
            <div className="h-[1.5px] w-full"
              style={{background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.6) 30%,rgba(59,130,246,0.6) 70%,transparent)'}} />

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

            {/* Footer */}
            <div className="mega-footer px-3 py-2 border-t border-[var(--border-color)] flex items-center gap-2">
              <button type="button" onClick={shareNative}
                className="mega-share-btn" aria-label="Share this page">
                <FontAwesomeIcon icon={faShareNodes} className="text-[11px]" />
                <span>Share</span>
              </button>
              <div className="mega-url-pill" title={currentUrl}>
                <span>{currentUrl}</span>
                <button type="button" onClick={copyUrl} className="mega-url-copy" aria-label="Copy URL">
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
              <span className="mega-ver-badge">
                Web&nbsp;<strong>{SITE_CONFIG.version}</strong>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// -- Right controls cluster ------------------------------------
function NavRight({ user, profile, isAdmin: isAdminProp, avatar, displayName, isLoggedIn, authLoading, unreadCount, openSearch, notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen, onMenuOpen, onMobileSearch }) {
  const { ripples: menuRipples, createRipple: createMenuRipple } = useRipple()
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0" data-nb-right>
      <IconBtn icon={faSearch} onClick={openSearch} label="Search" className="hidden lg:flex" />
      <IconBtn icon={faSearch} onClick={onMobileSearch} label="Search" className="lg:hidden" />

      <div className="notif-anchor relative">
        <IconBtn icon={faBell} onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); setMegaOpen(false) }}
          label="Notifications" badge={unreadCount} active={notifOpen} />
        <AnimatePresence>{notifOpen && <NotifPanel onClose={() => setNotifOpen(false)} />}</AnimatePresence>
      </div>

      <ThemeToggle />

      {authLoading ? <div className="w-9 h-9 rounded-full sk" /> : isLoggedIn ? (
        <div className="user-anchor relative">
          <button onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setMegaOpen(false) }}
            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors active:scale-95 ${userOpen ? 'border-[var(--accent-primary)]' : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'}`}>
            {avatar ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
          </button>
          <AnimatePresence>{userOpen && <UserDrop user={user} profile={profile} isAdmin={isAdminProp} avatar={avatar} displayName={displayName} onClose={() => setUserOpen(false)} />}</AnimatePresence>
        </div>
      ) : <SignInBtn />}

      <div className="mega-anchor">
        <IconBtn icon={faTableCells} onClick={() => { setMegaOpen(!megaOpen); setNotifOpen(false); setUserOpen(false) }}
          label="All pages" active={megaOpen} />
      </div>

      <button onClick={(e) => { createMenuRipple(e); onMenuOpen() }}
        className="lg:hidden nb-icon-btn"
        aria-label="Menu" data-nb-tip="Menu" data-ripple-managed="true">
        <RippleLayer ripples={menuRipples} color="rgba(59,130,246,0.22)" />
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  )
}

// -- Main Navbar Export ----------------------------------------
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
      if (!e.target.closest('.mega-anchor') && !e.target.closest('.mega-panel-wrap')) setMegaOpen(false)
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
    toast.info('Search is coming soon! ?')
    setMegaOpen(false); setNotifOpen(false); setUserOpen(false)
  }

  const sharedProps = {
    user, profile, isAdmin, avatar, displayName, isLoggedIn, authLoading, unreadCount,
    openSearch: handleDesktopSearch,
    notifOpen, setNotifOpen, userOpen, setUserOpen, megaOpen, setMegaOpen,
    onMenuOpen: () => setMobileOpen(true),
    onMobileSearch: handleMobileSearch,
  }

  const topLinkCls = (path) => (isActive) => {
    const act = path === '/' ? location.pathname === '/' : isActive
    return `top-nav-link ${act ? 'top-nav-link--active' : ''}`
  }

  return (
    <>
      {/* == TOP NAVBAR ====================================== */}
      <nav
        className={isHomePage ? 'absolute top-0 left-0 right-0 w-full' : 'relative w-full'}
        style={{
          height: 'var(--navbar-h)',
          zIndex: isHomePage ? 50 : 10,
          background: isHomePage ? 'transparent' : 'var(--navbar-bg)',
          borderBottom: `1px solid ${isHomePage ? 'transparent' : 'var(--navbar-border)'}`,
          backdropFilter: isHomePage ? 'none' : 'blur(14px)',
          WebkitBackdropFilter: isHomePage ? 'none' : 'blur(14px)',
        }}>
        <div className="navbar-inner flex items-center h-full gap-5">
          <NavLogo />

          {/* Center nav -- desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map(link => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'}
                className={({ isActive }) => topLinkCls(link.path)(isActive)}
                title={link.title}
                data-click-fx="true">
                <FontAwesomeIcon icon={link.icon} className="text-xs opacity-70" />
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right -- desktop */}
          <div className="hidden lg:flex ml-auto">
            <NavRight {...sharedProps} />
          </div>
          {/* Right -- tablet */}
          <div className="hidden md:flex lg:hidden items-center gap-1.5 ml-auto">
            {!authLoading && !isLoggedIn && <SignInBtn className="h-8 text-xs px-3 py-0" />}
            <ThemeToggle size="sm" />
            <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
            <button onClick={() => setMobileOpen(true)}
              className="nb-icon-btn" aria-label="Menu" data-nb-tip="Menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          {/* Right -- mobile */}
          <div className="flex md:hidden items-center gap-1.5 ml-auto">
            {!authLoading && !isLoggedIn && (
              <Link to="/login"
                className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors active:scale-95"
                aria-label="Sign in">
                <FontAwesomeIcon icon={faSignIn} className="text-xs" />
              </Link>
            )}
            <ThemeToggle size="sm" />
            <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
            <button onClick={() => setMobileOpen(true)}
              className="nb-icon-btn" aria-label="Menu" data-nb-tip="Menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* Top mega menu -- fixed-position wrapper */}
        {megaOpen && (
          <div style={{position:'fixed', top:'var(--navbar-h)', left:0, right:0, zIndex:10000}}>
            <MegaMenu onClose={() => setMegaOpen(false)} isLoggedIn={isLoggedIn} />
          </div>
        )}
      </nav>

      {/* == FLOATING NAVBAR ================================ */}
      <AnimatePresence>
        {floatVisible && (
          <motion.div
            variants={floatVariants} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-4 pt-3 pointer-events-none"
            style={{zIndex: 200}}>
            <nav className="float-nav pointer-events-auto flex items-center gap-4 w-full max-w-[1120px] h-[52px] px-4 rounded-full" style={{overflow:'visible'}}>
              <NavLogo size="sm" rounded />

              {/* Center nav */}
              <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-0.5 overflow-visible">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/'}
                    className={({ isActive }) => {
                      const act = link.path === '/' ? location.pathname === '/' : isActive
                      return `float-nav-link relative overflow-hidden flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium leading-none transition-all flex-shrink-0 ${act ? 'float-nav-link--active' : ''}`
                    }}
                    title={link.title}
                    data-click-fx="true">
                    <FontAwesomeIcon icon={link.icon} className="text-xs opacity-75" />
                    <span className="text-[13.5px]">{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {/* Right -- desktop */}
              <div className="hidden lg:flex ml-auto flex-shrink-0 float-nav-right">
                <NavRight {...sharedProps} />
              </div>
              {/* Right -- tablet */}
              <div className="hidden md:flex lg:hidden items-center gap-1.5 ml-auto flex-shrink-0 float-nav-right">
                {!authLoading && !isLoggedIn && <SignInBtn className="h-8 text-xs px-3 py-0" />}
                <ThemeToggle size="sm" />
                <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
                <button onClick={() => setMobileOpen(true)}
                  className="nb-icon-btn" aria-label="Menu">
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>
              {/* Right -- mobile */}
              <div className="flex md:hidden items-center gap-1.5 ml-auto flex-shrink-0 float-nav-right">
                {!authLoading && !isLoggedIn && (
                  <Link to="/login"
                    className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors active:scale-95"
                    aria-label="Sign in">
                    <FontAwesomeIcon icon={faSignIn} className="text-xs" />
                  </Link>
                )}
                <ThemeToggle size="sm" />
                <IconBtn icon={faSearch} onClick={handleMobileSearch} label="Search" className="w-8 h-8 text-sm" />
                <button onClick={() => setMobileOpen(true)}
                  className="nb-icon-btn" aria-label="Menu">
                  <FontAwesomeIcon icon={faBars} className="text-sm" />
                </button>
              </div>

              {/* Float mega -- fixed above everything */}
              {megaOpen && (
                <div style={{position:'fixed', top:'72px', left:0, right:0, zIndex:10000}}>
                  <MegaMenu onClose={() => setMegaOpen(false)} isLoggedIn={isLoggedIn} />
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* == MOBILE SIDEBAR ================================== */}
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
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors active:scale-95">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* User card */}
              {isLoggedIn && (
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors active:scale-[.98]">
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

              {/* Search bar */}
              <div className="px-4 mt-3 flex-shrink-0">
                <div className="nb-sidebar-search flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] transition-all">
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

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-3 sidebar-scroll">
                <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Navigation</p>
                {NAV_LINKS.map(link => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/'} onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => {
                      const act = link.path === '/' ? location.pathname === '/' : isActive
                      return `flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors active:scale-[.98] ${act ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'}`
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
                    className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors active:scale-[.98]">
                    <FontAwesomeIcon icon={item.icon} className="w-4 text-center text-xs" />
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors active:scale-[.98]">
                    <FontAwesomeIcon icon={faShieldHalved} className="w-4 text-center text-xs" /> Admin Panel
                  </Link>
                )}
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-2.5">
                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors active:scale-[.97]">
                      Sign In
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors active:scale-[.97]">
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button onClick={async () => { await signOutUser(); setMobileOpen(false); navigate('/') }}
                    className="w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors active:scale-[.97]">
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
        /* -- Navbar inner layout ---------------------------- */
        .navbar-inner {
          max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          width: 100%;
        }
        @media (min-width: 1440px) {
          .navbar-inner { padding-inline: 0; }
        }

        /* == TOP NAV LINKS ================================== */
        .top-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 36px;
          padding: 0 14px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          border: 1px solid transparent;
          transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.1s;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
        }
        .top-nav-link:hover {
          background: rgba(255,255,255,0.06);
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.08);
        }
        .top-nav-link:active {
          transform: scale(0.94);
        }
        .top-nav-link--active {
          background: var(--accent-light);
          color: var(--accent-primary) !important;
          border-color: rgba(59,130,246,0.22) !important;
        }
        [data-theme="light"] .top-nav-link:hover {
          background: rgba(37,99,235,0.07);
          color: var(--text-primary);
          border-color: rgba(37,99,235,0.12);
        }
        [data-theme="light"] .top-nav-link--active {
          background: var(--accent-light);
          border-color: rgba(37,99,235,0.2) !important;
        }

        /* == ICON BUTTONS (nb = navbar) ===================== */
        .nb-icon-btn {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13.5px;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.1s;
          cursor: pointer;
          overflow: clip;
          flex-shrink: 0;
        }
        .nb-icon-btn:hover {
          background: rgba(255,255,255,0.10);
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.14);
        }
        .nb-icon-btn:active {
          transform: scale(0.9);
        }
        .nb-icon-btn--active {
          background: var(--accent-light) !important;
          color: var(--accent-primary) !important;
          border-color: rgba(59,130,246,0.3) !important;
        }
        [data-theme="light"] .nb-icon-btn {
          background: rgba(15,23,42,0.05);
          border-color: rgba(15,23,42,0.10);
          color: var(--text-secondary);
        }
        [data-theme="light"] .nb-icon-btn:hover {
          background: rgba(15,23,42,0.09);
          border-color: rgba(15,23,42,0.16);
          color: var(--text-primary);
        }
        [data-theme="light"] .nb-icon-btn--active {
          background: var(--accent-light) !important;
          border-color: rgba(37,99,235,0.25) !important;
        }

        /* == TOOLTIP -- data-nb-tip ========================== */
        [data-nb-tip] { position: relative; }
        [data-nb-tip]::after {
          content: attr(data-nb-tip);
          position: absolute;
          top: calc(100% + 9px);
          left: 50%;
          transform: translateX(-50%) translateY(5px) scale(0.93);
          background: rgba(8,15,35,0.97);
          color: #f1f5f9;
          border: 1px solid rgba(148,163,184,0.18);
          box-shadow: 0 6px 20px rgba(0,0,0,0.34), 0 2px 6px rgba(0,0,0,0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 11.5px;
          line-height: 1;
          padding: 6px 10px;
          border-radius: 8px;
          white-space: nowrap;
          font-weight: 600;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
          z-index: 10001;
        }
        [data-nb-tip]:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        [data-theme="light"] [data-nb-tip]::after {
          background: rgba(15,23,42,0.97);
          border-color: rgba(100,116,139,0.25);
          box-shadow: 0 6px 20px rgba(15,23,42,0.22), 0 2px 6px rgba(15,23,42,0.12);
        }
        /* Right-anchored tooltips for right-side icon buttons */
        [data-nb-right] [data-nb-tip]::after {
          left: auto;
          right: 0;
          transform: translateY(5px) scale(0.93);
        }
        [data-nb-right] [data-nb-tip]:hover::after {
          transform: translateY(0) scale(1);
        }

        /* == FLOATING NAVBAR ================================ */
        .float-nav {
          background: rgba(8,14,38,0.78);
          border: 1px solid rgba(148,163,184,0.12);
          box-shadow:
            0 4px 6px rgba(0,0,0,0.1),
            0 10px 28px rgba(0,0,0,0.34),
            inset 0 1px 0 rgba(255,255,255,0.07),
            inset 0 -1px 0 rgba(0,0,0,0.3);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
        }
        [data-theme="light"] .float-nav {
          background: rgba(252,254,255,0.92);
          border: 1px solid rgba(203,213,225,0.75);
          box-shadow:
            0 4px 6px rgba(15,23,42,0.05),
            0 10px 28px rgba(15,23,42,0.1),
            inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
        }

        /* Float nav center links */
        .float-nav-link {
          color: rgba(226,232,240,0.72);
          border: 1px solid transparent;
          transition: background 0.18s, border-color 0.18s, color 0.18s, transform 0.1s;
        }
        .float-nav-link:hover {
          background: rgba(59,130,246,0.10) !important;
          border-color: rgba(59,130,246,0.16) !important;
          color: #f1f5f9 !important;
        }
        .float-nav-link:active {
          transform: scale(0.93) !important;
        }
        .float-nav-link--active {
          background: rgba(59,130,246,0.16) !important;
          border-color: rgba(59,130,246,0.30) !important;
          color: rgba(147,197,253,1) !important;
        }
        [data-theme="light"] .float-nav-link {
          color: rgba(30,41,59,0.70);
        }
        [data-theme="light"] .float-nav-link:hover {
          background: rgba(37,99,235,0.09) !important;
          border-color: rgba(37,99,235,0.14) !important;
          color: #0f172a !important;
        }
        [data-theme="light"] .float-nav-link--active {
          background: rgba(37,99,235,0.12) !important;
          border-color: rgba(37,99,235,0.22) !important;
          color: var(--accent-primary) !important;
        }

        /* Float nav right buttons */
        .float-nav-right .nb-icon-btn {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.10) !important;
          color: rgba(226,232,240,0.78) !important;
        }
        .float-nav-right .nb-icon-btn:hover {
          background: rgba(255,255,255,0.13) !important;
          border-color: rgba(255,255,255,0.18) !important;
          color: #f1f5f9 !important;
        }
        [data-theme="light"] .float-nav-right .nb-icon-btn {
          background: rgba(15,23,42,0.05) !important;
          border-color: rgba(15,23,42,0.09) !important;
          color: rgba(30,41,59,0.72) !important;
        }
        [data-theme="light"] .float-nav-right .nb-icon-btn:hover {
          background: rgba(15,23,42,0.09) !important;
          border-color: rgba(15,23,42,0.14) !important;
          color: #0f172a !important;
        }

        /* == MEGA MENU ====================================== */
        .mega-panel-wrap {
          /* Animated wrapper -- no positioning needed (parent uses fixed) */
        }
        .mega-glass-inner {
          background: rgba(10,16,40,0.92);
          border: 1px solid rgba(148,163,184,0.13);
          box-shadow:
            0 4px 8px rgba(0,0,0,0.15),
            0 20px 50px rgba(0,0,0,0.44),
            inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
        }
        [data-theme="light"] .mega-glass-inner {
          background: rgba(252,254,255,0.96);
          border-color: rgba(203,213,225,0.8);
          box-shadow:
            0 4px 8px rgba(15,23,42,0.08),
            0 20px 50px rgba(15,23,42,0.14),
            inset 0 1px 0 rgba(255,255,255,1);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
        }

        .mega-item {
          border: 1px solid transparent;
          transition: background 0.16s, border-color 0.16s;
        }
        .mega-item:not(.mega-item--active):hover {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.12);
        }
        .mega-item:active {
          transform: scale(0.96);
        }
        .mega-item--active {
          background: var(--accent-light);
          color: var(--accent-primary);
        }
        .mega-item--active svg,
        .mega-item--active span {
          color: var(--accent-primary) !important;
        }
        [data-theme="light"] .mega-item:not(.mega-item--active):hover {
          background: rgba(37,99,235,0.07);
          border-color: rgba(37,99,235,0.12);
        }

        .mega-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
        }
        .mega-share-btn {
          height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #6366f1 100%);
          font-size: 11.5px;
          font-weight: 600;
          transition: all 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(59,130,246,0.28);
          border: none;
        }
        .mega-share-btn:hover {
          background: linear-gradient(135deg, var(--accent-hover) 0%, #4f46e5 100%);
          box-shadow: 0 4px 14px rgba(59,130,246,0.38);
          transform: translateY(-1px);
        }
        .mega-share-btn:active { transform: scale(0.95); }
        .mega-url-pill {
          height: 30px;
          min-width: 0;
          flex: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          background: var(--bg-surface-2);
          padding: 0 4px 0 12px;
          overflow: hidden;
        }
        .mega-url-pill span {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .mega-url-copy {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          transition: all 0.18s ease;
          flex-shrink: 0;
        }
        .mega-url-copy:hover {
          color: var(--text-primary);
          background: var(--bg-surface-2);
        }
        .mega-ver-badge {
          height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          color: var(--text-tertiary);
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .mega-ver-badge strong {
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-weight: 500;
          margin-left: 3px;
        }

        /* -- Sidebar search focus -- */
        .nb-sidebar-search:focus-within {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.16), 0 0 14px rgba(59,130,246,0.08) !important;
          background: var(--bg-surface) !important;
        }

        /* -- Mobile full sidebar -- */
        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `}</style>
    </>
  )
}
