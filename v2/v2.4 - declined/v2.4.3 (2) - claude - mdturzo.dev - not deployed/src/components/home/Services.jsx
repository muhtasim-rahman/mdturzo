// ============================================================
// Services.jsx -- v2.2.6
// FIX: card hover border = svc.color (not --accent-primary)
// Services offered -- cards with icon, description, features
// ============================================================

import React, { useState } from 'react'
import { Link }   from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobe, faPalette, faVideo,
  faCheck, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

const SERVICES = [
  {
    icon: faGlobe,
    color: '#3B82F6',
    gradient: 'from-blue-500/10 to-blue-600/5',
    title: 'Website Design & Development',
    description:
      'Visually appealing, responsive, and professional websites tailored to your needs -- built with modern tech stack.',
    features: [
      'Responsive design (mobile-first)',
      'Clean & modern UI',
      'Fast loading & optimized',
      'SEO-friendly structure',
      'React or static HTML/CSS',
    ],
    badge: 'Most popular',
    badgeColor: '#3B82F6',
  },
  {
    icon: faPalette,
    color: '#EC4899',
    gradient: 'from-pink-500/10 to-pink-600/5',
    title: 'Graphic Design',
    description:
      'Eye-catching visuals for your brand -- logos, banners, thumbnails, posters, and more using design principles.',
    features: [
      'Logo & brand identity',
      'Social media banners',
      'YouTube thumbnails',
      'Event posters',
      'Business card design',
    ],
    badge: '6+ years exp.',
    badgeColor: '#EC4899',
  },
  {
    icon: faVideo,
    color: '#A855F7',
    gradient: 'from-purple-500/10 to-purple-600/5',
    title: 'Video Editing',
    description:
      'Professional video content for YouTube, social media, ads -- polished edits with effects and motion.',
    features: [
      'YouTube video editing',
      'Reels & Shorts',
      'Intro / outro animation',
      'Subtitle & captions',
      'Color grading',
    ],
    badge: '5+ years exp.',
    badgeColor: '#A855F7',
  },
]

export default function Services() {
  return (
    <section className="section section-alt">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
            What I Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
            Services
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            I provide quality digital services -- ethically and professionally.
            All work follows Islamic &amp; halal principles.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => {
            const [hov, setHov] = useState(false)
            return (
            <motion.div
              key={svc.title}
              className="card p-6 flex flex-col gap-5 relative overflow-hidden group transition-colors duration-300"
              style={{ borderColor: hov ? svc.color : undefined }}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${svc.gradient} opacity-0
                  group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Badge */}
              <div className="flex items-start justify-between gap-2 relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${svc.color}18`, color: svc.color }}
                >
                  <FontAwesomeIcon icon={svc.icon} className="text-xl" />
                </div>
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${svc.badgeColor}18`,
                    color: svc.badgeColor,
                    border: `1px solid ${svc.badgeColor}30`,
                  }}
                >
                  {svc.badge}
                </span>
              </div>

              {/* Title & description */}
              <div className="relative space-y-2">
                <h3 className="font-display font-bold text-[var(--text-primary)] text-lg leading-tight">
                  {svc.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Feature list */}
              <ul className="relative space-y-2 flex-1">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-xs flex-shrink-0"
                      style={{ color: svc.color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="border-t border-[var(--border-color)] relative" />

              {/* CTA */}
              <Link
                to="/contact"
                className="relative flex items-center justify-between text-sm font-semibold
                  group/cta"
                style={{ color: svc.color }}
              >
                <span>Get this service</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs transition-transform duration-200 group-hover/cta:translate-x-1"
                />
              </Link>
            </motion.div>
          )})}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-xs text-[var(--text-tertiary)] mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          All services are offered ethically. No haram content or immoral projects accepted.
        </motion.p>
      </div>
    </section>
  )
}
