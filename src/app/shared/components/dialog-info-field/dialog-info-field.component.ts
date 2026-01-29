import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-info-field',
  imports: [],
  templateUrl: './dialog-info-field.component.html',
  styleUrl: './dialog-info-field.component.scss',
})
export class DialogInfoFieldComponent {
  @Input({ required: true }) label!: string;
}
