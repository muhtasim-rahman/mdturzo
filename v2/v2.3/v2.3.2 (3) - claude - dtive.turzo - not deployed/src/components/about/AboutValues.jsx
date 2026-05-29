// ============================================================
// AboutValues.jsx — v2.3.2
// Values & Personality section
// Grid: 3 per row (desktop), 2 (tablet), 1 (mobile)
// Mobile: compact card padding
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMosque, faDumbbell, faBrain, faShield,
  faMedal, faUsers, faHeart, faBicycle,
  faBook, faCamera, faSeedling, faCode, faGlobe,
} from '@fortawesome/free-solid-svg-icons'

const VALUES = [
  { icon: faMosque,   color: '#10B981', title: 'Islam First',      desc: 'All work follows Islamic & ethical principles. Halal income is non-negotiable.' },
  { icon: faDumbbell, color: '#3B82F6', title: 'Discipline',       desc: 'Structured routines, focused sessions, and consistent daily effort.' },
  { icon: faBrain,    color: '#8B5CF6', title: 'Useful Knowledge', desc: 'Only learning things with real practical value — no wasted effort.' },
  { icon: faShield,   color: '#F59E0B', title: 'Honesty',          desc: 'Quality work speaks for itself. No shortcuts, no showing off.' },
  { icon: faMedal,    color: '#EC4899', title: 'Perfection',       desc: 'Spending whatever time it takes to get things exactly right.' },
  { icon: faUsers,    color: '#06B6D4', title: 'Community',        desc: 'Building tech that genuinely benefits people around me.' },
]

const HOBBIES = [
  { icon: faMosque,   label: 'Prayer (Salah)' },
  { icon: faCode,     label: 'Programming' },
  { icon: faDumbbell, label: 'Outdoor Games' },
  { icon: faBicycle,  label: 'Cycling' },
  { icon: faGlobe,    label: 'Travelling' },
  { icon: faBook,     label: 'Reading' },
  { icon: faSeedling, label: 'Learning' },
  { icon: faCamera,   label: 'Editing' },
]

export default function AboutValues() {
  return (
    <section className="section section-alt" id="about-values">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}
          className="abv-header">
          <p className="abv-label">Who I Am</p>
          <h2 className="abv-h2">
            Values &amp; <span className="abv-accent">Personality</span>
          </h2>
          <p className="abv-sub">
            What drives me, what I believe in, and how I approach life and work.
          </p>
        </motion.div>

        {/* Values grid: 3 desktop / 2 tablet / 1 mobile */}
        <div className="abv-grid">
          {VALUES.map(({ icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              className="abv-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .07 }}>
              <div className="abv-icon" style={{ background: `${color}18`, color }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <h3 className="abv-title">{title}</h3>
              <p className="abv-desc">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Hobbies */}
        <motion.div
          className="abv-hobbies"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5, delay: .2 }}>
          <p className="abv-hobbies-title">
            <FontAwesomeIcon icon={faHeart} style={{ color: '#EC4899', marginRight: '.5rem' }} />
            Hobbies &amp; Interests
          </p>
          <div className="abv-chips">
            {HOBBIES.map(({ icon, label }) => (
              <span key={label} className="abv-chip">
                <FontAwesomeIcon icon={icon} style={{ color: 'var(--accent-primary)', fontSize: '.75rem' }} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .abv-header { text-align: center; margin-bottom: 3rem; }
        .abv-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
        }
        .abv-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abv-accent { color: var(--accent-primary); }
        .abv-sub {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Grid: exactly 3/2/1 */
        .abv-grid {
          display: grid;
          grid-template-columns: 1fr;  /* mobile: 1 */
          gap: .85rem;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 560px) {
          .abv-grid { grid-template-columns: repeat(2, 1fr); } /* tablet: 2 */
        }
        @media (min-width: 900px) {
          .abv-grid { grid-template-columns: repeat(3, 1fr); } /* desktop: 3 */
        }

        /* Card — compact on mobile */
        .abv-card { height: 100%; }
        .abv-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .95rem; margin-bottom: .85rem;
        }
        .abv-title { font-size: .9rem; font-weight: 700; color: var(--text-primary); margin-bottom: .35rem; }
        .abv-desc  { font-size: .82rem; color: var(--text-secondary); line-height: 1.65; }

        /* Mobile compact */
        @media (max-width: 559px) {
          .abv-card { padding: 1rem !important; }
          .abv-icon { width: 36px; height: 36px; margin-bottom: .65rem; font-size: .85rem; }
          .abv-title { font-size: .85rem; }
          .abv-desc  { font-size: .78rem; }
        }

        /* Hobbies */
        .abv-hobbies {
          padding: 1.5rem; border-radius: var(--radius-xl);
          background: var(--bg-surface); border: 1px solid var(--border-color);
        }
        .abv-hobbies-title {
          font-size: .875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem;
        }
        .abv-chips { display: flex; flex-wrap: wrap; gap: .5rem; }
        .abv-chip {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .35rem .85rem; border-radius: var(--radius-full);
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          font-size: .8rem; color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .abv-chip:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--accent-light);
        }
      `}</style>
    </section>
  )
}
