import { Helmet } from 'react-helmet-async'
import { buildTitle } from '../utils/seo.js'

export default function Login() {
  return (
    <>
      <Helmet><title>{buildTitle('Login')}</title></Helmet>
      <section className="section container-md text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Login</h1>
        <p className="text-[var(--text-secondary)]">Full Auth system coming in v2.7.0.</p>
      </section>
    </>
  )
}
