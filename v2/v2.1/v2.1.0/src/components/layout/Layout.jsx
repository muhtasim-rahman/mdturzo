// ============================================================
// LAYOUT — v2.1.0
// Full Navbar + Footer integrated
// ============================================================

import { Outlet }            from 'react-router-dom'
import { Navbar }            from './Navbar.jsx'
import { Footer }            from './Footer.jsx'
import { AdminQuickActions } from '../shared/AdminQuickActions.jsx'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />

      {/* Main page content — offset by navbar height */}
      <main className="flex-1 pt-[var(--navbar-h)]">
        <Outlet />
      </main>

      <Footer />
      <AdminQuickActions />
    </div>
  )
}
