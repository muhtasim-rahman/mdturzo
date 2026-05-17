// ============================================================
// useAdmin — Admin-only guard hook
// ============================================================

import { useAuthStore } from '../store/authStore.js'

export function useAdmin() {
  const { isAdmin, authLoading } = useAuthStore((s) => ({
    isAdmin:     s.isAdmin,
    authLoading: s.authLoading,
  }))

  return { isAdmin, authLoading }
}
