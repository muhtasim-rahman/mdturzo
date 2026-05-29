// ============================================================
// AboutStory.jsx — v2.3.4
// REDESIGN: Fresh layout, new title "Background"
//   * Clean two-column: left = personal card + quote
//     right = journey milestones + experience grid
//   * New section header style
//   * Minimal, uncluttered design
// ============================================================

import { motion }            from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import {
  faQuoteLeft, faSeedling, faCode, faRocket,
  faLocationDot, faGraduationCap, faEnvelope,
  faUser, faMosque, faCalendar,
  faDownload, faEye, faPrint, faShare,
  faPalette, faVideo, faBullseye, faLanguage,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings }   from '../../hooks/useSiteSettings.js'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.16,1,.3,1] } } }
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

const INFO_ROWS = (age) => [
  { icon: faUser,          color: '#3B82F6', label: 'Full Name',   value: 'Md Muhtasim Rahman Mahmud' },
  { icon: faUser,          color: '#8B5CF6', label: 'Known As',    value: 'Turzo' },
  { icon: faCalendar,      color: '#F59E0B', label: 'Age',         value: `${age} years old` },
  { icon: faLocationDot,   color: '#10B981', label: 'Location',    value: 'Nilphamari, Bangladesh' },
  { icon: faMosque,        color: '#10B981', label: 'Religion',    value: 'Islam (Muslim)' },
  { icon: faGraduationCap, color: '#3B82F6', label: 'Education',   value: 'SSC-26 · SGSC, Saidpur' },
  { icon: faBullseye,      color: '#F59E0B', label: 'Career Goal', value: 'CSE Engineer & Full-Stack Dev' },
  { icon: faEnvelope,      color: '#EF4444', label: 'Email',       value: SITE_CONFIG.owner.email },
  { icon: faLanguage,      color: '#06B6D4', label: 'Languages',   value: 'Bengali · English · Hindi · Urdu' },
]

const JOURNEY = [
  { icon: faSeedling, color: '#10B981', title: 'Early Spark',
    text: 'From childhood curiosity about circuits and machines, I shifted goals from electrical engineering to web development — all through self-learning on YouTube.' },
  { icon: faCode,     color: '#3B82F6', title: 'Learning Through Building',
    text: 'I never stopped making projects — even through SSC exam prep. From small restaurant sites to full PWAs, every project deepened my understanding.' },
  { icon: faRocket,   color: '#F59E0B', title: "The Road Ahead",
    text: 'SSC done, HSC next, then BSc in CSE. Each deployed project is one step closer to becoming a professional full-stack developer — on halal principles.' },
]

const EXP_STATS = (settings) => [
  { val: settings?.statsYearsDev   ?? '3+', lbl: 'Years Dev',    icon: faCode,    c: '#3B82F6' },
  { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design', icon: faPalette, c: '#8B5CF6' },
  { val: '5+',                               lbl: 'Years Video',  icon: faVideo,   c: '#EC4899' },
  { val: settings?.statsProjects   ?? '16+', lbl: 'Projects',     icon: faRocket,  c: '#10B981' },
]

export default function AboutStory() {
  const { settings } = useSiteSettings()
  const age    = calculateAge()
  const cvEnabled = settings?.cvEnabled && settings?.cvUrl
  const cvUrl  = settings?.cvUrl

  const handlePrint = () => {
    if (!cvUrl) return
    const w = window.open(cvUrl, '_blank')
    if (w) w.addEventListener('load', () => { try { w.print() } catch {} })
  }

  const handleShare = async () => {
    if (!cvUrl) return
    if (navigator.share) {
      try { await navigator.share({ title: 'Muhtasim Rahman — CV', text: 'Check out my CV', url: cvUrl }) } catch {}
    } else {
      try { await navigator.clipboard.writeText(cvUrl); alert('CV link copied!') } catch {}
    }
  }

  return (
    <section className="section section-alt" id="about-story">
      <div className="container-xl">

        {/* Section header */}
        <motion.div className="abs-head"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
          <motion.p variants={fadeUp} className="abs-label">Background</motion.p>
          <motion.h2 variants={fadeUp} className="abs-h2">
            The person behind <span className="abs-accent">the projects</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="abs-sub">
            A self-taught developer, student, and creator — here's who I am.
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div className="abs-stats-row"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }} transition={{ duration: .5 }}>
          {EXP_STATS(settings).map(({ val, lbl, icon, c }) => (
            <div key={lbl} className="abs-stat-pill">
              <div className="abs-stat-icon" style={{ background: `${c}18`, color: c }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div>
                <p className="abs-stat-val" style={{ color: c }}>{val}</p>
                <p className="abs-stat-lbl">{lbl}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="abs-grid">
          {/* ── LEFT ── */}
          <motion.div className="abs-col"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .06 }} transition={{ duration: .55, ease: [.16,1,.3,1] }}>

            {/* Personal info */}
            <div className="abs-info card">
              <p className="abs-card-title">
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--accent-primary)' }} />
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

            {/* CV card */}
            {cvEnabled && (
              <div className="abs-cv card">
                <div className="abs-cv-top">
                  <div className="abs-cv-doc-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    <p className="abs-cv-name">Muhtasim Rahman — CV</p>
                    <p className="abs-cv-sub">Curriculum Vitae · Latest Version</p>
                  </div>
                </div>
                <div className="abs-cv-actions">
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                    className="abs-cv-btn abs-cv-outline">
                    <FontAwesomeIcon icon={faEye} /> Preview
                  </a>
                  <a href={cvUrl} download className="abs-cv-btn abs-cv-fill">
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <button className="abs-cv-btn abs-cv-outline" onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  <button className="abs-cv-btn abs-cv-outline" onClick={handleShare}>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            )}

            {/* Quote */}
            <blockquote className="abs-quote card">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs-quote-icon" />
              <p className="abs-quote-text">
                "I aim to develop impactful websites that combine functionality with captivating
                design — while adhering to Islamic and ethical principles in all my work."
              </p>
              <footer className="abs-quote-attr">— Muhtasim Rahman</footer>
            </blockquote>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div className="abs-col"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .06 }} transition={{ duration: .55, ease: [.16,1,.3,1] }}>

            {/* Journey */}
            <p className="abs-journey-label">My Journey</p>
            {JOURNEY.map(({ icon, color, title, text }, i) => (
              <motion.div key={title} className="abs-journey card"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: .45, delay: i * .08 }}>
                <div className="abs-journey-num" style={{ background: `${color}15`, color }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="abs-journey-icon-row">
                    <div className="abs-journey-icon" style={{ background: `${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <p className="abs-journey-title">{title}</p>
                  </div>
                  <p className="abs-journey-text">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .abs-head { margin-bottom: 1.75rem; }
        .abs-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .4rem; display: block;
        }
        .abs-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .45rem;
        }
        .abs-accent { color: var(--accent-primary); }
        .abs-sub {
          font-size: .88rem; color: var(--text-secondary); line-height: 1.7;
          max-width: 520px;
        }

        /* Stats row */
        .abs-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .65rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 640px) { .abs-stats-row { grid-template-columns: repeat(2, 1fr); } }
        .abs-stat-pill {
          display: flex; align-items: center; gap: .7rem;
          padding: .85rem 1rem;
          border-radius: var(--radius-xl);
          background: var(--bg-surface); border: 1px solid var(--border-color);
        }
        .abs-stat-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem; flex-shrink: 0;
        }
        .abs-stat-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.25rem; line-height: 1;
        }
        .abs-stat-lbl {
          font-size: .68rem; color: var(--text-tertiary); margin-top: .12rem;
          font-family: var(--font-mono);
        }

        /* Two-column grid */
        .abs-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.5rem; align-items: start;
        }
        @media (max-width: 860px) { .abs-grid { grid-template-columns: 1fr; } }

        .abs-col { display: flex; flex-direction: column; gap: 1rem; }

        /* Personal info card */
        .abs-info { padding: 1.25rem; }
        .abs-card-title {
          display: flex; align-items: center; gap: .5rem;
          font-size: .8rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .9rem;
        }
        .abs-info-list { display: flex; flex-direction: column; gap: 0; }
        .abs-info-row {
          display: flex; align-items: center; gap: .75rem;
          padding: .55rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .abs-info-row:last-child { border-bottom: none; }
        .abs-info-icon {
          width: 26px; height: 26px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .6rem; flex-shrink: 0;
        }
        .abs-info-key {
          font-size: .73rem; color: var(--text-tertiary);
          font-family: var(--font-mono); flex-shrink: 0; width: 90px;
        }
        .abs-info-val {
          font-size: .78rem; color: var(--text-primary); font-weight: 500;
          flex: 1; min-width: 0; word-break: break-word;
        }
        @media (max-width: 400px) {
          .abs-info-key { width: 78px; font-size: .7rem; }
          .abs-info-val { font-size: .74rem; }
        }

        /* CV card */
        .abs-cv { padding: 1.1rem; }
        .abs-cv-top {
          display: flex; align-items: center; gap: .75rem; margin-bottom: .9rem;
        }
        .abs-cv-doc-icon {
          width: 38px; height: 38px; border-radius: var(--radius-md);
          background: var(--accent-light); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem; flex-shrink: 0;
        }
        .abs-cv-name { font-size: .84rem; font-weight: 700; color: var(--text-primary); }
        .abs-cv-sub  { font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono); }
        .abs-cv-actions {
          display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: .45rem;
        }
        @media (max-width: 480px) { .abs-cv-actions { grid-template-columns: 1fr 1fr; } }
        .abs-cv-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: .35rem;
          padding: .45rem .65rem; border-radius: var(--radius-md);
          font-size: .75rem; font-weight: 600; cursor: pointer;
          border: 1px solid; transition: all .18s ease; text-decoration: none;
          white-space: nowrap;
        }
        .abs-cv-outline {
          background: transparent; color: var(--text-secondary);
          border-color: var(--border-color);
        }
        .abs-cv-outline:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }
        .abs-cv-fill {
          background: var(--accent-primary); color: #fff;
          border-color: var(--accent-primary);
        }
        .abs-cv-fill:hover { background: var(--accent-hover); border-color: var(--accent-hover); }

        /* Quote */
        .abs-quote { padding: 1.25rem; position: relative; }
        .abs-quote-icon {
          font-size: 1.8rem; color: var(--accent-primary); opacity: .2;
          margin-bottom: .6rem; display: block;
        }
        .abs-quote-text {
          font-size: .875rem; color: var(--text-secondary);
          line-height: 1.78; font-style: italic;
        }
        .abs-quote-attr {
          margin-top: .75rem; font-size: .75rem; font-weight: 600;
          color: var(--accent-primary); font-family: var(--font-mono);
        }

        /* Journey */
        .abs-journey-label {
          font-family: var(--font-mono); font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary); margin-bottom: .35rem;
        }
        .abs-journey {
          padding: 1.1rem 1.15rem;
          display: flex; align-items: flex-start; gap: 1rem;
        }
        .abs-journey-num {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.4rem; line-height: 1;
          width: 44px; height: 44px; flex-shrink: 0;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
        }
        .abs-journey-icon-row {
          display: flex; align-items: center; gap: .5rem; margin-bottom: .5rem;
        }
        .abs-journey-icon {
          width: 26px; height: 26px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem; flex-shrink: 0;
        }
        .abs-journey-title {
          font-size: .88rem; font-weight: 700; color: var(--text-primary);
        }
        .abs-journey-text {
          font-size: .8rem; color: var(--text-secondary); line-height: 1.7;
        }
      `}</style>
    </section>
  )
}
