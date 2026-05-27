import {
  faBicycle,
  faBook,
  faBrain,
  faBriefcase,
  faBullseye,
  faCamera,
  faCalendar,
  faCircleCheck,
  faCode,
  faDatabase,
  faDownload,
  faDumbbell,
  faEnvelope,
  faEye,
  faFilm,
  faFlag,
  faGears,
  faGlobe,
  faGraduationCap,
  faHandshake,
  faLaptopCode,
  faLocationDot,
  faMedal,
  faMosque,
  faMountain,
  faPalette,
  faPenNib,
  faPrint,
  faRocket,
  faSchool,
  faSeedling,
  faShareNodes,
  faShield,
  faTerminal,
  faTrophy,
  faUser,
  faVideo,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faThreads,
  faTiktok,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const stagger = (delay = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

export const quickFacts = (age) => [
  { icon: faUser, label: 'Full name', value: SITE_CONFIG.owner.fullName, color: '#3B82F6' },
  { icon: faCalendar, label: 'Age', value: `${age} years`, color: '#10B981' },
  { icon: faLocationDot, label: 'Location', value: SITE_CONFIG.owner.location, color: '#F59E0B' },
  { icon: faGraduationCap, label: 'Academic', value: 'SSC-26, Science', color: '#8B5CF6' },
  { icon: faMosque, label: 'Faith', value: 'Muslim', color: '#10B981' },
  { icon: faRocket, label: 'Goal', value: 'CSE Engineer', color: '#EC4899' },
]

export const storyCards = [
  {
    icon: faCode,
    title: 'Self-taught Builder',
    text: 'I learn by building real projects, testing ideas, and improving the same work until it feels useful.',
    color: '#3B82F6',
  },
  {
    icon: faPalette,
    title: 'Design-sensitive Developer',
    text: 'I care about how an interface feels, not only whether the code runs. Clean layout and readable details matter.',
    color: '#EC4899',
  },
  {
    icon: faShield,
    title: 'Values-driven Work',
    text: 'Every project should respect Islamic ethics, honesty, and halal earning principles.',
    color: '#10B981',
  },
]

export const education = [
  { period: '2013 - 2014', school: 'St. Geroza School, Saidpur', level: 'Nursery & KG', desc: 'First steps in formal education, curiosity, and class routines.', icon: faSchool },
  { period: '2015 - 2017', school: 'St. Geroza School, Saidpur', level: 'Class 1 - 3', desc: 'Primary years where reading and curiosity for technology started growing.', icon: faBook },
  { period: '2018 - 2019', school: 'Tulshiram Govt. Primary School, Saidpur', level: 'Class 4 - 5', desc: 'Completed primary cycle and became more interested in science subjects.', icon: faTrophy },
  { period: '2020', school: 'Lions School & College, Saidpur', level: 'Class 6', desc: 'Brief enrollment before transitioning to Saidpur Govt. Science College.', icon: faGraduationCap },
  { period: '2021 - 2025', school: 'Saidpur Govt. Science College (SGSC)', level: 'Class 6 - 10', desc: 'Science group studies while web development and design became a serious focus.', icon: faLaptopCode },
  { period: '2026', school: 'Saidpur Govt. Science College (SGSC)', level: 'SSC-26 Batch', desc: 'Current academic milestone. Next target is HSC in Science, then CSE.', icon: faFlag, current: true },
  { period: '2026 - 2028', school: 'To be determined', level: 'HSC Science', desc: 'Planned next academic stage with deeper math, science, and development practice.', icon: faRocket, future: true },
  { period: 'Future', school: 'Dream Institution', level: 'BSc in CSE', desc: 'Long-term target: Computer Science & Engineering degree and professional development career.', icon: faBullseye, future: true },
]

export const skillTabs = [
  {
    id: 'programming',
    label: 'Programming',
    icon: faCode,
    summary: 'Core development skills used for portfolio work, small tools, and learning full-stack foundations.',
    items: [
      { name: 'AI Tools & Workflows', pct: 90, color: '#8B5CF6', note: 'Coding, planning, debugging' },
      { name: 'HTML', pct: 80, color: '#F97316', note: 'Semantic pages' },
      { name: 'CSS', pct: 80, color: '#3B82F6', note: 'Responsive UI' },
      { name: 'Git & GitHub', pct: 78, color: '#64748B', note: 'Version control' },
      { name: 'Python', pct: 60, color: '#EAB308', note: 'Scripting' },
      { name: 'JavaScript', pct: 45, color: '#F59E0B', note: 'Improving daily' },
      { name: 'Java', pct: 35, color: '#EC4899', note: 'Basic level' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: faPalette,
    summary: 'Visual design work for identities, thumbnails, posters, interface assets, and client-ready graphics.',
    items: [
      { name: 'Logo Design', pct: 78, color: '#EC4899', note: 'Brand marks' },
      { name: 'Banner Design', pct: 82, color: '#8B5CF6', note: 'Social headers' },
      { name: 'Thumbnail Design', pct: 84, color: '#3B82F6', note: 'YouTube/social' },
      { name: 'Business Card', pct: 70, color: '#10B981', note: 'Print layout' },
      { name: 'Poster Design', pct: 75, color: '#F59E0B', note: 'Campaign visuals' },
      { name: 'UI Layout', pct: 72, color: '#06B6D4', note: 'Web sections' },
    ],
  },
  {
    id: 'video',
    label: 'Video',
    icon: faVideo,
    summary: 'Practical editing skills for short-form content, promotional clips, basic animation, and platform videos.',
    items: [
      { name: 'YouTube Videos', pct: 72, color: '#EF4444', note: 'Long-form edits' },
      { name: 'Facebook Videos', pct: 70, color: '#3B82F6', note: 'Social content' },
      { name: 'Ads & Commercials', pct: 62, color: '#F59E0B', note: 'Promo edits' },
      { name: 'Reels / Shorts', pct: 76, color: '#EC4899', note: 'Short-form' },
      { name: 'Basic Animation', pct: 58, color: '#8B5CF6', note: 'Motion basics' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: faWrench,
    summary: 'Software and workflow tools used to ship websites, manage content, debug issues, and design assets.',
    items: [
      { name: 'VS Code', pct: 88, color: '#007ACC', note: 'Editor' },
      { name: 'GitHub', pct: 78, color: '#94A3B8', note: 'Repo hosting' },
      { name: 'Firebase', pct: 66, color: '#F59E0B', note: 'Auth/data' },
      { name: 'Supabase', pct: 62, color: '#10B981', note: 'Postgres' },
      { name: 'DevTools', pct: 74, color: '#06B6D4', note: 'Debugging' },
      { name: 'Figma', pct: 68, color: '#A855F7', note: 'Design' },
    ],
  },
]

export const languages = [
  { name: 'Bengali', native: 'Bangla', level: 'Native', pct: 100, color: '#3B82F6', flag: 'bd' },
  { name: 'English', level: 'Intermediate', pct: 65, color: '#10B981', flag: 'gb' },
  { name: 'Hindi', native: 'Hindi', level: 'Conversational', pct: 55, color: '#F59E0B', flag: 'in' },
  { name: 'Urdu', level: 'Conversational', pct: 45, color: '#EC4899', flag: 'pk' },
]

export const values = [
  { icon: faMosque, color: '#10B981', title: 'Islam First', desc: 'Faith, halal income, and ethical choices stay above shortcuts.' },
  { icon: faDumbbell, color: '#3B82F6', title: 'Discipline', desc: 'Consistent routines, focused work sessions, and steady improvement.' },
  { icon: faBrain, color: '#8B5CF6', title: 'Useful Knowledge', desc: 'Learning practical things that can become real work and real benefit.' },
  { icon: faShield, color: '#F59E0B', title: 'Honesty', desc: 'Transparent communication, clean effort, and no fake claims.' },
  { icon: faMedal, color: '#EC4899', title: 'Quality', desc: 'Polishing details until the work feels complete and professional.' },
  { icon: faHandshake, color: '#06B6D4', title: 'Community', desc: 'Building technology that can help people around me.' },
]

export const hobbies = [
  { icon: faMosque, label: 'Prayer' },
  { icon: faCode, label: 'Programming' },
  { icon: faDumbbell, label: 'Outdoor Games' },
  { icon: faBicycle, label: 'Cycling' },
  { icon: faGlobe, label: 'Travelling' },
  { icon: faBook, label: 'Reading' },
  { icon: faSeedling, label: 'Learning' },
  { icon: faCamera, label: 'Editing' },
]

export const goals = [
  {
    period: 'Short-Term',
    timeframe: '2026',
    progress: 85,
    color: '#3B82F6',
    icon: faFlag,
    items: ['Complete SSC exam', 'Launch mdturzo.web.app', 'Improve JavaScript', 'Build more portfolio projects'],
  },
  {
    period: 'Mid-Term',
    timeframe: '2026 - 2028',
    progress: 50,
    color: '#10B981',
    icon: faBullseye,
    items: ['Enroll in HSC Science', 'Master full-stack development', 'Start halal freelancing', 'Work on real client projects'],
  },
  {
    period: 'Long-Term',
    timeframe: 'Future',
    progress: 25,
    color: '#8B5CF6',
    icon: faMountain,
    items: ['BSc in Computer Science & Engineering', 'Professional full-stack developer', 'Ethical freelancing career', 'Beneficial technology products'],
  },
]

export const socials = [
  { icon: faGithub, label: 'GitHub', handle: 'muhtasim-rahman', url: SITE_CONFIG.social.github, color: '#94A3B8', featured: true },
  { icon: faLinkedin, label: 'LinkedIn', handle: 'mdturzo999', url: SITE_CONFIG.social.linkedin, color: '#0A66C2', featured: true },
  { icon: faYoutube, label: 'YouTube', handle: '@mdturzo999', url: SITE_CONFIG.social.youtube, color: '#FF0000', featured: true },
  { icon: faFacebook, label: 'Facebook', handle: 'mdturzo999', url: SITE_CONFIG.social.facebook, color: '#1877F2' },
  { icon: faInstagram, label: 'Instagram', handle: '@mdturzo999', url: SITE_CONFIG.social.instagram, color: '#E1306C' },
  { icon: faXTwitter, label: 'X / Twitter', handle: '@mdturzo999', url: SITE_CONFIG.social.twitter, color: '#94A3B8' },
  { icon: faTelegram, label: 'Telegram', handle: '@mdturzo16', url: SITE_CONFIG.social.telegram, color: '#26A5E4' },
  { icon: faTiktok, label: 'TikTok', handle: '@mdturzo16', url: SITE_CONFIG.social.tiktok, color: '#EE1D52' },
  { icon: faThreads, label: 'Threads', handle: '@mdturzo999', url: SITE_CONFIG.social.threads, color: '#94A3B8' },
  { icon: faEnvelope, label: 'Email', handle: SITE_CONFIG.owner.email, url: `mailto:${SITE_CONFIG.owner.email}`, color: '#F59E0B' },
]

export const cvActions = [
  { id: 'download', icon: faDownload, label: 'Download' },
  { id: 'preview', icon: faEye, label: 'Preview' },
  { id: 'print', icon: faPrint, label: 'Print' },
  { id: 'share', icon: faShareNodes, label: 'Share' },
]

export const expertiseIcons = {
  programming: faCode,
  design: faPenNib,
  video: faFilm,
  tools: faDatabase,
}

export const circleCheck = faCircleCheck
export const briefcaseIcon = faBriefcase
