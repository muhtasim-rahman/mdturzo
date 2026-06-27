// ============================================================
// HOME SKELETONS — v2.3.6
// One bespoke skeleton per Home section, shaped to match that
// section's real layout (not a generic placeholder). Used by:
//   1. SectionReveal — shown before a section scrolls into view
//   2. App.jsx RouteBoundary ('hero' layout) — shown while the
//      Home page chunk is still being fetched/parsed
// Keep neutral/minimal — no color, just `.sk` shimmer blocks.
// ============================================================

import { SkeletonBox, SkeletonCircle } from '../ui/Skeleton.jsx'

function HeaderSkeleton({ align = 'center' }) {
  return (
    <div className={`hsk-header ${align === 'center' ? 'items-center text-center' : ''}`}>
      <SkeletonBox w="w-28" h="h-3.5" rounded="rounded-full" />
      <SkeletonBox w="w-64" h="h-8" rounded="rounded-lg" delay={0.05} />
      <SkeletonBox w="w-80" h="h-3.5" rounded="rounded" delay={0.1} />
      <style>{`.hsk-header { display: flex; flex-direction: column; gap: .65rem; max-width: 32rem; margin: 0 auto; }`}</style>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="hsk-hero">
      <div className="hsk-hero-left">
        <SkeletonBox w="w-40" h="h-5" rounded="rounded-full" />
        <SkeletonBox w="w-72" h="h-11" rounded="rounded-lg" delay={0.05} />
        <SkeletonBox w="w-56" h="h-11" rounded="rounded-lg" delay={0.08} />
        <SkeletonBox w="w-44" h="h-5" rounded="rounded" delay={0.12} />
        <SkeletonBox w="w-full max-w-md" h="h-4" rounded="rounded" delay={0.15} />
        <div className="flex gap-3 mt-1">
          <SkeletonBox w="w-36" h="h-11" rounded="rounded-full" delay={0.18} />
          <SkeletonBox w="w-32" h="h-11" rounded="rounded-full" delay={0.2} />
        </div>
        <div className="flex gap-2 mt-1">
          {Array.from({ length: 6 }, (_, i) => <SkeletonCircle key={i} size={34} className="opacity-70" />)}
        </div>
        <div className="flex gap-5 mt-1">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonBox key={i} w="w-16" h="h-9" rounded="rounded" delay={0.25 + i * 0.05} />
          ))}
        </div>
      </div>
      <div className="hsk-hero-right">
        <SkeletonCircle size={320} />
      </div>
      <style>{`
        .hsk-hero { display: flex; gap: 3rem; align-items: center; padding: 4rem 0; flex-wrap: wrap; }
        .hsk-hero-left { flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: .9rem; }
        .hsk-hero-right { flex-shrink: 0; margin: 0 auto; }
        @media (max-width: 899px) { .hsk-hero { flex-direction: column-reverse; padding: 2.5rem 0; } .hsk-hero-left { align-items: center; text-align: center; } .hsk-hero-right :global(div) { width: 200px !important; height: 200px !important; } }
      `}</style>
    </div>
  )
}

export function AboutSectionSkeleton() {
  return (
    <div className="hsk-wrap">
      <div className="hsk-2col">
        <SkeletonBox w="w-full" h="h-80" rounded="rounded-2xl" />
        <div className="flex flex-col gap-3">
          <SkeletonBox w="w-32" h="h-3.5" rounded="rounded-full" />
          <SkeletonBox w="w-72" h="h-8" rounded="rounded-lg" delay={0.05} />
          <SkeletonBox w="w-full" h="h-3.5" rounded="rounded" delay={0.1} />
          <SkeletonBox w="w-5/6" h="h-3.5" rounded="rounded" delay={0.13} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <SkeletonBox key={i} w="w-full" h="h-12" rounded="rounded-xl" delay={0.16 + i * 0.04} />
            ))}
          </div>
          <SkeletonBox w="w-44" h="h-11" rounded="rounded-full" className="mt-2" delay={0.4} />
        </div>
      </div>
      <style>{`
        .hsk-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; padding: 3.5rem 0; }
        @media (max-width: 1023px) { .hsk-2col { grid-template-columns: 1fr; gap: 2rem; } }
      `}</style>
    </div>
  )
}

export function ProjectsHomeSkeleton() {
  return (
    <div className="hsk-wrap" style={{ padding: '3.5rem 0' }}>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <SkeletonBox w="w-20" h="h-3.5" rounded="rounded-full" />
          <SkeletonBox w="w-56" h="h-8" rounded="rounded-lg" delay={0.05} />
        </div>
        <SkeletonBox w="w-24" h="h-4" rounded="rounded" delay={0.08} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <SkeletonBox w="w-full" h="h-40" rounded="rounded-2xl" delay={i * 0.04} />
            <SkeletonBox w="w-3/4" h="h-4" rounded="rounded" delay={0.05 + i * 0.04} />
            <SkeletonBox w="w-1/2" h="h-3.5" rounded="rounded" delay={0.08 + i * 0.04} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="hsk-wrap" style={{ padding: '3.5rem 0' }}>
      <HeaderSkeleton />
      <div className="hsk-skills-grid mt-10">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonBox key={i} w="w-full" h="h-20" rounded="rounded-xl" delay={i * 0.05} />
            ))}
          </div>
          <SkeletonBox w="w-full" h="h-3.5" rounded="rounded" delay={0.3} />
          <SkeletonBox w="w-5/6" h="h-3.5" rounded="rounded" delay={0.33} />
          <div className="flex gap-2 flex-wrap mt-1">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonBox key={i} w="w-24" h="h-6" rounded="rounded-full" delay={0.36 + i * 0.04} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonBox key={i} w="w-20" h="h-8" rounded="rounded-full" delay={i * 0.04} />
            ))}
          </div>
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonBox key={i} w="w-full" h="h-7" rounded="rounded" delay={0.2 + i * 0.04} />
          ))}
        </div>
      </div>
      <style>{`.hsk-skills-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:2rem}@media(max-width:900px){.hsk-skills-grid{grid-template-columns:1fr}}`}</style>
    </div>
  )
}

export function WorkflowSkeleton() {
  return (
    <div className="hsk-wrap" style={{ padding: '3.5rem 0' }}>
      <HeaderSkeleton />
      <div className="hsk-skills-grid mt-10">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <SkeletonBox key={i} w="w-full" h="h-14" rounded="rounded-xl" delay={i * 0.04} />
            ))}
          </div>
          <SkeletonBox w="w-40" h="h-4" rounded="rounded" className="mt-2" delay={0.3} />
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonBox key={i} w="w-full" h="h-3.5" rounded="rounded" delay={0.34 + i * 0.04} />
          ))}
        </div>
        <SkeletonBox w="w-full" h="h-72" rounded="rounded-2xl" />
      </div>
      <style>{`.hsk-skills-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:2rem}@media(max-width:900px){.hsk-skills-grid{grid-template-columns:1fr}}`}</style>
    </div>
  )
}

export function ServicesSkeleton() {
  return (
    <div className="hsk-wrap" style={{ padding: '3.5rem 0' }}>
      <HeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex flex-col gap-3 p-1">
            <SkeletonBox w="w-12" h="h-12" rounded="rounded-xl" delay={i * 0.06} />
            <SkeletonBox w="w-2/3" h="h-5" rounded="rounded" delay={0.06 + i * 0.06} />
            <SkeletonBox w="w-full" h="h-3.5" rounded="rounded" delay={0.1 + i * 0.06} />
            <SkeletonBox w="w-5/6" h="h-3.5" rounded="rounded" delay={0.13 + i * 0.06} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReviewsSkeleton() {
  return (
    <div className="hsk-wrap" style={{ padding: '3.5rem 0' }}>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <SkeletonBox w="w-24" h="h-3.5" rounded="rounded-full" />
          <SkeletonBox w="w-40" h="h-8" rounded="rounded-lg" delay={0.05} />
        </div>
        <SkeletonBox w="w-32" h="h-9" rounded="rounded-xl" delay={0.08} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="card p-6 flex flex-col gap-4">
            <SkeletonBox w="w-16" h="h-4" rounded="rounded" delay={i * 0.05} />
            <SkeletonBox w="w-full" h="h-14" rounded="rounded" delay={0.05 + i * 0.05} />
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)]">
              <SkeletonCircle size={36} />
              <div className="flex-1 flex flex-col gap-1.5">
                <SkeletonBox w="w-24" h="h-3.5" rounded="rounded" delay={0.1 + i * 0.05} />
                <SkeletonBox w="w-16" h="h-3" rounded="rounded" delay={0.13 + i * 0.05} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function GithubActivitySkeleton() {
  return (
    <div className="hsk-wrap" style={{ padding: '3.5rem 0' }}>
      <HeaderSkeleton />
      <div className="flex flex-wrap items-start gap-6 mt-10 p-6 rounded-2xl border border-[var(--border-color)]">
        <SkeletonBox w="w-16" h="h-16" rounded="rounded-2xl" />
        <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <SkeletonBox w="w-40" h="h-4" rounded="rounded" delay={0.05} />
          <SkeletonBox w="w-28" h="h-3.5" rounded="rounded" delay={0.08} />
        </div>
        <div className="grid grid-cols-5 gap-2 flex-shrink-0 w-full sm:w-auto">
          {Array.from({ length: 5 }, (_, i) => (
            <SkeletonBox key={i} w="w-14" h="h-16" rounded="rounded-xl" delay={0.1 + i * 0.04} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <SkeletonBox w="w-full" h="h-40" rounded="rounded-2xl" delay={0.3} />
        <SkeletonBox w="w-full" h="h-40" rounded="rounded-2xl" delay={0.33} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonBox key={i} w="w-full" h="h-24" rounded="rounded-xl" delay={0.4 + i * 0.03} />
        ))}
      </div>
    </div>
  )
}

export function CTASkeleton() {
  return (
    <div className="hsk-wrap flex flex-col items-center gap-3 text-center" style={{ padding: '3.5rem 0' }}>
      <SkeletonBox w="w-72" h="h-8" rounded="rounded-lg" />
      <SkeletonBox w="w-96" h="h-4" rounded="rounded" delay={0.05} />
      <SkeletonBox w="w-44" h="h-11" rounded="rounded-full" delay={0.1} />
    </div>
  )
}

// Composed full-page skeleton — used by App.jsx RouteBoundary while the
// Home page chunk is loading (before any section-level code has even run).
export function HomeSkeleton() {
  return (
    <div className="container-xl animate-in fade-in duration-300">
      <HeroSkeleton />
      <AboutSectionSkeleton />
      <ProjectsHomeSkeleton />
      <SkillsSkeleton />
    </div>
  )
}
