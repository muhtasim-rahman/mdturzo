// ProjectCarousel.jsx — v2.4.3
// Hero carousel for project screenshots
// - Auto-slides every 5 seconds (pauses on hover)
// - Prev/Next navigation arrows
// - Dot indicators
// - Click any image → opens ImagePreviewModal
// - Falls back gracefully to single thumbnail

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft, faChevronRight, faExpand, faFolderOpen
} from '@fortawesome/free-solid-svg-icons'

const AUTO_INTERVAL = 5000

export default function ProjectCarousel({ thumbnail_url, screenshots = [], category = '', onImageClick }) {
  // Build slide array: thumbnail first, then screenshots
  const slides = [
    ...(thumbnail_url ? [{ url: thumbnail_url, caption: '' }] : []),
    ...(Array.isArray(screenshots) ? screenshots : []),
  ].filter(s => s?.url)

  const [idx, setIdx]         = useState(0)
  const [paused, setPaused]   = useState(false)
  const [dir, setDir]         = useState(1)   // 1 = forward, -1 = back
  const timerRef              = useRef(null)

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx])

  const prev = () => go(idx === 0 ? slides.length - 1 : idx - 1)
  const next = useCallback(() => go(idx === slides.length - 1 ? 0 : idx + 1), [go, idx, slides.length])

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1 || paused) return
    timerRef.current = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next, paused, slides.length])

  // No images → plain placeholder
  if (slides.length === 0) {
    return (
      <div className="w-full h-[200px] sm:h-[260px] lg:h-[340px] rounded-2xl overflow-hidden mb-8 flex items-center justify-center bg-gradient-to-br from-[var(--accent-primary)]/8 via-[var(--bg-surface-2)] to-[var(--bg-surface-2)] border border-[var(--border-color)]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
            <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--accent-primary)]" />
          </div>
          <span className="text-xs text-[var(--text-tertiary)] font-semibold">{category}</span>
        </div>
      </div>
    )
  }

  // Single image → no carousel chrome
  if (slides.length === 1) {
    return (
      <div
        onClick={() => onImageClick?.(slides, 0)}
        className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden mb-8 cursor-zoom-in group border border-[var(--border-color)] shadow-sm">
        <img src={slides[0].url} alt={slides[0].caption || 'Project preview'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1.5 text-[9px] font-semibold px-3 py-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10">
            <FontAwesomeIcon icon={faExpand} className="text-[8px]" /> Expand
          </span>
        </div>
      </div>
    )
  }

  // Multi-image carousel
  const current = slides[idx]

  return (
    <div
      className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden mb-8 border border-[var(--border-color)] shadow-sm group/carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>

      {/* Slides */}
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={idx}
          custom={dir}
          variants={{
            enter:  (d) => ({ x: d > 0 ?  '100%' : '-100%', opacity: 0.5 }),
            center: ()  => ({ x: 0, opacity: 1 }),
            exit:   (d) => ({ x: d > 0 ? '-40%' : '40%',  opacity: 0.2 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 cursor-zoom-in"
          onClick={() => onImageClick?.(slides, idx)}>
          <img
            src={current.url}
            alt={current.caption || `Slide ${idx + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />
          {current.caption && (
            <div className="absolute bottom-12 left-4 right-16">
              <p className="text-[10px] text-white/80 font-medium bg-black/40 backdrop-blur-sm rounded px-2 py-1 inline-block">
                {current.caption}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100">
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100">
        <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
      </button>

      {/* Slide counter + dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-20">
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); go(i) }}
              className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? 'bg-white w-4 h-1.5'
                  : 'bg-white/40 hover:bg-white/70 w-1.5 h-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auto-progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20 overflow-hidden">
          <motion.div
            key={idx}
            className="h-full bg-[var(--accent-primary)]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
          />
        </div>
      )}

      {/* Image count badge */}
      <div className="absolute top-3 right-3 z-20">
        <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10">
          {idx + 1} / {slides.length}
        </span>
      </div>
    </div>
  )
}
