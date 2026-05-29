// ============================================================
// AboutHero.jsx — v2.3.4
// REDESIGN: Editorial split layout
//   * Left 48%: content (no breadcrumb — moved to About.jsx strip)
//   * Right 52%: hero-back.webp, full-column-height, bleeds to edge
//     Same gradient treatment as home hero (bottom fade, NO rounded frame anywhere)
//   * Full-section bottom gradient (covers entire width, same as home)
//   * padding-top adjusted — ab-page now handles navbar offset
// ============================================================

import { Link }           from 'react-router-dom'
import { motion }         from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap,
  faHandshake, faDownload, faGlobe,
  faMosque, faCode,
} from '@fortawesome/free-solid-svg-icons'
import { fadeUp, stagger } from './aboutData.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'
import { calculateAge } from '../../config/site.config.js'

const QUICK_FACTS = [
  { icon: faLocationDot,   text: 'Nilphamari, BD',    c: '#10B981' },
  { icon: faGraduationCap, text: 'SSC-26 · SGSC',     c: '#3B82F6' },
  { icon: faMosque,        text: 'Muslim',             c: '#F59E0B' },
  { icon: faCode,          text: 'Web Developer',      c: '#8B5CF6' },
]

export default function AboutHero() {
  const { settings } = useSiteSettings()
  const age = calculateAge()

  return (
    <section className="abh-section" id="about-hero" aria-label="About Hero">
      {/* Background texture */}
      <div className="abh-tex" aria-hidden="true" />

      {/* Ambient orbs */}
      <div className="abh-orb abh-orb-1" aria-hidden="true" />
      <div className="abh-orb abh-orb-2" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="abh-inner">
        {/* LEFT — text content */}
        <motion.div
          className="abh-left"
          initial="hidden" animate="show" variants={stagger(0.1)}>

          {/* Eyebrow */}
          <motion.span variants={fadeUp} className="abh-eyebrow">
            — Getting to know me
          </motion.span>

          {/* Name block */}
          <motion.div variants={fadeUp} className="abh-identity">
            <h1 className="abh-h1">
              Muhtasim
              <span className="abh-name-accent">
                Rahman
                <span className="abh-nick">Turzo</span>
              </span>
            </h1>
          </motion.div>

          {/* Role chip */}
          <motion.div variants={fadeUp} className="abh-role-chip">
            <span className="abh-role-dot" />
            Web Developer &amp; Designer
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="abh-bio">
            A {age}-year-old self-taught developer from Bangladesh, building clean,
            fast, and meaningful digital experiences — guided by Islamic &amp; ethical principles.
          </motion.p>

          {/* Fact pills — 2×2 grid */}
          <motion.div variants={fadeUp} className="abh-facts">
            {QUICK_FACTS.map(({ icon, text, c }) => (
              <span key={text} className="abh-fact-pill">
                <span className="abh-fact-icon" style={{ background: `${c}1a`, color: c }}>
                  <FontAwesomeIcon icon={icon} />
                </span>
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="abh-ctas">
            <Link to="/contact" className="abh-btn-primary">
              <FontAwesomeIcon icon={faHandshake} />
              Get in Touch
            </Link>
            {settings?.cvEnabled && settings?.cvUrl ? (
              <a href={settings.cvUrl} download className="abh-btn-secondary">
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

          {/* Age + location footer */}
          <motion.div variants={fadeUp} className="abh-footer">
            <span className="abh-age-tag">Age {age}</span>
            <span className="abh-footer-sep" />
            <span className="abh-footer-loc">Nilphamari, Bangladesh</span>
          </motion.div>
        </motion.div>

        {/* RIGHT — editorial full-column image */}
        <motion.div
          className="abh-right"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}>

          <div className="abh-img-wrap">
            {/* Glow behind image */}
            <div className="abh-img-glow" aria-hidden="true" />

            {/* Image frame — same style as home, NO rounded corners anywhere */}
            <div className="abh-img-frame">
              <img
                src="/hero-back.webp"
                alt="Muhtasim Rahman"
                className="abh-img"
                loading="eager"
                fetchPriority="high"
              />
              {/* Bottom gradient on image — same as home hero himg-frame::after */}
              <div className="abh-img-fade" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-section bottom gradient — covers entire width, same as home */}
      <div className="abh-section-grad" aria-hidden="true" />

      <style>{`
        /* ── Section ── */
        .abh-section {
          position: relative;
          min-height: calc(100dvh - var(--navbar-h) - 36px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-page);
        }

        /* Background texture */
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

        /* Orbs */
        .abh-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .abh-orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(37,99,235,.15) 0%, transparent 70%);
          top: -80px; left: -120px;
        }
        .abh-orb-2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%);
          bottom: 8%; right: 15%;
        }
        [data-theme=light] .abh-orb-1 { background: radial-gradient(circle, rgba(37,99,235,.05) 0%, transparent 70%); }

        /* ── Inner grid ── */
        .abh-inner {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
          width: 100%;
          min-height: calc(100dvh - var(--navbar-h) - 36px);
        }

        /* ── LEFT ── */
        .abh-left {
          display: flex; flex-direction: column; gap: 1.2rem;
          padding: clamp(2rem, 5vh, 3.5rem) clamp(1.25rem, 4vw, 2rem) clamp(2rem, 5vh, 3.5rem) clamp(1.25rem, 5vw, 3rem);
          position: relative; z-index: 6;
          max-width: 560px;
        }

        .abh-eyebrow {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 500;
          color: var(--accent-primary); letter-spacing: .06em;
        }

        .abh-identity { display: flex; flex-direction: column; gap: .4rem; }
        .abh-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.06; letter-spacing: -.03em; color: var(--text-primary);
          display: flex; flex-direction: column;
        }
        .abh-name-accent {
          display: flex; align-items: baseline; gap: .4em; flex-wrap: wrap;
        }
        .abh-nick {
          font-size: .27em; font-weight: 700;
          color: var(--bg-surface); background: var(--accent-primary);
          font-family: var(--font-mono); letter-spacing: .08em;
          padding: .14em .5em; border-radius: var(--radius-sm);
          vertical-align: middle;
        }

        .abh-role-chip {
          display: inline-flex; align-items: center; gap: .55rem;
          width: fit-content;
          padding: .35rem .9rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .88rem; font-weight: 600; color: var(--text-secondary);
        }
        .abh-role-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981; flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(16,185,129,.2);
          animation: abh-pulse 2s ease-in-out infinite;
        }
        @keyframes abh-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(16,185,129,.2); }
          50%       { box-shadow: 0 0 0 6px rgba(16,185,129,.07); }
        }

        .abh-bio {
          font-size: clamp(.83rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.78;
          max-width: 440px;
        }

        .abh-facts {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .5rem; max-width: 360px;
        }
        .abh-fact-pill {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .4rem .7rem; border-radius: var(--radius-md);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .74rem; color: var(--text-secondary); font-family: var(--font-mono);
          transition: border-color .18s;
          cursor: default;
        }
        .abh-fact-pill:hover { border-color: var(--accent-primary); }
        .abh-fact-icon {
          width: 22px; height: 22px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .58rem; flex-shrink: 0;
        }

        .abh-ctas { display: flex; flex-wrap: wrap; gap: .6rem; }
        .abh-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease; box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .abh-btn-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .abh-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--border-strong); transition: all .2s ease;
        }
        .abh-btn-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        .abh-footer {
          display: flex; align-items: center; gap: .7rem;
          padding-top: .15rem;
        }
        .abh-age-tag {
          font-size: .7rem; font-weight: 700;
          color: var(--accent-primary); font-family: var(--font-mono);
          padding: .15rem .55rem; border-radius: var(--radius-full);
          background: var(--accent-light); border: 1px solid rgba(37,99,235,.25);
        }
        .abh-footer-sep { width: 1px; height: 13px; background: var(--border-color); }
        .abh-footer-loc {
          font-size: .7rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* ── RIGHT — editorial image ── */
        .abh-right {
          position: relative; z-index: 4;
          align-self: stretch;
          display: flex; align-items: center;
          overflow: hidden;
        }
        .abh-img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: clamp(400px, 70vh, 700px);
        }
        .abh-img-glow {
          position: absolute; inset: 10% 8%; z-index: 0; border-radius: 20px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.18) 0%, transparent 65%);
          filter: blur(34px); pointer-events: none;
        }
        [data-theme=light] .abh-img-glow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.07) 0%, transparent 65%);
        }
        .abh-img-frame {
          position: relative; z-index: 1;
          width: 100%; height: 100%; overflow: hidden;
          /* NO border-radius anywhere */
        }
        .abh-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
        }
        [data-theme=dark] .abh-img {
          filter: drop-shadow(0 8px 30px rgba(0,0,0,.4));
        }

        /* Left-edge gradient — blends image into left content */
        .abh-right::before {
          content: ''; position: absolute;
          left: 0; top: 0; bottom: 0; width: 55%;
          background: linear-gradient(to right, var(--bg-page) 0%, var(--bg-page) 10%, transparent 100%);
          z-index: 2; pointer-events: none;
        }

        /* Bottom image fade — same as home hero */
        .abh-img-fade {
          position: absolute; z-index: 3; pointer-events: none;
          bottom: -5px; left: -1px; right: -1px;
          height: calc(40% + 5px);
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 6%,
            rgba(2,6,23,.7) 32%,
            transparent 100%
          );
        }
        [data-theme=light] .abh-img-fade {
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 5%,
            rgba(240,244,248,.8) 30%,
            transparent 100%
          );
        }

        /* Full-section bottom gradient — same width as section */
        .abh-section-grad {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          height: 38%; pointer-events: none;
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 6%,
            rgba(2,6,23,.45) 30%,
            transparent 100%
          );
        }
        [data-theme=light] .abh-section-grad {
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 5%,
            rgba(240,244,248,.55) 28%,
            transparent 100%
          );
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .abh-inner {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .abh-right {
            order: -1;
            height: clamp(260px, 52vw, 380px);
            min-height: unset;
          }
          .abh-right::before {
            /* On mobile: bottom gradient instead of left */
            width: 100%; height: 50%;
            top: auto; bottom: 0; left: 0;
            background: linear-gradient(to top, var(--bg-page) 0%, transparent 100%);
          }
          .abh-img-fade { display: none; } /* section grad handles it */
          .abh-left {
            padding: 1.25rem clamp(1rem, 5vw, 2rem) 2.5rem;
            max-width: 100%;
            align-items: center;
            text-align: center;
          }
          .abh-bio { max-width: 72%; }
          .abh-facts { margin-inline: auto; }
          .abh-ctas, .abh-footer { justify-content: center; }
        }
        @media (max-width: 540px) {
          .abh-facts { grid-template-columns: 1fr 1fr; max-width: 100%; }
          .abh-h1 { font-size: clamp(2rem, 10vw, 2.6rem); }
          .abh-bio { max-width: 100%; }
        }
      `}</style>
    </section>
  )
}
