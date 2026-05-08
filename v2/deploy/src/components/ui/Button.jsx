// ============================================================
// BUTTON COMPONENT
// variant: primary | secondary | outline | ghost | danger
// size: sm | md | lg
// ============================================================

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner }        from '@fortawesome/free-solid-svg-icons'

const BASE = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-ring select-none disabled:opacity-50 disabled:cursor-not-allowed'

const VARIANTS = {
  primary:   'bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-lg active:scale-95',
  secondary: 'bg-[var(--bg-elevated)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border)]',
  outline:   'border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white active:scale-95',
  ghost:     'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
  danger:    'bg-red-600 hover:bg-red-500 text-white active:scale-95',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

export function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  icon,
  iconRight,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading
        ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        : icon && <FontAwesomeIcon icon={icon} />
      }
      {children}
      {iconRight && !loading && <FontAwesomeIcon icon={iconRight} />}
    </button>
  )
}
