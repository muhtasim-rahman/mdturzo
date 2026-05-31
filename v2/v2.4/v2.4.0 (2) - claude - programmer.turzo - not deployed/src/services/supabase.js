// ============================================================
// Supabase Service — All database query helpers
// ============================================================

import { supabase } from '../config/supabase.config.js'

// ── Site Settings ──────────────────────────────────────────

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
  if (error) throw error

  // Array → object { key: value }
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

export async function getPublishedProjects({ limit, offset = 0, category, tag } = {}) {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)
  if (tag)      query = query.contains('tags', [tag])
  if (limit)    query = query.range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) throw error
  return data
}

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
  return data
}

export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// ── Feed (Blogs + Posts combined) ─────────────────────────
// Master prompt note: blogs + posts = "Feed" এ combine করা হয়েছে

export async function getFeedItems({ limit, offset = 0, category, tag, type } = {}) {
  let query = supabase
    .from('feed')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  if (type)     query = query.eq('type', type)         // 'blog' | 'post'
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

// ── Comments ───────────────────────────────────────────────

export async function getApprovedComments(contentType, contentId) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      users:user_id (id, display_name, username, avatar_url)
    `)
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getCommentCount(contentType, contentId) {
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('status', 'approved')
  if (error) throw error
  return count
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
    .select('id, display_name, username, avatar_url, bio, website, banner_url, created_at, badges:user_badges(badge_id, badges(*))')
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
    .select('*, users:user_id (display_name, avatar_url, username)')
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
  if (error) return false // error হলে allow করো
  return count >= limit   // true = rate limited
}

// ── Analytics (page events) ────────────────────────────────

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

// ── NEW v2.4.0 additions ───────────────────────────────────

// ── Likes (per-user) ──────────────────────────────────────

/** Returns 'like' | 'dislike' | null for the current user on a content item */
export async function getUserLikeStatus(contentType, contentId, userId) {
  const { data, error } = await supabase
    .from('likes')
    .select('type')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  return data?.type ?? null
}

/**
 * Toggle like/dislike on a content item.
 * - Same type → remove vote
 * - Different type → switch
 * - No existing → add
 * Also updates likes_count / dislikes_count on the parent table.
 */
export async function toggleLike(contentType, contentId, userId, type) {
  // Get existing vote
  const { data: existing } = await supabase
    .from('likes')
    .select('id, type')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('user_id', userId)
    .maybeSingle()

  const table = contentType === 'project' ? 'projects' : 'feed'

  if (existing) {
    if (existing.type === type) {
      // Remove vote
      await supabase.from('likes').delete().eq('id', existing.id)
      await supabase.rpc('decrement_count', { tbl: table, row_id: contentId, col: `${type}s_count` })
    } else {
      // Switch vote
      await supabase.from('likes').update({ type }).eq('id', existing.id)
      await supabase.rpc('decrement_count', { tbl: table, row_id: contentId, col: `${existing.type}s_count` })
      await supabase.rpc('increment_count', { tbl: table, row_id: contentId, col: `${type}s_count` })
    }
  } else {
    // New vote
    await supabase.from('likes').insert({ content_type: contentType, content_id: contentId, user_id: userId, type })
    await supabase.rpc('increment_count', { tbl: table, row_id: contentId, col: `${type}s_count` })
  }
}

// ── Comments (submit) ─────────────────────────────────────

/**
 * Submit a new comment.
 * Rate-limit check: max 10/day per user (checked server-side via spam_tracking).
 */
export async function submitComment({ contentType, contentId, contentSlug, userId, text }) {
  // Rate limit check: 10 comments per day per user
  const dayStart = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', dayStart)
  if (count >= 10) {
    throw new Error('rate_limit: You can post max 10 comments per day. Please try again later.')
  }

  const { error } = await supabase.from('comments').insert({
    content_type: contentType,
    content_id:   contentId,
    content_slug: contentSlug,
    user_id:      userId,
    text,
    status: 'pending',
  })
  if (error) throw error
}

// ── Views (increment) ─────────────────────────────────────

/** Track a view — deduplicates by localStorage key per session */
export async function trackContentView(contentType, contentId) {
  const key = `viewed_${contentType}_${contentId}`
  if (sessionStorage.getItem(key)) return // already counted this session
  sessionStorage.setItem(key, '1')

  const table = contentType === 'project' ? 'projects' : 'feed'
  await supabase.rpc('increment_count', { tbl: table, row_id: contentId, col: 'views_count' })
}

// ── Related Projects ──────────────────────────────────────

/** Returns up to 3 projects in the same category, excluding current */
export async function getRelatedProjects(category, excludeId, limit = 3) {
  const { data, error } = await supabase
    .from('projects')
    .select('id, slug, title, short_description, thumbnail_url, category, tags')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .eq('category', category)
    .neq('id', excludeId)
    .limit(limit)
  if (error) throw error
  return data || []
}

// ── Featured count helper ─────────────────────────────────

/** Count of featured (home) projects – used by admin to enforce max 6 */
export async function getFeaturedCount() {
  const { count, error } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('is_featured', true)
  if (error) throw error
  return count ?? 0
}
