// ImagePreviewModal.jsx — v2.4.7
// Custom lightbox — zero external dependencies.
// Mobile pinch-zoom handled with touch-action:none + manual pointer transform.
// Features: swipe nav, keyboard nav, pinch-to-zoom, double-tap zoom,
//           thumbnail strip, image counter, smooth transitions.

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faExpand, faCompress, faDownload,
} from '@fortawesome/free-solid-svg-icons'

// ── Constants ─────────────────────────────────────────────────
const MIN_SCALE = 1
const MAX_SCALE = 4
const DBL_TAP_MS = 300

// ── Utilities ─────────────────────────────────────────────────
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function dist2(a, b) {
  const dx = a.clientX - b.clientX
  const dy = a.clientY - b.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

// ── Thumbnail strip ────────────────────────────────────────────
function ThumbStrip({ images, current, onSelect }) {
  const stripRef = useRef(null)
  useEffect(() => {
    const el = stripRef.current?.children[current]
    el?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [current])

  if (images.length <= 1) return null

  return (
    <div
      ref={stripRef}
      className="flex gap-2 px-4 pb-3 pt-1 overflow-x-auto scrollbar-none flex-shrink-0"
      style={{ scrollbarWidth: 'none' }}>
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="flex-shrink-0 transition-all duration-200"
          style={{
            width: 64, height: 42,
            borderRadius: 6,
            overflow: 'hidden',
            border: i === current ? '2px solid #3B82F6' : '2px solid transparent',
            opacity: i === current ? 1 : 0.45,
          }}>
          <img
            src={img.url}
            alt={img.alt || `Thumb ${i + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </button>
      ))}
    </div>
  )
}

// ── Zoomable image pane ────────────────────────────────────────
function ZoomPane({ src, alt, onSwipeLeft, onSwipeRight }) {
  const [scale, setScale]   = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const paneRef  = useRef(null)
  const stateRef = useRef({
    // touch tracking
    touches:     [],
    lastDist:    0,
    lastScale:   1,
    lastOffset:  { x: 0, y: 0 },
    panStart:    null,
    // double-tap
    lastTap:     0,
    // swipe detection (when not zoomed)
    swipeStart:  null,
  })

  // Reset when image changes
  useEffect(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
    stateRef.current.lastScale  = 1
    stateRef.current.lastOffset = { x: 0, y: 0 }
  }, [src])

  const constrainOffset = useCallback((ox, oy, sc) => {
    if (!paneRef.current) return { x: 0, y: 0 }
    const { width: w, height: h } = paneRef.current.getBoundingClientRect()
    const maxX = Math.max(0, (w * (sc - 1)) / 2)
    const maxY = Math.max(0, (h * (sc - 1)) / 2)
    return { x: clamp(ox, -maxX, maxX), y: clamp(oy, -maxY, maxY) }
  }, [])

  const handleTouchStart = useCallback((e) => {
    e.preventDefault()
    const touches = Array.from(e.touches)
    const s = stateRef.current

    s.touches = touches

    if (touches.length === 1) {
      const now = Date.now()
      // double-tap to zoom
      if (now - s.lastTap < DBL_TAP_MS) {
        const newScale = scale > 1 ? 1 : 2.5
        const constrained = newScale === 1 ? { x: 0, y: 0 } : constrainOffset(s.lastOffset.x, s.lastOffset.y, newScale)
        setScale(newScale)
        setOffset(constrained)
        s.lastScale  = newScale
        s.lastOffset = constrained
        s.lastTap = 0
        return
      }
      s.lastTap = now
      s.panStart   = { x: touches[0].clientX - s.lastOffset.x, y: touches[0].clientY - s.lastOffset.y }
      s.swipeStart = { x: touches[0].clientX, y: touches[0].clientY }
    } else if (touches.length === 2) {
      s.lastDist  = dist2(touches[0], touches[1])
      s.swipeStart = null
    }
  }, [scale, constrainOffset])

  const handleTouchMove = useCallback((e) => {
    e.preventDefault()
    const touches = Array.from(e.touches)
    const s = stateRef.current

    if (touches.length === 1 && s.panStart) {
      if (s.lastScale <= 1) return // no pan when not zoomed (swipe handled on end)
      const newX = touches[0].clientX - s.panStart.x
      const newY = touches[0].clientY - s.panStart.y
      const constrained = constrainOffset(newX, newY, s.lastScale)
      setOffset(constrained)
      s.lastOffset = constrained
    } else if (touches.length === 2) {
      const newDist = dist2(touches[0], touches[1])
      if (!s.lastDist) { s.lastDist = newDist; return }
      const delta    = newDist / s.lastDist
      const newScale = clamp(s.lastScale * delta, MIN_SCALE, MAX_SCALE)
      const constrained = newScale === 1 ? { x: 0, y: 0 } : constrainOffset(s.lastOffset.x, s.lastOffset.y, newScale)
      setScale(newScale)
      setOffset(constrained)
      s.lastDist   = newDist
      s.lastScale  = newScale
      s.lastOffset = constrained
    }
  }, [constrainOffset])

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault()
    const s = stateRef.current
    const remaining = Array.from(e.touches)

    // Swipe navigation (only when not zoomed)
    if (s.swipeStart && s.lastScale <= 1 && remaining.length === 0) {
      const dx = (e.changedTouches[0]?.clientX ?? 0) - s.swipeStart.x
      const dy = (e.changedTouches[0]?.clientY ?? 0) - s.swipeStart.y
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? onSwipeLeft() : onSwipeRight()
      }
    }

    s.swipeStart = null
    s.touches    = remaining
    if (remaining.length < 2) s.lastDist = 0
    if (remaining.length === 0) s.panStart = null
  }, [onSwipeLeft, onSwipeRight])

  return (
    <div
      ref={paneRef}
      className="flex-1 flex items-center justify-center overflow-hidden select-none"
      style={{ touchAction: 'none', cursor: scale > 1 ? 'grab' : 'default' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <motion.img
        key={src}
        src={src}
        alt={alt || ''}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        draggable={false}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
          transformOrigin: 'center center',
          transition: scale === 1 ? 'transform 0.25s ease' : 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

// ── Main Modal ────────────────────────────────────────────────
export default function ImagePreviewModal({
  isOpen, onClose, images = [], initialIndex = 0,
}) {
  const [idx, setIdx]       = useState(initialIndex)
  const [dir, setDir]       = useState(1)

  // Sync to initialIndex when modal opens
  useEffect(() => {
    if (isOpen) setIdx(initialIndex)
  }, [isOpen, initialIndex])

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(clamp(next, 0, images.length - 1))
  }, [idx, images.length])

  const prev = useCallback(() => go(idx === 0 ? images.length - 1 : idx - 1), [go, idx, images.length])
  const next = useCallback(() => go(idx === images.length - 1 ? 0 : idx + 1), [go, idx, images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, next, prev, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !images.length) return null

  const current = images[idx] || {}

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(2, 6, 23, 0.97)',
          display: 'flex', flexDirection: 'column',
        }}>

        {/* ── Top bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Counter */}
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}>
            {idx + 1} / {images.length}
          </span>

          {/* Caption */}
          <span style={{
            fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500,
            maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {current.alt || ''}
          </span>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: 14 }} />
          </button>
        </div>

        {/* ── Image area ── */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
          <ZoomPane
            src={current.url}
            alt={current.alt}
            onSwipeLeft={next}
            onSwipeRight={prev}
          />

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.75)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)';  e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}>
              <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 13 }} />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={next}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.75)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)';  e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}>
              <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 13 }} />
            </button>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        <div style={{
          background: 'rgba(0,0,0,0.35)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <ThumbStrip images={images} current={idx} onSelect={go} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
