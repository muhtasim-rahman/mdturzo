// ============================================================
// 404 NOT FOUND — v2.1.1 Creative Redesign
// "4 😢 4" with sad icon replacing the 0
// ============================================================

import { Link }      from 'react-router-dom'
import { Helmet }    from 'react-helmet-async'
import { motion }    from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faArrowLeft, faFaceSadTear,
  faCode, faUser, faRss, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

const QUICK_LINKS = [
  { label: 'About',    path: '/about',    icon: faUser    },
  { label: 'Projects', path: '/projects', icon: faCode    },
  { label: 'Feed',     path: '/feed',     icon: faRss     },
  { label: 'Contact',  path: '/contact',  icon: faEnvelope},
]

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Muhtasim Rahman</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[92vh] flex items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{ background: 'var(--bg-page)' }}>

        {/* Background glow */}
        <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.06), transparent)' }} />
        <div aria-hidden style={{ position:'absolute', top:'20%', left:'10%', width:300, height:300,
          borderRadius:'50%', background:'rgba(139,92,246,0.04)', filter:'blur(80px)', pointerEvents:'none' }} />

        <div className="relative z-10 text-center max-w-xl mx-auto">

          {/* ── 4 😢 4 ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-8 select-none"
          >
            <span className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--text-primary)', letterSpacing: '-0.05em', opacity: 0.9 }}>
              4
            </span>

            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0], y: [0, -6, 6, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              className="flex items-center justify-center"
              style={{
                fontSize: 'clamp(5rem, 18vw, 9rem)',
                color: 'var(--accent-primary)',
                lineHeight: 1,
              }}>
              <FontAwesomeIcon icon={faFaceSadTear} />
            </motion.div>

            <span className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--text-primary)', letterSpacing: '-0.05em', opacity: 0.9 }}>
              4
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="font-display font-extrabold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', letterSpacing: '-0.03em' }}>
            Page not found
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[var(--text-secondary)] text-base leading-relaxed mb-2 max-w-sm mx-auto">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-[13px] text-[var(--text-tertiary)] mb-8 max-w-sm mx-auto">
            If you think it's our mistake, please{' '}
            <Link to="/contact" className="text-[var(--accent-primary)] hover:underline">send us a message</Link>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-12">
            <Link to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent-primary)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.4)]">
              <FontAwesomeIcon icon={faHouse} className="text-xs" />
              Go Home
            </Link>
            <button onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-all bg-transparent cursor-pointer">
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              Go Back
            </button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-4">
              Or explore these pages
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {QUICK_LINKS.map(({ label, path, icon }) => (
                <Link key={path} to={path}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] text-[13px] font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all hover:bg-[var(--accent-light)]">
                  <FontAwesomeIcon icon={icon} className="text-[10px]" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
