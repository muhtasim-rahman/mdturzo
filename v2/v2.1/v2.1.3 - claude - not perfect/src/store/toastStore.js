// ============================================================
// TOAST STORE — v2.1.3
// max 3 toasts at once (oldest removed when new one arrives)
// default timeout 3 sec | error 5 sec | warning 4 sec
// ============================================================

import { create } from 'zustand'

let toastId = 0

const DURATIONS = {
  success: 3000,
  info:    3000,
  warning: 4000,
  error:   5000,
}

const MAX_TOASTS = 3

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: ({ type = 'info', title, message, duration }) => {
    const id      = ++toastId
    const autoDur = duration ?? DURATIONS[type]
    const newToast = { id, type, title, message, duration: autoDur }

    set((s) => {
      const next = [newToast, ...s.toasts]
      // remove excess — oldest are at the end
      const trimmed = next.slice(0, MAX_TOASTS)
      // cancel timers of removed ones (they self-cancel via removeToast no-op)
      return { toasts: trimmed }
    })

    if (autoDur) setTimeout(() => get().removeToast(id), autoDur)
    return id
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export const toast = {
  success: (title, msg, opts) => useToastStore.getState().addToast({ type: 'success', title, message: msg, ...opts }),
  error:   (title, msg, opts) => useToastStore.getState().addToast({ type: 'error',   title, message: msg, ...opts }),
  warning: (title, msg, opts) => useToastStore.getState().addToast({ type: 'warning', title, message: msg, ...opts }),
  info:    (title, msg, opts) => useToastStore.getState().addToast({ type: 'info',    title, message: msg, ...opts }),
}