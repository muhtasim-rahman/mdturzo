// ============================================================
// AboutGoals.jsx — v2.3.2
// Goals & Plans section — from copy-4 layout
// Added: progress bar at bottom of each card (85/50/25%)
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock, faBullseye, faMountain,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

const GOALS = [
  {
    period: 'Short-Term', timeframe: '2026', color: '#3B82F6', icon: faClock,
    progress: 85,
    items: [
      'Complete SSC exam (SSC-26 Batch)',
      'Launch portfolio: mdturzo.web.app',
      'Improve JavaScript extensively',
      'Build more real-world projects',
    ],
  },
  {
    period: 'Mid-Term', timeframe: '2026 – 2028', color: '#10B981', icon: faBullseye,
    progress: 50,
    items: [
      'Enroll in HSC — Science group',
      'Master full-stack web development',
      'Start freelancing (halal, ethical clients)',
      'Build client projects & earn halal income',
    ],
  },
  {
    period: 'Long-Term', timeframe: 'Future', color: '#8B5CF6', icon: faMountain,
    progress: 25,
    items: [
      'BSc in Computer Science & Engineering',
      'Become professional full-stack developer',
      'Build sustainable ethical freelancing career',
      'Create beneficial technology for society',
    ],
  },
]

export default function AboutGoals() {
  return (
    <section className="section" id="about-goals">
      <div className="container-xl">
        <motion.div
          className="abg-header"
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: .2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: .1 } } }}>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: .5 } } }}
            className="abg-label">
            Roadmap
          </motion.p>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: .5 } } }}
            className="abg-h2">
            Goals &amp; <span className="abg-accent">Plans</span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: .5 } } }}
            className="abg-sub">
            Where I'm headed — short, mid, and long-term ambitions building toward a meaningful career.
          </motion.p>
        </motion.div>

        <div className="abg-grid">
          {GOALS.map(({ period, timeframe, color, icon, progress, items }, gi) => (
            <motion.div
              key={period}
              className="abg-card card"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: gi * .1 }}>

              {/* Top color bar */}
              <div className="abg-topbar" style={{ background: color }} />

              <div className="abg-body">
                {/* Header */}
                <div className="abg-card-header">
                  <div className="abg-icon" style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <div>
                    <p className="abg-period" style={{ color }}>{period}</p>
                    <p className="abg-time">{timeframe}</p>
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

                {/* Progress bar at bottom */}
                <div className="abg-prog-wrap">
                  <div className="abg-prog-meta">
                    <span className="abg-prog-label">Progress</span>
                    <span className="abg-prog-pct" style={{ color }}>{progress}%</span>
                  </div>
                  <div className="abg-prog-track">
                    <motion.div
                      className="abg-prog-fill"
                      style={{
                        background: `linear-gradient(90deg, ${color}aa, ${color})`,
                        boxShadow: `0 0 8px ${color}44`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [.16, 1, .3, 1], delay: gi * .12 + .3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .abg-header { text-align: center; margin-bottom: 3rem; }
        .abg-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
        }
        .abg-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abg-accent { color: var(--accent-primary); }
        .abg-sub {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Grid */
        .abg-grid {
          display: grid; grid-template-columns: 1fr; gap: 1.25rem;
        }
        @media (min-width: 768px) { .abg-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Card */
        .abg-card {
          padding: 0; overflow: hidden;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .abg-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
        .abg-card:active { transform: scale(.97); }
        .abg-topbar { height: 3px; width: 100%; }
        .abg-body { padding: 1.4rem; }
        .abg-card-header {
          display: flex; align-items: center; gap: .875rem; margin-bottom: 1rem;
        }
        .abg-icon {
          width: 38px; height: 38px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .8125rem; flex-shrink: 0;
        }
        .abg-period { font-size: .875rem; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
        .abg-time { font-size: .72rem; color: var(--text-tertiary); margin-top: .15rem; font-family: var(--font-mono); }

        /* List */
        .abg-list { display: flex; flex-direction: column; gap: .6rem; margin-bottom: 1.25rem; }
        .abg-item {
          display: flex; align-items: flex-start; gap: .65rem;
          font-size: .8125rem; color: var(--text-secondary); line-height: 1.5;
        }
        .abg-check { flex-shrink: 0; margin-top: .1rem; font-size: .8rem; }

        /* Progress bar */
        .abg-prog-wrap {
          border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: auto;
        }
        .abg-prog-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: .45rem;
        }
        .abg-prog-label { font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono); }
        .abg-prog-pct { font-size: .8rem; font-weight: 700; font-family: var(--font-mono); }
        .abg-prog-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .abg-prog-fill { height: 100%; border-radius: var(--radius-full); }
      `}</style>
    </section>
  )
}
