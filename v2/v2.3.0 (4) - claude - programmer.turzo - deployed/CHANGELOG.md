
## v2.2.9 — Section Alignment, GitHub Redesign, Navbar Fixes, Project Cards, Setup Update

### Fixed
- **Alignment:** All sections now use consistent `max-width:1120px` padding via `container-xl`; hero inner width matched to same value
- **Hero:** `(Turzo)` moved to own line on large screens (absolute/block below name), primary-color; `Muhtasim Rahman` in single white span (no accent split)
- **Hero:** Bottom gradient starts from `bottom:-5px` to prevent gap when zoomed
- **Hero:** `--` dashes replaced with `—` (em-dash) throughout
- **Hero:** Small screen Download CV button: "Download" text hidden on `<480px`, both buttons in same row (no wrap)
- **Hero:** `Assalamu Alaikum` greeting + waving hand: better light-mode colors (blue salam, amber hand)
- **About:** Bullet separator `?` fixed — now uses unicode `•` (U+2022) correctly
- **Navbar:** HTML `title` attr removed from all icon buttons (was showing both native tooltip AND CSS tooltip)
- **Navbar:** CSS tooltip now perfectly centered below button (`left:50% translateX(-50%)`) in all positions including right cluster
- **Navbar:** Mega nav auto-hides when scrolling past navbar area (scroll > FLOAT_THRESHOLD + 60)
- **Navbar:** Clicking empty space left/right of mega panel closes it

### Changed
- **GitHub section:** Complete redesign
  - Profile card: avatar + center column (name/username/join date/location/bio) + right column of 5 compact cards (Repos, Stars, Followers, Forks + Profile redirect card)
  - GitHub Trophies section removed
  - Streak + Profile Grade: transparent background images on panels; light mode white bg, dark mode theme-matched; no image border
  - Top repos: 6 desktop, 4 tablet, 3 mobile (via CSS nth-child)
  - API retry: skeleton loading during fetch, auto-retry 3x at 5s intervals, then countdown to rate-limit reset with auto-retry
- **Projects:** Cards completely redesigned — minimal/professional look, no large thumbnail, top accent line on hover, category chip, clean title/desc, tag pills, themed footer with arrow, click effect (`active:scale(.97)`)
- **Setup:** Updated with Muhtasim's actual tools (VS Code, Git, Firebase, Google Sheets API, JS, HTML/CSS, Photo/Video editing, Browser DevTools) and real principles
- **Buttons/Cards:** Global `active:scale` click effects on all buttons and `.card` elements
- **Version:** Bumped to `v2.2.9`



### Fixed
- **Navbar:** Double search icon removed from `NavRight` (NavRight is desktop-only, mobile has inline buttons)
- **Navbar:** `lg:hidden` menu button removed from `NavRight` (same reason)
- **Navbar:** Mega menu now renders as a single instance outside both `<nav>` elements — eliminates double-panel bug when floating navbar is visible
- **Navbar:** Outside-click on mega menu now reliably closes it (handler checks both `.mega-anchor` and `.mega-panel-wrap`)
- **Navbar:** CSS tooltips (`[data-nb-tip]::after`) now visible — `nb-icon-btn` changed from `overflow:hidden` to `overflow:visible`; ripple clipping moved to `RippleLayer` inner span; `title` attr added as native fallback
- **Hero:** `.himg-frame` on desktop fully transparent (no bg, no border, no shadow, no top bar, no inner gradient) — image floats naturally
- **Hero:** Hero image box height increased ~35px across all breakpoints
- **Hero:** "Available for hire" badge removed
- **Hero:** Tablet (640-899px): name displays as single line "Muhtasim Rahman (Turzo)"
- **Hero:** Mobile (<640px): "(Turzo)" on its own smaller line below
- **Hero:** Tablet/mobile circular frame: accent-tinted background added

### Changed
- **Skills:** Stat cards redesigned to compact/minimal — smaller padding, smaller numbers, no corner glow, label is uppercase tertiary text
- **Process/Setup:** "How I Work" 6-step section replaced with "My Setup & Workflow" — left tool grid + principles list, right VS Code editor mockup
- **GitHub:** Full section redesign — profile card (avatar ring, bio, location, join year, stat pills, view button), streak + stats side-by-side row (awesome-github-stats level card + readme-stats), trophies section (github-profile-trophy), top languages, top repos. Both image cards are theme-aware.

## v2.3.0 — Full About Page (2026-05-24)

### Added
- `About.jsx` — complete full-page build replacing placeholder:
  - Page Hero: profile photo, breadcrumb, bio, quick facts (location, school, goal, age), social icons row (GitHub, LinkedIn, Facebook, Instagram, Telegram, Email), CTA buttons, 3 animated floating stat cards (3+ Yrs Dev, 6+ Yrs Design, 16+ Projects), background orbs, scroll hint
  - My Story: blockquote from about.md + 3 narrative story cards (Early Spark, Learning in Progress, What's Next)
  - Education Timeline: 6-entry vertical timeline; SSC-26 highlighted as current with pulse animation
  - Skills (tabbed): Programming bars (7 items, animated on scroll), Design grid (7 items), Video list (5 items), Tools grid (8 items)
  - Language Proficiency: 4 animated bars (Bengali/English/Hindi/Urdu)
  - Values & Personality: 5 value cards + 8 interest/hobby chips
  - Goals & Plans: 3-column (Short/Mid/Long Term)
  - CTA: contact + projects links

### Changed
- `site.config.js` — version → `v2.3.0`
