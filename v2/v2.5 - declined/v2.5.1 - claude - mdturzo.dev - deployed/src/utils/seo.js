// ============================================================
// SEO Helpers — react-helmet-async এর সাথে use করো
// ============================================================

import { SITE_CONFIG } from '../config/site.config.js'

export function buildTitle(pageTitle) {
  if (!pageTitle) return `${SITE_CONFIG.siteName} — ${SITE_CONFIG.siteTagline}`
  return `${pageTitle} | ${SITE_CONFIG.siteName}`
}

export function buildMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords,
}) {
  const resolvedTitle = buildTitle(title)
  const resolvedDesc  = description || SITE_CONFIG.seo.defaultDescription
  const resolvedImage = image        || SITE_CONFIG.seo.defaultOGImage
  const resolvedURL   = url          || SITE_CONFIG.siteURL
  const fullImageURL  = resolvedImage.startsWith('http')
    ? resolvedImage
    : `${SITE_CONFIG.siteURL}${resolvedImage}`

  return {
    title:       resolvedTitle,
    description: resolvedDesc,
    image:       fullImageURL,
    url:         resolvedURL,
    type,
    keywords:    keywords || SITE_CONFIG.seo.defaultKeywords,
  }
}

// JSON-LD generators
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Person',
    name:        SITE_CONFIG.owner.fullName,
    url:         SITE_CONFIG.siteURL,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.twitter,
    ],
    jobTitle:    SITE_CONFIG.siteTagline,
    address: {
      '@type':         'PostalAddress',
      addressLocality: 'Nilphamari',
      addressCountry:  'BD',
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:        SITE_CONFIG.siteName,
    url:         SITE_CONFIG.siteURL,
    description: SITE_CONFIG.seo.defaultDescription,
    potentialAction: {
      '@type':       'SearchAction',
      target:        `${SITE_CONFIG.siteURL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function articleSchema({ title, description, image, datePublished, dateModified, url }) {
  return {
    '@context':    'https://schema.org',
    '@type':       'Article',
    headline:       title,
    description,
    image,
    datePublished,
    dateModified:   dateModified || datePublished,
    url,
    author: {
      '@type': 'Person',
      name:     SITE_CONFIG.owner.displayName,
      url:      SITE_CONFIG.siteURL,
    },
    publisher: {
      '@type': 'Organization',
      name:     SITE_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url:     `${SITE_CONFIG.siteURL}/logo.png`,
      },
    },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       `${SITE_CONFIG.siteURL}${item.path}`,
    })),
  }
}
