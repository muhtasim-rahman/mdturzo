# 📋 Portfolio v1.0.1 — Project Plan

## Stack
| Item | Detail |
|---|---|
| URL | https://mdturzo.web.app |
| Hosting | Firebase Hosting |
| Auth | Firebase Auth (Google + GitHub) |
| DB | Firebase Realtime Database |
| Analytics | Firebase Analytics |
| Architecture | SPA — History API routing |
| CSS | Vanilla CSS (custom design system) |
| JS | Vanilla ES Modules (no bundler needed) |

## Folder Structure
```
mdturzo-portfolio/
├── index.html              ← SPA shell (one HTML served for all routes)
├── 404.html                ← Custom 404 fallback
├── firebase.json           ← Hosting + rewrite rules + security headers
├── .firebaserc             ← Project binding (mdturzo)
│
├── css/
│   ├── main.css            ← Design system, CSS variables, dark/light theme
│   ├── animations.css      ← @keyframes, AOS scroll-reveal, skill bar anim
│   ├── navbar.css          ← Fixed glassmorphism navbar
│   ├── hero.css            ← Hero section (animated)
│   └── sections.css        ← About, Skills, Projects, Services, Contact, Footer
│
├── js/
│   ├── main.js             ← Boot: mounts components, inits auth + router
│   ├── router.js           ← SPA router (History API, lazy page imports)
│   ├── firebase-config.js  ← Firebase init (Auth, DB, Analytics)
│   ├── auth.js             ← Google + GitHub sign in/out, visitor saving
│   ├── animations.js       ← IntersectionObserver, typing effect, particles
│   └── contact-form.js     ← Form submit → Firebase Realtime DB
│
├── components/
│   ├── navbar.js           ← Navbar HTML builder + scroll/hamburger/theme logic
│   └── footer.js           ← Footer HTML builder
│
├── pages/                  ← Each exports renderPage() + initPage()
│   ├── home.js             ← / (Hero + About + Skills + Projects + Services + Contact)
│   ├── about.js            ← /about
│   ├── projects.js         ← /projects
│   ├── skills.js           ← /skills
│   ├── services.js         ← /services
│   └── contact.js          ← /contact
│
├── assets/
│   └── images/
│       └── muhtasim.webp   ← Profile photo
│
└── _docs/                  ← NOT deployed (ignored in firebase.json)
    ├── plan.md
    ├── rules.md
    └── suggestion.md
```

## Routes
| Route | Page |
|---|---|
| `/` | Full landing page |
| `/about` | About page |
| `/projects` | All projects |
| `/skills` | Skills breakdown |
| `/services` | Services |
| `/contact` | Contact form |

## Color Palette (from jersey)
| Variable | Hex | Usage |
|---|---|---|
| `--accent` | `#4a90cd` | Steel blue — primary |
| `--accent-hi` | `#71d5ff` | Sky blue — highlights |
| `--bg` | `#06101e` | Deep navy background |
| `--gold` | `#f5a623` | Warm amber accent |

## v1.1.0 Roadmap
- [ ] Blog section (Firebase Realtime DB)
- [ ] Admin panel (`/admin` route, uid-gated)
- [ ] PWA manifest + service worker
- [ ] GitHub API live repo stats
- [ ] Resume PDF download
