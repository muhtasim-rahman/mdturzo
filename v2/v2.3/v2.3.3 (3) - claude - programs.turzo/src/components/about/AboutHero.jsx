// ============================================================
// AboutHero.jsx — v2.3.3
// CHANGES:
//   * Left content layout redesigned — editorial/chapter style,
//     distinct from Home hero (2x2 fact grid, chapter number,
//     decorative line, different name treatment)
//   * Gradient moved to full hero section level (not image-only)
//     same position on mobile & pc, sits below left content
//   * Removed ::after gradient from ab-hero-img-frame
// ============================================================

import { Link }           from 'react-router-dom'
import { motion }         from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCalendar, faRocket,
  faHandshake, faDownload, faGlobe, faChevronRight, faCode,
} from '@fortawesome/free-solid-svg-icons'
import { fadeUp, stagger } from './aboutData.js'

export default function AboutHero({ age, settings }) {
  return (
    <section className="ab-hero" id="about-hero" aria-label="About Hero">
      {/* Background texture */}
      <div className="ab-hero-tex" aria-hidden="true" />
      <div className="ab-hero-orb ab-orb-1" aria-hidden="true" />
      <div className="ab-hero-orb ab-orb-2" aria-hidden="true" />

      {/* Full-section bottom-to-top gradient — sits above bg, below content */}
      <div className="ab-hero-grad" aria-hidden="true" />

      <div className="ab-hero-inner">
        {/* LEFT — redesigned editorial layout */}
        <motion.div className="ab-hero-left"
          initial="hidden" animate="show" variants={stagger(.1)}>

          {/* Chapter marker */}
          <motion.div variants={fadeUp} className="ab-chapter">
            <span className="ab-chapter-num">01</span>
            <span className="ab-chapter-line" />
            <nav className="ab-bc" aria-label="Breadcrumb">
              <Link to="/" className="ab-bc-link">Home</Link>
              <FontAwesomeIcon icon={faChevronRight} className="ab-bc-sep" />
              <span className="ab-bc-cur">About</span>
            </nav>
          </motion.div>

          {/* Name block */}
          <motion.div variants={fadeUp} className="ab-name-block">
            <p className="ab-eyebrow">Getting to know me</p>
            <h1 className="ab-hero-h1">
              Muhtasim
              <br />
              <span className="ab-hero-surname">Rahman</span>
            </h1>
            <div className="ab-role-row">
              <span className="ab-role-dot" />
              <span className="ab-hero-role">Web Developer &amp; Designer</span>
              <span className="ab-nick">(Turzo)</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="ab-hero-bio">
            A {age}-year-old self-taught developer from Bangladesh, building
            clean, fast, and meaningful digital experiences — always guided by
            Islamic &amp; ethical principles.
          </motion.p>

          {/* 2×2 Fact grid */}
          <motion.div variants={fadeUp} className="ab-facts-grid">
            {[
              { icon: faLocationDot,   text: 'Nilphamari, BD',   label: 'Location', c: '#10B981' },
              { icon: faGraduationCap, text: 'SSC-26 · SGSC',    label: 'Education', c: '#3B82F6' },
              { icon: faCalendar,      text: `Age ${age} · Muslim`, label: 'Personal', c: '#F59E0B' },
              { icon: faRocket,        text: 'Goal: CSE Engineer', label: 'Ambition', c: '#8B5CF6' },
            ].map(({ icon, text, label, c }) => (
              <div key={label} className="ab-fact-item">
                <div className="ab-fact-icon-wrap" style={{ background: `${c}18`, color: c }}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="ab-fact-content">
                  <span className="ab-fact-label">{label}</span>
                  <span className="ab-fact-value">{text}</span>
                </div>
              </div>
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
            <Link to="#about-story" className="ab-cta-ghost">
              <FontAwesomeIcon icon={faCode} />
              My Story
            </Link>
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
        /* ── Section ── */
        .ab-hero {
          position: relative; min-height: 100dvh;
          display: flex; align-items: center;
          overflow: hidden; background: var(--bg-page);
        }

        /* Background texture */
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

        /* Full-section bottom gradient — spans entire width, sits below content */
        .ab-hero-grad {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 55%;
          pointer-events: none; z-index: 2;
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 5%,
            rgba(2,6,23,.5) 30%,
            transparent 100%
          );
        }
        [data-theme=light] .ab-hero-grad {
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 4%,
            rgba(240,244,248,.6) 30%,
            transparent 100%
          );
        }

        /* ── Inner grid ── */
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

        /* ── Left — editorial layout ── */
        .ab-hero-left {
          display: flex; flex-direction: column; gap: 1.4rem;
          position: relative; z-index: 6;
        }

        /* Chapter marker */
        .ab-chapter {
          display: flex; align-items: center; gap: .75rem;
        }
        .ab-chapter-num {
          font-family: var(--font-display); font-size: 2.2rem;
          font-weight: 900; line-height: 1;
          color: var(--accent-primary); opacity: .18;
          letter-spacing: -.04em;
        }
        .ab-chapter-line {
          width: 28px; height: 2px;
          background: var(--border-strong); flex-shrink: 0;
        }
        .ab-bc {
          display: inline-flex; align-items: center; gap: .35rem;
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .ab-bc-link { color: var(--text-tertiary); text-decoration: none; transition: color .15s; }
        .ab-bc-link:hover { color: var(--accent-primary); }
        .ab-bc-sep { font-size: .5rem; opacity: .4; }
        .ab-bc-cur { color: var(--text-secondary); }

        /* Name block */
        .ab-name-block { display: flex; flex-direction: column; gap: .35rem; }
        .ab-eyebrow {
          font-size: .75rem; font-weight: 600;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .08em; text-transform: uppercase;
        }
        .ab-hero-h1 {
          font-family: var(--font-display); font-weight: 900;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          line-height: 1.0; letter-spacing: -.035em; color: var(--text-primary);
        }
        .ab-hero-surname {
          display: block;
          background: linear-gradient(135deg, var(--accent-primary), #818cf8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-role-row {
          display: flex; align-items: center; gap: .6rem; margin-top: .15rem;
        }
        .ab-role-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent-primary); flex-shrink: 0;
        }
        .ab-hero-role {
          font-size: clamp(.82rem, 1.1vw, .95rem);
          color: var(--text-secondary); font-weight: 500;
        }
        .ab-nick {
          font-size: .72rem; color: var(--text-tertiary);
          font-family: var(--font-mono); font-weight: 500;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          padding: .12rem .45rem; border-radius: var(--radius-full);
        }

        /* Bio */
        .ab-hero-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.78;
          max-width: 440px;
          padding-left: .65rem;
          border-left: 2px solid var(--border-strong);
        }

        /* 2×2 Facts grid */
        .ab-facts-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .6rem;
        }
        .ab-fact-item {
          display: flex; align-items: center; gap: .6rem;
          padding: .6rem .75rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: border-color .18s;
        }
        .ab-fact-item:hover { border-color: var(--border-strong); }
        .ab-fact-icon-wrap {
          width: 28px; height: 28px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem; flex-shrink: 0;
        }
        .ab-fact-content { display: flex; flex-direction: column; gap: .05rem; min-width: 0; }
        .ab-fact-label {
          font-size: .62rem; font-weight: 600;
          color: var(--text-tertiary); font-family: var(--font-mono);
          text-transform: uppercase; letter-spacing: .06em;
        }
        .ab-fact-value {
          font-size: .75rem; font-weight: 600;
          color: var(--text-primary); white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }

        /* CTA */
        .ab-hero-cta { display: flex; flex-wrap: wrap; gap: .6rem; }
        .ab-cta-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .6rem 1.35rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .84rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease; box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .ab-cta-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .ab-cta-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .6rem 1.35rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .84rem; text-decoration: none;
          border: 2px solid var(--border-strong); transition: all .2s ease;
        }
        .ab-cta-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }
        .ab-cta-ghost {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .6rem 1rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-tertiary);
          font-size: .82rem; font-weight: 500; text-decoration: none;
          border: 1.5px solid var(--border-color); transition: all .2s ease;
        }
        .ab-cta-ghost:hover { color: var(--text-secondary); border-color: var(--border-strong); }

        /* ── Right image ── */
        .ab-hero-right {
          position: relative; z-index: 5;
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
        /* NOTE: no ::after gradient here — handled by section-level .ab-hero-grad */
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
          .ab-hero-right { order: 1; justify-content: center; }
          .ab-chapter    { justify-content: center; }
          .ab-role-row   { justify-content: center; }
          .ab-hero-bio   { max-width: 70%; border-left: none; border-top: 2px solid var(--border-strong); padding-left: 0; padding-top: .55rem; text-align: center; }
          .ab-facts-grid { max-width: 380px; }
          .ab-hero-cta   { justify-content: center; }
          .ab-hero-img-box {
            width: clamp(200px, 55vw, 300px);
            height: clamp(220px, 60vw, 330px);
          }
          .ab-hero-img-frame { border-radius: 0; }
          .ab-hero-img-frame::before {
            content: ''; position: absolute; z-index: 2; pointer-events: none;
            top: 0; bottom: 0; left: -2px; width: 30%;
            background: linear-gradient(to right, var(--bg-page) 0%, transparent 100%);
          }
        }
        @media (max-width: 480px) {
          .ab-hero-img-box { width: clamp(180px, 70vw, 260px); height: clamp(200px, 75vw, 290px); }
          .ab-hero-h1 { font-size: clamp(2rem, 10vw, 2.6rem); }
          .ab-facts-grid { grid-template-columns: 1fr 1fr; max-width: 100%; }
          .ab-fact-value { font-size: .68rem; }
        }
      `}</style>
    </section>
  )
}
