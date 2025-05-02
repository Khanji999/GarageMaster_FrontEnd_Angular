import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { SidebarStateService } from '../../../core/services/sidebarState/sidebar-state.service';
import { CommonModule } from '@angular/common';
import { NavbarAfterLoginComponent } from "../../components/navbar-after-login/navbar-after-login.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-layout-after-login',
  imports: [SidebarComponent, RouterOutlet, CommonModule, NavbarAfterLoginComponent, FooterComponent],
  templateUrl: './layout-after-login.component.html',
  styleUrl: './layout-after-login.component.scss'
})
export class LayoutAfterLoginComponent {
  isSidebarOpen = false;

  constructor(private sidebarState: SidebarStateService) {
    this.sidebarState.isSidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  toggleSidebar() {
    this.sidebarState.toggleSidebar();
  }

}
