// ============================================================
// LAYOUT — v2.2.5
// CookieBanner moved here from Home.jsx — global, home-only
// ============================================================

import { Outlet }            from 'react-router-dom'
import { Navbar }            from './Navbar.jsx'
import { Footer }            from './Footer.jsx'
import { AdminQuickActions } from '../shared/AdminQuickActions.jsx'
import CookieBanner          from '../ui/CookieBanner.jsx'
import { useSiteSettings }   from '../../hooks/useSiteSettings.js'

export function Layout() {
  const { settings } = useSiteSettings()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      {/* CookieBanner self-filters to home page only via useLocation */}
      <CookieBanner enabled={settings?.cookieBanner ?? true} />
    </div>
  )
}
