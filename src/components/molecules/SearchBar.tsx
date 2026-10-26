import React from 'react';
import { View } from 'react-native';
import { Icon, Input } from '../atoms';
import { globalTokens as g } from '../../design';

type Props = { value: string; onChangeText: (v: string) => void; placeholder: string };

/** Molécula: icono de búsqueda + campo de texto (búsqueda por filtrado). */
export function SearchBar({ value, onChangeText, placeholder }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: g.spacing[2] }}>
      <View style={{ flex: 1 }}>
        <Input value={value} onChangeText={onChangeText} placeholder={placeholder} autoCorrect={false} accessibilityLabel={placeholder} />
      </View>
      <Icon name="search" size={26} />
    </View>
  );
}
