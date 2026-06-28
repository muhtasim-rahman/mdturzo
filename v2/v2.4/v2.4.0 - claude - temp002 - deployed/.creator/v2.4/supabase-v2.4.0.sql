-- ============================================================
-- SUPABASE v2.4.0 — Projects System
-- ============================================================
-- Run AFTER supabase-master-v2.3.6.sql (which creates the base
-- `projects` table). This file:
--   PART A — ALTER projects table (add 48 new columns)
--   PART B — 3 new tables: project_ratings, project_views, comment_likes
--   PART C — Triggers (auto-update counters)
--   PART D — RPC functions (view tracking, like toggle, rating upsert)
--   PART E — RLS updates
--   PART F — Indexes
--   PART G — Seed data: 19 projects
-- ============================================================

-- ============================================================
-- PART A — ALTER projects TABLE
-- ============================================================

-- Display Info
alter table public.projects
  add column if not exists short_name          text,
  add column if not exists tagline             text,
  add column if not exists full_description_html text,
  add column if not exists challenges_html     text,
  add column if not exists learnings_html      text;

-- Media
alter table public.projects
  add column if not exists banner_url          text,
  add column if not exists og_image_url        text,
  add column if not exists demo_gif_url        text,
  add column if not exists video_url           text;

-- Links
alter table public.projects
  add column if not exists docs_link           text,
  add column if not exists figma_link          text,
  add column if not exists npm_link            text,
  add column if not exists youtube_link        text,
  add column if not exists pdf_link            text;

-- Classification
alter table public.projects
  add column if not exists sub_category        text,
  add column if not exists project_type        text,
  add column if not exists languages           text[] not null default '{}',
  add column if not exists frameworks          text[] not null default '{}',
  add column if not exists tools               text[] not null default '{}',
  add column if not exists platforms           text[] not null default '{}';

-- Timeline & Context
alter table public.projects
  add column if not exists start_date          date,
  add column if not exists end_date            date,
  add column if not exists is_ongoing          boolean not null default false,
  add column if not exists version             text,
  add column if not exists team_size           smallint not null default 1,
  add column if not exists role                text,
  add column if not exists client              text,
  add column if not exists institution         text;

-- Status additions
alter table public.projects
  add column if not exists is_pinned           boolean not null default false,
  add column if not exists pinned_order        smallint,
  add column if not exists is_wip              boolean not null default false,
  add column if not exists sort_order          integer not null default 0,
  add column if not exists published_at        timestamptz;

-- Engagement counters
alter table public.projects
  add column if not exists likes_count         integer not null default 0,
  add column if not exists dislikes_count      integer not null default 0,
  add column if not exists comments_count      integer not null default 0,
  add column if not exists shares_count        integer not null default 0,
  add column if not exists rating_count        integer not null default 0,
  add column if not exists rating_avg          numeric(3,2) not null default 0;

-- Design / Customization
alter table public.projects
  add column if not exists accent_color        text,
  add column if not exists gradient_from       text,
  add column if not exists gradient_to         text,
  add column if not exists card_style          text not null default 'default'
    check (card_style in ('default','glass','gradient','minimal','dark'));

-- Detail page layout
alter table public.projects
  add column if not exists detail_layout       text not null default 'default'
    check (detail_layout in ('default','wide','sidebar','centered')),
  add column if not exists show_github_widget  boolean not null default false,
  add column if not exists show_live_preview   boolean not null default false,
  add column if not exists live_preview_url    text;

-- Feature toggles
alter table public.projects
  add column if not exists comments_enabled    boolean not null default true,
  add column if not exists likes_enabled       boolean not null default true,
  add column if not exists shares_enabled      boolean not null default true,
  add column if not exists ratings_enabled     boolean not null default true,
  add column if not exists report_enabled      boolean not null default true,
  add column if not exists auto_approve_comments boolean not null default false;

-- SEO
alter table public.projects
  add column if not exists seo_title           text,
  add column if not exists seo_description     text,
  add column if not exists seo_keywords        text[] not null default '{}';

-- JSONB structured data
alter table public.projects
  add column if not exists features_list       jsonb not null default '[]',
  add column if not exists tech_stack_detail   jsonb not null default '[]',
  add column if not exists screenshots         jsonb not null default '[]',
  add column if not exists timeline_events     jsonb not null default '[]',
  add column if not exists key_achievements    jsonb not null default '[]',
  add column if not exists custom_sections     jsonb not null default '[]';

-- Admin / internal
alter table public.projects
  add column if not exists internal_notes      text,
  add column if not exists license             text,
  add column if not exists is_open_source      boolean not null default false,
  add column if not exists custom_cta_text     text,
  add column if not exists custom_cta_url      text;

-- Rename accent → accent_color if old column exists, keep both for compat
-- (accent was the original column; accent_color is the new explicit name)
-- We keep `accent` as-is since ProjectCard uses it, and add `accent_color`
-- so admin panel can use the more explicit name. Both can coexist.

-- ============================================================
-- PART B — NEW TABLES
-- ============================================================

-- project_ratings: one rating (1-5) per user per project
create table if not exists public.project_ratings (
  id          bigserial primary key,
  project_id  bigint not null references public.projects(id) on delete cascade,
  user_id     text   not null references public.users(id)    on delete cascade,
  rating      smallint not null check (rating between 1 and 5),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (project_id, user_id)
);

-- project_views: deduplication tracking (3-day cooldown)
create table if not exists public.project_views (
  id          bigserial primary key,
  project_id  bigint not null references public.projects(id) on delete cascade,
  viewer_key  text   not null,  -- Firebase UID OR device fingerprint (guests)
  created_at  timestamptz not null default now(),
  unique (project_id, viewer_key)
);

-- comment_likes: thumbs up/down on individual comments
create table if not exists public.comment_likes (
  id          bigserial primary key,
  comment_id  bigint not null references public.comments(id) on delete cascade,
  user_id     text   not null references public.users(id)    on delete cascade,
  reaction    text   not null default 'like' check (reaction in ('like','dislike')),
  created_at  timestamptz not null default now(),
  unique (comment_id, user_id)
);

-- ============================================================
-- PART C — TRIGGERS
-- ============================================================

-- Auto-update projects.likes_count + dislikes_count
create or replace function public.fn_sync_project_like_counts()
returns trigger language plpgsql as $$
declare
  v_slug text;
begin
  v_slug := coalesce(new.content_id, old.content_id);

  if coalesce(new.content_type, old.content_type) != 'project' then
    return coalesce(new, old);
  end if;

  update public.projects set
    likes_count    = (select count(*) from public.likes where content_type='project' and content_id=v_slug and reaction='like'),
    dislikes_count = (select count(*) from public.likes where content_type='project' and content_id=v_slug and reaction='dislike')
  where slug = v_slug;

  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_project_like_counts on public.likes;
create trigger trg_project_like_counts
  after insert or update or delete on public.likes
  for each row execute function public.fn_sync_project_like_counts();

-- Auto-update projects.comments_count
create or replace function public.fn_sync_project_comment_count()
returns trigger language plpgsql as $$
declare
  v_slug text;
begin
  v_slug := coalesce(new.content_id, old.content_id);

  if coalesce(new.content_type, old.content_type) != 'project' then
    return coalesce(new, old);
  end if;

  update public.projects set
    comments_count = (
      select count(*) from public.comments
      where content_type='project' and content_id=v_slug and status='approved'
    )
  where slug = v_slug;

  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_project_comment_count on public.comments;
create trigger trg_project_comment_count
  after insert or update or delete on public.comments
  for each row execute function public.fn_sync_project_comment_count();

-- Auto-update projects.rating_count + rating_avg
create or replace function public.fn_sync_project_rating()
returns trigger language plpgsql as $$
declare
  v_pid bigint;
begin
  v_pid := coalesce(new.project_id, old.project_id);

  update public.projects set
    rating_count = (select count(*)          from public.project_ratings where project_id = v_pid),
    rating_avg   = (select coalesce(round(avg(rating)::numeric, 2), 0) from public.project_ratings where project_id = v_pid)
  where id = v_pid;

  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_project_rating on public.project_ratings;
create trigger trg_project_rating
  after insert or update or delete on public.project_ratings
  for each row execute function public.fn_sync_project_rating();

-- Auto-update updated_at on projects
create or replace function public.fn_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.fn_set_updated_at();

drop trigger if exists trg_project_ratings_updated_at on public.project_ratings;
create trigger trg_project_ratings_updated_at
  before update on public.project_ratings
  for each row execute function public.fn_set_updated_at();

-- ============================================================
-- PART D — RPC FUNCTIONS
-- ============================================================

-- track_project_view: 3-day dedup, increments views_count
create or replace function public.track_project_view(
  p_slug      text,
  p_viewer_key text
) returns boolean language plpgsql security definer as $$
declare
  v_project_id bigint;
  v_cooldown   constant interval := '3 days';
begin
  select id into v_project_id from public.projects where slug = p_slug;
  if v_project_id is null then return false; end if;

  -- already counted within cooldown?
  if exists (
    select 1 from public.project_views
    where project_id = v_project_id
      and viewer_key  = p_viewer_key
      and created_at  > now() - v_cooldown
  ) then
    return false;
  end if;

  -- upsert view record (resets cooldown on repeat after 3 days)
  insert into public.project_views (project_id, viewer_key)
  values (v_project_id, p_viewer_key)
  on conflict (project_id, viewer_key)
  do update set created_at = now();

  -- bump counter
  update public.projects set views_count = views_count + 1 where id = v_project_id;
  return true;
end;
$$;

-- toggle_project_like: like/dislike toggle, same reaction again = remove
create or replace function public.toggle_project_like(
  p_slug     text,
  p_user_id  text,
  p_reaction text  -- 'like' | 'dislike'
) returns text language plpgsql security definer as $$
declare
  v_existing_reaction text;
  v_result            text;
begin
  select reaction into v_existing_reaction
  from public.likes
  where content_type='project' and content_id=p_slug and user_id=p_user_id;

  if v_existing_reaction is not null then
    if v_existing_reaction = p_reaction then
      -- same reaction → remove (toggle off)
      delete from public.likes
      where content_type='project' and content_id=p_slug and user_id=p_user_id;
      v_result := 'removed';
    else
      -- different reaction → switch
      update public.likes set reaction=p_reaction
      where content_type='project' and content_id=p_slug and user_id=p_user_id;
      v_result := 'switched';
    end if;
  else
    -- no existing → insert
    insert into public.likes (content_type, content_id, user_id, reaction)
    values ('project', p_slug, p_user_id, p_reaction);
    v_result := 'added';
  end if;

  return v_result;
end;
$$;

-- upsert_project_rating: insert or update a user's star rating
create or replace function public.upsert_project_rating(
  p_project_id bigint,
  p_user_id    text,
  p_rating     smallint
) returns void language plpgsql security definer as $$
begin
  insert into public.project_ratings (project_id, user_id, rating)
  values (p_project_id, p_user_id, p_rating)
  on conflict (project_id, user_id)
  do update set rating=p_rating, updated_at=now();
end;
$$;

-- increment_share_count: called when user clicks any share platform
create or replace function public.increment_share_count(p_slug text)
returns void language plpgsql security definer as $$
begin
  update public.projects set shares_count = shares_count + 1 where slug = p_slug;
end;
$$;

-- toggle_comment_like
create or replace function public.toggle_comment_like(
  p_comment_id bigint,
  p_user_id    text,
  p_reaction   text
) returns text language plpgsql security definer as $$
declare
  v_existing text;
  v_result   text;
begin
  select reaction into v_existing
  from public.comment_likes
  where comment_id=p_comment_id and user_id=p_user_id;

  if v_existing is not null then
    if v_existing = p_reaction then
      delete from public.comment_likes where comment_id=p_comment_id and user_id=p_user_id;
      v_result := 'removed';
    else
      update public.comment_likes set reaction=p_reaction where comment_id=p_comment_id and user_id=p_user_id;
      v_result := 'switched';
    end if;
  else
    insert into public.comment_likes (comment_id, user_id, reaction) values (p_comment_id, p_user_id, p_reaction);
    v_result := 'added';
  end if;
  return v_result;
end;
$$;

-- get_user_project_data: fetch user's like + rating for a project in one call
create or replace function public.get_user_project_data(
  p_slug    text,
  p_user_id text
) returns json language plpgsql security definer as $$
declare
  v_project_id bigint;
  v_reaction   text;
  v_rating     smallint;
begin
  select id into v_project_id from public.projects where slug=p_slug;
  if v_project_id is null then return '{"reaction":null,"rating":null}'::json; end if;

  select reaction into v_reaction from public.likes
  where content_type='project' and content_id=p_slug and user_id=p_user_id;

  select rating into v_rating from public.project_ratings
  where project_id=v_project_id and user_id=p_user_id;

  return json_build_object('reaction', v_reaction, 'rating', v_rating);
end;
$$;

-- ============================================================
-- PART E — RLS
-- ============================================================

-- project_ratings
alter table public.project_ratings enable row level security;
drop policy if exists "project_ratings_select" on public.project_ratings;
drop policy if exists "project_ratings_insert" on public.project_ratings;
drop policy if exists "project_ratings_update" on public.project_ratings;
drop policy if exists "project_ratings_delete" on public.project_ratings;

create policy "project_ratings_select" on public.project_ratings for select using (true);
-- Writes go through the upsert_project_rating RPC (security definer) — no direct write policy needed for anon.

-- project_views
alter table public.project_views enable row level security;
drop policy if exists "project_views_select" on public.project_views;
create policy "project_views_select" on public.project_views for select using (true);
-- Writes via track_project_view RPC only.

-- comment_likes
alter table public.comment_likes enable row level security;
drop policy if exists "comment_likes_select" on public.comment_likes;
create policy "comment_likes_select" on public.comment_likes for select using (true);
-- Writes via toggle_comment_like RPC only.

-- ============================================================
-- PART F — INDEXES
-- ============================================================

create index if not exists idx_projects_status_vis    on public.projects (status, visibility);
create index if not exists idx_projects_featured       on public.projects (is_featured, featured_order) where is_featured=true;
create index if not exists idx_projects_pinned         on public.projects (is_pinned, pinned_order) where is_pinned=true;
create index if not exists idx_projects_category       on public.projects (category);
create index if not exists idx_projects_created        on public.projects (created_at desc);
create index if not exists idx_projects_views          on public.projects (views_count desc);
create index if not exists idx_projects_likes          on public.projects (likes_count desc);
create index if not exists idx_projects_rating         on public.projects (rating_avg desc);
create index if not exists idx_project_views_key       on public.project_views (project_id, viewer_key);
create index if not exists idx_project_ratings_proj    on public.project_ratings (project_id);
create index if not exists idx_comment_likes_comment   on public.comment_likes (comment_id);
create index if not exists idx_projects_tags           on public.projects using gin (tags);
create index if not exists idx_projects_languages      on public.projects using gin (languages);

-- ============================================================
-- PART G — SEED DATA (19 projects)
-- ============================================================

-- Delete any existing seed data first to avoid duplication
delete from public.projects where slug in (
  'linkivo','qr-prism','exporter-pro','ufmt-ssc26','notification-panel',
  'sgsc-web-campus','mdturzo-portfolio-v2','mdturzo-portfolio-v1',
  'github-profile','halal-world-of-muslim','web-templates-2023',
  'study-with-muhtasim','turzo-express','master-chef','portfolio-2023',
  'basic-cv','html-css-calculator','ssc26-iftar-mahfil-banner','golden-days-poster'
);

insert into public.projects (
  slug, title, short_name, tagline, short_description, category, sub_category,
  project_type, tags, languages, frameworks, tools, platforms,
  status, visibility, is_featured, featured_order, is_pinned, pinned_order,
  is_ongoing, version, team_size, role, is_open_source,
  github_link, live_link, accent_color, accent, sort_order,
  start_date, published_at, created_at
) values

-- 1. Linkivo
('linkivo',
 'Linkivo — Smart Link Management System',
 'Linkivo',
 'Discover, Manage, and Explore Links with Intelligence',
 'A PWA for intelligent link management with a weighted discovery system and cinematic GSAP animations.',
 'Web App', 'Link Management',
 'pwa',
 ARRAY['pwa','firebase','gsap','javascript','link-management','animation','splash-screen'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY['Firebase','GSAP'],
 ARRAY['VS Code','Firebase Console'],
 ARRAY['web','mobile','pwa'],
 'published','public', true, 1, true, 1,
 true, 'v1.4.5', 1, 'Solo Developer', false,
 null, null, '#3B82F6', '#3B82F6', 10,
 '2024-01-01', now(), now()),

-- 2. QR Prism
('qr-prism',
 'QR Prism — Advanced QR Code Generator',
 'QR Prism',
 'Generate, Scan, and Manage QR Codes with Professional Features',
 'Feature-rich PWA for generating, scanning, and batch processing QR codes with cloud storage.',
 'Utility App', 'QR Tool',
 'pwa',
 ARRAY['qr-code','pwa','firebase','batch-processing','scanner','svg-rendering','admin-panel'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY['Firebase'],
 ARRAY['JSZip','VS Code'],
 ARRAY['web','mobile','pwa'],
 'published','public', true, 2, true, 2,
 false, 'v3.4', 1, 'Solo Developer', false,
 'https://github.com/muhtasim-rahman/qr-prism',
 'https://muhtasim-rahman.github.io/qr-prism',
 '#10B981', '#10B981', 20,
 '2023-06-01', now(), now()),

-- 3. Project Exporter Pro
('exporter-pro',
 'Project Exporter Pro',
 'Exporter Pro',
 'Universal Export Engine for Web Applications',
 'Self-contained JS export engine supporting PNG, JPG, WebP, SVG, PDF with Shadow DOM isolation.',
 'Dev Tool', 'Export Library',
 'library',
 ARRAY['javascript-library','export-engine','shadow-dom','open-source','pdf-export','canvas-api'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY[]::text[],
 ARRAY['VS Code','Canvas API'],
 ARRAY['web'],
 'published','public', true, 3, false, null,
 false, 'v1.0', 1, 'Solo Developer', true,
 'https://github.com/muhtasim-rahman/exporter-pro',
 'https://muhtasim-rahman.github.io/exporter-pro',
 '#A855F7', '#A855F7', 30,
 '2024-03-01', now(), now()),

-- 4. UFMT-SSC26
('ufmt-ssc26',
 'UFMT-SSC26 — Udvash FMT Tracker',
 'UFMT-SSC26',
 'Track Your Academic Journey with Precision',
 'Powerful web app for tracking merit positions across exams, powered by Google Sheets database.',
 'Education', 'Academic Tracker',
 'web-app',
 ARRAY['educational-app','google-sheets-api','merit-tracker','ssc-2026','ranking-dashboard'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY['Google Sheets API'],
 ARRAY['VS Code'],
 ARRAY['web','mobile'],
 'published','public', true, 4, false, null,
 true, 'v1.0', 1, 'Solo Developer', false,
 'https://github.com/muhtasim-rahman/UFMT-SSC26',
 'https://muhtasim-rahman.github.io/UFMT-SSC26',
 '#F59E0B', '#F59E0B', 40,
 '2024-09-01', now(), now()),

-- 5. Notification Panel
('notification-panel',
 'Functional Notification Panel',
 'Notification Panel',
 'Elegant Notifications Powered by Google Sheets',
 'Dynamic notification panel with Google Sheets backend, read/unread tracking, and local storage.',
 'UI Component', 'Notification Widget',
 'library',
 ARRAY['notification-panel','google-sheets','local-storage','web-component','embeddable'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY['Google Sheets API'],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', true, 5, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 'https://github.com/muhtasim-rahman/notification-panel',
 'https://muhtasim-rahman.github.io/notification-panel/',
 '#06B6D4', '#06B6D4', 50,
 '2024-06-01', now(), now()),

-- 6. SGSC Web Campus
('sgsc-web-campus',
 'SGSC Web Campus',
 'SGSC Campus',
 'Digital Hub for Academic Excellence and Student Life',
 'Official website for Saidpur Govt. Science College with club management and institutional portal.',
 'Web App', 'Institutional Website',
 'web-app',
 ARRAY['institutional-website','school-website','club-management','odoo','student-portal'],
 ARRAY['Python','JavaScript','HTML5','CSS3','XML'],
 ARRAY['Odoo CMS'],
 ARRAY['Odoo','VS Code'],
 ARRAY['web','mobile'],
 'published','public', false, null, false, null,
 true, 'v1.0', 1, 'Solo Developer', false,
 null, 'https://sgsc.odoo.com',
 '#EC4899', '#EC4899', 60,
 '2024-04-01', now(), now()),

-- 7. Portfolio v2 (this site)
('mdturzo-portfolio-v2',
 'Portfolio v2 — mdturzo.web.app',
 'Portfolio v2',
 'A fully dynamic, advanced portfolio built with React + Supabase',
 'Professional portfolio with React 18, Firebase Auth, Supabase PostgreSQL, and Framer Motion animations.',
 'Web App', 'Portfolio Website',
 'web-app',
 ARRAY['react','supabase','firebase','portfolio','framer-motion','zustand','vite','tailwind'],
 ARRAY['JavaScript','JSX','CSS3'],
 ARRAY['React','Vite','Tailwind CSS','Framer Motion','Zustand'],
 ARRAY['VS Code','Firebase','Supabase','Cloudflare Workers'],
 ARRAY['web'],
 'published','public', true, 6, false, null,
 true, 'v2.4.0', 1, 'Solo Developer', false,
 'https://github.com/muhtasim-rahman/mdturzo',
 'https://mdturzo.web.app',
 '#3B82F6', '#3B82F6', 70,
 '2025-05-01', now(), now()),

-- 8. Old Portfolio (Odoo)
('mdturzo-portfolio-v1',
 'mdturzo.odoo.com — Portfolio v1',
 'Portfolio v1',
 'The first professional portfolio built on Odoo',
 'Professional portfolio website on Odoo with projects gallery, services, and course management.',
 'Web App', 'Portfolio Website',
 'web-app',
 ARRAY['portfolio','odoo','cms','professional','services-showcase'],
 ARRAY['Python','JavaScript','HTML5','CSS3'],
 ARRAY['Odoo CMS'],
 ARRAY['Odoo'],
 ARRAY['web','mobile'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, 'https://mdturzo.odoo.com',
 '#64748B', '#64748B', 80,
 '2024-01-01', now(), now()),

-- 9. GitHub Profile README
('github-profile',
 'GitHub Profile — README.md',
 'GitHub README',
 'My developer identity on GitHub',
 'Custom GitHub profile README showcasing skills, stats, and projects with dynamic badges.',
 'Dev Tool', 'GitHub Profile',
 'design',
 ARRAY['github','readme','profile','markdown','github-stats','developer-profile'],
 ARRAY['Markdown'],
 ARRAY[]::text[],
 ARRAY['GitHub'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 true, 'v1.0', 1, 'Solo Developer', false,
 'https://github.com/muhtasim-rahman/muhtasim-rahman',
 'https://github.com/muhtasim-rahman',
 '#22C55E', '#22C55E', 90,
 '2023-01-01', now(), now()),

-- 10. Halal
('halal-world-of-muslim',
 'Halal — The World of Muslim',
 'Halal',
 'An ethical digital experience for the Muslim community',
 'Islamic app concept with prayer tools, Quran resources, and halal lifestyle content.',
 'Islamic', 'Islamic App',
 'web-app',
 ARRAY['islamic','halal','quran','prayer','muslim','community','spiritual'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web','mobile'],
 'published','public', false, null, false, null,
 true, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#14B8A6', '#14B8A6', 100,
 '2024-01-01', now(), now()),

-- 11. Web Templates 2023
('web-templates-2023',
 'My Web Templates 2023',
 'Web Templates',
 'A collection of responsive HTML/CSS templates',
 'Website showcasing responsive HTML/CSS/Bootstrap web templates built in 2023.',
 'Web App', 'Templates Collection',
 'template',
 ARRAY['html','css','bootstrap','responsive','templates','web-design'],
 ARRAY['HTML5','CSS3','Bootstrap'],
 ARRAY['Bootstrap'],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v2', 1, 'Solo Developer', false,
 'https://github.com/muhtasim-rahman/web-templets-2024.2',
 null,
 '#8B5CF6', '#8B5CF6', 110,
 '2023-06-01', now(), now()),

-- 12. Study With Muhtasim
('study-with-muhtasim',
 'Study With Muhtasim',
 'Study Hub',
 'A learning platform built for students',
 'Educational web platform for sharing study materials, notes, and resources for students.',
 'Education', 'Study Platform',
 'web-app',
 ARRAY['education','study','notes','student','e-learning','resources'],
 ARRAY['JavaScript','HTML5','CSS3'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#F59E0B', '#F59E0B', 120,
 '2023-08-01', now(), now()),

-- 13. Turzo Express
('turzo-express',
 'Turzo Express — E-Commerce Project',
 'Turzo Express',
 'A full-featured e-commerce learning project',
 'E-commerce website project with product listings, cart, and order management.',
 'Web App', 'E-Commerce',
 'web-app',
 ARRAY['ecommerce','html','css','javascript','cart','product-listing'],
 ARRAY['HTML5','CSS3','JavaScript'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#EF4444', '#EF4444', 130,
 '2023-03-01', now(), now()),

-- 14. Master Chef
('master-chef',
 'Master Chef — Restaurant Project',
 'Master Chef',
 'A delicious restaurant website experience',
 'Responsive restaurant website with menu showcase, reservation form, and gallery.',
 'Web App', 'Restaurant Website',
 'web-app',
 ARRAY['restaurant','html','css','javascript','menu','responsive','food'],
 ARRAY['HTML5','CSS3','JavaScript'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#F97316', '#F97316', 140,
 '2023-02-01', now(), now()),

-- 15. Portfolio 2023
('portfolio-2023',
 'Portfolio 2023 — Early Version',
 'Portfolio 2023',
 'Where it all began',
 'First personal portfolio website built with HTML, CSS, and JavaScript.',
 'Web App', 'Portfolio Website',
 'web-app',
 ARRAY['portfolio','html','css','javascript','personal','first-project'],
 ARRAY['HTML5','CSS3','JavaScript'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#64748B', '#64748B', 150,
 '2023-01-01', now(), now()),

-- 16. Basic CV
('basic-cv',
 'Basic CV',
 'Basic CV',
 'A clean digital resume',
 'Simple digital CV/resume built with HTML and CSS for online sharing.',
 'Web App', 'Resume/CV',
 'design',
 ARRAY['cv','resume','html','css','personal','digital-resume'],
 ARRAY['HTML5','CSS3'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#64748B', '#64748B', 160,
 '2022-12-01', now(), now()),

-- 17. Calculator Design
('html-css-calculator',
 'HTML & CSS Calculator Design',
 'Calculator',
 'A pixel-perfect calculator UI in pure CSS',
 'Pixel-perfect calculator interface designed with pure HTML and CSS, no JavaScript logic.',
 'UI Component', 'CSS Design',
 'design',
 ARRAY['html','css','calculator','ui-design','frontend','css-only'],
 ARRAY['HTML5','CSS3'],
 ARRAY[]::text[],
 ARRAY['VS Code'],
 ARRAY['web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Solo Developer', false,
 null, null,
 '#64748B', '#64748B', 170,
 '2022-10-01', now(), now()),

-- 18. Iftar Mahfil Banner
('ssc26-iftar-mahfil-banner',
 'SSC-2026 Iftar Mahfil Banner',
 'Iftar Banner',
 'A heartfelt graphic for a blessed community gathering',
 'Banner design for the SSC-2026 batch Iftar Mahfil event at SGSC.',
 'Design', 'Event Graphics',
 'design',
 ARRAY['design','banner','iftar','ramadan','event','graphic-design','islamic','ssc-2026'],
 ARRAY['Adobe Photoshop','CSS3'],
 ARRAY[]::text[],
 ARRAY['Adobe Photoshop'],
 ARRAY['print','web'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Graphic Designer', false,
 null, null,
 '#EC4899', '#EC4899', 180,
 '2024-03-01', now(), now()),

-- 19. Golden Days Poster
('golden-days-poster',
 'Golden Days — SGSC Friendship Diary Poster',
 'Golden Days',
 'Capturing friendships that last a lifetime',
 'Commemorative poster design for the SGSC batch friendship diary project.',
 'Design', 'Print Design',
 'design',
 ARRAY['design','poster','friendship','school','graphic-design','print','sgsc'],
 ARRAY['Adobe Photoshop','CSS3'],
 ARRAY[]::text[],
 ARRAY['Adobe Photoshop'],
 ARRAY['print'],
 'published','public', false, null, false, null,
 false, 'v1.0', 1, 'Graphic Designer', false,
 null, null,
 '#EAB308', '#EAB308', 190,
 '2024-05-01', now(), now());

-- ============================================================
-- Done. Run `npm run build` in the frontend to verify no breakage.
-- ============================================================
