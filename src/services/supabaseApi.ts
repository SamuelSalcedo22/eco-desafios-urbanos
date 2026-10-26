import { AppError } from '../utils/errors';
import { getMission } from '../content/missions';
import { missionText } from '../hooks/useLocale';
import { supabase } from './supabase';
import type { Api, AuthUser, EvidenceInput, EvidenceResult } from './api';
import type { MapActivity, MissionCategory, Profile, RankingEntry, Submission, ValidationVerdict } from '../types';

function client() {
  if (!supabase) throw new AppError('unknown');
  return supabase;
}

function toUser(u: { id: string; email?: string | null; user_metadata?: { name?: string } }): AuthUser {
  return { id: u.id, email: u.email ?? '', name: u.user_metadata?.name ?? 'Voluntario' };
}

export const supabaseApi: Api = {
  async signUp(email, password, name) {
    const { data, error } = await client().auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;
    if (!data.user) throw new AppError('unknown');
    return toUser(data.user);
  },

  async signIn(email, password) {
    const { data, error } = await client().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return toUser(data.user);
  },

  async signOut() {
    await client().auth.signOut();
  },

  async currentUser() {
    const { data } = await client().auth.getSession();
    return data.session ? toUser(data.session.user) : null;
  },

  async getProfile(userId): Promise<Profile> {
    const { data, error } = await client().from('profiles').select('id,name,total_points,missions_done').eq('id', userId).single();
    if (error) throw error;
    return { id: data.id, name: data.name, totalPoints: data.total_points, missionsDone: data.missions_done };
  },

  async listSubmissions(userId): Promise<Submission[]> {
    const { data, error } = await client()
      .from('submissions')
      .select('id,mission_id,verdict,points_awarded,created_at,latitude,longitude')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      missionId: r.mission_id,
      verdict: r.verdict as ValidationVerdict,
      pointsAwarded: r.points_awarded,
      createdAt: r.created_at,
      latitude: r.latitude ?? undefined,
      longitude: r.longitude ?? undefined,
    }));
  },

  async getRanking(): Promise<RankingEntry[]> {
    const { data, error } = await client().from('ranking').select('id,name,total_points').order('total_points', { ascending: false }).limit(50);
    if (error) throw error;
    return (data ?? []).map((r) => ({ id: r.id, name: r.name, points: r.total_points }));
  },

  async getMapActivities(): Promise<MapActivity[]> {
    const { data, error } = await client().from('map_activities').select('id,mission_id,category,latitude,longitude').limit(300);
    if (error) throw error;
    return (data ?? []).map((r) => {
      const mission = getMission(r.mission_id);
      return {
        id: r.id,
        missionId: r.mission_id,
        category: r.category as MissionCategory,
        latitude: r.latitude,
        longitude: r.longitude,
        title: mission ? missionText(mission).title : r.category,
      };
    });
  },

  async submitEvidence(input: EvidenceInput): Promise<EvidenceResult> {
    const { data, error } = await client().functions.invoke('validate-evidence', { body: input });
    if (error) {
      // La función responde { errorKey } con un código HTTP; lo leemos del contexto.
      let key: string | undefined;
      try {
        const ctx = (error as { context?: Response }).context;
        key = ctx ? (await ctx.json()).errorKey : undefined;
      } catch {
        key = undefined;
      }
      throw new AppError((key as AppError['key']) ?? 'network', error);
    }
    return data as EvidenceResult;
  },
};
