// ============================================================
// SECTION ERROR BOUNDARY — v2.3.6
// Per-section failure isolation: if ONE section throws during
// render, only that section shows a fallback card — the rest of
// the page (navbar, other sections, footer) keeps working.
// Minimal/neutral styling (no red alarm colors) — fits both themes.
// Usage:
//   <SectionErrorBoundary name="Skills">
//     <Skills />
//   </SectionErrorBoundary>
// ============================================================

import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, retryKey: 0 }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Contained — logged with section name, never bubbles up to the page
    console.warn(`[SectionErrorBoundary:${this.props.name || 'section'}]`, error, info)
    try {
      if (window.__SENTRY_INITIALIZED__) {
        import('@sentry/react').then(({ captureException }) => {
          captureException(error, { extra: { ...info, section: this.props.name } })
        })
      }
    } catch {}
  }

  handleRetry = () => {
    this.setState(prev => ({ hasError: false, error: null, retryKey: prev.retryKey + 1 }))
  }

  render() {
    if (this.state.hasError) {
      const compact = this.props.compact
      return (
        <div
          role="alert"
          className={`sec-err-card ${compact ? 'sec-err-card--compact' : ''}`}
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="sec-err-icon" />
          <p className="sec-err-text">
            {this.props.label || `This section couldn't load right now.`}
          </p>
          <button onClick={this.handleRetry} className="sec-err-retry" type="button">
            <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
            Try again
          </button>

          <style>{`
            .sec-err-card {
              display: flex; flex-direction: column; align-items: center; gap: .65rem;
              text-align: center;
              padding: 2.5rem 1.5rem;
              margin: 0 auto;
              max-width: 420px;
              border: 1px dashed var(--border-strong);
              border-radius: 16px;
              background: var(--bg-surface-2);
              color: var(--text-secondary);
            }
            .sec-err-card--compact { padding: 1.25rem 1rem; max-width: 100%; }
            .sec-err-icon { font-size: 1.5rem; color: var(--text-tertiary); }
            .sec-err-text { font-size: .85rem; line-height: 1.5; }
            .sec-err-retry {
              display: inline-flex; align-items: center; gap: .4rem;
              font-size: .78rem; font-weight: 600;
              padding: .45rem .9rem; border-radius: 9999px;
              border: 1px solid var(--border-color);
              color: var(--text-primary);
              background: var(--bg-surface);
              transition: border-color .15s, color .15s;
            }
            .sec-err-retry:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
          `}</style>
        </div>
      )
    }
    // key forces a clean remount of children after retry (clears any bad internal state too)
    return <div key={this.state.retryKey}>{this.props.children}</div>
  }
}

export default SectionErrorBoundary
