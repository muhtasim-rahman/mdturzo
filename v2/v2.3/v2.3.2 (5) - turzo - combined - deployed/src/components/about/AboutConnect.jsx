// ============================================================
// AboutConnect.jsx — v2.3.2
// Find Me Online / Connect section
// Based on copy-2 style — enhanced, light/dark mode responsive
// Left accent bar, icon wraps with platform color, external arrow
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram,
  faTelegram, faYoutube, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const SOCIALS = [
  { icon: faGithub,    label: 'GitHub',      handle: 'muhtasim-rahman',        url: SITE_CONFIG.social.github,    color: '#94A3B8' },
  { icon: faLinkedin,  label: 'LinkedIn',    handle: 'mdturzo999',             url: SITE_CONFIG.social.linkedin,  color: '#0A66C2' },
  { icon: faYoutube,   label: 'YouTube',     handle: '@mdturzo999',            url: SITE_CONFIG.social.youtube,   color: '#FF0000' },
  { icon: faFacebook,  label: 'Facebook',    handle: 'mdturzo999',             url: SITE_CONFIG.social.facebook,  color: '#1877F2' },
  { icon: faInstagram, label: 'Instagram',   handle: '@mdturzo999',            url: SITE_CONFIG.social.instagram, color: '#E1306C' },
  { icon: faXTwitter,  label: 'X / Twitter', handle: '@mdturzo999',            url: SITE_CONFIG.social.twitter,   color: '#94A3B8' },
  { icon: faTelegram,  label: 'Telegram',    handle: '@mdturzo16',             url: SITE_CONFIG.social.telegram,  color: '#26A5E4' },
  { icon: faTiktok,    label: 'TikTok',      handle: '@mdturzo16',             url: SITE_CONFIG.social.tiktok,    color: '#EE1D52' },
  { icon: faThreads,   label: 'Threads',     handle: '@mdturzo999',            url: SITE_CONFIG.social.threads,   color: '#64748B' },
  { icon: faEnvelope,  label: 'Email',       handle: SITE_CONFIG.owner.email,  url: `mailto:${SITE_CONFIG.owner.email}`, color: '#EA4335' },
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
            All my social profiles and contact links in one place — I'm usually active on most of these.
          </p>
        </motion.div>

        <div className="abc-grid">
          {SOCIALS.map(({ icon, label, handle, url, color }, i) => (
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
              transition={{ duration: .42, delay: i * .05 }}>
              {/* Left color accent bar */}
              <div className="abc-bar" style={{ background: color }} />

              {/* Icon */}
              <div className="abc-icon-wrap" style={{ background: `${color}15` }}>
                <FontAwesomeIcon icon={icon} style={{ color }} className="abc-icon" />
              </div>

              {/* Info */}
              <div className="abc-info">
                <span className="abc-name">{label}</span>
                <span className="abc-handle">{handle}</span>
              </div>

              {/* Arrow */}
              <FontAwesomeIcon icon={faArrowRight} className="abc-arrow" />
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
          max-width: 520px; line-height: 1.7; margin-bottom: 2.5rem;
        }

        /* Grid */
        .abc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .85rem;
        }
        @media (min-width: 480px)  { .abc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px)  { .abc-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .abc-grid { grid-template-columns: repeat(5, 1fr); } }

        /* Card */
        .abc-card {
          display: flex; align-items: center; gap: .875rem;
          padding: .95rem 1.1rem;
          text-decoration: none;
          position: relative; overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }
        .abc-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,.12);
          border-color: var(--soc, var(--accent-primary));
        }
        [data-theme=light] .abc-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,.09);
        }
        .abc-card:active { transform: scale(.97); }
        .abc-card:hover .abc-bar { width: 4px; }
        .abc-card:hover .abc-arrow { opacity: 1; transform: translateX(3px); color: var(--soc); }

        /* Left bar */
        .abc-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 0 2px 2px 0;
          transition: width .2s ease;
        }

        /* Icon */
        .abc-icon-wrap {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease;
        }
        [data-theme=dark] .abc-icon-wrap {
          background: rgba(255,255,255,.08) !important;
        }
        .abc-card:hover .abc-icon-wrap {
          background: color-mix(in srgb, var(--soc, #3B82F6) 18%, transparent) !important;
        }
        .abc-icon { font-size: .9375rem; }

        /* Info */
        .abc-info {
          display: flex; flex-direction: column; gap: .1rem;
          min-width: 0; flex: 1;
        }
        .abc-name {
          font-size: .8375rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .abc-handle {
          font-size: .7rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Arrow */
        .abc-arrow {
          margin-left: auto; font-size: .65rem;
          color: var(--text-tertiary); opacity: .4;
          flex-shrink: 0;
          transition: all .18s ease;
        }

        /* Mobile: hide handle to save space */
        @media (max-width: 479px) {
          .abc-handle { display: none; }
          .abc-card { padding: .85rem .9rem; }
        }
      `}</style>
    </section>
  )
}
