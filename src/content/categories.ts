import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';
import { semanticTokens as s } from '../design';
import type { MissionCategory } from '../types';

type IconName = ComponentProps<typeof Ionicons>['name'];

/** Etiquetado unívoco: cada categoría tiene un solo color y un solo icono en toda la app. */
export const CATEGORY_META: Record<MissionCategory, { color: string; icon: IconName }> = {
  parque: { color: s.color.category.parque, icon: 'leaf' },
  reciclaje: { color: s.color.category.reciclaje, icon: 'sync' },
  deterioro: { color: s.color.category.deterioro, icon: 'construct' },
  residuos: { color: s.color.category.residuos, icon: 'trash' },
};

export const CATEGORY_ORDER: MissionCategory[] = ['parque', 'reciclaje', 'deterioro', 'residuos'];
