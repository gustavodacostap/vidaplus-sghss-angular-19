import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerGlobal } from './shared/components/spinner-global/spinner-global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerGlobal],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
