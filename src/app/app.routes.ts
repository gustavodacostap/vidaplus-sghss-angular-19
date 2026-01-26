import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';
import { route } from './shared/helpers/route.helper';

export const routes: Routes = [
  route({
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
  }),

  route({
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () =>
      import('./shared/components/layout/layout').then(
        (m) => m.LayoutComponent,
      ),
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
                    (m) => m.PacientesComponent,
                  ),
              }),

              route({
                path: 'edit/:id',
                loadComponent: () =>
                  import('./features/admin/pacientes/pages/edit/pacientes-edit').then(
                    (m) => m.PacientesEditComponent,
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
                    (m) => m.ProfissionaisComponent,
                  ),
              }),
              route({
                path: 'edit/:id',
                loadComponent: () =>
                  import('./features/admin/profissionais/pages/edit/profissional-edit/profissional-edit').then(
                    (m) => m.ProfissionalEditComponent,
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
          route({
            path: 'consultas',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/consultas/pages/list/consultas.component').then(
                    (m) => m.ConsultasComponent,
                  ),
              }),
              route({
                path: 'nova',
                loadComponent: () =>
                  import('./features/admin/consultas/pages/criar/criar-consulta.component').then(
                    (m) => m.CriarConsultaComponent,
                  ),
                data: {
                  topbar: {
                    dynamicMode: true,
                    pageTitle: 'Nova Consulta',
                    returnLink: 'admin/consultas',
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
