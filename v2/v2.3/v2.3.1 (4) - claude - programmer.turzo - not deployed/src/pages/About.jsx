// ============================================================
// About.jsx — v2.3.1
// Complete redesign per spec:
//   1. Hero       — minimal, hero-back.webp right, copy-1 left (70%)
//   2. Info       — new descriptive personal details section
//   3. Timeline   — center PC / left mobile, scroll-animated line
//   4. Skills     — tabbed, home-style animated bars, copy-4 layout
//   5. Languages  — flags + animated bars
//   6. Values     — minimal cards + hobbies chips inside
//   7. Goals      — copy-3 layout, click effect, no progress bar
//   8. Online     — new social grid layout
//   9. [SiteCTA]  — shared component
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { Link }              from 'react-router-dom'
import { Helmet }            from 'react-helmet-async'
import {
  motion, useInView, useScroll, useTransform, AnimatePresence,
} from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faMosque, faEnvelope,
  faCode, faPalette, faVideo, faBrain, faGears, faTerminal,
  faSeedling, faMapPin, faBicycle, faBook, faCamera,
  faShield, faMedal, faDumbbell, faCalendar, faUser,
  faFlag, faBullseye, faRocket, faMountain,
  faArrowRight, faGlobe, faHandshake, faQuoteLeft,
  faChevronRight, faCircleCheck, faChartLine, faClock,
  faSchool, faTrophy, faFlask, faAtom,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram,
  faYoutube, faTelegram, faTiktok, faXTwitter, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import SiteCTA from '../components/shared/SiteCTA.jsx'

// ── Animation helpers ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity:0, y:26 },
  show:   { opacity:1, y:0, transition:{ duration:.55, ease:[.16,1,.3,1] } },
}
const stagger = (d=.09) => ({ hidden:{}, show:{ transition:{ staggerChildren:d } } })

// ── DATA ──────────────────────────────────────────────────────

const EDUCATION = [
  { name:'St. Geroza School, Saidpur', period:'2013 – 2017', classes:'Nursery, KG & Class 1–3', icon:faSchool,        color:'#3B82F6', tag:'Primary'   },
  { name:'Tulshiram Govt. Primary School', period:'2018 – 2019', classes:'Class 4 & 5',          icon:faBook,          color:'#10B981', tag:'Primary'   },
  { name:'Lions School & College, Saidpur', period:'2020', classes:'Class 6',                     icon:faGraduationCap, color:'#F59E0B', tag:'Secondary' },
  { name:'Saidpur Govt. Science College (SGSC)', period:'2021 – 2025', classes:'Class 6–10',      icon:faFlask,         color:'#8B5CF6', tag:'Secondary', mapUrl:'https://maps.app.goo.gl/WMJtoRosby2itppW6' },
  { name:'Saidpur Govt. Science College (SGSC)', period:'mid-2026', classes:'SSC-26 Batch',        icon:faTrophy,        color:'#F59E0B', tag:'Current', current:true, mapUrl:'https://maps.app.goo.gl/WMJtoRosby2itppW6' },
  { name:'Higher Secondary (HSC)',  period:'Upcoming', classes:'After SSC result (Science)',       icon:faChartLine,     color:'#06B6D4', tag:'Upcoming', upcoming:true },
  { name:'BSc in Computer Science & Engineering', period:'Long-term', classes:'Dream & Goal',      icon:faAtom,          color:'#22C55E', tag:'Dream',    upcoming:true },
]

const DEV_SKILLS = [
  { name:'AI Tools',   pct:90, color:'#10B981', note:'Daily use — coding, design, planning' },
  { name:'HTML',       pct:80, color:'#F97316', note:'Core structure, semantic markup'     },
  { name:'CSS',        pct:80, color:'#3B82F6', note:'Layouts, animations, responsive'    },
  { name:'Git & GitHub', pct:78, color:'#64748B', note:'Version control, project hosting' },
  { name:'Python',     pct:60, color:'#EAB308', note:'Learning stage, scripting'          },
  { name:'JavaScript', pct:45, color:'#F59E0B', note:'Improving — used in projects'       },
  { name:'Java',       pct:35, color:'#EC4899', note:'Basic knowledge'                    },
]

const DESIGN_SKILLS = [
  { name:'Logo Design',          icon:faPalette,  color:'#EC4899' },
  { name:'Banner Design',        icon:faPalette,  color:'#8B5CF6' },
  { name:'Thumbnail Design',     icon:faCamera,   color:'#3B82F6' },
  { name:'Business Card Design', icon:faHandshake,color:'#10B981' },
  { name:'Poster Design',        icon:faGlobe,    color:'#F59E0B' },
  { name:'Album / Book Design',  icon:faBook,     color:'#F97316' },
  { name:'HTML & CSS Design',    icon:faCode,     color:'#06B6D4' },
]

const VIDEO_SKILLS = [
  { name:'YouTube Videos',                color:'#EF4444' },
  { name:'Facebook Videos',               color:'#3B82F6' },
  { name:'Ads & Commercials',             color:'#F59E0B' },
  { name:'Short Videos (Reels / Shorts)', color:'#EC4899' },
  { name:'Basic Animation Videos',        color:'#8B5CF6' },
]

const TOOLS = [
  { name:'VS Code',           color:'#007ACC', icon:faTerminal },
  { name:'GitHub',            color:'#94A3B8', icon:faGithub   },
  { name:'Firebase',          color:'#F59E0B', icon:faGears    },
  { name:'Google Sheets API', color:'#10B981', icon:faGlobe    },
  { name:'Browser DevTools',  color:'#06B6D4', icon:faCode     },
  { name:'Adobe Suite',       color:'#EC4899', icon:faPalette  },
  { name:'Figma',             color:'#A855F7', icon:faPalette  },
  { name:'Tailwind CSS',      color:'#38BDF8', icon:faCode     },
]

const LANGUAGES = [
  { lang:'Bengali (বাংলা)', level:'Native',         pct:100, color:'#3B82F6', flag:'bd', country:'Bangladesh' },
  { lang:'English',          level:'Intermediate',   pct:65,  color:'#10B981', flag:'gb', country:'UK / Global' },
  { lang:'Hindi (हिन्दी)',  level:'Conversational', pct:55,  color:'#F59E0B', flag:'in', country:'India'     },
  { lang:'Urdu',             level:'Conversational', pct:45,  color:'#EC4899', flag:'pk', country:'Pakistan'  },
]

const VALUES = [
  { icon:faMosque,   color:'#10B981', title:'Islam First',         desc:'Faith guides every decision — halal income and ethical work, always.' },
  { icon:faDumbbell, color:'#3B82F6', title:'Discipline',          desc:'Structured routines, focused work, and consistent daily effort.'     },
  { icon:faBrain,    color:'#8B5CF6', title:'Useful Knowledge',    desc:'Only learning things with real practical value — no wasted effort.'   },
  { icon:faShield,   color:'#F59E0B', title:'Honesty',             desc:'Quality work speaks for itself. No shortcuts, no showing off.'        },
  { icon:faMedal,    color:'#EC4899', title:'Perfection',          desc:'Spending whatever time it takes to get things exactly right.'         },
]

const HOBBIES = [
  { icon:faMosque,   label:'Prayer (Salah)'  },
  { icon:faCode,     label:'Programming'     },
  { icon:faDumbbell, label:'Outdoor Games'   },
  { icon:faBicycle,  label:'Cycling'         },
  { icon:faMapPin,   label:'Travelling'      },
  { icon:faBook,     label:'Reading Books'   },
  { icon:faSeedling, label:'Learning'        },
  { icon:faCamera,   label:'Editing'         },
]

const GOALS = [
  {
    period:'Short-Term', timeframe:'2026', color:'#3B82F6', icon:faClock,
    items:['Complete SSC exam (SSC-26 Batch)','Launch portfolio: mdturzo.web.app','Improve JavaScript extensively','Build more real-world projects'],
  },
  {
    period:'Mid-Term', timeframe:'2026 – 2028', color:'#10B981', icon:faBullseye,
    items:['Enroll in HSC — Science group','Master full-stack web development','Start freelancing (halal, ethical clients)','Build client projects & earn halal income'],
  },
  {
    period:'Long-Term', timeframe:'Future', color:'#8B5CF6', icon:faMountain,
    items:['BSc in Computer Science & Engineering','Become professional full-stack developer','Build sustainable ethical freelancing career','Create beneficial technology for society'],
  },
]

const SOCIALS_ONLINE = [
  { name:'GitHub',    icon:faGithub,    href:SITE_CONFIG.social.github,    handle:'muhtasim-rahman', color:'#94A3B8', accent:'#e5e7eb' },
  { name:'LinkedIn',  icon:faLinkedin,  href:SITE_CONFIG.social.linkedin,  handle:'mdturzo999',      color:'#0A66C2', accent:'#dbeafe' },
  { name:'Facebook',  icon:faFacebook,  href:SITE_CONFIG.social.facebook,  handle:'mdturzo999',      color:'#1877F2', accent:'#dbeafe' },
  { name:'Instagram', icon:faInstagram, href:SITE_CONFIG.social.instagram, handle:'mdturzo999',      color:'#E1306C', accent:'#fce7f3' },
  { name:'YouTube',   icon:faYoutube,   href:SITE_CONFIG.social.youtube,   handle:'@mdturzo999',     color:'#FF0000', accent:'#fee2e2' },
  { name:'X / Twitter',icon:faXTwitter, href:SITE_CONFIG.social.twitter,   handle:'@mdturzo999',     color:'#94A3B8', accent:'#f1f5f9' },
  { name:'Telegram',  icon:faTelegram,  href:SITE_CONFIG.social.telegram,  handle:'@mdturzo16',      color:'#26A5E4', accent:'#e0f2fe' },
  { name:'TikTok',    icon:faTiktok,    href:SITE_CONFIG.social.tiktok,    handle:'@mdturzo16',      color:'#EE1D52', accent:'#ffe4e6' },
  { name:'Threads',   icon:faThreads,   href:SITE_CONFIG.social.threads,   handle:'@mdturzo999',     color:'#64748B', accent:'#f1f5f9' },
  { name:'Email',     icon:faEnvelope,  href:`mailto:${SITE_CONFIG.owner.email}`, handle:'mdturzo.dev@gmail.com', color:'#EA4335', accent:'#fee2e2' },
]

// ── SkillBar — for tabbed skills section ─────────────────────
function SkillBar({ name, pct, color, note, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 150)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div className="ab-sbar-row">
      <div className="ab-sbar-meta">
        <span className="ab-sbar-name">{name}</span>
        <div className="ab-sbar-right">
          {note && <span className="ab-sbar-note">{note}</span>}
          <span className="ab-sbar-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="ab-sbar-track">
        <motion.div
          className="ab-sbar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)`, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width:0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration:0.9, ease:[.16,1,.3,1], delay: index * 0.06 }}
        />
      </div>
    </div>
  )
}

// ── Language flag + bar ───────────────────────────────────────
function LangBar({ lang, level, pct, color, flag, country, index }) {
  return (
    <motion.div className="ab-lang-row"
      initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.5, delay:index*.1 }}>
      <div className="ab-lang-top">
        <div className="ab-lang-left">
          <span className={`fi fi-${flag} ab-lang-flag`} aria-label={country} />
          <div>
            <span className="ab-lang-name">{lang}</span>
            <span className="ab-lang-country">{country}</span>
          </div>
        </div>
        <span className="ab-lang-level" style={{ color }}>{level}</span>
      </div>
      <div className="ab-lang-track">
        <motion.div className="ab-lang-fill" style={{ background: color, boxShadow: `0 0 8px ${color}44` }}
          initial={{ width:0 }}
          whileInView={{ width:`${pct}%` }}
          viewport={{ once:true }}
          transition={{ duration:1, ease:[.16,1,.3,1], delay: index * 0.12 }}
        />
      </div>
    </motion.div>
  )
}

// ── Main About Page ───────────────────────────────────────────
export default function About() {
  const age = calculateAge()
  const [skillTab, setSkillTab] = useState('dev')
  const skillsRef   = useRef(null)
  const skillsInView = useInView(skillsRef, { once:true, margin:'-80px' })

  // Timeline scroll-animated line
  const tlWrapRef = useRef(null)
  const { scrollYProgress: tlProgress } = useScroll({
    target: tlWrapRef,
    offset: ['start 80%', 'end 50%'],
  })
  const lineScale = useTransform(tlProgress, [0,1], [0,1])

  // Inject flag-icons CSS
  useEffect(() => {
    if (document.getElementById('flag-icons-css')) return
    const link = document.createElement('link')
    link.id   = 'flag-icons-css'
    link.rel  = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css'
    document.head.appendChild(link)
  }, [])

  useEffect(() => { trackPage('About') }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc  = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh.`

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title"       content={seoTitle} />
        <meta property="og:description" content={seoDesc}  />
        <meta property="og:url"         content={`${SITE_CONFIG.siteURL}/about`} />
        <meta property="og:image"       content={SITE_CONFIG.seo.defaultOGImage} />
        <link rel="canonical"           href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name:'Home', path:'/' },
          { name:'About', path:'/about' },
        ]))}</script>
      </Helmet>

      <div className="ab-page">

        {/* ── 1. HERO ─────────────────────────────────────── */}
        <section className="ab-hero">
          {/* Ambient orbs */}
          <div className="ab-hero-orb ab-orb-1" aria-hidden="true" />
          <div className="ab-hero-orb ab-orb-2" aria-hidden="true" />

          <div className="ab-hero-grid container-xl">
            {/* LEFT — content */}
            <motion.div className="ab-hero-left"
              initial="hidden" animate="show" variants={stagger(.1)}>

              {/* Breadcrumb */}
              <motion.nav variants={fadeUp} className="ab-bc">
                <Link to="/" className="ab-bc-link">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} className="ab-bc-sep" aria-hidden="true" />
                <span className="ab-bc-cur">About</span>
              </motion.nav>

              {/* Label */}
              <motion.p variants={fadeUp} className="ab-hero-label">
                <FontAwesomeIcon icon={faUser} className="mr-1.5" aria-hidden="true" />
                About Me
              </motion.p>

              {/* Name */}
              <motion.h1 variants={fadeUp} className="ab-hero-name">
                Muhtasim Rahman
                <span className="ab-hero-nick">(Turzo)</span>
              </motion.h1>

              {/* Role */}
              <motion.p variants={fadeUp} className="ab-hero-role">
                Self-taught Developer &amp; Designer
              </motion.p>

              {/* Bio */}
              <motion.p variants={fadeUp} className="ab-hero-bio">
                A <strong>{age}-year-old</strong> student from Nilphamari, Bangladesh —
                building clean, fast, and meaningful digital experiences.
                Every project follows <strong>Islamic &amp; ethical principles</strong>.
              </motion.p>

              {/* Info chips */}
              <motion.div variants={fadeUp} className="ab-hero-chips">
                {[
                  { icon:faLocationDot, text:'Nilphamari, BD',  color:'#3B82F6' },
                  { icon:faGraduationCap, text:'SSC-26 · SGSC', color:'#10B981' },
                  { icon:faCalendar, text:`Age ${age}`,          color:'#F59E0B' },
                  { icon:faMosque,   text:'Muslim',              color:'#8B5CF6' },
                ].map(({ icon, text, color }) => (
                  <span key={text} className="ab-chip">
                    <FontAwesomeIcon icon={icon} style={{ color }} aria-hidden="true" />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeUp} className="ab-hero-socials">
                {[
                  { icon:faGithub,    href:SITE_CONFIG.social.github,    label:'GitHub'    },
                  { icon:faLinkedin,  href:SITE_CONFIG.social.linkedin,  label:'LinkedIn'  },
                  { icon:faFacebook,  href:SITE_CONFIG.social.facebook,  label:'Facebook'  },
                  { icon:faInstagram, href:SITE_CONFIG.social.instagram, label:'Instagram' },
                  { icon:faTelegram,  href:SITE_CONFIG.social.telegram,  label:'Telegram'  },
                  { icon:faEnvelope,  href:`mailto:${SITE_CONFIG.owner.email}`, label:'Email' },
                ].map(({ icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    aria-label={label} className="ab-soc-btn">
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </a>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp} className="ab-hero-cta">
                <Link to="/contact" className="ab-btn-primary">
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                  Get In Touch
                </Link>
                <Link to="/projects" className="ab-btn-secondary">
                  <FontAwesomeIcon icon={faGlobe} aria-hidden="true" />
                  My Projects
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT — hero-back.webp with gradient */}
            <div className="ab-hero-right" aria-hidden="true">
              <div className="ab-hero-img-wrap">
                <img src="/hero-back.webp" alt="" className="ab-hero-img" loading="eager" fetchPriority="high" />
                <div className="ab-hero-img-grad" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. INFO / ABOUT DETAILS ─────────────────────── */}
        <section className="section section-alt" id="info">
          <div className="container-xl">
            <motion.div className="ab-info-grid"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.1 }} variants={stagger(.09)}>

              {/* Left — quote + stats */}
              <motion.div variants={fadeUp} className="ab-info-left">
                <p className="ab-section-label">My Story</p>
                <h2 className="ab-section-h2">
                  From circuits to<br />
                  <span className="text-[var(--accent-primary)]">clean code</span>
                </h2>
                <div className="ab-info-quote card">
                  <FontAwesomeIcon icon={faQuoteLeft} className="ab-quote-icon" aria-hidden="true" />
                  <p className="ab-quote-text">
                    "I possess a strong passion for programming and web development.
                    I aim to develop impactful websites that seamlessly combine
                    functionality with captivating design — while adhering to
                    ethical and Halal principles in all my work."
                  </p>
                </div>
                <div className="ab-exp-stats">
                  {[
                    { val:'3+', label:'Years Web Dev',      color:'#3B82F6' },
                    { val:'6+', label:'Years Graphic Design', color:'#10B981' },
                    { val:'5+', label:'Years Video Editing',  color:'#8B5CF6' },
                  ].map(({ val, label, color }) => (
                    <div key={label} className="ab-exp-stat card">
                      <span className="ab-exp-val" style={{ color }}>{val}</span>
                      <span className="ab-exp-lbl">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — detail cards */}
              <motion.div variants={stagger(.1)} className="ab-info-right">
                {[
                  {
                    icon:faSeedling, color:'#10B981', title:'Early Spark',
                    text:'From childhood, I was fascinated by technical things — originally dreaming of becoming an electrical engineer. That curiosity led me to discover web development through YouTube tutorials.',
                  },
                  {
                    icon:faCode, color:'#3B82F6', title:'Learning in Progress',
                    text:'Self-teaching through YouTube and building real projects has been my path. Even while preparing for SSC exams, I never stopped shipping code — from small tools to full PWA applications.',
                  },
                  {
                    icon:faRocket, color:'#F59E0B', title:"What's Next",
                    text:'SSC done, HSC next, then CSE. Every project I ship is a step toward becoming a professional full-stack developer. Quality, ethics, and continuous improvement — always.',
                  },
                ].map(({ icon, color, title, text }) => (
                  <motion.div key={title} variants={fadeUp} className="ab-info-card card">
                    <div className="ab-info-icon" style={{ background:`${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="ab-info-card-title">{title}</h3>
                      <p className="ab-info-card-text">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── 3. EDUCATION TIMELINE ────────────────────────── */}
        <section className="section" id="education">
          <div className="container-xl">
            <motion.div className="text-center mb-14"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.2 }} variants={stagger(.08)}>
              <motion.p variants={fadeUp} className="ab-section-label">My Background</motion.p>
              <motion.h2 variants={fadeUp} className="ab-section-h2 text-center">
                Education <span className="text-[var(--accent-primary)]">Timeline</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="ab-section-sub">
                From nursery to the dream of a CSE degree — every institution that shaped who I am.
              </motion.p>
            </motion.div>

            {/* Timeline wrapper */}
            <div ref={tlWrapRef} className="ab-tl-wrap">
              {/* Background line (always visible, muted) */}
              <div className="ab-tl-bg-line" aria-hidden="true" />
              {/* Animated accent line */}
              <motion.div
                className="ab-tl-accent-line"
                style={{ scaleY: lineScale, transformOrigin:'top center' }}
                aria-hidden="true"
              />

              {EDUCATION.map(({ name, period, classes, icon, color, tag, current, upcoming, mapUrl }, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div key={i}
                    className={`ab-tl-row${isLeft ? ' ab-tl-left' : ' ab-tl-right'}`}
                    initial={{ opacity:0, x: isLeft ? -28 : 28 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true, amount:.25 }}
                    transition={{ duration:.55, ease:[.16,1,.3,1], delay: i * 0.05 }}>

                    <div className="ab-tl-card card">
                      {/* Status badge */}
                      {current && (
                        <span className="ab-tl-status ab-tl-cur" style={{ background:color, color:'#000' }}>
                          <span className="ab-tl-pulse" style={{ background:'#000' }} aria-hidden="true" />
                          Current
                        </span>
                      )}
                      {upcoming && (
                        <span className="ab-tl-status ab-tl-upcoming">Upcoming</span>
                      )}
                      <span className="ab-tl-tag" style={{ background:`${color}18`, color }}>{tag}</span>
                      <h4 className="ab-tl-name">{name}</h4>
                      <p className="ab-tl-period" style={{ color }}>{period}</p>
                      <p className="ab-tl-classes">{classes}</p>
                      {mapUrl && (
                        <a href={mapUrl} target="_blank" rel="noreferrer" className="ab-tl-map">
                          <FontAwesomeIcon icon={faMapPin} aria-hidden="true" /> View on Map
                        </a>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="ab-tl-dot" style={{ borderColor:color, background: current ? color : 'var(--bg-page)' }}>
                      <FontAwesomeIcon icon={icon} style={{ color: current ? '#fff' : color, fontSize:'10px' }} aria-hidden="true" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 4. SKILLS & EXPERTISE ────────────────────────── */}
        <section className="section section-alt" id="skills" ref={skillsRef}>
          <div className="container-xl">
            <motion.div className="text-center mb-10"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.2 }} variants={stagger(.08)}>
              <motion.p variants={fadeUp} className="ab-section-label">Skills & Expertise</motion.p>
              <motion.h2 variants={fadeUp} className="ab-section-h2 text-center">
                What I <span className="text-[var(--accent-primary)]">Know</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="ab-section-sub">
                Self-rated based on real project experience — honest about where I'm strong and still growing.
              </motion.p>
            </motion.div>

            {/* Tabs */}
            <div className="ab-skill-tabs">
              {[
                { id:'dev',    label:'Programming', icon:faCode    },
                { id:'design', label:'Design',      icon:faPalette },
                { id:'video',  label:'Video',        icon:faVideo   },
                { id:'tools',  label:'Tools',        icon:faGears   },
              ].map(({ id, label, icon }) => (
                <button key={id} className={`ab-stab${skillTab===id ? ' active' : ''}`}
                  onClick={() => setSkillTab(id)}>
                  <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={skillTab}
                initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-10 }} transition={{ duration:.3 }}>

                {/* PROGRAMMING */}
                {skillTab === 'dev' && (
                  <div className="ab-skill-panel">
                    <div className="ab-sbar-list">
                      {DEV_SKILLS.map((sk, i) => (
                        <SkillBar key={sk.name} {...sk} index={i} inView={skillsInView} />
                      ))}
                    </div>
                    <div className="ab-skill-note card">
                      <FontAwesomeIcon icon={faBrain} className="ab-snote-icon" aria-hidden="true" />
                      <p className="ab-snote-title">Still Learning</p>
                      <p className="ab-snote-text">
                        SSC exams paused deep learning for ~2 years,
                        but I never stopped building. Now with exams done,
                        the real journey begins.
                      </p>
                    </div>
                  </div>
                )}

                {/* DESIGN */}
                {skillTab === 'design' && (
                  <div className="ab-skill-panel">
                    <div className="ab-design-grid">
                      {DESIGN_SKILLS.map(({ name, icon, color }) => (
                        <div key={name} className="ab-design-item card">
                          <div className="ab-design-icon" style={{ background:`${color}18`, color }}>
                            <FontAwesomeIcon icon={icon} aria-hidden="true" />
                          </div>
                          <span className="ab-design-name">{name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="ab-skill-note card">
                      <FontAwesomeIcon icon={faPalette} className="ab-snote-icon" style={{ color:'#EC4899' }} aria-hidden="true" />
                      <p className="ab-snote-title">6+ Years</p>
                      <p className="ab-snote-text">
                        Logo, banner, thumbnail — designing since age 12.
                        Some commercial-grade, all with clean aesthetics.
                      </p>
                    </div>
                  </div>
                )}

                {/* VIDEO */}
                {skillTab === 'video' && (
                  <div className="ab-skill-panel">
                    <div className="ab-video-list">
                      {VIDEO_SKILLS.map(({ name, color }) => (
                        <div key={name} className="ab-video-item card">
                          <span className="ab-vi-dot" style={{ background:color }} aria-hidden="true" />
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="ab-skill-note card">
                      <FontAwesomeIcon icon={faVideo} className="ab-snote-icon" style={{ color:'#A855F7' }} aria-hidden="true" />
                      <p className="ab-snote-title">5+ Years</p>
                      <p className="ab-snote-text">
                        YouTube, Facebook, Shorts, Reels — video editing
                        has been a creative outlet alongside web development.
                      </p>
                    </div>
                  </div>
                )}

                {/* TOOLS */}
                {skillTab === 'tools' && (
                  <div className="ab-tools-grid">
                    {TOOLS.map(({ name, color, icon }) => (
                      <div key={name} className="ab-tool-item card">
                        <div className="ab-tool-icon" style={{ background:`${color}18`, color }}>
                          <FontAwesomeIcon icon={icon} aria-hidden="true" />
                        </div>
                        <span className="ab-tool-name">{name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── 5. LANGUAGE PROFICIENCY ──────────────────────── */}
        <section className="section" id="languages">
          <div className="container-xl">
            <motion.div className="ab-lang-grid"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.1 }} variants={stagger(.09)}>

              <motion.div variants={fadeUp}>
                <p className="ab-section-label">Languages</p>
                <h2 className="ab-section-h2">
                  Language <span className="text-[var(--accent-primary)]">Proficiency</span>
                </h2>
                <p className="ab-lang-desc">
                  Bengali is my mother tongue. I use English for all professional
                  and technical work, and understand Hindi &amp; Urdu conversationally.
                </p>
              </motion.div>

              <div className="ab-lang-bars">
                {LANGUAGES.map((l, i) => (
                  <LangBar key={l.lang} {...l} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 6. VALUES & PERSONALITY ──────────────────────── */}
        <section className="section section-alt" id="values">
          <div className="container-xl">
            <motion.div className="text-center mb-12"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.2 }} variants={stagger(.08)}>
              <motion.p variants={fadeUp} className="ab-section-label">Who I Am</motion.p>
              <motion.h2 variants={fadeUp} className="ab-section-h2 text-center">
                Values &amp; <span className="text-[var(--accent-primary)]">Personality</span>
              </motion.h2>
            </motion.div>

            <div className="ab-values-grid">
              {VALUES.map(({ icon, color, title, desc }, i) => (
                <motion.div key={title}
                  className="ab-value-card card"
                  initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.5, delay: i * .08 }}>
                  <div className="ab-val-icon" style={{ background:`${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </div>
                  <h3 className="ab-val-title">{title}</h3>
                  <p className="ab-val-desc">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Hobbies & Interests */}
            <motion.div className="ab-hobbies-wrap"
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.5, delay:.2 }}>
              <p className="ab-hobbies-label">Hobbies &amp; Interests</p>
              <div className="ab-hobbies-chips">
                {HOBBIES.map(({ icon, label }) => (
                  <span key={label} className="ab-hobby-chip card">
                    <FontAwesomeIcon icon={icon} className="ab-hobby-icon" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 7. GOALS & PLANS ─────────────────────────────── */}
        <section className="section" id="goals">
          <div className="container-xl">
            <motion.div className="text-center mb-12"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.2 }} variants={stagger(.08)}>
              <motion.p variants={fadeUp} className="ab-section-label">Roadmap</motion.p>
              <motion.h2 variants={fadeUp} className="ab-section-h2 text-center">
                Goals &amp; <span className="text-[var(--accent-primary)]">Plans</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="ab-section-sub">
                Where I'm headed — short, mid, and long-term.
              </motion.p>
            </motion.div>

            <div className="ab-goals-grid">
              {GOALS.map(({ period, timeframe, color, icon, items }, gi) => (
                <motion.div key={period}
                  className="ab-goal-card card"
                  initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.5, delay: gi * .1 }}>
                  {/* Color top bar */}
                  <div className="ab-goal-topbar" style={{ background: color }} />
                  <div className="ab-goal-body">
                    <div className="ab-goal-header">
                      <div className="ab-goal-icon" style={{ background:`${color}18`, color }}>
                        <FontAwesomeIcon icon={icon} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="ab-goal-period" style={{ color }}>{period}</p>
                        <p className="ab-goal-time">{timeframe}</p>
                      </div>
                    </div>
                    <ul className="ab-goal-list">
                      {items.map((item, ii) => (
                        <li key={ii} className="ab-goal-item">
                          <FontAwesomeIcon icon={faCircleCheck} style={{ color }} className="ab-goal-bullet" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. FIND ME ONLINE ────────────────────────────── */}
        <section className="section section-alt" id="online">
          <div className="container-xl">
            <motion.div className="text-center mb-12"
              initial="hidden" whileInView="show" viewport={{ once:true, amount:.2 }} variants={stagger(.08)}>
              <motion.p variants={fadeUp} className="ab-section-label">Connect</motion.p>
              <motion.h2 variants={fadeUp} className="ab-section-h2 text-center">
                Find Me <span className="text-[var(--accent-primary)]">Online</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="ab-section-sub">
                All my social profiles and contact links in one place.
              </motion.p>
            </motion.div>

            <div className="ab-social-grid">
              {SOCIALS_ONLINE.map(({ name, icon, href, handle, color }, i) => (
                <motion.a key={name} href={href} target="_blank" rel="noreferrer"
                  className="ab-soc-card card"
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.45, delay: i * .045 }}>
                  {/* Left accent bar */}
                  <div className="ab-soc-bar" style={{ background: color }} aria-hidden="true" />
                  <div className="ab-soc-icon-wrap" style={{ background:`${color}15`, color }}>
                    <FontAwesomeIcon icon={icon} className="ab-soc-icon" aria-hidden="true" />
                  </div>
                  <div className="ab-soc-info">
                    <span className="ab-soc-name">{name}</span>
                    <span className="ab-soc-handle">{handle}</span>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="ab-soc-arrow" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. CTA (shared) ──────────────────────────────── */}
        <SiteCTA />

      </div>

      {/* ── STYLES ──────────────────────────────────────────── */}
      <style>{`
        /* ── PAGE BASE ─────────────────────────────────────── */
        .ab-page { overflow-x: hidden; }

        /* ── SECTION LABELS / HEADINGS ─────────────────────── */
        .ab-section-label {
          font-size: .72rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          margin-bottom: .5rem;
        }
        .ab-section-h2 {
          font-family: var(--font-display); font-size: clamp(1.7rem,3.5vw,2.4rem);
          font-weight: 800; color: var(--text-primary); line-height: 1.15;
          margin-bottom: .5rem;
        }
        .ab-section-sub {
          font-size: .9rem; color: var(--text-secondary); max-width: 520px;
          margin-inline: auto; line-height: 1.7;
        }

        /* ── HERO ──────────────────────────────────────────── */
        .ab-hero {
          position: relative;
          min-height: 90vh;
          overflow: hidden;
          background: var(--bg-page);
          padding-top: calc(var(--navbar-h) + 4rem);
          padding-bottom: 4rem;
          display: flex; align-items: center;
        }
        .ab-hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .ab-orb-1 { width:480px; height:480px; background:rgba(59,130,246,.07); top:-80px; left:-120px; }
        .ab-orb-2 { width:340px; height:340px; background:rgba(139,92,246,.05); bottom:-40px; right:-80px; }

        .ab-hero-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }
        @media (min-width: 900px) {
          .ab-hero-grid { grid-template-columns: 1fr 400px; gap: 3.5rem; }
        }
        @media (min-width: 1200px) {
          .ab-hero-grid { grid-template-columns: 1fr 460px; }
        }

        /* LEFT content */
        .ab-hero-left {
          display: flex; flex-direction: column; gap: 1.2rem;
          order: 2;
        }
        @media (min-width: 900px) { .ab-hero-left { order: 1; } }

        .ab-bc {
          display: flex; align-items: center; gap: .4rem;
          font-size: .75rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .ab-bc-link { color: var(--text-tertiary); text-decoration: none; }
        .ab-bc-link:hover { color: var(--accent-primary); }
        .ab-bc-sep { font-size: .55rem; opacity: .5; }
        .ab-bc-cur { color: var(--text-secondary); }

        .ab-hero-label {
          display: inline-flex; align-items: center; gap: .45rem;
          font-size: .72rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: rgba(59,130,246,.08); border: 1px solid rgba(59,130,246,.2);
          padding: .3rem .8rem; border-radius: 9999px; width: fit-content;
        }

        .ab-hero-name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 800; line-height: 1.1;
          color: var(--text-primary); letter-spacing: -.02em;
        }
        .ab-hero-nick {
          display: block;
          font-size: .38em; font-weight: 600;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .04em; margin-top: .15em;
        }

        .ab-hero-role {
          font-size: clamp(.95rem,1.4vw,1.1rem);
          color: var(--text-secondary); font-weight: 500;
        }

        .ab-hero-bio {
          font-size: .9375rem; color: var(--text-secondary);
          line-height: 1.75; max-width: 500px;
        }

        .ab-hero-chips {
          display: flex; flex-wrap: wrap; gap: .6rem;
        }
        .ab-chip {
          display: inline-flex; align-items: center; gap: .45rem;
          font-size: .78rem; color: var(--text-secondary);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          padding: .35rem .8rem; border-radius: 9999px;
          font-family: var(--font-mono);
        }

        .ab-hero-socials { display: flex; flex-wrap: wrap; gap: .55rem; }
        .ab-soc-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: var(--radius-lg);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          color: var(--text-secondary); font-size: .8rem;
          text-decoration: none; transition: all .18s ease;
        }
        .ab-soc-btn:hover {
          color: var(--accent-primary); border-color: var(--accent-primary);
          background: rgba(59,130,246,.08); transform: translateY(-2px);
        }
        .ab-soc-btn:active { transform: scale(.93); }

        .ab-hero-cta { display: flex; flex-wrap: wrap; gap: .7rem; }
        .ab-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-size: .875rem; font-weight: 700;
          text-decoration: none; border: none; cursor: pointer;
          transition: all .2s ease;
        }
        .ab-btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(59,130,246,.35); }
        .ab-btn-primary:active { transform: scale(.96); }
        .ab-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--bg-surface); color: var(--text-primary);
          border: 1px solid var(--border-strong);
          font-size: .875rem; font-weight: 600;
          text-decoration: none; cursor: pointer; transition: all .2s ease;
        }
        .ab-btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); transform: translateY(-1px); }
        .ab-btn-secondary:active { transform: scale(.96); }

        /* RIGHT — image */
        .ab-hero-right {
          order: 1; display: flex; justify-content: center; align-items: center;
        }
        @media (min-width: 900px) { .ab-hero-right { order: 2; } }

        .ab-hero-img-wrap {
          position: relative;
          width: 100%;
          max-width: clamp(280px, 40vw, 460px);
          height: clamp(280px, 40vw, 600px);
          overflow: hidden;
          border-radius: 4px; /* minimal radius, not round */
        }
        @media (max-width: 899px) {
          /* Mobile / tablet — no frame, no round, just image */
          .ab-hero-img-wrap {
            max-width: min(100%, 420px);
            height: clamp(200px, 52vw, 320px);
            border-radius: 2px;
          }
        }

        .ab-hero-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }

        /* Same gradient as home hero himg-frame::after */
        .ab-hero-img-grad {
          position: absolute; bottom: -5px; left: -1px; right: -1px;
          height: calc(42% + 5px);
          background: linear-gradient(to top,
            var(--bg-page) 0%, var(--bg-page) 6%,
            rgba(2,6,23,.7) 32%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }
        [data-theme=light] .ab-hero-img-grad {
          background: linear-gradient(to top,
            var(--bg-page) 0%, var(--bg-page) 5%,
            rgba(240,244,248,.8) 30%, transparent 100%);
        }

        /* ── INFO SECTION ───────────────────────────────────── */
        .ab-info-grid {
          display: grid; grid-template-columns: 1fr; gap: 3rem;
        }
        @media (min-width: 900px) {
          .ab-info-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        }
        .ab-info-quote {
          padding: 1.25rem 1.4rem; position: relative;
          border-left: 3px solid var(--accent-primary);
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          margin-top: 1rem;
        }
        .ab-quote-icon {
          color: var(--accent-primary); opacity: .3;
          font-size: 1.1rem; margin-bottom: .5rem; display: block;
        }
        .ab-quote-text {
          font-size: .875rem; color: var(--text-secondary);
          line-height: 1.75; font-style: italic;
        }
        .ab-exp-stats {
          display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.25rem;
        }
        .ab-exp-stat {
          flex: 1; min-width: 80px;
          display: flex; flex-direction: column; align-items: center;
          padding: 1rem .75rem; text-align: center; gap: .3rem;
        }
        .ab-exp-val {
          font-family: var(--font-display); font-size: 1.75rem;
          font-weight: 800; line-height: 1;
        }
        .ab-exp-lbl {
          font-size: .7rem; color: var(--text-tertiary);
          text-transform: uppercase; letter-spacing: .06em;
        }
        .ab-info-right { display: flex; flex-direction: column; gap: 1rem; }
        .ab-info-card {
          display: flex; gap: .875rem; padding: 1.1rem; align-items: flex-start;
        }
        .ab-info-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8125rem; flex-shrink: 0;
        }
        .ab-info-card-title {
          font-size: .9375rem; font-weight: 600; color: var(--text-primary);
          margin-bottom: .3rem;
        }
        .ab-info-card-text {
          font-size: .8125rem; color: var(--text-secondary); line-height: 1.65;
        }

        /* ── TIMELINE ───────────────────────────────────────── */
        .ab-tl-wrap {
          position: relative;
          max-width: 820px; margin: 0 auto;
          padding-bottom: 1rem;
        }

        /* Vertical lines — centered on PC, left on mobile */
        .ab-tl-bg-line, .ab-tl-accent-line {
          position: absolute; z-index: 0;
          width: 2px; top: 0; bottom: 0;
          left: 1rem; /* mobile: left side */
        }
        @media (min-width: 720px) {
          .ab-tl-bg-line, .ab-tl-accent-line {
            left: 50%; transform: translateX(-1px);
          }
        }
        .ab-tl-bg-line { background: var(--border-color); }
        .ab-tl-accent-line {
          background: linear-gradient(to bottom, var(--accent-primary), rgba(99,102,241,.6));
          will-change: transform;
        }

        /* Row — default: all cards on right of left line (mobile) */
        .ab-tl-row {
          position: relative; z-index: 1;
          display: flex; margin-bottom: 2rem;
          padding-left: 3rem; /* room for left line + dot */
          justify-content: flex-start;
        }
        .ab-tl-row:last-child { margin-bottom: 0; }

        /* PC: left cards & right cards alternating */
        @media (min-width: 720px) {
          .ab-tl-row {
            padding-left: 0;
            justify-content: flex-start;
          }
          .ab-tl-left  { justify-content: flex-start;  padding-right: calc(50% + 1.75rem); }
          .ab-tl-right { justify-content: flex-end;    padding-left:  calc(50% + 1.75rem); }
          .ab-tl-left  .ab-tl-card { text-align: right; }
          .ab-tl-right .ab-tl-card { text-align: left;  }
        }

        /* Center dot */
        .ab-tl-dot {
          position: absolute; z-index: 2;
          left: .25rem; /* mobile: on left line */
          top: .875rem;
          width: 28px; height: 28px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (min-width: 720px) {
          .ab-tl-dot {
            left: 50%; transform: translateX(-50%);
          }
        }

        .ab-tl-card {
          flex: none;
          max-width: 340px;
          padding: 1rem 1.125rem;
          position: relative;
        }
        .ab-tl-status {
          position: absolute; top: -10px;
          font-size: .68rem; font-weight: 700; letter-spacing: .06em;
          padding: .15rem .65rem; border-radius: 9999px; text-transform: uppercase;
          display: flex; align-items: center; gap: .35rem;
        }
        .ab-tl-left  .ab-tl-status { right: .75rem; }
        .ab-tl-right .ab-tl-status { left:  .75rem; }
        @media (max-width: 719px) {
          .ab-tl-status { left: .75rem; }
        }
        .ab-tl-cur { }
        .ab-tl-upcoming {
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        .ab-tl-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          animation: ab-tl-p 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ab-tl-p {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.5; transform:scale(1.4); }
        }
        .ab-tl-tag {
          display: inline-block; font-size: .68rem; font-weight: 700;
          padding: .15rem .6rem; border-radius: 9999px; margin-bottom: .5rem;
        }
        .ab-tl-name {
          font-size: .9rem; font-weight: 600; color: var(--text-primary); line-height: 1.3;
        }
        .ab-tl-period {
          font-size: .8rem; font-weight: 600; margin-top: .2rem;
        }
        .ab-tl-classes {
          font-size: .78rem; color: var(--text-tertiary); margin-top: .15rem;
        }
        .ab-tl-map {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .72rem; color: var(--text-tertiary); text-decoration: none;
          margin-top: .5rem; opacity: .8; transition: opacity .18s;
        }
        .ab-tl-map:hover { opacity: 1; color: var(--accent-primary); }

        /* ── SKILLS ─────────────────────────────────────────── */
        .ab-skill-tabs {
          display: flex; flex-wrap: wrap; gap: .4rem;
          margin-bottom: 2rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: .3rem; border-radius: var(--radius-xl);
          width: fit-content;
        }
        .ab-stab {
          display: flex; align-items: center; gap: .45rem;
          padding: .45rem 1rem; border-radius: var(--radius-lg);
          font-size: .8125rem; font-weight: 500;
          color: var(--text-secondary); cursor: pointer;
          background: transparent; border: none;
          transition: all .18s ease;
        }
        .ab-stab:hover { color: var(--text-primary); }
        .ab-stab.active {
          background: var(--bg-surface-2);
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }
        .ab-skill-panel {
          display: grid; grid-template-columns: 1fr;
          gap: 1.75rem;
        }
        @media (min-width: 768px) {
          .ab-skill-panel { grid-template-columns: 1fr 260px; align-items: start; }
        }
        .ab-sbar-list { display: flex; flex-direction: column; gap: .875rem; }
        .ab-sbar-row {}
        .ab-sbar-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .35rem;
        }
        .ab-sbar-name { font-size: .875rem; font-weight: 500; color: var(--text-primary); }
        .ab-sbar-right { display: flex; align-items: center; gap: .75rem; }
        .ab-sbar-note  { font-size: .7rem; color: var(--text-tertiary); }
        .ab-sbar-pct   { font-size: .8rem; font-weight: 700; font-family: var(--font-mono); }
        .ab-sbar-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .ab-sbar-fill { height: 100%; border-radius: var(--radius-full); }

        .ab-skill-note {
          padding: 1.25rem; display: flex; flex-direction: column;
          align-items: flex-start; gap: .4rem;
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          border-color: rgba(59,130,246,.18);
        }
        .ab-snote-icon { font-size: 1rem; color: var(--accent-primary); }
        .ab-snote-title { font-size: .875rem; font-weight: 600; color: var(--text-primary); }
        .ab-snote-text  { font-size: .78rem; color: var(--text-secondary); line-height: 1.65; }

        .ab-design-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: .65rem;
        }
        @media (min-width: 640px) { .ab-design-grid { grid-template-columns: repeat(3, 1fr); } }
        .ab-design-item {
          display: flex; align-items: center; gap: .65rem; padding: .85rem 1rem;
        }
        .ab-design-icon {
          width: 30px; height: 30px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0;
        }
        .ab-design-name { font-size: .8125rem; font-weight: 500; color: var(--text-primary); }

        .ab-video-list { display: flex; flex-direction: column; gap: .65rem; }
        .ab-video-item {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem; font-size: .875rem;
          color: var(--text-primary); font-weight: 500;
        }
        .ab-vi-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

        .ab-tools-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: .65rem;
        }
        @media (min-width: 640px) { .ab-tools-grid { grid-template-columns: repeat(4, 1fr); } }
        .ab-tool-item {
          display: flex; flex-direction: column; align-items: center;
          gap: .55rem; padding: 1rem .75rem; text-align: center;
        }
        .ab-tool-icon {
          width: 38px; height: 38px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .875rem;
        }
        .ab-tool-name { font-size: .73rem; font-weight: 500; color: var(--text-secondary); }

        /* ── LANGUAGES ──────────────────────────────────────── */
        .ab-lang-grid {
          display: grid; grid-template-columns: 1fr; gap: 3rem;
        }
        @media (min-width: 768px) {
          .ab-lang-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        }
        .ab-lang-desc {
          font-size: .9rem; color: var(--text-secondary); line-height: 1.75;
          margin-top: .75rem;
        }
        .ab-lang-bars { display: flex; flex-direction: column; gap: 1.25rem; }
        .ab-lang-row {}
        .ab-lang-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .5rem;
        }
        .ab-lang-left { display: flex; align-items: center; gap: .65rem; }
        .ab-lang-flag {
          font-size: 1.4rem; /* flag-icons uses em sizing */
          border-radius: 3px; display: inline-block;
          box-shadow: 0 1px 4px rgba(0,0,0,.15);
          flex-shrink: 0;
        }
        .ab-lang-name { display: block; font-size: .9375rem; font-weight: 600; color: var(--text-primary); line-height: 1.2; }
        .ab-lang-country { display: block; font-size: .72rem; color: var(--text-tertiary); margin-top: .1rem; }
        .ab-lang-level { font-size: .8125rem; font-weight: 600; }
        .ab-lang-track {
          height: 7px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .ab-lang-fill { height: 100%; border-radius: var(--radius-full); }

        /* ── VALUES ─────────────────────────────────────────── */
        .ab-values-grid {
          display: grid; grid-template-columns: 1fr; gap: .875rem;
        }
        @media (min-width: 640px)  { .ab-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ab-values-grid { grid-template-columns: repeat(3, 1fr); } }
        .ab-value-card {
          padding: 1.4rem; display: flex; flex-direction: column; gap: .65rem;
          transition: transform .2s ease;
        }
        .ab-value-card:hover { transform: translateY(-2px); }
        .ab-val-icon {
          width: 42px; height: 42px; border-radius: var(--radius-xl);
          display: flex; align-items: center; justify-content: center;
          font-size: .9375rem;
        }
        .ab-val-title { font-size: .9375rem; font-weight: 700; color: var(--text-primary); }
        .ab-val-desc  { font-size: .8125rem; color: var(--text-secondary); line-height: 1.65; }

        /* Hobbies */
        .ab-hobbies-wrap { margin-top: 3rem; text-align: center; }
        .ab-hobbies-label {
          font-size: .72rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--text-tertiary); margin-bottom: 1rem;
        }
        .ab-hobbies-chips {
          display: flex; flex-wrap: wrap; gap: .6rem; justify-content: center;
        }
        .ab-hobby-chip {
          display: inline-flex; align-items: center; gap: .45rem;
          font-size: .8125rem; color: var(--text-secondary);
          padding: .4rem 1rem; border-radius: 9999px;
          transition: all .18s ease;
        }
        .ab-hobby-chip:hover { color: var(--accent-primary); border-color: var(--accent-primary); }
        .ab-hobby-icon { color: var(--accent-primary); font-size: .8rem; }

        /* ── GOALS ──────────────────────────────────────────── */
        .ab-goals-grid {
          display: grid; grid-template-columns: 1fr; gap: 1rem;
        }
        @media (min-width: 768px) { .ab-goals-grid { grid-template-columns: repeat(3, 1fr); } }
        .ab-goal-card {
          padding: 0; overflow: hidden;
          cursor: pointer; transition: transform .2s ease, box-shadow .2s ease;
          user-select: none;
        }
        .ab-goal-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
        .ab-goal-card:active { transform: scale(.97); box-shadow: var(--shadow-sm); }
        .ab-goal-topbar { height: 3px; width: 100%; }
        .ab-goal-body { padding: 1.4rem; }
        .ab-goal-header {
          display: flex; align-items: center; gap: .875rem; margin-bottom: 1rem;
        }
        .ab-goal-icon {
          width: 38px; height: 38px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .8125rem; flex-shrink: 0;
        }
        .ab-goal-period { font-size: .875rem; font-weight: 700; line-height: 1.2; }
        .ab-goal-time   { font-size: .72rem; color: var(--text-tertiary); margin-top: .15rem; }
        .ab-goal-list   { display: flex; flex-direction: column; gap: .6rem; }
        .ab-goal-item   {
          display: flex; align-items: flex-start; gap: .65rem;
          font-size: .8125rem; color: var(--text-secondary); line-height: 1.5;
        }
        .ab-goal-bullet { flex-shrink: 0; margin-top: .1rem; font-size: .8rem; }

        /* ── FIND ME ONLINE ─────────────────────────────────── */
        .ab-social-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        @media (min-width: 640px)  { .ab-social-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px)  { .ab-social-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1200px) { .ab-social-grid { grid-template-columns: repeat(5, 1fr); } }

        .ab-soc-card {
          display: flex; align-items: center; gap: .875rem;
          padding: 1rem 1.125rem;
          text-decoration: none; position: relative;
          overflow: hidden;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .ab-soc-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .ab-soc-card:active { transform: scale(.96); }
        .ab-soc-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          transition: width .2s ease;
        }
        .ab-soc-card:hover .ab-soc-bar { width: 4px; }
        .ab-soc-icon-wrap {
          width: 36px; height: 36px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ab-soc-icon { font-size: .9375rem; }
        .ab-soc-info { flex: 1; min-width: 0; }
        .ab-soc-name {
          display: block; font-size: .8375rem; font-weight: 600;
          color: var(--text-primary); line-height: 1.2;
        }
        .ab-soc-handle {
          display: block; font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono); overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
          margin-top: .1rem;
        }
        .ab-soc-arrow {
          color: var(--text-tertiary); font-size: .7rem; flex-shrink: 0;
          transition: transform .18s ease, color .18s ease;
        }
        .ab-soc-card:hover .ab-soc-arrow {
          transform: translateX(3px); color: var(--text-secondary);
        }
      `}</style>
    </>
  )
}
