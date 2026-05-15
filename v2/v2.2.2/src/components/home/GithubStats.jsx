// GithubStats.jsx — v2.2.2 (uses only reliable data: contribution graph)
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faCodeBranch, faStar, faFolderOpen, faUsers } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const GH = 'muhtasim-rahman'

// Static reliable GH stats (update manually each release)
const STAT_CARDS = [
  { icon:faFolderOpen, color:'#3B82F6', value:'16+', label:'Repositories' },
  { icon:faCodeBranch, color:'#10B981', value:'50+', label:'Contributions' },
  { icon:faStar,       color:'#F59E0B', value:'5+',  label:'Stars Earned'  },
  { icon:faUsers,      color:'#EC4899', value:'10+', label:'Followers'     },
]

export default function GithubStats(){
  return(
    <section className="section section-alt" id="github">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Open Source</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          </motion.div>
          <motion.a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group self-start sm:self-auto"
            initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
            <FontAwesomeIcon icon={faGithub}/>
            <span>@{GH}</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </motion.a>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((s,i)=>(
            <motion.div key={s.label} className="card p-5 flex flex-col items-center text-center gap-3"
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              viewport={{once:true,amount:.3}} transition={{duration:.45,delay:i*.08}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${s.color}18`,color:s.color}}>
                <FontAwesomeIcon icon={s.icon}/>
              </div>
              <div>
                <p className="text-2xl font-display font-extrabold" style={{color:s.color}}>{s.value}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph embed */}
        <motion.div className="card p-5 overflow-hidden"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.2}}>
          <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">Contribution Graph</p>
          <div className="overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/3B82F6/${GH}`}
              alt="GitHub contribution chart"
              className="w-full min-w-[600px] rounded-lg"
              style={{filter:'var(--gh-chart-filter, none)'}}
              loading="lazy"
              onError={e=>{
                e.target.parentElement.innerHTML=`<div class="py-8 text-center text-sm text-[var(--text-tertiary)]">
                  Contribution graph unavailable.
                  <a href="${SITE_CONFIG.social.github}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-primary)] hover:underline ml-1">View on GitHub →</a>
                </div>`
              }}
            />
          </div>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-3 text-right">
            Powered by <a href="https://ghchart.rshah.org" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">ghchart.rshah.org</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
