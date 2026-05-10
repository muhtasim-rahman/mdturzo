# SUPER MASTER PROMPT v2 — mdturzo.web.app
**Owner:** Muhtasim Rahman (Turzo) | **Version:** v2.0.0 → v2.11.0 | **Stack:** React + Vite + Supabase + Firebase

---

## AI নির্দেশনা — সবার আগে পড়তে হবে

এই prompt প্রতিটা নতুন chat এর শুরুতে দেওয়া হবে। তুমি **শুধু সেই version** এর কাজ করবে যেটা user বলবে। অন্য কোনো version এর কাজ করবে না।

User বলবে **"v2.X.0 এর কাজ করব"** → তুমি শুধু সেই version এর কাজ করবে।

**প্রতিটা Major Version শেষে অবশ্যই দিতে হবে:**
1. **ZIP file** — root folder: `mdturzo-portfolio-v2.X.0/` — সব files included, কিছু missing নেই
2. **`.env.example`** — সব environment variables খালি value সহ
3. **GitHub commit message** — নিচে defined format এ
4. **Website সম্পূর্ণ runnable** — কোনো broken page, console error, missing import নেই
5. **Supabase SQL script** — সেই version এ নতুন যা যা table/change হয়েছে

**Minor fix** (v2.X.1, v2.X.2) → same chat এ। Major version → নতুন chat।

---

## Project Overview

Muhtasim Rahman (Turzo) এর জন্য একটা **fully advanced, professional portfolio website**।

- **URL:** `https://mdturzo.web.app`
- **Hosting:** Firebase Hosting (Spark free plan)
- **Design:** Dark navy (`#060f1e` base), minimal, clean, professional
- **কোথাও emoji নেই** — সব জায়গায় Font Awesome 6 icons
- **সব data dynamic** — কোনো hardcoded content নেই যেটা change হতে পারে

---

## Tech Stack — সম্পূর্ণ তালিকা

| Category | Tool | কারণ |
|----------|------|------|
| Framework | React 18 | AI সবচেয়ে ভালো জানে, component reuse |
| Build Tool | Vite | Fast dev server, fast build |
| Styling | Tailwind CSS + Custom CSS | Vite দিয়ে proper build, CDN না |
| Routing | React Router v6 | Clean SPA routing |
| Animation | Framer Motion | Smooth, professional animations |
| Global State | Zustand | Simple, lightweight, AI perfectly generate করে |
| Auth | Firebase Auth | Free, reliable, OAuth support |
| Realtime | Firebase Realtime DB | Notifications, online presence |
| Database | Supabase (PostgreSQL) | Free tier, complex queries, Row Level Security |
| Hosting | Firebase Hosting | Free, fast CDN |
| Image Upload | ImgBB via Cloudflare Worker | API key কখনো frontend এ না |
| API Proxy | Cloudflare Worker | ImgBB + reCAPTCHA + Email secret keys |
| Email Service | Resend (via Cloudflare Worker) | 3000/month free, beautiful templates |
| Rich Editor | TipTap | Free, no watermark, React-native |
| Charts | Recharts | React-based, clean |
| SEO | react-helmet-async | Dynamic meta per page |
| Pre-render | vite-plugin-prerender | Static pages SSG |
| Image Crop | Cropper.js | |
| Image Compress | browser-image-compression + Compressor.js | |
| Icons | @fortawesome/react-fontawesome | কোথাও emoji নেই |
| Fonts | Google Fonts | Inter + Plus Jakarta Sans |
| Spam | reCAPTCHA v3 + Honeypot | Invisible, score-based |
| Error Tracking | Sentry (free tier) | 5000 errors/month |
| Heatmap | Hotjar (free tier) | Session recording, heatmaps |
| Analytics | Firebase Analytics (GA4) | Already in Firebase config |

**Firebase Storage ব্যবহার হবে না।** সব image ImgBB তে।
**PWA লাগবে না।**

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

Firebase থেকে ব্যবহার হবে: **Auth**, **Realtime DB** (শুধু notifications + presence), **Hosting**, **Analytics**।

---

## Supabase Configuration

```
URL:      https://kddyucerqiwvjmuwebjv.supabase.co
Anon Key: [user provide করবে — Supabase Dashboard → Settings → API]
```

**Firebase Auth ↔ Supabase সংযোগ:**
Firebase Auth login হলে Firebase UID পাওয়া যায়। সেই UID দিয়েই Supabase এ user identify করা হবে। `users.id = Firebase UID`।

Supabase Anon Key frontend এ রাখা safe — এটা public key, Row Level Security দিয়ে data protect হয়।

---

## Cloudflare Worker

**Worker URL:** `https://portfolio.programs-turzo.workers.dev`

সব secret API key Cloudflare Worker এ environment variable হিসেবে থাকবে। Frontend এ কখনো secret key expose হবে না।

**Worker Secret Variables (user Cloudflare Dashboard এ manually add করবে):**

| Variable | Value | Purpose |
|----------|-------|---------|
| `imgbb_api` | ImgBB API key | Image upload proxy |
| `recaptcha_secret` | reCAPTCHA v3 secret | Server-side verify |
| `resend_api` | Resend API key | Email sending |
| `admin_email` | mdturzo.dev@gmail.com | যেখানে notifications যাবে |

**Worker Routes:**

```javascript
// portfolio.programs-turzo.workers.dev
const ALLOWED_ORIGINS = [
  'https://mdturzo.web.app',
  'http://localhost:5173'
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

    // POST /upload-image → ImgBB
    if (url.pathname === '/upload-image' && request.method === 'POST') {
      const formData = await request.formData();
      formData.append('key', env.imgbb_api);
      const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
      return new Response(await res.text(), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // POST /verify-recaptcha → Google reCAPTCHA
    if (url.pathname === '/verify-recaptcha' && request.method === 'POST') {
      const { token } = await request.json();
      const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${env.recaptcha_secret}&response=${token}`, { method: 'POST' });
      const data = await res.json();
      return new Response(JSON.stringify({ success: data.success, score: data.score }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST /send-email → Resend
    if (url.pathname === '/send-email' && request.method === 'POST') {
      const body = await request.json();
      // body: { to, subject, html, replyTo? }
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.resend_api}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Muhtasim Portfolio <noreply@mdturzo.web.app>',
          to: body.to || env.admin_email,
          subject: body.subject,
          html: body.html,
          reply_to: body.replyTo || env.admin_email,
        })
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};
```

---

## Environment Variables (.env)

```bash
# Firebase
VITE_FIREBASE_API_KEY=AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA
VITE_FIREBASE_AUTH_DOMAIN=mdturzo.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://mdturzo-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=mdturzo
VITE_FIREBASE_MESSAGING_SENDER_ID=13751895485
VITE_FIREBASE_APP_ID=1:13751895485:web:be068cfd6f46f945d3fed4
VITE_FIREBASE_MEASUREMENT_ID=G-SHM2013GKK

# Supabase
VITE_SUPABASE_URL=https://kddyucerqiwvjmuwebjv.supabase.co
VITE_SUPABASE_ANON_KEY=

# Cloudflare Worker
VITE_WORKER_URL=https://portfolio.programs-turzo.workers.dev

# reCAPTCHA (public site key only — secret is in Cloudflare Worker)
VITE_RECAPTCHA_SITE_KEY=

# Hotjar
VITE_HOTJAR_ID=

# Sentry
VITE_SENTRY_DSN=
```

**`.env` file `.gitignore` এ থাকবে। `.env.example` এ সব keys থাকবে কিন্তু value empty।**

---

## Site Configuration

`src/config/site.config.js` — এই file এ edit করলে পুরো website এ reflect হয়।

```javascript
export const SITE_CONFIG = {
  version: "v2.0.0",
  siteName: "Muhtasim Rahman",
  siteTagline: "Web Developer & Designer",
  siteURL: "https://mdturzo.web.app",
  workerURL: import.meta.env.VITE_WORKER_URL,

  owner: {
    fullName: "Md Muhtasim Rahman Mahmud",
    displayName: "Muhtasim Rahman",
    nickname: "Turzo",
    email: "mdturzo.dev@gmail.com",
    location: "Nilphamari, Bangladesh",
    fakeDOB: "2007-09-13",       // age এখান থেকে auto-calculate হবে
    github: "https://github.com/muhtasim-rahman",
    oldPortfolio: "https://mdturzo.odoo.com",
  },

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

  seo: {
    defaultOGImage: "/preview.png",
    defaultDescription: "Self-taught web developer & designer from Bangladesh — building clean, fast and meaningful digital experiences.",
    defaultKeywords: "Muhtasim Rahman, Turzo, web developer, Bangladesh, portfolio",
  },
};
```

---

## Folder Structure

```
mdturzo-portfolio-v2.X.0/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── preview.png              ← default OG image (1200×630)
├── src/
│   ├── main.jsx                 ← Sentry init, Hotjar init, app mount
│   ├── App.jsx                  ← Router, theme, auth listener
│   ├── index.css                ← CSS variables, skeleton, global
│   ├── config/
│   │   ├── site.config.js
│   │   ├── firebase.config.js
│   │   └── supabase.config.js
│   ├── store/                   ← Zustand stores
│   │   ├── authStore.js         ← user, isAdmin, loading
│   │   ├── themeStore.js        ← dark/light, system preference
│   │   ├── notificationStore.js
│   │   ├── toastStore.js
│   │   └── searchStore.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useAdmin.js
│   │   ├── useProjects.js
│   │   ├── useBlogs.js
│   │   ├── usePosts.js
│   │   ├── useNotifications.js
│   │   └── usePageVisibility.js
│   ├── services/
│   │   ├── firebase.js          ← Firebase init, Analytics init
│   │   ├── supabase.js          ← Supabase client
│   │   ├── worker.js            ← Cloudflare Worker calls
│   │   └── analytics.js        ← track page views, events
│   ├── utils/
│   │   ├── compression.js       ← image compress flow
│   │   ├── deviceInfo.js        ← browser, OS, device, IP geolocation
│   │   ├── seo.js
│   │   ├── formatters.js        ← date, number, reading time
│   │   └── validators.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ToastContainer.jsx
│   │   │   ├── Skeleton.jsx     ← reusable skeleton shapes
│   │   │   ├── PageProgress.jsx ← top progress bar
│   │   │   ├── Badge.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── AboutMini.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── RecentProjects.jsx
│   │   │   ├── GithubStats.jsx
│   │   │   └── ReviewsPreview.jsx
│   │   ├── shared/
│   │   │   ├── LikeDislike.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── ShareButtons.jsx
│   │   │   ├── ReportButton.jsx
│   │   │   ├── RelatedContent.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── AdminQuickActions.jsx  ← floating button (admin only)
│   │   │   ├── VisibilityGuard.jsx
│   │   │   └── ImageUploader.jsx     ← crop + compress + upload
│   │   ├── blogs/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── ReadingProgress.jsx
│   │   │   └── TableOfContents.jsx
│   │   ├── projects/
│   │   │   └── ProjectCard.jsx
│   │   ├── posts/
│   │   │   └── PostCard.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── profile/
│   │   │   └── ProfileCard.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       ├── AdminSidebar.jsx
│   │       ├── ContentEditor.jsx    ← TipTap + templates
│   │       └── ImageCompress.jsx    ← admin compression UI
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Projects.jsx
│       ├── ProjectDetail.jsx
│       ├── Blogs.jsx
│       ├── BlogDetail.jsx
│       ├── Posts.jsx
│       ├── PostDetail.jsx
│       ├── Contact.jsx
│       ├── Login.jsx
│       ├── Signup.jsx
│       ├── AuthAction.jsx       ← Firebase custom action page (password reset, email verify)
│       ├── Profile.jsx
│       ├── PublicProfile.jsx
│       ├── Admin.jsx
│       ├── PrivacyPolicy.jsx
│       ├── CookiesPolicy.jsx
│       └── NotFound.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                         ← gitignore এ
├── .env.example
├── .gitignore
├── firebase.json
├── .firebaserc
└── package.json
```

---

## Pages ও Routing

React Router v6। `firebase.json` এ rewrites set থাকবে সব URL এর জন্য।

| URL | Page | Notes |
|-----|------|-------|
| `/` | Home | Public |
| `/about` | About | Visibility controlled |
| `/projects` | Projects List | Visibility controlled |
| `/projects/:slug` | Project Detail | Per-content visibility |
| `/blogs` | Blog List | Visibility controlled |
| `/blogs/:slug` | Blog Detail | Per-content visibility |
| `/posts` | Posts List | Visibility controlled |
| `/posts/:slug` | Post Detail | Per-content visibility |
| `/contact` | Contact | Public |
| `/login` | Login | Public (logged in হলে redirect) |
| `/signup` | Signup | Public |
| `/logout` | — | Auto logout + home redirect |
| `/auth/action` | AuthAction | Firebase email action handler |
| `/profile` | Own Profile | Login required |
| `/@:username` | Public Profile | Public |
| `/admin` | Admin Panel | Admin only |
| `/admin/:tab` | Admin Tab | Admin only |
| `/privacy-policy` | Privacy Policy | Public |
| `/cookies-policy` | Cookies Policy | Public |
| `/*` | 404 Not Found | Public |

**`VisibilityGuard`:** প্রতিটা page কে wrap করবে। Supabase `page_visibility` table থেকে check করবে। Signed-in required হলে login redirect। Private হলে 404।

---

## Version Plan — ১২টা Major Version

### v2.0.0 — Foundation & Architecture
- React + Vite + Tailwind CSS সম্পূর্ণ setup
- Firebase + Supabase + Sentry + Hotjar + Firebase Analytics init
- React Router v6 — সব routes define (placeholder pages)
- Zustand stores — auth, theme, notification, toast, search
- `site.config.js` complete
- **Global CSS variables** — dark/light theme tokens, skeleton colors, spacing
- **Skeleton System** — সব reusable skeleton components (`SkeletonCard`, `SkeletonRow`, `SkeletonText`, `SkeletonCircle`, `SkeletonBanner`)
- **Toast System** — animated, stacked, 4 types, auto-dismiss
- **Page Load Progress Bar** — genuine, top এ thin bar
- Error Boundary
- Firebase Hosting config (`firebase.json` with rewrites)
- Supabase SQL schema — সব tables create script
- `.env.example`
- 404 page — animated, creative

### v2.1.0 — Navbar + Footer
- Navbar — সম্পূর্ণ (নিচে বিস্তারিত)
- Footer — সম্পূর্ণ
- Layout component
- Dark/Light theme system পুরোপুরি কার্যকর (system preference auto-detect)
- **AdminQuickActions** floating button (admin logged in থাকলে সব page এ)

### v2.2.0 — Home Page
- Hero section (ছবির reference অনুযায়ী, নিচে বিস্তারিত)
- AboutMini section
- Skills section
- Services section
- Stats section — animated counter + **Supabase থেকে dynamic**
- Recent Projects — Supabase থেকে featured ৬টা
- GitHub Stats embed
- Reviews Preview — Supabase থেকে
- সব section এ skeleton loading

### v2.3.0 — About Page
- Full about page — `about.md` এর সব তথ্য visual করে

### v2.4.0 — Projects Page
- Grid/List toggle, filter by category/tag, within-page search
- Project detail — like/dislike/views/comment/report, share, related, breadcrumb
- Skeleton loading সব জায়গায়

### v2.5.0 — Blogs Page
- Blog list — pinned, filter, search
- Blog detail — **Reading Progress Bar**, **Table of Contents sidebar**, like/dislike/views/comment/report, share, related
- Skeleton loading

### v2.6.0 — Posts Page + Contact Page
- Posts — video embed list + detail — like/dislike/views/comment/report
- Contact — ৩ form type, image upload, spam protection
- Contact + Report → **Supabase save + Resend email** to `mdturzo.dev@gmail.com`

### v2.7.0 — Auth System
- Login + Signup (full screen design)
- Google, GitHub, Microsoft OAuth
- Username real-time check
- Password strength indicator
- Email verification flow
- **`/auth/action`** page — Firebase custom action handler — সুন্দর redesigned UI (password reset form, email verified success, etc.)
- reCAPTCHA v3

### v2.8.0 — User Profile + Account
- `/profile` + `/@username`
- Edit profile — image crop + compress + upload
- Badges display
- Account settings
- Visibility per-field

### v2.9.0 — Global Search + Notifications + Activity Log
- Global search overlay (Framer Motion)
- Point-based search algorithm
- Section highlight on result click
- Firebase Realtime DB notification system
- Notification popup, unread badge
- Activity log table

### v2.10.0 — Admin Panel Part 1
- Admin layout (collapsible sidebar)
- Dashboard, Users, Projects, Blogs, Posts, Page Visibility tabs
- TipTap editor with templates
- Image compression advanced UI

### v2.11.0 — Admin Panel Part 2 + SEO + Final
- Comments, Reports, Reviews, Messages, Notifications, Badges, Analytics, Logs, Settings tabs
- SEO complete — react-helmet-async + vite-plugin-prerender + sitemap + JSON-LD
- Supabase RLS rules final
- Firebase Realtime DB rules final
- Privacy Policy + Cookies Policy pages (editable via admin TipTap)
- CV download
- Performance final pass

---

## Navbar — বিস্তারিত

**Desktop Contents (left → right):**
- Logo: `@mdturzo999` — @ primary blue, বাকিটা white, monospace
- Center nav: Home, About, Projects, Blogs, Posts, Contact — active indicator সহ
- Right icons: Search, Notification (badge), Theme Toggle, User Avatar/Icon, Grid (mega menu)

**Scroll behavior:**
- Top এ: transparent
- Scroll 80px এর বেশি: **glass morphism floating pill** — `backdrop-blur(28px)`, dark semi-transparent, rounded-full, box-shadow, smooth slide-in (Framer Motion)
- আবার top এ scroll: smooth fade-out

**Theme toggle:** Sun ↔ Moon smooth morph animation। System preference auto-detect করবে প্রথমে।

**Mega menu (grid icon click):** Navbar এর নিচে animated dropdown — সব pages category-wise, description সহ।

**Mobile:** Hamburger → sidebar drawer (right slide-in) — সব links, theme toggle, social icons, auth buttons।

**AdminQuickActions (admin logged in হলে):**
সব page এ bottom-right corner এ floating action button। Click করলে expand:
- Add Blog
- Add Project
- Add Post
- Add Notification
- View Reports
- Edit Page Visibility

---

## Footer — বিস্তারিত

**4 column layout (desktop), stack (mobile):**
1. Logo + tagline + short bio + social icons (Facebook, Instagram, YouTube, X, LinkedIn, TikTok, Telegram, GitHub, Threads)
2. Navigation links
3. Pages (About, Projects, Blogs, Posts, Contact)
4. Contact (email) + Legal (Privacy, Cookies)

**Bottom bar:** Copyright © {year} {siteName} — site.config.js থেকে auto। Version badge। Top-scroll button।

---

## Hero Section — বিস্তারিত

**Screenshot এর design অনুসরণ করে তৈরি করবে — এটাই reference।**

**Background:**
- Dark navy base
- CSS star/particle twinkling (subtle, slow, pure CSS বা lightweight canvas)
- Drifting translucent color orbs (deep blue/indigo)

**Layout:**
- Desktop: Left 55% content + Right 45% photo
- Mobile: Photo উপরে (circular frame) + content নিচে

**Right side:**
- `muhtasim.webp` — circular frame, portrait crop
- Frame এর চারপাশে glow ring — pulse animation
- Floating skill icons orbit করবে (HTML5, CSS3, Python, VS Code, AI/Design) — Font Awesome icons, hover এ tooltip

**Left side:**
- `• Available for work` badge — green dot pulse, admin Supabase থেকে on/off করতে পারবে
- **Muhtasim** (white, large weight) **Rahman** (primary blue) **(Turzo)** (muted, smaller)
- Typing animation: "Web Developer" | "Designer" | "Video Editor" | "Student"
- Bio text
- **Hire Me** (filled primary) + **Download CV** (outline) buttons
- Social icons row: GitHub, LinkedIn, Facebook, Instagram, YouTube, Telegram
- Stats row: **3+** YRS DEV | **6+** YRS DESIGN | **16+** PROJECTS — Supabase `site_settings` থেকে dynamic, scroll এ animate

**Animations:**
- Content: staggered fade-in + slide-up (Framer Motion)
- Photo: scale-in entrance
- Stats: Intersection Observer দিয়ে scroll এ count-up
- Scroll indicator: animated arrow

---

## Dynamic Data System

**কোনো hardcoded content নেই।** সব Supabase `site_settings` table থেকে।

**Admin Settings এ যা যা update করা যাবে:**

| Key | Default | কোথায় দেখায় |
|-----|---------|------------|
| `stats_years_dev` | 3 | Hero, About, Stats |
| `stats_years_design` | 6 | Hero, About |
| `stats_projects` | 16 | Hero, About, Stats |
| `available_for_work` | true | Hero badge |
| `cv_url` | "" | Download button |
| `cv_enabled` | true | Hero + About |
| `cookie_banner` | true | Site-wide |
| `maintenance` | false | Site-wide |
| `comment_auto_approve` | false | Comment moderation |

Blog count, project count → Supabase real count query।
Age → `site.config.js` এর `fakeDOB` থেকে auto-calculate।

---

## Skeleton Loading — Advanced System

**নিয়ম:** যেখানেই data load হয় — skeleton দেখাবে। Spinner বা "Loading..." text acceptable না।

**Skeleton CSS:**
```css
/* index.css এ global define */
:root {
  --sk-base: #1e293b;
  --sk-shine: #334155;
}
[data-theme="light"] {
  --sk-base: #e2e8f0;
  --sk-shine: #f8fafc;
}
.sk {
  background: var(--sk-base);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.sk::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, var(--sk-shine), transparent);
  animation: sk-wave 1.5s infinite;
}
@keyframes sk-wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**Reusable Skeleton components:** `<SkeletonCard />`, `<SkeletonRow />`, `<SkeletonText lines={3} />`, `<SkeletonCircle size={48} />`, `<SkeletonBanner />`

**Rules:**
- Skeleton shape = real content এর exact shape (layout shift শূন্য)
- Staggered: multiple skeleton এ 0.1s delay
- Minimum display: 500ms (data আগে আসলেও)
- Error state: retry button সহ
- Smooth fade-out যখন real content আসে
- Card: pulse animation। List/Table: wave animation।

**কোথায় কোথায়:**
Navbar avatar, Hero stats, home সব sections, projects list (grid card + list row), project detail, blogs list, blog detail, posts list, post detail, about page (timeline, skills), profile (banner + avatar + text), public profile, notifications popup, search results, comments, reviews, admin tables, admin dashboard cards, admin charts, সব modal, সব image load।

---

## Toast Notification System

**Types:** success (green), error (red), warning (yellow), info (blue)

**Design:** Bottom-right stack। প্রতিটায়: FA icon + title + message + thin progress timer bar + close ✕

**Behavior:**
- Framer Motion: right থেকে slide-in, fade-out
- Stack max 5 (নতুন উপরে)
- Auto-dismiss: success/info 4s, warning 6s, error manual close
- কোনো action এর পর toast — save, delete, upload, copy, login, error

---

## Page Load Progress Bar

Top এ 3px colored bar। Genuine progress।

- Route change start → 0% → 30% instantly
- Data fetch → 30% → 70%
- Complete → 70% → 100%
- 100% হলে 300ms পর fade-out

---

## Email System — Resend + Designed Templates

**কীভাবে কাজ করে:**
Frontend → Cloudflare Worker `/send-email` → Resend API → Email delivered

**কোন কোন email পাঠানো হবে:**

| Trigger | To | Template |
|---------|-----|---------|
| Contact form submit | mdturzo.dev@gmail.com | Admin notification |
| Contact form submit | Sender এর email | Confirmation |
| Bug report submit | mdturzo.dev@gmail.com | Bug report details |
| Question submit | mdturzo.dev@gmail.com | Question notification |
| New comment (pending) | mdturzo.dev@gmail.com | Comment moderation alert |
| New review (pending) | mdturzo.dev@gmail.com | Review moderation alert |
| New report | mdturzo.dev@gmail.com | Report alert |
| New user signup | mdturzo.dev@gmail.com | New user notification |

**Note:** Firebase Auth এর verification email + password reset email আলাদাভাবে Firebase নিজেই পাঠায়। Firebase Console এ template customize করা হবে এবং action URL `/auth/action` এ set করা হবে।

**Email Template Design:**
- Dark themed HTML email (সব email client compatible)
- Header: Logo + Site name
- Body: Clear info, proper formatting
- Footer: "mdturzo.web.app | Nilphamari, Bangladesh"
- সব emails এর জন্য `src/services/emailTemplates.js` এ templates defined

**Admin notification template এ থাকবে:**
- Form type, sender name, email
- Message/content (full)
- Image attachments (যদি থাকে — ImgBB URLs)
- **User device info:** Browser, OS, device type, screen resolution
- **Location info:** IP, City, Country (ipapi.co free API দিয়ে)
- Timestamp
- User account info (যদি logged in থাকে — username, uid)

---

## User/Device Data Collection

**সব form submission এ (contact, comment, report, review) collect করা হবে:**

```javascript
// src/utils/deviceInfo.js
export async function collectDeviceInfo() {
  const ua = navigator.userAgent;
  let ipData = {};
  try {
    const res = await fetch('https://ipapi.co/json/');
    ipData = await res.json(); // ip, city, region, country, org
  } catch {}

  return {
    browser: detectBrowser(ua),
    os: detectOS(ua),
    device: /Mobile|Android|iPhone/i.test(ua) ? 'Mobile' : 'Desktop',
    screen: `${window.screen.width}×${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ip: ipData.ip || 'Unknown',
    city: ipData.city || 'Unknown',
    country: ipData.country_name || 'Unknown',
    isp: ipData.org || 'Unknown',
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'Direct',
    currentPage: window.location.href,
  };
}
```

এই data Supabase এ save হবে এবং admin email notification এও দেখাবে।

---

## Firebase Custom Action Page — `/auth/action`

Firebase Console এ Authentication → Templates → Action URL: `https://mdturzo.web.app/auth/action` set করতে হবে।

**এই page handle করবে:**
- `mode=resetPassword` → সুন্দর password reset form (new password + confirm, strength indicator)
- `mode=verifyEmail` → সুন্দর success page ("Email verified! Now you can comment and review.")
- `mode=recoverEmail` → Email recovery confirmation

**Design:** Dark, website এর সাথে consistent। Centered card। Website এর navbar/footer নেই — standalone page।

---

## Analytics — ৩ স্তরে

**Firebase Analytics (GA4):**
- Automatic page views (`logEvent('page_view', { page_path })`)
- CV download event
- Custom events: login, signup, project_view, blog_view, contact_submit

**Hotjar:**
- `src/main.jsx` এ init: `Hotjar.init(VITE_HOTJAR_ID, 6)`
- Session recording, heatmaps — automatic

**Sentry:**
- `src/main.jsx` এ init
- React Error Boundary এ capture
- Unhandled promise rejections capture
- Performance monitoring

---

## SEO — Maximum যা React এ সম্ভব

**react-helmet-async:** প্রতিটা page এ dynamic —
```jsx
<Helmet>
  <title>Project Name | Muhtasim Rahman</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:image" content={thumbnail || SITE_CONFIG.seo.defaultOGImage} />
  <meta property="og:url" content={`${SITE_CONFIG.siteURL}${location.pathname}`} />
  <link rel="canonical" href={...} />
</Helmet>
```

**vite-plugin-prerender:** Static pages pre-render করবে —
Home, About, Contact, Login, Signup, Privacy Policy, Cookies Policy

**sitemap.xml:** Static pages fixed + published slugs dynamic (Supabase থেকে)

**robots.txt:**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /profile
Disallow: /login
Disallow: /signup
Sitemap: https://mdturzo.web.app/sitemap.xml
```

**JSON-LD Structured Data:**
- Home: Person + WebSite schema
- Blog: Article + BreadcrumbList
- Project: BreadcrumbList + SoftwareApplication
- All: WebPage schema

**Core Web Vitals:**
- LCP: hero image `rel="preload"`
- CLS: skeleton দিয়ে zero layout shift
- INP: heavy ops deferred

---

## Spam + Bot Protection

**reCAPTCHA v3** (invisible score-based):
- Signup, contact form, comment এ
- Cloudflare Worker `/verify-recaptcha` এ verify
- Score < 0.5 → block

**Honeypot fields:** Form এ hidden input — bot fill করে, human করে না। Fill হলে silently block।

**Rate Limiting (Supabase `spam_tracking` table):**
| Action | Limit |
|--------|-------|
| Contact form | 2/ঘণ্টা per IP |
| Comment | 3/ঘণ্টা per user per content |
| Signup | 5/দিন per IP |
| Login fail | 5 fail → 15 min lockout (Firebase handles) |
| Review | 1 per account, edit only |

**Email verification required:** Comment, review, report করতে হলে email verified হতে হবে।

---

## Image Upload + Compression

**Upload flow:**
```
Image Select → Crop (Cropper.js) → Compression UI → Preview → Accept → Cloudflare Worker → ImgBB → URL → Supabase
```

**Normal user:** Max 150KB, WebP, no options — auto compress।

**Admin — Full control:**
```
Preset:    [ None | Low | Medium | High | Custom ]
Quality:   ─────●──── 72%
Max Width: [1920] px  |  Max Height: [1080] px
Max Size:  [500] KB   |  Format: [ WebP ▼ ]

Estimated output: ~187 KB (93% reduction)
```

**Preview:**
- Left panel: Original (size, dimensions)
- Right panel: Compressed preview (size, dimensions, % saved)
- Buttons: **Accept** | **Re-compress** | **Cancel**

**Image naming:**
| Type | Format |
|------|--------|
| User profile photo | `up_{uid}_{ts}.webp` |
| User banner | `pb_{uid}_{ts}.webp` |
| Contact attachment | `cf_{uid}_{ts}.webp` |
| Project thumbnail | `pt_{slug}_{ts}.webp` |
| Blog thumbnail | `bt_{slug}_{ts}.webp` |
| Review image | `rv_{uid}_{ts}.webp` |

---

## Content Features — Like, Dislike, Views, Comment, Report, Share

**সব Project, Blog, Post এ:**

**Views:** Auto-increment on page load। IP + user_id দিয়ে unique।

**Like/Dislike:** Login required। একটাতেই vote (like বা dislike)। আবার click করলে remove। Supabase `likes` table।

**Comments:**
- Login + email verified required
- Max 1000 chars, edit/delete নিজের
- Spam: 3/ঘণ্টা per content per user
- Default: pending approval
- প্রতিটায় report button

**Report:** Login required। Reason select। Admin notification email যাবে।

**Share:** Facebook, Twitter/X, LinkedIn, WhatsApp, Telegram, Copy Link। OG preview সহ।

---

## Blog Detail Special Features

**Reading Progress Bar:** Top এ thin bar (page progress bar থেকে আলাদা color)। Scroll % অনুযায়ী fill।

**Table of Contents:**
- H1-H4 থেকে auto-generate
- Desktop: floating sticky sidebar (right side)
- Mobile: collapsible section (content এর উপরে)
- Active heading highlight (Intersection Observer)
- Click → smooth scroll।

**Related Blogs:** Same category/tags → ৩টা grid।

---

## Auth System — বিস্তারিত

**Signup:**
- First + Last name, @username (real-time availability, debounced)
- Email, Password (strength indicator), Confirm password
- Privacy + Cookies checkbox
- reCAPTCHA v3
- OAuth: Google, GitHub, Microsoft

**Login:**
- Email বা @username, Password (show/hide)
- Forgot password → Firebase reset → `/auth/action` এ beautiful reset form
- OAuth same

**Post-auth redirect:** আগের page এ। Signup → profile complete page।

---

## User Profile

**`/profile` (own) + `/@username` (public):**
- Banner (16:9) + Profile photo (1:1 circular)
- Display name, @username, bio (100 chars), web URL
- Social links (max 5, platform icon সহ)
- Account badges (admin-assigned, display only)
- Join date

**Edit:** Photo crop (1:1) + banner crop (16:9) + compress + upload। Username (30-day cooldown)। Visibility per field।

---

## Page Visibility System

Admin panel "Page Visibility" tab:
- প্রতিটা page → **Public / Signed-in only / Private**
- প্রতিটা content (project/blog/post) → same options

`VisibilityGuard` component সব page wrap করে, Supabase এ check করে।

---

## Featured Projects (Home Page)

Admin Projects tab এ "Feature on Home" toggle। Max ৬টা। `featured_order` drag-drop reorder। ০টা হলে section hide।

---

## Global Search

Navbar search icon → animated overlay (Framer Motion slide-down)।

**Algorithm:** Title match (10pt) + description (5pt) + tags (3pt) + content (1pt) → sorted।

**Categories:** Pages, Projects, Blogs, Posts, Sections।

**Click:** Navigate + 2s glow highlight (Framer Motion)।

**Keyboard:** Arrow keys, Enter, Escape।

---

## Notifications System

Firebase Realtime DB এ store (real-time)। Admin create করে। Navbar bell icon + unread badge।

**Targets:** All / Signed-in / Specific user।

---

## Activity Log

**User activity:** login, logout, like, comment, profile update
**Admin activity:** content create/edit/delete, user action, settings change

Supabase `activity_logs` table। Admin panel এ filter।

---

## Admin Panel — বিস্তারিত

**Access:** `/admin` → admin verify না হলে → 404 দেখায় (existence reveal করে না)।

**Admin list:** Supabase `admins` table এ email। New admin add করতে হলে সেখানে add।

**Background verify steps (কোনো interruption নেই):**
1. Firebase Auth token check
2. Supabase `admins` এ email match
3. Session validity (auto-refresh)
4. Sensitive action এ → confirmation modal

**Layout:** Collapsible sidebar (icon + label mode)। Main content area। Mobile: drawer।

**Admin Tabs:**

**Dashboard:**
- Stats cards (users, projects, blogs, posts, pending comments, pending reports, unread messages, pending reviews) — সব dynamic Supabase থেকে
- Recent activity feed
- Site health: Supabase ✓, Firebase ✓, ImgBB ✓, Resend ✓
- Quick actions

**Users:**
- Searchable/filterable table
- Per user: view, edit, badge assign/remove, verified toggle, ban/unban, delete
- Bulk actions। Activity log modal।

**Projects:**
- Table: thumbnail, title, status, category, featured toggle, actions
- Add/Edit form:
  - Title, slug (auto-generate from title, editable)
  - Short description
  - Thumbnail (ImageUploader — admin compression)
  - GitHub, Live, PDF, Custom links
  - Tags, category
  - **TipTap editor** — template select → Standard / Project Showcase / Tutorial / Case Study / Minimal
  - Status: published/draft/hidden
  - Visibility: public/signed-in/private
  - **Featured toggle** (max ৬, `featured_order` drag-drop)
  - SEO title + description
  - Auto-save as draft। Preview mode।
- Duplicate। Bulk status change।

**Blogs:**
- Same as projects + pinned toggle, cover image, series, reading time (auto)

**Posts (Video):**
- Add/Edit: title, slug, description, embed URL, platform (YouTube/Facebook/other), thumbnail, tags, category, status, visibility
- Preview embed inline

**Page Visibility:**
- প্রতিটা page এর Public/Signed-in/Private dropdown — real-time save

**Comments:**
- All comments from projects + blogs + posts
- Filter: all/pending/approved/flagged
- Approve, flag, delete, view user। Bulk।

**Reports:**
- Flagged content queue। Source preview। Actions: dismiss, remove content, ban user।

**Reviews:**
- Approve/reject, verified badge toggle, delete
- Rating distribution chart (Recharts)

**Messages:**
- All 3 form types। Full modal view, attachments, device info, location।
- Mark read/unread, star, delete। Filter by type + status।
- সব message এর জন্য email notification (Resend) গেছে কিনা indicator।

**Notifications:**
- Create: title, message, type, target, link, expiry
- List: edit, delete, active/inactive toggle

**Badges:**
- Create: name, FA icon, color, description, type (account/earned)
- Assign to user (search)। Remove।

**Analytics:**
- Page views chart (daily/weekly/monthly) — Recharts
- CV downloads count
- Top 5 projects + blogs by views
- User growth chart
- Firebase Analytics link

**Activity Logs:**
- User + admin logs। Filter। Export CSV।

**Settings:**
- *General:* site stats (years dev, design, projects count), available toggle, maintenance mode
- *CV:* URL, enabled toggle
- *Comments:* auto-approve toggle
- *Cookie Banner:* on/off
- *Privacy Policy + Cookies Policy:* TipTap editable
- *Email Templates:* Preview designed templates (Resend)
- *Firebase Email:* Note — Firebase Console এ customize করতে হবে, action URL set করতে হবে
- *Admin Management:* email list — add/remove
- *API Health:* Cloudflare Worker, Supabase, ImgBB, Resend status check

**Admin UI Rules (সবসময়):**
- সব table: pagination + per-page (10/25/50)
- সব delete/critical: confirmation modal
- সব action: toast notification
- Skeleton loading: table rows, cards, charts
- Empty state: FA icon illustration
- Bulk checkbox সব table এ
- Keyboard shortcuts: Ctrl+S save, Escape close modal
- Firebase Realtime DB listener যেখানে real-time দরকার

---

## Supabase Database Schema (Complete)

```sql
-- USERS
CREATE TABLE users (
  id TEXT PRIMARY KEY,              -- Firebase UID
  username TEXT UNIQUE,
  display_name TEXT,
  email TEXT,
  bio TEXT CHECK (length(bio) <= 100),
  description TEXT CHECK (length(description) <= 500),
  web_url TEXT,
  photo_url TEXT,
  banner_url TEXT,
  location_city TEXT,
  location_country TEXT,
  social_links JSONB DEFAULT '[]',  -- [{platform, url}] max 5
  visibility JSONB DEFAULT '{}',
  is_email_verified BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_seen TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE usernames (
  username TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admins (
  id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  added_at TIMESTAMPTZ DEFAULT now()
);

-- CONTENT
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  thumbnail_url TEXT,
  github_link TEXT,
  live_link TEXT,
  pdf_link TEXT,
  custom_link TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  content TEXT,
  status TEXT DEFAULT 'draft',      -- published/draft/hidden
  visibility TEXT DEFAULT 'public', -- public/signed-in/private
  featured BOOLEAN DEFAULT false,
  featured_order INT,
  seo_title TEXT,
  seo_description TEXT,
  views_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  dislikes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  thumbnail_url TEXT,
  cover_image_url TEXT,
  content TEXT,
  author_name TEXT DEFAULT 'Muhtasim Rahman',
  reading_time INT,                 -- ceil(word_count / 200)
  category TEXT,
  series TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  visibility TEXT DEFAULT 'public',
  pinned BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  views_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  dislikes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  embed_url TEXT NOT NULL,
  platform TEXT,                    -- youtube/facebook/other
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  status TEXT DEFAULT 'draft',
  visibility TEXT DEFAULT 'public',
  views_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  dislikes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INTERACTIONS
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,       -- project/blog/post
  content_id UUID NOT NULL,
  content_slug TEXT NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  text TEXT NOT NULL CHECK (length(text) <= 1000),
  status TEXT DEFAULT 'pending',    -- pending/approved/flagged
  device_info JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'dislike')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_id, user_id)
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  reporter_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  device_info JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  image_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  verified_badge BOOLEAN DEFAULT false,
  device_info JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,               -- general/bug/question
  name TEXT,
  email TEXT,
  subject TEXT,
  content TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  user_id TEXT,
  device_info JSONB DEFAULT '{}',   -- browser, OS, IP, city, country, etc.
  status TEXT DEFAULT 'unread',
  starred BOOLEAN DEFAULT false,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- USERS SYSTEM
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,               -- FA class e.g. "fa-solid fa-crown"
  color TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('account', 'earned'))
);

CREATE TABLE user_badges (
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT,
  target TEXT DEFAULT 'all',        -- all/signed-in/specific
  target_uid TEXT,
  link TEXT,
  expires_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE notification_reads (
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, notification_id)
);

-- SYSTEM
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  device_info JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Initial settings
INSERT INTO site_settings (key, value) VALUES
  ('stats_years_dev', '3'),
  ('stats_years_design', '6'),
  ('stats_projects', '16'),
  ('available_for_work', 'true'),
  ('cv_url', '""'),
  ('cv_enabled', 'true'),
  ('cookie_banner', 'true'),
  ('maintenance', 'false'),
  ('comment_auto_approve', 'false');

CREATE TABLE page_visibility (
  page TEXT PRIMARY KEY,
  visibility TEXT DEFAULT 'public'
);

-- Initial pages
INSERT INTO page_visibility (page) VALUES
  ('about'), ('projects'), ('blogs'), ('posts'), ('contact');

CREATE TABLE spam_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  action TEXT,                      -- contact/comment/signup
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT,
  event TEXT,
  user_id TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Firebase Realtime Database Rules

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "notifications": {
      ".read": "auth !== null",
      ".write": false
    },
    "notification_reads": {
      "$uid": {
        ".read": "auth !== null && auth.uid === $uid",
        ".write": "auth !== null && auth.uid === $uid"
      }
    },
    "presence": {
      "$uid": {
        ".read": "auth !== null",
        ".write": "auth !== null && auth.uid === $uid"
      }
    }
  }
}
```

---

## Supabase Row Level Security

```sql
-- Users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read non-private fields" ON users FOR SELECT USING (NOT is_banned);
CREATE POLICY "Own full access" ON users FOR ALL USING (auth.uid()::text = id);

-- Admins check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()::text)
$$ LANGUAGE sql SECURITY DEFINER;

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public see published" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'public');
CREATE POLICY "Signed-in see signed-in" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin full" ON projects FOR ALL USING (is_admin());

-- (blogs, posts — same pattern)

-- Comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read approved" ON comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Own write" ON comments FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Own update/delete" ON comments FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY "Admin full" ON comments FOR ALL USING (is_admin());

-- Likes
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read all" ON likes FOR SELECT USING (true);
CREATE POLICY "Own manage" ON likes FOR ALL USING (auth.uid()::text = user_id);

-- Messages (anyone can insert, only admin reads)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read" ON messages FOR SELECT USING (is_admin());

-- Site settings (anyone reads, admin writes)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin write" ON site_settings FOR ALL USING (is_admin());

-- Page visibility (anyone reads, admin writes)
ALTER TABLE page_visibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read" ON page_visibility FOR SELECT USING (true);
CREATE POLICY "Admin write" ON page_visibility FOR ALL USING (is_admin());

-- Notifications (signed-in reads, admin writes)
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in read" ON notifications FOR SELECT USING (auth.uid() IS NOT NULL AND active = true);
CREATE POLICY "Admin full" ON notifications FOR ALL USING (is_admin());

-- Analytics (anyone inserts, admin reads)
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert" ON analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read" ON analytics FOR SELECT USING (is_admin());
```

---

## Per-Version Deliverables

**প্রতিটা major version শেষে:**

**1. ZIP:**
- Root: `mdturzo-portfolio-v2.X.0/`
- সব files। `.env.example`। `firebase.json`। `.gitignore`।

**2. Supabase SQL Script:**
- সেই version এ নতুন যা যা table/change হয়েছে সেটার SQL

**3. Commit Message:**
```
v2.X.0 — [one line summary]

- [change 1]
- [change 2]
- [change 3]
```

**4. Website:** Fully runnable। Zero console errors।

---

## Personal Information Reference

```
Name:        Muhtasim Rahman (Turzo)
Full Name:   Md Muhtasim Rahman Mahmud
Email:       mdturzo.dev@gmail.com
Location:    Nilphamari, Bangladesh
Fake DOB:    2007-09-13 (age auto-calculate)
GitHub:      github.com/muhtasim-rahman
New Site:    https://mdturzo.web.app
Old Site:    https://mdturzo.odoo.com

Social (@mdturzo999): Facebook, Instagram, YouTube, X/Twitter, LinkedIn, Threads
Social (@mdturzo16): TikTok, Telegram

Skills: AI ★★★★★, HTML/CSS ★★★★, Git ★★★★, Python ★★★, JS ★★, Java ★★
Experience: Web Dev 3+ yrs, Design 6+ yrs, Video Editing 5+ yrs
Education: SSC-26 (ongoing), next HSC, goal CSE
Values: Islam first, halal income, honesty, discipline, perfection
```

`about.md` এবং `projects.md` relevant version এর chat এ provide করা হবে।

---

## Small edit by user after reading the full prompt

- website er blogs and posts ei 2tar sob feachers combine kore `Feed` name single ekta system banaba
- per user e max comment 10/day, trpor toast or notification dakhabe wait korar jonno.
- 

---

*এই master prompt প্রতিটা নতুন chat এর শুরুতে দেওয়া হবে। User বলবে কোন version — AI শুধু সেটাই করবে।*