// ============================================================
// useAuth — Firebase Auth listener + Supabase profile sync
// App.jsx এ একবার call হয়, পুরো app এ store দিয়ে access
// ============================================================

import { useEffect } from 'react'
import { useAuthStore }   from '../store/authStore.js'
import { onAuthChange, setUserPresence, removeUserPresence, checkIsAdminInRTDB } from '../services/firebase.js'
import { getUserByUID }   from '../services/supabase.js'
import { logActivity }    from '../services/supabase.js'

export function useAuthListener() {
  const { setUser, setProfile, setIsAdmin, setAuthLoading, setProfileLoading, clearAuth } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setProfileLoading(true)

        try {
          // Supabase profile fetch
          const profile = await getUserByUID(firebaseUser.uid)
          setProfile(profile || null)

          // Admin check (Firebase RTDB এ /admins/{uid} আছে কিনা)
          const admin = await checkIsAdminInRTDB(firebaseUser.uid)
          setIsAdmin(admin)

          // Online presence set
          setUserPresence(firebaseUser.uid)

        } catch (err) {
          console.warn('[useAuth] Profile/admin load failed:', err.message)
          setProfile(null)
          setIsAdmin(false)
        } finally {
          setProfileLoading(false)
          setAuthLoading(false)
        }

      } else {
        // Not logged in
        clearAuth()
      }
    })

    return () => {
      const { user } = useAuthStore.getState()
      if (user) removeUserPresence(user.uid)
      unsubscribe()
    }
  }, [])
}

// Simple selectors for components
export function useAuth() {
  return useAuthStore((s) => ({
    user:          s.user,
    profile:       s.profile,
    isAdmin:       s.isAdmin,
    authLoading:   s.authLoading,
    profileLoading: s.profileLoading,
    isLoggedIn:    s.isLoggedIn(),
    isEmailVerified: s.isEmailVerified(),
    uid:           s.getUID(),
    displayName:   s.getDisplayName(),
    avatar:        s.getAvatar(),
  }))
}
