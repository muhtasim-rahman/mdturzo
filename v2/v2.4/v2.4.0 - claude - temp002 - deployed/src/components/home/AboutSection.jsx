// AboutSection.jsx -- v2.3.6 (renamed from AboutMini.jsx)
// PREVIOUS (v2.2.5) Task 13 fixes:
//   - "Read Full Story" button: hover:scale removed (kept other hover effects)
//   - Grid centered: justify-items:center on the grid
//   - Light mode image overlay: ?20% opacity (was 85%)
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faGraduationCap, faHeart, faArrowRight, faLanguage, faLaptopCode, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'

const FACTS = [
  { icon:faLocationDot,   color:'#3B82F6', label:'Location', value:'Nilphamari, Bangladesh'       },
  { icon:faGraduationCap, color:'#10B981', label:'School',   value:'SSC-26 \u00b7 SGSC'           },
  { icon:faLaptopCode,    color:'#F59E0B', label:'Goal',     value:'CSE Engineer & Developer'      },
  { icon:faLanguage,      color:'#EC4899', label:'Languages',value:'Bengali \u00b7 English \u00b7 Hindi'},
  { icon:faHeart,         color:'#A855F7', label:'Values',   value:'Islam \u00b7 Discipline \u00b7 Quality'},
]

const up = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.5,ease:[.16,1,.3,1]}} }

export default function AboutSection() {
  const age = calculateAge()
  return (
    <section className="section section-alt" id="about-mini">
      <div className="container-xl">
        {/* Grid — two columns on lg+, no extra centering offset */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image -- larger on PC */}
          <motion.div className="relative flex justify-center"
            initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}}
            viewport={{once:true,amount:.2}} transition={{duration:.6,ease:[.16,1,.3,1]}}>
            <div className="relative w-72 sm:w-80 lg:w-96">
              <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-[var(--accent-primary)] opacity-20"/>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-[var(--border-strong)] bg-[var(--bg-surface-2)] shadow-[var(--shadow-xl)]">
                {/* Task 13: dark bg gradient for dark mode; for light mode kept more transparent */}
                <div className="absolute inset-0" style={{background:'linear-gradient(135deg,#0F172A,#1E293B 60%,#1E3A8A)'}}/>
                <img src="/muhtasim-about.webp" alt="Muhtasim Rahman"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={e=>{e.target.style.display='none'}}/>
                {/* Task 13: light mode gradient overlay ?20% opacity -- using CSS via data-theme */}
                <div className="about-img-overlay absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"/>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold font-display">{SITE_CONFIG.owner.displayName}</p>
                  <p className="text-white/60 text-xs mt-0.5">Age {age} &middot; Bangladesh</p>
                </div>
              </div>
              <motion.div className="absolute -right-6 top-12 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[78px]"
                animate={{y:[0,-6,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
                <p className="text-xl font-display font-extrabold text-[var(--accent-primary)]">3+</p>
                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">Yrs Dev</p>
              </motion.div>
              <motion.div className="absolute -left-6 bottom-16 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[78px]"
                animate={{y:[0,6,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut',delay:1}}>
                <p className="text-xl font-display font-extrabold text-[#10B981]">16+</p>
                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">Projects</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div className="flex flex-col gap-5"
            initial="hidden" whileInView="show" viewport={{once:true,amount:.15}}
            variants={{hidden:{},show:{transition:{staggerChildren:.09}}}}>
            <motion.p variants={up} className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold">About Me</motion.p>
            <motion.h2 variants={up} className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight">
              Self-taught developer<br/><span className="text-[var(--accent-primary)]">from Bangladesh</span>
            </motion.h2>
            <motion.p variants={up} className="text-[var(--text-secondary)] leading-relaxed text-sm">
              Hi, I'm <strong className="text-[var(--text-primary)]">Muhtasim Rahman (Turzo)</strong>, a {age}-year-old
              student and self-taught web developer from Nilphamari, Bangladesh. Since I was young I've been fascinated
              by technology -- from circuits to my first HTML page.
            </motion.p>
            <motion.p variants={up} className="text-[var(--text-secondary)] leading-relaxed text-sm">
              Currently preparing for HSC while building real-world projects. My goal is to become a professional
              full-stack developer and pursue a CSE degree. All work follows <strong className="text-[var(--text-primary)]">Islamic &amp; ethical principles</strong>.
            </motion.p>

            {/* 5 fact cards + 6th as "Read Full Story" button */}
            <motion.div variants={up} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FACTS.map(({icon,color,label,value})=>(
                <div key={label} className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors duration-200">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:`${color}18`,color}}>
                    <FontAwesomeIcon icon={icon} className="text-xs"/>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">{label}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{value}</p>
                  </div>
                </div>
              ))}

              {/* 6th card -- Read Full Story button
                  Task 13: removed hover:scale-[1.02] -- only keep color/border hover effect */}
              <Link to="/about"
                className="group flex items-start gap-2.5 p-3 rounded-lg border transition-all duration-200 active:scale-[.98]"
                style={{
                  background:'linear-gradient(135deg,rgba(59,130,246,.1),rgba(99,102,241,.06))',
                  borderColor:'rgba(59,130,246,.3)',
                }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{background:'rgba(59,130,246,.18)',color:'var(--accent-primary)'}}>
                  <FontAwesomeIcon icon={faBookOpen} className="text-xs"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--accent-primary)] font-medium opacity-80">More</p>
                  <p className="text-xs font-semibold text-[var(--accent-primary)] mt-0.5 flex items-center gap-1">
                    Read Full Story
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform duration-200 group-hover:translate-x-1"/>
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Task 13: image overlay CSS -- dark mode full gradient, light mode ?20% opacity */}
      <style>{`
        .about-img-overlay {
          background: linear-gradient(to top, rgba(2,6,23,0.85), transparent);
        }
        [data-theme="light"] .about-img-overlay {
          background: linear-gradient(to top, rgba(248,250,252,0.18), transparent);
        }
      `}</style>
    </section>
  )
}
