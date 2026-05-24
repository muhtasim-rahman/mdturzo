// ============================================================
// CLOUDFLARE WORKER — portfolio.programs-turzo.workers.dev
//
// SECRET VARIABLES — Cloudflare Dashboard এ manually add করতে হবে:
// Workers & Pages → mdturzo-worker → Settings → Variables → Add variable
//
// Variable Name      | Example Value           | কাজ
// -------------------|-------------------------|-----------------------------
// imgbb_api          | abc123xyz...            | ImgBB image upload API key
// recaptcha_secret   | 6Lc...secret...         | reCAPTCHA v3 secret key
// resend_api         | re_abc123...            | Resend email API key
// admin_email        | mdturzo.dev@gmail.com   | যেখানে notifications যাবে
// supabase_url       | https://kdd...co        | Supabase project URL
// supabase_service   | eyJhbGci...service_role | Supabase service role key (⚠️ secret)
//
// ⚠️  All variables → Type: Secret  → Encrypt করো
// ============================================================

const ALLOWED_ORIGINS = [
  'https://mdturzo.web.app',
  'https://mdturzo.firebaseapp.com',
  'http://localhost:5173',
  'http://localhost:4173',
]

// ── CORS Helper ────────────────────────────────────────────
function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age':       '86400',
  }
}

function jsonResponse(data, status = 200, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

function errorResponse(message, status = 400, corsHeaders = {}) {
  return jsonResponse({ success: false, error: message }, status, corsHeaders)
}

// ── Main Handler ───────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url    = new URL(request.url)
    const origin = request.headers.get('Origin') || ''
    const cors   = getCorsHeaders(origin)

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    // POST only for data routes
    if (request.method !== 'POST' && url.pathname !== '/health') {
      return errorResponse('Method not allowed', 405, cors)
    }

    // ── Route: GET /health ─────────────────────────────────
    if (url.pathname === '/health') {
      return jsonResponse({
        success: true,
        worker:  'online',
        version: '2.0.0',
        ts:      new Date().toISOString(),
      }, 200, cors)
    }

    // ── Route: POST /upload-image → ImgBB ─────────────────
    if (url.pathname === '/upload-image') {
      try {
        if (!env.imgbb_api) throw new Error('imgbb_api not configured')

        const body     = await request.formData()
        const imageFile = body.get('image')
        if (!imageFile) return errorResponse('No image provided', 400, cors)

        const formData = new FormData()
        formData.append('key',   env.imgbb_api)
        formData.append('image', imageFile)

        // Optional: custom name
        const name = body.get('name')
        if (name) formData.append('name', name)

        const res  = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body:   formData,
        })
        const data = await res.json()

        if (!data.success) {
          return errorResponse(data.error?.message || 'ImgBB upload failed', 500, cors)
        }

        return jsonResponse({
          success:   true,
          url:       data.data.url,
          thumb:     data.data.thumb?.url,
          medium:    data.data.medium?.url,
          display:   data.data.display_url,
          deleteUrl: data.data.delete_url,
          size:      data.data.size,
        }, 200, cors)

      } catch (err) {
        return errorResponse(err.message, 500, cors)
      }
    }

    // ── Route: POST /verify-recaptcha → Google ─────────────
    if (url.pathname === '/verify-recaptcha') {
      try {
        if (!env.recaptcha_secret) {
          // reCAPTCHA not configured yet → pass through
          return jsonResponse({ success: true, score: 1.0, note: 'recaptcha_not_configured' }, 200, cors)
        }

        const { token } = await request.json()
        if (!token) return errorResponse('No token provided', 400, cors)

        const res = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${env.recaptcha_secret}&response=${token}`,
          { method: 'POST' }
        )
        const data = await res.json()

        return jsonResponse({
          success: data.success,
          score:   data.score,
          action:  data.action,
        }, 200, cors)

      } catch (err) {
        return errorResponse(err.message, 500, cors)
      }
    }

    // ── Route: POST /send-email → Resend ──────────────────
    if (url.pathname === '/send-email') {
      try {
        if (!env.resend_api) throw new Error('resend_api not configured')

        const body = await request.json()
        const { to, subject, html, replyTo, from_name } = body

        if (!subject || !html) return errorResponse('Missing subject or html', 400, cors)

        const res = await fetch('https://api.resend.com/emails', {
          method:  'POST',
          headers: {
            'Authorization': `Bearer ${env.resend_api}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            from:     `${from_name || 'Muhtasim Portfolio'} <noreply@mdturzo.web.app>`,
            to:       to || env.admin_email,
            subject,
            html,
            reply_to: replyTo || env.admin_email,
          }),
        })

        const data = await res.json()

        if (res.ok) {
          return jsonResponse({ success: true, id: data.id }, 200, cors)
        } else {
          return errorResponse(data.message || 'Resend error', res.status, cors)
        }

      } catch (err) {
        return errorResponse(err.message, 500, cors)
      }
    }

    // ── Route: POST /supabase-admin → Supabase (service role) ─
    // Admin-level writes যেগুলো anon key দিয়ে করা যায় না
    if (url.pathname === '/supabase-admin') {
      try {
        if (!env.supabase_url || !env.supabase_service) {
          throw new Error('Supabase service config missing')
        }

        const body = await request.json()
        const { table, operation, data: rowData, match } = body

        // Only allow specific tables for security
        const ALLOWED_TABLES = [
          'users', 'comments', 'likes', 'reports', 'reviews',
          'messages', 'activity_logs', 'spam_tracking', 'analytics',
          'user_badges', 'admins', 'site_settings', 'page_visibility',
        ]
        if (!ALLOWED_TABLES.includes(table)) {
          return errorResponse('Table not allowed', 403, cors)
        }

        let endpoint = `${env.supabase_url}/rest/v1/${table}`
        let method   = 'POST'
        let reqBody  = JSON.stringify(rowData)

        if (operation === 'upsert') {
          method   = 'POST'
          endpoint += '?on_conflict=id'
        } else if (operation === 'update' && match) {
          method   = 'PATCH'
          const params = new URLSearchParams(
            Object.entries(match).map(([k, v]) => [`${k}`, `eq.${v}`])
          )
          endpoint += `?${params}`
        } else if (operation === 'delete' && match) {
          method   = 'DELETE'
          const params = new URLSearchParams(
            Object.entries(match).map(([k, v]) => [`${k}`, `eq.${v}`])
          )
          endpoint += `?${params}`
          reqBody  = null
        }

        const res = await fetch(endpoint, {
          method,
          headers: {
            'apikey':        env.supabase_service,
            'Authorization': `Bearer ${env.supabase_service}`,
            'Content-Type':  'application/json',
            'Prefer':        'return=representation',
          },
          body: reqBody,
        })

        const result = res.status === 204 ? null : await res.json()
        return jsonResponse({ success: res.ok, data: result }, res.ok ? 200 : res.status, cors)

      } catch (err) {
        return errorResponse(err.message, 500, cors)
      }
    }

    // ── 404 ───────────────────────────────────────────────
    return errorResponse('Route not found', 404, cors)
  }
}
