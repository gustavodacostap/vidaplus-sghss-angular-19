import { Injectable, signal } from '@angular/core';
import { TopbarConfig } from '../models/TopbarConfig.model';

export type OpenMenu = 'sidenav' | 'notifications' | 'profile' | null;

@Injectable({ providedIn: 'root' })
export class TopbarService {
  private config = signal<TopbarConfig | null>(null);
  private _openMenu = signal<OpenMenu>(null);

  set(config: TopbarConfig) {
    this.config.set(config);
  }

  getConfig() {
    return this.config.asReadonly();
  }

  open(menu: OpenMenu) {
    this._openMenu.set(menu);
  }

  close(menu: OpenMenu) {
    if (this._openMenu() === menu) {
      this._openMenu.set(null);
    }
  }

  closeAll() {
    this._openMenu.set(null);
  }

  isOpen(menu: OpenMenu) {
    return this._openMenu() === menu;
  }

  toggle(menu: OpenMenu) {
    this._openMenu.set(this._openMenu() === menu ? null : menu);
  }
}
