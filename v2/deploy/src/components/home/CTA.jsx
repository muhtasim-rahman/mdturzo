// CTA.jsx — v2.2.0
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

export default function CTA() {
  return (
    <section className="section">
      <div className="container-xl">
        <motion.div
          className="relative rounded-2xl overflow-hidden p-10 sm:p-14 text-center"
          style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-2) 100%)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          {/* glow orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-[0.07] blur-[80px]"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-[0.07] blur-[80px]"
            style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
              Have a project in mind?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I'm always open to new opportunities, collaborations, and interesting projects.
              Let's build something meaningful together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm
                  bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white
                  shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-200
                  active:scale-[0.97] group">
                <FontAwesomeIcon icon={faEnvelope} />
                Get in Touch
                <FontAwesomeIcon icon={faArrowRight}
                  className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a href={`mailto:${SITE_CONFIG.owner.email}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm
                  border border-[var(--border-strong)] text-[var(--text-secondary)]
                  hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]
                  transition-all duration-200 active:scale-[0.97]">
                {SITE_CONFIG.owner.email}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
