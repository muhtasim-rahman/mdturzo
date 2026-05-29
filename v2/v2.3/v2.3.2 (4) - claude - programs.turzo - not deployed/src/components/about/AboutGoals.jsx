// ============================================================
// AboutGoals.jsx — v2.3.2
// Goals & Plans — copy-4 card layout + progress bars.
// Short-Term: 85%, Mid-Term: 50%, Long-Term: 25%
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, useInView }            from 'framer-motion'
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import { faCircleCheck }                from '@fortawesome/free-solid-svg-icons'
import { GOALS, fadeUp, stagger }       from './aboutData.js'

function SectionLabel({ text }) {
  return <p className="abg-label">{text}</p>
}

function GoalProgressBar({ pct, color, inView, index }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 120 + 300)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div className="abg-progress-wrap">
      <div className="abg-progress-header">
        <span className="abg-progress-label">Progress</span>
        <span className="abg-progress-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="abg-progress-track">
        <motion.div
          className="abg-progress-fill"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})`, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: index * .1 }}
        />
      </div>
    </div>
  )
}

export default function AboutGoals() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about-goals" ref={sectionRef}>
      <div className="container-xl">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>
          <motion.div variants={fadeUp} className="abg-head">
            <SectionLabel text="Where I'm Headed" />
            <h2 className="abg-h2">
              Goals &amp; <span className="abg-accent">Plans</span>
            </h2>
            <p className="abg-sub">
              Short, mid, and long-term ambitions — building toward a meaningful career.
            </p>
          </motion.div>
        </motion.div>

        <div className="abg-grid">
          {GOALS.map(({ period, subtitle, color, icon, items, pct }, gi) => (
            <motion.div key={period}
              className="abg-card card"
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: gi * .1 }}>

              {/* Color top accent bar */}
              <div className="abg-topbar" style={{ background: color }} />

              <div className="abg-body">
                {/* Header */}
                <div className="abg-header">
                  <div className="abg-icon" style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="abg-period" style={{ color }}>{period}</p>
                    <p className="abg-time">{subtitle}</p>
                  </div>
                </div>

                {/* Items */}
                <ul className="abg-list">
                  {items.map((item, ii) => (
                    <li key={ii} className="abg-item">
                      <FontAwesomeIcon icon={faCircleCheck} style={{ color }} className="abg-bullet" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Progress bar */}
                <GoalProgressBar pct={pct} color={color} inView={inView} index={gi} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .abg-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .abg-head { text-align: center; margin-bottom: 3rem; }
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

        /* Grid */
        .abg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        /* Card */
        .abg-card {
          padding: 0; position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .abg-topbar { height: 4px; width: 100%; flex-shrink: 0; }
        .abg-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }

        /* Header */
        .abg-header {
          display: flex; align-items: center; gap: .75rem; margin-bottom: 1.25rem;
        }
        .abg-icon {
          width: 40px; height: 40px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; flex-shrink: 0;
        }
        .abg-period { font-weight: 700; font-size: .9rem; color: var(--text-primary); }
        .abg-time {
          font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono); margin-top: .12rem;
        }

        /* List */
        .abg-list {
          list-style: none; padding: 0; margin: 0 0 1.25rem 0;
          display: flex; flex-direction: column; gap: .6rem; flex: 1;
        }
        .abg-item {
          display: flex; align-items: flex-start; gap: .6rem;
          font-size: .83rem; color: var(--text-secondary); line-height: 1.5;
        }
        .abg-bullet { flex-shrink: 0; margin-top: .15rem; font-size: .8rem; }

        /* Progress bar */
        .abg-progress-wrap { margin-top: auto; padding-top: .5rem; }
        .abg-progress-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .35rem;
        }
        .abg-progress-label {
          font-size: .7rem; font-weight: 600; color: var(--text-tertiary);
          font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .05em;
        }
        .abg-progress-pct {
          font-size: .75rem; font-weight: 700; font-family: var(--font-mono);
        }
        .abg-progress-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .abg-progress-fill { height: 100%; border-radius: var(--radius-full); }
      `}</style>
    </section>
  )
}
