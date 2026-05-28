// ============================================================
// AboutTimeline.jsx — v2.3.3
// CHANGES:
//   * Section heading centered on PC
//   * Card design: fully redesigned — clean, minimal, unique
//   * Left/right cards: proper text alignment, border accents
//   * Scroll calc: fills to viewport center (vh*0.5)
//   * Cards + icons muted before scroll reaches them; animate to full color
//   * Fully responsive: mobile collapses to single column
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
    period: '2013 – 2014', school: 'St. Geroza School, Saidpur',
    level: 'Nursery & KG',
    desc: 'First steps in formal education. Curiosity and wonder began here.',
    color: '#10B981', icon: faSchool,
  },
  {
    period: '2015 – 2017', school: 'St. Geroza School, Saidpur',
    level: 'Class 1, 2 & 3',
    desc: 'Primary years — grew a love for reading and understanding how things work.',
    color: '#3B82F6', icon: faBook,
  },
  {
    period: '2018 – 2019', school: 'Tulshiram Govt. Primary School, Saidpur',
    level: 'Class 4 & 5',
    desc: 'Completed primary cycle. Science became a favourite subject.',
    color: '#8B5CF6', icon: faFlask,
  },
  {
    period: '2020', school: 'Lions School & College, Saidpur',
    level: 'Class 6',
    desc: 'Brief enrollment before transitioning to SGSC.',
    color: '#F59E0B', icon: faGraduationCap,
  },
  {
    period: '2021 – 2025', school: 'Saidpur Govt. Science College (SGSC)',
    level: 'Class 6 – 10',
    desc: 'Science group. Deepened passion for computers and web development.',
    color: '#EC4899', icon: faSchool,
  },
  {
    period: '2026', school: 'Saidpur Govt. Science College (SGSC)',
    level: 'SSC-26 Batch',
    desc: 'SSC exams in progress (mid-2026). Next: HSC then BSc in CSE.',
    color: '#3B82F6', icon: faTrophy, current: true,
  },
  {
    period: 'Upcoming', school: 'Higher Secondary (HSC)',
    level: 'After SSC · Science Group',
    desc: 'Aiming for Higher Secondary Certificate with a Science group focus.',
    color: '#06B6D4', icon: faRocket, upcoming: true,
  },
  {
    period: 'Long-Term', school: 'Dream Institution',
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
      // Fill to center of viewport (vh * 0.5)
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
        {/* Centered heading */}
        <motion.div
          className="abt-head"
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
          {/* Animated fill */}
          <div className="abt-line-fill" style={{ height: `${progress * 100}%` }} />

          {EDUCATION.map((item, i) => {
            const isLeft    = i % 2 === 0
            const reached   = i <= currentIdx
            const isActive  = i === currentIdx

            return (
              <motion.div
                key={i}
                className={`abt-row${isLeft ? ' abt-left' : ' abt-right'}`}
                initial={{ opacity: 0, x: isLeft ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: .5, ease: [.16, 1, .3, 1], delay: i * .04 }}>

                {/* Card */}
                <div
                  className={`abt-card${item.current ? ' abt-card-cur' : item.upcoming ? ' abt-card-up' : ''}`}
                  style={{
                    '--card-color': item.color,
                    opacity: reached ? 1 : 0.38,
                    transition: 'opacity .4s ease, border-color .4s ease',
                    borderColor: reached ? `${item.color}30` : 'var(--border-color)',
                  }}>

                  {/* Top accent line */}
                  <div className="abt-card-topline" style={{ background: reached ? item.color : 'var(--border-strong)', opacity: reached ? 1 : 0.3 }} />

                  {item.current && (
                    <span className="abt-badge-cur">
                      <span className="abt-badge-dot" style={{ background: item.color }} />
                      Current
                    </span>
                  )}
                  {item.upcoming && (
                    <span className="abt-badge-up">Upcoming</span>
                  )}

                  <div className="abt-card-body">
                    <div className="abt-card-top">
                      <span className="abt-period" style={{ color: reached ? item.color : 'var(--text-tertiary)', borderColor: reached ? `${item.color}33` : 'var(--border-color)' }}>
                        {item.period}
                      </span>
                    </div>
                    <p className="abt-school" style={{ color: reached ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                      {item.school}
                    </p>
                    <p className="abt-level" style={{ color: reached ? item.color : 'var(--text-tertiary)' }}>
                      {item.level}
                    </p>
                    <p className="abt-desc">{item.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className={`abt-dot${isActive ? ' abt-dot-active' : ''}`}
                  style={{
                    borderColor:  reached ? item.color : 'var(--border-strong)',
                    background:   reached ? item.color : 'var(--bg-surface)',
                    boxShadow:    isActive
                      ? `0 0 0 5px ${item.color}22, 0 0 18px ${item.color}44`
                      : reached ? `0 0 0 2px ${item.color}15` : 'none',
                    opacity: reached ? 1 : 0.35,
                    transition: 'all .4s ease',
                  }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: reached ? '#fff' : 'var(--text-tertiary)', fontSize: '.5rem' }}
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
        /* Centered heading */
        .abt-head { text-align: center; margin-bottom: 3.5rem; }
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
          max-width: 440px; margin: 0 auto; line-height: 1.7;
        }

        /* Timeline wrapper */
        .abt-wrap {
          position: relative;
          max-width: 900px; margin: 0 auto;
          padding-bottom: 1.5rem;
        }

        /* Vertical line */
        .abt-line-bg, .abt-line-fill {
          position: absolute; z-index: 0; pointer-events: none;
          left: 50%; transform: translateX(-1px);
          width: 2px; top: 0;
        }
        .abt-line-bg { bottom: 0; background: var(--border-color); }
        .abt-line-fill {
          background: linear-gradient(180deg, var(--accent-primary) 0%, #8B5CF6 100%);
          transition: height .04s linear;
          border-radius: 9999px;
        }
        @media (max-width: 720px) {
          .abt-line-bg, .abt-line-fill { left: 20px; transform: none; }
        }

        /* Row */
        .abt-row {
          position: relative; z-index: 1;
          display: flex; margin-bottom: 2.25rem;
          padding-left: 3.5rem;
        }
        .abt-row:last-child { margin-bottom: 0; }

        @media (min-width: 721px) {
          .abt-row { padding-left: 0; }
          .abt-left  { justify-content: flex-start;  padding-right: calc(50% + 2.5rem); }
          .abt-right { justify-content: flex-end;    padding-left:  calc(50% + 2.5rem); }
        }

        /* Dot */
        .abt-dot {
          position: absolute; z-index: 3;
          left: .45rem; top: 1.05rem;
          width: 22px; height: 22px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (min-width: 721px) {
          .abt-dot { left: 50%; transform: translateX(-50%); }
        }

        /* Pulsing ring */
        .abt-dot-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid;
          animation: abt-ring 1.6s ease-in-out infinite;
        }
        @keyframes abt-ring {
          0%, 100% { opacity: .7; transform: scale(1);    }
          50%       { opacity: .1; transform: scale(1.45); }
        }

        /* Card — redesigned */
        .abt-card {
          flex: none; max-width: 330px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          box-shadow: 0 1px 4px rgba(0,0,0,.06);
          transition: box-shadow .2s ease;
        }
        .abt-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,.1);
        }
        [data-theme=light] .abt-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,.07);
        }
        @media (max-width: 720px) {
          .abt-card { max-width: 100%; }
        }

        /* Thin top color line */
        .abt-card-topline {
          height: 3px; width: 100%; transition: background .4s ease, opacity .4s ease;
        }

        .abt-card-cur {
          background: linear-gradient(135deg, rgba(59,130,246,.05), rgba(99,102,241,.02)) !important;
        }
        .abt-card-up {
          background: rgba(139,92,246,.03) !important;
        }

        /* Badges */
        .abt-badge-cur {
          display: inline-flex; align-items: center; gap: .3rem;
          position: absolute; top: 8px; right: .65rem;
          font-size: .6rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; padding: .1rem .5rem; border-radius: 9999px;
          background: rgba(59,130,246,.1); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.2);
        }
        .abt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: abt-ring 1.5s ease-in-out infinite;
        }
        .abt-badge-up {
          position: absolute; top: 8px; left: .65rem;
          font-size: .6rem; font-weight: 700; text-transform: uppercase;
          padding: .1rem .5rem; border-radius: 9999px;
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        /* Flip badge sides for left-col cards */
        .abt-left .abt-badge-cur { right: .65rem; left: auto; }
        .abt-left .abt-badge-up  { left: .65rem; right: auto; }

        /* Card body */
        .abt-card-body { padding: .85rem 1rem 1rem; }
        .abt-card-top {
          display: flex; align-items: center;
          margin-bottom: .5rem;
        }
        .abt-left .abt-card-top  { justify-content: flex-end; }
        .abt-right .abt-card-top { justify-content: flex-start; }
        @media (max-width: 720px) {
          .abt-card-top { justify-content: flex-start !important; }
        }
        .abt-period {
          font-size: .65rem; font-weight: 700; font-family: var(--font-mono);
          padding: .12rem .55rem; border-radius: 9999px; border: 1px solid;
          transition: color .4s, border-color .4s;
        }
        .abt-school {
          font-size: .82rem; font-weight: 600;
          margin-bottom: .12rem; transition: color .4s;
        }
        .abt-level {
          font-size: .76rem; font-weight: 600;
          margin-bottom: .35rem; transition: color .4s;
        }
        .abt-desc {
          font-size: .75rem; color: var(--text-secondary); line-height: 1.6;
        }

        /* Right-align left column cards */
        @media (min-width: 721px) {
          .abt-left .abt-card-body { text-align: right; }
        }
      `}</style>
    </section>
  )
}
