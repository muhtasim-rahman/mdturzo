// About.jsx — v2.3.1
// Sections:
//   1. Hero           — minimal, right side hero-back.webp w/ home-style gradient
//   2. Info Details   — descriptive personal info + quote + story
//   3. Education Timeline — center (PC) / left (mobile), scroll-animated line
//   4. Skills & Expertise — tabbed, animated progress bars (home style)
//   5. Language Proficiency — flag-icons + animated bars
//   6. Values & Personality — minimal cards + Hobbies & Interests inside
//   7. Goals & Plans  — 3-column layout, click ripple effect
//   8. Find Me Online — new social grid layout
//   9. SharedCTA      — shared with Home page

import { useEffect, useRef, useState, useCallback } from 'react'
import { Link }            from 'react-router-dom'
import { Helmet }          from 'react-helmet-async'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCode, faPalette, faVideo,
  faBrain, faHeart, faGlobe, faHandshake, faLaptopCode,
  faRocket, faBullseye, faCheck, faArrowRight, faCalendarDays,
  faBook, faUser, faMosque, faDumbbell, faBicycle, faMapPin,
  faSeedling, faCamera, faTerminal, faGears, faShield, faMedal,
  faFlag, faMountain, faEnvelope, faDownload, faQuoteLeft,
  faChevronRight, faWrench, faCrown, faLeaf, faSchool, faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram, faYoutube,
  faTelegram, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'

import { buildTitle, buildMeta, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import SharedCTA from '../components/shared/SharedCTA.jsx'

// ── Animation helpers ──────────────────────────────────────────
const fadeUp  = { hidden: { opacity:0, y:24 }, show: { opacity:1, y:0, transition: { duration:.5, ease:[.16,1,.3,1] } } }
const fadeL   = { hidden: { opacity:0, x:-28 }, show: { opacity:1, x:0, transition: { duration:.55, ease:[.16,1,.3,1] } } }
const fadeR   = { hidden: { opacity:0, x:28  }, show: { opacity:1, x:0, transition: { duration:.55, ease:[.16,1,.3,1] } } }
const stagger = (d=.08) => ({ hidden:{}, show:{ transition:{ staggerChildren:d } } })

function AnimIn({ children, variants=fadeUp, delay=0, className='', once=true }) {
  return (
    <motion.div
      initial="hidden" whileInView="show"
      viewport={{ once, amount:.12 }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >{children}</motion.div>
  )
}

// ── Skill progress bar (home-style animation) ──────────────────
function SkillBar({ name, pct, color, note, index, visible }) {
  return (
    <div className="ab31-skill-row">
      <div className="ab31-skill-meta">
        <span className="ab31-skill-name">{name}</span>
        <div className="ab31-skill-right">
          {note && <span className="ab31-skill-note">{note}</span>}
          <span className="ab31-skill-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="ab31-skill-track">
        <motion.div
          className="ab31-skill-fill"
          style={{ background: color, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: visible ? `${pct}%` : 0 }}
          transition={{ duration: .72, delay: .05 + index * .07, ease: [.16,1,.3,1] }}
        />
      </div>
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────
function SectionHeader({ label, title, sub, center=true }) {
  return (
    <div style={{ marginBottom:'2.75rem', textAlign: center ? 'center' : 'left' }}>
      {label && (
        <p style={{ fontSize:'.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em',
          color:'var(--accent-primary)', marginBottom:'.6rem', fontFamily:'var(--font-mono)' }}>
          {label}
        </p>
      )}
      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, lineHeight:1.15,
        fontSize:'clamp(1.55rem,3.5vw,2.3rem)', color:'var(--text-primary)', marginBottom: sub ? '.6rem':0 }}>
        {title}
      </h2>
      {sub && <p style={{ color:'var(--text-secondary)', fontSize:'.875rem', lineHeight:1.7,
        maxWidth: center ? '500px':'none', margin: center ? '0 auto':0 }}>{sub}</p>}
    </div>
  )
}

// ── Data ───────────────────────────────────────────────────────

const EDUCATION = [
  { period:'2013 – 2014', school:'St. Geroza School, Saidpur', level:'Nursery & KG',
    desc:'First steps in formal education — where curiosity began.', icon: faSchool },
  { period:'2015 – 2017', school:'St. Geroza School, Saidpur', level:'Class 1, 2 & 3',
    desc:'Primary years, developed early love for reading and science subjects.', icon: faSchool },
  { period:'2018 – 2019', school:'Tulshiram Govt. Primary School, Saidpur', level:'Class 4 & 5',
    desc:'Completed the primary cycle, building strong academic foundations.', icon: faSchool },
  { period:'2020', school:'Lions School & College, Saidpur', level:'Class 6',
    desc:'Brief enrollment before transitioning to SGSC.', icon: faGraduationCap },
  { period:'2021 – 2025', school:'Saidpur Govt. Science College (SGSC)', level:'Class 6 – 10',
    desc:'Five years focused on Science. Programming became a serious pursuit here.', icon: faGraduationCap },
  { period:'2026', school:'Saidpur Govt. Science College (SGSC)', level:'SSC-26 Batch',
    desc:'SSC examination — results expected mid-2026. Next: HSC → CSE degree.', icon: faTrophy, current:true },
  { period:'Future', school:'To be determined', level:'HSC (Planned)',
    desc:'Science group, aiming for top performance to unlock CSE admission.', icon: faBook, future:true },
  { period:'Dream', school:'Dream Institution', level:'BSc in CSE (Dream)',
    desc:'The ultimate goal: a Computer Science & Engineering degree to become a professional developer.', icon: faRocket, future:true },
]

const DEV_SKILLS = [
  { name:'AI Tools & Workflows', pct:90, color:'var(--accent-primary)', note:'Daily use — coding, design, planning' },
  { name:'HTML',                 pct:80, color:'#F97316', note:'Core structure, semantic markup' },
  { name:'CSS',                  pct:78, color:'#3B82F6', note:'Layouts, animations, responsive' },
  { name:'Git & GitHub',         pct:75, color:'#64748B', note:'Version control, project hosting' },
  { name:'Python',               pct:55, color:'#EAB308', note:'Learning stage, scripting' },
  { name:'JavaScript',           pct:42, color:'#F59E0B', note:'Improving — used in projects' },
  { name:'Java',                 pct:35, color:'#94A3B8', note:'Basic knowledge' },
]

const DESIGN_SKILLS = [
  { name:'Logo Design',          icon:faPalette,   color:'var(--accent-primary)' },
  { name:'Banner Design',        icon:faPalette,   color:'var(--accent-primary)' },
  { name:'Thumbnail Design',     icon:faCamera,    color:'var(--accent-primary)' },
  { name:'Business Card Design', icon:faHandshake, color:'var(--accent-primary)' },
  { name:'Poster Design',        icon:faGlobe,     color:'var(--accent-primary)' },
  { name:'Album / Book Design',  icon:faBook,      color:'var(--accent-primary)' },
  { name:'HTML & CSS Design',    icon:faCode,      color:'var(--accent-primary)' },
]

const VIDEO_SKILLS = [
  'YouTube Videos', 'Facebook Videos', 'Ads & Commercials',
  'Short Videos (Reels/Shorts)', 'Basic Animation Videos',
]

const TOOLS = [
  { name:'VS Code',          color:'var(--accent-primary)', icon:faTerminal },
  { name:'GitHub',           color:'var(--text-secondary)', icon:faGithub   },
  { name:'Firebase',         color:'#F59E0B', icon:faGears    },
  { name:'Google Sheets API',color:'var(--accent-primary)', icon:faGlobe    },
  { name:'Browser DevTools', color:'var(--accent-primary)', icon:faCode     },
  { name:'Odoo',             color:'var(--text-secondary)', icon:faLaptopCode },
]

const LANGUAGES = [
  { lang:'Bengali (বাংলা)', level:'Native',         pct:100, flag:'bd', country:'Bangladesh' },
  { lang:'English',          level:'Intermediate',   pct:65,  flag:'gb', country:'United Kingdom' },
  { lang:'Hindi (हिन्दी)',  level:'Conversational', pct:50,  flag:'in', country:'India' },
  { lang:'Urdu',             level:'Conversational', pct:45,  flag:'pk', country:'Pakistan' },
]

const VALUES = [
  { icon:faMosque,   title:'Islam First',         desc:'All decisions guided by Islamic & ethical principles. Halal income is non-negotiable.', color:'var(--accent-primary)' },
  { icon:faMedal,    title:'Perfection',           desc:'I spend as much time as needed to get things right. Quality over speed.', color:'var(--accent-primary)' },
  { icon:faShield,   title:'Honesty & Integrity',  desc:'Quality work speaks for itself. No showing off, no shortcuts, no compromises.', color:'var(--accent-primary)' },
  { icon:faDumbbell, title:'Discipline',            desc:'Structured routines, focused work sessions, and consistent daily effort.', color:'var(--accent-primary)' },
  { icon:faBrain,    title:'Beneficial Knowledge',  desc:'Only learning things with practical value — no wasted effort or meaningless content.', color:'var(--accent-primary)' },
  { icon:faSeedling, title:'Growth Mindset',        desc:'Every project is a step forward. Learning from failure and improving continuously.', color:'var(--accent-primary)' },
]

const INTERESTS = [
  { icon:faMosque,   label:'Prayer (Salah)'    },
  { icon:faCode,     label:'Programming'        },
  { icon:faDumbbell, label:'Outdoor Games'      },
  { icon:faBicycle,  label:'Cycling'            },
  { icon:faMapPin,   label:'Travelling'         },
  { icon:faBook,     label:'Reading Books'      },
  { icon:faSeedling, label:'Learning New Things'},
  { icon:faCamera,   label:'Editing'            },
]

const GOALS = [
  {
    period:'Short-Term', subtitle:'2026', icon:faFlag,
    items:['Complete SSC exams successfully (SSC-26)', 'Launch portfolio — mdturzo.web.app', 'Improve JavaScript skills', 'Begin learning advanced frameworks'],
  },
  {
    period:'Mid-Term', subtitle:'2026 – 2028', icon:faBullseye,
    items:['Enroll in HSC (Science group)', 'Master full-stack web development', 'Start freelancing — halal income only', 'Build real client projects'],
  },
  {
    period:'Long-Term', subtitle:'The Dream', icon:faMountain,
    items:['Study BSc in Computer Science & Engineering', 'Become a professional full-stack developer', 'Establish an ethical freelancing career', 'Build technology that benefits society'],
  },
]

const SOCIALS = [
  { icon:faGithub,   label:'GitHub',    handle:'muhtasim-rahman', url:SITE_CONFIG.social.github,    color:'#F0F6FF', desc:'Code & projects' },
  { icon:faLinkedin, label:'LinkedIn',  handle:'mdturzo999',       url:SITE_CONFIG.social.linkedin,  color:'#0A66C2', desc:'Professional network' },
  { icon:faFacebook, label:'Facebook',  handle:'mdturzo999',       url:SITE_CONFIG.social.facebook,  color:'#1877F2', desc:'Social updates' },
  { icon:faInstagram,label:'Instagram', handle:'mdturzo999',       url:SITE_CONFIG.social.instagram, color:'#E1306C', desc:'Photos & stories' },
  { icon:faYoutube,  label:'YouTube',   handle:'@mdturzo999',      url:SITE_CONFIG.social.youtube,   color:'#FF0000', desc:'Videos & tutorials' },
  { icon:faTelegram, label:'Telegram',  handle:'mdturzo16',        url:SITE_CONFIG.social.telegram,  color:'#2AABEE', desc:'Quick messages' },
  { icon:faXTwitter, label:'X (Twitter)',handle:'mdturzo999',      url:'https://twitter.com/mdturzo999', color:'#94A3B8', desc:'Thoughts & updates' },
  { icon:faTiktok,   label:'TikTok',    handle:'mdturzo16',        url:'https://tiktok.com/@mdturzo16', color:'#94A3B8', desc:'Short videos' },
  { icon:faEnvelope, label:'Email',     handle:'mdturzo.dev@gmail.com', url:`mailto:${SITE_CONFIG.owner.email}`, color:'#EF4444', desc:'Direct contact' },
]

// ── Ripple click effect hook ───────────────────────────────────
function useRipple() {
  const [ripples, setRipples] = useState([])
  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples(r => [...r, { id, x, y }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600)
  }, [])
  const rippleEls = ripples.map(r => (
    <span key={r.id} className="ab31-ripple" style={{ left:r.x, top:r.y }} />
  ))
  return { handleClick, rippleEls }
}

// ── Education timeline item ────────────────────────────────────
function EduItem({ item, index, isLeft, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity:0, x:-20 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:.5, ease:[.16,1,.3,1], delay: index * .06 }}
        className={`ab31-tl-item-m${item.current ? ' ab31-tl-current' : ''}${item.future ? ' ab31-tl-future' : ''}`}
      >
        <div className="ab31-tl-dot-m" style={{
          borderColor: item.current ? 'var(--accent-primary)' : item.future ? 'rgba(59,130,246,.4)' : 'var(--border-strong)',
          background: item.current ? 'var(--accent-primary)' : 'var(--bg-surface-2)',
          boxShadow: item.current ? '0 0 12px rgba(59,130,246,.4)' : 'none',
        }}>
          <FontAwesomeIcon icon={item.icon} style={{ fontSize:'.6rem', color: item.current ? '#fff' : 'var(--text-tertiary)' }} />
        </div>
        <div className="ab31-tl-card">
          <div className="ab31-tl-period">{item.period}</div>
          <div className="ab31-tl-school">{item.school}</div>
          <div className="ab31-tl-level" style={{ color: item.current ? 'var(--accent-primary)' : item.future ? 'var(--text-tertiary)' : 'var(--text-secondary)' }}>
            {item.level}
            {item.current && <span className="ab31-tl-badge ab31-badge-current">Current</span>}
            {item.future  && <span className="ab31-tl-badge ab31-badge-future">Planned</span>}
          </div>
          <div className="ab31-tl-desc">{item.desc}</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, x: isLeft ? -24 : 24 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:.5, ease:[.16,1,.3,1], delay: index * .06 }}
      className={`ab31-tl-row${item.current ? ' ab31-tl-current' : ''}${item.future ? ' ab31-tl-future' : ''}`}
    >
      {/* left card */}
      <div className={`ab31-tl-col-l`}>
        {isLeft ? (
          <div className="ab31-tl-card ab31-tl-card-l">
            <div className="ab31-tl-period">{item.period}</div>
            <div className="ab31-tl-school">{item.school}</div>
            <div className="ab31-tl-level" style={{ color: item.current ? 'var(--accent-primary)' : item.future ? 'var(--text-tertiary)' : 'var(--text-secondary)' }}>
              {item.level}
              {item.current && <span className="ab31-tl-badge ab31-badge-current">Current</span>}
              {item.future  && <span className="ab31-tl-badge ab31-badge-future">Planned</span>}
            </div>
            <div className="ab31-tl-desc">{item.desc}</div>
          </div>
        ) : null}
      </div>

      {/* center dot */}
      <div className="ab31-tl-center">
        <div className="ab31-tl-dot" style={{
          borderColor: item.current ? 'var(--accent-primary)' : item.future ? 'rgba(59,130,246,.4)' : 'var(--border-strong)',
          background: item.current ? 'var(--accent-primary)' : 'var(--bg-surface-2)',
          boxShadow: item.current ? '0 0 0 4px rgba(59,130,246,.15), 0 0 16px rgba(59,130,246,.3)' : '0 0 0 3px var(--bg-page)',
        }}>
          <FontAwesomeIcon icon={item.icon} style={{ fontSize:'.65rem', color: item.current ? '#fff' : 'var(--text-tertiary)' }} />
        </div>
      </div>

      {/* right card */}
      <div className="ab31-tl-col-r">
        {!isLeft ? (
          <div className="ab31-tl-card ab31-tl-card-r">
            <div className="ab31-tl-period">{item.period}</div>
            <div className="ab31-tl-school">{item.school}</div>
            <div className="ab31-tl-level" style={{ color: item.current ? 'var(--accent-primary)' : item.future ? 'var(--text-tertiary)' : 'var(--text-secondary)' }}>
              {item.level}
              {item.current && <span className="ab31-tl-badge ab31-badge-current">Current</span>}
              {item.future  && <span className="ab31-tl-badge ab31-badge-future">Planned</span>}
            </div>
            <div className="ab31-tl-desc">{item.desc}</div>
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}

// ── Goal card with ripple ──────────────────────────────────────
function GoalCard({ period, subtitle, icon, items }) {
  const { handleClick, rippleEls } = useRipple()
  return (
    <div
      className="ab31-goal-card card"
      onClick={handleClick}
      style={{ position:'relative', overflow:'hidden', cursor:'pointer' }}
    >
      {rippleEls}
      <div className="ab31-goal-header">
        <div className="ab31-goal-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div>
          <div style={{ fontWeight:700, fontSize:'.9rem', color:'var(--text-primary)' }}>{period}</div>
          <div style={{ fontSize:'.72rem', color:'var(--accent-primary)', fontFamily:'var(--font-mono)' }}>{subtitle}</div>
        </div>
      </div>
      <ul className="ab31-goal-list">
        {items.map((item) => (
          <li key={item} className="ab31-goal-item">
            <FontAwesomeIcon icon={faCheck} style={{ color:'var(--accent-primary)', fontSize:'.65rem', flexShrink:0, marginTop:'.15rem' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────
export default function About() {
  const { settings } = useSiteSettings()
  const age = calculateAge()

  // Skills tab state
  const [activeTab, setActiveTab]   = useState('dev')
  const [skillVisible, setSkillVisible] = useState(false)
  const skillSectionRef = useRef(null)

  // Education timeline scroll animation
  const timelineRef   = useRef(null)
  const [lineProgress, setLineProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => { trackPage('About') }, [])

  // Detect mobile for timeline layout
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Timeline line scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      const rect  = timelineRef.current.getBoundingClientRect()
      const wh    = window.innerHeight
      const total = rect.height + wh * 0.4
      const done  = wh * 0.65 - rect.top
      setLineProgress(Math.max(0, Math.min(1, done / total)))
    }
    window.addEventListener('scroll', handleScroll, { passive:true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Skills visibility
  useEffect(() => {
    if (!skillSectionRef.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setSkillVisible(true)
    }, { threshold:.1 })
    obs.observe(skillSectionRef.current)
    return () => obs.disconnect()
  }, [])

  const switchTab = (id) => {
    setActiveTab(id)
    setSkillVisible(false)
    setTimeout(() => setSkillVisible(true), 30)
  }

  const cvEnabled = settings?.cvEnabled ?? SITE_CONFIG.defaults?.cvEnabled ?? false
  const cvUrl     = settings?.cvUrl     ?? SITE_CONFIG.defaults?.cvUrl     ?? '#'

  const meta = buildMeta({
    title: 'About',
    description: `Learn about Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh.`,
    url: `${SITE_CONFIG.siteURL}/about`,
  })

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description"       content={meta.description} />
        <meta property="og:title"      content={meta.title} />
        <meta property="og:description"content={meta.description} />
        <meta property="og:image"      content={meta.image} />
        <meta property="og:url"        content={meta.url} />
        <meta property="og:type"       content="profile" />
        <meta name="twitter:card"      content="summary_large_image" />
        <link rel="canonical"          href={meta.url} />
        {/* flag-icons CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.2.3/css/flag-icons.min.css" />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name:'Home', path:'/' }, { name:'About', path:'/about' }
        ]))}</script>
      </Helmet>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section className="ab31-hero" aria-label="About hero">
        {/* Subtle background */}
        <div className="ab31-hero-tex" aria-hidden="true" />
        <div className="ab31-hero-orb ab31-orb-1" aria-hidden="true" />
        <div className="ab31-hero-orb ab31-orb-2" aria-hidden="true" />

        <div className="container-xl">
          <div className="ab31-hero-grid">

            {/* LEFT — text */}
            <motion.div
              className="ab31-hero-left"
              initial="hidden" animate="show"
              variants={stagger(.08)}
            >
              {/* Breadcrumb */}
              <motion.nav variants={fadeUp} className="ab31-breadcrumb">
                <Link to="/" className="ab31-bc-link">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} style={{ fontSize:'.5rem', opacity:.5 }} />
                <span className="ab31-bc-cur">About</span>
              </motion.nav>

              {/* Label */}
              <motion.p variants={fadeUp} className="ab31-hero-label">
                About Me
              </motion.p>

              {/* Name */}
              <motion.div variants={fadeUp}>
                <h1 className="ab31-hero-name">
                  Muhtasim <span style={{ color:'var(--accent-primary)' }}>Rahman</span>
                </h1>
                <p className="ab31-hero-role">
                  Web Developer &amp; Designer · Nilphamari, Bangladesh
                </p>
              </motion.div>

              {/* Bio */}
              <motion.p variants={fadeUp} className="ab31-hero-bio">
                A <strong>{age}-year-old</strong> self-taught developer building clean, fast, and meaningful
                digital experiences — guided by Islamic &amp; ethical principles, fuelled by curiosity.
              </motion.p>

              {/* Info chips */}
              <motion.div variants={fadeUp} className="ab31-hero-chips">
                {[
                  { icon:faLocationDot,  text:'Nilphamari, Bangladesh' },
                  { icon:faGraduationCap,text:`SSC-26 · SGSC` },
                  { icon:faMosque,       text:'Muslim' },
                  { icon:faRocket,       text:'Goal: CSE Engineer' },
                ].map(({ icon, text }) => (
                  <span key={text} className="ab31-chip">
                    <FontAwesomeIcon icon={icon} style={{ color:'var(--accent-primary)', fontSize:'.7rem' }} />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* CTAs + socials */}
              <motion.div variants={fadeUp} className="ab31-hero-actions">
                <Link to="/contact" className="ab31-hero-btn-p">
                  <FontAwesomeIcon icon={faHandshake} />
                  Hire Me
                </Link>
                {cvEnabled && cvUrl && cvUrl !== '#' ? (
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="ab31-hero-btn-o">
                    <FontAwesomeIcon icon={faDownload} />
                    Download CV
                  </a>
                ) : (
                  <span className="ab31-hero-btn-o" style={{ opacity:.55, cursor:'not-allowed' }}>
                    <FontAwesomeIcon icon={faDownload} />
                    CV Soon
                  </span>
                )}
                <div className="ab31-hero-socials">
                  {[
                    { icon:faGithub,   href:SITE_CONFIG.social.github,   label:'GitHub'   },
                    { icon:faLinkedin, href:SITE_CONFIG.social.linkedin, label:'LinkedIn' },
                    { icon:faFacebook, href:SITE_CONFIG.social.facebook, label:'Facebook' },
                    { icon:faTelegram, href:SITE_CONFIG.social.telegram, label:'Telegram' },
                    { icon:faEnvelope, href:`mailto:${SITE_CONFIG.owner.email}`, label:'Email' },
                  ].map(({ icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      aria-label={label} className="ab31-social-icon">
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — hero-back.webp with home-style gradient */}
            <motion.div
              className="ab31-hero-right"
              initial={{ opacity:0, x:24 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:.75, ease:[.16,1,.3,1], delay:.1 }}
              aria-hidden="true"
            >
              <div className="ab31-hero-img-box">
                <div className="ab31-hero-img-glow" />
                <div className="ab31-hero-img-frame">
                  <img src="/hero-back.webp" alt="" className="ab31-hero-img" loading="eager" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. INFO DETAILS
      ══════════════════════════════════════════════════════ */}
      <section className="section section-alt" id="about-info">
        <div className="container-xl">
          <div className="ab31-info-grid">

            {/* Left: quote + story */}
            <AnimIn variants={fadeL}>
              <div className="ab31-quote-block">
                <FontAwesomeIcon icon={faQuoteLeft} className="ab31-quote-icon" />
                <p className="ab31-quote-text">
                  "I possess a strong passion for programming and web development. I aim to develop
                  impactful websites that seamlessly combine functionality with captivating design —
                  while adhering to ethical and Halal principles in all my work."
                </p>
                <div className="ab31-quote-attr">
                  <div className="ab31-quote-avatar">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    <div style={{ fontSize:'.82rem', fontWeight:700, color:'var(--text-primary)' }}>Muhtasim Rahman</div>
                    <div style={{ fontSize:'.72rem', color:'var(--text-tertiary)' }}>Self-written bio · 2024</div>
                  </div>
                </div>
              </div>
            </AnimIn>

            {/* Right: story cards */}
            <motion.div
              initial="hidden" whileInView="show"
              viewport={{ once:true, amount:.1 }}
              variants={stagger(.1)}
              style={{ display:'flex', flexDirection:'column', gap:'1rem' }}
            >
              {[
                { icon:faSeedling, title:'Early Spark',
                  text:'Fascinated by technology from childhood — originally dreaming of electrical engineering. Discovering web development through YouTube completely changed the path.' },
                { icon:faCode, title:'Learning in Progress',
                  text:'Self-taught through YouTube and real projects. Even while preparing for SSC exams, never stopped shipping code — from QR generators to full PWA applications.' },
                { icon:faRocket, title:'What\'s Next',
                  text:'SSC done. HSC next, then CSE. The real journey has just begun — with full focus on becoming a professional full-stack developer, ethically and deliberately.' },
              ].map(({ icon, title, text }) => (
                <motion.div key={title} variants={fadeUp} className="ab31-story-card">
                  <div className="ab31-story-icon">
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:'.88rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'.3rem' }}>{title}</h3>
                    <p style={{ fontSize:'.82rem', color:'var(--text-secondary)', lineHeight:1.7 }}>{text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Experience stats */}
          <AnimIn delay={0.1}>
            <div className="ab31-exp-stats">
              {[
                { value:`${settings?.statsYearsDev ?? '3'}+`,    label:'Years Web Development' },
                { value:`${settings?.statsYearsDesign ?? '6'}+`, label:'Years Design & Editing' },
                { value:`${settings?.statsProjects ?? '16'}+`,   label:'Projects Built' },
                { value:'5+',                                      label:'Years Video Editing' },
              ].map(({ value, label }) => (
                <div key={label} className="ab31-exp-stat">
                  <div className="ab31-exp-val">{value}</div>
                  <div className="ab31-exp-lbl">{label}</div>
                </div>
              ))}
            </div>
          </AnimIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. EDUCATION TIMELINE
      ══════════════════════════════════════════════════════ */}
      <section className="section" id="education">
        <div className="container-xl">
          <AnimIn>
            <SectionHeader
              label="Education"
              title="Academic Journey"
              sub="From nursery to the dream of CSE — every institution that shaped who I am."
            />
          </AnimIn>

          <div ref={timelineRef} className={`ab31-timeline${isMobile ? ' ab31-tl-mobile' : ''}`}>
            {/* Animated line */}
            {!isMobile ? (
              <>
                {/* Background muted line */}
                <div className="ab31-tl-line-bg" />
                {/* Filled progress line */}
                <div className="ab31-tl-line-fill" style={{ height: `${lineProgress * 100}%` }} />
              </>
            ) : (
              <>
                <div className="ab31-tl-line-bg-m" />
                <div className="ab31-tl-line-fill-m" style={{ height: `${lineProgress * 100}%` }} />
              </>
            )}

            {/* Items */}
            {EDUCATION.map((item, i) => (
              <EduItem
                key={i}
                item={item}
                index={i}
                isLeft={i % 2 === 0}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. SKILLS & EXPERTISE
      ══════════════════════════════════════════════════════ */}
      <section className="section section-alt" id="skills" ref={skillSectionRef}>
        <div className="container-xl">
          <AnimIn>
            <SectionHeader
              label="Skills & Expertise"
              title="What I Know"
              sub="Self-rated skills based on real project experience — honest about strengths and growing areas."
            />
          </AnimIn>

          {/* Tabs */}
          <div className="ab31-tabs">
            {[
              { id:'dev',    label:'Programming', icon:faCode    },
              { id:'design', label:'Design',      icon:faPalette },
              { id:'video',  label:'Video',        icon:faVideo   },
              { id:'tools',  label:'Tools',        icon:faGears   },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                className={`ab31-tab${activeTab === id ? ' ab31-tab-active' : ''}`}
                onClick={() => switchTab(id)}
              >
                <FontAwesomeIcon icon={icon} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity:0, y:12 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-8 }}
              transition={{ duration:.28 }}
            >
              {activeTab === 'dev' && (
                <div className="ab31-skill-panel">
                  <div className="ab31-skill-bars-col">
                    {DEV_SKILLS.map((sk, i) => (
                      <SkillBar key={sk.name} {...sk} index={i} visible={skillVisible} />
                    ))}
                  </div>
                  <div className="ab31-skill-note card">
                    <FontAwesomeIcon icon={faBrain} style={{ color:'var(--accent-primary)', fontSize:'1.1rem', marginBottom:'.5rem', display:'block' }} />
                    <p style={{ fontSize:'.82rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'.3rem' }}>Still Learning</p>
                    <p style={{ fontSize:'.77rem', color:'var(--text-secondary)', lineHeight:1.65 }}>
                      As a student, I'm at my learning stage. SSC exams paused deep learning for ~2 years,
                      but I never stopped building. Now with exams done, the real journey begins.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="ab31-skill-panel">
                  <div className="ab31-design-grid">
                    {DESIGN_SKILLS.map(({ name, icon, color }) => (
                      <div key={name} className="ab31-design-item card">
                        <div className="ab31-design-icon">
                          <FontAwesomeIcon icon={icon} style={{ color }} />
                        </div>
                        <span style={{ fontSize:'.82rem', color:'var(--text-secondary)', fontWeight:500 }}>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ab31-skill-note card">
                    <FontAwesomeIcon icon={faPalette} style={{ color:'var(--accent-primary)', fontSize:'1.1rem', marginBottom:'.5rem', display:'block' }} />
                    <p style={{ fontSize:'.82rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'.3rem' }}>6+ Years Experience</p>
                    <p style={{ fontSize:'.77rem', color:'var(--text-secondary)', lineHeight:1.65 }}>
                      Logo, banner, thumbnail — designing since age 12. Some commercial-grade, all with a focus on clean aesthetics.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'video' && (
                <div className="ab31-skill-panel">
                  <div className="ab31-video-list">
                    {VIDEO_SKILLS.map((name) => (
                      <div key={name} className="ab31-video-item card">
                        <FontAwesomeIcon icon={faCheck} style={{ color:'var(--accent-primary)', fontSize:'.7rem', flexShrink:0 }} />
                        <span style={{ fontSize:'.85rem', color:'var(--text-secondary)' }}>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ab31-skill-note card">
                    <FontAwesomeIcon icon={faVideo} style={{ color:'var(--accent-primary)', fontSize:'1.1rem', marginBottom:'.5rem', display:'block' }} />
                    <p style={{ fontSize:'.82rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'.3rem' }}>5+ Years Experience</p>
                    <p style={{ fontSize:'.77rem', color:'var(--text-secondary)', lineHeight:1.65 }}>
                      YouTube, Facebook, Shorts, Reels — video editing has been a creative outlet alongside web development since early on.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="ab31-tool-grid">
                  {TOOLS.map(({ name, color, icon }) => (
                    <div key={name} className="ab31-tool-item card">
                      <div className="ab31-tool-icon" style={{ color }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <span style={{ fontSize:'.82rem', color:'var(--text-secondary)', fontWeight:500 }}>{name}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. LANGUAGE PROFICIENCY
      ══════════════════════════════════════════════════════ */}
      <section className="section" id="languages">
        <div className="container-xl">
          <div className="ab31-lang-grid">

            <AnimIn variants={fadeL}>
              <SectionHeader
                label="Languages"
                title="Language Proficiency"
                sub="Bengali is my native tongue. English is my professional language, with conversational Hindi and Urdu."
                center={false}
              />
            </AnimIn>

            <motion.div
              initial="hidden" whileInView="show"
              viewport={{ once:true, amount:.1 }}
              variants={stagger(.1)}
              style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}
            >
              {LANGUAGES.map(({ lang, level, pct, flag, country }, i) => (
                <motion.div key={lang} variants={fadeUp} className="ab31-lang-item">
                  <div className="ab31-lang-top">
                    <div className="ab31-lang-label">
                      <span className={`fi fi-${flag} ab31-flag`} title={country} aria-label={country} />
                      <span className="ab31-lang-name">{lang}</span>
                    </div>
                    <span className="ab31-lang-level">{level}</span>
                  </div>
                  <div className="ab31-lang-track">
                    <motion.div
                      className="ab31-lang-fill"
                      initial={{ width:0 }}
                      whileInView={{ width:`${pct}%` }}
                      viewport={{ once:true }}
                      transition={{ duration:.9, ease:[.16,1,.3,1], delay: i * .12 }}
                    />
                    <span className="ab31-lang-pct">{pct}%</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. VALUES & PERSONALITY
      ══════════════════════════════════════════════════════ */}
      <section className="section section-alt" id="values">
        <div className="container-xl">
          <AnimIn>
            <SectionHeader
              label="Who I Am"
              title="Values & Personality"
              sub="What drives me, what I believe in, and how I approach life and work."
            />
          </AnimIn>

          <div className="ab31-values-grid">
            {VALUES.map(({ icon, title, desc }, i) => (
              <AnimIn key={title} delay={i * .06}>
                <div className="ab31-value-card card">
                  <div className="ab31-value-icon">
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <h4 style={{ fontSize:'.88rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'.3rem' }}>{title}</h4>
                  <p style={{ fontSize:'.8rem', color:'var(--text-secondary)', lineHeight:1.65, margin:0 }}>{desc}</p>
                </div>
              </AnimIn>
            ))}
          </div>

          {/* Hobbies & Interests — inside same section */}
          <AnimIn delay={0.15}>
            <div className="ab31-hobbies">
              <p className="ab31-hobbies-label">Hobbies &amp; Interests</p>
              <div className="ab31-hobbies-chips">
                {INTERESTS.map(({ icon, label }) => (
                  <div key={label} className="ab31-hobby-chip card">
                    <FontAwesomeIcon icon={icon} style={{ color:'var(--accent-primary)', fontSize:'.75rem' }} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. GOALS & PLANS
      ══════════════════════════════════════════════════════ */}
      <section className="section" id="goals">
        <div className="container-xl">
          <AnimIn>
            <SectionHeader
              label="Roadmap"
              title="Goals & Future Plans"
              sub="Short, mid, and long-term ambitions — building toward the dream with patience and purpose."
            />
          </AnimIn>

          <div className="ab31-goals-grid">
            {GOALS.map(({ period, subtitle, icon, items }, gi) => (
              <AnimIn key={period} delay={gi * .1}>
                <GoalCard period={period} subtitle={subtitle} icon={icon} items={items} />
              </AnimIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. FIND ME ONLINE
      ══════════════════════════════════════════════════════ */}
      <section className="section section-alt" id="social">
        <div className="container-xl">
          <AnimIn>
            <SectionHeader
              label="Online Presence"
              title="Find Me Online"
              sub="All the places where I share work, thoughts, and updates."
            />
          </AnimIn>

          <div className="ab31-social-grid">
            {SOCIALS.map(({ icon, label, handle, url, color, desc }, i) => (
              <AnimIn key={label} delay={i * .04}>
                <a
                  href={url}
                  target={url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="ab31-social-card card"
                  style={{ '--hc': color }}
                >
                  <div className="ab31-sc-icon-wrap">
                    <FontAwesomeIcon icon={icon} className="ab31-sc-icon" />
                  </div>
                  <div className="ab31-sc-info">
                    <div className="ab31-sc-label">{label}</div>
                    <div className="ab31-sc-handle">{handle}</div>
                    <div className="ab31-sc-desc">{desc}</div>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="ab31-sc-arrow" />
                </a>
              </AnimIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. SHARED CTA
      ══════════════════════════════════════════════════════ */}
      <SharedCTA />

      {/* ══════════════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════════════ */}
      <style>{`

        /* ── HERO ─────────────────────────────────────────── */
        .ab31-hero {
          position: relative;
          overflow: hidden;
          background: var(--bg-page);
          padding-top: calc(var(--navbar-h) + clamp(3rem, 7vw, 5rem));
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }
        .ab31-hero-tex {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(59,130,246,.05) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 85%);
        }
        [data-theme=light] .ab31-hero-tex {
          background-image:
            radial-gradient(rgba(37,99,235,.06) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
        }
        .ab31-hero-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:0; }
        .ab31-orb-1 { width:480px; height:480px; background:rgba(59,130,246,.07); top:-120px; left:-80px; animation:ab31-orb 20s ease-in-out infinite alternate; }
        .ab31-orb-2 { width:320px; height:320px; background:rgba(139,92,246,.05); bottom:-80px; right:5%; animation:ab31-orb 16s ease-in-out 6s infinite alternate; }
        @keyframes ab31-orb { from{transform:translate(0,0)} to{transform:translate(16px,-12px)} }

        .ab31-hero-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        /* LEFT */
        .ab31-hero-left { display:flex; flex-direction:column; gap:.9rem; }

        .ab31-breadcrumb {
          display:inline-flex; align-items:center; gap:.45rem;
          font-size:.72rem; font-family:var(--font-mono);
          color:var(--text-tertiary);
        }
        .ab31-bc-link { color:var(--text-tertiary); text-decoration:none; }
        .ab31-bc-link:hover { color:var(--accent-primary); }
        .ab31-bc-cur { color:var(--text-secondary); }

        .ab31-hero-label {
          font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.12em;
          color:var(--accent-primary); font-family:var(--font-mono);
        }
        .ab31-hero-name {
          font-family:var(--font-display); font-weight:800;
          font-size:clamp(2rem,4.5vw,3.4rem); line-height:1.1;
          color:var(--text-primary); letter-spacing:-.02em;
        }
        .ab31-hero-role {
          font-size:clamp(.82rem,1.2vw,.98rem); color:var(--text-secondary);
          font-weight:500; margin-top:.2rem; line-height:1.5;
        }
        .ab31-hero-bio {
          font-size:clamp(.84rem,1.05vw,.92rem); color:var(--text-secondary);
          line-height:1.75; max-width:480px;
        }
        .ab31-hero-chips {
          display:flex; flex-wrap:wrap; gap:.5rem;
        }
        .ab31-chip {
          display:inline-flex; align-items:center; gap:.42rem;
          padding:.32rem .75rem; border-radius:var(--radius-full);
          background:var(--bg-surface); border:1px solid var(--border-color);
          font-size:.76rem; color:var(--text-secondary); font-family:var(--font-mono);
        }
        .ab31-hero-actions {
          display:flex; flex-wrap:wrap; align-items:center; gap:.65rem;
          margin-top:.2rem;
        }
        .ab31-hero-btn-p {
          display:inline-flex; align-items:center; gap:.45rem;
          padding:.6rem 1.35rem; border-radius:var(--radius-lg);
          background:var(--accent-primary); color:#fff;
          font-size:.84rem; font-weight:700; text-decoration:none;
          border:2px solid var(--accent-primary);
          box-shadow:0 3px 14px rgba(37,99,235,.25);
          transition:all .2s ease;
        }
        .ab31-hero-btn-p:hover { background:var(--accent-hover); border-color:var(--accent-hover); transform:translateY(-1px); }
        .ab31-hero-btn-o {
          display:inline-flex; align-items:center; gap:.45rem;
          padding:.6rem 1.25rem; border-radius:var(--radius-lg);
          background:transparent; color:var(--text-primary);
          font-size:.84rem; font-weight:600; text-decoration:none;
          border:1.5px solid var(--border-strong); transition:all .2s ease;
        }
        .ab31-hero-btn-o:hover { border-color:var(--accent-primary); color:var(--accent-primary); background:var(--accent-light); }
        .ab31-hero-socials { display:flex; gap:.4rem; }
        .ab31-social-icon {
          width:34px; height:34px; border-radius:var(--radius-md);
          display:flex; align-items:center; justify-content:center;
          background:var(--bg-surface); border:1px solid var(--border-color);
          color:var(--text-secondary); text-decoration:none; font-size:.82rem;
          transition:all .18s ease;
        }
        .ab31-social-icon:hover {
          color:var(--accent-primary); border-color:rgba(59,130,246,.4);
          background:rgba(59,130,246,.06); transform:translateY(-2px);
        }

        /* RIGHT — hero image */
        .ab31-hero-right { display:flex; align-items:center; justify-content:flex-end; }
        .ab31-hero-img-box {
          position:relative;
          width:clamp(260px, 30vw, 420px);
          height:clamp(340px, 38vw, 550px);
          flex-shrink:0;
        }
        .ab31-hero-img-glow {
          position:absolute; inset:8% 10%; z-index:0;
          border-radius:20px;
          background:radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.18) 0%, transparent 70%);
          filter:blur(32px); pointer-events:none;
          animation:ab31-glow 4s ease-in-out infinite;
        }
        [data-theme=light] .ab31-hero-img-glow {
          background:radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        @keyframes ab31-glow { 0%,100%{opacity:.7} 50%{opacity:1} }
        .ab31-hero-img-frame {
          position:relative; z-index:1;
          width:100%; height:100%;
          overflow:hidden;
        }
        /* Same gradient style as home hero (himg-frame::after) */
        .ab31-hero-img-frame::after {
          content:''; position:absolute; z-index:2; pointer-events:none;
          bottom:-5px; left:-1px; right:-1px; height:calc(38% + 5px);
          background:linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 6%, rgba(2,6,23,.7) 32%, transparent 100%);
        }
        [data-theme=light] .ab31-hero-img-frame::after {
          background:linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 5%, rgba(240,244,248,.8) 30%, transparent 100%);
        }
        .ab31-hero-img {
          width:100%; height:100%; object-fit:cover; object-position:top center; display:block;
        }

        /* Mobile hero: image on top, no frame/rounding */
        @media (max-width: 767px) {
          .ab31-hero-grid { grid-template-columns:1fr; gap:1.5rem; }
          .ab31-hero-right { justify-content:center; order:-1; }
          .ab31-hero-img-box {
            width:100%; height:clamp(200px, 55vw, 300px);
          }
          .ab31-hero-img { object-position:center 20%; }
          .ab31-hero-img-frame::after {
            height: calc(50% + 5px);
          }
          .ab31-hero-left { align-items:flex-start; }
        }
        @media (min-width:768px) and (max-width:1023px) {
          .ab31-hero-grid { grid-template-columns:1fr 1fr; gap:2rem; }
          .ab31-hero-img-box { width:100%; height:clamp(280px, 38vw, 420px); }
          /* Tablet: no rounded frame (just linear, same as desktop) */
        }

        /* ── INFO DETAILS ─────────────────────────────────── */
        .ab31-info-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:3rem; align-items:start; margin-bottom:3rem;
        }
        @media(max-width:767px) { .ab31-info-grid { grid-template-columns:1fr; gap:2rem; } }

        .ab31-quote-block {
          padding:1.5rem 1.75rem;
          border-left:3px solid var(--accent-primary);
          background:rgba(59,130,246,.03);
          border-radius:0 var(--radius-lg) var(--radius-lg) 0;
          border-top:1px solid var(--border-color); border-right:1px solid var(--border-color); border-bottom:1px solid var(--border-color);
        }
        .ab31-quote-icon { color:var(--accent-primary); opacity:.25; font-size:1.5rem; margin-bottom:.6rem; display:block; }
        .ab31-quote-text {
          font-size:.875rem; line-height:1.8; color:var(--text-secondary);
          font-style:italic; margin-bottom:1.1rem;
        }
        .ab31-quote-attr { display:flex; align-items:center; gap:.6rem; }
        .ab31-quote-avatar {
          width:32px; height:32px; border-radius:50%;
          background:rgba(59,130,246,.1); border:1px solid rgba(59,130,246,.2);
          display:flex; align-items:center; justify-content:center;
          color:var(--accent-primary); font-size:.8rem;
        }
        .ab31-story-card {
          display:flex; gap:.85rem; align-items:flex-start;
          padding:1rem 1.1rem; border-radius:var(--radius-lg);
          background:var(--bg-surface); border:1px solid var(--border-color);
        }
        .ab31-story-icon {
          width:34px; height:34px; border-radius:var(--radius-md); flex-shrink:0;
          background:rgba(59,130,246,.08);
          display:flex; align-items:center; justify-content:center;
          color:var(--accent-primary); font-size:.88rem;
        }
        .ab31-exp-stats {
          display:grid; grid-template-columns:repeat(auto-fit, minmax(140px,1fr));
          gap:1px; border-radius:var(--radius-xl);
          border:1px solid var(--border-color); overflow:hidden;
          background:var(--border-color);
        }
        .ab31-exp-stat {
          background:var(--bg-surface);
          padding:1.4rem 1rem; text-align:center;
        }
        .ab31-exp-val {
          font-family:var(--font-display); font-size:clamp(1.8rem,3vw,2.4rem);
          font-weight:800; color:var(--accent-primary); line-height:1;
        }
        .ab31-exp-lbl {
          font-size:.72rem; color:var(--text-tertiary);
          text-transform:uppercase; letter-spacing:.06em; margin-top:.35rem;
        }

        /* ── EDUCATION TIMELINE ───────────────────────────── */
        .ab31-timeline {
          position:relative; max-width:900px; margin:0 auto;
          padding-bottom:1rem;
        }

        /* PC: center line */
        .ab31-tl-line-bg {
          position:absolute; left:50%; transform:translateX(-50%);
          top:0; width:2px; height:100%;
          background:var(--bg-surface-3);
          border-radius:999px;
        }
        .ab31-tl-line-fill {
          position:absolute; left:50%; transform:translateX(-50%);
          top:0; width:2px;
          background:linear-gradient(to bottom, var(--accent-primary), #8B5CF6);
          border-radius:999px;
          transition:height .12s linear;
        }
        .ab31-tl-row {
          display:grid; grid-template-columns:1fr 48px 1fr;
          gap:1rem; align-items:center; margin-bottom:1.75rem;
        }
        .ab31-tl-col-l { text-align:right; }
        .ab31-tl-col-r { text-align:left; }
        .ab31-tl-center { display:flex; justify-content:center; z-index:1; }
        .ab31-tl-dot {
          width:40px; height:40px; border-radius:50%;
          border:2px solid var(--border-strong);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; transition:box-shadow .2s ease;
        }
        .ab31-tl-card {
          padding:.9rem 1.1rem; border-radius:var(--radius-lg);
          background:var(--bg-surface); border:1px solid var(--border-color);
          display:inline-block; max-width:100%;
          transition:border-color .2s ease;
        }
        .ab31-tl-card-l { text-align:left; }
        .ab31-tl-card-r { text-align:left; }
        .ab31-tl-current .ab31-tl-card {
          border-color:rgba(59,130,246,.3);
          background:rgba(59,130,246,.04);
        }
        .ab31-tl-future .ab31-tl-card {
          border-style:dashed; opacity:.75;
        }
        .ab31-tl-period { font-size:.68rem; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:.2rem; }
        .ab31-tl-school { font-weight:700; font-size:.84rem; color:var(--text-primary); line-height:1.3; margin-bottom:.2rem; }
        .ab31-tl-level  { font-size:.78rem; display:flex; align-items:center; gap:.4rem; flex-wrap:wrap; }
        .ab31-tl-desc   { font-size:.76rem; color:var(--text-tertiary); line-height:1.55; margin-top:.35rem; }
        .ab31-tl-badge  { font-size:.6rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:.1rem .45rem; border-radius:var(--radius-full); font-family:var(--font-mono); }
        .ab31-badge-current { background:rgba(59,130,246,.12); color:var(--accent-primary); }
        .ab31-badge-future  { background:rgba(148,163,184,.1);  color:var(--text-tertiary); }

        /* Mobile timeline */
        .ab31-tl-mobile { padding-left:2.5rem; }
        .ab31-tl-line-bg-m {
          position:absolute; left:.75rem; top:0; width:2px; height:100%;
          background:var(--bg-surface-3); border-radius:999px;
        }
        .ab31-tl-line-fill-m {
          position:absolute; left:.75rem; top:0; width:2px;
          background:linear-gradient(to bottom, var(--accent-primary), #8B5CF6);
          border-radius:999px; transition:height .12s linear;
        }
        .ab31-tl-item-m {
          position:relative; display:flex; gap:.85rem;
          align-items:flex-start; margin-bottom:1.5rem;
        }
        .ab31-tl-dot-m {
          position:absolute; left:-2.1rem;
          width:32px; height:32px; border-radius:50%;
          border:2px solid var(--border-strong);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; background:var(--bg-surface-2);
          top:.5rem;
        }

        /* ── SKILLS ───────────────────────────────────────── */
        .ab31-tabs {
          display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:2rem;
          padding:.3rem; background:var(--bg-surface); border-radius:var(--radius-xl);
          border:1px solid var(--border-color); width:fit-content;
        }
        .ab31-tab {
          display:inline-flex; align-items:center; gap:.4rem;
          padding:.5rem 1rem; border-radius:var(--radius-lg);
          background:transparent; border:none; cursor:pointer;
          font-size:.8rem; font-weight:600; color:var(--text-tertiary);
          transition:all .18s ease; font-family:var(--font-body);
        }
        .ab31-tab:hover { color:var(--text-secondary); }
        .ab31-tab-active {
          background:var(--bg-page); color:var(--accent-primary);
          box-shadow:var(--shadow-sm);
        }
        .ab31-skill-panel {
          display:grid; grid-template-columns:1fr 260px; gap:2rem; align-items:start;
        }
        @media(max-width:767px) { .ab31-skill-panel { grid-template-columns:1fr; } }
        .ab31-skill-bars-col { display:flex; flex-direction:column; gap:.1rem; }
        .ab31-skill-row { margin-bottom:.9rem; }
        .ab31-skill-meta { display:flex; justify-content:space-between; margin-bottom:.35rem; }
        .ab31-skill-name { font-size:.82rem; font-weight:600; color:var(--text-primary); }
        .ab31-skill-right { display:flex; align-items:center; gap:.6rem; }
        .ab31-skill-note { font-size:.7rem; color:var(--text-tertiary); font-family:var(--font-mono); }
        .ab31-skill-pct  { font-size:.75rem; font-family:var(--font-mono); }
        .ab31-skill-track { height:6px; background:var(--bg-surface-3); border-radius:999px; overflow:hidden; }
        .ab31-skill-fill  { height:100%; border-radius:999px; }
        .ab31-skill-note { padding:1.25rem; }

        .ab31-design-grid {
          display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:.6rem;
        }
        .ab31-design-item {
          display:flex; align-items:center; gap:.55rem;
          padding:.65rem .85rem;
        }
        .ab31-design-icon {
          width:28px; height:28px; border-radius:var(--radius-md); flex-shrink:0;
          background:rgba(59,130,246,.08);
          display:flex; align-items:center; justify-content:center; font-size:.82rem;
        }
        .ab31-video-list { display:flex; flex-direction:column; gap:.5rem; }
        .ab31-video-item { display:flex; align-items:center; gap:.65rem; padding:.7rem 1rem; }

        .ab31-tool-grid {
          display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:.75rem;
        }
        .ab31-tool-item {
          display:flex; flex-direction:column; align-items:center; gap:.5rem;
          padding:1.1rem .75rem; text-align:center;
        }
        .ab31-tool-icon {
          width:38px; height:38px; border-radius:var(--radius-lg);
          background:rgba(59,130,246,.07);
          display:flex; align-items:center; justify-content:center; font-size:.95rem;
        }

        /* ── LANGUAGES ────────────────────────────────────── */
        .ab31-lang-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;
        }
        @media(max-width:767px) { .ab31-lang-grid { grid-template-columns:1fr; gap:2rem; } }
        .ab31-lang-item { display:flex; flex-direction:column; gap:.5rem; }
        .ab31-lang-top  { display:flex; justify-content:space-between; align-items:center; }
        .ab31-lang-label { display:flex; align-items:center; gap:.55rem; }
        .ab31-flag { width:1.2em; height:.9em; border-radius:2px; }
        .ab31-lang-name  { font-size:.88rem; font-weight:700; color:var(--text-primary); }
        .ab31-lang-level { font-size:.72rem; color:var(--accent-primary); font-family:var(--font-mono); font-weight:600; }
        .ab31-lang-track { position:relative; height:7px; background:var(--bg-surface-3); border-radius:999px; overflow:visible; }
        .ab31-lang-fill  { height:100%; border-radius:999px; background:var(--accent-primary); position:relative; }
        .ab31-lang-fill::after {
          content:''; position:absolute; right:0; top:50%; transform:translateY(-50%);
          width:11px; height:11px; border-radius:50%;
          background:var(--accent-primary); border:2px solid var(--bg-page);
          box-shadow:0 0 6px rgba(59,130,246,.4);
        }
        .ab31-lang-pct { position:absolute; right:0; top:calc(100% + .35rem); font-size:.65rem; color:var(--text-tertiary); font-family:var(--font-mono); }

        /* ── VALUES ───────────────────────────────────────── */
        .ab31-values-grid {
          display:grid; grid-template-columns:repeat(auto-fill, minmax(250px,1fr));
          gap:1rem; margin-bottom:2.5rem;
        }
        .ab31-value-card {
          padding:1.4rem 1.25rem;
          transition:border-color .2s ease, transform .2s ease;
        }
        .ab31-value-card:hover { border-color:rgba(59,130,246,.3); transform:translateY(-2px); }
        .ab31-value-icon {
          width:40px; height:40px; border-radius:var(--radius-lg);
          background:rgba(59,130,246,.08); border:1px solid rgba(59,130,246,.15);
          display:flex; align-items:center; justify-content:center;
          color:var(--accent-primary); font-size:.95rem; margin-bottom:.9rem;
        }
        .ab31-hobbies { padding:1.5rem 1.75rem; border-radius:var(--radius-xl); background:var(--bg-surface); border:1px solid var(--border-color); }
        .ab31-hobbies-label { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:1rem; }
        .ab31-hobbies-chips { display:flex; flex-wrap:wrap; gap:.55rem; }
        .ab31-hobby-chip {
          display:inline-flex; align-items:center; gap:.42rem;
          padding:.4rem .9rem; font-size:.8rem; color:var(--text-secondary);
        }

        /* ── GOALS ────────────────────────────────────────── */
        .ab31-goals-grid {
          display:grid; grid-template-columns:repeat(auto-fit, minmax(240px,1fr)); gap:1.25rem;
        }
        .ab31-goal-card { padding:1.5rem; }
        .ab31-goal-header { display:flex; align-items:center; gap:.75rem; margin-bottom:1.25rem; }
        .ab31-goal-icon {
          width:38px; height:38px; border-radius:var(--radius-md); flex-shrink:0;
          background:rgba(59,130,246,.08); border:1px solid rgba(59,130,246,.15);
          display:flex; align-items:center; justify-content:center;
          color:var(--accent-primary); font-size:.9rem;
        }
        .ab31-goal-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.55rem; }
        .ab31-goal-item { display:flex; align-items:flex-start; gap:.55rem; font-size:.82rem; color:var(--text-secondary); line-height:1.55; }
        .ab31-ripple {
          position:absolute; border-radius:50%; pointer-events:none;
          width:4px; height:4px; transform:translate(-50%,-50%);
          background:rgba(59,130,246,.25);
          animation:ab31-rip .6s ease-out forwards;
        }
        @keyframes ab31-rip {
          from { width:0; height:0; opacity:.6; }
          to   { width:120px; height:120px; opacity:0; }
        }

        /* ── FIND ME ONLINE ───────────────────────────────── */
        .ab31-social-grid {
          display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:.8rem;
        }
        .ab31-social-card {
          display:flex; align-items:center; gap:.85rem; padding:1rem 1.1rem;
          text-decoration:none;
          transition:border-color .2s ease, transform .18s ease, box-shadow .2s ease;
        }
        .ab31-social-card:hover {
          border-color:var(--hc, var(--accent-primary));
          transform:translateY(-2px);
          box-shadow:0 6px 20px color-mix(in srgb, var(--hc, var(--accent-primary)) 15%, transparent);
        }
        .ab31-sc-icon-wrap {
          width:38px; height:38px; border-radius:var(--radius-md); flex-shrink:0;
          background:var(--bg-surface-2);
          display:flex; align-items:center; justify-content:center; font-size:.95rem;
          color:var(--text-secondary);
          transition:color .2s ease, background .2s ease;
        }
        .ab31-social-card:hover .ab31-sc-icon-wrap {
          color:var(--hc, var(--accent-primary));
          background:color-mix(in srgb, var(--hc, var(--accent-primary)) 10%, transparent);
        }
        .ab31-sc-info { flex:1; min-width:0; }
        .ab31-sc-label { font-size:.83rem; font-weight:700; color:var(--text-primary); }
        .ab31-sc-handle { font-size:.72rem; color:var(--text-tertiary); font-family:var(--font-mono); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ab31-sc-desc { font-size:.7rem; color:var(--text-tertiary); margin-top:.1rem; }
        .ab31-sc-arrow {
          font-size:.75rem; color:var(--text-tertiary); flex-shrink:0;
          transition:transform .2s ease, color .2s ease;
        }
        .ab31-social-card:hover .ab31-sc-arrow {
          transform:translateX(3px);
          color:var(--hc, var(--accent-primary));
        }

      `}</style>
    </>
  )
}
