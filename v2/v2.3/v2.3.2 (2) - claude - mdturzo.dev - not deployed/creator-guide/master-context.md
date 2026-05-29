# master-context.md

## ⚡ AI Instructions — Read Before Every Change

**This file is the single source of truth for all project versions, decisions, and context.**

### Rules (every AI must follow without exception):
1. **Never edit past sections** — only append new sections below.
2. **Add a new version section** after every completed version using the format in this file.
3. **Record all key decisions, discussions, discoveries** — not commit messages, but meaningful context.
4. **No information loss** — future AI must be able to reconstruct full history.
5. **Format strictly**: `#` for file title only · `##` for version titles · `###` for sub-sections · **bold** for critical info · `---` between minor versions · triple `---` (3 lines) between major versions.
6. **Keep it compact** — meaningful info only, no padding, no repetition.
7. Creator-guide file names follow pattern: `cloudflare-worker-v2.x.x.js`, `firebase-rtdb-rules-v2.x.x.json`, etc. Note which version last updated each.
8. **v3.x will use a separate file** — this file covers v2.x only.

---
---
---

## 🔵 v2.0 — Foundation & Architecture

### v2.0.0 — Base Setup
React 18 + Vite + Tailwind + Zustand + Framer Motion. Firebase Auth + RTDB, Supabase PostgreSQL, Cloudflare Worker all configured. Zustand stores (auth, theme, toast, notification, search), hooks, services, utilities complete. 19 lazy-loaded pages, VisibilityGuard, skeleton system, toast, ErrorBoundary, PageProgress. Supabase SQL schema (18 tables + RLS), Firebase RTDB rules, Cloudflare Worker (4 routes).

### v2.0.1 — Polish & Fixes
React Router future flags added (console warnings gone). AnimatePresence page fade transitions. Font system from v1.4.5 (Plus Jakarta Sans + DM Sans + DM Mono) + CSS design tokens ported. Favicon all sizes added. 404 redesign. `creator-guide/` folder organized.

### 🔑 Credentials & Keys
**Supabase:** anon key, service role key (Worker only), publishable key — stored in `.env.local`.

**Cloudflare Worker secrets to add:**
- `imgbb_api` — ImgBB API key
- `resend_api` — later
- `recaptcha_secret` — v2.7.0
- `admin_email` = `mdturzo.dev@gmail.com`
- `supabase_url` = `https://kddyucerqiwvjmuwebjv.supabase.co`
- `supabase_service` — service role JWT

**Firebase Auth:** Rich HTML email templates not supported — Resend custom SMTP planned later. **Hotjar:** ContentSquare script `a4b49fe204eec`, no separate Hotjar site ID yet. **Admin:** 4+ emails, managed via admin panel in v2.10.0.

**Setup status:** Supabase SQL ✅ · Firebase RTDB rules ✅ · Cloudflare Worker deployed ✅

---
---
---

## 🔵 v2.1 — Navbar, Footer, Layout

### v2.1.0 — Core Layout
**Navbar:** Top bar (position: relative, scrolls away) + floating pill (fixed, appears at scrollY > 80px). Logo `@mdturzo999` (@ primary blue, rest white, monospace) + green pulse dot. Center nav: Home, About, Projects, Feed, Contact with active pill. Right: Search (Ctrl+K), Notifications, Theme toggle (Sun↔Moon), User avatar/menu, Grid mega-menu. Mega menu: 4-category grid. Notification panel: RTDB realtime, mark read/all. User dropdown: profile, admin (admin only), sign out. Mobile: right slide-in drawer.

**Footer:** 4-column (Brand+socials | Explore | Contact | Legal). All 9 social icons. Bottom bar: copyright + version badge + scroll-to-top.

**Layout:** Navbar + Footer + AdminQuickActions integrated. `/feed` + `/logout` routes added.

**AdminQuickActions:** Fixed bottom-right FAB (admin only). 6 actions: Add Blog, Add Project, Add Post, Add Notification, View Reports, Page Visibility.

### v2.1.1 — Navbar/Footer Redesign
Based on user-provided HTML design. **Key changes:** floating pill uses spring animation; mega nav auto-closes at scroll > 480px; overlay click closes mega nav; CSS tooltip always centers below button; `title` attr removed from all icon buttons (CSS tooltip is the only tooltip — **do not re-add `title` attrs**).

---

## 🔵 v2.2 — Home Page Complete

### v2.2.0 — Hero
Full-viewport hero. Left: greeting (Assalamu Alaikum), animated role text (Typewriter), name (Muhtasim Rahman + (Turzo) block element), bio, 4 fact pills, 2 CTA buttons (Hire Me + Download CV conditional on `settings.cvEnabled`), 5 social icons. Right: `/hero-back.webp` with bottom gradient fade (`--bg-page`, no border-radius frame). Floating badges hidden. `hero-inner` max-width 1120px (matches `container-xl`). `(Turzo)` is block-level, right-aligned on large screens, `var(--accent-primary)` color.

### v2.2.1 — Skills Section
Home Skills section: animated progress bars (Framer Motion `width` on `useInView`), staggered `setTimeout` per bar, same pattern used everywhere bars appear. `SkillBar` component local to `Skills.jsx`.

---

### v2.2.2 — Alternating Section Backgrounds
`.section-alt` class gives alternating subtle background. Defined in `index.css`. Both Home and About use this pattern.

---

### v2.2.3–v2.2.4 — More Home Sections
AboutMini, RecentProjects (minimal cards, no thumbnail, hover accent bar), Services, Process (VS Code + Git + Firebase + Sheets API + JS + HTML/CSS + Photo/Video + DevTools; code editor mockup with real `config.js` content; `--mws-code-plain` CSS var for light mode).

---

### v2.2.5 — Testimonials + Feed Placeholder
Testimonials section added. Feed.jsx placeholder (full build in v2.5.0).

---

### v2.2.6 — SectionSnap Removed
Auto-scroll-to-section (`SectionSnap`) removed entirely per user request. CSS scroll-snap replaces it in `index.css`.

---

### v2.2.7–v2.2.8 — GithubStats Full Redesign
Profile card layout: avatar | center (name, username, join date, location, bio) | right column (5 stat cards: Repos, Stars, Followers, Forks, Profile redirect). Trophies section **removed — do not restore**. Two-col images: transparent bg params, light mode white, dark mode `--bg-surface-2`. No border on image panels. Top repos: desktop 3-col (6 shown), tablet 2-col (4 shown via nth-child), mobile 1-col (3 shown). API retry: skeleton → 3 retries × 5s → wait for `X-RateLimit-Reset` → countdown → auto-retry → manual button.

**Important:** GitHub stat image panels have **NO border** — do not re-add.

---

### v2.2.9 — Navbar + Container Fixes
Navbar: mega nav overlay `bottom:0`; `onClick` closes on empty space click. `index.css`: removed `padding-inline: 0` at 1440px+ (was causing uneven section margins). Global `.card:active { transform: scale(0.98) }` added.

---
---
---

## 🔵 v2.3 — About Page

### v2.3.0 — About Page Exploration (copies)
4 copies (copy-1 through copy-4) explored as A/B variants before final design selection. Each explores different layout approaches. **copy-2** has best Story/Connect sections. **copy-4** has best Goals and Skills layout. Main project combines the best of all.

---

### v2.3.1 — About Page Full Redesign
Single-file `About.jsx` (924 lines). 8 sections built:

1. **Hero** — `hero-back.webp` right, content left. No "Available" badge, no scroll icon. Breadcrumb + eyebrow + h1 + role + bio + 4 fact pills + 2 CTAs. `Layout.jsx` updated: `/about` added to `isHome` array (prevents double padding).
2. **Story & Info** — Quote + narrative left; exp stats 2×2 grid + 3 journey cards right.
3. **Education Timeline** — Alternating left/right (PC), left-aligned (mobile). Scroll-driven line via `useScroll` + `useTransform` scaleY. Current entry pulse dot.
4. **Skills** — 4 tabs: Programming (animated bars) | Design (icon grid) | Video (dot list) | Tools (4-col grid).
5. **Languages** — flagcdn.com 24×18 webp flags + animated bars.
6. **Values & Personality** — 6 value cards + hobbies chips.
7. **Goals** — 3-column cards, color top bar, 4-item checklists. No progress bars.
8. **Find Me Online** — Bento grid: 3 featured (GitHub, LinkedIn, YouTube) + 7-platform smaller grid.
9. **CTA** — `components/home/CTA.jsx` shared component.

**`CTA.jsx` redesigned** — glassmorphism + gradient + glow orbs. Shared by Home + About. Trust badges row. Social icons row.

**Social → config mapping:** All from `SITE_CONFIG.social.*` (github, linkedin, facebook, instagram, youtube, telegram, twitter, tiktok, threads).

**`calculateAge()`** imported from `site.config.js` — auto-updates on birthday.

**Unused components** (in `src/components/home/` but not on Home page): `BlogMini.jsx`, `RecentProjectsOrginal.jsx`, `Stats.jsx`.

---
---
---

## 🔵 v2.3.2 — About Page Restructure + Fixes (2026-05-27)

### Overview
**Major restructure** — About page split into individual section components. Multiple bug fixes and UX improvements across Home + About. New shared components. Click effects improved. Master-context reformatted.

---

### File Structure Change
**Before:** `src/pages/About.jsx` — single 924-line file with all sections inline.

**After:** `src/pages/About.jsx` — thin wrapper (50 lines) importing from:

```
src/components/about/
  AboutHero.jsx        — hero section, fixed navbar padding
  AboutStory.jsx       — story + personal info table + CV options
  AboutTimeline.jsx    — academic timeline, scroll animation fixed
  AboutSkills.jsx      — all 4 tabs with progress bar layout
  AboutLanguages.jsx   — flags + animated bars (same as home)
  AboutValues.jsx      — 3/2/1 responsive grid
  AboutGoals.jsx       — copy-4 layout + progress bars
  AboutConnect.jsx     — social grid, light/dark responsive

src/components/shared/
  SiteCTA.jsx          — shared CTA (was home/CTA.jsx, now shared)
  AdminQuickActions.jsx (existing)
  VisibilityGuard.jsx   (existing)
```

**Rule:** Each section file is named `[Page][Section].jsx`. Home components stay in `components/home/` unchanged. All about section CSS uses `ab[section]-` prefix to avoid collisions (e.g. `abh-*` = AboutHero, `abs-*` = AboutStory, `abt-*` = AboutTimeline, `absk-*` = AboutSkills, `abl-*` = AboutLanguages, `abv-*` = AboutValues, `abg-*` = AboutGoals, `abc-*` = AboutConnect).

---

### Section Changes

#### `AboutHero.jsx` — Navbar padding fixed
**Bug fixed:** `ab-hero-inner` had both `min-height: 100dvh` AND `padding-top: calc(--navbar-h + clamp(3rem,7vh,5rem))` → resulted in ~148px top gap + full viewport height container, causing excessive whitespace.

**Fix:** `padding-top: calc(var(--navbar-h) + 2rem)` only. The outer `.abh-section` has `min-height: 100dvh; display: flex; align-items: center` which centers the inner grid naturally.

**Same fix applied to** `src/components/home/Hero.jsx`: changed `padding-top: calc(var(--navbar-h) + clamp(3rem,8vh,5rem))` → `calc(var(--navbar-h) + 2rem)`. Removed `min-height: 100dvh` from `.hero-inner` (outer `.hero` handles it).

#### `AboutStory.jsx` — Enhanced from copy-2
- Quote block + 3 journey cards (top grid, 2 columns)
- **4-stat row** (dev years, design years, video years, projects) — from `settings.*` with fallbacks
- **Personal info table** — full rows: Full Name, Age, Location, Education, Religion, Nationality, Occupation, Email, Goal, Website
- **CV options card** — Download, Preview, Print, Share buttons. `navigator.share()` with clipboard fallback. Shows "coming soon" state when `settings.cvEnabled` is false.
- Quick skills chip row

#### `AboutTimeline.jsx` — Scroll animation fixed
- **Past entries** = muted (opacity 0.82, `color28` background dot)
- **Current entry** = colored dot + pulse ring animation + card gets `box-shadow: 0 0 0 2px var(--card-color)`
- **Dots use small icons** (faSeedling, faBookOpen, faFlask, faLightbulb, faGraduationCap, faFlag) — 28px, `.65rem` icon size
- Mobile: `grid-template-columns: 28px 1fr` — dot + card side by side, vertical line on left at `left: 14px`

#### `AboutSkills.jsx` — All 4 tabs use progress bar layout
**Before:** Programming = bars, Design = icon grid, Video = dot list, Tools = 4-col grid.

**After:** All 4 tabs use identical `SkillBar` layout with % and animated bar.
- Design skills now have %: Thumbnail 90%, Logo 85%, Banner 85%, HTML/CSS Design 80%, Poster 80%, Business Card 78%, Album/Book 72%
- Video skills: YouTube 85%, Facebook 80%, Short Videos 80%, Ads 70%, Animation 60%
- Tools: VS Code 95%, Browser DevTools 82%, GitHub 78%, Tailwind 72%, Firebase 70%, Figma 65%, Sheets API 62%, Odoo 55%
- Note box (sticky on desktop) shows context for each tab

#### `AboutLanguages.jsx` — Same animation as home Skills
- Uses identical staggered `setTimeout` + Framer Motion `animate.width` pattern as `home/Skills.jsx`
- Left column: label + intro + proficiency legend
- Right column: flag + bar rows

#### `AboutValues.jsx` — 3/2/1 responsive grid
- `grid-template-columns: repeat(3, 1fr)` at >900px
- `repeat(2, 1fr)` at 560–900px
- `1fr` at <560px — cards switch to horizontal layout (icon + text side by side) for compact mobile display

#### `AboutGoals.jsx` — copy-4 cards + progress bars added
- Cards: color top bar + icon header + 4-item checklist (same as copy-4)
- **Progress bars added at card bottom:** Short-term 85%, Mid-term 50%, Long-term 25%
- Same animated bar pattern (useInView + setTimeout + Framer Motion width)

#### `AboutConnect.jsx` — copy-2 style, enhanced light/dark
- **Featured row:** GitHub, LinkedIn, YouTube as large cards (hover: icon bg fills with platform color, white icon)
- **Grid row:** 7 other platforms as smaller cards with left accent bar
- `--c` CSS var per card for platform color (hover effects driven by it)
- Profile URL display at bottom
- Full light/dark mode: `.card` gets `background: var(--bg-page)` in light mode

---

### Global Fixes

#### Click Effect (`src/index.css`)
**Before:** Complex blur + mix-blend-mode ripple.

**After:** Clean minimal ripple — dark mode: subtle white glow; light mode: clean accent-color ink drop. Removed `mix-blend-mode` (was causing rendering issues in light mode). Added `button:not(:disabled):active` press scale feedback.

#### `CLICKABLE_SELECTOR` in `App.jsx`
Added: `.badge`, `.abv-chip`, `.abs-cv-chip`, `.abh-pill`, `.abh-btn-primary`, `.abh-btn-secondary` to the click-effect host selector.

#### Same-page link scroll-to-top (`App.jsx`)
`ScrollToTop` component extended with a `document.addEventListener('click')` handler. When a link points to the **same pathname** as the current page (no hash), `e.preventDefault()` + `window.scrollTo({ top: 0, behavior: 'smooth' })`. No reload, no navigation re-trigger.

#### `Skeleton.jsx` — Layout-aware improvements
- **`hero` layout** now mirrors actual Home hero: text left + image right placeholder, fact pill row, social icons row, skills section stub
- **`profile` layout** now mirrors About page: about hero, story grid, skills with tab stubs, goal cards with progress bar shapes
- Added `SkeletonSkillBar` and `SkeletonSectionHeader` reusable shapes
- All skeletons use staggered `animationDelay` for polished wave effect

---

### CSS Prefix Reference (for future AI)

| Prefix  | File                   |
|---------|------------------------|
| `abh-`  | AboutHero.jsx          |
| `abs-`  | AboutStory.jsx         |
| `abt-`  | AboutTimeline.jsx      |
| `absk-` | AboutSkills.jsx        |
| `abl-`  | AboutLanguages.jsx     |
| `abv-`  | AboutValues.jsx        |
| `abg-`  | AboutGoals.jsx         |
| `abc-`  | AboutConnect.jsx       |
| `cta-`  | SiteCTA.jsx (shared)   |
| `hero-` | home/Hero.jsx          |

---

### Important Notes for Next AI (v2.3.3+)
- **About page is now split** — never edit `pages/About.jsx` for section content. Edit the relevant `components/about/[name].jsx` file.
- **CTA is now `components/shared/SiteCTA.jsx`** — `home/CTA.jsx` still exists but is now just a reference copy. Both Home and About import from `shared/SiteCTA.jsx`.
- `flagcdn.com` flag images require internet — runtime `<img>` tags, no build dependency.
- Hero padding fix: **outer section** has `min-height + flex + align-items: center`. **Inner grid** only has `padding-top: calc(--navbar-h + 2rem)`. Do not add `min-height` back to the inner container.
- Timeline dot size: 28px, icon `.65rem` — small by design. Do not enlarge without user request.
- Goals progress: Short 85%, Mid 50%, Long 25% — these are fixed design values representing rough completion of each roadmap phase, not real tracked progress.
- Skills percentages for Design/Video/Tools tabs are **self-rated estimates** added for layout consistency — do not treat as precise metrics.
