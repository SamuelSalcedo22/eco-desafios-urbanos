-- Eco-Desafíos Urbanos: esquema base
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Voluntario',
  total_points integer not null default 0,
  missions_done integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.missions (
  id text primary key,
  category text not null check (category in ('parque','reciclaje','deterioro','residuos')),
  points integer not null check (points > 0),
  evidence_mode text not null check (evidence_mode in ('single','before_after')),
  vision_hint text not null,
  requires_location boolean not null default false,
  active boolean not null default true
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id text not null references public.missions(id),
  verdict text not null check (verdict in ('approved','review','rejected')),
  points_awarded integer not null default 0,
  ai_confidence numeric,
  ai_reason text,
  latitude double precision,
  longitude double precision,
  photo_path text,
  photo_hash text,
  day date not null default current_date,
  created_at timestamptz not null default now()
);

-- Una misión aprobada por usuario y por día (evita acumular puntos repitiendo).
create unique index if not exists submissions_one_approved_per_day
  on public.submissions (user_id, mission_id, day) where verdict = 'approved';

-- La misma foto no puede usarse dos veces.
create unique index if not exists submissions_unique_photo
  on public.submissions (user_id, photo_hash) where photo_hash is not null;

create index if not exists submissions_user_idx on public.submissions (user_id, created_at desc);
