// ============================================================
// AboutTimeline.jsx — v2.3.2
// Education Timeline section.
// Improvements:
//   - Scroll-driven dot coloring (active = colored, past = muted)
//   - Smaller icon dots using FontAwesome icons
//   - Mobile layout fixed
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSchool, faBook, faGraduationCap, faFlask, faTrophy, faCode,
} from '@fortawesome/free-solid-svg-icons'
import { EDUCATION, fadeUp, stagger } from './aboutData.js'

// Map icon per entry (add icons alongside EDUCATION data here)
const EDU_ICONS = [faSchool, faBook, faBook, faGraduationCap, faFlask, faTrophy]

function SectionLabel({ text }) {
  return <p className="abt-label">{text}</p>
}

function EduCard({ item }) {
  return (
    <div className={`abt-card card${item.current ? ' abt-card-current' : ''}`}>
      <div className="abt-card-top">
        <div>
          <p className="abt-school">{item.school}</p>
          <p className="abt-level" style={{ color: item.color }}>{item.level}</p>
        </div>
        <div className="abt-card-meta">
          <span className="abt-period">{item.period}</span>
          {item.current && (
            <span className="abt-badge" style={{
              color: item.color,
              background: `${item.color}18`,
              border: `1px solid ${item.color}33`
            }}>
              <span className="abt-badge-dot" style={{ background: item.color }} />
              Current
            </span>
          )}
        </div>
      </div>
      <p className="abt-desc">{item.desc}</p>
    </div>
  )
}

function EduItem({ item, index, activeCount }) {
  const ref = useRef(null)
  const isLeft = index % 2 === 0
  const isActive = index < activeCount  // scrolled past this dot

  return (
    <motion.div
      ref={ref}
      className="abt-item"
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: .5, ease: [.16, 1, .3, 1], delay: index * .06 }}
      data-side={isLeft ? 'left' : 'right'}
    >
      {/* PC left slot */}
      <div className="abt-slot abt-slot-left">
        {isLeft && <EduCard item={item} />}
      </div>

      {/* Center dot */}
      <div className="abt-dot-wrap">
        <div
          className={`abt-dot${isActive ? ' abt-dot-active' : ''}`}
          style={{
            borderColor: isActive ? item.color : 'var(--border-strong)',
            background:   isActive
              ? (item.current ? item.color : `${item.color}22`)
              : 'var(--bg-page)',
          }}
        >
          <FontAwesomeIcon
            icon={EDU_ICONS[index] ?? faCode}
            className="abt-dot-icon"
            style={{ color: isActive ? (item.current ? '#fff' : item.color) : 'var(--text-tertiary)' }}
          />
          {item.current && isActive && (
            <span className="abt-dot-pulse" style={{ background: item.color }} />
          )}
        </div>
      </div>

      {/* PC right slot */}
      <div className="abt-slot abt-slot-right">
        {!isLeft && <EduCard item={item} />}
      </div>

      {/* Mobile-only slot */}
      <div className="abt-slot-mobile">
        <EduCard item={item} />
      </div>
    </motion.div>
  )
}

export default function AboutTimeline() {
  const tlRef  = useRef(null)
  const wrapRef = useRef(null)
  const [lineProgress, setLineProgress] = useState(0)

  // Scroll-driven line + dot coloring
  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const vh   = window.innerHeight
      const prog = Math.max(0, Math.min(1, (vh * 0.72 - rect.top) / (rect.height * 0.88)))
      setLineProgress(prog)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // How many dots are "active" based on scroll progress
  const N = EDUCATION.length
  const activeCount = Math.round(lineProgress * (N + 0.4))

  return (
    <section className="section" id="about-education">
      <div className="container-xl">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>
          <motion.div variants={fadeUp} className="abt-head">
            <SectionLabel text="Education" />
            <h2 className="abt-h2">
              Academic <span className="abt-accent">Timeline</span>
            </h2>
            <p className="abt-sub">From nursery to the dream of CSE — the full journey.</p>
          </motion.div>
        </motion.div>

        <div className="abt-outer" ref={wrapRef}>
          {/* Muted background line */}
          <div className="abt-line-bg" />
          {/* Animated active line */}
          <div className="abt-line-active" style={{ height: `${lineProgress * 100}%` }} />

          {EDUCATION.map((item, i) => (
            <EduItem key={i} item={item} index={i} activeCount={activeCount} />
          ))}
        </div>
      </div>

      <style>{`
        /* Section head */
        .abt-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .abt-head { text-align: center; margin-bottom: 3rem; }
        .abt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .abt-accent { color: var(--accent-primary); }
        .abt-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Outer wrapper */
        .abt-outer {
          position: relative; max-width: 860px; margin: 0 auto;
          padding-top: .5rem; padding-bottom: 1rem;
        }

        /* Center line */
        .abt-line-bg, .abt-line-active {
          position: absolute; left: 50%; top: 0;
          transform: translateX(-50%);
          width: 2px; pointer-events: none;
        }
        .abt-line-bg {
          bottom: 0;
          background: var(--border-color); opacity: .5;
        }
        .abt-line-active {
          top: 0;
          background: linear-gradient(180deg, var(--accent-primary) 0%, #8B5CF6 100%);
          transform-origin: top center;
          transform: translateX(-50%);
          transition: height .12s ease-out;
        }

        /* Timeline row */
        .abt-item {
          display: grid;
          grid-template-columns: 1fr 32px 1fr;
          gap: 1rem; align-items: center;
          margin-bottom: 2rem; position: relative;
        }
        .abt-slot-mobile { display: none; }
        .abt-slot { display: block; }

        /* Dot */
        .abt-dot-wrap {
          display: flex; justify-content: center; z-index: 2;
        }
        .abt-dot {
          width: 26px; height: 26px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          transition: background .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .abt-dot-active {
          box-shadow: 0 0 0 3px rgba(59,130,246,.18);
        }
        .abt-dot-icon {
          font-size: .5rem; z-index: 1; position: relative;
          transition: color .3s ease;
        }
        .abt-dot-pulse {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid; border-color: inherit; opacity: 0;
          animation: abt-pulse 1.6s ease-in-out infinite;
        }
        @keyframes abt-pulse {
          0%   { opacity: .6; transform: scale(1); }
          100% { opacity: 0;  transform: scale(1.7); }
        }

        /* Card */
        .abt-card { padding: 1rem 1.25rem; }
        .abt-card-current {
          border-color: rgba(59,130,246,.3);
          background: linear-gradient(135deg, rgba(59,130,246,.04), transparent);
        }
        .abt-card-top {
          display: flex; flex-wrap: wrap; align-items: flex-start;
          justify-content: space-between; gap: .4rem; margin-bottom: .45rem;
        }
        .abt-school { font-size: .875rem; font-weight: 600; color: var(--text-primary); }
        .abt-level  { font-size: .8125rem; font-weight: 600; margin-top: .1rem; }
        .abt-card-meta { display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; }
        .abt-period {
          font-size: .72rem; color: var(--text-tertiary);
          background: var(--bg-surface-2); padding: .18rem .55rem;
          border-radius: var(--radius-full); white-space: nowrap;
        }
        .abt-badge {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .67rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: .07em; padding: .15rem .55rem;
          border-radius: var(--radius-full); white-space: nowrap;
        }
        .abt-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          animation: abt-pulse 1.6s ease-in-out infinite;
        }
        .abt-desc { font-size: .8rem; color: var(--text-secondary); line-height: 1.6; }

        /* Mobile */
        @media (max-width: 720px) {
          .abt-line-bg, .abt-line-active {
            left: 13px; transform: none;
          }
          .abt-item {
            grid-template-columns: 28px 1fr;
            grid-template-areas: 'dot mobile';
            gap: .75rem;
          }
          .abt-slot-left, .abt-slot-right { display: none; }
          .abt-dot-wrap  { grid-area: dot; justify-content: center; align-self: flex-start; padding-top: .1rem; }
          .abt-dot       { width: 22px; height: 22px; }
          .abt-dot-icon  { font-size: .45rem; }
          .abt-slot-mobile { display: block; grid-area: mobile; }
          .abt-card { padding: .85rem 1rem; }
          .abt-school { font-size: .82rem; }
        }
        @media (max-width: 480px) {
          .abt-card-top { flex-direction: column; gap: .3rem; }
          .abt-card-meta { align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
