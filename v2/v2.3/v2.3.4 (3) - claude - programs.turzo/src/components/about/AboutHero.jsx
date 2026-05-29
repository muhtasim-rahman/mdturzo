// ============================================================
// AboutHero.jsx — v2.3.4
// Redesigned hero: 
//   * Breadcrumb removed (now in AboutBreadcrumb.jsx)
//   * Full-section bottom-to-top gradient (same style as home hero-grad-btm)
//   * hero-back.webp — no rounded frame on any screen size
//   * Unique split layout: left = stacked identity+bio+facts+cta, right = image
//   * Left content always above gradient (z-index layering)
//   * Minimal top padding since breadcrumb bar sits above
// ============================================================

import { Link }           from 'react-router-dom'
import { motion }         from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap,
  faHandshake, faDownload, faGlobe,
  faMosque, faCode, faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { fadeUp, stagger } from './aboutData.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

const QUICK_FACTS = [
  { icon: faLocationDot,   text: 'Nilphamari, BD',   c: '#10B981' },
  { icon: faGraduationCap, text: 'SSC-26 · SGSC',    c: '#3B82F6' },
  { icon: faMosque,        text: 'Muslim',            c: '#F59E0B' },
  { icon: faCalendarDays,  text: '~18 y/o',           c: '#8B5CF6' },
]

export default function AboutHero({ age }) {
  const { settings } = useSiteSettings()

  return (
    <section className="ab-hero" id="about-hero" aria-label="About Hero">
      {/* Dot texture */}
      <div className="ab-hero-tex" aria-hidden="true" />

      {/* Ambient orbs */}
      <div className="ab-hero-orb ab-orb-1" aria-hidden="true" />
      <div className="ab-hero-orb ab-orb-2" aria-hidden="true" />

      {/* Full-section bottom-to-top gradient — same style as home */}
      <div className="ab-hero-grad" aria-hidden="true" />

      <div className="ab-hero-inner">

        {/* LEFT — identity & info */}
        <motion.div className="ab-hero-left"
          initial="hidden" animate="show" variants={stagger(.08)}>

          {/* Eyebrow */}
          <motion.span variants={fadeUp} className="ab-hero-eyebrow">
            — Getting to know me
          </motion.span>

          {/* Name */}
          <motion.div variants={fadeUp} className="ab-hero-identity">
            <h1 className="ab-hero-h1">
              Muhtasim
              <span className="ab-hero-surname">
                Rahman
                <span className="ab-hero-nick">Turzo</span>
              </span>
            </h1>
            <div className="ab-hero-role">
              <span className="ab-role-dot" />
              Web Developer &amp; Designer
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="ab-hero-bio">
            A {age || '~18'}-year-old self-taught developer from Bangladesh —
            passionate about building clean, purposeful digital experiences,
            always guided by Islamic &amp; ethical principles.
          </motion.p>

          {/* Quick facts — 2×2 */}
          <motion.div variants={fadeUp} className="ab-hero-facts">
            {QUICK_FACTS.map(({ icon, text, c }) => (
              <span key={text} className="ab-fact-pill">
                <span className="ab-fact-icon" style={{ background: `${c}1a`, color: c }}>
                  <FontAwesomeIcon icon={icon} />
                </span>
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="ab-hero-cta">
            <Link to="/contact" className="ab-cta-primary">
              <FontAwesomeIcon icon={faHandshake} />
              Get in Touch
            </Link>
            {settings?.cvEnabled && settings?.cvUrl ? (
              <a href={settings.cvUrl} download className="ab-cta-secondary">
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

        {/* RIGHT — hero image, no rounded frame */}
        <motion.div className="ab-hero-right"
          initial={{ opacity: 0, x: 28, scale: .96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: .72, ease: [.16, 1, .3, 1], delay: .12 }}>
          <div className="ab-img-wrap">
            <div className="ab-img-glow" aria-hidden="true" />
            <img
              src="/hero-back.webp"
              alt="Muhtasim Rahman"
              className="ab-img"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </motion.div>

      </div>

      <style>{`
        /* ── Section ── */
        .ab-hero {
          position: relative;
          min-height: calc(100dvh - var(--navbar-h, 68px) - 36px);
          display: flex; align-items: center;
          overflow: hidden; background: var(--bg-page);
        }

        /* Dot texture */
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
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(37,99,235,.15) 0%, transparent 70%);
          top: -120px; left: -100px;
        }
        .ab-orb-2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%);
          bottom: 0; right: 6%;
        }
        [data-theme=light] .ab-orb-1 {
          background: radial-gradient(circle, rgba(37,99,235,.05) 0%, transparent 70%);
        }

        /* Full-section bottom-to-top gradient (same style as home .hero-grad-btm) */
        .ab-hero-grad {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 52%; pointer-events: none; z-index: 2;
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            rgba(2,6,23,.65) 26%,
            rgba(2,6,23,.22) 52%,
            transparent 100%
          );
        }
        [data-theme=light] .ab-hero-grad {
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            rgba(240,244,248,.72) 26%,
            rgba(240,244,248,.28) 52%,
            transparent 100%
          );
        }

        /* ── Inner grid ── */
        .ab-hero-inner {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          width: 100%; max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          /* navbar is transparent/absolute; page has padding-top: navbar-h; breadcrumb is 36px above hero */
          padding-top: clamp(2rem, 4vh, 3.5rem);
          padding-bottom: clamp(3rem, 6vh, 5rem);
          min-height: calc(100dvh - var(--navbar-h, 68px) - 36px);
        }

        /* ── Left ── */
        .ab-hero-left {
          display: flex; flex-direction: column; gap: 1.2rem;
          position: relative; z-index: 6;
        }

        /* Eyebrow */
        .ab-hero-eyebrow {
          font-size: .78rem; font-weight: 500;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .04em;
        }

        /* Identity */
        .ab-hero-identity { display: flex; flex-direction: column; gap: .45rem; }
        .ab-hero-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.05; letter-spacing: -.03em;
          color: var(--text-primary);
          display: flex; flex-direction: column;
          margin: 0;
        }
        .ab-hero-surname {
          display: flex; align-items: baseline; gap: .4em; flex-wrap: wrap;
        }
        .ab-hero-nick {
          font-size: .27em; font-weight: 600;
          color: #fff; background: var(--accent-primary);
          font-family: var(--font-mono); letter-spacing: .06em;
          padding: .15em .5em; border-radius: var(--radius-sm);
          vertical-align: middle;
        }
        .ab-hero-role {
          display: inline-flex; align-items: center; gap: .5rem;
          font-size: .87rem; font-weight: 600; color: var(--text-secondary);
          padding: .33rem .8rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          width: fit-content;
        }
        .ab-role-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 3px rgba(16,185,129,.2);
          animation: ab-role-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ab-role-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(16,185,129,.2); }
          50%       { box-shadow: 0 0 0 6px rgba(16,185,129,.08); }
        }

        /* Bio */
        .ab-hero-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.78; max-width: 460px;
          margin: 0;
        }

        /* Facts 2×2 */
        .ab-hero-facts {
          display: grid; grid-template-columns: 1fr 1fr; gap: .48rem;
          max-width: 380px;
        }
        .ab-fact-pill {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .4rem .72rem; border-radius: var(--radius-md);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .75rem; color: var(--text-secondary);
          font-family: var(--font-mono);
          transition: border-color .18s;
        }
        .ab-fact-pill:hover { border-color: var(--accent-primary); }
        .ab-fact-icon {
          width: 22px; height: 22px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .6rem; flex-shrink: 0;
        }

        /* CTAs */
        .ab-hero-cta { display: flex; flex-wrap: wrap; gap: .6rem; }
        .ab-cta-primary {
          display: inline-flex; align-items: center; gap: .48rem;
          padding: .6rem 1.35rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease;
          box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .ab-cta-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .ab-cta-secondary {
          display: inline-flex; align-items: center; gap: .48rem;
          padding: .6rem 1.35rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--border-strong); transition: all .2s ease;
        }
        .ab-cta-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* ── Right image ── */
        .ab-hero-right {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: flex-end;
        }
        .ab-img-wrap {
          position: relative;
          width: clamp(260px, 36vw, 480px);
          height: clamp(360px, 46vw, 620px);
          flex-shrink: 0;
        }
        .ab-img-glow {
          position: absolute; inset: 8% 10%; z-index: 0; border-radius: 24px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.22) 0%, transparent 70%);
          filter: blur(32px); pointer-events: none;
          animation: ab-glow-p 4s ease-in-out infinite;
        }
        [data-theme=light] .ab-img-glow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        @keyframes ab-glow-p {
          0%, 100% { opacity: .7; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.08); }
        }
        /* Image — NO rounded frame, natural edges, gradient handles blending */
        .ab-img {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        [data-theme=dark] .ab-img {
          filter: drop-shadow(0 8px 32px rgba(0,0,0,.45));
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .ab-hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            align-items: start;
            padding-top: 2rem;
            padding-bottom: 3rem;
            min-height: unset; gap: 2rem;
          }
          .ab-hero-left  { align-items: center; order: 2; }
          .ab-hero-right { order: 1; justify-content: center; }
          .ab-hero-bio   { max-width: 72%; }
          .ab-hero-facts { margin-inline: auto; }
          .ab-hero-cta   { justify-content: center; }
          .ab-img-wrap {
            width: clamp(200px, 55vw, 300px);
            height: clamp(220px, 62vw, 340px);
          }
        }
        @media (max-width: 480px) {
          .ab-hero-bio   { max-width: 100%; }
          .ab-img-wrap   { width: clamp(180px, 68vw, 240px); height: clamp(200px, 74vw, 280px); }
          .ab-hero-h1    { font-size: clamp(2rem, 10vw, 2.6rem); }
          .ab-hero-facts { max-width: 100%; }
        }
      `}</style>
    </section>
  )
}
