// ============================================================
// Skills.jsx — v2.2.6
// Full redesign:
//   - section-alt background with dot grid
//   - Stat cards: colored left border, icon, count-up
//   - CSS Grid sidebar layout (stats top, skill bars below)
//   - Shimmer progress bars via .skill-bar-shimmer
//   - Right panel: tabbed (Skills / Tools / Learning)
// ============================================================
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faVideo,
  faFolderOpen, faFire,
} from '@fortawesome/free-solid-svg-icons'

/* ── Stat card data ───────────────────────────────────────── */
const STATS = [
  { value: 3,  suffix: '+', label: 'Years Dev',    icon: faCode,        color: '#3B82F6' },
  { value: 6,  suffix: '+', label: 'Years Design', icon: faPalette,     color: '#EC4899' },
  { value: 16, suffix: '+', label: 'Projects',     icon: faFolderOpen,  color: '#10B981' },
  { value: 5,  suffix: '+', label: 'Languages',    icon: faFire,        color: '#F59E0B' },
]

/* ── Skill bar data ───────────────────────────────────────── */
const SKILL_TABS = {
  Skills: [
    { name: 'HTML & CSS',   pct: 92, color: '#E34F26' },
    { name: 'JavaScript',   pct: 78, color: '#F7DF1E' },
    { name: 'React.js',     pct: 72, color: '#61DAFB' },
    { name: 'Python',       pct: 65, color: '#3776AB' },
    { name: 'Tailwind CSS', pct: 85, color: '#06B6D4' },
    { name: 'Firebase',     pct: 60, color: '#FFCA28' },
  ],
  Tools: [
    { name: 'Figma',          pct: 80, color: '#F24E1E' },
    { name: 'Adobe Ps',       pct: 75, color: '#31A8FF' },
    { name: 'Premiere Pro',   pct: 72, color: '#9999FF' },
    { name: 'VS Code',        pct: 95, color: '#007ACC' },
    { name: 'Git & GitHub',   pct: 70, color: '#F05032' },
    { name: 'Canva',          pct: 88, color: '#00C4CC' },
  ],
  Learning: [
    { name: 'TypeScript',  pct: 38, color: '#3178C6' },
    { name: 'Node.js',     pct: 30, color: '#339933' },
    { name: 'Three.js',    pct: 22, color: '#000000' },
    { name: 'Framer Motion', pct: 55, color: '#FF0055' },
    { name: 'Supabase',    pct: 40, color: '#3FCF8E' },
  ],
}

/* ── Count-up hook ────────────────────────────────────────── */
function useCountUp(target, active) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const dur = 900, start = performance.now()
    const frame = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setN(Math.round(e * target))
      if (t < 1) requestAnimationFrame(frame)
      else setN(target)
    }
    requestAnimationFrame(frame)
  }, [active, target])
  return n
}

/* ── Stat Card ────────────────────────────────────────────── */
function StatCard({ stat, i, inView }) {
  const count = useCountUp(stat.value, inView)
  return (
    <motion.div
      className="stat-card"
      style={{ '--stat-color': stat.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-card-accent" />
      <div className="stat-card-inner">
        <div className="stat-card-icon">
          <FontAwesomeIcon icon={stat.icon} />
        </div>
        <div className="stat-card-text">
          <div className="stat-card-num">
            {count}<span className="stat-card-suffix">{stat.suffix}</span>
          </div>
          <div className="stat-card-label">{stat.label}</div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Skill Bar ────────────────────────────────────────────── */
function SkillBar({ skill, i, inView }) {
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setFilled(true), i * 80 + 120)
    return () => clearTimeout(t)
  }, [inView, i])

  return (
    <div className="skill-bar-row">
      <div className="skill-bar-meta">
        <span className="skill-bar-name">{skill.name}</span>
        <span className="skill-bar-pct">{skill.pct}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className={`skill-bar-fill ${filled ? 'skill-bar-shimmer' : ''}`}
          style={{ '--bar-color': skill.color }}
          initial={{ width: 0 }}
          animate={{ width: filled ? `${skill.pct}%` : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
        />
      </div>
    </div>
  )
}

/* ── Main Component ───────────────────────────────────────── */
export default function Skills() {
  const [tab, setTab] = useState('Skills')
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const tabs = Object.keys(SKILL_TABS)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="container-xl">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
            What I Know
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
            Skills &amp; Experience
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Continuously learning and building — from UI design to full-stack development.
          </p>
        </motion.div>

        {/* Grid: stats top, bars bottom | skills panel right */}
        <div className="skills-layout">
          {/* LEFT: stat cards + description */}
          <div className="skills-left">
            <div className="stat-cards-grid">
              {STATS.map((s, i) => (
                <StatCard key={s.label} stat={s} i={i} inView={inView} />
              ))}
            </div>

            <motion.div
              className="skills-bio"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p>
                Self-taught developer from Bangladesh with a passion for clean code,
                thoughtful UI design, and meaningful digital experiences.
                I combine creativity with technical precision to ship products that work beautifully.
              </p>
              <ul className="skills-bio-list">
                <li><span className="skills-bio-dot" style={{ background: '#3B82F6' }} />Frontend Development</li>
                <li><span className="skills-bio-dot" style={{ background: '#EC4899' }} />Graphic &amp; UI Design</li>
                <li><span className="skills-bio-dot" style={{ background: '#A855F7' }} />Video Production</li>
              </ul>
            </motion.div>
          </div>

          {/* RIGHT: tabbed skill bars */}
          <motion.div
            className="skills-right"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tabs */}
            <div className="skills-tabs">
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`skills-tab ${t === tab ? 'skills-tab-active' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <div className="skills-bars">
              {SKILL_TABS[tab].map((skill, i) => (
                <SkillBar key={`${tab}-${skill.name}`} skill={skill} i={i} inView={inView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Layout ─────────────────────────────────────── */
        .skills-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: start;
        }
        @media (max-width: 768px) {
          .skills-layout { grid-template-columns: 1fr; }
        }

        /* ── Stat cards grid ─────────────────────────── */
        .stat-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        /* ── Stat card ───────────────────────────────── */
        .stat-card {
          position: relative;
          border-radius: 14px;
          border: 1px solid var(--border-color);
          background: var(--bg-elevated, var(--bg-surface-2));
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .stat-card-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3.5px;
          background: var(--stat-color, var(--accent-primary));
          border-radius: 3px 0 0 3px;
        }
        .stat-card-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 16px 16px 20px;
        }
        .stat-card-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 15px;
          background: color-mix(in srgb, var(--stat-color, #3B82F6) 14%, transparent);
          color: var(--stat-color, var(--accent-primary));
        }
        .stat-card-text { flex: 1; min-width: 0; }
        .stat-card-num {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary);
        }
        .stat-card-suffix {
          font-size: 0.75em;
          color: var(--stat-color, var(--accent-primary));
          font-weight: 700;
        }
        .stat-card-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          margin-top: 3px;
        }

        /* ── Bio ─────────────────────────────────────── */
        .skills-bio { }
        .skills-bio p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .skills-bio-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .skills-bio-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.825rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .skills-bio-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          display: inline-block;
        }

        /* ── Tabs ────────────────────────────────────── */
        .skills-tabs {
          display: flex;
          gap: 4px;
          padding: 4px;
          border-radius: 12px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          width: fit-content;
          margin-bottom: 1.5rem;
        }
        .skills-tab {
          padding: 6px 16px;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .skills-tab:hover { color: var(--text-primary); }
        .skills-tab-active {
          background: var(--bg-elevated, var(--bg-surface));
          color: var(--text-primary);
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          border: 1px solid var(--border-color);
        }

        /* ── Skill bar rows ──────────────────────────── */
        .skills-bars {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .skill-bar-row { display: flex; flex-direction: column; gap: 6px; }
        .skill-bar-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .skill-bar-name {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .skill-bar-pct {
          font-size: 0.72rem;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          font-weight: 500;
        }
        .skill-bar-track {
          height: 7px;
          border-radius: 99px;
          background: var(--bg-surface-3);
          overflow: visible;
          position: relative;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: var(--bar-color, var(--accent-primary));
          position: relative;
          box-shadow: 0 0 8px color-mix(in srgb, var(--bar-color, #3B82F6) 50%, transparent);
        }
      `}</style>
    </section>
  )
}
