// ============================================================
// Supabase Service — v2.4.0 — All database query helpers
// UPDATED: New project queries, likes, comments, views, reports
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

export async function getPublishedProjects({ limit, offset = 0, category, tag } = {}) {
  let query = supabase
    .from('projects')
    .select(`
      id, slug, title, tagline, short_description, thumbnail_url,
      github_link, live_link, pdf_link, custom_link, custom_link_label,
      tags, category, type, status, is_featured, featured_order, accent,
      views_count, likes_count, dislikes_count, comments_count,
      created_at, updated_at,
      tech_stack, languages, frameworks, libraries,
      backend, database, hosting,
      key_features, project_status, complexity_level,
      version, platform, project_timeline, start_date,
      team_size, role, institution, client,
      open_source, has_pwa, has_dark_mode, has_responsive,
      awards, notes, seo_keywords
    `)
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

// Home page featured projects — top 6 by featured_order
export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(`id, slug, title, tagline, short_description, thumbnail_url,
      github_link, live_link, tags, category, type,
      is_featured, featured_order, views_count, likes_count, accent,
      tech_stack, languages, project_status, complexity_level,
      open_source, has_pwa, has_responsive`)
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

// Related projects — same category, exclude current
export async function getRelatedProjects(currentSlug, category, tags = [], limit = 3) {
  // Try same category first
  let { data: catData, error: catErr } = await supabase
    .from('projects')
    .select('id, slug, title, short_description, thumbnail_url, category, tags')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .eq('category', category)
    .neq('slug', currentSlug)
    .limit(limit)
  if (catErr) throw catErr

  // If not enough, backfill with tag matches
  if (catData.length < limit && tags.length > 0) {
    const existingSlugs = [currentSlug, ...catData.map(p => p.slug)]
    const { data: tagData } = await supabase
      .from('projects')
      .select('id, slug, title, short_description, thumbnail_url, category, tags')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .contains('tags', tags.slice(0, 1))
      .not('slug', 'in', `(${existingSlugs.map(s => `"${s}"`).join(',')})`)
      .limit(limit - catData.length)
    if (tagData) catData = [...catData, ...tagData]
  }
  return catData.slice(0, limit)
}

// Get distinct categories (for filter)
export async function getProjectCategories() {
  const { data, error } = await supabase
    .from('projects')
    .select('category')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .not('category', 'is', null)
  if (error) throw error
  // unique
  return [...new Set(data.map(r => r.category))].filter(Boolean).sort()
}

// Increment view count (simple, no uniqueness check for now)
export async function incrementProjectViews(id) {
  const { error } = await supabase.rpc('increment_project_views', { project_id: id })
  // If RPC not available, fallback: just log silently
  if (error) console.warn('[Views] increment failed:', error.message)
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

export async function getUserLikeStatus(contentType, contentId, userId) {
  if (!userId) return null
  const { data, error } = await supabase
    .from('likes')
    .select('type')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data?.type ?? null
}

// Toggle like/dislike — returns new type or null (removed)
export async function toggleLike(contentType, contentId, userId, voteType) {
  if (!userId) throw new Error('Login required')

  // Check existing
  const existing = await getUserLikeStatus(contentType, contentId, userId)

  if (existing === voteType) {
    // Same vote → remove
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('content_type', contentType)
      .eq('content_id', contentId)
      .eq('user_id', userId)
    if (error) throw error
    return null
  } else {
    // Upsert
    const { error } = await supabase
      .from('likes')
      .upsert({
        content_type: contentType,
        content_id: contentId,
        user_id: userId,
        type: voteType,
      }, { onConflict: 'content_type,content_id,user_id' })
    if (error) throw error
    return voteType
  }
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
  return data
}

export async function submitComment({ contentType, contentId, contentSlug, userId, text, deviceInfo = {} }) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content_type: contentType,
      content_id: contentId,
      content_slug: contentSlug,
      user_id: userId,
      text,
      status: 'pending',
      device_info: deviceInfo,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteOwnComment(commentId, userId) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId)
  if (error) throw error
}

export async function getCommentRateLimit(userId, contentId, windowMinutes = 60) {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString()
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('content_id', contentId)
    .gte('created_at', windowStart)
  if (error) return 0
  return count
}

// ── Reports ────────────────────────────────────────────────

export async function submitReport({ contentType, contentId, reporterId, reason, description, deviceInfo = {} }) {
  const { data, error } = await supabase
    .from('reports')
    .insert({
      content_type: contentType,
      content_id: contentId,
      reporter_id: reporterId,
      reason,
      description,
      device_info: deviceInfo,
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
    .select('id, display_name, username, photo_url, bio, web_url, banner_url, created_at, social_links')
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
