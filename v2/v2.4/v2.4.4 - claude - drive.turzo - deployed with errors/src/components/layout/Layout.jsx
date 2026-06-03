// ============================================================
// LAYOUT — v2.4.4
// Changes: Added DevBanner above Navbar
// ============================================================

import { Outlet, useLocation }  from 'react-router-dom'
import { Navbar }               from './Navbar.jsx'
import { Footer }               from './Footer.jsx'
import { AdminQuickActions }    from '../shared/AdminQuickActions.jsx'
import CookieBanner             from '../ui/CookieBanner.jsx'
import DevBanner                from '../ui/DevBanner.jsx'
import { useSiteSettings }      from '../../hooks/useSiteSettings.js'

export function Layout() {
  const location = useLocation()
  const { settings } = useSiteSettings()
  const cookieEnabled = settings?.cookieBanner ?? true

  const isHome = ['/', '/home', '/about'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <DevBanner />
      <Navbar />
      <main className={`flex-1${isHome ? '' : ' pt-navbar'}`}>
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
