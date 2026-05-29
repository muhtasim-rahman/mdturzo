// ============================================================
// AboutLanguages.jsx — v2.3.3
// CHANGES:
//   * Right side more compact — tighter layout
//   * Flags moved to the RIGHT side of the language name row
//   * Percentage text below bar removed
//   * Shimmer animation added to progress bars (same as Skills)
// ============================================================

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LANGUAGES = [
  { lang: 'Bengali (বাংলা)', level: 'Native',         pct: 100, color: '#3B82F6', flag: 'bd' },
  { lang: 'English',          level: 'Intermediate',   pct: 65,  color: '#10B981', flag: 'gb' },
  { lang: 'Hindi (हिन्दी)',  level: 'Conversational', pct: 55,  color: '#F59E0B', flag: 'in' },
  { lang: 'Urdu',             level: 'Conversational', pct: 45,  color: '#EC4899', flag: 'pk' },
]

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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .48, delay: index * .09 }}>

      <div className="abl-meta">
        <div className="abl-name-row">
          <span className="abl-name">{lang}</span>
          <img
            src={`https://flagcdn.com/20x15/${flag}.webp`}
            alt={`${lang} flag`}
            width="20" height="15"
            className="abl-flag"
            loading="lazy"
          />
        </div>
        <span className="abl-level" style={{ color, background: `${color}18`, border: `1px solid ${color}33` }}>
          {level}
        </span>
      </div>

      <div className="abl-track">
        <motion.div
          className="abl-fill"
          style={{ '--lc': color, background: `linear-gradient(90deg, ${color}cc, ${color})`, boxShadow: `0 0 6px ${color}44` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: index * .07 }}
        />
      </div>
    </motion.div>
  )
}

export default function AboutLanguages() {
  const barsRef = useRef(null)
  const barsInView = useInView(barsRef, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about-languages">
      <div className="container-xl">
        <motion.div
          className="abl-grid"
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: .1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: .1 } } }}>

          {/* Left */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: .55, ease: [.16,1,.3,1] } } }}>
            <p className="abl-label">Languages</p>
            <h2 className="abl-h2">
              Language<br />
              <span className="abl-accent">Proficiency</span>
            </h2>
            <p className="abl-desc">
              Bengali is my native language. I use English for all professional work,
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
              <LangBar key={l.lang} {...l} index={i} inView={barsInView} />
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
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .5rem; display: block;
        }
        .abl-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: .85rem;
        }
        .abl-accent { color: var(--accent-primary); }
        .abl-desc {
          font-size: .875rem; color: var(--text-secondary); line-height: 1.75;
          margin-bottom: 1.1rem;
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
        .abl-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .4rem; gap: .5rem;
        }
        .abl-name-row { display: flex; align-items: center; gap: .5rem; }
        .abl-name { font-size: .9rem; font-weight: 600; color: var(--text-primary); }
        .abl-flag {
          border-radius: 2px; object-fit: cover; flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,.18);
        }
        .abl-level {
          font-size: .66rem; font-weight: 600; padding: .15rem .5rem;
          border-radius: 9999px; white-space: nowrap; font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .abl-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        /* Shimmer — same as home Skills */
        .abl-fill {
          height: 100%; border-radius: var(--radius-full);
          position: relative; overflow: hidden;
        }
        .abl-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.35) 45%, rgba(255,255,255,.52) 50%, rgba(255,255,255,.35) 55%, transparent 100%);
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
