// ============================================================
// MAIN.JSX v2.0.1
// - BrowserRouter future flags → React Router v7 warnings fix
// - Sentry + Hotjar graceful init
// ============================================================

import React       from 'react'
import ReactDOM    from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App         from './App.jsx'
import './index.css'

// ── Sentry (graceful — skip if DSN not set) ────────────────
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
if (SENTRY_DSN) {
  import('@sentry/react').then(({ init, BrowserTracing, Replay }) => {
    init({
      dsn:              SENTRY_DSN,
      integrations:     [new BrowserTracing(), new Replay({ maskAllText: true })],
      tracesSampleRate: 0.2,
      replaysOnErrorSampleRate: 1.0,
      environment:      import.meta.env.MODE,
    })
    window.__SENTRY_INITIALIZED__ = true
  }).catch(() => {})
}

// ── Hotjar (graceful — skip if ID not set) ─────────────────
const HOTJAR_ID = import.meta.env.VITE_HOTJAR_ID
if (HOTJAR_ID) {
  const s = document.createElement('script')
  s.async = true
  s.src   = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=6`
  document.head.appendChild(s)
}

// ── Render ─────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition:   true,   // fixes "wrap state in startTransition" warning
        v7_relativeSplatPath: true,   // fixes "relative splat path" warning
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
