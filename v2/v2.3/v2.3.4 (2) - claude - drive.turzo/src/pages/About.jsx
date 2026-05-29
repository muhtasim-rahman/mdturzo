// ============================================================
// About.jsx — v2.3.4
// * Sticky breadcrumb bar below navbar (full-width, short)
// * About page hero transparent navbar (Navbar.jsx updated)
// ============================================================

import { useEffect } from 'react'
import { Link }     from 'react-router-dom'
import { Helmet }   from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { buildTitle, personSchema, breadcrumbSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'

import AboutHero     from '../components/about/AboutHero.jsx'
import AboutStory    from '../components/about/AboutStory.jsx'
import AboutTimeline from '../components/about/AboutTimeline.jsx'
import AboutSkills   from '../components/about/AboutSkills.jsx'
import AboutLanguages from '../components/about/AboutLanguages.jsx'
import AboutValues   from '../components/about/AboutValues.jsx'
import AboutGoals    from '../components/about/AboutGoals.jsx'
import AboutConnect  from '../components/about/AboutConnect.jsx'
import CTA           from '../components/home/CTA.jsx'

// -- Sticky breadcrumb strip below navbar
function PageBreadcrumb() {
  return (
    <div className="abp-crumb-bar">
      <div className="abp-crumb-inner">
        <Link to="/" className="abp-crumb-link">
          <FontAwesomeIcon icon={faHouse} className="abp-crumb-home-icon" />
          Home
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="abp-crumb-sep" />
        <span className="abp-crumb-cur">About</span>
      </div>

      <style>{`
        .abp-crumb-bar {
          position: fixed;
          top: var(--navbar-h);
          left: 0; right: 0;
          z-index: 45;
          width: 100%;
          height: 34px;
          background: rgba(10,16,42, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
        }
        [data-theme=light] .abp-crumb-bar {
          background: rgba(245, 248, 255, 0.92);
          border-bottom-color: var(--border-color);
        }
        .abp-crumb-inner {
          display: flex;
          align-items: center;
          gap: .4rem;
          max-width: 1120px;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 1.75rem);
          width: 100%;
        }
        .abp-crumb-link {
          display: inline-flex;
          align-items: center;
          gap: .32rem;
          font-size: .72rem;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color .15s;
        }
        .abp-crumb-link:hover { color: var(--accent-primary); }
        .abp-crumb-home-icon { font-size: .6rem; }
        .abp-crumb-sep {
          font-size: .45rem;
          color: var(--text-tertiary);
          opacity: .5;
        }
        .abp-crumb-cur {
          font-size: .72rem;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default function About() {
  const age = calculateAge()

  useEffect(() => { trackPage('About') }, [])

  const seoTitle = buildTitle('About Me')
  const seoDesc = `Meet Muhtasim Rahman (Turzo) — a ${age}-year-old self-taught web developer & designer from Nilphamari, Bangladesh. Student, creator, and aspiring CSE engineer.`

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

      <div className="ab-page">
        {/* Sticky breadcrumb bar — always visible below navbar */}
        <PageBreadcrumb />

        {/* 1. Hero */}
        <AboutHero />

        {/* 2. Story & Personal Info + CV */}
        <AboutStory />

        {/* 3. Academic Timeline */}
        <AboutTimeline />

        {/* 4. Skills & Expertise */}
        <AboutSkills />

        {/* 5. Language Proficiency */}
        <AboutLanguages />

        {/* 6. Values & Personality */}
        <AboutValues />

        {/* 7. Goals & Plans */}
        <AboutGoals />

        {/* 8. Find Me Online */}
        <AboutConnect />

        {/* 9. CTA (shared component) */}
        <CTA />
      </div>

      <style>{`
        .ab-page { overflow-x: hidden; }
      `}</style>
    </>
  )
}
