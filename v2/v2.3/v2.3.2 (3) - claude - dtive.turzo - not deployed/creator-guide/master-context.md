# master-context.md

> **AI INSTRUCTIONS — Read before every edit. Strictly follow these rules:**
> 1. **Never delete or modify past sections** — only add new sections below, and update the Universal Info table if values change.
> 2. **After completing a version**, add a new `## vX.Y.Z` section at the bottom following this file's format exactly.
> 3. **Log important discussions, decisions, constraints, and design choices** in the version's section.
> 4. **Keys/config changes** must be noted explicitly.
> 5. **No information omitted** — future AI must understand full history from this file alone.
> 6. **Separator rules:** one `---` between patch versions (e.g. v2.3.1 → v2.3.2); three `---` lines between minor versions (e.g. v2.2.x → v2.3.x).
> 7. `#` only for file title · `##` for version titles · `###` for sub-sections · **bold** for critical info.
> 8. Do not store raw commit messages here. Summaries only.
> 9. v3 gets its own separate file — do not create v3 sections here.
> 10. Creator-guide files added in a release zip should be noted at the end of that version's section.

---

## 🌐 Universal Info *(editable — update values, never remove keys)*

| Field | Value |
|---|---|
| Site | https://mdturzo.web.app |
| Owner | Muhtasim Rahman (Turzo) |
| Email | mdturzo.dev@gmail.com |
| Location | Nilphamari, Rangpur, Bangladesh |
| Stack | React 18 + Vite + Tailwind CSS + Zustand + Framer Motion |
| Auth | Firebase Auth |
| Realtime | Firebase RTDB |
| Database | Supabase (PostgreSQL) |
| Hosting | Firebase Hosting |
| Image Upload | ImgBB via Cloudflare Worker |
| Email | Resend via Cloudflare Worker |
| Config version | v2.3.2 |

### Keys & Setup Status

| Service | Status | Notes |
|---|---|---|
| Firebase | ✅ | `.env` |
| Supabase | ✅ | URL + Anon key in `.env`; 18 tables + RLS run |
| Firebase RTDB rules | ✅ | Advanced rules set |
| Firebase Auth action URL | ✅ | `https://mdturzo.firebaseapp.com/__/auth/action` |
| Cloudflare Worker | ✅ | Script deployed |
| ImgBB | ✅ | `imgbb_api` secret added |
| Resend | ⏳ | `resend_api` Worker secret — add when ready |
| reCAPTCHA | ⏳ | v2.7.0 |
| Hotjar | ⏳ | ContentSquare `a4b49fe204eec` present; site ID later |

### Social platform → SITE_CONFIG key

| Platform | Key |
|---|---|
| GitHub | `SITE_CONFIG.social.github` |
| LinkedIn | `SITE_CONFIG.social.linkedin` |
| Facebook | `SITE_CONFIG.social.facebook` |
| Instagram | `SITE_CONFIG.social.instagram` |
| YouTube | `SITE_CONFIG.social.youtube` |
| Telegram | `SITE_CONFIG.social.telegram` |
| Twitter/X | `SITE_CONFIG.social.twitter` |
| TikTok | `SITE_CONFIG.social.tiktok` |
| Threads | `SITE_CONFIG.social.threads` |

### Shared CSS Design Tokens *(index.css)*

`--bg-page` · `--bg-surface` · `--bg-surface-2` · `--text-primary` · `--text-secondary` · `--text-tertiary` · `--accent-primary` · `--accent-hover` · `--accent-light` · `--border-color` · `--border-strong` · `--font-display` · `--font-mono` · `--navbar-h: 68px` · `--radius-sm/md/lg/xl/full` · `--shadow-sm/md` · `--transition-fast` · `--transition-base`

---
---
---

## v2.0.0 — Foundation & Architecture

React 18 + Vite + Tailwind + Zustand + Framer Motion project structure. Firebase Auth, RTDB, Supabase PostgreSQL, Cloudflare Worker configured. Zustand stores (auth, theme, toast, notification, search), hooks, services, utilities written. 19 lazy pages defined. Supabase SQL schema (18 tables + RLS), Firebase RTDB advanced rules, Cloudflare Worker (4 routes) complete.

---

## v2.0.1 — Polish & Fixes

React Router future flags → console warnings gone. AnimatePresence page transitions added. Font system (Plus Jakarta Sans + DM Sans + DM Mono) and CSS design tokens ported from v1.4.5. Favicon added. 404 redesigned. `creator-guide/` folder created.

**Supabase keys noted:**
- Anon key: `eyJhbGci...hKz4BGIz...c3y8`
- Service role: `eyJhbGci...ml3Wwp...fyZ8`
- Publishable: `sb_publishable_k-S_434kuFqcYfY42h7xcw_Ud_EnLN8`

---
---
---

## v2.1.0 — Navbar + Footer + Layout + AdminQuickActions

**Navbar:** Logo + green pulse dot · center nav (Home/About/Projects/Feed/Contact) · right: Search (Ctrl+K), Notification, Theme, Avatar, Mega-menu · Scroll: transparent → floating glass pill · Mobile sidebar with drag/touch marquee.

**Footer:** 4-column layout · 9 social icons · bottom bar: copyright + version + scroll-to-top.

**AdminQuickActions:** FAB (admin only) → 6 actions staggered.

**App.jsx:** `/feed` + `/logout` routes added.

---

## v2.1.1 — Navbar/Footer Redesign + Universal Ripple + Advanced Skeleton

- Navbar: top `position:relative`, float `position:fixed` at 450px
- Mega menu: 4-column redesign
- Footer: `1.2fr 0.8fr 0.8fr 1.2fr` grid · Let's Collaborate card · subscribe counter
- **Universal Ripple:** `src/components/ui/Ripple.jsx` — `useRipple()` + `RippleLayer`
- **Skeleton system:** `PageSkeleton` with `hero|list|grid|detail|profile|admin|form|blank` layouts
- **Context format change:** single `master-context.md` replaces per-version files

**Architecture decisions:** Feed = `feed` table with `type:'blog'|'post'` · Firebase Auth only · Admin: RTDB `/admins/{uid}:true` + Supabase double-check · Images: ImgBB via Worker · Notifications: RTDB primary + Supabase history

---

## v2.1.2 — Auth + Navbar/Footer Polish

- Site name: `Md Turzo` everywhere
- Navbar: floating glass redesign · mega menu minimal · icon tooltips
- Footer light mode: `--footer-bg: #eef2f7` full override
- **Bug fixes:** old user caching (`no-cache` on `/index.html`) · autofill white bg (webkit shadow override)
- Facebook Auth added (some permissions need App Review)

---

## v2.1.3 — Navbar/Footer Template Integration + Search/Share Polish

- Navbar name: `Muhtasim`; footer: full owner name
- Logo: `/logo.webp` with fallback to `/android-chrome-192x192.png`
- Desktop search: compact top-center popup with placeholder results
- Mega footer: share buttons (FB/X/LinkedIn/Telegram/native), URL bar + copy, version badge
- Footer: max-width 1120px, subscribe UI with Firebase counter listener
- Toast: capped at 3, 3s timeout, compact glass style

---

## v2.1.4 — Loader, Progress Bar, Route Skeleton, Click Effect

- Floating navbar: only place with rounded avatar logo
- Desktop search popup: full redesign with grouped results, keyboard shortcuts (↑↓/↵/Esc/Ctrl+K)
- **Global click burst effect** for buttons/cards/role-buttons (not plain links)
- `SignatureLoader` (CSS conic loader) added · reused for route loading
- `ScrollToTop` on every pathname/search change
- Route-shape `PageSkeleton` fallbacks for each page type
- Page progress: smooth gradient + glowing head + particles

---

## v2.1.5 — UI Polish: Search, Tooltips, Click Effect, Navbar, Marquee

- Desktop search: grouped by category, keyboard shortcuts bar, ESC pill
- Sidebar search: real results using same popup style
- Click effect: removed from plain `a[href]` · added `data-click-fx` to desktop NavLinks
- Tablet/mobile navbar: differentiated button sets (`md:flex lg:hidden` vs `flex md:hidden`)
- Social marquee: `onWheel` + touch events for manual scrolling
- Light mode navbar: `rgba(240,244,250,0.92)`
- Page progress: 2px height, clean 2-color gradient, no particles

---
---
---

## v2.2.0 — Home Page Implementation

Hero (portrait + typing animation + social + stats) · AboutMini (hero-back.webp) · Skills (progress bars) · Services · Stats · RecentProjects (Supabase featured, 6 static fallback) · GithubStats (streak + stats embeds) · Reviews (Supabase approved_reviews) · BlogMini.

**Public assets added:** `hero.webp`, `hero-back.webp`, `preview.png`, `icons/*.svg`

**Creator-guide files:** `supabase-v2.2.0.sql`

---

## v2.2.1 — Home + About + Contact (Base)

Full home rebuild. About page (bio/timeline/tools/interests/CTA). Contact page (form + Worker email). `useSiteSettings` hook. CookieBanner (localStorage `mdturzo_cookie_consent`). All home section components split into `src/components/home/`.

**Supabase deps:** `site_settings` keys: `stats_years_dev`, `stats_years_design`, `stats_projects`, `available_for_work`, `cv_enabled`, `cv_url`, `cookie_banner`.

---

## v2.2.2 — Hero Redesign + Home Polish

Full hero rewrite from v1.4.5 HTML template. `section-alt` class. Alternating section backgrounds. Multiple public assets updated. BlogMini from section order.

**Public assets:** `hero-sit.webp` added (used in CTA).

---

## v2.2.3 — Hero v2 + Navbar + Skills + CTA Redesign

Hero v2 (clean bg, rectangular frame desktop, circular mobile, no floating icons). Smart `SectionSnap` (removed in v2.2.6). Skills: vertical tab layout. AboutMini: 6th card as "Read Full Story" button. CTA: premium minimal, hero-sit.webp overflow. GithubStats: 3-panel redesign. Navbar: transparent on home (`isHomePage` = `['/', '/home']`). Footer + container padding unified 1.75rem.

---

## v2.2.4 — Rejected

Too large; split into v2.2.5 and v2.2.6.

---

## v2.2.5 — Layout Unification, Cookie Fix, Search Removal

- **Layout unified:** `container-xl` = 1120px + `clamp(1rem,4vw,1.75rem)` everywhere
- Navbar transparent home only; floating always glass
- **CookieBanner** moved to `Layout.jsx` (global), `checkedRef` async guard
- Desktop search popup + Ctrl+K **fully deleted** — icon shows `toast.info`
- Light mode warmed: `--bg-page: #F0F4F8`
- Material Symbols CDN for `waving_hand` icon
- `@fortawesome/fontawesome-svg-core` added as explicit dep

---

## v2.2.6 — Scroll Snap Removal, Navbar Polish, Hero Height Fix

- **SectionSnap component removed** — natural scroll only (do NOT re-add)
- `scroll-padding-top: calc(var(--navbar-h) + 16px)` added to `html`
- Hero height fixed (no more infinite resize loop)
- CTA redesigned (no hero-sit.webp dependency)

---

## v2.2.7 — Full Navbar Redesign, Hero Rebuild, Section Reorder

**Section order:** Hero → AboutMini → RecentProjects → Skills → Process → Services → Reviews → GithubStats → CTA

- **Navbar:** `position:absolute` on home (overlay hero), `position:relative` on other pages; floating pill always fixed at 420px; mega nav `z:10000` via `position:fixed` portal
- **Hero:** fixed CSS sizing per breakpoint (no JS resize); new minimal dot-grid bg + ambient orbs + particles
- **RecentProjects:** full card clickable, footer themed to card color, `accent_color` field from Supabase
- **Skills:** left stat cards + right animated progress bars (tab: Skills/Tools/Learning)
- **Process.jsx (NEW):** "How I Work" section (replaced by Journey in v2.2.8)
- **Layout.jsx:** `pt-navbar` on `<main>` only for non-home pages

---

## v2.2.8 — Hero Polish, Navbar Fixes, Skills Cards, Journey Timeline, GitHub Redesign

- Hero: no frame/bg/shadow on desktop; circular frame on ≤899px with `bg-surface-2`; name: `Muhtasim Rahman (Turzo)` single line
- **Navbar:** mega menu ONE render via `id="mega-menu-portal"` (no more double-render); `title` attrs removed (CSS tooltip only)
- **Skills:** stat cards horizontal (icon left, number+label right)
- **Process.jsx → Journey timeline:** alternating left/right, 6 events (2019–2024+), `useInView` animations
- **GithubStats:** profile card + streak img + awesome-github-stats + trophies + languages + repos; theme-aware image URLs via `key` prop reload

---

## v2.2.9 — Section Alignment, GitHub Redesign, Navbar Fixes, Project Cards

- Hero: `(Turzo)` block-level on all screens, accent color; max-width 1120px; em-dash `&#8212;`; Download CV hides text on xs
- AboutMini: `•` bullets; grid alignment fix
- Process section: replaced with real Muhtasim tools/principles + code editor mockup
- GithubStats: profile card (avatar | name/bio | 5 stat cards) · trophies removed · repos: 6 desktop / 4 tablet / 3 mobile · API retry logic with countdown
- RecentProjects: minimal card (no thumbnail) · accent top line on hover · full-card `<Link>` · themed footer
- Navbar: tooltip centering fixed (`left:50% transform:translateX(-50%)`) · mega auto-close at `FLOAT_THRESHOLD+60`

---
---
---

## v2.3.0 — About Page Base (copy explorations)

4 About page A/B variants (copy-1 → copy-4) built for design exploration. About page sections: Hero, Bio/Story, Exp Stats, Technical Skills, Design & Creative, Education Timeline, Values, Goals, Services, CTA.

---

## v2.3.1 — About Page Full Redesign

**`src/pages/About.jsx`** — 924-line single-file, 9 sections:

1. **Hero** — `hero-back.webp` right, breadcrumb, name, facts, 2 CTAs, no Available badge, no scroll icon
2. **Story & Info** — quote block + narrative left; 2×2 exp stats + 3 journey cards right
3. **Education Timeline** — center line PC / left mobile; `useScroll+useTransform` animated line; current entry dot pulse
4. **Skills (tabbed)** — Programming bars (home-style animated), Design icon grid, Video dot list, Tools 4-col grid
5. **Language Proficiency** — `flagcdn.com` flags; `whileInView` animated bars
6. **Values & Personality** — 6 cards + hobbies chips
7. **Goals & Plans** — 3 cards, colored top bar, checklist, no progress bars
8. **Find Me Online** — 3 featured big cards (GitHub/LinkedIn/YouTube) + 7 smaller grid
9. **CTA** — shared `components/home/CTA.jsx`

**`src/components/home/CTA.jsx`** — redesigned, now shared by Home + About.

**`src/components/layout/Layout.jsx`** — `/about` added to `isHome` paths (prevents double `pt-navbar`).

**Components in `home/` but NOT rendered in `Home.jsx`:** `BlogMini.jsx` · `RecentProjectsOriginal.jsx` · `Stats.jsx`

---

## v2.3.2 — About Page Refactor + Hero Padding Fix + Click Effect + Same-page Nav + Skeleton

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
