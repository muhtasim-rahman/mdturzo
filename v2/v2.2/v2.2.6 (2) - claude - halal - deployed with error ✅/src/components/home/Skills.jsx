// Skills.jsx — v2.2.6
// CHANGES:
//   • section-alt background
//   • 4 stat cards with colored left-accent border + count-up + hover lift effect
//   • Sidebar tabs in 180px+1fr CSS grid, properly aligned to panel
//   • 8px shimmer progress bars with gradient fill and ::after shimmer animation
//   • scroll-snap-align: start on section (via .section class in index.css)
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'

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

const CATS = [
  { id:'web',  label:'Web Dev',     icon:faCode,    color:'#3B82F6',
    skills:[{n:'HTML & CSS',p:88},{n:'JavaScript',p:52},{n:'React',p:55},{n:'Git & GitHub',p:78},{n:'Python',p:62}] },
  { id:'des',  label:'Design',      icon:faPalette, color:'#EC4899',
    skills:[{n:'Logo Design',p:80},{n:'Banner/Poster',p:82},{n:'Thumbnail',p:85},{n:'UI Design',p:75},{n:'Photo Editing',p:72}] },
  { id:'ai',   label:'AI & Prod.', icon:faBrain,   color:'#00D4FF',
    skills:[{n:'AI Prompting',p:92},{n:'AI Coding',p:90},{n:'AI Design',p:85},{n:'Planning',p:88}] },
  { id:'vid',  label:'Video',       icon:faVideo,   color:'#A855F7',
    skills:[{n:'YouTube Videos',p:72},{n:'Short Reels',p:68},{n:'Animation',p:55},{n:'Ads/Promos',p:60}] },
]

// Stat card data — values overridden by settings props
const STAT_DEFS = [
  { key:'yDev',  label:'Years Dev',    suffix:'+', color:'#3B82F6', subLabel:'Web & code experience' },
  { key:'yDes',  label:'Years Design', suffix:'+', color:'#EC4899', subLabel:'Graphic & UI design'   },
  { key:'proj',  label:'Projects Done',suffix:'+', color:'#A855F7', subLabel:'Shipped & deployed'     },
  { key:'rating',label:'Avg. Rating',  suffix:'/5',color:'#F59E0B', subLabel:'Client satisfaction'   },
]

function StatCard({ label, value, suffix, color, subLabel, inView, delay }) {
  const count = useCountUp(value, inView)
  return (
    <motion.div
      className="sk-stat-card"
      style={{ '--accent': color }}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.4 }}
      transition={{ duration:.42, delay }}>
      <div className="sk-stat-accent" />
      <div className="sk-stat-icon-ring">
        <FontAwesomeIcon icon={faArrowTrendUp} />
      </div>
      <div className="sk-stat-num">
        {count}<span className="sk-stat-suf">{suffix}</span>
      </div>
      <div className="sk-stat-label">{label}</div>
      <div className="sk-stat-sub">{subLabel}</div>
    </motion.div>
  )
}

// v2.2.6: 8px shimmer progress bar with gradient fill + ::after shimmer sweep
function SkillBar({ n, p, color, i, visible }) {
  return (
    <div className="sk-bar-wrap">
      <div className="sk-bar-header">
        <span className="sk-bar-name">{n}</span>
        <span className="sk-bar-pct" style={{ color }}>{p}%</span>
      </div>
      <div className="sk-bar-track">
        <motion.div
          className="sk-bar-fill"
          style={{ '--bar-color': color, '--bar-w': `${p}%` }}
          initial={{ width: 0 }}
          animate={{ width: visible ? `${p}%` : 0 }}
          transition={{ duration:.75, delay:.06+i*.08, ease:[.16,1,.3,1] }}
        />
      </div>
    </div>
  )
}

export default function Skills({ settings }) {
  const [active, setActive]   = useState('web')
  const [visible, setVisible] = useState(false)
  const [inView, setInView]   = useState(false)
  const ref = useRef(null)

  const yDev   = parseInt(settings?.statsYearsDev    ?? '3',  10)
  const yDes   = parseInt(settings?.statsYearsDesign ?? '6',  10)
  const proj   = parseInt(settings?.statsProjects    ?? '16', 10)
  const rating = 5

  const stats = [
    { ...STAT_DEFS[0], value: yDev   },
    { ...STAT_DEFS[1], value: yDes   },
    { ...STAT_DEFS[2], value: proj   },
    { ...STAT_DEFS[3], value: rating },
  ]

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); setVisible(true) }
    }, { threshold:.15 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const cat = CATS.find(c => c.id === active) ?? CATS[0]
  const switchTab = (id) => {
    setActive(id)
    setVisible(false)
    setTimeout(() => setVisible(true), 24)
  }

  return (
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Bring</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Self-rated levels based on real projects. Actively growing every day.
          </p>
        </motion.div>

        {/* v2.2.6: Stat cards — colored left-accent border + hover lift */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <StatCard key={s.key} {...s} inView={inView} delay={i * .08} />
          ))}
        </div>

        {/* v2.2.6: 180px sidebar + 1fr panel CSS grid */}
        <div className="sk-layout">
          {/* Sidebar tabs */}
          <div className="sk-tabs">
            {CATS.map(c => (
              <button key={c.id} onClick={() => switchTab(c.id)}
                className={`sk-tab ${active === c.id ? 'sk-tab--active' : ''}`}
                style={{ '--tab-color': c.color }}>
                <div className="sk-tab-icon">
                  <FontAwesomeIcon icon={c.icon} />
                </div>
                <span className="sk-tab-label">{c.label}</span>
                {active === c.id && (
                  <span className="sk-tab-dot" />
                )}
              </button>
            ))}
          </div>

          {/* Skills panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, x:14 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-14 }}
              transition={{ duration:.22, ease:'easeOut' }}
              className="card p-6">
              {/* Panel header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background:`${cat.color}18`, color:cat.color }}>
                  <FontAwesomeIcon icon={cat.icon} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">{cat.label}</h3>
                  <p className="text-[11px] text-[var(--text-tertiary)]">{cat.skills.length} skills tracked</p>
                </div>
              </div>

              {/* v2.2.6: 8px shimmer bars */}
              <div className="space-y-5">
                {cat.skills.map((sk, i) => (
                  <SkillBar key={sk.n} n={sk.n} p={sk.p} color={cat.color} i={i} visible={visible} />
                ))}
              </div>

              <p className="text-[10px] text-[var(--text-tertiary)] pt-4 mt-4 border-t border-[var(--border-color)]">
                ✦ Self-assessed from real project experience &nbsp;·&nbsp; Actively improving
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        /* ── Stat Cards ─────────────────────────────────── */
        .sk-stat-card {
          position: relative;
          padding: 1.1rem 1.1rem 1rem;
          border-radius: 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--accent);
          overflow: hidden;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
          cursor: default;
        }
        .sk-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 32px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.04);
          border-color: var(--accent);
        }
        .sk-stat-accent {
          position: absolute;
          top: 0; right: 0;
          width: 80px; height: 80px;
          border-radius: 0 16px 0 80px;
          background: var(--accent);
          opacity: .06;
          pointer-events: none;
        }
        .sk-stat-icon-ring {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          color: var(--accent);
          font-size: 12px;
          margin-bottom: .6rem;
        }
        .sk-stat-num {
          font-size: 1.85rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 4px;
        }
        .sk-stat-suf {
          font-size: .55em;
          font-weight: 600;
          color: var(--accent);
          margin-left: 2px;
        }
        .sk-stat-label {
          font-size: .78rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .sk-stat-sub {
          font-size: .7rem;
          color: var(--text-tertiary);
        }

        /* ── Layout grid ─────────────────────────────────── */
        .sk-layout {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .sk-layout {
            grid-template-columns: 1fr;
          }
          .sk-tabs {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: .5rem;
          }
        }
        @media (max-width: 420px) {
          .sk-tabs {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── Sidebar tabs ─────────────────────────────────── */
        .sk-tabs {
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }
        .sk-tab {
          display: flex;
          align-items: center;
          gap: .7rem;
          width: 100%;
          padding: .7rem .9rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-secondary);
          font-size: .84rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all .18s ease;
          position: relative;
        }
        .sk-tab:hover:not(.sk-tab--active) {
          background: var(--bg-surface-2);
          color: var(--text-primary);
          border-color: var(--border-strong);
          transform: translateX(2px);
        }
        .sk-tab:active {
          transform: scale(.97);
        }
        .sk-tab--active {
          background: color-mix(in srgb, var(--tab-color) 12%, transparent);
          border-color: color-mix(in srgb, var(--tab-color) 42%, transparent);
          color: var(--tab-color);
        }
        .sk-tab-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
          background: color-mix(in srgb, var(--tab-color) 14%, transparent);
          color: var(--tab-color);
          transition: background .18s ease;
        }
        .sk-tab--active .sk-tab-icon {
          background: color-mix(in srgb, var(--tab-color) 22%, transparent);
        }
        .sk-tab-label {
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sk-tab-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--tab-color);
          flex-shrink: 0;
          box-shadow: 0 0 6px var(--tab-color);
        }

        /* ── v2.2.6: 8px shimmer progress bars ──────────────── */
        .sk-bar-wrap { display: flex; flex-direction: column; gap: 6px; }
        .sk-bar-header {
          display: flex; align-items: center; justify-content: space-between;
        }
        .sk-bar-name { font-size: .85rem; color: var(--text-secondary); font-weight: 500; }
        .sk-bar-pct  { font-size: 11px; font-weight: 700; font-family: var(--font-mono); }
        .sk-bar-track {
          height: 8px;
          border-radius: 9999px;
          background: var(--bg-surface-3, var(--bg-surface-2));
          overflow: hidden;
          position: relative;
        }
        .sk-bar-fill {
          height: 100%;
          border-radius: 9999px;
          position: relative;
          background: linear-gradient(90deg,
            color-mix(in srgb, var(--bar-color) 70%, transparent),
            var(--bar-color)
          );
          overflow: hidden;
        }
        /* Shimmer sweep animation */
        .sk-bar-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.38) 45%,
            rgba(255,255,255,0.55) 50%,
            rgba(255,255,255,0.38) 55%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: sk-shimmer 2.6s ease-in-out infinite;
          border-radius: inherit;
        }
        @keyframes sk-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
