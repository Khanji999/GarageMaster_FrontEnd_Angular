import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTitle } from '../../../core/services/titleService/title.selector';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { SidebarStateService } from '../../../core/services/sidebarState/sidebar-state.service';


@Component({
  selector: 'app-navbar-after-login',
  imports: [CommonModule],
  templateUrl: './navbar-after-login.component.html',
  styleUrl: './navbar-after-login.component.scss'
})
export class NavbarAfterLoginComponent {

  title$: Observable<string>;
    isSidebarOpen = false;

  constructor(private store: Store ,private authServ : AuthenticationService,private sidebarState: SidebarStateService,
  ) {
    this.title$ = this.store.select(selectTitle);
    this.sidebarState.isSidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  toggleSidebar() {
    this.sidebarState.toggleSidebar();
  }
  logout() {
    this.authServ.logout();

  }
}
