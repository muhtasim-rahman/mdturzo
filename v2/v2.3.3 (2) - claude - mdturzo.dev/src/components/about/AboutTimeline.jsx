// ============================================================
// AboutTimeline.jsx — v2.3.3
// Education timeline — fully rebuilt:
// - Section heading centered on PC
// - Scroll activation at 50% viewport height (center)
// - Cards + icons start muted, animate to full color on scroll
// - Unique minimal card design, fully responsive
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion }                        from 'framer-motion'
import { FontAwesomeIcon }               from '@fortawesome/react-fontawesome'
import {
  faGraduationCap, faSchool, faTrophy,
  faRocket, faAtom, faBook, faFlask,
} from '@fortawesome/free-solid-svg-icons'

const EDUCATION = [
  { period: '2013 – 2014', school: 'St. Geroza School, Saidpur',          level: 'Nursery & KG',                        desc: 'First steps in formal education. Curiosity and wonder began here.',                         color: '#10B981', icon: faSchool    },
  { period: '2015 – 2017', school: 'St. Geroza School, Saidpur',          level: 'Class 1, 2 & 3',                      desc: 'Primary years — grew a love for reading and understanding how things work.',                color: '#3B82F6', icon: faBook      },
  { period: '2018 – 2019', school: 'Tulshiram Govt. Primary School',      level: 'Class 4 & 5',                         desc: 'Completed primary cycle. Science became a favourite subject.',                             color: '#8B5CF6', icon: faFlask     },
  { period: '2020',        school: 'Lions School & College, Saidpur',     level: 'Class 6',                             desc: 'Brief enrollment before transitioning to SGSC.',                                          color: '#F59E0B', icon: faGraduationCap },
  { period: '2021 – 2025', school: 'Saidpur Govt. Science College (SGSC)',level: 'Class 6 – 10',                        desc: 'Science group. Deepened passion for computers and web development.',                       color: '#EC4899', icon: faSchool    },
  { period: '2026',        school: 'Saidpur Govt. Science College (SGSC)',level: 'SSC-26 Batch',                        desc: 'SSC exams in progress (mid-2026). Next: HSC then BSc in CSE.',                            color: '#3B82F6', icon: faTrophy, current: true  },
  { period: 'Upcoming',    school: 'Higher Secondary (HSC)',               level: 'After SSC — Science group',           desc: 'Aiming for Higher Secondary Certificate with Science group.',                             color: '#06B6D4', icon: faRocket, upcoming: true },
  { period: 'Long-Term',   school: 'Dream Institution',                    level: 'BSc in Computer Science & Engineering', desc: 'Long-term goal — CSE degree to become a professional developer.',                      color: '#22C55E', icon: faAtom,   upcoming: true },
]

const N = EDUCATION.length

export default function AboutTimeline() {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const vh   = window.innerHeight
      // Activate at 50% viewport height (center of screen)
      const p = Math.max(0, Math.min(1, (vh * 0.5 - rect.top) / rect.height))
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

        {/* Section heading — centered on PC */}
        <motion.div className="abt-head"
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
            const isLeft   = i % 2 === 0
            const reached  = i < currentIdx
            const isActive = i === currentIdx
            const isLive   = reached || isActive
            const dotColor = isLive ? item.color : 'var(--border-strong)'
            const dotBg    = isLive ? item.color  : 'var(--bg-surface-2)'

            return (
              <motion.div
                key={i}
                className={`abt-row${isLeft ? ' abt-left' : ' abt-right'}`}
                initial={{ opacity: 0, x: isLeft ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: .48, ease: [.16,1,.3,1], delay: i * .04 }}>

                {/* Card — starts muted, becomes active */}
                <div className={`abt-card${item.current ? ' abt-card-cur' : item.upcoming ? ' abt-card-up' : ''}`}
                  style={{ opacity: isLive ? 1 : 0.45, transition: 'opacity .4s' }}>

                  {item.current  && <span className="abt-badge-cur"><span className="abt-badge-dot" />Current</span>}
                  {item.upcoming && <span className="abt-badge-up">Upcoming</span>}

                  {/* Period pill on top */}
                  <span className="abt-period">{item.period}</span>

                  {/* Content */}
                  <p className="abt-school">{item.school}</p>
                  <p className="abt-level" style={{ color: isLive ? item.color : 'var(--text-tertiary)' }}>
                    {item.level}
                  </p>
                  <p className="abt-desc">{item.desc}</p>

                  {/* Colored bottom-left accent on active */}
                  {isLive && <span className="abt-card-accent" style={{ background: item.color }} />}
                </div>

                {/* Timeline dot */}
                <div
                  className={`abt-dot${isActive ? ' abt-dot-active' : ''}`}
                  style={{
                    borderColor: dotColor,
                    background:  dotBg,
                    boxShadow:   isActive
                      ? `0 0 0 5px ${item.color}22, 0 0 16px ${item.color}44`
                      : isLive ? `0 0 0 2px ${item.color}18` : 'none',
                  }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: isLive ? '#fff' : 'var(--text-tertiary)', fontSize: '.5rem' }}
                  />
                  {isActive && <span className="abt-dot-ring" style={{ borderColor: item.color }} />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        /* Section heading — centered on desktop */
        .abt-head {
          text-align: center; margin-bottom: 3.5rem;
        }
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
          max-width: 460px; margin-inline: auto; line-height: 1.7;
        }

        /* Timeline wrapper */
        .abt-wrap {
          position: relative;
          max-width: 880px; margin: 0 auto;
          padding-bottom: 1.5rem;
        }

        /* Vertical line — center on desktop, left on mobile */
        .abt-line-bg, .abt-line-fill {
          position: absolute; z-index: 0; pointer-events: none;
          left: 50%; transform: translateX(-1px);
          width: 2px; top: 0;
        }
        .abt-line-bg   { bottom: 0; background: var(--border-color); }
        .abt-line-fill {
          background: linear-gradient(180deg, var(--accent-primary) 0%, #8B5CF6 60%, #22C55E 100%);
          transition: height .05s linear;
          border-radius: 9999px;
        }
        @media (max-width: 720px) {
          .abt-line-bg, .abt-line-fill { left: 21px; transform: none; }
        }

        /* Row */
        .abt-row {
          position: relative; z-index: 1;
          display: flex; margin-bottom: 2.25rem;
          padding-left: 3.5rem;
          justify-content: flex-start;
        }
        .abt-row:last-child { margin-bottom: 0; }
        @media (min-width: 721px) {
          .abt-row { padding-left: 0; }
          .abt-left  { justify-content: flex-start;  padding-right: calc(50% + 2.25rem); }
          .abt-right { justify-content: flex-end;    padding-left:  calc(50% + 2.25rem); }
          .abt-left  .abt-card { text-align: right; }
          .abt-right .abt-card { text-align: left;  }
          .abt-left  .abt-card-accent { right: auto; left: 0; }
        }

        /* Card */
        .abt-card {
          flex: none; max-width: 310px;
          padding: 1.1rem 1.2rem; position: relative; overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: opacity .4s, box-shadow .22s;
        }
        .abt-card:hover { box-shadow: 0 6px 22px rgba(0,0,0,.1); }
        @media (max-width: 720px) { .abt-card { max-width: 100%; } }

        /* Colored accent strip bottom-left */
        .abt-card-accent {
          position: absolute; bottom: 0; left: 0;
          width: 3px; height: 100%;
          border-radius: 0 0 0 var(--radius-lg);
        }
        @media (min-width: 721px) {
          .abt-left .abt-card-accent  { left: auto; right: 0; }
          .abt-right .abt-card-accent { left: 0; right: auto; }
        }

        .abt-card-cur {
          border-color: rgba(59,130,246,.3) !important;
          background: linear-gradient(135deg, rgba(59,130,246,.05), var(--bg-surface)) !important;
        }
        .abt-card-up {
          border-color: rgba(139,92,246,.2) !important;
          background: rgba(139,92,246,.03) !important;
        }

        /* Badges */
        .abt-badge-cur {
          display: inline-flex; align-items: center; gap: .28rem;
          position: absolute; top: -10px; right: .75rem;
          font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
          padding: .1rem .5rem; border-radius: 9999px;
          background: rgba(59,130,246,.12); color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
        }
        .abt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-primary);
          animation: abt-blink 1.5s ease-in-out infinite;
        }
        @keyframes abt-blink {
          0%, 100% { opacity: 1; } 50% { opacity: .3; }
        }
        .abt-badge-up {
          position: absolute; top: -10px; left: .75rem;
          font-size: .62rem; font-weight: 700; text-transform: uppercase;
          padding: .1rem .5rem; border-radius: 9999px;
          background: var(--bg-surface-2); color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
        }
        @media (min-width: 721px) {
          .abt-left  .abt-badge-cur  { right: .75rem; left: auto; }
          .abt-left  .abt-badge-up   { left: .75rem;  right: auto; }
          .abt-right .abt-badge-cur  { right: .75rem; left: auto; }
        }

        /* Card content */
        .abt-period {
          display: inline-block;
          font-size: .65rem; color: var(--text-tertiary); font-family: var(--font-mono);
          background: var(--bg-surface-2); padding: .12rem .45rem;
          border-radius: 9999px; margin-bottom: .5rem;
        }
        .abt-school { font-size: .84rem; font-weight: 600; color: var(--text-primary); margin-bottom: .18rem; }
        .abt-level  { font-size: .78rem; font-weight: 700; transition: color .35s; margin-bottom: .35rem; }
        .abt-desc   { font-size: .75rem; color: var(--text-secondary); line-height: 1.58; }

        /* Dot */
        .abt-dot {
          position: absolute; z-index: 3;
          left: .55rem; top: .9rem;
          width: 22px; height: 22px; border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color .3s, background .3s, box-shadow .3s;
        }
        @media (min-width: 721px) {
          .abt-dot { left: 50%; transform: translateX(-50%); }
        }

        /* Active dot ring */
        .abt-dot-ring {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid;
          animation: abt-ring 1.7s ease-in-out infinite;
        }
        @keyframes abt-ring {
          0%, 100% { opacity: .7; transform: scale(1); }
          50%       { opacity: .15; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}
