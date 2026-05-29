import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCheckCircle, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'
import { cvActions, fadeUp, quickFacts, storyCards, stagger } from './aboutData.js'
import AboutSectionHeader from './AboutSectionHeader.jsx'

export default function AboutStory({ age, settings }) {
  const [shareState, setShareState] = useState('')
  const cvEnabled = Boolean(settings?.cvEnabled && settings?.cvUrl)
  const cvUrl = settings?.cvUrl || ''

  const handleCvAction = useCallback(async (action) => {
    if (!cvEnabled && action !== 'print') return
    if (action === 'preview') {
      window.open(cvUrl, '_blank', 'noopener,noreferrer')
      return
    }
    if (action === 'print') {
      window.print()
      return
    }
    if (action === 'share') {
      const payload = { title: `${SITE_CONFIG.owner.displayName} CV`, text: 'CV and portfolio of Muhtasim Rahman.', url: cvUrl }
      try {
        if (navigator.share) await navigator.share(payload)
        else if (navigator.clipboard) await navigator.clipboard.writeText(cvUrl)
        setShareState('Shared')
      } catch {
        setShareState('')
      }
      window.setTimeout(() => setShareState(''), 1400)
    }
  }, [cvEnabled, cvUrl])

  return (
    <section className="ab-section" id="story">
      <div className="container-xl">
        <AboutSectionHeader eyebrow="Story" title="About Me" highlight="Details">
          A compact personal profile with the practical actions visitors usually need.
        </AboutSectionHeader>

        <motion.div
          className="ab-story-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp} className="ab-story-main card">
            <FontAwesomeIcon icon={faQuoteLeft} className="ab-quote-icon" aria-hidden="true" />
            <p className="ab-story-lead">
              I am Muhtasim Rahman, also known as Turzo. I build web experiences,
              learn by shipping real projects, and keep improving the details until the work
              feels clean, useful, and trustworthy.
            </p>
            <p>
              My current focus is strengthening JavaScript, React, design systems, and backend
              foundations while continuing my academic path toward Computer Science & Engineering.
            </p>

            <div className="ab-story-cards">
              {storyCards.map(({ icon, title, text, color }) => (
                <div key={title} className="ab-story-card">
                  <span className="ab-story-card-icon" style={{ color, background: `${color}18` }}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="ab-info-panel">
            <div className="ab-info-list card">
              {quickFacts(age).map(({ icon, label, value, color }) => (
                <div key={label} className="ab-info-row">
                  <span className="ab-info-icon" style={{ color, background: `${color}18` }}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </span>
                  <span>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </span>
                </div>
              ))}
            </div>

            <div className="ab-cv-card card">
              <div className="ab-cv-head">
                <span className="ab-cv-icon"><FontAwesomeIcon icon={faBriefcase} aria-hidden="true" /></span>
                <span>
                  <strong>CV Actions</strong>
                  <small>{cvEnabled ? 'Available from site settings' : 'CV upload is not enabled yet'}</small>
                </span>
              </div>
              <div className="ab-cv-actions">
                {cvActions.map(({ id, icon, label }) => {
                  if (id === 'download') {
                    return (
                      <a
                        key={id}
                        href={cvEnabled ? cvUrl : undefined}
                        download
                        className={`ab-cv-action${cvEnabled ? '' : ' is-disabled'}`}
                        aria-disabled={!cvEnabled}
                      >
                        <FontAwesomeIcon icon={icon} aria-hidden="true" />
                        {label}
                      </a>
                    )
                  }
                  return (
                    <button
                      key={id}
                      type="button"
                      className="ab-cv-action"
                      disabled={!cvEnabled && id !== 'print'}
                      onClick={() => handleCvAction(id)}
                    >
                      <FontAwesomeIcon icon={icon} aria-hidden="true" />
                      {id === 'share' && shareState ? shareState : label}
                    </button>
                  )
                })}
              </div>
              <p className="ab-cv-note">
                <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
                Download, preview, print, and share controls stay in one place for future CV updates.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
