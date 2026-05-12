// ============================================================
// APP.JSX — v2.1.0
// Added: /feed route, /logout route
// React Router future flags, AnimatePresence page transitions
// ============================================================

import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { HelmetProvider }             from 'react-helmet-async'
import { AnimatePresence, motion }    from 'framer-motion'

import { useAuthListener }         from './hooks/useAuth.js'
import { useNotificationListener } from './hooks/useNotifications.js'
import { Layout }                  from './components/layout/Layout.jsx'
import { ToastContainer }          from './components/ui/ToastContainer.jsx'
import { PageProgress }            from './components/ui/PageProgress.jsx'
import { ErrorBoundary }           from './components/ui/ErrorBoundary.jsx'
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

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" />
    </div>
  )
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/"               element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about"          element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/projects"       element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/projects/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
          <Route path="/feed"           element={<PageWrapper><Feed /></PageWrapper>} />
          <Route path="/blogs"          element={<PageWrapper><Blogs /></PageWrapper>} />
          <Route path="/blogs/:slug"    element={<PageWrapper><BlogDetail /></PageWrapper>} />
          <Route path="/posts"          element={<PageWrapper><Posts /></PageWrapper>} />
          <Route path="/posts/:slug"    element={<PageWrapper><PostDetail /></PageWrapper>} />
          <Route path="/contact"        element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/login"          element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup"         element={<PageWrapper><Signup /></PageWrapper>} />
          <Route path="/logout"         element={<LogoutPage />} />
          <Route path="/profile"        element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/@:username"     element={<PageWrapper><PublicProfile /></PageWrapper>} />
          <Route path="/admin"          element={<PageWrapper><Admin /></PageWrapper>} />
          <Route path="/admin/:tab"     element={<PageWrapper><Admin /></PageWrapper>} />
          <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
          <Route path="/cookies-policy" element={<PageWrapper><CookiesPolicy /></PageWrapper>} />
          <Route path="/404"            element={<PageWrapper><NotFound /></PageWrapper>} />
          <Route path="*"              element={<PageWrapper><NotFound /></PageWrapper>} />
        </Route>

        {/* Standalone — no navbar/footer */}
        <Route path="/auth/action" element={<PageWrapper><AuthAction /></PageWrapper>} />
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
        <PageProgress />
        <ToastContainer />
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
