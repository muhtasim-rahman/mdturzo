# Master Context — mdturzo Portfolio

> **AI Instructions** — Read this entire file before making any changes. Follow all rules strictly.
>
> **Rules for every AI session:**
> 1. **Never edit old version sections** — only add new sections below, or update the Universal section.
> 2. **After completing a version**, add a new `## vX.X.X` section using the format below.
> 3. **Record all decisions, data, config changes, discussions, deferred items** — future AI must understand full history.
> 4. **No commit messages** here. No duplicate info. Keep compact.
> 5. **Sub-headings** use `###`. Extra important info uses **bold**. No deeper headings.
> 6. Minor version separator: `---` · Major version separator: three `---` lines.
> 7. **v3+ gets a separate file** — do not add v3 sections here.
> 8. On session end: update `## vX.X.X (current)` section and bump version in `site.config.js`.

---
---
---

## 🔴 v2.0 — Foundation

### v2.0.0 — Architecture Setup
React 18 + Vite + Tailwind + Zustand + Framer Motion. Firebase Auth + RTDB, Supabase PostgreSQL, Cloudflare Worker. 19 lazy pages, Zustand stores (auth/theme/toast/notif/search), all hooks/services/utils. Supabase SQL schema (18 tables + RLS), Firebase RTDB advanced rules, Cloudflare Worker (4 routes). Skeleton system, toast, ErrorBoundary, page progress.

**Supabase keys (stored in .env):**
- Anon key: `eyJhbGci...hKz4BGIz...c3y8`
- Service role: `eyJhbGci...ml3Wwp...fyZ8` (Worker only)
- Publishable: `sb_publishable_k-S_434kuFqcYfY42h7xcw_Ud_EnLN8`

**Cloudflare Worker secrets needed:**
- `imgbb_api`, `resend_api`, `recaptcha_secret` (v2.7.0), `admin_email`, `supabase_url`, `supabase_service`

---

### v2.0.1 — Polish & Fonts
React Router future flags (no console warnings). AnimatePresence page transitions. Font system ported from v1.4.5 (Plus Jakarta Sans + DM Sans + DM Mono). Favicon all sizes. 404 redesign. `creator-guide/` organized.

---
---
---

## 🔴 v2.1 — Navbar + Footer + Auth

### v2.1.0 — Navbar + Footer + Layout
**Navbar:** `@mdturzo999` logo, center nav (Home/About/Projects/Feed/Contact), right icons (Search/Notif/Theme/User/Grid), scroll → glass pill at 80px, mega menu (4-category grid), notification panel (RTDB realtime), user dropdown, mobile sidebar.
**Footer:** 4-column (Brand+socials | Explore | Contact | Legal), 9 social icons, scroll-to-top.
**AdminQuickActions:** Fixed FAB (admin only), 6 actions.
**Feed.jsx:** placeholder.

---

### v2.1.1 — Navbar/Footer Redesign
Top navbar `position:relative` (scrolls away), floating pill `position:fixed` (appears at 450px). Mega menu 4-col redesign. Mobile sidebar improvements. Universal Ripple hook (`useRipple`). Advanced Skeleton `PageSkeleton` layout types. 404 "4 😢 4" redesign.

**Architecture decisions:**
- Feed: `feed` table, `type: 'blog'|'post'`
- Auth: Firebase Auth only, Supabase Auth disabled
- Admin verify: Firebase RTDB `/admins/{uid}:true` + Supabase `admins` table
- Image hosting: ImgBB via Cloudflare Worker
- Notifications: Firebase RTDB primary, Supabase backup

---

### v2.1.2 — Navbar/Footer Polish + Auth
Name: `@mdturzo999` → `Md Turzo`. Logo: T-avatar + green active dot. Floating navbar advanced glass. Mega menu redesigned minimal. Footer light mode full CSS override. Autofill white bg fix. Firebase Auth: Facebook auth added. `site.config.js` `navName: 'Md Turzo'`.

---

### v2.1.3 — Template Integration + Search + Toast
Navbar: `Muhtasim` (nav), full name in footer. Logo `/logo.webp` with fallback. Desktop search popup (placeholder). Sidebar search input. Mega footer: share buttons + URL bar + version badge. Toast: max 3, 3s timeout, compact.

---

### v2.1.4 — Navbar/Search/Loader Polish
Floating navbar: rounded avatar logo. Navbar heights normalized. Desktop search centered popup. Sidebar search results. `SignatureLoader` (CSS conic loader). Route scroll-to-top. Page progress bar rework. v2.1.4 final: skeleton layout types per route; first load overlay spinner; simple CSS spinner replaces `SignatureLoader`.

---

### v2.1.5 — Search, Tooltips, Click Effect, Responsive
Desktop search: category-grouped results, keyboard shortcuts. Sidebar search: real results. Tooltips: 8px radius, no backdrop. Click effect: minimal, `button/[role=button]/.card/[data-click-fx]` only (links removed). Tablet/mobile navbar split. SocialMarquee: wheel + touch scroll. Light mode: `--bg-page: #F0F4F8`. Progress bar: 2px, clean gradient.

---
---
---

## 🔴 v2.2 — Home Page

### v2.2.0 — Home Page (Codex build — rejected as base)
Basic home page built via Codex. Not used as base — replaced by v2.2.1.

---

### v2.2.1 — Home Page Base
Full home page rebuilt. `useSiteSettings` hook (Supabase `site_settings`). Hero, AboutMini, Skills, Services, RecentProjects, GithubStats, Testimonials, BlogMini, CTA components. `CookieBanner`. `muhtasim.webp` + `preview.png`. All Supabase reads failure-tolerant.

---

### v2.2.2 — Hero Redesign + Home Polish
**Assets:** `hero.webp`, `hero-sit.webp`, `hero-back.webp`, `preview.webp`, `/icons/*.svg`.
Hero: greeting chip, name split, typewriter role, CV button (flag-driven), social icons with tooltips, stats from 0, rising particles, star/particle bg.
Skills merged with Stats. AboutMini: `hero-back.webp`. RecentProjects: View All button. GithubStats: contribution graph replaced. CTA: redesigned with `hero-sit.webp`. `/home` → Navigate redirect → renders Home.

---

### v2.2.3 — Hero v2 + Navbar Polish
Section order finalized (Hero→About→Projects→Skills→Process→Services→Reviews→GitHub→CTA). Hero full rewrite v2.2.3: greeting italic, name line split, floating icons random positions, PC rectangular/mobile circular frame, dual gradient layers, SVG bottom bar. Skills: vertical tab sidebar. AboutMini: `muhtasim-about.webp`. CTA: minimal premium 2-col. Navbar: transparent on home, logo hover removed, mega z-index 10000. `/home` renders Home (not redirect). SectionSnap added.

---

### v2.2.4 — Rejected
Too large, AI errors after 4 attempts. Split into v2.2.5 + v2.2.6.

---

### v2.2.5 — Layout Unification + Cookie + Search Refactor
**Unified layout:** all containers `max-width:1120px + clamp(1rem,4vw,1.75rem)`. CookieBanner moved to `Layout.jsx`. Desktop search popup **deleted** (icon → `toast.info`). Sidebar search: input only, no results. `.mega-glass` always on. `@fortawesome/fontawesome-svg-core` added as explicit dep. `isHomePage = ['/','/home'].includes(pathname)`.

**⚠ Do not restore:** desktop search popup, Ctrl+K, sidebar search results.

---

### v2.2.6 — Scroll Snap + Navbar + CTA Redesign
Scroll snap removed. Navbar polish. Hero height fix. CTA redesign.

---

### v2.2.7 — Full Navbar Redesign + Hero Rebuild + Skills
Scroll snap fully removed. Navbar complete rewrite: `position:absolute` on home (hero overlays), `position:relative` other pages. `pt-navbar` on `<main>` only for non-home. Hero: fixed CSS sizing per breakpoint (no ResizeObserver), minimal bg (dot-grid + orbs + particles). Skills redesigned (2×2 stat cards + horizontal bars). Process section → "How I Work". RecentProjects: full-card Link, accent_color per project.

**Key note:** `Navbar` is named export (`export function Navbar()`).

---

### v2.2.8 — Hero Polish + Navbar Fix + Journey Timeline
Hero: desktop frame transparent (no bg/border), mobile circular frame has `bg-surface-2`. "Available for hire" badge removed. Name: `Muhtasim <Rahman> (Turzo)`. Navbar: mega menu single render via `id="mega-menu-portal"`. Skills stat cards: horizontal (icon+num row). Process → "My Journey" alternating timeline (6 events, `useInView` stagger). GithubStats: profile card + streak/awesome-stats images + trophies + language bars + repos.

---

### v2.2.9 — Section Alignment + GitHub Redesign + Project Cards
Hero: `(Turzo)` block on all screens, `text-align:right` on desktop. Inner max-width 1120px. GithubStats: profile card with 5 stats, no trophies, top repos 3-col, API retry with countdown. RecentProjects: no thumbnail, minimal card (category chip + hover accent line + colored footer). Navbar: `title` attr removed from all buttons (CSS tooltip only). Mega nav scroll-hide at `FLOAT_THRESHOLD+60`.

---
---
---

## 🔴 v2.3 — About Page

### v2.3.0 — About Page (first attempt)
Single-file About page: bio, timeline, tools, interests, CTA. 924 lines. Rebuilt in v2.3.1.

---

### v2.3.1 — About Page Full Redesign
**`src/pages/About.jsx`** (1532 lines, single-file): 9 sections — Hero (hero-back.webp, breadcrumb, fact pills, CTA), Story & Info (quote + story + 2×2 exp stats + journey cards), Education Timeline (center line PC / left mobile, animated scroll line via `useScroll`/`useTransform`), Skills (4 tabs: Programming/Design/Video/Tools — bars only on dev tab), Language (flagcdn flags + `whileInView` bars), Values (auto-fit grid + hobbies chips), Goals (3 cards, color topbar, no progress bar), Find Me Online (3 featured big cards + 7 small cards, `--sc` CSS var), CTA (shared).

**`CTA.jsx`:** Redesigned, now shared by Home + About.

**`Layout.jsx`:** `/about` added to `isHome` paths (prevents `pt-navbar` double padding).

**Decisions:** About page is `isHome` so navbar is transparent/absolute. `calculateAge()` auto from `fakeDOB`. `flagcdn.com` flags runtime only.

---

### v2.3.2 — About Restructure + Fixes (current)

#### What changed

**Project restructure — About page split into section components:**

| File | Purpose |
|------|---------|
| `src/components/about/aboutData.js` | All shared data (EDUCATION, GOALS, SOCIALS, etc.) + animation variants |
| `src/components/about/AboutHero.jsx` | Hero section |
| `src/components/about/AboutStory.jsx` | Story + personal info list + CV options |
| `src/components/about/AboutTimeline.jsx` | Education timeline |
| `src/components/about/AboutSkills.jsx` | 4-tab skills, all tabs with progress bars |
| `src/components/about/AboutLanguages.jsx` | Language proficiency bars |
| `src/components/about/AboutValues.jsx` | Values grid + hobbies |
| `src/components/about/AboutGoals.jsx` | Goals cards + progress bars |
| `src/components/about/AboutConnect.jsx` | Find me online, redesigned |
| `src/pages/About.jsx` | Assembler — SEO + imports only |

**Changes per section:**

**AboutHero** — Padding fixed: `clamp(3rem,7vh,5rem)` → `clamp(1.5rem,3vh,2.5rem)` extra above navbar.

**AboutStory** (enhanced from copy-2):
- Personal info list: Full Name, Display Name, Nickname, Age, Location, Religion, Education, Email
- CV options row: Download / Preview / Print / Share (Web Share API or clipboard fallback)
- CV section only renders when `settings.cvEnabled && settings.cvUrl`

**AboutTimeline** — Scroll-driven dot coloring: dots past scroll point = colored (with item color), unreached = muted. Icon in each dot (FontAwesome, small). Mobile: line at `left:13px`, dots 22px, grid fixed.

**AboutSkills** — All 4 tabs (Programming / Design / Video / Tools) use same `absk-panel` 2-col layout (bars left, note box right). Design/Video/Tools now have `pct` values in `aboutData.js` and animated progress bars identical to Programming tab.

**AboutLanguages** — Same staggered animation as home Skills: `useInView` + `setTimeout` per index + Framer Motion `animate.width`.

**AboutValues** — Explicit grid: `repeat(3,1fr)` desktop / `repeat(2,1fr)` tablet (≤900px) / `1fr` mobile (≤560px). Mobile: cards use flex-row layout for compactness.

**AboutGoals** — copy-4 card style (color topbar + `faCircleCheck` bullets) + animated progress bar at bottom. Short-Term: 85%, Mid-Term: 50%, Long-Term: 25%.

**AboutConnect** — Complete redesign. Featured cards (GitHub/LinkedIn/YouTube): large with 4px left accent bar, icon badge, platform name + handle, arrow. Other platforms: compact 4-col grid. Hover: colored border + subtle tinted bg overlay. Light/dark mode explicitly handled.

**Home Hero** (`Hero.jsx`) — Padding reduced: `clamp(3rem,8vh,5rem)` → `clamp(1.25rem,2.5vh,2rem)` + tablet/mobile also reduced.

**App.jsx** — Click effect: expanded selector (tabs, badges, chips, cv-btns, social cards, fact-pills). Minimal burst animation updated (light/dark CSS). `SamePageScrollTop` component added — detects same-page link click → smooth scroll to top, no reload.

**Skeleton.jsx** — Shimmer CSS injected once via `document.head`. `profile` layout redesigned to match About page structure (hero top, stat cards, info rows, skill bars). All primitives use `animationDelay`.

**`index.css`** — Click effect CSS rewritten: CSS variables `--sk-base`/`--sk-shine` for skeleton theming; dark mode = `rgba(255,255,255,.18)` screen blend; light mode = `rgba(37,99,235,.1)` multiply blend.

#### Decisions
- About page sections live in `src/components/about/` — one file per section.
- `aboutData.js` is the single source of truth for all About page data — import from there.
- Animation variants (`fadeUp`, `slideL`, `slideR`, `stagger`) exported from `aboutData.js`.
- `DESIGN_SKILLS`, `VIDEO_SKILLS`, `TOOLS` now include `pct` field for progress bars.
- `GOALS` now includes `pct` field (85/50/25).
- CV options: `abs-cv-btn-primary` (Download) + 3 ghost icon buttons (Preview/Print/Share).
- Same-page scroll: handles `/home` ↔ `/` equivalence in `normalize()`.

#### Deferred
- Home page sections restructure (same pattern as About) → future version
- Projects page → v2.4.0
- Contact page full build → v2.6.0

---
---
---

## 🟢 Universal Info (editable anytime)

### Project Identity

| Item | Value |
|------|-------|
| Site | https://mdturzo.web.app |
| Owner | Muhtasim Rahman (Turzo) |
| Full name | Md Muhtasim Rahman Mahmud |
| Email | mdturzo.dev@gmail.com |
| Location | Nilphamari, Bangladesh |
| Stack | React 18 + Vite + Tailwind + Zustand + Framer Motion |
| Auth | Firebase Auth |
| Realtime | Firebase RTDB |
| Database | Supabase PostgreSQL |
| Hosting | Firebase Hosting |
| Images | ImgBB via Cloudflare Worker |
| Email send | Resend via Cloudflare Worker |

### Service Status

| Service | Status | Notes |
|---------|--------|-------|
| Firebase | ✅ | `.env` config |
| Supabase | ✅ | URL + anon key in `.env` |
| Firebase RTDB rules | ✅ | Advanced rules set |
| Firebase Auth action URL | ✅ | `https://mdturzo.firebaseapp.com/__/auth/action` |
| Cloudflare Worker | ✅ | Deployed |
| ImgBB | ✅ | `imgbb_api` secret added |
| Resend | ⏳ | `resend_api` secret pending |
| reCAPTCHA | ⏳ | v2.7.0 |
| Hotjar | ⏳ | ContentSquare script `a4b49fe204eec`, site ID later |

### Key CSS Variables (index.css)
`--bg-page`, `--bg-surface`, `--bg-surface-2`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--accent-primary`, `--accent-hover`, `--accent-light`, `--border-color`, `--border-strong`, `--font-display`, `--font-mono`, `--radius-sm/md/lg/xl/full`, `--navbar-h` (68px), `--shadow-sm/md`, `--transition-fast/base`

### Navbar Rules (DO NOT break)
- Named export: `export function Navbar()`
- `isHomePage = ['/','/home'].includes(pathname)` — transparent top navbar on home
- `isHome` in Layout.jsx: `['/','/home','/about']` — prevents `pt-navbar` double padding
- Floating navbar: always glass, appears at `FLOAT_THRESHOLD = 420px`
- Mega menu: single render in `id="mega-menu-portal"` fixed div — never add inside top/float nav
- Desktop search popup: **deleted** — do NOT restore
- Navbar `title` attr: **removed** from all buttons — CSS `[data-nb-tip]::after` only
