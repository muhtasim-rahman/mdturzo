// Home.jsx — v2.4.6
// Changes:
//   - Progressive section loading via SectionReveal wrapper.
//     Hero renders immediately. All subsequent sections are wrapped in
//     SectionReveal which shows a pulsing skeleton until the section
//     enters the viewport, then fades it in.
//   - Section skeleton heights tuned per-section for minimal layout shift.

import { useEffect } from 'react'
import { Helmet }    from 'react-helmet-async'
import { SITE_CONFIG }     from '../config/site.config.js'
import { buildTitle }       from '../utils/seo.js'
import { trackPage }        from '../services/analytics.js'
import { useSiteSettings }  from '../hooks/useSiteSettings.js'
import SectionReveal        from '../components/ui/SectionReveal.jsx'

import Hero           from '../components/home/Hero.jsx'
import AboutMini      from '../components/home/AboutMini.jsx'
import RecentProjects from '../components/home/RecentProjects.jsx'
import Skills         from '../components/home/Skills.jsx'
import Process        from '../components/home/Process.jsx'
import Services       from '../components/home/Services.jsx'
import Testimonials   from '../components/home/Testimonials.jsx'
import GithubStats    from '../components/home/GithubStats.jsx'
import CTA            from '../components/shared/SiteCTA.jsx'

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

      {/* Hero — renders immediately, no SectionReveal */}
      <Hero settings={settings} settingsLoading={sl}/>

      {/* All sections below reveal progressively as viewport is approached */}
      <SectionReveal skeletonH={320}>
        <AboutMini/>
      </SectionReveal>

      <SectionReveal skeletonH={560}>
        <RecentProjects/>
      </SectionReveal>

      <SectionReveal skeletonH={380}>
        <Skills settings={settings}/>
      </SectionReveal>

      <SectionReveal skeletonH={340}>
        <Process/>
      </SectionReveal>

      <SectionReveal skeletonH={340}>
        <Services/>
      </SectionReveal>

      <SectionReveal skeletonH={300}>
        <Testimonials/>
      </SectionReveal>

      <SectionReveal skeletonH={520}>
        <GithubStats/>
      </SectionReveal>

      <SectionReveal skeletonH={200}>
        <CTA/>
      </SectionReveal>
    </>
  )
}
