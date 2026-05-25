// ============================================================
// About.jsx — v2.3.0
// Full About page — all info from about.md visualised
// Sections: Hero, Story, Timeline, Skills, Languages, Values, Goals, CTA
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { Link }            from 'react-router-dom'
import { Helmet }          from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCode, faPalette, faVideo,
  faBrain, faHeart, faArrowRight, faQuoteLeft, faStar,
  faEnvelope, faGlobe, faUser, faMosque, faDumbbell, faBicycle,
  faBook, faCamera, faLaptopCode, faRocket, faFlag,
  faBullseye, faCalendar, faMapPin, faSeedling, faMountain,
  faHandshake, faShield, faMedal, faGears, faTerminal,
  faChevronDown, faDownload,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram, faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'

// ── Animation helpers ────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: [.16,1,.3,1] } },
}
const stagger = (delay = .09) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

// ── Data ────────────────────────────────────────────────────

const EDUCATION = [
  {
    period: '2013 – 2014',
    school: 'St. Geroza School, Saidpur',
    level: 'Nursery & KG',
    desc: 'Early schooling — first steps in formal education.',
    color: '#10B981',
    current: false,
  },
  {
    period: '2015 – 2017',
    school: 'St. Geroza School, Saidpur',
    level: 'Class 1, 2 & 3',
    desc: 'Primary education. Developed curiosity for technology and reading.',
    color: '#3B82F6',
    current: false,
  },
  {
    period: '2018 – 2019',
    school: 'Tulshiram Govt. Primary School, Saidpur',
    level: 'Class 4 & 5',
    desc: 'Completed primary cycle. Top student in science subjects.',
    color: '#8B5CF6',
    current: false,
  },
  {
    period: '2020',
    school: 'Lions School & College, Saidpur',
    level: 'Class 6',
    desc: 'Briefly enrolled before transitioning to SGSC.',
    color: '#F59E0B',
    current: false,
  },
  {
    period: '2021 – 2025',
    school: 'Saidpur Govt. Science College (SGSC)',
    level: 'Class 6 – 10',
    desc: 'Focused on Science group. Deepened interest in programming and web development.',
    color: '#EC4899',
    current: false,
  },
  {
    period: '2026',
    school: 'Saidpur Govt. Science College (SGSC)',
    level: 'SSC-26',
    desc: 'SSC exam in progress (mid-2026). Next goal: HSC → CSE degree.',
    color: '#3B82F6',
    current: true,
  },
]

const DEV_SKILLS = [
  { name: 'AI Tools',       pct: 90, color: '#10B981', note: 'Daily use — coding, design, planning' },
  { name: 'HTML',           pct: 80, color: '#F97316', note: 'Core structure, semantic markup'       },
  { name: 'CSS',            pct: 80, color: '#3B82F6', note: 'Layouts, animations, responsive'       },
  { name: 'Git & GitHub',   pct: 78, color: '#64748B', note: 'Version control, project hosting'      },
  { name: 'Python',         pct: 60, color: '#EAB308', note: 'Learning stage, scripting'             },
  { name: 'JavaScript',     pct: 45, color: '#F59E0B', note: 'Improving — used in projects'          },
  { name: 'Java',           pct: 35, color: '#EC4899', note: 'Basic knowledge'                       },
]

const DESIGN_SKILLS = [
  { name: 'Logo Design',           icon: faPalette,    color: '#EC4899' },
  { name: 'Banner Design',         icon: faPalette,    color: '#8B5CF6' },
  { name: 'Thumbnail Design',      icon: faCamera,     color: '#3B82F6' },
  { name: 'Business Card Design',  icon: faHandshake,  color: '#10B981' },
  { name: 'Poster Design',         icon: faGlobe,      color: '#F59E0B' },
  { name: 'Album / Book Design',   icon: faBook,       color: '#F97316' },
  { name: 'HTML & CSS Design',     icon: faCode,       color: '#06B6D4' },
]

const VIDEO_SKILLS = [
  { name: 'YouTube Videos',            color: '#EF4444' },
  { name: 'Facebook Videos',           color: '#3B82F6' },
  { name: 'Ads & Commercials',         color: '#F59E0B' },
  { name: 'Short Videos (Reels/Shorts)',color: '#EC4899' },
  { name: 'Basic Animation Videos',    color: '#8B5CF6' },
]

const TOOLS = [
  { name: 'VS Code',              color: '#007ACC', icon: faTerminal   },
  { name: 'GitHub',               color: '#94A3B8', icon: faGithub     },
  { name: 'Firebase',             color: '#F59E0B', icon: faGears      },
  { name: 'Google Sheets API',    color: '#10B981', icon: faGlobe      },
  { name: 'Browser DevTools',     color: '#06B6D4', icon: faCode       },
  { name: 'Adobe Suite',          color: '#EC4899', icon: faPalette    },
  { name: 'Figma',                color: '#A855F7', icon: faPalette    },
  { name: 'Tailwind CSS',         color: '#38BDF8', icon: faCode       },
]

const LANGUAGES = [
  { lang: 'Bengali (বাংলা)', level: 'Native',         pct: 100, color: '#3B82F6' },
  { lang: 'English',          level: 'Intermediate',   pct: 65,  color: '#10B981' },
  { lang: 'Hindi (हिन्दी)',  level: 'Conversational', pct: 55,  color: '#F59E0B' },
  { lang: 'Urdu',             level: 'Conversational', pct: 45,  color: '#EC4899' },
]

const VALUES = [
  { icon: faMosque,    color: '#10B981', title: 'Islam First',       desc: 'All work follows Islamic & ethical principles. Halal income is a non-negotiable priority.' },
  { icon: faDumbbell,  color: '#3B82F6', title: 'Discipline',        desc: 'Structured routines, focused work sessions, and consistent daily effort.' },
  { icon: faBrain,     color: '#8B5CF6', title: 'Beneficial Knowledge', desc: 'Only learning things with practical value — no wasted effort.' },
  { icon: faShield,    color: '#F59E0B', title: 'Honesty',            desc: 'Quality work speaks for itself. No showing off, no shortcuts.' },
  { icon: faMedal,     color: '#EC4899', title: 'Perfection',         desc: 'Spending the time needed to get things right. Always.' },
]

const INTERESTS = [
  { icon: faMosque,    label: 'Prayer (Salah)'   },
  { icon: faCode,      label: 'Programming'       },
  { icon: faDumbbell,  label: 'Outdoor Games'     },
  { icon: faBicycle,   label: 'Cycling'           },
  { icon: faMapPin,    label: 'Travelling'        },
  { icon: faBook,      label: 'Reading Books'     },
  { icon: faSeedling,  label: 'Learning new things' },
  { icon: faCamera,    label: 'Editing'           },
]

const GOALS = [
  {
    period: 'Short-Term',
    subtitle: '2026',
    color: '#3B82F6',
    icon: faFlag,
    items: [
      'Complete SSC exam successfully (SSC-26)',
      'Launch new portfolio — mdturzo.web.app',
      'Improve JavaScript skills',
      'Begin learning advanced frameworks',
    ],
  },
  {
    period: 'Mid-Term',
    subtitle: '2026 – 2028',
    color: '#10B981',
    icon: faBullseye,
    items: [
      'Enroll in HSC (Science group)',
      'Master full-stack web development',
      'Start freelancing — halal income',
      'Build real client projects',
    ],
  },
  {
    period: 'Long-Term',
    subtitle: 'Future',
    color: '#8B5CF6',
    icon: faMountain,
    items: [
      'Study BSc in CSE',
      'Become professional full-stack developer',
      'Establish ethical freelancing career',
      'Build beneficial technology for society',
    ],
  },
]

// ── Reusable section label ───────────────────────────────────
function SectionLabel({ text }) {
  return (
    <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent-primary)] mb-2">{text}</p>
  )
}

// ── Skill progress bar ───────────────────────────────────────
function SkillBar({ name, pct, color, note, index, inView }) {
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimated(true), index * 80 + 200)
      return () => clearTimeout(t)
    }
  }, [inView, index])

  return (
    <div className="ab-skill-row">
      <div className="ab-skill-meta">
        <span className="ab-skill-name">{name}</span>
        <div className="ab-skill-right">
          {note && <span className="ab-skill-note">{note}</span>}
          <span className="ab-skill-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="ab-skill-track">
        <motion.div
          className="ab-skill-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${pct}%` : 0 }}
          transition={{ duration: 0.8, ease: [.16,1,.3,1], delay: index * 0.06 }}
        />
      </div>
    </div>
  )
}

// ── Timeline item ────────────────────────────────────────────
function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`ab-tl-item${item.current ? ' ab-tl-current' : ''}`}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [.16,1,.3,1], delay: index * 0.08 }}
    >
      <div className="ab-tl-dot" style={{ borderColor: item.color, boxShadow: `0 0 0 3px ${item.color}22` }}>
        <div className="ab-tl-dot-inner" style={{ background: item.color }} />
      </div>
      <div className="ab-tl-card card">
        <div className="ab-tl-header">
          <div>
            <p className="ab-tl-school">{item.school}</p>
            <p className="ab-tl-level" style={{ color: item.color }}>{item.level}</p>
          </div>
          <span className="ab-tl-period">{item.period}</span>
          {item.current && (
            <span className="ab-tl-badge">
              <span className="ab-tl-dot-pulse" style={{ background: item.color }} />
              Current
            </span>
          )}
        </div>
        <p className="ab-tl-desc">{item.desc}</p>
      </div>
    </motion.div>
  )
}

// ── Main About Page ──────────────────────────────────────────
export default function About() {
  const age = calculateAge()
  const [activeSkillTab, setActiveSkillTab] = useState('dev')
  const skillsRef   = useRef(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })

  useEffect(() => { trackPage('About') }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc  = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh. Student, creator, and aspiring CSE engineer.`

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
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]))}</script>
      </Helmet>

      <div className="ab-page">

        {/* ── 1. PAGE HERO ─────────────────────────────────── */}
        <section className="ab-hero-section">
          {/* Background orbs */}
          <div className="ab-hero-orb ab-orb-1" />
          <div className="ab-hero-orb ab-orb-2" />

          <div className="container-xl">
            <motion.div className="ab-hero-inner"
              initial="hidden" animate="show"
              variants={stagger(.1)}>

              {/* Breadcrumb */}
              <motion.nav variants={fadeUp} className="ab-breadcrumb">
                <Link to="/" className="ab-bc-link">Home</Link>
                <span className="ab-bc-sep">/</span>
                <span className="ab-bc-current">About</span>
              </motion.nav>

              <div className="ab-hero-grid">
                {/* Left — text */}
                <motion.div className="ab-hero-text" variants={stagger(.09)}>
                  <motion.p variants={fadeUp} className="ab-hero-greeting">
                    <FontAwesomeIcon icon={faUser} className="mr-1.5" />
                    Muhtasim Rahman · Turzo
                  </motion.p>
                  <motion.h1 variants={fadeUp} className="ab-hero-title">
                    Self-taught developer<br />
                    <span className="text-[var(--accent-primary)]">from Bangladesh</span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="ab-hero-bio">
                    I'm a <strong>{age}-year-old</strong> student and self-taught web developer &amp; designer from
                    Nilphamari, Bangladesh. I build clean, fast, and meaningful digital experiences —
                    always with <strong>Islamic &amp; ethical principles</strong> guiding every decision.
                  </motion.p>

                  {/* Quick facts row */}
                  <motion.div variants={fadeUp} className="ab-quick-facts">
                    <div className="ab-qf-item">
                      <FontAwesomeIcon icon={faLocationDot} style={{ color: '#3B82F6' }} />
                      <span>Nilphamari, Bangladesh</span>
                    </div>
                    <div className="ab-qf-item">
                      <FontAwesomeIcon icon={faGraduationCap} style={{ color: '#10B981' }} />
                      <span>SSC-26 &middot; SGSC</span>
                    </div>
                    <div className="ab-qf-item">
                      <FontAwesomeIcon icon={faRocket} style={{ color: '#F59E0B' }} />
                      <span>Goal: CSE Engineer</span>
                    </div>
                    <div className="ab-qf-item">
                      <FontAwesomeIcon icon={faCalendar} style={{ color: '#EC4899' }} />
                      <span>Age {age} &middot; Muslim</span>
                    </div>
                  </motion.div>

                  {/* Social row */}
                  <motion.div variants={fadeUp} className="ab-socials">
                    {[
                      { icon: faGithub,   href: SITE_CONFIG.social.github,    label: 'GitHub'    },
                      { icon: faLinkedin, href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
                      { icon: faFacebook, href: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
                      { icon: faInstagram,href: SITE_CONFIG.social.instagram, label: 'Instagram' },
                      { icon: faTelegram, href: SITE_CONFIG.social.telegram,  label: 'Telegram'  },
                      { icon: faEnvelope, href: `mailto:${SITE_CONFIG.owner.email}`, label: 'Email' },
                    ].map(({ icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer"
                        aria-label={label} className="ab-social-btn">
                        <FontAwesomeIcon icon={icon} />
                      </a>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div variants={fadeUp} className="ab-hero-cta">
                    <Link to="/contact" className="btn-primary">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      Get In Touch
                    </Link>
                    <Link to="/projects" className="btn-secondary">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      View Projects
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right — photo + floating stats */}
                <motion.div className="ab-hero-photo-wrap"
                  initial={{ opacity: 0, scale: .92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: .7, ease: [.16,1,.3,1], delay: .15 }}>
                  <div className="ab-photo-frame">
                    <div className="ab-photo-bg" />
                    <img src="/muhtasim-about.webp" alt="Muhtasim Rahman"
                      className="ab-photo-img"
                      onError={e => { e.target.style.display = 'none' }} />
                    <div className="ab-photo-overlay" />
                    <div className="ab-photo-caption">
                      <p className="font-bold text-white font-display">{SITE_CONFIG.owner.displayName}</p>
                      <p className="text-white/60 text-xs mt-0.5">Age {age} &middot; Nilphamari</p>
                    </div>
                  </div>

                  {/* Floating cards */}
                  <motion.div className="ab-float-card ab-fc-dev"
                    animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                    <FontAwesomeIcon icon={faCode} className="ab-fc-icon" style={{ color: '#3B82F6' }} />
                    <p className="ab-fc-val">3+</p>
                    <p className="ab-fc-lbl">Yrs Dev</p>
                  </motion.div>
                  <motion.div className="ab-float-card ab-fc-design"
                    animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                    <FontAwesomeIcon icon={faPalette} className="ab-fc-icon" style={{ color: '#EC4899' }} />
                    <p className="ab-fc-val">6+</p>
                    <p className="ab-fc-lbl">Yrs Design</p>
                  </motion.div>
                  <motion.div className="ab-float-card ab-fc-projects"
                    animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: .5 }}>
                    <FontAwesomeIcon icon={faGlobe} className="ab-fc-icon" style={{ color: '#10B981' }} />
                    <p className="ab-fc-val">16+</p>
                    <p className="ab-fc-lbl">Projects</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div className="ab-scroll-hint"
            animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.div>
        </section>

        {/* ── 2. MY STORY ──────────────────────────────────── */}
        <section className="section section-alt" id="story">
          <div className="container-xl">
            <motion.div className="ab-story-grid"
              initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
              variants={stagger(.1)}>
              <motion.div variants={fadeUp}>
                <SectionLabel text="My Story" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight mb-6">
                  From circuits to<br /><span className="text-[var(--accent-primary)]">clean code</span>
                </h2>
                <div className="ab-quote-block card">
                  <FontAwesomeIcon icon={faQuoteLeft} className="ab-quote-icon" />
                  <p className="ab-quote-text">
                    "My name is Muhtasim Rahman, and I am a student at Saidpur Govt. Science College.
                    I possess a strong passion for programming and web development. I aim to develop
                    impactful websites that seamlessly combine functionality with captivating design —
                    while adhering to ethical and Halal principles in all my work."
                  </p>
                </div>
              </motion.div>
              <motion.div variants={stagger(.1)} className="flex flex-col gap-5">
                {[
                  {
                    icon: faSeedling, color: '#10B981',
                    title: 'Early Spark',
                    text: `From childhood, I was fascinated by technical things — originally dreaming of becoming an electrical engineer. That curiosity eventually led me to discover web development through YouTube tutorials.`,
                  },
                  {
                    icon: faCode, color: '#3B82F6',
                    title: 'Learning in Progress',
                    text: `Self-teaching through YouTube and building real projects has been my path. Even while preparing for SSC exams, I never stopped shipping code — from QR generators to full PWA applications.`,
                  },
                  {
                    icon: faRocket, color: '#F59E0B',
                    title: 'What\'s Next',
                    text: `SSC done, HSC next, then CSE. Every project I ship is a step toward becoming a professional full-stack developer. Quality, ethics, and continuous improvement — always.`,
                  },
                ].map(({ icon, color, title, text }) => (
                  <motion.div key={title} variants={fadeUp} className="ab-story-card card">
                    <div className="ab-story-icon" style={{ background: `${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">{title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{text}</p>
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
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="text-center mb-12">
                <SectionLabel text="Education" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                  Academic <span className="text-[var(--accent-primary)]">Timeline</span>
                </h2>
                <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm">
                  From nursery to SSC — every institution that shaped who I am today.
                </p>
              </motion.div>
            </motion.div>

            <div className="ab-timeline">
              {EDUCATION.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. SKILLS ────────────────────────────────────── */}
        <section className="section section-alt" id="skills" ref={skillsRef}>
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="text-center mb-10">
                <SectionLabel text="Skills & Expertise" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                  What I <span className="text-[var(--accent-primary)]">know</span>
                </h2>
                <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm">
                  Self-rated skills based on real project experience — honest about where I'm strong and where I'm still growing.
                </p>
              </motion.div>
            </motion.div>

            {/* Skill tabs */}
            <div className="ab-skill-tabs">
              {[
                { id: 'dev',    label: 'Programming',   icon: faCode    },
                { id: 'design', label: 'Design',        icon: faPalette },
                { id: 'video',  label: 'Video',         icon: faVideo   },
                { id: 'tools',  label: 'Tools',         icon: faGears   },
              ].map(({ id, label, icon }) => (
                <button key={id} className={`ab-stab${activeSkillTab === id ? ' ab-stab-active' : ''}`}
                  onClick={() => setActiveSkillTab(id)}>
                  <FontAwesomeIcon icon={icon} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="ab-skill-body">
              {/* DEV */}
              {activeSkillTab === 'dev' && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}
                  className="ab-skill-panel">
                  <div className="ab-skill-bars">
                    {DEV_SKILLS.map((sk, i) => (
                      <SkillBar key={sk.name} {...sk} index={i} inView={skillsInView} />
                    ))}
                  </div>
                  <div className="ab-skill-note-box card">
                    <FontAwesomeIcon icon={faBrain} className="text-[var(--accent-primary)] text-lg mb-2" />
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Still Learning</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      As a student, I'm at my learning stage. SSC exams paused deep learning for ~2 years,
                      but I never stopped building. Now with exams done, the real journey begins.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* DESIGN */}
              {activeSkillTab === 'design' && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}
                  className="ab-skill-panel">
                  <div className="ab-grid-skills">
                    {DESIGN_SKILLS.map(({ name, icon, color }) => (
                      <div key={name} className="ab-grid-skill-item card">
                        <div className="ab-gsi-icon" style={{ background: `${color}18`, color }}>
                          <FontAwesomeIcon icon={icon} />
                        </div>
                        <span className="ab-gsi-name">{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ab-skill-note-box card">
                    <FontAwesomeIcon icon={faPalette} className="text-[#EC4899] text-lg mb-2" />
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">6+ Years Experience</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Logo, banner, thumbnail — I've been designing since age 12.
                      Some commercial-grade, all with a focus on clean aesthetics.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* VIDEO */}
              {activeSkillTab === 'video' && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}
                  className="ab-skill-panel">
                  <div className="ab-video-skills">
                    {VIDEO_SKILLS.map(({ name, color }) => (
                      <div key={name} className="ab-video-item card">
                        <div className="ab-vi-dot" style={{ background: color }} />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ab-skill-note-box card">
                    <FontAwesomeIcon icon={faVideo} className="text-[#A855F7] text-lg mb-2" />
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">5+ Years Experience</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      YouTube, Facebook, Shorts, Reels — video editing has been a creative outlet
                      alongside web development since early on.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* TOOLS */}
              {activeSkillTab === 'tools' && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}
                  className="ab-tool-grid">
                  {TOOLS.map(({ name, color, icon }) => (
                    <div key={name} className="ab-tool-item card">
                      <div className="ab-tool-icon" style={{ background: `${color}18`, color }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <span className="ab-tool-name">{name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── 5. LANGUAGE PROFICIENCY ──────────────────────── */}
        <section className="section" id="languages">
          <div className="container-xl">
            <motion.div className="ab-lang-grid"
              initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp}>
                <SectionLabel text="Languages" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight mb-4">
                  Language<br /><span className="text-[var(--accent-primary)]">Proficiency</span>
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Bengali is my native language. I communicate in English for all professional and technical work,
                  and understand Hindi &amp; Urdu conversationally.
                </p>
              </motion.div>
              <motion.div variants={stagger(.1)} className="flex flex-col gap-5">
                {LANGUAGES.map(({ lang, level, pct, color }, i) => (
                  <motion.div key={lang} variants={fadeUp} className="ab-lang-item">
                    <div className="ab-lang-meta">
                      <span className="ab-lang-name">{lang}</span>
                      <span className="ab-lang-level" style={{ color }}>{level}</span>
                    </div>
                    <div className="ab-lang-track">
                      <motion.div className="ab-lang-fill" style={{ background: color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [.16,1,.3,1], delay: i * 0.12 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── 6. VALUES & PERSONALITY ──────────────────────── */}
        <section className="section section-alt" id="values">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="text-center mb-12">
                <SectionLabel text="Who I Am" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                  Values &amp; <span className="text-[var(--accent-primary)]">Personality</span>
                </h2>
              </motion.div>
            </motion.div>

            <div className="ab-values-grid">
              {VALUES.map(({ icon, color, title, desc }) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, ease: [.16,1,.3,1] }}
                  className="ab-value-card card">
                  <div className="ab-vc-icon" style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <h3 className="ab-vc-title">{title}</h3>
                  <p className="ab-vc-desc">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Interests row */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: .2 }}
              className="mt-12">
              <p className="text-center text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-semibold mb-5">
                Interests &amp; Hobbies
              </p>
              <div className="ab-interests">
                {INTERESTS.map(({ icon, label }) => (
                  <div key={label} className="ab-interest-chip card">
                    <FontAwesomeIcon icon={icon} className="text-[var(--accent-primary)]" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 7. GOALS & PLANS ─────────────────────────────── */}
        <section className="section" id="goals">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="text-center mb-12">
                <SectionLabel text="Roadmap" />
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                  Goals &amp; <span className="text-[var(--accent-primary)]">Plans</span>
                </h2>
                <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm">
                  Where I'm headed — short, mid, and long-term.
                </p>
              </motion.div>
            </motion.div>

            <div className="ab-goals-grid">
              {GOALS.map(({ period, subtitle, color, icon, items }, gi) => (
                <motion.div key={period}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, delay: gi * .12 }}
                  className="ab-goal-card card">
                  <div className="ab-goal-header" style={{ borderColor: `${color}33` }}>
                    <div className="ab-goal-icon" style={{ background: `${color}18`, color }}>
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
                        <div className="ab-goal-bullet" style={{ background: color }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. CTA ───────────────────────────────────────── */}
        <section className="section section-alt" id="about-cta">
          <div className="container-xl">
            <motion.div className="ab-cta-box card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .6, ease: [.16,1,.3,1] }}>
              <div className="ab-cta-orb" />
              <div className="ab-cta-content">
                <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Let's Connect</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mb-3">
                  Interested in working together?
                </h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-md">
                  Whether you need a website, a design, or just want to say hello — I'm always open to genuine conversations.
                </p>
                <div className="ab-cta-actions">
                  <Link to="/contact" className="btn-primary">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Get In Touch
                  </Link>
                  <Link to="/projects" className="btn-secondary">
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                    See My Work
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── Styles ────────────────────────────────────────── */}
      <style>{`
        .ab-page { overflow-x: hidden; }

        /* HERO */
        .ab-hero-section {
          position: relative;
          padding-top: calc(var(--navbar-h) + 3rem);
          padding-bottom: 4rem;
          overflow: hidden;
          background: var(--bg-page);
        }
        .ab-hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .ab-orb-1 {
          width: 500px; height: 500px;
          background: rgba(59,130,246,.08);
          top: -100px; left: -150px;
        }
        .ab-orb-2 {
          width: 380px; height: 380px;
          background: rgba(139,92,246,.06);
          bottom: 0; right: -100px;
        }
        .ab-hero-inner { position: relative; z-index: 1; }

        .ab-breadcrumb {
          display: flex; align-items: center; gap: .5rem;
          font-size: .75rem; color: var(--text-tertiary);
          margin-bottom: 2.5rem;
        }
        .ab-bc-link { color: var(--text-tertiary); text-decoration: none; }
        .ab-bc-link:hover { color: var(--accent-primary); }
        .ab-bc-sep { opacity: .4; }
        .ab-bc-current { color: var(--text-secondary); }

        .ab-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .ab-hero-grid { grid-template-columns: 1fr 420px; gap: 4rem; }
        }

        .ab-hero-text { display: flex; flex-direction: column; gap: 1.25rem; }
        .ab-hero-greeting {
          display: inline-flex; align-items: center; gap: .5rem;
          font-size: .75rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: .1em; color: var(--accent-primary);
          background: rgba(59,130,246,.08); border: 1px solid rgba(59,130,246,.2);
          padding: .35rem .75rem; border-radius: var(--radius-full);
          width: fit-content;
        }
        .ab-hero-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          color: var(--text-primary);
        }
        .ab-hero-bio {
          font-size: .9375rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 520px;
        }

        .ab-quick-facts {
          display: flex; flex-wrap: wrap; gap: .75rem;
        }
        .ab-qf-item {
          display: flex; align-items: center; gap: .5rem;
          font-size: .8125rem; color: var(--text-secondary);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: .4rem .85rem; border-radius: var(--radius-full);
        }

        .ab-socials { display: flex; flex-wrap: wrap; gap: .6rem; }
        .ab-social-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: var(--radius-lg);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: .875rem;
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .ab-social-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(59,130,246,.08);
          transform: translateY(-2px);
        }

        .ab-hero-cta { display: flex; flex-wrap: wrap; gap: .75rem; }

        /* Photo */
        .ab-hero-photo-wrap { position: relative; display: flex; justify-content: center; }
        .ab-photo-frame {
          position: relative;
          width: 300px; height: 380px;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          border: 1px solid var(--border-strong);
          box-shadow: var(--shadow-xl);
        }
        @media (min-width: 640px) {
          .ab-photo-frame { width: 340px; height: 430px; }
        }
        .ab-photo-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0F172A, #1E293B 60%, #1E3A8A);
        }
        .ab-photo-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        .ab-photo-overlay {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to top, rgba(2,6,23,.85), transparent);
          pointer-events: none;
        }
        [data-theme="light"] .ab-photo-overlay {
          background: linear-gradient(to top, rgba(248,250,252,.18), transparent);
        }
        .ab-photo-caption {
          position: absolute; bottom: 1rem; left: 1rem;
        }

        /* Floating cards */
        .ab-float-card {
          position: absolute;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-xl);
          padding: .6rem .9rem;
          text-align: center;
          box-shadow: var(--shadow-lg);
          min-width: 72px;
        }
        .ab-fc-icon { font-size: .875rem; display: block; margin-bottom: .2rem; }
        .ab-fc-val {
          font-family: var(--font-display); font-size: 1.1rem; font-weight: 800;
          color: var(--text-primary); line-height: 1;
        }
        .ab-fc-lbl {
          font-size: .6rem; text-transform: uppercase; letter-spacing: .06em;
          color: var(--text-tertiary); margin-top: .15rem;
        }
        .ab-fc-dev     { top: 2rem;   right: -1.5rem; }
        .ab-fc-design  { bottom: 5rem; left: -1.5rem; }
        .ab-fc-projects{ bottom: 1.5rem; right: -1rem; }

        .ab-scroll-hint {
          position: absolute; bottom: 1.25rem; left: 50%; transform: translateX(-50%);
          color: var(--text-tertiary); font-size: .875rem;
        }

        /* STORY */
        .ab-story-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) { .ab-story-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; } }

        .ab-quote-block {
          padding: 1.25rem 1.5rem; position: relative; margin-top: 1rem;
          border-left: 3px solid var(--accent-primary);
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
        }
        .ab-quote-icon {
          color: var(--accent-primary); opacity: .3;
          font-size: 1.25rem; margin-bottom: .5rem; display: block;
        }
        .ab-quote-text {
          font-size: .875rem; line-height: 1.75;
          color: var(--text-secondary); font-style: italic;
        }
        .ab-story-card {
          display: flex; gap: 1rem; padding: 1.1rem; align-items: flex-start;
        }
        .ab-story-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .875rem; flex-shrink: 0;
        }

        /* TIMELINE */
        .ab-timeline {
          position: relative; max-width: 720px; margin: 0 auto;
          padding-left: 2rem;
        }
        .ab-timeline::before {
          content: '';
          position: absolute; left: .5rem; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--accent-primary), transparent);
          opacity: .25;
        }
        .ab-tl-item {
          position: relative; margin-bottom: 2rem; display: flex; gap: 1rem;
        }
        .ab-tl-dot {
          position: absolute; left: -2rem; top: .75rem;
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid var(--accent-primary);
          background: var(--bg-page);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ab-tl-dot-inner {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .ab-tl-card {
          flex: 1; padding: 1rem 1.25rem;
        }
        .ab-tl-header {
          display: flex; flex-wrap: wrap; align-items: flex-start;
          justify-content: space-between; gap: .5rem; margin-bottom: .5rem;
        }
        .ab-tl-school {
          font-size: .9375rem; font-weight: 600; color: var(--text-primary);
        }
        .ab-tl-level {
          font-size: .8125rem; font-weight: 600; margin-top: .15rem;
        }
        .ab-tl-period {
          font-size: .75rem; color: var(--text-tertiary);
          background: var(--bg-surface-2);
          padding: .2rem .6rem; border-radius: var(--radius-full);
          white-space: nowrap;
        }
        .ab-tl-desc {
          font-size: .8125rem; color: var(--text-secondary); line-height: 1.65;
        }
        .ab-tl-current .ab-tl-card {
          border-color: rgba(59,130,246,.3);
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
        }
        .ab-tl-badge {
          display: flex; align-items: center; gap: .35rem;
          font-size: .7rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: .08em; color: var(--accent-primary);
        }
        .ab-tl-dot-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          animation: ab-pulse 1.5s ease-in-out infinite;
        }
        @keyframes ab-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.5); }
        }

        /* SKILLS */
        .ab-skill-tabs {
          display: flex; flex-wrap: wrap; gap: .5rem;
          margin-bottom: 2rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: .35rem; border-radius: var(--radius-xl);
          width: fit-content;
        }
        .ab-stab {
          display: flex; align-items: center; gap: .5rem;
          padding: .5rem 1.1rem; border-radius: var(--radius-lg);
          font-size: .8125rem; font-weight: 500;
          color: var(--text-secondary); cursor: pointer;
          transition: all var(--transition-fast);
          background: transparent; border: none;
        }
        .ab-stab:hover { color: var(--text-primary); }
        .ab-stab-active {
          background: var(--bg-surface-2);
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }

        .ab-skill-panel {
          display: grid; grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .ab-skill-panel { grid-template-columns: 1fr 280px; }
        }
        .ab-skill-bars { display: flex; flex-direction: column; gap: 1rem; }
        .ab-skill-row {}
        .ab-skill-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .4rem;
        }
        .ab-skill-name { font-size: .875rem; font-weight: 500; color: var(--text-primary); }
        .ab-skill-right { display: flex; align-items: center; gap: .75rem; }
        .ab-skill-note { font-size: .7rem; color: var(--text-tertiary); }
        .ab-skill-pct { font-size: .8125rem; font-weight: 600; font-family: var(--font-mono); }
        .ab-skill-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .ab-skill-fill { height: 100%; border-radius: var(--radius-full); }

        .ab-skill-note-box {
          padding: 1.25rem; display: flex; flex-direction: column;
          align-items: flex-start; text-align: left;
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          border-color: rgba(59,130,246,.2);
          align-self: start;
        }

        .ab-grid-skills {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        @media (min-width: 640px) { .ab-grid-skills { grid-template-columns: repeat(3, 1fr); } }
        .ab-grid-skill-item {
          display: flex; align-items: center; gap: .75rem; padding: .85rem 1rem;
        }
        .ab-gsi-icon {
          width: 32px; height: 32px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8125rem; flex-shrink: 0;
        }
        .ab-gsi-name { font-size: .8125rem; font-weight: 500; color: var(--text-primary); }

        .ab-video-skills { display: flex; flex-direction: column; gap: .75rem; }
        .ab-video-item {
          display: flex; align-items: center; gap: .75rem; padding: .85rem 1rem;
          font-size: .875rem; color: var(--text-primary); font-weight: 500;
        }
        .ab-vi-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

        .ab-tool-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        @media (min-width: 640px) { .ab-tool-grid { grid-template-columns: repeat(4, 1fr); } }
        .ab-tool-item {
          display: flex; flex-direction: column; align-items: center;
          gap: .6rem; padding: 1.1rem .75rem; text-align: center;
        }
        .ab-tool-icon {
          width: 40px; height: 40px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .9375rem;
        }
        .ab-tool-name { font-size: .75rem; font-weight: 500; color: var(--text-secondary); }

        /* LANGUAGES */
        .ab-lang-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 768px) { .ab-lang-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; } }
        .ab-lang-item {}
        .ab-lang-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: .4rem;
        }
        .ab-lang-name { font-size: .9375rem; font-weight: 600; color: var(--text-primary); }
        .ab-lang-level { font-size: .8125rem; font-weight: 500; }
        .ab-lang-track {
          height: 8px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .ab-lang-fill { height: 100%; border-radius: var(--radius-full); }

        /* VALUES */
        .ab-values-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .ab-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ab-values-grid { grid-template-columns: repeat(3, 1fr); } }
        .ab-value-card { padding: 1.5rem; display: flex; flex-direction: column; gap: .75rem; }
        .ab-vc-icon {
          width: 44px; height: 44px; border-radius: var(--radius-xl);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
        }
        .ab-vc-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
        .ab-vc-desc { font-size: .8125rem; color: var(--text-secondary); line-height: 1.65; }

        .ab-interests {
          display: flex; flex-wrap: wrap; gap: .6rem; justify-content: center;
        }
        .ab-interest-chip {
          display: flex; align-items: center; gap: .5rem;
          font-size: .8125rem; color: var(--text-secondary);
          padding: .45rem 1rem; border-radius: var(--radius-full);
        }

        /* GOALS */
        .ab-goals-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) { .ab-goals-grid { grid-template-columns: repeat(3, 1fr); } }
        .ab-goal-card { padding: 1.5rem; }
        .ab-goal-header {
          display: flex; align-items: center; gap: 1rem;
          padding-bottom: 1rem; margin-bottom: 1rem;
          border-bottom: 1px solid;
        }
        .ab-goal-icon {
          width: 40px; height: 40px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .875rem; flex-shrink: 0;
        }
        .ab-goal-period { font-size: .9375rem; font-weight: 700; line-height: 1.2; }
        .ab-goal-sub { font-size: .75rem; color: var(--text-tertiary); margin-top: .2rem; }
        .ab-goal-list { display: flex; flex-direction: column; gap: .65rem; }
        .ab-goal-item {
          display: flex; align-items: flex-start; gap: .75rem;
          font-size: .8125rem; color: var(--text-secondary); line-height: 1.5;
        }
        .ab-goal-bullet {
          width: 6px; height: 6px; border-radius: 50%;
          margin-top: .4rem; flex-shrink: 0;
        }

        /* CTA */
        .ab-cta-box {
          position: relative; overflow: hidden;
          padding: 3rem 2rem; text-align: center;
          background: linear-gradient(135deg, rgba(59,130,246,.06), rgba(139,92,246,.04));
          border-color: rgba(59,130,246,.2);
        }
        .ab-cta-orb {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(59,130,246,.08), transparent 70%);
          top: -100px; left: 50%; transform: translateX(-50%);
          border-radius: 50%; pointer-events: none;
        }
        .ab-cta-content { position: relative; z-index: 1; }
        .ab-cta-actions {
          display: flex; flex-wrap: wrap; gap: .75rem;
          justify-content: center; margin-top: 1.5rem;
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center;
          padding: .65rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-size: .875rem; font-weight: 600;
          text-decoration: none; border: none; cursor: pointer;
          transition: all var(--transition-fast);
        }
        .btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(59,130,246,.35); }
        .btn-primary:active { transform: scale(.97); }
        .btn-secondary {
          display: inline-flex; align-items: center;
          padding: .65rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--bg-surface);
          color: var(--text-primary);
          border: 1px solid var(--border-strong);
          font-size: .875rem; font-weight: 600;
          text-decoration: none; cursor: pointer;
          transition: all var(--transition-fast);
        }
        .btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); transform: translateY(-1px); }
        .btn-secondary:active { transform: scale(.97); }
      `}</style>
    </>
  )
}
