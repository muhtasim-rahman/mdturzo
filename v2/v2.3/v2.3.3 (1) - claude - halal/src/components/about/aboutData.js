// ============================================================
// aboutData.js — v2.3.3
// All shared data constants for About page sections.
// Import from here; never duplicate data across section files.
// v2.3.3: Social icons now reference /icons/social/*.svg (renamed files)
// ============================================================

import {
  faLocationDot, faGraduationCap, faCode, faPalette, faVideo,
  faBrain, faMosque, faDumbbell, faBicycle, faBook, faCamera,
  faLaptopCode, faRocket, faFlag, faBullseye, faMountain,
  faHandshake, faShield, faMedal, faGears, faTerminal,
  faSeedling, faUsers, faClock, faEnvelope, faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub, faLinkedin, faFacebook, faInstagram,
  faTelegram, faYoutube, faXTwitter, faTiktok, faThreads,
} from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

// ── Education ─────────────────────────────────────────────────
export const EDUCATION = [
  { period: '2013 – 2014', school: 'St. Geroza School, Saidpur',            level: 'Nursery & KG',       desc: 'First steps in formal education.',                                           color: '#10B981' },
  { period: '2015 – 2017', school: 'St. Geroza School, Saidpur',            level: 'Class 1, 2 & 3',     desc: 'Primary education. Developed curiosity for technology and reading.',          color: '#3B82F6' },
  { period: '2018 – 2019', school: 'Tulshiram Govt. Primary School',         level: 'Class 4 & 5',        desc: 'Completed primary cycle. Top student in science subjects.',                   color: '#8B5CF6' },
  { period: '2020',        school: 'Lions School & College, Saidpur',        level: 'Class 6',            desc: 'Briefly enrolled before transitioning to SGSC.',                              color: '#F59E0B' },
  { period: '2021 – 2025', school: 'Saidpur Govt. Science College (SGSC)',   level: 'Class 6 – 10',       desc: 'Science group. Deepened interest in programming and web development.',        color: '#EC4899' },
  { period: '2026',        school: 'Saidpur Govt. Science College (SGSC)',   level: 'SSC-26',             desc: 'SSC exam in progress (mid-2026). Goal: HSC → CSE degree.', color: '#3B82F6', current: true },
]

// ── Skills ────────────────────────────────────────────────────
export const DEV_SKILLS = [
  { name: 'AI Tools & Workflows', pct: 90, color: '#10B981', note: 'Coding, design, planning'   },
  { name: 'HTML',                  pct: 80, color: '#F97316', note: 'Semantic markup, layouts'   },
  { name: 'CSS',                   pct: 80, color: '#3B82F6', note: 'Animations, responsive'     },
  { name: 'Git & GitHub',          pct: 78, color: '#64748B', note: 'Version control'            },
  { name: 'Python',                pct: 60, color: '#EAB308', note: 'Scripting, learning'        },
  { name: 'JavaScript',            pct: 45, color: '#F59E0B', note: 'Improving daily'            },
  { name: 'Java',                  pct: 35, color: '#EC4899', note: 'Basic knowledge'            },
]

export const DESIGN_SKILLS = [
  { name: 'Logo Design',         pct: 80, color: '#EC4899', icon: faPalette   },
  { name: 'Banner Design',       pct: 75, color: '#8B5CF6', icon: faPalette   },
  { name: 'Thumbnail Design',    pct: 78, color: '#3B82F6', icon: faCamera    },
  { name: 'Business Card',       pct: 70, color: '#10B981', icon: faHandshake },
  { name: 'Poster Design',       pct: 72, color: '#F59E0B', icon: faGlobe     },
  { name: 'Album / Book Design', pct: 65, color: '#F97316', icon: faBook      },
  { name: 'HTML & CSS Design',   pct: 75, color: '#06B6D4', icon: faCode      },
]

export const VIDEO_SKILLS = [
  { name: 'YouTube Videos',              pct: 70, color: '#EF4444' },
  { name: 'Facebook Videos',             pct: 65, color: '#3B82F6' },
  { name: 'Ads & Commercials',           pct: 55, color: '#F59E0B' },
  { name: 'Short Videos (Reels/Shorts)', pct: 72, color: '#EC4899' },
  { name: 'Basic Animation Videos',      pct: 50, color: '#8B5CF6' },
]

export const TOOLS = [
  { name: 'VS Code',           pct: 85, color: '#007ACC', icon: faTerminal  },
  { name: 'GitHub',            pct: 75, color: '#94A3B8', icon: faGithub    },
  { name: 'Firebase',          pct: 65, color: '#F59E0B', icon: faGears     },
  { name: 'Google Sheets API', pct: 60, color: '#10B981', icon: faGlobe     },
  { name: 'Browser DevTools',  pct: 70, color: '#06B6D4', icon: faCode      },
  { name: 'Tailwind CSS',      pct: 60, color: '#38BDF8', icon: faCode      },
  { name: 'Figma',             pct: 45, color: '#A855F7', icon: faPalette   },
  { name: 'Odoo',              pct: 55, color: '#714B67', icon: faLaptopCode },
]

export const LANGUAGES = [
  { lang: 'Bengali (বাংলা)', level: 'Native',         pct: 100, color: '#3B82F6', flag: 'bd' },
  { lang: 'English',          level: 'Intermediate',   pct: 65,  color: '#10B981', flag: 'gb' },
  { lang: 'Hindi (हिन्दी)',   level: 'Conversational', pct: 55,  color: '#F59E0B', flag: 'in' },
  { lang: 'Urdu',             level: 'Conversational', pct: 45,  color: '#EC4899', flag: 'pk' },
]

// ── Values & Hobbies ──────────────────────────────────────────
export const VALUES = [
  { icon: faMosque,    color: '#10B981', title: 'Islam First',       desc: 'All work follows Islamic & ethical principles. Halal income is non-negotiable.' },
  { icon: faDumbbell,  color: '#3B82F6', title: 'Discipline',        desc: 'Structured routines, focused sessions, and consistent daily effort.'           },
  { icon: faBrain,     color: '#8B5CF6', title: 'Useful Knowledge',  desc: 'Only learning things with real practical value — no wasted effort.'            },
  { icon: faShield,    color: '#F59E0B', title: 'Honesty',           desc: 'Quality work speaks for itself. No shortcuts, no showing off.'                 },
  { icon: faMedal,     color: '#EC4899', title: 'Perfection',        desc: 'Spending whatever time it takes to get things exactly right.'                  },
  { icon: faUsers,     color: '#06B6D4', title: 'Community',         desc: 'Building tech that genuinely benefits people around me.'                       },
]

export const HOBBIES = [
  { icon: faMosque,   label: 'Prayer (Salah)' },
  { icon: faCode,     label: 'Programming'    },
  { icon: faDumbbell, label: 'Outdoor Games'  },
  { icon: faBicycle,  label: 'Cycling'        },
  { icon: faGlobe,    label: 'Travelling'     },
  { icon: faBook,     label: 'Reading'        },
  { icon: faSeedling, label: 'Learning'       },
  { icon: faCamera,   label: 'Editing'        },
]

// ── Goals (pct added for progress bars) ───────────────────────
export const GOALS = [
  {
    period: 'Short-Term', subtitle: '2026',         color: '#3B82F6', icon: faFlag,      pct: 85,
    items: ['Complete SSC exam (SSC-26)', 'Launch mdturzo.web.app', 'Improve JavaScript skills', 'Begin advanced frameworks'],
  },
  {
    period: 'Mid-Term',   subtitle: '2026 – 2028',  color: '#10B981', icon: faBullseye,  pct: 50,
    items: ['Enroll in HSC (Science group)', 'Master full-stack web dev', 'Start halal freelancing', 'Build real client projects'],
  },
  {
    period: 'Long-Term',  subtitle: 'Future',        color: '#8B5CF6', icon: faMountain,  pct: 25,
    items: ['BSc in Computer Science & Engineering', 'Professional full-stack developer', 'Ethical freelancing career', 'Build beneficial technology'],
  },
]

// ── Socials ───────────────────────────────────────────────────
export const SOCIALS = [
  { icon: faGithub,    label: 'GitHub',       handle: 'muhtasim-rahman',       url: SITE_CONFIG.social.github,    color: '#6e7681', featured: true  },
  { icon: faLinkedin,  label: 'LinkedIn',     handle: 'mdturzo999',            url: SITE_CONFIG.social.linkedin,  color: '#0A66C2', featured: true  },
  { icon: faYoutube,   label: 'YouTube',      handle: '@mdturzo999',           url: SITE_CONFIG.social.youtube,   color: '#FF0000', featured: true  },
  { icon: faFacebook,  label: 'Facebook',     handle: 'mdturzo999',            url: SITE_CONFIG.social.facebook,  color: '#1877F2', featured: false },
  { icon: faInstagram, label: 'Instagram',    handle: '@mdturzo999',           url: SITE_CONFIG.social.instagram, color: '#E1306C', featured: false },
  { icon: faXTwitter,  label: 'X / Twitter', handle: '@mdturzo999',           url: SITE_CONFIG.social.twitter,   color: '#94A3B8', featured: false },
  { icon: faTelegram,  label: 'Telegram',     handle: '@mdturzo16',            url: SITE_CONFIG.social.telegram,  color: '#26A5E4', featured: false },
  { icon: faTiktok,    label: 'TikTok',       handle: '@mdturzo16',            url: SITE_CONFIG.social.tiktok,    color: '#EE1D52', featured: false },
  { icon: faThreads,   label: 'Threads',      handle: '@mdturzo999',           url: SITE_CONFIG.social.threads,   color: '#94A3B8', featured: false },
  { icon: faEnvelope,  label: 'Email',        handle: 'mdturzo.dev@gmail.com', url: `mailto:${SITE_CONFIG.owner.email}`, color: '#F59E0B', featured: false },
]

// ── Shared animation variants ─────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
export const slideL = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0,  transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
export const slideR = {
  hidden: { opacity: 0, x: 28 },
  show:   { opacity: 1, x: 0,  transition: { duration: .55, ease: [.16, 1, .3, 1] } },
}
export const stagger = (d = .08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } })
