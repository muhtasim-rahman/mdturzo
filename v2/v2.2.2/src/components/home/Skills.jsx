// Skills.jsx — v2.2.2 (combined Experience & Impact + Skills, redesigned)
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarE } from '@fortawesome/free-regular-svg-icons'

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

const STATS = [
  { icon: faCode,    color:'#3B82F6', value:3,  suffix:'+', label:'Years Dev'       },
  { icon: faPalette, color:'#EC4899', value:6,  suffix:'+', label:'Years Design'    },
  { icon: faVideo,   color:'#A855F7', value:16, suffix:'+', label:'Projects Done'   },
  { icon: faBrain,   color:'#10B981', value:5,  suffix:'/5',label:'Avg. Rating'     },
]

const CATS = [
  { label:'Web Development', icon:faCode, color:'#3B82F6',
    skills:[{n:'HTML & CSS',p:88,s:4},{n:'JavaScript',p:52,s:2.5},{n:'React',p:55,s:2.5},{n:'Git & GitHub',p:78,s:4},{n:'Python',p:62,s:3}] },
  { label:'Design & Creative', icon:faPalette, color:'#EC4899',
    skills:[{n:'Logo Design',p:80,s:4},{n:'Banner/Poster',p:82,s:4},{n:'Thumbnail',p:85,s:4.5},{n:'UI Design',p:75,s:4},{n:'Photo Editing',p:72,s:3.5}] },
  { label:'AI & Productivity', icon:faBrain, color:'#00D4FF',
    skills:[{n:'AI Prompting',p:92,s:4.5},{n:'AI Coding',p:90,s:4.5},{n:'AI Design',p:85,s:4},{n:'Planning',p:88,s:4}] },
  { label:'Video Editing', icon:faVideo, color:'#A855F7',
    skills:[{n:'YouTube Videos',p:72,s:3.5},{n:'Short Reels',p:68,s:3.5},{n:'Animation',p:55,s:3},{n:'Ads/Promos',p:60,s:3}] },
]

function Stars({n}) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(i=>{
    const f=n>=i, h=!f&&n>=i-0.5
    return <FontAwesomeIcon key={i} icon={h?faStarHalfStroke:f?faStar:faStarE} className={`text-[11px] ${f||h?'text-amber-400':'text-[var(--border-strong)]'}`}/>
  })}</div>
}

function StatCard({icon,color,value,suffix,label,inView,i}) {
  const count = useCountUp(value, inView)
  return (
    <motion.div className="card p-5 flex flex-col items-center text-center gap-3"
      initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.3}} transition={{duration:.45,delay:i*.08}}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:`${color}18`,color}}>
        <FontAwesomeIcon icon={icon} className="text-lg"/>
      </div>
      <div>
        <div className="text-2xl font-display font-extrabold" style={{color}}>{count}<span className="text-[var(--text-tertiary)] text-lg">{suffix}</span></div>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

function SkillBar({n,p,s,color,i}) {
  return (
    <motion.div className="space-y-1.5"
      initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}}
      viewport={{once:true,amount:.5}} transition={{duration:.4,delay:i*.05}}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-[var(--text-secondary)]">{n}</span>
        <div className="flex items-center gap-1.5"><Stars n={s}/><span className="text-[10px] text-[var(--text-tertiary)] w-7 text-right">{p}%</span></div>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
        <motion.div className="h-full rounded-full" style={{background:color}}
          initial={{width:0}} whileInView={{width:`${p}%`}} viewport={{once:true,amount:.5}}
          transition={{duration:.75,delay:.1+i*.05,ease:[.16,1,.3,1]}}/>
      </div>
    </motion.div>
  )
}

export default function Skills({settings}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  const yDev = parseInt(settings?.statsYearsDev ?? '3', 10)
  const yDes = parseInt(settings?.statsYearsDesign ?? '6', 10)
  const proj = parseInt(settings?.statsProjects ?? '16', 10)
  const statsData = [
    {...STATS[0], value:yDev},
    {...STATS[1], value:yDes},
    {...STATS[2], value:proj},
    STATS[3],
  ]

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:.2})
    obs.observe(ref.current); return()=>obs.disconnect()
  },[])

  return (
    <section className="section" id="skills">
      <div className="container-xl" ref={ref}>
        <motion.div className="text-center mb-12"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Bring</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills & Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-lg mx-auto">Self-rated levels based on real projects. Actively improving JavaScript & React.</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statsData.map((s,i)=><StatCard key={s.label} {...s} inView={inView} i={i}/>)}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATS.map((cat,ci)=>(
            <motion.div key={cat.label} className="card p-6 space-y-4"
              initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
              viewport={{once:true,amount:.15}} transition={{duration:.5,delay:ci*.1}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${cat.color}18`,color:cat.color}}>
                  <FontAwesomeIcon icon={cat.icon}/>
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)]">{cat.label}</h3>
              </div>
              <div className="space-y-3">
                {cat.skills.map((sk,i)=><SkillBar key={sk.n} n={sk.n} p={sk.p} s={sk.s} color={cat.color} i={i}/>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
