// ============================================================
// components/about/AboutLanguages.jsx — v2.3.2
// Language Proficiency — flags + animated bars (same as home Skills)
// ============================================================

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const LANGUAGES = [
  { lang: 'Bengali (বাংলা)', level: 'Native',          pct: 100, color: '#3B82F6', flag: 'bd' },
  { lang: 'English',         level: 'Intermediate',    pct: 65,  color: '#10B981', flag: 'gb' },
  { lang: 'Hindi (हिन्दी)', level: 'Conversational',  pct: 55,  color: '#F59E0B', flag: 'in' },
  { lang: 'Urdu',            level: 'Conversational',  pct: 45,  color: '#EC4899', flag: 'pk' },
]

function LangBar({ lang, level, pct, color, flag, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 150)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div className="abl-item">
      <div className="abl-meta">
        <div className="abl-name-row">
          <img
            src={`https://flagcdn.com/24x18/${flag}.webp`}
            alt={lang} width="24" height="18"
            className="abl-flag" loading="lazy"
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
          style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)`, boxShadow: `0 0 8px ${color}44` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: index * .1 }}
        />
        <span className="abl-pct" style={{ color }}>{pct}%</span>
      </div>
    </div>
  )
}

export default function AboutLanguages() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about-languages" ref={sectionRef}>
      <div className="container-xl">
        <div className="abl-wrap">

          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .55, ease: [.16,1,.3,1] }}
            className="abl-left"
          >
            <p className="abl-label">Languages</p>
            <h2 className="abl-h2">
              Language<br /><span className="abl-accent">Proficiency</span>
            </h2>
            <p className="abl-intro">
              Bengali is my native language. I communicate in English for all professional work,
              and understand Hindi &amp; Urdu conversationally.
            </p>

            {/* Proficiency legend */}
            <div className="abl-legend">
              {[
                { l: 'Native', w: '100%', c: '#3B82F6' },
                { l: 'Fluent', w: '80%',  c: '#10B981' },
                { l: 'Intermediate', w: '60%', c: '#F59E0B' },
                { l: 'Basic', w: '30%', c: '#94A3B8' },
              ].map(({ l, w, c }) => (
                <div key={l} className="abl-legend-row">
                  <div className="abl-legend-track">
                    <div className="abl-legend-fill" style={{ width: w, background: c }} />
                  </div>
                  <span className="abl-legend-label">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .55, ease: [.16,1,.3,1], delay: .1 }}
            className="abl-right"
          >
            {LANGUAGES.map((lang, i) => (
              <LangBar key={lang.lang} {...lang} index={i} inView={inView} />
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        .abl-wrap {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem); align-items: start;
        }
        .abl-label {
          display: inline-block; font-family: var(--font-mono);
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .abl-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.2vw, 2.4rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: 1rem;
        }
        .abl-accent { color: var(--accent-primary); }
        .abl-intro {
          font-size: .88rem; color: var(--text-secondary); line-height: 1.75;
          margin-bottom: 1.5rem;
        }

        /* Legend */
        .abl-legend { display: flex; flex-direction: column; gap: .5rem; }
        .abl-legend-row { display: flex; align-items: center; gap: .75rem; }
        .abl-legend-track {
          width: 80px; height: 4px;
          background: var(--bg-surface); border-radius: 999px; overflow: hidden;
          border: 1px solid var(--border-color); flex-shrink: 0;
        }
        .abl-legend-fill { height: 100%; border-radius: 999px; }
        .abl-legend-label { font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono); }

        /* Right — bars */
        .abl-right { display: flex; flex-direction: column; gap: 1.5rem; }
        .abl-item {}
        .abl-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: .5rem;
        }
        .abl-name-row { display: flex; align-items: center; gap: .5rem; }
        .abl-flag { border-radius: 2px; }
        .abl-name { font-size: .88rem; font-weight: 600; color: var(--text-primary); }
        .abl-level {
          font-size: .7rem; font-weight: 600; padding: .18rem .55rem;
          border-radius: 9999px; font-family: var(--font-mono);
        }
        .abl-track {
          position: relative; height: 8px;
          background: var(--bg-surface); border-radius: 999px;
          overflow: visible; border: 1px solid var(--border-color);
        }
        .abl-fill { height: 100%; border-radius: 999px; position: relative; }
        .abl-pct {
          position: absolute; right: 0; top: -18px;
          font-size: .68rem; font-weight: 700; font-family: var(--font-mono);
        }

        @media (max-width: 768px) {
          .abl-wrap { grid-template-columns: 1fr; }
          .abl-legend { flex-direction: row; flex-wrap: wrap; gap: .75rem 1.25rem; }
          .abl-legend-row { gap: .4rem; }
        }
      `}</style>
    </section>
  )
}
