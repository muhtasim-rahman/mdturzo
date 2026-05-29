import { Helmet } from 'react-helmet-async'
import { buildTitle } from '../utils/seo.js'

export default function Signup() {
  return (
    <>
      <Helmet><title>{buildTitle('Sign Up')}</title></Helmet>
      <section className="section container-md text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Sign Up</h1>
        <p className="text-[var(--text-secondary)]">Full Auth system coming in v2.7.0.</p>
      </section>
    </>
  )
}
