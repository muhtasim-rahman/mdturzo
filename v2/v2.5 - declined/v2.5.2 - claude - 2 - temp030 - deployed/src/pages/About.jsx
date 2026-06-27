// ============================================================
// About.jsx — v2.3.4
// * Sticky breadcrumb bar below navbar (full-width, short)
// * About page hero transparent navbar (Navbar.jsx updated)
// ============================================================

import { useEffect } from 'react'
import { Link }     from 'react-router-dom'
import { Helmet }   from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import SectionReveal  from '../components/ui/SectionReveal.jsx'

import AboutHero     from '../components/about/AboutHero.jsx'
import AboutStory    from '../components/about/AboutStory.jsx'
import AboutTimeline from '../components/about/AboutTimeline.jsx'
import AboutSkills   from '../components/about/AboutSkills.jsx'
import AboutLanguages from '../components/about/AboutLanguages.jsx'
import AboutValues   from '../components/about/AboutValues.jsx'
import AboutGoals    from '../components/about/AboutGoals.jsx'
import AboutConnect  from '../components/about/AboutConnect.jsx'
import CTA           from '../components/shared/SiteCTA.jsx'


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

        {/* 1. Hero — renders immediately */}
        <AboutHero />

        {/* All sections below reveal progressively as user scrolls */}
        <SectionReveal skeletonH={420}>
          <AboutStory />
        </SectionReveal>

        <SectionReveal skeletonH={480}>
          <AboutTimeline />
        </SectionReveal>

        <SectionReveal skeletonH={380}>
          <AboutSkills />
        </SectionReveal>

        <SectionReveal skeletonH={280}>
          <AboutLanguages />
        </SectionReveal>

        <SectionReveal skeletonH={340}>
          <AboutValues />
        </SectionReveal>

        <SectionReveal skeletonH={300}>
          <AboutGoals />
        </SectionReveal>

        <SectionReveal skeletonH={280}>
          <AboutConnect />
        </SectionReveal>

        <SectionReveal skeletonH={200}>
          <CTA />
        </SectionReveal>
      </div>

      <style>{`
        .ab-page { overflow-x: hidden; }
      `}</style>
    </>
  )
}
