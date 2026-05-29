// Contact.jsx — v2.2.4 — Content cleared (full build in v2.6.0)
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle } from '../utils/seo.js'
import { SITE_CONFIG } from '../config/site.config.js'

export default function Contact() {
  return (
    <VisibilityGuard page="contact">
      <Helmet>
        <title>{buildTitle('Contact')}</title>
        <meta name="description" content="Get in touch with Muhtasim Rahman — web developer & designer." />
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-[var(--accent-primary)]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mb-3">
          Contact Page
        </h1>
        <p className="text-[var(--text-secondary)] text-sm max-w-md leading-relaxed mb-2">
          This page is under construction and will be fully built in <strong className="text-[var(--text-primary)]">v2.6.0</strong>.
        </p>
        <p className="text-[var(--text-tertiary)] text-xs mb-8">
          For now, you can reach me directly at{' '}
          <a href={`mailto:${SITE_CONFIG.owner.email}`} className="text-[var(--accent-primary)] hover:underline">
            {SITE_CONFIG.owner.email}
          </a>
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a href={`mailto:${SITE_CONFIG.owner.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors">
            <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
            Email Me
          </a>
          <Link to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] font-semibold text-sm transition-colors group">
            Back to Home
            <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </VisibilityGuard>
  )
}
