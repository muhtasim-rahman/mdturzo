// ============================================================
// useSiteSettings — Supabase site_settings fetch + defaults
// v2.3.6: statsProjects now prefers the LIVE published+public
// project count (getProjectCount) over the static site_settings
// number, whenever that count is successfully fetched. Falls back
// to the static value (then the hardcoded default) if it isn't.
// ============================================================

import { useState, useEffect } from 'react'
import { getSiteSettings, getProjectCount } from '../services/supabase.js'
import { SITE_CONFIG }         from '../config/site.config.js'

const DEF = SITE_CONFIG.defaults

export function useSiteSettings() {
  const [settings, setSettings] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      // Supabase returns JSONB values — unwrap them if needed
      const parse = (v) => {
        if (typeof v === 'string') {
          try { return JSON.parse(v) } catch { return v }
        }
        return v
      }

      const [settingsResult, countResult] = await Promise.allSettled([
        getSiteSettings(),
        getProjectCount(),
      ])

      if (cancelled) return

      let next
      if (settingsResult.status === 'fulfilled') {
        const raw = settingsResult.value
        next = {
          statsYearsDev:    parse(raw.stats_years_dev)    ?? DEF.statsYearsDev,
          statsYearsDesign: parse(raw.stats_years_design) ?? DEF.statsYearsDesign,
          statsProjects:    parse(raw.stats_projects)     ?? DEF.statsProjects,
          availableForWork: parse(raw.available_for_work) ?? DEF.availableForWork,
          cvEnabled:        parse(raw.cv_enabled)         ?? DEF.cvEnabled,
          cvUrl:            parse(raw.cv_url)             ?? DEF.cvUrl,
          cookieBanner:     parse(raw.cookie_banner)      ?? true,
          maintenance:      parse(raw.maintenance)        ?? false,
          commentAutoApprove: parse(raw.comment_auto_approve) ?? false,
        }
      } else {
        console.warn('[useSiteSettings] Failed to fetch:', settingsResult.reason?.message)
        setError(settingsResult.reason?.message ?? 'Failed to load settings')
        next = {
          statsYearsDev:    DEF.statsYearsDev,
          statsYearsDesign: DEF.statsYearsDesign,
          statsProjects:    DEF.statsProjects,
          availableForWork: DEF.availableForWork,
          cvEnabled:        DEF.cvEnabled,
          cvUrl:            DEF.cvUrl,
          cookieBanner:     true,
          maintenance:      false,
          commentAutoApprove: false,
        }
      }

      // Prefer the live count -- but only if it's a real number (incl. 0)
      if (countResult.status === 'fulfilled' && typeof countResult.value === 'number') {
        next.statsProjects = countResult.value
      }

      setSettings(next)
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [])

  return { settings, loading, error }
}
