-- ============================================================
-- MDTURZO PORTFOLIO — Supabase SQL Additions v2.4.0
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- NOTE: v2.0.0 schema must already be applied first.
-- ============================================================

-- ── 1. Rename 'featured' column to 'is_featured' (if migrating from schema that used 'featured') ──
-- Only run if you see an error about 'is_featured' not existing:
-- ALTER TABLE projects RENAME COLUMN featured TO is_featured;

-- ── 2. Helper RPC functions for atomic counter increments ──
-- These are called by the frontend to safely increment/decrement view/like counts
-- without race conditions.

CREATE OR REPLACE FUNCTION increment_count(tbl TEXT, row_id UUID, col TEXT)
RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE %I SET %I = COALESCE(%I, 0) + 1 WHERE id = $1', tbl, col, col)
  USING row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_count(tbl TEXT, row_id UUID, col TEXT)
RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE %I SET %I = GREATEST(COALESCE(%I, 0) - 1, 0) WHERE id = $1', tbl, col, col)
  USING row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated and anon roles
GRANT EXECUTE ON FUNCTION increment_count(TEXT, UUID, TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION decrement_count(TEXT, UUID, TEXT) TO authenticated, anon;

-- ── 3. Ensure projects has is_featured + featured_order ──
-- (In v2.0.0 schema it was called 'featured' — this ensures correct column name)
DO $$
BEGIN
  -- Add is_featured if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE projects ADD COLUMN is_featured BOOLEAN DEFAULT false;
  END IF;

  -- Add featured_order if it doesn't exist  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'featured_order'
  ) THEN
    ALTER TABLE projects ADD COLUMN featured_order INT;
  END IF;
END $$;

-- ── 4. Index for featured projects query ──────────────────
CREATE INDEX IF NOT EXISTS idx_projects_featured_v240
  ON projects(is_featured, featured_order)
  WHERE is_featured = true;

-- ── 5. Ensure comments table has correct columns ──────────
-- The supabase.js submitComment function expects content_slug column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'comments' AND column_name = 'content_slug'
  ) THEN
    ALTER TABLE comments ADD COLUMN content_slug TEXT;
  END IF;
END $$;

-- ── 6. RLS Policy additions for increment_count / decrement_count ──
-- These functions are SECURITY DEFINER so they bypass RLS — they only
-- touch specific counter columns, no data leakage risk.

-- ── 7. Sample featured projects (optional — for testing) ──
-- Uncomment and run ONLY if you want to seed sample data:
-- INSERT INTO projects (slug, title, short_description, category, status, visibility, is_featured, featured_order, tags)
-- VALUES
--   ('linkivo', 'Linkivo — Smart Link Manager', 'PWA for intelligent link management with weighted discovery.', 'Web App', 'published', 'public', true, 1, ARRAY['PWA','Firebase','GSAP']),
--   ('qr-prism', 'QR Prism', 'Feature-rich PWA for QR generation, scanning, and batch processing.', 'Utility', 'published', 'public', true, 2, ARRAY['PWA','Firebase','QR']),
--   ('ufmt-ssc26', 'UFMT-SSC26 — FMT Tracker', 'Merit tracking dashboard for SSC-26 students.', 'Education', 'published', 'public', true, 3, ARRAY['Education','Google Sheets']),
--   ('notification-panel', 'Notification Panel', 'Plug-and-play notification system powered by Google Sheets.', 'UI Component', 'published', 'public', true, 4, ARRAY['Component','Open Source']),
--   ('exporter-pro', 'Project Exporter Pro', 'JavaScript export engine with Shadow DOM isolation.', 'Dev Tool', 'published', 'public', true, 5, ARRAY['Library','Shadow DOM']),
--   ('halal', 'Halal — World of Muslims', 'Islamic resource repository and educational content.', 'Islamic', 'published', 'public', true, 6, ARRAY['Islamic','Educational'])
-- ON CONFLICT (slug) DO NOTHING;

-- ── Done ──────────────────────────────────────────────────
-- v2.4.0 SQL complete.
-- What changed:
--   • increment_count / decrement_count RPC functions (atomic counter updates)
--   • is_featured + featured_order columns ensured on projects
--   • content_slug column ensured on comments
--   • Index for featured projects query
-- ============================================================
