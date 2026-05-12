// ============================================================
// VISIBILITY GUARD — Wraps pages, checks Supabase page_visibility
// public → show | signed-in → login required | private → 404
// ============================================================

import { Navigate }           from 'react-router-dom'
import { useAuth }            from '../../hooks/useAuth.js'
import { usePageVisibility }  from '../../hooks/usePageVisibility.js'
import { SkeletonText }       from '../ui/Skeleton.jsx'

export function VisibilityGuard({ page, children }) {
  const { isLoggedIn, authLoading } = useAuth()
  const { visibility, loading }     = usePageVisibility()

  if (authLoading || loading) {
    return (
      <div className="container-lg py-20">
        <SkeletonText lines={3} className="max-w-sm mx-auto" />
      </div>
    )
  }

  const rule = visibility[page] || 'public'

  if (rule === 'private')    return <Navigate to="/404" replace />
  if (rule === 'signed-in' && !isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(window.location.pathname)}`} replace />
  }

  return children
}
