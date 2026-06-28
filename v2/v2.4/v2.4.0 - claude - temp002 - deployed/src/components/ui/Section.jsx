// ============================================================
// SECTION — v2.3.6
// Combines SectionReveal (lazy/progressive render) + SectionErrorBoundary
// (failure isolation) into one wrapper so pages stay clean:
//
//   <Section name="Skills" skeleton={<SkillsSkeleton />}>
//     <Skills />
//   </Section>
//
// If Skills throws → only this card shows a fallback, page stays intact.
// While off-screen / not yet revealed → shows the matching skeleton.
// ============================================================

import { SectionReveal } from './SectionReveal.jsx'
import { SectionErrorBoundary } from './SectionErrorBoundary.jsx'

export function Section({ name, skeleton, rootMargin, children }) {
  return (
    <SectionReveal skeleton={skeleton} rootMargin={rootMargin}>
      <SectionErrorBoundary name={name}>
        {children}
      </SectionErrorBoundary>
    </SectionReveal>
  )
}

export default Section
