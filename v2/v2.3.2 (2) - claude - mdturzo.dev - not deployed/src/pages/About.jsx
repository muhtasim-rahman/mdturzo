// ============================================================
// pages/About.jsx — v2.3.2
// Thin wrapper — all sections live in components/about/
// Sections:
//   1. AboutHero       — hero with fixed navbar padding
//   2. AboutStory      — story + full info table + CV options
//   3. AboutTimeline   — academic timeline, scroll animation fixed
//   4. AboutSkills     — all 4 tabs with progress bars
//   5. AboutLanguages  — flags + animated bars (same as home)
//   6. AboutValues     — 3/2/1 responsive grid
//   7. AboutGoals      — copy-4 cards + progress bars
//   8. AboutConnect    — social grid, light/dark responsive
//   9. SiteCTA         — shared CTA
// ============================================================

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

import AboutHero      from '../components/about/AboutHero.jsx'
import AboutStory     from '../components/about/AboutStory.jsx'
import AboutTimeline  from '../components/about/AboutTimeline.jsx'
import AboutSkills    from '../components/about/AboutSkills.jsx'
import AboutLanguages from '../components/about/AboutLanguages.jsx'
import AboutValues    from '../components/about/AboutValues.jsx'
import AboutGoals     from '../components/about/AboutGoals.jsx'
import AboutConnect   from '../components/about/AboutConnect.jsx'
import SiteCTA        from '../components/shared/SiteCTA.jsx'

export default function About() {
  const { settings } = useSiteSettings()
  const age = calculateAge()

  useEffect(() => { trackPage('About') }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc  = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh. Student, creator, and aspiring CSE engineer.`

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

      <div className="ab-page" style={{ overflowX: 'hidden' }}>
        <AboutHero      settings={settings} age={age} />
        <AboutStory     settings={settings} age={age} />
        <AboutTimeline />
        <AboutSkills />
        <AboutLanguages />
        <AboutValues />
        <AboutGoals />
        <AboutConnect />
        <SiteCTA />
      </div>
    </>
  )
}
