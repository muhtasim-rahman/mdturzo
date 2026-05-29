// ============================================================
// useSiteSettings — Supabase site_settings fetch + defaults
// ============================================================

import { useState, useEffect } from 'react'
import { getSiteSettings }     from '../services/supabase.js'
import { SITE_CONFIG }         from '../config/site.config.js'

const DEF = SITE_CONFIG.defaults

export function useSiteSettings() {
  const [settings, setSettings] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const raw = await getSiteSettings()
        if (!cancelled) {
          // Supabase returns JSONB values — unwrap them if needed
          const parse = (v) => {
            if (typeof v === 'string') {
              try { return JSON.parse(v) } catch { return v }
            }
            return v
          }
          setSettings({
            statsYearsDev:    parse(raw.stats_years_dev)    ?? DEF.statsYearsDev,
            statsYearsDesign: parse(raw.stats_years_design) ?? DEF.statsYearsDesign,
            statsProjects:    parse(raw.stats_projects)     ?? DEF.statsProjects,
            availableForWork: parse(raw.available_for_work) ?? DEF.availableForWork,
            cvEnabled:        parse(raw.cv_enabled)         ?? DEF.cvEnabled,
            cvUrl:            parse(raw.cv_url)             ?? DEF.cvUrl,
            cookieBanner:     parse(raw.cookie_banner)      ?? true,
            maintenance:      parse(raw.maintenance)        ?? false,
            commentAutoApprove: parse(raw.comment_auto_approve) ?? false,
          })
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useSiteSettings] Failed to fetch:', err.message)
          setError(err.message)
          // Fallback to defaults
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
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return { settings, loading, error }
}
