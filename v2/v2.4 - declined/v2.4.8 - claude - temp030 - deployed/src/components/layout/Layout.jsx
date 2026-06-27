// ============================================================
// LAYOUT — v2.4.5
// Fix: DevBanner now in outer wrapper so it stays visually ABOVE
//      the Navbar even on home/about pages where Navbar is absolute.
//      Inner `relative` div gives Navbar its containing block.
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

      {/* DevBanner — rendered OUTSIDE the inner relative wrapper so it stays
          at the very top of the body. Navbar (even when absolute on home pages)
          cannot overlap this because it lives in a separate containing block below. */}
      <DevBanner />

      {/* Inner wrapper — position:relative gives the absolute Navbar a proper
          containing block that starts AFTER the DevBanner */}
      <div className="relative flex-1 flex flex-col">
        <Navbar />
        <main className={`flex-1${isHome ? '' : ' pt-navbar'}`}>
          <Outlet />
        </main>
        <Footer />
      </div>

      <AdminQuickActions />
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
