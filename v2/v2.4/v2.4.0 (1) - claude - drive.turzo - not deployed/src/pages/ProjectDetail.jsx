// ============================================================
// ProjectDetail.jsx — v2.4.0
// Full project detail page: hero, content, actions, comments,
// related projects. 100% dynamic from Supabase.
// ============================================================

import { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faEye, faCalendar, faTag, faFolderOpen,
  faLink, faFilePdf, faCode, faArrowUpRightFromSquare,
  faTriangleExclamation, faRotateRight,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { VisibilityGuard }  from '../components/shared/VisibilityGuard.jsx'
import { Breadcrumb }       from '../components/shared/Breadcrumb.jsx'
import { LikeDislike }      from '../components/shared/LikeDislike.jsx'
import { ShareButtons }     from '../components/shared/ShareButtons.jsx'
import { ReportButton }     from '../components/shared/ReportButton.jsx'
import { CommentSection }   from '../components/shared/CommentSection.jsx'
import { buildTitle }       from '../utils/seo.js'
import { trackPage }        from '../services/analytics.js'
import { formatDateShort, formatNumber } from '../utils/formatters.js'
import { getProjectBySlug, getRelatedProjects, incrementProjectViews } from '../services/supabase.js'
import { SITE_CONFIG } from '../config/site.config.js'

// ── Accent color map ────────────────────────────────────────
const CAT_COLORS = {
  'Web App': '#3B82F6', 'PWA': '#6366F1', 'Utility': '#10B981',
  'Education': '#F59E0B', 'UI Component': '#EC4899', 'Dev Tool': '#A855F7',
  'Islamic': '#06B6D4', 'Design': '#F97316', 'Portfolio': '#14B8A6',
  default: '#64748B',
}
function getAccent(p) {
  return p?.accent_color || CAT_COLORS[p?.category] || CAT_COLORS.default
}

// ── Skeleton ────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-lg">
      <div className="sk" style={{ width: '30%', height: 16, borderRadius: 4, marginBottom: '1rem' }} />
      <div className="pjd-hero-thumb sk" />
      <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="sk" style={{ width: '55%', height: 32, borderRadius: 6 }} />
        <div className="sk" style={{ width: '75%', height: 16, borderRadius: 4 }} />
        <div className="sk" style={{ width: '40%', height: 16, borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[...Array(4)].map((_, i) => <div key={i} className="sk" style={{ width: 80, height: 36, borderRadius: 8 }} />)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '1rem' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="sk" style={{ width: `${85 - (i % 3) * 15}%`, height: 14, borderRadius: 4 }} />
        ))}
      </div>
    </div>
  )
}

// ── Related project mini card ───────────────────────────────
function RelatedCard({ p }) {
  const color = getAccent(p)
  return (
    <Link to={`/projects/${p.slug}`} className="pjd-related-card"
      style={{ '--c': color }} >
      <div className="pjd-related-thumb">
        {p.thumbnail_url ? (
          <img src={p.thumbnail_url} alt={p.title} loading="lazy" />
        ) : (
          <div className="pjd-related-placeholder"
            style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}>
            <FontAwesomeIcon icon={faFolderOpen} style={{ color: `${color}55` }} />
          </div>
        )}
      </div>
      <div className="pjd-related-body">
        <span className="pjd-related-cat" style={{ color }}>
          {p.category || 'Project'}
        </span>
        <h4 className="pjd-related-title">{p.title}</h4>
        <p className="pjd-related-desc">{p.short_description}</p>
      </div>
    </Link>
  )
}

// ── Main detail content ─────────────────────────────────────
function ProjectDetailContent() {
  const { slug } = useParams()
  const navigate  = useNavigate()

  const [project,  setProject ] = useState(null)
  const [related,  setRelated ] = useState([])
  const [loading,  setLoading ] = useState(true)
  const [error,    setError   ] = useState(null)

  useEffect(() => {
    trackPage(`Project: ${slug}`)
    window.scrollTo({ top: 0 })
  }, [slug])

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true); setError(null)
      try {
        const proj = await getProjectBySlug(slug)
        if (!proj) { navigate('/not-found', { replace: true }); return }
        if (!cancelled) setProject(proj)

        // Fire-and-forget: increment views + load related
        incrementProjectViews(proj.id).catch(() => {})
        getRelatedProjects(slug, proj.category, 3)
          .then(r => { if (!cancelled) setRelated(r) })
          .catch(() => {})
      } catch (err) {
        if (!cancelled) setError(err.message || 'Project not found.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug, navigate])

  if (loading) return <section className="section"><DetailSkeleton /></section>

  if (error) {
    return (
      <section className="section">
        <div className="pjd-error">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <p>{error}</p>
          <Link to="/projects" className="pjd-back-btn">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Projects
          </Link>
        </div>
      </section>
    )
  }

  const accent      = getAccent(project)
  const pageUrl     = `${SITE_CONFIG.siteURL}/projects/${slug}`
  const seoTitle    = project.seo_title    || project.title
  const seoDesc     = project.seo_description || project.short_description || SITE_CONFIG.seo.defaultDescription
  const seoImage    = project.thumbnail_url || SITE_CONFIG.seo.defaultOGImage

  return (
    <>
      <Helmet>
        <title>{buildTitle(seoTitle)}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title"       content={`${seoTitle} | Muhtasim Rahman`} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image"       content={seoImage} />
        <meta property="og:url"         content={pageUrl} />
        <meta property="og:type"        content="article" />
        <link rel="canonical"           href={pageUrl} />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": project.title,
          "description": seoDesc,
          "url": pageUrl,
          "author": { "@type": "Person", "name": "Muhtasim Rahman" },
          "applicationCategory": project.category || "WebApplication",
        })}</script>
      </Helmet>

      <section className="section">
        <div className="container-lg">

          {/* Breadcrumb */}
          <Breadcrumb items={[
            { label: 'Projects', to: '/projects' },
            { label: project.title },
          ]} />

          {/* Hero thumbnail */}
          {project.thumbnail_url && (
            <motion.div
              className="pjd-hero-thumb-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ '--accent': accent }}
            >
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="pjd-hero-thumb"
              />
              <div className="pjd-thumb-glow" style={{ background: `radial-gradient(ellipse 80% 40% at 50% 100%, ${accent}30, transparent)` }} />
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            className="pjd-header"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Category + status */}
            <div className="pjd-meta-row">
              {project.category && (
                <span className="pjd-cat-badge"
                  style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>
                  {project.category}
                </span>
              )}
              <span className="pjd-meta-item">
                <FontAwesomeIcon icon={faEye} />
                {formatNumber(project.views_count || 0)} views
              </span>
              {project.created_at && (
                <span className="pjd-meta-item">
                  <FontAwesomeIcon icon={faCalendar} />
                  {formatDateShort(project.created_at)}
                </span>
              )}
            </div>

            <h1 className="pjd-title">{project.title}</h1>

            {project.short_description && (
              <p className="pjd-short-desc">{project.short_description}</p>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="pjd-tags">
                <FontAwesomeIcon icon={faTag} className="pjd-tag-icon" />
                {project.tags.map(t => (
                  <span key={t} className="pjd-tag">{t}</span>
                ))}
              </div>
            )}

            {/* Action links */}
            <div className="pjd-links">
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer"
                  className="pjd-link-btn pjd-link-github">
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </a>
              )}
              {project.live_link && (
                <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                  className="pjd-link-btn pjd-link-live"
                  style={{ '--lc': accent }}>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Live Demo
                </a>
              )}
              {project.pdf_link && (
                <a href={project.pdf_link} target="_blank" rel="noopener noreferrer"
                  className="pjd-link-btn">
                  <FontAwesomeIcon icon={faFilePdf} /> PDF
                </a>
              )}
              {project.custom_link && (
                <a href={project.custom_link} target="_blank" rel="noopener noreferrer"
                  className="pjd-link-btn">
                  <FontAwesomeIcon icon={faLink} /> More
                </a>
              )}
            </div>
          </motion.div>

          {/* ── Main layout ── */}
          <div className="pjd-layout">

            {/* Content */}
            <motion.div
              className="pjd-content-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {project.content ? (
                <div
                  className="pjd-content tiptap-render"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              ) : (
                <div className="pjd-no-content">
                  <FontAwesomeIcon icon={faCode} className="pjd-no-content-icon" />
                  <p>Detailed write-up coming soon.</p>
                  {project.github_link && (
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer"
                      className="pjd-link-btn pjd-link-github" style={{ marginTop: '.75rem' }}>
                      <FontAwesomeIcon icon={faGithub} /> View on GitHub
                    </a>
                  )}
                </div>
              )}

              {/* Interaction bar */}
              <div className="pjd-interaction-bar">
                <LikeDislike contentType="project" contentId={project.id} />
                <div className="pjd-interaction-right">
                  <ShareButtons title={project.title} url={pageUrl} />
                  <ReportButton contentType="project" contentId={project.id} />
                </div>
              </div>

              {/* Comments */}
              <CommentSection
                contentType="project"
                contentId={project.id}
                contentSlug={project.slug}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="pjd-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {/* Project Info card */}
              <div className="pjd-sidebar-card">
                <h3 className="pjd-sidebar-title">Project Info</h3>

                <div className="pjd-info-rows">
                  {project.category && (
                    <div className="pjd-info-row">
                      <span className="pjd-info-label">Category</span>
                      <span className="pjd-info-val" style={{ color: accent }}>{project.category}</span>
                    </div>
                  )}
                  {project.created_at && (
                    <div className="pjd-info-row">
                      <span className="pjd-info-label">Published</span>
                      <span className="pjd-info-val">{formatDateShort(project.created_at)}</span>
                    </div>
                  )}
                  {project.updated_at && project.updated_at !== project.created_at && (
                    <div className="pjd-info-row">
                      <span className="pjd-info-label">Updated</span>
                      <span className="pjd-info-val">{formatDateShort(project.updated_at)}</span>
                    </div>
                  )}
                  <div className="pjd-info-row">
                    <span className="pjd-info-label">Views</span>
                    <span className="pjd-info-val">{formatNumber(project.views_count || 0)}</span>
                  </div>
                  {(project.likes_count > 0) && (
                    <div className="pjd-info-row">
                      <span className="pjd-info-label">Likes</span>
                      <span className="pjd-info-val">{formatNumber(project.likes_count)}</span>
                    </div>
                  )}
                </div>

                {/* Links */}
                {(project.github_link || project.live_link || project.pdf_link || project.custom_link) && (
                  <div className="pjd-sidebar-links">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="pjd-sidebar-link">
                        <FontAwesomeIcon icon={faGithub} /> GitHub Repository
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="pjd-sidebar-link">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Live Demo
                      </a>
                    )}
                    {project.pdf_link && (
                      <a href={project.pdf_link} target="_blank" rel="noopener noreferrer" className="pjd-sidebar-link">
                        <FontAwesomeIcon icon={faFilePdf} /> PDF Preview
                      </a>
                    )}
                    {project.custom_link && (
                      <a href={project.custom_link} target="_blank" rel="noopener noreferrer" className="pjd-sidebar-link">
                        <FontAwesomeIcon icon={faLink} /> More Info
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Tags card */}
              {project.tags?.length > 0 && (
                <div className="pjd-sidebar-card">
                  <h3 className="pjd-sidebar-title">
                    <FontAwesomeIcon icon={faTag} /> Tags
                  </h3>
                  <div className="pjd-sidebar-tags">
                    {project.tags.map(t => (
                      <Link key={t} to={`/projects?q=${encodeURIComponent(t)}`}
                        className="pjd-sidebar-tag">
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back link */}
              <Link to="/projects" className="pjd-back-btn">
                <FontAwesomeIcon icon={faArrowLeft} /> All Projects
              </Link>
            </motion.aside>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <motion.section
              className="pjd-related"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="pjd-related-title">Related Projects</h2>
              <div className="pjd-related-grid">
                {related.map(p => <RelatedCard key={p.id} p={p} />)}
              </div>
            </motion.section>
          )}

        </div>
      </section>

      <style>{`
        /* Hero thumb */
        .pjd-hero-thumb-wrap {
          position: relative; border-radius: 16px; overflow: hidden;
          margin-bottom: 2rem;
          border: 1px solid var(--border-color);
          box-shadow: 0 0 0 1px var(--accent, #3B82F6)18;
        }
        .pjd-hero-thumb {
          width: 100%; max-height: 420px;
          object-fit: cover; display: block;
        }
        .pjd-thumb-glow {
          position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
          pointer-events: none;
        }

        /* Header */
        .pjd-header { margin-bottom: 2rem; }
        .pjd-meta-row {
          display: flex; align-items: center; flex-wrap: wrap; gap: .5rem;
          margin-bottom: .75rem;
        }
        .pjd-cat-badge {
          padding: .25rem .7rem; border-radius: 20px;
          font-size: .72rem; font-weight: 700;
        }
        .pjd-meta-item {
          display: flex; align-items: center; gap: .3rem;
          font-size: .75rem; color: var(--text-tertiary);
        }
        .pjd-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800; font-family: var(--font-display);
          color: var(--text-primary); line-height: 1.2;
          margin: 0 0 .75rem;
        }
        .pjd-short-desc {
          font-size: 1rem; color: var(--text-secondary);
          line-height: 1.65; margin: 0 0 1rem;
          max-width: 680px;
        }
        .pjd-tags {
          display: flex; align-items: center; flex-wrap: wrap; gap: .4rem;
          margin-bottom: 1.25rem;
        }
        .pjd-tag-icon { font-size: .75rem; color: var(--text-tertiary); }
        .pjd-tag {
          padding: .25rem .65rem; border-radius: 20px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          font-size: .72rem; color: var(--text-secondary); font-weight: 500;
        }

        /* Link buttons */
        .pjd-links { display: flex; flex-wrap: wrap; gap: .5rem; }
        .pjd-link-btn {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .5rem 1.1rem; border-radius: 9px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary);
          font-size: .82rem; font-weight: 700;
          text-decoration: none; transition: all .15s;
        }
        .pjd-link-btn:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
        }
        .pjd-link-github:hover {
          border-color: #6e5494; color: #c9a9f0;
        }
        .pjd-link-live {
          background: color-mix(in srgb, var(--lc, #3B82F6) 10%, transparent);
          border-color: color-mix(in srgb, var(--lc, #3B82F6) 35%, transparent);
          color: var(--lc, #3B82F6);
        }
        .pjd-link-live:hover {
          background: color-mix(in srgb, var(--lc, #3B82F6) 18%, transparent);
          border-color: var(--lc, #3B82F6);
          color: var(--lc, #3B82F6);
        }

        /* Layout */
        .pjd-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 2rem;
          align-items: start;
        }
        @media(max-width: 900px) {
          .pjd-layout { grid-template-columns: 1fr; }
          .pjd-sidebar { order: -1; }
        }

        /* Content */
        .pjd-content-area {}
        .pjd-content { /* TipTap rendered content */ }
        .pjd-content.tiptap-render {
          font-size: .95rem; line-height: 1.75;
          color: var(--text-secondary);
        }
        .tiptap-render h1, .tiptap-render h2, .tiptap-render h3,
        .tiptap-render h4 {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 700; margin: 1.5em 0 .6em;
          line-height: 1.3;
        }
        .tiptap-render h2 { font-size: 1.4rem; }
        .tiptap-render h3 { font-size: 1.15rem; }
        .tiptap-render p { margin: 0 0 1rem; }
        .tiptap-render ul, .tiptap-render ol {
          padding-left: 1.5rem; margin: 0 0 1rem;
        }
        .tiptap-render li { margin-bottom: .4rem; }
        .tiptap-render code {
          background: var(--bg-surface-2);
          padding: .1rem .35rem; border-radius: 4px;
          font-family: var(--font-mono); font-size: .85em;
          color: var(--text-accent);
        }
        .tiptap-render pre {
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          border-radius: 10px; padding: 1rem 1.25rem; overflow-x: auto;
          margin: 1rem 0;
        }
        .tiptap-render pre code {
          background: none; padding: 0;
          font-size: .85rem; color: var(--text-primary);
        }
        .tiptap-render a {
          color: var(--accent-primary); text-decoration: underline;
          text-underline-offset: 3px;
        }
        .tiptap-render blockquote {
          border-left: 3px solid var(--accent-primary);
          padding-left: 1rem; margin: 1rem 0;
          color: var(--text-secondary); font-style: italic;
        }
        .tiptap-render img {
          max-width: 100%; border-radius: 10px;
          margin: 1rem 0;
          border: 1px solid var(--border-color);
        }
        .tiptap-render hr {
          border: none; border-top: 1px solid var(--border-color); margin: 2rem 0;
        }
        .tiptap-render strong { color: var(--text-primary); font-weight: 700; }

        /* No content state */
        .pjd-no-content {
          text-align: center; padding: 3rem 1rem;
          color: var(--text-tertiary);
          background: var(--bg-surface-2);
          border: 1px dashed var(--border-strong);
          border-radius: 14px; margin-bottom: 1.5rem;
        }
        .pjd-no-content-icon {
          font-size: 2.5rem; opacity: .25;
          display: block; margin-bottom: .75rem;
        }
        .pjd-no-content p { margin: 0 0 .5rem; }

        /* Interaction bar */
        .pjd-interaction-bar {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: .75rem;
          padding: 1rem 0; margin: 1.5rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .pjd-interaction-right { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }

        /* Sidebar */
        .pjd-sidebar { display: flex; flex-direction: column; gap: 1rem; }
        .pjd-sidebar-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 14px; padding: 1.1rem;
        }
        .pjd-sidebar-title {
          font-size: .82rem; font-weight: 700;
          color: var(--text-secondary); text-transform: uppercase;
          letter-spacing: .06em; margin: 0 0 .85rem;
          display: flex; align-items: center; gap: .4rem;
        }
        .pjd-info-rows { display: flex; flex-direction: column; gap: .55rem; }
        .pjd-info-row {
          display: flex; align-items: center; justify-content: space-between;
          font-size: .8rem;
        }
        .pjd-info-label { color: var(--text-tertiary); }
        .pjd-info-val { color: var(--text-secondary); font-weight: 600; }

        .pjd-sidebar-links {
          display: flex; flex-direction: column; gap: .4rem;
          margin-top: 1rem;
          padding-top: .75rem;
          border-top: 1px solid var(--border-color);
        }
        .pjd-sidebar-link {
          display: flex; align-items: center; gap: .5rem;
          padding: .45rem .75rem; border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          color: var(--text-secondary); font-size: .8rem; font-weight: 600;
          text-decoration: none; transition: all .15s;
        }
        .pjd-sidebar-link:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
        }

        .pjd-sidebar-tags { display: flex; flex-wrap: wrap; gap: .35rem; }
        .pjd-sidebar-tag {
          padding: .25rem .6rem; border-radius: 20px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          font-size: .72rem; color: var(--text-secondary);
          text-decoration: none; transition: all .12s;
        }
        .pjd-sidebar-tag:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
        }

        .pjd-back-btn {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .5rem .9rem; border-radius: 9px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-strong);
          color: var(--text-secondary); font-size: .8rem; font-weight: 600;
          text-decoration: none; transition: all .15s;
        }
        .pjd-back-btn:hover {
          border-color: var(--accent-primary); color: var(--accent-primary);
        }

        /* Related */
        .pjd-related {
          margin-top: 3rem; padding-top: 2.5rem;
          border-top: 1px solid var(--border-color);
        }
        .pjd-related-title {
          font-size: 1.25rem; font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary); margin: 0 0 1.25rem;
        }
        .pjd-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media(max-width: 767px) { .pjd-related-grid { grid-template-columns: 1fr; } }
        @media(min-width: 768px) and (max-width: 1023px) {
          .pjd-related-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .pjd-related-card {
          display: flex; flex-direction: column;
          border-radius: 12px; overflow: hidden;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-color);
          text-decoration: none;
          transition: border-color .18s, transform .18s, box-shadow .18s;
        }
        .pjd-related-card:hover {
          border-color: var(--c); transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,.15);
        }
        .pjd-related-thumb {
          height: 100px; background: var(--bg-surface-2); overflow: hidden;
        }
        .pjd-related-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pjd-related-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
        }
        .pjd-related-body { padding: .85rem; }
        .pjd-related-cat { font-size: .7rem; font-weight: 700; display: block; margin-bottom: .25rem; }
        .pjd-related-title {
          font-size: .85rem; font-weight: 700;
          color: var(--text-primary); margin: 0 0 .3rem;
          line-height: 1.3;
        }
        .pjd-related-desc {
          font-size: .75rem; color: var(--text-tertiary);
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; line-height: 1.5; margin: 0;
        }

        /* Error */
        .pjd-error {
          text-align: center; padding: 4rem 1rem; color: var(--text-secondary);
        }
        .pjd-error svg { font-size: 2.5rem; color: var(--clr-warning); display: block; margin: 0 auto .5rem; }
        .pjd-error p { margin-bottom: 1rem; }
      `}</style>
    </>
  )
}

export default function ProjectDetail() {
  return <ProjectDetailContent />
}
