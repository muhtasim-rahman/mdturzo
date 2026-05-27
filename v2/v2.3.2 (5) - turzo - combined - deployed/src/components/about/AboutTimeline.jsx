// ============================================================
// AboutTimeline.jsx — v2.3.2
// Education timeline — improved scroll-driven dot coloring
// Active dot = full color, not-yet-reached = muted
// Smaller icons in dots; mobile layout fixed
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faSchool, faTrophy,
  faRocket, faAtom, faBook, faFlask,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  {
    period: '2013 – 2014',
    school: 'St. Geroza School, Saidpur',
    level: 'Nursery & KG',
    desc: 'First steps in formal education. Curiosity and wonder began here.',
    color: '#10B981', icon: faSchool,
  },
  {
    period: '2015 – 2017',
    school: 'St. Geroza School, Saidpur',
    level: 'Class 1, 2 & 3',
    desc: 'Primary years — grew a love for reading and understanding how things work.',
    color: '#3B82F6', icon: faBook,
  },
  {
    period: '2018 – 2019',
    school: 'Tulshiram Govt. Primary School, Saidpur',
    level: 'Class 4 & 5',
    desc: 'Completed primary cycle. Science became a favourite subject.',
    color: '#8B5CF6', icon: faFlask,
  },
  {
    period: '2020',
    school: 'Lions School & College, Saidpur',
    level: 'Class 6',
    desc: 'Brief enrollment before transitioning to SGSC.',
    color: '#F59E0B', icon: faGraduationCap,
  },
  {
    period: '2021 – 2025',
    school: 'Saidpur Govt. Science College (SGSC)',
    level: 'Class 6 – 10',
    desc: 'Science group. Deepened passion for computers and web development.',
    color: '#EC4899', icon: faSchool,
  },
  {
    period: '2026',
    school: 'Saidpur Govt. Science College (SGSC)',
    level: 'SSC-26 Batch',
    desc: 'SSC exams in progress (mid-2026). Next: HSC then BSc in CSE.',
    color: '#3B82F6', icon: faTrophy, current: true,
  },
  {
    period: 'Upcoming',
    school: 'Higher Secondary (HSC)',
    level: 'After SSC (Science group)',
    desc: 'Aiming for Higher Secondary Certificate — Science group.',
    color: '#06B6D4', icon: faRocket, upcoming: true,
  },
  {
    period: 'Long-Term',
    school: 'Dream Institution',
    level: 'BSc in Computer Science & Engineering',
    desc: 'Long-term goal — CSE degree to become a professional developer.',
    color: '#22C55E', icon: faAtom, upcoming: true,
  },
]

const N = EDUCATION.length

export default function AboutTimeline() {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0) // 0-1

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.max(0, Math.min(1,
        (vh * 0.72 - rect.top) / (rect.height * 0.88)
      ))
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Which index is "current" based on scroll progress
  const currentFloat = progress * N // 0 → N
  const currentIdx   = Math.floor(currentFloat)

  return (
    <section className="section" id="about-education">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="abt-label">Education</p>
          <h2 className="abt-h2">
            Academic <span className="abt-accent">Timeline</span>
          </h2>
          <p className="abt-sub">From nursery to the dream of CSE — the full journey.</p>
        </motion.div>

        <div ref={wrapRef} className="abt-wrap">
          {/* Background line */}
          <div className="abt-line-bg" />
          {/* Animated fill line */}
          <div className="abt-line-fill" style={{ height: `${progress * 100}%` }} />

          {EDUCATION.map((item, i) => {
            const isLeft = i % 2 === 0
            // Dot state: reached = full color; not yet reached = muted
            const reached  = i <= currentIdx
            const isActive = i === currentIdx

            return (
              <motion.div
                key={i}
                className={`abt-row${isLeft ? ' abt-left' : ' abt-right'}`}
                initial={{ opacity: 0, x: isLeft ? -22 : 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .25 }}
                transition={{ duration: .5, ease: [.16, 1, .3, 1], delay: i * .05 }}>

                {/* Card */}
                <div className={`abt-card card${item.current ? ' abt-card-cur' : item.upcoming ? ' abt-card-up' : ''}`}>
                  {item.current && (
                    <span className="abt-badge-cur">
                      <span className="abt-badge-dot" />
                      Current
                    </span>
                  )}
                  {item.upcoming && (
                    <span className="abt-badge-up">Upcoming</span>
                  )}
                  <div className="abt-card-header">
                    <div>
                      <p className="abt-school">{item.school}</p>
                      <p className="abt-level" style={{ color: reached ? item.color : 'var(--text-tertiary)' }}>
                        {item.level}
                      </p>
                    </div>
                    <span className="abt-period">{item.period}</span>
                  </div>
                  <p className="abt-desc">{item.desc}</p>
                </div>

                {/* Center/Left dot */}
                <div
                  className={`abt-dot${isActive ? ' abt-dot-active' : ''}`}
                  style={{
                    borderColor: reached ? item.color : 'var(--border-strong)',
                    background:  reached ? item.color : 'var(--bg-page)',
                    boxShadow:   isActive
                      ? `0 0 0 5px ${item.color}22, 0 0 18px ${item.color}44`
                      : reached ? `0 0 0 2px ${item.color}15` : 'none',
                    opacity: reached || i === 0 ? 1 : 0.45,
                  }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: reached ? '#fff' : 'var(--text-tertiary)', fontSize: '.52rem' }}
                  />
                  {isActive && (
                    <span className="abt-dot-ring" style={{ borderColor: item.color }} />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .abt-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
        }
        .abt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abt-accent { color: var(--accent-primary); }
        .abt-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 480px; margin-bottom: 3rem; line-height: 1.7;
        }

        /* Timeline wrapper */
        .abt-wrap {
          position: relative;
          max-width: 860px; margin: 0 auto;
          padding-bottom: 1.5rem;
        }

        /* Vertical lines — centered desktop, left mobile */
        .abt-line-bg, .abt-line-fill {
          position: absolute; z-index: 0; pointer-events: none;
          left: 50%; transform: translateX(-1px);
          width: 2px; top: 0;
        }
        .abt-line-bg  { bottom: 0; background: var(--border-color); }
        .abt-line-fill {
          background: linear-gradient(180deg, var(--accent-primary) 0%, #8B5CF6 100%);
          transition: height .04s linear;
          border-radius: 9999px;
        }
        @media (max-width: 720px) {
          .abt-line-bg, .abt-line-fill {
            left: 19px; transform: none;
          }
        }

        /* Row */
        .abt-row {
          position: relative; z-index: 1;
          display: flex; margin-bottom: 2rem;
          padding-left: 3.25rem;
          justify-content: flex-start;
        }
        .abt-row:last-child { margin-bottom: 0; }

        @media (min-width: 721px) {
          .abt-row { padding-left: 0; }
          .abt-left  { justify-content: flex-start;  padding-right: calc(50% + 2rem); }
          .abt-right { justify-content: flex-end;    padding-left:  calc(50% + 2rem); }
          .abt-left  .abt-card { text-align: right; }
          .abt-right .abt-card { text-align: left;  }
        }

        /* Dot */
        .abt-dot {
          position: absolute; z-index: 3;
          left: .35rem; top: .875rem;
          width: 24px; height: 24px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color .3s, background .3s, box-shadow .3s, opacity .3s;
        }
        @media (min-width: 721px) {
          .abt-dot { left: 50%; transform: translateX(-50%); }
        }

        /* Pulsing ring for active dot */
        .abt-dot-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid;
          animation: abt-ring 1.6s ease-in-out infinite;
        }
        @keyframes abt-ring {
          0%, 100% { opacity: .7; transform: scale(1); }
          50%       { opacity: .2; transform: scale(1.35); }
        }

        /* Card */
        .abt-card {
          flex: none; max-width: 320px;
          padding: 1rem 1.25rem; position: relative;
        }
        @media (max-width: 720px) {
          .abt-card { max-width: 100%; }
        }
        .abt-card-cur {
          background: linear-gradient(135deg, rgba(59,130,246,.06), rgba(99,102,241,.03)) !important;
          border-color: rgba(59,130,246,.3) !important;
        }
        .abt-card-up {
          background: rgba(139,92,246,.04) !important;
          border-color: rgba(139,92,246,.18) !important;
        }
        .abt-badge-cur {
          display: inline-flex; align-items: center; gap: .3rem;
          position: absolute; top: -10px; right: .75rem;
          font-size: .64rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; padding: .12rem .55rem; border-radius: 9999px;
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
        }
        .abt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-primary);
          animation: abt-ring 1.5s ease-in-out infinite;
        }
        .abt-badge-up {
          position: absolute; top: -10px; left: .75rem;
          font-size: .64rem; font-weight: 700; text-transform: uppercase;
          padding: .12rem .55rem; border-radius: 9999px;
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        .abt-left .abt-badge-cur { right: .75rem; left: auto; }
        .abt-left .abt-badge-up  { left: .75rem; right: auto; }

        .abt-card-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: .5rem; margin-bottom: .45rem; flex-wrap: wrap;
        }
        .abt-school { font-size: .875rem; font-weight: 600; color: var(--text-primary); }
        .abt-level  {
          font-size: .8rem; font-weight: 600; margin-top: .1rem;
          transition: color .3s;
        }
        .abt-period {
          font-size: .68rem; color: var(--text-tertiary);
          background: var(--bg-surface-2); padding: .15rem .5rem;
          border-radius: 9999px; white-space: nowrap; flex-shrink: 0;
          font-family: var(--font-mono);
        }
        .abt-desc { font-size: .78rem; color: var(--text-secondary); line-height: 1.6; }
      `}</style>
    </section>
  )
}
