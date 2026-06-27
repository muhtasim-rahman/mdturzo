# 📋 Project CSV Rules — v2.4.2
> Follow these rules precisely when creating project entries for the `projects-v2.4.2.csv` file.
> This schema corresponds to `supabase-schema-v2.4.2.sql`.

---

## 📐 File Format

- **Encoding:** UTF-8
- **Delimiter:** Comma (`,`)
- **Quoting:** All values MUST be wrapped in double quotes (`"`)
- **Newlines inside values:** Use `\n` (literal backslash-n) for newlines within a field
- **Arrays:** Use `{item1,item2,item3}` PostgreSQL array format (no spaces after commas inside)
- **JSONB:** Valid JSON string inside double quotes, escaped properly
- **NULL:** Empty quoted string `""` = NULL/empty. Do NOT write NULL literally.
- **Booleans:** Use lowercase `true` or `false`
- **Dates:** Use `YYYY-MM-DD` format for DATE columns, ISO 8601 for TIMESTAMPTZ

---

## 📋 Required Columns (in this exact order)

```
slug, title, short_name, tagline, short_description, detailed_description,
content, thumbnail_url, banner_url, preview_gif_url, og_image_url, screenshots,
github_link, live_link, pdf_link, custom_link, demo_link,
category, subcategory, type, tags, status, visibility, development_status,
is_featured, featured_order, sort_order,
languages, tech_stack, key_features, dependencies, platform,
version, start_date, end_date, project_timeline,
complexity_level, team_size, role, license, is_open_source,
seo_title, seo_description, seo_keywords,
notes, awards, changelog, related_slugs, meta_data, accent_color,
views_count, likes_count, dislikes_count, comments_count, shares_count,
created_at, updated_at, published_at
```

---

## 🔧 Field-by-Field Rules

### `slug`
- Lowercase, hyphen-separated, URL-safe
- No special characters except `-`
- Must be globally unique
- Example: `"qr-prism"`, `"notification-panel"`, `"sgsc-web-campus"`

### `title`
- Full official project name
- Can include em dash (—) for subtitles
- Example: `"QR Prism"`, `"FMT Tracker Pro — UFMT-SSC26"`

### `short_name`
- Brief abbreviation, max 20 chars
- Example: `"QR Prism"`, `"FMT Tracker"`, `"Linkivo"`

### `tagline`
- Single compelling line, no period at end
- Max 80 characters
- Example: `"Generate, Scan, and Manage QR Codes with Professional Features"`

### `short_description`
- 1-2 sentences, shown on project cards
- Max 200 characters
- Plain text, no HTML
- Example: `"A feature-rich PWA for QR code generation, scanning, and batch processing with cloud storage."`

### `detailed_description`
- 2-5 paragraphs of plain text (or light markdown)
- Covers: what it is, key technical details, how it evolved, why it's notable
- Use `\n\n` for paragraph breaks
- This appears on detail page if no `content` HTML

### `content`
- Rich HTML formatted for TipTap renderer
- Use `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<strong>`, `<code>`, `<a>` tags
- Recommend sections: About, Key Features, Tech Stack, Architecture, Development Journey, Screenshots
- All double quotes inside HTML must be escaped as `&quot;` or use single quotes for HTML attrs
- Example structure:
  ```html
  <h2>About This Project</h2><p>...</p><h2>Key Features</h2><ul><li>Feature 1</li></ul>
  ```

### `thumbnail_url`
- ImgBB hosted URL (https://i.ibb.co.com/...)
- Format: WebP preferred, JPEG ok
- Dimensions: 1280×720 recommended (16:9)
- Example: `"https://i.ibb.co.com/abc123/project-name.webp"`

### `banner_url`, `preview_gif_url`, `og_image_url`
- Same URL rules as thumbnail_url
- Leave as `""` if not available

### `screenshots`
- PostgreSQL array of ImgBB URLs
- Format: `"{https://url1.webp,https://url2.webp}"`
- Use `"{}"` if empty

### `github_link`
- Full GitHub URL: `"https://github.com/muhtasim-rahman/repo-name"`
- `""` if private or not applicable

### `live_link`
- Full URL to live/deployed version
- `""` if not available

### `pdf_link`, `custom_link`, `demo_link`
- Full URLs or `""`

### `category`
Exact values (use one of these):
- `"Web App"`, `"Utility"`, `"Education"`, `"UI Component"`, `"Dev Tool"`,
  `"Islamic"`, `"Tool"`, `"Portfolio"`, `"Design"`, `"PWA"`, `"Learning"`,
  `"Institution"`, `"Library"`, `"Template"`, `"Game"`, `"API"`

### `subcategory`
- More specific than category. Examples: `"Progressive Web App"`, `"JavaScript Library"`,
  `"Dashboard"`, `"Landing Page"`, `"Component Library"`

### `type`
- Technical implementation type
- Examples: `"Progressive Web App"`, `"Static Website"`, `"npm Library"`,
  `"Browser Extension"`, `"Web Component"`, `"Dashboard"`, `"Poster Design"`

### `tags`
- PostgreSQL array, lowercase with hyphens
- 5-20 tags recommended
- Format: `"{pwa,firebase,gsap,javascript,link-management}"`

### `status`
- Exact: `"published"`, `"draft"`, `"hidden"`
- Use `"published"` for all completed/active projects in the CSV seed

### `visibility`
- Exact: `"public"`, `"signed-in"`, `"private"`
- Use `"public"` for all seed data

### `development_status`
Exact values:
- `"Active Development"`, `"Completed"`, `"Archived"`, `"Beta"`,
  `"Published"`, `"In Development"`, `"Discontinued"`

### `is_featured`
- `true` for top 6 most impressive projects (shown on home page)
- `false` for all others

### `featured_order`
- Integer 1-6 for featured projects (1 = first shown)
- `""` (empty) for non-featured

### `sort_order`
- Integer, lower = shown first. Use `0` for default, or set manually for desired order.
- Recommended: `1` to `19` matching desired display order

### `languages`
- PostgreSQL array of programming languages
- Format: `"{JavaScript,HTML5,CSS3,Python}"`

### `tech_stack`
- JSONB object grouped by category, OR flat array
- Grouped: `"{\"Frontend\": [\"React\", \"Tailwind\"], \"Backend\": [\"Firebase\"]}"`
- Flat: `"{\"stack\": [\"React\", \"Firebase\", \"Tailwind\"]}"`
- Simple array form: `"[\"React\", \"Firebase\"]"` (JSON array as string)

### `key_features`
- PostgreSQL array of short feature descriptions (max 80 chars each)
- Format: `"{Cinematic GSAP splash screen,Firebase Auth & Realtime DB,Weighted point system}"`
- 5-15 features recommended

### `dependencies`
- PostgreSQL array of npm packages / external libraries
- Format: `"{gsap,firebase,jszip,chart.js}"`

### `platform`
- Single string: `"Web (PWA)"`, `"Cross-platform"`, `"Mobile-first"`, `"Desktop"`, `"Browser"`

### `version`
- Current version string: `"v1.4.5"`, `"v3.4"`, `"v19.3"`, `"v1.0"`

### `start_date`, `end_date`
- `YYYY-MM-DD` format
- `end_date` is `""` if still active

### `project_timeline`
- Human-readable string summarizing the timeline
- Example: `"Started 2023, v3.4 final release (2024)"`

### `complexity_level`
- Exact: `"Beginner"`, `"Intermediate"`, `"Advanced"`, `"Expert"`

### `team_size`
- Integer (usually `1` for solo projects)

### `role`
- `"Solo Developer"`, `"Lead Developer"`, `"Frontend Developer"`, `"Full Stack Developer"`

### `license`
- `"MIT"`, `"Private"`, `"Apache 2.0"`, `"CC BY 4.0"`, `"GPL-3.0"`, `"Proprietary"`

### `is_open_source`
- `true` if source code is publicly available with an open license
- `false` otherwise

### `seo_title`
- Custom SEO title (often same as title + " | Muhtasim Rahman")
- Max 60 chars. `""` to use project title as default.

### `seo_description`
- Meta description for search engines, 120-160 chars
- If `""`, falls back to `short_description`

### `seo_keywords`
- PostgreSQL array: `"{qr code generator,pwa,firebase,batch processing}"`

### `notes`
- Internal developer notes, fun facts, or context
- Not shown publicly but searchable

### `awards`
- JSONB array: `"[{\"title\": \"Best Tool\", \"issuer\": \"...\", \"year\": 2024}]"`
- `"[]"` if none

### `changelog`
- JSONB array of version history
- Format: `"[{\"version\": \"v3.4\", \"date\": \"2024-03\", \"changes\": [\"SVG rendering migration\", \"Admin security redesign\"]}]"`

### `related_slugs`
- Manual override for related projects
- Format: `"{qr-prism,notification-panel}"` or `"{}"`

### `meta_data`
- Any extra key-value pairs as JSONB
- Format: `"{\"github_stars\": 5, \"npm_downloads\": 0}"`
- `"{}"` if empty

### `accent_color`
- Hex color override: `"#3B82F6"` or `""` to use theme default

### Stats (`views_count`, `likes_count`, `dislikes_count`, `comments_count`, `shares_count`)
- Integers, start with realistic seed values
- Example: popular projects get higher counts

### `created_at`, `updated_at`, `published_at`
- ISO 8601 format: `"2024-01-15T00:00:00Z"`
- `published_at` should equal `created_at` for published projects

---

## ✅ Quality Checklist

Before submitting a project entry:
- [ ] `slug` is URL-safe and unique
- [ ] `short_description` under 200 chars, plain text
- [ ] At least 5 `tags`
- [ ] `tags`, `languages`, `key_features`, `seo_keywords` use `{item1,item2}` format
- [ ] `tech_stack` is valid JSON
- [ ] `status = "published"` and `visibility = "public"` for seed data
- [ ] `is_featured` true for only 6 projects total
- [ ] `content` HTML has no unescaped double quotes
- [ ] All URLs are full https:// URLs or empty string
- [ ] `sort_order` is unique per entry (1-19)

---

## 📝 Example Entry (abbreviated)

```
"qr-prism","QR Prism","QR Prism","Generate, Scan, and Manage QR Codes with Professional Features","A feature-rich Progressive Web App for QR code generation, scanning, batch processing, and cloud management.","Full description here...","<h2>About</h2><p>Content...</p>","https://i.ibb.co.com/thumbnail.webp","","","","{}","https://github.com/muhtasim-rahman/qr-prism","https://muhtasim-rahman.github.io/qr-prism","","","","Utility","QR Code Tool","Progressive Web App","{qr-code-generator,pwa,firebase,batch-processing,scanner}","published","public","Completed","true","2","2","{JavaScript,HTML5,CSS3}","{\"Frontend\": [\"Vanilla JS\"], \"Backend\": [\"Firebase\"]}","{Batch QR generation,Camera scanner,Admin panel}","{jszip,firebase}","Web (PWA)","v3.4","2023-01-01","2024-06-01","Started 2023, v3.4 final release (2024)","Advanced","1","Solo Developer","Private","false","QR Prism — Free QR Code Generator & Scanner","Generate, scan, and manage QR codes with batch processing, Firebase backend, and admin panel.","{qr code,qr generator,pwa,scanner}","Canvas to SVG migration in v3.4","[]","[{\"version\": \"v3.4\", \"date\": \"2024-06\", \"changes\": [\"SVG rendering\", \"Admin security\"]}]","{}","{}","","280","38","2","0","0","2023-01-01T00:00:00Z","2024-06-01T00:00:00Z","2023-01-01T00:00:00Z"
```

---

*v2.4.2 — Updated for 53-column schema. Always verify against `supabase-schema-v2.4.2.sql`.*
