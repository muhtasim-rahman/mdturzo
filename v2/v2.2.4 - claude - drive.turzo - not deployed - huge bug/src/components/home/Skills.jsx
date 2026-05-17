// Skills.jsx — v2.2.4 (redesigned: improved stat cards, sidebar aligned with panel, better progress bars)
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function useCountUp(n, inView) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now(), dur = 1400
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
  { id:'web',  label:'Web Dev',     icon:faCode,    color:'#3B82F6', bg:'rgba(59,130,246,.12)',
    skills:[{n:'HTML & CSS',p:88},{n:'JavaScript',p:52},{n:'React',p:55},{n:'Git & GitHub',p:78},{n:'Python',p:62}] },
  { id:'des',  label:'Design',      icon:faPalette, color:'#EC4899', bg:'rgba(236,72,153,.12)',
    skills:[{n:'Logo Design',p:80},{n:'Banner/Poster',p:82},{n:'Thumbnail',p:85},{n:'UI Design',p:75},{n:'Photo Editing',p:72}] },
  { id:'ai',   label:'AI & Prod.',  icon:faBrain,   color:'#06B6D4', bg:'rgba(6,182,212,.12)',
    skills:[{n:'AI Prompting',p:92},{n:'AI Coding',p:90},{n:'AI Design',p:85},{n:'Planning',p:88}] },
  { id:'vid',  label:'Video',       icon:faVideo,   color:'#A855F7', bg:'rgba(168,85,247,.12)',
    skills:[{n:'YouTube Videos',p:72},{n:'Short Reels',p:68},{n:'Animation',p:55},{n:'Ads/Promos',p:60}] },
]

const HIGHLIGHTS = [
  { label:'Years Dev',    color:'#3B82F6', icon:'⚡' },
  { label:'Years Design', color:'#EC4899', icon:'🎨' },
  { label:'Projects Done',color:'#A855F7', icon:'📦' },
  { label:'Avg. Rating',  color:'#F59E0B', icon:'⭐', suffix:'/5', value:5 },
]

function SkillBar({ n, p, color, i, visible }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)] font-medium">{n}</span>
        <span className="text-[11px] font-bold font-mono" style={{color}}>{p}%</span>
      </div>
      <div className="h-[7px] rounded-full overflow-hidden" style={{background:'var(--bg-surface-3)'}}>
        <motion.div className="h-full rounded-full relative overflow-hidden"
          style={{background:`linear-gradient(90deg,${color}bb,${color})`}}
          initial={{width:0}} animate={{width: visible ? `${p}%` : 0}}
          transition={{duration:.8,delay:.05+i*.09,ease:[.16,1,.3,1]}}>
          {/* Shimmer effect */}
          <span className="absolute inset-0" style={{
            background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.22) 50%,transparent 100%)',
            animation:'skill-shimmer 2s ease-in-out infinite',
            animationDelay: `${i*0.15}s`
          }}/>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color, icon, suffix, inView, i }) {
  const count = useCountUp(value, inView)
  return (
    <motion.div
      className="relative overflow-hidden flex flex-col gap-2 p-4 rounded-2xl border"
      style={{borderColor:`${color}30`, background:`${color}09`}}
      initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.4}} transition={{duration:.4,delay:i*.08}}>
      <div className="flex items-start justify-between">
        <span className="text-xl">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{background:`${color}18`, color}}>{label}</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-extrabold font-display" style={{color}}>{count}</span>
        <span className="text-lg font-bold" style={{color}}>{suffix ?? '+'}</span>
      </div>
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{background:`linear-gradient(90deg,transparent,${color},transparent)`}}/>
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
    HIGHLIGHTS[3],
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
      <style>{`
        @keyframes skill-shimmer {
          0%{transform:translateX(-100%)} 50%,100%{transform:translateX(100%)}
        }
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

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {highlights.map((h,i)=><StatCard key={h.label} {...h} inView={inView} i={i}/>)}
        </div>

        {/* Main layout: tabs + panel with matching alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 items-start">
          {/* Tab sidebar — aligned to panel */}
          <div className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap">
            {CATS.map(c=>(
              <button key={c.id} onClick={()=>{setActive(c.id);setVisible(false);setTimeout(()=>setVisible(true),20)}}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-semibold text-left flex-1 lg:flex-none"
                style={active===c.id ? {
                  background:c.bg,
                  borderColor:`${c.color}50`,
                  color:c.color,
                } : {
                  background:'var(--bg-surface)',
                  borderColor:'var(--border-color)',
                  color:'var(--text-secondary)',
                }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{background:`${c.color}${active===c.id?'22':'14'}`,color:c.color}}>
                  <FontAwesomeIcon icon={c.icon} className="text-xs"/>
                </div>
                <span className="hidden sm:block">{c.label}</span>
                {active===c.id && <FontAwesomeIcon icon={faArrowRight} className="ml-auto text-[10px] hidden lg:block" style={{color:c.color}}/>}
              </button>
            ))}
          </div>

          {/* Skill panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}
              transition={{duration:.2,ease:'easeOut'}}
              className="rounded-2xl border border-[var(--border-color)] overflow-hidden"
              style={{background:'var(--bg-surface)'}}>

              {/* Panel header */}
              <div className="flex items-center gap-3 p-5 border-b border-[var(--border-color)]"
                style={{background:`${cat.color}07`}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{background:`${cat.color}18`,color:cat.color}}>
                  <FontAwesomeIcon icon={cat.icon} className="text-lg"/>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-base">{cat.label}</h3>
                  <p className="text-[11px] text-[var(--text-tertiary)]">{cat.skills.length} skills tracked</p>
                </div>
                <div className="ml-auto h-7 px-3 rounded-full flex items-center text-[11px] font-semibold"
                  style={{background:`${cat.color}14`,color:cat.color}}>
                  Active
                </div>
              </div>

              {/* Skill bars */}
              <div className="p-5 space-y-4">
                {cat.skills.map((sk,i)=>(
                  <SkillBar key={sk.n} n={sk.n} p={sk.p} color={cat.color} i={i} visible={visible}/>
                ))}
              </div>

              <p className="text-[10px] text-[var(--text-tertiary)] px-5 pb-4 pt-1">
                ✦ Self-assessed from real project experience &nbsp;·&nbsp; Actively improving
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
