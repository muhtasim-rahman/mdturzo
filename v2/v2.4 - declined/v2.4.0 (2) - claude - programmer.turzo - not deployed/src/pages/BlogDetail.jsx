import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { buildTitle } from '../utils/seo.js'

export default function BlogDetail() {
  const { slug } = useParams()
  return (
    <>
      <Helmet><title>{buildTitle(slug)}</title></Helmet>
      <section className="section container-lg">
        <p className="text-[var(--text-secondary)]">Blog detail coming in v2.5.0.</p>
      </section>
    </>
  )
}
