// =============================================================================
// SITE CONFIG — mdturzo.web.app
// Edit this file to update info across the entire website automatically.
// =============================================================================

const SITE_CONFIG = {
  version: "v1.4.6",
  siteName: "Muhtasim Rahman",
  siteTagline: "Web Developer & Designer",
  siteURL: "https://mdturzo.web.app",

  // ── Owner Info ─────────────────────────────────────────────────────────────
  owner: {
    fullName: "Md Muhtasim Rahman Mahmud",
    displayName: "Muhtasim Rahman",
    nickname: "Turzo",
    email: "mdturzo.dev@gmail.com",
    location: "Nilphamari, Bangladesh",
    fakeDOB: "2007-09-13", // Used to auto-calculate & display age
    github: "https://github.com/muhtasim-rahman",
    oldPortfolio: "https://mdturzo.odoo.com",
  },

  // ── Social Media ───────────────────────────────────────────────────────────
  social: {
    facebook:  "https://facebook.com/mdturzo999",
    instagram: "https://instagram.com/mdturzo999",
    youtube:   "https://youtube.com/@mdturzo999",
    twitter:   "https://twitter.com/mdturzo999",
    linkedin:  "https://linkedin.com/in/mdturzo999",
    tiktok:    "https://tiktok.com/@mdturzo16",
    telegram:  "https://t.me/mdturzo16",
    github:    "https://github.com/muhtasim-rahman",
    threads:   "https://www.threads.net/mdturzo999",
  },

  // ── Firebase Config ────────────────────────────────────────────────────────
  firebase: {
    apiKey:            "AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",
    authDomain:        "mdturzo.firebaseapp.com",
    databaseURL:       "https://mdturzo-default-rtdb.firebaseio.com",
    projectId:         "mdturzo",
    storageBucket:     "mdturzo.firebasestorage.app",
    messagingSenderId: "13751895485",
    appId:             "1:13751895485:web:be068cfd6f46f945d3fed4",
    measurementId:     "G-SHM2013GKK",
  },

  // ── Cloudflare Worker ──────────────────────────────────────────────────────
  cloudflareWorker: "https://portfolio.programs-turzo.workers.dev",

  // ── Feature Flags ──────────────────────────────────────────────────────────
  features: {
    darkMode:      true,
    notifications: true,
    search:        true,
    comments:      true,
    reviews:       true,
  },

  // ── Under Development Pages ────────────────────────────────────────────────
  // Add page names here to show the "Under Development" badge automatically.
  underDev: [],

  // ── Maintenance Mode ───────────────────────────────────────────────────────
  maintenance: false,

  // ── SEO Defaults ──────────────────────────────────────────────────────────
  seo: {
    defaultOGImage:    "/assets/images/preview.png",
    defaultDescription: "Web Developer & Designer from Nilphamari, Bangladesh. Building user-friendly and visually stunning websites.",
    defaultKeywords:   "Muhtasim Rahman, Turzo, web developer, Bangladesh, portfolio, HTML CSS JavaScript",
  },

  // ── Nav Items ──────────────────────────────────────────────────────────────
  // Defines all nav links. Desktop shows `showDesktop`, Mobile shows `showMobile`.
  navItems: [
    { label: "Home",     path: "/",        icon: "fa-house",       showDesktop: true,  showMobile: true  },
    { label: "About",    path: "/about",   icon: "fa-user",        showDesktop: true,  showMobile: true  },
    { label: "Projects", path: "/projects",icon: "fa-code",        showDesktop: true,  showMobile: true  },
    { label: "Blogs",    path: "/blogs",   icon: "fa-pen-nib",     showDesktop: true,  showMobile: true  },
    { label: "Gallery",  path: "/gallery", icon: "fa-images",      showDesktop: true,  showMobile: true  },
    { label: "Contact",  path: "/contact", icon: "fa-envelope",    showDesktop: false, showMobile: true  },
  ],

  // ── Footer Quick Links ─────────────────────────────────────────────────────
  footerLinks: [
    { label: "Home",          path: "/"               },
    { label: "About",         path: "/about"          },
    { label: "Projects",      path: "/projects"       },
    { label: "Blogs",         path: "/blogs"          },
    { label: "Gallery",       path: "/gallery"        },
    { label: "Contact",       path: "/contact"        },
    { label: "Privacy Policy",path: "/privacy-policy" },
    { label: "Cookies Policy",path: "/cookies-policy" },
  ],
};

// ── Age Calculation ────────────────────────────────────────────────────────
// Calculates current age from SITE_CONFIG.owner.fakeDOB automatically.
SITE_CONFIG.owner.age = (() => {
  const dob  = new Date(SITE_CONFIG.owner.fakeDOB);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
})();

// ── Copyright Year ─────────────────────────────────────────────────────────
SITE_CONFIG.currentYear = new Date().getFullYear();

// Make globally available
window.SITE_CONFIG = SITE_CONFIG;
