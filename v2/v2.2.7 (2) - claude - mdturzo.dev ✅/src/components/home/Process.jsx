// Process.jsx -- v2.2.7
// NEW SECTION: "How I Work" -- a useful portfolio addition
// Shows the process/workflow from brief to delivery with a timeline
// Also includes a quick "Why hire me?" value props row
// Plain bg (no section-alt)

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments, faLightbulb, faPenRuler, faCode,
  faVial, faRocket, faBolt, faClock, faShield, faHandshake,
} from '@fortawesome/free-solid-svg-icons'

const STEPS = [
  {
    num: '01',
    icon: faComments,
    color: '#3B82F6',
    title: 'Discovery & Brief',
    desc: 'We discuss your goals, audience, and requirements. I listen carefully to understand exactly what you need.',
  },
  {
    num: '02',
    icon: faLightbulb,
    color: '#F59E0B',
    title: 'Planning & Strategy',
    desc: 'I outline the project scope, timeline, and tech stack. A clear plan before any pixel or line of code.',
  },
  {
    num: '03',
    icon: faPenRuler,
    color: '#EC4899',
    title: 'Design & Prototype',
    desc: "UI mockups and interactive prototypes -- you see the vision before it's built. Feedback welcome.",
  },
  {
    num: '04',
    icon: faCode,
    color: '#A855F7',
    title: 'Development',
    desc: 'Clean, commented, and maintainable code. Built with modern tools -- React, Tailwind, Firebase and more.',
  },
  {
    num: '05',
    icon: faVial,
    color: '#10B981',
    title: 'Testing & Review',
    desc: 'Cross-browser and cross-device testing. Performance and accessibility checks before anything goes live.',
  },
  {
    num: '06',
    icon: faRocket,
    color: '#06B6D4',
    title: 'Launch & Support',
    desc: 'Smooth deployment with post-launch support. I make sure everything works perfectly in production.',
  },
]

const VALUES = [
  { icon: faBolt,       color: '#F59E0B', title: 'Fast Turnaround',   desc: 'Quick delivery without compromising quality.' },
  { icon: faClock,      color: '#3B82F6', title: 'On-Time Delivery',  desc: 'I respect deadlines and communicate proactively.' },
  { icon: faShield,     color: '#10B981', title: 'Clean Code',        desc: 'Readable, maintainable, and well-structured.' },
  { icon: faHandshake,  color: '#A855F7', title: 'Open Communication', desc: 'Always reachable and responsive throughout.' },
]

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-12"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">My Workflow</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">How I Work</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            A clear, collaborative process from first conversation to final launch -- so you always know what's happening.
          </p>
        </motion.div>

        {/* Process timeline grid */}
        <div className="proc-grid">
          {STEPS.map((step, i) => (
            <motion.div key={step.num} className="proc-card card"
              style={{ '--step-c': step.color }}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:.15 }}
              transition={{ duration:.45, delay: i * .06 }}>
              {/* Step number */}
              <div className="proc-num">{step.num}</div>
              {/* Icon */}
              <div className="proc-icon">
                <FontAwesomeIcon icon={step.icon} />
              </div>
              <h3 className="proc-title">{step.title}</h3>
              <p className="proc-desc">{step.desc}</p>
              {/* Bottom accent line */}
              <div className="proc-accent-line" />
            </motion.div>
          ))}
        </div>

        {/* Value props row */}
        <motion.div className="proc-values"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.3 }} transition={{ duration:.55, delay:.1 }}>
          <p className="proc-values-label">Why work with me?</p>
          <div className="proc-values-grid">
            {VALUES.map(v => (
              <div key={v.title} className="proc-value-item">
                <div className="proc-value-icon" style={{ '--vc': v.color }}>
                  <FontAwesomeIcon icon={v.icon} />
                </div>
                <div>
                  <p className="proc-value-title">{v.title}</p>
                  <p className="proc-value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        /* -- Process grid ------------------------------------ */
        .proc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 900px) {
          .proc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .proc-grid { grid-template-columns: 1fr; }
        }

        .proc-card {
          position: relative;
          padding: 1.3rem 1.2rem 1.5rem;
          overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          cursor: default;
        }
        .proc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 36px rgba(0,0,0,.2);
          border-color: color-mix(in srgb, var(--step-c) 35%, var(--border-color));
        }

        .proc-num {
          position: absolute;
          top: .9rem; right: 1rem;
          font-size: 2.2rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: var(--step-c);
          opacity: .08;
          line-height: 1;
          pointer-events: none;
          letter-spacing: -.04em;
        }

        .proc-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          background: color-mix(in srgb, var(--step-c) 13%, transparent);
          color: var(--step-c);
          margin-bottom: .8rem;
          border: 1px solid color-mix(in srgb, var(--step-c) 20%, transparent);
        }

        .proc-title {
          font-size: .9rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          margin-bottom: .4rem;
        }

        .proc-desc {
          font-size: .78rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .proc-accent-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--step-c), transparent);
          opacity: 0;
          transition: opacity .22s ease;
        }
        .proc-card:hover .proc-accent-line { opacity: .6; }

        /* -- Value props ------------------------------------- */
        .proc-values {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem 1.75rem;
        }
        .proc-values-label {
          font-size: .7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: var(--text-tertiary);
          margin-bottom: 1.1rem;
        }
        .proc-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .proc-values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .proc-values-grid { grid-template-columns: 1fr; }
          .proc-values { padding: 1.1rem 1.2rem; }
        }
        .proc-value-item {
          display: flex;
          align-items: flex-start;
          gap: .7rem;
        }
        .proc-value-icon {
          width: 32px; height: 32px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          background: color-mix(in srgb, var(--vc) 12%, transparent);
          color: var(--vc);
          flex-shrink: 0;
          border: 1px solid color-mix(in srgb, var(--vc) 18%, transparent);
        }
        .proc-value-title {
          font-size: .83rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .proc-value-desc {
          font-size: .75rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </section>
  )
}
