// ============================================================
// Supabase Service — All database query helpers
// v2.4.0: Fixed featured query, added view increment,
//         like toggle, comment submit, report submit,
//         related projects, project search helpers
// ============================================================

import { supabase } from '../config/supabase.config.js'

// ── Site Settings ──────────────────────────────────────────

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
  if (error) throw error
  return data.reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})
}

export async function updateSiteSetting(key, value) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) throw error
}

// ── Page Visibility ────────────────────────────────────────

export async function getPageVisibility() {
  const { data, error } = await supabase
    .from('page_visibility')
    .select('page, visibility')
  if (error) throw error
  return data.reduce((acc, row) => {
    acc[row.page] = row.visibility
    return acc
  }, {})
}

export async function updatePageVisibility(page, visibility) {
  const { error } = await supabase
    .from('page_visibility')
    .update({ visibility })
    .eq('page', page)
  if (error) throw error
}

// ── Projects ───────────────────────────────────────────────

/**
 * Fetch published public projects with optional filters.
 * category → exact match
 * tag      → array contains
 * search   → ilike on title, short_description
 * limit/offset → pagination
 * orderBy  → 'created_at' | 'views_count' | 'likes_count'
 */
export async function getPublishedProjects({
  limit,
  offset = 0,
  category,
  tag,
  search,
  orderBy = 'created_at',
} = {}) {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order(orderBy, { ascending: false })

  if (category) query = query.eq('category', category)
  if (tag)      query = query.contains('tags', [tag])
  if (search)   query = query.or(
    `title.ilike.%${search}%,short_description.ilike.%${search}%`
  )
  if (limit)    query = query.range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) throw error
  return data
}

/**
 * Count total published projects (for pagination + stats display).
 */
export async function countPublishedProjects({ category, tag, search } = {}) {
  let query = supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('visibility', 'public')

  if (category) query = query.eq('category', category)
  if (tag)      query = query.contains('tags', [tag])
  if (search)   query = query.or(
    `title.ilike.%${search}%,short_description.ilike.%${search}%`
  )

  const { count, error } = await query
  if (error) throw error
  return count ?? 0
}

/**
 * Fetch featured projects for home page.
 * Uses `is_featured` column (per schema).
 */
export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .eq('is_featured', true)
    .order('featured_order', { ascending: true })
    .limit(6)
  if (error) throw error
  return data ?? []
}

/**
 * Get a single project by slug.
 */
export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) throw error
  return data
}

/**
 * Get all unique categories from published projects.
 */
export async function getProjectCategories() {
  const { data, error } = await supabase
    .from('projects')
    .select('category')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .not('category', 'is', null)
  if (error) throw error
  const cats = [...new Set(data.map(r => r.category).filter(Boolean))]
  return cats.sort()
}

/**
 * Get all unique tags from published projects.
 */
export async function getProjectTags() {
  const { data, error } = await supabase
    .from('projects')
    .select('tags')
    .eq('status', 'published')
    .eq('visibility', 'public')
  if (error) throw error
  const allTags = data.flatMap(r => r.tags ?? [])
  const unique = [...new Set(allTags)].sort()
  return unique
}

/**
 * Increment view count for a project.
 * Dedup via sessionStorage on the client side.
 */
export async function incrementProjectViews(projectId) {
  const key = `viewed_proj_${projectId}`
  if (sessionStorage.getItem(key)) return // already counted this session
  sessionStorage.setItem(key, '1')

  const { error } = await supabase.rpc('increment_project_views', {
    project_id: projectId,
  })
  if (error) {
    // Fallback: direct update if RPC not available
    await supabase
      .from('projects')
      .update({ views_count: supabase.rpc('increment', { x: 1 }) })
      .eq('id', projectId)
  }
}

/**
 * Get related projects (same category, excluding current).
 */
export async function getRelatedProjects(slug, category, limit = 3) {
  let query = supabase
    .from('projects')
    .select('id, slug, title, short_description, thumbnail_url, category, tags, accent_color')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .neq('slug', slug)
    .limit(limit)

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// ── Likes ──────────────────────────────────────────────────

export async function getLikeStats(contentType, contentId) {
  const { data, error } = await supabase
    .from('likes')
    .select('type')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
  if (error) throw error

  const likes    = data.filter(r => r.type === 'like').length
  const dislikes = data.filter(r => r.type === 'dislike').length
  return { likes, dislikes }
}

/**
 * Get current user's vote for a content item.
 * Returns 'like' | 'dislike' | null
 */
export async function getUserVote(contentType, contentId, userId) {
  if (!userId) return null
  const { data, error } = await supabase
    .from('likes')
    .select('type')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('user_id', userId)
    .single()
  if (error) return null
  return data?.type ?? null
}

/**
 * Toggle like/dislike. Removes if same type clicked again.
 * Returns new stats.
 */
export async function toggleLike(contentType, contentId, userId, voteType) {
  if (!userId) throw new Error('Login required')

  // Check existing vote
  const { data: existing } = await supabase
    .from('likes')
    .select('id, type')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('user_id', userId)
    .single()

  if (existing) {
    if (existing.type === voteType) {
      // Same vote → remove (toggle off)
      await supabase.from('likes').delete().eq('id', existing.id)
    } else {
      // Different vote → update
      await supabase.from('likes').update({ type: voteType }).eq('id', existing.id)
    }
  } else {
    // No vote → insert
    await supabase.from('likes').insert({
      content_type: contentType,
      content_id:   contentId,
      user_id:      userId,
      type:         voteType,
    })
  }

  return getLikeStats(contentType, contentId)
}

// ── Comments ───────────────────────────────────────────────

export async function getApprovedComments(contentType, contentId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, users:user_id (id, display_name, username, photo_url)')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getCommentCount(contentType, contentId) {
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('status', 'approved')
  if (error) throw error
  return count ?? 0
}

/**
 * Submit a new comment. Returns submitted comment or throws.
 */
export async function submitComment({ contentType, contentId, contentSlug, userId, text, deviceInfo = {} }) {
  if (!userId) throw new Error('Login required')
  if (!text?.trim()) throw new Error('Comment cannot be empty')
  if (text.length > 1000) throw new Error('Comment too long (max 1000 chars)')

  const { data, error } = await supabase
    .from('comments')
    .insert({
      content_type: contentType,
      content_id:   contentId,
      content_slug: contentSlug,
      user_id:      userId,
      text:         text.trim(),
      status:       'pending',
      device_info:  deviceInfo,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Check 10/day comment rate limit for user.
 */
export async function checkCommentRateLimit(userId) {
  const dayStart = new Date()
  dayStart.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', dayStart.toISOString())
  if (error) return false
  return count >= 10 // true = rate limited
}

// ── Reports ────────────────────────────────────────────────

export async function submitReport({ contentType, contentId, reporterId, reason, description = '', deviceInfo = {} }) {
  if (!reporterId) throw new Error('Login required')

  const { data, error } = await supabase
    .from('reports')
    .insert({
      content_type: contentType,
      content_id:   contentId,
      reporter_id:  reporterId,
      reason,
      description,
      status:       'pending',
      device_info:  deviceInfo,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Feed (Blogs + Posts combined) ─────────────────────────

export async function getFeedItems({ limit, offset = 0, category, tag, type } = {}) {
  let query = supabase
    .from('feed')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  if (type)     query = query.eq('type', type)
  if (category) query = query.eq('category', category)
  if (tag)      query = query.contains('tags', [tag])
  if (limit)    query = query.range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getFeedItemBySlug(slug) {
  const { data, error } = await supabase
    .from('feed')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// ── Users ──────────────────────────────────────────────────

export async function getUserByUID(uid) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', uid)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getUserByUsername(username) {
  const { data, error } = await supabase
    .from('users')
    .select('id, display_name, username, photo_url, bio, web_url, banner_url, created_at, badges:user_badges(badge_id, badges(*))')
    .eq('username', username)
    .single()
  if (error) throw error
  return data
}

export async function checkUsernameAvailable(username) {
  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('username', username)
  if (error) throw error
  return count === 0
}

// ── Reviews ────────────────────────────────────────────────

export async function getApprovedReviews({ limit = 10, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, users:user_id (display_name, photo_url, username)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return data
}

// ── Spam Tracking ──────────────────────────────────────────

export async function logSpamAction(ipAddress, action) {
  const { error } = await supabase
    .from('spam_tracking')
    .insert({ ip_address: ipAddress, action })
  if (error) console.warn('[SpamTracking] Log failed:', error.message)
}

export async function checkRateLimit(ipAddress, action, limit, windowHours) {
  const windowStart = new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString()
  const { count, error } = await supabase
    .from('spam_tracking')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ipAddress)
    .eq('action', action)
    .gte('created_at', windowStart)
  if (error) return false
  return count >= limit
}

// ── Analytics ──────────────────────────────────────────────

export async function trackPageView(page, userId = null, ipAddress = null) {
  const { error } = await supabase
    .from('analytics')
    .insert({ page, event: 'page_view', user_id: userId, ip_address: ipAddress })
  if (error) console.warn('[Analytics] Track failed:', error.message)
}

// ── Activity Log ───────────────────────────────────────────

export async function logActivity(userId, action, details = {}, deviceInfo = {}) {
  const { error } = await supabase
    .from('activity_logs')
    .insert({ user_id: userId, action, details, device_info: deviceInfo })
  if (error) console.warn('[ActivityLog] Log failed:', error.message)
}
