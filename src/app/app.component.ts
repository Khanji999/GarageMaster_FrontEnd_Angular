import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarBeforeLoginComponent } from "./shared/components/navbar-before-login/navbar-before-login.component";
import { ProgressBarComponent } from "./shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { NavbarAfterLoginComponent } from "./shared/components/navbar-after-login/navbar-after-login.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { SidebarHamburgerComponent } from "./shared/components/sidebar-hamburger/sidebar-hamburger.component";
import { LayoutAfterLoginComponent } from "./shared/layout/layout-after-login/layout-after-login.component";
import { LayoutBeforeLoginComponent } from "./shared/layout/layout-before-login/layout-before-login.component";
import { FooterComponent } from "./shared/components/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [
    ProgressBarComponent,
    CommonModule,
    LayoutAfterLoginComponent,
    LayoutBeforeLoginComponent,
],
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
