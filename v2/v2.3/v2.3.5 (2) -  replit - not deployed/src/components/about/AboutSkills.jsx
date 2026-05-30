// ============================================================
// AboutSkills.jsx — v2.3.5
// CHANGES:
//   * absk-note-card: hover effect suppressed (no lift/shadow), click effect only
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faVideo, faGears,
  faBrain, faCamera, faBook, faHandshake,
  faGlobe, faTerminal, faLaptopCode,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const DEV_SKILLS = [
  { name: 'AI Tools & Workflows', pct: 90, color: '#10B981', note: 'Daily use — coding, design, planning' },
  { name: 'HTML',                 pct: 80, color: '#F97316', note: 'Semantic markup, layouts'             },
  { name: 'CSS',                  pct: 80, color: '#3B82F6', note: 'Animations, responsive'               },
  { name: 'Git & GitHub',         pct: 78, color: '#64748B', note: 'Version control'                      },
  { name: 'Python',               pct: 60, color: '#EAB308', note: 'Scripting, learning'                  },
  { name: 'JavaScript',           pct: 45, color: '#F59E0B', note: 'Improving daily'                      },
  { name: 'Java',                 pct: 35, color: '#EC4899', note: 'Basic knowledge'                      },
]

const DESIGN_SKILLS = [
  { name: 'Logo Design',          icon: faPalette,   color: '#EC4899', pct: 82 },
  { name: 'Banner Design',        icon: faPalette,   color: '#8B5CF6', pct: 78 },
  { name: 'Thumbnail Design',     icon: faCamera,    color: '#3B82F6', pct: 80 },
  { name: 'Business Card Design', icon: faHandshake, color: '#10B981', pct: 72 },
  { name: 'Poster Design',        icon: faGlobe,     color: '#F59E0B', pct: 70 },
  { name: 'Album / Book Design',  icon: faBook,      color: '#F97316', pct: 65 },
  { name: 'HTML & CSS Design',    icon: faCode,      color: '#06B6D4', pct: 75 },
]

const VIDEO_SKILLS = [
  { name: 'YouTube Videos',              color: '#EF4444', pct: 78 },
  { name: 'Facebook Videos',             color: '#3B82F6', pct: 72 },
  { name: 'Ads & Commercials',           color: '#F59E0B', pct: 60 },
  { name: 'Short Videos (Reels/Shorts)', color: '#EC4899', pct: 70 },
  { name: 'Basic Animation Videos',      color: '#8B5CF6', pct: 55 },
]

const TOOLS_LIST = [
  { name: 'VS Code',           color: '#007ACC', icon: faTerminal   },
  { name: 'GitHub',            color: '#94A3B8', icon: faGithub     },
  { name: 'Firebase',          color: '#F59E0B', icon: faGears      },
  { name: 'Google Sheets API', color: '#10B981', icon: faGlobe      },
  { name: 'Browser DevTools',  color: '#06B6D4', icon: faCode       },
  { name: 'Tailwind CSS',      color: '#38BDF8', icon: faCode       },
  { name: 'Figma',             color: '#A855F7', icon: faPalette    },
  { name: 'Odoo Builder',      color: '#714B67', icon: faLaptopCode },
]

function SkillBar({ name, pct, color, note, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 150)
    return () => clearTimeout(t)
  }, [inView, index])
  return (
    <div className="absk-bar-row">
      <div className="absk-bar-meta">
        <span className="absk-bar-name">{name}</span>
        <div className="absk-bar-right">
          {note && <span className="absk-bar-note">{note}</span>}
          <span className="absk-bar-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="absk-bar-track">
        <motion.div
          className="absk-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})`, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .85, ease: [.16, 1, .3, 1], delay: index * .06 }}
        />
      </div>
    </div>
  )
}

export default function AboutSkills() {
  const [tab, setTab] = useState('dev')
  const panelRef = useRef(null)
  const panelInView = useInView(panelRef, { once: true, margin: '-60px' })

  const TABS = [
    { id: 'dev',    label: 'Programming', icon: faCode    },
    { id: 'design', label: 'Design',      icon: faPalette },
    { id: 'video',  label: 'Video',       icon: faVideo   },
    { id: 'tools',  label: 'Tools',       icon: faGears   },
  ]

  return (
    <section className="section section-alt" id="about-skills">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="absk-label">Skills &amp; Expertise</p>
          <h2 className="absk-h2">
            What I <span className="absk-accent">Know</span>
          </h2>
          <p className="absk-sub">
            Self-rated based on real project experience — honest about strengths and areas of growth.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="absk-tabs">
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`absk-tab${tab === id ? ' absk-tab-active' : ''}`}
              onClick={() => setTab(id)}>
              <FontAwesomeIcon icon={icon} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div ref={panelRef} className="absk-panel-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="absk-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: .28 }}>

              {/* ── PROGRAMMING ── */}
              {tab === 'dev' && (<>
                <div className="absk-bars-col">
                  {DEV_SKILLS.map((sk, i) => (
                    <SkillBar key={sk.name} {...sk} index={i} inView={panelInView} />
                  ))}
                </div>
                <div className="absk-note-card card">
                  <FontAwesomeIcon icon={faBrain} style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                  <p className="absk-note-title">Still Learning</p>
                  <p className="absk-note-text">
                    Self-taught through YouTube and hands-on projects. SSC exams paused deep study
                    for ~2 years — but building never stopped. Now with exams done, the real
                    journey begins: React, Node.js and beyond.
                  </p>
                  <p className="absk-note-footer">3+ Years Experience</p>
                </div>
              </>)}

              {/* ── DESIGN ── */}
              {tab === 'design' && (<>
                <div className="absk-bars-col">
                  {DESIGN_SKILLS.map((sk, i) => (
                    <SkillBar
                      key={sk.name}
                      name={sk.name}
                      pct={sk.pct}
                      color={sk.color}
                      index={i}
                      inView={panelInView}
                    />
                  ))}
                </div>
                <div className="absk-note-card card">
                  <FontAwesomeIcon icon={faPalette} style={{ color: '#EC4899', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                  <p className="absk-note-title">6+ Years Experience</p>
                  <p className="absk-note-text">
                    Logo, banner, thumbnail — designing since age 12.
                    Some commercial-grade work, all focused on clean and purposeful aesthetics.
                  </p>
                  <p className="absk-note-footer">Graphic Design</p>
                </div>
              </>)}

              {/* ── VIDEO ── */}
              {tab === 'video' && (<>
                <div className="absk-bars-col">
                  {VIDEO_SKILLS.map((sk, i) => (
                    <SkillBar
                      key={sk.name}
                      name={sk.name}
                      pct={sk.pct}
                      color={sk.color}
                      index={i}
                      inView={panelInView}
                    />
                  ))}
                </div>
                <div className="absk-note-card card">
                  <FontAwesomeIcon icon={faVideo} style={{ color: '#A855F7', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                  <p className="absk-note-title">5+ Years Experience</p>
                  <p className="absk-note-text">
                    YouTube, Facebook, Shorts, Reels — video editing has been
                    a creative outlet alongside web development since the early years.
                  </p>
                  <p className="absk-note-footer">Video Editing</p>
                </div>
              </>)}

              {/* ── TOOLS ── */}
              {tab === 'tools' && (<>
                <div className="absk-tools-grid">
                  {TOOLS_LIST.map((t, i) => (
                    <motion.div
                      key={t.name}
                      className="absk-tool-item card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: .3, delay: i * .05 }}>
                      <div className="absk-tool-icon" style={{ background: `${t.color}18`, color: t.color }}>
                        <FontAwesomeIcon icon={t.icon} />
                      </div>
                      <span className="absk-tool-name">{t.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="absk-note-card card">
                  <FontAwesomeIcon icon={faGears} style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
                  <p className="absk-note-title">My Toolkit</p>
                  <p className="absk-note-text">
                    These are the tools I use daily to plan, design, build, and deploy.
                    Always learning new ones as the project demands.
                  </p>
                  <p className="absk-note-footer">Development Tools</p>
                </div>
              </>)}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .absk-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .5rem;
        }
        .absk-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .absk-accent { color: var(--accent-primary); }
        .absk-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; line-height: 1.7; margin-bottom: 2rem;
        }

        /* Tabs */
        .absk-tabs {
          display: flex; flex-wrap: nowrap; gap: .4rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          padding: .35rem; border-radius: var(--radius-xl);
          width: fit-content; max-width: 100%;
          margin-bottom: 2rem;
          overflow-x: auto; overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .absk-tabs::-webkit-scrollbar { display: none; }
        .absk-tab {
          display: flex; align-items: center; gap: .45rem;
          padding: .5rem 1.1rem; border-radius: var(--radius-lg);
          font-size: .8rem; font-weight: 500; color: var(--text-secondary);
          cursor: pointer; background: transparent; border: none;
          transition: all var(--transition-fast);
          white-space: nowrap; flex-shrink: 0;
        }
        .absk-tab:hover { color: var(--text-primary); }
        .absk-tab-active {
          background: var(--bg-surface-2);
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 480px) {
          .absk-tabs { width: 100%; }
          .absk-tab { padding: .45rem .85rem; font-size: .76rem; }
        }

        /* Panel — 2-col layout */
        .absk-panel-wrap { min-height: 260px; }
        .absk-panel {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }
        @media (min-width: 768px) {
          .absk-panel { grid-template-columns: 1fr 270px; align-items: start; }
        }

        /* Bars */
        .absk-bars-col { display: flex; flex-direction: column; gap: .9rem; }
        .absk-bar-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .38rem;
        }
        .absk-bar-name  { font-size: .875rem; font-weight: 500; color: var(--text-primary); }
        .absk-bar-right { display: flex; align-items: center; gap: .65rem; }
        .absk-bar-note  { font-size: .7rem; color: var(--text-tertiary); }
        .absk-bar-pct   { font-size: .8rem; font-weight: 600; font-family: var(--font-mono); }
        .absk-bar-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .absk-bar-fill {
          height: 100%; border-radius: var(--radius-full);
          position: relative; overflow: hidden;
        }
        .absk-bar-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.32) 45%, rgba(255,255,255,.50) 50%, rgba(255,255,255,.32) 55%, transparent 100%);
          transform: translateX(-100%);
          animation: absk-shimmer 2.8s ease-in-out infinite;
          border-radius: inherit;
        }
        @keyframes absk-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        /* Note card — hover suppressed, click effect only */
        .absk-note-card {
          padding: 1.25rem; display: flex; flex-direction: column;
          align-items: flex-start; gap: .35rem;
          background: linear-gradient(135deg, rgba(59,130,246,.04), rgba(99,102,241,.02));
          border-color: rgba(59,130,246,.18);
          align-self: start;
        }
        .absk-note-card:hover {
          transform: none !important;
          box-shadow: none !important;
          border-color: rgba(59,130,246,.18) !important;
        }
        .absk-note-title  { font-size: .875rem; font-weight: 600; color: var(--text-primary); }
        .absk-note-text   { font-size: .78rem; color: var(--text-secondary); line-height: 1.65; }
        .absk-note-footer {
          font-size: .7rem; color: var(--accent-primary); font-weight: 600;
          font-family: var(--font-mono); margin-top: .25rem;
          text-transform: uppercase; letter-spacing: .08em;
        }

        /* Tools grid */
        .absk-tools-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: .65rem;
        }
        @media (min-width: 480px) { .absk-tools-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .absk-tools-grid { grid-template-columns: repeat(2, 1fr); } }
        .absk-tool-item {
          display: flex; align-items: center; gap: .65rem;
          padding: .85rem 1rem;
        }
        .absk-tool-icon {
          width: 32px; height: 32px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; flex-shrink: 0;
        }
        .absk-tool-name { font-size: .8rem; font-weight: 500; color: var(--text-primary); }
      `}</style>
    </section>
  )
}
