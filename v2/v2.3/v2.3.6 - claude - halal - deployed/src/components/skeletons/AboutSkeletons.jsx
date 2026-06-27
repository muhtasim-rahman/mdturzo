// ============================================================
// ABOUT SKELETONS — v2.3.6
// One bespoke skeleton per About section, shaped to match that
// section's real layout. Used by SectionReveal (before a section
// scrolls into view) and by App.jsx RouteBoundary ('profile' layout).
// ============================================================

import { SkeletonBox, SkeletonCircle } from '../ui/Skeleton.jsx'

function HeaderSkeleton() {
  return (
    <div className="ask-header">
      <SkeletonBox w="w-24" h="h-3.5" rounded="rounded-full" />
      <SkeletonBox w="w-60" h="h-8" rounded="rounded-lg" delay={0.05} />
      <SkeletonBox w="w-72" h="h-3.5" rounded="rounded" delay={0.1} />
      <style>{`.ask-header { display: flex; flex-direction: column; gap: .6rem; max-width: 30rem; margin: 0 auto; text-align: center; align-items: center; }`}</style>
    </div>
  )
}

export function AboutHeroSkeleton() {
  return (
    <div className="ask-hero">
      <div className="ask-hero-left">
        <SkeletonBox w="w-44" h="h-4" rounded="rounded" />
        <SkeletonBox w="w-64" h="h-11" rounded="rounded-lg" delay={0.05} />
        <SkeletonBox w="w-40" h="h-11" rounded="rounded-lg" delay={0.08} />
        <SkeletonBox w="w-36" h="h-7" rounded="rounded-full" delay={0.12} />
        <SkeletonBox w="w-full max-w-sm" h="h-4" rounded="rounded" delay={0.16} />
        <div className="grid grid-cols-2 gap-2 mt-1" style={{ maxWidth: 380 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonBox key={i} w="w-full" h="h-11" rounded="rounded-xl" delay={0.2 + i * 0.04} />
          ))}
        </div>
        <div className="flex gap-3 mt-1">
          <SkeletonBox w="w-36" h="h-11" rounded="rounded-lg" delay={0.36} />
          <SkeletonBox w="w-28" h="h-11" rounded="rounded-lg" delay={0.39} />
        </div>
      </div>
      <div className="ask-hero-right">
        <SkeletonBox w="w-full" h="h-full" rounded="rounded-2xl" />
      </div>
      <style>{`
        .ask-hero { display: flex; gap: 3rem; align-items: center; padding: 4rem 0; flex-wrap: wrap; }
        .ask-hero-left { flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: .9rem; }
        .ask-hero-right { flex-shrink: 0; width: 320px; height: 420px; margin: 0 auto; }
        @media (max-width: 900px) { .ask-hero { flex-direction: column-reverse; padding: 2rem 0; } .ask-hero-left { align-items: center; text-align: center; } .ask-hero-right { width: 240px; height: 300px; } }
      `}</style>
    </div>
  )
}

export function AboutStorySkeleton() {
  return (
    <div className="ask-wrap">
      <HeaderSkeleton />
      <div className="flex gap-4 flex-wrap justify-center mt-8 mb-10">
        {Array.from({ length: 4 }, (_, i) => (
          <SkeletonBox key={i} w="w-32" h="h-16" rounded="rounded-xl" delay={i * 0.05} />
        ))}
      </div>
      <div className="ask-story-grid">
        <SkeletonBox w="w-full" h="h-64" rounded="rounded-2xl" />
        <SkeletonBox w="w-full" h="h-64" rounded="rounded-2xl" delay={0.1} />
      </div>
      <style>{`.ask-story-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}@media(max-width:900px){.ask-story-grid{grid-template-columns:1fr}}`}</style>
    </div>
  )
}

export function AboutTimelineSkeleton() {
  return (
    <div className="ask-wrap">
      <HeaderSkeleton />
      <div className="flex justify-center mt-10">
        <SkeletonCircle size={280} />
      </div>
      <div className="flex justify-center mt-6">
        <SkeletonBox w="w-full max-w-xl" h="h-24" rounded="rounded-2xl" delay={0.2} />
      </div>
    </div>
  )
}

export function AboutSkillsSkeleton() {
  return (
    <div className="ask-wrap">
      <HeaderSkeleton />
      <div className="flex gap-2 justify-center mt-8 mb-8">
        {Array.from({ length: 4 }, (_, i) => (
          <SkeletonBox key={i} w="w-24" h="h-9" rounded="rounded-full" delay={i * 0.04} />
        ))}
      </div>
      <div className="ask-skills-grid">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonBox key={i} w="w-full" h="h-7" rounded="rounded" delay={0.2 + i * 0.04} />
          ))}
        </div>
        <SkeletonBox w="w-full" h="h-44" rounded="rounded-2xl" delay={0.3} />
      </div>
      <style>{`.ask-skills-grid{display:grid;grid-template-columns:1fr 270px;gap:1.75rem}@media(max-width:767px){.ask-skills-grid{grid-template-columns:1fr}}`}</style>
    </div>
  )
}

export function AboutLanguagesSkeleton() {
  return (
    <div className="ask-wrap">
      <div className="ask-lang-grid">
        <div className="flex flex-col gap-3">
          <SkeletonBox w="w-24" h="h-3.5" rounded="rounded-full" />
          <SkeletonBox w="w-48" h="h-8" rounded="rounded-lg" delay={0.05} />
          <SkeletonBox w="w-56" h="h-8" rounded="rounded-lg" delay={0.08} />
          <SkeletonBox w="w-full" h="h-3.5" rounded="rounded" delay={0.12} />
          <SkeletonBox w="w-5/6" h="h-3.5" rounded="rounded" delay={0.15} />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <SkeletonBox w="w-32" h="h-3.5" rounded="rounded" delay={i * 0.05} />
              <SkeletonBox w="w-full" h="h-2" rounded="rounded-full" delay={0.05 + i * 0.05} />
            </div>
          ))}
        </div>
      </div>
      <style>{`.ask-lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;padding:2.5rem 0}@media(max-width:767px){.ask-lang-grid{grid-template-columns:1fr;gap:2rem}}`}</style>
    </div>
  )
}

export function AboutValuesSkeleton() {
  return (
    <div className="ask-wrap">
      <HeaderSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-6">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonBox key={i} w="w-full" h="h-28" rounded="rounded-xl" delay={i * 0.04} />
        ))}
      </div>
      <SkeletonBox w="w-full" h="h-24" rounded="rounded-2xl" delay={0.3} />
    </div>
  )
}

export function AboutGoalsSkeleton() {
  return (
    <div className="ask-wrap">
      <HeaderSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonBox key={i} w="w-full" h="h-56" rounded="rounded-2xl" delay={i * 0.06} />
        ))}
      </div>
    </div>
  )
}

export function AboutConnectSkeleton() {
  return (
    <div className="ask-wrap">
      <HeaderSkeleton />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-10">
        {Array.from({ length: 10 }, (_, i) => (
          <SkeletonBox key={i} w="w-full" h="h-16" rounded="rounded-xl" delay={i * 0.03} />
        ))}
      </div>
    </div>
  )
}

// Composed full-page skeleton — used by App.jsx RouteBoundary while the
// About page chunk is loading.
export function AboutSkeleton() {
  return (
    <div className="container-xl animate-in fade-in duration-300">
      <AboutHeroSkeleton />
      <AboutStorySkeleton />
      <AboutTimelineSkeleton />
    </div>
  )
}
