# mdturzo.web.app — Master Context

**Stack:** React 18 + Vite + Tailwind + Framer Motion + Zustand
**Backend:** Supabase (PostgreSQL + RLS) + Firebase (Auth + RTDB + Hosting)
**Repo:** `muhtasim-rahman/mdturzo`
**Worker:** `portfolio.programs-turzo.workers.dev`
**Dev email:** `mdturzo.dev@gmail.com`

---

## Version History

### v2.4.5 — Structural Cleanup + DevBanner + Bug Fixes
**Date:** 2026-06-04

#### Changes

**1. DevBanner — complete redesign (`src/components/ui/DevBanner.jsx`)**
- Removed dark/danger amber style; replaced with a neutral, minimal, info-style strip
- Uses `--bg-surface`, `--border-color`, `--accent-primary` — fits both light/dark themes
- Progress pill (37%) with a thin fill bar + percentage label
- Dismiss stores timestamp in localStorage (hidden for 3 days)
- Animates in/out with Framer Motion height collapse
- Responsive: hides sub-text and pill below 540px

**2. Layout fix — DevBanner now truly above Navbar (`src/components/layout/Layout.jsx`)**
- Root `min-h-screen` div now has two layers:
  - `<DevBanner />` — outer, renders first in normal flow
  - `<div className="relative flex-1 flex flex-col">` — inner wrapper gives Navbar its `position: absolute` containing block
- This means on home/about pages (where Navbar is `absolute top-0`), the Navbar is contained within the inner div, so it can never visually overlap the DevBanner

**3. Component folder restructure**
- `shared/` cleaned to only truly cross-page components:
  `AdminQuickActions`, `Breadcrumb`, `CommentSection`, `LikeDislike`, `ReportButton`, `ShareButtons`, `SiteCTA`, `VisibilityGuard`
- **Deleted from `shared/`** (were project-specific duplicates, real versions already in `projects/`):
  `ImagePreviewModal.jsx`, `ImageViewer.jsx`, `ProjectCarousel.jsx`, `RelatedContent.jsx`, `RelatedProjectsRow.jsx`
- **Deleted from `home/`** (unused/duplicates):
  `RecentProjectsOrginal.jsx`, `BlogMini.jsx`, `Stats.jsx`, `CTA.jsx` (consolidated into `shared/SiteCTA.jsx`)
- **Deleted:** `layout/Navbar.jsx.patch` (development artifact)
- **Created stub folders:** `components/contact/`, `components/feed/` with `README.md` (v2.6 and v2.5 planned)

**4. Page-specific CSS files**
- `src/components/projects/projects.css` — extracted from `index.css`:
  `.proj-page-grid`, `.proj-card`, `.prose-content` (full TipTap styles), `.proj-detail-sidebar`
  Imported in `ProjectsPage.jsx` and `ProjectDetailPage.jsx`
- `src/components/home/home.css` — extracted `.rp-grid`
  Imported in `RecentProjects.jsx`
- `src/index.css` — retains global + shared utilities:
  `.pt-navbar` (NEW — was missing, caused layout bug), `.breadcrumb-nav`, `.bc-link`, `.share-panel`, `.comment-card`, `.scrollbar-none`

**5. Bug fix — `.pt-navbar` class was undefined**
- Added `.pt-navbar { padding-top: var(--navbar-h); }` to `index.css`
- Was used in `Layout.jsx` for non-home pages but never defined anywhere

**6. RecentProjects — removed all static fallback data (`src/components/home/RecentProjects.jsx`)**
- Deleted `STATIC_FALLBACK` array entirely
- When DB returns no results: shows a minimal `EmptyPlaceholder` with retry button
  (wrench icon, "No projects yet", "Featured projects will appear here once they're published.")
- Loading state: skeleton grid (no fake data)
- Responsive count: 6 on ≥1024px / 4 on ≥640px / 3 on mobile

**7. Live project count from DB (`src/services/supabase.js`, `src/hooks/useSiteSettings.js`)**
- Added `getProjectCount()` to `supabase.js` — counts rows with `status=published` AND `visibility=public`
- `useSiteSettings` now fetches `getSiteSettings()` and `getProjectCount()` in parallel
- `statsProjects` is now the live DB count; falls back to `site_settings.stats_projects` value, then to config default `'16+'`
- Hero, Stats, AboutStory all automatically receive the correct count via `useSiteSettings()`

**8. `About.jsx` — fixed import**
- Was importing `CTA` from `../components/home/CTA.jsx` (a stale duplicate)
- Now imports from `../components/shared/SiteCTA.jsx` (the canonical shared version)

**9. Version bump:** `site.config.js` → `v2.4.5`

---

## Component Structure (post v2.4.5)

```
src/
├── components/
│   ├── about/          AboutHero, AboutStory, AboutTimeline, AboutSkills,
│   │                   AboutLanguages, AboutValues, AboutGoals, AboutConnect
│   ├── contact/        README.md  ← v2.6 planned
│   ├── feed/           README.md  ← v2.5 planned
│   ├── home/           Hero, AboutMini, RecentProjects, Skills, Process,
│   │                   Services, Testimonials, GithubStats, home.css
│   ├── layout/         Layout, Navbar, Footer
│   ├── projects/       ProjectsPage, ProjectDetailPage, ProjectCard,
│   │                   ProjectCarousel, ImagePreviewModal, RelatedProjectsRow,
│   │                   ReviewSection, projects.css
│   ├── shared/         AdminQuickActions, Breadcrumb, CommentSection, LikeDislike,
│   │                   ReportButton, ShareButtons, SiteCTA, VisibilityGuard
│   └── ui/             Badge, Button, CookieBanner, DevBanner, ErrorBoundary,
│                       Modal, PageProgress, Ripple, Skeleton, ToastContainer
├── config/             site.config.js, firebase.config.js, supabase.config.js
├── hooks/              useAdmin, useAuth, usePageVisibility, useSiteSettings
├── pages/              Home, About, Projects, ProjectDetail, Contact, Feed,
│                       Blogs, Posts, Login, Signup, Admin, Profile, ...
├── services/           supabase.js, firebase.js, analytics.js, projectSearch.js
├── store/              authStore, themeStore, notificationStore, toastStore
└── utils/              seo.js, formatters.js
```

---

## Roadmap

| Version | Feature                  | Status    |
|---------|--------------------------|-----------|
| v2.4.5  | Cleanup + DevBanner      | ✅ Done   |
| v2.4.6  | Project page bug fixes   | 🔜 Next   |
| v2.5    | Feed (Blogs + Posts)     | Planned   |
| v2.6    | Contact page             | Planned   |
| v2.7    | Auth improvements        | Planned   |
| v2.8    | User Profiles            | Planned   |
| v2.9    | Search + Notifications   | Planned   |
| v2.10   | Admin Panel              | Planned   |
| v2.11   | SEO                      | Planned   |

---

## Key Supabase Functions (supabase.js)

| Function | Description |
|---|---|
| `getSiteSettings()` | Reads `site_settings` table (JSONB) |
| `getProjectCount()` | `COUNT(*)` on `projects` WHERE `published` + `public` |
| `getPublishedProjects()` | All visible projects for the page listing |
| `getFeaturedProjects()` | `is_featured=true` ordered by `featured_order` |
| `getProjectBySlug(slug)` | Single project for detail page |
| `getRelatedProjects(id,tags)` | Related projects for sidebar |
| `incrementProjectViews(id)` | RPC `increment_project_views` |
| `toggleLike(contentType, contentId, userId)` | Like/dislike toggle |
| `getLikeStats(contentType, contentId)` | Like counts |
| `getUserLikeStatus(contentType, contentId, userId)` | User's current like state |
| `getComments(contentType, contentId)` | Fetch approved comments |
| `addComment(...)` | Submit new comment (starts as pending) |
| `reportContent(...)` | Submit report (6 reasons, max 300 chars) |
