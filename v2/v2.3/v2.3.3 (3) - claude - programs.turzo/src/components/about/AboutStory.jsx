// ============================================================
// AboutStory.jsx — v2.3.3
// CHANGES:
//   * Minimal clean rebuild — simpler card hierarchy
//   * CV section: Preview = separate new tab link,
//     Download = direct download link,
//     Print = opens preview then triggers print,
//     Share = device Web Share API / clipboard fallback
//   * Personal info list: compact table-style rows
//   * Journey cards: cleaner single-card stack
//   * Stats: small inline badges instead of grid
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuoteLeft, faSeedling, faCode, faRocket,
  faLocationDot, faGraduationCap, faEnvelope,
  faUser, faMosque, faCalendar, faDownload,
  faEye, faPrint, faShare, faBullseye,
  faLanguage, faFilePdf, faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: .5, ease: [.16, 1, .3, 1] } },
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
  { icon: faLanguage,      color: '#06B6D4', label: 'Languages',   value: 'Bengali · English · Hindi · Urdu' },
]

const JOURNEY = [
  {
    icon: faSeedling, color: '#10B981', title: 'Early Spark',
    text: 'Fascinated by technology since childhood — started with electrical engineering dreams, then discovered web dev through YouTube.',
  },
  {
    icon: faCode, color: '#3B82F6', title: 'Learning in Progress',
    text: 'Self-taught via tutorials and real projects. Built everything from restaurant sites to full PWAs — even during SSC prep.',
  },
  {
    icon: faRocket, color: '#8B5CF6', title: "What's Next",
    text: "SSC done, HSC next, then CSE. Every shipped project is a step toward becoming a professional full-stack developer.",
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
        <motion.div className="abs2-grid"
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: .06 }}
          variants={stagger(.08)}>

          {/* ── LEFT ── */}
          <motion.div variants={fadeUp} className="abs2-left">
            <p className="abs2-label">My Story</p>
            <h2 className="abs2-h2">
              From circuits to<br />
              <span className="abs2-accent">clean code</span>
            </h2>

            {/* Info list */}
            <div className="card abs2-info-card">
              <p className="abs2-info-heading">
                <FontAwesomeIcon icon={faUser} />
                Personal Details
              </p>
              <div className="abs2-info-list">
                {INFO_ROWS(age).map(({ icon, color, label, value }) => (
                  <div key={label} className="abs2-info-row">
                    <FontAwesomeIcon icon={icon} className="abs2-info-icon" style={{ color }} />
                    <span className="abs2-info-key">{label}</span>
                    <span className="abs2-info-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="abs2-quote">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs2-quote-mark" />
              <p>
                "I aim to develop impactful websites that seamlessly combine
                functionality with captivating design — while adhering to
                ethical and Halal principles."
              </p>
              <footer>— Muhtasim Rahman</footer>
            </blockquote>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div variants={fadeUp} className="abs2-right">

            {/* CV Card */}
            {cvEnabled && (
              <div className="card abs2-cv-card">
                <div className="abs2-cv-header">
                  <div className="abs2-cv-icon-wrap">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </div>
                  <div className="abs2-cv-meta">
                    <span className="abs2-cv-name">Muhtasim Rahman</span>
                    <span className="abs2-cv-sub">Curriculum Vitae · Latest Version</span>
                  </div>
                </div>
                <div className="abs2-cv-divider" />
                <div className="abs2-cv-actions">
                  {/* Preview — opens in a new tab */}
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                    className="abs2-cv-btn abs2-cv-btn-outline">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    <span>Preview</span>
                  </a>
                  {/* Download — direct link with download attribute */}
                  <a href={cvUrl} download className="abs2-cv-btn abs2-cv-btn-primary">
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Download</span>
                  </a>
                  {/* Print — opens preview page and triggers print */}
                  <button className="abs2-cv-btn abs2-cv-btn-outline" onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint} />
                    <span>Print</span>
                  </button>
                  {/* Share — device native share sheet */}
                  <button className="abs2-cv-btn abs2-cv-btn-outline" onClick={handleShare}>
                    <FontAwesomeIcon icon={faShare} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            )}

            {/* Journey */}
            <div className="abs2-journey">
              {JOURNEY.map(({ icon, color, title, text }, i) => (
                <motion.div key={title} variants={fadeUp} className="abs2-journey-item">
                  <div className="abs2-journey-line">
                    <div className="abs2-journey-dot" style={{ background: color, boxShadow: `0 0 0 4px ${color}22` }}>
                      <FontAwesomeIcon icon={icon} style={{ color: '#fff', fontSize: '.55rem' }} />
                    </div>
                    {i < JOURNEY.length - 1 && <div className="abs2-journey-connector" />}
                  </div>
                  <div className="abs2-journey-body">
                    <p className="abs2-journey-title" style={{ color }}>{title}</p>
                    <p className="abs2-journey-text">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Experience badges */}
            <div className="abs2-exp-badges">
              {[
                { val: settings?.statsYearsDev ?? '3+',    lbl: 'Years Dev',     c: '#3B82F6' },
                { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design',  c: '#8B5CF6' },
                { val: '5+',                                lbl: 'Years Video',   c: '#EC4899' },
                { val: settings?.statsProjects ?? '16+',   lbl: 'Projects',      c: '#10B981' },
              ].map(({ val, lbl, c }) => (
                <div key={lbl} className="abs2-badge" style={{ '--bc': c }}>
                  <span className="abs2-badge-val" style={{ color: c }}>{val}</span>
                  <span className="abs2-badge-lbl">{lbl}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .abs2-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem;
        }
        @media (min-width: 900px) {
          .abs2-grid { grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
        }

        /* Left */
        .abs2-left { display: flex; flex-direction: column; gap: 1.25rem; }
        .abs2-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
        }
        .abs2-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary);
        }
        .abs2-accent { color: var(--accent-primary); }

        /* Info card */
        .abs2-info-card { padding: 1.1rem 1.25rem; }
        .abs2-info-heading {
          display: flex; align-items: center; gap: .5rem;
          font-size: .78rem; font-weight: 700; color: var(--text-primary);
          padding-bottom: .65rem; margin-bottom: .65rem;
          border-bottom: 1px solid var(--border-color);
        }
        .abs2-info-list { display: flex; flex-direction: column; }
        .abs2-info-row {
          display: grid; grid-template-columns: 18px 88px 1fr;
          align-items: center; gap: .55rem;
          padding: .38rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .abs2-info-row:last-child { border-bottom: none; }
        .abs2-info-icon { font-size: .65rem; text-align: center; }
        .abs2-info-key {
          font-size: .7rem; font-weight: 600; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .abs2-info-val { font-size: .75rem; color: var(--text-primary); font-weight: 500; }

        /* Quote */
        .abs2-quote {
          border-left: 3px solid var(--accent-primary);
          padding: .85rem 1.1rem;
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin: 0;
        }
        .abs2-quote-mark {
          color: var(--accent-primary); opacity: .25; font-size: 1rem;
          display: block; margin-bottom: .4rem;
        }
        .abs2-quote p { font-size: .84rem; line-height: 1.75; color: var(--text-secondary); font-style: italic; margin: 0 0 .45rem 0; }
        .abs2-quote footer { font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono); }

        /* Right */
        .abs2-right { display: flex; flex-direction: column; gap: 1.1rem; }

        /* CV card */
        .abs2-cv-card { padding: 1.25rem; }
        .abs2-cv-header {
          display: flex; align-items: center; gap: .85rem;
        }
        .abs2-cv-icon-wrap {
          width: 44px; height: 44px; flex-shrink: 0;
          border-radius: var(--radius-lg);
          background: rgba(239,68,68,.12); color: #EF4444;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem;
        }
        .abs2-cv-meta { display: flex; flex-direction: column; gap: .12rem; }
        .abs2-cv-name { font-size: .9rem; font-weight: 700; color: var(--text-primary); }
        .abs2-cv-sub { font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono); }
        .abs2-cv-divider {
          height: 1px; background: var(--border-color); margin: 1rem 0;
        }
        .abs2-cv-actions {
          display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: .5rem;
        }
        @media (max-width: 480px) {
          .abs2-cv-actions { grid-template-columns: 1fr 1fr; }
        }
        .abs2-cv-btn {
          display: flex; flex-direction: column; align-items: center;
          gap: .3rem; padding: .65rem .5rem;
          border-radius: var(--radius-md); cursor: pointer;
          font-size: .7rem; font-weight: 600; text-decoration: none;
          font-family: var(--font-body); transition: all .18s ease;
          border: none;
        }
        .abs2-cv-btn svg { font-size: .85rem; }
        .abs2-cv-btn-primary {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.25);
        }
        .abs2-cv-btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .abs2-cv-btn-outline {
          background: var(--bg-surface); color: var(--text-secondary);
          border: 1px solid var(--border-strong);
        }
        .abs2-cv-btn-outline:hover {
          color: var(--accent-primary); border-color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Journey */
        .abs2-journey { display: flex; flex-direction: column; }
        .abs2-journey-item {
          display: flex; gap: .85rem; align-items: flex-start;
        }
        .abs2-journey-line {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0;
        }
        .abs2-journey-dot {
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: .18rem;
        }
        .abs2-journey-connector {
          width: 2px; flex: 1; min-height: 20px;
          background: var(--border-color); margin: .3rem 0;
        }
        .abs2-journey-body { padding-bottom: 1rem; flex: 1; }
        .abs2-journey-item:last-child .abs2-journey-body { padding-bottom: 0; }
        .abs2-journey-title {
          font-size: .84rem; font-weight: 700; margin-bottom: .2rem;
        }
        .abs2-journey-text { font-size: .78rem; color: var(--text-secondary); line-height: 1.65; }

        /* Exp badges */
        .abs2-exp-badges {
          display: flex; flex-wrap: wrap; gap: .5rem;
        }
        .abs2-badge {
          display: flex; align-items: center; gap: .4rem;
          padding: .45rem .85rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          transition: border-color .18s;
        }
        .abs2-badge:hover { border-color: var(--bc, var(--accent-primary)); }
        .abs2-badge-val { font-family: var(--font-display); font-weight: 800; font-size: .95rem; line-height: 1; }
        .abs2-badge-lbl { font-size: .68rem; color: var(--text-tertiary); font-weight: 500; }
      `}</style>
    </section>
  )
}
