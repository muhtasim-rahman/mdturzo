// ImagePreviewModal.jsx — v2.4.4
// Moved: src/components/shared → src/components/projects
// Rebuilt UI: cleaner header, filmstrip navigation bottom, better zoom UX

import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faCopy, faShareNodes, faCheck, faSearchPlus, faSearchMinus,
  faImage, faLink, faArrowUpRightFromSquare, faRotateLeft
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_ZOOM = 0.5
const MAX_ZOOM = 6
const ZOOM_STEP = 0.25

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
  const [copied, setCopied]           = useState(null)
  const [dir, setDir]                 = useState(1)

  const lastPinchDist  = useRef(null)
  const dragStartPan   = useRef({ x: 0, y: 0 })
  const dragStartPos   = useRef({ x: 0, y: 0 })
  const filmRef        = useRef(null)

  const resetTransform = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

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

  const goTo = useCallback((next) => {
    setDir(next > activeIndex ? 1 : -1)
    setActiveIndex(next)
    resetTransform()
    setCopied(null)
    // Scroll filmstrip
    setTimeout(() => {
      filmRef.current?.children[next]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }, 50)
  }, [activeIndex])

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return
    goTo(activeIndex === 0 ? images.length - 1 : activeIndex - 1)
  }, [images.length, activeIndex, goTo])

  const handleNext = useCallback(() => {
    if (images.length <= 1) return
    goTo(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
  }, [images.length, activeIndex, goTo])

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

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)))
  }, [])

  const handleMouseDown = (e) => {
    if (zoom <= 1) return
    setIsDragging(true)
    dragStartPos.current  = { x: e.clientX, y: e.clientY }
    dragStartPan.current  = { ...pan }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPan({
      x: dragStartPan.current.x + (e.clientX - dragStartPos.current.x),
      y: dragStartPan.current.y + (e.clientY - dragStartPos.current.y),
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastPinchDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && zoom > 1) {
      dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      dragStartPan.current = { ...pan }
    }
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 2 && lastPinchDist.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist  = Math.hypot(dx, dy)
      const delta = (dist - lastPinchDist.current) * 0.008
      setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)))
      lastPinchDist.current = dist
    } else if (e.touches.length === 1 && zoom > 1) {
      setPan({
        x: dragStartPan.current.x + (e.touches[0].clientX - dragStartPos.current.x),
        y: dragStartPan.current.y + (e.touches[0].clientY - dragStartPos.current.y),
      })
    }
  }

  const handleTouchEnd = () => { lastPinchDist.current = null }

  const copyText = async (text, key) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 2500) }
    catch {}
  }

  const copyImageToClipboard = async (url) => {
    try {
      const res  = await fetch(url)
      const blob = await res.blob()
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
      setCopied('image')
      setTimeout(() => setCopied(null), 2500)
    } catch { copyText(url, 'image') }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: projectName, url: projectUrl || imageUrl }).catch(() => {})
    } else {
      copyText(projectUrl || imageUrl, 'share')
    }
  }

  if (!isOpen || images.length === 0) return null

  const active   = images[activeIndex]
  const imageUrl = typeof active === 'string' ? active : active?.url
  const imageAlt = typeof active === 'string' ? `${projectName} — Image ${activeIndex + 1}` : active?.alt || projectName
  const pct      = Math.round(zoom * 100)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col"
        style={{ background: 'rgba(2,6,23,0.97)', backdropFilter: 'blur(20px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07] flex-shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faImage} className="text-white/50 text-[9px]" />
            </div>
            <div className="min-w-0">
              <p className="text-white/90 font-semibold text-[13px] leading-none truncate max-w-[180px] sm:max-w-[360px]">
                {projectName}
              </p>
              {images.length > 1 && (
                <p className="text-white/35 text-[10px] mt-0.5 font-mono">
                  {activeIndex + 1} of {images.length}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-white/[0.06] rounded-xl p-1 border border-white/[0.08]">
              <button onClick={() => setZoom(z => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all">
                <FontAwesomeIcon icon={faSearchMinus} className="text-[10px]" />
              </button>
              <button onClick={resetTransform}
                className="px-2 h-7 rounded-lg hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-mono transition-all min-w-[42px]">
                {pct}%
              </button>
              <button onClick={() => setZoom(z => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all">
                <FontAwesomeIcon icon={faSearchPlus} className="text-[10px]" />
              </button>
            </div>

            {zoom !== 1 && (
              <button onClick={resetTransform}
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all border border-white/[0.08]"
                title="Reset zoom">
                <FontAwesomeIcon icon={faRotateLeft} className="text-[10px]" />
              </button>
            )}

            <button onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-red-500/20 text-white/60 hover:text-white flex items-center justify-center transition-all border border-white/[0.08] ml-1">
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
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

          {images.length > 1 && (
            <button onClick={handlePrev}
              className="absolute left-3 sm:left-5 z-20 w-11 h-11 rounded-full
                bg-white/[0.07] hover:bg-white/15 text-white/60 hover:text-white
                flex items-center justify-center transition-all border border-white/[0.08] backdrop-blur-sm shadow-xl">
              <FontAwesomeIcon icon={faChevronLeft} className="text-base" />
            </button>
          )}

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={imageUrl}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, scale: 0.94, x: d > 0 ? 30 : -30 }),
                center: ()  => ({ opacity: 1, scale: 1, x: 0 }),
                exit:  (d) => ({ opacity: 0, scale: 0.94, x: d > 0 ? -30 : 30 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center w-full h-full p-4 sm:p-10">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none select-none"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.12s ease',
                  maxHeight: 'calc(100vh - 200px)',
                }}
                onDoubleClick={() => zoom !== 1 ? resetTransform() : setZoom(2.5)}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <button onClick={handleNext}
              className="absolute right-3 sm:right-5 z-20 w-11 h-11 rounded-full
                bg-white/[0.07] hover:bg-white/15 text-white/60 hover:text-white
                flex items-center justify-center transition-all border border-white/[0.08] backdrop-blur-sm shadow-xl">
              <FontAwesomeIcon icon={faChevronRight} className="text-base" />
            </button>
          )}

          {zoom === 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
              <p className="text-[9px] text-white/25 font-medium tracking-wide">
                Scroll or pinch to zoom · Double-click to zoom in
              </p>
            </div>
          )}
        </div>

        {/* ── Filmstrip (multi-image) ─────────────────────────── */}
        {images.length > 1 && (
          <div className="flex-shrink-0 border-t border-white/[0.07] py-2.5 px-4">
            <div ref={filmRef} className="flex gap-2 overflow-x-auto scrollbar-none">
              {images.map((img, i) => {
                const url = typeof img === 'string' ? img : img?.url
                return (
                  <button key={i} onClick={() => goTo(i)}
                    className={`flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === activeIndex
                        ? 'border-[var(--accent-primary)] opacity-100 shadow-sm scale-105'
                        : 'border-white/10 opacity-45 hover:opacity-75'
                    }`}>
                    <img src={url} alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover" loading="lazy" />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Footer actions ──────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-white/[0.07] px-4 py-3 z-10">
          <div className="flex flex-wrap items-center gap-2 max-w-2xl mx-auto">
            <button onClick={() => copyImageToClipboard(imageUrl)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]
                text-white/65 hover:text-white text-[10px] font-semibold transition-all border border-white/[0.08]">
              <FontAwesomeIcon icon={copied === 'image' ? faCheck : faImage}
                className={copied === 'image' ? 'text-emerald-400' : ''} />
              {copied === 'image' ? 'Copied!' : 'Copy Image'}
            </button>

            <button onClick={() => copyText(imageUrl, 'imgurl')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]
                text-white/65 hover:text-white text-[10px] font-semibold transition-all border border-white/[0.08]">
              <FontAwesomeIcon icon={copied === 'imgurl' ? faCheck : faCopy}
                className={copied === 'imgurl' ? 'text-emerald-400' : ''} />
              {copied === 'imgurl' ? 'Copied!' : 'Copy URL'}
            </button>

            {projectUrl && (
              <button onClick={() => copyText(projectUrl, 'projurl')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]
                  text-white/65 hover:text-white text-[10px] font-semibold transition-all border border-white/[0.08]">
                <FontAwesomeIcon icon={copied === 'projurl' ? faCheck : faLink}
                  className={copied === 'projurl' ? 'text-emerald-400' : ''} />
                {copied === 'projurl' ? 'Copied!' : 'Project URL'}
              </button>
            )}

            {projectUrl && (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]
                  text-white/65 hover:text-white text-[10px] font-semibold transition-all border border-white/[0.08]">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                Open Project
              </a>
            )}

            <button onClick={handleShare}
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl
                bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-[10px] font-bold transition-all shadow-lg">
              <FontAwesomeIcon icon={faShareNodes} />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
