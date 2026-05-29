// ============================================================
// LAYOUT — v2.3.1
// Changes from v2.2.5:
//   * Added '/about' to isHome paths — about page hero handles
//     its own top padding (same as home), prevents double padding
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

  // Home and About both handle their own top padding via their hero sections
  const isHome = ['/', '/home', '/about'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className={`flex-1${isHome ? '' : ' pt-navbar'}`}>
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      {/* CookieBanner — home-only, localStorage persisted */}
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
