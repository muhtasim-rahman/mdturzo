// Process.jsx -- v2.2.9
// My Setup & Workflow -- redesigned with Muhtasim's actual info
// Clean two-panel layout, light-mode aware, proper responsive

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faRocket, faTerminal,
  faGlobe, faDatabase, faBolt, faCheck, faShield,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faJs, faHtml5, faCss3Alt, faFirefoxBrowser,
} from '@fortawesome/free-brands-svg-icons'

const TOOLSET = [
  { icon: faCode,        label: 'VS Code',          sub: 'Primary editor',       color: '#3B82F6' },
  { icon: faGithub,      label: 'Git & GitHub',      sub: 'Version control',      color: '#94A3B8' },
  { icon: faDatabase,    label: 'Firebase',           sub: 'Backend & hosting',    color: '#F59E0B' },
  { icon: faGlobe,       label: 'Google Sheets API',  sub: 'Data & spreadsheets',  color: '#22C55E' },
  { icon: faJs,          label: 'JavaScript',         sub: 'Core language',        color: '#EAB308' },
  { icon: faHtml5,       label: 'HTML & CSS',         sub: 'Structure & style',    color: '#E44D26' },
  { icon: faPalette,     label: 'Photo & Video',      sub: 'Editing & design',     color: '#A855F7' },
  { icon: faFirefoxBrowser, label: 'Browser DevTools', sub: 'Debug & test',        color: '#06B6D4' },
]

const PRINCIPLES = [
  { icon: faCheck,  text: 'Clean, readable code — no clever hacks' },
  { icon: faShield, text: 'Halal & ethical approach to all work'   },
  { icon: faBolt,   text: 'Mobile-first, accessibility-aware design'},
  { icon: faRocket, text: 'Document everything for future reference'},
]

// Fake code lines reflecting Muhtasim's actual coding style
const CODE_LINES = [
  { indent:0, tokens:[{t:'cmt',v:'// Muhtasim Rahman -- mdturzo.web.app'}] },
  { indent:0, tokens:[] },
  { indent:0, tokens:[{t:'keyword',v:'const'},{t:'plain',v:' '},{t:'var',v:'config'},{t:'plain',v:' = {'}] },
  { indent:1, tokens:[{t:'attr',v:'name'},{t:'plain',v:': '},{t:'str',v:"'Muhtasim Rahman (Turzo)'"}] },
  { indent:1, tokens:[{t:'attr',v:'location'},{t:'plain',v:': '},{t:'str',v:"'Nilphamari, Bangladesh'"}] },
  { indent:1, tokens:[{t:'attr',v:'stack'},{t:'plain',v:': ['},{t:'str',v:"'HTML'"},{t:'plain',v:','},{t:'str',v:"'CSS'"},{t:'plain',v:','},{t:'str',v:"'JS'"},{t:'plain',v:']'}] },
  { indent:1, tokens:[{t:'attr',v:'goal'},{t:'plain',v:': '},{t:'str',v:"'CSE Engineer & Dev'"}] },
  { indent:0, tokens:[{t:'plain',v:'}'}] },
  { indent:0, tokens:[] },
  { indent:0, tokens:[{t:'keyword',v:'function'},{t:'plain',v:' '},{t:'fn',v:'buildProject'},{t:'plain',v:'() {'}] },
  { indent:1, tokens:[{t:'keyword',v:'return'},{t:'plain',v:' {'},{t:'attr',v:'clean'},{t:'plain',v:': '},{t:'bool',v:'true'},{t:'plain',v:', '},{t:'attr',v:'halal'},{t:'plain',v:': '},{t:'bool',v:'true'},{t:'plain',v:'}'}] },
  { indent:0, tokens:[{t:'plain',v:'}'}] },
]

const TOKEN_COLORS = {
  keyword: '#C084FC',
  fn:      '#60A5FA',
  str:     '#86EFAC',
  var:     '#FCA5A5',
  bool:    '#F97316',
  attr:    '#FDE68A',
  cmt:     '#64748B',
  plain:   'var(--mws-code-plain)',
}

function CodeLine({ tokens, indent }) {
  if (tokens.length === 0) return <div className="mws-code-line" style={{height:'1em'}} />
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
            Tools and habits that keep projects clean, fast, and well&#8209;delivered.
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
                <div key={tool.label} className="mws-tool-item">
                  <div className="mws-tool-icon" style={{'--c': tool.color}}>
                    <FontAwesomeIcon icon={tool.icon} />
                  </div>
                  <div className="mws-tool-text">
                    <span className="mws-tool-label">{tool.label}</span>
                    <span className="mws-tool-sub">{tool.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className="mws-principles"
              initial={{ opacity:0, x:-18 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:.2 }} transition={{ duration:.55, delay:.12, ease:[.16,1,.3,1] }}>
              <p className="mws-section-label">Core Principles</p>
              {PRINCIPLES.map((p) => (
                <div key={p.text} className="mws-principle-item">
                  <span className="mws-principle-icon">
                    <FontAwesomeIcon icon={p.icon} />
                  </span>
                  <span className="mws-principle-text">{p.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: code editor mockup */}
          <motion.div className="mws-right"
            initial={{ opacity:0, x:18 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:.25 }} transition={{ duration:.55, delay:.08, ease:[.16,1,.3,1] }}>
            <div className="mws-editor">
              {/* Editor header */}
              <div className="mws-editor-top">
                <div className="mws-editor-dots">
                  <span style={{background:'#EF4444'}}/>
                  <span style={{background:'#F59E0B'}}/>
                  <span style={{background:'#22C55E'}}/>
                </div>
                <span className="mws-editor-title">config.js</span>
              </div>
              {/* Line numbers + code */}
              <div className="mws-editor-body">
                <div className="mws-line-nums" aria-hidden="true">
                  {CODE_LINES.map((_,i)=><span key={i}>{i+1}</span>)}
                </div>
                <div className="mws-code">
                  {CODE_LINES.map((line,i) => (
                    <CodeLine key={i} tokens={line.tokens} indent={line.indent} />
                  ))}
                </div>
              </div>
              {/* Status bar */}
              <div className="mws-editor-bar">
                <span className="mws-bar-branch">main</span>
                <span className="mws-bar-lang">JavaScript</span>
                <span className="mws-bar-status">
                  <span className="mws-bar-dot"/> Ready
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ---- My Setup & Workflow ---- */
        :root {
          --mws-code-plain: #94A3B8;
        }
        [data-theme="light"] {
          --mws-code-plain: #475569;
        }

        .mws-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media(max-width:860px){ .mws-grid{ grid-template-columns:1fr; } }

        /* ---- Left ---- */
        .mws-left { display: flex; flex-direction: column; gap: 1.5rem; }

        .mws-tool-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .6rem;
        }
        .mws-tool-item {
          display: flex;
          align-items: center;
          gap: .6rem;
          padding: .6rem .75rem;
          border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          transition: border-color .18s, box-shadow .18s;
        }
        .mws-tool-item:hover {
          border-color: var(--c, var(--accent-primary));
          box-shadow: 0 2px 10px rgba(0,0,0,.08);
        }
        .mws-tool-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--c) 14%, transparent);
          color: var(--c, var(--accent-primary));
          font-size: 13px;
          flex-shrink: 0;
        }
        [data-theme="light"] .mws-tool-icon {
          background: color-mix(in srgb, var(--c) 10%, transparent);
        }
        .mws-tool-text { display: flex; flex-direction: column; min-width: 0; }
        .mws-tool-label { font-size: .76rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mws-tool-sub   { font-size: .65rem; color: var(--text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .mws-section-label {
          font-size: .65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
          margin-bottom: .5rem;
        }

        .mws-principles { display: flex; flex-direction: column; gap: .4rem; }
        .mws-principle-item {
          display: flex; align-items: center; gap: .65rem;
          font-size: .82rem; color: var(--text-secondary);
          padding: .35rem 0;
        }
        .mws-principle-icon {
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 5px;
          background: var(--accent-light);
          color: var(--accent-primary);
          font-size: 9px;
          flex-shrink: 0;
        }
        .mws-principle-text { line-height: 1.4; }

        /* ---- Editor mockup ---- */
        .mws-right { display: flex; justify-content: center; }
        .mws-editor {
          width: 100%;
          max-width: 480px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          box-shadow: var(--shadow-md);
        }
        [data-theme="light"] .mws-editor {
          background: #F8FAFC;
          border-color: #D1D9E0;
        }

        .mws-editor-top {
          display: flex; align-items: center; gap: .6rem;
          padding: .6rem 1rem;
          background: var(--bg-surface-2);
          border-bottom: 1px solid var(--border-color);
        }
        [data-theme="light"] .mws-editor-top {
          background: #EEF2F7;
          border-color: #D1D9E0;
        }
        .mws-editor-dots { display: flex; gap: 5px; }
        .mws-editor-dots span { width: 10px; height: 10px; border-radius: 50%; display: block; }
        .mws-editor-title { font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono); margin-left: .3rem; }

        .mws-editor-body {
          display: flex;
          padding: .85rem 0;
          min-height: 220px;
          overflow-x: auto;
        }
        .mws-line-nums {
          display: flex; flex-direction: column;
          padding: 0 .7rem 0 .85rem;
          font-family: var(--font-mono);
          font-size: .71rem;
          color: var(--text-tertiary);
          user-select: none;
          flex-shrink: 0;
          opacity: .5;
          gap: .05em;
          line-height: 1.8;
        }
        .mws-code {
          flex: 1;
          font-family: var(--font-mono);
          font-size: .72rem;
          line-height: 1.8;
          padding-right: 1rem;
          white-space: pre;
        }
        .mws-code-line { display: block; }

        .mws-editor-bar {
          display: flex; align-items: center; gap: 1rem;
          padding: .3rem .85rem;
          background: var(--accent-primary);
          font-size: .65rem; font-family: var(--font-mono);
          color: rgba(255,255,255,.9);
        }
        .mws-bar-branch { opacity: .85; }
        .mws-bar-lang   { opacity: .75; margin-left: auto; }
        .mws-bar-status { display: flex; align-items: center; gap: 4px; }
        .mws-bar-dot    { width: 6px; height: 6px; border-radius: 50%; background: #22C55E; flex-shrink: 0; }
      `}</style>
    </section>
  )
}
