// ============================================================
// ERROR BOUNDARY — Unhandled render errors catch
// ============================================================

import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faRotateRight } from '@fortawesome/free-solid-svg-icons'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
    // Sentry v2.0.0 setup এ graceful — later versions এ capture
    try {
      if (window.__SENTRY_INITIALIZED__) {
        import('@sentry/react').then(({ captureException }) => {
          captureException(error, { extra: info })
        })
      }
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
          <div className="text-red-400 mb-4">
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-5xl" />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Something went wrong
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-sm">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors"
          >
            <FontAwesomeIcon icon={faRotateRight} />
            Refresh Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-6 text-xs text-red-300 bg-red-950/30 p-4 rounded-lg max-w-lg text-left overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
