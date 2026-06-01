// ImageViewer.jsx — v2.4.1
// Shared fullscreen image preview popup — used across projects & feed pages
// Usage:
//   const viewer = useImageViewer()
//   viewer.open([{ url, alt }], index, 'Project Name')
//   <ImageViewer {...viewer} />
//
// Also exported: attachImageViewerToDOM(ref, title, viewer)
//   — call in useEffect to auto-attach click handlers to all <img> in a ref

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faLink, faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import { toast } from '../../store/toastStore.js'

// ── Hook ──────────────────────────────────────────────────────
export function useImageViewer() {
  const [isOpen,       setIsOpen]       = useState(false)
  const [images,       setImages]       = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [title,        setTitle]        = useState('')

  const open = useCallback((imgs, idx = 0, t = '') => {
    if (!imgs?.length) return
    setImages(imgs)
    setCurrentIndex(Math.max(0, Math.min(idx, imgs.length - 1)))
    setTitle(t)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  const prev = useCallback(() =>
    setCurrentIndex(i => (i - 1 + images.length) % images.length),
  [images.length])

  const next = useCallback(() =>
    setCurrentIndex(i => (i + 1) % images.length),
  [images.length])

  const goTo = useCallback((idx) =>
    setCurrentIndex(Math.max(0, Math.min(idx, images.length - 1))),
  [images.length])

  return { isOpen, images, currentIndex, title, open, close, prev, next, goTo }
}

// ── Helper — attach click handlers to all <img> inside a DOM ref ──
export function attachImageViewerToDOM(containerRef, projectTitle, viewer) {
  if (!containerRef?.current) return () => {}
  const imgs = Array.from(containerRef.current.querySelectorAll('img'))
  const data = imgs.map(img => ({ url: img.src, alt: img.alt || projectTitle }))

  imgs.forEach((img, idx) => {
    img.style.cursor = 'zoom-in'
    img.dataset.viewerIdx = idx
    const handler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      viewer.open(data, idx, projectTitle)
    }
    img._viewerHandler = handler
    img.addEventListener('click', handler)
  })

  return () => {
    imgs.forEach(img => {
      img.style.cursor = ''
      delete img.dataset.viewerIdx
      if (img._viewerHandler) {
        img.removeEventListener('click', img._viewerHandler)
        delete img._viewerHandler
      }
    })
  }
}

// ── Component ─────────────────────────────────────────────────
export function ImageViewer({ isOpen, images, currentIndex, title, close, prev, next, goTo }) {
  const backdropRef = useRef(null)
  const current     = images[currentIndex]
  const hasMultiple = images.length > 1
  const [imgLoaded, setImgLoaded] = useState(false)

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = orig }
  }, [isOpen])

  // Reset image loaded state on index change
  useEffect(() => setImgLoaded(false), [currentIndex])

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close, prev, next])

  // Copy URL
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(current?.url || window.location.href)
      toast.success('Copied!', 'Image URL copied to clipboard')
    } catch {
      toast.error('Failed', 'Could not copy URL')
    }
  }

  // Share
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: current?.alt || title || 'Image',
          url: current?.url || window.location.href,
        })
      } catch {}
    } else {
      copyUrl()
    }
  }

  if (!isOpen || !images.length) return null

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex flex-col select-none"
      style={{ background: 'rgba(8,8,12,0.94)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === backdropRef.current) close() }}>

      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0 gap-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.35)' }}>
        <div className="flex items-center gap-2.5 min-w-0">
          {hasMultiple && (
            <span className="text-xs font-mono text-white/40 flex-shrink-0 bg-white/5 px-2 py-0.5 rounded">
              {currentIndex + 1}/{images.length}
            </span>
          )}
          <span className="text-sm text-white/70 truncate leading-tight">
            {current?.alt || title || 'Image Preview'}
          </span>
        </div>
        <button
          onClick={close}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
          aria-label="Close viewer">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* ── Image area ── */}
      <div className="flex-1 relative flex items-center justify-center p-4 min-h-0 overflow-hidden">
        {/* Prev arrow */}
        {hasMultiple && (
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-black/40 hover:bg-black/70 border border-white/10 transition-all"
            aria-label="Previous image">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        {/* Image with loading state */}
        <div className="relative max-w-full max-h-full flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.img
              key={`${currentIndex}-${current?.url}`}
              src={current?.url}
              alt={current?.alt || ''}
              onLoad={() => setImgLoaded(true)}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              style={{
                maxHeight: 'calc(100vh - 140px)',
                opacity: imgLoaded ? 1 : 0,
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Next arrow */}
        {hasMultiple && (
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-black/40 hover:bg-black/70 border border-white/10 transition-all"
            aria-label="Next image">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>

      {/* ── Footer bar ── */}
      <div
        className="flex items-center justify-center gap-2 px-4 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.35)' }}
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={copyUrl}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/55 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
          <FontAwesomeIcon icon={faLink} className="text-[10px]" />
          Copy URL
        </button>
        <button
          onClick={share}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/55 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
          <FontAwesomeIcon icon={faShareNodes} className="text-[10px]" />
          Share
        </button>

        {/* Dot nav for multiple images */}
        {hasMultiple && (
          <div className="flex items-center gap-1.5 ml-3 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="rounded-full transition-all duration-200 hover:scale-125"
                style={{
                  width:      idx === currentIndex ? '18px' : '6px',
                  height:     '6px',
                  background: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
