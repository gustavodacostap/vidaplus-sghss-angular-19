import { createAction, props } from '@ngrx/store';
import { Especialidade } from '../models/Especialidade.model';

export const loadEspecialidades = createAction('[Especialidades] Load');

export const loadEspecialidadesSuccess = createAction(
  '[Especialidades] Load Success',
  props<{ especialidades: Especialidade[] }>(),
);

export const loadEspecialidadesFailure = createAction(
  '[Especialidades] Load Failure',
);
