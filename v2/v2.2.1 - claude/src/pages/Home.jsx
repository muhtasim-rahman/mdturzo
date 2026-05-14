// Home.jsx — v2.2.0
import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle }  from '../utils/seo.js'
import { trackPage }   from '../services/analytics.js'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

import Hero           from '../components/home/Hero.jsx'
import Stats          from '../components/home/Stats.jsx'
import AboutMini      from '../components/home/AboutMini.jsx'
import Skills         from '../components/home/Skills.jsx'
import Services       from '../components/home/Services.jsx'
import RecentProjects from '../components/home/RecentProjects.jsx'
import GithubStats    from '../components/home/GithubStats.jsx'
import Testimonials   from '../components/home/Testimonials.jsx'
import BlogMini       from '../components/home/BlogMini.jsx'
import CTA            from '../components/home/CTA.jsx'
import CookieBanner   from '../components/ui/CookieBanner.jsx'

export default function Home() {
  const { settings, loading: settingsLoading } = useSiteSettings()

  useEffect(() => { trackPage('Home') }, [])

  return (
    <>
      <Helmet>
        <title>{buildTitle(null)}</title>
        <meta name="description" content={SITE_CONFIG.seo.defaultDescription} />
        <meta property="og:title"       content={SITE_CONFIG.siteName} />
        <meta property="og:description" content={SITE_CONFIG.seo.defaultDescription} />
        <meta property="og:image"       content={SITE_CONFIG.seo.defaultOGImage} />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:creator"    content={SITE_CONFIG.seo.twitterHandle} />
      </Helmet>

      <Hero            settings={settings} settingsLoading={settingsLoading} />
      <Stats           settings={settings} settingsLoading={settingsLoading} />
      <AboutMini />
      <Skills />
      <Services />
      <RecentProjects />
      <GithubStats />
      <Testimonials />
      <BlogMini />
      <CTA />

      <CookieBanner enabled={settings?.cookieBanner ?? true} />
    </>
  )
}
