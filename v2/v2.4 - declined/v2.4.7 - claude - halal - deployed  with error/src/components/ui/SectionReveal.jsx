// SectionReveal.jsx — v2.4.6
// Progressively reveals sections as they enter the viewport.
// Used in Home.jsx and About.jsx to load sections one-by-one
// instead of rendering everything at once.
//
// Usage:
//   <SectionReveal skeletonH={320}>
//     <MySection />
//   </SectionReveal>
//
// - Shows a skeleton placeholder until the section is near viewport
// - Uses IntersectionObserver (100px rootMargin → pre-loads slightly early)
// - Fades in with Framer Motion when visible

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function SectionReveal({ children, skeletonH = 280 }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
          {children}
        </motion.div>
      ) : (
        <div
          style={{ minHeight: skeletonH }}
          className="sk rounded-2xl mx-4 sm:mx-6 lg:mx-8 xl:mx-0"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
