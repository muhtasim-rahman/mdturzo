// ============================================================
// components/about/AboutGoals.jsx — v2.3.2
// Goals & Plans — copy-4 card layout + progress bars
// Short: 85%, Mid: 50%, Long: 25%
// ============================================================

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faBullseye, faMountain, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const GOALS = [
  {
    period: 'Short-Term', timeframe: '2026', color: '#3B82F6', icon: faFlag,
    progress: 85,
    items: [
      'Complete SSC exam (SSC-26)',
      'Launch mdturzo.web.app',
      'Improve JavaScript skills',
      'Begin advanced frameworks',
    ],
  },
  {
    period: 'Mid-Term', timeframe: '2026 – 2028', color: '#10B981', icon: faBullseye,
    progress: 50,
    items: [
      'Enroll in HSC (Science group)',
      'Master full-stack web dev',
      'Start halal freelancing',
      'Build real client projects',
    ],
  },
  {
    period: 'Long-Term', timeframe: 'Future', color: '#8B5CF6', icon: faMountain,
    progress: 25,
    items: [
      'BSc in Computer Science & Engineering',
      'Professional full-stack developer',
      'Ethical freelancing career',
      'Build beneficial technology',
    ],
  },
]

function ProgressBar({ color, progress, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), 500)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <div className="abg-progress-wrap">
      <div className="abg-progress-meta">
        <span className="abg-progress-label">Progress</span>
        <span className="abg-progress-pct" style={{ color }}>{progress}%</span>
      </div>
      <div className="abg-progress-track">
        <motion.div
          className="abg-progress-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)`, boxShadow: `0 0 8px ${color}44` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${progress}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1] }}
        />
      </div>
    </div>
  )
}

export default function AboutGoals() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about-goals" ref={sectionRef}>
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}
          className="abg-header"
        >
          <p className="abg-label">Where I'm Headed</p>
          <h2 className="abg-h2">Goals &amp; <span className="abg-accent">Plans</span></h2>
          <p className="abg-sub">Short, mid, and long-term ambitions — building toward a meaningful career.</p>
        </motion.div>

        <div className="abg-grid">
          {GOALS.map(({ period, timeframe, color, icon, progress, items }, gi) => (
            <motion.div key={period}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: gi * .1 }}
              className="abg-card card"
            >
              {/* Top color bar */}
              <div className="abg-topbar" style={{ background: color }} />

              <div className="abg-body">
                {/* Header */}
                <div className="abg-head">
                  <div className="abg-icon" style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <div>
                    <p className="abg-period" style={{ color }}>{period}</p>
                    <p className="abg-timeframe">{timeframe}</p>
                  </div>
                </div>

                {/* Items list */}
                <ul className="abg-list">
                  {items.map((item, ii) => (
                    <li key={ii} className="abg-item">
                      <FontAwesomeIcon icon={faCircleCheck} style={{ color }} className="abg-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Progress bar */}
                <ProgressBar color={color} progress={progress} inView={inView} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .abg-header { text-align: center; margin-bottom: 3rem; }
        .abg-label {
          display: inline-block; font-family: var(--font-mono);
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .abg-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .abg-accent { color: var(--accent-primary); }
        .abg-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        .abg-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .abg-card { padding: 0; overflow: hidden; }
        .abg-topbar { height: 4px; width: 100%; }
        .abg-body { padding: 1.4rem 1.35rem; display: flex; flex-direction: column; gap: 1.1rem; }

        .abg-head { display: flex; align-items: center; gap: .9rem; }
        .abg-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .95rem; flex-shrink: 0;
        }
        .abg-period   { font-size: .95rem; font-weight: 800; line-height: 1.2; }
        .abg-timeframe { font-size: .75rem; color: var(--text-secondary); font-family: var(--font-mono); margin-top: .15rem; }

        .abg-list { display: flex; flex-direction: column; gap: .55rem; list-style: none; padding: 0; margin: 0; }
        .abg-item {
          display: flex; align-items: flex-start; gap: .55rem;
          font-size: .82rem; color: var(--text-secondary); line-height: 1.5;
        }
        .abg-check { font-size: .75rem; flex-shrink: 0; margin-top: .15rem; }

        /* Progress bar */
        .abg-progress-wrap { border-top: 1px solid var(--border-color); padding-top: .85rem; }
        .abg-progress-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: .4rem;
        }
        .abg-progress-label {
          font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .07em;
        }
        .abg-progress-pct { font-size: .78rem; font-weight: 700; font-family: var(--font-mono); }
        .abg-progress-track {
          height: 6px; background: var(--bg-surface);
          border-radius: 999px; overflow: hidden;
          border: 1px solid var(--border-color);
        }
        .abg-progress-fill { height: 100%; border-radius: 999px; }

        @media (max-width: 860px) { .abg-grid { grid-template-columns: 1fr; } }
        @media (min-width: 600px) and (max-width: 860px) {
          .abg-grid { grid-template-columns: repeat(2, 1fr); }
          .abg-grid > *:last-child { grid-column: span 2; }
        }
        @media (max-width: 599px) { .abg-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
