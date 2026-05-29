// ============================================================
// useNotifications — Firebase RTDB listener
// App এ mount হলে automatically subscribe করে
// ============================================================

import { useEffect } from 'react'
import { useAuthStore }         from '../store/authStore.js'
import { useNotificationStore } from '../store/notificationStore.js'
import {
  listenToNotifications,
  listenToNotificationReads,
  markNotificationRead,
} from '../services/firebase.js'

export function useNotificationListener() {
  const uid = useAuthStore((s) => s.getUID())
  const { setNotifications, setReads, setUnsubscribe, cleanup } = useNotificationStore()

  useEffect(() => {
    // Notifications — সবাই দেখতে পারে (signed-in)
    const unsubNotifs = listenToNotifications((notifs) => {
      // Expired বা inactive filter করো
      const now    = Date.now()
      const active = notifs.filter((n) =>
        n.active !== false &&
        (!n.expires_at || new Date(n.expires_at).getTime() > now)
      )
      setNotifications(active)
    })

    // Reads — শুধু logged-in user এর জন্য
    let unsubReads = () => {}
    if (uid) {
      unsubReads = listenToNotificationReads(uid, (reads) => setReads(reads || {}))
    }

    setUnsubscribe(() => {
      unsubNotifs()
      unsubReads()
    })

    return () => {
      unsubNotifs()
      unsubReads()
    }
  }, [uid])
}

export function useNotifications() {
  const store = useNotificationStore()

  const markRead = async (notifId) => {
    const uid = useAuthStore.getState().getUID()
    if (!uid) return

    store.markRead(notifId) // Optimistic UI update

    try {
      await markNotificationRead(uid, notifId)
    } catch (err) {
      console.warn('[useNotifications] markRead failed:', err.message)
    }
  }

  return {
    notifications: store.notifications,
    unreadCount:   store.unreadCount,
    isOpen:        store.isOpen,
    toggleOpen:    store.toggleOpen,
    setOpen:       store.setOpen,
    markRead,
    markAllRead:   store.markAllRead,
  }
}
