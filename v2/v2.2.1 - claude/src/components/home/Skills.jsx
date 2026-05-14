// ============================================================
// Skills.jsx — v2.2.0
// Skills showcase — star ratings, categories, animated bars
// ============================================================

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode, faPalette, faBrain, faVideo,
  faStar, faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

const SKILL_CATEGORIES = [
  {
    label: 'Web Development',
    icon: faCode,
    color: '#3B82F6',
    skills: [
      { name: 'HTML & CSS',    pct: 88, stars: 4   },
      { name: 'JavaScript',    pct: 52, stars: 2.5 },
      { name: 'React',         pct: 55, stars: 2.5 },
      { name: 'Git & GitHub',  pct: 78, stars: 4   },
      { name: 'Python',        pct: 62, stars: 3   },
      { name: 'Java',          pct: 42, stars: 2   },
    ],
  },
  {
    label: 'Design & Creative',
    icon: faPalette,
    color: '#EC4899',
    skills: [
      { name: 'Logo Design',      pct: 80, stars: 4   },
      { name: 'Banner / Poster',  pct: 82, stars: 4   },
      { name: 'Thumbnail Design', pct: 85, stars: 4.5 },
      { name: 'UI / Web Design',  pct: 75, stars: 4   },
      { name: 'Photo Editing',    pct: 72, stars: 3.5 },
    ],
  },
  {
    label: 'AI & Productivity',
    icon: faBrain,
    color: '#00D4FF',
    skills: [
      { name: 'AI Prompting',   pct: 92, stars: 4.5 },
      { name: 'AI Coding',      pct: 90, stars: 4.5 },
      { name: 'AI Design',      pct: 85, stars: 4   },
      { name: 'Docs & Planning',pct: 88, stars: 4   },
    ],
  },
  {
    label: 'Video Editing',
    icon: faVideo,
    color: '#A855F7',
    skills: [
      { name: 'YouTube Videos',  pct: 72, stars: 3.5 },
      { name: 'Short Reels',     pct: 68, stars: 3.5 },
      { name: 'Basic Animation', pct: 55, stars: 3   },
      { name: 'Ads / Promos',    pct: 60, stars: 3   },
    ],
  },
]

function StarRating({ stars }) {
  return (
    <div className="flex gap-0.5 text-[11px]" aria-label={`${stars} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = stars >= i
        const half   = !filled && stars >= i - 0.5
        return (
          <FontAwesomeIcon
            key={i}
            icon={half ? faStarHalfStroke : filled ? faStar : faStarEmpty}
            className={filled || half ? 'text-amber-400' : 'text-[var(--border-strong)]'}
          />
        )
      })}
    </div>
  )
}

function SkillBar({ name, pct, stars, color, index }) {
  return (
    <motion.div
      className="space-y-1.5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-[var(--text-secondary)] font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <StarRating stars={stars} />
          <span className="text-xs text-[var(--text-tertiary)] w-8 text-right">{pct}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

function CategoryCard({ label, icon, color, skills, cardIndex }) {
  return (
    <motion.div
      className="card p-6 space-y-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: cardIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, color }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="font-display font-semibold text-[var(--text-primary)]">{label}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <SkillBar key={skill.name} {...skill} color={color} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section className="section">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
            What I Know
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
            Skills &amp; Expertise
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Self-rated skill levels based on real project experience. Currently improving
            JavaScript &amp; React — on a focused learning journey.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.label} {...cat} cardIndex={i} />
          ))}
        </div>

        {/* Learning note */}
        <motion.p
          className="text-center text-xs text-[var(--text-tertiary)] mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FontAwesomeIcon icon={faBrain} className="mr-1.5 text-[var(--accent-primary)]" />
          Currently learning: React, Advanced JavaScript, Firebase — actively building projects to improve.
        </motion.p>
      </div>
    </section>
  )
}
