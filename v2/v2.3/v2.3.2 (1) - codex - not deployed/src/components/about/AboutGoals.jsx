import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { circleCheck, fadeUp, goals, stagger } from './aboutData.js'
import AboutSectionHeader from './AboutSectionHeader.jsx'

export default function AboutGoals() {
  return (
    <section className="ab-section" id="goals">
      <div className="container-xl">
        <AboutSectionHeader eyebrow="Goals" title="Plans &" highlight="Progress">
          Short-term, mid-term, and long-term goals now include progress bars as requested.
        </AboutSectionHeader>

        <motion.div
          className="ab-goals-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
          variants={stagger(0.08)}
        >
          {goals.map(({ period, timeframe, progress, color, icon, items }) => (
            <motion.article key={period} className="ab-goal-card card" variants={fadeUp} style={{ '--goal-color': color }}>
              <div className="ab-goal-topbar" />
              <div className="ab-goal-body">
                <div className="ab-goal-head">
                  <span style={{ color, background: `${color}18` }}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 style={{ color }}>{period}</h3>
                    <p>{timeframe}</p>
                  </div>
                </div>

                <ul className="ab-goal-list">
                  {items.map((item) => (
                    <li key={item}>
                      <FontAwesomeIcon icon={circleCheck} style={{ color }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="ab-goal-progress">
                  <div>
                    <span>Progress</span>
                    <strong style={{ color }}>{progress}%</strong>
                  </div>
                  <div className="ab-goal-track">
                    <motion.span
                      style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
