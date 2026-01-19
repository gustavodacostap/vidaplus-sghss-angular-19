import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserRole } from '../models/User.model';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAccess(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.checkAccess(route);
  }

  private checkAccess(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as UserRole[] | undefined;
    const session = this.sessionService.getSession();

    if (!session || (allowedRoles && !allowedRoles.includes(session.role))) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
