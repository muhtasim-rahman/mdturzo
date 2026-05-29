// ============================================================
// SKELETON COMPONENTS — reusable skeleton shapes
// All shapes use .sk class from index.css (wave animation)
// ============================================================

// ── Text lines skeleton ────────────────────────────────────
export function SkeletonText({ lines = 3, className = '' }) {
  const widths = ['w-full', 'w-4/5', 'w-3/4', 'w-2/3', 'w-1/2', 'w-5/6']
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={`sk h-4 ${widths[i % widths.length]} sk-d${(i % 4) + 1}`}
        />
      ))}
    </div>
  )
}

// ── Circle (avatar) skeleton ───────────────────────────────
export function SkeletonCircle({ size = 48, className = '' }) {
  return (
    <div
      className={`sk rounded-full flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

// ── Card skeleton ──────────────────────────────────────────
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card p-5 space-y-4 ${className}`}>
      {/* Thumbnail */}
      <div className="sk h-44 w-full rounded-lg" />
      {/* Tags */}
      <div className="flex gap-2">
        <div className="sk h-5 w-16 rounded-full" />
        <div className="sk h-5 w-20 rounded-full sk-d1" />
      </div>
      {/* Title */}
      <div className="sk h-5 w-3/4" />
      <div className="sk h-4 w-1/2 sk-d2" />
      {/* Description */}
      <SkeletonText lines={2} />
      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="sk h-4 w-20" />
        <div className="sk h-8 w-24 rounded-lg" />
      </div>
    </div>
  )
}

// ── List row skeleton ──────────────────────────────────────
export function SkeletonRow({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 p-4 border-b border-[var(--border-subtle)] ${className}`}>
      <div className="sk w-12 h-12 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="sk h-4 w-2/3" />
        <div className="sk h-3 w-1/2 sk-d1" />
      </div>
      <div className="sk h-8 w-20 rounded-lg" />
    </div>
  )
}

// ── Banner skeleton ────────────────────────────────────────
export function SkeletonBanner({ className = '' }) {
  return (
    <div className={`sk h-52 w-full rounded-xl ${className}`} />
  )
}

// ── Stat card skeleton ─────────────────────────────────────
export function SkeletonStat({ className = '' }) {
  return (
    <div className={`card p-5 text-center space-y-2 ${className}`}>
      <div className="sk h-10 w-20 mx-auto rounded-lg" />
      <div className="sk h-3 w-16 mx-auto" />
    </div>
  )
}

// ── Blog detail skeleton ───────────────────────────────────
export function SkeletonBlogDetail({ className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="sk h-8 w-3/4" />
      <div className="flex gap-4">
        <SkeletonCircle size={40} />
        <div className="space-y-2 flex-1">
          <div className="sk h-4 w-32" />
          <div className="sk h-3 w-24 sk-d1" />
        </div>
      </div>
      <SkeletonBanner />
      <SkeletonText lines={5} />
      <SkeletonText lines={3} />
    </div>
  )
}

// ── Table skeleton ─────────────────────────────────────────
export function SkeletonTable({ rows = 5, cols = 4, className = '' }) {
  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex gap-3 p-3 border-b border-[var(--border-subtle)] mb-1">
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} className="sk h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-3 p-3 border-b border-[var(--border-subtle)]">
          {Array.from({ length: cols }, (_, c) => (
            <div key={c} className={`sk h-4 flex-1 sk-d${(c % 4) + 1}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Projects grid skeleton (6 cards) ──────────────────────
export function SkeletonProjectGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

// ── Notification item skeleton ────────────────────────────
export function SkeletonNotif({ count = 3 }) {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex gap-3 p-4 border-b border-[var(--border-subtle)]">
          <div className="sk w-8 h-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="sk h-4 w-3/4" />
            <div className="sk h-3 w-1/2 sk-d1" />
          </div>
        </div>
      ))}
    </div>
  )
}
