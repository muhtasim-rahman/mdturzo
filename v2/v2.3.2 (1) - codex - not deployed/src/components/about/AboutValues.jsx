import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fadeUp, hobbies, stagger, values } from './aboutData.js'
import AboutSectionHeader from './AboutSectionHeader.jsx'

export default function AboutValues() {
  return (
    <section className="ab-section ab-section-alt" id="values">
      <div className="container-xl">
        <AboutSectionHeader eyebrow="Values & Personality" title="What Drives" highlight="My Work">
          Three cards per row on desktop, two on tablet, and one compact card per row on mobile.
        </AboutSectionHeader>

        <motion.div
          className="ab-values-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
          variants={stagger(0.06)}
        >
          {values.map(({ icon, color, title, desc }) => (
            <motion.article key={title} className="ab-value-card card" variants={fadeUp}>
              <span className="ab-value-icon" style={{ color, background: `${color}18` }}>
                <FontAwesomeIcon icon={icon} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="ab-hobbies card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <p>Interests & routines</p>
          <div>
            {hobbies.map(({ icon, label }) => (
              <span key={label} className="ab-hobby-chip">
                <FontAwesomeIcon icon={icon} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
