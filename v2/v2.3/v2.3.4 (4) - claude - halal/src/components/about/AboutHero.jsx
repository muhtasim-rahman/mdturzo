// ============================================================
// AboutHero.jsx — v2.3.4
// CHANGES:
//   * Navbar transparent (Navbar.jsx isHomePage includes '/about')
//   * Fixed breadcrumb bar: always below navbar, full-width, 36px tall
//   * Hero padding-top accounts for navbar (68px) + bar (36px)
//   * hero-back.webp: full-section gradient, no rounded frame at any size
//   * Left content fully redesigned: fresh editorial layout, diff from home
//   * Inline breadcrumb nav removed (replaced by fixed bar)
// ============================================================

import { Link }           from 'react-router-dom'
import { motion }         from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faMosque, faCode,
  faHandshake, faDownload, faGlobe, faChevronRight,
  faCalendar, faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { fadeUp, stagger } from './aboutData.js'
import { SITE_CONFIG, calculateAge } from '../../config/site.config.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

const CHIPS = [
  { icon: faLocationDot,   label: 'Nilphamari, BD',  color: '#10B981' },
  { icon: faMosque,        label: 'Muslim',           color: '#F59E0B' },
  { icon: faGraduationCap, label: 'SSC-26 · SGSC',   color: '#3B82F6' },
  { icon: faCode,          label: 'Web Developer',    color: '#8B5CF6' },
]

const STATS = [
  { val: '3+',  sub: 'Yrs Dev'     },
  { val: '6+',  sub: 'Yrs Design'  },
  { val: '16+', sub: 'Projects'    },
]

export default function AboutHero() {
  const { settings } = useSiteSettings()
  const age = calculateAge()
  const cvEnabled = settings?.cvEnabled && settings?.cvUrl

  return (
    <>
      {/* ── Fixed breadcrumb bar — always below navbar ── */}
      <div className="ab-page-bar" aria-label="Breadcrumb">
        <nav className="ab-page-bar-inner">
          <Link to="/" className="ab-pbc-link">Home</Link>
          <FontAwesomeIcon icon={faChevronRight} className="ab-pbc-sep" />
          <span className="ab-pbc-cur">About</span>
        </nav>
      </div>

      {/* ── Hero section ── */}
      <section className="ab-hero" id="about-hero" aria-label="About Hero">
        {/* Background texture */}
        <div className="ab-hero-tex" aria-hidden="true" />
        <div className="ab-orb ab-orb-1" aria-hidden="true" />
        <div className="ab-orb ab-orb-2" aria-hidden="true" />

        {/* Full-section bottom gradient */}
        <div className="ab-hero-grad" aria-hidden="true" />

        <div className="ab-hero-inner">

          {/* ── LEFT content ── */}
          <motion.div className="ab-hero-left"
            initial="hidden" animate="show" variants={stagger(.1)}>

            {/* Chapter label */}
            <motion.div variants={fadeUp} className="ab-chapter">
              <span className="ab-chapter-num">01</span>
              <span className="ab-chapter-slash">/</span>
              <span className="ab-chapter-txt">About Me</span>
            </motion.div>

            {/* Name block */}
            <motion.div variants={fadeUp} className="ab-name-block">
              <h1 className="ab-h1">
                Muhtasim
                <span className="ab-h1-line2">
                  Rahman
                  <span className="ab-nick-badge">Turzo</span>
                </span>
              </h1>
              <div className="ab-role-row">
                <span className="ab-role-dot" />
                <span className="ab-role-txt">Student &amp; Web Developer</span>
                <span className="ab-role-age">Age {age}</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p variants={fadeUp} className="ab-bio">
              Self-taught developer from Bangladesh, building clean digital
              experiences guided by curiosity and Islamic principles.
            </motion.p>

            {/* Chips */}
            <motion.div variants={fadeUp} className="ab-chips">
              {CHIPS.map(({ icon, label, color }) => (
                <span key={label} className="ab-chip">
                  <span className="ab-chip-icon" style={{ background: `${color}1a`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </span>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={fadeUp} className="ab-stats-strip">
              {STATS.map(({ val, sub }) => (
                <div key={sub} className="ab-stat-item">
                  <span className="ab-stat-val">{val}</span>
                  <span className="ab-stat-sub">{sub}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="ab-hero-ctas">
              <Link to="/contact" className="ab-cta-primary">
                <FontAwesomeIcon icon={faHandshake} />
                Get in Touch
              </Link>
              {cvEnabled ? (
                <a href={settings.cvUrl} download className="ab-cta-ghost">
                  <FontAwesomeIcon icon={faDownload} />
                  Download CV
                </a>
              ) : (
                <Link to="/projects" className="ab-cta-ghost">
                  <FontAwesomeIcon icon={faGlobe} />
                  View Projects
                </Link>
              )}
            </motion.div>

          </motion.div>

          {/* ── RIGHT image ── */}
          <motion.div className="ab-hero-right"
            initial={{ opacity: 0, x: 28, scale: .97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: .7, ease: [.16, 1, .3, 1], delay: .18 }}>
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
      </section>

      <style>{`
        /* ── Fixed breadcrumb bar ── */
        .ab-page-bar {
          position: fixed;
          top: var(--navbar-h);
          left: 0; right: 0;
          height: 36px;
          z-index: 49;
          background: color-mix(in srgb, var(--bg-page) 82%, transparent);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          border-bottom: 1px solid var(--border-color);
        }
        .ab-page-bar-inner {
          display: flex; align-items: center; gap: .45rem;
          height: 100%;
          max-width: 1120px; margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          font-size: .72rem; font-family: var(--font-mono);
        }
        .ab-pbc-link {
          color: var(--text-tertiary); text-decoration: none;
          transition: color .15s;
        }
        .ab-pbc-link:hover { color: var(--accent-primary); }
        .ab-pbc-sep { font-size: .5rem; color: var(--text-tertiary); opacity: .5; }
        .ab-pbc-cur { color: var(--text-secondary); font-weight: 500; }
        [data-theme=light] .ab-page-bar {
          background: color-mix(in srgb, var(--bg-page) 88%, transparent);
        }

        /* ── Hero ── */
        .ab-hero {
          position: relative; overflow: hidden;
          min-height: calc(100dvh - var(--navbar-h) - 36px);
          display: flex; align-items: center;
          background: var(--bg-page);
        }

        /* Texture */
        .ab-hero-tex {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(rgba(59,130,246,.045) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.03) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%);
        }
        [data-theme=light] .ab-hero-tex {
          background-image:
            radial-gradient(rgba(37,99,235,.05) 1px, transparent 1px),
            radial-gradient(rgba(99,102,241,.035) 1px, transparent 1px);
        }

        /* Orbs */
        .ab-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .ab-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,.12) 0%, transparent 70%);
          top: -80px; left: -100px;
        }
        .ab-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%);
          bottom: 0; right: 4%;
        }
        [data-theme=light] .ab-orb-1 {
          background: radial-gradient(circle, rgba(37,99,235,.04) 0%, transparent 70%);
        }

        /* Full-section gradient */
        .ab-hero-grad {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 45%; pointer-events: none; z-index: 2;
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 4%,
            rgba(2,6,23,.50) 32%,
            transparent 100%
          );
        }
        [data-theme=light] .ab-hero-grad {
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 4%,
            rgba(240,244,248,.55) 32%,
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
          padding-top: clamp(1.5rem, 3vh, 2.5rem);
          padding-bottom: clamp(2.5rem, 5vh, 4rem);
          min-height: calc(100dvh - var(--navbar-h) - 36px);
        }

        /* LEFT */
        .ab-hero-left {
          display: flex; flex-direction: column; gap: 1.15rem;
          position: relative; z-index: 6;
        }

        /* Chapter label */
        .ab-chapter {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .7rem; font-family: var(--font-mono);
          color: var(--text-tertiary);
        }
        .ab-chapter-num {
          font-weight: 700; color: var(--accent-primary);
          font-size: .78rem;
        }
        .ab-chapter-slash { opacity: .4; }
        .ab-chapter-txt { text-transform: uppercase; letter-spacing: .08em; }

        /* Name block */
        .ab-name-block { display: flex; flex-direction: column; gap: .5rem; }
        .ab-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          line-height: 1.06; letter-spacing: -.03em;
          color: var(--text-primary);
          display: flex; flex-direction: column;
        }
        .ab-h1-line2 {
          display: inline-flex; align-items: baseline;
          gap: .4em; flex-wrap: wrap;
        }
        .ab-nick-badge {
          font-size: .25em; font-weight: 600;
          color: var(--bg-surface); background: var(--accent-primary);
          font-family: var(--font-mono); letter-spacing: .06em;
          padding: .16em .55em; border-radius: var(--radius-sm);
          vertical-align: middle;
        }
        .ab-role-row {
          display: inline-flex; align-items: center; gap: .55rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          padding: .32rem .85rem; border-radius: var(--radius-full);
          width: fit-content; font-size: .85rem;
        }
        .ab-role-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981; flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(16,185,129,.2);
          animation: ab-pulse 2s ease-in-out infinite;
        }
        @keyframes ab-pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,.2); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,.06); }
        }
        .ab-role-txt { font-weight: 600; color: var(--text-secondary); }
        .ab-role-age {
          margin-left: .2rem;
          font-size: .7rem; font-family: var(--font-mono);
          color: var(--accent-primary); font-weight: 700;
          padding: .1rem .4rem; border-radius: var(--radius-full);
          background: var(--accent-light); border: 1px solid rgba(37,99,235,.2);
        }

        /* Bio */
        .ab-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.78;
          max-width: 440px;
        }

        /* Chips */
        .ab-chips { display: flex; flex-wrap: wrap; gap: .45rem; }
        .ab-chip {
          display: inline-flex; align-items: center; gap: .42rem;
          padding: .35rem .7rem; border-radius: var(--radius-md);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          font-size: .73rem; color: var(--text-secondary);
          font-family: var(--font-mono); transition: border-color .18s;
        }
        .ab-chip:hover { border-color: var(--accent-primary); }
        .ab-chip-icon {
          width: 20px; height: 20px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: .56rem; flex-shrink: 0;
        }

        /* Stats strip */
        .ab-stats-strip {
          display: flex; align-items: center; gap: 1.2rem;
          padding: .8rem 1.1rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          width: fit-content;
        }
        .ab-stat-item {
          display: flex; flex-direction: column; align-items: center;
          gap: .1rem; padding-right: 1.2rem;
          border-right: 1px solid var(--border-color);
        }
        .ab-stat-item:last-child { padding-right: 0; border-right: none; }
        .ab-stat-val {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.1rem; color: var(--accent-primary); line-height: 1;
        }
        .ab-stat-sub {
          font-size: .62rem; color: var(--text-tertiary);
          font-family: var(--font-mono); text-transform: uppercase;
          letter-spacing: .06em;
        }

        /* CTAs */
        .ab-hero-ctas { display: flex; flex-wrap: wrap; gap: .6rem; }
        .ab-cta-primary {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .58rem 1.3rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .84rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          box-shadow: 0 3px 14px rgba(37,99,235,.28);
          transition: all .2s ease;
        }
        .ab-cta-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.36);
        }
        .ab-cta-ghost {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .58rem 1.3rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .84rem; text-decoration: none;
          border: 2px solid var(--border-strong); transition: all .2s ease;
        }
        .ab-cta-ghost:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* RIGHT image */
        .ab-hero-right {
          position: relative; z-index: 5;
          display: flex; align-items: stretch; justify-content: flex-end;
          height: 100%;
        }
        .ab-img-wrap {
          position: relative;
          width: clamp(260px, 36vw, 480px);
          height: clamp(360px, 46vw, 620px);
          flex-shrink: 0;
        }
        .ab-img-glow {
          position: absolute; inset: 8% 10%; z-index: 0;
          border-radius: 20px;
          background: radial-gradient(ellipse at 50% 35%, rgba(37,99,235,.18) 0%, transparent 70%);
          filter: blur(30px); pointer-events: none;
        }
        [data-theme=light] .ab-img-glow {
          background: radial-gradient(ellipse at 50% 35%, rgba(37,99,235,.06) 0%, transparent 70%);
        }
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
        @media (max-width: 900px) {
          .ab-hero-inner {
            grid-template-columns: 1fr; text-align: center;
            align-items: start;
            padding-top: clamp(1rem, 2vh, 1.5rem);
            padding-bottom: 2.5rem;
            min-height: unset; gap: 2rem;
          }
          .ab-hero-left  { align-items: center; order: 2; }
          .ab-hero-right { order: 1; justify-content: center; }
          .ab-bio   { max-width: 72%; }
          .ab-chips { justify-content: center; }
          .ab-stats-strip { justify-content: center; }
          .ab-hero-ctas { justify-content: center; }
          .ab-name-block { align-items: center; }
          .ab-img-wrap {
            width: clamp(200px, 56vw, 310px);
            height: clamp(230px, 62vw, 340px);
          }
        }
        @media (max-width: 480px) {
          .ab-img-wrap { width: clamp(180px, 72vw, 270px); height: clamp(200px, 78vw, 300px); }
          .ab-h1 { font-size: clamp(2rem, 9.5vw, 2.5rem); }
          .ab-chips { gap: .35rem; }
          .ab-stats-strip { gap: .8rem; }
        }
      `}</style>
    </>
  )
}
