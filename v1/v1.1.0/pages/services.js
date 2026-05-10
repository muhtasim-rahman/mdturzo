// ================================================
// pages/services.js
// ================================================
export function renderPage() {
  return `
<div class="page-wrap">
  <section class="section services-section">
    <div class="container">
      <div style="margin-bottom:3rem;text-align:center" data-aos>
        <span class="section-label">// what_i_offer</span>
        <h1 class="section-title">My <span>Services</span></h1>
        <div class="divider" style="margin:1rem auto"></div>
        <p class="section-sub" style="margin:0 auto">Professional services with quality, creativity, and Halal ethics.</p>
      </div>

      <div class="services-grid" data-stagger>
        <div class="svc-card">
          <div class="svc-icon">🌐</div>
          <h3 class="svc-title">Website Development</h3>
          <p class="svc-desc">Responsive, modern websites from scratch — from portfolios to full Firebase-powered web apps.</p>
          <ul class="svc-list">
            <li>Responsive for all devices</li><li>Clean &amp; maintainable code</li>
            <li>Firebase-powered dynamic sites</li><li>Performance &amp; SEO focused</li><li>PWA-ready on request</li>
          </ul>
        </div>
        <div class="svc-card">
          <div class="svc-icon gold">🎨</div>
          <h3 class="svc-title">Graphic Design</h3>
          <p class="svc-desc">4+ years of creative design — logos, banners, and thumbnails that make your brand stand out.</p>
          <ul class="svc-list">
            <li>Logo &amp; brand identity</li><li>YouTube thumbnails</li>
            <li>Banners &amp; posters</li><li>Business cards</li><li>Social media graphics</li>
          </ul>
        </div>
        <div class="svc-card">
          <div class="svc-icon">🎬</div>
          <h3 class="svc-title">Video Editing</h3>
          <p class="svc-desc">2.5+ years transforming raw footage into polished videos for YouTube, ads, and social media.</p>
          <ul class="svc-list">
            <li>YouTube &amp; Facebook videos</li><li>Promotional/Ad videos</li>
            <li>Reels &amp; short-form content</li><li>Color grading</li><li>Motion transitions</li>
          </ul>
        </div>
        <div class="svc-card">
          <div class="svc-icon gold">📚</div>
          <h3 class="svc-title">eLearning Platform <span class="badge badge-dev" style="vertical-align:middle;margin-left:.4rem">Under Dev</span></h3>
          <p class="svc-desc">Free online courses on web development and programming. Coming soon.</p>
          <ul class="svc-list">
            <li>Web development tutorials</li><li>Programming fundamentals</li>
            <li>Project-based learning</li><li>100% free</li>
          </ul>
        </div>
      </div>

      <div class="stats-banner" data-aos>
        <div class="sb-stat"><span class="sb-stat-v" data-count="4.5" data-suffix="+">4.5+</span><span class="sb-stat-l">Years Experience</span></div>
        <div class="sb-stat"><span class="sb-stat-v" data-count="13" data-suffix="+">13+</span><span class="sb-stat-l">Projects</span></div>
        <div class="sb-stat"><span class="sb-stat-v" data-count="3">3</span><span class="sb-stat-l">Core Services</span></div>
        <div class="sb-stat"><span class="sb-stat-v">🌐</span><span class="sb-stat-l">Online Support</span></div>
      </div>

      <div style="text-align:center;margin-top:3rem" data-aos>
        <p style="color:var(--text-muted);margin-bottom:1.5rem">Interested in working together? Let's discuss your project.</p>
        <a href="/contact" class="btn btn-primary"><i class="ri-mail-send-line"></i>Get In Touch</a>
      </div>
    </div>
  </section>
</div>`;
}

export function initPage() {}
