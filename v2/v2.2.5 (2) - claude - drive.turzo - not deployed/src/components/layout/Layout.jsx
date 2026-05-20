// v2.2.5
// ============================================================
// LAYOUT — v2.2.5
// Changes from v2.1.1:
//   - CookieBanner moved here (single global instance)
//   - CookieBanner only visible on home page (isHomePage gate)
//   - Navbar is now relative (scrolls away) — no padding-top needed
//   - Floating navbar handles sticky navigation at 450px scroll
// ============================================================

import { Outlet, useLocation } from 'react-router-dom'
import { Navbar }              from './Navbar.jsx'
import { Footer }              from './Footer.jsx'
import { AdminQuickActions }   from '../shared/AdminQuickActions.jsx'
import CookieBanner            from '../ui/CookieBanner.jsx'

export function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === '/home'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      <CookieBanner enabled={isHomePage} />
    </div>
  )
}
