// CTA.jsx — v2.2.2 (professional design with hero-sit.webp on right)
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

export default function CTA(){
  return(
    <section className="section" id="cta">
      <div className="container-xl">
        <motion.div
          className="relative rounded-2xl overflow-visible border border-[var(--border-strong)] bg-[var(--bg-surface)]"
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.25}} transition={{duration:.6}}>

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-16 w-56 h-56 rounded-full opacity-[.08] blur-[80px] pointer-events-none" style={{background:'radial-gradient(circle,#3B82F6,transparent)'}}/>
          <div className="absolute -bottom-16 left-1/3 w-48 h-48 rounded-full opacity-[.06] blur-[70px] pointer-events-none" style={{background:'radial-gradient(circle,#6366F1,transparent)'}}/>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end overflow-hidden rounded-2xl">
            {/* Left content */}
            <div className="relative z-10 p-8 sm:p-12 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-3">Let's Build Together</p>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight">
                  Have a project<br/>in mind?
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mt-3 max-w-md text-sm">
                  I'm always open to new opportunities, collaborations, and interesting projects.
                  Let's create something meaningful — ethically and professionally.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {['Web Development','Graphic Design','Video Editing','Islamic & Ethical'].map(t=>(
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 font-medium">{t}</span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                    bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white
                    shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200 active:scale-[.97] group">
                  <FontAwesomeIcon icon={faEnvelope}/>
                  Get in Touch
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1"/>
                </Link>
                <Link to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                    border border-[var(--border-strong)] text-[var(--text-secondary)]
                    hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]
                    transition-all duration-200 active:scale-[.97]">
                  <FontAwesomeIcon icon={faFolderOpen} className="text-xs"/>
                  View Projects
                </Link>
              </div>

              <p className="text-[10px] text-[var(--text-tertiary)]">
                ✦ All work follows Islamic &amp; ethical principles &nbsp;·&nbsp; Reply within 24h insha'Allah
              </p>
            </div>

            {/* Right — photo, overflows card top */}
            <div className="hidden lg:flex items-end justify-end self-end relative pr-6 sm:pr-10" style={{minWidth:'220px'}}>
              <div className="relative" style={{height:'360px',width:'200px'}}>
                {/* Subtle glow behind photo */}
                <div className="absolute inset-x-4 bottom-0 top-8 rounded-2xl opacity-30 blur-2xl"
                  style={{background:'linear-gradient(to top,#3B82F640,transparent)'}}/>
                <img
                  src="/hero-sit.webp"
                  alt="Muhtasim Rahman"
                  className="absolute bottom-0 left-0 w-full object-contain object-bottom"
                  style={{height:'360px',filter:'drop-shadow(0 -4px 24px rgba(59,130,246,.15))'}}
                  loading="lazy"
                  onError={e=>{e.target.style.display='none'}}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
