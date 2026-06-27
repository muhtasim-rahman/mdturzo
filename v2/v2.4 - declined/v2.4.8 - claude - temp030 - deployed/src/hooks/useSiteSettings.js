// ============================================================
// useSiteSettings — v2.4.8
// Fetches Supabase site_settings + live project count from DB.
// statsProjects now reflects actual published projects table row count.
// v2.4.8: also reads default_theme from Supabase and applies it
//         if user has no saved preference and not on localhost.
// ============================================================

import { useState, useEffect } from 'react'
import { getSiteSettings, getProjectCount } from '../services/supabase.js'
import { SITE_CONFIG }     from '../config/site.config.js'
import { useThemeStore }   from '../store/themeStore.js'

const DEF = SITE_CONFIG.defaults

export function useSiteSettings() {
  const [settings, setSettings] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const setDefaultTheme = useThemeStore(s => s.setDefaultTheme)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [raw, projCount] = await Promise.all([
          getSiteSettings(),
          getProjectCount().catch(() => null),
        ])

        if (!cancelled) {
          const parse = (v) => {
            if (typeof v === 'string') {
              try { return JSON.parse(v) } catch { return v }
            }
            return v
          }

          // Apply Supabase default theme (only if user has no preference)
          const defaultTheme = parse(raw.default_theme)
          if (defaultTheme) setDefaultTheme(defaultTheme)

          setSettings({
            statsYearsDev:    parse(raw.stats_years_dev)    ?? DEF.statsYearsDev,
            statsYearsDesign: parse(raw.stats_years_design) ?? DEF.statsYearsDesign,
            statsProjects:    projCount != null
              ? String(projCount)
              : (parse(raw.stats_projects) ?? DEF.statsProjects),
            availableForWork: parse(raw.available_for_work) ?? DEF.availableForWork,
            cvEnabled:        parse(raw.cv_enabled)         ?? DEF.cvEnabled,
            cvUrl:            parse(raw.cv_url)             ?? DEF.cvUrl,
            cookieBanner:     parse(raw.cookie_banner)      ?? true,
            maintenance:      parse(raw.maintenance)        ?? false,
            commentAutoApprove: parse(raw.comment_auto_approve) ?? false,
            defaultTheme:     defaultTheme ?? 'light',
          })
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useSiteSettings] Failed to fetch:', err.message)
          setError(err.message)
          setSettings({
            statsYearsDev:    DEF.statsYearsDev,
            statsYearsDesign: DEF.statsYearsDesign,
            statsProjects:    DEF.statsProjects,
            availableForWork: DEF.availableForWork,
            cvEnabled:        DEF.cvEnabled,
            cvUrl:            DEF.cvUrl,
            cookieBanner:     true,
            maintenance:      false,
            commentAutoApprove: false,
            defaultTheme:     'light',
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [setDefaultTheme])

  return { settings, loading, error }
}
