import type { MapActivity, Profile, RankingEntry, Submission, ValidationVerdict } from '../types';

export type EvidenceInput = {
  missionId: string;
  /** Imágenes JPEG en base64 (1 foto, o 2 si es antes/después). */
  images: string[];
  latitude?: number;
  longitude?: number;
};

export type EvidenceResult = { verdict: ValidationVerdict; points: number; reason?: string };

export type AuthUser = { id: string; email: string; name: string };

/** Contrato único: lo cumplen el backend real (Supabase) y el modo demo. */
export interface Api {
  signUp(email: string, password: string, name: string): Promise<AuthUser>;
  signIn(email: string, password: string): Promise<AuthUser>;
  signOut(): Promise<void>;
  currentUser(): Promise<AuthUser | null>;
  getProfile(userId: string): Promise<Profile>;
  listSubmissions(userId: string): Promise<Submission[]>;
  getRanking(): Promise<RankingEntry[]>;
  getMapActivities(): Promise<MapActivity[]>;
  submitEvidence(input: EvidenceInput): Promise<EvidenceResult>;
}
