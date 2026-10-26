-- Seguridad: RLS y vistas públicas mínimas
alter table public.profiles enable row level security;
alter table public.missions enable row level security;
alter table public.submissions enable row level security;

create policy "profiles: ver el propio" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: editar nombre propio" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "missions: lectura para usuarios" on public.missions
  for select to authenticated using (active);

-- El cliente SOLO puede leer sus envíos. Los inserta la Edge Function (service role),
-- así nadie puede darse puntos o veredictos a sí mismo.
create policy "submissions: ver los propios" on public.submissions
  for select using (auth.uid() = user_id);

-- Ranking: solo nombre y puntos.
create or replace view public.ranking as
  select id, name, total_points from public.profiles;
grant select on public.ranking to authenticated;

-- Mapa: sin usuario y con coordenadas redondeadas (~110 m) por privacidad.
create or replace view public.map_activities as
  select s.id, s.mission_id, m.category,
         round(s.latitude::numeric, 3)::double precision as latitude,
         round(s.longitude::numeric, 3)::double precision as longitude
  from public.submissions s
  join public.missions m on m.id = s.mission_id
  where s.verdict = 'approved' and s.latitude is not null and s.longitude is not null;
grant select on public.map_activities to authenticated;
