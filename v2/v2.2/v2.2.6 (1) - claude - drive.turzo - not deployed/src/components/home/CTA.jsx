// ============================================================
// CTA.jsx — v2.2.6
// Redesign: centered layout, dot-grid pattern bg, no hero-sit.webp
// Clean, conversion-focused: headline, sub, two action buttons
// ============================================================
import { Link }   from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFolderOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function CTA() {
  return (
    <section className="cta-section section-alt">
      {/* Dot-grid background */}
      <div className="cta-dots" aria-hidden="true" />
      {/* Radial glow */}
      <div className="cta-glow" aria-hidden="true" />

      <div className="container-xl cta-inner">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <span className="cta-eyebrow">
            Let's work together
          </span>

          {/* Headline */}
          <h2 className="cta-headline">
            Have a project in<br className="hidden sm:block" /> mind?
          </h2>

          {/* Sub-text */}
          <p className="cta-sub">
            I'm open to freelance work, collaborations, and interesting opportunities.
            Whether it's a website, a design, or a video — let's make something great.
          </p>

          {/* Action buttons */}
          <div className="cta-actions">
            <motion.div
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link to="/contact" className="cta-btn-primary">
                <FontAwesomeIcon icon={faEnvelope} />
                Get in touch
                <FontAwesomeIcon icon={faArrowRight} className="cta-btn-arrow" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link to="/projects" className="cta-btn-secondary">
                <FontAwesomeIcon icon={faFolderOpen} />
                View my work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* ── Section wrapper ─────────────────────────── */
        .cta-section {
          position: relative;
          overflow: hidden;
          padding-block: clamp(4rem, 10vw, 7rem);
        }

        /* ── Dot grid ────────────────────────────────── */
        .cta-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(rgba(59,130,246,.18) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        [data-theme=light] .cta-dots {
          background-image: radial-gradient(rgba(37,99,235,.14) 1px, transparent 1px);
        }

        /* ── Radial glow ─────────────────────────────── */
        .cta-glow {
          position: absolute; z-index: 0; pointer-events: none;
          width: 600px; height: 300px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(59,130,246,.12) 0%, transparent 70%);
          filter: blur(40px);
        }
        [data-theme=light] .cta-glow {
          background: radial-gradient(ellipse at center, rgba(37,99,235,.07) 0%, transparent 70%);
        }

        /* ── Inner ───────────────────────────────────── */
        .cta-inner { position: relative; z-index: 1; }

        /* ── Content block ───────────────────────────── */
        .cta-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
          max-width: 560px;
          margin-inline: auto;
        }

        /* ── Eyebrow ─────────────────────────────────── */
        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--accent-primary);
          padding: 5px 14px; border-radius: 99px;
          background: var(--accent-light);
          border: 1px solid rgba(59,130,246,.25);
        }
        [data-theme=light] .cta-eyebrow { border-color: rgba(37,99,235,.2); }

        /* ── Headline ────────────────────────────────── */
        .cta-headline {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--text-primary);
        }

        /* ── Sub ─────────────────────────────────────── */
        .cta-sub {
          font-size: clamp(.875rem, 1.5vw, 1rem);
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 460px;
        }

        /* ── Buttons ─────────────────────────────────── */
        .cta-actions {
          display: flex; gap: .875rem; flex-wrap: wrap; justify-content: center;
          margin-top: .5rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .75rem 1.75rem; border-radius: .875rem;
          font-size: .9rem; font-weight: 700;
          background: var(--accent-primary); color: #fff;
          border: 2px solid var(--accent-primary);
          box-shadow: 0 4px 18px rgba(59,130,246,.35);
          transition: background .2s ease, box-shadow .2s ease;
          text-decoration: none;
        }
        .cta-btn-primary:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
          box-shadow: 0 6px 26px rgba(59,130,246,.48);
        }
        .cta-btn-arrow { transition: transform .2s ease; }
        .cta-btn-primary:hover .cta-btn-arrow { transform: translateX(3px); }

        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .75rem 1.75rem; border-radius: .875rem;
          font-size: .9rem; font-weight: 700;
          background: transparent;
          color: var(--text-secondary);
          border: 2px solid var(--border-strong);
          transition: all .2s ease;
          text-decoration: none;
        }
        .cta-btn-secondary:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: var(--accent-light);
        }
      `}</style>
    </section>
  )
}
