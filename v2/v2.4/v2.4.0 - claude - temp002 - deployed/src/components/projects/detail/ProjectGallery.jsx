// ProjectGallery.jsx — v2.4.0 — Lightbox gallery for project screenshots
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faChevronLeft, faChevronRight, faExpand } from '@fortawesome/free-solid-svg-icons'

export default function ProjectGallery({ screenshots = [] }) {
  const [lightbox, setLightbox] = useState(null) // index | null
  if (!screenshots.length) return null

  const open  = (i) => setLightbox(i)
  const close = () => setLightbox(null)
  const prev  = () => setLightbox(i => (i - 1 + screenshots.length) % screenshots.length)
  const next  = () => setLightbox(i => (i + 1) % screenshots.length)

  useEffect(() => {
    if (lightbox === null) return
    const fn = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox])

  return (
    <div className="pg-wrap">
      <h3 className="pg-heading">Screenshots</h3>
      <div className="pg-grid">
        {screenshots.map((s, i) => (
          <button key={i} className="pg-item" onClick={() => open(i)} aria-label={s.caption || `Screenshot ${i+1}`}>
            <img src={s.url} alt={s.alt || s.caption || `Screenshot ${i+1}`} className="pg-img" loading="lazy"/>
            <div className="pg-overlay">
              <FontAwesomeIcon icon={faExpand} className="pg-expand-icon"/>
            </div>
            {s.caption && <div className="pg-caption">{s.caption}</div>}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="pg-lb"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={e => e.target===e.currentTarget && close()}
          >
            <button className="pg-lb-close" onClick={close}><FontAwesomeIcon icon={faXmark}/></button>
            {screenshots.length > 1 && (
              <>
                <button className="pg-lb-nav pg-lb-nav--prev" onClick={prev}><FontAwesomeIcon icon={faChevronLeft}/></button>
                <button className="pg-lb-nav pg-lb-nav--next" onClick={next}><FontAwesomeIcon icon={faChevronRight}/></button>
              </>
            )}
            <motion.div
              key={lightbox}
              className="pg-lb-inner"
              initial={{ opacity:0, scale:.94 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.94 }}
              transition={{ duration:.2 }}
            >
              <img src={screenshots[lightbox].url} alt={screenshots[lightbox].alt || ''} className="pg-lb-img"/>
              {screenshots[lightbox].caption && <p className="pg-lb-caption">{screenshots[lightbox].caption}</p>}
              <div className="pg-lb-counter">{lightbox+1} / {screenshots.length}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pg-wrap { margin: 2rem 0; }
        .pg-heading { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 1rem; font-family: var(--font-display); }
        .pg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: .75rem; }
        .pg-item { position: relative; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-color); cursor: pointer; background: transparent; padding: 0; aspect-ratio: 16/10; }
        .pg-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .3s; }
        .pg-item:hover .pg-img { transform: scale(1.04); }
        .pg-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.4); opacity: 0; display: flex; align-items: center; justify-content: center; transition: opacity .2s; }
        .pg-item:hover .pg-overlay { opacity: 1; }
        .pg-expand-icon { color: #fff; font-size: 1.3rem; }
        .pg-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: .4rem .6rem; background: rgba(0,0,0,.65); color: #fff; font-size: .72rem; backdrop-filter: blur(4px); }
        .pg-lb { position: fixed; inset: 0; z-index: 700; background: rgba(0,0,0,.92); display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .pg-lb-close { position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: background .2s; z-index: 10; }
        .pg-lb-close:hover { background: rgba(255,255,255,.2); }
        .pg-lb-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: background .2s; z-index: 10; }
        .pg-lb-nav:hover { background: rgba(255,255,255,.2); }
        .pg-lb-nav--prev { left: 1rem; }
        .pg-lb-nav--next { right: 1rem; }
        .pg-lb-inner { max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column; align-items: center; gap: .75rem; }
        .pg-lb-img { max-width: 100%; max-height: 78vh; border-radius: var(--radius-lg); object-fit: contain; box-shadow: 0 20px 60px rgba(0,0,0,.5); }
        .pg-lb-caption { color: rgba(255,255,255,.8); font-size: .85rem; text-align: center; }
        .pg-lb-counter { color: rgba(255,255,255,.5); font-size: .78rem; }
      `}</style>
    </div>
  )
}
