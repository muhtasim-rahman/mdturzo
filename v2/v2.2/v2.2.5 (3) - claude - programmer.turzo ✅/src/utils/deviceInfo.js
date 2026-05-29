// ============================================================
// DEVICE INFO — Browser, OS, IP, Location
// সব form submission এ attach হয়
// ============================================================

function detectBrowser(ua = navigator.userAgent) {
  if (ua.includes('Edg'))     return 'Microsoft Edge'
  if (ua.includes('Chrome'))  return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari'))  return 'Safari'
  if (ua.includes('Opera'))   return 'Opera'
  return 'Unknown'
}

function detectOS(ua = navigator.userAgent) {
  if (ua.includes('Windows NT 10'))  return 'Windows 10/11'
  if (ua.includes('Windows'))        return 'Windows'
  if (ua.includes('Mac OS X'))       return 'macOS'
  if (ua.includes('Linux'))          return 'Linux'
  if (ua.includes('Android'))        return 'Android'
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  return 'Unknown'
}

export async function collectDeviceInfo() {
  const ua = navigator.userAgent
  let ipData = {}

  try {
    const res = await fetch('https://ipapi.co/json/')
    ipData    = await res.json()
  } catch {}

  return {
    browser:     detectBrowser(ua),
    os:          detectOS(ua),
    device:      /Mobile|Android|iPhone|iPad/i.test(ua) ? 'Mobile' : 'Desktop',
    screen:      `${window.screen.width}×${window.screen.height}`,
    language:    navigator.language,
    timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
    ip:          ipData.ip          || 'Unknown',
    city:        ipData.city        || 'Unknown',
    region:      ipData.region      || 'Unknown',
    country:     ipData.country_name || 'Unknown',
    isp:         ipData.org         || 'Unknown',
    timestamp:   new Date().toISOString(),
    referrer:    document.referrer  || 'Direct',
    currentPage: window.location.href,
  }
}
