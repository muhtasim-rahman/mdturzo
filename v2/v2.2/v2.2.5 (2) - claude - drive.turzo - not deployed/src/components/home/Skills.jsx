// Skills.jsx — v2.2.5 (redesigned — vertical tabs + animated bars)
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarE } from '@fortawesome/free-regular-svg-icons'

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
  { id:'ai',   label:'AI & Prod.',  icon:faBrain,   color:'#00D4FF',
    skills:[{n:'AI Prompting',p:92},{n:'AI Coding',p:90},{n:'AI Design',p:85},{n:'Planning',p:88}] },
  { id:'vid',  label:'Video',       icon:faVideo,   color:'#A855F7',
    skills:[{n:'YouTube Videos',p:72},{n:'Short Reels',p:68},{n:'Animation',p:55},{n:'Ads/Promos',p:60}] },
]

const HIGHLIGHTS = [
  { label:'Years Dev',    value:3,  color:'#3B82F6' },
  { label:'Years Design', value:6,  color:'#EC4899' },
  { label:'Projects Done',value:16, color:'#A855F7' },
  { label:'Avg. Rating',  value:5,  color:'#F59E0B', suffix:'/5' },
]

function SkillBar({ n, p, color, i, visible }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)] font-medium">{n}</span>
        <span className="text-[11px] font-bold font-mono" style={{color}}>{p}%</span>
      </div>
      <div className="h-[6px] rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{background:`linear-gradient(90deg,${color}cc,${color})`}}
          initial={{width:0}}
          animate={{width: visible ? `${p}%` : 0}}
          transition={{duration:.7,delay:.05+i*.07,ease:[.16,1,.3,1]}}
        />
      </div>
    </div>
  )
}

function StatPill({ label, value, color, suffix, inView }) {
  const count = useCountUp(value, inView)
  return (
    <motion.div
      className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-2)]"
      initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}}
      transition={{duration:.4}}>
      <span className="text-2xl font-display font-extrabold" style={{color}}>
        {count}{suffix ?? '+'}
      </span>
      <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">{label}</span>
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
    <section className="section" id="skills" ref={ref}>
      <div className="container-xl">
        <motion.div className="text-center mb-10"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Bring</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Self-rated levels based on real projects. Actively growing every day.
          </p>
        </motion.div>

        {/* Stat pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {highlights.map(h=><StatPill key={h.label} {...h} inView={inView}/>)}
        </div>

        {/* Tab + panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
          {/* Tab list */}
          <div className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap">
            {CATS.map(c=>(
              <button key={c.id} onClick={()=>{setActive(c.id);setVisible(false);setTimeout(()=>setVisible(true),20)}}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-semibold text-left flex-1 lg:flex-none"
                style={active===c.id ? {
                  background:`${c.color}14`,
                  borderColor:`${c.color}50`,
                  color:c.color,
                } : {
                  background:'var(--bg-surface-2)',
                  borderColor:'var(--border-color)',
                  color:'var(--text-secondary)',
                }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{background:`${c.color}${active===c.id?'22':'14'}`,color:c.color}}>
                  <FontAwesomeIcon icon={c.icon} className="text-xs"/>
                </div>
                <span>{c.label}</span>
                {active===c.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:c.color}}/>
                )}
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${cat.color}18`,color:cat.color}}>
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
    </section>
  )
}
