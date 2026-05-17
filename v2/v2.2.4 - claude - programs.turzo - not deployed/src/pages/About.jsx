// About.jsx — v2.2.4
// Content cleared. Full About page will be built in v2.3.0.
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle } from '../utils/seo.js'

export default function About() {
  return (
    <>
      <Helmet>
        <title>{buildTitle('About')}</title>
        <meta name="description" content={`About ${SITE_CONFIG.owner.displayName} — coming soon.`} />
      </Helmet>
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '2.5rem' }}>🚧</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>About Page</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '.95rem' }}>Full content coming in v2.3.0</p>
      </div>
    </>
  )
}
