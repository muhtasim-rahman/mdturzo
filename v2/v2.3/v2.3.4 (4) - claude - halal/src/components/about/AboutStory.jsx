// ============================================================
// AboutStory.jsx — v2.3.4
// COMPLETE REDESIGN — new title, new layout, fresh UI
// Title: "Behind the Screen"
// Layout: full-width intro → stats strip → 2-col grid → quote+CV
// ============================================================

import { motion }            from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import {
  faSeedling, faCode, faRocket, faLocationDot,
  faGraduationCap, faEnvelope, faUser, faMosque,
  faCalendar, faDownload, faEye, faPrint, faShare,
  faPalette, faVideo, faLanguage, faBullseye, faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings }   from '../../hooks/useSiteSettings.js'

const fdU = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.16,1,.3,1] } } }
const stg = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

const PERSONAL = (age) => [
  { icon: faUser,          c: '#3B82F6', key: 'Full Name',   val: 'Md Muhtasim Rahman Mahmud' },
  { icon: faUser,          c: '#8B5CF6', key: 'Nickname',    val: 'Turzo' },
  { icon: faCalendar,      c: '#F59E0B', key: 'Age',         val: `${age} years` },
  { icon: faLocationDot,   c: '#10B981', key: 'From',        val: 'Nilphamari, Bangladesh' },
  { icon: faMosque,        c: '#10B981', key: 'Religion',    val: 'Islam (Muslim)' },
  { icon: faGraduationCap, c: '#3B82F6', key: 'Education',   val: 'SSC-26 · SGSC, Saidpur' },
  { icon: faBullseye,      c: '#F59E0B', key: 'Goal',        val: 'CSE Engineer & Full-Stack Dev' },
  { icon: faEnvelope,      c: '#EF4444', key: 'Email',       val: SITE_CONFIG.owner.email },
  { icon: faLanguage,      c: '#06B6D4', key: 'Languages',   val: 'Bengali · English · Hindi · Urdu' },
]

const STATS = (s) => [
  { v: s?.statsYearsDev    ?? '3+', l: 'Years Dev',    c: '#3B82F6', icon: faCode    },
  { v: s?.statsYearsDesign ?? '6+', l: 'Years Design', c: '#8B5CF6', icon: faPalette },
  { v: '5+',                         l: 'Years Video',  c: '#EC4899', icon: faVideo   },
  { v: s?.statsProjects    ?? '16+', l: 'Projects',    c: '#10B981', icon: faRocket  },
]

const JOURNEY = [
  {
    icon: faSeedling, c: '#10B981', title: 'The Early Spark',
    body: 'Grew up fascinated by how gadgets worked. Started with dreams of electrical engineering — then YouTube showed me the world of web development.',
  },
  {
    icon: faCode,     c: '#3B82F6', title: 'Learning Through Building',
    body: 'Self-taught through projects, not courses. From simple HTML pages to full Firebase-backed apps — built everything while studying for SSC.',
  },
  {
    icon: faRocket,   c: '#F59E0B', title: "What Comes Next",
    body: 'SSC done, HSC next. Every project is a stepping stone toward a CSE degree and a career as a professional full-stack developer.',
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
    <section className="section" id="about-story">
      <div className="container-xl">

        {/* ── Header ── */}
        <motion.div className="ajs-hd"
          initial="hidden" whileInView="show" viewport={{ once:true, amount:.1 }} variants={stg(.1)}>
          <motion.p variants={fdU} className="ajs-lbl">The Story</motion.p>
          <motion.h2 variants={fdU} className="ajs-h2">
            Behind the <span className="ajs-accent">Screen</span>
          </motion.h2>
          <motion.p variants={fdU} className="ajs-sub">
            The person, the journey, the purpose — everything that drives the work.
          </motion.p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div className="ajs-stats"
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.5 }}>
          {STATS(settings).map(({ v, l, c, icon }) => (
            <div key={l} className="ajs-stat">
              <div className="ajs-stat-icon" style={{ background:`${c}18`, color:c }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <span className="ajs-stat-val" style={{ color:c }}>{v}</span>
              <span className="ajs-stat-lbl">{l}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Main 2-col grid ── */}
        <div className="ajs-grid">

          {/* Left: personal info */}
          <motion.div className="ajs-col"
            initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:.06 }} transition={{ duration:.5, ease:[.16,1,.3,1] }}>

            <div className="ajs-info card">
              <p className="ajs-card-ttl">
                <FontAwesomeIcon icon={faUser} style={{ color:'var(--accent-primary)' }} />
                Personal Details
              </p>
              <div className="ajs-info-rows">
                {PERSONAL(age).map(({ icon, c, key, val }) => (
                  <div key={key} className="ajs-row">
                    <span className="ajs-row-ic" style={{ background:`${c}16`, color:c }}>
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="ajs-row-k">{key}</span>
                    <span className="ajs-row-v">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CV card */}
            {cvEnabled && (
              <div className="ajs-cv card">
                <div className="ajs-cv-top">
                  <div className="ajs-cv-badge">CV</div>
                  <div>
                    <p className="ajs-cv-title">Curriculum Vitae</p>
                    <p className="ajs-cv-sub">Muhtasim Rahman · Latest</p>
                  </div>
                </div>
                <div className="ajs-cv-btns">
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                    className="ajs-cv-btn ajs-cv-outline">
                    <FontAwesomeIcon icon={faEye} /> Preview
                  </a>
                  <a href={cvUrl} download className="ajs-cv-btn ajs-cv-fill">
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <button className="ajs-cv-btn ajs-cv-outline" onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  <button className="ajs-cv-btn ajs-cv-outline" onClick={handleShare}>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: journey + quote */}
          <motion.div className="ajs-col"
            initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:.06 }} transition={{ duration:.5, ease:[.16,1,.3,1] }}>

            {JOURNEY.map(({ icon, c, title, body }, i) => (
              <motion.div key={title} className="ajs-milestone card"
                initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:.45, delay: i*.08 }}>
                <div className="ajs-ms-icon" style={{ background:`${c}18`, color:c }}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="ajs-ms-body">
                  <p className="ajs-ms-title">{title}</p>
                  <p className="ajs-ms-text">{body}</p>
                </div>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.blockquote className="ajs-quote card"
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.45, delay:.28 }}>
              <FontAwesomeIcon icon={faQuoteLeft} className="ajs-q-icon" aria-hidden="true" />
              <p className="ajs-q-text">
                "I aim to develop impactful websites that combine functionality with
                captivating design — while adhering to ethical and Halal principles."
              </p>
              <footer className="ajs-q-attr">— Muhtasim Rahman</footer>
            </motion.blockquote>
          </motion.div>

        </div>
      </div>

      <style>{`
        .ajs-hd { text-align: center; margin-bottom: 2.5rem; }
        .ajs-lbl {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .45rem;
        }
        .ajs-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.7rem, 3.2vw, 2.4rem);
          line-height: 1.18; color: var(--text-primary); margin-bottom: .45rem;
        }
        .ajs-accent { color: var(--accent-primary); }
        .ajs-sub {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 480px; margin: 0 auto; line-height: 1.7;
        }

        /* Stats strip */
        .ajs-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .75rem; margin-bottom: 2.5rem;
          padding: 1.1rem 1.4rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
        }
        @media (max-width: 640px) {
          .ajs-stats { grid-template-columns: repeat(2, 1fr); }
        }
        .ajs-stat {
          display: flex; flex-direction: column; align-items: center; gap: .4rem;
          padding: .5rem .4rem;
          border-right: 1px solid var(--border-color);
        }
        .ajs-stat:last-child { border-right: none; }
        @media (max-width: 640px) {
          .ajs-stat:nth-child(2) { border-right: none; }
          .ajs-stat:nth-child(3) { border-right: 1px solid var(--border-color); }
        }
        .ajs-stat-icon {
          width: 30px; height: 30px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center; font-size: .72rem;
        }
        .ajs-stat-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.3rem; line-height: 1;
        }
        .ajs-stat-lbl {
          font-size: .62rem; color: var(--text-tertiary);
          font-family: var(--font-mono); text-transform: uppercase;
          letter-spacing: .05em; text-align: center;
        }

        /* Main 2-col grid */
        .ajs-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 1.4rem;
        }
        @media (min-width: 900px) {
          .ajs-grid { grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
        }
        .ajs-col { display: flex; flex-direction: column; gap: .9rem; }

        /* Info card */
        .ajs-info { padding: 1.2rem 1.3rem; }
        .ajs-card-ttl {
          display: flex; align-items: center; gap: .5rem;
          font-size: .82rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .75rem; padding-bottom: .55rem;
          border-bottom: 1px solid var(--border-color);
        }
        .ajs-info-rows { display: flex; flex-direction: column; }
        .ajs-row {
          display: flex; align-items: center; gap: .6rem;
          padding: .36rem 0; border-bottom: 1px solid var(--border-color);
        }
        .ajs-row:last-child { border-bottom: none; }
        .ajs-row-ic {
          width: 22px; height: 22px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: .56rem; flex-shrink: 0;
        }
        .ajs-row-k {
          font-size: .7rem; font-weight: 600; color: var(--text-secondary);
          min-width: 82px; flex-shrink: 0; font-family: var(--font-mono);
        }
        .ajs-row-v {
          font-size: .75rem; color: var(--text-primary); font-weight: 500;
          word-break: break-word; flex: 1;
        }

        /* CV card */
        .ajs-cv { padding: 1.1rem 1.3rem; }
        .ajs-cv-top { display: flex; align-items: center; gap: .75rem; margin-bottom: .85rem; }
        .ajs-cv-badge {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: .75rem; font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .ajs-cv-title { font-size: .84rem; font-weight: 700; color: var(--text-primary); }
        .ajs-cv-sub   { font-size: .68rem; color: var(--text-tertiary); font-family: var(--font-mono); margin-top: .1rem; }
        .ajs-cv-btns  { display: flex; flex-wrap: wrap; gap: .4rem; }
        .ajs-cv-btn {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .38rem .85rem; border-radius: var(--radius-md);
          font-size: .74rem; font-weight: 600; cursor: pointer;
          text-decoration: none; transition: all .16s;
          border: none; font-family: var(--font-body);
        }
        .ajs-cv-fill {
          background: var(--accent-primary); color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,.25);
        }
        .ajs-cv-fill:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .ajs-cv-outline {
          background: var(--bg-surface); color: var(--text-primary);
          border: 1px solid var(--border-strong);
        }
        .ajs-cv-outline:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }

        /* Milestone cards */
        .ajs-milestone {
          display: flex; align-items: flex-start; gap: .75rem;
          padding: .9rem 1.1rem;
        }
        .ajs-ms-icon {
          width: 32px; height: 32px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .76rem; flex-shrink: 0; margin-top: .08rem;
        }
        .ajs-ms-title { font-size: .84rem; font-weight: 700; color: var(--text-primary); margin-bottom: .22rem; }
        .ajs-ms-text  { font-size: .78rem; color: var(--text-secondary); line-height: 1.62; }

        /* Quote */
        .ajs-quote {
          padding: 1.1rem 1.3rem;
          border-left: 3px solid var(--accent-primary);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          background: linear-gradient(135deg, rgba(59,130,246,.05), transparent);
        }
        .ajs-q-icon {
          color: var(--accent-primary); opacity: .22; font-size: .95rem;
          margin-bottom: .35rem; display: block;
        }
        .ajs-q-text {
          font-size: .875rem; line-height: 1.75;
          color: var(--text-secondary); font-style: italic; margin-bottom: .45rem;
        }
        .ajs-q-attr {
          font-size: .68rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
      `}</style>
    </section>
  )
}
