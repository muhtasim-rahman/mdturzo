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
