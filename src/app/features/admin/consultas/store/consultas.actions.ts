import { createAction, props } from '@ngrx/store';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';

export const enterConsultasPage = createAction('[Consultas Page] Enter');

export const loadConsultas = createAction('[Consultas] Load');

export const loadConsultasSuccess = createAction(
  '[Consultas] Load Success',
  props<{ consultas: ConsultaCardItem[] }>(),
);

export const loadConsultasFailure = createAction('[Consultas] Load Failure');

export const enterCreateConsultaPage = createAction(
  '[Create Consulta Page] Enter',
);

// export const createConsulta = createAction(
//   '[Consulta] Create',
//   props<{ dto: CreateConsultaDTO }>(),
// );

export const createConsulta = createAction('[Consulta] Create');

export const createConsultaSuccess = createAction('[Create Consulta] Success');

export const createConsultaFailure = createAction('[Create Consulta] Failure');

export const deleteConsulta = createAction('[Consulta] Delete');

export const deleteConsultaSuccess = createAction('[Delete Consulta] Success');

export const deleteConsultaFailure = createAction('[Delete Consulta] Failure');

export const updateConsulta = createAction('[Consulta] Update');

export const updateConsultaSuccess = createAction('[Update Consulta] Success');

export const updateConsultaFailure = createAction('[Update Consulta] Failure');
