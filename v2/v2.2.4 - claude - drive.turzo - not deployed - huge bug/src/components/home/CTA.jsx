// CTA.jsx — v2.2.4 (redesigned: compact, centered, texture bg, no image)
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faFolderOpen, faCircleCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const POINTS = [
  'Web Development & React Apps',
  'Graphic Design & Branding',
  'Video Editing & Motion',
]

export default function CTA() {
  return (
    <section className="section" id="cta">
      <style>{`
        .cta-wrap {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          padding: clamp(48px,7vw,80px) clamp(24px,6vw,80px);
          text-align: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
        }
        /* Dot texture */
        .cta-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--border-strong) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.55;
          pointer-events: none;
        }
        /* Glow orbs */
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .cta-orb-1 { width: 300px; height: 300px; top: -80px; left: -60px; background: radial-gradient(circle, rgba(59,130,246,.16), transparent); }
        .cta-orb-2 { width: 260px; height: 260px; bottom: -70px; right: -40px; background: radial-gradient(circle, rgba(99,102,241,.12), transparent); }
        [data-theme=light] .cta-orb-1 { background: radial-gradient(circle, rgba(59,130,246,.08), transparent); }
        [data-theme=light] .cta-orb-2 { background: radial-gradient(circle, rgba(99,102,241,.06), transparent); }
      `}</style>
      <div className="container-xl">
        <motion.div className="cta-wrap"
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.2}} transition={{duration:.65}}>

          <div className="cta-orb cta-orb-1"/>
          <div className="cta-orb cta-orb-2"/>

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider"
              style={{background:'rgba(59,130,246,.08)'}}>
              <FontAwesomeIcon icon={faStar} className="text-[10px]"/>
              Let's Build Together
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight mb-3">
                Have a project<br/>
                <span className="text-[var(--accent-primary)]">in mind?</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mx-auto">
                Always open to meaningful collaborations. Let's create something exceptional —
                delivered ethically and professionally.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {POINTS.map(pt=>(
                <span key={pt} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-xs text-[var(--text-secondary)]">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--accent-primary)] text-[10px]"/>
                  {pt}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200 active:scale-[.97] group">
                <FontAwesomeIcon icon={faEnvelope} className="text-xs"/>
                Get in Touch
                <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[.97]">
                <FontAwesomeIcon icon={faFolderOpen} className="text-xs"/>
                View Work
              </Link>
            </div>

            <p className="text-[10px] text-[var(--text-tertiary)]">
              ✦ All work follows Islamic &amp; ethical principles &nbsp;·&nbsp; Reply within 24h insha'Allah
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
