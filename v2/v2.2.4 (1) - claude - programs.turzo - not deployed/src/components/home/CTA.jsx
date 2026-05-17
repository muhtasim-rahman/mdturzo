// CTA.jsx — v2.2.4
// Redesigned: compact, centered layout. No side image. Textured bg.
// hero-sit.webp reference removed.
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
    <section className="section cta-section" id="cta">
      <style>{`
        .cta-section {
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        [data-theme=light] .cta-section::before {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.06'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin-inline: auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid var(--accent-primary);
          background: var(--accent-light);
          color: var(--accent-primary);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        .cta-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: cta-pulse 2s ease-in-out infinite;
        }
        @keyframes cta-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
          max-width: 440px;
        }
        @media(max-width:480px) { .cta-grid { grid-template-columns: 1fr; } }
        .cta-point {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          font-size: 13px;
          color: var(--text-secondary);
          text-align: left;
        }
        .cta-glow {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          z-index: 0;
        }
      `}</style>

      <div className="container-xl" style={{position:'relative',zIndex:1}}>
        <div className="cta-glow"/>

        <motion.div className="cta-inner"
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.2}} transition={{duration:.65}}>

          <div className="cta-badge">
            <span className="cta-badge-dot"/>
            Open for work
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent-primary)] font-bold mb-3">Let's Build Together</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight mb-3">
              Have a project<br/>
              <span className="text-[var(--accent-primary)]">in mind?</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mx-auto">
              Always open to meaningful collaborations. Let's create something
              exceptional — delivered ethically and professionally.
            </p>
          </div>

          <div className="cta-grid">
            {POINTS.map(pt=>(
              <div key={pt} className="cta-point">
                <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--accent-primary)] flex-shrink-0 text-xs"/>
                {pt}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200 active:scale-[.97] group">
              <FontAwesomeIcon icon={faEnvelope} className="text-xs"/>
              Get in Touch
              <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
            </Link>
            <Link to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[.97]">
              <FontAwesomeIcon icon={faFolderOpen} className="text-xs"/>
              View Work
            </Link>
          </div>

          <p className="text-[10px] text-[var(--text-tertiary)]">
            ✦ All work follows Islamic &amp; ethical principles &nbsp;·&nbsp; Reply within 24h insha'Allah
          </p>
        </motion.div>
      </div>
    </section>
  )
}
