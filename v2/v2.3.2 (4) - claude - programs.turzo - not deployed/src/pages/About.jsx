// ============================================================
// About.jsx — v2.3.2
// About page assembler. Each section is a separate component
// from src/components/about/. This file handles SEO + layout only.
//
// Section order:
//   1. AboutHero       — hero, padding fixed
//   2. AboutStory      — bio + personal info list + CV options
//   3. AboutTimeline   — academic timeline, scroll-colored dots
//   4. AboutSkills     — 4-tab skills, all with bars + animation
//   5. AboutLanguages  — language bars, stagger animation
//   6. AboutValues     — values 3-2-1 grid + hobbies
//   7. AboutGoals      — goals + progress bars
//   8. AboutConnect    — find me online, redesigned
//   9. CTA             — shared component
// ============================================================

import { useEffect }        from 'react'
import { Helmet }           from 'react-helmet-async'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage }        from '../services/analytics.js'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { useSiteSettings }  from '../hooks/useSiteSettings.js'

import AboutHero      from '../components/about/AboutHero.jsx'
import AboutStory     from '../components/about/AboutStory.jsx'
import AboutTimeline  from '../components/about/AboutTimeline.jsx'
import AboutSkills    from '../components/about/AboutSkills.jsx'
import AboutLanguages from '../components/about/AboutLanguages.jsx'
import AboutValues    from '../components/about/AboutValues.jsx'
import AboutGoals     from '../components/about/AboutGoals.jsx'
import AboutConnect   from '../components/about/AboutConnect.jsx'
import CTA            from '../components/home/CTA.jsx'

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
        <meta name="description"          content={seoDesc} />
        <meta property="og:title"         content={seoTitle} />
        <meta property="og:description"   content={seoDesc} />
        <meta property="og:url"           content={`${SITE_CONFIG.siteURL}/about`} />
        <meta property="og:image"         content={SITE_CONFIG.seo.defaultOGImage} />
        <link rel="canonical"             href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]))}</script>
      </Helmet>

      <div className="ab-page" style={{ overflowX: 'hidden' }}>
        <AboutHero      age={age} settings={settings} />
        <AboutStory     age={age} settings={settings} />
        <AboutTimeline  />
        <AboutSkills    />
        <AboutLanguages />
        <AboutValues    />
        <AboutGoals     />
        <AboutConnect   />
        <CTA            />
      </div>
    </>
  )
}
