// WorkflowSetup.jsx -- v2.2.9
// CHANGES:
//   * Updated with Turzo's real tools and info (from about.md)
//   * Improved design with better light mode support
//   * Better alignment and responsiveness
//   * Section can be modified cleanly

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faLayerGroup, faRocket, faTerminal,
  faFolderTree, faGlobe, faDatabase, faBolt, faCheck,
  faVideo, faMobileAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFigma, faYoutube,
} from '@fortawesome/free-brands-svg-icons'

// v2.2.9: Updated with Turzo's actual tools from about.md
const TOOLSET = [
  { icon: faCode,       label: 'VS Code',        sub: 'Primary editor',          color: '#3B82F6' },
  { icon: faGithub,     label: 'Git & GitHub',   sub: 'Version control',         color: '#94A3B8' },
  { icon: faGlobe,      label: 'HTML + CSS',      sub: 'Core web stack',          color: '#F97316' },
  { icon: faDatabase,   label: 'Firebase',        sub: 'Backend & hosting',       color: '#F59E0B' },
  { icon: faLayerGroup, label: 'Tailwind CSS',    sub: 'Utility-first styling',   color: '#06B6D4' },
  { icon: faPalette,    label: 'Graphic Design',  sub: 'Logo, banner, poster',    color: '#EC4899' },
  { icon: faVideo,      label: 'Video Editing',   sub: 'YouTube, reels, ads',     color: '#A855F7' },
  { icon: faMobileAlt,  label: 'PWA / Mobile',    sub: 'Installable web apps',    color: '#10B981' },
]

// v2.2.9: Updated to reflect Turzo's actual dev principles
const PRINCIPLES = [
  'Clean, readable code — quality over shortcuts',
  'Mobile-first, responsive-always design',
  'Halal & ethical approach in all projects',
  'Self-learning through building real things',
]

// Fake code lines for editor mockup
const CODE_LINES = [
  { indent:0, tokens:[{t:'keyword',v:'import'},{t:'plain',v:' { '},{t:'fn',v:'useState'},{t:'plain',v:' } '},{t:'keyword',v:'from'},{t:'str',v:"'react'"}] },
  { indent:0, tokens:[{t:'keyword',v:'import'},{t:'plain',v:' '},{t:'fn',v:'Hero'},{t:'plain',v:' '},{t:'keyword',v:'from'},{t:'str',v:"'./Hero'"}] },
  { indent:0, tokens:[] },
  { indent:0, tokens:[{t:'keyword',v:'export default function'},{t:'plain',v:' '},{t:'fn',v:'App'},{t:'plain',v:'() {'}] },
  { indent:1, tokens:[{t:'keyword',v:'const'},{t:'plain',v:' ['},{t:'var',v:'dark'},{t:'plain',v:', '},{t:'var',v:'setDark'},{t:'plain',v:'] = '},{t:'fn',v:'useState'},{t:'plain',v:'('},{t:'bool',v:'false'},{t:'plain',v:')'}] },
  { indent:0, tokens:[] },
  { indent:1, tokens:[{t:'keyword',v:'return'},{t:'plain',v:' <'},{t:'tag',v:'Hero'},{t:'plain',v:' '},{t:'attr',v:'dark'},{t:'plain',v:'={'},{t:'var',v:'dark'},{t:'plain',v:'} />'}] },
  { indent:0, tokens:[{t:'plain',v:'}'}] },
  { indent:0, tokens:[] },
  { indent:0, tokens:[{t:'comment',v:'// Built with: HTML · CSS · JS · Firebase'}] },
  { indent:0, tokens:[{t:'comment',v:'// By: Muhtasim Rahman (Turzo)'}] },
  { indent:0, tokens:[{t:'comment',v:'// Goal: CSE Engineer · Full-Stack Dev'}] },
]

const TOKEN_COLORS = {
  keyword: '#C084FC',
  fn:      '#60A5FA',
  str:     '#86EFAC',
  var:     '#FCA5A5',
  bool:    '#F97316',
  obj:     '#67E8F9',
  tag:     '#34D399',
  attr:    '#FDE68A',
  comment: '#64748B',
  plain:   'rgba(226,232,240,0.75)',
}

function CodeLine({ tokens, indent }) {
  if (tokens.length === 0) return <div className="mws-code-line" style={{height:'1.1em'}} />
  return (
    <div className="mws-code-line">
      {Array.from({length: indent}).map((_, i) => (
        <span key={i} style={{display:'inline-block', width:'1.6em'}} />
      ))}
      {tokens.map((tok, i) => (
        <span key={i} style={{color: TOKEN_COLORS[tok.t] || TOKEN_COLORS.plain}}>{tok.v}</span>
      ))}
    </div>
  )
}

export default function Process() {
  return (
    <section className="section" id="setup">
      <div className="container-xl">

        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">The Workshop</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">My Setup &amp; Workflow</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-sm mx-auto">
            Tools and habits that keep my work clean, structured and consistently improving.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="mws-grid">

          {/* LEFT: tools + principles */}
          <div className="mws-left">
            <motion.div className="mws-tool-grid"
              initial={{ opacity:0, x:-18 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:.25 }} transition={{ duration:.55, ease:[.16,1,.3,1] }}>
              {TOOLSET.map((tool) => (
                <div key={tool.label} className="mws-tool" style={{'--tc': tool.color}}>
                  <div className="mws-tool-icon">
                    <FontAwesomeIcon icon={tool.icon} />
                  </div>
                  <div className="mws-tool-body">
                    <span className="mws-tool-name">{tool.label}</span>
                    <span className="mws-tool-sub">{tool.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className="mws-principles"
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:.35 }} transition={{ duration:.5, delay:.18 }}>
              <p className="mws-prin-title">
                <FontAwesomeIcon icon={faBolt} className="text-[var(--accent-primary)] mr-1.5 text-xs" />
                Core principles
              </p>
              {PRINCIPLES.map((p) => (
                <div key={p} className="mws-prin-item">
                  <FontAwesomeIcon icon={faCheck} className="mws-prin-check" />
                  <span>{p}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: editor mockup card */}
          <motion.div className="mws-right"
            initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:.25 }} transition={{ duration:.6, ease:[.16,1,.3,1], delay:.1 }}>
            <div className="mws-editor">
              {/* Window chrome */}
              <div className="mws-editor-chrome">
                <span className="mws-dot mws-dot-r" />
                <span className="mws-dot mws-dot-y" />
                <span className="mws-dot mws-dot-g" />
                <span className="mws-editor-tab">
                  <FontAwesomeIcon icon={faFolderTree} className="text-[10px] mr-1 opacity-60" />
                  App.jsx
                </span>
                <span className="mws-editor-tab mws-editor-tab-dim">Hero.jsx</span>
                <span className="mws-editor-tab mws-editor-tab-dim">styles.css</span>
              </div>

              {/* Code area */}
              <div className="mws-editor-body">
                <div className="mws-line-nums" aria-hidden="true">
                  {CODE_LINES.map((_, i) => <span key={i}>{i+1}</span>)}
                </div>
                <div className="mws-code-content">
                  {CODE_LINES.map((line, i) => (
                    <CodeLine key={i} {...line} />
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div className="mws-status-bar">
                <span className="mws-status-item mws-status-branch">
                  <FontAwesomeIcon icon={faGithub} className="mr-1" /> main
                </span>
                <span className="mws-status-item">JSX</span>
                <span className="mws-status-item">UTF-8</span>
                <span className="mws-status-item mws-status-live">
                  <span className="mws-live-dot" /> Live
                </span>
              </div>
            </div>

            {/* Stats row below editor */}
            <div className="mws-editor-stats">
              {[
                { icon: faRocket,  label: 'Hosting',      value: 'Firebase / GitHub Pages' },
                { icon: faGithub,  label: 'Version ctrl', value: 'Git + GitHub'            },
              ].map(s => (
                <div key={s.label} className="mws-estat">
                  <FontAwesomeIcon icon={s.icon} className="text-[var(--accent-primary)] text-xs" />
                  <div>
                    <p className="mws-estat-val">{s.value}</p>
                    <p className="mws-estat-lbl">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Learning note */}
            <div className="mws-learn-note">
              <span className="mws-learn-badge"> Currently learning</span>
              <span className="mws-learn-items">TypeScript · Next.js · Node.js · React</span>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        /* ── GRID ─────────────────────────────────────────── */
        .mws-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width:860px) {
          .mws-grid { grid-template-columns:1fr; }
        }

        /* ── TOOL GRID ────────────────────────────────────── */
        .mws-tool-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .5rem;
          margin-bottom: 1.25rem;
        }
        .mws-tool {
          display: flex; align-items: center; gap: .7rem;
          padding: .55rem .75rem;
          border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 2.5px solid var(--tc);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s;
          cursor: default;
        }
        .mws-tool:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
          border-color: var(--tc);
        }
        .mws-tool-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--tc) 14%, transparent);
          color: var(--tc); font-size: 12px;
        }
        [data-theme=light] .mws-tool {
          background: #fff;
          border-color: var(--border-color);
          border-left-color: var(--tc);
        }
        [data-theme=light] .mws-tool:hover {
          background: #fff;
          border-left-color: var(--tc);
          box-shadow: 0 3px 12px rgba(0,0,0,.08);
        }
        .mws-tool-body { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .mws-tool-name { font-size:.8rem; font-weight:600; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .mws-tool-sub  { font-size:.68rem; color:var(--text-tertiary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        /* ── PRINCIPLES ───────────────────────────────────── */
        .mws-principles {
          padding: .85rem 1rem;
          border-radius: 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }
        [data-theme=light] .mws-principles {
          background: #fff;
          border-color: var(--border-color);
        }
        .mws-prin-title {
          font-size:.78rem; font-weight:700; text-transform:uppercase;
          letter-spacing:.06em; color:var(--text-secondary);
          margin-bottom:.6rem;
        }
        .mws-prin-item {
          display:flex; align-items:flex-start; gap:.55rem;
          font-size:.82rem; color:var(--text-secondary); line-height:1.55;
          padding:.22rem 0;
        }
        .mws-prin-check {
          color:var(--accent-primary); font-size:.7rem;
          margin-top:.22rem; flex-shrink:0;
        }

        /* ── EDITOR MOCKUP ────────────────────────────────── */
        .mws-editor {
          border-radius: 14px;
          background: #0d1117;
          border: 1px solid rgba(148,163,184,.14);
          box-shadow: 0 8px 32px rgba(0,0,0,.28), 0 2px 8px rgba(0,0,0,.18);
          overflow: hidden;
          font-family: var(--font-mono), 'Fira Code', monospace;
        }
        [data-theme="light"] .mws-editor {
          background: #1e1e2e;
          border-color: rgba(30,30,46,.25);
          box-shadow: 0 8px 32px rgba(30,30,46,.14), 0 2px 8px rgba(30,30,46,.1);
        }

        .mws-editor-chrome {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px 8px;
          background: #161b22;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        [data-theme="light"] .mws-editor-chrome { background:#282837; }

        .mws-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .mws-dot-r { background:#ff5f57; }
        .mws-dot-y { background:#ffbd2e; }
        .mws-dot-g { background:#28c840; }

        .mws-editor-tab {
          font-size:.69rem; padding:3px 10px; border-radius:5px;
          color:rgba(226,232,240,.7); margin-left:4px;
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.06);
          white-space:nowrap;
        }
        .mws-editor-tab-dim { color:rgba(148,163,184,.45); background:transparent; border-color:transparent; }

        .mws-editor-body {
          display:flex; padding:14px 0 14px 14px; overflow-x:auto;
          scrollbar-width:none;
        }
        .mws-editor-body::-webkit-scrollbar { display:none; }

        .mws-line-nums {
          display:flex; flex-direction:column; gap:0;
          padding-right:14px; text-align:right; flex-shrink:0;
          font-size:.7rem; line-height:1.72; color:rgba(148,163,184,.3);
          user-select:none;
        }
        .mws-line-nums span { display:block; }

        .mws-code-content { flex:1; min-width:0; }
        .mws-code-line {
          display:block; font-size:.7rem; line-height:1.72;
          white-space:nowrap;
        }

        .mws-status-bar {
          display:flex; align-items:center; gap:0;
          background:#161b22; border-top:1px solid rgba(255,255,255,.05);
          padding:4px 14px;
        }
        [data-theme="light"] .mws-status-bar { background:#282837; }
        .mws-status-item {
          font-size:.62rem; color:rgba(148,163,184,.55);
          padding:0 8px; border-right:1px solid rgba(255,255,255,.06);
          white-space:nowrap; line-height:1.6;
        }
        .mws-status-item:last-child { border-right:none; margin-left:auto; }
        .mws-status-live { color:#4ade80; display:flex; align-items:center; gap:4px; }
        .mws-live-dot {
          width:6px; height:6px; border-radius:50%; background:#4ade80;
          box-shadow:0 0 5px #4ade8088;
          animation:mws-blink 1.8s ease-in-out infinite;
        }
        @keyframes mws-blink{0%,100%{opacity:1}50%{opacity:.35}}

        /* ── EDITOR STATS ROW ─────────────────────────────── */
        .mws-editor-stats {
          display:grid; grid-template-columns:1fr 1fr; gap:.6rem;
          margin-top:.8rem;
        }
        .mws-estat {
          display:flex; align-items:center; gap:.65rem;
          padding:.55rem .75rem;
          border-radius:10px; background:var(--bg-surface);
          border:1px solid var(--border-color);
        }
        [data-theme=light] .mws-estat { background:#fff; }
        .mws-estat-val { font-size:.77rem; font-weight:600; color:var(--text-primary); line-height:1; }
        .mws-estat-lbl { font-size:.65rem; color:var(--text-tertiary); margin-top:2px; }

        /* ── LEARNING NOTE ────────────────────────────────── */
        .mws-learn-note {
          margin-top: .75rem;
          padding: .6rem .9rem;
          border-radius: 10px;
          background: rgba(59,130,246,.06);
          border: 1px solid rgba(59,130,246,.14);
          display: flex;
          align-items: center;
          gap: .6rem;
          flex-wrap: wrap;
        }
        [data-theme=light] .mws-learn-note {
          background: rgba(37,99,235,.05);
          border-color: rgba(37,99,235,.12);
        }
        .mws-learn-badge {
          font-size: .72rem; font-weight: 700;
          color: var(--accent-primary);
          white-space: nowrap;
        }
        .mws-learn-items {
          font-size: .72rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
      `}</style>
    </section>
  )
}
