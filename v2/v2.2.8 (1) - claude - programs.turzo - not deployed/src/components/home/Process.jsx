// Process.jsx -- v2.2.8
// REPLACED "How I Work" with a beautiful screenshot/mockup showcase section
// Shows off the portfolio itself + dev environment -- well-designed, responsive, minimal color

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle, faArrowUpRightFromSquare,
  faCode2, faBolt, faShield, faClock, faHandshake,
} from '@fortawesome/free-solid-svg-icons'
import { faCode, faBolt as faBoltS, faShield as faShieldS } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import SITE_CONFIG from '../../config/site.config.js'

const HIGHLIGHTS = [
  {
    color: '#3B82F6',
    label: 'Performance First',
    desc: 'Optimised assets, lazy-loading and lighthouse scores in mind from day one.',
  },
  {
    color: '#10B981',
    label: 'Clean Codebase',
    desc: 'Readable, maintainable React with clear component boundaries and zero dead code.',
  },
  {
    color: '#A855F7',
    label: 'Pixel-Perfect UI',
    desc: 'Every detail -- spacing, typography, colour -- crafted with deliberate intent.',
  },
  {
    color: '#F59E0B',
    label: 'Dark + Light Mode',
    desc: 'Seamless theme switching with CSS custom properties throughout.',
  },
]

// Fake browser chrome mockup that shows the hero section
function BrowserMockup() {
  return (
    <div className="ss-browser">
      {/* Title bar */}
      <div className="ss-titlebar">
        <div className="ss-dots">
          <span style={{ background: '#FF5F57' }} />
          <span style={{ background: '#FFBD2E' }} />
          <span style={{ background: '#28CA41' }} />
        </div>
        <div className="ss-urlbar">
          <span className="ss-urlbar-icon">🔒</span>
          <span className="ss-urlbar-text">mdturzo.web.app</span>
        </div>
        <div className="ss-dots ss-dots--r">
          <span /><span /><span />
        </div>
      </div>

      {/* Viewport content -- stylised mini-portfolio preview */}
      <div className="ss-viewport">
        {/* Mini navbar */}
        <div className="ss-mini-nav">
          <div className="ss-mini-logo">
            <div className="ss-mini-logo-dot" />
            <span>Muhtasim</span>
          </div>
          <div className="ss-mini-links">
            {['Home','About','Projects','Contact'].map(l => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        {/* Mini hero */}
        <div className="ss-mini-hero">
          <div className="ss-mini-left">
            <div className="ss-mini-tag">Assalamu Alaikum 👋 I am --</div>
            <div className="ss-mini-name">
              <span>Muhtasim</span>
              <span className="ss-mini-name-acc">Rahman</span>
            </div>
            <div className="ss-mini-role">
              <span className="ss-mini-cursor-text">Web Developer</span>
              <span className="ss-mini-blink">|</span>
            </div>
            <div className="ss-mini-btns">
              <div className="ss-mini-btn ss-mini-btn--p">View Projects</div>
              <div className="ss-mini-btn ss-mini-btn--o">Download CV</div>
            </div>
            <div className="ss-mini-stats">
              <span>3+ <small>Yrs Dev</small></span>
              <span>6+ <small>Design</small></span>
              <span>16+ <small>Projects</small></span>
            </div>
          </div>
          <div className="ss-mini-right">
            <div className="ss-mini-avatar-wrap">
              <div className="ss-mini-avatar-glow" />
              <img src="/hero.webp" alt="" className="ss-mini-avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Code editor mockup panel
function EditorMockup() {
  const lines = [
    { num: 1,  indent: 0, content: <><span className="ss-kw">export default function</span> <span className="ss-fn">Hero</span><span className="ss-pun">() {'{'}</span></> },
    { num: 2,  indent: 1, content: <><span className="ss-kw">const</span> <span className="ss-var">typed</span> <span className="ss-pun">= </span><span className="ss-fn">useTyping</span><span className="ss-pun">()</span></> },
    { num: 3,  indent: 1, content: <><span className="ss-kw">const</span> <span className="ss-var">inView</span> <span className="ss-pun">= </span><span className="ss-fn">useInView</span><span className="ss-pun">(ref)</span></> },
    { num: 4,  indent: 0, content: <></> },
    { num: 5,  indent: 1, content: <><span className="ss-kw">return</span> <span className="ss-pun">{'('}</span></> },
    { num: 6,  indent: 2, content: <><span className="ss-tag">{'<section'}</span> <span className="ss-attr">className</span><span className="ss-pun">="</span><span className="ss-str">hero</span><span className="ss-pun">"</span><span className="ss-tag">{'>'}</span></> },
    { num: 7,  indent: 3, content: <><span className="ss-tag">{'<div'}</span> <span className="ss-attr">className</span><span className="ss-pun">="</span><span className="ss-str">hero-inner</span><span className="ss-pun">"</span><span className="ss-tag">{'>'}</span></> },
    { num: 8,  indent: 4, content: <><span className="ss-comment">{'// content goes here'}</span></> },
    { num: 9,  indent: 3, content: <><span className="ss-tag">{'</div>'}</span></> },
    { num: 10, indent: 2, content: <><span className="ss-tag">{'</section>'}</span></> },
    { num: 11, indent: 1, content: <><span className="ss-pun">{')'}</span></> },
    { num: 12, indent: 0, content: <><span className="ss-pun">{'}'}</span></> },
  ]
  return (
    <div className="ss-editor">
      <div className="ss-editor-titlebar">
        <div className="ss-dots ss-dots--sm">
          <span style={{ background: '#FF5F57' }} />
          <span style={{ background: '#FFBD2E' }} />
          <span style={{ background: '#28CA41' }} />
        </div>
        <span className="ss-editor-filename">Hero.jsx</span>
        <div className="ss-editor-lang">JSX</div>
      </div>
      <div className="ss-editor-body">
        <div className="ss-editor-gutter">
          {lines.map(l => <span key={l.num}>{l.num}</span>)}
        </div>
        <div className="ss-editor-code">
          {lines.map(l => (
            <div key={l.num} className="ss-editor-line">
              <span style={{ display:'inline-block', width: l.indent * 14 }} />
              {l.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-12"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Built with care</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">What I Deliver</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Every project is crafted with the same attention to detail you see in this portfolio.
          </p>
        </motion.div>

        {/* Main showcase grid */}
        <div className="ss-grid">
          {/* Browser mockup -- spans 2 cols on desktop */}
          <motion.div className="ss-main-card"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:.1 }} transition={{ duration:.55, ease:[.16,1,.3,1] }}>
            <BrowserMockup />
            <div className="ss-main-caption">
              <span className="ss-badge">Live Preview</span>
              <a href={SITE_CONFIG.siteURL} target="_blank" rel="noopener noreferrer"
                className="ss-ext-link">
                {SITE_CONFIG.siteURL}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
              </a>
            </div>
          </motion.div>

          {/* Editor mockup */}
          <motion.div className="ss-side-card"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:.1 }} transition={{ duration:.55, delay:.1, ease:[.16,1,.3,1] }}>
            <EditorMockup />
            <div className="ss-main-caption">
              <span className="ss-badge ss-badge--code">Source Code</span>
              <span className="ss-ext-link" style={{ cursor:'default' }}>React + Tailwind + Firebase</span>
            </div>
          </motion.div>
        </div>

        {/* Highlight chips row */}
        <motion.div className="ss-highlights"
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.2 }} transition={{ duration:.5, delay:.15 }}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="ss-highlight" style={{ '--hc': h.color }}>
              <span className="ss-hl-dot" />
              <div>
                <p className="ss-hl-label">{h.label}</p>
                <p className="ss-hl-desc">{h.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="flex justify-center mt-10"
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:.5, delay:.2 }}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-all active:scale-[.97] group shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
            See my work
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        /* ---- Showcase grid --------------------------------- */
        .ss-grid {
          display: grid;
          grid-template-columns: 1.45fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .ss-grid { grid-template-columns: 1fr; }
        }

        .ss-main-card,
        .ss-side-card {
          display: flex;
          flex-direction: column;
          gap: .6rem;
        }

        .ss-main-caption {
          display: flex;
          align-items: center;
          gap: .7rem;
          padding: 0 .2rem;
        }
        .ss-badge {
          display: inline-flex; align-items: center;
          height: 22px; padding: 0 9px;
          border-radius: 999px;
          font-size: 11px; font-weight: 600;
          background: var(--accent-light);
          color: var(--accent-primary);
          border: 1px solid rgba(59,130,246,.25);
          white-space: nowrap;
        }
        .ss-badge--code {
          background: rgba(168,85,247,.12);
          color: #A855F7;
          border-color: rgba(168,85,247,.22);
        }
        .ss-ext-link {
          font-size: .75rem;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          display: inline-flex; align-items: center; gap: 4px;
          text-decoration: none;
          transition: color .15s;
        }
        .ss-ext-link:hover { color: var(--accent-primary); }

        /* ---- Highlights row -------------------------------- */
        .ss-highlights {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .75rem;
          padding: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px;
        }
        @media (max-width: 860px) {
          .ss-highlights { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .ss-highlights { grid-template-columns: 1fr; }
        }
        .ss-highlight {
          display: flex;
          align-items: flex-start;
          gap: .6rem;
        }
        .ss-hl-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--hc);
          flex-shrink: 0;
          margin-top: 5px;
          box-shadow: 0 0 6px color-mix(in srgb, var(--hc) 50%, transparent);
        }
        .ss-hl-label {
          font-size: .82rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .ss-hl-desc {
          font-size: .74rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* ---- Browser mockup -------------------------------- */
        .ss-browser {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          box-shadow: 0 8px 32px rgba(0,0,0,.18);
          flex: 1;
        }
        .ss-titlebar {
          display: flex; align-items: center; gap: .7rem;
          padding: .5rem .75rem;
          background: var(--bg-surface-2);
          border-bottom: 1px solid var(--border-color);
        }
        .ss-dots {
          display: flex; gap: 5px; flex-shrink: 0;
        }
        .ss-dots span {
          width: 10px; height: 10px; border-radius: 50%; display: block;
        }
        .ss-dots--r span { background: var(--border-color) !important; }
        .ss-dots--sm span { width: 8px; height: 8px; }
        .ss-urlbar {
          flex: 1;
          display: flex; align-items: center; gap: .4rem;
          background: var(--bg-page);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: .22rem .65rem;
          font-size: .72rem;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden;
        }
        .ss-urlbar-icon { font-size: .6rem; color: #22c55e; }
        .ss-urlbar-text { overflow: hidden; text-overflow: ellipsis; }

        /* Viewport */
        .ss-viewport {
          padding: .7rem;
          background: var(--bg-page);
          overflow: hidden;
        }

        /* Mini navbar */
        .ss-mini-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: .35rem .5rem;
          background: var(--bg-surface);
          border-radius: 8px;
          margin-bottom: .7rem;
          border: 1px solid var(--border-color);
        }
        .ss-mini-logo {
          display: flex; align-items: center; gap: .35rem;
          font-size: .7rem; font-weight: 700; color: var(--text-primary);
          font-family: var(--font-mono);
        }
        .ss-mini-logo-dot {
          width: 10px; height: 10px; border-radius: 3px;
          background: var(--accent-primary);
        }
        .ss-mini-links {
          display: flex; gap: .55rem;
          font-size: .6rem; color: var(--text-tertiary);
        }
        @media (max-width: 520px) {
          .ss-mini-links { display: none; }
        }

        /* Mini hero */
        .ss-mini-hero {
          display: flex; align-items: center;
          gap: .6rem; padding: .5rem .3rem .3rem;
        }
        .ss-mini-left { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: .3rem; }
        .ss-mini-tag {
          font-size: .6rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .ss-mini-name {
          display: flex; flex-direction: column;
          font-size: .95rem; font-weight: 800;
          font-family: var(--font-display);
          line-height: 1.1;
          color: var(--text-primary);
        }
        .ss-mini-name-acc { color: var(--accent-primary); }
        .ss-mini-role {
          font-size: .62rem; color: var(--text-secondary); font-weight: 600;
          display: flex; align-items: center; gap: 2px;
        }
        .ss-mini-blink {
          color: var(--accent-primary);
          animation: mini-blink .7s step-end infinite;
        }
        @keyframes mini-blink { 0%,100%{opacity:1}50%{opacity:0} }
        .ss-mini-btns { display: flex; gap: .3rem; margin-top: .1rem; }
        .ss-mini-btn {
          font-size: .55rem; font-weight: 600;
          padding: .2rem .5rem; border-radius: 5px;
          white-space: nowrap;
        }
        .ss-mini-btn--p { background: var(--accent-primary); color: #fff; }
        .ss-mini-btn--o {
          border: 1px solid var(--accent-primary); color: var(--accent-primary);
          background: transparent;
        }
        .ss-mini-stats {
          display: flex; gap: .6rem; margin-top: .1rem;
          font-size: .58rem; font-weight: 700; color: var(--text-primary);
        }
        .ss-mini-stats small { font-weight: 400; color: var(--text-tertiary); }

        .ss-mini-right { flex-shrink: 0; width: clamp(52px, 14%, 80px); }
        .ss-mini-avatar-wrap {
          position: relative;
          width: 100%; aspect-ratio: 3/4;
          border-radius: 10px; overflow: hidden;
        }
        .ss-mini-avatar-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(37,99,235,.25), transparent 70%);
          z-index: 0;
        }
        .ss-mini-avatar {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          display: block; position: relative; z-index: 1;
        }

        /* ---- Editor mockup --------------------------------- */
        .ss-editor {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: #0d1117;
          box-shadow: 0 8px 32px rgba(0,0,0,.2);
          flex: 1;
          display: flex; flex-direction: column;
        }
        [data-theme=light] .ss-editor { background: #1e1e2e; }

        .ss-editor-titlebar {
          display: flex; align-items: center; gap: .6rem;
          padding: .4rem .65rem;
          background: rgba(255,255,255,.03);
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .ss-editor-filename {
          flex: 1; font-size: .72rem;
          font-family: var(--font-mono);
          color: rgba(248,248,242,.65);
        }
        .ss-editor-lang {
          font-size: .62rem; font-family: var(--font-mono);
          color: rgba(248,248,242,.35);
          background: rgba(255,255,255,.06);
          padding: 1px 6px; border-radius: 4px;
        }

        .ss-editor-body {
          display: flex; flex: 1;
          font-family: var(--font-mono);
          font-size: .7rem; line-height: 1.7;
          overflow: hidden;
          padding: .5rem 0;
        }
        .ss-editor-gutter {
          display: flex; flex-direction: column;
          padding: 0 .6rem 0 .5rem;
          color: rgba(255,255,255,.2);
          text-align: right;
          border-right: 1px solid rgba(255,255,255,.06);
          user-select: none;
          min-width: 32px;
          flex-shrink: 0;
        }
        .ss-editor-code {
          flex: 1; padding: 0 .8rem;
          overflow: hidden;
        }
        .ss-editor-line {
          white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ss-kw      { color: #ff79c6; }
        .ss-fn      { color: #50fa7b; }
        .ss-var     { color: #f8f8f2; }
        .ss-pun     { color: rgba(248,248,242,.55); }
        .ss-tag     { color: #ff79c6; }
        .ss-attr    { color: #8be9fd; }
        .ss-str     { color: #f1fa8c; }
        .ss-comment { color: rgba(98,114,164,.8); font-style: italic; }
      `}</style>
    </section>
  )
}
