// =============================================================================
// UTILS — Shared utility functions across the entire website
// =============================================================================

const Utils = (() => {

  // ── DOM Helpers ─────────────────────────────────────────────────────────────

  /** Shorthand for document.querySelector */
  const $ = (selector, context = document) => context.querySelector(selector);

  /** Shorthand for document.querySelectorAll */
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  /** Create element with attributes and content */
  const createElement = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else if (k === 'innerHTML') el.innerHTML = v;
      else if (k === 'textContent') el.textContent = v;
      else el.setAttribute(k, v);
    });
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else el.appendChild(child);
    });
    return el;
  };

  // ── String Helpers ──────────────────────────────────────────────────────────

  /** Convert a string to URL-safe slug */
  const slugify = (str) =>
    str.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  /** Truncate text to maxLength with ellipsis */
  const truncate = (str, maxLength = 100) =>
    str.length <= maxLength ? str : str.slice(0, maxLength).trimEnd() + '...';

  /** Escape HTML to prevent XSS */
  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // ── Date & Time Helpers ─────────────────────────────────────────────────────

  /** Format a timestamp (ms or Firebase timestamp) to readable date */
  const formatDate = (timestamp) => {
    const date = timestamp?.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year:  'numeric',
      month: 'long',
      day:   'numeric',
    });
  };

  /** Relative time (e.g., "2 hours ago") */
  const timeAgo = (timestamp) => {
    const date = timestamp?.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
    const seconds = Math.floor((Date.now() - date) / 1000);
    const intervals = [
      { label: 'year',   secs: 31536000 },
      { label: 'month',  secs: 2592000  },
      { label: 'week',   secs: 604800   },
      { label: 'day',    secs: 86400    },
      { label: 'hour',   secs: 3600     },
      { label: 'minute', secs: 60       },
    ];
    for (const { label, secs } of intervals) {
      const count = Math.floor(seconds / secs);
      if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  };

  /** Estimate reading time from HTML content */
  const readingTime = (html) => {
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.trim().split(/\s+/).length;
    const mins = Math.ceil(words / 200);
    return `${mins} min read`;
  };

  // ── Storage Helpers ─────────────────────────────────────────────────────────

  /** Safe localStorage get (returns null on error) */
  const lsGet = (key) => {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  };

  /** Safe localStorage set */
  const lsSet = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  };

  /** Safe localStorage remove */
  const lsRemove = (key) => {
    try { localStorage.removeItem(key); return true; }
    catch { return false; }
  };

  // ── Timing Helpers ──────────────────────────────────────────────────────────

  /** Debounce a function */
  const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  /** Throttle a function */
  const throttle = (fn, limit = 200) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        fn(...args);
      }
    };
  };

  // ── Animation Helpers ───────────────────────────────────────────────────────

  /** Animate a counter from 0 to target value */
  const animateCounter = (el, target, duration = 1500, suffix = '') => {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  /** Run fn when element enters viewport */
  const onVisible = (el, fn, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fn(entry);
          if (options.once !== false) observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return observer;
  };

  // ── URL & Routing Helpers ───────────────────────────────────────────────────

  /** Get current path */
  const getPath = () => window.location.pathname;

  /** Copy text to clipboard */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    }
  };

  // ── Toast Notification ──────────────────────────────────────────────────────

  /** Show a simple toast notification */
  const showToast = (message, type = 'info', duration = 3000) => {
    const existing = document.getElementById('toast-container');
    const container = existing || (() => {
      const c = createElement('div', { id: 'toast-container', className: 'toast-container' });
      document.body.appendChild(c);
      return c;
    })();

    const toast = createElement('div', {
      className: `toast toast--${type}`,
      innerHTML: `<i class="fa-solid ${
        type === 'success' ? 'fa-circle-check' :
        type === 'error'   ? 'fa-circle-xmark' :
        type === 'warning' ? 'fa-triangle-exclamation' :
        'fa-circle-info'
      }"></i><span>${escapeHTML(message)}</span>`,
    });

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast--show'));

    setTimeout(() => {
      toast.classList.remove('toast--show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  };

  // ── SEO Helpers ─────────────────────────────────────────────────────────────

  /** Update page meta tags dynamically */
  const updateMeta = ({ title, description, ogImage, url, keywords } = {}) => {
    const cfg = window.SITE_CONFIG || {};
    const fullTitle = title ? `${title} — ${cfg.siteName || 'Muhtasim Rahman'}` : cfg.siteName;
    const desc = description || cfg.seo?.defaultDescription || '';
    const img  = ogImage    || cfg.seo?.defaultOGImage       || '/assets/images/preview.png';
    const canonical = url   || window.location.href;

    document.title = fullTitle;
    const setMeta = (name, content, prop = false) => {
      let el = prop
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el[prop ? 'setAttribute' : 'setAttribute'](prop ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    if (keywords) setMeta('keywords', keywords);
    setMeta('og:title',       fullTitle, true);
    setMeta('og:description', desc,      true);
    setMeta('og:image',       img,       true);
    setMeta('og:url',         canonical, true);
    setMeta('twitter:title',  fullTitle);
    setMeta('twitter:description', desc);

    let canonical_el = document.querySelector('link[rel="canonical"]');
    if (!canonical_el) {
      canonical_el = document.createElement('link');
      canonical_el.rel = 'canonical';
      document.head.appendChild(canonical_el);
    }
    canonical_el.href = canonical;
  };

  // ── Spam / Rate Limiting ────────────────────────────────────────────────────

  /**
   * Simple client-side rate limiter using localStorage.
   * Returns true if action is allowed, false if rate-limited.
   */
  const rateLimit = (key, maxCount, windowMs) => {
    const now = Date.now();
    const data = lsGet(`rl_${key}`) || { count: 0, resetAt: now + windowMs };
    if (now > data.resetAt) { data.count = 0; data.resetAt = now + windowMs; }
    if (data.count >= maxCount) return false;
    data.count++;
    lsSet(`rl_${key}`, data);
    return true;
  };

  // ── Image Helpers ───────────────────────────────────────────────────────────

  /** Lazy-load an image and replace skeleton when ready */
  const lazyLoadImage = (img) => {
    const src = img.dataset.src;
    if (!src) return;
    const loader = new Image();
    loader.onload = () => {
      img.src = src;
      img.parentElement?.classList.remove('skeleton');
      img.classList.add('img--loaded');
    };
    loader.src = src;
  };

  /** Initialize lazy loading for all [data-src] images */
  const initLazyImages = () => {
    const images = $$('img[data-src]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            lazyLoadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px' });
      images.forEach(img => observer.observe(img));
    } else {
      images.forEach(lazyLoadImage);
    }
  };

  // Public API
  return {
    $, $$, createElement,
    slugify, truncate, escapeHTML,
    formatDate, timeAgo, readingTime,
    lsGet, lsSet, lsRemove,
    debounce, throttle,
    animateCounter, onVisible,
    getPath, copyToClipboard,
    showToast,
    updateMeta,
    rateLimit,
    lazyLoadImage, initLazyImages,
  };

})();

window.Utils = Utils;
