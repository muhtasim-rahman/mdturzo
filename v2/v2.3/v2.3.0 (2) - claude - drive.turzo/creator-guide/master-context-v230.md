# master-context.md — v2.3.0
> Portfolio: mdturzo.web.app | React + Vite + Firebase + Tailwind
> Last Updated: 2026-05-25

---

## Version History (recent)

| Version | Summary |
|---|---|
| v2.2.8 | Hero polish, navbar fixes, GitHub redesign, journey timeline, compact skills |
| v2.2.9 | Margin/alignment fixes, hero (Turzo) absolute, GitHub full redesign, navbar tooltip fix + mega-close, project cards redesign, My Setup info update, click effects, bullet fixes |
| **v2.3.0** | **Full About page — all 12 sections, all data from about.md visualized** |

---

## v2.3.0 Change Log

### New File: `src/pages/About.jsx` — Complete Build

**12 sections, all data from about.md:**

1. **Banner Hero** — animated h1, breadcrumb nav, availability badge (from useSiteSettings), age/location/status pills; dot-grid background with animated color orbs; `max-width:680px` content block

2. **Profile + Quick Facts** — left: `muhtasim-about.webp` photo card (aspect-ratio 3/4, gradient bg, caption overlay, floating animated Developer/Designer badges); right: section label, h2 with text-gradient, 2-para bio, 6 fact cards in 2-col grid, CTA buttons row

3. **Stats Row** — 4 count-up stat cards: Web Dev yrs, Design yrs, Video Editing yrs (hardcoded 5), Projects count; all dynamic from `useSiteSettings`; skeleton loading while fetching; `useInView` trigger on parent ref

4. **My Story** — self-written bio from about.md in left `<blockquote>` with left border accent + decorative `"` watermark; right: 4 detail cards (Beginning / Journey / Right Now / Mission)

5. **Education Timeline** — vertical timeline with `::before` connecting line; 6 entries: St. Geroza (twice), Tulshiram, Lions, SGSC (Class 6-10), SGSC SSC-26 (active, with "Current" badge); each has colored dot + institution + class + years

6. **Skills (Tabbed)** — 3 tabs: Programming (star ratings via `StarRating` component + animated % bars for 7 skills), Design (8 badge pills), Video Editing (5 badge pills); "Currently learning" tag row below; `AnimatePresence` tab transitions; self-rating note card

7. **Tools Grid** — 2-col mobile / 4-col desktop; 8 tools with colored dot + name + description

8. **Language Proficiency** — `max-width:640px` container; 4 rows (Bengali 100%, English 65%, Hindi 52%, Urdu 42%); animated bar fill on scroll into view

9. **Values & Interests** — 2/3-col grid of 6 value cards (colored icon, title, desc); interests row below with 8 tag pills

10. **Goals** — 3-col on desktop; each card: icon, phase, timeframe, checklist items, progress bar (75%/35%/10%)

11. **Social Links** — 4-col grid; 8 platforms (Facebook, Instagram, YouTube, X, LinkedIn, TikTok, Telegram, GitHub); hover with `--sc` CSS var for border color

12. **CTA** — centered card with orb bg; Contact Me (primary) + View Projects (outline) buttons

---

## Architecture Notes

### File Map (updated)
```
src/
  pages/
    About.jsx           ← v2.3.0 — FULL BUILD (was placeholder)
    Home.jsx            ← v2.2.9 (unchanged)
    Contact.jsx         ← placeholder (v2.6.0)
    [all others]        ← placeholders
  components/
    home/               ← v2.2.9 (unchanged)
    layout/             ← v2.2.9 (unchanged)
  config/
    site.config.js      ← v2.3.0 (version bump)
```

### Key Design Patterns (About page)
- All CSS scoped with `abt-` prefix to avoid conflicts with global styles
- Styles injected via `<style>` tag at bottom of component (matches existing pattern)
- Count-up: `useCountUp(target, active)` — runs once via `useRef` flag, triggered by `useInView`
- Star ratings: `StarRating({ rating })` renders solid/half/empty FA stars
- Skills tab state: `useState('programming')` — 3 tabs, `AnimatePresence mode="wait"`
- Dynamic data: `useSiteSettings()` for stats, `calculateAge()` for age, `SITE_CONFIG` for names/links
- Skeleton: shown on stats row while settings loading (matches global `.sk` shimmer class)
- Breadcrumb: `breadcrumbSchema()` from `utils/seo.js` → JSON-LD script tag
- No emojis: FA icons throughout (faFire for Discipline, faBullseye for Perfection, etc.)

### Design Tokens Used
- Max container: 1120px (`.container-xl`)
- Section padding: `clamp(3rem, 8vw, 6rem)` (`.section`)
- All colors via CSS variables: `var(--bg-surface)`, `var(--accent-primary)`, etc.
- Animations: Framer Motion `fadeUp`, `fadeLeft`, `fadeRight` variants + stagger

### Missing / Deferred
- About page has no Supabase data (fully static from about.md) — no new DB tables needed
- GitHub stats section was intentionally NOT added to About (already on Home page)
- Services section intentionally minimal (user said "confused about services") — contact CTA used instead
- `v2.3.0` SQL script: no new tables or schema changes required

---

## Key Design Tokens (global, unchanged)
- Max container: 1120px (`--container-max`)
- Container padding: `clamp(1rem, 4vw, 1.75rem)`
- Navbar height: 68px (`--navbar-h`)
- Float nav threshold: 420px scroll
- Section padding: `clamp(3rem, 8vw, 6rem)`

---

## Upcoming Versions
| Version | Plan |
|---|---|
| v2.4.0 | Projects page — grid/list toggle, filter, search; Project detail with like/dislike/views/comment/report |
| v2.5.0 | Feed page (merged Blogs + Posts) — pinned, filter, search, Reading Progress, ToC |
| v2.6.0 | Contact page — 3 form types, image upload, spam protection |

---

## GitHub API Notes (unchanged)
- Endpoint: `https://api.github.com/users/muhtasim-rahman`
- Rate limit: 60 req/hr unauthenticated
- Retry strategy: 3x at 5s → then 1hr cooldown

---

## User Decisions / Deviations from Master Prompt
- Blogs + Posts merged into `Feed` (user decision from prompt footer note)
- Max comments: 10/day per user with toast notification (user decision)
- `faStarHalfStroke` used for half-star (free solid icon available in FA 6.5.2)
