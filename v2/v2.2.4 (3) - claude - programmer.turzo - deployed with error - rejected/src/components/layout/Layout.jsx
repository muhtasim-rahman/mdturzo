// ============================================================
// LAYOUT — v2.2.4
// CookieBanner moved here from Home.jsx — shows globally
// ============================================================

import { Outlet }            from 'react-router-dom'
import { Navbar }            from './Navbar.jsx'
import { Footer }            from './Footer.jsx'
import { AdminQuickActions } from '../shared/AdminQuickActions.jsx'
import CookieBanner          from '../ui/CookieBanner.jsx'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      <CookieBanner />
    </div>
  )
}
