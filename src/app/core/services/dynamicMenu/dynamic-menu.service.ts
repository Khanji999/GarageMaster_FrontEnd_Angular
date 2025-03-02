import { Injectable } from '@angular/core';
import { Client,MenuDTO } from '../callAPI/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DynamicMenuService {
  constructor(private client: Client) { }
  // Function to transform flat list into hierarchical structure
 // menu.service.ts
private buildMenuTree(menuItems: MenuDTO[]): MenuDTO[] {
  const menuMap = new Map<number, MenuDTO>();

  // Create a map of all menu items
  menuItems.forEach(menu => {
    menuMap.set(menu.id!, menu);
  });

  // Build the tree structure
  const tree: MenuDTO[] = [];
  menuItems.forEach(menu => {
    if (menu.submenuId === null || menu.submenuId === undefined) {
      // Top-level menu item
      tree.push(menu);
    } else {
      // Submenu item
      const parent = menuMap.get(menu.submenuId);
      if (parent) {
        if (!parent.children) {
          parent.children = []; // Initialize children array if it doesn't exist
        }
        parent.children.push(menu); // Add the child to the parent's children array
      }
    }
  });

  return tree;
}
getMenu(): Observable<MenuDTO[]> {
  return this.client.getMenu().pipe(
    map((menuItems: MenuDTO[]) => this.buildMenuTree(menuItems))
  );
}
}
  
