// Home.jsx — v2.2.7
// Section order:
//   Hero            — transparent navbar, full-screen
//   AboutMini       — section-alt  (about me)
//   RecentProjects  — plain bg     (featured projects)
//   Skills          — section-alt  (skills & experience)
//   Journey         — plain bg     (new: my journey timeline)
//   Services        — section-alt  (services)
//   Testimonials    — plain bg     (reviews)
//   GithubStats     — section-alt  (github activity)
//   CTA             — plain bg     (contact CTA)

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle }  from '../utils/seo.js'
import { trackPage }   from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

import Hero           from '../components/home/Hero.jsx'
import AboutMini      from '../components/home/AboutMini.jsx'
import RecentProjects from '../components/home/RecentProjects.jsx'
import Skills         from '../components/home/Skills.jsx'
import Journey        from '../components/home/Journey.jsx'
import Services       from '../components/home/Services.jsx'
import Testimonials   from '../components/home/Testimonials.jsx'
import GithubStats    from '../components/home/GithubStats.jsx'
import CTA            from '../components/home/CTA.jsx'

export default function Home() {
  const { settings, loading: sl } = useSiteSettings()
  useEffect(() => { trackPage('Home') }, [])

  return (
    <>
      <Helmet>
        <title>{buildTitle(null)}</title>
        <meta name="description"        content={SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:title"       content={SITE_CONFIG.siteName}/>
        <meta property="og:description" content={SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:image"       content={SITE_CONFIG.seo.defaultOGImage}/>
        <meta property="og:image:type"  content="image/webp"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height"content="630"/>
        <meta name="twitter:card"       content="summary_large_image"/>
        <meta name="twitter:creator"    content={SITE_CONFIG.seo.twitterHandle}/>
        <meta name="twitter:image"      content={SITE_CONFIG.seo.defaultOGImage}/>
      </Helmet>

      <Hero settings={settings} settingsLoading={sl}/>
      {/* section-alt */}
      <AboutMini/>
      {/* plain */}
      <RecentProjects/>
      {/* section-alt */}
      <Skills settings={settings}/>
      {/* plain — new timeline section */}
      <Journey/>
      {/* section-alt */}
      <Services/>
      {/* plain */}
      <Testimonials/>
      {/* section-alt */}
      <GithubStats/>
      {/* plain */}
      <CTA/>
    </>
  )
}
