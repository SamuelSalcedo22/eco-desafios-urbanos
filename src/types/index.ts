export type MissionCategory = 'parque' | 'reciclaje' | 'deterioro' | 'residuos';

export type EvidenceMode = 'single' | 'before_after';

export type Mission = {
  id: string;
  category: MissionCategory;
  title: { es: string; en: string };
  summary: { es: string; en: string };
  steps: { es: string[]; en: string[] };
  points: number;
  evidenceMode: EvidenceMode;
  /** Qué debe verse en la foto; se envía al modelo de visión. */
  visionHint: string;
};

export type ValidationVerdict = 'approved' | 'review' | 'rejected';

export type Submission = {
  id: string;
  missionId: string;
  verdict: ValidationVerdict;
  pointsAwarded: number;
  createdAt: string;
  latitude?: number;
  longitude?: number;
};

export type Profile = {
  id: string;
  name: string;
  totalPoints: number;
  missionsDone: number;
};

export type RankingEntry = { id: string; name: string; points: number };

export type MapActivity = {
  id: string;
  missionId: string;
  category: MissionCategory;
  latitude: number;
  longitude: number;
  title: string;
};
