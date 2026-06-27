// ImagePreviewModal.jsx — v2.5.2 SHARED
// Full-featured lightbox: zoom (scroll/pinch/double-tap), swipe nav,
// keyboard nav, thumbnail strip, smooth transitions, fully mobile responsive.
// Usage: <ImagePreviewModal images={[{url, caption}]} startIndex={0} onClose={fn} />

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faMagnifyingGlassPlus, faMagnifyingGlassMinus,
  faExpand,
} from '@fortawesome/free-solid-svg-icons'
import { createPortal } from 'react-dom'

const MIN_SCALE = 1
const MAX_SCALE = 5
const SWIPE_THRESHOLD = 60

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function dist2(a, b) {
  const dx = a.clientX - b.clientX
  const dy = a.clientY - b.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

function ImageViewer({ src, caption, scale, onScaleChange }) {
  const imgRef = useRef(null)
  const containerRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const drag = useRef({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 })
  const pinch = useRef({ active: false, startDist: 0, startScale: 1 })
  const lastTap = useRef(0)
  const [loaded, setLoaded] = useState(false)

  // Reset on image change
  useEffect(() => {
    setLoaded(false)
    setOffset({ x: 0, y: 0 })
  }, [src])

  // Clamp offset to stay within bounds when scaled
  const clampOffset = useCallback((ox, oy, sc) => {
    const el = imgRef.current
    if (!el) return { x: ox, y: oy }
    const nw = el.naturalWidth || el.offsetWidth
    const nh = el.naturalHeight || el.offsetHeight
    const cw = el.offsetWidth
    const ch = el.offsetHeight
    const maxX = Math.max(0, (nw * sc - cw) / 2)
    const maxY = Math.max(0, (nh * sc - ch) / 2)
    return { x: clamp(ox, -maxX, maxX), y: clamp(oy, -maxY, maxY) }
  }, [])

  // Mouse drag
  const onMouseDown = (e) => {
    if (scale <= 1) return
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y }
    e.preventDefault()
  }
  const onMouseMove = (e) => {
    if (!drag.current.active) return
    const nx = drag.current.ox + (e.clientX - drag.current.startX)
    const ny = drag.current.oy + (e.clientY - drag.current.startY)
    setOffset(clampOffset(nx, ny, scale))
  }
  const onMouseUp = () => { drag.current.active = false }

  // Scroll zoom
  const onWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.2 : -0.2
    const next = clamp(scale + delta, MIN_SCALE, MAX_SCALE)
    onScaleChange(next)
    if (next === 1) setOffset({ x: 0, y: 0 })
  }

  // Touch: pinch zoom + double-tap
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinch.current = {
        active: true,
        startDist: dist2(e.touches[0], e.touches[1]),
        startScale: scale,
      }
    } else if (e.touches.length === 1) {
      const now = Date.now()
      if (now - lastTap.current < 300) {
        // Double tap = toggle zoom
        const next = scale > 1 ? 1 : 2.5
        onScaleChange(next)
        if (next === 1) setOffset({ x: 0, y: 0 })
      }
      lastTap.current = now
      if (scale > 1) {
        drag.current = {
          active: true,
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          ox: offset.x, oy: offset.y,
        }
      }
    }
  }
  const onTouchMove = (e) => {
    if (pinch.current.active && e.touches.length === 2) {
      const d = dist2(e.touches[0], e.touches[1])
      const next = clamp(pinch.current.startScale * (d / pinch.current.startDist), MIN_SCALE, MAX_SCALE)
      onScaleChange(next)
      if (next === 1) setOffset({ x: 0, y: 0 })
    } else if (drag.current.active && e.touches.length === 1 && scale > 1) {
      e.preventDefault()
      const nx = drag.current.ox + (e.touches[0].clientX - drag.current.startX)
      const ny = drag.current.oy + (e.touches[0].clientY - drag.current.startY)
      setOffset(clampOffset(nx, ny, scale))
    }
  }
  const onTouchEnd = () => {
    pinch.current.active = false
    drag.current.active = false
  }

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        cursor: scale > 1 ? 'grab' : 'default',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {!loaded && (
        <div className="sk" style={{ position: 'absolute', inset: '10%', borderRadius: 12 }} />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={caption || ''}
        onLoad={() => setLoaded(true)}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
          transition: drag.current.active || pinch.current.active ? 'none' : 'transform 0.2s ease',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: scale > 1 ? 'none' : 'auto',
          opacity: loaded ? 1 : 0,
        }}
        draggable={false}
      />
      {caption && loaded && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0.5rem 1rem', textAlign: 'center',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          color: 'rgba(255,255,255,0.9)', fontSize: '0.8125rem',
          pointerEvents: 'none',
        }}>
          {caption}
        </div>
      )}
    </div>
  )
}

function ThumbStrip({ images, current, onSelect }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.children[current]?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [current])

  if (images.length <= 1) return null
  return (
    <div
      ref={ref}
      style={{
        display: 'flex', gap: 6, padding: '8px 16px 12px',
        overflowX: 'auto', flexShrink: 0, scrollbarWidth: 'none',
      }}
    >
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            flexShrink: 0, width: 56, height: 40,
            borderRadius: 6, overflow: 'hidden',
            border: `2px solid ${i === current ? 'var(--accent-primary)' : 'transparent'}`,
            opacity: i === current ? 1 : 0.55,
            transition: 'all 0.18s',
            padding: 0, cursor: 'pointer', background: 'none',
          }}
        >
          <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      ))}
    </div>
  )
}

export default function ImagePreviewModal({ images = [], startIndex = 0, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const [scale, setScale] = useState(1)
  const [direction, setDirection] = useState(0)
  const swipeRef = useRef({ startX: 0, startY: 0 })

  // Normalize images to [{url, caption}]
  const imgs = images.map(img => (typeof img === 'string' ? { url: img } : img))

  // Keyboard nav
  useEffect(() => {
    const prev = startIndex
    setCurrent(prev)
    setScale(1)
  }, [startIndex])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(s + 0.5, MAX_SCALE))
      if (e.key === '-') setScale(s => Math.max(s - 0.5, MIN_SCALE))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, imgs.length])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const go = useCallback((dir) => {
    setDirection(dir)
    setCurrent(c => {
      const next = c + dir
      if (next < 0 || next >= imgs.length) return c
      return next
    })
    setScale(1)
  }, [imgs.length])

  // Swipe nav
  const onTouchStartNav = (e) => {
    swipeRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY }
  }
  const onTouchEndNav = (e) => {
    const dx = e.changedTouches[0].clientX - swipeRef.current.startX
    const dy = Math.abs(e.changedTouches[0].clientY - swipeRef.current.startY)
    if (Math.abs(dx) > SWIPE_THRESHOLD && dy < 80 && scale <= 1) {
      go(dx < 0 ? 1 : -1)
    }
  }

  const img = imgs[current]
  if (!img) return null

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '40%' : '-40%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
    exit: (d) => ({ x: d > 0 ? '-40%' : '40%', opacity: 0, transition: { duration: 0.18 } }),
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.95)',
          display: 'flex', flexDirection: 'column',
        }}
        onTouchStart={onTouchStartNav}
        onTouchEnd={onTouchEndNav}
      >
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.75rem 1rem', flexShrink: 0,
          background: 'rgba(0,0,0,0.4)',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
            {imgs.length > 1 ? `${current + 1} / ${imgs.length}` : img.caption || ''}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* Zoom controls */}
            <button onClick={() => setScale(s => Math.max(s - 0.5, MIN_SCALE))}
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
            </button>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', minWidth: 36, textAlign: 'center' }}>
              {Math.round(scale * 100)}%
            </span>
            <button onClick={() => setScale(s => Math.min(s + 0.5, MAX_SCALE))}
              style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </button>
            {scale !== 1 && (
              <button onClick={() => { setScale(1) }}
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faExpand} />
              </button>
            )}
            <button onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: 8, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* Prev */}
          {current > 0 && (
            <button onClick={() => go(-1)} style={{
              position: 'absolute', left: 8, zIndex: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
              fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
            >
              <ImageViewer
                src={img.url}
                caption={imgs.length <= 1 ? img.caption : null}
                scale={scale}
                onScaleChange={setScale}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          {current < imgs.length - 1 && (
            <button onClick={() => go(1)} style={{
              position: 'absolute', right: 8, zIndex: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
              fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        <ThumbStrip images={imgs} current={current} onSelect={(i) => { setDirection(i > current ? 1 : -1); setCurrent(i); setScale(1) }} />
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
