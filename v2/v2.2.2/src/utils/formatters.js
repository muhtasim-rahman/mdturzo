// ============================================================
// FORMATTERS — date, number, reading time, slug
// ============================================================

// ── Date ──────────────────────────────────────────────────
export function formatDate(dateStr, options = {}) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
    ...options,
  })
}

export function formatDateShort(dateStr) {
  return formatDate(dateStr, { month: 'short' })
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const s    = Math.floor(diff / 1000)
  const m    = Math.floor(s / 60)
  const h    = Math.floor(m / 60)
  const d    = Math.floor(h / 24)
  const w    = Math.floor(d / 7)
  const mo   = Math.floor(d / 30)
  const y    = Math.floor(d / 365)

  if (s < 60)   return 'just now'
  if (m < 60)   return `${m}m ago`
  if (h < 24)   return `${h}h ago`
  if (d < 7)    return `${d}d ago`
  if (w < 5)    return `${w}w ago`
  if (mo < 12)  return `${mo}mo ago`
  return `${y}y ago`
}

// ── Reading Time ───────────────────────────────────────────
export function readingTime(content = '') {
  const words = content.trim().split(/\s+/).length
  const mins  = Math.ceil(words / 200)
  return mins < 1 ? 1 : mins
}

// ── Numbers ───────────────────────────────────────────────
export function formatCount(n) {
  if (!n && n !== 0) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

// ── Slug ──────────────────────────────────────────────────
export function toSlug(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ── Truncate ──────────────────────────────────────────────
export function truncate(str = '', maxLength = 100) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

// ── File size ─────────────────────────────────────────────
export function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  const k    = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i    = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

// ── Capitalize ────────────────────────────────────────────
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
