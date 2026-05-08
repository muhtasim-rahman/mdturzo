// ============================================================
// MAIN.JSX — App entry point
// Sentry init + Hotjar init + Firebase Analytics + React render
// ============================================================

import React       from 'react'
import ReactDOM    from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App         from './App.jsx'
import './index.css'

// ── Sentry Error Tracking (graceful if DSN not set) ────────
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
if (SENTRY_DSN) {
  import('@sentry/react').then(({ init, BrowserTracing, Replay }) => {
    init({
      dsn: SENTRY_DSN,
      integrations: [
        new BrowserTracing(),
        new Replay({ maskAllText: true, blockAllMedia: false }),
      ],
      tracesSampleRate:   0.2,
      replaysSessionSampleRate: 0.05,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
    })
    window.__SENTRY_INITIALIZED__ = true
    console.log('[Sentry] Initialized')
  }).catch(() => {})
}

// ── Hotjar / ContentSquare Analytics ──────────────────────
// Note: তুমি দিয়েছ ContentSquare script (a4b49fe204eec)
// VITE_HOTJAR_ID তে site ID set করলে Hotjar init হবে
// ContentSquare script index.html এ <script> tag হিসেবে add করো
const HOTJAR_ID = import.meta.env.VITE_HOTJAR_ID
if (HOTJAR_ID) {
  const hjScript   = document.createElement('script')
  hjScript.async   = true
  hjScript.src     = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=6`
  document.head.appendChild(hjScript)
  console.log('[Hotjar] Initialized, ID:', HOTJAR_ID)
}

// ── Firebase Analytics — initialized in firebase.config.js ─

// ── React render ───────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
