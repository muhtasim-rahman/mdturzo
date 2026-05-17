// ============================================================
// SEARCH STORE — Zustand
// Global search overlay state (v2.9.0 এ fully implemented)
// ============================================================

import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  isOpen:  false,
  query:   '',
  results: [],
  loading: false,

  openSearch:  () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '', results: [] }),
  toggleSearch: () => set((s) => ({
    isOpen: !s.isOpen,
    query:  s.isOpen ? '' : s.query,
    results: s.isOpen ? [] : s.results,
  })),

  setQuery:   (query)   => set({ query }),
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
}))
