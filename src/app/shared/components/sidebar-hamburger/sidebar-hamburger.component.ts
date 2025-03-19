import { Component } from '@angular/core';
import { HoverScaleDirective } from '../../directives/hoverScale/hover-scale.directive';
import { SidebarStateService } from '../../../core/services/sidebarState/sidebar-state.service';

@Component({
  selector: 'app-sidebar-hamburger',
  imports: [HoverScaleDirective],
  templateUrl: './sidebar-hamburger.component.html',
  styleUrl: './sidebar-hamburger.component.scss'
})
export class SidebarHamburgerComponent {
  constructor(private sidebarState: SidebarStateService) {}

  toggleSidebar() {
    this.sidebarState.toggleSidebar();
  }
}
