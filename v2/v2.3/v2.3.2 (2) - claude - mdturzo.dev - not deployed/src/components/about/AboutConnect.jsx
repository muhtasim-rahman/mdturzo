// ============================================================
// components/about/AboutConnect.jsx — v2.3.2
// Find Me Online — social grid (copy-2 style, enhanced)
// Full light/dark mode responsive, platform color hover
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope, faArrowRight, faLink,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram,
  faTelegram, faYoutube, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const SOCIALS = [
  { icon: faGithub,    label: 'GitHub',      handle: '@muhtasim-rahman', url: SITE_CONFIG.social.github,    color: '#6E7681',  featured: true  },
  { icon: faLinkedin,  label: 'LinkedIn',    handle: 'mdturzo999',       url: SITE_CONFIG.social.linkedin,  color: '#0A66C2',  featured: true  },
  { icon: faYoutube,   label: 'YouTube',     handle: '@mdturzo999',      url: SITE_CONFIG.social.youtube,   color: '#FF0000',  featured: true  },
  { icon: faFacebook,  label: 'Facebook',    handle: 'mdturzo999',       url: SITE_CONFIG.social.facebook,  color: '#1877F2',  featured: false },
  { icon: faInstagram, label: 'Instagram',   handle: '@mdturzo999',      url: SITE_CONFIG.social.instagram, color: '#E1306C',  featured: false },
  { icon: faTelegram,  label: 'Telegram',    handle: '@mdturzo16',       url: SITE_CONFIG.social.telegram,  color: '#26A5E4',  featured: false },
  { icon: faXTwitter,  label: 'X / Twitter', handle: '@mdturzo999',      url: SITE_CONFIG.social.twitter,   color: '#94A3B8',  featured: false },
  { icon: faTiktok,    label: 'TikTok',      handle: '@mdturzo16',       url: SITE_CONFIG.social.tiktok,    color: '#EE1D52',  featured: false },
  { icon: faThreads,   label: 'Threads',     handle: '@mdturzo999',      url: SITE_CONFIG.social.threads,   color: '#94A3B8',  featured: false },
  { icon: faEnvelope,  label: 'Email',       handle: SITE_CONFIG.owner.email, url: `mailto:${SITE_CONFIG.owner.email}`, color: '#F59E0B', featured: false },
]

export default function AboutConnect() {
  return (
    <section className="section section-alt" id="about-social">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}
          className="abc-header"
        >
          <p className="abc-label">Connect</p>
          <h2 className="abc-h2">Find Me <span className="abc-accent">Online</span></h2>
          <p className="abc-sub">Reach out, follow along, or just say hello — I'm active across all these platforms.</p>
        </motion.div>

        {/* Featured row — larger cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .5 }}
          className="abc-featured"
        >
          {SOCIALS.filter(s => s.featured).map(({ icon, label, handle, url, color }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className="abc-big-card card" style={{ '--c': color }}>
              <div className="abc-big-icon-wrap" style={{ background: `${color}18` }}>
                <FontAwesomeIcon icon={icon} className="abc-big-icon" style={{ color }} />
              </div>
              <div className="abc-big-info">
                <p className="abc-big-label">{label}</p>
                <p className="abc-big-handle">{handle}</p>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="abc-big-arrow" />
            </a>
          ))}
        </motion.div>

        {/* Rest — grid of smaller cards */}
        <div className="abc-grid">
          {SOCIALS.filter(s => !s.featured).map(({ icon, label, handle, url, color }, i) => (
            <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className="abc-card card" style={{ '--c': color }}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .4, delay: i * .055 }}
            >
              {/* Left accent bar */}
              <div className="abc-card-bar" style={{ background: color }} />
              <div className="abc-card-icon" style={{ background: `${color}15`, color }}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="abc-card-info">
                <span className="abc-card-label">{label}</span>
                <span className="abc-card-handle">{handle}</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="abc-card-arrow" />
            </motion.a>
          ))}
        </div>

        {/* Copy profile link */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: .4, delay: .3 }}
          className="abc-profile-link"
        >
          <FontAwesomeIcon icon={faLink} style={{ color: 'var(--accent-primary)', marginRight: '.5rem', fontSize: '.8rem' }} />
          <span className="abc-profile-url">{SITE_CONFIG.siteURL.replace('https://', '')}</span>
        </motion.div>
      </div>

      <style>{`
        .abc-header { text-align: center; margin-bottom: 3rem; }
        .abc-label {
          display: inline-block; font-family: var(--font-mono);
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--accent-primary);
          background: var(--accent-light); padding: .25rem .75rem;
          border-radius: 9999px; margin-bottom: .75rem;
        }
        .abc-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--text-primary); line-height: 1.15; margin-bottom: .6rem;
        }
        .abc-accent { color: var(--accent-primary); }
        .abc-sub {
          color: var(--text-secondary); font-size: .9rem;
          max-width: 520px; margin: 0 auto; line-height: 1.7;
        }

        /* ── FEATURED ROW ──────────────────────────────── */
        .abc-featured {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin-bottom: 1.25rem;
        }
        .abc-big-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.2rem 1.25rem; text-decoration: none;
          transition: all .2s ease; position: relative; overflow: hidden;
        }
        .abc-big-card::before {
          content: ''; position: absolute; inset: 0;
          background: var(--c); opacity: 0;
          transition: opacity .2s ease;
        }
        .abc-big-card:hover::before { opacity: .05; }
        .abc-big-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.12); border-color: var(--c) !important; }
        [data-theme=light] .abc-big-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,.08); }

        .abc-big-icon-wrap {
          width: 48px; height: 48px; border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; z-index: 1;
          transition: background .2s;
        }
        .abc-big-card:hover .abc-big-icon-wrap { background: var(--c) !important; }
        .abc-big-card:hover .abc-big-icon { color: #fff !important; }
        .abc-big-icon { font-size: 1.35rem; transition: color .2s; }

        .abc-big-info { flex: 1; position: relative; z-index: 1; min-width: 0; }
        .abc-big-label { font-size: .88rem; font-weight: 700; color: var(--text-primary); }
        .abc-big-handle { font-size: .74rem; color: var(--text-secondary); font-family: var(--font-mono); margin-top: .15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .abc-big-arrow {
          font-size: .8rem; color: var(--text-tertiary); flex-shrink: 0;
          position: relative; z-index: 1;
          transition: transform .2s, color .2s;
        }
        .abc-big-card:hover .abc-big-arrow { transform: translateX(3px); color: var(--c); }

        /* ── SMALL GRID ──────────────────────────────── */
        .abc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: .85rem; margin-bottom: 1.5rem;
        }
        .abc-card {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem; text-decoration: none;
          position: relative; overflow: hidden;
          transition: all .2s ease;
        }
        .abc-card:hover { transform: translateY(-2px); border-color: var(--c) !important; }
        .abc-card-bar { width: 3px; height: 100%; position: absolute; left: 0; top: 0; opacity: .6; }
        .abc-card-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; flex-shrink: 0;
          transition: background .2s, color .2s;
        }
        .abc-card:hover .abc-card-icon { background: var(--c) !important; color: #fff !important; }
        .abc-card-info { flex: 1; min-width: 0; }
        .abc-card-label { display: block; font-size: .82rem; font-weight: 600; color: var(--text-primary); }
        .abc-card-handle { display: block; font-size: .7rem; color: var(--text-secondary); font-family: var(--font-mono); margin-top: .1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .abc-card-arrow { font-size: .72rem; color: var(--text-tertiary); flex-shrink: 0; transition: transform .2s, color .2s; }
        .abc-card:hover .abc-card-arrow { transform: translateX(3px); color: var(--c); }

        /* Profile link */
        .abc-profile-link {
          text-align: center; padding: .75rem;
          background: var(--bg-surface); border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
        }
        .abc-profile-url {
          font-family: var(--font-mono); font-size: .78rem;
          color: var(--text-secondary);
        }

        /* ── LIGHT MODE adjustments ───────────────────── */
        [data-theme=light] .abc-big-card { background: var(--bg-page); }
        [data-theme=light] .abc-card     { background: var(--bg-page); }

        /* ── RESPONSIVE ──────────────────────────────── */
        @media (max-width: 860px) {
          .abc-featured { grid-template-columns: 1fr; }
        }
        @media (min-width: 600px) and (max-width: 860px) {
          .abc-featured { grid-template-columns: repeat(2, 1fr); }
          .abc-featured > *:last-child { grid-column: span 2; }
        }
        @media (max-width: 480px) {
          .abc-grid { grid-template-columns: 1fr; }
          .abc-big-card { padding: 1rem; }
        }
      `}</style>
    </section>
  )
}
