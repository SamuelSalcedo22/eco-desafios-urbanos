-- Crear perfil al registrarse
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data->>'name',''), 'Voluntario'));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sumar puntos cuando se aprueba una evidencia
create or replace function public.award_points() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.verdict = 'approved' then
    update public.profiles
      set total_points = total_points + new.points_awarded,
          missions_done = missions_done + 1
      where id = new.user_id;
  end if;
  return new;
end $$;

drop trigger if exists on_submission_approved on public.submissions;
create trigger on_submission_approved after insert on public.submissions
  for each row execute function public.award_points();
