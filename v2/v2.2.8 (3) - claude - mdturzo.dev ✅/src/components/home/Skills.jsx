// Skills.jsx -- v2.2.7
// FULL REDESIGN based on uploaded reference image:
//   * Left: 4 stat cards (years dev, years design, projects, languages) with colored accent
//   * Left below: bio text + specialty list with colored dots
//   * Right: tab selector (Skills / Tools / Learning) + horizontal progress bars
//   * Premium, not too colorful -- muted accent fills
//   * section-alt background

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faBrain, faVideo,
  faGlobe, faLayerGroup, faMicrochip,
} from '@fortawesome/free-solid-svg-icons'

function useCountUp(n, inView) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now(), dur = 1300
    const frame = (now) => {
      const t = Math.min((now-start)/dur, 1), e = t<0.5?2*t*t:-1+(4-2*t)*t
      setV(Math.round(e*n))
      if (t<1) requestAnimationFrame(frame); else setV(n)
    }
    requestAnimationFrame(frame)
  }, [inView, n])
  return v
}

// Tab data
const TABS = [
  {
    id: 'skills',
    label: 'Skills',
    icon: faCode,
    items: [
      { name: 'HTML & CSS',    pct: 92, color: '#F97316' },
      { name: 'JavaScript',   pct: 78, color: '#EAB308' },
      { name: 'React.js',     pct: 72, color: '#06B6D4' },
      { name: 'Python',       pct: 65, color: '#3B82F6' },
      { name: 'Tailwind CSS', pct: 85, color: '#10B981' },
      { name: 'Firebase',     pct: 60, color: '#F59E0B' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: faMicrochip,
    items: [
      { name: 'VS Code',       pct: 95, color: '#3B82F6' },
      { name: 'Figma',         pct: 80, color: '#EC4899' },
      { name: 'Adobe PS',      pct: 74, color: '#A855F7' },
      { name: 'Git & GitHub',  pct: 82, color: '#64748B' },
      { name: 'ChatGPT / AI',  pct: 93, color: '#10B981' },
      { name: 'Canva',         pct: 88, color: '#06B6D4' },
    ],
  },
  {
    id: 'learning',
    label: 'Learning',
    icon: faBrain,
    items: [
      { name: 'TypeScript',    pct: 42, color: '#3B82F6' },
      { name: 'Next.js',       pct: 38, color: '#94A3B8' },
      { name: 'Node.js',       pct: 35, color: '#22C55E' },
      { name: 'Docker',        pct: 22, color: '#0EA5E9' },
      { name: 'GraphQL',       pct: 28, color: '#EC4899' },
      { name: 'PostgreSQL',    pct: 40, color: '#6366F1' },
    ],
  },
]

const SPECIALTIES = [
  { label: 'Frontend Development', color: '#3B82F6', icon: faGlobe    },
  { label: 'Graphic & UI Design',  color: '#EC4899', icon: faPalette  },
  { label: 'Video Production',     color: '#A855F7', icon: faVideo    },
  { label: 'AI-assisted Workflow', color: '#10B981', icon: faBrain    },
]

function SkillBar({ name, pct, color, i, visible }) {
  return (
    <div className="sk2-bar-row">
      <div className="sk2-bar-meta">
        <span className="sk2-bar-name">{name}</span>
        <span className="sk2-bar-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="sk2-bar-track">
        <motion.div
          className="sk2-bar-fill"
          style={{ '--c': color }}
          initial={{ width: 0 }}
          animate={{ width: visible ? `${pct}%` : 0 }}
          transition={{ duration: .72, delay: .05 + i * .07, ease: [.16,1,.3,1] }}
        />
      </div>
    </div>
  )
}

function StatCard({ value, label, suffix, color, subLabel, icon, inView, delay }) {
  const count = useCountUp(value, inView)
  return (
    <motion.div
      className="sk2-stat"
      style={{ '--c': color }}
      initial={{ opacity:0, y:18 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.4 }}
      transition={{ duration:.42, delay }}>
      <div className="sk2-stat-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="sk2-stat-body">
        <div className="sk2-stat-num">
          {count}<span className="sk2-stat-suf">{suffix}</span>
        </div>
        <div className="sk2-stat-label">{label}</div>
      </div>
    </motion.div>
  )
}

export default function Skills({ settings }) {
  const [activeTab, setActiveTab] = useState('skills')
  const [visible,   setVisible  ] = useState(false)
  const [inView,    setInView   ] = useState(false)
  const ref = useRef(null)

  const yDev   = parseInt(settings?.statsYearsDev    ?? '3',  10)
  const yDes   = parseInt(settings?.statsYearsDesign ?? '6',  10)
  const proj   = parseInt(settings?.statsProjects    ?? '16', 10)

  const STAT_CARDS = [
    { value: yDev,  label: 'Years Dev',    suffix: '+', color: '#3B82F6', icon: faCode,      subLabel: 'Web & code' },
    { value: yDes,  label: 'Years Design', suffix: '+', color: '#EC4899', icon: faPalette,   subLabel: 'UI/Graphic' },
    { value: proj,  label: 'Projects',     suffix: '+', color: '#A855F7', icon: faLayerGroup, subLabel: 'Shipped'   },
    { value: 5,     label: 'Languages',    suffix: '+', color: '#F59E0B', icon: faGlobe,     subLabel: 'Code & human' },
  ]

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); setVisible(true) }
    }, { threshold: .15 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const tab = TABS.find(t => t.id === activeTab) ?? TABS[0]
  const switchTab = (id) => {
    setActiveTab(id)
    setVisible(false)
    setTimeout(() => setVisible(true), 22)
  }

  return (
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Know</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Continuously learning and building -- from UI design to full-stack development.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="sk2-layout">
          {/* LEFT -- stat cards + bio */}
          <div className="sk2-left">
            {/* 2x2 stat cards */}
            <div className="sk2-stats-grid">
              {STAT_CARDS.map((s, i) => (
                <StatCard key={s.label} {...s} inView={inView} delay={i * .08} />
              ))}
            </div>

            {/* Bio */}
            <motion.p className="sk2-bio"
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:.4 }} transition={{ duration:.5, delay:.2 }}>
              Self-taught developer from Bangladesh with a passion for clean code, thoughtful
              UI design, and meaningful digital experiences. I combine creativity with technical
              precision to ship products that work beautifully.
            </motion.p>

            {/* Specialties */}
            <motion.div className="sk2-specs"
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:.4 }} transition={{ duration:.5, delay:.3 }}>
              {SPECIALTIES.map(s => (
                <div key={s.label} className="sk2-spec-item">
                  <span className="sk2-spec-dot" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}60` }}/>
                  <span className="sk2-spec-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT -- tabs + bars */}
          <div className="sk2-right">
            {/* Tab selector */}
            <div className="sk2-tabs">
              {TABS.map(t => (
                <button key={t.id} onClick={() => switchTab(t.id)}
                  className={`sk2-tab ${activeTab === t.id ? 'sk2-tab--active' : ''}`}>
                  <FontAwesomeIcon icon={t.icon} className="text-xs" />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Skill bars panel */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity:0, x:12 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-12 }}
                transition={{ duration:.2, ease:'easeOut' }}
                className="sk2-bars-panel">
                {tab.items.map((sk, i) => (
                  <SkillBar key={sk.name} name={sk.name} pct={sk.pct} color={sk.color} i={i} visible={visible} />
                ))}
                <p className="text-[10px] text-[var(--text-tertiary)] pt-3 mt-1 border-t border-[var(--border-color)]">
                  * Self-assessed from real project experience . Actively improving
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        /* -- Two-column layout ------------------------------- */
        .sk2-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .sk2-layout { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        /* -- Stat cards 2x2 grid ----------------------------- */
        .sk2-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .7rem;
          margin-bottom: 1.2rem;
        }
        .sk2-stat {
          position: relative;
          padding: .6rem .8rem .55rem;
          border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 2px solid var(--c);
          display: flex;
          align-items: center;
          gap: .6rem;
          transition: border-color .18s ease;
          cursor: default;
        }
        .sk2-stat:hover {
          border-color: var(--c);
        }
        .sk2-stat-icon {
          width: 28px; height: 28px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--c) 12%, transparent);
          color: var(--c);
          font-size: 11px;
          flex-shrink: 0;
        }
        .sk2-stat-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .sk2-stat-num {
          font-size: 1.2rem; font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
          line-height: 1;
        }
        .sk2-stat-suf {
          font-size: .55em; font-weight: 700;
          color: var(--c); margin-left: 1px;
        }
        .sk2-stat-label {
          font-size: .68rem; font-weight: 500;
          color: var(--text-tertiary);
          white-space: nowrap;
        }

        /* -- Bio --------------------------------------------- */
        .sk2-bio {
          font-size: .83rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        /* -- Specialties ------------------------------------- */
        .sk2-specs {
          display: flex;
          flex-direction: column;
          gap: .45rem;
        }
        .sk2-spec-item {
          display: flex;
          align-items: center;
          gap: .55rem;
        }
        .sk2-spec-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .sk2-spec-label {
          font-size: .82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* -- Tabs -------------------------------------------- */
        .sk2-tabs {
          display: flex;
          gap: .4rem;
          margin-bottom: 1.2rem;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 4px;
        }
        .sk2-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .4rem;
          padding: .45rem .6rem;
          border-radius: 9px;
          font-size: .8rem;
          font-weight: 600;
          color: var(--text-tertiary);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all .18s ease;
          white-space: nowrap;
        }
        .sk2-tab:hover:not(.sk2-tab--active) {
          color: var(--text-secondary);
          background: var(--bg-surface-3);
        }
        .sk2-tab:active { transform: scale(.96); }
        .sk2-tab--active {
          background: var(--bg-surface);
          color: var(--accent-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.08);
          border: 1px solid var(--border-color);
        }

        /* -- Skills panel + bars ----------------------------- */
        .sk2-bars-panel {
          display: flex;
          flex-direction: column;
          gap: .9rem;
        }
        .sk2-bar-row { display: flex; flex-direction: column; gap: 5px; }
        .sk2-bar-meta {
          display: flex; align-items: center; justify-content: space-between;
        }
        .sk2-bar-name {
          font-size: .84rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .sk2-bar-pct {
          font-size: 11px; font-weight: 700;
          font-family: var(--font-mono);
        }
        .sk2-bar-track {
          height: 7px;
          border-radius: 9999px;
          background: var(--bg-surface-3, var(--bg-surface-2));
          overflow: hidden;
          position: relative;
        }
        .sk2-bar-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg,
            color-mix(in srgb, var(--c) 65%, transparent),
            var(--c)
          );
          position: relative;
          overflow: hidden;
        }
        .sk2-bar-fill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,.35) 45%,
            rgba(255,255,255,.52) 50%,
            rgba(255,255,255,.35) 55%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: sk2-shimmer 2.8s ease-in-out infinite;
          border-radius: inherit;
        }
        @keyframes sk2-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
