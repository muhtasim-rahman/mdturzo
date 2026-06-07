import { Helmet }   from 'react-helmet-async'
import { Navigate } from 'react-router-dom'
import { buildTitle } from '../utils/seo.js'
import { useAuth }  from '../hooks/useAuth.js'

export default function Profile() {
  const { isLoggedIn, authLoading } = useAuth()
  if (authLoading) return null
  if (!isLoggedIn) return <Navigate to="/login?redirect=/profile" replace />
  return (
    <>
      <Helmet><title>{buildTitle('My Profile')}</title></Helmet>
      <section className="section container-lg">
        <h1 className="text-2xl font-display font-bold mb-4">My Profile</h1>
        <p className="text-[var(--text-secondary)]">Full Profile coming in v2.8.0.</p>
      </section>
    </>
  )
}
