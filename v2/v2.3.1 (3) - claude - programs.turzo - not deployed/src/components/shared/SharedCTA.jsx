// SharedCTA.jsx — v2.3.1
// Shared CTA section used on both Home and About pages
// Combines: home CTA, copy-2 CTA, copy-3 CTA styles into one minimal attractive design

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faCode, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

export default function SharedCTA() {
  return (
    <section className="shared-cta section" aria-label="Call to action">
      {/* Background elements */}
      <div className="shared-cta-bg" aria-hidden="true" />
      <div className="shared-cta-orb-l" aria-hidden="true" />
      <div className="shared-cta-orb-r" aria-hidden="true" />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="shared-cta-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Icon */}
          <div className="shared-cta-icon-wrap" aria-hidden="true">
            <FontAwesomeIcon icon={faHandshake} className="shared-cta-icon" />
          </div>

          {/* Text */}
          <h2 className="shared-cta-heading">
            Have a project in mind?{' '}
            <span className="shared-cta-accent">Let's build it.</span>
          </h2>
          <p className="shared-cta-sub">
            I'm open to freelance projects, collaborations, and genuine conversations.
            Fast responses. Clean code. Ethical work — always.
          </p>

          {/* Buttons */}
          <div className="shared-cta-btns">
            <Link to="/contact" className="shared-cta-btn-primary">
              <FontAwesomeIcon icon={faEnvelope} />
              Get in Touch
              <FontAwesomeIcon icon={faArrowRight} className="shared-cta-arrow" />
            </Link>
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shared-cta-btn-outline"
            >
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </a>
            <Link to="/projects" className="shared-cta-btn-outline">
              <FontAwesomeIcon icon={faCode} />
              Projects
            </Link>
          </div>

          {/* Footer note */}
          <p className="shared-cta-note">
            Fast response · Clean code · On-time delivery
          </p>
        </motion.div>
      </div>

      <style>{`
        .shared-cta {
          position: relative;
          overflow: hidden;
        }
        .shared-cta-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            radial-gradient(rgba(59,130,246,.09) 1.5px, transparent 1.5px),
            radial-gradient(rgba(99,102,241,.05) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 10%, transparent 80%);
          pointer-events: none;
          animation: scta-bg-d 30s linear infinite;
        }
        [data-theme=light] .shared-cta-bg {
          background-image:
            radial-gradient(rgba(37,99,235,.07) 1.5px, transparent 1.5px),
            radial-gradient(rgba(99,102,241,.04) 1px, transparent 1px);
        }
        @keyframes scta-bg-d { to { background-position: 28px 28px, 21px 21px; } }
        .shared-cta-orb-l {
          position: absolute; z-index: 0; pointer-events: none;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,.10) 0%, transparent 70%);
          filter: blur(60px);
          top: -80px; left: -80px;
          animation: scta-orb 14s ease-in-out infinite alternate;
        }
        .shared-cta-orb-r {
          position: absolute; z-index: 0; pointer-events: none;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,.08) 0%, transparent 70%);
          filter: blur(50px);
          bottom: -60px; right: -60px;
          animation: scta-orb 18s ease-in-out 4s infinite alternate;
        }
        @keyframes scta-orb {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, -14px) scale(1.08); }
        }
        .shared-cta-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 1.35rem; max-width: 640px; margin-inline: auto;
        }
        .shared-cta-icon-wrap {
          width: 52px; height: 52px; border-radius: var(--radius-xl);
          background: rgba(59,130,246,.1);
          border: 1px solid rgba(59,130,246,.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: -.2rem;
        }
        .shared-cta-icon {
          font-size: 1.2rem; color: var(--accent-primary);
        }
        .shared-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 800; line-height: 1.12;
          letter-spacing: -.03em;
          color: var(--text-primary);
        }
        .shared-cta-accent {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #818cf8 55%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shared-cta-sub {
          font-size: clamp(.85rem, 1.15vw, .97rem);
          color: var(--text-secondary);
          max-width: 460px; line-height: 1.7;
        }
        .shared-cta-btns {
          display: flex; flex-wrap: wrap; gap: .75rem; justify-content: center;
          margin-top: .25rem;
        }
        .shared-cta-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .68rem 1.55rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-size: .875rem; font-weight: 700; text-decoration: none;
          border: 2px solid var(--accent-primary);
          box-shadow: 0 4px 16px rgba(37,99,235,.28);
          transition: all .2s ease;
        }
        .shared-cta-btn-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          box-shadow: 0 8px 24px rgba(37,99,235,.4);
          transform: translateY(-2px);
        }
        .shared-cta-btn-primary:active { transform: scale(.96); }
        .shared-cta-arrow { transition: transform .2s ease; }
        .shared-cta-btn-primary:hover .shared-cta-arrow { transform: translateX(3px); }
        .shared-cta-btn-outline {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .68rem 1.35rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-secondary);
          font-size: .875rem; font-weight: 600; text-decoration: none;
          border: 2px solid var(--border-strong);
          transition: all .2s ease;
        }
        .shared-cta-btn-outline:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          background: var(--accent-light);
          transform: translateY(-2px);
        }
        .shared-cta-btn-outline:active { transform: scale(.96); }
        .shared-cta-note {
          font-size: .71rem;
          color: var(--text-tertiary);
          letter-spacing: .04em;
        }
      `}</style>
    </section>
  )
}
