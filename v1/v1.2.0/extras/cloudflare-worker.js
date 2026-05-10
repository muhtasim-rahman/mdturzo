// =============================================================================
// CLOUDFLARE WORKER — portfolio.programs-turzo.workers.dev
// Proxies API requests so secret keys are never exposed in frontend code.
//
// HOW TO DEPLOY:
// 1. Go to: https://dash.cloudflare.com → Workers & Pages → Create Worker
// 2. Paste this entire file → Save and Deploy
// 3. Go to Settings → Variables and Secrets → add:
//      imgbb_api = your-imgbb-api-key  (mark as Secret / Encrypted)
// =============================================================================

export default {
  async fetch(request, env) {
    const url    = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    const allowedOrigins = [
      'https://mdturzo.web.app',
      'https://mdturzo.firebaseapp.com',
      'http://localhost:5000',
      'http://127.0.0.1:5000',
      'http://localhost:3000',
    ];

    const corsHeaders = {
      'Access-Control-Allow-Origin':  allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age':       '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Route: POST /upload-image → proxy to ImgBB
    if (url.pathname === '/upload-image' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        formData.append('key', env.imgbb_api); // secret injected here
        const res  = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: res.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Route: GET /health — status check (used in admin panel)
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
