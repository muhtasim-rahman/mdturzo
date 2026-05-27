// ============================================================
// AboutStory.jsx — v2.3.2
// Story & personal info section — enhanced from copy-2
// New: personal info list, CV download/preview/print/share
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuoteLeft, faSeedling, faCode, faRocket,
  faLocationDot, faGraduationCap, faEnvelope,
  faUser, faMosque, faCalendar, faDownload,
  faEye, faPrint, faShare, faPalette, faVideo,
  faLanguage, faBullseye,
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
  { icon: faUser,          color: '#3B82F6', label: 'Full Name',      value: 'Md Muhtasim Rahman Mahmud' },
  { icon: faUser,          color: '#8B5CF6', label: 'Nickname',       value: 'Turzo' },
  { icon: faCalendar,      color: '#F59E0B', label: 'Age',            value: `${age} Years` },
  { icon: faLocationDot,   color: '#10B981', label: 'Location',       value: 'Nilphamari, Rangpur, Bangladesh' },
  { icon: faMosque,        color: '#10B981', label: 'Religion',       value: 'Islam (Muslim)' },
  { icon: faGraduationCap, color: '#3B82F6', label: 'Education',      value: 'SSC-26 · SGSC, Saidpur' },
  { icon: faBullseye,      color: '#F59E0B', label: 'Career Goal',    value: 'CSE Engineer & Full-Stack Dev' },
  { icon: faEnvelope,      color: '#EF4444', label: 'Email',          value: SITE_CONFIG.owner.email },
  { icon: faLanguage,      color: '#06B6D4', label: 'Languages',      value: 'Bengali, English, Hindi, Urdu' },
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
        try { w.print() } catch (e) { /* silent */ }
      })
    }
  }

  const handleShare = async () => {
    if (!cvUrl) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Muhtasim Rahman — CV',
          text: 'Check out my CV',
          url: cvUrl,
        })
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(cvUrl)
        alert('CV link copied!')
      } catch {}
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

          {/* ── LEFT: Label + Info list + Quote ── */}
          <motion.div variants={slideL} className="abs-left">
            <p className="abs-label">My Story</p>
            <h2 className="abs-h2">
              From circuits to<br />
              <span className="abs-accent">clean code</span>
            </h2>

            {/* Personal Info List */}
            <div className="abs-info-card card">
              <p className="abs-info-title">
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--accent-primary)', marginRight: '.45rem' }} />
                Personal Details
              </p>
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
            <div className="abs-quote card">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs-quote-icon" />
              <p className="abs-quote-text">
                "I possess a strong passion for programming and web development.
                I aim to develop impactful websites that seamlessly combine functionality
                with captivating design — while adhering to ethical and Halal principles."
              </p>
              <p className="abs-quote-attr">— Muhtasim Rahman, self-written bio</p>
            </div>
          </motion.div>

          {/* ── RIGHT: CV + Journey + Stats ── */}
          <motion.div variants={slideR} className="abs-right">

            {/* CV Section */}
            {cvEnabled ? (
              <motion.div variants={fadeUp} className="abs-cv-card card">
                <div className="abs-cv-header">
                  <div className="abs-cv-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    <p className="abs-cv-title">Muhtasim Rahman — CV</p>
                    <p className="abs-cv-sub">Curriculum Vitae · Latest Version</p>
                  </div>
                </div>
                <div className="abs-cv-actions">
                  <a href={cvUrl} download className="abs-cv-btn abs-cv-primary" data-click-fx>
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </a>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="abs-cv-btn abs-cv-outline" data-click-fx>
                    <FontAwesomeIcon icon={faEye} />
                    Preview
                  </a>
                  <button className="abs-cv-btn abs-cv-outline" onClick={handlePrint} data-click-fx>
                    <FontAwesomeIcon icon={faPrint} />
                    Print
                  </button>
                  <button className="abs-cv-btn abs-cv-outline" onClick={handleShare} data-click-fx>
                    <FontAwesomeIcon icon={faShare} />
                    Share
                  </button>
                </div>
              </motion.div>
            ) : null}

            {/* Journey milestones */}
            {[
              { icon: faSeedling, color: '#10B981', title: 'Early Spark',
                text: 'Fascinated by technology since childhood. Started with electrical engineering dreams, discovered web dev through YouTube tutorials.' },
              { icon: faCode, color: '#3B82F6', title: 'Learning in Progress',
                text: 'Self-taught through tutorials and real projects. Built everything from restaurant sites to full PWA applications — even during SSC prep.' },
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

            {/* Exp stats */}
            <motion.div variants={stagger(.08)} className="abs-stats-grid">
              {[
                { val: settings?.statsYearsDev ?? '3+',       lbl: 'Years Dev',     icon: faCode,    c: '#3B82F6' },
                { val: settings?.statsYearsDesign ?? '6+',    lbl: 'Years Design',  icon: faPalette, c: '#8B5CF6' },
                { val: '5+',                                   lbl: 'Years Video',   icon: faVideo,   c: '#EC4899' },
                { val: settings?.statsProjects ?? '16+',      lbl: 'Projects Built',icon: faRocket,  c: '#10B981' },
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
        /* ── Grid ── */
        .abs-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 900px) {
          .abs-grid { grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
        }

        /* ── Left ── */
        .abs-left { display: flex; flex-direction: column; gap: 1.25rem; }
        .abs-label {
          display: inline-flex; align-items: center;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .2rem;
        }
        .abs-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: .3rem;
        }
        .abs-accent { color: var(--accent-primary); }

        /* Info card */
        .abs-info-card { padding: 1.25rem 1.4rem; }
        .abs-info-title {
          font-size: .82rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .85rem; padding-bottom: .6rem;
          border-bottom: 1px solid var(--border-color);
        }
        .abs-info-list { display: flex; flex-direction: column; gap: 0; }
        .abs-info-row {
          display: flex; align-items: center; gap: .75rem;
          padding: .45rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .abs-info-row:last-child { border-bottom: none; }
        .abs-info-icon {
          width: 26px; height: 26px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem; flex-shrink: 0;
        }
        .abs-info-key {
          font-size: .75rem; font-weight: 600; color: var(--text-secondary);
          min-width: 90px; flex-shrink: 0; font-family: var(--font-mono);
        }
        .abs-info-val {
          font-size: .78rem; color: var(--text-primary); font-weight: 500;
          word-break: break-word;
        }

        /* Quote */
        .abs-quote {
          padding: 1.25rem 1.4rem;
          border-left: 3px solid var(--accent-primary);
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        .abs-quote-icon {
          color: var(--accent-primary); opacity: .3; font-size: 1.1rem;
          margin-bottom: .5rem; display: block;
        }
        .abs-quote-text {
          font-size: .875rem; line-height: 1.78; color: var(--text-secondary);
          font-style: italic; margin-bottom: .65rem;
        }
        .abs-quote-attr {
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* ── Right ── */
        .abs-right { display: flex; flex-direction: column; gap: 1rem; }

        /* CV card */
        .abs-cv-card { padding: 1.25rem 1.4rem; }
        .abs-cv-header {
          display: flex; align-items: center; gap: .875rem; margin-bottom: 1rem;
        }
        .abs-cv-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; flex-shrink: 0;
        }
        .abs-cv-title { font-size: .9rem; font-weight: 700; color: var(--text-primary); }
        .abs-cv-sub { font-size: .72rem; color: var(--text-tertiary); margin-top: .15rem; font-family: var(--font-mono); }
        .abs-cv-actions { display: flex; flex-wrap: wrap; gap: .6rem; }
        .abs-cv-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .45rem .95rem; border-radius: var(--radius-md);
          font-size: .78rem; font-weight: 600; cursor: pointer;
          text-decoration: none; transition: all .2s ease;
          border: none; font-family: var(--font-body);
        }
        .abs-cv-primary {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.3);
        }
        .abs-cv-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .abs-cv-outline {
          background: var(--bg-surface); color: var(--text-primary);
          border: 1px solid var(--border-strong);
        }
        .abs-cv-outline:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Journey cards */
        .abs-journey-card { display: flex; align-items: flex-start; gap: .85rem; padding: 1rem 1.1rem; }
        .abs-journey-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0; margin-top: .1rem;
        }
        .abs-journey-title {
          font-size: .875rem; font-weight: 600; color: var(--text-primary); margin-bottom: .3rem;
        }
        .abs-journey-text { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; }

        /* Stats grid */
        .abs-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .75rem; }
        .abs-stat-card { padding: 1rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: .5rem; }
        .abs-stat-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center; font-size: .8rem;
        }
        .abs-stat-val { font-family: var(--font-display); font-weight: 800; font-size: 1.4rem; line-height: 1; }
        .abs-stat-lbl { font-size: .68rem; color: var(--text-secondary); font-weight: 500; }
      `}</style>
    </section>
  )
}
