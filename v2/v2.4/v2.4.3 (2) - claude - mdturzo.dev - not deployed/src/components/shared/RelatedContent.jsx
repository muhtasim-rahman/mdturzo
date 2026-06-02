// RelatedContent.jsx — v2.4.0
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const CAT_COLORS = {
  'Web App': '#3B82F6', 'Utility': '#10B981', 'Education': '#F59E0B',
  'UI Component': '#EC4899', 'Dev Tool': '#A855F7', 'Islamic': '#06B6D4',
  'Tool': '#F97316', 'default': '#64748B',
}

function RelatedCard({ project, i }) {
  const color = CAT_COLORS[project.category] ?? CAT_COLORS.default

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.08 }}>
      <Link
        to={`/projects/${project.slug}`}
        className="block group bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--border-strong)] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Thumbnail */}
        <div className="relative h-32 overflow-hidden">
          {project.thumbnail_url ? (
            <img src={project.thumbnail_url} alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${color}18, ${color}06)` }}>
              <FontAwesomeIcon icon={faFolderOpen} className="text-2xl" style={{ color: `${color}50` }} />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
              style={{ background: `${color}22`, color, border: `1px solid ${color}35` }}>
              {project.category}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-3">
          <h4 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors">
            {project.title}
          </h4>
          {project.short_description && (
            <p className="text-xs text-[var(--text-tertiary)] mt-1 line-clamp-2 leading-relaxed">
              {project.short_description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function RelatedContent({ items = [], title = 'Related Projects', loading = false, className = '' }) {
  if (!loading && items.length === 0) return null

  return (
    <section className={`related-section ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">{title}</h3>
        <Link to="/projects" className="flex items-center gap-1.5 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
          View all <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl overflow-hidden">
              <div className="sk h-32 w-full" />
              <div className="p-3 space-y-2">
                <div className="sk h-4 w-3/4 rounded" />
                <div className="sk h-3 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((p, i) => <RelatedCard key={p.id || i} project={p} i={i} />)}
        </div>
      )}
    </section>
  )
}
