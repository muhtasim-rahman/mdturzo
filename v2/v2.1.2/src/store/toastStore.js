// ============================================================
// TOAST STORE — Zustand
// Types: success | error | warning | info
// ============================================================

import { create } from 'zustand'

let toastId = 0

const DURATIONS = {
  success: 4000,
  info:    4000,
  warning: 6000,
  error:   null,  // manual close only
}

export const useToastStore = create((set, get) => ({
  toasts: [],

  // ── Add a toast ───────────────────────────────────────────
  addToast: ({ type = 'info', title, message, duration }) => {
    const id       = ++toastId
    const autoDur  = duration ?? DURATIONS[type]
    const newToast = { id, type, title, message, duration: autoDur }

    set((s) => ({
      toasts: [newToast, ...s.toasts].slice(0, 5), // max 5 stack
    }))

    if (autoDur) {
      setTimeout(() => get().removeToast(id), autoDur)
    }

    return id
  },

  // ── Remove a toast ────────────────────────────────────────
  removeToast: (id) => {
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    }))
  },

  // ── Shorthand helpers ─────────────────────────────────────
  success: (title, message) =>
    useToastStore.getState().addToast({ type: 'success', title, message }),

  error: (title, message) =>
    useToastStore.getState().addToast({ type: 'error', title, message }),

  warning: (title, message) =>
    useToastStore.getState().addToast({ type: 'warning', title, message }),

  info: (title, message) =>
    useToastStore.getState().addToast({ type: 'info', title, message }),
}))

// Global shorthand: toast.success('Saved', 'Changes saved successfully')
export const toast = {
  success: (title, msg) => useToastStore.getState().success(title, msg),
  error:   (title, msg) => useToastStore.getState().error(title, msg),
  warning: (title, msg) => useToastStore.getState().warning(title, msg),
  info:    (title, msg) => useToastStore.getState().info(title, msg),
}
