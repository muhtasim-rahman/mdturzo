// ProjectDetail.jsx — v2.4.0 — Full rebuild
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import { VisibilityGuard }        from '../components/shared/VisibilityGuard.jsx'
import ViewTracker            from '../components/shared/ViewTracker.jsx'
import CommentsSection        from '../components/shared/CommentsSection.jsx'
import ProjectDetailHero      from '../components/projects/detail/ProjectDetailHero.jsx'
import ProjectDetailSidebar   from '../components/projects/detail/ProjectDetailSidebar.jsx'
import ProjectGallery         from '../components/projects/detail/ProjectGallery.jsx'
import ProjectTechStack       from '../components/projects/detail/ProjectTechStack.jsx'
import RelatedProjects        from '../components/projects/detail/RelatedProjects.jsx'
import { ProjectDetailSkeleton } from '../components/skeletons/ProjectsSkeletons.jsx'

import {
  getProjectDetailBySlug,
  getRelatedProjects,
  getUserProjectData,
} from '../services/supabase.js'
import { useAuthStore }  from '../store/authStore.js'
import { buildMeta }     from '../utils/seo.js'
import { SITE_CONFIG }   from '../config/site.config.js'

// ── HTML content renderer with site CSS ───────────────────
function ProjectHtmlContent({ html }) {
  if (!html) return null
  return (
    <div
      className="proj-html"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// ── Features grid ──────────────────────────────────────────
function FeaturesGrid({ features = [] }) {
  if (!features.length) return null
  return (
    <div className="pd-features">
      <h3 className="pd-section-h">Key Features</h3>
      <div className="pd-features-grid">
        {features.map((f, i) => (
          <div key={i} className="pd-feature-card">
            {f.icon && <div className="pd-feature-icon">{f.icon}</div>}
            <div className="pd-feature-title">{f.title}</div>
            {f.desc && <div className="pd-feature-desc">{f.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Timeline ───────────────────────────────────────────────
function Timeline({ events = [] }) {
  if (!events.length) return null
  return (
    <div className="pd-timeline">
      <h3 className="pd-section-h">Timeline</h3>
      {events.map((e, i) => (
        <div key={i} className="pd-tl-item">
          <div className="pd-tl-dot"/>
          <div className="pd-tl-body">
            <div className="pd-tl-date">{e.date}</div>
            <div className="pd-tl-label">{e.label}</div>
            {e.desc && <div className="pd-tl-desc">{e.desc}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────
export default function ProjectDetail() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const user       = useAuthStore(s => s.user)

  const [project,      setProject]      = useState(null)
  const [related,      setRelated]      = useState([])
  const [userData,     setUserData]     = useState({ reaction: null, rating: null })
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true); setError(null); setProject(null)

    getProjectDetailBySlug(slug)
      .then(async (p) => {
        if (!p || p.status !== 'published' || p.visibility !== 'public') {
          setError('not_found'); setLoading(false); return
        }
        setProject(p)

        // Parallel fetch: related + user data
        const [rel, ud] = await Promise.allSettled([
          getRelatedProjects(slug, p.category, 3),
          user ? getUserProjectData(slug, user.uid) : Promise.resolve({ reaction: null, rating: null }),
        ])
        if (rel.status === 'fulfilled') setRelated(rel.value || [])
        if (ud.status  === 'fulfilled') setUserData(ud.value  || { reaction: null, rating: null })
        setLoading(false)
      })
      .catch(() => { setError('load_failed'); setLoading(false) })
  }, [slug, user])

  // Build meta
  const meta = project ? buildMeta({
    title:       project.seo_title || project.title,
    description: project.seo_description || project.short_description,
    url:         `${SITE_CONFIG.siteURL}/projects/${project.slug}`,
    image:       project.og_image_url || project.banner_url || project.thumbnail_url,
    type:        'article',
  }) : {}

  // Error states
  if (!loading && error === 'not_found') return (
    <div className="pd-not-found">
      <div className="pd-nf-icon"><FontAwesomeIcon icon={faTriangleExclamation}/></div>
      <h1>Project not found</h1>
      <p>This project doesn't exist or isn't public yet.</p>
      <Link to="/projects" className="pd-nf-btn"><FontAwesomeIcon icon={faArrowLeft}/> Back to Projects</Link>
      <style>{`.pd-not-found{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;text-align:center;padding:2rem;}.pd-nf-icon{font-size:3rem;color:var(--text-tertiary);}.pd-not-found h1{font-size:1.5rem;font-weight:700;color:var(--text-primary);margin:0;}.pd-not-found p{color:var(--text-tertiary);font-size:.95rem;margin:0;}.pd-nf-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem 1.25rem;border-radius:10px;background:var(--accent-primary);color:#fff;text-decoration:none;font-size:.875rem;font-weight:600;margin-top:.25rem;transition:background var(--transition-fast);}.pd-nf-btn:hover{background:var(--accent-hover);}`}</style>
    </div>
  )

  if (!loading && error === 'load_failed') return (
    <div className="pd-not-found">
      <div className="pd-nf-icon"><FontAwesomeIcon icon={faTriangleExclamation}/></div>
      <h1>Could not load project</h1>
      <p>Something went wrong. Please try again.</p>
      <button className="pd-nf-btn" onClick={() => window.location.reload()}><FontAwesomeIcon icon={faArrowLeft}/> Retry</button>
      <style>{`.pd-not-found{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;text-align:center;padding:2rem;}.pd-nf-icon{font-size:3rem;color:var(--text-tertiary);}.pd-not-found h1{font-size:1.5rem;font-weight:700;color:var(--text-primary);margin:0;}.pd-not-found p{color:var(--text-tertiary);font-size:.95rem;margin:0;}.pd-nf-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem 1.25rem;border-radius:10px;background:var(--accent-primary);color:#fff;border:none;font-size:.875rem;font-weight:600;cursor:pointer;margin-top:.25rem;transition:background var(--transition-fast);}.pd-nf-btn:hover{background:var(--accent-hover);}`}</style>
    </div>
  )

  return (
    <VisibilityGuard page="projects">
      {project && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description}/>
          <link rel="canonical" href={meta.url}/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={meta.title}/>
          <meta property="og:description" content={meta.description}/>
          {meta.image && <meta property="og:image" content={meta.image}/>}
          <meta property="og:url" content={meta.url}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content={meta.title}/>
          <meta name="twitter:description" content={meta.description}/>
          {meta.image && <meta name="twitter:image" content={meta.image}/>}
          {project.seo_keywords?.length > 0 && <meta name="keywords" content={project.seo_keywords.join(', ')}/>}
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.title,
            "description": project.short_description,
            "url": meta.url,
            "author": { "@type": "Person", "name": SITE_CONFIG.owner.displayName },
            "applicationCategory": project.category,
            "offers": { "@type": "Offer", "price": "0" },
          })}</script>
        </Helmet>
      )}

      <div className="pd-page">
        <div className="pd-container">
          {/* Back link */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.1 }}>
            <Link to="/projects" className="pd-back">
              <FontAwesomeIcon icon={faArrowLeft}/> All Projects
            </Link>
          </motion.div>

          {loading ? (
            <ProjectDetailSkeleton/>
          ) : project ? (
            <>
              {/* View tracker (invisible) */}
              <ViewTracker slug={project.slug}/>

              {/* Hero */}
              <ProjectDetailHero project={project}/>

              {/* Main 2-col layout */}
              <div className={`pd-layout ${project.detail_layout === 'wide' ? 'pd-layout--wide' : project.detail_layout === 'centered' ? 'pd-layout--centered' : 'pd-layout--default'}`}>
                {/* ── MAIN CONTENT ──────────────────────── */}
                <motion.div
                  className="pd-main"
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:.4, delay:.2 }}
                >
                  {/* Short description lead */}
                  {project.short_description && (
                    <p className="pd-lead">{project.short_description}</p>
                  )}

                  {/* Key achievements */}
                  {project.key_achievements?.length > 0 && (
                    <div className="pd-achievements">
                      {project.key_achievements.map((a, i) => (
                        <div key={i} className="pd-achievement">
                          <span className="pd-achievement-dot"/>
                          {typeof a === 'string' ? a : a.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Full HTML content */}
                  {project.full_description_html && (
                    <ProjectHtmlContent html={project.full_description_html}/>
                  )}

                  {/* Key features grid */}
                  <FeaturesGrid features={project.features_list}/>

                  {/* Screenshots */}
                  <ProjectGallery screenshots={project.screenshots}/>

                  {/* Video embed */}
                  {project.video_url && (
                    <div className="pd-video-wrap">
                      <h3 className="pd-section-h">Demo Video</h3>
                      <div className="pd-video-frame">
                        <iframe
                          src={project.video_url.replace('watch?v=', 'embed/')}
                          title={`${project.title} Demo`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tech stack (detailed) */}
                  <ProjectTechStack
                    techStackDetail={project.tech_stack_detail}
                    languages={project.languages}
                    frameworks={project.frameworks}
                    tools={project.tools}
                    platforms={project.platforms}
                  />

                  {/* Challenges */}
                  {project.challenges_html && (
                    <div className="pd-section-block">
                      <h3 className="pd-section-h">Challenges</h3>
                      <ProjectHtmlContent html={project.challenges_html}/>
                    </div>
                  )}

                  {/* Learnings */}
                  {project.learnings_html && (
                    <div className="pd-section-block">
                      <h3 className="pd-section-h">What I Learned</h3>
                      <ProjectHtmlContent html={project.learnings_html}/>
                    </div>
                  )}

                  {/* Timeline */}
                  <Timeline events={project.timeline_events}/>

                  {/* Custom sections */}
                  {project.custom_sections?.map((s, i) => (
                    <div key={i} className="pd-section-block">
                      {s.title && <h3 className="pd-section-h">{s.title}</h3>}
                      {s.html && <ProjectHtmlContent html={s.html}/>}
                      {s.text && <p className="pd-section-text">{s.text}</p>}
                    </div>
                  ))}

                  {/* Live preview */}
                  {project.show_live_preview && project.live_preview_url && (
                    <div className="pd-preview-wrap">
                      <h3 className="pd-section-h">Live Preview</h3>
                      <div className="pd-preview-frame">
                        <iframe src={project.live_preview_url} title={`${project.title} Preview`} loading="lazy" sandbox="allow-scripts allow-same-origin"/>
                      </div>
                    </div>
                  )}

                  {/* Comments */}
                  <CommentsSection
                    contentType="project"
                    contentId={project.slug}
                    enabled={project.comments_enabled}
                  />
                </motion.div>

                {/* ── SIDEBAR ──────────────────────────── */}
                <motion.div
                  className="pd-sidebar-col"
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:.4, delay:.3 }}
                >
                  <div className="pd-sidebar-sticky">
                    <ProjectDetailSidebar
                      project={project}
                      userReaction={userData.reaction}
                      userRating={userData.rating}
                    />
                    <RelatedProjects projects={related}/>
                  </div>
                </motion.div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <style>{`
        .pd-page { padding-top: var(--navbar-h); padding-bottom: 4rem; min-height: 100vh; }
        .pd-container { max-width: var(--container-max); margin: 0 auto; padding: 1.5rem var(--container-pad) 0; }
        .pd-back {
          display: inline-flex; align-items: center; gap: .45rem;
          color: var(--text-tertiary); text-decoration: none;
          font-size: .85rem; font-weight: 600;
          padding: .4rem .75rem; border-radius: 8px;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
          margin-bottom: 1.5rem;
        }
        .pd-back:hover { color: var(--text-primary); background: var(--bg-surface-2); border-color: var(--border-color); }

        /* Layout */
        .pd-layout { display: grid; grid-template-columns: 1fr 300px; gap: 2rem; align-items: start; }
        .pd-layout--wide { grid-template-columns: 1fr 280px; }
        .pd-layout--centered { grid-template-columns: 1fr; max-width: 740px; margin: 0 auto; }
        .pd-layout--centered .pd-sidebar-col { display: none; }
        @media (max-width: 960px) { .pd-layout, .pd-layout--wide { grid-template-columns: 1fr; } .pd-sidebar-col { order: -1; } }

        .pd-main { min-width: 0; }
        .pd-sidebar-sticky { position: sticky; top: calc(var(--navbar-h) + 1rem); }

        /* Lead text */
        .pd-lead { font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin: 0 0 1.5rem; padding: 1rem 1.25rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-left: 3px solid var(--accent-primary); border-radius: 0 var(--radius-lg) var(--radius-lg) 0; }

        /* Achievements */
        .pd-achievements { display: flex; flex-direction: column; gap: .45rem; margin: 0 0 1.5rem; }
        .pd-achievement { display: flex; align-items: flex-start; gap: .6rem; font-size: .9rem; color: var(--text-secondary); line-height: 1.5; }
        .pd-achievement-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-primary); flex-shrink: 0; margin-top: .5rem; }

        /* Section heading */
        .pd-section-h { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 2rem 0 .9rem; font-family: var(--font-display); border-bottom: 1px solid var(--border-color); padding-bottom: .5rem; }
        .pd-section-block { margin: 1.5rem 0; }
        .pd-section-text { font-size: .9rem; color: var(--text-secondary); line-height: 1.7; }

        /* Features */
        .pd-features { margin: 1.5rem 0; }
        .pd-features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .75rem; }
        .pd-feature-card { padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); transition: all var(--transition-fast); }
        .pd-feature-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-sm); }
        .pd-feature-icon { font-size: 1.5rem; margin-bottom: .5rem; }
        .pd-feature-title { font-size: .9rem; font-weight: 700; color: var(--text-primary); margin-bottom: .25rem; }
        .pd-feature-desc { font-size: .82rem; color: var(--text-tertiary); line-height: 1.5; }

        /* Timeline */
        .pd-timeline { margin: 1.5rem 0; }
        .pd-tl-item { display: flex; gap: .9rem; padding-bottom: 1.25rem; position: relative; }
        .pd-tl-item:not(:last-child)::before { content: ''; position: absolute; left: 5.5px; top: 14px; bottom: 0; width: 1.5px; background: var(--border-color); }
        .pd-tl-dot { width: 13px; height: 13px; border-radius: 50%; background: var(--accent-primary); border: 2.5px solid var(--bg-page); box-shadow: 0 0 0 2px var(--accent-primary); flex-shrink: 0; margin-top: 3px; }
        .pd-tl-date { font-size: .75rem; color: var(--text-tertiary); font-weight: 600; margin-bottom: 2px; }
        .pd-tl-label { font-size: .9rem; font-weight: 600; color: var(--text-primary); }
        .pd-tl-desc { font-size: .82rem; color: var(--text-tertiary); margin-top: 3px; line-height: 1.5; }

        /* Video / Preview */
        .pd-video-wrap, .pd-preview-wrap { margin: 1.5rem 0; }
        .pd-video-frame, .pd-preview-frame { position: relative; padding-bottom: 56.25%; border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border-color); background: var(--bg-surface-2); }
        .pd-video-frame iframe, .pd-preview-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }

        /* HTML content styles */
        .proj-html {
          font-size: .95rem; color: var(--text-secondary); line-height: 1.75;
          margin: 1rem 0 1.5rem;
        }
        .proj-html h2 { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 1.75rem 0 .6rem; font-family: var(--font-display); }
        .proj-html h3 { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 1.5rem 0 .5rem; }
        .proj-html p { margin: 0 0 1rem; }
        .proj-html a { color: var(--accent-primary); text-decoration: underline; }
        .proj-html a:hover { opacity: .8; }
        .proj-html ul, .proj-html ol { padding-left: 1.5rem; margin: 0 0 1rem; }
        .proj-html li { margin: .3rem 0; }
        .proj-html strong { color: var(--text-primary); font-weight: 700; }
        .proj-html em { font-style: italic; }
        .proj-html code { font-family: var(--font-mono); font-size: .875em; background: var(--bg-surface-2); border: 1px solid var(--border-color); border-radius: 4px; padding: .1em .4em; color: var(--clr-teal); }
        .proj-html pre { background: var(--bg-surface-2); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1rem; overflow-x: auto; margin: 0 0 1rem; }
        .proj-html pre code { background: none; border: none; padding: 0; }
        .proj-html blockquote { border-left: 3px solid var(--accent-primary); padding: .5rem 1rem; margin: 1rem 0; background: var(--accent-light); border-radius: 0 var(--radius-md) var(--radius-md) 0; }
        .proj-html img { max-width: 100%; border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .proj-html hr { border: none; border-top: 1px solid var(--border-color); margin: 1.5rem 0; }
        .proj-html table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        .proj-html th, .proj-html td { padding: .5rem .75rem; text-align: left; border-bottom: 1px solid var(--border-color); font-size: .875rem; }
        .proj-html th { font-weight: 700; color: var(--text-primary); background: var(--bg-surface-2); }
      `}</style>
    </VisibilityGuard>
  )
}
