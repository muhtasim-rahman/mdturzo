// MediaGrid.jsx — v2.5.1
// Facebook-style media grid.
// 1 item → full width 16:9
// 2 items → 50/50 square
// 3 items → large left + 2 stacked right
// 4+ items → 2×2 with "+N" overlay on last

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

function getYtThumb(url) {
  const m = url?.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null
}

function MediaItem({ item, showMore, extraCount, onClick }) {
  const isVideo = item.type === 'video'
  const src = isVideo ? (item.thumbnail || getYtThumb(item.url)) : item.url

  return (
    <div className="media-grid-item" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}>
      {src
        ? <img src={src} alt={item.caption || ''} loading="lazy" draggable="false" />
        : <div style={{ width:'100%', height:'100%', background:'var(--bg-surface-3)' }} />
      }
      {isVideo && !showMore && (
        <div className="media-play-icon">
          <span><FontAwesomeIcon icon={faPlay} style={{ color:'#fff', fontSize:'1.125rem', marginLeft:2 }} /></span>
        </div>
      )}
      {showMore && (
        <div className="media-overlay-more">+{extraCount}</div>
      )}
    </div>
  )
}

export default function MediaGrid({ items = [], onItemClick }) {
  if (!items?.length) return null

  const visible = items.slice(0, 4)
  const extra   = items.length - 4
  const cls     = items.length === 1 ? 'count-1'
                : items.length === 2 ? 'count-2'
                : items.length === 3 ? 'count-3'
                : 'count-4'

  return (
    <div className={`media-grid ${cls}`}>
      {visible.map((item, i) => {
        const isLast    = i === visible.length - 1
        const showMore  = isLast && extra > 0
        return (
          <MediaItem
            key={i}
            item={item}
            showMore={showMore}
            extraCount={extra + 1}
            onClick={() => onItemClick?.(i)}
          />
        )
      })}
    </div>
  )
}
