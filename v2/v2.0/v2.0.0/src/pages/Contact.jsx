import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'

function ContactContent() {
  useEffect(() => { trackPage('Contact') }, [])
  return (
    <>
      <Helmet><title>{buildTitle('Contact')}</title></Helmet>
      <section className="section container-md">
        <h1 className="text-3xl font-display font-bold mb-6">Contact</h1>
        <p className="text-[var(--text-secondary)]">Full Contact page coming in v2.6.0.</p>
      </section>
    </>
  )
}

export default function Contact() {
  return <VisibilityGuard page="contact"><ContactContent /></VisibilityGuard>
}
