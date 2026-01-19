import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';
import { route } from './shared/helpers/route.helper';

export const routes: Routes = [
  route({
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  }),

  route({
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () =>
      import('./shared/components/layout/layout').then((m) => m.Layout),
    children: [
      route({
        path: 'admin',
        canActivate: [RoleGuard],
        canActivateChild: [RoleGuard],
        children: [
          route({
            path: 'pacientes',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/pacientes/pages/list/pacientes').then(
                    (m) => m.Pacientes,
                  ),
              }),

              route({
                path: 'edit/:id',
                loadComponent: () =>
                  import('./features/admin/pacientes/pages/edit/pacientes-edit').then(
                    (m) => m.PacientesEdit,
                  ),
                data: {
                  topbar: {
                    dynamicMode: true,
                    pageTitle: 'Editar paciente',
                    returnLink: 'admin/pacientes',
                  },
                  layout: {
                    contentPadding: 'onlyY',
                  },
                },
              }),
            ],
          }),
          route({
            path: 'profissionais',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/profissionais/pages/list/profissionais').then(
                    (m) => m.Profissionais,
                  ),
              }),
              route({
                path: 'edit/:id',
                loadComponent: () =>
                  import('./features/admin/profissionais/pages/edit/profissional-edit/profissional-edit').then(
                    (m) => m.ProfissionalEdit,
                  ),
                data: {
                  topbar: {
                    dynamicMode: true,
                    pageTitle: 'Editar profissional',
                    returnLink: 'admin/profissionais',
                  },
                  layout: {
                    contentPadding: 'onlyY',
                  },
                },
              }),
            ],
          }),
        ],
        data: { roles: ['ADMIN'] },
      }),
    ],
  }),

  // {
  //   path: 'professional',
  //   canActivate: [RoleGuard],
  //   data: { roles: ['PROFESSIONAL'] },
  //   loadChildren: () =>
  //     import('./features/professional/professional.routes').then((m) => m.PROFESSIONAL_ROUTES),
  // },

  // {
  //   path: 'patient',
  //   canActivate: [RoleGuard],
  //   data: { roles: ['PACIENTE'] },
  //   loadChildren: () =>
  //     import('./features/patient/patient.routes').then((m) => m.PATIENT_ROUTES),
  // },
  //   ],
  // },

  // // 🚫 404
  // {
  //   path: '**',
  //   loadComponent: () => import('./shared/pages/not-found.page').then((m) => m.NotFoundPage),
  // },
];
