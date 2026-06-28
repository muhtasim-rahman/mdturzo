// ViewTracker.jsx — v2.4.0
// Invisible component. Mounts, calls track_project_view RPC once,
// then renders null. Handles 3-day dedup at the DB level via project_views table.
// viewer_key = Firebase UID (logged-in) OR stable device fingerprint (guest).

import { useEffect } from 'react'
import { trackProjectView } from '../../services/supabase.js'
import { useAuthStore } from '../../store/authStore.js'

function getGuestKey() {
  const STORAGE_KEY = 'mdturzo_vk'
  let key = localStorage.getItem(STORAGE_KEY)
  if (!key) {
    key = 'g_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9)
    try { localStorage.setItem(STORAGE_KEY, key) } catch (_) {}
  }
  return key
}

export default function ViewTracker({ slug }) {
  const user = useAuthStore(s => s.user)

  useEffect(() => {
    if (!slug) return
    const viewerKey = user?.uid || getGuestKey()
    trackProjectView(slug, viewerKey).catch(() => {})
  // run once on mount per slug
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return null
}
