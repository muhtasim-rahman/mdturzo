// Home.jsx — v2.2.4
// Section order with alternating bg (flipped from v2.2.3):
//   Hero         — no section class (own bg)
//   Skills       — alt bg (section-alt) ← has bg now
//   AboutMini    — plain bg
//   Projects     — alt bg
//   Services     — plain bg
//   Testimonials — alt bg
//   GithubStats  — plain bg
//   BlogMini     — alt bg
//   CTA          — plain bg
//   Footer follows
// CookieBanner moved to Layout.jsx (shows globally)

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle }   from '../utils/seo.js'
import { trackPage }    from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

import Hero           from '../components/home/Hero.jsx'
import Skills         from '../components/home/Skills.jsx'
import AboutMini      from '../components/home/AboutMini.jsx'
import RecentProjects from '../components/home/RecentProjects.jsx'
import Services       from '../components/home/Services.jsx'
import Testimonials   from '../components/home/Testimonials.jsx'
import GithubStats    from '../components/home/GithubStats.jsx'
import BlogMini       from '../components/home/BlogMini.jsx'
import CTA            from '../components/home/CTA.jsx'

export default function Home() {
  const { settings, loading: sl } = useSiteSettings()
  useEffect(() => { trackPage('Home') }, [])

  return (
    <>
      <Helmet>
        <title>{buildTitle(null)}</title>
        <meta name="description" content={SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:title"        content={SITE_CONFIG.siteName}/>
        <meta property="og:description"  content={SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:image"        content={SITE_CONFIG.seo.defaultOGImage}/>
        <meta property="og:image:type"   content="image/webp"/>
        <meta property="og:image:width"  content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card"        content="summary_large_image"/>
        <meta name="twitter:creator"     content={SITE_CONFIG.seo.twitterHandle}/>
        <meta name="twitter:image"       content={SITE_CONFIG.seo.defaultOGImage}/>
      </Helmet>

      <Hero settings={settings} settingsLoading={sl}/>
      {/* 1 — alt bg */}
      <Skills settings={settings}/>
      {/* 2 — plain bg */}
      <AboutMini/>
      {/* 3 — alt bg */}
      <RecentProjects/>
      {/* 4 — plain bg */}
      <Services/>
      {/* 5 — alt bg */}
      <Testimonials/>
      {/* 6 — plain bg */}
      <GithubStats/>
      {/* 7 — alt bg */}
      <BlogMini/>
      {/* 8 — plain bg */}
      <CTA/>
    </>
  )
}
