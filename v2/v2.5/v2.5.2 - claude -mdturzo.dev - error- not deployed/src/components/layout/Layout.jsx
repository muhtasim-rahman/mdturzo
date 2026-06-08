// ============================================================
// LAYOUT — v2.5.2
// Change: ALL pages now behave like isHome — transparent navbar
// everywhere. Each page manages its own top padding.
// pt-navbar removed from main for all pages.
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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>

      {/* DevBanner — outside inner wrapper, always at very top */}
      <DevBanner />

      {/* Inner wrapper — position:relative gives Navbar its containing block */}
      <div className="relative flex-1 flex flex-col">
        {/* Navbar is now ALWAYS transparent/absolute (like home page)
            Each page component manages its own top spacing via
            paddingTop: 'var(--navbar-h)' in its first section */}
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      <AdminQuickActions />
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
