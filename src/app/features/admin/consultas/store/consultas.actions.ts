import { createAction, props } from '@ngrx/store';
import { ConsultaCardItem } from '../models/ConsultaCardItem.model';
import { CreateConsultaDTO } from '../dto/CreateConsulta.dto';

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

export const createConsulta = createAction(
  '[Consulta] Create',
  props<{ dto: CreateConsultaDTO }>(),
);

export const createConsultaSuccess = createAction('[Create Consulta] Success');

export const createConsultaFailure = createAction('[Create Consulta] Failure');
