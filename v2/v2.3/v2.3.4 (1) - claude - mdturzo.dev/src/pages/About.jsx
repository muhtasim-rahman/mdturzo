// ============================================================
// About.jsx — v2.3.4
// Changes:
//   * Sticky breadcrumb strip added below navbar (full-width, always visible)
//   * ab-page gets padding-top: var(--navbar-h) for transparent navbar
//   * Hero no longer needs to handle navbar offset itself
// ============================================================

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
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
        {/* ── Sticky breadcrumb strip — always visible below navbar ── */}
        <div className="ab-crumb-strip">
          <div className="container-xl">
            <nav className="ab-crumb-nav" aria-label="Breadcrumb">
              <Link to="/" className="ab-crumb-home">Home</Link>
              <FontAwesomeIcon icon={faChevronRight} className="ab-crumb-arrow" aria-hidden="true" />
              <span className="ab-crumb-cur">About</span>
            </nav>
          </div>
        </div>

        {/* 1. Hero */}
        <AboutHero age={age} />

        {/* 2. Story & Personal Info */}
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

        {/* 9. CTA */}
        <CTA />
      </div>

      <style>{`
        /* Page container — push below transparent navbar */
        .ab-page {
          overflow-x: hidden;
          padding-top: var(--navbar-h);
        }

        /* ── Breadcrumb strip ── */
        .ab-crumb-strip {
          position: sticky;
          top: var(--navbar-h);
          z-index: 30;
          height: 36px;
          display: flex;
          align-items: center;
          background: color-mix(in srgb, var(--bg-surface) 88%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-color);
        }
        .ab-crumb-nav {
          display: flex;
          align-items: center;
          gap: .4rem;
          font-size: .72rem;
          font-family: var(--font-mono);
          color: var(--text-tertiary);
        }
        .ab-crumb-home {
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color .15s;
        }
        .ab-crumb-home:hover { color: var(--accent-primary); }
        .ab-crumb-arrow {
          font-size: .48rem;
          opacity: .5;
          flex-shrink: 0;
        }
        .ab-crumb-cur {
          color: var(--text-secondary);
          font-weight: 500;
        }
      `}</style>
    </>
  )
}
