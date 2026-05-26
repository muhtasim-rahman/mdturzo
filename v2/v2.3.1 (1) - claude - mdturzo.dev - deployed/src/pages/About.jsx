// ============================================================
// About.jsx — v2.3.1
// Full redesign — all sections rebuilt per spec
// Sections:
//   1. Hero           — hero-back.webp right, minimal left, no badge/scroll
//   2. Story & Info   — descriptive bio + experience stats (new)
//   3. Education      — center timeline (PC), left timeline (mobile), animated scroll line
//   4. Skills         — tabbed + animated bars (home-style)
//   5. Languages      — country flags + animated bars
//   6. Values         — card grid + hobbies chips inside
//   7. Goals          — 3 cards, click ripple, no progress bars
//   8. Find Me Online — new bento-grid layout
//   9. CTA            — shared component (home + about)
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCode, faPalette, faVideo,
  faBrain, faHeart, faArrowRight, faQuoteLeft,
  faEnvelope, faGlobe, faMosque, faDumbbell, faBicycle,
  faBook, faCamera, faLaptopCode, faRocket, faFlag,
  faBullseye, faCalendar, faSeedling, faMountain,
  faHandshake, faShield, faMedal, faGears, faTerminal,
  faDownload, faChevronRight, faCheckCircle, faGamepad,
  faStar, faUsers, faClock, faLightbulb,
  faLink, faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram,
  faTelegram, faYoutube, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'
import CTA from '../components/home/CTA.jsx'

// ── Animation helpers ────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const slideL = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const slideR = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

// ── Static data ──────────────────────────────────────────────

const EDUCATION = [
  { period: '2013 – 2014', school: 'St. Geroza School, Saidpur', level: 'Nursery & KG', desc: 'First steps in formal education.', color: '#10B981' },
  { period: '2015 – 2017', school: 'St. Geroza School, Saidpur', level: 'Class 1, 2 & 3', desc: 'Primary education. Developed curiosity for technology and reading.', color: '#3B82F6' },
  { period: '2018 – 2019', school: 'Tulshiram Govt. Primary School, Saidpur', level: 'Class 4 & 5', desc: 'Completed primary cycle. Top student in science subjects.', color: '#8B5CF6' },
  { period: '2020', school: 'Lions School & College, Saidpur', level: 'Class 6', desc: 'Briefly enrolled before transitioning to SGSC.', color: '#F59E0B' },
  { period: '2021 – 2025', school: 'Saidpur Govt. Science College (SGSC)', level: 'Class 6 – 10', desc: 'Science group. Deepened interest in programming and web development.', color: '#EC4899' },
  { period: '2026', school: 'Saidpur Govt. Science College (SGSC)', level: 'SSC-26', desc: 'SSC exam in progress (mid-2026). Goal: HSC → CSE degree.', color: '#3B82F6', current: true },
]

const DEV_SKILLS = [
  { name: 'AI Tools & Workflows', pct: 90, color: '#10B981', note: 'Coding, design, planning' },
  { name: 'HTML', pct: 80, color: '#F97316', note: 'Semantic markup, layouts' },
  { name: 'CSS', pct: 80, color: '#3B82F6', note: 'Animations, responsive' },
  { name: 'Git & GitHub', pct: 78, color: '#64748B', note: 'Version control' },
  { name: 'Python', pct: 60, color: '#EAB308', note: 'Scripting, learning' },
  { name: 'JavaScript', pct: 45, color: '#F59E0B', note: 'Improving daily' },
  { name: 'Java', pct: 35, color: '#EC4899', note: 'Basic knowledge' },
]

const DESIGN_SKILLS = [
  { name: 'Logo Design', icon: faPalette, color: '#EC4899' },
  { name: 'Banner Design', icon: faPalette, color: '#8B5CF6' },
  { name: 'Thumbnail Design', icon: faCamera, color: '#3B82F6' },
  { name: 'Business Card', icon: faHandshake, color: '#10B981' },
  { name: 'Poster Design', icon: faGlobe, color: '#F59E0B' },
  { name: 'Album / Book Design', icon: faBook, color: '#F97316' },
  { name: 'HTML & CSS Design', icon: faCode, color: '#06B6D4' },
]

const VIDEO_SKILLS = [
  { name: 'YouTube Videos', color: '#EF4444' },
  { name: 'Facebook Videos', color: '#3B82F6' },
  { name: 'Ads & Commercials', color: '#F59E0B' },
  { name: 'Short Videos (Reels/Shorts)', color: '#EC4899' },
  { name: 'Basic Animation Videos', color: '#8B5CF6' },
]

const TOOLS = [
  { name: 'VS Code', color: '#007ACC', icon: faTerminal },
  { name: 'GitHub', color: '#94A3B8', icon: faGithub },
  { name: 'Firebase', color: '#F59E0B', icon: faGears },
  { name: 'Google Sheets API', color: '#10B981', icon: faGlobe },
  { name: 'Browser DevTools', color: '#06B6D4', icon: faCode },
  { name: 'Tailwind CSS', color: '#38BDF8', icon: faCode },
  { name: 'Figma', color: '#A855F7', icon: faPalette },
  { name: 'Odoo', color: '#714B67', icon: faLaptopCode },
]

const LANGUAGES = [
  { lang: 'Bengali (বাংলা)', level: 'Native', pct: 100, color: '#3B82F6', flag: 'bd' },
  { lang: 'English', level: 'Intermediate', pct: 65, color: '#10B981', flag: 'gb' },
  { lang: 'Hindi (हिन्दी)', level: 'Conversational', pct: 55, color: '#F59E0B', flag: 'in' },
  { lang: 'Urdu', level: 'Conversational', pct: 45, color: '#EC4899', flag: 'pk' },
]

const VALUES = [
  { icon: faMosque, color: '#10B981', title: 'Islam First', desc: 'All work follows Islamic & ethical principles. Halal income is non-negotiable.' },
  { icon: faDumbbell, color: '#3B82F6', title: 'Discipline', desc: 'Structured routines, focused sessions, and consistent daily effort.' },
  { icon: faBrain, color: '#8B5CF6', title: 'Useful Knowledge', desc: 'Only learning things with real practical value — no wasted effort.' },
  { icon: faShield, color: '#F59E0B', title: 'Honesty', desc: 'Quality work speaks for itself. No shortcuts, no showing off.' },
  { icon: faMedal, color: '#EC4899', title: 'Perfection', desc: 'Spending whatever time it takes to get things exactly right.' },
  { icon: faUsers, color: '#06B6D4', title: 'Community', desc: 'Building tech that genuinely benefits people around me.' },
]

const HOBBIES = [
  { icon: faMosque, label: 'Prayer (Salah)' },
  { icon: faCode, label: 'Programming' },
  { icon: faDumbbell, label: 'Outdoor Games' },
  { icon: faBicycle, label: 'Cycling' },
  { icon: faGlobe, label: 'Travelling' },
  { icon: faBook, label: 'Reading' },
  { icon: faSeedling, label: 'Learning' },
  { icon: faCamera, label: 'Editing' },
]

const GOALS = [
  {
    period: 'Short-Term', subtitle: '2026', color: '#3B82F6', icon: faFlag,
    items: ['Complete SSC exam (SSC-26)', 'Launch mdturzo.web.app', 'Improve JavaScript skills', 'Begin advanced frameworks'],
  },
  {
    period: 'Mid-Term', subtitle: '2026 – 2028', color: '#10B981', icon: faBullseye,
    items: ['Enroll in HSC (Science group)', 'Master full-stack web dev', 'Start halal freelancing', 'Build real client projects'],
  },
  {
    period: 'Long-Term', subtitle: 'Future', color: '#8B5CF6', icon: faMountain,
    items: ['BSc in Computer Science & Engineering', 'Professional full-stack developer', 'Ethical freelancing career', 'Build beneficial technology'],
  },
]

const SOCIALS = [
  { icon: faGithub,    label: 'GitHub',    handle: 'muhtasim-rahman', url: SITE_CONFIG.social.github,    color: '#94A3B8', bg: '#0D1117', featured: true },
  { icon: faLinkedin,  label: 'LinkedIn',  handle: 'mdturzo999',      url: SITE_CONFIG.social.linkedin,  color: '#0A66C2', bg: '#EFF3FF', featured: true },
  { icon: faYoutube,   label: 'YouTube',   handle: '@mdturzo999',     url: SITE_CONFIG.social.youtube,   color: '#FF0000', bg: '#FFF1F1', featured: true },
  { icon: faFacebook,  label: 'Facebook',  handle: 'mdturzo999',      url: SITE_CONFIG.social.facebook,  color: '#1877F2', bg: '#EFF5FF' },
  { icon: faInstagram, label: 'Instagram', handle: '@mdturzo999',     url: SITE_CONFIG.social.instagram, color: '#E1306C', bg: '#FFF1F8' },
  { icon: faXTwitter,  label: 'X / Twitter', handle: '@mdturzo999',  url: SITE_CONFIG.social.twitter,   color: '#94A3B8', bg: '#F8FAFC' },
  { icon: faTelegram,  label: 'Telegram',  handle: '@mdturzo16',      url: SITE_CONFIG.social.telegram,  color: '#26A5E4', bg: '#F0FAFF' },
  { icon: faTiktok,    label: 'TikTok',    handle: '@mdturzo16',      url: SITE_CONFIG.social.tiktok,    color: '#EE1D52', bg: '#FFF0F3' },
  { icon: faThreads,   label: 'Threads',   handle: '@mdturzo999',     url: SITE_CONFIG.social.threads,   color: '#94A3B8', bg: '#F8FAFC' },
  { icon: faEnvelope,  label: 'Email',     handle: 'mdturzo.dev@gmail.com', url: `mailto:${SITE_CONFIG.owner.email}`, color: '#F59E0B', bg: '#FFFBEB' },
]

// ── Helper components ────────────────────────────────────────

function SectionLabel({ text }) {
  return <p className="ab-section-label">{text}</p>
}

function SkillBar({ name, pct, color, note, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 150)
    return () => clearTimeout(t)
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
          style={{ background: color, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: index * .06 }}
        />
      </div>
    </div>
  )
}

// ── Timeline item ────────────────────────────────────────────
function EduItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`ab-edu-item${item.current ? ' ab-edu-current' : ''}`}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: .5, ease: [.16, 1, .3, 1], delay: index * .07 }}
      data-side={isLeft ? 'left' : 'right'}
    >
      {/* PC left slot */}
      <div className="ab-edu-slot ab-edu-slot-left">
        {isLeft && <EduCard item={item} />}
      </div>

      {/* Center dot */}
      <div className="ab-edu-dot-wrap">
        <div className="ab-edu-dot" style={{ borderColor: item.color, background: item.current ? item.color : 'var(--bg-page)' }}>
          {item.current && <div className="ab-edu-dot-pulse" style={{ background: item.color }} />}
        </div>
      </div>

      {/* PC right slot */}
      <div className="ab-edu-slot ab-edu-slot-right">
        {!isLeft && <EduCard item={item} />}
      </div>

      {/* Mobile-only card (always shows) */}
      <div className="ab-edu-slot-mobile">
        <EduCard item={item} />
      </div>
    </motion.div>
  )
}

function EduCard({ item }) {
  return (
    <div className="ab-edu-card card">
      <div className="ab-edu-card-top">
        <div>
          <p className="ab-edu-school">{item.school}</p>
          <p className="ab-edu-level" style={{ color: item.color }}>{item.level}</p>
        </div>
        <span className="ab-edu-period">{item.period}</span>
        {item.current && (
          <span className="ab-edu-badge" style={{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
            <span className="ab-edu-badge-dot" style={{ background: item.color }} />
            Current
          </span>
        )}
      </div>
      <p className="ab-edu-desc">{item.desc}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function About() {
  const { settings } = useSiteSettings()
  const age = calculateAge()
  const [skillTab, setSkillTab] = useState('dev')
  const skillsRef = useRef(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })

  // Timeline scroll animation
  const timelineRef = useRef(null)
  const { scrollYProgress: tlProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 65%'],
  })
  const lineHeight = useTransform(tlProgress, [0, 1], ['0%', '100%'])

  useEffect(() => { trackPage('About') }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh. Student, creator, and aspiring CSE engineer.`

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={`${SITE_CONFIG.siteURL}/about`} />
        <meta property="og:image" content={SITE_CONFIG.seo.defaultOGImage} />
        <link rel="canonical" href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]))}</script>
      </Helmet>

      <div className="ab-page">

        {/* ══ 1. HERO ══════════════════════════════════════ */}
        <section className="ab-hero" id="about-hero" aria-label="About Hero">

          {/* Background ambience */}
          <div className="ab-hero-tex" aria-hidden="true" />
          <div className="ab-hero-orb ab-orb-1" aria-hidden="true" />
          <div className="ab-hero-orb ab-orb-2" aria-hidden="true" />
          <div className="ab-hero-grad" aria-hidden="true" />

          <div className="ab-hero-inner">

            {/* LEFT — text */}
            <motion.div className="ab-hero-left"
              initial="hidden" animate="show" variants={stagger(.1)}>

              {/* Breadcrumb */}
              <motion.nav variants={fadeUp} className="ab-bc">
                <Link to="/" className="ab-bc-link">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} className="ab-bc-sep" />
                <span className="ab-bc-cur">About</span>
              </motion.nav>

              {/* Small label */}
              <motion.p variants={fadeUp} className="ab-hero-eyebrow">
                — Getting to know me
              </motion.p>

              {/* Name */}
              <motion.h1 variants={fadeUp} className="ab-hero-h1">
                Muhtasim<br />Rahman
                <span className="ab-hero-nick">(Turzo)</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeUp} className="ab-hero-role">
                Web Developer &amp; Designer
              </motion.p>

              {/* Bio */}
              <motion.p variants={fadeUp} className="ab-hero-bio">
                A {age}-year-old self-taught developer from Bangladesh, passionate about building
                clean, fast, and meaningful digital experiences — always guided by
                Islamic &amp; ethical principles.
              </motion.p>

              {/* Quick facts */}
              <motion.div variants={fadeUp} className="ab-hero-facts">
                {[
                  { icon: faLocationDot, text: 'Nilphamari, BD', c: '#10B981' },
                  { icon: faGraduationCap, text: 'SSC-26 · SGSC', c: '#3B82F6' },
                  { icon: faCalendar, text: `Age ${age} · Muslim`, c: '#F59E0B' },
                  { icon: faRocket, text: 'Goal: CSE Engineer', c: '#8B5CF6' },
                ].map(({ icon, text, c }) => (
                  <span key={text} className="ab-fact-pill">
                    <FontAwesomeIcon icon={icon} style={{ color: c }} />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="ab-hero-cta">
                <Link to="/contact" className="ab-cta-primary">
                  <FontAwesomeIcon icon={faHandshake} />
                  Get in Touch
                </Link>
                {settings?.cvEnabled && settings?.cvUrl ? (
                  <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer" className="ab-cta-secondary">
                    <FontAwesomeIcon icon={faDownload} />
                    Download CV
                  </a>
                ) : (
                  <Link to="/projects" className="ab-cta-secondary">
                    <FontAwesomeIcon icon={faGlobe} />
                    View Projects
                  </Link>
                )}
              </motion.div>
            </motion.div>

            {/* RIGHT — hero-back.webp */}
            <motion.div className="ab-hero-right"
              initial={{ opacity: 0, x: 24, scale: .96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: .75, ease: [.16, 1, .3, 1], delay: .15 }}>
              <div className="ab-hero-img-box">
                <div className="ab-hero-img-glow" />
                <div className="ab-hero-img-frame">
                  <img
                    src="/hero-back.webp"
                    alt="Muhtasim Rahman"
                    className="ab-hero-img"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ══ 2. STORY & INFO ══════════════════════════════ */}
        <section className="section section-alt" id="about-story">
          <div className="container-xl">
            <motion.div className="ab-story-wrap"
              initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
              variants={stagger(.1)}>

              {/* Left — quote + story */}
              <motion.div variants={slideL} className="ab-story-left">
                <SectionLabel text="My Story" />
                <h2 className="ab-story-h2">
                  From circuits to<br /><span className="ab-accent-text">clean code</span>
                </h2>
                <div className="ab-quote card">
                  <FontAwesomeIcon icon={faQuoteLeft} className="ab-quote-icon" />
                  <p className="ab-quote-text">
                    "My name is Muhtasim Rahman, and I am a student at Saidpur Govt. Science College.
                    I possess a strong passion for programming and web development. I aim to develop
                    impactful websites that seamlessly combine functionality with captivating design —
                    while adhering to ethical and Halal principles in all my work."
                  </p>
                  <p className="ab-quote-attr">— Muhtasim Rahman, self-written</p>
                </div>
                <p className="ab-story-text">
                  From childhood, Muhtasim was fascinated by technical things — originally dreaming
                  of becoming an electrical engineer. That curiosity shifted toward Computer Science
                  through self-teaching on YouTube and building real projects.
                </p>
                <p className="ab-story-text">
                  Even while preparing for SSC exams, he never stopped shipping code — from QR
                  generators to full PWA exam trackers. Now with exams behind him, the real
                  journey begins: frameworks, freelancing, and eventually CSE.
                </p>
              </motion.div>

              {/* Right — stats + journey cards */}
              <div className="ab-story-right">
                {/* Exp stats */}
                <motion.div variants={stagger(.1)} className="ab-exp-grid">
                  {[
                    { val: settings?.statsYearsDev ?? '3+', lbl: 'Years Dev', icon: faCode, c: '#3B82F6' },
                    { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design', icon: faPalette, c: '#8B5CF6' },
                    { val: '5+', lbl: 'Years Video', icon: faVideo, c: '#EC4899' },
                    { val: settings?.statsProjects ?? '16+', lbl: 'Projects Built', icon: faRocket, c: '#10B981' },
                  ].map(({ val, lbl, icon, c }) => (
                    <motion.div key={lbl} variants={fadeUp} className="ab-exp-card card">
                      <div className="ab-exp-icon" style={{ background: `${c}18`, color: c }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <p className="ab-exp-val" style={{ color: c }}>{val}</p>
                      <p className="ab-exp-lbl">{lbl}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Journey milestones */}
                {[
                  { icon: faSeedling, color: '#10B981', title: 'Early Spark', text: 'Fascinated by technology since childhood. Started with electrical engineering dreams, discovered web dev through YouTube.' },
                  { icon: faCode, color: '#3B82F6', title: 'Learning in Progress', text: 'Self-taught through tutorials and real projects. Built everything from restaurant sites to full PWA applications.' },
                  { icon: faRocket, color: '#F59E0B', title: "What's Next", text: 'SSC done, HSC next, then CSE. Every shipped project is a step toward becoming a professional full-stack developer.' },
                ].map(({ icon, color, title, text }) => (
                  <motion.div key={title} variants={fadeUp} className="ab-journey-card card">
                    <div className="ab-journey-icon" style={{ background: `${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <div>
                      <p className="ab-journey-title">{title}</p>
                      <p className="ab-journey-text">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 3. EDUCATION TIMELINE ════════════════════════ */}
        <section className="section" id="about-education">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="ab-section-head">
                <SectionLabel text="Education" />
                <h2 className="ab-section-h2">
                  Academic <span className="ab-accent-text">Timeline</span>
                </h2>
                <p className="ab-section-sub">From nursery to the dream of CSE — the full journey.</p>
              </motion.div>
            </motion.div>

            <div className="ab-edu-outer" ref={timelineRef}>
              {/* Muted background line */}
              <div className="ab-edu-line-bg" />
              {/* Animated foreground line */}
              <motion.div className="ab-edu-line-active" style={{ height: lineHeight }} />

              {EDUCATION.map((item, i) => (
                <EduItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. SKILLS & EXPERTISE ════════════════════════ */}
        <section className="section section-alt" id="about-skills" ref={skillsRef}>
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="ab-section-head">
                <SectionLabel text="Skills & Expertise" />
                <h2 className="ab-section-h2">
                  What I <span className="ab-accent-text">know</span>
                </h2>
                <p className="ab-section-sub">
                  Self-rated based on real project experience — honest about strengths and areas of growth.
                </p>
              </motion.div>
            </motion.div>

            {/* Tabs */}
            <div className="ab-tabs">
              {[
                { id: 'dev', label: 'Programming', icon: faCode },
                { id: 'design', label: 'Design', icon: faPalette },
                { id: 'video', label: 'Video', icon: faVideo },
                { id: 'tools', label: 'Tools', icon: faGears },
              ].map(({ id, label, icon }) => (
                <button key={id} className={`ab-tab${skillTab === id ? ' ab-tab-active' : ''}`}
                  onClick={() => setSkillTab(id)}>
                  <FontAwesomeIcon icon={icon} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="ab-tab-body">
              {skillTab === 'dev' && (
                <motion.div key="dev" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .3 }} className="ab-skill-panel">
                  <div className="ab-skill-bars">
                    {DEV_SKILLS.map((sk, i) => (
                      <SkillBar key={sk.name} {...sk} index={i} inView={skillsInView} />
                    ))}
                  </div>
                  <div className="ab-skill-note-box card">
                    <FontAwesomeIcon icon={faBrain} style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                    <p className="ab-snb-title">Still Learning</p>
                    <p className="ab-snb-text">
                      As a student, I'm at an early stage. SSC exams slowed deep learning for ~2 years,
                      but I never stopped building. Now the real journey begins.
                    </p>
                  </div>
                </motion.div>
              )}

              {skillTab === 'design' && (
                <motion.div key="design" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .3 }} className="ab-skill-panel">
                  <div className="ab-design-grid">
                    {DESIGN_SKILLS.map(({ name, icon, color }) => (
                      <div key={name} className="ab-design-item card">
                        <div className="ab-di-icon" style={{ background: `${color}18`, color }}>
                          <FontAwesomeIcon icon={icon} />
                        </div>
                        <span className="ab-di-name">{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ab-skill-note-box card">
                    <FontAwesomeIcon icon={faPalette} style={{ color: '#EC4899', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                    <p className="ab-snb-title">6+ Years Experience</p>
                    <p className="ab-snb-text">Logo, banner, thumbnail — designing since age 12. Clean aesthetics, strong eye for detail.</p>
                  </div>
                </motion.div>
              )}

              {skillTab === 'video' && (
                <motion.div key="video" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .3 }} className="ab-skill-panel">
                  <div className="ab-video-list">
                    {VIDEO_SKILLS.map(({ name, color }) => (
                      <div key={name} className="ab-video-item card">
                        <div className="ab-vi-dot" style={{ background: color }} />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ab-skill-note-box card">
                    <FontAwesomeIcon icon={faVideo} style={{ color: '#A855F7', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                    <p className="ab-snb-title">5+ Years Experience</p>
                    <p className="ab-snb-text">YouTube, Facebook, Reels, Shorts — video editing as a creative outlet alongside development.</p>
                  </div>
                </motion.div>
              )}

              {skillTab === 'tools' && (
                <motion.div key="tools" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .3 }} className="ab-tools-grid">
                  {TOOLS.map(({ name, color, icon }) => (
                    <div key={name} className="ab-tool-card card">
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

        {/* ══ 5. LANGUAGE PROFICIENCY ══════════════════════ */}
        <section className="section" id="about-languages">
          <div className="container-xl">
            <motion.div className="ab-lang-wrap"
              initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>

              <motion.div variants={fadeUp}>
                <SectionLabel text="Languages" />
                <h2 className="ab-lang-h2">
                  Language<br /><span className="ab-accent-text">Proficiency</span>
                </h2>
                <p className="ab-lang-intro">
                  Bengali is my native language. I communicate in English for all professional work,
                  and understand Hindi &amp; Urdu conversationally.
                </p>
              </motion.div>

              <motion.div variants={stagger(.12)} className="ab-lang-bars">
                {LANGUAGES.map(({ lang, level, pct, color, flag }, i) => (
                  <motion.div key={lang} variants={fadeUp} className="ab-lang-item">
                    <div className="ab-lang-meta">
                      <div className="ab-lang-name-row">
                        <img
                          src={`https://flagcdn.com/24x18/${flag}.webp`}
                          alt={lang}
                          width="24" height="18"
                          className="ab-lang-flag"
                          loading="lazy"
                        />
                        <span className="ab-lang-name">{lang}</span>
                      </div>
                      <span className="ab-lang-level" style={{ color, background: `${color}18`, border: `1px solid ${color}33` }}>
                        {level}
                      </span>
                    </div>
                    <div className="ab-lang-track">
                      <motion.div
                        className="ab-lang-fill"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)`, boxShadow: `0 0 8px ${color}44` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: i * .1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ══ 6. VALUES & PERSONALITY ══════════════════════ */}
        <section className="section section-alt" id="about-values">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="ab-section-head">
                <SectionLabel text="Who I Am" />
                <h2 className="ab-section-h2">
                  Values &amp; <span className="ab-accent-text">Personality</span>
                </h2>
                <p className="ab-section-sub">What drives me, what I believe in, and how I approach life and work.</p>
              </motion.div>
            </motion.div>

            <div className="ab-values-grid">
              {VALUES.map(({ icon, color, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, delay: i * .07 }}
                  className="ab-value-card card">
                  <div className="ab-vc-icon" style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <h3 className="ab-vc-title">{title}</h3>
                  <p className="ab-vc-desc">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Hobbies inside values section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: .2 }}
              className="ab-hobbies-wrap">
              <p className="ab-hobbies-title">
                <FontAwesomeIcon icon={faHeart} style={{ color: '#EC4899', marginRight: '.5rem' }} />
                Hobbies &amp; Interests
              </p>
              <div className="ab-hobbies-chips">
                {HOBBIES.map(({ icon, label }) => (
                  <span key={label} className="ab-hobby-chip">
                    <FontAwesomeIcon icon={icon} style={{ color: 'var(--accent-primary)', fontSize: '.75rem' }} />
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 7. GOALS & PLANS ══════════════════════════════ */}
        <section className="section" id="about-goals">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="ab-section-head">
                <SectionLabel text="Where I'm Headed" />
                <h2 className="ab-section-h2">
                  Goals &amp; <span className="ab-accent-text">Plans</span>
                </h2>
                <p className="ab-section-sub">Short, mid, and long-term ambitions — building toward a meaningful career.</p>
              </motion.div>
            </motion.div>

            <div className="ab-goals-grid">
              {GOALS.map(({ period, subtitle, color, icon, items }, gi) => (
                <motion.div key={period}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: .5, delay: gi * .1 }}
                  className="ab-goal-card card">
                  <div className="ab-goal-accent" style={{ background: color }} />
                  <div className="ab-goal-head">
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. FIND ME ONLINE ════════════════════════════ */}
        <section className="section section-alt" id="about-social">
          <div className="container-xl">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
              <motion.div variants={fadeUp} className="ab-section-head">
                <SectionLabel text="Connect" />
                <h2 className="ab-section-h2">
                  Find Me <span className="ab-accent-text">Online</span>
                </h2>
                <p className="ab-section-sub">Reach out, follow along, or just say hello — I'm active across all these platforms.</p>
              </motion.div>
            </motion.div>

            {/* Featured platforms (big cards) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5 }}
              className="ab-social-featured">
              {SOCIALS.filter(s => s.featured).map(({ icon, label, handle, url, color }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="ab-social-big card"
                  style={{ '--sc': color }}>
                  <FontAwesomeIcon icon={icon} className="ab-sbig-icon" style={{ color }} />
                  <div className="ab-sbig-info">
                    <p className="ab-sbig-label">{label}</p>
                    <p className="ab-sbig-handle">{handle}</p>
                  </div>
                  <div className="ab-sbig-arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Other platforms (small grid) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: .15 }}
              className="ab-social-grid">
              {SOCIALS.filter(s => !s.featured).map(({ icon, label, handle, url, color }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="ab-social-card card"
                  style={{ '--sc': color }}>
                  <FontAwesomeIcon icon={icon} className="ab-sc-icon" style={{ color }} />
                  <div>
                    <p className="ab-sc-label">{label}</p>
                    <p className="ab-sc-handle">{handle}</p>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="ab-sc-arrow" />
                </a>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══ 9. CTA (shared component) ═══════════════════ */}
        <CTA />

      </div>

      {/* ══ STYLES ══════════════════════════════════════════ */}
      <style>{`
        .ab-page { overflow-x: hidden; }

        /* ── SECTION HEADERS ─────────────────────── */
        .ab-section-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono);
          font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .ab-section-head { text-align: center; margin-bottom: 3rem; }
        .ab-section-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15;
          margin-bottom: .6rem;
        }
        .ab-section-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }
        .ab-accent-text {
          color: var(--accent-primary);
        }

        /* ── HERO ────────────────────────────────── */
        .ab-hero {
          position: relative;
          min-height: 100dvh;
          display: flex; align-items: center;
          overflow: hidden;
          background: var(--bg-page);
        }
        .ab-hero-tex {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(59,130,246,.05) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%);
        }
        [data-theme=light] .ab-hero-tex {
          background-image:
            radial-gradient(rgba(37,99,235,.06) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.04) 1px, transparent 1px);
        }
        .ab-hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .ab-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,.14) 0%, transparent 70%);
          top: -100px; left: -120px;
        }
        .ab-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(99,102,241,.09) 0%, transparent 70%);
          bottom: 0; right: 5%;
        }
        [data-theme=light] .ab-orb-1 {
          background: radial-gradient(circle, rgba(37,99,235,.05) 0%, transparent 70%);
        }
        .ab-hero-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          pointer-events: none; z-index: 2;
          background: linear-gradient(to top, var(--bg-page) 0%, rgba(2,6,23,.4) 30%, transparent 100%);
        }
        [data-theme=light] .ab-hero-grad {
          background: linear-gradient(to top, var(--bg-page) 0%, rgba(240,244,248,.5) 30%, transparent 100%);
        }

        /* Hero inner grid */
        .ab-hero-inner {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          width: 100%; max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          padding-top: calc(var(--navbar-h) + clamp(3rem, 7vh, 5rem));
          padding-bottom: clamp(3rem, 6vh, 5rem);
          min-height: 100dvh;
        }

        /* Left content */
        .ab-hero-left {
          display: flex; flex-direction: column; gap: 1.1rem;
          position: relative; z-index: 6;
        }

        /* Breadcrumb */
        .ab-bc {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .ab-bc-link { color: var(--text-tertiary); text-decoration: none; transition: color .15s; }
        .ab-bc-link:hover { color: var(--accent-primary); }
        .ab-bc-sep { font-size: .5rem; opacity: .5; }
        .ab-bc-cur { color: var(--text-secondary); }

        /* Eyebrow */
        .ab-hero-eyebrow {
          font-size: .78rem; font-weight: 500;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .04em; margin-bottom: -.2rem;
        }

        /* Heading */
        .ab-hero-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.05; letter-spacing: -.03em;
          color: var(--text-primary);
          position: relative;
        }
        .ab-hero-nick {
          display: block; font-size: .32em; font-weight: 600;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .05em; margin-top: .3em;
        }

        /* Role / subtitle */
        .ab-hero-role {
          font-size: clamp(.85rem, 1.3vw, 1rem);
          color: var(--text-secondary); font-weight: 500;
        }

        /* Bio */
        .ab-hero-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.75;
          max-width: 460px;
        }

        /* Fact pills */
        .ab-hero-facts {
          display: flex; flex-wrap: wrap; gap: .5rem;
        }
        .ab-fact-pill {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .3rem .75rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .75rem; color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        /* CTA buttons */
        .ab-hero-cta { display: flex; flex-wrap: wrap; gap: .65rem; }
        .ab-cta-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease;
          box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .ab-cta-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .ab-cta-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--border-strong);
          transition: all .2s ease;
        }
        .ab-cta-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* RIGHT — hero image */
        .ab-hero-right {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: flex-end;
          opacity: 0; animation: ab-vis-in .8s cubic-bezier(.16,1,.3,1) .2s forwards;
        }
        @keyframes ab-vis-in {
          from { opacity: 0; transform: translateX(20px) scale(.96); }
          to   { opacity: 1; transform: none; }
        }

        .ab-hero-img-box {
          position: relative;
          width: clamp(280px, 36vw, 480px);
          height: clamp(380px, 46vw, 620px);
          flex-shrink: 0;
        }
        .ab-hero-img-glow {
          position: absolute; inset: 8% 10%; z-index: 0;
          border-radius: 24px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.2) 0%, transparent 70%);
          filter: blur(28px); pointer-events: none;
        }
        [data-theme=light] .ab-hero-img-glow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        .ab-hero-img-frame {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          overflow: hidden;
        }
        /* Same gradient as home hero */
        .ab-hero-img-frame::after {
          content: ''; position: absolute; z-index: 2; pointer-events: none;
          bottom: -5px; left: -1px; right: -1px; height: calc(38% + 5px);
          background: linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 6%, rgba(2,6,23,.7) 32%, transparent 100%);
        }
        [data-theme=light] .ab-hero-img-frame::after {
          background: linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 5%, rgba(240,244,248,.8) 30%, transparent 100%);
        }
        .ab-hero-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        [data-theme=dark] .ab-hero-img {
          filter: drop-shadow(0 8px 30px rgba(0,0,0,.4));
        }

        /* Hero responsive */
        @media (max-width: 900px) {
          .ab-hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            align-items: start;
            padding-top: calc(var(--navbar-h) + 2.5rem);
            padding-bottom: 3rem;
            min-height: unset;
            gap: 2rem;
          }
          .ab-hero-left { align-items: center; order: 2; }
          .ab-hero-right { order: 1; justify-content: center; animation: none; opacity: 1; }
          .ab-hero-bio { max-width: 70%; }
          .ab-hero-facts, .ab-hero-cta { justify-content: center; }
          .ab-hero-img-box {
            width: clamp(200px, 55vw, 300px);
            height: clamp(220px, 60vw, 330px);
          }
          /* NO rounded frame on tablet/mobile — just top/left/right gradient fade */
          .ab-hero-img-frame { border-radius: 0; }
          .ab-hero-img-frame::after {
            height: 50%;
          }
          /* Left side gradient fade on mobile */
          .ab-hero-img-frame::before {
            content: ''; position: absolute; z-index: 2; pointer-events: none;
            top: 0; bottom: 0; left: -2px; width: 30%;
            background: linear-gradient(to right, var(--bg-page) 0%, transparent 100%);
          }
        }
        @media (max-width: 480px) {
          .ab-hero-img-box { width: clamp(180px, 70vw, 260px); height: clamp(200px, 75vw, 290px); }
          .ab-hero-h1 { font-size: clamp(2rem, 10vw, 2.6rem); }
        }

        /* btn-primary + btn-secondary (used in story CTA) */
        .btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.5rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .875rem; text-decoration: none;
          transition: all .2s ease;
        }
        .btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.5rem; border-radius: var(--radius-lg);
          background: var(--bg-surface); color: var(--text-primary);
          border: 1px solid var(--border-strong);
          font-weight: 600; font-size: .875rem; text-decoration: none;
          transition: all .2s ease;
        }
        .btn-secondary:hover { border-color: var(--accent-primary); background: var(--accent-light); }

        /* ── STORY SECTION ────────────────────────── */
        .ab-story-wrap {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) {
          .ab-story-wrap { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        }
        .ab-story-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .ab-quote {
          padding: 1.25rem 1.5rem;
          border-left: 3px solid var(--accent-primary);
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
          margin-bottom: 1.25rem; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        .ab-quote-icon {
          color: var(--accent-primary); opacity: .3;
          font-size: 1.2rem; margin-bottom: .5rem; display: block;
        }
        .ab-quote-text {
          font-size: .875rem; line-height: 1.78;
          color: var(--text-secondary); font-style: italic;
          margin-bottom: .75rem;
        }
        .ab-quote-attr {
          font-size: .75rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .ab-story-text {
          font-size: .875rem; color: var(--text-secondary);
          line-height: 1.78; margin-bottom: .85rem;
        }
        .ab-story-right { display: flex; flex-direction: column; gap: 1rem; }
        .ab-exp-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .75rem; margin-bottom: .5rem;
        }
        .ab-exp-card {
          padding: 1.1rem; text-align: center; display: flex;
          flex-direction: column; align-items: center; gap: .5rem;
        }
        .ab-exp-icon {
          width: 38px; height: 38px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem;
        }
        .ab-exp-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.5rem; line-height: 1;
        }
        .ab-exp-lbl { font-size: .7rem; color: var(--text-secondary); font-weight: 500; }
        .ab-journey-card {
          display: flex; align-items: flex-start; gap: .85rem; padding: 1rem 1.1rem;
        }
        .ab-journey-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0; margin-top: .1rem;
        }
        .ab-journey-title {
          font-size: .875rem; font-weight: 600; color: var(--text-primary);
          margin-bottom: .3rem;
        }
        .ab-journey-text { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; }

        /* ── EDUCATION TIMELINE ───────────────────── */
        .ab-edu-outer {
          position: relative; max-width: 860px; margin: 0 auto;
          padding-top: .5rem; padding-bottom: 1rem;
        }

        /* Center line (PC) */
        .ab-edu-line-bg, .ab-edu-line-active {
          position: absolute; left: 50%; top: 0;
          transform: translateX(-50%);
          width: 2px; pointer-events: none;
        }
        .ab-edu-line-bg {
          bottom: 0;
          background: var(--border-color);
          opacity: .5;
        }
        .ab-edu-line-active {
          top: 0;
          background: linear-gradient(180deg, var(--accent-primary) 0%, #8B5CF6 100%);
          transform-origin: top center;
          transform: translateX(-50%);
        }

        /* Timeline item */
        .ab-edu-item {
          display: grid;
          grid-template-columns: 1fr 36px 1fr;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
        }
        .ab-edu-slot-mobile { display: none; }
        .ab-edu-slot { display: block; }

        /* Center dot */
        .ab-edu-dot-wrap {
          display: flex; justify-content: center;
          z-index: 2;
        }
        .ab-edu-dot {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2.5px solid;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .ab-edu-dot-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          animation: ab-edu-p 1.5s ease-in-out infinite;
        }
        @keyframes ab-edu-p {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.5); }
        }

        /* Card */
        .ab-edu-card { padding: 1rem 1.25rem; }
        .ab-edu-card-top {
          display: flex; flex-wrap: wrap; align-items: flex-start;
          justify-content: space-between; gap: .4rem; margin-bottom: .45rem;
        }
        .ab-edu-school { font-size: .875rem; font-weight: 600; color: var(--text-primary); }
        .ab-edu-level { font-size: .8125rem; font-weight: 600; margin-top: .1rem; }
        .ab-edu-period {
          font-size: .72rem; color: var(--text-tertiary);
          background: var(--bg-surface-2); padding: .18rem .55rem;
          border-radius: var(--radius-full); white-space: nowrap;
        }
        .ab-edu-badge {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .67rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: .07em; padding: .15rem .55rem;
          border-radius: var(--radius-full);
        }
        .ab-edu-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          animation: ab-edu-p 1.5s ease-in-out infinite;
        }
        .ab-edu-desc { font-size: .8rem; color: var(--text-secondary); line-height: 1.6; }
        .ab-edu-current .ab-edu-card {
          border-color: rgba(59,130,246,.3);
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
        }

        /* Mobile: collapse to left timeline */
        @media (max-width: 720px) {
          .ab-edu-line-bg, .ab-edu-line-active {
            left: 10px; transform: none;
          }
          .ab-edu-item {
            grid-template-columns: 24px 1fr;
            grid-template-areas: 'dot mobile';
          }
          .ab-edu-slot-left, .ab-edu-slot-right { display: none; }
          .ab-edu-dot-wrap { grid-area: dot; justify-content: flex-start; }
          .ab-edu-dot { width: 14px; height: 14px; }
          .ab-edu-slot-mobile { display: block; grid-area: mobile; }
        }

        /* ── SKILLS ───────────────────────────────── */
        .ab-tabs {
          display: flex; flex-wrap: wrap; gap: .4rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          padding: .35rem; border-radius: var(--radius-xl);
          width: fit-content; margin-bottom: 2rem;
        }
        .ab-tab {
          display: flex; align-items: center; gap: .45rem;
          padding: .5rem 1.1rem; border-radius: var(--radius-lg);
          font-size: .8rem; font-weight: 500; color: var(--text-secondary);
          cursor: pointer; background: transparent; border: none;
          transition: all var(--transition-fast);
        }
        .ab-tab:hover { color: var(--text-primary); }
        .ab-tab-active {
          background: var(--bg-surface-2); color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }
        .ab-tab-body { min-height: 260px; }
        .ab-skill-panel {
          display: grid; grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) { .ab-skill-panel { grid-template-columns: 1fr 280px; } }
        .ab-skill-bars { display: flex; flex-direction: column; gap: 1rem; }
        .ab-skill-row {}
        .ab-skill-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .4rem;
        }
        .ab-skill-name { font-size: .875rem; font-weight: 500; color: var(--text-primary); }
        .ab-skill-right { display: flex; align-items: center; gap: .65rem; }
        .ab-skill-note { font-size: .7rem; color: var(--text-tertiary); }
        .ab-skill-pct { font-size: .8rem; font-weight: 600; font-family: var(--font-mono); }
        .ab-skill-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .ab-skill-fill { height: 100%; border-radius: var(--radius-full); }
        .ab-skill-note-box {
          padding: 1.25rem; display: flex; flex-direction: column;
          align-items: flex-start;
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          border-color: rgba(59,130,246,.2);
          align-self: start;
        }
        .ab-snb-title { font-size: .875rem; font-weight: 600; color: var(--text-primary); margin-bottom: .4rem; }
        .ab-snb-text { font-size: .78rem; color: var(--text-secondary); line-height: 1.65; }

        /* Design grid */
        .ab-design-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: .65rem;
        }
        @media (min-width: 640px) { .ab-design-grid { grid-template-columns: repeat(3, 1fr); } }
        .ab-design-item {
          display: flex; align-items: center; gap: .7rem; padding: .85rem 1rem;
        }
        .ab-di-icon {
          width: 32px; height: 32px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0;
        }
        .ab-di-name { font-size: .8rem; font-weight: 500; color: var(--text-primary); }

        /* Video list */
        .ab-video-list { display: flex; flex-direction: column; gap: .65rem; }
        .ab-video-item {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem; font-size: .875rem;
          color: var(--text-primary); font-weight: 500;
        }
        .ab-vi-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

        /* Tools grid */
        .ab-tools-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: .65rem;
        }
        @media (min-width: 640px) { .ab-tools-grid { grid-template-columns: repeat(4, 1fr); } }
        .ab-tool-card {
          display: flex; flex-direction: column; align-items: center;
          gap: .55rem; padding: 1.1rem .75rem; text-align: center;
        }
        .ab-tool-icon {
          width: 40px; height: 40px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem;
        }
        .ab-tool-name { font-size: .75rem; font-weight: 500; color: var(--text-secondary); }

        /* ── LANGUAGES ────────────────────────────── */
        .ab-lang-wrap {
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .ab-lang-wrap { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        }
        .ab-lang-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: 1rem;
        }
        .ab-lang-intro {
          font-size: .875rem; color: var(--text-secondary); line-height: 1.75;
        }
        .ab-lang-bars { display: flex; flex-direction: column; gap: 1.4rem; }
        .ab-lang-item {}
        .ab-lang-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .5rem; gap: .5rem;
        }
        .ab-lang-name-row { display: flex; align-items: center; gap: .65rem; }
        .ab-lang-flag {
          border-radius: 3px; object-fit: cover; flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,.2);
        }
        .ab-lang-name { font-size: .9375rem; font-weight: 600; color: var(--text-primary); }
        .ab-lang-level {
          font-size: .72rem; font-weight: 600; padding: .18rem .6rem;
          border-radius: var(--radius-full); white-space: nowrap;
          font-family: var(--font-mono);
        }
        .ab-lang-track {
          height: 8px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .ab-lang-fill { height: 100%; border-radius: var(--radius-full); }

        /* ── VALUES ───────────────────────────────── */
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem; margin-bottom: 2rem;
        }
        .ab-value-card { padding: 1.5rem; height: 100%; }
        .ab-vc-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .95rem; margin-bottom: .85rem;
        }
        .ab-vc-title { font-size: .9rem; font-weight: 700; color: var(--text-primary); margin-bottom: .35rem; }
        .ab-vc-desc { font-size: .82rem; color: var(--text-secondary); line-height: 1.65; }

        /* Hobbies */
        .ab-hobbies-wrap {
          padding: 1.5rem; border-radius: var(--radius-xl);
          background: var(--bg-surface); border: 1px solid var(--border-color);
        }
        .ab-hobbies-title {
          font-size: .875rem; font-weight: 600; color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .ab-hobbies-chips { display: flex; flex-wrap: wrap; gap: .5rem; }
        .ab-hobby-chip {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .35rem .85rem; border-radius: var(--radius-full);
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          font-size: .8rem; color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .ab-hobby-chip:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* ── GOALS ────────────────────────────────── */
        .ab-goals-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .ab-goal-card {
          padding: 1.75rem; position: relative; overflow: hidden; height: 100%;
        }
        .ab-goal-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
        }
        .ab-goal-head {
          display: flex; align-items: center; gap: .75rem; margin-bottom: 1.25rem;
        }
        .ab-goal-icon {
          width: 38px; height: 38px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem; flex-shrink: 0;
        }
        .ab-goal-period { font-weight: 700; font-size: .9rem; color: var(--text-primary); }
        .ab-goal-sub { font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono); margin-top: .15rem; }
        .ab-goal-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .6rem; }
        .ab-goal-item {
          display: flex; align-items: flex-start; gap: .6rem;
          font-size: .83rem; color: var(--text-secondary); line-height: 1.5;
        }
        .ab-goal-bullet {
          width: 7px; height: 7px; border-radius: 50%;
          flex-shrink: 0; margin-top: .35rem;
        }

        /* ── FIND ME ONLINE ───────────────────────── */
        .ab-social-featured {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin-bottom: 1rem;
        }
        @media (max-width: 768px) { .ab-social-featured { grid-template-columns: 1fr; } }
        @media (min-width: 480px) and (max-width: 768px) { .ab-social-featured { grid-template-columns: 1fr 1fr; } }

        .ab-social-big {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.25rem 1.5rem; text-decoration: none;
          transition: all var(--transition-base);
          position: relative; overflow: hidden;
        }
        .ab-social-big:hover {
          border-color: var(--sc, var(--accent-primary));
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,.15);
        }
        .ab-sbig-icon { font-size: 1.5rem; flex-shrink: 0; }
        .ab-sbig-info { flex: 1; }
        .ab-sbig-label {
          font-size: .875rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .1rem;
        }
        .ab-sbig-handle { font-size: .75rem; color: var(--text-tertiary); font-family: var(--font-mono); }
        .ab-sbig-arrow {
          font-size: .75rem; color: var(--text-tertiary);
          transition: transform .2s, color .2s;
          opacity: .5;
        }
        .ab-social-big:hover .ab-sbig-arrow {
          transform: translateX(3px); color: var(--sc, var(--accent-primary)); opacity: 1;
        }

        .ab-social-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        @media (min-width: 640px) { .ab-social-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 900px) { .ab-social-grid { grid-template-columns: repeat(4, 1fr); } }

        .ab-social-card {
          display: flex; align-items: center; gap: .75rem;
          padding: .9rem 1rem; text-decoration: none;
          transition: all var(--transition-base);
        }
        .ab-social-card:hover {
          border-color: var(--sc, var(--accent-primary));
          transform: translateY(-2px);
        }
        .ab-sc-icon { font-size: 1.1rem; flex-shrink: 0; }
        .ab-sc-label { font-size: .8rem; font-weight: 600; color: var(--text-primary); }
        .ab-sc-handle { font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono); }
        .ab-sc-arrow { margin-left: auto; font-size: .65rem; color: var(--text-tertiary); opacity: .4; transition: all .2s; }
        .ab-social-card:hover .ab-sc-arrow { opacity: 1; color: var(--sc, var(--accent-primary)); transform: translateX(2px); }
      `}</style>
    </>
  )
}
