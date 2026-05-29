// ============================================================
// FOOTER — v2.1.0 Full Implementation
// 4-column desktop, stacked mobile
// Logo + bio + socials | Quick links | Pages | Contact + Legal
// Bottom bar: copyright + version + scroll-to-top
// ============================================================

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope, faLocationDot, faArrowUp,
  faHouse, faUser, faCode, faRss,
  faShieldHalved, faCookie, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faFacebook, faInstagram, faYoutube,
  faTelegram, faLinkedin, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import SITE_CONFIG from '../../config/site.config.js'

const SOCIALS = [
  { icon: faGithub,    url: SITE_CONFIG.social.github,    label: 'GitHub'    },
  { icon: faLinkedin,  url: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
  { icon: faFacebook,  url: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
  { icon: faInstagram, url: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { icon: faYoutube,   url: SITE_CONFIG.social.youtube,   label: 'YouTube'   },
  { icon: faXTwitter,  url: SITE_CONFIG.social.twitter,   label: 'X/Twitter' },
  { icon: faTelegram,  url: SITE_CONFIG.social.telegram,  label: 'Telegram'  },
  { icon: faTiktok,    url: SITE_CONFIG.social.tiktok,    label: 'TikTok'    },
  { icon: faThreads,   url: SITE_CONFIG.social.threads,   label: 'Threads'   },
]

const QUICK_LINKS = [
  { label: 'Home',     path: '/',         icon: faHouse   },
  { label: 'About',    path: '/about',    icon: faUser    },
  { label: 'Projects', path: '/projects', icon: faCode    },
  { label: 'Feed',     path: '/feed',     icon: faRss     },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',  path: '/privacy-policy',  icon: faShieldHalved },
  { label: 'Cookies Policy',  path: '/cookies-policy',  icon: faCookie       },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-color)] mt-auto">

      {/* ── Main Footer ──────────────────────────────────── */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="inline-block font-mono font-bold text-lg mb-4">
              <span className="text-[var(--accent-primary)]">@</span>
              <span className="text-[var(--text-primary)]">mdturzo999</span>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
              {SITE_CONFIG.seo.defaultDescription}
            </p>

            <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] mb-5">
              <FontAwesomeIcon icon={faLocationDot} className="text-[var(--accent-primary)] text-xs" />
              <span>{SITE_CONFIG.owner.location}</span>
            </div>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ icon, url, label }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-all duration-200 text-sm"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Explore</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, path, icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-[9px] text-[var(--accent-primary)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.owner.email}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-[var(--accent-primary)] text-xs flex-shrink-0" />
                  {SITE_CONFIG.owner.email}
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 mt-1 px-3.5 py-1.5 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] text-sm font-medium hover:bg-[var(--accent-light)] transition-colors"
                >
                  Send a message
                  <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ label, path, icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"
                  >
                    <FontAwesomeIcon icon={icon} className="text-xs text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Old portfolio link */}
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-1">Old portfolio</p>
              <a
                href={SITE_CONFIG.owner.oldPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors underline underline-offset-2"
              >
                mdturzo.odoo.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────── */}
      <div className="border-t border-[var(--border-color)]">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-xs text-[var(--text-tertiary)] text-center sm:text-left">
            &copy; {year}{' '}
            <Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium">
              {SITE_CONFIG.siteName}
            </Link>
            {' '}— All rights reserved.
          </p>

          {/* Version badge */}
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-color)] text-[var(--text-tertiary)] bg-[var(--bg-surface-2)]">
            {SITE_CONFIG.version}
          </span>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
