// ============================================================
// APP.JSX — Root component
// React Router v6, Auth listener, Theme init, all routes
// ============================================================

import { lazy, Suspense }   from 'react'
import { Routes, Route }     from 'react-router-dom'
import { HelmetProvider }    from 'react-helmet-async'

import { useAuthListener }          from './hooks/useAuth.js'
import { useNotificationListener }  from './hooks/useNotifications.js'
import { Layout }                   from './components/layout/Layout.jsx'
import { ToastContainer }           from './components/ui/ToastContainer.jsx'
import { PageProgress }             from './components/ui/PageProgress.jsx'
import { ErrorBoundary }            from './components/ui/ErrorBoundary.jsx'
import { SkeletonText }             from './components/ui/Skeleton.jsx'

// Lazy loaded pages for code splitting
const Home          = lazy(() => import('./pages/Home.jsx'))
const About         = lazy(() => import('./pages/About.jsx'))
const Projects      = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
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

// Fallback while lazy pages load
function PageLoader() {
  return (
    <div className="section container-lg">
      <SkeletonText lines={4} className="max-w-md" />
    </div>
  )
}

export default function App() {
  // Start Firebase Auth listener (runs once, updates Zustand store)
  useAuthListener()

  // Start Firebase RTDB notification listener
  useNotificationListener()

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <PageProgress />
        <ToastContainer />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Main layout wrapper ─────────────────────── */}
            <Route element={<Layout />}>
              <Route path="/"               element={<Home />} />
              <Route path="/about"          element={<About />} />
              <Route path="/projects"       element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/blogs"          element={<Blogs />} />
              <Route path="/blogs/:slug"    element={<BlogDetail />} />
              <Route path="/posts"          element={<Posts />} />
              <Route path="/posts/:slug"    element={<PostDetail />} />
              <Route path="/contact"        element={<Contact />} />
              <Route path="/login"          element={<Login />} />
              <Route path="/signup"         element={<Signup />} />
              <Route path="/profile"        element={<Profile />} />
              <Route path="/@:username"     element={<PublicProfile />} />
              <Route path="/admin"          element={<Admin />} />
              <Route path="/admin/:tab"     element={<Admin />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/404"            element={<NotFound />} />
              <Route path="*"              element={<NotFound />} />
            </Route>

            {/* ── Standalone (no navbar/footer) ───────────── */}
            <Route path="/auth/action" element={<AuthAction />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
