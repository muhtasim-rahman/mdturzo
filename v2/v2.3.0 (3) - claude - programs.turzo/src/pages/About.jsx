// ============================================================
// About.jsx — v2.3.0
// Full About page — about.md এর সব তথ্য visual করে
// Sections:
//   1. AboutHero     — photo, name, bio, stats, CTAs, social
//   2. AboutStory    — journey narrative + milestones
//   3. AboutEducation — education timeline
//   4. AboutSkills   — tech skills (3 tabs)
//   5. AboutLanguages — language proficiency
//   6. AboutServices  — services offered
//   7. AboutValues    — core values + interests
//   8. AboutGoals     — short/mid/long term goals
// ============================================================

import { useEffect, useState, useRef } from 'react'
import { Link }                         from 'react-router-dom'
import { Helmet }                       from 'react-helmet-async'
import { motion, AnimatePresence }      from 'framer-motion'
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faHeart, faCode, faPalette,
  faVideo, faBrain, faLanguage, faGlobe, faHandshake, faBriefcase,
  faLightbulb, faRocket, faBullseye, faCheck, faArrowRight,
  faCalendarDays, faBookOpen, faUser, faStar, faFire, faShieldHalved,
  faDownload, faPaperPlane, faLaptopCode, faPen, faFilm, faMobileScreenButton,
  faCircleCheck, faArrowTrendUp, faClock, faMedal, faTrophy, faSchool,
  faPersonRunning, faBicycle, faEarthAsia, faBook, faWandMagicSparkles,
  faGears, faClipboardList, faComputer, faPenRuler, faCameraRetro,
  faStarOfLife, faHands, faScaleBalanced, faUserGraduate, faFlask,
  faChevronDown, faChevronRight, faMosque, faLeaf, faRibbon, faCrown,
  faAtom, faKeyboard, faFilePen, faMapMarkerAlt, faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube, faLinkedin,
  faTelegram, faXTwitter, faTiktok,
} from '@fortawesome/free-brands-svg-icons'

import { buildTitle }        from '../utils/seo.js'
import { trackPage }         from '../services/analytics.js'
import { useSiteSettings }   from '../hooks/useSiteSettings.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { SkeletonBox, SkeletonText } from '../components/ui/Skeleton.jsx'

// ── Framer Motion variants ──────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// ── Count-up hook ───────────────────────────────────────────
function useCountUp(target, inView, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const frame = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setVal(Math.round(ease * target))
      if (t < 1) requestAnimationFrame(frame)
      else setVal(target)
    }
    requestAnimationFrame(frame)
  }, [inView, target, duration])
  return val
}

// ── Social icon map ─────────────────────────────────────────
const SOCIALS = [
  { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'GitHub',    cls: 'text-[#94A3B8]' },
  { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'LinkedIn',  cls: 'text-[#0A66C2]' },
  { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'Facebook',  cls: 'text-[#1877F2]' },
  { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: 'Instagram', cls: 'text-[#E1306C]' },
  { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: 'YouTube',   cls: 'text-[#FF0000]' },
  { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: 'Telegram',  cls: 'text-[#2AABEE]' },
]

// ──────────────────────────────────────────────────────────────
// 1. ABOUT HERO SECTION
// ──────────────────────────────────────────────────────────────
function AboutHero({ settings, settingsLoading }) {
  const age = calculateAge()
  const statsRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const devYrs    = settingsLoading ? 0 : parseInt(settings?.statsYearsDev    ?? '3') || 3
  const designYrs = settingsLoading ? 0 : parseInt(settings?.statsYearsDesign ?? '6') || 6
  const projCount = settingsLoading ? 0 : parseInt(settings?.statsProjects    ?? '16') || 16

  const devVal    = useCountUp(devYrs,    inView)
  const designVal = useCountUp(designYrs, inView)
  const projVal   = useCountUp(projCount, inView)

  const cvEnabled = settings?.cvEnabled  ?? SITE_CONFIG.defaults.cvEnabled
  const cvUrl     = settings?.cvUrl      ?? SITE_CONFIG.defaults.cvUrl
  const available = settings?.availableForWork ?? SITE_CONFIG.defaults.availableForWork

  return (
    <section className="section" style={{ paddingBottom: '3rem' }} id="about-hero">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Photo ──────────────────────────────────── */}
          <motion.div
            className="relative flex justify-center order-1 lg:order-2"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            {/* Decorative background blob */}
            <div className="absolute -inset-10 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Outer glow ring */}
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Photo frame */}
              <div className="relative w-64 sm:w-72 lg:w-80 xl:w-[340px]">
                {/* Corner accent lines */}
                <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 rounded-tl-xl"
                  style={{ borderColor: 'var(--accent-primary)' }} />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 rounded-br-xl"
                  style={{ borderColor: 'var(--accent-primary)' }} />

                {/* Pulse ring */}
                <div className="absolute -inset-2 rounded-3xl"
                  style={{ border: '1px solid rgba(59,130,246,0.25)', animation: 'aboutPulse 3s ease-in-out infinite' }} />

                {/* Photo */}
                <div className="relative rounded-3xl overflow-hidden border-2 shadow-2xl"
                  style={{ borderColor: 'var(--border-strong)', aspectRatio: '3/4' }}>
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#1E3A8A 100%)',
                  }} />
                  <img
                    src="/muhtasim-about.webp"
                    alt="Muhtasim Rahman"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(2,6,23,0.7) 0%, transparent 55%)',
                  }} />
                  {/* Name badge at bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold font-display text-base">{SITE_CONFIG.owner.displayName}</p>
                    <p className="text-white/60 text-xs mt-0.5">Age {age} · Nilphamari, Bangladesh</p>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -right-5 top-10 card px-3 py-2 shadow-xl text-center min-w-[80px]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="text-base font-display font-extrabold" style={{ color: 'var(--accent-primary)' }}>
                    {devVal}+
                  </div>
                  <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Yrs Dev</div>
                </motion.div>

                <motion.div
                  className="absolute -left-5 bottom-20 card px-3 py-2 shadow-xl text-center min-w-[80px]"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  <div className="text-base font-display font-extrabold" style={{ color: '#10B981' }}>
                    {projVal}+
                  </div>
                  <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Projects</div>
                </motion.div>

                {/* Available badge */}
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: available ? 'rgba(34,197,94,0.12)' : 'rgba(100,116,139,0.12)',
                    border: `1px solid ${available ? 'rgba(34,197,94,0.35)' : 'rgba(100,116,139,0.35)'}`,
                    color: available ? '#22C55E' : '#94A3B8',
                    backdropFilter: 'blur(8px)',
                  }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: available ? '#22C55E' : '#94A3B8',
                    animation: available ? 'availPulse 2s ease-in-out infinite' : 'none',
                    display: 'inline-block', flexShrink: 0,
                  }} />
                  {available ? 'Available for Work' : 'Not Available'}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Text Content ───────────────────────── */}
          <motion.div
            className="flex flex-col gap-5 order-2 lg:order-1"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.07)}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: 'var(--accent-primary)' }}>
              Hello, I&rsquo;m
            </motion.p>

            <motion.div variants={fadeUp}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-display font-extrabold leading-tight"
                style={{ color: 'var(--text-primary)' }}>
                Muhtasim <span style={{ color: 'var(--accent-primary)' }}>Rahman</span>
              </h1>
              <p className="text-lg sm:text-xl font-display font-medium mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Web Developer &amp; Designer from Bangladesh
              </p>
            </motion.div>

            <motion.p variants={fadeUp} className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
              A {age}-year-old self-taught developer passionate about creating user-friendly and visually
              stunning websites. I focus on quality, innovation, and transforming complex ideas into
              simple, elegant solutions — all while adhering to Islamic &amp; ethical principles.
            </motion.p>

            {/* Quick facts */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { icon: faLocationDot,  color: '#3B82F6', label: 'Location',  val: 'Nilphamari, Bangladesh' },
                { icon: faGraduationCap,color: '#10B981', label: 'Education', val: 'SSC-26 · SGSC' },
                { icon: faBullseye,     color: '#F59E0B', label: 'Goal',      val: 'CSE Engineer & Developer' },
                { icon: faMosque,       color: '#A855F7', label: 'Religion',  val: 'Islam (Muslim)' },
              ].map(({ icon, color, label, val }) => (
                <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} className="text-xs" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{val}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} ref={statsRef}
              className="flex items-center gap-5 pt-1">
              {settingsLoading ? (
                <div className="flex gap-5">
                  {[1,2,3].map(i => <SkeletonBox key={i} w="w-20" h="h-10" rounded="rounded-lg" />)}
                </div>
              ) : (
                <>
                  {[
                    { val: devVal,    suf: '+', label: 'Yrs Development', color: 'var(--accent-primary)' },
                    { val: designVal, suf: '+', label: 'Yrs Design',      color: '#10B981' },
                    { val: projVal,   suf: '+', label: 'Projects Built',  color: '#F59E0B' },
                  ].map(({ val, suf, label, color }, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-display font-extrabold leading-none" style={{ color }}>
                        {val}{suf}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest mt-0.5 font-medium"
                        style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                    </div>
                  ))}
                </>
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-[.97]"
                style={{ background: 'var(--accent-primary)' }}>
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                Get In Touch
              </Link>
              {cvEnabled && cvUrl ? (
                <a href={cvUrl} download target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[.97]"
                  style={{ border: '1.5px solid var(--accent-primary)', color: 'var(--accent-primary)', background: 'transparent' }}>
                  <FontAwesomeIcon icon={faDownload} className="text-xs" />
                  Download CV
                </a>
              ) : null}
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex items-center gap-2.5 pt-1">
              {SOCIALS.map(({ icon, url, label, cls }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                  aria-label={label}>
                  <FontAwesomeIcon icon={icon} className={`text-sm ${cls}`} />
                </a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes aboutPulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%       { opacity: 0.5;  transform: scale(1.02); }
        }
        @keyframes availPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 2. STORY / JOURNEY SECTION
// ──────────────────────────────────────────────────────────────
function AboutStory() {
  const MILESTONES = [
    { year: '2017–18', icon: faLaptopCode,  color: '#3B82F6', title: 'First Lines of Code',
      desc: 'Discovered programming through curiosity about how websites work. Started with basic HTML experiments.' },
    { year: '2020',    icon: faPalette,     color: '#EC4899', title: 'Design Journey Begins',
      desc: 'Began learning graphic design — logos, banners, thumbnails. Built a strong creative foundation over 6+ years.' },
    { year: '2021',    icon: faVideo,       color: '#EF4444', title: 'Video Editing',
      desc: 'Started creating and editing YouTube and Facebook videos, ads, and short-form content.' },
    { year: '2022',    icon: faCode,        color: '#10B981', title: 'Web Projects Take Off',
      desc: 'Built first real web projects including PWAs, Firebase-backed apps, and open-source tools.' },
    { year: '2026',    icon: faRocket,      color: '#F59E0B', title: 'New Era Begins',
      desc: 'Completed SSC exams. Relaunching portfolio, expanding skills, starting freelancing journey.' },
  ]

  return (
    <section className="section section-alt" id="about-story">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Text */}
          <motion.div className="flex flex-col gap-5"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.08)}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: 'var(--accent-primary)' }}>My Story</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold leading-tight"
              style={{ color: 'var(--text-primary)' }}>
              A journey driven by<br />
              <span style={{ color: 'var(--accent-primary)' }}>curiosity &amp; purpose</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              From childhood, I was fascinated by technical things — how circuits work, how devices communicate. 
              I originally dreamed of becoming an electrical engineer, but as I discovered programming and design, 
              my path shifted towards Computer Science &amp; Engineering.
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I&rsquo;m entirely self-taught, learning through YouTube tutorials, documentation, and building real projects. 
              Despite pausing intensive study during SSC preparations, I never stopped building. That persistence 
              shaped who I am as a developer.
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Now, with SSC exams done, I&rsquo;m back with full focus — sharpening skills, launching this portfolio, 
              and working toward my dream of becoming a professional full-stack developer. 
              Everything I do is guided by <strong style={{ color: 'var(--text-primary)' }}>Islamic principles</strong> — 
              halal income, honesty, and creating beneficial technology.
            </motion.p>

            {/* Self-written bio quote */}
            <motion.blockquote variants={fadeUp}
              className="p-4 rounded-xl text-sm italic leading-relaxed"
              style={{
                background: 'linear-gradient(135deg,rgba(59,130,246,0.07),rgba(99,102,241,0.04))',
                borderLeft: '3px solid var(--accent-primary)',
                color: 'var(--text-secondary)',
              }}>
              &ldquo;My objective is to push boundaries in the digital space while adhering to ethical and Halal 
              principles in all my work.&rdquo;
            </motion.blockquote>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.1)}>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }} />

              {MILESTONES.map(({ year, icon, color, title, desc }, i) => (
                <motion.div key={i} variants={fadeUp} className="relative mb-7 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${color}20`, border: `2px solid ${color}` }}>
                    <FontAwesomeIcon icon={icon} style={{ color, fontSize: '7px' }} />
                  </div>

                  <div>
                    <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1.5"
                      style={{ background: `${color}15`, color }}>
                      {year}
                    </span>
                    <h4 className="text-sm font-display font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 3. EDUCATION TIMELINE
// ──────────────────────────────────────────────────────────────
function AboutEducation() {
  const SCHOOLS = [
    { name: 'St. Geroza School, Saidpur', period: '2013 – 2017', classes: 'Nursery, KG, Class 1–3', icon: faSchool,         color: '#3B82F6', tag: 'Primary' },
    { name: 'Tulshiram Govt. Primary School', period: '2018 – 2019', classes: 'Class 4–5',          icon: faBookOpen,       color: '#10B981', tag: 'Primary' },
    { name: 'Lions School & College, Saidpur', period: '2020', classes: 'Class 6',                  icon: faGraduationCap,  color: '#F59E0B', tag: 'Secondary' },
    { name: 'Saidpur Govt. Science College', period: '2021 – 2025', classes: 'Class 6–10',          icon: faFlask,          color: '#8B5CF6', tag: 'Secondary', mapUrl: 'https://maps.app.goo.gl/WMJtoRosby2itppW6' },
    { name: 'Saidpur Govt. Science College', period: '2026',        classes: 'SSC-26 Batch',         icon: faTrophy,         color: '#F59E0B', tag: 'Current', current: true, mapUrl: 'https://maps.app.goo.gl/WMJtoRosby2itppW6' },
    { name: 'Higher Secondary (HSC)',         period: 'Upcoming',   classes: 'Post-SSC result',       icon: faUserGraduate,  color: '#06B6D4', tag: 'Next', upcoming: true },
    { name: 'CSE Engineering (Degree)',        period: 'Long-term',  classes: 'Dream goal',            icon: faAtom,          color: '#22C55E', tag: 'Dream', upcoming: true },
  ]

  return (
    <section className="section" id="about-education">
      <div className="container-xl">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.08)}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--accent-primary)' }}>My Background</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold"
            style={{ color: 'var(--text-primary)' }}>
            Education <span style={{ color: 'var(--accent-primary)' }}>Timeline</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            My academic journey from primary school to the dream of a CSE degree.
          </motion.p>
        </motion.div>

        {/* Timeline — centered */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-4 bottom-4 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent-primary), rgba(59,130,246,0.1))' }} />

          {SCHOOLS.map(({ name, period, classes, icon, color, tag, current, upcoming, mapUrl }, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className={`relative flex items-center mb-8 last:mb-0 ${isLeft ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                {/* Card — takes ~45% width */}
                <div className={`w-[calc(50%-28px)] ${isLeft ? 'text-right pr-4' : 'text-left pl-4'}`}>
                  <div className="card p-4 relative"
                    style={{ borderColor: current ? color : 'var(--border-color)' }}>
                    {current && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: color, color: '#000' }}>CURRENT</div>
                    )}
                    {upcoming && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: 'var(--bg-surface-3)', color: 'var(--text-tertiary)', border: '1px solid var(--border-strong)' }}>UPCOMING</div>
                    )}

                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{ background: `${color}15`, color }}>
                      {tag}
                    </span>
                    <h4 className="text-sm font-display font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{name}</h4>
                    <p className="text-[11px] mt-1" style={{ color: 'var(--accent-primary)' }}>{period}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{classes}</p>
                    {mapUrl && (
                      <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[10px] transition-opacity hover:opacity-80"
                        style={{ color: 'var(--text-tertiary)' }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[9px]" />
                        View on Map
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[8px]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: current ? color : `${color}20`, border: `2px solid ${color}` }}>
                  <FontAwesomeIcon icon={icon} style={{ color: current ? '#fff' : color, fontSize: '11px' }} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 4. SKILLS SECTION (3 tabs)
// ──────────────────────────────────────────────────────────────
// SkillBar — renders just the animated bar (no label; callers render their own)
function SkillBar({ pct, color, delay = 0 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setWidth(pct), delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, pct, delay])

  return (
    <div ref={ref} className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-3)' }}>
      <div className="h-full rounded-full transition-all duration-1000"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        }} />
    </div>
  )
}

const SKILL_TABS = [
  {
    id: 'tech', label: 'Tech Skills', icon: faCode,
    desc: 'Programming languages and web technologies',
    items: [
      { name: 'HTML',           pct: 88, color: '#F97316' },
      { name: 'CSS',            pct: 85, color: '#3B82F6' },
      { name: 'JavaScript',     pct: 45, color: '#EAB308', note: 'Improving' },
      { name: 'Python',         pct: 60, color: '#10B981' },
      { name: 'React.js',       pct: 70, color: '#06B6D4' },
      { name: 'Git & GitHub',   pct: 80, color: '#8B5CF6' },
      { name: 'Firebase',       pct: 68, color: '#F59E0B' },
      { name: 'AI Tools',       pct: 93, color: '#EC4899' },
      { name: 'Java',           pct: 38, color: '#94A3B8', note: 'Basic' },
    ],
  },
  {
    id: 'design', label: 'Design & Creative', icon: faPalette,
    desc: 'Graphic design, photo editing, and visual content creation',
    items: [
      { name: 'Logo Design',        pct: 85, color: '#EC4899' },
      { name: 'Banner Design',      pct: 88, color: '#8B5CF6' },
      { name: 'Thumbnail Design',   pct: 90, color: '#F97316' },
      { name: 'Poster Design',      pct: 82, color: '#EAB308' },
      { name: 'Business Card',      pct: 80, color: '#06B6D4' },
      { name: 'Photo Editing',      pct: 75, color: '#10B981' },
      { name: 'HTML/CSS Design',    pct: 87, color: '#3B82F6' },
    ],
  },
  {
    id: 'video', label: 'Video Editing', icon: faVideo,
    desc: 'Video creation and editing for different platforms',
    items: [
      { name: 'YouTube Videos',       pct: 78, color: '#EF4444' },
      { name: 'Short Videos / Reels', pct: 82, color: '#F97316' },
      { name: 'Facebook Videos',      pct: 76, color: '#3B82F6' },
      { name: 'Ads & Commercials',    pct: 68, color: '#F59E0B' },
      { name: 'Basic Animations',     pct: 62, color: '#8B5CF6' },
    ],
  },
]

function AboutSkills() {
  const [activeTab, setActiveTab] = useState('tech')
  const tab = SKILL_TABS.find(t => t.id === activeTab)

  const TOOLS_GRID = [
    { name: 'VS Code',         color: '#3B82F6', icon: faComputer   },
    { name: 'GitHub',          color: '#94A3B8', icon: faCode       },
    { name: 'Figma',           color: '#EC4899', icon: faPenRuler   },
    { name: 'Adobe PS',        color: '#A855F7', icon: faCameraRetro },
    { name: 'Firebase',        color: '#F59E0B', icon: faGears      },
    { name: 'Google Sheets',   color: '#10B981', icon: faClipboardList },
    { name: 'Supabase',        color: '#06B6D4', icon: faAtom       },
    { name: 'Browser DevTools',color: '#64748B', icon: faFilePen    },
  ]

  return (
    <section className="section section-alt" id="about-skills">
      <div className="container-xl">
        {/* Header */}
        <motion.div className="text-center mb-10"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.08)}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--accent-primary)' }}>What I Know</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold"
            style={{ color: 'var(--text-primary)' }}>
            Skills &amp; <span style={{ color: 'var(--accent-primary)' }}>Expertise</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Skill Bars Column */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.05)}>
            {/* Tab buttons */}
            <motion.div variants={fadeUp} className="flex gap-2 mb-6 flex-wrap">
              {SKILL_TABS.map(t => (
                <button key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: activeTab === t.id ? 'var(--accent-primary)' : 'var(--bg-surface)',
                    color: activeTab === t.id ? '#fff' : 'var(--text-secondary)',
                    border: `1px solid ${activeTab === t.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  }}>
                  <FontAwesomeIcon icon={t.icon} className="text-xs" />
                  {t.label}
                </button>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-xs mb-5" style={{ color: 'var(--text-tertiary)' }}>
              {tab.desc}
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}>
                {tab.items.map(({ name, pct, color, note }, i) => (
                  <div key={name} className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {name}
                        {note && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                            style={{ background: `${color}15`, color }}>
                            {note}
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                    </div>
                    <SkillBar pct={pct} color={color} delay={i * 0.06} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tools Grid Column */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.06)}>
            <motion.h3 variants={fadeUp}
              className="text-sm font-display font-bold mb-5 uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}>
              Tools I Use
            </motion.h3>

            <motion.div variants={stagger(0.05)} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {TOOLS_GRID.map(({ name, color, icon }, i) => (
                <motion.div key={name} variants={fadeUp}
                  className="card p-3 text-center flex flex-col items-center gap-2 cursor-default">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} className="text-sm" />
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Note about learning */}
            <motion.div variants={fadeUp}
              className="mt-6 p-4 rounded-xl text-xs leading-relaxed"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" style={{ color: '#F59E0B' }} />
              As a student developer, I&rsquo;m at an active learning stage. SSC exams paused deep study for about
              2 years — but never stopped building. Now, I&rsquo;m back to accelerated learning.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 5. LANGUAGES
// ──────────────────────────────────────────────────────────────
function AboutLanguages() {
  const LANGS = [
    { name: 'Bengali', native: 'বাংলা', level: 'Native',        pct: 100, color: '#10B981', flag: '🇧🇩' },
    { name: 'English', native: 'English', level: 'Intermediate', pct: 65,  color: '#3B82F6', flag: '🇬🇧' },
    { name: 'Hindi',   native: 'हिन्दी',    level: 'Conversational',pct: 55, color: '#F97316', flag: '🇮🇳' },
    { name: 'Urdu',    native: 'اردو',     level: 'Conversational',pct: 48, color: '#EC4899', flag: '🇵🇰' },
  ]

  return (
    <section className="section" id="about-languages">
      <div className="container-xl">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.07)}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.12)', color: 'var(--accent-primary)' }}>
              <FontAwesomeIcon icon={faLanguage} className="text-sm" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent-primary)' }}>Communication</p>
              <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                Language <span style={{ color: 'var(--accent-primary)' }}>Proficiency</span>
              </h2>
            </div>
          </motion.div>

          <motion.div variants={stagger(0.07)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LANGS.map(({ name, native, level, pct, color, flag }) => (
              <motion.div key={name} variants={fadeUp}
                className="card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-display font-bold" style={{ color: 'var(--text-primary)' }}>{name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{native}</p>
                  </div>
                  <span className="text-2xl" aria-hidden>{flag}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold" style={{ color }}>{level}</span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{pct}%</span>
                  </div>
                  <SkillBar pct={pct} color={color} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 6. SERVICES
// ──────────────────────────────────────────────────────────────
function AboutServices() {
  const SERVICES = [
    {
      icon: faGlobe, color: '#3B82F6',
      title: 'Website Design & Development',
      desc: 'Visually appealing, responsive, and professional websites tailored to client needs. From landing pages to complete web applications.',
      items: ['Responsive Design', 'Modern UI/UX', 'Firebase / Supabase Backend', 'Performance Optimized'],
    },
    {
      icon: faPenRuler, color: '#EC4899',
      title: 'Graphic Design',
      desc: 'Professional visual content for your brand — logos, banners, thumbnails, posters, and business cards.',
      items: ['Logo Design', 'Banner & Thumbnail', 'Poster Design', 'Business Cards'],
    },
    {
      icon: faFilm, color: '#EF4444',
      title: 'Photo & Video Editing',
      desc: 'Quality photo editing and video production for YouTube, Facebook, ads, and short-form content.',
      items: ['YouTube Videos', 'Short Videos / Reels', 'Ads & Commercials', 'Basic Animations'],
    },
  ]

  return (
    <section className="section section-alt" id="about-services">
      <div className="container-xl">
        <motion.div className="text-center mb-10"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.08)}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--accent-primary)' }}>What I Offer</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold"
            style={{ color: 'var(--text-primary)' }}>
            My <span style={{ color: 'var(--accent-primary)' }}>Services</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Offering halal, ethical, and quality services — web development, design, and video production.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.1)}>
          {SERVICES.map(({ icon, color, title, desc, items }) => (
            <motion.div key={title} variants={fadeUp}
              className="card p-6 flex flex-col gap-4 group hover:border-[var(--border-strong)]"
              style={{ borderTop: `2px solid ${color}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, color }}>
                <FontAwesomeIcon icon={icon} className="text-xl" />
              </div>
              <h3 className="text-base font-display font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              <ul className="flex flex-col gap-1.5 mt-auto">
                {items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <FontAwesomeIcon icon={faCheck} className="text-[10px] flex-shrink-0" style={{ color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold mt-1 group transition-colors"
                style={{ color }}>
                Get in touch
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 7. VALUES & INTERESTS
// ──────────────────────────────────────────────────────────────
function AboutValues() {
  const VALUES = [
    { icon: faMosque,        color: '#10B981', title: 'Islam First',   desc: 'Every decision guided by Islamic principles — halal income, honest dealings, beneficial work.' },
    { icon: faScaleBalanced, color: '#3B82F6', title: 'Honesty',       desc: 'Quality work over showmanship. Transparent, straightforward, and trustworthy in every interaction.' },
    { icon: faLeaf,          color: '#22C55E', title: 'Discipline',    desc: 'Structured work habits, consistent practice, and focused learning sessions every day.' },
    { icon: faStarOfLife,    color: '#F59E0B', title: 'Perfection',    desc: 'I invest the time needed to make things right. Good enough is not enough.' },
    { icon: faWandMagicSparkles, color: '#EC4899', title: 'Innovation', desc: 'Embracing new technologies, experimenting with ideas, and crafting creative solutions.' },
    { icon: faHands,         color: '#8B5CF6', title: 'Beneficial Work', desc: 'Creating technology that genuinely helps people — not just building for the sake of building.' },
  ]

  const INTERESTS = [
    { icon: faMosque,         label: 'Prayer (Salah)', color: '#10B981' },
    { icon: faKeyboard,       label: 'Programming',    color: '#3B82F6' },
    { icon: faPersonRunning,  label: 'Outdoor Games',  color: '#F97316' },
    { icon: faBicycle,        label: 'Cycling',        color: '#22C55E' },
    { icon: faEarthAsia,      label: 'Travelling',     color: '#06B6D4' },
    { icon: faBook,           label: 'Reading Books',  color: '#8B5CF6' },
    { icon: faLightbulb,      label: 'Learning',       color: '#EAB308' },
    { icon: faVideo,          label: 'Editing',        color: '#EF4444' },
  ]

  return (
    <section className="section" id="about-values">
      <div className="container-xl">

        {/* Values */}
        <motion.div className="mb-14"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.07)}>
          <motion.div variants={fadeUp} className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: 'var(--accent-primary)' }}>
              What I Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              Core <span style={{ color: 'var(--accent-primary)' }}>Values</span>
            </h2>
          </motion.div>

          <motion.div variants={stagger(0.08)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map(({ icon, color, title, desc }) => (
              <motion.div key={title} variants={fadeUp}
                className="card p-5 flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, color }}>
                  <FontAwesomeIcon icon={icon} className="text-base" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.06)}>
          <motion.div variants={fadeUp} className="text-center mb-6">
            <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>
              Outside of Code
            </p>
            <h3 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              Hobbies &amp; <span style={{ color: 'var(--accent-primary)' }}>Interests</span>
            </h3>
          </motion.div>

          <motion.div variants={stagger(0.05)} className="flex flex-wrap justify-center gap-3">
            {INTERESTS.map(({ icon, label, color }) => (
              <motion.div key={label} variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[.97]"
                style={{ background: `${color}12`, border: `1px solid ${color}30`, color }}>
                <FontAwesomeIcon icon={icon} className="text-xs" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 8. GOALS
// ──────────────────────────────────────────────────────────────
function AboutGoals() {
  const GOALS = [
    {
      period: 'Short-Term',
      timeframe: '2026',
      icon: faClock,
      color: '#3B82F6',
      items: [
        'Complete SSC exam successfully (SSC-26)',
        'Launch mdturzo.web.app portfolio',
        'Improve JavaScript skills extensively',
        'Build more real-world React projects',
      ],
    },
    {
      period: 'Mid-Term',
      timeframe: '2026 – 2028',
      icon: faArrowTrendUp,
      color: '#F59E0B',
      items: [
        'Enroll in HSC (Intermediate) — Science group',
        'Master full-stack web development',
        'Start freelancing (halal, ethical clients only)',
        'Build client projects and earn halal income',
      ],
    },
    {
      period: 'Long-Term',
      timeframe: 'Future',
      icon: faRocket,
      color: '#10B981',
      items: [
        'BSc in Computer Science & Engineering (CSE)',
        'Become a professional full-stack developer',
        'Build a sustainable freelancing career',
        'Create beneficial technology for society',
      ],
    },
  ]

  return (
    <section className="section section-alt" id="about-goals">
      <div className="container-xl">
        <motion.div className="text-center mb-10"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.08)}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--accent-primary)' }}>Where I&rsquo;m Headed</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold"
            style={{ color: 'var(--text-primary)' }}>
            Goals &amp; <span style={{ color: 'var(--accent-primary)' }}>Aspirations</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.1)}>
          {GOALS.map(({ period, timeframe, icon, color, items }) => (
            <motion.div key={period} variants={fadeUp}
              className="card p-6 flex flex-col gap-4 relative overflow-hidden">
              {/* BG decoration */}
              <div className="absolute top-0 right-0 w-28 h-28 rounded-full translate-x-10 -translate-y-10"
                style={{ background: `${color}06`, border: `1px solid ${color}10` }} />

              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15`, color }}>
                  <FontAwesomeIcon icon={icon} className="text-base" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{period}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{timeframe}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <FontAwesomeIcon icon={faCircleCheck} className="flex-shrink-0 mt-0.5" style={{ color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// 9. CTA — Connect Section
// ──────────────────────────────────────────────────────────────
function AboutCTA() {
  const ALL_SOCIALS = [
    { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'GitHub',    cls: 'text-[#94A3B8]' },
    { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'LinkedIn',  cls: 'text-[#0A66C2]' },
    { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'Facebook',  cls: 'text-[#1877F2]' },
    { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: 'Instagram', cls: 'text-[#E1306C]' },
    { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: 'YouTube',   cls: 'text-[#FF0000]' },
    { icon: faXTwitter,  url: SITE_CONFIG.social.twitter,   label: 'X/Twitter', cls: 'text-[#94A3B8]' },
    { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: 'Telegram',  cls: 'text-[#2AABEE]' },
    { icon: faTiktok,    url: SITE_CONFIG.social.tiktok,    label: 'TikTok',    cls: 'text-[#EE1D52]' },
  ]

  return (
    <section className="section" id="about-cta">
      <div className="container-xl">
        <motion.div
          className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(99,102,241,0.06) 50%, rgba(168,85,247,0.06) 100%)',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative orbs */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent)' }} />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent)' }} />

          <p className="text-xs uppercase tracking-widest font-semibold mb-3 relative"
            style={{ color: 'var(--accent-primary)' }}>Let&rsquo;s Connect</p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 relative"
            style={{ color: 'var(--text-primary)' }}>
            Interested in working together?
          </h2>
          <p className="text-sm max-w-md mx-auto mb-6 relative" style={{ color: 'var(--text-secondary)' }}>
            I&rsquo;m open to freelance projects, collaborations, and conversations. 
            Feel free to reach out!
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8 relative">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-[.97] hover:opacity-90"
              style={{ background: 'var(--accent-primary)' }}>
              <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              Send a Message
            </Link>
            <Link to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[.97]"
              style={{ border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>
              <FontAwesomeIcon icon={faCode} className="text-xs" />
              View Projects
            </Link>
          </div>

          {/* Social icons row */}
          <div className="flex flex-wrap justify-center gap-3 relative">
            {ALL_SOCIALS.map(({ icon, url, label, cls }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                aria-label={label}>
                <FontAwesomeIcon icon={icon} className={`text-sm ${cls}`} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────────────────────
export default function About() {
  const { settings, loading: settingsLoading } = useSiteSettings()

  useEffect(() => {
    trackPage('About')
  }, [])

  return (
    <>
      <Helmet>
        <title>{buildTitle('About')}</title>
        <meta name="description"
          content="Learn about Muhtasim Rahman (Turzo) — a self-taught web developer and designer from Bangladesh. Education, skills, values, and goals." />
        <meta property="og:title"    content="About | Muhtasim Rahman" />
        <meta property="og:description"
          content="Self-taught web developer and designer from Nilphamari, Bangladesh. Building clean, fast and meaningful digital experiences." />
      </Helmet>

      <main>
        <AboutHero    settings={settings} settingsLoading={settingsLoading} />
        <AboutStory />
        <AboutEducation />
        <AboutSkills />
        <AboutLanguages />
        <AboutServices />
        <AboutValues />
        <AboutGoals />
        <AboutCTA />
      </main>
    </>
  )
}
