// ============================================================
// NAVBAR — v2.1.0 Full Implementation
// Desktop: logo + center nav + right icons
// Mobile: logo + theme toggle + hamburger → sidebar drawer
// Scroll: transparent → glass morphism floating pill
// Mega menu: grid icon → full dropdown panel
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
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../hooks/useAuth.js'
import { useThemeStore } from '../../store/themeStore.js'
import { useNotificationStore } from '../../store/notificationStore.js'
import { useSearchStore } from '../../store/searchStore.js'
import { useAdmin } from '../../hooks/useAdmin.js'
import SITE_CONFIG from '../../config/site.config.js'
import { logout as signOutUser } from "../../services/firebase.js"
import { toast } from '../../store/toastStore.js'

// ── Nav links ──────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse    },
  { label: 'About',    path: '/about',    icon: faUser     },
  { label: 'Projects', path: '/projects', icon: faCode     },
  { label: 'Feed',     path: '/feed',     icon: faRss      },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope },
]

// ── Mega menu categories ────────────────────────────────────
const MEGA_MENU = [
  {
    label: 'Portfolio',
    items: [
      { label: 'Home',        path: '/',         icon: faHouse,       desc: 'Start here'          },
      { label: 'About',       path: '/about',    icon: faUser,        desc: 'Who I am'            },
      { label: 'Projects',    path: '/projects', icon: faCode,        desc: 'Work I\'ve built'    },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Feed',        path: '/feed',     icon: faRss,         desc: 'Blogs & posts'       },
      { label: 'Contact',     path: '/contact',  icon: faEnvelope,    desc: 'Get in touch'        },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile',     path: '/profile',  icon: faAddressCard, desc: 'Your account'        },
    ],
  },
  {
    label: 'Legal',
    items: [
      { label: 'Privacy',     path: '/privacy-policy',  icon: faShieldHalved, desc: 'Privacy policy'   },
      { label: 'Cookies',     path: '/cookies-policy',  icon: faCookie,       desc: 'Cookie policy'    },
    ],
  },
]

// ── Framer Motion variants ─────────────────────────────────
const sidebarVariants = {
  closed: { x: '100%', transition: { type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  open:   { x: '0%',   transition: { type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
}

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

const megaMenuVariants = {
  hidden:  { opacity: 0, y: -8, scaleY: 0.97, transformOrigin: 'top' },
  visible: { opacity: 1, y: 0,  scaleY: 1,    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, scaleY: 0.97, transition: { duration: 0.15, ease: 'easeIn' } },
}

const notifVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97, transformOrigin: 'top right' },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.12 } },
}

const userMenuVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.96, transformOrigin: 'top right' },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.12 } },
}

// ── Theme Toggle Button ────────────────────────────────────
function ThemeToggle({ size = 'md' }) {
  const { theme, toggleTheme, isDark } = useThemeStore()
  const dark = isDark()
  const sz = size === 'sm' ? 'w-8 h-8 text-sm' : 'w-9 h-9 text-base'

  return (
    <button
      onClick={toggleTheme}
      className={`${sz} relative flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors`}
      aria-label="Toggle theme"
      data-tooltip={dark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{ opacity: 0,    rotate: 90,  scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faSun} />
          </motion.span>
        ) : (
          <motion.span key="moon"
            initial={{ opacity: 0, rotate: 90,  scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{ opacity: 0,    rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faMoon} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// ── Icon Button ────────────────────────────────────────────
function IconBtn({ icon, onClick, label, badge, active, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors ${active ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]' : 'bg-[var(--bg-surface-2)]'} ${className}`}
      aria-label={label}
      data-tooltip={label}
    >
      <FontAwesomeIcon icon={icon} />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[10px] font-bold leading-none">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )
}

// ── Notification Panel ─────────────────────────────────────
function NotificationPanel({ onClose }) {
  const { notifications, reads, markRead, markAllRead, unreadCount } = useNotificationStore()
  const now = Date.now()

  const visible = notifications.filter(
    (n) => n.active && (!n.expires_at || new Date(n.expires_at).getTime() > now)
  )

  return (
    <motion.div
      variants={notifVariants}
      initial="hidden" animate="visible" exit="exit"
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[var(--z-dropdown)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          Notifications {unreadCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[var(--clr-error)] text-white text-[10px] font-bold">{unreadCount}</span>
          )}
        </span>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-[var(--accent-primary)] hover:underline">
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-72 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="py-10 text-center text-[var(--text-tertiary)] text-sm">
            <FontAwesomeIcon icon={faBell} className="text-2xl mb-2 opacity-30" />
            <p>No notifications</p>
          </div>
        ) : (
          visible.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                markRead(n.id)
                if (n.link) window.location.href = n.link
                onClose()
              }}
              className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${!reads[n.id] ? 'bg-[var(--accent-light)]' : ''}`}
            >
              <span className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: !reads[n.id] ? 'var(--accent-primary)' : 'transparent' }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{n.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{n.message}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </motion.div>
  )
}

// ── User Menu ──────────────────────────────────────────────
function UserMenu({ user, profile, isAdmin, avatar, displayName, onClose }) {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await signOutUser()
      onClose()
      navigate('/')
    } catch (e) {
      toast.error('Logout failed', e.message)
    }
  }

  return (
    <motion.div
      variants={userMenuVariants}
      initial="hidden" animate="visible" exit="exit"
      className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[var(--z-dropdown)]"
    >
      {/* User info */}
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 overflow-hidden">
          {avatar
            ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            : <span className="text-[var(--accent-primary)] text-xs font-bold">{displayName?.[0]?.toUpperCase()}</span>
          }
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p>
          <p className="text-xs text-[var(--text-tertiary)] truncate">{profile?.username ? `@${profile.username}` : user?.email}</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1">
        <Link to="/profile" onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors">
          <FontAwesomeIcon icon={faAddressCard} className="w-4 text-center opacity-60" />
          My Profile
        </Link>
        {isAdmin && (
          <Link to="/admin" onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors">
            <FontAwesomeIcon icon={faShieldHalved} className="w-4 text-center" />
            Admin Panel
          </Link>
        )}
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 text-center" />
          Sign Out
        </button>
      </div>
    </motion.div>
  )
}

// ── Main Navbar ─────────────────────────────────────────────
export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, isAdmin, authLoading, isLoggedIn, avatar, displayName } = useAuth()
  const { unreadCount, toggleOpen: toggleNotif, isOpen: notifOpen, setOpen: setNotifOpen } = useNotificationStore()
  const { openSearch } = useSearchStore()
  const { isAdmin: isAdminState } = useAdmin()

  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [megaOpen, setMegaOpen]       = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const megaRef    = useRef(null)
  const notifRef   = useRef(null)
  const userRef    = useRef(null)

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
    setUserMenuOpen(false)
    setNotifOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Click-outside close
  useEffect(() => {
    function handler(e) {
      if (megaRef.current && !megaRef.current.contains(e.target))  setMegaOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (userRef.current && !userRef.current.contains(e.target))   setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Keyboard shortcut: Ctrl+K / Cmd+K → search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[var(--z-sticky)]">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'px-4 py-2'
              : 'px-0 py-0'
          }`}
        >
          <nav
            className={`transition-all duration-300 ${
              scrolled
                ? 'max-w-5xl mx-auto rounded-full bg-[var(--navbar-bg)] border border-[var(--navbar-border)] shadow-[var(--navbar-shadow)] backdrop-blur-2xl px-4 py-2'
                : 'w-full bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)] backdrop-blur-md px-[var(--container-pad)] py-0'
            }`}
            style={{ height: scrolled ? 'auto' : 'var(--navbar-h)' }}
          >
            <div className={`flex items-center gap-4 ${scrolled ? '' : 'h-full max-w-[1280px] mx-auto'}`}>

              {/* Logo */}
              <Link to="/" className="flex-shrink-0 font-mono font-bold text-lg select-none">
                <span className="text-[var(--accent-primary)]">@</span>
                <span className="text-[var(--text-primary)]">mdturzo999</span>
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--clr-success)] ml-1.5 mb-0.5"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </Link>

              {/* Desktop center nav */}
              <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive: ia }) => {
                      const active = link.path === '/'
                        ? location.pathname === '/'
                        : ia
                      return `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                      }`
                    }}
                    end={link.path === '/'}
                  >
                    <FontAwesomeIcon icon={link.icon} className="text-xs" />
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Right icons — desktop */}
              <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 ml-auto">
                {/* Search */}
                <IconBtn icon={faSearch} onClick={openSearch} label="Search (Ctrl+K)" />

                {/* Notifications */}
                <div ref={notifRef} className="relative">
                  <IconBtn
                    icon={faBell}
                    onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); setMegaOpen(false) }}
                    label="Notifications"
                    badge={unreadCount}
                    active={notifOpen}
                  />
                  <AnimatePresence>
                    {notifOpen && (
                      <NotificationPanel onClose={() => setNotifOpen(false)} />
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* User */}
                {authLoading ? (
                  <div className="w-9 h-9 rounded-full sk" />
                ) : isLoggedIn ? (
                  <div ref={userRef} className="relative">
                    <button
                      onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); setMegaOpen(false) }}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${userMenuOpen ? 'border-[var(--accent-primary)]' : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'}`}
                    >
                      {avatar
                        ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center">
                            <span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span>
                          </div>
                      }
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <UserMenu
                          user={user} profile={profile}
                          isAdmin={isAdminState} avatar={avatar} displayName={displayName}
                          onClose={() => setUserMenuOpen(false)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    <FontAwesomeIcon icon={faSignIn} />
                    Sign In
                  </Link>
                )}

                {/* Mega menu */}
                <div ref={megaRef} className="relative">
                  <IconBtn
                    icon={faTableCells}
                    onClick={() => { setMegaOpen(!megaOpen); setNotifOpen(false); setUserMenuOpen(false) }}
                    label="All pages"
                    active={megaOpen}
                  />
                </div>
              </div>

              {/* Mobile right: theme + hamburger */}
              <div className="flex lg:hidden items-center gap-2 ml-auto">
                <ThemeToggle size="sm" />
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileOpen ? (
                      <motion.span key="x"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </motion.span>
                    ) : (
                      <motion.span key="bars"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* ── Desktop Mega Menu ─────────────────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              variants={megaMenuVariants}
              initial="hidden" animate="visible" exit="exit"
              className="hidden lg:block absolute top-full left-0 right-0 mt-1"
            >
              <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] backdrop-blur-xl p-6">
                  <div className="grid grid-cols-4 gap-6">
                    {MEGA_MENU.map((cat) => (
                      <div key={cat.label}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                          {cat.label}
                        </p>
                        <div className="space-y-0.5">
                          {cat.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-start gap-3 p-2 rounded-xl hover:bg-[var(--bg-surface-2)] transition-colors group"
                            >
                              <div className="w-7 h-7 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FontAwesomeIcon icon={item.icon} className="text-xs text-[var(--accent-primary)]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">{item.label}</p>
                                <p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p>
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
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Sidebar ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden" animate="visible" exit="hidden"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[390] lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              variants={sidebarVariants}
              initial="closed" animate="open" exit="closed"
              className="fixed top-0 right-0 bottom-0 w-72 bg-[var(--bg-surface)] border-l border-[var(--border-color)] z-[395] flex flex-col lg:hidden overflow-y-auto"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
                <Link to="/" onClick={() => setMobileOpen(false)} className="font-mono font-bold text-base">
                  <span className="text-[var(--accent-primary)]">@</span>
                  <span className="text-[var(--text-primary)]">mdturzo999</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* User row (if logged in) */}
              {isLoggedIn && (
                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[var(--border-color)] flex-shrink-0">
                    {avatar
                      ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center">
                          <span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span>
                        </div>
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{profile?.username ? `@${profile.username}` : ''}</p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <div className="flex-1 py-3">
                <p className="px-5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Navigation</p>
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive: ia }) => {
                      const active = link.path === '/' ? location.pathname === '/' : ia
                      return `flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'
                      }`
                    }}
                  >
                    <FontAwesomeIcon icon={link.icon} className="w-4 text-center" />
                    {link.label}
                  </NavLink>
                ))}

                {isLoggedIn && (
                  <>
                    <div className="my-3 mx-5 h-px bg-[var(--border-color)]" />
                    <p className="px-5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Account</p>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors">
                      <FontAwesomeIcon icon={faAddressCard} className="w-4 text-center" />
                      My Profile
                    </Link>
                    {isAdminState && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors">
                        <FontAwesomeIcon icon={faShieldHalved} className="w-4 text-center" />
                        Admin Panel
                      </Link>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar footer */}
              <div className="border-t border-[var(--border-color)] p-4 space-y-3">
                {/* Social icons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: faGithub,    url: SITE_CONFIG.social.github    },
                    { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin  },
                    { icon: faFacebook,  url: SITE_CONFIG.social.facebook  },
                    { icon: faInstagram, url: SITE_CONFIG.social.instagram },
                    { icon: faYoutube,   url: SITE_CONFIG.social.youtube   },
                    { icon: faTelegram,  url: SITE_CONFIG.social.telegram  },
                  ].map(({ icon, url }) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors text-sm">
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  ))}
                </div>

                {/* Auth buttons */}
                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2 rounded-xl border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors">
                      Sign In
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2 rounded-xl bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      await signOutUser()
                      setMobileOpen(false)
                      navigate('/')
                    }}
                    className="w-full py-2 rounded-xl border border-red-500/30 text-center text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                    Sign Out
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
