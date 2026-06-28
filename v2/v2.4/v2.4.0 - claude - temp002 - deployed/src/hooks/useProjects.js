// useProjects.js — v2.4.0
// Data-fetching hook for the Projects listing page.
// Handles pagination, filtering, search, and sorting.

import { useState, useEffect, useCallback, useRef } from 'react'
import { getPublishedProjectsV2, getProjectCategories, getProjectCount } from '../services/supabase.js'

const PAGE_SIZE = 12

export function useProjects() {
  const [projects, setProjects]         = useState([])
  const [categories, setCategories]     = useState([])
  const [totalCount, setTotalCount]     = useState(0)
  const [loading, setLoading]           = useState(true)
  const [loadingMore, setLoadingMore]   = useState(false)
  const [error, setError]               = useState(null)
  const [hasMore, setHasMore]           = useState(false)
  const [page, setPage]                 = useState(0)

  // filters
  const [search, setSearchRaw]          = useState('')
  const [category, setCategory]         = useState('All')
  const [sortBy, setSortBy]             = useState('created_at')
  const [viewMode, setViewMode]         = useState('grid') // 'grid' | 'list'

  const debounceRef = useRef(null)
  const mountedRef  = useRef(true)

  // Debounced search setter
  const setSearch = useCallback((val) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (mountedRef.current) setSearchRaw(val)
    }, 350)
  }, [])

  // Instant search setter (for controlled input)
  const [searchInput, setSearchInput] = useState('')
  const handleSearchChange = useCallback((val) => {
    setSearchInput(val)
    setSearch(val)
  }, [setSearch])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchInput('')
    setSearchRaw('')
    setCategory('All')
    setSortBy('created_at')
  }, [])

  // Load categories once
  useEffect(() => {
    getProjectCategories().then(cats => {
      if (mountedRef.current) setCategories(cats)
    }).catch(() => {})
    getProjectCount().then(count => {
      if (mountedRef.current) setTotalCount(count || 0)
    }).catch(() => {})
    return () => { mountedRef.current = false }
  }, [])

  // Reset + fetch when filters change
  useEffect(() => {
    setPage(0)
    setProjects([])
    setHasMore(false)
    setError(null)
    setLoading(true)

    const controller = new AbortController()

    getPublishedProjectsV2({
      limit: PAGE_SIZE,
      offset: 0,
      category: category === 'All' ? null : category,
      search: search.trim() || null,
      sortBy,
    }).then(data => {
      if (controller.signal.aborted) return
      setProjects(data)
      setHasMore(data.length === PAGE_SIZE)
      setLoading(false)
    }).catch(err => {
      if (controller.signal.aborted) return
      setError(err)
      setLoading(false)
    })

    return () => controller.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, sortBy])

  // Load more (next page)
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const data = await getPublishedProjectsV2({
        limit: PAGE_SIZE,
        offset: nextPage * PAGE_SIZE,
        category: category === 'All' ? null : category,
        search: search.trim() || null,
        sortBy,
      })
      setProjects(prev => [...prev, ...data])
      setHasMore(data.length === PAGE_SIZE)
      setPage(nextPage)
    } catch (err) {
      setError(err)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, page, category, search, sortBy])

  const retry = useCallback(() => {
    setError(null)
    setLoading(true)
    setProjects([])
    setPage(0)
    getPublishedProjectsV2({
      limit: PAGE_SIZE, offset: 0,
      category: category === 'All' ? null : category,
      search: search.trim() || null,
      sortBy,
    }).then(data => {
      setProjects(data)
      setHasMore(data.length === PAGE_SIZE)
      setLoading(false)
    }).catch(err => {
      setError(err)
      setLoading(false)
    })
  }, [category, search, sortBy])

  const hasActiveFilters = category !== 'All' || search.trim() !== '' || sortBy !== 'created_at'

  return {
    projects, categories, totalCount,
    loading, loadingMore, error, hasMore,
    search: searchInput, setSearch: handleSearchChange,
    category, setCategory,
    sortBy, setSortBy,
    viewMode, setViewMode,
    loadMore, retry, clearFilters,
    hasActiveFilters,
  }
}
