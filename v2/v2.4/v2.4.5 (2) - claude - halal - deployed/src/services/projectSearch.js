// ============================================================
// projectSearch.js — v2.4.2
// Advanced multi-field weighted search engine for projects.
//
// Scoring weights (per matching term):
//   title               → 100  (exact phrase bonus: +80)
//   tagline             → 60
//   slug                → 40
//   tags                → 70 per matching tag (exact) / 35 (partial)
//   seo_keywords        → 55
//   short_description   → 30
//   key_features        → 25 per item
//   category / type     → 22
//   tech_stack          → 20 per item
//   languages / frameworks → 18 per item
//   libraries           → 14 per item
//   content (stripped)  → 12
//   notes               → 10
//   platform / version  → 8
//   github_link/live_link/pdf_link → 6
//   changelog text      → 7
//   external_references → 6
//   institution / role  → 8
//   awards              → 10
//   backend / database / hosting → 8
// ============================================================

/** Strip HTML tags and normalise whitespace */
function stripHtml(html) {
  if (!html || typeof html !== 'string') return ''
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Flatten a JSONB field to a searchable string */
function flattenJsonb(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value.map(item => {
      if (typeof item === 'string') return item
      if (typeof item === 'object') return Object.values(item).join(' ')
      return String(item)
    }).join(' ')
  }
  if (typeof value === 'object') {
    return Object.values(value)
      .map(v => (Array.isArray(v) ? v.join(' ') : String(v ?? '')))
      .join(' ')
  }
  return String(value)
}

/** Check if a string field contains a term and return a score multiplier */
function scoreField(fieldText, terms, weight) {
  if (!fieldText) return 0
  const text = fieldText.toLowerCase()
  let score = 0
  let matchedTerms = 0

  for (const term of terms) {
    if (text.includes(term)) {
      matchedTerms++
      // Exact word boundary match gets full weight, partial gets half
      const wordBoundary = new RegExp(`(?:^|\\s|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:$|\\s|[^a-z0-9])`)
      score += wordBoundary.test(text) ? weight : weight * 0.6
    }
  }

  // Bonus: all terms matched
  if (matchedTerms === terms.length && terms.length > 1) {
    score *= 1.3
  }
  return score
}

/** Score an array field (tags, tech_stack, etc.) */
function scoreArrayField(arr, terms, weight) {
  if (!arr || !Array.isArray(arr)) return 0
  let score = 0
  for (const item of arr) {
    const text = (item || '').toLowerCase()
    for (const term of terms) {
      if (text === term) score += weight          // Exact match
      else if (text.includes(term)) score += weight * 0.6  // Partial match
    }
  }
  return score
}

/**
 * Main search function.
 * @param {Array} projects - All project objects from Supabase
 * @param {string} query   - Raw search query string
 * @returns {Array}        - Filtered + scored + sorted projects
 */
export function searchProjects(projects, query) {
  if (!query || !query.trim()) return projects

  // Tokenise: split on spaces, remove empties, lowercase, min 2 chars
  const raw = query.trim().toLowerCase()
  const terms = raw.split(/\s+/).filter(t => t.length >= 1)
  if (terms.length === 0) return projects

  const scored = projects.map(p => {
    let score = 0

    // ── Highest priority fields ──────────────────────────────────
    // Title
    score += scoreField(p.title, terms, 100)
    // Exact phrase bonus in title
    if (p.title?.toLowerCase().includes(raw)) score += 80

    // Tagline
    score += scoreField(p.tagline, terms, 60)

    // Tags (per tag)
    score += scoreArrayField(p.tags, terms, 70)

    // SEO keywords
    score += scoreArrayField(p.seo_keywords, terms, 55)

    // Slug (useful for direct lookups)
    score += scoreField(p.slug, terms, 40)

    // ── Medium priority fields ────────────────────────────────────
    // Short description
    score += scoreField(p.short_description, terms, 30)

    // Key features (array)
    score += scoreArrayField(p.key_features, terms, 25)

    // Category and type
    score += scoreField(p.category, terms, 22)
    score += scoreField(p.type, terms, 22)

    // Tech stack
    score += scoreArrayField(p.tech_stack, terms, 20)

    // Languages, frameworks
    score += scoreArrayField(p.languages, terms, 18)
    score += scoreArrayField(p.frameworks, terms, 18)

    // Libraries
    score += scoreArrayField(p.libraries, terms, 14)

    // ── Content (HTML stripped) ───────────────────────────────────
    if (p.content) {
      const stripped = stripHtml(p.content)
      score += scoreField(stripped, terms, 12)
    }

    // Notes
    score += scoreField(p.notes, terms, 10)

    // Awards
    score += scoreArrayField(p.awards, terms, 10)

    // ── Infrastructure ────────────────────────────────────────────
    score += scoreField(p.backend, terms, 8)
    score += scoreField(p.database, terms, 8)
    score += scoreField(p.hosting, terms, 8)
    score += scoreField(p.platform, terms, 8)
    score += scoreField(p.institution, terms, 8)
    score += scoreField(p.role, terms, 8)

    // Version
    score += scoreField(p.version, terms, 8)

    // ── Links ─────────────────────────────────────────────────────
    score += scoreField(p.github_link, terms, 6)
    score += scoreField(p.live_link, terms, 6)
    score += scoreField(p.pdf_link, terms, 6)

    // ── JSONB fields ──────────────────────────────────────────────
    // Changelog
    if (p.changelog) {
      const cl = flattenJsonb(p.changelog)
      score += scoreField(cl, terms, 7)
    }

    // External references
    if (p.external_references) {
      const er = flattenJsonb(p.external_references)
      score += scoreField(er, terms, 6)
    }

    // Repo stats (language breakdown)
    if (p.repo_stats) {
      const rs = flattenJsonb(p.repo_stats)
      score += scoreField(rs, terms, 4)
    }

    return { project: p, score }
  })

  // Filter out zero-score results, then sort by score descending
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ project }) => project)
}

/**
 * Highlight matching terms in a text string.
 * Returns an array of {text, highlight} segments.
 * Useful for bold-highlighting search matches in the UI.
 */
export function highlightTerms(text, query) {
  if (!text || !query) return [{ text, highlight: false }]
  const terms = query.trim().toLowerCase().split(/\s+/).filter(t => t.length >= 2)
  if (terms.length === 0) return [{ text, highlight: false }]

  const pattern = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'gi')
  const parts = text.split(regex)

  return parts.map(part => ({
    text: part,
    highlight: regex.test(part)
  }))
}

/**
 * Get search suggestions based on partial input.
 * Returns top matching titles/tags.
 */
export function getSearchSuggestions(projects, query, limit = 5) {
  if (!query || query.trim().length < 2) return []
  const q = query.trim().toLowerCase()

  const suggestions = new Set()

  for (const p of projects) {
    if (suggestions.size >= limit) break

    // Title match
    if (p.title?.toLowerCase().includes(q)) {
      suggestions.add(p.title)
    }

    // Tag match
    if (p.tags) {
      for (const tag of p.tags) {
        if (tag.toLowerCase().includes(q) && suggestions.size < limit) {
          suggestions.add(tag)
        }
      }
    }
  }

  return Array.from(suggestions).slice(0, limit)
}
