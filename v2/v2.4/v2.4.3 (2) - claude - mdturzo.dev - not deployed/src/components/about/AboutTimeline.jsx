// ============================================================
// AboutTimeline.jsx — v2.3.5
// FULL REDESIGN:
//   * ALL N items rendered with fixed keys → framer-motion
//     animates every dot position on idx change (true arc rotation)
//   * Wider arc: RADIUS 320, arcW up to 860px (responsive)
//   * Short year labels: "2015-17"; hover title: "2015 - 2017"
//   * Minimal detail card; side-nav arrows flanking the card
//   * Mobile: same arc at responsive scale (useWindowSize)
// ============================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faSchool, faTrophy,
  faRocket, faAtom, faBook, faFlask,
  faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  {
    period: '2013–2014', short: '2013-14', hover: '2013 - 2014',
    school: 'St. Geroza School, Saidpur', level: 'Nursery & KG',
    desc: 'First steps in formal education. Curiosity and wonder began here.',
    color: '#10B981', icon: faSchool,
  },
  {
    period: '2015–2017', short: '2015-17', hover: '2015 - 2017',
    school: 'St. Geroza School, Saidpur', level: 'Class 1, 2 & 3',
    desc: 'Primary years — grew a love for reading and understanding how things work.',
    color: '#3B82F6', icon: faBook,
  },
  {
    period: '2018–2019', short: '2018-19', hover: '2018 - 2019',
    school: 'Tulshiram Govt. Primary School', level: 'Class 4 & 5',
    desc: 'Completed primary cycle. Science became a favourite subject.',
    color: '#8B5CF6', icon: faFlask,
  },
  {
    period: '2020', short: '2020', hover: '2020',
    school: 'Lions School & College, Saidpur', level: 'Class 6',
    desc: 'Brief enrollment before transitioning to SGSC for better facilities.',
    color: '#F59E0B', icon: faGraduationCap,
  },
  {
    period: '2021–2025', short: '2021-25', hover: '2021 - 2025',
    school: 'Saidpur Govt. Science College (SGSC)', level: 'Class 6 – 10',
    desc: 'Science group. Deepened passion for programming and web development.',
    color: '#EC4899', icon: faSchool,
  },
  {
    period: '2026', short: '2026', hover: '2026',
    school: 'Saidpur Govt. Science College (SGSC)', level: 'SSC-26 Batch',
    desc: 'SSC exams in progress (mid-2026). Results expected: mid-2026. Next: HSC.',
    color: '#3B82F6', icon: faTrophy, current: true,
  },
  {
    period: 'Next', short: 'HSC', hover: 'Higher Secondary',
    school: 'Higher Secondary (HSC)', level: 'Science Group — After SSC',
    desc: 'Aiming for Higher Secondary Certificate with Science group after SSC results.',
    color: '#06B6D4', icon: faRocket, upcoming: true,
  },
  {
    period: 'Dream', short: 'CSE', hover: 'Computer Science & Engineering',
    school: 'University (Dream Institution)', level: 'BSc in CS & Engineering',
    desc: 'Long-term goal — a CSE degree to become a professional full-stack developer.',
    color: '#22C55E', icon: faAtom, upcoming: true,
  },
]

const N = EDUCATION.length
const DEFAULT_IDX = 5

// ── Responsive arc constants ────────────────────────────────
function getArcConfig(vw) {
  if (vw < 480) {
    return { RADIUS: 148, MAX_ANGLE: 55, MAX_OFFSET: 2, arcW: Math.min(vw - 24, 420) }
  }
  if (vw < 640) {
    return { RADIUS: 170, MAX_ANGLE: 57, MAX_OFFSET: 2, arcW: Math.min(vw - 24, 500) }
  }
  if (vw < 900) {
    return { RADIUS: 240, MAX_ANGLE: 60, MAX_OFFSET: 3, arcW: Math.min(vw - 48, 680) }
  }
  return { RADIUS: 320, MAX_ANGLE: 62, MAX_OFFSET: 3, arcW: 860 }
}

// Position of a dot at angular offset from center of arc
// NOTE: NO clamping here — off-screen dots keep their natural extended arc position
// so framer-motion animates them in/out along the arc path, not from a stacked edge point.
function getArcPos(offset, RADIUS, MAX_ANGLE, MAX_OFFSET) {
  const angle = (offset / MAX_OFFSET) * MAX_ANGLE
  const rad = ((angle - 90) * Math.PI) / 180
  const x = RADIUS * Math.cos(rad)
  const y = RADIUS + RADIUS * Math.sin(rad)
  return { x, y }
}

// Dot visual size & opacity by distance from center
function getDotProps(offset, isSelected, MAX_OFFSET) {
  const abs = Math.abs(offset)
  const sizes     = [38, 26, 20, 15]
  const opacities = [1, 0.78, 0.52, 0.28]
  const si = Math.min(abs, MAX_OFFSET)
  return {
    size:    isSelected ? 38 : (sizes[si] ?? 14),
    opacity: isSelected ? 1  : (abs > MAX_OFFSET ? 0 : (opacities[si] ?? 0)),
  }
}

// Spring: snappy enough to feel like a physical arc rotation
const SPRING = { type: 'spring', stiffness: 300, damping: 30, mass: 0.85 }

export default function AboutTimeline() {
  const [idx, setIdx] = useState(DEFAULT_IDX)
  const [dir, setDir] = useState(0)
  const [vw, setVw]   = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { RADIUS, MAX_ANGLE, MAX_OFFSET, arcW } = getArcConfig(vw)
  const arcH = Math.round(RADIUS * (1 - Math.cos((MAX_ANGLE * Math.PI) / 180))) + 56

  const go = (newIdx) => {
    if (newIdx < 0 || newIdx >= N) return
    setDir(newIdx > idx ? 1 : -1)
    setIdx(newIdx)
  }

  const item = EDUCATION[idx]

  return (
    <section className="section" id="about-education">
      <div className="container-xl">

        {/* Header */}
        <motion.div className="awt-head"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}>
          <p className="awt-label">Education</p>
          <h2 className="awt-h2">Academic <span className="awt-accent">Timeline</span></h2>
          <p className="awt-sub">From nursery to the dream of CSE — the full journey.</p>
        </motion.div>

        {/* ── Arc Wheel ── */}
        <div className="awt-wheel-wrap">

          {/* Arc SVG guide */}
          <div className="awt-arc-outer" style={{ width: arcW, height: arcH }}>
            <svg
              className="awt-arc-svg"
              width={arcW} height={arcH}
              style={{ position: 'absolute', inset: 0 }}>
              {/* Dashed arc path from left endpoint to right endpoint */}
              <path
                d={`
                  M ${arcW / 2 + RADIUS * Math.cos(((-MAX_ANGLE - 90) * Math.PI) / 180)}
                    ${RADIUS + RADIUS * Math.sin(((-MAX_ANGLE - 90) * Math.PI) / 180)}
                  A ${RADIUS} ${RADIUS} 0 0 1
                    ${arcW / 2 + RADIUS * Math.cos(((MAX_ANGLE - 90) * Math.PI) / 180)}
                    ${RADIUS + RADIUS * Math.sin(((MAX_ANGLE - 90) * Math.PI) / 180)}
                `}
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                strokeLinecap="round"
              />
            </svg>

            {/* ALL items rendered with fixed keys → smooth framer-motion interpolation */}
            {EDUCATION.map((ed, i) => {
              const offset     = i - idx
              const isVisible  = Math.abs(offset) <= MAX_OFFSET
              const isSelected = i === idx
              const { x, y }   = getArcPos(offset, RADIUS, MAX_ANGLE, MAX_OFFSET)
              const cx         = arcW / 2 + x
              const dp         = getDotProps(offset, isSelected, MAX_OFFSET)

              return (
                <motion.button
                  key={i}
                  className={`awt-dot-btn${isSelected ? ' awt-dot-active' : ''}`}
                  animate={{
                    left:    cx,
                    top:     y,
                    width:   dp.size,
                    height:  dp.size,
                    opacity: isVisible ? dp.opacity : 0,
                  }}
                  transition={SPRING}
                  style={{
                    background:  isSelected ? ed.color : 'var(--bg-surface)',
                    borderColor: isSelected ? ed.color : 'var(--border-strong)',
                    boxShadow:   isSelected
                      ? `0 0 0 5px ${ed.color}28, 0 0 22px ${ed.color}44`
                      : 'none',
                    zIndex:        isSelected ? 10 : 5,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    cursor:        'pointer',
                  }}
                  onClick={() => go(i)}
                  title={ed.hover}
                  aria-label={ed.hover}
                  tabIndex={isVisible ? 0 : -1}>

                  <motion.span
                    animate={{ fontSize: isSelected ? '0.6rem' : `${Math.max(0.42, 0.55 - Math.abs(offset) * 0.05)}rem` }}
                    transition={SPRING}
                    style={{ color: isSelected ? '#fff' : ed.color, display: 'flex', lineHeight: 1 }}>
                    <FontAwesomeIcon icon={ed.icon} />
                  </motion.span>

                  {isSelected && (
                    <span className="awt-dot-ring" style={{ borderColor: ed.color }} />
                  )}
                </motion.button>
              )
            })}

            {/* Year labels — also animated with fixed keys */}
            {EDUCATION.map((ed, i) => {
              const offset     = i - idx
              const isVisible  = Math.abs(offset) <= MAX_OFFSET
              const isSelected = i === idx
              const { x, y }   = getArcPos(offset, RADIUS, MAX_ANGLE, MAX_OFFSET)
              const cx         = arcW / 2 + x
              const dp         = getDotProps(offset, isSelected, MAX_OFFSET)
              const labelY     = y + dp.size / 2 + 9

              return (
                <motion.button
                  key={`lbl-${i}`}
                  className={`awt-year-lbl${isSelected ? ' awt-year-lbl-active' : ''}`}
                  animate={{
                    left:     cx,
                    top:      labelY,
                    opacity:  isVisible ? (Math.abs(offset) > MAX_OFFSET - 1 ? 0.45 : 1) : 0,
                    fontSize: isSelected ? '0.72rem' : '0.6rem',
                    fontWeight: isSelected ? 700 : 400,
                  }}
                  transition={SPRING}
                  style={{ color: isSelected ? ed.color : 'var(--text-tertiary)', pointerEvents: isVisible ? 'auto' : 'none' }}
                  onClick={() => go(i)}
                  title={ed.hover}
                  tabIndex={-1}>
                  {ed.short}
                </motion.button>
              )
            })}
          </div>

          {/* Connector */}
          <div className="awt-connector">
            <motion.div
              className="awt-connector-line"
              animate={{ background: item.color }}
              transition={{ duration: 0.3 }} />
            <motion.div
              className="awt-connector-dot"
              animate={{
                background:  item.color,
                boxShadow:  `0 0 0 4px ${item.color}28`,
              }}
              transition={{ duration: 0.3 }} />
          </div>

          {/* Card + side-nav arrows */}
          <div className="awt-card-area">

            <button
              className="awt-side-nav awt-side-nav-prev"
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              aria-label="Previous"
              data-click-fx>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="awt-detail-card"
                initial={{ opacity: 0, y: dir * 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: dir * -8, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>

                {/* Top row: icon + period + badge */}
                <div className="awt-card-top">
                  <div className="awt-card-icon"
                    style={{ background: `${item.color}18`, color: item.color }}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div className="awt-card-meta">
                    <span className="awt-card-period" style={{ color: item.color }}>
                      {item.period}
                    </span>
                    <span className="awt-card-level">{item.level}</span>
                  </div>
                  {item.current && (
                    <span className="awt-badge awt-badge-cur">
                      <span className="awt-badge-dot" />Current
                    </span>
                  )}
                  {item.upcoming && (
                    <span className="awt-badge awt-badge-up">Upcoming</span>
                  )}
                </div>

                <h3 className="awt-card-school">{item.school}</h3>
                <p className="awt-card-desc">{item.desc}</p>

                {/* Position counter */}
                <p className="awt-card-pos">{idx + 1} <span>/</span> {N}</p>
              </motion.div>
            </AnimatePresence>

            <button
              className="awt-side-nav awt-side-nav-next"
              onClick={() => go(idx + 1)}
              disabled={idx === N - 1}
              aria-label="Next"
              data-click-fx>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Header ─────────────────────────────────────────── */
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

        /* ── Wheel wrapper ───────────────────────────────────── */
        .awt-wheel-wrap {
          display: flex; flex-direction: column; align-items: center;
        }

        /* Arc outer — clips nothing, holds absolute dots */
        .awt-arc-outer {
          position: relative; flex-shrink: 0;
          max-width: 100%;
        }
        .awt-arc-svg { pointer-events: none; }

        /* ── Dot buttons ─────────────────────────────────────── */
        .awt-dot-btn {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          outline: none;
          transition: box-shadow .25s ease, border-color .25s ease;
        }
        .awt-dot-btn:hover:not(.awt-dot-active) {
          opacity: 1 !important;
          filter: brightness(1.15);
        }
        .awt-dot-active { pointer-events: none; }

        /* Pulsing ring on active */
        .awt-dot-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 1.5px solid; pointer-events: none;
          animation: awt-ring 2s ease-in-out infinite;
        }
        @keyframes awt-ring {
          0%,100% { opacity: .55; transform: scale(1); }
          50%      { opacity: .08; transform: scale(1.6); }
        }

        /* ── Year labels ─────────────────────────────────────── */
        .awt-year-lbl {
          position: absolute; transform: translateX(-50%);
          font-family: var(--font-mono); letter-spacing: .04em;
          background: none; border: none; cursor: pointer;
          white-space: nowrap; padding: 2px 4px; outline: none;
          transition: color .2s;
          line-height: 1;
        }
        .awt-year-lbl-active { pointer-events: none; }

        /* ── Connector ───────────────────────────────────────── */
        .awt-connector {
          display: flex; flex-direction: column; align-items: center;
          margin-top: -2px;
        }
        .awt-connector-line {
          width: 2px; height: 44px; border-radius: 99px;
        }
        .awt-connector-dot {
          width: 9px; height: 9px; border-radius: 50%;
          margin-top: -1px;
        }

        /* ── Card area with side nav ─────────────────────────── */
        .awt-card-area {
          display: flex; align-items: center;
          gap: .75rem;
          width: 100%; max-width: 620px;
          margin-top: 1rem;
          padding: 0 .25rem;
        }

        /* Side nav buttons */
        .awt-side-nav {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-secondary);
          display: flex; align-items: center; justify-content: center;
          font-size: .72rem;
          cursor: pointer;
          transition: all .18s ease;
          position: relative; overflow: hidden;
        }
        .awt-side-nav:hover:not(:disabled) {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: scale(1.08);
        }
        .awt-side-nav:disabled {
          opacity: .28; cursor: not-allowed;
        }

        /* ── Detail card ─────────────────────────────────────── */
        .awt-detail-card {
          flex: 1; min-width: 0;
          padding: 1.1rem 1.25rem;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 20px rgba(0,0,0,.07);
        }

        .awt-card-top {
          display: flex; align-items: center; gap: .6rem;
          margin-bottom: .65rem; flex-wrap: wrap;
        }
        .awt-card-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem;
        }
        .awt-card-meta {
          display: flex; flex-direction: column; gap: .08rem; flex: 1; min-width: 0;
        }
        .awt-card-period {
          font-family: var(--font-mono); font-size: .68rem; font-weight: 700;
          letter-spacing: .04em;
        }
        .awt-card-level {
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .awt-card-school {
          font-size: .9rem; font-weight: 700; color: var(--text-primary);
          line-height: 1.3; margin-bottom: .4rem;
        }
        .awt-card-desc {
          font-size: .8rem; color: var(--text-secondary); line-height: 1.7;
          margin: 0;
        }
        .awt-card-pos {
          font-family: var(--font-mono); font-size: .62rem;
          color: var(--text-tertiary); margin-top: .7rem; margin-bottom: 0;
          text-align: right;
        }
        .awt-card-pos span { opacity: .45; }

        /* ── Badges ──────────────────────────────────────────── */
        .awt-badge {
          display: inline-flex; align-items: center; gap: .25rem;
          font-size: .58rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; padding: .1rem .5rem; border-radius: 9999px;
          flex-shrink: 0;
        }
        .awt-badge-cur {
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.22);
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

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width: 639px) {
          .awt-card-area { gap: .5rem; max-width: 100%; }
          .awt-side-nav  { width: 32px; height: 32px; font-size: .65rem; }
          .awt-detail-card { padding: .9rem 1rem; }
          .awt-card-school { font-size: .82rem; }
          .awt-card-desc   { font-size: .76rem; }
          .awt-connector-line { height: 32px; }
        }
        @media (max-width: 479px) {
          .awt-side-nav { width: 28px; height: 28px; font-size: .6rem; }
          .awt-connector-line { height: 24px; }
        }
      `}</style>
    </section>
  )
}
