// CTA.jsx — v2.2.4
// Redesigned: centered layout, no image, textured bg, compact
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faFolderOpen, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const POINTS = [
  'Web Development & React Apps',
  'Graphic Design & Branding',
  'Video Editing & Motion',
  'Islamic & Ethical Standards',
]

export default function CTA() {
  return (
    <section className="section" id="cta">
      <style>{`
        .cta-wrap{
          position:relative;
          border-radius:28px;
          overflow:hidden;
          background:var(--bg-surface);
          border:1px solid var(--border-strong);
          box-shadow:var(--shadow-xl);
        }
        /* SVG noise texture */
        .cta-texture{
          position:absolute;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-size:300px 300px;
          pointer-events:none;z-index:0;
        }
        [data-theme=light] .cta-texture{opacity:0.55}
        .cta-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.75rem;padding:clamp(2.5rem,6vw,4rem) clamp(1.5rem,5vw,3rem)}
        .cta-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem .9rem;border-radius:99px;background:var(--accent-light);border:1px solid rgba(59,130,246,.25);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--accent-primary)}
        .cta-points{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem .75rem}
        .cta-point{display:flex;align-items:center;gap:.45rem;font-size:.82rem;color:var(--text-secondary);background:var(--bg-surface-2);border:1px solid var(--border-color);border-radius:99px;padding:.35rem .8rem;transition:border-color .2s ease}
        .cta-point:hover{border-color:var(--accent-primary)}
        .cta-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
      `}</style>
      <div className="container-xl">
        <motion.div className="cta-wrap"
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.2}} transition={{duration:.65}}>

          <div className="cta-texture"/>
          {/* Accent orbs */}
          <div className="cta-orb" style={{width:320,height:320,background:'radial-gradient(circle,rgba(59,130,246,.12),transparent)',top:'-80px',left:'-60px',zIndex:0}}/>
          <div className="cta-orb" style={{width:260,height:260,background:'radial-gradient(circle,rgba(99,102,241,.09),transparent)',bottom:'-60px',right:'-40px',zIndex:0}}/>

          <div className="cta-inner">
            <span className="cta-badge">
              <FontAwesomeIcon icon={faEnvelope} className="text-[10px]"/>
              Open for collaborations
            </span>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--text-primary)] leading-tight">
                Have a project<br/>
                <span className="text-[var(--accent-primary)]">in mind?</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4 max-w-md mx-auto">
                Always open to meaningful collaborations. Let's create something
                exceptional — delivered ethically and professionally.
              </p>
            </div>

            {/* Pill tags */}
            <div className="cta-points">
              {POINTS.map(pt=>(
                <div key={pt} className="cta-point">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--accent-primary)] text-xs flex-shrink-0"/>
                  {pt}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
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
