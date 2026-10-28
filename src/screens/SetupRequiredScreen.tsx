import React from 'react';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { ErrorBlock } from '../components/organisms/ErrorBlock';
import { t } from '../i18n';

/** Se muestra solo si una build de producción se generó sin la dirección del servidor. */
export function SetupRequiredScreen() {
  return (
    <ScreenTemplate>
      <ErrorBlock error={{ what: t('setup.what'), why: t('setup.why'), action: t('setup.action') }} />
    </ScreenTemplate>
  );
}
