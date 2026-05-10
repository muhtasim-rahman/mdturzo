# MASTER PROMPT — mdturzo.web.app Portfolio Website
**Owner:** Muhtasim Rahman (Turzo) | **Version System:** v1.2.0 → v1.18.0+

---

## AI DIRECTIVE (Read First — Critical)

Ei prompt ta ami (Muhtasim Rahman) proti notun chat e provide korbo. Tumi khali sei version er kaj korbe jeta ami chat e specify kore dibo. Onno kono version er kaj korba na. Ami chat e bolbo "v1.X.0 er kaj korba" — tumi shudhu sei version er plan onujayi kaj korbe. Ager version er project zip o provide korbo (v1.2.0 baad, karon seta prothom version).

Proti major version shes e:
1. Full project structure onujayi sob files **zip** kore diba (root folder name hbe `mdturzo-portfolio-vX.X.0/`)
2. GitHub commit message diba niche defined format e
3. Website jate sob somoy fully **runnable** condition e thake — kono kichu half-done ba broken rakha jabe na

Minor fix/update (v1.X.1, v1.X.2 etc.) oi same chat e-i hbe. Major version change hole notun chat.

---

## Version Plan (17 Major Versions)

> **Kon version e ki kora hbe tar complete list niche ache. Tumi jei version e kaj korbe setar details follow kore kaj korbe.**

| Version | Title | Key Focus |
|---------|-------|-----------|
| **v1.2.0** | Foundation & Architecture | Folder structure, site-config.js, Firebase setup, Cloudflare Worker, 404 page, base HTML/CSS/JS |
| **v1.3.0** | Navbar + Footer | Full responsive navbar, dark/light toggle, glass morphism scroll effect, mega nav popup, sidebar drawer, loading progress bar, footer with social links |
| **v1.4.0** | Hero + Home Page Part 1 | Hero/banner section with advanced animations, skills section, about-mini section |
| **v1.5.0** | Home Page Part 2 | Stats section, services section, recent projects preview, GitHub stats, testimonials/reviews preview, any remaining home sections |
| **v1.6.0** | About Page | Full about page — education timeline, skills with progress, experience, languages, values, hobbies, links |
| **v1.7.0** | Projects Page | Grid/list toggle UI, project cards, /projects/slug routing, project detail page (no reload), within-page search engine |
| **v1.8.0** | Blogs Page | Blog list UI (same grid/list), blog detail page (no reload), /blogs/slug routing, reading time, categories, series, within-page search |
| **v1.9.0** | Firebase Backend — Content | Firebase Realtime DB integration for projects + blogs, comments system with spam protection, status system (published/draft/hidden), TinyMCE editor setup |
| **v1.10.0** | Gallery Page | Videos section (iframe embed), photos section (multi-image Facebook-style posts), fullscreen preview, /gallery/videos + /gallery/photos sub-pages |
| **v1.11.0** | Contact Page | Multi-form (general / bug report / question), image upload + compress, spam protection (2/hr), contact page professional design |
| **v1.12.0** | Auth System | Login + signup pages (full screen), Google / Microsoft / GitHub OAuth, Firebase Auth, post-auth redirect logic, /logout route |
| **v1.13.0** | User Profile + Account | Profile page, edit profile (photo/banner crop + compress), username availability check, social links, badges (account + earned), /@username public profile, public/private toggle |
| **v1.14.0** | Global Search + Notifications | Animated global search bar, advanced search engine (point-based, category-wise, section highlight), notification system (navbar popup, Firebase-powered) |
| **v1.15.0** | Admin Panel Part 1 | /admin setup, Dashboard, Users tab, Projects tab, Blogs tab, Gallery tab — sidebar collapsible, admin verification, Firebase rules admin UID hardcode |
| **v1.16.0** | Admin Panel Part 2 | Comments, Reviews, Messages, Notifications, Badges, Analytics (charts), Logs, Settings tabs — full admin panel completion |
| **v1.17.0** | SEO + Tracking + Reviews | Full meta tags per page, og:image, dynamic titles, breadcrumb navigation, tracking (CV download / page visits), public reviews section on home, spam protection refinements, Firebase security rules finalization |
| **v1.18.0** | Polish + Final | ImgBB image upload full system, Cloudflare Workers finalization, under-dev badges cleanup, cookies/privacy pages, CV download button with demo PDF, performance optimizations, final Firebase rules |

---

## Project Overview

Muhtasim Rahman (Turzo) er jonno ekta **advanced, professional portfolio website** banabo. URL: `https://mdturzo.web.app` — Firebase Hosting e deploy hbe (Spark free plan).

Ei website ta pure HTML, CSS, Vanilla JS dea banabo. Kono framework (React, Vue, etc.) ba build tool (Vite, Webpack) use hbe na. Website ta fully **minimal** and **professional** hbe. Design clean, animations smooth, typography excellent.

**Kono emoji use kora jabe na website er kothao.** Sakal jaygay **Font Awesome icons** use korba. Better professional fonts use korba (Google Fonts — design onujayi pick korba, Muhtasim er personality anusare — clean, modern, trustworthy).

---

## Tech Stack

```
Core:           Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
CSS Framework:  Tailwind CSS (CDN only)
Icons:          Font Awesome 6 (CDN)
Fonts:          Google Fonts (CDN)
Firebase:       Authentication, Realtime Database, Hosting (Spark free plan)
Image Host:     ImgBB API (via Cloudflare Worker — never expose key in frontend)
Secret Mgmt:    Cloudflare Workers (portfolio.programs-turzo.workers.dev)
Rich Editor:    TinyMCE (watermark/limitation thakle best free alternative use korbe — CKEditor 5 ba Quill)
Deploy:         Firebase Hosting — root e index.html
```

**Firebase ba Tailwind er Storage use korba na** — ImgBB use korbe image hosting er jonno.

---

## Firebase Configuration

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",
  authDomain: "mdturzo.firebaseapp.com",
  databaseURL: "https://mdturzo-default-rtdb.firebaseio.com",
  projectId: "mdturzo",
  storageBucket: "mdturzo.firebasestorage.app",
  messagingSenderId: "13751895485",
  appId: "1:13751895485:web:be068cfd6f46f945d3fed4",
  measurementId: "G-SHM2013GKK"
};
```

Firebase SDK ta CDN dea load korba — `<script type="module">` use korbe. Firebase Storage use hbe na — sob image ImgBB e hbe.

---

## Cloudflare Workers

**Worker URL:** `portfolio.programs-turzo.workers.dev`

Sob secret API keys Cloudflare Worker e store hbe. Frontend theke directly API key expose hbe na kabhi. Worker e ki ki variables ache:

| Variable Name | Purpose |
|--------------|---------|
| `imgbb_api` | ImgBB image upload API key |

Notun kono API key lagle Cloudflare Worker code e add korbe and amake bole dibe ki variable name add korte hbe Worker e. Worker code eivabe structure hbe:

```javascript
// Cloudflare Worker — portfolio.programs-turzo.workers.dev
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = ['https://mdturzo.web.app', 'http://localhost:5000'];
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: /upload-image (ImgBB)
    if (url.pathname === '/upload-image' && request.method === 'POST') {
      const formData = await request.formData();
      formData.append('key', env.imgbb_api);
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};
```

---

## Site Config File

`assets/js/site-config.js` file e website er sob basic configuration store hbe. Oi file theke kono kichu edit korle **full website jure** seta automatically reflect korbe. Kono hardcoded value rakha jabe na — sob site-config.js theke ashbe.

```javascript
// assets/js/site-config.js
const SITE_CONFIG = {
  version: "v1.2.0",
  siteName: "Muhtasim Rahman",
  siteTagline: "Web Developer & Designer",
  siteURL: "https://mdturzo.web.app",
  
  // Owner Info
  owner: {
    fullName: "Md Muhtasim Rahman Mahmud",
    displayName: "Muhtasim Rahman",
    nickname: "Turzo",
    email: "mdturzo.dev@gmail.com",
    location: "Nilphamari, Bangladesh",
    fakeDOB: "2007-09-13", // Auto-calculate age from this
    github: "https://github.com/muhtasim-rahman",
    oldPortfolio: "https://mdturzo.odoo.com",
  },
  
  // Social Media
  social: {
    facebook: "https://facebook.com/mdturzo999",
    instagram: "https://instagram.com/mdturzo999",
    youtube: "https://youtube.com/@mdturzo999",
    twitter: "https://twitter.com/mdturzo999",
    linkedin: "https://linkedin.com/in/mdturzo999",
    tiktok: "https://tiktok.com/@mdturzo16",
    telegram: "https://t.me/mdturzo16",
    github: "https://github.com/muhtasim-rahman",
    threads: "https://www.threads.net/mdturzo999",
  },
  
  // Firebase
  cloudflareWorker: "https://portfolio.programs-turzo.workers.dev",
  
  // Feature Flags
  features: {
    darkMode: true,
    notifications: true,
    search: true,
    comments: true,
    reviews: true,
  },
  
  // Under Development pages/sections (page names list)
  underDev: [],
  
  // Maintenance Mode
  maintenance: false,
  
  // SEO defaults
  seo: {
    defaultOGImage: "/assets/images/preview.png",
    defaultDescription: "Web Developer & Designer from Nilphamari, Bangladesh. Building user-friendly and visually stunning websites.",
  }
};
```

---

## File & Folder Structure

Root e shudhu `index.html` thakbe. Baki sob `assets/` folder e:

```
root/
├── index.html                    ← Single entry point (SPA-style router)
├── 404.html                      ← Custom 404 page
├── firebase.json                 ← Firebase hosting config (rewrites for clean URLs)
├── .firebaserc                   ← Firebase project config
└── assets/
    ├── css/
    │   ├── style.css             ← Global/foundational styles (variables, resets, typography, utilities)
    │   ├── home/
    │   │   ├── hero.css
    │   │   ├── skills.css
    │   │   ├── services.css
    │   │   ├── stats.css
    │   │   ├── reviews-preview.css
    │   │   └── ... (proti section er alada .css)
    │   ├── about/
    │   │   └── about.css
    │   ├── projects/
    │   │   ├── projects-list.css
    │   │   └── project-detail.css
    │   ├── blogs/
    │   │   ├── blogs-list.css
    │   │   └── blog-detail.css
    │   ├── gallery/
    │   │   └── gallery.css
    │   ├── contact/
    │   │   └── contact.css
    │   ├── auth/
    │   │   └── auth.css
    │   ├── profile/
    │   │   └── profile.css
    │   ├── admin/
    │   │   └── admin.css
    │   ├── navbar.css            ← Navbar styles (global component)
    │   └── footer.css            ← Footer styles (global component)
    ├── js/
    │   ├── app.js                ← Global app init, Firebase init, auth state listener
    │   ├── router.js             ← Client-side router (clean URLs, history API)
    │   ├── site-config.js        ← Site configuration (version, info, social, flags)
    │   ├── utils.js              ← Shared utility functions
    │   ├── navbar.js             ← Navbar component logic
    │   ├── footer.js             ← Footer component logic
    │   ├── home/
    │   │   ├── hero.js
    │   │   ├── skills.js
    │   │   ├── services.js
    │   │   ├── stats.js
    │   │   └── ... (section wise)
    │   ├── about/
    │   │   └── about.js
    │   ├── projects/
    │   │   ├── projects-list.js
    │   │   └── project-detail.js
    │   ├── blogs/
    │   │   ├── blogs-list.js
    │   │   └── blog-detail.js
    │   ├── gallery/
    │   │   └── gallery.js
    │   ├── contact/
    │   │   └── contact.js
    │   ├── auth/
    │   │   └── auth.js
    │   ├── profile/
    │   │   └── profile.js
    │   └── admin/
    │       ├── dashboard.js
    │       ├── users.js
    │       ├── projects-admin.js
    │       ├── blogs-admin.js
    │       ├── gallery-admin.js
    │       ├── comments-admin.js
    │       ├── reviews-admin.js
    │       ├── messages-admin.js
    │       ├── notifications-admin.js
    │       ├── badges-admin.js
    │       ├── analytics-admin.js
    │       ├── logs-admin.js
    │       └── settings-admin.js
    ├── images/
    │   ├── muhtasim.webp         ← Hero/profile photo
    │   └── preview.png           ← Default OG image (placeholder — user will replace)
    └── icons/                    ← Custom SVG/PNG icons, favicons (no web logo yet)
```

**Important:**
- Home page er har ekta section er jonno alada CSS file (`assets/css/home/hero.css`, `assets/css/home/skills.css` etc.) and alada JS file (`assets/js/home/hero.js` etc.) thakbe.
- Baki sob page er jonno page-wise alada CSS/JS folder thakbe.
- `style.css` e CSS variables, reset, typography, global utility classes thakbe — ei file e page-specific kono style thakbe na.
- `app.js` e global init thakbe — page-specific logic thakbe na.

---

## Color Palette & Design

Website er primary color scheme `muhtasim.webp` image er kachakachi rakhba — image e blue tone dominant, tai primary color blue family theke niba. Tobe shudhu design onujayi pick korba, website ke minimal, clean rakha main priority.

**Design Rules:**
- Minimal — clutter free, breathable spacing
- Professional — not over-decorated
- Consistent margin/padding throughout full website
- Smooth animations — not flashy or distracting
- Fully responsive — every single section, every single page
- No emoji anywhere on the website
- Font Awesome 6 icons use korbe throughout
- Google Fonts — modern, clean fonts (e.g., Inter, Plus Jakarta Sans, or similar)

---

## Pages & Routing

Website e SPA-style routing hbe (History API). Firebase Hosting e `firebase.json` e rewrites set korte hbe jate direct URL visit e page load hoy.

**Pages:**

| URL Pattern | Page |
|-------------|------|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects List |
| `/projects/:slug` | Project Detail |
| `/blogs` | Blog List |
| `/blogs/:slug` | Blog Detail |
| `/gallery` | Gallery Main |
| `/gallery/photos` | Photos sub-page |
| `/gallery/videos` | Videos sub-page |
| `/contact` | Contact |
| `/login` | Login |
| `/signup` | Sign Up |
| `/@:username` | Public User Profile |
| `/profile` | Own Profile (logged in) |
| `/admin` | Admin Dashboard |
| `/admin/:tab` | Admin Tabs |
| `/privacy-policy` | Privacy Policy |
| `/cookies-policy` | Cookies Policy |
| `/logout` | Logout (auto-redirect) |
| `/*` | 404 Page |

Page load howar time navbar er upore ekta **functional loading progress bar** dakhabe — real progress reflect korbe.

---

## Navbar

Minimal, professional, fully responsive. Sob page e same navbar thakbe — ekjaygay define kora, sob page e inject hbe.

**Contents:**
- Logo / Site name (left side)
- Nav items: Desktop e 5ta, Mobile e home bade 4ta visible
- Account icon (logged in hole avatar, noy icon)
- Light/Dark mode toggle — eye-catching animation soho (e.g., sun/moon morph animation)
- Search icon (click e global search bar open hbe)
- Notification icon (unread badge count soho)
- "All nav items" icon — click korle navbar er niche ekta **popup/mega menu** open hbe, category-wise sob nav items dakhabe

**Behavior:**
- Top e thakle: Hero section er sathe visually combined/overlapping (transparent/semi-transparent)
- Scroll korle: Rounded corners soho glass morphism effect er **floating navbar** hbe (backdrop-blur, semi-transparent background)
- Mobile/small screen: **Sidebar drawer** e sob nav items, icons, dark toggle, account info
- Transition: smooth animation

---

## Footer

Reference images theke inspired design. Contents:

- Muhtasim er short intro text
- Navigation links (Home, About, Projects, Blogs, Gallery, Contact)
- Social media icons — Font Awesome icons soho (Facebook, Instagram, YouTube, X/Twitter, LinkedIn, TikTok, Telegram, GitHub, Threads)
- Contact info (email: mdturzo.dev@gmail.com)
- Copyright text — `site-config.js` theke name/year auto fill
- Website version — `site-config.js` theke auto load
- Top-scroll button

---

## Hero / Banner Section

Full-width, visually stunning, professionally designed hero/banner section.

**Layout:**
- Left 3/5: Contents — Name, title, tagline, CTA buttons, stat counters, social quick links
- Right 2/5: `muhtasim.webp` image — stylized, with decorative elements around it (glowing ring, floating shapes, etc.)
- Background: Animated — subtle moving gradients, floating geometric shapes, particle-like elements — not distracting, professional
- Advanced animations — content fade-in, slide-in on load; image entrance animation; background continuous subtle animation

**Content:**
- Name: "Muhtasim Rahman" (large, prominent)
- Title: Animated typing effect — cycles through "Web Developer", "Designer", "Student" etc.
- Tagline: Short, impactful bio line
- CTA Buttons: "View Projects" (primary) + "Download CV" (secondary/outline)
- Quick stats: 3+ Years Web Dev, 6+ Years Design, etc.
- Social icons row: GitHub, LinkedIn, Facebook, YouTube

**Age:** Auto-calculate from fake DOB `2007-09-13` in `site-config.js` — website e "~18 years old" style show korbe, auto update hbe.

---

## Home Page — All Sections

Home page e hero section er baire onek sections thakbe. Tumi tomar jana mote portfolio website er standard sections sob add korba. `about.md` theke info nio. Reference images theke design ideas nio. Sections include korba (but not limited to):

1. **Hero** (described above)
2. **About Mini** — short intro, photo, key facts, "Learn More" button
3. **Skills** — HTML, CSS, JavaScript, Python, Java, Git, AI, Graphic Design, Video Editing — progress bars / skill cards / visual skill display. Rating data `about.md` theke nio.
4. **Services** — Website Design, Graphic Design, Video Editing — professional service cards with Font Awesome icons (no emoji)
5. **Stats / Numbers** — animated counter cards: 3+ Years Web Dev, 6+ Years Design, 15+ Projects, etc.
6. **Recent Projects** — latest 3-4 project cards preview with "View All" button
7. **GitHub Stats** — GitHub readme streak stats API use korbe: `https://github.com/DenverCoder1/github-readme-streak-stats` — username: `muhtasim-rahman`
8. **Testimonials / Reviews Preview** — "No reviews yet" placeholder ba actual reviews (Firebase theke)
9. **Call to Action** — "Let's work together" type section with contact button

Sobgular jonno alada CSS/JS files (`assets/css/home/section-name.css` and `assets/js/home/section-name.js`).

---

## Global Search Bar

Navbar er search icon e click korle ekta **animated overlay search bar** open hbe (full-width, smooth slide/fade animation).

**Features:**
- Real-time search as user types
- Point-based ranking algorithm — more relevant results get higher score
- Category-wise results: Pages, Projects, Blogs, Skills, Sections, etc.
- Each result shows: category label, title, short description snippet
- Click on result → direct oi page er oi section e navigate kore, 2-3 seconds er jonno oi section ta **highlight** hbe (glow/border effect)
- Keyboard navigation support (arrow keys, Enter, Escape)
- Empty state + loading state

---

## About Page

Full, detailed, professionally designed about page. `about.md` er sob information sundarভাবে present korbe.

**Sections:**
- Profile photo + name + title
- Bio (updated bio — not the old one verbatim, but inspired by it, well-written)
- Education Timeline — full timeline from Nursery to SSC-26 with years and institutions (interactive, visual)
- Skills — detailed skill breakdown with visual indicators (HTML/CSS ★★★★, AI ★★★★★, JS ★★☆, etc.)
- Experience — Web Dev 3+ yrs, Design 6+ yrs, Video Editing 5+ yrs
- Language Proficiency — Bengali, English, Hindi, Urdu with level indicators
- Tools & Platforms — VS Code, GitHub, Firebase, etc.
- Values & Personality — Islamic principles, discipline, honesty, perfection
- Interests / Hobbies — Font Awesome icons soho (no emoji)
- Social links / quick contact

---

## Projects Page

**List/Grid Toggle** — user switch korte parbe. Default: grid view.

**Grid View:**
- Card design — thumbnail, title, tags, category, short description, action links
- Hover animation on cards
- Responsive grid (3 col desktop, 2 col tablet, 1 col mobile)

**List View:**
- Left: thumbnail
- Right: title, short description, tags, category, links (GitHub, Live, PDF, Custom), action buttons

**Project Detail Page** (`/projects/slug`):
- URL change hbe (History API), no full page reload
- Full details: title, thumbnail, full content (HTML from TinyMCE), links, tags, category
- SEO meta update dynamically
- Breadcrumb: Home > Projects > Project Name
- **Comments section** — logged in users comment korte parbe (max 500 chars, text only). Spam: same post e 1hr e max 3 comments. User nijer comment edit/delete korte parbe.
- Share button — current URL copy kore
- Related projects suggestions

**Within-page search:**
- Advanced search engine shudhu projects er moddhe search korbe
- Result e highlight + navigate

**Data from Firebase Realtime DB:**
```
projects/{slug}:
  title, shortDescription, thumbnail (ImgBB URL),
  githubLink, liveLink, pdfLink, customLink,
  tags, category, content (HTML string),
  status (published/draft/hidden), featured (boolean),
  seoTitle, seoDesc, createdAt
```
Public page e shudhu `status === "published"` content dakhabe.

---

## Blogs Page

Projects page er moto same structure and logic. Additional fields:

```
blogs/{slug}:
  title, id (8-digit random), thumbnail, content (HTML),
  author, readingTime (auto-calculate from content length),
  coverImage, series, category,
  status (published/draft/hidden), pinned (boolean), createdAt
```

Blog detail e same comments system thakbe (same spam rules).

---

## Gallery Page

**Main page (`/gallery`):**
- Top section: 2-3 rows **videos** — YouTube/other iframe embeds, responsive
- Bottom section: **photos** — Facebook post style — ekta post e title + multiple images
- Click korle fullscreen preview (lightbox effect)
- "View All" buttons for sub-pages

**Sub-pages:**
- `/gallery/videos` — all videos
- `/gallery/photos` — all photos/posts

Sob admin panel theke manage hbe.

**Photos data structure:**
```
gallery/photos/{postId}:
  title, description, images (array of ImgBB URLs), status, createdAt
```

**Videos data structure:**
```
gallery/videos/{videoId}:
  title, description, iframeUrl, thumbnail, status, order, createdAt
```

---

## Contact Page

Main priority: User ke easily contact korano.

**3 separate forms:**
1. **General Contact** — name, email, subject, message, images (max 5)
2. **Bug Report** — name, email, bug title, description, steps to reproduce, images (max 5)
3. **Question / Query** — name, email, topic, question, images (max 5)

**Features:**
- Tab/card e form select
- Image upload: auto-compress before upload (ImgBB via Cloudflare Worker)
- Spam protection: logged in ba not — IP+email based — 1hr e max 2 submissions
- Login thakle name/email auto-fill
- Submit er por success/error state dakhabe
- Form provider: ami version er somoy bole dibo (Formspree / Firebase Realtime DB / EmailJS — jekono ekta)
- reCAPTCHA v3 integration (spam protection extra layer)

---

## Login / Signup

Alada pages, full-screen beautiful design. No reload — router diye load hbe.

**Signup Fields:**
- First name, Last name
- @username (unique — real-time availability check via Firebase)
- Email
- Password (strength indicator — requirements green/red toggle: 8+ chars, uppercase, number, special char)
- Confirm password
- Privacy & Cookies checkbox (link to policy pages)
- Submit button
- Divider: "or continue with"
- OAuth: Google, Microsoft, GitHub

Signup successful hole jei page e cilo sei page e redirect. Home page theke signup korle profile page e redirect.

**Login Fields:**
- Email or @username
- Password
- "Forgot Password?" → email reset flow
- Spam box check reminder
- OAuth same buttons

**Firebase Auth** — email/password + OAuth providers.

**`/logout`** route e gelew auto logout + redirect to home.

---

## User Profile & Account

**Profile Page (`/profile` — own, `/@username` — public):**

- Cover/banner image (top)
- Profile photo (circular, overlapping banner)
- Display name, @username
- Bio (single line, max 100 chars)
- Web URL link
- Social media links (max 5 — icons soho, user select platform + enter URL)
- **Account Badges** (admin assigned): admin, premium, verified, service taken, top fan, etc. — display only, user edit korte parbe na
- **Earned Badges** (milestone based): future-ready placeholder section
- Public profile stats (projects liked, reviews given, etc. — future-ready)

**Edit Profile:**
- Profile photo: crop (aspect ratio fixed) + compress + ImgBB upload
- Banner: crop + compress + ImgBB upload
- Name, username (live availability check — debounced)
- Bio (max 100 chars with counter)
- Description (longer, max 500 chars)
- Web URL
- Social media: dropdown e platform select (GitHub, LinkedIn, Facebook, YouTube, Instagram, X/Twitter, TikTok, Telegram) — max 5, icon soho dakhabe
- Location: city, division, country
- Visibility settings: public / private / logged-in-only per field

**Settings Icon (next to edit):**
- Change password (verify old, or send reset link)
- 2FA toggle (future-ready placeholder)
- Account public/private toggle

Sob data Firebase Realtime DB e save hbe:
```
users/{uid}:
  displayName, username, email, bio, description,
  webURL, socialLinks (array max 5), location,
  photoURL (ImgBB), bannerURL (ImgBB),
  badges (admin-assigned), earnedBadges,
  visibility settings, createdAt, lastSeen
```

---

## Public Reviews Section

Home page e dedicated reviews/testimonials section. Alada page o hote pare.

**Rules:**
- Logged in user shudhu review dite parbe
- Per account: 1 review only (pore shudhu edit)
- Star rating: 1-5
- Text: min 30 / max 1000 chars
- Images: max 3 (ImgBB upload)
- Verified badge admin assign korbe (admin panel theke toggle)
- Published/pending moderation system — admin approve korle public page e dakhabe

---

## Notifications System

**Navbar:** Notification bell icon — unread count badge. Click korle popup e notifications list.

**Notification data:**
```
notifications/{id}:
  title, message, type, target (all/loggedin/specific-uid),
  link, expiry, createdAt
```

User per notification read/unread state Firebase e save hbe.
Admin panel theke create, edit, delete, toggle hbe.

---

## Admin Panel

**Access:** `/admin` — direct access e admin verify hbe. Admin na hole 404 er moto page dakhabe — existence reveal korbe na.

**Admin UID:** Firebase Realtime DB Rules e hardcode thakbe — code e thakbe na. 4 ta admin UID support hbe (extensible structure).

**Layout:**
- Sidebar (collapsible — icon only + label)
- Main content area
- No main website navbar — shudhu "Back to Website" arrow top e
- Fully responsive — mobile e sidebar drawer

**Admin tabs and their features:**

**Dashboard:**
- Stats cards: total users, projects, blogs, comments, reviews, unread messages
- Recent activity feed
- Quick action buttons (Add Project, Add Blog, Add Notification)
- Recent users table (last 5)
- Recent comments (last 5)
- Site health: Firebase status, ImgBB status, TinyMCE status indicators

**Users:**
- Searchable, filterable table: name, username, email, role, status, joined date
- Per user: view profile, force edit, badge assign/remove, verified toggle, ban/unban, delete
- User detail modal: full activity log

**Projects:**
- List: thumbnail, title, status, tags, actions
- Add/Edit form: title, slug (auto-generate from title, editable), short description, thumbnail (ImgBB + compress level), GitHub/live/PDF/custom links, tags (comma-sep), category, TinyMCE editor (full content), status toggle (published/draft/hidden), featured toggle, SEO title/description
- Actions: preview, duplicate, change status, delete (confirm modal)

**Blogs:**
- Same as projects + author name, reading time (auto from content), cover image, series, category, pin toggle

**Gallery:**
- 2 sub-tabs:
  - *Photos*: Multi-image post — upload multiple, title, description, compress level select, status, edit/delete/hide
  - *Videos*: iframe embed URL, title, description, thumbnail, status, drag-drop reorder

**Comments:**
- All comments from projects + blogs
- Table: user, comment text (truncated), source (which project/blog), date, status
- Filter: all / pending / approved / flagged
- Actions: approve, flag, delete, view user profile
- Bulk: select all, bulk approve, bulk delete

**Reviews:**
- Moderate public reviews
- Table: user, star rating, text, image count, verified badge status, date, approval status
- Actions: approve/reject, verified badge toggle, delete
- Top: average rating + star distribution chart

**Messages:**
- Contact form submissions (all 3 types)
- Per message: full view modal, attachment preview, mark read/unread, star, delete
- Filter by type (general/bug/question) and status (read/unread/starred)

**Notifications:**
- Create notification: title, message, type, target (all/loggedin/specific user UID/username search), link, expiry date
- List of all notifications: edit, delete, active/inactive toggle

**Badges:**
- Account badges management (admin, premium, verified, service taken, top fan — admin assigned only)
- Earned badges management (milestone-based definitions — future-ready)
- Create badge: name, Font Awesome icon class, color, description, type (account/earned)
- Directly search user + assign badge

**Analytics:**
- Page views chart (daily/weekly/monthly)
- CV downloads count
- Top 5 projects by views
- Top 5 blogs by views
- User growth chart
- Comment + review activity over time
- Most active users list
- All charts interactive (Chart.js recommended)

**Logs:**
- Full admin action log: who, what, when
- Filter: by admin, action type, date range
- Exportable (CSV)

**Settings (sub-tabs):**
- *General*: site title, meta description, favicon URL, maintenance mode toggle, under-dev pages list (which pages show "under dev" badge)
- *Admin Profile*: name, avatar, password change, 2FA toggle (placeholder)
- *API Keys*: show/hide toggle for configured Cloudflare Worker variables (display only — never editable here)
- *CV/Resume*: upload PDF (ImgBB or direct link), toggle CV download button visibility
- *Cookies & Privacy*: cookie banner on/off, edit privacy policy + cookies policy content (TinyMCE)
- *Security*: admin UIDs list (read-only from Firebase Rules), login attempt log, banned IPs manage

**Admin UI Rules:**
- Sidebar collapsible (icon + label)
- Every table: pagination + per-page selector (10/25/50)
- Every delete action: confirmation modal
- Every action: toast notification (success/error)
- Loading skeleton when data fetching (see Global Skeleton Loading section below)
- Empty state with illustration (Font Awesome icon based)
- Bulk select with checkbox
- Firebase realtime listener — auto refresh on data change
- Fully responsive — mobile e sidebar drawer

---

## SEO

Protita page er jonno alada meta tags:
- `<title>` — dynamic, `site-config.js` theke siteName + page title
- `<meta name="description">`
- `<meta name="keywords">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">` — project/blog/gallery e thumbnail use, otherwise `preview.png`
- `<meta property="og:url">`
- `<meta name="twitter:card">`
- Canonical URL

Document title dynamic update hbe router navigation e.
Clean URL structure — `/projects/slug`, `/blogs/slug` etc.

---

## Navigation & Breadcrumb

- Home theke 1 level deep hole (e.g., `/projects`): navbar logo click e home e jabe
- Deeper pages (e.g., `/projects/slug`, `/profile/settings`, `/blogs/slug`): top e short **breadcrumb bar** dakhabe
  - Format: `Home > Projects > Project Name` — click kore back jawa jabe
  - Auto-detect based on current URL path
- User name/avatar e click korle public profile e navigate korbe — website jure

---

## Spam Protection Summary

| Feature | Limit |
|---------|-------|
| Contact form | Max 2/hr per user/IP |
| Comments (same post) | Max 3/hr |
| Review | 1 per account (edit only) |
| Login attempts | Lockout after 5 failures (Firebase handles partially) |

reCAPTCHA v3: contact form + signup e thakbe.

---

## Tracking

Admin panel Analytics e dakhabe:
- Total website visits (Firebase Analytics / custom counter)
- Per page visit count
- CV download count (button click e increment)

---

## ImgBB Image Naming Convention

Sob image upload e specific naming format follow korba:

| Image Type | Format |
|-----------|--------|
| User profile | `up_[uid]_[datetime].webp` |
| User banner | `pb_[uid]_[datetime].webp` |
| Contact form attachment | `cf_[uid]_[datetime].webp` |
| Project thumbnail | `pt_[project-slug]_[datetime].webp` |
| Blog thumbnail | `bt_[blog-slug]_[datetime].webp` |
| Gallery photo | `gm_[post-id]_[datetime]-001.webp`, `-002.webp` etc. |
| Review image | `rv_[uid]_[datetime].webp` |

**Image upload flow:**
1. User selects image
2. Crop interface (aspect ratio based on type — profile: 1:1, banner: 16:9, etc.)
3. Compress level select: High / Medium / Low / None
4. Convert to WebP
5. Upload via Cloudflare Worker (portfolio.programs-turzo.workers.dev/upload-image)
6. Store returned ImgBB URL in Firebase

Advanced library use korbe crop + compress er jonno (Cropper.js + browser-image-compression).

---

## Firebase Realtime Database Rules

Full, advanced, secure rules diba. Structure:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    
    "users": {
      "$uid": {
        ".read": "auth !== null && (auth.uid === $uid || root.child('admins').child(auth.uid).exists())",
        ".write": "auth !== null && (auth.uid === $uid || root.child('admins').child(auth.uid).exists())"
      }
    },
    
    "admins": {
      ".read": "auth !== null && root.child('admins').child(auth.uid).exists()",
      ".write": false
    },
    
    "projects": {
      ".read": true,
      "$slug": {
        ".write": "auth !== null && root.child('admins').child(auth.uid).exists()"
      }
    },
    
    "blogs": {
      ".read": true,
      "$slug": {
        ".write": "auth !== null && root.child('admins').child(auth.uid).exists()"
      }
    },
    
    "comments": {
      ".read": true,
      "$commentId": {
        ".write": "auth !== null",
        ".validate": "newData.hasChildren(['userId', 'text', 'postSlug', 'createdAt'])"
      }
    },
    
    "reviews": {
      ".read": true,
      "$uid": {
        ".write": "auth !== null && auth.uid === $uid"
      }
    },
    
    "gallery": {
      ".read": true,
      ".write": "auth !== null && root.child('admins').child(auth.uid).exists()"
    },
    
    "notifications": {
      ".read": "auth !== null",
      ".write": "auth !== null && root.child('admins').child(auth.uid).exists()"
    },
    
    "messages": {
      ".read": "auth !== null && root.child('admins').child(auth.uid).exists()",
      ".write": true
    },
    
    "analytics": {
      ".read": "auth !== null && root.child('admins').child(auth.uid).exists()",
      ".write": true
    },
    
    "logs": {
      ".read": "auth !== null && root.child('admins').child(auth.uid).exists()",
      ".write": "auth !== null && root.child('admins').child(auth.uid).exists()"
    }
  }
}
```

Admin UIDs `admins/{uid}: true` hisebe Realtime DB e store thakbe — hardcoded in DB rules, 4ta admin slot support korbe.

---

## Under Development Badge

Kono page ba section incomplete thakle ba pore add hbe eirokom hoile chhoto ekta `under-dev` badge dakhabe. `site-config.js` er `underDev` array e page name thakle auto badge show korbe.

---

## Global Skeleton Loading

**Rule:** Website e joto jaygay kono data load hoy — Firebase theke, API theke, image theke — sob jaygay **skeleton loading UI** dakhabe. Kono spinner/text-only "loading..." acceptable na. Skeleton loading mandatory.

**Skeleton kothay kothay lagbe (complete list):**

| Section / Page | Skeleton Shape |
|----------------|---------------|
| Navbar (user avatar/name) | Circular skeleton + short bar |
| Hero section (initial load) | Multi-line text bars + right-side image block |
| Home — any section with Firebase data | Section er content er exact shape er skeleton |
| Projects list (grid view) | Card-shaped skeletons (thumbnail rect + text bars) |
| Projects list (list view) | Row-shaped skeletons (left rect + right text bars) |
| Project detail page | Full-width image skeleton + multi-line text blocks |
| Blogs list | Same as projects |
| Blog detail | Same as project detail + author bar |
| Gallery — photos | Masonry/grid shaped image skeletons |
| Gallery — videos | 16:9 ratio video placeholder skeletons |
| About page | Profile photo circle + text bars + timeline skeletons |
| Profile page | Banner rect + circle avatar + text bars |
| /@username public profile | Same as profile |
| Notifications popup | List of row skeletons |
| Search results | Result row skeletons |
| Comments section | Avatar circle + text bar rows |
| Reviews section | Star row + text block skeletons |
| Admin — all tables | Row skeletons matching column count |
| Admin — dashboard stats cards | Card-shaped number skeletons |
| Admin — charts | Rectangle chart area skeleton |
| Any modal with data | Content area skeleton |
| Image loading (everywhere) | Same-size background skeleton behind image |

**Implementation Rules:**
- CSS-only skeleton animation — `@keyframes shimmer` with gradient sweep effect (na hole `background: linear-gradient` + animation)
- Skeleton color: light mode e `#e2e8f0` → `#f8fafc`, dark mode e `#1e293b` → `#334155` — CSS variables diye
- Real content ashle skeleton fade out hbe — smooth transition
- Skeleton er shape exactly match korbe real content er shape — jaate layout shift na hoy
- `assets/css/style.css` e global `.skeleton` and `.skeleton-shimmer` class define korba — sob jaygay reuse hbe
- Skeleton timing: shimmer animation 1.5s infinite

**Example skeleton CSS structure:**
```css
.skeleton {
  background: var(--skeleton-base);
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, var(--skeleton-highlight) 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## Home Page — Featured Projects (Admin Controlled)

Home page er "Recent Projects" section e **6 ta project** dakhabe. Kon 6ta dakhabe seta **admin panel theke select korbe** — automatic "latest 6" na.

**Admin Panel — Projects tab e:**
- Har project er row e ekta **"Feature on Home"** toggle/checkbox thakbe
- Admin jei 6ta project e toggle ON korbe, shei 6ta home page e dakhabe
- 6 tar beshi select kora jabe na — 6ta already selected thakle notun ekta select korte gele warning dakhabe: "Home page e max 6ta project featured korte paro. Agerta remove kore notun add koro."
- 0 ta featured thakle home section e "No featured projects" placeholder dakhabe (admin only visible, public e section hide thakbe)

**Firebase data:**
```
projects/{slug}:
  ...
  featured: true/false    ← existing field, same field use hbe
  featuredOrder: 1-6      ← display order (drag-drop reorder kora jabe admin e)
```

Home page e projects load howar somoy: `featured === true` query kore max 6ta nibe, `featuredOrder` onujayi sorted.

---

## Per-Version Deliverables

Proti major version shes e:

**1. ZIP File:**
- Root folder name: `mdturzo-portfolio-vX.X.0/`
- Sob files included, nothing missing
- .firebaserc, firebase.json included

**2. GitHub Commit Message:**
```
vX.X.0 — [One line descriptive summary]

Description:
- [Change 1]
- [Change 2]
- [Change 3]
(Max 10 lines)
```

**3. Website Status:** Fully runnable — no broken pages, no console errors, no missing files.

---

## Personal Information Reference

Owner: **Muhtasim Rahman (Turzo)**
Full Name: Md Muhtasim Rahman Mahmud
Email: mdturzo.dev@gmail.com
Location: Nilphamari, Bangladesh
GitHub: muhtasim-rahman
New Site: https://mdturzo.web.app
Old Site: https://mdturzo.odoo.com
Fake DOB (for age display): 2007-09-13

Social handles `mdturzo999`: Facebook, Instagram, YouTube, X/Twitter, LinkedIn, Threads
Social handles `mdturzo16`: TikTok, Telegram

**Skills (self-rated, 2026):** AI ★★★★★, HTML ★★★★, CSS ★★★★, Git ★★★★, Python ★★★, JavaScript ★★, Java ★★
**Experience:** Web Dev 3+ yrs, Graphic Design 6+ yrs, Video Editing 5+ yrs
**Education:** Currently SSC-26 (exam ongoing), next HSC, goal: CSE
**Values:** Islamic principles first, halal income, honesty, discipline, perfection

> `about.md` and `projects.md` files ami relevant version e provide korbo — sekhane sob detail ache. Oi file theke info nio.

---

*This master prompt is always provided at the start of each new version chat. User will specify which version to build. Only build that version.*
