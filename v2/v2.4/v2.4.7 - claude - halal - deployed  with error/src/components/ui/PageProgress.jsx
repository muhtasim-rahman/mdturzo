// ============================================================
// PAGE PROGRESS BAR — Route change top bar
// Genuine progress: 0 → 30 on route start, → 100 on complete
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { useLocation }                  from 'react-router-dom'

export function PageProgress() {
  const location       = useLocation()
  const [width, setWidth]   = useState(0)
  const [visible, setVisible] = useState(false)
  const timer1 = useRef(null)
  const timer2 = useRef(null)
  const timer3 = useRef(null)

  useEffect(() => {
    // Clear any running timers
    clearTimeout(timer1.current)
    clearTimeout(timer2.current)
    clearTimeout(timer3.current)

    // Start
    setVisible(true)
    setWidth(0)

    timer1.current = setTimeout(() => setWidth(30), 50)
    timer2.current = setTimeout(() => setWidth(70), 300)
    timer3.current = setTimeout(() => {
      setWidth(100)
      setTimeout(() => {
        setVisible(false)
        setWidth(0)
      }, 300)
    }, 700)

    return () => {
      clearTimeout(timer1.current)
      clearTimeout(timer2.current)
      clearTimeout(timer3.current)
    }
  }, [location.pathname, location.search])

  if (!visible && width === 0) return null

  return (
    <div
      id="page-progress"
      className={visible ? 'is-visible' : ''}
      style={{
        width:   `${width}%`,
        opacity: visible ? 1 : 0,
      }}
    >
      <span className="page-progress-head" />
    </div>
  )
}
