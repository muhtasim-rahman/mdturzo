-- ============================================================
-- SUPABASE MIGRATION — v2.4.1
-- Recreates the 'projects' table with advanced columns.
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- WARNING: This will drop the existing projects table. Backup data first!
-- ============================================================

-- 1. Drop existing policies, indexes, and table
DROP INDEX IF EXISTS idx_projects_status_visibility;
DROP INDEX IF EXISTS idx_projects_featured;
DROP TABLE IF EXISTS projects CASCADE;

-- 2. Create recreated projects table with advanced fields
CREATE TABLE projects (
  id                    UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  TEXT         UNIQUE NOT NULL,
  title                 TEXT         NOT NULL,
  short_name            TEXT,
  tagline               TEXT,
  short_description     TEXT,
  detailed_description  TEXT,
  content               TEXT,        -- TipTap HTML/Content
  thumbnail_url         TEXT,
  github_link           TEXT,
  live_link             TEXT,
  pdf_link              TEXT,
  custom_link           TEXT,
  tags                  TEXT[]       DEFAULT '{}',
  category              TEXT,
  status                TEXT         DEFAULT 'draft',       -- published/draft/hidden
  visibility            TEXT         DEFAULT 'public',      -- public/signed-in/private
  is_featured           BOOLEAN      DEFAULT false,
  featured_order        INT,
  project_timeline      TEXT,        -- e.g., "Start Date: 2024 - v1.4.5 (April 2026)"
  languages             TEXT[]       DEFAULT '{}',
  platform              TEXT,        -- e.g., "Web (PWA)", "Cross-platform"
  key_features          TEXT[]       DEFAULT '{}',
  tech_stack            TEXT[]       DEFAULT '{}',
  complexity_level      TEXT,        -- e.g., "Beginner", "Intermediate", "Advanced", "Expert"
  seo_title             TEXT,
  seo_description       TEXT,
  seo_keywords          TEXT[]       DEFAULT '{}',
  notes                 TEXT,
  views_count           INT          DEFAULT 0,
  likes_count           INT          DEFAULT 0,
  dislikes_count        INT          DEFAULT 0,
  comments_count        INT          DEFAULT 0,
  created_at            TIMESTAMPTZ  DEFAULT now(),
  updated_at            TIMESTAMPTZ  DEFAULT now()
);

-- 3. Enable RLS and define policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public published" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Signed-in projects" ON projects FOR SELECT
  USING (status = 'published' AND visibility = 'signed-in' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin full projects" ON projects FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE id = (SELECT auth.uid()::text)
    )
  );

-- 4. Create performance indexes
CREATE INDEX idx_projects_status_visibility ON projects(status, visibility);
CREATE INDEX idx_projects_featured ON projects(is_featured, featured_order) WHERE is_featured = true;
CREATE INDEX idx_projects_slug ON projects(slug);

-- 5. Re-create triggers and functions if they were dropped by CASCADE
-- View increment helper RPC
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
  UPDATE projects
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = project_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Likes count increment helper RPC
CREATE OR REPLACE FUNCTION increment_likes_count(p_content_type TEXT, p_content_id UUID, p_type TEXT)
RETURNS void AS $$
BEGIN
  IF p_content_type = 'project' THEN
    IF p_type = 'like' THEN
      UPDATE projects SET likes_count = COALESCE(likes_count,0)+1 WHERE id = p_content_id;
    ELSE
      UPDATE projects SET dislikes_count = COALESCE(dislikes_count,0)+1 WHERE id = p_content_id;
    END IF;
  ELSIF p_content_type = 'feed' THEN
    IF p_type = 'like' THEN
      UPDATE feed SET likes_count = COALESCE(likes_count,0)+1 WHERE id = p_content_id;
    ELSE
      UPDATE feed SET dislikes_count = COALESCE(dislikes_count,0)+1 WHERE id = p_content_id;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
