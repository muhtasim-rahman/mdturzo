// ============================================================
// AboutLanguages.jsx — v2.3.3
// Language proficiency — compact right side, flag on right,
// no percentage text, shimmer on progress bars.
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, useInView }            from 'framer-motion'
import { LANGUAGES }                    from './aboutData.js'

function LangBar({ lang, level, pct, color, flag, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 100 + 200)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <motion.div
      className="abl-item"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .45, delay: index * .09 }}>

      {/* Top row: name + level badge + flag */}
      <div className="abl-meta">
        <span className="abl-name">{lang}</span>
        <div className="abl-right-meta">
          <span className="abl-level" style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
            {level}
          </span>
          <img
            src={`https://flagcdn.com/20x15/${flag}.webp`}
            alt={`${lang} flag`}
            width="20" height="15"
            className="abl-flag"
            loading="lazy"
          />
        </div>
      </div>

      {/* Progress bar — no percentage below */}
      <div className="abl-track">
        <motion.div
          className="abl-fill"
          style={{
            background: `linear-gradient(90deg, ${color}bb, ${color})`,
            boxShadow: `0 0 7px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .88, ease: [.16, 1, .3, 1], delay: index * .07 }}
        />
      </div>
    </motion.div>
  )
}

export default function AboutLanguages() {
  const barsRef  = useRef(null)
  const inView   = useInView(barsRef, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about-languages">
      <div className="container-xl">
        <motion.div
          className="abl-grid"
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: .1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: .1 } } }}>

          {/* Left — heading */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -22 }, show: { opacity: 1, x: 0, transition: { duration: .5, ease: [.16,1,.3,1] } } }}>
            <p className="abl-label">Languages</p>
            <h2 className="abl-h2">
              Language<br />
              <span className="abl-accent">Proficiency</span>
            </h2>
            <p className="abl-desc">
              Bengali is my native language. I communicate in English for all professional work,
              and understand Hindi &amp; Urdu conversationally from cultural exposure.
            </p>
            <div className="abl-legend">
              {['Native', 'Intermediate', 'Conversational'].map((l, i) => (
                <span key={l} className="abl-legend-item">
                  <span className="abl-legend-dot" style={{ background: ['#3B82F6','#10B981','#F59E0B'][i] }} />
                  {l}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — compact bars */}
          <div ref={barsRef} className="abl-bars">
            {LANGUAGES.map((l, i) => (
              <LangBar key={l.lang} {...l} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .abl-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .abl-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        }

        .abl-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
        }
        .abl-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: .85rem;
        }
        .abl-accent { color: var(--accent-primary); }
        .abl-desc {
          font-size: .875rem; color: var(--text-secondary);
          line-height: 1.75; margin-bottom: 1.2rem;
        }
        .abl-legend { display: flex; flex-wrap: wrap; gap: .65rem; }
        .abl-legend-item {
          display: flex; align-items: center; gap: .38rem;
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .abl-legend-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* Compact bars */
        .abl-bars { display: flex; flex-direction: column; gap: .95rem; }
        .abl-item {}

        /* Top row */
        .abl-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .38rem; gap: .5rem;
        }
        .abl-name {
          font-size: .875rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abl-right-meta { display: flex; align-items: center; gap: .5rem; flex-shrink: 0; }
        .abl-level {
          font-size: .65rem; font-weight: 600;
          padding: .14rem .48rem; border-radius: 9999px;
          white-space: nowrap; font-family: var(--font-mono);
        }
        .abl-flag {
          border-radius: 2px; object-fit: cover; flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,.18);
        }

        /* Track — taller, shimmer */
        .abl-track {
          height: 8px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .abl-fill {
          height: 100%; border-radius: var(--radius-full);
          position: relative; overflow: hidden;
        }
        .abl-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.32) 45%, rgba(255,255,255,.50) 50%, rgba(255,255,255,.32) 55%, transparent 100%);
          transform: translateX(-100%);
          animation: abl-shimmer 2.8s ease-in-out infinite;
          border-radius: inherit;
        }
        @keyframes abl-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
