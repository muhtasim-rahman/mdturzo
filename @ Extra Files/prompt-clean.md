# Master Prompt — mdturzo.web.app Portfolio Website

> **AI কে নির্দেশ:** এই prompt এ যে major version এর কাজ করতে বলা হবে, শুধু সেই version এর কাজ করবে। User আলাদাভাবে বলে দেবে কোন version এর কাজ করতে হবে।

---

## Instructions

ami amr jonno ekta new and advanced portfolio website banabo. firebase er free plan e deploy korbo. url hbe: `https://mdturzo.web.app`

ei project ta ektu boro hbe. ami ei prompt e amr full plan boltichi. kintu tumi sob ekbare korba na. ei full project take tumi tomar moto kore 10-20 ta sub project e vag korba. proti step e ekta kore version update hbe. version numbering hbe eirokom: first major version `v1.2.0`, second `v1.3.0` eivabe — `v1.2.0` theke `v1.16.0` porjonto major versions hbe (16 ta chat e finish hbe.. tobe lagle aro bashi te vag korte paro). minor fix/update gula hbe `v1.0.1, v1.0.2` eirokom.

protita version ami ai dea banabo tobe protita alada alada chat e hbe. orthat chat e ager version er memory thakbe na — khali jei version korbo sei version er ager version er full codes and required info or files provide korbo.

ekta chat er moddhe oi version er-i kaj hbe and kono fix/update korte cile seta oi chat-ei korbo, segular version hbe minor: `v1.0.1, v1.0.2, ... jotogula lagbe`. ami niche amr full plan dicchi. tumi segula valo kore analyse kore amake 10-20 ta major version er jonno kon version e ki implement korbo segula bole diba. ei plan kore amake tumi `master-plan.md` file diba. ami proti new chat e ei master prompt dibo.

tumi amake r ekta `.md` file e kon chat e ki ki files and informations provide korte hbe segula list kore diba. amr jonno ja kichu dorkar provide kora, ba amr mathay rakha — ogula sekhane bole diba.

proti major version shes e amake oi full project structure onujayi sob files zip kore diba. also amake github er jonno ekta commit message diba:

```
v1.2.0 — One line summary

Description:
- line 1
- line 2
- line 3 (max 10 lines)
```

major version gula emon kore divide korba jate oi version e ja kichu kora hocche sob complete hoy. kono kichu unfinished ba runable condition er baire rakhba na. major update gula ami onek somoy por por korte pari — ti website jate sokol major update e runable condition e thake.

---

## My Plan

amr sob personal information `about.md` file e dewa ache. projects erjonno `projects.md` provide korbo (projects version er somoy). hero/banner section er jonno `muhtasim.webp` image provide korbo.

ami master plan bananor somoy `v1.1.0.zip` o provide korbo — seta amr age bana incomplete version. seta reference hisebe dekhte paro tobe seta theke directly copy kora jabe na karon ota pocondo hoy nai and complete o na.

---

## Tech Stack

- **Pure HTML, CSS, Vanilla JS only** — no build tools, no frameworks, no React, no Vite
- Libraries: Tailwind CDN, Google Fonts, Font Awesome Icons, Firebase SDK (CDN)
- Image: ImgBB API (Firebase Storage use hbe na)
- Secrets: Cloudflare Workers (service worker diye API keys manage)
- Deploy: Firebase Hosting — root folder e `index.html` thakbe, direct deploy hbe

---

## File & Folder Structure

`root/` e shudhu `index.html` thakbe. baki sob assets er jonno ekta `assets/` folder thakbe. assets er vitorে:

```
assets/
├── css/
│   ├── style.css         ← global/foundational styles
│   ├── home/             ← home page er proti section er alada .css
│   ├── about/
│   ├── contact/
│   └── ... (page name onusare)
├── js/
│   ├── app.js            ← global/foundational script
│   ├── home/
│   ├── about/
│   ├── contact/
│   └── ... (page name onusare)
├── images/
└── icons/                ← custom svg/png icons, favicons
```

files gula secure rakhar sorbocco cesta korba. website er color palette amr upload kora `muhtasim.webp` image er kacakachi hbe — at least primary color ta.

---

## Pages

website e onekgula pages thakbe: `home`, `about`, `projects`, `blogs`, `gallery`, `courses/learn`, `contact`, `profile`, `privacy-policy`, `cookies-policy` etc. sobgular jonno alada alada `.html` / `.js` files hbe. `navbar` and `footer` ekjaygay toiri hbe, sob page e same dakhabe.

URL clean hbe: `/contact`, `/about`, `/projects/slug` etc. ei URL e kew directly visit korlew page load hbe. page load howar somoy navbar er upore top e ekta functional loading progress bar dakhabe.

---

## Navbar

minimal and professional. sob page e same. ki ki thakbe: 4/5 nav items (mobile e home bade 4ta, desktop e 5ta), account icon, light/dark toggle (eye-catching animation soho), search icon, notification icon, and ekta "all nav items" icon (click korle navbar er niche popup e category-wise sob nav items dakhabe). small screen e sidebar drawer e sob. top e thakle hero section er sathe combined, scroll korle rounded corners soho glass morphism effect er floating navbar hbe. fully responsive.

---

## Footer

reference images theke inspired ekta sundor footer. links, social icons, copyright etc thakbe.

---

## Hero / Banner Section

onek professional design with advanced animations. left 3/5 e contents (name, title, tagline, CTA buttons etc), right 2/5 e `muhtasim.webp` image. background eo animations thakbe. full website e consistent margin maintain korba.

---

## Home Page — Other Sections

tomar jana mote amr portfolio er home page e ja ja sections thakle valo hoy sob add korio. `about.md` theke info nio. reference images theke idea nite paro.

---

## Global Search Bar

navbar er search icon click korle animation er maddhome search bar asbe. web er jekono kichu search kora jabe. results point-based and category-wise show korbe. result e click korle direct oi page er oi section e nea jabe and 2-3 sec er jonno oi section highlight korbe.

---

## About Page

unique and professional design. `about.md` er sob info sundor vabe present korbe.

---

## Contact Page

main priority: user ke directly contact korano. alada alada form thakbe: general contact, bug report, question/query. max 5 images upload (auto compress). login er pasapasi spam protection: 1hr e max 2 ta contact submit. form submission provider ami oi version er somoy bole dibo.

---

## Projects & Blogs Page

grid/list toggle. list view e: left thumbnail, right e title, short description, links, tags, category. grid e different card design. fully responsive. project/blog e click korle URL change hbe (`/projects/slug`, `/blogs/slug`) and details page load hbe (no reload). share link kore direct access korা jabe.

**Data structure (Firebase Realtime DB):**

```
projects/{slug}: title, shortDescription, thumbnail (ImgBB URL),
  githubLink, liveLink, pdfLink, customLink, tags, category,
  content (HTML), status, featured, seoTitle, seoDesc, createdAt

blogs/{slug}: title, id (8-digit random), thumbnail, content (HTML),
  author, readingTime (auto), coverImage, series, category,
  status, pinned, createdAt
```

status system: `published / draft / hidden`. admin panel theke control hbe. public page e shudhu published content dakhabe.

projects/blogs er moddhe alada alada search engine thakbe — advanced algorithm diye shudhu oi page er content search korbe.

projects and blogs er niche comments section thakbe. login kora user comment korte parbe (max 500 chars, text only). spam protection: eki post e 1hr e max 3 comments. user nijer comment edit/delete korte parbe.

**Editor:** TinyMCE (watermark/limitation thakle best alternative use korio). headings, bold, links, images, iframe support thakbe. output HTML string hisebe store hbe.

**URL:** `/projects/slug` and `/blogs/slug` format use korbo.

---

## Gallery Page

main page e 2-3 rows videos section (iframe embed) and nicher photos section (ImgBB uploaded, Facebook post style — ekta title er niche multiple images). click korle fullscreen preview. sob admin panel theke control hbe.

sub-pages: `/gallery/videos`, `/gallery/photos` (view all er jonno).

---

## Notifications

navbar e notification icon. click korle popup e notifications dakhabe. admin panel theke manage hbe.

---

## ImgBB Naming Convention

sob image upload e nirdisto naming format follow korba:

| Type | Format |
|------|--------|
| User profile | `up_[uid]_[datetime].webp` |
| User banner | `pb_[uid]_[datetime].webp` |
| Contact form | `cf_[uid]_[datetime].webp` |
| Project thumbnail | `pt_[project-id]_[datetime].webp` |
| Blog thumbnail | `bt_[blog-id]_[datetime].webp` |
| Gallery image | `gm_[post-id]_[datetime].webp` (multiple: `...-001`, `-002`) |

compress level select option thakbe: High / Medium / Low / None. user image select korle advanced library diye crop korte parbe. crop er por compress and WebP convert hbe. Cloudflare Workers e sob API keys (ImgBB etc.) store hbe — service worker variable names and code provide korba.

---

## Login / Signup

alada page e open hbe (no reload). full screen beautiful design.

**Signup fields:** first name, last name, @username (unique), email, password (strength indicator — requirements red/green toggle), confirm password, privacy & cookies checkbox, submit. niche: Google, Microsoft, GitHub OAuth.

signup er por age jei page e cilo sei page e redirect. home page e thakle profile page e redirect. already account thakle login page e link.

**Login:** email or username + password. password reset option. Firebase Authentication diye sob hbe. spam box check reminder dakhabe.

---

## User Profile / Account

profile page e: banner, profile photo, name, @username, bio (single line), web link. edit button theke: profile photo (crop + compress), banner (crop + compress), name, username (live availability check), bio (max 100 chars), description, web URL, social media (dropdown theke select, max 5 — GitHub, LinkedIn, Facebook, YouTube, Instagram, icons soho), address (city, division, country), etc.

edit icon er pashe settings icon: password change (old password or reset link), 2FA, account public/private toggle. sob Firebase Realtime DB e save hbe.

**Public profiles:** `/@username` e gele public account er profile dakhabe. user nijer moto kore decide korte parbe kon info public/private/logged-in-only.

profile e badge dakhabe. **account badges** (admin-assigned only — admin, premium, verified, service taken, top fan etc.) and **earned badges** (milestone-based, future-ready). user edit korte parbe na. shudhu admin panel theke assign/remove.

profile er niche aro sections thakbe (tomar moto kore design korio).

---

## Public Reviews Section

home page ba dedicated section e. login kora user review dite parbe (1 bar, pore edit only). star rating (max 5). min 30 / max 1000 chars. max 3 image upload. verified badge admin assign korbe. authentic user only.

---

## Admin Panel

admin er UID Firebase Rules e set thakbe — code e thakbe na. `/admin` e gelew direct data load hbe na, age verify hbe — admin na hole mone hobe page exist e kore na.

navbar thakbe na. shudhu: main web e back arrow, sidebar collapse/expand icon. sidebar e sob navigation. single page layout, proti tab er jonno alada html/js/css. URLs: `/admin/dashboard`, `/admin/users` eirokom.

admin logged in thakle navbar e alada design and bottom right e "Editor" badge dakhabe. mega nav / profile menu / navbar icon theke admin panel access kora jabe.

**Tabs:**

**Dashboard** — stats cards (total users, projects, blogs, comments, reviews, unread messages), recent activity feed, quick action buttons, recent users/comments, site health indicators (Firebase, ImgBB, TinyMCE status).

**Users** — searchable/filterable table (name, username, email, role, status, joined date). per user: profile view, force edit, badge assign/remove, verified toggle, ban/unban, delete. user detail e full activity log.

**Projects** — list with thumbnail, title, status, tags. add/edit form: title, slug, short description, thumbnail (ImgBB + compress level), github/live/pdf/custom links, tags, category, TinyMCE editor, status (published/draft/hidden), featured toggle, SEO meta fields. actions: preview, duplicate, status change, delete.

**Blogs** — projects er motoi. extra: author name, reading time (auto), cover image, series/category, pin toggle.

**Gallery** — 2 sub-tabs: *Photos* (multi-image post, title, description, compress level, status, edit/delete/hide) and *Videos* (iframe embed URL, title, description, thumbnail, status, drag-drop reorder).

**Comments** — projects and blogs er sob comments. table: user, comment, source, date, status. filter: all/pending/approved/flagged. actions: approve, flag, delete, go to user. bulk approve/delete.

**Reviews** — moderate public reviews. table: user, rating, text, images, verified badge, date. actions: approve/reject, verified toggle, delete. top e average rating + distribution chart.

**Messages** — contact form submissions (general/bug/question). per message: full view modal, attachments preview, read/unread, star, delete. filter by type and status.

**Notifications** — create notifications (title, message, type, target: all/loggedin/specific user, link, expiry). list with edit/delete/toggle.

**Badges** — account badges and earned badges manage. badge create: name, icon, color, description, type. directly user search kore badge assign.

**Analytics** — page views, CV downloads, top projects/blogs, user growth chart, comment/review activity, most active users. interactive charts.

**Logs** — full admin action log system. viewable and exportable.

**Settings** — sub-tabs: *General* (site title, meta, favicon, maintenance mode, under-dev pages list), *Admin Profile* (name, avatar, password, 2FA), *API Keys* (show/hide toggle), *CV/Resume* (upload PDF, download link toggle), *Cookies & Privacy* (banner on/off, TinyMCE policy edit), *Security* (admin UIDs list, login attempt log, banned IPs).

**Admin UI rules:** sidebar collapsible (icon + label), every table e pagination + per-page selector, every delete e confirmation modal, sob action e toast notification, loading skeleton, empty state illustration, bulk select with checkbox, Firebase realtime listener diye auto refresh, fully responsive (mobile e sidebar drawer).

---

## SEO

protita page er jonno meta tags. `og:image` add korba — project/blog/gallery te thumbnail thakle seta use korbe, otherwise default `preview.png` (ami `assets/images/` e rakhe dibo). dynamic document title update. clean URL structure.

---

## Navigation & Breadcrumb

home theke ekta path deep hole nav logo click e back korbe. bashi deep hoile (project details, blog details, profile settings etc) top e ekta short breadcrumb bar dakhabe — path tree onusare kon page e ache dakhabe, click kore back kora jabe. automatic kaj korbe.

jekono jaga user er name/avatar e click korle tar public profile e jawa jabe.

---

## Spam Protection

| Feature | Limit |
|---------|-------|
| Contact form | max 2/hr per user |
| Comments (same post) | max 3/hr |
| Review | 1 per account (edit only) |

---

## Tracking

CV download, page visits, website visits track hbe. admin panel e dakhabe.

---

## Site Config File

website er version and basic info ekta `site-config.json` (ba `.js`) e store thakbe. oi file theke version change korle full website e reflect hbe.

---

## Under Development

kono page/section incomplete ba pore add hbe eirokom hoile chhoto "Under Development" badge add korio.

CV download button thakbe — apatoto demo PDF use hbe, pore real ta dibo.

---

## Firebase Free Plan

Firebase Spark plan e deploy. Realtime DB, Authentication, Hosting use hbe. Firebase Storage use hbe na. joto kom possible request use korba — caching, batching, efficient queries.

---

## Firebase Database Rules

full advanced, secured and logical rules diba. admin UIDs rules e hardcode thakbe — code e thakbe na. 4ta admin UID support (pore add korar jonno extensible).