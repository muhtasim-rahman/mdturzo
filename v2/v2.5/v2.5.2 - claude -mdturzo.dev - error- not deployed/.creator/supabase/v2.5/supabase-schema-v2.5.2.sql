-- ============================================================
-- supabase-schema-v2.5.2.sql
-- FULL SCHEMA REBUILD
-- All tables for mdturzo.web.app portfolio
-- Run this on a FRESH Supabase project (after deleting old tables)
-- Auth: Firebase Auth (UID stored as TEXT primary key in users table)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Drop old tables (except projects) ────────────────────────
-- Run these in order to avoid FK constraint errors:
DROP TABLE IF EXISTS review_likes CASCADE;
DROP TABLE IF EXISTS comment_likes CASCADE;
DROP TABLE IF EXISTS reposts CASCADE;
DROP TABLE IF EXISTS feed_saved CASCADE;
DROP TABLE IF EXISTS views_tracking CASCADE;
DROP TABLE IF EXISTS spam_tracking CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS subscribers CASCADE;
DROP TABLE IF EXISTS project_reviews CASCADE;
DROP TABLE IF EXISTS review_replies CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS page_visibility CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ─────────────────────────────────────────────────────────────
-- 1. USERS (mirrors Firebase Auth — uid is primary key)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE users (
  id           TEXT PRIMARY KEY,               -- Firebase UID
  email        TEXT,
  display_name TEXT,
  photo_url    TEXT,
  bio          TEXT,
  location     TEXT,
  website      TEXT,
  username     TEXT UNIQUE,
  is_verified  BOOLEAN  DEFAULT false,
  is_active    BOOLEAN  DEFAULT true,
  role         TEXT     DEFAULT 'user' CHECK (role IN ('user','admin','moderator')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  metadata     JSONB    DEFAULT '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 2. ADMINS (separate security table)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE admins (
  id          TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  added_at    TIMESTAMPTZ DEFAULT now(),
  added_by    TEXT,
  permissions JSONB DEFAULT '{"full": true}'
);

-- ─────────────────────────────────────────────────────────────
-- 3. PROJECTS (keep + enhance existing)
-- ─────────────────────────────────────────────────────────────
-- NOTE: projects table already exists, this just ensures all new columns exist
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS author_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reposts_count INT  DEFAULT 0,
  ADD COLUMN IF NOT EXISTS saves_count   INT  DEFAULT 0;

-- ─────────────────────────────────────────────────────────────
-- 4. BLOGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE blogs (
  id                UUID   DEFAULT gen_random_uuid() PRIMARY KEY,
  slug              TEXT   UNIQUE NOT NULL,
  title             TEXT   NOT NULL,
  short_description TEXT,
  content           TEXT,                      -- HTML from TipTap editor
  category          TEXT,
  tags              TEXT[] DEFAULT '{}',
  status            TEXT   DEFAULT 'draft'  CHECK (status  IN ('draft','published','archived')),
  visibility        TEXT   DEFAULT 'public' CHECK (visibility IN ('public','private','unlisted')),
  pinned            BOOLEAN  DEFAULT false,
  reading_time      INT      DEFAULT 1,
  thumbnail_url     TEXT,                      -- auto from content or manual
  cover_image_url   TEXT,
  og_title          TEXT,
  og_description    TEXT,
  og_image          TEXT,
  series            TEXT,
  author_id         TEXT REFERENCES users(id) ON DELETE SET NULL,
  views_count       INT  DEFAULT 0,
  likes_count       INT  DEFAULT 0,
  dislikes_count    INT  DEFAULT 0,
  comments_count    INT  DEFAULT 0,
  saves_count       INT  DEFAULT 0,
  reposts_count     INT  DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  published_at      TIMESTAMPTZ,
  metadata          JSONB DEFAULT '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 5. POSTS (social posts with markdown content + media)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE posts (
  id             UUID   DEFAULT gen_random_uuid() PRIMARY KEY,
  slug           TEXT   UNIQUE NOT NULL,
  title          TEXT,
  content        TEXT,                         -- Markdown text body
  embed_url      TEXT,                         -- Legacy single video URL (optional)
  media_items    JSONB  DEFAULT '[]',          -- [{type,url,thumbnail,caption}]
  platform       TEXT   DEFAULT 'other' CHECK (platform IN ('youtube','facebook','instagram','tiktok','other')),
  tags           TEXT[] DEFAULT '{}',
  category       TEXT,
  status         TEXT   DEFAULT 'draft'  CHECK (status  IN ('draft','published','archived')),
  visibility     TEXT   DEFAULT 'public' CHECK (visibility IN ('public','private','unlisted')),
  pinned         BOOLEAN  DEFAULT false,
  author_id      TEXT REFERENCES users(id) ON DELETE SET NULL,
  views_count    INT  DEFAULT 0,
  likes_count    INT  DEFAULT 0,
  dislikes_count INT  DEFAULT 0,
  comments_count INT  DEFAULT 0,
  saves_count    INT  DEFAULT 0,
  reposts_count  INT  DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now(),
  published_at   TIMESTAMPTZ,
  metadata       JSONB DEFAULT '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 6. LIKES (for projects, blogs, posts)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE likes (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('project','blog','post')),
  content_id   TEXT NOT NULL,                 -- UUID as text (flexible)
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type         TEXT NOT NULL CHECK (type IN ('like','dislike')),
  reaction     TEXT DEFAULT 'like' CHECK (reaction IN ('like','love','haha','wow','sad','angry')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- 7. COMMENTS (for blogs, posts, projects)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE comments (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type   TEXT NOT NULL CHECK (content_type IN ('blog','post','project')),
  content_id     TEXT NOT NULL,
  author_id      TEXT REFERENCES users(id) ON DELETE SET NULL,
  parent_id      UUID REFERENCES comments(id) ON DELETE CASCADE,
  body           TEXT NOT NULL CHECK (length(trim(body)) >= 1 AND length(body) <= 2000),
  is_anonymous   BOOLEAN DEFAULT false,
  anonymous_name TEXT,
  anonymous_email TEXT,
  device_info    JSONB DEFAULT '{}',
  is_deleted     BOOLEAN DEFAULT false,
  is_hidden      BOOLEAN DEFAULT false,
  likes_count    INT  DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 8. COMMENT_LIKES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE comment_likes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- 9. REPOSTS (reshares)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reposts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog','post','project')),
  content_id   TEXT NOT NULL,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note         TEXT,                           -- optional message
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- 10. FEED_SAVED (bookmarks for any content)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE feed_saved (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog','post','project')),
  content_id   TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- ─────────────────────────────────────────────────────────────
-- 11. VIEWS_TRACKING (deduplication: 3-day cooldown per viewer)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE views_tracking (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type     TEXT NOT NULL CHECK (content_type IN ('project','blog','post')),
  content_id       TEXT NOT NULL,
  viewer_key       TEXT NOT NULL,    -- Firebase UID (auth) or device hash (anon)
  is_authenticated BOOLEAN DEFAULT false,
  first_viewed_at  TIMESTAMPTZ DEFAULT now(),
  last_viewed_at   TIMESTAMPTZ DEFAULT now(),
  view_count       INT DEFAULT 1,
  UNIQUE(content_type, content_id, viewer_key)
);

-- ─────────────────────────────────────────────────────────────
-- 12. NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE notifications (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  sender_id    TEXT REFERENCES users(id) ON DELETE SET NULL,
  type         TEXT NOT NULL CHECK (type IN ('comment','like','repost','mention','system','admin')),
  title        TEXT NOT NULL,
  message      TEXT,
  link         TEXT,
  content_type TEXT,
  content_id   TEXT,
  is_read      BOOLEAN DEFAULT false,
  is_global    BOOLEAN DEFAULT false,      -- broadcast to all users
  created_at   TIMESTAMPTZ DEFAULT now(),
  expires_at   TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────
-- 13. REPORTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reports (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog','post','project','comment','user')),
  content_id   TEXT NOT NULL,
  reporter_id  TEXT REFERENCES users(id) ON DELETE SET NULL,
  reason       TEXT NOT NULL CHECK (reason IN ('spam','inappropriate','harassment','misinformation','copyright','other')),
  description  TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','resolved','dismissed')),
  device_info  JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT now(),
  resolved_at  TIMESTAMPTZ,
  resolved_by  TEXT
);

-- ─────────────────────────────────────────────────────────────
-- 14. SPAM_TRACKING
-- ─────────────────────────────────────────────────────────────
CREATE TABLE spam_tracking (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      TEXT REFERENCES users(id) ON DELETE CASCADE,
  device_hash  TEXT,
  ip_hash      TEXT,
  action_type  TEXT CHECK (action_type IN ('comment','like','report','repost')),
  action_count INT  DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT now(),
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 15. PROJECT_REVIEWS (detailed star reviews)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE project_reviews (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id     UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  reviewer_id    TEXT REFERENCES users(id) ON DELETE SET NULL,
  rating         INT  NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message        TEXT CHECK (length(message) <= 2000),
  is_anonymous   BOOLEAN DEFAULT false,
  anonymous_name TEXT,
  is_approved    BOOLEAN DEFAULT false,
  admin_reply    TEXT,
  device_info    JSONB DEFAULT '{}',
  likes_count    INT  DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 16. REVIEW_LIKES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE review_likes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id  UUID NOT NULL REFERENCES project_reviews(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- 17. REVIEWS (global testimonials shown on home page)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reviews (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_name    TEXT NOT NULL,
  reviewer_email   TEXT,
  reviewer_role    TEXT,
  reviewer_company TEXT,
  reviewer_avatar  TEXT,
  review_text      TEXT NOT NULL,
  rating           INT  CHECK (rating >= 1 AND rating <= 5),
  project_id       UUID REFERENCES projects(id) ON DELETE SET NULL,
  is_approved      BOOLEAN DEFAULT false,
  is_featured      BOOLEAN DEFAULT false,
  display_order    INT  DEFAULT 0,
  device_info      JSONB DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 18. SUBSCRIBERS (newsletter)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE subscribers (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email            TEXT UNIQUE NOT NULL,
  name             TEXT,
  is_active        BOOLEAN DEFAULT true,
  source           TEXT DEFAULT 'website',
  subscribed_at    TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at  TIMESTAMPTZ,
  device_info      JSONB DEFAULT '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 19. SITE_SETTINGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE site_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT now(),
  updated_by  TEXT
);

-- ─────────────────────────────────────────────────────────────
-- 20. PAGE_VISIBILITY
-- ─────────────────────────────────────────────────────────────
CREATE TABLE page_visibility (
  page       TEXT PRIMARY KEY,
  visible    BOOLEAN DEFAULT true,
  message    TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 21. PAGE_VIEWS (analytics)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE page_views (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page       TEXT NOT NULL,
  user_id    TEXT REFERENCES users(id) ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  referrer   TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═════════════════════════════════════════════════════════════
-- INDEXES
-- ═════════════════════════════════════════════════════════════

-- blogs
CREATE INDEX idx_blogs_slug       ON blogs(slug);
CREATE INDEX idx_blogs_status     ON blogs(status, visibility);
CREATE INDEX idx_blogs_category   ON blogs(category) WHERE status = 'published';
CREATE INDEX idx_blogs_tags       ON blogs USING GIN(tags);
CREATE INDEX idx_blogs_pinned     ON blogs(pinned) WHERE pinned = true;
CREATE INDEX idx_blogs_created    ON blogs(created_at DESC);
CREATE INDEX idx_blogs_views      ON blogs(views_count DESC);

-- posts
CREATE INDEX idx_posts_slug       ON posts(slug);
CREATE INDEX idx_posts_status     ON posts(status, visibility);
CREATE INDEX idx_posts_category   ON posts(category) WHERE status = 'published';
CREATE INDEX idx_posts_tags       ON posts USING GIN(tags);
CREATE INDEX idx_posts_created    ON posts(created_at DESC);
CREATE INDEX idx_posts_views      ON posts(views_count DESC);

-- likes
CREATE INDEX idx_likes_content    ON likes(content_type, content_id);
CREATE INDEX idx_likes_user       ON likes(user_id);

-- comments
CREATE INDEX idx_comments_content ON comments(content_type, content_id);
CREATE INDEX idx_comments_author  ON comments(author_id);
CREATE INDEX idx_comments_parent  ON comments(parent_id);
CREATE INDEX idx_comments_created ON comments(created_at DESC);

-- views_tracking
CREATE INDEX idx_views_content    ON views_tracking(content_type, content_id);
CREATE INDEX idx_views_viewer     ON views_tracking(viewer_key);
CREATE INDEX idx_views_last       ON views_tracking(last_viewed_at);

-- feed_saved
CREATE INDEX idx_saved_user       ON feed_saved(user_id);
CREATE INDEX idx_saved_content    ON feed_saved(content_type, content_id);

-- reposts
CREATE INDEX idx_reposts_content  ON reposts(content_type, content_id);
CREATE INDEX idx_reposts_user     ON reposts(user_id);

-- notifications
CREATE INDEX idx_notif_recipient  ON notifications(recipient_id, is_read);
CREATE INDEX idx_notif_created    ON notifications(created_at DESC);

-- reports
CREATE INDEX idx_reports_content  ON reports(content_type, content_id);
CREATE INDEX idx_reports_status   ON reports(status);

-- project_reviews
CREATE INDEX idx_pr_project       ON project_reviews(project_id);
CREATE INDEX idx_pr_reviewer      ON project_reviews(reviewer_id);
CREATE INDEX idx_pr_approved      ON project_reviews(is_approved);

-- ═════════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═════════════════════════════════════════════════════════════

-- ── track_content_view: dedup view counting (3-day cooldown) ──
CREATE OR REPLACE FUNCTION track_content_view(
  p_content_type TEXT,
  p_content_id   TEXT,
  p_viewer_key   TEXT,
  p_is_auth      BOOLEAN DEFAULT false
) RETURNS BOOLEAN AS $$
DECLARE
  v_last_viewed TIMESTAMPTZ;
  v_should_count BOOLEAN := false;
BEGIN
  SELECT last_viewed_at INTO v_last_viewed
  FROM views_tracking
  WHERE content_type = p_content_type
    AND content_id   = p_content_id
    AND viewer_key   = p_viewer_key;

  IF NOT FOUND THEN
    INSERT INTO views_tracking (content_type, content_id, viewer_key, is_authenticated)
    VALUES (p_content_type, p_content_id, p_viewer_key, p_is_auth);
    v_should_count := true;
  ELSIF now() - v_last_viewed > INTERVAL '3 days' THEN
    UPDATE views_tracking
    SET last_viewed_at = now(), view_count = view_count + 1
    WHERE content_type = p_content_type
      AND content_id   = p_content_id
      AND viewer_key   = p_viewer_key;
    v_should_count := true;
  END IF;

  IF v_should_count THEN
    IF p_content_type = 'blog' THEN
      UPDATE blogs SET views_count = views_count + 1
      WHERE id = p_content_id::UUID;
    ELSIF p_content_type = 'post' THEN
      UPDATE posts SET views_count = views_count + 1
      WHERE id = p_content_id::UUID;
    ELSIF p_content_type = 'project' THEN
      UPDATE projects SET views_count = views_count + 1
      WHERE id = p_content_id::UUID;
    END IF;
  END IF;

  RETURN v_should_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── increment_project_views (legacy fallback, no dedup) ───────
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects SET views_count = views_count + 1 WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── increment_blog_views (legacy fallback) ────────────────────
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blogs SET views_count = views_count + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── increment_post_views (legacy fallback) ────────────────────
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views_count = views_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── toggle_like ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_like(
  p_content_type TEXT,
  p_content_id   TEXT,
  p_user_id      TEXT,
  p_type         TEXT,       -- 'like' or 'dislike'
  p_reaction     TEXT DEFAULT 'like'
) RETURNS TEXT AS $$
DECLARE
  v_existing TEXT;
  v_result   TEXT;
BEGIN
  SELECT type INTO v_existing
  FROM likes
  WHERE content_type = p_content_type
    AND content_id   = p_content_id
    AND user_id      = p_user_id;

  IF NOT FOUND THEN
    -- New vote
    INSERT INTO likes(content_type, content_id, user_id, type, reaction)
    VALUES (p_content_type, p_content_id, p_user_id, p_type, p_reaction);
    v_result := p_type;

    -- Update counts
    IF p_type = 'like' THEN
      IF p_content_type = 'blog'    THEN UPDATE blogs    SET likes_count    = likes_count    + 1 WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'post'    THEN UPDATE posts    SET likes_count    = likes_count    + 1 WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'project' THEN UPDATE projects SET likes_count    = likes_count    + 1 WHERE id = p_content_id::UUID; END IF;
    ELSE
      IF p_content_type = 'blog'    THEN UPDATE blogs    SET dislikes_count = dislikes_count + 1 WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'post'    THEN UPDATE posts    SET dislikes_count = dislikes_count + 1 WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'project' THEN UPDATE projects SET dislikes_count = COALESCE(dislikes_count,0) + 1 WHERE id = p_content_id::UUID; END IF;
    END IF;

  ELSIF v_existing = p_type THEN
    -- Same vote → remove
    DELETE FROM likes
    WHERE content_type = p_content_type
      AND content_id   = p_content_id
      AND user_id      = p_user_id;
    v_result := 'removed';

    IF p_type = 'like' THEN
      IF p_content_type = 'blog'    THEN UPDATE blogs    SET likes_count    = GREATEST(0, likes_count    - 1) WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'post'    THEN UPDATE posts    SET likes_count    = GREATEST(0, likes_count    - 1) WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'project' THEN UPDATE projects SET likes_count    = GREATEST(0, likes_count    - 1) WHERE id = p_content_id::UUID; END IF;
    ELSE
      IF p_content_type = 'blog'    THEN UPDATE blogs    SET dislikes_count = GREATEST(0, dislikes_count - 1) WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'post'    THEN UPDATE posts    SET dislikes_count = GREATEST(0, dislikes_count - 1) WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'project' THEN UPDATE projects SET dislikes_count = GREATEST(0, COALESCE(dislikes_count,0) - 1) WHERE id = p_content_id::UUID; END IF;
    END IF;

  ELSE
    -- Switch vote (like→dislike or vice versa)
    UPDATE likes SET type = p_type, reaction = p_reaction
    WHERE content_type = p_content_type
      AND content_id   = p_content_id
      AND user_id      = p_user_id;
    v_result := p_type;

    IF p_type = 'like' THEN -- was dislike, now like
      IF p_content_type = 'blog'    THEN UPDATE blogs    SET likes_count = likes_count + 1, dislikes_count = GREATEST(0, dislikes_count - 1) WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'post'    THEN UPDATE posts    SET likes_count = likes_count + 1, dislikes_count = GREATEST(0, dislikes_count - 1) WHERE id = p_content_id::UUID; END IF;
    ELSE -- was like, now dislike
      IF p_content_type = 'blog'    THEN UPDATE blogs    SET dislikes_count = dislikes_count + 1, likes_count = GREATEST(0, likes_count - 1) WHERE id = p_content_id::UUID; END IF;
      IF p_content_type = 'post'    THEN UPDATE posts    SET dislikes_count = dislikes_count + 1, likes_count = GREATEST(0, likes_count - 1) WHERE id = p_content_id::UUID; END IF;
    END IF;
  END IF;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── toggle_repost ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_repost(
  p_content_type TEXT,
  p_content_id   TEXT,
  p_user_id      TEXT,
  p_note         TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE v_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM reposts WHERE content_type=p_content_type AND content_id=p_content_id AND user_id=p_user_id)
  INTO v_exists;

  IF v_exists THEN
    DELETE FROM reposts WHERE content_type=p_content_type AND content_id=p_content_id AND user_id=p_user_id;
    IF p_content_type='blog'    THEN UPDATE blogs    SET reposts_count=GREATEST(0,reposts_count-1) WHERE id=p_content_id::UUID; END IF;
    IF p_content_type='post'    THEN UPDATE posts    SET reposts_count=GREATEST(0,reposts_count-1) WHERE id=p_content_id::UUID; END IF;
    IF p_content_type='project' THEN UPDATE projects SET reposts_count=GREATEST(0,COALESCE(reposts_count,0)-1) WHERE id=p_content_id::UUID; END IF;
    RETURN false;
  ELSE
    INSERT INTO reposts(content_type,content_id,user_id,note) VALUES(p_content_type,p_content_id,p_user_id,p_note);
    IF p_content_type='blog'    THEN UPDATE blogs    SET reposts_count=reposts_count+1 WHERE id=p_content_id::UUID; END IF;
    IF p_content_type='post'    THEN UPDATE posts    SET reposts_count=reposts_count+1 WHERE id=p_content_id::UUID; END IF;
    IF p_content_type='project' THEN UPDATE projects SET reposts_count=COALESCE(reposts_count,0)+1 WHERE id=p_content_id::UUID; END IF;
    RETURN true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── toggle_comment_like ───────────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_comment_like(
  p_comment_id UUID,
  p_user_id    TEXT
) RETURNS BOOLEAN AS $$
DECLARE v_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM comment_likes WHERE comment_id=p_comment_id AND user_id=p_user_id)
  INTO v_exists;

  IF v_exists THEN
    DELETE FROM comment_likes WHERE comment_id=p_comment_id AND user_id=p_user_id;
    UPDATE comments SET likes_count = GREATEST(0, likes_count-1) WHERE id=p_comment_id;
    RETURN false;
  ELSE
    INSERT INTO comment_likes(comment_id, user_id) VALUES(p_comment_id, p_user_id);
    UPDATE comments SET likes_count = likes_count+1 WHERE id=p_comment_id;
    RETURN true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── toggle_review_like ────────────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_review_like(
  p_review_id UUID,
  p_user_id   TEXT
) RETURNS BOOLEAN AS $$
DECLARE v_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM review_likes WHERE review_id=p_review_id AND user_id=p_user_id)
  INTO v_exists;

  IF v_exists THEN
    DELETE FROM review_likes WHERE review_id=p_review_id AND user_id=p_user_id;
    UPDATE project_reviews SET likes_count=GREATEST(0,likes_count-1) WHERE id=p_review_id;
    RETURN false;
  ELSE
    INSERT INTO review_likes(review_id, user_id) VALUES(p_review_id, p_user_id);
    UPDATE project_reviews SET likes_count=likes_count+1 WHERE id=p_review_id;
    RETURN true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── update_comment_count (for blogs/posts/projects) ───────────
CREATE OR REPLACE FUNCTION update_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NOT NEW.is_deleted THEN
    IF NEW.content_type='blog'    THEN UPDATE blogs    SET comments_count=comments_count+1 WHERE id=NEW.content_id::UUID; END IF;
    IF NEW.content_type='post'    THEN UPDATE posts    SET comments_count=comments_count+1 WHERE id=NEW.content_id::UUID; END IF;
    IF NEW.content_type='project' THEN UPDATE projects SET comments_count=COALESCE(comments_count,0)+1 WHERE id=NEW.content_id::UUID; END IF;
  ELSIF TG_OP='UPDATE' AND NEW.is_deleted AND NOT OLD.is_deleted THEN
    IF NEW.content_type='blog'    THEN UPDATE blogs    SET comments_count=GREATEST(0,comments_count-1) WHERE id=NEW.content_id::UUID; END IF;
    IF NEW.content_type='post'    THEN UPDATE posts    SET comments_count=GREATEST(0,comments_count-1) WHERE id=NEW.content_id::UUID; END IF;
    IF NEW.content_type='project' THEN UPDATE projects SET comments_count=GREATEST(0,COALESCE(comments_count,0)-1) WHERE id=NEW.content_id::UUID; END IF;
  ELSIF TG_OP='DELETE' AND NOT OLD.is_deleted THEN
    IF OLD.content_type='blog'    THEN UPDATE blogs    SET comments_count=GREATEST(0,comments_count-1) WHERE id=OLD.content_id::UUID; END IF;
    IF OLD.content_type='post'    THEN UPDATE posts    SET comments_count=GREATEST(0,comments_count-1) WHERE id=OLD.content_id::UUID; END IF;
    IF OLD.content_type='project' THEN UPDATE projects SET comments_count=GREATEST(0,COALESCE(comments_count,0)-1) WHERE id=OLD.content_id::UUID; END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_comment_count
  AFTER INSERT OR UPDATE OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comment_count();

-- ── auto updated_at triggers ──────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_blogs_updated    BEFORE UPDATE ON blogs    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_posts_updated    BEFORE UPDATE ON posts    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_comments_updated BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_users_updated    BEFORE UPDATE ON users    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_pr_updated       BEFORE UPDATE ON project_reviews FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ═════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═════════════════════════════════════════════════════════════
-- NOTE: Firebase UID is passed via request header or app logic.
-- Since we use anon key on frontend, RLS is based on content visibility.
-- Admin operations use service role key (no RLS) via Cloudflare Worker.

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins         ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_saved     ENABLE ROW LEVEL SECURITY;
ALTER TABLE views_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports        ENABLE ROW LEVEL SECURITY;
ALTER TABLE spam_tracking  ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_likes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews        ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers    ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views     ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposts        ENABLE ROW LEVEL SECURITY;

-- ── Public read policies ──────────────────────────────────────
CREATE POLICY "Public read published blogs"   ON blogs    FOR SELECT USING (status='published' AND visibility='public');
CREATE POLICY "Public read published posts"   ON posts    FOR SELECT USING (status='published' AND visibility='public');
CREATE POLICY "Public read visible pages"     ON page_visibility FOR SELECT USING (true);
CREATE POLICY "Public read site settings"     ON site_settings   FOR SELECT USING (true);
CREATE POLICY "Public read approved reviews"  ON reviews         FOR SELECT USING (is_approved=true);
CREATE POLICY "Public read approved pr"       ON project_reviews FOR SELECT USING (is_approved=true);
CREATE POLICY "Public read users"             ON users           FOR SELECT USING (is_active=true);
CREATE POLICY "Public read comments"          ON comments        FOR SELECT USING (is_deleted=false AND is_hidden=false);
CREATE POLICY "Public read likes"             ON likes           FOR SELECT USING (true);
CREATE POLICY "Public read reposts"           ON reposts         FOR SELECT USING (true);
CREATE POLICY "Public read review_likes"      ON review_likes    FOR SELECT USING (true);
CREATE POLICY "Public read comment_likes"     ON comment_likes   FOR SELECT USING (true);

-- ── Anon insert policies (open actions) ──────────────────────
CREATE POLICY "Anyone can submit review"      ON reviews         FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can report"             ON reports         FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe"          ON subscribers     FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can track views"        ON views_tracking  FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can log page view"      ON page_views      FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can like"               ON likes           FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can comment"            ON comments        FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can repost"             ON reposts         FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can like comment"       ON comment_likes   FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can save feed"          ON feed_saved      FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can like review"        ON review_likes    FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can submit spam track"  ON spam_tracking   FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can add project review" ON project_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can upsert user"        ON users           FOR ALL   USING (true) WITH CHECK (true);

-- ── Notifications: own only ───────────────────────────────────
CREATE POLICY "Own notifications"             ON notifications   FOR SELECT USING (is_global=true OR recipient_id=current_setting('app.firebase_uid', true));
CREATE POLICY "Mark own read"                 ON notifications   FOR UPDATE USING (recipient_id=current_setting('app.firebase_uid', true));

-- ═════════════════════════════════════════════════════════════
-- SEED DATA
-- ═════════════════════════════════════════════════════════════

-- ── page_visibility defaults ──────────────────────────────────
INSERT INTO page_visibility (page, visible) VALUES
  ('home',     true),
  ('about',    true),
  ('projects', true),
  ('feed',     true),
  ('blogs',    true),
  ('posts',    true),
  ('contact',  true)
ON CONFLICT (page) DO NOTHING;

-- ── site_settings defaults ────────────────────────────────────
INSERT INTO site_settings (key, value, description) VALUES
  ('maintenance_mode',   '{"enabled": false, "message": "We are under maintenance. Back soon!"}', 'Global maintenance mode'),
  ('cookie_banner',      '{"enabled": true}', 'Cookie consent banner'),
  ('dev_banner',         '{"enabled": true, "message": "🚧 This site is under active development"}', 'Dev banner'),
  ('subscriber_count',   '{"count": 0}', 'Newsletter subscriber count')
ON CONFLICT (key) DO NOTHING;

-- ── 2 Advanced Sample Blogs ───────────────────────────────────
INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, content, thumbnail_url, cover_image_url)
VALUES (
  'mastering-react-hooks-2026',
  'Mastering React Hooks in 2026',
  'A deep dive into advanced React hooks patterns — custom hooks, performance optimization, and real-world use cases from building a production portfolio.',
  'Web Dev',
  ARRAY['react','hooks','javascript','performance','frontend'],
  'published', 'public', false, 7,
  '<h2>Why Hooks Changed Everything</h2>
<p>When React introduced hooks in v16.8, it fundamentally changed how we think about component logic. But in 2026, with React 19''s concurrent features and the explosion of custom hook libraries, mastering hooks isn''t just about knowing <code>useState</code> and <code>useEffect</code> — it''s about understanding the mental model behind them.</p>
<blockquote>Hooks let you use state and other React features without writing a class. But more importantly, they let you extract component logic into reusable functions.</blockquote>
<h2>The Hook Mental Model</h2>
<p>Think of hooks as <strong>subscriptions to a slice of React''s internal machine</strong>. Each hook call creates a "slot" in the component''s fiber node. The order of hook calls matters — that''s why hooks cannot be called conditionally.</p>
<h3>useState vs useReducer: When to Choose</h3>
<p>Most tutorials teach <code>useState</code> first, but for complex state transitions, <code>useReducer</code> is almost always better:</p>
<pre><code>// useState — good for simple values
const [count, setCount] = useState(0)

// useReducer — better for state machines
const [state, dispatch] = useReducer(reducer, initialState)</code></pre>
<p>Use <code>useReducer</code> when:</p>
<ul>
<li>State has multiple sub-values</li>
<li>Next state depends on previous state</li>
<li>You want to colocate state logic with the component</li>
</ul>
<h2>Custom Hooks: Composition Over Inheritance</h2>
<p>The real power of hooks is <strong>composition</strong>. Instead of HOCs or render props, we extract logic into custom hooks:</p>
<pre><code>function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return size
}</code></pre>
<h2>Performance Patterns</h2>
<p>Three hooks for performance that most developers underuse:</p>
<h3>useMemo — Expensive Computation</h3>
<p><code>useMemo</code> caches a computed value. Only use it when the computation is actually expensive (>1ms). Don''t premature-optimize with <code>useMemo</code> everywhere.</p>
<h3>useCallback — Stable References</h3>
<p>Returns a memoized callback. Critical when passing callbacks to children that are wrapped in <code>React.memo</code>.</p>
<h3>useTransition — Concurrent Features</h3>
<p>New in React 18, <code>useTransition</code> marks state updates as non-urgent, allowing React to interrupt them for higher-priority updates:</p>
<pre><code>const [isPending, startTransition] = useTransition()
startTransition(() => {
  setSearchResults(heavyFilter(data))
})</code></pre>
<h2>My Production Patterns</h2>
<p>After building this portfolio v2 with React 18 + Vite, here are the patterns I use daily:</p>
<ul>
<li><strong>useSiteSettings</strong> — global site config from Supabase, cached with Zustand</li>
<li><strong>useAuth</strong> — Firebase auth state synced to Zustand store</li>
<li><strong>usePageVisibility</strong> — checks if a page is enabled before rendering</li>
</ul>
<h2>Conclusion</h2>
<p>React hooks aren''t magic — they''re clever engineering that aligns with JavaScript''s functional programming strengths. The more you understand the internals (fiber nodes, reconciliation, scheduler), the better your custom hooks will be.</p>
<p>In my next post, I''ll cover <strong>React Server Components</strong> and how they change the hooks story entirely.</p>',
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80',
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1400&q=90'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, content, thumbnail_url, cover_image_url)
VALUES (
  'supabase-rls-complete-guide',
  'Supabase RLS: The Complete Security Guide',
  'Everything you need to know about Row Level Security in Supabase — from basic policies to advanced Firebase UID integration for full-stack SaaS apps.',
  'Backend',
  ARRAY['supabase','postgresql','rls','security','backend','database'],
  'published', 'public', false, 9,
  '<h2>What is Row Level Security?</h2>
<p>Row Level Security (RLS) is PostgreSQL''s built-in mechanism for enforcing access control at the database row level. Unlike traditional table-level permissions, RLS lets you define policies that control which rows each user can read, insert, update, or delete.</p>
<blockquote>RLS is your last line of defense. Even if your API is compromised, RLS ensures data can only be accessed according to your rules.</blockquote>
<h2>Why Supabase + RLS is Game-Changing</h2>
<p>Supabase exposes your PostgreSQL database directly via a REST API (PostgREST). This means <strong>your frontend can query the database directly</strong> — but only within the boundaries set by RLS policies. This removes the need for a traditional backend API layer for most CRUD operations.</p>
<h2>The Anon Key vs Service Role Key</h2>
<p>Supabase gives you two API keys:</p>
<ul>
<li><strong>Anon key</strong> — Public, safe in frontend. Subject to RLS policies.</li>
<li><strong>Service role key</strong> — Admin, bypasses ALL RLS. NEVER expose in frontend.</li>
</ul>
<pre><code>-- Using anon key: RLS applies
const { data } = await supabase.from("blogs").select("*")
// Only returns rows where RLS SELECT policy passes

-- Using service key (in Cloudflare Worker only)
const adminClient = createClient(url, serviceKey)
const { data } = await adminClient.from("blogs").select("*")
// Returns ALL rows, no RLS</code></pre>
<h2>Writing Your First Policy</h2>
<p>Every RLS policy has four components: table, operation (SELECT/INSERT/UPDATE/DELETE), role, and a USING/WITH CHECK expression.</p>
<pre><code>-- Allow anyone to read published blogs
CREATE POLICY "Public read published blogs"
ON blogs
FOR SELECT
USING (status = ''published'' AND visibility = ''public'');

-- Only allow users to delete their own comments
CREATE POLICY "Delete own comments"
ON comments
FOR DELETE
USING (author_id = current_setting(''app.firebase_uid'', true));</code></pre>
<h2>Firebase UID Integration</h2>
<p>Since this portfolio uses Firebase Auth (not Supabase Auth), we can''t use <code>auth.uid()</code> in policies. Instead, we pass the Firebase UID as a custom setting:</p>
<pre><code>// In the React app, set Firebase UID for each request
const supabase = createClient(url, anonKey, {
  global: {
    headers: { ''x-firebase-uid'': user.uid }
  }
})

// In SQL policy:
USING (author_id = current_setting(''request.headers'')::json->>''x-firebase-uid'')</code></pre>
<h2>Common Patterns</h2>
<h3>Public Content</h3>
<pre><code>CREATE POLICY "public read"
ON posts FOR SELECT
USING (status=''published'' AND visibility=''public'');</code></pre>
<h3>Own-access Only</h3>
<pre><code>CREATE POLICY "own saved items"
ON feed_saved FOR ALL
USING (user_id = current_setting(''app.firebase_uid'', true));</code></pre>
<h3>Admin Override</h3>
<p>For admin operations, use the service role key (Cloudflare Worker) — it bypasses all RLS automatically. No need for special admin policies on most tables.</p>
<h2>Performance Considerations</h2>
<p>RLS policies add overhead to every query. To minimize this:</p>
<ul>
<li>Add indexes on columns used in policy expressions</li>
<li>Keep policies simple — avoid JOINs in policy expressions</li>
<li>Use <code>SECURITY DEFINER</code> functions for complex checks</li>
</ul>
<h2>My Setup Summary</h2>
<p>For this portfolio, my RLS strategy is:</p>
<ul>
<li>All public content (blogs, posts, projects) — open SELECT for published</li>
<li>Social interactions (likes, comments, saves) — open INSERT/DELETE using anon key + JS-side validation</li>
<li>Admin operations (create/edit/delete content) — Cloudflare Worker with service role key</li>
</ul>
<p>This setup is simple, secure, and scales well for a personal portfolio.</p>',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=90'
) ON CONFLICT (slug) DO NOTHING;

-- ── 2 Advanced Sample Posts ───────────────────────────────────
INSERT INTO posts (slug, title, content, media_items, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'building-my-dev-workflow-2026',
  'My Development Workflow in 2026 🔧',
  '**Just finished refactoring my entire dev setup** and it feels incredible to work in now.

Here''s what changed:

**Terminal:** Switched from iTerm2 to Warp — AI autocomplete is genuinely useful, not gimmicky. The block-based interface makes it way easier to share command output.

**Editor:** Still VS Code but with a bunch of new extensions. The GitHub Copilot integration has gotten scary good. I now write maybe 30% less boilerplate manually.

**Version Control:** Been using commitizen for structured commit messages. When you have a context file like mine tracking 50+ commits, clean messages are *essential*.

**Build Pipeline:**
- React 18 + Vite (still the GOAT for SPAs)
- Tailwind CSS with a custom design token system
- Supabase for DB + API (no Express needed for basic CRUD)
- Firebase Hosting + Cloudflare Workers for edge functions

The biggest improvement? **Stopping context-switching.** I now keep a `TASKS.md` file in every project with today''s focus. When my brain wanders, I look at that file. Game changer.

What''s your dev setup like? I''d love to see screenshots 👇',
  '[
    {"type":"image","url":"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85","caption":"VS Code setup with Dracula theme"},
    {"type":"image","url":"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=85","caption":"Terminal workflow"},
    {"type":"image","url":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85","caption":"Laptop on desk"}
  ]'::jsonb,
  ARRAY['devsetup','vscode','workflow','webdev','productivity'],
  'Tech', 'published', 'public', 234, 67, 14
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'dark-mode-design-tips',
  'Dark Mode Design Tips That Actually Work 🌙',
  'Dark mode is **not** just inverting colors. After spending months building mdturzo.web.app in dark mode, here are the real lessons:

**1. Never use pure black (#000000)**
Use very dark blues like `#060f1e` — they''re easier on the eyes and feel more premium. Pure black creates harsh contrast.

**2. Layered surfaces, not one flat dark**
Real depth comes from surface hierarchy:
- Page bg: `#060f1e`  
- Card surface: `#0d1929`
- Elevated surface: `#111f35`
- Border: `rgba(255,255,255,0.06)`

**3. Reduce saturation on text**
Primary text: `rgba(255,255,255,0.92)` not `#ffffff`
Secondary: `rgba(255,255,255,0.58)`
Tertiary: `rgba(255,255,255,0.35)`

**4. Accent colors need adjustment**
Your light-mode blue (#3B82F6) might be too bright in dark mode. Slightly desaturate and lighten for dark backgrounds.

**5. Shadows work differently**
In dark mode, shadows don''t work — nobody can see darkness on darkness. Use *glows* instead. `box-shadow: 0 0 20px rgba(99,102,241,0.15)` creates beautiful depth.

**6. Test your dark mode in actual darkness**
I test at night with all lights off. You''d be surprised what "looks fine" at noon fails at midnight.

What dark mode mistakes have you seen (or made)? 👀',
  'https://www.youtube.com/watch?v=7mMBRiQVSGA',
  '[
    {"type":"youtube","url":"https://www.youtube.com/watch?v=7mMBRiQVSGA","thumbnail":"https://img.youtube.com/vi/7mMBRiQVSGA/maxresdefault.jpg","caption":"Dark Mode Design Deep Dive"}
  ]'::jsonb,
  'youtube',
  ARRAY['darkmode','design','css','ui','frontend','tips'],
  'Design', 'published', 'public', 512, 143, 27
) ON CONFLICT (slug) DO NOTHING;
