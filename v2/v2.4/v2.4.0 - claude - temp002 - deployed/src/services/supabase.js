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

// ── Project Count (v2.3.6 — live stats on Home/About) ──────
// Counts only published + public projects. Used to replace the
// static site_settings.stats_projects number with the real count.

export async function getProjectCount() {
  const { count, error } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('visibility', 'public')
  if (error) throw error
  return count
}

// ── About Page Data (v2.3.6 — migrated from hardcoded JS) ───
// Every About section now reads from Supabase first. Each fetcher
// can fail independently (network/RLS/etc.) -- the calling component
// always keeps its own hardcoded array as a fallback, so the About
// page NEVER breaks even if these tables are empty or unreachable.
// All rows are ordered by `sort_order` so re-ordering content later
// from an admin panel is just an UPDATE, no code change needed.

export async function getAboutTimeline() {
  const { data, error } = await supabase
    .from('about_timeline')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getAboutSkills(groupKey) {
  let query = supabase.from('about_skills').select('*').order('sort_order', { ascending: true })
  if (groupKey) query = query.eq('group_key', groupKey)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getAboutLanguages() {
  const { data, error } = await supabase
    .from('about_languages')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getAboutValues() {
  const { data, error } = await supabase
    .from('about_values')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getAboutHobbies() {
  const { data, error } = await supabase
    .from('about_hobbies')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getAboutGoals() {
  const { data, error } = await supabase
    .from('about_goals')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getAboutConnect() {
  const { data, error } = await supabase
    .from('about_connect')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

// ── Projects (v2.4.0 additions) ────────────────────────────

export async function getPublishedProjectsV2({
  limit = 12,
  offset = 0,
  category,
  tag,
  search,
  sortBy = 'created_at',
  sortDir = 'desc',
} = {}) {
  let query = supabase
    .from('projects')
    .select('id,slug,title,short_name,tagline,short_description,thumbnail_url,banner_url,demo_gif_url,accent,accent_color,category,sub_category,tags,languages,frameworks,platforms,is_featured,is_pinned,is_wip,is_ongoing,is_open_source,version,status,views_count,likes_count,dislikes_count,comments_count,shares_count,rating_count,rating_avg,github_link,live_link,start_date,end_date,created_at,sort_order')
    .eq('status', 'published')
    .eq('visibility', 'public')

  if (category && category !== 'All') query = query.eq('category', category)
  if (tag) query = query.contains('tags', [tag])
  if (search) query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%,tags.cs.{${search}}`)

  const validSorts = { created_at:'created_at', views:'views_count', likes:'likes_count', rating:'rating_avg', title:'title', oldest:'created_at' }
  const col = validSorts[sortBy] || 'created_at'
  const asc = sortBy === 'oldest' || (sortDir === 'asc' && sortBy === 'title')

  query = query.order(col, { ascending: asc }).range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getProjectCategories() {
  const { data, error } = await supabase
    .from('projects')
    .select('category')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .not('category', 'is', null)
  if (error) throw error
  const counts = {}
  data.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1 })
  return Object.entries(counts).map(([category, count]) => ({ category, count })).sort((a,b) => b.count - a.count)
}

export async function getProjectDetailBySlug(slug) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function getRelatedProjects(slug, category, limit = 3) {
  const { data, error } = await supabase
    .from('projects')
    .select('id,slug,title,short_description,thumbnail_url,accent,accent_color,category,tags,views_count,rating_avg')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .eq('category', category)
    .neq('slug', slug)
    .limit(limit)
  if (error) throw error
  return data
}

// ── View tracking ──────────────────────────────────────────

export async function trackProjectView(slug, viewerKey) {
  const { data, error } = await supabase
    .rpc('track_project_view', { p_slug: slug, p_viewer_key: viewerKey })
  if (error) console.warn('[Views] track failed:', error.message)
  return data
}

// ── Likes (projects) ───────────────────────────────────────

export async function toggleProjectLike(slug, userId, reaction) {
  const { data, error } = await supabase
    .rpc('toggle_project_like', { p_slug: slug, p_user_id: userId, p_reaction: reaction })
  if (error) throw error
  return data
}

export async function getProjectLikeCounts(slug) {
  const { data, error } = await supabase
    .from('projects')
    .select('likes_count, dislikes_count')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// ── Ratings ────────────────────────────────────────────────

export async function upsertProjectRating(projectId, userId, rating) {
  const { error } = await supabase
    .rpc('upsert_project_rating', { p_project_id: projectId, p_user_id: userId, p_rating: rating })
  if (error) throw error
}

export async function getUserProjectData(slug, userId) {
  const { data, error } = await supabase
    .rpc('get_user_project_data', { p_slug: slug, p_user_id: userId })
  if (error) return { reaction: null, rating: null }
  return data
}

// ── Share count ────────────────────────────────────────────

export async function incrementShareCount(slug) {
  await supabase.rpc('increment_share_count', { p_slug: slug })
}

// ── Comments (extended for projects) ───────────────────────

export async function getProjectComments(slug, { limit = 10, offset = 0, sort = 'newest' } = {}) {
  const orderCol = sort === 'oldest' ? 'created_at' : 'created_at'
  const ascending = sort === 'oldest'
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      author:users!user_id (id, display_name, username, photo_url),
      likes:comment_likes(reaction)
    `)
    .eq('content_type', 'project')
    .eq('content_id', slug)
    .eq('status', 'approved')
    .is('parent_id', null)
    .order(orderCol, { ascending })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return data
}

export async function getCommentReplies(commentId) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      author:users!user_id (id, display_name, username, photo_url)
    `)
    .eq('parent_id', commentId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function submitComment({ contentType, contentId, userId, body, parentId = null }) {
  const { data, error } = await supabase
    .from('comments')
    .insert({ content_type: contentType, content_id: contentId, user_id: userId, body, parent_id: parentId, status: 'pending' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function toggleCommentLike(commentId, userId, reaction) {
  const { data, error } = await supabase
    .rpc('toggle_comment_like', { p_comment_id: commentId, p_user_id: userId, p_reaction: reaction })
  if (error) throw error
  return data
}

// ── Reports (for project detail) ──────────────────────────

export async function submitReport({ contentType, contentId, userId, reason, details }) {
  const { error } = await supabase
    .from('reports')
    .insert({ content_type: contentType, content_id: contentId, user_id: userId || null, reason, details })
  if (error) throw error
}

