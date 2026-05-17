// About.jsx — v2.2.4 — Content cleared (full build in v2.3.0)
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle } from '../utils/seo.js'

export default function About() {
  return (
    <VisibilityGuard page="about">
      <Helmet>
        <title>{buildTitle('About')}</title>
        <meta name="description" content="Learn about Muhtasim Rahman — web developer & designer from Bangladesh." />
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faCode} className="text-2xl text-[var(--accent-primary)]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mb-3">
          About Page
        </h1>
        <p className="text-[var(--text-secondary)] text-sm max-w-md leading-relaxed mb-2">
          This page is under construction and will be fully built in <strong className="text-[var(--text-primary)]">v2.3.0</strong>.
        </p>
        <p className="text-[var(--text-tertiary)] text-xs mb-8">
          In the meantime, you can learn about me from the homepage.
        </p>
        <Link to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors group">
          Back to Home
          <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </VisibilityGuard>
  )
}
