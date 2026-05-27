// ============================================================
// AboutConnect.jsx — v2.3.2
// "Find Me Online" — fully redesigned.
// Featured cards: large, platform-colored accent left bar.
// Grid cards: compact, icon + name + handle.
// Fully light/dark mode responsive.
// ============================================================

import { motion }           from 'framer-motion'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faArrowRight }     from '@fortawesome/free-solid-svg-icons'
import { SOCIALS, fadeUp, stagger } from './aboutData.js'

function SectionLabel({ text }) {
  return <p className="abc-label">{text}</p>
}

export default function AboutConnect() {
  const featured = SOCIALS.filter(s => s.featured)
  const others   = SOCIALS.filter(s => !s.featured)

  return (
    <section className="section section-alt" id="about-social">
      <div className="container-xl">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>
          <motion.div variants={fadeUp} className="abc-head">
            <SectionLabel text="Connect" />
            <h2 className="abc-h2">
              Find Me <span className="abc-accent">Online</span>
            </h2>
            <p className="abc-sub">
              Reach out, follow along, or just say hello — I'm active across all these platforms.
            </p>
          </motion.div>
        </motion.div>

        {/* Featured platforms — 3 large cards */}
        <motion.div
          className="abc-featured"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}>
          {featured.map(({ icon, label, handle, url, color }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className="abc-feat-card card"
              style={{ '--cc': color }}>
              {/* Left accent bar */}
              <div className="abc-feat-accent" style={{ background: color }} />
              {/* Icon */}
              <div className="abc-feat-icon-wrap" style={{ background: `${color}15` }}>
                <FontAwesomeIcon icon={icon} style={{ color }} className="abc-feat-icon" />
              </div>
              {/* Info */}
              <div className="abc-feat-info">
                <p className="abc-feat-name">{label}</p>
                <p className="abc-feat-handle">{handle}</p>
              </div>
              {/* Arrow */}
              <div className="abc-feat-arrow">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Other platforms — compact grid */}
        <motion.div
          className="abc-grid"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5, delay: .15 }}>
          {others.map(({ icon, label, handle, url, color }, i) => (
            <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className="abc-card card"
              style={{ '--cc': color }}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .4, delay: i * .05 }}>
              <div className="abc-card-icon-wrap" style={{ background: `${color}12` }}>
                <FontAwesomeIcon icon={icon} style={{ color }} className="abc-card-icon" />
              </div>
              <div className="abc-card-info">
                <p className="abc-card-name">{label}</p>
                <p className="abc-card-handle">{handle}</p>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="abc-card-arrow" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <style>{`
        .abc-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .abc-head { text-align: center; margin-bottom: 3rem; }
        .abc-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .abc-accent { color: var(--accent-primary); }
        .abc-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Featured cards ── */
        .abc-featured {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin-bottom: 1rem;
        }
        @media (max-width: 720px) { .abc-featured { grid-template-columns: 1fr; } }
        @media (min-width: 480px) and (max-width: 720px) {
          .abc-featured { grid-template-columns: 1fr 1fr; }
        }

        .abc-feat-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.2rem 1.4rem;
          text-decoration: none; position: relative;
          overflow: hidden;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .abc-feat-card:hover {
          transform: translateY(-3px);
          border-color: var(--cc, var(--accent-primary));
          box-shadow: 0 6px 24px rgba(0,0,0,.12), 0 0 0 1px var(--cc, var(--accent-primary));
        }
        /* Subtle hover bg tint */
        .abc-feat-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: var(--cc, var(--accent-primary));
          opacity: 0; transition: opacity .2s ease;
        }
        .abc-feat-card:hover::before { opacity: .04; }

        .abc-feat-accent {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; flex-shrink: 0;
          transition: width .2s ease;
        }
        .abc-feat-card:hover .abc-feat-accent { width: 5px; }

        .abc-feat-icon-wrap {
          width: 44px; height: 44px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease;
        }
        .abc-feat-card:hover .abc-feat-icon-wrap {
          background: color-mix(in srgb, var(--cc, var(--accent-primary)) 22%, transparent) !important;
        }
        .abc-feat-icon { font-size: 1.3rem; }

        .abc-feat-info { flex: 1; }
        .abc-feat-name {
          font-size: .9rem; font-weight: 700; color: var(--text-primary); margin-bottom: .15rem;
        }
        .abc-feat-handle {
          font-size: .75rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        .abc-feat-arrow {
          font-size: .8rem; color: var(--text-tertiary); opacity: .4;
          transition: transform .2s, color .2s, opacity .2s;
        }
        .abc-feat-card:hover .abc-feat-arrow {
          transform: translateX(4px);
          color: var(--cc, var(--accent-primary)); opacity: 1;
        }

        /* ── Compact grid ── */
        .abc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        @media (min-width: 640px) { .abc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 900px) { .abc-grid { grid-template-columns: repeat(4, 1fr); } }

        .abc-card {
          display: flex; align-items: center; gap: .75rem;
          padding: .9rem 1rem; text-decoration: none;
          transition: transform .2s ease, border-color .2s ease;
          position: relative; overflow: hidden;
        }
        .abc-card:hover {
          transform: translateY(-2px);
          border-color: var(--cc, var(--accent-primary));
        }
        .abc-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: var(--cc, var(--accent-primary));
          opacity: 0; transition: opacity .2s ease;
        }
        .abc-card:hover::before { opacity: .04; }

        .abc-card-icon-wrap {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background .2s ease;
        }
        .abc-card:hover .abc-card-icon-wrap {
          background: color-mix(in srgb, var(--cc, var(--accent-primary)) 20%, transparent) !important;
        }
        .abc-card-icon { font-size: 1rem; }

        .abc-card-info { flex: 1; min-width: 0; }
        .abc-card-name {
          font-size: .82rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-card-handle {
          font-size: .68rem; color: var(--text-tertiary); font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-card-arrow {
          font-size: .6rem; color: var(--text-tertiary); opacity: .3;
          transition: transform .2s, color .2s, opacity .2s; flex-shrink: 0;
        }
        .abc-card:hover .abc-card-arrow {
          transform: translateX(3px);
          color: var(--cc, var(--accent-primary)); opacity: 1;
        }

        /* Light mode explicit overrides */
        [data-theme=light] .abc-feat-card,
        [data-theme=light] .abc-card {
          background: var(--bg-surface);
          border-color: var(--border-color);
        }
        [data-theme=light] .abc-feat-card:hover,
        [data-theme=light] .abc-card:hover {
          background: var(--bg-surface);
          box-shadow: 0 4px 20px rgba(0,0,0,.08);
        }
      `}</style>
    </section>
  )
}
