-- Supabase da permiso de lectura a "anon" (sin sesión) sobre todo lo de public por defecto.
-- El ranking y el mapa solo deben verlos usuarios con sesión iniciada.
revoke all on public.ranking from anon;
revoke all on public.map_activities from anon;
