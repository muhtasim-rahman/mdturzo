// ============================================================
// usePageVisibility — Supabase page_visibility table
// ============================================================

import { useState, useEffect } from 'react'
import { getPageVisibility } from '../services/supabase.js'

let cached   = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 min cache

export function usePageVisibility() {
  const [visibility, setVisibility] = useState(cached || {})
  const [loading, setLoading]       = useState(!cached)

  useEffect(() => {
    const now = Date.now()
    if (cached && now - cacheTime < CACHE_TTL) {
      setVisibility(cached)
      setLoading(false)
      return
    }

    getPageVisibility()
      .then((data) => {
        cached    = data
        cacheTime = Date.now()
        setVisibility(data)
      })
      .catch((err) => console.warn('[usePageVisibility]', err.message))
      .finally(() => setLoading(false))
  }, [])

  // Force refresh (admin panel এ use করবে)
  const refetch = () => {
    cached = null
    setLoading(true)
    getPageVisibility()
      .then((data) => {
        cached    = data
        cacheTime = Date.now()
        setVisibility(data)
      })
      .finally(() => setLoading(false))
  }

  return { visibility, loading, refetch }
}
