# Changelog

## v2.2.0 — Home Page Overhaul (2025-05)

### New Components
- **Hero** — Star canvas BG, typing animation, floating skill icons, orbit photo, stats count-up, social icons, available badge, CV button, scroll indicator
- **Stats** — Animated count-up cards, Supabase-driven data (yearsdev / yearsdesign / projects)
- **AboutMini** — Mini about on home page with quick facts, floating badges, CTA
- **Skills** — 4-category skill grid with progress bars and star ratings
- **Services** — 3 service cards (Web Dev, Design, Video Editing) with feature lists
- **RecentProjects** — Supabase-fetched featured projects (6), fallback static data
- **GithubStats** — GitHub stats, top languages, contribution streak via readme-stats API
- **Testimonials** — Supabase-fetched approved reviews, star ratings, fallback
- **BlogMini** — Latest 3 feed posts from Supabase, auto-hides if empty
- **CTA** — Glowing banner with hire + email buttons
- **CookieBanner** — Gdpr cookie consent, Supabase-controlled toggle, localStorage persistence

### New Hooks
- **useSiteSettings** — Supabase site_settings fetch with typed defaults, error fallback

### Updated Pages
- **Home.jsx** — Rebuilt: assembles all home sections, passes settings down, full SEO meta
- **About.jsx** — Full page: bio, timeline, tools, interests, CTA
- **Contact.jsx** — Full form with validation, worker email, success state, social links

### Other
- `site.config.js` → version bumped to v2.2.0
- `package.json` → version 2.2.0

---

## v2.1.5 — Previous
See git history.

---

## v2.2.2 — Hero Redesign + Home Polish (2025-05)

### Changed
- **Hero** — Full redesign based on v1.4.5 HTML template: wider left (3fr/2fr), "Assalamu Alaikum" chip, name split "Muhtasim Rahman" (accent) / "Mahmud (Turzo)", SVG floating icons, hero.webp, "View Projects" primary btn, HTML tooltip on buttons & socials, count-up stats from 0
- **Skills** — Merged "Experience & Impact" stats into Skills section; redesigned with compact layout
- **AboutMini** — Uses hero-back.webp; improved responsiveness
- **RecentProjects** — Added "View All Projects" bottom CTA button; tablet top-4, mobile top-3
- **Testimonials** — Renamed to "Reviews", added Give Review + View All buttons
- **GithubStats** — Fixed broken API embeds; uses ghchart.rshah.org + static stat cards
- **CTA** — Professional redesign with hero-sit.webp on right, photo overflows card top
- **Home** — Alternating section-alt backgrounds for visual texture; removed redundant Stats section
- **App.jsx** — Added `/home` → `/` redirect (fixes 404 on /home)
- **index.html + site.config** — OG image changed to preview.webp (fixes social share preview)
- **index.css** — Added scroll-padding-top: 80px, .section-alt, .hero-bottom-fade

### New public assets
- `public/hero.webp` — Hero section photo
- `public/hero-sit.webp` — CTA section photo
- `public/hero-back.webp` — AboutMini section photo
- `public/preview.webp` — OG/social share preview image
- `public/icons/html5.svg`, `css3.svg`, `python.svg`, `vscode.svg`, `design.svg` — Floating tech icons

### Version
- `package.json` → 2.2.2
- `site.config.js` → v2.2.2

---

## v2.2.3 — Hero Full Rework + Alignment + Nav Fixes (2025-05)

### Hero
- Salam chip: `Assalamu Alaikum <icon> I am —` (signature monospace, no badge)
- Name: "Muhtasim" (accent) / "Rahman (Turzo)"
- Typing: slower, smoother (95ms type, 42ms delete, 2400ms pause)
- Buttons: "View Projects" + "Download CV" (always shown, links admin CV if enabled)
- Socials: hover effect (primary bg, shadow, lift)
- Stats: `+` in accent color, count-up only once via useRef flag
- Gradients: 80% bottom-layer (z:3, over image), 15% full-overlay (z:6)
- PC max-height: 760px
- Tablet/mobile: circular frame with ring-pulse border animation (from html template)
- Hero image: unconstrained width, height = left content height, never cropped
- Floating icons: staggered positions left/right, 30px+ away from frame on tablet/mobile
- Bottom futuristic bar: 2D SVG hologram ring with rising particles (no 3D)
- Scroll button: premium track+dot style, smooth scroll on click

### Layout Alignment
- Navbar, float-nav, mega panel: max-width 1120→1280px matching container-xl
- Navbar padding: clamp(1rem,4vw,2rem) matching body sections
- Footer nf-inner: 1120→1280px

### Navbar
- Main nav z-index → 9999, float-nav wrapper → 9999
- Mega panel z-index → 99999 (always above 404 + all page content)
- Mega panel: backdrop-filter blur(20px) glass effect added
- float-nav: overflow:visible confirmed

### Skills
- count-up: runs only once (useRef flag), never regresses
- Removed star ratings; clean % bars with value label
- Compact card design with hover border

### Sections
- Alternating bg: Skills=alt, About=plain, Services=alt, Projects=plain, Reviews=alt, Github=plain, Blog=alt, CTA=plain

### Assets
- AboutMini: uses `muhtasim-about.webp`
