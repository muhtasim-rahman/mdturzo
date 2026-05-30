
## v2.3.5 — About Page Polish: Timeline, Hero, Story CV, Hobbies, Skills, Goals, Values (2026-05-29)

### Changed
- **AboutTimeline:** Arc wider (RADIUS 260→310, arcW 700→880), dots larger (sizes 38/28/20/15, active 44), detail card more compact, prev/next nav arrows moved to left & right OUTSIDE the card, year labels repositioned below dots
- **AboutHero:** Removed floating age badge div, 'Turzo' badge nudged 2px up + 3px left (`position:relative; top:-2px; left:-3px`), removed extra 34px breadcrumb padding from section top (now `padding-top: var(--navbar-h)` only)
- **AboutStory:** CV card shows `/logo.webp` site logo image instead of plain 'CV' text badge; personal details rows gain subtle `bg-surface-2` hover background
- **AboutValues:** Hobbies chips get `data-click-fx-ignore="true"` — only the parent container card fires click burst effect; mobile card layout now wraps title+desc in `.abv-text-col` div so they stack correctly in flex-row
- **AboutSkills:** Note card (`.absk-note-card`) hover suppressed with `!important` overrides — lift and shadow are disabled; click burst effect still works
- **AboutGoals:** Grid changed to `repeat(3, 1fr)` ≥750px, `1fr` below — always 3-in-a-row on desktop, each card full-width on mobile
- **App.jsx:** `.click-fx` CSS utility class added to `CLICKABLE_SELECTOR` — any element with this class gets click burst effect
- **index.css:** `.click-fx { cursor: pointer; }` utility class documented and defined
- **site.config.js / package.json:** Version bumped to `v2.3.5`

---

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

## v2.3.0 — About Page (2026-05-24)

Full About page built from scratch, visualizing all info from `about.md`.

### Added
- `src/pages/About.jsx` — complete About page with 10 sections:
  1. **About Hero** — Photo, name, tagline, quick facts badges (location, age, religion, education, email), hire/CV/social CTAs
  2. **Bio & Story** — Self-written quote block + expanded personal story narrative
  3. **Experience Stats** — 4 animated stat cards: years dev, design, video editing, projects (Supabase-driven)
  4. **Technical Skills** — 7 programming skill bars with %, tools grid, language proficiency bars (4 languages)
  5. **Design & Creative** — Graphic design list + video editing list with skill notes
  6. **Education Timeline** — Alternating left/right timeline from nursery (2013) through current SSC-26 and future CSE dream
  7. **Values & Personality** — 6 value cards + hobbies/interests chips
  8. **Goals & Future Plans** — 3 goal cards: Short/Mid/Long term with checklist items
  9. **Services** — 3 service cards: Website, Graphic Design, Photo/Video
  10. **CTA** — "Have a project in mind?" contact banner

### Changed
- `src/config/site.config.js` — version bumped to `v2.3.0`
- `package.json` — version bumped to `2.3.0`
- `creator-guide/master-context.md` — v2.3.0 section added

### Design notes
- All animations via Framer Motion `useInView` for scroll-triggered entrance
- Responsive: grid layouts collapse at `≤900px` breakpoints
- All data uses `useSiteSettings` hook for dynamic stats
- No emojis anywhere — Font Awesome icons throughout
- Dark/light theme via CSS variables
