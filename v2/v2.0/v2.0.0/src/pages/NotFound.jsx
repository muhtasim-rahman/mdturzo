// ============================================================
// 404 NOT FOUND — Creative animated page
// ============================================================

import { useEffect }    from 'react'
import { Link }         from 'react-router-dom'
import { Helmet }       from 'react-helmet-async'
import { motion }       from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | Muhtasim Rahman'
  }, [])

  return (
    <>
      <Helmet>
        <title>404 — Not Found | Muhtasim Rahman</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-mesh overflow-hidden">

        {/* Glowing orbs background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', top: '10%', left: '10%' }}
          />
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-8"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)', bottom: '15%', right: '15%' }}
          />
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto">

          {/* 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="relative mb-6"
          >
            <span
              className="text-[12rem] font-display font-black leading-none select-none"
              style={{
                background:          'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                opacity:              0.25,
              }}
            >
              404
            </span>

            {/* Floating code snippets */}
            {['<html>', '</>', '{ }', '404', 'null', 'undefined'].map((text, i) => (
              <motion.span
                key={i}
                className="absolute text-xs font-mono text-blue-400/30 select-none"
                style={{
                  top:   `${20 + (i * 13)}%`,
                  left:  i % 2 === 0 ? `${5 + i * 8}%` : undefined,
                  right: i % 2 !== 0 ? `${5 + i * 6}%` : undefined,
                }}
                animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3">
              This page doesn't exist
            </h1>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              The URL you visited is either wrong or this page has been removed.
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
              >
                <FontAwesomeIcon icon={faHouse} />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] font-semibold rounded-xl text-sm transition-all"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Go Back
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
