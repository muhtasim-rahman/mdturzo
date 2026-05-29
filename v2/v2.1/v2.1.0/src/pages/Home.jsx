import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle }  from '../utils/seo.js'
import { trackPage }   from '../services/analytics.js'

export default function Home() {
  useEffect(() => { trackPage('Home') }, [])
  return (
    <>
      <Helmet>
        <title>{buildTitle(null)}</title>
        <meta name="description" content={SITE_CONFIG.seo.defaultDescription} />
      </Helmet>
      <section className="section container-xl text-center">
        <h1 className="text-4xl font-display font-bold mb-4">
          Hi, I am <span className="text-gradient">Muhtasim Rahman</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto">
          Web Developer &amp; Designer from Bangladesh. Full homepage coming in v2.2.0.
        </p>
      </section>
    </>
  )
}
