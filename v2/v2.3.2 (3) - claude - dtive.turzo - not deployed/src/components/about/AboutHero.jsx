// ============================================================
// AboutHero.jsx — v2.3.2
// About page hero section — extracted from About.jsx
// Changes: fixed excess top padding (calc reduced)
// ============================================================

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faCode,
  faHandshake, faDownload, faGlobe,
  faChevronRight, faCalendar, faRocket,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

export default function AboutHero() {
  const { settings } = useSiteSettings()
  const age = calculateAge()

  return (
    <section className="abh-hero" id="about-hero" aria-label="About Hero">
      {/* Background ambience */}
      <div className="abh-tex" aria-hidden="true" />
      <div className="abh-orb abh-orb1" aria-hidden="true" />
      <div className="abh-orb abh-orb2" aria-hidden="true" />
      <div className="abh-grad" aria-hidden="true" />

      <div className="abh-inner">
        {/* LEFT — text */}
        <motion.div className="abh-left" initial="hidden" animate="show" variants={stagger(.1)}>

          {/* Breadcrumb */}
          <motion.nav variants={fadeUp} className="abh-bc">
            <Link to="/" className="abh-bc-link">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} className="abh-bc-sep" />
            <span className="abh-bc-cur">About</span>
          </motion.nav>

          {/* Eyebrow */}
          <motion.p variants={fadeUp} className="abh-eyebrow">— Getting to know me</motion.p>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="abh-name">
            Muhtasim<br />Rahman
            <span className="abh-nick">(Turzo)</span>
          </motion.h1>

          {/* Role */}
          <motion.p variants={fadeUp} className="abh-role">Web Developer &amp; Designer</motion.p>

          {/* Bio */}
          <motion.p variants={fadeUp} className="abh-bio">
            A {age}-year-old self-taught developer from Bangladesh, passionate about building
            clean, fast, and meaningful digital experiences — always guided by
            Islamic &amp; ethical principles.
          </motion.p>

          {/* Fact pills */}
          <motion.div variants={fadeUp} className="abh-facts">
            {[
              { icon: faLocationDot,   text: 'Nilphamari, BD',    c: '#10B981' },
              { icon: faGraduationCap, text: 'SSC-26 · SGSC',     c: '#3B82F6' },
              { icon: faCalendar,      text: `Age ${age} · Muslim`, c: '#F59E0B' },
              { icon: faRocket,        text: 'Goal: CSE Engineer', c: '#8B5CF6' },
            ].map(({ icon, text, c }) => (
              <span key={text} className="abh-pill">
                <FontAwesomeIcon icon={icon} style={{ color: c }} />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="abh-cta">
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

        {/* RIGHT — image */}
        <motion.div className="abh-right"
          initial={{ opacity: 0, x: 24, scale: .96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: .75, ease: [.16, 1, .3, 1], delay: .15 }}>
          <div className="abh-imgbox">
            <div className="abh-imgglow" />
            <div className="abh-imgframe">
              <img
                src="/hero-back.webp"
                alt="Muhtasim Rahman"
                className="abh-img"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .abh-hero {
          position: relative;
          min-height: 100dvh;
          display: flex; align-items: center;
          overflow: hidden;
          background: var(--bg-page);
        }
        .abh-tex {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(59,130,246,.05) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%);
        }
        .abh-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .abh-orb1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,.13) 0%, transparent 70%);
          top: -100px; left: -120px;
        }
        .abh-orb2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%);
          bottom: 0; right: 5%;
        }
        .abh-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          pointer-events: none; z-index: 2;
          background: linear-gradient(to top, var(--bg-page) 0%, rgba(2,6,23,.4) 30%, transparent 100%);
        }
        [data-theme=light] .abh-grad {
          background: linear-gradient(to top, var(--bg-page) 0%, rgba(240,244,248,.5) 30%, transparent 100%);
        }

        /* ── Inner grid ──── */
        .abh-inner {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          width: 100%; max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          /* FIXED: reduced extra top padding from clamp(3rem,8vh,5rem) → clamp(1rem,2.5vh,2rem) */
          padding-top: calc(var(--navbar-h) + clamp(1rem, 2.5vh, 2rem));
          padding-bottom: clamp(2rem, 5vh, 3.5rem);
          min-height: 100dvh;
        }

        /* Left */
        .abh-left { display: flex; flex-direction: column; gap: 1.1rem; }
        .abh-bc {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .72rem; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .abh-bc-link { color: var(--text-tertiary); text-decoration: none; transition: color .15s; }
        .abh-bc-link:hover { color: var(--accent-primary); }
        .abh-bc-sep { font-size: .5rem; opacity: .5; }
        .abh-bc-cur { color: var(--text-secondary); }
        .abh-eyebrow {
          font-size: .78rem; font-weight: 500; color: var(--accent-primary);
          font-family: var(--font-mono); letter-spacing: .04em; margin-bottom: -.2rem;
        }
        .abh-name {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.05; letter-spacing: -.03em; color: var(--text-primary);
        }
        .abh-nick {
          display: block; font-size: .32em; font-weight: 600;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .05em; margin-top: .3em;
        }
        .abh-role { font-size: clamp(.85rem, 1.3vw, 1rem); color: var(--text-secondary); font-weight: 500; }
        .abh-bio {
          font-size: clamp(.82rem, 1vw, .9rem); color: var(--text-secondary);
          line-height: 1.75; max-width: 460px;
        }
        .abh-facts { display: flex; flex-wrap: wrap; gap: .5rem; }
        .abh-pill {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .3rem .75rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .75rem; color: var(--text-secondary); font-family: var(--font-mono);
        }
        .abh-cta { display: flex; flex-wrap: wrap; gap: .65rem; }
        .abh-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
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
          padding: .62rem 1.4rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .85rem; text-decoration: none;
          border: 2px solid var(--border-strong); transition: all .2s ease;
        }
        .abh-btn-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* Right image */
        .abh-right {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: flex-end;
        }
        .abh-imgbox {
          position: relative;
          width: clamp(280px, 36vw, 480px);
          height: clamp(340px, 44vw, 580px);
          flex-shrink: 0;
        }
        .abh-imgglow {
          position: absolute; inset: 8% 10%; z-index: 0; border-radius: 24px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.2) 0%, transparent 70%);
          filter: blur(28px); pointer-events: none;
        }
        [data-theme=light] .abh-imgglow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        .abh-imgframe {
          position: relative; z-index: 1;
          width: 100%; height: 100%; overflow: hidden;
        }
        .abh-imgframe::after {
          content: ''; position: absolute; z-index: 2; pointer-events: none;
          bottom: -5px; left: -1px; right: -1px; height: calc(38% + 5px);
          background: linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 6%, rgba(2,6,23,.7) 32%, transparent 100%);
        }
        [data-theme=light] .abh-imgframe::after {
          background: linear-gradient(to top, var(--bg-page) 0%, var(--bg-page) 5%, rgba(240,244,248,.8) 30%, transparent 100%);
        }
        .abh-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .abh-inner {
            grid-template-columns: 1fr;
            text-align: center;
            align-items: start;
            padding-top: calc(var(--navbar-h) + 1.5rem);
            padding-bottom: 2.5rem;
            min-height: unset;
            gap: 1.75rem;
          }
          .abh-left  { align-items: center; order: 2; }
          .abh-right { order: 1; justify-content: center; }
          .abh-bio   { max-width: 70%; }
          .abh-facts, .abh-cta { justify-content: center; }
          .abh-imgbox { width: clamp(200px, 55vw, 300px); height: clamp(220px, 60vw, 320px); }
          .abh-imgframe { border-radius: 0; }
          .abh-imgframe::after { height: 50%; }
          .abh-imgframe::before {
            content: ''; position: absolute; z-index: 2; pointer-events: none;
            top: 0; bottom: 0; left: -2px; width: 30%;
            background: linear-gradient(to right, var(--bg-page) 0%, transparent 100%);
          }
        }
        @media (max-width: 480px) {
          .abh-imgbox { width: clamp(160px, 65vw, 240px); height: clamp(180px, 70vw, 270px); }
          .abh-name { font-size: clamp(1.9rem, 9vw, 2.5rem); }
          .abh-bio { max-width: 100%; }
        }
      `}</style>
    </section>
  )
}
