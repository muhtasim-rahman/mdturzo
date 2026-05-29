import { Helmet }    from 'react-helmet-async'
import { Navigate }  from 'react-router-dom'
import { useAdmin }  from '../hooks/useAdmin.js'

export default function Admin() {
  const { isAdmin, authLoading } = useAdmin()
  if (authLoading) return null
  if (!isAdmin)    return <Navigate to="/404" replace />
  return (
    <>
      <Helmet><title>Admin Panel | Muhtasim Rahman</title></Helmet>
      <section className="section container-xl">
        <h1 className="text-2xl font-display font-bold mb-4">Admin Panel</h1>
        <p className="text-[var(--text-secondary)]">Full Admin panel coming in v2.10.0.</p>
      </section>
    </>
  )
}
