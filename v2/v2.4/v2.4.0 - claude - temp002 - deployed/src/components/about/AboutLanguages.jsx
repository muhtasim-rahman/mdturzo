// ============================================================
// AboutLanguages.jsx — v2.3.6
// CHANGES (v2.3.6):
//   * Now fetches from Supabase `about_languages` table
//   * LANGUAGES_FALLBACK shown instantly, swapped for live data if/when
//     the fetch succeeds with rows.
// PREVIOUS (v2.3.3):
//   * Right-side language bars compacted
//   * Flag moved to right side of each row (small)
//   * Percentage below progress bar removed
//   * Tighter overall spacing
//   * Shimmer on bars (same pattern as skills section)
// ============================================================

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getAboutLanguages } from '../../services/supabase.js'

const LANGUAGES_FALLBACK = [
  { lang: 'Bengali (বাংলা)', level: 'Native',         pct: 95, color: '#3B82F6', flag: 'bd' },
  { lang: 'English',          level: 'Intermediate',   pct: 65,  color: '#10B981', flag: 'gb' },
  { lang: 'Hindi (हिन्दी)', level: 'Conversational', pct: 55,  color: '#F59E0B', flag: 'in' },
  { lang: 'Urdu (اُرْدُو)',             level: 'Conversational', pct: 45,  color: '#EC4899', flag: 'pk' },
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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .45, delay: index * .08 }}>

      {/* Row: name left, badge + flag right */}
      <div className="abl-meta">
        <span className="abl-name">{lang}</span>
        <div className="abl-meta-right">
          <span className="abl-level" style={{ color, background: `${color}15`, border: `1px solid ${color}28` }}>
            {level}
          </span>
          <img
            src={`https://flagcdn.com/20x15/${flag}.webp`}
            alt=""
            aria-hidden="true"
            width="20" height="15"
            className="abl-flag"
            loading="lazy"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="abl-track">
        <motion.div
          className="abl-fill"
          style={{ background: `linear-gradient(90deg, ${color}bb, ${color})`, boxShadow: `0 0 6px ${color}44` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: index * .07 }}
        />
      </div>
    </motion.div>
  )
}

export default function AboutLanguages() {
  const [languages, setLanguages] = useState(LANGUAGES_FALLBACK)
  const barsRef  = useRef(null)
  const barsInView = useInView(barsRef, { once: true, margin: '-80px' })

  useEffect(() => {
    getAboutLanguages()
      .then(rows => {
        if (!rows?.length) return
        setLanguages(rows.map(r => ({
          lang: r.lang, level: r.level, pct: r.pct, color: r.color, flag: r.flag_code,
        })))
      })
      .catch(() => { /* keep fallback */ })
  }, [])

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
            variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: .55, ease: [.16,1,.3,1] } } }}>
            <p className="abl-label">Languages</p>
            <h2 className="abl-h2">
              Language<br />
              <span className="abl-accent">Proficiency</span>
            </h2>
            <p className="abl-desc">
              Bengali is my native language. I use English for all professional
              work, and understand Hindi &amp; Urdu conversationally.
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
            {languages.map((l, i) => (
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
          margin-bottom: 1.1rem;
        }
        .abl-legend { display: flex; flex-wrap: wrap; gap: .65rem; }
        .abl-legend-item {
          display: flex; align-items: center; gap: .35rem;
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .abl-legend-dot { width: 7px; height: 7px; border-radius: 50%; }

        /* Compact bars column */
        .abl-bars { display: flex; flex-direction: column; gap: .95rem; }
        .abl-item {}
        .abl-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .38rem; gap: .5rem;
        }
        .abl-name { font-size: .875rem; font-weight: 600; color: var(--text-primary); }
        .abl-meta-right { display: flex; align-items: center; gap: .5rem; }
        .abl-level {
          font-size: .65rem; font-weight: 600; padding: .14rem .48rem;
          border-radius: 9999px; white-space: nowrap; font-family: var(--font-mono);
        }
        .abl-flag {
          border-radius: 2px; object-fit: cover; flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,.2);
        }

        /* Progress bar */
        .abl-track {
          height: 6px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .abl-fill {
          height: 100%; border-radius: var(--radius-full);
          position: relative; overflow: hidden;
        }
        .abl-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.32) 44%, rgba(255,255,255,.52) 50%, rgba(255,255,255,.32) 56%, transparent 100%);
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
