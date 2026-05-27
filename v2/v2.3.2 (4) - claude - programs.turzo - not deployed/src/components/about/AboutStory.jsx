// ============================================================
// AboutStory.jsx — v2.3.2
// Enhanced from copy-2. Includes:
//   - Personal info list (name, age, location, religion, etc.)
//   - CV download / preview / print / share options
//   - Quote + story narrative
//   - Exp stats grid
//   - Journey milestone cards
// ============================================================

import { useState } from 'react'
import { Link }     from 'react-router-dom'
import { motion }   from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faVideo, faRocket,
  faSeedling, faQuoteLeft,
  faDownload, faEye, faPrint, faShareNodes,
  faUser, faLocationDot, faMosque,
  faGraduationCap, faEnvelope, faIdCard,
  faLink, faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'
import { fadeUp, slideL, stagger } from './aboutData.js'

// ── Section label ─────────────────────────────────────────────
function SectionLabel({ text }) {
  return <p className="abs-label">{text}</p>
}

// ── CV Actions ────────────────────────────────────────────────
function CVOptions({ cvUrl }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Muhtasim Rahman — CV', url: cvUrl })
      } else {
        await navigator.clipboard.writeText(cvUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {}
  }

  const handlePrint = () => {
    window.open(cvUrl, '_blank')
    setTimeout(() => {}, 400)
  }

  return (
    <div className="abs-cv-wrap">
      <p className="abs-cv-title">
        <FontAwesomeIcon icon={faIdCard} style={{ color: 'var(--accent-primary)', marginRight: '.45rem' }} />
        Curriculum Vitae
      </p>
      <div className="abs-cv-btns">
        <a href={cvUrl} download className="abs-cv-btn abs-cv-btn-primary" title="Download CV">
          <FontAwesomeIcon icon={faDownload} />
          <span>Download</span>
        </a>
        <a href={cvUrl} target="_blank" rel="noopener noreferrer"
          className="abs-cv-btn abs-cv-btn-ghost" title="Preview CV">
          <FontAwesomeIcon icon={faEye} />
        </a>
        <button className="abs-cv-btn abs-cv-btn-ghost" title="Print CV" onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} />
        </button>
        <button className="abs-cv-btn abs-cv-btn-ghost" title={copied ? 'Link copied!' : 'Share CV'}
          onClick={handleShare} style={copied ? { color: '#10B981' } : {}}>
          <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} />
        </button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
export default function AboutStory({ age, settings }) {
  const INFO_ROWS = [
    { label: 'Full Name',    value: SITE_CONFIG.owner.fullName,    icon: faUser         },
    { label: 'Display Name', value: SITE_CONFIG.owner.displayName, icon: faIdCard       },
    { label: 'Nickname',     value: SITE_CONFIG.owner.nickname,    icon: faIdCard       },
    { label: 'Age',          value: `${age} years old`,            icon: faUser         },
    { label: 'Location',     value: SITE_CONFIG.owner.location,    icon: faLocationDot  },
    { label: 'Religion',     value: 'Islam',                       icon: faMosque       },
    { label: 'Education',    value: 'SSC-26 · SGSC',              icon: faGraduationCap },
    { label: 'Email',        value: SITE_CONFIG.owner.email,       icon: faEnvelope     },
  ]

  return (
    <section className="section section-alt" id="about-story">
      <div className="container-xl">
        <motion.div className="abs-wrap"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>

          {/* ── LEFT ── */}
          <motion.div variants={slideL} className="abs-left">
            <SectionLabel text="My Story" />
            <h2 className="abs-h2">
              From circuits to<br /><span className="abs-accent">clean code</span>
            </h2>

            {/* Quote */}
            <div className="abs-quote card">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs-quote-icon" />
              <p className="abs-quote-text">
                "My name is Muhtasim Rahman, and I am a student at Saidpur Govt. Science College.
                I possess a strong passion for programming and web development. I aim to develop
                impactful websites that seamlessly combine functionality with captivating design —
                while adhering to ethical and Halal principles in all my work."
              </p>
              <p className="abs-quote-attr">— Muhtasim Rahman, self-written · 2024</p>
            </div>

            {/* Personal info list */}
            <div className="abs-info-box card">
              <p className="abs-info-heading">
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--accent-primary)', marginRight: '.4rem' }} />
                Personal Info
              </p>
              <div className="abs-info-table">
                {INFO_ROWS.map(({ label, value, icon }) => (
                  <div key={label} className="abs-info-row">
                    <span className="abs-info-label">
                      <FontAwesomeIcon icon={icon} className="abs-info-icon" />
                      {label}
                    </span>
                    <span className="abs-info-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Story paragraphs */}
            <p className="abs-text">
              From childhood, Muhtasim was fascinated by technical things — originally dreaming
              of becoming an electrical engineer. That curiosity shifted toward Computer Science
              through self-teaching on YouTube and building real projects.
            </p>
            <p className="abs-text">
              Even while preparing for SSC exams, he never stopped shipping code — from QR
              generators to full PWA exam trackers. Now with exams behind him, the real
              journey begins: frameworks, freelancing, and eventually CSE.
            </p>
          </motion.div>

          {/* ── RIGHT ── */}
          <div className="abs-right">
            {/* Exp stats */}
            <motion.div variants={stagger(.1)} className="abs-exp-grid">
              {[
                { val: settings?.statsYearsDev   ?? '3+', lbl: 'Years Dev',    icon: faCode,    c: '#3B82F6' },
                { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design', icon: faPalette, c: '#8B5CF6' },
                { val: '5+',                               lbl: 'Years Video',  icon: faVideo,   c: '#EC4899' },
                { val: settings?.statsProjects    ?? '16+',lbl: 'Projects',     icon: faRocket,  c: '#10B981' },
              ].map(({ val, lbl, icon, c }) => (
                <motion.div key={lbl} variants={fadeUp} className="abs-exp-card card">
                  <div className="abs-exp-icon" style={{ background: `${c}18`, color: c }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <p className="abs-exp-val" style={{ color: c }}>{val}</p>
                  <p className="abs-exp-lbl">{lbl}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Journey milestones */}
            {[
              { icon: faSeedling, color: '#10B981', title: 'Early Spark',
                text: 'Fascinated by technology since childhood. Started with electrical engineering dreams, discovered web dev through YouTube.' },
              { icon: faCode, color: '#3B82F6', title: 'Learning in Progress',
                text: 'Self-taught through tutorials and real projects. Built everything from restaurant sites to full PWA applications.' },
              { icon: faRocket, color: '#F59E0B', title: "What's Next",
                text: 'SSC done, HSC next, then CSE. Every shipped project is a step toward becoming a professional full-stack developer.' },
            ].map(({ icon, color, title, text }) => (
              <motion.div key={title} variants={fadeUp} className="abs-journey-card card">
                <div className="abs-journey-icon" style={{ background: `${color}18`, color }}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div>
                  <p className="abs-journey-title">{title}</p>
                  <p className="abs-journey-text">{text}</p>
                </div>
              </motion.div>
            ))}

            {/* CV Options — only shown when enabled */}
            {settings?.cvEnabled && settings?.cvUrl && (
              <motion.div variants={fadeUp}>
                <CVOptions cvUrl={settings.cvUrl} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .abs-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .abs-wrap {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) {
          .abs-wrap { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        }
        .abs-left { display: flex; flex-direction: column; gap: 1.2rem; }
        .abs-right { display: flex; flex-direction: column; gap: 1rem; }
        .abs-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: .25rem;
        }
        .abs-accent { color: var(--accent-primary); }

        /* Quote */
        .abs-quote {
          padding: 1.25rem 1.5rem;
          border-left: 3px solid var(--accent-primary);
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        .abs-quote-icon {
          color: var(--accent-primary); opacity: .3;
          font-size: 1.2rem; margin-bottom: .5rem; display: block;
        }
        .abs-quote-text {
          font-size: .875rem; line-height: 1.78;
          color: var(--text-secondary); font-style: italic; margin-bottom: .75rem;
        }
        .abs-quote-attr {
          font-size: .75rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* Personal info list */
        .abs-info-box { padding: 1.25rem 1.5rem; }
        .abs-info-heading {
          font-size: .875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;
        }
        .abs-info-table { display: flex; flex-direction: column; gap: 0; }
        .abs-info-row {
          display: flex; align-items: baseline; gap: .75rem;
          padding: .45rem 0; border-bottom: 1px solid var(--border-color);
        }
        .abs-info-row:last-child { border-bottom: none; }
        .abs-info-label {
          display: flex; align-items: center; gap: .45rem;
          font-size: .78rem; font-weight: 600; color: var(--text-secondary);
          white-space: nowrap; min-width: 110px; font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .abs-info-icon {
          font-size: .65rem; color: var(--accent-primary); width: 12px; text-align: center;
        }
        .abs-info-value {
          font-size: .82rem; color: var(--text-primary); word-break: break-all; line-height: 1.5;
        }
        @media (max-width: 400px) {
          .abs-info-label { min-width: 90px; }
        }

        /* Story text */
        .abs-text {
          font-size: .875rem; color: var(--text-secondary); line-height: 1.78; margin: 0;
        }

        /* Exp grid */
        .abs-exp-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .75rem; margin-bottom: .25rem;
        }
        .abs-exp-card {
          padding: 1.1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: .5rem;
        }
        .abs-exp-icon {
          width: 38px; height: 38px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center; font-size: .85rem;
        }
        .abs-exp-val {
          font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; line-height: 1;
        }
        .abs-exp-lbl { font-size: .7rem; color: var(--text-secondary); font-weight: 500; }

        /* Journey cards */
        .abs-journey-card {
          display: flex; align-items: flex-start; gap: .85rem; padding: 1rem 1.1rem;
        }
        .abs-journey-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0; margin-top: .1rem;
        }
        .abs-journey-title {
          font-size: .875rem; font-weight: 600; color: var(--text-primary); margin-bottom: .3rem;
        }
        .abs-journey-text { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; }

        /* CV Options */
        .abs-cv-wrap {
          padding: 1.1rem 1.25rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
        }
        .abs-cv-title {
          font-size: .82rem; font-weight: 700; color: var(--text-primary); margin-bottom: .85rem;
        }
        .abs-cv-btns { display: flex; gap: .5rem; flex-wrap: wrap; }
        .abs-cv-btn {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .48rem 1rem; border-radius: var(--radius-md);
          font-size: .8rem; font-weight: 600; cursor: pointer;
          border: none; text-decoration: none; transition: all .18s ease;
        }
        .abs-cv-btn-primary {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.28);
        }
        .abs-cv-btn-primary:hover {
          background: var(--accent-hover); transform: translateY(-1px);
        }
        .abs-cv-btn-ghost {
          background: var(--bg-surface-2); color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }
        .abs-cv-btn-ghost:hover {
          color: var(--accent-primary); border-color: var(--accent-primary);
          background: var(--accent-light);
        }
      `}</style>
    </section>
  )
}
