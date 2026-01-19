import { Route } from '@angular/router';
import { TopbarConfig } from '../../core/ui/models/TopbarConfig.model';
import { UserRole } from '../../core/auth/models/User.model';
import { LayoutConfig } from '../components/layout/layout.config';

export interface AppRouteData {
  topbar?: TopbarConfig;
  layout?: LayoutConfig;
  roles?: UserRole[];
}

export function route(config: Route & { data?: AppRouteData }): Route {
  return config;
}
