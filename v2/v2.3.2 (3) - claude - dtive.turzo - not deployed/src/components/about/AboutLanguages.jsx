// ============================================================
// AboutLanguages.jsx — v2.3.2
// Language proficiency section
// Same progress bar animation as skills/home sections
// ============================================================

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const LANGUAGES = [
  { lang: 'Bengali (বাংলা)', level: 'Native',         pct: 100, color: '#3B82F6', flag: 'bd' },
  { lang: 'English',          level: 'Intermediate',   pct: 65,  color: '#10B981', flag: 'gb' },
  { lang: 'Hindi (हिन्दी)', level: 'Conversational', pct: 55,  color: '#F59E0B', flag: 'in' },
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay: index * .1 }}>
      <div className="abl-meta">
        <div className="abl-name-row">
          <img
            src={`https://flagcdn.com/24x18/${flag}.webp`}
            alt={`${lang} flag`}
            width="24" height="18"
            className="abl-flag"
            loading="lazy"
          />
          <span className="abl-name">{lang}</span>
        </div>
        <span className="abl-level" style={{ color, background: `${color}18`, border: `1px solid ${color}33` }}>
          {level}
        </span>
      </div>
      <div className="abl-track">
        <motion.div
          className="abl-fill"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})`, boxShadow: `0 0 8px ${color}44` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: index * .07 }}
        />
      </div>
      <span className="abl-pct" style={{ color }}>{pct}%</span>
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

          {/* Left — heading + description */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: .55, ease: [.16,1,.3,1] } } }}>
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

          {/* Right — bars */}
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
          margin-bottom: .5rem;
        }
        .abl-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: .85rem;
        }
        .abl-accent { color: var(--accent-primary); }
        .abl-desc {
          font-size: .875rem; color: var(--text-secondary); line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .abl-legend { display: flex; flex-wrap: wrap; gap: .75rem; }
        .abl-legend-item {
          display: flex; align-items: center; gap: .4rem;
          font-size: .75rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .abl-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* Bars */
        .abl-bars { display: flex; flex-direction: column; gap: 1.25rem; }
        .abl-item {}
        .abl-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .45rem; gap: .5rem;
        }
        .abl-name-row { display: flex; align-items: center; gap: .65rem; }
        .abl-flag {
          border-radius: 3px; object-fit: cover; flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,.2);
        }
        .abl-name { font-size: .9375rem; font-weight: 600; color: var(--text-primary); }
        .abl-level {
          font-size: .7rem; font-weight: 600; padding: .18rem .55rem;
          border-radius: 9999px; white-space: nowrap; font-family: var(--font-mono);
        }
        .abl-track {
          height: 7px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
          margin-bottom: .3rem;
        }
        .abl-fill { height: 100%; border-radius: var(--radius-full); }
        .abl-pct {
          font-size: .7rem; font-weight: 600; font-family: var(--font-mono);
        }
      `}</style>
    </section>
  )
}
