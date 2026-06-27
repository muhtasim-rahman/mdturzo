// ============================================================
// Carousel.jsx — shared, v2.5.2
// Rebuilt from scratch. Works for projects + blogs + any image list.
// Features: auto-play, swipe, keyboard nav, thumbnail strip,
//           click-to-preview via ImagePreviewModal, fully responsive.
// Props:
//   slides: [{url, caption, alt}]
//   autoPlay: bool (default true)
//   onImageClick: fn(index) — override default preview behavior
//   className: string
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faExpand, faImage } from '@fortawesome/free-solid-svg-icons'
import ImagePreviewModal from './ImagePreviewModal.jsx'

const AUTO_MS = 4500

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.22 } }),
}

export default function Carousel({
  slides = [],
  autoPlay = true,
  onImageClick,
  className = '',
  aspectRatio = '16/7',
  showThumbs = true,
  placeholder,
}) {
  const [idx, setIdx]         = useState(0)
  const [dir, setDir]         = useState(1)
  const [paused, setPaused]   = useState(false)
  const [preview, setPreview] = useState(null) // index or null
  const timerRef = useRef(null)
  const touchX   = useRef(null)

  const validSlides = slides.filter(s => s?.url)

  const go = useCallback((next) => {
    if (next === idx || !validSlides.length) return
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx, validSlides.length])

  const prev = useCallback(() => go(idx === 0 ? validSlides.length - 1 : idx - 1), [go, idx, validSlides.length])
  const next = useCallback(() => go(idx === validSlides.length - 1 ? 0 : idx + 1), [go, idx, validSlides.length])

  // Auto-play
  useEffect(() => {
    if (!autoPlay || paused || validSlides.length <= 1) return
    timerRef.current = setInterval(next, AUTO_MS)
    return () => clearInterval(timerRef.current)
  }, [autoPlay, paused, next, validSlides.length])

  // Keyboard nav
  useEffect(() => {
    if (preview !== null) return // ImagePreviewModal handles keys
    const h = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [prev, next, preview])

  // Touch/swipe
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 44) dx < 0 ? next() : prev()
  }

  const handleImageClick = (i) => {
    if (onImageClick) { onImageClick(i); return }
    setPreview(i)
  }

  // Empty state
  if (!validSlides.length) {
    return (
      <div
        className={className}
        style={{
          aspectRatio, borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-primary) 8%, var(--bg-surface-2)), var(--bg-surface-2))',
          border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        {placeholder || (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'var(--accent-light)', border: '1px solid color-mix(in srgb, var(--accent-primary) 20%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
            }}>
              <FontAwesomeIcon icon={faImage} style={{ fontSize: '1.25rem', color: 'var(--accent-primary)' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>No images</span>
          </div>
        )}
      </div>
    )
  }

  const slide = validSlides[idx]

  return (
    <>
      <div
        className={className}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
      >
        {/* Main slide */}
        <div style={{
          position: 'relative', borderRadius: validSlides.length === 1 && !showThumbs ? 16 : '16px 16px 0 0',
          overflow: 'hidden', aspectRatio,
          background: 'var(--bg-surface-2)',
          cursor: 'pointer',
        }}>
          <AnimatePresence custom={dir} mode="sync">
            <motion.div
              key={idx}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: 'absolute', inset: 0 }}
              onClick={() => handleImageClick(idx)}
            >
              <img
                src={slide.url}
                alt={slide.alt || slide.caption || `Slide ${idx + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {slide.caption && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
                  padding: '2rem 1rem 0.75rem',
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500,
                }}>
                  {slide.caption}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          {validSlides.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                style={{
                  position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.8)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.5)'}
                aria-label="Previous"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.8)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.5)'}
                aria-label="Next"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}

          {/* Expand icon */}
          <button
            onClick={() => setPreview(idx)}
            style={{
              position: 'absolute', top: 10, right: 10,
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.8)', cursor: 'pointer', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.5)'}
            aria-label="Full screen"
          >
            <FontAwesomeIcon icon={faExpand} />
          </button>

          {/* Counter badge */}
          {validSlides.length > 1 && (
            <div style={{
              position: 'absolute', top: 10, left: 10,
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 99, padding: '3px 10px',
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)', fontWeight: 600,
            }}>
              {idx + 1} / {validSlides.length}
            </div>
          )}

          {/* Progress dots on image */}
          {validSlides.length > 1 && validSlides.length <= 8 && !showThumbs && (
            <div style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 5,
            }}>
              {validSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); go(i) }}
                  style={{
                    width: i === idx ? 18 : 6, height: 6,
                    borderRadius: 99, border: 'none',
                    background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', padding: 0,
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {showThumbs && validSlides.length > 1 && (
          <div style={{
            display: 'flex', gap: 6, padding: '8px',
            background: 'var(--bg-surface)', borderRadius: '0 0 16px 16px',
            border: '1px solid var(--border-color)', borderTop: 'none',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            {validSlides.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  flexShrink: 0, width: 56, height: 36, padding: 0,
                  borderRadius: 6, overflow: 'hidden',
                  border: i === idx
                    ? '2px solid var(--accent-primary)'
                    : '2px solid var(--border-color)',
                  opacity: i === idx ? 1 : 0.55,
                  transition: 'all 0.15s', cursor: 'pointer',
                  background: 'var(--bg-surface-2)',
                }}
              >
                <img
                  src={s.url}
                  alt={s.alt || `Thumb ${i+1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen preview */}
      {preview !== null && (
        <ImagePreviewModal
          images={validSlides.map(s => ({ url: s.url, alt: s.alt || s.caption || '' }))}
          startIndex={preview}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  )
}
