// ============================================================
// BUTTON COMPONENT — v2.1.1
// variant: primary | secondary | outline | ghost | danger
// size: sm | md | lg
// Universal ripple click effect on all variants
// ============================================================

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner }        from '@fortawesome/free-solid-svg-icons'
import { useRipple, RippleLayer } from './Ripple.jsx'

const BASE = 'relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-ring select-none disabled:opacity-50 disabled:cursor-not-allowed'

const VARIANTS = {
  primary:   'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-md hover:shadow-lg active:scale-[0.97]',
  secondary: 'bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] text-[var(--text-primary)] border border-[var(--border-color)] active:scale-[0.97]',
  outline:   'border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-light)] active:scale-[0.97]',
  ghost:     'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] active:scale-[0.97]',
  danger:    'bg-[var(--clr-error)] hover:bg-red-500 text-white active:scale-[0.97]',
}

const RIPPLE_COLORS = {
  primary:   'rgba(255,255,255,0.35)',
  secondary: 'rgba(59,130,246,0.18)',
  outline:   'rgba(59,130,246,0.18)',
  ghost:     'rgba(59,130,246,0.15)',
  danger:    'rgba(255,255,255,0.3)',
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
  onClick,
  ...props
}) {
  const { ripples, createRipple } = useRipple()

  const handleClick = (e) => {
    createRipple(e)
    onClick?.(e)
  }

  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      <RippleLayer ripples={ripples} color={RIPPLE_COLORS[variant]} />
      {loading
        ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        : icon && <FontAwesomeIcon icon={icon} />
      }
      {children}
      {iconRight && !loading && <FontAwesomeIcon icon={iconRight} />}
    </button>
  )
}
