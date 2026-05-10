import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'

function BlogsContent() {
  useEffect(() => { trackPage('Blogs') }, [])
  return (
    <>
      <Helmet><title>{buildTitle('Blogs')}</title></Helmet>
      <section className="section container-xl">
        <h1 className="text-3xl font-display font-bold mb-6">Blogs</h1>
        <p className="text-[var(--text-secondary)]">Full Blogs page coming in v2.5.0.</p>
      </section>
    </>
  )
}

export default function Blogs() {
  return <VisibilityGuard page="blogs"><BlogsContent /></VisibilityGuard>
}
