import { createAction, props } from '@ngrx/store';
import { Especialidade } from '../models/Especialidade.model';
import { UpdateEspecialidadeDTO } from '../dto/UpdateEspecialidade.dto';

export const loadEspecialidades = createAction('[Especialidades] Load');

export const loadEspecialidadesSuccess = createAction(
  '[Especialidades] Load Success',
  props<{ especialidades: Especialidade[] }>(),
);

export const loadEspecialidadesFailure = createAction(
  '[Especialidades] Load Failure',
);

export const updateEspecialidade = createAction(
  '[Especialidade Edit] Update Especialidade',
  props<{ id: number; dto: UpdateEspecialidadeDTO }>(),
);

export const updateEspecialidadeSuccess = createAction(
  '[Especialidade Edit] Update Especialidade Success',
);

export const updateEspecialidadeFailure = createAction(
  '[Especialidade Edit] Update Especialidade Failure',
);
