# 🗂️ projects.md — Muhtasim Rahman (Turzo)
> **All projects from the beginning until now, sorted newest → oldest.**
> Sources: GitHub (muhtasim-rahman), mdturzo.odoo.com, live previews, and personal input.
> Last updated: April 2026

---

## 📌 PROJECT INDEX

| # | Project Name | Type | Year | Status |
|---|---|---|---|---|
| 1 | [FMT Tracker Pro (UFMT-SSC26)](#1-fmt-tracker-pro--ufmt-ssc26) | Web App / PWA | 2025–2026 | 🔧 Active (Beta) |
| 2 | [Functional Notification Panel](#2-functional-notification-panel) | Web Component / Tool | 2024–2025 | ✅ Complete |
| 3 | [Odoo Website Assets](#3-odoo-website-assets) | Dev Tool / Asset Repo | 2024 | 🔧 Active |
| 4 | [mdturzo.odoo.com — Portfolio V2](#4-mdturooodoocom--portfolio-v2) | Portfolio Website | 2024–2025 | ✅ Active |
| 5 | [SGSC Web Campus](#5-sgsc-web-campus) | Institutional Website | 2024 | ⚠️ Possibly Offline |
| 6 | [Halal — The World of Muslims](#6-halal--the-world-of-muslims) | Islamic Web App | 2024 | ✅ Published |
| 7 | [Web Templates Collection 2023](#7-web-templates-collection-2023) | Template Showcase | 2024 | ✅ Published |
| 8 | [Turzo Express — E-Commerce](#8-turzo-express--e-commerce) | E-Commerce UI | 2024 | ✅ Published |
| 9 | [Master Chef — Restaurant](#9-master-chef--restaurant) | Restaurant Website UI | 2024 | ✅ Published |
| 10 | [Study With Muhtasim](#10-study-with-muhtasim) | Teacher/Course Website | 2024 | ✅ Published |
| 11 | [Turzo \| The Blogger](#11-turzo--the-blogger) | Blog Website UI | 2023–2024 | ⚠️ Status Unknown |
| 12 | [Portfolio 2023](#12-portfolio-2023) | Personal Portfolio | 2023 | ✅ Published |
| 13 | [Basic CV](#13-basic-cv) | CV / Resume Website | 2023 | ✅ Published |
| 14 | [CSS Calculator Design](#14-css-calculator-design) | UI Design / Practice | 2023–2024 | ✅ Published |
| 15 | [GitHub Profile README](#15-github-profile-readme) | GitHub Profile Page | 2024 | ✅ Active |
| 16 | [turzo.odoo.com — Portfolio V1](#16-turooodoocom--portfolio-v1) | Portfolio Website (Old) | ~2023–2024 | ❌ Discontinued |

---
---

## ✦ DETAILED PROJECT ENTRIES

---

### 1. FMT Tracker Pro — UFMT-SSC26

> **"Smart Merit Tracking Dashboard for SSC-26 Students"**

| Field | Details |
|---|---|
| **Full Name** | FMT Tracker Pro — Udvash FMT Tracker (SSC-26) |
| **Tagline** | Smart Merit Tracking Dashboard — Track your exam rank & analytics in real-time |
| **Type** | Progressive Web App (PWA) / Personal Tool |
| **Category** | Education / Productivity |
| **Year** | 2025–2026 |
| **Status** | 🔧 Active Beta — Version V19.3 |
| **Language** | Bangla (Bengali) UI |
| **Live Preview** | https://muhtasim-rahman.github.io/UFMT-SSC26/ |
| **GitHub** | https://github.com/muhtasim-rahman/UFMT-SSC26 |
| **Platform** | Browser + Installable PWA (Android/Desktop) |

**Description:**
A full-featured web dashboard built for SSC-26 batch students (specifically for Udvash coaching center FMT exams) to track merit position and exam performance over time. Uses Google Sheets as a free cloud database/backend. Fully in Bengali language.

**Key Features:**
- 🔐 6-digit PIN security system with auto-verify
- 📊 Branch Merit & Central Merit tracking with real-time charts (Chart.js)
- 📚 Subject-wise data entry — marks, merit, syllabus tracking
- 📈 Progress graphs: branch merit trend, central merit trend, subject-wise analytics
- 🌙 Dark mode toggle
- 📴 Offline support via Service Worker (LocalStorage cache)
- 📲 PWA installable on mobile/desktop
- 📤 Data export: Excel, PDF, Print, Google Sheets
- 🔔 Reminder/notification system
- ⚙️ Settings: PIN change, 4th subject GPA toggle, notification schedule
- 🔄 Factory reset option
- ♾️ Infinity pagination + row count selector

**Tech Stack:**
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Charts: Chart.js
- Backend/DB: Google Sheets + Google Apps Script (JSON API)
- Offline: Service Worker (`sw.js`) + LocalStorage
- PWA: `manifest.json`
- Settings Sync: Google Sheets

**GitHub Stats:** 15 commits · 6 release tags (v-tagged versioning) · JS 51.5%, CSS 27%, HTML 21.5%

**SEO Meta Tags (Suggested):**
```
title: "FMT Tracker Pro | Udvash Merit Tracker SSC-26"
description: "Smart web dashboard for tracking SSC-26 exam merit positions. Branch & central merit, subject analytics, PWA. Built by Muhtasim Rahman."
keywords: "SSC 26, FMT tracker, Udvash, merit position, merit rank tracker, SSC exam, Bangladesh student"
og:title: "FMT Tracker Pro — SSC-26 Merit Dashboard"
og:image: [app screenshot]
lang: bn
```

**Notes:**
- Personal use project, not yet stable for all users
- Version V19.3 as of April 2026 — actively maintained
- "UFMT" = Udvash FMT (Full Mock Test)

---

### 2. Functional Notification Panel

> **"Dynamic notification system powered by Google Sheets — plug and play for any website"**

| Field | Details |
|---|---|
| **Tagline** | A plug-and-play notification panel powered by Google Sheets |
| **Type** | Web Component / Reusable Tool |
| **Category** | UI Component / Open Source Tool |
| **Year** | December 2024 — January 2025 |
| **Status** | ✅ Complete / Published |
| **Live Preview** | https://muhtasim-rahman.github.io/notification-panel/ |
| **GitHub** | https://github.com/muhtasim-rahman/notification-panel |
| **Currently Used In** | mdturzo.odoo.com (integrated into main portfolio) |

**Description:**
A fully functional, reusable notification panel component that fetches data from a Google Sheet and displays it dynamically on any website. Built as a standalone widget with no backend server required.

**Key Features:**
- 📥 Loads notifications dynamically from Google Sheets via Apps Script JSON endpoint
- ✅ Mark as Read / Unread per notification
- ⭐ Mark as Important / Unimportant
- 🚩 Report notification
- 🗂️ Tab navigation: All / Unread / Important
- 📄 Pagination for smooth UX
- 🔴 Real-time unread badge count
- 💾 LocalStorage: persists read/unread state between visits
- 📱 Fully responsive — mobile & desktop
- 🎨 Font Awesome icons

**Architecture:**
```
Google Sheet (data source)
  → Google Apps Script (JSON endpoint)
    → JavaScript fetch()
      → DOM rendering
        → LocalStorage (user state)
```

**Tech Stack:** HTML, CSS, JavaScript · Google Sheets + Apps Script · Font Awesome · LocalStorage

**GitHub Stats:** 19 commits · Has "Old versions" folder (shows iterative dev) · JS 52.5%, CSS 36.6%, HTML 10.9%

**Files:**
- `index.html` — demo page
- `script.js` — core panel logic
- `style.css` — panel styles
- `Main/` — production version
- `Old versions/` — previous iterations

**SEO Meta Tags (Suggested):**
```
title: "Notification Panel | Google Sheets Powered — Muhtasim Rahman"
description: "A dynamic, plug-and-play notification panel powered by Google Sheets. Mark read/unread, paginate, responsive. Free & open source."
keywords: "notification panel, google sheets notification, web component, javascript notification, free notification widget"
```

---

### 3. Odoo Website Assets

> **"External CSS/JS asset repository powering mdturzo.odoo.com"**

| Field | Details |
|---|---|
| **Tagline** | Custom CSS & JavaScript assets for Odoo-based websites |
| **Type** | Developer Asset Repository / CDN-style Hosting |
| **Category** | Dev Tool / Web Infrastructure |
| **Year** | September 2024 — Ongoing |
| **Status** | 🔧 Active (under development) |
| **Live Overview** | https://muhtasim-rahman.github.io/odoo-website-assets/mdturzo.odoo.com/ |
| **GitHub** | https://github.com/muhtasim-rahman/odoo-website-assets |
| **Used By** | mdturzo.odoo.com |

**Description:**
A repository that hosts all custom CSS and JavaScript files for Turzo's Odoo-based websites. Instead of keeping custom code locked inside the Odoo builder, files are stored on GitHub Pages and loaded externally — enabling version control, easy updates, and separation of concerns.

**Assets Hosted:**
- `styles.css` — Custom styles for mdturzo.odoo.com
- `scripts.js` — Custom JS for mdturzo.odoo.com

**Features Built with These Assets:**
- Custom scrollbar design
- Mega navigation menu
- Floating animated share sidebar
- Advanced custom search bar (with YouTube thumbnail support)
- Pull-to-refresh (built, later disabled due to bug)
- Navbar responsive fixes

**Why This Is Notable:**
This is an unconventional but smart solution — using GitHub Pages as a free CDN to serve assets for an Odoo website. Shows understanding of external resource management and version control in a constrained platform.

---

### 4. mdturzo.odoo.com — Portfolio V2

> **"Professional portfolio website — web dev, design, and eLearning in one place"**

| Field | Details |
|---|---|
| **Tagline** | Web Developer · Editor · Student — Muhtasim Rahman's Portfolio |
| **Type** | Full Portfolio Website |
| **Category** | Personal Portfolio |
| **Year** | August 2024 — Present |
| **Status** | ✅ Active (current main website) |
| **Live URL** | https://mdturzo.odoo.com |
| **Platform** | Odoo 18.0 (Website Builder) |
| **Will Be Replaced By** | https://mdturzo.web.app (Firebase — in development) |

**Description:**
The current live portfolio website built with Odoo's website builder. Rebuilt from scratch in August 2024, upgraded to Odoo v18 in January 2025. Features multiple sections, a custom notification system, eLearning platform, and gallery.

**Pages / Sections:**
- 🏠 Home — Banner, services overview, gallery preview
- 🛠️ Services — Website design, eLearning, photo/video editing
- 🖼️ Gallery — Photos, Videos, Projects sub-sections
- 👤 About — Bio, Education, Skills, Work Experience
- 📚 Courses (eLearning) — Free online courses (1 published, more planned)
- 📜 Update History — Detailed changelog since August 2024
- 📞 Contact — Contact form

**Custom Features Built:**
- Custom scrollbar + dark scrollbar design
- Mega navigation menu with icon (responsive)
- Floating share sidebar (animated hover effects)
- Advanced custom search bar (YouTube thumbnail support, in gallery pages)
- Google Sheets–powered Notification Panel (integrated Dec 2024)
- Custom 404 page
- Pull-to-refresh (disabled)
- eLearning leaderboard (Turzo ranked #1 · 2545 XP · Master)

**Stats:**
- 4.5 years experience (claimed)
- 10+ demo projects
- 3 exclusive services

**SEO Meta Tags (from site):**
```
title: "Muhtasim Rahman (Turzo) - Web developer and Editor - Student"
description: "Dedicated web developer passionate about creating user-friendly and visually stunning websites."
```

---

### 5. SGSC Web Campus

> **"Official online presence for Saidpur Govt. Science College — built by a student, for the school"**

| Field | Details |
|---|---|
| **Tagline** | Official online campus for Saidpur Govt. Science College |
| **Type** | Institutional Website |
| **Category** | Volunteer / Community Project |
| **Year** | 2024 |
| **Status** | ⚠️ Uncertain — URL returned 404 as of April 2026 |
| **URL** | https://sgsc.odoo.com |
| **Platform** | Odoo Website Builder |
| **Developer** | Solo — Muhtasim Rahman only |
| **Cost to client** | Free / Volunteer |

**Description:**
Built voluntarily as a student of Saidpur Govt. Science College to manage the college's online presence. Primary focus was on the 4 newly established clubs at the college.

**Features:**
- College clubs page — managing 4 student clubs
- Online presence / information management
- Odoo-based CMS

**Why It Matters:**
This is Turzo's first real-world (non-personal) institutional project. Demonstrates ability to build for clients/institutions and do volunteer technical work.

**⚠️ Status Note:** As of April 2026, sgsc.odoo.com returns a 404 error. Possibly moved, taken down, or domain changed. Needs confirmation.

---

### 6. Halal — The World of Muslims

> **"An Islamic resource website — the Five Pillars of Islam in an interactive format"**

| Field | Details |
|---|---|
| **Tagline** | Halal \|\| The world of Muslims — Islamic knowledge and resources |
| **Type** | Islamic Content Website |
| **Category** | Islamic / Educational |
| **Year** | 2024 (active development: 71 commits) |
| **Status** | ✅ Published |
| **Live Preview** | https://muhtasim-rahman.github.io/halal |
| **GitHub** | https://github.com/muhtasim-rahman/halal |
| **PDF** | https://drive.google.com/file/d/1gODNtJVruqN6vwbHEy7HlkBSngl_f7jN/view |

**Description:**
A website dedicated to Islamic knowledge and resources, structured around the Five Pillars of Islam. Features interactive popup modals for details on each pillar. Most actively committed project in Turzo's GitHub — 71 commits total.

**Content Sections (Five Pillars):**
- Iman (Faith)
- Salah (Prayer)
- Sawm (Fasting during Ramadan)
- Zakah (Charity)
- Hajj (Pilgrimage to Mecca)

**Technical Details:**
- Modal popups for detailed info on each data row
- Navigation: Home, Table of Contents, About Us, Contact
- Logo: custom halal-logo.png

**File Structure:**
```
halal/
├── index.html
├── about.html
├── contact.html
├── images/
├── scripts/
└── styles/
```

**Tech Stack:** HTML 55.7%, CSS 37.5%, JavaScript 6.8%

**GitHub Stats:** 71 commits (most of any repo) · 1 Star · 1 Watcher

**SEO Meta Tags (Suggested):**
```
title: "Halal | The World of Muslims — Five Pillars of Islam"
description: "An interactive Islamic resource website covering the Five Pillars of Islam — Iman, Salah, Sawm, Zakah, Hajj. Built with HTML, CSS & JavaScript."
keywords: "halal, Islam, Five Pillars of Islam, Islamic website, Muslim resources, Quran, iman, salah, sawm, zakah, hajj"
```

---

### 7. Web Templates Collection 2023

> **"A free showcase of all my 2023 HTML/CSS web templates — pick and use"**

| Field | Details |
|---|---|
| **Tagline** | Free HTML & CSS web templates — portfolio, e-commerce, restaurant, blog & more |
| **Type** | Template Showcase Website |
| **Category** | Open Source / Portfolio Showcase |
| **Year** | 2024 (collection of 2023 work) |
| **Status** | ✅ Published |
| **Live Preview** | https://muhtasim-rahman.github.io/web-templets-2024.2 |
| **GitHub** | https://github.com/muhtasim-rahman/web-templets-2024.2 |
| **PDF** | https://drive.google.com/file/d/1H7tlUqZtkRSkQ9ZCv3neozY1DRhd80CQ/view |

**Description:**
A single website that showcases all of Turzo's web templates from 2023. Each template is listed with a preview and a link to the full live template. Built with HTML, CSS, and Bootstrap. Responsive.

**Templates Listed:**
1. Portfolio Design 2023 (About Me)
2. Study With Muhtasim (Teacher Website)
3. Turzo | The Blogger (Blog Website)
4. Master-Chef (Restaurant Website)
5. Turzo Express (E-Commerce Website)
6. Basic-CV (About Me / CV)

**Tech Stack:** HTML, CSS, Bootstrap (Responsive)

---

### 8. Turzo Express — E-Commerce

> **"A responsive e-commerce UI with product listings, cart, filters, and pagination"**

| Field | Details |
|---|---|
| **Tagline** | Turzo Express — Your one-stop online shopping destination |
| **Type** | E-Commerce Website (Frontend Only) |
| **Category** | UI Design / Practice Project |
| **Year** | 2024 |
| **Status** | ✅ Published (Static — no backend) |
| **Live Preview** | https://muhtasim-rahman.github.io/turzo-express |
| **GitHub** | https://github.com/muhtasim-rahman/turzo-express |
| **PDF** | https://drive.google.com/file/d/1SKkoFSw7wDegUgpltdhY600F9fVqCe0m/view |

**Description:**
A visually complete e-commerce website with product listings, category filters, price range filters, sorting options, and pagination. Includes pages for Register, Login, Cart, Profile, and Contact. No JavaScript functionality — design and layout only.

**Pages:**
- Home / Product Listing
- Individual Product Page
- Cart (shows "2 Products - $249.60")
- Register / Login / Logout pages
- Profile page
- Contact page

**Products Shown:**
- Sony V-4 Headphone ($59.99, 4.5★)
- DSLR Camera ($599.99, 4.7★)
- Apple Watch Ultra ($799.99, 4.9★)
- Shoes ($19.99, 4★)
- Apple Earbuds ($197.61, 4.5★)
- COCOOIL Perfume ($9.38, 4.5★)
- + More (pagination: 102+ pages implied)

**Features Visible in UI:**
- Category sidebar (Phones, Tablets, TVs, Computers, Laptops, Headphones, Earbuds)
- Price range filter ($0–200+)
- Shipping option filter (Free/Paid)
- Sort by: Top Sold, New Arrival, Best Discount, Price Low/High
- Stock count per item
- Rating display
- Promo banner: "50% off This Week"
- Newsletter subscribe

**Tech Stack:** HTML, CSS (Responsive) — Copyright "Turzo Express 2024.1"

**SEO Meta Tags (Suggested):**
```
title: "Turzo Express — E-Commerce Website Template | Muhtasim Rahman"
description: "A responsive e-commerce frontend project with product listings, filters, cart, and pagination. Built with HTML and CSS."
keywords: "e-commerce template, HTML CSS e-commerce, shopping website template, responsive web design, turzo express"
```

---

### 9. Master Chef — Restaurant

> **"Elegant restaurant website with menu, about section, and contact — fully responsive"**

| Field | Details |
|---|---|
| **Tagline** | Master Chef Restaurant — Fine Dining Experience |
| **Type** | Restaurant Website (Frontend Only) |
| **Category** | UI Design / Practice Project |
| **Year** | 2024 |
| **Status** | ✅ Published (Static — no backend) |
| **Live Preview** | https://muhtasim-rahman.github.io/master-chef |
| **GitHub** | https://github.com/muhtasim-rahman/master-chef |
| **PDF** | https://drive.google.com/file/d/1WggmuUO4mBd7IHeYQoTncIaI3LajY1mO/view |

**Description:**
A fine dining restaurant website with a full menu, about section, and contact info. Clean, elegant design. Fully responsive across devices.

**Sections:**
- Hero: "Master Chef Restaurant — 25% discount for take away"
- About Us: Fine dining narrative, international + local cuisine, vegetarian/vegan options
- Food Menu: Items with images, ratings, prices (BDT)
- Contact: Address, phone, opening hours

**Menu Items:**
- Burger — 149 Tk ★★★★☆
- Pancake — 199 Tk ★★★☆☆
- Salad — 99 Tk ★★★☆☆
- Pizza — 499 Tk ★★★★★

**Tech Stack:** HTML, CSS (Responsive) — Copyright "Master Chef Restaurant 2024.1"

**SEO Meta Tags (Suggested):**
```
title: "Master Chef Restaurant — HTML CSS Template | Muhtasim Rahman"
description: "Elegant fine dining restaurant website template built with HTML and CSS. Includes menu, about section, and contact."
keywords: "restaurant website template, HTML CSS restaurant, fine dining website, responsive restaurant, master chef"
```

---

### 10. Study With Muhtasim

> **"An online teacher/tutoring website — free courses and tutorials"**

| Field | Details |
|---|---|
| **Tagline** | Study With Turzo — Learn Something New! |
| **Type** | Teacher / Online Tutoring Website (Frontend Only) |
| **Category** | Education / UI Design |
| **Year** | 2024 |
| **Status** | ✅ Published (Static — no backend/actual courses) |
| **Live Preview** | https://muhtasim-rahman.github.io/study-with-muhtasim |
| **GitHub** | https://github.com/muhtasim-rahman/study-with-muhtasim |
| **PDF** | https://drive.google.com/file/d/1gPhSve63b6FLeElXBgvX-LgIHlAPC6al/view |

**Description:**
A visually complete online tutoring/teacher website. Sections include Home, About Me, Tutorials (Web Development focused), Testimonials/Feedback, and Contact. Testimonials are placeholder content with names "Rahat Azad", "Razib Azad", "Riad Azad". Copyright "Md. Turzo 2024.2"

**Sections:**
- Hero: "Learn Something New!!!" + Subscribe
- Features: 3 "Free to use" cards
- About Me: Personal bio
- Tutorials: 8 Web Development cards
- Feedback: 3 testimonials (slider)
- Contact: Form with validation

**Tech Stack:** HTML, CSS, Bootstrap (Responsive) — Copyright "Md. Turzo 2024.2"

---

### 11. Turzo | The Blogger

> **"A blog website template — clean layout for articles and posts"**

| Field | Details |
|---|---|
| **Tagline** | Turzo \| The Blogger — Read. Think. Grow. |
| **Type** | Blog Website (Frontend Template) |
| **Category** | UI Design / Blog |
| **Year** | 2023–2024 |
| **Status** | ⚠️ Exists as template — direct URL unknown |
| **Live Preview** | Listed in Web Templates Collection (https://muhtasim-rahman.github.io/web-templets-2024.2) |
| **GitHub** | Possibly private or in a sub-folder |
| **Notes** | Visible in old website gallery and templates collection, but standalone URL not confirmed |

**Description:**
A blog website template built with HTML and CSS. Listed as one of Turzo's 2023 templates in the web templates collection. Exact pages/content unknown but it was featured alongside the other major templates (e-commerce, restaurant, etc.)

**⚠️ Action Needed:** Find the actual URL/repo for this project and confirm its current status.

---

### 12. Portfolio 2023

> **"My first personal portfolio — built while learning CSS"**

| Field | Details |
|---|---|
| **Tagline** | Muhtasim Rahman — Student & Web Developer · Portfolio 2023 |
| **Type** | Personal Portfolio Website |
| **Category** | Portfolio / Learning Project |
| **Year** | 2023 |
| **Status** | ✅ Published |
| **Live Preview** | https://muhtasim-rahman.github.io/portfolio-2023 |
| **GitHub** | https://github.com/muhtasim-rahman/portfolio-2023 |
| **PDF** | https://drive.google.com/file/d/1RXsRpIrT0_dPM9hlBAT7y6Lt19QEt0Td/view |

**Description:**
The very first personal portfolio website, created while still learning CSS. Built with HTML and CSS only. Fully responsive. Documents Turzo's earliest public web presence. Says "Class 8, 2023" internally.

**Sections:**
- Hero: "I am a Student & Web Developer" (with weather icon decoration)
- About Me: Personal bio, address, email, phone (partial), CV link
- Work Experience: "Nothing to show — As a student I have no work experience"
- Education: Full education timeline up to Class 7 Pass
- Skills: Java, HTML, CSS, Bootstrap, JS, JSON, jQuery, Authentication, Python
- Contact Me: Form

**Historical Significance:**
- First mention of **Anisul Islam** (YouTube tutor) as primary teacher
- First public mention of wanting to become a "Computer Engineer"
- Address visible: Chandnagar, Saidpur (5310), Nilphamari
- Skills listed include jQuery, JSON, Authentication — which are newer than what's on GitHub README

**Tech Stack:** HTML, CSS (Responsive) — Copyright "Muhtasim Rahman - 2023"

**SEO Meta Tags (Suggested):**
```
title: "Portfolio | Muhtasim Rahman (Turzo) — 2023"
description: "Personal portfolio of Muhtasim Rahman (Turzo), student and web developer from Saidpur, Bangladesh. Built with HTML and CSS."
keywords: "Muhtasim Rahman, Turzo, web developer, student, portfolio, HTML CSS, Bangladesh, Saidpur"
```

---

### 13. Basic CV

> **"A simple CV/resume website — clean and printable"**

| Field | Details |
|---|---|
| **Tagline** | Md Turzo — Student & Web Developer · CV/Resume |
| **Type** | CV / Resume Website |
| **Category** | Learning Project / CV |
| **Year** | 2023 |
| **Status** | ✅ Published (not responsive for small screens) |
| **Live Preview** | https://muhtasim-rahman.github.io/basic-cv |
| **GitHub** | https://github.com/muhtasim-rahman/basic-cv |
| **PDF** | https://drive.google.com/file/d/1TeHFnrvJVru6nJFtGwjX3FgEvGM/view |

**Description:**
A simple single-page CV/resume built with HTML and basic CSS. Not mobile responsive (desktop only). Features personal info, skill rating table, education timeline, and social links.

**Sections:**
- Personal info + profile photo
- Personal bio paragraph
- Work Experience / History table
- Skills: Java ★★☆☆☆, HTML ★★★★☆, CSS ★★★☆☆
- Education timeline
- Social links: Facebook, Instagram, Twitter(X), YouTube, WhatsApp

**Historical Notes:**
- Old YouTube channel linked: `@Muhtasim_Rahman_` (before rebranding to @mdturzo999)
- Old Twitter: `@MdTurzo16` (before changing to @mdturzo999)
- Shows earliest skill self-rating

**Tech Stack:** HTML, CSS (NOT responsive) — Copyright "Md. Turzo 2023"

---

### 14. CSS Calculator Design

> **"A pixel-perfect calculator UI — design-only, no functionality"**

| Field | Details |
|---|---|
| **Tagline** | CSS Calculator Design — Pure HTML & CSS |
| **Type** | UI Design / CSS Practice |
| **Category** | Learning Project |
| **Year** | 2023–2024 |
| **Status** | ✅ Published (design only — no JS) |
| **Live Preview** | https://muhtasim-rahman.github.io/css-calculator-design |
| **GitHub** | https://github.com/muhtasim-rahman/css-calculator-design |
| **PDF** | https://drive.google.com/file/d/1eg836DCwH4A9Pe1fNkyApNJzR6vEkZCf/view |

**Description:**
A visual calculator interface built purely with HTML and CSS. Intentionally has no JavaScript — the purpose was to practice pure CSS layout and design. Shows ability to recreate familiar UI patterns with just HTML/CSS.

**Note:** Page title is simply "Calculator" — minimal project, no meta description.

**Tech Stack:** HTML, CSS

---

### 15. GitHub Profile README

> **"GitHub profile page with personal intro, skills table, and stats"**

| Field | Details |
|---|---|
| **Tagline** | 🤝 Assalamu Alikum — Let's connect! |
| **Type** | GitHub Profile Page (special README repo) |
| **Category** | Personal Branding / GitHub |
| **Year** | 2024 |
| **Status** | ✅ Active |
| **Live URL** | https://github.com/muhtasim-rahman |
| **GitHub** | https://github.com/muhtasim-rahman/muhtasim-rahman |
| **Stars** | 1 |

**Description:**
The special GitHub profile README that appears on the profile homepage. Contains a banner image, profile photo, bio, education timeline, skills table (with star ratings), language proficiency, hobbies/sports, and GitHub stats cards.

**Content:**
- Banner image
- Profile photo
- Bio: "Student & Web Developer" — "I love programming"
- Education list (Nursery → Class 9 as written)
- Skills table: Java ★★☆, Python ★★★, HTML ★★★★, CSS ★★★★, Bootstrap ★★★, JavaScript ★★☆, Git ★★★★
- Languages: Bengali (Native), English (Advanced), Hindi (Communicative)
- Sports/Hobbies: Prayer, Programming, Cricket, Football, Swimming, Cycling, Walking, Travelling
- GitHub stats card + Top Languages card (from github-readme-stats)

**Achievements on GitHub:** YOLO · Quickdraw · Pull Shark

---

### 16. turzo.odoo.com — Portfolio V1

> **"The original portfolio website — deprecated and discontinued"**

| Field | Details |
|---|---|
| **Tagline** | Turzo — Web Developer (V1 Portfolio) |
| **Type** | Portfolio Website (Odoo) |
| **Category** | Personal Portfolio |
| **Year** | ~2023–2024 |
| **Status** | ❌ Discontinued (404 — domain gone) |
| **Old URL** | https://turzo.odoo.com |
| **History URL** | https://turzo.odoo.com/history (inaccessible) |
| **Reason Discontinued** | "Certain limitations" with the platform/plan |
| **Replaced By** | mdturzo.odoo.com |

**Description:**
The very first Odoo-based portfolio website. Turzo's first attempt at a full portfolio website. Development was stopped due to limitations and migrated to mdturzo.odoo.com. The old update history was documented at turzo.odoo.com/history but is now inaccessible.

---

## 🔗 ALL LIVE PREVIEW LINKS (Quick Reference)

| Project | Live URL |
|---|---|
| FMT Tracker Pro | https://muhtasim-rahman.github.io/UFMT-SSC26/ |
| Notification Panel | https://muhtasim-rahman.github.io/notification-panel/ |
| Odoo Assets Overview | https://muhtasim-rahman.github.io/odoo-website-assets/mdturzo.odoo.com/ |
| Portfolio (Current) | https://mdturzo.odoo.com |
| SGSC Web Campus | https://sgsc.odoo.com *(⚠️ may be offline)* |
| Halal | https://muhtasim-rahman.github.io/halal |
| Web Templates 2023 | https://muhtasim-rahman.github.io/web-templets-2024.2 |
| Turzo Express | https://muhtasim-rahman.github.io/turzo-express |
| Master Chef | https://muhtasim-rahman.github.io/master-chef |
| Study With Muhtasim | https://muhtasim-rahman.github.io/study-with-muhtasim |
| Portfolio 2023 | https://muhtasim-rahman.github.io/portfolio-2023 |
| Basic CV | https://muhtasim-rahman.github.io/basic-cv |
| CSS Calculator | https://muhtasim-rahman.github.io/css-calculator-design |
| GitHub Profile | https://github.com/muhtasim-rahman |
| New Portfolio (coming) | https://mdturzo.web.app |

---

## 🔗 ALL GITHUB REPO LINKS (Quick Reference)

| Project | GitHub URL |
|---|---|
| FMT Tracker Pro | https://github.com/muhtasim-rahman/UFMT-SSC26 |
| Notification Panel | https://github.com/muhtasim-rahman/notification-panel |
| Odoo Website Assets | https://github.com/muhtasim-rahman/odoo-website-assets |
| Halal | https://github.com/muhtasim-rahman/halal |
| Web Templates 2023 | https://github.com/muhtasim-rahman/web-templets-2024.2 |
| Turzo Express | https://github.com/muhtasim-rahman/turzo-express |
| Master Chef | https://github.com/muhtasim-rahman/master-chef |
| Study With Muhtasim | https://github.com/muhtasim-rahman/study-with-muhtasim |
| Portfolio 2023 | https://github.com/muhtasim-rahman/portfolio-2023 |
| Basic CV | https://github.com/muhtasim-rahman/basic-cv |
| CSS Calculator | https://github.com/muhtasim-rahman/css-calculator-design |
| GitHub Profile README | https://github.com/muhtasim-rahman/muhtasim-rahman |

---

*Compiled from: GitHub (muhtasim-rahman), live previews, mdturzo.odoo.com, and personal input. April 2026.*
