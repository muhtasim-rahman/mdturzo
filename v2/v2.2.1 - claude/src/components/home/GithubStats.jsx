// ============================================================
// GithubStats.jsx — v2.2.0
// GitHub stats using github-readme-stats API embeds
// ============================================================

import { useState } from 'react'
import { motion }   from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { SkeletonBox } from '../ui/Skeleton.jsx'
import { SITE_CONFIG } from '../../config/site.config.js'

const GH_USER    = 'muhtasim-rahman'
const GH_PROFILE = SITE_CONFIG.social.github

// Theme params for each card
// We use transparent bg so the card background shows through
const statsParams  = `?username=${GH_USER}&show_icons=true&count_private=false&hide_border=true&bg_color=00000000&title_color=3B82F6&icon_color=3B82F6&text_color=94A3B8&ring_color=3B82F6`
const langParams   = `?username=${GH_USER}&layout=compact&hide_border=true&bg_color=00000000&title_color=3B82F6&text_color=94A3B8`
const streakParams = `?user=${GH_USER}&hide_border=true&background=00000000&stroke=3B82F6&ring=3B82F6&fire=F59E0B&currStreakLabel=94A3B8&sideLabels=94A3B8&dates=475569&sideNums=F8FAFC&currStreakNum=F8FAFC`

function GhCard({ src, alt, title, delay = 0, wide = false }) {
  const [loaded, setLoaded] = useState(false)
  const [error,  setError]  = useState(false)

  return (
    <motion.div
      className={`card p-4 flex flex-col gap-3 overflow-hidden ${wide ? 'col-span-1 md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">{title}</p>
      <div className="relative min-h-[120px] flex items-center justify-center">
        {!loaded && !error && (
          <div className="absolute inset-0 flex flex-col gap-2 p-2">
            <SkeletonBox h="h-4" w="w-1/3" rounded="rounded" />
            <SkeletonBox h="h-16" rounded="rounded-lg" delay={0.05} />
            <SkeletonBox h="h-3" w="w-2/3" rounded="rounded" delay={0.1} />
          </div>
        )}
        {error ? (
          <div className="text-center py-6">
            <FontAwesomeIcon icon={faGithub} className="text-3xl text-[var(--text-tertiary)] mb-2" />
            <p className="text-xs text-[var(--text-tertiary)]">
              Could not load GitHub stats.{' '}
              <a href={GH_PROFILE} target="_blank" rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline">
                View on GitHub
              </a>
            </p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full transition-opacity duration-500"
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
            onError={() => { setError(true); setLoaded(true) }}
            loading="lazy"
          />
        )}
      </div>
    </motion.div>
  )
}

export default function GithubStats() {
  return (
    <section className="section">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
              Open Source
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
              GitHub Stats
            </h2>
          </motion.div>

          <motion.a
            href={GH_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold
              text-[var(--text-secondary)] hover:text-[var(--accent-primary)]
              transition-colors duration-200 group self-start sm:self-auto"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>@{GH_USER}</span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GhCard
            src={`https://github-readme-stats.vercel.app/api${statsParams}`}
            alt="GitHub Stats"
            title="Overall Stats"
            delay={0}
          />
          <GhCard
            src={`https://github-readme-stats.vercel.app/api/top-langs${langParams}`}
            alt="Top Languages"
            title="Top Languages"
            delay={0.08}
          />
        </div>

        {/* Streak — full width */}
        <motion.div
          className="mt-5 card p-4 flex flex-col gap-3 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
            Contribution Streak
          </p>
          <div className="flex justify-center">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/${streakParams}`}
              alt="GitHub Streak"
              className="max-w-full"
              loading="lazy"
              onError={(e) => {
                e.target.replaceWith(
                  Object.assign(document.createElement('p'), {
                    textContent: 'Streak stats unavailable',
                    className: 'text-xs text-center py-4 text-[var(--text-tertiary)]',
                  })
                )
              }}
            />
          </div>
        </motion.div>

        {/* GitHub profile note */}
        <motion.p
          className="text-center text-xs text-[var(--text-tertiary)] mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Stats powered by{' '}
          <a
            href="https://github.com/anuraghazra/github-readme-stats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-primary)] hover:underline"
          >
            github-readme-stats
          </a>
          {' '}·{' '}
          <a
            href="https://github.com/DenverCoder1/github-readme-streak-stats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-primary)] hover:underline"
          >
            streak-stats
          </a>
        </motion.p>
      </div>
    </section>
  )
}
