// ============================================================
// AUTH STORE — Zustand
// Firebase Auth state + isAdmin + profile loading
// v2.4.8: localStorage cache for instant profile display on reload
// ============================================================

import { create } from 'zustand'

const CACHE_KEY = 'auth_profile_cache'

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Expire after 24h
    if (Date.now() - parsed._ts > 86_400_000) { localStorage.removeItem(CACHE_KEY); return null }
    return parsed
  } catch { return null }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, _ts: Date.now() }))
  } catch {}
}

function clearCache() {
  try { localStorage.removeItem(CACHE_KEY) } catch {}
}

// Pre-load from cache so navbar shows instantly without flash
const cached = readCache()

export const useAuthStore = create((set, get) => ({
  // ── State ─────────────────────────────────────────────────
  user:          null,   // Firebase User object
  profile:       cached?.profile ?? null,   // Supabase users row (pre-loaded from cache)
  avatar:        cached?.avatar  ?? null,   // Quick access for navbar
  isAdmin:       false,
  authLoading:   true,   // true until first auth check done
  profileLoading: false,

  // ── Actions ───────────────────────────────────────────────
  setUser: (user) => set({ user }),

  setProfile: (profile) => {
    const avatar = profile?.photo_url ?? null
    writeCache({ profile, avatar })
    set({ profile, avatar })
  },

  setIsAdmin: (isAdmin) => set({ isAdmin }),

  setAuthLoading: (authLoading) => set({ authLoading }),

  setProfileLoading: (profileLoading) => set({ profileLoading }),

  clearAuth: () => {
    clearCache()
    set({
      user:          null,
      profile:       null,
      avatar:        null,
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
    get().avatar || get().profile?.photo_url || get().user?.photoURL || null,
}))
