// SiteCTA.jsx — v2.3.1
// Shared CTA section used on both Home and About pages
// Replaces home/CTA.jsx and the inline CTA in About.jsx

import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faFolderOpen, faCircleDot } from '@fortawesome/free-solid-svg-icons'

export default function SiteCTA() {
  return (
    <section className="scta-section section" id="cta" aria-label="Call to action">
      <div className="scta-bg" aria-hidden="true" />
      <div className="scta-glow" aria-hidden="true" />

      <div className="container-xl" style={{ position:'relative', zIndex:1 }}>
        <motion.div
          className="scta-inner"
          initial={{ opacity:0, y:28 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.35 }}
          transition={{ duration:.65, ease:[.16,1,.3,1] }}>

          {/* Badge */}
          <div className="scta-badge">
            <span className="scta-badge-dot" aria-hidden="true" />
            Open to Opportunities
          </div>

          {/* Heading */}
          <h2 className="scta-heading">
            Have a project in mind?{' '}
            <span className="scta-heading-grad">
              Let's build it together.
            </span>
          </h2>

          {/* Sub */}
          <p className="scta-sub">
            Whether it's a website, a design, or just a conversation —
            I'm always open to genuine collaborations and new opportunities.
          </p>

          {/* Buttons */}
          <div className="scta-btns">
            <Link to="/contact" className="scta-btn-primary">
              <FontAwesomeIcon icon={faEnvelope} />
              Get In Touch
              <FontAwesomeIcon icon={faArrowRight} className="scta-arrow" />
            </Link>
            <Link to="/projects" className="scta-btn-secondary">
              <FontAwesomeIcon icon={faFolderOpen} />
              See My Work
            </Link>
          </div>

          {/* Footer note */}
          <p className="scta-note">
            <FontAwesomeIcon icon={faCircleDot} className="scta-note-dot" />
            Fast response · Clean code · Ethical work only
          </p>
        </motion.div>
      </div>

      <style>{`
        .scta-section {
          position: relative;
          overflow: hidden;
        }
        /* Dot-grid */
        .scta-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(99,102,241,.11) 1.5px, transparent 1.5px),
            radial-gradient(rgba(59,130,246,.06) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%);
          animation: scta-drift 30s linear infinite;
        }
        [data-theme=light] .scta-bg {
          background-image:
            radial-gradient(rgba(37,99,235,.08) 1.5px, transparent 1.5px),
            radial-gradient(rgba(99,102,241,.04) 1px, transparent 1px);
        }
        @keyframes scta-drift { to { background-position: 28px 28px, 21px 21px; } }

        /* Ambient glow */
        .scta-glow {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(99,102,241,.09) 0%, rgba(59,130,246,.05) 40%, transparent 72%);
          animation: scta-glow-p 6s ease-in-out infinite;
        }
        [data-theme=light] .scta-glow {
          background: radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(99,102,241,.05) 0%, rgba(59,130,246,.03) 40%, transparent 72%);
        }
        @keyframes scta-glow-p {
          0%,100% { opacity:.7; transform:scale(1); }
          50%     { opacity:1;  transform:scale(1.04); }
        }

        /* Inner */
        .scta-inner {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 1.4rem; max-width: 620px; margin-inline: auto;
        }

        /* Badge */
        .scta-badge {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .3rem .9rem; border-radius: 9999px;
          border: 1px solid rgba(99,102,241,.28);
          background: rgba(99,102,241,.08);
          font-size: .73rem; font-weight: 600;
          color: var(--accent-primary); letter-spacing: .03em;
          font-family: var(--font-mono);
        }
        .scta-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 6px #22c55e;
          animation: scta-dot-p 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes scta-dot-p {
          0%,100% { opacity:1; transform:scale(1);   box-shadow:0 0 4px #22c55e; }
          50%     { opacity:.6; transform:scale(1.3); box-shadow:0 0 10px #22c55e; }
        }

        /* Heading */
        .scta-heading {
          font-size: clamp(1.85rem,4.2vw,3rem);
          font-weight: 800; line-height: 1.12;
          letter-spacing: -.025em;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .scta-heading-grad {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #818cf8 55%, #c084fc 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Sub */
        .scta-sub {
          font-size: clamp(.875rem,1.15vw,.975rem);
          color: var(--text-secondary); max-width: 460px; line-height: 1.75;
        }

        /* Buttons */
        .scta-btns {
          display: flex; flex-wrap: wrap; gap: .8rem;
          justify-content: center; margin-top: .3rem;
        }
        .scta-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.6rem; border-radius: .875rem;
          background: var(--accent-primary);
          color: #fff; font-size: .9rem; font-weight: 700;
          border: 2px solid var(--accent-primary);
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(37,99,235,.28);
          transition: all .22s ease;
        }
        .scta-btn-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          box-shadow: 0 8px 28px rgba(37,99,235,.42);
          transform: translateY(-2px);
        }
        .scta-btn-primary:active { transform:scale(.96); }
        .scta-arrow { transition: transform .2s ease; }
        .scta-btn-primary:hover .scta-arrow { transform: translateX(3px); }

        .scta-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.4rem; border-radius: .875rem;
          background: transparent;
          color: var(--text-secondary); font-size: .9rem; font-weight: 600;
          border: 2px solid var(--border-strong);
          text-decoration: none; transition: all .2s ease;
        }
        .scta-btn-secondary:hover {
          border-color: var(--accent-primary); color: var(--text-primary);
          background: var(--accent-light); transform: translateY(-2px);
        }
        .scta-btn-secondary:active { transform:scale(.96); }

        /* Note */
        .scta-note {
          display: flex; align-items: center; gap: .4rem;
          font-size: .73rem; color: var(--text-tertiary); letter-spacing: .02em;
        }
        .scta-note-dot { color: var(--accent-primary); font-size: .65rem; }
      `}</style>
    </section>
  )
}
