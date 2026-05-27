import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faDownload, faFolderOpen, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { fadeUp, quickFacts, stagger } from './aboutData.js'

export default function AboutHero({ age, settings }) {
  const cvEnabled = Boolean(settings?.cvEnabled && settings?.cvUrl)

  return (
    <section className="ab-hero" id="about-hero" aria-label="About Muhtasim Rahman">
      <div className="ab-hero-tex" aria-hidden="true" />
      <div className="ab-hero-fade" aria-hidden="true" />

      <div className="ab-hero-inner">
        <motion.div className="ab-hero-copy" initial="hidden" animate="show" variants={stagger(0.08)}>
          <motion.nav variants={fadeUp} className="ab-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            <span>About</span>
          </motion.nav>

          <motion.p variants={fadeUp} className="ab-eyebrow">Getting to know me</motion.p>
          <motion.h1 variants={fadeUp} className="ab-hero-title">
            Muhtasim Rahman <span>(Turzo)</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="ab-hero-role">Web Developer &amp; Designer</motion.p>
          <motion.p variants={fadeUp} className="ab-hero-text">
            A {age}-year-old self-taught developer from Bangladesh, focused on clean websites,
            thoughtful UI, practical learning, and work that follows Islamic and ethical principles.
          </motion.p>

          <motion.div variants={fadeUp} className="ab-hero-facts">
            {quickFacts(age).slice(2).map(({ icon, value, color }) => (
              <span key={value} className="ab-fact-pill">
                <FontAwesomeIcon icon={icon} style={{ color }} aria-hidden="true" />
                {value}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="ab-hero-actions">
            <Link to="/contact" className="ab-btn ab-btn-primary">
              <FontAwesomeIcon icon={faHandshake} aria-hidden="true" />
              Get in Touch
            </Link>
            {cvEnabled ? (
              <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn-secondary">
                <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                Download CV
              </a>
            ) : (
              <Link to="/projects" className="ab-btn ab-btn-secondary">
                <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" />
                View Work
              </Link>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="ab-hero-visual"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          aria-hidden="true"
        >
          <div className="ab-portrait">
            <img src="/hero-back.webp" alt="" loading="eager" fetchPriority="high" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
