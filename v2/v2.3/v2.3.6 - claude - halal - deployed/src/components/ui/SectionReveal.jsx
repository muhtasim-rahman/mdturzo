// ============================================================
// SECTION REVEAL — v2.3.6
// IntersectionObserver wrapper for progressive section rendering.
// Shows a section-specific skeleton until the section scrolls
// near the viewport, then fades the real content in. Reduces
// initial paint cost on Home/About (many heavy sections).
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function SectionReveal({ children, skeleton = null, rootMargin = '160px', once = true }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const node = ref.current
    if (!node) return

    // No IntersectionObserver support (very old browser) — just show it
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) obs.disconnect()
          }
        })
      },
      { rootMargin, threshold: 0.01 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [visible, rootMargin, once])

  return (
    <div ref={ref}>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      ) : (
        skeleton
      )}
    </div>
  )
}

export default SectionReveal
