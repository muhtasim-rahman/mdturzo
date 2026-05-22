// Skills.jsx — v2.2.7
// Redesigned to match uploaded reference (image 2):
//   Left: 2×2 stat cards (colored borders) + bio text + bullet list
//   Right: Tab buttons (Skills/Tools/Learning) + colorful gradient progress bars
//   Premium, not overly colorful — dark surface, subtle accents
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPalette, faBrain, faVideo, faGlobe } from '@fortawesome/free-solid-svg-icons'

function useCountUp(n,inView){
  const [v,setV]=useState(0)
  useEffect(()=>{
    if(!inView)return
    const start=performance.now(),dur=1200
    const frame=now=>{const t=Math.min((now-start)/dur,1),e=t<.5?2*t*t:-1+(4-2*t)*t;setV(Math.round(e*n));if(t<1)requestAnimationFrame(frame);else setV(n)}
    requestAnimationFrame(frame)
  },[inView,n])
  return v
}

// Stat cards — colored left border accents (matching image 2)
const STATS=[
  {label:'Years Dev',    value:3,  suffix:'+',icon:faCode,    color:'#3B82F6',desc:'Web & code'},
  {label:'Years Design', value:6,  suffix:'+',icon:faPalette, color:'#EC4899',desc:'UI & graphics'},
  {label:'Projects',     value:16, suffix:'+',icon:faGlobe,   color:'#10B981',desc:'Shipped & live'},
  {label:'Languages',    value:5,  suffix:'+',icon:faCode,    color:'#F59E0B',desc:'Dev languages'},
]

// Skills by tab — unique gradient color per bar (matching image 2 style)
const TABS = [
  { id:'skills', label:'Skills', items:[
    {n:'HTML & CSS',   p:92, grad:'#e44d26,#f7941d'},
    {n:'JavaScript',   p:78, grad:'#f7df1e,#e5c50c'},
    {n:'React.js',     p:72, grad:'#00d4ff,#0ea5e9'},
    {n:'Python',       p:65, grad:'#3776ab,#5b9bd5'},
    {n:'Tailwind CSS', p:85, grad:'#0ea5e9,#38bdf8'},
    {n:'Firebase',     p:60, grad:'#f5a623,#fbbf24'},
  ]},
  { id:'tools', label:'Tools', items:[
    {n:'VS Code',      p:95, grad:'#0ea5e9,#2563eb'},
    {n:'Figma',        p:80, grad:'#a259ff,#7c3aed'},
    {n:'Git & GitHub', p:82, grad:'#24292e,#6b7280'},
    {n:'Photoshop',    p:70, grad:'#001d34,#31a8ff'},
    {n:'Canva',        p:88, grad:'#00c4cc,#00b4ba'},
  ]},
  { id:'learning', label:'Learning', items:[
    {n:'TypeScript',   p:40, grad:'#3178c6,#60a5fa'},
    {n:'Next.js',      p:35, grad:'#000000,#374151'},
    {n:'Node.js',      p:45, grad:'#417e38,#68a063'},
    {n:'MongoDB',      p:38, grad:'#4ea94b,#22c55e'},
    {n:'Docker',       p:22, grad:'#2496ed,#60a5fa'},
  ]},
]

const BULLETS=[
  {label:'Frontend Development', color:'#3B82F6'},
  {label:'Graphic & UI Design',  color:'#EC4899'},
  {label:'Video Production',     color:'#A855F7'},
]

export default function Skills({settings}){
  const [tab,setTab]     = useState('skills')
  const [visible,setVis] = useState(false)
  const [inView,setInView]= useState(false)
  const ref = useRef(null)

  const yDev   = parseInt(settings?.statsYearsDev    ?? '3',  10)
  const yDes   = parseInt(settings?.statsYearsDesign ?? '6',  10)
  const proj   = parseInt(settings?.statsProjects    ?? '16', 10)
  const statsData = [
    {...STATS[0],value:yDev},
    {...STATS[1],value:yDes},
    {...STATS[2],value:proj},
    STATS[3],
  ]

  useEffect(()=>{
    if(!ref.current)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setInView(true);setVis(true)}},{threshold:.12})
    obs.observe(ref.current)
    return()=>obs.disconnect()
  },[])

  const switchTab=id=>{setTab(id);setVis(false);setTimeout(()=>setVis(true),22)}
  const curTab = TABS.find(t=>t.id===tab)??TABS[0]

  return(
    <section className="section section-alt" id="skills" ref={ref}>
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">What I Know</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Skills &amp; Experience</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-lg mx-auto">
            Continuously learning and building — from UI design to full-stack development.
          </p>
        </motion.div>

        {/* Main 2-col layout */}
        <div className="sk-layout">
          {/* LEFT — stat cards + bio + bullets */}
          <div className="sk-left">
            {/* 2×2 Stat cards */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {statsData.map((s,i)=>{
                const count=useCountUp(s.value,inView)
                return(
                  <motion.div key={s.label} className="sk-stat-card"
                    style={{'--c':s.color}}
                    initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                    viewport={{once:true,amount:.3}} transition={{duration:.38,delay:i*.07}}>
                    <div className="sk-stat-side"/>
                    <div className="sk-stat-icon"><FontAwesomeIcon icon={s.icon}/></div>
                    <div className="sk-stat-num">{count}<span className="sk-stat-suf">{s.suffix}</span></div>
                    <div className="sk-stat-lbl">{s.label}</div>
                    <div className="sk-stat-desc">{s.desc}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bio */}
            <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.45,delay:.15}}>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Self-taught developer from Bangladesh with a passion for clean code, thoughtful
                UI design, and meaningful digital experiences. I combine creativity with technical
                precision to ship products that work beautifully.
              </p>
              <div className="space-y-2">
                {BULLETS.map(b=>(
                  <div key={b.label} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:b.color,boxShadow:`0 0 6px ${b.color}66`}}/>
                    {b.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — tabs + skill bars */}
          <div className="sk-right">
            {/* Tab row */}
            <div className="sk-tabs">
              {TABS.map(t=>(
                <button key={t.id} onClick={()=>switchTab(t.id)}
                  className={`sk-tab ${tab===t.id?'sk-tab--active':''}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}
                transition={{duration:.2}}>
                <div className="space-y-4 mt-4">
                  {curTab.items.map((sk,i)=>(
                    <div key={sk.n} className="sk-bar-item">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">{sk.n}</span>
                        <span className="text-xs font-bold font-mono" style={{color:`#${sk.grad.split(',')[1]?.replace('#','')}`}}>{sk.p}%</span>
                      </div>
                      <div className="sk-bar-track">
                        <motion.div className="sk-bar-fill"
                          style={{'--g':sk.grad}}
                          initial={{width:0}}
                          animate={{width:visible?`${sk.p}%`:0}}
                          transition={{duration:.75,delay:.05+i*.07,ease:[.16,1,.3,1]}}>
                          {/* shimmer */}
                          <span className="sk-shimmer"/>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        /* Layout */
        .sk-layout { display:grid; grid-template-columns:1fr 1fr; gap:2.5rem; align-items:start; }
        @media(max-width:900px){ .sk-layout{grid-template-columns:1fr;gap:2rem} }

        /* Stat cards */
        .sk-stat-card{
          position:relative;overflow:hidden;
          padding:.9rem 1rem;border-radius:14px;
          background:var(--bg-surface);
          border:1px solid var(--border-color);
          border-left:3px solid var(--c);
          transition:transform .2s ease,box-shadow .2s ease;
        }
        .sk-stat-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.15)}
        .sk-stat-side{position:absolute;top:0;right:0;width:55px;height:55px;border-radius:0 14px 0 55px;background:var(--c);opacity:.06;pointer-events:none}
        .sk-stat-icon{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--c) 14%,transparent);color:var(--c);font-size:11px;margin-bottom:.5rem}
        .sk-stat-num{font-size:1.7rem;font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1;margin-bottom:2px}
        .sk-stat-suf{font-size:.5em;font-weight:600;color:var(--c);margin-left:1px}
        .sk-stat-lbl{font-size:.78rem;font-weight:700;color:var(--text-primary);line-height:1.2}
        .sk-stat-desc{font-size:.68rem;color:var(--text-tertiary);margin-top:1px}

        /* Tabs */
        .sk-tabs{display:flex;gap:.5rem;padding:.3rem;background:var(--bg-surface-2);border:1px solid var(--border-color);border-radius:12px;width:fit-content}
        .sk-tab{padding:.4rem .9rem;border-radius:9px;font-size:.83rem;font-weight:600;color:var(--text-tertiary);cursor:pointer;transition:all .18s ease;border:none;background:transparent}
        .sk-tab:hover{color:var(--text-primary)}
        .sk-tab:active{transform:scale(.95)}
        .sk-tab--active{background:var(--accent-primary);color:#fff;box-shadow:0 2px 10px rgba(59,130,246,.28)}

        /* Bars */
        .sk-bar-track{height:9px;border-radius:9999px;background:var(--bg-surface-3,var(--bg-surface-2));overflow:hidden;position:relative}
        .sk-bar-fill{height:100%;border-radius:9999px;position:relative;overflow:hidden;background:linear-gradient(90deg,var(--g))}
        .sk-shimmer{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.4) 45%,rgba(255,255,255,.55) 50%,rgba(255,255,255,.4) 55%,transparent 100%);transform:translateX(-100%);animation:sk-shim 2.8s ease-in-out infinite;border-radius:inherit}
        @keyframes sk-shim{0%{transform:translateX(-100%)}60%{transform:translateX(100%)}100%{transform:translateX(100%)}}
      `}</style>
    </section>
  )
}
