// About.jsx — v2.2.0 — Full About page
import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { Link }      from 'react-router-dom'
import { motion }    from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faBrain, faVideo,
  faGraduationCap, faLocationDot, faHeart,
  faArrowRight, faDownload, faLanguage,
  faCalendarDays, faMosque,
} from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

const TIMELINE = [
  { year: '2017', title: 'Discovered computers', desc: 'Got my first computer and became fascinated with how technology works.' },
  { year: '2019', title: 'First design work', desc: 'Started learning graphic design — logos, banners, and posters for friends.' },
  { year: '2021', title: 'Wrote first HTML page', desc: 'Discovered web development and fell in love with building things for the browser.' },
  { year: '2022', title: 'First freelance project', desc: 'Completed my first paid logo design project for a local business.' },
  { year: '2023', title: 'JavaScript & React', desc: 'Leveled up from vanilla JS to React, started building real interactive applications.' },
  { year: '2024', title: 'v1 Portfolio launched', desc: 'Launched my first proper portfolio on Odoo — a milestone in self-expression.' },
  { year: '2025', title: 'v2 Portfolio — this site', desc: 'Built this full-stack portfolio with React, Supabase, Firebase & Cloudflare Workers.' },
]

const TOOLS = [
  { name: 'VS Code',    color: '#007ACC' }, { name: 'React',      color: '#61DAFB' },
  { name: 'Tailwind',   color: '#06B6D4' }, { name: 'Supabase',   color: '#3ECF8E' },
  { name: 'Firebase',   color: '#FFCA28' }, { name: 'Git',        color: '#F05032' },
  { name: 'Figma',      color: '#F24E1E' }, { name: 'Photoshop',  color: '#31A8FF' },
  { name: 'Illustrator',color: '#FF9A00' }, { name: 'CapCut',     color: '#00C2CC' },
  { name: 'Python',     color: '#3776AB' }, { name: 'Cloudflare', color: '#F6821F' },
]

const INTERESTS = [
  { icon: faCode,      label: 'Web Dev',     color: '#3B82F6' },
  { icon: faPalette,   label: 'Design',      color: '#EC4899' },
  { icon: faBrain,     label: 'AI Tools',    color: '#00D4FF' },
  { icon: faVideo,     label: 'Video Edit',  color: '#A855F7' },
  { icon: faMosque,    label: 'Islam',       color: '#10B981' },
  { icon: faHeart,     label: 'Science',     color: '#F59E0B' },
]

function Section({ children, className = '' }) {
  return <section className={`section ${className}`}>{children}</section>
}

function AboutContent() {
  useEffect(() => { trackPage('About') }, [])
  const { settings } = useSiteSettings()
  const age = calculateAge()
  const cvEnabled = settings?.cvEnabled
  const cvUrl     = settings?.cvUrl

  return (
    <>
      <Helmet>
        <title>{buildTitle('About')}</title>
        <meta name="description" content={`About Muhtasim Rahman (Turzo) — ${age}-year-old self-taught web developer and designer from Bangladesh.`} />
      </Helmet>

      {/* Hero */}
      <Section>
        <div className="container-xl max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
            {/* Photo */}
            <motion.div className="mx-auto lg:mx-0 relative w-64 lg:w-full"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-[var(--border-strong)]
                bg-[var(--bg-surface-2)] shadow-[var(--shadow-xl)] relative">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B 60%,#1E3A8A)' }} />
                <img src="/muhtasim.webp" alt="Muhtasim Rahman"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={e => { e.target.style.display='none' }} />
                <div className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: 'linear-gradient(to top,rgba(2,6,23,.85),transparent)' }} />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold font-display">Muhtasim Rahman</p>
                  <p className="text-white/60 text-xs">Age {age} · Bangladesh</p>
                </div>
              </div>
              {cvEnabled && cvUrl && (
                <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                    border border-[var(--accent-primary)] text-[var(--accent-primary)] text-sm font-semibold
                    hover:bg-[var(--accent-light)] transition-colors duration-200">
                  <FontAwesomeIcon icon={faDownload} /> Download CV
                </a>
              )}
            </motion.div>

            {/* Bio */}
            <motion.div className="space-y-6"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">About Me</p>
                <h1 className="text-4xl font-display font-bold text-[var(--text-primary)] leading-tight">
                  Hi, I'm Muhtasim<br /><span className="text-[var(--accent-primary)]">Rahman (Turzo)</span>
                </h1>
              </div>

              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>I'm a {age}-year-old student and self-taught web developer & designer from Nilphamari, Bangladesh. My journey began with a childhood curiosity about how electronics work — and quickly evolved into a passion for building things on the web.</p>
                <p>I've been doing graphic design for over 6 years and web development for 3+ years. I'm fully self-taught, learning through YouTube, documentation, and most importantly — building real projects. I use AI tools extensively to accelerate my workflow.</p>
                <p>I'm currently an SSC-26 batch student at SGSC, preparing for my exams while continuing to build and grow as a developer. My dream is to pursue a CSE degree and become a professional full-stack developer.</p>
                <p>All my work follows <strong className="text-[var(--text-primary)]">Islamic and ethical principles</strong>. I don't take on projects involving haram content, immoral themes, or anything that conflicts with Islamic values.</p>
              </div>

              {/* Quick facts grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: faCalendarDays, color: '#3B82F6',  label: 'Born',     value: 'September 13, 2007' },
                  { icon: faLocationDot,  color: '#10B981',  label: 'Location', value: 'Nilphamari, Bangladesh' },
                  { icon: faGraduationCap,color: '#F59E0B',  label: 'School',   value: 'SGSC · SSC-26' },
                  { icon: faLanguage,     color: '#EC4899',  label: 'Languages',value: 'Bengali · English · Hindi' },
                  { icon: faMosque,       color: '#06B6D4',  label: 'Religion', value: 'Islam (Sunni)' },
                  { icon: faHeart,        color: '#A855F7',  label: 'Values',   value: 'Discipline · Quality · Honesty' },
                ].map(({ icon, color, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-surface)]
                    border border-[var(--border-color)]">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} className="text-xs" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">{label}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Interests */}
      <Section>
        <div className="container-xl max-w-5xl">
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Interests & Passions</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {INTERESTS.map(({ icon, label, color }, i) => (
              <motion.div key={label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl card"
                style={{ borderColor: `${color}30` }}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <FontAwesomeIcon icon={icon} style={{ color }} />
                <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="container-xl max-w-3xl">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">My Journey</p>
            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)]">Timeline</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-[var(--border-color)]" />
            <div className="space-y-6">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <motion.div key={year} className="flex gap-5 items-start"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}>
                  <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent-primary)]
                    flex items-center justify-center flex-shrink-0 z-10 text-[10px] font-bold text-[var(--accent-primary)]">
                    {year.slice(2)}
                  </div>
                  <div className="card p-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[var(--accent-primary)]">{year}</span>
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">{title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Tools */}
      <Section>
        <div className="container-xl max-w-4xl">
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">My Stack</p>
            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)]">Tools & Technologies</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map(({ name, color }, i) => (
              <motion.span key={name}
                className="px-4 py-2 rounded-xl text-sm font-medium card"
                style={{ color, borderColor: `${color}30` }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}>
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="container-xl max-w-2xl text-center">
          <motion.div className="card p-10 space-y-5"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Let's work together</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Whether you need a website, design, or just want to say hello — I'm always happy to connect.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]
                  transition-all duration-200 active:scale-[0.97] group">
                Contact Me
                <FontAwesomeIcon icon={faArrowRight}
                  className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  border border-[var(--border-strong)] text-[var(--text-secondary)]
                  hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]
                  transition-all duration-200 active:scale-[0.97]">
                View Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  )
}

export default function About() {
  return <VisibilityGuard page="about" skeleton="profile"><AboutContent /></VisibilityGuard>
}
