// ============================================================
// AboutTimeline.jsx — v2.3.4
// COMPLETE REDESIGN — interactive wheel / arc timeline
// Desktop: SVG arc with 8 nodes; click to select; content below
// Mobile: horizontal pill selector + animated card
// Inspired by: codepen.io/cbolson/pen/vEBWwxL
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSchool, faBook, faFlask, faGraduationCap,
  faTrophy, faRocket, faAtom, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

// ── Education data ──────────────────────────────────────────
const EDU = [
  { period:'2013–14', school:'St. Geroza School, Saidpur',          level:'Nursery & KG',               desc:'First steps in formal education — where curiosity and wonder first took root.',           color:'#10B981', icon:faSchool },
  { period:'2015–17', school:'St. Geroza School, Saidpur',          level:'Class 1, 2 & 3',             desc:'Primary years. Grew a love for reading and began asking how everything works.',          color:'#3B82F6', icon:faBook   },
  { period:'2018–19', school:'Tulshiram Govt. Primary School',       level:'Class 4 & 5',                desc:'Completed primary cycle. Science became a favourite — seeds of engineering thinking.',   color:'#8B5CF6', icon:faFlask  },
  { period:'2020',    school:'Lions School & College, Saidpur',      level:'Class 6',                    desc:'Brief enrolment before transitioning to a science-focused institution.',                color:'#F59E0B', icon:faGraduationCap },
  { period:'2021–25', school:'Saidpur Govt. Science College (SGSC)', level:'Class 6 – 10',               desc:'Science group, five years. Discovered programming and web development — changed everything.', color:'#EC4899', icon:faSchool },
  { period:'2026',    school:'Saidpur Govt. Science College (SGSC)', level:'SSC-26 Batch',               desc:'SSC exams completed (mid-2026). A milestone — now moving forward to HSC and beyond.',   color:'#3B82F6', icon:faTrophy, current:true },
  { period:'Soon',    school:'Higher Secondary (HSC)',               level:'Science Group',              desc:'Next academic goal after SSC results — aiming for HSC with science stream.',            color:'#06B6D4', icon:faRocket, upcoming:true },
  { period:'Dream',   school:'BSc — Computer Science & Engineering', level:'University Degree',          desc:'Long-term goal: a CSE degree to become a professional full-stack developer.',           color:'#22C55E', icon:faAtom,   upcoming:true },
]

// ── Arc maths ────────────────────────────────────────────────
// SVG: 800 × 360, circle centre at (400, 540), radius 440
// Arc spans 218° → 322° (clockwise through 270° = top)
const SVG_W = 800, SVG_H = 360
const CX = 400, CY = 540, R = 440
const ARC_START = 218, ARC_RANGE = 104

function toPx(idx) {
  const deg = ARC_START + (idx / (EDU.length - 1)) * ARC_RANGE
  const rad = (deg * Math.PI) / 180
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad), deg }
}

// Build SVG arc "d" attribute from item 0 to item N-1
const p0 = toPx(0), pN = toPx(EDU.length - 1)
const ARC_PATH = `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${R} ${R} 0 0 1 ${pN.x.toFixed(1)} ${pN.y.toFixed(1)}`

// ── Label anchor helper ───────────────────────────────────────
function labelAnchor(x) {
  if (x < 250) return 'end'
  if (x > 550) return 'start'
  return 'middle'
}
function labelOffset(x, y) {
  // Left side: shift label left; right side: right; top: above
  const dx = x < 250 ? -10 : x > 550 ? 10 : 0
  const dy = y < 180 ? -18 : -16
  return { dx, dy }
}

// ── SVG Arc component ────────────────────────────────────────
function ArcWheel({ selected, onSelect }) {
  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="abt-arc-svg"
      role="group"
      aria-label="Education timeline arc"
    >
      {/* Background arc track */}
      <path d={ARC_PATH} stroke="var(--border-strong)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity=".5" />

      {EDU.map((item, i) => {
        const { x, y } = toPx(i)
        const active = selected === i
        const { dx, dy } = labelOffset(x, y)
        const anchor = labelAnchor(x)

        return (
          <g key={i} style={{ cursor:'pointer' }} onClick={() => onSelect(i)} role="button" aria-label={item.period}>

            {/* Connector line — only for active */}
            {active && (
              <line
                x1={x} y1={y + (active ? 12 : 8)}
                x2={CX} y2={SVG_H - 10}
                stroke={item.color}
                strokeWidth="1.5"
                strokeDasharray="5 3"
                opacity=".7"
              />
            )}

            {/* Dot glow ring — active only */}
            {active && (
              <circle cx={x} cy={y} r="18"
                fill={item.color} opacity=".1"
                style={{ transition:'all .35s' }} />
            )}

            {/* Main dot */}
            <circle
              cx={x} cy={y}
              r={active ? 10 : 6}
              fill={active ? item.color : 'var(--bg-surface-2)'}
              stroke={active ? item.color : 'var(--border-strong)'}
              strokeWidth={active ? 2 : 1.5}
              style={{ transition:'all .3s ease' }}
            />

            {/* Inner icon dot (active) */}
            {active && (
              <circle cx={x} cy={y} r="4" fill="#fff" opacity=".9" />
            )}

            {/* Label */}
            <text
              x={x + dx} y={y + dy}
              textAnchor={anchor}
              fontSize={active ? 12 : 9.5}
              fontWeight={active ? '700' : '500'}
              fill={active ? item.color : 'var(--text-tertiary, #64748b)'}
              fontFamily="DM Mono, monospace"
              style={{ transition:'all .3s ease', userSelect:'none', pointerEvents:'none' }}
            >
              {item.period}
            </text>
          </g>
        )
      })}

      {/* Bottom indicator dot */}
      <circle cx={CX} cy={SVG_H - 8} r="4" fill="var(--accent-primary)" opacity=".6" />
    </svg>
  )
}

// ── Content card ─────────────────────────────────────────────
function ContentCard({ item, dir }) {
  return (
    <motion.div
      key={item.period + item.school}
      className="abt-card"
      initial={{ opacity:0, y: dir > 0 ? 14 : -14, scale:.98 }}
      animate={{ opacity:1, y:0, scale:1 }}
      exit={{ opacity:0, y: dir > 0 ? -14 : 14, scale:.98 }}
      transition={{ duration:.3, ease:[.16,1,.3,1] }}
      style={{ '--card-clr': item.color }}>

      {/* Status badge */}
      {item.current && (
        <span className="abt-badge abt-badge-cur">
          <span className="abt-badge-dot" /> Current
        </span>
      )}
      {item.upcoming && (
        <span className="abt-badge abt-badge-up">Upcoming</span>
      )}

      {/* Icon + period */}
      <div className="abt-card-top">
        <div className="abt-card-icon" style={{ background:`${item.color}18`, color:item.color }}>
          <FontAwesomeIcon icon={item.icon} />
        </div>
        <span className="abt-card-period" style={{ color:item.color, borderColor:`${item.color}30`, background:`${item.color}0d` }}>
          {item.period}
        </span>
      </div>

      <p className="abt-card-school">{item.school}</p>
      <p className="abt-card-level" style={{ color:item.color }}>{item.level}</p>
      <p className="abt-card-desc">{item.desc}</p>

      {/* Progress line */}
      <div className="abt-card-progress">
        {EDU.map((_, k) => (
          <span key={k} className="abt-prog-dot"
            style={{ background: k <= EDU.indexOf(item) ? item.color : 'var(--border-strong)' }} />
        ))}
      </div>
    </motion.div>
  )
}

// ── Mobile pill selector ──────────────────────────────────────
function MobilePills({ selected, onSelect }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current.children[selected]
    el?.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' })
  }, [selected])

  return (
    <div ref={ref} className="abt-pills">
      {EDU.map((item, i) => (
        <button
          key={i}
          className={`abt-pill${selected === i ? ' abt-pill-active' : ''}`}
          style={selected === i ? { background:item.color, borderColor:item.color } : {}}
          onClick={() => onSelect(i)}
          aria-current={selected === i}>
          {item.period}
        </button>
      ))}
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────
export default function AboutTimeline() {
  const [selected, setSelected] = useState(5) // default: SSC-26 (current)
  const prevRef = useRef(selected)
  const dir = selected > prevRef.current ? 1 : -1

  function pick(i) {
    prevRef.current = selected
    setSelected(i)
  }

  return (
    <section className="section section-alt" id="about-education">
      <div className="container-xl">

        {/* Header */}
        <motion.div className="abt-hd"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.1 }}>
          <p className="abt-lbl">Education</p>
          <h2 className="abt-h2">
            Academic <span className="abt-accent">Journey</span>
          </h2>
          <p className="abt-sub">From first steps to a lifelong pursuit of knowledge.</p>
        </motion.div>

        {/* ── Desktop: SVG arc ── */}
        <div className="abt-desktop">
          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ duration:.6 }}>
            <ArcWheel selected={selected} onSelect={pick} />
          </motion.div>

          <div className="abt-content-area">
            <AnimatePresence mode="wait">
              <ContentCard key={selected} item={EDU[selected]} dir={dir} />
            </AnimatePresence>

            {/* Nav arrows */}
            <div className="abt-nav-arrows">
              <button
                className="abt-arrow-btn"
                onClick={() => pick(Math.max(0, selected - 1))}
                disabled={selected === 0}
                aria-label="Previous">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span className="abt-nav-count">
                {selected + 1} / {EDU.length}
              </span>
              <button
                className="abt-arrow-btn"
                onClick={() => pick(Math.min(EDU.length - 1, selected + 1))}
                disabled={selected === EDU.length - 1}
                aria-label="Next">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile: pills + card ── */}
        <div className="abt-mobile">
          <MobilePills selected={selected} onSelect={pick} />
          <div className="abt-mobile-card-wrap">
            <AnimatePresence mode="wait">
              <ContentCard key={selected + '-m'} item={EDU[selected]} dir={dir} />
            </AnimatePresence>
          </div>
          <div className="abt-mob-nav">
            <button className="abt-arrow-btn" onClick={() => pick(Math.max(0, selected - 1))} disabled={selected === 0}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="abt-nav-count">{selected + 1} / {EDU.length}</span>
            <button className="abt-arrow-btn" onClick={() => pick(Math.min(EDU.length - 1, selected + 1))} disabled={selected === EDU.length - 1}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        /* Header */
        .abt-hd { text-align: center; margin-bottom: 2.5rem; }
        .abt-lbl {
          display: block; font-family: var(--font-mono); font-size: .72rem;
          font-weight: 600; text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
        }
        .abt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abt-accent { color: var(--accent-primary); }
        .abt-sub {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 420px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Desktop arc layout ── */
        .abt-desktop { display: none; }
        @media (min-width: 700px) {
          .abt-desktop { display: block; }
          .abt-mobile  { display: none; }
        }

        .abt-arc-svg {
          width: 100%; height: auto;
          display: block; overflow: visible;
          cursor: default;
        }

        .abt-content-area {
          display: flex; flex-direction: column; align-items: center;
          margin-top: -1.5rem; /* pull card up under the arc */
          padding: 0 1rem;
        }

        /* ── Content card ── */
        .abt-card {
          position: relative; width: 100%; max-width: 520px;
          padding: 1.5rem 1.6rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: 0 4px 24px rgba(0,0,0,.1);
          border-top: 2px solid var(--card-clr, var(--accent-primary));
        }
        .abt-card-top {
          display: flex; align-items: center; gap: .7rem; margin-bottom: .85rem;
        }
        .abt-card-icon {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .78rem; flex-shrink: 0;
        }
        .abt-card-period {
          font-size: .7rem; font-weight: 700; font-family: var(--font-mono);
          padding: .2rem .6rem; border-radius: 9999px; border: 1px solid;
          white-space: nowrap;
        }
        .abt-card-school {
          font-size: .9rem; font-weight: 700; color: var(--text-primary);
          line-height: 1.3; margin-bottom: .2rem;
        }
        .abt-card-level {
          font-size: .8rem; font-weight: 600; margin-bottom: .6rem;
        }
        .abt-card-desc {
          font-size: .82rem; color: var(--text-secondary);
          line-height: 1.68; margin-bottom: 1rem;
        }

        /* Progress dots */
        .abt-card-progress {
          display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
        }
        .abt-prog-dot {
          width: 6px; height: 6px; border-radius: 50%;
          transition: background .35s;
        }

        /* Status badges */
        .abt-badge {
          position: absolute; top: -11px;
          font-size: .62rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; padding: .1rem .55rem;
          border-radius: 9999px;
        }
        .abt-badge-cur {
          right: 1rem;
          display: inline-flex; align-items: center; gap: .28rem;
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
        }
        .abt-badge-up {
          left: 1rem;
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        .abt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-primary);
          animation: abt-pulse 1.5s ease-in-out infinite;
        }
        @keyframes abt-pulse {
          0%,100% { opacity:.8; transform:scale(1); }
          50%      { opacity:.3; transform:scale(1.5); }
        }

        /* Nav arrows */
        .abt-nav-arrows, .abt-mob-nav {
          display: flex; align-items: center; gap: .75rem; margin-top: 1.1rem;
        }
        .abt-arrow-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); font-size: .78rem;
          cursor: pointer; transition: all .18s;
        }
        .abt-arrow-btn:hover:not(:disabled) {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }
        .abt-arrow-btn:disabled { opacity: .32; cursor: not-allowed; }
        .abt-nav-count {
          font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono); min-width: 40px; text-align: center;
        }

        /* ── Mobile layout ── */
        .abt-mobile { display: block; }
        @media (min-width: 700px) {
          .abt-mobile { display: none; }
        }

        /* Mobile pills */
        .abt-pills {
          display: flex; gap: .4rem;
          overflow-x: auto; overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: .25rem .25rem .5rem;
          scrollbar-width: none;
          margin-bottom: 1.25rem;
        }
        .abt-pills::-webkit-scrollbar { display: none; }
        .abt-pill {
          flex-shrink: 0;
          scroll-snap-align: start;
          padding: .35rem .75rem;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--border-color);
          background: var(--bg-surface);
          font-size: .72rem; font-weight: 600;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          cursor: pointer; transition: all .18s;
          white-space: nowrap;
        }
        .abt-pill:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .abt-pill-active { color: #fff !important; }

        .abt-mobile-card-wrap {
          position: relative; min-height: 240px;
        }
        .abt-mobile-card-wrap .abt-card { max-width: 100%; }

        .abt-mob-nav { justify-content: center; }

        /* Light theme arc text */
        [data-theme=light] .abt-arc-svg text[fill="var(--text-tertiary, #64748b)"] {
          fill: #94a3b8;
        }
      `}</style>
    </section>
  )
}
