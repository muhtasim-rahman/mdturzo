// ============================================================
// THEME STORE — Zustand
// dark / light / system preference auto-detect
// ============================================================

import { create } from 'zustand'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getSavedTheme() {
  return localStorage.getItem('theme') || 'dark'
}

function applyTheme(theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.setAttribute('data-theme', resolved)
  // Tailwind dark mode compat
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const useThemeStore = create((set, get) => {
  // Initialize from localStorage
  const saved = getSavedTheme()
  applyTheme(saved)

  return {
    theme: saved, // 'dark' | 'light' | 'system'

    setTheme: (theme) => {
      localStorage.setItem('theme', theme)
      applyTheme(theme)
      set({ theme })
    },

    toggleTheme: () => {
      const current = get().theme
      const next    = current === 'dark' ? 'light' : 'dark'
      get().setTheme(next)
    },

    isDark: () => {
      const t = get().theme
      return t === 'dark' || (t === 'system' && getSystemTheme() === 'dark')
    },
  }
})

// System preference change listener
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useThemeStore.getState()
    if (theme === 'system') {
      applyTheme('system')
    }
  })
}
