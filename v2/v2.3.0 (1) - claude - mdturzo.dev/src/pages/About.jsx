// About.jsx — v2.3.0
// Full About page — all info from about.md visualized
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faLocationDot, faEnvelope, faBirthdayCake,
  faGraduationCap, faSchool, faCode, faPalette, faVideo,
  faStar, faStarHalfStroke, faHeart, faBook, faGlobe,
  faBullseye, faRocket, faBriefcase, faQuoteLeft,
  faArrowRight, faDownload, faHandshake, faMosque,
  faLaptopCode, faWrench, faMicrochip, faCircleCheck,
  faChevronRight, faTrophy, faUsers, faClock,
  faCheck, faLink, faPencil,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub as faGithubBrand,
  faLinkedin, faFacebook, faInstagram,
  faYoutube, faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import { buildTitle, buildMeta, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { calculateAge, SITE_CONFIG } from '../config/site.config.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'
import { trackPage } from '../services/analytics.js'

// ── Animation helpers ────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
const slideL  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } } }
const slideR  = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } } }
function AnimSection({ children, variants = fadeUp, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >{children}</motion.div>
  )
}

// ── Section header component ─────────────────────────────────
function SectionHeader({ badge, title, sub, light = false }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      {badge && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '.4rem',
          padding: '.3rem .9rem', borderRadius: 'var(--radius-full)',
          background: 'var(--accent-light)', color: 'var(--accent-primary)',
          fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
          marginBottom: '.85rem', fontFamily: 'var(--font-mono)',
        }}>{badge}</span>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
        color: light ? 'var(--text-primary)' : 'var(--text-primary)',
        lineHeight: 1.2, marginBottom: sub ? '.7rem' : 0,
      }}>{title}</h2>
      {sub && <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>{sub}</p>}
    </div>
  )
}

// ── Star Rating display ──────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <FontAwesomeIcon
          key={i}
          icon={i <= Math.floor(rating) ? faStar : (i - 0.5 <= rating ? faStarHalfStroke : faStar)}
          style={{ fontSize: '.65rem', color: i <= Math.floor(rating) ? '#F59E0B' : i - 0.5 <= rating ? '#F59E0B' : 'var(--bg-surface-3)', }}
        />
      ))}
    </span>
  )
}

// ── Skill progress bar ───────────────────────────────────────
function SkillBar({ label, pct, color = 'var(--accent-primary)', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} style={{ marginBottom: '.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem' }}>
        <span style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ fontSize: '.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', background: 'var(--bg-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 'var(--radius-full)', background: color,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function About() {
  const { settings } = useSiteSettings()
  const age = calculateAge()

  useEffect(() => { trackPage('About') }, [])

  const meta = buildMeta({
    title: 'About',
    description: `Learn about Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh.`,
    url: `${SITE_CONFIG.siteURL}/about`,
  })

  const jsonLd = [
    personSchema(),
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]),
  ]

  // ── Data ───────────────────────────────────────────────────
  const programmingSkills = [
    { label: 'AI Tools & Workflows', pct: 90, color: '#8B5CF6' },
    { label: 'HTML', pct: 80, color: '#E34F26' },
    { label: 'CSS', pct: 78, color: '#1572B6' },
    { label: 'Git & GitHub', pct: 75, color: '#F05032' },
    { label: 'Python', pct: 55, color: '#3776AB' },
    { label: 'JavaScript', pct: 42, color: '#F7DF1E' },
    { label: 'Java', pct: 35, color: '#007396' },
  ]

  const tools = [
    { name: 'VS Code', icon: faCode, color: '#007ACC' },
    { name: 'GitHub', icon: faGithubBrand, color: '#F0F6FF' },
    { name: 'Firebase', icon: faRocket, color: '#FFA000' },
    { name: 'Browser DevTools', icon: faWrench, color: '#4CAF50' },
    { name: 'Google Sheets API', icon: faCode, color: '#0F9D58' },
    { name: 'Odoo', icon: faLaptopCode, color: '#714B67' },
  ]

  const designSkills = [
    'Logo Design', 'Banner Design', 'Thumbnail Design',
    'Business Card Design', 'Poster Design', 'Album / Book Design', 'HTML & CSS Design',
  ]

  const videoSkills = [
    'YouTube Videos', 'Facebook Videos', 'Ads & Commercials',
    'Short Videos (Reels/Shorts)', 'Basic Animation Videos',
  ]

  const languages = [
    { lang: 'Bengali (বাংলা)', level: 'Native', pct: 100, color: '#22C55E' },
    { lang: 'English', level: 'Intermediate', pct: 65, color: '#3B82F6' },
    { lang: 'Hindi (हिन्दी)', level: 'Conversational', pct: 50, color: '#F97316' },
    { lang: 'Urdu', level: 'Conversational', pct: 45, color: '#EC4899' },
  ]

  const education = [
    { year: '2013–2014', inst: 'St. Geroza School, Saidpur', detail: 'Nursery & KG', icon: faSchool },
    { year: '2015–2017', inst: 'St. Geroza School, Saidpur', detail: 'Class 1 – 3', icon: faSchool },
    { year: '2018–2019', inst: 'Tulshiram Govt. Primary School, Saidpur', detail: 'Class 4 – 5', icon: faSchool },
    { year: '2020', inst: 'Lions School & College, Saidpur', detail: 'Class 6*', icon: faGraduationCap },
    { year: '2021–2025', inst: 'Saidpur Govt. Science College (SGSC)', detail: 'Class 6 – 10', icon: faGraduationCap },
    { year: 'mid-2026', inst: 'Saidpur Govt. Science College (SGSC)', detail: 'SSC-26 Batch (Ongoing)', icon: faTrophy, current: true },
    { year: '2026–2028', inst: 'To be determined', detail: 'HSC (Planned)', icon: faBook, future: true },
    { year: 'Future', inst: 'Dream Institution', detail: 'BSc in Computer Science & Engineering (CSE)', icon: faRocket, future: true },
  ]

  const values = [
    { icon: faMosque, label: 'Islam First', desc: 'Faith guides every decision — halal income and ethical work only.', color: '#22C55E' },
    { icon: faBullseye, label: 'Perfection', desc: 'I spend as much time as needed to make things just right.', color: '#3B82F6' },
    { icon: faHeart, label: 'Honesty', desc: 'Avoids showing off; prefers quality work to speak for itself.', color: '#EF4444' },
    { icon: faClock, label: 'Discipline', desc: 'Structured routines and focused, distraction-free work sessions.', color: '#F59E0B' },
    { icon: faBook, label: 'Useful Knowledge', desc: 'Only learns things that are practically useful in real life.', color: '#8B5CF6' },
    { icon: faUsers, label: 'Community', desc: 'Building technology that benefits society and people around me.', color: '#06B6D4' },
  ]

  const hobbies = [
    { icon: faMosque, label: 'Prayer (Salah)' },
    { icon: faCode, label: 'Programming' },
    { icon: faBook, label: 'Reading Books' },
    { icon: faGlobe, label: 'Travelling' },
    { icon: faVideo, label: 'Video Editing' },
    { icon: faPalette, label: 'Graphic Design' },
    { icon: faMicrochip, label: 'AI & Tech' },
  ]

  const goals = [
    {
      period: 'Short Term', sub: '2026', color: '#22C55E',
      items: [
        'Successfully complete SSC exams (SSC-26 Batch)',
        'Launch new portfolio: mdturzo.web.app',
        'Continue improving JavaScript & React skills',
        'Build more real-world portfolio projects',
      ]
    },
    {
      period: 'Mid Term', sub: '2026–2028', color: '#3B82F6',
      items: [
        'Enroll in HSC with Science group',
        'Start freelancing in web development & design',
        'Build real client projects and earn halal income',
        'Deep-dive into full-stack development',
      ]
    },
    {
      period: 'Long Term', sub: 'Future', color: '#8B5CF6',
      items: [
        'Study BSc in Computer Science & Engineering (CSE)',
        'Become a professional full-stack developer',
        'Establish an ethical, halal freelancing career',
        'Build beneficial technology for society',
      ]
    },
  ]

  const services = [
    {
      icon: faLaptopCode, title: 'Website Design', color: '#3B82F6',
      desc: 'Visually appealing, responsive, and professional websites tailored to client needs.',
    },
    {
      icon: faPalette, title: 'Graphic Design', color: '#8B5CF6',
      desc: 'Logo, banner, thumbnail, poster and business card design with creative flair.',
    },
    {
      icon: faVideo, title: 'Photo & Video Editing', color: '#EC4899',
      desc: 'YouTube videos, short reels, ads, basic animations and photo retouching.',
    },
  ]

  const expStats = [
    { value: settings?.statsYearsDev ?? '3+', label: 'Years Web Dev', color: '#3B82F6', icon: faCode },
    { value: settings?.statsYearsDesign ?? '6+', label: 'Years Design', color: '#8B5CF6', icon: faPalette },
    { value: '5+', label: 'Years Video Editing', color: '#EC4899', icon: faVideo },
    { value: settings?.statsProjects ?? '16+', label: 'Projects Built', color: '#22C55E', icon: faRocket },
  ]

  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="Muhtasim Rahman, Turzo, about, web developer, Bangladesh, portfolio, designer" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <link rel="canonical" href={meta.url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd[0])}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLd[1])}</script>
      </Helmet>

      {/* ── SECTION 1: About Hero ─────────────────────────── */}
      <section className="section" style={{ paddingTop: 'clamp(3rem,8vw,5rem)', paddingBottom: 'clamp(3rem,8vw,5rem)', position: 'relative', overflow: 'hidden' }}>
        {/* bg orbs */}
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container-xl" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
          {/* Left content */}
          <div>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.75rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              <Link to="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</Link>
              <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '.55rem' }} />
              <span style={{ color: 'var(--accent-primary)' }}>About</span>
            </nav>

            <AnimSection>
              {settings?.availableForWork && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.3rem .85rem', borderRadius: 'var(--radius-full)',
                  background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', marginBottom: '1.25rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E',
                    boxShadow: '0 0 6px #22C55E', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                  <span style={{ fontSize: '.72rem', color: '#22C55E', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Available for Work
                  </span>
                </div>
              )}
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--text-primary)' }}>Muhtasim Rahman</span>
                <span style={{ display: 'block', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  Web Developer &amp; Designer
                </span>
              </h1>
            </AnimSection>

            <AnimSection delay={0.1}>
              <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '580px', marginBottom: '1.5rem' }}>
                A {age}-year-old self-taught developer from Bangladesh, passionate about creating user-friendly and 
                visually stunning websites. I combine technical expertise with creative design, always aiming for 
                perfection with an Islamic & ethical approach to work.
              </p>
            </AnimSection>

            <AnimSection delay={0.15}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginBottom: '1.75rem' }}>
                {[
                  { icon: faLocationDot, text: 'Nilphamari, Bangladesh', color: '#22C55E' },
                  { icon: faBirthdayCake, text: `Age ${age}`, color: '#F59E0B' },
                  { icon: faGraduationCap, text: 'SSC-26 Student', color: '#8B5CF6' },
                  { icon: faMosque, text: 'Muslim', color: '#06B6D4' },
                  { icon: faEnvelope, text: 'mdturzo.dev@gmail.com', color: '#EF4444' },
                ].map(({ icon, text, color }) => (
                  <span key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem',
                    padding: '.35rem .8rem', borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                    fontSize: '.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
                  }}>
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize: '.7rem' }} />
                    {text}
                  </span>
                ))}
              </div>
            </AnimSection>

            <AnimSection delay={0.2}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', alignItems: 'center' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                  padding: '.65rem 1.5rem', borderRadius: 'var(--radius-lg)',
                  background: 'var(--accent-primary)', color: '#fff', fontWeight: 700,
                  fontSize: '.85rem', textDecoration: 'none', transition: 'var(--transition-base)',
                }}>
                  <FontAwesomeIcon icon={faHandshake} />
                  Hire Me
                </Link>
                {settings?.cvEnabled && settings?.cvUrl && (
                  <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                    padding: '.65rem 1.5rem', borderRadius: 'var(--radius-lg)',
                    background: 'transparent', color: 'var(--text-primary)',
                    border: '1px solid var(--border-strong)', fontWeight: 600,
                    fontSize: '.85rem', textDecoration: 'none', transition: 'var(--transition-base)',
                  }}>
                    <FontAwesomeIcon icon={faDownload} />
                    Download CV
                  </a>
                )}
                {/* Social links */}
                <div style={{ display: 'flex', gap: '.4rem', marginLeft: '.25rem' }}>
                  {[
                    { icon: faGithubBrand, url: SITE_CONFIG.social.github, color: '#F0F6FF' },
                    { icon: faLinkedin, url: SITE_CONFIG.social.linkedin, color: '#0A66C2' },
                    { icon: faFacebook, url: SITE_CONFIG.social.facebook, color: '#1877F2' },
                    { icon: faTelegram, url: SITE_CONFIG.social.telegram, color: '#26A5E4' },
                  ].map(({ icon, url, color }) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer" style={{
                      width: '38px', height: '38px', borderRadius: 'var(--radius-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '.9rem',
                      transition: 'var(--transition-base)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '66' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}
                    >
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  ))}
                </div>
              </div>
            </AnimSection>
          </div>

          {/* Right: photo */}
          <AnimSection variants={slideR}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 'clamp(180px, 22vw, 280px)', height: 'clamp(220px, 26vw, 340px)',
                borderRadius: '24px', overflow: 'hidden', position: 'relative',
                border: '2px solid var(--border-strong)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(59,130,246,.15)',
              }}>
                <img src="/muhtasim-about.webp" alt="Muhtasim Rahman"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                />
                <div style={{ display: 'none', width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--bg-surface-2), var(--bg-surface-3))', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: '4rem', color: 'var(--text-tertiary)' }} />
                </div>
                {/* accent bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--accent-primary), #8B5CF6)' }} />
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: '-16px', left: '-20px',
                background: 'var(--bg-surface)', border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-lg)', padding: '.6rem .9rem',
                boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '.5rem',
              }}>
                <FontAwesomeIcon icon={faCode} style={{ color: 'var(--accent-primary)', fontSize: '.9rem' }} />
                <div>
                  <div style={{ fontSize: '.65rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Experience</div>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>3+ Years Dev</div>
                </div>
              </div>
              <div style={{
                position: 'absolute', top: '-14px', right: '-18px',
                background: 'var(--bg-surface)', border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-lg)', padding: '.6rem .9rem',
                boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '.5rem',
              }}>
                <FontAwesomeIcon icon={faPalette} style={{ color: '#8B5CF6', fontSize: '.9rem' }} />
                <div>
                  <div style={{ fontSize: '.65rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Design</div>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>6+ Years</div>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── SECTION 2: Quick Bio & Quote ─────────────────────── */}
      <section className="section section-alt">
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <AnimSection variants={slideL}>
              <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '3px solid var(--accent-primary)' }}>
                <FontAwesomeIcon icon={faQuoteLeft} style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', opacity: .3, marginBottom: '.75rem', display: 'block' }} />
                <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "My name is Muhtasim Rahman, and I am a student at Saidpur Govt. Science College. I possess a 
                  strong passion for programming and web development. With over four years of experience in logo, 
                  banner, and photo editing, as well as specialized skills in video editing, I adeptly blend 
                  technical expertise with a creative flair."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faPencil} style={{ color: 'var(--accent-primary)', fontSize: '.75rem' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>Muhtasim Rahman</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text-tertiary)' }}>Self-written bio, ~2024</div>
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection variants={slideR}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                The Story So Far
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '.9rem', marginBottom: '1rem' }}>
                From childhood, Muhtasim was fascinated by technical things. He originally aspired to become an 
                electrical engineer, but his journey with computers and programming shifted his goal toward 
                Computer Science &amp; Engineering.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '.9rem', marginBottom: '1rem' }}>
                Self-taught primarily through YouTube tutorials and hands-on projects, he built everything from 
                restaurant websites to PWA exam trackers. Despite pausing deeper studies during SSC exam preparations, 
                he never stopped building — now resuming his learning journey with full focus.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '.9rem' }}>
                His approach combines an Islamic ethical framework with a perfectionist mindset — spending as much 
                time as needed to get things right, choosing only halal work, and building technology that 
                genuinely benefits people.
              </p>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Experience Stats ──────────────────────── */}
      <section className="section">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Numbers" title="Experience at a Glance" sub="Years of hands-on work across development, design and creative fields" />
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {expStats.map(({ value, label, color, icon }, i) => (
              <AnimSection key={label} delay={i * 0.1}>
                <div style={{
                  padding: '1.75rem 1.5rem', borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface)', border: `1px solid var(--border-color)`,
                  textAlign: 'center', position: 'relative', overflow: 'hidden',
                  transition: 'var(--transition-base)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}22` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color }} />
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: color + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize: '1.1rem' }} />
                  </div>
                  <div style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-secondary)', marginTop: '.4rem', fontWeight: 500 }}>{label}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Technical Skills ──────────────────────── */}
      <section className="section section-alt">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Skills" title="Technical Skills" sub="Programming, tools and technologies I work with" />
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Programming skills */}
            <AnimSection variants={slideL}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                <FontAwesomeIcon icon={faCode} style={{ color: 'var(--accent-primary)' }} />
                Programming & Web
              </h3>
              {programmingSkills.map((s, i) => (
                <SkillBar key={s.label} label={s.label} pct={s.pct} color={s.color} delay={i * 0.07} />
              ))}
              <p style={{ fontSize: '.78rem', color: 'var(--text-tertiary)', marginTop: '1rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                * Self-rated as of 2026. Currently in a learning phase — improving JS and modern frameworks.
              </p>
            </AnimSection>

            {/* Tools + Languages */}
            <div>
              <AnimSection variants={slideR}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem',
                  display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                  <FontAwesomeIcon icon={faWrench} style={{ color: '#F59E0B' }} />
                  Tools & Platforms
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.6rem', marginBottom: '2rem' }}>
                  {tools.map(({ name, icon, color }) => (
                    <div key={name} style={{
                      display: 'flex', alignItems: 'center', gap: '.6rem',
                      padding: '.65rem .85rem', borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                      fontSize: '.82rem', color: 'var(--text-secondary)',
                    }}>
                      <FontAwesomeIcon icon={icon} style={{ color, fontSize: '.85rem', flexShrink: 0 }} />
                      {name}
                    </div>
                  ))}
                </div>
              </AnimSection>

              <AnimSection variants={slideR} delay={0.1}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem',
                  display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                  <FontAwesomeIcon icon={faGlobe} style={{ color: '#06B6D4' }} />
                  Language Proficiency
                </h3>
                {languages.map((l, i) => (
                  <div key={l.lang} style={{ marginBottom: '.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem' }}>
                      <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{l.lang}</span>
                      <span style={{ fontSize: '.72rem', padding: '.1rem .5rem', borderRadius: 'var(--radius-full)',
                        background: l.color + '18', color: l.color, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                        {l.level}
                      </span>
                    </div>
                    <div style={{ height: '5px', background: 'var(--bg-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${l.pct}%` }} transition={{ duration: .9, delay: i * .1 }}
                        style={{ height: '100%', borderRadius: 'var(--radius-full)', background: l.color }} />
                    </div>
                  </div>
                ))}
              </AnimSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Design & Creative ─────────────────────── */}
      <section className="section">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Creative" title="Design & Video Skills" sub="Beyond coding — a creative side shaped by years of hands-on work" />
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Graphic Design */}
            <AnimSection variants={slideL}>
              <div style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: 'rgba(139,92,246,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faPalette} style={{ color: '#8B5CF6', fontSize: '1.1rem' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Graphic Design</h3>
                    <span style={{ fontSize: '.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>6+ years</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                  {designSkills.map(skill => (
                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.85rem', color: 'var(--text-secondary)' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: '#8B5CF6', fontSize: '.65rem', flexShrink: 0 }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>

            {/* Video Editing */}
            <AnimSection variants={slideR}>
              <div style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: 'rgba(236,72,153,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faVideo} style={{ color: '#EC4899', fontSize: '1.1rem' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Video Editing</h3>
                    <span style={{ fontSize: '.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>5+ years</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                  {videoSkills.map(skill => (
                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.85rem', color: 'var(--text-secondary)' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: '#EC4899', fontSize: '.65rem', flexShrink: 0 }} />
                      {skill}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.25rem', padding: '.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(236,72,153,.06)', border: '1px solid rgba(236,72,153,.15)' }}>
                  <p style={{ fontSize: '.75rem', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>
                    Most skills are at a self-use/learning level. Commercially confident in selected areas like 
                    logo design, thumbnail design, and short video editing.
                  </p>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Education Timeline ────────────────────── */}
      <section className="section section-alt">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Education" title="Academic Journey" sub="From nursery to the dream of CSE — the full story" />
          </AnimSection>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* center line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
              background: 'linear-gradient(180deg, var(--accent-primary), #8B5CF6)',
              transform: 'translateX(-50%)', opacity: .3 }} />

            {education.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <AnimSection key={i} variants={isLeft ? slideL : slideR} delay={i * 0.07}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 48px 1fr', gap: '1rem',
                    alignItems: 'center', marginBottom: '1.5rem',
                  }}>
                    {/* Left slot */}
                    <div style={{ textAlign: 'right', display: isLeft ? 'block' : 'block' }}>
                      {isLeft ? (
                        <div style={{
                          padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)',
                          background: item.current ? 'rgba(59,130,246,.08)' : item.future ? 'rgba(139,92,246,.06)' : 'var(--bg-surface)',
                          border: `1px solid ${item.current ? 'rgba(59,130,246,.3)' : item.future ? 'rgba(139,92,246,.2)' : 'var(--border-color)'}`,
                          textAlign: 'left',
                        }}>
                          <div style={{ fontSize: '.7rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '.3rem' }}>{item.year}</div>
                          <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--text-primary)', marginBottom: '.2rem', lineHeight: 1.3 }}>{item.inst}</div>
                          <div style={{ fontSize: '.78rem', color: item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--text-secondary)' }}>
                            {item.detail}
                            {item.current && <span style={{ marginLeft: '.4rem', fontSize: '.65rem', background: 'rgba(59,130,246,.15)', color: 'var(--accent-primary)', padding: '.1rem .45rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}>CURRENT</span>}
                            {item.future && <span style={{ marginLeft: '.4rem', fontSize: '.65rem', background: 'rgba(139,92,246,.12)', color: '#8B5CF6', padding: '.1rem .45rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}>PLANNED</span>}
                          </div>
                        </div>
                      ) : <span />}
                    </div>

                    {/* Center dot */}
                    <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--bg-surface-2)',
                        border: `2px solid ${item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--border-strong)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: item.current ? '0 0 16px rgba(59,130,246,.4)' : item.future ? '0 0 12px rgba(139,92,246,.3)' : 'none',
                      }}>
                        <FontAwesomeIcon icon={item.icon} style={{ fontSize: '.8rem', color: item.current || item.future ? '#fff' : 'var(--text-tertiary)' }} />
                      </div>
                    </div>

                    {/* Right slot */}
                    <div>
                      {!isLeft ? (
                        <div style={{
                          padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)',
                          background: item.current ? 'rgba(59,130,246,.08)' : item.future ? 'rgba(139,92,246,.06)' : 'var(--bg-surface)',
                          border: `1px solid ${item.current ? 'rgba(59,130,246,.3)' : item.future ? 'rgba(139,92,246,.2)' : 'var(--border-color)'}`,
                        }}>
                          <div style={{ fontSize: '.7rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '.3rem' }}>{item.year}</div>
                          <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--text-primary)', marginBottom: '.2rem', lineHeight: 1.3 }}>{item.inst}</div>
                          <div style={{ fontSize: '.78rem', color: item.current ? 'var(--accent-primary)' : item.future ? '#8B5CF6' : 'var(--text-secondary)' }}>
                            {item.detail}
                            {item.current && <span style={{ marginLeft: '.4rem', fontSize: '.65rem', background: 'rgba(59,130,246,.15)', color: 'var(--accent-primary)', padding: '.1rem .45rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}>CURRENT</span>}
                            {item.future && <span style={{ marginLeft: '.4rem', fontSize: '.65rem', background: 'rgba(139,92,246,.12)', color: '#8B5CF6', padding: '.1rem .45rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}>PLANNED</span>}
                          </div>
                        </div>
                      ) : <span />}
                    </div>
                  </div>
                </AnimSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Values & Personality ─────────────────── */}
      <section className="section">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Who I Am" title="Values & Personality" sub="What drives me, what I believe in, and how I approach life and work" />
          </AnimSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {values.map(({ icon, label, desc, color }, i) => (
              <AnimSection key={label} delay={i * 0.08}>
                <div style={{
                  padding: '1.5rem', borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                  height: '100%', transition: 'var(--transition-base)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: color + '15',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize: '1rem' }} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: '.4rem' }}>{label}</h4>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>

          {/* Hobbies & Interests */}
          <AnimSection>
            <div style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Hobbies & Interests
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
                {hobbies.map(({ icon, label }) => (
                  <span key={label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.45rem',
                    padding: '.4rem .9rem', borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
                    fontSize: '.82rem', color: 'var(--text-secondary)',
                  }}>
                    <FontAwesomeIcon icon={icon} style={{ color: 'var(--accent-primary)', fontSize: '.72rem' }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── SECTION 8: Goals & Future Plans ──────────────────── */}
      <section className="section section-alt">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Vision" title="Goals & Future Plans" sub="Where I'm headed — short, medium and long term ambitions" />
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {goals.map(({ period, sub, color, items }, i) => (
              <AnimSection key={period} delay={i * 0.1}>
                <div style={{
                  padding: '1.75rem', borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                  height: '100%', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: color + '18',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesomeIcon icon={faBullseye} style={{ color, fontSize: '.85rem' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>{period}</div>
                      <div style={{ fontSize: '.7rem', color, fontFamily: 'var(--font-mono)' }}>{sub}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                    {items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', fontSize: '.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color, fontSize: '.75rem', marginTop: '.15rem', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: Services ──────────────────────────────── */}
      <section className="section">
        <div className="container-xl">
          <AnimSection>
            <SectionHeader badge="Services" title="What I Offer" sub="Services available for clients and collaborators" />
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {services.map(({ icon, title, desc, color }, i) => (
              <AnimSection key={title} delay={i * 0.1}>
                <div style={{
                  padding: '2rem', borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                  textAlign: 'center', height: '100%', transition: 'var(--transition-base)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}18` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-xl)', background: color + '15',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize: '1.3rem' }} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text-primary)', marginBottom: '.6rem' }}>{title}</h3>
                  <p style={{ fontSize: '.83rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: CTA ──────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container-xl">
          <AnimSection>
            <div style={{
              textAlign: 'center', padding: 'clamp(2.5rem,6vw,4rem) 2rem',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, rgba(59,130,246,.08) 0%, rgba(139,92,246,.06) 100%)',
              border: '1px solid rgba(59,130,246,.2)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '240px', height: '240px',
                background: 'radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-50px', left: '-30px', width: '200px', height: '200px',
                background: 'radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-block', padding: '.3rem .85rem', borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-light)', color: 'var(--accent-primary)', fontSize: '.7rem',
                  fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>Let's Connect</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.4rem)',
                  color: 'var(--text-primary)', marginBottom: '.75rem', lineHeight: 1.2 }}>
                  Have a project in mind?
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                  I'm currently available for freelance work, collaborations, and interesting projects. 
                  Let's build something meaningful together.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                    padding: '.75rem 2rem', borderRadius: 'var(--radius-lg)',
                    background: 'var(--accent-primary)', color: '#fff', fontWeight: 700,
                    fontSize: '.88rem', textDecoration: 'none', transition: 'var(--transition-base)',
                  }}>
                    <FontAwesomeIcon icon={faHandshake} />
                    Get in Touch
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '.75rem' }} />
                  </Link>
                  <Link to="/projects" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                    padding: '.75rem 2rem', borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface)', color: 'var(--text-primary)',
                    border: '1px solid var(--border-strong)', fontWeight: 600,
                    fontSize: '.88rem', textDecoration: 'none', transition: 'var(--transition-base)',
                  }}>
                    <FontAwesomeIcon icon={faRocket} />
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: .7; }
        }
        @media (max-width: 900px) {
          .about-hero-grid { grid-template-columns: 1fr !important; }
          .about-hero-grid > *:last-child { display: none !important; }
          .about-bio-grid { grid-template-columns: 1fr !important; }
          .about-skills-grid { grid-template-columns: 1fr !important; }
          .about-edu-line { left: 20px !important; }
          .about-edu-item { grid-template-columns: 40px 1fr !important; }
        }
        @media (max-width: 640px) {
          .about-goals-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
