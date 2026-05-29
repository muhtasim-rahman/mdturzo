import { motion } from 'framer-motion'
import { fadeUp } from './aboutData.js'

export default function AboutSectionHeader({ eyebrow, title, highlight, children, align = 'center' }) {
  return (
    <motion.div
      className={`ab-section-head ab-section-head-${align}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      {eyebrow && <p className="ab-section-label">{eyebrow}</p>}
      <h2 className="ab-section-title">
        {title} {highlight && <span>{highlight}</span>}
      </h2>
      {children && <p className="ab-section-sub">{children}</p>}
    </motion.div>
  )
}
