# Portfolio v2 Master Context

## AI Maintenance Rules

**Strict format:** this file is append-only for version history. Keep one `#` heading for the file title only. Every version entry must use a `## vX.X.X - Title` heading. Inside a version, use `###` for subsections and bold labels for smaller important notes. Keep all important discussions, decisions, data, logs, changed files, setup notes, and future reminders in the relevant version section. Do not remove old information. Do not store commit messages here. Put one `---` divider after each patch/minor version entry and leave extra spacing only between larger version groups.

**Current structure note:** older sections below are preserved as historical data. New entries from v2.3.2 onward should follow the strict format above.

---

## v2.0 Context Legacy Notes

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
---
---

# 🔴 v2.0 - contexts

## v2.0.0 — Foundation & Architecture

React 18 + Vite + Tailwind + Zustand + Framer Motion দিয়ে পুরো project structure তৈরি। Firebase Auth, Realtime DB, Supabase PostgreSQL, Cloudflare Worker সব configure করা হয়েছে। Zustand stores (auth, theme, toast, notification, search), সব hooks, services, utility modules লেখা হয়েছে। 19টা page lazy-load সহ define করা, VisibilityGuard, skeleton system, toast system, ErrorBoundary, page progress bar সব তৈরি। Supabase SQL schema (18 tables + RLS), Firebase RTDB advanced rules, Cloudflare Worker script (4 routes) complete করা হয়েছে।

## v2.0.1 — Polish & Fixes

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
---
---

# 🔴 v2.1 - contexts

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
---
---

# 🔴 v2.2 - contexts

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

## v2.2.4 — Error - rejected

> ei  verion ta onek boro howay ai valo kore kaj kortichilo na, 4ta chat try korar porew valo kono pi nai, ti ekn setake 2ta part e vag kore ekta v2.2.5 and onnota v2.2.6 e kora jbe...

## v2.2.5 — Layout Unification, Navbar Polish, Cookie Fix, Search Refactor

**Summary:**
v2.2.5 is a major infrastructure, UX polish, and bug-fix release. It unifies the horizontal layout across Navbar, Footer, and all body sections to a single `max-width: 1120px` with `clamp(1rem, 4vw, 1.75rem)` padding — eliminating all horizontal drift on large screens. The navbar now correctly shows a transparent background only on the home page (`/` and `/home`), while the floating navbar always retains its glass morphism. The cookie banner was moved to `Layout.jsx` for true global control with `localStorage` persistence and an async-safe `checkedRef` guard. The desktop search popup and all its associated state/components were fully deleted; the search icon now shows a `toast.info` on desktop and opens the sidebar on mobile/tablet. Navbar icon buttons now have a consistent glass background and CSS-only tooltips in both navbar modes and both themes. About and Contact pages were replaced with version-labeled placeholders. Light mode palette was warmed and the waving hand icon was upgraded to Google Material Symbols.

**Changed files:**
- `index.html` — Added Google Material Symbols variable font CDN link (Task 8: waving_hand icon)
- `src/index.css` — Unified `container-xl` to 1120px + clamp padding; added CSS vars `--container-max`, `--accent-primary-rgb`; warmed light mode (`--bg-page: #F0F4F8`, surfaces adjusted); added `.nav-icon-btn` glass button class; added `.top-nav-link` glass pill hover class; added `.mega-glass` always-on glass class for mega menu; added Material Symbols font-variation settings; all tasks 1, 5, 6, 7, 8, 10
- `src/config/site.config.js` — version bumped to `v2.2.5`
- `package.json` — version bumped to `2.2.5`; added `@fortawesome/fontawesome-svg-core` as explicit dep (peer dep fix)
- `src/components/layout/Layout.jsx` — CookieBanner moved here from Home.jsx; receives `enabled` from `useSiteSettings`; passes `pathname` from `useLocation` to CookieBanner for home-only guard (Task 3)
- `src/components/ui/CookieBanner.jsx` — Rewritten: accepts `enabled` + `pathname` props; `localStorage` key `mdturzo_cookie_consent`; `checkedRef` prevents async re-evaluation; shows only on `['/', '/home']`; accept/decline both save immediately and hide forever (Task 3)
- `src/components/layout/Navbar.jsx` — Full rewrite: Task 1 (navbar-inner + nf-inner max-width 1120px + clamp padding); Task 2 (transparent bg only on home via `isHomePage = ['/', '/home'].includes(pathname)`, floating always glass); Task 4 (DesktopSearchPopup + SEARCH_ITEMS + getSearchResults + Ctrl+K + all related state DELETED; desktop icon → toast.info; mobile → sidebar + focus; sidebar search shows only input with × clear, no results); Task 5 (all 4 icon buttons use `.nav-icon-btn` glass class, `data-tooltip` on all); Task 6 (top nav `.top-nav-link` + float nav glass pill hover; mega nav `.mega-nav-item` accent hover border); Task 7 (MegaMenu always gets `.mega-glass`, not conditionally on floating)
- `src/components/layout/Footer.jsx` — Task 1 (nf-inner + nf-sc max-width 1120px + clamp padding, @media 1440px padding:0); Task 11 (nf-sc margin-inline:auto + border-radius top corners for centering); Task 12 (Let's Collaborate Link has `data-click-fx="true"`)
- `src/components/home/Hero.jsx` — Task 8: WaveIcon inline SVG removed, replaced with `<span className="material-symbols-outlined">waving_hand</span>` with accent color
- `src/components/home/AboutMini.jsx` — Task 13: removed `hover:scale-[1.02]` from Read Full Story button; added `justify-items-center` to grid; light mode image overlay reduced to ~18% opacity via CSS `.about-img-overlay`
- `src/pages/About.jsx` — Task 9: full content cleared, replaced with centered placeholder card "Coming in v2.3.0"
- `src/pages/Contact.jsx` — Task 9: full content cleared, replaced with centered placeholder card "Coming in v2.6.0"
- `src/pages/Home.jsx` — Removed CookieBanner import/render (now in Layout.jsx); no other changes

**Architecture decisions:**
- **CookieBanner in Layout.jsx:** Moving it to the layout ensures it renders on all routes without duplication. The `pathname` prop + `HOME_PATHS` array guard means it only ever activates on home routes. The `checkedRef` prevents the banner from re-showing when `enabled` changes from `undefined` → `true` asynchronously after Supabase loads — without it, the banner would briefly flicker on.
- **isHomePage detection:** `['/', '/home'].includes(location.pathname)` — simple array check. To add more pages, extend this array. The floating navbar intentionally ignores this — it always keeps glass morphism for visibility against any content.
- **Desktop search deleted (not hidden):** All state (`desktopSearchOpen`, `desktopSearchQuery`), handlers (`handleDesktopSearch`'s popup logic), the `DesktopSearchPopup` component, `SEARCH_ITEMS`, `getSearchResults`, and the Ctrl+K keyboard listener were fully removed. Only the icon button remains, now wired to `toast.info`. This avoids dead code and reduces bundle size.
- **Sidebar search no results:** The sidebar search input works visually (glow on focus, × clear on type) but does not render any results. The `SEARCH_ITEMS`/`getSearchResults` logic was also deleted from the file. This is intentional — full search is deferred.
- **Mega glass always applied:** The `.mega-glass` class is on the mega panel's inner `div` unconditionally. Previously `.mega-floating` was toggled via a `floating` prop — this caused the top-navbar mega menu to have no glass effect. Now both modes look identical.
- **@fortawesome/fontawesome-svg-core:** This peer dependency was missing from `package.json` — it's implicitly installed by other FA packages but vite's rollup raised an error at build time. Added explicitly.

**Deferred items (→ v2.2.6):**
- Hero section layout/sizing rework (ResizeObserver image height, round-frame breakpoint fix, floating icons outside frame border) → v2.2.6 Task 1
- Skills section redesign (stat cards, shimmer progress bars, sidebar grid alignment) → v2.2.6 Task 2
- RecentProjects card hover border = card color; only title clickable → v2.2.6 Task 3
- Services card hover border = service color → v2.2.6 Task 3
- GitHub Activity section: fully dynamic API data → v2.2.6 Task 4
- CTA section redesign (centered card, dot-grid texture, no hero-sit.webp) → v2.2.6 Task 5

**Important notes for the next AI (v2.2.6):**
- v2.2.6 continues from v2.2.5 — all layout alignment, navbar glass/tooltips/hover, cookie banner, search removal, and light mode fixes are DONE. Do NOT re-add desktop search popup or Ctrl+K.
- Cookie banner localStorage key is `mdturzo_cookie_consent`. Do not change this key.
- `isHomePage` detection in Navbar.jsx: `['/', '/home'].includes(location.pathname)` — if a new page needs transparent navbar, add its path to this array.
- `.mega-glass` is unconditional. Do not make it conditional on `floating` prop again.
- The sidebar search input has NO function — do not add results logic unless building full search.
- `@fortawesome/fontawesome-svg-core` is now an explicit dep in package.json — leave it there.
- Hero section still has `@media (orientation: portrait)` rule that triggers round frame — v2.2.6 Task 1 must remove this and trigger round frame ONLY at ≤900px viewport width.

---

## v2.2.6 — Bug Fixes + Section Rebuilds

**Release summary:** Fixed 7 navbar/scroll bugs from v2.2.5 and rebuilt 5 home sections.

### Bug Fixes

| # | Area | Fix |
|---|------|-----|
| 1 | Nav items click effect | Added `data-click-fx="true"` to all NavLink elements (top + floating). `overflow:hidden` removed from `.nav-icon-btn`, replaced by `.nav-ripple-clip` inner wrapper so ripple clips without blocking tooltip `::after` pseudo-elements. |
| 2 | Floating navbar overflow | Content properly flex-contained with `min-width:0` guards. Pill padding corrected. |
| 3 | Mega nav blur consistency | Floating nav mega menu now renders as a **fixed viewport overlay** (`position:fixed; left:0; right:0; top:64px`) — same full-width behaviour as the top navbar's mega menu. Both use `.mega-glass` for identical blur+backdrop. |
| 4 | Floating nav icon shapes | `.float-nav-right .nav-icon-btn { border-radius: 9999px !important }` — rounded-full pill icons in floating pill. |
| 5 | CSS tooltips not showing | Root cause: `overflow:hidden` on `.nav-icon-btn` clipped `::after` pseudo-elements. Fixed by setting `overflow:visible` on `.nav-icon-btn` and adding `.nav-ripple-clip` (`position:absolute; inset:0; overflow:hidden; border-radius:inherit`) as inner ripple container. `data-nav-right` added to all float-nav-right divs for correct right-aligned tooltip CSS. |
| 6 | Footer/navbar bg | `--nf-footer-bg` dark: `#070f25` (was `#0f172a`, identical to `--bg-surface`). `--navbar-bg` dark: `rgba(14,22,45,0.92)`, light: `rgba(255,255,255,0.95)` — clearly distinct from page bg in both themes. |
| 7 | Auto-scroll removed | `SectionSnap` component removed from `App.jsx`. `scroll-margin-top` and `scroll-padding-top` improved to `calc(var(--navbar-h) + 20px)`. `overscroll-behavior-y: none` on body prevents bounce. `scroll-behavior: smooth` retained for programmatic/hash navigation. |

### Component Rebuilds

| Component | Change |
|-----------|--------|
| **Hero.jsx** | ResizeObserver measures `.hcontent` height → sets `.hscene` height to `leftH × 1.10`. Removed `@media(orientation:portrait)` query. `.hscene` max-width removed (width `clamp(220px,22vw,320px)`). `.hphoto` → `object-fit:contain`. |
| **Skills.jsx** | Full redesign: `section-alt` bg, 2-column grid layout, coloured-accent stat cards with count-up, tabbed skill bars (Skills / Tools / Learning) with shimmer animation via `.skill-bar-shimmer::after`. |
| **RecentProjects.jsx** | Card hover border uses `card.category` colour via `onMouseEnter/Leave` state (not `--accent-primary`). "View details" CTA removed; title `<h3>` now contains a `<Link>` as the only clickable element. |
| **Services.jsx** | Card hover border uses `svc.color` via `onMouseEnter/Leave` + inline `borderColor` style (not `hover:border-accent-primary`). |
| **GithubStats.jsx** | Fully dynamic: fetches `GET /users/{user}` and `GET /users/{user}/repos` from GitHub REST API. Displays profile stat pills (followers/following/repos/stars), readme-stats image, streak-stats image (theme-aware), language stacked bar, top-6 repos grid. Skeleton loading + error state with retry. |
| **CTA.jsx** | Centered single-column layout. Dot-grid SVG background. No `hero-sit.webp`. Two action buttons: "Get in touch" (primary) and "View my work" (secondary). `section-alt` base with custom dot-grid overlay. |

---

## v2.2.7 — Full Navbar Redesign, Hero Rebuild, Section Reorder, Skills Redesign, GitHub Fix

**Discussion:**
User requested major overhaul of: scroll snap removal, complete navbar redesign, hero section rebuild with infinite height fix, section reorder, project card UX, skills section redesign to match uploaded reference image, new "How I Work" section, GitHub streak fix, CTA badge removal.

**Section order (final):**
1. Hero — absolute navbar overlay (transparent), own bg
2. About Me — section-alt
3. Featured Projects — plain
4. Skills & Experience — section-alt
5. How I Work (Process) — plain [NEW]
6. Services — section-alt (internal)
7. Reviews — plain
8. GitHub Activity — section-alt
9. CTA — plain

**Changed files:**

- `src/index.css` — Removed `scroll-snap-type: y proximity` from `html`; removed `scroll-snap-align: start` and `scroll-snap-stop: normal` from `.section`; `scroll-behavior: smooth` and `scroll-padding-top` kept for anchor links
- `src/config/site.config.js` — version bumped to `v2.2.7`
- `src/pages/Home.jsx` — Full rewrite: new section order per spec; BlogMini removed from homepage; Process (new) added between Skills and Services; AboutMini moved to position 2 (after Hero); imports updated
- `src/components/layout/Layout.jsx` — Added `isHome` detection; `<main>` gets `pt-navbar` class only on non-home pages (since home navbar is `position: absolute`)
- `src/components/layout/Navbar.jsx` — COMPLETE REWRITE (1090 → new):
  - Top navbar: `position: absolute` on home page (overlays hero), `position: relative` on other pages
  - Home page: full transparent bg + no backdrop-filter (uses hero bg)
  - Floating navbar: premium pill — `rgba(8,14,38,0.78)` bg, `blur(24px) saturate(180%)`, inset glow shadow
  - Icon buttons (`.nb-icon-btn`): glass bg, rounded pill, hover + active + active-state styles, `data-ripple-managed` ripple
  - Tooltip (`.nb-icon-btn[data-nb-tip]::after`): CSS `::after` below the button, right-anchored for right-side cluster via `[data-nb-right]`
  - Nav links: click scale active effect on `.top-nav-link:active` and `.float-nav-link:active`
  - Mega nav: full glass redesign (`mega-glass-inner`), always rendered via `position: fixed` wrapper at `z-index: 10000` — above 404 and all page content
  - Mobile sidebar: slide-in from right, full-width on <640px, user card, search bar, nav links, sign-in/out
  - Responsive: top navbar shows full links on lg+; tablet (md) hides center links; mobile shows minimal icons
  - SocialMarquee: drag-to-scroll, pause on hover, in sidebar footer
  - `NotifPanel`, `UserDrop`, `SignInBtn` all rebuilt with new glass aesthetic
- `src/components/home/Hero.jsx` — COMPLETE REWRITE:
  - Floating tech icon files/code COMPLETELY REMOVED
  - ResizeObserver image-height loop ELIMINATED — replaced with fixed CSS sizing per breakpoint
  - 12+ CSS breakpoints: 2xl (1536+), xl (1280-1535), lg (1024-1279), md-lg (900-1023), tablet/mobile (<899px), sm (640-899), xs (<480), xxs (<360)
  - Image: rectangular frame on desktop (fixed `width/height` per breakpoint), circular frame on ≤899px
  - New minimal bg: subtle dot-grid texture, bottom-to-top gradient, ambient orbs, star twinkle, rising particle characters
  - Content: greeting → name (split line reveal) → typewriter role → bio → CTA buttons → social icons → stats
  - Navbar overlay: `padding-top: calc(var(--navbar-h) + clamp(3rem,8vh,5rem))` so content starts below transparent navbar
- `src/components/home/RecentProjects.jsx` — REWRITE:
  - Full card clickable via `<Link>` wrapping both thumbnail, body, and footer sections
  - Title: NO color change on hover (removed `hover:text-accent` from `<h3>`)
  - Card footer: themed with card's `accent_color` or `CAT_COLORS[category]` — tinted bg + colored text + arrow
  - `accent_color` field: admin panel should set `project.accent_color` (hex) per project; falls back to `CAT_COLORS[category]`
  - Card hover: border transitions to card color (existing behavior kept)
- `src/components/home/Skills.jsx` — COMPLETE REDESIGN matching uploaded reference image:
  - Left column: 2×2 stat cards (Years Dev, Years Design, Projects, Languages) with colored left-border accent + corner glow + icon
  - Left below: bio paragraph + specialties list with colored pulse dots
  - Right column: tab selector (Skills / Tools / Learning) + animated horizontal progress bars with shimmer effect
  - Bars: color-coded per skill, `color-mix` gradient fill, shimmer animation, % label in skill's color
  - Responsive: stacks to single column at <900px
- `src/components/home/Process.jsx` — NEW SECTION "How I Work":
  - 6-step timeline grid: Discovery → Planning → Design → Development → Testing → Launch
  - Each step: colored icon, faded step number watermark, description, hover bottom accent line
  - Value props row: Fast Turnaround, On-Time Delivery, Clean Code, Open Communication
  - Plain bg (no section-alt)
- `src/components/home/GithubStats.jsx` — STREAK FIX + ACHIEVEMENTS:
  - Broken `github-readme-streak-stats.herokuapp.com` image REPLACED with `ContribStats` component
  - `ContribStats`: computed from real API data — Public Repos, Total Stars, Followers, Top Language
  - Achievements section (8 badges): Active Builder, Star Collector, Community Member, Open Source Dev, Web Publisher, Code Sharer, Multi-language, Fork Worthy — unlocked/locked state computed from API data
  - GitHub readme-stats image (vercel, right panel) kept — it works
  - `faCircleDot` unused import removed
- `src/components/home/CTA.jsx` — Badge removed:
  - `Available for freelance & collaboration` pill badge REMOVED entirely
  - Heading updated: "Have a project in mind? Let's build it together"
  - Rest of CTA design unchanged

**Architecture decisions:**

- **Navbar absolute on home:** Making the top navbar `position: absolute` on `'/'` and `'/home'` allows the hero to start at `top: 0` of the page, making the full viewport hero work correctly. All other pages get `position: relative` navbar + `pt-navbar` on `<main>`. The floating navbar activates after `FLOAT_THRESHOLD = 420px` scroll on ALL pages.
- **Hero image fixed sizing:** Instead of `ResizeObserver` + JS height syncing (which caused infinite loop), image container uses fixed `width/height` CSS per breakpoint. This is always stable and never grows.
- **Mega nav z-index 10000:** The mega panel is rendered inside a `position: fixed` div that escapes all stacking contexts. This ensures it appears above 404 pages, modals, and any other content regardless of where in the DOM tree the Navbar component renders.
- **Project accent_color:** Admin panel should add an `accent_color` field (hex string) to projects. `RecentProjects` reads `p.accent_color || CAT_COLORS[p.category]`. The card footer bg is `${color}14`, border is `${color}22`, hovered bg is `${color}14`.
- **Process section order:** Placed between Skills and Services so the page tells a story: who I am → my skills → how I work → what I offer → reviews → github.
- **GithubStats achievements:** Computed purely from GitHub REST API data (no OAuth needed). `unlocked` boolean triggers full-color vs grayscale+opacity rendering. Achievements update automatically as the GitHub profile changes.

**Important notes for next AI (v2.2.8+):**
- Scroll snap is FULLY removed. Do NOT re-add it. User wants natural scroll only.
- Navbar is a named export: `export function Navbar()` — import as `{ Navbar }` not default.
- Hero navbar transparency: controlled by `isHomePage = ['/', '/home'].includes(location.pathname)` in Navbar. Do NOT change this logic.
- `pt-navbar` is applied to `<main>` in Layout.jsx only on non-home pages. This MUST stay or pages will be hidden under navbar.
- GithubStats: streak img URL (`herokuapp.com`) is permanently broken — ContribStats component replaces it. Do not restore.
- `Process.jsx` is a NEW file — must be imported in `Home.jsx`.
- Skills tab data (`TABS` array) contains `skills`, `tools`, `learning` — customise items but keep the structure.
- Project `accent_color`: hex string, stored in Supabase `projects` table. Admin panel `accent_color` picker should be added in v2.2.8.

---

## v2.2.8 -- Hero Polish, Navbar Fixes, Skills Cards, Journey Timeline, GitHub Redesign

**Changed files:**

- `src/config/site.config.js` -- version bumped to v2.2.8

- `src/components/home/Hero.jsx`:
  - `.himg-frame` on large screens: `background:transparent`, `border:none`, `box-shadow:none`, `::before` top accent bar fully removed -- image floats freely over hero bg
  - `::after` bottom fade gradient kept as-is
  - `.himg-box` height increased by ~35px at every breakpoint (clamp base: 375px->615px, 2xl: 655px, xl: 595px, lg: 495px, md-lg: 425px)
  - "Available for hire" badge removed from JSX and CSS
  - Name restructured: single `hname-line` on desktop: "Muhtasim <Rahman> (Turzo)" all inline
  - `.hname-turzo` CSS: inline on desktop (`.38em`, `var(--text-tertiary)`, mono); on mobile (`<=899px`) becomes `display:block` for new-line effect
  - Mobile/tablet rounded frame: `background:var(--bg-surface-2)!important` added as alt color behind circular image

- `src/components/layout/Navbar.jsx`:
  - `NavRight` component: removed duplicate `lg:hidden` search icon and `lg:hidden` faBars button -- NavRight is desktop-only, never needs mobile items
  - Mega nav double-render fixed: removed `{megaOpen && <MegaMenu>}` from inside both top navbar and floating navbar
  - Single `<MegaMenu>` now rendered via one `<AnimatePresence>` portal div with `id="mega-menu-portal"` before the mobile sidebar
  - Outside-click handler updated: checks `#mega-menu-portal` (by id) instead of `.mega-panel-wrap` (by class) -- correctly dismisses mega nav on outside click
  - Icon buttons: added `title` prop alongside `label` as HTML tooltip fallback (native browser tooltip if CSS ::after fails)
  - `faBars` in `createMenuRipple` handler kept only in the tablet/mobile secondary right clusters (not in NavRight)

- `src/components/home/Skills.jsx`:
  - Stat cards redesigned to horizontal (icon left, num+label right) -- compact pill style
  - `.sk2-stat` padding reduced: `.6rem .8rem`; `border-radius: 10px`; `border-left: 2px solid` (was 3px); `display:flex; align-items:center; gap:.6rem`
  - `.sk2-stat::after` corner glow removed entirely
  - `.sk2-stat:hover` lift animation removed; only `border-color` transitions to `var(--c)`
  - `.sk2-stat-icon`: `28x28px`, no margin-bottom (now flex sibling)
  - `.sk2-stat-num`: reduced to `1.2rem` (was `1.65rem`)
  - `.sk2-stat-body` wrapper div added for num+label column
  - `.sk2-stat-label`: `color:var(--text-tertiary)` (was primary), `font-weight:500`

- `src/components/home/Process.jsx` -- REPLACED "How I Work" with "My Journey" timeline:
  - Alternating left/right cards around center vertical line
  - 6 timeline events: 2019 First Code, 2020 Design, 2021 First Project, 2022 React, 2023 AI, 2024+ Freelance
  - Each card: colored category badge, bold title, description
  - Center column: colored icon dot with glow shadow, year label in accent color
  - `useInView` per card for staggered entrance animations (slide from side)
  - Mobile (<680px): collapses to single-column left-aligned timeline
  - Section heading: "How I Got Here / My Journey"
  - Plain bg (no section-alt)

- `src/components/home/GithubStats.jsx` -- FULL RESTRUCTURE:
  - Layout order: Profile card -> Two-col (streak|awesome-stats) -> Trophies -> Languages -> Repos
  - `ProfileCard`: avatar with green online dot, name/login/bio/location/blog/joinYear, 4-stat grid (Repos/Stars/Followers/Forks)
  - Two-col row (`.gh-two-col`): LEFT = `github-readme-streak-stats.herokuapp.com` streak image; RIGHT = `awesome-github-stats.azurewebsites.net` (new, per user request)
  - Both images are theme-aware: `key={dark ? 'dark' : 'light'}` forces React to reload img on theme change; `theme` param passes `tokyonight` (dark) or `default` (light)
  - Trophy row: `github-profile-trophy.vercel.app` -- also theme-aware (`tokyonight`/`flat`)
  - `ContribStats`, `AchievementBadge`, `StatPill` components from v2.2.7 REMOVED (replaced by cleaner ProfileCard + image-based stats)
  - `useThemeStore` imported to read current theme for image URL params
  - Old `streakImgUrl` from herokuapp (broken) REPLACED with full theme-aware URL
  - `awesome-github-stats` URL: `cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme={GH_THEME}`

**Important notes for next AI (v2.2.9+):**
- Hero image frame: NO bg/border/shadow on desktop. Mobile circular frame HAS `background:var(--bg-surface-2)`. Do not re-add frame styles to desktop.
- Navbar mega: only ONE `<MegaMenu>` render in the component, via `id="mega-menu-portal"` fixed div before sidebar. Never add it back inside the top nav or float nav.
- Journey timeline uses `useInView` from framer-motion (not IntersectionObserver) -- keep this.
- GitHub stats images are theme-aware via `key` prop reload + `theme` URL param. If adding new image widgets, follow the same pattern.
- Awesome-github-stats URL base: `https://awesome-github-stats.azurewebsites.net/user-stats/{user}` -- documented at https://github.com/brunobritodev/awesome-github-stats
- Skills stat cards are now HORIZONTAL (icon left, text right). Do not revert to vertical stacked layout.

---

## v2.2.9 -- Section Alignment, GitHub Redesign, Navbar Fixes, Project Cards, Setup Update

**Changed files:**

- `src/config/site.config.js` -- version bumped to v2.2.9

- `src/components/home/Hero.jsx`:
  - `(Turzo)` now on its own line on large screens (block element below hname-line, right-aligned); uses `var(--accent-primary)` color; `Muhtasim Rahman` in single span with `color:var(--text-primary)` (no accent split on "Rahman")
  - Hero inner max-width changed from 1280px -> 1120px (matches container-xl for consistent section alignment)
  - Bottom gradient `::after` starts from `bottom:-5px` (was `bottom:0`) to prevent gap when browser zoomed
  - `--` dashes replaced with `&#8212;` (HTML em-dash entity) throughout
  - Small screen (<480px): Download CV button hides "Download" text span (only icon shows); both CTA buttons stay in same row (flex-wrap:nowrap)
  - Greeting: `.hgreet-salam` color is `#D97706` dark / `#1D4ED8` light; waving_hand icon `.hgreet-wave` color `#F59E0B` dark / `#D97706` light
  - `hvisual` justify-content changed to `flex-end` on desktop (slight right alignment fix)

- `src/components/home/AboutMini.jsx`:
  - Bullet separators: `?` -> unicode `\u2022` (U+2022) in all FACTS values and inline text
  - About section grid: removed `justify-items:center mx-auto` that was shifting right column

- `src/components/home/Process.jsx` -- REPLACED with actual Muhtasim info:
  - Tool grid: VS Code, Git & GitHub, Firebase, Google Sheets API, JavaScript, HTML & CSS, Photo & Video editing, Browser DevTools
  - Principles: Clean code, Halal & ethical approach, Mobile-first, Document everything
  - Code editor mockup: shows real config.js content about Muhtasim
  - Light mode: `--mws-code-plain` CSS var for proper text color in both themes

- `src/components/home/GithubStats.jsx` -- FULL REDESIGN v2.2.9:
  - Profile card layout: avatar | center column (name, username•joindate•location, bio) | right column of 5 compact card-style stats (Repos, Stars, Followers, Forks, + special Profile redirect card)
  - Trophies section REMOVED entirely
  - Two-col stat images: transparent bg attempt for both streak and awesome-stats (background=00000000 param); light mode white bg (`--gh-panel-bg`), dark mode `var(--bg-surface-2)` bg; NO border on image panels; NO border on images
  - Top repos: desktop 3-col (6 shown), tablet 2-col (4 shown via nth-child CSS), mobile 1-col (3 shown)
  - API retry logic: skeleton loading during initial fetch; auto-retry 3x at 5s intervals on rate-limit/error; after 3 retries, wait for X-RateLimit-Reset header time, show countdown, auto-retry; manual "Retry now" button
  - Skeleton loading: profile card skeleton, language bar skeleton, repo grid skeleton all show during loading

- `src/components/home/RecentProjects.jsx` -- COMPLETE REDESIGN:
  - Removed large thumbnail image area entirely
  - New minimal card: category chip (colored) top-left, external links top-right
  - Top accent line (2px, card color) appears on hover
  - Title prominent (`font-size:.9rem font-weight:800`), desc 2-line clamp
  - Tag pills: minimal gray bg, small text
  - Footer: "View details" label + arrow (themed to card color on hover)
  - `active:scale(.97)` click effect on cards
  - Border color: `color-mix(in srgb, var(--c) 40%, transparent)` on hover
  - `.proj-overlay` full-card link; external link buttons above overlay (z-index:2)

- `src/components/layout/Navbar.jsx`:
  - `title` attribute removed from `ThemeToggle`, `IconBtn`, and all menu buttons (was showing native browser tooltip simultaneously with CSS tooltip)
  - CSS tooltip (`.nb-icon-btn [data-nb-tip]::after`): fixed to always center below button (`left:50%; transform:translateX(-50%)`); right cluster `[data-nb-right]` also uses same centering
  - Scroll handler: mega nav auto-closes when `window.scrollY > FLOAT_THRESHOLD + 60`
  - Mega nav overlay: `bottom:0` added to overlay div; `onClick` handler on overlay closes mega nav when clicking empty left/right space (not `.mega-panel-wrap` or `.mega-glass-inner`)

- `src/index.css`:
  - Global click effects: `.card:active { transform: scale(0.98) !important }`
  - Container padding fix: removed `padding-inline: 0` at 1440px+ (was causing uneven section margins compared to other sections that don't zero-pad)

**Important notes for next AI (v2.2.10+):**
- GitHub stats image panels have NO border — set via `border: none` on `.gh-img-panel`. Do NOT re-add borders.
- Trophies section is intentionally REMOVED — do not restore.
- Hero `(Turzo)` is block-level on all screens, primary color. On large screens it has `text-align:right` to sit below-right of "Muhtasim Rahman".
- Project cards no longer have thumbnail image areas. If thumbnails are needed in future, redesign will be required.
- Navbar `title` attr deliberately removed from ALL icon/menu buttons. The CSS `[data-nb-tip]::after` tooltip is the only tooltip. Do not re-add `title` attrs.
- Mega nav scroll-hide: fires at `FLOAT_THRESHOLD + 60` (480px). This is intentional.

---
---
---

# 🔴 v2.3 - contexts

## v2.3.0 — About Page (2026-05-24)

**Scope:** Full About page built from scratch — all info from `about.md` visualized in a multi-section, fully responsive, animated page.

### What was built

**`src/pages/About.jsx`** — 924-line single-file component with 10 sections:

1. **About Hero** — two-column layout (content left, photo right). Photo uses `/muhtasim-about.webp`. Shows: Available for Work badge (Supabase-driven), name/title, age (auto from fakeDOB), quick fact badges (location, age, religion, education, email), Hire Me + Download CV buttons, 4 social icon links. Photo has floating info badges (3+ Years Dev, 6+ Years Design). Available badge from `settings.availableForWork`, CV button from `settings.cvEnabled + settings.cvUrl`.

2. **Bio & Story** — Self-written 2024 bio in a styled quote block (left-border accent, FA quote icon). Right side: "The Story So Far" — 3-paragraph narrative about his journey from electrical engineer dream to CSE/web dev, self-teaching, SSC exam pause, Islamic ethical framework.

3. **Experience Stats** — 4 animated cards with hover glow: Years Web Dev, Years Design, Years Video Editing, Projects Built. All values from `settings` (with fallbacks).

4. **Technical Skills** — Two-column grid:
   - Left: 7 skill progress bars (AI 90%, HTML 80%, CSS 78%, Git 75%, Python 55%, JS 42%, Java 35%) — Framer Motion width animation on scroll
   - Right top: Tools grid (6 tools: VS Code, GitHub, Firebase, Browser DevTools, Google Sheets API, Odoo)
   - Right bottom: Language proficiency bars (Bengali 100%, English 65%, Hindi 50%, Urdu 45%)

5. **Design & Creative** — Two cards side by side: Graphic Design (7 skills with check icons) + Video Editing (5 skills + note about commercial confidence level).

6. **Education Timeline** — Alternating left/right timeline around a vertical gradient line. 8 entries: 2013–present history + future HSC + CSE dream. Current entry glows in accent blue, future entries in purple, past in neutral. Icons per stage.

7. **Values & Personality** — 6 value cards (hover lift + border glow): Islam First, Perfection, Honesty, Discipline, Useful Knowledge, Community. Plus hobbies chip row (7 hobbies).

8. **Goals & Future Plans** — 3 cards (Short/Mid/Long term). Each has period badge, colored top accent bar, checklist of 4 items.

9. **Services** — 3 centered cards: Website Design, Graphic Design, Photo & Video Editing. Hover border + shadow effect.

10. **CTA** — "Have a project in mind?" centered banner with glow orbs bg. Get in Touch + View Projects buttons.

### Architecture decisions

- **Single-file component** — All sections, helpers (AnimSection, SectionHeader, Stars, SkillBar), and data arrays are in one `About.jsx` file. No new sub-components created since this is a self-contained page.
- **Inline CSS + CSS variables** — Matches existing codebase pattern (no Tailwind on page-level styles, CSS vars for theming).
- **Framer Motion `useInView`** — Each section/card uses scroll-triggered entrance animations. `AnimSection` wrapper handles staggered delays.
- **`useSiteSettings` hook** — About page reads `statsYearsDev`, `statsYearsDesign`, `statsProjects`, `availableForWork`, `cvEnabled`, `cvUrl` from Supabase. Falls back to `SITE_CONFIG.defaults` if fetch fails.
- **No new Supabase tables** — v2.3.0 only reads `site_settings` table (already exists).
- **Responsive breakpoints** — Mobile collapse via `@media (max-width: 900px)` rules embedded in `<style>` block at page bottom. Hero photo hidden on mobile (column collapses).

### Files changed
- `src/pages/About.jsx` — full rewrite (was placeholder → now 924 lines)
- `src/config/site.config.js` — version `v2.3.0`
- `package.json` — version `2.3.0`
- `CHANGELOG.md` — v2.3.0 section added
- `creator-guide/supabase-v2.3.0.sql` — new (no schema changes, just ensure settings exist)
- `creator-guide/master-context.md` — this update

### Important notes for next AI (v2.4.0+)
- About page is **complete** — do NOT modify in v2.4.0 unless bug fix needed.
- `/muhtasim-about.webp` is the About page photo. Falls back to FA user icon if missing.
- `useSiteSettings` hook is imported from `../hooks/useSiteSettings.js` — same hook used by Hero and Home page.
- `AnimSection` component is defined locally inside `About.jsx` — not exported. If needed elsewhere, extract to `src/components/shared/`.
- Education timeline uses alternating left/right layout on desktop — collapses to single-column with left dot at ≤900px.
- Skills bars animate via Framer Motion `width` on scroll (`useInView`). The `SkillBar` component is also local to `About.jsx`.
- v2.4.0 = Projects Page (grid/list toggle, filter, search, project detail with like/dislike/views/comment/share).

## v2.3.1 — About Page (2026-05-24)

### Version changelog

| Version | Summary |
|---------|---------|
| v2.3.1  | About page full redesign — 8 new sections, shared CTA, Layout fix |
| v2.3.0  | 4-copy exploration (copy-1 → copy-4 A/B variants) |
| v2.2.5  | Previous stable build |


### What changed in v2.3.1

#### `src/pages/About.jsx` — Full rewrite
All sections rebuilt from scratch per design spec. Sections in order:

1. **Hero** — Full-viewport. Right: `hero-back.webp` with same bottom gradient as home hero (`--bg-page` fade, no rounded frame). Left: breadcrumb, eyebrow, name+nick, role, bio, 4 fact pills, 2 CTA buttons. No "Available for Work" badge. No scroll icon. Tablet/mobile: image stacks on top with NO border-radius/frame.
2. **Story & Info** — New section. Left: quote + story narrative. Right: 2×2 exp stats grid (dev/design/video/projects) + 3 journey milestone cards.
3. **Education Timeline** — PC: center line, alternating left/right cards. Mobile: left-aligned. Animated scroll line via `framer-motion` `useScroll` + `useTransform` (`scaleY` from 0→1 as user scrolls through section). Animated dot pulse for "current" entry.
4. **Skills & Expertise** — 4 tabs: Programming (animated bars, home-style), Design (icon grid), Video (dot list), Tools (4-col grid). Progress bars use `useInView` + staggered `setTimeout` + Framer Motion `animate.width`, same as home Skills. Layout follows copy-4 `ab-skill-meta` pattern (name | note | pct%).
5. **Language Proficiency** — copy-4 style + country flag images from `flagcdn.com` (24×18 webp). Animated bars via `whileInView`. 4 languages: Bengali (bd), English (gb), Hindi (in), Urdu (pk).
6. **Values & Personality** — 6-card grid (Islamic values, discipline, honesty, etc.) + Hobbies chips section embedded inside same section.
7. **Goals & Plans** — 3-column card layout (copy-3 inspired). Top accent color bar per card. Click ripple from global `.card` styles. No progress bars.
8. **Find Me Online** — Bento grid: 3 featured big cards (GitHub, LinkedIn, YouTube) + smaller grid (7 more platforms). Uses `--sc` CSS var for per-platform hover color. All links from `SITE_CONFIG.social.*`.
9. **CTA** — Imported from shared `components/home/CTA.jsx`.

#### `src/components/home/CTA.jsx` — Redesigned, now shared
- Single component used by **both** `Home.jsx` and `About.jsx`
- Glassmorphism box with gradient background + noise texture + glow orbs
- Buttons: "Get in Touch" (primary) + "GitHub" (secondary)
- Trust badges row: Fast Response · Clean Code · On-time Delivery
- Social icons row: GitHub, LinkedIn, Telegram
- Fully self-contained styles in `<style>` tag (all `cta-*` prefixed)

#### `src/components/layout/Layout.jsx` — Minor fix
- Added `'/about'` to `isHome` paths array
- Prevents double `pt-navbar` padding on the About page (About hero manages its own top padding via `padding-top: calc(var(--navbar-h) + ...)`)

### Components built but NOT shown on Home page

These components exist in `src/components/home/` but are **not imported/rendered** in `src/pages/Home.jsx`:

| File | Description |
|------|-------------|
| `BlogMini.jsx` | Blog preview section (mini cards, latest posts) |
| `RecentProjectsOrginal.jsx` | Original version of the Recent Projects section (pre-redesign) |
| `Stats.jsx` | Statistics / counters section (years of exp, projects, etc.) |

To enable any of these, simply import and add to `Home.jsx` in the desired position.

### Social platform → SITE_CONFIG key mapping

| Platform  | Key                         |
|-----------|-----------------------------|
| GitHub    | `SITE_CONFIG.social.github` |
| LinkedIn  | `SITE_CONFIG.social.linkedin` |
| Facebook  | `SITE_CONFIG.social.facebook` |
| Instagram | `SITE_CONFIG.social.instagram` |
| YouTube   | `SITE_CONFIG.social.youtube` |
| Telegram  | `SITE_CONFIG.social.telegram` |
| Twitter/X | `SITE_CONFIG.social.twitter` |
| TikTok    | `SITE_CONFIG.social.tiktok` |
| Threads   | `SITE_CONFIG.social.threads` |

### Shared design tokens (unchanged)

All CSS variables still defined in `src/index.css`. Key ones:
- `--bg-page`, `--bg-surface`, `--bg-surface-2`
- `--text-primary`, `--text-secondary`, `--text-tertiary`
- `--accent-primary`, `--accent-hover`, `--accent-light`
- `--border-color`, `--border-strong`
- `--font-display`, `--font-mono`
- `--radius-sm/md/lg/xl/full`
- `--navbar-h`
- `--shadow-sm/md`
- `--transition-fast`, `--transition-base`

### Notes

- `flagcdn.com` flags require internet — no build-time dep, purely runtime `<img>` tags
- The timeline animated line uses `useScroll({ target: timelineRef, offset: ['start 80%', 'end 65%'] })` — adjust offsets if timing feels off
- `calculateAge()` is imported from `site.config.js` — auto-updates on birthday
- `settings?.cvEnabled` + `settings?.cvUrl` controls CV button visibility in hero
- `settings?.statsYearsDev`, `statsYearsDesign`, `statsProjects` feed the exp stats grid

---

## v2.3.2 — About Page Refactor + Hero Padding Fix + Click Effect + Same-page Nav + Skeleton (2026-05-27)
> from `v2.3.2 (3) - claude - dtive.turzo`

### What changed

#### About page — split into separate section components

`src/pages/About.jsx` reduced to ~30 lines (imports + Helmet + section renders). All sections extracted to `src/components/about/`:

| File | Section |
|---|---|
| `AboutHero.jsx` | Hero — same design as v2.3.1, **padding-top reduced** (was `clamp(3rem,8vh,5rem)` → `clamp(1rem,2.5vh,2rem)`) |
| `AboutStory.jsx` | Story & Info — **enhanced**: personal info list (full name, age, location, religion, education, email, languages), CV download/preview/print/share buttons (from `settings.cvUrl`), journey cards, exp stats |
| `AboutTimeline.jsx` | Academic Timeline — **improved**: scroll-driven dot coloring (reached = color, not-yet = muted 0.45 opacity), dot icons smaller (`.52rem`), pulsing ring on active dot, mobile layout fixed |
| `AboutSkills.jsx` | Skills & Expertise — **all 4 tabs now use same 2-col layout** (bars + info card) matching Programming tab; progress bars animated in all tabs |
| `AboutLanguages.jsx` | Language Proficiency — same animated bar style as home/skills |
| `AboutValues.jsx` | Values & Personality — **fixed grid: 3 desktop / 2 tablet / 1 mobile** (was `auto-fit`); mobile compact padding |
| `AboutGoals.jsx` | Goals & Plans — from copy-4 layout; **progress bar added at bottom** (Short 85%, Mid 50%, Long 25%) |
| `AboutConnect.jsx` | Find Me Online — **from copy-2 style**; left accent bar, per-platform icon color, dark/light responsive hover; 5-col desktop / 4-col tablet / 3-col 480+ / 2-col mobile |

#### Home Hero padding fix

**`src/components/home/Hero.jsx`** — desktop: `padding-top: calc(var(--navbar-h) + clamp(.5rem,1.5vh,1.25rem))` (was `clamp(3rem,8vh,5rem)`). Tablet: 1.25rem. Mobile: 1rem.

#### App.jsx — Click effect + Same-page nav

**`src/App.jsx`** changes:
- `CLICKABLE_SELECTOR` expanded: adds `a[class*="btn"]`, `a[class*="badge"]`, `a[class*="chip"]`, `a[class*="pill"]`, `a[class*="tab"]`, `a[class*="soc"]`, `a[class*="card"]`, `[class*="-btn"]`, `[class*="-badge"]`, `[class*="-chip"]`, `[class*="-pill"]`, `[class*="-tab"]:not(input)`
- **Same-page nav:** `ScrollToTop` now intercepts `click` events on `a[href]` where `href` matches `window.location.pathname` → calls `window.scrollTo({top:0, behavior:'smooth'})` and `preventDefault()` — no reload, no re-render

#### Skeleton.jsx — AutoSkeleton added

**`src/components/ui/Skeleton.jsx`** — new `AutoSkeleton` component:
- Renders real children invisibly (`visibility:hidden; position:absolute`) to measure DOM
- Uses `requestAnimationFrame` + `getBoundingClientRect()` to recursively build a skeleton tree
- Mirrors the actual element shapes (widths, heights, border-radius) as `.sk` divs
- Falls back to generic bars if DOM scan finds nothing
- Usage: `<AutoSkeleton loading={isLoading}>{children}</AutoSkeleton>`
- All existing primitives and `PageSkeleton` unchanged

### Files changed

- `src/pages/About.jsx` — refactored (imports sections, Helmet only)
- `src/components/about/AboutHero.jsx` — **new**
- `src/components/about/AboutStory.jsx` — **new** (enhanced from copy-2)
- `src/components/about/AboutTimeline.jsx` — **new** (improved from v2.3.1)
- `src/components/about/AboutSkills.jsx` — **new** (all tabs unified)
- `src/components/about/AboutLanguages.jsx` — **new**
- `src/components/about/AboutValues.jsx` — **new** (3/2/1 grid)
- `src/components/about/AboutGoals.jsx` — **new** (copy-4 + progress bars)
- `src/components/about/AboutConnect.jsx` — **new** (copy-2 style, enhanced)
- `src/components/home/Hero.jsx` — padding-top fix
- `src/App.jsx` — click effect expanded + same-page nav scroll
- `src/components/ui/Skeleton.jsx` — AutoSkeleton added
- `creator-guide/master-context.md` — this update

### Decisions & notes

- **About page split rationale:** each section can now be independently edited, lazy-loaded, or replaced without touching other sections. File names follow `About{SectionName}.jsx` convention.
- **Copy attribution:** Story section enhanced from copy-2 (personal info list + CV options); Goals from copy-4 (card layout + progress bars); Connect from copy-2 style (left accent bar, platform colors).
- **Hero padding fix (both pages):** The `clamp(3rem,8vh,5rem)` extra top padding was making the hero section start too far below the navbar. Reduced to `clamp(.5rem,1.5vh,1.25rem)` on Home, `clamp(1rem,2.5vh,2rem)` on About (slightly more since About hero has more content).
- **AutoSkeleton limitation:** DOM measurement depends on element being in the page flow; works best for content sections. For pages not yet mounted, use `PageSkeleton` with layout type.
- **Same-page scroll:** captures in `capture: true` phase so it fires before React Router's click handler. Only intercepts same-path navigations; hash/external/mailto links pass through normally.
- **`/about` in Layout `isHome`:** Already added in v2.3.1 — kept. Both About and Home pages manage their own hero top padding; Layout `<main>` gets no `pt-navbar` for these pages.

### Commit message suggestion

```
feat(about): split into section components, enhance story/goals/connect, fix hero padding

- About page refactored: 9 individual section files in components/about/
- AboutStory: personal info list, CV download/preview/print/share
- AboutTimeline: scroll-driven dot coloring, smaller icons, mobile fix  
- AboutSkills: all 4 tabs use same bar+info-card layout
- AboutGoals: progress bars (85%/50%/25%) from copy-4 layout
- AboutConnect: copy-2 style, light/dark mode responsive
- AboutValues: strict 3/2/1 grid per breakpoint, compact mobile
- Home Hero: padding-top reduced (clamp .5rem→1.25rem, was 3rem→5rem)
- App: expanded click effect selectors (badges, chips, pills, soc cards)
- App: same-page NavLink click → smooth scroll to top (no reload)
- Skeleton: AutoSkeleton component for DOM-shape mirroring
- master-context: v2.3.2 section added, full reformat
```
> ager 4ta genaration theke valo lalo section and codes nea ei combined ta v2.3.2 te deploy korbo. kon genaration theke kon jinish nichi seta ei versio er 5th commit e bole dibo. uporer context ta muloto 3rd genaration theke newa karon otar genaration ektu bashi valo cilo. baki parts onno genarations theke newa hoiche. contenxt file kewi compact kore valo kore dite pare nai, ti old takei ektu arange kore dilam.
> 
---

## v2.3.3 — About Page Modifications & Connect SVG Icons (2026-05-27)
> combined from genaration 1, 2, 3

### Changes

**AboutHero:** New left layout (distinct from home hero). Added role-chip with live indicator, 2×2 fact-pill grid with icon backgrounds, age badge + location strip footer. Right image layout unchanged. Gradient moved from image-only (`::after` on frame) to full section (`ab-hero-grad`) — same position on all screen sizes, covers bottom of hero below left content.

**AboutStory:** Minimal full rebuild. Cleaner 2-col layout with section header. CV actions corrected: Preview=new tab link, Download=`download` attr link, Print=opens preview then triggers `window.print()`, Share=`navigator.share` (device native) with clipboard fallback.

**AboutTimeline:** Centered section heading on desktop. Scroll activation point changed from `vh * 0.72` → `vh * 0.5` (center of viewport). Cards and icons start muted (`opacity: 0.45`, icon color: `var(--text-tertiary)`), become full color when scroll reaches them. Unique minimal card redesign: colored accent strip on card side (left for right-cards, right for left-cards), cleaner period pill, badge improvements. Fully responsive.

**AboutSkills:** Added shimmer sweep animation to all progress bars (same as home Skills section `::after` pseudo-element technique).

**AboutLanguages:** Compact right column — flags moved to right side (small 20×15 `flagcdn`), removed percentage text below bars, added shimmer to bars.

**AboutGoals:** Removed `Progress X%` caption header above progress bars — only the bar remains. Added shimmer to progress bars.

**AboutConnect:** Rebuilt with uploaded SVG icons from `/icons/social/`. GitHub, Threads, X-Twitter use FontAwesome (dark-mode safe via CSS `var(--soc-dark)`). Other platforms use local SVGs (`/icons/social/{name}.svg`). Improved card design: `border-radius`, hover lift, accent bar. `faArrowUpRight` diagonal arrow.

### Files changed
- `src/components/about/AboutHero.jsx`
- `src/components/about/AboutStory.jsx`
- `src/components/about/AboutTimeline.jsx`
- `src/components/about/AboutSkills.jsx` (shimmer CSS only)
- `src/components/about/AboutLanguages.jsx`
- `src/components/about/AboutGoals.jsx` (removed caption + shimmer)
- `src/components/about/AboutConnect.jsx`
- `public/icons/social/` — 10 SVG files added (instagram, linkedin, telegram, threads, tiktok, x-twitter, youtube, email, facebook, github)
- `creator-guide/master-context.md` — this update

### Decisions & notes
- GitHub/Threads/X SVGs use `fill="#000000"` — invisible in dark mode; FontAwesome brand icons used instead with `--soc-dark` CSS variable for per-platform dark color.
- Full-section gradient on About hero: removed `ab-hero-img-frame::after` (was clipped to image), the `ab-hero-grad` div covers full section width and is positioned below left content naturally due to hero height.
- Language section: percentage removed from DOM (not hidden via CSS) — no screen-reader impact since level badge still conveys proficiency.
- Goals progress: header div removed entirely (not CSS-hidden), pct prop still passed to animation hook but not rendered.

>  v2.3.3 er jonno mot 4ta genaration cilo jr ektate error thakay baki 3 ta github e push kora hoiche. ei 3ta copy er moddhe copy 2 ta bashi valo, ti setake base kore baki 2ta copy theke kichu valo section gula ekn e replace kora hoiche. kontar sathe konta replace kora hoiche seta git commit e dewa thakbe. echaraw nije theke samanno koyekta edit korchei.boetomane `hero` r `story` section bade baki sobgula motamuti stabl

---

## v2.3.4 — About Page Full Redesign, GitHub Fix, UX Polish (2026-05-29)
> combined from last 4 genaration, base is copy 2.

### Changes Summary

**Navbar (Navbar.jsx):** Added `/about` to `isHomePage` — About page navbar is now transparent/absolute like Home. No background, no border at scroll-top.

**About.jsx (page):** Added sticky `PageBreadcrumb` component — a fixed bar (`position: fixed; top: var(--navbar-h); z-index: 45`) showing `Home > About`. Always visible below navbar on About page, full-width, 34px height. Breadcrumb removed from inside AboutHero.

**AboutHero.jsx — FULL REDESIGN:**
- New layout: `padding-top: calc(var(--navbar-h) + 34px)` accounts for navbar + breadcrumb bar
- Left: chapter number badge (`01 / About Me`), eyebrow text, large name (no breadcrumb), 2×2 fact grid with label+value rows, CTA buttons, scroll hint with animated arrow
- Right: hero-back.webp with same bottom-to-top gradient as home (`abh-img-fade`). No rounded frame on mobile/tablet.
- Floating age badge on image (desktop only, hidden on mobile)
- Subtle dot-star particle background
- Unique detail: `abh-fact` rows show label above value (label+value layout instead of icon-only pills)

**AboutStory.jsx — FULL REDESIGN (new title: "Who I Am"):**
- Section heading: "A developer built on curiosity"
- Left column: styled quote block (left-border accent) + personal info card (table-style rows) + CV card (if enabled)
- Right column: journey milestones (vertical timeline with connecting lines) + 4 experience stats in row + contact strip link
- Journey uses left icon column with connector lines between items
- All CV actions preserved: Preview, Download, Print, Share

**AboutTimeline.jsx — FULL REDESIGN (Wheel/Arc Timeline):**
- Desktop: Interactive arc/wheel — 8 nodes placed on a semi-ellipse path, center card shows selected item details
- Navigation: click any node or use prev/next arrows, pip dots at bottom for quick jump
- Active node pulses with ring animation; past nodes have muted color tint
- Center card: period chip, level, school, location, description, status badges
- Mobile (≤700px): Switches to clean vertical list with connecting lines and dot indicators
- No external library — pure React state + CSS SVG arc path

**AboutSkills.jsx:** `absk-tabs` made mobile-responsive — `flex-wrap: nowrap`, `overflow-x: auto`, `scrollbar-width: none`, tabs have `flex-shrink: 0; white-space: nowrap`. Full-width on mobile.

**AboutValues.jsx:** `data-click-fx` added to both `.abv-chips` container div AND individual `.abv-chip` spans — click ripple effect on both the fill div and badges.

**AboutGoals.jsx:** Removed `abg-topbar` div (4px color accent bar at card top) entirely. `abg-body` now has direct padding from card edge. Cleaner card appearance.

**AboutConnect.jsx:** Hover effect updated — dual pseudo-element system:
- `::before` = left-side scaleY bar (center transform-origin, smoother)
- `::after` = subtle color wash overlay (5% brand color, opacity 0→1)
- Hover: `translateY(-3px)` + multi-layer box-shadow including 1px brand-color ring
- `transition` updated to 0.22s cubic-bezier

**GithubStats.jsx — Retry loop removed:**
- `load` is now a plain `async` function (no `useCallback`, no `attempt` param)
- `useEffect` calls `load()` once on mount — no retry loop, no setTimeout
- Rate limit shows clean error state with manual "Retry" button and direct GitHub profile link
- Removed: `retryCount`, `retryTimer`, `setRetryCount`, `setRetryTimer`, `RATE_LIMIT_WAIT`, `isRateLimitedWait`

### Future Plan (for next AI): GitHub Cached Data
> Currently GitHub API is called live — rate limit (60/hr unauthenticated) causes failures.
> **Plan for v2.4.x:** Use a Firebase Cloud Function or Cloudflare Worker (free tier) to:
> 1. Fetch GitHub API with a Personal Access Token (server-side, hidden)
> 2. Cache the result (profile + repos + languages) in Firebase Realtime DB or Cloudflare KV
> 3. Refresh cache every 24–48 hours via a scheduled trigger
> 4. GithubStats.jsx fetches FROM the cache URL instead of GitHub API directly
> 5. No API key exposed client-side, no rate limit issues, instant loads
> Reference services: Firebase Functions (free tier 125K/month), Cloudflare Workers (100K req/day free)

### Files changed
- `src/components/layout/Navbar.jsx` — isHomePage includes `/about`
- `src/pages/About.jsx` — PageBreadcrumb fixed bar component
- `src/components/about/AboutHero.jsx` — full redesign
- `src/components/about/AboutStory.jsx` — full redesign, new title
- `src/components/about/AboutTimeline.jsx` — wheel/arc timeline
- `src/components/about/AboutSkills.jsx` — tabs mobile scroll
- `src/components/about/AboutValues.jsx` — hobbies click effect
- `src/components/about/AboutGoals.jsx` — removed abg-topbar
- `src/components/about/AboutConnect.jsx` — hover effect update
- `src/components/home/GithubStats.jsx` — retry loop removed
- `creator-guide/master-context.md` — this update

> ager 4ta genaration theke valo valo section and codes nea ei combined ta v2.3.4 te deploy korbo. kon genaration theke kon jinish nichi seta ei version er 5th commit e bole dibo. uporer context ta muloto 2nd genaration theke newa karon oitake base hisebe nea 2/3 ta section replace korchi. ei combined version e about page er protita section er coto coto  bug and isssue gula nije theke fix korchi. hkn khali about page er hero section er samanno ektu fix kora baki and academic timeline ta aro update korte hbe. r about page theke `Sticky Crumb Bar` ta remove kore dichi, karon seta dynamic na and setar design valo na. poroborti version e seta new kore add korbo inshAllah...

---

## v2.3.5 — About Page Polish: Timeline Redesign, Hero Fix, UX Cleanup (2026-05-30)

### Changes summary

**Main task — AboutTimeline.jsx (full redesign):**
- **Wider arc:** `RADIUS: 320`, `arcW: 860px` (desktop) → `getArcConfig(vw)` handles responsive sizes down to mobile
- **Arc rotation animation fix:** Removed position clamping from `getArcPos()` — off-screen dots now sit at their natural extended arc positions (not all stacked at the edge). Framer Motion animates each dot with `key={i}` (fixed) + `animate={{ left, top }}` + spring transition, so clicking any far item rotates all dots smoothly along the arc
- **Short year labels:** `2015-17`, `2021-25` etc. displayed on dots; `title` attr shows full `2015 - 2017` on hover
- **Minimal card:** compact top row (icon + period + level), no chunky header badge area
- **Side nav arrows:** `←` `→` buttons flank the card outside it (not inside). `awt-card-area` flex row: [arrow] [card] [arrow]
- **Mobile arc:** same arc system via `getArcConfig(vw)`, responsive constants (`RADIUS: 148–170`, `MAX_OFFSET: 2` on mobile) — no more horizontal strip layout
- **Spring config:** `{ stiffness: 300, damping: 30, mass: 0.85 }`

**AboutHero.jsx:**
- Floating age badge removed (div + all badge CSS fully deleted)
- **Hero top gap fix:** breadcrumb bar was removed in v2.3.4 but `padding-top: calc(var(--navbar-h) + 34px)` was left — changed to just `var(--navbar-h)`. `min-height` also fixed (`- 34px` removed)
- `abh-nick-tag` (Turzo badge): `position: relative; top: -2px; left: -3px`
- Mobile inner padding reduced: `1.5rem` → `0.5rem`

**AboutStory.jsx:**
- CV card: replaced text "CV" badge with `<img src="/logo.webp" className="ast-cv-badge-img">` (40×40px, border-radius)
- Personal Details rows: `ast-info-row:hover { background: var(--bg-surface-2) }` with `transition: background .15s`

**AboutValues.jsx:**
- Hobbies chips parent div: `data-click-fx-ignore="true"` — only the outer `.abv-hobbies` card gets click effect, not the chips wrapper
- Mobile values cards: icon left + `.abv-text-wrap` flex-column (title above, desc below). On desktop `.abv-text-wrap { display: contents }` (transparent wrapper)

**App.jsx:**
- `.clickable` added to `CLICKABLE_SELECTOR` — universal class: add to any element to get click-fx ripple

**AboutSkills.jsx:**
- `.absk-note-card`: `cursor: default`, hover override `transform: none !important; box-shadow: none !important; border-color: rgba(59,130,246,.18) !important`

**AboutGoals.jsx:**
- Grid: `repeat(3, 1fr)` default; `@media (max-width: 750px) { grid-template-columns: 1fr }` — 3 cols until 750px, then 1 col

### Files changed
- `src/components/about/AboutTimeline.jsx` — full redesign
- `src/components/about/AboutHero.jsx` — badge removed, padding fix, nick-tag position
- `src/components/about/AboutStory.jsx` — logo.webp in CV card, row hover
- `src/components/about/AboutValues.jsx` — chips click isolation, mobile text-wrap layout
- `src/components/about/AboutSkills.jsx` — note card no-hover
- `src/components/about/AboutGoals.jsx` — 750px grid breakpoint
- `src/App.jsx` — `.clickable` universal class
- `package.json` — version `2.3.5`

> etar jonnow 4ta genaration korchilam. kintu kichu technical issue and limitation er jonno claude er baki 2ta chat history haray jay. 4th ta korchilam replit theke (replit er take copy 02 hibe be github e push korbo, tobe firebase e deploy korbo na. seta valo hoilew amr monmoto na). clause er baki 2ta copy glitch korlew ekta version er project zip paway sekhan theke valo sectio gula nea 1st copy take fix korchi, tachara manuallyo onek kichu fix korchi. ekn ti khali copy 01 [drive.turzo] push korbo

---
---
---

# 🔴 v2.4 - contexts

## v2.4.0 — Projects page, dynamic featured, full interactions (2026-05-31)

### creator-guide/ Folder Convention

> **Important for all future AIs:** This folder contains all permanent project files.
> Every version adds its own files here. Files from older versions stay permanently.
> File naming: `<type>-v<version>.ext` (e.g. `supabase-schema-v2.0.0.sql`)
>
> **Rule:** When completing a major version, place these files in creator-guide/:
> - `supabase-schema-v<X.X.X>.sql` — migration script (new tables/changes only for that version)
> - `cloudflare-worker-v<X.X.X>.js` — worker code (if changed)
> - `firebase-rtdb-rules-v<X.X.X>.json` — RTDB rules (if changed)
> - Any other important config/script files with version suffix
>
> The base schema (all tables) is in `supabase-schema-v2.0.0.sql`.
> Subsequent versions only add their changes in separate migration files.


### Key Schema Notes

**projects table**
- `is_featured` (BOOLEAN) — shown on home page, NOT `featured`
- `featured_order` (INT) — 1–6, lower = first. Managed via Supabase
- `status`: `published` | `draft` | `hidden`
- `visibility`: `public` | `signed-in` | `private`
- `content`: TipTap HTML string

**feed table (combines blogs + posts)**
- `type`: `blog` | `post`
- Blog: uses `content`, `cover_image_url`, `reading_time`, `pinned`, `series`
- Post (video): uses `embed_url`, `platform`

**Site Settings (Supabase `site_settings` table)**
All values stored as JSONB. Current keys:
| Key | Type | Default | Used in |
|-----|------|---------|---------|
| `stats_years_dev` | string | "3" | Hero, About |
| `stats_years_design` | string | "6" | Hero, About |
| `stats_projects` | string | "16" | Hero, About |
| `available_for_work` | boolean | true | Hero badge |
| `cv_url` | string | "" | Hero + About |
| `cv_enabled` | boolean | true | Hero + About |
| `cookie_banner` | boolean | true | Site-wide |
| `maintenance` | boolean | false | Site-wide |
| `comment_auto_approve` | boolean | false | Comments |

### Dynamic home projects
- RecentProjects.jsx now reads `is_featured=true` from Supabase `projects` table
- Ordered by `featured_order` (1–6, ascending)
- Static fallback shown if no is_featured projects in DB yet
- To feature a project: in Supabase set `is_featured=true` and `featured_order=1-6`
- Both home featured AND projects page filter through same Supabase queries
- Changing data in Supabase reflects on home AND projects page instantly

### Projects page
- `?q=search_term` — search query in URL
- `?cat=Category` — category filter in URL
- Both are bookmarkable/shareable URLs
- 12 projects per page, paginated

### Comment system
- Login + email verified required
- Max 1000 chars per comment
- Max 10 comments per user per content per 24hr
- All comments start as `pending` → admin approves via admin panel
- Approved comments only shown publicly

### LikeDislike
- Requires login
- Clicking same vote removes it (toggle)
- Optimistic update (immediate UI feedback, rollback on error)
- Stored in `likes` table with UNIQUE(content_type, content_id, user_id)

### Report button
- Requires login
- 6 reason options
- Optional description (max 300 chars)
- Stored in `reports` table, email notification sent to admin

### Important Decisions & Changes

- **Feed = Blogs + Posts combined** (per master prompt v2)
- **Blogs page renamed to Feed** for future v2.5.0
- **Per-user max comment 10/day** (per master prompt small edit)
- **`is_featured` not `featured`** — schema uses `is_featured`
- **About page transparent navbar** — `/about` added to isHomePage paths in Navbar
- **No PWA** — per master prompt
- **No Firebase Storage** — all images via ImgBB

### Environment Variables (current - keep secret)
```
VITE_FIREBASE_API_KEY=AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA
VITE_FIREBASE_AUTH_DOMAIN=mdturzo.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://mdturzo-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=mdturzo
VITE_FIREBASE_MESSAGING_SENDER_ID=13751895485
VITE_FIREBASE_APP_ID=1:13751895485:web:be068cfd6f46f945d3fed4
VITE_FIREBASE_MEASUREMENT_ID=G-SHM2013GKK
VITE_SUPABASE_URL=https://kddyucerqiwvjmuwebjv.supabase.co
VITE_SUPABASE_ANON_KEY=           ← user must fill
VITE_WORKER_URL=https://portfolio.programs-turzo.workers.dev
VITE_RECAPTCHA_SITE_KEY=          ← user must fill when ready
VITE_HOTJAR_ID=                   ← optional
VITE_SENTRY_DSN=                  ← optional
```

> v2.4.0 er jonno mainly 3ta genaration cilo jr ekektar ekek design valo. tobe ami copy 3 ta deploy kortichi karon etar design bashi valo na hoilew etar layout motamuti valo. bakita pore update korbo

---

## v2.4.1 | May 31, 2026

### New in v2.4.1
```
src/
├── components/
│   ├── projects/
│   │   └── ProjectCard.jsx        — Grid + List view card
│   ├── shared/
│   │   ├── Breadcrumb.jsx         — Breadcrumb nav
│   │   ├── LikeDislike.jsx        — Like/dislike with optimistic update
│   │   ├── ShareButtons.jsx       — Multi-platform share (native API + popup)
│   │   ├── ReportButton.jsx       — Report modal (login required)
│   │   ├── CommentSection.jsx     — Comments (login + email-verified required)
│   │   ├── RelatedContent.jsx     — Related projects grid
│   │   └── ImagePreviewModal.jsx  — Reusable full-screen image preview modal (v2.4.1)
│   └── home/
│       └── RecentProjects.jsx     — REBUILT: fully dynamic from Supabase is_featured
├── pages/
│   ├── Projects.jsx               — NEW: grid/list toggle, filter, search, pagination
│   └── ProjectDetail.jsx          — NEW: full detail with all interactions
└── services/
    └── supabase.js                — UPDATED: new project queries, likes, comments
```

### Dynamic home projects
- RecentProjects.jsx now reads `is_featured=true` from Supabase `projects` table
- Ordered by `featured_order` (1–6, ascending)
- Static fallback shown if no is_featured projects in DB yet
- To feature a project: in Supabase set `is_featured=true` and `featured_order=1-6`
- Both home featured AND projects page filter through same Supabase queries
- Changing data in Supabase reflects on home AND projects page instantly

### Projects page
- `?q=search_term` — search query in URL
- `?cat=Category` — category filter in URL
- Both are bookmarkable/shareable URLs
- 12 projects per page, paginated

### Comment system
- Login + email verified required
- Max 1000 chars per comment
- Max 10 comments per user per content per 24hr
- All comments start as `pending` → admin approves via admin panel
- Approved comments only shown publicly

### LikeDislike
- Requires login
- Clicking same vote removes it (toggle)
- Optimistic update (immediate UI feedback, rollback on error)
- Stored in `likes` table with UNIQUE(content_type, content_id, user_id)

### Report button
- Requires login
- 6 reason options
- Optional description (max 300 chars)
- Stored in `reports` table, email notification sent to admin

### Important Decisions & Changes

- **Feed = Blogs + Posts combined** (per master prompt v2)
- **Blogs page renamed to Feed** for future v2.5.0
- **Per-user max comment 10/day** (per master prompt small edit)
- **`is_featured` not `featured`** — schema uses `is_featured`
- **About page transparent navbar** — `/about` added to isHomePage paths in Navbar
- **No PWA** — per master prompt
- **No Firebase Storage** — all images via ImgBB

### Environment Variables (current)

```
VITE_FIREBASE_API_KEY=AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA
VITE_FIREBASE_AUTH_DOMAIN=mdturzo.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://mdturzo-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=mdturzo
VITE_FIREBASE_MESSAGING_SENDER_ID=13751895485
VITE_FIREBASE_APP_ID=1:13751895485:web:be068cfd6f46f945d3fed4
VITE_FIREBASE_MEASUREMENT_ID=G-SHM2013GKK
VITE_SUPABASE_URL=https://kddyucerqiwvjmuwebjv.supabase.co
VITE_SUPABASE_ANON_KEY=           ← user must fill
VITE_WORKER_URL=https://portfolio.programs-turzo.workers.dev
VITE_RECAPTCHA_SITE_KEY=          ← user must fill when ready
VITE_HOTJAR_ID=                   ← optional
VITE_SENTRY_DSN=                  ← optional
```

---

## v2.4.2 | June 2026

### Summary
Full projects system overhaul: card redesign, advanced search engine, Projects page header redesign, ProjectDetail complete rebuild, ImagePreviewModal with zoom/pan, RecentProjects responsive counts, Breadcrumb truncation fix, new Supabase schema (62 cols), rich CSV (all 19 projects), and content rules file.

### New / Changed Files

```
src/
├── services/
│   └── projectSearch.js         ← NEW: advanced multi-field weighted search engine
├── components/
│   ├── projects/
│   │   └── ProjectCard.jsx      ← REDESIGNED: uniform theme, gradient overlay, single-line tags
│   ├── shared/
│   │   ├── ImagePreviewModal.jsx ← ENHANCED: scroll/pinch zoom, pan, rich bottom action bar
│   │   └── Breadcrumb.jsx       ← FIX: last crumb truncates properly with min-w-0 + truncate
│   └── home/
│       └── RecentProjects.jsx   ← UPDATED: shows 6/4/3 cards (PC/tablet/mobile)
└── pages/
    ├── Projects.jsx             ← REDESIGNED: gradient header, advanced search, rounded dropdown
    └── ProjectDetail.jsx        ← FULL REDESIGN: rich 2-col layout, all 62 fields displayed

creator-guide/
├── supabase-schema-v2.4.2.sql   ← NEW: 62-column projects table with all RPCs + RLS
├── projects-csv-v2.4.2.csv      ← NEW: all 19 projects with full rich data
└── project-content-rules-v2.4.2.md ← NEW: AI rules for generating project CSV entries
```

### Projects Table (v2.4.2) — 62 Columns

**New columns vs v2.4.1:**
```
type, tech_stack[], languages[], frameworks[], libraries[]
backend, database, hosting
version, platform, project_timeline, start_date, end_date
project_status (active|completed|archived|discontinued|beta|in-development)
complexity_level (beginner|intermediate|advanced|expert)
team_size, role, client, institution
key_features[], changelog(JSONB), repo_stats(JSONB)
external_references(JSONB), demo_credentials(JSONB)
awards[], collaborators[], seo_keywords[]
open_source, has_pwa, has_dark_mode, has_responsive, is_collaborative
banner_url, og_image_url, demo_video_url
screenshots(JSONB), custom_link_label
```

**Retained from v2.4.1:**
```
id, slug, title, tagline, short_description, content, notes
thumbnail_url, github_link, live_link, pdf_link, custom_link
tags[], category, status, visibility, is_featured, featured_order, accent
seo_title, seo_description
views_count, likes_count, dislikes_count, comments_count
created_at, updated_at
```

### Advanced Search Engine (`projectSearch.js`)

Scoring weights per matching term:
| Field | Score |
|---|---|
| title (exact phrase bonus) | 100 (+80) |
| tagline | 60 |
| tags (per tag) | 70 |
| seo_keywords | 55 |
| slug | 40 |
| short_description | 30 |
| key_features (per item) | 25 |
| category / type | 22 |
| tech_stack (per item) | 20 |
| languages / frameworks | 18 |
| libraries | 14 |
| content (HTML stripped) | 12 |
| notes | 10 |
| platform / version | 8 |
| links | 6 |
| changelog / external_references | 6–7 |

- Returns results sorted by total score (descending)
- Exports: `searchProjects(projects, query)`, `highlightTerms(text, query)`, `getSearchSuggestions(projects, query)`
- When searching: sort dropdown is ignored (results sorted by relevance instead)

### ProjectCard Changes
- **No category-based colors** — all cards use `--accent-primary` uniformly
- Gradient overlay: `from-black/75 via-black/20 to-transparent` always on thumbnails
- Category badge: bottom-left, always visible, `bg-[var(--accent-primary)]/90`
- Hover icons (GitHub, Live): top-right, fade+slide in on hover
- Tags: single horizontal line with `flex-nowrap overflow-hidden`, shows up to 4 tags + `+N`
- Title: **no color change on hover** (removed `group-hover:text-[var(--accent-primary)]`)
- Click effect: `active:scale-[0.98]` on whole `article` (via `proj-card` CSS class)
- Empty placeholder: centered icon + category text in `--accent-light` box
- List card: fully redesigned — left accent bar, clean horizontal layout, opacity-0 icons reveal on hover

### Projects Page Changes
- **Header**: "My **Projects**" with gradient text, accent badge "Portfolio", project count
- **Search**: debounced (300ms), `Ctrl+K`/`Cmd+K` focus shortcut, `⌘K` hint badge
- **Engine**: uses `searchProjects()` from `projectSearch.js` — searches ALL fields
- **Sort**: disabled when actively searching (relevance sort takes over)
- **Category dropdown**: `rounded-xl` pills (not rounded-full), better light/dark contrast
- **Layout**: `gap-2.5` list view, consistent spacing

### ProjectDetail Changes
- **Layout**: `grid-cols-1 lg:grid-cols-[1fr_290px] xl:grid-cols-[1fr_310px]`
- **Hero**: full-width `h-[220px] sm:h-[300px] lg:h-[340px]`, category badge top-left
- **Meta OG image**: `og:image` uses `thumbnail_url` → `og_image_url` → default; includes `og:image:width/height`
- **New sections on left column**: TechStackSection, KeyFeatures (collapsible at 6), ExternalReferences, Notes box
- **Sidebar**: StatusBadge, ComplexityBadge, flags (PWA/DarkMode/Responsive), awards, demo credentials meta
- **Breadcrumb**: project title truncated at `max-w-[140px] sm:max-w-[220px]`
- **JSON-LD**: `SoftwareApplication` schema with all meta fields
- **Twitter card**: `summary_large_image` meta tags added

### ImagePreviewModal Changes
- **Scroll zoom**: `wheel` event → zoom ±0.2 per scroll step (0.5× to 6× range)
- **Mouse drag pan**: drag when zoom > 1, cursor changes to `grab`/`grabbing`
- **Touch pinch zoom**: two-finger distance tracking for mobile
- **Touch pan**: single-finger drag when zoomed
- **Double-click**: toggle zoom (1× ↔ 2.5×)
- **Keyboard**: `+`/`-` to zoom, `0` to reset, arrows to navigate, `Esc` to close
- **New footer bar** (2 groups):
  - URL Actions: `Copy Image`, `Copy Image URL`, `Copy Project URL`
  - Share: `Share Project` (native API or fallback copy)
- **Header**: zoom % indicator, inline zoom buttons, improved layout
- **`projectUrl` prop**: passed from ProjectDetail to enable "Copy Project URL"

### RecentProjects Changes
- `visibleCount` state tracks viewport:
  - `≥1024px` → 6 cards  (3-col grid × 2 rows)
  - `640–1023px` → 4 cards (2-col grid × 2 rows)
  - `<640px` → 3 cards    (1-col × 3 rows)
- `resize` event listener keeps count responsive in real-time
- Skeleton grid uses `visibleCount` for count

### Breadcrumb Fix
- Added `min-w-0` to `li` elements to enable CSS truncation in flex containers
- Last item uses `truncate max-w-[140px] sm:max-w-[220px] md:max-w-[320px]` with `title` attribute for full text on hover
- Fixed: project names no longer overflow breadcrumb on narrow screens

### CSS Changes Needed in `index.css`
Add to `proj-card` section:
```css
.proj-card:active { transform: scale(0.98); }
```
This handles the whole-card click press effect.


### `supabase.js` SELECT Update

The `getPublishedProjects()` query must include all new columns for card and detail display. Update the `.select()` call to include at minimum:

```js
.select(`id, slug, title, tagline, short_description, thumbnail_url,
  github_link, live_link, pdf_link, custom_link, custom_link_label,
  tags, category, type, status, is_featured, featured_order,
  views_count, likes_count, dislikes_count, created_at, updated_at,
  tech_stack, languages, frameworks, libraries, backend, database, hosting,
  key_features, project_status, complexity_level, version, platform,
  project_timeline, start_date, team_size, role, institution,
  open_source, has_pwa, has_dark_mode, has_responsive,
  awards, external_references, notes, seo_keywords, accent`)
```

For `getProjectBySlug()` keep `*` (select all) as before.

---

## v2.4.3 | June 2026

### Summary
Bug fixes + feature additions: fixed home page real-data loading (wrong SELECT columns caused query failure), screenshot carousel for project detail hero, horizontal scroll related-projects row, sidebar responsive repositioning on mobile, redesigned tech stack section, project card title tooltip, and verified 6-project CSV seed data.

### Root Bug Fixed (Home Page Real Data)
`getFeaturedProjects()` and `getPublishedProjects()` in `supabase.js` were SELECTing columns `awards` and `notes` that **don't exist** in the 49-column table → Supabase returned an error → component fell back to `STATIC_FALLBACK` silently.

**Fix:** Both queries now only SELECT columns that exist in the actual table.

### New Files

| File | Type | Purpose |
|------|------|---------|
| `src/components/shared/ProjectCarousel.jsx` | NEW | Screenshot carousel for hero section |
| `src/components/shared/RelatedProjectsRow.jsx` | NEW | Horizontal scroll related projects row |
| `creator-guide/projects-csv-v2.4.3.csv` | NEW | 6 verified projects, correct 49-col format |

### Changed Files

| File | Change |
|------|--------|
| `src/services/supabase.js` | Fixed SELECT columns (removed `awards`, `notes`); added new columns from 49-col table to both `getPublishedProjects` and `getFeaturedProjects` |
| `src/components/home/RecentProjects.jsx` | Fixed to use corrected query; proper 6/4/3 responsive count |
| `src/pages/ProjectDetail.jsx` | Full redesign v2; uses `ProjectCarousel`, `RelatedProjectsRow`; sidebar mobile repositioning |
| `src/components/projects/ProjectCard.jsx` | Added `title={p.title}` to overlay Link for native HTML tooltip; added `normalizeTags()` defensive array parser |
| `src/index.css` | `proj-card:active` → `scale(0.98) translateY(0)` |

### Screenshots Column (Action Required)
To enable the carousel for projects with multiple images, run this SQL in Supabase:

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS screenshots JSONB DEFAULT '[]';
```

**Data format per project row:**
```json
[
  { "url": "https://i.ibb.co.com/...", "caption": "Home screen" },
  { "url": "https://i.ibb.co.com/...", "caption": "Dashboard view" }
]
```

The carousel shows: **thumbnail first → screenshots in order**. If `screenshots` is empty or null, only thumbnail is shown (no carousel chrome). If total slides = 1, no carousel chrome. If ≥ 2, full carousel with prev/next/dots/auto-slide.

### ProjectCarousel.jsx Behavior
- `screenshots` = JSONB array `[{url, caption}]` from Supabase
- Slide order: thumbnail → screenshots[0] → screenshots[1] → …
- Auto-advance: 5 seconds, pauses on hover
- Progress bar: animated at bottom of carousel
- Prev/Next: appear on hover (group-hover), full keyboard support
- Dot indicators: click any dot to jump, active dot expands to pill
- Count badge: top-right corner
- Click any slide → opens `ImagePreviewModal` with all slides

### RelatedProjectsRow.jsx Behavior
- Single horizontal scroll row on ALL screen sizes
- **PC:** left/right arrow buttons appear, disabled when at scroll boundary; fade gradients at edges
- **Mobile:** touch scroll + small "Prev / Next" buttons below the row
- Compact card: 168px wide (sm: 188px), 96px tall thumbnail, category badge, title, short desc
- "All Projects" end card: always last item, links to `/projects`
- Arrow state updates on scroll + resize events

### ProjectDetail v2.4.3 Layout

**PC (≥ 1024px):**
```
[Breadcrumb] [← Back]
[ProjectCarousel — hero]

[LEFT flex-1]                    [RIGHT sidebar 280px sticky]
├── Title + Tagline + Short desc ├── SidebarMeta (links, badges, meta, tags)
├── Stats bar (like/dislike/views)└── SharePanel
├── TechStackSection (redesigned)
├── KeyFeatures
├── Content HTML
├── Notes
├── RelatedProjectsRow ← above comments
└── CommentSection
```

**Mobile (< 1024px):**
```
[Breadcrumb] [← Back]
[ProjectCarousel]
Title + Tagline + Short desc
Stats bar
[SidebarMeta compact] ← moved here, ABOVE tech stack
TechStackSection
KeyFeatures
Content HTML
Notes
[SharePanel compact] ← mobile only
RelatedProjectsRow
CommentSection
```

### TechStack Section Redesign
- Wrapped in `rounded-2xl border` card with header row (Code icon + "TECH STACK" label)
- 2-column grid inside (1 col on mobile)
- Each group: icon square + label + pills row
- Accent pills for `tech_stack`, neutral for everything else
- Groups shown: Stack / Languages / Frameworks / Libraries / Backend / Database / Hosting
- Empty groups hidden automatically

### normalizeTags() Helper
Added to `ProjectCard.jsx` — safely handles tags field regardless of source:
```js
function normalizeTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags           // Supabase returns real arrays
  if (typeof tags === 'string') {
    try { return JSON.parse(tags) } catch { return [] }
  }
  return []
}
```

### projects-csv-v2.4.3.csv
- **6 projects** (best, most varied): linkivo, qr-prism, ufmt-ssc26, notification-panel, project-exporter-pro, halal
- **Verified:** all rows exactly 49 fields — no import errors
- Arrays stored as proper JSON: `["item1","item2"]`
- Boolean values as plain `true`/`false` (no quotes)
- Integer values without quotes

### supabase.js Updated SELECT (getPublishedProjects)
```js
.select(`
  id, slug, title, tagline, short_description, thumbnail_url,
  github_link, live_link, pdf_link, custom_link, custom_link_label,
  tags, category, type, status, is_featured, featured_order, accent,
  views_count, likes_count, dislikes_count, comments_count,
  created_at,
  tech_stack, languages, frameworks, libraries,
  backend, database, hosting,
  key_features, project_status, complexity_level,
  version, platform, project_timeline, start_date,
  team_size, role, institution, client,
  open_source, has_pwa, has_dark_mode, has_responsive, seo_keywords
`)
```

`getProjectBySlug` still uses `*` (fetches all columns including `screenshots` once added).

### Deploy Checklist for v2.4.3
1. Run `ALTER TABLE projects ADD COLUMN IF NOT EXISTS screenshots JSONB DEFAULT '[]';` in Supabase
2. Import `projects-csv-v2.4.3.csv` into Supabase projects table (replace existing rows by slug)
3. Replace all changed files (see table above)
4. Add new files: `ProjectCarousel.jsx`, `RelatedProjectsRow.jsx`
5. `npm run build && firebase deploy`
6. Verify home page shows real project thumbnails (not gray placeholder cards)

---

## v2.4.4 | June 2026

### Summary
Major update: new Supabase projects schema (70 columns), project_reviews table, all project files reorganized into `src/components/projects/`, DevBanner (yellow "under development" bar above navbar), ProjectCard redesign (light gradient, dynamic tag fitting), ProjectCarousel enhanced (thumbnail strip), ImagePreviewModal rebuilt (filmstrip nav, better UI), ReviewSection new (1–5 stars, popup), supabase.js SELECT updated for new schema.

### New Files

| File | Purpose |
|------|---------|
| `src/components/ui/DevBanner.jsx` | Yellow dev-in-progress banner above navbar |
| `src/components/projects/ProjectCarousel.jsx` | Moved from shared + thumbnail strip + swipe |
| `src/components/projects/ImagePreviewModal.jsx` | Moved from shared + rebuilt UI (filmstrip) |
| `src/components/projects/RelatedProjectsRow.jsx` | Moved from shared |
| `src/components/projects/ReviewSection.jsx` | Star reviews with popup, Google login gate |
| `src/components/projects/ProjectsPage.jsx` | ProjectsContent extracted from Projects.jsx |
| `src/components/projects/ProjectDetailPage.jsx` | ProjectDetailContent extracted + redesigned |
| `creator-guide/supabase-schema-v2.4.4.sql` | New 70-column schema + project_reviews |
| `creator-guide/projects-data-v2.4.4.csv` | All 19 projects in new 70-column format |


### Changed Files

| File | Change |
|------|--------|
| `src/components/projects/ProjectCard.jsx` | Light mode gradient wash, dynamic tag fitting, dark mode accent glow |
| `src/components/layout/Layout.jsx` | Added `<DevBanner />` above `<Navbar />` |
| `src/pages/Projects.jsx` | Thin wrapper → imports ProjectsPage |
| `src/pages/ProjectDetail.jsx` | Thin wrapper → imports ProjectDetailPage |
| `src/services/supabase.js` | Updated SELECT for new schema; added getProjectReviews, getUserProjectReview, submitProjectReview |


### DevBanner
- Amber/brown gradient background above navbar
- 2 lines: "under development" heading + detail text
- Bottom: animated progress bar (37%), tick marks at 25/50/75%, pct label
- Close icon: hides for 3 days (localStorage key `devbanner_closed_until`)
- AnimatePresence height animation on open/close

### Projects Folder Reorganization
All project-related files now live in `src/components/projects/`:
- `ProjectCard.jsx`, `ProjectCarousel.jsx`, `ImagePreviewModal.jsx`
- `RelatedProjectsRow.jsx`, `ReviewSection.jsx`
- `ProjectsPage.jsx`, `ProjectDetailPage.jsx`

`src/pages/Projects.jsx` and `src/pages/ProjectDetail.jsx` → thin wrappers only (2 lines each).

### ProjectCard v2.4.4 Changes
- **Light mode**: `bg-gradient-to-br from-white via-bg-surface to-accent-light/50` overlay on card body
- **Dark mode**: ring-1 accent glow on hover via `group-hover:ring-[var(--accent-primary)]/35`
- **Tags**: `TagRow` component — measures children widths with `useLayoutEffect`, shows max that fit in one line, then `+N` badge
- **No-thumbnail placeholder**: gradient background instead of flat surface
- **List view**: left bar transitions `opacity-25 → 100%` on hover

### ProjectCarousel v2.4.4 Changes
- Thumbnail strip shown at bottom when `slides.length >= 3`
- Touch swipe support (left/right)
- Progress bar gradient: `from-accent-primary to-accent-hover`
- Image count badge shows image icon
- Better shadow/backdrop on prev/next buttons

### ImagePreviewModal v2.4.4 Changes (full rebuild)
- **Filmstrip** at bottom (always visible when multi-image) — auto-scrolls to active thumb
- **Directional** animation on prev/next (slide + fade, direction-aware)
- **Header**: zoom controls in grouped pill (`−` | `%` | `+`), reset button appears when zoom ≠ 1, red-tinted close on hover
- **Footer actions**: Copy Image, Copy URL, Project URL, Open Project link, Share
- **Zoom UX**: scroll wheel, pinch, click `%` to reset, double-click toggle

### ReviewSection v2.4.4
- Uses `project_reviews` Supabase table (new in this version)
- Login gate: shows Google sign-in button if not logged in (`loginWithGoogle()` from firebase.js)
- One review per user per project (`UNIQUE(project_id, user_id)`)
- 1–5 star input with hover animation
- 500-char textarea with live counter
- "View all reviews" button → popup with rating distribution bar chart and full list
- Shown in PC sidebar + mobile inline (above comments)

### New Supabase Schema v2.4.4
- **projects**: 70 columns (added: `short_name`, `og_image_url`, `video_url`, `custom_link_label`, `extra_links`, `frameworks`, `libraries`, `backend`, `database`, `hosting`, `year_built`, `start_date`, `role`, `institution`, `client`, `open_source`, `is_highlighted`, `highlight_label`, `canonical_url`, `project_status`, `reviews_count`, `avg_rating`, `awards`, `external_references`)
- **project_reviews**: `id`, `project_id`, `user_id`, `rating (1-5)`, `message (≤500)`, `status`, timestamps — UNIQUE(project_id, user_id)
- New RPCs: `increment_project_views`, `sync_project_review_stats`
- Column `type` removed (now `project_type`)
- Column `complexity` renamed to `complexity_level`

### supabase.js SELECT (getPublishedProjects) v2.4.4
```js
.select(`
  id, slug, title, short_name, tagline, short_description, thumbnail_url, og_image_url,
  github_link, live_link, pdf_link, custom_link, custom_link_label,
  tags, category, project_type, platform, status, visibility,
  is_featured, featured_order, sort_order, accent,
  views_count, likes_count, dislikes_count, comments_count, reviews_count, avg_rating,
  created_at,
  tech_stack, languages, frameworks, libraries, backend, database, hosting,
  key_features, project_status, complexity_level,
  version, year_built, duration, project_timeline, start_date,
  team_size, role, institution, client,
  open_source, has_pwa, has_dark_mode, has_responsive,
  is_highlighted, highlight_label, seo_keywords, notes
`)
```

### Deploy Checklist for v2.4.4
1. Run `supabase-schema-v2.4.4.sql` in Supabase SQL editor (drops+recreates projects table + adds project_reviews)
2. Import `projects-data-v2.4.4.csv` via Supabase dashboard → Table Editor → Import CSV
3. Replace all changed source files
4. Add `@keyframes shimmer` to `index.css` (for DevBanner shimmer):
   ```css
   @keyframes shimmer { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
   ```
5. `npm run build && firebase deploy`

---

## v2.4.4 | June 2026

### Summary
Major project-related overhaul: redesigned ProjectCard with light-mode gradients and dynamic tag fitting; rebuilt ImagePreviewModal with filmstrip navigation; enhanced ProjectCarousel with thumbnail strip and swipe; moved all project components to `src/components/projects/`; new `ReviewSection` with 1–5 star reviews and popup viewer; `DevBanner` above navbar (yellow, progress bar 37%, 3-day localStorage dismiss); new 69-column Supabase schema for `projects`; new `project_reviews` table; full 19-project CSV; thin wrapper pages.

### New Files

| File | Purpose |
|------|---------|
| `src/components/ui/DevBanner.jsx` | Yellow dev-in-progress banner above navbar, dismissible 3 days |
| `src/components/projects/ProjectCarousel.jsx` | Moved from shared + thumbnail strip + swipe |
| `src/components/projects/ImagePreviewModal.jsx` | Moved from shared + rebuilt filmstrip UI |
| `src/components/projects/RelatedProjectsRow.jsx` | Moved from shared (no changes) |
| `src/components/projects/ReviewSection.jsx` | NEW — star reviews, popup all-reviews, Google login gate |
| `src/components/projects/ProjectsPage.jsx` | Extracted from Projects.jsx |
| `src/components/projects/ProjectDetailPage.jsx` | Extracted + redesigned, includes ReviewSection |
| `creator-guide/supabase-schema-v2.4.4.sql` | New 69-col projects + project_reviews table |
| `creator-guide/projects-data-v2.4.4.csv` | Full 19-project CSV for new schema |

### Changed Files

| File | Change |
|------|--------|
| `src/components/projects/ProjectCard.jsx` | Light-mode gradient, dark-mode glow, dynamic tag row, accent-bar list |
| `src/pages/Projects.jsx` | Thin wrapper only (imports ProjectsPage) |
| `src/pages/ProjectDetail.jsx` | Thin wrapper only (imports ProjectDetailPage) |
| `src/components/layout/Layout.jsx` | Added `<DevBanner />` above Navbar |
| `src/services/supabase.js` | Added `getProjectReviews`, `getUserProjectReview`, `submitProjectReview` |

### DevBanner
- Renders above `<Navbar />` in Layout
- Yellow/amber theme: `bg-gradient: #92400e → #78350f → #92400e`
- Line 1: "🚧 This site is currently under active development"
- Line 2: "Some features may be incomplete…"
- Bottom: 3px progress bar, 37% filled, tick marks at 25/50/75%, shimmer animation
- Close: stores `devbanner_closed_until` in `localStorage` for 3 days
- Animated mount/unmount via `AnimatePresence height: 0 → auto`

### ProjectCard v2.4.4
- **Light mode**: `bg-gradient-to-br from-white via-surface to-accent-light/50` wash
- **Dark mode**: unchanged surface, but hover adds `ring-1 ring-accent/35`
- **Tags**: `TagRow` component — measures children via `getBoundingClientRect`, shows as many as fit in one line, then `+N`
- **No-thumbnail**: gradient placeholder `from-surface-2 to-accent-light/30`
- **List card**: left bar transitions `w-[3px]` on hover (was static `w-1`)

### Project Files Folder Consolidation
All project-related components now in `src/components/projects/`:
- `ProjectCard.jsx`, `ProjectCarousel.jsx`, `ImagePreviewModal.jsx`
- `RelatedProjectsRow.jsx`, `ReviewSection.jsx`
- `ProjectsPage.jsx`, `ProjectDetailPage.jsx`

`src/pages/Projects.jsx` and `src/pages/ProjectDetail.jsx` are now thin wrappers (3 lines each).

### ReviewSection
- Renders in `ProjectDetailPage` above RelatedProjectsRow
- **Not logged in**: "Sign in with Google" button → `loginWithGoogle()` from firebase.js
- **Logged in, no review**: star input (1–5) + 500-char textarea + submit
- **Already reviewed**: shows own review card in accent-light box
- **"View all" button**: opens `ReviewsPopup` modal with:
  - Rating distribution bar chart (5→1 stars)
  - Overall average + count
  - Scrollable list of all approved reviews
- Supabase table: `project_reviews` (unique per user+project)

### New Supabase Schema (v2.4.4)
- `projects` table: **69 columns** (up from 49)
- New columns: `video_url`, `frameworks`, `libraries`, `backend`, `database`, `hosting`, `start_date`, `role`, `institution`, `client`, `reviews_count`, `avg_rating`, `awards`, `external_references`, `type` renamed from `project_type`
- Removed: none (all old columns preserved, renamed or added)
- `project_reviews` table: NEW — `project_id`, `user_id`, `rating`, `message`, `status`
- RLS: public SELECT for published+public; service_role ALL

### supabase.js SELECT Update (getPublishedProjects)
```js
.select(`
  id, slug, title, tagline, short_description, thumbnail_url,
  github_link, live_link, pdf_link, custom_link, custom_link_label,
  tags, category, type, status, project_status, is_featured, featured_order, accent,
  views_count, likes_count, dislikes_count, comments_count, reviews_count, avg_rating,
  created_at, complexity_level, version, platform, project_timeline,
  tech_stack, languages, frameworks, libraries, backend, database, hosting,
  team_size, role, institution, client, open_source, has_pwa, has_dark_mode, has_responsive,
  seo_keywords, is_highlighted, highlight_label
`)
```

### Deploy Checklist for v2.4.4
1. Drop old `projects` table, run `supabase-schema-v2.4.4.sql`
2. Import `projects-data-v2.4.4.csv` into Supabase
3. Replace all changed/new source files (see tables above)
4. `npm run build && firebase deploy`
5. Verify DevBanner shows at top, dismisses and returns after 3 days
6. Verify card tags fit one line + show `+N` on overflow
7. Test Google login → review submit on a project detail page

---

## v2.4.5 — Structural Cleanup + DevBanner + Bug Fixes
**Date:** 2026-06-04

### Changes

**1. DevBanner — complete redesign (`src/components/ui/DevBanner.jsx`)**
- Removed dark/danger amber style; replaced with a neutral, minimal, info-style strip
- Uses `--bg-surface`, `--border-color`, `--accent-primary` — fits both light/dark themes
- Progress pill (37%) with a thin fill bar + percentage label
- Dismiss stores timestamp in localStorage (hidden for 3 days)
- Animates in/out with Framer Motion height collapse
- Responsive: hides sub-text and pill below 540px

**2. Layout fix — DevBanner now truly above Navbar (`src/components/layout/Layout.jsx`)**
- Root `min-h-screen` div now has two layers:
  - `<DevBanner />` — outer, renders first in normal flow
  - `<div className="relative flex-1 flex flex-col">` — inner wrapper gives Navbar its `position: absolute` containing block
- This means on home/about pages (where Navbar is `absolute top-0`), the Navbar is contained within the inner div, so it can never visually overlap the DevBanner

**3. Component folder restructure**
- `shared/` cleaned to only truly cross-page components:
  `AdminQuickActions`, `Breadcrumb`, `CommentSection`, `LikeDislike`, `ReportButton`, `ShareButtons`, `SiteCTA`, `VisibilityGuard`
- **Deleted from `shared/`** (were project-specific duplicates, real versions already in `projects/`):
  `ImagePreviewModal.jsx`, `ImageViewer.jsx`, `ProjectCarousel.jsx`, `RelatedContent.jsx`, `RelatedProjectsRow.jsx`
- **Deleted from `home/`** (unused/duplicates):
  `RecentProjectsOrginal.jsx`, `BlogMini.jsx`, `Stats.jsx`, `CTA.jsx` (consolidated into `shared/SiteCTA.jsx`)
- **Deleted:** `layout/Navbar.jsx.patch` (development artifact)
- **Created stub folders:** `components/contact/`, `components/feed/` with `README.md` (v2.6 and v2.5 planned)

**4. Page-specific CSS files**
- `src/components/projects/projects.css` — extracted from `index.css`:
  `.proj-page-grid`, `.proj-card`, `.prose-content` (full TipTap styles), `.proj-detail-sidebar`
  Imported in `ProjectsPage.jsx` and `ProjectDetailPage.jsx`
- `src/components/home/home.css` — extracted `.rp-grid`
  Imported in `RecentProjects.jsx`
- `src/index.css` — retains global + shared utilities:
  `.pt-navbar` (NEW — was missing, caused layout bug), `.breadcrumb-nav`, `.bc-link`, `.share-panel`, `.comment-card`, `.scrollbar-none`

**5. Bug fix — `.pt-navbar` class was undefined**
- Added `.pt-navbar { padding-top: var(--navbar-h); }` to `index.css`
- Was used in `Layout.jsx` for non-home pages but never defined anywhere

**6. RecentProjects — removed all static fallback data (`src/components/home/RecentProjects.jsx`)**
- Deleted `STATIC_FALLBACK` array entirely
- When DB returns no results: shows a minimal `EmptyPlaceholder` with retry button
  (wrench icon, "No projects yet", "Featured projects will appear here once they're published.")
- Loading state: skeleton grid (no fake data)
- Responsive count: 6 on ≥1024px / 4 on ≥640px / 3 on mobile

**7. Live project count from DB (`src/services/supabase.js`, `src/hooks/useSiteSettings.js`)**
- Added `getProjectCount()` to `supabase.js` — counts rows with `status=published` AND `visibility=public`
- `useSiteSettings` now fetches `getSiteSettings()` and `getProjectCount()` in parallel
- `statsProjects` is now the live DB count; falls back to `site_settings.stats_projects` value, then to config default `'16+'`
- Hero, Stats, AboutStory all automatically receive the correct count via `useSiteSettings()`

**8. `About.jsx` — fixed import**
- Was importing `CTA` from `../components/home/CTA.jsx` (a stale duplicate)
- Now imports from `../components/shared/SiteCTA.jsx` (the canonical shared version)

**9. Version bump:** `site.config.js` → `v2.4.5`


### Component Structure (post v2.4.5)

```
src/
├── components/
│   ├── about/          AboutHero, AboutStory, AboutTimeline, AboutSkills,
│   │                   AboutLanguages, AboutValues, AboutGoals, AboutConnect
│   ├── contact/        README.md  ← v2.6 planned
│   ├── feed/           README.md  ← v2.5 planned
│   ├── home/           Hero, AboutMini, RecentProjects, Skills, Process,
│   │                   Services, Testimonials, GithubStats, home.css
│   ├── layout/         Layout, Navbar, Footer
│   ├── projects/       ProjectsPage, ProjectDetailPage, ProjectCard,
│   │                   ProjectCarousel, ImagePreviewModal, RelatedProjectsRow,
│   │                   ReviewSection, projects.css
│   ├── shared/         AdminQuickActions, Breadcrumb, CommentSection, LikeDislike,
│   │                   ReportButton, ShareButtons, SiteCTA, VisibilityGuard
│   └── ui/             Badge, Button, CookieBanner, DevBanner, ErrorBoundary,
│                       Modal, PageProgress, Ripple, Skeleton, ToastContainer
├── config/             site.config.js, firebase.config.js, supabase.config.js
├── hooks/              useAdmin, useAuth, usePageVisibility, useSiteSettings
├── pages/              Home, About, Projects, ProjectDetail, Contact, Feed,
│                       Blogs, Posts, Login, Signup, Admin, Profile, ...
├── services/           supabase.js, firebase.js, analytics.js, projectSearch.js
├── store/              authStore, themeStore, notificationStore, toastStore
└── utils/              seo.js, formatters.js
```

### Key Supabase Functions (supabase.js)

| Function | Description |
|---|---|
| `getSiteSettings()` | Reads `site_settings` table (JSONB) |
| `getProjectCount()` | `COUNT(*)` on `projects` WHERE `published` + `public` |
| `getPublishedProjects()` | All visible projects for the page listing |
| `getFeaturedProjects()` | `is_featured=true` ordered by `featured_order` |
| `getProjectBySlug(slug)` | Single project for detail page |
| `getRelatedProjects(id,tags)` | Related projects for sidebar |
| `incrementProjectViews(id)` | RPC `increment_project_views` |
| `toggleLike(contentType, contentId, userId)` | Like/dislike toggle |
| `getLikeStats(contentType, contentId)` | Like counts |
| `getUserLikeStatus(contentType, contentId, userId)` | User's current like state |
| `getComments(contentType, contentId)` | Fetch approved comments |
| `addComment(...)` | Submit new comment (starts as pending) |
| `reportContent(...)` | Submit report (6 reasons, max 300 chars) |

---

## v2.4.6 — Project Fixes & Section Loading

### Summary
Major project section overhaul + progressive section loading across Home and About pages.

### Changes

#### ProjectCard.jsx (full rewrite)
- **Click effect**: Added `data-click-fx="true"` to `<article>` — works with global ClickEffect in App.jsx
- **Theme-aware thumbnail overlay**: `proj-thumb-overlay` CSS class in `projects.css` — dark gradient in dark mode, lighter in light mode
- **Card body gradient bug fixed**: Removed `opacity-100 dark:opacity-0` approach (unreliable); now handled via `[data-theme]` CSS selectors (`proj-card-body` class)
- **Body/footer divider fixed**: `proj-card-divider` CSS class replaces broken `border-[var(--border-color)]/60` (Tailwind `/60` opacity modifier doesn't work with hex CSS variables)
- **Tags**: Now show all tags (max 4) with `flex-wrap` + `+N` overflow badge — no more single-line hide trick
- **List card**: Complete redesign — `w-44 sm:w-52` image, proper content layout with title/tags/description/stats, right-side hover actions panel
- **URL**: Both cards now link to canonical `/project/:slug` (was `/projects/:slug`)

#### projects.css (additions)
- `proj-thumb-overlay` — theme-aware gradient for card thumbnails
- `proj-card-body` — theme-aware gradient for card body background
- `proj-card-divider` — theme-aware border color for body/footer separator
- `proj-select` — custom styled select with proper dark mode bg (used in ProjectsPage)

#### ProjectsPage.jsx (rewrite)
- **Controls layout**: Large screens → search bar takes full flex width (left), sort + view-toggle grouped right
- **Custom sort select**: `SortSelect` component with `proj-select` CSS class — dark mode dark bg, chevron icon
- **2 new sort options**: `featured_first` (featured=true first, then by date), `az` (A–Z alphabetical)
- **Mobile controls**: Right controls (sort + view) wrap into a right-aligned row below search on xs screens
- **Skeleton for controls**: `ControlsSkeleton` component shows skeleton for search, dropdowns, and category pills while loading
- **Progressive card reveal**: `visibleCount` starts at 6; increments +6 every 280ms until all `paged` cards are shown. Resets on page/filter change
- **Banner loads first**: Page header (`<motion.div>`) always renders; controls + cards are gated behind `loading` state
- **Pagination hidden during progressive reveal**: Only shows when `visibleCount >= paged.length`
- **EmptyState → NoProjectsPlaceholder**: Uses shared `NoProjectsPlaceholder` component

#### New: `src/components/shared/ui/NoProjectsPlaceholder.jsx`
- Ghost grid of decorative card skeletons (3 for home, 6 for page) with dimmed trailing cards
- Floating overlay card with icon, message, and action button
- `variant`: `'home'` | `'page'`
- `hasFilters` + `query` for filtered empty state messaging
- `onClear`, `onRetry` callbacks; link to `/projects` when on home
- Used by: `RecentProjects.jsx`, `ProjectsPage.jsx`

#### New: `src/components/ui/SectionReveal.jsx`
- IntersectionObserver wrapper for progressive section rendering
- `rootMargin: '120px'` — starts loading section 120px before viewport
- Shows a `sk` skeleton block (`skeletonH` prop sets min-height) until visible
- Fades in content with Framer Motion `{ opacity: 0, y: 10 }` → `{ opacity: 1, y: 0 }`

#### Home.jsx (updated)
- Hero renders immediately (no wrapper)
- All other sections (`AboutMini`, `RecentProjects`, `Skills`, `Process`, `Services`, `Testimonials`, `GithubStats`, `CTA`) wrapped in `<SectionReveal skeletonH={...}>` with tuned heights

#### About.jsx (updated)
- `AboutHero` renders immediately
- All other sections wrapped in `<SectionReveal>` with tuned heights

#### App.jsx (routing additions)
- `/project` → `<Navigate to="/projects" replace />`
- `/project/:slug` → `<ProjectDetail />` (new canonical URL)
- `/projects/:slug` → `<ProjectsSlugRedirect />` which reads `slug` param and redirects to `/project/:slug`
- Added `ProjectsSlugRedirect` helper component using `useParams`

#### GithubStats.jsx (fix)
- Light mode streak text colors were near-white on near-white background (invisible)
- `sideNums` and `currStreakNum`: `F8FAFC` → `0F172A` (dark) in light mode
- `sideLabels`: `94a3b8` → `374151` in light mode
- `dates`: `64748b` → `4B5563` in light mode
- Dark mode: unchanged (still near-white for dark backgrounds)

#### RelatedProjectsRow.jsx (fix)
- Updated related card links from `/projects/:slug` → `/project/:slug`

### Issues fixed

**TagFit component (ProjectCard.jsx)**
- Tags were wrapping to multiple lines → completely rewritten as `TagFit` component
- Uses `ResizeObserver` + hidden measurement layer (`position: absolute; opacity: 0`)
- Renders all tags invisibly, measures each `offsetWidth`, calculates how many fit in one line
- Shows exactly that many tags in the visible row + `+N` overflow badge for the rest
- Single line guaranteed via `flex-nowrap` on visible row

**List card redesign (ProjectCard.jsx)**
- Complete new layout: left thumbnail `w-36 sm:w-48`, content area, no right sliding panel
- Action icons (GitHub + Live) now appear at **top-right corner** of the card on hover (`opacity-0 group-hover:opacity-100 + translate-y`) — not a sliding panel
- No "table format" — clean flat horizontal card
- Details link stays at bottom-right of content area at all times
- Subtle right-edge thumbnail fade into content area background

**NoProjectsPlaceholder.jsx (complete rewrite)**
- Removed ghost-grid approach entirely
- New design: full-width `min-h-[280px/340px]` div with `border-dashed border-[var(--border-color)]` and `bg-[var(--bg-surface-2)]/35`
- Centered contents: icon (folder/search) → bold title → muted description (1-2 lines) → action button
- Icon adapts: `faMagnifyingGlass` when `hasFilters=true`, `faFolderOpen` otherwise
- Button adapts: "Clear filters" (filtered) → "View projects page" (home, no filter) → "Reload page" (projects page, no filter)
- Staggered Framer Motion entrance on each element (icon, text, button)
- Same component, same visual design for both home and projects page

---
## v2.4.7 — Project Detail Page Complete Overhaul

### Summary
Full rebuild of the project detail page experience. New layout, new interactions, realtime comments + reviews, save feature, emoji picker, reply system, and all 19 projects now have HTML content in the DB.

### Changed Files

| File | Status | Notes |
|------|--------|-------|
| `src/components/projects/ProjectDetailPage.jsx` | **Rewritten** | Full new 2-col layout, `InteractionBar`, `SidebarMetaCard`, `ShareCard` |
| `src/components/projects/ReviewSection.jsx` | **Rewritten** | Sort, edit/delete, review likes, 1000 char, direct public, realtime |
| `src/components/shared/CommentSection.jsx` | **Rewritten** | 3000 char, replies, anonymous, emoji CDN, realtime, likes, admin badge, @mentions |
| `src/components/projects/ImagePreviewModal.jsx` | **Rewritten** | Uses `yet-another-react-lightbox` — fixes mobile pinch-zoom bug |
| `src/components/projects/projects.css` | **Updated** | `.section-heading`, `.section-icon`, yarl CSS vars, emoji picker, admin border |
| `src/components/shared/ReportButton.jsx` | **Updated** | Added `compact` prop (icon-only mode) |
| `src/services/supabase.js` | **Updated** | `getComments` (sort+replies), `submitComment` (parent_id, anon), `updateComment`, `toggleCommentLike`, `getUserCommentLikes`, `getSavedStatus`, `toggleSaveProject`, `getSavedProjects`, `getProjectReviews` (sort+filter), `deleteProjectReview`, `toggleReviewLike`, `getUserReviewLikes` |
| `src/config/site.config.js` | **Updated** | version → `v2.4.7` |
| `package.json` | **Updated** | `yet-another-react-lightbox ^3.21.7` added, version `2.4.7` |
| `creator-guide/supabase-schema-v2.4.7.sql` | **New** | All DB migrations for this version |
| `creator-guide/Projects-table-2.4.7.csv` | **New** | All 19 projects with HTML `content` column populated |

### Database Changes (`supabase-schema-v2.4.7.sql`)

1. **`project_reviews`** — message limit 500→1000 chars; add `likes_count INT DEFAULT 0`, `admin_reply TEXT`, `admin_reply_at TIMESTAMPTZ`; default status `'approved'` (direct public, no admin gate)
2. **`review_likes`** — new table `(id, review_id→project_reviews, user_id, created_at, UNIQUE(review_id,user_id))`; RLS; `toggle_review_like(p_review_id, p_user_id)` RPC
3. **`comments`** — limit 1000→3000 chars; new columns `parent_id UUID→comments`, `is_anonymous BOOLEAN DEFAULT false`, `likes_count INT DEFAULT 0`, `is_hidden BOOLEAN DEFAULT false`; default status `'approved'`
4. **`comment_likes`** — new table `(id, comment_id→comments, user_id, created_at, UNIQUE(comment_id,user_id))`; RLS; `toggle_comment_like(p_comment_id, p_user_id)` RPC
5. **`saved_projects`** — new table `(id, user_id, project_id→projects, created_at, UNIQUE(user_id,project_id))`; RLS (own-only read)
6. **`update_project_review_stats()` + trigger** — auto-recalculates `projects.avg_rating` + `projects.reviews_count` after every review insert/update/delete

> **Enable Supabase Realtime** for `comments` and `project_reviews` tables:
> Dashboard → Database → Replication → Tables → enable both

### Install Step
```bash
npm install yet-another-react-lightbox
```

### ProjectDetailPage Layout

**Desktop (≥1024px) — 2 columns:**
```
Breadcrumb + Back link
ProjectCarousel (full width)
┌──────────────────────────────┬──────────────────┐
│ Title, tagline, short desc   │ Card 1 (sticky): │
│ InteractionBar               │  category badge  │
│ About (HTML prose-content)   │  avg rating      │
│ Key Features                 │  status badge    │
│ Tech Stack (click-to-search) │  action links    │
│ Notes                        │  meta info       │
│ ReviewSection                │  tags            │
│ RelatedProjectsRow           ├──────────────────┤
│ CommentSection               │ Card 2 (share)   │
└──────────────────────────────┴──────────────────┘
```

**Tablet (<1024px) — single column:**
- Card 1 renders directly after `InteractionBar`
- Share Card renders between `RelatedProjectsRow` and `CommentSection`

**Mobile — single column, compact Card 1 view**

### Key Component Behaviours

**InteractionBar:**
- Like / Dislike with Framer Motion rotation animation on click
- Save (bookmark) → `saved_projects` table → toast "✓ Saved! Find it in your profile."
- Report in compact icon-only mode (no text label)
- Views count right-aligned

**ReviewSection:**
- Avg rating display: animated stars, numeric score, click → "View all" popup
- Form: 1-5 star input + 1000-char textarea + Submit
- Post-submit: own review card with 3-dot menu (Edit / Delete)
- Inline preview: 3 other users' reviews shown; "View all N" button for full list
- Popup: star distribution bars are clickable filters (e.g. "★ 5 only")
- Sort options in popup: Latest / Oldest / Top (by `likes_count`)
- Review likes: heart button per card, any logged-in user can like
- Realtime: Supabase channel `reviews:{projectId}` on `project_reviews`

**CommentSection:**
- 3000-char textarea — counter appears when 100 chars remain (yellow), red at 30, shows `−N/3000` when over limit; submit disabled over limit
- Emoji picker: loaded lazily from jsDelivr CDN (`emoji-mart@5`), no npm dep needed
- Anonymous toggle: posts with default icon + "Anonymous" label; no profile link on avatar
- Reply: click Reply → `@username` prefilled in input; reply stored with `parent_id`; reply-to-reply also uses root `parent_id`, prefixes `@username`
- @mentions parsed as clickable links; `@admin/@turzo/@muhtasim` → `/@admin`
- Admin comments: blue `ADMIN` shield badge + left accent-border style
- Comment likes: heart button per comment, `toggle_comment_like()` RPC
- Sort: Latest / Oldest / Top (by `likes_count`) — reloads from DB on sort change
- 3-dot menu: comment owner → Edit + Delete; others → Report
- Realtime: Supabase channel `comments:{contentId}` on `comments`

**ImagePreviewModal:**
- Library: `yet-another-react-lightbox` with Zoom + Thumbnails + Counter plugins
- Mobile pinch-to-zoom handled natively — no more full-page zoom bug
- Double-tap to zoom on touch devices
- Thumbnail strip at bottom; counter top-left; backdrop `rgba(2,6,23,0.96)`

**SidebarMetaCard:**
- Category badge(s) with `CAT_COLORS` map (same as `ProjectCard.jsx`)
- Avg rating block: click → smooth scroll to `ReviewSection`
- Action links: Live Preview (primary), GitHub, PDF, Custom Link — hover shows `title={href}` tooltip
- Meta rows: Views, Published, Timeline, Version, Platform, Team, Role, Institution, Client
- Feature flags: PWA / Dark Mode / Responsive badges
- Tags: clickable → `/projects?q={tag}`

**ShareCard:**
- Desktop: 3×2 icon grid + copy field + optional native share button
- Tablet (compact): 6 icons in one row + copy field left + share button right in same row

### SEO Updates
- `og:image` uses `project.thumbnail_url` per-project (not global fallback) → correct preview image when URL is shared on social media
- Canonical URL: `/project/:slug`
- `seo_keywords` meta tag now rendered

### Projects CSV — HTML Content
`Projects-table-2.4.7.csv` — all 19 project rows have the `content` column populated with semantic HTML (`<h2>`, `<p>`, `<ul>`, `<pre><code>` etc.) rendered via `.prose-content` CSS class in `ProjectDetailPage`. Import to Supabase to replace existing rows, or run individual `UPDATE` statements per slug.

### Component Structure (post v2.4.7)
```
src/
├── components/
│   ├── about/          (unchanged)
│   ├── home/           (unchanged)
│   ├── layout/         (unchanged)
│   ├── projects/
│   │   ├── ImagePreviewModal.jsx   ← yet-another-react-lightbox
│   │   ├── ProjectCard.jsx         (unchanged)
│   │   ├── ProjectCarousel.jsx     (unchanged)
│   │   ├── ProjectDetailPage.jsx   ← full rewrite
│   │   ├── ProjectsPage.jsx        (unchanged)
│   │   ├── RelatedProjectsRow.jsx  (unchanged)
│   │   ├── ReviewSection.jsx       ← full rewrite
│   │   └── projects.css            ← updated
│   ├── shared/
│   │   ├── AdminQuickActions.jsx   (unchanged)
│   │   ├── Breadcrumb.jsx          (unchanged)
│   │   ├── CommentSection.jsx      ← full rewrite
│   │   ├── LikeDislike.jsx         (unchanged — still used elsewhere)
│   │   ├── ReportButton.jsx        ← compact prop added
│   │   ├── ShareButtons.jsx        (unchanged)
│   │   ├── SiteCTA.jsx             (unchanged)
│   │   └── VisibilityGuard.jsx     (unchanged)
│   └── ui/             (unchanged)
├── services/
│   └── supabase.js     ← updated
├── config/
│   └── site.config.js  ← version bump
└── main.jsx            ← no CSS imports needed here for yarl
```

---

## v2.4.8 — Website Polish, Error Isolation, About Data to Supabase, Skeleton Pages

### Summary
Full website polish pass. Navbar/footer alignment fixed across all devices, floating navbar properly offset by DevBanner height, mega nav closes on outside click, profile skeleton on auth loading, GitHub section errors isolated per-card, `aboutData.js` deleted (data now from Supabase), unused files removed, home section files renamed to match section names, per-page skeleton loading screens added, theme system redesigned (light default, localhost→dark, Supabase-managed default), authStore caches profile in localStorage for instant navbar display.

### Changes

#### 1. Navbar & Footer — Alignment Fix
- `Navbar.jsx` / `Footer.jsx`: both now use identical `padding-inline: clamp(1rem, 4vw, 1.75rem)` inside a `max-width: 1120px` container
- Footer outer wrapper no longer has its own `padding: 0 1.75rem` (was causing double-padding misalignment)
- Removed `@media (min-width: 1440px) { padding-inline: 0 }` from navbar-inner (was pushing content to edge at wide screens)

#### 2. Floating Navbar — DevBanner Position Fix
- `Navbar.jsx`: Added `devBannerH` state tracked via `ResizeObserver` on `.dev-banner`
- Floating navbar `top` is now `devBannerH` (px) instead of hardcoded `top-0`
- Mega menu `megaTopOffset` accounts for DevBanner height on both fixed and floating navbars:
  - Floating: `devBannerH + 64px` (banner + pt-3 + nav height)
  - Fixed: `calc(${devBannerH}px + var(--navbar-h))`

#### 3. Mega Nav — Outside Click Close
- Removed scroll-based close (`scroll` listener that called `setMegaOpen(false)`)
- Backdrop div now spans from `megaTopOffset` to bottom of screen (not `inset-0`) so it doesn't block navbar interactions
- Clicking anywhere outside the mega menu closes it reliably on all scroll positions

#### 4. Auth Loading — Profile Skeleton
- All auth-loading states now show a skeleton instead of nothing:
  - Desktop/tablet: `w-20 h-8 rounded-full sk` pill skeleton while loading
  - Mobile: `w-8 h-8 rounded-full sk` circle skeleton while loading
  - Applied consistently in both top navbar and floating navbar
- After loading: shows Sign In button if logged out, profile avatar if logged in

#### 5. Auth — localStorage Profile Cache
- `authStore.js`: profile + avatar cached in `localStorage` under key `auth_profile_cache` (24h TTL)
- Store pre-loads cache on init → navbar shows correct avatar instantly on reload (no flash)
- Cache cleared on logout. `setProfile()` writes cache; `clearAuth()` clears it.

#### 6. GitHub Section — Error Isolation
- `GithubActivity.jsx` (renamed from `GithubStats.jsx`):
  - On API error: compact `gh-error-card` placeholder shown inside section (not blank section)
  - Streak and Profile Grade images have `onError` fallback divs (`.gh-img-fallback`) — individual image failures show a placeholder, not a broken image
  - Section heading, footer link always visible regardless of data state

#### 7. aboutData.js → Supabase
- **Deleted**: `src/components/about/aboutData.js`
- Animation variants (`fadeUp`, `stagger`, `slideL`, `slideR`) inlined into each component that used them
- Data constants (`GOALS`, `VALUES`, `HOBBIES`) inlined with exact same data
- **New Supabase tables** (see `supabase-schema-v2.4.8.sql`):
  - `about_goals` — short/mid/long term goals with progress bars
  - `about_values` — personal values + hobbies chips
  - `about_timeline` — education history
  - `about_skills` — dev/design/video/tools skills
  - `about_languages` — language proficiency
  - `about_connect` — social links / contact
- **New Supabase helpers** in `supabase.js`: `getAboutGoals`, `getAboutValues`, `getAboutTimeline`, `getAboutSkills`, `getAboutLanguages`, `getAboutConnect`
- All tables: public SELECT, admin-only INSERT/UPDATE/DELETE (RLS)

#### 8. Home Section File Renames
Renamed to match actual section headings:
- `AboutMini.jsx` → `AboutSection.jsx` (section id: `about-mini`, heading: "Self-taught developer…")
- `Process.jsx` → `WorkflowSetup.jsx` (section id: `setup`, heading: "My Setup & Workflow")
- `Testimonials.jsx` → `Reviews.jsx` (section id: `reviews`, heading: "Reviews")
- `GithubStats.jsx` → `GithubActivity.jsx` (section id: `github`, heading: "GitHub Activity")
- `Home.jsx` imports updated accordingly

#### 9. Unused Files Removed
- `src/services/worker.js` — Cloudflare Worker proxy service, never imported by any component/page (workerURL still in site.config.js for future use)
- `src/components/about/aboutData.js` — replaced by Supabase tables

#### 10. Per-Page Skeleton Loading
New `src/components/skeletons/` directory with per-page skeletons:
- `HomeSkeleton.jsx` — matches Hero + sections layout
- `AboutSkeleton.jsx` — matches About hero + story + timeline + skills
- `ProjectsSkeleton.jsx` — matches banner + controls + card grid
- `ProjectDetailSkeleton.jsx` — matches 2-col detail + sticky sidebar
- `App.jsx` updated: `RouteBoundary` now selects skeleton by `layout` prop:
  - `'hero'` → `HomeSkeleton`, `'profile'` → `AboutSkeleton`, `'grid'` → `ProjectsSkeleton`, `'detail'` → `ProjectDetailSkeleton`, others → `PageSkeleton` (generic)

#### 11. Theme System Redesign
- `themeStore.js` completely rewritten:
  - **Default theme: `light`** (was `dark`)
  - Priority: `localStorage` (user choice) → URL check → Supabase default
  - **Dev shortcut**: if `hostname === 'localhost'` or `127.0.0.1` and no localStorage pref → `dark`
  - `setDefaultTheme(theme)` — called by `useSiteSettings` after fetching Supabase value; only applies if user has no saved pref and not on localhost
- `site_settings` table: new `default_theme` key (default: `"light"`)
- `useSiteSettings.js` updated: reads `default_theme` and calls `setDefaultTheme()`


### File Structure (v2.4.8)
```
src/
├── App.jsx
├── index.css
├── main.jsx
├── components/
│   ├── about/
│   │   ├── AboutConnect.jsx
│   │   ├── AboutGoals.jsx
│   │   ├── AboutHero.jsx
│   │   ├── AboutLanguages.jsx
│   │   ├── AboutSkills.jsx
│   │   ├── AboutStory.jsx
│   │   ├── AboutTimeline.jsx
│   │   └── AboutValues.jsx
│   ├── home/
│   │   ├── AboutSection.jsx     ← renamed (was AboutMini.jsx)
│   │   ├── GithubActivity.jsx   ← renamed (was GithubStats.jsx)
│   │   ├── Hero.jsx
│   │   ├── RecentProjects.jsx
│   │   ├── Reviews.jsx          ← renamed (was Testimonials.jsx)
│   │   ├── Services.jsx
│   │   ├── Skills.jsx
│   │   ├── WorkflowSetup.jsx    ← renamed (was Process.jsx)
│   │   └── home.css
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── projects/
│   │   ├── ImagePreviewModal.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectCarousel.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── RelatedProjectsRow.jsx
│   │   ├── ReviewSection.jsx
│   │   └── projects.css
│   ├── shared/
│   │   ├── AdminQuickActions.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── CommentSection.jsx
│   │   ├── LikeDislike.jsx
│   │   ├── ReportButton.jsx
│   │   ├── ShareButtons.jsx
│   │   ├── SiteCTA.jsx
│   │   ├── VisibilityGuard.jsx
│   │   └── ui/
│   │       └── NoProjectsPlaceholder.jsx
│   ├── skeletons/               ← NEW directory
│   │   ├── AboutSkeleton.jsx    ← NEW
│   │   ├── HomeSkeleton.jsx     ← NEW
│   │   ├── ProjectDetailSkeleton.jsx ← NEW
│   │   └── ProjectsSkeleton.jsx ← NEW
│   └── ui/
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── CookieBanner.jsx
│       ├── DevBanner.jsx
│       ├── ErrorBoundary.jsx
│       ├── Modal.jsx
│       ├── PageProgress.jsx
│       ├── Ripple.jsx
│       ├── SectionReveal.jsx
│       ├── Skeleton.jsx
│       └── ToastContainer.jsx
├── config/
│   ├── firebase.config.js
│   ├── site.config.js
│   └── supabase.config.js
├── hooks/
│   ├── useAdmin.js
│   ├── useAuth.js
│   ├── useNotifications.js
│   ├── usePageVisibility.js
│   └── useSiteSettings.js
├── pages/
│   ├── About.jsx
│   ├── Admin.jsx
│   ├── AuthAction.jsx
│   ├── BlogDetail.jsx
│   ├── Blogs.jsx
│   ├── Contact.jsx
│   ├── CookiesPolicy.jsx
│   ├── Feed.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── PostDetail.jsx
│   ├── Posts.jsx
│   ├── PrivacyPolicy.jsx
│   ├── Profile.jsx
│   ├── ProjectDetail.jsx
│   ├── Projects.jsx
│   ├── PublicProfile.jsx
│   └── Signup.jsx
├── services/
│   ├── analytics.js
│   ├── firebase.js
│   ├── projectSearch.js
│   └── supabase.js              ← +getAboutGoals/Values/Timeline/Skills/Languages/Connect
├── store/
│   ├── authStore.js             ← +localStorage profile cache
│   ├── notificationStore.js
│   ├── searchStore.js
│   ├── themeStore.js            ← redesigned (light default, URL check, Supabase default)
│   └── toastStore.js
└── utils/
    ├── deviceInfo.js
    ├── formatters.js
    ├── seo.js
    └── validators.js

creator-guide/
├── CONTEXT.md                   ← this file
├── supabase-schema-v2.0.0.sql
├── supabase-schema-v2.4.7.sql
└── supabase-schema-v2.4.8.sql   ← NEW: about_* tables + default_theme
```

---

## v2.5.0 — Feed System: Unified Blogs + Posts (2026-06-06)

### Summary
Built the complete unified Feed system combining Blogs and Posts into one experience. Per master prompt user edit: "blogs and posts এর সব features combine করে `Feed` name এ single system বানাবা". `/blogs` and `/posts` now redirect to `/feed?type=blog` and `/feed?type=post` respectively. Blog detail has reading progress bar + table of contents. Post detail has video embed support.

### New Files
| File | Description |
|------|-------------|
| `src/components/feed/feed.css` | All feed/blog/post styles |
| `src/components/feed/FeedPage.jsx` | Unified feed list (blogs + posts) |
| `src/components/feed/FeedCard.jsx` | Unified card (grid + list views) |
| `src/components/feed/BlogDetailPage.jsx` | Full blog article with TOC + reading progress |
| `src/components/feed/PostDetailPage.jsx` | Video embed post detail |
| `src/components/feed/ReadingProgress.jsx` | Thin reading % progress bar |
| `src/components/feed/TableOfContents.jsx` | Desktop sidebar + mobile accordion TOC |
| `src/components/skeletons/FeedSkeleton.jsx` | Feed list + blog detail + post detail skeletons |
| `creator-guide/supabase-schema-v2.5.0.sql` | blogs, posts, feed_saved tables + RLS |

### Modified Files
| File | Change |
|------|--------|
| `src/pages/Feed.jsx` | Now renders FeedPage component |
| `src/pages/Blogs.jsx` | Redirects to `/feed?type=blog` |
| `src/pages/Posts.jsx` | Redirects to `/feed?type=post` |
| `src/pages/BlogDetail.jsx` | Now renders BlogDetailPage component |
| `src/pages/PostDetail.jsx` | Now renders PostDetailPage component |
| `src/services/supabase.js` | +getPublishedBlogs, getBlogBySlug, getBlogCategories, getRelatedBlogs, incrementBlogViews, getPublishedPosts, getPostBySlug, getPostCategories, getRelatedPosts, incrementPostViews, getFeedSavedStatus, toggleFeedSaved |
| `src/App.jsx` | +FeedSkeleton/BlogDetailSkeleton/PostDetailSkeleton imports; routes `/blogs/:slug` → 'blog-detail', `/posts/:slug` → 'post-detail' |
| `src/config/site.config.js` | version → 'v2.5.0' |

### Database Changes (supabase-schema-v2.5.0.sql)
- **`blogs`** table — full blog articles with TipTap HTML content, pinned flag, reading_time, cover_image_url, series, RLS (public read published/public, admin full)
- **`posts`** table — video embed posts (YouTube/Facebook/other), platform field, RLS same as blogs
- **`feed_saved`** table — user bookmarks for blogs and posts (own-access RLS)
- **Functions**: `increment_blog_views(blog_id)`, `increment_post_views(post_id)` — atomic view counters via RPC
- **page_visibility**: added `feed`, `blogs`, `posts` rows (if not exists)

### Architecture Decisions
- **Feed = unified**: `/feed` shows all content with type-filter tabs (All / Blogs / Posts). Pinned blogs appear at top when no search active.
- **`/blogs` + `/posts` redirect** to `/feed?type=blog` and `/feed?type=post` (URL still works for direct links, just redirects)
- **Blog detail**: reading progress bar watches scroll position on `articleRef` div. TOC extracts H1–H4 headings from rendered HTML, assigns IDs if missing, tracks active via IntersectionObserver. Desktop = sticky sidebar, mobile = collapsible accordion above article.
- **Post detail**: `toEmbedUrl()` converts raw YouTube/Facebook/other URLs to proper embed URLs. YouTube thumbnail auto-derived from `ytId` if no explicit `thumbnail_url`.
- **Interactions**: Like/Dislike, Save (feed_saved), Share (5 platforms + copy), Report all on both blog + post detail.
- **Content**: Blog body rendered via `dangerouslySetInnerHTML` with `.blog-prose` CSS class (full typography system in feed.css).
- **Views**: Incremented via Supabase RPC functions (atomic, fire-and-forget) on page load.
- **Related content**: same category first, falls back to tag overlap, max 3.
- **Skeletons**: `FeedSkeleton` (list page), `BlogDetailSkeleton`, `PostDetailSkeleton` — all exported from `FeedSkeleton.jsx`. App.jsx switch: `'list'→FeedSkeleton`, `'blog-detail'→BlogDetailSkeleton`, `'post-detail'→PostDetailSkeleton`.
- **comment limit per user**: 10/day per master prompt small edit (enforced in CommentSection — already built in v2.4.7).

### Feed Page Features
- Type tabs: All / Blogs / Posts with counts
- Category filter pills (fetched from Supabase, merged across types for "All")
- Search with 300ms debounce — searches title, description, category, tags
- Sort: Newest / Oldest / Popular (by views)
- Grid / List toggle
- Pinned blogs always at top (when no active search)
- Empty state + error state

### Blog Detail Features
- Reading progress bar (fixed, below navbar, gradient green→blue)
- Table of Contents: auto-extracted from H1–H4, active heading tracked via IntersectionObserver
  - Desktop: sticky sidebar card (right column, 260px)
  - Mobile: collapsible accordion above content
- Article info sidebar card (category, read time, views, date, tags)
- Full prose CSS: headings, blockquotes, code blocks, tables, images
- Interaction bar: views, like/dislike, save, share, report
- Related blogs (same category → tag overlap fallback)
- SEO: per-blog og:image, og:title, JSON-LD Article schema

### Post Detail Features
- Video embed: YouTube auto-embed conversion, Facebook plugin, generic iframe
- Platform badge (YouTube red / Facebook blue / custom)
- YouTube thumbnail auto-derived from embed URL
- Full interactions: like/dislike, save, share, report
- Related posts grid
- SEO per-post

### Notes
- `feed_saved` replaces project `saved_projects` pattern for feed items — both tables can coexist
- Blog `content` is TipTap HTML — admin panel (v2.10.0) will use TipTap editor to create/edit
- `reading_time` should be auto-calculated on save: `ceil(word_count / 200)` — admin panel will handle this

### File Structure (v2.5.0 additions)
```
src/
├── components/
│   ├── feed/                    ← NEW directory
│   │   ├── feed.css
│   │   ├── FeedPage.jsx
│   │   ├── FeedCard.jsx
│   │   ├── BlogDetailPage.jsx
│   │   ├── PostDetailPage.jsx
│   │   ├── ReadingProgress.jsx
│   │   └── TableOfContents.jsx
│   └── skeletons/
│       └── FeedSkeleton.jsx     ← NEW (exports default + BlogDetailSkeleton + PostDetailSkeleton)
├── pages/
│   ├── Feed.jsx                 ← REBUILT
│   ├── Blogs.jsx                ← REBUILT (redirects)
│   ├── Posts.jsx                ← REBUILT (redirects)
│   ├── BlogDetail.jsx           ← REBUILT
│   └── PostDetail.jsx           ← REBUILT
└── services/
    └── supabase.js              ← +12 new functions for blogs/posts/feed_saved

creator-guide/
└── supabase-schema-v2.5.0.sql  ← NEW: blogs, posts, feed_saved
```

---

## v2.5.1 — Feed System Full Rebuild (2026-06-07)

### Summary
Complete rebuild of the Feed section. Previous v2.5.0 design was rejected — poor design, layout issues, post slug page missing/untestable. Rebuilt with Facebook/LinkedIn-inspired design. FeedPage now has 2-column layout (main + sticky sidebar). Separate BlogCard (LinkedIn article style) and PostCard (Facebook social post style). PostDetailPage is Facebook-style 2-col: media viewer left + info+comments right. BlogDetailPage has cleaner editorial layout. Posts now support multiple images/videos via `media_items` JSONB.

### Reason for Rebuild
- Feed design/layout was poor — redesigned with LinkedIn/Facebook inspiration
- Blog detail layout was not good — improved editorial style
- Post detail did not exist (no sample data) — added Facebook-style layout + 5 sample posts
- `FeedCard.jsx` was a single component trying to do too much — split into `BlogCard` + `PostCard`
- Posts lacked `content` (body text) and `media_items` (multiple image/video support)

### New Files
| File | Description |
|------|-------------|
| `src/components/feed/BlogCard.jsx` | LinkedIn-style article card |
| `src/components/feed/PostCard.jsx` | Facebook-style social post card with media grid + actions |
| `src/components/feed/MediaGrid.jsx` | Facebook-style image/video grid (1→full, 2→50/50, 3→large+2, 4+→2×2+overlay) |
| `creator-guide/supabase-schema-v2.5.1.sql` | ALTER posts (content, media_items) + 2 blogs + 5 sample posts |

### Rebuilt Files
| File | Changes |
|------|---------|
| `src/components/feed/feed.css` | Complete rewrite — new post card, blog card, media grid, FB-style post detail, sidebar |
| `src/components/feed/FeedPage.jsx` | 2-col layout (feed main + sticky sidebar). Sidebar: about card, tags, quick links. Inline skeletons for both card types. |
| `src/components/feed/BlogDetailPage.jsx` | Cleaner editorial layout: hero image with overlay, header card, inline meta, TOC, interaction bar, related articles |
| `src/components/feed/PostDetailPage.jsx` | Facebook-style: media panel (left, sticky) + info+comments (right, scrollable). Nav arrows + dot indicators for multi-media. |

### Modified Files
| File | Change |
|------|--------|
| `src/services/supabase.js` | getPublishedPosts now fetches `content` + `media_items`; related posts also fetches `media_items` |
| `src/config/site.config.js` | version → 'v2.5.1' |

### Database Changes (supabase-schema-v2.5.1.sql)
- `ALTER TABLE posts ADD COLUMN content TEXT` — full post body text
- `ALTER TABLE posts ADD COLUMN media_items JSONB DEFAULT '[]'` — array of media objects
- `media_items` schema: `[{type: 'image'|'video'|'youtube', url: string, thumbnail?: string, caption?: string}]`
- 2 sample blogs: welcome post (pinned) + portfolio v2 breakdown
- 5 sample posts: coding setup (3 imgs), React journey (2 imgs), CSS tutorial (YouTube), Bangladesh nature (4 imgs), JS async tutorial (YouTube)
- All Unsplash/YouTube URLs used for demo images/videos (user to replace later)

### FeedPage Design (LinkedIn/Facebook hybrid)
- **Layout**: 2-column (flex): main feed (flex-1) + sidebar (300px, hidden below 1100px)
- **Sidebar cards**: Author/about card (with cover gradient + avatar overlap), Tags, Quick links
- **Filter bar**: Pill tabs — All / Blogs / Posts with live counts
- **Controls**: Search (debounced 280ms) + Sort dropdown (newest/oldest/popular)
- **Skeletons**: `BlogCardSk` + `PostCardSk` inline — alternating when type=all

### BlogCard Design (LinkedIn article style)
- Full-width thumbnail (16:7 ratio)
- Eyebrow: type badge + pinned badge + category
- Title (2-line clamp), description (2-line clamp)
- Tags row (up to 4)
- Footer: date left + stats right (reading time, views, likes, comments)
- Hover: lift + accent border glow

### PostCard Design (Facebook style)
- Header: avatar (gradient initials, logo overlay) + author name + meta (role · time ago · globe)
- Text content with "See more/less" truncation at 240 chars
- Media grid (MediaGrid component) — full-width, no padding around it
- Reaction stats row: emoji group + likes count + comments count
- Action row: Like / Comment / Share buttons (3-col grid)
- Clicking any part → navigate to post detail

### MediaGrid (Facebook-style)
- 1 item: full width, 16:9 aspect ratio
- 2 items: 50/50 side-by-side, square aspect
- 3 items: large left (full height) + 2 stacked right
- 4+ items: 2×2 grid, last cell has dark overlay "+N"
- Video items show play button overlay + YouTube badge
- Click → navigate to post detail with `state: { mediaIndex: i }`

### PostDetailPage (Facebook-style)
- **Desktop layout**: 2-col grid — media panel (left, sticky full-height) + info panel (right, scrollable)
- **Mobile layout**: stacked (media top, info below)
- **Media panel**: Full-screen media viewer, AnimatePresence fade between items, arrow nav (keyboard ←→ supported), dot indicators
- **Video items**: thumbnail + play button. Click → embed YouTube/Facebook iframe with `autoplay=1`
- **Info panel sections**: breadcrumb → author → post content → interaction bar → comments → related posts
- **Interaction bar**: views, like/dislike (optimistic), save (feed_saved), report, share (4 platforms + copy)
- **buildMediaList()**: merges `media_items` array with legacy `embed_url` for backward compatibility

### BlogDetailPage Design (editorial)
- Hero image: 21:9 ratio with dark gradient overlay at bottom
- Motion-animated header card: badges, title, description, meta (date, read time, views)
- Mobile TOC: collapsible accordion above content
- 2-col layout: prose (main) + sticky sidebar (TOC card + meta card)
- Interaction bar: views · like/dislike · save · 5 share buttons · report
- Related articles: card grid (3 cols), category→tag fallback

### Architecture Notes
- `FeedCard.jsx` is now unused — kept in place but superseded by BlogCard/PostCard
- `ReadingProgress.jsx` and `TableOfContents.jsx` are now inlined directly in BlogDetailPage for simpler dependency
- PostCard does NOT fetch live like/save state (performance) — that happens in PostDetailPage on navigation
- `compact` prop on CommentSection in PostDetailPage — allows condensed comment list in sidebar panel

### Sample Data Notes
- All images: Unsplash (free to use, stable URLs with `?w=900&q=85`)
- All videos: YouTube (free public tutorials)
- User should replace with own content via admin panel (v2.10.0)
EOF
echo "CONTEXT.md updated"
---

## v2.5.2 — Feed & Post System Overhaul

### Released: 2026-06-08
### Commit: feat(v2.5.2): feed overhaul, post improvements, shared image preview, view dedup, SQL rebuild

---

### Changes Overview
Complete overhaul of the Feed, Blog, and Post systems. Rebuild of shared components
(ImagePreviewModal, Carousel). Smart view deduplication. Full SQL schema rebuild.
Navbar transparency fix. .creator folder reorganization.

---

### Navbar Changes
- `isHomePage` now only includes `/` and `/home` — About page gets the same solid bg/rounded style as all other pages
- Reading progress bar position is now dynamically computed via JS (detects actual floating navbar bottom position)
- Progress bar rendered as a full inline JSX element with dynamic `top` value — no longer using a fixed CSS class

---

### FeedPage (complete rewrite)
**Header:**
- Matches ProjectsPage header style: gradient title, eyebrow label, content count subtitle
- Type pills (All / Blogs / Posts) moved into the header area (right side)
- No more separate filter tab bar row

**Search & Filters:**
- Search input now full-width (not capped at 340px)
- URL-connected search: `?q=...&type=...&sort=...` in URL, synced on mount
- Advanced scoring engine: title (+10), description (+5), category (+4), tags (+3), content (+1)
- Active query indicator bar with result count and clear button
- Sort options: Newest, Oldest, Most Viewed, Trending

**Right Sidebar:**
- `AuthorCard`: reads from `SITE_CONFIG.owner` — shows real owner profile, cover gradient, social icons, View Profile button
- `TagCloud`: real tags extracted from all blogs+posts. 4-row default view (5 tags/row ≈ 20 tags), show more/less button, max 10 rows (~50 tags), scrollable. All badges clickable → set search query
- Quick-links nav section REMOVED — replaced with useful content

**Feed main:**
- `BlogCard` and `PostCard` both receive `onTagClick` callback
- Pinned blogs shown first when not searching

---

### BlogCard (v2.5.2)
- No thumbnail rendered if no `thumbnail_url` AND no first image found in `content`
- `extractFirstImage(html)` pulls first `<img src>` from TipTap HTML as fallback thumbnail
- All tags and category are `<button>` elements — `onClick` calls `onTagClick(tag)` prop
- Relative time display via `timeAgo()` instead of fixed `fmtDate()`

---

### BlogDetailPage (v2.5.2)
**Reading progress bar:**
- Rendered as a full React component `<ReadingProgress articleRef={...} />`
- Dynamically detects `.float-nav` bottom or navbar height at runtime
- Bar spans `min(100vw - 2rem, 1120px)` centered, exactly matches the content width
- Renders only when `pct > 0`

**TOC sidebar redesign:**
- Cleaner header with icon + section count
- `max-height: calc(100vh - navbar - 4rem)` with internal scroll
- Level 1-4 heading indentation and size hierarchy
- Active heading: left border accent + background tint

**Right sidebar layout:**
- Column order: TOC Card → Blog Info Card → Share Panel
- **No share section** in left column
- Blog Info Card: category (clickable), read time, views, relative published date, tags (clickable)
- Share Panel: X/Twitter, Facebook, LinkedIn, WhatsApp, Telegram, Copy link

**Tags:** All tags and category badges are `<button>` elements → `navigate(/feed?q=tag&type=blog)`

**OG meta image:** `blog.thumbnail_url || extractFirstImageFromContent(blog.content) || defaultOGImage`

**Image preview in prose:** after render, `querySelectorAll('.blog-prose img')` → adds `cursor:zoom-in` + click opens `ImagePreviewModal` with full image list

---

### PostCard (v2.5.2 — complete rewrite)
**Click behavior:**
- Header profile image + name → `/about` (admin redirect)
- Rest of header → `navigate(/posts/slug)`
- Card body NOT a clickable anchor — only explicit action buttons navigate

**Three-dot menu:** Copy link, Report post

**Text content:**
- Renders markdown via `renderMarkdown(text)`: bold, italic, underline, inline code, headings (h1–h3), links
- 4-line clamp with "See more" / "See less" button (text style, not button style)
- Line count computed from character count (not DOM measurement)

**Image grid (Facebook-style):**
- 1 image: full width, 1:1 aspect ratio, max-height 400px
- 2 images: side-by-side grid
- 3 images: large left + 2 stacked right
- 4+: 2×2 with dark overlay showing count (`+N`)
- All images: `cursor:zoom-in` → opens shared `ImagePreviewModal`

**Video:**
- `PostVideoEmbed` component: shows thumbnail + play button, click → replaces with iframe (autoplay)
- If post has video, images are NOT shown (video takes priority)
- YouTube badge shown on YouTube videos

**Reactions:**
- Like button: 0.5s hover → reaction picker (👍❤️😂😮😢😠) slides up with animation
- Selected reaction shown as emoji with primary color label
- Reaction picker closes on selection or mouse leave (400ms debounce)

**Tags:** clickable → calls `onTagClick(tag)` prop

---

### PostDetailPage (v2.5.2 — complete rewrite)
**Layout:** Single-column, max-width 720px (no sidebar)

**Media section:**
- Video (if any): `VideoViewer` component with thumbnail+play → iframe, full width, 16:9
- Images (if no video): `Carousel` component (shared) — multiple images get swipeable carousel with thumbnails
- Media shown at top before content

**Header card:**
- Profile avatar + name (clickable) + location + relative time + view count
- Below media section

**Content:**
- Full markdown rendering via `renderMarkdown()` — proper h1/h2/h3 styles, bold, italic, underline, inline code, links
- `<p>` tags with proper spacing

**Interaction bar:**
- Like/dislike (optimistic, requires login), save, share buttons, report
- Stats row above buttons: views, relative time
- Share: 5 platform buttons (icon only) + copy link

**Tags:** clickable → `navigate(/feed?q=tag&type=post)`

---

### Shared Components (new in v2.5.2)

**`/src/components/shared/ImagePreviewModal.jsx`** (full rebuild):
- Portal-rendered (appended to `document.body`)
- Mouse drag to pan when zoomed
- Pinch-to-zoom on mobile (touch events)
- Double-tap to toggle zoom (1x ↔ 2.5x)
- Scroll wheel zoom
- Keyboard: Escape close, ←→ navigate, +/- zoom
- Swipe left/right to navigate (when not zoomed)
- Thumbnail strip at bottom (hidden if single image)
- Top bar: counter, zoom controls (−/+/reset), close button
- `AnimatePresence` slide transitions between images
- Replaces old `/src/components/projects/ImagePreviewModal.jsx`
- Now used by: ProjectDetailPage, BlogDetailPage, PostCard, PostDetailPage

**`/src/components/shared/Carousel.jsx`** (new):
- For blog/post detail pages with multiple images
- Swipe + keyboard navigation
- Animated slide transitions (AnimatePresence)
- Dot indicators + prev/next buttons
- 1/N counter badge top-left, expand icon top-right
- Thumbnail strip below (collapsed if single image)
- Click any image → opens `ImagePreviewModal` in fullscreen
- Used by: PostDetailPage (images section)

---

### View Deduplication (v2.5.2)
`shouldTrackView(contentType, contentId, userId)` in `supabase.js`:
- Logged-in user: tracked by Firebase UID
- Guest: tracked by device fingerprint (`getDeviceFingerprint()` — hashed userAgent + screen + timezone + language)
- Storage: `localStorage` key `view_<type>_<id>` → `{viewers: {id: timestamp}, ts}`
- Cooldown: 3 days (72 hours) before re-counting same viewer
- Old entries pruned on each access
- Applied to: `incrementProjectViews`, `incrementBlogViews`, `incrementPostViews`

---

### SQL Schema (v2.5.2 — full rebuild)
File: `.creator/supabase/v2.5/supabase-schema-v2.5.2.sql`

**Dropped and recreated:** All non-projects tables.

**Tables:**
| Table | Purpose |
|-------|---------|
| `users` | Firebase UID as PK, profile, social links, visibility |
| `usernames` | Username → user_id mapping |
| `admins` | Admin email + user_id list |
| `blogs` | Published articles with TipTap HTML content |
| `posts` | Social posts with media_items JSONB array |
| `comments` | Threaded comments for projects/blogs/posts |
| `comment_likes` | Per-comment like tracking |
| `likes` | Like/dislike for all content types |
| `feed_saved` | Saved blogs/posts per user |
| `saved_projects` | Saved projects per user |
| `reports` | User-submitted content reports |
| `reviews` | Portfolio reviews (one per user) |
| `messages` | Contact form submissions |
| `badges` | Badge definitions |
| `user_badges` | Badge assignments |
| `notifications` | Site-wide announcements |
| `notification_reads` | Per-user read tracking |
| `activity_logs` | Admin audit trail |
| `site_settings` | Key-value site config |
| `page_visibility` | Per-page visibility control |
| `spam_tracking` | Rate-limit tracking |
| `analytics` | Page/event analytics |

**RPC functions:** `is_admin()`, `increment_project_views()`, `increment_blog_views()`, `increment_post_views()`

**Sample data:** 2 advanced blogs (RLS guide, React performance patterns) + 2 posts (dark mode tips, Supabase vs Firebase)

---

### Firebase Auth vs Supabase Auth Analysis

**Current setup:** Firebase Auth (authentication) + Supabase (database)

**Firebase Auth strengths:**
- Battle-tested OAuth (Google, GitHub work perfectly)
- Firebase UID used as Supabase foreign key (already working)
- No migration risk (everything works now)

**Supabase Auth strengths:**
- Native `auth.uid()` works directly in RLS policies (no custom `is_admin()` workaround needed)
- No dual-SDK complexity in the frontend
- PostgreSQL-native foreign keys from `auth.users` to all tables
- Better integration with Supabase Realtime

**Recommendation:** Keep Firebase Auth for now. Both free tiers are sufficient for portfolio scale. The current Firebase UID → Supabase FK pattern works well. Consider full migration to Supabase Auth in v3.0 when admin panel is built — it will simplify the RLS architecture significantly.

---

### .creator Folder Structure (v2.5.2)
```
.creator/
├── CONTEXT.md
├── cloudflare-worker-v2.0.0.js
├── firebase-rtdb-rules-v2.0.0.json
└── supabase/
    ├── v2.0/
    │   └── supabase-schema-v2.0.0.sql
    ├── v2.4/
    │   ├── supabase-schema-v2.4.0.sql ... v2.4.8.sql
    │   └── Projects-table-*.csv
    └── v2.5/
        ├── supabase-schema-v2.5.0.sql
        ├── supabase-schema-v2.5.1.sql
        └── supabase-schema-v2.5.2.sql (CURRENT)
```

---

### CSV: Demo Data Files
- `blogs-demo-v2.5.2.csv` — 2 advanced blog entries (in `.creator/supabase/v2.5/`)
- `posts-demo-v2.5.2.csv` — 2 post entries with media_items JSON (in `.creator/supabase/v2.5/`)

