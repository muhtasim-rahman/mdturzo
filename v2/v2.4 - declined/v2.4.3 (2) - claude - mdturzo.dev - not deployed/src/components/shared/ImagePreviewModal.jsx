// ImagePreviewModal.jsx — v2.4.2
// Enhanced image preview popup:
//   - Mouse scroll → zoom in/out
//   - Touch pinch → zoom in/out (mobile)
//   - Touch drag → pan when zoomed
//   - Reset zoom on image navigation
//   - Bottom action bar:
//       [Copy Image] [Copy Image URL] [Copy Project URL] | [Share]
//   - Keyboard: Esc close, Arrow keys navigate, + / - zoom
//   - Double-click / double-tap to reset zoom

import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faCopy, faShareNodes, faCheck, faSearchPlus, faSearchMinus,
  faImage, faLink, faExpand
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_ZOOM = 0.5
const MAX_ZOOM = 6
const ZOOM_STEP = 0.2

export default function ImagePreviewModal({
  isOpen,
  onClose,
  images = [],
  initialIndex = 0,
  projectName = '',
  projectUrl = '',
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [zoom, setZoom]               = useState(1)
  const [pan, setPan]                 = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging]   = useState(false)
  const [copied, setCopied]           = useState(null) // 'image' | 'imgurl' | 'projurl'

  // Touch / pinch state
  const lastPinchDist  = useRef(null)
  const dragStartPan   = useRef({ x: 0, y: 0 })
  const dragStartPos   = useRef({ x: 0, y: 0 })
  const doubleClickTimer = useRef(null)

  const resetTransform = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Sync on open / index change
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex)
      setCopied(null)
      resetTransform()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen, initialIndex])

  // Reset zoom when navigating
  const goTo = useCallback((idx) => {
    setActiveIndex(idx)
    resetTransform()
    setCopied(null)
  }, [])

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return
    goTo(activeIndex === 0 ? images.length - 1 : activeIndex - 1)
  }, [images.length, activeIndex, goTo])

  const handleNext = useCallback(() => {
    if (images.length <= 1) return
    goTo(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
  }, [images.length, activeIndex, goTo])

  // Keyboard handler
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape')       onClose()
      else if (e.key === 'ArrowLeft')  handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
      else if (e.key === '+' || e.key === '=') setZoom(z => Math.min(MAX_ZOOM, z + ZOOM_STEP))
      else if (e.key === '-')          setZoom(z => Math.max(MIN_ZOOM, z - ZOOM_STEP))
      else if (e.key === '0')          resetTransform()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, handlePrev, handleNext])

  // ── Mouse wheel zoom ────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)))
  }, [])

  // ── Mouse drag pan (when zoomed) ────────────────────────────
  const handleMouseDown = (e) => {
    if (zoom <= 1) return
    setIsDragging(true)
    dragStartPos.current  = { x: e.clientX, y: e.clientY }
    dragStartPan.current  = { ...pan }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const dx = e.clientX - dragStartPos.current.x
    const dy = e.clientY - dragStartPos.current.y
    setPan({ x: dragStartPan.current.x + dx, y: dragStartPan.current.y + dy })
  }

  const handleMouseUp = () => setIsDragging(false)

  // ── Double-click reset ──────────────────────────────────────
  const handleDoubleClick = () => {
    zoom !== 1 ? resetTransform() : setZoom(2.5)
  }

  // ── Touch pinch & pan ───────────────────────────────────────
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastPinchDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && zoom > 1) {
      // Pan start
      dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      dragStartPan.current = { ...pan }
    }
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 2 && lastPinchDist.current) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = (dist - lastPinchDist.current) * 0.008
      setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)))
      lastPinchDist.current = dist
    } else if (e.touches.length === 1 && zoom > 1) {
      // Touch pan
      const dx = e.touches[0].clientX - dragStartPos.current.x
      const dy = e.touches[0].clientY - dragStartPos.current.y
      setPan({ x: dragStartPan.current.x + dx, y: dragStartPan.current.y + dy })
    }
  }

  const handleTouchEnd = () => { lastPinchDist.current = null }

  // ── Copy helpers ────────────────────────────────────────────
  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2500)
    } catch {}
  }

  // "Copy Image" = download image as blob + copy to clipboard
  const copyImageToClipboard = async (url) => {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ])
      setCopied('image')
      setTimeout(() => setCopied(null), 2500)
    } catch {
      // Fallback: just copy the URL
      copyText(url, 'image')
    }
  }

  // Native share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: `Project: ${projectName}`,
        url: projectUrl || imageUrl,
      }).catch(() => {})
    } else {
      copyText(projectUrl || imageUrl, 'projurl')
    }
  }

  if (!isOpen || images.length === 0) return null

  const active    = images[activeIndex]
  const imageUrl  = typeof active === 'string' ? active : active?.url
  const imageAlt  = typeof active === 'string' ? `${projectName} — Image ${activeIndex + 1}` : active?.alt || projectName

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-lg select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faImage} className="text-white/60 text-[10px]" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-none truncate max-w-[200px] sm:max-w-[360px]">
                {projectName}
              </p>
              {images.length > 1 && (
                <p className="text-white/40 text-[10px] mt-0.5">
                  {activeIndex + 1} / {images.length}
                </p>
              )}
            </div>
          </div>

          {/* Zoom indicator + controls */}
          <div className="flex items-center gap-2">
            {zoom !== 1 && (
              <span className="text-white/50 text-[10px] font-mono">
                {Math.round(zoom * 100)}%
              </span>
            )}
            <button
              onClick={() => setZoom(z => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all"
              aria-label="Zoom out">
              <FontAwesomeIcon icon={faSearchMinus} className="text-xs" />
            </button>
            <button
              onClick={resetTransform}
              className="px-2.5 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all text-[10px] font-mono">
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => setZoom(z => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all"
              aria-label="Zoom in">
              <FontAwesomeIcon icon={faSearchPlus} className="text-xs" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all ml-1"
              aria-label="Close">
              <FontAwesomeIcon icon={faXmark} className="text-base" />
            </button>
          </div>
        </div>

        {/* ── Image area ─────────────────────────────────────── */}
        <div
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white flex items-center justify-center transition-all border border-white/5 backdrop-blur-sm"
              aria-label="Previous">
              <FontAwesomeIcon icon={faChevronLeft} className="text-base" />
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={imageUrl}
              className="flex items-center justify-center w-full h-full p-4 sm:p-8"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-none select-none"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease',
                  maxHeight: 'calc(100vh - 160px)',
                }}
                onDoubleClick={handleDoubleClick}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white flex items-center justify-center transition-all border border-white/5 backdrop-blur-sm"
              aria-label="Next">
              <FontAwesomeIcon icon={faChevronRight} className="text-base" />
            </button>
          )}

          {/* Scroll hint (shown briefly) */}
          {zoom === 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
              <p className="text-[9px] text-white/30 font-medium">
                Scroll to zoom · Pinch on mobile · Double-click to zoom
              </p>
            </div>
          )}
        </div>

        {/* ── Footer action bar ───────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-white/8 px-4 py-3 z-10">
          <div className="flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto">

            {/* URL Copy group */}
            <div className="flex items-center gap-1.5 flex-1 w-full sm:w-auto">
              <button
                onClick={() => copyImageToClipboard(imageUrl)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-semibold transition-all border border-white/8 whitespace-nowrap">
                <FontAwesomeIcon icon={copied === 'image' ? faCheck : faImage} className={copied === 'image' ? 'text-green-400' : ''} />
                {copied === 'image' ? 'Copied!' : 'Copy Image'}
              </button>

              <button
                onClick={() => copyText(imageUrl, 'imgurl')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-semibold transition-all border border-white/8 whitespace-nowrap">
                <FontAwesomeIcon icon={copied === 'imgurl' ? faCheck : faCopy} className={copied === 'imgurl' ? 'text-green-400' : ''} />
                {copied === 'imgurl' ? 'Copied!' : 'Copy Image URL'}
              </button>

              {projectUrl && (
                <button
                  onClick={() => copyText(projectUrl, 'projurl')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-semibold transition-all border border-white/8 whitespace-nowrap">
                  <FontAwesomeIcon icon={copied === 'projurl' ? faCheck : faLink} className={copied === 'projurl' ? 'text-green-400' : ''} />
                  {copied === 'projurl' ? 'Copied!' : 'Copy Project URL'}
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-white/10" />

            {/* Share group */}
            <button
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-[10px] font-bold transition-all shadow-lg">
              <FontAwesomeIcon icon={faShareNodes} />
              Share Project
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
