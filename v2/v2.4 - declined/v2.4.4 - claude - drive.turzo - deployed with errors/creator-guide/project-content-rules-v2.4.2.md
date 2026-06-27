# Project Content Rules — v2.4.2
> **For AI assistants generating project CSV entries for mdturzo portfolio**
> Follow these rules EXACTLY to produce consistent, high-quality project data.

---

## 📋 Schema Reference (62 columns)

All CSV entries must include these columns in this exact order:

```
slug, title, tagline, short_description, category, type, version, platform,
project_timeline, start_date, end_date, project_status, complexity_level,
team_size, role, client, institution, open_source, has_pwa, has_dark_mode,
has_responsive, is_collaborative, is_featured, featured_order, status, visibility,
github_link, live_link, pdf_link, custom_link, custom_link_label, thumbnail_url,
backend, database, hosting, tech_stack, languages, frameworks, libraries, tags,
key_features, seo_title, seo_description, seo_keywords, accent,
views_count, likes_count, dislikes_count, comments_count
```

---

## 🏷️ Field Rules

### `slug` (required)
- Lowercase, hyphens only: `my-project-name`
- Max 60 chars
- Must be globally unique
- Matches the GitHub repo name if possible
- Examples: `linkivo`, `qr-prism`, `ufmt-ssc26`

### `title` (required)
- Full project name, max 100 chars
- Can include em dash (—) for subtitles: `FMT Tracker Pro — SSC-26`
- Title case

### `tagline`
- One punchy sentence, max 80 chars
- Not ending in period
- Describes what the project does or its value proposition
- Examples:
  - `"Discover, Manage, and Explore Links with Intelligence"`
  - `"Smart Merit Tracking Dashboard for SSC-26 Students"`

### `short_description`
- 1–3 sentences, max 300 chars
- Shown on project cards
- Must be informative and complete
- Mentions key tech and purpose

### `category` (required)
Exactly one of:
- `Web App` — interactive web applications
- `Utility` — tools, generators, converters
- `Education` — learning / academic tools
- `UI Component` — reusable UI widgets
- `Dev Tool` — developer utilities / libraries
- `Islamic` — Islamic/religious content
- `Tool` — general-purpose tools
- `Portfolio` — personal portfolio sites
- `Design` — design showcases, templates, banners
- `Learning` — beginner/practice projects
- `Institutional` — school/org websites

### `type`
Lowercase descriptive type:
- `pwa`, `website`, `library`, `component`, `tool`, `template-collection`,
  `readme`, `cv-website`, `ui-design`, `event-design`, `poster-design`

### `version`
- Format: `v1.0`, `v2.4.2`, `v19.3`
- Leave empty if not versioned

### `platform`
- `Web`, `PWA / Web`, `PWA / Web / Android`, `Web (Desktop)`, `GitHub`

### `project_timeline`
- Human-readable: `"2024 – Present"`, `"2023 – 2024"`, `"Dec 2024 – Jan 2025"`

### `start_date` / `end_date`
- Format: `YYYY-MM-DD`
- `end_date` is empty if ongoing

### `project_status`
Exactly one of: `active`, `completed`, `archived`, `discontinued`, `beta`, `in-development`

### `complexity_level`
Exactly one of: `beginner`, `intermediate`, `advanced`, `expert`
- `beginner`: HTML/CSS only, basic JS
- `intermediate`: Bootstrap, basic API calls, responsive
- `advanced`: PWA, Firebase, complex state, animations
- `expert`: multi-layer architecture, auth, DB, caching strategies

### `team_size`
- Integer, default `1`
- Use `2+` if collaborated

### `role`
- e.g. `Full Stack Developer`, `Designer & Developer`, `Library Developer`, `Lead Developer`

### `client` / `institution`
- Leave empty for personal projects
- `institution`: for school/org projects (e.g. `Saidpur Government Science College`)
- `client`: for freelance/commissioned work

### Boolean columns (`open_source`, `has_pwa`, `has_dark_mode`, `has_responsive`, `is_collaborative`, `is_featured`)
- Values: `true` or `false` only

### `featured_order`
- Integer 1–6 for home page featured projects
- Only set if `is_featured` is `true`
- 1 = shown first on home page

### `status`
- `published` — visible to public
- `draft` — work in progress, not shown
- `hidden` — exists but not discoverable

### `visibility`
- `public` — everyone can see
- `signed-in` — logged-in users only
- `private` — admin only

---

## 🔗 Link Columns

- `github_link`: Full GitHub URL or empty
- `live_link`: Full live preview URL or empty
- `pdf_link`: Google Drive PDF URL or empty
- `custom_link`: Any additional link
- `custom_link_label`: Button label for custom_link (default: `Visit Link`)

---

## 🖼️ `thumbnail_url`
- Use ImgBB hosted URL: `https://i.ibb.co.com/XXXXXXXX/filename.webp`
- Format: WebP preferred
- If unavailable, leave empty (placeholder shown)

---

## 🛠️ Tech Columns (comma-separated within quotes)

### `tech_stack`
- Top 5–8 headline technologies shown in the detail page
- Format: `"Firebase,GSAP,JavaScript,PWA"`

### `languages`
- Programming languages only: `"JavaScript,HTML5,CSS3"`, `"JavaScript,TypeScript,HTML5,CSS3"`

### `frameworks`
- Frameworks used: `"React,Vite"`, `"Bootstrap"`, or empty

### `libraries`
- Notable libraries: `"GSAP,Chart.js,JSZip"`, `"Framer Motion,Zustand"`, or empty

---

## 🏷️ `tags`
- Comma-separated, lowercase, hyphens: `"pwa,firebase,link-management,gsap"`
- 8–25 tags ideal
- Include: tech names, category, purpose, key features, language names
- More tags = better searchability

---

## ✅ `key_features`
- Comma-separated list of feature sentences
- Start each with a strong noun/verb: `"Cinematic GSAP splash screen"`, `"Batch export via JSZip"`
- 6–12 features ideal
- Each max 80 chars

---

## 📊 SEO Columns

### `seo_title`
- Max 60 chars
- Format: `"Project Name | Category — Domain"`

### `seo_description`
- Max 160 chars
- Plain English, no special chars

### `seo_keywords`
- Comma-separated: `"pwa,firebase,link manager,portfolio"`
- 5–10 keywords

---

## 🎨 `accent`
- Optional hex color to override default accent for this project card
- Format: `#3B82F6`
- Leave empty to use site default

---

## 📈 Counter Columns
For seed data, use realistic dummy numbers:
- `views_count`: 10–600 depending on project age/importance
- `likes_count`: ~10–15% of views
- `dislikes_count`: ~1–5% of views
- `comments_count`: 0–20

---

## 📝 CSV Formatting Rules

1. **Wrap all text fields in double quotes**: `"My Project Title"`
2. **Commas inside fields**: Already handled by quoting
3. **Arrays** (tags, tech_stack, etc.) stay as comma-separated strings within quotes: `"tag1,tag2,tag3"`
4. **Empty fields**: Leave as empty string: `,,` or `,"",`
5. **Boolean**: `true` or `false`, no quotes
6. **Integers**: No quotes: `1`, `45`, `320`
7. **Dates**: `YYYY-MM-DD` format, no quotes
8. **No trailing commas**

---

## 🔍 Search Optimization Tips

For maximum discoverability in the portfolio's advanced search engine:
1. **Title** carries most weight — make it descriptive
2. **Tags** are second most important — add as many relevant ones as possible
3. **short_description** should include key tech names naturally
4. **key_features** should mention tech, not just features
5. **seo_keywords** should include common search terms users might type
6. **content** (added via admin panel) gives additional depth

---

## 📁 Example Entry (minimal required fields)

```
my-tool,My Awesome Tool,The Tool That Does Everything,"A versatile tool for web developers that automates repetitive tasks.",Dev Tool,tool,,Web,2024,2024-01-01,,completed,intermediate,1,Developer,,,true,false,false,true,false,false,,published,public,https://github.com/user/my-tool,https://user.github.io/my-tool,,,Live Demo,,,,GitHub Pages,"JavaScript","JavaScript,HTML5,CSS3",,,"javascript,tool,developer,automation,open-source","Automates build tasks,CLI and GUI modes,Zero config required","My Awesome Tool | Dev Utility","A developer tool that automates repetitive web development tasks.","developer tool,automation,javascript",,,20,3,0,0
```

---

## ✅ Quality Checklist (before submitting)

- [ ] slug is unique and URL-safe
- [ ] title and tagline are distinct (not duplicate)
- [ ] short_description is under 300 chars
- [ ] category matches the allowed list exactly
- [ ] All boolean fields are `true`/`false` (lowercase)
- [ ] tech_stack, languages, tags are comma-separated within quotes
- [ ] key_features has 6–12 items
- [ ] seo_title under 60 chars
- [ ] seo_description under 160 chars
- [ ] featured_order only set if is_featured = true
- [ ] status is `published` for live projects
- [ ] No stray commas or unmatched quotes

---

*Generated for mdturzo portfolio v2.4.2. Update this file when new columns are added.*
