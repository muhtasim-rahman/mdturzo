// FeedSkeleton.jsx — v2.5.0
// Skeletons for Feed list page (grid/list) and detail pages.

export default function FeedSkeleton() {
  const items = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div className="pt-[var(--navbar-h)]">
      {/* Banner skeleton */}
      <div className="border-b border-[var(--border-color)] py-12">
        <div className="container-xl space-y-3">
          <div className="sk h-3.5 w-32 rounded-full" />
          <div className="sk h-9 w-48 rounded" />
          <div className="sk h-4 w-72 rounded" />
        </div>
      </div>

      <div className="container-xl py-8">
        {/* Type tabs skeleton */}
        <div className="flex gap-2 mb-6">
          {[80, 72, 72].map((w, i) => (
            <div key={i} className="sk h-9 rounded-xl" style={{ width: w }} />
          ))}
        </div>

        {/* Controls skeleton */}
        <div className="flex gap-3 mb-4">
          <div className="sk h-10 rounded-xl flex-1 max-w-sm" />
          <div className="sk h-10 w-28 rounded-xl" />
          <div className="sk h-10 w-20 rounded-xl" />
        </div>

        {/* Category pills skeleton */}
        <div className="flex gap-2 mb-6 pb-4 border-b border-[var(--border-color)]">
          {[44, 60, 72, 52, 80].map((w, i) => (
            <div key={i} className="sk h-8 rounded-xl flex-shrink-0" style={{ width: w }} />
          ))}
        </div>

        {/* Cards grid skeleton */}
        <div className="feed-grid">
          {items.map(i => (
            <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden">
              <div className="sk" style={{ aspectRatio: '16/9', width: '100%' }} />
              <div className="p-4 space-y-2">
                <div className="flex gap-2">
                  <div className="sk h-5 w-12 rounded-full" />
                  <div className="sk h-5 w-16 rounded-full" />
                </div>
                <div className="sk h-5 w-4/5 rounded" />
                <div className="sk h-4 w-full rounded" />
                <div className="sk h-4 w-2/3 rounded" />
                <div className="flex justify-between mt-2">
                  <div className="sk h-3.5 w-20 rounded" />
                  <div className="sk h-3.5 w-24 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Blog detail skeleton (exported for App.jsx)
export function BlogDetailSkeleton() {
  return (
    <div className="pt-[var(--navbar-h)]">
      <div className="container-xl py-8">
        <div className="sk h-4 w-56 rounded mb-6" />
        <div className="sk w-full rounded-xl mb-6" style={{ aspectRatio: '21/9' }} />

        {/* Hero card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-7 mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="sk h-6 w-14 rounded-full" />
            <div className="sk h-6 w-20 rounded-full" />
          </div>
          <div className="sk h-9 w-3/4 rounded" />
          <div className="sk h-5 w-full rounded" />
          <div className="flex gap-4">
            <div className="sk h-4 w-28 rounded" />
            <div className="sk h-4 w-20 rounded" />
            <div className="sk h-4 w-20 rounded" />
          </div>
        </div>

        {/* Two col layout */}
        <div className="grid lg:grid-cols-[1fr_260px] gap-8">
          <div className="space-y-3">
            <div className="sk h-4 w-full rounded" />
            <div className="sk h-4 w-11/12 rounded" />
            <div className="sk h-4 w-4/5 rounded" />
            <div className="sk h-6 w-48 rounded mt-4" />
            <div className="sk h-4 w-full rounded" />
            <div className="sk h-4 w-5/6 rounded" />
            <div className="sk h-4 w-full rounded" />
          </div>
          <div className="hidden lg:block space-y-3">
            <div className="sk h-48 rounded-xl" />
            <div className="sk h-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Post detail skeleton
export function PostDetailSkeleton() {
  return (
    <div className="pt-[var(--navbar-h)]">
      <div className="container-md py-8">
        <div className="sk h-4 w-56 rounded mb-6" />
        <div className="sk w-full rounded-xl mb-6" style={{ aspectRatio: '16/9' }} />
        <div className="flex gap-2 mb-3">
          <div className="sk h-6 w-14 rounded-full" />
          <div className="sk h-6 w-20 rounded-full" />
        </div>
        <div className="sk h-8 w-3/4 rounded mb-3" />
        <div className="sk h-4 w-1/3 rounded mb-6" />
        <div className="sk h-12 w-full rounded-xl mb-4" />
        <div className="space-y-2">
          <div className="sk h-4 w-full rounded" />
          <div className="sk h-4 w-5/6 rounded" />
          <div className="sk h-4 w-3/4 rounded" />
        </div>
      </div>
    </div>
  )
}
