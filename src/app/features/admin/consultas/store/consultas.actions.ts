import { createAction, props } from '@ngrx/store';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';

export const enterConsultasPage = createAction('[Consultas Page] Enter');

export const loadConsultas = createAction('[Consultas] Load');

export const loadConsultasSuccess = createAction(
  '[Consultas] Load Success',
  props<{ consultas: ConsultaCardItem[] }>(),
);

export const loadConsultasFailure = createAction('[Consultas] Load Failure');
