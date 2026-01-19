import { createAction, props } from '@ngrx/store';
import { Profissional } from '../models/Profissional.model';
import { ProfissionalListItem } from '../models/ProfissionalListItem.model';
import { UpdateProfissionalDTO } from '../dto/UpdateProfissional.dto';

export const enterProfissionaisPage = createAction('[Profissionais Page] Enter');

export const loadProfissionais = createAction('[Profissionais] Load');

export const loadProfissionaisSuccess = createAction(
  '[Profissionais] Load Success',
  props<{ profissionais: ProfissionalListItem[] }>(),
);

export const loadProfissionaisFailure = createAction('[Profissionais] Load Failure');

export const loadProfissionalById = createAction(
  '[Profissional Detail] Load',
  props<{ id: number }>(),
);

export const loadProfissionalByIdSuccess = createAction(
  '[Profissional Detail] Load Success',
  props<{ profissional: Profissional }>(),
);

export const loadProfissionalByIdFailure = createAction('[Profissional Detail] Load Failure');

export const enterProfissionaisEditPage = createAction(
  '[Profissionais Edit Page] Enter',
  props<{ id: number }>(),
);

export const updateProfissional = createAction(
  '[Profissional Edit] Update Profissional',
  props<{ id: number; dto: UpdateProfissionalDTO }>(),
);

export const updateProfissionalSuccess = createAction(
  '[Profissional Edit] Update Profissional Success',
);

export const updateProfissionalFailure = createAction(
  '[Profissional Edit] Update Profissional Failure',
);
