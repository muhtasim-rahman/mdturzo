// Testimonials.jsx — v2.2.0
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { getApprovedReviews } from '../../services/supabase.js'
import { SkeletonBox, SkeletonCircle } from '../ui/Skeleton.jsx'

const FALLBACK = [
  { id: 1, reviewer_name: 'Arif Hossain', reviewer_role: 'Client — Logo Design', rating: 5, body: 'Exceptional design work! Muhtasim delivered a professional logo that perfectly captured my brand vision. Fast, communicative, and highly skilled.', avatar_url: null },
  { id: 2, reviewer_name: 'Tanvir Ahmed', reviewer_role: 'Client — Website', rating: 5, body: 'The portfolio website he built for me was clean, fast, and exactly what I needed. Great attention to detail and responsive to feedback.', avatar_url: null },
  { id: 3, reviewer_name: 'Rina Begum', reviewer_role: 'Client — Thumbnail Design', rating: 4, body: 'Loved the YouTube thumbnails — vibrant and eye-catching. Click-through rate improved noticeably after switching to his designs.', avatar_url: null },
]

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <FontAwesomeIcon key={i} icon={faStar}
          className={`text-xs ${i <= n ? 'text-amber-400' : 'text-[var(--border-strong)]'}`} />
      ))}
    </div>
  )
}

function ReviewCard({ r, i }) {
  const initials = r.reviewer_name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
  return (
    <motion.div className="card p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16,1,0.3,1] }}>
      <FontAwesomeIcon icon={faQuoteLeft} className="text-[var(--accent-primary)] opacity-30 text-2xl" />
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 italic">"{r.body}"</p>
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          {r.avatar_url
            ? <img src={r.avatar_url} alt={r.reviewer_name} className="w-9 h-9 rounded-full object-cover" />
            : <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] text-xs font-bold flex-shrink-0">{initials}</div>
          }
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{r.reviewer_name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">{r.reviewer_role}</p>
          </div>
        </div>
        <Stars n={r.rating} />
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApprovedReviews({ limit: 6 })
      .then(data => setReviews(data?.length ? data : FALLBACK))
      .catch(() => setReviews(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Kind Words</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Client Reviews</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loading
            ? Array.from({length:3}, (_,i) => (
                <div key={i} className="card p-6 space-y-4">
                  <SkeletonBox h="h-4" w="w-8" rounded="rounded" />
                  <SkeletonBox h="h-16" rounded="rounded" delay={0.05} />
                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)]">
                    <SkeletonCircle size={36} />
                    <div className="space-y-1.5 flex-1">
                      <SkeletonBox h="h-3.5" w="w-28" rounded="rounded" delay={0.08} />
                      <SkeletonBox h="h-3" w="w-20" rounded="rounded" delay={0.1} />
                    </div>
                  </div>
                </div>
              ))
            : reviews.map((r, i) => <ReviewCard key={r.id} r={r} i={i} />)
          }
        </div>
      </div>
    </section>
  )
}
