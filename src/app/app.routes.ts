import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';
import { route } from './shared/helpers/route.helper';

export const routes: Routes = [
  route({
    path: '',
    loadComponent: () =>
      import('./shared/components/redirect-role/redirect-role.component').then(
        (m) => m.RedirectRoleComponent,
      ),
  }),
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
          route({
            path: 'leitos',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/leitos/pages/list/leitos.component').then(
                    (m) => m.LeitosComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'leitos',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/leitos/pages/list/leitos.component').then(
                    (m) => m.LeitosComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'relatorios',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/relatorios/pages/relatorios.component').then(
                    (m) => m.RelatoriosComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'gestao-usuarios',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/usuarios/pages/usuarios.component').then(
                    (m) => m.UsuariosComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'meu-perfil',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/admin/meu-perfil/pages/meu-perfil-admin.component').then(
                    (m) => m.MeuPerfilAdminComponent,
                  ),
              }),
            ],
          }),
        ],
        data: { roles: ['ADMIN'] },
      }),
      route({
        path: 'profissional',
        canActivate: [RoleGuard],
        canActivateChild: [RoleGuard],
        children: [
          route({
            path: 'agenda',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/profissional/agenda/pages/agenda.component').then(
                    (m) => m.AgendaComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'pacientes',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/profissional/pacientes/pages/pacientes-prof.component').then(
                    (m) => m.PacientesProfComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'meu-perfil',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/profissional/meu-perfil/pages/meu-perfil-prof.component').then(
                    (m) => m.MeuPerfilProfComponent,
                  ),
              }),
            ],
          }),
        ],
        data: { roles: ['PROFESSIONAL'] },
      }),
      route({
        path: 'paciente',
        canActivate: [RoleGuard],
        canActivateChild: [RoleGuard],
        children: [
          route({
            path: 'consultas',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/paciente/consultas/pages/consultas-paciente.component').then(
                    (m) => m.ConsultasPacienteComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'exames',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/paciente/exames/pages/exames.component').then(
                    (m) => m.ExamesComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'historico-clinico',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/paciente/historico-clinico/pages/historico-clinico.component').then(
                    (m) => m.HistoricoClinicoComponent,
                  ),
              }),
            ],
          }),
          route({
            path: 'meu-perfil',
            children: [
              route({
                path: '',
                loadComponent: () =>
                  import('./features/paciente/meu-perfil/pages/meu-perfil-paciente.component').then(
                    (m) => m.MeuPerfilPacienteComponent,
                  ),
              }),
            ],
          }),
        ],
        data: { roles: ['PATIENT'] },
      }),
    ],
  }),
  route({
    path: '**',
    loadComponent: () =>
      import('./shared/components/redirect-role/redirect-role.component').then(
        (m) => m.RedirectRoleComponent,
      ),
  }),

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
