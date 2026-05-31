-- ============================================================
-- MDTURZO PORTFOLIO — Supabase SQL Script v2.4.0
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
--
-- Changes from v2.0.0 schema:
-- 1. Add `accent_color` column to projects table
-- 2. Add `increment_project_views` RPC function
-- 3. Fix index for is_featured (confirm existing schema)
-- ============================================================

-- ── 1. Add accent_color to projects ────────────────────────
-- Allows per-project custom accent color (hex string, e.g. '#3B82F6')
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#3B82F6';

-- ── 2. Add accent_color to feed table (for future use) ─────
ALTER TABLE feed
  ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#3B82F6';

-- ── 3. RPC: increment_project_views ───────────────────────
-- Called from client to safely increment view count.
-- Client-side dedup via sessionStorage prevents double counting.
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
  UPDATE projects
  SET views_count = views_count + 1,
      updated_at  = now()
  WHERE id = project_id
    AND status = 'published';
$$ LANGUAGE sql SECURITY DEFINER;

-- Grant execute to anon (public can increment views)
GRANT EXECUTE ON FUNCTION increment_project_views(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_project_views(UUID) TO authenticated;

-- ── 4. RPC: increment_feed_views ──────────────────────────
-- For future feed (blog/post) view counting
CREATE OR REPLACE FUNCTION increment_feed_views(feed_id UUID)
RETURNS void AS $$
  UPDATE feed
  SET views_count = views_count + 1,
      updated_at  = now()
  WHERE id = feed_id
    AND status = 'published';
$$ LANGUAGE sql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION increment_feed_views(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_feed_views(UUID) TO authenticated;

-- ── 5. Ensure index covers is_featured ────────────────────
-- Drop and recreate index to ensure it matches actual column name
DROP INDEX IF EXISTS idx_projects_featured;
CREATE INDEX IF NOT EXISTS idx_projects_is_featured
  ON projects(is_featured, featured_order)
  WHERE is_featured = true;

-- ── 6. Fix: ensure `is_featured` column exists ─────────────
-- v2.0.0 schema uses is_featured, but verify it exists
-- (This is a no-op if already correct from v2.0.0)
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- ── 7. Supabase comment rate limit helper ──────────────────
-- View to help check comment rate limits (10/day per user)
CREATE OR REPLACE VIEW user_comment_counts_today AS
SELECT
  user_id,
  COUNT(*) as count_today
FROM comments
WHERE created_at >= CURRENT_DATE
GROUP BY user_id;

-- ============================================================
-- DONE! Run this script after v2.0.0 schema is already applied.
-- ============================================================
