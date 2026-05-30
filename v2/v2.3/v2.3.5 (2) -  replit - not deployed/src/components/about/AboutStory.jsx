// ============================================================
// AboutStory.jsx — v2.3.5
// CHANGES:
//   * CV card: replaced 'CV' text badge with /logo.webp image
//   * Personal Details rows: subtle bg on hover
// ============================================================

import { motion }            from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import {
  faSeedling, faCode, faRocket, faLocationDot,
  faGraduationCap, faEnvelope, faUser, faMosque,
  faCalendar, faDownload, faEye, faPrint, faShare,
  faPalette, faVideo, faBullseye, faLanguage,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings }   from '../../hooks/useSiteSettings.js'

const fadeSide = (dir = 1) => ({
  hidden: { opacity: 0, x: dir * 24 },
  show:   { opacity: 1, x: 0, transition: { duration: .55, ease: [.16,1,.3,1] } },
})
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.16,1,.3,1] } } }

const INFO_ROWS = (age) => [
  { icon: faUser,          c: '#3B82F6', label: 'Full Name',   value: 'Md Muhtasim Rahman Mahmud' },
  { icon: faUser,          c: '#8B5CF6', label: 'Nickname',    value: 'Turzo' },
  { icon: faCalendar,      c: '#F59E0B', label: 'Age',         value: `${age} years old` },
  { icon: faLocationDot,   c: '#10B981', label: 'Location',    value: 'Nilphamari, Bangladesh' },
  { icon: faMosque,        c: '#10B981', label: 'Religion',    value: 'Islam (Muslim)' },
  { icon: faGraduationCap, c: '#3B82F6', label: 'Education',   value: 'SSC-26 · SGSC, Saidpur' },
  { icon: faBullseye,      c: '#F59E0B', label: 'Goal',        value: 'CSE Engineer & Full-Stack Dev' },
  { icon: faEnvelope,      c: '#EF4444', label: 'Email',       value: SITE_CONFIG.owner.email },
  { icon: faLanguage,      c: '#06B6D4', label: 'Languages',   value: 'Bengali · English · Hindi · Urdu' },
]

const JOURNEY = [
  {
    icon: faSeedling, c: '#10B981', title: 'Early Spark',
    text: 'Since childhood, I was drawn to how things work. Started with dreams of electrical engineering, then found my true calling through web development and programming.',
  },
  {
    icon: faCode, c: '#3B82F6', title: 'Self-Taught Path',
    text: 'Learned through YouTube, projects, and persistence. Built everything from landing pages to full PWAs — even while preparing for SSC exams.',
  },
  {
    icon: faRocket, c: '#F59E0B', title: "What's Next",
    text: "SSC complete. HSC next, then a BSc in CSE. Every shipped project is one step closer to becoming a professional full-stack developer.",
  },
]

const EXP_STATS = (s) => [
  { val: s?.statsYearsDev    ?? '3+', lbl: 'Years Dev',     c: '#3B82F6', icon: faCode    },
  { val: s?.statsYearsDesign ?? '6+', lbl: 'Years Design',  c: '#8B5CF6', icon: faPalette },
  { val: '5+',                         lbl: 'Years Video',   c: '#EC4899', icon: faVideo   },
  { val: s?.statsProjects    ?? '16+', lbl: 'Projects',      c: '#10B981', icon: faRocket  },
]

export default function AboutStory() {
  const { settings } = useSiteSettings()
  const age     = calculateAge()
  const cvOk    = settings?.cvEnabled && settings?.cvUrl
  const cvUrl   = settings?.cvUrl

  const handlePrint = () => {
    if (!cvUrl) return
    const w = window.open(cvUrl, '_blank')
    if (w) w.addEventListener('load', () => { try { w.print() } catch {} })
  }
  const handleShare = async () => {
    if (!cvUrl) return
    if (navigator.share) {
      try { await navigator.share({ title: 'Muhtasim Rahman — CV', url: cvUrl }) } catch {}
    } else {
      try { await navigator.clipboard.writeText(cvUrl); alert('CV link copied!') } catch {}
    }
  }

  return (
    <section className="section section-alt" id="about-story">
      <div className="container-xl">

        {/* Header */}
        <motion.div className="ast-header"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: .08 } } }}>
          <motion.p variants={fadeUp} className="ast-label">Who I Am</motion.p>
          <motion.h2 variants={fadeUp} className="ast-h2">
            From circuits to <span className="ast-accent">clean code</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="ast-sub">
            A developer-in-progress from Bangladesh, building meaningful things one project at a time.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div className="ast-stats-bar"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}>
          {EXP_STATS(settings).map(({ val, lbl, c, icon }) => (
            <div key={lbl} className="ast-stat-item">
              <div className="ast-stat-icon" style={{ background: `${c}18`, color: c }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div>
                <p className="ast-stat-val" style={{ color: c }}>{val}</p>
                <p className="ast-stat-lbl">{lbl}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main 2-col layout */}
        <div className="ast-grid">

          {/* LEFT: personal info + CV */}
          <motion.div className="ast-col"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: .07 }}
            variants={fadeSide(-1)}>

            <div className="ast-info-card">
              <p className="ast-card-title">
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--accent-primary)' }} />
                Personal Details
              </p>
              <div className="ast-info-list">
                {INFO_ROWS(age).map(({ icon, c, label, value }) => (
                  <div key={label} className="ast-info-row">
                    <span className="ast-info-icon" style={{ background: `${c}18`, color: c }}>
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="ast-info-key">{label}</span>
                    <span className="ast-info-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {cvOk && (
              <div className="ast-cv-card">
                <div className="ast-cv-top">
                  {/* Navbar logo image instead of text badge */}
                  <div className="ast-cv-img-wrap">
                    <img src="/logo.webp" alt="Muhtasim" className="ast-cv-img" />
                  </div>
                  <div>
                    <p className="ast-cv-name">Muhtasim Rahman</p>
                    <p className="ast-cv-sub">Curriculum Vitae · Latest Version</p>
                  </div>
                </div>
                <div className="ast-cv-actions">
                  <a href={cvUrl} download className="ast-cv-btn ast-cv-primary" data-click-fx>
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="ast-cv-btn ast-cv-outline" data-click-fx>
                    <FontAwesomeIcon icon={faEye} /> Preview
                  </a>
                  <button className="ast-cv-btn ast-cv-outline" onClick={handlePrint} data-click-fx>
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  <button className="ast-cv-btn ast-cv-outline" onClick={handleShare} data-click-fx>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT: journey + quote */}
          <motion.div className="ast-col"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: .07 }}
            variants={fadeSide(1)}>

            <div className="ast-journey-list">
              {JOURNEY.map(({ icon, c, title, text }, i) => (
                <div key={title} className="ast-journey-item">
                  <div className="ast-journey-left">
                    <div className="ast-journey-icon" style={{ background: `${c}18`, color: c }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    {i < JOURNEY.length - 1 && <div className="ast-journey-line" />}
                  </div>
                  <div className="ast-journey-body">
                    <p className="ast-journey-title" style={{ color: c }}>{title}</p>
                    <p className="ast-journey-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="ast-quote">
              <FontAwesomeIcon icon={faQuoteLeft} className="ast-quote-icon" aria-hidden="true" />
              <p className="ast-quote-text">
                "I possess a strong passion for programming and web development.
                I aim to develop impactful websites that combine functionality with
                captivating design — while adhering to ethical and Halal principles."
              </p>
              <footer className="ast-quote-attr">— Muhtasim Rahman</footer>
            </blockquote>

          </motion.div>
        </div>

      </div>

      <style>{`
        /* Header */
        .ast-header { margin-bottom: 2rem; }
        .ast-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .4rem; display: block;
        }
        .ast-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary); margin: 0 0 .35rem;
        }
        .ast-accent { color: var(--accent-primary); }
        .ast-sub { color: var(--text-secondary); font-size: .9rem; line-height: 1.7; max-width: 520px; margin: 0; }

        /* Stats bar */
        .ast-stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .75rem; margin-bottom: 2.5rem;
          padding: 1rem 1.25rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
        }
        @media (max-width: 600px) {
          .ast-stats-bar { grid-template-columns: repeat(2, 1fr); }
        }
        .ast-stat-item { display: flex; align-items: center; gap: .65rem; }
        .ast-stat-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0;
        }
        .ast-stat-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.25rem; line-height: 1; margin: 0;
        }
        .ast-stat-lbl { font-size: .65rem; color: var(--text-secondary); margin: .1rem 0 0; }

        /* 2-col grid */
        .ast-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 860px) {
          .ast-grid { grid-template-columns: 1fr 1fr; gap: 2.25rem; align-items: start; }
        }
        .ast-col { display: flex; flex-direction: column; gap: 1rem; }

        /* Info card */
        .ast-info-card { padding: 1.2rem 1.35rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); }
        .ast-card-title {
          display: flex; align-items: center; gap: .5rem;
          font-size: .82rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .85rem; padding-bottom: .55rem;
          border-bottom: 1px solid var(--border-color);
        }
        .ast-info-list { display: flex; flex-direction: column; }
        .ast-info-row {
          display: flex; align-items: center; gap: .65rem;
          padding: .38rem .3rem; border-bottom: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: background .15s ease;
        }
        .ast-info-row:last-child { border-bottom: none; }
        .ast-info-row:hover { background: var(--bg-surface-2); }
        .ast-info-icon {
          width: 24px; height: 24px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .58rem; flex-shrink: 0;
        }
        .ast-info-key {
          font-size: .7rem; font-weight: 600; color: var(--text-secondary);
          min-width: 80px; flex-shrink: 0; font-family: var(--font-mono);
        }
        .ast-info-val { font-size: .76rem; color: var(--text-primary); font-weight: 500; flex: 1; word-break: break-word; }

        /* CV card */
        .ast-cv-card { padding: 1.1rem 1.35rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); }
        .ast-cv-top { display: flex; align-items: center; gap: .8rem; margin-bottom: .85rem; }

        /* Logo image instead of text badge */
        .ast-cv-img-wrap {
          width: 40px; height: 40px; border-radius: var(--radius-lg);
          overflow: hidden; flex-shrink: 0;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
        }
        .ast-cv-img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .ast-cv-name { font-size: .875rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .ast-cv-sub  { font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono); margin: .1rem 0 0; }
        .ast-cv-actions { display: flex; flex-wrap: wrap; gap: .45rem; }
        .ast-cv-btn {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .38rem .85rem; border-radius: var(--radius-md);
          font-size: .75rem; font-weight: 600; cursor: pointer;
          text-decoration: none; transition: all .18s ease;
          border: none; font-family: var(--font-body);
        }
        .ast-cv-primary {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.28);
        }
        .ast-cv-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .ast-cv-outline {
          background: var(--bg-surface); color: var(--text-primary);
          border: 1px solid var(--border-strong);
        }
        .ast-cv-outline:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Journey */
        .ast-journey-list { display: flex; flex-direction: column; }
        .ast-journey-item { display: flex; gap: .85rem; }
        .ast-journey-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .ast-journey-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .78rem; flex-shrink: 0;
        }
        .ast-journey-line { width: 2px; flex: 1; min-height: 24px; background: var(--border-color); margin: .35rem 0; }
        .ast-journey-body { padding-bottom: 1.25rem; flex: 1; }
        .ast-journey-title { font-size: .85rem; font-weight: 700; margin-bottom: .28rem; margin-top: .5rem; }
        .ast-journey-text { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; margin: 0; }

        /* Quote */
        .ast-quote {
          padding: 1.2rem 1.35rem;
          border-left: 3px solid var(--accent-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
        }
        .ast-quote-icon { color: var(--accent-primary); opacity: .22; font-size: .95rem; margin-bottom: .4rem; display: block; }
        .ast-quote-text { font-size: .875rem; line-height: 1.78; color: var(--text-secondary); font-style: italic; margin-bottom: .5rem; }
        .ast-quote-attr { font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono); }
      `}</style>
    </section>
  )
}
