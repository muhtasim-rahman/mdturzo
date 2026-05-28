// ============================================================
// AboutTimeline.jsx — v2.3.3
// CHANGES:
//   * Section title centered on PC
//   * Cards redesigned — minimal, unique, fully responsive
//   * Scroll line tracks to viewport center (vh * 0.5)
//   * Cards AND dots start muted, become colorful on scroll
//   * Active dot pulses; icon transitions muted→color
//   * Left/right layout improved — cleaner connector style
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
    desc: 'First steps in formal education. Where curiosity and wonder began.',
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
    level: 'After SSC — Science Group',
    desc: 'Aiming for Higher Secondary Certificate with Science group.',
    color: '#06B6D4', icon: faRocket, upcoming: true,
  },
  {
    period: 'Long-Term',
    school: 'Dream Institution',
    level: 'BSc in Computer Science & Engineering',
    desc: 'Long-term goal — CSE degree to become a professional full-stack developer.',
    color: '#22C55E', icon: faAtom, upcoming: true,
  },
]

const N = EDUCATION.length

export default function AboutTimeline() {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      // Track to center of viewport (vh * 0.5)
      const p = Math.max(0, Math.min(1,
        (vh * 0.5 - rect.top) / (rect.height * 0.9)
      ))
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentFloat = progress * N
  const currentIdx   = Math.floor(currentFloat)

  return (
    <section className="section" id="about-education">
      <div className="container-xl">
        <motion.div
          className="abt-header"
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
          {/* Track lines */}
          <div className="abt-line-bg" />
          <div className="abt-line-fill" style={{ height: `${progress * 100}%` }} />

          {EDUCATION.map((item, i) => {
            const isLeft  = i % 2 === 0
            const reached = i <= currentIdx
            const isActive = i === currentIdx

            return (
              <motion.div
                key={i}
                className={`abt-row${isLeft ? ' abt-left' : ' abt-right'}`}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: .48, ease: [.16, 1, .3, 1], delay: i * .04 }}>

                {/* Card */}
                <div
                  className={`abt-card${item.current ? ' abt-card-cur' : item.upcoming ? ' abt-card-up' : ''}`}
                  style={{
                    '--item-color': reached ? item.color : 'var(--text-tertiary)',
                    opacity: reached ? 1 : 0.45,
                    transition: 'opacity .4s ease',
                  }}>

                  {/* Status badge */}
                  {item.current && (
                    <span className="abt-badge abt-badge-cur">
                      <span className="abt-badge-dot" />
                      Current
                    </span>
                  )}
                  {item.upcoming && (
                    <span className="abt-badge abt-badge-up">Upcoming</span>
                  )}

                  {/* Period chip */}
                  <div className="abt-period-row">
                    <span className="abt-period" style={{ color: reached ? item.color : 'var(--text-tertiary)', borderColor: reached ? `${item.color}30` : 'var(--border-color)', background: reached ? `${item.color}0d` : 'var(--bg-surface-2)' }}>
                      {item.period}
                    </span>
                  </div>

                  <p className="abt-school" style={{ color: reached ? 'var(--text-primary)' : 'var(--text-tertiary)', transition: 'color .4s' }}>
                    {item.school}
                  </p>
                  <p className="abt-level" style={{ color: reached ? item.color : 'var(--text-tertiary)', transition: 'color .4s' }}>
                    {item.level}
                  </p>
                  <p className="abt-desc">{item.desc}</p>
                </div>

                {/* Center dot */}
                <div
                  className={`abt-dot${isActive ? ' abt-dot-active' : ''}`}
                  style={{
                    borderColor: reached ? item.color : 'var(--border-strong)',
                    background:  reached ? item.color : 'var(--bg-surface)',
                    boxShadow:   isActive
                      ? `0 0 0 5px ${item.color}22, 0 0 18px ${item.color}44`
                      : reached ? `0 0 0 2px ${item.color}18` : 'none',
                    transition: 'all .4s ease',
                  }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{
                      color: reached ? '#fff' : 'var(--text-tertiary)',
                      fontSize: '.52rem',
                      transition: 'color .4s',
                    }}
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
        /* Header — centered on PC */
        .abt-header { text-align: center; margin-bottom: 3.5rem; }
        .abt-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
          display: block;
        }
        .abt-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abt-accent { color: var(--accent-primary); }
        .abt-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 440px; margin: 0 auto; line-height: 1.7;
        }

        /* Timeline wrapper */
        .abt-wrap {
          position: relative;
          max-width: 820px; margin: 0 auto;
          padding-bottom: 1.5rem;
        }

        /* Vertical line */
        .abt-line-bg, .abt-line-fill {
          position: absolute; z-index: 0; pointer-events: none;
          left: 50%; transform: translateX(-1px);
          width: 2px; top: 0;
        }
        .abt-line-bg  { bottom: 0; background: var(--border-color); }
        .abt-line-fill {
          background: linear-gradient(180deg, var(--accent-primary) 0%, #8B5CF6 60%, #22C55E 100%);
          transition: height .05s linear;
          border-radius: 9999px;
        }
        @media (max-width: 700px) {
          .abt-line-bg, .abt-line-fill { left: 18px; transform: none; }
        }

        /* Row */
        .abt-row {
          position: relative; z-index: 1;
          display: flex; margin-bottom: 2.25rem;
          padding-left: 3rem;
          justify-content: flex-start;
        }
        .abt-row:last-child { margin-bottom: 0; }

        @media (min-width: 701px) {
          .abt-row { padding-left: 0; }
          .abt-left  { justify-content: flex-start;  padding-right: calc(50% + 2.25rem); }
          .abt-right { justify-content: flex-end;    padding-left:  calc(50% + 2.25rem); }
        }

        /* Card */
        .abt-card {
          flex: none; max-width: 300px; width: 100%;
          padding: 1.1rem 1.2rem;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          position: relative;
          box-shadow: 0 1px 8px rgba(0,0,0,.06);
          transition: border-color .4s, box-shadow .4s;
        }
        @media (max-width: 700px) { .abt-card { max-width: 100%; } }

        .abt-card-cur {
          border-color: rgba(59,130,246,.28) !important;
          background: linear-gradient(135deg, rgba(59,130,246,.05), transparent) !important;
        }
        .abt-card-up {
          border-color: rgba(139,92,246,.18) !important;
          background: rgba(139,92,246,.03) !important;
        }

        /* Badges */
        .abt-badge {
          position: absolute; top: -11px;
          font-size: .62rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; padding: .1rem .5rem; border-radius: 9999px;
        }
        .abt-badge-cur {
          right: .75rem;
          display: inline-flex; align-items: center; gap: .28rem;
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
        }
        .abt-badge-up {
          left: .75rem;
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        .abt-left .abt-badge-cur { right: .75rem; left: auto; }
        .abt-left .abt-badge-up  { left:  .75rem; right: auto; }

        .abt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-primary);
          animation: abt-ring 1.5s ease-in-out infinite;
        }

        /* Card content */
        .abt-period-row { margin-bottom: .55rem; }
        .abt-period {
          display: inline-block;
          font-size: .66rem; font-weight: 700; font-family: var(--font-mono);
          padding: .18rem .55rem; border-radius: 9999px;
          border: 1px solid; transition: all .4s ease;
          white-space: nowrap;
        }
        .abt-school {
          font-size: .84rem; font-weight: 600; margin-bottom: .2rem;
          line-height: 1.35; transition: color .4s;
        }
        .abt-level {
          font-size: .78rem; font-weight: 700; margin-bottom: .45rem;
          transition: color .4s;
        }
        .abt-desc {
          font-size: .75rem; color: var(--text-tertiary); line-height: 1.6;
        }

        /* Dot */
        .abt-dot {
          position: absolute; z-index: 3;
          left: .1rem; top: .85rem;
          width: 26px; height: 26px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (min-width: 701px) {
          .abt-dot { left: 50%; transform: translateX(-50%); }
        }

        .abt-dot-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid;
          animation: abt-ring 1.6s ease-in-out infinite;
        }
        @keyframes abt-ring {
          0%, 100% { opacity: .7; transform: scale(1); }
          50%       { opacity: .15; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}
