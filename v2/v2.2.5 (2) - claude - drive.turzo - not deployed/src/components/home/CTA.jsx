// CTA.jsx — v2.2.5 (fully redesigned — minimal premium, image overflows top)
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faFolderOpen, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const POINTS = [
  'Web Development & React Apps',
  'Graphic Design & Branding',
  'Video Editing & Motion',
  'Islamic & Ethical Standards',
]

export default function CTA() {
  return (
    <section className="section" id="cta">
      <div className="container-xl">
        <motion.div
          className="cta-card relative rounded-3xl overflow-visible"
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.2}} transition={{duration:.65}}>

          {/* Subtle accent orbs */}
          <div className="absolute -top-16 -left-12 w-52 h-52 rounded-full pointer-events-none blur-[90px]"
            style={{background:'radial-gradient(circle,rgba(59,130,246,.18),transparent)',zIndex:0}}/>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full pointer-events-none blur-[70px]"
            style={{background:'radial-gradient(circle,rgba(99,102,241,.12),transparent)',zIndex:0}}/>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_260px] min-h-[300px]"
            style={{borderRadius:'24px',overflow:'visible',background:'var(--bg-surface)',border:'1px solid var(--border-strong)'}}>

            {/* LEFT content */}
            <div className="relative z-10 p-8 sm:p-12 lg:pr-6 flex flex-col justify-center gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent-primary)] font-bold mb-3">Let's Build Together</p>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight">
                  Have a project<br/>
                  <span className="text-[var(--accent-primary)]">in mind?</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-3 max-w-sm">
                  Always open to meaningful collaborations. Let's create something
                  exceptional — delivered ethically and professionally.
                </p>
              </div>

              <ul className="space-y-2">
                {POINTS.map(pt=>(
                  <li key={pt} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--accent-primary)] flex-shrink-0 text-xs"/>
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200 active:scale-[.97] group">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs"/>
                  Get in Touch
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
                </Link>
                <Link to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[.97]">
                  <FontAwesomeIcon icon={faFolderOpen} className="text-xs"/>
                  View Work
                </Link>
              </div>

              <p className="text-[10px] text-[var(--text-tertiary)]">
                ✦ All work follows Islamic &amp; ethical principles &nbsp;·&nbsp; Reply within 24h insha'Allah
              </p>
            </div>

            {/* RIGHT — photo overflows top of card */}
            <div className="hidden lg:flex items-end justify-center relative overflow-visible"
              style={{borderLeft:'1px solid var(--border-color)'}}>
              {/* Glow under image */}
              <div className="absolute bottom-0 inset-x-4 h-32 blur-2xl opacity-25 pointer-events-none"
                style={{background:'linear-gradient(to top,rgba(59,130,246,.5),transparent)'}}/>
              {/* Image overflows top border */}
              <img
                src="/hero-sit.webp"
                alt="Muhtasim Rahman"
                className="relative z-10 object-contain object-bottom select-none"
                style={{
                  height:'340px',
                  width:'auto',
                  maxWidth:'240px',
                  marginBottom:0,
                  marginTop:'-48px',   /* overflow top */
                  filter:'drop-shadow(0 -6px 28px rgba(59,130,246,.18))',
                }}
                loading="lazy"
                onError={e=>{e.target.style.display='none'}}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
