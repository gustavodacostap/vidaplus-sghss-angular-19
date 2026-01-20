import {
  Component,
  computed,
  inject,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar';
import { SessionService } from '../../../core/auth/services/session.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, Subject, takeUntil } from 'rxjs';
import { TopbarService } from '../../../core/ui/services/topbar.service';
import { Session } from '../../../core/auth/models/Session.model';
import { ContentPadding, NAV_ITEMS } from './layout.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    TopbarComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private session = inject(SessionService);
  topbarService = inject(TopbarService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private destroyed$ = new Subject<void>();

  isSidenavOpen = computed(() => this.topbarService.isOpen('sidenav'));

  sessionData = signal<Session | null>(this.session.getSession());

  contentPadding = signal<ContentPadding>('default');

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const route = this.getDeepestRoute(this.route);

        const config = route.snapshot.data['topbar'];
        if (config) {
          this.topbarService.set(config);
        }

        const layoutConfig = route.snapshot.data['layout'];
        this.contentPadding.set(layoutConfig?.contentPadding ?? 'default');
      });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  toggleSidenav() {
    this.topbarService.toggle('sidenav');
  }

  navItems = computed(() => {
    const session = this.sessionData();
    if (!session) return [];

    const role = session.role;

    return NAV_ITEMS[role];
  });

  onNavItemClick() {
    this.topbarService.close('sidenav');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
