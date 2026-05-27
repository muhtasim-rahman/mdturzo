import { Helmet } from 'react-helmet-async'
import { buildTitle } from '../utils/seo.js'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet><title>{buildTitle('Privacy Policy')}</title></Helmet>
      <section className="section container-md">
        <h1 className="text-3xl font-display font-bold mb-8">Privacy Policy</h1>
        <div className="text-[var(--text-secondary)] space-y-4">
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>This website collects minimal information. Full policy editable from Admin in v2.11.0.</p>
        </div>
      </section>
    </>
  )
}
