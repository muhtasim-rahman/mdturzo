import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'

function AboutContent() {
  useEffect(() => { trackPage('About') }, [])
  return (
    <>
      <Helmet><title>{buildTitle('About')}</title></Helmet>
      <section className="section container-lg">
        <h1 className="text-3xl font-display font-bold mb-6">About Me</h1>
        <p className="text-[var(--text-secondary)]">Full About page coming in v2.3.0.</p>
      </section>
    </>
  )
}

export default function About() {
  return <VisibilityGuard page="about"><AboutContent /></VisibilityGuard>
}
