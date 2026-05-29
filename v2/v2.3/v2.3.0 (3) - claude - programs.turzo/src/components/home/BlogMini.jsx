// BlogMini.jsx — v2.2.0
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faTag } from '@fortawesome/free-solid-svg-icons'
import { getFeedItems } from '../../services/supabase.js'
import { SkeletonBox } from '../ui/Skeleton.jsx'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const d = Math.floor(diff / 86400000)
  if (d < 1) return 'Today'
  if (d < 7) return `${d}d ago`
  if (d < 30) return `${Math.floor(d/7)}w ago`
  return `${Math.floor(d/30)}mo ago`
}

function PostCard({ post, i }) {
  return (
    <motion.article
      className="card group flex flex-col gap-4 p-5 hover:border-[var(--accent-primary)] transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16,1,0.3,1] }}>
      {post.thumbnail_url && (
        <div className="h-40 rounded-lg overflow-hidden -mx-5 -mt-5 mb-0">
          <img src={post.thumbnail_url} alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
      )}
      <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)]">
        {post.category && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
            bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium">
            <FontAwesomeIcon icon={faTag} className="text-[8px]" />{post.category}
          </span>
        )}
        <span className="flex items-center gap-1 ml-auto">
          <FontAwesomeIcon icon={faClock} />{timeAgo(post.created_at)}
        </span>
      </div>
      <h3 className="font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2
        group-hover:text-[var(--accent-primary)] transition-colors duration-200">
        {post.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed flex-1">
        {post.excerpt || post.short_description}
      </p>
      <Link to={`/feed/${post.slug}`}
        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)]
          hover:gap-2.5 transition-all duration-200 group/link mt-auto">
        Read more <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
      </Link>
    </motion.article>
  )
}

export default function BlogMini() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeedItems({ limit: 3 })
      .then(data => setPosts(data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && posts.length === 0) return null

  return (
    <section className="section">
      <div className="container-xl">
        <div className="flex items-end justify-between gap-4 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Latest</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">From the Feed</h2>
          </motion.div>
          <Link to="/feed" className="text-sm font-semibold text-[var(--text-secondary)]
            hover:text-[var(--accent-primary)] transition-colors duration-200
            inline-flex items-center gap-1.5 group flex-shrink-0">
            All posts <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loading
            ? Array.from({length:3}, (_,i) => (
                <div key={i} className="card p-5 space-y-4">
                  <SkeletonBox h="h-40" rounded="rounded-lg" />
                  <SkeletonBox h="h-4" w="w-3/4" rounded="rounded" delay={0.05} />
                  <SkeletonBox h="h-3" w="w-1/2" rounded="rounded" delay={0.08} />
                </div>
              ))
            : posts.map((p, i) => <PostCard key={p.id} post={p} i={i} />)
          }
        </div>
      </div>
    </section>
  )
}
