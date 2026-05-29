// ============================================================
// LAYOUT — Navbar + main content + Footer
// v2.0.0: placeholder Navbar/Footer — fully built in v2.1.0
// ============================================================

import { Outlet }             from 'react-router-dom'
import { AdminQuickActions }  from '../shared/AdminQuickActions.jsx'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Navbar — fully built in v2.1.0 */}
      <header className="h-16 flex items-center justify-center border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <span className="font-mono font-bold text-[var(--accent)] text-lg">
          @mdturzo999
        </span>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer — fully built in v2.1.0 */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center">
        <p className="text-[var(--text-muted)] text-sm">
          &copy; {new Date().getFullYear()} Muhtasim Rahman — All rights reserved
        </p>
      </footer>

      <AdminQuickActions />
    </div>
  )
}
