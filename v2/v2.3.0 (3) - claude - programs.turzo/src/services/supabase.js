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
