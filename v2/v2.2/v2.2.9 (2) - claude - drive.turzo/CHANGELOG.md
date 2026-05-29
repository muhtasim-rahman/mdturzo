# CHANGELOG — mdturzo.web.app Portfolio

---

## v2.2.9 — Comprehensive UI Polish & GitHub Redesign
**Date:** May 24, 2026

### 🔧 Fixes
- **About section (`•` encoding bug):** `?` characters were corrupted bullet separators — replaced with proper `·` middot in FACTS array (School, Languages, Values) and the age/location line
- **About section margin alignment:** Removed `justify-items:center` from the two-column grid that was shifting the right content column outward
- **Hero section alignment:** Unified `hero-inner` `max-width` to `1120px` (matching `container-xl`) and `padding-inline` to `clamp(1rem,4vw,1.75rem)` — left content now aligns with all other sections on large screens
- **Hero image gradient gap:** Bottom-to-top overlay now starts at `bottom:-5px` covering the 1-2px gap visible when zoomed in
- **Hero `--` em-dashes:** Replaced remaining `--` separators with proper `—` em-dashes throughout hero text
- **Navbar tooltips — dual-tooltip conflict:** Removed all `title=` HTML attributes from `nb-icon-btn` elements (hamburger buttons, theme toggle, sign-in); CSS `data-nb-tip` tooltips remain as the only tooltip system
- **Navbar CSS tooltip centering:** Changed `right: 0 / transform: translateY(...)` to `left: 50% / transform: translateX(-50%) translateY(...)` — tooltips now appear perfectly centered below each icon button
- **Mega nav scroll behavior:** Added `setMegaOpen(false)` to the scroll handler — mega nav closes on any scroll, preventing orphaned overlay when navbar transitions
- **Mega nav outside-click (left/right margins):** Added full-viewport invisible backdrop div behind `MegaMenu` at `z-index:9999`; clicking anywhere outside the panel closes the mega nav

### ✨ Hero Section Improvements
- **"(Turzo)" layout on large screens:** Now absolutely positioned `right: 0; top: calc(100% + .08em)` under "Muhtasim Rahman" — not on the same line; small/mid screens retain the previous stacked block layout
- **`min-height` for large screens:** Explicit `min-height: 100dvh` applied to `hero-inner` at `@media(min-width:1024px)`
- **Name markup unified:** "Muhtasim Rahman" is now a single `<span class="hname-full">` with uniform white/text-primary color; "(Turzo)" is `<span class="hname-turzo-block">` with `var(--accent-primary)` color
- **Mobile CTAs:** "Download" text hidden via `.hbtn-dl-text { display:none }` at `max-width:479px`; both buttons remain in the same row via `flex-wrap:nowrap`
- **Greeting color fix (light mode):** `.hgreet-salam` and `.hgreet-wave` use `var(--accent-primary)` in light mode instead of amber — better contrast on white backgrounds

### 🐙 GitHub Section — Full Redesign
- **Profile card redesigned:**
  - Left column: avatar (with online dot) + meta column (name → `@username` clickable → `·` join date → bio → location)
  - Right side: 5 compact stat cards in a row — Repos, Stars, Followers, Forks, + a distinct "View Profile" redirect card (GitHub icon)
  - Responsive: 3-column grid on tablet/mobile
- **Trophies section removed**
- **Streak & Profile Grade cards:**
  - API URLs now include dynamic `background` and `border` parameters per theme
  - Light mode: white/off-white background (`F7F9FC`); dark mode: themed dark (`0F172A`) matching site palette
  - Border removed from `<img>` elements (`border: none`)
  - Both cards placed in `gh-two-col` grid with proper panel labels
- **API rate-limiting solved:**
  - On 403/429: retries up to 3× every 5s; after 3 retries waits for `x-ratelimit-reset` header time before auto-retry
  - During any loading/retry: full skeleton layout shown (profile card skeleton + two grey boxes + repo skeletons)
  - Manual "Retry Now" button available during rate-limit wait
- **Repos:** 6 on desktop (3-col grid), 4 on tablet (≤900px, 2-col, hide 5th+6th), 3 on mobile (≤480px, 1-col, hide 4th+)
- **Language bar:** Preserved as-is
- **Repo cards:** Minimal text-only design — category badge, action icons, title, desc, tags, footer with arrow

### 🃏 Project Cards — Minimal Redesign
- Removed thumbnail image area — cards are now text-only, minimal, professional
- New layout: top accent line (on hover) → category badge + action icons → title → description → tech tags → footer (dot + "View details" + arrow)
- Hover: border color transitions to card accent, `translateY(-3px)` lift
- **Click/active effect:** `scale(0.97)` on press
- Action buttons (GitHub/Live) are compact `26×26px` squares, above the link overlay (`z-index: 2`)

### 🛠️ My Setup & Workflow — Full Rewrite
- Populated with real data from `about.md`: VS Code, Git & GitHub, Firebase, AI Tools, Browser DevTools, Google Sheets API
- Workflow steps: Learn → Plan → Build → Refine
- Two-column layout: left = "Daily Toolkit" setup cards, right = "How I Work" timeline + philosophy card
- Full light-mode support using `color-mix(in srgb, var(--accent-primary) ...)` for backgrounds/borders
- Responsive: stacks to single column at `768px`

### 🌐 Global Improvements
- **Universal click effects:** All `.card` elements get `active: scale(0.97)` with fast transition; `.nb-icon-btn:active` gets `scale(0.92)`; Button component already had `active:scale-[0.97]` on all variants
- **Encoding safety:** Fixed all `?` → `·` in AboutMini facts array

---

## v2.2.8 (4) — Combined Design
**Date:** May 2026
> Hero polish, Navbar fixes, Skills cards, Journey timeline, GitHub redesign [Deployed]

---

## v2.2.7
> Full card clickable, footer redesign, card hover refinements

---

## v2.2.6
> Navbar icon glass button styles, mega nav polish

---

## v2.2.5
> Skills section, process timeline, section alternating backgrounds

---

## v2.2.4
> Firebase auth integration, admin panel

---

## v2.2.3
> Blog, posts, projects dynamic data

---

## v2.2.2
> Alternating section backgrounds, section-alt

---

## v2.2.1
> About page, contact form, footer

---

## v2.2.0
> Major redesign — React migration, Tailwind, Firebase

---

## v2.1.x
> Odoo-based portfolio (mdturzo.odoo.com)

---

## v1.x
> Legacy portfolio (turzo.odoo.com, discontinued)
