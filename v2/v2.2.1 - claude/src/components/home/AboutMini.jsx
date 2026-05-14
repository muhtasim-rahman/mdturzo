// ============================================================
// AboutMini.jsx — v2.2.0
// Mini about section on home page — quick facts, bio snippet,
// education, CTA to full About page
// ============================================================

import { Link }   from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap,
  faHeart, faArrowRight, faLanguage,
  faLaptopCode,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

const QUICK_FACTS = [
  { icon: faLocationDot,  label: 'Location',   value: 'Nilphamari, Bangladesh', color: '#3B82F6' },
  { icon: faGraduationCap,label: 'Education',  value: 'SSC-26 Batch · SGSC',   color: '#10B981' },
  { icon: faLaptopCode,   label: 'Goal',       value: 'CSE Engineer & Developer', color: '#F59E0B' },
  { icon: faLanguage,     label: 'Languages',  value: 'Bengali · English · Hindi', color: '#EC4899' },
  { icon: faHeart,        label: 'Values',     value: 'Islam · Discipline · Quality', color: '#A855F7' },
]

export default function AboutMini() {
  const age = calculateAge()

  return (
    <section className="section">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Image + decorative */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-72 sm:w-80">
              {/* Decorative box behind */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl
                border-2 border-[var(--accent-primary)] opacity-20" />

              {/* Photo card */}
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-strong)]
                bg-[var(--bg-surface-2)] shadow-[var(--shadow-xl)] aspect-[3/4]">
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #1E3A8A 100%)' }}
                />
                <img
                  src="/muhtasim.webp"
                  alt="Muhtasim Rahman"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.85), transparent)' }} />
                {/* Name tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display font-bold text-white text-lg leading-tight">
                    {SITE_CONFIG.owner.displayName}
                  </p>
                  <p className="text-[var(--text-tertiary)] text-xs mt-0.5">
                    {SITE_CONFIG.siteTagline} · Age {age}
                  </p>
                </div>
              </div>

              {/* Floating badge — experience */}
              <motion.div
                className="absolute -right-6 top-12 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[80px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-xl font-display font-extrabold text-[var(--accent-primary)]">3+</p>
                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">Yrs Dev</p>
              </motion.div>

              {/* Floating badge — projects */}
              <motion.div
                className="absolute -left-6 bottom-16 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[80px]"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="text-xl font-display font-extrabold text-[#10B981]">16+</p>
                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">Projects</p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Label */}
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold">
              About Me
            </motion.p>

            {/* Heading */}
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight">
              Self-taught developer<br />
              <span className="text-[var(--accent-primary)]">from Bangladesh</span>
            </motion.h2>

            {/* Bio */}
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed">
              Hi, I'm <strong className="text-[var(--text-primary)]">Muhtasim Rahman (Turzo)</strong>, a {age}-year-old
              student and self-taught web developer from Nilphamari, Bangladesh. Since I was young,
              I've been fascinated by technology — from electrical circuits to writing my first HTML page.
            </motion.p>

            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed">
              Currently preparing for HSC while building real-world projects, I believe in learning by doing.
              My goal is to become a professional full-stack developer and pursue a CSE degree.
              All my work follows <strong className="text-[var(--text-primary)]">Islamic &amp; ethical principles</strong>.
            </motion.p>

            {/* Quick facts */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {QUICK_FACTS.map(({ icon, label, value, color }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-surface)]
                    border border-[var(--border-color)] hover:border-[var(--accent-primary)]
                    transition-colors duration-200"
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${color}18`, color }}
                  >
                    <FontAwesomeIcon icon={icon} className="text-xs" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">{label}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                  bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white
                  shadow-md hover:shadow-[var(--shadow-glow)] transition-all duration-200
                  active:scale-[0.97] group"
              >
                Read Full Story
                <FontAwesomeIcon icon={faArrowRight}
                  className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
