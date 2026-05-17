// Skills.jsx — v2.2.4
// Changes: section-alt bg, improved stat pill cards, redesigned progress bars,
//          sidebar buttons aligned with right content div, full theme redesign
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
  { id:'web',  label:'Web Dev',     icon:faCode,    color:'#3B82F6', gColor:'rgba(59,130,246,',
    skills:[{n:'HTML & CSS',p:88},{n:'JavaScript',p:52},{n:'React',p:55},{n:'Git & GitHub',p:78},{n:'Python',p:62}] },
  { id:'des',  label:'Design',      icon:faPalette, color:'#EC4899', gColor:'rgba(236,72,153,',
    skills:[{n:'Logo Design',p:80},{n:'Banner/Poster',p:82},{n:'Thumbnail',p:85},{n:'UI Design',p:75},{n:'Photo Editing',p:72}] },
  { id:'ai',   label:'AI & Prod.',  icon:faBrain,   color:'#06B6D4', gColor:'rgba(6,182,212,',
    skills:[{n:'AI Prompting',p:92},{n:'AI Coding',p:90},{n:'AI Design',p:85},{n:'Planning',p:88}] },
  { id:'vid',  label:'Video',       icon:faVideo,   color:'#A855F7', gColor:'rgba(168,85,247,',
    skills:[{n:'YouTube Videos',p:72},{n:'Short Reels',p:68},{n:'Animation',p:55},{n:'Ads/Promos',p:60}] },
]

const HIGHLIGHTS = [
  { label:'Years Dev',    icon:'💻', color:'#3B82F6', bg:'rgba(59,130,246,' },
  { label:'Years Design', icon:'🎨', color:'#EC4899', bg:'rgba(236,72,153,' },
  { label:'Projects Done',icon:'🚀', color:'#A855F7', bg:'rgba(168,85,247,' },
  { label:'Avg. Rating',  icon:'⭐', color:'#F59E0B', bg:'rgba(245,158,11,', suffix:'/5' },
]

function SkillBar({ n, p, color, gColor, i, visible }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{n}</span>
        <span className="skill-bar-pct" style={{color}}>{p}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{background:`linear-gradient(90deg,${gColor}0.7),${color})`}}
          initial={{width:0}}
          animate={{width: visible ? `${p}%` : 0}}
          transition={{duration:.75,delay:.06+i*.08,ease:[.16,1,.3,1]}}
        />
        <motion.div
          className="skill-bar-dot"
          style={{background:color,boxShadow:`0 0 6px ${color}`}}
          initial={{left:0}}
          animate={{left: visible ? `${p}%` : 0}}
          transition={{duration:.75,delay:.06+i*.08,ease:[.16,1,.3,1]}}
        />
      </div>
    </div>
  )
}

function StatPill({ label, value, color, bg, suffix, icon, inView }) {
  const count = useCountUp(value, inView)
  return (
    <motion.div
      className="stat-pill"
      style={{'--pill-color':color,'--pill-bg':`${bg}0.1)`,'--pill-border':`${bg}0.25)`}}
      initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}}
      transition={{duration:.45}}>
      <div className="stat-pill-icon">{icon}</div>
      <div className="stat-pill-num">
        {count}<span className="stat-pill-suf">{suffix ?? '+'}</span>
      </div>
      <div className="stat-pill-lbl">{label}</div>
    </motion.div>
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
  const highlights = [
    {...HIGHLIGHTS[0], value:yDev},
    {...HIGHLIGHTS[1], value:yDes},
    {...HIGHLIGHTS[2], value:proj},
    {...HIGHLIGHTS[3], value:5},
  ]

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setInView(true); setVisible(true) }
    },{threshold:.12})
    obs.observe(ref.current)
    return()=>obs.disconnect()
  },[])

  const cat = CATS.find(c=>c.id===active) ?? CATS[0]

  return (
    <section className="section section-alt" id="skills" ref={ref}>
      <style>{`
        .stat-pill{
          display:flex;flex-direction:column;align-items:center;gap:6px;
          padding:1.1rem .75rem;border-radius:18px;
          background:var(--pill-bg,rgba(59,130,246,.1));
          border:1px solid var(--pill-border,rgba(59,130,246,.2));
          transition:transform .2s ease,box-shadow .2s ease;
          cursor:default;
        }
        .stat-pill:hover{transform:translateY(-3px);box-shadow:0 8px 24px var(--pill-bg,rgba(59,130,246,.15))}
        .stat-pill-icon{font-size:1.5rem;line-height:1}
        .stat-pill-num{font-family:var(--font-display);font-weight:800;font-size:1.65rem;color:var(--pill-color);line-height:1}
        .stat-pill-suf{font-size:.75em;opacity:.8}
        .stat-pill-lbl{font-size:.6rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-tertiary);font-weight:600;text-align:center;line-height:1.2}

        .skill-bar-item{display:flex;flex-direction:column;gap:6px}
        .skill-bar-header{display:flex;align-items:center;justify-content:space-between}
        .skill-bar-name{font-size:.85rem;color:var(--text-secondary);font-weight:500}
        .skill-bar-pct{font-size:.75rem;font-weight:700;font-family:var(--font-mono)}
        .skill-bar-track{position:relative;height:8px;border-radius:99px;background:var(--bg-surface-3);overflow:visible}
        .skill-bar-fill{position:absolute;left:0;top:0;height:100%;border-radius:99px}
        .skill-bar-dot{
          position:absolute;top:50%;transform:translateY(-50%) translateX(-50%);
          width:12px;height:12px;border-radius:50%;
          border:2px solid var(--bg-surface);
          z-index:1;
        }

        .skills-layout{display:grid;grid-template-columns:200px 1fr;gap:1.25rem;align-items:start}
        @media(max-width:1023px){.skills-layout{grid-template-columns:1fr}}
        .skills-tabs{display:flex;flex-direction:column;gap:.5rem}
        @media(max-width:1023px){.skills-tabs{flex-direction:row;flex-wrap:wrap}}
        .skills-tab{
          display:flex;align-items:center;gap:.75rem;
          padding:.7rem 1rem;border-radius:.75rem;
          border:1px solid var(--border-color);
          background:var(--bg-surface-2);
          color:var(--text-secondary);
          font-size:.83rem;font-weight:600;
          cursor:pointer;transition:all .18s ease;
          text-align:left;width:100%;
        }
        @media(max-width:1023px){.skills-tab{flex:1;min-width:120px}}
        .skills-tab:hover{background:var(--bg-surface);border-color:var(--border-strong)}
        .skills-tab.active{color:var(--tab-color);background:var(--tab-bg);border-color:var(--tab-border)}
        .skills-tab-icon{width:32px;height:32px;border-radius:.5rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.85rem}
        .skills-tab-dot{width:6px;height:6px;border-radius:50%;background:currentColor;margin-left:auto;opacity:.7;flex-shrink:0}
        .skills-panel-header{display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid var(--border-color)}
        .skills-panel-icon{width:42px;height:42px;border-radius:.75rem;display:flex;align-items:center;justify-content:center}
        .skills-panel-meta p{font-size:.65rem;color:var(--text-tertiary)}
      `}</style>
      <div className="container-xl">
        <motion.div className="text-center mb-10"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Bring</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Self-rated levels based on real projects. Actively growing every day.
          </p>
        </motion.div>

        {/* Stat pills — improved */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {highlights.map(h=><StatPill key={h.label} {...h} inView={inView}/>)}
        </div>

        {/* Tab + panel layout */}
        <div className="skills-layout">
          {/* Tab list */}
          <div className="skills-tabs">
            {CATS.map(c=>(
              <button key={c.id}
                onClick={()=>{setActive(c.id);setVisible(false);setTimeout(()=>setVisible(true),20)}}
                className={`skills-tab${active===c.id?' active':''}`}
                style={{'--tab-color':c.color,'--tab-bg':`${c.color}14`,'--tab-border':`${c.color}45`}}>
                <div className="skills-tab-icon" style={{background:`${c.color}${active===c.id?'22':'14'}`,color:c.color}}>
                  <FontAwesomeIcon icon={c.icon} className="text-xs"/>
                </div>
                <span>{c.label}</span>
                {active===c.id && <span className="skills-tab-dot"/>}
              </button>
            ))}
          </div>

          {/* Skill bars panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}}
              transition={{duration:.22,ease:'easeOut'}}
              className="rounded-2xl p-6 border border-[var(--border-color)] bg-[var(--bg-surface)]"
              style={{boxShadow:'var(--shadow-md)'}}>
              <div className="skills-panel-header">
                <div className="skills-panel-icon" style={{background:`${cat.color}18`,color:cat.color}}>
                  <FontAwesomeIcon icon={cat.icon} className="text-lg"/>
                </div>
                <div className="skills-panel-meta">
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">{cat.label}</h3>
                  <p>{cat.skills.length} skills tracked</p>
                </div>
              </div>
              <div className="space-y-5">
                {cat.skills.map((sk,i)=>(
                  <SkillBar key={sk.n} n={sk.n} p={sk.p} color={cat.color} gColor={cat.gColor} i={i} visible={visible}/>
                ))}
              </div>
              <p className="text-[10px] text-[var(--text-tertiary)] pt-4 mt-4 border-t border-[var(--border-color)]">
                ✦ Self-assessed from real project experience &nbsp;·&nbsp; Actively improving
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
