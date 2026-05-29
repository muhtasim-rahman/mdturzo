import { Helmet } from 'react-helmet-async'

export default function AuthAction() {
  return (
    <>
      <Helmet><title>Authentication | Muhtasim Rahman</title></Helmet>
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Auth action handler - v2.7.0.</p>
      </section>
    </>
  )
}
