import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  MenuDTO, TenantDTO } from '../../../core/services/callAPI/api.service';
import { DynamicMenuService } from '../../../core/services/dynamicMenu/dynamic-menu.service';
import { RouterModule } from '@angular/router';
import {  UserService } from '../../../core/services/userService/user-service.service';
import { TenantService } from '../../../core/services/tenantService/tenant-service.service';
import { SidebarStateService } from '../../../core/services/sidebarState/sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuTree?: MenuDTO[] ;
  tenant?: TenantDTO; 
  selectedRoute?: string; 
  isSidebarOpen?: boolean;

  constructor(private sidebarState: SidebarStateService, private menuService: DynamicMenuService ,public userService : UserService , private tenantService : TenantService ) {
    this.sidebarState.isSidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }


  ngOnInit() {
    this.tenantService.getTenant().subscribe(
      (result : TenantDTO) => {
        this.tenant = result; 
      },
      (error) => {
        console.error('Error fetching tenant:', error); // Handle errors
      }
    );

    this.menuService.getMenu().subscribe(
      (menuTree: MenuDTO[]) => {
      // Initialize the `expanded` property for menu items with children
      this.menuTree = menuTree.map(menu => {
        if (menu.children) {
          menu.expanded = false; 
        }
        return menu;
      });
    });  
  }
  
  toggleSidebar() {
    this.sidebarState.toggleSidebar();
  }

  selectMenu(menu: MenuDTO) {
    if (menu.children) {
      menu.expanded = !menu.expanded; // Toggle submenu visibility
    } else {
      this.selectedRoute = menu.route || undefined; // Set selected route
    }
  }
  // Toggle submenu expansion


}