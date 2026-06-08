// ProjectCarousel.jsx — v2.4.4
// Moved: src/components/shared → src/components/projects
// Enhanced: more polished slide transitions, better progress indicator,
//   thumbnail strip at bottom, swipe gesture support on mobile

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft, faChevronRight, faExpand, faFolderOpen, faImage
} from '@fortawesome/free-solid-svg-icons'

const AUTO_INTERVAL = 5000

export default function ProjectCarousel({ thumbnail_url, screenshots = [], category = '', onImageClick }) {
  const slides = [
    ...(thumbnail_url ? [{ url: thumbnail_url, caption: '' }] : []),
    ...(Array.isArray(screenshots) ? screenshots : []),
  ].filter(s => s?.url)

  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const [dir, setDir]       = useState(1)
  const timerRef            = useRef(null)
  const touchStartX         = useRef(null)

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx])

  const prev = () => go(idx === 0 ? slides.length - 1 : idx - 1)
  const next = useCallback(() => go(idx === slides.length - 1 ? 0 : idx + 1), [go, idx, slides.length])

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    timerRef.current = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next, paused, slides.length])

  // Swipe support
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-[200px] sm:h-[260px] lg:h-[340px] rounded-2xl overflow-hidden mb-8 flex items-center justify-center
        bg-gradient-to-br from-[var(--accent-primary)]/8 via-[var(--bg-surface-2)] to-[var(--bg-surface-2)] border border-[var(--border-color)]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
            <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[var(--accent-primary)]" />
          </div>
          <span className="text-xs text-[var(--text-tertiary)] font-semibold">{category}</span>
        </div>
      </div>
    )
  }

  if (slides.length === 1) {
    return (
      <div
        onClick={() => onImageClick?.(slides, 0)}
        className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] rounded-2xl overflow-hidden mb-8 cursor-zoom-in group border border-[var(--border-color)] shadow-sm">
        <img src={slides[0].url} alt={slides[0].caption || 'Project preview'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1.5 text-[9px] font-semibold px-3 py-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10">
            <FontAwesomeIcon icon={faExpand} className="text-[8px]" /> Expand
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 text-[9px] font-semibold px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10">
            <FontAwesomeIcon icon={faImage} className="text-[8px]" /> 1 image
          </span>
        </div>
      </div>
    )
  }

  const current = slides[idx]

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden mb-8 border border-[var(--border-color)] shadow-sm group/carousel select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>

      {/* Main image area */}
      <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={idx}
            custom={dir}
            variants={{
              enter:  (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0.6 }),
              center: ()  => ({ x: 0, opacity: 1 }),
              exit:   (d) => ({ x: d > 0 ? '-35%' : '35%',  opacity: 0.15 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => onImageClick?.(slides, idx)}>
            <img
              src={current.url}
              alt={current.caption || `Image ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 pointer-events-none" />
            {current.caption && (
              <div className="absolute bottom-16 left-4 right-14">
                <p className="text-[10px] text-white/90 font-medium bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1.5 inline-block border border-white/10">
                  {current.caption}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
            bg-black/50 hover:bg-black/75 text-white/80 hover:text-white
            flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm
            opacity-0 group-hover/carousel:opacity-100 shadow-lg">
          <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
            bg-black/50 hover:bg-black/75 text-white/80 hover:text-white
            flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm
            opacity-0 group-hover/carousel:opacity-100 shadow-lg">
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20">
          <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); go(i) }}
                className={`rounded-full transition-all duration-300 ${
                  i === idx ? 'bg-white w-5 h-1.5' : 'bg-white/40 hover:bg-white/70 w-1.5 h-1.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Image count badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 rounded-full bg-black/55 text-white backdrop-blur-sm border border-white/10">
            <FontAwesomeIcon icon={faImage} className="text-[8px]" />
            {idx + 1} / {slides.length}
          </span>
        </div>

        {/* Auto-progress bar */}
        {!paused && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 overflow-hidden">
            <motion.div
              key={idx}
              className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail strip (when 3+ slides) */}
      {slides.length >= 3 && (
        <div className="flex gap-1.5 p-2.5 bg-[var(--bg-surface-2)]/80 backdrop-blur-sm border-t border-[var(--border-color)] overflow-x-auto scrollbar-none">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`flex-shrink-0 w-14 h-9 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === idx
                  ? 'border-[var(--accent-primary)] opacity-100 shadow-sm'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}>
              <img src={s.url} alt={s.caption || `Thumb ${i+1}`}
                className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
