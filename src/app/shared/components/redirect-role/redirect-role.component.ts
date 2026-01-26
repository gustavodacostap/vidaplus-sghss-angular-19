import { Component, inject } from '@angular/core';
import { SessionService } from '../../../core/auth/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-role',
  imports: [],
  templateUrl: './redirect-role.component.html',
  styleUrl: './redirect-role.component.scss',
})
export class RedirectRoleComponent {
  private sessionService = inject(SessionService);
  private router = inject(Router);
  constructor() {
    const session = this.sessionService.getSession();

    if (!session) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const redirectMap: Record<string, string> = {
      ADMIN: '/admin/pacientes',
      PROFESSIONAL: '/profissional/agenda',
      PATIENT: '/paciente/consultas',
    };

    this.router.navigateByUrl(redirectMap[session.role]);
  }
}
