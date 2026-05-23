// ============================================================
// SKELETON SYSTEM — v2.1.1 Advanced
// Auto-generating page skeletons based on layout type
// All shapes use .sk class (wave animation from index.css)
// ============================================================

// ── Primitives ──────────────────────────────────────────────
export function SignatureLoader({ compact = false, label = '' }) {
  return (
    <div className={`signature-loader-wrap ${compact ? 'is-compact' : ''}`} role="status" aria-live="polite">
      <div className="signature-loader" aria-hidden />
      {label && <p className="signature-loader-text">{label}</p>}
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  const widths = ['w-full', 'w-4/5', 'w-3/4', 'w-2/3', 'w-1/2', 'w-5/6']
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className={`sk h-4 rounded ${widths[i % widths.length]}`}
          style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
    </div>
  )
}

export function SkeletonCircle({ size = 48, className = '' }) {
  return <div className={`sk rounded-full flex-shrink-0 ${className}`} style={{ width: size, height: size }} />
}

export function SkeletonBox({ w = 'w-full', h = 'h-4', rounded = 'rounded', className = '', delay = 0 }) {
  return <div className={`sk ${w} ${h} ${rounded} ${className}`} style={{ animationDelay: `${delay}s` }} />
}

// ── Compound shapes ─────────────────────────────────────────
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card p-5 space-y-4 ${className}`}>
      <SkeletonBox h="h-44" rounded="rounded-lg" />
      <div className="flex gap-2">
        <SkeletonBox w="w-16" h="h-5" rounded="rounded-full" delay={0.05} />
        <SkeletonBox w="w-20" h="h-5" rounded="rounded-full" delay={0.1} />
      </div>
      <SkeletonBox w="w-3/4" h="h-5" delay={0.12} />
      <SkeletonBox w="w-1/2" h="h-4" delay={0.15} />
      <SkeletonText lines={2} />
      <div className="flex items-center justify-between pt-2">
        <SkeletonBox w="w-20" h="h-4" delay={0.18} />
        <SkeletonBox w="w-24" h="h-8" rounded="rounded-lg" delay={0.2} />
      </div>
    </div>
  )
}

export function SkeletonRow({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 p-4 border-b border-[var(--border-color)] ${className}`}>
      <SkeletonBox w="w-12" h="h-12" rounded="rounded-lg" />
      <div className="flex-1 space-y-2">
        <SkeletonBox w="w-2/3" h="h-4" />
        <SkeletonBox w="w-1/2" h="h-3" delay={0.08} />
      </div>
      <SkeletonBox w="w-20" h="h-8" rounded="rounded-lg" delay={0.12} />
    </div>
  )
}

export function SkeletonBanner({ className = '' }) {
  return <div className={`sk h-52 w-full rounded-xl ${className}`} />
}

export function SkeletonStat({ className = '' }) {
  return (
    <div className={`card p-5 text-center space-y-2 ${className}`}>
      <SkeletonBox w="w-20" h="h-10" rounded="rounded-lg" className="mx-auto" />
      <SkeletonBox w="w-16" h="h-3" className="mx-auto" />
    </div>
  )
}

export function SkeletonProjectGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4, className = '' }) {
  return (
    <div className={className}>
      <div className="flex gap-3 p-3 border-b border-[var(--border-color)] mb-1">
        {Array.from({ length: cols }, (_, i) => <SkeletonBox key={i} h="h-4" className="flex-1" />)}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-3 p-3 border-b border-[var(--border-color)]">
          {Array.from({ length: cols }, (_, c) => (
            <SkeletonBox key={c} h="h-4" className="flex-1" delay={c * 0.04} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonNotif({ count = 3 }) {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex gap-3 p-4 border-b border-[var(--border-color)]">
          <SkeletonCircle size={32} />
          <div className="flex-1 space-y-2">
            <SkeletonBox w="w-3/4" h="h-4" />
            <SkeletonBox w="w-1/2" h="h-3" delay={0.08} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonBlogDetail({ className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <SkeletonBox w="w-3/4" h="h-8" />
      <div className="flex gap-4">
        <SkeletonCircle size={40} />
        <div className="space-y-2 flex-1">
          <SkeletonBox w="w-32" h="h-4" />
          <SkeletonBox w="w-24" h="h-3" delay={0.08} />
        </div>
      </div>
      <SkeletonBanner />
      <SkeletonText lines={5} />
      <SkeletonText lines={3} />
    </div>
  )
}

// ── PageSkeleton — Auto layout-aware skeleton ───────────────
// layout types: 'hero' | 'list' | 'grid' | 'detail' | 'profile' | 'admin' | 'form' | 'blank'
const LAYOUTS = {
  hero: () => (
    <div className="container py-16 space-y-10">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row gap-10 items-center py-8">
        <div className="flex-1 space-y-5">
          <SkeletonBox w="w-1/3" h="h-5" rounded="rounded-full" />
          <SkeletonBox w="w-5/6" h="h-12" delay={0.05} />
          <SkeletonBox w="w-4/6" h="h-12" delay={0.08} />
          <SkeletonText lines={2} />
          <div className="flex gap-3">
            <SkeletonBox w="w-32" h="h-11" rounded="rounded-full" delay={0.1} />
            <SkeletonBox w="w-36" h="h-11" rounded="rounded-full" delay={0.12} />
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => <SkeletonCircle key={i} size={36} />)}
          </div>
        </div>
        <SkeletonCircle size={280} className="flex-shrink-0" />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <SkeletonStat key={i} />)}
      </div>
    </div>
  ),

  grid: () => (
    <div className="container py-10 space-y-8">
      <div className="flex items-center justify-between">
        <SkeletonBox w="w-40" h="h-8" />
        <SkeletonBox w="w-32" h="h-10" rounded="rounded-full" />
      </div>
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => <SkeletonBox key={i} w="w-20" h="h-8" rounded="rounded-full" delay={i * 0.04} />)}
      </div>
      <SkeletonProjectGrid count={6} />
    </div>
  ),

  list: () => (
    <div className="container py-10 space-y-6">
      <SkeletonBox w="w-48" h="h-8" />
      <div className="card overflow-hidden">
        {[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}
      </div>
    </div>
  ),

  detail: () => (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="space-y-6">
        <SkeletonBox w="w-24" h="h-5" rounded="rounded-full" />
        <SkeletonBox w="w-5/6" h="h-10" delay={0.05} />
        <div className="flex gap-3">
          <SkeletonCircle size={44} />
          <div className="flex-1 space-y-2">
            <SkeletonBox w="w-36" h="h-4" />
            <SkeletonBox w="w-24" h="h-3" delay={0.06} />
          </div>
        </div>
        <SkeletonBanner />
        <SkeletonText lines={6} />
        <SkeletonText lines={4} />
        <SkeletonText lines={3} />
      </div>
    </div>
  ),

  profile: () => (
    <div className="container py-10 space-y-8 max-w-4xl mx-auto">
      <div className="card p-8 flex gap-6 items-start">
        <SkeletonCircle size={88} />
        <div className="flex-1 space-y-3">
          <SkeletonBox w="w-48" h="h-7" />
          <SkeletonBox w="w-32" h="h-4" delay={0.05} />
          <SkeletonText lines={2} />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => <SkeletonBox key={i} w="w-8" h="h-8" rounded="rounded-full" />)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  ),

  admin: () => (
    <div className="flex gap-0 min-h-[80vh]">
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0 border-r border-[var(--border-color)] p-4 space-y-2">
        <SkeletonBox w="w-full" h="h-10" rounded="rounded-xl" />
        {[...Array(8)].map((_, i) => <SkeletonBox key={i} w="w-full" h="h-9" rounded="rounded-xl" delay={i * 0.03} />)}
      </div>
      {/* Content */}
      <div className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <SkeletonBox w="w-40" h="h-8" />
          <SkeletonBox w="w-28" h="h-10" rounded="rounded-xl" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonStat key={i} />)}
        </div>
        <SkeletonTable rows={6} />
      </div>
    </div>
  ),

  form: () => (
    <div className="container py-10 max-w-xl mx-auto">
      <div className="card p-8 space-y-6">
        <SkeletonBox w="w-40" h="h-7" />
        <SkeletonText lines={1} />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonBox w="w-24" h="h-4" delay={i * 0.05} />
            <SkeletonBox w="w-full" h="h-11" rounded="rounded-xl" delay={i * 0.06} />
          </div>
        ))}
        <SkeletonBox w="w-full" h="h-11" rounded="rounded-xl" delay={0.2} />
      </div>
    </div>
  ),

  blank: () => (
    <div className="container py-10 space-y-4">
      {[...Array(3)].map((_, i) => <SkeletonBox key={i} w="w-full" h="h-32" rounded="rounded-2xl" delay={i * 0.08} />)}
    </div>
  ),
}

export function PageSkeleton({ layout = 'blank' }) {
  const Render = LAYOUTS[layout] || LAYOUTS.blank
  return (
    <div className="animate-in fade-in duration-300 min-h-[60vh]" aria-hidden aria-label="Loading...">
      <Render />
    </div>
  )
}
