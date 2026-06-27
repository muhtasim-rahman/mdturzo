import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

export default function PublicProfile() {
  const { username } = useParams()
  return (
    <>
      <Helmet><title>@{username} | Muhtasim Rahman</title></Helmet>
      <section className="section container-lg">
        <h1 className="text-2xl font-display font-bold mb-4">@{username}</h1>
        <p className="text-[var(--text-secondary)]">Public profile coming in v2.8.0.</p>
      </section>
    </>
  )
}
