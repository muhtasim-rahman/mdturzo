// ============================================================
// components/about/AboutStory.jsx — v2.3.2
// Story & Info section — full personal info table + CV options
// Enhanced from copy-2: quote + journey cards + bio table + CV
// ============================================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuoteLeft, faCode, faBook, faMosque, faRocket, faPalette, faVideo,
  faDownload, faEye, faPrint, faShareNodes, faCheck, faUser,
  faCalendar, faLocationDot, faGraduationCap, faGlobe, faEnvelope,
  faHeart, faBriefcase, faLink,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

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

const JOURNEY_CARDS = [
  {
    icon: faCode, color: '#3B82F6',
    title: 'How It Started',
    text: 'From childhood, Muhtasim was fascinated by technical things. Originally aiming to become an electrical engineer, a spark for computers shifted his path toward Computer Science & Engineering.',
  },
  {
    icon: faBook, color: '#10B981',
    title: 'Self-Taught Journey',
    text: 'Primarily self-taught through YouTube and hands-on projects. Despite pausing formal study during SSC preparations, he never stopped building — from restaurant sites to PWA exam trackers.',
  },
  {
    icon: faMosque, color: '#8B5CF6',
    title: 'Values-Driven Work',
    text: 'His Islamic ethical framework and perfectionist mindset define every project. He spends as much time as needed to get things right, and only accepts halal, beneficial work.',
  },
]

const INFO_ROWS = (age) => [
  { icon: faUser,          label: 'Full Name',    value: 'Muhtasim Rahman (Turzo)' },
  { icon: faCalendar,      label: 'Age',           value: `${age} years old` },
  { icon: faLocationDot,   label: 'Location',      value: 'Nilphamari, Bangladesh' },
  { icon: faGraduationCap, label: 'Education',     value: 'SSC-26 · SGSC (Science)' },
  { icon: faHeart,         label: 'Religion',      value: 'Islam' },
  { icon: faGlobe,         label: 'Nationality',   value: 'Bangladeshi' },
  { icon: faBriefcase,     label: 'Occupation',    value: 'Student & Self-taught Developer' },
  { icon: faEnvelope,      label: 'Email',         value: SITE_CONFIG.owner.email },
  { icon: faRocket,        label: 'Goal',          value: 'CSE Engineer & Freelancer' },
  { icon: faLink,          label: 'Website',       value: SITE_CONFIG.siteURL.replace('https://', '') },
]

const STATS = (settings) => [
  { val: settings?.statsYearsDev  ?? '3+', lbl: 'Years Dev',     icon: faCode,    c: '#3B82F6' },
  { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design', icon: faPalette, c: '#8B5CF6' },
  { val: '5+',                               lbl: 'Years Video',  icon: faVideo,   c: '#EC4899' },
  { val: settings?.statsProjects  ?? '16+', lbl: 'Projects',     icon: faRocket,  c: '#10B981' },
]

export default function AboutStory({ settings, age }) {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = `${SITE_CONFIG.siteURL}/about`
    if (navigator.share) {
      navigator.share({ title: 'Muhtasim Rahman — About', url })
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const handlePrint = () => {
    if (settings?.cvUrl) {
      window.open(settings.cvUrl, '_blank')
    } else {
      window.print()
    }
  }

  return (
    <section className="section section-alt" id="about-story">
      <div className="container-xl">

        {/* ── TOP: quote + journey cards ── */}
        <motion.div className="abs-top-grid"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>

          {/* Left — heading + quote */}
          <motion.div variants={slideL} className="abs-left">
            <p className="abs-label">My Story</p>
            <h2 className="abs-h2">From circuits to<br /><span className="abs-accent">clean code</span></h2>

            <div className="abs-quote card">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs-quote-icon" />
              <blockquote className="abs-quote-text">
                "I possess a strong passion for programming and web development.
                I adeptly blend technical expertise with a creative flair — aiming to develop
                impactful websites that seamlessly combine functionality with captivating design,
                while adhering to ethical and Halal principles in all my work."
              </blockquote>
              <div className="abs-quote-attr">
                <div className="abs-quote-avatar">M</div>
                <div>
                  <p className="abs-quote-name">Muhtasim Rahman</p>
                  <p className="abs-quote-date">Self-written bio, 2024</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — story cards */}
          <motion.div variants={slideR} className="abs-right">
            {JOURNEY_CARDS.map(({ icon, color, title, text }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: .5, delay: i * .1 }}
                className="abs-story-card card">
                <div className="abs-story-icon" style={{ background: `${color}18`, color }}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div>
                  <p className="abs-story-title">{title}</p>
                  <p className="abs-story-text">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── STATS ── */}
        <motion.div className="abs-stats"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }}
          variants={stagger(.1)}>
          {STATS(settings).map(({ val, lbl, icon, c }) => (
            <motion.div key={lbl} variants={fadeUp} className="abs-stat-card card">
              <div className="abs-stat-icon" style={{ background: `${c}18`, color: c }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <p className="abs-stat-val" style={{ color: c }}>{val}</p>
              <p className="abs-stat-lbl">{lbl}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── INFO TABLE + CV CARD ── */}
        <motion.div className="abs-bottom-grid"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.08)}>

          {/* Personal info table */}
          <motion.div variants={slideL} className="abs-info-card card">
            <p className="abs-info-title">
              <FontAwesomeIcon icon={faUser} style={{ color: 'var(--accent-primary)', marginRight: '.5rem' }} />
              Personal Info
            </p>
            <div className="abs-info-table">
              {INFO_ROWS(age).map(({ icon, label, value }) => (
                <div key={label} className="abs-info-row">
                  <div className="abs-info-key">
                    <FontAwesomeIcon icon={icon} className="abs-info-ico" />
                    {label}
                  </div>
                  <div className="abs-info-val">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CV options */}
          <motion.div variants={slideR} className="abs-cv-card card">
            <p className="abs-cv-title">
              <FontAwesomeIcon icon={faBriefcase} style={{ color: 'var(--accent-primary)', marginRight: '.5rem' }} />
              My CV / Résumé
            </p>
            <p className="abs-cv-sub">
              Download, preview, or print my CV. Includes education, skills, projects, and contact info.
            </p>

            <div className="abs-cv-actions">
              {settings?.cvEnabled && settings?.cvUrl ? (
                <>
                  <a href={settings.cvUrl} download className="abs-cv-btn abs-cv-download">
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </a>
                  <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer" className="abs-cv-btn abs-cv-preview">
                    <FontAwesomeIcon icon={faEye} />
                    Preview
                  </a>
                  <button onClick={handlePrint} className="abs-cv-btn abs-cv-print">
                    <FontAwesomeIcon icon={faPrint} />
                    Print
                  </button>
                  <button onClick={handleShare} className="abs-cv-btn abs-cv-share">
                    <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} />
                    {copied ? 'Copied!' : 'Share'}
                  </button>
                </>
              ) : (
                <div className="abs-cv-unavail">
                  <FontAwesomeIcon icon={faEye} style={{ color: 'var(--text-tertiary)', fontSize: '1.4rem', marginBottom: '.5rem', display: 'block' }} />
                  <p className="abs-cv-unavail-text">CV coming soon.</p>
                  <button onClick={handleShare} className="abs-cv-btn abs-cv-share" style={{ marginTop: '.75rem' }}>
                    <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} />
                    {copied ? 'Copied!' : 'Share Profile'}
                  </button>
                </div>
              )}
            </div>

            {/* Skills quick view */}
            <div className="abs-cv-skills">
              <p className="abs-cv-skills-title">Quick Skills</p>
              <div className="abs-cv-chips">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Figma', 'AI Tools', 'Python'].map(s => (
                  <span key={s} className="abs-cv-chip">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        /* ── TOP GRID ──────────────────────────────────────── */
        .abs-top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 3rem;
          align-items: start;
        }
        .abs-label {
          display: inline-block;
          font-family: var(--font-mono); font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .12em;
          color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .abs-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .abs-accent { color: var(--accent-primary); }

        /* Quote */
        .abs-quote { padding: 1.4rem 1.5rem; position: relative; }
        .abs-quote-icon {
          font-size: 1.4rem; color: var(--accent-primary); opacity: .5;
          margin-bottom: .6rem; display: block;
        }
        .abs-quote-text {
          font-size: .9rem; line-height: 1.75; color: var(--text-secondary);
          font-style: italic; margin-bottom: 1rem;
        }
        .abs-quote-attr { display: flex; align-items: center; gap: .75rem; }
        .abs-quote-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--accent-primary); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: .85rem; flex-shrink: 0;
        }
        .abs-quote-name { font-size: .82rem; font-weight: 600; color: var(--text-primary); }
        .abs-quote-date { font-size: .72rem; color: var(--text-tertiary); margin-top: .1rem; }

        /* Story cards */
        .abs-right { display: flex; flex-direction: column; gap: 1rem; }
        .abs-story-card {
          display: flex; gap: 1rem; align-items: flex-start;
          padding: 1.1rem 1.25rem;
        }
        .abs-story-icon {
          width: 38px; height: 38px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; flex-shrink: 0;
        }
        .abs-story-title { font-size: .88rem; font-weight: 700; color: var(--text-primary); margin-bottom: .3rem; }
        .abs-story-text  { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; }

        /* ── STATS ─────────────────────────────────────────── */
        .abs-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1rem; margin-bottom: 3rem;
        }
        .abs-stat-card {
          padding: 1.25rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: .5rem;
        }
        .abs-stat-icon {
          width: 44px; height: 44px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
        }
        .abs-stat-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.75rem; line-height: 1;
        }
        .abs-stat-lbl { font-size: .78rem; color: var(--text-secondary); }

        /* ── BOTTOM GRID ────────────────────────────────────── */
        .abs-bottom-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 2.5rem); align-items: start;
        }

        /* Info table */
        .abs-info-card { padding: 1.5rem; }
        .abs-info-title {
          font-size: .9rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: 1rem; padding-bottom: .75rem;
          border-bottom: 1px solid var(--border-color);
        }
        .abs-info-table { display: flex; flex-direction: column; gap: 0; }
        .abs-info-row {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 1rem; padding: .6rem 0;
          border-bottom: 1px solid var(--border-color);
          font-size: .82rem;
        }
        .abs-info-row:last-child { border-bottom: none; }
        .abs-info-key {
          display: flex; align-items: center; gap: .5rem;
          color: var(--text-secondary); font-weight: 500;
          white-space: nowrap; flex-shrink: 0;
          min-width: 120px;
        }
        .abs-info-ico { color: var(--accent-primary); font-size: .7rem; width: 14px; }
        .abs-info-val {
          color: var(--text-primary); font-weight: 500;
          text-align: right; word-break: break-word;
        }

        /* CV card */
        .abs-cv-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .abs-cv-title {
          font-size: .9rem; font-weight: 700; color: var(--text-primary);
          padding-bottom: .75rem; border-bottom: 1px solid var(--border-color);
        }
        .abs-cv-sub { font-size: .82rem; color: var(--text-secondary); line-height: 1.65; }
        .abs-cv-actions { display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; }
        .abs-cv-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .65rem 1rem; border-radius: var(--radius-lg);
          font-size: .82rem; font-weight: 600; cursor: pointer;
          transition: all .2s ease; text-decoration: none; border: 2px solid transparent;
        }
        .abs-cv-download {
          background: var(--accent-primary); color: #fff;
          border-color: var(--accent-primary);
          box-shadow: 0 2px 12px rgba(37,99,235,.28);
        }
        .abs-cv-download:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .abs-cv-preview {
          background: transparent; color: var(--text-primary);
          border-color: var(--border-strong);
        }
        .abs-cv-preview:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: var(--accent-light); }
        .abs-cv-print {
          background: transparent; color: var(--text-secondary);
          border-color: var(--border-color);
        }
        .abs-cv-print:hover { border-color: '#10B981'; color: '#10B981'; background: 'rgba(16,185,129,.08)'; }
        .abs-cv-share {
          background: transparent; color: var(--text-secondary);
          border-color: var(--border-color);
        }
        .abs-cv-share:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: var(--accent-light); }
        .abs-cv-unavail { text-align: center; padding: 1rem 0; }
        .abs-cv-unavail-text { font-size: .82rem; color: var(--text-tertiary); }

        /* Quick skills */
        .abs-cv-skills { border-top: 1px solid var(--border-color); padding-top: 1rem; }
        .abs-cv-skills-title {
          font-size: .75rem; font-weight: 600; color: var(--text-secondary);
          text-transform: uppercase; letter-spacing: .07em; margin-bottom: .6rem;
          font-family: var(--font-mono);
        }
        .abs-cv-chips { display: flex; flex-wrap: wrap; gap: .4rem; }
        .abs-cv-chip {
          padding: .2rem .65rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .72rem; color: var(--text-secondary); font-family: var(--font-mono);
        }

        /* ── RESPONSIVE ────────────────────────────────────── */
        @media (max-width: 860px) {
          .abs-top-grid  { grid-template-columns: 1fr; }
          .abs-stats     { grid-template-columns: repeat(2, 1fr); }
          .abs-bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .abs-stats { grid-template-columns: repeat(2, 1fr); }
          .abs-cv-actions { grid-template-columns: 1fr 1fr; }
          .abs-info-key { min-width: 100px; }
        }
      `}</style>
    </section>
  )
}
