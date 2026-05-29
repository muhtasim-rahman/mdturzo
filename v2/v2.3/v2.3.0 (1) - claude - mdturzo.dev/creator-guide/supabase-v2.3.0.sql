-- ============================================================
-- Supabase SQL Script — v2.3.0 About Page
-- No new tables required for v2.3.0
-- About page reads from existing site_settings table only
-- ============================================================

-- Ensure all required site_settings keys exist (safe to re-run)
INSERT INTO site_settings (key, value) VALUES
  ('stats_years_dev',    '"3+"'),
  ('stats_years_design', '"6+"'),
  ('stats_projects',     '"16+"'),
  ('available_for_work', 'true'),
  ('cv_url',             '""'),
  ('cv_enabled',         'false')
ON CONFLICT (key) DO NOTHING;

-- No new RLS policies needed — About page is public read only
-- All reads go through existing "Anyone read" policy on site_settings

-- (Optional) Verify all keys exist
SELECT key, value FROM site_settings
WHERE key IN ('stats_years_dev','stats_years_design','stats_projects','available_for_work','cv_url','cv_enabled');
