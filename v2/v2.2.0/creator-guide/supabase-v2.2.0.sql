-- ============================================================
-- Supabase migration notes for v2.2.0 - Home Page
-- No new tables are required in this version.
-- This script only ensures the Home page dynamic fields exist.
-- ============================================================

-- Home stats read these keys from site_settings.
INSERT INTO site_settings (key, value) VALUES
  ('stats_years_dev', '3'),
  ('stats_years_design', '6'),
  ('stats_projects', '16')
ON CONFLICT (key) DO NOTHING;

-- Featured projects are used by the Home "Recent Projects" section.
-- The original prompt schema uses `featured`; some earlier code used
-- `is_featured`, so the frontend now supports both while the DB should
-- keep the prompt-standard `featured` column.
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured_order INT;

CREATE INDEX IF NOT EXISTS idx_projects_home_featured
  ON projects (featured, featured_order, created_at DESC)
  WHERE status = 'published' AND visibility = 'public';

CREATE INDEX IF NOT EXISTS idx_reviews_home_approved
  ON reviews (status, created_at DESC)
  WHERE status = 'approved';
