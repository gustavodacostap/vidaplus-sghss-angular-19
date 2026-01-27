import { createAction } from '@ngrx/store';

export const darAlta = createAction('[Paciente Leito] Alta');

export const darAltaSuccess = createAction('[Alta Paciente Leito] Success');

export const darAltaFailure = createAction('[Alta Paciente Leito] Failure');
