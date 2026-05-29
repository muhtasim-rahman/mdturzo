// Process.jsx — v2.2.9
// CHANGES:
//   * Populated with real data from about.md
//   * Redesigned: two-column "Setup" + "Workflow" layout
//   * Full light-mode support
//   * Responsive & aligned with universal section margins
//   * Removed placeholder / mock data

import { motion } from 'framer-motion'

const SETUP = [
  {
    icon: '💻',
    title: 'VS Code',
    desc: 'Primary code editor — clean, fast, extensible. Used for every project from HTML snippets to full React apps.',
    tags: ['Editor'],
    color: '#007ACC',
  },
  {
    icon: '🐙',
    title: 'Git & GitHub',
    desc: 'Version control and code hosting for all projects. Every commit tracked, every change documented.',
    tags: ['Version Control', 'Hosting'],
    color: '#3B82F6',
  },
  {
    icon: '🔥',
    title: 'Firebase',
    desc: 'Backend-as-a-service for advanced projects. Auth, Firestore, Hosting — this portfolio runs on Firebase.',
    tags: ['Backend', 'Hosting', 'Database'],
    color: '#f97316',
  },
  {
    icon: '🤖',
    title: 'AI Tools',
    desc: 'Leveraged heavily for coding, planning, design decisions, and documentation. Working with AI efficiently is a skill of its own.',
    tags: ['Productivity', 'Coding'],
    color: '#8B5CF6',
  },
  {
    icon: '🛠️',
    title: 'Browser DevTools',
    desc: 'For debugging layouts, inspecting network requests, profiling performance, and live CSS tweaking.',
    tags: ['Debugging', 'Testing'],
    color: '#10B981',
  },
  {
    icon: '📊',
    title: 'Google Sheets API',
    desc: 'Used as a lightweight backend/database in earlier projects — a creative workaround that taught a lot about APIs.',
    tags: ['API', 'Database'],
    color: '#34D399',
  },
]

const WORKFLOW = [
  {
    step: '01',
    title: 'Learn',
    desc: 'Self-taught via YouTube tutorials, docs, and hands-on experimentation. No formal classroom — just curiosity and consistency.',
    icon: '📚',
    color: '#3B82F6',
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'Sketch the idea, define goals, break the project into small tasks. Clean planning saves messy debugging later.',
    icon: '📋',
    color: '#8B5CF6',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Write clean, commented, readable code. Every feature tested immediately. Prefer smaller commits over big messy pushes.',
    icon: '⚡',
    color: '#F59E0B',
  },
  {
    step: '04',
    title: 'Refine',
    desc: 'Polish UI, fix edge cases, optimise performance. Perfection matters — spending extra time here separates good from great.',
    icon: '✨',
    color: '#10B981',
  },
]

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
})

export default function Process() {
  return (
    <section className="section" id="setup">
      <div className="container-xl">

        {/* Section header */}
        <motion.div className="text-center mb-12" {...fadeUp()}>
          <p className="proc-eyebrow">Behind the scenes</p>
          <h2 className="proc-title">My Setup &amp; Workflow</h2>
          <p className="proc-subtitle">
            The tools I rely on every day and how I turn ideas into shipped products.
          </p>
        </motion.div>

        {/* Two-column layout: Setup (left) / Workflow (right) */}
        <div className="proc-grid">

          {/* ── Setup column ── */}
          <div className="proc-col">
            <motion.p className="proc-col-label" {...fadeUp(0)}>
              <span className="proc-col-label-dot" style={{ background: '#3B82F6' }} />
              Daily Toolkit
            </motion.p>
            <div className="proc-setup-list">
              {SETUP.map((item, i) => (
                <motion.div key={item.title} className="proc-setup-item" style={{ '--c': item.color }} {...fadeUp(i * 0.5)}>
                  <div className="proc-setup-icon">{item.icon}</div>
                  <div className="proc-setup-body">
                    <div className="proc-setup-row">
                      <span className="proc-setup-name">{item.title}</span>
                      <div className="proc-setup-tags">
                        {item.tags.map(t => (
                          <span key={t} className="proc-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="proc-setup-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Workflow column ── */}
          <div className="proc-col">
            <motion.p className="proc-col-label" {...fadeUp(0)}>
              <span className="proc-col-label-dot" style={{ background: '#8B5CF6' }} />
              How I Work
            </motion.p>
            <div className="proc-flow-list">
              {WORKFLOW.map((step, i) => (
                <motion.div key={step.step} className="proc-flow-item" style={{ '--c': step.color }} {...fadeUp(i * 0.6)}>
                  {/* Left: connector line */}
                  <div className="proc-flow-line-col">
                    <div className="proc-flow-dot" />
                    {i < WORKFLOW.length - 1 && <div className="proc-flow-line" />}
                  </div>
                  {/* Right: content */}
                  <div className="proc-flow-body">
                    <div className="proc-flow-header">
                      <span className="proc-flow-step">{step.step}</span>
                      <span className="proc-flow-icon">{step.icon}</span>
                      <span className="proc-flow-title">{step.title}</span>
                    </div>
                    <p className="proc-flow-desc">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini philosophy card */}
            <motion.div className="proc-philosophy" {...fadeUp(4)}>
              <span className="proc-philosophy-icon">🎯</span>
              <div>
                <p className="proc-philosophy-title">My Philosophy</p>
                <p className="proc-philosophy-text">
                  Build things that matter. Write code that speaks for itself. Never stop learning — quality always beats quantity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .proc-eyebrow {
          font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .14em;
          color: var(--accent-primary); margin-bottom: .45rem;
        }
        .proc-title {
          font-size: clamp(1.65rem, 3vw, 2.5rem);
          font-weight: 800; font-family: var(--font-display);
          color: var(--text-primary); line-height: 1.15;
          margin-bottom: .5rem;
        }
        .proc-subtitle {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 480px; margin-inline: auto; line-height: 1.7;
        }

        /* Two-column grid */
        .proc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .proc-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        .proc-col { display: flex; flex-direction: column; gap: 1rem; }

        .proc-col-label {
          display: flex; align-items: center; gap: .5rem;
          font-size: .72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary); margin-bottom: .25rem;
        }
        .proc-col-label-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }

        /* ── Setup list ──────────────────────────────────── */
        .proc-setup-list { display: flex; flex-direction: column; gap: .6rem; }

        .proc-setup-item {
          display: flex; align-items: flex-start; gap: .85rem;
          padding: .85rem 1rem;
          border-radius: 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          transition: border-color .18s, transform .18s;
        }
        .proc-setup-item:hover {
          border-color: color-mix(in srgb, var(--c) 45%, transparent);
          transform: translateX(3px);
        }

        .proc-setup-icon {
          font-size: 1.35rem; flex-shrink: 0;
          width: 38px; height: 38px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--c) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
          display: flex; align-items: center; justify-content: center;
          line-height: 1;
        }

        .proc-setup-body { flex: 1; min-width: 0; }

        .proc-setup-row {
          display: flex; align-items: center; flex-wrap: wrap; gap: .4rem;
          margin-bottom: .3rem;
        }
        .proc-setup-name {
          font-size: .88rem; font-weight: 700;
          color: var(--text-primary); font-family: var(--font-display);
        }
        .proc-setup-tags { display: flex; flex-wrap: wrap; gap: .25rem; }
        .proc-tag {
          font-size: .58rem; font-weight: 600;
          padding: .18rem .5rem; border-radius: 999px;
          background: color-mix(in srgb, var(--c) 12%, transparent);
          color: color-mix(in srgb, var(--c) 90%, var(--text-primary));
          border: 1px solid color-mix(in srgb, var(--c) 25%, transparent);
          line-height: 1.4;
        }
        [data-theme="light"] .proc-tag {
          background: color-mix(in srgb, var(--c) 10%, #fff);
          color: color-mix(in srgb, var(--c) 85%, #111);
        }

        .proc-setup-desc {
          font-size: .76rem; color: var(--text-secondary); line-height: 1.65;
        }

        /* ── Workflow list ───────────────────────────────── */
        .proc-flow-list { display: flex; flex-direction: column; gap: 0; }

        .proc-flow-item {
          display: flex; gap: 1rem; align-items: stretch;
        }

        .proc-flow-line-col {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0; width: 20px;
        }
        .proc-flow-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: color-mix(in srgb, var(--c) 85%, transparent);
          border: 2px solid color-mix(in srgb, var(--c) 40%, transparent);
          flex-shrink: 0; margin-top: .9rem;
          box-shadow: 0 0 8px color-mix(in srgb, var(--c) 35%, transparent);
        }
        .proc-flow-line {
          width: 2px; flex: 1;
          background: linear-gradient(to bottom, var(--border-color), transparent);
          margin: 4px 0;
        }

        .proc-flow-body {
          flex: 1; padding: .8rem 0 1.2rem;
        }
        .proc-flow-header {
          display: flex; align-items: center; gap: .5rem; margin-bottom: .35rem;
        }
        .proc-flow-step {
          font-size: .62rem; font-weight: 800;
          font-family: var(--font-mono);
          color: var(--c);
          background: color-mix(in srgb, var(--c) 10%, transparent);
          padding: .15rem .4rem; border-radius: 5px;
          letter-spacing: .04em;
          border: 1px solid color-mix(in srgb, var(--c) 25%, transparent);
        }
        .proc-flow-icon { font-size: 1rem; }
        .proc-flow-title {
          font-size: .95rem; font-weight: 700;
          color: var(--text-primary); font-family: var(--font-display);
        }
        .proc-flow-desc {
          font-size: .78rem; color: var(--text-secondary);
          line-height: 1.65; padding-left: .1rem;
        }

        /* Philosophy card */
        .proc-philosophy {
          display: flex; align-items: flex-start; gap: .85rem;
          padding: 1rem 1.1rem;
          border-radius: 12px;
          background: color-mix(in srgb, var(--accent-primary) 7%, var(--bg-surface));
          border: 1px solid color-mix(in srgb, var(--accent-primary) 25%, transparent);
          margin-top: .5rem;
        }
        [data-theme="light"] .proc-philosophy {
          background: color-mix(in srgb, var(--accent-primary) 5%, #fff);
          border-color: color-mix(in srgb, var(--accent-primary) 20%, transparent);
        }
        .proc-philosophy-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: .1rem; }
        .proc-philosophy-title {
          font-size: .82rem; font-weight: 700;
          color: var(--text-primary); margin-bottom: .3rem;
        }
        .proc-philosophy-text {
          font-size: .76rem; color: var(--text-secondary); line-height: 1.65;
        }
      `}</style>
    </section>
  )
}
