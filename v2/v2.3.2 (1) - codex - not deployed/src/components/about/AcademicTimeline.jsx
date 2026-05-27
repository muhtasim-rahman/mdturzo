import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { education, fadeUp } from './aboutData.js'
import AboutSectionHeader from './AboutSectionHeader.jsx'

export default function AcademicTimeline() {
  const wrapRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 78%', 'end 58%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    return scrollYProgress.on('change', (value) => {
      const next = Math.min(education.length - 1, Math.max(0, Math.floor(value * education.length)))
      setActiveIndex(next)
    })
  }, [scrollYProgress])

  return (
    <section className="ab-section ab-section-alt" id="academic-timeline">
      <div className="container-xl">
        <AboutSectionHeader eyebrow="Academic Timeline" title="My Education" highlight="Journey">
          The line fills with scroll, and each milestone becomes active when the progress reaches it.
        </AboutSectionHeader>

        <div className="ab-timeline" ref={wrapRef}>
          <div className="ab-timeline-line" aria-hidden="true" />
          <motion.div className="ab-timeline-line-active" style={{ scaleY: lineScale }} aria-hidden="true" />

          {education.map((item, index) => {
            const isActive = index <= activeIndex
            const side = index % 2 === 0 ? 'left' : 'right'
            return (
              <motion.article
                key={`${item.period}-${item.level}`}
                className={`ab-timeline-item is-${side}${isActive ? ' is-active' : ''}${item.current ? ' is-current' : ''}${item.future ? ' is-future' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
              >
                <div className="ab-timeline-card card">
                  <div className="ab-timeline-card-top">
                    <span>
                      <strong>{item.school}</strong>
                      <small>{item.level}</small>
                    </span>
                    <em>{item.period}</em>
                  </div>
                  <p>{item.desc}</p>
                </div>

                <div className="ab-timeline-dot" style={{ '--tl-color': item.current ? '#3B82F6' : item.future ? '#8B5CF6' : '#10B981' }}>
                  <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
