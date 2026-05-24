
## v2.2.9 — Margin Fix, GitHub Redesign, Hero Polish, Project Cards, Navbar Fixes, Setup Update

### Fixed
- **AboutMini:** `•` (bullet) separators were rendering as `?` — replaced with proper `·` Unicode middle dot in all fact card values and age/location text
- **Services:** `--` dashes in description text replaced with em dashes `—`
- **Navbar:** CSS tooltip (`[data-nb-tip]::after`) position fixed — now correctly centered below button (was right-aligning to button edge in `[data-nb-right]` context)
- **Navbar:** Mega nav now auto-closes when scrolling past float threshold (when floating navbar appears)
- **Navbar:** Clicking empty left/right space outside the mega nav panel now closes it
- **Hero:** `"Muhtasim Rahman"` and `"(Turzo)"` unified — name in single `<span>` (white), `(Turzo)` in primary accent color; absolute positioned bottom-right of name on large screens, inline on mobile/tablet
- **Hero:** `--` dashes in bio/greeting replaced with em dash `—`
- **Hero:** `min-height` now explicitly set for large screens only (not tablet/mobile)
- **Hero:** Hero image bottom gradient starts `5px` below image bottom (prevents gap on zoom)
- **Hero:** Mobile — "Download" text hidden on xs screens; both CTA buttons stay in same row
- **Hero:** `Assalamu Alaikum` greeting — waving hand icon and text now use accent color in light mode (was amber-only which looked off in light theme)
- **Hero:** Left content padding now matches `container-xl` (1120px max-width, same clamp padding) — consistent alignment with all other sections

### Changed
- **GitHub Section:** Profile card fully redesigned — left column shows avatar, full name, clickable `@username`, `•` join date, bio; right side has 5 compact vertical stat cards (Repos, Stars, Followers, Forks + Profile redirect card)
- **GitHub Section:** Streak and Profile Grade image panels: no border, bg is `var(--bg-surface-2)` dark / pure `#ffffff` light — cleaner rendering; images use `border: none`
- **GitHub Section:** Trophies section removed entirely
- **GitHub Section:** API rate-limit handling improved — skeleton loading during fetch, auto-retries 3× every 5s, then 60s wait + retry; manual Retry Now button always available
- **GitHub Section:** Repos grid: 6 desktop / 4 tablet / 3 mobile (hidden via CSS `:nth-child`)
- **Projects:** Cards completely redesigned — minimal, professional layout: top accent line on hover, icon+category badge header, clean title/desc/tags, bottom CTA row with arrow; active click scale effect added
- **Process/Setup:** Updated with Turzo's actual tools (VS Code, Git/GitHub, HTML+CSS, Firebase, Tailwind, Graphic Design, Video Editing, PWA); principles updated to reflect real values; "Currently learning" row added; light mode styling improved
- **Global:** Click effects (`active:scale`) added globally for `.card` and `[data-click-fx]` elements (excludes plain anchor text)


## v2.2.8 — Hero Polish, Navbar Bug Fixes, Skills Compact, Setup Section, GitHub Redesign

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
