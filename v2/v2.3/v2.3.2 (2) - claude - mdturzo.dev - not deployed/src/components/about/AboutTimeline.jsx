// ============================================================
// components/about/AboutTimeline.jsx — v2.3.2
// Academic Timeline — scroll-driven line + colored active dots
// Dots use icons, past = muted, current = highlighted
// Mobile: left-aligned, fixed layout
// ============================================================

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSeedling, faBookOpen, faFlask, faLightbulb,
  faGraduationCap, faFlag,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  { period: '2013 – 2014', school: 'St. Geroza School, Saidpur',           level: 'Nursery & KG',   desc: 'First steps in formal education.',                                          color: '#10B981', icon: faSeedling      },
  { period: '2015 – 2017', school: 'St. Geroza School, Saidpur',           level: 'Class 1–3',      desc: 'Primary education. Developed curiosity for technology and reading.',           color: '#3B82F6', icon: faBookOpen      },
  { period: '2018 – 2019', school: 'Tulshiram Govt. Primary School',       level: 'Class 4–5',      desc: 'Completed primary cycle. Top student in science subjects.',                  color: '#8B5CF6', icon: faFlask         },
  { period: '2020',        school: 'Lions School & College, Saidpur',      level: 'Class 6',        desc: 'Briefly enrolled before transitioning to SGSC.',                            color: '#F59E0B', icon: faLightbulb     },
  { period: '2021 – 2025', school: 'Saidpur Govt. Science College (SGSC)', level: 'Class 6–10',     desc: 'Science group. Deepened interest in programming and web development.',        color: '#EC4899', icon: faGraduationCap },
  { period: '2026',        school: 'Saidpur Govt. Science College (SGSC)', level: 'SSC-26',         desc: 'SSC exam in progress (mid-2026). Goal: HSC → CSE degree.',                  color: '#3B82F6', icon: faFlag,  current: true },
]

function EduDot({ item, active, past }) {
  return (
    <div
      className={`abt-dot${active ? ' abt-dot-active' : ''}${past ? ' abt-dot-past' : ''}`}
      style={{
        borderColor: active || past ? item.color : 'var(--border-strong)',
        background:  active ? item.color : past ? `${item.color}28` : 'var(--bg-page)',
        color: active ? '#fff' : past ? item.color : 'var(--text-tertiary)',
      }}
    >
      <FontAwesomeIcon icon={item.icon} />
      {active && <span className="abt-dot-ring" style={{ borderColor: item.color }} />}
    </div>
  )
}

function EduCard({ item, isLeft, active, past }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`abt-card card${active ? ' abt-card-active' : ''}${past ? ' abt-card-past' : ''}`}
      style={{ '--card-color': item.color }}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: .5, ease: [.16, 1, .3, 1] }}
    >
      <div className="abt-card-accent" style={{ background: item.color }} />
      <div className="abt-card-body">
        <div className="abt-card-head">
          <div>
            <p className="abt-school">{item.school}</p>
            <p className="abt-level" style={{ color: item.color }}>{item.level}</p>
          </div>
          <div className="abt-card-right">
            <span className="abt-period">{item.period}</span>
            {item.current && (
              <span className="abt-badge" style={{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
                <span className="abt-badge-dot" style={{ background: item.color }} />
                Current
              </span>
            )}
          </div>
        </div>
        <p className="abt-desc">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function AboutTimeline() {
  const outerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Determine which item is "active" based on scroll progress
  const totalItems = EDUCATION.length

  return (
    <section className="section" id="about-education">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}
          className="abt-header"
        >
          <p className="abt-label">Education</p>
          <h2 className="abt-h2">Academic <span className="abt-accent">Timeline</span></h2>
          <p className="abt-sub">From nursery to the dream of CSE — the full journey.</p>
        </motion.div>

        <div className="abt-outer" ref={outerRef}>
          {/* Background line */}
          <div className="abt-line-bg" />
          {/* Animated fill line */}
          <motion.div className="abt-line-fill" style={{ height: lineHeight }} />

          {EDUCATION.map((item, i) => {
            const isLeft = i % 2 === 0
            // Item is "past" if progress has passed it; "active" if currently at it
            const threshold = i / (totalItems - 1)

            return (
              <motion.div
                key={i}
                className="abt-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: .4, delay: i * .06 }}
              >
                {/* PC left slot */}
                <div className="abt-slot abt-slot-left">
                  {isLeft && (
                    <EduCard item={item} isLeft={true}
                      active={item.current}
                      past={!item.current && i < totalItems - 1}
                    />
                  )}
                </div>

                {/* Center dot */}
                <div className="abt-dot-wrap">
                  <EduDot item={item}
                    active={item.current}
                    past={!item.current && i < totalItems - 1}
                  />
                </div>

                {/* PC right slot */}
                <div className="abt-slot abt-slot-right">
                  {!isLeft && (
                    <EduCard item={item} isLeft={false}
                      active={item.current}
                      past={!item.current && i < totalItems - 1}
                    />
                  )}
                </div>

                {/* Mobile only card */}
                <div className="abt-slot-mobile">
                  <EduCard item={item} isLeft={true}
                    active={item.current}
                    past={!item.current && i < totalItems - 1}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .abt-header { text-align: center; margin-bottom: 3rem; }
        .abt-label {
          display: inline-block; font-family: var(--font-mono);
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .abt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .abt-accent { color: var(--accent-primary); }
        .abt-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 480px; margin: 0 auto; line-height: 1.7;
        }

        /* ── TIMELINE OUTER ──────────────────────────────── */
        .abt-outer {
          position: relative;
          display: flex; flex-direction: column; gap: 0;
        }

        /* Center vertical line */
        .abt-line-bg, .abt-line-fill {
          position: absolute;
          left: 50%; transform: translateX(-50%);
          width: 2px; top: 8px; bottom: 8px;
          pointer-events: none; z-index: 0;
        }
        .abt-line-bg { background: var(--border-strong); opacity: .4; bottom: 8px; }
        .abt-line-fill {
          background: linear-gradient(to bottom, var(--accent-primary), #8B5CF6);
          transform-origin: top;
          z-index: 1;
          border-radius: 2px;
        }

        /* ── ITEM ROW ────────────────────────────────────── */
        .abt-item {
          display: grid;
          grid-template-columns: 1fr 32px 1fr;
          align-items: center;
          gap: 0 1.25rem;
          padding: 1.25rem 0;
          position: relative;
        }

        /* Slots */
        .abt-slot { display: flex; }
        .abt-slot-left  { justify-content: flex-end; }
        .abt-slot-right { justify-content: flex-start; }
        .abt-slot-mobile { display: none; }

        /* ── DOT ────────────────────────────────────────── */
        .abt-dot-wrap {
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 2;
        }
        .abt-dot {
          width: 28px; height: 28px;
          border-radius: 50%; border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem;
          transition: all .3s ease;
          position: relative; flex-shrink: 0;
        }
        .abt-dot-ring {
          position: absolute; inset: -5px;
          border-radius: 50%; border: 2px solid;
          opacity: .35; animation: abt-ring-pulse 2s ease-in-out infinite;
        }
        @keyframes abt-ring-pulse {
          0%, 100% { transform: scale(1); opacity: .35; }
          50%       { transform: scale(1.15); opacity: .15; }
        }
        .abt-dot-past { opacity: .7; }

        /* ── CARD ───────────────────────────────────────── */
        .abt-card {
          max-width: 420px; width: 100%;
          padding: 0; overflow: hidden;
          position: relative;
          transition: box-shadow .2s, transform .2s;
        }
        .abt-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,.12);
        }
        .abt-card-active {
          box-shadow: 0 0 0 2px var(--card-color), 0 8px 24px rgba(0,0,0,.12) !important;
        }
        .abt-card-past { opacity: .82; }

        .abt-card-accent {
          height: 3px; width: 100%;
        }
        .abt-card-body { padding: 1rem 1.1rem; }
        .abt-card-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: .5rem; margin-bottom: .5rem;
        }
        .abt-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: .3rem; flex-shrink: 0; }
        .abt-school { font-size: .82rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
        .abt-level  { font-size: .75rem; font-weight: 600; margin-top: .2rem; }
        .abt-period {
          font-size: .7rem; color: var(--text-tertiary);
          font-family: var(--font-mono); white-space: nowrap;
        }
        .abt-badge {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .65rem; font-weight: 600; padding: .15rem .45rem;
          border-radius: 9999px; white-space: nowrap;
        }
        .abt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: abt-blink 1.4s ease-in-out infinite;
        }
        @keyframes abt-blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
        .abt-desc { font-size: .78rem; color: var(--text-secondary); line-height: 1.6; }

        /* ── MOBILE ─────────────────────────────────────── */
        @media (max-width: 768px) {
          .abt-item {
            grid-template-columns: 28px 1fr;
            grid-template-areas: "dot card";
            gap: 0 1rem;
            padding: .85rem 0;
            align-items: flex-start;
          }
          .abt-slot-left, .abt-slot-right { display: none; }
          .abt-slot-mobile { display: flex; grid-area: card; width: 100%; }
          .abt-dot-wrap { grid-area: dot; align-self: flex-start; margin-top: .35rem; }
          .abt-card { max-width: 100%; }

          /* Mobile: line on the left */
          .abt-line-bg, .abt-line-fill {
            left: 14px; transform: none;
          }
        }
        @media (max-width: 480px) {
          .abt-card-body { padding: .85rem .9rem; }
          .abt-card-head { flex-direction: column; gap: .4rem; }
          .abt-card-right { align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
