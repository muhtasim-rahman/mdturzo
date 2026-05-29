// ============================================================
// About.jsx — v2.3.2
// About page — sections split into individual component files
// Each section lives in src/components/about/
// ============================================================

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'

import AboutHero     from '../components/about/AboutHero.jsx'
import AboutBreadcrumb from '../components/about/AboutBreadcrumb.jsx'
import AboutStory    from '../components/about/AboutStory.jsx'
import AboutTimeline from '../components/about/AboutTimeline.jsx'
import AboutSkills   from '../components/about/AboutSkills.jsx'
import AboutLanguages from '../components/about/AboutLanguages.jsx'
import AboutValues   from '../components/about/AboutValues.jsx'
import AboutGoals    from '../components/about/AboutGoals.jsx'
import AboutConnect  from '../components/about/AboutConnect.jsx'
import CTA           from '../components/home/CTA.jsx'

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
        {/* Breadcrumb bar — always below navbar */}
        <AboutBreadcrumb />

        {/* 1. Hero */}
        <AboutHero />

        {/* 2. Story & Personal Info + CV */}
        <AboutStory />

        {/* 3. Academic Timeline */}
        <AboutTimeline />

        {/* 4. Skills & Expertise */}
        <AboutSkills />

        {/* 5. Language Proficiency */}
        <AboutLanguages />

        {/* 6. Values & Personality */}
        <AboutValues />

        {/* 7. Goals & Plans */}
        <AboutGoals />

        {/* 8. Find Me Online */}
        <AboutConnect />

        {/* 9. CTA (shared component) */}
        <CTA />
      </div>

      <style>{`
        .ab-page { overflow-x: hidden; padding-top: var(--navbar-h, 68px); }
      `}</style>
    </>
  )
}
