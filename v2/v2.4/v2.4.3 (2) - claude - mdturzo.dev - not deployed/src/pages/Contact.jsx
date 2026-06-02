// Contact.jsx — v2.2.5
// Task 9: Content cleared — placeholder until v2.6.0 full build
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { buildTitle } from '../utils/seo.js'
import { trackPage }  from '../services/analytics.js'

export default function Contact() {
  useEffect(() => { trackPage('Contact') }, [])
  return (
    <>
      <Helmet>
        <title>{buildTitle('Contact')}</title>
        <meta name="description" content="Contact Muhtasim Rahman — full page coming soon." />
      </Helmet>
      <div style={{
        minHeight: 'calc(100dvh - var(--navbar-h))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: '480px',
          width: '100%',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{
            width: '56px', height: '56px',
            borderRadius: '14px',
            background: 'rgba(59,130,246,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.5rem',
          }}>
            ✉️
          </div>
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '0.6rem' }}>
            Coming in v2.6.0
          </p>
          <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Contact
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Contact page is under construction. Full form, validation, and email sending coming soon.
          </p>
          <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Planned for <strong style={{ color: 'var(--text-secondary)' }}>v2.6.0</strong> release
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
