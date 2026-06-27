-- ============================================================
-- SUPABASE MIGRATION — v2.4.2
-- Complete projects table rebuild with 50+ rich columns
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ⚠️  WARNING: Drops and recreates the projects table.
--     Export existing data first if needed.
-- ============================================================

-- 1. Drop old table cleanly
DROP INDEX IF EXISTS idx_projects_status_visibility;
DROP INDEX IF EXISTS idx_projects_featured;
DROP INDEX IF EXISTS idx_projects_slug;
DROP TABLE IF EXISTS projects CASCADE;

-- 2. Create new projects table with 50+ columns
CREATE TABLE projects (

  -- ── Core Identity ─────────────────────────────────────────────
  id                    UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  TEXT         UNIQUE NOT NULL,          -- URL-friendly identifier (e.g. "qr-prism")
  title                 TEXT         NOT NULL,                 -- Full display title
  short_name            TEXT,                                  -- Short abbreviation (e.g. "QR Prism")

  -- ── Content ───────────────────────────────────────────────────
  tagline               TEXT,                                  -- One-line hook (e.g. "Generate, Scan, and Manage QR Codes")
  short_description     TEXT,                                  -- 1-2 sentence summary (shown on cards)
  detailed_description  TEXT,                                  -- Long plain-text description (markdown ok)
  content               TEXT,                                  -- Rich HTML (TipTap) for full detail page

  -- ── Media ─────────────────────────────────────────────────────
  thumbnail_url         TEXT,                                  -- Card thumbnail (recommended: 1280×720)
  banner_url            TEXT,                                  -- Wide hero banner image (optional)
  preview_gif_url       TEXT,                                  -- Animated preview GIF (optional)
  og_image_url          TEXT,                                  -- Override OG/meta preview image (falls back to thumbnail)
  screenshots           TEXT[]       DEFAULT '{}',            -- Array of screenshot URLs (gallery)

  -- ── Links ─────────────────────────────────────────────────────
  github_link           TEXT,
  live_link             TEXT,
  pdf_link              TEXT,
  custom_link           TEXT,
  demo_link             TEXT,                                  -- Interactive demo (CodePen, StackBlitz, etc.)

  -- ── Classification ────────────────────────────────────────────
  category              TEXT,                                  -- Primary category (Web App, Dev Tool, Education…)
  subcategory           TEXT,                                  -- More specific grouping
  type                  TEXT,                                  -- Technical type (PWA, Library, Website, Component…)
  tags                  TEXT[]       DEFAULT '{}',            -- Keyword tags for search/filter

  -- ── Status & Visibility ───────────────────────────────────────
  status                TEXT         DEFAULT 'draft',         -- published | draft | hidden
  visibility            TEXT         DEFAULT 'public',        -- public | signed-in | private
  development_status    TEXT,                                  -- Active Development | Completed | Archived | Beta | Discontinued

  -- ── Featured ──────────────────────────────────────────────────
  is_featured           BOOLEAN      DEFAULT false,
  featured_order        INT,                                   -- 1-6, lower = displayed first on home
  sort_order            INT          DEFAULT 0,               -- Manual sort override for projects page

  -- ── Technical Details ─────────────────────────────────────────
  languages             TEXT[]       DEFAULT '{}',            -- ["JavaScript", "HTML5", "CSS3"]
  tech_stack            JSONB        DEFAULT '{}',            -- {"Frontend": ["React"], "Backend": ["Firebase"]}
                                                              -- OR flat array: ["React", "Tailwind"]
  key_features          TEXT[]       DEFAULT '{}',            -- Short feature bullet strings
  dependencies          TEXT[]       DEFAULT '{}',            -- npm/pip packages, external libraries
  platform              TEXT,                                  -- "Web (PWA)", "Cross-platform", "Mobile-first"

  -- ── Project Metadata ──────────────────────────────────────────
  version               TEXT,                                  -- Current version string (e.g. "v3.4", "v1.4.5")
  start_date            DATE,
  end_date              DATE,                                  -- NULL if still active
  project_timeline      TEXT,                                  -- Human-readable summary (e.g. "Started 2023, v3.4 (2024)")
  complexity_level      TEXT,                                  -- Beginner | Intermediate | Advanced | Expert
  team_size             INT          DEFAULT 1,
  role                  TEXT,                                  -- "Solo Developer", "Lead Frontend Developer"
  license               TEXT,                                  -- "MIT", "Private", "CC BY 4.0"
  is_open_source        BOOLEAN      DEFAULT false,

  -- ── SEO ───────────────────────────────────────────────────────
  seo_title             TEXT,
  seo_description       TEXT,
  seo_keywords          TEXT[]       DEFAULT '{}',

  -- ── Extra / Rich Data ─────────────────────────────────────────
  notes                 TEXT,                                  -- Internal developer notes or fun facts
  awards                JSONB        DEFAULT '[]',            -- [{"title": "...", "issuer": "...", "year": 2024}]
  changelog             JSONB        DEFAULT '[]',            -- [{"version": "v2.0", "date": "2024-01", "changes": ["..."]}]
  related_slugs         TEXT[]       DEFAULT '{}',            -- Manual related project overrides
  meta_data             JSONB        DEFAULT '{}',            -- Any extra key-value pairs for future use
  accent_color          TEXT,                                  -- Optional hex override for accent (e.g. "#3B82F6")

  -- ── Engagement Stats ──────────────────────────────────────────
  views_count           INT          DEFAULT 0,
  likes_count           INT          DEFAULT 0,
  dislikes_count        INT          DEFAULT 0,
  comments_count        INT          DEFAULT 0,
  shares_count          INT          DEFAULT 0,

  -- ── Timestamps ────────────────────────────────────────────────
  created_at            TIMESTAMPTZ  DEFAULT now(),
  updated_at            TIMESTAMPTZ  DEFAULT now(),
  published_at          TIMESTAMPTZ

);

-- 3. Row-Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public: can read published + public projects
CREATE POLICY "Public read published" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'public');

-- Signed-in users can read signed-in visible projects
CREATE POLICY "Auth read signed-in" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);

-- Admins have full access
CREATE POLICY "Admin full access" ON projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE id = (SELECT auth.uid()::text)
    )
  );

-- 4. Indexes
CREATE INDEX idx_projects_status_visibility ON projects(status, visibility);
CREATE INDEX idx_projects_featured          ON projects(is_featured, featured_order) WHERE is_featured = true;
CREATE INDEX idx_projects_slug              ON projects(slug);
CREATE INDEX idx_projects_category         ON projects(category);
CREATE INDEX idx_projects_tags              ON projects USING GIN(tags);
CREATE INDEX idx_projects_created          ON projects(created_at DESC);
CREATE INDEX idx_projects_sort             ON projects(sort_order, created_at DESC);

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 6. RPC Functions

-- View counter (atomic)
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
  UPDATE projects SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = project_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Like/Dislike counter (atomic, used from likes table triggers)
CREATE OR REPLACE FUNCTION increment_likes_count(
  p_content_type TEXT,
  p_content_id   UUID,
  p_type         TEXT
) RETURNS void AS $$
BEGIN
  IF p_content_type = 'project' THEN
    IF p_type = 'like'    THEN UPDATE projects SET likes_count    = COALESCE(likes_count,0)    + 1 WHERE id = p_content_id;
    ELSE                       UPDATE projects SET dislikes_count = COALESCE(dislikes_count,0) + 1 WHERE id = p_content_id;
    END IF;
  ELSIF p_content_type = 'feed' THEN
    IF p_type = 'like'    THEN UPDATE feed SET likes_count    = COALESCE(likes_count,0)    + 1 WHERE id = p_content_id;
    ELSE                       UPDATE feed SET dislikes_count = COALESCE(dislikes_count,0) + 1 WHERE id = p_content_id;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment counter increment/decrement
CREATE OR REPLACE FUNCTION update_comment_count(
  p_content_type TEXT,
  p_content_id   UUID,
  p_delta        INT DEFAULT 1
) RETURNS void AS $$
BEGIN
  IF p_content_type = 'project' THEN
    UPDATE projects SET comments_count = GREATEST(0, COALESCE(comments_count,0) + p_delta) WHERE id = p_content_id;
  ELSIF p_content_type = 'feed' THEN
    UPDATE feed SET comments_count = GREATEST(0, COALESCE(comments_count,0) + p_delta) WHERE id = p_content_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- COLUMN COUNT: ~53 columns (id, slug, title, short_name,
-- tagline, short_description, detailed_description, content,
-- thumbnail_url, banner_url, preview_gif_url, og_image_url,
-- screenshots, github_link, live_link, pdf_link, custom_link,
-- demo_link, category, subcategory, type, tags, status,
-- visibility, development_status, is_featured, featured_order,
-- sort_order, languages, tech_stack, key_features, dependencies,
-- platform, version, start_date, end_date, project_timeline,
-- complexity_level, team_size, role, license, is_open_source,
-- seo_title, seo_description, seo_keywords, notes, awards,
-- changelog, related_slugs, meta_data, accent_color,
-- views_count, likes_count, dislikes_count, comments_count,
-- shares_count, created_at, updated_at, published_at)
-- ============================================================
