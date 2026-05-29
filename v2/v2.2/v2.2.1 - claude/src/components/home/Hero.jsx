// ============================================================
// Hero.jsx — v2.2.0
// Full hero: star bg, photo glow, typing animation, floating
// skill icons, available badge, stats, buttons, social icons
// ============================================================

import { useEffect, useRef, useState, useMemo } from 'react'
import { Link }         from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub, faLinkedin, faFacebook,
  faInstagram, faYoutube, faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import {
  faDownload, faEnvelope, faCircle,
  faCode, faPalette, faBrain, faTerminal, faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { SkeletonBox, SkeletonCircle } from '../ui/Skeleton.jsx'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'

// ── Typing hook ────────────────────────────────────────────
function useTyping(words, typingSpeed = 90, pauseMs = 1800, deleteSpeed = 55) {
  const [display, setDisplay]   = useState('')
  const [wordIdx, setWordIdx]   = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!isDeleting) {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs)
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), deleteSpeed)
      } else {
        setIsDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [display, isDeleting, wordIdx, words, typingSpeed, pauseMs, deleteSpeed])

  return display
}

// ── Count-up hook ──────────────────────────────────────────
function useCountUp(target, duration = 1600, inView = false) {
  const [count, setCount] = useState(0)
  const numTarget = parseInt(String(target), 10) || 0

  useEffect(() => {
    if (!inView || numTarget === 0) return
    let start = 0
    const step = Math.ceil(numTarget / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= numTarget) { setCount(numTarget); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, numTarget, duration])

  return count
}

// ── Floating skill icon ────────────────────────────────────
const SKILLS = [
  { icon: faCode,     label: 'HTML/CSS',    color: '#E34F26', angle: 0   },
  { icon: faBrain,    label: 'AI Tools',    color: '#00D4FF', angle: 72  },
  { icon: faTerminal, label: 'JavaScript',  color: '#F7DF1E', angle: 144 },
  { icon: faPalette,  label: 'Design',      color: '#FF6B6B', angle: 216 },
  { icon: faVideo,    label: 'Video Edit',  color: '#A855F7', angle: 288 },
]

function FloatingSkill({ icon, label, color, angle, orbitR = 155 }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * orbitR
  const y = Math.sin(rad) * orbitR

  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%' }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        style={{ translateX: x, translateY: y }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        whileHover={{ scale: 1.3 }}
        className="group cursor-pointer"
        title={label}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: `${color}18`, border: `1.5px solid ${color}40`, color }}
        >
          <FontAwesomeIcon icon={icon} className="text-sm" />
        </div>
        {/* tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5
          bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-md
          text-[10px] text-[var(--text-secondary)] whitespace-nowrap pointer-events-none
          opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-md">
          {label}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Star canvas background ─────────────────────────────────
function StarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId
    let stars = []

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      buildStars()
    }

    function buildStars() {
      stars = Array.from({ length: 180 }, () => ({
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        r:    Math.random() * 1.2 + 0.3,
        a:    Math.random(),
        da:   (Math.random() - 0.5) * 0.005,
        vx:   (Math.random() - 0.5) * 0.08,
        vy:   (Math.random() - 0.5) * 0.08,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        s.a += s.da
        if (s.a <= 0 || s.a >= 1) s.da *= -1
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, s.a))
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#93C5FD'
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  )
}

// ── Stat item with count-up ────────────────────────────────
function StatItem({ value, label, inView }) {
  // Strip non-numeric suffix (e.g. "3+" → 3, "+" suffix)
  const num    = parseInt(String(value), 10) || 0
  const suffix = String(value).replace(/[0-9]/g, '')
  const count  = useCountUp(num, 1500, inView)

  return (
    <div className="text-center px-4">
      <div className="text-2xl font-display font-extrabold text-[var(--text-primary)]">
        <span className="text-[var(--accent-primary)]">{count}</span>
        <span className="text-[var(--accent-primary)]">{suffix}</span>
      </div>
      <div className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mt-0.5 font-medium">
        {label}
      </div>
    </div>
  )
}

// ── Social icon button ─────────────────────────────────────
const SOCIALS = [
  { icon: faGithub,    href: SITE_CONFIG.social.github,    label: 'GitHub'    },
  { icon: faLinkedin,  href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
  { icon: faFacebook,  href: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
  { icon: faInstagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { icon: faYoutube,   href: SITE_CONFIG.social.youtube,   label: 'YouTube'   },
  { icon: faTelegram,  href: SITE_CONFIG.social.telegram,  label: 'Telegram'  },
]

// ── Main Component ─────────────────────────────────────────
export default function Hero({ settings, settingsLoading }) {
  const typed     = useTyping(['Web Developer', 'UI Designer', 'Video Editor', 'Student'])
  const statsRef  = useRef(null)
  const [statsInView, setStatsInView] = useState(false)
  const [imgLoaded, setImgLoaded]     = useState(false)
  const age = useMemo(() => calculateAge(), [])

  // Intersection observer for stats count-up
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true) },
      { threshold: 0.3 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const available  = settings?.availableForWork ?? true
  const cvEnabled  = settings?.cvEnabled ?? false
  const cvUrl      = settings?.cvUrl ?? '#'
  const yearsDev   = settings?.statsYearsDev    ?? '3+'
  const yearsDesign = settings?.statsYearsDesign ?? '6+'
  const projectsCt = settings?.statsProjects     ?? '16+'

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* ── Stars background ── */}
      <StarCanvas />

      {/* ── Drifting color orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <motion.div
          className="absolute rounded-full opacity-[0.12] blur-[120px]"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, #3B82F6, transparent)', left: '-10%', top: '-20%' }}
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full opacity-[0.10] blur-[100px]"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, #6366F1, transparent)', right: '5%', top: '20%' }}
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <motion.div
          className="absolute rounded-full opacity-[0.08] blur-[140px]"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, #0EA5E9, transparent)', left: '30%', bottom: '0%' }}
          animate={{ x: [0, 20, -30, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-[var(--container-pad)] py-24
                      grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">

        {/* LEFT — Text content */}
        <motion.div
          className="flex flex-col gap-6 order-2 lg:order-1"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Available badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="self-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              border border-[var(--border-color)] bg-[var(--bg-surface)]
              text-xs font-medium text-[var(--text-secondary)] shadow-sm">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  available
                    ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                    : 'bg-[var(--text-tertiary)]'
                }`}
              />
              <AnimatePresence mode="wait">
                {settingsLoading ? (
                  <SkeletonBox key="sk" w="w-24" h="h-3" rounded="rounded" />
                ) : (
                  <motion.span key="txt"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {available ? 'Available for work' : 'Currently unavailable'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          >
            <h1 className="font-display font-extrabold leading-[1.1] tracking-tight">
              <span className="block text-5xl sm:text-6xl text-[var(--text-primary)]">
                Muhtasim
              </span>
              <span className="block text-5xl sm:text-6xl text-[var(--accent-primary)]">
                Rahman
              </span>
              <span className="block text-2xl sm:text-3xl text-[var(--text-tertiary)] font-semibold mt-1">
                (Turzo)
              </span>
            </h1>
          </motion.div>

          {/* Typing role */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-2"
          >
            <span className="text-lg sm:text-xl font-medium text-[var(--text-secondary)]">
              {typed}
              <motion.span
                className="inline-block w-0.5 h-5 bg-[var(--accent-primary)] ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md"
          >
            {SITE_CONFIG.owner.bio}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white
                shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200
                active:scale-[0.97] text-sm"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Hire Me
            </Link>

            {cvEnabled && cvUrl ? (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                  border border-[var(--accent-primary)] text-[var(--accent-primary)]
                  hover:bg-[var(--accent-light)] transition-all duration-200
                  active:scale-[0.97] text-sm"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download CV
              </a>
            ) : (
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                  border border-[var(--border-strong)] text-[var(--text-secondary)]
                  hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]
                  transition-all duration-200 active:scale-[0.97] text-sm"
              >
                View Projects
              </Link>
            )}
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-2"
          >
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center
                  text-[var(--text-tertiary)] hover:text-[var(--accent-primary)]
                  hover:bg-[var(--accent-light)] border border-[var(--border-color)]
                  hover:border-[var(--accent-primary)] transition-all duration-200 text-sm"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            ref={statsRef}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center divide-x divide-[var(--border-color)]
              border border-[var(--border-color)] rounded-xl w-fit bg-[var(--bg-surface)] overflow-hidden"
          >
            {settingsLoading ? (
              <>
                {[0,1,2].map(i => (
                  <div key={i} className="px-5 py-3 flex flex-col items-center gap-1">
                    <SkeletonBox w="w-12" h="h-5" rounded="rounded" delay={i * 0.05} />
                    <SkeletonBox w="w-16" h="h-3" rounded="rounded" delay={i * 0.08} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <StatItem value={yearsDev}    label="YRS DEV"    inView={statsInView} />
                <StatItem value={yearsDesign} label="YRS DESIGN" inView={statsInView} />
                <StatItem value={projectsCt}  label="PROJECTS"   inView={statsInView} />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo */}
        <motion.div
          className="relative flex items-center justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Orbit container */}
          <div className="relative" style={{ width: 360, height: 360 }}>
            {/* Glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1.5px solid rgba(59,130,246,0.25)' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-[-14px] rounded-full"
              style={{ border: '1px solid rgba(59,130,246,0.12)' }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-[-28px] rounded-full"
              style={{ border: '1px solid rgba(59,130,246,0.06)' }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Floating skill icons around the orbit */}
            <div className="absolute inset-0 pointer-events-auto" style={{ overflow: 'visible' }}>
              {SKILLS.map((skill) => (
                <FloatingSkill key={skill.label} {...skill} />
              ))}
            </div>

            {/* Photo circle */}
            <div className="absolute inset-[18px] rounded-full overflow-hidden
              border-2 border-[var(--border-strong)]
              shadow-[0_0_60px_rgba(59,130,246,0.2),0_0_120px_rgba(59,130,246,0.08)]">
              {/* Gradient placeholder (used when photo not loaded or missing) */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #1E3A8A 100%)',
                }}
              />
              {/* Photo */}
              <img
                src="/muhtasim.webp"
                alt="Muhtasim Rahman"
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
                style={{ opacity: imgLoaded ? 1 : 0 }}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              {/* Gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.6), transparent)' }}
              />
              {/* Age badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                text-[10px] font-semibold text-white/70 whitespace-nowrap">
                Age {age}
              </div>
            </div>

            {/* Rotating dashed orbit line */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -2,
                border: '1px dashed rgba(59,130,246,0.3)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-[var(--border-strong)] flex items-start justify-center pt-1.5"
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-[var(--accent-primary)]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
