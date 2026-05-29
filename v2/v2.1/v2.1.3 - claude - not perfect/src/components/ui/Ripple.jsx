// ============================================================
// RIPPLE — Universal click ripple effect
// Usage: wrap any button with useRipple() hook
// ============================================================

import { useState, useCallback } from 'react'

export function useRipple() {
  const [ripples, setRipples] = useState([])

  const createRipple = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top  - size / 2
    const id = `${Date.now()}-${Math.random()}`

    setRipples((prev) => [...prev, { id, x, y, size }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 580)
  }, [])

  return { ripples, createRipple }
}

// Render inside a `position: relative; overflow: hidden` container
export function RippleLayer({ ripples, color }) {
  return (
    <>
      {ripples.map(({ id, x, y, size }) => (
        <span
          key={id}
          aria-hidden
          style={{
            position:      'absolute',
            left:          x,
            top:           y,
            width:         size,
            height:        size,
            borderRadius:  '50%',
            background:    color,
            transform:     'scale(0)',
            animation:     'ripple-expand 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}
