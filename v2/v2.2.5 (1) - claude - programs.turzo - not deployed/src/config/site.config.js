// ============================================================
// SITE CONFIG — এখানে edit করলে পুরো website এ reflect হয়
// ============================================================

export const SITE_CONFIG = {
  version: 'v2.2.5',
  siteName: 'Muhtasim Rahman',
  navName: 'Muhtasim',
  siteTagline: 'Web Developer & Designer',
  siteURL: 'https://mdturzo.web.app',
  workerURL: import.meta.env.VITE_WORKER_URL || 'https://portfolio.programs-turzo.workers.dev',

  owner: {
    fullName: 'Md Muhtasim Rahman Mahmud',
    displayName: 'Muhtasim Rahman',
    nickname: 'Turzo',
    email: 'mdturzo.dev@gmail.com',
    location: 'Nilphamari, Bangladesh',
    fakeDOB: '2007-09-13',
  },

  navLinks: [
    { label: 'Home',     path: '/'         },
    { label: 'About',    path: '/about'    },
    { label: 'Projects', path: '/projects' },
    { label: 'Feed',     path: '/feed'     },
    { label: 'Contact',  path: '/contact'  },
  ],

  social: {
    github:    'https://github.com/muhtasim-rahman',
    linkedin:  'https://linkedin.com/in/mdturzo999',
    facebook:  'https://facebook.com/mdturzo999',
    instagram: 'https://instagram.com/mdturzo999',
    youtube:   'https://youtube.com/@mdturzo999',
    telegram:  'https://t.me/mdturzo16',
    twitter:   'https://x.com/mdturzo999',
    tiktok:    'https://tiktok.com/@mdturzo16',
  },

  seo: {
    defaultTitle:       'Muhtasim Rahman — Web Developer & Designer',
    defaultDescription: 'Self-taught web developer & designer from Bangladesh — building clean, fast and meaningful digital experiences.',
    defaultOGImage:     'https://mdturzo.web.app/preview.webp',
    twitterHandle:      '@mdturzo999',
  },

  defaults: {
    statsYearsDev:    3,
    statsYearsDesign: 6,
    statsProjects:    16,
    availableForWork: true,
    cvEnabled:        false,
    cvUrl:            '#',
  },
}

export function calculateAge() {
  const dob = new Date(SITE_CONFIG.owner.fakeDOB)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
  return age
}

export default SITE_CONFIG
