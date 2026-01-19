import { OverlayModule } from '@angular/cdk/overlay';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SessionService } from '../../../../../core/auth/services/session.service';
import { Session } from '../../../../../core/auth/models/Session.model';
import { UserRole } from '../../../../../core/auth/models/User.model';
import { Router } from '@angular/router';
import { TopbarService } from '../../../../../core/ui/services/topbar.service';

@Component({
  selector: 'app-profile-menu',
  imports: [MatIconModule, MatButtonModule, MatDividerModule, OverlayModule, MatListModule],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.scss',
})
export class ProfileMenu {
  private topbarService = inject(TopbarService);
  private session = inject(SessionService);
  private route = inject(Router);

  isOpen = computed(() => this.topbarService.isOpen('profile'));
  sessionData = signal<Session | null>(this.session.getSession());

  toggle() {
    this.topbarService.open(this.isOpen() ? null : 'profile');
  }

  close() {
    this.topbarService.close('profile');
  }

  logout() {
    this.session.clearSession();
    this.route.navigate(['/auth/login']);
    this.close();
  }

  goToProfile() {
    const userRole = this.sessionData()?.role;

    const roleMap = {
      ADMIN: 'admin',
      PROFESSIONAL: 'profissional',
      PATIENT: 'paciente',
    };

    if (userRole) {
      this.route.navigate([`/${roleMap[userRole]}/profile`]);
    }
    this.close();
  }

  formatRole(role: UserRole | undefined): string {
    if (!role) return '';

    const roleMap = {
      ADMIN: 'Administrador',
      PROFESSIONAL: 'Profissional de Saúde',
      PATIENT: 'Paciente',
    };
    return roleMap[role];
  }
}
