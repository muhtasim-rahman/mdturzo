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
