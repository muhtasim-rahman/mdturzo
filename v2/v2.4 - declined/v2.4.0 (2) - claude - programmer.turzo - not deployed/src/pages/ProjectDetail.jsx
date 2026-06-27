// ============================================================
// ProjectDetail.jsx — v2.4.0
// Full project detail page:
//   Breadcrumb → Hero (thumbnail+meta) → Content → 
//   Like/Dislike + Share → Comments → Related Projects
// All data from Supabase (dynamic).
// ============================================================

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faArrowLeft, faCalendarAlt,
  faTag, faEye, faCode, faFilePdf, faLink as faLink2,
  faFolderOpen, faSpinner, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { getProjectBySlug, getRelatedProjects, trackContentView } from '../services/supabase.js'
import { SkeletonText, SkeletonBox, SkeletonBanner } from '../components/ui/Skeleton.jsx'
import Breadcrumb     from '../components/shared/Breadcrumb.jsx'
import LikeDislike    from '../components/shared/LikeDislike.jsx'
import ShareButtons   from '../components/shared/ShareButtons.jsx'
import CommentSection from '../components/shared/CommentSection.jsx'
import ProjectCard    from '../components/projects/ProjectCard.jsx'
import { buildTitle } from '../utils/seo.js'
import { trackPage }  from '../services/analytics.js'
import { SITE_CONFIG } from '../config/site.config.js'
import { formatDate } from '../utils/formatters.js'
import { getAccentColor } from '../components/projects/ProjectCard.jsx'

// ── Skeleton ──────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container-xl pjd-container">
      <div className="pjd-breadcrumb-slot">
        <div className="sk" style={{ height: 14, width: 240, borderRadius: 6 }}/>
      </div>
      <div className="pjd-hero-sk">
        <SkeletonBanner className="pjd-thumb-sk"/>
        <div className="pjd-hero-meta-sk">
          <div className="sk" style={{ height: 12, width: 80, borderRadius: 6, marginBottom: 12 }}/>
          <div className="sk" style={{ height: 28, width: '80%', borderRadius: 8, marginBottom: 14 }}/>
          <SkeletonText lines={2}/>
          <div style={{ display: 'flex', gap: '.5rem', marginTop: 16 }}>
            <div className="sk" style={{ height: 36, width: 100, borderRadius: 8 }}/>
            <div className="sk" style={{ height: 36, width: 100, borderRadius: 8 }}/>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <SkeletonText lines={8}/>
      </div>
    </div>
  )
}

// ── Link Button ───────────────────────────────────────────────
function LinkBtn({ href, icon, label, color }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="pjd-link-btn"
      style={{ '--lc': color || 'var(--accent-primary)' }}>
      <FontAwesomeIcon icon={icon}/>
      {label}
    </a>
  )
}

// ── Related section ───────────────────────────────────────────
function RelatedProjects({ category, excludeId }) {
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!category || !excludeId) return
    getRelatedProjects(category, excludeId, 3)
      .then(d => setRelated(d || []))
      .finally(() => setLoading(false))
  }, [category, excludeId])

  if (!loading && related.length === 0) return null

  return (
    <section className="section section-alt" id="related">
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">
            More Projects
          </p>
          <h2 className="text-2xl font-display font-bold mb-8">Related Projects</h2>
        </motion.div>
        <div className="pjd-related-grid">
          {loading
            ? [0,1,2].map(i => (
                <div key={i} className="card p-5 space-y-4">
                  <SkeletonBox h="h-36" rounded="rounded-lg"/>
                  <SkeletonBox w="w-2/3" h="h-4"/>
                  <SkeletonText lines={2}/>
                </div>
              ))
            : related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} variant="grid" compact/>
              ))
          }
        </div>
      </div>
    </section>
  )
}

// ── Main ──────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => { trackPage('ProjectDetail') }, [])

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    getProjectBySlug(slug)
      .then(data => {
        setProject(data)
        // Track view after data load
        if (data?.id) trackContentView('project', data.id)
      })
      .catch(err => {
        if (err?.code === 'PGRST116') setError('not_found')
        else setError('error')
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <main className="pt-navbar">
      <DetailSkeleton/>
    </main>
  )

  if (error === 'not_found') return (
    <main className="pt-navbar">
      <div className="container-xl" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize: '3rem', opacity: .25, marginBottom: '1rem' }}/>
        <h1 style={{ marginBottom: '.5rem' }}>Project Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>This project doesn't exist or isn't published yet.</p>
        <Link to="/projects" className="pjd-back-btn">
          <FontAwesomeIcon icon={faArrowLeft}/> Back to projects
        </Link>
      </div>
    </main>
  )

  if (error) return (
    <main className="pt-navbar">
      <div className="container-xl" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: '2.5rem', color: 'var(--clr-error)', marginBottom: '1rem' }}/>
        <h1 style={{ marginBottom: '.5rem' }}>Something went wrong</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Failed to load this project.</p>
        <button onClick={() => window.location.reload()} className="pjd-back-btn">Retry</button>
      </div>
    </main>
  )

  const p = project
  const color = getAccentColor(p)
  const fullUrl = `${SITE_CONFIG.siteURL}/projects/${p.slug}`
  const formattedDate = p.created_at ? formatDate(p.created_at) : null
  const updatedDate   = p.updated_at && p.updated_at !== p.created_at ? formatDate(p.updated_at) : null

  return (
    <>
      <Helmet>
        <title>{buildTitle(p.seo_title || p.title)}</title>
        <meta name="description"        content={p.seo_description || p.short_description || SITE_CONFIG.seo.defaultDescription}/>
        <meta property="og:title"       content={`${p.title} | ${SITE_CONFIG.siteName}`}/>
        <meta property="og:description" content={p.seo_description || p.short_description}/>
        {p.thumbnail_url && <meta property="og:image" content={p.thumbnail_url}/>}
        <meta property="og:url"         content={fullUrl}/>
        <link rel="canonical"           href={fullUrl}/>
      </Helmet>

      <main className="pt-navbar">
        <article>
          {/* ── Hero ─────────────────────────────────────── */}
          <div className="pjd-hero-wrap" style={{ '--c': color }}>
            <div className="pjd-hero-gradient"/>
            <div className="container-xl">
              {/* Breadcrumb */}
              <Breadcrumb items={[
                { label: 'Projects', href: '/projects' },
                { label: p.title },
              ]}/>

              <div className="pjd-hero-layout">
                {/* Left: meta */}
                <motion.div className="pjd-hero-meta"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}>
                  {/* Category + status */}
                  <div className="pjd-meta-row">
                    {p.category && (
                      <span className="pjd-cat-badge" style={{ background: `${color}22`, color, border: `1px solid ${color}35` }}>
                        {p.category}
                      </span>
                    )}
                    <span className="pjd-status-badge">
                      <span className="pjd-status-dot"/>
                      Published
                    </span>
                  </div>

                  <h1 className="pjd-title">{p.title}</h1>
                  {p.short_description && (
                    <p className="pjd-subtitle">{p.short_description}</p>
                  )}

                  {/* Dates + views */}
                  <div className="pjd-info-row">
                    {formattedDate && (
                      <span className="pjd-info-item">
                        <FontAwesomeIcon icon={faCalendarAlt}/> {formattedDate}
                      </span>
                    )}
                    {updatedDate && (
                      <span className="pjd-info-item">Updated {updatedDate}</span>
                    )}
                    {p.views_count > 0 && (
                      <span className="pjd-info-item">
                        <FontAwesomeIcon icon={faEye}/> {p.views_count.toLocaleString()} views
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {p.tags?.length > 0 && (
                    <div className="pjd-tags">
                      <FontAwesomeIcon icon={faTag} style={{ color: 'var(--text-tertiary)', fontSize: '.7rem' }}/>
                      {p.tags.map(t => (
                        <span key={t} className="pjd-tag-chip">{t}</span>
                      ))}
                    </div>
                  )}

                  {/* Action links */}
                  <div className="pjd-links">
                    <LinkBtn href={p.github_link} icon={faGithub}              label="GitHub"      color="#6e7681"/>
                    <LinkBtn href={p.live_link}   icon={faArrowUpRightFromSquare} label="Live demo"  color={color}/>
                    <LinkBtn href={p.pdf_link}    icon={faFilePdf}              label="PDF"         color="#ef4444"/>
                    <LinkBtn href={p.custom_link} icon={faLink2}               label="More info"   color="#64748b"/>
                  </div>

                  {/* Like/Share */}
                  <div className="pjd-reactions">
                    <LikeDislike
                      contentType="project"
                      contentId={p.id}
                      initialLikes={p.likes_count || 0}
                      initialDislikes={p.dislikes_count || 0}/>
                    <ShareButtons url={fullUrl} title={p.title} compact/>
                  </div>
                </motion.div>

                {/* Right: thumbnail */}
                {p.thumbnail_url && (
                  <motion.div className="pjd-hero-thumb"
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    <img src={p.thumbnail_url} alt={p.title} className="pjd-thumb-img" loading="eager"/>
                    <div className="pjd-thumb-glow" style={{ background: `radial-gradient(ellipse at center, ${color}30, transparent 70%)` }}/>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* ── Content ──────────────────────────────────── */}
          {p.content && (
            <div className="section">
              <div className="container-xl">
                <div className="pjd-content-grid">
                  <motion.div className="pjd-content-body"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}>
                    <div
                      className="pjd-prose"
                      dangerouslySetInnerHTML={{ __html: p.content }}/>
                  </motion.div>

                  {/* Sticky sidebar */}
                  <aside className="pjd-sidebar">
                    <div className="pjd-sidebar-card">
                      <h3 className="pjd-sidebar-title">
                        <FontAwesomeIcon icon={faCode}/> Project Links
                      </h3>
                      <div className="pjd-sidebar-links">
                        <LinkBtn href={p.github_link} icon={faGithub}              label="View on GitHub"  color="#6e7681"/>
                        <LinkBtn href={p.live_link}   icon={faArrowUpRightFromSquare} label="Live Demo"    color={color}/>
                        <LinkBtn href={p.pdf_link}    icon={faFilePdf}              label="PDF Preview"    color="#ef4444"/>
                        <LinkBtn href={p.custom_link} icon={faLink2}               label="More Info"      color="#64748b"/>
                      </div>

                      {p.tags?.length > 0 && (
                        <>
                          <div className="pjd-sidebar-divider"/>
                          <h3 className="pjd-sidebar-title">
                            <FontAwesomeIcon icon={faTag}/> Tags
                          </h3>
                          <div className="pjd-sidebar-tags">
                            {p.tags.map(t => (
                              <span key={t} className="pjd-tag-chip pjd-tag-chip--sm">{t}</span>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="pjd-sidebar-divider"/>
                      <div className="pjd-sidebar-share">
                        <p className="pjd-sidebar-title"><FontAwesomeIcon icon={faCode}/> Share</p>
                        <ShareButtons url={fullUrl} title={p.title}/>
                      </div>
                    </div>
                  </aside>
                </div>

                {/* Bottom reactions */}
                <div className="pjd-bottom-reactions">
                  <LikeDislike
                    contentType="project"
                    contentId={p.id}
                    initialLikes={p.likes_count || 0}
                    initialDislikes={p.dislikes_count || 0}
                    size="lg"/>
                  <ShareButtons url={fullUrl} title={p.title}/>
                </div>

                {/* Comments */}
                <CommentSection
                  contentType="project"
                  contentId={p.id}
                  contentSlug={p.slug}
                  initialCount={p.comments_count || 0}/>
              </div>
            </div>
          )}

          {/* No content — show just reactions + comments below hero */}
          {!p.content && (
            <div className="section">
              <div className="container-xl">
                <div className="pjd-bottom-reactions">
                  <LikeDislike
                    contentType="project"
                    contentId={p.id}
                    initialLikes={p.likes_count || 0}
                    initialDislikes={p.dislikes_count || 0}
                    size="lg"/>
                  <ShareButtons url={fullUrl} title={p.title}/>
                </div>
                <CommentSection
                  contentType="project"
                  contentId={p.id}
                  contentSlug={p.slug}
                  initialCount={p.comments_count || 0}/>
              </div>
            </div>
          )}
        </article>

        {/* Related Projects */}
        <RelatedProjects category={p.category} excludeId={p.id}/>
      </main>
    </>
  )
}
