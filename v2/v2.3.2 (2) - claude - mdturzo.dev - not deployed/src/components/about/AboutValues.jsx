// ============================================================
// components/about/AboutValues.jsx — v2.3.2
// Values & Personality — 3 per row (PC), 2 (tablet), 1 (mobile)
// Compact on mobile; hobbies chips included
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMosque, faDumbbell, faBrain, faShield, faMedal, faUsers,
  faHeart, faCode, faBicycle, faGlobe, faBook, faSeedling,
  faCamera,
} from '@fortawesome/free-solid-svg-icons'

const VALUES = [
  { icon: faMosque,  color: '#10B981', title: 'Islam First',    desc: 'All work follows Islamic & ethical principles. Halal income is non-negotiable.' },
  { icon: faDumbbell,color: '#3B82F6', title: 'Discipline',     desc: 'Structured routines, focused sessions, and consistent daily effort.' },
  { icon: faBrain,   color: '#8B5CF6', title: 'Useful Knowledge',desc: 'Only learning things with real practical value — no wasted effort.' },
  { icon: faShield,  color: '#F59E0B', title: 'Honesty',        desc: 'Quality work speaks for itself. No shortcuts, no showing off.' },
  { icon: faMedal,   color: '#EC4899', title: 'Perfection',     desc: 'Spending whatever time it takes to get things exactly right.' },
  { icon: faUsers,   color: '#06B6D4', title: 'Community',      desc: 'Building tech that genuinely benefits people around me.' },
]

const HOBBIES = [
  { icon: faMosque,  label: 'Prayer (Salah)' },
  { icon: faCode,    label: 'Programming'    },
  { icon: faDumbbell,label: 'Outdoor Games'  },
  { icon: faBicycle, label: 'Cycling'        },
  { icon: faGlobe,   label: 'Travelling'     },
  { icon: faBook,    label: 'Reading'        },
  { icon: faSeedling,label: 'Learning'       },
  { icon: faCamera,  label: 'Editing'        },
]

export default function AboutValues() {
  return (
    <section className="section section-alt" id="about-values">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}
          className="abv-header"
        >
          <p className="abv-label">Who I Am</p>
          <h2 className="abv-h2">Values &amp; <span className="abv-accent">Personality</span></h2>
          <p className="abv-sub">What drives me, what I believe in, and how I approach life and work.</p>
        </motion.div>

        {/* 3 per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="abv-grid">
          {VALUES.map(({ icon, color, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: i * .07 }}
              className="abv-card card"
            >
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
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5, delay: .2 }}
          className="abv-hobbies"
        >
          <p className="abv-hobbies-title">
            <FontAwesomeIcon icon={faHeart} style={{ color: '#EC4899', marginRight: '.5rem' }} />
            Hobbies &amp; Interests
          </p>
          <div className="abv-chips">
            {HOBBIES.map(({ icon, label }) => (
              <span key={label} className="abv-chip">
                <FontAwesomeIcon icon={icon} className="abv-chip-icon" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .abv-header { text-align: center; margin-bottom: 3rem; }
        .abv-label {
          display: inline-block; font-family: var(--font-mono);
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .abv-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .abv-accent { color: var(--accent-primary); }
        .abv-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Grid — 3/2/1 */
        .abv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .abv-card {
          padding: 1.4rem 1.25rem;
          display: flex; flex-direction: column; gap: .65rem;
        }
        .abv-icon {
          width: 44px; height: 44px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem; flex-shrink: 0;
        }
        .abv-title { font-size: .9rem; font-weight: 700; color: var(--text-primary); }
        .abv-desc  { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; }

        /* Hobbies */
        .abv-hobbies {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.25rem 1.5rem;
        }
        .abv-hobbies-title {
          font-size: .85rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: .75rem;
        }
        .abv-chips { display: flex; flex-wrap: wrap; gap: .5rem; }
        .abv-chip {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .3rem .75rem; border-radius: var(--radius-full);
          background: var(--bg-page); border: 1px solid var(--border-color);
          font-size: .78rem; color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .abv-chip-icon { color: var(--accent-primary); font-size: .7rem; }

        /* Tablet: 2 per row */
        @media (max-width: 900px) {
          .abv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        /* Mobile: 1 per row, compact */
        @media (max-width: 560px) {
          .abv-grid { grid-template-columns: 1fr; gap: .85rem; }
          .abv-card { padding: 1rem 1rem; flex-direction: row; align-items: flex-start; gap: .85rem; }
          .abv-icon { flex-shrink: 0; }
          .abv-title { margin-bottom: .15rem; }
          .abv-hobbies { padding: 1rem; }
        }
      `}</style>
    </section>
  )
}
