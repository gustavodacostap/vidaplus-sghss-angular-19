import { createActionGroup, emptyProps } from '@ngrx/store';

export const LeitosActions = createActionGroup({
  source: 'Leitos',
  events: {
    'Dar Alta Paciente': emptyProps(),
    'Dar Alta Paciente Success': emptyProps(),
    'Dar Alta Paciente Failure': emptyProps(),

    'Update Leito': emptyProps(),
    'Update Leito Success': emptyProps(),
    'Update Leito Failure': emptyProps(),

    'Delete Leito': emptyProps(),
    'Delete Leito Success': emptyProps(),
    'Delete Leito Failure': emptyProps(),

    'Create Leito': emptyProps(),
    'Create Leito Success': emptyProps(),
    'Create Leito Failure': emptyProps(),
  },
});
