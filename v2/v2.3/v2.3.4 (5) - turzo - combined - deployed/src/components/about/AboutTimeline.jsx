// ============================================================
// AboutTimeline.jsx — v2.3.4
// REDESIGN: Wheel / Arc Timeline
//   * Desktop: semicircular arc of year dots, selected = center top
//     Click a dot to navigate. Prev/Next arrows.
//     Active item shows details below via vertical connector.
//   * Mobile (< 640px): horizontal scrollable year strip + detail card.
//   * Theme-consistent, minimal colors, no excessive rainbow.
// ============================================================

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faSchool, faTrophy,
  faRocket, faAtom, faBook, faFlask,
  faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  { period: '2013–2014', short: '2013', school: 'St. Geroza School, Saidpur',          level: 'Nursery & KG',               desc: 'First steps in formal education. Curiosity and wonder began here.',               color: '#10B981', icon: faSchool },
  { period: '2015–2017', short: '2015', school: 'St. Geroza School, Saidpur',          level: 'Class 1, 2 & 3',             desc: 'Primary years — grew a love for reading and understanding how things work.',        color: '#3B82F6', icon: faBook },
  { period: '2018–2019', short: '2018', school: 'Tulshiram Govt. Primary School',      level: 'Class 4 & 5',                desc: 'Completed primary cycle. Science became a favourite subject.',                       color: '#8B5CF6', icon: faFlask },
  { period: '2020',      short: '2020', school: 'Lions School & College, Saidpur',     level: 'Class 6',                    desc: 'Brief enrollment before transitioning to SGSC for better facilities.',               color: '#F59E0B', icon: faGraduationCap },
  { period: '2021–2025', short: '2021', school: 'Saidpur Govt. Science College (SGSC)', level: 'Class 6 – 10',              desc: 'Science group. Deepened passion for programming and web development.',                color: '#EC4899', icon: faSchool },
  { period: '2026',      short: '2026', school: 'Saidpur Govt. Science College (SGSC)', level: 'SSC-26 Batch',              desc: 'SSC exams in progress (mid-2026). Results expected: mid-2026. Next: HSC.',           color: '#3B82F6', icon: faTrophy, current: true },
  { period: 'Next',      short: 'HSC',  school: 'Higher Secondary (HSC)',              level: 'Science Group — After SSC',  desc: 'Aiming for Higher Secondary Certificate with Science group after SSC results.',      color: '#06B6D4', icon: faRocket, upcoming: true },
  { period: 'Dream',     short: 'CSE',  school: 'University (Dream Institution)',      level: 'BSc in CS & Engineering',    desc: 'Long-term goal — a CSE degree to become a professional full-stack developer.',       color: '#22C55E', icon: faAtom, upcoming: true },
]

const N = EDUCATION.length
const DEFAULT_IDX = 5 // SSC-26

// Arc geometry
const RADIUS    = 260
const MAX_ANGLE = 60  // degrees each side
const OFFSETS   = [-3, -2, -1, 0, 1, 2, 3]

function getArcPos(offset) {
  const angle = (offset / 3) * MAX_ANGLE
  const rad = ((angle - 90) * Math.PI) / 180
  // Circle center at (0, 0) in the arc coordinate system,
  // with the topmost point at (0, -RADIUS)
  const x = RADIUS * Math.cos(rad) // x from center
  const y = RADIUS + RADIUS * Math.sin(rad) // y from top (positive down)
  return { x, y }
}

// Dot sizes/opacity by offset magnitude
function dotStyle(offset, isSelected) {
  const abs = Math.abs(offset)
  const sizes = [28, 22, 18, 14]
  const opacities = [1, 0.85, 0.65, 0.42]
  return {
    size: isSelected ? 32 : sizes[abs],
    opacity: isSelected ? 1 : opacities[abs],
    fontSize: isSelected ? '.52rem' : `${.52 - abs * .04}rem`,
  }
}

export default function AboutTimeline() {
  const [idx, setIdx] = useState(DEFAULT_IDX)
  const [dir, setDir] = useState(0) // -1 left, +1 right for animation direction
  const mobileRef = useRef(null)

  const go = (newIdx) => {
    if (newIdx < 0 || newIdx >= N) return
    setDir(newIdx > idx ? 1 : -1)
    setIdx(newIdx)
  }

  // Scroll mobile strip to keep selected item visible
  useEffect(() => {
    if (!mobileRef.current) return
    const el = mobileRef.current.querySelector(`[data-idx="${idx}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [idx])

  const item = EDUCATION[idx]

  // Build visible arc items: the 7 items centered on idx
  const arcItems = OFFSETS.map(offset => {
    const i = idx + offset
    if (i < 0 || i >= N) return null
    return { ...EDUCATION[i], i, offset }
  })

  // Arc container: width ~700px, height = RADIUS*(1-cos(MAX_ANGLE)) + 20 for dot
  const arcH = Math.round(RADIUS * (1 - Math.cos((MAX_ANGLE * Math.PI) / 180))) + 40
  const arcW = 700

  return (
    <section className="section" id="about-education">
      <div className="container-xl">

        {/* Header */}
        <motion.div className="awt-head"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="awt-label">Education</p>
          <h2 className="awt-h2">Academic <span className="awt-accent">Timeline</span></h2>
          <p className="awt-sub">From nursery to the dream of CSE — the full journey.</p>
        </motion.div>

        {/* ──────────── DESKTOP WHEEL ──────────── */}
        <div className="awt-wheel-wrap">

          {/* Arc container */}
          <div
            className="awt-arc-container"
            style={{ height: `${arcH}px`, width: `${arcW}px` }}>

            {/* Background arc guide (decorative) */}
            <svg
              className="awt-arc-svg"
              width={arcW} height={arcH + 2}
              style={{ position: 'absolute', top: 0, left: 0 }}>
              <path
                d={`M ${arcW / 2 - RADIUS * Math.sin((MAX_ANGLE * Math.PI) / 180)} ${arcH}
                    A ${RADIUS} ${RADIUS} 0 0 1
                    ${arcW / 2 + RADIUS * Math.sin((MAX_ANGLE * Math.PI) / 180)} ${arcH}`}
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            </svg>

            {/* Arc dot items */}
            {arcItems.map((it) => {
              if (!it) return null
              const { x, y } = getArcPos(it.offset)
              const isSelected = it.i === idx
              const ds = dotStyle(it.offset, isSelected)
              const cx = arcW / 2 + x

              return (
                <button
                  key={it.i}
                  className={`awt-dot-btn${isSelected ? ' awt-dot-active' : ''}`}
                  style={{
                    left: `${cx}px`,
                    top: `${y}px`,
                    width: `${ds.size}px`,
                    height: `${ds.size}px`,
                    opacity: ds.opacity,
                    background: isSelected ? it.color : 'var(--bg-surface)',
                    borderColor: isSelected ? it.color : 'var(--border-strong)',
                    boxShadow: isSelected ? `0 0 0 4px ${it.color}22, 0 0 20px ${it.color}40` : 'none',
                    zIndex: isSelected ? 10 : 5,
                  }}
                  onClick={() => go(it.i)}
                  title={it.period}>
                  <FontAwesomeIcon
                    icon={it.icon}
                    style={{
                      fontSize: ds.fontSize,
                      color: isSelected ? '#fff' : it.color,
                    }}
                  />
                  {isSelected && (
                    <span
                      className="awt-dot-ring"
                      style={{ borderColor: it.color }}
                    />
                  )}
                </button>
              )
            })}

            {/* Year labels below dots */}
            {arcItems.map((it) => {
              if (!it) return null
              const { x, y } = getArcPos(it.offset)
              const isSelected = it.i === idx
              const ds = dotStyle(it.offset, isSelected)
              const cx = arcW / 2 + x
              const labelY = y + ds.size / 2 + 7

              return (
                <button
                  key={`lbl-${it.i}`}
                  className={`awt-year-label${isSelected ? ' awt-year-label-active' : ''}`}
                  style={{
                    left: `${cx}px`,
                    top: `${labelY}px`,
                    color: isSelected ? it.color : 'var(--text-tertiary)',
                    fontSize: isSelected ? '.72rem' : '.62rem',
                    fontWeight: isSelected ? 700 : 400,
                    opacity: Math.abs(it.offset) > 2 ? 0.5 : 1,
                  }}
                  onClick={() => go(it.i)}
                  tabIndex={-1}>
                  {it.short}
                </button>
              )
            })}
          </div>

          {/* Vertical connector from active dot to content */}
          <div className="awt-connector">
            <div className="awt-connector-line" style={{ background: item.color }} />
            <div className="awt-connector-dot" style={{ background: item.color, boxShadow: `0 0 0 4px ${item.color}22` }} />
          </div>

          {/* Detail card */}
          <div className="awt-detail-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="awt-detail-card"
                initial={{ opacity: 0, y: dir * 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: dir * -8 }}
                transition={{ duration: .32, ease: [.16, 1, .3, 1] }}>

                <div className="awt-detail-head">
                  {item.current && (
                    <span className="awt-badge awt-badge-cur">
                      <span className="awt-badge-dot" />
                      Current
                    </span>
                  )}
                  {item.upcoming && (
                    <span className="awt-badge awt-badge-up">Upcoming</span>
                  )}
                </div>

                <div className="awt-detail-main">
                  <div className="awt-detail-icon" style={{ background: `${item.color}18`, color: item.color }}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div>
                    <p className="awt-detail-period" style={{ color: item.color }}>{item.period}</p>
                    <h3 className="awt-detail-school">{item.school}</h3>
                    <p className="awt-detail-level" style={{ color: item.color }}>{item.level}</p>
                    <p className="awt-detail-desc">{item.desc}</p>
                  </div>
                </div>

                {/* Nav arrows */}
                <div className="awt-detail-nav">
                  <button
                    className="awt-nav-btn"
                    onClick={() => go(idx - 1)}
                    disabled={idx === 0}
                    aria-label="Previous">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <span className="awt-nav-pos">{idx + 1} / {N}</span>
                  <button
                    className="awt-nav-btn"
                    onClick={() => go(idx + 1)}
                    disabled={idx === N - 1}
                    aria-label="Next">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ──────────── MOBILE STRIP ──────────── */}
        <div className="awt-mobile-wrap">
          <div className="awt-mobile-strip" ref={mobileRef} role="list">
            {EDUCATION.map((ed, i) => (
              <button
                key={i}
                data-idx={i}
                role="listitem"
                className={`awt-mobile-dot-btn${i === idx ? ' awt-mob-active' : ''}`}
                style={{
                  '--mc': ed.color,
                  borderColor: i === idx ? ed.color : 'var(--border-color)',
                  background: i === idx ? ed.color : 'var(--bg-surface)',
                }}
                onClick={() => go(i)}>
                <FontAwesomeIcon
                  icon={ed.icon}
                  style={{ color: i === idx ? '#fff' : ed.color, fontSize: '.65rem' }}
                />
                <span
                  className="awt-mob-year"
                  style={{ color: i === idx ? ed.color : 'var(--text-tertiary)' }}>
                  {ed.short}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-${idx}`}
              className="awt-mob-detail card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: .28 }}>
              <div className="awt-mob-detail-head">
                <div className="awt-mob-icon" style={{ background: `${item.color}18`, color: item.color }}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div>
                  <p className="awt-mob-period" style={{ color: item.color }}>{item.period}</p>
                  {item.current && <span className="awt-badge awt-badge-cur" style={{ position: 'static', marginLeft: '.4rem' }}><span className="awt-badge-dot" />Current</span>}
                  {item.upcoming && <span className="awt-badge awt-badge-up" style={{ position: 'static', marginLeft: '.4rem' }}>Upcoming</span>}
                </div>
              </div>
              <h3 className="awt-mob-school">{item.school}</h3>
              <p className="awt-mob-level" style={{ color: item.color }}>{item.level}</p>
              <p className="awt-mob-desc">{item.desc}</p>

              <div className="awt-detail-nav" style={{ marginTop: '.75rem' }}>
                <button className="awt-nav-btn" onClick={() => go(idx - 1)} disabled={idx === 0}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <span className="awt-nav-pos">{idx + 1} / {N}</span>
                <button className="awt-nav-btn" onClick={() => go(idx + 1)} disabled={idx === N - 1}><FontAwesomeIcon icon={faChevronRight} /></button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        /* ── Header ── */
        .awt-head { text-align: center; margin-bottom: 2.5rem; }
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
          max-width: 420px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Wheel wrapper ── */
        .awt-wheel-wrap {
          display: flex; flex-direction: column; align-items: center;
        }

        /* Arc container */
        .awt-arc-container {
          position: relative;
          max-width: 100%;
        }

        .awt-arc-svg { pointer-events: none; }

        /* Dot buttons */
        .awt-dot-btn {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all .28s cubic-bezier(.16,1,.3,1);
          outline: none;
        }
        .awt-dot-btn:hover:not(.awt-dot-active) {
          opacity: 1 !important;
          transform: translate(-50%, -50%) scale(1.2);
        }

        /* Pulsing ring on active dot */
        .awt-dot-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid;
          animation: awt-ring 1.8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes awt-ring {
          0%, 100% { opacity: .6; transform: scale(1); }
          50%       { opacity: .1; transform: scale(1.5); }
        }

        /* Year labels */
        .awt-year-label {
          position: absolute;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          letter-spacing: .04em;
          background: none; border: none; cursor: pointer;
          transition: color .2s, font-size .2s;
          white-space: nowrap;
          pointer-events: auto;
          outline: none;
          padding: 2px 4px;
        }
        .awt-year-label-active { pointer-events: none; }

        /* Connector */
        .awt-connector {
          display: flex; flex-direction: column; align-items: center;
          gap: 0; margin-top: -1px;
        }
        .awt-connector-line {
          width: 2px; height: 48px;
          border-radius: 9999px;
          transition: background .3s;
        }
        .awt-connector-dot {
          width: 10px; height: 10px; border-radius: 50%;
          transition: background .3s, box-shadow .3s;
        }

        /* Detail card */
        .awt-detail-wrap { width: 100%; max-width: 520px; margin-top: 1.25rem; }
        .awt-detail-card {
          padding: 1.5rem 1.6rem;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 24px rgba(0,0,0,.07);
        }

        .awt-detail-head {
          display: flex; gap: .5rem; margin-bottom: .75rem; min-height: 18px;
        }
        .awt-detail-main {
          display: flex; gap: 1rem; align-items: flex-start;
        }
        .awt-detail-icon {
          width: 44px; height: 44px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0; margin-top: .1rem;
        }
        .awt-detail-period {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 700;
          letter-spacing: .04em; margin-bottom: .2rem;
        }
        .awt-detail-school {
          font-size: .96rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .2rem; line-height: 1.3;
        }
        .awt-detail-level {
          font-size: .8rem; font-weight: 600; margin-bottom: .5rem;
        }
        .awt-detail-desc {
          font-size: .82rem; color: var(--text-secondary); line-height: 1.7;
        }

        /* Badges */
        .awt-badge {
          display: inline-flex; align-items: center; gap: .28rem;
          font-size: .62rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; padding: .12rem .55rem; border-radius: 9999px;
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

        /* Nav */
        .awt-detail-nav {
          display: flex; align-items: center; gap: .75rem; margin-top: 1.1rem;
        }
        .awt-nav-btn {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; color: var(--text-secondary);
          cursor: pointer; transition: all .18s ease;
        }
        .awt-nav-btn:hover:not(:disabled) {
          background: var(--accent-light); color: var(--accent-primary);
          border-color: var(--accent-primary);
        }
        .awt-nav-btn:disabled { opacity: .35; cursor: not-allowed; }
        .awt-nav-pos {
          font-family: var(--font-mono); font-size: .72rem;
          color: var(--text-tertiary); flex: 1; text-align: center;
        }

        /* ── Mobile strip (hidden on desktop) ── */
        .awt-mobile-wrap { display: none; }

        @media (max-width: 639px) {
          /* Hide desktop wheel */
          .awt-wheel-wrap { display: none; }

          /* Show mobile */
          .awt-mobile-wrap { display: block; }

          .awt-mobile-strip {
            display: flex; gap: .6rem;
            overflow-x: auto; overflow-y: hidden;
            padding: .5rem .25rem 1rem;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .awt-mobile-strip::-webkit-scrollbar { display: none; }

          .awt-mobile-dot-btn {
            display: flex; flex-direction: column; align-items: center; gap: .35rem;
            flex-shrink: 0; scroll-snap-align: center;
            width: 52px;
            padding: .55rem .3rem;
            border-radius: var(--radius-lg);
            border: 1.5px solid;
            cursor: pointer;
            transition: all .22s ease;
            outline: none;
          }
          .awt-mob-year {
            font-family: var(--font-mono); font-size: .62rem; font-weight: 600;
            transition: color .2s;
            white-space: nowrap;
          }

          .awt-mob-detail { padding: 1.2rem; }
          .awt-mob-detail-head {
            display: flex; align-items: center; gap: .7rem; margin-bottom: .65rem;
          }
          .awt-mob-icon {
            width: 38px; height: 38px; border-radius: var(--radius-md);
            display: flex; align-items: center; justify-content: center;
            font-size: .9rem; flex-shrink: 0;
          }
          .awt-mob-period {
            font-family: var(--font-mono); font-size: .7rem; font-weight: 700;
          }
          .awt-mob-school {
            font-size: .88rem; font-weight: 700; color: var(--text-primary);
            margin-bottom: .2rem;
          }
          .awt-mob-level { font-size: .78rem; font-weight: 600; margin-bottom: .4rem; }
          .awt-mob-desc  { font-size: .8rem; color: var(--text-secondary); line-height: 1.7; }
        }

        /* Tablet: shrink arc */
        @media (min-width: 640px) and (max-width: 780px) {
          .awt-arc-container { transform: scale(0.8); transform-origin: center top; }
          .awt-connector { margin-top: -48px; }
        }
      `}</style>
    </section>
  )
}
