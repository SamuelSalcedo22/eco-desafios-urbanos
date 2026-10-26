import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MissionCard, SearchBar, EmptyState } from '../molecules';
import { Chip } from '../atoms';
import { MISSIONS } from '../../content/missions';
import { CATEGORY_META, CATEGORY_ORDER } from '../../content/categories';
import { filterMissions } from '../../utils/filterMissions';
import { getLanguage, t } from '../../i18n';
import { globalTokens as g } from '../../design';
import type { MissionCategory } from '../../types';

type Props = { doneIds: Set<string>; onOpen: (missionId: string) => void };

/** Organismo: búsqueda + filtro por categoría (faceta) + lista de tarjetas. */
export function MissionList({ doneIds, onOpen }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MissionCategory | 'all'>('all');
  const lang = getLanguage();
  const visible = useMemo(() => filterMissions(MISSIONS, query, category, lang), [query, category, lang]);

  return (
    <View style={{ gap: g.spacing[4] }}>
      <SearchBar value={query} onChangeText={setQuery} placeholder={t('missions.search')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: g.spacing[2], paddingVertical: g.spacing[1], paddingRight: g.spacing[3] }}>
        <Chip label={t('missions.all')} selected={category === 'all'} onPress={() => setCategory('all')} />
        {CATEGORY_ORDER.map((c) => (
          <Chip key={c} label={t(`categories.${c}`)} color={CATEGORY_META[c].color} selected={category === c} onPress={() => setCategory(c)} />
        ))}
      </ScrollView>
      {visible.length === 0 ? (
        <EmptyState title={t('missions.empty')} hint={t('missions.emptyHint')} />
      ) : (
        visible.map((m) => <MissionCard key={m.id} mission={m} done={doneIds.has(m.id)} onPress={() => onOpen(m.id)} />)
      )}
    </View>
  );
}
