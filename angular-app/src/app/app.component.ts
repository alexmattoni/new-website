import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { app_header } from './app-header/app-header.component';
import { app_footer } from './app-footer/app-footer.component';

@Component
({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, app_header, app_footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
