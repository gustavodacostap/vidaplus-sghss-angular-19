import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../../features/auth/login/store/auth.effects';
import { authReducer } from '../../features/auth/login/store/auth.reducer';
import { AuthState } from '../../features/auth/login/store/auth.state';
import { uiReducer } from '../ui/store/ui.reducers';
import { UIState } from '../ui/store/ui.state';
import { PacientesState } from '../../features/admin/pacientes/store/pacientes.state';
import { pacientesReducer } from '../../features/admin/pacientes/store/pacientes.reducer';
import { PacientesEffects } from '../../features/admin/pacientes/store/pacientes.effects';
import { UIEffects } from '../ui/store/ui.effects';
import { ProfissionaisEffects } from '../../features/admin/profissionais/store/profissionais.effects';
import { profissionaisReducer } from '../../features/admin/profissionais/store/profissionais.reducer';
import { ProfissionaisState } from '../../features/admin/profissionais/store/profissionais.state';
import { UnidadesEffects } from '../../features/admin/unidades/store/unidades.effects';
import { UnidadesState } from '../../features/admin/unidades/store/unidades.state';
import { unidadesReducer } from '../../features/admin/unidades/store/unidades.reducer';
import { consultasReducer } from '../../features/admin/consultas/store/consultas.reducer';
import { ConsultasState } from '../../features/admin/consultas/store/consultas.state';
import { ConsultasEffects } from '../../features/admin/consultas/store/consultas.effects';
import { EspecialidadesState } from '../../features/admin/especialidades/store/especialidades.state';
import { especialidadesReducer } from '../../features/admin/especialidades/store/especialidades.reducer';
import { EspecialidadesEffects } from '../../features/admin/especialidades/store/especialidades.effects';

export interface AppState {
  auth: AuthState;
  ui: UIState;
  pacientes: PacientesState;
  profissionais: ProfissionaisState;
  unidades: UnidadesState;
  consultas: ConsultasState;
  especialidades: EspecialidadesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  pacientes: pacientesReducer,
  profissionais: profissionaisReducer,
  unidades: unidadesReducer,
  consultas: consultasReducer,
  especialidades: especialidadesReducer,
};

export const effects = [
  AuthEffects,
  PacientesEffects,
  UIEffects,
  ProfissionaisEffects,
  UnidadesEffects,
  ConsultasEffects,
  EspecialidadesEffects,
];
