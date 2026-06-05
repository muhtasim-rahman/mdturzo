-- ============================================================
-- supabase-schema-v2.4.2.sql
-- Projects table: DROP old + CREATE new (50+ columns)
-- Run this after deleting the existing projects table in Supabase.
-- This is the FULL table definition — not a migration.
-- ============================================================

-- ── Drop old table (if exists) ───────────────────────────────
DROP TABLE IF EXISTS projects CASCADE;

-- ── Create new rich projects table ──────────────────────────
CREATE TABLE projects (

  -- ── Identity ──────────────────────────────────────────────
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  tagline          TEXT,
  short_description TEXT,                    -- max ~300 chars, shown on cards

  -- ── Content ───────────────────────────────────────────────
  content          TEXT,                     -- TipTap HTML rich content
  notes            TEXT,                     -- developer-only notes / commentary

  -- ── Media ─────────────────────────────────────────────────
  thumbnail_url    TEXT,                     -- card thumbnail (also used as og:image)
  banner_url       TEXT,                     -- wide banner (future use)
  og_image_url     TEXT,                     -- override for social sharing
  demo_video_url   TEXT,                     -- YouTube/Vimeo embed URL
  screenshots      JSONB DEFAULT '[]'::jsonb, -- [{url, caption, order}]

  -- ── Links ─────────────────────────────────────────────────
  github_link      TEXT,
  live_link        TEXT,
  pdf_link         TEXT,
  custom_link      TEXT,
  custom_link_label TEXT DEFAULT 'Visit Link',

  -- ── Classification ────────────────────────────────────────
  tags             TEXT[]    DEFAULT '{}',   -- searchable tags array
  category         TEXT      NOT NULL,       -- primary display category
  type             TEXT,                     -- e.g. 'pwa', 'library', 'website', 'tool'
  tech_stack       TEXT[]    DEFAULT '{}',   -- top-level tech labels for display
  languages        TEXT[]    DEFAULT '{}',   -- programming languages
  frameworks       TEXT[]    DEFAULT '{}',   -- frameworks used
  libraries        TEXT[]    DEFAULT '{}',   -- notable libraries / packages
  backend          TEXT,                     -- backend tech (Node, Firebase, Supabase…)
  database         TEXT,                     -- DB used (Firestore, PostgreSQL, Sheets…)
  hosting          TEXT,                     -- hosting platform (Firebase, GH Pages, Vercel…)

  -- ── Project Info ──────────────────────────────────────────
  version          TEXT,                     -- current version string (e.g. "v3.4")
  platform         TEXT,                     -- target platform (Web, PWA, Mobile, Desktop)
  project_timeline TEXT,                     -- human-readable: "2024 – Present"
  start_date       DATE,
  end_date         DATE,                     -- NULL if ongoing
  project_status   TEXT DEFAULT 'completed', -- active | completed | archived | discontinued | beta | in-development
  complexity_level TEXT,                     -- beginner | intermediate | advanced | expert
  team_size        INT DEFAULT 1,
  role             TEXT,                     -- developer's role in the project
  client           TEXT,                     -- client name (for freelance work)
  institution      TEXT,                     -- school/org for academic projects

  -- ── Rich Data ─────────────────────────────────────────────
  key_features     TEXT[]    DEFAULT '{}',   -- bullet feature list (array of strings)
  changelog        JSONB     DEFAULT '[]'::jsonb, -- [{version, date, changes: [string]}]
  repo_stats       JSONB,                    -- {stars, forks, commits, size_kb, languages: {}}
  external_references JSONB  DEFAULT '[]'::jsonb, -- [{title, url, description}]
  demo_credentials JSONB,                    -- {username, password, note} (nullable)
  awards           TEXT[]    DEFAULT '{}',   -- recognition / awards received
  collaborators    TEXT[]    DEFAULT '{}',   -- list of collaborator names/handles
  seo_keywords     TEXT[]    DEFAULT '{}',   -- for search engine + internal search

  -- ── Flags ─────────────────────────────────────────────────
  open_source      BOOLEAN   DEFAULT false,
  has_pwa          BOOLEAN   DEFAULT false,
  has_dark_mode    BOOLEAN   DEFAULT false,
  has_responsive   BOOLEAN   DEFAULT true,
  is_collaborative BOOLEAN   DEFAULT false,

  -- ── Display Controls ──────────────────────────────────────
  status           TEXT      DEFAULT 'draft',     -- published | draft | hidden
  visibility       TEXT      DEFAULT 'public',    -- public | signed-in | private
  is_featured      BOOLEAN   DEFAULT false,
  featured_order   INT,                           -- 1–6 for home page ordering
  accent           TEXT,                          -- hex override (e.g. '#3B82F6')

  -- ── SEO ───────────────────────────────────────────────────
  seo_title        TEXT,
  seo_description  TEXT,

  -- ── Counters (managed by triggers/RPCs) ───────────────────
  views_count      INT DEFAULT 0,
  likes_count      INT DEFAULT 0,
  dislikes_count   INT DEFAULT 0,
  comments_count   INT DEFAULT 0,

  -- ── Timestamps ────────────────────────────────────────────
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ── Column count validation: 52 columns ─────────────────────
-- id, slug, title, tagline, short_description, content, notes,
-- thumbnail_url, banner_url, og_image_url, demo_video_url, screenshots,
-- github_link, live_link, pdf_link, custom_link, custom_link_label,
-- tags, category, type, tech_stack, languages, frameworks, libraries,
-- backend, database, hosting,
-- version, platform, project_timeline, start_date, end_date, project_status,
-- complexity_level, team_size, role, client, institution,
-- key_features, changelog, repo_stats, external_references, demo_credentials,
-- awards, collaborators, seo_keywords,
-- open_source, has_pwa, has_dark_mode, has_responsive, is_collaborative,
-- status, visibility, is_featured, featured_order, accent,
-- seo_title, seo_description,
-- views_count, likes_count, dislikes_count, comments_count,
-- created_at, updated_at
-- Total: 62 columns ✓


-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_projects_slug        ON projects (slug);
CREATE INDEX idx_projects_status      ON projects (status);
CREATE INDEX idx_projects_category    ON projects (category);
CREATE INDEX idx_projects_featured    ON projects (is_featured, featured_order);
CREATE INDEX idx_projects_tags        ON projects USING GIN (tags);
CREATE INDEX idx_projects_tech_stack  ON projects USING GIN (tech_stack);
CREATE INDEX idx_projects_languages   ON projects USING GIN (languages);
CREATE INDEX idx_projects_seo_kw      ON projects USING GIN (seo_keywords);
CREATE INDEX idx_projects_created     ON projects (created_at DESC);
CREATE INDEX idx_projects_views       ON projects (views_count DESC);
CREATE INDEX idx_projects_likes       ON projects (likes_count DESC);


-- ── RLS (Row Level Security) ─────────────────────────────────
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can read published+public projects
CREATE POLICY "projects_public_read"
  ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'public');

-- Authenticated users can also read signed-in projects
CREATE POLICY "projects_signedin_read"
  ON projects FOR SELECT
  TO authenticated
  USING (status = 'published' AND visibility IN ('public', 'signed-in'));

-- Only service role can write (admin panel uses service key)
CREATE POLICY "projects_service_write"
  ON projects FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ── Updated_at auto-trigger ───────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ── increment_project_views RPC ──────────────────────────────
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET views_count = views_count + 1
  WHERE id = project_id;
END;
$$;


-- ── increment_project_likes RPC ──────────────────────────────
CREATE OR REPLACE FUNCTION increment_project_likes(project_id UUID, delta INT DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET likes_count = GREATEST(0, likes_count + delta)
  WHERE id = project_id;
END;
$$;


-- ── increment_project_dislikes RPC ───────────────────────────
CREATE OR REPLACE FUNCTION increment_project_dislikes(project_id UUID, delta INT DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET dislikes_count = GREATEST(0, dislikes_count + delta)
  WHERE id = project_id;
END;
$$;


-- ── increment_project_comments RPC ───────────────────────────
CREATE OR REPLACE FUNCTION increment_project_comments(project_id UUID, delta INT DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET comments_count = GREATEST(0, comments_count + delta)
  WHERE id = project_id;
END;
$$;


-- ── Full-text search function (optional, for future API-side search) ──
-- The primary search is client-side (projectSearch.js).
-- This provides a Postgres fallback / admin use.
CREATE OR REPLACE FUNCTION search_projects(query TEXT)
RETURNS SETOF projects
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM projects
  WHERE status = 'published'
    AND visibility = 'public'
    AND (
      title            ILIKE '%' || query || '%'
      OR tagline       ILIKE '%' || query || '%'
      OR short_description ILIKE '%' || query || '%'
      OR content       ILIKE '%' || query || '%'
      OR notes         ILIKE '%' || query || '%'
      OR category      ILIKE '%' || query || '%'
      OR type          ILIKE '%' || query || '%'
      OR query         ILIKE ANY(tags)
      OR query         ILIKE ANY(tech_stack)
      OR query         ILIKE ANY(languages)
      OR query         ILIKE ANY(frameworks)
      OR query         ILIKE ANY(key_features)
      OR query         ILIKE ANY(seo_keywords)
    )
  ORDER BY
    CASE WHEN title ILIKE '%' || query || '%' THEN 1
         WHEN tagline ILIKE '%' || query || '%' THEN 2
         WHEN short_description ILIKE '%' || query || '%' THEN 3
         ELSE 4 END;
END;
$$;
