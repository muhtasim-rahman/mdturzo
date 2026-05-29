// ============================================================
// APP.JSX — v2.2.6
// CHANGED: SectionSnap REMOVED entirely (user request: no auto-scroll-to-section)
// Scroll behavior now handled purely via CSS scroll-snap (index.css)
// ============================================================

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { HelmetProvider }             from 'react-helmet-async'
import { AnimatePresence, motion }    from 'framer-motion'

import { useAuthListener }         from './hooks/useAuth.js'
import { useNotificationListener } from './hooks/useNotifications.js'
import { Layout }                  from './components/layout/Layout.jsx'
import { ToastContainer }          from './components/ui/ToastContainer.jsx'
import { PageProgress }            from './components/ui/PageProgress.jsx'
import { ErrorBoundary }           from './components/ui/ErrorBoundary.jsx'
import { PageSkeleton } from './components/ui/Skeleton.jsx'
import { logout as signOutUser }             from './services/firebase.js'

// Lazy pages
const Home          = lazy(() => import('./pages/Home.jsx'))
const About         = lazy(() => import('./pages/About.jsx'))
const Projects      = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const Feed          = lazy(() => import('./pages/Feed.jsx'))
const Blogs         = lazy(() => import('./pages/Blogs.jsx'))
const BlogDetail    = lazy(() => import('./pages/BlogDetail.jsx'))
const Posts         = lazy(() => import('./pages/Posts.jsx'))
const PostDetail    = lazy(() => import('./pages/PostDetail.jsx'))
const Contact       = lazy(() => import('./pages/Contact.jsx'))
const Login         = lazy(() => import('./pages/Login.jsx'))
const Signup        = lazy(() => import('./pages/Signup.jsx'))
const AuthAction    = lazy(() => import('./pages/AuthAction.jsx'))
const Profile       = lazy(() => import('./pages/Profile.jsx'))
const PublicProfile = lazy(() => import('./pages/PublicProfile.jsx'))
const Admin         = lazy(() => import('./pages/Admin.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy.jsx'))
const NotFound      = lazy(() => import('./pages/NotFound.jsx'))

// Page transition
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0,       transition: { duration: 0.12, ease: 'easeIn' } },
}

const CLICKABLE_SELECTOR = [
  'button:not(:disabled)',
  '[role="button"]',
  'a[class*="btn"]',
  'a[class*="button"]',
  'a.top-nav-link',
  'a.nav-icon-btn',
  'a.hsocial',
  'a.ab-connect-big',
  'a.ab-connect-card',
  'a.ab-cv-action',
  '.card',
  '.badge',
  '.ab-hobby-chip',
  '.ab-fact-pill',
  '.nf-email-card',
  '[data-click-fx]',
].join(',')

const CLICK_IGNORE_SELECTOR = [
  'input',
  'textarea',
  'select',
  'option',
  '[contenteditable="true"]',
  '[data-click-fx-ignore="true"]',
  '[data-ripple-managed="true"]',
].join(',')

function ClickEffect() {
  useEffect(() => {
    const onPointerDown = (event) => {
      if (event.button != null && event.button !== 0) return
      if (!(event.target instanceof Element)) return
      if (event.target.closest(CLICK_IGNORE_SELECTOR)) return

      const target = event.target.closest(CLICKABLE_SELECTOR)
      if (!target) return

      const rect = target.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const size = Math.max(rect.width, rect.height) * 1.5
      const burst = document.createElement('span')
      burst.className = 'click-fx-burst'
      burst.style.width = `${size}px`
      burst.style.height = `${size}px`
      burst.style.left = `${event.clientX - rect.left - size / 2}px`
      burst.style.top = `${event.clientY - rect.top - size / 2}px`

      target.classList.add('click-fx-host')
      target.appendChild(burst)
      window.setTimeout(() => burst.remove(), 680)
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return null
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}

function PageLoader({ fullscreen = false }) {
  return (
    <div className={fullscreen
      ? 'fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg-page)] px-4'
      : 'min-h-[60vh] flex items-center justify-center px-4'}>
      <div style={{
        width: 34, height: 34,
        border: '3px solid var(--border-strong)',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
        flexShrink: 0,
      }} />
    </div>
  )
}

function RouteReady({ children, onReady }) {
  useEffect(() => { onReady?.() }, [onReady])
  return children
}

function RouteBoundary({ children, layout = 'blank', initialPending, onReady }) {
  return (
    <Suspense fallback={initialPending ? <PageLoader fullscreen /> : <PageSkeleton layout={layout} />}>
      <RouteReady onReady={onReady}>
        {children}
      </RouteReady>
    </Suspense>
  )
}

// ScrollToTop: scrolls to top on route change (this is for page navigation, not section snapping)
function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname, location.search])

  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const link = event.target.closest('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return

      const url = new URL(link.href, window.location.href)
      const samePage = url.origin === window.location.origin
        && url.pathname === window.location.pathname
        && url.search === window.location.search
        && !url.hash

      if (!samePage) return
      event.preventDefault()
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

// /logout — auto sign out + redirect
function LogoutPage() {
  const navigate = useNavigate()
  useEffect(() => {
    signOutUser().finally(() => navigate('/', { replace: true }))
  }, [])
  return <PageLoader />
}

function AnimatedRoutes() {
  const location = useLocation()
  const [hasFirstRouteReady, setHasFirstRouteReady] = useState(false)
  const markRouteReady = useCallback(() => setHasFirstRouteReady(true), [])
  const routeElement = (children, layout = 'blank') => (
    <RouteBoundary layout={layout} initialPending={!hasFirstRouteReady} onReady={markRouteReady}>
      <PageWrapper>{children}</PageWrapper>
    </RouteBoundary>
  )

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/home" element={routeElement(<Home />, 'hero')} />
          <Route path="/"               element={routeElement(<Home />, 'hero')} />
          <Route path="/about"          element={routeElement(<About />, 'profile')} />
          <Route path="/projects"       element={routeElement(<Projects />, 'grid')} />
          <Route path="/projects/:slug" element={routeElement(<ProjectDetail />, 'detail')} />
          <Route path="/feed"           element={routeElement(<Feed />, 'list')} />
          <Route path="/blogs"          element={routeElement(<Blogs />, 'list')} />
          <Route path="/blogs/:slug"    element={routeElement(<BlogDetail />, 'detail')} />
          <Route path="/posts"          element={routeElement(<Posts />, 'list')} />
          <Route path="/posts/:slug"    element={routeElement(<PostDetail />, 'detail')} />
          <Route path="/contact"        element={routeElement(<Contact />, 'form')} />
          <Route path="/login"          element={routeElement(<Login />, 'form')} />
          <Route path="/signup"         element={routeElement(<Signup />, 'form')} />
          <Route path="/logout"         element={<LogoutPage />} />
          <Route path="/profile"        element={routeElement(<Profile />, 'profile')} />
          <Route path="/@:username"     element={routeElement(<PublicProfile />, 'profile')} />
          <Route path="/admin"          element={routeElement(<Admin />, 'admin')} />
          <Route path="/admin/:tab"     element={routeElement(<Admin />, 'admin')} />
          <Route path="/privacy-policy" element={routeElement(<PrivacyPolicy />, 'detail')} />
          <Route path="/cookies-policy" element={routeElement(<CookiesPolicy />, 'detail')} />
          <Route path="/404"            element={routeElement(<NotFound />, 'blank')} />
          <Route path="*"               element={routeElement(<NotFound />, 'blank')} />
        </Route>

        {/* Standalone — no navbar/footer */}
        <Route path="/auth/action" element={routeElement(<AuthAction />, 'form')} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useAuthListener()
  useNotificationListener()

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ClickEffect />
        <ScrollToTop />
        {/* SectionSnap removed in v2.2.6 — auto-scroll replaced with CSS scroll-snap (index.css) */}
        <PageProgress />
        <ToastContainer />
        <AnimatedRoutes />
      </ErrorBoundary>
    </HelmetProvider>
  )
}
