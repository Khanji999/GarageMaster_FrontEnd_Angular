import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarBeforeLoginComponent } from "./shared/components/navbar-before-login/navbar-before-login.component";
import { ProgressBarComponent } from "./shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { NavbarAfterLoginComponent } from "./shared/components/navbar-after-login/navbar-after-login.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    NavbarBeforeLoginComponent,
    ProgressBarComponent,
    CommonModule,
    NavbarAfterLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'garage-master-app';
  beforeLoginRoutes = ['/', '/login', '/aboutUs'];

  constructor(private router: Router) {}

  isBeforeLoginRoute(): boolean {
    return this.beforeLoginRoutes.includes(this.router.url);
  }
}
