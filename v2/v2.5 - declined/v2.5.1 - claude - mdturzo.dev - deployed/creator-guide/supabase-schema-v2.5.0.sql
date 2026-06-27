-- ============================================================
-- supabase-schema-v2.5.0.sql
-- Changes from v2.4.8:
--   1. blogs  — NEW table (full blog articles, TipTap HTML content)
--   2. posts  — NEW table (video embed posts: YouTube/Facebook/other)
--   3. feed_saved — NEW table (users can bookmark feed items)
--   4. Helper functions: increment_blog_views, increment_post_views
-- All tables: public SELECT for published/public, admin full access
-- ============================================================

-- ── 0. HELPER ────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. BLOGS ─────────────────────────────────────────────────
-- Full blog articles with rich TipTap HTML content
CREATE TABLE IF NOT EXISTS blogs (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT        UNIQUE NOT NULL,
  title             TEXT        NOT NULL,
  short_description TEXT,
  thumbnail_url     TEXT,
  cover_image_url   TEXT,
  content           TEXT,                         -- TipTap HTML
  reading_time      INT,                          -- auto: ceil(word_count / 200)
  category          TEXT,
  series            TEXT,
  tags              TEXT[]      DEFAULT '{}',
  status            TEXT        DEFAULT 'draft',  -- published | draft | hidden
  visibility        TEXT        DEFAULT 'public', -- public | signed-in | private
  pinned            BOOLEAN     DEFAULT false,
  seo_title         TEXT,
  seo_description   TEXT,
  views_count       INT         DEFAULT 0,
  likes_count       INT         DEFAULT 0,
  dislikes_count    INT         DEFAULT 0,
  comments_count    INT         DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_blogs"  ON blogs;
DROP POLICY IF EXISTS "admin_all_blogs" ON blogs;
CREATE POLICY "pub_read_blogs"  ON blogs FOR SELECT
  USING (status = 'published' AND visibility = 'public');
CREATE POLICY "admin_all_blogs" ON blogs FOR ALL USING (is_admin());

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blogs_updated_at ON blogs;
CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── 2. POSTS ─────────────────────────────────────────────────
-- Video embed posts (YouTube / Facebook / other platforms)
CREATE TABLE IF NOT EXISTS posts (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT        UNIQUE NOT NULL,
  title          TEXT        NOT NULL,
  description    TEXT,
  embed_url      TEXT        NOT NULL,             -- raw video URL
  platform       TEXT,                             -- youtube | facebook | other
  thumbnail_url  TEXT,
  tags           TEXT[]      DEFAULT '{}',
  category       TEXT,
  status         TEXT        DEFAULT 'draft',      -- published | draft | hidden
  visibility     TEXT        DEFAULT 'public',     -- public | signed-in | private
  views_count    INT         DEFAULT 0,
  likes_count    INT         DEFAULT 0,
  dislikes_count INT         DEFAULT 0,
  comments_count INT         DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_posts"  ON posts;
DROP POLICY IF EXISTS "admin_all_posts" ON posts;
CREATE POLICY "pub_read_posts"  ON posts FOR SELECT
  USING (status = 'published' AND visibility = 'public');
CREATE POLICY "admin_all_posts" ON posts FOR ALL USING (is_admin());

DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── 3. FEED SAVED (bookmarks) ────────────────────────────────
-- Users can bookmark any feed item (blog or post)
CREATE TABLE IF NOT EXISTS feed_saved (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT        REFERENCES users(id) ON DELETE CASCADE,
  content_type TEXT        NOT NULL CHECK (content_type IN ('blog', 'post')),
  content_id   UUID        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

ALTER TABLE feed_saved ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "own_feed_saved" ON feed_saved;
CREATE POLICY "own_feed_saved" ON feed_saved FOR ALL
  USING (auth.uid()::text = user_id);

-- ── 4. VIEW INCREMENT FUNCTIONS ──────────────────────────────
-- Safe atomic increment (avoids race conditions)

CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blogs SET views_count = views_count + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views_count = views_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 5. PAGE VISIBILITY — add feed, blogs, posts pages ────────
INSERT INTO page_visibility (page) VALUES
  ('feed'), ('blogs'), ('posts')
ON CONFLICT DO NOTHING;

-- ── 6. SEED DATA (optional — remove for production) ──────────
-- Sample blog post
INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, content) VALUES
  (
    'welcome-to-my-blog',
    'Welcome to My Blog',
    'This is the first post on my new portfolio website. I write about web development, design, and my journey as a self-taught developer.',
    'Personal',
    ARRAY['welcome', 'intro', 'web-dev'],
    'published',
    'public',
    true,
    2,
    '<h2>Hello, World!</h2><p>Welcome to my blog. I am Muhtasim Rahman (Turzo), a self-taught web developer from Bangladesh. I will be sharing my journey, projects, and learnings here.</p><h2>What to Expect</h2><p>I plan to write about web development tips, project breakdowns, design insights, and my personal growth as a developer.</p>'
  )
ON CONFLICT DO NOTHING;
