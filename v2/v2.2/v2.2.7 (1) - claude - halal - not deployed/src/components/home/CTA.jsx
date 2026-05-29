// CTA.jsx — v2.2.7
// CHANGES: availability badge removed, premium centered redesign
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import SITE_CONFIG from '../../config/site.config.js'

const FEATURES = [
  'Fast response',
  'Clean, maintainable code',
  'On-time delivery',
  'Pixel-perfect design',
]

export default function CTA() {
  return (
    <section className="cta-section section" id="cta" aria-label="Work with me">
      {/* Dot-grid bg */}
      <div className="cta-bg" aria-hidden="true"/>
      {/* Radial glow */}
      <div className="cta-glow" aria-hidden="true"/>

      <div className="container-xl relative z-10">
        <motion.div className="cta-inner"
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.4 }}
          transition={{ duration:.6, ease:[.16,1,.3,1] }}>

          {/* Star icon accent */}
          <motion.div
            animate={{ rotate:[0,15,-15,0], scale:[1,1.12,1] }}
            transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
            className="cta-star-icon">
            <FontAwesomeIcon icon={faStar}/>
          </motion.div>

          {/* Heading */}
          <h2 className="cta-heading">
            Let's build something<br/>
            <span className="cta-accent">amazing together</span>
          </h2>

          <p className="cta-sub">
            Have a project idea or a problem to solve?<br className="hidden sm:inline"/>
            I'm open to freelance work, collaborations, and exciting opportunities.
          </p>

          {/* Feature pills */}
          <div className="cta-features">
            {FEATURES.map(f => (
              <span key={f} className="cta-feat">
                <span className="cta-feat-dot" aria-hidden="true"/>
                {f}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-primary">
              <FontAwesomeIcon icon={faEnvelope}/>
              Get in touch
              <FontAwesomeIcon icon={faArrowRight} className="cta-arr"/>
            </Link>
            <a href={SITE_CONFIG.social?.github ?? '#'} target="_blank" rel="noopener noreferrer"
              className="cta-btn-outline">
              <FontAwesomeIcon icon={faGithub}/>
              GitHub
            </a>
            <a href={SITE_CONFIG.social?.linkedin ?? '#'} target="_blank" rel="noopener noreferrer"
              className="cta-btn-outline">
              <FontAwesomeIcon icon={faLinkedin}/>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-section { position:relative; overflow:hidden; }

        .cta-bg {
          position:absolute;inset:0;z-index:0;pointer-events:none;
          background-image:
            radial-gradient(rgba(99,102,241,.10) 1.5px, transparent 1.5px),
            radial-gradient(rgba(59,130,246,.05) 1px, transparent 1px);
          background-size:26px 26px, 13px 13px;
          background-position:0 0, 6.5px 6.5px;
          mask-image:radial-gradient(ellipse 85% 75% at 50% 50%, black 15%, transparent 82%);
          -webkit-mask-image:radial-gradient(ellipse 85% 75% at 50% 50%, black 15%, transparent 82%);
          animation:ctabg 30s linear infinite;
        }
        [data-theme=light] .cta-bg {
          background-image:radial-gradient(rgba(37,99,235,.07) 1.5px,transparent 1.5px),radial-gradient(rgba(99,102,241,.04) 1px,transparent 1px);
        }
        @keyframes ctabg{to{background-position:26px 26px,20px 20px}}

        .cta-glow {
          position:absolute;inset:0;z-index:0;pointer-events:none;
          background:radial-gradient(ellipse 55% 45% at 50% 50%, rgba(99,102,241,.09) 0%, transparent 68%);
          animation:ctaglow 5s ease-in-out infinite;
        }
        @keyframes ctaglow{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}

        .cta-inner {
          position:relative;z-index:1;
          display:flex;flex-direction:column;align-items:center;
          text-align:center;gap:1.5rem;
          max-width:600px;margin-inline:auto;
          padding:3rem 1.5rem;
          border-radius:28px;
          background:linear-gradient(135deg,
            rgba(255,255,255,.03) 0%,
            rgba(99,102,241,.04) 50%,
            rgba(255,255,255,.02) 100%
          );
          border:1px solid rgba(99,102,241,.18);
          box-shadow:0 0 60px rgba(99,102,241,.06),inset 0 1px 0 rgba(255,255,255,.06);
          backdrop-filter:blur(8px);
        }
        [data-theme=light] .cta-inner {
          background:linear-gradient(135deg,rgba(255,255,255,.9),rgba(238,242,255,.8));
          border-color:rgba(99,102,241,.15);
          box-shadow:0 8px 40px rgba(99,102,241,.08),inset 0 1px 0 rgba(255,255,255,.9);
        }

        .cta-star-icon {
          width:48px;height:48px;border-radius:14px;
          display:flex;align-items:center;justify-content:center;
          background:linear-gradient(135deg,var(--accent-primary),#6366f1);
          color:#fff;font-size:18px;
          box-shadow:0 6px 24px rgba(99,102,241,.32);
          margin-bottom:-.25rem;
        }

        .cta-heading {
          font-size:clamp(1.9rem,4vw,3rem);
          font-weight:800;line-height:1.12;
          letter-spacing:-.03em;
          font-family:var(--font-display);
          color:var(--text-primary);
          margin:0;
        }
        .cta-accent {
          background:linear-gradient(135deg,var(--accent-primary) 0%,#818cf8 50%,#c084fc 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }

        .cta-sub {
          font-size:clamp(.85rem,1.1vw,.98rem);
          color:var(--text-secondary);
          line-height:1.72;max-width:440px;
        }

        .cta-features {
          display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;
        }
        .cta-feat {
          display:inline-flex;align-items:center;gap:.4rem;
          font-size:.76rem;font-weight:500;
          color:var(--text-secondary);
          padding:.28rem .75rem;border-radius:9999px;
          background:var(--bg-surface-2);
          border:1px solid var(--border-color);
        }
        .cta-feat-dot {
          width:5px;height:5px;border-radius:50%;
          background:var(--accent-primary);flex-shrink:0;
        }

        .cta-btns{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;margin-top:.25rem}

        .cta-btn-primary {
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.65rem 1.5rem;border-radius:1rem;
          background:var(--accent-primary);color:#fff;
          font-size:.88rem;font-weight:700;
          border:2px solid var(--accent-primary);text-decoration:none;
          box-shadow:0 4px 18px rgba(37,99,235,.32);
          transition:all .2s ease;position:relative;overflow:hidden;
        }
        .cta-btn-primary:hover{background:var(--accent-hover);border-color:var(--accent-hover);box-shadow:0 8px 28px rgba(37,99,235,.44);transform:translateY(-2px)}
        .cta-btn-primary:active{transform:scale(.96)}
        .cta-arr{transition:transform .2s ease}
        .cta-btn-primary:hover .cta-arr{transform:translateX(3px)}

        .cta-btn-outline {
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.65rem 1.3rem;border-radius:1rem;
          background:transparent;color:var(--text-secondary);
          font-size:.88rem;font-weight:600;
          border:2px solid var(--border-strong);text-decoration:none;
          transition:all .2s ease;
        }
        .cta-btn-outline:hover{border-color:var(--accent-primary);color:var(--text-primary);background:var(--accent-light);transform:translateY(-2px)}
        .cta-btn-outline:active{transform:scale(.96)}
      `}</style>
    </section>
  )
}
