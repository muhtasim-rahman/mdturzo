// About.jsx -- v2.3.0
// Full About page: all data from about.md visualized
// Sections: Hero Banner, Profile + Facts, Bio, Stats, Education Timeline,
//           Skills (tabbed), Tools, Languages, Values & Interests, Goals, Social, CTA

import { useEffect, useRef, useState } from 'react'
import { Link }              from 'react-router-dom'
import { Helmet }            from 'react-helmet-async'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'

// Solid icons
import {
  faLocationDot, faGraduationCap, faCode, faPalette, faVideo,
  faHeart, faLanguage, faLaptopCode, faArrowRight, faDownload,
  faEnvelope, faStar, faStarHalfStroke, faCircleCheck, faBullseye,
  faBrain, faRocket, faBookOpen, faBriefcase,
  faCalendarDays, faSchool, faLightbulb, faMedal, faAward,
  faChevronRight, faFire,
} from '@fortawesome/free-solid-svg-icons'

// Brand icons
import {
  faGithub, faFacebook, faInstagram, faYoutube, faXTwitter,
  faLinkedin, faTiktok, faTelegram,
} from '@fortawesome/free-brands-svg-icons'

import { SITE_CONFIG, calculateAge } from '../config/site.config.js'
import { useSiteSettings }           from '../hooks/useSiteSettings.js'
import { buildTitle, breadcrumbSchema } from '../utils/seo.js'
import { trackPage }                 from '../services/analytics.js'

// ── Animation Variants
const fadeUp    = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.55,ease:[.16,1,.3,1]}} }
const fadeLeft  = { hidden:{opacity:0,x:-24}, show:{opacity:1,x:0,transition:{duration:.55,ease:[.16,1,.3,1]}} }
const fadeRight = { hidden:{opacity:0,x:24},  show:{opacity:1,x:0,transition:{duration:.55,ease:[.16,1,.3,1]}} }

// ── Count-up Hook
function useCountUp(target, active) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const dur = 1400, t0 = performance.now()
    const tick = (now) => {
      const t = Math.min((now - t0) / dur, 1)
      const e = t < 0.5 ? 2*t*t : -1+(4-2*t)*t
      setVal(Math.round(e * target))
      if (t < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

// ── Star Rating
function StarRating({ rating }) {
  const full  = Math.floor(rating)
  const half  = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="abt-stars">
      {Array(full).fill(0).map((_,i)  => <FontAwesomeIcon key={`f${i}`} icon={faStar}            style={{color:'#F59E0B'}} />)}
      {half &&                            <FontAwesomeIcon key="h"        icon={faStarHalfStroke} style={{color:'#F59E0B'}} />}
      {Array(empty).fill(0).map((_,i) => <FontAwesomeIcon key={`e${i}`} icon={faStar}            style={{color:'var(--border-strong)'}} />)}
    </span>
  )
}

// ── Section Header
function SectionHeader({ label, title, subtitle }) {
  return (
    <motion.div className="abt-sh" initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}
      variants={{hidden:{},show:{transition:{staggerChildren:.07}}}}>
      <motion.p variants={fadeUp} className="section-label">{label}</motion.p>
      <motion.h2 variants={fadeUp} className="abt-sh-title">{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUp} className="abt-sh-sub">{subtitle}</motion.p>}
    </motion.div>
  )
}

// ── Stat Card
function StatCard({ icon, color, label, value, active }) {
  const num  = parseInt(value) || 0
  const plus = String(value).includes('+') ? '+' : ''
  const v    = useCountUp(num, active)
  return (
    <div className="abt-stat-card">
      <div className="abt-stat-icon" style={{background:`${color}18`,color}}><FontAwesomeIcon icon={icon}/></div>
      <p className="abt-stat-num" style={{color}}>{v}{plus}</p>
      <p className="abt-stat-lbl">{label}</p>
    </div>
  )
}

// ── Skill Badge
function SkillBadge({ text, color }) {
  return (
    <span className="abt-skill-badge" style={{borderColor:`${color}40`,color}}>
      <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:'.65rem'}}/>
      {text}
    </span>
  )
}

// ── Data
const EDUCATION = [
  { school:'St. Geroza School, Saidpur',              classes:'Nursery, KG',            years:'2013-2014', icon:faSchool,        color:'#A855F7' },
  { school:'St. Geroza School, Saidpur',              classes:'Class 1, 2, 3',          years:'2015-2017', icon:faSchool,        color:'#A855F7' },
  { school:'Tulshiram Govt. Primary School, Saidpur', classes:'Class 4, 5',             years:'2018-2019', icon:faSchool,        color:'#10B981' },
  { school:'Lions School & College, Saidpur',         classes:'Class 6',                years:'2020',      icon:faGraduationCap, color:'#F59E0B' },
  { school:'Saidpur Govt. Science College (SGSC)',    classes:'Class 6, 7, 8, 9, 10',  years:'2021-2025', icon:faGraduationCap, color:'#3B82F6' },
  { school:'Saidpur Govt. Science College (SGSC)',    classes:'SSC-26 (Currently)',     years:'2026',      icon:faAward,         color:'#EC4899', active:true },
]

const SKILL_TABS = [
  {
    id:'programming', label:'Programming', icon:faCode,
    skills:[
      { name:'AI Tools',     rating:4.5, color:'#10B981' },
      { name:'HTML',         rating:4,   color:'#F97316' },
      { name:'CSS',          rating:4,   color:'#3B82F6' },
      { name:'Git & GitHub', rating:4,   color:'#64748B' },
      { name:'Python',       rating:3,   color:'#EAB308' },
      { name:'JavaScript',   rating:2,   color:'#F59E0B' },
      { name:'Java',         rating:2,   color:'#EF4444' },
    ],
  },
  {
    id:'design', label:'Design', icon:faPalette, color:'#EC4899',
    badges:['Logo Design','Banner Design','Thumbnail Design','Business Card Design','Poster Design','Album / Book Design','HTML & CSS Design','Photo Editing'],
  },
  {
    id:'video', label:'Video Editing', icon:faVideo, color:'#A855F7',
    badges:['YouTube Video Editing','Facebook Video Editing','Ads & Commercials','Short Videos (Reels/Shorts)','Basic Animation Videos'],
  },
]

const TOOLS = [
  { name:'VS Code',           color:'#3B82F6', desc:'Primary code editor'              },
  { name:'GitHub',            color:'#64748B', desc:'Version control & project hosting' },
  { name:'Firebase',          color:'#F59E0B', desc:'Backend, Auth, Hosting, RTDB'     },
  { name:'Google Sheets API', color:'#10B981', desc:'Free cloud database for projects' },
  { name:'AI Tools',          color:'#6366F1', desc:'Claude, ChatGPT - coding & design'},
  { name:'Adobe Suite',       color:'#EC4899', desc:'Photo & graphic design'           },
  { name:'Browser DevTools',  color:'#94A3B8', desc:'Debugging & testing'             },
  { name:'Odoo Builder',      color:'#A855F7', desc:'Built old portfolio & SGSC site'  },
]

const LANGUAGES = [
  { name:'Bengali', level:'Native',        pct:100, color:'#10B981' },
  { name:'English', level:'Intermediate',  pct:65,  color:'#3B82F6' },
  { name:'Hindi',   level:'Conversational',pct:52,  color:'#F59E0B' },
  { name:'Urdu',    level:'Conversational',pct:42,  color:'#EC4899' },
]

const VALUES = [
  { icon:faHeart,    color:'#EC4899', title:'Islam First',          desc:'Islamic principles guide every decision - halal income, honest work, ethical practice.' },
  { icon:faFire,     color:'#F59E0B', title:'Discipline & Focus',   desc:'Structured routines, focused work sessions, productive habits every day.' },
  { icon:faBookOpen, color:'#3B82F6', title:'Beneficial Knowledge', desc:'Only learn what is practically useful - quality over quantity.' },
  { icon:faMedal,    color:'#10B981', title:'Honesty & Modesty',    desc:'Lets quality work speak for itself. Straightforward and transparent.' },
  { icon:faBullseye, color:'#A855F7', title:'Perfection',           desc:'Takes as much time as needed. Details matter deeply in every project.' },
  { icon:faLightbulb,color:'#F97316', title:'Self-Learning',        desc:'YouTube, docs, hands-on projects. Fully self-taught since 2023.' },
]

const INTERESTS = ['Prayer (Salah)','Programming & Coding','Outdoor Games','Cycling','Travelling','Reading Books','Learning New Things','Editing']

const GOALS = [
  { icon:faGraduationCap, color:'#3B82F6', phase:'Short-Term', timeframe:'2026',
    items:['Complete SSC-26 exam successfully','Launch new portfolio (mdturzo.web.app)','Continue improving JavaScript skills','Resume active learning journey'] },
  { icon:faBriefcase,     color:'#10B981', phase:'Mid-Term',   timeframe:'2026-2028',
    items:['Enroll in HSC with Science group','Learn advanced frameworks (React, Node.js)','Start freelancing - web dev & design','Build real client projects, halal income'] },
  { icon:faRocket,        color:'#A855F7', phase:'Long-Term',  timeframe:'2028+',
    items:['Study BSc in Computer Science & Engineering','Become a professional full-stack developer','Build ethical, beneficial technology','Establish own brand'] },
]

const SOCIALS = [
  { icon:faFacebook,  color:'#1877F2', label:'Facebook',  handle:'@mdturzo999',      url:'https://facebook.com/mdturzo999'       },
  { icon:faInstagram, color:'#E1306C', label:'Instagram', handle:'@mdturzo999',      url:'https://instagram.com/mdturzo999'      },
  { icon:faYoutube,   color:'#FF0000', label:'YouTube',   handle:'@mdturzo999',      url:'https://youtube.com/@mdturzo999'       },
  { icon:faXTwitter,  color:'#1DA1F2', label:'X/Twitter', handle:'@mdturzo999',      url:'https://twitter.com/mdturzo999'        },
  { icon:faLinkedin,  color:'#0A66C2', label:'LinkedIn',  handle:'@mdturzo999',      url:'https://linkedin.com/in/mdturzo999'    },
  { icon:faTiktok,    color:'#69C9D0', label:'TikTok',    handle:'@mdturzo16',       url:'https://tiktok.com/@mdturzo16'         },
  { icon:faTelegram,  color:'#26A5E4', label:'Telegram',  handle:'@mdturzo16',       url:'https://t.me/mdturzo16'               },
  { icon:faGithub,    color:'#94A3B8', label:'GitHub',    handle:'muhtasim-rahman',  url:'https://github.com/muhtasim-rahman'   },
]

// ── Main Component
export default function About() {
  const { settings, loading } = useSiteSettings()
  const age     = calculateAge()
  const [activeTab, setActiveTab] = useState('programming')
  const statsRef    = useRef(null)
  const statsInView = useInView(statsRef, { once:true, amount:.3 })

  useEffect(() => { trackPage('About') }, [])

  const breadcrumb = breadcrumbSchema([{ name:'Home', path:'/' }, { name:'About', path:'/about' }])
  const cvEnabled  = settings?.cvEnabled      ?? false
  const cvUrl      = settings?.cvUrl          ?? ''
  const available  = settings?.availableForWork ?? true
  const statsDev     = parseInt(settings?.statsYearsDev    ?? '3')
  const statsDesign  = parseInt(settings?.statsYearsDesign ?? '6')
  const statsProjects= parseInt(settings?.statsProjects    ?? '16')

  return (
    <>
      <Helmet>
        <title>{buildTitle('About Me')}</title>
        <meta name="description" content="Self-taught web developer and designer from Nilphamari, Bangladesh. Learn about Muhtasim Rahman's journey, skills, education, values, and goals." />
        <meta property="og:title"       content="About | Muhtasim Rahman" />
        <meta property="og:description" content="Learn about Muhtasim Rahman - his journey, skills, education, and future plans." />
        <meta property="og:image"       content={SITE_CONFIG.seo.defaultOGImage} />
        <meta name="keywords"           content="Muhtasim Rahman, Turzo, about, web developer, Bangladesh, SSC, education, skills" />
        <link rel="canonical"           href={`${SITE_CONFIG.siteURL}/about`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      {/* 1. BANNER */}
      <section className="abt-banner section">
        <div className="abt-banner-bg" aria-hidden="true">
          <div className="abt-orb abt-orb-1" />
          <div className="abt-orb abt-orb-2" />
          <div className="abt-dots" />
        </div>
        <div className="container-xl abt-banner-inner">
          <motion.div initial="hidden" animate="show" variants={{hidden:{},show:{transition:{staggerChildren:.09}}}}>
            <motion.nav variants={fadeUp} className="abt-breadcrumb">
              <Link to="/">Home</Link>
              <FontAwesomeIcon icon={faChevronRight} />
              <span>About</span>
            </motion.nav>
            <motion.p variants={fadeUp} className="section-label" style={{marginBottom:'1rem'}}>Get to know me</motion.p>
            <motion.h1 variants={fadeUp} className="abt-banner-title">
              About <span className="text-gradient">Muhtasim</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="abt-banner-sub">
              A dedicated student and self-taught developer from Nilphamari, Bangladesh - building meaningful
              digital experiences guided by discipline, faith, and a passion for code.
            </motion.p>
            <motion.div variants={fadeUp} className="abt-pills">
              {available && (
                <span className="abt-avail-badge">
                  <span className="abt-avail-dot" />
                  Available for work
                </span>
              )}
              <span className="abt-pill">Age {age}</span>
              <span className="abt-pill">
                <FontAwesomeIcon icon={faLocationDot} style={{fontSize:'.7rem'}}/>
                Nilphamari, Bangladesh
              </span>
              <span className="abt-pill">
                <FontAwesomeIcon icon={faGraduationCap} style={{fontSize:'.7rem'}}/>
                SSC-26 Batch
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROFILE + FACTS */}
      <section className="section section-alt" id="about-profile">
        <div className="container-xl">
          <div className="abt-profile-grid">
            {/* Photo column */}
            <motion.div className="abt-photo-wrap"
              initial={fadeLeft.hidden} whileInView={fadeLeft.show}
              viewport={{once:true,amount:.2}}>
              <div className="abt-photo-card">
                <div className="abt-photo-accent" aria-hidden="true"/>
                <div className="abt-photo-frame">
                  <div className="abt-photo-bg"/>
                  <img src="/muhtasim-about.webp" alt="Muhtasim Rahman" className="abt-photo-img"
                    onError={e=>{e.target.style.display='none'}}/>
                  <div className="abt-photo-caption">
                    <p className="abt-photo-name">{SITE_CONFIG.owner.displayName}</p>
                    <p className="abt-photo-meta">Age {age} &middot; Bangladesh</p>
                  </div>
                </div>
                <motion.div className="abt-float-badge abt-fb-tr"
                  animate={{y:[0,-7,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
                  <FontAwesomeIcon icon={faCode} style={{color:'#3B82F6'}}/>
                  <span>Developer</span>
                </motion.div>
                <motion.div className="abt-float-badge abt-fb-bl"
                  animate={{y:[0,7,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut',delay:.8}}>
                  <FontAwesomeIcon icon={faPalette} style={{color:'#EC4899'}}/>
                  <span>Designer</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Facts column */}
            <motion.div className="abt-facts-wrap"
              initial="hidden" whileInView="show"
              viewport={{once:true,amount:.15}}
              variants={{hidden:{},show:{transition:{staggerChildren:.09}}}}>

              <motion.p variants={fadeUp} className="section-label">Who I Am</motion.p>
              <motion.h2 variants={fadeUp} className="abt-facts-title">
                Self-taught developer<br/>
                <span className="text-gradient">from Bangladesh</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="abt-facts-bio">
                Hi, I'm <strong>{SITE_CONFIG.owner.displayName} (Turzo)</strong>, a {age}-year-old student
                and self-taught web developer from Nilphamari, Bangladesh. From childhood I've been fascinated
                by technology - originally dreaming of electrical engineering, now fully committed to Computer
                Science and web development.
              </motion.p>
              <motion.p variants={fadeUp} className="abt-facts-bio">
                I learn everything online - primarily through YouTube and hands-on projects. Currently
                preparing for HSC after completing SSC-26. All my work follows{' '}
                <strong>Islamic and ethical principles</strong>.
              </motion.p>

              <motion.div variants={fadeUp} className="abt-facts-grid">
                {[
                  { icon:faLocationDot,   color:'#3B82F6', label:'Location',   value:'Nilphamari, Bangladesh' },
                  { icon:faGraduationCap, color:'#10B981', label:'Status',     value:'Student - SSC-26 Batch' },
                  { icon:faLaptopCode,    color:'#F59E0B', label:'Goal',       value:'CSE Engineer & Developer' },
                  { icon:faLanguage,      color:'#EC4899', label:'Languages',  value:'Bengali, English, Hindi' },
                  { icon:faHeart,         color:'#A855F7', label:'Values',     value:'Islam, Discipline, Perfection' },
                  { icon:faCalendarDays,  color:'#F97316', label:'Experience', value:'3+ yrs dev, 6+ yrs design' },
                ].map(({icon,color,label,value}) => (
                  <div key={label} className="abt-fact-card">
                    <div className="abt-fact-icon" style={{background:`${color}18`,color}}>
                      <FontAwesomeIcon icon={icon}/>
                    </div>
                    <div>
                      <p className="abt-fact-label">{label}</p>
                      <p className="abt-fact-value">{value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="abt-facts-cta">
                <a href={`mailto:${SITE_CONFIG.owner.email}`} className="abt-btn abt-btn-primary">
                  <FontAwesomeIcon icon={faEnvelope}/>Contact Me
                </a>
                {cvEnabled && cvUrl
                  ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="abt-btn abt-btn-outline">
                      <FontAwesomeIcon icon={faDownload}/>Download CV
                    </a>
                  : <Link to="/contact" className="abt-btn abt-btn-outline">
                      <FontAwesomeIcon icon={faArrowRight}/>Let's Talk
                    </Link>
                }
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. STATS */}
      <section className="section" id="about-stats" ref={statsRef}>
        <div className="container-xl">
          <div className="abt-stats-grid">
            {loading ? (
              Array(4).fill(0).map((_,i) => (
                <div key={i} className="abt-stat-card">
                  <div className="sk" style={{width:44,height:44,borderRadius:'50%',margin:'0 auto .75rem'}}/>
                  <div className="sk" style={{width:60,height:28,borderRadius:6,margin:'0 auto .5rem'}}/>
                  <div className="sk" style={{width:80,height:12,borderRadius:4,margin:'0 auto'}}/>
                </div>
              ))
            ) : (
              <>
                <StatCard icon={faCode}       color="#3B82F6" label="Years Web Dev"      value={`${statsDev}+`}      active={statsInView}/>
                <StatCard icon={faPalette}    color="#EC4899" label="Years Design"        value={`${statsDesign}+`}   active={statsInView}/>
                <StatCard icon={faVideo}      color="#A855F7" label="Years Video Editing" value="5+"                  active={statsInView}/>
                <StatCard icon={faLaptopCode} color="#10B981" label="Projects Built"      value={`${statsProjects}+`} active={statsInView}/>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. MY STORY */}
      <section className="section section-alt" id="about-story">
        <div className="container-xl">
          <SectionHeader label="My Story" title="From curiosity to code"
            subtitle="In my own words - a brief look at who I am and what I believe in."/>
          <motion.div className="abt-story-grid"
            initial="hidden" whileInView="show"
            viewport={{once:true,amount:.15}}
            variants={{hidden:{},show:{transition:{staggerChildren:.1}}}}>

            <motion.blockquote variants={fadeLeft} className="abt-story-quote">
              <div className="abt-qmark" aria-hidden="true">&ldquo;</div>
              <p>My name is Muhtasim Rahman, and I am a student at Saidpur Govt. Science College.
                I possess a strong passion for programming and web development. I am actively mastering
                HTML, CSS, Java, and expanding into Python and JavaScript to prepare for a future in
                computer science. With over four years of experience in logo, banner, and photo editing,
                as well as specialized skills in video editing, I adeptly blend technical expertise
                with a creative flair.</p>
              <p style={{marginTop:'1rem'}}>When working on my projects, I aim to develop impactful
                websites that seamlessly combine functionality with captivating design. My objective is
                to push boundaries in the digital space while adhering to{' '}
                <em>ethical and Halal principles</em> in all my work.</p>
              <footer className="abt-story-footer">- Muhtasim Rahman (Turzo)</footer>
            </motion.blockquote>

            <motion.div variants={fadeRight} className="abt-story-details">
              {[
                { title:'The Beginning', text:'From childhood, fascinated by technical things. Originally wanted to be an electrical engineer - later redirected that passion toward Computer Science and web development.' },
                { title:'The Journey',   text:'Fully self-taught through YouTube tutorials, online resources, and hands-on project building. Started with HTML/CSS in 2023 and progressively tackled more complex tools and frameworks.' },
                { title:'Right Now',     text:'SSC-26 exam completed. Building this portfolio. Resuming the learning journey with JavaScript, React, and backend development - with Islamic principles at the centre.' },
                { title:'The Mission',   text:'Create useful, beneficial technology for people. Build a halal freelancing career. Pursue a CSE degree and eventually establish my own brand. Quality and honesty over everything.' },
              ].map(({ title, text }) => (
                <div key={title} className="abt-story-card">
                  <h3 className="abt-story-card-title">{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. EDUCATION TIMELINE */}
      <section className="section" id="about-education">
        <div className="container-xl">
          <SectionHeader label="Education" title="My Academic Journey"
            subtitle="From nursery to SSC-26 - a complete educational timeline."/>
          <div className="abt-timeline">
            {EDUCATION.map((item, i) => (
              <motion.div key={i}
                className={`abt-tl-item${item.active?' abt-tl-item--active':''}`}
                initial={fadeUp.hidden} whileInView={fadeUp.show}
                viewport={{once:true,amount:.2}}
                transition={{delay:i*.07}}>
                <div className="abt-tl-dot" style={{borderColor:item.color,background:`${item.color}20`}}>
                  <FontAwesomeIcon icon={item.icon} style={{color:item.color,fontSize:'.7rem'}}/>
                </div>
                <div className="abt-tl-card">
                  {item.active && <span className="abt-tl-badge">Current</span>}
                  <p className="abt-tl-year" style={{color:item.color}}>{item.years}</p>
                  <h3 className="abt-tl-school">{item.school}</h3>
                  <p className="abt-tl-class">{item.classes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SKILLS */}
      <section className="section section-alt" id="about-skills">
        <div className="container-xl">
          <SectionHeader label="Skills & Expertise" title="What I bring to the table"
            subtitle="Programming, design, and video - three creative disciplines combined."/>

          <motion.div className="abt-tab-row"
            initial={fadeUp.hidden} whileInView={fadeUp.show}
            viewport={{once:true,amount:.2}}>
            {SKILL_TABS.map(tab => (
              <button key={tab.id}
                className={`abt-tab-btn${activeTab===tab.id?' abt-tab-btn--active':''}`}
                onClick={() => setActiveTab(tab.id)}>
                <FontAwesomeIcon icon={tab.icon}/>
                {tab.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {SKILL_TABS.map(tab => activeTab === tab.id && (
              <motion.div key={tab.id}
                initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                transition={{duration:.3,ease:[.16,1,.3,1]}}
                className="abt-skill-panel">
                {tab.skills ? (
                  <div className="abt-prog-grid">
                    {tab.skills.map(s => (
                      <div key={s.name} className="abt-prog-row">
                        <div className="abt-prog-meta">
                          <span className="abt-prog-name">{s.name}</span>
                          <StarRating rating={s.rating}/>
                        </div>
                        <div className="abt-prog-track">
                          <motion.div className="abt-prog-fill" style={{background:s.color}}
                            initial={{width:0}}
                            whileInView={{width:`${(s.rating/5)*100}%`}}
                            viewport={{once:true}}
                            transition={{duration:.8,ease:[.16,1,.3,1]}}/>
                        </div>
                      </div>
                    ))}
                    <div className="abt-prog-note">
                      <FontAwesomeIcon icon={faBrain} style={{color:'var(--accent-primary)'}}/>
                      <span>Self-rated as of April 2026 - learning stage, actively improving.</span>
                    </div>
                  </div>
                ) : (
                  <div className="abt-badge-wrap">
                    {tab.badges.map(b => <SkillBadge key={b} text={b} color={tab.color}/>)}
                    <p className="abt-badge-note">
                      <FontAwesomeIcon icon={faAward} style={{color:tab.color}}/>
                      {tab.id==='design'
                        ? `${statsDesign}+ years of design experience. Some skills are at commercial quality.`
                        : `5+ years of video editing experience. Covers YouTube, social media, and commercials.`}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div className="abt-learning-row"
            initial={fadeUp.hidden} whileInView={fadeUp.show}
            viewport={{once:true,amount:.2}}>
            <p className="abt-learning-lbl">
              <FontAwesomeIcon icon={faBrain}/>Currently learning:
            </p>
            {['TypeScript','Next.js','Node.js','Advanced React'].map(item => (
              <span key={item} className="abt-learning-tag">{item}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. TOOLS */}
      <section className="section" id="about-tools">
        <div className="container-xl">
          <SectionHeader label="Tools & Platforms" title="My workspace"
            subtitle="The software and services that power every project I build."/>
          <motion.div className="abt-tools-grid"
            initial="hidden" whileInView="show"
            viewport={{once:true,amount:.15}}
            variants={{hidden:{},show:{transition:{staggerChildren:.06}}}}>
            {TOOLS.map(tool => (
              <motion.div key={tool.name} variants={fadeUp} className="abt-tool-card">
                <div className="abt-tool-dot" style={{background:tool.color}}/>
                <div>
                  <p className="abt-tool-name">{tool.name}</p>
                  <p className="abt-tool-desc">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. LANGUAGES */}
      <section className="section section-alt" id="about-languages">
        <div className="container-xl" style={{maxWidth:640}}>
          <SectionHeader label="Language Proficiency" title="Languages I speak"/>
          <motion.div className="abt-lang-list"
            initial="hidden" whileInView="show"
            viewport={{once:true,amount:.2}}
            variants={{hidden:{},show:{transition:{staggerChildren:.08}}}}>
            {LANGUAGES.map(lang => (
              <motion.div key={lang.name} variants={fadeUp}>
                <div className="abt-lang-meta">
                  <span className="abt-lang-name">{lang.name}</span>
                  <span className="abt-lang-level" style={{color:lang.color}}>{lang.level}</span>
                </div>
                <div className="abt-lang-track">
                  <motion.div className="abt-lang-fill" style={{background:lang.color}}
                    initial={{width:0}}
                    whileInView={{width:`${lang.pct}%`}}
                    viewport={{once:true}}
                    transition={{duration:.9,ease:[.16,1,.3,1]}}/>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. VALUES & INTERESTS */}
      <section className="section" id="about-values">
        <div className="container-xl">
          <SectionHeader label="Personality & Values" title="What drives me"
            subtitle="Core principles and personal interests that shape how I live and work."/>
          <motion.div className="abt-values-grid"
            initial="hidden" whileInView="show"
            viewport={{once:true,amount:.1}}
            variants={{hidden:{},show:{transition:{staggerChildren:.07}}}}>
            {VALUES.map(v => (
              <motion.div key={v.title} variants={fadeUp} className="abt-value-card">
                <div className="abt-value-icon" style={{background:`${v.color}16`,color:v.color}}>
                  <FontAwesomeIcon icon={v.icon}/>
                </div>
                <h3 className="abt-value-title">{v.title}</h3>
                <p className="abt-value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="abt-interests-row"
            initial={fadeUp.hidden} whileInView={fadeUp.show}
            viewport={{once:true,amount:.2}}>
            <p className="abt-interests-lbl">
              <FontAwesomeIcon icon={faHeart} style={{color:'#EC4899'}}/>Hobbies & Interests:
            </p>
            <div className="abt-interests-tags">
              {INTERESTS.map(item => <span key={item} className="abt-interest-tag">{item}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. GOALS */}
      <section className="section section-alt" id="about-goals">
        <div className="container-xl">
          <SectionHeader label="Goals & Future Plans" title="Where I'm headed"
            subtitle="Short, mid, and long-term milestones on the road to becoming a full-stack developer."/>
          <motion.div className="abt-goals-grid"
            initial="hidden" whileInView="show"
            viewport={{once:true,amount:.1}}
            variants={{hidden:{},show:{transition:{staggerChildren:.1}}}}>
            {GOALS.map((goal, i) => (
              <motion.div key={goal.phase} variants={fadeUp} className="abt-goal-card">
                <div className="abt-goal-header">
                  <div className="abt-goal-icon" style={{background:`${goal.color}18`,color:goal.color}}>
                    <FontAwesomeIcon icon={goal.icon}/>
                  </div>
                  <div>
                    <p className="abt-goal-phase" style={{color:goal.color}}>{goal.phase}</p>
                    <p className="abt-goal-time">{goal.timeframe}</p>
                  </div>
                </div>
                <ul className="abt-goal-list">
                  {goal.items.map(item => (
                    <li key={item} className="abt-goal-item">
                      <FontAwesomeIcon icon={faCircleCheck} style={{color:goal.color,fontSize:'.75rem',flexShrink:0,marginTop:'.15rem'}}/>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="abt-goal-bar" style={{background:`${goal.color}18`}}>
                  <div className="abt-goal-bar-fill" style={{background:goal.color,width:i===0?'75%':i===1?'35%':'10%'}}/>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 11. SOCIAL LINKS */}
      <section className="section" id="about-social">
        <div className="container-xl">
          <SectionHeader label="Connect With Me" title="Find me online"
            subtitle="I'm active on these platforms - feel free to reach out or follow along."/>
          <motion.div className="abt-social-grid"
            initial="hidden" whileInView="show"
            viewport={{once:true,amount:.15}}
            variants={{hidden:{},show:{transition:{staggerChildren:.06}}}}>
            {SOCIALS.map(s => (
              <motion.a key={s.label} href={s.url}
                target="_blank" rel="noopener noreferrer"
                variants={fadeUp}
                className="abt-social-card"
                style={{'--sc':s.color}}>
                <FontAwesomeIcon icon={s.icon} className="abt-social-icon" style={{color:s.color}}/>
                <div>
                  <p className="abt-social-platform">{s.label}</p>
                  <p className="abt-social-handle">{s.handle}</p>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className="abt-social-arrow"/>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 12. CTA */}
      <section className="section section-alt" id="about-cta">
        <div className="container-xl">
          <motion.div className="abt-cta-card"
            initial={fadeUp.hidden} whileInView={fadeUp.show}
            viewport={{once:true,amount:.3}}>
            <div className="abt-cta-bg" aria-hidden="true">
              <div className="abt-cta-orb abt-cta-orb-1"/>
              <div className="abt-cta-orb abt-cta-orb-2"/>
            </div>
            <div className="abt-cta-content">
              <p className="section-label">Let's Work Together</p>
              <h2 className="abt-cta-title">Have a project in mind?</h2>
              <p className="abt-cta-sub">
                I'm open to web development and design collaborations that align with ethical and halal principles.
                Drop a message and let's build something meaningful together.
              </p>
              <div className="abt-cta-btns">
                <Link to="/contact" className="abt-btn abt-btn-primary">
                  <FontAwesomeIcon icon={faEnvelope}/>Contact Me
                </Link>
                <Link to="/projects" className="abt-btn abt-btn-outline">
                  <FontAwesomeIcon icon={faLaptopCode}/>View Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        /* ── Banner */
        .abt-banner{position:relative;overflow:hidden;padding-block:clamp(5rem,14vw,9rem) clamp(3rem,8vw,5rem)}
        .abt-banner-bg{position:absolute;inset:0;pointer-events:none}
        .abt-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.18}
        .abt-orb-1{width:500px;height:500px;background:var(--accent-primary);top:-200px;right:-150px}
        .abt-orb-2{width:350px;height:350px;background:#A855F7;bottom:-100px;left:-100px}
        .abt-dots{position:absolute;inset:0;background-image:radial-gradient(var(--border-strong) 1px,transparent 1px);background-size:28px 28px;opacity:.22}
        .abt-banner-inner{position:relative;max-width:680px}
        .abt-banner-title{font-size:clamp(2.5rem,6vw,4.5rem);font-family:var(--font-display);font-weight:900;line-height:1.05;letter-spacing:-.04em;margin-bottom:1rem;color:var(--text-primary)}
        .abt-banner-sub{font-size:clamp(.95rem,2vw,1.1rem);color:var(--text-secondary);line-height:1.7;max-width:560px;margin-bottom:2rem}
        .abt-pills{display:flex;flex-wrap:wrap;gap:.625rem;align-items:center}
        .abt-pill{display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .85rem;border-radius:9999px;font-size:.75rem;font-weight:500;border:1px solid var(--border-strong);color:var(--text-secondary);background:var(--bg-surface)}
        .abt-avail-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem .85rem;border-radius:9999px;font-size:.75rem;font-weight:600;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#22C55E}
        .abt-avail-dot{width:7px;height:7px;border-radius:50%;background:#22C55E;animation:abt-pulse 2s ease-in-out infinite}
        @keyframes abt-pulse{0%,100%{opacity:1}50%{opacity:.4}}

        .abt-breadcrumb{display:inline-flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--text-tertiary);margin-bottom:1.25rem}
        .abt-breadcrumb a{color:var(--accent-primary)}
        .abt-breadcrumb svg{font-size:.55rem;opacity:.6}

        /* ── Section Header */
        .abt-sh{margin-bottom:2.5rem}
        .abt-sh-title{font-size:clamp(1.7rem,3.5vw,2.5rem);font-family:var(--font-display);font-weight:800;letter-spacing:-.03em;color:var(--text-primary);margin-bottom:.5rem}
        .abt-sh-sub{font-size:.9rem;color:var(--text-secondary);max-width:520px;line-height:1.7}

        /* ── Profile */
        .abt-profile-grid{display:grid;grid-template-columns:1fr;gap:3rem;align-items:start}
        @media(min-width:900px){.abt-profile-grid{grid-template-columns:auto 1fr;gap:4rem;align-items:center}}
        .abt-photo-wrap{display:flex;justify-content:center}
        .abt-photo-card{position:relative;width:290px}
        @media(min-width:900px){.abt-photo-card{width:310px}}
        .abt-photo-accent{position:absolute;inset:0;translate:12px 12px;border-radius:20px;border:2px solid var(--accent-primary);opacity:.2}
        .abt-photo-frame{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:3/4;border:1px solid var(--border-strong);background:var(--bg-surface-2);box-shadow:var(--shadow-xl)}
        .abt-photo-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0F172A,#1E293B 60%,#1E3A8A)}
        .abt-photo-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .abt-photo-caption{position:absolute;bottom:1rem;left:1rem}
        .abt-photo-name{color:#fff;font-weight:700;font-family:var(--font-display);font-size:.9rem}
        .abt-photo-meta{color:rgba(255,255,255,.6);font-size:.72rem;margin-top:.2rem}
        .abt-float-badge{position:absolute;display:flex;align-items:center;gap:.4rem;padding:.4rem .85rem;border-radius:9999px;font-size:.72rem;font-weight:600;background:var(--bg-elevated);border:1px solid var(--border-strong);color:var(--text-primary);box-shadow:var(--shadow-md);white-space:nowrap}
        .abt-fb-tr{right:-1rem;top:3rem}
        .abt-fb-bl{left:-1rem;bottom:4rem}
        .abt-facts-title{font-size:clamp(1.6rem,3.5vw,2.4rem);font-family:var(--font-display);font-weight:800;line-height:1.15;letter-spacing:-.03em;color:var(--text-primary);margin-bottom:1rem}
        .abt-facts-bio{font-size:.9rem;color:var(--text-secondary);line-height:1.75;margin-bottom:.75rem}
        .abt-facts-bio strong{color:var(--text-primary)}
        .abt-facts-grid{display:grid;grid-template-columns:1fr 1fr;gap:.625rem;margin-top:.5rem}
        @media(max-width:480px){.abt-facts-grid{grid-template-columns:1fr}}
        .abt-fact-card{display:flex;align-items:start;gap:.625rem;padding:.75rem;border-radius:8px;background:var(--bg-surface);border:1px solid var(--border-color);transition:border-color .15s}
        .abt-fact-card:hover{border-color:var(--accent-primary)}
        .abt-fact-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.8rem}
        .abt-fact-label{font-size:.65rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-tertiary);font-weight:600}
        .abt-fact-value{font-size:.78rem;color:var(--text-secondary);margin-top:.15rem}
        .abt-facts-cta{display:flex;gap:.875rem;flex-wrap:wrap;margin-top:1rem}

        /* ── Buttons */
        .abt-btn{display:inline-flex;align-items:center;gap:.55rem;padding:.7rem 1.5rem;border-radius:9999px;font-size:.88rem;font-weight:700;cursor:pointer;transition:all .15s;border:2px solid transparent;text-decoration:none}
        .abt-btn-primary{background:var(--accent-primary);color:#fff;border-color:var(--accent-primary)}
        .abt-btn-primary:hover{background:var(--accent-hover);border-color:var(--accent-hover)}
        .abt-btn-outline{background:transparent;color:var(--text-primary);border-color:var(--border-strong)}
        .abt-btn-outline:hover{border-color:var(--accent-primary);color:var(--accent-primary)}
        .abt-btn:active{transform:scale(.97)}

        /* ── Stats */
        .abt-stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
        @media(min-width:640px){.abt-stats-grid{grid-template-columns:repeat(4,1fr)}}
        .abt-stat-card{padding:1.5rem 1rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);text-align:center}
        .abt-stat-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;font-size:1rem}
        .abt-stat-num{font-size:2rem;font-family:var(--font-display);font-weight:900;line-height:1}
        .abt-stat-lbl{font-size:.72rem;color:var(--text-tertiary);margin-top:.35rem;text-transform:uppercase;letter-spacing:.06em}

        /* ── Story */
        .abt-story-grid{display:grid;grid-template-columns:1fr;gap:2rem;margin-top:1.5rem}
        @media(min-width:860px){.abt-story-grid{grid-template-columns:1fr 1fr;gap:3rem}}
        .abt-story-quote{position:relative;padding:2rem 2rem 1.5rem;border-radius:16px;background:var(--bg-surface);border:1px solid var(--border-color);border-left:4px solid var(--accent-primary)}
        .abt-qmark{position:absolute;top:.5rem;right:1.25rem;font-size:5rem;font-family:Georgia,serif;line-height:1;color:var(--accent-primary);opacity:.1;user-select:none;pointer-events:none}
        .abt-story-quote p{font-size:.9rem;color:var(--text-secondary);line-height:1.8;font-style:italic}
        .abt-story-footer{margin-top:1.25rem;font-size:.78rem;color:var(--text-tertiary);font-style:normal}
        .abt-story-details{display:flex;flex-direction:column;gap:.875rem}
        .abt-story-card{padding:1.125rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color)}
        .abt-story-card-title{font-size:.85rem;font-weight:700;color:var(--accent-primary);margin-bottom:.4rem;font-family:var(--font-display)}
        .abt-story-card p{font-size:.82rem;color:var(--text-secondary);line-height:1.7}

        /* ── Education Timeline */
        .abt-timeline{position:relative;padding-left:2.5rem;display:flex;flex-direction:column}
        .abt-timeline::before{content:'';position:absolute;left:.9rem;top:1rem;bottom:1rem;width:2px;background:linear-gradient(to bottom,var(--accent-primary),transparent);opacity:.3}
        .abt-tl-item{position:relative;padding-bottom:2rem;padding-left:1.5rem}
        .abt-tl-item:last-child{padding-bottom:0}
        .abt-tl-dot{position:absolute;left:-1.6rem;top:.25rem;width:32px;height:32px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;background:var(--bg-page);z-index:1}
        .abt-tl-card{padding:1.125rem 1.25rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);transition:border-color .15s;position:relative}
        .abt-tl-card:hover{border-color:var(--accent-primary)}
        .abt-tl-item--active .abt-tl-card{border-color:rgba(59,130,246,.4);background:rgba(59,130,246,.04)}
        .abt-tl-badge{position:absolute;top:.75rem;right:.75rem;padding:.2rem .6rem;border-radius:9999px;font-size:.65rem;font-weight:700;text-transform:uppercase;background:var(--accent-primary);color:#fff;letter-spacing:.06em}
        .abt-tl-year{font-size:.72rem;font-weight:600;margin-bottom:.3rem;letter-spacing:.05em;font-family:var(--font-mono)}
        .abt-tl-school{font-size:.95rem;font-weight:700;color:var(--text-primary);margin-bottom:.2rem;font-family:var(--font-display)}
        .abt-tl-class{font-size:.8rem;color:var(--text-tertiary)}

        /* ── Skills Tabs */
        .abt-tab-row{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.75rem}
        .abt-tab-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem 1.1rem;border-radius:9999px;font-size:.8rem;font-weight:600;border:1px solid var(--border-strong);color:var(--text-secondary);background:var(--bg-surface);cursor:pointer;transition:all .15s}
        .abt-tab-btn:hover{border-color:var(--accent-primary);color:var(--accent-primary)}
        .abt-tab-btn--active{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff}
        .abt-skill-panel{min-height:260px}
        .abt-prog-grid{display:flex;flex-direction:column;gap:1.125rem}
        .abt-prog-row{display:flex;flex-direction:column;gap:.375rem}
        .abt-prog-meta{display:flex;justify-content:space-between;align-items:center}
        .abt-prog-name{font-size:.85rem;font-weight:600;color:var(--text-primary)}
        .abt-stars{display:inline-flex;gap:2px;font-size:.72rem}
        .abt-prog-track{height:7px;border-radius:9999px;background:var(--bg-surface-2);overflow:hidden}
        .abt-prog-fill{height:100%;border-radius:9999px}
        .abt-prog-note{display:flex;align-items:start;gap:.5rem;font-size:.75rem;color:var(--text-tertiary);padding:.75rem;border-radius:8px;background:var(--bg-surface);border:1px solid var(--border-color);margin-top:.5rem}
        .abt-badge-wrap{display:flex;flex-wrap:wrap;gap:.625rem}
        .abt-skill-badge{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem .9rem;border-radius:9999px;font-size:.78rem;font-weight:600;border:1px solid}
        .abt-badge-note{width:100%;display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--text-tertiary);margin-top:.5rem}
        .abt-learning-row{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;padding:1rem 1.25rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);margin-top:1.75rem}
        .abt-learning-lbl{font-size:.8rem;font-weight:600;color:var(--accent-primary);display:flex;align-items:center;gap:.45rem}
        .abt-learning-tag{padding:.25rem .75rem;border-radius:9999px;font-size:.73rem;font-weight:600;background:var(--accent-light);color:var(--accent-primary);border:1px solid rgba(59,130,246,.2)}

        /* ── Tools */
        .abt-tools-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.875rem}
        @media(min-width:640px){.abt-tools-grid{grid-template-columns:repeat(4,1fr)}}
        .abt-tool-card{display:flex;align-items:start;gap:.75rem;padding:1rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);transition:border-color .15s}
        .abt-tool-card:hover{border-color:var(--accent-primary)}
        .abt-tool-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:.3rem}
        .abt-tool-name{font-size:.85rem;font-weight:700;color:var(--text-primary);margin-bottom:.25rem;font-family:var(--font-display)}
        .abt-tool-desc{font-size:.73rem;color:var(--text-tertiary);line-height:1.5}

        /* ── Languages */
        .abt-lang-list{display:flex;flex-direction:column;gap:1.25rem}
        .abt-lang-meta{display:flex;justify-content:space-between;margin-bottom:.5rem}
        .abt-lang-name{font-size:.9rem;font-weight:700;color:var(--text-primary)}
        .abt-lang-level{font-size:.75rem;font-weight:600}
        .abt-lang-track{height:8px;border-radius:9999px;background:var(--bg-surface-2);overflow:hidden}
        .abt-lang-fill{height:100%;border-radius:9999px}

        /* ── Values */
        .abt-values-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
        @media(min-width:768px){.abt-values-grid{grid-template-columns:repeat(3,1fr)}}
        .abt-value-card{padding:1.25rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);transition:border-color .15s}
        .abt-value-card:hover{border-color:var(--accent-primary)}
        .abt-value-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;font-size:.9rem}
        .abt-value-title{font-size:.88rem;font-weight:700;color:var(--text-primary);margin-bottom:.4rem;font-family:var(--font-display)}
        .abt-value-desc{font-size:.78rem;color:var(--text-secondary);line-height:1.65}
        .abt-interests-row{display:flex;flex-direction:column;gap:.75rem;padding:1.25rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);margin-top:1.5rem}
        @media(min-width:600px){.abt-interests-row{flex-direction:row;align-items:center}}
        .abt-interests-lbl{font-size:.82rem;font-weight:700;color:var(--text-primary);display:flex;align-items:center;gap:.45rem;white-space:nowrap}
        .abt-interests-tags{display:flex;flex-wrap:wrap;gap:.5rem}
        .abt-interest-tag{padding:.3rem .75rem;border-radius:9999px;font-size:.72rem;font-weight:500;background:var(--bg-surface-2);border:1px solid var(--border-strong);color:var(--text-secondary)}

        /* ── Goals */
        .abt-goals-grid{display:grid;grid-template-columns:1fr;gap:1.25rem}
        @media(min-width:720px){.abt-goals-grid{grid-template-columns:repeat(3,1fr)}}
        .abt-goal-card{padding:1.5rem;border-radius:16px;background:var(--bg-surface);border:1px solid var(--border-color);display:flex;flex-direction:column;gap:1.125rem}
        .abt-goal-header{display:flex;align-items:center;gap:.875rem}
        .abt-goal-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
        .abt-goal-phase{font-size:.8rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
        .abt-goal-time{font-size:.72rem;color:var(--text-tertiary);font-family:var(--font-mono)}
        .abt-goal-list{list-style:none;display:flex;flex-direction:column;gap:.65rem;flex:1}
        .abt-goal-item{display:flex;align-items:start;gap:.6rem;font-size:.8rem;color:var(--text-secondary);line-height:1.5}
        .abt-goal-bar{height:5px;border-radius:9999px;overflow:hidden;margin-top:auto}
        .abt-goal-bar-fill{height:100%;border-radius:9999px;transition:width 1s ease}

        /* ── Social */
        .abt-social-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.875rem}
        @media(min-width:580px){.abt-social-grid{grid-template-columns:repeat(4,1fr)}}
        .abt-social-card{display:flex;align-items:center;gap:.875rem;padding:1rem;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-color);text-decoration:none;transition:all .15s}
        .abt-social-card:hover{border-color:var(--sc,var(--accent-primary));transform:translateY(-2px);box-shadow:var(--shadow-md)}
        .abt-social-icon{font-size:1.2rem;flex-shrink:0}
        .abt-social-platform{font-size:.8rem;font-weight:700;color:var(--text-primary)}
        .abt-social-handle{font-size:.7rem;color:var(--text-tertiary);margin-top:.1rem}
        .abt-social-arrow{margin-left:auto;font-size:.7rem;color:var(--text-tertiary);opacity:.5}

        /* ── CTA */
        .abt-cta-card{position:relative;overflow:hidden;padding:clamp(2.5rem,6vw,4rem);border-radius:24px;background:var(--bg-surface);border:1px solid var(--border-color);text-align:center}
        .abt-cta-bg{position:absolute;inset:0;pointer-events:none}
        .abt-cta-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.12}
        .abt-cta-orb-1{width:300px;height:300px;background:var(--accent-primary);top:-100px;left:-80px}
        .abt-cta-orb-2{width:250px;height:250px;background:#A855F7;bottom:-80px;right:-60px}
        .abt-cta-content{position:relative}
        .abt-cta-title{font-size:clamp(1.6rem,3.5vw,2.5rem);font-family:var(--font-display);font-weight:800;letter-spacing:-.03em;color:var(--text-primary);margin:.5rem 0 1rem}
        .abt-cta-sub{font-size:.9rem;color:var(--text-secondary);max-width:480px;margin:0 auto 2rem;line-height:1.7}
        .abt-cta-btns{display:flex;gap:.875rem;justify-content:center;flex-wrap:wrap}

        /* ── Light mode overrides */
        [data-theme="light"] .abt-dots{opacity:.15}
        [data-theme="light"] .abt-photo-bg{background:linear-gradient(135deg,#E2E8F0,#CBD5E1 60%,#BFDBFE)}
        [data-theme="light"] .abt-timeline::before{opacity:.2}
      `}</style>
    </>
  )
}
