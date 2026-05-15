// Skills.jsx — v2.2.3
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo } from '@fortawesome/free-solid-svg-icons'

function useCountUp(n, inView) {
  const [v, setV] = useState(0)
  const ran = useRef(false)
  useEffect(() => {
    if (!inView || ran.current) return
    ran.current = true
    const start = performance.now(), dur = 1200
    const frame = (now) => {
      const t = Math.min((now-start)/dur,1), e=t<0.5?2*t*t:-1+(4-2*t)*t
      setV(Math.round(e*n))
      if(t<1) requestAnimationFrame(frame); else setV(n)
    }
    requestAnimationFrame(frame)
  }, [inView, n])
  return v
}

const STATS = [
  {color:'#3B82F6',value:3,  suffix:'+', label:'Years Dev'},
  {color:'#EC4899',value:6,  suffix:'+', label:'Years Design'},
  {color:'#F59E0B',value:16, suffix:'+', label:'Projects Done'},
  {color:'#10B981',value:5,  suffix:'/5',label:'Avg. Rating'},
]
const CATS = [
  {icon:faCode,   color:'#3B82F6',label:'Web Development',
   skills:[{n:'HTML & CSS',p:88},{n:'JavaScript',p:52},{n:'React',p:55},{n:'Git & GitHub',p:78},{n:'Python',p:62}]},
  {icon:faPalette,color:'#EC4899',label:'Design & Creative',
   skills:[{n:'Logo Design',p:80},{n:'Banner/Poster',p:82},{n:'Thumbnail',p:85},{n:'UI Design',p:75},{n:'Photo Editing',p:72}]},
  {icon:faBrain,  color:'#00D4FF',label:'AI & Productivity',
   skills:[{n:'AI Prompting',p:92},{n:'AI Coding',p:90},{n:'AI Design',p:85},{n:'Planning',p:88}]},
  {icon:faVideo,  color:'#A855F7',label:'Video Editing',
   skills:[{n:'YouTube Videos',p:72},{n:'Short Reels',p:68},{n:'Animation',p:55},{n:'Ads/Promos',p:60}]},
]

function StatCard({color,value,suffix,label,inView,i,settings}){
  const real = i===0?parseInt(settings?.statsYearsDev??value,10):i===1?parseInt(settings?.statsYearsDesign??value,10):i===2?parseInt(settings?.statsProjects??value,10):value
  const count = useCountUp(real,inView)
  return(
    <motion.div className="flex flex-col items-center text-center p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[color:var(--accent-primary)] transition-colors duration-300"
      initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.4,delay:i*.07}}>
      <div className="text-3xl font-display font-extrabold leading-none" style={{color}}>
        {count}<span className="text-xl opacity-70">{suffix}</span>
      </div>
      <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest mt-2 font-medium">{label}</p>
    </motion.div>
  )
}

function SkillBar({n,p,color,i}){
  return(
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-secondary)]">{n}</span>
        <span className="text-[10px] text-[var(--text-tertiary)] font-mono">{p}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
        <motion.div className="h-full rounded-full" style={{background:color}}
          initial={{width:0}} whileInView={{width:`${p}%`}}
          viewport={{once:true,amount:.8}}
          transition={{duration:.7,delay:.05+i*.06,ease:[.16,1,.3,1]}}/>
      </div>
    </div>
  )
}

export default function Skills({settings}){
  const ref=useRef(null)
  const [inView,setInView]=useState(false)
  useEffect(()=>{
    if(!ref.current)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:.15})
    obs.observe(ref.current);return()=>obs.disconnect()
  },[])

  return(
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="container-xl">
        <motion.div className="text-center mb-10"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Bring</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">Self-rated levels based on real project experience. Actively improving JS &amp; React.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((s,i)=><StatCard key={s.label} {...s} inView={inView} i={i} settings={settings}/>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATS.map((cat,ci)=>(
            <motion.div key={cat.label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4 hover:border-[color:var(--accent-primary)] transition-colors duration-300"
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.45,delay:ci*.08}}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${cat.color}18`,color:cat.color}}>
                  <FontAwesomeIcon icon={cat.icon} className="text-sm"/>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">{cat.label}</h3>
              </div>
              <div className="space-y-3">
                {cat.skills.map((sk,i)=><SkillBar key={sk.n} n={sk.n} p={sk.p} color={cat.color} i={i}/>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
