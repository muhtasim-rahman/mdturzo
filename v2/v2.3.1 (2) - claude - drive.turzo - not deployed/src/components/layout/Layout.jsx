// ============================================================
// LAYOUT — v2.2.5
// Task 3: CookieBanner moved here from Home.jsx — global render.
//   - Only shows on '/' and '/home' (pathname guard inside CookieBanner)
//   - Receives enabled prop from useSiteSettings
//   - checkedRef prevents re-show on async settings load
// ============================================================

import { Outlet, useLocation }  from 'react-router-dom'
import { Navbar }               from './Navbar.jsx'
import { Footer }               from './Footer.jsx'
import { AdminQuickActions }    from '../shared/AdminQuickActions.jsx'
import CookieBanner             from '../ui/CookieBanner.jsx'
import { useSiteSettings }      from '../../hooks/useSiteSettings.js'

export function Layout() {
  const location = useLocation()
  const { settings } = useSiteSettings()
  const cookieEnabled = settings?.cookieBanner ?? true

  // Home & About manage their own top padding (hero sections include navbar offset)
  const isHome = ['/', '/home', '/about'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className={`flex-1${isHome ? '' : ' pt-navbar'}`}>
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      {/* Task 3: CookieBanner — home-only, localStorage persisted */}
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
