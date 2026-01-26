import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { UserRole } from '../models/User.model';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.checkAccess(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.checkAccess(route);
  }

  private checkAccess(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['roles'] as UserRole[] | undefined;
    const session = this.sessionService.getSession();

    // 🚫 Não autenticado → login
    if (!session) {
      return this.router.createUrlTree(['/auth/login']);
    }

    const redirectMap: Record<string, string> = {
      ADMIN: '/admin/pacientes',
      PROFESSIONAL: '/profissional/agenda',
      PATIENT: '/paciente/consultas',
    };

    // 🚫 Autenticado, mas role inválido → permanece na rota atual
    if (allowedRoles && !allowedRoles.includes(session.role)) {
      return this.router.createUrlTree([redirectMap[session.role]]);
    }

    // ✅ Tudo ok
    return true;
  }
}
