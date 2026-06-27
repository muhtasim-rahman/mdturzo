// ============================================================
// ImagePreviewModal.jsx — shared, v2.5.2 (complete rebuild)
// Features: zoom (scroll + pinch), pan, swipe nav, keyboard nav,
//           thumbnail strip, mobile-first, smooth animations.
// Usage: <ImagePreviewModal images={[{url,alt}]} startIndex={0} onClose={fn} />
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faMagnifyingGlassPlus, faMagnifyingGlassMinus, faArrowsRotate,
  faDownload, faExpand,
} from '@fortawesome/free-solid-svg-icons'

// ── Constants ──────────────────────────────────────────────────
const MIN_SCALE = 1
const MAX_SCALE = 5
const DOUBLE_TAP_MS = 280

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function dist(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
}

// ── Thumbnail strip ────────────────────────────────────────────
function ThumbnailStrip({ images, current, onSelect }) {
  const ref = useRef(null)
  useEffect(() => {
    const btn = ref.current?.children[current]
    btn?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [current])
  if (images.length <= 1) return null
  return (
    <div
      ref={ref}
      style={{
        display: 'flex', gap: 8, padding: '10px 16px',
        overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0,
        background: 'rgba(0,0,0,0.6)',
      }}>
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            flexShrink: 0, width: 60, height: 40,
            borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
            border: i === current ? '2px solid var(--accent-primary)' : '2px solid transparent',
            opacity: i === current ? 1 : 0.5,
            transition: 'all 0.18s', padding: 0, background: '#111',
          }}>
          <img
            src={img.url}
            alt={img.alt || `Image ${i + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </button>
      ))}
    </div>
  )
}

// ── Zoomable image pane ────────────────────────────────────────
function ZoomPane({ src, alt, onPrev, onNext, hasMultiple }) {
  const [scale, setScale]   = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(true)
  const imgRef  = useRef(null)
  const paneRef = useRef(null)

  // Gesture state stored in ref (no re-render needed for tracking)
  const gs = useRef({
    pointers:   [],   // active touch/pointer events
    initDist:   0,    // initial pinch distance
    initScale:  1,    // scale at pinch start
    panStart:   null, // { px, py, ox, oy } at pan start
    lastTap:    0,    // timestamp of last tap
    swipeStartX: null,// for swipe detection
  })

  // Reset when image changes
  useEffect(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
    setLoading(true)
  }, [src])

  // Clamp offset so image never pans fully out of view
  const clampOffset = useCallback((s, ox, oy) => {
    const pane = paneRef.current
    const img  = imgRef.current
    if (!pane || !img) return { x: ox, y: oy }
    const pw = pane.clientWidth, ph = pane.clientHeight
    const iw = img.naturalWidth  || pw
    const ih = img.naturalHeight || ph
    const renderedW = Math.min(iw, pw)
    const renderedH = Math.min(ih, ph)
    const maxX = Math.max(0, (renderedW  * s - pw)  / 2)
    const maxY = Math.max(0, (renderedH * s - ph) / 2)
    return { x: clamp(ox, -maxX, maxX), y: clamp(oy, -maxY, maxY) }
  }, [])

  // ── Wheel zoom ──────────────────────────────────────────────
  const onWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.15 : -0.15
    setScale(prev => {
      const next = clamp(prev + delta * prev, MIN_SCALE, MAX_SCALE)
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 })
      return next
    })
  }, [])

  useEffect(() => {
    const el = paneRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  // ── Pointer events (touch + mouse) ─────────────────────────
  const onPointerDown = useCallback((e) => {
    paneRef.current?.setPointerCapture(e.pointerId)
    const g = gs.current
    g.pointers = [...g.pointers.filter(p => p.pointerId !== e.pointerId), e]

    if (g.pointers.length === 1) {
      // Possible pan or swipe start
      g.panStart = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y }
      g.swipeStartX = e.clientX

      // Double-tap to zoom
      const now = Date.now()
      if (now - g.lastTap < DOUBLE_TAP_MS) {
        setScale(s => {
          const next = s > 1.5 ? 1 : 3
          if (next === 1) setOffset({ x: 0, y: 0 })
          return next
        })
        g.lastTap = 0
      } else {
        g.lastTap = now
      }
    } else if (g.pointers.length === 2) {
      // Pinch start
      g.initDist  = dist(g.pointers[0], g.pointers[1])
      g.initScale = scale
      g.panStart  = null
    }
  }, [offset, scale])

  const onPointerMove = useCallback((e) => {
    const g = gs.current
    g.pointers = g.pointers.map(p => p.pointerId === e.pointerId ? e : p)

    if (g.pointers.length === 2) {
      // Pinch-to-zoom
      const d = dist(g.pointers[0], g.pointers[1])
      const next = clamp(g.initScale * (d / g.initDist), MIN_SCALE, MAX_SCALE)
      setScale(next)
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 })
      return
    }
    if (g.pointers.length === 1 && g.panStart) {
      const dx = e.clientX - g.panStart.px
      const dy = e.clientY - g.panStart.py
      if (scale <= 1 && Math.abs(dx) > 5) {
        // Swipe to navigate (only when not zoomed)
        return
      }
      const clamped = clampOffset(scale, g.panStart.ox + dx, g.panStart.py !== g.panStart.py ? 0 : g.panStart.oy + dy)
      setOffset(clampOffset(scale, g.panStart.ox + dx, g.panStart.oy + dy))
    }
  }, [scale, clampOffset])

  const onPointerUp = useCallback((e) => {
    const g = gs.current
    const prev = [...g.pointers]
    g.pointers = g.pointers.filter(p => p.pointerId !== e.pointerId)

    if (prev.length === 1 && scale <= 1 && g.swipeStartX !== null) {
      const dx = e.clientX - g.swipeStartX
      if (Math.abs(dx) > 50) {
        dx < 0 ? onNext?.() : onPrev?.()
      }
    }
    g.swipeStartX = null
    g.panStart = null
  }, [scale, onNext, onPrev])

  // ── Zoom controls ───────────────────────────────────────────
  const zoomIn  = () => setScale(s => clamp(s + 0.5, MIN_SCALE, MAX_SCALE))
  const zoomOut = () => {
    setScale(s => {
      const next = clamp(s - 0.5, MIN_SCALE, MAX_SCALE)
      if (next <= 1) setOffset({ x: 0, y: 0 })
      return next
    })
  }
  const reset = () => { setScale(1); setOffset({ x: 0, y: 0 }) }

  return (
    <div
      ref={paneRef}
      style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: scale > 1 ? 'grab' : 'default',
        touchAction: 'none', userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Image */}
      <motion.div
        style={{
          transform: `translate(${offset.x}px,${offset.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: gs.current.pointers.length ? 'none' : 'transform 0.15s ease',
          maxWidth: '100%', maxHeight: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {loading && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 32, height: 32, border: '3px solid var(--accent-primary)',
              borderTopColor: 'transparent', borderRadius: '50%',
              animation: 'spin 0.7s linear infinite' }} />
          </div>
        )}
        <img
          ref={imgRef}
          src={src}
          alt={alt || 'Preview'}
          draggable={false}
          onLoad={() => setLoading(false)}
          style={{
            maxWidth: 'min(90vw, 1200px)',
            maxHeight: 'calc(90vh - 140px)',
            objectFit: 'contain',
            borderRadius: 8,
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Nav arrows — sides */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev?.() }}
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)', zIndex: 2,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.55)'}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext?.() }}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)', zIndex: 2,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.55)'}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}

      {/* Zoom toolbar */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 4,
        background: 'rgba(0,0,0,0.62)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 99, padding: '5px 10px', backdropFilter: 'blur(8px)',
        zIndex: 3,
      }}>
        {[
          { icon: faMagnifyingGlassMinus, onClick: zoomOut, disabled: scale <= MIN_SCALE, title: 'Zoom out' },
          { icon: faArrowsRotate,          onClick: reset,   disabled: scale <= 1,         title: 'Reset'    },
          { icon: faMagnifyingGlassPlus,  onClick: zoomIn,  disabled: scale >= MAX_SCALE, title: 'Zoom in'  },
        ].map(({ icon, onClick, disabled, title }) => (
          <button
            key={title}
            onClick={onClick}
            disabled={disabled}
            title={title}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'none', border: 'none', cursor: disabled ? 'default' : 'pointer',
              color: disabled ? 'rgba(255,255,255,0.25)' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.875rem',
              transition: 'background 0.1s, color 0.1s',
            }}
            onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
        <span style={{
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)',
          display: 'flex', alignItems: 'center', paddingLeft: 4, minWidth: 34,
        }}>
          {Math.round(scale * 100)}%
        </span>
      </div>
    </div>
  )
}

// ── Main modal ─────────────────────────────────────────────────
export default function ImagePreviewModal({ images = [], startIndex = 0, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => setCurrent(i => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() => setCurrent(i => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      onClose?.()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!images.length) return null
  const img = images[current]

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.96)',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.6)',
        }}>
          {/* Counter + caption */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
              {current + 1} / {images.length}
            </span>
            {img.alt && (
              <span style={{
                fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {img.alt}
              </span>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <a
              href={img.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', fontSize: '0.875rem',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              title="Download"
            >
              <FontAwesomeIcon icon={faDownload} />
            </a>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(220,50,50,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              title="Close (Esc)"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* Image area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
          >
            <ZoomPane
              src={img.url}
              alt={img.alt}
              onPrev={images.length > 1 ? prev : null}
              onNext={images.length > 1 ? next : null}
              hasMultiple={images.length > 1}
            />
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail strip */}
        <ThumbnailStrip images={images} current={current} onSelect={setCurrent} />

        {/* Dot indicators (mobile) */}
        {images.length > 1 && images.length <= 10 && (
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 6,
            padding: '8px 16px', flexShrink: 0,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 20 : 6, height: 6,
                  borderRadius: 99,
                  background: i === current ? 'var(--accent-primary)' : 'rgba(255,255,255,0.25)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
