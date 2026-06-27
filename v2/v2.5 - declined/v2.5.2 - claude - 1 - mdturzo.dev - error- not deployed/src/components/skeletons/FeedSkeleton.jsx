// FeedSkeleton.jsx — v2.5.1
// Skeletons for Feed list, Blog detail, and Post detail pages.

export default function FeedSkeleton() {
  return (
    <div style={{ paddingTop: 'var(--navbar-h)' }}>
      {/* Banner */}
      <div style={{ borderBottom: '1px solid var(--border-color)', padding: 'clamp(1.5rem,4vw,2.5rem) 0 2rem' }}>
        <div className="container-xl" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          <div className="sk" style={{ height: 13, width: 120, borderRadius: 99 }} />
          <div className="sk" style={{ height: 36, width: 160, borderRadius: 8 }} />
          <div className="sk" style={{ height: 15, width: 280, borderRadius: 8 }} />
        </div>
      </div>

      <div className="container-xl" style={{ paddingBlock: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          {/* Main */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Filter bar */}
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.875rem 1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', marginBottom: '1rem', overflow: 'hidden' }}>
              {[80, 72, 72].map((w, i) => <div key={i} className="sk" style={{ height: 32, width: w, borderRadius: 99 }} />)}
            </div>
            {/* Controls */}
            <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}>
              <div className="sk" style={{ height: 36, flex: 1, maxWidth: 280, borderRadius: 99 }} />
              <div className="sk" style={{ height: 36, width: 100, borderRadius: 99 }} />
            </div>
            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Post card sk */}
              {[0,1].map(i => (
                <div key={`p${i}`} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.125rem' }}>
                    <div className="sk" style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div className="sk" style={{ height: 14, width: 140, borderRadius: 6 }} />
                      <div className="sk" style={{ height: 11, width: 100, borderRadius: 6 }} />
                    </div>
                  </div>
                  <div style={{ padding: '0 1.125rem 0.875rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="sk" style={{ height: 14, width: '100%', borderRadius: 6 }} />
                    <div className="sk" style={{ height: 14, width: '80%', borderRadius: 6 }} />
                  </div>
                  <div className="sk" style={{ width: '100%', aspectRatio: '16/9' }} />
                  <div style={{ display: 'flex', borderTop: '1px solid var(--border-color)' }}>
                    {[0,1,2].map(j => <div key={j} className="sk" style={{ flex: 1, height: 38, margin: '0.5rem 0.25rem', borderRadius: 8 }} />)}
                  </div>
                </div>
              ))}
              {/* Blog card sk */}
              {[0,1].map(i => (
                <div key={`b${i}`} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
                  <div className="sk" style={{ width: '100%', aspectRatio: '16/7' }} />
                  <div style={{ padding: '1.125rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div className="sk" style={{ height: 22, width: 52, borderRadius: 99 }} />
                      <div className="sk" style={{ height: 22, width: 72, borderRadius: 99 }} />
                    </div>
                    <div className="sk" style={{ height: 20, width: '80%', borderRadius: 6 }} />
                    <div className="sk" style={{ height: 15, width: '100%', borderRadius: 6 }} />
                    <div className="sk" style={{ height: 15, width: '65%', borderRadius: 6 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="sk" style={{ height: 13, width: 80, borderRadius: 6 }} />
                      <div className="sk" style={{ height: 13, width: 110, borderRadius: 6 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — desktop only */}
          <div style={{ width: 300, flexShrink: 0, display: 'none' }} className="xl:flex flex-col gap-4">
            <div className="sk" style={{ height: 220, borderRadius: 'var(--radius-2xl)' }} />
            <div className="sk" style={{ height: 140, borderRadius: 'var(--radius-2xl)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog detail skeleton
export function BlogDetailSkeleton() {
  return (
    <div style={{ paddingTop: 'var(--navbar-h)' }}>
      <div className="container-xl" style={{ paddingBlock: '2rem' }}>
        {/* Breadcrumb */}
        <div className="sk" style={{ height: 12, width: 200, borderRadius: 99, marginBottom: '1.5rem' }} />
        {/* Hero */}
        <div className="sk" style={{ width: '100%', aspectRatio: '21/8', borderRadius: 'var(--radius-2xl)', marginBottom: '2rem' }} />
        {/* Two col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div>
            {/* Header card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: '1.75rem 2rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div className="sk" style={{ height: 24, width: 52, borderRadius: 99 }} />
                <div className="sk" style={{ height: 24, width: 68, borderRadius: 99 }} />
              </div>
              <div className="sk" style={{ height: 34, width: '75%', borderRadius: 8 }} />
              <div className="sk" style={{ height: 17, width: '100%', borderRadius: 6 }} />
              <div className="sk" style={{ height: 17, width: '60%', borderRadius: 6 }} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: 4 }}>
                {[120, 90, 80].map((w, i) => <div key={i} className="sk" style={{ height: 13, width: w, borderRadius: 6 }} />)}
              </div>
            </div>
            {/* Prose */}
            {[100,92,100,85,100,70,100,88,95,60].map((w,i) => (
              <div key={i} className="sk" style={{ height: 15, width: `${w}%`, borderRadius: 6, marginBottom: '0.625rem' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Post detail skeleton (Facebook layout)
export function PostDetailSkeleton() {
  return (
    <div style={{ paddingTop: 'var(--navbar-h)', display: 'grid', gridTemplateColumns: '1fr', minHeight: 'calc(100vh - var(--navbar-h))' }}>
      {/* Media panel */}
      <div style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
        <div className="sk" style={{ width: '70%', height: '60%', maxHeight: 400, borderRadius: 'var(--radius-xl)', opacity: 0.3 }} />
      </div>
      {/* Info panel */}
      <div style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-color)', padding: '1.125rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="sk" style={{ height: 12, width: 200, borderRadius: 99 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="sk" style={{ width: 42, height: 42, borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="sk" style={{ height: 14, width: 140, borderRadius: 6 }} />
            <div className="sk" style={{ height: 11, width: 100, borderRadius: 6 }} />
          </div>
        </div>
        {[100, 92, 85, 70].map((w, i) => (
          <div key={i} className="sk" style={{ height: 14, width: `${w}%`, borderRadius: 6 }} />
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.25rem', marginTop: '0.5rem' }}>
          {[0,1,2,3].map(i => <div key={i} className="sk" style={{ height: 36, borderRadius: 'var(--radius-lg)' }} />)}
        </div>
      </div>
    </div>
  )
}
