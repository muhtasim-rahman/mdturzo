# Changelog

## v2.2.3 — Hero v2 + Navbar Polish + Multi-section Redesign (2025-05)

### Hero Section (full rewrite)
- Greeting: "Assalamu Alaikum <wave-icon> I am —" in signature italic+mono font (no badge pill)
- Name: "Muhtasim" (white, line 1) + "Rahman (Turzo)" (accent blue, line 2)
- Smoother typing animation (110ms type, 44ms delete)
- PC max-height fixed at 760px
- Floating icons: staggered random Y positions, kept away from round frame on tablet/mobile
- Round frame on both tablet AND mobile with ring-pulse animation (same effect as before)
- Hero image: never crops (overflow:visible on PC), height tracks left content
- Dual gradient layers: bottom-gradient under content (z:3) + soft veil above all (z:9, 15%)
- Futuristic SVG bottom bar: scan beams, animated dots, twin ellipse arcs
- Download CV button (uses cv_enabled setting)
- Social icons: hover lift+scale+shadow + handle tooltips
- Stats: primary-color FontAwesome Plus icon
- Premium scroll indicator: track + animated dot + label
- Richer background: 68 stars, 52 particles, 4 orbs

### Navbar
- Top navbar transparent on home page (merges with hero background)
- "Muhtasim" logo text no longer turns blue on hover
- Mega menu z-index raised — always above all page content (fixed on 404 and all pages)
- Navbar + footer + containers aligned to same 1.75rem padding

### Skills Section
- Redesigned with tab selector + animated bar panel
- Stat pills row at top with count-up animation
- Smooth AnimatePresence tab transitions

### About Mini
- Now uses `muhtasim-about.webp` instead of hero-back.webp
- Image larger on PC (lg:w-96)
- 6th card is "Read Full Story" link button — no separate standalone button

### GitHub Activity
- Completely redesigned 3-panel layout
- Panel 1: weekly commit bar chart + 4 mini stat icons
- Panel 2: language breakdown with stacked bar + animated legend bars
- Panel 3: full-width contribution graph (unchanged)

### CTA Section
- Fully replaced with minimal premium design
- Image overflows card top by 48px for premium feel
- Check-list of services, clean 2-col grid

### Bug Fixes
- `/home` route now renders same page as `/` (was redirect, now full content)
- Section alternating backgrounds corrected across all sections
- Mega nav z-index fixed for all pages including 404

### Smart Scroll Snap
- Sections snap smoothly when scroll stops near a boundary (80px threshold)
- Accounts for floating navbar height (68px offset)
- 420ms debounce, smooth behavior

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
