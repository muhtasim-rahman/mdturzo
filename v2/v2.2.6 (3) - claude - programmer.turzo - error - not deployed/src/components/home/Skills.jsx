// Skills.jsx — v2.2.6 (TASK 2 redesign)
// 2a: section-alt bg
// 2b: stat cards with colored left border + hover lift + count-up
// 2c: sidebar tabs in CSS Grid 180px+1fr, aligned to panel top
// 2d: shimmer progress bars (8px, gradient fill, ::after animation)
// 2e: all CSS variables, both themes polished
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo } from '@fortawesome/free-solid-svg-icons'

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
  { id:'web',  label:'Web Dev',    icon:faCode,    color:'#3B82F6',
    skills:[{n:'HTML & CSS',p:88},{n:'JavaScript',p:52},{n:'React',p:55},{n:'Git & GitHub',p:78},{n:'Python',p:62}] },
  { id:'des',  label:'Design',     icon:faPalette, color:'#EC4899',
    skills:[{n:'Logo Design',p:80},{n:'Banner/Poster',p:82},{n:'Thumbnail',p:85},{n:'UI Design',p:75},{n:'Photo Editing',p:72}] },
  { id:'ai',   label:'AI & Prod.', icon:faBrain,   color:'#00D4FF',
    skills:[{n:'AI Prompting',p:92},{n:'AI Coding',p:90},{n:'AI Design',p:85},{n:'Planning',p:88}] },
  { id:'vid',  label:'Video',      icon:faVideo,   color:'#A855F7',
    skills:[{n:'YouTube Videos',p:72},{n:'Short Reels',p:68},{n:'Animation',p:55},{n:'Ads/Promos',p:60}] },
]

// Task 2b: 4 stat cards with colored accent
const STAT_ACCENTS = ['#3B82F6','#EC4899','#A855F7','#F59E0B']

function StatCard({ label, value, color, suffix, inView, i }) {
  const count = useCountUp(value, inView)
  return (
    <motion.div
      className="sk-stat-card"
      style={{ '--accent': color, '--i': i }}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.4 }}
      transition={{ duration:.4, delay: i * 0.06 }}
      whileHover={{ y:-3, boxShadow:`0 8px 24px ${color}22` }}>
      {/* Colored left border accent */}
      <div className="sk-stat-accent" style={{ background: color }}/>
      <div className="sk-stat-body">
        <span className="sk-stat-num" style={{ color }}>
          {count}{suffix ?? '+'}
        </span>
        <span className="sk-stat-lbl">{label}</span>
      </div>
    </motion.div>
  )
}

// Task 2d: shimmer progress bars
function SkillBar({ n, p, color, i, visible }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)] font-medium">{n}</span>
        <span className="text-[11px] font-bold font-mono" style={{color}}>{p}%</span>
      </div>
      <div className="sk-bar-track">
        <motion.div
          className="sk-bar-fill"
          style={{ background:`linear-gradient(90deg,${color}cc,${color})` }}
          initial={{ width:0 }}
          animate={{ width: visible ? `${p}%` : 0 }}
          transition={{ duration:.7, delay:.05+i*.07, ease:[.16,1,.3,1] }}>
          {/* Shimmer ::after is in CSS */}
          <span className="sk-bar-shimmer" aria-hidden="true"/>
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills({settings}) {
  const [active, setActive] = useState('web')
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  const yDev = parseInt(settings?.statsYearsDev ?? '3', 10)
  const yDes = parseInt(settings?.statsYearsDesign ?? '6', 10)
  const proj = parseInt(settings?.statsProjects ?? '16', 10)
  const HIGHLIGHTS = [
    { label:'Years Dev',    value:yDev, color:'#3B82F6' },
    { label:'Years Design', value:yDes, color:'#EC4899'  },
    { label:'Projects Done',value:proj, color:'#A855F7'  },
    { label:'Avg. Rating',  value:5,    color:'#F59E0B', suffix:'/5' },
  ]

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setInView(true); setVisible(true) }
    },{threshold:.15})
    obs.observe(ref.current)
    return()=>obs.disconnect()
  },[])

  const cat = CATS.find(c=>c.id===active) ?? CATS[0]

  return (
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="container-xl">
        <motion.div className="text-center mb-10"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Bring</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Self-rated levels based on real projects. Actively growing every day.
          </p>
        </motion.div>

        {/* Task 2b: 4 stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {HIGHLIGHTS.map((h,i)=>(
            <StatCard key={h.label} {...h} inView={inView} i={i} />
          ))}
        </div>

        {/* Task 2c: CSS Grid 180px sidebar + 1fr panel */}
        <div className="sk-layout">
          {/* Sidebar tabs */}
          <div className="sk-tabs">
            {CATS.map(c=>(
              <button key={c.id}
                onClick={()=>{setActive(c.id);setVisible(false);setTimeout(()=>setVisible(true),20)}}
                className="sk-tab"
                style={active===c.id ? {
                  background:`${c.color}14`,
                  borderColor:`${c.color}50`,
                  color:c.color,
                } : {
                  background:'var(--bg-surface-2)',
                  borderColor:'var(--border-color)',
                  color:'var(--text-secondary)',
                }}>
                <div className="sk-tab-icon" style={{background:`${c.color}${active===c.id?'22':'14'}`,color:c.color}}>
                  <FontAwesomeIcon icon={c.icon} className="text-xs"/>
                </div>
                <span className="sk-tab-label">{c.label}</span>
                {active===c.id && <span className="sk-tab-dot" style={{background:c.color}}/>}
              </button>
            ))}
          </div>

          {/* Skill bars panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}}
              transition={{duration:.22,ease:'easeOut'}}
              className="card p-6 space-y-4">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:`${cat.color}18`,color:cat.color}}>
                  <FontAwesomeIcon icon={cat.icon}/>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">{cat.label}</h3>
                  <p className="text-[11px] text-[var(--text-tertiary)]">{cat.skills.length} skills tracked</p>
                </div>
              </div>
              <div className="space-y-5">
                {cat.skills.map((sk,i)=>(
                  <SkillBar key={sk.n} n={sk.n} p={sk.p} color={cat.color} i={i} visible={visible}/>
                ))}
              </div>
              <p className="text-[10px] text-[var(--text-tertiary)] pt-2 border-t border-[var(--border-color)]">
                ✦ Self-assessed from real project experience &nbsp;·&nbsp; Actively improving
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Task 2 styles */}
      <style>{`
        /* Task 2b: stat cards */
        .sk-stat-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-default);
          border-radius: 16px;
          overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease;
          cursor: default;
        }
        .sk-stat-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3.5px;
          border-radius: 999px 0 0 999px;
        }
        .sk-stat-body { display: flex; flex-direction: column; gap: 4px; padding-left: 4px; }
        .sk-stat-num {
          font-size: clamp(1.4rem, 2.5vw, 1.75rem);
          font-weight: 800;
          font-family: var(--font-display);
          line-height: 1;
        }
        .sk-stat-lbl {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 600;
        }

        /* Task 2c: layout grid */
        .sk-layout {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .sk-layout { grid-template-columns: 1fr; }
          .sk-tabs { display: grid; grid-template-columns: 1fr 1fr; }
        }

        /* Sidebar tabs */
        .sk-tabs {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sk-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid;
          font-size: 0.82rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all .18s ease;
          position: relative;
        }
        .sk-tab:hover { opacity: 0.9; }
        .sk-tab-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sk-tab-label { flex: 1; min-width: 0; }
        .sk-tab-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Task 2d: shimmer progress bars */
        .sk-bar-track {
          height: 8px;
          border-radius: 4px;
          background: var(--bg-surface-3);
          overflow: hidden;
          position: relative;
        }
        .sk-bar-fill {
          height: 100%;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        .sk-bar-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.32) 50%, transparent 100%);
          animation: shimmer-slide 1.4s ease 0.4s 1 forwards;
          transform: translateX(-100%);
        }
      `}</style>
    </section>
  )
}
