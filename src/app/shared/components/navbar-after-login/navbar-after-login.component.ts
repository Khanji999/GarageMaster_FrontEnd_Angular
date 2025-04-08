import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setTitle } from '../../../core/services/titleService/title.actions';
import { selectTitle } from '../../../core/services/titleService/title.selector';
import { AuthenticationService } from '../../../core/auth/authentication.service';


@Component({
  selector: 'app-navbar-after-login',
  imports: [CommonModule],
  templateUrl: './navbar-after-login.component.html',
  styleUrl: './navbar-after-login.component.scss'
})
export class NavbarAfterLoginComponent {
  title$: Observable<string>;
  constructor(private store: Store ,private authServ : AuthenticationService) {
    this.title$ = this.store.select(selectTitle);
  }

  LogoutFormSystem(){
    this.authServ.logout();
  }
}
