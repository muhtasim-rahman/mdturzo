// ============================================================
// AboutTimeline.jsx — v2.3.4
// Wheel / radial timeline — inspired by CSS wheel timeline concept.
// PC: circular wheel with items around the arc + center display
// Mobile: vertical card list with left accent line
// Smooth, minimal color use matching site theme.
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faSchool, faTrophy,
  faRocket, faAtom, faBook, faFlask,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  {
    period: '2013–14',
    school: 'St. Geroza School',
    location: 'Saidpur',
    level: 'Nursery & KG',
    desc: 'First steps in formal education — where curiosity and wonder began.',
    color: '#10B981', icon: faSchool,
  },
  {
    period: '2015–17',
    school: 'St. Geroza School',
    location: 'Saidpur',
    level: 'Class 1, 2 & 3',
    desc: 'Primary years — grew a love for reading and understanding how things work.',
    color: '#3B82F6', icon: faBook,
  },
  {
    period: '2018–19',
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
    desc: 'Brief enrollment before transitioning to SGSC.',
    color: '#F59E0B', icon: faGraduationCap,
  },
  {
    period: '2021–25',
    school: 'Saidpur Govt. Science College',
    location: 'SGSC',
    level: 'Class 6 – 10',
    desc: 'Science group. Deepened passion for computers and web development.',
    color: '#EC4899', icon: faSchool,
  },
  {
    period: '2026',
    school: 'Saidpur Govt. Science College',
    location: 'SGSC',
    level: 'SSC-26 Batch',
    desc: 'SSC exams complete (mid-2026). The start of a new chapter.',
    color: '#3B82F6', icon: faTrophy, current: true,
  },
  {
    period: 'Soon',
    school: 'Higher Secondary (HSC)',
    location: 'Science Group',
    level: 'After SSC',
    desc: 'Aiming for Higher Secondary Certificate with Science group.',
    color: '#06B6D4', icon: faRocket, upcoming: true,
  },
  {
    period: 'Future',
    school: 'Dream University',
    location: 'BSc CSE',
    level: 'Computer Science & Engineering',
    desc: 'Long-term goal — a CSE degree to become a professional full-stack developer.',
    color: '#22C55E', icon: faAtom, upcoming: true,
  },
]

const N = EDUCATION.length

// Calculate x,y position on the arc (upper semicircle, items spread from left to right)
function arcPosition(index, total, rx, ry) {
  // Spread items evenly from 200deg to 340deg (bottom half arc, opening upward)
  const startDeg = 200
  const endDeg   = 340
  const angle = startDeg + (index / (total - 1)) * (endDeg - startDeg)
  const rad = (angle * Math.PI) / 180
  return {
    x: rx * Math.cos(rad),
    y: ry * Math.sin(rad),
    angle,
  }
}

export default function AboutTimeline() {
  const [active, setActive] = useState(5) // default to SSC (current)
  const [isMobile, setIsMobile] = useState(false)
  const wrapRef = useRef(null)
  const [mobileProgress, setMobileProgress] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Mobile scroll progress for the line
  useEffect(() => {
    if (!isMobile || !wrapRef.current) return
    const onScroll = () => {
      const rect = wrapRef.current.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, (window.innerHeight * .55 - rect.top) / (rect.height * .9)))
      setMobileProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const item = EDUCATION[active]

  // Wheel dimensions
  const RX = 260   // horizontal radius
  const RY = 200   // vertical radius (flatter ellipse)
  const DOT_R = 14 // dot radius

  return (
    <section className="section" id="about-education">
      <div className="container-xl">

        {/* Header */}
        <motion.div className="abt-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="abt-label">Education</p>
          <h2 className="abt-h2">
            Academic <span className="abt-accent">Journey</span>
          </h2>
          <p className="abt-sub">From nursery to the dream of CSE — the full path.</p>
        </motion.div>

        {/* ── WHEEL (desktop) ── */}
        {!isMobile && (
          <motion.div className="abt-wheel-wrap"
            initial={{ opacity: 0, scale: .96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ duration: .6 }}>

            <svg
              className="abt-wheel-svg"
              viewBox={`${-RX - 60} ${-RY - 60} ${(RX + 60) * 2} ${(RY + 60) * 2}`}
              aria-hidden="true">

              {/* Elliptical arc track */}
              <ellipse cx="0" cy="0" rx={RX} ry={RY}
                fill="none" stroke="var(--border-color)" strokeWidth="1.5"
                strokeDasharray="4 6" opacity=".45" />

              {/* Connector lines from each dot to center */}
              {EDUCATION.map((edu, i) => {
                const pos = arcPosition(i, N, RX, RY)
                const isActive = i === active
                return (
                  <line key={i}
                    x1="0" y1="0" x2={pos.x} y2={pos.y}
                    stroke={isActive ? edu.color : 'var(--border-color)'}
                    strokeWidth={isActive ? 1.5 : .8}
                    opacity={isActive ? .5 : .2}
                    style={{ transition: 'stroke .3s, opacity .3s' }}
                  />
                )
              })}

              {/* Dots */}
              {EDUCATION.map((edu, i) => {
                const pos = arcPosition(i, N, RX, RY)
                const isActive = i === active
                const isPast = i < active
                return (
                  <g key={i} style={{ cursor: 'pointer' }} onClick={() => setActive(i)}>
                    {/* Glow ring for active */}
                    {isActive && (
                      <circle cx={pos.x} cy={pos.y} r={DOT_R + 9}
                        fill="none" stroke={edu.color} strokeWidth="1"
                        opacity=".25" />
                    )}
                    {/* Dot */}
                    <circle cx={pos.x} cy={pos.y} r={DOT_R}
                      fill={isActive ? edu.color : isPast ? `${edu.color}55` : 'var(--bg-surface)'}
                      stroke={isActive ? edu.color : isPast ? edu.color : 'var(--border-strong)'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      style={{ transition: 'fill .3s, stroke .3s' }}
                    />
                    {/* Period label */}
                    <text
                      x={pos.x * 1.28}
                      y={pos.y * 1.28 + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      fill={isActive ? edu.color : 'var(--text-tertiary)'}
                      style={{ transition: 'fill .3s', pointerEvents: 'none', userSelect: 'none' }}>
                      {edu.period}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Center info panel */}
            <div className="abt-center-panel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 12, scale: .97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: .97 }}
                  transition={{ duration: .3 }}
                  className="abt-center-content">
                  {/* Icon */}
                  <div className="abt-center-icon" style={{ background: `${item.color}18`, color: item.color }}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  {/* Badges */}
                  <div className="abt-center-badges">
                    {item.current && (
                      <span className="abt-badge-cur">
                        <span className="abt-badge-pulse" />Current
                      </span>
                    )}
                    {item.upcoming && <span className="abt-badge-up">Upcoming</span>}
                  </div>
                  {/* Period */}
                  <span className="abt-center-period" style={{ color: item.color, borderColor: `${item.color}35`, background: `${item.color}0e` }}>
                    {item.period}
                  </span>
                  {/* School */}
                  <p className="abt-center-school">{item.school}</p>
                  <p className="abt-center-location">{item.location}</p>
                  <p className="abt-center-level" style={{ color: item.color }}>{item.level}</p>
                  {/* Desc */}
                  <p className="abt-center-desc">{item.desc}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dot nav */}
              <div className="abt-dot-nav">
                {EDUCATION.map((_, i) => (
                  <button key={i}
                    className={`abt-dot-btn${i === active ? ' abt-dot-btn-active' : ''}`}
                    style={i === active ? { background: EDUCATION[i].color } : {}}
                    onClick={() => setActive(i)}
                    aria-label={`Go to ${EDUCATION[i].level}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── MOBILE vertical list ── */}
        {isMobile && (
          <div ref={wrapRef} className="abt-mobile-wrap">
            <div className="abt-ml-line-bg" />
            <div className="abt-ml-line-fill" style={{ height: `${mobileProgress * 100}%` }} />

            {EDUCATION.map((edu, i) => {
              const reached = i / (N - 1) <= mobileProgress + .1
              return (
                <motion.div key={i} className="abt-ml-row"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: .3 }}
                  transition={{ duration: .4, delay: i * .04 }}>
                  {/* Dot */}
                  <div className="abt-ml-dot"
                    style={{
                      borderColor: reached ? edu.color : 'var(--border-strong)',
                      background:  reached ? edu.color : 'var(--bg-surface)',
                      boxShadow:   reached ? `0 0 0 3px ${edu.color}22` : 'none',
                      transition:  'all .4s',
                    }}>
                    <FontAwesomeIcon icon={edu.icon}
                      style={{ color: reached ? '#fff' : 'var(--text-tertiary)', fontSize: '.52rem', transition: 'color .4s' }} />
                  </div>
                  {/* Card */}
                  <div className="abt-ml-card card"
                    style={{
                      borderLeft: `3px solid ${reached ? edu.color : 'var(--border-color)'}`,
                      opacity: reached ? 1 : .45,
                      transition: 'opacity .4s, border-color .4s',
                    }}>
                    <div className="abt-ml-header">
                      <span className="abt-ml-period"
                        style={{ color: reached ? edu.color : 'var(--text-tertiary)', borderColor: reached ? `${edu.color}30` : 'var(--border-color)', background: reached ? `${edu.color}0d` : 'var(--bg-surface-2)', transition: 'all .4s' }}>
                        {edu.period}
                      </span>
                      {edu.current && <span className="abt-badge-cur"><span className="abt-badge-pulse" />Current</span>}
                      {edu.upcoming && <span className="abt-badge-up">Upcoming</span>}
                    </div>
                    <p className="abt-ml-school" style={{ color: reached ? 'var(--text-primary)' : 'var(--text-tertiary)', transition: 'color .4s' }}>{edu.school}</p>
                    <p className="abt-ml-level" style={{ color: reached ? edu.color : 'var(--text-tertiary)', transition: 'color .4s' }}>{edu.level}</p>
                    <p className="abt-ml-desc">{edu.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

      </div>

      <style>{`
        /* ── Header ── */
        .abt-header { text-align: center; margin-bottom: 3rem; }
        .abt-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem; display: block;
        }
        .abt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin: 0 0 .5rem;
        }
        .abt-accent { color: var(--accent-primary); }
        .abt-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 420px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Wheel (desktop) ── */
        .abt-wheel-wrap {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          min-height: 520px;
          user-select: none;
        }
        .abt-wheel-svg {
          width: min(680px, 90vw);
          height: min(520px, 68vw);
          flex-shrink: 0;
          overflow: visible;
        }

        /* Center panel */
        .abt-center-panel {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          display: flex; flex-direction: column; align-items: center;
          pointer-events: none;
        }
        .abt-center-content {
          display: flex; flex-direction: column; align-items: center;
          gap: .35rem; text-align: center;
          pointer-events: auto;
        }
        .abt-center-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0; margin-bottom: .1rem;
        }
        .abt-center-badges { display: flex; gap: .35rem; flex-wrap: wrap; justify-content: center; min-height: 18px; }
        .abt-center-period {
          display: inline-block;
          font-size: .66rem; font-weight: 700; font-family: var(--font-mono);
          padding: .15rem .55rem; border-radius: 9999px;
          border: 1px solid; white-space: nowrap;
        }
        .abt-center-school {
          font-size: .8rem; font-weight: 700; color: var(--text-primary);
          margin: 0; line-height: 1.3;
        }
        .abt-center-location {
          font-size: .68rem; color: var(--text-tertiary);
          font-family: var(--font-mono); margin: 0;
        }
        .abt-center-level {
          font-size: .76rem; font-weight: 700; margin: 0;
        }
        .abt-center-desc {
          font-size: .72rem; color: var(--text-secondary);
          line-height: 1.6; margin: .1rem 0 0; max-width: 180px;
        }

        /* Dot nav */
        .abt-dot-nav {
          display: flex; gap: .3rem; margin-top: .85rem; flex-wrap: wrap;
          justify-content: center; pointer-events: auto;
        }
        .abt-dot-btn {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--border-strong); border: none; cursor: pointer;
          transition: all .2s; padding: 0; flex-shrink: 0;
        }
        .abt-dot-btn-active { transform: scale(1.5); }
        .abt-dot-btn:hover { transform: scale(1.3); opacity: .8; }

        /* Badges */
        .abt-badge-cur {
          display: inline-flex; align-items: center; gap: .25rem;
          font-size: .6rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .06em; padding: .1rem .48rem; border-radius: 9999px;
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
        }
        .abt-badge-up {
          display: inline-flex; align-items: center;
          font-size: .6rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .06em; padding: .1rem .48rem; border-radius: 9999px;
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        .abt-badge-pulse {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-primary);
          animation: abt-pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes abt-pulse {
          0%, 100% { opacity: .8; transform: scale(1); }
          50%       { opacity: .25; transform: scale(1.5); }
        }

        /* ── Mobile vertical list ── */
        .abt-mobile-wrap {
          position: relative;
          padding-left: 2.5rem;
          padding-bottom: 1rem;
        }
        .abt-ml-line-bg, .abt-ml-line-fill {
          position: absolute; left: .85rem; width: 2px;
          top: 0; pointer-events: none;
        }
        .abt-ml-line-bg { bottom: 0; background: var(--border-color); }
        .abt-ml-line-fill {
          background: linear-gradient(180deg, var(--accent-primary), #8B5CF6 60%, #22C55E);
          transition: height .05s linear; border-radius: 9999px;
        }
        .abt-ml-row {
          position: relative; z-index: 1;
          display: flex; align-items: flex-start; gap: .85rem;
          margin-bottom: 1.35rem;
        }
        .abt-ml-row:last-child { margin-bottom: 0; }
        .abt-ml-dot {
          position: absolute; left: -2rem; top: .65rem;
          width: 22px; height: 22px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; z-index: 2;
        }
        .abt-ml-card {
          flex: 1; padding: .95rem 1.1rem;
          border-radius: var(--radius-xl) !important;
        }
        .abt-ml-header { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; margin-bottom: .5rem; }
        .abt-ml-period {
          display: inline-block;
          font-size: .63rem; font-weight: 700; font-family: var(--font-mono);
          padding: .15rem .5rem; border-radius: 9999px; border: 1px solid;
        }
        .abt-ml-school { font-size: .84rem; font-weight: 600; margin: 0 0 .18rem; line-height: 1.3; }
        .abt-ml-level  { font-size: .76rem; font-weight: 700; margin: 0 0 .38rem; }
        .abt-ml-desc   { font-size: .75rem; color: var(--text-tertiary); line-height: 1.6; margin: 0; }
      `}</style>
    </section>
  )
}
