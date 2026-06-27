// TableOfContents.jsx — v2.5.0
// Auto-generates TOC from H1-H4 headings inside the article.
// Desktop: sticky sidebar card.
// Mobile: collapsible accordion above the article.
// Active heading tracked via IntersectionObserver.

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

// Slugify heading text → id (same logic TipTap uses)
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Extract headings from rendered article HTML
function extractHeadings(container) {
  if (!container) return []
  const nodes = container.querySelectorAll('h1, h2, h3, h4')
  return Array.from(nodes).map((node, i) => {
    const level = parseInt(node.tagName[1], 10)
    const text  = node.textContent.trim()
    const id    = node.id || `toc-heading-${i}`
    if (!node.id) node.id = id
    return { id, text, level }
  })
}

function TocList({ headings, activeId, onClickItem }) {
  if (!headings.length) return (
    <p className="px-4 py-3 text-xs text-[var(--text-tertiary)]">No headings found</p>
  )

  return (
    <ul className="toc-list">
      {headings.map(({ id, text, level }) => (
        <li key={id}>
          <button
            className={`toc-item w-full text-left truncate ${activeId === id ? 'active' : ''}`}
            data-level={level}
            onClick={() => onClickItem(id)}
            title={text}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  )
}

// ── Desktop (sidebar) ─────────────────────────────────────────
export function TocSidebar({ articleRef }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId]  = useState('')

  useEffect(() => {
    const el = articleRef?.current
    if (!el) return
    const h = extractHeadings(el)
    setHeadings(h)

    // Observe headings
    const ids = h.map(x => x.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      {
        rootMargin: `-${68 + 16}px 0px -70% 0px`,
        threshold: 0,
      }
    )

    ids.forEach(id => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [articleRef])

  const scrollToHeading = useCallback((id) => {
    const node = document.getElementById(id)
    if (!node) return
    const offset = 68 + 24
    const top = node.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
  }, [])

  if (!headings.length) return null

  return (
    <div className="toc-card">
      <div className="toc-header">
        <span className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faListUl} className="text-[var(--accent-primary)]" />
          Contents
        </span>
        <span className="text-[var(--text-tertiary)] font-normal normal-case tracking-normal">
          {headings.length} sections
        </span>
      </div>
      <TocList headings={headings} activeId={activeId} onClickItem={scrollToHeading} />
    </div>
  )
}

// ── Mobile (accordion) ────────────────────────────────────────
export function TocMobile({ articleRef }) {
  const [headings, setHeadings] = useState([])
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const el = articleRef?.current
    if (!el) return
    const h = extractHeadings(el)
    setHeadings(h)

    const ids = h.map(x => x.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: `-${68 + 16}px 0px -70% 0px`, threshold: 0 }
    )
    ids.forEach(id => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [articleRef])

  const scrollToHeading = useCallback((id) => {
    const node = document.getElementById(id)
    if (!node) return
    const offset = 68 + 24
    const top = node.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
    setOpen(false)
  }, [])

  if (!headings.length) return null

  return (
    <div className="toc-mobile">
      <button
        onClick={() => setOpen(o => !o)}
        className="toc-header w-full cursor-pointer hover:bg-[var(--bg-surface-2)] transition-colors"
      >
        <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <FontAwesomeIcon icon={faListUl} className="text-[var(--accent-primary)]" />
          Contents ({headings.length})
          {activeId && (
            <span className="ml-1 text-[var(--text-tertiary)] normal-case font-normal tracking-normal truncate max-w-[12rem]">
              — {headings.find(h => h.id === activeId)?.text}
            </span>
          )}
        </span>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="text-[var(--text-tertiary)] flex-shrink-0" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="toc-mobile-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <TocList headings={headings} activeId={activeId} onClickItem={scrollToHeading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
