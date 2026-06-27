// ============================================================
// projectSearch.js — v2.4.2
// Advanced multi-field search engine with weighted scoring
// ALL project data from Supabase is indexed and scored
// ============================================================
//
// Scoring weights (points per field match):
//   title exact          : 120
//   title partial        :  60
//   slug                 :  40
//   tags (per tag match) :  35
//   tagline              :  30
//   category / subcategory: 25
//   short_description    :  22
//   type                 :  20
//   detailed_description :  15
//   content (HTML strip) :  12
//   tech_stack           :  10
//   key_features         :  10
//   languages            :   8
//   dependencies         :   7
//   platform             :   6
//   version              :   5
//   notes                :   5
//   links (github/live)  :   4
//   meta_data (jsonb)    :   3
//
// Multi-word queries: each term scored independently, then summed
// Results sorted descending by total score, items with score=0 excluded
// ============================================================

/** Strip HTML tags from a string */
function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Flatten any value to a searchable lowercase string */
function flatten(val) {
  if (!val) return ''
  if (Array.isArray(val)) return val.map(v => flatten(v)).join(' ')
  if (typeof val === 'object') return Object.values(val).map(v => flatten(v)).join(' ')
  return String(val).toLowerCase()
}

/** Score a single search term against a project */
function scoreProject(project, term) {
  let score = 0
  const t = term.toLowerCase()

  // ── Title (highest priority) ──────────────────────────────
  const titleLow = (project.title || '').toLowerCase()
  if (titleLow === t) score += 120
  else if (titleLow.startsWith(t)) score += 80
  else if (titleLow.includes(t)) score += 60

  // Short name
  const shortLow = (project.short_name || '').toLowerCase()
  if (shortLow.includes(t)) score += 50

  // ── Slug ─────────────────────────────────────────────────
  if ((project.slug || '').toLowerCase().includes(t)) score += 40

  // ── Tags (per matching tag) ───────────────────────────────
  if (Array.isArray(project.tags)) {
    const matchingTags = project.tags.filter(tag =>
      tag.toLowerCase().includes(t)
    )
    score += matchingTags.length * 35
    // Exact tag match bonus
    if (project.tags.some(tag => tag.toLowerCase() === t)) score += 20
  }

  // ── Tagline ───────────────────────────────────────────────
  if ((project.tagline || '').toLowerCase().includes(t)) score += 30

  // ── Category / Subcategory ────────────────────────────────
  if ((project.category || '').toLowerCase().includes(t)) score += 25
  if ((project.subcategory || '').toLowerCase().includes(t)) score += 20
  if ((project.type || '').toLowerCase().includes(t)) score += 20

  // ── Short Description ─────────────────────────────────────
  if ((project.short_description || '').toLowerCase().includes(t)) score += 22

  // ── Detailed Description ──────────────────────────────────
  if ((project.detailed_description || '').toLowerCase().includes(t)) score += 15

  // ── Content (HTML stripped) ───────────────────────────────
  if (project.content) {
    const stripped = stripHtml(project.content).toLowerCase()
    if (stripped.includes(t)) score += 12
  }

  // ── Tech Stack ────────────────────────────────────────────
  const techStr = flatten(project.tech_stack)
  if (techStr.includes(t)) score += 10

  // ── Key Features ─────────────────────────────────────────
  if (Array.isArray(project.key_features)) {
    const featStr = project.key_features.join(' ').toLowerCase()
    if (featStr.includes(t)) score += 10
  }

  // ── Languages ─────────────────────────────────────────────
  if (Array.isArray(project.languages)) {
    const langStr = project.languages.join(' ').toLowerCase()
    if (langStr.includes(t)) score += 8
  }

  // ── Dependencies ──────────────────────────────────────────
  if (Array.isArray(project.dependencies)) {
    const depStr = project.dependencies.join(' ').toLowerCase()
    if (depStr.includes(t)) score += 7
  }

  // ── Platform ──────────────────────────────────────────────
  if ((project.platform || '').toLowerCase().includes(t)) score += 6

  // ── Version ───────────────────────────────────────────────
  if ((project.version || '').toLowerCase().includes(t)) score += 5

  // ── Project Timeline ──────────────────────────────────────
  if ((project.project_timeline || '').toLowerCase().includes(t)) score += 5

  // ── Notes ─────────────────────────────────────────────────
  if ((project.notes || '').toLowerCase().includes(t)) score += 5

  // ── Links ─────────────────────────────────────────────────
  const links = [
    project.github_link,
    project.live_link,
    project.pdf_link,
    project.custom_link,
    project.demo_link,
  ].filter(Boolean).join(' ').toLowerCase()
  if (links.includes(t)) score += 4

  // ── Meta Data (JSONB) ─────────────────────────────────────
  const metaStr = flatten(project.meta_data)
  if (metaStr.includes(t)) score += 3

  return score
}

/**
 * Search projects with advanced scoring
 * @param {Array}  projects - Full list of project objects from Supabase
 * @param {string} query    - Search query string
 * @returns {Array} - Filtered + sorted list of matching projects
 */
export function searchProjects(projects, query) {
  if (!query || !query.trim()) return projects

  // Split query into individual terms (support multi-word)
  const terms = query.trim().split(/\s+/).filter(Boolean).slice(0, 8) // max 8 terms

  const scored = projects.map(project => {
    // Sum scores across all terms
    const totalScore = terms.reduce(
      (sum, term) => sum + scoreProject(project, term),
      0
    )
    return { project, score: totalScore }
  })

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ project }) => project)
}

/**
 * Get search score for a single project (useful for debugging or highlighting)
 * @param {Object} project
 * @param {string} query
 * @returns {number}
 */
export function getProjectScore(project, query) {
  if (!query || !query.trim()) return 0
  const terms = query.trim().split(/\s+/).filter(Boolean)
  return terms.reduce((sum, term) => sum + scoreProject(project, term), 0)
}
