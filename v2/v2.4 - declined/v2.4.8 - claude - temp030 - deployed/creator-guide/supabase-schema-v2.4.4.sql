-- ============================================================
-- supabase-schema-v2.4.4.sql
-- Full replacement schema: projects (69 cols) + project_reviews
-- Run in Supabase SQL editor after backing up existing data
-- ============================================================

DROP TABLE IF EXISTS project_reviews CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- ── Projects (69 columns) ──────────────────────────────────
CREATE TABLE projects (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT        UNIQUE NOT NULL,
  title               TEXT        NOT NULL,
  short_name          TEXT,
  tagline             TEXT,
  short_description   TEXT,
  long_description    TEXT,
  content             TEXT,
  key_features        JSONB       DEFAULT '[]',
  notes               TEXT,
  changelog           JSONB       DEFAULT '[]',
  thumbnail_url       TEXT,
  og_image_url        TEXT,
  screenshots         JSONB       DEFAULT '[]',
  video_url           TEXT,
  github_link         TEXT,
  live_link           TEXT,
  pdf_link            TEXT,
  custom_link         TEXT,
  custom_link_label   TEXT,
  extra_links         JSONB       DEFAULT '[]',
  tags                TEXT[]      DEFAULT '{}',
  category            TEXT,
  type                TEXT,
  platform            TEXT,
  tech_stack          TEXT[]      DEFAULT '{}',
  languages           TEXT[]      DEFAULT '{}',
  frameworks          TEXT[]      DEFAULT '{}',
  libraries           TEXT[]      DEFAULT '{}',
  backend             TEXT,
  database            TEXT,
  hosting             TEXT,
  complexity_level    TEXT        CHECK (complexity_level IN ('beginner','intermediate','advanced','expert')),
  version             TEXT,
  year_built          INTEGER,
  duration            TEXT,
  project_timeline    TEXT,
  start_date          DATE,
  team_size           INTEGER     DEFAULT 1,
  role                TEXT,
  institution         TEXT,
  client              TEXT,
  is_featured         BOOLEAN     DEFAULT false,
  featured_order      INTEGER     DEFAULT 99,
  sort_order          INTEGER     DEFAULT 99,
  is_highlighted      BOOLEAN     DEFAULT false,
  highlight_label     TEXT,
  open_source         BOOLEAN     DEFAULT false,
  has_pwa             BOOLEAN     DEFAULT false,
  has_dark_mode       BOOLEAN     DEFAULT false,
  has_responsive      BOOLEAN     DEFAULT true,
  accent              TEXT,
  seo_title           TEXT,
  seo_description     TEXT,
  seo_keywords        TEXT,
  status              TEXT        DEFAULT 'draft'   CHECK (status IN ('draft','published','archived')),
  visibility          TEXT        DEFAULT 'public'  CHECK (visibility IN ('public','private','unlisted')),
  project_status      TEXT        DEFAULT 'active'  CHECK (project_status IN ('active','completed','archived','discontinued','beta','in-development')),
  manual_related      TEXT[]      DEFAULT '{}',
  views_count         INTEGER     DEFAULT 0,
  likes_count         INTEGER     DEFAULT 0,
  dislikes_count      INTEGER     DEFAULT 0,
  comments_count      INTEGER     DEFAULT 0,
  reviews_count       INTEGER     DEFAULT 0,
  avg_rating          NUMERIC(3,2) DEFAULT 0.00,
  awards              JSONB       DEFAULT '[]',
  external_references JSONB       DEFAULT '[]',
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_projects_status_vis  ON projects(status, visibility);
CREATE INDEX idx_projects_category    ON projects(category);
CREATE INDEX idx_projects_featured    ON projects(is_featured, featured_order);
CREATE INDEX idx_projects_sort        ON projects(sort_order);
CREATE INDEX idx_projects_tags        ON projects USING GIN(tags);
CREATE INDEX idx_projects_tech        ON projects USING GIN(tech_stack);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_projects_updated
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pub_read"      ON projects FOR SELECT USING (status = 'published' AND visibility = 'public');
CREATE POLICY "svc_all"       ON projects FOR ALL    USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN UPDATE projects SET views_count = views_count + 1 WHERE id = project_id; END;
$$;

-- ── Project Reviews ────────────────────────────────────────
CREATE TABLE project_reviews (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id     TEXT        NOT NULL,
  rating      INTEGER     NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message     TEXT        CHECK (length(message) <= 500),
  status      TEXT        DEFAULT 'approved' CHECK (status IN ('pending','approved','rejected')),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (project_id, user_id)
);

CREATE INDEX idx_reviews_proj ON project_reviews(project_id, status);
CREATE INDEX idx_reviews_user ON project_reviews(user_id);

CREATE TRIGGER trg_reviews_updated
  BEFORE UPDATE ON project_reviews
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE project_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pub_read_reviews"  ON project_reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "auth_insert_rev"   ON project_reviews FOR INSERT WITH CHECK (user_id IS NOT NULL);
CREATE POLICY "auth_update_rev"   ON project_reviews FOR UPDATE USING (true);
CREATE POLICY "svc_all_reviews"   ON project_reviews FOR ALL USING (auth.role() = 'service_role');
