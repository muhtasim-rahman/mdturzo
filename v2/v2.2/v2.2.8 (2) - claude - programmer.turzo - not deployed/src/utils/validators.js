// ============================================================
// VALIDATORS
// ============================================================

export const USERNAME_REGEX = /^[a-z0-9._]{3,30}$/

export function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidUsername(username = '') {
  return USERNAME_REGEX.test(username)
}

export function isValidURL(url = '') {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function passwordStrength(password = '') {
  let score = 0
  if (password.length >= 8)        score++
  if (password.length >= 12)       score++
  if (/[A-Z]/.test(password))      score++
  if (/[a-z]/.test(password))      score++
  if (/[0-9]/.test(password))      score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return { level: 'weak',   label: 'Weak',   color: '#ef4444' }
  if (score <= 4) return { level: 'medium', label: 'Medium', color: '#f59e0b' }
  return           { level: 'strong', label: 'Strong', color: '#10b981' }
}

export function sanitizeText(str = '') {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim()
}

export function isHoneypotFilled(value = '') {
  return value.trim().length > 0
}
