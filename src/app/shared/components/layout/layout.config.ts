import { UserRole } from '../../../core/auth/models/User.model';

export type ContentPadding = 'default' | 'onlyY';

export interface LayoutConfig {
  contentPadding?: ContentPadding;
}

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  ADMIN: [
    { label: 'Pacientes', icon: 'groups', route: '/admin/pacientes' },
    {
      label: 'Profissionais',
      icon: 'medical_services',
      route: '/admin/profissionais',
    },
    {
      label: 'Consultas',
      icon: 'medical_information',
      route: '/admin/consultas',
    },
    { label: 'Leitos', icon: 'airline_seat_flat', route: '/admin/leitos' },
    { label: 'Unidades', icon: 'local_hospital', route: '/admin/unidades' },
    { label: 'Relatórios', icon: 'analytics', route: '/admin/relatorios' },
    {
      label: 'Gestão de Usuários',
      icon: 'manage_accounts',
      route: '/admin/gestao-usuarios',
    },
    {
      label: 'Meu Perfil',
      icon: 'person',
      route: '/admin/meu-perfil',
    },
  ],
  PROFESSIONAL: [
    { label: 'Agenda', icon: 'event', route: '/profissional/agenda' },
    {
      label: 'Pacientes',
      icon: 'groups',
      route: '/profissional/pacientes',
    },
    { label: 'Meu Perfil', icon: 'person', route: '/profissional/meu-perfil' },
  ],
  PATIENT: [
    {
      label: 'Consultas',
      icon: 'medical_information',
      route: '/paciente/consultas',
    },
    { label: 'Exames', icon: 'biotech', route: '/paciente/exames' },
    {
      label: 'Histórico Clínico',
      icon: 'description',
      route: '/paciente/historico-clinico',
    },
    { label: 'Meu Perfil', icon: 'person', route: '/paciente/meu-perfil' },
  ],
};
