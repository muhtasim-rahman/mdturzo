// Journey.jsx — v2.2.7 NEW SECTION
// "My Journey" — vertical timeline of milestones
// Plain bg (not section-alt), between Skills and Services
// Shows personal story, builds trust, great portfolio addition
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faRocket, faStar,
  faGraduationCap, faLaptopCode, faTrophy, faFire,
} from '@fortawesome/free-solid-svg-icons'

const MILESTONES = [
  {
    year: '2019',
    icon: faCode,
    color: '#3B82F6',
    title: 'First Line of Code',
    desc: 'Discovered web development through YouTube. Wrote my very first HTML page — a simple "Hello World" that sparked everything.',
    tag: 'Beginning',
  },
  {
    year: '2020',
    icon: faPalette,
    color: '#EC4899',
    title: 'Fell in Love with Design',
    desc: 'Started exploring graphic design — logos, banners, thumbnails. Realized that design and code together are a superpower.',
    tag: 'Design',
  },
  {
    year: '2021',
    icon: faLaptopCode,
    color: '#10B981',
    title: 'Built First Real Project',
    desc: 'Shipped my first complete web application. Pure HTML/CSS/JS — no frameworks, just fundamentals and a lot of debugging.',
    tag: 'Milestone',
  },
  {
    year: '2022',
    icon: faRocket,
    color: '#F59E0B',
    title: 'Levelled Up with React',
    desc: 'Learned React, Firebase, and modern tooling. Projects became more complex, more polished. Started building for real users.',
    tag: 'Growth',
  },
  {
    year: '2023',
    icon: faStar,
    color: '#A855F7',
    title: 'Freelance & Open Source',
    desc: 'Took on first freelance clients. Published open-source tools used by other developers. Community and collaboration began.',
    tag: 'Professional',
  },
  {
    year: '2024',
    icon: faTrophy,
    color: '#06B6D4',
    title: '16+ Projects Shipped',
    desc: 'Crossed 16 completed projects spanning web apps, design systems, Islamic tools, and developer utilities. Still building.',
    tag: 'Now',
  },
]

function MilestoneCard({ m, i, isRight }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      className={`jn-row ${isRight ? 'jn-row--right' : ''}`}
      initial={{ opacity:0, x: isRight ? 30 : -30 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, amount:.3 }}
      transition={{ duration:.5, delay:i*.08, ease:[.16,1,.3,1] }}>

      {/* Year label */}
      <div className="jn-year" style={{ color: m.color }}>{m.year}</div>

      {/* Timeline dot */}
      <div className="jn-dot-wrap">
        <div className="jn-dot" style={{ '--c': m.color, boxShadow: hov ? `0 0 0 6px ${m.color}22, 0 0 20px ${m.color}44` : `0 0 0 4px ${m.color}18` }}>
          <FontAwesomeIcon icon={m.icon} style={{ color: m.color, fontSize: 13 }}/>
        </div>
      </div>

      {/* Card */}
      <div
        className="jn-card"
        style={{ '--c': m.color, borderColor: hov ? m.color : undefined }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}>
        <div className="jn-card-head">
          <span className="jn-tag" style={{ background:`${m.color}18`, color:m.color, border:`1px solid ${m.color}30` }}>{m.tag}</span>
        </div>
        <h3 className="jn-card-title">{m.title}</h3>
        <p className="jn-card-desc">{m.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  return (
    <section className="section" id="journey">
      <div className="container-xl">
        <motion.div className="text-center mb-14"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">How I Got Here</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">My Journey</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            From a curious student to a self-taught developer — one project at a time.
          </p>
        </motion.div>

        <div className="jn-timeline">
          {/* Center line */}
          <div className="jn-line"/>
          {MILESTONES.map((m, i) => (
            <MilestoneCard key={m.year} m={m} i={i} isRight={i % 2 === 1}/>
          ))}
        </div>

        {/* "Still going" marker */}
        <motion.div className="flex flex-col items-center mt-10 gap-2"
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.5, delay:.3 }}>
          <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FontAwesomeIcon icon={faFire} className="text-white text-sm"/>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] font-mono tracking-wider uppercase">Still going…</p>
        </motion.div>
      </div>

      <style>{`
        /* Timeline wrapper */
        .jn-timeline {
          position: relative;
          max-width: 860px;
          margin-inline: auto;
        }
        /* Center vertical line */
        .jn-line {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%; transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(to bottom,
            transparent,
            var(--border-color) 8%,
            var(--border-color) 92%,
            transparent
          );
          pointer-events: none;
        }

        /* Row — alternating left/right */
        .jn-row {
          display: grid;
          grid-template-columns: 1fr 44px 1fr;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        /* Right rows: reverse column order */
        .jn-row--right { direction: rtl; }
        .jn-row--right > * { direction: ltr; }

        /* Year label */
        .jn-year {
          text-align: right;
          font-family: var(--font-mono);
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .06em;
          opacity: .8;
        }
        .jn-row--right .jn-year { text-align: left; }

        /* Dot */
        .jn-dot-wrap {
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .jn-dot {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-surface);
          border: 2px solid var(--c);
          flex-shrink: 0;
          transition: box-shadow .22s ease;
          z-index: 1;
        }

        /* Card */
        .jn-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1rem 1.15rem;
          transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
          cursor: default;
        }
        .jn-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,.14);
        }
        .jn-card-head { margin-bottom: .5rem; }
        .jn-tag {
          display: inline-block;
          font-size: .68rem; font-weight: 700;
          padding: 2px 8px; border-radius: 9999px;
          letter-spacing: .04em;
        }
        .jn-card-title {
          font-size: .95rem; font-weight: 700;
          font-family: var(--font-display);
          color: var(--text-primary);
          margin-bottom: .3rem;
        }
        .jn-card-desc {
          font-size: .8rem; color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ── Mobile: single column ── */
        @media(max-width: 700px) {
          .jn-line { left: 20px; transform: none; }
          .jn-row {
            grid-template-columns: 44px 1fr;
            direction: ltr !important;
          }
          .jn-year { display: none; }
          .jn-dot-wrap { justify-content: flex-start; }
          .jn-row--right { direction: ltr !important; }
        }
        @media(max-width: 480px) {
          .jn-card { padding: .85rem 1rem; }
          .jn-card-title { font-size: .88rem; }
          .jn-card-desc { font-size: .76rem; }
        }
      `}</style>
    </section>
  )
}
