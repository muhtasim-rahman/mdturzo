// CTA.jsx — v2.2.6
// TASK 5: Fully redesigned — centered card, dot-grid texture, NO hero-sit.webp
// Uses accent gradient bg with dot-grid overlay, centered text layout
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faFolderOpen, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const POINTS = [
  'Web Development & React Apps',
  'Graphic Design & Branding',
  'Video Editing & Motion',
  'Islamic & Ethical Standards',
]

export default function CTA() {
  return (
    <section className="section" id="cta">
      <div className="container-xl">
        <motion.div
          className="cta-card"
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.2 }}
          transition={{ duration:.65, ease:[.16,1,.3,1] }}>

          {/* Dot-grid texture overlay */}
          <div className="cta-dots" aria-hidden="true"/>

          {/* Accent orbs */}
          <div className="cta-orb cta-orb-1" aria-hidden="true"/>
          <div className="cta-orb cta-orb-2" aria-hidden="true"/>

          {/* Content — centered */}
          <div className="cta-body">
            <motion.p className="cta-eyebrow"
              initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.4,delay:.1}}>
              Let's Build Together
            </motion.p>

            <motion.h2 className="cta-title"
              initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.45,delay:.18}}>
              Have a project<br/>
              <span className="cta-title-acc">in mind?</span>
            </motion.h2>

            <motion.p className="cta-desc"
              initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.4,delay:.26}}>
              Always open to meaningful collaborations. Let's create something
              exceptional — delivered ethically and professionally.
            </motion.p>

            {/* Feature pills */}
            <motion.div className="cta-points"
              initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.4,delay:.34}}>
              {POINTS.map(pt => (
                <span key={pt} className="cta-point">
                  <FontAwesomeIcon icon={faCircleCheck} className="cta-point-icon"/>
                  {pt}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div className="cta-actions"
              initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.4,delay:.42}}>
              <Link to="/contact" className="cta-btn cta-btn-primary group">
                <FontAwesomeIcon icon={faEnvelope} className="text-xs"/>
                Get in Touch
                <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link to="/projects" className="cta-btn cta-btn-outline">
                <FontAwesomeIcon icon={faFolderOpen} className="text-xs"/>
                View Work
              </Link>
            </motion.div>

            <motion.p className="cta-note"
              initial={{opacity:0}} whileInView={{opacity:1}}
              viewport={{once:true}} transition={{duration:.4,delay:.5}}>
              ✦ All work follows Islamic &amp; ethical principles &nbsp;·&nbsp; Reply within 24h insha'Allah
            </motion.p>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Task 5: Centered card with gradient bg + dot-grid texture */
        .cta-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          padding: clamp(2.5rem,6vw,4.5rem) clamp(1.5rem,5vw,3rem);
          background: linear-gradient(135deg,
            rgba(17,30,60,1) 0%,
            rgba(20,36,72,1) 40%,
            rgba(25,42,84,1) 70%,
            rgba(22,34,66,1) 100%);
          border: 1px solid rgba(59,130,246,0.2);
          text-align: center;
          isolation: isolate;
        }
        [data-theme="light"] .cta-card {
          background: linear-gradient(135deg,
            rgba(30,64,175,1) 0%,
            rgba(37,99,235,1) 45%,
            rgba(29,78,216,1) 100%);
          border-color: rgba(255,255,255,0.15);
        }

        /* Dot-grid texture */
        .cta-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
          z-index: 0;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        /* Glowing orbs */
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }
        .cta-orb-1 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(59,130,246,.28) 0%, transparent 70%);
          top: -100px; left: -80px;
        }
        .cta-orb-2 {
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%);
          bottom: -60px; right: -40px;
        }

        /* Content */
        .cta-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          max-width: 600px;
          margin-inline: auto;
        }

        .cta-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(147,197,253,0.9);
          margin: 0;
        }
        [data-theme="light"] .cta-eyebrow {
          color: rgba(255,255,255,0.85);
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: clamp(2rem,4vw,3rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
        }
        .cta-title-acc {
          color: #93c5fd;
        }
        [data-theme="light"] .cta-title-acc {
          color: #bfdbfe;
        }

        .cta-desc {
          font-size: 0.9rem;
          color: rgba(186,210,255,0.8);
          line-height: 1.75;
          margin: 0;
          max-width: 420px;
        }
        [data-theme="light"] .cta-desc {
          color: rgba(255,255,255,0.82);
        }

        /* Feature pills */
        .cta-points {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .cta-point {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(210,230,255,0.9);
          backdrop-filter: blur(6px);
          white-space: nowrap;
        }
        [data-theme="light"] .cta-point {
          background: rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.92);
        }
        .cta-point-icon {
          color: #93c5fd;
          font-size: 0.65rem;
          flex-shrink: 0;
        }

        /* CTA buttons */
        .cta-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0.65rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all .2s ease;
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .cta-btn:active { transform: scale(.97); }
        .cta-btn-primary {
          background: rgba(255,255,255,0.96);
          color: #1d4ed8;
          box-shadow: 0 4px 18px rgba(0,0,0,.2);
        }
        .cta-btn-primary:hover {
          background: #fff;
          box-shadow: 0 8px 28px rgba(0,0,0,.28);
          transform: translateY(-1px);
        }
        .cta-btn-outline {
          background: rgba(255,255,255,0.08);
          color: rgba(210,230,255,0.9);
          border: 1.5px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(6px);
        }
        .cta-btn-outline:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.36);
          color: #fff;
          transform: translateY(-1px);
        }

        .cta-note {
          font-size: 0.68rem;
          color: rgba(147,197,253,0.55);
          margin: 0;
          letter-spacing: 0.01em;
        }
        [data-theme="light"] .cta-note {
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  )
}
