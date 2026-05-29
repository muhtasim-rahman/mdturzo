// CTA.jsx -- v2.2.6
// REDESIGN:
//   * Removed hero-sit.webp entirely
//   * Centered single-column layout (no image, no split)
//   * Dot-grid texture background with accent glow
//   * Pill badge + large heading + CTA buttons
//   * Animated availability pulse + gradient text
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import SITE_CONFIG from '../../config/site.config.js'

export default function CTA() {
  return (
    <section className="cta-section section" id="cta" aria-label="Call to action">
      {/* Dot-grid texture */}
      <div className="cta-grid-bg" aria-hidden="true" />
      {/* Radial accent glow */}
      <div className="cta-glow" aria-hidden="true" />

      <div className="container-xl relative z-10">
        <motion.div
          className="cta-inner"
          initial={{ opacity:0, y:28 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.4 }}
          transition={{ duration:.6, ease:[.16,1,.3,1] }}>

          {/* Heading */}
          <h2 className="cta-heading">
            Have a project in mind? <br className="hidden sm:block" />
            <span className="cta-heading-accent">Let's build it together</span>
          </h2>

          {/* Sub-text */}
          <p className="cta-sub">
            Have a project idea, a problem to solve, or just want to say hello?
            I'm always open to exciting opportunities.
          </p>

          {/* CTA buttons */}
          <div className="cta-btns">
            <Link to="/contact"
              className="cta-btn-primary"
              aria-label="Get in touch">
              <FontAwesomeIcon icon={faEnvelope} />
              Get in touch
              <FontAwesomeIcon icon={faArrowRight} className="cta-arrow" />
            </Link>
            <a href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-secondary"
              aria-label="View GitHub profile">
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </a>
          </div>

          {/* Separator line + socials hint */}
          <p className="cta-footer-note">
            <FontAwesomeIcon icon={faCircleDot} className="text-[var(--accent-primary)] text-xs" />
            &nbsp; Fast response . Clean code . On-time delivery
          </p>
        </motion.div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          overflow: hidden;
        }
        /* Dot-grid texture */
        .cta-grid-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            radial-gradient(rgba(99,102,241,.12) 1.5px, transparent 1.5px),
            radial-gradient(rgba(59,130,246,.07) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%);
          pointer-events: none;
          animation: cta-bg-drift 28s linear infinite;
        }
        [data-theme=light] .cta-grid-bg {
          background-image:
            radial-gradient(rgba(37,99,235,.09) 1.5px, transparent 1.5px),
            radial-gradient(rgba(99,102,241,.05) 1px, transparent 1px);
        }
        @keyframes cta-bg-drift { to { background-position: 28px 28px, 21px 21px; } }
        /* Accent glow */
        .cta-glow {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 50% at 50% 50%,
            rgba(99,102,241,.10) 0%, rgba(59,130,246,.06) 40%, transparent 72%);
          animation: cta-glow-p 5s ease-in-out infinite;
        }
        [data-theme=light] .cta-glow {
          background: radial-gradient(ellipse 60% 50% at 50% 50%,
            rgba(99,102,241,.06) 0%, rgba(59,130,246,.03) 40%, transparent 72%);
        }
        @keyframes cta-glow-p {
          0%,100% { opacity:.7; transform: scale(1); }
          50%      { opacity:1; transform: scale(1.05); }
        }
        /* Inner layout */
        .cta-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 1.4rem; max-width: 640px; margin-inline: auto;
        }
        /* Badge */
        .cta-badge {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .3rem .9rem; border-radius: 9999px;
          border: 1px solid rgba(99,102,241,.28);
          background: rgba(99,102,241,.10);
          font-size: .75rem; font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: .02em;
        }
        .cta-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: cta-dot-p 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes cta-dot-p {
          0%,100% { opacity:1; transform: scale(1); box-shadow: 0 0 4px #22c55e; }
          50%      { opacity:.6; transform: scale(1.3); box-shadow: 0 0 10px #22c55e; }
        }
        /* Heading */
        .cta-heading {
          font-size: clamp(1.9rem, 4.5vw, 3.2rem);
          font-weight: 800; line-height: 1.12;
          letter-spacing: -.03em;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .cta-heading-accent {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #818cf8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* Sub-text */
        .cta-sub {
          font-size: clamp(.86rem, 1.2vw, 1rem);
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.7;
        }
        /* Buttons */
        .cta-btns {
          display: flex; flex-wrap: wrap; gap: .8rem; justify-content: center;
          margin-top: .4rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.6rem; border-radius: 1rem;
          background: var(--accent-primary);
          color: #fff; font-size: .9rem; font-weight: 700;
          border: 2px solid var(--accent-primary);
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(37,99,235,.32);
          transition: all .22s ease;
          position: relative; overflow: hidden;
        }
        .cta-btn-primary:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
          box-shadow: 0 8px 28px rgba(37,99,235,.44);
          transform: translateY(-2px);
        }
        .cta-btn-primary:active { transform: scale(.96); }
        .cta-arrow { transition: transform .2s ease; }
        .cta-btn-primary:hover .cta-arrow { transform: translateX(3px); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.4rem; border-radius: 1rem;
          background: transparent;
          color: var(--text-secondary); font-size: .9rem; font-weight: 600;
          border: 2px solid var(--border-strong);
          text-decoration: none;
          transition: all .2s ease;
        }
        .cta-btn-secondary:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          background: var(--accent-light);
          transform: translateY(-2px);
        }
        .cta-btn-secondary:active { transform: scale(.96); }
        /* Footer note */
        .cta-footer-note {
          font-size: .73rem;
          color: var(--text-tertiary);
          letter-spacing: .03em;
          margin-top: .4rem;
        }
      `}</style>
    </section>
  )
}
