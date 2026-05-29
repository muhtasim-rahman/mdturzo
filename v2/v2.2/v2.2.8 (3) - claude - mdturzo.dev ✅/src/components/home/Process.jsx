// Process.jsx (Journey Timeline) -- v2.2.8
// Replaced "How I Work" with "My Journey" timeline (screenshot reference)
// Alternating left/right cards, center vertical line, year markers, category badges
// Clean dark/light theme, minimal colors, fully responsive

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faRocket, faTrophy,
  faBrain, faGraduationCap, faLaptopCode, faFire,
} from '@fortawesome/free-solid-svg-icons'

const EVENTS = [
  {
    year: '2019',
    side: 'right',
    icon: faCode,
    color: '#3B82F6',
    tag: 'Beginning',
    title: 'First Line of Code',
    desc: 'Discovered web development through YouTube. Wrote my very first HTML page -- a simple "Hello World" that sparked everything.',
  },
  {
    year: '2020',
    side: 'left',
    icon: faPalette,
    color: '#EC4899',
    tag: 'Design',
    title: 'Fell in Love with Design',
    desc: 'Started exploring graphic design -- logos, banners, thumbnails. Realized that design and code together are a superpower.',
  },
  {
    year: '2021',
    side: 'right',
    icon: faLaptopCode,
    color: '#10B981',
    tag: 'Milestone',
    title: 'Built First Real Project',
    desc: 'Shipped my first complete web application. Pure HTML/CSS/JS -- no frameworks. Learned that building is the best teacher.',
  },
  {
    year: '2022',
    side: 'left',
    icon: faFire,
    color: '#F59E0B',
    tag: 'Growth',
    title: 'Leveled Up with React',
    desc: 'Picked up React and Firebase. Started building dynamic apps with real backends. Portfolio began to take real shape.',
  },
  {
    year: '2023',
    side: 'right',
    icon: faBrain,
    color: '#A855F7',
    tag: 'Expansion',
    title: 'AI & Full-Stack Thinking',
    desc: 'Embraced AI-assisted workflows and started thinking in full systems -- from design tokens to deployment pipelines.',
  },
  {
    year: '2024+',
    side: 'left',
    icon: faRocket,
    color: '#06B6D4',
    tag: 'Now',
    title: 'Freelancing & Open Source',
    desc: 'Taking on client projects, contributing to open source, and building tools I wish existed. The journey continues.',
  },
]

function TimelineCard({ ev, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className={`tl-row tl-row--${ev.side}`}
      aria-label={`${ev.year}: ${ev.title}`}
    >
      {/* Spacer for opposite side */}
      <div className="tl-spacer" />

      {/* Center dot + year */}
      <div className="tl-mid">
        <motion.div
          className="tl-dot"
          style={{ '--dc': ev.color, borderColor: ev.color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <FontAwesomeIcon icon={ev.icon} className="tl-dot-icon" style={{ color: ev.color }} />
        </motion.div>
        <motion.span
          className="tl-year"
          style={{ color: ev.color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          {ev.year}
        </motion.span>
      </div>

      {/* Card */}
      <motion.div
        className="tl-card card"
        style={{ '--cc': ev.color }}
        initial={{ opacity: 0, x: ev.side === 'right' ? 32 : -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="tl-tag" style={{ background: `${ev.color}18`, color: ev.color, borderColor: `${ev.color}30` }}>
          {ev.tag}
        </span>
        <h3 className="tl-title">{ev.title}</h3>
        <p className="tl-desc">{ev.desc}</p>
      </motion.div>
    </div>
  )
}

export default function Process() {
  return (
    <section className="section" id="journey">
      <div className="container-xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">How I Got Here</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">My Journey</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            From a curious student to a self-taught developer -- one project at a time.
          </p>
        </motion.div>

        <div className="tl-wrap">
          {/* Center vertical line */}
          <div className="tl-line" aria-hidden="true" />
          {EVENTS.map((ev, i) => <TimelineCard key={ev.year} ev={ev} i={i} />)}
        </div>
      </div>

      <style>{`
        /* ---- Timeline container -------------------------------- */
        .tl-wrap {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Center vertical line */
        .tl-line {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            var(--border-color) 6%,
            var(--border-color) 94%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ---- Each row ------------------------------------------ */
        .tl-row {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          align-items: start;
          gap: 0;
          position: relative;
          z-index: 1;
          padding-block: 1.4rem 1rem;
        }

        /* Right-side card: card in col 3, spacer in col 1 */
        .tl-row--right .tl-spacer { order: 1; }
        .tl-row--right .tl-mid    { order: 2; }
        .tl-row--right .tl-card   { order: 3; margin-left: 1.2rem; }

        /* Left-side card: card in col 1, spacer in col 3 */
        .tl-row--left .tl-card   { order: 1; margin-right: 1.2rem; }
        .tl-row--left .tl-mid    { order: 2; }
        .tl-row--left .tl-spacer { order: 3; }

        /* ---- Center column ------------------------------------ */
        .tl-mid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .35rem;
          padding-top: .25rem;
        }

        .tl-dot {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 2px solid;
          background: var(--bg-surface);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 4px var(--bg-page), 0 0 12px var(--dc, #3B82F6);
          flex-shrink: 0;
          z-index: 2;
          position: relative;
        }
        .tl-dot-icon { font-size: 13px; }

        .tl-year {
          font-size: .72rem;
          font-weight: 700;
          font-family: var(--font-mono);
          letter-spacing: .03em;
          text-align: center;
          white-space: nowrap;
        }

        /* ---- Card -------------------------------------------- */
        .tl-card {
          padding: 1rem 1.1rem;
          border-radius: 14px;
          transition: border-color .2s ease, transform .2s ease;
        }
        .tl-card:hover {
          border-color: color-mix(in srgb, var(--cc) 35%, var(--border-color));
          transform: translateY(-2px);
        }

        .tl-tag {
          display: inline-flex;
          align-items: center;
          font-size: .68rem;
          font-weight: 600;
          padding: .2rem .55rem;
          border-radius: 9999px;
          border: 1px solid;
          margin-bottom: .5rem;
          letter-spacing: .02em;
        }

        .tl-title {
          font-size: .92rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          margin-bottom: .35rem;
          line-height: 1.3;
        }

        .tl-desc {
          font-size: .78rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ---- Responsive: single column on mobile -------------- */
        @media (max-width: 680px) {
          .tl-line { left: 20px; }

          .tl-row {
            grid-template-columns: 56px 1fr;
            grid-template-rows: auto;
            padding-block: 1rem .8rem;
          }

          .tl-row--right .tl-spacer,
          .tl-row--left .tl-spacer { display: none; }

          .tl-row--right .tl-mid,
          .tl-row--left .tl-mid    { order: 1; }

          .tl-row--right .tl-card,
          .tl-row--left .tl-card   { order: 2; margin-left: .9rem; margin-right: 0; }

          .tl-dot { width: 32px; height: 32px; }
          .tl-dot-icon { font-size: 11px; }
          .tl-year { font-size: .65rem; }
        }
      `}</style>
    </section>
  )
}
