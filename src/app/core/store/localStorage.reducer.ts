import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppState } from './index.store';

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  // só roda no browser
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return reducer;
  }

  return localStorageSync({
    keys: [
      'auth',
      'ui',
      'pacientes',
      'profissionais',
      'unidades',
      'consultas',
      'especialidades',
    ], // as slices que serão sincronizadas
    rehydrate: true, // rehidrata o estado do localStorage
    storageKeySerializer: (key) => `vidaplus-app-${key}`,
  })(reducer);
}
