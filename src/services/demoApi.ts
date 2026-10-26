import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '../utils/errors';
import { MISSIONS, getMission } from '../content/missions';
import { missionText } from '../hooks/useLocale';
import type { Api, AuthUser, EvidenceInput, EvidenceResult } from './api';
import type { MapActivity, Profile, RankingEntry, Submission } from '../types';

/** Modo demo: todo se guarda en el teléfono. Sirve para probar la interfaz sin backend. */
const KEY_USERS = 'demo:users';
const KEY_SESSION = 'demo:session';
const KEY_SUBS = 'demo:submissions';

type StoredUser = AuthUser & { password: string };

async function read<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}
const write = (key: string, value: unknown) => AsyncStorage.setItem(key, JSON.stringify(value));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const NEIGHBORS: RankingEntry[] = [
  { id: 'n1', name: 'Camila R.', points: 320 },
  { id: 'n2', name: 'Andrés P.', points: 245 },
  { id: 'n3', name: 'Valentina G.', points: 180 },
  { id: 'n4', name: 'Juan D.', points: 95 },
];

// Puntos de ejemplo alrededor de Pasto, Nariño
const SAMPLE_POINTS: Omit<MapActivity, 'title'>[] = [
  { id: 's1', missionId: 'm-parque-limpieza', category: 'parque', latitude: 1.2136, longitude: -77.2811 },
  { id: 's2', missionId: 'm-reciclaje-punto', category: 'reciclaje', latitude: 1.2207, longitude: -77.2778 },
  { id: 's3', missionId: 'm-deterioro-reporte', category: 'deterioro', latitude: 1.2089, longitude: -77.2865 },
];

export const demoApi: Api = {
  async signUp(email, password, name) {
    const users = await read<StoredUser[]>(KEY_USERS, []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new AppError('emailTaken');
    if (password.length < 6) throw new AppError('weakPassword');
    const user: StoredUser = { id: `demo-${Date.now()}`, email, name, password };
    await write(KEY_USERS, [...users, user]);
    await write(KEY_SESSION, user.id);
    return { id: user.id, email, name };
  },

  async signIn(email, password) {
    const users = await read<StoredUser[]>(KEY_USERS, []);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new AppError('credentials');
    await write(KEY_SESSION, user.id);
    return { id: user.id, email: user.email, name: user.name };
  },

  async signOut() {
    await AsyncStorage.removeItem(KEY_SESSION);
  },

  async currentUser() {
    const id = await read<string | null>(KEY_SESSION, null);
    if (!id) return null;
    const users = await read<StoredUser[]>(KEY_USERS, []);
    const u = users.find((x) => x.id === id);
    return u ? { id: u.id, email: u.email, name: u.name } : null;
  },

  async getProfile(userId): Promise<Profile> {
    const users = await read<StoredUser[]>(KEY_USERS, []);
    const subs = (await read<(Submission & { userId: string })[]>(KEY_SUBS, [])).filter((s) => s.userId === userId && s.verdict === 'approved');
    return {
      id: userId,
      name: users.find((u) => u.id === userId)?.name ?? 'Voluntario',
      totalPoints: subs.reduce((n, s) => n + s.pointsAwarded, 0),
      missionsDone: subs.length,
    };
  },

  async listSubmissions(userId) {
    const all = await read<(Submission & { userId: string })[]>(KEY_SUBS, []);
    return all.filter((s) => s.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getRanking() {
    const user = await this.currentUser();
    const rows = [...NEIGHBORS];
    if (user) {
      const profile = await this.getProfile(user.id);
      rows.push({ id: user.id, name: profile.name, points: profile.totalPoints });
    }
    return rows.sort((a, b) => b.points - a.points);
  },

  async getMapActivities() {
    const user = await this.currentUser();
    const mine = user ? (await this.listSubmissions(user.id)).filter((s) => s.verdict === 'approved' && s.latitude != null) : [];
    const toActivity = (id: string, missionId: string, category: MapActivity['category'], lat: number, lng: number): MapActivity => {
      const m = getMission(missionId);
      return { id, missionId, category, latitude: lat, longitude: lng, title: m ? missionText(m).title : category };
    };
    return [
      ...SAMPLE_POINTS.map((p) => toActivity(p.id, p.missionId, p.category, p.latitude, p.longitude)),
      ...mine.map((s) => toActivity(s.id, s.missionId, getMission(s.missionId)?.category ?? 'parque', s.latitude!, s.longitude!)),
    ];
  },

  async submitEvidence(input: EvidenceInput): Promise<EvidenceResult> {
    const user = await this.currentUser();
    if (!user) throw new AppError('session');
    const mission = MISSIONS.find((m) => m.id === input.missionId);
    if (!mission) throw new AppError('validation');
    await wait(1400); // simula el tiempo de análisis de la IA

    const all = await read<(Submission & { userId: string })[]>(KEY_SUBS, []);
    const today = new Date().toISOString().slice(0, 10);
    const already = all.some((s) => s.userId === user.id && s.missionId === mission.id && s.verdict === 'approved' && s.createdAt.startsWith(today));
    if (already) throw new AppError('alreadyDone');

    const sub: Submission & { userId: string } = {
      id: `sub-${Date.now()}`,
      userId: user.id,
      missionId: mission.id,
      verdict: 'approved',
      pointsAwarded: mission.points,
      createdAt: new Date().toISOString(),
      latitude: input.latitude,
      longitude: input.longitude,
    };
    await write(KEY_SUBS, [...all, sub]);
    return { verdict: 'approved', points: mission.points, reason: 'Modo demo: aprobada automáticamente.' };
  },
};
