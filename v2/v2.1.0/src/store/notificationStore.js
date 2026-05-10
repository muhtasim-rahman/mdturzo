// ============================================================
// NOTIFICATION STORE — Zustand
// Firebase Realtime DB থেকে notifications listen করে
// ============================================================

import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  notifications: [],   // all active notifications from RTDB
  reads:         {},   // { notifId: true } — this user এর reads
  unreadCount:   0,
  isOpen:        false,
  unsubscribe:   null, // RTDB listener cleanup

  setNotifications: (notifications) => {
    const { reads } = get()
    const unread = notifications.filter(
      (n) => n.active && !reads[n.id]
    ).length
    set({ notifications, unreadCount: unread })
  },

  setReads: (reads) => {
    const { notifications } = get()
    const unread = notifications.filter(
      (n) => n.active && !reads[n.id]
    ).length
    set({ reads, unreadCount: unread })
  },

  markRead: (notifId) => {
    set((s) => {
      const reads = { ...s.reads, [notifId]: true }
      const unread = s.notifications.filter(
        (n) => n.active && !reads[n.id]
      ).length
      return { reads, unreadCount: unread }
    })
  },

  markAllRead: () => {
    const { notifications } = get()
    const reads = notifications.reduce((acc, n) => {
      acc[n.id] = true
      return acc
    }, {})
    set({ reads, unreadCount: 0 })
  },

  toggleOpen: () => set((s) => ({ isOpen: !s.isOpen })),
  setOpen:    (isOpen) => set({ isOpen }),

  setUnsubscribe: (fn) => set({ unsubscribe: fn }),

  cleanup: () => {
    const { unsubscribe } = get()
    if (unsubscribe) unsubscribe()
    set({
      notifications: [],
      reads:         {},
      unreadCount:   0,
      isOpen:        false,
      unsubscribe:   null,
    })
  },
}))
