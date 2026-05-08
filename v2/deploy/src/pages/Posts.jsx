import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'

function PostsContent() {
  useEffect(() => { trackPage('Posts') }, [])
  return (
    <>
      <Helmet><title>{buildTitle('Posts')}</title></Helmet>
      <section className="section container-xl">
        <h1 className="text-3xl font-display font-bold mb-6">Posts</h1>
        <p className="text-[var(--text-secondary)]">Full Posts page coming in v2.6.0.</p>
      </section>
    </>
  )
}

export default function Posts() {
  return <VisibilityGuard page="posts"><PostsContent /></VisibilityGuard>
}
