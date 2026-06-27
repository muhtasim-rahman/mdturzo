-- ============================================================
-- SUPABASE HARD RESET — v2.3.6
-- ============================================================
-- Wipes the ENTIRE `public` schema back to empty, regardless of
-- whatever tables/functions/policies currently exist (from v2.0
-- through the abandoned v2.4/v2.5 experiments). Safe to run even
-- if you're not sure exactly what's in there right now -- it just
-- finds everything and drops it.
--
-- ⚠️  DESTRUCTIVE. This deletes ALL data in ALL tables in `public`.
--     Make sure you actually want a clean slate before running this.
--
-- HOW TO RUN:
--   Supabase Dashboard -> SQL Editor -> paste this whole file -> Run
--
-- AFTER THIS: run `supabase-master-v2.3.6.sql` to rebuild everything
-- v2.3.6 needs from scratch.
-- ============================================================

-- 1) Drop every table in public (CASCADE handles FKs/views/etc. that depend on them)
do $$
declare
  r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public') loop
    execute format('drop table if exists public.%I cascade', r.tablename);
  end loop;
end $$;

-- 2) Drop every custom function in public (skips functions owned by an
--    extension, like uuid-ossp's uuid_nil()/uuid_generate_v4() etc -- those
--    get cleaned up if/when the extension itself is dropped, not individually)
do $$
declare
  r record;
begin
  for r in (
    select p.proname as name, pg_get_function_identity_arguments(p.oid) as args
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and not exists (
        select 1 from pg_depend d
        where d.objid = p.oid and d.deptype = 'e'
      )
  ) loop
    execute format('drop function if exists public.%I(%s) cascade', r.name, r.args);
  end loop;
end $$;

-- 3) Drop every view in public
do $$
declare
  r record;
begin
  for r in (select viewname from pg_views where schemaname = 'public') loop
    execute format('drop view if exists public.%I cascade', r.viewname);
  end loop;
end $$;

-- 4) Drop every custom type/enum in public
do $$
declare
  r record;
begin
  for r in (
    select t.typname as name
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typtype = 'e'  -- enums only (composite types from tables already went with the tables)
  ) loop
    execute format('drop type if exists public.%I cascade', r.name);
  end loop;
end $$;

-- 5) Drop every sequence left over (BIGSERIAL columns create these — table
--    drops above usually take their sequences with them, this just mops up
--    any standalone ones)
do $$
declare
  r record;
begin
  for r in (select sequencename from pg_sequences where schemaname = 'public') loop
    execute format('drop sequence if exists public.%I cascade', r.sequencename);
  end loop;
end $$;

-- Done. `public` schema is now empty.
-- Verify with:  select tablename from pg_tables where schemaname = 'public';
-- (should return zero rows)
