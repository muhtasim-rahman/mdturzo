// CTA.jsx — v2.3.1
// Shared CTA section used on both Home and About pages
// Minimal, attractive, gradient + dot-grid texture

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope, faArrowRight, faRocket, faCode,
} from '@fortawesome/free-solid-svg-icons'

export default function CTA() {
  return (
    <section className="cta-section section" id="cta" aria-label="Call to action">
      <div className="cta-grid-bg" aria-hidden="true" />
      <div className="cta-orb cta-orb-l" aria-hidden="true" />
      <div className="cta-orb cta-orb-r" aria-hidden="true" />

      <div className="container-xl cta-z">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

          {/* Badge */}
          <div className="cta-badge">
            <span className="cta-badge-dot" />
            Open to opportunities
          </div>

          {/* Heading */}
          <h2 className="cta-heading">
            Have a project in mind?
            <span className="cta-heading-br"><br className="hidden sm:block" /></span>
            <span className="cta-heading-accent"> Let's build it together</span>
          </h2>

          <p className="cta-sub">
            I'm always open to meaningful work — a website, a design project,
            or just a good conversation. Halal principles guide everything I do.
          </p>

          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-primary" aria-label="Get in touch">
              <FontAwesomeIcon icon={faEnvelope} />
              Get in touch
              <FontAwesomeIcon icon={faArrowRight} className="cta-arrow" />
            </Link>
            <Link to="/projects" className="cta-btn-secondary" aria-label="View my work">
              <FontAwesomeIcon icon={faRocket} />
              View Projects
            </Link>
          </div>

          <p className="cta-note">
            <FontAwesomeIcon icon={faCode} className="cta-note-icon" />
            Fast response · Clean code · On-time delivery
          </p>
        </motion.div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          overflow: hidden;
        }
        .cta-z { position: relative; z-index: 2; }
        .cta-grid-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            radial-gradient(rgba(99,102,241,.10) 1.5px, transparent 1.5px),
            radial-gradient(rgba(59,130,246,.06) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 10%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 10%, transparent 80%);
          pointer-events: none;
          animation: cta-bg-d 28s linear infinite;
        }
        [data-theme=light] .cta-grid-bg {
          background-image:
            radial-gradient(rgba(37,99,235,.08) 1.5px, transparent 1.5px),
            radial-gradient(rgba(99,102,241,.04) 1px, transparent 1px);
        }
        @keyframes cta-bg-d { to { background-position: 28px 28px, 21px 21px; } }
        .cta-orb {
          position: absolute; z-index: 0; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }
        .cta-orb-l {
          width: 360px; height: 360px;
          background: rgba(59,130,246,.09);
          top: -80px; left: -60px;
        }
        .cta-orb-r {
          width: 280px; height: 280px;
          background: rgba(139,92,246,.07);
          bottom: -60px; right: -40px;
        }
        .cta-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 1.35rem; max-width: 600px; margin-inline: auto;
        }
        .cta-badge {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .3rem .9rem; border-radius: 9999px;
          border: 1px solid rgba(34,197,94,.3);
          background: rgba(34,197,94,.08);
          font-size: .72rem; font-weight: 600;
          color: #22C55E; letter-spacing: .04em;
          font-family: var(--font-mono);
        }
        .cta-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22C55E; box-shadow: 0 0 6px #22C55E;
          animation: cta-dot-p 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes cta-dot-p {
          0%,100% { opacity:1; transform:scale(1); box-shadow: 0 0 5px #22C55E; }
          50%      { opacity:.6; transform:scale(1.3); box-shadow: 0 0 12px #22C55E; }
        }
        .cta-heading {
          font-size: clamp(1.8rem, 4.5vw, 3rem);
          font-weight: 800; line-height: 1.13;
          letter-spacing: -.03em;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .cta-heading-accent {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #818cf8 55%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-sub {
          font-size: clamp(.86rem, 1.15vw, .97rem);
          color: var(--text-secondary);
          max-width: 460px; line-height: 1.72;
        }
        .cta-btns {
          display: flex; flex-wrap: wrap; gap: .8rem;
          justify-content: center; margin-top: .3rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .72rem 1.65rem; border-radius: 1rem;
          background: var(--accent-primary);
          color: #fff; font-size: .88rem; font-weight: 700;
          border: 2px solid var(--accent-primary);
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(37,99,235,.3);
          transition: all .22s ease;
        }
        .cta-btn-primary:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
          box-shadow: 0 8px 28px rgba(37,99,235,.42);
          transform: translateY(-2px);
        }
        .cta-btn-primary:active { transform: scale(.96); }
        .cta-arrow { transition: transform .2s ease; }
        .cta-btn-primary:hover .cta-arrow { transform: translateX(3px); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .72rem 1.5rem; border-radius: 1rem;
          background: transparent;
          color: var(--text-secondary); font-size: .88rem; font-weight: 600;
          border: 2px solid var(--border-strong);
          text-decoration: none; transition: all .2s ease;
        }
        .cta-btn-secondary:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          background: var(--accent-light);
          transform: translateY(-2px);
        }
        .cta-btn-secondary:active { transform: scale(.96); }
        .cta-note {
          font-size: .72rem; color: var(--text-tertiary);
          letter-spacing: .03em; display: flex;
          align-items: center; gap: .4rem;
        }
        .cta-note-icon { color: var(--accent-primary); font-size: .65rem; }
      `}</style>
    </section>
  )
}
