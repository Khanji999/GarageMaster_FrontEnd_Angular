import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  ImageContro, MenuContro, MenuDTO, TenantContro, TenantDTO } from '../../../core/services/callAPI/api.service';
import { RouterModule } from '@angular/router';
import { SidebarStateService } from '../../../core/services/sidebarState/sidebar-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuTree?: MenuDTO[] ;
  tenant: string | undefined ;
  selectedRoute?: string; 
  isSidebarOpen?: boolean;
  imageUrl :any

  constructor(private sidebarState: SidebarStateService,
  private imageContr : ImageContro,
  private menuContro: MenuContro , private tenantContro : TenantContro ) {
    this.sidebarState.isSidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }


  ngOnInit() : void {
  this.tenantContro.getCurrentTenant().subscribe(
    (response) => {
      this.tenant = response.result?.name;
      if(this.tenant) {
      this.downloadImage(this.tenant);
      }
    } 
  );


  this.menuContro.getMenu().subscribe((menuTree) => {
    this.menuTree = menuTree.result
  });
}
  
  toggleSidebar() {
    this.sidebarState.toggleSidebar();
  }

  selectMenu(menu: MenuDTO) {
      menu.expanded = !menu.expanded; // Toggle submenu visibility
  }

  downloadImage(name: string): void {
    this.imageContr.download(name + ".jpg").subscribe(
      (response) => {
        const objectURL = URL.createObjectURL(response.data);
        this.imageUrl = objectURL;
      }
    );
  }
  
}