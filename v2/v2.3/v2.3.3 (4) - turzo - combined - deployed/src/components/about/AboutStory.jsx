// ============================================================
// AboutStory.jsx — v2.3.3
// Story section — minimal clean rebuild.
// CV: preview=new tab, download=direct, print=preview+print, share=native share
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
  { icon: faUser,          color: '#8B5CF6', label: 'Nickname',    value: 'Turzo' },
  { icon: faCalendar,      color: '#F59E0B', label: 'Age',         value: `${age} years` },
  { icon: faLocationDot,   color: '#10B981', label: 'Location',    value: 'Nilphamari, Bangladesh' },
  { icon: faMosque,        color: '#10B981', label: 'Religion',    value: 'Islam (Muslim)' },
  { icon: faGraduationCap, color: '#3B82F6', label: 'Education',   value: 'SSC-26 · SGSC, Saidpur' },
  { icon: faBullseye,      color: '#F59E0B', label: 'Career Goal', value: 'CSE Engineer & Full-Stack Dev' },
  { icon: faEnvelope,      color: '#EF4444', label: 'Email',       value: SITE_CONFIG.owner.email },
  { icon: faLanguage,      color: '#06B6D4', label: 'Languages',   value: 'Bengali, English, Hindi, Urdu' },
]

const JOURNEY = [
  { icon: faSeedling, color: '#10B981', title: 'Early Spark',
    text: 'Fascinated by technology since childhood. Started with electrical engineering dreams, then discovered web dev through YouTube tutorials.' },
  { icon: faCode,     color: '#3B82F6', title: 'Learning in Progress',
    text: 'Self-taught through projects and tutorials. Built everything from restaurant sites to full PWAs — even during SSC exam prep.' },
  { icon: faRocket,   color: '#F59E0B', title: "What's Next",
    text: 'SSC done, HSC next, then CSE. Every shipped project is a step toward becoming a professional full-stack developer.' },
]

const EXP_STATS = (settings) => [
  { val: settings?.statsYearsDev   ?? '3+', lbl: 'Years Dev',      icon: faCode,    c: '#3B82F6' },
  { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design',  icon: faPalette, c: '#8B5CF6' },
  { val: '5+',                               lbl: 'Years Video',    icon: faVideo,   c: '#EC4899' },
  { val: settings?.statsProjects   ?? '16+', lbl: 'Projects',      icon: faRocket,  c: '#10B981' },
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
        <motion.div className="abs2-header"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
          <motion.p variants={fadeUp} className="abs2-label">My Story</motion.p>
          <motion.h2 variants={fadeUp} className="abs2-h2">
            From circuits to <span className="abs2-accent">clean code</span>
          </motion.h2>
        </motion.div>

        <div className="abs2-grid">
          {/* ── LEFT: personal info + quote ── */}
          <motion.div className="abs2-col"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .08 }} transition={{ duration: .55, ease: [.16,1,.3,1] }}>

            {/* Personal info card */}
            <div className="abs2-info-card card">
              <p className="abs2-card-title">
                <FontAwesomeIcon icon={faUser} style={{ color: 'var(--accent-primary)' }} />
                Personal Details
              </p>
              <div className="abs2-info-list">
                {INFO_ROWS(age).map(({ icon, color, label, value }) => (
                  <div key={label} className="abs2-info-row">
                    <span className="abs2-info-icon" style={{ background: `${color}18`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="abs2-info-key">{label}</span>
                    <span className="abs2-info-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CV card */}
            {cvEnabled && (
              <div className="abs2-cv-card card">
                <div className="abs2-cv-top">
                  <div className="abs2-cv-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    <p className="abs2-cv-title">Muhtasim Rahman — CV</p>
                    <p className="abs2-cv-sub">Curriculum Vitae · Latest Version</p>
                  </div>
                </div>
                <div className="abs2-cv-actions">
                  {/* Preview: new tab link */}
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                    className="abs2-cv-btn abs2-cv-outline" data-click-fx>
                    <FontAwesomeIcon icon={faEye} /> Preview
                  </a>
                  {/* Download: direct download */}
                  <a href={cvUrl} download className="abs2-cv-btn abs2-cv-primary" data-click-fx>
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  {/* Print: opens preview then triggers print */}
                  <button className="abs2-cv-btn abs2-cv-outline" onClick={handlePrint} data-click-fx>
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  {/* Share: device native share sheet */}
                  <button className="abs2-cv-btn abs2-cv-outline" onClick={handleShare} data-click-fx>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            )}

            
            {/* Quote */}
            <blockquote className="abs2-quote card">
              <FontAwesomeIcon icon={faQuoteLeft} className="abs2-quote-icon" aria-hidden="true" />
              <p className="abs2-quote-text">
                "I possess a strong passion for programming and web development.
                I aim to develop impactful websites that combine functionality with
                captivating design — while adhering to ethical and Halal principles."
              </p>
              <footer className="abs2-quote-attr">— Muhtasim Rahman</footer>
            </blockquote>
          </motion.div>

          {/* ── RIGHT: CV + journey + stats ── */}
          <motion.div className="abs2-col"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .08 }} transition={{ duration: .55, ease: [.16,1,.3,1] }}>



            {/* Journey milestones */}
            {JOURNEY.map(({ icon, color, title, text }) => (
              <div key={title} className="abs2-journey card">
                <div className="abs2-journey-icon" style={{ background: `${color}18`, color }}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="abs2-journey-body">
                  <p className="abs2-journey-title">{title}</p>
                  <p className="abs2-journey-text">{text}</p>
                </div>
              </div>
            ))}

            {/* Exp stats */}
            <div className="abs2-stats">
              {EXP_STATS(settings).map(({ val, lbl, icon, c }) => (
                <div key={lbl} className="abs2-stat card">
                  <div className="abs2-stat-icon" style={{ background: `${c}18`, color: c }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <p className="abs2-stat-val" style={{ color: c }}>{val}</p>
                  <p className="abs2-stat-lbl">{lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* Header */
        .abs2-header { margin-bottom: 2.5rem; }
        .abs2-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .4rem;
        }
        .abs2-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary);
        }
        .abs2-accent { color: var(--accent-primary); }

        /* 2-col grid */
        .abs2-grid {
          display: grid; grid-template-columns: 1fr; gap: 1.5rem;
        }
        @media (min-width: 900px) {
          .abs2-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }
        }

        /* Columns */
        .abs2-col { display: flex; flex-direction: column; gap: 1rem; }

        /* Info card */
        .abs2-info-card { padding: 1.25rem 1.4rem; }
        .abs2-card-title {
          display: flex; align-items: center; gap: .5rem;
          font-size: .82rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .85rem; padding-bottom: .6rem;
          border-bottom: 1px solid var(--border-color);
        }
        .abs2-info-list { display: flex; flex-direction: column; }
        .abs2-info-row {
          display: flex; align-items: center; gap: .7rem;
          padding: .4rem 0; border-bottom: 1px solid var(--border-color);
        }
        .abs2-info-row:last-child { border-bottom: none; }
        .abs2-info-icon {
          width: 24px; height: 24px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .6rem; flex-shrink: 0;
        }
        .abs2-info-key {
          font-size: .72rem; font-weight: 600; color: var(--text-secondary);
          min-width: 85px; flex-shrink: 0; font-family: var(--font-mono);
        }
        .abs2-info-val {
          font-size: .76rem; color: var(--text-primary); font-weight: 500;
          word-break: break-word; flex: 1;
        }

        /* Quote */
        .abs2-quote {
          padding: 1.2rem 1.4rem;
          border-left: 3px solid var(--accent-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
        }
        .abs2-quote-icon {
          color: var(--accent-primary); opacity: .25; font-size: 1rem;
          margin-bottom: .4rem; display: block;
        }
        .abs2-quote-text {
          font-size: .875rem; line-height: 1.75;
          color: var(--text-secondary); font-style: italic; margin-bottom: .5rem;
        }
        .abs2-quote-attr {
          font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* CV card */
        .abs2-cv-card { padding: 1.25rem 1.4rem; }
        .abs2-cv-top {
          display: flex; align-items: center; gap: .8rem; margin-bottom: 1rem;
        }
        .abs2-cv-icon {
          width: 40px; height: 40px; border-radius: var(--radius-lg);
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; flex-shrink: 0;
        }
        .abs2-cv-title { font-size: .875rem; font-weight: 700; color: var(--text-primary); }
        .abs2-cv-sub   { font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono); margin-top: .12rem; }
        .abs2-cv-actions { display: flex; flex-wrap: wrap; gap: .5rem; }
        .abs2-cv-btn {
          display: inline-flex; align-items: center; gap: .38rem;
          padding: .42rem .9rem; border-radius: var(--radius-md);
          font-size: .76rem; font-weight: 600; cursor: pointer;
          text-decoration: none; transition: all .18s ease;
          border: none; font-family: var(--font-body);
        }
        .abs2-cv-primary {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.28);
        }
        .abs2-cv-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .abs2-cv-outline {
          background: var(--bg-surface); color: var(--text-primary);
          border: 1px solid var(--border-strong);
        }
        .abs2-cv-outline:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Journey */
        .abs2-journey { display: flex; align-items: flex-start; gap: .8rem; padding: .95rem 1.1rem; }
        .abs2-journey-icon {
          width: 32px; height: 32px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .78rem; flex-shrink: 0; margin-top: .1rem;
        }
        .abs2-journey-title { font-size: .84rem; font-weight: 600; color: var(--text-primary); margin-bottom: .25rem; }
        .abs2-journey-text  { font-size: .78rem; color: var(--text-secondary); line-height: 1.62; }

        /* Stats grid */
        .abs2-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: .65rem; }
        .abs2-stat { padding: 1rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: .45rem; }
        .abs2-stat-icon {
          width: 32px; height: 32px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center; font-size: .75rem;
        }
        .abs2-stat-val { font-family: var(--font-display); font-weight: 800; font-size: 1.35rem; line-height: 1; }
        .abs2-stat-lbl { font-size: .66rem; color: var(--text-secondary); font-weight: 500; }
      `}</style>
    </section>
  )
}
