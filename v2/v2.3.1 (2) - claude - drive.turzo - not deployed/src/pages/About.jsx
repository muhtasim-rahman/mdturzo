// About.jsx — v2.3.1
// CHANGES:
//   * Hero: right side hero-back.webp + same gradient as home hero; left minimal (copy-1 format); no badge, no scroll icon
//   * Layout: no extra top padding (Layout.jsx now excludes /about from pt-navbar)
//   * New "About Me Details" section after hero
//   * Education Timeline: alternating L-R on PC, left-aligned on mobile; scroll-animated center/left line
//   * Skills & Expertise: tabbed (Dev/Design/Video/Tools); animated progress bars; layout from copy-4
//   * Language Proficiency: flagcdn.com flags; animated bars
//   * Values & Personality: new minimal design; Hobbies inside
//   * Goals & Plans: copy-3 layout; click ripple effect; no progress bar
//   * Find Me Online: new social grid layout
//   * CTA: shared component (same as home)

import { useEffect, useRef, useState, useCallback } from 'react'
import { Link }               from 'react-router-dom'
import { Helmet }             from 'react-helmet-async'
import { motion, useInView }  from 'framer-motion'
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCode, faPalette, faVideo,
  faBrain, faHeart, faArrowRight, faQuoteLeft,
  faEnvelope, faGlobe, faUser, faMosque, faDumbbell, faBicycle,
  faBook, faCamera, faLaptopCode, faRocket, faFlag,
  faBullseye, faCalendar, faMapPin, faSeedling, faMountain,
  faHandshake, faShield, faMedal, faGears, faTerminal,
  faChevronRight, faLink, faExternalLinkAlt,
  faSchool, faTrophy, faWrench,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram,
  faTelegram, faYoutube, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'
import CTA from '../components/home/CTA.jsx'

// ── Animation presets ────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: [.16,1,.3,1] } },
}
const slideL = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0, transition: { duration: .55, ease: [.16,1,.3,1] } },
}
const slideR = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0, transition: { duration: .55, ease: [.16,1,.3,1] } },
}
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

// ── Data ─────────────────────────────────────────────────────

const EDUCATION = [
  { period:'2013–2014', school:'St. Geroza School, Saidpur',             level:'Nursery & KG',    desc:'First steps in formal education — curiosity and creativity began here.', icon: faSchool },
  { period:'2015–2017', school:'St. Geroza School, Saidpur',             level:'Class 1 – 3',     desc:'Primary years. Grew a love for reading and understanding how things work.', icon: faSchool },
  { period:'2018–2019', school:'Tulshiram Govt. Primary School, Saidpur',level:'Class 4 – 5',     desc:'Completed primary cycle. Science became a favourite subject.', icon: faSchool },
  { period:'2020',      school:'Lions School & College, Saidpur',         level:'Class 6*',        desc:'Brief enrollment before transitioning to SGSC.', icon: faGraduationCap },
  { period:'2021–2025', school:'Saidpur Govt. Science College (SGSC)',    level:'Class 6 – 10',   desc:'Science group. Deepened passion for computers and web development alongside academic studies.', icon: faGraduationCap },
  { period:'2026',      school:'Saidpur Govt. Science College (SGSC)',    level:'SSC-26 Batch',   desc:'SSC exams now completed (mid-2026). Next step: HSC then BSc in CSE.', icon: faTrophy, current: true },
  { period:'2026–2028', school:'To be determined',                        level:'HSC (Planned)',  desc:'Aiming for Higher Secondary Certificate in the Science group.', icon: faRocket, future: true },
  { period:'Future',    school:'Dream Institution',                        level:'BSc in CSE',     desc:'Long-term goal — Computer Science & Engineering degree to become a professional developer.', icon: faBullseye, future: true },
]

const DEV_SKILLS = [
  { name:'AI Tools & Workflows', pct:90, color:'#8B5CF6', note:'Daily use — coding, design, planning' },
  { name:'HTML',                 pct:80, color:'#E34F26', note:'Core structure, semantic markup'       },
  { name:'CSS',                  pct:80, color:'#1572B6', note:'Layouts, animations, responsive'       },
  { name:'Git & GitHub',         pct:78, color:'#F05032', note:'Version control, project hosting'      },
  { name:'Python',               pct:60, color:'#3776AB', note:'Learning stage, scripting'             },
  { name:'JavaScript',           pct:45, color:'#F7DF1E', note:'Improving — used in projects'          },
  { name:'Java',                 pct:35, color:'#007396', note:'Basic knowledge'                       },
]

const DESIGN_SKILLS = [
  { name:'Logo Design',         icon:faPalette,   color:'#EC4899' },
  { name:'Banner Design',       icon:faPalette,   color:'#8B5CF6' },
  { name:'Thumbnail Design',    icon:faCamera,    color:'#3B82F6' },
  { name:'Business Card Design',icon:faHandshake, color:'#10B981' },
  { name:'Poster Design',       icon:faGlobe,     color:'#F59E0B' },
  { name:'Album / Book Design', icon:faBook,      color:'#F97316' },
  { name:'HTML & CSS Design',   icon:faCode,      color:'#06B6D4' },
]

const VIDEO_SKILLS = [
  { name:'YouTube Videos',              color:'#EF4444' },
  { name:'Facebook Videos',             color:'#3B82F6' },
  { name:'Ads & Commercials',           color:'#F59E0B' },
  { name:'Short Videos (Reels/Shorts)', color:'#EC4899' },
  { name:'Basic Animation Videos',      color:'#8B5CF6' },
]

const TOOLS = [
  { name:'VS Code',           color:'#007ACC', icon:faTerminal  },
  { name:'GitHub',            color:'#94A3B8', icon:faGithub    },
  { name:'Firebase',          color:'#F59E0B', icon:faGears     },
  { name:'Google Sheets API', color:'#10B981', icon:faGlobe     },
  { name:'Browser DevTools',  color:'#06B6D4', icon:faCode      },
  { name:'Odoo Builder',      color:'#714B67', icon:faLaptopCode},
]

const LANGUAGES = [
  { lang:'Bengali', native:'বাংলা', level:'Native',         pct:100, color:'#3B82F6', flag:'bd' },
  { lang:'English',                 level:'Intermediate',   pct:65,  color:'#10B981', flag:'gb' },
  { lang:'Hindi',   native:'हिन्दी',level:'Conversational', pct:55,  color:'#F59E0B', flag:'in' },
  { lang:'Urdu',                    level:'Conversational', pct:45,  color:'#EC4899', flag:'pk' },
]

const VALUES = [
  { icon:faMosque,   color:'#10B981', title:'Islam First',          desc:'Faith guides every decision. Halal income and ethical work are non-negotiable priorities in all that I do.' },
  { icon:faDumbbell, color:'#3B82F6', title:'Discipline',           desc:'Structured routines and focused work sessions. I believe consistency beats bursts of motivation.' },
  { icon:faBrain,    color:'#8B5CF6', title:'Beneficial Knowledge', desc:'Only learning things with real, practical value — no wasted effort on knowledge that won\'t be used.' },
  { icon:faShield,   color:'#F59E0B', title:'Honesty',              desc:'Quality work speaks for itself. No shortcuts, no showing off — just genuine effort and transparency.' },
  { icon:faMedal,    color:'#EC4899', title:'Perfection',           desc:'I spend as much time as needed to get things exactly right. Mediocrity is never the goal.' },
  { icon:faHandshake,color:'#06B6D4', title:'Community',            desc:'Building technology that genuinely benefits the people around me and society at large.' },
]

const INTERESTS = [
  { icon:faMosque,   label:'Prayer (Salah)'    },
  { icon:faCode,     label:'Programming'        },
  { icon:faDumbbell, label:'Outdoor Games'      },
  { icon:faBicycle,  label:'Cycling'            },
  { icon:faMapPin,   label:'Travelling'         },
  { icon:faBook,     label:'Reading Books'      },
  { icon:faSeedling, label:'Learning new things'},
  { icon:faCamera,   label:'Editing'            },
]

const GOALS = [
  {
    period:'Short-Term', subtitle:'2026', color:'#3B82F6', icon:faFlag,
    items:[
      'Successfully complete SSC exams (SSC-26)',
      'Launch new portfolio — mdturzo.web.app',
      'Keep improving JavaScript & React skills',
      'Build more real-world portfolio projects',
    ],
  },
  {
    period:'Mid-Term', subtitle:'2026 – 2028', color:'#10B981', icon:faBullseye,
    items:[
      'Enroll in HSC with Science group',
      'Master full-stack web development',
      'Start freelancing — earning halal income',
      'Build real client projects',
    ],
  },
  {
    period:'Long-Term', subtitle:'Future', color:'#8B5CF6', icon:faMountain,
    items:[
      'Study BSc in Computer Science & Engineering',
      'Become a professional full-stack developer',
      'Establish an ethical, halal freelancing career',
      'Build beneficial technology for society',
    ],
  },
]

const SOCIALS = [
  { icon:faGithub,    label:'GitHub',    handle:'muhtasim-rahman', url:'https://github.com/muhtasim-rahman',        color:'#E2E8F0', bg:'#0D1117' },
  { icon:faLinkedin,  label:'LinkedIn',  handle:'mdturzo999',       url:'https://linkedin.com/in/mdturzo999',        color:'#0A66C2', bg:'#EEF4FF' },
  { icon:faFacebook,  label:'Facebook',  handle:'mdturzo999',       url:'https://facebook.com/mdturzo999',           color:'#1877F2', bg:'#EEF4FF' },
  { icon:faInstagram, label:'Instagram', handle:'mdturzo999',       url:'https://instagram.com/mdturzo999',          color:'#E1306C', bg:'#FFF0F5' },
  { icon:faYoutube,   label:'YouTube',   handle:'@mdturzo999',      url:'https://youtube.com/@mdturzo999',           color:'#FF0000', bg:'#FFF0F0' },
  { icon:faXTwitter,  label:'X (Twitter)',handle:'mdturzo999',      url:'https://twitter.com/mdturzo999',            color:'#0F0F0F', bg:'#F7F7F7' },
  { icon:faTelegram,  label:'Telegram',  handle:'mdturzo16',        url:'https://t.me/mdturzo16',                   color:'#26A5E4', bg:'#EFF8FF' },
  { icon:faTiktok,    label:'TikTok',    handle:'mdturzo16',        url:'https://tiktok.com/@mdturzo16',            color:'#010101', bg:'#F5F5F5' },
  { icon:faThreads,   label:'Threads',   handle:'mdturzo999',       url:'https://threads.net/mdturzo999',            color:'#000000', bg:'#F5F5F5' },
  { icon:faEnvelope,  label:'Email',     handle:'mdturzo.dev@gmail.com', url:'mailto:mdturzo.dev@gmail.com',         color:'#EA4335', bg:'#FFF0EE' },
]

// ── Section header ───────────────────────────────────────────
function SLabel({ badge, title, sub }) {
  return (
    <div className="ab-sec-hdr">
      {badge && <span className="ab-sec-badge">{badge}</span>}
      <h2 className="ab-sec-title">{title}</h2>
      {sub && <p className="ab-sec-sub">{sub}</p>}
    </div>
  )
}

// ── Animated Skill Bar ───────────────────────────────────────
function SkillBar({ name, pct, color, note, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 150)
    return () => clearTimeout(t)
  }, [inView, index])
  return (
    <div className="ab-sb-row">
      <div className="ab-sb-meta">
        <span className="ab-sb-name">{name}</span>
        <div className="ab-sb-right">
          {note && <span className="ab-sb-note">{note}</span>}
          <span className="ab-sb-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="ab-sb-track">
        <motion.div
          className="ab-sb-fill"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})`, boxShadow: `0 0 10px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: 0.85, ease: [.16,1,.3,1] }}
        />
      </div>
    </div>
  )
}

// ── Education Timeline Item ──────────────────────────────────
function TLItem({ item, index, isLeft, lineProgress }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={`ab-tl-row${isLeft ? ' ab-tl-left' : ' ab-tl-right'}`}
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [.16,1,.3,1], delay: 0.05 }}
    >
      {/* Card */}
      <div className={`ab-tl-card card${item.current ? ' ab-tl-current' : item.future ? ' ab-tl-future' : ''}`}>
        <div className="ab-tl-header">
          <div>
            <p className="ab-tl-school">{item.school}</p>
            <p className="ab-tl-level" style={{ color: item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--text-secondary)' }}>
              {item.level}
              {item.current && <span className="ab-tl-badge-cur">CURRENT</span>}
              {item.future && <span className="ab-tl-badge-fut">PLANNED</span>}
            </p>
          </div>
          <span className="ab-tl-period">{item.period}</span>
        </div>
        <p className="ab-tl-desc">{item.desc}</p>
      </div>
      {/* Center/Left dot */}
      <div className="ab-tl-dot" style={{
        borderColor: item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--border-strong)',
        background: item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--bg-page)',
        boxShadow: item.current ? '0 0 0 4px rgba(59,130,246,.2), 0 0 16px rgba(59,130,246,.4)' : item.future ? '0 0 0 4px rgba(139,92,246,.15)' : 'none',
      }}>
        <FontAwesomeIcon icon={item.icon} className="ab-tl-dot-icon" style={{ color: item.current || item.future ? '#fff' : 'var(--text-tertiary)' }} />
        {item.current && <span className="ab-tl-dot-pulse" />}
      </div>
    </motion.div>
  )
}

// ── Ripple click effect ──────────────────────────────────────
function RippleCard({ children, className, style }) {
  const [ripples, setRipples] = useState([])
  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    const id = Date.now()
    setRipples(r => [...r, { id, x, y }])
    setTimeout(() => setRipples(r => r.filter(ri => ri.id !== id)), 600)
  }, [])
  return (
    <div className={className} style={{ ...style, position: 'relative', overflow: 'hidden', cursor: 'default' }} onClick={handleClick}>
      {ripples.map(r => (
        <span key={r.id} className="ab-ripple" style={{ left: r.x, top: r.y }} />
      ))}
      {children}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function About() {
  const age = calculateAge()
  const { settings } = useSiteSettings()
  const [activeTab, setActiveTab]   = useState('dev')
  const skillsRef  = useRef(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })
  const timelineRef  = useRef(null)
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => { trackPage('About') }, [])

  // Scroll-driven timeline line fill
  useEffect(() => {
    const onScroll = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const vh   = window.innerHeight
      const prog = Math.max(0, Math.min(1, (vh * 0.7 - rect.top) / (rect.height * 0.85)))
      setLineProgress(prog)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc  = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh.`

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description"        content={seoDesc} />
        <meta property="og:title"       content={seoTitle} />
        <meta property="og:description" content={seoDesc}  />
        <meta property="og:url"         content={`${SITE_CONFIG.siteURL}/about`} />
        <meta property="og:image"       content={SITE_CONFIG.seo.defaultOGImage} />
        <link rel="canonical"           href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name:'Home', path:'/' }, { name:'About', path:'/about' }
        ]))}</script>
      </Helmet>

      <div className="ab-page">

        {/* ══ 1. HERO ═════════════════════════════════════════ */}
        <section className="ab-hero" aria-label="About hero">
          {/* bg orbs */}
          <div className="ab-h-orb ab-h-orb1" />
          <div className="ab-h-orb ab-h-orb2" />

          <div className="container-xl ab-hero-grid">
            {/* ── Left ── */}
            <motion.div className="ab-hero-left" initial="hidden" animate="show" variants={stagger(.09)}>
              {/* Breadcrumb */}
              <motion.nav variants={fadeUp} className="ab-bc">
                <Link to="/" className="ab-bc-link">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} className="ab-bc-sep" />
                <span className="ab-bc-cur">About</span>
              </motion.nav>

              {/* Name block */}
              <motion.div variants={fadeUp}>
                <p className="ab-h-eyebrow">Muhtasim Rahman · Turzo</p>
                <h1 className="ab-h-name">
                  Self-taught developer<br />
                  <span className="ab-h-name-accent">from Bangladesh</span>
                </h1>
              </motion.div>

              {/* Bio */}
              <motion.p variants={fadeUp} className="ab-h-bio">
                I'm a <strong>{age}-year-old</strong> student and self-taught web developer &amp; designer
                from Nilphamari, Bangladesh — building clean, fast, and meaningful digital experiences,
                always guided by <strong>Islamic &amp; ethical principles</strong>.
              </motion.p>

              {/* Quick facts */}
              <motion.div variants={fadeUp} className="ab-h-facts">
                {[
                  { icon:faLocationDot,  text:'Nilphamari, Bangladesh', color:'#3B82F6' },
                  { icon:faGraduationCap,text:'SSC-26 · SGSC',         color:'#10B981' },
                  { icon:faCalendar,     text:`Age ${age} · Muslim`,   color:'#F59E0B' },
                  { icon:faRocket,       text:'Goal: CSE Engineer',     color:'#8B5CF6' },
                ].map(({ icon, text, color }) => (
                  <div key={text} className="ab-h-fact">
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize:'.75rem' }} />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA + socials */}
              <motion.div variants={fadeUp} className="ab-h-cta-row">
                <Link to="/contact" className="ab-h-btn-primary">
                  <FontAwesomeIcon icon={faEnvelope} />
                  Get In Touch
                </Link>
                <Link to="/projects" className="ab-h-btn-sec">
                  <FontAwesomeIcon icon={faGlobe} />
                  View Projects
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="ab-h-socials">
                {[
                  { icon:faGithub,   href:SITE_CONFIG.social.github,   label:'GitHub'   },
                  { icon:faLinkedin, href:SITE_CONFIG.social.linkedin,  label:'LinkedIn' },
                  { icon:faFacebook, href:SITE_CONFIG.social.facebook,  label:'Facebook' },
                  { icon:faInstagram,href:SITE_CONFIG.social.instagram, label:'Instagram'},
                  { icon:faTelegram, href:SITE_CONFIG.social.telegram,  label:'Telegram' },
                  { icon:faEnvelope, href:`mailto:${SITE_CONFIG.owner.email}`, label:'Email' },
                ].map(({ icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    aria-label={label} className="ab-h-soc-btn">
                    <FontAwesomeIcon icon={icon} />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: hero-back.webp ── */}
            <motion.div
              className="ab-hero-right"
              initial={{ opacity:0, scale:.94, x:20 }}
              animate={{ opacity:1, scale:1, x:0 }}
              transition={{ duration:.75, ease:[.16,1,.3,1], delay:.15 }}>
              <div className="ab-h-imgbox">
                <div className="ab-h-imgglow" />
                <div className="ab-h-imgframe">
                  <img
                    src="/hero-back.webp"
                    alt="Muhtasim Rahman"
                    className="ab-h-img"
                    loading="eager"
                    fetchpriority="high"
                  />
                  <div className="ab-h-imggrad" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 2. ABOUT DETAILS ════════════════════════════════ */}
        <section className="section section-alt" id="about-details">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once:true, amount:.15 }} variants={stagger(.09)}>
              <motion.div variants={fadeUp}>
                <SLabel badge="My Story" title="Who Is Muhtasim?" sub="A passionate learner, builder, and believer — here's the full picture." />
              </motion.div>
            </motion.div>

            <div className="ab-details-grid">
              {/* Quote */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={slideL} className="ab-quote-card card">
                <FontAwesomeIcon icon={faQuoteLeft} className="ab-quote-icon" />
                <blockquote className="ab-quote-text">
                  "I possess a strong passion for programming and web development.
                  I adeptly blend technical expertise with a creative flair — aiming to develop
                  impactful websites that seamlessly combine functionality with captivating design,
                  while adhering to ethical and Halal principles in all my work."
                </blockquote>
                <div className="ab-quote-attr">
                  <div className="ab-quote-avatar">M</div>
                  <div>
                    <p className="ab-quote-name">Muhtasim Rahman</p>
                    <p className="ab-quote-date">Self-written bio, 2024</p>
                  </div>
                </div>
              </motion.div>

              {/* Story snippets */}
              <div className="ab-story-cards">
                {[
                  {
                    icon:faCode, color:'#3B82F6',
                    title:'How It Started',
                    text:'From childhood, Muhtasim was fascinated by technical things. Originally aiming to become an electrical engineer, a spark for computers shifted his path toward Computer Science & Engineering.',
                  },
                  {
                    icon:faBook, color:'#10B981',
                    title:'Self-Taught Journey',
                    text:'Primarily self-taught through YouTube and hands-on projects. Despite pausing formal study during SSC preparations, he never stopped building — from restaurant sites to PWA exam trackers.',
                  },
                  {
                    icon:faMosque, color:'#8B5CF6',
                    title:'Values-Driven Work',
                    text:'His Islamic ethical framework and perfectionist mindset define every project. He spends as much time as needed to get things right, and only accepts halal, beneficial work.',
                  },
                ].map(({ icon, color, title, text }, i) => (
                  <motion.div key={title}
                    initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:.5, delay: i*.1 }}
                    className="ab-story-item card">
                    <div className="ab-story-icon" style={{ background:`${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <div>
                      <p className="ab-story-title">{title}</p>
                      <p className="ab-story-text">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Experience stats */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fadeUp} className="ab-exp-row">
                {[
                  { val:'3+', label:'Years Web Dev',    color:'#3B82F6', icon:faCode    },
                  { val:'6+', label:'Years Design',     color:'#8B5CF6', icon:faPalette },
                  { val:'5+', label:'Years Video Edit', color:'#EC4899', icon:faVideo   },
                  { val:settings?.statsProjects ?? '16+', label:'Projects Built', color:'#10B981', icon:faRocket },
                ].map(({ val, label, color, icon }) => (
                  <div key={label} className="ab-exp-stat card">
                    <div className="ab-exp-icon" style={{ background:`${color}14`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <div className="ab-exp-val" style={{ color }}>{val}</div>
                    <div className="ab-exp-lbl">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 3. EDUCATION TIMELINE ═══════════════════════════ */}
        <section className="section" id="education">
          <div className="container-xl">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <SLabel badge="Academic Journey" title="Education Timeline" sub="From nursery to the dream of a CSE degree — the full story." />
            </motion.div>

            <div ref={timelineRef} className="ab-tl-wrap">
              {/* Animated center line (desktop) / left line (mobile) */}
              <div className="ab-tl-line-bg" />
              <div className="ab-tl-line-fill" style={{ height:`${lineProgress * 100}%` }} />

              {EDUCATION.map((item, i) => (
                <TLItem key={i} item={item} index={i} isLeft={i % 2 === 0} lineProgress={lineProgress} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. SKILLS & EXPERTISE ═══════════════════════════ */}
        <section className="section section-alt" id="skills">
          <div className="container-xl">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <SLabel badge="Skills" title="Skills & Expertise" sub="Programming, design, video, and the tools I work with every day." />
            </motion.div>

            {/* Tabs */}
            <div className="ab-tabs">
              {[
                { key:'dev',    label:'Programming', icon:faCode    },
                { key:'design', label:'Design',      icon:faPalette },
                { key:'video',  label:'Video',       icon:faVideo   },
                { key:'tools',  label:'Tools',       icon:faWrench  },
              ].map(t => (
                <button key={t.key} className={`ab-tab${activeTab === t.key ? ' ab-tab-active' : ''}`}
                  onClick={() => setActiveTab(t.key)}>
                  <FontAwesomeIcon icon={t.icon} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Dev */}
            {activeTab === 'dev' && (
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}
                className="ab-skill-dev-wrap" ref={skillsRef}>
                <div className="ab-skill-bars">
                  {DEV_SKILLS.map((s, i) => (
                    <SkillBar key={s.name} {...s} index={i} inView={skillsInView} />
                  ))}
                  <p className="ab-skill-note-txt">* Self-rated, April 2026. Actively improving JS and modern frameworks.</p>
                </div>
                <div className="ab-skill-info card">
                  <FontAwesomeIcon icon={faCode} className="ab-skill-info-icon" />
                  <p className="ab-skill-info-title">3+ Years Experience</p>
                  <p className="ab-skill-info-text">
                    Self-taught through YouTube and hands-on projects. SSC exams paused formal
                    study for ~2 years — now back with full focus on advancing to React, Node.js
                    and beyond.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Design */}
            {activeTab === 'design' && (
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}
                className="ab-skill-grid-wrap">
                <div className="ab-grid-skills">
                  {DESIGN_SKILLS.map(({ name, icon, color }) => (
                    <div key={name} className="ab-gs-item card">
                      <div className="ab-gs-icon" style={{ background:`${color}18`, color }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <span className="ab-gs-name">{name}</span>
                    </div>
                  ))}
                </div>
                <div className="ab-skill-info card">
                  <FontAwesomeIcon icon={faPalette} style={{ color:'#EC4899', fontSize:'1.25rem', marginBottom:'.5rem' }} />
                  <p className="ab-skill-info-title">6+ Years Experience</p>
                  <p className="ab-skill-info-text">
                    Logo, banner, thumbnail — designing since age 12.
                    Some commercial-grade work, all focused on clean and purposeful aesthetics.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Video */}
            {activeTab === 'video' && (
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}
                className="ab-skill-grid-wrap">
                <div className="ab-video-list">
                  {VIDEO_SKILLS.map(({ name, color }) => (
                    <div key={name} className="ab-video-item card">
                      <span className="ab-video-dot" style={{ background:color }} />
                      <span className="ab-video-name">{name}</span>
                    </div>
                  ))}
                </div>
                <div className="ab-skill-info card">
                  <FontAwesomeIcon icon={faVideo} style={{ color:'#A855F7', fontSize:'1.25rem', marginBottom:'.5rem' }} />
                  <p className="ab-skill-info-title">5+ Years Experience</p>
                  <p className="ab-skill-info-text">
                    YouTube, Facebook, Shorts, Reels — video editing has been a creative
                    outlet alongside web development since the early years.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tools */}
            {activeTab === 'tools' && (
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}
                className="ab-tools-grid">
                {TOOLS.map(({ name, color, icon }) => (
                  <div key={name} className="ab-tool-item card">
                    <div className="ab-tool-icon" style={{ background:`${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <span className="ab-tool-name">{name}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ══ 5. LANGUAGE PROFICIENCY ═════════════════════════ */}
        <section className="section" id="languages">
          <div className="container-xl">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <SLabel badge="Languages" title="Language Proficiency" sub="Bengali is my native tongue. English for professional work, Hindi & Urdu conversationally." />
            </motion.div>

            <div className="ab-lang-grid">
              {LANGUAGES.map(({ lang, native, level, pct, color, flag }, i) => (
                <motion.div key={lang}
                  initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.5, delay: i*.09 }}
                  className="ab-lang-item card">
                  {/* Flag */}
                  <img
                    src={`https://flagcdn.com/32x24/${flag}.png`}
                    srcSet={`https://flagcdn.com/64x48/${flag}.png 2x`}
                    width="32" height="24"
                    alt={`${lang} flag`}
                    className="ab-lang-flag"
                    loading="lazy"
                  />
                  <div className="ab-lang-content">
                    <div className="ab-lang-meta">
                      <div>
                        <span className="ab-lang-name">{lang}</span>
                        {native && <span className="ab-lang-native"> {native}</span>}
                      </div>
                      <span className="ab-lang-level" style={{ color, background:`${color}14` }}>{level}</span>
                    </div>
                    <div className="ab-lang-track">
                      <motion.div
                        className="ab-lang-fill"
                        style={{ background:`linear-gradient(90deg, ${color}aa, ${color})`, boxShadow:`0 0 8px ${color}44` }}
                        initial={{ width:0 }}
                        whileInView={{ width:`${pct}%` }}
                        viewport={{ once:true }}
                        transition={{ duration:1, ease:[.16,1,.3,1], delay: i*.1 + .2 }}
                      />
                    </div>
                    <span className="ab-lang-pct" style={{ color }}>{pct}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6. VALUES & PERSONALITY ═════════════════════════ */}
        <section className="section section-alt" id="values">
          <div className="container-xl">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <SLabel badge="Who I Am" title="Values & Personality" sub="What drives me, what I believe in, and how I approach life and work." />
            </motion.div>

            <div className="ab-values-grid">
              {VALUES.map(({ icon, color, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.5, delay: i*.07 }}
                  className="ab-val-card card">
                  <div className="ab-val-icon" style={{ background:`${color}14`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <h3 className="ab-val-title">{title}</h3>
                  <p className="ab-val-desc">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Hobbies */}
            <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.5, delay:.15 }}
              className="ab-hobbies">
              <p className="ab-hobbies-label">Hobbies & Interests</p>
              <div className="ab-hobbies-chips">
                {INTERESTS.map(({ icon, label }) => (
                  <div key={label} className="ab-hobby-chip card">
                    <FontAwesomeIcon icon={icon} style={{ color:'var(--accent-primary)', fontSize:'.8rem' }} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 7. GOALS & PLANS ════════════════════════════════ */}
        <section className="section" id="goals">
          <div className="container-xl">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <SLabel badge="Roadmap" title="Goals & Plans" sub="Where I'm headed — short, mid, and long-term ambitions." />
            </motion.div>

            <div className="ab-goals-grid">
              {GOALS.map(({ period, subtitle, color, icon, items }, gi) => (
                <RippleCard key={period}
                  className="ab-goal-card card"
                  style={{ '--goal-color': color }}>
                  <motion.div
                    initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:.5, delay: gi*.1 }}>
                    <div className="ab-goal-top" style={{ borderBottomColor:`${color}2a` }}>
                      <div className="ab-goal-icon" style={{ background:`${color}18`, color }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <div>
                        <p className="ab-goal-period" style={{ color }}>{period}</p>
                        <p className="ab-goal-sub">{subtitle}</p>
                      </div>
                    </div>
                    <ul className="ab-goal-list">
                      {items.map((item, ii) => (
                        <li key={ii} className="ab-goal-item">
                          <span className="ab-goal-bullet" style={{ background:color }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </RippleCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. FIND ME ONLINE ═══════════════════════════════ */}
        <section className="section section-alt" id="social">
          <div className="container-xl">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <SLabel badge="Online" title="Find Me Online" sub="Connect with me across platforms — I'm usually active on most of these." />
            </motion.div>

            <div className="ab-social-grid">
              {SOCIALS.map(({ icon, label, handle, url, color }, i) => (
                <motion.a key={label}
                  href={url} target="_blank" rel="noreferrer"
                  initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.45, delay: i * .055 }}
                  className="ab-soc-card card">
                  <div className="ab-soc-icon-wrap" style={{ '--soc-color': color }}>
                    <FontAwesomeIcon icon={icon} className="ab-soc-fa" style={{ color }} />
                  </div>
                  <div className="ab-soc-info">
                    <span className="ab-soc-label">{label}</span>
                    <span className="ab-soc-handle">{handle}</span>
                  </div>
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="ab-soc-ext" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 9. CTA (shared) ═════════════════════════════════ */}
        <CTA />
      </div>

      {/* ══ Styles ══════════════════════════════════════════════ */}
      <style>{`
        /* PAGE WRAPPER */
        .ab-page { overflow-x: hidden; }

        /* ── Section header ─────────────────────────────── */
        .ab-sec-hdr { text-align:center; margin-bottom:3rem; }
        .ab-sec-badge {
          display:inline-block; padding:.28rem .85rem;
          border-radius:9999px; margin-bottom:.75rem;
          background:var(--accent-light); color:var(--accent-primary);
          font-size:.7rem; font-weight:700; letter-spacing:.1em;
          text-transform:uppercase; font-family:var(--font-mono);
        }
        .ab-sec-title {
          font-family:var(--font-display); font-weight:800;
          font-size:clamp(1.6rem,3.5vw,2.4rem);
          color:var(--text-primary); line-height:1.18;
          margin-bottom:.6rem;
        }
        .ab-sec-sub {
          color:var(--text-secondary); font-size:.9rem;
          max-width:500px; margin:0 auto; line-height:1.72;
        }

        /* ── HERO ───────────────────────────────────────── */
        .ab-hero {
          position:relative;
          padding-top:calc(var(--navbar-h) + clamp(2.5rem,7vh,5rem));
          padding-bottom:clamp(3rem,7vh,5rem);
          overflow:hidden;
          background:var(--bg-page);
          min-height:100dvh;
          display:flex; align-items:center;
        }
        .ab-h-orb {
          position:absolute; border-radius:50%;
          filter:blur(90px); pointer-events:none; z-index:0;
        }
        .ab-h-orb1 {
          width:500px; height:500px;
          background:rgba(59,130,246,.07);
          top:-120px; left:-100px;
        }
        .ab-h-orb2 {
          width:380px; height:380px;
          background:rgba(139,92,246,.05);
          bottom:-80px; right:-60px;
        }
        .ab-hero-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:clamp(2rem,4vw,4rem);
          align-items:center;
          position:relative; z-index:2;
          width:100%;
        }
        @media(max-width:900px){
          .ab-hero { min-height:auto; padding-bottom:3rem; }
          .ab-hero-grid {
            grid-template-columns:1fr;
            gap:2rem;
          }
          .ab-hero-right { order:-1; }
        }

        /* Left */
        .ab-hero-left {
          display:flex; flex-direction:column; gap:1.25rem;
        }
        .ab-bc {
          display:flex; align-items:center; gap:.45rem;
          font-size:.75rem; color:var(--text-tertiary);
          font-family:var(--font-mono);
        }
        .ab-bc-link { color:var(--text-tertiary); text-decoration:none; transition:color .15s; }
        .ab-bc-link:hover { color:var(--accent-primary); }
        .ab-bc-sep { font-size:.5rem; opacity:.5; }
        .ab-bc-cur { color:var(--text-secondary); }

        .ab-h-eyebrow {
          font-size:.75rem; font-weight:600; text-transform:uppercase;
          letter-spacing:.1em; color:var(--accent-primary);
          font-family:var(--font-mono); margin-bottom:.35rem;
        }
        .ab-h-name {
          font-family:var(--font-display); font-weight:800;
          font-size:clamp(1.9rem,4.5vw,3rem);
          line-height:1.15; color:var(--text-primary);
        }
        .ab-h-name-accent { color:var(--accent-primary); }

        .ab-h-bio {
          font-size:.9375rem; color:var(--text-secondary);
          line-height:1.78; max-width:500px;
        }
        .ab-h-bio strong { color:var(--text-primary); font-weight:600; }

        .ab-h-facts { display:flex; flex-wrap:wrap; gap:.6rem; }
        .ab-h-fact {
          display:flex; align-items:center; gap:.45rem;
          font-size:.8rem; color:var(--text-secondary);
          background:var(--bg-surface); border:1px solid var(--border-color);
          padding:.38rem .85rem; border-radius:9999px;
          font-family:var(--font-mono);
        }

        .ab-h-cta-row { display:flex; flex-wrap:wrap; gap:.75rem; }
        .ab-h-btn-primary, .ab-h-btn-sec {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.62rem 1.35rem; border-radius:var(--radius-lg);
          font-size:.875rem; font-weight:600; text-decoration:none;
          transition:all .2s ease;
        }
        .ab-h-btn-primary {
          background:var(--accent-primary); color:#fff;
          border:1.5px solid var(--accent-primary);
          box-shadow:0 3px 14px rgba(37,99,235,.28);
        }
        .ab-h-btn-primary:hover {
          background:var(--accent-hover); box-shadow:0 6px 22px rgba(37,99,235,.4);
          transform:translateY(-1px);
        }
        .ab-h-btn-sec {
          background:transparent; color:var(--text-secondary);
          border:1.5px solid var(--border-strong);
        }
        .ab-h-btn-sec:hover {
          border-color:var(--accent-primary); color:var(--text-primary);
          background:var(--accent-light); transform:translateY(-1px);
        }

        .ab-h-socials { display:flex; flex-wrap:wrap; gap:.5rem; }
        .ab-h-soc-btn {
          width:36px; height:36px; display:flex; align-items:center; justify-content:center;
          border-radius:var(--radius-md); background:var(--bg-surface);
          border:1px solid var(--border-color); color:var(--text-secondary);
          font-size:.85rem; text-decoration:none; transition:all .18s ease;
        }
        .ab-h-soc-btn:hover {
          color:var(--accent-primary); border-color:var(--accent-primary);
          background:var(--accent-light); transform:translateY(-2px);
        }

        /* Right image */
        .ab-hero-right { display:flex; justify-content:flex-end; }
        @media(max-width:900px){
          .ab-hero-right { justify-content:center; }
        }
        .ab-h-imgbox {
          position:relative;
          width:clamp(280px,32vw,440px);
          height:clamp(360px,40vw,580px);
          flex-shrink:0;
        }
        @media(max-width:900px){
          .ab-h-imgbox {
            width:clamp(220px,70vw,340px);
            height:clamp(280px,50vw,420px);
          }
        }
        .ab-h-imgglow {
          position:absolute; inset:10% 12%; z-index:0;
          border-radius:20px;
          background:radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.18) 0%, transparent 70%);
          filter:blur(28px); pointer-events:none;
          animation:ab-glow-p 4.5s ease-in-out infinite;
        }
        @keyframes ab-glow-p{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        .ab-h-imgframe {
          position:relative; z-index:1;
          width:100%; height:100%; overflow:hidden;
        }
        @media(max-width:900px){
          /* No rounded frame on mobile/tablet — just show image naturally */
          .ab-h-imgframe { border-radius:0 !important; background:transparent !important; }
        }
        .ab-h-img {
          width:100%; height:100%;
          object-fit:cover; object-position:center top;
          display:block;
        }
        /* Same gradient as home hero image */
        .ab-h-imggrad {
          position:absolute; z-index:2; pointer-events:none;
          bottom:-5px; left:-1px; right:-1px; height:calc(40% + 5px);
          background:linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 6%, rgba(2,6,23,.7) 32%, transparent 100%);
        }
        [data-theme=light] .ab-h-imggrad {
          background:linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 5%, rgba(240,244,248,.8) 30%, transparent 100%);
        }

        /* ── ABOUT DETAILS ──────────────────────────────── */
        .ab-details-grid {
          display:grid;
          grid-template-columns:1fr;
          gap:2rem;
        }
        @media(min-width:900px){
          .ab-details-grid { grid-template-columns:1fr 1fr; gap:2.5rem; }
        }
        .ab-quote-card {
          padding:2rem;
          background:linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          border-color:rgba(59,130,246,.18);
        }
        .ab-quote-icon {
          font-size:1.6rem; color:var(--accent-primary);
          opacity:.25; display:block; margin-bottom:.75rem;
        }
        .ab-quote-text {
          font-size:.9rem; color:var(--text-secondary);
          line-height:1.8; font-style:italic; margin-bottom:1.25rem;
        }
        .ab-quote-attr {
          display:flex; align-items:center; gap:.75rem;
        }
        .ab-quote-avatar {
          width:36px; height:36px; border-radius:50%;
          background:var(--accent-light); color:var(--accent-primary);
          display:flex; align-items:center; justify-content:center;
          font-weight:700; font-size:.9rem; flex-shrink:0;
        }
        .ab-quote-name { font-size:.85rem; font-weight:700; color:var(--text-primary); }
        .ab-quote-date { font-size:.72rem; color:var(--text-tertiary); margin-top:.1rem; }

        .ab-story-cards { display:flex; flex-direction:column; gap:1rem; }
        .ab-story-item { display:flex; gap:1rem; align-items:flex-start; padding:1.1rem 1.25rem; }
        .ab-story-icon {
          width:36px; height:36px; border-radius:var(--radius-md);
          display:flex; align-items:center; justify-content:center;
          font-size:.875rem; flex-shrink:0;
        }
        .ab-story-title { font-size:.88rem; font-weight:700; color:var(--text-primary); margin-bottom:.3rem; }
        .ab-story-text  { font-size:.8rem;  color:var(--text-secondary); line-height:1.65; }

        /* Exp stats — spans both columns */
        .ab-exp-row {
          grid-column: 1 / -1;
          display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
        }
        @media(max-width:640px){
          .ab-exp-row { grid-template-columns:repeat(2,1fr); }
        }
        .ab-exp-stat {
          padding:1.5rem 1rem; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:.6rem;
        }
        .ab-exp-icon {
          width:44px; height:44px; border-radius:var(--radius-lg);
          display:flex; align-items:center; justify-content:center; font-size:1rem;
        }
        .ab-exp-val { font-family:var(--font-display); font-size:2.2rem; font-weight:800; line-height:1; }
        .ab-exp-lbl { font-size:.75rem; color:var(--text-secondary); font-weight:500; }

        /* ── EDUCATION TIMELINE ─────────────────────────── */
        .ab-tl-wrap {
          position:relative;
          max-width:860px; margin:0 auto;
          padding:1rem 0 2rem;
        }

        /* Desktop: center line | Mobile: left line */
        .ab-tl-line-bg, .ab-tl-line-fill {
          position:absolute; z-index:0; pointer-events:none;
          left:50%; transform:translateX(-50%);
          width:2px; top:0;
        }
        .ab-tl-line-bg {
          bottom:0;
          background:var(--border-color);
        }
        .ab-tl-line-fill {
          background:linear-gradient(180deg, var(--accent-primary), #8B5CF6);
          transition:height .05s linear;
          border-radius:9999px;
        }
        @media(max-width:720px){
          .ab-tl-line-bg, .ab-tl-line-fill {
            left:20px; transform:none;
          }
        }

        /* Row */
        .ab-tl-row {
          display:grid;
          align-items:center;
          margin-bottom:2rem;
          position:relative;
          z-index:1;
        }
        /* Desktop: 3-col [card | dot | card] */
        .ab-tl-left {
          grid-template-columns:1fr 52px 1fr;
        }
        .ab-tl-right {
          grid-template-columns:1fr 52px 1fr;
        }
        @media(max-width:720px){
          .ab-tl-left, .ab-tl-right {
            grid-template-columns:52px 1fr;
          }
        }

        /* Card placement */
        /* Left items: card in col-1, dot in col-2, empty in col-3 */
        .ab-tl-left .ab-tl-card  { order:0; }
        .ab-tl-left .ab-tl-dot   { order:1; justify-self:center; }
        /* Right items: empty in col-1, dot in col-2, card in col-3 */
        .ab-tl-right .ab-tl-dot  { order:0; justify-self:center; }
        .ab-tl-right .ab-tl-card { order:1; }

        @media(max-width:720px){
          .ab-tl-left .ab-tl-dot, .ab-tl-right .ab-tl-dot {
            order:0; justify-self:center;
          }
          .ab-tl-left .ab-tl-card, .ab-tl-right .ab-tl-card {
            order:1;
          }
        }

        .ab-tl-card {
          padding:1rem 1.25rem;
        }
        .ab-tl-current {
          background:linear-gradient(135deg, rgba(59,130,246,.06), rgba(99,102,241,.03)) !important;
          border-color:rgba(59,130,246,.3) !important;
        }
        .ab-tl-future {
          background:rgba(139,92,246,.04) !important;
          border-color:rgba(139,92,246,.2) !important;
        }
        .ab-tl-header {
          display:flex; justify-content:space-between; align-items:flex-start;
          gap:.5rem; margin-bottom:.5rem; flex-wrap:wrap;
        }
        .ab-tl-school { font-size:.9rem; font-weight:700; color:var(--text-primary); margin-bottom:.2rem; }
        .ab-tl-level  { font-size:.8rem; font-weight:600; display:flex; align-items:center; gap:.4rem; flex-wrap:wrap; }
        .ab-tl-period {
          font-size:.7rem; color:var(--text-tertiary);
          background:var(--bg-surface-2); padding:.18rem .55rem;
          border-radius:9999px; white-space:nowrap; flex-shrink:0;
          font-family:var(--font-mono);
        }
        .ab-tl-desc { font-size:.8rem; color:var(--text-secondary); line-height:1.65; }
        .ab-tl-badge-cur {
          font-size:.6rem; background:rgba(59,130,246,.12); color:var(--accent-primary);
          padding:.1rem .45rem; border-radius:9999px; font-family:var(--font-mono); font-weight:700; letter-spacing:.04em;
        }
        .ab-tl-badge-fut {
          font-size:.6rem; background:rgba(139,92,246,.12); color:#8B5CF6;
          padding:.1rem .45rem; border-radius:9999px; font-family:var(--font-mono); font-weight:700; letter-spacing:.04em;
        }

        .ab-tl-dot {
          width:44px; height:44px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          border:2px solid; position:relative; flex-shrink:0;
          transition:box-shadow .3s;
        }
        .ab-tl-dot-icon { font-size:.75rem; position:relative; z-index:1; }
        .ab-tl-dot-pulse {
          position:absolute; inset:-4px; border-radius:50%;
          border:2px solid var(--accent-primary);
          animation:ab-tl-pulse 1.6s ease-in-out infinite;
        }
        @keyframes ab-tl-pulse{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:.2;transform:scale(1.3)}}

        /* ── SKILLS ─────────────────────────────────────── */
        .ab-tabs {
          display:flex; flex-wrap:wrap; gap:.5rem;
          margin-bottom:2rem;
          background:var(--bg-surface);
          border:1px solid var(--border-color);
          padding:.35rem; border-radius:var(--radius-xl);
          width:fit-content;
        }
        .ab-tab {
          display:flex; align-items:center; gap:.5rem;
          padding:.5rem 1.1rem; border-radius:var(--radius-lg);
          font-size:.82rem; font-weight:500;
          color:var(--text-secondary); cursor:pointer;
          transition:all var(--transition-fast);
          background:transparent; border:none;
        }
        .ab-tab:hover { color:var(--text-primary); }
        .ab-tab-active {
          background:var(--bg-surface-2);
          color:var(--accent-primary);
          box-shadow:var(--shadow-sm);
        }

        .ab-skill-dev-wrap {
          display:grid; grid-template-columns:1fr;
          gap:2rem;
        }
        @media(min-width:768px){ .ab-skill-dev-wrap { grid-template-columns:1fr 280px; } }
        .ab-skill-bars { display:flex; flex-direction:column; gap:1rem; }

        .ab-sb-row {}
        .ab-sb-meta {
          display:flex; justify-content:space-between; align-items:center;
          margin-bottom:.4rem;
        }
        .ab-sb-name  { font-size:.875rem; font-weight:500; color:var(--text-primary); }
        .ab-sb-right { display:flex; align-items:center; gap:.75rem; }
        .ab-sb-note  { font-size:.7rem; color:var(--text-tertiary); }
        .ab-sb-pct   { font-size:.8rem; font-weight:600; font-family:var(--font-mono); }
        .ab-sb-track {
          height:7px; background:var(--bg-surface-2);
          border-radius:9999px; overflow:hidden;
        }
        .ab-sb-fill  { height:100%; border-radius:9999px; }
        .ab-skill-note-txt {
          font-size:.75rem; color:var(--text-tertiary);
          font-style:italic; line-height:1.6; margin-top:.5rem;
        }

        .ab-skill-info {
          padding:1.5rem; display:flex; flex-direction:column; gap:.4rem;
          background:linear-gradient(135deg,rgba(59,130,246,.04),rgba(99,102,241,.02));
          border-color:rgba(59,130,246,.18); align-self:start;
        }
        .ab-skill-info-icon { font-size:1.2rem; color:var(--accent-primary); margin-bottom:.35rem; }
        .ab-skill-info-title { font-size:.88rem; font-weight:700; color:var(--text-primary); }
        .ab-skill-info-text  { font-size:.78rem; color:var(--text-secondary); line-height:1.65; }

        .ab-skill-grid-wrap {
          display:grid; grid-template-columns:1fr;
          gap:2rem;
        }
        @media(min-width:768px){ .ab-skill-grid-wrap { grid-template-columns:1fr 280px; } }

        .ab-grid-skills {
          display:grid; grid-template-columns:repeat(2,1fr); gap:.75rem;
        }
        @media(min-width:540px){ .ab-grid-skills { grid-template-columns:repeat(3,1fr); } }
        .ab-gs-item {
          display:flex; align-items:center; gap:.75rem; padding:.85rem 1rem;
        }
        .ab-gs-icon {
          width:32px; height:32px; border-radius:var(--radius-md);
          display:flex; align-items:center; justify-content:center;
          font-size:.8rem; flex-shrink:0;
        }
        .ab-gs-name { font-size:.82rem; font-weight:500; color:var(--text-primary); }

        .ab-video-list { display:flex; flex-direction:column; gap:.75rem; }
        .ab-video-item {
          display:flex; align-items:center; gap:.75rem;
          padding:.85rem 1rem; font-size:.875rem; color:var(--text-primary); font-weight:500;
        }
        .ab-video-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .ab-video-name {}

        .ab-tools-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:.75rem;
        }
        @media(min-width:480px){ .ab-tools-grid { grid-template-columns:repeat(3,1fr); } }
        @media(min-width:768px){ .ab-tools-grid { grid-template-columns:repeat(4,1fr) } }
        .ab-tool-item {
          display:flex; flex-direction:column; align-items:center;
          gap:.6rem; padding:1.1rem .75rem; text-align:center;
        }
        .ab-tool-icon {
          width:40px; height:40px; border-radius:var(--radius-lg);
          display:flex; align-items:center; justify-content:center; font-size:.9rem;
        }
        .ab-tool-name { font-size:.75rem; font-weight:500; color:var(--text-secondary); }

        /* ── LANGUAGES ──────────────────────────────────── */
        .ab-lang-grid {
          display:grid; grid-template-columns:1fr; gap:1rem;
          max-width:720px; margin:0 auto;
        }
        @media(min-width:640px){ .ab-lang-grid { grid-template-columns:repeat(2,1fr); } }

        .ab-lang-item {
          padding:1.25rem 1.5rem;
          display:flex; align-items:center; gap:1.25rem;
        }
        .ab-lang-flag {
          border-radius:3px; flex-shrink:0;
          box-shadow:0 1px 4px rgba(0,0,0,.15);
          object-fit:cover;
        }
        .ab-lang-content { flex:1; min-width:0; }
        .ab-lang-meta {
          display:flex; justify-content:space-between; align-items:center;
          margin-bottom:.55rem; gap:.5rem;
        }
        .ab-lang-name   { font-size:.9rem; font-weight:700; color:var(--text-primary); }
        .ab-lang-native { font-size:.8rem; color:var(--text-tertiary); }
        .ab-lang-level  {
          font-size:.7rem; font-weight:600; padding:.18rem .6rem;
          border-radius:9999px; font-family:var(--font-mono); white-space:nowrap;
        }
        .ab-lang-track {
          height:7px; background:var(--bg-surface-2);
          border-radius:9999px; overflow:hidden; margin-bottom:.35rem;
        }
        .ab-lang-fill { height:100%; border-radius:9999px; }
        .ab-lang-pct { font-size:.7rem; color:var(--text-tertiary); font-family:var(--font-mono); }

        /* ── VALUES ─────────────────────────────────────── */
        .ab-values-grid {
          display:grid; grid-template-columns:1fr; gap:1rem;
          margin-bottom:2.5rem;
        }
        @media(min-width:540px){ .ab-values-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:900px){ .ab-values-grid { grid-template-columns:repeat(3,1fr); } }
        .ab-val-card { padding:1.5rem; display:flex; flex-direction:column; gap:.7rem; }
        .ab-val-icon {
          width:44px; height:44px; border-radius:var(--radius-xl);
          display:flex; align-items:center; justify-content:center; font-size:1rem;
        }
        .ab-val-title { font-size:.95rem; font-weight:700; color:var(--text-primary); }
        .ab-val-desc  { font-size:.82rem; color:var(--text-secondary); line-height:1.65; }

        .ab-hobbies { }
        .ab-hobbies-label {
          text-align:center; font-size:.75rem; text-transform:uppercase;
          letter-spacing:.1em; color:var(--text-tertiary); font-weight:600;
          margin-bottom:1rem; font-family:var(--font-mono);
        }
        .ab-hobbies-chips {
          display:flex; flex-wrap:wrap; gap:.6rem; justify-content:center;
        }
        .ab-hobby-chip {
          display:flex; align-items:center; gap:.5rem;
          font-size:.82rem; color:var(--text-secondary);
          padding:.42rem 1rem; border-radius:9999px;
        }

        /* ── GOALS ──────────────────────────────────────── */
        .ab-goals-grid {
          display:grid; grid-template-columns:1fr; gap:1.25rem;
        }
        @media(min-width:700px){ .ab-goals-grid { grid-template-columns:repeat(3,1fr); } }
        .ab-goal-card { padding:1.5rem; }
        .ab-goal-card:hover { border-color: var(--goal-color, var(--accent-primary)); }
        .ab-goal-top {
          display:flex; align-items:center; gap:1rem;
          padding-bottom:1rem; margin-bottom:1rem;
          border-bottom:1px solid;
        }
        .ab-goal-icon {
          width:40px; height:40px; border-radius:var(--radius-lg);
          display:flex; align-items:center; justify-content:center;
          font-size:.875rem; flex-shrink:0;
        }
        .ab-goal-period { font-size:.9rem; font-weight:700; line-height:1.2; }
        .ab-goal-sub    { font-size:.73rem; color:var(--text-tertiary); margin-top:.15rem; font-family:var(--font-mono); }
        .ab-goal-list   { display:flex; flex-direction:column; gap:.65rem; }
        .ab-goal-item {
          display:flex; align-items:flex-start; gap:.75rem;
          font-size:.82rem; color:var(--text-secondary); line-height:1.55;
        }
        .ab-goal-bullet {
          width:6px; height:6px; border-radius:50%;
          margin-top:.42rem; flex-shrink:0;
        }
        /* Ripple effect */
        .ab-ripple {
          position:absolute; border-radius:50%;
          width:12px; height:12px; margin-left:-6px; margin-top:-6px;
          background:rgba(255,255,255,.18);
          animation:ab-ripple-a .6s ease-out forwards;
          pointer-events:none;
        }
        @keyframes ab-ripple-a {
          0%   { transform:scale(0); opacity:.5; }
          100% { transform:scale(22); opacity:0; }
        }

        /* ── FIND ME ONLINE ─────────────────────────────── */
        .ab-social-grid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:.85rem;
        }
        @media(min-width:480px){ .ab-social-grid { grid-template-columns:repeat(3,1fr); } }
        @media(min-width:768px){ .ab-social-grid { grid-template-columns:repeat(4,1fr); } }
        @media(min-width:1024px){ .ab-social-grid { grid-template-columns:repeat(5,1fr); } }

        .ab-soc-card {
          display:flex; align-items:center; gap:.85rem;
          padding:.95rem 1.1rem;
          text-decoration:none;
          transition:all .22s ease;
          position:relative; overflow:hidden;
        }
        .ab-soc-card:hover {
          border-color:var(--accent-primary);
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(59,130,246,.12);
        }
        .ab-soc-card:hover .ab-soc-ext { opacity:1; transform:translate(0,0); }
        .ab-soc-card:active { transform:scale(.97); }

        .ab-soc-icon-wrap {
          width:36px; height:36px; border-radius:var(--radius-md);
          background:var(--bg-surface-2);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; transition:background .2s;
        }
        .ab-soc-card:hover .ab-soc-icon-wrap {
          background:color-mix(in srgb, var(--soc-color, #3B82F6) 15%, transparent);
        }
        .ab-soc-fa { font-size:1rem; }
        .ab-soc-info {
          display:flex; flex-direction:column; gap:.1rem; min-width:0;
        }
        .ab-soc-label  { font-size:.82rem; font-weight:600; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ab-soc-handle { font-size:.7rem; color:var(--text-tertiary); font-family:var(--font-mono); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ab-soc-ext {
          margin-left:auto; font-size:.65rem; color:var(--text-tertiary);
          opacity:0; transform:translate(-4px,-4px);
          transition:all .2s ease; flex-shrink:0;
        }

        /* ── Responsive misc ────────────────────────────── */
        @media(max-width:480px){
          .ab-h-bio { max-width:100%; }
          .ab-details-grid { grid-template-columns:1fr !important; }
          .ab-exp-row { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}
