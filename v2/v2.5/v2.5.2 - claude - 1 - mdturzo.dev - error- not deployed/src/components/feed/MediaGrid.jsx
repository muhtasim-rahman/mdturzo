// MediaGrid.jsx — v2.5.2
// Facebook-style image grid for post cards and detail pages.
// 1 img: full width 16:9  |  2 imgs: side by side
// 3 imgs: 1 left + 2 right stacked  |  4: 2×2
// 5+: 2×2 with overlay showing remaining count
// Video: iframe embed, no mix with images (single video)

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import ImagePreviewModal from '../shared/ImagePreviewModal.jsx'

// Extract YouTube/video embed URL
function getEmbedUrl(url) {
  if (!url) return null
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const id = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1]
    return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null
  }
  if (url.includes('facebook.com/watch') || url.includes('fb.watch')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0`
  }
  return url
}

// Get video thumbnail
function getVideoThumb(item) {
  if (item.thumbnail) return item.thumbnail
  if (item.url?.includes('youtube') || item.url?.includes('youtu.be')) {
    const id = item.url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1]
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  }
  return null
}

// ── Single video player ───────────────────────────────────────
function VideoEmbed({ item }) {
  const [playing, setPlaying] = useState(false)
  const embedUrl = getEmbedUrl(item.url)
  const thumb    = getVideoThumb(item)

  if (!embedUrl) return null

  if (!playing) {
    return (
      <div
        onClick={() => setPlaying(true)}
        style={{
          position: 'relative', width: '100%', aspectRatio: '16/9',
          background: '#000', cursor: 'pointer', overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        {thumb && (
          <img
            src={thumb} alt={item.caption || 'Video thumbnail'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.15s',
          }}>
            <FontAwesomeIcon icon={faPlay} style={{ color: '#fff', fontSize: '1.25rem', marginLeft: 4 }} />
          </div>
        </div>
        {item.caption && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '1.5rem 0.875rem 0.625rem',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem',
          }}>
            {item.caption}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', aspectRatio: '16/9', background: '#000' }}>
      <iframe
        src={`${embedUrl}&autoplay=1`}
        title={item.caption || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  )
}

// ── Image cell ────────────────────────────────────────────────
function ImgCell({ item, onClick, overlayCount, style = {} }) {
  return (
    <div
      className="media-grid-item"
      onClick={onClick}
      style={style}
    >
      <img src={item.url} alt={item.caption || 'Post image'} loading="lazy" />
      {overlayCount > 0 && (
        <div className="media-overlay-more">+{overlayCount}</div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
export default function MediaGrid({
  items = [],
  onItemClick,   // external override (e.g. navigate to detail)
  inDetail = false, // true on detail page → no navigate, open preview directly
}) {
  const [preview, setPreview] = useState(null)

  if (!items.length) return null

  // Check for video (single video, no mix with images)
  const videoItem = items.find(i => i.type === 'video' || i.type === 'youtube' || i.type === 'facebook' || i.type === 'tiktok')
  if (videoItem) return <VideoEmbed item={videoItem} />

  // Image items only
  const imgs = items.filter(i => i.type === 'image' || !i.type || i.url)
  if (!imgs.length) return null

  const count = imgs.length
  const previewImages = imgs.map(i => ({ url: i.url, alt: i.caption || '' }))

  const openPreview = (idx) => {
    if (onItemClick && !inDetail) { onItemClick(idx); return }
    setPreview(idx)
  }

  // ── Layout by count ─────────────────────────────────────────
  const maxHeight = 'min(360px, 60vw)'
  const containerStyle = { width: '100%', overflow: 'hidden' }

  // 1 image
  if (count === 1) {
    return (
      <>
        <div style={{ ...containerStyle, aspectRatio: '16/9', maxHeight }}>
          <ImgCell item={imgs[0]} onClick={() => openPreview(0)} style={{ width: '100%', height: '100%' }} />
        </div>
        {preview !== null && <ImagePreviewModal images={previewImages} startIndex={preview} onClose={() => setPreview(null)} />}
      </>
    )
  }

  // 2 images
  if (count === 2) {
    return (
      <>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, aspectRatio: '2/1', maxHeight }}>
          {imgs.map((img, i) => <ImgCell key={i} item={img} onClick={() => openPreview(i)} style={{ height: '100%' }} />)}
        </div>
        {preview !== null && <ImagePreviewModal images={previewImages} startIndex={preview} onClose={() => setPreview(null)} />}
      </>
    )
  }

  // 3 images: first takes full left, right two stack
  if (count === 3) {
    return (
      <>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, aspectRatio: '1/1', maxHeight }}>
          <ImgCell item={imgs[0]} onClick={() => openPreview(0)} style={{ gridRow: 'span 2', height: '100%' }} />
          <ImgCell item={imgs[1]} onClick={() => openPreview(1)} style={{ height: '100%' }} />
          <ImgCell item={imgs[2]} onClick={() => openPreview(2)} style={{ height: '100%' }} />
        </div>
        {preview !== null && <ImagePreviewModal images={previewImages} startIndex={preview} onClose={() => setPreview(null)} />}
      </>
    )
  }

  // 4 images: 2×2
  if (count === 4) {
    return (
      <>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, aspectRatio: '1/1', maxHeight }}>
          {imgs.map((img, i) => <ImgCell key={i} item={img} onClick={() => openPreview(i)} style={{ height: '100%' }} />)}
        </div>
        {preview !== null && <ImagePreviewModal images={previewImages} startIndex={preview} onClose={() => setPreview(null)} />}
      </>
    )
  }

  // 5+ images: 2×2 with overlay on 4th showing remaining count
  return (
    <>
      <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, aspectRatio: '1/1', maxHeight }}>
        {imgs.slice(0, 3).map((img, i) => <ImgCell key={i} item={img} onClick={() => openPreview(i)} style={{ height: '100%' }} />)}
        <ImgCell
          item={imgs[3]}
          onClick={() => openPreview(3)}
          overlayCount={count - 4}
          style={{ height: '100%' }}
        />
      </div>
      {preview !== null && <ImagePreviewModal images={previewImages} startIndex={preview} onClose={() => setPreview(null)} />}
    </>
  )
}
