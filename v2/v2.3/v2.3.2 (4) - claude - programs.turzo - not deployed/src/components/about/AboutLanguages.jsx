// ============================================================
// AboutLanguages.jsx — v2.3.2
// Language Proficiency section.
// Animation: inView + staggered setTimeout (same as home Skills).
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, useInView }            from 'framer-motion'
import { LANGUAGES, fadeUp, stagger }   from './aboutData.js'

function SectionLabel({ text }) {
  return <p className="abl-label">{text}</p>
}

function LangBar({ lang, level, pct, color, flag, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 100 + 150)
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
        <span className="abl-level"
          style={{ color, background: `${color}18`, border: `1px solid ${color}33` }}>
          {level}
        </span>
      </div>
      <div className="abl-track">
        <motion.div
          className="abl-fill"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: `0 0 8px ${color}44`,
          }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .9, ease: [.16, 1, .3, 1], delay: index * .08 }}
        />
      </div>
      <div className="abl-pct-row">
        <span className="abl-pct" style={{ color }}>{pct}%</span>
      </div>
    </div>
  )
}

export default function AboutLanguages() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="section" id="about-languages" ref={sectionRef}>
      <div className="container-xl">
        <motion.div className="abl-wrap"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>

          <motion.div variants={fadeUp}>
            <SectionLabel text="Languages" />
            <h2 className="abl-h2">
              Language<br /><span className="abl-accent">Proficiency</span>
            </h2>
            <p className="abl-intro">
              Bengali is my native language. I communicate in English for all professional work,
              and understand Hindi &amp; Urdu conversationally.
            </p>
          </motion.div>

          <motion.div variants={stagger(.12)} className="abl-bars">
            {LANGUAGES.map((lang, i) => (
              <LangBar key={lang.lang} {...lang} index={i} inView={inView} />
            ))}
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        .abl-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .abl-wrap {
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .abl-wrap { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        }
        .abl-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          line-height: 1.2; color: var(--text-primary); margin-bottom: 1rem;
        }
        .abl-accent { color: var(--accent-primary); }
        .abl-intro {
          font-size: .875rem; color: var(--text-secondary); line-height: 1.75;
        }
        .abl-bars { display: flex; flex-direction: column; gap: 1.5rem; }
        .abl-item {}
        .abl-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: .5rem; gap: .5rem;
        }
        .abl-name-row { display: flex; align-items: center; gap: .65rem; }
        .abl-flag {
          border-radius: 3px; object-fit: cover; flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,.2);
        }
        .abl-name { font-size: .9375rem; font-weight: 600; color: var(--text-primary); }
        .abl-level {
          font-size: .72rem; font-weight: 600; padding: .18rem .6rem;
          border-radius: var(--radius-full); white-space: nowrap;
          font-family: var(--font-mono);
        }
        .abl-track {
          height: 8px; background: var(--bg-surface-2);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .abl-fill { height: 100%; border-radius: var(--radius-full); }
        .abl-pct-row { margin-top: .3rem; text-align: right; }
        .abl-pct {
          font-size: .72rem; font-weight: 600; font-family: var(--font-mono);
        }
      `}</style>
    </section>
  )
}
