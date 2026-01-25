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
    { label: 'Relatórios', icon: 'analytics', route: '/admin/relatorios' },
    {
      label: 'Gestão de Usuários',
      icon: 'manage_accounts',
      route: '/admin/gestao-usuarios',
    },
  ],
  PROFESSIONAL: [
    { label: 'Agenda', icon: 'calendar_today', route: '/professional/agenda' },
  ],
  PATIENT: [{ label: 'Consultas', icon: 'event', route: '/patient/consultas' }],
};
