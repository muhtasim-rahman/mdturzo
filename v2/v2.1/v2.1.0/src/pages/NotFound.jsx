// ============================================================
// 404 NOT FOUND v2.0.1 — cleaner design
// ============================================================

import { Link }      from 'react-router-dom'
import { Helmet }    from 'react-helmet-async'
import { motion }    from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowLeft, faFaceSadTear } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Muhtasim Rahman</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
        style={{ background: 'var(--bg-page)' }}
      >
        {/* Subtle background glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(59,130,246,0.07), transparent)',
          }}
        />

        <div className="relative z-10 text-center max-w-lg mx-auto">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 88, height: 88,
              borderRadius: 'var(--radius-2xl)',
              background: 'var(--accent-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 2rem',
              color: 'var(--accent-primary)',
              fontSize: '2.25rem',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <FontAwesomeIcon icon={faFaceSadTear} />
          </motion.div>

          {/* 404 number */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Error 404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 380,
              marginInline: 'auto',
            }}
          >
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.5rem',
                background: 'var(--accent-primary)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 600, fontSize: '0.9rem',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'all var(--transition-base)',
                boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.3)'
              }}
            >
              <FontAwesomeIcon icon={faHouse} />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.5rem',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600, fontSize: '0.9rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Go Back
            </button>
          </motion.div>

        </div>
      </div>
    </>
  )
}
