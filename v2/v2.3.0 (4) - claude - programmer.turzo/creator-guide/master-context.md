# master-context.md — v2.3.0
> Portfolio: mdturzo.web.app | React + Vite + Firebase + Tailwind
> Last Updated: 2026-05-24

---

## Version History (recent)

| Version | Summary |
|---|---|
| v2.2.8 (4) | Hero polish, navbar fixes, GitHub redesign, journey timeline, compact skills |
| v2.2.9 | Alignment/margin fixes, Hero (Turzo) absolute, GitHub full redesign, navbar tooltip + mega-close, project cards redesign, My Setup update, click effects, bullet fixes |
| **v2.3.0** | **Full About page built — hero, story, education timeline, skills (tabbed), languages, values, goals, CTA** |

---

## v2.3.0 Change Log

### About Page (`src/pages/About.jsx`) — Full Build

**Complete replacement of the placeholder About page.** Now a fully featured, multi-section page pulling all info from `about.md`.

#### Section 1 — Page Hero
- Breadcrumb nav (Home / About)
- Profile photo from `/muhtasim-about.webp` with gradient overlay
- Name, greeting badge, hero title ("Self-taught developer from Bangladesh")
- Bio paragraph with age auto-calculated from `calculateAge()`
- Quick facts row: Location, School (SSC-26 · SGSC), Goal (CSE Engineer), Age · Muslim
- Social icons: GitHub, LinkedIn, Facebook, Instagram, Telegram, Email
- CTA buttons: "Get In Touch" → /contact, "View Projects" → /projects
- 3 floating animated cards: 3+ Yrs Dev, 6+ Yrs Design, 16+ Projects
- Animated background orbs
- Scroll hint arrow

#### Section 2 — My Story
- 2-column layout (text + story cards)
- Left: section label + heading + styled blockquote (verbatim from about.md)
- Right: 3 story cards — Early Spark, Learning in Progress, What's Next
- Framer Motion staggered animations

#### Section 3 — Education Timeline
- Vertical timeline with 6 entries from about.md
- Each entry: school name, level, period badge, description
- Current entry (SSC-26) highlighted with pulse dot and accent border
- Framer Motion `useInView` animations per item

#### Section 4 — Skills (tabbed)
- 4 tabs: Programming | Design | Video | Tools
- **Programming tab:** 7 skill bars (AI 90%, HTML 80%, CSS 80%, Git 78%, Python 60%, JS 45%, Java 35%) with note texts, animated on scroll via `useInView`
- **Design tab:** 7 design skill cards in a grid (Logo, Banner, Thumbnail, Business Card, Poster, Album/Book, HTML/CSS Design)
- **Video tab:** 5 video skill items (YouTube, Facebook, Ads, Shorts, Basic Animation)
- **Tools tab:** 8 tool cards in 4-col grid (VS Code, GitHub, Firebase, Google Sheets API, DevTools, Adobe Suite, Figma, Tailwind)

#### Section 5 — Language Proficiency
- 2-column layout
- 4 language bars with `whileInView` animated fills: Bengali (Native 100%), English (65%), Hindi (55%), Urdu (45%)

#### Section 6 — Values & Personality
- 5 value cards: Islam First, Discipline, Beneficial Knowledge, Honesty, Perfection
- Interests & Hobbies chip row (8 items): Prayer, Coding, Outdoor Games, Cycling, Travelling, Reading, Learning, Editing

#### Section 7 — Goals & Plans
- 3 goal cards: Short-Term (2026), Mid-Term (2026–2028), Long-Term (Future)
- Each with icon, period, subtitle, and 4 bullet points

#### Section 8 — CTA
- "Interested in working together?" CTA with gradient background orb
- Buttons: Get In Touch → /contact, See My Work → /projects

### Config (`site.config.js`)
- Version bumped to `v2.3.0`

---

## Architecture Notes

### File Map
```
src/
  pages/
    About.jsx           ← v2.3.0 (FULL BUILD — was placeholder)
  components/
    home/
      Hero.jsx          ← v2.2.9 (unchanged)
      AboutMini.jsx     ← v2.2.9 (unchanged)
      GithubStats.jsx   ← v2.2.9 (unchanged)
      RecentProjects.jsx← v2.2.9 (unchanged)
      Process.jsx       ← v2.2.9 (unchanged)
      Skills.jsx        ← v2.2.8 (unchanged)
      Stats.jsx         ← v2.2.8 (unchanged)
      Services.jsx      ← v2.2.8 (unchanged)
      CTA.jsx           ← v2.2.8 (unchanged)
    layout/
      Navbar.jsx        ← v2.2.9 (unchanged)
      Footer.jsx        ← v2.2.8 (unchanged)
  config/
    site.config.js      ← v2.3.0 (version bump)
  index.css             ← v2.2.9 (unchanged)
```

### Key Design Tokens (unchanged)
- Max container: 1120px (`--container-max`)
- Container padding: `clamp(1rem, 4vw, 1.75rem)`
- Navbar height: 68px (`--navbar-h`)
- Float nav threshold: 420px scroll
- Section padding: `clamp(3rem, 8vw, 6rem)`

### About Page Architecture Details
- All styles are in a `<style>` tag at the bottom of `About.jsx` (classname prefix: `ab-`)
- Age is auto-calculated via `calculateAge()` from `site.config.js`
- Skills animation: `useInView` hook from framer-motion watches `skillsRef` → `SkillBar` components receive `inView` prop and stagger their bar animations
- Education: `TimelineItem` component uses its own `useInView` ref for per-item entrance animation
- No hardcoded data that should be in Supabase — this is mostly static personal info from `about.md`
- `btn-primary` and `btn-secondary` classes defined in About.jsx styles only (not global)

### GitHub API Notes (unchanged)
- Endpoint: `https://api.github.com/users/muhtasim-rahman`
- Rate limit: 60 req/hr unauthenticated
- Retry strategy: 3× at 5s → then 1hr cooldown
- Streak API: `github-readme-streak-stats.herokuapp.com`
- Grade API: `awesome-github-stats.azurewebsites.net`

---

## Data Reference — About Page Static Data

```js
// DEV_SKILLS
AI Tools: 90% | HTML: 80% | CSS: 80% | Git/GitHub: 78% | Python: 60% | JS: 45% | Java: 35%

// LANGUAGES
Bengali: 100% (Native) | English: 65% (Intermediate) | Hindi: 55% (Conversational) | Urdu: 45% (Conversational)

// EDUCATION timeline
St. Geroza School → Tulshiram Primary → Lions School → SGSC (2021-present, SSC-26 current)
```

---

## Commit Message

```
v2.3.0 — Full About page

1. ABOUT (full build): page hero with photo, breadcrumb, bio, quick facts, social links, CTAs; story section with blockquote + 3 narrative cards; education vertical timeline (6 entries, SSC-26 highlighted as current); skills tabbed panel (Programming/Design/Video/Tools) with animated bars and grid cards; language proficiency bars (Bengali/English/Hindi/Urdu); values & personality grid (5 values + 8 interest chips); goals & plans 3-column (short/mid/long term); CTA section
2. CONFIG: version bumped to v2.3.0
3. All Framer Motion animations: staggered entrance, scroll-triggered (useInView), floating cards
4. All icons: Font Awesome only, zero emoji
5. Full light + dark theme support via CSS variables
```
