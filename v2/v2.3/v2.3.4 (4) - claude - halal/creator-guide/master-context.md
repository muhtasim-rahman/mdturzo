
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

>  v2.3.3 er jonno mot 4ta genaration cilo jr ektate error thakay baki 3 ta github e push kora hoiche. ei 3ta copy er moddhe copy 2 ta bashi valo, ti setake base kore baki 2ta copy theke kichu valo section gula ekn e replace kora hoiche. kontar sathe konta replace kora hoiche seta git commit e dewa thakbe. echaraw nije theke samanno koyekta edit korchei.boetomane `hero` r `story` section bade baki sobgula motamuti stable
---

## v2.3.4 — About Page Major Overhaul + GitHub Fix (2026-05-29)

### What changed

#### Navbar — transparent on About page
`src/components/layout/Navbar.jsx`: added `'/about'` to `isHomePage` array. About page now gets the same transparent/absolute navbar treatment as the Home page.

#### AboutHero — full redesign + fixed breadcrumb bar
`src/components/about/AboutHero.jsx` completely rewritten:
- **Fixed breadcrumb bar** (`.ab-page-bar`): `position: fixed; top: var(--navbar-h); z-index: 49; height: 36px; backdrop-filter: blur(14px)`. Shows "Home › About" always below navbar. Works on mobile.
- **Hero padding-top** now accounts for both navbar + breadcrumb bar: `calc(var(--navbar-h) + 36px + gap)` → removed inline `.ab-bc` breadcrumb nav from hero left column.
- **New left layout**: chapter label `01 / About Me`, larger name + Turzo badge, role row with green live dot + age badge, 4 chips (location, religion, edu, dev), stats strip (3+ Dev / 6+ Design / 16+ Projects), 2 CTAs.
- **Right image** (`hero-back.webp`): full-section bottom gradient (unchanged), **no rounded frame** at any breakpoint. Container uses `object-fit: cover; object-position: center top`.
- **Hero min-height**: `calc(100dvh - var(--navbar-h) - 36px)` to fill remaining viewport.

#### AboutStory — complete redesign, new title
`src/components/about/AboutStory.jsx` fully replaced:
- **New title**: "Behind the Screen" (was "From circuits to clean code")
- **New layout**: header → 4-stat strip (grid) → 2-col grid (info left, journey right) → quote at bottom of right col
- Stats strip: 4 coloured stat boxes in a single card row (Dev / Design / Video / Projects)
- Left col: Personal Details card (same info rows, cleaner styling) + CV card
- Right col: 3 Journey milestone cards + quote blockquote
- All CSS prefixed `ajs-*`

#### AboutTimeline — interactive wheel arc timeline
`src/components/about/AboutTimeline.jsx` completely replaced:
- **Desktop**: SVG arc (`viewBox="0 0 800 360"`, circle centre (400, 540), radius 440). 8 nodes spanning 218°–322° (clockwise through 270° = top). Clicking a node selects it; selected node shows glow ring + connector line to bottom; content card below arc with `AnimatePresence` slide transitions.
- **Mobile** (`< 700px`): horizontal scroll pill selector (snap) + animated content card + prev/next nav arrows.
- Default selected: index 5 (SSC-26, current).
- Node labels: period text positioned above dot; anchor: `end` left, `middle` top, `start` right.
- Content card: colored top border, period chip, school, level, desc, progress dots row.
- Prev/Next arrow buttons on both desktop and mobile.
- Fully responsive, no external dependencies.

#### AboutSkills — mobile tabs responsive
`.absk-tabs`: changed `flex-wrap: wrap` → `flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none`. Tabs scroll horizontally on mobile. Mobile breakpoint (`≤560px`): tabs fill full width, each tab `flex: 1 0 auto`.

#### AboutValues — hobbies click effect
`.abv-hobbies` container: added `data-click-fx="true"` attribute so global click burst fires on the entire hobbies card, not just individual chips.

#### AboutGoals — removed abg-topbar
Removed `<div className="abg-topbar" ...>` (the colored 4px top bar). Replaced with `.abg-card-accent` — a `position: absolute; left: 0; top: 0; bottom: 0; width: 3px` left-side accent line. Body padding adjusted to `1.5rem 1.5rem 1.5rem 1.75rem` to clear the accent line.

#### GithubStats — single API call, no retry loop
`src/components/home/GithubStats.jsx`:
- Removed: `retryCount`, `retryTimer` state, `RATE_LIMIT_WAIT` constant, all `setTimeout` retry logic.
- `load()` now: single attempt; on 403/429 sets `error: 'rate_limited'`; shows message + manual "Retry" button.
- `useEffect`: `load()` once on mount, no cleanup needed.
- **Future plan (v2.3.5+)**: use GitHub PAT via a Firebase Function / Cloudflare Worker / Supabase Edge Function. Cache response in Firestore/KV. Refresh every 24–48 hrs server-side. Website loads from cache — no rate limits, no exposed token.

#### AboutConnect — improved hover effect
- Card hover: stronger shadow with platform colour ring (`0 0 0 1px color-mix(...)`), subtle bg tint (`color-mix 4%`), `translateY(-3px)`.
- Icon wrap hover: `transform: scale(1.12)` + `box-shadow` glow in platform colour.
- Arrow hover: `translate(2px, -2px) scale(1.15)`.

### Files changed
- `src/components/layout/Navbar.jsx` — isHomePage includes '/about'
- `src/components/about/AboutHero.jsx` — full rewrite (breadcrumb bar + new hero)
- `src/components/about/AboutStory.jsx` — full rewrite (new design + title)
- `src/components/about/AboutTimeline.jsx` — full rewrite (wheel arc timeline)
- `src/components/about/AboutSkills.jsx` — tabs mobile scroll fix
- `src/components/about/AboutValues.jsx` — hobbies data-click-fx
- `src/components/about/AboutGoals.jsx` — remove topbar → left accent line
- `src/components/home/GithubStats.jsx` — remove retry loop
- `src/components/about/AboutConnect.jsx` — improved hover effect
- `creator-guide/master-context.md` — this update

### Commit message
```
v2.3.4 - about page overhaul, wheel timeline, github api fix, UI polish

- Navbar: transparent on /about (same as home page)
- AboutHero: fixed breadcrumb bar below navbar; full redesign (chapter label,
  stats strip, new chips, no rounded frame on image, min-height adjusted)
- AboutStory: complete redesign — "Behind the Screen"; stats strip + 2-col grid
- AboutTimeline: interactive SVG arc wheel (desktop) + pill scroller (mobile)
- AboutSkills: tabs scroll horizontally on mobile (no wrap overflow)
- AboutValues: hobbies full container has click effect (data-click-fx)
- AboutGoals: removed abg-topbar; replaced with left accent line
- GithubStats: removed retry loop — single API call on mount, manual retry only
- AboutConnect: enhanced hover — glow ring, icon scale, stronger shadow
- context: v2.3.4 section added with future GitHub caching plan
```
