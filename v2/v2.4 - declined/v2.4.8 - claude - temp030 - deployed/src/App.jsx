// ============================================================
// APP.JSX — v2.4.6
// ROUTING CHANGES:
//   * /project           → redirect to /projects
//   * /project/:slug     → canonical project detail URL (new)
//   * /projects/:slug    → redirect to /project/:slug
// (old /projects/:slug links still work via redirect)
// CHANGED:
//   * ClickEffect: expanded CLICKABLE_SELECTOR to include
//     anchor buttons, badges, chips, social cards, etc.
//     Minimal, light/dark friendly ripple burst.
//   * ScrollToTop: now also fires when clicking a NavLink
//     that is already on the same page (pathname match),
//     so same-page nav links scroll to top without reload.
// ============================================================

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { HelmetProvider }             from 'react-helmet-async'
import { AnimatePresence, motion }    from 'framer-motion'

import { useAuthListener }         from './hooks/useAuth.js'
import { useNotificationListener } from './hooks/useNotifications.js'
import { Layout }                  from './components/layout/Layout.jsx'
import { ToastContainer }          from './components/ui/ToastContainer.jsx'
import { PageProgress }            from './components/ui/PageProgress.jsx'
import { ErrorBoundary }           from './components/ui/ErrorBoundary.jsx'
import { PageSkeleton } from './components/ui/Skeleton.jsx'
import HomeSkeleton          from './components/skeletons/HomeSkeleton.jsx'
import AboutSkeleton         from './components/skeletons/AboutSkeleton.jsx'
import ProjectsSkeleton      from './components/skeletons/ProjectsSkeleton.jsx'
import ProjectDetailSkeleton from './components/skeletons/ProjectDetailSkeleton.jsx'
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

// ── Click Effect ─────────────────────────────────────────────
// Matches buttons, cards, anchor-buttons, badges, chips, social cards,
// and any element with data-click-fx attribute.
const CLICKABLE_SELECTOR = [
  'button:not(:disabled)',
  '[role="button"]',
  '.card',
  '[data-click-fx]',
  // Anchor tags that look like buttons (have a class including "btn", "badge", "chip", "pill", "tab")
  'a[class*="btn"]',
  'a[class*="badge"]',
  'a[class*="chip"]',
  'a[class*="pill"]',
  'a[class*="tab"]',
  'a[class*="soc"]',
  'a[class*="card"]',
  // Common utility class patterns
  '[class*="-btn"]',
  '[class*="-badge"]',
  '[class*="-chip"]',
  '[class*="-pill"]',
  '[class*="-tab"]:not(input)',
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
      burst.style.width  = `${size}px`
      burst.style.height = `${size}px`
      burst.style.left   = `${event.clientX - rect.left - size / 2}px`
      burst.style.top    = `${event.clientY - rect.top  - size / 2}px`

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
  const fallback = initialPending ? <PageLoader fullscreen /> : (() => {
    switch (layout) {
      case 'hero':    return <HomeSkeleton />
      case 'profile': return <AboutSkeleton />
      case 'grid':    return <ProjectsSkeleton />
      case 'detail':  return <ProjectDetailSkeleton />
      default:        return <PageSkeleton layout={layout} />
    }
  })()
  return (
    <Suspense fallback={fallback}>
      <RouteReady onReady={onReady}>
        {children}
      </RouteReady>
    </Suspense>
  )
}

// ── ScrollToTop ───────────────────────────────────────────────
// Scrolls to top on route change.
// Also intercepts NavLink clicks for same-page navigation
// (clicking a nav link while already on that page → scroll to top, no reload).
function ScrollToTop() {
  const location  = useLocation()
  const prevPath  = useRef(location.pathname)

  // On route change: scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    prevPath.current = location.pathname
  }, [location.pathname, location.search])

  // Same-page click: intercept NavLink anchors pointing to current path
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return

      // Normalize: remove trailing slash
      const normalize = (p) => p.replace(/\/$/, '') || '/'
      const targetPath = normalize(href)
      const currentPath = normalize(window.location.pathname)

      if (targetPath === currentPath) {
        // Same page — scroll to top without navigation
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
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

// /projects/:slug → redirect to canonical /project/:slug
function ProjectsSlugRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/project/${slug}`} replace />
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
          {/* /projects/:slug → redirect to canonical /project/:slug */}
          <Route path="/projects/:slug" element={<ProjectsSlugRedirect />} />
          {/* Canonical project detail URL */}
          <Route path="/project"        element={<Navigate to="/projects" replace />} />
          <Route path="/project/:slug"  element={routeElement(<ProjectDetail />, 'detail')} />
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
        <PageProgress />
        <ToastContainer />
        <AnimatedRoutes />
      </ErrorBoundary>
    </HelmetProvider>
  )
}
