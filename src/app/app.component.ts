import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerGlobalComponent } from './shared/components/spinner-global/spinner-global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerGlobalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
