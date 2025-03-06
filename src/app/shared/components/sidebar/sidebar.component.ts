import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client, MenuDTO } from '../../../core/services/callAPI/api.service';
import { DynamicMenuService } from '../../../core/services/dynamicMenu/dynamic-menu.service';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../../core/services/userService/user-service.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuTree: MenuDTO[] = [];

  constructor(private menuService: DynamicMenuService ,public userService :UserServiceService) {}

  ngOnInit() {
    this.menuService.getMenu().subscribe((menuTree: MenuDTO[]) => {
      // Initialize the `expanded` property for menu items with children
      this.menuTree = menuTree.map(menu => {
        if (menu.children) {
          menu.expanded = false; // Default to collapsed
        }
        return menu;
      });
    });
  }

  // Toggle submenu expansion
  toggleSubMenu(menu: MenuDTO) {
    if (menu.children) {
      menu.expanded = !menu.expanded; 
    }
  }

  // Generate route from name
  public generateRouteFromName(name: string | undefined): string {
    if (!name) return '';
    return name.toLowerCase().replace(/\s+/g, '-');
  }
}