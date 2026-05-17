// Home.jsx — v2.2.3
// Section order with alternating bg:
//   Hero         — no section class (own bg)
//   Skills       — plain bg (section)
//   AboutMini    — alt bg  (section-alt)  ← uses section-alt internally
//   Projects     — plain bg
//   Services     — alt bg  ← uses section-alt internally
//   Testimonials — plain bg
//   GithubStats  — alt bg
//   BlogMini     — plain bg
//   CTA          — plain bg
//   Footer follows

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
import CookieBanner   from '../components/ui/CookieBanner.jsx'

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
      {/* 1 — plain bg */}
      <Skills settings={settings}/>
      {/* 2 — alt bg (AboutMini has section-alt internally) */}
      <AboutMini/>
      {/* 3 — plain bg */}
      <RecentProjects/>
      {/* 4 — alt bg (Services has section-alt internally) */}
      <Services/>
      {/* 5 — plain bg */}
      <Testimonials/>
      {/* 6 — alt bg */}
      <GithubStats/>
      {/* 7 — plain bg */}
      <BlogMini/>
      {/* 8 — plain bg */}
      <CTA/>

      <CookieBanner enabled={settings?.cookieBanner ?? true}/>
    </>
  )
}
