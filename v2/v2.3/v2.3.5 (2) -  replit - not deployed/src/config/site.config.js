// ============================================================
// SITE CONFIG — এখানে edit করলে পুরো website এ reflect হয়
// ============================================================

export const SITE_CONFIG = {
  version: 'v2.3.5',
  siteName: 'Muhtasim Rahman',
  navName: 'Muhtasim',          // Displayed in navbar
  siteTagline: 'Web Developer & Designer',
  siteURL: 'https://mdturzo.web.app',
  workerURL: import.meta.env.VITE_WORKER_URL || 'https://portfolio.programs-turzo.workers.dev',

  owner: {
    fullName: 'Md Muhtasim Rahman Mahmud',
    displayName: 'Muhtasim Rahman',
    nickname: 'Turzo',
    email: 'mdturzo.dev@gmail.com',
    location: 'Nilphamari, Bangladesh',
    // ⚠️ fakeDOB: real DOB না — age auto-calculate এর জন্য
    fakeDOB: '2007-09-13',
    github: 'https://github.com/muhtasim-rahman',
    oldPortfolio: 'https://mdturzo.odoo.com',
    bio: 'A dedicated web developer passionate about creating user-friendly and visually stunning websites. Focused on quality, innovation, and transforming complex ideas into simple, elegant solutions.',
  },

  social: {
    facebook:  'https://facebook.com/mdturzo999',
    instagram: 'https://instagram.com/mdturzo999',
    youtube:   'https://youtube.com/@mdturzo999',
    twitter:   'https://twitter.com/mdturzo999',
    linkedin:  'https://linkedin.com/in/mdturzo999',
    tiktok:    'https://tiktok.com/@mdturzo16',
    telegram:  'https://t.me/mdturzo16',
    github:    'https://github.com/muhtasim-rahman',
    threads:   'https://www.threads.net/mdturzo999',
  },

  seo: {
    defaultOGImage: 'https://mdturzo.web.app/preview.webp',
    defaultDescription: 'Self-taught web developer & designer from Bangladesh — building clean, fast and meaningful digital experiences.',
    defaultKeywords: 'Muhtasim Rahman, Turzo, web developer, Bangladesh, portfolio, mdturzo',
    twitterHandle: '@mdturzo999',
  },

  // এগুলো Supabase site_settings থেকে override হবে
  // এখানে শুধু fallback defaults
  defaults: {
    statsYearsDev: '3+',
    statsYearsDesign: '6+',
    statsProjects: '16+',
    availableForWork: true,
    cvEnabled: false,
    cvUrl: '',
  },
}

// ── Age Calculator ─────────────────────────────────────────
// fakeDOB থেকে auto age calculate করে
export function calculateAge(dobString = SITE_CONFIG.owner.fakeDOB) {
  const dob = new Date(dobString)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export default SITE_CONFIG
