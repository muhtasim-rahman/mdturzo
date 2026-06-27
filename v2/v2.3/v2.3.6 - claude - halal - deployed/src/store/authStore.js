// ============================================================
// AUTH STORE — Zustand
// Firebase Auth state + isAdmin + profile loading
// v2.3.6: localStorage profile cache (24h TTL) -- on reload, the
// last-known profile for the SAME uid is shown immediately while
// the real Supabase fetch + admin check run in the background, so
// the navbar avatar/name no longer flashes blank-then-populated.
// ============================================================

import { create } from 'zustand'

const CACHE_KEY = 'auth_profile_cache_v1'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

export function readProfileCache(uid) {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.uid !== uid) return null
    if (Date.now() - parsed.cachedAt > CACHE_TTL) return null
    return parsed.profile
  } catch {
    return null
  }
}

export function writeProfileCache(uid, profile) {
  try {
    if (!uid || !profile) return
    localStorage.setItem(CACHE_KEY, JSON.stringify({ uid, profile, cachedAt: Date.now() }))
  } catch { /* storage unavailable/full -- not critical, just skip caching */ }
}

export function clearProfileCache() {
  try { localStorage.removeItem(CACHE_KEY) } catch {}
}

export const useAuthStore = create((set, get) => ({
  // ── State ─────────────────────────────────────────────────
  user:          null,   // Firebase User object
  profile:       null,   // Supabase users row
  isAdmin:       false,
  authLoading:   true,   // true until first auth check done
  profileLoading: false,

  // ── Actions ───────────────────────────────────────────────
  setUser: (user) => set({ user }),

  setProfile: (profile) => {
    set({ profile })
    const uid = get().user?.uid
    if (uid && profile) writeProfileCache(uid, profile)
  },

  setIsAdmin: (isAdmin) => set({ isAdmin }),

  setAuthLoading: (authLoading) => set({ authLoading }),

  setProfileLoading: (profileLoading) => set({ profileLoading }),

  clearAuth: () => {
    clearProfileCache()
    set({
      user:          null,
      profile:       null,
      isAdmin:       false,
      authLoading:   false,
      profileLoading: false,
    })
  },

  // Helpers
  isLoggedIn:       () => !!get().user,
  isEmailVerified:  () => get().user?.emailVerified === true,
  getUID:           () => get().user?.uid || null,
  getDisplayName:   () =>
    get().profile?.display_name || get().user?.displayName || 'Anonymous',
  getAvatar:        () =>
    get().profile?.photo_url || get().user?.photoURL || null,
}))
