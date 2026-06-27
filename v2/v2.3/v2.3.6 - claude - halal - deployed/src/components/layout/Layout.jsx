// ============================================================
// LAYOUT — v2.3.6
// CHANGES (v2.3.6):
//   * Added <DevBanner /> above everything else, OUTSIDE the inner
//     "relative" wrapper. On home/about, Navbar is `position: absolute`
//     -- by keeping it inside this inner relative wrapper (which itself
//     sits BELOW DevBanner in normal flow), the Navbar's "top: 0" lands
//     right under the banner and can never visually overlap it.
//   * Navbar.jsx separately observes the banner's real height via
//     ResizeObserver, to correctly offset the floating navbar + mega
//     menu (both `position: fixed`, so they ignore normal flow and
//     need the offset explicitly).
// PREVIOUS (v2.3.1):
//   * Added '/about' to isHome paths — about page hero handles
//     its own top padding (same as home), prevents double padding
// ============================================================

import { Outlet, useLocation }  from 'react-router-dom'
import { Navbar }               from './Navbar.jsx'
import { Footer }               from './Footer.jsx'
import { AdminQuickActions }    from '../shared/AdminQuickActions.jsx'
import { DevBanner }            from '../ui/DevBanner.jsx'
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
      <DevBanner />
      <div className="relative flex-1 flex flex-col">
        <Navbar />
        <main className={`flex-1${isHome ? '' : ' pt-navbar'}`}>
          <Outlet />
        </main>
        <Footer />
        <AdminQuickActions />
        {/* CookieBanner — home-only, localStorage persisted */}
        <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
      </div>
    </div>
  )
}
