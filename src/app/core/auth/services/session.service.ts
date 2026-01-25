import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { Session } from '../models/Sessionnnnnn.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private storage = inject(StorageService);
  private readonly SESSION_KEY = 'session';

  getSession(): Session | null {
    return this.storage.get<Session>(this.SESSION_KEY);
  }

  setSession(session: Session): void {
    this.storage.set(this.SESSION_KEY, session);
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }
}
