import { createAction, props } from '@ngrx/store';
import { Unidade } from '../models/Unidade.model';

export const loadUnidades = createAction('[Unidades] Load');

export const loadUnidadesSuccess = createAction(
  '[Unidades] Load Success',
  props<{ unidades: Unidade[] }>(),
);

export const loadUnidadesFailure = createAction('[Unidades] Load Failure');
