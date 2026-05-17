# v2.0-context.md

## ⚠️ AI INSTRUCTION — এই file কীভাবে maintain করতে হবে

> এই file টা project এর সব version এর accumulated context।


### Update rules (প্রতিটি AI এই rules মেনে চলবে):
1. ** Context er পুরানো sections কখনো edit করবে না** — শুধু নিচে নতুন section add করবে amd universal ta cile update korte pare sobai.
2. **প্রতিটি version complete হলে** নিচের template অনুযায়ী একটা নতুন section লিখবে
3. **Discussion notes** — user এর সাথে গুরুত্বপূর্ণ সিদ্ধান্ত, design choices, constraints এখানে লিখবে
4. **Setup changes** — কোনো key/config পরিবর্তন হলে সেটা note করবে
5. **কোনো information বাদ দেবে না** — future AI যাতে পুরো history বুঝতে পারে
6. ei context use kore ai ager chat er darona nibe and chat e howa jekono discussion, dissicus, ifnormation, important summary etc segula ekn e ekta kore section add kore likhbe. tobe khub bashi boro korbe na and proyojonio informaions e likhbe. 
7. proti version er xip e creator-guide e jeisob files provide korbe seta last kon version e update kora hoicilo seta sese add kore dibe jemon: `cloudflare-worker-v2.0.0.js`, `firebase-rtdb-rules-v2.0.0.json`,...


---

## 🔴 v2.0 - contexts

### v2.0.0 — Foundation & Architecture

React 18 + Vite + Tailwind + Zustand + Framer Motion দিয়ে পুরো project structure তৈরি। Firebase Auth, Realtime DB, Supabase PostgreSQL, Cloudflare Worker সব configure করা হয়েছে। Zustand stores (auth, theme, toast, notification, search), সব hooks, services, utility modules লেখা হয়েছে। 19টা page lazy-load সহ define করা, VisibilityGuard, skeleton system, toast system, ErrorBoundary, page progress bar সব তৈরি। Supabase SQL schema (18 tables + RLS), Firebase RTDB advanced rules, Cloudflare Worker script (4 routes) complete করা হয়েছে।

### v2.0.1 — Polish & Fixes

React Router future flags যোগ করায় console warnings বন্ধ হয়েছে। AnimatePresence দিয়ে page fade transition যোগ করায় page navigate এ reload effect চলে গেছে। v1.4.5 থেকে font system (Plus Jakarta Sans + DM Sans + DM Mono) এবং CSS design tokens port করা হয়েছে। Favicon সব size সহ যোগ হয়েছে। 404 page redesign হয়েছে। `creator-guide/` folder এ non-deployable files organize করা হয়েছে।


### এই Chat এ যা নতুন জানা গেছে

**Supabase keys:**
- Anon key: `eyJhbGci...hKz4BGIz...c3y8` (JWT)
- Service role key: `eyJhbGci...ml3Wwp...fyZ8` (JWT — Worker এ only)
- Publishable key: `sb_publishable_k-S_434kuFqcYfY42h7xcw_Ud_EnLN8`

**Cloudflare Worker secrets** — এখনো add করতে হবে:
- `imgbb_api` — ImgBB API key (imgbb.com থেকে)
- `resend_api` — পরে add করবে
- `recaptcha_secret` — v2.7.0 তে add করবে
- `admin_email` — `mdturzo.dev@gmail.com`
- `supabase_url` — `https://kddyucerqiwvjmuwebjv.supabase.co`
- `supabase_service` — service role JWT (উপরে)

**Hotjar:** ContentSquare script আছে (`a4b49fe204eec`), আলাদা Hotjar site ID নেই এখনো।

**Admin:** ৪+ email থাকবে — v2.10.0 admin panel এ manage হবে।

**Firebase Auth email templates:** Rich HTML accept করে না, পরে Resend custom SMTP দিয়ে করা হবে।

**Setup status:**
- Supabase SQL schema ✅ run হয়েছে
- Firebase RTDB rules ✅ set হয়েছে
- Cloudflare Worker deployed ✅

---

## 🔴 v2.0 - contexts

## v2.1.0 — Navbar + Footer + Layout + AdminQuickActions

**Navbar (সম্পূর্ণ):**
- Desktop: `@mdturzo999` logo (@ primary blue, rest white, monospace) + green pulse dot
- Center nav: Home, About, Projects, Feed, Contact — active pill highlight
- Right icons: Search (Ctrl+K shortcut), Notification bell (unread badge), Theme toggle (Sun↔Moon morph), User avatar/menu, Grid mega-menu
- Scroll behavior: transparent → glass morphism floating pill (80px) — Framer Motion
- Mega menu: 4-category grid (Portfolio, Content, Account, Legal) — animated dropdown
- Notification panel: realtime from RTDB, mark read, mark all read
- User dropdown: profile link, admin link (admin only), sign out
- Mobile sidebar: right slide-in drawer — nav links, user info, social icons, auth buttons
- Keyboard: Ctrl+K → search

**Footer (সম্পূর্ণ):**
- 4-column: Brand + socials | Explore links | Contact | Legal
- All 9 social icons (GitHub, LinkedIn, Facebook, Instagram, YouTube, X, Telegram, TikTok, Threads)
- Bottom bar: copyright + version badge + scroll-to-top button

**Layout:** Navbar + Footer + AdminQuickActions integrated

**AdminQuickActions (সম্পূর্ণ):**
- Fixed bottom-right FAB (admin only)
- Shield icon → expands with staggered animation
- 6 actions: Add Blog, Add Project, Add Post, Add Notification, View Reports, Page Visibility

**App.jsx:**
- /feed route added (Feed.jsx placeholder)
- /logout route added (auto sign out + redirect)

**Feed.jsx:** Placeholder page (fully built in v2.5.0)

## v2.1.1 — Complete Navbar + Footer Redesign + Polish
**Summary:**
User একটা AI-generated HTML design (DeepSeek) দিয়েছিল navbar + footer এর জন্য। সেটা analyze করে prompt এর সাথে মিলিয়ে React এ implement করা হয়েছে।

**Key changes:**

**Navbar redesign:**
- Top navbar: `position: relative` (scrolls away naturally) — আর fixed না
- Floating pill navbar: `position: fixed`, appears at scrollY > 450px (spring animation)
- Layout.jsx থেকে `pt-[navbar-h]` সরানো হয়েছে
- Mega menu: 4 column redesign — color-coded (blue/purple/green/amber), card-style items with icon + description
- Mobile sidebar: improved — user card, search button, contact button at bottom, social marquee (drag/touch support)
- Tooltip: `bottom: calc(100%+8px)` → `top: calc(100%+8px)` fix (viewport overflow সমস্যা)
- `data-tooltip-up` class added for items near screen bottom

**Footer redesign:**
- Grid: `1.2fr 0.8fr 0.8fr 1.2fr` (30%+20%+20%+30%)
- Col 1: Logo (T avatar + green active dot on corner) + description + social pills
  - Desktop: transparent pills, Tablet: bg pills, Mobile: icon-only circles
- Col 2/3: Navigate + Resources — arrow animation on hover (slide-in chevron)
  - Footer nav title + styled underline gradient
  - Desktop: vertical list, Tablet: 3-col grid, Mobile: 2-col grid
- Col 4: Stay Connected (faInbox icon) + subscribe input + animated counter (2847)
  + Let's Connect card (links to /contact) + location line + email outside card
- Footer orb glow effects (blue left, purple right)
- Top gradient line (blue→purple)
- Bottom bar: copyright + version badge (green dot) + scroll-to-top
  - Mobile: scroll-to-top button straddles the border (absolute -22px)

**Universal Ripple:**
- `src/components/ui/Ripple.jsx` — `useRipple()` hook + `RippleLayer` component
- Applied to: Button.jsx (all variants), IconBtn, SignInBtn, SubBtn, BackToTop
- `@keyframes ripple-expand` added to index.css

**Advanced Skeleton:**
- `PageSkeleton` component: layout prop = 'hero'|'list'|'grid'|'detail'|'profile'|'admin'|'form'|'blank'
- Auto-generates appropriate skeleton based on page type
- All primitives use `animationDelay` for staggered feel

**404 page redesign:**
- "4 😢 4" — large numbers with sad face icon (animated bounce/wobble) in the middle
- Muted "If you think it's our mistake..." line with /contact link
- Quick links row: About, Projects, Feed, Contact

**Other:**
- `sidebar-scroll` class: thin scrollbar for sidebar
- `marquee-scroll` keyframe: social marquee animation
- Button.jsx: ripple on all variants, color-matched ripple per variant

**Discussions/Decisions:**
- Context file format change: single `context.md` (this file) instead of per-version files
- Old `v2.0-context.md` এবং `v2.1-context.md` deprecated, এই file replace করেছে

**Architecture Decisions**
- **Feed system:** blogs + posts → একটাই `feed` table, `type: 'blog' | 'post'` (previously separate tables)
- **Auth:** Firebase Auth only — Supabase Auth disabled. `users.id = Firebase UID`
- **Admin verify:** Firebase RTDB `/admins/{uid}: true` + Supabase `admins` table — double check
- **Image hosting:** ImgBB via Cloudflare Worker (Firebase Storage ব্যবহার হচ্ছে না)
- **Notifications:** Firebase RTDB primary (realtime), Supabase `notifications` table backup/history
- **Navbar scroll:** Top navbar `position: relative` (scrolls away) + Floating pill fixed navbar (appears at 450px)
- **Mega menu:** 4 column design — Portfolio | Content | Account | Legal

--- 

> next version summary


## v2.1.2 — Navbar/Footer Polish + Auth + Bug Fixes

**Navbar:**
- Site name changed from `@mdturzo999` → `Md Turzo` (in navbar, footer, sidebar)
- Logo: T-avatar image with green active dot on bottom-right corner (top + floating navbar + footer + sidebar)
- Removed pulsing green dot after text
- Floating navbar: advanced glass effect (`backdrop-filter: blur(22px) saturate(180%)`, semi-transparent bg, glow shadow, inset highlight)
- Mega menu: redesigned minimal — no color-coded backgrounds, just icon + text + hover bg, single top gradient line
- Icon buttons (Search, Notifications, Theme, All Pages): `data-tooltip` shows name on hover
- Nav links (Home, About…): `title` attribute for browser built-in cursor tooltip

**Footer:**
- Name changed to `Md Turzo`
- PC social pills: border removed (`border: none; background: transparent`)
- Tablet social pills: `background: var(--footer-surface); border: 1px solid; border-radius: 14px`
- Col 2/3 nav links: hover = text color only, no bg change, minimal, `width: fit-content`
- Tab + mobile: `>` arrow always visible (blue), hover only changes text color
- Mobile layout: 2-column like tablet (brand full-width row 1, subscribe/contact col 2 → full width row 2, nav full-width row 3); nav grid max 3 columns
- Contact section order: `location` → `Let's Connect card` (compact, clickable→/contact, ripple) → `email`
- Subscribe count: same `font-size: 12.5px` as surrounding text (no oversized gradient number)
- **Light mode footer**: full CSS variable override (`--footer-bg: #eef2f7`, muted blues, proper contrast)
- Subscribe input: button INSIDE input wrap on right; only the input wrap shows focus border
- Click ripple: added to Let's Connect card

**Bug Fixes:**
- **Old user caching**: `firebase.json` — `/index.html` header now `no-cache, no-store, must-revalidate`
- **Autofill white bg**: global CSS fix with `-webkit-box-shadow` inset override for dark + light mode

**Firebase Auth (v2.1.2):**
- Default action URL confirmed: `https://mdturzo.firebaseapp.com/__/auth/action`
- Facebook auth added: `email, public_profile, user_age_range, user_birthday, user_friends, user_gender, user_hometown, user_likes, user_link, user_location`
- Note: `user_friends, user_likes, user_hometown, user_link, user_location` require Facebook App Review
- Microsoft auth removed from codebase (not needed currently)

**site.config.js:** `navName: 'Md Turzo'` added, version `v2.1.2`

---

## 🔴 Universal Info (editable)

### Project Identity

| Item | Value |
|------|-------|
| Site | https://mdturzo.web.app |
| Owner | Muhtasim Rahman (Turzo) |
| Nickname | Turzo |
| Email | mdturzo.dev@gmail.com |
| Location | Nilphamari, Bangladesh |
| Stack | React 18 + Vite + Tailwind CSS + Zustand + Framer Motion |
| Auth | Firebase Auth |
| Realtime | Firebase RTDB |
| Database | Supabase (PostgreSQL) |
| Hosting | Firebase Hosting |
| Image Upload | ImgBB via Cloudflare Worker |
| Email | Resend via Cloudflare Worker |


### Keys & Setup Status

| Service | Status | Notes |
|---------|--------|-------|
| Firebase | ✅ Configured | `.env` এ config |
| Supabase | ✅ Configured | URL + Anon key `.env` এ |
| Supabase SQL schema | ✅ Run হয়েছে | 18 tables + RLS |
| Firebase RTDB rules | ✅ Set হয়েছে | Advanced rules |
| Firebase Auth action URL | ✅ Active | `https://mdturzo.firebaseapp.com/__/auth/action` — confirmed working |
| Cloudflare Worker | ✅ Set  | Script ready |
| ImgBB | ✅ Set  | `imgbb_api` Worker secret e added |
| Resend | ⏳ | `resend_api` Worker secret এ add করতে হবে |
| reCAPTCHA | ⏳ | v2.7.0 তে |
| Hotjar | ⏳ | ContentSquare script আছে (`a4b49fe204eec`), site ID later |

---

## v2.1.3 - Navbar/Footer Template Integration + Search/Share Polish

**Navbar:**
- Integrated supplied `navbar-deepseek-v2` React version into `src/components/layout/Navbar.jsx`.
- Navbar name is now `Muhtasim`; footer keeps full owner display name.
- Logo renders `/logo.webp` first and falls back to `/android-chrome-192x192.png` because `logo.webp` was not present in this workspace.
- Logo/status design is shared across top navbar, floating navbar, sidebar, and footer. Status modes are planned as `active | busy | away | offline`; current hard-coded mode is `active`. Future Firebase RTDB control should read a presence/status path.
- Desktop search icon opens a compact top-center search popup with placeholder results. Mobile/tablet search opens the sidebar search input and focuses the keyboard.
- Sidebar search hides the navigation content while typing and shows a placeholder search-results area until the real search engine is built.
- Mega menu header was removed. Mega item text changes color on hover, active route styling is applied, and click/active feedback is shared.
- Mega footer now includes share buttons for Facebook, X, LinkedIn, Telegram, native Share/copy fallback, a current-page URL bar with copy button, and the version badge.
- Floating navbar keeps the minimal advanced glass effect.

**Footer:**
- Integrated supplied `footer-v9` React version into `src/components/layout/Footer.jsx`.
- Footer and subscribe banner max width aligned to `1120px` to match navbar.
- Explore and Legal links were replaced with website-relevant links.
- Subscribe UI now preserves autofill background, marks empty/invalid email with red border/text/button theme, and keeps the Firebase subscriber-count listener placeholder/function active.
- Footer logo uses the same `/logo.webp` with fallback behavior and same active status dot.

**Toast:**
- Toast stack is capped at 3 items.
- Default timeout is now 3 seconds for all toast types.
- Toast cards were made more compact while keeping the glass style.

**Notes for future versions:**
- Firebase presence/status control still needs to be implemented.
- Full search engine is intentionally left as a placeholder.
- `logo.webp` should be added to `public/` if the exact requested logo asset is available.

**Changed files in this version:**
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/ui/ToastContainer.jsx`
- `src/store/toastStore.js`
- `src/config/site.config.js`
- `master-context.md`
- `user-guide/master-context.md`

**Additional v2.1.3 verification/update:**
- Added `public/logo.webp` from the sibling deploy copy so `/logo.webp` resolves directly.
- Updated `package.json` / lockfile version to `2.1.3`.
- Added a narrow Vite alias for `framer-motion` to its installed CJS entry because the installed `12.38.0` package points ESM exports at a missing `dist/es/index.mjs` in this environment.
- `npm run build` passed after the alias.

---

## v2.1.4 - Navbar/Search/Loader Interaction Polish

- Floating navbar is now the only place where the logo renders as a rounded avatar; top navbar, sidebar, and footer use the original logo shape.
- Navbar button/link heights were normalized so nav items, icon buttons, and Sign In align on the same vertical center.
- Floating navbar glass effect was redesigned with layered blur, subtle highlight, and a cleaner border glow.
- Right-side navbar tooltip alignment was fixed so icon tooltips no longer overflow off-screen.
- Desktop search popup is centered in the viewport with full search-field focus styling, quick-open results, and a designed no-results state.
- Sidebar search now uses the same results model and hides normal navigation while a query is active.
- Notification, user, and mega-menu anchors now respect click-to-toggle behavior without immediately reopening from outside-click handling.
- Mega menu footer now has one native Share button, a current URL field with copy control, and a right-aligned web version badge.
- Mobile/tablet sidebar footer removed Contact, moved the compact social slider under the auth/sign-out row, and reduced footer height.
- Added a global click burst effect for links, buttons, role buttons, and clickable cards; existing managed ripple controls keep their local ripple.
- Replaced the basic spinner with a reusable animated `SignatureLoader` and reused it for route/page access loading.
- Route navigation now resets scroll to the top on every pathname/search change.
- Top route progress bar now uses a smoother animated gradient with a glowing head and particle detail.
- Updated version metadata to `v2.1.4` in `package.json`, `package-lock.json`, and `site.config.js`.

### v2.1.4 final second-part update

- Replaced the previous custom `SignatureLoader` artwork with the attached CSS conic/grid loader style (`50px`, `#514b82`, rotating grid/ring shape).
- Changed lazy route loading so the first website load can show the loader overlay, while later page switches keep navbar/footer visible and render route-shaped `PageSkeleton` fallbacks.
- Added layout-specific route skeletons for hero, grid, list, detail, profile, admin, and form pages; `VisibilityGuard` now uses skeletons instead of a spinner while auth/page visibility checks finish.
- Page progress now also responds to `location.search`, and scroll reset still runs on both pathname and search changes.
- Navbar right-side custom tooltips were restyled as compact glass pills with arrow pointers and right-edge alignment for the search, theme, notification, and all-pages controls.
- Mega menu active items now force both icon and text to `var(--accent-primary)` blue.
- Top navbar inner wrapper now uses a `navbar-inner` class, with padding removed at `min-width: 1250px` to match the screenshot requirement.
- `npm run build` passed for the final v2.1.4 code and regenerated `dist/` assets.

---

## v2.1.5 - UI Polish: Search Popup, Tooltips, Click Effect, Responsive Navbar, Marquee, Colors, Progress Bar, Spinner

**Changed files:** `src/App.jsx`, `src/index.css`, `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`, `src/config/site.config.js`

**1. Desktop Search Popup Redesign (Navbar.jsx)**
- Complete visual overhaul: positioned top-14vh with blur backdrop
- Grouped results by category (Page, Account, Legal, Utility) with group labels
- Each result shows: icon in accent-bg pill, label, category badge, and animated chevron arrow
- New footer hint bar with keyboard shortcuts (↑↓ navigate, ↵ select, Esc close, Ctrl+K)
- ESC pill button styled with monospace font; input row gets a distinct gradient header bg

**2. Sidebar Search Results (Navbar.jsx)**
- Removed "coming soon" placeholder — now shows real results using the same `search-popup-item` style
- Sidebar search box activates results instantly matching the popup design but compact
- Empty state shows icon + message, same as popup

**3. Custom Tooltips Improvement (Navbar.jsx)**
- Tooltip redesigned: 8px border-radius (rectangular, not pill), slightly larger text, no backdrop-filter, cleaner shadow
- Added `data-tooltip="Menu"` to hamburger buttons (top navbar + floating navbar mobile row)
- ThemeToggle already had `data-tooltip`; all IconBtn already pass `label` as `data-tooltip`

**4. Click Effect — Minimal, Selective (App.jsx + index.css)**
- Removed `a[href]` from CLICKABLE_SELECTOR — plain links no longer get click effect
- Effect now fires on: `button`, `[role="button"]`, `.card`, `.nf-email-card` (footer cards), `[data-click-fx]` elements
- Added `data-click-fx="true"` to desktop NavLink items so nav buttons keep the effect
- NavLogo (Link) does NOT get effect since it has neither button nor data-click-fx
- Burst animation made more minimal: size × 1.5 (was 1.8), lower opacity (0.65 → was 0.82), simpler radial gradient, shorter duration (0.58s)

**5. Tablet/Mobile Navbar Differentiation (Navbar.jsx)**
- New split: `md:flex lg:hidden` for tablet = full SignIn button + ThemeToggle + Search icon + hamburger
- New split: `flex md:hidden` for mobile = round icon-only SignIn button + ThemeToggle + Search icon + hamburger
- Order is now: SignIn | Theme | Search | Menu (was: Search | Theme | SignIn | Menu)
- Applied to both top navbar and floating navbar

**6. Social Marquee Enhancements (Navbar.jsx)**
- `onWheel` event added: wheel scrolls marquee left, pauses animation, resumes after 700ms idle
- Touch events added: `onTouchStart`, `onTouchMove`, `onTouchEnd` for mobile finger sliding
- `touchAction: 'pan-x'` set on track to allow smooth horizontal swiping

**7. Light Mode Navbar + Footer Colors (index.css + Footer.jsx)**
- Navbar bg changed to `rgba(240,244,250,0.92)` (cool gray tint, distinguishable from white page)
- Footer `--nf-footer-bg` in light mode: `#edf2f7` (slightly blue-gray); surfaces also updated accordingly
- Dark mode unchanged

**8. Page Progress Bar Simplification (index.css)**
- Height reduced: 3px → 2px
- Removed animated gradient (`progress-gradient` animation removed)
- Removed particle `::before` pseudo-element and keyframes
- Removed `.page-progress-head` round orb element (hidden via `display:none`)
- Now uses clean 2-color gradient: `var(--accent-primary)` → `var(--accent-hover)` → `#818cf8`
- Minimal box-shadow: `0 0 8px rgba(59,130,246,.45)`

**9. Navbar Logo + Name: Username Below (Navbar.jsx)**
- NavLogo now shows two lines: `navName` (bold, 16px) and `seo.twitterHandle` (10px, tertiary, monofont)
- Floating navbar glass effect simplified: removed `::before`/`::after` pseudo-elements (white line + gradient border), now uses single `background: rgba(10,18,40,0.72)` with minimal `box-shadow`

**10. Initial Page Spinner (App.jsx)**
- Replaced `SignatureLoader` (complex CSS conic loader) with a simple CSS spinner (`border + borderTopColor + spin animation`)
- Size: 34×34px, 3px border, theme-aware colors (`--border-strong`, `--accent-primary`)
- Removed `SignatureLoader` import from App.jsx

---

## v2.2.0 - Home Page Implementation

**User-provided context for this version:**
- The AI was instructed to read `attachments-for-ai/master-prompt-v2.%.%.md`, `about.md`, `projects-v1.md`, `projects-v2.md`, `v2-workflow.html`, and this `creator-guide/master-context.md`.
- `attachments-for-ai/thumbnail.png` is the default meta preview image for now. It was copied to `public/preview.png`.
- `attachments-for-ai/hero.webp` is the main hero portrait and was copied to `public/hero.webp`.
- `attachments-for-ai/hero-back.webp` is used in the mini about section and was copied to `public/hero-back.webp`.
- This version only implemented v2.2.0 Home Page scope from the master prompt.

**Home page sections added in `src/pages/Home.jsx`:**
- Full animated hero section with provided portrait, dark mesh/orb background, CTA buttons, social links, animated stats, and responsive visual layout.
- AboutMini section using `hero-back.webp`, key facts from `about.md`, auto-calculated age from `SITE_CONFIG.owner.fakeDOB`, and link to `/about`.
- Skills section using the skill data from the provided about/profile references: AI, HTML/CSS, Git/GitHub, Python, JavaScript, Java.
- Services section with the current public services: website design, graphic design, photo/video editing.
- Stats section with animated counters. It reads `stats_years_dev`, `stats_years_design`, and `stats_projects` from Supabase `site_settings`, with site config fallbacks.
- Recent Projects section reads featured public projects from Supabase and hides automatically if there are zero featured projects, matching the master prompt rule.
- GitHub stats embed added using the streak stats service for username `muhtasim-rahman`.
- Reviews Preview reads approved reviews from Supabase and shows skeleton/empty states when loading or when no approved review exists.
- Each dynamic area has section-level skeleton loading.

**Data and service behavior:**
- `getFeaturedProjects()` now supports both schema names: prompt-standard `featured` and older local `is_featured`, trying `featured` first and falling back to `is_featured`.
- Home Supabase calls are failure-tolerant. Missing env/database data does not crash the page; sections either use fallbacks, skeleton completion, empty state, or hide per prompt rules.
- SEO metadata now uses `buildMeta()`, `personSchema()`, and `websiteSchema()`, with `/preview.png` as the default OG image.

**Version/config updates:**
- `SITE_CONFIG.version` updated to `v2.2.0`.
- `package.json` and `package-lock.json` version updated to `2.2.0`.
- Supabase client `X-Client-Info` updated to `mdturzo-portfolio/2.2.0`.

**Supabase script added:**
- `creator-guide/supabase-v2.2.0.sql`
- No new tables are required.
- Script inserts missing home stats settings if absent.
- Script ensures `projects.featured` and `projects.featured_order` columns exist.
- Script adds indexes for home featured projects and approved reviews.

**Verification:**
- `npm run build` passed after implementation.
- `npm run lint` could not run because this repository does not currently include an ESLint config file. ESLint stopped before checking code.
- Release zip created: `mdturzo-portfolio-v2.2.0.zip` with root folder `mdturzo-portfolio-v2.2.0/`.

**Changed files in this version:**
- `src/pages/Home.jsx`
- `src/services/supabase.js`
- `src/config/site.config.js`
- `src/config/supabase.config.js`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `public/preview.png`
- `public/hero.webp`
- `public/hero-back.webp`
- `creator-guide/supabase-v2.2.0.sql`
- `creator-guide/master-context.md`

---

## v2.2.1 — Home Page Overhaul + About + Contact

**Changed/New files:**
- `src/pages/Home.jsx` — Full rebuild: assembles all home sections, passes settings down, full OG/Twitter SEO meta
- `src/pages/About.jsx` — Full page: bio, timeline (2017–2025), tools grid, interests, CTA
- `src/pages/Contact.jsx` — Full contact form: validation, Cloudflare Worker email send, success state, social links
- `src/hooks/useSiteSettings.js` — NEW: Supabase `site_settings` fetch with typed defaults + error fallback
- `src/components/ui/CookieBanner.jsx` — NEW: GDPR cookie consent, Supabase-controlled toggle, localStorage persistence
- `src/components/home/Hero.jsx` — NEW: animated star canvas BG, typing animation, floating skill orbit, photo glow rings, count-up stats row, available badge, CV/hire buttons, social icons, scroll indicator
- `src/components/home/Stats.jsx` — NEW: 4 count-up stat cards, Supabase-driven (statsYearsDev, statsYearsDesign, statsProjects)
- `src/components/home/AboutMini.jsx` — NEW: mini about section with photo, quick facts, floating badges
- `src/components/home/Skills.jsx` — NEW: 4-category skill grid, progress bars + star ratings
- `src/components/home/Services.jsx` — NEW: 3 service cards (Web Dev, Design, Video Editing)
- `src/components/home/RecentProjects.jsx` — NEW: Supabase featured projects (6 max), fallback to 6 static projects
- `src/components/home/GithubStats.jsx` — NEW: github-readme-stats + streak-stats API embeds
- `src/components/home/Testimonials.jsx` — NEW: Supabase approved_reviews, star ratings, fallback
- `src/components/home/BlogMini.jsx` — NEW: latest 3 feed posts from Supabase, auto-hides if empty
- `src/components/home/CTA.jsx` — NEW: hire-me banner with glow orbs
- `src/config/site.config.js` — version bumped to v2.2.1
- `package.json` — version 2.2.1
- `CHANGELOG.md` — added

**Image requirements (public/ folder এ রাখতে হবে):**
- `public/muhtasim.webp` — Hero + AboutMini + About page তে ব্যবহার হয়। Portrait/square crop, object-top। ছবি না থাকলে gradient fallback দেখায়।
- `public/preview.png` — OG image (already referenced in site.config.js seo.defaultOGImage)

**Supabase dependencies (v2.2.1 new):**
- `site_settings` table: `stats_years_dev`, `stats_years_design`, `stats_projects`, `available_for_work`, `cv_enabled`, `cv_url`, `cookie_banner` keys
- `projects` table: `is_featured`, `featured_order` fields — featured projects এর জন্য
- `reviews` table: `status: 'approved'` — Testimonials এর জন্য
- `feed` table: existing — BlogMini এর জন্য

**Architecture decisions:**
- `useSiteSettings` hook সব dynamic settings manage করে — Hero, Stats, Home সব এটা থেকে পায়
- CookieBanner `localStorage` key: `mdturzo_cookie_consent` ('accepted' | 'declined')
- RecentProjects: Supabase খালি থাকলে 6টা hardcoded fallback project দেখায়
- GithubStats: `muhtasim-rahman` GitHub username hardcoded — github-readme-stats public API ব্যবহার করে
- Contact form → Cloudflare Worker `/send-email` route → Resend API

> before v2.2.1 admin created v2.2.0 using Codex but that swas not so good as that. This version was also created as v2.2.0, but admin wants this to deploy as v2.2.1. this is the base of homepage, update is comming soon.

---
 
## v2.2.2 — Hero Redesign + Home Polish
 
**Public assets added (place in `public/`):**
- `hero.webp` — main hero photo (arms-crossed portrait, transparent/removed bg ideal)
- `hero-sit.webp` — sitting pose, used in CTA section right side
- `hero-back.webp` — back-view jersey photo, used in AboutMini section
- `preview.webp` — 1200×630 OG social share image
- `icons/html5.svg`, `icons/css3.svg`, `icons/python.svg`, `icons/vscode.svg`, `icons/design.svg` — floating tech icons in Hero
**Changed files:**
- `src/components/home/Hero.jsx` — full rewrite from v1.4.5 HTML template; all inline CSS; "Assalamu Alaikum" chip with fa-handshake (yellow/orange); name line 1 "Muhtasim Rahman" (accent blue), line 2 "Mahmud (Turzo)"; View Projects primary btn, CV/Hire Me secondary; SVG icons from /icons/; HTML title tooltips on buttons & socials; stats count from 0 via IntersectionObserver; hero.webp; futuristic bottom gradient + glowing HR line; fully responsive (desktop/tablet/mobile circle frame); floating icons balanced positions
- `src/components/home/Skills.jsx` — merged Stats section into Skills; 4 stat cards + 4 skill category grids; compact redesigned layout
- `src/components/home/AboutMini.jsx` — uses hero-back.webp; improved facts grid
- `src/components/home/RecentProjects.jsx` — added View All Projects CTA button at bottom; tablet shows top-4, mobile top-3 (CSS-controlled via grid responsive)
- `src/components/home/Testimonials.jsx` — renamed to "Reviews"; "Give Review" btn → /reviews/give; "View all" → /reviews
- `src/components/home/GithubStats.jsx` — removed broken readme-stats embeds; uses ghchart.rshah.org contribution graph + static stat cards (update values manually each release)
- `src/components/home/CTA.jsx` — professional design; left: content + feature pills; right: hero-sit.webp overflowing card top
- `src/components/home/Services.jsx` — added `section-alt` class
- `src/components/home/BlogMini.jsx` — added `section-alt` class
- `src/pages/Home.jsx` — removed Stats section (merged into Skills); fixed OG meta with full URL + webp type/dimensions
- `src/App.jsx` — added `/home` → `/` Navigate redirect; added Navigate to react-router-dom imports
- `src/config/site.config.js` — version v2.2.2; defaultOGImage → full URL with .webp
- `src/index.css` — added: `html { scroll-padding-top: 80px }`, `.section-alt` (surface bg + dot texture), `.hero-bottom-fade`
- `index.html` — OG image → preview.webp
- `package.json` — version 2.2.2
- `CHANGELOG.md` — updated
**Known deferred items:**
- About page full build → v2.3.0 (built in v2.2.0, kept)
- Contact page full build → v2.6.0 (built in v2.2.0, kept)
- Reviews page (`/reviews`, `/reviews/give`) → needs building in future version
- Testimonials "Give Review" btn links to `/reviews/give` — page not yet built
- Section scroll-snap smooth behavior (requested) — partially done via scroll-padding-top; full snap not implemented to avoid scroll jank
---

## v2.2.3 — Hero v2 + Navbar Polish + Multi-section Improvements

**Summary:**
Major polish release. Hero section fully redesigned based on user feedback + provided HTML template reference. Navbar transparent on home, mega-menu z-index fixed, logo hover removed. Skills redesigned with tab layout. AboutMini upgraded with larger image + 6th card as button. CTA fully replaced with minimal premium design. GithubStats 3-panel redesign. RecentProjects mobile/tablet limits CSS-controlled. Section bg alternation fixed. Footer/navbar padding aligned to body. Smart section snap added. /home route now shows same content as / (not redirect).

**Changed files:**
- `src/App.jsx` — /home route renders `<Home/>` instead of Navigate redirect; added SectionSnap component (smart scroll snap with 68px navbar offset, 80px threshold, 420ms delay, smooth); added useRef import
- `src/pages/Home.jsx` — corrected section order and bg alternation comments; removed BlogMini from imports (kept in section order)
- `src/components/home/Hero.jsx` — full rewrite v2.2.3: greeting "Assalamu Alaikum <wave-svg> I am —" in signature italic+mono font (no badge); name line 1 "Muhtasim" (white), line 2 "Rahman (Turzo)" (accent); WaveIcon inline SVG; typing smoother (110ms type, 44ms del); PC max-height 760px; floating icons with random staggered positions (no perfect column); round frame on tablet AND mobile (ring-pulse animation preserved); floating icons 30px+ away from round frame on mobile/tablet; image never crops (overflow:visible on PC, height tracks left content); dual gradient layers (z:3 content-above, z:9 full-overlay 15%); futuristic SVG bottom bar with scan beams + animated dots; Download CV btn (cv_enabled flag from settings); social icons with hover lift+scale+shadow + tooltip on handle; stats with primary-color FontAwesome Plus icon; scroll btn with track/dot animation; 68 stars, 52 particles for richer background; 4 orbs
- `src/components/home/Skills.jsx` — redesigned: vertical tab selector (left sidebar on PC, row on mobile) + animated skill bar panel; AnimatePresence tab transitions; stat pills row at top; tabs: Web Dev / Design / AI & Prod / Video
- `src/components/home/AboutMini.jsx` — uses muhtasim-about.webp (was hero-back.webp); image size w-72/sm:w-80/lg:w-96 (was w-64/sm:w-72); 6th fact grid item is a Link to /about styled as premium card button with BookOpen icon + "Read Full Story" text; removed separate Link button
- `src/components/home/RecentProjects.jsx` — bg changed from section-alt to plain section; mobile CSS hides 4th+ cards; tablet CSS hides 5th+ cards (nth-child approach); View All button already existed
- `src/components/home/GithubStats.jsx` — completely redesigned 3-panel: (1) weekly activity bar chart + 4 mini stats; (2) language breakdown with stacked bar + legend; (3) full-width contribution graph; bg changed to section-alt
- `src/components/home/BlogMini.jsx` — bg changed from section-alt to plain section
- `src/components/home/Services.jsx` — already section-alt (no change)
- `src/components/home/Testimonials.jsx` — already plain section (no change)
- `src/components/home/CTA.jsx` — completely redesigned: minimal premium, 2-col grid (content left | image right), hero-sit.webp overflows card top by 48px, check-list of services, thin left border separator, glow under image
- `src/components/layout/Navbar.jsx` — (1) transparent top navbar on home/home page (border-transparent, bg-transparent); NOTE: to apply transparent navbar to any page, add its pathname to isHomePage check; (2) logo "Muhtasim" text: hover blue removed (stays primary color); (3) mega-panel z-index raised to z-[10000] for all pages; (4) isHomePage detection + note for future pages; (5) navbar inner padding aligned with body containers (1.75rem up to 1440px then 0)
- `src/components/layout/Footer.jsx` — padding changed from clamp(16px,4vw,48px) to 1.75rem (matching navbar); max-width 1120px→1280px for nf-inner and nf-sc; @media ≥1440px padding:0
- `src/index.css` — container padding changed from clamp(1rem,4vw,2rem) to 1.75rem (matches navbar/footer); .section gets scroll-margin-top:68px; @media ≥1440px container padding:0
- `public/preview.webp` — updated OG image
- `index.html` — og:image:width + og:image:height meta tags added
- `src/config/site.config.js` — version v2.2.3
- `package.json` — version 2.2.3

**Architecture notes:**
- Navbar transparent home: `isHomePage = location.pathname === '/' || location.pathname === '/home'`. To extend to other pages, add pathnames here. Documented in Navbar.jsx comment.
- Section snap: SectionSnap component in App.jsx, only activates on isActive pages (/ and /home). Snaps within 80px of a section boundary, 420ms delay after scroll stops, smooth behavior.
- /home now renders full Home page content (not redirect) — both routes work identically.
- About page: v2.3.0. Contact page: v2.6.0. Still not built; existing pages kept.
- Floating navbar mega-menu: z-index 10000 — above all page content including 404 and other pages.
- RecentProjects: nth-child CSS (no JS) for mobile/tablet limits — clean, no layout shift.

**Deferred:**
- About page full build → v2.3.0
- Contact page full build → v2.6.0
- Reviews/Testimonials page → future version
- Floating navbar glass blur on mega (already had .mega-floating class in CSS)

---

## v2.2.4 — Alignment Fix + UX Polish + Search Refactor + Dynamic GitHub

**Summary:**
Major UX and visual polish release. Unified max-width across navbar, containers, and footer to 1120px — ending the misalignment on large screens. Hero section fully reworked: image height driven by left content height ×1.1 via ResizeObserver, image parent has no width restriction so full image shows; floating icons repositioned outside circular frame on tablet; round frame only triggers at ≤900px stack layout. Waving hand icon replaced with Google Material Symbols `waving_hand`. Cookie banner moved to global Layout so it no longer repeats on non-home pages. Search popup removed — desktop icon shows toast, mobile sidebar shows "coming soon" placeholder. GitHub section fully dynamic (live API + streak stats + readme-stats images). CTA redesigned: centered, no image, SVG noise texture. Light mode made warmer and less harsh. About/Contact pages cleared for planned redesigns.

**Changed files:**
- `index.html` — Added Google Material Symbols stylesheet for `waving_hand` icon
- `src/index.css` — container-xl/lg max-width changed 1280→1120px to match navbar; light mode palette updated (bg-page: #EEF2F7, bg-surface: #F8FAFD — warmer, less blinding white); navbar-bg in light mode updated accordingly
- `src/config/site.config.js` — version v2.2.4
- `src/components/layout/Layout.jsx` — Added `<CookieBanner/>` here (global, shows on all pages once)
- `src/components/ui/CookieBanner.jsx` — Fixed: key changed to `mdturzo_cookie_consent_v1`, try-catch around localStorage, z-index raised to 9990, styled with rounded-2xl + icon
- `src/pages/Home.jsx` — Removed CookieBanner import/usage; corrected section bg alternation (Skills→alt, About→plain, Projects→alt, Services→plain, Testimonials→alt, Github→plain, Blog→alt, CTA→plain)
- `src/components/home/Hero.jsx` — Full rewrite v2.2.4: (1) Waving hand = `<span class="material-symbols-outlined">waving_hand</span>`; (2) Image height = contentRef.getBoundingClientRect().height × 1.1 via ResizeObserver; (3) `.hscene` has no width limit — image shows fully unconstrained; (4) Round frame ONLY at ≤900px (when columns stack); (5) Floating icons: PC = positioned absolutely outside image; tablet = just outside circular frame border (not on top of it, not too far); (6) Left content uses `align-self:center`; (7) All tablet/mobile content centered; (8) `min-height:100dvh` instead of fixed height
- `src/components/home/Skills.jsx` — section-alt bg added; stat pill cards redesigned with emoji icon + color borders; progress bar redesigned (fill gradient + animated dot at tip); sidebar tabs aligned to match panel right edge
- `src/components/home/AboutMini.jsx` — section-alt removed (now plain); More button: `hover:scale` removed, only inner effect stays; image frame: dual gradient layers for dark/light mode (dark: rgba(2,6,23), light: rgba(225,232,242))
- `src/components/home/RecentProjects.jsx` — section-alt added; card hover border = `var(--card-color)` (category color, not always accent); title link only (not full card) — title hover color = category color
- `src/components/home/Services.jsx` — section-alt removed (now plain); card hover border = service color via CSS custom property
- `src/components/home/Testimonials.jsx` — section-alt added
- `src/components/home/BlogMini.jsx` — section-alt added
- `src/components/home/GithubStats.jsx` — Full rewrite v2.2.4: all data dynamic; (1) GitHub API for profile (repos, followers, bio, avatar); (2) streak-stats.demolab.com for streak image (theme switches dark/light); (3) github-readme-stats for repo stats + top langs; (4) stat cards are live with tooltips; (5) profile bio card if bio exists; (6) all images switch theme on isDark() change
- `src/components/home/CTA.jsx` — Full redesign: centered layout, no image, SVG noise texture bg, pill-style feature tags, accent orbs, compact; `public/hero-sit.webp` removed
- `src/components/layout/Navbar.jsx` — (1) navbar-inner gets `max-width:1120px; margin-inline:auto` — aligned with containers; (2) Search popup/DesktopSearchPopup completely removed; desktop search icon shows `toast.info('Search coming soon')`; Ctrl+K handler removed; (3) Sidebar search shows "Search coming soon" placeholder when typing; sidebar search bar focus: whole bar border+glow changes (not just input); clear X button shows when typing; (4) `linkCls` uses new `.top-nav-link` class with pill hover effect (border+bg transition); (5) Mega nav: glass effect always applied (top+floating) via `.mega-panel .rounded-2xl` selector; (6) Top navbar right icons: minimal `bg-surface-2` bg always visible; (7) Icon tooltips: `data-tooltip` already present — Search, Notifications, Theme, All Pages all have proper labels; (8) `getSearchResults` / `SEARCH_ITEMS` removed from code
- `src/components/layout/Footer.jsx` — `nf-inner` max-width 1280→1120px; `nf-sc` max-width 1280→1120px + `margin-inline:auto` for proper centering; `nf-contact-card:active` fixed with `!important` override to prevent conflicting transform from hover
- `src/pages/About.jsx` — Contents cleared; placeholder "coming soon in v2.3.0" shown
- `src/pages/Contact.jsx` — Contents cleared; placeholder "coming soon in v2.6.0" shown

**Architecture notes:**
- Max-width unification: All containers (navbar-inner, container-xl, nf-inner, nf-sc) now use 1120px. Padding: 1.75rem up to 1250px, 2rem up to 1440px, 0 beyond 1440px.
- Cookie banner: single instance in Layout.jsx. Key v1 to avoid conflicts with old v2.x consent. try-catch for private mode support.
- Hero image height: `ResizeObserver` on left `.hcontent` div. `imgHeight = contentRect.height * 1.1`. On tablet (≤900px), inline style is overridden by CSS object-cover.
- Round frame: CSS-only at `@media(max-width:900px)` — when grid stacks. PC always shows full portrait.
- GitHub stats: `useThemeStore().isDark()` used to switch image theme params. All images keyed with `key={streak-${theme}}` to force re-render on theme change.
- Search removal: `SEARCH_ITEMS`, `getSearchResults`, `DesktopSearchPopup` all deleted. Only sidebar search bar UI remains (no functional search). Desktop click → `toast.info`.
- Section alternation (Home.jsx): Skills=alt, About=plain, Projects=alt, Services=plain, Testimonials=alt, Github=plain, Blog=alt, CTA=plain.

**Deferred:**
- About page full build → v2.3.0
- Contact page full build → v2.6.0
- Full search engine → future version (post v2.6.0)
