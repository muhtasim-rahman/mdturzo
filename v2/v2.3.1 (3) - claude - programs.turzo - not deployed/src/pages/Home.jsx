// Home.jsx -- v2.3.1
// CTA replaced with SharedCTA (shared with About page)

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
import SharedCTA      from '../components/shared/SharedCTA.jsx'

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

      <Hero settings={settings} settingsLoading={sl}/>
      <AboutMini/>
      <RecentProjects/>
      <Skills settings={settings}/>
      <Process/>
      <Services/>
      <Testimonials/>
      <GithubStats/>
      <SharedCTA/>
    </>
  )
}
