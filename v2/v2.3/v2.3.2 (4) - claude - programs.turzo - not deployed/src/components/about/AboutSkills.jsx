// ============================================================
// AboutSkills.jsx — v2.3.2
// "What I Know" — 4-tab skill section.
// All tabs use the same 2-col panel layout (bars left, note right).
// Progress bar animation matches home Skills section style.
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, useInView }            from 'framer-motion'
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faVideo, faGears, faBrain } from '@fortawesome/free-solid-svg-icons'
import {
  DEV_SKILLS, DESIGN_SKILLS, VIDEO_SKILLS, TOOLS, fadeUp, stagger,
} from './aboutData.js'

function SectionLabel({ text }) {
  return <p className="absk-label">{text}</p>
}

// ── Animated skill bar (same as home Skills) ──────────────────
function SkillBar({ name, pct, color, note, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 100)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div className="absk-row">
      <div className="absk-meta">
        <span className="absk-name">{name}</span>
        <div className="absk-right">
          {note && <span className="absk-note">{note}</span>}
          <span className="absk-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="absk-track">
        <motion.div
          className="absk-fill"
          style={{ background: color, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: index * .05 }}
        />
      </div>
    </div>
  )
}

// ── Note box shared ───────────────────────────────────────────
function NoteBox({ icon, iconColor, title, text }) {
  return (
    <div className="absk-note-box card">
      <FontAwesomeIcon icon={icon} style={{ color: iconColor, fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
      <p className="absk-nb-title">{title}</p>
      <p className="absk-nb-text">{text}</p>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
export default function AboutSkills() {
  const [tab, setTab] = useState('dev')
  const sectionRef   = useRef(null)
  const inView       = useInView(sectionRef, { once: true, margin: '-80px' })

  const TABS = [
    { id: 'dev',    label: 'Programming', icon: faCode    },
    { id: 'design', label: 'Design',      icon: faPalette },
    { id: 'video',  label: 'Video',       icon: faVideo   },
    { id: 'tools',  label: 'Tools',       icon: faGears   },
  ]

  return (
    <section className="section section-alt" id="about-skills" ref={sectionRef}>
      <div className="container-xl">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>
          <motion.div variants={fadeUp} className="absk-head">
            <SectionLabel text="Skills & Expertise" />
            <h2 className="absk-h2">
              What I <span className="absk-accent">know</span>
            </h2>
            <p className="absk-sub">
              Self-rated based on real project experience — honest about strengths and areas of growth.
            </p>
          </motion.div>
        </motion.div>

        {/* Tab selector */}
        <div className="absk-tabs">
          {TABS.map(({ id, label, icon }) => (
            <button key={id}
              className={`absk-tab${tab === id ? ' absk-tab-active' : ''}`}
              onClick={() => setTab(id)}>
              <FontAwesomeIcon icon={icon} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content — all use absk-panel 2-col layout */}
        <div className="absk-body">

          {tab === 'dev' && (
            <motion.div key="dev"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }} className="absk-panel">
              <div className="absk-bars">
                {DEV_SKILLS.map((sk, i) => (
                  <SkillBar key={sk.name} {...sk} index={i} inView={inView} />
                ))}
              </div>
              <NoteBox
                icon={faBrain} iconColor="var(--accent-primary)"
                title="Still Learning"
                text="As a student, I'm at an early stage. SSC exams slowed deep learning for ~2 years, but I never stopped building. Now the real journey begins."
              />
            </motion.div>
          )}

          {tab === 'design' && (
            <motion.div key="design"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }} className="absk-panel">
              <div className="absk-bars">
                {DESIGN_SKILLS.map((sk, i) => (
                  <SkillBar key={sk.name} name={sk.name} pct={sk.pct} color={sk.color}
                    index={i} inView={inView} />
                ))}
              </div>
              <NoteBox
                icon={faPalette} iconColor="#EC4899"
                title="6+ Years Experience"
                text="Logo, banner, thumbnail — designing since age 12. Clean aesthetics, strong eye for detail, and consistent delivery."
              />
            </motion.div>
          )}

          {tab === 'video' && (
            <motion.div key="video"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }} className="absk-panel">
              <div className="absk-bars">
                {VIDEO_SKILLS.map((sk, i) => (
                  <SkillBar key={sk.name} name={sk.name} pct={sk.pct} color={sk.color}
                    index={i} inView={inView} />
                ))}
              </div>
              <NoteBox
                icon={faVideo} iconColor="#A855F7"
                title="5+ Years Experience"
                text="YouTube, Facebook, Reels, Shorts — video editing as a creative outlet alongside development. Growing confidence in commercial work."
              />
            </motion.div>
          )}

          {tab === 'tools' && (
            <motion.div key="tools"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }} className="absk-panel">
              <div className="absk-bars">
                {TOOLS.map((sk, i) => (
                  <SkillBar key={sk.name} name={sk.name} pct={sk.pct} color={sk.color}
                    index={i} inView={inView} />
                ))}
              </div>
              <NoteBox
                icon={faGears} iconColor="#06B6D4"
                title="Daily Toolkit"
                text="Tools I reach for every day. VS Code and GitHub are core; Firebase and APIs power the projects. Always exploring new tools."
              />
            </motion.div>
          )}

        </div>
      </div>

      <style>{`
        .absk-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .absk-head { text-align: center; margin-bottom: 2rem; }
        .absk-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .absk-accent { color: var(--accent-primary); }
        .absk-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Tabs */
        .absk-tabs {
          display: flex; flex-wrap: wrap; gap: .4rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          padding: .35rem; border-radius: var(--radius-xl);
          width: fit-content; margin-bottom: 2rem;
        }
        .absk-tab {
          display: flex; align-items: center; gap: .45rem;
          padding: .5rem 1.1rem; border-radius: var(--radius-lg);
          font-size: .8rem; font-weight: 500; color: var(--text-secondary);
          cursor: pointer; background: transparent; border: none;
          transition: all var(--transition-fast);
        }
        .absk-tab:hover { color: var(--text-primary); }
        .absk-tab-active {
          background: var(--bg-surface-2); color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }
        .absk-body { min-height: 280px; }

        /* Panel — 2-col layout for ALL tabs */
        .absk-panel {
          display: grid; grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .absk-panel { grid-template-columns: 1fr 260px; }
        }

        /* Bars */
        .absk-bars { display: flex; flex-direction: column; gap: 1rem; }
        .absk-row {}
        .absk-meta {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: .4rem;
        }
        .absk-name { font-size: .875rem; font-weight: 500; color: var(--text-primary); }
        .absk-right { display: flex; align-items: center; gap: .65rem; }
        .absk-note { font-size: .7rem; color: var(--text-tertiary); }
        .absk-pct { font-size: .8rem; font-weight: 600; font-family: var(--font-mono); }
        .absk-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .absk-fill { height: 100%; border-radius: var(--radius-full); }

        /* Note box */
        .absk-note-box {
          padding: 1.25rem; display: flex; flex-direction: column;
          align-items: flex-start; align-self: start;
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          border-color: rgba(59,130,246,.2);
        }
        .absk-nb-title {
          font-size: .875rem; font-weight: 600; color: var(--text-primary); margin-bottom: .4rem;
        }
        .absk-nb-text { font-size: .78rem; color: var(--text-secondary); line-height: 1.65; }

        @media (max-width: 480px) {
          .absk-tabs { width: 100%; }
          .absk-tab  { flex: 1; justify-content: center; padding: .45rem .6rem; }
          .absk-tab span { display: none; }
        }
      `}</style>
    </section>
  )
}
