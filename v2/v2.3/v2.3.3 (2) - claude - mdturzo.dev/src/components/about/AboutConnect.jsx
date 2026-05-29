// ============================================================
// AboutConnect.jsx — v2.3.3
// Connect section — uses uploaded SVG icons.
// github, threads, x-twitter: FontAwesome (dark-mode safe).
// All others: local SVG from /icons/social/
// Improved layout & card design.
// ============================================================

import { motion }            from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faThreads, faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG }       from '../../config/site.config.js'

// Platforms using local SVG
const SVG_PLATFORMS = [
  { svgFile: 'linkedin',   label: 'LinkedIn',   handle: 'mdturzo999',      url: SITE_CONFIG.social.linkedin,  color: '#0A66C2' },
  { svgFile: 'youtube',    label: 'YouTube',    handle: '@mdturzo999',     url: SITE_CONFIG.social.youtube,   color: '#FF0000' },
  { svgFile: 'facebook',   label: 'Facebook',   handle: 'mdturzo999',      url: SITE_CONFIG.social.facebook,  color: '#1877F2' },
  { svgFile: 'instagram',  label: 'Instagram',  handle: '@mdturzo999',     url: SITE_CONFIG.social.instagram, color: '#E1306C' },
  { svgFile: 'telegram',   label: 'Telegram',   handle: '@mdturzo16',      url: SITE_CONFIG.social.telegram,  color: '#26A5E4' },
  { svgFile: 'tiktok',     label: 'TikTok',     handle: '@mdturzo16',      url: SITE_CONFIG.social.tiktok,    color: '#EE1D52' },
]

// Platforms using FontAwesome (dark-mode safe)
const FA_PLATFORMS = [
  { faIcon: faGithub,   label: 'GitHub',    handle: 'muhtasim-rahman', url: SITE_CONFIG.social.github,   color: '#6e7681', colorDark: '#94A3B8' },
  { faIcon: faThreads,  label: 'Threads',   handle: '@mdturzo999',     url: SITE_CONFIG.social.threads,  color: '#000000', colorDark: '#e4e4e7'  },
  { faIcon: faXTwitter, label: 'X / Twitter', handle: '@mdturzo999',   url: SITE_CONFIG.social.twitter,  color: '#000000', colorDark: '#e4e4e7'  },
  { faIcon: faEnvelope, label: 'Email',     handle: SITE_CONFIG.owner.email, url: `mailto:${SITE_CONFIG.owner.email}`, color: '#EA4335', colorDark: '#EA4335' },
]

function SvgCard({ svgFile, label, handle, url, color, index }) {
  return (
    <motion.a
      href={url} target="_blank" rel="noopener noreferrer"
      className="abc-card" style={{ '--soc': color }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .4, delay: index * .05 }}>
      <div className="abc-bar" style={{ background: color }} />
      <div className="abc-icon-wrap">
        <img
          src={`/icons/social/${svgFile}.svg`}
          alt={label}
          className="abc-svg-icon"
          loading="lazy"
          width="20" height="20"
        />
      </div>
      <div className="abc-info">
        <span className="abc-name">{label}</span>
        <span className="abc-handle">{handle}</span>
      </div>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="abc-arrow" />
    </motion.a>
  )
}

function FaCard({ faIcon, label, handle, url, color, colorDark, index }) {
  return (
    <motion.a
      href={url} target="_blank" rel="noopener noreferrer"
      className="abc-card abc-fa-card" style={{ '--soc': color, '--soc-dark': colorDark }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .4, delay: index * .05 }}>
      <div className="abc-bar" style={{ background: color }} />
      <div className="abc-icon-wrap">
        <FontAwesomeIcon icon={faIcon} className="abc-fa-icon" />
      </div>
      <div className="abc-info">
        <span className="abc-name">{label}</span>
        <span className="abc-handle">{handle}</span>
      </div>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="abc-arrow" />
    </motion.a>
  )
}

export default function AboutConnect() {
  // All cards: SVG first, then FA
  const allCards = [
    ...FA_PLATFORMS.slice(0, 1).map((p, i) => ({ type: 'fa', ...p, idx: i })),                         // GitHub first
    ...SVG_PLATFORMS.map((p, i) => ({ type: 'svg', ...p, idx: i + 1 })),                               // SVG platforms
    ...FA_PLATFORMS.slice(1).map((p, i) => ({ type: 'fa', ...p, idx: SVG_PLATFORMS.length + 1 + i })), // Threads, X, Email
  ]

  return (
    <section className="section section-alt" id="about-connect">
      <div className="container-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .1 }}>
          <p className="abc-label">Connect</p>
          <h2 className="abc-h2">
            Find Me <span className="abc-accent">Online</span>
          </h2>
          <p className="abc-sub">
            All my social profiles and contact links — I'm usually active on most of these.
          </p>
        </motion.div>

        <div className="abc-grid">
          {allCards.map((card) =>
            card.type === 'svg'
              ? <SvgCard key={card.label} {...card} index={card.idx} />
              : <FaCard  key={card.label} {...card} index={card.idx} />
          )}
        </div>
      </div>

      <style>{`
        .abc-label {
          font-family: var(--font-mono); font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--accent-primary); margin-bottom: .5rem;
        }
        .abc-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .5rem;
        }
        .abc-accent { color: var(--accent-primary); }
        .abc-sub {
          font-size: .9rem; color: var(--text-secondary);
          max-width: 500px; line-height: 1.7; margin-bottom: 2.5rem;
        }

        /* Responsive grid */
        .abc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); gap: .75rem;
        }
        @media (min-width: 480px)  { .abc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px)  { .abc-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .abc-grid { grid-template-columns: repeat(5, 1fr); } }

        /* Card base */
        .abc-card {
          display: flex; align-items: center; gap: .8rem;
          padding: .9rem 1rem;
          text-decoration: none; position: relative; overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .abc-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,.1);
          border-color: var(--soc, var(--accent-primary));
        }
        [data-theme=light] .abc-card:hover { box-shadow: 0 5px 18px rgba(0,0,0,.08); }
        .abc-card:active { transform: scale(.97); }

        /* Left accent bar */
        .abc-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 0 2px 2px 0;
          transition: width .2s ease;
        }
        .abc-card:hover .abc-bar { width: 4px; }

        /* Icon wrapper */
        .abc-icon-wrap {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: color-mix(in srgb, var(--soc, #3B82F6) 12%, transparent);
          transition: background .2s ease;
        }
        [data-theme=dark] .abc-icon-wrap {
          background: rgba(255,255,255,.07) !important;
        }
        .abc-card:hover .abc-icon-wrap {
          background: color-mix(in srgb, var(--soc, #3B82F6) 18%, transparent) !important;
        }

        /* SVG icon */
        .abc-svg-icon {
          width: 18px; height: 18px;
          object-fit: contain;
        }

        /* FontAwesome icon — dark mode aware */
        .abc-fa-icon {
          font-size: .9375rem;
          color: var(--soc);
        }
        [data-theme=dark] .abc-fa-card .abc-fa-icon {
          color: var(--soc-dark, var(--soc));
        }
        /* Dark mode SVG inversion for bar of FA cards */
        [data-theme=dark] .abc-fa-card .abc-bar {
          background: var(--soc-dark, var(--soc)) !important;
        }

        /* Info */
        .abc-info {
          display: flex; flex-direction: column; gap: .08rem;
          min-width: 0; flex: 1;
        }
        .abc-name {
          font-size: .8125rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-handle {
          font-size: .68rem; color: var(--text-tertiary); font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Arrow */
        .abc-arrow {
          margin-left: auto; font-size: .62rem;
          color: var(--text-tertiary); opacity: .35; flex-shrink: 0;
          transition: all .18s ease;
        }
        .abc-card:hover .abc-arrow {
          opacity: 1; transform: translate(2px, -2px);
          color: var(--soc, var(--accent-primary));
        }

        /* Mobile: hide handle */
        @media (max-width: 479px) {
          .abc-handle { display: none; }
          .abc-card { padding: .8rem .85rem; }
        }
      `}</style>
    </section>
  )
}
