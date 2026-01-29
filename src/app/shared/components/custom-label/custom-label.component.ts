import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-label',
  imports: [],
  templateUrl: './custom-label.component.html',
  styleUrl: './custom-label.component.scss',
})
export class CustomLabelComponent {
  @Input({ required: true }) label!: string;
  @Input() for?: string;
}
