-- Run this once in Supabase → SQL Editor

create table if not exists public.wishes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(btrim(name)) between 1 and 80),
  message     text not null check (char_length(btrim(message)) between 1 and 500),
  approved    boolean not null default true,   -- set to false in the dashboard to hide a wish
  created_at  timestamptz not null default now()
);

-- If you ran an earlier version of this script, drop the unused columns:
alter table public.wishes drop column if exists attendance, drop column if exists guests;

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

alter table public.wishes enable row level security;

-- Anyone with the invite link can read approved wishes
drop policy if exists "Public can read approved wishes" on public.wishes;
create policy "Public can read approved wishes"
  on public.wishes for select
  to anon, authenticated
  using (approved = true);

-- Anyone can submit a wish (but cannot edit or delete)
drop policy if exists "Public can submit wishes" on public.wishes;
create policy "Public can submit wishes"
  on public.wishes for insert
  to anon, authenticated
  with check (approved = true);

-- Live updates in the "Recent Warm Wishes" list
do $$
begin
  alter publication supabase_realtime add table public.wishes;
exception when duplicate_object then null;
end $$;
