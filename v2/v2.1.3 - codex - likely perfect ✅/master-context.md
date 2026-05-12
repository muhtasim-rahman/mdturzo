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
