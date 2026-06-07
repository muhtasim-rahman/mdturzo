// ============================================================
// THEME STORE — Zustand
// v2.4.8:
//   - Default theme is now LIGHT (was dark)
//   - If no localStorage theme:
//       1. Check URL for 'localhost' → dark (dev shortcut)
//       2. Otherwise use 'light' as default
//   - Website default theme can be set via Supabase site_settings
//     (key: 'default_theme', value: 'light' | 'dark')
//   - User's own choice always takes priority (localStorage)
// ============================================================

import { create } from 'zustand'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// URL-based dev shortcut: localhost always starts in dark mode
function getDefaultTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    // Dev shortcut: localhost → dark
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return 'dark'
    // Default: light (website default, Supabase can override via setDefaultTheme)
    return 'light'
  } catch { return 'light' }
}

function applyTheme(theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.setAttribute('data-theme', resolved)
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const initialTheme = getDefaultTheme()
applyTheme(initialTheme)

export const useThemeStore = create((set, get) => ({
  theme: initialTheme,

  setTheme: (theme) => {
    try { localStorage.setItem('theme', theme) } catch {}
    applyTheme(theme)
    set({ theme })
  },

  // Called by useSiteSettings after fetching Supabase default_theme
  // Only applies if user hasn't set their own preference
  setDefaultTheme: (defaultTheme) => {
    try {
      const userPref = localStorage.getItem('theme')
      // Only apply if user has no saved preference and not on localhost
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      if (!userPref && !isLocalhost && defaultTheme) {
        applyTheme(defaultTheme)
        set({ theme: defaultTheme })
      }
    } catch {}
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
}))

// System preference change listener
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useThemeStore.getState()
    if (theme === 'system') applyTheme('system')
  })
}
