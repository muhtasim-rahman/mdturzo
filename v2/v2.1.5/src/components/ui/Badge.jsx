// ============================================================
// BADGE COMPONENT
// ============================================================

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VARIANTS = {
  default:  'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
  primary:  'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  success:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  warning:  'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  danger:   'bg-red-500/15 text-red-400 border border-red-500/30',
  info:     'bg-sky-500/15 text-sky-400 border border-sky-500/30',
}

export function Badge({
  children,
  variant  = 'default',
  icon,
  dot,
  dotColor = '#10b981',
  className = '',
  style,
}) {
  return (
    <span
      className={`badge ${VARIANTS[variant]} ${className}`}
      style={style}
    >
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {icon && <FontAwesomeIcon icon={icon} className="text-xs" />}
      {children}
    </span>
  )
}
