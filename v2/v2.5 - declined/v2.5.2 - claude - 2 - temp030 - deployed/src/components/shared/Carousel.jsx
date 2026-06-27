// Carousel.jsx — v2.5.2 SHARED
// Smooth image carousel for blog/post detail pages.
// Features: keyboard nav, swipe, auto-fixed height, responsive.
// Works alongside ImagePreviewModal for fullscreen preview on click.

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faExpand } from '@fortawesome/free-solid-svg-icons'
import ImagePreviewModal from './ImagePreviewModal.jsx'

const SWIPE_THRESHOLD = 50

export default function Carousel({ images = [], aspectRatio = '16/9', maxHeight = 500, className = '' }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [previewIdx, setPreviewIdx] = useState(null)
  const swipeRef = useRef({ startX: 0 })
  const imgs = images.map(img => (typeof img === 'string' ? { url: img } : img))

  const go = useCallback((dir) => {
    const next = current + dir
    if (next < 0 || next >= imgs.length) return
    setDirection(dir)
    setCurrent(next)
  }, [current, imgs.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  if (!imgs.length) return null
  if (imgs.length === 1) {
    return (
      <>
        <div
          className={className}
          style={{
            position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-2xl)',
            cursor: 'zoom-in',
          }}
          onClick={() => setPreviewIdx(0)}
        >
          <div style={{ maxHeight, overflow: 'hidden' }}>
            <img
              src={imgs[0].url}
              alt={imgs[0].caption || ''}
              style={{ width: '100%', objectFit: 'cover', display: 'block', aspectRatio }}
            />
          </div>
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', backdropFilter: 'blur(4px)',
          }}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </div>
        {previewIdx !== null && (
          <ImagePreviewModal images={imgs} startIndex={previewIdx} onClose={() => setPreviewIdx(null)} />
        )}
      </>
    )
  }

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    exit: (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.22 } }),
  }

  return (
    <>
      <div
        className={className}
        style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-2xl)', userSelect: 'none' }}
        onTouchStart={e => { swipeRef.current.startX = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - swipeRef.current.startX
          if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
        }}
      >
        {/* Image */}
        <div style={{ maxHeight, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              src={imgs[current].url}
              alt={imgs[current].caption || ''}
              onClick={() => setPreviewIdx(current)}
              style={{
                width: '100%', objectFit: 'cover', display: 'block',
                aspectRatio, cursor: 'zoom-in',
              }}
            />
          </AnimatePresence>
        </div>

        {/* Expand icon */}
        <div
          onClick={() => setPreviewIdx(current)}
          style={{
            position: 'absolute', top: 10, right: 10, zIndex: 5,
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', backdropFilter: 'blur(4px)', cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faExpand} />
        </div>

        {/* Prev / Next buttons */}
        {current > 0 && (
          <button
            onClick={() => go(-1)}
            style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: 36, height: 36, borderRadius: '50%',
              cursor: 'pointer', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)', zIndex: 4,
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {current < imgs.length - 1 && (
          <button
            onClick={() => go(1)}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: 36, height: 36, borderRadius: '50%',
              cursor: 'pointer', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)', zIndex: 4,
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}

        {/* Dots */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 5, zIndex: 4,
        }}>
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              style={{
                width: i === current ? 20 : 7, height: 7,
                borderRadius: 4, border: 'none', cursor: 'pointer',
                background: i === current ? 'var(--accent-primary)' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.25s', padding: 0,
              }}
            />
          ))}
        </div>

        {/* Caption */}
        {imgs[current].caption && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '1.5rem 1rem 0.75rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
            color: 'rgba(255,255,255,0.85)', fontSize: '0.8125rem', pointerEvents: 'none',
          }}>
            {imgs[current].caption}
          </div>
        )}

        {/* Counter badge */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.9)',
          padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
          backdropFilter: 'blur(4px)',
        }}>
          {current + 1} / {imgs.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {imgs.length > 1 && (
        <div style={{
          display: 'flex', gap: 6, marginTop: 8,
          overflowX: 'auto', scrollbarWidth: 'none', padding: '2px',
        }}>
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              style={{
                flexShrink: 0, width: 56, height: 40, padding: 0, border: 'none',
                borderRadius: 6, overflow: 'hidden',
                outline: `2px solid ${i === current ? 'var(--accent-primary)' : 'transparent'}`,
                outlineOffset: 1,
                opacity: i === current ? 1 : 0.5,
                transition: 'all 0.18s', cursor: 'pointer',
              }}
            >
              <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {previewIdx !== null && (
        <ImagePreviewModal images={imgs} startIndex={previewIdx} onClose={() => setPreviewIdx(null)} />
      )}
    </>
  )
}
