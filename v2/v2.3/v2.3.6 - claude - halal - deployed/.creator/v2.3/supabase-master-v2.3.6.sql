-- ============================================================
-- SUPABASE MASTER SCHEMA — v2.3.6
-- ============================================================
-- Run this AFTER `supabase-hard-reset.sql` on a completely empty
-- `public` schema. This single file rebuilds everything the site
-- needs through v2.3.6:
--
--   PART A — the v2.0 foundation (18 tables, recreated faithfully
--            from what src/services/supabase.js + the rest of the
--            codebase actually query/expect -- the original
--            supabase-schema-v2.0.0.sql file wasn't in this batch
--            of uploads, so this is a careful reconstruction, not
--            a blind copy. Re-check column names against your own
--            historical SQL files if you still have them, before
--            relying on this 100% for a production system with
--            existing data you care about.)
--   PART B — the 7 new `about_*` tables added in v2.3.6 (About page
--            migrated off hardcoded JS onto Supabase)
--   PART C — Row Level Security policies for everything
--   PART D — indexes
--   PART E — seed data (site_settings defaults + the exact About
--            page content that's currently hardcoded in the React
--            components, so the About page looks identical before
--            and after this migration)
--
-- HOW TO RUN:
--   Supabase Dashboard -> SQL Editor -> paste this whole file -> Run
--   (takes a few seconds, it's all DDL + small INSERTs)
--
-- A NOTE ON SECURITY MODEL:
--   This project uses Firebase Auth for login, NOT Supabase Auth --
--   so Postgres has no `auth.uid()` to check against. The anon key
--   is used directly from the browser. RLS below is written for
--   that reality: public tables are open for SELECT (filtered to
--   published/approved rows where relevant), user-submitted content
--   (comments/reviews/reports/messages) allows INSERT but forces
--   status='pending' so nothing can self-publish, and anything
--   admin-only has NO public write policy at all (only the
--   service_role key, used server-side, can write -- service_role
--   always bypasses RLS). When v2.7.0 (Auth) and v2.10.0 (Admin
--   Panel) are actually built, revisit the `users`/`likes`/`comments`
--   policies below -- right now they're intentionally permissive at
--   the row-ownership level because there's no Postgres-verifiable
--   identity yet to scope them tighter.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- PART A — v2.0 FOUNDATION (18 tables)
-- ============================================================

-- ── users ───────────────────────────────────────────────────
-- Mirrors Firebase Auth users (id = Firebase UID, stored as text).
create table public.users (
  id           text primary key,              -- Firebase UID
  username     text unique,
  display_name text,
  email        text,
  photo_url    text,
  banner_url   text,
  bio          text,
  website      text,
  email_verified boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── admins ──────────────────────────────────────────────────
-- Double-check list -- Firebase RTDB /admins/{uid} is primary,
-- this is the Supabase-side backup check (useAdmin.js / checkIsAdminInRTDB).
create table public.admins (
  uid        text primary key,
  email      text,
  added_at   timestamptz not null default now()
);

-- ── projects ────────────────────────────────────────────────
-- Columns match exactly what getFeaturedProjects/getPublishedProjects/
-- getProjectBySlug/getProjectCount (services/supabase.js) and ProjectCard
-- (components/projects/ProjectCard.jsx) actually use as of v2.3.6.
-- NOTE: this is intentionally the simpler v2.0-era shape -- the 60+
-- column "mega schema" from the abandoned v2.4.4 redesign is NOT
-- included here. That richer schema gets reintroduced properly when
-- the Projects page work actually resumes (post v2.3.6).
create table public.projects (
  id                bigserial primary key,
  slug              text unique not null,
  title             text not null,
  short_description text,
  thumbnail_url     text,
  github_link       text,
  live_link         text,
  category          text,
  tags              text[] not null default '{}',
  accent            text,                      -- optional override hex color for the card
  status            text not null default 'draft' check (status in ('draft','published','archived')),
  visibility        text not null default 'private' check (visibility in ('public','private')),
  is_featured       boolean not null default false,
  featured_order    smallint,
  views_count       integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ── feed ────────────────────────────────────────────────────
-- Combined blogs+posts table (type column distinguishes them) --
-- this was the original v2.0 design before the later (abandoned)
-- v2.5.x split into separate `blogs`/`posts` tables. Matches
-- getFeedItems/getFeedItemBySlug in services/supabase.js.
create table public.feed (
  id          bigserial primary key,
  type        text not null check (type in ('blog','post')),
  slug        text unique not null,
  title       text,
  content     text,                            -- TipTap HTML (blogs) or plain text (posts)
  thumbnail_url text,
  category    text,
  tags        text[] not null default '{}',
  author_id   text references public.users(id) on delete set null,
  status      text not null default 'draft' check (status in ('draft','published','archived')),
  visibility  text not null default 'private' check (visibility in ('public','private')),
  views_count integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── comments ────────────────────────────────────────────────
-- Generic comments, attachable to any content type (project, feed
-- item, etc) via content_type + content_id. Matches the
-- "login + email-verified, max 1000 chars, 10/day limit, pending →
-- admin approves" moderation flow described in the project notes.
create table public.comments (
  id           bigserial primary key,
  content_type text not null,                  -- 'project' | 'feed' | ...
  content_id   text not null,                   -- slug or id of the thing being commented on
  user_id      text references public.users(id) on delete cascade,
  body         text not null check (char_length(body) <= 1000),
  status       text not null default 'pending' check (status in ('pending','approved','rejected')),
  parent_id    bigint references public.comments(id) on delete cascade,
  created_at   timestamptz not null default now()
);

-- ── likes ───────────────────────────────────────────────────
-- Generic like/dislike, toggle model (same action again = remove).
create table public.likes (
  id           bigserial primary key,
  content_type text not null,
  content_id   text not null,
  user_id      text not null references public.users(id) on delete cascade,
  reaction     text not null default 'like' check (reaction in ('like','dislike')),
  created_at   timestamptz not null default now(),
  unique (content_type, content_id, user_id)
);

-- ── reports ─────────────────────────────────────────────────
-- ReportButton.jsx (planned v2.4.x) -- 6 reasons, max 300 chars, modal.
create table public.reports (
  id           bigserial primary key,
  content_type text not null,
  content_id   text not null,
  user_id      text references public.users(id) on delete set null,
  reason       text not null,
  details      text check (char_length(details) <= 300),
  status       text not null default 'open' check (status in ('open','reviewed','dismissed')),
  created_at   timestamptz not null default now()
);

-- ── reviews ─────────────────────────────────────────────────
-- Site-wide testimonials/reviews shown in home/Reviews.jsx
-- (getApprovedReviews). NOT the same as a future per-project review
-- system -- this is the general "reviews about working with me" table.
create table public.reviews (
  id         bigserial primary key,
  user_id    text references public.users(id) on delete set null,
  rating     smallint not null check (rating between 1 and 5),
  body       text not null,
  status     text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

-- ── messages ────────────────────────────────────────────────
-- Contact form submissions (Contact.jsx -- full form planned v2.6.0).
create table public.messages (
  id         bigserial primary key,
  name       text not null,
  email      text not null,
  subject    text,
  body       text not null,
  status     text not null default 'unread' check (status in ('unread','read','replied','archived')),
  created_at timestamptz not null default now()
);

-- ── badges ──────────────────────────────────────────────────
create table public.badges (
  id          bigserial primary key,
  key         text unique not null,
  label       text not null,
  description text,
  icon_key    text,
  color       text default '#3B82F6',
  created_at  timestamptz not null default now()
);

-- ── user_badges ─────────────────────────────────────────────
-- Joined as `badges:user_badges(badge_id, badges(*))` in getUserByUsername.
create table public.user_badges (
  id        bigserial primary key,
  user_id   text not null references public.users(id) on delete cascade,
  badge_id  bigint not null references public.badges(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

-- ── notifications ───────────────────────────────────────────
-- Firebase RTDB is the primary/realtime channel -- this table is the
-- Supabase-side backup/history (per project notes).
create table public.notifications (
  id          bigserial primary key,
  user_id     text not null references public.users(id) on delete cascade,
  type        text not null,
  title       text,
  body        text,
  link        text,
  created_at  timestamptz not null default now()
);

-- ── notification_reads ──────────────────────────────────────
create table public.notification_reads (
  id              bigserial primary key,
  notification_id bigint not null references public.notifications(id) on delete cascade,
  user_id         text not null references public.users(id) on delete cascade,
  read_at         timestamptz not null default now(),
  unique (notification_id, user_id)
);

-- ── activity_logs ───────────────────────────────────────────
-- Written by logActivity() in services/supabase.js.
create table public.activity_logs (
  id          bigserial primary key,
  user_id     text references public.users(id) on delete set null,
  action      text not null,
  details     jsonb not null default '{}',
  device_info jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

-- ── site_settings ───────────────────────────────────────────
-- Key-value store. getSiteSettings() selects (key, value) and reduces
-- into a single object. See PART E for the actual seeded keys.
create table public.site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ── page_visibility ─────────────────────────────────────────
-- VisibilityGuard.jsx reads this per page (e.g. "projects" -> hidden
-- while under construction).
create table public.page_visibility (
  page       text primary key,
  visibility text not null default 'public' check (visibility in ('public','hidden')),
  updated_at timestamptz not null default now()
);

-- ── spam_tracking ───────────────────────────────────────────
create table public.spam_tracking (
  id         bigserial primary key,
  ip_address text,
  action     text not null,            -- e.g. 'comment', 'message', 'report'
  created_at timestamptz not null default now()
);

-- ── analytics ───────────────────────────────────────────────
-- Written by trackPage() / services/analytics.js.
create table public.analytics (
  id         bigserial primary key,
  page       text,
  event      text not null default 'pageview',
  user_id    text references public.users(id) on delete set null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);


-- ============================================================
-- PART B — ABOUT PAGE TABLES (new in v2.3.6)
-- All public-readable, admin-write-only (service_role / future admin
-- panel). `sort_order` controls display order -- an admin panel can
-- just update this column to reorder content, no code changes needed.
-- ============================================================

-- ── about_timeline ──────────────────────────────────────────
-- Academic timeline arc (AboutTimeline.jsx).
create table public.about_timeline (
  id          bigserial primary key,
  period      text not null,
  short_label text not null,
  hover_label text not null,
  school      text not null,
  level       text not null,
  description text not null,
  color       text not null default '#3B82F6',
  icon_key    text not null default 'school',   -- school|book|flask|graduation-cap|trophy|rocket|atom
  is_current  boolean not null default false,
  is_upcoming boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── about_skills ────────────────────────────────────────────
-- AboutSkills.jsx -- 4 groups (dev/design/video/tools) in one table.
create table public.about_skills (
  id         bigserial primary key,
  group_key  text not null check (group_key in ('dev','design','video','tools')),
  name       text not null,
  pct        smallint not null default 0 check (pct between 0 and 100),
  color      text not null default '#3B82F6',
  note       text,                                -- dev group only
  icon_key   text,                                 -- design/tools groups only
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── about_languages ─────────────────────────────────────────
create table public.about_languages (
  id         bigserial primary key,
  lang       text not null,
  level      text not null,
  pct        smallint not null default 0 check (pct between 0 and 100),
  color      text not null default '#3B82F6',
  flag_code  text,                                  -- ISO country code for the flag icon, e.g. 'bd'
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── about_values ────────────────────────────────────────────
create table public.about_values (
  id          bigserial primary key,
  title       text not null,
  description text not null,
  color       text not null default '#3B82F6',
  icon_key    text not null default 'heart',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── about_hobbies ───────────────────────────────────────────
create table public.about_hobbies (
  id         bigserial primary key,
  label      text not null,
  icon_key   text not null default 'heart',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── about_goals ─────────────────────────────────────────────
create table public.about_goals (
  id         bigserial primary key,
  period     text not null,                         -- 'Short-Term' | 'Mid-Term' | 'Long-Term' | ...
  subtitle   text not null,
  color      text not null default '#3B82F6',
  icon_key   text not null default 'flag',
  pct        smallint not null default 0 check (pct between 0 and 100),
  items      jsonb not null default '[]',            -- array of strings
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── about_connect ───────────────────────────────────────────
create table public.about_connect (
  id          bigserial primary key,
  label       text not null,
  handle      text,
  url         text not null,
  color       text not null default '#3B82F6',
  svg_src     text,                                  -- e.g. '/icons/social/github.svg'
  invert_dark boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);


-- ============================================================
-- PART C — ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on every table
alter table public.users                 enable row level security;
alter table public.admins                enable row level security;
alter table public.projects              enable row level security;
alter table public.feed                  enable row level security;
alter table public.comments              enable row level security;
alter table public.likes                 enable row level security;
alter table public.reports               enable row level security;
alter table public.reviews               enable row level security;
alter table public.messages              enable row level security;
alter table public.badges                enable row level security;
alter table public.user_badges           enable row level security;
alter table public.notifications         enable row level security;
alter table public.notification_reads    enable row level security;
alter table public.activity_logs         enable row level security;
alter table public.site_settings         enable row level security;
alter table public.page_visibility       enable row level security;
alter table public.spam_tracking         enable row level security;
alter table public.analytics             enable row level security;
alter table public.about_timeline        enable row level security;
alter table public.about_skills          enable row level security;
alter table public.about_languages       enable row level security;
alter table public.about_values          enable row level security;
alter table public.about_hobbies         enable row level security;
alter table public.about_goals           enable row level security;
alter table public.about_connect         enable row level security;

-- users -- public profile lookups (getUserByUID/getUserByUsername); writes
-- are open for now since there's no Postgres-verifiable Firebase identity
-- yet (tighten this once v2.7.0 Auth design lands).
create policy "users_select_all"   on public.users   for select using (true);
create policy "users_insert_open"  on public.users   for insert with check (true);
create policy "users_update_open"  on public.users   for update using (true);

-- admins -- public read (used for a quick double-check against RTDB), no public write
create policy "admins_select_all"  on public.admins  for select using (true);

-- projects -- only published + public rows are visible to anon
create policy "projects_select_public" on public.projects for select
  using (status = 'published' and visibility = 'public');

-- feed -- same pattern as projects
create policy "feed_select_public" on public.feed for select
  using (status = 'published' and visibility = 'public');

-- comments -- only approved comments are publicly visible; anyone can
-- submit a new one but it always lands as 'pending' (can't self-approve)
create policy "comments_select_approved" on public.comments for select
  using (status = 'approved');
create policy "comments_insert_pending" on public.comments for insert
  with check (status = 'pending');

-- likes -- open toggle model (matches the rest of this MVP's trust level)
create policy "likes_select_all"  on public.likes for select using (true);
create policy "likes_insert_open" on public.likes for insert with check (true);
create policy "likes_delete_open" on public.likes for delete using (true);

-- reports -- write-only from the public side (admin reviews via service_role)
create policy "reports_insert_open" on public.reports for insert with check (status = 'open');

-- reviews -- same approve-gate pattern as comments
create policy "reviews_select_approved" on public.reviews for select
  using (status = 'approved');
create policy "reviews_insert_pending" on public.reviews for insert
  with check (status = 'pending');

-- messages -- write-only (contact form submissions are not publicly readable)
create policy "messages_insert_open" on public.messages for insert with check (status = 'unread');

-- badges / user_badges -- public read (shown on profiles)
create policy "badges_select_all"      on public.badges      for select using (true);
create policy "user_badges_select_all" on public.user_badges for select using (true);

-- notifications -- public read for now (Firebase RTDB is the real-time
-- primary channel; this table is just backup/history)
create policy "notifications_select_all"       on public.notifications       for select using (true);
create policy "notification_reads_select_all"  on public.notification_reads  for select using (true);
create policy "notification_reads_insert_open"  on public.notification_reads  for insert with check (true);

-- activity_logs / analytics / spam_tracking -- write-only logging tables,
-- never publicly readable
create policy "activity_logs_insert_open" on public.activity_logs for insert with check (true);
create policy "analytics_insert_open"     on public.analytics     for insert with check (true);
create policy "spam_tracking_insert_open" on public.spam_tracking for insert with check (true);

-- site_settings / page_visibility -- public read, no public write
create policy "site_settings_select_all"   on public.site_settings   for select using (true);
create policy "page_visibility_select_all" on public.page_visibility for select using (true);

-- about_* -- public read, no public write (admin-only via service_role,
-- wired up properly once the v2.10.0 Admin Panel exists)
create policy "about_timeline_select_all"  on public.about_timeline  for select using (true);
create policy "about_skills_select_all"    on public.about_skills    for select using (true);
create policy "about_languages_select_all" on public.about_languages for select using (true);
create policy "about_values_select_all"    on public.about_values    for select using (true);
create policy "about_hobbies_select_all"   on public.about_hobbies   for select using (true);
create policy "about_goals_select_all"     on public.about_goals     for select using (true);
create policy "about_connect_select_all"   on public.about_connect   for select using (true);


-- ============================================================
-- PART D — INDEXES
-- ============================================================

create index idx_projects_featured   on public.projects (is_featured, featured_order) where status = 'published' and visibility = 'public';
create index idx_projects_status     on public.projects (status, visibility);
create index idx_projects_slug       on public.projects (slug);
create index idx_feed_type_status    on public.feed (type, status, visibility);
create index idx_feed_slug           on public.feed (slug);
create index idx_comments_content    on public.comments (content_type, content_id, status);
create index idx_likes_content       on public.likes (content_type, content_id);
create index idx_reviews_status      on public.reviews (status);
create index idx_activity_logs_user  on public.activity_logs (user_id, created_at desc);
create index idx_analytics_page      on public.analytics (page, created_at desc);
create index idx_notifications_user  on public.notifications (user_id, created_at desc);

create index idx_about_timeline_sort  on public.about_timeline  (sort_order);
create index idx_about_skills_group   on public.about_skills    (group_key, sort_order);
create index idx_about_languages_sort on public.about_languages (sort_order);
create index idx_about_values_sort    on public.about_values    (sort_order);
create index idx_about_hobbies_sort   on public.about_hobbies   (sort_order);
create index idx_about_goals_sort     on public.about_goals     (sort_order);
create index idx_about_connect_sort   on public.about_connect   (sort_order);


-- ============================================================
-- PART E — SEED DATA
-- ============================================================

-- ── site_settings defaults ──────────────────────────────────
insert into public.site_settings (key, value) values
  ('stats_years_dev',        '3'),
  ('stats_years_design',     '3'),
  ('stats_projects',         '16'),
  ('available_for_work',     'true'),
  ('cv_url',                 'null'),
  ('cv_enabled',             'false'),
  ('cookie_banner',          'true'),
  ('maintenance',            'false'),
  ('comment_auto_approve',   'false'),
  ('dev_banner_enabled',     'true'),
  ('dev_banner_text',        '"This site is under active development — some features may be incomplete or change without notice."'),
  ('dev_banner_progress',    'null');

-- ── page_visibility defaults ─────────────────────────────────
insert into public.page_visibility (page, visibility) values
  ('home', 'public'), ('about', 'public'), ('projects', 'public'),
  ('feed', 'public'), ('blogs', 'public'), ('posts', 'public'),
  ('contact', 'public');

-- ── about_timeline ───────────────────────────────────────────
insert into public.about_timeline
  (period, short_label, hover_label, school, level, description, color, icon_key, is_current, is_upcoming, sort_order) values
  ('2013–2014',  '2013-14',  '2013 - 2014', 'St. Geroza School, Saidpur',            'Nursery & KG',                'First steps in formal education. Curiosity and wonder began here.',                  '#10B981', 'school',          false, false, 1),
  ('2015–2017',  '2015-17',  '2015 - 2017', 'St. Geroza School, Saidpur',            'Class 1, 2 & 3',               'Primary years — grew a love for reading and understanding how things work.',        '#3B82F6', 'book',            false, false, 2),
  ('2018–2019',  '2018-19',  '2018 - 2019', 'Tulshiram Govt. Primary School',        'Class 4 & 5',                  'Completed primary cycle. Science became a favourite subject.',                       '#8B5CF6', 'flask',           false, false, 3),
  ('2020',       '2020',     '2020',        'Lions School & College, Saidpur',       'Class 6',                      'Brief enrollment before transitioning to SGSC for better facilities.',               '#F59E0B', 'graduation-cap',  false, false, 4),
  ('2021–2025',  '2021-25',  '2021 - 2025', 'Saidpur Govt. Science College (SGSC)',  'Class 6 – 10',                 'Science group. Deepened passion for programming and web development.',              '#EC4899', 'school',          false, false, 5),
  ('2026',       '2026',     '2026',        'Saidpur Govt. Science College (SGSC)',  'SSC-26 Batch',                 'SSC exams in progress (mid-2026). Results expected: mid-2026. Next: HSC.',           '#3B82F6', 'trophy',          true,  false, 6),
  ('Next',       'HSC',      'Higher Secondary', 'Higher Secondary (HSC)',           'Science Group — After SSC',    'Aiming for Higher Secondary Certificate with Science group after SSC results.',      '#06B6D4', 'rocket',          false, true,  7),
  ('Dream',      'CSE',      'Computer Science & Engineering', 'University (Dream Institution)', 'BSc in CS & Engineering', 'Long-term goal — a CSE degree to become a professional full-stack developer.', '#22C55E', 'atom',            false, true,  8);

-- ── about_skills ─────────────────────────────────────────────
insert into public.about_skills (group_key, name, pct, color, note, icon_key, sort_order) values
  ('dev', 'AI Tools & Workflows', 90, '#10B981', 'Daily use — coding, design, planning', null, 1),
  ('dev', 'HTML',                 80, '#F97316', 'Semantic markup, layouts',             null, 2),
  ('dev', 'CSS',                  80, '#3B82F6', 'Animations, responsive',               null, 3),
  ('dev', 'Git & GitHub',         78, '#64748B', 'Version control',                      null, 4),
  ('dev', 'Python',               60, '#EAB308', 'Scripting, learning',                  null, 5),
  ('dev', 'JavaScript',           45, '#F59E0B', 'Improving daily',                      null, 6),
  ('dev', 'Java',                 35, '#EC4899', 'Basic knowledge',                      null, 7);

insert into public.about_skills (group_key, name, pct, color, icon_key, sort_order) values
  ('design', 'Logo Design',          82, '#EC4899', 'palette',   1),
  ('design', 'Banner Design',        78, '#8B5CF6', 'palette',   2),
  ('design', 'Thumbnail Design',     80, '#3B82F6', 'camera',    3),
  ('design', 'Business Card Design', 72, '#10B981', 'handshake', 4),
  ('design', 'Poster Design',        70, '#F59E0B', 'globe',     5),
  ('design', 'Album / Book Design',  65, '#F97316', 'book',      6),
  ('design', 'HTML & CSS Design',    75, '#06B6D4', 'code',      7);

insert into public.about_skills (group_key, name, pct, color, sort_order) values
  ('video', 'YouTube Videos',               78, '#EF4444', 1),
  ('video', 'Facebook Videos',              72, '#3B82F6', 2),
  ('video', 'Ads & Commercials',            60, '#F59E0B', 3),
  ('video', 'Short Videos (Reels/Shorts)',  70, '#EC4899', 4),
  ('video', 'Basic Animation Videos',       55, '#8B5CF6', 5);

insert into public.about_skills (group_key, name, color, icon_key, sort_order) values
  ('tools', 'VS Code',           '#007ACC', 'terminal',    1),
  ('tools', 'GitHub',            '#94A3B8', 'github',      2),
  ('tools', 'Firebase',          '#F59E0B', 'gears',       3),
  ('tools', 'Google Sheets API', '#10B981', 'globe',       4),
  ('tools', 'Browser DevTools',  '#06B6D4', 'code',        5),
  ('tools', 'Tailwind CSS',      '#38BDF8', 'code',        6),
  ('tools', 'Figma',             '#A855F7', 'palette',     7),
  ('tools', 'Odoo Builder',      '#714B67', 'laptop-code', 8);

-- ── about_languages ──────────────────────────────────────────
insert into public.about_languages (lang, level, pct, color, flag_code, sort_order) values
  ('Bengali (বাংলা)', 'Native',         95, '#3B82F6', 'bd', 1),
  ('English',          'Intermediate',   65, '#10B981', 'gb', 2),
  ('Hindi (हिन्दी)',  'Conversational', 55, '#F59E0B', 'in', 3),
  ('Urdu (اُرْدُو)',   'Conversational', 45, '#EC4899', 'pk', 4);

-- ── about_values ─────────────────────────────────────────────
insert into public.about_values (title, description, color, icon_key, sort_order) values
  ('Islam First',      'All work follows Islamic & ethical principles. Halal income is non-negotiable.', '#10B981', 'mosque',   1),
  ('Discipline',       'Structured routines, focused sessions, and consistent daily effort.',            '#3B82F6', 'dumbbell', 2),
  ('Useful Knowledge', 'Only learning things with real practical value — no wasted effort.',              '#8B5CF6', 'brain',    3),
  ('Honesty',          'Quality work speaks for itself. No shortcuts, no showing off.',                   '#F59E0B', 'shield',   4),
  ('Perfection',       'Spending whatever time it takes to get things exactly right.',                    '#EC4899', 'medal',    5),
  ('Community',        'Building tech that genuinely benefits people around me.',                         '#06B6D4', 'users',    6);

-- ── about_hobbies ────────────────────────────────────────────
insert into public.about_hobbies (label, icon_key, sort_order) values
  ('Prayer (Salah)', 'mosque',   1),
  ('Programming',    'code',     2),
  ('Outdoor Games',  'dumbbell', 3),
  ('Cycling',        'bicycle',  4),
  ('Travelling',     'globe',    5),
  ('Reading',        'book',     6),
  ('Learning',       'seedling', 7),
  ('Editing',        'camera',   8);

-- ── about_goals ──────────────────────────────────────────────
insert into public.about_goals (period, subtitle, color, icon_key, pct, items, sort_order) values
  ('Short-Term', '2026',        '#3B82F6', 'flag',     85,
    '["Complete SSC exam (SSC-26)", "Launch mdturzo.web.app", "Improve JavaScript skills", "Begin advanced frameworks"]', 1),
  ('Mid-Term',   '2026 – 2028', '#10B981', 'bullseye', 50,
    '["Enroll in HSC (Science group)", "Master full-stack web dev", "Start halal freelancing", "Build real client projects"]', 2),
  ('Long-Term',  'Future',      '#8B5CF6', 'mountain', 25,
    '["BSc in Computer Science & Engineering", "Professional full-stack developer", "Ethical freelancing career", "Build beneficial technology"]', 3);

-- ── about_connect ────────────────────────────────────────────
-- NOTE: `url` values reference the same handles already in site.config.js
-- (kept as the seeded snapshot here so an admin can update them later
-- without a redeploy). The React component falls back to SITE_CONFIG.social
-- directly if this table is ever empty/unreachable, so links never break.
insert into public.about_connect (label, handle, url, color, svg_src, invert_dark, sort_order) values
  ('GitHub',    'muhtasim-rahman', 'https://github.com/muhtasim-rahman',     '#6e7681', '/icons/social/github.svg',    true,  1),
  ('LinkedIn',  'mdturzo999',      'https://linkedin.com/in/mdturzo999',     '#0A66C2', '/icons/social/linkedin.svg',  false, 2),
  ('YouTube',   '@mdturzo999',     'https://youtube.com/@mdturzo999',        '#FF0000', '/icons/social/youtube.svg',   false, 3),
  ('Facebook',  'mdturzo999',      'https://facebook.com/mdturzo999',        '#1877F2', '/icons/social/facebook.svg',  false, 4),
  ('Instagram', '@mdturzo999',     'https://instagram.com/mdturzo999',       '#E1306C', '/icons/social/instagram.svg', false, 5),
  ('X / Twitter','@mdturzo999',    'https://twitter.com/mdturzo999',         '#94A3B8', '/icons/social/x-twitter.svg', true,  6),
  ('Telegram',  '@mdturzo16',      'https://t.me/mdturzo16',                 '#26A5E4', '/icons/social/telegram.svg',  false, 7),
  ('TikTok',    '@mdturzo16',      'https://tiktok.com/@mdturzo16',          '#EE1D52', '/icons/social/tiktok.svg',    false, 8),
  ('Threads',   '@mdturzo999',     'https://www.threads.net/mdturzo999',     '#64748B', '/icons/social/threads.svg',   true,  9),
  ('Email',     'mdturzo.dev@gmail.com', 'mailto:mdturzo.dev@gmail.com',     '#0C7C7C', '/icons/social/email.svg',     false, 10);

-- ============================================================
-- DONE. Verify with:
--   select tablename from pg_tables where schemaname = 'public' order by 1;
--   -- should return 25 rows (18 foundation + 7 about_*)
-- ============================================================
