import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faBrain,
  faCode,
  faDatabase,
  faEnvelope,
  faGraduationCap,
  faLayerGroup,
  faLocationDot,
  faPenNib,
  faQuoteLeft,
  faRocket,
  faShieldHalved,
  faStar,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { buildMeta, personSchema, websiteSchema } from '../utils/seo.js'
import { trackPage } from '../services/analytics.js'
import {
  getApprovedReviews,
  getFeaturedProjects,
  getSiteSettings,
} from '../services/supabase.js'
import { SkeletonBox, SkeletonCard, SkeletonCircle, SkeletonText } from '../components/ui/Skeleton.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const skills = [
  { label: 'AI', value: 90, icon: faBrain, note: 'Coding, planning, docs and design workflow' },
  { label: 'HTML/CSS', value: 82, icon: faCode, note: 'Responsive interfaces and clean visual systems' },
  { label: 'Git & GitHub', value: 78, icon: faGithub, note: 'Version control and project publishing' },
  { label: 'Python', value: 58, icon: faDatabase, note: 'Learning scripts, logic and automation' },
  { label: 'JavaScript', value: 46, icon: faLayerGroup, note: 'Improving through real projects' },
  { label: 'Java', value: 40, icon: faCode, note: 'Core programming fundamentals' },
]

const services = [
  {
    title: 'Website Design',
    text: 'Responsive, professional websites with clear structure, strong visual hierarchy and maintainable code.',
    icon: faCode,
  },
  {
    title: 'Graphic Design',
    text: 'Logo, banner, thumbnail, card and poster visuals shaped for clean online presentation.',
    icon: faPenNib,
  },
  {
    title: 'Photo & Video Editing',
    text: 'Practical editing support for YouTube, short videos, social posts, ads and presentation assets.',
    icon: faVideo,
  },
]

const socialLinks = [
  { label: 'GitHub', icon: faGithub, url: SITE_CONFIG.social.github },
  { label: 'LinkedIn', icon: faLinkedinIn, url: SITE_CONFIG.social.linkedin },
  { label: 'Facebook', icon: faFacebookF, url: SITE_CONFIG.social.facebook },
  { label: 'Instagram', icon: faInstagram, url: SITE_CONFIG.social.instagram },
  { label: 'YouTube', icon: faYoutube, url: SITE_CONFIG.social.youtube },
  { label: 'Telegram', icon: faTelegram, url: SITE_CONFIG.social.telegram },
]

function settingValue(settings, key, fallback) {
  const raw = settings?.[key]
  if (raw === undefined || raw === null || raw === '') return fallback
  if (typeof raw === 'object' && 'value' in raw) return raw.value ?? fallback
  return raw
}

function parseCount(value, fallback = 0) {
  const normalized = String(value ?? fallback).replace(/[^\d.]/g, '')
  const number = Number.parseFloat(normalized)
  return Number.isFinite(number) ? number : fallback
}

function useHomeData() {
  const [settings, setSettings] = useState({})
  const [projects, setProjects] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState({ settings: true, projects: true, reviews: true })

  useEffect(() => {
    let active = true

    getSiteSettings()
      .then(data => { if (active) setSettings(data || {}) })
      .catch(() => {})
      .finally(() => { if (active) setLoading(prev => ({ ...prev, settings: false })) })

    getFeaturedProjects()
      .then(data => { if (active) setProjects(Array.isArray(data) ? data : []) })
      .catch(() => {})
      .finally(() => { if (active) setLoading(prev => ({ ...prev, projects: false })) })

    getApprovedReviews({ limit: 3 })
      .then(data => { if (active) setReviews(Array.isArray(data) ? data : []) })
      .catch(() => {})
      .finally(() => { if (active) setLoading(prev => ({ ...prev, reviews: false })) })

    return () => { active = false }
  }, [])

  return { settings, projects, reviews, loading }
}

function AnimatedNumber({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)
  const target = Number(value) || 0

  useEffect(() => {
    if (!inView) return
    const started = performance.now()
    const duration = 1200
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <span ref={ref} className={className}>{count}{suffix}</span>
}

function SectionIntro({ eyebrow, title, text, align = 'center' }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`home-section-head ${align === 'left' ? 'text-left mx-0' : 'text-center mx-auto'}`}
    >
      <span className="section-label">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  )
}

function Hero({ settings, loading }) {
  const heroStats = useMemo(() => ([
    {
      label: 'Years Dev',
      value: parseCount(settingValue(settings, 'stats_years_dev', SITE_CONFIG.defaults.statsYearsDev), 3),
    },
    {
      label: 'Years Design',
      value: parseCount(settingValue(settings, 'stats_years_design', SITE_CONFIG.defaults.statsYearsDesign), 6),
    },
    {
      label: 'Projects',
      value: parseCount(settingValue(settings, 'stats_projects', SITE_CONFIG.defaults.statsProjects), 16),
    },
  ]), [settings])

  return (
    <section className="home-hero" id="hero" aria-label="Introduction">
      <div className="home-hero__mesh" aria-hidden />
      <div className="home-hero__grain" aria-hidden />
      <div className="home-hero__orb home-hero__orb--one" aria-hidden />
      <div className="home-hero__orb home-hero__orb--two" aria-hidden />

      <div className="container-xl home-hero__inner">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="home-hero__content">
          <motion.div variants={fadeUp} className="home-hero__greeting">
            <span>Assalamu Alaikum</span>
            <small>I am</small>
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Muhtasim
            <span>Rahman <em>(Turzo)</em></span>
          </motion.h1>

          <motion.p variants={fadeUp} className="home-hero__role">
            Web Developer &amp; Designer from Bangladesh
          </motion.p>

          <motion.p variants={fadeUp} className="home-hero__bio">
            A dedicated student developer building clean, fast and meaningful digital experiences with a focus on quality, ethics and useful technology.
          </motion.p>

          <motion.div variants={fadeUp} className="home-hero__actions">
            <Link to="/projects" className="home-btn home-btn--primary">
              View Projects <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/contact" className="home-btn home-btn--ghost">
              Contact Me <FontAwesomeIcon icon={faEnvelope} />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="home-hero__socials" aria-label="Social links">
            {socialLinks.map(item => (
              <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                <FontAwesomeIcon icon={item.icon} />
              </a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="home-hero__stats">
            {loading ? (
              <>
                {[0, 1, 2].map(i => <SkeletonBox key={i} w="w-24" h="h-12" rounded="rounded-xl" />)}
              </>
            ) : heroStats.map(stat => (
              <div key={stat.label} className="home-hero__stat">
                <strong><AnimatedNumber value={stat.value} suffix="+" /></strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="home-hero__visual"
          aria-hidden
        >
          <div className="home-hero__photo-ring">
            <div className="home-hero__photo-glow" />
            <img src="/hero.webp" alt="" className="home-hero__photo" />
            <span className="home-hero__tech home-hero__tech--html">HTML</span>
            <span className="home-hero__tech home-hero__tech--css">CSS</span>
            <span className="home-hero__tech home-hero__tech--ai">AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AboutMini({ settings, loading }) {
  const age = calculateAge()
  const yearsDev = parseCount(settingValue(settings, 'stats_years_dev', SITE_CONFIG.defaults.statsYearsDev), 3)

  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section home-about-mini">
      <div className="container-xl home-about-mini__grid">
        <motion.div variants={fadeUp} className="home-about-mini__image">
          <img src="/hero-back.webp" alt="Muhtasim Rahman portrait" />
          <div className="home-about-mini__card">
            <FontAwesomeIcon icon={faShieldHalved} />
            <span>Ethical, halal and useful work first</span>
          </div>
        </motion.div>

        <div>
          <SectionIntro
            align="left"
            eyebrow="Mini About"
            title="Student developer with a practical builder mindset."
            text="From technical curiosity in childhood to a CSE-focused goal, I am learning by building real tools, useful websites and polished interfaces."
          />

          <motion.div variants={fadeUp} className="home-about-mini__facts">
            {loading ? (
              <>
                <SkeletonText lines={3} />
                <SkeletonText lines={2} />
              </>
            ) : (
              <>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{SITE_CONFIG.owner.location}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>SSC-26 student, future CSE path</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faRocket} />
                  <span>{yearsDev}+ years of web development practice</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faStar} />
                  <span>Approx. {age} years old, age auto-calculated</span>
                </div>
              </>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="home-about-mini__actions">
            <Link to="/about" className="home-text-link">
              Read full story <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function SkillsSection() {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section">
      <div className="container-xl">
        <SectionIntro
          eyebrow="Skills"
          title="Balanced between code, design and AI-assisted workflows."
          text="The numbers are self-rated references from the profile data, useful for showing current direction rather than claiming formal employment experience."
        />

        <div className="home-skills">
          {skills.map(skill => (
            <motion.article variants={fadeUp} key={skill.label} className="home-skill-card card">
              <div className="home-skill-card__top">
                <span><FontAwesomeIcon icon={skill.icon} /></span>
                <strong>{skill.label}</strong>
              </div>
              <p>{skill.note}</p>
              <div className="home-skill-card__bar" aria-label={`${skill.label} skill level ${skill.value}%`}>
                <i style={{ width: `${skill.value}%` }} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function ServicesSection() {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section home-services-wrap">
      <div className="container-xl">
        <SectionIntro
          eyebrow="Services"
          title="Services kept focused, honest and practical."
          text="These are the areas currently suitable for public presentation; the service list can stay dynamic later through the admin system."
        />

        <div className="home-services">
          {services.map(service => (
            <motion.article variants={fadeUp} key={service.title} className="home-service-card card">
              <span><FontAwesomeIcon icon={service.icon} /></span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function StatsSection({ settings, loading }) {
  const stats = [
    { label: 'Web Development', value: parseCount(settingValue(settings, 'stats_years_dev', SITE_CONFIG.defaults.statsYearsDev), 3), suffix: '+ yrs' },
    { label: 'Design Practice', value: parseCount(settingValue(settings, 'stats_years_design', SITE_CONFIG.defaults.statsYearsDesign), 6), suffix: '+ yrs' },
    { label: 'Portfolio Projects', value: parseCount(settingValue(settings, 'stats_projects', SITE_CONFIG.defaults.statsProjects), 16), suffix: '+' },
    { label: 'Core Services', value: 3, suffix: '' },
  ]

  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section home-stats-section">
      <div className="container-xl">
        <div className="home-stats">
          {loading ? (
            [0, 1, 2, 3].map(i => (
              <div className="home-stat-card card" key={i}>
                <SkeletonBox w="w-20" h="h-10" rounded="rounded-lg" className="mx-auto" />
                <SkeletonBox w="w-28" h="h-4" className="mx-auto mt-3" />
              </div>
            ))
          ) : stats.map(stat => (
            <motion.div variants={fadeUp} className="home-stat-card card" key={stat.label}>
              <strong><AnimatedNumber value={stat.value} suffix={stat.suffix} /></strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function ProjectCard({ project }) {
  const image = project.thumbnail_url || project.cover_image_url || '/preview.png'
  const detailPath = `/projects/${project.slug}`

  return (
    <motion.article variants={fadeUp} className="home-project-card card">
      <Link to={detailPath} className="home-project-card__image">
        <img src={image} alt={project.title || 'Project thumbnail'} loading="lazy" />
        {project.category && <span>{project.category}</span>}
      </Link>
      <div className="home-project-card__body">
        <h3><Link to={detailPath}>{project.title}</Link></h3>
        <p>{project.short_description || project.description || 'Project details will be available soon.'}</p>
        {Array.isArray(project.tags) && project.tags.length > 0 && (
          <div className="home-project-card__tags">
            {project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
          </div>
        )}
        <div className="home-project-card__links">
          <Link to={detailPath}>Details <FontAwesomeIcon icon={faArrowRight} /></Link>
          {project.live_link && (
            <a href={project.live_link} target="_blank" rel="noopener noreferrer">
              Live <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function RecentProjects({ projects, loading }) {
  if (!loading && projects.length === 0) return null

  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section">
      <div className="container-xl">
        <div className="home-split-head">
          <SectionIntro
            align="left"
            eyebrow="Featured Projects"
            title="Recent work highlighted from Supabase."
            text="The home list follows the admin featured order and hides automatically when no project is featured."
          />
          <motion.div variants={fadeUp}>
            <Link to="/projects" className="home-text-link">All projects <FontAwesomeIcon icon={faArrowRight} /></Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="home-projects-grid">
            {[0, 1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="home-projects-grid">
            {projects.map(project => <ProjectCard key={project.id || project.slug} project={project} />)}
          </div>
        )}
      </div>
    </motion.section>
  )
}

function GithubStats() {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section home-github-section">
      <div className="container-xl home-github">
        <div>
          <SectionIntro
            align="left"
            eyebrow="GitHub"
            title="Open source activity and learning trail."
            text="GitHub is used for publishing, version control and preserving the project journey from simple HTML/CSS work to advanced apps."
          />
          <motion.a variants={fadeUp} href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="home-btn home-btn--ghost">
            Visit GitHub <FontAwesomeIcon icon={faGithub} />
          </motion.a>
        </div>
        <motion.div variants={fadeUp} className="home-github__card card">
          <img
            src="https://streak-stats.demolab.com?user=muhtasim-rahman&theme=transparent&hide_border=true&date_format=M%20j%5B%2C%20Y%5D&card_width=820"
            alt="GitHub streak stats for muhtasim-rahman"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

function ReviewsPreview({ reviews, loading }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="section">
      <div className="container-xl">
        <SectionIntro
          eyebrow="Reviews"
          title="Community feedback preview."
          text="Approved reviews are loaded from Supabase. When none are approved yet, the section shows a clean empty state."
        />

        {loading ? (
          <div className="home-reviews">
            {[0, 1, 2].map(i => (
              <div className="home-review-card card" key={i}>
                <div className="flex gap-3 items-center mb-4">
                  <SkeletonCircle size={42} />
                  <div className="flex-1">
                    <SkeletonBox w="w-32" h="h-4" />
                    <SkeletonBox w="w-20" h="h-3" className="mt-2" />
                  </div>
                </div>
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="home-reviews">
            {reviews.map(review => {
              const user = review.users || {}
              return (
                <motion.article variants={fadeUp} className="home-review-card card" key={review.id}>
                  <FontAwesomeIcon icon={faQuoteLeft} className="home-review-card__quote" />
                  <div className="home-review-card__stars" aria-label={`${review.rating || 5} star rating`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < (review.rating || 5) ? 'is-active' : ''} />
                    ))}
                  </div>
                  <p>{review.text || 'No written review provided.'}</p>
                  <div className="home-review-card__user">
                    <span>{(user.display_name || user.username || 'Visitor').slice(0, 1).toUpperCase()}</span>
                    <div>
                      <strong>{user.display_name || 'Portfolio Visitor'}</strong>
                      {user.username && <small>@{user.username}</small>}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        ) : (
          <motion.div variants={fadeUp} className="home-empty card">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <h3>No approved reviews yet</h3>
            <p>Approved Supabase reviews will appear here automatically after the admin review flow is ready.</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default function Home() {
  const { settings, projects, reviews, loading } = useHomeData()
  const meta = buildMeta({ title: null, image: SITE_CONFIG.seo.defaultOGImage })

  useEffect(() => { trackPage('Home') }, [])

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema())}</script>
      </Helmet>

      <Hero settings={settings} loading={loading.settings} />
      <AboutMini settings={settings} loading={loading.settings} />
      <SkillsSection />
      <ServicesSection />
      <StatsSection settings={settings} loading={loading.settings} />
      <RecentProjects projects={projects} loading={loading.projects} />
      <GithubStats />
      <ReviewsPreview reviews={reviews} loading={loading.reviews} />

      <style>{`
        .home-hero {
          position: relative;
          min-height: min(850px, calc(100vh - 40px));
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: clamp(5rem, 9vw, 7.5rem) 0 clamp(4rem, 7vw, 6rem);
          background:
            radial-gradient(circle at 18% 22%, rgba(59,130,246,.18), transparent 34%),
            radial-gradient(circle at 72% 24%, rgba(14,165,233,.11), transparent 30%),
            linear-gradient(180deg, rgba(2,6,23,.2), var(--bg-page));
        }
        .home-hero__mesh {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(circle at 50% 36%, #000 0 42%, transparent 78%);
          pointer-events: none;
        }
        .home-hero__grain {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 18px 18px;
          opacity: .18;
          pointer-events: none;
        }
        .home-hero__orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(4px);
          opacity: .55;
          animation: home-float 8s ease-in-out infinite;
        }
        .home-hero__orb--one {
          width: 270px; height: 270px; right: 12%; top: 16%;
          background: radial-gradient(circle, rgba(59,130,246,.28), transparent 68%);
        }
        .home-hero__orb--two {
          width: 190px; height: 190px; left: 7%; bottom: 12%;
          background: radial-gradient(circle, rgba(34,197,94,.13), transparent 70%);
          animation-delay: -2.5s;
        }
        .home-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(320px, .82fr);
          align-items: center;
          gap: clamp(2rem, 6vw, 5rem);
          z-index: 1;
        }
        .home-hero__content { max-width: 720px; }
        .home-hero__greeting {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 13px;
          border-radius: 999px;
          border: 1px solid rgba(96,165,250,.28);
          background: rgba(15,23,42,.58);
          color: var(--clr-primary-300);
          font-family: var(--font-mono);
          font-size: .78rem;
          margin-bottom: 1.15rem;
          backdrop-filter: blur(14px);
        }
        [data-theme="light"] .home-hero__greeting { background: rgba(255,255,255,.72); }
        .home-hero__greeting small { color: var(--text-tertiary); }
        .home-hero h1 {
          font-size: clamp(3rem, 9vw, 7.4rem);
          line-height: .88;
          letter-spacing: -.07em;
          margin-bottom: 1.15rem;
        }
        .home-hero h1 span {
          display: block;
          color: var(--clr-primary-400);
        }
        .home-hero h1 em {
          font-style: normal;
          color: var(--text-tertiary);
          font-size: .24em;
          letter-spacing: -.03em;
          margin-left: .18em;
        }
        .home-hero__role {
          color: var(--text-primary);
          font-weight: 700;
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          margin-bottom: .8rem;
        }
        .home-hero__bio {
          max-width: 620px;
          font-size: clamp(.98rem, 1.6vw, 1.08rem);
          color: var(--text-secondary);
        }
        .home-hero__actions, .home-about-mini__actions {
          display: flex;
          gap: .85rem;
          flex-wrap: wrap;
          margin-top: 1.7rem;
        }
        .home-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .55rem;
          min-height: 44px;
          padding: 0 1.15rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: .92rem;
          transition: transform .22s ease, border-color .22s ease, background .22s ease, color .22s ease, box-shadow .22s ease;
        }
        .home-btn:hover { transform: translateY(-2px); }
        .home-btn--primary {
          background: linear-gradient(135deg, var(--accent-primary), #38bdf8);
          color: white;
          box-shadow: 0 14px 30px rgba(37,99,235,.28);
        }
        .home-btn--ghost {
          color: var(--text-primary);
          border: 1px solid var(--border-strong);
          background: rgba(15,23,42,.46);
        }
        [data-theme="light"] .home-btn--ghost { background: rgba(255,255,255,.72); }
        .home-hero__socials {
          display: flex;
          gap: .6rem;
          flex-wrap: wrap;
          margin-top: 1.35rem;
        }
        .home-hero__socials a {
          width: 38px; height: 38px;
          display: grid; place-items: center;
          border-radius: 999px;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          transition: all .22s ease;
        }
        .home-hero__socials a:hover {
          color: white;
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-3px);
        }
        .home-hero__stats {
          display: flex;
          flex-wrap: wrap;
          gap: .75rem;
          margin-top: 1.5rem;
        }
        .home-hero__stat {
          min-width: 112px;
          padding: .85rem 1rem;
          border-radius: 18px;
          border: 1px solid var(--border-color);
          background: rgba(15,23,42,.62);
          backdrop-filter: blur(16px);
        }
        [data-theme="light"] .home-hero__stat { background: rgba(255,255,255,.72); }
        .home-hero__stat strong {
          display: block;
          color: var(--text-primary);
          font-size: 1.45rem;
          line-height: 1;
        }
        .home-hero__stat span {
          display: block;
          color: var(--text-tertiary);
          font-size: .75rem;
          font-weight: 700;
          margin-top: .35rem;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .home-hero__visual {
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home-hero__photo-ring {
          position: relative;
          width: min(430px, 82vw);
          aspect-ratio: 1 / 1.18;
          border-radius: 46% 46% 28% 28%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          isolation: isolate;
        }
        .home-hero__photo-glow {
          position: absolute;
          inset: 6% 8% 0;
          border-radius: 48% 48% 30% 30%;
          background:
            radial-gradient(circle at 50% 18%, rgba(96,165,250,.5), transparent 36%),
            linear-gradient(180deg, rgba(59,130,246,.18), rgba(14,165,233,.04));
          border: 1px solid rgba(147,197,253,.24);
          box-shadow: 0 40px 90px rgba(2,6,23,.55), inset 0 1px 0 rgba(255,255,255,.12);
          z-index: -1;
        }
        .home-hero__photo {
          width: 92%;
          max-height: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 30px 44px rgba(0,0,0,.45));
        }
        .home-hero__tech {
          position: absolute;
          padding: .52rem .72rem;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,.18);
          background: rgba(15,23,42,.78);
          color: var(--clr-primary-200);
          font-family: var(--font-mono);
          font-size: .72rem;
          box-shadow: 0 18px 40px rgba(0,0,0,.28);
          animation: home-float 5s ease-in-out infinite;
        }
        .home-hero__tech--html { left: 3%; top: 30%; }
        .home-hero__tech--css { right: 2%; top: 42%; animation-delay: -1.4s; }
        .home-hero__tech--ai { left: 12%; bottom: 18%; animation-delay: -2.6s; }

        .home-section-head {
          max-width: 740px;
          margin-bottom: clamp(2rem, 4vw, 3rem);
        }
        .home-section-head h2 {
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          letter-spacing: -.055em;
          margin-bottom: .8rem;
        }
        .home-section-head p {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .home-about-mini__grid {
          display: grid;
          grid-template-columns: minmax(280px, .8fr) minmax(0, 1fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }
        .home-about-mini__image {
          position: relative;
          min-height: 460px;
          border-radius: 34px;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(15,23,42,.08), rgba(15,23,42,.88)),
            radial-gradient(circle at 50% 15%, rgba(59,130,246,.28), transparent 40%);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
        }
        .home-about-mini__image img {
          width: 100%;
          height: 100%;
          min-height: 460px;
          object-fit: cover;
          object-position: center top;
        }
        .home-about-mini__card {
          position: absolute;
          left: 18px; right: 18px; bottom: 18px;
          display: flex;
          align-items: center;
          gap: .75rem;
          padding: 1rem;
          border-radius: 18px;
          color: var(--text-primary);
          background: rgba(2,6,23,.78);
          border: 1px solid rgba(148,163,184,.18);
          backdrop-filter: blur(16px);
          font-weight: 700;
        }
        .home-about-mini__card svg { color: var(--accent-hover); }
        .home-about-mini__facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: .85rem;
          margin-top: 1.5rem;
        }
        .home-about-mini__facts > div {
          display: flex;
          gap: .75rem;
          align-items: center;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          background: var(--bg-surface);
          color: var(--text-secondary);
        }
        .home-about-mini__facts svg { color: var(--accent-primary); flex-shrink: 0; }
        .home-text-link {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          color: var(--accent-hover);
          font-weight: 800;
          transition: gap .22s ease, color .22s ease;
        }
        .home-text-link:hover { gap: .75rem; color: var(--text-primary); }

        .home-skills, .home-services, .home-projects-grid, .home-reviews {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .home-skill-card, .home-service-card, .home-project-card, .home-review-card, .home-stat-card {
          padding: 1.25rem;
        }
        .home-skill-card__top {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-bottom: .8rem;
        }
        .home-skill-card__top span, .home-service-card > span {
          width: 42px; height: 42px;
          display: grid; place-items: center;
          border-radius: 14px;
          color: var(--accent-hover);
          background: var(--accent-light);
        }
        .home-skill-card strong, .home-service-card h3, .home-project-card h3, .home-review-card strong {
          color: var(--text-primary);
          font-size: 1.05rem;
        }
        .home-skill-card p, .home-service-card p, .home-project-card p, .home-review-card p, .home-empty p {
          font-size: .92rem;
          color: var(--text-secondary);
        }
        .home-skill-card__bar {
          height: 9px;
          margin-top: 1rem;
          border-radius: 999px;
          background: var(--bg-surface-2);
          overflow: hidden;
        }
        .home-skill-card__bar i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent-primary), #38bdf8);
        }
        .home-services-wrap {
          background: linear-gradient(180deg, transparent, rgba(59,130,246,.05), transparent);
        }
        .home-service-card > span { margin-bottom: 1rem; }
        .home-service-card h3 { margin-bottom: .55rem; }
        .home-stats-section { padding-block: clamp(2rem, 5vw, 4rem); }
        .home-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }
        .home-stat-card {
          text-align: center;
          background:
            linear-gradient(180deg, rgba(59,130,246,.08), transparent),
            var(--bg-surface);
        }
        .home-stat-card strong {
          display: block;
          font-size: clamp(1.65rem, 3vw, 2.4rem);
          line-height: 1;
          color: var(--text-primary);
        }
        .home-stat-card span {
          display: block;
          margin-top: .7rem;
          color: var(--text-tertiary);
          font-weight: 800;
          font-size: .76rem;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .home-split-head {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          align-items: end;
          margin-bottom: 2rem;
        }
        .home-split-head .home-section-head { margin-bottom: 0; }
        .home-project-card {
          padding: 0;
          overflow: hidden;
        }
        .home-project-card__image {
          position: relative;
          display: block;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--bg-surface-2);
        }
        .home-project-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .35s ease;
        }
        .home-project-card:hover .home-project-card__image img { transform: scale(1.04); }
        .home-project-card__image span {
          position: absolute;
          left: .85rem; bottom: .85rem;
          padding: .32rem .65rem;
          border-radius: 999px;
          background: rgba(2,6,23,.78);
          color: white;
          font-size: .7rem;
          font-weight: 800;
          backdrop-filter: blur(12px);
        }
        .home-project-card__body { padding: 1.15rem; }
        .home-project-card h3 { margin-bottom: .5rem; }
        .home-project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: .4rem;
          margin-top: .9rem;
        }
        .home-project-card__tags span {
          padding: .25rem .55rem;
          border-radius: 999px;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-size: .68rem;
          font-weight: 700;
        }
        .home-project-card__links {
          display: flex;
          justify-content: space-between;
          gap: .75rem;
          margin-top: 1rem;
        }
        .home-project-card__links a {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          color: var(--accent-hover);
          font-size: .85rem;
          font-weight: 800;
        }
        .home-github-section {
          background:
            radial-gradient(circle at 18% 50%, rgba(59,130,246,.1), transparent 28%),
            linear-gradient(180deg, transparent, rgba(15,23,42,.34), transparent);
        }
        .home-github {
          display: grid;
          grid-template-columns: minmax(0, .75fr) minmax(320px, 1.1fr);
          gap: clamp(1.5rem, 5vw, 4rem);
          align-items: center;
        }
        .home-github__card {
          padding: 1rem;
          background: rgba(15,23,42,.68);
        }
        [data-theme="light"] .home-github__card { background: rgba(255,255,255,.82); }
        .home-github__card img {
          width: 100%;
          min-height: 190px;
          object-fit: contain;
        }
        .home-review-card {
          position: relative;
          min-height: 250px;
        }
        .home-review-card__quote {
          color: var(--accent-primary);
          opacity: .4;
          font-size: 1.4rem;
          margin-bottom: .85rem;
        }
        .home-review-card__stars {
          display: flex;
          gap: .25rem;
          color: var(--border-strong);
          margin-bottom: .8rem;
        }
        .home-review-card__stars .is-active { color: #f59e0b; }
        .home-review-card__user {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-top: 1.2rem;
        }
        .home-review-card__user > span {
          width: 38px; height: 38px;
          display: grid; place-items: center;
          border-radius: 999px;
          color: white;
          background: linear-gradient(135deg, var(--accent-primary), #38bdf8);
          font-weight: 900;
        }
        .home-review-card__user small {
          display: block;
          color: var(--text-tertiary);
          font-size: .76rem;
        }
        .home-empty {
          max-width: 520px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        .home-empty > svg {
          color: var(--accent-primary);
          font-size: 1.6rem;
          margin-bottom: .8rem;
        }
        .home-empty h3 {
          font-size: 1.25rem;
          margin-bottom: .4rem;
        }
        @keyframes home-float {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-14px,0); }
        }
        @media (max-width: 1080px) {
          .home-hero__inner,
          .home-about-mini__grid,
          .home-github {
            grid-template-columns: 1fr;
          }
          .home-hero__visual { min-height: 420px; order: -1; }
          .home-hero__content { max-width: 100%; }
          .home-skills, .home-services, .home-projects-grid, .home-reviews {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .home-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .home-hero { padding-top: 3.5rem; }
          .home-hero__visual { min-height: 340px; }
          .home-hero__photo-ring { width: min(330px, 92vw); }
          .home-about-mini__facts,
          .home-skills,
          .home-services,
          .home-projects-grid,
          .home-reviews,
          .home-stats {
            grid-template-columns: 1fr;
          }
          .home-split-head {
            display: block;
          }
          .home-split-head .home-text-link { margin-top: 1rem; }
          .home-hero h1 { font-size: clamp(3rem, 16vw, 4.8rem); }
          .home-hero__tech { display: none; }
        }
      `}</style>
    </>
  )
}
