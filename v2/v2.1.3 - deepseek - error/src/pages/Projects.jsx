import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'

function ProjectsContent() {
  useEffect(() => { trackPage('Projects') }, [])
  return (
    <>
      <Helmet><title>{buildTitle('Projects')}</title></Helmet>
      <section className="section container-xl">
        <h1 className="text-3xl font-display font-bold mb-6">Projects</h1>
        <p className="text-[var(--text-secondary)]">Full Projects page coming in v2.4.0.</p>
      </section>
    </>
  )
}

export default function Projects() {
  return <VisibilityGuard page="projects"><ProjectsContent /></VisibilityGuard>
}
