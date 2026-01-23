import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-chip',
  imports: [],
  templateUrl: './info-chip.component.html',
  styleUrl: './info-chip.component.scss',
})
export class InfoChipComponent {
  @Input() role?: string;
  @Input('aria-label') ariaLabel?: string;
}
