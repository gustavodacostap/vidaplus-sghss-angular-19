import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-field',
  imports: [MatFormFieldModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input({ required: true }) label!: string;
  @Input() matLabel = true;
  @Input() for?: string;
  @Input() error?: string;
  @Input() useMatFormField = true;
}
