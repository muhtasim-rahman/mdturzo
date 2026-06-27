-- ============================================================
-- SUPABASE MIGRATION — v2.4.0
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- This file contains ONLY changes from v2.0.0 → v2.4.0
-- Base schema is in: supabase-schema-v2.0.0.sql
-- ============================================================

-- 1. Add increment_project_views RPC function
--    Called when a project detail page is loaded
--    Falls back silently if unavailable
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
  UPDATE projects
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = project_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Add increment_likes_count function (used for denormalized cache)
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

-- 3. Add delete comment own policy (needed for user delete)
DROP POLICY IF EXISTS "Own delete comment" ON comments;
CREATE POLICY "Own delete comment" ON comments FOR DELETE
  USING (auth.uid()::text = user_id);

-- 4. Ensure 'projects' page is in page_visibility
INSERT INTO page_visibility (page) VALUES ('projects')
ON CONFLICT (page) DO NOTHING;

-- 5. Add sample projects for testing (optional — remove if not needed)
-- Uncomment to seed test data:
/*
INSERT INTO projects (slug, title, short_description, category, tags, status, visibility, is_featured, featured_order)
VALUES
  ('linkivo', 'Linkivo — Smart Link Manager', 'PWA for intelligent link management with GSAP animations.', 'Web App', ARRAY['PWA','Firebase','GSAP'], 'published', 'public', true, 1),
  ('qr-prism', 'QR Prism', 'Feature-rich PWA: QR generation, scanning, batch processing.', 'Utility', ARRAY['PWA','Firebase','QR'], 'published', 'public', true, 2),
  ('ufmt-ssc26', 'FMT Tracker Pro — SSC-26', 'Merit tracking dashboard powered by Google Sheets.', 'Education', ARRAY['Education','Sheets'], 'published', 'public', true, 3),
  ('notification-panel', 'Notification Panel', 'Plug-and-play notification panel powered by Google Sheets.', 'UI Component', ARRAY['Component','Open Source'], 'published', 'public', true, 4),
  ('exporter-pro', 'Project Exporter Pro', 'JS export engine: PNG, JPG, SVG, PDF with Shadow DOM.', 'Dev Tool', ARRAY['Library','Shadow DOM'], 'published', 'public', true, 5),
  ('halal', 'Halal — World of Muslims', 'Interactive Islamic resource covering the Five Pillars.', 'Islamic', ARRAY['Islamic','Educational'], 'published', 'public', true, 6)
ON CONFLICT (slug) DO NOTHING;
*/

-- ============================================================
-- v2.4.0 migration complete.
-- No new tables were added in v2.4.0.
-- All base tables were created in supabase-schema-v2.0.0.sql
-- ============================================================
