import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-text',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon-text.component.html',
})
export class IconTextComponent {
  @Input({ required: true }) icon!: string;
}
