// ============================================================
// AboutValues.jsx — v2.3.6
// Values & Personality + Hobbies chips.
// Grid: PC → 3 per row, Tablet → 2 per row, Mobile → 1 per row.
// CHANGES (v2.3.6):
//   * Now fetches from Supabase `about_values` + `about_hobbies` tables
//   * VALUES_FALLBACK / HOBBIES_FALLBACK shown instantly, swapped for
//     live data per-table if/when each fetch succeeds.
//   * fadeUp/stagger inlined (was imported from the now-removed aboutData.js)
// ============================================================

import { useEffect, useState }  from 'react'
import { motion }           from 'framer-motion'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import {
  faHeart, faMosque, faDumbbell, faBrain, faShield, faMedal, faUsers,
  faCode, faBicycle, faGlobe, faBook, faSeedling, faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { getAboutValues, getAboutHobbies } from '../../services/supabase.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

// icon_key (Supabase) -> FontAwesome icon
const ICON_MAP = {
  mosque: faMosque, dumbbell: faDumbbell, brain: faBrain, shield: faShield,
  medal: faMedal, users: faUsers, code: faCode, bicycle: faBicycle,
  globe: faGlobe, book: faBook, seedling: faSeedling, camera: faCamera,
}
const resolveIcon = (key) => ICON_MAP[key] ?? faHeart

const VALUES_FALLBACK = [
  { icon: faMosque,    color: '#10B981', title: 'Islam First',       desc: 'All work follows Islamic & ethical principles. Halal income is non-negotiable.' },
  { icon: faDumbbell,  color: '#3B82F6', title: 'Discipline',        desc: 'Structured routines, focused sessions, and consistent daily effort.'           },
  { icon: faBrain,     color: '#8B5CF6', title: 'Useful Knowledge',  desc: 'Only learning things with real practical value — no wasted effort.'            },
  { icon: faShield,    color: '#F59E0B', title: 'Honesty',           desc: 'Quality work speaks for itself. No shortcuts, no showing off.'                 },
  { icon: faMedal,     color: '#EC4899', title: 'Perfection',        desc: 'Spending whatever time it takes to get things exactly right.'                  },
  { icon: faUsers,     color: '#06B6D4', title: 'Community',         desc: 'Building tech that genuinely benefits people around me.'                       },
]

const HOBBIES_FALLBACK = [
  { icon: faMosque,   label: 'Prayer (Salah)' },
  { icon: faCode,     label: 'Programming'    },
  { icon: faDumbbell, label: 'Outdoor Games'  },
  { icon: faBicycle,  label: 'Cycling'        },
  { icon: faGlobe,    label: 'Travelling'     },
  { icon: faBook,     label: 'Reading'        },
  { icon: faSeedling, label: 'Learning'       },
  { icon: faCamera,   label: 'Editing'        },
]

function SectionLabel({ text }) {
  return <p className="abv-label">{text}</p>
}

export default function AboutValues() {
  const [values,  setValues]  = useState(VALUES_FALLBACK)
  const [hobbies, setHobbies] = useState(HOBBIES_FALLBACK)

  useEffect(() => {
    getAboutValues()
      .then(rows => {
        if (!rows?.length) return
        setValues(rows.map(r => ({ icon: resolveIcon(r.icon_key), color: r.color, title: r.title, desc: r.description })))
      })
      .catch(() => {})
    getAboutHobbies()
      .then(rows => {
        if (!rows?.length) return
        setHobbies(rows.map(r => ({ icon: resolveIcon(r.icon_key), label: r.label })))
      })
      .catch(() => {})
  }, [])

  return (
    <section className="section section-alt" id="about-values">
      <div className="container-xl">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}
          variants={stagger(.1)}>
          <motion.div variants={fadeUp} className="abv-head">
            <SectionLabel text="Who I Am" />
            <h2 className="abv-h2">
              Values &amp; <span className="abv-accent">Personality</span>
            </h2>
            <p className="abv-sub">
              What drives me, what I believe in, and how I approach life and work.
            </p>
          </motion.div>
        </motion.div>

        {/* 3-2-1 grid */}
        <div className="abv-grid">
          {values.map(({ icon, color, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .5, delay: i * .07 }}
              className="abv-card card">
              <div className="abv-icon" style={{ background: `${color}18`, color }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="abv-card-body">
                <h3 className="abv-title">{title}</h3>
                <p className="abv-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hobbies */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5, delay: .2 }}
          className="abv-hobbies click-fx">
          <p className="abv-hobbies-title">
            <FontAwesomeIcon icon={faHeart} style={{ color: '#EC4899', marginRight: '.5rem' }} />
            Hobbies &amp; Interests
          </p>
          <div className="abv-chips" data-click-fx-ignore="true">
            {hobbies.map(({ icon, label }) => (
              <span key={label} className="abv-chip" data-click-fx-ignore="true">
                <FontAwesomeIcon icon={icon} style={{ color: 'var(--accent-primary)', fontSize: '.75rem' }} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .abv-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: var(--accent-primary);
          margin-bottom: .6rem;
        }
        .abv-head { text-align: center; margin-bottom: 2.5rem; }
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

        /* 3-2-1 explicit grid */
        .abv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin-bottom: 2rem;
        }
        @media (max-width: 900px) {
          .abv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .abv-grid { grid-template-columns: 1fr; gap: .75rem; }
        }

        /* Card */
        .abv-card {
          padding: 1.4rem 1.25rem;
        }
        .abv-card-body { display: flex; flex-direction: column; }
        @media (max-width: 560px) {
          .abv-card {
            padding: 1rem 1.1rem;
            display: flex; flex-direction: row; align-items: flex-start; gap: .9rem;
          }
          .abv-card .abv-icon { flex-shrink: 0; margin-bottom: 0; margin-top: .1rem; }
          .abv-card-body { flex: 1; min-width: 0; }
        }
        .abv-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: .95rem; margin-bottom: .85rem; flex-shrink: 0;
        }
        @media (max-width: 560px) { .abv-icon { margin-bottom: 0; } }
        .abv-title {
          font-size: .9rem; font-weight: 700; color: var(--text-primary); margin-bottom: .35rem;
        }
        .abv-desc { font-size: .82rem; color: var(--text-secondary); line-height: 1.65; }

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
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }
        @media (max-width: 560px) {
          .abv-hobbies { padding: 1.1rem; }
          .abv-chip { font-size: .76rem; padding: .3rem .7rem; }
        }
      `}</style>
    </section>
  )
}
