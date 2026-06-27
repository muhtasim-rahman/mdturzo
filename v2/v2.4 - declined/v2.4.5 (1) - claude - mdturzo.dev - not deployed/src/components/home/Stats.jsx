// ============================================================
// Stats.jsx — v2.2.0
// Animated stat counters — data from Supabase site_settings
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faFolderOpen,
  faUsers, faStar,
} from '@fortawesome/free-solid-svg-icons'
import { SkeletonBox } from '../ui/Skeleton.jsx'

function useCountUp(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)
  const num = parseInt(String(target), 10) || 0

  useEffect(() => {
    if (!inView || num === 0) { setCount(0); return }
    let start = 0
    const totalSteps = Math.ceil(duration / 16)
    const increment = num / totalSteps
    const timer = setInterval(() => {
      start += increment
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, num, duration])

  return count
}

function StatCard({ icon, color, value, label, suffix = '+', delay = 0, inView }) {
  const num   = parseInt(String(value), 10) || 0
  const count = useCountUp(num, 1800, inView)

  return (
    <motion.div
      className="card flex flex-col items-center text-center p-6 gap-3 hover:border-[var(--accent-primary)]
                 transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, color }}
      >
        <FontAwesomeIcon icon={icon} className="text-lg" />
      </div>
      <div>
        <div className="text-3xl font-display font-extrabold text-[var(--text-primary)]">
          <span style={{ color }}>{count}</span>
          <span className="text-[var(--text-tertiary)] text-xl ml-0.5">{suffix}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5 font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

function SkeletonStatCard() {
  return (
    <div className="card flex flex-col items-center text-center p-6 gap-3">
      <SkeletonBox w="w-12" h="h-12" rounded="rounded-xl" />
      <div className="w-full flex flex-col items-center gap-2">
        <SkeletonBox w="w-20" h="h-8" rounded="rounded" />
        <SkeletonBox w="w-28" h="h-4" rounded="rounded" delay={0.05} />
      </div>
    </div>
  )
}

export default function Stats({ settings, settingsLoading }) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const stats = [
    {
      icon: faCode,
      color: '#3B82F6',
      value: settings?.statsYearsDev ?? '3',
      label: 'Years Web Development',
      delay: 0,
    },
    {
      icon: faPalette,
      color: '#EC4899',
      value: settings?.statsYearsDesign ?? '6',
      label: 'Years Design Experience',
      delay: 0.08,
    },
    {
      icon: faFolderOpen,
      color: '#F59E0B',
      value: settings?.projectCount ?? 0,
      label: 'Projects Completed',
      delay: 0.16,
    },
    {
      icon: faStar,
      color: '#10B981',
      value: 5,
      label: 'Avg. Client Rating',
      suffix: '/5',
      delay: 0.24,
    },
  ]

  return (
    <section className="section" ref={sectionRef}>
      <div className="container-xl">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
            By the numbers
          </p>
          <h2 className="text-3xl font-display font-bold text-[var(--text-primary)]">
            Experience & Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {settingsLoading
            ? Array.from({ length: 4 }, (_, i) => <SkeletonStatCard key={i} />)
            : stats.map((s) => (
                <StatCard key={s.label} {...s} inView={inView} />
              ))
          }
        </div>
      </div>
    </section>
  )
}
