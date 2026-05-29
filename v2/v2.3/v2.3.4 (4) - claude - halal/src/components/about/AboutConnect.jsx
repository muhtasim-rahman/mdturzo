// ============================================================
// AboutConnect.jsx — v2.3.3
// CHANGES:
//   * Uses uploaded SVG icons from /icons/social/ (renamed)
//   * Dark mode: github, threads, x-twitter icons inverted to white
//   * Improved card design — badge layout, category grouping
//   * Email handled with FontAwesome (no SVG uploaded)
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

// SVG icon paths (uploaded to public/icons/social/)
const SOCIALS = [
  {
    svgSrc: '/icons/social/github.svg',
    label: 'GitHub', handle: 'muhtasim-rahman',
    url: SITE_CONFIG.social.github,
    color: '#6e7681', bgColor: '#24292e',
    invertDark: true, // black SVG → invert in dark mode
  },
  {
    svgSrc: '/icons/social/linkedin.svg',
    label: 'LinkedIn', handle: 'mdturzo999',
    url: SITE_CONFIG.social.linkedin,
    color: '#0A66C2', bgColor: '#0A66C2',
  },
  {
    svgSrc: '/icons/social/youtube.svg',
    label: 'YouTube', handle: '@mdturzo999',
    url: SITE_CONFIG.social.youtube,
    color: '#FF0000', bgColor: '#FF0000',
  },
  {
    svgSrc: '/icons/social/facebook.svg',
    label: 'Facebook', handle: 'mdturzo999',
    url: SITE_CONFIG.social.facebook,
    color: '#1877F2', bgColor: '#1877F2',
  },
  {
    svgSrc: '/icons/social/instagram.svg',
    label: 'Instagram', handle: '@mdturzo999',
    url: SITE_CONFIG.social.instagram,
    color: '#E1306C', bgColor: '#E1306C',
  },
  {
    svgSrc: '/icons/social/x-twitter.svg',
    label: 'X / Twitter', handle: '@mdturzo999',
    url: SITE_CONFIG.social.twitter,
    color: '#94A3B8', bgColor: '#000',
    invertDark: true,
  },
  {
    svgSrc: '/icons/social/telegram.svg',
    label: 'Telegram', handle: '@mdturzo16',
    url: SITE_CONFIG.social.telegram,
    color: '#26A5E4', bgColor: '#26A5E4',
  },
  {
    svgSrc: '/icons/social/tiktok.svg',
    label: 'TikTok', handle: '@mdturzo16',
    url: SITE_CONFIG.social.tiktok,
    color: '#EE1D52', bgColor: '#EE1D52',
  },
  {
    svgSrc: '/icons/social/threads.svg',
    label: 'Threads', handle: '@mdturzo999',
    url: SITE_CONFIG.social.threads,
    color: '#64748B', bgColor: '#000',
    invertDark: true,
  },
  {
    svgSrc: '/icons/social/email.svg',
    label: 'Email', handle: SITE_CONFIG.owner.email,
    url: `mailto:${SITE_CONFIG.owner.email}`,
    color: '#EA4335', bgColor: '#EA4335',
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
            All my social profiles and contact links — feel free to reach out on any platform.
          </p>
        </motion.div>

        <div className="abc-grid">
          {SOCIALS.map(({ svgSrc, label, handle, url, color, invertDark }, i) => (
            <motion.a
              key={label}
              href={url}
              target={url.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={`abc-card${invertDark ? ' abc-invert-dark' : ''}`}
              style={{ '--soc': color }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .4, delay: i * .04 }}>

              {/* Icon */}
              <div className="abc-icon-wrap">
                <img
                  src={svgSrc}
                  alt={label}
                  className={`abc-svg-icon${invertDark ? ' abc-svg-invert' : ''}`}
                  width="20" height="20"
                  loading="lazy"
                />
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

        /* Grid */
        .abc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        @media (min-width: 480px)  { .abc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px)  { .abc-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .abc-grid { grid-template-columns: repeat(5, 1fr); } }

        /* Card */
        .abc-card {
          display: flex; align-items: center; gap: .75rem;
          padding: .9rem 1rem;
          text-decoration: none;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          position: relative; overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease,
                      border-color .22s ease, background .22s ease;
        }
        .abc-card::before {
          content: ''; position: absolute;
          left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--soc, var(--accent-primary));
          border-radius: 0 2px 2px 0;
          transform: scaleY(0); transform-origin: bottom;
          transition: transform .2s ease;
        }
        .abc-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--soc, var(--accent-primary)) 50%, var(--border-color));
          box-shadow:
            0 8px 24px rgba(0,0,0,.12),
            0 2px 6px rgba(0,0,0,.08),
            0 0 0 1px color-mix(in srgb, var(--soc, var(--accent-primary)) 18%, transparent);
          background: color-mix(in srgb, var(--soc, var(--accent-primary)) 4%, var(--bg-surface));
        }
        .abc-card:hover::before { transform: scaleY(1); }
        [data-theme=light] .abc-card:hover {
          box-shadow:
            0 6px 20px rgba(0,0,0,.07),
            0 0 0 1px color-mix(in srgb, var(--soc, var(--accent-primary)) 20%, transparent);
        }
        .abc-card:active { transform: scale(.96); }

        /* Icon */
        .abc-icon-wrap {
          width: 34px; height: 34px; border-radius: var(--radius-md);
          background: var(--bg-surface-2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .abc-card:hover .abc-icon-wrap {
          background: color-mix(in srgb, var(--soc, #3B82F6) 18%, transparent);
          transform: scale(1.12);
          box-shadow: 0 0 10px color-mix(in srgb, var(--soc, #3B82F6) 30%, transparent);
        }
        .abc-svg-icon {
          width: 18px; height: 18px;
          object-fit: contain; display: block;
        }

        /* Dark mode invert for black SVG icons (GitHub, X, Threads) */
        [data-theme=dark] .abc-svg-invert {
          filter: brightness(0) invert(1);
        }

        /* Info */
        .abc-info {
          display: flex; flex-direction: column; gap: .06rem;
          min-width: 0; flex: 1;
        }
        .abc-name {
          font-size: .8rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-handle {
          font-size: .68rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Arrow */
        .abc-arrow {
          margin-left: auto; font-size: .6rem;
          color: var(--text-tertiary); opacity: .3; flex-shrink: 0;
          transition: all .2s ease;
        }
        .abc-card:hover .abc-arrow {
          opacity: 1; color: var(--soc, var(--accent-primary));
          transform: translate(2px, -2px) scale(1.15);
        }

        @media (max-width: 479px) {
          .abc-handle { display: none; }
          .abc-card { padding: .8rem .85rem; gap: .6rem; }
        }
      `}</style>
    </section>
  )
}
