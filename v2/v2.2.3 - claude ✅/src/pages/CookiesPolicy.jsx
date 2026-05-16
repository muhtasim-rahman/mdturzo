import { Helmet } from 'react-helmet-async'
import { buildTitle } from '../utils/seo.js'

export default function CookiesPolicy() {
  return (
    <>
      <Helmet><title>{buildTitle('Cookies Policy')}</title></Helmet>
      <section className="section container-md">
        <h1 className="text-3xl font-display font-bold mb-8">Cookies Policy</h1>
        <div className="text-[var(--text-secondary)] space-y-4">
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>Minimal cookies used for auth. Full policy editable from Admin in v2.11.0.</p>
        </div>
      </section>
    </>
  )
}
