export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  MissionDetail: { missionId: string };
  Evidence: { missionId: string };
  Result: { verdict: 'approved' | 'review' | 'rejected'; points: number; reason?: string };
};

export type MainTabParamList = {
  Missions: undefined;
  Map: undefined;
  Ranking: undefined;
  Profile: undefined;
};
