// ============================================================
// LAYOUT — v2.3.1
// Task 3: CookieBanner moved here from Home.jsx — global render.
//   - Only shows on '/' and '/home' (pathname guard inside CookieBanner)
//   - Receives enabled prop from useSiteSettings
//   - checkedRef prevents re-show on async settings load
// v2.3.1: Pages that manage their own navbar offset (Home, About)
//   are excluded from pt-navbar to avoid double top spacing.
// ============================================================

import { Outlet, useLocation }  from 'react-router-dom'
import { Navbar }               from './Navbar.jsx'
import { Footer }               from './Footer.jsx'
import { AdminQuickActions }    from '../shared/AdminQuickActions.jsx'
import CookieBanner             from '../ui/CookieBanner.jsx'
import { useSiteSettings }      from '../../hooks/useSiteSettings.js'

// Pages that handle their own top spacing (include navbar offset internally)
const SELF_SPACED = ['/', '/home', '/about']

export function Layout() {
  const location = useLocation()
  const { settings } = useSiteSettings()
  const cookieEnabled = settings?.cookieBanner ?? true

  const needsOffset = !SELF_SPACED.includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className={`flex-1${needsOffset ? ' pt-navbar' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      {/* Task 3: CookieBanner — home-only, localStorage persisted */}
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
