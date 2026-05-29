// Home.jsx -- v2.2.7
// Section order (per spec):
//   Hero              -- own bg (transparent, uses hero bg)
//   About Me          -- section-alt  (task 4 -- after Hero)
//   Featured Projects -- plain bg     (task 5)
//   Skills & Exp      -- section-alt  (task 6)
//   How I Work        -- plain bg     (task 7 -- NEW section)
//   Services          -- section-alt  (task 8)
//   Reviews           -- plain bg     (task 9)
//   GitHub Activity   -- section-alt  (task 10)
//   CTA               -- plain bg     (task 11)
//
// BlogMini REMOVED from homepage (was between GithubStats and CTA -- not in spec)

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle }   from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

import Hero           from '../components/home/Hero.jsx'
import AboutMini      from '../components/home/AboutMini.jsx'
import RecentProjects from '../components/home/RecentProjects.jsx'
import Skills         from '../components/home/Skills.jsx'
import Process        from '../components/home/Process.jsx'
import Services       from '../components/home/Services.jsx'
import Testimonials   from '../components/home/Testimonials.jsx'
import GithubStats    from '../components/home/GithubStats.jsx'
import SiteCTA        from '../components/shared/SiteCTA.jsx'

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

      {/* Hero -- own bg */}
      <Hero settings={settings} settingsLoading={sl}/>

      {/* About Me -- section-alt */}
      <AboutMini/>

      {/* Featured Projects -- plain */}
      <RecentProjects/>

      {/* Skills & Experience -- section-alt */}
      <Skills settings={settings}/>

      {/* How I Work -- plain (new section) */}
      <Process/>

      {/* Services -- section-alt (component adds class internally) */}
      <Services/>

      {/* Reviews -- plain */}
      <Testimonials/>

      {/* GitHub Activity -- section-alt */}
      <GithubStats/>

      {/* CTA -- plain */}
      <SiteCTA/>
    </>
  )
}
