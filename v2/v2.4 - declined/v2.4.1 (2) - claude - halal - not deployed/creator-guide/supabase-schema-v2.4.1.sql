-- ============================================================
-- SUPABASE MIGRATION — v2.4.1
-- Portfolio: mdturzo.web.app
-- Run this in Supabase SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- STEP 1 — Add new columns to existing 'projects' table
-- All new columns are optional (nullable) so existing rows
-- continue to work without any data migration.
-- ─────────────────────────────────────────────────────────────

ALTER TABLE public.projects
  -- Accent color override (hex, e.g. '#3B82F6')
  ADD COLUMN IF NOT EXISTS accent           text,

  -- Rich tech stack array, separate from tags
  -- e.g. '{"JavaScript","Firebase","GSAP"}'
  ADD COLUMN IF NOT EXISTS tech_stack       text[]   DEFAULT '{}',

  -- Year the project was started/built (e.g. 2024)
  ADD COLUMN IF NOT EXISTS year_built       integer,

  -- Project complexity level
  ADD COLUMN IF NOT EXISTS complexity       text
    CHECK (complexity IN ('beginner','intermediate','advanced','expert')),

  -- Broad project type (more descriptive than category)
  -- e.g. 'PWA', 'Library', 'Website', 'Component', 'Game'
  ADD COLUMN IF NOT EXISTS project_type     text,

  -- Target platform
  -- e.g. 'web', 'mobile', 'desktop', 'cross-platform'
  ADD COLUMN IF NOT EXISTS platform         text     DEFAULT 'web',

  -- Team size (1 = solo)
  ADD COLUMN IF NOT EXISTS team_size        integer  DEFAULT 1,

  -- Human-readable development duration (e.g. '3 weeks', '6 months')
  ADD COLUMN IF NOT EXISTS duration         text,

  -- Separate OG image override (falls back to thumbnail_url if null)
  -- Use a 1200×630 image for best social sharing
  ADD COLUMN IF NOT EXISTS og_image_url     text,

  -- Additional screenshots/images array (urls)
  ADD COLUMN IF NOT EXISTS screenshots      text[]   DEFAULT '{}',

  -- Changelog history as JSON array
  -- Format: [{"version":"1.0","date":"2024-01-15","changes":"Initial release"}]
  ADD COLUMN IF NOT EXISTS changelog        jsonb    DEFAULT '[]',

  -- Manual related project slugs override
  -- If set, overrides auto-related (by category/tags)
  ADD COLUMN IF NOT EXISTS manual_related   text[]   DEFAULT '{}',

  -- Manual sort priority (lower = shown first)
  -- Used when sort = 'latest' is not desired
  ADD COLUMN IF NOT EXISTS sort_order       integer  DEFAULT 999,

  -- Extra links beyond live/github/pdf/custom
  -- Format: [{"label":"npm","url":"https://...","icon":"fa-npm"}]
  ADD COLUMN IF NOT EXISTS extra_links      jsonb    DEFAULT '[]',

  -- Rich long description (plain text, used for SEO)
  -- Separate from content (TipTap HTML)
  ADD COLUMN IF NOT EXISTS long_description text;


-- ─────────────────────────────────────────────────────────────
-- STEP 2 — Indexes for new filterable columns
-- ─────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_projects_sort_order
  ON public.projects (sort_order ASC);

CREATE INDEX IF NOT EXISTS idx_projects_year_built
  ON public.projects (year_built DESC);

CREATE INDEX IF NOT EXISTS idx_projects_complexity
  ON public.projects (complexity);

CREATE INDEX IF NOT EXISTS idx_projects_tech_stack
  ON public.projects USING GIN (tech_stack);

CREATE INDEX IF NOT EXISTS idx_projects_screenshots
  ON public.projects USING GIN (screenshots);


-- ─────────────────────────────────────────────────────────────
-- STEP 3 — Fix: create increment_project_views RPC
-- The live site was throwing 404 on this function (v2.4.1 bug fix)
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.increment_project_views(project_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.projects
  SET    views_count = COALESCE(views_count, 0) + 1,
         updated_at  = NOW()
  WHERE  id = project_id
    AND  status = 'published';
END;
$$;

-- Grant execute to anon and authenticated (needed by Supabase client)
GRANT EXECUTE ON FUNCTION public.increment_project_views(uuid)
  TO anon, authenticated;


-- ─────────────────────────────────────────────────────────────
-- STEP 4 — RLS policies (check existing, add if missing)
-- ─────────────────────────────────────────────────────────────

-- Enable RLS if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can read published + public projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'projects' AND policyname = 'public_read_published'
  ) THEN
    CREATE POLICY public_read_published ON public.projects
      FOR SELECT USING (status = 'published' AND visibility = 'public');
  END IF;
END
$$;

-- Authenticated can read published + signed-in visibility
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'projects' AND policyname = 'auth_read_signed_in'
  ) THEN
    CREATE POLICY auth_read_signed_in ON public.projects
      FOR SELECT USING (
        status = 'published'
        AND (visibility = 'public' OR visibility = 'signed-in')
        AND auth.role() = 'authenticated'
      );
  END IF;
END
$$;


-- ─────────────────────────────────────────────────────────────
-- STEP 5 — Seed: update accent colors for existing projects
-- Matches CAT_COLORS from ProjectCard.jsx
-- ─────────────────────────────────────────────────────────────

UPDATE public.projects SET accent = '#6366F1' WHERE category = 'PWA'          AND accent IS NULL;
UPDATE public.projects SET accent = '#3B82F6' WHERE category = 'Web App'      AND accent IS NULL;
UPDATE public.projects SET accent = '#10B981' WHERE category = 'Utility'      AND accent IS NULL;
UPDATE public.projects SET accent = '#F59E0B' WHERE category = 'Education'    AND accent IS NULL;
UPDATE public.projects SET accent = '#EC4899' WHERE category = 'UI Component' AND accent IS NULL;
UPDATE public.projects SET accent = '#A855F7' WHERE category = 'Dev Tool'     AND accent IS NULL;
UPDATE public.projects SET accent = '#06B6D4' WHERE category = 'Islamic'      AND accent IS NULL;
UPDATE public.projects SET accent = '#F97316' WHERE category = 'Tool'         AND accent IS NULL;
UPDATE public.projects SET accent = '#8B5CF6' WHERE category = 'Portfolio'    AND accent IS NULL;
UPDATE public.projects SET accent = '#F43F5E' WHERE category = 'Design'       AND accent IS NULL;
UPDATE public.projects SET accent = '#84CC16' WHERE category = 'Learning'     AND accent IS NULL;
UPDATE public.projects SET accent = '#0EA5E9' WHERE category = 'Institutional'AND accent IS NULL;


-- ─────────────────────────────────────────────────────────────
-- STEP 6 — Verify migration
-- ─────────────────────────────────────────────────────────────

SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'projects'
ORDER BY ordinal_position;

-- ✅ Expected new columns: accent, tech_stack, year_built, complexity,
--    project_type, platform, team_size, duration, og_image_url,
--    screenshots, changelog, manual_related, sort_order, extra_links,
--    long_description
