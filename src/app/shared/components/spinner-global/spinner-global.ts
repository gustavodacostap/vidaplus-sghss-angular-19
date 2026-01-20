import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { selectGlobalLoading } from '../../../core/ui/store/ui.selectors';

@Component({
  selector: 'app-spinner-global',
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner-global.html',
  styleUrl: './spinner-global.scss',
})
export class SpinnerGlobalComponent {
  private store = inject(Store);

  loading = this.store.selectSignal(selectGlobalLoading);
}
