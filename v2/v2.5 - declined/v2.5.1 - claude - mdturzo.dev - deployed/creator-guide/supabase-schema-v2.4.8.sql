-- ============================================================
-- supabase-schema-v2.4.8.sql
-- Changes from v2.4.7:
--   1. about_* tables — NEW: about_goals, about_values, about_timeline,
--                       about_skills, about_languages, about_connect
--      (replaces aboutData.js; reusable across pages)
--   2. site_settings  — NEW key: 'default_theme' ('light'|'dark')
--   3. All tables now have meaningful names with proper RLS
--      (public read, admin write — edit access private for now)
-- ============================================================

-- ── 0. HELPER ────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. ABOUT — Goals ─────────────────────────────────────────
-- Used by: AboutGoals.jsx
CREATE TABLE IF NOT EXISTS about_goals (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  period      TEXT        NOT NULL,        -- 'Short-Term' | 'Mid-Term' | 'Long-Term'
  subtitle    TEXT,                        -- '2026', '2026–2028', 'Future'
  color       TEXT        DEFAULT '#3B82F6',
  icon_name   TEXT,                        -- FA icon name e.g. 'faFlag'
  progress    INT         DEFAULT 50,      -- 0-100 %
  items       TEXT[]      DEFAULT '{}',    -- list of goal items
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about_goals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_goals"  ON about_goals;
DROP POLICY IF EXISTS "admin_all_goals" ON about_goals;
CREATE POLICY "pub_read_goals"  ON about_goals FOR SELECT USING (true);
CREATE POLICY "admin_all_goals" ON about_goals FOR ALL   USING (is_admin());

-- Seed data
INSERT INTO about_goals (period, subtitle, color, icon_name, progress, items, sort_order) VALUES
  ('Short-Term', '2026',       '#3B82F6', 'faFlag',     85, ARRAY['Complete SSC exam (SSC-26)', 'Launch mdturzo.web.app', 'Improve JavaScript skills', 'Begin advanced frameworks'], 1),
  ('Mid-Term',   '2026–2028',  '#10B981', 'faBullseye', 50, ARRAY['Enroll in HSC (Science group)', 'Master full-stack web dev', 'Start halal freelancing', 'Build real client projects'], 2),
  ('Long-Term',  'Future',     '#8B5CF6', 'faMountain', 25, ARRAY['BSc in Computer Science & Engineering', 'Professional full-stack developer', 'Ethical freelancing career', 'Build beneficial technology'], 3)
ON CONFLICT DO NOTHING;

-- ── 2. ABOUT — Values & Hobbies ──────────────────────────────
-- Used by: AboutValues.jsx
CREATE TABLE IF NOT EXISTS about_values (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT        NOT NULL CHECK (type IN ('value', 'hobby')),
  icon_name   TEXT,
  color       TEXT        DEFAULT '#3B82F6',
  title       TEXT        NOT NULL,
  description TEXT,
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about_values ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_values"  ON about_values;
DROP POLICY IF EXISTS "admin_all_values" ON about_values;
CREATE POLICY "pub_read_values"  ON about_values FOR SELECT USING (true);
CREATE POLICY "admin_all_values" ON about_values FOR ALL   USING (is_admin());

-- Seed values
INSERT INTO about_values (type, icon_name, color, title, description, sort_order) VALUES
  ('value', 'faMosque',   '#10B981', 'Islam First',      'All work follows Islamic & ethical principles. Halal income is non-negotiable.', 1),
  ('value', 'faDumbbell', '#3B82F6', 'Discipline',       'Structured routines, focused sessions, and consistent daily effort.',           2),
  ('value', 'faBrain',    '#8B5CF6', 'Useful Knowledge', 'Only learning things with real practical value — no wasted effort.',            3),
  ('value', 'faShield',   '#F59E0B', 'Honesty',          'Quality work speaks for itself. No shortcuts, no showing off.',                 4),
  ('value', 'faMedal',    '#EC4899', 'Perfection',       'Spending whatever time it takes to get things exactly right.',                  5),
  ('value', 'faUsers',    '#06B6D4', 'Community',        'Building tech that genuinely benefits people around me.',                       6),
  ('hobby', 'faMosque',   '#10B981', 'Prayer (Salah)',   NULL, 1),
  ('hobby', 'faCode',     '#3B82F6', 'Programming',      NULL, 2),
  ('hobby', 'faDumbbell', '#8B5CF6', 'Outdoor Games',    NULL, 3),
  ('hobby', 'faBicycle',  '#F59E0B', 'Cycling',          NULL, 4),
  ('hobby', 'faGlobe',    '#EC4899', 'Travelling',       NULL, 5),
  ('hobby', 'faBook',     '#06B6D4', 'Reading',          NULL, 6),
  ('hobby', 'faSeedling', '#10B981', 'Learning',         NULL, 7),
  ('hobby', 'faCamera',   '#F59E0B', 'Editing',          NULL, 8)
ON CONFLICT DO NOTHING;

-- ── 3. ABOUT — Education Timeline ────────────────────────────
-- Used by: AboutTimeline.jsx
CREATE TABLE IF NOT EXISTS about_timeline (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  period      TEXT        NOT NULL,   -- '2013–2014'
  short_label TEXT,                   -- '2013-14' (arc nav)
  hover_label TEXT,                   -- '2013 - 2014' (tooltip)
  school      TEXT        NOT NULL,
  level       TEXT        NOT NULL,   -- 'Nursery & KG', 'Class 1, 2 & 3'
  description TEXT,
  color       TEXT        DEFAULT '#10B981',
  icon_name   TEXT        DEFAULT 'faSchool',
  is_current  BOOLEAN     DEFAULT false,
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about_timeline ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_timeline"  ON about_timeline;
DROP POLICY IF EXISTS "admin_all_timeline" ON about_timeline;
CREATE POLICY "pub_read_timeline"  ON about_timeline FOR SELECT USING (true);
CREATE POLICY "admin_all_timeline" ON about_timeline FOR ALL   USING (is_admin());

-- Seed timeline
INSERT INTO about_timeline (period, short_label, hover_label, school, level, description, color, icon_name, is_current, sort_order) VALUES
  ('2013–2014', '2013-14', '2013 - 2014', 'St. Geroza School, Saidpur',          'Nursery & KG',  'First steps in formal education. Curiosity and wonder began here.',                       '#10B981', 'faSchool',      false, 1),
  ('2015–2017', '2015-17', '2015 - 2017', 'St. Geroza School, Saidpur',          'Class 1, 2 & 3','Primary education. Developed curiosity for technology and reading.',                       '#3B82F6', 'faBook',        false, 2),
  ('2018–2019', '2018-19', '2018 - 2019', 'Tulshiram Govt. Primary School',      'Class 4 & 5',   'Completed primary cycle. Top student in science subjects.',                                '#8B5CF6', 'faTrophy',      false, 3),
  ('2020',      '2020',    '2020',         'Lions School & College, Saidpur',     'Class 6',       'Briefly enrolled before transitioning to SGSC.',                                          '#F59E0B', 'faSchool',      false, 4),
  ('2021–2025', '2021-25', '2021 - 2025', 'Saidpur Govt. Science College (SGSC)','Class 6–10',    'Science group. Deepened interest in programming and web development.',                    '#EC4899', 'faFlask',       false, 5),
  ('2026',      '2026',    '2026',         'Saidpur Govt. Science College (SGSC)','SSC-26',        'SSC exam in progress (mid-2026). Goal: HSC → CSE degree.',                               '#3B82F6', 'faGraduationCap', true, 6)
ON CONFLICT DO NOTHING;

-- ── 4. ABOUT — Skills ────────────────────────────────────────
-- Used by: AboutSkills.jsx
CREATE TABLE IF NOT EXISTS about_skills (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  category    TEXT        NOT NULL CHECK (category IN ('dev', 'design', 'video', 'tools')),
  name        TEXT        NOT NULL,
  percentage  INT         NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  color       TEXT        DEFAULT '#3B82F6',
  note        TEXT,
  icon_name   TEXT,
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about_skills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_skills"  ON about_skills;
DROP POLICY IF EXISTS "admin_all_skills" ON about_skills;
CREATE POLICY "pub_read_skills"  ON about_skills FOR SELECT USING (true);
CREATE POLICY "admin_all_skills" ON about_skills FOR ALL   USING (is_admin());

-- Seed skills
INSERT INTO about_skills (category, name, percentage, color, note, icon_name, sort_order) VALUES
  -- Dev
  ('dev', 'AI Tools & Workflows', 90, '#10B981', 'Daily use — coding, design, planning', 'faBrain', 1),
  ('dev', 'HTML',                 80, '#F97316', 'Semantic markup, layouts',             'faCode',  2),
  ('dev', 'CSS',                  80, '#3B82F6', 'Animations, responsive',              'faCode',  3),
  ('dev', 'Git & GitHub',         78, '#64748B', 'Version control',                     'faGithub',4),
  ('dev', 'Python',               60, '#EAB308', 'Scripting, learning',                 'faCode',  5),
  ('dev', 'JavaScript',           45, '#F59E0B', 'Improving daily',                     'faCode',  6),
  ('dev', 'Java',                 35, '#EC4899', 'Basic knowledge',                     'faCode',  7),
  -- Design
  ('design', 'Logo Design',         80, '#EC4899', NULL, 'faPalette',   1),
  ('design', 'Banner Design',       75, '#8B5CF6', NULL, 'faPalette',   2),
  ('design', 'Thumbnail Design',    78, '#3B82F6', NULL, 'faCamera',    3),
  ('design', 'Business Card',       70, '#10B981', NULL, 'faHandshake', 4),
  ('design', 'Poster Design',       72, '#F59E0B', NULL, 'faGlobe',     5),
  ('design', 'Album / Book Design', 65, '#F97316', NULL, 'faBook',      6),
  ('design', 'HTML & CSS Design',   75, '#06B6D4', NULL, 'faCode',      7),
  -- Video
  ('video', 'YouTube Videos',              70, '#EF4444', NULL, NULL, 1),
  ('video', 'Facebook Videos',             65, '#3B82F6', NULL, NULL, 2),
  ('video', 'Ads & Commercials',           55, '#F59E0B', NULL, NULL, 3),
  ('video', 'Short Videos (Reels/Shorts)', 72, '#EC4899', NULL, NULL, 4),
  ('video', 'Basic Animation Videos',      50, '#8B5CF6', NULL, NULL, 5),
  -- Tools
  ('tools', 'VS Code',           85, '#007ACC', NULL, 'faTerminal',   1),
  ('tools', 'GitHub',            75, '#94A3B8', NULL, 'faGithub',     2),
  ('tools', 'Firebase',          65, '#F59E0B', NULL, 'faGears',      3),
  ('tools', 'Google Sheets API', 60, '#10B981', NULL, 'faGlobe',      4),
  ('tools', 'Browser DevTools',  70, '#06B6D4', NULL, 'faCode',       5),
  ('tools', 'Tailwind CSS',      60, '#38BDF8', NULL, 'faCode',       6),
  ('tools', 'Figma',             45, '#A855F7', NULL, 'faPalette',    7),
  ('tools', 'Odoo',              55, '#714B67', NULL, 'faLaptopCode', 8)
ON CONFLICT DO NOTHING;

-- ── 5. ABOUT — Languages ─────────────────────────────────────
-- Used by: AboutLanguages.jsx
CREATE TABLE IF NOT EXISTS about_languages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,   -- 'Bengali (বাংলা)'
  level       TEXT        NOT NULL,   -- 'Native' | 'Intermediate' | 'Conversational'
  percentage  INT         NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  color       TEXT        DEFAULT '#3B82F6',
  flag_code   TEXT,                   -- ISO 2-letter: 'bd', 'gb', 'in', 'pk'
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about_languages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_langs"  ON about_languages;
DROP POLICY IF EXISTS "admin_all_langs" ON about_languages;
CREATE POLICY "pub_read_langs"  ON about_languages FOR SELECT USING (true);
CREATE POLICY "admin_all_langs" ON about_languages FOR ALL   USING (is_admin());

-- Seed languages
INSERT INTO about_languages (name, level, percentage, color, flag_code, sort_order) VALUES
  ('Bengali (বাংলা)', 'Native',         95, '#3B82F6', 'bd', 1),
  ('English',          'Intermediate',   65, '#10B981', 'gb', 2),
  ('Hindi (हिन्दी)',   'Conversational', 55, '#F59E0B', 'in', 3),
  ('Urdu (اُرْدُو)',   'Conversational', 45, '#EC4899', 'pk', 4)
ON CONFLICT DO NOTHING;

-- ── 6. ABOUT — Social / Connect ──────────────────────────────
-- Used by: AboutConnect.jsx
CREATE TABLE IF NOT EXISTS about_connect (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  platform    TEXT        NOT NULL,   -- 'GitHub', 'LinkedIn', ...
  handle      TEXT,                   -- 'muhtasim-rahman'
  url         TEXT        NOT NULL,
  svg_path    TEXT,                   -- '/icons/social/github.svg'
  color       TEXT        DEFAULT '#6e7681',
  bg_color    TEXT,
  invert_dark BOOLEAN     DEFAULT false,
  is_featured BOOLEAN     DEFAULT false,
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about_connect ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_connect"  ON about_connect;
DROP POLICY IF EXISTS "admin_all_connect" ON about_connect;
CREATE POLICY "pub_read_connect"  ON about_connect FOR SELECT USING (true);
CREATE POLICY "admin_all_connect" ON about_connect FOR ALL   USING (is_admin());

-- Seed connect
INSERT INTO about_connect (platform, handle, url, svg_path, color, bg_color, invert_dark, is_featured, sort_order) VALUES
  ('GitHub',      'muhtasim-rahman',       'https://github.com/muhtasim-rahman',       '/icons/social/github.svg',    '#6e7681', '#24292e',  true,  true,  1),
  ('LinkedIn',    'mdturzo999',            'https://linkedin.com/in/mdturzo999',        '/icons/social/linkedin.svg',  '#0A66C2', '#0A66C2',  false, true,  2),
  ('YouTube',     '@mdturzo999',           'https://youtube.com/@mdturzo999',           '/icons/social/youtube.svg',   '#FF0000', '#FF0000',  false, true,  3),
  ('Facebook',    'mdturzo999',            'https://facebook.com/mdturzo999',           '/icons/social/facebook.svg',  '#1877F2', '#1877F2',  false, false, 4),
  ('Instagram',   '@mdturzo999',           'https://instagram.com/mdturzo999',          '/icons/social/instagram.svg', '#E1306C', '#E1306C',  false, false, 5),
  ('X / Twitter', '@mdturzo999',           'https://twitter.com/mdturzo999',            '/icons/social/x-twitter.svg', '#94A3B8', '#1C1C1C',  true,  false, 6),
  ('Telegram',    '@mdturzo16',            'https://t.me/mdturzo16',                    '/icons/social/telegram.svg',  '#26A5E4', '#26A5E4',  false, false, 7),
  ('TikTok',      '@mdturzo16',            'https://tiktok.com/@mdturzo16',             '/icons/social/tiktok.svg',    '#EE1D52', '#010101',  true,  false, 8),
  ('Threads',     '@mdturzo999',           'https://www.threads.net/mdturzo999',        '/icons/social/threads.svg',   '#94A3B8', '#101010',  true,  false, 9),
  ('Email',       'mdturzo.dev@gmail.com', 'mailto:mdturzo.dev@gmail.com',              NULL,                          '#F59E0B', NULL,       false, false, 10)
ON CONFLICT DO NOTHING;

-- ── 7. SITE_SETTINGS — add default_theme ─────────────────────
-- Website default theme (admin-managed); user preference overrides via localStorage
INSERT INTO site_settings (key, value) VALUES
  ('default_theme',   '"light"'),
  ('stats_years_dev',    '"3+"'),
  ('stats_years_design', '"6+"'),
  ('stats_projects',     '"19"'),
  ('available_for_work', 'true'),
  ('cv_enabled',         'false'),
  ('cv_url',             '""'),
  ('cookie_banner',      'true'),
  ('maintenance',        'false'),
  ('comment_auto_approve', 'false')
ON CONFLICT (key) DO NOTHING;

-- ── 8. INDEXES ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_about_goals_sort    ON about_goals(sort_order);
CREATE INDEX IF NOT EXISTS idx_about_values_type   ON about_values(type, sort_order);
CREATE INDEX IF NOT EXISTS idx_about_timeline_sort ON about_timeline(sort_order);
CREATE INDEX IF NOT EXISTS idx_about_skills_cat    ON about_skills(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_about_langs_sort    ON about_languages(sort_order);
CREATE INDEX IF NOT EXISTS idx_about_connect_feat  ON about_connect(is_featured, sort_order);

-- ============================================================
-- DONE — Run this in Supabase SQL Editor (New Query → Run)
-- The projects table from v2.4.7 is unchanged.
-- All about_* tables are admin-write / public-read.
-- ============================================================
