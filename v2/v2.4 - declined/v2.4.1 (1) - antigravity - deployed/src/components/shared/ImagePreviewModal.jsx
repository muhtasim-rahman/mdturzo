import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark, faChevronLeft, faChevronRight,
  faCopy, faShareNodes, faCheck
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImagePreviewModal({ isOpen, onClose, images = [], initialIndex = 0, projectName = "" }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [copied, setCopied] = useState(false)

  // Sync index when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex)
      setCopied(false)
      document.body.style.overflow = 'hidden' // Lock scroll
    } else {
      document.body.style.overflow = '' // Restore scroll
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialIndex])

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (images.length <= 1) return
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setCopied(false)
  }, [images])

  const handleNext = useCallback(() => {
    if (images.length <= 1) return
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setCopied(false)
  }, [images])

  // Keypress listeners (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, handlePrev, handleNext])

  if (!isOpen || images.length === 0) return null

  const activeImage = images[activeIndex]
  const imageUrl = typeof activeImage === 'string' ? activeImage : activeImage?.url
  const imageAlt = typeof activeImage === 'string' ? `${projectName} Image ${activeIndex + 1}` : activeImage?.alt || projectName

  const handleCopyLink = () => {
    if (!imageUrl) return
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => console.error('Failed to copy image link: ', err))
  }

  const handleShare = () => {
    if (!imageUrl) return
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: imageAlt,
        url: imageUrl,
      }).catch((err) => console.warn('Share failed: ', err))
    } else {
      handleCopyLink()
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/90 backdrop-blur-md p-4 select-none">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between z-10 py-2 border-b border-white/10">
          <div className="flex flex-col text-left">
            <span className="text-white font-medium text-sm md:text-base line-clamp-1">{projectName}</span>
            {images.length > 1 && (
              <span className="text-white/60 text-xs mt-0.5">
                Image {activeIndex + 1} of {images.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close preview">
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        {/* Content Area / Image Grid */}
        <div className="relative flex-1 w-full flex items-center justify-center min-h-0 py-4">
          
          {/* Navigation Prev Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all focus:outline-none"
              aria-label="Previous image">
              <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
            </button>
          )}

          {/* Image Container */}
          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="max-w-full max-h-full flex items-center justify-center p-2"
            onClick={(e) => {
              // Click outside the image (but inside viewport) closes the modal
              if (e.target === e.currentTarget) onClose()
            }}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-auto border border-white/5"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>

          {/* Navigation Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all focus:outline-none"
              aria-label="Next image">
              <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
            </button>
          )}
        </div>

        {/* Footer Controls */}
        <div className="w-full flex items-center justify-center gap-3 z-10 py-3 border-t border-white/10">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs md:text-sm font-semibold transition-all border border-white/5"
            title="Copy image URL">
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-green-400" : ""} />
            {copied ? "Copied!" : "Copy Link"}
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs md:text-sm font-semibold transition-all border border-white/5 shadow-lg"
            title="Share image">
            <FontAwesomeIcon icon={faShareNodes} />
            Share
          </button>
        </div>
      </div>
    </AnimatePresence>
  )
}
