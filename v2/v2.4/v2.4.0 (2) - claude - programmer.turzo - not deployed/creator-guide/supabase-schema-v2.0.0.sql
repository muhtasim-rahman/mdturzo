-- ============================================================
-- MDTURZO PORTFOLIO — Supabase SQL Schema v2.0.0
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ── Extensions ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── USERS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id               TEXT PRIMARY KEY,              -- Firebase UID
  username         TEXT UNIQUE,
  display_name     TEXT,
  email            TEXT,
  bio              TEXT CHECK (length(bio) <= 100),
  description      TEXT CHECK (length(description) <= 500),
  web_url          TEXT,
  photo_url        TEXT,
  banner_url       TEXT,
  location_city    TEXT,
  location_country TEXT,
  social_links     JSONB    DEFAULT '[]',         -- [{platform, url}] max 5
  visibility       JSONB    DEFAULT '{}',
  is_email_verified BOOLEAN DEFAULT false,
  is_banned        BOOLEAN  DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT now(),
  last_seen        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS usernames (
  username TEXT PRIMARY KEY,
  user_id  TEXT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
  id       TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email    TEXT UNIQUE NOT NULL,
  added_at TIMESTAMPTZ DEFAULT now()
);

-- ── CONTENT ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id                UUID   PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT   UNIQUE NOT NULL,
  title             TEXT   NOT NULL,
  short_description TEXT,
  thumbnail_url     TEXT,
  github_link       TEXT,
  live_link         TEXT,
  pdf_link          TEXT,
  custom_link       TEXT,
  tags              TEXT[] DEFAULT '{}',
  category          TEXT,
  content           TEXT,
  status            TEXT   DEFAULT 'draft',       -- published/draft/hidden
  visibility        TEXT   DEFAULT 'public',      -- public/signed-in/private
  is_featured       BOOLEAN DEFAULT false,
  featured_order    INT,
  seo_title         TEXT,
  seo_description   TEXT,
  views_count       INT    DEFAULT 0,
  likes_count       INT    DEFAULT 0,
  dislikes_count    INT    DEFAULT 0,
  comments_count    INT    DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- Feed table = Blogs + Posts combined (per master prompt)
CREATE TABLE IF NOT EXISTS feed (
  id                UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  type              TEXT    NOT NULL CHECK (type IN ('blog', 'post')),
  slug              TEXT    UNIQUE NOT NULL,
  title             TEXT    NOT NULL,
  short_description TEXT,
  thumbnail_url     TEXT,

  -- Blog-specific
  cover_image_url   TEXT,
  content           TEXT,
  author_name       TEXT    DEFAULT 'Muhtasim Rahman',
  reading_time      INT,
  pinned            BOOLEAN DEFAULT false,
  series            TEXT,

  -- Post (video)-specific
  embed_url         TEXT,
  platform          TEXT,                         -- youtube/facebook/other

  -- Common
  tags              TEXT[]  DEFAULT '{}',
  category          TEXT,
  status            TEXT    DEFAULT 'draft',      -- published/draft/hidden
  visibility        TEXT    DEFAULT 'public',     -- public/signed-in/private
  seo_title         TEXT,
  seo_description   TEXT,
  views_count       INT     DEFAULT 0,
  likes_count       INT     DEFAULT 0,
  dislikes_count    INT     DEFAULT 0,
  comments_count    INT     DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- ── INTERACTIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id           UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT  NOT NULL,                    -- project/feed
  content_id   UUID  NOT NULL,
  content_slug TEXT  NOT NULL,
  user_id      TEXT  REFERENCES users(id) ON DELETE SET NULL,
  text         TEXT  NOT NULL CHECK (length(text) <= 1000),
  status       TEXT  DEFAULT 'pending',           -- pending/approved/flagged
  device_info  JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS likes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id   UUID NOT NULL,
  user_id      TEXT REFERENCES users(id) ON DELETE CASCADE,
  type         TEXT NOT NULL CHECK (type IN ('like', 'dislike')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_id, user_id)
);

CREATE TABLE IF NOT EXISTS reports (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id   UUID NOT NULL,
  reporter_id  TEXT REFERENCES users(id) ON DELETE SET NULL,
  reason       TEXT NOT NULL,
  description  TEXT,
  status       TEXT DEFAULT 'pending',            -- pending/reviewed/dismissed
  device_info  JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id             UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        TEXT    REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  rating         INT     CHECK (rating >= 1 AND rating <= 5),
  text           TEXT,
  image_urls     TEXT[]  DEFAULT '{}',
  status         TEXT    DEFAULT 'pending',       -- pending/approved/rejected
  verified_badge BOOLEAN DEFAULT false,
  device_info    JSONB   DEFAULT '{}',
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT    NOT NULL,                   -- general/bug/question
  name        TEXT,
  email       TEXT,
  subject     TEXT,
  content     TEXT    NOT NULL,
  image_urls  TEXT[]  DEFAULT '{}',
  user_id     TEXT,
  device_info JSONB   DEFAULT '{}',               -- browser, OS, IP, city, country
  status      TEXT    DEFAULT 'unread',           -- unread/read
  starred     BOOLEAN DEFAULT false,
  email_sent  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── USER SYSTEM ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  icon        TEXT NOT NULL,                      -- FA class: "fa-solid fa-crown"
  color       TEXT NOT NULL,                      -- hex: "#f59e0b"
  description TEXT,
  type        TEXT NOT NULL CHECK (type IN ('account', 'earned'))
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id     TEXT REFERENCES users(id) ON DELETE CASCADE,
  badge_id    UUID REFERENCES badges(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

-- ── NOTIFICATIONS (Supabase — backup, RTDB is primary) ───
-- Firebase RTDB is primary for notifications.
-- This table is used for admin history / analytics only.
CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  type       TEXT,
  target     TEXT DEFAULT 'all',                  -- all/signed-in/specific
  target_uid TEXT,
  link       TEXT,
  expires_at TIMESTAMPTZ,
  active     BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notification_reads (
  user_id         TEXT REFERENCES users(id) ON DELETE CASCADE,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  read_at         TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, notification_id)
);

-- ── SYSTEM ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT,
  action      TEXT NOT NULL,
  details     JSONB DEFAULT '{}',
  device_info JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Initial settings
INSERT INTO site_settings (key, value) VALUES
  ('stats_years_dev',       '"3"'),
  ('stats_years_design',    '"6"'),
  ('stats_projects',        '"16"'),
  ('available_for_work',    'true'),
  ('cv_url',                '""'),
  ('cv_enabled',            'true'),
  ('cookie_banner',         'true'),
  ('maintenance',           'false'),
  ('comment_auto_approve',  'false')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS page_visibility (
  page       TEXT PRIMARY KEY,
  visibility TEXT DEFAULT 'public'                -- public/signed-in/private
);

INSERT INTO page_visibility (page) VALUES
  ('about'), ('projects'), ('blogs'), ('posts'), ('contact')
ON CONFLICT (page) DO NOTHING;

CREATE TABLE IF NOT EXISTS spam_tracking (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  action     TEXT,                                -- contact/comment/signup
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analytics (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page       TEXT,
  event      TEXT,
  user_id    TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── INDEXES ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_status_visibility ON projects(status, visibility);
CREATE INDEX IF NOT EXISTS idx_projects_featured          ON projects(is_featured, featured_order) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_feed_type_status           ON feed(type, status, visibility);
CREATE INDEX IF NOT EXISTS idx_feed_slug                  ON feed(slug);
CREATE INDEX IF NOT EXISTS idx_comments_content           ON comments(content_type, content_id, status);
CREATE INDEX IF NOT EXISTS idx_comments_user              ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_content              ON likes(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_spam_ip_action             ON spam_tracking(ip_address, action, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page             ON analytics(page, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user         ON activity_logs(user_id, created_at);

-- ── ROW LEVEL SECURITY ────────────────────────────────────

-- Admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins
    WHERE id = (SELECT auth.uid()::text)
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- USERS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read non-banned"  ON users;
DROP POLICY IF EXISTS "Own full access"          ON users;
CREATE POLICY "Public read non-banned" ON users FOR SELECT
  USING (NOT is_banned);
CREATE POLICY "Own full access"        ON users FOR ALL
  USING (auth.uid()::text = id);

-- USERNAMES
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read"    ON usernames;
DROP POLICY IF EXISTS "Own write"      ON usernames;
CREATE POLICY "Public read" ON usernames FOR SELECT USING (true);
CREATE POLICY "Own write"   ON usernames FOR ALL
  USING (auth.uid()::text = user_id);

-- ADMINS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin self read" ON admins;
DROP POLICY IF EXISTS "Admin full"      ON admins;
CREATE POLICY "Admin self read" ON admins FOR SELECT
  USING (auth.uid()::text = id);
CREATE POLICY "Admin full"      ON admins FOR ALL USING (is_admin());

-- PROJECTS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public published"    ON projects;
DROP POLICY IF EXISTS "Signed-in projects"  ON projects;
DROP POLICY IF EXISTS "Admin full projects" ON projects;
CREATE POLICY "Public published"   ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'public');
CREATE POLICY "Signed-in projects" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin full projects" ON projects FOR ALL USING (is_admin());

-- FEED
ALTER TABLE feed ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public feed"    ON feed;
DROP POLICY IF EXISTS "Signed-in feed" ON feed;
DROP POLICY IF EXISTS "Admin full feed" ON feed;
CREATE POLICY "Public feed"     ON feed FOR SELECT
  USING (status = 'published' AND visibility = 'public');
CREATE POLICY "Signed-in feed"  ON feed FOR SELECT
  USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin full feed" ON feed FOR ALL USING (is_admin());

-- COMMENTS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Read approved"    ON comments;
DROP POLICY IF EXISTS "Own insert"       ON comments;
DROP POLICY IF EXISTS "Own update"       ON comments;
DROP POLICY IF EXISTS "Admin full comments" ON comments;
CREATE POLICY "Read approved"      ON comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Own insert"         ON comments FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Own update"         ON comments FOR UPDATE
  USING (auth.uid()::text = user_id);
CREATE POLICY "Admin full comments" ON comments FOR ALL USING (is_admin());

-- LIKES
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Read all likes" ON likes;
DROP POLICY IF EXISTS "Own like"       ON likes;
CREATE POLICY "Read all likes" ON likes FOR SELECT USING (true);
CREATE POLICY "Own like"       ON likes FOR ALL
  USING (auth.uid()::text = user_id);

-- REPORTS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone report"  ON reports;
DROP POLICY IF EXISTS "Admin reports"  ON reports;
CREATE POLICY "Anyone report" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reports" ON reports FOR ALL USING (is_admin());

-- REVIEWS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Own review"            ON reviews;
DROP POLICY IF EXISTS "Admin reviews"         ON reviews;
CREATE POLICY "Read approved reviews" ON reviews FOR SELECT
  USING (status = 'approved');
CREATE POLICY "Own review"            ON reviews FOR ALL
  USING (auth.uid()::text = user_id);
CREATE POLICY "Admin reviews"         ON reviews FOR ALL USING (is_admin());

-- MESSAGES
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone insert message" ON messages;
DROP POLICY IF EXISTS "Admin messages"        ON messages;
CREATE POLICY "Anyone insert message" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin messages"        ON messages FOR ALL USING (is_admin());

-- BADGES
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read badges" ON badges;
DROP POLICY IF EXISTS "Admin badges"       ON badges;
CREATE POLICY "Public read badges" ON badges FOR SELECT USING (true);
CREATE POLICY "Admin badges"       ON badges FOR ALL USING (is_admin());

-- USER_BADGES
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read user_badges" ON user_badges;
DROP POLICY IF EXISTS "Admin user_badges"       ON user_badges;
CREATE POLICY "Public read user_badges" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Admin user_badges"       ON user_badges FOR ALL USING (is_admin());

-- NOTIFICATIONS (Supabase table)
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Signed-in read notifs" ON notifications;
DROP POLICY IF EXISTS "Admin notifs"          ON notifications;
CREATE POLICY "Signed-in read notifs" ON notifications FOR SELECT
  USING (auth.uid() IS NOT NULL AND active = true);
CREATE POLICY "Admin notifs"          ON notifications FOR ALL USING (is_admin());

-- NOTIFICATION_READS
ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Own reads" ON notification_reads;
CREATE POLICY "Own reads" ON notification_reads FOR ALL
  USING (auth.uid()::text = user_id);

-- ACTIVITY_LOGS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone insert log"  ON activity_logs;
DROP POLICY IF EXISTS "Admin logs"         ON activity_logs;
CREATE POLICY "Anyone insert log" ON activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin logs"        ON activity_logs FOR SELECT USING (is_admin());

-- SITE_SETTINGS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone read settings" ON site_settings;
DROP POLICY IF EXISTS "Admin settings"       ON site_settings;
CREATE POLICY "Anyone read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin settings"       ON site_settings FOR ALL USING (is_admin());

-- PAGE_VISIBILITY
ALTER TABLE page_visibility ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone read visibility" ON page_visibility;
DROP POLICY IF EXISTS "Admin visibility"       ON page_visibility;
CREATE POLICY "Anyone read visibility" ON page_visibility FOR SELECT USING (true);
CREATE POLICY "Admin visibility"       ON page_visibility FOR ALL USING (is_admin());

-- SPAM_TRACKING
ALTER TABLE spam_tracking ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone insert spam" ON spam_tracking;
DROP POLICY IF EXISTS "Admin spam"         ON spam_tracking;
CREATE POLICY "Anyone insert spam" ON spam_tracking FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin spam"         ON spam_tracking FOR ALL USING (is_admin());

-- ANALYTICS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone insert analytics" ON analytics;
DROP POLICY IF EXISTS "Admin analytics"         ON analytics;
CREATE POLICY "Anyone insert analytics" ON analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin analytics"         ON analytics FOR SELECT USING (is_admin());

-- ============================================================
-- DONE! All tables, indexes, and RLS policies created.
-- Next step: Firebase Console → RTDB → Rules → paste firebase-rtdb-rules.json
-- ============================================================
