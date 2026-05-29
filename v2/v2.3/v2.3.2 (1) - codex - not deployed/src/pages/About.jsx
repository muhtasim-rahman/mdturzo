import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { buildTitle, breadcrumbSchema, personSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'
import AboutHero from '../components/about/AboutHero.jsx'
import AboutStory from '../components/about/AboutStory.jsx'
import AcademicTimeline from '../components/about/AcademicTimeline.jsx'
import AboutKnowledge from '../components/about/AboutKnowledge.jsx'
import AboutValues from '../components/about/AboutValues.jsx'
import AboutGoals from '../components/about/AboutGoals.jsx'
import AboutConnect from '../components/about/AboutConnect.jsx'
import CTA from '../components/home/CTA.jsx'
import '../components/about/about.css'

export default function About() {
  const { settings } = useSiteSettings()
  const age = calculateAge()

  useEffect(() => {
    trackPage('About')
  }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc = `Meet Muhtasim Rahman (Turzo), a ${age}-year-old self-taught web developer and designer from Nilphamari, Bangladesh.`

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={`${SITE_CONFIG.siteURL}/about`} />
        <meta property="og:image" content={SITE_CONFIG.seo.defaultOGImage} />
        <link rel="canonical" href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]))}</script>
      </Helmet>

      <div className="ab-page">
        <AboutHero age={age} settings={settings} />
        <AboutStory age={age} settings={settings} />
        <AcademicTimeline />
        <AboutKnowledge />
        <AboutValues />
        <AboutGoals />
        <AboutConnect />
        <CTA />
      </div>
    </>
  )
}
