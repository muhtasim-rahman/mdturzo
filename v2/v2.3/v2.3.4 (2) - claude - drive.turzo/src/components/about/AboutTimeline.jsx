// ============================================================
// AboutTimeline.jsx — v2.3.4
// FULL REDESIGN → Wheel / Arc Timeline
// Inspired by CSS wheel timeline concept — custom implementation
// Fully responsive: Desktop = arc wheel | Mobile = vertical list
// No over-engineering; matches site theme perfectly
// ============================================================

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faSchool, faTrophy,
  faRocket, faAtom, faBook, faFlask, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  {
    period: '2013–2014',
    school: 'St. Geroza School',
    location: 'Saidpur',
    level: 'Nursery & KG',
    desc: 'First steps in formal education. Where curiosity and the love of learning began.',
    color: '#10B981', icon: faSchool,
  },
  {
    period: '2015–2017',
    school: 'St. Geroza School',
    location: 'Saidpur',
    level: 'Class 1, 2 & 3',
    desc: 'Primary years. Grew a deep love for reading and understanding how things work.',
    color: '#3B82F6', icon: faBook,
  },
  {
    period: '2018–2019',
    school: 'Tulshiram Govt. Primary School',
    location: 'Saidpur',
    level: 'Class 4 & 5',
    desc: 'Completed primary cycle. Science became a favourite subject.',
    color: '#8B5CF6', icon: faFlask,
  },
  {
    period: '2020',
    school: 'Lions School & College',
    location: 'Saidpur',
    level: 'Class 6',
    desc: 'Brief enrollment before transitioning to SGSC. A short but formative period.',
    color: '#F59E0B', icon: faGraduationCap,
  },
  {
    period: '2021–2025',
    school: 'Saidpur Govt. Science College (SGSC)',
    location: 'Saidpur',
    level: 'Class 6 – 10',
    desc: 'Science group. Deepened passion for computers, programming, and web development.',
    color: '#EC4899', icon: faSchool,
  },
  {
    period: '2026',
    school: 'Saidpur Govt. Science College (SGSC)',
    location: 'Saidpur',
    level: 'SSC-26 Batch',
    desc: 'SSC exams completed (mid-2026). A milestone marking the next chapter.',
    color: '#3B82F6', icon: faTrophy, current: true,
  },
  {
    period: 'Upcoming',
    school: 'Higher Secondary (HSC)',
    location: 'Science Group',
    level: 'After SSC',
    desc: 'Aiming for Higher Secondary Certificate with Science group — the next big step.',
    color: '#06B6D4', icon: faRocket, upcoming: true,
  },
  {
    period: 'Long-Term',
    school: 'Dream Institution',
    location: 'Bangladesh',
    level: 'BSc in CSE',
    desc: 'The ultimate goal — a Computer Science degree to become a professional full-stack developer.',
    color: '#22C55E', icon: faAtom, upcoming: true,
  },
]

const N = EDUCATION.length

export default function AboutTimeline() {
  const [active, setActive] = useState(5) // default to current (SSC-26)

  const prev = useCallback(() => setActive(i => (i - 1 + N) % N), [])
  const next = useCallback(() => setActive(i => (i + 1) % N), [])

  const item = EDUCATION[active]

  // Arc positions — evenly spaced along a half-ellipse
  // Center = bottom of arc, items spread outward
  // We'll place N items on an arc going from left to right (top half of circle)
  const getPos = (idx) => {
    const angle = (idx / (N - 1)) * Math.PI // 0 → π (left to right across top)
    const rx = 46  // % of container width
    const ry = 40  // % of container height
    const cx = 50  // center x
    const cy = 92  // center y (arc centered at bottom)
    return {
      x: cx + rx * Math.cos(Math.PI - angle), // mirror so left starts at 0
      y: cy - ry * Math.sin(angle),
    }
  }

  return (
    <section className="section" id="about-education">
      <div className="container-xl">
        {/* Header */}
        <motion.div className="awt-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="awt-label">Education</p>
          <h2 className="awt-h2">Academic <span className="awt-accent">Journey</span></h2>
          <p className="awt-sub">From nursery to the dream of CSE — every step matters.</p>
        </motion.div>

        {/* ── DESKTOP: Wheel arc ── */}
        <div className="awt-wheel-wrap">
          <div className="awt-wheel-stage">

            {/* Arc track line */}
            <svg className="awt-arc-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 4 92 A 46 40 0 0 1 96 92"
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="0.4"
                strokeDasharray="2,1.2"
              />
            </svg>

            {/* Dot nodes on arc */}
            {EDUCATION.map((edu, i) => {
              const pos = getPos(i)
              const isActive = i === active
              const isPast = i < active

              return (
                <button
                  key={i}
                  className={`awt-node${isActive ? ' awt-node-active' : ''}${isPast ? ' awt-node-past' : ''}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    '--nc': edu.color,
                  }}
                  onClick={() => setActive(i)}
                  title={edu.level}
                  aria-label={`${edu.period} — ${edu.level}`}>
                  <FontAwesomeIcon icon={edu.icon} className="awt-node-icon" />
                  <span className="awt-node-year">{edu.period}</span>
                  {isActive && <span className="awt-node-ring" />}
                </button>
              )
            })}

            {/* Central content card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="awt-center-card"
                initial={{ opacity: 0, y: 10, scale: .96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: .97 }}
                transition={{ duration: .3, ease: [.16, 1, .3, 1] }}>

                {/* Period chip */}
                <span className="awt-cc-period" style={{ background: `${item.color}18`, color: item.color, borderColor: `${item.color}30` }}>
                  {item.period}
                </span>

                {/* Level */}
                <p className="awt-cc-level" style={{ color: item.color }}>{item.level}</p>

                {/* School */}
                <p className="awt-cc-school">{item.school}</p>
                <p className="awt-cc-loc">{item.location}</p>

                {/* Desc */}
                <p className="awt-cc-desc">{item.desc}</p>

                {/* Status badges */}
                {item.current && (
                  <span className="awt-badge awt-badge-cur">
                    <span className="awt-badge-dot" />Current
                  </span>
                )}
                {item.upcoming && (
                  <span className="awt-badge awt-badge-up">Upcoming</span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <button className="awt-nav awt-nav-prev" onClick={prev} aria-label="Previous">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="awt-nav awt-nav-next" onClick={next} aria-label="Next">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Step counter */}
          <div className="awt-counter">
            {EDUCATION.map((_, i) => (
              <button
                key={i}
                className={`awt-pip${i === active ? ' awt-pip-active' : ''}`}
                style={{ '--pc': EDUCATION[i].color }}
                onClick={() => setActive(i)}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE: Vertical scroll list ── */}
        <div className="awt-mobile-list">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              className="awt-ml-item"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .15 }}
              transition={{ duration: .42, delay: i * .05 }}>

              {/* Left: dot + line */}
              <div className="awt-ml-left">
                <div className="awt-ml-dot" style={{ background: edu.color, boxShadow: edu.current ? `0 0 0 4px ${edu.color}22` : 'none' }}>
                  <FontAwesomeIcon icon={edu.icon} style={{ color: '#fff', fontSize: '.52rem' }} />
                </div>
                {i < N - 1 && <div className="awt-ml-line" />}
              </div>

              {/* Right: content */}
              <div className="awt-ml-body">
                <span className="awt-ml-period" style={{ color: edu.color }}>{edu.period}</span>
                <p className="awt-ml-level" style={{ color: edu.color }}>{edu.level}</p>
                <p className="awt-ml-school">{edu.school}</p>
                <p className="awt-ml-desc">{edu.desc}</p>
                {edu.current && (
                  <span className="awt-badge awt-badge-cur" style={{ marginTop: '.4rem', display: 'inline-flex' }}>
                    <span className="awt-badge-dot" />Current
                  </span>
                )}
                {edu.upcoming && (
                  <span className="awt-badge awt-badge-up" style={{ marginTop: '.4rem', display: 'inline-flex' }}>Upcoming</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Header ── */
        .awt-header { text-align: center; margin-bottom: 3rem; }
        .awt-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem; display: block;
        }
        .awt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .awt-accent { color: var(--accent-primary); }
        .awt-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 440px; margin: 0 auto; line-height: 1.7;
        }

        /* ── DESKTOP wheel ── */
        .awt-wheel-wrap {
          display: block;
        }
        .awt-mobile-list { display: none; }

        .awt-wheel-stage {
          position: relative;
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          aspect-ratio: 16/11;
          /* clamp height for very wide or narrow screens */
          min-height: 380px;
          max-height: 580px;
        }

        /* Arc SVG */
        .awt-arc-svg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }

        /* Node buttons on arc */
        .awt-node {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--bg-surface);
          border: 2px solid var(--border-strong);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .2s ease;
          color: var(--text-tertiary);
          z-index: 3; flex-direction: column;
          gap: 0; overflow: visible;
        }
        .awt-node-icon { font-size: .58rem; pointer-events: none; }
        .awt-node-year {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%; transform: translateX(-50%);
          font-size: .55rem; font-family: var(--font-mono);
          font-weight: 700; color: var(--text-tertiary);
          white-space: nowrap; pointer-events: none;
          transition: color .2s;
        }
        .awt-node:hover {
          border-color: var(--nc);
          background: color-mix(in srgb, var(--nc) 12%, var(--bg-surface));
          color: var(--nc);
          transform: translate(-50%, -50%) scale(1.12);
        }
        .awt-node:hover .awt-node-year { color: var(--nc); }
        .awt-node-past {
          border-color: var(--nc);
          background: color-mix(in srgb, var(--nc) 10%, var(--bg-surface));
          color: var(--nc);
          opacity: .7;
        }
        .awt-node-active {
          border-color: var(--nc) !important;
          background: var(--nc) !important;
          color: #fff !important;
          transform: translate(-50%, -50%) scale(1.25) !important;
          box-shadow: 0 0 0 5px color-mix(in srgb, var(--nc) 22%, transparent),
                      0 4px 16px color-mix(in srgb, var(--nc) 38%, transparent);
          opacity: 1 !important;
          z-index: 5;
        }
        .awt-node-active .awt-node-year { color: var(--nc) !important; font-weight: 800; }
        .awt-node-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 2px solid var(--nc);
          animation: awt-ring 1.8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes awt-ring {
          0%,100% { opacity: .7; transform: scale(1); }
          50%      { opacity: .1; transform: scale(1.5); }
        }

        /* Center card */
        .awt-center-card {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -44%);
          width: clamp(220px, 36%, 310px);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.2rem 1.3rem;
          text-align: center;
          z-index: 4;
          box-shadow: 0 4px 24px rgba(0,0,0,.12);
        }
        .awt-cc-period {
          display: inline-block;
          font-size: .64rem; font-weight: 700; font-family: var(--font-mono);
          padding: .2rem .6rem; border-radius: 9999px;
          border: 1px solid; margin-bottom: .55rem;
        }
        .awt-cc-level {
          font-size: .85rem; font-weight: 800;
          margin-bottom: .2rem; line-height: 1.25;
        }
        .awt-cc-school {
          font-size: .78rem; font-weight: 600;
          color: var(--text-primary); margin-bottom: .1rem;
        }
        .awt-cc-loc {
          font-size: .66rem; color: var(--text-tertiary);
          font-family: var(--font-mono); margin-bottom: .55rem;
        }
        .awt-cc-desc {
          font-size: .74rem; color: var(--text-secondary);
          line-height: 1.65;
        }

        /* Badges */
        .awt-badge {
          display: inline-flex; align-items: center; gap: .28rem;
          font-size: .6rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .06em; padding: .18rem .55rem; border-radius: 9999px;
          margin-top: .55rem;
        }
        .awt-badge-cur {
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
        }
        .awt-badge-up {
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        .awt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-primary);
          animation: awt-ring 1.5s ease-in-out infinite;
        }

        /* Nav arrows */
        .awt-nav {
          position: absolute; bottom: 6%; z-index: 6;
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--bg-surface); border: 1px solid var(--border-strong);
          color: var(--text-secondary); font-size: .75rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .18s;
        }
        .awt-nav:hover {
          background: var(--accent-light); color: var(--accent-primary);
          border-color: rgba(59,130,246,.3);
        }
        .awt-nav-prev { left: 4%; }
        .awt-nav-next { right: 4%; }

        /* Pip counter */
        .awt-counter {
          display: flex; justify-content: center; align-items: center;
          gap: .4rem; margin-top: 1.5rem; flex-wrap: wrap;
        }
        .awt-pip {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border-strong); border: none; cursor: pointer;
          transition: all .2s; flex-shrink: 0;
        }
        .awt-pip-active {
          background: var(--pc); transform: scale(1.35);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--pc) 22%, transparent);
        }

        /* ── MOBILE: Vertical list ── */
        @media (max-width: 700px) {
          .awt-wheel-wrap { display: none; }
          .awt-mobile-list { display: flex; flex-direction: column; }
          .awt-ml-item {
            display: flex; gap: .85rem;
            padding-bottom: .1rem;
          }
          .awt-ml-left {
            display: flex; flex-direction: column; align-items: center; flex-shrink: 0;
          }
          .awt-ml-dot {
            width: 28px; height: 28px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; transition: box-shadow .3s;
          }
          .awt-ml-line {
            flex: 1; width: 2px;
            background: var(--border-color);
            margin: .3rem 0; min-height: 20px;
          }
          .awt-ml-body { padding-bottom: 1.1rem; flex: 1; }
          .awt-ml-period {
            font-size: .66rem; font-weight: 700;
            font-family: var(--font-mono); display: block; margin-bottom: .18rem;
          }
          .awt-ml-level {
            font-size: .82rem; font-weight: 700; margin-bottom: .1rem; line-height: 1.25;
          }
          .awt-ml-school {
            font-size: .76rem; font-weight: 600; color: var(--text-primary); margin-bottom: .3rem;
          }
          .awt-ml-desc {
            font-size: .74rem; color: var(--text-secondary); line-height: 1.6;
          }
        }
      `}</style>
    </section>
  )
}
