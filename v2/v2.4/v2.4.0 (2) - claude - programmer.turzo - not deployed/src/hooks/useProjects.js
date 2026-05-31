// ============================================================
// useProjects.js — v2.4.0
// Loads ALL published projects once, filters/searches client-side.
// This keeps filtering instant without extra API calls.
// ============================================================

import { useState, useEffect, useMemo, useCallback } from 'react'
import { getPublishedProjects } from '../services/supabase.js'

const MIN_SKELETON_MS = 500

export function useProjects() {
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    const t0 = Date.now()
    getPublishedProjects()
      .then(data => {
        const elapsed = Date.now() - t0
        const delay = Math.max(0, MIN_SKELETON_MS - elapsed)
        setTimeout(() => {
          setAllProjects(data || [])
          setLoading(false)
        }, delay)
      })
      .catch(err => {
        console.error('[useProjects]', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  // Derive unique categories and tags from loaded data
  const categories = useMemo(() => {
    const cats = [...new Set(allProjects.map(p => p.category).filter(Boolean))]
    return cats.sort()
  }, [allProjects])

  const allTags = useMemo(() => {
    const tags = allProjects.flatMap(p => p.tags || [])
    return [...new Set(tags)].sort()
  }, [allProjects])

  return { allProjects, categories, allTags, loading, error }
}

export function useFilteredProjects({ allProjects, search, category, tags, sort }) {
  return useMemo(() => {
    let list = [...allProjects]

    // Search filter (title + short_description + tags)
    if (search?.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (category && category !== 'All') {
      list = list.filter(p => p.category === category)
    }

    // Tag filter (must match ALL selected tags)
    if (tags?.length) {
      list = list.filter(p => tags.every(t => p.tags?.includes(t)))
    }

    // Sort
    if (sort === 'oldest') {
      list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sort === 'views') {
      list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
    } else {
      // newest (default)
      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    return list
  }, [allProjects, search, category, tags, sort])
}
