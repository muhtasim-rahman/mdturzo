import { create } from 'zustand'

let toastId = 0

const DURATIONS = {
  success: 3000,
  info:    3000,
  warning: 5000,
  error:   null,
}

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: ({ type = 'info', title, message, duration }) => {
    const id = ++toastId
    const autoDur = duration ?? DURATIONS[type]
    const newToast = { id, type, title, message, duration: autoDur }

    set((s) => {
      const updated = [newToast, ...s.toasts].slice(0, 3) // max 3
      return { toasts: updated }
    })

    if (autoDur) setTimeout(() => get().removeToast(id), autoDur)
    return id
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}))

// shorthand
export const toast = {
  success: (title, msg) => useToastStore.getState().addToast({ type: 'success', title, message: msg }),
  error:   (title, msg) => useToastStore.getState().addToast({ type: 'error', title, message: msg }),
  warning: (title, msg) => useToastStore.getState().addToast({ type: 'warning', title, message: msg }),
  info:    (title, msg) => useToastStore.getState().addToast({ type: 'info', title, message: msg }),
}