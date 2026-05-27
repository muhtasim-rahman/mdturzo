import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { expertiseIcons, languages, skillTabs } from './aboutData.js'
import AboutSectionHeader from './AboutSectionHeader.jsx'

function AnimatedBar({ item, index, active }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!active) {
      setReady(false)
      return undefined
    }
    const t = window.setTimeout(() => setReady(true), index * 80 + 120)
    return () => window.clearTimeout(t)
  }, [active, index])

  return (
    <div className="ab-skill-row">
      <div className="ab-skill-meta">
        <span className="ab-skill-name">{item.name}</span>
        <span className="ab-skill-side">
          {item.note && <small>{item.note}</small>}
          <strong style={{ color: item.color }}>{item.pct}%</strong>
        </span>
      </div>
      <div className="ab-skill-track">
        <motion.div
          className="ab-skill-fill"
          style={{ background: `linear-gradient(90deg, ${item.color}bb, ${item.color})`, boxShadow: `0 0 14px ${item.color}55` }}
          initial={{ width: 0 }}
          animate={{ width: ready ? `${item.pct}%` : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function AboutKnowledge() {
  const [tab, setTab] = useState(skillTabs[0].id)
  const skillsRef = useRef(null)
  const skillsInView = useInView(skillsRef, { once: false, margin: '-100px' })
  const activeTab = skillTabs.find((item) => item.id === tab) || skillTabs[0]

  return (
    <section className="ab-section" id="what-i-know">
      <div className="container-xl">
        <AboutSectionHeader eyebrow="What I Know" title="Skills &" highlight="Languages">
          Every tab uses the same programming-style layout with animated progress bars.
        </AboutSectionHeader>

        <div className="ab-tabs" role="tablist" aria-label="Skill categories">
          {skillTabs.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`ab-tab${tab === id ? ' is-active' : ''}`}
              onClick={() => setTab(id)}
            >
              <FontAwesomeIcon icon={icon} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="ab-knowledge-grid" ref={skillsRef}>
          <motion.div
            key={activeTab.id}
            className="ab-skill-bars card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            {activeTab.items.map((item, index) => (
              <AnimatedBar key={item.name} item={item} index={index} active={skillsInView} />
            ))}
          </motion.div>

          <motion.aside
            key={`${activeTab.id}-info`}
            className="ab-skill-note card"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28 }}
          >
            <span>
              <FontAwesomeIcon icon={expertiseIcons[activeTab.id]} aria-hidden="true" />
            </span>
            <strong>{activeTab.label} Focus</strong>
            <p>{activeTab.summary}</p>
          </motion.aside>
        </div>

        <div className="ab-language-block">
          <AboutSectionHeader eyebrow="Language Proficiency" title="Communication" highlight="Range" align="left">
            Language bars reuse the same animated progress pattern for a consistent section rhythm.
          </AboutSectionHeader>

          <div className="ab-language-grid">
            {languages.map((item, index) => (
              <motion.div
                key={item.name}
                className="ab-language-card card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <img
                  src={`https://flagcdn.com/w40/${item.flag}.webp`}
                  alt=""
                  loading="lazy"
                  width="28"
                  height="21"
                />
                <div>
                  <div className="ab-language-meta">
                    <span>
                      <strong>{item.name}</strong>
                      {item.native && <small>{item.native}</small>}
                    </span>
                    <em style={{ color: item.color, background: `${item.color}18` }}>{item.level}</em>
                  </div>
                  <AnimatedBar item={item} index={index} active />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
