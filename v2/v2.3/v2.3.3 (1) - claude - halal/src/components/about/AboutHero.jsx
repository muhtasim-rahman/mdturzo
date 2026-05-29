// ============================================================
// AboutHero.jsx — v2.3.3
// Hero section for the About page.
// CHANGES:
//   * Left content fully redesigned — new editorial layout,
//     distinct from home hero (2-col facts grid, avatar chip, etc.)
//   * Hero-wide bottom-to-top gradient now spans full section
//     (not just the image frame), sits below left content,
//     same position on mobile & desktop.
// ============================================================

import { Link }           from 'react-router-dom'
import { motion }         from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCalendar, faRocket,
  faHandshake, faDownload, faGlobe, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { fadeUp, stagger } from './aboutData.js'

export default function AboutHero({ age, settings }) {
  return (
    <section className="ab-hero" id="about-hero" aria-label="About Hero">
      {/* Background texture */}
      <div className="ab-hero-tex" aria-hidden="true" />
      <div className="ab-hero-orb ab-orb-1" aria-hidden="true" />
      <div className="ab-hero-orb ab-orb-2" aria-hidden="true" />

      {/* Full-section gradient — z above image, below left text */}
      <div className="ab-hero-fullgrad" aria-hidden="true" />

      <div className="ab-hero-inner">
        {/* LEFT — redesigned editorial layout */}
        <motion.div className="ab-hero-left"
          initial="hidden" animate="show" variants={stagger(.09)}>

          {/* Breadcrumb */}
          <motion.nav variants={fadeUp} className="ab-bc">
            <Link to="/" className="ab-bc-link">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} className="ab-bc-sep" />
            <span className="ab-bc-cur">About</span>
          </motion.nav>

          {/* Eyebrow + Name block */}
          <motion.div variants={fadeUp} className="ab-hero-name-block">
            <p className="ab-hero-eyebrow">— Getting to know me</p>
            <h1 className="ab-hero-h1">
              Muhtasim<br />Rahman
            </h1>
            <div className="ab-hero-nick-row">
              <span className="ab-hero-nick">Turzo</span>
              <span className="ab-hero-divider" />
              <span className="ab-hero-role">Web Developer &amp; Designer</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="ab-hero-bio">
            A {age}-year-old self-taught developer from Bangladesh, building
            clean, fast &amp; purposeful digital experiences — guided by
            Islamic &amp; ethical principles.
          </motion.p>

          {/* Facts — 2×2 grid */}
          <motion.div variants={fadeUp} className="ab-hero-facts">
            {[
              { icon: faLocationDot,   text: 'Nilphamari, BD',    c: '#10B981', bg: '#10B98114' },
              { icon: faGraduationCap, text: 'SSC-26 · SGSC',     c: '#3B82F6', bg: '#3B82F614' },
              { icon: faCalendar,      text: `${age} yrs · Muslim`, c: '#F59E0B', bg: '#F59E0B14' },
              { icon: faRocket,        text: 'Goal: CSE Engineer', c: '#8B5CF6', bg: '#8B5CF614' },
            ].map(({ icon, text, c, bg }) => (
              <span key={text} className="ab-fact-pill" style={{ '--fc': c, '--fb': bg }}>
                <FontAwesomeIcon icon={icon} />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="ab-hero-cta">
            <Link to="/contact" className="ab-cta-primary">
              <FontAwesomeIcon icon={faHandshake} />
              Get in Touch
            </Link>
            {settings?.cvEnabled && settings?.cvUrl ? (
              <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer"
                className="ab-cta-secondary">
                <FontAwesomeIcon icon={faDownload} />
                Download CV
              </a>
            ) : (
              <Link to="/projects" className="ab-cta-secondary">
                <FontAwesomeIcon icon={faGlobe} />
                View Projects
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT — hero image (layout unchanged) */}
        <motion.div className="ab-hero-right"
          initial={{ opacity: 0, x: 24, scale: .96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: .75, ease: [.16, 1, .3, 1], delay: .15 }}>
          <div className="ab-hero-img-box">
            <div className="ab-hero-img-glow" />
            <div className="ab-hero-img-frame">
              <img
                src="/hero-back.webp"
                alt="Muhtasim Rahman"
                className="ab-hero-img"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* ── Base ── */
        .ab-hero {
          position: relative; min-height: 100dvh;
          display: flex; align-items: center;
          overflow: hidden; background: var(--bg-page);
        }

        /* Texture */
        .ab-hero-tex {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(59,130,246,.05) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%);
        }
        [data-theme=light] .ab-hero-tex {
          background-image:
            radial-gradient(rgba(37,99,235,.06) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.04) 1px, transparent 1px);
        }

        /* Orbs */
        .ab-hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .ab-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,.14) 0%, transparent 70%);
          top: -100px; left: -120px;
        }
        .ab-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(99,102,241,.09) 0%, transparent 70%);
          bottom: 0; right: 5%;
        }
        [data-theme=light] .ab-orb-1 {
          background: radial-gradient(circle, rgba(37,99,235,.05) 0%, transparent 70%);
        }

        /* ── FULL-SECTION gradient ── */
        /* spans the entire hero width, bottom-to-top             */
        /* z-index 4: above image (z3) but below left text (z6)   */
        .ab-hero-fullgrad {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 55%; pointer-events: none; z-index: 4;
          background: linear-gradient(
            to top,
            var(--bg-page)           0%,
            var(--bg-page)           6%,
            rgba(2,6,23,.55)         28%,
            transparent              100%
          );
        }
        [data-theme=light] .ab-hero-fullgrad {
          background: linear-gradient(
            to top,
            var(--bg-page)           0%,
            var(--bg-page)           5%,
            rgba(240,244,248,.6)     26%,
            transparent              100%
          );
        }

        /* ── Hero inner grid ── */
        .ab-hero-inner {
          position: relative; z-index: 5;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem); align-items: center;
          width: 100%; max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          padding-top: calc(var(--navbar-h) + clamp(1.5rem, 3vh, 2.5rem));
          padding-bottom: clamp(2.5rem, 5vh, 4rem);
          min-height: 100dvh;
        }

        /* ── LEFT ── */
        .ab-hero-left {
          display: flex; flex-direction: column; gap: 1.15rem;
          position: relative; z-index: 6;
        }

        /* Breadcrumb */
        .ab-bc {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .ab-bc-link { color: var(--text-tertiary); text-decoration: none; transition: color .15s; }
        .ab-bc-link:hover { color: var(--accent-primary); }
        .ab-bc-sep { font-size: .5rem; opacity: .5; }
        .ab-bc-cur { color: var(--text-secondary); }

        /* Name block */
        .ab-hero-name-block { display: flex; flex-direction: column; gap: .45rem; }
        .ab-hero-eyebrow {
          font-size: .78rem; font-weight: 500; color: var(--accent-primary);
          font-family: var(--font-mono); letter-spacing: .04em;
        }
        .ab-hero-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.05; letter-spacing: -.03em; color: var(--text-primary);
        }
        .ab-hero-nick-row {
          display: flex; align-items: center; gap: .65rem; flex-wrap: wrap;
        }
        .ab-hero-nick {
          font-size: .8rem; font-weight: 700; font-family: var(--font-mono);
          color: #fff; background: var(--accent-primary);
          padding: .2rem .65rem; border-radius: var(--radius-full);
          letter-spacing: .05em;
        }
        .ab-hero-divider {
          width: 1px; height: 14px; background: var(--border-strong); flex-shrink: 0;
        }
        .ab-hero-role {
          font-size: clamp(.8rem, 1.1vw, .9rem);
          color: var(--text-secondary); font-weight: 500;
        }

        /* Bio */
        .ab-hero-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.75; max-width: 460px;
        }

        /* Facts — 2×2 grid */
        .ab-hero-facts {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .45rem; max-width: 380px;
        }
        .ab-fact-pill {
          display: inline-flex; align-items: center; gap: .42rem;
          padding: .35rem .75rem; border-radius: var(--radius-md);
          background: var(--fb, var(--bg-surface));
          border: 1px solid color-mix(in srgb, var(--fc, var(--accent-primary)) 22%, var(--border-color));
          font-size: .74rem; color: var(--text-secondary);
          font-family: var(--font-mono); font-weight: 500;
        }
        .ab-fact-pill svg { color: var(--fc); font-size: .7rem; flex-shrink: 0; }

        /* CTA */
        .ab-hero-cta { display: flex; flex-wrap: wrap; gap: .65rem; }
        .ab-cta-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease; box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .ab-cta-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .ab-cta-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--border-strong); transition: all .2s ease;
        }
        .ab-cta-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* ── RIGHT image ── */
        .ab-hero-right {
          position: relative; z-index: 3;
          display: flex; align-items: center; justify-content: flex-end;
        }
        .ab-hero-img-box {
          position: relative;
          width: clamp(260px, 35vw, 460px);
          height: clamp(360px, 44vw, 600px);
          flex-shrink: 0;
        }
        .ab-hero-img-glow {
          position: absolute; inset: 8% 10%; z-index: 0; border-radius: 24px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.2) 0%, transparent 70%);
          filter: blur(28px); pointer-events: none;
        }
        [data-theme=light] .ab-hero-img-glow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        .ab-hero-img-frame {
          position: relative; z-index: 1; width: 100%; height: 100%; overflow: hidden;
        }
        .ab-hero-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
        }
        [data-theme=dark] .ab-hero-img {
          filter: drop-shadow(0 8px 30px rgba(0,0,0,.4));
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ab-hero-inner {
            grid-template-columns: 1fr; text-align: center;
            align-items: start;
            padding-top: calc(var(--navbar-h) + 1.75rem);
            padding-bottom: 2.5rem;
            min-height: unset; gap: 2rem;
          }
          .ab-hero-left  { align-items: center; order: 2; }
          .ab-hero-right { order: 1; justify-content: center; z-index: 3; }
          .ab-hero-bio   { max-width: 70%; }
          .ab-hero-facts { max-width: 340px; }
          .ab-hero-cta   { justify-content: center; }
          .ab-hero-nick-row { justify-content: center; }
          .ab-hero-img-box {
            width: clamp(200px, 55vw, 300px);
            height: clamp(220px, 60vw, 330px);
          }
          .ab-hero-fullgrad { height: 45%; }
        }
        @media (max-width: 480px) {
          .ab-hero-img-box { width: clamp(180px, 70vw, 260px); height: clamp(200px, 75vw, 290px); }
          .ab-hero-h1 { font-size: clamp(2rem, 10vw, 2.6rem); }
          .ab-hero-facts { grid-template-columns: 1fr 1fr; max-width: 300px; }
        }
      `}</style>
    </section>
  )
}
