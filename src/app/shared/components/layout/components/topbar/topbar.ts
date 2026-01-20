import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  OnInit,
  OnDestroy,
  computed,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationMenuComponent } from '../notification-menu/notification-menu';
import { ProfileMenuComponent } from '../profile-menu/profile-menu';
import { LogoComponent } from '../../../logo/logo';
import { TopbarService } from '../../../../../core/ui/services/topbar.service';
import { MatButtonModule } from '@angular/material/button';
import { map, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    NotificationMenuComponent,
    ProfileMenuComponent,
    LogoComponent,
    MatButtonModule,
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class TopbarComponent implements OnInit, OnDestroy {
  config = inject(TopbarService).getConfig();

  private destroyed$ = new Subject<void>();
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  @Output() menuToggle = new EventEmitter<void>();

  isMobile = signal(false);
  showMenuLayout = computed(() => {
    const config = this.config();
    const isMobile = this.isMobile();

    // Sem dynamicMode → sempre menu + logo
    if (!config?.dynamicMode) {
      return true;
    }

    // Com dynamicMode → menu no mobile, back no desktop
    return !isMobile;
  });
  showNotifications = computed(() => {
    const value = this.config()?.showNotifications;
    return value !== false;
  });

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(
        map((result) => result.matches),
        takeUntil(this.destroyed$),
      )
      .subscribe((isMobile) => {
        this.isMobile.set(isMobile);
      });
  }

  navigateBack() {
    const link = this.config()?.returnLink;

    if (link) {
      this.router.navigateByUrl(link);
    } else {
      console.error('returnLink não informado no objeto data da rota');
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
