// ============================================================
// ANALYTICS — Firebase GA4 event tracking
// ============================================================

import { logEvent } from 'firebase/analytics'
import { analytics }   from '../config/firebase.config.js'
import { trackPageView } from './supabase.js'

function fa(event, params = {}) {
  if (!analytics) return
  try {
    logEvent(analytics, event, params)
  } catch {}
}

// ── Page Views ─────────────────────────────────────────────
export async function trackPage(pageName, uid = null) {
  fa('page_view', { page_title: pageName, page_path: window.location.pathname })

  // Supabase analytics table (no PII, just page name)
  await trackPageView(window.location.pathname, uid).catch(() => {})
}

// ── Content Events ─────────────────────────────────────────
export function trackProjectView(slug)  { fa('project_view',  { slug }) }
export function trackBlogView(slug)     { fa('blog_view',     { slug }) }
export function trackPostView(slug)     { fa('post_view',     { slug }) }
export function trackCVDownload()       { fa('cv_download') }

// ── Auth Events ────────────────────────────────────────────
export function trackLogin(method)      { fa('login',  { method }) }
export function trackSignup(method)     { fa('sign_up', { method }) }

// ── Engagement ─────────────────────────────────────────────
export function trackContactSubmit(type) { fa('contact_submit', { type }) }
export function trackLike(contentType)   { fa('content_like',   { content_type: contentType }) }
export function trackComment(contentType){ fa('comment_submit',  { content_type: contentType }) }
export function trackShare(method, slug) { fa('share',           { method, content_id: slug }) }
