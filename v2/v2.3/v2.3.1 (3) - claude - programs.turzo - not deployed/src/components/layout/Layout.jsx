// LAYOUT — v2.3.1
// Fix: About page also excluded from pt-navbar (like Home)
// Hero sections on Home & About handle their own top padding

import { Outlet, useLocation }  from 'react-router-dom'
import { Navbar }               from './Navbar.jsx'
import { Footer }               from './Footer.jsx'
import { AdminQuickActions }    from '../shared/AdminQuickActions.jsx'
import CookieBanner             from '../ui/CookieBanner.jsx'
import { useSiteSettings }      from '../../hooks/useSiteSettings.js'

export function Layout() {
  const location = useLocation()
  const { settings } = useSiteSettings()
  const cookieEnabled = settings?.cookieBanner ?? true

  // Pages that manage their own top padding (hero sections handle navbar offset internally)
  const noNavPadPages = ['/', '/home', '/about']
  const needsNavPad = !noNavPadPages.includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      <main className={`flex-1${needsNavPad ? ' pt-navbar' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <AdminQuickActions />
      <CookieBanner enabled={cookieEnabled} pathname={location.pathname} />
    </div>
  )
}
