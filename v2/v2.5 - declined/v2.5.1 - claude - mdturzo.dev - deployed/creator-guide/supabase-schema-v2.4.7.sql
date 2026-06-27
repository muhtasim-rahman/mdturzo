-- ============================================================
-- supabase-schema-v2.4.7.sql
-- Changes:
--   1. project_reviews  — message limit 500→1000, add likes_count,
--                         admin_reply, admin_reply_at
--   2. review_likes     — NEW table + RPC
--   3. comments         — 1000→3000 chars, add parent_id /
--                         is_anonymous / likes_count / is_hidden
--   4. comment_likes    — NEW table + RPC
--   5. saved_projects   — NEW table
--   6. review stats trigger on projects table
--
-- NOTE: PostgreSQL does NOT support CREATE POLICY IF NOT EXISTS.
--       Each policy block below uses DROP ... IF EXISTS first.
-- ============================================================

-- ── 1. project_reviews tweaks ────────────────────────────────

-- Drop old 500-char constraint and add 1000-char one
ALTER TABLE project_reviews
  DROP CONSTRAINT IF EXISTS project_reviews_message_check;
ALTER TABLE project_reviews
  ADD CONSTRAINT project_reviews_message_check
    CHECK (length(message) <= 1000);

-- Add new columns (safe — skips if already exists)
ALTER TABLE project_reviews
  ADD COLUMN IF NOT EXISTS likes_count    INTEGER     DEFAULT 0,
  ADD COLUMN IF NOT EXISTS admin_reply    TEXT,
  ADD COLUMN IF NOT EXISTS admin_reply_at TIMESTAMPTZ;

-- All new reviews go straight to approved (no admin gate)
ALTER TABLE project_reviews
  ALTER COLUMN status SET DEFAULT 'approved';

-- ── 2. review_likes ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS review_likes (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id  UUID        NOT NULL REFERENCES project_reviews(id) ON DELETE CASCADE,
  user_id    TEXT        NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (review_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_review_likes_review ON review_likes(review_id);
CREATE INDEX IF NOT EXISTS idx_review_likes_user   ON review_likes(user_id);

ALTER TABLE review_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pub_read_rev_likes"  ON review_likes;
DROP POLICY IF EXISTS "auth_ins_rev_likes"  ON review_likes;
DROP POLICY IF EXISTS "auth_del_rev_likes"  ON review_likes;
DROP POLICY IF EXISTS "svc_all_rev_likes"   ON review_likes;

CREATE POLICY "pub_read_rev_likes"  ON review_likes FOR SELECT USING (true);
CREATE POLICY "auth_ins_rev_likes"  ON review_likes FOR INSERT WITH CHECK (user_id IS NOT NULL);
CREATE POLICY "auth_del_rev_likes"  ON review_likes FOR DELETE USING (user_id IS NOT NULL);
CREATE POLICY "svc_all_rev_likes"   ON review_likes FOR ALL   USING (auth.role() = 'service_role');

-- ── RPC: toggle_review_like ──────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_review_like(p_review_id UUID, p_user_id TEXT)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM review_likes
    WHERE review_id = p_review_id AND user_id = p_user_id
  ) INTO v_exists;

  IF v_exists THEN
    DELETE FROM review_likes
    WHERE review_id = p_review_id AND user_id = p_user_id;
    UPDATE project_reviews
    SET likes_count = GREATEST(0, likes_count - 1)
    WHERE id = p_review_id;
    RETURN json_build_object('liked', false);
  ELSE
    INSERT INTO review_likes (review_id, user_id)
    VALUES (p_review_id, p_user_id)
    ON CONFLICT DO NOTHING;
    UPDATE project_reviews
    SET likes_count = likes_count + 1
    WHERE id = p_review_id;
    RETURN json_build_object('liked', true);
  END IF;
END;
$$;

-- ── 3. comments modifications ────────────────────────────────

-- Drop old 1000-char constraint
ALTER TABLE comments
  DROP CONSTRAINT IF EXISTS comments_text_check;
ALTER TABLE comments
  ADD CONSTRAINT comments_text_check CHECK (length(text) <= 3000);

-- New columns
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS parent_id    UUID        REFERENCES comments(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN     DEFAULT false,
  ADD COLUMN IF NOT EXISTS likes_count  INTEGER     DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_hidden    BOOLEAN     DEFAULT false;

-- Direct public by default
ALTER TABLE comments
  ALTER COLUMN status SET DEFAULT 'approved';

CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

-- ── 4. comment_likes ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS comment_likes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id  UUID        NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (comment_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user    ON comment_likes(user_id);

ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pub_read_com_likes"  ON comment_likes;
DROP POLICY IF EXISTS "auth_ins_com_likes"  ON comment_likes;
DROP POLICY IF EXISTS "auth_del_com_likes"  ON comment_likes;
DROP POLICY IF EXISTS "svc_all_com_likes"   ON comment_likes;

CREATE POLICY "pub_read_com_likes"  ON comment_likes FOR SELECT USING (true);
CREATE POLICY "auth_ins_com_likes"  ON comment_likes FOR INSERT WITH CHECK (user_id IS NOT NULL);
CREATE POLICY "auth_del_com_likes"  ON comment_likes FOR DELETE USING (user_id IS NOT NULL);
CREATE POLICY "svc_all_com_likes"   ON comment_likes FOR ALL   USING (auth.role() = 'service_role');

-- ── RPC: toggle_comment_like ─────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_comment_like(p_comment_id UUID, p_user_id TEXT)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM comment_likes
    WHERE comment_id = p_comment_id AND user_id = p_user_id
  ) INTO v_exists;

  IF v_exists THEN
    DELETE FROM comment_likes
    WHERE comment_id = p_comment_id AND user_id = p_user_id;
    UPDATE comments
    SET likes_count = GREATEST(0, likes_count - 1)
    WHERE id = p_comment_id;
    RETURN json_build_object('liked', false);
  ELSE
    INSERT INTO comment_likes (comment_id, user_id)
    VALUES (p_comment_id, p_user_id)
    ON CONFLICT DO NOTHING;
    UPDATE comments
    SET likes_count = likes_count + 1
    WHERE id = p_comment_id;
    RETURN json_build_object('liked', true);
  END IF;
END;
$$;

-- ── 5. saved_projects ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS saved_projects (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT        NOT NULL,
  project_id UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, project_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_user    ON saved_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_project ON saved_projects(project_id);

ALTER TABLE saved_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own_read_saved"  ON saved_projects;
DROP POLICY IF EXISTS "own_ins_saved"   ON saved_projects;
DROP POLICY IF EXISTS "own_del_saved"   ON saved_projects;
DROP POLICY IF EXISTS "svc_all_saved"   ON saved_projects;

-- Users can only see their own saved projects
CREATE POLICY "own_read_saved"  ON saved_projects FOR SELECT
  USING (user_id = auth.uid()::text OR auth.role() = 'service_role');
CREATE POLICY "own_ins_saved"   ON saved_projects FOR INSERT
  WITH CHECK (user_id IS NOT NULL);
CREATE POLICY "own_del_saved"   ON saved_projects FOR DELETE
  USING (user_id IS NOT NULL);
CREATE POLICY "svc_all_saved"   ON saved_projects FOR ALL
  USING (auth.role() = 'service_role');

-- ── 6. Auto-recalculate project avg_rating + reviews_count ───

CREATE OR REPLACE FUNCTION update_project_review_stats(p_project_id UUID)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_count INTEGER;
  v_avg   NUMERIC(3,2);
BEGIN
  SELECT COUNT(*), COALESCE(AVG(rating), 0)
  INTO v_count, v_avg
  FROM project_reviews
  WHERE project_id = p_project_id AND status = 'approved';

  UPDATE projects
  SET reviews_count = v_count,
      avg_rating    = ROUND(v_avg, 2)
  WHERE id = p_project_id;
END;
$$;

CREATE OR REPLACE FUNCTION trg_review_stats()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM update_project_review_stats(OLD.project_id);
  ELSE
    PERFORM update_project_review_stats(NEW.project_id);
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_review_stats_upd ON project_reviews;
CREATE TRIGGER trg_review_stats_upd
  AFTER INSERT OR UPDATE OR DELETE ON project_reviews
  FOR EACH ROW EXECUTE FUNCTION trg_review_stats();

-- ── Done ─────────────────────────────────────────────────────
-- After running this file:
-- 1. Enable Realtime for: comments, project_reviews
--    Dashboard → Database → Replication → Tables
-- 2. npm install yet-another-react-lightbox
