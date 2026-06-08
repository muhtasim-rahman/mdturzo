// ReadingProgress.jsx — v2.5.0
// Thin progress bar showing scroll % through the blog article.
// Distinct from PageProgress (page load bar) — different color + position.

import { useState, useEffect, useRef } from 'react'

export default function ReadingProgress({ articleRef }) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const el = articleRef?.current
      if (!el) return

      const { top, height } = el.getBoundingClientRect()
      const windowH = window.innerHeight

      // How far the article top has passed the viewport top
      const scrolled = -top
      // Total scrollable area of the article (minus viewport height to avoid going 100% too early)
      const total = height - windowH

      if (total <= 0) {
        setProgress(0)
        return
      }

      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100))
      setProgress(pct)
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [articleRef])

  if (progress <= 0) return null

  return (
    <div className="reading-progress-bar" aria-hidden="true">
      <div
        className="reading-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
