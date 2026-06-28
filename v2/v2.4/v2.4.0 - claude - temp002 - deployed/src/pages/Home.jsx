// Home.jsx -- v2.3.6
// CHANGES (v2.3.6):
//   * Component renames reflected: AboutMini->AboutSection, Process->WorkflowSetup,
//     Testimonials->Reviews, GithubStats->GithubActivity
//   * Every section below Hero wrapped in <Section> (lazy reveal + its OWN
//     error boundary + its OWN matching skeleton) — one section breaking
//     never affects the rest of the page
//   * Hero still renders immediately (above the fold, no reveal delay)
//
// Section order (unchanged):
//   Hero -- own bg -- About Me -- Featured Projects -- Skills & Exp --
//   How I Work -- Services -- Reviews -- GitHub Activity -- CTA

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle }   from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'
import { Section } from '../components/ui/Section.jsx'

import Hero            from '../components/home/Hero.jsx'
import AboutSection     from '../components/home/AboutSection.jsx'
import RecentProjects  from '../components/home/RecentProjects.jsx'
import Skills          from '../components/home/Skills.jsx'
import WorkflowSetup   from '../components/home/WorkflowSetup.jsx'
import Services        from '../components/home/Services.jsx'
import Reviews         from '../components/home/Reviews.jsx'
import GithubActivity  from '../components/home/GithubActivity.jsx'
import CTA              from '../components/shared/SiteCTA.jsx'

import {
  AboutSectionSkeleton, ProjectsHomeSkeleton, SkillsSkeleton,
  WorkflowSkeleton, ServicesSkeleton, ReviewsSkeleton,
  GithubActivitySkeleton, CTASkeleton,
} from '../components/skeletons/HomeSkeletons.jsx'

export default function Home() {
  const { settings, loading: sl } = useSiteSettings()
  useEffect(() => { trackPage('Home') }, [])

  return (
    <>
      <Helmet>
        <title>{buildTitle(null)}</title>
        <meta name="description"          content={SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:title"         content={SITE_CONFIG.siteName}/>
        <meta property="og:description"   content={SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:image"         content={SITE_CONFIG.seo.defaultOGImage}/>
        <meta property="og:image:type"    content="image/webp"/>
        <meta property="og:image:width"   content="1200"/>
        <meta property="og:image:height"  content="630"/>
        <meta name="twitter:card"         content="summary_large_image"/>
        <meta name="twitter:creator"      content={SITE_CONFIG.seo.twitterHandle}/>
        <meta name="twitter:image"        content={SITE_CONFIG.seo.defaultOGImage}/>
      </Helmet>

      {/* Hero -- own bg, renders immediately, no reveal/skeleton wrap */}
      <Hero settings={settings} settingsLoading={sl}/>

      {/* About Me -- section-alt */}
      <Section name="About Me" skeleton={<AboutSectionSkeleton/>}>
        <AboutSection/>
      </Section>

      {/* Featured Projects -- plain */}
      <Section name="Featured Projects" skeleton={<ProjectsHomeSkeleton/>}>
        <RecentProjects/>
      </Section>

      {/* Skills & Experience -- section-alt */}
      <Section name="Skills & Experience" skeleton={<SkillsSkeleton/>}>
        <Skills settings={settings}/>
      </Section>

      {/* How I Work -- plain */}
      <Section name="My Setup & Workflow" skeleton={<WorkflowSkeleton/>}>
        <WorkflowSetup/>
      </Section>

      {/* Services -- section-alt (component adds class internally) */}
      <Section name="Services" skeleton={<ServicesSkeleton/>}>
        <Services/>
      </Section>

      {/* Reviews -- plain */}
      <Section name="Reviews" skeleton={<ReviewsSkeleton/>}>
        <Reviews/>
      </Section>

      {/* GitHub Activity -- section-alt */}
      <Section name="GitHub Activity" skeleton={<GithubActivitySkeleton/>}>
        <GithubActivity/>
      </Section>

      {/* CTA -- plain */}
      <Section name="CTA" skeleton={<CTASkeleton/>}>
        <CTA/>
      </Section>
    </>
  )
}
