// ============================================================
// AboutHero.jsx — v2.3.5
// CHANGES:
//   * Breadcrumb bar fully removed — padding-top now just navbar-h
//   * Full-section bottom-to-top gradient (same style as home Hero)
//   * hero-back.webp keeps same home gradient treatment
//   * Left content minimal, clean, responsive
//   * Unique 2-col layout: editorial left + tall right image panel
// ============================================================

import { motion }         from 'framer-motion'
import { Link }           from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot, faGraduationCap, faMosque, faCode,
  faHandshake, faDownload, faGlobe, faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { calculateAge }    from '../../config/site.config.js'
import { useSiteSettings } from '../../hooks/useSiteSettings.js'

// Inlined from the now-removed aboutData.js (v2.3.6) -- this is the
// only About component besides AboutValues/AboutGoals that used these.
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })

const FACTS = [
  { icon: faLocationDot,   label: 'Location',   value: 'Nilphamari, BD',  c: '#10B981' },
  { icon: faGraduationCap, label: 'Education',  value: 'SSC-26 · SGSC',   c: '#3B82F6' },
  { icon: faMosque,        label: 'Faith',      value: 'Muslim',           c: '#F59E0B' },
  { icon: faCode,          label: 'Craft',      value: 'Web Developer',    c: '#8B5CF6' },
]

// Subtle dot-matrix background particles
const DOTS = Array.from({ length: 36 }, (_, i) => ({
  key: i,
  style: {
    left: `${(3 + Math.random() * 94).toFixed(1)}%`,
    top: `${(Math.random() * 92).toFixed(1)}%`,
    '--dur': `${(3 + Math.random() * 6).toFixed(1)}s`,
    '--del': `${(Math.random() * 8).toFixed(1)}s`,
    '--op': (0.04 + Math.random() * 0.14).toFixed(2),
    width: Math.random() < 0.7 ? '1px' : '2px',
    height: Math.random() < 0.7 ? '1px' : '2px',
  },
}))

export default function AboutHero({ settings }) {
  const { settings: hookSettings } = useSiteSettings()
  const cfg = settings ?? hookSettings
  const age = calculateAge()

  const cvEnabled = cfg?.cvEnabled && cfg?.cvUrl

  return (
    <section className="abh-section" id="about-hero" aria-label="About Hero">
      {/* Dot stars */}
      <div className="abh-stars" aria-hidden="true">
        {DOTS.map(d => <span key={d.key} className="abh-star" style={d.style} />)}
      </div>

      {/* Orbs */}
      <div className="abh-orb abh-orb1" aria-hidden="true" />
      <div className="abh-orb abh-orb2" aria-hidden="true" />

      {/* Full-section bottom-to-top gradient — same as home hero */}
      <div className="abh-grad" aria-hidden="true" />

      <div className="abh-inner">
        {/* ── LEFT COLUMN ── */}
        <motion.div className="abh-left"
          initial="hidden" animate="show" variants={stagger(.09)}>


          {/* Name + role */}
          <motion.div variants={fadeUp} className="abh-name-block">
            <p className="abh-eyebrow">Getting to know me</p>
            <h1 className="abh-h1">
              Muhtasim
              <span className="abh-surname">
                Rahman
                <span className="abh-nick-tag">Turzo</span>
              </span>
            </h1>
            <div className="abh-role-row">
              <span className="abh-role-dot" />
              <span className="abh-role-text">Web Developer &amp; Designer</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="abh-bio">
            A {age}-year-old self-taught developer from Bangladesh — building clean,
            purposeful digital experiences guided by Islamic &amp; ethical principles.
          </motion.p>

          {/* Facts grid */}
          <motion.div variants={fadeUp} className="abh-facts">
            {FACTS.map(({ icon, label, value, c }) => (
              <div key={label} className="abh-fact" style={{ '--fc': c }}>
                <span className="abh-fact-icon">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <div className="abh-fact-body">
                  <span className="abh-fact-lbl">{label}</span>
                  <span className="abh-fact-val">{value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="abh-ctas">
            <Link to="/contact" className="abh-btn-primary">
              <FontAwesomeIcon icon={faHandshake} />
              Get in Touch
            </Link>
            {cvEnabled ? (
              <a href={cfg.cvUrl} download className="abh-btn-secondary">
                <FontAwesomeIcon icon={faDownload} />
                CV
              </a>
            ) : (
              <Link to="/projects" className="abh-btn-secondary">
                <FontAwesomeIcon icon={faGlobe} />
                View Projects
              </Link>
            )}
          </motion.div>

          {/* Scroll hint */}
          <motion.div variants={fadeUp} className="abh-scroll-hint">
            <span className="abh-scroll-line" />
            <FontAwesomeIcon icon={faArrowDown} className="abh-scroll-icon" />
            <span className="abh-scroll-text">Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — image ── */}
        <motion.div className="abh-right"
          initial={{ opacity: 0, x: 28, scale: .96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: .78, ease: [.16, 1, .3, 1], delay: .18 }}>

          <div className="abh-img-wrap">
            <div className="abh-img-glow" />
            <img
              src="/hero-back.webp"
              alt="Muhtasim Rahman"
              className="abh-img"
              loading="eager"
              fetchPriority="high"
            />
            {/* Same bottom-to-top fade as home hero image */}
            <div className="abh-img-fade" />
          </div>
        </motion.div>
      </div>

      <style>{`
        /* -- Section ---------------------------------------- */
        .abh-section {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-page);
          /* breadcrumb bar removed — pad only for navbar */
          padding-top: var(--navbar-h);
        }

        /* -- Dot stars -------------------------------------- */
        .abh-stars { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .abh-star {
          position: absolute; border-radius: 50%;
          background: rgba(147,197,253,.6);
          opacity: var(--op);
          animation: abh-twinkle var(--dur) ease-in-out var(--del) infinite alternate;
        }
        [data-theme=light] .abh-star { background: rgba(37,99,235,.4); }
        @keyframes abh-twinkle {
          from { opacity: calc(var(--op) * .3); }
          to   { opacity: var(--op); }
        }

        /* -- Orbs ------------------------------------------- */
        .abh-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .abh-orb1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(37,99,235,.16) 0%, transparent 70%);
          top: -120px; left: -100px;
        }
        .abh-orb2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%);
          bottom: 40px; right: 4%;
        }
        [data-theme=light] .abh-orb1 {
          background: radial-gradient(circle, rgba(37,99,235,.06) 0%, transparent 70%);
        }
        [data-theme=light] .abh-orb2 {
          background: radial-gradient(circle, rgba(99,102,241,.04) 0%, transparent 70%);
        }

        /* -- Full-section gradient (same as home) ----------- */
        .abh-grad {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 48%; z-index: 2; pointer-events: none;
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 4%,
            rgba(2,6,23,.62) 30%,
            transparent 100%
          );
        }
        [data-theme=light] .abh-grad {
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 4%,
            rgba(240,244,248,.72) 30%,
            transparent 100%
          );
        }

        /* -- Inner grid ------------------------------------- */
        .abh-inner {
          position: relative; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4.5rem);
          align-items: center;
          width: 100%; max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          padding-top: clamp(.25rem, 1.5vh, 1.5rem);
          padding-bottom: clamp(2.5rem, 6vh, 5rem);
          min-height: calc(100dvh - var(--navbar-h));
        }

        /* -- LEFT ------------------------------------------- */
        .abh-left {
          display: flex; flex-direction: column; gap: 1.4rem;
          position: relative; z-index: 6;
        }

        /* Chapter badge */
        .abh-chapter {
          display: inline-flex; align-items: center; gap: .3rem;
          font-family: var(--font-mono); font-size: .72rem; font-weight: 700;
          color: var(--text-tertiary);
        }
        .abh-ch-num  { color: var(--accent-primary); }
        .abh-ch-slash { opacity: .4; }
        .abh-ch-lbl  { letter-spacing: .06em; text-transform: uppercase; font-size: .68rem; }

        /* Name block */
        .abh-name-block { display: flex; flex-direction: column; gap: .45rem; }
        .abh-eyebrow {
          font-size: .78rem; font-weight: 500;
          color: var(--accent-primary); font-family: var(--font-mono);
          letter-spacing: .04em;
        }
        .abh-h1 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.2rem, 4.8vw, 3.8rem);
          line-height: 1.06; letter-spacing: -.03em;
          color: var(--text-primary);
          display: flex; flex-direction: column;
        }
        .abh-surname {
          display: flex; align-items: baseline; gap: .4em; flex-wrap: wrap;
        }
        .abh-nick-tag {
          font-size: .27em; font-weight: 700;
          background: var(--accent-primary); color: #fff;
          font-family: var(--font-mono); letter-spacing: .07em;
          padding: .18em .55em; border-radius: var(--radius-sm);
          vertical-align: middle;
          position: relative; top: -2px; left: -3px;
        }
        .abh-role-row {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .32rem .8rem; border-radius: var(--radius-full);
          background: var(--bg-surface); border: 1px solid var(--border-color);
          width: fit-content; font-size: .85rem; font-weight: 600;
          color: var(--text-secondary);
        }
        .abh-role-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981; flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(16,185,129,.22);
          animation: abh-pulse 2.2s ease-in-out infinite;
        }
        @keyframes abh-pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,.22); }
          50%      { box-shadow: 0 0 0 7px rgba(16,185,129,.07); }
        }
        .abh-role-text { font-size: .84rem; }

        /* Bio */
        .abh-bio {
          font-size: clamp(.82rem, 1vw, .9rem);
          color: var(--text-secondary); line-height: 1.8;
          max-width: 440px;
        }

        /* Facts 2×2 */
        .abh-facts {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .55rem; max-width: 380px;
        }
        .abh-fact {
          display: flex; align-items: center; gap: .55rem;
          padding: .45rem .75rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: border-color .18s;
        }
        .abh-fact:hover { border-color: var(--fc, var(--accent-primary)); }
        .abh-fact-icon {
          width: 24px; height: 24px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--fc, #3B82F6) 14%, transparent);
          color: var(--fc, var(--accent-primary));
          font-size: .62rem; flex-shrink: 0;
        }
        .abh-fact-body { display: flex; flex-direction: column; gap: .05rem; min-width: 0; }
        .abh-fact-lbl  { font-size: .6rem; color: var(--text-tertiary); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .04em; text-align: left;}
        .abh-fact-val  { font-size: .75rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* CTAs */
        .abh-ctas { display: flex; flex-wrap: wrap; gap: .6rem; }
        .abh-btn-primary {
          display: inline-flex; align-items: center; gap: .48rem;
          padding: .6rem 1.35rem; border-radius: var(--radius-lg);
          background: var(--accent-primary); color: #fff;
          font-weight: 700; font-size: .84rem; text-decoration: none;
          border: 2px solid var(--accent-primary);
          transition: all .2s ease; box-shadow: 0 3px 14px rgba(37,99,235,.3);
        }
        .abh-btn-primary:hover {
          background: var(--accent-hover); border-color: var(--accent-hover);
          transform: translateY(-1px); box-shadow: 0 6px 22px rgba(37,99,235,.38);
        }
        .abh-btn-secondary {
          display: inline-flex; align-items: center; gap: .48rem;
          padding: .6rem 1.35rem; border-radius: var(--radius-lg);
          background: transparent; color: var(--text-primary);
          font-weight: 600; font-size: .84rem; text-decoration: none;
          border: 2px solid var(--border-strong);
          transition: all .2s ease;
        }
        .abh-btn-secondary:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
          background: var(--accent-light); transform: translateY(-1px);
        }

        /* Scroll hint */
        .abh-scroll-hint {
          display: flex; align-items: center; gap: .55rem;
          padding-top: .1rem;
        }
        .abh-scroll-line {
          width: 28px; height: 1px;
          background: var(--border-strong);
        }
        .abh-scroll-icon {
          font-size: .65rem; color: var(--text-tertiary);
          animation: abh-bounce 2s ease-in-out infinite;
        }
        @keyframes abh-bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(3px); }
        }
        .abh-scroll-text {
          font-size: .68rem; color: var(--text-tertiary);
          font-family: var(--font-mono); letter-spacing: .04em;
        }

        /* -- RIGHT ------------------------------------------ */
        .abh-right {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: flex-end;
        }
        .abh-img-wrap {
          position: relative;
          width: clamp(260px, 34vw, 460px);
          height: clamp(370px, 46vw, 620px);
          flex-shrink: 0;
        }
        .abh-img-glow {
          position: absolute; inset: 8% 10%; z-index: 0; border-radius: 20px;
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.22) 0%, transparent 70%);
          filter: blur(30px); pointer-events: none;
        }
        [data-theme=light] .abh-img-glow {
          background: radial-gradient(ellipse at 50% 40%, rgba(37,99,235,.08) 0%, transparent 70%);
        }
        .abh-img {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
        }
        /* Same bottom fade gradient as home hero image */
        .abh-img-fade {
          position: absolute; bottom: -2px; left: 0; right: 0; z-index: 2;
          height: 45%;
          background: linear-gradient(to top,
            var(--bg-page) 0%,
            var(--bg-page) 5%,
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
        [data-theme=dark] .abh-img {
          filter: drop-shadow(0 8px 32px rgba(0,0,0,.38));
        }

        /* age badge removed */

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 900px) {
          .abh-inner {
            grid-template-columns: 1fr;
            text-align: center;
            align-items: start;
            padding-top: .5rem;
            padding-bottom: 2.5rem;
            min-height: unset;
            gap: 2rem;
          }
          .abh-left  { align-items: center; order: 2; }
          .abh-right { order: 1; justify-content: center; }
          .abh-bio   { max-width: 70%; }
          .abh-facts { margin-inline: auto; max-width: 360px; }
          .abh-ctas, .abh-scroll-hint { justify-content: center; }
          .abh-img-wrap {
            width: clamp(200px, 55vw, 300px);
            height: clamp(230px, 62vw, 340px);
          }
          .abh-img   { border-radius: 0; }
        }
        @media (max-width: 480px) {
          .abh-img-wrap { width: clamp(180px, 70vw, 260px); height: clamp(210px, 76vw, 300px); }
          .abh-h1  { font-size: clamp(1.9rem, 9.5vw, 2.5rem); }
          .abh-facts { grid-template-columns: 1fr 1fr; max-width: 100%; }
        }
      `}</style>
    </section>
  )
}
