// ============================================================
// Supabase Service — v2.4.7 — All database query helpers
// UPDATED v2.4.7:
//   - Comments: 3000 chars, parent_id (replies), is_anonymous,
//               likes_count, direct public (status='approved')
//   - Reviews: 1000 chars, likes, admin reply, direct public
//   - review_likes / comment_likes toggle functions
//   - saved_projects (bookmark feature)
//   - Realtime subscriptions for comments + reviews
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
      id, slug, title, short_name, tagline, short_description, thumbnail_url, og_image_url,
      github_link, live_link, pdf_link, custom_link, custom_link_label,
      tags, category, type, platform, status, visibility, project_status,
      is_featured, featured_order, sort_order, accent,
      views_count, likes_count, dislikes_count, comments_count, reviews_count, avg_rating,
      created_at,
      tech_stack, languages, frameworks, libraries, backend, database, hosting,
      key_features, complexity_level,
      version, year_built, duration, project_timeline,
      team_size, role, institution, client,
      open_source, has_pwa, has_dark_mode, has_responsive,
      is_highlighted, highlight_label, seo_keywords
    `)
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('sort_order', { ascending: true })
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
    .select(`
      id, slug, title, short_name, tagline, short_description, thumbnail_url,
      github_link, live_link, tags, category, type, accent,
      is_featured, featured_order, views_count, likes_count, avg_rating, reviews_count,
      tech_stack, languages, project_status, complexity_level,
      open_source, has_pwa, has_responsive, is_highlighted, highlight_label
    `)
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

// Count published public projects — used for stats counters
export async function getProjectCount() {
  const { count, error } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('visibility', 'public')
  if (error) throw error
  return count ?? 0
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

// Fetch all root comments + replies for a content item
// Returns flat list; parent_id=null are roots, others are replies
export async function getComments(contentType, contentId, sort = 'latest') {
  let query = supabase
    .from('comments')
    .select('*, users:user_id (id, display_name, username, photo_url)')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('status', 'approved')
    .eq('is_hidden', false)

  if (sort === 'oldest')     query = query.order('created_at', { ascending: true })
  else if (sort === 'top')   query = query.order('likes_count', { ascending: false }).order('created_at', { ascending: false })
  else                       query = query.order('created_at', { ascending: false }) // latest

  const { data, error } = await query
  if (error) throw error
  return data
}

// Legacy alias (used by old CommentSection)
export async function getApprovedComments(contentType, contentId) {
  return getComments(contentType, contentId, 'latest')
}

export async function submitComment({
  contentType, contentId, contentSlug,
  userId, text, parentId = null,
  isAnonymous = false, deviceInfo = {}
}) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content_type:  contentType,
      content_id:    contentId,
      content_slug:  contentSlug,
      user_id:       userId,
      text:          text?.slice(0, 3000),
      parent_id:     parentId || null,
      is_anonymous:  isAnonymous,
      status:        'approved',  // direct public
      device_info:   deviceInfo,
    })
    .select('*, users:user_id (id, display_name, username, photo_url)')
    .single()
  if (error) throw error
  return data
}

export async function updateComment(commentId, userId, text) {
  const { data, error } = await supabase
    .from('comments')
    .update({ text: text?.slice(0, 3000), updated_at: new Date().toISOString() })
    .eq('id', commentId)
    .eq('user_id', userId)
    .select('*, users:user_id (id, display_name, username, photo_url)')
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

export async function toggleCommentLike(commentId, userId) {
  if (!userId) throw new Error('Login required')
  const { data, error } = await supabase.rpc('toggle_comment_like', {
    p_comment_id: commentId,
    p_user_id: userId,
  })
  if (error) throw error
  return data // { liked: true/false }
}

export async function getUserCommentLikes(commentIds, userId) {
  if (!userId || !commentIds.length) return []
  const { data, error } = await supabase
    .from('comment_likes')
    .select('comment_id')
    .eq('user_id', userId)
    .in('comment_id', commentIds)
  if (error) throw error
  return data.map(r => r.comment_id)
}

// Comment rate limit check (per content item, 1h window)
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

// ── Saved Projects ─────────────────────────────────────────

export async function getSavedStatus(userId, projectId) {
  if (!userId) return false
  const { count, error } = await supabase
    .from('saved_projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('project_id', projectId)
  if (error) return false
  return (count ?? 0) > 0
}

export async function toggleSaveProject(userId, projectId) {
  if (!userId) throw new Error('Login required')
  const saved = await getSavedStatus(userId, projectId)
  if (saved) {
    const { error } = await supabase
      .from('saved_projects')
      .delete()
      .eq('user_id', userId)
      .eq('project_id', projectId)
    if (error) throw error
    return false
  } else {
    const { error } = await supabase
      .from('saved_projects')
      .insert({ user_id: userId, project_id: projectId })
    if (error) throw error
    return true
  }
}

export async function getSavedProjects(userId) {
  if (!userId) return []
  const { data, error } = await supabase
    .from('saved_projects')
    .select('project_id, created_at, projects (id, slug, title, short_description, thumbnail_url, category, tags)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
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

// ── Project Reviews ────────────────────────────────────────

export async function getProjectReviews(projectId, { limit = 100, sort = 'latest', starFilter = null } = {}) {
  let query = supabase
    .from('project_reviews')
    .select('*, users:user_id (display_name, photo_url, username)')
    .eq('project_id', projectId)
    .eq('status', 'approved')

  if (starFilter) query = query.eq('rating', starFilter)

  if (sort === 'oldest')      query = query.order('created_at', { ascending: true })
  else if (sort === 'top')    query = query.order('likes_count', { ascending: false }).order('created_at', { ascending: false })
  else                        query = query.order('created_at', { ascending: false }) // latest

  query = query.limit(limit)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getUserProjectReview(projectId, userId) {
  if (!userId) return null
  const { data, error } = await supabase
    .from('project_reviews')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data || null
}

export async function submitProjectReview({ projectId, userId, rating, message }) {
  if (!userId) throw new Error('Login required')
  const { data, error } = await supabase
    .from('project_reviews')
    .upsert({
      project_id: projectId,
      user_id:    userId,
      rating,
      message:    message?.trim()?.slice(0, 1000) || null,
      status:     'approved',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'project_id,user_id' })
    .select('*, users:user_id (display_name, photo_url, username)')
    .single()
  if (error) throw error
  return data
}

export async function deleteProjectReview(reviewId, userId) {
  const { error } = await supabase
    .from('project_reviews')
    .delete()
    .eq('id', reviewId)
    .eq('user_id', userId)
  if (error) throw error
}

export async function toggleReviewLike(reviewId, userId) {
  if (!userId) throw new Error('Login required')
  const { data, error } = await supabase.rpc('toggle_review_like', {
    p_review_id: reviewId,
    p_user_id: userId,
  })
  if (error) throw error
  return data // { liked: true/false }
}

export async function getUserReviewLikes(reviewIds, userId) {
  if (!userId || !reviewIds.length) return []
  const { data, error } = await supabase
    .from('review_likes')
    .select('review_id')
    .eq('user_id', userId)
    .in('review_id', reviewIds)
  if (error) throw error
  return data.map(r => r.review_id)
}

// ── Reviews (global — for testimonials section) ────────────────────────────────────────────────

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

