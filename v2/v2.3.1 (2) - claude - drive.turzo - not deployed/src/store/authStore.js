// ============================================================
// AUTH STORE — Zustand
// Firebase Auth state + isAdmin + profile loading
// ============================================================

import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  // ── State ─────────────────────────────────────────────────
  user:          null,   // Firebase User object
  profile:       null,   // Supabase users row
  isAdmin:       false,
  authLoading:   true,   // true until first auth check done
  profileLoading: false,

  // ── Actions ───────────────────────────────────────────────
  setUser: (user) => set({ user }),

  setProfile: (profile) => set({ profile }),

  setIsAdmin: (isAdmin) => set({ isAdmin }),

  setAuthLoading: (authLoading) => set({ authLoading }),

  setProfileLoading: (profileLoading) => set({ profileLoading }),

  clearAuth: () => set({
    user:          null,
    profile:       null,
    isAdmin:       false,
    authLoading:   false,
    profileLoading: false,
  }),

  // Helpers
  isLoggedIn:       () => !!get().user,
  isEmailVerified:  () => get().user?.emailVerified === true,
  getUID:           () => get().user?.uid || null,
  getDisplayName:   () =>
    get().profile?.display_name || get().user?.displayName || 'Anonymous',
  getAvatar:        () =>
    get().profile?.photo_url || get().user?.photoURL || null,
}))
