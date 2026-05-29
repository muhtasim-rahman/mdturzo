// ============================================================
// LAYOUT — v2.1.1
// Navbar is now relative (scrolls away) — no padding-top needed
// Floating navbar handles sticky navigation at 450px scroll
// ============================================================

import { Outlet }            from 'react-router-dom'
import { Navbar }            from './Navbar.jsx'
import { Footer }            from './Footer.jsx'
import { AdminQuickActions } from '../shared/AdminQuickActions.jsx'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
    </div>
  )
}
