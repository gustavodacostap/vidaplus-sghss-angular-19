import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-info-section',
  imports: [],
  templateUrl: './dialog-info-section.component.html',
  styleUrl: './dialog-info-section.component.scss',
})
export class DialogInfoSectionComponent {
  @Input({ required: true }) sectionTitle!: string;
  @Input() sectionId = '';
}
