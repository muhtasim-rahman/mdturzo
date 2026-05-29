// Navbar.jsx — v2.2.7 — COMPLETE REDESIGN
// - Home page: top navbar fully transparent (hero bg shows through)
// - Non-home: semi-transparent glass navbar
// - Float pill: slides in after scroll, contents never overflow
// - Mega menu: position:fixed, z-index:var(--z-mega), always above page content
// - Tooltips: working on all icon buttons (overflow:clip trick)
// - Click effects on all nav items and buttons
// - 404 fix: mega panel uses fixed positioning, never gets buried
// - Advanced responsive: tablet sidebar + mobile bottom-friendly

import { useState, useEffect, useRef, useCallback } from 'react'
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
import { useAuth }             from '../../hooks/useAuth.js'
import { useThemeStore }       from '../../store/themeStore.js'
import { useNotificationStore } from '../../store/notificationStore.js'
import { useAdmin }            from '../../hooks/useAdmin.js'
import SITE_CONFIG             from '../../config/site.config.js'
import { logout as signOutUser } from '../../services/firebase.js'
import { toast }               from '../../store/toastStore.js'
import { useRipple, RippleLayer } from '../ui/Ripple.jsx'

const FLOAT_THRESHOLD = 300

const NAV_LINKS = [
  { label:'Home',     path:'/',         icon:faHouse,    tip:'Back to homepage'        },
  { label:'About',    path:'/about',    icon:faUser,     tip:'My journey & skills'     },
  { label:'Projects', path:'/projects', icon:faCode,     tip:'Portfolio & case studies'},
  { label:'Feed',     path:'/feed',     icon:faRss,      tip:'Blogs & posts'           },
  { label:'Contact',  path:'/contact',  icon:faEnvelope, tip:'Say hello'               },
]

const MEGA_COLS = [
  { label:'Pages', items:[
    {label:'Home',     path:'/',         icon:faHouse},
    {label:'About',    path:'/about',    icon:faUser},
    {label:'Projects', path:'/projects', icon:faCode},
    {label:'Feed',     path:'/feed',     icon:faRss},
    {label:'Contact',  path:'/contact',  icon:faEnvelope},
  ]},
  { label:'Account', items:[
    {label:'My Profile',  path:'/profile', icon:faAddressCard},
    {label:'Admin Panel', path:'/admin',   icon:faShieldHalved},
    {label:'Sign In',     path:'/login',   icon:faSignIn},
    {label:'Sign Up',     path:'/signup',  icon:faArrowRight},
  ]},
  { label:'Legal', items:[
    {label:'Privacy Policy', path:'/privacy-policy', icon:faShieldHalved},
    {label:'Cookies Policy', path:'/cookies-policy', icon:faCookie},
    {label:'Sitemap',        path:'/sitemap.xml',    icon:faGlobe, external:true},
  ]},
]

const SOCIALS = [
  {icon:faYoutube,   url:SITE_CONFIG.social?.youtube,   label:'@mdturzo999',     cls:'text-red-500'},
  {icon:faFacebook,  url:SITE_CONFIG.social?.facebook,  label:'mdturzo999',      cls:'text-blue-400'},
  {icon:faInstagram, url:SITE_CONFIG.social?.instagram, label:'@mdturzo999',     cls:'text-pink-400'},
  {icon:faGithub,    url:SITE_CONFIG.social?.github,    label:'muhtasim-rahman', cls:'text-purple-400'},
  {icon:faXTwitter,  url:SITE_CONFIG.social?.twitter,   label:'@mdturzo999',     cls:'text-sky-400'},
  {icon:faTelegram,  url:SITE_CONFIG.social?.telegram,  label:'@mdturzo16',      cls:'text-sky-300'},
]

/* ── animations ───────────────────────────────────────────── */
const floatIn  = { hidden:{y:-70,opacity:0}, visible:{y:0,opacity:1,transition:{type:'spring',stiffness:340,damping:30}}, exit:{y:-70,opacity:0,transition:{duration:.18}} }
const megaIn   = { hidden:{opacity:0,y:-8,scaleY:.97,transformOrigin:'top'}, visible:{opacity:1,y:0,scaleY:1,transition:{duration:.2,ease:[.16,1,.3,1]}}, exit:{opacity:0,y:-8,transition:{duration:.13}} }
const sideIn   = { closed:{x:'100%'}, open:{x:'0%',transition:{type:'tween',duration:.26,ease:[.4,0,.2,1]}} }
const dropIn   = { hidden:{opacity:0,y:-6,scale:.96,transformOrigin:'top right'}, visible:{opacity:1,y:0,scale:1,transition:{duration:.17}}, exit:{opacity:0,y:-6,transition:{duration:.12}} }

/* ── helpers ──────────────────────────────────────────────── */
function isActive(path, pathname) { return path==='/' ? pathname==='/' : pathname.startsWith(path) }

/* ── Status dot ───────────────────────────────────────────── */
function StatusDot({size='md'}) {
  const dim = size==='sm' ? 'w-2 h-2 border' : 'w-2.5 h-2.5 border-[1.5px]'
  return <span className={`absolute -bottom-0.5 -right-0.5 ${dim} rounded-full border-[var(--bg-page)] bg-green-400`} style={{boxShadow:'0 0 5px #4ade80'}} />
}

/* ── Logo ──────────────────────────────────────────────────── */
function NavLogo({size='md', onClick}) {
  const [src, setSrc] = useState('/logo.webp')
  const sz = size==='sm' ? 'w-7 h-7' : 'w-8 h-8'
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5 select-none flex-shrink-0 group">
      <div className={`relative ${sz} flex-shrink-0`}>
        <img src={src} alt="logo" onError={()=>setSrc('/android-chrome-192x192.png')}
          className={`${sz} rounded-xl object-cover border border-white/10`}/>
        <StatusDot size={size}/>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-mono font-bold text-[15px] text-[var(--text-primary)] leading-none">{SITE_CONFIG.navName}</span>
        <span className="text-[10px] text-[var(--text-tertiary)] font-mono leading-none mt-[3px]">{SITE_CONFIG.seo?.twitterHandle ?? ''}</span>
      </div>
    </Link>
  )
}

/* ── Icon button with tooltip ─────────────────────────────── */
function IBtn({icon, onClick, tip, badge, active, cls='', size='md'}) {
  const {ripples,createRipple} = useRipple()
  const sz = size==='sm' ? 'w-8 h-8 text-[13px]' : 'w-9 h-9 text-sm'
  return (
    <button type="button"
      onClick={e=>{createRipple(e);onClick?.(e)}}
      data-tip={tip}
      aria-label={tip}
      data-ripple-managed="true"
      className={`nb-icon ${sz} ${active?'nb-icon--active':''} ${cls}`}>
      <RippleLayer ripples={ripples} color="rgba(99,102,241,.22)"/>
      <FontAwesomeIcon icon={icon}/>
      {badge>0 && <span className="nb-badge">{badge>9?'9+':badge}</span>}
    </button>
  )
}

/* ── Theme toggle ──────────────────────────────────────────── */
function ThemeBtn({size='md'}) {
  const {toggleTheme,isDark} = useThemeStore()
  const dark = isDark()
  const {ripples,createRipple} = useRipple()
  return (
    <button type="button" data-tip={dark?'Light mode':'Dark mode'} aria-label="Toggle theme"
      onClick={e=>{createRipple(e);toggleTheme()}}
      data-ripple-managed="true"
      className={`nb-icon ${size==='sm'?'w-8 h-8 text-[13px]':'w-9 h-9 text-sm'}`}>
      <RippleLayer ripples={ripples} color="rgba(251,191,36,.22)"/>
      <AnimatePresence mode="wait" initial={false}>
        {dark
          ? <motion.span key="sun"  initial={{rotate:-90,scale:.5,opacity:0}} animate={{rotate:0,scale:1,opacity:1}} exit={{rotate:90,scale:.5,opacity:0}} transition={{duration:.16}}><FontAwesomeIcon icon={faSun}/></motion.span>
          : <motion.span key="moon" initial={{rotate:90,scale:.5,opacity:0}} animate={{rotate:0,scale:1,opacity:1}} exit={{rotate:-90,scale:.5,opacity:0}} transition={{duration:.16}}><FontAwesomeIcon icon={faMoon}/></motion.span>
        }
      </AnimatePresence>
    </button>
  )
}

/* ── Sign in button ───────────────────────────────────────── */
function SignInBtn({sm}) {
  const {ripples,createRipple} = useRipple()
  return (
    <Link to="/login" onClick={createRipple} data-ripple-managed="true"
      className={`relative overflow-hidden flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors active:scale-95 ${sm?'h-8 px-3 text-xs':'h-9 px-4 text-sm'}`}>
      <RippleLayer ripples={ripples} color="rgba(255,255,255,.3)"/>
      <FontAwesomeIcon icon={faSignIn} className="text-xs"/>
      Sign In
    </Link>
  )
}

/* ── Notifications panel ──────────────────────────────────── */
function NotifPanel({onClose}) {
  const {notifications,reads,markRead,markAllRead,unreadCount} = useNotificationStore()
  const now = Date.now()
  const vis = notifications.filter(n=>n.active&&(!n.expires_at||new Date(n.expires_at).getTime()>now))
  return (
    <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit"
      className="nb-drop w-80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          Notifications
          {unreadCount>0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold">{unreadCount}</span>}
        </span>
        {unreadCount>0 && <button onClick={markAllRead} className="text-xs text-[var(--accent-primary)] hover:underline">Mark all read</button>}
      </div>
      <div className="max-h-64 overflow-y-auto">
        {vis.length===0
          ? <div className="py-8 text-center text-[var(--text-tertiary)] text-sm"><FontAwesomeIcon icon={faBell} className="text-2xl mb-2 opacity-30"/><p>No notifications</p></div>
          : vis.map(n=>(
            <button key={n.id} onClick={()=>{markRead(n.id);if(n.link)window.location.href=n.link;onClose()}}
              className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${!reads[n.id]?'bg-[var(--accent-light)]':''}`}>
              <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:!reads[n.id]?'var(--accent-primary)':'transparent'}}/>
              <div className="flex-1 min-w-0">
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

/* ── User dropdown ────────────────────────────────────────── */
function UserDrop({user,profile,isAdmin,avatar,displayName,onClose}) {
  const navigate = useNavigate()
  const doLogout = async()=>{ try{await signOutUser();onClose();navigate('/')}catch(e){toast.error('Logout failed')} }
  return (
    <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" className="nb-drop w-52">
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-color)]">
          {avatar?<img src={avatar} alt={displayName} className="w-full h-full object-cover"/>
            :<div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-xs font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
        </div>
        <div className="min-w-0"><p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p><p className="text-xs text-[var(--text-tertiary)] truncate">{profile?.username?`@${profile.username}`:user?.email}</p></div>
      </div>
      <div className="py-1">
        <Link to="/profile" onClick={onClose} className="nb-drop-item"><FontAwesomeIcon icon={faAddressCard} className="w-4 opacity-60"/>My Profile</Link>
        {isAdmin&&<Link to="/admin" onClick={onClose} className="nb-drop-item text-[var(--accent-primary)]"><FontAwesomeIcon icon={faShieldHalved} className="w-4"/>Admin</Link>}
        <button onClick={doLogout} className="nb-drop-item w-full text-red-400"><FontAwesomeIcon icon={faRightFromBracket} className="w-4"/>Sign Out</button>
      </div>
    </motion.div>
  )
}

/* ── Mega menu ────────────────────────────────────────────── */
// Always rendered via a portal-style fixed div — never gets buried under page content
function MegaMenu({onClose, navbarHeight}) {
  const location = useLocation()
  const url = typeof window!=='undefined' ? window.location.href : SITE_CONFIG.siteURL
  const copy = async()=>{try{await navigator.clipboard.writeText(url);toast.success('Copied','URL copied.')}catch{}}
  const share = async()=>{try{if(navigator.share)await navigator.share({title:SITE_CONFIG.siteName,url});else copy()}catch(e){if(e?.name!=='AbortError')copy()}}
  return (
    /* FIX: position:fixed + z-mega ensures mega is above ALL page content including 404 */
    <motion.div variants={megaIn} initial="hidden" animate="visible" exit="exit"
      style={{position:'fixed',top:navbarHeight,left:0,right:0,zIndex:'var(--z-mega)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="max-w-[1120px] mx-auto px-4 pt-2 pb-4">
        <div className="nb-mega-panel">
          {/* Top glow line */}
          <div className="h-[2px] rounded-t-2xl" style={{background:'linear-gradient(90deg,transparent,rgba(99,102,241,.6) 30%,rgba(59,130,246,.6) 70%,transparent)'}}/>
          {/* Columns */}
          <div className="grid grid-cols-3 divide-x divide-[var(--border-color)] px-2 py-3">
            {MEGA_COLS.map(col=>(
              <div key={col.label} className="px-4 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--text-tertiary)] mb-2 px-2">{col.label}</p>
                <div className="space-y-0.5">
                  {col.items.map(item=>{
                    const act = isActive(item.path, location.pathname)
                    const cls = `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${act?'bg-[var(--accent-light)] text-[var(--accent-primary)]':'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-3)] hover:text-[var(--text-primary)]'}`
                    return item.external
                      ? <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" onClick={onClose} className={cls}><FontAwesomeIcon icon={item.icon} className="w-3.5 text-xs opacity-60 flex-shrink-0"/>{item.label}</a>
                      : <Link key={item.path} to={item.path} onClick={onClose} className={cls}><FontAwesomeIcon icon={item.icon} className="w-3.5 text-xs opacity-60 flex-shrink-0"/>{item.label}</Link>
                  })}
                </div>
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-[var(--border-color)] flex items-center gap-2">
            <button onClick={share} className="nb-mega-share"><FontAwesomeIcon icon={faShareNodes} className="text-xs"/><span>Share</span></button>
            <div className="nb-mega-url">
              <span>{url}</span>
              <button onClick={copy} className="nb-mega-copy" aria-label="Copy URL"><FontAwesomeIcon icon={faCopy}/></button>
            </div>
            <span className="nb-mega-ver">v<strong>{SITE_CONFIG.version}</strong></span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Marquee ──────────────────────────────────────────────── */
function SocialRow() {
  return (
    <div className="flex items-center gap-1 overflow-hidden" style={{maskImage:'linear-gradient(to right,transparent,black 8%,black 92%,transparent)'}}>
      <div className="flex items-center gap-1 animate-[marquee-scroll_20s_linear_infinite]">
        {[...SOCIALS,...SOCIALS].map((s,i)=>(
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors whitespace-nowrap flex-shrink-0">
            <FontAwesomeIcon icon={s.icon} className={s.cls} style={{fontSize:12}}/>{s.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ── Main Navbar ──────────────────────────────────────────── */
export function Navbar() {
  const location   = useLocation()
  const navigate   = useNavigate()
  const {user,profile,isLoggedIn,avatar,displayName,authLoading} = useAuth()
  const {unreadCount,isOpen:notifOpen,setOpen:setNotifOpen} = useNotificationStore()
  const {isAdmin} = useAdmin()

  const [floatVisible, setFloatVisible] = useState(false)
  const [mobileOpen,   setMobileOpen  ] = useState(false)
  const [megaOpen,     setMegaOpen    ] = useState(false)
  const [userOpen,     setUserOpen    ] = useState(false)
  const [searchQ,      setSearchQ     ] = useState('')
  const [nbH,          setNbH         ] = useState(64)   // navbar height in px for mega positioning
  const topNavRef    = useRef(null)
  const sideSearchRef= useRef(null)

  const isHome = ['/','/home'].includes(location.pathname)

  useEffect(()=>{
    const onScroll=()=>setFloatVisible(window.scrollY>FLOAT_THRESHOLD)
    window.addEventListener('scroll',onScroll,{passive:true})
    onScroll()
    return()=>window.removeEventListener('scroll',onScroll)
  },[])

  // Track navbar height for mega positioning
  useEffect(()=>{
    if(!topNavRef.current) return
    const ro=new ResizeObserver(()=>{
      const h=topNavRef.current?.getBoundingClientRect().height??64
      setNbH(floatVisible?56:h)
    })
    ro.observe(topNavRef.current)
    return()=>ro.disconnect()
  },[floatVisible])

  useEffect(()=>{setMobileOpen(false);setMegaOpen(false);setUserOpen(false)},[location.pathname])
  useEffect(()=>{document.body.style.overflow=mobileOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[mobileOpen])

  // Click outside
  useEffect(()=>{
    const h=e=>{
      if(!e.target.closest('[data-mega-anchor]')&&!e.target.closest('[data-mega-panel]'))setMegaOpen(false)
      if(!e.target.closest('[data-notif-anchor]'))setNotifOpen(false)
      if(!e.target.closest('[data-user-anchor]'))setUserOpen(false)
    }
    document.addEventListener('mousedown',h)
    return()=>document.removeEventListener('mousedown',h)
  },[])

  const toggleMega = useCallback(()=>{setMegaOpen(p=>!p);setNotifOpen(false);setUserOpen(false)},[])
  const toggleNotif= useCallback(()=>{setNotifOpen(p=>!p);setMegaOpen(false);setUserOpen(false)},[])
  const toggleUser = useCallback(()=>{setUserOpen(p=>!p);setMegaOpen(false);setNotifOpen(false)},[])

  const openMobileSearch = ()=>{setMobileOpen(true);setTimeout(()=>{sideSearchRef.current?.focus();sideSearchRef.current?.select()},300)}
  const openDesktopSearch= ()=>toast.info('Search coming soon 🔍')

  const linkCls = (path,float=false)=>{
    const act = isActive(path, location.pathname)
    if(float) return `nb-flink ${act?'nb-flink--active':''}`
    return `nb-link ${act?'nb-link--active':''}`
  }

  const rightIcons = (float=false)=>{
    const sz = float ? 'sm' : 'md'
    return (
      <div className="flex items-center gap-1.5 flex-shrink-0" data-nb-right>
        <IBtn icon={faSearch}  onClick={float?openMobileSearch:openDesktopSearch} tip="Search" size={sz} cls="hidden lg:flex"/>
        <IBtn icon={faSearch}  onClick={openMobileSearch} tip="Search" size={sz} cls="lg:hidden"/>
        <div className="relative" data-notif-anchor>
          <IBtn icon={faBell} onClick={toggleNotif} tip="Notifications" badge={unreadCount} active={notifOpen} size={sz}/>
          <AnimatePresence>{notifOpen&&<NotifPanel onClose={()=>setNotifOpen(false)}/>}</AnimatePresence>
        </div>
        <ThemeBtn size={sz}/>
        {authLoading
          ? <div className={`rounded-full bg-[var(--bg-surface-2)] animate-pulse flex-shrink-0 ${sz==='sm'?'w-8 h-8':'w-9 h-9'}`}/>
          : isLoggedIn
            ? <div className="relative" data-user-anchor>
                <button onClick={toggleUser}
                  className={`rounded-full overflow-hidden border-2 flex-shrink-0 transition-colors ${userOpen?'border-[var(--accent-primary)]':'border-[var(--border-color)] hover:border-[var(--border-strong)]'} ${sz==='sm'?'w-8 h-8':'w-9 h-9'}`}>
                  {avatar?<img src={avatar} alt={displayName} className="w-full h-full object-cover"/>:<div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] text-sm font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
                </button>
                <AnimatePresence>{userOpen&&<UserDrop user={user} profile={profile} isAdmin={isAdmin} avatar={avatar} displayName={displayName} onClose={()=>setUserOpen(false)}/>}</AnimatePresence>
              </div>
            : <SignInBtn sm={sz==='sm'}/>
        }
        <div data-mega-anchor>
          <IBtn icon={faTableCells} onClick={toggleMega} tip="More" active={megaOpen} size={sz}/>
        </div>
        <IBtn icon={faBars} onClick={()=>setMobileOpen(true)} tip="Menu" cls="lg:hidden" size={sz}/>
      </div>
    )
  }

  return (
    <>
      {/* ╔═══ TOP NAVBAR ═══╗ */}
      <nav ref={topNavRef}
        className={`nb-top ${isHome?'nb-top--home':''}`}
        style={{height:'var(--navbar-h)'}}>
        <div className="nb-inner flex items-center h-full gap-4">
          <NavLogo/>
          {/* Center links — desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map(l=>(
              <NavLink key={l.path} to={l.path} end={l.path=='/'}
                className={()=>linkCls(l.path)}
                title={l.tip}>
                <FontAwesomeIcon icon={l.icon} className="text-xs opacity-70 flex-shrink-0"/>
                {l.label}
              </NavLink>
            ))}
          </div>
          {/* Right — desktop */}
          <div className="hidden lg:flex ml-auto">{rightIcons()}</div>
          {/* Right — mobile/tablet */}
          <div className="flex lg:hidden items-center gap-1.5 ml-auto">
            {!authLoading&&!isLoggedIn&&<SignInBtn sm/>}
            <ThemeBtn size="sm"/>
            <IBtn icon={faSearch}  onClick={openMobileSearch}   tip="Search" size="sm"/>
            <IBtn icon={faBars}    onClick={()=>setMobileOpen(true)} tip="Menu" size="sm"/>
          </div>
        </div>
        {/* Mega panel — fixed, always on top */}
        <AnimatePresence>
          {megaOpen&&<MegaMenu onClose={()=>setMegaOpen(false)} navbarHeight={nbH}/>}
        </AnimatePresence>
      </nav>

      {/* ╔═══ FLOAT NAVBAR ═══╗ */}
      <AnimatePresence>
        {floatVisible&&(
          <motion.div variants={floatIn} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-3 pt-2.5 pointer-events-none">
            <nav className="nb-float nf-inner pointer-events-auto flex items-center gap-3 w-full h-[52px] px-3.5 rounded-full"
              style={{overflow:'visible'}}>
              <NavLogo size="sm"/>
              {/* Center links */}
              <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-0.5 overflow-hidden">
                {NAV_LINKS.map(l=>(
                  <NavLink key={l.path} to={l.path} end={l.path=='/'}
                    className={()=>linkCls(l.path,true)} title={l.tip}>
                    <FontAwesomeIcon icon={l.icon} className="text-[11px] opacity-70 flex-shrink-0"/>
                    <span className="text-[13px]">{l.label}</span>
                  </NavLink>
                ))}
              </div>
              {/* Right */}
              <div className="hidden lg:flex ml-auto flex-shrink-0 nb-float-right">{rightIcons(true)}</div>
              <div className="flex lg:hidden items-center gap-1 ml-auto flex-shrink-0 nb-float-right">
                {!authLoading&&!isLoggedIn&&<SignInBtn sm/>}
                <ThemeBtn size="sm"/>
                <IBtn icon={faSearch} onClick={openMobileSearch} tip="Search" size="sm"/>
                <IBtn icon={faBars}   onClick={()=>setMobileOpen(true)} tip="Menu" size="sm"/>
              </div>
              {/* Float mega — fixed positioning */}
              <AnimatePresence>
                {megaOpen&&<MegaMenu onClose={()=>setMegaOpen(false)} navbarHeight={62}/>}
              </AnimatePresence>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ╔═══ MOBILE SIDEBAR ═══╗ */}
      <AnimatePresence>
        {mobileOpen&&(
          <>
            <motion.div key="bd" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={()=>setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[800] lg:hidden"/>
            <motion.aside key="sd" variants={sideIn} initial="closed" animate="open" exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[min(340px,90vw)] z-[900] flex flex-col lg:hidden overflow-hidden"
              style={{background:'var(--bg-surface)',borderLeft:'1px solid var(--border-color)'}}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
                <NavLogo size="sm" onClick={()=>setMobileOpen(false)}/>
                <button onClick={()=>setMobileOpen(false)} className="w-8 h-8 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </div>
              {/* User card */}
              {isLoggedIn&&(
                <Link to="/profile" onClick={()=>setMobileOpen(false)}
                  className="flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {avatar?<img src={avatar} alt="" className="w-full h-full object-cover"/>:<div className="w-full h-full bg-[var(--accent-light)] flex items-center justify-center"><span className="text-[var(--accent-primary)] font-bold">{displayName?.[0]?.toUpperCase()}</span></div>}
                  </div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[var(--text-primary)] truncate">{displayName}</p><p className="text-xs text-[var(--text-tertiary)]">{profile?.username?`@${profile.username}`:''}</p></div>
                  <FontAwesomeIcon icon={faChevronRight} className="text-[var(--text-tertiary)] text-xs"/>
                </Link>
              )}
              {/* Search */}
              <div className="px-4 mt-3 flex-shrink-0">
                <div className="nb-search-field flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)]">
                  <FontAwesomeIcon icon={faSearch} className="text-[var(--text-tertiary)] text-xs flex-shrink-0"/>
                  <input ref={sideSearchRef} type="text" placeholder="Search..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                    onKeyDown={e=>{if(e.key==='Escape'){setSearchQ('');sideSearchRef.current?.blur()}}}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0"/>
                  {searchQ&&<button onClick={()=>setSearchQ('')} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"><FontAwesomeIcon icon={faXmark} className="text-xs"/></button>}
                </div>
              </div>
              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-3">
                <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--text-tertiary)]">Navigation</p>
                {NAV_LINKS.map(l=>(
                  <NavLink key={l.path} to={l.path} end={l.path=='/'}
                    onClick={()=>setMobileOpen(false)}
                    className={({isActive:a})=>`flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(l.path,location.pathname)?'bg-[var(--accent-light)] text-[var(--accent-primary)]':'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'}`}>
                    <FontAwesomeIcon icon={l.icon} className="w-4 text-center text-xs"/>
                    {l.label}
                  </NavLink>
                ))}
                <div className="my-3 mx-4 h-px bg-[var(--border-color)]"/>
                <p className="px-5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--text-tertiary)]">More</p>
                {[{label:'My Profile',path:'/profile',icon:faAddressCard},{label:'Privacy Policy',path:'/privacy-policy',icon:faShieldHalved},{label:'Cookies Policy',path:'/cookies-policy',icon:faCookie}].map(item=>(
                  <Link key={item.path} to={item.path} onClick={()=>setMobileOpen(false)}
                    className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors">
                    <FontAwesomeIcon icon={item.icon} className="w-4 text-center text-xs"/>{item.label}
                  </Link>
                ))}
                {isAdmin&&<Link to="/admin" onClick={()=>setMobileOpen(false)} className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors"><FontAwesomeIcon icon={faShieldHalved} className="w-4 text-xs"/>Admin Panel</Link>}
              </div>
              {/* Footer */}
              <div className="flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-3">
                {!isLoggedIn
                  ? <div className="flex gap-2"><Link to="/login" onClick={()=>setMobileOpen(false)} className="flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors">Sign In</Link><Link to="/signup" onClick={()=>setMobileOpen(false)} className="flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">Sign Up</Link></div>
                  : <button onClick={async()=>{await signOutUser();setMobileOpen(false);navigate('/')}} className="w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-red-400 hover:bg-red-500/10 transition-colors"><FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>Sign Out</button>
                }
                <SocialRow/>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ╔═══ STYLES ═══╗ */}
      <style>{`
        /* ── Top navbar ─────────────────────────────────── */
        .nb-top {
          position: relative; z-index: var(--z-sticky);
          width: 100%; display: flex; align-items: stretch;
          background: var(--navbar-bg);
          border-bottom: 1px solid var(--navbar-border);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          transition: background .3s ease, border-color .3s ease;
        }
        /* Home page: fully transparent — hero bg shows through */
        .nb-top--home {
          background: transparent !important;
          border-bottom-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .nb-inner {
          max-width: 1120px; margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          width: 100%;
        }

        /* ── Nav links — top ────────────────────────────── */
        .nb-link {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: .375rem;
          height: 36px; padding: 0 12px;
          border-radius: 9px;
          font-size: .86rem; font-weight: 500;
          color: var(--text-secondary);
          border: 1px solid transparent;
          text-decoration: none;
          transition: all .18s ease;
          white-space: nowrap;
        }
        .nb-link:hover {
          background: rgba(99,102,241,.08);
          border-color: rgba(99,102,241,.14);
          color: var(--text-primary);
        }
        .nb-link:active { transform: scale(.94); }
        .nb-link--active {
          background: rgba(99,102,241,.14);
          border-color: rgba(99,102,241,.28);
          color: var(--accent-primary);
        }
        [data-theme=light] .nb-link:hover { background: rgba(37,99,235,.07); border-color: rgba(37,99,235,.14); }
        [data-theme=light] .nb-link--active { background: rgba(37,99,235,.10); border-color: rgba(37,99,235,.22); }

        /* ── Float navbar ───────────────────────────────── */
        .nb-float {
          background: rgba(10,16,40,.80);
          border: 1px solid rgba(148,163,184,.12);
          box-shadow: 0 8px 32px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.07);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
        }
        [data-theme=light] .nb-float {
          background: rgba(252,254,255,.92);
          border-color: rgba(203,213,225,.8);
          box-shadow: 0 6px 24px rgba(15,23,42,.10), inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(20px) saturate(150%);
        }
        .nf-inner { max-width: 1120px; }

        /* ── Float nav links ────────────────────────────── */
        .nb-flink {
          display: inline-flex; align-items: center; gap: .35rem;
          height: 34px; padding: 0 11px; border-radius: 9999px;
          font-size: .84rem; font-weight: 500;
          color: rgba(226,232,240,.72);
          border: 1px solid transparent;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: all .18s ease;
        }
        .nb-flink:hover { background: rgba(99,102,241,.12); border-color: rgba(99,102,241,.18); color: #f1f5f9; }
        .nb-flink:active { transform: scale(.94); }
        .nb-flink--active { background: rgba(99,102,241,.18); border-color: rgba(99,102,241,.32); color: rgba(165,180,252,1); }
        [data-theme=light] .nb-flink { color: rgba(30,41,59,.72); }
        [data-theme=light] .nb-flink:hover { background: rgba(37,99,235,.09); border-color: rgba(37,99,235,.16); color: #0f172a; }
        [data-theme=light] .nb-flink--active { background: rgba(37,99,235,.12); border-color: rgba(37,99,235,.25); color: var(--accent-primary); }

        /* ── Icon buttons with tooltip ──────────────────── */
        .nb-icon {
          position: relative;
          /* overflow:clip = clips ripple but lets ::after tooltip escape */
          overflow: clip;
          display: flex; align-items: center; justify-content: center;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.05);
          color: rgba(226,232,240,.78);
          cursor: pointer;
          transition: background .18s, border-color .18s, color .18s, transform .12s;
          flex-shrink: 0;
        }
        .nb-icon:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.16); color: #f1f5f9; }
        .nb-icon:active { transform: scale(.88) !important; }
        .nb-icon--active { background: rgba(99,102,241,.2) !important; border-color: rgba(99,102,241,.4) !important; color: #a5b4fc !important; }
        [data-theme=light] .nb-icon { border-color: rgba(0,0,0,.07); background: rgba(0,0,0,.04); color: rgba(30,41,59,.72); }
        [data-theme=light] .nb-icon:hover { background: rgba(0,0,0,.08); border-color: rgba(0,0,0,.12); color: #0f172a; }
        [data-theme=light] .nb-icon--active { background: rgba(37,99,235,.12) !important; border-color: rgba(37,99,235,.28) !important; color: var(--accent-primary) !important; }

        /* Float right icon overrides */
        .nb-float-right .nb-icon { background: rgba(255,255,255,.07) !important; border-color: rgba(255,255,255,.10) !important; }
        .nb-float-right .nb-icon:hover { background: rgba(255,255,255,.14) !important; }
        [data-theme=light] .nb-float-right .nb-icon { background: rgba(0,0,0,.05) !important; border-color: rgba(0,0,0,.09) !important; }

        /* ── CSS-only Tooltip (overflow:clip allows ::after to escape) ── */
        [data-tip] { position: relative; }
        [data-tip]::after, [data-tip]::before {
          position: absolute; pointer-events: none;
          opacity: 0; transition: opacity .15s ease, transform .15s ease;
          z-index: 2000;
        }
        [data-tip]::after {
          content: attr(data-tip);
          bottom: calc(-100% - 14px);
          left: 50%; transform: translateX(-50%) translateY(5px) scale(.92);
          background: rgba(8,14,32,.97);
          color: #f1f5f9; border: 1px solid rgba(148,163,184,.18);
          box-shadow: 0 6px 20px rgba(0,0,0,.36);
          backdrop-filter: blur(10px);
          font-size: 11px; font-weight: 600; padding: 5px 10px;
          border-radius: 8px; white-space: nowrap;
        }
        [data-tip]::before {
          content: '';
          bottom: calc(-100% + 0px);
          left: 50%; width: 6px; height: 6px;
          transform: translateX(-50%) translateY(5px) rotate(45deg);
          background: rgba(8,14,32,.97);
          border-left: 1px solid rgba(148,163,184,.18);
          border-top: 1px solid rgba(148,163,184,.18);
        }
        [data-tip]:hover::after { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        [data-tip]:hover::before { opacity: 1; transform: translateX(-50%) translateY(0) rotate(45deg); }
        [data-theme=light] [data-tip]::after { background: rgba(15,23,42,.97); box-shadow: 0 6px 20px rgba(15,23,42,.22); }
        [data-theme=light] [data-tip]::before { background: rgba(15,23,42,.97); }
        /* Right-aligned tooltip for rightmost icons */
        [data-nb-right] [data-tip]::after { left:auto; right:0; transform:translateY(5px) scale(.92); }
        [data-nb-right] [data-tip]::before { left:auto; right:10px; transform:translateY(5px) rotate(45deg); }
        [data-nb-right] [data-tip]:hover::after { transform:translateY(0) scale(1); }
        [data-nb-right] [data-tip]:hover::before { transform:translateY(0) rotate(45deg); }

        /* Badge */
        .nb-badge {
          position: absolute; top: -3px; right: -3px;
          min-width: 15px; height: 15px; padding: 0 3px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 9999px; background: #ef4444;
          color: #fff; font-size: 8.5px; font-weight: 700; line-height: 1;
          border: 1.5px solid var(--bg-page);
        }

        /* ── Mega panel ─────────────────────────────────── */
        .nb-mega-panel {
          border-radius: 18px; overflow: hidden;
          background: rgba(12,18,40,.92);
          border: 1px solid rgba(148,163,184,.14);
          box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 4px 16px rgba(0,0,0,.3);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
        }
        [data-theme=light] .nb-mega-panel {
          background: rgba(252,254,255,.97);
          border-color: rgba(203,213,225,.7);
          box-shadow: 0 20px 50px rgba(15,23,42,.15);
        }
        .nb-mega-share {
          height: 30px; padding: 0 12px; border-radius: 9999px; border: none;
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, var(--accent-primary), #6366f1);
          color: #fff; font-size: 11.5px; font-weight: 600;
          box-shadow: 0 2px 8px rgba(59,130,246,.28);
          cursor: pointer; transition: all .18s ease; flex-shrink: 0;
        }
        .nb-mega-share:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(59,130,246,.4); }
        .nb-mega-url {
          flex: 1; min-width: 0; height: 30px;
          display: flex; align-items: center; gap: 4px;
          border: 1px solid var(--border-color); border-radius: 9999px;
          background: var(--bg-surface-2); padding: 0 4px 0 12px; overflow: hidden;
        }
        .nb-mega-url span { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:11px; color:var(--text-tertiary); font-family:var(--font-mono); }
        .nb-mega-copy { width:28px; height:28px; border-radius:9999px; display:flex; align-items:center; justify-content:center; color:var(--text-tertiary); font-size:11px; cursor:pointer; transition:all .15s ease; border:none; background:transparent; flex-shrink:0; }
        .nb-mega-copy:hover { color:var(--text-primary); background:var(--bg-surface-3); }
        .nb-mega-ver { height:28px; padding:0 10px; border-radius:9999px; display:inline-flex; align-items:center; font-size:11px; color:var(--text-tertiary); background:var(--bg-surface-2); border:1px solid var(--border-color); white-space:nowrap; flex-shrink:0; }
        .nb-mega-ver strong { color:var(--text-primary); font-family:var(--font-mono); font-weight:500; }

        /* ── Dropdown panel ─────────────────────────────── */
        .nb-drop {
          position: absolute; right: 0; top: calc(100% + 8px);
          border-radius: 18px; overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
          z-index: var(--z-mega);
        }
        .nb-drop-item {
          display: flex; align-items: center; gap: 2.5px; width: 100%;
          padding: .6rem 1rem; font-size: .84rem;
          color: var(--text-secondary);
          transition: background .15s ease, color .15s ease;
          text-decoration: none; gap: .6rem;
        }
        .nb-drop-item:hover { background: var(--bg-surface-2); color: var(--text-primary); }

        /* ── Search field ───────────────────────────────── */
        .nb-search-field:focus-within {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,.15);
        }

        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `}</style>
    </>
  )
}
