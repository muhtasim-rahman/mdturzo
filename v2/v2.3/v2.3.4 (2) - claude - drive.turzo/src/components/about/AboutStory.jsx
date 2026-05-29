// ============================================================
// AboutStory.jsx — v2.3.4
// FULL REDESIGN — new title "Who I Am", clean minimal layout
// Split into: left = bio + quote | right = info + journey + stats
// CV actions kept (preview/download/print/share)
// ============================================================

import { motion }           from 'framer-motion'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import {
  faQuoteLeft, faSeedling, faCode, faRocket, faUser,
  faLocationDot, faGraduationCap, faEnvelope,
  faMosque, faCalendar, faBullseye, faLanguage,
  faDownload, faEye, faPrint, faShare,
  faPalette, faVideo, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.16,1,.3,1] } } }
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

const INFO_ROWS = (age) => [
  { icon: faUser,          color: '#3B82F6', label: 'Full Name',   value: 'Md Muhtasim Rahman Mahmud' },
  { icon: faUser,          color: '#8B5CF6', label: 'Nickname',    value: 'Turzo' },
  { icon: faCalendar,      color: '#F59E0B', label: 'Age',         value: `${age} years` },
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
    text: 'Started with dreams of electrical engineering — then YouTube introduced me to web development. The rest followed naturally.',
  },
  {
    icon: faCode, color: '#3B82F6', title: 'Self-Taught Builder',
    text: 'Built dozens of projects through tutorials and trial & error — from simple pages to PWAs, even during SSC exam prep.',
  },
  {
    icon: faRocket, color: '#8B5CF6', title: 'What\'s Coming',
    text: 'SSC done. HSC next. Then CSE. Every project today is a stepping stone toward becoming a professional full-stack developer.',
  },
]

const EXP_STATS = (settings) => [
  { val: settings?.statsYearsDev   ?? '3+',  lbl: 'Years Dev',    icon: faCode,    c: '#3B82F6' },
  { val: settings?.statsYearsDesign ?? '6+', lbl: 'Years Design', icon: faPalette, c: '#8B5CF6' },
  { val: '5+',                                lbl: 'Years Video',  icon: faVideo,   c: '#EC4899' },
  { val: settings?.statsProjects   ?? '16+', lbl: 'Projects',     icon: faRocket,  c: '#10B981' },
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

        {/* ── Section header ── */}
        <motion.div className="sto-header"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
          <motion.p variants={fadeUp} className="sto-label">Who I Am</motion.p>
          <motion.h2 variants={fadeUp} className="sto-h2">
            A developer built on <span className="sto-accent">curiosity</span>
          </motion.h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="sto-grid">

          {/* LEFT — bio + quote + CV */}
          <motion.div className="sto-col"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .08 }} transition={{ duration: .55, ease: [.16,1,.3,1] }}>

            {/* Quote block */}
            <blockquote className="sto-quote">
              <FontAwesomeIcon icon={faQuoteLeft} className="sto-q-icon" aria-hidden="true" />
              <p className="sto-q-text">
                "I possess a strong passion for programming and web development.
                I aim to develop impactful websites that combine functionality with
                captivating design — while adhering to ethical and Halal principles."
              </p>
              <footer className="sto-q-attr">— Muhtasim Rahman</footer>
            </blockquote>

            {/* Personal info card */}
            <div className="sto-info-card">
              <div className="sto-info-head">
                <FontAwesomeIcon icon={faUser} className="sto-info-head-icon" />
                <span>Personal Details</span>
              </div>
              <div className="sto-info-rows">
                {INFO_ROWS(age).map(({ icon, color, label, value }) => (
                  <div key={label} className="sto-info-row">
                    <span className="sto-info-icon" style={{ background: `${color}16`, color }}>
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="sto-info-key">{label}</span>
                    <span className="sto-info-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CV card */}
            {cvEnabled && (
              <div className="sto-cv-card">
                <div className="sto-cv-head">
                  <div className="sto-cv-icon"><FontAwesomeIcon icon={faUser} /></div>
                  <div>
                    <p className="sto-cv-title">Curriculum Vitae</p>
                    <p className="sto-cv-sub">Muhtasim Rahman · Latest Version</p>
                  </div>
                </div>
                <div className="sto-cv-actions">
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                    className="sto-cv-btn sto-cv-outline" data-click-fx>
                    <FontAwesomeIcon icon={faEye} /> Preview
                  </a>
                  <a href={cvUrl} download className="sto-cv-btn sto-cv-primary" data-click-fx>
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <button className="sto-cv-btn sto-cv-outline" onClick={handlePrint} data-click-fx>
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  <button className="sto-cv-btn sto-cv-outline" onClick={handleShare} data-click-fx>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT — journey + stats */}
          <motion.div className="sto-col"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .08 }} transition={{ duration: .55, ease: [.16,1,.3,1] }}>

            {/* Journey milestones */}
            <div className="sto-journey-wrap">
              <p className="sto-journey-heading">My Journey</p>
              <div className="sto-journey-list">
                {JOURNEY.map(({ icon, color, title, text }, i) => (
                  <div key={title} className="sto-journey-item">
                    <div className="sto-journey-left">
                      <div className="sto-journey-icon" style={{ background: `${color}18`, color }}>
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      {i < JOURNEY.length - 1 && <div className="sto-journey-line" />}
                    </div>
                    <div className="sto-journey-body">
                      <p className="sto-journey-title">{title}</p>
                      <p className="sto-journey-text">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exp stats grid */}
            <div className="sto-stats">
              {EXP_STATS(settings).map(({ val, lbl, icon, c }) => (
                <div key={lbl} className="sto-stat">
                  <div className="sto-stat-icon" style={{ background: `${c}18`, color: c }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <p className="sto-stat-val" style={{ color: c }}>{val}</p>
                  <p className="sto-stat-lbl">{lbl}</p>
                </div>
              ))}
            </div>

            {/* Quick contact link */}
            <a href={`mailto:${SITE_CONFIG.owner.email}`} className="sto-contact-strip">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Reach out — {SITE_CONFIG.owner.email}</span>
              <FontAwesomeIcon icon={faArrowRight} className="sto-strip-arrow" />
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* Header */
        .sto-header { margin-bottom: 2.5rem; }
        .sto-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .4rem; display: block;
        }
        .sto-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.2; color: var(--text-primary);
        }
        .sto-accent { color: var(--accent-primary); }

        /* Grid */
        .sto-grid { display: grid; gap: 1.5rem; }
        @media (min-width: 900px) {
          .sto-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }
        }
        .sto-col { display: flex; flex-direction: column; gap: 1rem; }

        /* Quote */
        .sto-quote {
          padding: 1.2rem 1.4rem;
          border-left: 3px solid var(--accent-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          background: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .sto-q-icon {
          color: var(--accent-primary); opacity: .25; font-size: 1.1rem;
          margin-bottom: .5rem; display: block;
        }
        .sto-q-text {
          font-size: .875rem; line-height: 1.78;
          color: var(--text-secondary); font-style: italic; margin-bottom: .5rem;
        }
        .sto-q-attr {
          font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* Info card */
        .sto-info-card {
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-xl); overflow: hidden;
        }
        .sto-info-head {
          display: flex; align-items: center; gap: .5rem;
          padding: .8rem 1.1rem;
          font-size: .8rem; font-weight: 700; color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-surface-2);
        }
        .sto-info-head-icon { color: var(--accent-primary); font-size: .78rem; }
        .sto-info-rows {}
        .sto-info-row {
          display: flex; align-items: center; gap: .65rem;
          padding: .38rem 1.1rem;
          border-bottom: 1px solid var(--border-color);
          transition: background .15s;
        }
        .sto-info-row:last-child { border-bottom: none; }
        .sto-info-row:hover { background: var(--bg-surface-2); }
        .sto-info-icon {
          width: 22px; height: 22px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .58rem; flex-shrink: 0;
        }
        .sto-info-key {
          font-size: .7rem; font-weight: 600; color: var(--text-tertiary);
          min-width: 80px; flex-shrink: 0; font-family: var(--font-mono);
        }
        .sto-info-val {
          font-size: .74rem; color: var(--text-primary); font-weight: 500;
          word-break: break-word; flex: 1;
        }

        /* CV card */
        .sto-cv-card {
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-xl); padding: 1.1rem 1.25rem;
        }
        .sto-cv-head {
          display: flex; align-items: center; gap: .75rem; margin-bottom: .9rem;
        }
        .sto-cv-icon {
          width: 38px; height: 38px; border-radius: var(--radius-lg);
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem; flex-shrink: 0;
        }
        .sto-cv-title { font-size: .875rem; font-weight: 700; color: var(--text-primary); }
        .sto-cv-sub { font-size: .68rem; color: var(--text-tertiary); font-family: var(--font-mono); margin-top: .1rem; }
        .sto-cv-actions { display: flex; flex-wrap: wrap; gap: .45rem; }
        .sto-cv-btn {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .4rem .85rem; border-radius: var(--radius-md);
          font-size: .74rem; font-weight: 600; cursor: pointer;
          text-decoration: none; transition: all .18s ease;
          border: none; font-family: var(--font-body);
        }
        .sto-cv-primary {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.28);
        }
        .sto-cv-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .sto-cv-outline {
          background: var(--bg-surface-2); color: var(--text-primary);
          border: 1px solid var(--border-strong);
        }
        .sto-cv-outline:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Journey */
        .sto-journey-heading {
          font-family: var(--font-mono); font-size: .68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary); margin-bottom: 1rem;
        }
        .sto-journey-list { display: flex; flex-direction: column; }
        .sto-journey-item { display: flex; gap: .9rem; }
        .sto-journey-left {
          display: flex; flex-direction: column; align-items: center; flex-shrink: 0;
        }
        .sto-journey-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .78rem; flex-shrink: 0;
        }
        .sto-journey-line {
          flex: 1; width: 1px; background: var(--border-color);
          margin: .35rem 0; min-height: .75rem;
        }
        .sto-journey-body { padding-bottom: 1.1rem; }
        .sto-journey-title { font-size: .85rem; font-weight: 600; color: var(--text-primary); margin-bottom: .25rem; }
        .sto-journey-text  { font-size: .78rem; color: var(--text-secondary); line-height: 1.65; }

        /* Stats grid */
        .sto-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: .6rem;
        }
        @media (max-width: 480px) { .sto-stats { grid-template-columns: repeat(2, 1fr); } }
        .sto-stat {
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-lg); padding: .85rem .6rem;
          text-align: center; display: flex; flex-direction: column; align-items: center; gap: .4rem;
          transition: border-color .18s;
        }
        .sto-stat:hover { border-color: var(--border-strong); }
        .sto-stat-icon {
          width: 30px; height: 30px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center; font-size: .72rem;
        }
        .sto-stat-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.25rem; line-height: 1;
        }
        .sto-stat-lbl { font-size: .62rem; color: var(--text-secondary); font-weight: 500; }

        /* Contact strip */
        .sto-contact-strip {
          display: flex; align-items: center; gap: .65rem;
          padding: .75rem 1.1rem; border-radius: var(--radius-lg);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          text-decoration: none; color: var(--text-secondary);
          font-size: .8rem; font-weight: 500;
          transition: all .18s ease;
        }
        .sto-contact-strip:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--accent-light);
        }
        .sto-strip-arrow { margin-left: auto; font-size: .7rem; transition: transform .18s; }
        .sto-contact-strip:hover .sto-strip-arrow { transform: translateX(3px); }
      `}</style>
    </section>
  )
}
