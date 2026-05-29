import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { fadeUp, socials, stagger } from './aboutData.js'
import AboutSectionHeader from './AboutSectionHeader.jsx'

export default function AboutConnect() {
  const featured = socials.filter((item) => item.featured)
  const regular = socials.filter((item) => !item.featured)

  return (
    <section className="ab-section ab-section-alt" id="connect">
      <div className="container-xl">
        <AboutSectionHeader eyebrow="Connect" title="Find Me" highlight="Online">
          A responsive, theme-safe contact grid inspired by the supplied copy-2 version.
        </AboutSectionHeader>

        <motion.div
          className="ab-connect-featured"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
          variants={stagger(0.08)}
        >
          {featured.map(({ icon, label, handle, url, color }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-connect-big card"
              style={{ '--social-color': color }}
              variants={fadeUp}
            >
              <FontAwesomeIcon icon={icon} aria-hidden="true" />
              <span>
                <strong>{label}</strong>
                <small>{handle}</small>
              </span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="ab-connect-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
          variants={stagger(0.04)}
        >
          {regular.map(({ icon, label, handle, url, color }) => (
            <motion.a
              key={label}
              href={url}
              target={url.startsWith('mailto:') ? undefined : '_blank'}
              rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="ab-connect-card card"
              style={{ '--social-color': color }}
              variants={fadeUp}
            >
              <span><FontAwesomeIcon icon={icon} aria-hidden="true" /></span>
              <span>
                <strong>{label}</strong>
                <small>{handle}</small>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
