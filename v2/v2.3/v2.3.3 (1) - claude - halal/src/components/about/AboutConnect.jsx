// ============================================================
// AboutConnect.jsx — v2.3.3
// CHANGES:
//   * Custom SVG icons from /icons/social/ used instead of
//     Font Awesome brand icons — files renamed for clarity
//   * Grid layout improved: 2→3→4→5 columns responsive
//   * Card hover improved — lift + border glow
//   * Dedicated email card styled differently at bottom
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

// SVG icon helper — renders from /icons/social/
function SvgIcon({ name, alt, size = 20 }) {
  return (
    <img
      src={`/icons/social/${name}.svg`}
      alt={alt}
      width={size}
      height={size}
      className="abc-svg-icon"
      loading="lazy"
      draggable={false}
    />
  )
}

const SOCIALS = [
  {
    svgIcon: 'github',      label: 'GitHub',
    handle: 'muhtasim-rahman',       url: SITE_CONFIG.social.github,
    color: '#94A3B8', desc: 'Code & Repos',
  },
  {
    svgIcon: 'linkedin',    label: 'LinkedIn',
    handle: 'mdturzo999',            url: SITE_CONFIG.social.linkedin,
    color: '#0A66C2', desc: 'Professional',
  },
  {
    svgIcon: 'youtube',     label: 'YouTube',
    handle: '@mdturzo999',           url: SITE_CONFIG.social.youtube,
    color: '#FF0000', desc: 'Videos',
  },
  {
    svgIcon: 'facebook',    label: 'Facebook',
    handle: 'mdturzo999',            url: SITE_CONFIG.social.facebook,
    color: '#1877F2', desc: 'Social',
  },
  {
    svgIcon: 'instagram',   label: 'Instagram',
    handle: '@mdturzo999',           url: SITE_CONFIG.social.instagram,
    color: '#E1306C', desc: 'Photos',
  },
  {
    svgIcon: 'x-twitter',   label: 'X / Twitter',
    handle: '@mdturzo999',           url: SITE_CONFIG.social.twitter,
    color: '#94A3B8', desc: 'Updates',
  },
  {
    svgIcon: 'telegram',    label: 'Telegram',
    handle: '@mdturzo16',            url: SITE_CONFIG.social.telegram,
    color: '#26A5E4', desc: 'Messaging',
  },
  {
    svgIcon: 'tiktok',      label: 'TikTok',
    handle: '@mdturzo16',            url: SITE_CONFIG.social.tiktok,
    color: '#EE1D52', desc: 'Short Videos',
  },
  {
    svgIcon: 'threads',     label: 'Threads',
    handle: '@mdturzo999',           url: SITE_CONFIG.social.threads,
    color: '#64748B', desc: 'Threads',
  },
]

export default function AboutConnect() {
  return (
    <section className="section section-alt" id="about-connect">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="abc-label">Connect</p>
          <h2 className="abc-h2">
            Find Me <span className="abc-accent">Online</span>
          </h2>
          <p className="abc-sub">
            All my social profiles and contact in one place — reach out anytime.
          </p>
        </motion.div>

        {/* Social grid */}
        <div className="abc-grid">
          {SOCIALS.map(({ svgIcon, label, handle, url, color, desc }, i) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="abc-card card"
              style={{ '--soc': color }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .4, delay: i * .045 }}>

              {/* Left color bar */}
              <div className="abc-bar" style={{ background: color }} />

              {/* Icon */}
              <div className="abc-icon-wrap" style={{ background: `${color}14` }}>
                <SvgIcon name={svgIcon} alt={label} size={18} />
              </div>

              {/* Info */}
              <div className="abc-info">
                <span className="abc-name">{label}</span>
                <span className="abc-handle">{handle}</span>
              </div>

              {/* Arrow */}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="abc-arrow" />
            </motion.a>
          ))}
        </div>

        {/* Email — full-width featured card */}
        <motion.a
          href={`mailto:${SITE_CONFIG.owner.email}`}
          className="abc-email-card card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .4, delay: .5 }}>
          <div className="abc-email-icon">
            <SvgIcon name="email" alt="Email" size={22} />
          </div>
          <div className="abc-email-body">
            <p className="abc-email-label">Email</p>
            <p className="abc-email-addr">{SITE_CONFIG.owner.email}</p>
          </div>
          <div className="abc-email-cta">
            Send a message
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: '.7rem' }} />
          </div>
        </motion.a>
      </div>

      <style>{`
        .abc-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem; display: block;
        }
        .abc-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abc-accent { color: var(--accent-primary); }
        .abc-sub {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 480px; line-height: 1.7; margin-bottom: 2.25rem;
        }

        /* Grid */
        .abc-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: .75rem; margin-bottom: .75rem;
        }
        @media (min-width: 480px)  { .abc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px)  { .abc-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .abc-grid { grid-template-columns: repeat(5, 1fr); } }

        /* Card */
        .abc-card {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem;
          text-decoration: none;
          position: relative; overflow: hidden;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .abc-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0,0,0,.1);
          border-color: var(--soc, var(--accent-primary));
        }
        [data-theme=light] .abc-card:hover {
          box-shadow: 0 4px 18px rgba(0,0,0,.07);
        }
        .abc-card:active { transform: scale(.97); }
        .abc-card:hover .abc-bar { width: 4px; }
        .abc-card:hover .abc-arrow { opacity: 1; transform: translate(2px, -2px); color: var(--soc); }

        /* Left bar */
        .abc-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 0 2px 2px 0;
          transition: width .18s ease;
        }

        /* SVG icon wrap */
        .abc-icon-wrap {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background .2s ease;
        }
        .abc-svg-icon {
          display: block; user-select: none;
        }
        /* In dark mode, make icons that are originally dark visible */
        [data-theme=dark] .abc-icon-wrap { background: rgba(255,255,255,.08) !important; }
        .abc-card:hover .abc-icon-wrap {
          background: color-mix(in srgb, var(--soc, #3B82F6) 18%, transparent) !important;
        }

        /* Info */
        .abc-info {
          display: flex; flex-direction: column; gap: .08rem;
          min-width: 0; flex: 1;
        }
        .abc-name {
          font-size: .82rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-handle {
          font-size: .68rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Arrow */
        .abc-arrow {
          margin-left: auto; font-size: .62rem;
          color: var(--text-tertiary); opacity: .35; flex-shrink: 0;
          transition: all .18s ease;
        }

        /* Email featured card */
        .abc-email-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.4rem; text-decoration: none;
          background: linear-gradient(135deg, rgba(59,130,246,.06), rgba(99,102,241,.03)) !important;
          border-color: rgba(59,130,246,.2) !important;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .abc-email-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(59,130,246,.12);
          border-color: rgba(59,130,246,.35) !important;
        }
        .abc-email-icon {
          width: 42px; height: 42px; border-radius: var(--radius-lg);
          background: rgba(59,130,246,.1); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        [data-theme=dark] .abc-email-icon { background: rgba(255,255,255,.08); }
        .abc-email-body { flex: 1; min-width: 0; }
        .abc-email-label {
          font-size: .72rem; font-weight: 600; color: var(--accent-primary);
          font-family: var(--font-mono); text-transform: uppercase;
          letter-spacing: .06em; margin-bottom: .15rem;
        }
        .abc-email-addr {
          font-size: .88rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-email-cta {
          display: inline-flex; align-items: center; gap: .38rem;
          font-size: .76rem; font-weight: 600; color: var(--accent-primary);
          padding: .4rem .85rem; border-radius: var(--radius-md);
          border: 1px solid rgba(59,130,246,.3);
          background: rgba(59,130,246,.06);
          white-space: nowrap; transition: all .18s ease;
          flex-shrink: 0;
        }
        .abc-email-card:hover .abc-email-cta {
          background: var(--accent-primary); color: #fff;
          border-color: var(--accent-primary);
        }

        /* Mobile */
        @media (max-width: 479px) {
          .abc-handle { display: none; }
          .abc-card { padding: .75rem .85rem; }
          .abc-email-cta { display: none; }
        }
      `}</style>
    </section>
  )
}
