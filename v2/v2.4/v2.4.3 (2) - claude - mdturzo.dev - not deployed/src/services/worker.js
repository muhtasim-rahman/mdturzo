// ============================================================
// WORKER SERVICE — Cloudflare Worker proxy calls
// ============================================================

import { SITE_CONFIG } from '../config/site.config.js'

const BASE = SITE_CONFIG.workerURL

async function workerFetch(path, body, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
    ...options,
  })

  const data = await res.json()
  if (!data.success) {
    throw new Error(data.error || `Worker error on ${path}`)
  }
  return data
}

// ── Image Upload ───────────────────────────────────────────
export async function uploadImageToImgBB(file, name) {
  const formData = new FormData()
  formData.append('image', file)
  if (name) formData.append('name', name)

  const res = await fetch(`${BASE}/upload-image`, {
    method: 'POST',
    body:   formData,
    // Note: Content-Type NOT set here — browser sets multipart boundary
  })

  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'Upload failed')
  return data
}

// ── reCAPTCHA Verify ───────────────────────────────────────
export async function verifyRecaptcha(token) {
  try {
    const data = await workerFetch('/verify-recaptcha', { token })
    return { success: data.success, score: data.score || 1.0 }
  } catch {
    // reCAPTCHA not configured → allow
    return { success: true, score: 1.0 }
  }
}

// ── Send Email ─────────────────────────────────────────────
export async function sendEmail({ to, subject, html, replyTo, from_name }) {
  return workerFetch('/send-email', { to, subject, html, replyTo, from_name })
}

// ── Health Check ───────────────────────────────────────────
export async function checkWorkerHealth() {
  try {
    const res  = await fetch(`${BASE}/health`)
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}
