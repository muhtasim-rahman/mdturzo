// ============================================================
// components/about/AboutSkills.jsx — v2.3.2
// Skills & Expertise — ALL 4 tabs use progress bar layout
// Same animation as home Skills section
// ============================================================

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faVideo, faGears, faBrain,
  faCamera, faHandshake, faGlobe, faBook,
  faTerminal, faLaptopCode,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.16,1,.3,1] } } }
const stagger = (d=.08) => ({ hidden:{}, show:{ transition:{ staggerChildren:d } } })

const DEV_SKILLS = [
  { name: 'AI Tools & Workflows', pct: 90, color: '#10B981', note: 'Coding, design, planning' },
  { name: 'HTML',                 pct: 80, color: '#F97316', note: 'Semantic markup, layouts' },
  { name: 'CSS',                  pct: 80, color: '#3B82F6', note: 'Animations, responsive' },
  { name: 'Git & GitHub',         pct: 78, color: '#64748B', note: 'Version control' },
  { name: 'Python',               pct: 60, color: '#EAB308', note: 'Scripting, learning' },
  { name: 'JavaScript',           pct: 45, color: '#F59E0B', note: 'Improving daily' },
  { name: 'Java',                 pct: 35, color: '#EC4899', note: 'Basic knowledge' },
]

const DESIGN_SKILLS = [
  { name: 'Thumbnail Design',  pct: 90, color: '#3B82F6', note: 'YouTube & social' },
  { name: 'Logo Design',       pct: 85, color: '#EC4899', note: 'Branding & identity' },
  { name: 'Banner Design',     pct: 85, color: '#8B5CF6', note: 'Social & web' },
  { name: 'HTML & CSS Design', pct: 80, color: '#06B6D4', note: 'Web UI' },
  { name: 'Poster Design',     pct: 80, color: '#F59E0B', note: 'Print & digital' },
  { name: 'Business Card',     pct: 78, color: '#10B981', note: 'Print design' },
  { name: 'Album / Book',      pct: 72, color: '#F97316', note: 'Layout design' },
]

const VIDEO_SKILLS = [
  { name: 'YouTube Videos',           pct: 85, color: '#EF4444', note: 'Long-form content' },
  { name: 'Facebook Videos',          pct: 80, color: '#3B82F6', note: 'Social media' },
  { name: 'Short Videos (Reels)',      pct: 80, color: '#EC4899', note: 'Reels & Shorts' },
  { name: 'Ads & Commercials',         pct: 70, color: '#F59E0B', note: 'Promo content' },
  { name: 'Basic Animation',           pct: 60, color: '#8B5CF6', note: 'Motion graphics' },
]

const TOOLS_SKILLS = [
  { name: 'VS Code',         pct: 95, color: '#007ACC', note: 'Primary editor' },
  { name: 'Browser DevTools',pct: 82, color: '#06B6D4', note: 'Debug & inspect' },
  { name: 'GitHub',          pct: 78, color: '#94A3B8', note: 'Version control' },
  { name: 'Tailwind CSS',    pct: 72, color: '#38BDF8', note: 'Utility styling' },
  { name: 'Firebase',        pct: 70, color: '#F59E0B', note: 'Backend / auth' },
  { name: 'Figma',           pct: 65, color: '#A855F7', note: 'UI design' },
  { name: 'Google Sheets API',pct:62, color: '#10B981', note: 'Data / forms' },
  { name: 'Odoo',            pct: 55, color: '#714B67', note: 'ERP/CMS' },
]

const NOTE_BOXES = {
  dev:    { icon: faBrain,   color: 'var(--accent-primary)', title: 'Still Learning', text: 'As a student, I\'m at an early stage. SSC exams slowed deep learning for ~2 years, but I never stopped building. Now the real journey begins.' },
  design: { icon: faPalette, color: '#EC4899',                title: '6+ Years Experience', text: 'Logo, banner, thumbnail — designing since age 12. Clean aesthetics, strong eye for detail.' },
  video:  { icon: faVideo,   color: '#A855F7',                title: '5+ Years Experience', text: 'YouTube, Facebook, Reels, Shorts — video editing as a creative outlet alongside development.' },
  tools:  { icon: faGears,   color: '#06B6D4',                title: 'Dev Toolkit', text: 'These are the tools I rely on daily for building, debugging, and shipping projects.' },
}

const TABS = [
  { id: 'dev',    label: 'Programming', icon: faCode    },
  { id: 'design', label: 'Design',      icon: faPalette },
  { id: 'video',  label: 'Video',       icon: faVideo   },
  { id: 'tools',  label: 'Tools',       icon: faGears   },
]

const TAB_DATA = { dev: DEV_SKILLS, design: DESIGN_SKILLS, video: VIDEO_SKILLS, tools: TOOLS_SKILLS }

function SkillBar({ name, pct, color, note, index, inView }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setGo(true), index * 80 + 150)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div className="absk-bar-row">
      <div className="absk-bar-meta">
        <span className="absk-bar-name">{name}</span>
        <div className="absk-bar-right">
          {note && <span className="absk-bar-note">{note}</span>}
          <span className="absk-bar-pct" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="absk-bar-track">
        <motion.div
          className="absk-bar-fill"
          style={{ background: color, boxShadow: `0 0 8px ${color}55` }}
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: .8, ease: [.16,1,.3,1], delay: index * .06 }}
        />
      </div>
    </div>
  )
}

export default function AboutSkills() {
  const [activeTab, setActiveTab] = useState('dev')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const note = NOTE_BOXES[activeTab]

  return (
    <section className="section section-alt" id="about-skills" ref={sectionRef}>
      <div className="container-xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} variants={stagger(.1)}>
          <motion.div variants={fadeUp} className="absk-head">
            <p className="absk-label">Skills &amp; Expertise</p>
            <h2 className="absk-h2">What I <span className="absk-accent">know</span></h2>
            <p className="absk-sub">Self-rated based on real project experience — honest about strengths and areas of growth.</p>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="absk-tabs">
          {TABS.map(({ id, label, icon }) => (
            <button key={id}
              className={`absk-tab${activeTab === id ? ' absk-tab-active' : ''}`}
              onClick={() => setActiveTab(id)}>
              <FontAwesomeIcon icon={icon} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content — all tabs use same bar layout */}
        <div className="absk-body">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
            className="absk-panel"
          >
            <div className="absk-bars">
              {TAB_DATA[activeTab].map((sk, i) => (
                <SkillBar key={sk.name} {...sk} index={i} inView={inView} />
              ))}
            </div>

            <div className="absk-note card">
              <FontAwesomeIcon icon={note.icon}
                style={{ color: note.color, fontSize: '1.1rem', marginBottom: '.5rem', display: 'block' }} />
              <p className="absk-note-title">{note.title}</p>
              <p className="absk-note-text">{note.text}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .absk-head { text-align: center; margin-bottom: 2.5rem; }
        .absk-label {
          display: inline-block; font-family: var(--font-mono);
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .absk-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .absk-accent { color: var(--accent-primary); }
        .absk-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* Tabs */
        .absk-tabs {
          display: flex; flex-wrap: wrap; gap: .5rem;
          justify-content: center; margin-bottom: 2rem;
        }
        .absk-tab {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .5rem 1.1rem; border-radius: var(--radius-xl);
          font-size: .82rem; font-weight: 600; cursor: pointer;
          transition: all .2s ease;
          background: var(--bg-surface); color: var(--text-secondary);
          border: 1.5px solid var(--border-color);
        }
        .absk-tab:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light);
        }
        .absk-tab-active {
          background: var(--accent-primary) !important; color: #fff !important;
          border-color: var(--accent-primary) !important;
          box-shadow: 0 2px 12px rgba(37,99,235,.3);
        }

        /* Panel */
        .absk-body { }
        .absk-panel {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 1.5rem 2rem;
          align-items: start;
        }

        /* Skill bars */
        .absk-bars { display: flex; flex-direction: column; gap: 1rem; }
        .absk-bar-row {}
        .absk-bar-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: .35rem;
        }
        .absk-bar-name  { font-size: .84rem; font-weight: 600; color: var(--text-primary); }
        .absk-bar-right { display: flex; align-items: center; gap: .6rem; }
        .absk-bar-note  {
          font-size: .7rem; color: var(--text-tertiary);
          font-family: var(--font-mono); display: none;
        }
        .absk-bar-pct   { font-size: .78rem; font-weight: 700; font-family: var(--font-mono); min-width: 36px; text-align: right; }
        .absk-bar-track {
          height: 7px; background: var(--bg-surface);
          border-radius: 999px; overflow: hidden;
          border: 1px solid var(--border-color);
        }
        .absk-bar-fill  { height: 100%; border-radius: 999px; }

        /* Note box */
        .absk-note {
          padding: 1.25rem; display: flex; flex-direction: column; gap: .2rem;
          align-self: start; position: sticky; top: calc(var(--navbar-h) + 1rem);
        }
        .absk-note-title { font-size: .88rem; font-weight: 700; color: var(--text-primary); margin-bottom: .3rem; }
        .absk-note-text  { font-size: .8rem; color: var(--text-secondary); line-height: 1.65; }

        @media (min-width: 960px) {
          .absk-bar-note { display: block; }
        }
        @media (max-width: 860px) {
          .absk-panel { grid-template-columns: 1fr; }
          .absk-note  { position: static; }
        }
        @media (max-width: 480px) {
          .absk-tabs { gap: .35rem; }
          .absk-tab  { padding: .45rem .85rem; font-size: .78rem; }
          .absk-tab span { display: none; }
        }
      `}</style>
    </section>
  )
}
