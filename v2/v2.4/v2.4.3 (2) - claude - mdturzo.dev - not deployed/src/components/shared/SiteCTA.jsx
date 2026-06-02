// SiteCTA.jsx — v2.3.2 — shared CTA (home + about)
// CTA.jsx — v2.3.1  (shared — used by Home + About)
// Redesigned: minimal, attractive, combined from copy-2/3 + home
// ============================================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

export default function CTA() {
  const social = [
    { icon: faGithub,   url: SITE_CONFIG.social.github,   label: 'GitHub'   },
    { icon: faLinkedin,    url: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
    { icon: faTelegram,    url: SITE_CONFIG.social.telegram, label: 'Telegram' },
  ]

  return (
    <section className="section cta-section" id="cta" aria-label="Call to action">
      <div className="container-xl">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .25 }}
          transition={{ duration: .6, ease: [.16, 1, .3, 1] }}
        >
          {/* Background noise/texture */}
          <div className="cta-tex" aria-hidden="true" />
          {/* Glow orbs */}
          <div className="cta-orb cta-orb-l" aria-hidden="true" />
          <div className="cta-orb cta-orb-r" aria-hidden="true" />

          <div className="cta-inner">
            <p className="cta-eyebrow">— Let's build something</p>

            <h2 className="cta-h2">
              Have a project in mind?<br />
              <span className="cta-h2-accent">Let's work together.</span>
            </h2>

            <p className="cta-sub">
              I'm open to freelance projects, collaborations, and learning opportunities.
              Drop me a message — I respond within 24 hours.
            </p>

            <div className="cta-actions">
              <Link to="/contact" className="cta-btn-primary">
                <FontAwesomeIcon icon={faPaperPlane} />
                Get in Touch
                <FontAwesomeIcon icon={faArrowRight} className="cta-arrow" />
              </Link>
              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
                className="cta-btn-secondary">
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </a>
            </div>

            {/* Trust badges */}
            <div className="cta-badges">
              {['Fast Response', 'Clean Code', 'On-time Delivery'].map(b => (
                <span key={b} className="cta-badge">
                  <span className="cta-badge-dot" />
                  {b}
                </span>
              ))}
            </div>

            {/* Social row */}
            <div className="cta-socials">
              {social.map(({ icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="cta-social-link" aria-label={label}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-section { padding-block: clamp(3rem, 7vw, 5rem); }

        .cta-box {
          position: relative; overflow: hidden;
          border-radius: clamp(16px, 2.5vw, 28px);
          border: 1px solid rgba(59,130,246,.22);
          background: linear-gradient(135deg,
            rgba(37,99,235,.1) 0%,
            rgba(99,102,241,.06) 40%,
            rgba(139,92,246,.08) 100%
          );
          backdrop-filter: blur(12px);
          padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem);
          text-align: center;
        }
        [data-theme=light] .cta-box {
          background: linear-gradient(135deg,
            rgba(37,99,235,.06) 0%,
            rgba(99,102,241,.04) 40%,
            rgba(139,92,246,.05) 100%
          );
          border-color: rgba(37,99,235,.15);
        }
        .cta-tex {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        [data-theme=light] .cta-tex {
          background-image: radial-gradient(rgba(37,99,235,.04) 1px, transparent 1px);
        }
        .cta-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(60px);
        }
        .cta-orb-l {
          width: 320px; height: 320px; top: -80px; left: -60px;
          background: radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%);
        }
        .cta-orb-r {
          width: 260px; height: 260px; bottom: -60px; right: -40px;
          background: radial-gradient(circle, rgba(139,92,246,.14) 0%, transparent 70%);
        }
        [data-theme=light] .cta-orb-l { background: radial-gradient(circle, rgba(37,99,235,.07) 0%, transparent 70%); }
        [data-theme=light] .cta-orb-r { background: radial-gradient(circle, rgba(139,92,246,.06) 0%, transparent 70%); }

        .cta-inner { position: relative; z-index: 1; }

        .cta-eyebrow {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .12em;
          color: var(--accent-primary); margin-bottom: .85rem;
        }
        .cta-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          line-height: 1.15; color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .cta-h2-accent { color: var(--accent-primary); }
        .cta-sub {
          font-size: clamp(.85rem, 1.1vw, .9375rem);
          color: var(--text-secondary); line-height: 1.75;
          max-width: 480px; margin: 0 auto 1.75rem;
        }
        .cta-actions {
          display: flex; flex-wrap: wrap; gap: .75rem;
          justify-content: center; margin-bottom: 1.5rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: .55rem;
          padding: .75rem 1.75rem; border-radius: var(--radius-xl);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .9rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          box-shadow: 0 4px 18px rgba(37,99,235,.35);
          transition: all .2s ease;
        }
        .cta-btn-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,99,235,.42);
        }
        .cta-arrow { transition: transform .2s; }
        .cta-btn-primary:hover .cta-arrow { transform: translateX(3px); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: .55rem;
          padding: .75rem 1.75rem; border-radius: var(--radius-xl);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .9rem; text-decoration: none;
          border: 2px solid var(--border-strong);
          transition: all .2s ease;
        }
        .cta-btn-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-2px);
        }
        .cta-badges {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .cta-badge {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .72rem; color: var(--text-secondary); font-weight: 500;
          font-family: var(--font-mono); letter-spacing: .03em;
        }
        .cta-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent-primary); display: inline-block;
        }
        .cta-socials {
          display: flex; justify-content: center; gap: .6rem;
        }
        .cta-social-link {
          width: 38px; height: 38px; border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; color: var(--text-secondary);
          text-decoration: none;
          transition: all .2s ease;
        }
        .cta-social-link:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-2px);
        }
      `}</style>
    </section>
  )
}
