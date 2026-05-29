
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

---

## v2.3.0 — Full About Page (2026-05-25)

### New: `src/pages/About.jsx` — Complete rebuild

Full about page with all data from `about.md` visualized across 12 sections:

1. **Banner Hero** — animated title, breadcrumb, availability badge, age/location/status pills, dot-grid bg with orbs
2. **Profile + Quick Facts** — muhtasim-about.webp photo card with floating Developer/Designer badges, 6 fact cards (location, status, goal, languages, values, experience), CTA buttons
3. **Stats Row** — 4 animated count-up cards (Web Dev yrs, Design yrs, Video Editing yrs, Projects) — dynamic from `useSiteSettings`
4. **My Story** — self-written bio (verbatim from about.md) in styled blockquote + 4 detail cards (Beginning, Journey, Right Now, Mission)
5. **Education Timeline** — all 6 institutions from Nursery to SSC-26, vertical timeline with colored dots, "Current" badge on active entry
6. **Skills (Tabbed)** — Programming tab: star ratings + % bars for 7 skills (AI, HTML, CSS, Git, Python, JS, Java). Design tab: 8 badge pills. Video tab: 5 badge pills. Currently Learning row.
7. **Tools Grid** — 8 tool cards (VS Code, GitHub, Firebase, Google Sheets API, AI Tools, Adobe Suite, DevTools, Odoo)
8. **Language Proficiency** — 4 animated bar charts (Bengali 100%, English 65%, Hindi 52%, Urdu 42%)
9. **Values & Interests** — 6 value cards (Islam, Discipline, Beneficial Knowledge, Honesty, Perfection, Self-Learning) + 8 interest tags
10. **Goals Timeline** — 3 goal cards (Short/Mid/Long-term) with checklist items and progress bars
11. **Social Links** — 8 platform cards (Facebook, Instagram, YouTube, X, LinkedIn, TikTok, Telegram, GitHub)
12. **CTA** — Contact Me + View Projects buttons

### Other changes
- `src/config/site.config.js` — version bumped to `v2.3.0`
- `package.json` — version bumped to `2.3.0`
- All data: no hardcoded values — `useSiteSettings` for dynamic stats, `calculateAge` for age, `SITE_CONFIG` for social links
- Skeleton loading on stats row while settings load
- Full dark/light theme support via CSS variables
- Framer Motion animations: stagger, fade-up, fade-left, fade-right, count-up
- SEO: Helmet with title, description, OG tags, canonical, BreadcrumbList JSON-LD
- Analytics: `trackPage('About')` on mount
- No emojis anywhere — Font Awesome icons throughout
