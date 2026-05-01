# Per-Version Chat Guide — mdturzo.web.app
**What to provide in each chat + what to keep in mind**

---

## How Every Chat Works

1. Notun chat kholo
2. **Master Prompt** puro copy-paste koro (shob somoy first e)
3. Tারপর bolo: **"v1.X.0 er kaj korba"**
4. Niche listed files/info gulo provide koro (version onujayi)
5. AI kaj shesh korle ZIP + commit message dibe
6. Minor fix lagle same chat e koro → v1.X.1, v1.X.2

---

## Version-wise: Ki Provide Korte Hbe

---

### v1.2.0 — Foundation & Architecture
**Prompt er shathe ki dibe:**
- `about.md` (personal info er jonno)
- `muhtasim.webp` (hero image)
- Bolo: Firebase config already master prompt e ache

**Ki mone rakhbe:**
- Cloudflare Worker code ta banay nibe — tumi shudhu `imgbb_api` variable add korbe Worker e
- `site-config.js` er `underDev: []` array apatoto khali thakbe
- `preview.png` placeholder hisebe `assets/images/` e thakbe (AI ekta simple placeholder banabe, tumi pore replace korbe)
- Firebase Hosting `firebase.json` e rewrites set hbe jate clean URLs kaj kore

---

### v1.3.0 — Navbar + Footer
**Porer version er zip provide koro:** `mdturzo-portfolio-v1.2.0.zip`

**Extra ki dibe:**
- Reference images theke footer design inspire korbo — Screenshot_20260430 image ta provide koro (footer screenshot)
- Bolo: Navbar e jei 5ta nav item thakbe segula: Home, About, Projects, Blogs, Gallery, Contact (6ta — desktop e 5 visible, 1ta "more" e)

**Ki mone rakhbe:**
- Navbar er "all items" icon e click e popup e category-wise sob nav items dakhabe
- Mobile e sidebar drawer e sob items
- Dark/light toggle animation obossoi eye-catching hbe
- Footer e social icons Font Awesome use korbe — no emoji

---

### v1.4.0 — Hero + Home Page Part 1
**Porer version er zip:** `mdturzo-portfolio-v1.3.0.zip`

**Extra ki dibe:**
- `muhtasim.webp` (hero image — again provide korte hbe)
- `about.md` (skills/stats data er jonno)
- Reference images (design inspiration er jonno) — design reference images gulo provide koro

**Ki mone rakhbe:**
- Hero: left 3/5 content, right 2/5 image
- Age auto-calculate from `site-config.js` er `fakeDOB: "2007-09-13"`
- Animated typing effect title e
- Background animated — subtle, professional
- Skills section: `about.md` er skill ratings use korbe
- Sob section e skeleton loading mandatory

---

### v1.5.0 — Home Page Part 2
**Porer version er zip:** `mdturzo-portfolio-v1.4.0.zip`

**Extra ki dibe:**
- `about.md` (services/stats info er jonno)

**Ki mone rakhbe:**
- Stats animated counter (Intersection Observer diye — screen e ashle count start hbe)
- GitHub stats: `https://github-readme-streak-stats.herokuapp.com/?user=muhtasim-rahman` (ba DenverCoder1 API) — img tag e embed
- Recent Projects section e 6ta featured project dakhabe (Firebase theke — featured flag onujayi). Apatoto Firebase e kono data nai, tai empty state / placeholder dakhabe
- Reviews preview section e empty state dakhabe (future-ready)
- Sob section e skeleton loading

---

### v1.6.0 — About Page
**Porer version er zip:** `mdturzo-portfolio-v1.5.0.zip`

**Extra ki dibe:**
- `about.md` (full — sob info ache ekhane)
- `muhtasim.webp` (about page e photo use hbe)

**Ki mone rakhbe:**
- Education timeline interactive — visual, chronological
- Skill indicators: self-rated stars from `about.md`
- Experience numbers: 3+ years web dev, 6+ years design, 5+ video editing
- Values/personality section e Font Awesome icons use korbe (no emoji)
- Language proficiency visual bars e

---

### v1.7.0 — Projects Page
**Porer version er zip:** `mdturzo-portfolio-v1.6.0.zip`

**Extra ki dibe:**
- `projects.md` (project list er reference er jonno)
- Bolo: Firebase e actual data add korbe pore (admin panel hole) — apatoto mock/placeholder data use hbe ba empty state

**Ki mone rakhbe:**
- Grid/list toggle smooth animation soho
- `/projects/slug` routing — History API, no reload
- Project detail page: breadcrumb mandatory (Home > Projects > Project Name)
- Comments section: login required, spam protection (3/hr same post)
- Within-page search engine
- Skeleton loading: grid card skeletons, list row skeletons, detail page skeletons
- `featured` + `featuredOrder` fields — admin panel e add hbe pore (v1.15.0 e), ekhane shudhu display logic

---

### v1.8.0 — Blogs Page
**Porer version er zip:** `mdturzo-portfolio-v1.7.0.zip`

**Extra ki dibe:**
- Kono extra file lagbe na

**Ki mone rakhbe:**
- Blogs page structure projects er moto same
- Reading time auto-calculate: `Math.ceil(wordCount / 200)` minutes
- `/blogs/slug` routing
- Pinned blog list er upore dakhabe
- Series/category filtering
- Skeleton loading same pattern

---

### v1.9.0 — Firebase Backend (Content)
**Porer version er zip:** `mdturzo-portfolio-v1.8.0.zip`

**Extra ki dibe:**
- Bolo kon editor use korbe: TinyMCE free ba CKEditor 5 ba Quill — tumi decide korbe kintu apatoto **TinyMCE Community** use koro (watermark thakle CKEditor 5 use korbe)
- Contact form provider oi version e bole dibe (likely **Firebase Realtime DB** te store) — default Firebase Realtime DB

**Ki mone rakhbe:**
- Firebase Realtime DB er full data structure implement hbe
- Projects + Blogs Firebase integration complete
- Comments system complete with spam protection
- Status system: published/draft/hidden — public e shudhu published
- Firebase Security Rules update hbe
- TinyMCE editor properly configured (image upload ImgBB via Worker)

---

### v1.10.0 — Gallery Page
**Porer version er zip:** `mdturzo-portfolio-v1.9.0.zip`

**Extra ki dibe:**
- Kono extra file lagbe na

**Ki mone rakhbe:**
- Videos: iframe embed — YouTube responsive
- Photos: Facebook post style — title + multiple images in a post
- Lightbox: fullscreen image preview with prev/next navigation
- `/gallery/videos` and `/gallery/photos` sub-pages
- Skeleton: 16:9 video placeholders, image grid placeholders

---

### v1.11.0 — Contact Page
**Porer version er zip:** `mdturzo-portfolio-v1.10.0.zip`

**Extra ki dibe:**
- Bolo kon form submission method use korbe: **Firebase Realtime DB** (recommended) ba EmailJS ba Formspree — default Firebase Realtime DB e store + EmailJS diye email notification

**Ki mone rakhbe:**
- 3 separate tabs/forms: General, Bug Report, Question
- Image upload: Cloudflare Worker er maddhome ImgBB, max 5 images, auto-compress
- reCAPTCHA v3 integrate korbe — API key er jonno Cloudflare Worker variable: `recaptcha_secret`. Tumi Worker e add korbe.
- Spam: 2/hr per user/IP
- Login thakle name/email auto-fill
- Skeleton: form loading skeleton

---

### v1.12.0 — Auth System
**Porer version er zip:** `mdturzo-portfolio-v1.11.0.zip`

**Extra ki dibe:**
- Firebase console theke Google OAuth, Microsoft OAuth, GitHub OAuth enable kore nite hbe — AI instruction dibe ki ki enable korte hbe

**Ki mone rakhbe:**
- Login + Signup full screen beautiful design
- Username uniqueness check: Firebase Realtime DB e `usernames/{username}: uid` hisebe store
- Password strength: real-time indicator — requirements toggle green/red
- OAuth: Google ✓, Microsoft ✓, GitHub ✓
- Signup e privacy + cookies checkbox mandatory
- Post-auth redirect logic
- `/logout` route — auto logout + home redirect
- Spam box check reminder dakhabe (email verification sent howar por)

---

### v1.13.0 — User Profile & Account
**Porer version er zip:** `mdturzo-portfolio-v1.12.0.zip`

**Extra ki dibe:**
- Kono extra file lagbe na

**Ki mone rakhbe:**
- Profile photo crop: Cropper.js library (CDN)
- Image compress: browser-image-compression library (CDN)
- Username change: 30-day cooldown rakhte paro (optional — tumi decide)
- `/@username` public profile routing
- Badges display: account badges (admin-assigned), earned badges (future-ready placeholder)
- Visibility settings: per-field public/private/logged-in toggle
- Settings: password change, 2FA placeholder

---

### v1.14.0 — Global Search + Notifications
**Porer version er zip:** `mdturzo-portfolio-v1.13.0.zip`

**Extra ki dibe:**
- Kono extra file lagbe na

**Ki mone rakhbe:**
- Search: animated overlay — Escape diye close, smooth open/close
- Search index: static index build korbe (pages, sections), Firebase data (projects, blogs) runtime e fetch
- Point-based ranking: title match = highest, description match = medium, tag match = lower
- Section highlight: 2-3 sec glow/border animation — `scroll-margin-top` use korbe
- Notifications: unread badge count navbar e
- Notification read state: Firebase e per-user store

---

### v1.15.0 — Admin Panel Part 1
**Porer version er zip:** `mdturzo-portfolio-v1.14.0.zip`

**Extra ki dibe:**
- Tomar Firebase UID (admin UID) — tumi bole dibe: "Amar admin UID hocche: XXXXXXXXXX" — AI Firebase DB e `admins/{uid}: true` structure er example dibe, tumi manually set korbe
- Actually 4 slot er jonno placeholder comment rakhe dibe

**Ki mone rakhbe:**
- `/admin` — admin verify kore load hbe. Non-admin e 404-like page, URL reveal korbe na
- Sidebar: collapsible, icon + label
- Dashboard, Users, Projects, Blogs, Gallery tabs complete
- Projects tab e **"Feature on Home"** toggle (max 6, `featuredOrder` drag-drop)
- Sob table e skeleton loading rows
- Firebase realtime listener — auto refresh

---

### v1.16.0 — Admin Panel Part 2
**Porer version er zip:** `mdturzo-portfolio-v1.15.0.zip`

**Extra ki dibe:**
- Kono extra file lagbe na

**Ki mone rakhbe:**
- Comments, Reviews, Messages, Notifications, Badges, Analytics, Logs, Settings tabs
- Analytics: Chart.js (CDN) use korbe
- Logs: admin action e auto-log (Firebase write)
- Settings > General e `underDev` array update hbe — site-config.js auto reflect korbe
- Sob action e toast notification, confirmation modal for destructive actions

---

### v1.17.0 — SEO + Tracking + Reviews
**Porer version er zip:** `mdturzo-portfolio-v1.16.0.zip`

**Extra ki dibe:**
- `preview.png` — tumi design kore dibe (OG image, 1200x630px) — upload korbe assets/images/ e
- Ba bolo "preview.png placeholder e rakho" — pore replace korbo

**Ki mone rakhbe:**
- Dynamic meta tag update per route change
- og:image per page — project/blog thumbnail thakle seta, otherwise preview.png
- Breadcrumb auto-detect from URL path
- Tracking: page visit counter (Firebase increment), CV download counter
- Public Reviews section: home page e add/update
- Firebase Security Rules final review + update
- All spam protection rules verify

---

### v1.18.0 — Polish + Final
**Porer version er zip:** `mdturzo-portfolio-v1.17.0.zip`

**Extra ki dibe:**
- CV er demo PDF file — tumi upload korbe: `assets/docs/cv-demo.pdf` hisebe rakhe dibe zip e (ba bolo placeholder use korte)
- Final `preview.png` jodi ekhono replace na hoye thake
- Kono pending "under dev" page er list

**Ki mone rakhbe:**
- ImgBB full system final test + edge case handling
- Cloudflare Worker final version + all routes
- Cookie banner: on/off toggle (admin settings theke)
- Privacy Policy + Cookies Policy pages: editable via admin TinyMCE, default content thakbe
- CV download button: demo PDF serve korbe, admin settings e toggle
- Performance: lazy loading images, Firebase query optimize, caching
- Final Firebase Rules deploy
- Sob "under dev" badges cleanup — complete hoye gele badge remove
- Cross-browser check: Chrome, Firefox, Safari, mobile browsers
- Console error zero — clean final build

---

## Extra Notes (Sob Version e Mone Rakhbe)

1. **Website always runnable** — major version shes e website fully kaje hbe. Kono broken page/link/console error thakbe na.

2. **No emoji on website** — shudhu Font Awesome icons. Jodi AI emoji use kore, immediately bolo fix korte.

3. **Skeleton loading mandatory** — jokhanei data load hoy skeleton dakhabe. Kono "Loading..." text ba spinner-only acceptable na.

4. **site-config.js central** — version number, siteName, social links, features — sob site-config.js theke. Kono hardcoded value acceptable na public-facing content e.

5. **Minor fixes same chat e** — v1.X.0 er chat e-i v1.X.1, v1.X.2 etc. AI same chat e minor update korbe.

6. **Muhtasim er photo** — apatoto shob jaygay `muhtasim.webp` use korbe (hero, about, profile). Pore specific version e replace korbe. Jodi kono other photo lagbe AI bolbe.

7. **Firebase Storage use hbe na** — sob image ImgBB e. Firebase Realtime DB + Auth + Hosting only.

8. **Admin UIDs** — Firebase Realtime DB e manually set korte hbe. AI instruction dibe. Code e kono UID hardcode thakbe na.

9. **Cloudflare Worker variables** — AI jokhan notun API key lagte parbe, variable name bole dibe. Tumi Cloudflare dashboard e manually add korbe.

10. **Clean URLs** — firebase.json e rewrites properly set thakbe. `/projects/slug`, `/blogs/slug`, `/@username` sob kaj korbe.

---

## Quick Reference: Version Summary

| Chat # | Version | Main Focus |
|--------|---------|-----------|
| 1 | v1.2.0 | Foundation, folder structure, config, Firebase setup |
| 2 | v1.3.0 | Navbar (glass morphism, mega menu, dark mode) + Footer |
| 3 | v1.4.0 | Hero section + Home Part 1 (skills, about-mini) |
| 4 | v1.5.0 | Home Part 2 (stats, services, projects preview, GitHub stats) |
| 5 | v1.6.0 | Full About page |
| 6 | v1.7.0 | Projects page (list/grid, detail, comments, search) |
| 7 | v1.8.0 | Blogs page |
| 8 | v1.9.0 | Firebase backend — projects/blogs/comments live |
| 9 | v1.10.0 | Gallery page (videos + photos) |
| 10 | v1.11.0 | Contact page (3 forms, image upload, spam) |
| 11 | v1.12.0 | Auth system (login/signup/OAuth) |
| 12 | v1.13.0 | User profile + account management |
| 13 | v1.14.0 | Global search + notifications |
| 14 | v1.15.0 | Admin panel Part 1 (Dashboard, Users, Projects, Blogs, Gallery) |
| 15 | v1.16.0 | Admin panel Part 2 (Comments, Reviews, Messages, Notifs, Badges, Analytics, Logs, Settings) |
| 16 | v1.17.0 | SEO, tracking, public reviews, Firebase rules final |
| 17 | v1.18.0 | Polish, CV, cookies/privacy, performance, final |
