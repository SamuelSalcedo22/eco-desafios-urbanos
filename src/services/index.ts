import { isSupabaseConfigured } from './supabase';
import { supabaseApi } from './supabaseApi';
import { demoApi } from './demoApi';
import type { Api } from './api';

export const isDemoMode = !isSupabaseConfigured;
export const api: Api = isDemoMode ? demoApi : supabaseApi;
export type { Api, AuthUser, EvidenceInput, EvidenceResult } from './api';
