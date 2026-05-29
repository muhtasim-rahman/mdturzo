// ============================================================
// components/about/AboutHero.jsx — v2.3.2
// About page hero section — fixed navbar padding (no double gap)
// ============================================================

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCalendar, faRocket,
  faHandshake, faDownload, faGlobe, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

export default function AboutHero({ settings, age }) {
  return (
    <section className="abh-section" id="about-hero" aria-label="About Hero">
      {/* Background */}
      <div className="abh-tex"     aria-hidden="true" />
      <div className="abh-orb abh-orb-1" aria-hidden="true" />
      <div className="abh-orb abh-orb-2" aria-hidden="true" />
      <div className="abh-grad"    aria-hidden="true" />

      {/* Content grid — padded exactly once for navbar */}
      <div className="abh-inner">

        {/* LEFT */}
        <motion.div className="abh-left" initial="hidden" animate="show" variants={stagger(.1)}>

          <motion.nav variants={fadeUp} className="abh-bc">
            <Link to="/" className="abh-bc-link">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} className="abh-bc-sep" />
            <span className="abh-bc-cur">About</span>
          </motion.nav>

          <motion.p variants={fadeUp} className="abh-eyebrow">— Getting to know me</motion.p>

          <motion.h1 variants={fadeUp} className="abh-h1">
            Muhtasim<br />Rahman
            <span className="abh-nick">(Turzo)</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="abh-role">Web Developer &amp; Designer</motion.p>

          <motion.p variants={fadeUp} className="abh-bio">
            A {age}-year-old self-taught developer from Bangladesh, passionate about building
            clean, fast, and meaningful digital experiences — always guided by
            Islamic &amp; ethical principles.
          </motion.p>

          <motion.div variants={fadeUp} className="abh-facts">
            {[
              { icon: faLocationDot,   text: 'Nilphamari, BD',     c: '#10B981' },
              { icon: faGraduationCap, text: 'SSC-26 · SGSC',      c: '#3B82F6' },
              { icon: faCalendar,      text: `Age ${age} · Muslim`, c: '#F59E0B' },
              { icon: faRocket,        text: 'Goal: CSE Engineer',  c: '#8B5CF6' },
            ].map(({ icon, text, c }) => (
              <span key={text} className="abh-pill">
                <FontAwesomeIcon icon={icon} style={{ color: c }} />
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="abh-cta-row">
            <Link to="/contact" className="abh-btn-primary">
              <FontAwesomeIcon icon={faHandshake} />
              Get in Touch
            </Link>
            {settings?.cvEnabled && settings?.cvUrl ? (
              <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer" className="abh-btn-secondary">
                <FontAwesomeIcon icon={faDownload} />
                Download CV
              </a>
            ) : (
              <Link to="/projects" className="abh-btn-secondary">
                <FontAwesomeIcon icon={faGlobe} />
                View Projects
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT — photo */}
        <motion.div className="abh-right"
          initial={{ opacity: 0, x: 24, scale: .96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: .75, ease: [.16, 1, .3, 1], delay: .15 }}>
          <div className="abh-img-box">
            <div className="abh-img-glow" />
            <div className="abh-img-frame">
              <img src="/hero-back.webp" alt="Muhtasim Rahman" className="abh-img"
                loading="eager" fetchPriority="high" />
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        /* ── SECTION ─────────────────────────────────────── */
        .abh-section {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-page);
        }

        /* ── BACKGROUND ──────────────────────────────────── */
        .abh-tex {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(59,130,246,.05) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%);
        }
        [data-theme=light] .abh-tex {
          background-image:
            radial-gradient(rgba(37,99,235,.06) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.04) 1px, transparent 1px);
        }
        .abh-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .abh-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,.14) 0%, transparent 70%);
          top: -100px; left: -120px;
        }
        .abh-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(99,102,241,.09) 0%, transparent 70%);
          bottom: 0; right: 5%;
        }
        [data-theme=light] .abh-orb-1 {
          background: radial-gradient(circle, rgba(37,99,235,.05) 0%, transparent 70%);
        }
        .abh-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          pointer-events: none; z-index: 2;
          background: linear-gradient(to top, var(--bg-page) 0%, rgba(2,6,23,.4) 30%, transparent 100%);
        }
        [data-theme=light] .abh-grad {
          background: linear-gradient(to top, var(--bg-page) 0%, rgba(240,244,248,.5) 30%, transparent 100%);
        }

        /* ── INNER GRID — single navbar clearance ─────── */
        .abh-inner {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          width: 100%; max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          /* Correct single padding — only clear the navbar */
          padding-top: calc(var(--navbar-h) + 2rem);
          padding-bottom: 3rem;
        }

        /* ── LEFT ────────────────────────────────────────── */
        .abh-left {
          display: flex; flex-direction: column; gap: 1rem;
          position: relative; z-index: 6;
        }
        .abh-bc {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .abh-bc-link { color: var(--text-tertiary); text-decoration: none; transition: color .15s; }
        .abh-bc-link:hover { color: var(--accent-primary); }
        .abh-bc-sep { font-size: .5rem; opacity: .5; }
        .abh-bc-cur { color: var(--text-secondary); }
        .abh-eyebrow {
          font-size: .78rem; font-weight: 500;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .04em;
        }
        .abh-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.05; letter-spacing: -.03em;
          color: var(--text-primary);
        }
        .abh-nick {
          display: block; font-size: .32em; font-weight: 600;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .05em; margin-top: .3em;
        }
        .abh-role {
          font-size: clamp(.85rem, 1.3vw, 1rem);
          color: var(--text-secondary); font-weight: 500;
        }
        .abh-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.75;
          max-width: 460px;
        }
        .abh-facts { display: flex; flex-wrap: wrap; gap: .5rem; }
        .abh-pill {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .3rem .75rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .75rem; color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .abh-cta-row { display: flex; flex-wrap: wrap; gap: .65rem; }
        .abh-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease;
          box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .abh-btn-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .abh-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .65rem 1.4rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--border-strong);
          transition: all .2s ease;
        }
        .abh-btn-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* ── RIGHT — photo ───────────────────────────────── */
        .abh-right {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: flex-end;
        }
        .abh-img-box {
          position: relative;
          width: clamp(260px, 36vw, 460px);
          height: clamp(340px, 46vw, 600px);
          flex-shrink: 0;
        }
        .abh-img-glow {
          position: absolute; inset: 8% 10%; z-index: 0;
          border-radius: 24px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.2) 0%, transparent 70%);
          filter: blur(28px); pointer-events: none;
        }
        [data-theme=light] .abh-img-glow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        .abh-img-frame {
          position: relative; z-index: 1;
          width: 100%; height: 100%; overflow: hidden;
        }
        .abh-img-frame::after {
          content: ''; position: absolute; z-index: 2; pointer-events: none;
          bottom: -5px; left: -1px; right: -1px; height: calc(38% + 5px);
          background: linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 6%, rgba(2,6,23,.7) 32%, transparent 100%);
        }
        [data-theme=light] .abh-img-frame::after {
          background: linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 5%, rgba(240,244,248,.8) 30%, transparent 100%);
        }
        .abh-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        [data-theme=dark] .abh-img { filter: drop-shadow(0 8px 30px rgba(0,0,0,.4)); }

        /* ── RESPONSIVE ──────────────────────────────────── */
        @media (max-width: 860px) {
          .abh-inner {
            grid-template-columns: 1fr;
            padding-top: calc(var(--navbar-h) + 2.5rem);
          }
          .abh-right { justify-content: center; order: -1; }
          .abh-img-box { width: clamp(180px, 55vw, 280px); height: clamp(240px, 72vw, 360px); }
          .abh-left { align-items: center; text-align: center; }
          .abh-facts { justify-content: center; }
          .abh-cta-row { justify-content: center; }
          .abh-bc { display: none; }
        }
      `}</style>
    </section>
  )
}
