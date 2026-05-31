// ============================================================
// Formatters — utility functions
// v2.4.0: Added formatDistanceToNow
// ============================================================

/**
 * Format date string to readable form.
 */
export function formatDate(dateStr, options = {}) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
    ...options,
  })
}

/**
 * Format date to short string: Jan 5, 2024
 */
export function formatDateShort(dateStr) {
  return formatDate(dateStr, { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Format relative time: "2 hours ago", "3 days ago"
 */
export function formatDistanceToNow(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d)) return ''

  const now  = Date.now()
  const diff = now - d.getTime() // ms

  const secs  = Math.floor(diff / 1000)
  const mins  = Math.floor(diff / 60000)
  const hrs   = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  const weeks = Math.floor(diff / 604800000)
  const mons  = Math.floor(diff / 2592000000)
  const yrs   = Math.floor(diff / 31536000000)

  if (secs < 60)   return 'just now'
  if (mins < 60)   return `${mins}m ago`
  if (hrs  < 24)   return `${hrs}h ago`
  if (days < 7)    return `${days}d ago`
  if (weeks < 4)   return `${weeks}w ago`
  if (mons  < 12)  return `${mons}mo ago`
  return `${yrs}y ago`
}

/**
 * Format number with k/m suffix.
 */
export function formatNumber(n) {
  if (n == null) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

/**
 * Estimate reading time in minutes from word count.
 */
export function readingTime(text = '') {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

/**
 * Format file size in human-readable form.
 */
export function formatFileSize(bytes) {
  if (bytes < 1024)       return `${bytes} B`
  if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`
  return `${(bytes / 1073741824).toFixed(1)} GB`
}
