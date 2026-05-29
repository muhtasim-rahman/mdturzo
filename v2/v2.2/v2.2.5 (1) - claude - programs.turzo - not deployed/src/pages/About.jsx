// About.jsx — v2.2.5
// Content cleared — full About page coming in v2.3.0
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { buildTitle } from '../utils/seo.js'

export default function About() {
  return (
    <>
      <Helmet>
        <title>{buildTitle('About')}</title>
        <meta name="description" content="About page is under construction." />
      </Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="card p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] border border-[var(--accent-primary)]/30 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">🚧</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-3">Coming in v2.3.0</p>
          <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3">About Page</h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            The full About page is under construction and will be available in the next version. Stay tuned!
          </p>
          <Link to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  )
}
