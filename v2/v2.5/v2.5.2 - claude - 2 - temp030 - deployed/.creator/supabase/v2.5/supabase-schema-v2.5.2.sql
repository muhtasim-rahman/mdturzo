-- ============================================================
-- supabase-schema-v2.5.2.sql  (FIXED)
-- COMPLETE REBUILD: Drop all non-projects tables and recreate.
-- ============================================================

-- ── Drop all non-projects tables (order respects FK deps) ────
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS spam_tracking CASCADE;
DROP TABLE IF EXISTS notification_reads CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS feed_saved CASCADE;
DROP TABLE IF EXISTS saved_projects CASCADE;
DROP TABLE IF EXISTS comment_likes CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS page_visibility CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS usernames CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop any old functions
DROP FUNCTION IF EXISTS is_admin() CASCADE;
DROP FUNCTION IF EXISTS increment_blog_views(UUID) CASCADE;
DROP FUNCTION IF EXISTS increment_post_views(UUID) CASCADE;
DROP FUNCTION IF EXISTS increment_project_views(UUID) CASCADE;

-- ── USERS ────────────────────────────────────────────────────
CREATE TABLE users (
  id                TEXT PRIMARY KEY,
  username          TEXT UNIQUE,
  display_name      TEXT,
  email             TEXT,
  bio               TEXT CHECK (char_length(bio) <= 100),
  description       TEXT CHECK (char_length(description) <= 500),
  web_url           TEXT,
  photo_url         TEXT,
  banner_url        TEXT,
  location_city     TEXT,
  location_country  TEXT,
  social_links      JSONB DEFAULT '[]'::jsonb,
  visibility        JSONB DEFAULT '{}'::jsonb,
  is_email_verified BOOLEAN DEFAULT false,
  is_banned         BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now(),
  last_seen         TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE usernames (
  username  TEXT PRIMARY KEY,
  user_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admins (
  id        TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email     TEXT UNIQUE NOT NULL,
  added_at  TIMESTAMPTZ DEFAULT now()
);

-- ── CONTENT: BLOGS ──────────────────────────────────────────
CREATE TABLE blogs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  short_description TEXT,
  thumbnail_url     TEXT,
  cover_image_url   TEXT,
  content           TEXT,
  author_name       TEXT DEFAULT 'Muhtasim Rahman',
  reading_time      INT,
  category          TEXT,
  series            TEXT,
  tags              TEXT[] DEFAULT '{}',
  status            TEXT DEFAULT 'draft' CHECK (status IN ('published','draft','hidden')),
  visibility        TEXT DEFAULT 'public' CHECK (visibility IN ('public','signed-in','private')),
  pinned            BOOLEAN DEFAULT false,
  seo_title         TEXT,
  seo_description   TEXT,
  views_count       INT DEFAULT 0,
  likes_count       INT DEFAULT 0,
  dislikes_count    INT DEFAULT 0,
  comments_count    INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_blogs_status_visibility ON blogs(status, visibility);
CREATE INDEX idx_blogs_created ON blogs(created_at DESC);
CREATE INDEX idx_blogs_category ON blogs(category);

-- ── CONTENT: POSTS ──────────────────────────────────────────
CREATE TABLE posts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  content        TEXT,
  description    TEXT,
  embed_url      TEXT,
  platform       TEXT,
  thumbnail_url  TEXT,
  media_items    JSONB DEFAULT '[]'::jsonb,
  tags           TEXT[] DEFAULT '{}',
  category       TEXT,
  status         TEXT DEFAULT 'draft' CHECK (status IN ('published','draft','hidden')),
  visibility     TEXT DEFAULT 'public' CHECK (visibility IN ('public','signed-in','private')),
  views_count    INT DEFAULT 0,
  likes_count    INT DEFAULT 0,
  dislikes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_posts_status_visibility ON posts(status, visibility);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

-- ── INTERACTIONS: COMMENTS ──────────────────────────────────
CREATE TABLE comments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('project','blog','post')),
  content_id   UUID NOT NULL,
  content_slug TEXT NOT NULL,
  user_id      TEXT REFERENCES users(id) ON DELETE SET NULL,
  text         TEXT NOT NULL CHECK (char_length(text) <= 1000),
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','flagged')),
  device_info  JSONB DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_content ON comments(content_type, content_id);
CREATE INDEX idx_comments_user ON comments(user_id);

CREATE TABLE comment_likes (
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id    TEXT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (comment_id, user_id)
);

-- ── INTERACTIONS: LIKES ─────────────────────────────────────
CREATE TABLE likes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('project','blog','post','review')),
  content_id   UUID NOT NULL,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type         TEXT NOT NULL CHECK (type IN ('like','dislike')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_id, user_id)
);

CREATE INDEX idx_likes_content ON likes(content_type, content_id);

-- ── INTERACTIONS: SAVES ─────────────────────────────────────
CREATE TABLE feed_saved (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog','post')),
  content_id   UUID NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

CREATE TABLE saved_projects (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, project_id)
);

-- ── INTERACTIONS: REPORTS ───────────────────────────────────
CREATE TABLE reports (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('project','blog','post','comment','review')),
  content_id   UUID NOT NULL,
  reporter_id  TEXT REFERENCES users(id) ON DELETE SET NULL,
  reason       TEXT NOT NULL,
  description  TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','dismissed','actioned')),
  device_info  JSONB DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ── REVIEWS ─────────────────────────────────────────────────
CREATE TABLE reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating         INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text           TEXT,
  image_urls     TEXT[] DEFAULT '{}',
  status         TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  verified_badge BOOLEAN DEFAULT false,
  likes_count    INT DEFAULT 0,
  device_info    JSONB DEFAULT '{}'::jsonb,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- ── MESSAGES ────────────────────────────────────────────────
CREATE TABLE messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT NOT NULL CHECK (type IN ('general','bug','question')),
  name        TEXT,
  email       TEXT,
  subject     TEXT,
  content     TEXT NOT NULL,
  image_urls  TEXT[] DEFAULT '{}',
  user_id     TEXT,
  device_info JSONB DEFAULT '{}'::jsonb,
  status      TEXT DEFAULT 'unread' CHECK (status IN ('unread','read','archived')),
  starred     BOOLEAN DEFAULT false,
  email_sent  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── BADGES ──────────────────────────────────────────────────
CREATE TABLE badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  icon        TEXT NOT NULL,
  color       TEXT NOT NULL,
  description TEXT,
  type        TEXT NOT NULL CHECK (type IN ('account','earned')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_badges (
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id    UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

-- ── NOTIFICATIONS ────────────────────────────────────────────
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  type        TEXT,
  target      TEXT DEFAULT 'all' CHECK (target IN ('all','signed-in','specific')),
  target_uid  TEXT,
  link        TEXT,
  expires_at  TIMESTAMPTZ,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE notification_reads (
  user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  read_at         TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, notification_id)
);

-- ── SYSTEM ───────────────────────────────────────────────────
CREATE TABLE activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT,
  action      TEXT NOT NULL,
  details     JSONB DEFAULT '{}'::jsonb,
  device_info JSONB DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_activity_logs_user    ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);

CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE page_visibility (
  page       TEXT PRIMARY KEY,
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public','signed-in','private'))
);

CREATE TABLE spam_tracking (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  action     TEXT NOT NULL,
  user_id    TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_spam_ip_action ON spam_tracking(ip_address, action);

CREATE TABLE analytics (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page       TEXT,
  event      TEXT,
  user_id    TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── INITIAL DATA ─────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('stats_years_dev',      '"3"'),
  ('stats_years_design',   '"6"'),
  ('stats_projects',       '"16"'),
  ('available_for_work',   'true'),
  ('cv_url',               '""'),
  ('cv_enabled',           'true'),
  ('cookie_banner',        'true'),
  ('maintenance',          'false'),
  ('comment_auto_approve', 'false')
ON CONFLICT (key) DO NOTHING;

INSERT INTO page_visibility (page, visibility) VALUES
  ('about',    'public'),
  ('projects', 'public'),
  ('blogs',    'public'),
  ('posts',    'public'),
  ('feed',     'public'),
  ('contact',  'public')
ON CONFLICT (page) DO NOTHING;

-- ── ADMIN HELPER FUNCTION ────────────────────────────────────
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins WHERE id = auth.uid()::text
  )
$$ LANGUAGE sql SECURITY DEFINER;

-- ── VIEW INCREMENT RPC FUNCTIONS ─────────────────────────────
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
  UPDATE projects SET views_count = views_count + 1 WHERE id = project_id;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS void AS $$
  UPDATE blogs SET views_count = views_count + 1 WHERE id = blog_id;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
  UPDATE posts SET views_count = views_count + 1 WHERE id = post_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- ── ROW LEVEL SECURITY ───────────────────────────────────────

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read non-banned" ON users FOR SELECT USING (NOT is_banned);
CREATE POLICY "Own full access"        ON users FOR ALL  USING (auth.uid()::text = id);
CREATE POLICY "Admin full"             ON users FOR ALL  USING (is_admin());

ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON usernames FOR SELECT USING (true);
CREATE POLICY "Own write"   ON usernames FOR ALL   USING (auth.uid()::text = user_id);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read" ON admins FOR SELECT USING (true);
CREATE POLICY "Admin full"  ON admins FOR ALL    USING (is_admin());

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public see published public"        ON blogs FOR SELECT USING (status = 'published' AND visibility = 'public');
CREATE POLICY "Signed-in see signed-in visibility" ON blogs FOR SELECT USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin full"                         ON blogs FOR ALL   USING (is_admin());

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public see published public"        ON posts FOR SELECT USING (status = 'published' AND visibility = 'public');
CREATE POLICY "Signed-in see signed-in visibility" ON posts FOR SELECT USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin full"                         ON posts FOR ALL   USING (is_admin());

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read approved" ON comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Own insert"    ON comments FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Own update"    ON comments FOR UPDATE USING (auth.uid()::text = user_id);
CREATE POLICY "Own delete"    ON comments FOR DELETE USING (auth.uid()::text = user_id);
CREATE POLICY "Admin full"    ON comments FOR ALL    USING (is_admin());

ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read all"   ON comment_likes FOR SELECT USING (true);
CREATE POLICY "Own manage" ON comment_likes FOR ALL    USING (auth.uid()::text = user_id);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read all"   ON likes FOR SELECT USING (true);
CREATE POLICY "Own manage" ON likes FOR ALL    USING (auth.uid()::text = user_id);

ALTER TABLE feed_saved ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own access" ON feed_saved FOR ALL USING (auth.uid()::text = user_id);

ALTER TABLE saved_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own access" ON saved_projects FOR ALL USING (auth.uid()::text = user_id);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own insert" ON reports FOR INSERT WITH CHECK (auth.uid()::text = reporter_id);
CREATE POLICY "Admin full" ON reports FOR ALL    USING (is_admin());

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read approved" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Own manage"    ON reviews FOR ALL    USING (auth.uid()::text = user_id);
CREATE POLICY "Admin full"    ON reviews FOR ALL    USING (is_admin());

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read"    ON messages FOR SELECT USING (is_admin());
CREATE POLICY "Admin full"    ON messages FOR ALL    USING (is_admin());

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON badges FOR SELECT USING (true);
CREATE POLICY "Admin full"  ON badges FOR ALL    USING (is_admin());

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Admin full"  ON user_badges FOR ALL    USING (is_admin());

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in read active" ON notifications FOR SELECT USING (auth.uid() IS NOT NULL AND active = true);
CREATE POLICY "Admin full"            ON notifications FOR ALL   USING (is_admin());

ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own access" ON notification_reads FOR ALL USING (auth.uid()::text = user_id);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert" ON activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read"    ON activity_logs FOR SELECT USING (is_admin());

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin write" ON site_settings FOR ALL    USING (is_admin());

ALTER TABLE page_visibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read" ON page_visibility FOR SELECT USING (true);
CREATE POLICY "Admin write" ON page_visibility FOR ALL    USING (is_admin());

ALTER TABLE spam_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert" ON spam_tracking FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read"    ON spam_tracking FOR SELECT USING (is_admin());

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert" ON analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read"    ON analytics FOR SELECT USING (is_admin());

-- ── SAMPLE BLOGS ─────────────────────────────────────────────
-- Using $BLOG1$ and $BLOG2$ dollar-quoting to safely embed HTML with
-- single quotes, backticks, and code examples without escaping issues.

INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, thumbnail_url, cover_image_url, content, views_count, likes_count, comments_count, created_at, updated_at)
VALUES (
  'advanced-supabase-rls-guide',
  'Mastering Supabase Row Level Security: A Developer''s Deep Dive',
  'An advanced guide to writing bulletproof RLS policies in Supabase — covering multi-role patterns, performance optimizations, and real-world gotchas.',
  'Web Dev',
  ARRAY['supabase','rls','postgresql','security','backend'],
  'published', 'public', false, 8,
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85',
  $BLOG1$<h2>What is Row Level Security?</h2>
<p>Row Level Security (RLS) in PostgreSQL — and by extension, Supabase — allows you to define <strong>fine-grained access policies</strong> at the database row level. Think of it as middleware that lives inside your database, automatically filtering what data each user can see, insert, update, or delete.</p>

<h2>Why RLS Matters in Supabase</h2>
<p>Supabase exposes your database directly via a REST and GraphQL API. This means that without RLS, <em>any client with your anon key can read any table</em>. Since the anon key is public (it lives in your frontend), RLS is your primary line of defense.</p>

<blockquote>RLS is not optional in Supabase — it is the architecture. Build it right from day one.</blockquote>

<h2>Understanding USING vs WITH CHECK</h2>
<p>When writing policies, two clauses control behavior:</p>
<ul>
<li><strong>USING</strong> — applied for SELECT, UPDATE, DELETE. Filters which rows are visible/affected.</li>
<li><strong>WITH CHECK</strong> — applied for INSERT and UPDATE. Validates that new/changed rows satisfy the policy before committing.</li>
</ul>

<pre><code class="language-sql">-- Block users from reading rows they don't own
CREATE POLICY "Own data only"
  ON comments FOR SELECT
  USING (auth.uid()::text = user_id);

-- Prevent inserting rows with someone else's user_id
CREATE POLICY "Own insert only"
  ON comments FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);</code></pre>

<h2>The Admin Helper Function Pattern</h2>
<p>A common pattern is a <code>SECURITY DEFINER</code> function that checks admin status. This avoids recursive RLS issues and centralizes your admin check:</p>

<pre><code class="language-sql">CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $func$
  SELECT EXISTS (
    SELECT 1 FROM admins WHERE id = auth.uid()::text
  )
$func$ LANGUAGE sql SECURITY DEFINER;

-- Now use it in any policy
CREATE POLICY "Admin full access" ON blogs
  FOR ALL USING (is_admin());</code></pre>

<h2>Performance: RLS Can Hurt Query Speed</h2>
<p>Every RLS policy adds a filter to your query. If the policy references a subquery (like <code>is_admin()</code>), PostgreSQL evaluates that for every row. Here are three optimizations:</p>
<ol>
<li><strong>Index the filtered columns</strong> — Always index <code>user_id</code>, <code>status</code>, and <code>visibility</code> columns used in policies.</li>
<li><strong>Cache auth.uid() in the policy itself</strong> — Using <code>auth.uid()</code> directly is fast (it's a session variable), but avoid calling your own tables unnecessarily.</li>
<li><strong>Use SECURITY DEFINER functions sparingly</strong> — They bypass RLS internally, which is powerful but requires careful auditing.</li>
</ol>

<h2>Multi-Visibility Pattern (Public / Signed-in / Private)</h2>
<p>This is the pattern used on this portfolio for controlling content visibility:</p>

<pre><code class="language-sql">-- Public content (no auth needed)
CREATE POLICY "Public can read published public"
  ON blogs FOR SELECT
  USING (status = 'published' AND visibility = 'public');

-- Logged-in users can also see "signed-in" content
CREATE POLICY "Signed-in can read signed-in content"
  ON blogs FOR SELECT
  USING (
    status = 'published'
    AND visibility = 'signed-in'
    AND auth.uid() IS NOT NULL
  );

-- Admins can see everything
CREATE POLICY "Admin full access"
  ON blogs FOR ALL
  USING (is_admin());</code></pre>

<h2>Common Gotchas</h2>
<p>A few things that trip up developers new to RLS:</p>
<ul>
<li>Policies on the same table for the same operation are combined with OR (permissive) by default.</li>
<li>RESTRICTIVE policies use AND — useful for mandatory filters like "never show banned user content."</li>
<li>If RLS is enabled but no policy matches, the default is DENY — a good security default.</li>
<li>The Service Role key bypasses RLS entirely — never expose it to the client.</li>
</ul>

<h2>Conclusion</h2>
<p>RLS is one of the most powerful features of PostgreSQL-backed applications. It moves security logic closer to the data, making it harder to accidentally leak data through a new API endpoint or query. Invest time in getting your policies right — your users and your future self will thank you.</p>$BLOG1$,
  142, 38, 5,
  NOW() - INTERVAL '27 days',
  NOW() - INTERVAL '20 days'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, thumbnail_url, cover_image_url, content, views_count, likes_count, comments_count, created_at, updated_at)
VALUES (
  'react-performance-patterns-2026',
  'React Performance Patterns in 2026: What Actually Works',
  'A practical guide to React optimization — covering React Compiler, lazy loading, memoization, virtualization, and when NOT to optimize.',
  'Web Dev',
  ARRAY['react','performance','javascript','frontend','optimization'],
  'published', 'public', false, 6,
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80',
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1400&q=85',
  $BLOG2$<h2>The Golden Rule: Don't Optimize Prematurely</h2>
<p>Before diving into patterns, let's address the elephant in the room: <strong>most React apps don't need heavy optimization</strong>. React 19 with the React Compiler handles most re-render issues automatically. Profile first, optimize second.</p>

<blockquote>Premature optimization is the root of all evil. Profile your app with React DevTools Profiler before touching useMemo or useCallback.</blockquote>

<h2>1. React Compiler (React 19+)</h2>
<p>The React Compiler, now stable in React 19, automatically memoizes components, hooks, and values. This means many cases where you previously needed <code>useMemo</code> and <code>useCallback</code> are now handled automatically.</p>

<pre><code class="language-jsx">// Before React Compiler — manual memoization needed
const ExpensiveList = React.memo(({ items }) => {
  const processed = useMemo(() =>
    items.map(item => expensiveTransform(item)), [items])
  return &lt;ul&gt;{processed.map(i => &lt;li key={i.id}&gt;{i.label}&lt;/li&gt;)}&lt;/ul&gt;
})

// With React Compiler — this is often enough
function ExpensiveList({ items }) {
  const processed = items.map(item => expensiveTransform(item))
  return &lt;ul&gt;{processed.map(i => &lt;li key={i.id}&gt;{i.label}&lt;/li&gt;)}&lt;/ul&gt;
}</code></pre>

<h2>2. Code Splitting with React.lazy</h2>
<p>Route-level code splitting is the highest-impact optimization. Each route loads only what it needs:</p>

<pre><code class="language-jsx">const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'))
const BlogDetail    = React.lazy(() => import('./pages/BlogDetail'))

&lt;Suspense fallback={&lt;DetailSkeleton /&gt;}&gt;
  &lt;Routes&gt;
    &lt;Route path="/projects/:slug" element={&lt;ProjectDetail /&gt;} /&gt;
    &lt;Route path="/blogs/:slug"    element={&lt;BlogDetail /&gt;}    /&gt;
  &lt;/Routes&gt;
&lt;/Suspense&gt;</code></pre>

<h2>3. Virtualization for Long Lists</h2>
<p>Rendering hundreds of DOM nodes kills performance. For lists with 50+ items, use virtualization. <code>@tanstack/react-virtual</code> is the best option in 2026:</p>

<pre><code class="language-jsx">import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef(null)
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  })
  return (
    &lt;div ref={parentRef} style={{ height: 600, overflow: 'auto' }}&gt;
      &lt;div style={{ height: rowVirtualizer.getTotalSize() }}&gt;
        {rowVirtualizer.getVirtualItems().map(vRow => (
          &lt;div key={vRow.key} style={{ transform: `translateY(${vRow.start}px)`, height: 80 }}&gt;
            &lt;ItemCard item={items[vRow.index]} /&gt;
          &lt;/div&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  )
}</code></pre>

<h2>4. Image Optimization</h2>
<p>Images are the #1 cause of poor Core Web Vitals. Three rules:</p>
<ol>
<li><strong>Always lazy-load below-the-fold images</strong> with <code>loading="lazy"</code></li>
<li><strong>Preload hero images</strong> with <code>&lt;link rel="preload" as="image"&gt;</code> in your HTML head</li>
<li><strong>Use WebP format</strong> with appropriate sizing — never serve a 4000px image in a 400px container</li>
</ol>

<h2>5. State Colocation</h2>
<p>One of the most underrated performance techniques: move state as close to where it's used as possible. Global state causes global re-renders.</p>

<pre><code class="language-jsx">// Bad: global store causes every subscriber to re-render
const useAppStore = create(set => ({ searchQuery: '', setSearch: q => set({ searchQuery: q }) }))

// Better: local state in the component that needs it
function SearchBar() {
  const [query, setQuery] = useState('')
  return &lt;input value={query} onChange={e => setQuery(e.target.value)} /&gt;
}</code></pre>

<h2>Conclusion</h2>
<p>React performance in 2026 is largely about <strong>doing less, not more</strong>. The React Compiler handles most memoization. Code splitting + lazy loading covers the rest for most apps. Only reach for virtualization and complex patterns when you have a measured, reproducible performance problem.</p>$BLOG2$,
  89, 22, 3,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '3 days'
) ON CONFLICT (slug) DO NOTHING;

-- ── SAMPLE POSTS ─────────────────────────────────────────────
INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count, created_at, updated_at)
VALUES (
  'dark-mode-design-tips',
  'Dark Mode Design: 5 Tips That Actually Work 🌙',
  $POST1$Just finished redesigning this portfolio's dark mode and learned a ton! Here are 5 things that made the biggest visual difference:

**1. Never use pure black (#000)**
Pure black creates harsh contrast. Use deep navy (#060f1e) or dark slate — much easier on the eyes.

**2. Surface hierarchy with subtle lightness steps**
Instead of borders everywhere, use slightly lighter backgrounds for cards and modals. Keep 3-4 surface levels (bg-base → bg-surface → bg-surface-2 → bg-surface-3).

**3. Desaturate your colors at night**
Bright saturated colors (#ff0000) are painful in dark mode. Shift to muted variants (#f87171) — your users' eyes will thank you.

**4. Glass morphism for floating elements**
Navbars, tooltips, and modals pop beautifully with `backdrop-filter: blur(14px)` + semi-transparent dark background.

**5. Test at 10% screen brightness**
Most designers test in bright rooms. Your users often browse at night in the dark. That 10% brightness test reveals contrast issues instantly.

What's your biggest dark mode challenge? Drop it below! 👇$POST1$,
  NULL,
  '[{"type":"image","url":"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=85","caption":"Dark mode code editor setup"},{"type":"image","url":"https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=900&q=85","caption":"Color palette comparison"}]'::jsonb,
  'other',
  ARRAY['design','darkmode','css','frontend','ux'],
  'Design',
  'published', 'public', 88, 34, 7,
  NOW() - INTERVAL '19 days',
  NOW() - INTERVAL '17 days'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count, created_at, updated_at)
VALUES (
  'supabase-vs-firebase-2026',
  'Supabase vs Firebase in 2026 — My Honest Take ⚖️',
  $POST2$After running this portfolio on **Firebase Auth + Supabase DB** for months, here's my honest comparison:

**Supabase wins on:**
- SQL power (joins, RLS, full PostgreSQL)
- Self-hostable (free forever if you need it)
- Realtime subscriptions are actually better
- Open source — no vendor lock-in

**Firebase wins on:**
- Authentication (Google/GitHub OAuth is smoother)
- Realtime DB speed for presence/notifications
- Hosting CDN performance
- Mobile SDK maturity

**My current setup:** Firebase for Auth + Realtime presence, Supabase for everything else. Best of both worlds — and both free tiers are generous enough for a portfolio.

**The real question:** Should I migrate fully to Supabase Auth? The Supabase Auth docs have improved massively in 2026. Might do it for v3.0...

What's your stack? Firebase team or Supabase team? 🔥$POST2$,
  NULL,
  '[{"type":"image","url":"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=85","caption":"Server infrastructure"},{"type":"image","url":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=85","caption":"Database design"},{"type":"image","url":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85","caption":"Performance metrics"}]'::jsonb,
  'other',
  ARRAY['supabase','firebase','backend','database','comparison'],
  'Tech',
  'published', 'public', 201, 67, 15,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '4 days'
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Firebase vs Supabase Auth Analysis
-- Current: Firebase Auth for authentication, Supabase for data.
-- Firebase Auth pros: battle-tested, great OAuth, fast.
-- Supabase Auth pros: integrated RLS (auth.uid() works natively),
--   no dual-SDK complexity, PostgreSQL-native foreign keys to users.
-- Recommendation: keep Firebase Auth for now (it is working, free),
--   consider migrating to Supabase Auth in v3.0 when admin panel is done.
-- Both free tiers are sufficient for this portfolio scale.
-- ============================================================
