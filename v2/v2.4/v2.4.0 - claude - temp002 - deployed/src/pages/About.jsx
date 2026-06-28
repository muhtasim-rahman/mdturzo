// ============================================================
// About.jsx — v2.3.6
// CHANGES (v2.3.6):
//   * Fixed stale import: CTA now from shared/SiteCTA.jsx (was the
//     dead home/CTA.jsx duplicate which has been removed)
//   * Every section below the Hero wrapped in <Section> (lazy reveal +
//     its OWN error boundary + its OWN matching skeleton) — one section
//     breaking never affects the rest of the page
//   * AboutHero still renders immediately (above the fold)
// PREVIOUS (v2.3.4):
//   * Sticky breadcrumb bar below navbar (full-width, short) -- removed in v2.4.5 era, n/a here
//   * About page hero transparent navbar (Navbar.jsx updated)
// ============================================================

import { useEffect } from 'react'
import { Helmet }   from 'react-helmet-async'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { Section } from '../components/ui/Section.jsx'

import AboutHero      from '../components/about/AboutHero.jsx'
import AboutStory     from '../components/about/AboutStory.jsx'
import AboutTimeline  from '../components/about/AboutTimeline.jsx'
import AboutSkills    from '../components/about/AboutSkills.jsx'
import AboutLanguages from '../components/about/AboutLanguages.jsx'
import AboutValues    from '../components/about/AboutValues.jsx'
import AboutGoals     from '../components/about/AboutGoals.jsx'
import AboutConnect   from '../components/about/AboutConnect.jsx'
import CTA             from '../components/shared/SiteCTA.jsx'

import {
  AboutStorySkeleton, AboutTimelineSkeleton, AboutSkillsSkeleton,
  AboutLanguagesSkeleton, AboutValuesSkeleton, AboutGoalsSkeleton,
  AboutConnectSkeleton,
} from '../components/skeletons/AboutSkeletons.jsx'
import { CTASkeleton } from '../components/skeletons/HomeSkeletons.jsx'

export default function About() {
  const age = calculateAge()

  useEffect(() => { trackPage('About') }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh. Student, creator, and aspiring CSE engineer.`

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description"        content={seoDesc} />
        <meta property="og:title"       content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url"         content={`${SITE_CONFIG.siteURL}/about`} />
        <meta property="og:image"       content={SITE_CONFIG.seo.defaultOGImage} />
        <link rel="canonical"           href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home',  path: '/' },
          { name: 'About', path: '/about' },
        ]))}</script>
      </Helmet>

      <div className="ab-page">

        {/* 1. Hero -- renders immediately, no reveal/skeleton wrap */}
        <AboutHero />

        {/* 2. Story & Personal Info + CV */}
        <Section name="Story & Personal Info" skeleton={<AboutStorySkeleton/>}>
          <AboutStory />
        </Section>

        {/* 3. Academic Timeline */}
        <Section name="Academic Timeline" skeleton={<AboutTimelineSkeleton/>}>
          <AboutTimeline />
        </Section>

        {/* 4. Skills & Expertise */}
        <Section name="Skills & Expertise" skeleton={<AboutSkillsSkeleton/>}>
          <AboutSkills />
        </Section>

        {/* 5. Language Proficiency */}
        <Section name="Language Proficiency" skeleton={<AboutLanguagesSkeleton/>}>
          <AboutLanguages />
        </Section>

        {/* 6. Values & Personality */}
        <Section name="Values & Personality" skeleton={<AboutValuesSkeleton/>}>
          <AboutValues />
        </Section>

        {/* 7. Goals & Plans */}
        <Section name="Goals & Plans" skeleton={<AboutGoalsSkeleton/>}>
          <AboutGoals />
        </Section>

        {/* 8. Find Me Online */}
        <Section name="Find Me Online" skeleton={<AboutConnectSkeleton/>}>
          <AboutConnect />
        </Section>

        {/* 9. CTA (shared component) */}
        <Section name="CTA" skeleton={<CTASkeleton/>}>
          <CTA />
        </Section>
      </div>

      <style>{`
        .ab-page { overflow-x: hidden; }
      `}</style>
    </>
  )
}
