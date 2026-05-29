// ============================================================
// AboutStory.jsx — v2.3.3
// CHANGES:
//   * Rebuilt with minimal, clean structure
//   * CV card redesigned: Preview (new-tab link), Download
//     (direct), Print (preview+print toggle), Share (device API)
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuoteLeft, faSeedling, faCode, faRocket,
  faLocationDot, faGraduationCap, faEnvelope,
  faUser, faMosque, faCalendar,
  faPalette, faVideo, faLanguage, faBullseye,
  faFileLines, faDownload, faEye, faPrint, faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

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

const INFO_ROWS = (age) => [
  { icon: faUser,          color: '#3B82F6', label: 'Full Name',   value: 'Md Muhtasim Rahman Mahmud' },
  { icon: faUser,          color: '#8B5CF6', label: 'Nickname',    value: 'Turzo' },
  { icon: faCalendar,      color: '#F59E0B', label: 'Age',         value: `${age} Years` },
  { icon: faLocationDot,   color: '#10B981', label: 'Location',    value: 'Nilphamari, Bangladesh' },
  { icon: faMosque,        color: '#10B981', label: 'Religion',    value: 'Islam (Muslim)' },
  { icon: faGraduationCap, color: '#3B82F6', label: 'Education',   value: 'SSC-26 · SGSC, Saidpur' },
  { icon: faBullseye,      color: '#F59E0B', label: 'Goal',        value: 'CSE Engineer & Full-Stack Dev' },
  { icon: faEnvelope,      color: '#EF4444', label: 'Email',       value: SITE_CONFIG.owner.email },
  { icon: faLanguage,      color: '#06B6D4', label: 'Languages',   value: 'Bengali, English, Hindi, Urdu' },
]

const JOURNEY = [
  {
    icon: faSeedling, color: '#10B981', step: '01',
    title: 'Early Spark',
    text: 'Fascinated by technology since childhood. Dreamed of electrical engineering, then discovered web development through YouTube.',
  },
  {
    icon: faCode, color: '#3B82F6', step: '02',
    title: 'Learning in Progress',
    text: 'Self-taught through tutorials and real projects — from simple sites to full PWA apps, even during SSC exam preparation.',
  },
  {
    icon: faRocket, color: '#F59E0B', step: '03',
    title: "What's Next",
    text: 'SSC done, HSC ahead, then CSE. Each shipped project is a step toward becoming a professional full-stack developer.',
  },
]

export default function AboutStory() {
  const { settings } = useSiteSettings()
  const age = calculateAge()
  const cvEnabled = settings?.cvEnabled && settings?.cvUrl
  const cvUrl = settings?.cvUrl

  const handlePrint = () => {
    if (!cvUrl) return
    const w = window.open(cvUrl, '_blank')
    if (w) {
      w.addEventListener('load', () => {
        try { w.print() } catch { /* silent */ }
      })
    }
  }

  const handleShare = async () => {
    if (!cvUrl) return
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Muhtasim Rahman — CV', text: 'Check out my CV', url: cvUrl })
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(cvUrl)
        alert('CV link copied!')
      } catch { /* fallback */ }
    }
  }

  return (
    <section className="section section-alt" id="about-story">
      <div className="container-xl">
        <motion.div
          className="abs-grid"
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: .08 }}
          variants={stagger(.1)}>

          {/* ── LEFT ── */}
          <motion.div variants={slideL} className="abs-left">
            <p className="abs-label">My Story</p>
            <h2 className="abs-h2">
              From circuits to<br />
              <span className="abs-accent">clean code</span>
            </h2>

            {/* Personal info card */}
            <div className="abs-info-card card">
              <div className="abs-info-head">
                <div className="abs-info-head-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span>Personal Details</span>
              </div>
              <div className="abs-info-list">
                {INFO_ROWS(age).map(({ icon, color, label, value }) => (
                  <div key={label} className="abs-info-row">
                    <span className="abs-info-icon" style={{ background: `${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="abs-info-key">{label}</span>
                    <span className="abs-info-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="abs-quote">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs-quote-icon" />
              <p className="abs-quote-text">
                "I possess a strong passion for programming and web development.
                I aim to develop impactful websites that seamlessly combine functionality
                with captivating design — while adhering to ethical and Halal principles."
              </p>
              <p className="abs-quote-attr">— Muhtasim Rahman</p>
            </div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div variants={slideR} className="abs-right">

            {/* CV Card — redesigned minimal */}
            {cvEnabled && (
              <motion.div variants={fadeUp} className="abs-cv-card card">
                <div className="abs-cv-top">
                  <div className="abs-cv-file-icon">
                    <FontAwesomeIcon icon={faFileLines} />
                  </div>
                  <div className="abs-cv-meta">
                    <p className="abs-cv-title">Curriculum Vitae</p>
                    <p className="abs-cv-sub">Muhtasim Rahman — Latest Version</p>
                  </div>
                </div>
                <div className="abs-cv-divider" />
                <div className="abs-cv-actions">
                  <a href={cvUrl} download className="abs-cv-btn abs-cv-download">
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Download</span>
                  </a>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="abs-cv-btn abs-cv-ghost">
                    <FontAwesomeIcon icon={faEye} />
                    <span>Preview</span>
                  </a>
                  <button className="abs-cv-btn abs-cv-ghost" onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint} />
                    <span>Print</span>
                  </button>
                  <button className="abs-cv-btn abs-cv-ghost" onClick={handleShare}>
                    <FontAwesomeIcon icon={faShareNodes} />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Journey — numbered steps */}
            <div className="abs-journey">
              {JOURNEY.map(({ icon, color, step, title, text }, i) => (
                <motion.div key={step} variants={fadeUp} className="abs-journey-item">
                  <div className="abs-journey-step" style={{ color, borderColor: `${color}30`, background: `${color}10` }}>
                    {step}
                  </div>
                  <div className="abs-journey-body">
                    <div className="abs-journey-title-row">
                      <div className="abs-journey-icon" style={{ background: `${color}18`, color }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <p className="abs-journey-title">{title}</p>
                    </div>
                    <p className="abs-journey-text">{text}</p>
                    {i < JOURNEY.length - 1 && <div className="abs-journey-connector" />}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Exp stats — 2×2 */}
            <motion.div variants={stagger(.08)} className="abs-stats-grid">
              {[
                { val: settings?.statsYearsDev   ?? '3+', lbl: 'Years Dev',      icon: faCode,    c: '#3B82F6' },
                { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design',   icon: faPalette, c: '#8B5CF6' },
                { val: '5+',                               lbl: 'Years Video',    icon: faVideo,   c: '#EC4899' },
                { val: settings?.statsProjects    ?? '16+',lbl: 'Projects Built', icon: faRocket,  c: '#10B981' },
              ].map(({ val, lbl, icon, c }) => (
                <motion.div key={lbl} variants={fadeUp} className="abs-stat-card card">
                  <div className="abs-stat-icon" style={{ background: `${c}18`, color: c }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <p className="abs-stat-val" style={{ color: c }}>{val}</p>
                  <p className="abs-stat-lbl">{lbl}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .abs-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 900px) {
          .abs-grid { grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
        }

        /* Left */
        .abs-left { display: flex; flex-direction: column; gap: 1.25rem; }
        .abs-label {
          display: inline-flex; align-items: center;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
        }
        .abs-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary);
        }
        .abs-accent { color: var(--accent-primary); }

        /* Info card */
        .abs-info-card { padding: 1.1rem 1.25rem; }
        .abs-info-head {
          display: flex; align-items: center; gap: .55rem;
          font-size: .8rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .9rem; padding-bottom: .65rem;
          border-bottom: 1px solid var(--border-color);
        }
        .abs-info-head-icon {
          width: 24px; height: 24px; border-radius: var(--radius-sm);
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center; font-size: .65rem;
        }
        .abs-info-list { display: flex; flex-direction: column; }
        .abs-info-row {
          display: flex; align-items: center; gap: .65rem;
          padding: .4rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .abs-info-row:last-child { border-bottom: none; }
        .abs-info-icon {
          width: 24px; height: 24px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .6rem; flex-shrink: 0;
        }
        .abs-info-key {
          font-size: .72rem; font-weight: 600; color: var(--text-secondary);
          min-width: 82px; flex-shrink: 0; font-family: var(--font-mono);
        }
        .abs-info-val {
          font-size: .76rem; color: var(--text-primary); font-weight: 500;
          word-break: break-word;
        }

        /* Quote */
        .abs-quote {
          padding: 1.1rem 1.25rem;
          border-left: 3px solid var(--accent-primary);
          background: rgba(59,130,246,.03);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        .abs-quote-icon {
          color: var(--accent-primary); opacity: .25; font-size: 1rem;
          margin-bottom: .45rem; display: block;
        }
        .abs-quote-text {
          font-size: .855rem; line-height: 1.78; color: var(--text-secondary);
          font-style: italic; margin-bottom: .55rem;
        }
        .abs-quote-attr {
          font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* Right */
        .abs-right { display: flex; flex-direction: column; gap: 1.1rem; }

        /* CV card */
        .abs-cv-card { padding: 1.2rem 1.35rem; }
        .abs-cv-top {
          display: flex; align-items: center; gap: .875rem; margin-bottom: 1rem;
        }
        .abs-cv-file-icon {
          width: 44px; height: 44px; border-radius: var(--radius-lg); flex-shrink: 0;
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center; font-size: 1rem;
        }
        .abs-cv-meta {}
        .abs-cv-title {
          font-size: .9rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;
        }
        .abs-cv-sub {
          font-size: .7rem; color: var(--text-tertiary); margin-top: .18rem;
          font-family: var(--font-mono);
        }
        .abs-cv-divider {
          height: 1px; background: var(--border-color); margin-bottom: 1rem;
        }
        .abs-cv-actions { display: flex; flex-wrap: wrap; gap: .5rem; }
        .abs-cv-btn {
          display: inline-flex; align-items: center; gap: .38rem;
          padding: .42rem .9rem; border-radius: var(--radius-md);
          font-size: .76rem; font-weight: 600; cursor: pointer;
          text-decoration: none; transition: all .18s ease;
          border: 1px solid transparent; font-family: var(--font-body);
          white-space: nowrap;
        }
        .abs-cv-download {
          background: var(--accent-primary); color: #fff;
          border-color: var(--accent-primary);
          box-shadow: 0 2px 10px rgba(37,99,235,.28);
        }
        .abs-cv-download:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px);
        }
        .abs-cv-ghost {
          background: var(--bg-surface); color: var(--text-secondary);
          border-color: var(--border-strong);
        }
        .abs-cv-ghost:hover {
          color: var(--accent-primary); border-color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Journey */
        .abs-journey { display: flex; flex-direction: column; gap: 0; }
        .abs-journey-item { display: flex; gap: .85rem; position: relative; }
        .abs-journey-step {
          font-family: var(--font-mono); font-weight: 800; font-size: .68rem;
          letter-spacing: .04em;
          width: 32px; height: 32px; border-radius: var(--radius-md);
          border: 1px solid; flex-shrink: 0; margin-top: .08rem;
          display: flex; align-items: center; justify-content: center;
        }
        .abs-journey-body {
          flex: 1; padding-bottom: 1.25rem; position: relative;
        }
        .abs-journey-item:last-child .abs-journey-body { padding-bottom: 0; }
        .abs-journey-connector {
          position: absolute; left: -1.4rem; top: 2.2rem; bottom: 0; width: 1px;
          background: linear-gradient(180deg, var(--border-color) 0%, transparent 100%);
        }
        .abs-journey-title-row {
          display: flex; align-items: center; gap: .5rem; margin-bottom: .3rem;
        }
        .abs-journey-icon {
          width: 26px; height: 26px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .62rem; flex-shrink: 0;
        }
        .abs-journey-title { font-size: .88rem; font-weight: 700; color: var(--text-primary); }
        .abs-journey-text { font-size: .79rem; color: var(--text-secondary); line-height: 1.65; }

        /* Stats grid */
        .abs-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .7rem; }
        .abs-stat-card {
          padding: 1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: .45rem;
        }
        .abs-stat-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center; font-size: .78rem;
        }
        .abs-stat-val {
          font-family: var(--font-display); font-weight: 800; font-size: 1.35rem; line-height: 1;
        }
        .abs-stat-lbl { font-size: .67rem; color: var(--text-secondary); font-weight: 500; }
      `}</style>
    </section>
  )
}
