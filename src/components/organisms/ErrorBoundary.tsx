import React from 'react';
import { View } from 'react-native';
import { ErrorMessage } from '../molecules';
import { Button } from '../atoms';
import { toUserError } from '../../utils/errors';
import { t } from '../../i18n';
import { semanticTokens as s, globalTokens as g } from '../../design';

type State = { failed: boolean };

/** Red de seguridad: si una pantalla se rompe, el usuario ve un mensaje claro, no una pantalla en blanco. */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: s.space.screenPadding, gap: g.spacing[4], backgroundColor: s.color.background.primary }}>
        <ErrorMessage error={toUserError(new Error('unexpected'))} />
        <Button label={t('common.retry')} onPress={() => this.setState({ failed: false })} />
      </View>
    );
  }
}
