# master-context.md — v2.2.9
> Portfolio: mdturzo.web.app | React + Vite + Firebase + Tailwind
> Last Updated: 2026-05-24

---

## Version History (recent)

| Version | Summary |
|---|---|
| v2.2.8 (4) | Hero polish, navbar fixes, GitHub redesign, journey timeline, compact skills |
| **v2.2.9** | **Margin/alignment fixes, hero (Turzo) absolute, GitHub full redesign, navbar tooltip fix + mega-close, project cards redesign, My Setup info update, click effects, bullet fixes** |

---

## v2.2.9 Change Log

### Hero Section (`Hero.jsx`)
- `hero-inner` max-width aligned to 1120px (matches navbar + container-xl)
- **Large screen:** `(Turzo)` is now `position:absolute` below `.hname`, right-aligned — no extra line height consumed; `margin-top:.5em` added to `.hrole` on lg+
- `Muhtasim Rahman` — single `<span className="hname-main">`, color `#FFFFFF` dark / `var(--text-primary)` light (no accent split)
- `(Turzo)` always `var(--accent-primary)` (primary color as requested)
- **Gradient fix:** `.himg-frame::after` starts at `bottom:-5px` (prevents zoom gap)
- **Em dashes:** all `--` in text replaced with `—`
- **Mobile CV button:** `.hbtn-dl-text` hidden on `<640px`; both buttons stay in same row (nowrap)
- **Light mode greeting:** `[data-theme=light] .hgreet-salam` now uses `var(--accent-primary)` instead of amber
- **Large screen max-height:** `.hero` gets `max-height:960px` on `≥900px`

### About Section (`AboutMini.jsx`)
- `•` bullet separator: replaced `?` with `\u00b7` (`·`) in FACTS values
- Grid: removed `justify-items:center mx-auto` — sections now properly centred without right drift
- Age line: `?` → `&middot;`

### GitHub Stats (`GithubStats.jsx`) — Full Redesign
- **Profile card:** Left = avatar + name (clickable) + `@username` + joinDate + location + bio (single column). Right = 5 compact stat cards (Repos, Stars, Followers, Forks + a redirect card)
- **Redirect card:** distinct design — GitHub icon + "View on GitHub" label + arrow
- **Streak + Grade cards:** no border on images, background matches API (dark: `#0F172A`, light: `#FFFFFF`)
- **Trophy section removed**
- **Language bar:** kept, label updated to "Language Distribution"
- **Repo grid:** 6 desktop / 4 tablet / 3 mobile (was always 6)
- **API retry logic:** on failure → retry 3× at 5s intervals → then retry after 1hr (rate limit reset)
- **Skeleton loading:** full skeleton shown during load (profile, two-col, lang, repos shapes)
- **Theme-aware API URLs:** streak and awesome-github-stats use custom color params matching theme

### Navbar (`Navbar.jsx`)
- **HTML tooltips removed:** `title` attribute removed from `ThemeToggle`, `IconBtn`, `SignInBtn` — only CSS `data-nb-tip` tooltips remain
- **Tooltip centering fixed:** `[data-nb-right]` override now uses `left:50%; transform:translateX(-50%)` instead of right-aligned
- **Mega nav scroll-close:** new `useEffect` that attaches scroll listener when `megaOpen`, calls `setMegaOpen(false)` on any scroll
- **Mega nav backdrop close:** full-screen transparent `div` behind mega panel at `z:9999` — clicking left/right empty space closes menu
- **Click-outside handler:** removed mega from handler (now handled by backdrop); notif + user dropdowns still handled by mousedown

### Project Cards (`RecentProjects.jsx`) — Full Redesign
- Minimal, content-first layout — no thumbnail header area
- Accent top border line using card's color
- Header row: category pill + external link buttons (GitHub, Live)
- Clean title + 3-line description + tag row
- Footer: accent dot + category label + "View details →" CTA
- **Click effect:** `.pcard:active { transform: scale(.97) }`
- Repo count: 6 lg / 4 tablet / 3 mobile (unchanged grid)

### My Setup & Workflow (`Process.jsx`)
- Tools updated to real stack: VS Code, Git & GitHub, HTML/CSS/JS, Firebase, Google Sheets, Figma, Adobe Suite, Tailwind CSS
- Section tagline: "Self-taught and self-driven — the tools and habits behind every project I ship."
- Editor stats: "Firebase / GitHub Pages" (hosting), "Git + GitHub" (version control)
- Light mode: already supported via `[data-theme="light"] .mws-editor`

### Global (`index.css`)
- `.card:active` scale effect added
- Button active scale rules for primary/secondary buttons
- `#about-mini .container-xl` padding fix for proper centering

### Config (`site.config.js`)
- Version bumped to `v2.2.9`

---

## Architecture Notes

### File Map
```
src/
  components/
    home/
      Hero.jsx          ← v2.2.9 (major changes)
      AboutMini.jsx     ← v2.2.9 (bullet fix, grid fix)
      GithubStats.jsx   ← v2.2.9 (full redesign)
      RecentProjects.jsx← v2.2.9 (full redesign)
      Process.jsx       ← v2.2.9 (info update)
      Skills.jsx        ← v2.2.8 (unchanged)
      Stats.jsx         ← v2.2.8 (unchanged)
      Services.jsx      ← v2.2.8 (unchanged)
      CTA.jsx           ← v2.2.8 (unchanged)
    layout/
      Navbar.jsx        ← v2.2.9 (tooltip, mega fixes)
      Footer.jsx        ← v2.2.8 (unchanged)
  config/
    site.config.js      ← v2.2.9 (version bump)
  index.css             ← v2.2.9 (click effects, about fix)
```

### Key Design Tokens
- Max container: 1120px (`--container-max`)
- Container padding: `clamp(1rem, 4vw, 1.75rem)`
- Navbar height: 68px (`--navbar-h`)
- Float nav threshold: 420px scroll
- Section padding: `clamp(3rem, 8vw, 6rem)`

### GitHub API Notes
- Endpoint: `https://api.github.com/users/muhtasim-rahman`
- Rate limit: 60 req/hr unauthenticated
- Retry strategy: 3× at 5s → then 1hr cooldown
- Streak API: `github-readme-streak-stats.herokuapp.com` (custom color params)
- Grade API: `awesome-github-stats.azurewebsites.net` (level card, nightowl/default theme)

---

## Commit Message (suggested)
```
v2.2.9 — Alignment, GitHub redesign, navbar fixes, project cards, setup update

1. HERO: max-width 1120px; (Turzo) absolute-positioned below name (lg), primary color; single white name span; gradient -5px; em dashes; mobile CV icon-only; light mode greeting fixed; max-height 960px on lg+
2. ABOUT: bullet chars fixed (u00b7); grid drift fixed (removed justify-items:center); age line middot
3. GITHUB: profile card redesign (avatar+info left, 5 stat cards right); removed trophies; image panels no-border, theme-matched bg; repo grid 6/4/3 responsive; skeleton loading; 3x retry + hourly fallback
4. NAVBAR: title attr removed (only data-nb-tip CSS tooltips); tooltip centered for all buttons; mega closes on scroll; backdrop div closes mega on side-click; click-outside simplified
5. PROJECTS: full minimal redesign — accent top line, content-first, no thumbnail header, click scale effect
6. SETUP: tools updated to real stack; tagline updated; hosting info real
7. GLOBAL: card + button active scale; about section centering fix; version → v2.2.9
```
