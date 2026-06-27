// ============================================================
// LAYOUT — v2.4.5
// Changes: DevBanner moved to layout/, wrapped with Navbar in
//          a relative header container so it always appears above
//          the navbar on all pages (including home/about).
// ============================================================

import { Outlet, useLocation }  from 'react-router-dom'
import { Navbar }               from './Navbar.jsx'
import { Footer }               from './Footer.jsx'
import { AdminQuickActions }    from '../shared/AdminQuickActions.jsx'
import CookieBanner             from '../ui/CookieBanner.jsx'
import DevBanner                from './DevBanner.jsx'
import { useSiteSettings }      from '../../hooks/useSiteSettings.js'

export function Layout() {
  const location = useLocation()
  const { settings } = useSiteSettings()
  const cookieEnabled = settings?.cookieBanner ?? true

  const isHome = ['/', '/home', '/about'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      {/* Header container: DevBanner + Navbar.
          DevBanner is in normal flow (relative).
          On home/about, Navbar is position:absolute inside this relative wrapper —
          by removing top:0 in Navbar.jsx it defaults to static position (after DevBanner). */}
      <div className="relative">
        <DevBanner />
        <Navbar />
      </div>

      <main className={`flex-1${isHome ? '' : ' pt-navbar'}`}>
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
